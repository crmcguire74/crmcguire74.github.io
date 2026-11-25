import { ARTICLES, type FullArticle } from '../data/articles';
import { PROFILE } from '../data/siteData';

export const SITE_URL = 'https://paguire.com';
export const SITE_NAME = 'Christopher R McGuire | Paguire';
export const PROFILE_PORTRAIT_IMAGE = `${SITE_URL}/assets/aistudio/Professional_Executive_Portrait_9d49b2b1.webp`;

// 🖼️ Social share cards live in public/og/ and are built by scripts/generate-og-images.sh.
// They are pre-cropped to 1200x630 (1.91:1) so X, LinkedIn and Facebook never crop faces.
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const ogImage = (name: string): string => `${SITE_URL}/og/${name}.jpg`;

/** Maps a source image path (e.g. an article cover) to its generated share card. */
export const ogImageFor = (sourcePath: string): string =>
  ogImage((sourcePath.split('/').pop() ?? '').replace(/\.[^.]+$/, ''));

export const DEFAULT_OG_IMAGE = ogImage('home');

export interface SeoConfig {
  path: string;
  title: string;
  description: string;
  keywords?: string;
  ogType?: 'website' | 'article' | 'profile';
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  robots?: string;
  publishedTime?: string;
  articleTags?: string[];
  jsonLd?: Record<string, unknown>[];
}

export function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function toAbsoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }
  const normalized = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_URL}${withTrailingSlash(normalized)}`;
}

/**
 * Pages are emitted as `<route>/index.html`, which Netlify serves at `<route>/`
 * and 301-redirects `<route>` to. Canonicals, sitemap entries and internal links
 * must therefore use the trailing-slash form. File paths (with an extension),
 * query strings and fragments are preserved.
 */
export function withTrailingSlash(pathname: string): string {
  const match = pathname.match(/^([^?#]*)(.*)$/);
  const base = match ? match[1] : pathname;
  const rest = match ? match[2] : '';
  if (!base || base.endsWith('/') || /\.[a-z0-9]+$/i.test(base)) return pathname;
  return `${base}/${rest}`;
}

const INTERNAL_PAGE_HREF = /href="(\/(?!\/|src\/|assets\/|images\/)[^"]*)"/g;

export function normalizeInternalPageLinks(html: string): string {
  return html.replace(INTERNAL_PAGE_HREF, (_m, href: string) => `href="${withTrailingSlash(href)}"`);
}

export function personSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PROFILE.name,
    alternateName: ['Christopher McGuire', 'Christopher Patrick'],
    jobTitle: PROFILE.role,
    worksFor: {
      '@type': 'Organization',
      name: 'Savant Wealth',
    },
    '@id': `${SITE_URL}/#person`,
    url: `${SITE_URL}/`,
    image: {
      '@type': 'ImageObject',
      url: PROFILE_PORTRAIT_IMAGE,
      contentUrl: PROFILE_PORTRAIT_IMAGE,
      width: 1122,
      height: 1402,
      caption: `${PROFILE.name} — professional headshot`,
    },
    email: PROFILE.email,
    description:
      'Director of WiseOS Platform and SVP of Application Design & Development with 20+ years leading software engineering, UX/UI design systems, and applied AI platforms at Savant Wealth, Mesirow, Akuna Capital, SpiderRock, and Citadel.',
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'Purdue University',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'School of the Art Institute of Chicago',
      },
    ],
    memberOf: [
      { '@type': 'Organization', name: 'Savant Wealth' },
      { '@type': 'Organization', name: 'Mesirow' },
      { '@type': 'Organization', name: 'Akuna Capital' },
      { '@type': 'Organization', name: 'SpiderRock Platform' },
      { '@type': 'Organization', name: 'Citadel, LLC' },
      { '@type': 'Organization', name: 'GE Medical' },
      { '@type': 'Organization', name: 'Motorola' },
      { '@type': 'Organization', name: 'FINOS Foundation' },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chicago',
      addressRegion: 'IL',
      addressCountry: 'US',
    },
    sameAs: [
      ...PROFILE.socials.map((s) => s.href),
      'https://about.me/Christopher.R.McGuire',
      'https://www.pinterest.com/crmcguire74/',
    ],
    knowsAbout: [
      'Software Engineering Leadership',
      'UX/UI Design',
      'Design Systems',
      'Frontend Architecture',
      'Full-Stack Development',
      'Applied AI & LLM Systems',
      'FinTech Architecture',
      'Fractional CTO',
      'Product Strategy',
      'Engineering Team Building',
    ],
  };
}

