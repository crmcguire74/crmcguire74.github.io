import { ASSETS, PROFILE } from '../data/siteData';
import { renderGtmBody, renderGtmHead } from './analytics';
import { icon } from './icons';
import { esc, renderSeoHeadTags, type SeoConfig } from './seo';

export interface PageLayoutOptions {
  pageId: string;
  currentRoute: string;
  seo: SeoConfig;
  mainHtml: string;
}

const NAV_LINKS = [
  { label: 'Home', href: '/', matchPrefix: '' },
  { label: 'Biography', href: '/biography', matchPrefix: '' },
  { label: 'Resume', href: '/resume', matchPrefix: '' },
  { label: 'Projects', href: '/projects', matchPrefix: '/projects' },
  { label: 'AI Labs', href: '/ai-explorations', matchPrefix: '' },
  { label: 'Library', href: '/blog', matchPrefix: '/blog' },
];

const EXPLORE_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Biography', href: '/biography' },
  { label: 'Resume', href: '/resume' },
  { label: 'Projects', href: '/projects' },
  { label: 'AI Explorations', href: '/ai-explorations' },
  { label: 'Library', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const FLAGSHIP_LINKS: { label: string; href: string; external?: boolean }[] = [
  { label: 'Thrive Financial', href: 'https://thrivefinancial.app', external: true },
  { label: 'Modus AI', href: '/projects/modus-ai' },
  { label: 'Wils Martini Lounge', href: 'https://wilsmartinilounge.com', external: true },
  { label: 'SnapClipper', href: '/projects/snapclipper' },
  { label: '1-Hour Blueprint', href: '/projects/blueprint' },
  { label: 'Executive Essays', href: '/blog' },
];

function isLinkActive(currentRoute: string, link: (typeof NAV_LINKS)[number]): boolean {
  if (link.href === '/') return currentRoute === '/';
  if (link.matchPrefix) return currentRoute.startsWith(link.matchPrefix);
  return currentRoute === link.href;
}

export function renderPageDocument(opts: PageLayoutOptions): string {
  const desktopLinks = NAV_LINKS.map((link) => {
    const active = isLinkActive(opts.currentRoute, link);
    return `<a href="${esc(link.href)}"${active ? ' aria-current="page"' : ''} class="relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6FF] rounded ${
      active ? 'text-[#38BDF8]' : 'text-slate-300 hover:text-white'
    }">
      <span>${esc(link.label)}</span>
      ${
        active
          ? '<span aria-hidden="true" class="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-[#00A6FF] rounded-full shadow-[0_0_10px_#00A6FF]"></span>'
          : ''
      }
    </a>`;
  }).join('\n');

  const mobileLinks = NAV_LINKS.map((link) => {
    const active = isLinkActive(opts.currentRoute, link);
    return `<a href="${esc(link.href)}"${active ? ' aria-current="page"' : ''} class="block w-full text-left px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
      active
        ? 'bg-[#00A6FF]/12 text-[#38BDF8]'
        : 'text-slate-300 hover:bg-white/[0.04] hover:text-white'
    }">${esc(link.label)}</a>`;
  }).join('\n');

  const featuredFooterLinks = FLAGSHIP_LINKS.map((item) => {
    if (item.external) {
      return `<li>
        <a href="${esc(item.href)}" target="_blank" rel="noopener noreferrer" class="group inline-flex items-center gap-1.5 text-slate-300 hover:text-[#38BDF8] transition-colors">
          <span>${esc(item.label)}</span>
          ${icon('arrowUpRight', 'w-3.5 h-3.5 text-slate-500 group-hover:text-[#38BDF8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150')}
        </a>
      </li>`;
    }
    return `<li>
      <a href="${esc(item.href)}" class="group inline-flex items-center gap-1.5 text-slate-400 hover:text-[#38BDF8] transition-colors">
        <span>${esc(item.label)}</span>
        ${icon('arrowRight', 'w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150')}
      </a>
    </li>`;
  }).join('\n');

  const navFooterLinks = EXPLORE_LINKS.map(
    (item) => `<li>
      <a href="${esc(item.href)}" class="group inline-flex items-center gap-1.5 text-slate-400 hover:text-[#38BDF8] transition-colors">
        <span>${esc(item.label)}</span>
        ${icon('arrowRight', 'w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150')}
      </a>
    </li>`
  ).join('\n');

  const socialFooterLinks = PROFILE.socials
    .map((s, idx) => {
      const spanClass =
        idx === PROFILE.socials.length - 1 && PROFILE.socials.length % 2 === 1
          ? ' col-span-2 sm:col-span-1 lg:col-span-2'
          : '';
      return `<a href="${esc(s.href)}" target="_blank" rel="noopener noreferrer" class="group inline-flex items-center justify-between min-h-[42px] lg:min-h-[34px] px-3 py-2 lg:py-1.5 rounded-lg bg-[#070B14] border border-white/[0.07] hover:border-[#00A6FF]/45 text-slate-300 hover:text-[#38BDF8] transition-colors${spanClass}">
        <span>${esc(s.label)}</span>
        ${icon('arrowUpRight', 'w-3.5 h-3.5 text-slate-500 group-hover:text-[#38BDF8] transition-colors')}
      </a>`;
    })
    .join('\n');

  const year = new Date().getFullYear();

  return `<!doctype html>
<html lang="en" dir="ltr" class="dark">
  <head>
${renderGtmHead()}
${renderSeoHeadTags(opts.seo)}
  </head>
  <body data-page="${esc(opts.pageId)}" class="bg-[#030508] text-[#F1F5F9] antialiased selection:bg-[#00A6FF]/30 selection:text-white">
${renderGtmBody()}
    <div class="min-h-screen flex flex-col bg-[#030508] text-[#F1F5F9]">
      <header class="sticky top-0 z-50 bg-[#030508]/88 backdrop-blur-xl border-b border-[#38BDF8]/15">
        <div class="max-w-7xl mx-auto px-5 sm:px-8 h-16 md:h-[72px] flex items-center justify-between gap-8">
          <a href="/" aria-label="Christopher R McGuire Home" class="group flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6FF] rounded-lg p-1">
            <img
              src="${esc(ASSETS.logo)}"
              alt="CRM — Christopher R McGuire"
              referrerpolicy="no-referrer"
              class="h-9 sm:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.04] [filter:drop-shadow(0_0_1px_rgba(241,245,249,0.9))_drop-shadow(0_0_10px_rgba(0,166,255,0.4))]"
            />
            <span class="md:hidden ml-2.5 pl-2.5 border-l border-white/25 text-[10px] font-semibold tracking-[0.14em] uppercase text-slate-100 whitespace-nowrap">
              Christopher R McGuire
            </span>
          </a>

          <nav aria-label="Primary Navigation" class="hidden md:flex items-center gap-7">
            ${desktopLinks}
          </nav>

          <div class="flex items-center gap-3 shrink-0">
            <a
              href="/contact"
              class="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wide text-[#030508] bg-[#00A6FF] hover:bg-[#38BDF8] rounded-lg whitespace-nowrap shrink-0 transition-all duration-150 hover:shadow-[0_0_20px_rgba(0,166,255,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Let's Connect</span>
              ${icon('arrowUpRight', 'w-3.5 h-3.5')}
            </a>

            <button
              type="button"
              id="mobile-menu-toggle"
              aria-expanded="false"
              aria-controls="mobile-nav-drawer"
              aria-label="Open navigation menu"
              class="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#38BDF8]/20 bg-[#090E18] text-slate-200 hover:text-white hover:border-[#00A6FF]/50 transition-colors cursor-pointer"
            >
              <span id="mobile-menu-icon-open">${icon('menu', 'w-5 h-5')}</span>
              <span id="mobile-menu-icon-close" class="hidden">${icon('x', 'w-5 h-5')}</span>
            </button>
          </div>
        </div>

        <div
          id="nav-scroll-progress"
          style="transform: scaleX(0); transform-origin: 0% 50%;"
          class="h-[2px] w-full bg-gradient-to-r from-[#00A6FF] via-[#38BDF8] to-[#00A6FF]"
          aria-hidden="true"
        ></div>

        <div
          id="mobile-nav-drawer"
          class="hidden md:hidden border-t border-[#38BDF8]/15 bg-[#030508]/98 px-5 py-4 space-y-1"
        >
          ${mobileLinks}
          <a
            href="/contact"
            class="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-[#030508] bg-[#00A6FF] hover:bg-[#38BDF8] transition-colors"
          >
            <span>Let's Connect</span>
            ${icon('arrowUpRight', 'w-4 h-4')}
          </a>
        </div>
      </header>

      <main class="flex-1">
        ${opts.mainHtml}
      </main>

      <footer class="relative overflow-hidden bg-[#030508] text-slate-300 border-t border-white/[0.06]">
        <div aria-hidden="true" class="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#00A6FF]/75 to-transparent"></div>
        <div aria-hidden="true" class="pointer-events-none absolute left-1/2 -top-28 -translate-x-1/2 w-[820px] h-[240px] rounded-full bg-[#00A6FF]/[0.08] blur-3xl"></div>
        <div aria-hidden="true" class="pointer-events-none absolute inset-0 architectural-grid opacity-30 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.85),transparent_85%)]"></div>

        <div class="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-12 sm:pt-14 lg:pt-16 pb-10 lg:pb-12">
          <!-- Executive CTA Card -->
          <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#08101E]/95 via-[#050A14]/95 to-[#03060C] border border-[#38BDF8]/16 p-5 sm:p-7 lg:p-9 mb-10 sm:mb-12 lg:mb-14 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
            <div aria-hidden="true" class="pointer-events-none absolute -right-24 -top-24 w-72 h-72 rounded-full bg-[#00A6FF]/[0.1] blur-3xl"></div>
            <div class="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6 lg:gap-8">
              <div class="max-w-2xl space-y-2">
                <p class="text-[11px] sm:text-xs font-medium tracking-[0.14em] uppercase text-[#38BDF8]">
                  Executive Advisory · Product Architecture · Leadership
                </p>
                <h2 class="font-serif-editorial text-xl sm:text-3xl lg:text-[34px] font-semibold tracking-tight text-white leading-snug">
                  Bridging Users, Design Systems &amp; AI-Accelerated Engineering.
                </h2>
              </div>

              <div class="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 shrink-0 w-full sm:w-auto">
                <a
                  href="/resume"
                  class="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 sm:px-5 py-2.5 rounded-lg border border-white/15 bg-[#070D1A]/85 hover:border-[#00A6FF]/55 hover:bg-[#0B1528] text-white text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
                >
                  <span>View Resume</span>
                </a>
                <a
                  href="/contact"
                  class="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 sm:px-6 py-2.5 rounded-lg bg-[#00A6FF] hover:bg-[#38BDF8] text-[#030508] text-xs sm:text-sm font-semibold transition-all duration-150 shadow-[0_0_24px_rgba(0,166,255,0.28)] hover:shadow-[0_0_32px_rgba(0,166,255,0.5)] whitespace-nowrap"
                >
                  <span>Start a Conversation</span>
                  ${icon('arrowRight', 'w-4 h-4')}
                </a>
              </div>
            </div>
          </div>

          <!-- Balanced Footer Architecture: Mobile (1+2+1), iPad (full brand -> 2-col links -> full connect), Desktop (4-2-2-4 aligned baseline) -->
          <div class="grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-9 sm:gap-x-8 lg:gap-10 pb-10 lg:pb-12 border-b border-white/[0.08]">
            <!-- Brand Block -->
            <div class="col-span-2 lg:col-span-4 flex flex-col justify-between gap-5 pb-8 lg:pb-0 border-b border-white/[0.07] lg:border-b-0">
              <div class="space-y-3.5">
                <a href="/" class="group inline-flex items-center gap-3.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6FF] rounded-lg">
                  <div class="relative p-1.5 rounded-xl bg-[#070D1A] border border-white/[0.08] group-hover:border-[#00A6FF]/45 transition-colors shrink-0">
                    <img
                      src="${esc(ASSETS.logo)}"
                      alt="CRM — Christopher R McGuire"
                      referrerpolicy="no-referrer"
                      class="h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.04] [filter:drop-shadow(0_0_1px_rgba(241,245,249,0.9))_drop-shadow(0_0_10px_rgba(0,166,255,0.38))]"
                    />
                  </div>
                  <div class="min-w-0">
                    <span class="font-display font-semibold text-white text-base sm:text-lg block leading-tight group-hover:text-[#38BDF8] transition-colors">
                      ${esc(PROFILE.name)}
                    </span>
                    <span class="text-xs text-slate-400 block mt-0.5">
                      ${esc(PROFILE.role)}
                    </span>
                  </div>
                </a>

                <p class="text-sm text-slate-400 leading-[1.68] max-w-xl lg:max-w-sm">
                  20+ years steering front-end architecture, institutional design systems, and applied
                  AI platforms across Savant Wealth, Mesirow, Akuna Capital, SpiderRock, and Citadel.
                </p>
              </div>

              <div class="lg:pt-3 lg:border-t lg:border-white/[0.06] flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-400">
                <span class="text-slate-200 font-medium">${esc(PROFILE.education.institution)}</span>
                <span aria-hidden="true" class="text-[#00A6FF]">·</span>
                <span>${esc(PROFILE.education.degree)}</span>
              </div>
            </div>

            <!-- Featured Links -->
            <div class="col-span-1 lg:col-span-2 flex flex-col">
              <h3 class="text-xs font-semibold tracking-[0.14em] uppercase text-slate-300">Featured</h3>
              <ul class="mt-4 lg:mt-6 space-y-2.5 lg:space-y-0 lg:flex-1 lg:flex lg:flex-col lg:justify-between text-[13px] sm:text-sm">
                ${featuredFooterLinks}
              </ul>
            </div>

            <!-- Site Navigation -->
            <div class="col-span-1 lg:col-span-2 flex flex-col">
              <h3 class="text-xs font-semibold tracking-[0.14em] uppercase text-slate-300">Navigation</h3>
              <ul class="mt-4 lg:mt-6 space-y-2.5 lg:space-y-0 lg:flex-1 lg:flex lg:flex-col lg:justify-between text-[13px] sm:text-sm">
                ${navFooterLinks}
              </ul>
            </div>

            <!-- Direct Contact & Social Grid -->
            <div class="col-span-2 lg:col-span-4 flex flex-col pt-6 lg:pt-0 border-t border-white/[0.07] lg:border-t-0">
              <h3 class="text-xs font-semibold tracking-[0.14em] uppercase text-slate-300">Connect</h3>
              <div class="mt-4 lg:mt-6 space-y-2.5 lg:space-y-1.5">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-1.5 text-sm">
                  <a
                    href="mailto:${esc(PROFILE.email)}"
                    class="group flex items-center justify-between gap-2.5 min-h-[44px] lg:min-h-[36px] px-3.5 py-2 lg:py-1.5 rounded-xl bg-[#070C17] border border-white/[0.08] hover:border-[#00A6FF]/45 text-slate-200 hover:text-white transition-colors"
                  >
                    <span class="flex items-center gap-2.5 min-w-0">
                      ${icon('mail', 'w-4 h-4 text-[#00A6FF] shrink-0')}
                      <span class="text-xs sm:text-[13px] font-medium truncate">${esc(PROFILE.email)}</span>
                    </span>
                    ${icon('arrowUpRight', 'w-3.5 h-3.5 text-slate-500 group-hover:text-[#38BDF8] shrink-0 transition-colors')}
                  </a>
                  <div class="flex items-center gap-2.5 min-h-[44px] lg:min-h-[36px] px-3.5 py-2 lg:py-1.5 rounded-xl bg-[#050912] border border-white/[0.05] text-xs sm:text-[13px] text-slate-300">
                    ${icon('mapPin', 'w-4 h-4 text-[#00A6FF] shrink-0')}
                    <span>${esc(PROFILE.location)}</span>
                  </div>
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 lg:gap-1.5 text-xs font-medium">
                  ${socialFooterLinks}
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Bar -->
          <div class="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-center sm:text-left">
              <p>© ${year} ${esc(PROFILE.name)}. All rights reserved.</p>
              <span aria-hidden="true" class="hidden sm:inline text-slate-700">·</span>
              <span class="hidden sm:inline text-slate-500">Engineering, UX/UI &amp; AI Leadership</span>
            </div>
            <button
              type="button"
              id="back-to-top-btn"
              aria-label="Back to top"
              class="group inline-flex items-center justify-center gap-2 min-h-[40px] w-full sm:w-auto px-4 py-2 rounded-lg bg-[#080D18] border border-white/[0.08] hover:border-[#00A6FF]/45 text-slate-300 hover:text-[#38BDF8] transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              ${icon('arrowUp', 'w-3.5 h-3.5 transition-transform duration-150 group-hover:-translate-y-0.5')}
            </button>
          </div>
        </div>
      </footer>
    </div>

    <script type="module" src="/src/client/main.ts"></script>
  </body>
</html>
`;
}
