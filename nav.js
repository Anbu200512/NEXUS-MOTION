// ============================================
// GLOBAL NAVBAR & THEME CONTROLLER
// Single file for all pages - nav.js
// ============================================

// Navbar HTML Template
const navbarHTML = `
<nav class="navbar">
    <div class="nav-container">
        <div class="flex items-center justify-between gap-3">
            <a href="index.html" class="logo-wrapper">
                <i class="fas fa-film logo-icon"></i>
                <span class="logo-text">NEXUS MOTION</span>
            </a>
            
            <div class="desktop-only items-center gap-1">
                <div class="dropdown">
                    <button class="nav-link flex items-center gap-1">Home <i class="fas fa-chevron-down text-xs"></i></button>
                    <div class="dropdown-menu">
                        <a href="index.html" class="dropdown-item"><i class="fas fa-house-chimney"></i> Home 1</a>
                        <a href="home2.html" class="dropdown-item"><i class="fas fa-laptop-code"></i> Home 2</a>
                    </div>
                </div>
                <a href="about.html" class="nav-link">About</a>
                <a href="demoreel.html" class="nav-link">Demo Reel</a>
                <a href="portfolio.html" class="nav-link">Portfolio</a>
                <a href="expertise.html" class="nav-link">Expertise</a>
                <a href="contact.html" class="nav-link">Contact</a>
            </div>
            
            <div class="desktop-only items-center gap-2">
                <button onclick="window.toggleTheme()" class="icon-btn" id="themeToggleBtn">
                    <i class="fas fa-moon"></i>
                </button>
                <button onclick="window.toggleDirection()" class="icon-btn" id="rtlToggleBtn">
                    <i class="fas fa-arrow-right-arrow-left"></i>
                </button>
                <button onclick="window.showAuthAlert('login')" class="auth-btn auth-btn-outline">
                    <i class="fas fa-sign-in-alt mr-1"></i> Login
                </button>
                <button onclick="window.showAuthAlert('signup')" class="auth-btn">
                    <i class="fas fa-user-plus mr-1"></i> Sign Up
                </button>
            </div>
            
            <button id="hamburgerBtn" class="mobile-only-block w-10 h-10 rounded-full bg-primary text-white items-center justify-center" style="display: none;">
                <i class="fas fa-bars text-xl"></i>
            </button>
        </div>
    </div>
</nav>

<!-- Mobile Menu -->
<div class="mobile-menu-overlay" id="mobileOverlay"></div>
<div class="mobile-menu" id="mobileMenuPanel">
    <div class="mobile-header">
        <a href="index.html" class="logo-wrapper" onclick="window.closeMobileMenu()">
            <i class="fas fa-film logo-icon"></i>
            <span class="logo-text">NEXUS MOTION</span>
        </a>
        <button id="closeMobileBtn" class="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition flex items-center justify-center">
            <i class="fas fa-times text-xl"></i>
        </button>
    </div>
    <div class="px-5 pb-5">
        <div class="flex flex-col gap-2">
            <div>
                <div class="mobile-nav-link" onclick="window.toggleMobileSubmenu('homeSubmenu')">
                    <span><i class="fas fa-home mr-2"></i> HOME</span>
                    <i class="fas fa-chevron-down text-xs"></i>
                </div>
                <div id="homeSubmenu" class="mobile-submenu">
                    <a href="index.html" onclick="window.closeMobileMenu()"><i class="fas fa-house-chimney"></i> Home 1</a>
                    <a href="home2.html" onclick="window.closeMobileMenu()"><i class="fas fa-laptop-code"></i> Home 2</a>
                </div>
            </div>
            <a href="about.html" class="mobile-nav-link" onclick="window.closeMobileMenu()">
                <span><i class="fas fa-user mr-2"></i> About</span><i class="fas fa-arrow-right"></i>
            </a>
            <a href="demoreel.html" class="mobile-nav-link" onclick="window.closeMobileMenu()">
                <span><i class="fas fa-play-circle mr-2"></i> Demo Reel</span><i class="fas fa-arrow-right"></i>
            </a>
            <a href="portfolio.html" class="mobile-nav-link" onclick="window.closeMobileMenu()">
                <span><i class="fas fa-folder-open mr-2"></i> Portfolio</span><i class="fas fa-arrow-right"></i>
            </a>
            <a href="expertise.html" class="mobile-nav-link" onclick="window.closeMobileMenu()">
                <span><i class="fas fa-cogs mr-2"></i> Expertise</span><i class="fas fa-arrow-right"></i>
            </a>
            <a href="contact.html" class="mobile-nav-link" onclick="window.closeMobileMenu()">
                <span><i class="fas fa-envelope mr-2"></i> Contact</span><i class="fas fa-arrow-right"></i>
            </a>
            <div class="mt-3 pt-2 border-t border-gray-200">
                <div class="grid grid-cols-2 gap-3">
                    <a href="#" class="mobile-nav-link justify-center" onclick="window.showAuthAlert('login'); window.closeMobileMenu()">
                        <span><i class="fas fa-sign-in-alt mr-2"></i> Login</span>
                    </a>
                    <a href="#" class="mobile-nav-link justify-center" onclick="window.showAuthAlert('signup'); window.closeMobileMenu()">
                        <span><i class="fas fa-user-plus mr-2"></i> Sign Up</span>
                    </a>
                </div>
            </div>
            <div class="mt-4 grid grid-cols-2 gap-3">
                <button id="mobileThemeBtn" class="control-btn flex items-center justify-center gap-2">
                    <i class="fas fa-moon"></i> Theme
                </button>
                <button id="mobileDirBtn" class="control-btn flex items-center justify-center gap-2">
                    <i class="fas fa-arrow-right-arrow-left"></i> RTL
                </button>
            </div>
        </div>
    </div>
</div>
`;

