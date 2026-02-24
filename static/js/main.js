// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ef4444';
                } else {
                    field.style.borderColor = '#e5e7eb';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    }
});

// Add loading animation to tracking results
function showLoading(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading...</div>';
    }
}

// Format date helper function
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Scroll-triggered animations using Intersection Observer
const scrollObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            scrollObserver.unobserve(entry.target);
        }
    });
}, scrollObserverOptions);

// Add scroll animation class to elements
document.querySelectorAll('.feature-card, .service-card, .pricing-card, .team-card, .value-card, .milestone-content, .contact-item').forEach(el => {
    el.classList.add('scroll-animate');
    scrollObserver.observe(el);
});

// Navbar background change on scroll with animation
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            navbar.style.transition = 'box-shadow 0.3s ease';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    }
});

// Add hover animation to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add click ripple effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            pointer-events: none;
            width: 100px;
            height: 100px;
            left: ${x - 50}px;
            top: ${y - 50}px;
            transform: scale(0);
            animation: ripple 0.6s linear;
        `;
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add animation to form inputs on focus
document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-item h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.innerText.replace(/[^0-9]/g, ''));
        const suffix = counter.innerText.replace(/[0-9]/g, '');
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target + suffix;
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add typing effect to hero heading
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Apply typing effect on load
const heroHeading = document.querySelector('.hero h1');
if (heroHeading) {
    const originalText = heroHeading.innerText;
    // Uncomment below line to enable typing effect
    // typeWriter(heroHeading, originalText, 80);
}

// Add floating animation to icons on hover
document.querySelectorAll('.feature-card i, .service-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.animation = 'bounce 0.5s ease';
    });
    icon.addEventListener('animationend', function() {
        this.style.animation = '';
    });
});

// Smooth reveal animation for sections
function revealOnScroll() {
    const reveals = document.querySelectorAll('.section-title, .about-text, .about-image, .contact-info, .contact-form-wrapper, .map-placeholder, .tracking-tips');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Initialize reveal animations
document.querySelectorAll('.section-title, .about-text, .about-image, .contact-info, .contact-form-wrapper, .map-placeholder, .tracking-tips').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Timeline marker pulse animation
document.querySelectorAll('.timeline-item.current').forEach(item => {
    const marker = item.querySelector('.timeline-marker i');
    if (marker) {
        marker.style.animation = 'pulse 1.5s ease-in-out infinite';
    }
});

// Add staggered animation delay to footer sections
document.querySelectorAll('.footer-section').forEach((section, index) => {
    section.style.animationDelay = (index * 0.1) + 's';
});

// Mobile menu animation
const mobileMenuToggle = () => {
    const nav = document.querySelector('.nav-links');
    if (nav) {
        nav.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    }
};

// Run on load
mobileMenuToggle();

// Add shake animation to invalid form inputs
document.querySelectorAll('.form-group input[required], .form-group textarea[required]').forEach(input => {
    input.addEventListener('invalid', function() {
        this.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
    });
});

// Add CSS for shake animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Contact form success animation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Add success animation before redirect
        const button = this.querySelector('button[type="submit"]');
        if (button) {
            button.innerHTML = '<i class="fas fa-check"></i> Sent!';
            button.style.background = '#10b981';
            button.style.animation = 'pulse 0.5s ease';
        }
    });
}

// Tracking result animation
const trackForm = document.getElementById('track-form');
if (trackForm) {
    trackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const resultContainer = document.querySelector('.tracking-result-container');
        if (resultContainer) {
            resultContainer.style.opacity = '0';
            resultContainer.style.transform = 'translateY(20px)';
            resultContainer.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                resultContainer.style.opacity = '1';
                resultContainer.style.transform = 'translateY(0)';
            }, 300);
        }
    });
}

// Page transition effect
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
});

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease';
});
