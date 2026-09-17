/**
 * JK Rústico - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle icon (hamburger to close)
            const icon = mobileBtn.innerHTML;
            if (icon.includes('☰')) {
                mobileBtn.innerHTML = '✕';
            } else {
                mobileBtn.innerHTML = '☰';
            }
        });
        
        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileBtn.innerHTML = '☰';
            });
        });
    }

    // 2. WhatsApp URL Generator
    // Finds elements with data-wa-msg attribute and sets the href
    const whatsappBaseUrl = 'https://wa.me/5521967588087';
    const waLinks = document.querySelectorAll('a[data-wa-msg]');
    
    waLinks.forEach(link => {
        const msg = link.getAttribute('data-wa-msg');
        if (msg) {
            const encodedMsg = encodeURIComponent(msg);
            link.setAttribute('href', `${whatsappBaseUrl}?text=${encodedMsg}`);
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // Default WA links without data attribute
    const defaultWaLinks = document.querySelectorAll('.wa-link-default');
    defaultWaLinks.forEach(link => {
        if(!link.hasAttribute('href') || link.getAttribute('href') === '#') {
            const defaultMsg = "Olá! Conheci a JK Rústico pelo site e gostaria de conhecer os produtos.";
            link.setAttribute('href', `${whatsappBaseUrl}?text=${encodeURIComponent(defaultMsg)}`);
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // 3. Header Scroll Effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
            } else {
                header.style.boxShadow = 'none';
            }
        });
    }
});
