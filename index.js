// Smooth scrolling for navigation links
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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
});

// Header scroll effect
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Performance optimization - preload critical resources
const preloadLinks = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

preloadLinks.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    document.head.appendChild(link);
});

// Analytics placeholder (replace with actual analytics code)
function trackEvent(action, category, label) {
    // Google Analytics 4 or other analytics service
    console.log(`Event tracked: ${action} - ${category} - ${label}`);
}

// Track CTA button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        trackEvent('click', 'CTA', e.target.textContent.trim());
    });
});

// Track project link clicks
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', (e) => {
        trackEvent('click', 'Project', e.target.textContent.trim());
    });
});

// Track blog article clicks
document.querySelectorAll('.read-more').forEach(link => {
    link.addEventListener('click', (e) => {
        trackEvent('click', 'Blog', 'Article Read');
    });
});

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Contact form handling (if you add a contact form later)
function handleContactForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Process form data
    trackEvent('submit', 'Contact', 'Form Submission');
    
    // Show success message
    alert('Thank you for your message! I\'ll get back to you soon.');
}

// Lazy loading for images (when you add them)
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

// Apply lazy loading to images with data-src attribute
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Keyboard navigation enhancement
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Theme preference detection (for future dark mode support)
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

prefersDarkScheme.addListener((e) => {
    // Handle theme changes if you implement dark mode
    console.log('Theme preference changed:', e.matches ? 'dark' : 'light');
});

// Performance monitoring
window.addEventListener('load', () => {
    // Measure page load performance
    const perfData = performance.getEntriesByType('navigation')[0];
    const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
    
    console.log(`Page load time: ${loadTime}ms`);
    
    // Track to analytics
    trackEvent('performance', 'page_load', Math.round(loadTime));
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    trackEvent('error', 'javascript', e.error.message);
});

// Initial page load animations
document.addEventListener('DOMContentLoaded', () => {
    // Remove loading class to trigger fade-in
    document.body.classList.remove('loading');
    
    // Add stagger effect to hero elements
    const heroElements = document.querySelectorAll('.hero h1, .hero .hero-subtitle, .hero .hero-description, .hero .cta-buttons');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
        el.classList.add('fade-in', 'visible');
    });
});

// Utility functions for navigation
function goToPage(url) {
    window.location.href = url;
}

// External link tracking
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.addEventListener('click', (e) => {
        trackEvent('click', 'External Link', link.href);
    });
});

// Copy to clipboard functionality (useful for code blocks)
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Add copy buttons to code blocks (if needed)
document.querySelectorAll('.code-block').forEach(block => {
    const copyBtn = document.createElement('button');
    copyBtn.textContent = 'Copy';
    copyBtn.className = 'copy-btn';
    copyBtn.style.cssText = `
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: var(--white);
        border: 1px solid var(--border-gray);
        padding: 0.25rem 0.5rem;
        font-size: 0.75rem;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s;
    `;
    
    block.style.position = 'relative';
    block.appendChild(copyBtn);
    
    block.addEventListener('mouseenter', () => {
        copyBtn.style.opacity = '1';
    });
    
    block.addEventListener('mouseleave', () => {
        copyBtn.style.opacity = '0';
    });
    
    copyBtn.addEventListener('click', () => {
        const code = block.querySelector('code').textContent;
        copyToClipboard(code);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy';
        }, 2000);
    });
});

// Mobile menu styles (add to CSS if not present)
const mobileMenuStyles = `
@media (max-width: 768px) {
    .nav-menu.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 1rem;
        border-bottom: 1px solid var(--border-gray);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .nav-menu.active li {
        margin: 0.5rem 0;
    }
}
`;

// Add mobile menu styles if not present
if (!document.querySelector('#mobile-menu-styles')) {
    const style = document.createElement('style');
    style.id = 'mobile-menu-styles';
    style.textContent = mobileMenuStyles;
    document.head.appendChild(style);
}