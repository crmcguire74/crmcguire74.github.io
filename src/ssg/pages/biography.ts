import {
  BIOGRAPHY_CHAPTERS,
  BIOGRAPHY_ERAS,
  BIOGRAPHY_HERO,
  type BiographyChapter,
} from '../../data/biography';
import { ASSETS } from '../../data/siteData';
import { icon } from '../icons';
import { breadcrumbSchema, esc, personSchema, SITE_URL, type SeoConfig } from '../seo';

export const BIOGRAPHY_SEO: SeoConfig = {
  path: '/biography',
  title: 'Biography | Christopher R McGuire — 1974 to Beyond',
  description:
    'From Oakville & Torrington Connecticut and Purdue Engineering to Citadel, Mesirow, Savant Wealth WiseOS, parenthood, and Thrive Financial—the life story of Christopher R McGuire.',
  keywords:
    'Christopher R McGuire Biography, Christopher Patrick, Oakville CT, Torrington Connecticut, Warner Theatre, Purdue University, Citadel, Savant Wealth, WiseOS, Mesirow, Thrive Financial',
  ogType: 'profile',
  ogImage: `${SITE_URL}${ASSETS.bioHeroPortrait}`,
  jsonLd: [
    personSchema(),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Biography', path: '/biography' },
    ]),
  ],
};

const MOOD_ACCENTS: Record<
  BiographyChapter['mood'],
  {
    yearClass: string;
    kickerClass: string;
    imageFilterClass: string;
    panelClass: string;
    glowElClass?: string;
    showGrid: boolean;
  }
> = {
  warm: {
    yearClass: 'text-amber-300',
    kickerClass: 'text-amber-200/90',
    imageFilterClass: 'brightness-[0.82] saturate-[1.06]',
    panelClass:
      'bg-[#07080D]/80 backdrop-blur-md border border-amber-300/22 shadow-[0_24px_60px_rgba(0,0,0,0.68)]',
    glowElClass: 'bg-amber-400/[0.09]',
    showGrid: false,
  },
  spotlight: {
    yearClass: 'text-amber-300',
    kickerClass: 'text-amber-200/90',
    imageFilterClass: 'brightness-[0.84] contrast-[1.05]',
    panelClass:
      'bg-[#07070C]/82 backdrop-blur-md border border-amber-400/25 shadow-[0_24px_60px_rgba(0,0,0,0.75)]',
    glowElClass: 'bg-amber-500/[0.08]',
    showGrid: false,
  },
  architectural: {
    yearClass: 'text-[#00A6FF]',
    kickerClass: 'text-[#38BDF8]',
    imageFilterClass: 'brightness-[0.76] contrast-[1.06] saturate-[0.95]',
    panelClass:
      'bg-[#050912]/80 backdrop-blur-md border border-[#38BDF8]/24 shadow-[0_24px_60px_rgba(0,0,0,0.72)]',
    glowElClass: 'bg-[#00A6FF]/[0.08]',
    showGrid: true,
  },
  restrained: {
    yearClass: 'text-slate-300',
    kickerClass: 'text-slate-400',
    imageFilterClass: 'grayscale-[70%] brightness-[0.6] contrast-[0.94]',
    panelClass:
      'bg-[#07090D]/86 backdrop-blur-md border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.78)]',
    showGrid: false,
  },
  future: {
    yearClass: 'text-[#38BDF8]',
    kickerClass: 'text-[#38BDF8]',
    imageFilterClass: 'brightness-[0.82] contrast-[1.06]',
    panelClass:
      'bg-[#040914]/78 backdrop-blur-md border border-[#00A6FF]/35 shadow-[0_24px_70px_rgba(0,166,255,0.16)]',
    glowElClass: 'bg-[#00A6FF]/[0.12]',
    showGrid: true,
  },
};

