self.__PRECACHE = {"version":"a5336c4f89b5","files":["assets/App-4nKAm6z9.js","assets/App-7q6CdGZ4.js","assets/App-94RPH9iD.js","assets/App-B2bMg0DO.js","assets/App-B8_r0A_E.js","assets/App-BNtRzR8L.js","assets/App-Bc8YgoLJ.js","assets/App-BdbLBse0.js","assets/App-BncIRvGf.js","assets/App-C05olLOr.js","assets/App-CGPl9O13.js","assets/App-CIA2dTMT.js","assets/App-CNLgtVCM.js","assets/App-CS4GTHdS.js","assets/App-CbGN68jd.js","assets/App-Cyo4uXhM.js","assets/App-D6NtZ9QQ.js","assets/App-DnnzpCzl.js","assets/App-Dx7FHpv3.js","assets/App-V3THh48H.js","assets/App-d5-CoogX.js","assets/App-gfnB6fMn.js","assets/App-i6TZiyVV.js","assets/App-njI96f5v.js","assets/App-nyoc0-w-.js","assets/App-oImQVgvt.js","assets/App-wdwcBwIO.js","assets/Design-BkgheVt3.css","assets/Design-DkDWB5IB.js","assets/JavaScript.tmLanguage-BzEREzEH.js","assets/LivePreview-BZ-7qvyV.js","assets/LivePreview-Bf4vvtou.css","assets/TypeScript.tmLanguage-JzzBcLAG.js","assets/__vite-browser-external-BwpP9LFt.js","assets/ast-CtZAZwmO.css","assets/ast-J_kAum7H.js","assets/codicon-D011ML1g.ttf","assets/css.tmLanguage-C4YF0zAH.js","assets/de-BDdYfev0.js","assets/editor.worker-CgFHM4pc.js","assets/html.tmLanguage-CMrsJtti.js","assets/i18n-Pxge8Aa4.js","assets/index-DlpdgVWJ.js","assets/index2-DPn7wz6g.js","assets/index3-BVPmG-3c.js","assets/inter-cyrillic-ext-wght-normal-BOeWTOD4.woff2","assets/inter-cyrillic-wght-normal-DqGufNeO.woff2","assets/inter-greek-ext-wght-normal-DlzME5K_.woff2","assets/inter-greek-wght-normal-CkhJZR-_.woff2","assets/inter-latin-ext-wght-normal-DO1Apj_S.woff2","assets/inter-latin-wght-normal-Dx4kXJAl.woff2","assets/inter-vietnamese-wght-normal-CBcvBZtf.woff2","assets/lib-d3FJJFiW.js","assets/main-7Mge_fgn.js","assets/main-Ce8gkKcG.css","assets/main-CkNpCrYi.js","assets/main-nwk4Il_q.css","assets/nb-8DbBk-l-.js","assets/onigasm-kQxuTr47.wasm","assets/pattern-qOMyowWp.svg","assets/rolldown-runtime-BCiCTKAo.js","assets/screenshot-DWTUPsQ_.png","assets/service.worker-Bgn7oziO.js","assets/theme-BL22zJ2t.js","assets/theme-DAUEu_m0.css","assets/typescript-BYDaNLmh.js","assets/vue.tmLanguage-s_9LkmXh.js","assets/vue.worker-tFe7mxYr.js","assets/vueplay-logo-white-DYKM51XU.svg","assets/zh-cyPvb6aN.js","favicon.ico","favicon.png","icon-192.png","icon-512.png","manifest.webmanifest"]};
// The Studio's service worker: it keeps the Studio's own files on this machine, so the Studio starts without
// the network. A classic script with no imports; the build puts the list of files in front of it
// (`self.__PRECACHE = { version, files }`, see precachePlugin.js), which also makes every release another
// worker, so the browser installs it and the files of that release are fetched.
//
// - The files of the release are fetched when the worker is installed (what an earlier release already has
//   is copied, not fetched again). One that fails is fetched when it is asked for.
// - A file under assets/ never changes (its name carries a hash): from the cache, else fetched and kept.
// - The page itself: from the network, so a new release is seen at once; from the cache when the network
//   does not answer (or not within SLOW).
// - Other files of the Studio's own origin: from the network, and from the cache when that fails.
// - What a project's preview takes from the CDNs (its npm dependencies, from jsDelivr and esm.sh) is kept in
//   a cache of its own, which outlives releases. An address with an exact version (vue@3.5.13) never
//   changes: from the cache, else fetched and kept. One with a range (vue@^3) is answered from the cache at
//   once and fetched again behind it, so the next time has what the range has come to mean.
// - Google Fonts, which a project's styles import: the stylesheet as a range (it may come to name other
//   files), the font files it names for good.
// - Components of VuePlay's library that a project uses (manager.vueplay.io/<name>@<version>/esm): from the
//   network, since the manager decides who may have them, and the one that was kept when the network does not
//   answer. Kept without the token of its address; a no from the manager (401, 403, 404) forgets it, and so
//   does signing out (register.js `forgetComponents`).
// Requests that are not GET, and requests to any other origin, are not touched.

const PRECACHE = self.__PRECACHE || { version: 'dev', files: [] }
const PREFIX = 'vueplay-shell-'
const CACHE = PREFIX + PRECACHE.version
/** How long the page is waited for before the one that is kept is shown */
const SLOW = 4000
const AT_ONCE = 6
const CDN = 'vueplay-cdn-v1'
const CDN_HOSTS = ['cdn.jsdelivr.net', 'data.jsdelivr.com', 'esm.sh', 'fonts.googleapis.com', 'fonts.gstatic.com']
/** Hosts whose files never change, whatever their address */
const FOR_GOOD_HOSTS = ['fonts.gstatic.com']
const COMPONENTS = 'vueplay-components-v1'
const COMPONENT_HOSTS = ['manager.vueplay.io']
/** The most the CDN cache holds; the oldest go first */
const CDN_MOST = 3000

