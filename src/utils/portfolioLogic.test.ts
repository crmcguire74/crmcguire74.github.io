import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterArticles,
  paginateItems,
  filterProjects,
  validateContactForm,
  validateNewsletterEmail,
  getStoryChapterIndex,
  resolveActiveChapterIndex,
  getActiveRoleIndexByTops,
  type ArticleSummary,
  type ProjectSummary,
} from './portfolioLogic';

const sampleArticles: ArticleSummary[] = [
  {
    slug: 'why-fintech',
    title: 'Why FinTech Companies Need Dedicated UX Teams',
    date: 'February 27, 2026',
    readTime: '12 min read',
    excerpt: 'Trust, regulatory precision, and Citadel lessons.',
    categories: ['UX', 'Fintech', 'Design'],
  },
  {
    slug: 'ai-products',
    title: 'Building AI Products With UX Rigor',
    date: 'February 28, 2026',
    readTime: '7 min read',
    excerpt: 'Design for uncertainty and observability.',
    categories: ['AI', 'UX', 'Development'],
  },
  {
    slug: 'job-titles',
    title: 'The Impact of Job Titles in Software Engineering',
    date: 'April 12, 2023',
    readTime: '8 min read',
    excerpt: 'Hiring pipelines and engineering career ladders.',
    categories: ['Career', 'Business'],
  },
];

const sampleProjects: ProjectSummary[] = [
  {
    id: 'modus',
    title: 'Modus AI',
    filterGroup: 'AI & LLM',
    description: 'Spatial interior design with furniture preservation.',
    tags: ['AI', 'iOS'],
  },
  {
    id: 'fiscal',
    title: 'Fiscal Compass',
    filterGroup: 'FinTech',
    description: 'Privacy-first financial calculators.',
    tags: ['React', 'FinTech'],
  },
];

test('filterArticles filters by category and search query', () => {
  const byCat = filterArticles(sampleArticles, '', 'Fintech');
  assert.equal(byCat.length, 1);
  assert.equal(byCat[0].slug, 'why-fintech');

  const byQuery = filterArticles(sampleArticles, 'Citadel', 'All');
  assert.equal(byQuery.length, 1);
  assert.equal(byQuery[0].slug, 'why-fintech');

  const combinedEmpty = filterArticles(sampleArticles, 'Citadel', 'AI');
  assert.equal(combinedEmpty.length, 0);
});

test('paginateItems clamps page numbers and slices cleanly', () => {
  const items = Array.from({ length: 10 }, (_, i) => i + 1);
  const page1 = paginateItems(items, 1, 6);
  assert.deepEqual(page1.items, [1, 2, 3, 4, 5, 6]);
  assert.equal(page1.totalPages, 2);

  const page2 = paginateItems(items, 2, 6);
  assert.deepEqual(page2.items, [7, 8, 9, 10]);

  const outOfRange = paginateItems(items, 99, 6);
  assert.equal(outOfRange.currentPage, 2);
});

test('filterProjects matches selected filter group', () => {
  assert.equal(filterProjects(sampleProjects, 'All').length, 2);
  assert.equal(filterProjects(sampleProjects, 'FinTech')[0].id, 'fiscal');
});

test('validateContactForm enforces all required fields and email format', () => {
  const bad = validateContactForm({
    name: 'A',
    email: 'invalid-email',
    subject: '',
    message: 'Too short',
  });
  assert.equal(bad.valid, false);
  assert.ok(bad.errors.name);
  assert.ok(bad.errors.email);
  assert.ok(bad.errors.subject);
  assert.ok(bad.errors.message);

  const good = validateContactForm({
    name: 'Jane Doe',
    email: 'jane@example.com',
    subject: 'Advisory Role',
    message: 'Looking to collaborate on our fintech UX transformation.',
  });
  assert.equal(good.valid, true);
  assert.deepEqual(good.errors, {});
});

test('validateNewsletterEmail validates email cleanly', () => {
  assert.equal(validateNewsletterEmail('bad@').valid, false);
  assert.equal(validateNewsletterEmail('leader@firm.com').valid, true);
});

test('getStoryChapterIndex maps scroll progress safely across chapters', () => {
  assert.equal(getStoryChapterIndex(0, 6), 0);
  assert.equal(getStoryChapterIndex(0.5, 6), 3);
  assert.equal(getStoryChapterIndex(1, 6), 5);
  assert.equal(getStoryChapterIndex(-0.2, 6), 0);
});

test('resolveActiveChapterIndex picks highest visibility chapter and respects fallback', () => {
  assert.equal(resolveActiveChapterIndex([0.1, 0.72, 0.25], 0), 1);
  assert.equal(resolveActiveChapterIndex([0, 0, 0], 4), 2);
  assert.equal(resolveActiveChapterIndex([], 3), 0);
});

test('getActiveRoleIndexByTops locks first role until next card crosses triggerY', () => {
  assert.equal(getActiveRoleIndexByTops([], 144), 0);
  assert.equal(getActiveRoleIndexByTops([420, 640, 860], 144), 0);
  assert.equal(getActiveRoleIndexByTops([90, 310, 530], 144), 0);
  assert.equal(getActiveRoleIndexByTops([-130, 144, 360], 144), 1);
  assert.equal(getActiveRoleIndexByTops([-420, -180, 110, 340], 144), 2);
});