function renderStoryLayers(chapter: BiographyChapter): string {
  const { id, mood } = chapter;

  if (id === 'bio-1974') {
    return `<div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
      <div data-bio-prop="sun" class="absolute right-[14%] top-[18%] w-56 h-56 rounded-full bg-amber-300/20 blur-2xl will-change-transform"></div>
      <svg data-bio-prop="far-ridge" viewBox="0 0 1440 320" preserveAspectRatio="none" class="absolute bottom-0 left-0 w-full h-44 text-[#11151C]/75 will-change-transform">
        <path fill="currentColor" d="M0,224 C220,130 420,250 720,175 C1010,102 1230,210 1440,145 L1440,320 L0,320 Z" />
      </svg>
      <svg data-bio-prop="fore-ridge" viewBox="0 0 1440 320" preserveAspectRatio="none" class="absolute -bottom-10 left-0 w-full h-36 text-[#030508] will-change-transform">
        <path fill="currentColor" d="M0,180 C340,260 660,110 980,210 C1180,270 1320,190 1440,150 L1440,320 L0,320 Z" />
      </svg>
      <div data-bio-prop="curtain-left" class="hidden lg:block absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#030508]/90 via-[#030508]/45 to-transparent will-change-transform"></div>
    </div>`;
  }

  if (id === 'bio-1984') {
    return `<div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
      <div data-bio-prop="spot-left" style="transform-origin: 50% 0%" class="absolute -top-24 left-[26%] w-72 h-[125%] bg-gradient-to-b from-amber-300/22 via-amber-400/6 to-transparent blur-xl will-change-transform"></div>
      <div data-bio-prop="spot-right" style="transform-origin: 50% 0%" class="absolute -top-24 right-[26%] w-72 h-[125%] bg-gradient-to-b from-amber-300/20 via-amber-400/5 to-transparent blur-xl will-change-transform"></div>
      <div data-bio-prop="curtain-left" class="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#1A080C] via-[#130508]/92 to-transparent border-r border-amber-400/15 will-change-transform"></div>
      <div data-bio-prop="curtain-right" class="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#1A080C] via-[#130508]/92 to-transparent border-l border-amber-400/15 will-change-transform"></div>
    </div>`;
  }

  if (id === 'bio-1992') {
    return `<div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
      <svg data-bio-prop="mid-ridge" viewBox="0 0 1200 600" class="hidden lg:block absolute right-0 top-12 w-[58%] h-[78%] opacity-75 will-change-transform">
        <path data-bio-stroke="1320" stroke-dasharray="1320" stroke-dashoffset="1320" d="M80,480 L240,480 L290,420 L480,420 L540,320 L780,320 L840,210 L1080,210" fill="none" stroke="#00A6FF" stroke-width="2.5" />
        <path d="M140,360 L330,360 L390,260 L630,260 L690,150 L960,150" fill="none" stroke="#38BDF8" stroke-width="1.5" stroke-dasharray="6 6" />
        <path d="M290,420 L290,540 M540,320 L540,540 M840,210 L840,450" fill="none" stroke="#00A6FF" stroke-width="1.2" opacity="0.5" />
      </svg>
      <svg data-bio-prop="fore-ridge" viewBox="0 0 1440 220" preserveAspectRatio="none" class="absolute -bottom-6 left-0 w-full h-32 text-[#030508] will-change-transform">
        <path fill="currentColor" d="M0,180 L0,130 L120,130 L150,70 L180,130 L340,130 L340,95 L410,95 L410,145 L620,145 L650,55 L680,145 L920,145 L920,105 L1080,105 L1080,160 L1440,160 L1440,220 L0,220 Z" />
      </svg>
    </div>`;
  }

  if (id === 'bio-1996') {
    return `<div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
      <div data-bio-prop="dawn-sweep" class="absolute -top-24 left-[6%] w-[480px] h-[140%] rotate-12 bg-gradient-to-r from-transparent via-[#00A6FF]/[0.1] to-transparent blur-2xl will-change-transform"></div>
      <div data-bio-prop="far-ridge" class="hidden lg:grid grid-cols-4 gap-5 absolute left-[6%] bottom-0 w-[38%] h-[68%] opacity-55 will-change-transform">
        <div class="rounded-t-xl border-t border-x border-[#38BDF8]/30 bg-gradient-to-b from-[#081730]/50 to-transparent mt-16"></div>
        <div class="rounded-t-xl border-t border-x border-[#00A6FF]/35 bg-gradient-to-b from-[#091B38]/55 to-transparent mt-4"></div>
        <div class="rounded-t-xl border-t border-x border-[#38BDF8]/25 bg-gradient-to-b from-[#081730]/45 to-transparent mt-24"></div>
        <div class="rounded-t-xl border-t border-x border-[#00A6FF]/30 bg-gradient-to-b from-[#091B38]/50 to-transparent mt-10"></div>
      </div>
      <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#030508] via-[#030508]/65 to-transparent"></div>
    </div>`;
  }

  if (id === 'bio-2005-citadel') {
    return `<div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
      <div data-bio-prop="dawn-sweep" class="hidden lg:grid grid-cols-3 gap-4 absolute right-[7%] top-[16%] w-[40%] h-[65%] opacity-45 will-change-transform">
        <div class="rounded-xl border border-[#00A6FF]/30 bg-[#040B16]/35"></div>
        <div class="rounded-xl border border-[#38BDF8]/25 bg-[#040B16]/25 mt-8"></div>
        <div class="rounded-xl border border-[#00A6FF]/30 bg-[#040B16]/35 -mt-4"></div>
      </div>
    </div>`;
  }

  if (id === 'bio-2005-family') {
    return `<div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
      <div data-bio-prop="sun" class="absolute left-[18%] top-[20%] w-80 h-80 rounded-full bg-amber-400/18 blur-3xl will-change-transform"></div>
      <div data-bio-prop="curtain-left" class="hidden lg:block absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#0A0805]/90 to-transparent will-change-transform"></div>
      <div data-bio-prop="curtain-right" class="hidden lg:block absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#0A0805]/90 to-transparent will-change-transform"></div>
    </div>`;
  }

  if (id === 'bio-2016') {
    const nodes = [
      [200, 60],
      [321, 130],
      [321, 270],
      [200, 340],
      [79, 270],
      [79, 130],
    ]
      .map(([cx, cy]) => `<circle cx="${cx}" cy="${cy}" r="5" fill="#38BDF8" />`)
      .join('');
    return `<div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
      <svg data-bio-prop="orbit" viewBox="0 0 400 400" class="hidden lg:block absolute right-[8%] top-[14%] w-[420px] h-[420px] opacity-55 will-change-transform">
        <circle cx="200" cy="200" r="140" fill="none" stroke="#00A6FF" stroke-width="1" stroke-dasharray="6 6" />
        <circle cx="200" cy="200" r="88" fill="none" stroke="#38BDF8" stroke-width="1.2" />
        <path d="M200,60 L321,130 L321,270 L200,340 L79,270 L79,130 Z" fill="none" stroke="#00A6FF" stroke-width="1.8" />
        ${nodes}
      </svg>
    </div>`;
  }

  if (id === 'bio-2019') {
    return `<div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
      <div data-bio-prop="dawn-sweep" class="hidden lg:block absolute -top-24 right-[12%] w-[460px] h-[140%] -rotate-12 bg-gradient-to-r from-transparent via-[#00A6FF]/[0.08] to-transparent blur-2xl will-change-transform"></div>
      <div class="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#030508] via-[#030508]/60 to-transparent"></div>
    </div>`;
  }

  if (id === 'bio-2020' || mood === 'restrained') {
    return `<div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
      <div data-bio-prop="rain" class="absolute inset-0 opacity-20 will-change-transform">
        <div class="h-full w-full bg-[repeating-linear-gradient(105deg,transparent,transparent_68px,rgba(148,163,184,0.14)_69px,transparent_70px)]"></div>
      </div>
    </div>`;
  }

  if (id === 'bio-2024') {
    return `<div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
      <div data-bio-prop="dawn-sweep" class="absolute -top-20 left-[10%] w-[520px] h-[140%] rotate-12 bg-gradient-to-r from-transparent via-amber-200/14 to-transparent blur-2xl will-change-transform"></div>
      <div data-bio-prop="far-ridge" class="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#030508] to-transparent will-change-transform"></div>
    </div>`;
  }

  if (id === 'bio-2025') {
    return `<div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
      <div data-bio-prop="dawn-sweep" class="hidden lg:block absolute right-[6%] top-[15%] w-[460px] h-[460px] rounded-full bg-[#00A6FF]/[0.1] blur-[110px] will-change-transform"></div>
    </div>`;
  }

  return `<div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
    <svg data-bio-prop="horizon" viewBox="0 0 1200 700" class="absolute inset-0 w-full h-full opacity-45 will-change-transform">
      <line x1="600" y1="320" x2="0" y2="700" stroke="#00A6FF" stroke-width="1.4" />
      <line x1="600" y1="320" x2="1200" y2="700" stroke="#00A6FF" stroke-width="1.4" />
      <line x1="600" y1="320" x2="180" y2="700" stroke="#38BDF8" stroke-width="0.9" opacity="0.55" />
      <line x1="600" y1="320" x2="1020" y2="700" stroke="#38BDF8" stroke-width="0.9" opacity="0.55" />
    </svg>
  </div>`;
}

