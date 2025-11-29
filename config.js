// Personal Information Configuration
// Edit these values to customize your portfolio

const profileConfig = {
    // Personal Information
    personal: {
        name: "anos",
        nickname: "MOI",
        title: "Full Stack Developer",
        description: "Hey! im Moi , i like vibe coding , and can sometimes do serious coding projects , but , i only did 1 serious project for the time being , i speak french and im a little fluent in english,I experiment everyday to improve myself , hope you have a great day!",
        profilePicture: "https://i.etsystatic.com/43905133/r/isla/94ccff/64549231/isla_180x180.64549231_6dw9fw3s.jpg",
        githubUsername: "anos",
        email: "anos@example.com",
        discordTag: "1124801501592813689",
        location: "Paris, France"
    },

    // Social Media Links
    social: {
        github: "https://github.com/anos",
        discord: "https://discord.com/users/1124801501592813689"
    },

    // Discord Configuration
    discord: {
        userId: "1124801501592813689", // Get this from Discord developer portal
        clientId: "1442154953316630672", // Optional: for advanced Discord integration
        showStatus: true,
        statusUpdateInterval: 30000, // 30 seconds
        customStatusPhrases: {
            online: "Available to collaborate",
            idle: "Away - coding later",
            dnd: "Deep focus mode",
            offline: "Currently offline"
        }
    },

    // VS Code Configuration
    vscode: {
        showStatus: true,
        statusApi: "http://localhost:3000/api/vscode-status", // Your local VS Code status server
        checkInterval: 5000, // 5 seconds
        showCurrentFile: true,
        showWorkspace: true
    },

    // Music Player Configuration
    music: {
        enabled: true,
        autoplay: true,
        volume: 0.3,
        loop: true,
        src: "https://soundcloud.com/armand-b-886633179/bleach-treachery-aizen-sosukes-theme-drill-remix?in=roh-daun/sets/theme&si=5c2bdcc0075e444a9e1c97f6e71e7aa8&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing", // SoundCloud song URL
        title: "Bleach - Treachery (Aizen's Theme) Drill Remix",
        // You can add multiple songs for a playlist
        playlist: [
            {
                src: "https://soundcloud.com/armand-b-886633179/bleach-treachery-aizen-sosukes-theme-drill-remix?in=roh-daun/sets/theme&si=5c2bdcc0075e444a9e1c97f6e71e7aa8&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
                title: "Bleach - Treachery (Aizen's Theme) Drill Remix"
            }
        ]
    },

    // Programming Languages and Skills
    skills: [
        {
            name: "Python",
            icon: "fab fa-python",
            level: 90,
            description: "Advanced proficiency in Python development, including web frameworks, data analysis, and automation.",
            category: "programming"
        },
        {
            name: "C++",
            icon: "fas fa-code",
            level: 85,
            description: "Strong understanding of C++ programming, object-oriented concepts, and system-level development.",
            category: "programming"
        },
        {
            name: "JavaScript",
            icon: "fab fa-js",
            level: 80,
            description: "Proficient in modern JavaScript, ES6+, and popular frameworks.",
            category: "programming"
        },
        {
            name: "HTML/CSS",
            icon: "fab fa-html5",
            level: 85,
            description: "Expert in semantic HTML5, CSS3, and responsive design principles.",
            category: "web"
        },
        {
            name: "React",
            icon: "fab fa-react",
            level: 75,
            description: "Experience with React hooks, state management, and component architecture.",
            category: "framework"
        },
        {
            name: "Node.js",
            icon: "fab fa-node-js",
            level: 70,
            description: "Backend development with Express, APIs, and database integration.",
            category: "backend"
        }
    ],

    // Projects Configuration
    projects: [
        {
            title: "Python Data Analysis Tool",
            description: "A comprehensive data analysis tool built with Python, featuring advanced visualization and statistical analysis capabilities.",
            image: "https://via.placeholder.com/400x250/2c3e50/ffffff?text=Project+1",
            technologies: ["Python", "Pandas", "Matplotlib", "NumPy"],
            githubUrl: "https://github.com/anos",
            liveUrl: "https://project-demo.com",
            featured: true
        },
        {
            title: "C++ Game Engine",
            description: "A lightweight 2D game engine developed in C++ with custom physics, rendering system, and entity management.",
            image: "https://via.placeholder.com/400x250/34495e/ffffff?text=Project+2",
            technologies: ["C++", "OpenGL", "SFML", "Physics"],
            githubUrl: "https://github.com/anos",
            liveUrl: "",
            featured: true
        },
        {
            title: "Web Automation Suite",
            description: "An intelligent web automation tool that combines Python and JavaScript for efficient testing and data extraction.",
            image: "https://via.placeholder.com/400x250/16a085/ffffff?text=Project+3",
            technologies: ["Python", "Selenium", "JavaScript", "Node.js"],
            githubUrl: "https://github.com/anos",
            liveUrl: "https://project-demo.com",
            featured: true
        }
    ],

    // Contact Form Configuration
    contact: {
        enabled: true,
        emailService: "your-email-service", // Options: "formspree", "netlify", "custom"
        endpoint: "your-form-endpoint", // Your form processing endpoint
        showEmail: true,
        showDiscord: true,
        showLocation: false
    },

    // Theme and Appearance
    theme: {
        primaryColor: "#667eea",
        secondaryColor: "#764ba2",
        accentColor: "#f093fb",
        darkMode: true,
        animations: true,
        particles: true
    },

    // Analytics and SEO
    seo: {
        title: "anos - Developer Portfolio",
        description: "Passionate developer specializing in Python and C++",
        keywords: "developer, python, c++, portfolio, anos",
        googleAnalyticsId: "", // Optional: GA tracking ID
        favicon: "favicon.ico"
    },

    // Performance Settings
    performance: {
        lazyLoadImages: true,
        minifyAssets: true,
        enableCaching: true,
        preloadFonts: true
    }
};

// Export configuration for use in the application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = profileConfig;
} else {
    window.profileConfig = profileConfig;

}
