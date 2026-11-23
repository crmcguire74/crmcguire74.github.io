import { ARTICLES } from '../../data/articles';
import { ASSETS, BOOKS, PROFILE } from '../../data/siteData';
import { ARTICLES_PER_PAGE, paginateItems, type ArticleCategory } from '../../utils/portfolioLogic';
import { icon } from '../icons';
import { breadcrumbSchema, esc, SITE_URL, toAbsoluteUrl, type SeoConfig } from '../seo';

const CATEGORY_ITEMS: { id: ArticleCategory; label: string }[] = [
  { id: 'All', label: 'All' },
  { id: 'Design', label: 'Design' },
  { id: 'Development', label: 'Development' },
  { id: 'Career', label: 'Career' },
  { id: 'AI', label: 'AI' },
  { id: 'Business', label: 'Business' },
  { id: 'UX', label: 'UX' },
  { id: 'Fintech', label: 'Fintech' },
];

export const LIBRARY_SEO: SeoConfig = {
  path: '/blog',
  title: 'Library: Books, Playbooks & Essays | Christopher R McGuire',
  description:
    'Amazon AI playbooks and investing guides, plus long-form essays on FinTech UX, design systems, AI product rigor and engineering leadership.',
  keywords:
    'Christopher R McGuire Blog, Library, The AI Shortcut, Investing for the Rest of Us, FinTech UX, Design Systems, Software Engineering Essays',
  ogImage: `${SITE_URL}${ASSETS.libraryHeroPortrait}`,
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Christopher R McGuire — Books, Insights & Ideas',
      url: toAbsoluteUrl('/blog'),
      author: { '@type': 'Person', name: PROFILE.name },
      blogPost: ARTICLES.map((a) => ({
        '@type': 'BlogPosting',
        headline: a.title,
        description: a.excerpt,
        url: toAbsoluteUrl(`/blog/posts/${a.slug}`),
        image: toAbsoluteUrl(a.coverImage),
      })),
    },
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Library', path: '/blog' },
    ]),
  ],
};