function renderThriveGenesisShowcase(): string {
  return `<div data-bio-thrive-seed class="rounded-2xl bg-[#060B15]/92 backdrop-blur-md border border-[#38BDF8]/30 shadow-[0_26px_70px_rgba(0,0,0,0.82)] overflow-hidden will-change-transform">
    <div class="px-4 sm:px-5 py-3 border-b border-white/[0.08] flex items-center justify-between gap-3 bg-[#091221]/80">
      <div class="flex items-center gap-2 min-w-0">
        <span class="w-1.5 h-1.5 rounded-full bg-[#38BDF8] shrink-0"></span>
        <span class="text-xs font-semibold text-white truncate">Thrive Financial · Born from Lived Adversity</span>
      </div>
      <span class="font-mono-tabular text-[11px] text-[#38BDF8] shrink-0">thrivefinancial.app</span>
    </div>

    <div class="aspect-video w-full overflow-hidden bg-[#04070E] border-b border-white/[0.08]">
      <img
        src="/assets/aistudio/ThriveFinancial_694601f5.webp"
        alt="Thrive Financial — Forensic Financial Analysis Software for Divorce showing transaction activity, discrepancies, and settlement timeline"
        referrerpolicy="no-referrer"
        class="w-full h-full object-cover object-center"
      />
    </div>

    <div class="p-4 sm:p-5 space-y-3.5">
      <div class="flex items-start gap-3.5">
        <div class="hidden sm:block w-20 aspect-[4/3] rounded-lg overflow-hidden border border-[#38BDF8]/25 bg-[#030508] shrink-0">
          <img
            src="/assets/images/thrive_forensic_engine_1794774703856.webp"
            alt="Thrive Financial encrypted ledger and forensic transaction analytics"
            referrerpolicy="no-referrer"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="min-w-0">
          <p class="text-[11px] font-mono-tabular uppercase tracking-wider text-[#38BDF8] mb-0.5">
            Marital Estate Command Center
          </p>
          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Forged while auditing years of opaque records by hand—turning multi-account statements into hidden-asset tracing, affidavit variance detection, and SHA-256 verifiable evidence.
          </p>
        </div>
      </div>

      <div class="pt-3 border-t border-white/[0.08] grid grid-cols-3 gap-2 text-[11px] text-slate-300">
        <div class="pr-2 border-r border-white/[0.08]">
          <div class="font-semibold text-white">18 Red Flags</div>
          <div class="text-slate-400">Variance alerts</div>
        </div>
        <div class="px-2 border-r border-white/[0.08]">
          <div class="font-semibold text-white">Fund Tracing</div>
          <div class="text-slate-400">Linked transfers</div>
        </div>
        <div class="pl-2 flex items-center justify-end">
          <a
            href="https://thrivefinancial.app"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 text-xs font-semibold text-[#38BDF8] hover:text-white transition-colors whitespace-nowrap"
          >
            <span>Explore Site</span>
            ${icon('arrowUpRight', 'w-3.5 h-3.5')}
          </a>
        </div>
      </div>
    </div>
  </div>`;
}

