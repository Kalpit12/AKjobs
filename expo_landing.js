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
    const referralSharingModal = document.getElementById('referralSharingModal');
    
    if (event.target === registrationModal) {
        closeRegistrationModal();
    }
    if (event.target === successModal) {
        closeSuccessModal();
    }
    if (event.target === referralSharingModal) {
        closeReferralSharingModal();
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
        'job_seeker': { name: 'Job Seekers', icon: 'fas fa-search' },
        'recruiter': { name: 'Recruiters', icon: 'fas fa-user-tie' },
        'mentor': { name: 'Mentors', icon: 'fas fa-lightbulb' },
        'trainer': { name: 'Trainers', icon: 'fas fa-chalkboard-teacher' },
        'consultant': { name: 'Consultants', icon: 'fas fa-chart-line' },
        'volunteer': { name: 'Volunteers', icon: 'fas fa-heart' },
        'intern': { name: 'Interns', icon: 'fas fa-graduation-cap' },
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

// Registration form handling (moved to registration.html)
// This code is no longer needed as the registration form is on a separate page

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

// New Countdown Timer for October 20th, 2025
function startCountdown() {
    const targetDate = new Date('October 20, 2025 00:00:00').getTime();
    
    function updateTimer() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            // Update the display
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');
            
            if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
            if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
            if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
            if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
        } else {
            // Launch date has passed
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');
            
            if (daysEl) daysEl.textContent = '00';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
        }
    }
    
    // Start the countdown immediately
    updateTimer();
    
    // Update every second
    setInterval(updateTimer, 1000);
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
    const text = encodeURIComponent('🚀 Excited about AksharJobs - AI-powered job portal launching October 20th, 2025! Join the waitlist now! #AksharJobs #AI #JobPortal #Global');
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}&utm_source=twitter&utm_medium=social&utm_campaign=expo2025`, '_blank');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('AksharJobs - AI-Powered Job Portal');
    const summary = encodeURIComponent('Revolutionizing recruitment with advanced AI, multilingual support, and cultural intelligence. Launching October 20th, 2025!');
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}&utm_source=linkedin&utm_medium=social&utm_campaign=expo2025`, '_blank');
}

function shareOnWhatsApp() {
    const text = encodeURIComponent('🚀 Check out AksharJobs - AI-powered job portal launching October 20th, 2025! Join the waitlist: ');
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
        
        // Track coin earning for copying
        trackReferralShare('copy');
        
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
        
        // Track coin earning for copying
        trackReferralShare('copy');
        
        alert('Referral code copied to clipboard!');
    });
}

// Referral Sharing Functions
function shareReferralViaWhatsApp() {
    const referralCode = 'AKSHAR2025';
    const message = `🚀 Join me on AksharJobs - the revolutionary AI-powered job portal launching October 20th, 2025!

✨ Features:
• AI-powered job matching with 75.3% accuracy
• Multilingual support (English, Hindi, Gujarati, Swahili)
• Cultural intelligence for global opportunities
• Advanced analytics and insights

🎁 Use my referral code: ${referralCode}
Get exclusive early access and premium benefits!

Join the waitlist now: ${window.location.href}

#AksharJobs #AI #JobPortal #CareerOpportunities`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
    
    // Track referral share
    trackReferralShare('whatsapp');
}

function shareReferralViaEmail() {
    const referralCode = 'AKSHAR2025';
    const subject = 'Join AksharJobs - AI-Powered Job Portal (Referral Code Inside!)';
    const body = `Hi there!

I wanted to share something exciting with you - AksharJobs, a revolutionary AI-powered job portal that's launching on October 20th, 2025!

🚀 What makes AksharJobs special:
• AI-powered job matching with 75.3% accuracy
• Multilingual support (English, Hindi, Gujarati, Swahili)
• Cultural intelligence for global opportunities
• Advanced analytics and career insights
• Personalized career guidance

🎁 Special Offer:
Use my referral code "${referralCode}" to get:
• Early access to the platform
• Premium features for free
• Exclusive career opportunities

Join the waitlist here: ${window.location.href}

This is going to revolutionize how we find jobs and talent. Don't miss out on being part of the future of recruitment!

Best regards,
[Your Name]`;
    
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
    
    // Track referral share
    trackReferralShare('email');
}

