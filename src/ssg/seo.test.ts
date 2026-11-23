import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { getAllStaticRoutes } from './generate';
import { renderPageDocument } from './layout';
import { NOT_FOUND_SEO, renderNotFoundPage } from './pages/notFound';
import { HOME_SEO } from './pages/home';
import {
  buildFeedXml,
  buildRobotsTxt,
  buildSitemapXml,
  buildWebManifest,
  normalizeInternalPageLinks,
  SITE_URL,
  withTrailingSlash,
} from './seo';

const ROOT_DIR = path.resolve(import.meta.dirname, '..', '..');

test('every static route renders valid SEO metadata and zero React references', () => {
  const routes = getAllStaticRoutes();
  assert.equal(routes.length, 21, 'Expected 11 main routes + 10 blog article routes = 21 routes');

  const seenTitles = new Set<string>();
  const seenCanonicals = new Set<string>();

  for (const route of routes) {
    const html = renderPageDocument({
      pageId: route.pageId,
      currentRoute: route.routePath,
      seo: route.seo,
      mainHtml: route.render(),
    });

    assert.match(html, /^<!doctype html>/i);
    assert.match(html, /<html lang="en" dir="ltr"/);
    assert.match(html, /<title>[^<]+<\/title>/);
    assert.match(html, /<meta name="description" content="[^"]+"/);
    assert.match(html, /<meta property="og:title" content="[^"]+"/);
    assert.match(html, /<meta property="og:description" content="[^"]+"/);
    assert.match(html, /<meta property="og:image" content="https:\/\/paguire\.com\/[^"]+"/);
    assert.match(html, /<meta property="og:image:alt" content="[^"]+"/);
    assert.match(html, /<meta name="twitter:card" content="summary_large_image"/);
    assert.match(html, /<meta name="twitter:site" content="@crmcguire74"/);
    assert.match(html, /<meta name="twitter:image:alt" content="[^"]+"/);
    assert.match(html, /<link rel="icon" href="\/favicon\.ico"/);
    assert.match(html, /<link rel="icon" type="image\/png" sizes="32x32" href="\/favicon-32x32\.png"/);
    assert.match(html, /<link rel="apple-touch-icon" sizes="180x180" href="\/apple-touch-icon-180x180\.png"/);
    assert.match(html, /<script type="application\/ld\+json">/);
    assert.match(html, /<link rel="alternate" type="application\/rss\+xml"[^>]+href="\/feed\.xml"/);
    assert.match(html, /<script type="module" src="\/src\/client\/main\.ts"><\/script>/);
    assert.doesNotMatch(html, /src\/main\.tsx/);
    assert.doesNotMatch(html, /react-dom/i);

    const expectedCanonical =
      route.routePath === '/' ? `${SITE_URL}/` : `${SITE_URL}${route.routePath}/`;
    assert.ok(
      html.includes(`<link rel="canonical" href="${expectedCanonical}"`),
      `Missing canonical URL ${expectedCanonical} in ${route.routePath}`
    );

    assert.ok(!seenTitles.has(route.seo.title), `Duplicate title: ${route.seo.title}`);
    seenTitles.add(route.seo.title);

    assert.ok(!seenCanonicals.has(expectedCanonical), `Duplicate canonical: ${expectedCanonical}`);
    seenCanonicals.add(expectedCanonical);
  }
});

test('home, biography, and contact pages include audited schema, narrative updates, and form attributes', () => {
  const routes = new Map(getAllStaticRoutes().map((r) => [r.routePath, r]));

  const homeHtml = renderPageDocument({
    pageId: 'home',
    currentRoute: '/',
    seo: routes.get('/')!.seo,
    mainHtml: routes.get('/')!.render(),
  });
  assert.match(homeHtml, /School of the Art Institute of Chicago/);
  assert.match(homeHtml, /Christopher Patrick/);

  const bioHtml = routes.get('/biography')!.render();
  assert.match(bioHtml, /83 Pleasant View Avenue in Oakville/);
  assert.match(bioHtml, /Griffin School/);
  assert.match(bioHtml, /Vogel School/);
  assert.match(bioHtml, /Torrington High School/);
  assert.match(bioHtml, /Theta Tau/);
  assert.match(bioHtml, /2605 W Carmen Ave/);
  assert.match(bioHtml, /Lincoln Square/);
  assert.match(bioHtml, /Thrive Financial concept and designs were born/);
  assert.match(bioHtml, /Director of WiseOS/);
  assert.match(bioHtml, /Savant Wealth/);
  assert.match(bioHtml, /bio-highlights-video/);
  assert.match(bioHtml, /tBkEzWZsmx4/);
  assert.match(bioHtml, /\/assets\/aistudio\/ChristopherWorkingWithTradingApps\.webp/);
  assert.doesNotMatch(bioHtml, /data-bio-prop="train"/);
  assert.doesNotMatch(bioHtml, /bg-amber-300\/75/);
  assert.doesNotMatch(bioHtml, /id="bio-2019"[\s\S]*data-bio-stroke="1400"/);
  assert.match(bioHtml, /\/assets\/aistudio\/ThriveFinancial_694601f5\.webp/);
  assert.match(bioHtml, /\/assets\/aistudio\/Modus_AI_e260817c\.webp/);
  assert.ok(
    fs.existsSync(path.join(ROOT_DIR, 'public/assets/aistudio/ChristopherRMcGuireProfile_9d49b2b1.webp')),
    'Expected stored profile WebP asset'
  );
  const bio2026Idx = bioHtml.indexOf('id="bio-2026"');
  assert.ok(bio2026Idx > -1, 'Expected bio-2026 chapter');
  assert.doesNotMatch(bioHtml.slice(bio2026Idx), /<circle\b/);
  assert.doesNotMatch(bioHtml.slice(bio2026Idx), /data-bio-prop="orbit"/);

  const contactHtml = routes.get('/contact')!.render();
  assert.match(contactHtml, /data-netlify="true"/);
  assert.match(contactHtml, /What I&apos;m Building/);

  const libraryHtml = routes.get('/blog')!.render();
  assert.match(libraryHtml, /\/assets\/aistudio\/Focused_trader_at_Chicago_workstation\.webp/);
  assert.match(libraryHtml, /\/images\/blog-frontend\.webp/);
  assert.match(libraryHtml, /\/images\/blog-web-ui\.webp/);
  assert.match(libraryHtml, /\/images\/blog-job-titles\.webp/);
  assert.match(libraryHtml, /\/images\/blog-fullstack\.webp/);
});