const scope = () => self.registration.scope
const shellUrl = () => new URL('./', scope()).href
const isAsset = (url) => url.pathname.startsWith(new URL('./assets/', scope()).pathname)
const keepable = (response) => !!response && response.ok && (response.type === 'basic' || response.type === 'default')

async function keep(request, response) {
  if (!keepable(response)) return
  try {
    const cache = await caches.open(CACHE)
    await cache.put(request, response)
  } catch (e) {} // no room: the Studio works, only not without the network
}

/** Fetches the files of this release into its cache */
async function precache() {
  const cache = await caches.open(CACHE)
  const files = [...new Set(['./', ...PRECACHE.files])].map(file => new URL(file, scope()))
  let next = 0
  const one = async (url) => {
    if (await cache.match(url.href)) return
    // a file with a hash in its name is the same file in the cache of an earlier release
    const had = isAsset(url) ? await caches.match(url.href) : null
    const response = had || await fetch(url.href, { cache: 'no-cache' })
    if (keepable(response)) await cache.put(url.href, response.clone())
  }
  const worker = async () => {
    while (next < files.length) await one(files[next++]).catch(() => {})
  }
  await Promise.all(Array.from({ length: AT_ONCE }, worker))
}

async function forgetOlder() {
  for (const name of await caches.keys()) {
    if (name.startsWith(PREFIX) && name !== CACHE) await caches.delete(name)
  }
}

const kept = async (key) => (await caches.open(CACHE)).match(key)

/** The page: the network first, the kept one when it does not answer in time */
async function page(request) {
  const have = await kept(shellUrl())
  const asked = fetch(request).then((response) => {
    // (whatever the path, the page is the same one)
    if (keepable(response) && !response.redirected) keep(shellUrl(), response.clone())
    return response
  })
  if (!have) return asked
  let timer
  const slow = new Promise((resolve) => { timer = setTimeout(() => resolve(have), SLOW) })
  return Promise.race([asked.catch(() => have), slow]).finally(() => clearTimeout(timer))
}

async function asset(request) {
  const have = await caches.match(request.url)
  if (have) return have
  const response = await fetch(request)
  keep(request.url, response.clone())
  return response
}

async function other(request) {
  try {
    const response = await fetch(request)
    keep(request.url, response.clone())
    return response
  } catch (e) {
    const have = await kept(request.url)
    if (have) return have
    throw e
  }
}

/** Does the address name a version exactly (pkg@1.2.3), so that what it gives never changes? */
function exactVersion(url) {
  if (FOR_GOOD_HOSTS.includes(url.hostname)) return true
  let path = url.pathname
  try { path = decodeURIComponent(path) } catch (e) {}
  return /@\d+\.\d+\.\d+[^/^~*<>|\s]*(\/|$)/.test(path)
}

let cdnKept = 0
async function keepCdn(url, response) {
  if (!response.ok || response.type !== 'cors') return
  try {
    const cache = await caches.open(CDN)
    await cache.put(url, response)
    // looked at now and then, not for every file
    if (++cdnKept % 100) return
    const keys = await cache.keys()
    for (const key of keys.slice(0, Math.max(0, keys.length - CDN_MOST))) await cache.delete(key)
  } catch (e) {}
}

// Asked for as a file anyone may read (the CDNs allow that), whatever asked for it: an answer that cannot be
// looked at (a stylesheet's, an image's) takes room for megabytes in a cache and cannot be told from an error
const fromCdn = async (url) => {
  const response = await fetch(url, { mode: 'cors', credentials: 'omit' })
  keepCdn(url, response.clone())
  return response
}

async function cdn(request) {
  const url = request.url
  const have = await (await caches.open(CDN)).match(url)
  if (!have) return fromCdn(url)
  if (!exactVersion(new URL(url))) fromCdn(url).catch(() => {})
  return have
}

const withoutToken = (address) => {
  const url = new URL(address)
  url.searchParams.delete('token')
  return url.href
}

async function component(request) {
  const key = withoutToken(request.url)
  const cache = await caches.open(COMPONENTS)
  let response
  try {
    response = await fetch(request.url, { mode: 'cors', credentials: 'omit' })
  } catch (e) {
    const have = await cache.match(key)
    if (have) return have
    throw e
  }
  if (response.ok && response.type === 'cors') cache.put(key, response.clone()).catch(() => {})
  else if ([401, 403, 404].includes(response.status)) cache.delete(key).catch(() => {})
  return response
}

/** What answers this request, or null when the worker leaves it alone */
function answer(request) {
  if (request.method !== 'GET' || request.headers.has('range')) return null
  const url = new URL(request.url)
  if (url.protocol === 'https:' && CDN_HOSTS.includes(url.hostname)) return cdn(request)
  if (url.protocol === 'https:' && COMPONENT_HOSTS.includes(url.hostname)) return /@[^/]+\/esm$/.test(url.pathname) ? component(request) : null
  if (url.origin !== new URL(scope()).origin || !url.href.startsWith(scope())) return null
  if (request.mode === 'navigate') return page(request)
  if (isAsset(url)) return asset(request)
  return other(request)
}

self.addEventListener('install', (event) => {
  self.skipWaiting()
  event.waitUntil(precache())
})

self.addEventListener('activate', (event) => {
  event.waitUntil(forgetOlder().then(() => self.clients.claim()))
})

self.addEventListener('fetch', (event) => {
  const answered = answer(event.request)
  if (answered) event.respondWith(answered)
})
