// Service Worker Registration and Management
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      // Register the service worker
      const registration = await navigator.serviceWorker.register('./sw.js', {
        scope: './'
      });

      console.log('ServiceWorker registered successfully. Scope:', registration.scope);

      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              const notification = document.createElement('div');
              notification.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: var(--brand-500);
                color: white;
                padding: 16px 24px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 9999;
                display: flex;
                align-items: center;
                gap: 12px;
              `;
              notification.innerHTML = `
                New content is available! 
                <button style="background: white; color: var(--brand-500); border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
                  Refresh
                </button>
              `;

              document.body.appendChild(notification);

              notification.querySelector('button').addEventListener('click', () => {
                newWorker.postMessage({ type: 'skipWaiting' });
                notification.remove();
              });
            }
          }
        });
      });

      // Handle controller change (when skipWaiting is called)
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing && !navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
          refreshing = true;
          window.location.reload();
        }
      });

    } catch (error) {
      console.error('ServiceWorker registration failed:', error);
    }
  });

  // Handle service worker messages
  navigator.serviceWorker.addEventListener('message', event => {
    if (event.data && event.data.type === 'reload') {
      window.location.reload();
    }
  });
}

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
  return 'dark'; // Default to dark theme
};

// Apply theme
const applyTheme = (theme) => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('theme', theme);

  // Update icons
  const isDark = theme === 'dark';
  // Set moon icon for dark mode, sun icon for light mode
  themeIcon.setAttribute('name', isDark ? 'moon' : 'sun');
  mobileThemeIcon.setAttribute('name', isDark ? 'moon' : 'sun');
  // Re-render icons after changing the name attribute
  if (typeof lucide !== 'undefined') {
    lucide.createIcons({
      nodes: [themeIcon.parentElement, mobileThemeIcon.parentElement], // Target the parent elements containing the icons
      attrs: { // Ensure attributes like size and stroke-width are preserved
        'stroke-width': themeIcon.getAttribute('stroke-width') || 1.5, // Use existing or default
      }
    });
  }
  lucide.createIcons();
  createIcons();
};

// Toggle theme
const toggleTheme = () => {
  const currentTheme = localStorage.getItem('theme') || 'dark';
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

const setupProjectsCarousel = () => {
  const carousels = document.querySelectorAll('[data-project-carousel]');
  if (!carousels.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  carousels.forEach((carousel) => {
    const track = carousel.querySelector('[data-project-track]');
    const viewport = carousel.querySelector('.project-carousel-viewport');
    const prevButton = carousel.querySelector('[data-project-prev]');
    const nextButton = carousel.querySelector('[data-project-next]');
    const dotsContainer = carousel.querySelector('[data-project-dots]');
    const baseSlides = Array.from(carousel.querySelectorAll('.project-slide')).map((slide) => slide.cloneNode(true));
    const autoplayDelay = Number(carousel.dataset.autoplayDelay || 3600);
    const transitionMs = Number(carousel.dataset.transitionMs || 1100);

    if (!track || !viewport || baseSlides.length < 2) return;

    let currentIndex = 0;
    let logicalIndex = 0;
    let slidesPerView = 1;
    let cloneCount = 1;
    let autoplayTimer = null;
    let kickoffTimer = null;
    let resizeTimer = null;

    const getSlidesPerView = () => {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    };

    const getGap = () => {
      const styles = window.getComputedStyle(track);
      return parseFloat(styles.gap || styles.columnGap || '0') || 0;
    };

    const getStep = () => {
      const firstSlide = track.querySelector('.project-slide');
      if (!firstSlide) return 0;
      return firstSlide.offsetWidth + getGap();
    };

    const applyVisualState = () => {
      const allSlides = Array.from(track.querySelectorAll('.project-slide'));
      if (!allSlides.length) return;

      allSlides.forEach((slide, idx) => {
        const distance = Math.abs(idx - currentIndex);
        let proximity = 0;

        if (distance === 0) proximity = 1;
        else if (distance === 1) proximity = 0.58;
        else if (distance === 2) proximity = 0.24;

        slide.style.setProperty('--center-proximity', String(proximity));
        slide.classList.toggle('is-featured', distance === 0);
      });
    };

    const updateDots = () => {
      const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll('.project-carousel-dot')) : [];
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === logicalIndex);
        dot.setAttribute('aria-current', index === logicalIndex ? 'true' : 'false');
      });
    };

    const applyOffset = (animated = true) => {
      const allSlides = Array.from(track.querySelectorAll('.project-slide'));
      const targetSlide = allSlides[currentIndex];
      if (!targetSlide) return;

      const step = getStep();
      if (!step) return;

      const viewportWidth = viewport.clientWidth;
      const slideWidth = targetSlide.offsetWidth;
      const centeredOffset = (viewportWidth / 2) - (slideWidth / 2) - (step * currentIndex);

      track.style.transition = animated ? `transform ${transitionMs}ms cubic-bezier(0.22, 1, 0.36, 1)` : 'none';
      carousel.style.setProperty('--project-offset', `${centeredOffset}px`);
      updateDots();
      applyVisualState();
    };

    const normalizeAfterLoop = () => {
      const total = baseSlides.length;
      let normalized = false;

      if (currentIndex >= total + cloneCount) {
        currentIndex = cloneCount;
        logicalIndex = 0;
        normalized = true;
      } else if (currentIndex < cloneCount) {
        currentIndex = total + cloneCount - 1;
        logicalIndex = total - 1;
        normalized = true;
      }

      if (normalized) {
        // Jump from cloned boundary slide to matching real slide with transitions disabled.
        applyOffset(false);
        // Force paint so the jump commits before transition is re-enabled.
        track.getBoundingClientRect();
        requestAnimationFrame(() => {
          track.style.transition = 'none';
          requestAnimationFrame(() => {
            track.style.transition = `transform ${transitionMs}ms cubic-bezier(0.22, 1, 0.36, 1)`;
          });
        });
      }
    };

    const goToLogical = (nextLogicalIndex) => {
      const total = baseSlides.length;
      logicalIndex = ((nextLogicalIndex % total) + total) % total;
      currentIndex = logicalIndex + cloneCount;
      applyOffset(true);
    };

    const goNext = () => {
      const total = baseSlides.length;
      logicalIndex = (logicalIndex + 1) % total;
      currentIndex += 1;
      applyOffset(true);
    };

    const goPrev = () => {
      const total = baseSlides.length;
      logicalIndex = (logicalIndex - 1 + total) % total;
      currentIndex -= 1;
      applyOffset(true);
    };

    const renderTrack = () => {
      slidesPerView = getSlidesPerView();
      cloneCount = Math.max(slidesPerView, 2);
      track.innerHTML = '';

      const total = baseSlides.length;
      const prependClones = baseSlides
        .slice(total - cloneCount)
        .map((slide) => slide.cloneNode(true));
      const realSlides = baseSlides.map((slide) => slide.cloneNode(true));
      const appendClones = baseSlides
        .slice(0, cloneCount)
        .map((slide) => slide.cloneNode(true));

      [...prependClones, ...realSlides, ...appendClones].forEach((slide) => {
        track.appendChild(slide);
      });

      currentIndex = logicalIndex + cloneCount;
      applyOffset(false);
      applyVisualState();
    };

    const buildDots = () => {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      const pageCount = baseSlides.length;

      for (let i = 0; i < pageCount; i += 1) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'project-carousel-dot';
        dot.setAttribute('aria-label', `Go to project slide ${i + 1}`);
        dot.addEventListener('click', () => goToLogical(i));
        dotsContainer.appendChild(dot);
      }

      updateDots();
    };

    const stopAutoplay = () => {
      if (autoplayTimer) {
        window.clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
      if (kickoffTimer) {
        window.clearTimeout(kickoffTimer);
        kickoffTimer = null;
      }
    };

    const startAutoplay = () => {
      if (prefersReducedMotion) return;
      stopAutoplay();
      kickoffTimer = window.setTimeout(() => {
        goNext();
      }, 800);
      autoplayTimer = window.setInterval(goNext, autoplayDelay);
    };

    track.addEventListener('transitionend', (event) => {
      if (event.propertyName !== 'transform') return;
      normalizeAfterLoop();
      applyVisualState();
    });

    if (prevButton) {
      prevButton.addEventListener('click', goPrev);
    }

    if (nextButton) {
      nextButton.addEventListener('click', goNext);
    }

    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('focusin', stopAutoplay);
    carousel.addEventListener('focusout', startAutoplay);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });

    window.addEventListener('resize', () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        renderTrack();
      }, 120);
    });

    buildDots();
    renderTrack();
    startAutoplay();
  });
};

// Function to highlight the active navigation link
const highlightActiveLink = () => {
  const currentPage = window.location.pathname.split('/').pop(); // Get the current filename (e.g., "index.html")
  // Handle the case where the path is just "/" (root) - treat it as index.html
  const targetPage = currentPage === '' ? 'index.html' : currentPage;

  // Select all navigation links (desktop, mobile, footer)
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link, .mobile-nav .nav-link, .footer-links a');

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    // Special case for the root/index page
    const linkTargetPage = linkPage === '' ? 'index.html' : linkPage;

    // Check if the link's target page matches the current page
    if (linkTargetPage === targetPage) {
      link.classList.add('active-link');
    } else {
      link.classList.remove('active-link'); // Ensure others are not active
    }
  });
};


// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  createIcons();

  // Apply saved theme
  // applyTheme(getTheme()); // This is now handled by theme-loader.js

  // Event listeners
  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);
  if (menuToggle) menuToggle.addEventListener('click', toggleMobileMenu);
  if (scrollToTopBtn) scrollToTopBtn.addEventListener('click', scrollToTop);
  window.addEventListener('scroll', handleScroll);

  // Close mobile menu when clicking on a link (only if mobile menu exists)
  if (mobileMenu) {
    document.querySelectorAll('.mobile-nav .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        // Ensure toggleMobileMenu is only called if menuToggle exists
        if (menuToggle) {
          toggleMobileMenu();
        }
      });
    });
  }

  // Setup animations
  // Removed call to initResumeSticky()
  setupProjectsCarousel();
  setupScrollAnimation();

  // Highlight the active navigation link
  highlightActiveLink();

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
