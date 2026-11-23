import { ASSETS, PROFILE } from '../../data/siteData';
import { validateContactForm } from '../../utils/portfolioLogic';
import { initAmbientVideoStage } from '../videoAmbient';

const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';
const EMAILJS_SERVICE_ID = 'service_ndzf9ce';
const EMAILJS_TEMPLATE_ID = 'template_w7kaq5g';
const EMAILJS_PUBLIC_KEY = 'nIL6YTJ4n-u6xF-sE';

async function submitInquiry(values: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<void> {
  // Primary delivery via EmailJS matching paguire.com integration
  const emailJsResponse = await fetch(EMAILJS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: {
        name: values.name.trim(),
        email: values.email.trim(),
        subject: values.subject.trim(),
        message: values.message.trim(),
      },
    }),
  });

  if (emailJsResponse.ok) return;

  // Secondary delivery attempt via Netlify Forms POST when deployed on Netlify
  const encoded = new URLSearchParams({
    'form-name': 'contact-form',
    name: values.name.trim(),
    email: values.email.trim(),
    subject: values.subject.trim(),
    message: values.message.trim(),
  });
  const netlifyRes = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encoded.toString(),
  });

  if (!netlifyRes.ok) {
    throw new Error('Delivery service unavailable');
  }
}

export function initContactPage(): void {
  initAmbientVideoStage({
    desktopSlotId: 'contact-desktop-video-slot',
    mobileSlotId: 'contact-mobile-video-slot',
    muteButtonSelector: '[data-contact-mute]',
    embedUrl: ASSETS.contactVideoEmbedUrl,
    title: 'Christopher R McGuire — Leader of UX and UI Design and Development',
    startMuted: false,
  });

  const form = document.getElementById('contact-inquiry-form') as HTMLFormElement | null;
  const successBox = document.getElementById('contact-success');
  const successName = document.getElementById('contact-success-name');
  const successSubject = document.getElementById('contact-success-subject');
  const resetBtn = document.getElementById('contact-reset-btn');
  const submitBtn = document.getElementById('contact-submit-btn') as HTMLButtonElement | null;
  const submitBtnLabel = document.getElementById('contact-submit-label');
  const submitErrorBox = document.getElementById('contact-submit-error');
  const submitMailtoLink = document.getElementById('contact-fallback-mailto') as HTMLAnchorElement | null;

  const nameInput = document.getElementById('contact-name') as HTMLInputElement | null;
  const emailInput = document.getElementById('contact-email') as HTMLInputElement | null;
  const subjectSelect = document.getElementById('contact-subject') as HTMLSelectElement | null;
  const messageTextarea = document.getElementById('contact-message') as HTMLTextAreaElement | null;

  const renderErrors = (errors: Record<string, string>) => {
    (['name', 'email', 'subject', 'message'] as const).forEach((field) => {
      const errorEl = form?.querySelector<HTMLElement>(`[data-error-for="${field}"]`);
      if (!errorEl) return;
      const msg = errors[field];
      if (msg) {
        errorEl.textContent = msg;
        errorEl.classList.remove('hidden');
      } else {
        errorEl.textContent = '';
        errorEl.classList.add('hidden');
      }
    });
  };

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const values = {
      name: nameInput?.value || '',
      email: emailInput?.value || '',
      subject: subjectSelect?.value || '',
      message: messageTextarea?.value || '',
    };
    const result = validateContactForm(values);
    if (!result.valid) {
      renderErrors(result.errors);
      return;
    }

    renderErrors({});
    submitErrorBox?.classList.add('hidden');
    if (submitBtn) submitBtn.disabled = true;
    if (submitBtnLabel) submitBtnLabel.textContent = 'Sending...';

    try {
      await submitInquiry(values);
      if (successName) successName.textContent = values.name.trim();
      if (successSubject) successSubject.textContent = values.subject.trim();
      form.classList.add('hidden');
      successBox?.classList.remove('hidden');
    } catch {
      if (submitMailtoLink) {
        const subjectLine = encodeURIComponent(`[paguire.com] ${values.subject.trim()} — ${values.name.trim()}`);
        const bodyText = encodeURIComponent(
          `From: ${values.name.trim()} (${values.email.trim()})\n\n${values.message.trim()}`
        );
        submitMailtoLink.href = `mailto:${PROFILE.email}?subject=${subjectLine}&body=${bodyText}`;
      }
      submitErrorBox?.classList.remove('hidden');
    } finally {
      if (submitBtn) submitBtn.disabled = false;
      if (submitBtnLabel) submitBtnLabel.textContent = 'Send Message';
    }
  });

  resetBtn?.addEventListener('click', () => {
    form?.reset();
    renderErrors({});
    submitErrorBox?.classList.add('hidden');
    successBox?.classList.add('hidden');
    form?.classList.remove('hidden');
  });
}
