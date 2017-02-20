const resources = [
  '/TheMoleGame/',
  '/TheMoleGame/game.js',
  '/TheMoleGame/main.css',
  '/TheMoleGame/manifest.json',
  '/TheMoleGame/favicon.ico',
  '/TheMoleGame/icons/icon-72x72.png',
  '/TheMoleGame/icons/icon-96x96.png',
  '/TheMoleGame/icons/icon-128x128.png',
  '/TheMoleGame/icons/icon-144x144.png',
  '/TheMoleGame/icons/icon-152x152.png',
  '/TheMoleGame/icons/icon-192x192.png',
  '/TheMoleGame/icons/icon-384x384.png'
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