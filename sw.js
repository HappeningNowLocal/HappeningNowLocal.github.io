const C="hnl-v21",T="hnl-tiles",A=["./","index.html","style.css?v=21","app.js?v=21","icon.svg","icon-192.png","icon-512.png","apple-touch-icon.png","manifest.webmanifest","data/cities.json","vendor/leaflet/leaflet.js","vendor/leaflet/leaflet.css"];
self.addEventListener("install",e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A))));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C&&x!=T).map(x=>caches.delete(x))))));
self.addEventListener("fetch",e=>{if(e.request.method!="GET")return;const u=new URL(e.request.url);
 if(u.hostname.endsWith("tile.openstreetmap.org")){e.respondWith(caches.open(T).then(c=>c.match(e.request).then(hit=>{const net=fetch(e.request).then(r=>{c.put(e.request,r.clone());c.keys().then(k=>k.length>400&&c.delete(k[0]));return r});if(hit)net.catch(()=>{});return hit||net}).catch(()=>caches.match(e.request))));return}
 e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request)))});