function renderDualProduct2025Showcase(): string {
  return `<div class="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-5 items-stretch">
    <article
      data-bio-prop="showcase-a"
      class="rounded-2xl bg-[#060B15]/92 backdrop-blur-md border border-[#38BDF8]/30 shadow-[0_22px_58px_rgba(0,0,0,0.78)] overflow-hidden flex flex-col justify-between will-change-transform"
    >
      <div>
        <div class="aspect-video w-full overflow-hidden bg-[#04070E] border-b border-white/[0.08]">
          <img
            src="/assets/aistudio/ThriveFinancial_694601f5.webp"
            alt="Thrive Financial forensic divorce software workspace"
            referrerpolicy="no-referrer"
            class="w-full h-full object-cover object-center"
          />
        </div>
        <div class="p-4 sm:p-5 space-y-2">
          <div class="flex items-center justify-between gap-2 text-[11px] font-mono-tabular text-[#38BDF8]">
            <span>FinTech AI · Web SaaS</span>
            <span class="text-slate-400">Forensic Engine</span>
          </div>
          <h3 class="text-base sm:text-lg font-semibold text-white">Thrive Financial</h3>
          <p class="text-xs sm:text-[13px] text-slate-300 leading-relaxed">
            Uncovers hidden assets and affidavit discrepancies across statements with local-first privacy and court-ready settlement exports.
          </p>
        </div>
      </div>
      <div class="px-4 sm:px-5 pb-4 pt-3 border-t border-white/[0.08] flex items-center justify-between gap-2">
        <div class="flex items-center gap-2 min-w-0">
          <img
            src="/assets/images/thrive_forensic_engine_1794774703856.webp"
            alt=""
            referrerpolicy="no-referrer"
            class="w-8 h-6 rounded object-cover border border-white/15 shrink-0"
          />
          <span class="text-[11px] text-slate-400 truncate">Statements · Variance · Clarity</span>
        </div>
        <a
          href="https://thrivefinancial.app"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 text-xs font-semibold text-[#38BDF8] hover:text-white transition-colors whitespace-nowrap shrink-0"
        >
          <span>Visit</span>
          ${icon('arrowUpRight', 'w-3.5 h-3.5')}
        </a>
      </div>
    </article>

    <article
      data-bio-prop="showcase-b"
      class="rounded-2xl bg-[#060B15]/92 backdrop-blur-md border border-[#00A6FF]/35 shadow-[0_22px_58px_rgba(0,0,0,0.78)] overflow-hidden flex flex-col justify-between md:translate-y-4 will-change-transform"
    >
      <div>
        <div class="aspect-video w-full overflow-hidden bg-[#04070E] border-b border-white/[0.08]">
          <img
            src="/assets/aistudio/Modus_AI_e260817c.webp"
            alt="Modus AI spatial interior and exterior redesign iOS application"
            referrerpolicy="no-referrer"
            class="w-full h-full object-cover object-center"
          />
        </div>
        <div class="p-4 sm:p-5 space-y-2">
          <div class="flex items-center justify-between gap-2 text-[11px] font-mono-tabular text-[#38BDF8]">
            <span>Spatial AI · iOS App</span>
            <span class="text-slate-400">Zero Subscription</span>
          </div>
          <h3 class="text-base sm:text-lg font-semibold text-white">Modus AI</h3>
          <p class="text-xs sm:text-[13px] text-slate-300 leading-relaxed">
            Grounded room and facade transformations with Paint-Only, Refresh &amp; Elevate, and Structural modes locking real furniture.
          </p>
        </div>
      </div>
      <div class="px-4 sm:px-5 pb-4 pt-3 border-t border-white/[0.08] flex items-center justify-between gap-2">
        <div class="flex items-center gap-2 min-w-0">
          <img
            src="/assets/images/modus_spatial_render_1794774703750.webp"
            alt=""
            referrerpolicy="no-referrer"
            class="w-8 h-6 rounded object-cover border border-white/15 shrink-0"
          />
          <span class="text-[11px] text-slate-400 truncate">Paint · Furniture Lock · Remodel</span>
        </div>
        <a
          href="/projects/modus-ai"
          class="inline-flex items-center gap-1 text-xs font-semibold text-[#38BDF8] hover:text-white transition-colors whitespace-nowrap shrink-0"
        >
          <span>Case Study</span>
          ${icon('arrowRight', 'w-3.5 h-3.5')}
        </a>
      </div>
    </article>
  </div>`;
}

