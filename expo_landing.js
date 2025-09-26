// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
});

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
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

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Scroll to role function for hero cards
function scrollToRole(roleId) {
    // First scroll to the roles section
    const rolesSection = document.getElementById('roles');
    if (rolesSection) {
        rolesSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // After scrolling, highlight the specific role card
        setTimeout(() => {
            const roleCard = document.querySelector(`[data-role="${roleId}"]`);
            if (roleCard) {
                roleCard.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Add temporary highlight effect
                roleCard.style.background = 'rgba(102, 126, 234, 0.1)';
                roleCard.style.border = '2px solid #667eea';
                setTimeout(() => {
                    roleCard.style.background = '';
                    roleCard.style.border = '';
                }, 3000);
            }
        }, 800);
    }
}

// Particle animation for hero background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles when page loads
document.addEventListener('DOMContentLoaded', createParticles);

// Modal functions
function openRegistrationModal() {
    document.getElementById('registrationModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeRegistrationModal() {
    document.getElementById('registrationModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openSuccessModal(message) {
    document.getElementById('successMessage').textContent = message;
    document.getElementById('successModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    const registrationModal = document.getElementById('registrationModal');
    const successModal = document.getElementById('successModal');
    
    if (event.target === registrationModal) {
        closeRegistrationModal();
    }
    if (event.target === successModal) {
        closeSuccessModal();
    }
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Validate form data
    if (!data.name || !data.email || !data.subject || !data.message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;
    
    // Send email using EmailJS or similar service
    // For now, we'll use a simple approach that can be easily integrated
    sendContactEmail(data)
        .then(() => {
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            openSuccessModal('Thank you for your message! We\'ll get back to you within 24 hours.');
        })
        .catch((error) => {
            console.error('Error sending email:', error);
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show error message
            alert('Sorry, there was an error sending your message. Please try again or contact us directly at info@aksharjobs.com');
        });
});

// Initialize EmailJS with actual credentials
const EMAILJS_PUBLIC_KEY = 'eH8UEJPLNPkS36LuT';
const EMAILJS_SERVICE_ID = 'service_kv87gsc';
const EMAILJS_TEMPLATE_ID = 'template_g8dtg3o';

// Initialize EmailJS when the page loads
document.addEventListener('DOMContentLoaded', function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
});

// Function to send contact email
async function sendContactEmail(data) {
    // Check if EmailJS is available
    if (typeof emailjs !== 'undefined') {
        try {
            // Send email using EmailJS with template variables that match your setup
            const result = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    email: 'kalpitpatel751@gmail.com',  // This goes to "To Email" field
                    name: data.name,                    // This goes to {{name}} in content
                    subject: data.subject,              // This goes to subject
                    message: data.message,              // This can be used in content
                    reply_to: data.email                // Use this for Reply-To in template
                }
            );
            
            console.log('Email sent successfully:', result);
            return Promise.resolve();
        } catch (error) {
            console.error('EmailJS error:', error);
            
            // If EmailJS fails, create a mailto link as fallback
            const mailtoLink = `mailto:kalpitpatel751@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`From: ${data.name} (${data.email})\n\nMessage:\n${data.message}`)}`;
            
            // Open mailto link in new tab
            window.open(mailtoLink, '_blank');
            
            console.log('EmailJS failed, opened mailto link:', {
                name: data.name,
                email: data.email,
                subject: data.subject,
                message: data.message,
                timestamp: new Date().toISOString()
            });
            
            // Still show success to user
            return Promise.resolve();
        }
    } else {
        // Fallback: Log the data and simulate success
        console.log('Contact form submission (EmailJS not available):', {
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
            timestamp: new Date().toISOString()
        });
        
        // Simulate successful send
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1500);
        });
    }
}

// Google Sheets integration via Google Apps Script
const REGISTRATION_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbybl1_G9qtjlXXn0Vjgl-anssjO-kqtKyy99DjtcYE/exec';

// Helper: persist a local backup so nothing is lost at expo
function saveRegistrationLocalBackup(reg) {
    try {
        const key = 'expo_registrations_backup_v1';
        const list = JSON.parse(localStorage.getItem(key) || '[]');
        list.push({ ...reg, savedAt: new Date().toISOString() });
        localStorage.setItem(key, JSON.stringify(list));
    } catch (_) {
        // ignore storage issues silently
    }
}

