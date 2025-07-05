
// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Scroll to about section when clicking the arrow
document.getElementById('scroll-indicator').addEventListener('click', function() {
    document.getElementById('about').scrollIntoView({
        behavior: 'smooth'
    });
});

// Typewriter effect
const words = ['Ethical Hacker', 'Full-Stack Developer', 'AI Enthusiast', 'Bug Bounty Hunter'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById('typewriter');

function typeWriter() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    } else {
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeWriter, 500);
            return;
        }
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeWriter, speed);
}

// Start typewriter effect
typeWriter();

// Animate dots in hero background
function createAnimatedDots() {
    const dotsContainer = document.querySelector('.animated-dots');
    const numDots = 50;
    
    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.style.position = 'absolute';
        dot.style.width = Math.random() * 4 + 1 + 'px';
        dot.style.height = dot.style.width;
        dot.style.backgroundColor = '#22d3ee';
        dot.style.borderRadius = '50%';
        dot.style.left = Math.random() * 100 + '%';
        dot.style.top = Math.random() * 100 + '%';
        dot.style.animation = `pulse ${Math.random() * 3 + 2}s infinite`;
        dot.style.animationDelay = Math.random() * 2 + 's';
        
        dotsContainer.appendChild(dot);
    }
}

// Initialize animated dots
createAnimatedDots();

// Hacking toolkit tabs functionality
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        this.classList.add('active');
        document.getElementById(tabId + '-content').classList.add('active');
    });
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    emailjs.sendForm('contact_service', 'template_jypmgnv', this)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Your message has been sent!');
        }, function(error) {
            console.log('FAILED...', error);
            alert('Oops! Something went wrong.');
        });

    this.reset();
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

// Add click effects to tech items
document.querySelectorAll('.tech-item').forEach(item => {
    item.addEventListener('click', function() {
        // Add a brief animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Skills dots animation on hover
document.querySelectorAll('.tech-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const dots = this.querySelectorAll('.dot.active');
        dots.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.animation = 'pulse 0.5s ease';
            }, index * 100);
        });
    });
    
    item.addEventListener('mouseleave', function() {
        const dots = this.querySelectorAll('.dot.active');
        dots.forEach(dot => {
            dot.style.animation = '';
        });
    });
});

// Timeline items animation
const timelineObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
    timelineObserver.observe(item);
});

// Add particle effect on click for buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = 60;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS animation for ripple effect
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Lazy loading for performance
function lazyLoad() {
    const elements = document.querySelectorAll('[data-src]');
    elements.forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight) {
            element.src = element.dataset.src;
            element.removeAttribute('data-src');
        }
    });
}

window.addEventListener('scroll', lazyLoad);
window.addEventListener('load', lazyLoad);

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Add initial animations
    document.body.classList.add('loaded');
    
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Set initial active nav link
    const currentSection = 'home';
    document.querySelector(`a[href="#${currentSection}"]`)?.classList.add('active');
});

// Update active nav link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
