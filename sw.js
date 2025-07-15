const CACHE_NAME = 'calculadora-ac-cache-v2'; // Versión actualizada
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './icons/icon-192x192.png',
    './icons/icon-512x512.png',
    'https://cdn.tailwindcss.com ',
    'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js ',
    'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js ',
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js ',
    'https://unpkg.com/ @phosphor-icons/web'
];

// Instalación del Service Worker y caché inicial
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache abierto y recursos guardados');
                return cache.addAll(urlsToCache)
                    .catch(error => {
                        console.warn('Error al cachear recursos:', error);
                    });
            })
    );
    self.skipWaiting(); // Activa inmediatamente el nuevo Service Worker
});

// Uso del caché con fallback a red
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
            .catch(() => {
                // Puedes mostrar un mensaje offline personalizado si lo deseas
                if (event.request.headers.get('Accept').includes('text/html')) {
                    return caches.match('./'); // Página de fallback
                }
            })
    );
});

// Limpieza de cachés antiguos
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim(); // Toma control inmediato
});
