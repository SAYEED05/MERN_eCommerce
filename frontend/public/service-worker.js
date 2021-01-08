var CACHE_NAME = "the-shop";
var urlsToCache = ["/", "/cart", "/profile", "/product/:id", "/order/:id"];

//INSTALL SERVICE WORKER

self.addEventListener("install", (e) => {
  //PERFORM INSTALL

  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

//CACHE AND RETURN REQUESTS

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      //CACHE HIT-RETURN RESPONSE

      if (response) {
        return response;
      }

      return fetch(e.request);
    })
  );
});

//UPDATE A SERVICE WORKER

self.addEventListener("active", (e) => {
  var cacheWhiteList = ["the-shop"];
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhiteList.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