function renderChapterCard(
  chapter: BiographyChapter,
  nextChapter: BiographyChapter | undefined,
  extraClass: string,
  compact = false
): string {
  const style = MOOD_ACCENTS[chapter.mood];
  const cardPad = compact ? 'p-6 sm:p-7 xl:p-9' : 'p-7 sm:p-10';
  const yearSize = compact
    ? 'text-4xl sm:text-5xl lg:text-[42px] xl:text-[56px] whitespace-nowrap'
    : 'text-4xl sm:text-5xl lg:text-6xl';
  const headlineSize = compact
    ? 'text-2xl sm:text-3xl lg:text-[26px] xl:text-[34px]'
    : 'text-2xl sm:text-3xl lg:text-4xl';
  const narrativeClass = compact
    ? 'text-sm sm:text-base xl:text-[17px] text-slate-200 leading-[1.68] xl:leading-[1.76]'
    : 'text-base sm:text-lg text-slate-200 leading-[1.78]';
  const nextMargin = compact ? 'pt-4 mt-4 xl:pt-6 xl:mt-6' : 'pt-6 mt-6';

  return `<div data-bio-card class="${cardPad} rounded-2xl ${style.panelClass} ${extraClass} will-change-transform">
    <div class="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm text-slate-300 mb-3">
      <span class="font-mono-tabular font-semibold ${style.kickerClass}">Chapter ${esc(chapter.index)}</span>
      <span aria-hidden="true" class="text-slate-500">·</span>
      <span class="${style.kickerClass}">${esc(chapter.kicker)}</span>
      <span aria-hidden="true" class="text-slate-500">·</span>
      <span class="text-slate-400">${esc(chapter.location)}</span>
    </div>

    <div data-bio-year class="font-mono-tabular ${yearSize} font-semibold tracking-tight leading-none mb-3.5 xl:mb-4 ${style.yearClass} will-change-transform">
      ${esc(chapter.year)}
    </div>

    <h2 class="${headlineSize} font-semibold tracking-tight text-white leading-tight mb-4 xl:mb-5 text-balance">
      ${esc(chapter.headline)}
    </h2>

    <p class="${narrativeClass}">
      ${esc(chapter.narrative)}
    </p>

    ${
      nextChapter
        ? `<div class="${nextMargin} border-t border-white/[0.08] flex items-center justify-end">
            <a href="#${esc(nextChapter.id)}" data-bio-jump="${esc(nextChapter.id)}" class="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors whitespace-nowrap">
              <span>Next Chapter</span>
              ${icon('arrowDown', 'w-3.5 h-3.5 text-[#00A6FF]')}
            </a>
          </div>`
        : ''
    }
  </div>`;
}