function shareReferralViaSMS() {
    const referralCode = 'AKSHAR2025';
    const message = `🚀 Join AksharJobs - AI job portal launching Oct 20, 2025! Use my code ${referralCode} for early access & premium benefits. Join: ${window.location.href}`;
    
    const smsLink = `sms:?body=${encodeURIComponent(message)}`;
    window.open(smsLink, '_blank');
    
    // Track referral share
    trackReferralShare('sms');
}

function shareReferralViaLinkedIn() {
    const referralCode = 'AKSHAR2025';
    const title = 'AksharJobs - Revolutionary AI-Powered Job Portal';
    const summary = `🚀 Excited to share AksharJobs - the revolutionary AI-powered job portal launching October 20th, 2025!

✨ Key Features:
• AI-powered job matching with 75.3% accuracy
• Multilingual support (English, Hindi, Gujarati, Swahili)
• Cultural intelligence for global opportunities
• Advanced analytics and career insights

🎁 Special Offer:
Use my referral code "${referralCode}" to get early access and premium benefits!

This platform is going to revolutionize recruitment and career development. Join the waitlist and be part of the future!

#AksharJobs #AI #JobPortal #CareerOpportunities #Innovation`;
    
    const url = encodeURIComponent(window.location.href);
    const encodedTitle = encodeURIComponent(title);
    const encodedSummary = encodeURIComponent(summary);
    
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${encodedTitle}&summary=${encodedSummary}`, '_blank');
    
    // Track referral share
    trackReferralShare('linkedin');
}

function shareReferralViaTwitter() {
    const referralCode = 'AKSHAR2025';
    const text = `🚀 Join AksharJobs - revolutionary AI-powered job portal launching Oct 20, 2025! Use my code ${referralCode} for early access & premium benefits. #AksharJobs #AI #JobPortal`;
    const url = encodeURIComponent(window.location.href);
    const encodedText = encodeURIComponent(text);
    
    window.open(`https://twitter.com/intent/tweet?text=${encodedText}&url=${url}`, '_blank');
    
    // Track referral share
    trackReferralShare('twitter');
}

function shareReferralViaFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    
    // Track referral share
    trackReferralShare('facebook');
}

function shareReferralViaTelegram() {
    const referralCode = 'AKSHAR2025';
    const message = `🚀 Join AksharJobs - AI-powered job portal launching Oct 20, 2025! Use my code ${referralCode} for early access & premium benefits. Join: ${window.location.href}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodedMessage}`, '_blank');
    
    // Track referral share
    trackReferralShare('telegram');
}

// Universal sharing function
function shareReferralViaNative() {
    if (navigator.share) {
        const referralCode = 'AKSHAR2025';
        navigator.share({
            title: 'AksharJobs - AI-Powered Job Portal',
            text: `🚀 Join AksharJobs - revolutionary AI-powered job portal launching October 20th, 2025! Use my referral code ${referralCode} for early access and premium benefits!`,
            url: window.location.href
        }).then(() => {
            trackReferralShare('native');
        }).catch((error) => {
            console.log('Error sharing:', error);
            // Fallback to copy to clipboard
            copyReferralCode();
        });
    } else {
        // Fallback to copy to clipboard
        copyReferralCode();
    }
}

// AksharCoins system
const AKSHAR_COINS_REWARDS = {
    'whatsapp': 5,      // High engagement platform
    'email': 3,         // Professional sharing
    'sms': 2,           // Direct messaging
    'linkedin': 4,      // Professional network
    'twitter': 3,       // Social media
    'facebook': 2,      // Social media
    'telegram': 3,      // Messaging app
    'native': 2,        // Device sharing
    'copy': 1           // Copy to clipboard
};

// Get coins earned for platform
function getCoinsForPlatform(platform) {
    return AKSHAR_COINS_REWARDS[platform] || 1;
}

// Update user's coin balance
function updateUserCoins(coinsEarned) {
    const currentCoins = parseInt(localStorage.getItem('aksharCoins') || '0');
    const newTotal = currentCoins + coinsEarned;
    localStorage.setItem('aksharCoins', newTotal.toString());
    updateCoinDisplay();
    return newTotal;
}

