import { ASSETS, MODUS_GALLERY, SNAPCLIPPER_SCREENS } from '../../data/siteData';
import { icon } from '../icons';
import { ogImage, breadcrumbSchema, esc, toAbsoluteUrl, type SeoConfig } from '../seo';
import { PROFILE } from '../../data/siteData';

export const MODUS_MODES = [
  {
    id: 'paint',
    label: 'Paint-Only Mode',
    headline: 'Texture-mapped wall color previews preserving natural room shadows.',
    detail:
      'Preview exact architectural paint tones across your walls while keeping every piece of furniture, flooring, and ambient light reflection intact.',
    spec: 'Zero structural drift · Real lighting calibration',
    previewImg: '/images/modus-2.webp',
  },
  {
    id: 'refresh',
    label: 'Refresh & Elevate',
    headline: 'Keep your existing sofa, tables, and cabinetry—reimagine everything else.',
    detail:
      'Spatial locking identifies key furniture pieces and generates cohesive lighting, rugs, wall finishes, and decor around what you already own.',
    spec: 'Furniture preservation lock · Curated style pass',
    previewImg: '/images/modus-1.webp',
  },
  {
    id: 'remodel',
    label: 'Structural Remodel',
    headline: 'Explore layout optimizations for interiors, facades, patios & storage.',
    detail:
      'Generate architecturally grounded remodel directions and export a Contractor Brief complete with paint codes and spatial notes.',
    spec: 'Draft engine + Nano Banana Pro · Contractor Brief export',
    previewImg: '/images/modus-5.webp',
  },
];

export const MODUS_FAQS = [
  {
    q: 'Is there a free AI interior design app without a subscription?',
    a: 'Modus AI is free to download and uses a simple credit-based model. Instead of locking you into $20–$40/month subscriptions, you pay only for the designs you generate.',
  },
  {
    q: 'Can AI design my room while keeping my real furniture?',
    a: 'Yes. Refresh & Elevate mode identifies your existing sofas, tables, and cabinets and redesigns the surrounding finishes, decor, and lighting around them.',
  },
  {
    q: 'How can I visualize paint colors on my actual walls?',
    a: 'Paint-Only mode applies texture mapping directly to your walls while preserving shadows, reflections, and architectural depth.',
  },
  {
    q: 'Does Modus AI work for exterior facades and landscaping?',
    a: 'Yes—specialized models support Exterior Facades, Garden Landscapes, and Patios while respecting structural boundaries.',
  },
];

export const SAMPLE_CLIPS = [
  {
    id: 'c1',
    tag: 'Fintech UX',
    source: 'paguire.com',
    text: 'In FinTech, UX is how trust gets built and costly operational mistakes get prevented.',
  },
  {
    id: 'c2',
    tag: 'Code',
    source: 'react.dev',
    text: 'const y = useTransform(scrollYProgress, [0, 1], [-24, 24]);',
  },
  {
    id: 'c3',
    tag: 'Research',
    source: 'hbr.org',
    text: 'Consistent internal design systems eliminate shadow-IT spreadsheet workarounds.',
  },
];

export const BLUEPRINT_SPRINTS = [
  {
    window: '00–15 Min',
    title: 'Step 01 · Strategic Idea Generation',
    promptFocus: 'Context-aware audience mining & topic matrix generation across core pillars.',
  },
  {
    window: '15–30 Min',
    title: 'Step 02 · Structured Long-Form Outlining',
    promptFocus: 'Transforming selected angles into sharp, evidence-backed structural outlines.',
  },
  {
    window: '30–45 Min',
    title: 'Step 03 · Voice-Aligned Drafting',
    promptFocus: 'Generating high-clarity long-form copy tuned to your authentic executive voice.',
  },
  {
    window: '45–60 Min',
    title: 'Step 04 · 5-Channel Repurposing Sprint',
    promptFocus: 'Distilling one flagship piece into 5 distinct LinkedIn, X, and newsletter assets.',
  },
];

