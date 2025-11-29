// Configuration for Discord and other services for the presentation page
const config = {
    discord: {
        userId: '1124801501592813689', // Your Discord user ID
        clientId: '1442154953316630672', // Your Discord application client ID
        statusPhrases: {
            online: 'Online',
            idle: 'Away',
            dnd: 'Do Not Disturb',
            offline: 'Offline'
        }
    },
    music: {
        src: 'https://soundcloud.com/armand-b-886633179/bleach-treachery-aizen-sosukes-theme-drill-remix?in=roh-daun/sets/theme&si=5c2bdcc0075e444a9e1c97f6e71e7aa8&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing', // SoundCloud song URL
        autoplay: true,
        volume: 0.3
    },
    vscode: {
        statusApi: 'http://localhost:3000/api/vscode-status', // VS Code status API endpoint
        checkInterval: 5000 // Check every 5 seconds
    }
};

// DOM Elements
const elements = {
    musicToggle: document.getElementById('music-toggle'),
    bgMusic: document.getElementById('bg-music'),
    discordStatus: document.querySelector('.discord-status'),
    discordLinks: document.querySelectorAll('.discord-link'),
    vscodeIndicator: document.querySelector('.vscode-indicator'),
    vscodeLink: document.getElementById('vscode-status'),
    mobileMenu: document.getElementById('mobile-menu'),
    navMenu: document.querySelector('.nav-menu'),
    navLinks: document.querySelectorAll('.nav-link'),
    contactForm: document.getElementById('contact-form'),
    skillBars: document.querySelectorAll('.skill-progress'),
    toast: document.createElement('div')
};

// Initialize toast notification
elements.toast.className = 'toast';
document.body.appendChild(elements.toast);

// Music Player
class MusicPlayer {
    constructor() {
        this.isPlaying = false;
        this.init();
    }

    init() {
        // Use the audio source from HTML or config
        const audioSource = elements.bgMusic.querySelector('source').src || config.music.src;
        
        if (audioSource && audioSource !== '') {
            elements.bgMusic.src = audioSource;
            elements.bgMusic.volume = config.music.volume;
            
            if (config.music.autoplay) {
                this.play();
            }

            elements.musicToggle.addEventListener('click', () => this.toggle());
        } else {
            // Show message if no music file is configured
            elements.musicToggle.style.opacity = '0.5';
            elements.musicToggle.style.cursor = 'not-allowed';
        }
    }

    play() {
        elements.bgMusic.play().catch(e => {
            console.log('Autoplay prevented:', e);
            // User interaction required for autoplay
            this.isPlaying = false;
            this.updateButton();
        });
        this.isPlaying = true;
        this.updateButton();
    }

    pause() {
        elements.bgMusic.pause();
        this.isPlaying = false;
        this.updateButton();
    }

    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    updateButton() {
        const icon = elements.musicToggle.querySelector('i');
        if (this.isPlaying) {
            icon.className = 'fas fa-pause';
            elements.musicToggle.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        } else {
            icon.className = 'fas fa-music';
            elements.musicToggle.style.background = 'var(--gradient-primary)';
        }
    }
}

// Discord Status Manager
class DiscordStatusManager {
    constructor() {
        this.currentStatus = 'offline';
        this.init();
    }

    init() {
        this.updateDiscordStatus();
        // Update status every 30 seconds
        setInterval(() => this.updateDiscordStatus(), 30000);
        
        // Add click event to Discord links
        elements.discordLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleDiscordClick();
            });
        });
    }

    async updateDiscordStatus() {
        try {
            // Using Discord API-like widget
            const response = await fetch(`https://api.lanyard.rest/v1/users/${config.discord.userId}`);
            
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    const discordData = data.data;
                    this.currentStatus = discordData.discord_status;
                    this.updateStatusDisplay(discordData);
                } else {
                    this.setOfflineStatus();
                }
            } else {
                this.setOfflineStatus();
            }
        } catch (error) {
            console.log('Discord status check failed:', error);
            this.setOfflineStatus();
        }
    }

    updateStatusDisplay(discordData) {
        const statusText = config.discord.statusPhrases[discordData.discord_status] || 'Unknown';
        const statusClass = discordData.discord_status;
        
        // Update status text
        elements.discordStatus.textContent = statusText;
        elements.discordStatus.className = `discord-status ${statusClass}`;
        
        // Update status dot (if you have one)
        const statusDot = document.querySelector('.status-dot');
        if (statusDot) {
            statusDot.className = `status-dot ${statusClass}`;
        }

        // Update custom activity if present
        if (discordData.activities && discordData.activities.length > 0) {
            const activity = discordData.activities[0];
            if (activity.name && activity.name !== 'Custom Status') {
                elements.discordStatus.textContent = `${statusText} - ${activity.name}`;
            }
        }
    }

    setOfflineStatus() {
        this.currentStatus = 'offline';
        elements.discordStatus.textContent = config.discord.statusPhrases.offline;
        elements.discordStatus.className = 'discord-status offline';
        
        const statusDot = document.querySelector('.status-dot');
        if (statusDot) {
            statusDot.className = 'status-dot offline';
        }
    }

    handleDiscordClick() {
        // You can implement Discord invite or profile opening here
        showToast('Discord: 1124801501592813689');
        // Or copy Discord tag to clipboard
        this.copyToClipboard('1124801501592813689');
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Discord tag copied to clipboard!');
        });
    }
}

// VS Code Status Manager
class VSCodeStatusManager {
    constructor() {
        this.isActive = false;
        this.init();
    }