// Update coin display in UI
function updateCoinDisplay() {
    const currentCoins = parseInt(localStorage.getItem('aksharCoins') || '0');
    const coinElements = document.querySelectorAll('.akshar-coins-display');
    coinElements.forEach(element => {
        element.textContent = currentCoins;
    });
    
    // Update coin display in referral modal
    const modalCoinDisplay = document.getElementById('modalCoinDisplay');
    if (modalCoinDisplay) {
        modalCoinDisplay.textContent = currentCoins;
    }
}

// Update registration status display
function updateRegistrationStatus() {
    const userData = JSON.parse(localStorage.getItem('aksharUserData') || '{}');
    const statusElement = document.getElementById('registrationStatus');
    
    if (statusElement) {
        if (userData.name && userData.email) {
            statusElement.style.display = 'block';
        } else {
            statusElement.style.display = 'none';
        }
    }
}

// Show coin earning notification
function showCoinEarnedNotification(coinsEarned, platform) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'coin-notification';
    notification.innerHTML = `
        <div class="coin-notification-content">
            <div class="coin-icon">🪙</div>
            <div class="coin-text">
                <div class="coin-earned">+${coinsEarned} AksharCoins</div>
                <div class="coin-platform">Shared via ${platform}</div>
            </div>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Track referral shares for analytics and Google Sheets
function trackReferralShare(platform) {
    // Get user information from localStorage (from registration)
    const userData = JSON.parse(localStorage.getItem('aksharUserData') || '{}');
    
    // Calculate coins earned
    const coinsEarned = getCoinsForPlatform(platform);
    
    // Store in localStorage for analytics
    const shareData = {
        platform: platform,
        timestamp: new Date().toISOString(),
        referralCode: 'AKSHAR2025',
        url: window.location.href,
        userData: userData,
        coinsEarned: coinsEarned
    };
    
    try {
        const existingShares = JSON.parse(localStorage.getItem('aksharReferralShares') || '[]');
        existingShares.push(shareData);
        localStorage.setItem('aksharReferralShares', JSON.stringify(existingShares));
        
        // Update referral count
        const currentCount = parseInt(localStorage.getItem('aksharReferralCount') || '0');
        localStorage.setItem('aksharReferralCount', (currentCount + 1).toString());
        updateReferralCount();
        
        // Update coins
        const newTotalCoins = updateUserCoins(coinsEarned);
        
        // Show coin notification
        showCoinEarnedNotification(coinsEarned, platform);
        
        // Send to Google Sheets if user data is available
        if (userData.name && userData.email && userData.phone && userData.role) {
            sendReferralToGoogleSheets({
                type: 'referral',
                referrerName: userData.name,
                referrerEmail: userData.email,
                referrerPhone: userData.phone,
                referrerRole: userData.role,
                platform: platform,
                referralCode: 'AKSHAR2025'
            });
        } else {
            console.log('User data not available for referral tracking. Please register first.');
        }
        
        console.log(`Referral shared via ${platform}:`, shareData);
        console.log(`Earned ${coinsEarned} AksharCoins. Total: ${newTotalCoins}`);
    } catch (error) {
        console.error('Error tracking referral share:', error);
    }
}

// Function to send referral data to Google Sheets
async function sendReferralToGoogleSheets(data) {
    if (REGISTRATION_WEBHOOK_URL && REGISTRATION_WEBHOOK_URL !== 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec') {
        try {
            // Create URL with parameters
            const params = new URLSearchParams(data);
            const url = `${REGISTRATION_WEBHOOK_URL}?${params.toString()}`;
            
            console.log('Sending referral tracking to:', url);
            console.log('Referral data being sent:', data);
            
            // Open in new tab (this will trigger doGet in Google Apps Script)
            window.open(url, '_blank');
            
            console.log('Referral tracking data submitted to Google Sheets');
        } catch (err) {
            console.warn('Google Sheets referral tracking failed:', err);
        }
    }
}

// Show referral sharing modal
// Function to check user registration status
async function checkUserRegistrationStatus(email) {
    if (!REGISTRATION_WEBHOOK_URL || REGISTRATION_WEBHOOK_URL === 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec') {
        console.log('Registration webhook not configured, using localStorage only');
        const userData = JSON.parse(localStorage.getItem('aksharUserData') || '{}');
        return {
            registered: !!(userData.name && userData.email),
            userData: userData
        };
    }
    
    try {
        const response = await fetch(`${REGISTRATION_WEBHOOK_URL}?type=check_registration&email=${encodeURIComponent(email)}`);
        const result = await response.json();
        
        if (result.registered && result.userData) {
            // Update localStorage with fresh data from server
            localStorage.setItem('aksharUserData', JSON.stringify(result.userData));
        }
        
        return result;
    } catch (error) {
        console.error('Error checking registration status:', error);
        // Fallback to localStorage
        const userData = JSON.parse(localStorage.getItem('aksharUserData') || '{}');
        return {
            registered: !!(userData.name && userData.email),
            userData: userData
        };
    }
}

async function showReferralSharingModal() {
    // Get user email from localStorage
    const userData = JSON.parse(localStorage.getItem('aksharUserData') || '{}');
    
    if (!userData.email) {
        alert('Please register first to start referring others!');
        openRegistrationModal();
        return;
    }
    
    // Check registration status with server
    const registrationStatus = await checkUserRegistrationStatus(userData.email);
    
    if (!registrationStatus.registered) {
        alert('Registration not found! Please complete your registration first.');
        openRegistrationModal();
        return;
    }
    
    // Create modal if it doesn't exist
    let modal = document.getElementById('referralSharingModal');
    if (!modal) {
        modal = createReferralSharingModal();
        document.body.appendChild(modal);
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Create referral sharing modal
function createReferralSharingModal() {
    const modal = document.createElement('div');
    modal.id = 'referralSharingModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Share Your Referral Code</h2>
                <p>Invite friends and get exclusive benefits!</p>
                <span class="close" onclick="closeReferralSharingModal()">&times;</span>
            </div>
            <div class="modal-body">
                <div class="referral-code-display">
                    <div class="referral-code-box" onclick="copyReferralCode()">
                        <span id="referralCode">AKSHAR2025</span>
                        <small>Click to copy (+1 coin)</small>
                    </div>
                    <div class="coin-balance-display">
                        <span class="coin-icon">🪙</span>
                        <span class="coin-text">Your AksharCoins: <span id="modalCoinDisplay" class="akshar-coins-display">0</span></span>
                    </div>
                </div>
                
                <div class="sharing-options">
                    <h3>Share via:</h3>
                    <div class="sharing-buttons">
                        <button class="share-btn whatsapp" onclick="shareReferralViaWhatsApp()">
                            <i class="fab fa-whatsapp"></i>
                            <span>WhatsApp</span>
                            <small>+5 coins</small>
                        </button>
                        <button class="share-btn email" onclick="shareReferralViaEmail()">
                            <i class="fas fa-envelope"></i>
                            <span>Email</span>
                            <small>+3 coins</small>
                        </button>
                        <button class="share-btn sms" onclick="shareReferralViaSMS()">
                            <i class="fas fa-sms"></i>
                            <span>SMS</span>
                            <small>+2 coins</small>
                        </button>
                        <button class="share-btn linkedin" onclick="shareReferralViaLinkedIn()">
                            <i class="fab fa-linkedin"></i>
                            <span>LinkedIn</span>
                            <small>+4 coins</small>
                        </button>
                        <button class="share-btn twitter" onclick="shareReferralViaTwitter()">
                            <i class="fab fa-twitter"></i>
                            <span>Twitter</span>
                            <small>+3 coins</small>
                        </button>
                        <button class="share-btn facebook" onclick="shareReferralViaFacebook()">
                            <i class="fab fa-facebook"></i>
                            <span>Facebook</span>
                            <small>+2 coins</small>
                        </button>
                        <button class="share-btn telegram" onclick="shareReferralViaTelegram()">
                            <i class="fab fa-telegram"></i>
                            <span>Telegram</span>
                            <small>+3 coins</small>
                        </button>
                        <button class="share-btn native" onclick="shareReferralViaNative()">
                            <i class="fas fa-share-alt"></i>
                            <span>Share</span>
                            <small>+2 coins</small>
                        </button>
                    </div>
                </div>
                
                <div class="referral-benefits">
                    <h3>Earn AksharCoins & Unlock Benefits:</h3>
                    <div class="benefits-grid">
                        <div class="benefit-item">
                            <span class="benefit-number">🪙</span>
                            <span class="benefit-text">Share = Earn Coins</span>
                        </div>
                        <div class="benefit-item">
                            <span class="benefit-number">50</span>
                            <span class="benefit-text">Coins = Early Access</span>
                        </div>
                        <div class="benefit-item">
                            <span class="benefit-number">100</span>
                            <span class="benefit-text">Coins = Free Premium</span>
                        </div>
                        <div class="benefit-item">
                            <span class="benefit-number">200</span>
                            <span class="benefit-text">Coins = VIP Support</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return modal;
}

// Close referral sharing modal
function closeReferralSharingModal() {
    const modal = document.getElementById('referralSharingModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Update referral count from localStorage
function updateReferralCount() {
    const count = localStorage.getItem('aksharReferralCount') || 0;
    document.getElementById('referralCount').textContent = count;
}

// QR Code Registration System
let currentQRCode = null;

// Generate QR Code for registration
function generateQRCode() {
    const qrDisplay = document.getElementById('qrCodeDisplay');
    
    // Create registration URL with current page URL
    const registrationURL = window.location.origin + window.location.pathname + '#register';
    
    // Clear existing content
    qrDisplay.innerHTML = '';
    
    // Create loading state
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'qr-loading';
    loadingDiv.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
            <div class="spinner" style="width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #667eea; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">Generating QR Code...</p>
        </div>
    `;
    qrDisplay.appendChild(loadingDiv);
    
    // Add spinner animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Generate QR Code using QR Server API
    setTimeout(() => {
        const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(registrationURL)}`;
        
        const qrImg = document.createElement('img');
        qrImg.src = qrCodeURL;
        qrImg.alt = 'Registration QR Code';
        qrImg.style.maxWidth = '180px';
        qrImg.style.maxHeight = '180px';
        qrImg.style.borderRadius = '10px';
        
        qrImg.onload = function() {
            qrDisplay.innerHTML = '';
            qrDisplay.appendChild(qrImg);
            currentQRCode = qrCodeURL;
            
            // Show success message
            showQRSuccessMessage();
        };
        
        qrImg.onerror = function() {
            qrDisplay.innerHTML = `
                <div style="text-align: center; color: #ef4444;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 10px;"></i>
                    <p>Failed to generate QR Code</p>
                    <button onclick="generateQRCode()" style="background: #667eea; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer;">
                        Try Again
                    </button>
                </div>
            `;
        };
    }, 1000);
}

// Download QR Code
function downloadQRCode() {
    if (!currentQRCode) {
        alert('Please generate a QR Code first!');
        return;
    }
    
    // Create download link
    const link = document.createElement('a');
    link.href = currentQRCode;
    link.download = 'aksharjobs-registration-qr.png';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show download success message
    showNotification('QR Code downloaded successfully!', 'success');
}

// Show QR Code success message
function showQRSuccessMessage() {
    const notification = document.createElement('div');
    notification.className = 'qr-success-notification';
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px; background: #10b981; color: white; padding: 12px 20px; border-radius: 10px; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);">
            <i class="fas fa-check-circle"></i>
            <span>QR Code generated successfully!</span>
        </div>
    `;
    
    // Position notification
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '10000';
    notification.style.transform = 'translateX(400px)';
    notification.style.opacity = '0';
    notification.style.transition = 'all 0.3s ease';
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Auto-generate QR Code on page load
function initQRCode() {
    // Generate QR Code automatically when page loads
    setTimeout(() => {
        generateQRCode();
    }, 2000);
}

// Initialize all new features
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing features...');
    startCountdown();
    initStickyCTA();
    updateReferralCount();
    updateCoinDisplay();
    updateRegistrationStatus();
    initQRCode();
    
    // Check if user came from registration
    checkRegistrationRedirect();
});

// Check if user came from registration and show welcome message
function checkRegistrationRedirect() {
    const urlParams = new URLSearchParams(window.location.search);
    const fromRegistration = urlParams.get('from') === 'registration';
    
    if (fromRegistration) {
        // Show welcome message
        const welcomeMessage = document.getElementById('welcomeMessage');
        if (welcomeMessage) {
            welcomeMessage.style.display = 'block';
            
            // Auto-hide after 10 seconds
            setTimeout(() => {
                welcomeMessage.style.display = 'none';
            }, 10000);
        }
        
        // Clean up URL
        const newUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, document.title, newUrl);
    }
}

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
