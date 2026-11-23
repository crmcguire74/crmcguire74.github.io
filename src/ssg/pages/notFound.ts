import { icon, type IconName } from '../icons';
import { esc, type SeoConfig } from '../seo';

const DESTINATIONS: {
  label: string;
  description: string;
  route: string;
  icon: IconName;
}[] = [
  {
    label: 'Home',
    description: 'Executive overview, metrics & flagship shipped products.',
    route: '/',
    icon: 'home',
  },
  {
    label: 'Biography',
    description: '20+ years from Purdue Engineering to Citadel & Savant.',
    route: '/biography',
    icon: 'userCheck',
  },
  {
    label: 'Resume',
    description: 'Interactive timeline, competencies & PDF downloads.',
    route: '/resume',
    icon: 'fileText',
  },
  {
    label: 'Projects',
    description: 'Thrive Financial, Modus AI, Wil’s Martini Lounge & Tron Engaged.',
    route: '/projects',
    icon: 'briefcaseBusiness',
  },
  {
    label: 'AI Labs',
    description: 'Applied LLMs, ElevenLabs voice synthesis & prototyping.',
    route: '/ai-explorations',
    icon: 'cpu',
  },
  {
    label: 'Library',
    description: 'Published Amazon books, playbooks & leadership essays.',
    route: '/blog',
    icon: 'bookOpen',
  },
];

export const NOT_FOUND_SEO: SeoConfig = {
  path: '/404.html',
  title: 'Page Not Found (404) | Christopher R McGuire — Paguire',
  description:
    'The requested page could not be found. Navigate to Christopher R McGuire’s biography, resume, projects, AI labs, or library.',
  robots: 'noindex, follow',
};

export function renderNotFoundPage(): string {
  const destinationsHtml = DESTINATIONS.map(
    (item, idx) => `<div data-reveal style="transition-delay: ${(idx % 3) * 75}ms" class="h-full">
      <a href="${esc(item.route)}" data-magnetic class="relative flex flex-col overflow-hidden rounded-2xl bg-[#090E18] blueprint-hairline transition-colors duration-200 hover:border-[#00A6FF]/45 p-5 h-full cursor-pointer group">
        <div data-magnetic-glow aria-hidden="true" class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200"></div>
        <div class="relative z-10 flex items-start justify-between gap-4 h-full">
          <div class="flex items-start gap-3.5">
            <div class="p-2.5 rounded-xl bg-[#050A14] border border-white/[0.08] text-[#00A6FF] group-hover:border-[#00A6FF]/45 transition-colors shrink-0">
              ${icon(item.icon, 'w-4 h-4')}
            </div>
            <div>
              <h2 class="text-base font-semibold text-white group-hover:text-[#38BDF8] transition-colors">${esc(item.label)}</h2>
              <p class="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">${esc(item.description)}</p>
            </div>
          </div>
          ${icon('arrowRight', 'w-4 h-4 text-slate-500 group-hover:text-[#38BDF8] group-hover:translate-x-0.5 transition-all shrink-0 mt-1')}
        </div>
      </a>
    </div>`
  ).join('\n');

  return `<div class="overflow-x-clip bg-[#030508]">
    <section id="not-found-section" aria-labelledby="not-found-heading" class="relative overflow-hidden border-b border-white/[0.08] min-h-[68vh] sm:min-h-[72vh] flex items-center py-20 lg:py-28">
      <div data-parallax="notfound-grid" aria-hidden="true" class="pointer-events-none absolute -top-24 inset-x-0 bottom-0 architectural-grid opacity-45 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_38%,black,transparent)] will-change-transform"></div>
      <div aria-hidden="true" class="pointer-events-none absolute left-1/2 -top-28 -translate-x-1/2 w-[720px] h-[360px] rounded-full bg-[#00A6FF] opacity-[0.12] blur-3xl"></div>

      <div class="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8">
        <div data-parallax="notfound-copy" class="max-w-2xl hero-enter will-change-transform">
          <div class="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#090E18] border border-[#38BDF8]/25 text-xs font-mono-tabular text-[#38BDF8] mb-5">
            ${icon('compass', 'w-3.5 h-3.5 text-[#00A6FF]')}
            <span>ERROR 404 · COORDINATE UNMAPPED</span>
          </div>

          <div class="font-mono-tabular text-7xl sm:text-8xl lg:text-[116px] font-semibold tracking-tighter leading-none bg-gradient-to-b from-white via-[#BAE6FD] to-[#00A6FF]/35 bg-clip-text text-transparent mb-4 select-none" aria-hidden="true">
            404
          </div>

          <h1 id="not-found-heading" class="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.1] mb-4">
            This Coordinate Isn&apos;t on the Blueprint
          </h1>

          <p class="text-base sm:text-lg text-slate-300 leading-relaxed mb-3">
            The page you requested could not be located or may have moved to a new route.
          </p>

          <p class="text-xs sm:text-sm font-mono-tabular text-slate-400 mb-8">
            Requested path:
            <span id="not-found-path" class="text-[#38BDF8] bg-[#090E18] border border-white/10 px-2 py-0.5 rounded">/404</span>
          </p>

          <div class="flex flex-wrap items-center gap-3.5">
            <a href="/" class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#00A6FF] hover:bg-[#38BDF8] text-[#030508] text-sm font-semibold transition-all duration-150 shadow-[0_0_24px_rgba(0,166,255,0.3)] hover:shadow-[0_0_32px_rgba(0,166,255,0.5)]">
              ${icon('home', 'w-4 h-4')}
              <span>Return Home</span>
            </a>

            <button
              type="button"
              id="not-found-back-btn"
              class="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/15 bg-[#090E18] hover:border-[#00A6FF]/50 text-white text-sm font-medium transition-colors cursor-pointer"
            >
              ${icon('arrowLeft', 'w-4 h-4 text-[#38BDF8]')}
              <span>Go Back</span>
            </button>

            <a href="/contact" class="inline-flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-[#38BDF8] hover:text-white transition-colors">
              ${icon('mail', 'w-4 h-4')}
              <span>Let&apos;s Connect</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section aria-label="Key Destinations" class="max-w-7xl mx-auto px-5 sm:px-8 py-14 lg:py-20">
      <div data-reveal class="mb-8">
        <p class="text-xs font-semibold tracking-[0.14em] uppercase text-slate-400">Explore Key Destinations</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        ${destinationsHtml}
      </div>
    </section>
  </div>`;
}