export function renderLibraryPage(): string {
  const booksHtml = BOOKS.map(
    (book, idx) => `<div data-reveal style="transition-delay: ${idx * 55}ms" class="h-full">
      <div data-magnetic class="relative flex flex-col overflow-hidden rounded-2xl bg-[#090E18] blueprint-hairline transition-colors duration-200 hover:border-[#00A6FF]/45 h-full group">
        <div data-magnetic-glow aria-hidden="true" class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200"></div>
        <div class="relative z-10 flex-1 w-full h-full flex flex-col">
          <div class="flex-1">
            <div class="aspect-[3/4] w-full overflow-hidden bg-[#050810] border-b border-white/[0.06] flex items-center justify-center p-4">
              <img src="${esc(book.coverImage)}" alt="${esc(book.title)} cover" referrerpolicy="no-referrer" class="max-h-full w-auto object-contain rounded shadow-[0_12px_28px_rgba(0,0,0,0.75)] transition-transform duration-300 group-hover:scale-[1.04]" />
            </div>
            <div class="p-5 pb-3">
              <div class="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span class="font-mono-tabular text-[#00A6FF]">${esc(book.index)}.</span>
                <span>${esc(book.category)}</span>
              </div>
              <h3 class="text-base font-semibold text-white mb-1.5">${esc(book.title)}</h3>
              <p class="text-xs font-medium text-[#38BDF8] mb-2.5">${esc(book.subtitle)}</p>
              <p class="text-xs text-slate-400 leading-relaxed mb-4">${esc(book.description)}</p>
            </div>
          </div>
          <div class="mt-auto px-5 pb-5 pt-3 border-t border-white/[0.06]">
            <a href="${esc(book.amazonUrl)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00A6FF] hover:text-[#38BDF8] transition-colors whitespace-nowrap">
              <span>View on Amazon</span>
              ${icon('arrowUpRight', 'w-3.5 h-3.5')}
            </a>
          </div>
        </div>
      </div>
    </div>`
  ).join('\n');

  const categoryTabsHtml = CATEGORY_ITEMS.map((item, idx) => {
    const active = idx === 0;
    return `<button
      type="button"
      data-library-category="${esc(item.id)}"
      aria-pressed="${active ? 'true' : 'false'}"
      class="relative px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
        active ? 'bg-[#00A6FF] text-[#030508] font-semibold' : 'text-slate-300 hover:text-white'
      }"
    >${esc(item.label)}</button>`;
  }).join('\n');

  const { items: initialPageArticles, totalPages } = paginateItems(ARTICLES, 1, ARTICLES_PER_PAGE);

  // Render ALL articles into initial HTML (first 6 visible, rest hidden until paginated/searched) so search crawlers index every single article link from /blog!
  const allArticlesHtml = ARTICLES.map((article, idx) => {
    const isPage1 = idx < ARTICLES_PER_PAGE;
    return `<div data-article-card data-article-slug="${esc(article.slug)}"${isPage1 ? ' data-reveal style="transition-delay: ' + ((idx % 3) * 65) + 'ms"' : ''} class="h-full${isPage1 ? '' : ' hidden'}">
      <a href="/blog/posts/${esc(article.slug)}" data-magnetic class="relative flex flex-col overflow-hidden rounded-2xl bg-[#090E18] blueprint-hairline transition-colors duration-200 hover:border-[#00A6FF]/45 h-full cursor-pointer group">
        <div data-magnetic-glow aria-hidden="true" class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200"></div>
        <div class="relative z-10 flex-1 w-full h-full flex flex-col">
          <div class="flex-1">
            <div class="aspect-[16/9] w-full overflow-hidden bg-[#050810] border-b border-white/[0.06]">
              <img src="${esc(article.coverImage)}" alt="${esc(article.coverAlt)}" referrerpolicy="no-referrer" class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]" />
            </div>
            <div class="p-6 pb-3">
              <div class="flex items-center gap-2 text-xs text-slate-400 mb-2.5">
                <span>${esc(article.date)}</span>
                <span aria-hidden="true">·</span>
                <span>${esc(article.readTime)}</span>
              </div>
              <h3 class="text-lg font-semibold text-white mb-2.5 group-hover:text-[#38BDF8] transition-colors">${esc(article.title)}</h3>
              <p class="text-sm text-slate-400 leading-relaxed mb-4">${esc(article.excerpt)}</p>
            </div>
          </div>
          <div class="mt-auto px-6 pb-6 pt-3 flex items-center justify-between gap-3 border-t border-white/[0.06] text-xs">
            <span class="text-slate-500 truncate">${esc(article.categories.join(' · '))}</span>
            <span class="inline-flex items-center gap-1 font-semibold text-[#00A6FF] group-hover:translate-x-1 transition-transform whitespace-nowrap shrink-0">
              Read Article
              ${icon('arrowRight', 'w-3.5 h-3.5')}
            </span>
          </div>
        </div>
      </a>
    </div>`;
  }).join('\n');

  const pageButtonsHtml = Array.from({ length: totalPages }, (_, i) => i + 1)
    .map(
      (num) => `<button
        type="button"
        data-library-page="${num}"
        ${num === 1 ? 'aria-current="page"' : ''}
        class="w-10 h-10 rounded-lg font-mono-tabular text-xs font-semibold cursor-pointer transition-colors ${
          num === 1
            ? 'bg-[#00A6FF] text-[#030508]'
            : 'border border-white/10 bg-[#090E18] text-slate-300 hover:text-white'
        }"
      >${num}</button>`
    )
    .join('\n');

  return `<div class="overflow-x-clip">
    <!-- Layered Library Hero -->
    <section class="relative overflow-hidden bg-[#030508] border-b border-white/[0.08] lg:min-h-[520px] xl:min-h-[590px] lg:flex lg:items-center">
      <div class="lg:hidden relative h-[300px] sm:h-[370px] md:h-[420px] overflow-hidden bg-[#030710]">
        <div data-parallax="library-mobile-bg" aria-hidden="true" class="pointer-events-none absolute -top-24 inset-x-0 bottom-0 origin-center will-change-transform">
          <img src="${esc(ASSETS.libraryHeroBg)}" alt="" referrerpolicy="no-referrer" class="w-full h-full object-cover object-[76%_24%]" />
        </div>
        <div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030508] via-[#030508]/20 to-[#030508]/35"></div>
        <div data-parallax="library-mobile-portrait" class="relative z-10 h-full w-full flex items-end justify-end pointer-events-none origin-bottom-right will-change-transform">
          <img src="${esc(ASSETS.libraryHeroPortrait)}" alt="Christopher R McGuire seated in leather armchair beside walnut table with notebook and mug" referrerpolicy="no-referrer" class="h-[106%] sm:h-[108%] w-auto max-w-none object-contain object-bottom translate-y-[2%] drop-shadow-[0_18px_42px_rgba(0,0,0,0.82)]" />
        </div>
      </div>

      <div aria-hidden="true" class="hidden lg:block pointer-events-none absolute inset-0 overflow-hidden">
        <div data-parallax="library-desktop-bg" class="absolute -top-28 inset-x-0 bottom-0 origin-center will-change-transform">
          <img src="${esc(ASSETS.libraryHeroBg)}" alt="" referrerpolicy="no-referrer" class="w-full h-full object-cover object-[right_22%]" />
        </div>
        <div class="absolute inset-0 bg-gradient-to-r from-[#030508] via-[#030508]/76 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#030508]/88 via-transparent to-[#030508]/38"></div>
        <div data-parallax="library-desktop-portrait" class="relative z-10 max-w-[1440px] mx-auto h-full flex items-end justify-end origin-bottom-right will-change-transform">
          <img src="${esc(ASSETS.libraryHeroPortrait)}" alt="Christopher R McGuire seated in leather armchair beside walnut table with notebook and mug" referrerpolicy="no-referrer" class="h-[102%] xl:h-[106%] w-auto max-w-none object-contain object-bottom translate-y-[2%] drop-shadow-[0_24px_54px_rgba(0,0,0,0.85)]" />
        </div>
      </div>

      <div class="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 pt-6 pb-11 lg:py-20 xl:py-24">
        <div data-parallax="library-copy" class="max-w-md lg:max-w-[460px] xl:max-w-[500px] will-change-transform hero-enter">
          <p class="text-sm font-medium text-[#38BDF8] mb-3">Published Works &amp; Articles</p>
          <h1 class="text-[34px] sm:text-5xl xl:text-[54px] font-semibold tracking-tight text-white leading-[1.06] mb-5">
            Books, Insights &amp; Ideas
          </h1>
          <p class="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-md xl:max-w-lg mb-8">
            Authored books, actionable playbooks, and practical frameworks on wealth building, AI,
            engineering, UX, and long-form thinking.
          </p>

          <div class="flex flex-wrap items-center gap-3.5">
            <a href="#library-articles" class="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-lg bg-[#00A6FF] hover:bg-[#38BDF8] text-[#030508] text-sm font-semibold transition-all duration-150 hover:shadow-[0_0_24px_rgba(0,166,255,0.45)] whitespace-nowrap">
              <span>Explore the Library</span>
              ${icon('arrowDown', 'w-4 h-4')}
            </a>
            <a href="#library-books" class="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-lg border border-white/15 bg-[#090E18]/90 hover:border-[#00A6FF]/50 text-white text-sm font-medium transition-colors whitespace-nowrap">
              <span>View Books &amp; Playbooks</span>
              ${icon('arrowRight', 'w-4 h-4')}
            </a>
          </div>
        </div>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-5 sm:px-8 py-16 lg:py-24 space-y-20">
      <!-- Books & Playbooks Shelf -->
      <section id="library-books" aria-label="Books and Playbooks" class="scroll-mt-24">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          <div class="lg:col-span-6">
            <p class="text-xs font-medium text-[#38BDF8] mb-2">Featured Publications</p>
            <h2 class="text-2xl sm:text-3xl font-semibold text-white mb-3">Books &amp; Playbooks</h2>
            <p class="text-sm sm:text-base text-slate-300 leading-relaxed">
              Four Amazon volumes authored by Christopher R McGuire—spanning The AI Shortcut for
              Real Estate, Small Business, and Divorce, plus Investing for the Rest of Us.
            </p>
          </div>
          <div class="lg:col-span-6">
            <div class="aspect-[16/9] rounded-2xl overflow-hidden blueprint-hairline">
              <img src="${esc(ASSETS.booksImg)}" alt="Hardcover collection featuring The AI Shortcut: Real Estate, Small Business, Divorce, and Investing for the Rest of Us" referrerpolicy="no-referrer" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          ${booksHtml}
        </div>
      </section>

      <!-- Articles & Insights -->
      <section id="library-articles" aria-label="Articles and Insights" class="space-y-8 scroll-mt-24">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div>
            <h2 class="text-2xl sm:text-3xl font-semibold text-white">Articles &amp; Insights</h2>
            <p id="library-article-count" class="text-sm text-slate-400 mt-1">
              ${ARTICLES.length} articles available
            </p>
          </div>

          <div class="relative w-full md:w-80">
            <label for="library-search" class="sr-only">Search library articles</label>
            ${icon('search', 'w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none')}
            <input
              id="library-search"
              type="search"
              value=""
              placeholder="Search articles..."
              class="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#090E18] border border-white/15 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00A6FF]"
            />
          </div>
        </div>

        <div role="group" aria-label="Filter library posts by category" class="flex flex-wrap gap-1.5 p-1 rounded-xl bg-[#090E18] border border-white/[0.08]">
          ${categoryTabsHtml}
        </div>

        <div id="library-empty-state" class="hidden p-12 rounded-2xl bg-[#090E18] blueprint-hairline text-center space-y-3">
          <p class="text-lg font-medium text-white">No matching articles found</p>
          <p class="text-sm text-slate-400">
            Try clearing your search term or switching back to All categories.
          </p>
          <button type="button" id="library-reset-btn" class="px-4 py-2 rounded-lg bg-[#00A6FF] text-[#030508] text-xs font-semibold cursor-pointer">
            Reset Filters
          </button>
        </div>

        <div id="library-articles-grid" data-initial-count="${initialPageArticles.length}" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${allArticlesHtml}
        </div>

        <nav id="library-pagination" aria-label="Library article pages" class="flex items-center justify-center gap-2 pt-4${totalPages <= 1 ? ' hidden' : ''}">
          <button
            type="button"
            id="library-prev-page"
            disabled
            aria-label="Previous page"
            class="p-2.5 rounded-lg border border-white/10 bg-[#090E18] text-slate-300 disabled:opacity-35 cursor-pointer disabled:cursor-not-allowed"
          >
            ${icon('chevronLeft', 'w-4 h-4')}
          </button>
          <div id="library-page-numbers" class="flex items-center gap-2">
            ${pageButtonsHtml}
          </div>
          <button
            type="button"
            id="library-next-page"
            ${totalPages <= 1 ? 'disabled' : ''}
            aria-label="Next page"
            class="p-2.5 rounded-lg border border-white/10 bg-[#090E18] text-slate-300 disabled:opacity-35 cursor-pointer disabled:cursor-not-allowed"
          >
            ${icon('chevronRight', 'w-4 h-4')}
          </button>
        </nav>
      </section>

      <!-- Newsletter Section -->
      <section data-reveal class="p-8 sm:p-10 rounded-2xl bg-[#090E18] blueprint-hairline">
        <div class="max-w-2xl">
          <h2 class="text-2xl font-semibold text-white mb-2">
            Join My Professional Newsletter Community
          </h2>
          <p class="text-sm sm:text-base text-slate-400 mb-6">
            Stay updated with my latest articles, projects, and insights delivered straight to your
            inbox. I respect your privacy—unsubscribe at any time.
          </p>

          <div id="newsletter-success" class="hidden inline-flex items-center gap-2 text-sm font-medium text-[#38BDF8]">
            ${icon('checkCircle2', 'w-5 h-5 text-[#00A6FF]')}
            <span id="newsletter-success-text"></span>
          </div>

          <form id="newsletter-form" novalidate class="space-y-2">
            <div class="flex flex-col sm:flex-row gap-3">
              <label for="newsletter-email" class="sr-only">Email address for newsletter</label>
              <input
                id="newsletter-email"
                type="email"
                value=""
                placeholder="Enter your email address"
                class="flex-1 px-4 py-3 rounded-lg bg-[#050810] border border-white/15 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00A6FF]"
              />
              <button
                type="submit"
                class="px-6 py-3 rounded-lg bg-[#00A6FF] hover:bg-[#38BDF8] text-[#030508] text-sm font-semibold transition-colors cursor-pointer shrink-0"
              >
                Subscribe
              </button>
            </div>
            <p id="newsletter-error" role="alert" class="hidden text-xs text-rose-400"></p>
          </form>
        </div>
      </section>
    </div>
  </div>`;
}
