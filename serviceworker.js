const resources = [
  '/',
  'game.js',
  'main.css'
];

this.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open('v1')
      .then(cache => cache.addAll(resources))
  );
});

this.addEventListener('fetch', event => {
  event.respondWith(
    caches
      .match(event.request)
      .then(response => response || fetch(event.request))
  );
});