// ============================================
// GLOBAL CSS (injected once)
// ============================================
const globalStyles = `
<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        font-family: 'Inter', sans-serif;
        background: #FFFFFF;
        overflow-x: hidden;
        transition: background 0.3s ease, color 0.2s ease;
    }
    body.dark {
        background: #0A0A0F;
        color: #E5E7EB;
    }
    body.dark .bg-white { background-color: #111827 !important; }
    body.dark .bg-gray-50, body.dark .bg-gray-100 { background-color: #1F2937 !important; }
    body.dark .border-gray-200 { border-color: #374151 !important; }
    body.dark .navbar { background: rgba(17, 24, 39, 0.98) !important; border-bottom-color: #374151 !important; }
    body.dark .dropdown-menu { background: #1F2937 !important; border-color: #374151 !important; }
    body.dark .dropdown-item { color: #E5E7EB !important; }
    body.dark .mobile-menu { background: #111827 !important; }
    body.dark .mobile-nav-link { background: #1F2937 !important; border-color: #374151 !important; color: #E5E7EB !important; }
    body.dark .mobile-submenu a { background: #1F2937 !important; border-color: #374151 !important; color: #E5E7EB !important; }
    body.dark .icon-btn { background: #1F2937 !important; border-color: #FF3366 !important; color: #FF3366 !important; }
    body.dark .icon-btn:hover { background: #FF3366 !important; color: white !important; }
    body.dark .control-btn { background: #1F2937 !important; border-color: #374151 !important; color: #E5E7EB !important; }
    body.dark .control-btn:hover { background: #FF3366 !important; color: white !important; }
    
    /* Logo Styles */
    .logo-wrapper, .footer-logo-wrapper {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        text-decoration: none;
        flex-shrink: 0;
        white-space: nowrap;
    }
    .logo-icon, .footer-logo-icon {
        display: inline-block;
        color: #FF3366;
        flex-shrink: 0;
        line-height: 1;
    }
    .logo-text, .footer-logo-text {
        display: inline-block;
        background: linear-gradient(135deg, #FF3366, #6C63FF);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        font-weight: 900;
        letter-spacing: -0.3px;
        white-space: nowrap;
        line-height: 1.2;
    }
    @media (min-width: 1280px) {
        .logo-icon, .footer-logo-icon { font-size: 1.8rem; }
        .logo-text, .footer-logo-text { font-size: 1.4rem; }
    }
    @media (max-width: 1279px) and (min-width: 1024px) {
        .logo-icon, .footer-logo-icon { font-size: 1.5rem; }
        .logo-text, .footer-logo-text { font-size: 1.2rem; }
    }
    @media (max-width: 1023px) and (min-width: 768px) {
        .logo-icon, .footer-logo-icon { font-size: 1.2rem; }
        .logo-text, .footer-logo-text { font-size: 0.95rem; }
    }
    @media (max-width: 767px) {
        .logo-icon, .footer-logo-icon { font-size: 1.2rem; }
        .logo-text, .footer-logo-text { font-size: 0.95rem; }
    }
    
    /* Navbar */
    .navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        background: rgba(255, 255, 255, 0.98);
        border-bottom: 1px solid #E5E7EB;
        transition: all 0.3s ease;
    }
    .nav-container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0.75rem 1.5rem;
    }
    @media (max-width: 768px) { .nav-container { padding: 0.6rem 1rem; } }
    .nav-link {
        transition: all 0.2s ease;
        font-size: 13px;
        font-weight: 600;
        padding: 7px 14px;
        border-radius: 40px;
        cursor: pointer;
        background: transparent;
        white-space: nowrap;
        color: #1F2937;
    }
    body.dark .nav-link { color: #E5E7EB; }
    @media (min-width: 1200px) { .nav-link { font-size: 14px; padding: 8px 16px; } }
    .nav-link:hover, .nav-link.active { background: #FF3366; color: white !important; }
    
    .dropdown { position: relative; }
    .dropdown-menu {
        position: absolute;
        top: 100%;
        margin-top: 8px;
        min-width: 160px;
        background: white;
        border-radius: 20px;
        padding: 8px;
        box-shadow: 0 20px 35px -8px rgba(0,0,0,0.15);
        border: 1px solid #E5E7EB;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-5px);
        transition: all 0.2s ease;
        z-index: 1001;
    }
    .dropdown:hover .dropdown-menu { opacity: 1; visibility: visible; transform: translateY(0); }
    .dropdown-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 12px;
        border-radius: 14px;
        font-weight: 500;
        font-size: 12px;
        color: #1F2937;
        text-decoration: none;
        transition: all 0.2s;
    }
    .dropdown-item:hover { background: #FF3366; color: white !important; }
    
    .auth-btn {
        background: linear-gradient(135deg, #FF3366, #6C63FF);
        color: white;
        padding: 7px 16px;
        border-radius: 40px;
        font-weight: 600;
        font-size: 12px;
        transition: all 0.2s;
        cursor: pointer;
        border: none;
        white-space: nowrap;
    }
    @media (min-width: 1200px) { .auth-btn { padding: 8px 18px; font-size: 13px; } }
    .auth-btn-outline { background: transparent; border: 1px solid #FF3366; color: #FF3366; }
    .auth-btn-outline:hover { background: #FF3366; color: white; }
    .auth-btn:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(255,51,102,0.3); }
    
    .icon-btn {
        width: 34px; height: 34px; border-radius: 50%; background: #F3F4F6;
        display: inline-flex; align-items: center; justify-content: center;
        cursor: pointer; transition: all 0.2s; border: 1px solid #E5E7EB; flex-shrink: 0;
        color: #1F2937;
    }
    @media (min-width: 1200px) { .icon-btn { width: 38px; height: 38px; } }
    .icon-btn:hover { background: #FF3366; color: white; border-color: #FF3366; }
    
    /* Mobile Menu */
    .mobile-menu-overlay {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.4); z-index: 1999; opacity: 0; visibility: hidden; transition: 0.25s;
    }
    .mobile-menu-overlay.active { opacity: 1; visibility: visible; }
    .mobile-menu {
        position: fixed; top: 0; right: 0; bottom: 0; width: 85%; max-width: 380px;
        background: #FFFFFF; z-index: 2000; transform: translateX(100%);
        transition: transform 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1); overflow-y: auto;
        box-shadow: -5px 0 30px rgba(0,0,0,0.15);
    }
    .mobile-menu.open { transform: translateX(0); }
    .mobile-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        border-bottom: 1px solid #E5E7EB;
    }
    .mobile-nav-link {
        display: flex; align-items: center; justify-content: space-between;
        padding: 14px 18px; margin: 6px 0; border-radius: 18px;
        font-weight: 600; font-size: 15px; background: #F9FAFB;
        border: 1px solid #E5E7EB; width: 100%; cursor: pointer; color: #1F2937;
        transition: all 0.2s;
    }
    .mobile-nav-link:hover { background: #FF3366; color: white !important; transform: translateX(5px); }
    .mobile-submenu {
        margin-left: 18px; padding-left: 16px; border-left: 2px solid #FF3366; display: none;
    }
    .mobile-submenu.open { display: block; }
    .mobile-submenu a {
        display: flex; align-items: center; gap: 12px; padding: 10px 16px; margin: 6px 0;
        border-radius: 16px; font-weight: 500; font-size: 14px; text-decoration: none;
        background: #FFFFFF; border: 1px solid #E5E7EB; color: #374151; transition: all 0.2s;
    }
    .mobile-submenu a:hover { background: #FF3366; color: white !important; transform: translateX(5px); }
    .control-btn {
        background: #F3F4F6; border: 1px solid #E5E7EB; padding: 12px; border-radius: 16px;
        font-weight: 500; transition: 0.2s; cursor: pointer; width: 100%; text-align: center;
    }
    .control-btn:hover { background: #FF3366; color: white; }
    
    /* Utility Classes */
    .fade-up { opacity: 0; transform: translateY(25px); transition: all 0.7s ease; }
    .fade-up.reveal { opacity: 1; transform: translateY(0); }
    .gradient-text {
        background: linear-gradient(135deg, #FF3366, #6C63FF);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }
    
    @media (max-width: 1024px) {
        .desktop-only { display: none !important; }
        .mobile-only-block { display: flex !important; }
    }
    @media (min-width: 1025px) {
        .mobile-only-block { display: none !important; }
        .desktop-only { display: flex !important; }
    }
    
    [dir="rtl"] .mobile-menu { right: auto; left: 0; transform: translateX(-100%); }
    [dir="rtl"] .mobile-menu.open { transform: translateX(0); }
    [dir="rtl"] .dropdown-menu { right: 0; left: auto; }
</style>
`;

