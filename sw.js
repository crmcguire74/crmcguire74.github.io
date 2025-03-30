const CACHE_NAME = 'paguire-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './resume.html',
  './projects.html',
  './blog.html',
  './contact.html',
  './myStory.html',
  './styles.css',
  './styles-additional.css',
  './pages-styles.css',
  './dark-mode-fix.css',
  './script.js',
  './images/paguireLogo.png',
  './favicon.ico',
  './site.webmanifest'
];

// Install event - cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // Cache core assets but don't fail if some fail
        return Promise.allSettled(
          urlsToCache.map(url =>
            cache.add(url).catch(err => {
              console.warn(`Failed to cache: ${url}`, err);
              return Promise.resolve(); // Continue despite failure
            })
          )
        );
      })
  );
});

// Fetch event - serve from cache, falling back to network
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Skip non-HTTP(S) requests
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Don't cache if not a valid response
        if (!response || response.status !== 200) {
          return response;
        }

        // Clone the response before caching
        const responseToCache = response.clone();

        // Cache the fetched response
        caches.open(CACHE_NAME)
          .then(cache => {
            // Only cache same-origin requests
            if (event.request.url.startsWith(self.location.origin)) {
              cache.put(event.request, responseToCache)
                .catch(err => console.warn('Cache put error:', err));
            }
          })
          .catch(err => console.warn('Cache open error:', err));

        return response;
      })
      .catch(error => {
        console.warn('Fetch failed:', error);

        // Try to get from cache
        return caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }

            // Return error response
            return new Response('Network error happened', {
              status: 408,
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
});

// Handle messages from the client
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