/** Person without its own @context, for nesting as `mainEntity`. */
export function personEntity(): Record<string, unknown> {
  const { '@context': _ctx, ...entity } = personSchema();
  return entity;
}

export function organizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Paguire',
    alternateName: 'Christopher R McGuire — Paguire',
    url: `${SITE_URL}/`,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/paguireLogo.webp`,
      width: 402,
      height: 288,
    },
    image: PROFILE_PORTRAIT_IMAGE,
    description:
      'Engineering leadership, UX/UI design systems and applied AI products by Christopher R McGuire.',
    founder: { '@id': `${SITE_URL}/#person` },
    email: PROFILE.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chicago',
      addressRegion: 'IL',
      addressCountry: 'US',
    },
    sameAs: PROFILE.socials.map((s) => s.href),
  };
}

export function websiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    description:
      'Portfolio, executive dossier, shipped AI products, and published essays by Christopher R McGuire.',
    author: { '@id': `${SITE_URL}/#person` },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

export function professionalServiceSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Christopher R McGuire — Engineering, UX/UI & AI Advisory',
    url: `${SITE_URL}/`,
    image: PROFILE_PORTRAIT_IMAGE,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chicago',
      addressRegion: 'IL',
      addressCountry: 'US',
    },
    description:
      'Executive software engineering leadership, UX/UI design systems architecture, and AI-augmented product strategy consulting in Chicago.',
    areaServed: {
      '@type': 'City',
      name: 'Chicago',
    },
    provider: {
      '@type': 'Person',
      name: PROFILE.name,
    },
    serviceType: [
      'Software Engineering Leadership',
      'UX/UI Design Systems Consulting',
      'Applied AI & LLM Architecture',
      'Fractional CTO',
      'Product Strategy',
    ],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path),
    })),
  };
}

export function blogPostingSchema(article: FullArticle): Record<string, unknown> {
  const parsedDate = new Date(article.date);
  const isoDate = Number.isNaN(parsedDate.getTime())
    ? '2026-03-06'
    : parsedDate.toISOString().split('T')[0];

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    image: toAbsoluteUrl(article.coverImage),
    datePublished: isoDate,
    dateModified: isoDate,
    author: {
      '@type': 'Person',
      name: PROFILE.name,
      url: `${SITE_URL}/`,
    },
    publisher: {
      '@type': 'Person',
      name: PROFILE.name,
      url: `${SITE_URL}/`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': toAbsoluteUrl(`/blog/posts/${article.slug}`),
    },
    articleSection: article.kicker,
    keywords: article.categories.join(', '),
  };
}

