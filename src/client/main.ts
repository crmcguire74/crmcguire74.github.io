import { prefersReducedMotion } from './dom';
import { initAiExplorationsPage } from './pages/aiExplorations';
import { initArticleReaderPage } from './pages/articleReader';
import { initBiographyPage } from './pages/biography';
import { initContactPage } from './pages/contact';
import { initHomePage } from './pages/home';
import { initLibraryPage } from './pages/library';
import { initNotFoundPage } from './pages/notFound';
import {
  initBlueprintPage,
  initModusAiPage,
  initSnapClipperPage,
} from './pages/productDetails';
import { initProjectsPage } from './pages/projects';
import { initResumePage } from './pages/resume';

function initNavbarAndFooter(): void {
  const menuBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  const openIcon = document.getElementById('mobile-menu-icon-open');
  const closeIcon = document.getElementById('mobile-menu-icon-close');

  const setDrawerOpen = (open: boolean) => {
    if (!drawer || !menuBtn) return;
    drawer.classList.toggle('hidden', !open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    openIcon?.classList.toggle('hidden', open);
    closeIcon?.classList.toggle('hidden', !open);
  };

  menuBtn?.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    setDrawerOpen(!expanded);
  });

  drawer?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setDrawerOpen(false));
  });

  const backToTopBtn = document.getElementById('back-to-top-btn');
  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  });

  const progressBar = document.getElementById('nav-scroll-progress');
  if (progressBar) {
    let rafPending = false;
    const updateProgress = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const ratio = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      progressBar.style.transform = `scaleX(${ratio.toFixed(4)})`;
      rafPending = false;
    };
    window.addEventListener(
      'scroll',
      () => {
        if (rafPending) return;
        rafPending = true;
        window.requestAnimationFrame(updateProgress);
      },
      { passive: true }
    );
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();
  }
}

function initReveals(): void {
  const revealNodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (!revealNodes.length) return;

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    revealNodes.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.06, rootMargin: '0px 0px -36px 0px' }
  );

  revealNodes.forEach((el) => observer.observe(el));
}

function initMagneticSurfaces(): void {
  if (prefersReducedMotion()) return;
  const surfaces = document.querySelectorAll<HTMLElement>('[data-magnetic]');
  surfaces.forEach((surface) => {
    const glow = surface.querySelector<HTMLElement>('[data-magnetic-glow]');
    if (!glow) return;

    surface.addEventListener('pointermove', (e) => {
      const rect = surface.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.background = `radial-gradient(280px circle at ${x}px ${y}px, rgba(0, 166, 255, 0.14), transparent 70%)`;
      glow.style.opacity = '1';
    });

    surface.addEventListener('pointerleave', () => {
      glow.style.opacity = '0';
    });
  });
}

