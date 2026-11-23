export interface AmbientVideoOptions {
  desktopSlotId: string;
  mobileSlotId: string;
  muteButtonSelector: string;
  embedUrl: string;
  title: string;
  startMuted?: boolean;
}

export function initAmbientVideoStage(opts: AmbientVideoOptions): void {
  const desktopSlot = document.getElementById(opts.desktopSlotId);
  const mobileSlot = document.getElementById(opts.mobileSlotId);
  const muteButtons = Array.from(
    document.querySelectorAll<HTMLButtonElement>(opts.muteButtonSelector)
  );

  if (!desktopSlot && !mobileSlot) return;

  let iframeEl: HTMLIFrameElement | null = null;
  let isMuted = Boolean(opts.startMuted);
  let playbackStarted = false;

  const updateMuteUi = () => {
    muteButtons.forEach((btn) => {
      btn.setAttribute('aria-pressed', isMuted ? 'true' : 'false');
      btn.setAttribute(
        'aria-label',
        isMuted ? 'Unmute background video' : 'Mute background video'
      );
      btn.title = isMuted ? 'Unmute video' : 'Mute video';
      const unmutedIcon = btn.querySelector('[data-icon-unmuted]');
      const mutedIcon = btn.querySelector('[data-icon-muted]');
      if (unmutedIcon) unmutedIcon.classList.toggle('hidden', isMuted);
      if (mutedIcon) mutedIcon.classList.toggle('hidden', !isMuted);
    });
  };

  const sendPlayerCommand = (func: string, args: unknown[] = []) => {
    const win = iframeEl?.contentWindow;
    if (!win) return;
    win.postMessage(JSON.stringify({ event: 'command', func, args }), '*');
  };

  window.addEventListener('message', (event) => {
    if (typeof event.data !== 'string' || !event.origin.includes('youtube')) return;
    try {
      const payload = JSON.parse(event.data);
      if (payload?.event === 'infoDelivery' && payload?.info) {
        if (payload.info.playerState === 1) {
          playbackStarted = true;
        }
        if (typeof payload.info.muted === 'boolean') {
          isMuted = payload.info.muted;
          updateMuteUi();
        }
      }
    } catch {
      // Ignore non-JSON YouTube messages
    }
  });

  const mountVideoIframe = () => {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    const targetSlot = isDesktop ? desktopSlot : mobileSlot;
    if (!targetSlot) return;

    if (!iframeEl) {
      iframeEl = document.createElement('iframe');
      const origin = window.location.origin;
      iframeEl.src = origin
        ? `${opts.embedUrl}&origin=${encodeURIComponent(origin)}`
        : opts.embedUrl;
      iframeEl.title = opts.title;
      iframeEl.tabIndex = -1;
      iframeEl.allow = 'autoplay; encrypted-media; picture-in-picture';
      iframeEl.addEventListener('load', () => {
        const win = iframeEl?.contentWindow;
        if (!win) return;
        playbackStarted = false;
        win.postMessage(JSON.stringify({ event: 'listening', id: 1 }), '*');

        if (opts.startMuted) {
          sendPlayerCommand('mute');
          sendPlayerCommand('playVideo');
          isMuted = true;
          updateMuteUi();
        } else {
          sendPlayerCommand('unMute');
          sendPlayerCommand('setVolume', [100]);
          sendPlayerCommand('playVideo');

          window.setTimeout(() => {
            if (!playbackStarted) {
              sendPlayerCommand('mute');
              sendPlayerCommand('playVideo');
              isMuted = true;
              updateMuteUi();
            }
          }, 1100);
        }
      });
    }

    if (iframeEl.parentElement !== targetSlot) {
      iframeEl.className = isDesktop
        ? 'relative min-w-full min-h-[118%] aspect-video border-0 pointer-events-none scale-[1.1] opacity-95'
        : 'relative w-[135%] sm:w-[118%] aspect-video max-w-none border-0 pointer-events-none opacity-95';
      targetSlot.appendChild(iframeEl);
    }
  };

  mountVideoIframe();
  window.matchMedia('(min-width: 1024px)').addEventListener('change', mountVideoIframe);
  updateMuteUi();

  muteButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (isMuted) {
        sendPlayerCommand('unMute');
        sendPlayerCommand('setVolume', [100]);
        sendPlayerCommand('playVideo');
        isMuted = false;
      } else {
        sendPlayerCommand('mute');
        isMuted = true;
      }
      updateMuteUi();
    });
  });
}
