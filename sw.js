### **Paso 3: Archivo Service Worker (`sw.js`)**

Este es el script que permite que tu aplicación funcione sin conexión a internet, guardando los archivos necesarios en el dispositivo del usuario.

* **Acción:** Crea un archivo llamado `sw.js` y pega este código.

```javascript
const CACHE_NAME = 'calculadora-ac-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js',
    'https://unpkg.com/@phosphor-icons/web',
    './icons/icon-192x192.png',
    './icons/icon-512x512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache abierto');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

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
});
```

### **Paso 4: Íconos de la Aplicación (Carpeta `icons`)**

Estos íconos se usarán cuando instales la aplicación en tu escritorio o teléfono.

1.  **Crea la Carpeta:** En la raíz de tu proyecto, crea una carpeta llamada `icons`.
2.  **Añade las Imágenes:** Dentro de la carpeta `icons`, coloca tus dos archivos de imagen:
    * `icon-192x192.png`
    * `icon-512x512.png`

Con todos estos archivos en su lugar, tu proyecto está completo y listo para ser subido a GitH
