// Service Worker for HeartRateTap
const CACHE_NAME = 'heartratetap-v1';
const STATIC_CACHE = 'heartratetap-static-v1';

// 需要缓存的静态资源
const STATIC_ASSETS = [
  '/',
  '/favicon.png',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/pause.webp',
  '/pause.avif',
];

// 安装Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  // 强制激活新的Service Worker
  self.skipWaiting();
});

// 激活Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 拦截网络请求
self.addEventListener('fetch', (event) => {
  // 只缓存GET请求
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // 如果有缓存，直接返回
      if (cachedResponse) {
        return cachedResponse;
      }

      // 否则发起网络请求
      return fetch(event.request).then((response) => {
        // 只缓存成功的响应
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // 克隆响应（因为响应流只能被消费一次）
        const responseToCache = response.clone();

        // 缓存图片和字体等静态资源
        if (
          event.request.url.includes('.png') ||
          event.request.url.includes('.jpg') ||
          event.request.url.includes('.jpeg') ||
          event.request.url.includes('.gif') ||
          event.request.url.includes('.webp') ||
          event.request.url.includes('.avif') ||
          event.request.url.includes('.svg') ||
          event.request.url.includes('.woff') ||
          event.request.url.includes('.woff2')
        ) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }

        return response;
      }).catch(() => {
        // 网络请求失败时，返回离线页面（如果有的话）
        if (event.request.destination === 'document') {
          return caches.match('/');
        }
      });
    })
  );
});
