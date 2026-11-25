import {
  AI_EXPLORATION_APPS,
  AI_VIDEO_REELS,
  ASSETS,
  VIBE_CODED_APPS,
} from '../../data/siteData';
import { icon, type IconName } from '../icons';
import { ogImage, breadcrumbSchema, esc, type SeoConfig } from '../seo';

export interface WorkbenchPillar {
  id: 'voice' | 'images' | 'video' | 'notebooklm' | 'coding';
  index: string;
  label: string;
  icon: IconName;
  modelLine: string;
  title: string;
  summary: string;
  bullets: string[];
  examples: { name: string; detail: string }[];
  image: string;
  imageAlt: string;
  primaryUrl?: string;
  primaryLabel?: string;
  secondaryUrl?: string;
  secondaryLabel?: string;
  anchorHref?: string;
  anchorLabel?: string;
}

export const WORKBENCH_PILLARS: WorkbenchPillar[] = [
  {
    id: 'voice',
    index: '01',
    label: 'Voice Models',
    icon: 'audioWaveform',
    modelLine: 'ElevenLabs · Neural Voice Synthesis · Custom Cadence Calibration',
    title: 'ElevenLabs Neural Voice Cloning & Audio Production',
    summary:
      'Exploring high-fidelity voice synthesis for accessible digital narration, personalized educational audio, and interactive product prototypes—extending the live voice-cloning experiment originally launched on paguire.com.',
    bullets: [
      'Published an interactive custom voice clone trained on natural speech cadence so visitors and product builders can audition personalized voiceovers.',
      'Applied synthetic voice pipelines for accessibility audio, product walkthroughs, and multi-language explainer narration.',
      'Chained ElevenLabs vocal tracks directly with generative seed portraits and video models into cohesive narrative reels.',
    ],
    examples: [
      {
        name: 'Public ElevenLabs Voice Clone',
        detail: 'Interactive custom voice profile calibrated for clear executive and product narration.',
      },
      {
        name: 'Multimodal Seed-to-Video Narration',
        detail: 'Paired synthetic vocal tracks with generative frames and motion prompts in early R&D tests.',
      },
      {
        name: 'Accessibility & Onboarding Audio',
        detail: 'Prototype voiceover pipelines for educational walkthroughs and assistive UI narration.',
      },
    ],
    image: ASSETS.aiLabsPodcast,
    imageAlt: 'Christopher R McGuire recording voice synthesis audio in a dark modern broadcast studio',
    primaryUrl: 'https://elevenlabs.io/app/voice-library?voiceId=RPEIZnKMqlQiZyZd1Dae',
    primaryLabel: 'Try My Voice Clone',
    secondaryUrl: 'https://try.elevenlabs.io/u8xfskjfa43y',
    secondaryLabel: 'Explore ElevenLabs',
  },
  {
    id: 'images',
    index: '02',
    label: 'AI Images',
    icon: 'image',
    modelLine:
      'GPT Image (2 / 2.5 / 2.6) · Nano Banana (2 / 2.1 / Pro) · Replicate · Leonardo.ai · Firefly · Flux',
    title: 'Multi-Year Visual Direction Across Marketing, Headshots & App UX',
    summary:
      'Extensive multi-year production experience directing GPT Image and Nano Banana model families—alongside Replicate, Leonardo.ai, Firefly, and Flux—across marketing campaigns, studio headshots, and early software concepting.',
    bullets: [
      'Marketing creative & executive headshots calibrated with repeatable subject consistency, lighting continuity, and art direction.',
      'Initial UI/UX concepting and screen ideation for new applications before committing engineering cycles to production builds.',
      'Spatial image-to-image pipelines locking room geometry and furniture constraints inside shipped consumer software.',
    ],
    examples: [
      {
        name: 'Marketing Creative & Studio Headshots',
        detail: 'Custom twilight skyline backdrops, editorial executive portraits, and campaign collateral.',
      },
      {
        name: 'Early App Concepting & UI Mockups',
        detail: 'Rapid visual exploration of mobile flows, SaaS dashboards, and brand systems prior to coding.',
      },
      {
        name: 'Spatial Interior Redesign Engine (Modus AI)',
        detail: 'Constraints-driven image-to-image transformation shipped on the iOS App Store.',
      },
    ],
    image: ASSETS.aiImagesStudio,
    imageAlt:
      'Christopher R McGuire surrounded by a gallery of GPT Image and Nano Banana portraits, marketing designs, and interface mockups',
    primaryUrl: 'https://gemini.google.com/',
    primaryLabel: 'Gemini & Nano Banana Stack',
    anchorHref: '#vibe-coding-apps',
    anchorLabel: 'See Shipped Visual Products',
  },
  {
    id: 'video',
    index: '03',
    label: 'AI Video',
    icon: 'film',
    modelLine: 'Google Omni · Google Veo (Veo 3 / 3.1) · Generative Storyboarding',
    title: 'Google Omni & Veo Production for Product Marketing & Creative Film',
    summary:
      'Extensive hands-on video creation utilizing Google’s Omni and Veo models to produce commercial product launch reels for Thrive Financial alongside original personal, narrative, and hobby film projects.',
    bullets: [
      'Directed product storytelling, commercial explainers, and feature spot reels for Thrive Financial (@ThriveFinancialLLC).',
      'Produced narrative trailers, brand vignettes, and animated hobby experiments on personal YouTube (@crmcguire1974).',
      'Combined generative seed imagery, camera motion choreography, and synthetic voiceover into publish-ready 16:9 YouTube deliverables.',
    ],
    examples: [
      {
        name: 'Thrive Financial Product Commercials',
        detail: 'Launch videos and forensic analysis spots streaming on @ThriveFinancialLLC.',
      },
      {
        name: 'FuzzTown the Series Trailer',
        detail: 'Original animated series trailer built across character consistency and Veo motion synthesis.',
      },
      {
        name: 'Founder Story & Product Reels',
        detail: 'Narrative spotlights for SnapClipper, executive UX storytelling, and brand intro videos.',
      },
    ],
    image: ASSETS.aiVideoSuite,
    imageAlt: 'Christopher R McGuire at his studio desk editing generative AI video timelines and voiceovers',
    primaryUrl: 'https://www.youtube.com/@ThriveFinancialLLC',
    primaryLabel: 'Thrive Financial YouTube',
    secondaryUrl: 'https://www.youtube.com/@crmcguire1974',
    secondaryLabel: 'Personal YouTube Channel',
  },
  {
    id: 'notebooklm',
    index: '04',
    label: 'NotebookLM',
    icon: 'bookOpenText',
    modelLine: 'Google NotebookLM · Video & Audio Overviews · User Research Synthesis',
    title: 'Research Synthesis & Video Explainability at Product Speed',
    summary:
      'Deploying Google NotebookLM both outward-facing—turning complex forensic financial topics into clear Thrive Financial marketing videos—and inward-facing to distill qualitative user research into new application blueprints.',
    bullets: [
      'Marketing video & onboarding explainers for Thrive Financial translating forensic financial workflows into approachable guides.',
      'Deep synthesis across collected user interviews, customer feedback transcripts, and domain literature to uncover unmet pain points.',
      'Structured product requirements extraction feeding directly into rapid application prototyping sprints.',
    ],
    examples: [
      {
        name: 'Thrive Financial First-Time User & Red-Flag Guides',
        detail: 'NotebookLM-driven marketing and onboarding videos simplifying settlement clarity.',
      },
      {
        name: 'Qualitative User Data Synthesis',
        detail: 'Cross-referencing discovery interviews and field research to prioritize high-impact features.',
      },
      {
        name: 'Domain Briefs to PRDs',
        detail: 'Distilling multi-source documents into structured product specs for new app builds.',
      },
    ],
    image: ASSETS.notebookLmSynthesis,
    imageAlt: 'Christopher R McGuire reviewing Google NotebookLM connected sources and AI research summaries in studio',
    primaryUrl: 'https://notebooklm.google.com/',
    primaryLabel: 'Explore NotebookLM',
    secondaryUrl: 'https://www.youtube.com/@ThriveFinancialLLC',
    secondaryLabel: 'Watch Thrive Explainers',
  },
  {
    id: 'coding',
    index: '05',
    label: 'Vibe Coding',
    icon: 'cpu',
    modelLine: 'Claude Code · OpenAI Codex · Google AI Studio · Gemini · ChatGPT · Cline · Lovable',
    title: 'Full-Stack, Mobile, Browser & WebXR Engineering with AI',
    summary:
      'Applying frontier reasoning models and agentic coding workflows to take complex concepts from initial prompt to App Store, Chrome Web Store, and cloud production—accelerating engineering velocity across personal products and enterprise SDLC.',
    bullets: [
      'Shipped native iOS apps (Modus AI), FinTech SaaS platforms (Thrive Financial), Chrome extensions (SnapClipper), and WebXR VR games (Tron Engaged).',
      'Built developer and productivity tools including MarkFlow Markdown editor, Email to PDF Converter, and Microsoft License Selector.',
      'Established AI coding standards and prompt engineering workflows driving +30% faster enterprise feature delivery.',
    ],
    examples: [
      {
        name: 'Consumer & Enterprise App Shipping',
        detail: 'Thrive Financial, Modus AI (iOS), SnapClipper, MarkFlow, and Email to PDF Converter.',
      },
      {
        name: '3D & Spatial WebXR Gaming',
        detail: 'Tron Engaged desktop and VR headset arena built with real-time 3D shaders and collision physics.',
      },
      {
        name: 'Enterprise AI Architecture & Governance',
        detail: 'WiseOS advisor transcript agents, internal impact matrices, and AI SDLC acceleration.',
      },
    ],
    image: ASSETS.exploringAi,
    imageAlt: 'Christopher R McGuire building AI-assisted software systems in his studio',
    anchorHref: '#vibe-coding-apps',
    anchorLabel: 'Browse Shipped Applications',
    secondaryUrl: 'https://www.reddit.com/r/buildinpublic/comments/1qfhfqh/how_i_built_and_shipped_an_ios_app_using/',
    secondaryLabel: 'Read iOS Vibe Coding Guide',
  },
];

