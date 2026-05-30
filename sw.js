const CACHE_NAME = "rakshasetu-v1";
const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/women-safety",
  "/about",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});