export const MODUS_AI_SEO: SeoConfig = {
  path: '/projects/modus-ai',
  title: 'Modus AI: AI Interior & Exterior Design for iOS | Paguire',
  description:
    'Modus AI is an iOS AI room designer that restyles interiors, exteriors and paint colors while locking your real furniture in place. No subscription.',
  keywords:
    'Modus AI, AI Interior Design App, iOS Room Designer, Spatial AI, Furniture Preservation, Paint Visualizer, Christopher R McGuire',
  ogImage: ogImage('modus-ai'),
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Modus AI',
      operatingSystem: 'iOS',
      applicationCategory: 'DesignApplication',
      description:
        'AI interior and exterior design iOS application with spatial constraints preserving real furniture and architectural footprints.',
      url: toAbsoluteUrl('/projects/modus-ai'),
      downloadUrl: 'https://apps.apple.com/us/app/modus-ai-interior-design-app/id6757023994',
      author: { '@type': 'Person', name: PROFILE.name },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: MODUS_FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
      { name: 'Modus AI', path: '/projects/modus-ai' },
    ]),
  ],
};

export const MODUS_PRIVACY_SEO: SeoConfig = {
  path: '/projects/modus-ai/privacy',
  title: 'Modus AI Privacy Policy | Christopher R McGuire — Paguire',
  description:
    'Learn how Modus AI protects user privacy through on-device Gemini Nano pre-processing, zero ad tracking, and full local iOS/iCloud photo control.',
  keywords: 'Modus AI Privacy Policy, Paguire Privacy, On-Device AI Privacy, iOS Interior Design Privacy',
  ogImage: ogImage('modus-ai'),
  jsonLd: [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
      { name: 'Modus AI', path: '/projects/modus-ai' },
      { name: 'Privacy Policy', path: '/projects/modus-ai/privacy' },
    ]),
  ],
};

export const SNAPCLIPPER_SEO: SeoConfig = {
  path: '/projects/snapclipper',
  title: 'SnapClipper — Privacy-First AI Web Clipper | Paguire',
  description:
    'One-click Chrome extension for capturing web highlights, code snippets, and prompts with local-first AI categorization and Markdown/JSON export.',
  keywords:
    'SnapClipper, Chrome Extension, AI Web Clipper, Local-First Knowledge Capture, Research Clipper, Christopher R McGuire',
  ogImage: ogImage('snapclipper'),
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'SnapClipper',
      operatingSystem: 'Chrome OS, macOS, Windows, Linux',
      applicationCategory: 'ProductivityApplication',
      description:
        'Privacy-first AI web clipper Chrome extension with automatic categorization and local browser storage.',
      url: toAbsoluteUrl('/projects/snapclipper'),
      downloadUrl: 'https://chromewebstore.google.com/detail/snapclipper/eboikfkhaojmcbmpdcdbcblflncledmc',
      author: { '@type': 'Person', name: PROFILE.name },
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
      { name: 'SnapClipper', path: '/projects/snapclipper' },
    ]),
  ],
};

export const BLUEPRINT_SEO: SeoConfig = {
  path: '/projects/blueprint',
  title: '1-Hour Content Creator Blueprint | AI Workflow — Paguire',
  description:
    'A strict 4-step, 60-minute AI prompt engineering system for GPT-4, Claude, and Gemini to produce a full week of executive content.',
  keywords:
    '1-Hour Content Creator Blueprint, AI Prompt System, Content Workflow, Claude, Gemini, GPT-4, Christopher R McGuire',
  ogImage: ogImage('blueprint'),
  jsonLd: [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
      { name: '1-Hour Blueprint', path: '/projects/blueprint' },
    ]),
  ],
};

