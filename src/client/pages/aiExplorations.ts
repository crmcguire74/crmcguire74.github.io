import { AI_VIDEO_REELS } from '../../data/siteData';
import { icon } from '../../ssg/icons';
import { WORKBENCH_PILLARS, type WorkbenchPillar } from '../../ssg/pages/aiExplorations';
import { escHtml, updatePillTabButtons } from '../dom';

export function initAiExplorationsPage(): void {
  // 1. Workbench Pillar Tabs & Quick Cards
  const wbIcon = document.getElementById('ai-workbench-icon');
  const wbKicker = document.getElementById('ai-wb-kicker');
  const wbModelLine = document.getElementById('ai-wb-modelline');
  const wbTitle = document.getElementById('ai-wb-title');
  const wbSummary = document.getElementById('ai-wb-summary');
  const wbBullets = document.getElementById('ai-wb-bullets');
  const wbExamples = document.getElementById('ai-wb-examples');
  const wbActions = document.getElementById('ai-wb-actions');
  const wbImage = document.getElementById('ai-wb-image') as HTMLImageElement | null;
  const quickCards = Array.from(
    document.querySelectorAll<HTMLButtonElement>('[data-ai-quick]')
  );
  const tabBtns = document.querySelectorAll<HTMLButtonElement>('[data-ai-tab]');

  const renderPillar = (pillar: WorkbenchPillar) => {
    updatePillTabButtons('[data-ai-tab]', 'data-ai-tab', pillar.id);

    quickCards.forEach((card) => {
      const selected = card.getAttribute('data-ai-quick') === pillar.id;
      card.className = `text-left p-3.5 rounded-xl border transition-colors cursor-pointer ${
        selected
          ? 'bg-[#0C1526] border-[#00A6FF]/60'
          : 'bg-[#050810] border-white/[0.06] hover:border-white/20'
      }`;
    });

    if (wbIcon) wbIcon.innerHTML = icon(pillar.icon, 'w-5 h-5 text-[#00A6FF]');
    if (wbKicker) wbKicker.textContent = `${pillar.index}. ${pillar.label}`;
    if (wbModelLine) wbModelLine.textContent = pillar.modelLine;
    if (wbTitle) wbTitle.textContent = pillar.title;
    if (wbSummary) wbSummary.textContent = pillar.summary;

    if (wbBullets) {
      wbBullets.innerHTML = pillar.bullets
        .map(
          (b) => `<li class="flex items-start gap-2.5">
            <span class="text-[#00A6FF] font-bold shrink-0" aria-hidden="true">·</span>
            <span>${escHtml(b)}</span>
          </li>`
        )
        .join('\n');
    }

    if (wbExamples) {
      wbExamples.innerHTML = pillar.examples
        .map(
          (ex) => `<div class="p-3.5 rounded-xl bg-[#050810] border border-white/[0.07]">
            <div class="text-xs font-semibold text-white mb-1">${escHtml(ex.name)}</div>
            <p class="text-[11px] text-slate-400 leading-relaxed">${escHtml(ex.detail)}</p>
          </div>`
        )
        .join('\n');
    }

    if (wbActions) {
      const links: string[] = [];
      if (pillar.primaryUrl && pillar.primaryLabel) {
        links.push(`<a href="${escHtml(pillar.primaryUrl)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#00A6FF] hover:bg-[#38BDF8] text-[#030508] text-sm font-semibold transition-colors whitespace-nowrap shrink-0">
          <span>${escHtml(pillar.primaryLabel)}</span>
          ${icon('arrowUpRight', 'w-4 h-4')}
        </a>`);
      }
      if (pillar.anchorHref && pillar.anchorLabel) {
        links.push(`<a href="${escHtml(pillar.anchorHref)}" class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#00A6FF] hover:bg-[#38BDF8] text-[#030508] text-sm font-semibold transition-colors whitespace-nowrap shrink-0">
          <span>${escHtml(pillar.anchorLabel)}</span>
          ${icon('arrowDown', 'w-4 h-4')}
        </a>`);
      }
      if (pillar.secondaryUrl && pillar.secondaryLabel) {
        links.push(`<a href="${escHtml(pillar.secondaryUrl)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-white/15 hover:border-[#00A6FF]/50 text-white text-sm font-medium transition-colors whitespace-nowrap shrink-0">
          <span>${escHtml(pillar.secondaryLabel)}</span>
          ${icon('arrowUpRight', 'w-4 h-4')}
        </a>`);
      }
      wbActions.innerHTML = links.join('\n');
    }

    if (wbImage) {
      wbImage.src = pillar.image;
      wbImage.alt = pillar.imageAlt;
    }
  };

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-ai-tab');
      const found = WORKBENCH_PILLARS.find((p) => p.id === id);
      if (found) renderPillar(found);
    });
  });

  quickCards.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-ai-quick');
      const found = WORKBENCH_PILLARS.find((p) => p.id === id);
      if (found) renderPillar(found);
    });
  });

  // 2. Video & NotebookLM Production Theater
  const videoIframe = document.getElementById('ai-video-iframe') as HTMLIFrameElement | null;
  const videoFocus = document.getElementById('ai-video-focus');
  const videoTitle = document.getElementById('ai-video-title');
  const videoMeta = document.getElementById('ai-video-meta');
  const videoWatchLink = document.getElementById('ai-video-watch-link') as HTMLAnchorElement | null;
  const channelBtns = document.querySelectorAll<HTMLButtonElement>('[data-video-channel]');
  const queueBtns = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-video-id]'));

  let activeReelId = AI_VIDEO_REELS[0]?.id || '';

  const selectReel = (reelId: string) => {
    const reel = AI_VIDEO_REELS.find((r) => r.id === reelId) || AI_VIDEO_REELS[0];
    if (!reel) return;
    activeReelId = reel.id;

    if (videoIframe) {
      videoIframe.src = `https://www.youtube.com/embed/${reel.id}?rel=0&modestbranding=1`;
      videoIframe.title = reel.title;
    }
    if (videoFocus) videoFocus.textContent = reel.focus;
    if (videoTitle) videoTitle.textContent = reel.title;
    if (videoMeta) videoMeta.textContent = `${reel.channelName} · ${reel.modelLine}`;
    if (videoWatchLink) {
      videoWatchLink.href = `https://www.youtube.com/watch?v=${reel.id}`;
    }

    queueBtns.forEach((btn) => {
      const isSelected = btn.getAttribute('data-video-id') === reel.id;
      btn.className = `w-full text-left p-4 rounded-xl border transition-colors cursor-pointer ${
        isSelected
          ? 'bg-[#0C1526] border-[#00A6FF]/60'
          : 'bg-[#050810] border-white/[0.07] hover:border-white/20'
      }${btn.classList.contains('hidden') ? ' hidden' : ''}`;

      const badge = btn.querySelector<HTMLElement>('[data-video-play-badge]');
      if (badge) {
        badge.className = `mt-1 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
          isSelected ? 'bg-[#00A6FF] text-[#030508]' : 'bg-white/[0.06] text-slate-300'
        }`;
      }
    });
  };

  queueBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-video-id');
      if (id) selectReel(id);
    });
  });

  channelBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const channel = btn.getAttribute('data-video-channel') || 'all';
      updatePillTabButtons('[data-video-channel]', 'data-video-channel', channel);

      const visibleIds: string[] = [];
      queueBtns.forEach((qBtn) => {
        const key = qBtn.getAttribute('data-video-channel-key');
        const show = channel === 'all' || key === channel;
        qBtn.classList.toggle('hidden', !show);
        if (show) {
          const id = qBtn.getAttribute('data-video-id');
          if (id) visibleIds.push(id);
        }
      });

      if (visibleIds.length && !visibleIds.includes(activeReelId)) {
        selectReel(visibleIds[0]);
      }
    });
  });
}
