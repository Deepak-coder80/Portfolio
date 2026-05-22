// ---- MOBILE NAV ----
const mobileToggle = document.querySelector('.mobile-toggle');
const mobileNav = document.getElementById('mobile-nav');

if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
}

// ---- SCROLL REVEAL ----
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.addEventListener('DOMContentLoaded', () => {
    // Add reveal class to key elements
    const targets = [
        '.cap-card',
        '.project-row',
        '.platform-block',
        '.article-row',
        '.exp-block',
        '.hero-stat',
        '.contact-link'
    ];
    targets.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('reveal');
            revealObserver.observe(el);
        });
    });

    // Hero elements appear immediately
    document.querySelectorAll('.hero-label, .hero-headline, .hero-sub, .hero-ctas').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`;
        requestAnimationFrame(() => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'none';
            }, 100);
        });
    });
});

// ---- HEADER SCROLL EFFECT ----
const header = document.getElementById('site-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > lastScroll && currentScroll > 120) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    lastScroll = Math.max(0, currentScroll);
}, { passive: true });

// header transition
if (header) {
    header.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
}

// ---- SMOOTH SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 64; // header height
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ---- ACTIVE NAV ----
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-item');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navItems.forEach(item => {
                item.style.color = '';
                if (item.getAttribute('href') === `#${id}`) {
                    item.style.color = 'var(--white)';
                }
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));