// ============================================
// GLOBAL FOOTER TEMPLATE (optional)
// ============================================
const footerHTML = `
<footer class="footer py-12" style="background-color: #FFFFFF; border-top: 2px solid #FF3366;">
    <div class="max-w-7xl mx-auto px-5 sm:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
                <a href="index.html" class="footer-logo-wrapper">
                    <i class="fas fa-film footer-logo-icon"></i>
                    <span class="footer-logo-text">NEXUS MOTION</span>
                </a>
                <p class="text-sm text-gray-500 leading-relaxed mt-3">Freelance video editor & motion designer.</p>
                <div class="flex gap-3 mt-4">
                    <i class="fab fa-instagram text-gray-400 hover:text-primary cursor-pointer text-lg transition"></i>
                    <i class="fab fa-vimeo text-gray-400 hover:text-primary cursor-pointer text-lg transition"></i>
                    <i class="fab fa-linkedin-in text-gray-400 hover:text-primary cursor-pointer text-lg transition"></i>
                </div>
            </div>
            <div><h4 class="font-bold mb-3" style="color: #FF3366;">Quick Links</h4><ul class="space-y-2 text-sm"><li><a href="demoreel.html" class="text-gray-500 hover:text-primary transition">Demo Reel</a></li><li><a href="portfolio.html" class="text-gray-500 hover:text-primary transition">Portfolio</a></li><li><a href="expertise.html" class="text-gray-500 hover:text-primary transition">Expertise</a></li><li><a href="contact.html" class="text-gray-500 hover:text-primary transition">Inquiry</a></li></ul></div>
            <div><h4 class="font-bold mb-3" style="color: #FF3366;">Services</h4><ul class="space-y-2 text-sm"><li class="text-gray-500"><i class="fas fa-check-circle mr-2" style="color: #FF3366;"></i> Video Editing</li><li class="text-gray-500"><i class="fas fa-check-circle mr-2" style="color: #FF3366;"></i> Motion Graphics</li><li class="text-gray-500"><i class="fas fa-check-circle mr-2" style="color: #FF3366;"></i> Color Grading</li></ul></div>
            <div><h4 class="font-bold mb-3" style="color: #FF3366;">Contact</h4><ul class="space-y-2 text-sm"><li class="text-gray-500"><i class="fas fa-envelope mr-2" style="color: #FF3366;"></i> hello@nexusmotion.com</li><li class="text-gray-500"><i class="fas fa-clock mr-2" style="color: #FF3366;"></i> Mon-Fri: 9AM - 8PM</li><li class="text-gray-500"><i class="fas fa-globe mr-2" style="color: #FF3366;"></i> Remote</li></ul></div>
        </div>
        <div class="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
            <p>© 2025 NEXUS MOTION — All rights reserved.</p>
            <div class="flex gap-4 mt-2 md:mt-0"><a href="#" class="hover:text-primary transition">Privacy</a><a href="#" class="hover:text-primary transition">Terms</a></div>
        </div>
    </div>
</footer>
`;

