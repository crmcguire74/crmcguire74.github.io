import { updatePillTabButtons } from '../dom';

export function initResumePage(): void {
  const filterBtns = document.querySelectorAll<HTMLButtonElement>('[data-resume-filter]');
  const roles = document.querySelectorAll<HTMLElement>('[data-resume-role]');

  if (!filterBtns.length || !roles.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-resume-filter') || 'all';
      updatePillTabButtons('[data-resume-filter]', 'data-resume-filter', selected);

      roles.forEach((card) => {
        const roleId = card.getAttribute('data-resume-role');
        const visible = selected === 'all' || roleId === selected;
        card.classList.toggle('hidden', !visible);
        if (visible) {
          card.classList.add('is-visible');
        }
      });
    });
  });
}
