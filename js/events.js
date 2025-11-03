import { getPresetFromUrl } from './config.js';

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
}

export { updateContent };