export function renderModusPrivacyPage(): string {
  const sections = [
    {
      num: '01.',
      title: 'On-Device Pre-processing',
      body: 'Core spatial reasoning and image identification happen directly on your device using Gemini Nano and on-device machine learning to minimize external transmission.',
    },
    {
      num: '02.',
      title: 'Data Collection',
      body: 'Modus AI does not collect personal identifiers such as your name, address, or email unless explicitly provided for support or contractor brief exports. Uploaded photos are never used for model training by PaGuire.',
    },
    {
      num: '03.',
      title: 'Data Sharing',
      body: 'We do not sell your data to third parties. Data is shared strictly with processing engines for the sole purpose of generating your requested room renders.',
    },
    {
      num: '04.',
      title: 'Your Control',
      body: 'You maintain full control over uploaded photos and saved renders, stored locally on your iOS device or your personal iCloud if enabled.',
    },
    {
      num: '05.',
      title: 'Contact',
      body: 'Questions regarding privacy can be sent directly to Christopher.R.McGuire@gmail.com.',
    },
  ];

  return `<div class="max-w-4xl mx-auto px-5 sm:px-8 py-16 lg:py-24">
    <a href="/projects/modus-ai" class="inline-flex items-center gap-2 text-sm text-[#38BDF8] hover:text-white mb-8">
      ${icon('arrowLeft', 'w-4 h-4')}
      <span>Back to Modus AI</span>
    </a>

    <p class="text-xs font-mono-tabular text-[#38BDF8] mb-2">
      Privacy Policy · Last Updated December 30, 2025
    </p>
    <h1 class="text-3xl sm:text-5xl font-semibold text-white mb-8">
      Modus AI Privacy: How Paguire Protects Your Data
    </h1>

    <div class="space-y-6">
      ${sections
        .map(
          (sec, i) => `<div data-reveal style="transition-delay: ${i * 50}ms" class="p-6 rounded-2xl bg-[#090E18] blueprint-hairline">
            <h2 class="text-lg font-semibold text-white mb-2">
              <span class="font-mono-tabular text-[#00A6FF] mr-2">${esc(sec.num)}</span>${esc(sec.title)}
            </h2>
            <p class="text-sm sm:text-base text-slate-300 leading-relaxed">${esc(sec.body)}</p>
          </div>`
        )
        .join('\n')}
    </div>
  </div>`;
}

