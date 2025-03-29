// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenu = document.getElementById('mobile-menu');
const menuToggle = document.getElementById('menu-toggle');
const menuIcon = document.getElementById('menu-icon');
const themeToggle = document.getElementById('theme-toggle');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const mobileThemeIcon = document.getElementById('mobile-theme-icon');
const scrollToTopBtn = document.getElementById('scrollToTop');

// Check for saved theme preference or use browser preference
const getTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Apply theme
const applyTheme = (theme) => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('theme', theme);
  
  // Update icons
  const isDark = theme === 'dark';
  themeIcon.setAttribute('name', isDark ? 'sun' : 'moon');
  mobileThemeIcon.setAttribute('name', isDark ? 'sun' : 'moon');
};

// Toggle theme
const toggleTheme = () => {
  const currentTheme = localStorage.getItem('theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
};

// Toggle mobile menu
const toggleMobileMenu = () => {
  mobileMenu.classList.toggle('open');
  if (mobileMenu.classList.contains('open')) {
    menuIcon.setAttribute('name', 'x');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
  } else {
    menuIcon.setAttribute('name', 'menu');
    document.body.style.overflow = ''; // Re-enable scrolling
  }
};

// Handle navbar scroll
const handleScroll = () => {
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Show/hide scroll to top button
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
};

// Scroll to top function
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Setup Lucide icons
const createIcons = () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
};


// Add a simple animation for content as it scrolls into view
const setupScrollAnimation = () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Animate cards and sections
  document.querySelectorAll('.skill-card, .experience-card, .project-card, .blog-card, .section-header').forEach(element => {
    element.classList.add('animate-on-scroll');
    observer.observe(element);
  });
};

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  createIcons();
  
  // Apply saved theme
  applyTheme(getTheme());
  
  // Event listeners
  themeToggle.addEventListener('click', toggleTheme);
  mobileThemeToggle.addEventListener('click', toggleTheme);
  menuToggle.addEventListener('click', toggleMobileMenu);
  scrollToTopBtn.addEventListener('click', scrollToTop);
  window.addEventListener('scroll', handleScroll);
  
  // Close mobile menu when clicking on a link
  document.querySelectorAll('.mobile-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggleMobileMenu();
    });
  });
  
  // Setup animations
  // Removed call to initResumeSticky()
  setupScrollAnimation();
  
  // Initial scroll check
  handleScroll();
});

// Add CSS for animations that depend on JavaScript
const style = document.createElement('style');
style.textContent = `
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  
  .animate-on-scroll.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .scroll-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: var(--brand-500);
    color: white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: opacity 0.3s, visibility 0.3s, transform 0.3s, background-color 0.3s;
    cursor: pointer;
    z-index: 40;
    border: none;
  }
  
  .scroll-top:hover {
    background-color: var(--brand-600);
  }
  
  .scroll-top.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fade-in-right {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes fade-in-left {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(0.95); }
  }
  
  @keyframes floating {
    0%, 100% { transform: translateY(0) rotate(0); }
    25% { transform: translateY(-10px) rotate(1deg); }
    50% { transform: translateY(-15px) rotate(-1deg); }
    75% { transform: translateY(-5px) rotate(1deg); }
  }
  
  .btn-primary, .btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border-radius: 9999px;
    font-weight: 500;
    transition: all 0.3s;
  }
  
  .btn-primary {
    background-color: var(--brand-600);
    color: white;
    border: none;
  }
  
  .btn-primary:hover {
    background-color: var(--brand-700);
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(var(--brand-500-rgb), 0.2);
  }
  
  .btn-secondary {
    background-color: transparent;
    color: var(--dark-800);
    border: 1px solid var(--dark-300);
  }
  
  .dark .btn-secondary {
    color: white;
    border-color: var(--dark-700);
  }
  
  .btn-secondary:hover {
    border-color: var(--brand-500);
    background-color: rgba(var(--brand-50-rgb), 1);
    transform: translateY(-2px);
  }
  
  .dark .btn-secondary:hover {
    background-color: rgba(var(--brand-900-rgb), 0.2);
  }
  
  .link-with-icon {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    color: var(--brand-600);
    font-weight: 500;
    transition: color 0.3s;
  }
  
  .dark .link-with-icon {
    color: var(--brand-400);
  }
  
  .link-with-icon:hover {
    color: var(--brand-700);
  }
  
  .dark .link-with-icon:hover {
    color: var(--brand-300);
  }
`;

document.head.appendChild(style);
