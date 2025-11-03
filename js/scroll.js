// Header scroll animation setup
function setupHeaderScroll() {
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
}

// Setup smooth scrolling for anchor links
function setupSmoothScroll() {
    document.addEventListener('click', (e) => {
        const a = e.target.closest('a[href^="#"]');
        if(!a) return;
        const href = a.getAttribute('href');
        if(href === '#') return;
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
    });
}

export { setupHeaderScroll, setupSmoothScroll };