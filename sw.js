const CACHE = "mission-control-shell-v3"

const PRECACHE = [
  "./",
  "./index.html",
  "./config/tiles.json",
  "./manifest.webmanifest",
  "./favicon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./audio/mission_control_launch_sting.mp3",
  "./audio/mission_control_launch_sting.ogg",
  "./audio/LICENSE-sting.md",
]

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)))
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener("fetch", (event) => {
  const request = event.request
  if (request.method !== "GET") return
  const url = new URL(request.url)
  const scope = new URL(self.registration.scope)
  if (url.origin !== scope.origin || !url.pathname.startsWith(scope.pathname)) return
  const tilesPath = new URL("config/tiles.json", scope).pathname
  if (request.mode === "navigate" || url.pathname === tilesPath) {
    event.respondWith(networkFirst(request))
    return
  }
  event.respondWith(cacheFirst(request))
})

async function networkFirst(request) {
  const cache = await caches.open(CACHE)
  const scope = new URL(self.registration.scope)
  try {
    const response = await fetch(request)
    if (response.ok) await cache.put(request, response.clone())
    return response
  } catch {
    const cached =
      (await cache.match(request)) ||
      (await cache.match(new URL("index.html", scope))) ||
      (await cache.match(scope))
    if (cached) return cached
    throw new Error("offline")
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE)
  const cached = await cache.match(request)
  if (cached) return cached
  const response = await fetch(request)
  if (response.ok) await cache.put(request, response.clone())
  return response
}
