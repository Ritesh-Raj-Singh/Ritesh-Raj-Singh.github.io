// Custom Cursor Logic
const cursor = document.querySelector('.cursor-glow');

if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const hoverElements = document.querySelectorAll('a, .btn, .glass-card');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });
} else {
    // Hide custom cursor on touch devices
    cursor.style.display = 'none';
}

// Scroll Reveal Animation via Intersection Observer
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Add a slight offset for earlier detection
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Mobile Hamburger Menu Toggle (Simple alert/placeholder for now)
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    // For a simple setup, just toggle a class to show/hide the menu
    if (navLinksContainer.style.display === 'flex') {
        navLinksContainer.style.display = 'none';
    } else {
        navLinksContainer.style.display = 'flex';
        navLinksContainer.style.flexDirection = 'column';
        navLinksContainer.style.position = 'absolute';
        navLinksContainer.style.top = '100%';
        navLinksContainer.style.left = '0';
        navLinksContainer.style.width = '100%';
        navLinksContainer.style.background = 'var(--glass-bg)';
        navLinksContainer.style.backdropFilter = 'blur(16px)';
        navLinksContainer.style.padding = '1rem 2rem';
        navLinksContainer.style.borderBottom = '1px solid var(--glass-border)';
    }
});

// Ensure nav shows correctly on resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinksContainer.style.display = 'flex';
        navLinksContainer.style.flexDirection = 'row';
        navLinksContainer.style.position = 'static';
        navLinksContainer.style.background = 'transparent';
        navLinksContainer.style.padding = '0';
        navLinksContainer.style.borderBottom = 'none';
    } else {
        navLinksContainer.style.display = 'none';
    }
});
