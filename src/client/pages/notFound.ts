export function initNotFoundPage(): void {
  const pathEl = document.getElementById('not-found-path');
  if (pathEl) {
    pathEl.textContent = window.location.pathname || '/404';
  }

  const backBtn = document.getElementById('not-found-back-btn');
  backBtn?.addEventListener('click', () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  });
}
