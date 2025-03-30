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

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // Return cached response
          return cachedResponse;
        }

        return fetch(event.request)
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
            
            // For navigation requests, return the offline page
            if (event.request.mode === 'navigate') {
              return caches.match('./index.html');
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
      .then(() => {
        // Ensure the new service worker takes control immediately
        return self.clients.claim();
      })
  );
});

// Handle messages from the client
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
