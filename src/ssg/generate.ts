import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ARTICLES } from '../data/articles';
import { renderPageDocument } from './layout';
import { AI_EXPLORATIONS_SEO, renderAiExplorationsPage } from './pages/aiExplorations';
import { getArticleSeo, renderArticleReaderPage } from './pages/articleReader';
import { BIOGRAPHY_SEO, renderBiographyPage } from './pages/biography';
import { CONTACT_SEO, renderContactPage } from './pages/contact';
import { HOME_SEO, renderHomePage } from './pages/home';
import { LIBRARY_SEO, renderLibraryPage } from './pages/library';
import { NOT_FOUND_SEO, renderNotFoundPage } from './pages/notFound';
import {
  BLUEPRINT_SEO,
  MODUS_AI_SEO,
  MODUS_PRIVACY_SEO,
  renderBlueprintPage,
  renderModusAiPage,
  renderModusPrivacyPage,
  renderSnapClipperPage,
  SNAPCLIPPER_SEO,
} from './pages/productDetails';
import { PROJECTS_SEO, renderProjectsPage } from './pages/projects';
import { renderResumePage, RESUME_SEO } from './pages/resume';
import {
  buildFeedXml,
  buildRobotsTxt,
  buildSitemapXml,
  buildWebManifest,
  normalizeInternalPageLinks,
  type SeoConfig,
} from './seo';

export interface StaticRouteSpec {
  routePath: string;
  outFile: string;
  pageId: string;
  seo: SeoConfig;
  render: () => string;
  changefreq: string;
  priority: string;
  lastmod: string;
}

const DEFAULT_LASTMOD = '2026-11-22';

export function getAllStaticRoutes(): StaticRouteSpec[] {
  const staticPages: StaticRouteSpec[] = [
    {
      routePath: '/',
      outFile: 'index.html',
      pageId: 'home',
      seo: HOME_SEO,
      render: renderHomePage,
      changefreq: 'weekly',
      priority: '1.0',
      lastmod: DEFAULT_LASTMOD,
    },
    {
      routePath: '/biography',
      outFile: 'biography/index.html',
      pageId: 'biography',
      seo: BIOGRAPHY_SEO,
      render: renderBiographyPage,
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: DEFAULT_LASTMOD,
    },
    {
      routePath: '/resume',
      outFile: 'resume/index.html',
      pageId: 'resume',
      seo: RESUME_SEO,
      render: renderResumePage,
      changefreq: 'monthly',
      priority: '0.9',
      lastmod: DEFAULT_LASTMOD,
    },
    {
      routePath: '/projects',
      outFile: 'projects/index.html',
      pageId: 'projects',
      seo: PROJECTS_SEO,
      render: renderProjectsPage,
      changefreq: 'weekly',
      priority: '0.9',
      lastmod: DEFAULT_LASTMOD,
    },
    {
      routePath: '/projects/modus-ai',
      outFile: 'projects/modus-ai/index.html',
      pageId: 'modus-ai',
      seo: MODUS_AI_SEO,
      render: renderModusAiPage,
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: DEFAULT_LASTMOD,
    },
    {
      routePath: '/projects/modus-ai/privacy',
      outFile: 'projects/modus-ai/privacy/index.html',
      pageId: 'modus-privacy',
      seo: MODUS_PRIVACY_SEO,
      render: renderModusPrivacyPage,
      changefreq: 'yearly',
      priority: '0.4',
      lastmod: '2025-12-30',
    },
    {
      routePath: '/projects/snapclipper',
      outFile: 'projects/snapclipper/index.html',
      pageId: 'snapclipper',
      seo: SNAPCLIPPER_SEO,
      render: renderSnapClipperPage,
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: DEFAULT_LASTMOD,
    },
    {
      routePath: '/projects/blueprint',
      outFile: 'projects/blueprint/index.html',
      pageId: 'blueprint',
      seo: BLUEPRINT_SEO,
      render: renderBlueprintPage,
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: DEFAULT_LASTMOD,
    },
    {
      routePath: '/ai-explorations',
      outFile: 'ai-explorations/index.html',
      pageId: 'ai-explorations',
      seo: AI_EXPLORATIONS_SEO,
      render: renderAiExplorationsPage,
      changefreq: 'weekly',
      priority: '0.8',
      lastmod: DEFAULT_LASTMOD,
    },
    {
      routePath: '/blog',
      outFile: 'blog/index.html',
      pageId: 'blog',
      seo: LIBRARY_SEO,
      render: renderLibraryPage,
      changefreq: 'weekly',
      priority: '0.9',
      lastmod: DEFAULT_LASTMOD,
    },
    {
      routePath: '/contact',
      outFile: 'contact/index.html',
      pageId: 'contact',
      seo: CONTACT_SEO,
      render: renderContactPage,
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: DEFAULT_LASTMOD,
    },
  ];

  const articleRoutes: StaticRouteSpec[] = ARTICLES.map((article, idx) => {
    const nextArticle = ARTICLES[(idx + 1) % ARTICLES.length];
    const seo = getArticleSeo(article);
    return {
      routePath: `/blog/posts/${article.slug}`,
      outFile: `blog/posts/${article.slug}/index.html`,
      pageId: 'article',
      seo,
      render: () => renderArticleReaderPage(article, nextArticle),
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: seo.publishedTime || DEFAULT_LASTMOD,
    };
  });

  return [...staticPages, ...articleRoutes];
}

export function generateStaticSite(rootDir: string): { htmlFiles: string[]; publicFiles: string[] } {
  const routes = getAllStaticRoutes();
  const htmlFiles: string[] = [];

  for (const route of routes) {
    const html = normalizeInternalPageLinks(renderPageDocument({
      pageId: route.pageId,
      currentRoute: route.routePath,
      seo: route.seo,
      mainHtml: route.render(),
    }));
    const absPath = path.join(rootDir, route.outFile);
    fs.mkdirSync(path.dirname(absPath), { recursive: true });
    fs.writeFileSync(absPath, html, 'utf8');
    htmlFiles.push(route.outFile);
  }

  // Generate 404.html
  const notFoundHtml = normalizeInternalPageLinks(renderPageDocument({
    pageId: 'not-found',
    currentRoute: '/404',
    seo: NOT_FOUND_SEO,
    mainHtml: renderNotFoundPage(),
  }));
  fs.writeFileSync(path.join(rootDir, '404.html'), notFoundHtml, 'utf8');
  htmlFiles.push('404.html');

  // Generate public SEO feeds & metadata assets
  const publicDir = path.join(rootDir, 'public');
  fs.mkdirSync(publicDir, { recursive: true });

  const sitemapXml = buildSitemapXml(
    routes.map((r) => ({
      path: r.routePath,
      lastmod: r.lastmod,
      changefreq: r.changefreq,
      priority: r.priority,
    }))
  );
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), buildRobotsTxt(), 'utf8');
  fs.writeFileSync(path.join(publicDir, 'feed.xml'), buildFeedXml(), 'utf8');
  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), buildWebManifest(), 'utf8');

  return {
    htmlFiles,
    publicFiles: [
      'public/sitemap.xml',
      'public/robots.txt',
      'public/feed.xml',
      'public/site.webmanifest',
    ],
  };
}

// Execute immediately if invoked via CLI (`tsx src/ssg/generate.ts`)
const isDirectCli =
  typeof process !== 'undefined' &&
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectCli) {
  const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
  const result = generateStaticSite(rootDir);
  console.log(`Generated ${result.htmlFiles.length} static HTML pages and ${result.publicFiles.length} SEO manifests.`);
}
