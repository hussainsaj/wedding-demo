import { loadConfig } from './config.js';
import { updateContent } from './events.js';
import { setupHeaderScroll, setupSmoothScroll } from './scroll.js';

// Initialize all functionality when page loads
async function initialize() {
    // Load configuration and update content
    const config = await loadConfig();
    await updateContent(config);

    // Setup scroll-related features
    setupHeaderScroll();
    setupSmoothScroll();
}

document.addEventListener('DOMContentLoaded', initialize);