function renderChapterSection(chapter: BiographyChapter, idx: number, nextChapter?: BiographyChapter): string {
  const style = MOOD_ACCENTS[chapter.mood];
  const isThrive2020 = chapter.id === 'bio-2020';
  const isDual2025 = chapter.id === 'bio-2025';

  let contentHtml: string;
  if (isThrive2020) {
    contentHtml = `<div class="grid grid-cols-1 lg:grid-cols-12 gap-7 xl:gap-10 items-center">
      <div class="lg:col-span-6">
        ${renderChapterCard(chapter, nextChapter, 'w-full', true)}
      </div>
      <div class="lg:col-span-6">
        ${renderThriveGenesisShowcase()}
      </div>
    </div>`;
  } else if (isDual2025) {
    contentHtml = `<div class="grid grid-cols-1 lg:grid-cols-12 gap-7 xl:gap-10 items-center">
      <div class="lg:col-span-5">
        ${renderChapterCard(chapter, nextChapter, 'w-full', true)}
      </div>
      <div class="lg:col-span-7">
        ${renderDualProduct2025Showcase()}
      </div>
    </div>`;
  } else {
    contentHtml = renderChapterCard(
      chapter,
      nextChapter,
      `max-w-2xl ${chapter.align === 'right' ? 'lg:ml-auto' : ''}`
    );
  }

  return `<section
    id="${esc(chapter.id)}"
    data-bio-chapter="${idx}"
    data-bio-align="${esc(chapter.align)}"
    aria-label="Chapter ${esc(chapter.index)}: ${esc(chapter.headline)}"
    class="relative min-h-[92vh] lg:h-[145vh] border-t border-white/[0.06] scroll-mt-16"
  >
    <div class="relative min-h-[92vh] lg:sticky lg:top-[72px] lg:h-[calc(100vh-72px)] flex items-center py-16 sm:py-24 lg:py-0 overflow-hidden">
      <div data-bio-progress aria-hidden="true" class="pointer-events-none absolute top-0 inset-x-0 z-30 h-[2px] origin-left bg-gradient-to-r from-[#00A6FF] via-[#38BDF8] to-[#BAE6FD] shadow-[0_0_10px_rgba(0,166,255,0.6)]" style="transform: scaleX(0)"></div>

      <div data-bio-bg aria-hidden="true" class="pointer-events-none absolute ${
        chapter.id === 'bio-2019' ? 'inset-x-0 -top-6 -bottom-24' : '-inset-y-24 inset-x-0'
      } will-change-transform">
        <img src="${esc(chapter.image)}" alt="${esc(chapter.imageAlt)}" referrerpolicy="no-referrer" class="w-full h-full object-cover ${chapter.id === 'bio-2019' ? 'object-[28%_center]' : 'object-top'} ${style.imageFilterClass}" />
      </div>

      <div aria-hidden="true" class="pointer-events-none absolute inset-0 ${
        chapter.align === 'right'
          ? 'bg-gradient-to-l from-[#030508]/92 via-[#030508]/64 to-[#030508]/36'
          : 'bg-gradient-to-r from-[#030508]/92 via-[#030508]/64 to-[#030508]/36'
      }"></div>
      <div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030508]/95 via-transparent to-[#030508]/65"></div>

      ${renderStoryLayers(chapter)}

      ${
        style.glowElClass
          ? `<div aria-hidden="true" class="pointer-events-none absolute top-1/4 ${
              chapter.align === 'right' ? 'right-[15%]' : 'left-[15%]'
            } w-[380px] h-[380px] rounded-full blur-[120px] ${style.glowElClass}"></div>`
          : ''
      }
      ${
        style.showGrid
          ? '<div data-bio-grid aria-hidden="true" class="pointer-events-none absolute inset-0 architectural-grid opacity-35 will-change-transform"></div>'
          : ''
      }

      <div class="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 xl:pl-24">
        ${contentHtml}
      </div>
    </div>
  </section>`;
}

function renderHighlightsVideoSection(): string {
  const posterUrl = `https://i.ytimg.com/vi_webp/${ASSETS.biographyVideoId}/hqdefault.webp`;

  return `<section id="bio-highlights-video" aria-labelledby="bio-highlights-heading" class="relative overflow-hidden bg-[#030508] border-t border-white/[0.08] lg:min-h-[540px] xl:min-h-[600px] lg:flex lg:items-center">
    <!-- Mobile & Tablet Frameless Blended Video Stage -->
    <div id="bio-highlights-mobile-stage" class="lg:hidden relative h-[280px] sm:h-[360px] md:h-[410px] overflow-hidden bg-[#030508]">
      <div
        data-bio-highlights-parallax
        aria-hidden="true"
        class="pointer-events-none absolute -top-20 inset-x-0 -bottom-16 flex items-center justify-center origin-center will-change-transform [mask-image:radial-gradient(ellipse_92%_86%_at_50%_46%,black_44%,transparent_98%)]"
      >
        <div id="bio-highlights-mobile-video-slot" class="relative w-full h-full flex items-center justify-center overflow-hidden">
          <img src="${esc(posterUrl)}" alt="" referrerpolicy="no-referrer" class="absolute inset-0 w-full h-full object-cover scale-[1.15] opacity-75" />
        </div>
      </div>
      <div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030508] via-[#030508]/25 to-[#030508]/65"></div>
      <div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#030508]/70 via-transparent to-[#030508]/65"></div>
      <button
        type="button"
        id="bio-mute-toggle-mobile"
        data-bio-mute
        aria-pressed="true"
        aria-label="Unmute background video"
        title="Unmute video"
        class="absolute top-3 right-3 z-20 inline-flex items-center justify-center p-2 bg-transparent border-0 text-white hover:scale-110 transition-transform cursor-pointer drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6FF] rounded-lg"
      >
        <span data-icon-unmuted class="hidden">${icon('volume2', 'w-6 h-6 text-[#38BDF8] hover:text-white transition-colors')}</span>
        <span data-icon-muted>${icon('volumeX', 'w-6 h-6 text-slate-300 hover:text-white transition-colors')}</span>
      </button>
    </div>

    <!-- Desktop Right-Biased Frameless Parallax Video Canvas -->
    <div id="bio-highlights-desktop-stage" aria-hidden="true" class="hidden lg:block pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute right-[12%] top-1/2 -translate-y-1/2 w-[640px] h-[380px] rounded-full bg-[#00A6FF]/[0.1] blur-3xl"></div>
      <div
        data-bio-highlights-parallax
        class="absolute -top-24 -bottom-20 right-[-4%] xl:right-[-5%] w-[66%] xl:w-[62%] flex items-center justify-center origin-center will-change-transform [mask-image:radial-gradient(ellipse_94%_88%_at_68%_50%,black_52%,transparent_100%)]"
      >
        <div id="bio-highlights-desktop-video-slot" class="relative w-full h-full flex items-center justify-center overflow-hidden">
          <img src="${esc(posterUrl)}" alt="" referrerpolicy="no-referrer" class="absolute inset-0 w-full h-full object-cover scale-[1.14] opacity-75" />
        </div>
      </div>
      <div class="absolute inset-0 bg-gradient-to-r from-[#030508] via-[#030508]/95 via-[44%] to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-[#030508] via-transparent to-[#030508]/55"></div>
      <div class="absolute inset-y-0 right-0 w-[4%] bg-gradient-to-l from-[#030508]/25 to-transparent"></div>
      <button
        type="button"
        id="bio-mute-toggle-desktop"
        data-bio-mute
        aria-pressed="true"
        aria-label="Unmute background video"
        title="Unmute video"
        class="pointer-events-auto absolute top-5 right-6 xl:right-8 z-30 inline-flex items-center justify-center p-2 bg-transparent border-0 text-white hover:scale-110 transition-transform cursor-pointer drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6FF] rounded-lg"
      >
        <span data-icon-unmuted class="hidden">${icon('volume2', 'w-6 h-6 text-[#38BDF8] hover:text-white transition-colors')}</span>
        <span data-icon-muted>${icon('volumeX', 'w-6 h-6 text-slate-300 hover:text-white transition-colors')}</span>
      </button>
    </div>

    <!-- Foreground Editorial Highlights Summary -->
    <div class="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 xl:pl-24 pt-6 pb-14 lg:py-24">
      <div data-reveal class="max-w-lg xl:max-w-[540px]">
        <p class="text-sm font-medium text-[#38BDF8] mb-3">Professional Life Highlights · 1996–2026</p>
        <h2 id="bio-highlights-heading" class="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight text-white leading-[1.08] mb-5">
          Building Systems, Teams &amp; Lasting Products
        </h2>
        <p class="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed mb-8">
          Three decades bridging visual craft and institutional software architecture—from Citadel,
          SpiderRock, and Akuna Capital to leading applications at Mesirow, founding Thrive
          Financial, and directing Savant Wealth&apos;s WiseOS AI platform.
        </p>

        <div class="flex flex-wrap items-center gap-3.5">
          <a
            href="${esc(ASSETS.biographyVideoWatchUrl)}"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-lg bg-[#00A6FF] hover:bg-[#38BDF8] text-[#030508] text-sm font-semibold transition-all duration-150 hover:shadow-[0_0_24px_rgba(0,166,255,0.45)] whitespace-nowrap"
          >
            ${icon('play', 'w-3.5 h-3.5')}
            <span>Watch Full Video</span>
            ${icon('arrowUpRight', 'w-3.5 h-3.5')}
          </a>

          <a
            href="#bio-2020"
            data-bio-jump="bio-2020"
            class="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-lg border border-white/15 bg-[#090E18]/90 hover:border-[#00A6FF]/50 text-white text-sm font-medium transition-colors whitespace-nowrap"
          >
            <span>Continue to 2020–Beyond</span>
            ${icon('arrowDown', 'w-4 h-4 text-[#00A6FF]')}
          </a>
        </div>
      </div>
    </div>
  </section>`;
}

