import { CAREER_TIMELINE } from '../../data/siteData';
import { icon } from '../../ssg/icons';
import { getActiveRoleIndexByTops } from '../../utils/portfolioLogic';
import { escHtml } from '../dom';

export function initHomePage(): void {
  const cards = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-career-card]'));
  const dots = Array.from(document.querySelectorAll<HTMLElement>('[data-career-dot]'));
  const detailCode = document.getElementById('career-detail-code');
  const detailEra = document.getElementById('career-detail-era');
  const detailCompany = document.getElementById('career-detail-company');
  const detailBadge = document.getElementById('career-detail-badge');
  const detailMetricLabel = document.getElementById('career-detail-metric-label');
  const detailHighlights = document.getElementById('career-detail-highlights');

  if (!cards.length || !detailCode || !detailCompany || !detailHighlights) return;

  let activeIdx = 0;
  let manualLockUntil = 0;

  const renderRole = (idx: number) => {
    if (idx === activeIdx) return;
    const role = CAREER_TIMELINE[idx];
    if (!role) return;
    activeIdx = idx;

    cards.forEach((card, i) => {
      const selected = i === idx;
      card.setAttribute('aria-pressed', selected ? 'true' : 'false');
      if (selected) {
        card.className =
          'w-full text-left p-6 rounded-2xl transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6FF] bg-[#0C1424] border border-[#00A6FF]/55 shadow-[0_0_32px_rgba(0,166,255,0.12)]';
      } else {
        card.className =
          'w-full text-left p-6 rounded-2xl transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6FF] bg-[#070B14] border border-white/[0.06] opacity-75 hover:opacity-100 hover:border-white/15';
      }
    });

    dots.forEach((dot, i) => {
      dot.className = `h-1.5 rounded-full transition-all duration-200 ${
        i === idx ? 'w-6 bg-[#00A6FF]' : 'w-1.5 bg-slate-700'
      }`;
    });

    detailCode.textContent = role.blueprintCode;
    if (detailEra) detailEra.textContent = role.era;
    detailCompany.textContent = role.company;
    if (detailBadge) detailBadge.textContent = role.metricBadge;
    if (detailMetricLabel) detailMetricLabel.textContent = role.metricLabel;

    detailHighlights.innerHTML = role.highlights
      .map(
        (item) => `<div class="flex items-start gap-3">
          ${icon('checkCircle2', 'w-4 h-4 text-[#00A6FF] shrink-0 mt-1')}
          <p class="text-sm sm:text-base text-slate-300 leading-relaxed">${escHtml(item)}</p>
        </div>`
      )
      .join('\n');
  };

  cards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      manualLockUntil = Date.now() + 1200;
      renderRole(idx);
    });
  });

  let ticking = false;
  const onScroll = () => {
    if (ticking || Date.now() < manualLockUntil) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      const triggerY = window.innerHeight * 0.42;
      const tops = cards.map((c) => c.getBoundingClientRect().top);
      const nextIdx = getActiveRoleIndexByTops(tops, triggerY);
      renderRole(nextIdx);
      ticking = false;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}
