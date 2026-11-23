import type { FullArticle } from '../../data/articles';
import { PROFILE } from '../../data/siteData';
import { icon } from '../icons';
import { blogPostingSchema, breadcrumbSchema, esc, SITE_URL, type SeoConfig } from '../seo';

/**
 * Search-result titles/descriptions kept within ~60 / ~155 characters.
 * The on-page headline and excerpt stay unchanged.
 */
const ARTICLE_SEO_OVERRIDES: Record<string, { title?: string; description?: string }> = {
  'why-fintech-companies-need-dedicated-ux-teams': {
    title: 'Why FinTech Companies Need Dedicated UX Teams | Paguire',
  },
  'designing-application-icons': {
    title: 'Designing Application Icons: Tips for Success | Paguire',
  },
  'hidden-roi-of-uxui-design-in-internal-business-applications': {
    title: 'The Hidden ROI of UX/UI in Internal Business Apps | Paguire',
    description:
      'Internal tools rarely get design attention. The cost shows up as lost productivity, higher training overhead and employees fighting software daily.',
  },
  'mastering-uiux-design-in-modern-application-development': {
    title: 'Mastering UI/UX Design in Modern App Development | Paguire',
  },
  'custom-icons-and-user-interface-design-tips': {
    title: 'Custom Icons & UI Design: Tips and Methods | Paguire',
  },
  'user-interface-design-for-web-applications': {
    title: 'UI Design for Web Applications: Best Practices | Paguire',
  },
  'job-titles-software-engineering': {
    title: 'Software Engineering Job Titles: Pitfalls & Fixes | Paguire',
  },
  'mythical-full-stack-developer': {
    description:
      'The full-stack unicorn is often a recruiting shortcut that dilutes quality. Strong products come from deep specialists collaborating across clean contracts.',
  },
  'frontend-development': {
    title: 'Frontend Development: More Than a Pretty Website | Paguire',
  },
};

export function getArticleSeo(article: FullArticle): SeoConfig {
  const override = ARTICLE_SEO_OVERRIDES[article.slug] || {};
  const parsed = new Date(article.date);
  const publishedTime = Number.isNaN(parsed.getTime())
    ? '2026-03-06'
    : parsed.toISOString().split('T')[0];

  return {
    path: `/blog/posts/${article.slug}`,
    title: override.title || `${article.title} | Christopher R McGuire`,
    description: override.description || article.excerpt,
    ogTitle: article.title,
    keywords: `${article.categories.join(', ')}, Christopher R McGuire, Paguire`,
    ogType: 'article',
    ogImage: `${SITE_URL}${article.coverImage}`,
    publishedTime,
    articleTags: article.categories,
    jsonLd: [
      blogPostingSchema(article),
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Library', path: '/blog' },
        { name: article.title, path: `/blog/posts/${article.slug}` },
      ]),
    ],
  };
}

export function renderArticleReaderPage(article: FullArticle, nextArticle: FullArticle): string {
  const sectionsHtml = article.sections
    .map(
      (section) => `<section data-reveal class="space-y-4">
        ${
          section.heading
            ? `<h2 class="text-xl sm:text-2xl font-semibold text-white pt-2">${esc(section.heading)}</h2>`
            : ''
        }
        ${section.paragraphs
          .map(
            (para) => `<p class="text-base sm:text-lg text-slate-300 leading-[1.75]">${esc(para)}</p>`
          )
          .join('\n')}
        ${
          section.diagram
            ? `<div data-parallax="article-diagram" class="py-3">
                <figure class="rounded-2xl overflow-hidden bg-[#090E18] blueprint-hairline">
                  <div class="w-full bg-[#050810]">
                    <img src="${esc(section.diagram.src)}" alt="${esc(section.diagram.alt)}" referrerpolicy="no-referrer" class="w-full h-auto object-contain" />
                  </div>
                  <figcaption class="px-5 py-3 text-xs text-slate-400 border-t border-white/[0.06]">
                    ${esc(section.diagram.caption)}
                  </figcaption>
                </figure>
              </div>`
            : ''
        }
        ${
          section.bullets
            ? `<ul class="space-y-3 pt-2">
                ${section.bullets
                  .map(
                    (b) => `<li class="flex items-start gap-3 text-base text-slate-200">
                      ${icon('checkCircle2', 'w-4 h-4 text-[#00A6FF] shrink-0 mt-1.5')}
                      <span>${esc(b)}</span>
                    </li>`
                  )
                  .join('\n')}
              </ul>`
            : ''
        }
      </section>`
    )
    .join('\n');

  const parsedDate = new Date(article.date);
  const isoDate = Number.isNaN(parsedDate.getTime())
    ? '2026-03-06'
    : parsedDate.toISOString().split('T')[0];

  return `<article class="relative pb-24">
    <div
      id="article-scroll-progress"
      style="transform: scaleX(0); transform-origin: 0% 50%;"
      class="fixed top-[66px] md:top-[74px] left-0 right-0 h-[2px] bg-[#00A6FF] z-40"
      aria-hidden="true"
    ></div>

    <div class="max-w-4xl mx-auto px-5 sm:px-8 pt-14 lg:pt-20">
      <a href="/blog" class="inline-flex items-center gap-2 text-sm text-[#38BDF8] hover:text-white mb-8">
        ${icon('arrowLeft', 'w-4 h-4')}
        <span>Back to Library</span>
      </a>

      <header class="pb-10 mb-10 border-b border-white/[0.08] hero-enter">
        <p class="text-sm font-medium text-[#38BDF8] mb-3">${esc(article.kicker)}</p>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight mb-5">
          ${esc(article.title)}
        </h1>
        <div class="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-400 mb-8">
          <span>By ${esc(PROFILE.name)}</span>
          <span aria-hidden="true">·</span>
          <time datetime="${esc(isoDate)}">${esc(article.date)}</time>
          <span aria-hidden="true">·</span>
          <span>${esc(article.readTime)}</span>
        </div>

        <div data-parallax="article-cover">
          <div class="aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#050810] blueprint-hairline">
            <img src="${esc(article.coverImage)}" alt="${esc(article.coverAlt)}" referrerpolicy="no-referrer" class="w-full h-full object-cover object-top" />
          </div>
        </div>
      </header>

      <div class="max-w-3xl mx-auto space-y-10">
        ${sectionsHtml}

        <footer class="mt-16 pt-10 border-t border-white/[0.08]">
          <div class="p-6 rounded-2xl bg-[#090E18] blueprint-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p class="text-xs text-[#38BDF8] mb-1">Continue Reading</p>
              <h3 class="text-lg font-semibold text-white">${esc(nextArticle.title)}</h3>
            </div>
            <a
              href="/blog/posts/${esc(nextArticle.slug)}"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#00A6FF] hover:bg-[#38BDF8] text-[#030508] text-xs font-semibold transition-colors shrink-0"
            >
              <span>Next Essay</span>
              ${icon('arrowRight', 'w-4 h-4')}
            </a>
          </div>
        </footer>
      </div>
    </div>
  </article>`;
}
