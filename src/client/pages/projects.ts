import { PROJECTS } from '../../data/siteData';
import { filterProjects, type ProjectFilter } from '../../utils/portfolioLogic';
import { updatePillTabButtons } from '../dom';

export function initProjectsPage(): void {
  const filterBtns = document.querySelectorAll<HTMLButtonElement>('[data-project-filter]');
  const cards = document.querySelectorAll<HTMLElement>('[data-project-card]');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selected = (btn.getAttribute('data-project-filter') || 'All') as ProjectFilter;
      updatePillTabButtons('[data-project-filter]', 'data-project-filter', selected);

      const allowedTitles = new Set(filterProjects(PROJECTS, selected).map((p) => p.title));
      cards.forEach((card) => {
        const group = card.getAttribute('data-project-group');
        const titleEl = card.querySelector('h2');
        const title = titleEl?.textContent?.trim() || '';
        const visible =
          selected === 'All' || group === selected || allowedTitles.has(title);
        card.classList.toggle('hidden', !visible);
        if (visible) {
          card.classList.add('is-visible');
        }
      });
    });
  });
}
