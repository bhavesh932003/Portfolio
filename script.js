// Typing animation
const typingText = document.querySelector('.typing-text');
const phrases = [
    'AI Engineer',
    'Full Stack Developer', 
    'Machine Learning Engineer',
    'Problem Solver',
    'Innovation Enthusiast'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(typeWriter, typeSpeed);
}

// Start typing animation
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(typeWriter, 1000);
});

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

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(5, 5, 5, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
    }
});

// Intersection Observer for animations
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

// Dynamic particle generation
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: fixed;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: ${Math.random() > 0.5 ? '#00d4ff' : '#ff6b9d'};
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
        left: ${Math.random() * window.innerWidth}px;
        top: ${window.innerHeight + 10}px;
        opacity: ${Math.random() * 0.5 + 0.3};
    `;
    
    document.body.appendChild(particle);
    
    const duration = Math.random() * 10000 + 5000;
    const drift = (Math.random() - 0.5) * 200;
    
    particle.animate([
        { transform: `translateY(0px) translateX(0px)` },
        { transform: `translateY(-${window.innerHeight + 100}px) translateX(${drift}px)` }
    ], {
        duration: duration,
        easing: 'linear'
    }).onfinish = () => particle.remove();
}

// Generate particles periodically
setInterval(createParticle, 2000);

// Add mouse trail effect
let mouseTrail = [];
document.addEventListener('mousemove', function(e) {
    mouseTrail.push({x: e.clientX, y: e.clientY, time: Date.now()});
    
    // Limit trail length
    mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 1000);
    
    // Create trail effect
    if (mouseTrail.length > 1) {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, rgba(0,212,255,0.6) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
        `;
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.style.opacity = '0';
            trail.style.transform = 'translate(-50%, -50%) scale(0)';
            trail.style.transition = 'all 0.5s ease';
            setTimeout(() => trail.remove(), 500);
        }, 50);
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease';
    }, 100);
    
    // Initialize AOS-like animations for cards
    const cards = document.querySelectorAll('.about-card, .experience-card, .project-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        const cardObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        cardObserver.observe(card);
    });
});

// Add some interactive effects to the cube
const cube = document.querySelector('.cube');
if (cube) {
    cube.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });
    
    cube.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
    });
}

// Performance optimization: Reduce animations on low-end devices
if (navigator.hardwareConcurrency <= 2) {
    document.documentElement.style.setProperty('--reduced-motion', 'reduce');
    const animations = document.querySelectorAll('*');
    animations.forEach(el => {
        el.style.animationDuration = '0.01ms !important';
        el.style.animationDelay = '0.01ms !important';
    });
}
