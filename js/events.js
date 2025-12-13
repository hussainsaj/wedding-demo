import { getPresetFromUrl } from './config.js';
import { renderRSVP } from './rsvp.js';

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
async function updateContent(config) {
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

    // Render RSVP content (moved to its own module)
    renderRSVP(config, eventsContainer);
}

// Function to create the RSVP section HTML
function createRSVPInner(party, list) {
    const title = party === 'groom' ? 'RSVP (Groom side)' : 'RSVP (Bride side)';
    const items = list.map(entry => {
        const phone = entry.phone || '';
        const safeHref = phone ? `tel:${phone.replace(/\s+/g, '')}` : '';
        const phoneLink = phone ? `<a href="${safeHref}">${phone}</a>` : '';
        return `<li><strong>${entry.name}</strong>${phoneLink ? ': ' + phoneLink : ''}</li>`;
    }).join('');

    return `
        <h3 class="event-title">${title}</h3>
        <ul class="rsvp-list">
            ${items}
        </ul>
    `;
}

export { updateContent };