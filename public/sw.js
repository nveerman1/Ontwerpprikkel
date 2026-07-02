/* global self, caches, fetch, URL */

const CACHE_VERSION = "ontwerpprikkel-app-v1";
const PRECACHE_URLS = [
  "/",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/maskable-512.png",
  "/icons/apple-touch-icon.png",
  "/icons/favicon-16.png",
  "/icons/favicon-32.png",
];

const STATIC_ASSET_PATTERN =
  /\.(?:css|js|png|jpg|jpeg|webp|svg|ico|gif|woff2?|ttf|otf)$/i;

const isSameOrigin = (url) => url.origin === self.location.origin;

const isStaticAsset = (url) =>
  url.pathname.startsWith("/_next/static/") ||
  STATIC_ASSET_PATTERN.test(url.pathname);

const shouldCacheResponse = (response) =>
  response && response.ok && response.type === "basic";

const putInCache = async (request, response) => {
  if (!shouldCacheResponse(response)) return;

  const cache = await caches.open(CACHE_VERSION);
  await cache.put(request, response.clone());
};

const getAppShellAssetUrls = async (cache) => {
  const appShell = await cache.match("/");
  if (!appShell) return [];

  const html = await appShell.clone().text();
  const matches = html.matchAll(/(?:href|src)="([^"]+)"/g);
  const assetUrls = [];

  for (const [, value] of matches) {
    const url = new URL(value, self.location.origin);
    if (!isSameOrigin(url) || !isStaticAsset(url)) continue;
    assetUrls.push(`${url.pathname}${url.search}`);
  }

  return [...new Set(assetUrls)];
};

const precacheAppShellAssets = async (cache) => {
  try {
    const assetUrls = await getAppShellAssetUrls(cache);
    await Promise.allSettled(assetUrls.map((url) => cache.add(url)));
  } catch {
    // App-shell discovery is a best-effort boost for first-visit offline use.
    // Runtime caching still handles these assets once the service worker controls the page.
  }
};

const networkFirst = async (request, fallbackRequest = request) => {
  try {
    const response = await fetch(request);
    await putInCache(request, response);
    return response;
  } catch {
    const cached = await caches.match(fallbackRequest);
    if (cached) return cached;
    throw new Error(`No cached response for ${request.url}`);
  }
};

const staleWhileRevalidate = async (event) => {
  const cached = await caches.match(event.request);
  const networkUpdate = fetch(event.request).then(async (response) => {
    await putInCache(event.request, response);
    return response;
  });

  if (cached) {
    event.waitUntil(networkUpdate.catch(() => undefined));
    return cached;
  }

  return networkUpdate;
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_VERSION);
      await cache.addAll(PRECACHE_URLS);
      await precacheAppShellAssets(cache);
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_VERSION)
          .map((cacheName) => caches.delete(cacheName)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only cache safe same-origin GET requests. Future API, AI, POST,
  // analytics or third-party requests should always stay outside this cache.
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (!isSameOrigin(url)) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, "/"));
    return;
  }

  if (isStaticAsset(url)) {
    event.respondWith(staleWhileRevalidate(event));
    return;
  }

  event.respondWith(networkFirst(request));
});
