import { getPartyFromUrl } from './config.js';

// Create the inner HTML for a single side's RSVP list
function createRSVPInner(party, list) {
    const title = party === 'groom' ? 'RSVP (Groom side)' : 'RSVP (Bride side)';
    const items = list.map(entry => {
        const phone = entry.phone || '';
        const phoneDisplay = entry.phone_display || '';
        const safeHref = phone ? `https://wa.me/${phone}` : '';
        const phoneLink = phone ? `<a href="${safeHref}" target="_blank">${phoneDisplay}</a>` : '';
        return `<li><strong>${entry.name}</strong>${phoneLink ? ': ' + phoneLink : ''}</li>`;
    }).join('');

    return `
        <h3 class="event-title">${title}</h3>
        <ul class="rsvp-list">
            ${items}
        </ul>
    `;
}

// Render RSVP content into the page. Accepts the loaded config and the
// container where events are rendered (used if we need to append a section).
function renderRSVP(config, eventsContainer) {
    const party = getPartyFromUrl();
    if (party) {
        const rsvps = (config.rsvps && config.rsvps[party]) ? config.rsvps[party] : null;
        if (rsvps && Array.isArray(rsvps) && rsvps.length) {
            const existingRsvpEl = document.getElementById('rsvp');
            const innerHtml = createRSVPInner(party, rsvps);
            if (existingRsvpEl) {
                existingRsvpEl.classList.add('rsvp');
                existingRsvpEl.innerHTML = `<div class="container"><div class="panel-grid"><article>${innerHtml}</article></div></div>`;
                
            } else if (eventsContainer) {
                const rsvpHtml = `
                    <section id="rsvp" class="panel rsvp-panel">
                        <div class="container">
                            <div class="panel-grid">
                                <article>
                                    ${innerHtml}
                                </article>
                            </div>
                        </div>
                    </section>
                `;
                eventsContainer.insertAdjacentHTML('beforeend', rsvpHtml);
            }
        }
    }
}

export { renderRSVP };
