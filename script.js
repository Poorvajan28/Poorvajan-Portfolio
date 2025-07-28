// Enhanced Portfolio JavaScript with 3D Animations and Interactive Features

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
});

// Loading Screen Animation
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// Typing Animation for Hero Section
const typingTexts = [
    'Full Stack Developer',
    'Mobile App Developer',
    'UI/UX Designer',
    'Data Analyst',
    'Python Developer',
    'Final Year CSE Student'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeWriter() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentText.length) {
        speed = pauseTime;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
    }

    setTimeout(typeWriter, speed);
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 3000); // Start after loading screen
});

// 3D Background Animation with Three.js
function init3DBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas || !window.THREE) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Create geometric shapes
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x00d4ff, 
        wireframe: true,
        transparent: true,
        opacity: 0.1
    });

    const shapes = [];
    for (let i = 0; i < 20; i++) {
        const shape = new THREE.Mesh(geometry, material);
        shape.position.x = (Math.random() - 0.5) * 50;
        shape.position.y = (Math.random() - 0.5) * 50;
        shape.position.z = (Math.random() - 0.5) * 50;
        shape.rotation.x = Math.random() * Math.PI;
        shape.rotation.y = Math.random() * Math.PI;
        scene.add(shape);
        shapes.push(shape);
    }

    camera.position.z = 30;

    function animate() {
        requestAnimationFrame(animate);

        shapes.forEach((shape, index) => {
            shape.rotation.x += 0.005 + index * 0.0001;
            shape.rotation.y += 0.005 + index * 0.0001;
            
            // Float animation
            shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
        });

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize 3D background when Three.js is loaded
window.addEventListener('load', () => {
    setTimeout(init3DBackground, 100);
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 212, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth Scrolling for Navigation Links
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

// Skill Progress Bar Animation
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.getAttribute('data-progress');
                progressBar.style.width = progress + '%';
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
};

// Initialize skill bar animation
window.addEventListener('load', animateSkillBars);

// Parallax Effect for Hero Section (Improved)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const profileContainer = document.querySelector('.profile-container');
    const heroText = document.querySelector('.hero-text');
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        // Only apply parallax when hero section is visible
        if (heroRect.bottom > 0 && heroRect.top < window.innerHeight) {
            const heroProgress = Math.max(0, Math.min(1, (window.innerHeight - heroRect.top) / window.innerHeight));
            
            if (profileContainer) {
                // Reduce parallax intensity and limit movement
                const maxMovement = 50; // Maximum pixels to move
                const movement = Math.min(scrolled * 0.2, maxMovement);
                profileContainer.style.transform = `translateY(${movement}px)`;
            }
            
            if (heroText) {
                // Even less movement for text
                const maxMovement = 30;
                const movement = Math.min(scrolled * 0.1, maxMovement);
                heroText.style.transform = `translateY(${movement}px)`;
            }
        } else if (heroRect.bottom <= 0) {
            // Reset transforms when hero section is out of view
            if (profileContainer) {
                profileContainer.style.transform = 'translateY(0px)';
            }
            if (heroText) {
                heroText.style.transform = 'translateY(0px)';
            }
        }
    }
});

// Interactive Particle Effect
function createParticles() {
    const particlesContainer = document.getElementById('particles-container');
    if (!particlesContainer) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #00d4ff;
            border-radius: 50%;
            opacity: 0.5;
            pointer-events: none;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            animation: particleFall ${5 + Math.random() * 10}s linear infinite;
        `;
        particlesContainer.appendChild(particle);
    }

    // Add CSS animation for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize particles
window.addEventListener('load', createParticles);

// Mouse Cursor Effect
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Cursor following effect for social links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// 3D Tilt Effect for Cards
function initTiltEffect() {
    const cards = document.querySelectorAll('.skill-card, .internship-card, .project-card, .timeline-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
        });
    });
}

// Initialize tilt effect
window.addEventListener('load', initTiltEffect);

// Form Validation and Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Simulate form submission
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            this.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        }, 2000);
    });
}

// Modal Functionality
const modal = document.getElementById('modal');
const modalTriggers = document.querySelectorAll('[onclick*="modal"]');
const closeModal = document.querySelector('.close');

if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Special animations for different elements
            if (entry.target.classList.contains('stat-number')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-card, .internship-card, .timeline-card, .stat-number').forEach(el => {
    observer.observe(el);
});

// Counter Animation for Statistics
function animateCounter(element) {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + '+';
    }, 16);
}

// Dynamic Background Color Change
let hue = 0;
function animateBackground() {
    hue = (hue + 0.1) % 360;
    const particles = document.getElementById('particles-container');
    if (particles) {
        particles.style.filter = `hue-rotate(${hue}deg)`;
    }
    requestAnimationFrame(animateBackground);
}

// Start background animation
window.addEventListener('load', () => {
    setTimeout(animateBackground, 3000);
});

// Scroll Progress Indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #00d4ff, #ff6b6b);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrolled / maxScroll) * 100;
        progressBar.style.width = progress + '%';
    });
}

// Initialize scroll progress
window.addEventListener('load', createScrollProgress);

// Performance Optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Scroll-based animations and effects
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
window.addEventListener('load', initLazyLoading);

// Easter Egg: Konami Code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 
    'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
        
        console.log('🎉 Easter egg activated! You found the secret!');
    }
});

// Print friendly styles
function addPrintStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @media print {
            * { color: black !important; background: white !important; }
            .navbar, #loading-screen, #particles-container, #bg-canvas { display: none !important; }
            .section { page-break-inside: avoid; }
        }
    `;
    document.head.appendChild(style);
}

// Add print styles
window.addEventListener('load', addPrintStyles);

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;
    
    // Check for saved theme preference or default to light theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.className = savedTheme + '-theme';
    
    // Update icon based on current theme
    updateThemeIcon(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            // Remove current theme class and add new one
            body.className = newTheme + '-theme';
            
            // Save preference
            localStorage.setItem('theme', newTheme);
            
            // Update icon with animation
            updateThemeIcon(newTheme);
            
            // Add smooth transition effect
            body.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                body.style.transition = '';
            }, 300);
        });
    }
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        if (theme === 'light') {
            themeIcon.className = 'fas fa-moon';
            themeIcon.style.transform = 'rotate(0deg)';
        } else {
            themeIcon.className = 'fas fa-sun';
            themeIcon.style.transform = 'rotate(180deg)';
        }
    }
}

// Final initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Enhanced Portfolio Loaded Successfully!');
    console.log('Features: 3D Animations, Interactive Effects, Responsive Design, Theme Toggle');
    
    // Initialize theme toggle
    initThemeToggle();
    
    // Analytics placeholder (replace with actual analytics code)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: 'Portfolio - Poorvajan G S',
            page_location: window.location.href
        });
    }
});
