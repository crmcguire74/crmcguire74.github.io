import {
  ASSETS,
  CAREER_TIMELINE,
  COLLEAGUE_QUOTES,
  PROFILE,
  SKILLS_MATRIX,
} from '../../data/siteData';
import { icon, type IconName } from '../icons';
import { breadcrumbSchema, esc, personSchema, SITE_URL, type SeoConfig } from '../seo';

const RESUME_HIGHLIGHT_PILLARS: {
  icon: IconName;
  title: string;
  subtitleLine1: string;
  subtitleLine2: string;
}[] = [
  { icon: 'users', title: '20+', subtitleLine1: 'Years in', subtitleLine2: 'Technology' },
  { icon: 'layers', title: 'Leadership', subtitleLine1: 'Engineering,', subtitleLine2: 'Design & Product' },
  { icon: 'code2', title: 'UX/UI', subtitleLine1: 'User-Centered', subtitleLine2: 'Innovation' },
  { icon: 'chartNoAxesCombined', title: 'Transformation', subtitleLine1: 'Building', subtitleLine2: 'High-Performing Teams' },
];

export const RESUME_SEO: SeoConfig = {
  path: '/resume',
  title: 'Resume & Career Dossier | Christopher R McGuire',
  description:
    'Executive resume of Christopher R McGuire: Savant Wealth, Mesirow, Akuna Capital, SpiderRock, Citadel, GE Medical, and Motorola. Download PDF resume and portfolio.',
  keywords:
    'Christopher R McGuire Resume, SVP Software Engineering, UX/UI Director, Savant Wealth, Mesirow, Citadel, Akuna Capital, SpiderRock, Purdue Engineering',
  ogType: 'profile',
  ogImage: `${SITE_URL}${ASSETS.resumePortrait}`,
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      mainEntity: personSchema(),
    },
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Resume', path: '/resume' },
    ]),
  ],
};

