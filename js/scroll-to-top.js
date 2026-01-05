// Scroll to Top Button Functionality
function initScrollToTop() {
    // Check if button already exists
    if (document.getElementById('scrollToTopBtn')) {
        return; // Exit if button already exists
    }
    
    // Create the button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.id = 'scrollToTopBtn';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    
    // Get computed styles to ensure CSS variables are available
    const rootStyles = getComputedStyle(document.documentElement);
    const primaryColor = rootStyles.getPropertyValue('--primary-color') || '#0056b3';
    const secondaryColor = rootStyles.getPropertyValue('--secondary-color') || '#003d82';
    
    // Add styles
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: ${primaryColor};
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        opacity: 0;
        transform: translateY(10px);
    `;

    // Add hover effect
    scrollTopBtn.addEventListener('mouseover', () => {
        scrollTopBtn.style.background = secondaryColor;
        scrollTopBtn.style.transform = 'translateY(-3px)';
        scrollTopBtn.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
    });

    scrollTopBtn.addEventListener('mouseout', () => {
        scrollTopBtn.style.background = primaryColor;
        scrollTopBtn.style.transform = window.pageYOffset > 300 ? 'translateY(0)' : 'translateY(10px)';
        scrollTopBtn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    });

    // Add click handler
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add to body
    document.body.appendChild(scrollTopBtn);

    // Handle scroll events
    function handleScroll() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'block';
            // Trigger reflow to ensure the display property is applied
            void scrollTopBtn.offsetHeight;
            // Fade in and slide up
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.transform = 'translateY(0)';
        } else {
            // Fade out and slide down before hiding
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.transform = 'translateY(10px)';
            // Wait for the animation to complete before hiding
            setTimeout(() => {
                if (window.pageYOffset <= 300) {
                    scrollTopBtn.style.display = 'none';
                }
            }, 300);
        }
    }

    // Initial check
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollToTop);
} else {
    initScrollToTop();
}
