import { ASSETS, PROFILE } from '../../data/siteData';
import { icon } from '../icons';
import { ogImage, breadcrumbSchema, esc, personEntity, toAbsoluteUrl, type SeoConfig } from '../seo';

export const CONTACT_SEO: SeoConfig = {
  path: '/contact',
  title: "Contact & Collaboration | Christopher R McGuire — Paguire",
  ogImage: ogImage('contact'),
  description:
    'Contact Christopher R McGuire for engineering leadership, UX/UI architecture, applied AI transformation, speaking or advisory roles in Chicago.',
  keywords:
    'Contact Christopher R McGuire, Hire SVP Engineering, UX/UI Consulting, Fractional CTO Chicago, AI Advisory',
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Christopher R McGuire',
      url: toAbsoluteUrl('/contact'),
      mainEntity: personEntity(),
    },
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ]),
  ],
};

export function renderContactPage(): string {
  const posterUrl = `https://i.ytimg.com/vi_webp/${ASSETS.contactHeroVideoId}/hqdefault.webp`;

  const socialLinksHtml = PROFILE.socials
    .map(
      (s) => `<a href="${esc(s.href)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-xs font-medium text-slate-300 hover:text-[#38BDF8] transition-colors">
        <span>${esc(s.label)}</span>
        ${icon('arrowUpRight', 'w-3 h-3')}
      </a>`
    )
    .join('\n');

  const availabilityHtml = [
    'Advisory Roles & Executive Mentorship',
    'UX/UI & Engineering Consulting Services',
    'Speaking Engagements & AI Workshops',
    'Select Product Collaborations',
  ]
    .map(
      (item) => `<li class="flex items-center gap-2.5">
        ${icon('checkCircle2', 'w-4 h-4 text-[#00A6FF] shrink-0')}
        <span>${esc(item)}</span>
      </li>`
    )
    .join('\n');

  return `<div class="overflow-x-clip">
    <!-- Frameless Ambient Video Hero flowing seamlessly into #030508 -->
    <section class="relative overflow-hidden bg-[#030508] border-b border-white/[0.08] lg:min-h-[500px] xl:min-h-[560px] lg:flex lg:items-center">
      <!-- Mobile & Tablet Top Frameless Video Stage -->
      <div id="contact-mobile-stage" class="lg:hidden relative h-[290px] sm:h-[360px] md:h-[420px] overflow-hidden bg-[#030508]">
        <div
          data-parallax="contact-mobile-video"
          aria-hidden="true"
          class="pointer-events-none absolute -top-24 inset-x-0 bottom-0 flex items-center justify-center origin-center will-change-transform [mask-image:radial-gradient(ellipse_92%_86%_at_50%_46%,black_44%,transparent_98%)]"
        >
          <div id="contact-mobile-video-slot" class="relative w-full h-full flex items-center justify-center overflow-hidden">
            <img src="${esc(posterUrl)}" alt="" referrerpolicy="no-referrer" class="absolute inset-0 w-full h-full object-cover scale-[1.15] opacity-75" />
          </div>
        </div>
        <div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030508] via-[#030508]/25 to-[#030508]/65"></div>
        <div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#030508]/70 via-transparent to-[#030508]/65"></div>
        <button
          type="button"
          id="contact-mute-toggle-mobile"
          data-contact-mute
          aria-pressed="false"
          aria-label="Mute background video"
          title="Mute video"
          class="absolute top-3 right-3 z-20 inline-flex items-center justify-center p-2 bg-transparent border-0 text-white hover:scale-110 transition-transform cursor-pointer drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6FF] rounded-lg"
        >
          <span data-icon-unmuted>${icon('volume2', 'w-6 h-6 text-[#38BDF8] hover:text-white transition-colors')}</span>
          <span data-icon-muted class="hidden">${icon('volumeX', 'w-6 h-6 text-slate-300 hover:text-white transition-colors')}</span>
        </button>
      </div>

      <!-- Desktop Right-Biased Frameless Parallax Video Canvas -->
      <div id="contact-desktop-stage" aria-hidden="true" class="hidden lg:block pointer-events-none absolute inset-0 overflow-hidden">
        <div class="absolute right-[12%] top-1/2 -translate-y-1/2 w-[620px] h-[380px] rounded-full bg-[#00A6FF]/[0.1] blur-3xl"></div>
        <div
          data-parallax="contact-desktop-video"
          class="absolute -top-28 bottom-0 right-[-4%] xl:right-[-5%] w-[75%] xl:w-[72%] flex items-center justify-center origin-center will-change-transform [mask-image:radial-gradient(ellipse_94%_88%_at_68%_50%,black_52%,transparent_100%)]"
        >
          <div id="contact-desktop-video-slot" class="relative w-full h-full flex items-center justify-center overflow-hidden">
            <img src="${esc(posterUrl)}" alt="" referrerpolicy="no-referrer" class="absolute inset-0 w-full h-full object-cover scale-[1.14] opacity-75" />
          </div>
        </div>
        <div class="absolute inset-0 bg-gradient-to-r from-[#030508] via-[#030508]/78 via-[32%] to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#030508] via-transparent to-[#030508]/55"></div>
        <div class="absolute inset-y-0 right-0 w-[4%] bg-gradient-to-l from-[#030508]/25 to-transparent"></div>
        <button
          type="button"
          id="contact-mute-toggle-desktop"
          data-contact-mute
          aria-pressed="false"
          aria-label="Mute background video"
          title="Mute video"
          class="pointer-events-auto absolute top-5 right-6 xl:right-8 z-30 inline-flex items-center justify-center p-2 bg-transparent border-0 text-white hover:scale-110 transition-transform cursor-pointer drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00A6FF] rounded-lg"
        >
          <span data-icon-unmuted>${icon('volume2', 'w-6 h-6 text-[#38BDF8] hover:text-white transition-colors')}</span>
          <span data-icon-muted class="hidden">${icon('volumeX', 'w-6 h-6 text-slate-300 hover:text-white transition-colors')}</span>
        </button>
      </div>

      <!-- Foreground Editorial Hero Copy -->
      <div class="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 pt-4 pb-11 lg:py-20 xl:py-24">
        <div data-parallax="contact-copy" class="max-w-md lg:max-w-[540px] xl:max-w-[580px] will-change-transform hero-enter">
          <p class="text-sm font-medium text-[#38BDF8] mb-3">Get in Touch</p>
          <h1 class="text-[34px] sm:text-5xl xl:text-[54px] font-semibold tracking-tight text-white leading-[1.06] mb-5">
            Let&apos;s Connect &amp; Collaborate
          </h1>
          <p class="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-md xl:max-w-lg mb-8">
            If you are seeking a driven leader to steer Engineering, UX/UI Design, or AI-enabled
            application development teams to new heights, send a note below.
          </p>

          <div class="flex flex-wrap items-center gap-3.5">
            <a
              href="#contact-form"
              class="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-lg bg-[#00A6FF] hover:bg-[#38BDF8] text-[#030508] text-sm font-semibold transition-all duration-150 hover:shadow-[0_0_24px_rgba(0,166,255,0.45)] whitespace-nowrap"
            >
              <span>Send a Message</span>
              ${icon('arrowDown', 'w-4 h-4')}
            </a>

            <a
              href="${esc(ASSETS.contactVideoWatchUrl)}"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-lg border border-white/15 bg-[#090E18]/90 hover:border-[#00A6FF]/50 text-white text-sm font-medium transition-colors whitespace-nowrap"
            >
              ${icon('play', 'w-3.5 h-3.5 text-[#38BDF8]')}
              <span>Watch Full Video</span>
              ${icon('arrowUpRight', 'w-3.5 h-3.5 text-slate-400')}
            </a>
          </div>
        </div>
      </div>
    </section>

    <div id="contact-form" class="max-w-7xl mx-auto px-5 sm:px-8 py-16 lg:py-24 scroll-mt-24">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div data-reveal class="lg:col-span-7 p-7 sm:p-9 rounded-2xl bg-[#090E18] blueprint-hairline">
          <div id="contact-success" class="hidden py-10 text-center space-y-4">
            ${icon('checkCircle2', 'w-12 h-12 text-[#00A6FF] mx-auto')}
            <h2 class="text-2xl font-semibold text-white">Message Sent Successfully</h2>
            <p class="text-sm sm:text-base text-slate-300 max-w-md mx-auto">
              Thank you for reaching out, <span id="contact-success-name"></span>. Your inquiry regarding
              <span id="contact-success-subject" class="text-[#38BDF8]"></span> has been recorded—I&apos;ll respond promptly.
            </p>
            <button
              type="button"
              id="contact-reset-btn"
              class="mt-4 px-5 py-2.5 rounded-lg bg-[#00A6FF] hover:bg-[#38BDF8] text-[#030508] text-xs font-semibold transition-colors cursor-pointer"
            >
              Send Another Message
            </button>
          </div>

          <form
            name="contact-form"
            id="contact-inquiry-form"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            novalidate
            class="space-y-6"
          >
            <input type="hidden" name="form-name" value="contact-form" />
            <p class="hidden">
              <label>Leave blank if human: <input name="bot-field" /></label>
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label for="contact-name" class="block text-xs font-medium text-slate-300 mb-2">Your Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value=""
                  placeholder="Alex Morgan"
                  class="w-full px-4 py-3 rounded-lg bg-[#050810] border border-white/15 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00A6FF]"
                />
                <p data-error-for="name" role="alert" class="hidden text-xs text-rose-400 mt-1.5"></p>
              </div>

              <div>
                <label for="contact-email" class="block text-xs font-medium text-slate-300 mb-2">Your Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value=""
                  placeholder="alex@company.com"
                  class="w-full px-4 py-3 rounded-lg bg-[#050810] border border-white/15 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00A6FF]"
                />
                <p data-error-for="email" role="alert" class="hidden text-xs text-rose-400 mt-1.5"></p>
              </div>
            </div>

            <div>
              <label for="contact-subject" class="block text-xs font-medium text-slate-300 mb-2">Subject</label>
              <select
                id="contact-subject"
                name="subject"
                class="w-full px-4 py-3 rounded-lg bg-[#050810] border border-white/15 text-sm text-white focus:outline-none focus:border-[#00A6FF]"
              >
                <option value="">Select a subject</option>
                <option value="Advisory Role">Advisory Role</option>
                <option value="Consulting Services">Consulting Services</option>
                <option value="Project Collaboration">Project Collaboration</option>
                <option value="Speaking Engagement">Speaking Engagement</option>
                <option value="Freelance Opportunity">Freelance Opportunity</option>
                <option value="Other">Other</option>
              </select>
              <p data-error-for="subject" role="alert" class="hidden text-xs text-rose-400 mt-1.5"></p>
            </div>

            <div>
              <label for="contact-message" class="block text-xs font-medium text-slate-300 mb-2">Your Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                placeholder="Share a brief overview of your team, initiative, or timeline..."
                class="w-full px-4 py-3 rounded-lg bg-[#050810] border border-white/15 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00A6FF]"
              ></textarea>
              <p data-error-for="message" role="alert" class="hidden text-xs text-rose-400 mt-1.5"></p>
            </div>

            <div id="contact-submit-error" role="alert" class="hidden p-4 rounded-xl bg-rose-950/40 border border-rose-500/35 text-xs sm:text-sm text-rose-200 space-y-2">
              <p>Message delivery could not be completed automatically right now. You can send directly via your email client with your message pre-filled:</p>
              <a id="contact-fallback-mailto" href="mailto:${esc(PROFILE.email)}" class="inline-flex items-center gap-1.5 font-semibold text-[#38BDF8] hover:text-white underline">
                <span>Open in Email App</span>
                ${icon('arrowUpRight', 'w-3.5 h-3.5')}
              </a>
            </div>

            <button
              type="submit"
              id="contact-submit-btn"
              class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#00A6FF] hover:bg-[#38BDF8] disabled:opacity-60 disabled:cursor-wait text-[#030508] text-sm font-semibold transition-colors cursor-pointer"
            >
              ${icon('send', 'w-4 h-4')}
              <span id="contact-submit-label">Send Message</span>
            </button>
          </form>
        </div>

        <div data-reveal style="transition-delay: 80ms" class="lg:col-span-5 space-y-6">
          <div class="p-7 rounded-2xl bg-[#090E18] blueprint-hairline space-y-4">
            <h2 class="text-xl font-semibold text-white">Direct Contact</h2>
            <p class="text-sm text-slate-400">${esc(PROFILE.role)}</p>
            <div class="space-y-3 pt-2 text-sm text-slate-200">
              <a href="mailto:${esc(PROFILE.email)}" class="flex items-center gap-3 hover:text-[#38BDF8] transition-colors">
                ${icon('mail', 'w-4 h-4 text-[#00A6FF] shrink-0')}
                <span>${esc(PROFILE.email)}</span>
              </a>
              <div class="flex items-center gap-3">
                ${icon('mapPin', 'w-4 h-4 text-[#00A6FF] shrink-0')}
                <span>${esc(PROFILE.location)}</span>
              </div>
            </div>

            <div class="pt-4 border-t border-white/[0.08] flex flex-wrap gap-3">
              ${socialLinksHtml}
            </div>
          </div>

          <div class="p-7 rounded-2xl bg-[#090E18] blueprint-hairline space-y-4">
            <h2 class="text-lg font-semibold text-white">Current Availability</h2>
            <ul class="space-y-2 text-sm text-slate-300">
              ${availabilityHtml}
            </ul>
          </div>

          <div class="p-7 rounded-2xl bg-[#090E18] blueprint-hairline space-y-4">
            <h2 class="text-lg font-semibold text-white">What I&apos;m Building</h2>
            <ul class="space-y-3 text-sm text-slate-300">
              <li>
                <a href="https://thrivefinancial.app" target="_blank" rel="noopener noreferrer" class="font-semibold text-[#38BDF8] hover:text-white transition-colors">Thrive Financial</a>
                <span class="text-slate-400"> — Forensic financial analysis &amp; settlement intelligence</span>
              </li>
              <li>
                <a href="/projects/modus-ai" class="font-semibold text-[#38BDF8] hover:text-white transition-colors">Modus AI</a>
                <span class="text-slate-400"> — Spatial AI interior &amp; exterior design (iOS)</span>
              </li>
              <li>
                <a href="https://tronengaged.netlify.app/" target="_blank" rel="noopener noreferrer" class="font-semibold text-[#38BDF8] hover:text-white transition-colors">Tron Engaged</a>
                <span class="text-slate-400"> — 3D &amp; WebXR first-person VR disc &amp; light-cycle arena</span>
              </li>
              <li>
                <a href="https://apps.apple.com/us/app/incidentlog/id6756827780" target="_blank" rel="noopener noreferrer" class="font-semibold text-[#38BDF8] hover:text-white transition-colors">Thrive Incident Logger</a>
                <span class="text-slate-400"> — Encrypted iOS audit-trail logger</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}
