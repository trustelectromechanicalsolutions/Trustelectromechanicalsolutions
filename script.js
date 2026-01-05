// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Header scroll behavior - hide header-top on scroll down, show on scroll up
let lastScrollPosition = 0;
const mainHeader = document.querySelector('.header');
const headerTopSection = document.querySelector('.header-top');

if (mainHeader && headerTopSection) {
    // Add smooth transition for the header-top
    headerTopSection.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    
    window.addEventListener('scroll', function() {
        let currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 100) {
            // Scrolling down and past 100px
            headerTopSection.style.transform = 'translateY(-100%)';
            headerTopSection.style.opacity = '0';
            mainHeader.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            mainHeader.style.transition = 'box-shadow 0.3s ease';
        } else {
            // Scrolling up or at top
            if (currentScrollPosition <= 0) {
                // At the top of the page
                headerTopSection.style.transform = 'translateY(0)';
                headerTopSection.style.opacity = '1';
                mainHeader.style.boxShadow = 'none';
            } else {
                // Scrolling up but not at top
                headerTopSection.style.transform = 'translateY(0)';
                headerTopSection.style.opacity = '1';
                mainHeader.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            }
        }
        
        lastScrollPosition = currentScrollPosition <= 0 ? 0 : currentScrollPosition; // For Mobile or negative scrolling
    });
}

if (hamburger) {
    // set initial accessibility attributes
    hamburger.setAttribute('role', 'button');
    hamburger.setAttribute('aria-controls', navMenu ? 'navMenu' : '');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');

    hamburger.addEventListener('click', () => {
        if (navMenu) navMenu.classList.toggle('active');
        const isActive = hamburger.classList.toggle('active');
        // update aria attributes/label for screen readers
        hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        hamburger.setAttribute('aria-label', isActive ? 'Close menu' : 'Open menu');
    });
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animated Counter for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.dataset.target.includes('+') ? '+' : '') + (element.dataset.target.includes('%') ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.dataset.target.includes('+') ? '+' : '') + (element.dataset.target.includes('%') ? '%' : '');
        }
    }, 16);
}

// Intersection Observer for Stats Animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const target = parseInt(statNumber.dataset.target);
            if (!statNumber.classList.contains('animated')) {
                statNumber.classList.add('animated');
                animateCounter(statNumber, target);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Form Submission
// Initialize EmailJS
(function() {
    emailjs.init("WG1I95k98R8LSwbtC"); 
})();

// Form Submission with EmailJS
const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
    quoteForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = quoteForm.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.textContent : 'Send Message';
        if (submitBtn) {
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
        }

        const formData = new FormData(quoteForm);

        try {
            const response = await fetch(quoteForm.action, {
                method: quoteForm.method || 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const successMessage = document.getElementById('formSuccessMessage');
            if (successMessage) {
                successMessage.textContent = 'Form submitted successfully';
                successMessage.classList.add('show');
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setTimeout(() => successMessage.classList.remove('show'), 5000);
            }

            quoteForm.reset();
        } catch (error) {
            console.error('Form submission error:', error);
            const existing = quoteForm.querySelector('.form-error-message');
            if (!existing) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'form-error-message';
                errorDiv.textContent = 'Sorry, there was an error sending your message. Please try again.';
                errorDiv.style.cssText = `background: #ff6b35; color: white; padding: 15px; border-radius: 5px; margin-bottom: 20px; text-align: center;`;
                quoteForm.insertBefore(errorDiv, quoteForm.firstChild);
                setTimeout(() => errorDiv.remove(), 5000);
            }
        } finally {
            if (submitBtn) {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        }
    });
}


// Scroll to Top Button (optional enhancement)
let scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
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
    scrollTopBtn.style.background = 'var(--secondary-color)';
    scrollTopBtn.style.transform = 'translateY(-3px)';
    scrollTopBtn.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
});

scrollTopBtn.addEventListener('mouseout', () => {
    scrollTopBtn.style.background = 'var(--primary-color)';
    scrollTopBtn.style.transform = window.pageYOffset > 300 ? 'translateY(0)' : 'translateY(10px)';
    scrollTopBtn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
});

document.body.appendChild(scrollTopBtn);

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Handle scroll events to show/hide the button with animation
window.addEventListener('scroll', () => {
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
});

// Initial check in case the page is loaded with scroll position
if (window.pageYOffset > 300) {
    scrollTopBtn.style.display = 'block';
    scrollTopBtn.style.opacity = '1';
    scrollTopBtn.style.transform = 'translateY(0)';
}

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section > .container > div').forEach(section => {
    fadeObserver.observe(section);
});

// Header scroll effect - hide header-top on scroll down, show when at top
let lastScroll = 0;
const header = document.querySelector('.header');
const headerTop = document.querySelector('.header-top');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for styling
    if (currentScroll > 30) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Hide header-top when scrolling down (after 30px), show when at top
    // Nav-menu stays visible always
    if (currentScroll > 30) {
        if (headerTop) {
            headerTop.classList.add('hidden');
        }
    } else {
        if (headerTop) {
            headerTop.classList.remove('hidden');
        }
    }
    
    lastScroll = currentScroll;
});

