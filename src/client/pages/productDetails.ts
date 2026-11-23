import { MODUS_GALLERY } from '../../data/siteData';
import {
  BLUEPRINT_SPRINTS,
  MODUS_MODES,
  SAMPLE_CLIPS,
} from '../../ssg/pages/productDetails';
import { getStoryChapterIndex } from '../../utils/portfolioLogic';
import { escHtml, updatePillTabButtons } from '../dom';

export function initModusAiPage(): void {
  const stageButtons = Array.from(
    document.querySelectorAll<HTMLButtonElement>('[data-modus-stage]')
  );
  const stageDots = Array.from(document.querySelectorAll<HTMLElement>('[data-modus-dot]'));
  const stageCounter = document.getElementById('modus-stage-counter');
  const stageImg = document.getElementById('modus-stage-img') as HTMLImageElement | null;
  const stageSpec = document.getElementById('modus-stage-spec');
  const stageTitle = document.getElementById('modus-stage-title');
  const stageCaption = document.getElementById('modus-stage-caption');
  const storyContainer = document.getElementById('modus-spatial-story');

  let activeStage = 0;

  const setStage = (idx: number) => {
    if (idx === activeStage || idx < 0 || idx >= MODUS_GALLERY.length) return;
    activeStage = idx;
    const current = MODUS_GALLERY[idx];

    stageButtons.forEach((btn, i) => {
      const active = i === idx;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      btn.className = `w-full text-left p-5 rounded-2xl transition-all duration-200 cursor-pointer ${
        active
          ? 'bg-[#0C1526] border border-[#00A6FF]/55 shadow-[0_0_28px_rgba(0,166,255,0.14)]'
          : 'bg-[#080C15] border border-white/[0.06] opacity-70 hover:opacity-100'
      }`;
    });

    stageDots.forEach((dot, i) => {
      dot.className = `h-1.5 rounded-full transition-all duration-200 ${
        i === idx ? 'w-6 bg-[#00A6FF]' : 'w-1.5 bg-slate-700'
      }`;
    });

    if (stageCounter) {
      stageCounter.textContent = `MODUS SPATIAL STAGE ${current.step} / 0${MODUS_GALLERY.length}`;
    }
    if (stageImg) {
      stageImg.src = current.image;
      stageImg.alt = current.title;
    }
    if (stageSpec) stageSpec.textContent = current.spec;
    if (stageTitle) stageTitle.textContent = current.title;
    if (stageCaption) stageCaption.textContent = current.caption;
  };

  stageButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => setStage(idx));
  });

  if (storyContainer) {
    let raf = false;
    window.addEventListener(
      'scroll',
      () => {
        if (raf) return;
        raf = true;
        window.requestAnimationFrame(() => {
          const rect = storyContainer.getBoundingClientRect();
          const vh = window.innerHeight || 900;
          const total = rect.height + vh;
          const progress = Math.min(Math.max((vh - rect.top) / total, 0), 1);
          setStage(getStoryChapterIndex(progress, MODUS_GALLERY.length));
          raf = false;
        });
      },
      { passive: true }
    );
  }

  // Spatial constraint mode switcher
  const modeBtns = document.querySelectorAll<HTMLButtonElement>('[data-modus-mode]');
  const modeHeadline = document.getElementById('modus-mode-headline');
  const modeDetail = document.getElementById('modus-mode-detail');
  const modeSpec = document.getElementById('modus-mode-spec');
  const modeImg = document.getElementById('modus-mode-img') as HTMLImageElement | null;

  modeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-modus-mode') || 'paint';
      const currentMode = MODUS_MODES.find((m) => m.id === id) || MODUS_MODES[0];
      updatePillTabButtons('[data-modus-mode]', 'data-modus-mode', currentMode.id);
      if (modeHeadline) modeHeadline.textContent = currentMode.headline;
      if (modeDetail) modeDetail.textContent = currentMode.detail;
      if (modeSpec) modeSpec.textContent = currentMode.spec;
      if (modeImg) {
        modeImg.src = currentMode.previewImg;
        modeImg.alt = currentMode.label;
      }
    });
  });

  // FAQ accordion
  const faqItems = Array.from(document.querySelectorAll<HTMLElement>('[data-faq-item]'));
  let openFaq = 0;

  faqItems.forEach((item, idx) => {
    const toggle = item.querySelector<HTMLButtonElement>('[data-faq-toggle]');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
      openFaq = openFaq === idx ? -1 : idx;
      faqItems.forEach((other, i) => {
        const isOpen = i === openFaq;
        const btn = other.querySelector<HTMLButtonElement>('[data-faq-toggle]');
        const panel = other.querySelector<HTMLElement>('[data-faq-panel]');
        const chevron = other.querySelector<HTMLElement>('[data-faq-chevron]');
        if (btn) btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        if (panel) panel.classList.toggle('hidden', !isOpen);
        if (chevron) chevron.classList.toggle('rotate-180', isOpen);
      });
    });
  });
}

export function initSnapClipperPage(): void {
  const simulateBtn = document.getElementById('simulate-clip-btn');
  const clipCountLabel = document.getElementById('clip-count-label');
  const clipGrid = document.getElementById('clip-grid');
  const filterBtns = document.querySelectorAll<HTMLButtonElement>('[data-clip-filter]');

  if (!clipGrid) return;

  const clips = [...SAMPLE_CLIPS];
  let activeFilter = 'All';

  const renderClips = () => {
    const visible =
      activeFilter === 'All' ? clips : clips.filter((c) => c.tag === activeFilter);
    if (clipCountLabel) {
      clipCountLabel.textContent = `Interactive Clip Organizer (${visible.length} clips)`;
    }
    clipGrid.innerHTML = visible
      .map(
        (c) => `<div class="p-4 rounded-xl bg-[#050810] border border-white/[0.07]">
          <div class="flex items-center justify-between text-xs text-[#38BDF8] mb-1.5">
            <span>${escHtml(c.tag)}</span>
            <span class="text-slate-500">${escHtml(c.source)}</span>
          </div>
          <p class="text-sm text-slate-200">${escHtml(c.text)}</p>
        </div>`
      )
      .join('\n');
  };

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeFilter = btn.getAttribute('data-clip-filter') || 'All';
      updatePillTabButtons('[data-clip-filter]', 'data-clip-filter', activeFilter);
      renderClips();
    });
  });

  simulateBtn?.addEventListener('click', () => {
    const count = clips.length + 1;
    clips.unshift({
      id: `new-${Date.now()}`,
      tag: 'Inspiration',
      source: 'local-capture',
      text: `Captured live clip #${count}: Privacy-first knowledge stays local inside your browser storage.`,
    });
    renderClips();
  });
}

export function initBlueprintPage(): void {
  const sprintBtns = document.querySelectorAll<HTMLButtonElement>('[data-blueprint-sprint]');
  const sprintTitle = document.getElementById('blueprint-sprint-title');
  const sprintFocus = document.getElementById('blueprint-sprint-focus');

  sprintBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idxStr = btn.getAttribute('data-blueprint-sprint') || '0';
      const idx = Number(idxStr);
      const sprint = BLUEPRINT_SPRINTS[idx] || BLUEPRINT_SPRINTS[0];
      updatePillTabButtons('[data-blueprint-sprint]', 'data-blueprint-sprint', idxStr);
      if (sprintTitle) sprintTitle.textContent = sprint.title;
      if (sprintFocus) sprintFocus.textContent = sprint.promptFocus;
    });
  });
}
