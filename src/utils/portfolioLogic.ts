export type ArticleCategory =
  | 'All'
  | 'Design'
  | 'Development'
  | 'Career'
  | 'AI'
  | 'Business'
  | 'UX'
  | 'Fintech';

export interface ArticleSummary {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  categories: Exclude<ArticleCategory, 'All'>[];
}

export type ProjectFilter =
  | 'All'
  | 'AI & LLM'
  | 'FinTech'
  | 'Web & Interactive'
  | 'Design Tools'
  | 'Publications';

export interface ProjectSummary {
  id: string;
  title: string;
  filterGroup: Exclude<ProjectFilter, 'All'>;
  description: string;
  tags: string[];
}

export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export const ARTICLES_PER_PAGE = 6;

export function filterArticles<T extends ArticleSummary>(
  articles: T[],
  query: string,
  category: ArticleCategory
): T[] {
  const normalized = query.trim().toLowerCase();
  return articles.filter((article) => {
    const matchesCategory =
      category === 'All' || article.categories.includes(category);
    if (!matchesCategory) return false;
    if (!normalized) return true;
    return (
      article.title.toLowerCase().includes(normalized) ||
      article.excerpt.toLowerCase().includes(normalized) ||
      article.categories.some((c) => c.toLowerCase().includes(normalized))
    );
  });
}

export function paginateItems<T>(
  items: T[],
  page: number,
  perPage: number = ARTICLES_PER_PAGE
): { items: T[]; currentPage: number; totalPages: number } {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    currentPage,
    totalPages,
  };
}

export function filterProjects<T extends ProjectSummary>(
  projects: T[],
  filter: ProjectFilter
): T[] {
  if (filter === 'All') return projects;
  return projects.filter((p) => p.filterGroup === filter);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

export function validateContactForm(input: ContactFormInput): ValidationResult {
  const errors: Record<string, string> = {};
  if (input.name.trim().length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }
  if (!isValidEmail(input.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!input.subject.trim()) {
    errors.subject = 'Please select an inquiry subject.';
  }
  if (input.message.trim().length < 10) {
    errors.message = 'Please include a brief message (at least 10 characters).';
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateNewsletterEmail(email: string): ValidationResult {
  const errors: Record<string, string> = {};
  if (!isValidEmail(email)) {
    errors.email = 'Enter a valid email address to subscribe.';
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function getStoryChapterIndex(progress: number, totalChapters: number): number {
  if (totalChapters <= 1) return 0;
  const clamped = Math.min(Math.max(progress, 0), 0.9999);
  return Math.floor(clamped * totalChapters);
}

export function resolveActiveChapterIndex(scrollRatios: number[], fallbackIndex = 0): number {
  if (!scrollRatios.length) return 0;
  let bestIdx = Math.max(0, Math.min(scrollRatios.length - 1, fallbackIndex));
  let bestScore = 0;
  scrollRatios.forEach((ratio, idx) => {
    if (Number.isFinite(ratio) && ratio > bestScore) {
      bestScore = ratio;
      bestIdx = idx;
    }
  });
  return bestIdx;
}

export function getActiveRoleIndexByTops(cardTops: number[], triggerY: number): number {
  if (!cardTops.length) return 0;
  let activeIdx = 0;
  for (let i = 0; i < cardTops.length; i++) {
    if (Number.isFinite(cardTops[i]) && cardTops[i] <= triggerY) {
      activeIdx = i;
    }
  }
  return activeIdx;
}