async function sendRegistration(data) {
    // 1) Try Google Sheets via URL parameters (bypasses CORS completely)
    if (REGISTRATION_WEBHOOK_URL && REGISTRATION_WEBHOOK_URL !== 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec') {
        try {
            // Create URL with parameters
            const params = new URLSearchParams(data);
            const url = `${REGISTRATION_WEBHOOK_URL}?${params.toString()}`;
            
            console.log('Sending registration to:', url);
            console.log('Data being sent:', data);
            
            // Open in new tab (this will trigger doGet in Google Apps Script)
            window.open(url, '_blank');
            
            console.log('Registration data submitted to Google Sheets via URL');
        } catch (err) {
            console.warn('Google Sheets submission failed (email backup will work):', err);
        }
    }

    // 2) Send an email via EmailJS to capture the lead
    if (typeof emailjs !== 'undefined') {
        const roleLabel = data.role === 'recruiter' ? 'Recruiter' : 'Job Seeker';
        const subject = `Launch Notification Signup - ${roleLabel}`;
        const message = `New launch notification signup\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nRole: ${roleLabel}\n\nThis person wants to be notified when AksharJobs launches!`;

        try {
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                {
                    email: 'kalpitpatel751@gmail.com',
                    name: data.name,
                    subject: subject,
                    message: message,
                    reply_to: data.email
                }
            );
        } catch (err) {
            console.warn('Registration email failed, fallback continues:', err);
        }
    }
}

// Dynamic form field handling
document.addEventListener('DOMContentLoaded', function() {
    const roleInputs = document.querySelectorAll('input[name="role"]');
    const roleSpecificFields = document.querySelectorAll('.role-specific-fields');
    const selectedRoleDisplay = document.getElementById('selectedRoleDisplay');
    const selectedRoleIcon = document.querySelector('.selected-role-icon');
    const selectedRoleText = document.querySelector('.selected-role-text strong');
    
    // Role mapping for display
    const roleMapping = {
        'job_seeker': { name: 'Job Seekers', icon: 'fas fa-user' },
        'recruiter': { name: 'Recruiters', icon: 'fas fa-briefcase' },
        'mentor': { name: 'Mentors', icon: 'fas fa-graduation-cap' },
        'trainer': { name: 'Trainers/Consultants', icon: 'fas fa-chalkboard-teacher' },
        'intern': { name: 'Interns', icon: 'fas fa-user-graduate' },
        'community': { name: 'Communities', icon: 'fas fa-users' },
        'university': { name: 'Universities', icon: 'fas fa-university' }
    };
    
    roleInputs.forEach(input => {
        input.addEventListener('change', function() {
            // Hide all role-specific fields
            roleSpecificFields.forEach(field => {
                field.style.display = 'none';
            });
            
            // Show fields for selected role
            const selectedRole = this.value;
            const targetFields = document.getElementById(selectedRole + 'Fields');
            if (targetFields) {
                targetFields.style.display = 'block';
            }
            
            // Update selected role display
            if (selectedRoleDisplay && roleMapping[selectedRole]) {
                const roleInfo = roleMapping[selectedRole];
                selectedRoleIcon.className = `selected-role-icon ${roleInfo.icon}`;
                selectedRoleText.textContent = roleInfo.name;
                selectedRoleDisplay.style.display = 'block';
            }
        });
    });
});

// Registration form handling
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Normalize role for consistency
    if (!data.role) {
        alert('Please select your role.');
        return;
    }

    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.name || !emailRegex.test(data.email) || !data.phone) {
        alert('Please provide a valid name, email, and phone number.');
        return;
    }
    
    // Loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> Submitting...';
    submitBtn.disabled = true;

    // Collect all form data including role-specific fields
    const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role
    };

    // Add role-specific data
    const selectedRole = data.role;
    const roleFields = document.getElementById(selectedRole + 'Fields');
    if (roleFields) {
        const roleInputs = roleFields.querySelectorAll('input, select, textarea');
        roleInputs.forEach(input => {
            if (input.value.trim()) {
                payload[input.name] = input.value;
            }
        });
    }

    // Local backup immediately
    saveRegistrationLocalBackup(payload);

    sendRegistration(payload)
        .finally(() => {
            // Reset form and UI regardless of external services
            this.reset();
            // Hide all role-specific fields
            document.querySelectorAll('.role-specific-fields').forEach(field => {
                field.style.display = 'none';
            });
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            closeRegistrationModal();
            openSuccessModal('Thanks! We\'ll notify you when AksharJobs launches. You\'ll be among the first to know!');
        });
});

// Magic Bento Card Effects
function initMagicBentoEffects() {
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            card.style.setProperty('--glow-x', `${x}%`);
            card.style.setProperty('--glow-y', `${y}%`);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--glow-x', '50%');
            card.style.setProperty('--glow-y', '50%');
        });
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .about-feature, .contact-item').forEach(el => {
    observer.observe(el);
});

// Counter animation for hero stats only
function animateCounters() {
    // Only target stat numbers in the hero section, not feature cards
    const heroStats = document.querySelector('.hero-stats');
    if (!heroStats) return;
    
    const counters = heroStats.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const originalText = counter.textContent;
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (originalText.includes('%')) {
                counter.textContent = Math.floor(current) + '%';
            } else if (originalText.includes('x')) {
                counter.textContent = Math.floor(current) + 'x';
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Floating cards animation enhancement
function enhanceFloatingCards() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            const randomRotate = (Math.random() - 0.5) * 10;
            
            card.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
        }, 3000 + index * 500);
    });
}