// ============================================
// INITIALIZATION FUNCTION
// ============================================
function initNavbar() {
    // Inject styles if not already present
    if (!document.getElementById('global-nav-styles')) {
        const styleTag = document.createElement('div');
        styleTag.id = 'global-nav-styles';
        styleTag.innerHTML = globalStyles;
        document.head.insertAdjacentHTML('beforeend', globalStyles);
    }
    
    // Inject navbar HTML at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    
    // Optional: Inject footer at the end of body
    // document.body.insertAdjacentHTML('beforeend', footerHTML);
    
    // Set up event listeners
    setupEventListeners();
    
    // Apply saved theme
    const savedTheme = localStorage.getItem('nexusTheme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }
    
    // Set active link based on current page
    setActiveLink();
}

function setupEventListeners() {
    // Mobile menu buttons
    const hamburger = document.getElementById('hamburgerBtn');
    const closeBtn = document.getElementById('closeMobileBtn');
    const overlay = document.getElementById('mobileOverlay');
    
    if (hamburger) hamburger.addEventListener('click', window.openMobileMenu);
    if (closeBtn) closeBtn.addEventListener('click', window.closeMobileMenu);
    if (overlay) overlay.addEventListener('click', window.closeMobileMenu);
    
    // Mobile theme and direction buttons
    const mobileThemeBtn = document.getElementById('mobileThemeBtn');
    const mobileDirBtn = document.getElementById('mobileDirBtn');
    
    if (mobileThemeBtn) mobileThemeBtn.addEventListener('click', () => {
        window.toggleTheme();
        window.closeMobileMenu();
    });
    if (mobileDirBtn) mobileDirBtn.addEventListener('click', () => {
        window.toggleDirection();
        window.closeMobileMenu();
    });
}

function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

// ============================================
// GLOBAL FUNCTIONS (exposed to window)
// ============================================

window.toggleTheme = function() {
    const isDark = document.body.classList.contains('dark');
    if (isDark) {
        document.body.classList.remove('dark');
        localStorage.setItem('nexusTheme', 'light');
    } else {
        document.body.classList.add('dark');
        localStorage.setItem('nexusTheme', 'dark');
    }
};

window.toggleDirection = function() {
    const newDir = document.documentElement.dir === 'rtl' ? 'ltr' : 'rtl';
    document.documentElement.dir = newDir;
};

window.showAuthAlert = function(type) {
    alert(`${type === 'login' ? 'Login' : 'Sign Up'} — Demo`);
};

window.openMobileMenu = function() {
    const panel = document.getElementById('mobileMenuPanel');
    const overlay = document.getElementById('mobileOverlay');
    if (panel) panel.classList.add('open');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.closeMobileMenu = function() {
    const panel = document.getElementById('mobileMenuPanel');
    const overlay = document.getElementById('mobileOverlay');
    if (panel) panel.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
};

window.toggleMobileSubmenu = function(id) {
    const element = document.getElementById(id);
    if (element) element.classList.toggle('open');
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbar);
} else {
    initNavbar();
}