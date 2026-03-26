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
  renderBrandIcons();
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

// Render brand/social icons that were removed from lucide
const renderBrandIcons = () => {
  const svgNS = 'http://www.w3.org/2000/svg';
  const brandIconNodes = {
    linkedin: [
      ["path", { d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" }],
      ["rect", { x: "2", y: "9", width: "4", height: "12" }],
      ["circle", { cx: "4", cy: "4", r: "2" }]
    ],
    twitter: [
      ["path", { d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" }]
    ],
    github: [
      ["path", { d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" }],
      ["path", { d: "M9 18c-4.51 2-5-2-7-2" }]
    ],
    youtube: [
      ["path", { d: "M12 19c-2.3 0-6.4-.2-8.1-.6-.7-.2-1.2-.7-1.4-1.4-.3-1.1-.5-3.4-.5-5s.2-3.9.5-5c.2-.7.7-1.2 1.4-1.4C5.6 5.2 9.7 5 12 5s6.4.2 8.1.6c.7.2 1.2.7 1.4 1.4.3 1.1.5 3.4.5 5s-.2 3.9-.5 5c-.2.7-.7 1.2-1.4 1.4-1.7.4-5.8.6-8.1.6z" }],
      ["polygon", { points: "10 15 15 12 10 9" }]
    ]
  };

  Object.entries(brandIconNodes).forEach(([iconName, nodes]) => {
    document.querySelectorAll(`i[data-lucide="${iconName}"]`).forEach(el => {
      const size = el.getAttribute('size') || el.getAttribute('width') || '24';
      const strokeWidth = el.getAttribute('stroke-width') || '2';
      const extraClasses = el.getAttribute('class') || '';

      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('xmlns', svgNS);
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('stroke', 'currentColor');
      svg.setAttribute('stroke-width', strokeWidth);
      svg.setAttribute('stroke-linecap', 'round');
      svg.setAttribute('stroke-linejoin', 'round');
      svg.setAttribute('class', `lucide lucide-${iconName}${extraClasses ? ' ' + extraClasses : ''}`);

      nodes.forEach(([tag, attrs]) => {
        const child = document.createElementNS(svgNS, tag);
        Object.entries(attrs).forEach(([attr, val]) => child.setAttribute(attr, val));
        svg.appendChild(child);
      });

      el.parentNode.replaceChild(svg, el);
    });
  });
};

// Setup Lucide icons
const createIcons = () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
    renderBrandIcons();
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

const setupPostImageLightbox = () => {
  const postContent = document.querySelector('.post-prose');
  if (!postContent) return;

  const images = Array.from(postContent.querySelectorAll('img.hero-image'));
  if (!images.length) return;

  images.forEach((image) => {
    if (!image.hasAttribute('tabindex')) image.setAttribute('tabindex', '0');
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', image.alt ? `Open image: ${image.alt}` : 'Open image');
  });

  const overlay = document.createElement('div');
  overlay.className = 'image-lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Image preview');
  overlay.hidden = true;
  overlay.innerHTML = `
    <button type="button" class="image-lightbox__close" aria-label="Close image preview">&times;</button>
    <div class="image-lightbox__panel">
      <img class="image-lightbox__image" alt="" />
    </div>
  `;

  const lightboxImage = overlay.querySelector('.image-lightbox__image');
  const closeButton = overlay.querySelector('.image-lightbox__close');
  let previousOverflow = '';
  let activeImage = null;
  let hasRetriedSvgLoad = false;

  const resolveImageSource = (image) => {
    const rawSrc = image.getAttribute('src');
    if (rawSrc) return new URL(rawSrc, window.location.href).href;
    return image.currentSrc || image.src;
  };

  const closeLightbox = () => {
    overlay.hidden = true;
    document.body.style.overflow = previousOverflow;
    lightboxImage.src = '';
    lightboxImage.alt = '';
    if (activeImage) activeImage.focus();
    activeImage = null;
  };

  const openLightbox = (image) => {
    activeImage = image;
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    hasRetriedSvgLoad = false;
    lightboxImage.src = resolveImageSource(image);
    lightboxImage.alt = image.alt || '';
    overlay.hidden = false;
    closeButton.focus();
  };

  lightboxImage.addEventListener('error', () => {
    const src = lightboxImage.src || '';
    if (hasRetriedSvgLoad || !src) return;

    if (src.endsWith('.svgz')) {
      hasRetriedSvgLoad = true;
      lightboxImage.src = src.replace(/\.svgz$/, '.svg');
      return;
    }

    if (src.endsWith('.svg')) {
      hasRetriedSvgLoad = true;
      lightboxImage.src = `${src}z`;
    }
  });

  postContent.addEventListener('click', (event) => {
    const image = event.target.closest('img.hero-image');
    if (!image) return;
    openLightbox(image);
  });

  postContent.addEventListener('keydown', (event) => {
    const image = event.target.closest('img.hero-image');
    if (!image) return;
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    openLightbox(image);
  });

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay || event.target === closeButton) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (!overlay.hidden && event.key === 'Escape') {
      closeLightbox();
    }
  });

  document.body.appendChild(overlay);
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
  setupPostImageLightbox();

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