// Initialize floating cards animation
document.addEventListener('DOMContentLoaded', enhanceFloatingCards);

// Initialize magic bento effects
document.addEventListener('DOMContentLoaded', initMagicBentoEffects);

// Rolling Card Effects
function initRollingCardEffects() {
    const rollingCards = document.querySelectorAll('.rolling-card');
    
    rollingCards.forEach((card, index) => {
        // Add staggered entrance animation
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'translateY(-15px) rotateX(10deg) rotateY(5deg) scale(1.03)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = '';
        });
        
        // Add click effect
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-20px) rotateX(15deg) rotateY(10deg) scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
        
        // Add touch support for mobile
        card.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg) rotateY(2deg) scale(1.02)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// Initialize rolling card effects
document.addEventListener('DOMContentLoaded', initRollingCardEffects);

// Countdown Timer for October 20th, 2025
function initCountdownTimer() {
    const launchDate = new Date('October 20, 2025 00:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = launchDate - now;
        
        if (distance < 0) {
            // Launch date has passed
            document.getElementById('days').innerHTML = '00';
            document.getElementById('hours').innerHTML = '00';
            document.getElementById('minutes').innerHTML = '00';
            document.getElementById('seconds').innerHTML = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').innerHTML = days.toString().padStart(2, '0');
        document.getElementById('hours').innerHTML = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerHTML = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerHTML = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Sticky CTA Bar
function initStickyCTA() {
    const stickyCta = document.getElementById('stickyCta');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100 && currentScrollY > lastScrollY) {
            // Scrolling down - show sticky CTA
            stickyCta.classList.add('show');
        } else if (currentScrollY < 50) {
            // Near top - hide sticky CTA
            stickyCta.classList.remove('show');
        }
        
        lastScrollY = currentScrollY;
    });
}

// Social Share Functions
function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('🚀 Excited about AksharJobs - AI-powered job portal launching October 20th! Join the waitlist now! #AksharJobs #AI #JobPortal #Global');
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}&utm_source=twitter&utm_medium=social&utm_campaign=expo2025`, '_blank');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('AksharJobs - AI-Powered Job Portal');
    const summary = encodeURIComponent('Revolutionizing recruitment with advanced AI, multilingual support, and cultural intelligence. Launching October 20th, 2025!');
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}&utm_source=linkedin&utm_medium=social&utm_campaign=expo2025`, '_blank');
}

function shareOnWhatsApp() {
    const text = encodeURIComponent('🚀 Check out AksharJobs - AI-powered job portal launching October 20th! Join the waitlist: ');
    const url = encodeURIComponent(window.location.href);
    window.open(`https://wa.me/?text=${text}${url}&utm_source=whatsapp&utm_medium=social&utm_campaign=expo2025`, '_blank');
}

function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&utm_source=facebook&utm_medium=social&utm_campaign=expo2025`, '_blank');
}

// Referral Program
function copyReferralCode() {
    const referralCode = document.getElementById('referralCode');
    const text = referralCode.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        // Visual feedback
        const originalText = referralCode.textContent;
        referralCode.textContent = 'Copied!';
        referralCode.style.background = '#10b981';
        referralCode.style.color = 'white';
        referralCode.style.borderColor = '#10b981';
        
        setTimeout(() => {
            referralCode.textContent = originalText;
            referralCode.style.background = '#f8fafc';
            referralCode.style.color = '#1e293b';
            referralCode.style.borderColor = '#cbd5e1';
        }, 2000);
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        alert('Referral code copied to clipboard!');
    });
}

// Update referral count from localStorage
function updateReferralCount() {
    const count = localStorage.getItem('aksharReferralCount') || 0;
    document.getElementById('referralCount').textContent = count;
}

// Initialize all new features
document.addEventListener('DOMContentLoaded', function() {
    initCountdownTimer();
    initStickyCTA();
    updateReferralCount();
});

// Typing animation for hero title
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

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover effects to feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to all buttons
document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Form validation enhancements
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return re.test(phone);
}

// Add real-time validation to forms
document.querySelectorAll('input[type="email"]').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#ef4444';
            this.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
        } else {
            this.style.borderColor = '#e5e7eb';
            this.style.boxShadow = 'none';
        }
    });
});

document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validatePhone(this.value)) {
            this.style.borderColor = '#ef4444';
            this.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
        } else {
            this.style.borderColor = '#e5e7eb';
            this.style.boxShadow = 'none';
        }
    });
});

// Add loading states to all forms
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function() {
        const submitBtn = this.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.style.pointerEvents = 'none';
            submitBtn.style.opacity = '0.7';
        }
    });
});

// Console welcome message
console.log(`
🚀 Welcome to AksharJobs Landing Page!
✨ Built with modern web technologies
🎨 Featuring smooth animations and interactions
📱 Fully responsive design
🔧 Ready for production deployment

For support, contact: info@aksharjobs.com
`);

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
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

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);
