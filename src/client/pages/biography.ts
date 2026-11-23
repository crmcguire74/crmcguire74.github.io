import { ASSETS } from '../../data/siteData';
import { resolveActiveChapterIndex } from '../../utils/portfolioLogic';
import { prefersReducedMotion } from '../dom';
import { initAmbientVideoStage } from '../videoAmbient';

export function initBiographyPage(): void {
  initAmbientVideoStage({
    desktopSlotId: 'bio-highlights-desktop-video-slot',
    mobileSlotId: 'bio-highlights-mobile-video-slot',
    muteButtonSelector: '[data-bio-mute]',
    embedUrl: ASSETS.biographyVideoEmbedUrl,
    title: 'Christopher R McGuire — Professional Life Highlights',
    startMuted: true,
  });

  const chapters = Array.from(document.querySelectorAll<HTMLElement>('[data-bio-chapter]'));
  const railBtns = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-bio-rail-btn]'));
  const jumpLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-bio-jump]'));
  const highlightsSection = document.getElementById('bio-highlights-video');
  const highlightsParallaxNodes = highlightsSection
    ? Array.from(highlightsSection.querySelectorAll<HTMLElement>('[data-bio-highlights-parallax]'))
    : [];

  const smooth = !prefersReducedMotion();

  jumpLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('data-bio-jump');
      if (!targetId) return;
      const el = document.getElementById(targetId);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
    });
  });

  if (!chapters.length) return;

  let activeIdx = 0;
  const setRailActive = (nextIdx: number) => {
    if (nextIdx === activeIdx) return;
    activeIdx = nextIdx;
    railBtns.forEach((btn, idx) => {
      const bar = btn.querySelector<HTMLElement>('[data-bio-rail-bar]');
      const label = btn.querySelector<HTMLElement>('[data-bio-rail-label]');
      const isCurrent = idx === nextIdx;
      if (isCurrent) {
        btn.setAttribute('aria-current', 'step');
      } else {
        btn.removeAttribute('aria-current');
      }
      if (bar) {
        bar.className = `h-[2px] transition-all duration-200 ${
          isCurrent
            ? 'w-7 bg-[#00A6FF] shadow-[0_0_8px_#00A6FF]'
            : 'w-3 bg-slate-600 group-hover:w-5 group-hover:bg-slate-400'
        }`;
      }
      if (label) {
        label.className = `font-mono-tabular text-[11px] transition-colors ${
          isCurrent ? 'text-[#38BDF8] font-semibold' : 'text-slate-500 group-hover:text-slate-300'
        }`;
      }
    });
  };

  if ('IntersectionObserver' in window && railBtns.length) {
    const ratios = new Array(chapters.length).fill(0);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idxStr = entry.target.getAttribute('data-bio-chapter');
          const idx = idxStr ? Number(idxStr) : -1;
          if (idx >= 0 && idx < ratios.length) {
            ratios[idx] = entry.isIntersecting ? entry.intersectionRatio : 0;
          }
        });
        setRailActive(resolveActiveChapterIndex(ratios, activeIdx));
      },
      { threshold: [0.05, 0.25, 0.5, 0.75] }
    );
    chapters.forEach((ch) => observer.observe(ch));
  }

  if (!smooth) return;

  const updateChapterParallax = () => {
    const vh = window.innerHeight || 900;
    const isDesktop = window.innerWidth >= 1024;

    if (highlightsSection && highlightsParallaxNodes.length) {
      const hRect = highlightsSection.getBoundingClientRect();
      if (hRect.bottom >= -150 && hRect.top <= vh + 150) {
        const hp = Math.min(Math.max((vh - hRect.top) / (vh + hRect.height), 0), 1);
        const hY = (0.5 - hp) * 64;
        const hScale = 1.05 + hp * 0.07;
        highlightsParallaxNodes.forEach((node) => {
          node.style.transform = `translate3d(0, ${hY.toFixed(1)}px, 0) scale(${hScale.toFixed(4)})`;
        });
      }
    }

    chapters.forEach((ch) => {
      const rect = ch.getBoundingClientRect();
      if (rect.bottom < -vh || rect.top > vh * 2) return;

      const totalTravel = rect.height + vh;
      const p = Math.min(Math.max((vh - rect.top) / totalTravel, 0), 1);
      const align = ch.getAttribute('data-bio-align') === 'right' ? 1 : -1;

      const progressEl = ch.querySelector<HTMLElement>('[data-bio-progress]');
      if (progressEl) {
        progressEl.style.transform = `scaleX(${Math.min(p * 1.15, 1).toFixed(4)})`;
      }

      const bgEl = ch.querySelector<HTMLElement>('[data-bio-bg]');
      if (bgEl) {
        const bgY = (0.5 - p) * 144;
        const bgScale = 1.16 - Math.abs(p - 0.5) * 0.14;
        bgEl.style.transform = `translate3d(0, ${bgY.toFixed(1)}px, 0) scale(${bgScale.toFixed(4)})`;
      }

      const cardEl = ch.querySelector<HTMLElement>('[data-bio-card]');
      if (cardEl) {
        if (isDesktop) {
          const cardY = p <= 0.5 ? (1 - p / 0.5) * 44 : ((p - 0.5) / 0.5) * -36;
          const enterProgress = Math.min(Math.max((p - 0.08) / 0.28, 0), 1);
          const cardX = align * (1 - enterProgress) * 26;
          const cardScale = 0.985 + (1 - Math.abs(p - 0.5) * 2) * 0.015;
          cardEl.style.transform = `translate3d(${cardX.toFixed(1)}px, ${cardY.toFixed(1)}px, 0) scale(${cardScale.toFixed(4)})`;
        } else {
          const mobEnter = Math.min(Math.max((p - 0.05) / 0.25, 0), 1);
          const mobY = (1 - mobEnter) * 22;
          cardEl.style.transform = `translate3d(0, ${mobY.toFixed(1)}px, 0)`;
        }
      }

      const yearEl = ch.querySelector<HTMLElement>('[data-bio-year]');
      if (yearEl) {
        const yearY = (0.5 - p) * 34;
        yearEl.style.transform = `translate3d(0, ${yearY.toFixed(1)}px, 0)`;
      }

      const gridEl = ch.querySelector<HTMLElement>('[data-bio-grid]');
      if (gridEl) {
        const gridY = (p - 0.5) * 68;
        gridEl.style.transform = `translate3d(0, ${gridY.toFixed(1)}px, 0)`;
      }

      const strokeEls = ch.querySelectorAll<SVGGeometryElement>('[data-bio-stroke]');
      strokeEls.forEach((svgPath) => {
        const total = Number(svgPath.getAttribute('data-bio-stroke')) || 600;
        const draw = Math.min(Math.max((p - 0.14) / 0.52, 0), 1);
        svgPath.style.strokeDashoffset = `${(total * (1 - draw)).toFixed(1)}`;
      });

      const thriveSeed = ch.querySelector<HTMLElement>('[data-bio-thrive-seed]');
      if (thriveSeed) {
        if (isDesktop) {
          const emerge = Math.min(Math.max((p - 0.12) / 0.3, 0), 1);
          thriveSeed.style.opacity = `${(0.42 + emerge * 0.58).toFixed(3)}`;
          thriveSeed.style.transform = `translate3d(0, ${((1 - emerge) * 34).toFixed(1)}px, 0) scale(${(
            0.96 +
            emerge * 0.04
          ).toFixed(4)})`;
        } else {
          thriveSeed.style.opacity = '1';
          thriveSeed.style.transform = 'none';
        }
      }

      const props = ch.querySelectorAll<HTMLElement>('[data-bio-prop]');
      props.forEach((prop) => {
        const kind = prop.getAttribute('data-bio-prop');
        const shift = (p - 0.5) * 2; // -1 to +1
        switch (kind) {
          case 'sun':
            prop.style.transform = `translate3d(0, ${(shift * -56).toFixed(1)}px, 0) scale(${(
              1 +
              p * 0.16
            ).toFixed(3)})`;
            break;
          case 'far-ridge':
            prop.style.transform = `translate3d(0, ${(shift * 50).toFixed(1)}px, 0)`;
            break;
          case 'mid-ridge':
            prop.style.transform = `translate3d(${(shift * -28).toFixed(1)}px, ${(
              shift * 76
            ).toFixed(1)}px, 0)`;
            break;
          case 'fore-ridge':
            prop.style.transform = `translate3d(0, ${(shift * -80).toFixed(1)}px, 0)`;
            break;
          case 'showcase-a':
            prop.style.transform = isDesktop
              ? `translate3d(0, ${(shift * -18).toFixed(1)}px, 0)`
              : 'none';
            break;
          case 'showcase-b':
            prop.style.transform = isDesktop
              ? `translate3d(0, ${(shift * 18).toFixed(1)}px, 0)`
              : 'none';
            break;
          case 'curtain-left':
            prop.style.transform = `translate3d(${(-p * 74).toFixed(1)}%, 0, 0)`;
            break;
          case 'curtain-right':
            prop.style.transform = `translate3d(${(p * 74).toFixed(1)}%, 0, 0)`;
            break;
          case 'spot-left':
            prop.style.transform = `rotate(${(-12 + p * 22).toFixed(1)}deg)`;
            break;
          case 'spot-right':
            prop.style.transform = `rotate(${(12 - p * 22).toFixed(1)}deg)`;
            break;
          case 'train':
            prop.style.transform = `translate3d(${(-20 + p * 108).toFixed(1)}%, 0, 0)`;
            break;
          case 'orbit':
            prop.style.transform = `rotate(${(p * 82).toFixed(1)}deg) translate3d(0, ${(
              shift * -44
            ).toFixed(1)}px, 0)`;
            break;
          case 'rain':
            prop.style.transform = `translate3d(${(shift * -16).toFixed(1)}px, ${(
              p * 48
            ).toFixed(1)}px, 0)`;
            break;
          case 'dawn-sweep':
            prop.style.transform = `translate3d(${(-24 + p * 66).toFixed(1)}%, ${(
              shift * -38
            ).toFixed(1)}px, 0)`;
            break;
          case 'horizon':
            prop.style.transform = `scale(${(0.86 + p * 0.28).toFixed(3)})`;
            break;
          default:
            break;
        }
      });
    });
  };

  let rafPending = false;
  const scheduleParallax = () => {
    if (rafPending) return;
    rafPending = true;
    window.requestAnimationFrame(() => {
      updateChapterParallax();
      rafPending = false;
    });
  };

  updateChapterParallax();
  window.addEventListener('scroll', scheduleParallax, { passive: true });
  window.addEventListener('resize', scheduleParallax, { passive: true });
}
