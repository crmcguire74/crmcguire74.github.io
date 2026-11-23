import {
  ASSETS,
  CAREER_TIMELINE,
  IMPACT_METRICS,
  PILLARS,
  PROFILE,
  PROJECTS,
} from '../../data/siteData';
import { ARTICLES } from '../../data/articles';
import { icon, type IconName } from '../icons';
import {
  esc,
  personSchema,
  PROFILE_PORTRAIT_IMAGE,
  professionalServiceSchema,
  websiteSchema,
  type SeoConfig,
} from '../seo';

const HERO_CAPABILITIES: { icon: IconName; line1: string; line2: string }[] = [
  { icon: 'laptop', line1: 'Software', line2: 'Engineering' },
  { icon: 'layers', line1: 'UX/UI', line2: 'Design' },
  { icon: 'share2', line1: 'Product', line2: 'Leadership' },
  { icon: 'sparkles', line1: 'AI', line2: 'Exploration' },
];

const MARQUEE_ITEMS = [
  'Savant Wealth · Director of WiseOS Platform',
  'Mesirow · SVP Head of Applications',
  'Akuna Capital · Head of UX/UI & Frontend',
  'SpiderRock · Director of Application Engineering',
  'Citadel · Director of UX/UI Design & Development',
  'Purdue University · B.S. Computer & Electrical Engineering',
];

export const HOME_SEO: SeoConfig = {
  path: '/',
  title: 'Christopher R McGuire | SVP of Engineering, UX/UI & AI Architecture',
  description:
    '20+ years leading software engineering, UX/UI design systems, and applied AI at Savant Wealth, Mesirow, Akuna Capital, and Citadel. Based in Chicago.',
  keywords:
    'Christopher R McGuire, Christopher McGuire, Paguire, SVP Software Engineering, UX/UI Design, Design Systems, Applied AI, Savant Wealth, Mesirow, Citadel, Akuna Capital, SpiderRock, Chicago, Modus AI, Thrive Financial, SnapClipper',
  ogType: 'website',
  ogImage: PROFILE_PORTRAIT_IMAGE,
  ogTitle: 'Christopher R McGuire | SVP of Engineering, UX/UI & AI Architecture',
  ogDescription:
    '20+ years bridging UX/UI design, software engineering, and applied AI systems. Explore executive experience, flagship AI products, and published essays.',
  jsonLd: [personSchema(), websiteSchema(), professionalServiceSchema()],
};

