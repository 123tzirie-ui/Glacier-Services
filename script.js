/**
 * Glacier Services - Main JavaScript File
 * Handles navigation, interactive elements, and form functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            // Update aria-expanded for accessibility
            const isExpanded = mainNav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when a link is clicked
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', false);
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = mainNav.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', false);
            }
        });
    }

    // Smooth scroll for anchor links (already handled by CSS scroll-behavior)
    // This provides fallback for older browsers
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#main-content' && href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Form validation and handling
    handleFormSubmissions();

    // Mobile click-to-call functionality
    setupClickToCall();

    // Add active state to current page nav link
    setActiveNavLink();
});

/**
 * Handle all form submissions on the site
 */
function handleFormSubmissions() {
    // Proposal Form Handler (request-proposal.html)
    const proposalForm = document.getElementById('proposalForm');
    if (proposalForm) {
        proposalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleProposalFormSubmit(this);
        });
    }

    // Contact Form Handler (contact.html)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactFormSubmit(this);
        });
    }
}

/**
 * Handle proposal form submission
 * TODO: Replace with actual backend endpoint or email service
 */
function handleProposalFormSubmit(form) {
    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // TODO: Configure your form submission:
    // Option 1: Use Formspree (https://formspree.io/)
    //   - Create free account and get form ID
    //   - Replace 'YOUR_FORM_ID' with your actual ID
    // 
    // Option 2: Use EmailJS (https://www.emailjs.com/)
    //   - Create account and get service/template IDs
    //   - Initialize and send via EmailJS
    //
    // Option 3: Send to your own backend API
    //   - Create endpoint to handle form data
    //   - Send email from your backend

    // Example with Formspree:
    /*
    fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showFormSuccess('proposalForm', 'successMessage');
        }
    })
    .catch(error => console.error('Form submission error:', error));
    */

    // For now, show success message after a brief delay
    setTimeout(() => {
        showFormSuccess('proposalForm', 'successMessage');
    }, 500);
}

/**
 * Handle contact form submission
 * TODO: Replace with actual backend endpoint or email service
 */
function handleContactFormSubmit(form) {
    const formData = new FormData(form);
    
    // TODO: Configure form submission similar to proposal form above
    
    // For now, show success message
    setTimeout(() => {
        showFormSuccess('contactForm', 'contactSuccess');
    }, 500);
}

/**
 * Show form success message and hide form
 */
function showFormSuccess(formId, successMessageId) {
    const form = document.getElementById(formId);
    const successMessage = document.getElementById(successMessageId);
    
    if (form) form.style.display = 'none';
    if (successMessage) {
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

/**
 * Setup click-to-call functionality for mobile devices
 * Makes phone numbers clickable on mobile
 */
function setupClickToCall() {
    // This is already handled by tel: links, but we can add visual feedback
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // On non-mobile devices, prevent actual call
            if (!isMobileDevice()) {
                e.preventDefault();
                // Optionally show a message or just let the href work
            }
        });
    });
}

/**
 * Simple mobile device detection
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Set active navigation link based on current page
 */
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Handle root index
        if ((currentPage === '' && href === 'index.html') ||
            (href === currentPage)) {
            link.style.color = 'var(--primary-blue)';
            link.style.fontWeight = '600';
        }
    });
}

/**
 * Utility function: Format phone numbers
 */
function formatPhoneNumber(input) {
    const cleaned = input.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return input;
}

/**
 * Utility function: Validate email
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Add smooth scroll behavior for older browsers
 * (newer browsers use CSS scroll-behavior)
 */
function smoothScrollPolyfill() {
    if (!('scrollBehavior' in document.documentElement.style)) {
        // Fallback for older browsers
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
}

/**
 * Initialize animations on scroll
 * Adds fade-in effect to elements as they come into view
 */
function initScrollAnimations() {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all cards and sections
    document.querySelectorAll('.card, section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Newsletter subscription handler
 */
function handleNewsletterSignup() {
    const forms = document.querySelectorAll('form[data-newsletter="true"]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            
            // TODO: Connect to your email service or backend
            console.log('Newsletter signup:', email);
            
            // Show success message
            const input = form.querySelector('input[type="email"]');
            input.value = '';
            alert('Thank you for subscribing! Check your email for confirmation.');
        });
    });
}

/**
 * Analytics tracking setup
 * TODO: Add your Google Analytics or other tracking code
 */
function setupAnalytics() {
    // Track form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            // Example Google Analytics event
            // gtag('event', 'form_submission', {
            //     'form_name': this.id || 'unknown'
            // });
        });
    });

    // Track button clicks
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Example tracking
            // gtag('event', 'button_click', {
            //     'button_text': this.textContent
            // });
        });
    });
}

/**
 * Accessibility improvements
 * Enhance keyboard navigation and screen reader support
 */
function improveAccessibility() {
    // Add skip-to-content keyboard shortcut
    document.addEventListener('keydown', function(event) {
        if (event.key === 's' && event.ctrlKey) {
            const skipLink = document.querySelector('.skip-link');
            if (skipLink) {
                skipLink.style.display = 'block';
                skipLink.focus();
            }
        }
    });

    // Ensure all interactive elements are keyboard accessible
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.setAttribute('role', 'button');
        if (!button.hasAttribute('tabindex')) {
            button.setAttribute('tabindex', '0');
        }
    });
}

// Initialize accessibility on page load
improveAccessibility();

// Uncomment to enable scroll animations
// initScrollAnimations();

// Uncomment to enable newsletter functionality
// document.addEventListener('DOMContentLoaded', handleNewsletterSignup);
