// Function to get base URL from script path
function getBaseUrl() {
    const scriptTag = document.querySelector('script[src$="main.js"]');
    if (scriptTag) {
        // Get the path up to the last directory (remove /js/main.js)
        return scriptTag.src.replace(/\/js\/main\.js$/, '');
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
            events: data.events,
            rsvps: data.rsvps || {}
        };
    } catch (error) {
        console.error('Error loading configuration:', error);
        return null;
    }
}

// Function to get preset from URL
function getPresetFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    // Read the new query parameters: `tier` and `party`.
    const tier = urlParams.get('tier');
    const party = urlParams.get('party');

    const allowedTiers = new Set(['core', 'full']);
    const allowedParties = new Set(['bride', 'groom']);

    if (tier && party && allowedTiers.has(tier) && allowedParties.has(party)) {
        // Construct preset name like `full-bride` or `core-groom`
        return `${tier}-${party}`;
    }

    // Fallback to legacy `preset` param or default
    return urlParams.get('preset') || 'default';
}

// Function to get the party (bride/groom) from URL
function getPartyFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const party = urlParams.get('party');
    const allowedParties = new Set(['bride', 'groom']);
    if (party && allowedParties.has(party)) {
        return party;
    }

    // Try to infer party from legacy `preset` param (e.g., `full-bride`)
    const preset = urlParams.get('preset');
    if (preset && preset.endsWith('-bride')) return 'bride';
    if (preset && preset.endsWith('-groom')) return 'groom';

    return null;
}

export { loadConfig, getPresetFromUrl, getPartyFromUrl };