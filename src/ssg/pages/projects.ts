import { ASSETS, PROJECTS } from '../../data/siteData';
import type { ProjectFilter } from '../../utils/portfolioLogic';
import { icon } from '../icons';
import { breadcrumbSchema, esc, SITE_URL, toAbsoluteUrl, type SeoConfig } from '../seo';

const FILTER_ITEMS: { id: ProjectFilter; label: string }[] = [
  { id: 'All', label: 'All' },
  { id: 'AI & LLM', label: 'AI & LLM' },
  { id: 'FinTech', label: 'FinTech' },
  { id: 'Web & Interactive', label: 'Web & Interactive' },
  { id: 'Design Tools', label: 'Design Tools' },
  { id: 'Publications', label: 'Publications' },
];

export const PROJECTS_SEO: SeoConfig = {
  path: '/projects',
  title: 'Projects & Products | Christopher R McGuire',
  description:
    'Explore shipped AI products, iOS apps, Chrome extensions, WebXR games, FinTech tools, and published playbooks including Thrive Financial, Modus AI, SnapClipper, and Tron Engaged.',
  keywords:
    'Christopher R McGuire Projects, Thrive Financial, Modus AI, SnapClipper, Tron Engaged, Wils Martini Lounge, Fiscal Compass, Icon Forge, MarkFlow',
  ogImage: `${SITE_URL}${ASSETS.projectsHeroPortrait}`,
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Featured Projects & Products by Christopher R McGuire',
      url: toAbsoluteUrl('/projects'),
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: PROJECTS.map((p, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: p.title,
          description: p.description,
          url: p.internalRoute ? toAbsoluteUrl(p.internalRoute) : p.externalUrl,
        })),
      },
    },
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Projects', path: '/projects' },
    ]),
  ],
};