export function renderModusAiPage(): string {
  const firstStage = MODUS_GALLERY[0];
  const firstMode = MODUS_MODES[0];

  const storyBeatsHtml = MODUS_GALLERY.map((item, idx) => {
    const active = idx === 0;
    return `<button
      type="button"
      data-modus-stage="${idx}"
      aria-pressed="${active ? 'true' : 'false'}"
      class="w-full text-left p-5 rounded-2xl transition-all duration-200 cursor-pointer ${
        active
          ? 'bg-[#0C1526] border border-[#00A6FF]/55 shadow-[0_0_28px_rgba(0,166,255,0.14)]'
          : 'bg-[#080C15] border border-white/[0.06] opacity-70 hover:opacity-100'
      }"
    >
      <div class="flex items-center justify-between text-xs mb-1.5">
        <span class="font-mono-tabular text-[#00A6FF]">Stage ${esc(item.step)}</span>
        <span class="text-slate-400">${esc(item.spec)}</span>
      </div>
      <h3 class="text-lg font-semibold text-white mb-1">${esc(item.title)}</h3>
      <p class="text-sm text-slate-400 leading-relaxed">${esc(item.caption)}</p>
    </button>`;
  }).join('\n');

  const modeTabsHtml = MODUS_MODES.map((m, idx) => {
    const active = idx === 0;
    return `<button
      type="button"
      data-modus-mode="${esc(m.id)}"
      aria-pressed="${active ? 'true' : 'false'}"
      class="relative px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
        active ? 'bg-[#00A6FF] text-[#030508] font-semibold' : 'text-slate-300 hover:text-white'
      }"
    >${esc(m.label)}</button>`;
  }).join('\n');

  const faqsHtml = MODUS_FAQS.map((item, idx) => {
    const expanded = idx === 0;
    return `<div data-reveal style="transition-delay: ${idx * 55}ms" class="rounded-2xl bg-[#090E18] blueprint-hairline overflow-hidden" data-faq-item>
      <button
        type="button"
        data-faq-toggle="${idx}"
        aria-expanded="${expanded ? 'true' : 'false'}"
        class="w-full px-6 py-5 text-left flex items-center justify-between gap-4 text-white font-medium cursor-pointer"
      >
        <span>${esc(item.q)}</span>
        <span data-faq-chevron class="transition-transform duration-200 ${expanded ? 'rotate-180' : ''}">
          ${icon('chevronDown', 'w-4 h-4 text-[#00A6FF] shrink-0')}
        </span>
      </button>
      <div data-faq-panel class="${expanded ? '' : 'hidden'}">
        <div class="px-6 pb-5 text-sm text-slate-300 leading-relaxed border-t border-white/[0.06] pt-4">
          ${esc(item.a)}
        </div>
      </div>
    </div>`;
  }).join('\n');

  return `<div class="max-w-7xl mx-auto px-5 sm:px-8 py-16 lg:py-24 space-y-20">
    <div>
      <a href="/projects" class="inline-flex items-center gap-2 text-sm text-[#38BDF8] hover:text-white mb-8">
        ${icon('arrowLeft', 'w-4 h-4')}
        <span>Back to Projects</span>
      </a>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div class="lg:col-span-6 space-y-5 hero-enter">
          <p class="text-sm font-medium text-[#38BDF8]">
            Interior &amp; Exterior Design · Spatial AI (iOS)
          </p>
          <h1 class="text-4xl sm:text-5xl font-semibold tracking-tight text-white">
            Modus AI — Accurate Room Design Without Subscriptions
          </h1>
          <p class="text-base sm:text-lg text-slate-300 leading-relaxed">
            Built to redesign your real home—not hallucinate impossible layouts. Transform
            interiors, exterior facades, and paint colors while locking your actual furniture and
            architectural footprint.
          </p>
          <div class="flex flex-wrap gap-4 pt-2">
            <a
              href="https://apps.apple.com/us/app/modus-ai-interior-design-app/id6757023994"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#00A6FF] hover:bg-[#38BDF8] text-[#030508] text-sm font-semibold transition-colors"
            >
              <span>Download for iOS</span>
              ${icon('arrowUpRight', 'w-4 h-4')}
            </a>
            <a
              href="/projects/modus-ai/privacy"
              class="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/15 hover:border-[#00A6FF]/50 text-white text-sm font-medium transition-colors"
            >
              ${icon('lock', 'w-4 h-4 text-[#00A6FF]')}
              <span>Privacy Policy</span>
            </a>
          </div>
        </div>

        <div class="lg:col-span-6">
          <div class="aspect-video rounded-2xl overflow-hidden blueprint-hairline bg-[#050810]">
            <img
              src="/assets/aistudio/Modus_AI_e260817c.webp"
              alt="Modus AI app interface — room redesign, paint visualizer, and space organizer"
              referrerpolicy="no-referrer"
              class="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll-Driven Spatial Story -->
    <section id="modus-spatial-story" aria-label="Modus AI Spatial Transformation Story" class="relative py-16 lg:py-24 border-y border-white/[0.08] bg-[#050810] -mx-5 sm:-mx-8 px-5 sm:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="max-w-2xl mb-12">
          <p class="text-sm font-medium text-[#38BDF8] mb-2">Scroll-Driven Spatial Story</p>
          <h2 class="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-3">
            From Real Room Photo to Architecturally Locked Redesign
          </h2>
          <p class="text-sm sm:text-base text-slate-400">
            Scroll or select each stage to watch how Modus AI transitions across interior locking,
            true-light paint calibration, storage layout, and exterior architecture.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div class="lg:col-span-5 space-y-4">
            ${storyBeatsHtml}
          </div>

          <div class="lg:col-span-7 lg:sticky lg:top-28">
            <div class="relative rounded-2xl overflow-hidden bg-[#090E18] blueprint-hairline p-4 sm:p-6">
              <div aria-hidden="true" class="pointer-events-none absolute inset-0 architectural-grid opacity-55"></div>
              <div class="relative z-10 flex items-center justify-between gap-4 pb-4 mb-4 border-b border-white/[0.08]">
                <span id="modus-stage-counter" class="font-mono-tabular text-xs text-[#38BDF8]">
                  MODUS SPATIAL STAGE ${esc(firstStage.step)} / 0${MODUS_GALLERY.length}
                </span>
                <div class="flex items-center gap-1.5" aria-hidden="true">
                  ${MODUS_GALLERY.map(
                    (_, idx) => `<span data-modus-dot="${idx}" class="h-1.5 rounded-full transition-all duration-200 ${
                      idx === 0 ? 'w-6 bg-[#00A6FF]' : 'w-1.5 bg-slate-700'
                    }"></span>`
                  ).join('')}
                </div>
              </div>

              <div class="relative z-10 aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#030508] border border-[#38BDF8]/20">
                <img id="modus-stage-img" src="${esc(firstStage.image)}" alt="${esc(firstStage.title)}" referrerpolicy="no-referrer" class="w-full h-full object-cover transition-opacity duration-200" />
                <div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030508]/90 via-transparent to-transparent"></div>
                <div class="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#030508]/88 backdrop-blur-md border border-[#00A6FF]/35">
                  <div id="modus-stage-spec" class="text-xs font-medium text-[#38BDF8] mb-0.5">${esc(firstStage.spec)}</div>
                  <div id="modus-stage-title" class="text-base font-semibold text-white">${esc(firstStage.title)}</div>
                  <p id="modus-stage-caption" class="text-xs text-slate-300 mt-1">${esc(firstStage.caption)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Spatial Constraints Switcher -->
    <section data-reveal class="p-8 sm:p-10 rounded-2xl bg-[#090E18] blueprint-hairline">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/[0.08]">
        <div>
          <h2 class="text-2xl font-semibold text-white">Interactive Spatial Constraint Modes</h2>
          <p class="text-sm text-slate-400 mt-1">
            Switch modes to inspect how Modus AI locks architecture and furniture.
          </p>
        </div>
        <div role="group" aria-label="Modus AI spatial constraint modes" class="flex flex-wrap gap-1.5 p-1 rounded-xl bg-[#090E18] border border-white/[0.08]">
          ${modeTabsHtml}
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div class="md:col-span-7 space-y-4">
          <h3 id="modus-mode-headline" class="text-xl sm:text-2xl font-semibold text-[#38BDF8]">${esc(firstMode.headline)}</h3>
          <p id="modus-mode-detail" class="text-base text-slate-300 leading-relaxed">${esc(firstMode.detail)}</p>
          <div id="modus-mode-spec" class="inline-block px-4 py-2.5 rounded-xl bg-[#050810] border border-[#00A6FF]/25 text-xs text-slate-300">
            ${esc(firstMode.spec)}
          </div>
        </div>
        <div class="md:col-span-5">
          <div class="aspect-[4/3] rounded-xl overflow-hidden border border-white/10">
            <img id="modus-mode-img" src="${esc(firstMode.previewImg)}" alt="${esc(firstMode.label)}" referrerpolicy="no-referrer" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Comparison -->
    <section data-reveal class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      <div class="lg:col-span-6 p-8 rounded-2xl bg-[#090E18] blueprint-hairline flex flex-col justify-between space-y-6">
        <div>
          <h2 class="text-2xl font-semibold text-white mb-2">Credit-Based Value ($0/mo)</h2>
          <p class="text-sm text-slate-400 mb-6">
            No $29.99/mo ($360/yr) subscriptions. Pay only for the credits you use.
          </p>
          <div class="space-y-4">
            <div class="p-4 rounded-xl bg-[#050810] border border-white/[0.08]">
              <div class="font-semibold text-white">The Single Room Pass</div>
              <div class="text-xs text-[#38BDF8] mt-1">10 ReCraft Design Credits · Ideal for weekend projects</div>
            </div>
            <div class="p-4 rounded-xl bg-[#050810] border border-[#00A6FF]/40">
              <div class="font-semibold text-white">The Project Pack</div>
              <div class="text-xs text-[#38BDF8] mt-1">50 ReCraft Design Credits · Built for multi-room renovations</div>
            </div>
          </div>
        </div>
        <p class="text-xs text-slate-400">
          Engine: Powered by Gemini with on-device spatial pre-processing.
        </p>
      </div>

      <div class="lg:col-span-6 rounded-2xl overflow-hidden blueprint-hairline">
        <img src="${esc(ASSETS.modusBlueprintImg)}" alt="Modus AI architectural wireframe transition" referrerpolicy="no-referrer" class="w-full h-full object-cover" />
      </div>
    </section>

    <!-- FAQ Accordion -->
    <section class="space-y-4">
      <h2 class="text-2xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
      ${faqsHtml}
    </section>
  </div>`;
}

export function renderSnapClipperPage(): string {
  const screensHtml = SNAPCLIPPER_SCREENS.map(
    (screen, idx) => `<div data-reveal style="transition-delay: ${idx * 75}ms" class="rounded-2xl overflow-hidden bg-[#090E18] blueprint-hairline flex flex-col">
      <div class="aspect-[4/3] w-full overflow-hidden bg-[#050810] border-b border-white/[0.08]">
        <img src="${esc(screen.image)}" alt="${esc(screen.title)}" referrerpolicy="no-referrer" class="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.03]" />
      </div>
      <div class="p-6">
        <span class="font-mono-tabular text-xs text-[#00A6FF] block mb-1.5">${esc(screen.step)}.</span>
        <h3 class="text-lg font-semibold text-white mb-2">${esc(screen.title)}</h3>
        <p class="text-sm text-slate-400 leading-relaxed">${esc(screen.description)}</p>
      </div>
    </div>`
  ).join('\n');

  const clipTags = ['All', 'Fintech UX', 'Code', 'Research', 'Inspiration'];
  const clipTabsHtml = clipTags
    .map((t, idx) => {
      const active = idx === 0;
      return `<button
        type="button"
        data-clip-filter="${esc(t)}"
        aria-pressed="${active ? 'true' : 'false'}"
        class="relative px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
          active ? 'bg-[#00A6FF] text-[#030508] font-semibold' : 'text-slate-300 hover:text-white'
        }"
      >${esc(t)}</button>`;
    })
    .join('\n');

  const initialClipsHtml = SAMPLE_CLIPS.map(
    (c) => `<div class="p-4 rounded-xl bg-[#050810] border border-white/[0.07]">
      <div class="flex items-center justify-between text-xs text-[#38BDF8] mb-1.5">
        <span>${esc(c.tag)}</span>
        <span class="text-slate-500">${esc(c.source)}</span>
      </div>
      <p class="text-sm text-slate-200">${esc(c.text)}</p>
    </div>`
  ).join('\n');

  return `<div class="max-w-7xl mx-auto px-5 sm:px-8 py-16 lg:py-24 space-y-20">
    <div>
      <a href="/projects" class="inline-flex items-center gap-2 text-sm text-[#38BDF8] hover:text-white mb-8">
        ${icon('arrowLeft', 'w-4 h-4')}
        <span>Back to Projects</span>
      </a>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div class="lg:col-span-6 space-y-5 hero-enter">
          <p class="text-sm font-medium text-[#38BDF8]">
            Chrome Extension · Privacy-First Knowledge Capture
          </p>
          <h1 class="text-4xl sm:text-5xl font-semibold tracking-tight text-white">
            SnapClipper — Capture. Organize. Remember.
          </h1>
          <p class="text-base sm:text-lg text-slate-300 leading-relaxed">
            Highlight anything on the web, press Command+Shift+Y or right-click to save, and
            retrieve it instantly with AI auto-tagging and local-only browser storage.
          </p>
          <div class="flex flex-wrap gap-4 pt-2">
            <a
              href="https://chromewebstore.google.com/detail/snapclipper/eboikfkhaojmcbmpdcdbcblflncledmc"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#00A6FF] hover:bg-[#38BDF8] text-[#030508] text-sm font-semibold transition-colors"
            >
              <span>Get Chrome Extension</span>
              ${icon('arrowUpRight', 'w-4 h-4')}
            </a>
            <button
              type="button"
              id="simulate-clip-btn"
              class="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/15 hover:border-[#00A6FF]/50 text-white text-sm font-medium transition-colors cursor-pointer"
            >
              ${icon('bookmarkCheck', 'w-4 h-4 text-[#00A6FF]')}
              <span>Simulate Clip Capture</span>
            </button>
          </div>
        </div>

        <div class="lg:col-span-6 space-y-5">
          <div class="aspect-video rounded-2xl overflow-hidden blueprint-hairline bg-[#050810]">
            <img src="/assets/aistudio/SnapClipper_dc1f331f.webp" alt="SnapClipper Chrome Extension dashboard" referrerpolicy="no-referrer" class="w-full h-full object-cover object-center" />
          </div>
        </div>
      </div>
    </div>

    <section class="py-8">
      <div class="max-w-2xl mb-10">
        <p class="text-sm font-medium text-[#38BDF8] mb-2">Interface Surfaces</p>
        <h2 class="text-2xl sm:text-3xl font-semibold text-white">
          Capture, Organize &amp; Control in Three Depth Planes
        </h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${screensHtml}
      </div>
    </section>

    <div class="p-6 sm:p-8 rounded-2xl bg-[#090E18] blueprint-hairline space-y-5">
      <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
        <span id="clip-count-label" class="text-base font-semibold text-white">
          Interactive Clip Organizer (${SAMPLE_CLIPS.length} clips)
        </span>
        <div role="group" aria-label="Filter sample clips" class="flex flex-wrap gap-1.5 p-1 rounded-xl bg-[#090E18] border border-white/[0.08]">
          ${clipTabsHtml}
        </div>
      </div>
      <div id="clip-grid" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        ${initialClipsHtml}
      </div>
    </div>
  </div>`;
}

export function renderBlueprintPage(): string {
  const firstSprint = BLUEPRINT_SPRINTS[0];
  const sprintTabsHtml = BLUEPRINT_SPRINTS.map((sp, i) => {
    const active = i === 0;
    return `<button
      type="button"
      data-blueprint-sprint="${i}"
      aria-pressed="${active ? 'true' : 'false'}"
      class="relative px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
        active ? 'bg-[#00A6FF] text-[#030508] font-semibold' : 'text-slate-300 hover:text-white'
      }"
    >${esc(sp.window)}</button>`;
  }).join('\n');

  const checklistHtml = [
    '4 Battle-Tested Prompt Chains',
    'Platform-Agnostic (Gemini / Claude / GPT)',
    '15-Page Actionable Execution Guide',
  ]
    .map(
      (item) => `<div class="flex items-center gap-2 text-xs text-slate-300">
        ${icon('checkCircle2', 'w-4 h-4 text-[#00A6FF] shrink-0')}
        <span>${esc(item)}</span>
      </div>`
    )
    .join('\n');

  return `<div class="max-w-6xl mx-auto px-5 sm:px-8 py-16 lg:py-24 space-y-14">
    <div>
      <a href="/projects" class="inline-flex items-center gap-2 text-sm text-[#38BDF8] hover:text-white mb-8">
        ${icon('arrowLeft', 'w-4 h-4')}
        <span>Back to Projects</span>
      </a>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div class="lg:col-span-7 space-y-4 hero-enter">
          <p class="text-sm font-medium text-[#38BDF8]">
            AI Workflow System · GPT-4, Claude &amp; Gemini Ready
          </p>
          <h1 class="text-4xl sm:text-5xl font-semibold tracking-tight text-white">
            1-Hour Content Creator Blueprint
          </h1>
          <p class="text-lg text-slate-300 leading-relaxed">
            You don't have a content problem—you have a workflow problem. A strict 4-step,
            60-minute AI prompt system engineered to produce one full week of strategic content
            without blank-page friction.
          </p>
        </div>
        <div class="lg:col-span-5">
          <div class="aspect-[4/3] rounded-2xl overflow-hidden blueprint-hairline">
            <img src="${esc(ASSETS.buildingWebApp)}" alt="Christopher R McGuire building web applications and design systems" referrerpolicy="no-referrer" class="w-full h-full object-cover object-top" />
          </div>
        </div>
      </div>
    </div>

    <div data-reveal class="p-8 rounded-2xl bg-[#090E18] blueprint-hairline space-y-6">
      <div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div class="inline-flex items-center gap-2 text-sm font-semibold text-white">
          ${icon('clock', 'w-4 h-4 text-[#00A6FF]')}
          <span>Interactive 60-Minute Sprint Timeline</span>
        </div>
        <div role="group" aria-label="Select sprint interval" class="flex flex-wrap gap-1.5 p-1 rounded-xl bg-[#090E18] border border-white/[0.08]">
          ${sprintTabsHtml}
        </div>
      </div>

      <div class="space-y-2">
        <h2 id="blueprint-sprint-title" class="text-2xl font-semibold text-white">${esc(firstSprint.title)}</h2>
        <p id="blueprint-sprint-focus" class="text-base text-slate-300 leading-relaxed">${esc(firstSprint.promptFocus)}</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        ${checklistHtml}
      </div>
    </div>

    <div data-reveal style="transition-delay: 80ms" class="p-7 rounded-2xl bg-[#090E18] blueprint-hairline flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      <div>
        <div class="inline-flex items-center gap-2 text-xs text-[#38BDF8] mb-1">
          ${icon('sparkles', 'w-4 h-4')}
          <span>Need Custom AI Workflow Consulting?</span>
        </div>
        <p class="text-sm text-slate-300">
          Reach out to discuss team AI upskilling and prompt engineering standards.
        </p>
      </div>
      <a href="/contact" class="px-5 py-2.5 rounded-lg bg-[#00A6FF] hover:bg-[#38BDF8] text-[#030508] text-xs font-semibold transition-colors shrink-0">
        Contact Christopher
      </a>
    </div>
  </div>`;
}