export function renderBiographyPage(): string {
  const eraButtonsHtml = BIOGRAPHY_ERAS.map(
    (era) => `<a
      href="#${esc(era.targetId)}"
      data-bio-jump="${esc(era.targetId)}"
      class="px-3 py-1.5 rounded-lg bg-[#090E18]/90 border border-white/12 hover:border-[#00A6FF]/55 text-xs font-medium text-slate-200 hover:text-white transition-colors whitespace-nowrap"
    >${esc(era.label)}</a>`
  ).join('\n');

  const railHtml = BIOGRAPHY_CHAPTERS.map((ch, idx) => {
    const active = idx === 0;
    return `<a
      href="#${esc(ch.id)}"
      data-bio-rail-btn="${idx}"
      data-bio-jump="${esc(ch.id)}"
      ${active ? 'aria-current="step"' : ''}
      title="${esc(ch.year)} — ${esc(ch.headline)}"
      class="group flex items-center gap-2.5 text-left py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6FF] rounded"
    >
      <span data-bio-rail-bar class="h-[2px] transition-all duration-200 ${
        active
          ? 'w-7 bg-[#00A6FF] shadow-[0_0_8px_#00A6FF]'
          : 'w-3 bg-slate-600 group-hover:w-5 group-hover:bg-slate-400'
      }"></span>
      <span data-bio-rail-label class="font-mono-tabular text-[11px] transition-colors ${
        active ? 'text-[#38BDF8] font-semibold' : 'text-slate-500 group-hover:text-slate-300'
      }">${esc(ch.shortYear)}</span>
    </a>`;
  }).join('\n');

  const chaptersWithHighlightsHtml = BIOGRAPHY_CHAPTERS.map((chapter, idx) => {
    const nextChapter = BIOGRAPHY_CHAPTERS[idx + 1];
    const chapterBlock = renderChapterSection(chapter, idx, nextChapter);
    if (chapter.id === 'bio-2019') {
      return `${chapterBlock}\n${renderHighlightsVideoSection()}`;
    }
    return chapterBlock;
  }).join('\n');

  return `<div class="relative overflow-x-clip bg-[#030508]">
    <!-- Layered Parallax Hero -->
    <section class="relative overflow-hidden bg-[#030508] border-b border-white/[0.08]">
      <div class="lg:hidden relative h-[270px] sm:h-[360px] overflow-hidden bg-[#030816]">
        <div data-parallax="bio-mobile-bg" aria-hidden="true" class="pointer-events-none absolute -top-24 inset-x-0 bottom-0 origin-center will-change-transform">
          <img src="${esc(ASSETS.bioHeroBg)}" alt="" referrerpolicy="no-referrer" class="w-full h-full object-cover object-[76%_center]" />
        </div>
        <div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030508] via-[#030508]/20 to-[#030508]/35"></div>
        <div data-parallax="bio-mobile-portrait" class="relative z-10 h-full w-full flex items-end justify-end pr-1 sm:pr-4 pointer-events-none origin-bottom-right will-change-transform">
          <img
            src="${esc(ASSETS.bioHeroPortrait)}"
            alt="Christopher R McGuire — Born 1974 in Connecticut, building in Chicago"
            referrerpolicy="no-referrer"
            class="h-[94%] sm:h-[96%] w-auto max-w-none object-contain object-bottom drop-shadow-[0_18px_42px_rgba(0,0,0,0.78)]"
          />
        </div>
      </div>

      <div aria-hidden="true" class="hidden lg:block pointer-events-none absolute inset-0 overflow-hidden">
        <div data-parallax="bio-desktop-bg" class="absolute -top-28 inset-x-0 bottom-0 origin-center will-change-transform">
          <img src="${esc(ASSETS.bioHeroBg)}" alt="" referrerpolicy="no-referrer" class="w-full h-full object-cover object-right" />
        </div>
        <div class="absolute inset-0 bg-gradient-to-r from-[#030508] via-[#030508]/75 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#030508]/88 via-transparent to-[#030508]/40"></div>
        <div data-parallax="bio-desktop-portrait" class="relative z-10 max-w-[1440px] mx-auto h-full flex items-end justify-end origin-bottom-right will-change-transform">
          <img
            src="${esc(ASSETS.bioHeroPortrait)}"
            alt="Christopher R McGuire — Born 1974 in Connecticut, building in Chicago"
            referrerpolicy="no-referrer"
            class="h-[93%] xl:h-[97%] w-auto max-w-none object-contain object-bottom drop-shadow-[0_24px_54px_rgba(0,0,0,0.82)]"
          />
        </div>
      </div>

      <div class="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 xl:pl-24 pt-6 pb-14 lg:py-20 xl:py-24">
        <div data-parallax="bio-copy" class="max-w-xl xl:max-w-[560px] will-change-transform hero-enter">
          <p class="text-sm font-medium text-[#38BDF8] mb-3.5">${esc(BIOGRAPHY_HERO.eyebrow)}</p>
          <h1 class="text-3xl sm:text-5xl xl:text-[54px] font-semibold tracking-tight text-white leading-[1.06] mb-5 text-balance">
            ${esc(BIOGRAPHY_HERO.headline)}
          </h1>
          <p class="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-lg mb-7">
            ${esc(BIOGRAPHY_HERO.lead)}
          </p>

          <div class="flex flex-wrap items-center gap-3.5 mb-8">
            <a
              href="#${esc(BIOGRAPHY_CHAPTERS[0].id)}"
              data-bio-jump="${esc(BIOGRAPHY_CHAPTERS[0].id)}"
              class="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-lg bg-[#00A6FF] hover:bg-[#38BDF8] text-[#030508] text-sm font-semibold transition-all duration-150 hover:shadow-[0_0_24px_rgba(0,166,255,0.45)] whitespace-nowrap"
            >
              <span>Begin the Journey</span>
              ${icon('arrowDown', 'w-4 h-4')}
            </a>
            <a
              href="/resume"
              class="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-lg border border-white/15 bg-[#090E18]/90 hover:border-[#00A6FF]/50 text-white text-sm font-medium transition-colors whitespace-nowrap"
            >
              <span>View Executive Resume</span>
              ${icon('arrowRight', 'w-4 h-4')}
            </a>
          </div>

          <div>
            <p class="text-xs font-medium text-slate-400 mb-2.5">Jump to Era</p>
            <div class="flex flex-wrap gap-2">
              ${eraButtonsHtml}
            </div>
          </div>
        </div>
      </div>
    </section>

    <nav aria-label="Biography Chapters" class="hidden xl:flex fixed left-5 top-1/2 -translate-y-1/2 z-30 flex-col gap-1.5">
      ${railHtml}
    </nav>

    <div>
      ${chaptersWithHighlightsHtml}
    </div>

    <section class="relative py-24 border-t border-white/[0.08] bg-[#04070D] text-center">
      <div data-reveal class="max-w-3xl mx-auto px-5 sm:px-8 space-y-6">
        <p class="text-sm font-medium text-[#38BDF8]">Continuing Forward</p>
        <h2 class="text-3xl sm:text-5xl font-semibold tracking-tight text-white text-balance">
          Creativity, Resilience &amp; Applied Innovation
        </h2>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed">
          Explore the products built from these experiences, dive into my technical career
          dossier, or reach out directly to collaborate.
        </p>
        <div class="pt-4 flex flex-wrap items-center justify-center gap-4">
          <a href="/projects" class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#00A6FF] hover:bg-[#38BDF8] text-[#030508] text-sm font-semibold transition-colors whitespace-nowrap">
            <span>Explore Projects</span>
            ${icon('arrowRight', 'w-4 h-4')}
          </a>
          <a href="/resume" class="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/15 bg-[#090E18] hover:border-[#00A6FF]/50 text-white text-sm font-medium transition-colors whitespace-nowrap">
            <span>View Resume</span>
          </a>
          <a href="/contact" class="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/15 bg-[#090E18] hover:border-[#00A6FF]/50 text-white text-sm font-medium transition-colors whitespace-nowrap">
            <span>Let's Connect</span>
          </a>
        </div>
      </div>
    </section>
  </div>`;
}