export function renderHomePage(): string {
  const capabilitiesHtml = HERO_CAPABILITIES.map(
    (cap, idx) => `<div class="group flex flex-col items-center text-center px-1 sm:px-3 py-0.5 lg:py-1 ${
      idx < HERO_CAPABILITIES.length - 1 ? 'border-r border-white/15' : ''
    }">
      ${icon(cap.icon, 'w-5 h-5 text-[#00A6FF] mb-1.5 lg:mb-2 transition-transform duration-200 group-hover:-translate-y-0.5', 1.75)}
      <span class="text-[10px] sm:text-[11px] font-medium leading-tight text-slate-200">
        ${esc(cap.line1)}<br />${esc(cap.line2)}
      </span>
    </div>`
  ).join('\n');

  const metricsHtml = IMPACT_METRICS.map(
    (metric, idx) => `<div data-reveal style="transition-delay: ${idx * 70}ms" class="h-full">
      <div data-magnetic class="relative flex flex-col overflow-hidden rounded-2xl bg-[#090E18] blueprint-hairline transition-colors duration-200 hover:border-[#00A6FF]/45 p-6 h-full shadow-[0_-18px_45px_rgba(3,5,8,0.85)]">
        <div data-magnetic-glow aria-hidden="true" class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200"></div>
        <div class="relative z-10 flex-1 w-full h-full flex flex-col">
          <div class="font-mono-tabular text-3xl font-semibold text-[#00A6FF] mb-1.5">${esc(metric.value)}</div>
          <div class="text-sm font-semibold text-white mb-1">${esc(metric.label)}</div>
          <div class="text-xs text-slate-400">${esc(metric.context)}</div>
        </div>
      </div>
    </div>`
  ).join('\n');

  const marqueeSequence = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
    .map(
      (item) => `<span class="inline-flex items-center gap-8 whitespace-nowrap">
        <span>${esc(item)}</span>
        <span class="text-[#00A6FF]" aria-hidden="true">/</span>
      </span>`
    )
    .join('\n');

  const pillarsHtml = PILLARS.map(
    (pillar, idx) => `<div data-reveal style="transition-delay: ${idx * 70}ms" class="h-full">
      <div data-magnetic class="relative flex flex-col overflow-hidden rounded-2xl bg-[#090E18] blueprint-hairline transition-colors duration-200 hover:border-[#00A6FF]/45 p-6 h-full">
        <div data-magnetic-glow aria-hidden="true" class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200"></div>
        <div class="relative z-10 flex-1 w-full h-full flex flex-col">
          <span class="font-mono-tabular text-xs text-[#00A6FF] block mb-3">${esc(pillar.index)}.</span>
          <h3 class="text-lg font-semibold text-white mb-2">${esc(pillar.title)}</h3>
          <p class="text-sm text-slate-400 leading-relaxed">${esc(pillar.description)}</p>
        </div>
      </div>
    </div>`
  ).join('\n');

  const roleCardsHtml = CAREER_TIMELINE.map((role, idx) => {
    const isCurrent = idx === 0;
    return `<button
      type="button"
      data-career-card="${idx}"
      aria-pressed="${isCurrent ? 'true' : 'false'}"
      class="w-full text-left p-6 rounded-2xl transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6FF] ${
        isCurrent
          ? 'bg-[#0C1424] border border-[#00A6FF]/55 shadow-[0_0_32px_rgba(0,166,255,0.12)]'
          : 'bg-[#070B14] border border-white/[0.06] opacity-75 hover:opacity-100 hover:border-white/15'
      }"
    >
      <div class="flex items-center justify-between gap-4 mb-2">
        <span class="font-mono-tabular text-xs text-[#38BDF8]">0${idx + 1}. ${esc(role.period)}</span>
        <span class="text-xs text-slate-400">${esc(role.domain)}</span>
      </div>
      <h3 class="text-xl font-semibold text-white mb-1">${esc(role.company)}</h3>
      <p class="text-sm font-medium text-slate-300 mb-3">${esc(role.title)}</p>
      <p class="text-sm text-slate-400 leading-relaxed">${esc(role.summary)}</p>
    </button>`;
  }).join('\n');

  const initialRole = CAREER_TIMELINE[0];
  const progressDotsHtml = CAREER_TIMELINE.map(
    (_, i) => `<span data-career-dot="${i}" class="h-1.5 rounded-full transition-all duration-200 ${
      i === 0 ? 'w-6 bg-[#00A6FF]' : 'w-1.5 bg-slate-700'
    }"></span>`
  ).join('\n');

  const initialHighlightsHtml = initialRole.highlights
    .map(
      (item) => `<div class="flex items-start gap-3">
        ${icon('checkCircle2', 'w-4 h-4 text-[#00A6FF] shrink-0 mt-1')}
        <p class="text-sm sm:text-base text-slate-300 leading-relaxed">${esc(item)}</p>
      </div>`
    )
    .join('\n');

  const featuredShowcase = PROJECTS.slice(0, 6)
    .map((project, idx) => {
      const href = project.internalRoute || project.externalUrl || '/projects';
      const isExternal = !project.internalRoute && Boolean(project.externalUrl);
      const attrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<div data-reveal style="transition-delay: ${(idx % 2) * 120}ms" class="h-full">
        <a href="${esc(href)}"${attrs} data-magnetic class="group relative flex flex-col overflow-hidden rounded-2xl bg-[#090E18] blueprint-hairline transition-colors duration-200 hover:border-[#00A6FF]/45 cursor-pointer h-full">
          <div data-magnetic-glow aria-hidden="true" class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200"></div>
          <div class="relative z-10 flex-1 w-full h-full flex flex-col justify-between">
            <div>
              ${
                project.image
                  ? `<div data-parallax-window class="overflow-hidden aspect-video w-full bg-[#050810] border-b border-white/[0.06]">
                      <img src="${esc(project.image)}" alt="${esc(project.title)}" referrerpolicy="no-referrer" class="w-full h-full object-cover will-change-transform transition-transform duration-500 group-hover:scale-[1.08]" />
                    </div>`
                  : ''
              }
              <div class="p-7 pb-5">
                <p class="text-xs text-[#38BDF8] mb-2">${esc(project.category)}</p>
                <h3 class="text-2xl font-semibold text-white mb-2 group-hover:text-[#38BDF8] transition-colors">${esc(project.title)}</h3>
                <p class="text-sm text-slate-300 leading-relaxed">${esc(project.description)}</p>
              </div>
            </div>
            <div class="px-7 pb-7 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
              <span>${esc(project.tags.slice(0, 3).join(' · '))}</span>
              <span class="inline-flex items-center gap-1 font-semibold text-[#00A6FF] group-hover:translate-x-1 transition-transform">
                <span>${esc(project.ctaLabel)}</span>
                ${icon(project.internalRoute ? 'arrowRight' : 'arrowUpRight', 'w-3.5 h-3.5')}
              </span>
            </div>
          </div>
        </a>
      </div>`;
    })
    .join('\n');

  const latestArticlesHtml = ARTICLES.slice(0, 3)
    .map(
      (article, idx) => `<div data-reveal style="transition-delay: ${idx * 90}ms" class="h-full">
        <a href="/blog/posts/${esc(article.slug)}" data-magnetic class="group relative flex flex-col overflow-hidden rounded-2xl bg-[#090E18] blueprint-hairline transition-colors duration-200 hover:border-[#00A6FF]/45 cursor-pointer h-full">
          <div data-magnetic-glow aria-hidden="true" class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200"></div>
          <div class="relative z-10 flex-1 w-full h-full flex flex-col justify-between">
            <div>
              <div data-parallax-window class="overflow-hidden aspect-[16/9] w-full bg-[#050810] border-b border-white/[0.06]">
                <img src="${esc(article.coverImage)}" alt="${esc(article.coverAlt)}" referrerpolicy="no-referrer" class="w-full h-full object-cover object-top will-change-transform transition-transform duration-500 group-hover:scale-[1.08]" />
              </div>
              <div class="p-6 pb-4">
                <div class="flex items-center gap-2 text-xs text-slate-400 mb-2.5">
                  <span>${esc(article.date)}</span>
                  <span aria-hidden="true">·</span>
                  <span>${esc(article.readTime)}</span>
                </div>
                <h3 class="text-lg font-semibold text-white mb-2.5 group-hover:text-[#38BDF8] transition-colors">${esc(article.title)}</h3>
                <p class="text-sm text-slate-400 leading-relaxed">${esc(article.excerpt)}</p>
              </div>
            </div>
            <div class="px-6 pb-6 pt-3.5 border-t border-white/[0.06]">
              <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00A6FF] group-hover:translate-x-1 transition-transform">
                <span>Read Essay</span>
                ${icon('arrowRight', 'w-3.5 h-3.5')}
              </span>
            </div>
          </div>
        </a>
      </div>`
    )
    .join('\n');

  return `<div class="relative overflow-x-clip">
    <!-- Chapter I: Editorial Multi-Plane Hero Stage -->
    <section class="relative">
      <!-- Mobile & Tablet Portrait-First Hero -->
      <div class="lg:hidden relative overflow-hidden bg-gradient-to-b from-[#040B16] via-[#030914] to-[#030508] border-b border-white/[0.06]">
        <div class="relative h-[305px] sm:h-[390px] md:h-[455px] overflow-hidden">
          <div data-parallax="mobile-bg" aria-hidden="true" class="pointer-events-none absolute -top-24 inset-x-0 bottom-0 origin-center will-change-transform">
            <img src="${esc(ASSETS.heroBg)}" alt="" referrerpolicy="no-referrer" class="w-full h-full object-cover object-[72%_28%] md:object-[64%_28%]" />
          </div>
          <div aria-hidden="true" class="absolute inset-0 bg-gradient-to-b from-[#030710]/30 via-transparent to-[#030914]/55"></div>
          <div data-parallax="mobile-portrait" class="relative z-10 h-full w-full overflow-hidden will-change-transform">
            <img
              src="${esc(ASSETS.heroCutout)}"
              alt="Christopher R McGuire — SVP of Application Design and Development"
              referrerpolicy="no-referrer"
              class="absolute -top-4 sm:-top-5 md:-top-7 left-1/2 md:left-auto md:-right-[74px] -translate-x-[55%] sm:-translate-x-[57%] md:translate-x-0 h-[168%] sm:h-[158%] md:h-[172%] w-auto max-w-none object-contain object-top drop-shadow-[0_14px_32px_rgba(0,0,0,0.68)]"
            />
          </div>
        </div>

        <div data-parallax="mobile-curtain" class="relative z-20 -mt-[142px] sm:-mt-[175px] md:-mt-[185px] will-change-transform">
          <svg viewBox="0 0 390 155" preserveAspectRatio="none" aria-hidden="true" class="pointer-events-none block w-full h-[142px] sm:h-[175px] md:h-[185px]">
            <defs>
              <linearGradient id="mobileWaveFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#041022" stop-opacity="0.97" />
                <stop offset="35%" stop-color="#030B18" stop-opacity="1" />
                <stop offset="100%" stop-color="#030712" stop-opacity="1" />
              </linearGradient>
              <linearGradient id="ribbonMain" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#0088FF" stop-opacity="0.25" />
                <stop offset="28%" stop-color="#38BDF8" stop-opacity="0.95" />
                <stop offset="62%" stop-color="#BAE6FD" stop-opacity="1" />
                <stop offset="100%" stop-color="#00A6FF" stop-opacity="0.5" />
              </linearGradient>
              <linearGradient id="ribbonCross" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#00A6FF" stop-opacity="0.35" />
                <stop offset="32%" stop-color="#7DD3FC" stop-opacity="0.95" />
                <stop offset="70%" stop-color="#00A6FF" stop-opacity="0.7" />
                <stop offset="100%" stop-color="#00A6FF" stop-opacity="0.1" />
              </linearGradient>
              <radialGradient id="waveIntersectionBloom" cx="32%" cy="46%" r="36%">
                <stop offset="0%" stop-color="#7DD3FC" stop-opacity="0.65" />
                <stop offset="35%" stop-color="#00A6FF" stop-opacity="0.3" />
                <stop offset="100%" stop-color="#00A6FF" stop-opacity="0" />
              </radialGradient>
              <filter id="mobileWaveGlow" x="-15%" y="-45%" width="130%" height="190%">
                <feGaussianBlur stdDeviation="4.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path d="M-15,24 C85,22 175,66 276,92 C336,106 372,94 405,76" fill="none" stroke="#00A6FF" stroke-opacity="0.26" stroke-width="24" filter="url(#mobileWaveGlow)" />
            <path d="M-15,30 C82,22 176,68 278,94 C338,108 372,96 405,78 L405,160 L-15,160 Z" fill="url(#mobileWaveFill)" />
            <ellipse cx="122" cy="70" rx="130" ry="44" fill="url(#waveIntersectionBloom)" />
            <path d="M-15,30 C82,22 176,68 278,94 C338,108 372,96 405,78" fill="none" stroke="url(#ribbonMain)" stroke-width="2.4" filter="url(#mobileWaveGlow)" />
            <path d="M-15,92 C58,76 112,50 185,54 C252,58 326,102 405,94" fill="none" stroke="url(#ribbonCross)" stroke-width="1.9" filter="url(#mobileWaveGlow)" />
            <path d="M-15,44 C78,42 162,78 272,102 C332,114 374,102 405,86" fill="none" stroke="#7DD3FC" stroke-opacity="0.32" stroke-width="1.1" />
          </svg>

          <div class="bg-gradient-to-b from-[#030712] to-[#030508] -mt-[42px] sm:-mt-[54px] md:-mt-[56px] px-5 sm:px-8 pt-1 pb-5 sm:pb-8">
            <div class="mb-2 sm:mb-3.5">
              <p class="text-[11px] sm:text-xs font-semibold tracking-[0.13em] uppercase text-slate-100">
                20+ Years in Engineering &amp; Design
              </p>
              <div aria-hidden="true" class="mt-1.5 sm:mt-2 h-[3px] w-9 rounded-full bg-[#00A6FF] shadow-[0_0_12px_rgba(0,166,255,0.75)]"></div>
            </div>

            <p class="font-serif-editorial text-[38px] sm:text-5xl font-semibold tracking-tight leading-[1.0] text-white mb-2 sm:mb-3">
              Christopher R
              <span class="block text-[#00A6FF]">McGuire</span>
            </p>

            <p class="text-[15px] sm:text-lg font-semibold text-white mb-1.5 sm:mb-2">${esc(PROFILE.role)}</p>

            <p class="text-[13.5px] sm:text-[15px] text-slate-300 leading-snug sm:leading-relaxed max-w-md mb-4 sm:mb-6">
              Technology leader, software engineer, and UX designer building user-centered
              products that solve real problems and create lasting value.
            </p>

            <div class="grid grid-cols-2 gap-3 mb-4 sm:mb-7 max-w-md">
              <a href="/resume" class="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 rounded-full bg-[#00A6FF] hover:bg-[#38BDF8] text-[#030508] text-xs sm:text-sm font-semibold transition-all duration-150 shadow-[0_0_22px_rgba(0,166,255,0.35)] whitespace-nowrap">
                <span>View Resume</span>
                ${icon('arrowRight', 'w-4 h-4')}
              </a>
              <a href="/contact" class="inline-flex items-center justify-center px-4 py-2.5 sm:py-3 rounded-full border border-white/40 bg-[#050C18]/75 hover:border-[#00A6FF]/80 text-white text-xs sm:text-sm font-medium transition-colors whitespace-nowrap">
                <span>Let's Connect</span>
              </a>
            </div>

            <div class="grid grid-cols-4 max-w-lg">
              ${capabilitiesHtml}
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop Multi-Plane Split Hero -->
      <div class="hidden lg:block relative overflow-hidden border-b border-white/[0.06]">
        <div data-parallax="desktop-bg" aria-hidden="true" class="pointer-events-none absolute -top-32 inset-x-0 bottom-0 origin-bottom will-change-transform">
          <img src="${esc(ASSETS.heroBg)}" alt="" referrerpolicy="no-referrer" class="w-full h-full object-cover object-bottom" />
        </div>
        <div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#030508]/60 via-[#040914]/25 to-transparent"></div>
        <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#030508]/60 to-transparent"></div>
        <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#030508] to-transparent"></div>

        <div class="relative z-10 max-w-7xl mx-auto px-8 min-h-[600px] xl:min-h-[650px] flex flex-row items-center">
          <div data-parallax="desktop-copy" class="w-[54%] py-20 will-change-transform hero-enter">
            <div class="mb-6">
              <p class="text-base font-medium text-slate-200 tracking-wide">
                20+ Years in Engineering &amp; Design
              </p>
              <div aria-hidden="true" class="mt-2.5 h-[3px] w-10 rounded-full bg-[#00A6FF] shadow-[0_0_12px_rgba(0,166,255,0.7)]"></div>
            </div>

            <h1 class="font-serif-editorial text-[72px] font-semibold tracking-tight leading-[1.02] text-white mb-5">
              Christopher R
              <span class="block text-[#00A6FF]">McGuire</span>
            </h1>

            <p class="text-xl font-semibold text-white mb-3">${esc(PROFILE.role)}</p>

            <p class="text-[17px] text-slate-200 leading-relaxed max-w-lg mb-8">
              Technology leader, software engineer, and UX designer building user-centered
              products that solve real problems and create lasting value.
            </p>

            <div class="flex flex-wrap items-center gap-4 mb-10">
              <a href="/resume" class="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#00A6FF] hover:bg-[#38BDF8] text-[#030508] text-sm font-semibold transition-all duration-150 shadow-[0_0_24px_rgba(0,166,255,0.35)] hover:shadow-[0_0_32px_rgba(0,166,255,0.55)] whitespace-nowrap shrink-0">
                <span>View Resume</span>
                ${icon('arrowRight', 'w-4 h-4')}
              </a>
              <a href="/contact" class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/35 bg-[#040914]/55 backdrop-blur-sm hover:border-[#00A6FF]/75 hover:bg-[#081326]/75 text-white text-sm font-medium transition-colors whitespace-nowrap shrink-0">
                <span>Let's Connect</span>
              </a>
            </div>

            <div class="grid grid-cols-4 max-w-lg pt-2">
              ${capabilitiesHtml}
            </div>
          </div>

          <div data-parallax="desktop-portrait" class="flex items-end justify-end pointer-events-none absolute inset-y-0 right-0 xl:right-4 w-[58%] pt-4 origin-bottom will-change-transform">
            <img
              src="${esc(ASSETS.heroCutout)}"
              alt="Christopher R McGuire — SVP of Application Design and Development"
              referrerpolicy="no-referrer"
              class="h-full w-auto max-w-none object-contain object-right-bottom drop-shadow-[0_24px_55px_rgba(0,0,0,0.72)]"
            />
          </div>
        </div>
      </div>

      <!-- Full-Width 4-Column Impact Metrics Deck -->
      <div class="relative z-30 max-w-7xl mx-auto px-5 sm:px-8 pt-8 lg:pt-10 pb-14 lg:pb-20">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          ${metricsHtml}
        </div>
      </div>
    </section>

    <!-- Architectural Ribbon Divider -->
    <div class="border-y border-[#38BDF8]/12 bg-[#060A12] py-4 overflow-hidden select-none">
      <div class="animate-marquee flex items-center gap-8 text-xs sm:text-sm font-medium tracking-wide text-slate-400">
        ${marqueeSequence}
      </div>
    </div>

    <!-- Core Leadership Pillars -->
    <section class="relative py-20 max-w-7xl mx-auto px-5 sm:px-8">
      <div data-reveal class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div class="max-w-2xl">
          <p class="text-sm font-medium text-[#38BDF8] mb-3">Chapter I · Operating Philosophy</p>
          <h2 class="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-4">
            Bridging Design &amp; Engineering
          </h2>
          <p class="text-base text-slate-300 leading-relaxed">${esc(PROFILE.summary)}</p>
        </div>
        <a href="/biography" class="inline-flex items-center gap-2 text-sm font-semibold text-[#38BDF8] hover:text-white transition-colors whitespace-nowrap shrink-0">
          <span>Read Full Life Biography</span>
          ${icon('arrowRight', 'w-4 h-4')}
        </a>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        ${pillarsHtml}
      </div>
    </section>

    <div aria-hidden="true" class="relative max-w-7xl mx-auto px-5 sm:px-8 py-4 overflow-hidden select-none">
      <div class="relative h-px w-full bg-white/[0.06] flex items-center justify-center">
        <div class="h-[2px] w-full max-w-4xl rounded-full bg-gradient-to-r from-transparent via-[#00A6FF] to-transparent shadow-[0_0_24px_rgba(0,166,255,0.65)]"></div>
      </div>
      <div class="mt-2.5 flex justify-center">
        <span class="font-mono-tabular text-[10px] tracking-[0.22em] uppercase text-[#38BDF8]/65">02 // Career Progression</span>
      </div>
    </div>

    <!-- Chapter II: Sticky Scroll-Telling Career Journey -->
    <div class="bg-[#050810] border-y border-white/[0.06]">
      <section id="career-story-track" aria-label="Career Journey Story" class="relative py-20 lg:py-28 max-w-7xl mx-auto px-5 sm:px-8 overflow-x-clip">
        <div aria-hidden="true" class="pointer-events-none absolute -left-28 top-1/4 w-72 h-72 rounded-full bg-[#00A6FF]/[0.06] blur-3xl"></div>
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div class="max-w-2xl">
            <p class="text-sm font-medium text-[#38BDF8] mb-3">Chapter II · Architectural Progression</p>
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
              Where Craft Meets Institutional Scale
            </h2>
          </div>
          <a href="/resume" class="inline-flex items-center gap-2 text-sm font-semibold text-[#38BDF8] hover:text-white transition-colors whitespace-nowrap shrink-0">
            <span>View Full Resume Dossier</span>
            ${icon('arrowRight', 'w-4 h-4')}
          </a>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div class="lg:col-span-6 space-y-5">
            ${roleCardsHtml}
          </div>

          <div class="lg:col-span-6 lg:sticky lg:top-28">
            <div data-reveal class="relative rounded-2xl bg-[#080D17] blueprint-hairline p-7 sm:p-9 overflow-hidden">
              <div aria-hidden="true" class="pointer-events-none absolute -right-24 -top-24 w-72 h-72 rounded-full border border-[#00A6FF]/15 flex items-center justify-center">
                <div class="w-48 h-48 rounded-full border border-dashed border-[#38BDF8]/20"></div>
              </div>

              <div class="flex items-center justify-between gap-4 pb-6 mb-6 border-b border-white/[0.08]">
                <span id="career-detail-code" class="font-mono-tabular text-xs text-slate-400">${esc(initialRole.blueprintCode)}</span>
                <div class="flex items-center gap-1.5" aria-hidden="true">
                  ${progressDotsHtml}
                </div>
              </div>

              <div id="career-detail-body" class="transition-opacity duration-200">
                <p id="career-detail-era" class="text-xs font-medium text-[#38BDF8] mb-2">${esc(initialRole.era)}</p>
                <div class="flex flex-wrap items-baseline justify-between gap-4 mb-6">
                  <h3 id="career-detail-company" class="text-2xl sm:text-3xl font-semibold text-white">${esc(initialRole.company)}</h3>
                  <div class="text-right">
                    <div id="career-detail-badge" class="font-mono-tabular text-3xl sm:text-4xl font-semibold text-[#00A6FF]">${esc(initialRole.metricBadge)}</div>
                    <div id="career-detail-metric-label" class="text-xs text-slate-400">${esc(initialRole.metricLabel)}</div>
                  </div>
                </div>
                <div id="career-detail-highlights" class="space-y-4">
                  ${initialHighlightsHtml}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Chapter III: Selected Builds -->
    <section class="py-24 max-w-7xl mx-auto px-5 sm:px-8">
      <div data-reveal class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div class="max-w-2xl">
          <p class="text-sm font-medium text-[#38BDF8] mb-3">Chapter III · Selected Builds</p>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
            Products Shipped at the Edge of AI &amp; UX
          </h2>
        </div>
        <a href="/projects" class="inline-flex items-center gap-2 text-sm font-semibold text-[#38BDF8] hover:text-white transition-colors whitespace-nowrap shrink-0">
          <span>View All ${PROJECTS.length} Projects</span>
          ${icon('arrowRight', 'w-4 h-4')}
        </a>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        ${featuredShowcase}
      </div>
    </section>

    <div aria-hidden="true" class="relative max-w-7xl mx-auto px-5 sm:px-8 py-4 overflow-hidden select-none">
      <div class="relative h-px w-full bg-white/[0.06] flex items-center justify-center">
        <div class="h-[2px] w-full max-w-4xl rounded-full bg-gradient-to-r from-transparent via-[#00A6FF] to-transparent shadow-[0_0_24px_rgba(0,166,255,0.65)]"></div>
      </div>
      <div class="mt-2.5 flex justify-center">
        <span class="font-mono-tabular text-[10px] tracking-[0.22em] uppercase text-[#38BDF8]/65">04 // Monographs &amp; Essays</span>
      </div>
    </div>

    <!-- Chapter IV: Monographs & Library -->
    <section class="py-20 bg-[#050810] border-y border-white/[0.06]">
      <div class="max-w-7xl mx-auto px-5 sm:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          <div data-reveal class="lg:col-span-5">
            <div data-parallax-window class="overflow-hidden aspect-[4/3] rounded-2xl blueprint-hairline">
              <img src="${esc(ASSETS.booksImg)}" alt="The AI Shortcut Book Series &amp; Investing for the Rest of Us" referrerpolicy="no-referrer" class="w-full h-full object-cover will-change-transform" />
            </div>
          </div>
          <div data-reveal style="transition-delay: 80ms" class="lg:col-span-7 space-y-4">
            <p class="text-sm font-medium text-[#38BDF8]">Chapter IV · Monographs &amp; Library</p>
            <h2 class="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              Published Playbooks &amp; Technical Essays
            </h2>
            <p class="text-base text-slate-300 leading-relaxed max-w-2xl">
              Four Amazon titles covering applied AI workflows for real estate, small business,
              and personal strategy alongside beginner wealth building—paired with long-form
              essays on FinTech UX, design systems, and engineering leadership.
            </p>
            <div class="pt-2 flex flex-wrap gap-4">
              <a href="/blog" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#00A6FF] hover:bg-[#38BDF8] text-[#030508] text-sm font-semibold transition-colors">
                ${icon('bookOpen', 'w-4 h-4')}
                <span>Open Full Library</span>
              </a>
              <a href="/ai-explorations" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/15 hover:border-[#00A6FF]/50 text-white text-sm font-medium transition-colors">
                <span>Explore AI Labs</span>
              </a>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          ${latestArticlesHtml}
        </div>
      </div>
    </section>

    <!-- Chapter V: Executive Collaboration Finale -->
    <section class="relative py-24 max-w-5xl mx-auto px-5 sm:px-8 text-center overflow-hidden">
      <div aria-hidden="true" class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[260px] rounded-full bg-[#00A6FF]/15 blur-3xl"></div>
      <div data-reveal class="relative z-10">
        <p class="text-sm font-medium text-[#38BDF8] mb-3">Chapter V · Collaboration</p>
        <h2 class="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-5">
          Let's Build Something Enduring
        </h2>
        <p class="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8">
          Seeking an experienced executive leader to steer Application Engineering, UX/UI Design
          Systems, or AI-accelerated transformation? Let's connect.
        </p>
        <a href="/contact" class="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#00A6FF] hover:bg-[#38BDF8] text-[#030508] text-sm font-semibold transition-all duration-150 hover:shadow-[0_0_28px_rgba(0,166,255,0.45)]">
          <span>Start a Conversation</span>
          ${icon('arrowRight', 'w-4 h-4')}
        </a>
      </div>
    </section>
  </div>`;
}