const HERO_PARALLAX_SPECS: Record<string, { maxY: number; scaleTo?: number }> = {
  'desktop-bg': { maxY: 112, scaleTo: 1.09 },
  'desktop-copy': { maxY: -54 },
  'desktop-portrait': { maxY: 72, scaleTo: 1.05 },
  'mobile-bg': { maxY: 76, scaleTo: 1.08 },
  'mobile-portrait': { maxY: -34 },
  'mobile-curtain': { maxY: 22 },
  'bio-mobile-bg': { maxY: 78, scaleTo: 1.08 },
  'bio-mobile-portrait': { maxY: -30 },
  'bio-desktop-bg': { maxY: 104, scaleTo: 1.08 },
  'bio-desktop-portrait': { maxY: 64, scaleTo: 1.04 },
  'bio-copy': { maxY: -44 },
  'resume-mobile-skyline': { maxY: 78, scaleTo: 1.08 },
  'resume-mobile-portrait': { maxY: -30 },
  'resume-desktop-skyline': { maxY: 102, scaleTo: 1.08 },
  'resume-desktop-portrait': { maxY: 62, scaleTo: 1.04 },
  'resume-copy': { maxY: -42 },
  'projects-mobile-bg': { maxY: 76, scaleTo: 1.08 },
  'projects-mobile-portrait': { maxY: -28 },
  'projects-desktop-bg': { maxY: 96, scaleTo: 1.08 },
  'projects-desktop-portrait': { maxY: 58, scaleTo: 1.04 },
  'projects-copy': { maxY: -40 },
  'ai-labs-mobile-bg': { maxY: 76, scaleTo: 1.08 },
  'ai-labs-mobile-portrait': { maxY: -30 },
  'ai-labs-desktop-bg': { maxY: 96, scaleTo: 1.08 },
  'ai-labs-desktop-portrait': { maxY: 58, scaleTo: 1.04 },
  'ai-labs-copy': { maxY: -40 },
  'library-mobile-bg': { maxY: 76, scaleTo: 1.08 },
  'library-mobile-portrait': { maxY: -30 },
  'library-desktop-bg': { maxY: 96, scaleTo: 1.08 },
  'library-desktop-portrait': { maxY: 58, scaleTo: 1.04 },
  'library-copy': { maxY: -40 },
  'contact-mobile-video': { maxY: 86, scaleTo: 1.12 },
  'contact-desktop-video': { maxY: 108, scaleTo: 1.12 },
  'contact-copy': { maxY: -42 },
  'notfound-grid': { maxY: 64, scaleTo: 1.04 },
  'notfound-copy': { maxY: -36 },
};

function initScrollParallax(): void {
  if (prefersReducedMotion()) return;

  const heroNodes = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]')).filter(
    (el) => {
      const key = el.getAttribute('data-parallax') || '';
      return key in HERO_PARALLAX_SPECS;
    }
  );
  const windowImgs = Array.from(
    document.querySelectorAll<HTMLImageElement>('[data-parallax-window] img')
  );

  if (!heroNodes.length && !windowImgs.length) return;

  let rafPending = false;
  const update = () => {
    const sy = window.scrollY;
    const heroRatio = Math.min(Math.max(sy / 600, 0), 1);

    heroNodes.forEach((el) => {
      const key = el.getAttribute('data-parallax') || '';
      const spec = HERO_PARALLAX_SPECS[key];
      if (!spec) return;
      const y = heroRatio * spec.maxY;
      const s = spec.scaleTo ? 1 + heroRatio * (spec.scaleTo - 1) : 1;
      el.style.transform =
        s !== 1
          ? `translate3d(0, ${y.toFixed(1)}px, 0) scale(${s.toFixed(4)})`
          : `translate3d(0, ${y.toFixed(1)}px, 0)`;
    });

    const vh = window.innerHeight || 900;
    windowImgs.forEach((img) => {
      const container = img.parentElement;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      if (rect.bottom < -140 || rect.top > vh + 140) return;
      const progress = Math.min(
        Math.max((vh - rect.top) / (vh + rect.height), 0),
        1
      );
      const offset = (progress - 0.5) * 52;
      img.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.12)`;
    });

    rafPending = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (rafPending) return;
      rafPending = true;
      window.requestAnimationFrame(update);
    },
    { passive: true }
  );
  update();
}

function bootstrap(): void {
  initNavbarAndFooter();
  initReveals();
  initMagneticSurfaces();
  initScrollParallax();

  const pageId = document.body.dataset.page;
  switch (pageId) {
    case 'home':
      initHomePage();
      break;
    case 'biography':
      initBiographyPage();
      break;
    case 'resume':
      initResumePage();
      break;
    case 'projects':
      initProjectsPage();
      break;
    case 'modus-ai':
      initModusAiPage();
      break;
    case 'snapclipper':
      initSnapClipperPage();
      break;
    case 'blueprint':
      initBlueprintPage();
      break;
    case 'ai-explorations':
      initAiExplorationsPage();
      break;
    case 'blog':
      initLibraryPage();
      break;
    case 'article':
      initArticleReaderPage();
      break;
    case 'contact':
      initContactPage();
      break;
    case 'not-found':
      initNotFoundPage();
      break;
    default:
      break;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