export function renderProjectsPage(): string {
  const filterTabsHtml = FILTER_ITEMS.map((item, idx) => {
    const active = idx === 0;
    return `<button
      type="button"
      data-project-filter="${esc(item.id)}"
      aria-pressed="${active ? 'true' : 'false'}"
      class="relative px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
        active ? 'bg-[#00A6FF] text-[#030508] font-semibold' : 'text-slate-300 hover:text-white'
      }"
    >${esc(item.label)}</button>`;
  }).join('\n');

  const cardsHtml = PROJECTS.map((project, idx) => {
    const tagLine = (
      project.internalRoute && project.externalUrl ? project.tags.slice(0, 2) : project.tags.slice(0, 3)
    ).join(' · ');
    return `<div data-project-card data-project-group="${esc(project.filterGroup)}" data-reveal style="transition-delay: ${(idx % 2) * 80}ms" class="h-full">
      <div data-magnetic class="relative flex flex-col overflow-hidden rounded-2xl bg-[#090E18] blueprint-hairline transition-colors duration-200 hover:border-[#00A6FF]/45 h-full group">
        <div data-magnetic-glow aria-hidden="true" class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200"></div>
        <div class="relative z-10 flex-1 w-full h-full flex flex-col justify-between">
          <div>
            <div class="relative aspect-video w-full overflow-hidden bg-[#050810] border-b border-white/[0.06]">
              <img src="${esc(project.image)}" alt="${esc(project.title)}" referrerpolicy="no-referrer" class="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]" />
              <div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090E18]/70 via-transparent to-transparent"></div>
            </div>
            <div class="p-7 sm:p-8">
              <p class="text-xs font-medium text-[#38BDF8] mb-2">${esc(project.category)}</p>
              <h2 class="text-2xl font-semibold text-white mb-1">${esc(project.title)}</h2>
              <p class="text-sm font-medium text-slate-400 mb-4">${esc(project.subtitle)}</p>
              <p class="text-sm sm:text-base text-slate-300 leading-relaxed mb-5">${esc(project.description)}</p>
              <div class="space-y-2 mb-6">
                ${project.features
                  .map(
                    (feat) => `<div class="flex items-start gap-2.5 text-sm text-slate-300">
                      ${icon('checkCircle2', 'w-4 h-4 text-[#00A6FF] shrink-0 mt-0.5')}
                      <span>${esc(feat)}</span>
                    </div>`
                  )
                  .join('\n')}
              </div>
            </div>
          </div>

          <div class="mt-auto px-7 sm:px-8 py-5 border-t border-white/[0.07] flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">
            <span class="text-xs text-slate-400 min-w-0 truncate">${esc(tagLine)}</span>
            <div class="flex items-center gap-2.5 shrink-0">
              ${
                project.internalRoute
                  ? `<a href="${esc(project.internalRoute)}" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00A6FF] hover:bg-[#38BDF8] text-[#030508] text-xs font-semibold transition-colors whitespace-nowrap">
                      <span>${esc(project.ctaLabel)}</span>
                      ${icon('arrowRight', 'w-3.5 h-3.5')}
                    </a>`
                  : ''
              }
              ${
                project.externalUrl
                  ? `<a href="${esc(project.externalUrl)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                      project.internalRoute
                        ? 'border border-white/15 text-slate-200 hover:border-[#00A6FF]/50 hover:text-white'
                        : 'bg-[#00A6FF] hover:bg-[#38BDF8] text-[#030508]'
                    }">
                      <span>${project.internalRoute ? 'Live Link' : esc(project.ctaLabel)}</span>
                      ${icon('arrowUpRight', 'w-3.5 h-3.5')}
                    </a>`
                  : ''
              }
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }).join('\n');

  return `<div class="overflow-x-clip">
    <section class="relative overflow-hidden bg-[#030508] border-b border-white/[0.08] lg:min-h-[480px] xl:min-h-[545px] lg:flex lg:items-center">
      <div class="lg:hidden relative h-[285px] sm:h-[360px] md:h-[400px] overflow-hidden bg-[#030810]">
        <div data-parallax="projects-mobile-bg" aria-hidden="true" class="pointer-events-none absolute -top-24 inset-x-0 bottom-0 origin-center will-change-transform">
          <img src="${esc(ASSETS.projectsHeroBg)}" alt="" referrerpolicy="no-referrer" class="w-full h-full object-cover object-[76%_center]" />
        </div>
        <div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030508] via-[#030508]/20 to-[#030508]/35"></div>
        <div data-parallax="projects-mobile-portrait" class="relative z-10 h-full w-full flex items-end justify-end pointer-events-none origin-bottom-right will-change-transform">
          <img src="${esc(ASSETS.projectsHeroPortrait)}" alt="Christopher R McGuire sketching application architecture and product flows at studio desk" referrerpolicy="no-referrer" class="h-[112%] sm:h-[114%] w-auto max-w-none object-contain object-bottom translate-y-[6%] drop-shadow-[0_18px_42px_rgba(0,0,0,0.8)]" />
        </div>
      </div>

      <div aria-hidden="true" class="hidden lg:block pointer-events-none absolute inset-0 overflow-hidden">
        <div data-parallax="projects-desktop-bg" class="absolute -top-28 inset-x-0 bottom-0 origin-center will-change-transform">
          <img src="${esc(ASSETS.projectsHeroBg)}" alt="" referrerpolicy="no-referrer" class="w-full h-full object-cover object-right" />
        </div>
        <div class="absolute inset-0 bg-gradient-to-r from-[#030508] via-[#030508]/78 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#030508]/90 via-transparent to-[#030508]/40"></div>
        <div data-parallax="projects-desktop-portrait" class="relative z-10 max-w-[1440px] mx-auto h-full flex items-end justify-end origin-bottom-right will-change-transform">
          <img src="${esc(ASSETS.projectsHeroPortrait)}" alt="Christopher R McGuire sketching application architecture and product flows at studio desk" referrerpolicy="no-referrer" class="h-[106%] xl:h-[112%] w-auto max-w-none object-contain object-bottom translate-y-[6%] drop-shadow-[0_24px_54px_rgba(0,0,0,0.84)]" />
        </div>
      </div>

      <div class="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 pt-6 pb-11 lg:py-20 xl:py-24">
        <div data-parallax="projects-copy" class="max-w-md lg:max-w-lg xl:max-w-[520px] will-change-transform hero-enter">
          <p class="text-sm font-medium text-[#38BDF8] mb-3">My Work · Product Portfolio</p>
          <h1 class="text-[32px] sm:text-4xl lg:text-[46px] xl:text-5xl font-semibold tracking-tight text-white leading-[1.08] mb-4">
            Featured Projects &amp; Products
          </h1>
          <p class="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-md xl:max-w-lg">
            Applications, AI systems, Chrome extensions, iOS software, and published playbooks
            built at the intersection of design rigor and full-stack engineering.
          </p>
        </div>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-5 sm:px-8 pt-8 sm:pt-10 pb-16 lg:pb-24">
      <div class="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/[0.08]">
        <div role="group" aria-label="Filter projects by category" class="flex flex-wrap gap-1.5 p-1 rounded-xl bg-[#090E18] border border-white/[0.08]">
          ${filterTabsHtml}
        </div>
      </div>

      <div class="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        ${cardsHtml}
      </div>
    </div>
  </div>`;
}
