import { ARTICLES } from '../../data/articles';
import {
  ARTICLES_PER_PAGE,
  filterArticles,
  paginateItems,
  validateNewsletterEmail,
  type ArticleCategory,
} from '../../utils/portfolioLogic';
import { updatePillTabButtons } from '../dom';

export function initLibraryPage(): void {
  const searchInput = document.getElementById('library-search') as HTMLInputElement | null;
  const categoryBtns = document.querySelectorAll<HTMLButtonElement>('[data-library-category]');
  const articleCount = document.getElementById('library-article-count');
  const emptyState = document.getElementById('library-empty-state');
  const resetBtn = document.getElementById('library-reset-btn');
  const grid = document.getElementById('library-articles-grid');
  const paginationNav = document.getElementById('library-pagination');
  const prevBtn = document.getElementById('library-prev-page') as HTMLButtonElement | null;
  const nextBtn = document.getElementById('library-next-page') as HTMLButtonElement | null;
  const pageNumbersContainer = document.getElementById('library-page-numbers');

  const cardMap = new Map<string, HTMLElement>();
  document.querySelectorAll<HTMLElement>('[data-article-card]').forEach((card) => {
    const slug = card.getAttribute('data-article-slug');
    if (slug) cardMap.set(slug, card);
  });

  let activeCategory: ArticleCategory = 'All';
  let query = '';
  let currentPage = 1;

  const renderState = () => {
    const filtered = filterArticles(ARTICLES, query, activeCategory);
    const paged = paginateItems(filtered, currentPage, ARTICLES_PER_PAGE);
    currentPage = paged.currentPage;

    if (articleCount) {
      articleCount.textContent = `${filtered.length} ${
        filtered.length === 1 ? 'article' : 'articles'
      } available`;
    }

    const visibleSlugs = new Set(paged.items.map((a) => a.slug));
    cardMap.forEach((card, slug) => {
      card.classList.toggle('hidden', !visibleSlugs.has(slug));
    });

    if (emptyState && grid) {
      const isEmpty = filtered.length === 0;
      emptyState.classList.toggle('hidden', !isEmpty);
      grid.classList.toggle('hidden', isEmpty);
    }

    if (paginationNav && pageNumbersContainer && prevBtn && nextBtn) {
      paginationNav.classList.toggle('hidden', paged.totalPages <= 1);
      prevBtn.disabled = paged.currentPage === 1;
      nextBtn.disabled = paged.currentPage === paged.totalPages;

      pageNumbersContainer.innerHTML = Array.from(
        { length: paged.totalPages },
        (_, i) => i + 1
      )
        .map((num) => {
          const active = num === paged.currentPage;
          return `<button
            type="button"
            data-library-page="${num}"
            ${active ? 'aria-current="page"' : ''}
            class="w-10 h-10 rounded-lg font-mono-tabular text-xs font-semibold cursor-pointer transition-colors ${
              active
                ? 'bg-[#00A6FF] text-[#030508]'
                : 'border border-white/10 bg-[#090E18] text-slate-300 hover:text-white'
            }"
          >${num}</button>`;
        })
        .join('\n');

      pageNumbersContainer
        .querySelectorAll<HTMLButtonElement>('[data-library-page]')
        .forEach((btn) => {
          btn.addEventListener('click', () => {
            currentPage = Number(btn.getAttribute('data-library-page') || '1');
            renderState();
          });
        });
    }
  };

  searchInput?.addEventListener('input', () => {
    query = searchInput.value;
    currentPage = 1;
    renderState();
  });

  categoryBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeCategory = (btn.getAttribute('data-library-category') || 'All') as ArticleCategory;
      currentPage = 1;
      updatePillTabButtons('[data-library-category]', 'data-library-category', activeCategory);
      renderState();
    });
  });

  resetBtn?.addEventListener('click', () => {
    query = '';
    activeCategory = 'All';
    currentPage = 1;
    if (searchInput) searchInput.value = '';
    updatePillTabButtons('[data-library-category]', 'data-library-category', 'All');
    renderState();
  });

  prevBtn?.addEventListener('click', () => {
    currentPage = Math.max(1, currentPage - 1);
    renderState();
  });

  nextBtn?.addEventListener('click', () => {
    currentPage += 1;
    renderState();
  });

  // Wire initial page buttons on SSR hydration
  pageNumbersContainer
    ?.querySelectorAll<HTMLButtonElement>('[data-library-page]')
    .forEach((btn) => {
      btn.addEventListener('click', () => {
        currentPage = Number(btn.getAttribute('data-library-page') || '1');
        renderState();
      });
    });

  // Newsletter subscription wired to Supabase REST endpoint matching paguire.com
  const SUPABASE_SUBSCRIBERS_URL = 'https://qearvuhyixzivublbiyu.supabase.co/rest/v1/subscribers';
  const SUPABASE_ANON_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlYXJ2dWh5aXh6aXZ1YmxiaXl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyMDAzNzIsImV4cCI6MjA1ODc3NjM3Mn0.TkzyQEIakL43DTedLXET0lr6mK5lp_wom_FqsXUzV-8';

  const newsletterForm = document.getElementById('newsletter-form') as HTMLFormElement | null;
  const newsletterEmail = document.getElementById('newsletter-email') as HTMLInputElement | null;
  const newsletterError = document.getElementById('newsletter-error');
  const newsletterSuccess = document.getElementById('newsletter-success');
  const newsletterSuccessText = document.getElementById('newsletter-success-text');
  const newsletterBtn = newsletterForm?.querySelector<HTMLButtonElement>('button[type="submit"]');

  newsletterForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailVal = (newsletterEmail?.value || '').trim();
    const check = validateNewsletterEmail(emailVal);
    if (!check.valid) {
      if (newsletterError) {
        newsletterError.textContent = check.errors.email || 'Invalid email address.';
        newsletterError.classList.remove('hidden');
      }
      return;
    }

    if (newsletterError) newsletterError.classList.add('hidden');
    if (newsletterEmail) newsletterEmail.disabled = true;
    if (newsletterBtn) {
      newsletterBtn.disabled = true;
      newsletterBtn.textContent = 'Subscribing...';
    }

    try {
      const res = await fetch(SUPABASE_SUBSCRIBERS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({ email: emailVal }),
      });

      if (res.ok) {
        newsletterForm.classList.add('hidden');
        if (newsletterSuccessText) {
          newsletterSuccessText.textContent = `Confirmed — subscribed with ${emailVal}.`;
        }
        newsletterSuccess?.classList.remove('hidden');
        return;
      }

      const errBody = (await res.json().catch(() => ({}))) as { code?: string; message?: string };
      if (errBody.code === '23505' || res.status === 409) {
        if (newsletterError) {
          newsletterError.textContent = `${emailVal} is already subscribed to the newsletter.`;
          newsletterError.classList.remove('hidden');
        }
      } else {
        if (newsletterError) {
          newsletterError.textContent =
            errBody.message || 'Subscription could not be processed right now. Please try again.';
          newsletterError.classList.remove('hidden');
        }
      }
    } catch {
      if (newsletterError) {
        newsletterError.textContent = 'Network error while subscribing. Please try again.';
        newsletterError.classList.remove('hidden');
      }
    } finally {
      if (newsletterEmail) newsletterEmail.disabled = false;
      if (newsletterBtn) {
        newsletterBtn.disabled = false;
        newsletterBtn.textContent = 'Subscribe';
      }
    }
  });
}
