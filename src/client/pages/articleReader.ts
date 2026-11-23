export function initArticleReaderPage(): void {
  const progressBar = document.getElementById('article-scroll-progress');
  if (!progressBar) return;

  let rafPending = false;
  const update = () => {
    const doc = document.documentElement;
    const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 1);
    const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
    progressBar.style.transform = `scaleX(${progress.toFixed(4)})`;
    rafPending = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (rafPending) return;
      rafPending = true;
      window.requestAnimationFrame(update);
    },
    { passive: true }
  );
  update();
}
