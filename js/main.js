/**
 * JK Rústico - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        const setMenu = (open) => {
            navLinks.classList.toggle('active', open);
            mobileBtn.setAttribute('aria-expanded', String(open));
            mobileBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
            mobileBtn.textContent = open ? '✕' : '☰';
            document.body.style.overflow = open ? 'hidden' : '';
        };

        mobileBtn.addEventListener('click', () => {
            setMenu(!navLinks.classList.contains('active'));
        });

        // Close menu on link click or Esc
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => setMenu(false));
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') setMenu(false);
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
        const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 50);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // 4. Catalog Filter (produtos/index.html#mesas etc.)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('[data-category]');

    if (filterBtns.length && products.length) {
        const applyFilter = (cat) => {
            const valid = [...filterBtns].some(btn => btn.dataset.filter === cat);
            if (!valid) cat = 'todos';
            filterBtns.forEach(btn => btn.setAttribute('aria-pressed', String(btn.dataset.filter === cat)));
            products.forEach(card => {
                card.hidden = cat !== 'todos' && card.dataset.category !== cat;
            });
        };

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const cat = btn.dataset.filter;
                history.replaceState(null, '', cat === 'todos' ? location.pathname : `#${cat}`);
                applyFilter(cat);
            });
        });

        applyFilter(location.hash.slice(1) || 'todos');
        window.addEventListener('hashchange', () => applyFilter(location.hash.slice(1) || 'todos'));
    }

    // 5. Product Gallery Thumbnails
    const mainImg = document.querySelector('.product-main-img');
    const thumbs = document.querySelectorAll('.product-thumbs button');

    if (mainImg && thumbs.length) {
        thumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const img = thumb.querySelector('img');
                mainImg.src = img.src;
                mainImg.alt = img.alt;
                thumbs.forEach(t => t.setAttribute('aria-pressed', String(t === thumb)));
            });
        });
    }

    // 6. Current year in footer
    document.querySelectorAll('[data-year]').forEach(el => {
        el.textContent = new Date().getFullYear();
    });
});