const VIBE_DEV_PLATFORMS = [
  'Claude Code',
  'OpenAI Codex',
  'Google AI Studio',
  'Gemini',
  'ChatGPT',
  'Cline',
  'Lovable',
  'Websim',
  'Manus.ai',
];

export const AI_EXPLORATIONS_SEO: SeoConfig = {
  path: '/ai-explorations',
  title: 'AI Explorations & R&D Lab | Christopher R McGuire — Paguire',
  description:
    'Hands-on generative AI work with ElevenLabs, GPT Image, Google Veo and NotebookLM, plus shipped AI apps like Thrive Financial, Modus AI and Tron Engaged.',
  keywords:
    'AI Explorations, Vibe Coding, ElevenLabs Voice Clone, Google Veo, NotebookLM, GPT Image, Nano Banana, Claude Code, Codex, Christopher R McGuire',
  ogImage: ogImage('ai-explorations'),
  jsonLd: [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'AI Explorations', path: '/ai-explorations' },
    ]),
  ],
};

export function renderAiExplorationsPage(): string {
  const current = WORKBENCH_PILLARS[0];
  const activeReel = AI_VIDEO_REELS[0];
  const featuredVibeApp = VIBE_CODED_APPS[0];
  const secondaryVibeApps = VIBE_CODED_APPS.slice(1);
  const additionalPrototypes = AI_EXPLORATION_APPS.filter(
    (app) => app.title !== 'Email to PDF Converter' && app.title !== 'SnapClipper Chrome Extension'
  );

  const tabItemsHtml = WORKBENCH_PILLARS.map((m, idx) => {
    const active = idx === 0;
    return `<button
      type="button"
      data-ai-tab="${esc(m.id)}"
      aria-pressed="${active ? 'true' : 'false'}"
      class="relative px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
        active ? 'bg-[#00A6FF] text-[#030508] font-semibold' : 'text-slate-300 hover:text-white'
      }"
    >${esc(m.label)}</button>`;
  }).join('\n');

  const quickSwitchCardsHtml = WORKBENCH_PILLARS.map((pillar, idx) => {
    const selected = idx === 0;
    return `<button
      type="button"
      data-ai-quick="${esc(pillar.id)}"
      class="text-left p-3.5 rounded-xl border transition-colors cursor-pointer ${
        selected
          ? 'bg-[#0C1526] border-[#00A6FF]/60'
          : 'bg-[#050810] border-white/[0.06] hover:border-white/20'
      }"
    >
      <div class="text-[11px] font-medium text-[#38BDF8] mb-0.5">${esc(pillar.index)}. ${esc(pillar.label)}</div>
      <div class="text-xs text-slate-300 line-clamp-2">${esc(pillar.examples.map((e) => e.name).join(' · '))}</div>
    </button>`;
  }).join('\n');

  const channelFiltersHtml = [
    { id: 'all', label: 'All Productions' },
    { id: 'thrive', label: 'Thrive Financial' },
    { id: 'personal', label: 'Personal & Hobby' },
  ]
    .map((item, idx) => {
      const active = idx === 0;
      return `<button
        type="button"
        data-video-channel="${esc(item.id)}"
        aria-pressed="${active ? 'true' : 'false'}"
        class="relative px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
          active ? 'bg-[#00A6FF] text-[#030508] font-semibold' : 'text-slate-300 hover:text-white'
        }"
      >${esc(item.label)}</button>`;
    })
    .join('\n');

  const videoQueueHtml = AI_VIDEO_REELS.map((reel, idx) => {
    const isSelected = idx === 0;
    return `<button
      type="button"
      data-video-id="${esc(reel.id)}"
      data-video-channel-key="${esc(reel.channelKey)}"
      class="w-full text-left p-4 rounded-xl border transition-colors cursor-pointer ${
        isSelected
          ? 'bg-[#0C1526] border-[#00A6FF]/60'
          : 'bg-[#050810] border-white/[0.07] hover:border-white/20'
      }"
    >
      <div class="flex items-start justify-between gap-3">
        <div class="space-y-1 min-w-0">
          <p class="text-[11px] font-medium text-[#38BDF8] truncate">
            ${reel.channelKey === 'thrive' ? 'Thrive Financial' : '@crmcguire1974'}
            <span class="text-slate-500 mx-1.5" aria-hidden="true">·</span>
            <span class="text-slate-400 font-normal">${esc(reel.modelLine)}</span>
          </p>
          <h4 class="text-sm font-semibold text-white leading-snug">${esc(reel.title)}</h4>
        </div>
        <span data-video-play-badge class="mt-1 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
          isSelected ? 'bg-[#00A6FF] text-[#030508]' : 'bg-white/[0.06] text-slate-300'
        }">
          ${icon('play', 'w-3.5 h-3.5')}
        </span>
      </div>
    </button>`;
  }).join('\n');

  const secondaryVibeAppsHtml = secondaryVibeApps
    .map(
      (app, idx) => `<div data-reveal style="transition-delay: ${idx * 50}ms" class="h-full">
        <div data-magnetic class="relative flex flex-col overflow-hidden rounded-2xl bg-[#090E18] blueprint-hairline transition-colors duration-200 hover:border-[#00A6FF]/45 h-full group">
          <div data-magnetic-glow aria-hidden="true" class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200"></div>
          <div class="relative z-10 flex-1 w-full h-full flex flex-col justify-between">
            <div>
              <div class="aspect-video w-full overflow-hidden bg-[#050810] border-b border-white/[0.06]">
                <img src="${esc(app.image)}" alt="${esc(app.title)}" referrerpolicy="no-referrer" class="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
              <div class="p-6 pb-3 space-y-2">
                <p class="text-xs font-medium text-[#38BDF8]">${esc(app.platform)}</p>
                <h3 class="text-xl font-semibold text-white">${esc(app.title)}</h3>
                <p class="text-sm text-slate-300 leading-relaxed">${esc(app.description)}</p>
                <p class="text-xs text-slate-400 pt-1">${esc(app.highlights)}</p>
              </div>
            </div>
            <div class="mt-auto px-6 pb-6 pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
              ${
                app.internalRoute
                  ? `<a href="${esc(app.internalRoute)}" class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00A6FF] hover:text-[#38BDF8] transition-colors whitespace-nowrap shrink-0">
                      <span>${esc(app.ctaLabel)}</span>
                      ${icon('arrowRight', 'w-3.5 h-3.5')}
                    </a>`
                  : `<a href="${esc(app.externalUrl)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00A6FF] hover:text-[#38BDF8] transition-colors whitespace-nowrap shrink-0">
                      <span>${esc(app.ctaLabel)}</span>
                      ${icon('arrowUpRight', 'w-3.5 h-3.5')}
                    </a>`
              }
              ${
                app.internalRoute
                  ? `<a href="${esc(app.externalUrl)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-xs font-medium text-slate-300 hover:text-white transition-colors whitespace-nowrap shrink-0">
                      <span>Live Product</span>
                      ${icon('arrowUpRight', 'w-3.5 h-3.5')}
                    </a>`
                  : ''
              }
            </div>
          </div>
        </div>
      </div>`
    )
    .join('\n');

  const additionalPrototypesHtml = additionalPrototypes
    .map(
      (item, idx) => `<div data-reveal style="transition-delay: ${idx * 50}ms" class="h-full">
        <div data-magnetic class="relative flex flex-col overflow-hidden rounded-2xl bg-[#090E18] blueprint-hairline transition-colors duration-200 hover:border-[#00A6FF]/45 h-full group">
          <div data-magnetic-glow aria-hidden="true" class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200"></div>
          <div class="relative z-10 flex-1 w-full h-full flex flex-col justify-between">
            <div>
              <div class="aspect-video w-full overflow-hidden bg-[#050810] border-b border-white/[0.06]">
                <img src="${esc(item.image)}" alt="${esc(item.title)}" referrerpolicy="no-referrer" class="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]" />
              </div>
              <div class="p-5 pb-2 space-y-1.5">
                <p class="text-xs font-medium text-[#38BDF8]">${esc(item.tag)}</p>
                <h3 class="text-base font-semibold text-white">${esc(item.title)}</h3>
                <p class="text-xs text-slate-400 leading-relaxed">${esc(item.description)}</p>
              </div>
            </div>
            <div class="mt-auto px-5 pb-5 pt-3 border-t border-white/[0.06]">
              ${
                item.url
                  ? `<a href="${esc(item.url)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00A6FF] hover:text-[#38BDF8] transition-colors whitespace-nowrap">
                      <span>Open App</span>
                      ${icon('arrowUpRight', 'w-3.5 h-3.5')}
                    </a>`
                  : '<span class="text-xs text-slate-400">Studio Multimodal Research</span>'
              }
            </div>
          </div>
        </div>
      </div>`
    )
    .join('\n');

  return `<div class="overflow-x-clip">
    <!-- Layered AI Labs Hero -->
    <section class="relative overflow-hidden bg-[#030712] border-b border-white/[0.08] lg:min-h-[490px] xl:min-h-[545px] lg:flex lg:items-center">
      <div class="lg:hidden relative h-[320px] sm:h-[380px] md:h-[420px] overflow-hidden bg-[#030816]">
        <div data-parallax="ai-labs-mobile-bg" aria-hidden="true" class="pointer-events-none absolute -top-24 inset-x-0 bottom-0 origin-center will-change-transform">
          <img src="${esc(ASSETS.aiLabsBg)}" alt="" referrerpolicy="no-referrer" class="w-full h-full object-cover object-[70%_center]" />
        </div>
        <div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030712]/70 via-transparent to-[#030712]/20"></div>
        <div data-parallax="ai-labs-mobile-portrait" class="relative z-10 h-full w-full flex items-end justify-end pointer-events-none origin-bottom-right will-change-transform">
          <img src="${esc(ASSETS.aiLabsPortrait)}" alt="Christopher R McGuire — AI Labs &amp; R&amp;D Executive" referrerpolicy="no-referrer" class="h-[132%] sm:h-[126%] w-auto max-w-none object-contain object-bottom translate-y-[21%] sm:translate-y-[18%] translate-x-[10%] sm:translate-x-[7%] drop-shadow-[0_18px_42px_rgba(0,0,0,0.72)]" />
        </div>
      </div>

      <div aria-hidden="true" class="hidden lg:block pointer-events-none absolute inset-0 overflow-hidden">
        <div data-parallax="ai-labs-desktop-bg" class="absolute -top-28 inset-x-0 bottom-0 origin-center will-change-transform">
          <img src="${esc(ASSETS.aiLabsBg)}" alt="" referrerpolicy="no-referrer" class="w-full h-full object-cover object-[76%_center]" />
        </div>
        <div class="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#030712]/78 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#030712]/88 via-transparent to-[#030712]/38"></div>
        <div data-parallax="ai-labs-desktop-portrait" class="relative z-10 max-w-7xl mx-auto h-full flex items-end justify-end px-4 xl:px-8 origin-bottom-right will-change-transform">
          <img src="${esc(ASSETS.aiLabsPortrait)}" alt="Christopher R McGuire — AI Explorations &amp; R&amp;D Lab" referrerpolicy="no-referrer" class="h-[120%] xl:h-[128%] w-auto max-w-none object-contain object-bottom translate-y-[17%] xl:translate-y-[17%] translate-x-14 xl:translate-x-14 drop-shadow-[0_22px_48px_rgba(0,0,0,0.78)]" />
        </div>
      </div>

      <div class="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 pt-6 pb-11 lg:py-20 xl:py-24">
        <div data-parallax="ai-labs-copy" class="max-w-md lg:max-w-lg xl:max-w-xl space-y-3.5 sm:space-y-4 will-change-transform hero-enter">
          <p class="text-sm font-medium text-[#38BDF8]">AI Explorations · R&amp;D Lab</p>
          <h1 class="text-[30px] sm:text-4xl lg:text-[44px] xl:text-5xl font-semibold tracking-tight text-white leading-[1.08]">
            Generative AI for Code, Voice, Image &amp; Video
          </h1>
          <p class="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-md xl:max-w-lg">
            Hands-on experimentation across multimodal LLMs, voice cloning, spatial reasoning, and
            AI-augmented software engineering workflows.
          </p>
        </div>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-5 sm:px-8 py-14 lg:py-20 space-y-20 lg:space-y-24">
      <!-- 1. Core AI Exploration Workbench -->
      <section data-reveal aria-labelledby="ai-workbench-heading" class="p-6 sm:p-10 rounded-2xl bg-[#090E18] blueprint-hairline">
        <div class="flex flex-col xl:flex-row xl:items-center justify-between gap-5 pb-6 mb-8 border-b border-white/[0.08]">
          <div class="space-y-1 max-w-md">
            <div class="flex items-center gap-2.5">
              <span id="ai-workbench-icon">${icon(current.icon, 'w-5 h-5 text-[#00A6FF]')}</span>
              <h2 id="ai-workbench-heading" class="text-lg sm:text-xl font-semibold text-white">
                Core AI Areas Explored &amp; Applied
              </h2>
            </div>
            <p class="text-xs sm:text-sm text-slate-400">
              Inspect each modality to see models used, workflows tested, and real shipped examples.
            </p>
          </div>

          <div role="group" aria-label="Select AI modality to explore" class="flex flex-wrap gap-1.5 p-1 rounded-xl bg-[#090E18] border border-white/[0.08]">
            ${tabItemsHtml}
          </div>
        </div>

        <div id="ai-workbench-panel" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div class="lg:col-span-7 space-y-5">
            <div>
              <p class="text-xs font-medium text-[#38BDF8] mb-2">
                <span id="ai-wb-kicker">${esc(current.index)}. ${esc(current.label)}</span>
                <span class="text-slate-500 mx-1.5" aria-hidden="true">·</span>
                <span id="ai-wb-modelline" class="text-slate-300 font-normal">${esc(current.modelLine)}</span>
              </p>
              <h3 id="ai-wb-title" class="text-2xl sm:text-3xl font-semibold text-white leading-tight">${esc(current.title)}</h3>
            </div>

            <p id="ai-wb-summary" class="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">${esc(current.summary)}</p>

            <ul id="ai-wb-bullets" class="space-y-2 text-sm text-slate-300">
              ${current.bullets
                .map(
                  (bullet) => `<li class="flex items-start gap-2.5">
                    <span class="text-[#00A6FF] font-bold shrink-0" aria-hidden="true">·</span>
                    <span>${esc(bullet)}</span>
                  </li>`
                )
                .join('\n')}
            </ul>

            <div class="pt-2">
              <p class="text-xs font-medium text-slate-400 mb-3">Representative Examples &amp; Applied Work</p>
              <div id="ai-wb-examples" class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                ${current.examples
                  .map(
                    (ex) => `<div class="p-3.5 rounded-xl bg-[#050810] border border-white/[0.07]">
                      <div class="text-xs font-semibold text-white mb-1">${esc(ex.name)}</div>
                      <p class="text-[11px] text-slate-400 leading-relaxed">${esc(ex.detail)}</p>
                    </div>`
                  )
                  .join('\n')}
              </div>
            </div>

            <div id="ai-wb-actions" class="flex flex-wrap gap-3 pt-2">
              ${
                current.primaryUrl
                  ? `<a href="${esc(current.primaryUrl)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#00A6FF] hover:bg-[#38BDF8] text-[#030508] text-sm font-semibold transition-colors whitespace-nowrap shrink-0">
                      <span>${esc(current.primaryLabel || '')}</span>
                      ${icon('arrowUpRight', 'w-4 h-4')}
                    </a>`
                  : ''
              }
              ${
                current.secondaryUrl
                  ? `<a href="${esc(current.secondaryUrl)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-white/15 hover:border-[#00A6FF]/50 text-white text-sm font-medium transition-colors whitespace-nowrap shrink-0">
                      <span>${esc(current.secondaryLabel || '')}</span>
                      ${icon('arrowUpRight', 'w-4 h-4')}
                    </a>`
                  : ''
              }
            </div>
          </div>

          <div class="lg:col-span-5 space-y-4">
            <div class="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-[#050810]">
              <img id="ai-wb-image" src="${esc(current.image)}" alt="${esc(current.imageAlt)}" referrerpolicy="no-referrer" class="w-full h-full object-cover object-center" />
              <div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050810]/60 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>

        <div class="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          ${quickSwitchCardsHtml}
        </div>
      </section>

      <!-- 2. Live Video & NotebookLM Production Theater -->
      <section data-reveal aria-labelledby="video-theater-heading" class="p-6 sm:p-10 rounded-2xl bg-[#090E18] blueprint-hairline">
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 mb-8 border-b border-white/[0.08]">
          <div class="max-w-2xl space-y-2">
            <p class="text-sm font-medium text-[#38BDF8]">Google Omni, Veo &amp; NotebookLM in Production</p>
            <h2 id="video-theater-heading" class="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              Marketing Campaigns &amp; Creative Storytelling
            </h2>
            <p class="text-sm text-slate-300 leading-relaxed">
              Select any production below to watch live YouTube deliverables from Thrive Financial
              and personal creative projects crafted with Veo, Google Omni, and NotebookLM.
            </p>
          </div>

          <div role="group" aria-label="Filter YouTube AI video productions" class="flex flex-wrap gap-1.5 p-1 rounded-xl bg-[#090E18] border border-white/[0.08]">
            ${channelFiltersHtml}
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div class="lg:col-span-7 space-y-4">
            <div class="rounded-xl overflow-hidden border border-white/10 bg-[#030508]">
              <div class="aspect-video w-full">
                <iframe
                  id="ai-video-iframe"
                  src="https://www.youtube.com/embed/${esc(activeReel.id)}?rel=0&amp;modestbranding=1"
                  title="${esc(activeReel.title)}"
                  class="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
              <div>
                <p id="ai-video-focus" class="text-xs font-medium text-[#38BDF8] mb-1">${esc(activeReel.focus)}</p>
                <h3 id="ai-video-title" class="text-lg font-semibold text-white">${esc(activeReel.title)}</h3>
                <p id="ai-video-meta" class="text-xs text-slate-400 mt-0.5">
                  ${esc(activeReel.channelName)} · ${esc(activeReel.modelLine)}
                </p>
              </div>
              <a
                id="ai-video-watch-link"
                href="https://www.youtube.com/watch?v=${esc(activeReel.id)}"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-white/15 hover:border-[#00A6FF]/50 text-xs font-semibold text-white whitespace-nowrap shrink-0 transition-colors"
              >
                <span>Watch on YouTube</span>
                ${icon('arrowUpRight', 'w-3.5 h-3.5')}
              </a>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a href="https://www.youtube.com/@ThriveFinancialLLC" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-[#050810] border border-white/[0.08] hover:border-[#00A6FF]/50 transition-colors">
                <div class="flex items-center gap-2.5 min-w-0">
                  ${icon('youtube', 'w-4 h-4 text-[#00A6FF] shrink-0')}
                  <div class="min-w-0">
                    <div class="text-xs font-semibold text-white truncate">Thrive Financial Channel</div>
                    <div class="text-[11px] text-slate-400 truncate">@ThriveFinancialLLC</div>
                  </div>
                </div>
                ${icon('arrowUpRight', 'w-4 h-4 text-slate-400 shrink-0')}
              </a>

              <a href="https://www.youtube.com/@crmcguire1974" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-[#050810] border border-white/[0.08] hover:border-[#00A6FF]/50 transition-colors">
                <div class="flex items-center gap-2.5 min-w-0">
                  ${icon('youtube', 'w-4 h-4 text-[#00A6FF] shrink-0')}
                  <div class="min-w-0">
                    <div class="text-xs font-semibold text-white truncate">Christopher R McGuire</div>
                    <div class="text-[11px] text-slate-400 truncate">@crmcguire1974</div>
                  </div>
                </div>
                ${icon('arrowUpRight', 'w-4 h-4 text-slate-400 shrink-0')}
              </a>
            </div>
          </div>

          <div id="ai-video-queue" class="lg:col-span-5 space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
            ${videoQueueHtml}
          </div>
        </div>
      </section>

      <!-- 3. Vibe Coding Applications -->
      <section id="vibe-coding-apps" aria-labelledby="vibe-coding-heading">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div class="max-w-2xl">
            <p class="text-sm font-medium text-[#38BDF8] mb-2">Vibe Coding · From Prompt to Production</p>
            <h2 id="vibe-coding-heading" class="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              Shipped Mobile, SaaS, Browser &amp; WebXR Applications
            </h2>
          </div>
          <p class="text-xs sm:text-sm text-slate-400 max-w-md">
            Built end-to-end with <span class="text-slate-200 font-medium">${esc(VIBE_DEV_PLATFORMS.slice(0, 6).join(' · '))}</span>.
          </p>
        </div>

        <div data-reveal data-magnetic class="relative flex flex-col overflow-hidden rounded-2xl bg-[#090E18] blueprint-hairline transition-colors duration-200 hover:border-[#00A6FF]/45 mb-6 group">
          <div data-magnetic-glow aria-hidden="true" class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200"></div>
          <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div class="lg:col-span-6 aspect-[16/10] lg:aspect-auto overflow-hidden bg-[#050810] border-b lg:border-b-0 lg:border-r border-white/[0.06]">
              <img src="${esc(featuredVibeApp.image)}" alt="${esc(featuredVibeApp.title)}" referrerpolicy="no-referrer" class="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]" />
            </div>
            <div class="lg:col-span-6 p-7 sm:p-9 flex flex-col justify-between">
              <div class="space-y-3">
                <p class="text-xs font-medium text-[#38BDF8]">${esc(featuredVibeApp.platform)}</p>
                <h3 class="text-2xl sm:text-3xl font-semibold text-white">${esc(featuredVibeApp.title)}</h3>
                <p class="text-sm sm:text-base text-slate-300 leading-relaxed">${esc(featuredVibeApp.description)}</p>
                <p class="text-xs text-slate-400 pt-1">${esc(featuredVibeApp.highlights)}</p>
              </div>
              <div class="flex flex-wrap items-center gap-4 pt-6 mt-6 border-t border-white/[0.06]">
                <a href="${esc(featuredVibeApp.externalUrl)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#00A6FF] hover:bg-[#38BDF8] text-[#030508] text-xs font-semibold transition-colors whitespace-nowrap shrink-0">
                  <span>${esc(featuredVibeApp.ctaLabel)}</span>
                  ${icon('arrowUpRight', 'w-4 h-4')}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          ${secondaryVibeAppsHtml}
        </div>
      </section>

      <!-- 4. Open Experiments & Workflow Utilities -->
      <section aria-labelledby="rd-utilities-heading" class="space-y-8">
        <div class="max-w-2xl">
          <p class="text-sm font-medium text-[#38BDF8] mb-2">Open Experiments &amp; Workflow Utilities</p>
          <h2 id="rd-utilities-heading" class="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Productivity Utilities, Playbooks &amp; Internal Tooling
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          ${additionalPrototypesHtml}
        </div>

        <div data-reveal class="p-6 sm:p-8 rounded-2xl bg-[#090E18] blueprint-hairline grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div class="lg:col-span-8 space-y-2">
            <div class="flex items-center gap-2 text-xs font-medium text-[#38BDF8]">
              ${icon('lock', 'w-3.5 h-3.5')}
              <span>Private Enterprise &amp; Advisory Engineering</span>
            </div>
            <h3 class="text-lg sm:text-xl font-semibold text-white">
              Internal Productivity, Legal Aid &amp; Architecture Analysis Systems
            </h3>
            <p class="text-sm text-slate-300 leading-relaxed">
              Beyond public launches, I build private AI-driven enterprise tooling—automating
              system impact matrices, architectural diagramming, documentation pipelines, and
              structured legal research workflows across <span class="text-white font-medium">${esc(VIBE_DEV_PLATFORMS.join(', '))}</span>.
            </p>
          </div>
          <div class="lg:col-span-4 flex lg:justify-end">
            <div class="inline-flex items-center gap-2.5 text-xs text-slate-400">
              ${icon('code2', 'w-4 h-4 text-[#00A6FF] shrink-0')}
              <span>Due to internal confidentiality, proprietary enterprise tools are private.</span>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <div data-reveal class="p-8 rounded-2xl bg-[#090E18] blueprint-hairline flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h2 class="text-xl font-semibold text-white mb-1">Have Questions About Applied AI?</h2>
          <p class="text-sm text-slate-400">
            Let's discuss AI SDLC transformation, custom multimodal workflows, or product strategy.
          </p>
        </div>
        <a href="/contact" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#00A6FF] hover:bg-[#38BDF8] text-[#030508] text-xs font-semibold transition-colors shrink-0 whitespace-nowrap">
          <span>Get in Touch</span>
          ${icon('arrowRight', 'w-4 h-4')}
        </a>
      </div>
    </div>
  </div>`;
}
