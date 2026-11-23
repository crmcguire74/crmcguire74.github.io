export function escHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function updatePillTabButtons(
  selector: string,
  attrName: string,
  activeValue: string
): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>(selector);
  buttons.forEach((btn) => {
    const val = btn.getAttribute(attrName);
    const isActive = val === activeValue;
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    if (isActive) {
      btn.classList.add('bg-[#00A6FF]', 'text-[#030508]', 'font-semibold');
      btn.classList.remove('text-slate-300', 'hover:text-white');
    } else {
      btn.classList.remove('bg-[#00A6FF]', 'text-[#030508]', 'font-semibold');
      btn.classList.add('text-slate-300', 'hover:text-white');
    }
  });
}