// Dropdown menu for mobile
document.querySelectorAll('.dropdown > .nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 968) {
            e.preventDefault();
            const dropdown = link.parentElement;
            const menu = dropdown.querySelector('.dropdown-menu');
            menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        }
    });
});


// Carousel functionality for About Section
function initAboutCarousel() {
    const slides = document.querySelectorAll('.about-slide');
    const prevBtn = document.querySelector('.carousel-arrow.prev');
    const nextBtn = document.querySelector('.carousel-arrow.next');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 seconds per slide

    // Debug: Check if elements exist (uncomment for debugging)
    // console.log('Carousel Debug:', {
    //     slides: slides.length,
    //     prevBtn: !!prevBtn,
    //     nextBtn: !!nextBtn,
    //     indicators: indicators.length
    // });

    if (slides.length === 0) {
        console.log('No slides found, carousel not initialized');
        return;
    }

    // Function to show a specific slide
    function showSlide(index) {
        // Reset all slides
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (indicators[i]) indicators[i].classList.remove('active');
        });

        // Show the selected slide
        slides[index].classList.add('active');
        if (indicators[index]) indicators[index].classList.add('active');
        currentSlide = index;
    }

    // Function to go to the next slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    // Function to go to the previous slide
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }

    // Start auto-sliding
    function startAutoSlide() {
        stopAutoSlide(); // Clear any existing interval
        slideInterval = setInterval(nextSlide, slideDuration);
    }

    // Stop auto-sliding
    function stopAutoSlide() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    // Event listeners for navigation
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoSlide(); // Restart auto-slide after manual navigation
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoSlide(); // Restart auto-slide after manual navigation
        });
    }

    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            startAutoSlide(); // Restart auto-slide after manual navigation
        });
    });

    // Pause auto-slide on hover
    const carousel = document.querySelector('.about-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }

    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;

    if (carousel) {
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoSlide(); // Restart auto-slide after swipe
        }, { passive: true });
    }

    function handleSwipe() {
        const swipeThreshold = 50; // Minimum swipe distance
        const swipeDiff = touchStartX - touchEndX;

        if (Math.abs(swipeDiff) > swipeThreshold) {
            if (swipeDiff > 0) {
                nextSlide(); // Swipe left
            } else {
                prevSlide(); // Swipe right
            }
        }
    }

    // Initialize the carousel
    showSlide(0);
    startAutoSlide();

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Force reflow to ensure smooth transitions after resize
            slides.forEach(slide => {
                slide.style.transition = 'none';
                void slide.offsetHeight; // Trigger reflow
                slide.style.transition = '';
            });
        }, 250);
    });
}

// Initialize the carousel when the DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAboutCarousel);
} else {
    initAboutCarousel();
}

// Services Section - Load More Functionality
function initServicesPagination() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;
    
    const servicesGrid = document.querySelector('.services-grid');
    const serviceCards = Array.from(document.querySelectorAll('.service-card'));
    
    if (serviceCards.length === 0) return;
    
    // Initialize all cards as hidden
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        if (index >= 6) { // Show first 6 cards initially (2 rows)
            card.style.display = 'none';
        }
    });
    
    // Animate initial visible cards
    setTimeout(() => {
        serviceCards.slice(0, 6).forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }, 100);
    
    let visibleCards = 6; // Start with 6 visible cards (2 rows)
    
    loadMoreBtn.addEventListener('click', () => {
        // Calculate how many cards to show (all remaining or next 6)
        const nextBatch = serviceCards.slice(visibleCards, visibleCards + 6);
        
        if (nextBatch.length === 0) {
            // If no more cards to show, reset to initial state
            serviceCards.slice(6).forEach(card => {
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            });
            visibleCards = 6;
            loadMoreBtn.textContent = 'Load More Services';
            
            // Scroll to top of services section
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            return;
        }
        
        // Show and animate the next batch of cards
        nextBatch.forEach((card, index) => {
            card.style.display = '';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        });
        
        visibleCards += nextBatch.length;
        
        // If we've shown all cards, change button text
        if (visibleCards >= serviceCards.length) {
            loadMoreBtn.textContent = 'Show Less';
        }
        
        // Smooth scroll to the newly loaded cards
        if (nextBatch.length > 0) {
            nextBatch[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
    
    // Handle window resize to maintain responsive layout
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Reapply display styles on resize to maintain responsive layout
            serviceCards.forEach((card, index) => {
                if (index >= visibleCards) {
                    card.style.display = 'none';
                } else {
                    card.style.display = '';
                }
            });
        }, 250);
    });
}

// Initialize services pagination when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initServicesPagination);
} else {
    initServicesPagination();
}

// Scroll to Top Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    // Return early if the button doesn't exist
    if (!scrollToTopBtn) return;
    
    // Show/hide the button based on scroll position
    function toggleScrollToTopButton() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }
    
    // Smooth scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Check scroll position on load
    toggleScrollToTopButton();
    
    // Check scroll position on scroll
    window.addEventListener('scroll', toggleScrollToTopButton);
});
