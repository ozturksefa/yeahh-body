/* Yeahh Body — Service Worker
 * Strategy:
 *   - App shell (HTML + build assets) uses network-first with cache
 *     fallback. The user always gets fresh code when online, and a
 *     usable app when the gym wifi dies.
 *   - ExerciseDB GIFs use cache-first with long retention — they rarely
 *     change and are the single heaviest assets on a typical session.
 *   - YouTube thumbnails/embeds pass through unmodified (third-party,
 *     cross-origin, caching adds no value).
 *   - Supabase + Anthropic API calls always go to network (live data).
 *
 * Cache version bumps invalidate old caches in the activate event.
 */

const VERSION = "yb-v1";
const RUNTIME_CACHE = `${VERSION}-runtime`;
const IMAGE_CACHE = `${VERSION}-img`;

// Core shell entries. The build-produced hashed chunks are cached on
// demand by the fetch handler, so we only pre-cache the entry points.
const SHELL = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon.svg",
  "/icon-192.png",
  "/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(RUNTIME_CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => !k.startsWith(VERSION))
          .map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

function isShellRequest(url) {
  return (
    url.origin === self.location.origin &&
    (url.pathname === "/" ||
      url.pathname.endsWith(".html") ||
      url.pathname.startsWith("/assets/") ||
      url.pathname === "/manifest.json" ||
      url.pathname === "/favicon.svg" ||
      url.pathname.endsWith(".png") ||
      url.pathname.endsWith(".svg"))
  );
}

function isExerciseGif(url) {
  return url.hostname === "static.exercisedb.dev";
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);

  // Let YouTube + APIs go straight to the network.
  if (
    url.hostname.endsWith("youtube.com") ||
    url.hostname.endsWith("youtube-nocookie.com") ||
    url.hostname.endsWith("ytimg.com") ||
    url.hostname.endsWith("supabase.co") ||
    url.hostname === "api.anthropic.com" ||
    url.pathname.startsWith("/api/")
  ) {
    return;
  }

  if (isExerciseGif(url)) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  if (isShellRequest(url)) {
    event.respondWith(networkFirst(request, RUNTIME_CACHE));
    return;
  }
});

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (err) {
    if (cached) return cached;
    throw err;
  }
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (err) {
    const cached = await cache.match(request);
    if (cached) return cached;
    // As a last resort, hand back the cached index so React Router / SPA
    // navigation still works on a cold start with no network.
    const fallback = await cache.match("/index.html");
    if (fallback) return fallback;
    throw err;
  }
}

// ═══ Web Push handler ═══
// Shows the notification pushed by /netlify/functions/push-send-daily.
// Payload shape: { title, body, url }. Defaults cover the empty push
// case (some browsers wake the SW with no payload to budget battery).
self.addEventListener("push", (event) => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; }
  catch { data = { body: event.data ? event.data.text() : "" }; }

  const title = data.title || "Yeahh Body";
  const options = {
    body: data.body || "Bugün antrenman günü.",
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    tag: data.tag || "yb-daily",
    renotify: false,
    data: { url: data.url || "/" },
    vibrate: [80, 40, 80],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if (client.url.includes(url) && "focus" in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
      return null;
    }),
  );
});
