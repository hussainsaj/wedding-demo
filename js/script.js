// Configuration handling
let config = null;

// Function to get base URL from script path
function getBaseUrl() {
    const scriptTag = document.querySelector('script[src$="script.js"]');
    if (scriptTag) {
        // Get the path up to the last directory (remove /js/script.js)
        return scriptTag.src.replace(/\/js\/script\.js$/, '');
    }
    return window.location.pathname.replace(/\/[^\/]*$/, '');
}

// Function to load configuration
async function loadConfig() {
    try {
        const baseUrl = getBaseUrl();
        const response = await fetch(`${baseUrl}/config.json`);
        const data = await response.json();
        return {
            presets: data.presets,
            events: data.events
        };
    } catch (error) {
        console.error('Error loading configuration:', error);
        return null;
    }
}

// Function to get preset from URL
function getPresetFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('preset') || 'default'; // Default to empty if no preset specified
}

// Function to create event section HTML
function createEventSection(eventId, content) {
    return `
        <section id="${eventId}" class="panel">
            <div class="container">
                <div class="panel-grid">
                    <article>
                        <h3 class="event-title">${content.title}</h3>
                        <p class="event-datetime"><strong>Date:</strong> ${content.date} at ${content.time}</p>
                        <p class="event-venue"><strong>Venue:</strong> ${content.venue}</p>
                        <p class="event-address"><strong>Location:</strong> ${content.address}</p>
                        <p class="event-description">${content.description}</p>
                    </article>
                </div>
            </div>
        </section>
    `;
}

// Function to update content based on configuration
async function updateContent() {
    const config = await loadConfig();
    if (!config) return;

    const presetName = getPresetFromUrl();
    const preset = config.presets[presetName] || config.presets.default;

    // Get the events container
    const eventsContainer = document.getElementById('events-container');
    if (!eventsContainer) return;

    // Clear any existing content
    eventsContainer.innerHTML = '';

    // Create and append sections for each event in the preset
    preset.events.forEach(eventId => {
        const content = config.events[eventId];
        if (content) {
            const eventHtml = createEventSection(eventId, content);
            eventsContainer.insertAdjacentHTML('beforeend', eventHtml);
        }
    });
}

// Initialize content when page loads
document.addEventListener('DOMContentLoaded', updateContent);

// Header scroll animation
const header = document.querySelector('.site-header');
const hero = document.querySelector('.hero');
let lastScrollY = window.scrollY;

function updateHeader() {
  if (!hero) return;
  
  const heroRect = hero.getBoundingClientRect();
  const heroMiddle = heroRect.height * 0.9;
  
  if (window.scrollY > heroMiddle && lastScrollY <= heroMiddle) {
    header.classList.add('visible');
  } else if (window.scrollY <= heroMiddle && lastScrollY > heroMiddle) {
    header.classList.remove('visible');
  }
  
  lastScrollY = window.scrollY;
}

// Update header visibility on scroll
window.addEventListener('scroll', updateHeader);
// Check initial position
updateHeader();

// Smooth scrolling for anchor links
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if(!a) return;
  const href = a.getAttribute('href');
  if(href === '#') return;
  e.preventDefault();
  const el = document.querySelector(href);
  if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
});