    init() {
        this.checkVSCodeStatus();
        setInterval(() => this.checkVSCodeStatus(), config.vscode.checkInterval);
        
        elements.vscodeLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleVSCodeClick();
        });
    }

    async checkVSCodeStatus() {
        try {
            // This would typically connect to a local server or extension
            // For demo purposes, we'll simulate status detection
            
            // In a real implementation, you might:
            // 1. Use a VS Code extension that exposes an API
            // 2. Check if VS Code processes are running
            // 3. Connect to a local server that VS Code communicates with
            
            // Simulated status check
            const simulatedStatus = await this.simulateVSCodeStatusCheck();
            this.updateVSCodeDisplay(simulatedStatus);
        } catch (error) {
            console.log('VS Code status check failed:', error);
            this.setVSCodeOffline();
        }
    }

    async simulateVSCodeStatusCheck() {
        // This is a simulation - replace with actual VS Code integration
        return new Promise((resolve) => {
            setTimeout(() => {
                // Randomly return online/offline for demo
                resolve({
                    isActive: Math.random() > 0.5,
                    currentFile: 'index.js',
                    workspace: 'github-presentation'
                });
            }, 1000);
        });
    }

    updateVSCodeDisplay(status) {
        this.isActive = status.isActive;
        
        if (status.isActive) {
            elements.vscodeIndicator.textContent = `VS Code: Coding ${status.currentFile}`;
            elements.vscodeIndicator.style.color = 'var(--success-color)';
            elements.vscodeLink.querySelector('i').style.color = 'var(--success-color)';
        } else {
            this.setVSCodeOffline();
        }
    }

    setVSCodeOffline() {
        this.isActive = false;
        elements.vscodeIndicator.textContent = 'VS Code: Offline';
        elements.vscodeIndicator.style.color = 'var(--text-secondary)';
        elements.vscodeLink.querySelector('i').style.color = 'var(--text-secondary)';
    }

    handleVSCodeClick() {
        if (this.isActive) {
            showToast('VS Code is currently active!');
            // You could implement functionality to show current workspace or file
        } else {
            showToast('VS Code is currently offline');
            // Or prompt to open VS Code
        }
    }
}

// Navigation and UI Interactions
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        // Mobile menu toggle
        if (elements.mobileMenu) {
            elements.mobileMenu.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Smooth scrolling for navigation links
        elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavLinkClick(e));
        });

        // Header scroll effect
        this.initScrollEffects();
    }

    toggleMobileMenu() {
        elements.navMenu.classList.toggle('active');
        elements.mobileMenu.classList.toggle('active');
    }

    handleNavLinkClick(e) {
        const href = e.target.getAttribute('href');
        
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                elements.navMenu.classList.remove('active');
                elements.mobileMenu.classList.remove('active');
            }
        }
    }

    initScrollEffects() {
        let lastScroll = 0;
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add/remove header background based on scroll
            if (currentScroll > 50) {
                header.style.background = 'rgba(15, 15, 35, 0.98)';
                header.style.backdropFilter = 'blur(15px)';
            } else {
                header.style.background = 'rgba(15, 15, 35, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            }
            
            lastScroll = currentScroll;
        });
    }
}

// Form Handler
class FormHandler {
    constructor() {
        this.init();
    }

    init() {
        if (elements.contactForm) {
            elements.contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(elements.contactForm);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = elements.contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await this.submitForm(data);
            
            // Show success message
            showToast('Message sent successfully!');
            elements.contactForm.reset();
        } catch (error) {
            // Show error message
            showToast('Failed to send message. Please try again.');
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    async submitForm(data) {
        // Replace with actual form submission logic
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success/failure
                if (Math.random() > 0.2) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Submission failed'));
                }
            }, 1500);
        });
    }
}

// Animation Manager
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.initSkillBars();
        this.initScrollAnimations();
    }

    initSkillBars() {
        // Animate skill bars when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const width = skillBar.style.width;
                    skillBar.style.width = '0%';
                    
                    setTimeout(() => {
                        skillBar.style.width = width;
                    }, 100);
                    
                    observer.unobserve(skillBar);
                }
            });
        }, { threshold: 0.5 });

        elements.skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }

    initScrollAnimations() {
        // Add fade-in animation to elements when they come into view
        const animatedElements = document.querySelectorAll('.skill-card, .contact-info, .contact-form');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 100);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Toast notification function
function showToast(message, duration = 3000) {
    elements.toast.textContent = message;
    elements.toast.classList.add('show');
    
    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, duration);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MusicPlayer();
    new DiscordStatusManager();
    new VSCodeStatusManager();
    new NavigationManager();
    new FormHandler();
    new AnimationManager();
    
    // Show welcome message
    setTimeout(() => {
        showToast('Welcome to my presentation!');
    }, 1000);
});

// Handle page visibility for music autoplay
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, you might want to pause music
        // bgMusic.pause();
    } else {
        // Page is visible, you might want to resume music
        // bgMusic.play();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press 'M' to toggle music
    if (e.key === 'm' || e.key === 'M') {
        if (elements.musicToggle) {
            elements.musicToggle.click();
        }
    }
    
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape') {
        elements.navMenu.classList.remove('active');
        elements.mobileMenu.classList.remove('active');
    }
});

// Theme toggle (bonus feature)
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
}

// Performance optimization - debounce function
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

// Export for potential external use
window.PresentationApp = {
    showToast,
    toggleTheme,
    config
};