export function renderSeoHeadTags(seo: SeoConfig): string {
  const canonicalUrl = toAbsoluteUrl(seo.path);
  const ogTitle = seo.ogTitle || seo.title;
  const ogDesc = seo.ogDescription || seo.description;
  const ogImageUrl = toAbsoluteUrl(seo.ogImage || DEFAULT_OG_IMAGE);
  const ogType = seo.ogType || 'website';
  const robots = seo.robots || 'index, follow, max-image-preview:large, max-snippet:-1';
  const keywords =
    seo.keywords ||
    'Christopher R McGuire, Christopher McGuire, Paguire, SVP Software Engineering, UX/UI Design, Design Systems, Applied AI, Savant Wealth, Mesirow, Citadel, Akuna Capital, SpiderRock, Chicago';

  const articleTagsHtml =
    ogType === 'article'
      ? [
          seo.publishedTime
            ? `<meta property="article:published_time" content="${esc(seo.publishedTime)}" />`
            : '',
          `<meta property="article:author" content="${esc(PROFILE.name)}" />`,
          ...(seo.articleTags || []).map(
            (tag) => `<meta property="article:tag" content="${esc(tag)}" />`
          ),
        ]
          .filter(Boolean)
          .join('\n    ')
      : '';

  const schemasHtml = (seo.jsonLd || [])
    .map(
      (schema) =>
        `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
    )
    .join('\n    ');

  return `    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="${esc(robots)}" />
    <meta name="author" content="${esc(PROFILE.name)}" />
    <title>${esc(seo.title)}</title>
    <meta name="description" content="${esc(seo.description)}" />
    <meta name="keywords" content="${esc(keywords)}" />
    <link rel="canonical" href="${esc(canonicalUrl)}" />
    <link rel="alternate" type="application/rss+xml" title="Christopher R McGuire's Blog" href="/feed.xml" />

    <!-- Open Graph -->
    <meta property="og:type" content="${esc(ogType)}" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="Christopher R McGuire — Paguire" />
    <meta property="og:url" content="${esc(canonicalUrl)}" />
    <meta property="og:title" content="${esc(ogTitle)}" />
    <meta property="og:description" content="${esc(ogDesc)}" />
    <meta property="og:image" content="${esc(ogImageUrl)}" />
    <meta property="og:image:secure_url" content="${esc(ogImageUrl)}" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="${OG_IMAGE_WIDTH}" />
    <meta property="og:image:height" content="${OG_IMAGE_HEIGHT}" />
    <meta property="og:image:alt" content="${esc(ogTitle)}" />
    ${articleTagsHtml}

    <!-- Twitter / X -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@crmcguire74" />
    <meta name="twitter:creator" content="@crmcguire74" />
    <meta name="twitter:url" content="${esc(canonicalUrl)}" />
    <meta name="twitter:title" content="${esc(ogTitle)}" />
    <meta name="twitter:description" content="${esc(ogDesc)}" />
    <meta name="twitter:image" content="${esc(ogImageUrl)}" />
    <meta name="twitter:image:alt" content="${esc(ogTitle)}" />

    <!-- Icons & Web Manifest -->
    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
    <link rel="icon" type="image/png" sizes="128x128" href="/favicon-128x128.png" />
    <link rel="icon" type="image/png" sizes="196x196" href="/favicon-196x196.png" />
    <link rel="icon" type="image/webp" href="/images/paguireLogo.webp" />
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png" />
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png" />
    <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png" />
    <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
    <link rel="apple-touch-icon" sizes="192x192" href="/apple-touch-icon-192x192.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="theme-color" content="#030508" />

    <!-- Fonts & Styles -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Outfit:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="/src/index.css" />
    ${schemasHtml}`;
}

export function buildSitemapXml(routes: { path: string; lastmod: string; changefreq: string; priority: string }[]): string {
  const allEntries = [
    ...routes,
    {
      path: '/Christopher_R_McGuire-SVP_of_Software_Engineering_UX_UI.pdf',
      lastmod: '2026-11-22',
      changefreq: 'monthly',
      priority: '0.8',
    },
    {
      path: '/Christopher_R_McGuire-Portfolio.pdf',
      lastmod: '2026-11-22',
      changefreq: 'monthly',
      priority: '0.7',
    },
  ];
  const urls = allEntries
    .map(
      (r) => `  <url>
    <loc>${esc(toAbsoluteUrl(r.path))}</loc>
    <lastmod>${esc(r.lastmod)}</lastmod>
    <changefreq>${esc(r.changefreq)}</changefreq>
    <priority>${esc(r.priority)}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export function buildRobotsTxt(): string {
  return `User-agent: *
Allow: /

# Allow AI & LLM indexing crawlers
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: CCBot
Allow: /

Disallow: /temp/
Disallow: /private/

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

export function buildFeedXml(): string {
  const items = ARTICLES.map((article) => {
    const d = new Date(article.date);
    const pubDate = Number.isNaN(d.getTime()) ? new Date('2026-03-06').toUTCString() : d.toUTCString();
    const link = toAbsoluteUrl(`/blog/posts/${article.slug}`);
    return `    <item>
      <title>${esc(article.title)}</title>
      <description>${esc(article.excerpt)}</description>
      <link>${esc(link)}</link>
      <guid isPermaLink="true">${esc(link)}</guid>
      <pubDate>${esc(pubDate)}</pubDate>
      ${article.categories.map((cat) => `<category>${esc(cat)}</category>`).join('')}
    </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Christopher R McGuire's Blog</title>
    <description>Essays and insights on UX/UI design, software engineering leadership, fintech systems, and applied AI.</description>
    <link>${SITE_URL}/blog/</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date('2026-03-06T12:00:00Z').toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}

export function buildWebManifest(): string {
  return JSON.stringify(
    {
      name: 'Christopher R McGuire — Paguire',
      short_name: 'Paguire',
      description:
        'Portfolio, executive dossier, shipped AI products, and published essays by Christopher R McGuire.',
      start_url: '/',
      display: 'standalone',
      background_color: '#030508',
      theme_color: '#00A6FF',
      icons: [
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    null,
    2
  );
}
