const CACHE = "aprender-v4";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
  "./sounds/dog.m4a",
  "./sounds/cat.m4a",
  "./sounds/cow.m4a",
  "./sounds/pig.m4a",
  "./sounds/hen.m4a",
  "./sounds/sheep.m4a",
  "./sounds/horse.m4a",
  "./sounds/duck.m4a",
  "./sounds/frog.m4a",
  "./sounds/lion.m4a",
  "./sounds/elephant.m4a",
  "./sounds/bird.m4a"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((hit) => hit || fetch(e.request))
  );
});