test('404 page enforces noindex and renders cleanly', () => {
  const html = renderPageDocument({
    pageId: 'not-found',
    currentRoute: '/404',
    seo: NOT_FOUND_SEO,
    mainHtml: renderNotFoundPage(),
  });
  assert.match(html, /<meta name="robots" content="noindex, follow"/);
  assert.match(html, /ERROR 404/);
});

test('sitemap.xml, robots.txt, manifest, and feed.xml contain valid URLs and updated routes', () => {
  const routes = getAllStaticRoutes();
  const sitemap = buildSitemapXml(
    routes.map((r) => ({
      path: r.routePath,
      lastmod: r.lastmod,
      changefreq: r.changefreq,
      priority: r.priority,
    }))
  );
  assert.match(sitemap, /<loc>https:\/\/paguire\.com\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/paguire\.com\/projects\/modus-ai\/<\/loc>/);
  assert.match(
    sitemap,
    /<loc>https:\/\/paguire\.com\/Christopher_R_McGuire-SVP_of_Software_Engineering_UX_UI\.pdf<\/loc>/
  );
  assert.match(
    sitemap,
    /<loc>https:\/\/paguire\.com\/blog\/posts\/why-fintech-companies-need-dedicated-ux-teams\/<\/loc>/
  );

  const robots = buildRobotsTxt();
  assert.match(robots, /Sitemap: https:\/\/paguire\.com\/sitemap\.xml/);
  assert.match(robots, /User-agent: GPTBot/);

  const manifest = buildWebManifest();
  assert.match(manifest, /\/android-chrome-192x192\.png/);
  assert.match(manifest, /\/android-chrome-512x512\.png/);

  const feed = buildFeedXml();
  assert.match(feed, /<rss version="2\.0"/);
  assert.match(feed, /<guid isPermaLink="true">https:\/\/paguire\.com\/blog\/posts\//);
});

test('all referenced local asset paths in generated HTML exist in public/', () => {
  const routes = getAllStaticRoutes();
  const missing = new Set<string>();
  const assetRegex = /(?:src|href)="(\/(?:assets|images)\/[^"]+|\/Christopher_[^"]+\.pdf|\/favicon[^"]*\.png|\/apple-touch-icon[^"]*\.png|\/favicon\.ico)"/g;

  for (const route of routes) {
    const docHtml = renderPageDocument({
      pageId: route.pageId,
      currentRoute: route.routePath,
      seo: route.seo,
      mainHtml: route.render(),
    });
    let match: RegExpExecArray | null;
    while ((match = assetRegex.exec(docHtml)) !== null) {
      const rel = match[1];
      if (rel.startsWith('/assets/') || rel.startsWith('/images/')) {
        assert.match(rel, /\.webp$/, `Expected WebP site image, found ${rel} on ${route.routePath}`);
      }
      const diskPath = path.join(ROOT_DIR, 'public', rel.replace(/^\//, ''));
      if (!fs.existsSync(diskPath)) {
        missing.add(rel);
      }
    }
  }

  assert.deepEqual([...missing], [], `Missing static assets in public/: ${[...missing].join(', ')}`);
});

test('Ahrefs audit: canonical-safe links, title/description lengths, Organization schema', () => {
  assert.equal(withTrailingSlash('/resume'), '/resume/');
  assert.equal(withTrailingSlash('/contact#form'), '/contact/#form');
  assert.equal(withTrailingSlash('/feed.xml'), '/feed.xml');
  assert.equal(withTrailingSlash('/'), '/');

  for (const route of getAllStaticRoutes()) {
    const html = normalizeInternalPageLinks(
      renderPageDocument({
        pageId: route.pageId,
        currentRoute: route.routePath,
        seo: route.seo,
        mainHtml: route.render(),
      })
    );

    assert.ok(route.seo.title.length <= 60, `Title too long (${route.seo.title.length}) on ${route.routePath}`);
    assert.ok(
      route.seo.description.length <= 160,
      `Meta description too long (${route.seo.description.length}) on ${route.routePath}`
    );

    // Every internal page link must point at the served (trailing-slash) URL, not a 301.
    for (const [, href] of html.matchAll(/href="(\/[^"]*)"/g)) {
      const base = href.split(/[?#]/)[0];
      if (base === '/' || /\.[a-z0-9]+$/i.test(base) || base.startsWith('/src/')) continue;
      assert.ok(base.endsWith('/'), `Internal link ${href} redirects (missing trailing slash) on ${route.routePath}`);
    }
  }

  const homeHtml = HOME_SEO.jsonLd!.map((s) => JSON.stringify(s)).join('');
  assert.match(homeHtml, /"@type":"Organization"/);
  assert.match(homeHtml, /"logo":\{"@type":"ImageObject"/);
});
