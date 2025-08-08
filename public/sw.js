// Service Worker pour cache des médias lourds
const CACHE_NAME = 'sx-tour-media-v1';
const MEDIA_CACHE = 'sx-tour-media-cache';

// Fichiers à mettre en cache immédiatement
const STATIC_ASSETS = [
  '/images/logo-sx-tour.svg',
  '/images/logo-championnat-fr.svg'
];

// Médias lourds à mettre en cache à la demande
const HEAVY_MEDIA_PATTERNS = [
  /\/images\/.*\.(webp|jpg|jpeg|png|gif)$/,
  /\/videos\/.*\.(webm|mp4|mov)$/
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Cache strategy pour les médias lourds
  if (HEAVY_MEDIA_PATTERNS.some(pattern => pattern.test(url.pathname))) {
    event.respondWith(
      caches.open(MEDIA_CACHE).then(cache => {
        return cache.match(event.request).then(response => {
          if (response) {
            console.log('Serving from cache:', url.pathname);
            return response;
          }
          
          // Si pas en cache, fetch et cache
          return fetch(event.request).then(fetchResponse => {
            // Vérifier que la réponse est valide
            if (fetchResponse.ok) {
              cache.put(event.request, fetchResponse.clone());
              console.log('Cached:', url.pathname);
            }
            return fetchResponse;
          });
        });
      })
    );
  }
});

// Nettoyage du cache ancien
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== MEDIA_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