export function renderResumePage(): string {
  const pillarsHtml = RESUME_HIGHLIGHT_PILLARS.map(
    (item, idx) => `<div data-reveal style="transition-delay: ${idx * 65}ms" class="flex flex-col items-start lg:px-8 first:lg:pl-2 last:lg:pr-2">
      ${icon(item.icon, 'w-7 h-7 text-[#00A6FF] mb-3', 1.75)}
      <div class="text-xl sm:text-2xl font-semibold tracking-tight text-white mb-1">${esc(item.title)}</div>
      <p class="text-xs sm:text-sm text-slate-300 leading-snug">
        ${esc(item.subtitleLine1)}<br />${esc(item.subtitleLine2)}
      </p>
    </div>`
  ).join('\n');

  const filterTabs = [
    { id: 'all', label: `All Roles (${CAREER_TIMELINE.length})` },
    ...CAREER_TIMELINE.map((r) => ({
      id: r.id,
      label: r.company.replace(', LLC', '').replace(' Platform', ''),
    })),
  ];

  const filterTabsHtml = filterTabs
    .map((item, idx) => {
      const active = idx === 0;
      return `<button
        type="button"
        data-resume-filter="${esc(item.id)}"
        aria-pressed="${active ? 'true' : 'false'}"
        class="relative px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
          active ? 'bg-[#00A6FF] text-[#030508] font-semibold' : 'text-slate-300 hover:text-white'
        }"
      >${esc(item.label)}</button>`;
    })
    .join('\n');

  const rolesHtml = CAREER_TIMELINE.map(
    (role, idx) => `<div data-resume-role="${esc(role.id)}" data-reveal style="transition-delay: ${Math.min(idx * 45, 180)}ms">
      <div data-magnetic class="relative flex flex-col overflow-hidden rounded-2xl bg-[#090E18] blueprint-hairline transition-colors duration-200 hover:border-[#00A6FF]/45 p-7 sm:p-8">
        <div data-magnetic-glow aria-hidden="true" class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200"></div>
        <div class="relative z-10 flex-1 w-full h-full flex flex-col">
          <div class="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-4 pb-4 border-b border-white/[0.07]">
            <div>
              <div class="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-1">
                <span class="font-mono-tabular text-[#38BDF8]">${esc(role.period)}</span>
                <span aria-hidden="true">·</span>
                <span>${esc(role.domain)}</span>
              </div>
              <h3 class="text-2xl font-semibold text-white">${esc(role.company)}</h3>
              <p class="text-sm font-medium text-[#38BDF8] mt-0.5">${esc(role.title)}</p>
            </div>
            <div class="md:text-right">
              <div class="font-mono-tabular text-2xl font-semibold text-[#00A6FF]">${esc(role.metricBadge)}</div>
              <div class="text-xs text-slate-400">${esc(role.metricLabel)}</div>
            </div>
          </div>
          <p class="text-sm sm:text-base text-slate-300 leading-relaxed mb-5">${esc(role.summary)}</p>
          <div class="space-y-2.5">
            ${role.highlights
              .map(
                (hl) => `<div class="flex items-start gap-2.5">
                  ${icon('checkCircle2', 'w-4 h-4 text-[#00A6FF] shrink-0 mt-1')}
                  <span class="text-sm text-slate-300 leading-relaxed">${esc(hl)}</span>
                </div>`
              )
              .join('\n')}
          </div>
        </div>
      </div>
    </div>`
  ).join('\n');

  const skillsHtml = [
    { heading: 'Expertise', items: SKILLS_MATRIX.expertise },
    { heading: 'Programming & Web', items: SKILLS_MATRIX.programming },
    { heading: 'AI & LLM', items: SKILLS_MATRIX.aiStack },
    { heading: 'Executive Leadership', items: SKILLS_MATRIX.leadership },
  ]
    .map(
      (col, idx) => `<div data-reveal style="transition-delay: ${idx * 50}ms" class="p-6 rounded-2xl bg-[#090E18] blueprint-hairline">
        <h3 class="text-sm font-semibold text-[#38BDF8] mb-4">${esc(col.heading)}</h3>
        <ul class="space-y-1.5 text-sm text-slate-300">
          ${col.items
            .map(
              (item) => `<li class="py-1 border-b border-white/[0.04] last:border-b-0">${esc(item)}</li>`
            )
            .join('\n')}
        </ul>
      </div>`
    )
    .join('\n');

  const quotesHtml = COLLEAGUE_QUOTES.map(
    (item, idx) => `<div data-reveal style="transition-delay: ${idx * 80}ms" class="p-7 rounded-2xl bg-[#090E18] blueprint-hairline space-y-4">
      ${icon('quote', 'w-6 h-6 text-[#00A6FF]')}
      <p class="font-serif-editorial text-lg text-slate-200 leading-relaxed">“${esc(item.quote)}”</p>
      <div class="pt-3 border-t border-white/[0.07] text-xs text-slate-400">
        <span class="font-semibold text-white">${esc(item.attribution)}</span>
        <span aria-hidden="true"> · </span>
        <span>${esc(item.context)}</span>
      </div>
    </div>`
  ).join('\n');

  return `<div class="overflow-x-clip">
    <!-- Resume Architectural Hero -->
    <section class="relative overflow-hidden bg-[#030712] border-b border-white/[0.08]">
      <div class="lg:hidden relative h-[320px] sm:h-[380px] overflow-hidden bg-[#030816]">
        <div data-parallax="resume-mobile-skyline" aria-hidden="true" class="pointer-events-none absolute -top-24 inset-x-0 bottom-0 origin-center will-change-transform">
          <img src="${esc(ASSETS.resumeSkyline)}" alt="" referrerpolicy="no-referrer" class="w-full h-full object-cover object-center" />
        </div>
        <div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-[#030712]/35"></div>
        <div data-parallax="resume-mobile-portrait" class="relative z-10 h-full w-full flex items-end justify-start pointer-events-none origin-bottom-left will-change-transform">
          <img
            src="${esc(ASSETS.resumePortrait)}"
            alt="Christopher R McGuire — Director of WiseOS Platform &amp; Engineering Executive"
            referrerpolicy="no-referrer"
            class="h-[104%] w-auto max-w-none -ml-[30%] sm:-ml-[16%] md:-ml-[10%] object-contain object-bottom drop-shadow-[0_18px_40px_rgba(0,0,0,0.72)]"
          />
        </div>
        <svg viewBox="0 0 390 120" preserveAspectRatio="none" aria-hidden="true" class="pointer-events-none absolute inset-x-0 bottom-0 z-20 w-full h-[92px]">
          <defs>
            <linearGradient id="resumeMobileSlashFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#030712" stop-opacity="0.96" />
              <stop offset="100%" stop-color="#030712" stop-opacity="1" />
            </linearGradient>
            <linearGradient id="resumeMobileSlashStroke" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#0088FF" stop-opacity="0.2" />
              <stop offset="45%" stop-color="#38BDF8" stop-opacity="0.95" />
              <stop offset="75%" stop-color="#BAE6FD" stop-opacity="1" />
              <stop offset="100%" stop-color="#00A6FF" stop-opacity="0.4" />
            </linearGradient>
            <filter id="resumeSlashGlowMobile" x="-20%" y="-40%" width="140%" height="180%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <polygon points="-10,98 405,26 405,125 -10,125" fill="url(#resumeMobileSlashFill)" />
          <line x1="-10" y1="98" x2="405" y2="26" stroke="url(#resumeMobileSlashStroke)" stroke-width="2.4" filter="url(#resumeSlashGlowMobile)" />
          <line x1="120" y1="108" x2="380" y2="62" stroke="url(#resumeMobileSlashStroke)" stroke-width="1.8" filter="url(#resumeSlashGlowMobile)" />
        </svg>
      </div>

      <div aria-hidden="true" class="hidden lg:block pointer-events-none absolute inset-y-0 right-0 w-[68%] overflow-hidden">
        <div data-parallax="resume-desktop-skyline" class="absolute -top-28 inset-x-0 bottom-0 origin-bottom will-change-transform">
          <img src="${esc(ASSETS.resumeSkyline)}" alt="" referrerpolicy="no-referrer" class="w-full h-full object-cover object-center" />
        </div>
        <svg viewBox="0 0 1000 620" preserveAspectRatio="none" class="absolute inset-0 z-10 w-full h-full">
          <defs>
            <linearGradient id="resumeLeftScrim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#030712" stop-opacity="1" />
              <stop offset="62%" stop-color="#030816" stop-opacity="0.98" />
              <stop offset="100%" stop-color="#040D1F" stop-opacity="0.9" />
            </linearGradient>
            <linearGradient id="slashBeamPrimary" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#0077FF" stop-opacity="0.1" />
              <stop offset="35%" stop-color="#00A6FF" stop-opacity="0.85" />
              <stop offset="55%" stop-color="#BAE6FD" stop-opacity="1" />
              <stop offset="85%" stop-color="#38BDF8" stop-opacity="0.7" />
              <stop offset="100%" stop-color="#00A6FF" stop-opacity="0.1" />
            </linearGradient>
            <linearGradient id="slashBeamSecondary" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#00A6FF" stop-opacity="0.05" />
              <stop offset="45%" stop-color="#38BDF8" stop-opacity="0.9" />
              <stop offset="65%" stop-color="#E0F2FE" stop-opacity="1" />
              <stop offset="100%" stop-color="#00A6FF" stop-opacity="0.15" />
            </linearGradient>
            <filter id="slashGlow" x="-30%" y="-20%" width="160%" height="140%">
              <feGaussianBlur stdDeviation="5.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <polygon points="0,0 445,0 135,620 0,620" fill="url(#resumeLeftScrim)" />
          <line x1="445" y1="0" x2="135" y2="620" stroke="#00A6FF" stroke-opacity="0.28" stroke-width="22" filter="url(#slashGlow)" />
          <line x1="445" y1="0" x2="135" y2="620" stroke="url(#slashBeamPrimary)" stroke-width="3" filter="url(#slashGlow)" />
          <line x1="365" y1="360" x2="232" y2="620" stroke="url(#slashBeamSecondary)" stroke-width="2.8" filter="url(#slashGlow)" />
          <line x1="468" y1="0" x2="158" y2="620" stroke="#38BDF8" stroke-opacity="0.24" stroke-width="1" />
        </svg>
        <div class="absolute inset-x-0 bottom-0 z-20 h-16 bg-gradient-to-t from-[#030712] to-transparent"></div>
      </div>

      <div data-parallax="resume-desktop-portrait" class="hidden lg:flex items-end justify-end pointer-events-none absolute inset-y-0 right-0 xl:right-6 w-[56%] pt-6 z-20 origin-bottom will-change-transform">
        <img
          src="${esc(ASSETS.resumePortrait)}"
          alt="Christopher R McGuire — Engineering &amp; Design Executive"
          referrerpolicy="no-referrer"
          class="h-full w-auto max-w-none object-contain object-right-bottom drop-shadow-[0_24px_55px_rgba(0,0,0,0.75)]"
        />
      </div>

      <div class="relative z-30 max-w-7xl mx-auto px-5 sm:px-8 py-8 lg:py-16 lg:min-h-[430px] flex items-center">
        <div data-parallax="resume-copy" class="w-full lg:w-[52%] will-change-transform hero-enter">
          <div class="space-y-3.5">
            <p class="text-xs font-medium tracking-wide text-[#38BDF8]">Executive Dossier</p>
            <h1 class="text-2xl sm:text-3xl lg:text-[36px] font-semibold tracking-tight leading-[1.12] text-white">
              ${esc(PROFILE.name)}
            </h1>
            <p class="text-sm sm:text-[15px] text-slate-300 leading-relaxed max-w-lg">
              ${esc(PROFILE.summary)}
            </p>
            <div class="pt-1.5 space-y-3">
              <div class="flex flex-wrap items-center gap-3">
                <a
                  href="${esc(ASSETS.resumePdf)}"
                  download="Christopher_R_McGuire-SVP_of_Software_Engineering_UX_UI.pdf"
                  class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#00A6FF] hover:bg-[#38BDF8] text-[#030508] text-xs font-semibold transition-all duration-150 shadow-[0_0_20px_rgba(0,166,255,0.3)] hover:shadow-[0_0_26px_rgba(0,166,255,0.45)] whitespace-nowrap"
                >
                  ${icon('download', 'w-4 h-4')}
                  <span>Download Resume</span>
                </a>
                <a
                  href="${esc(ASSETS.portfolioPdf)}"
                  download="Christopher_R_McGuire-Portfolio.pdf"
                  class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#38BDF8]/35 bg-[#090E18]/90 backdrop-blur-sm hover:border-[#00A6FF] hover:bg-[#0D1628] text-white text-xs font-semibold transition-colors whitespace-nowrap"
                >
                  ${icon('fileDown', 'w-4 h-4 text-[#38BDF8]')}
                  <span>Download Portfolio</span>
                </a>
              </div>
              <div>
                <a href="/contact" class="group inline-flex items-center gap-1.5 text-xs font-semibold text-[#38BDF8] hover:text-white transition-colors">
                  <span>Let's Connect</span>
                  ${icon('arrowRight', 'w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Executive Pillars -->
    <section aria-label="Core Executive Pillars" class="bg-gradient-to-r from-[#040812] via-[#071124] to-[#040914] border-b border-white/[0.08]">
      <div class="max-w-7xl mx-auto px-5 sm:px-8 py-8 sm:py-10">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-4 lg:gap-x-0 lg:divide-x divide-white/[0.1]">
          ${pillarsHtml}
        </div>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-5 sm:px-8 py-14 lg:py-20">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-white/[0.08]">
        <div data-reveal class="lg:col-span-8 p-7 rounded-2xl bg-[#090E18] blueprint-hairline space-y-4">
          <h2 class="text-xl font-semibold text-white">AI &amp; Emerging Technologies Leadership</h2>
          <p class="text-sm sm:text-base text-slate-300 leading-relaxed">
            Leading enterprise AI Advisory governance and WiseOS platform architecture—integrating
            AI agents and frontier LLMs across engineering, compliance, advisor coaching, and
            product strategy using GPT, Claude, Google Gemini, Grok, and local LlaMa workflows.
          </p>
          <p class="text-sm text-slate-400 leading-relaxed">
            Designed and shipped production Next.js, React, and Azure solutions alongside
            micro-UI reporting apps, Codex/Claude Code agentic engineering pipelines, ElevenLabs
            voice synthesis, and multimodal creative pipelines with Nano Banana, GPT Image, and Veo.
          </p>
        </div>

        <div data-reveal style="transition-delay: 80ms" class="lg:col-span-4 p-7 rounded-2xl bg-[#090E18] blueprint-hairline flex flex-col justify-between">
          <div>
            <div class="inline-flex items-center gap-2 text-xs font-medium text-[#38BDF8] mb-3">
              ${icon('graduationCap', 'w-4 h-4')}
              <span>Education</span>
            </div>
            <h2 class="text-xl font-semibold text-white mb-1">${esc(PROFILE.education.institution)}</h2>
            <p class="text-sm text-slate-300">${esc(PROFILE.education.degree)}</p>
          </div>
          <p class="font-mono-tabular text-sm text-[#00A6FF] mt-6">Class of ${esc(PROFILE.education.year)}</p>
        </div>
      </div>

      <!-- Career Experience -->
      <section class="py-14 border-b border-white/[0.08]">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 class="text-2xl sm:text-3xl font-semibold text-white">Full Professional Work Experience</h2>
            <p class="text-sm text-slate-400 mt-1">Ordered from current role to foundational engineering roles.</p>
          </div>
          <div role="group" aria-label="Filter career timeline by company" class="flex flex-wrap gap-1.5 p-1 rounded-xl bg-[#090E18] border border-white/[0.08]">
            ${filterTabsHtml}
          </div>
        </div>

        <div class="space-y-6">
          ${rolesHtml}
        </div>
      </section>

      <!-- Skills Matrix -->
      <section class="py-14 border-b border-white/[0.08]">
        <h2 class="text-2xl sm:text-3xl font-semibold text-white mb-8">Core Competencies &amp; Technical Stack</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          ${skillsHtml}
        </div>
      </section>

      <!-- Colleague Endorsements -->
      <section class="pt-14">
        <h2 class="text-2xl sm:text-3xl font-semibold text-white mb-8">Respected Colleagues</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${quotesHtml}
        </div>
      </section>
    </div>
  </div>`;
}
