var e=`<template>
  <div class="vp-map" :class="{ 'vp-map--interactive': kind === 'interactive' }" :style="style">
    <template v-if="kind !== 'interactive'">
      <iframe v-if="place" class="vp-map__frame" :src="address" :title="say('map', '', place)" loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
      <div v-else class="vp-map__empty">{{ say('empty') }}</div>
    </template>
    <template v-else>
      <div ref="map" class="vp-map__canvas" />
      <div v-if="problem" class="vp-map__empty">{{ problem }}</div>
      <div v-else-if="!ready" class="vp-map__empty vp-map__loading" aria-hidden="true" />
    </template>
  </div>
</template>
<script>
// A map. As it was: one address, from Google Maps. Interactive: a map of its own (MapLibre with OpenFreeMap's
// free tiles, no key needed) with the places you list, or show from your data with the plug: each with its
// coordinates or its address, a title, a line, a picture and a link, shown when it is clicked. Places close
// together are drawn as one numbered circle until one comes closer. Scrolling the page does not zoom the map
// unless you want it to.
const LIBRE = 'https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl'
const STYLES = { liberty: 'https://tiles.openfreemap.org/styles/liberty', bright: 'https://tiles.openfreemap.org/styles/bright', positron: 'https://tiles.openfreemap.org/styles/positron' }
let loading = null
const loadLibre = () => loading ||= new Promise((resolve, reject) => {
  if (window.maplibregl) return resolve(window.maplibregl)
  const css = document.createElement('link')
  css.rel = 'stylesheet'
  css.href = LIBRE + '.css'
  document.head.appendChild(css)
  const script = document.createElement('script')
  script.src = LIBRE + '.js'
  script.onload = () => resolve(window.maplibregl)
  script.onerror = () => { loading = null; reject(new Error('The map could not be loaded')) }
  document.head.appendChild(script)
})

// The words it says itself, in the site's language (App.vue's head says it: \`htmlAttrs: { lang }\`). A text
// that is filled in in the Props tab is said as it is written.
const WORDS = {
  en: { map: 'Map: {n}', empty: 'Write an address to show it on a map', failed: 'The map could not be loaded', more: 'Read more' },
  nb: { map: 'Kart: {n}', empty: 'Skriv en adresse for å vise den på et kart', failed: 'Kartet kunne ikke lastes inn', more: 'Les mer' },
  sv: { map: 'Karta: {n}', empty: 'Skriv en adress för att visa den på en karta', failed: 'Kartan kunde inte laddas', more: 'Läs mer' },
  da: { map: 'Kort: {n}', empty: 'Skriv en adresse for at vise den på et kort', failed: 'Kortet kunne ikke indlæses', more: 'Læs mere' },
  fi: { map: 'Kartta: {n}', empty: 'Kirjoita osoite, niin se näkyy kartalla', failed: 'Karttaa ei voitu ladata', more: 'Lue lisää' },
  de: { map: 'Karte: {n}', empty: 'Gib eine Adresse ein, um sie auf einer Karte zu zeigen', failed: 'Die Karte konnte nicht geladen werden', more: 'Mehr erfahren' },
  fr: { map: 'Carte : {n}', empty: 'Saisissez une adresse pour l’afficher sur une carte', failed: 'La carte n’a pas pu être chargée', more: 'En savoir plus' },
  es: { map: 'Mapa: {n}', empty: 'Escribe una dirección para verla en un mapa', failed: 'No se pudo cargar el mapa', more: 'Leer más' },
  it: { map: 'Mappa: {n}', empty: 'Scrivi un indirizzo per vederlo su una mappa', failed: 'Impossibile caricare la mappa', more: 'Scopri di più' },
  nl: { map: 'Kaart: {n}', empty: 'Typ een adres om het op een kaart te tonen', failed: 'De kaart kon niet worden geladen', more: 'Lees meer' },
  pt: { map: 'Mapa: {n}', empty: 'Escreva um endereço para o ver num mapa', failed: 'Não foi possível carregar o mapa', more: 'Saiba mais' },
  pl: { map: 'Mapa: {n}', empty: 'Wpisz adres, aby zobaczyć go na mapie', failed: 'Nie udało się wczytać mapy', more: 'Czytaj więcej' },
  zh: { map: '地图：{n}', empty: '输入地址即可在地图上显示', failed: '无法加载地图', more: '了解更多' },
  ja: { map: '地図：{n}', empty: '住所を入力すると地図に表示されます', failed: '地図を読み込めませんでした', more: '詳しく見る' }
}

// An address as coordinates (OpenStreetMap's Nominatim), kept for the visit; one question at a time, as it asks
const found = {}
let queue = Promise.resolve()
function locate(text) {
  const key = String(text).trim().toLowerCase()
  if (!key) return Promise.resolve(null)
  try {
    const kept = sessionStorage.getItem('vp-map:' + key)
    if (kept) return Promise.resolve(JSON.parse(kept))
  } catch (e) { /* not kept */ }
  if (found[key]) return found[key]
  found[key] = queue = queue.then(async () => {
    try {
      const answer = await fetch('https://nominatim.openstreetmap.org/search?format=json&limit=1&q=' + encodeURIComponent(text), { headers: { Accept: 'application/json' } })
      const list = await answer.json()
      const at = list?.[0] ? [Number(list[0].lon), Number(list[0].lat)] : null
      try { sessionStorage.setItem('vp-map:' + key, JSON.stringify(at)) } catch (e) { /* not kept */ }
      await new Promise(done => setTimeout(done, 1100))
      return at
    } catch (e) {
      return null
    }
  })
  return found[key]
}

export default {
  props: {
    kind: { type: String, default: 'embed', label: 'Kind', control: 'select', options: [{ key: 'One address (Google Maps)', value: 'embed' }, { key: 'Interactive, with places', value: 'interactive' }] },
    place: { type: String, default: 'Karl Johans gate 1, Oslo', label: 'Address', placeholder: 'Street, town' },
    places: {
      type: Array,
      default: () => [],
      label: 'Places (interactive)',
      control: 'list',
      fields: [
        { key: 'title', label: 'Title' },
        { key: 'address', label: 'Address', placeholder: 'Street, town (or the coordinates below)' },
        { key: 'lat', label: 'Latitude', placeholder: '59.9133' },
        { key: 'lng', label: 'Longitude', placeholder: '10.7389' },
        { key: 'text', label: 'A line about it', control: 'textarea' },
        { key: 'image', label: 'Picture', control: 'media' },
        { key: 'href', label: 'Link', placeholder: '/shops/oslo' }
      ]
    },
    zoom: { type: Number, default: 14, label: 'How close', control: 'number', min: 1, max: 20 },
    look: { type: String, default: 'liberty', label: 'Look (interactive)', control: 'select', options: [{ key: 'Colourful', value: 'liberty' }, { key: 'Bright', value: 'bright' }, { key: 'Light and quiet', value: 'positron' }] },
    pin: { type: String, default: '', label: 'Colour of the places', control: 'color' },
    scrollZoom: { type: Boolean, default: false, label: 'Zoom when scrolled over' },
    linkText: { type: String, default: '', label: 'Link text in a place', placeholder: 'Read more' },
    height: { type: String, default: '', label: 'Height', control: 'slider', unit: 'px', min: 160, max: 900 },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 60 },
    grey: { type: Boolean, default: false, label: 'In grey' },
    seo: { type: Boolean, default: false, label: 'Tell search engines about the place (one place)' }
  },
  data() {
    return { ready: false, problem: '' }
  },
  computed: {
    lang() {
      let lang = ''
      try {
        const head = this.$root?.$options?.head
        lang = (typeof head === 'function' ? head.call(this.$root) : head)?.htmlAttrs?.lang || ''
      } catch (e) {}
      if (!lang && typeof document !== 'undefined') lang = document.documentElement.lang || ''
      return String(lang || 'en').toLowerCase()
    },
    inStudio() {
      return typeof document !== 'undefined' && (!!document.getElementById('receiver') || !!window.studio)
    },
    address() {
      const zoom = Math.max(1, Math.min(20, Math.round(Number(this.zoom) || 14)))
      return 'https://www.google.com/maps?q=' + encodeURIComponent(this.place) + '&z=' + zoom + '&output=embed'
    },
    style() {
      return {
        '--vp-map-height': this.height || undefined,
        '--vp-map-radius': this.radius || undefined,
        '--vp-map-filter': this.grey ? 'grayscale(1)' : undefined,
        '--vp-map-pin': this.pin || undefined
      }
    },
    watched() {
      return JSON.stringify([this.kind, this.places, this.place, this.zoom])
    }
  },
  watch: {
    kind() { this.$nextTick(() => this.start()) },
    look() { if (this.map) { this.map.setStyle(STYLES[this.look] || STYLES.liberty); this.map.once('styledata', () => this.draw()) } },
    scrollZoom(on) { if (this.map) this.map.scrollZoom[on ? 'enable' : 'disable']() },
    watched() { if (this.map) this.draw() },
    pin() { if (this.map) this.paint() }
  },
  mounted() {
    this.start()
  },
  beforeUnmount() {
    this.observer?.disconnect()
    this.map?.remove()
    this.map = null
  },
  methods: {
    say(key, own, n) {
      if (own) return own
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return String(words[key] ?? WORDS.en[key]).replace('{n}', n ?? '')
    },
    // (the map is made when it comes near the screen: a page with a map low down loads fast)
    start() {
      if (this.kind !== 'interactive' || this.map || typeof window === 'undefined') return
      const box = this.$refs.map
      if (!box) return
      if (typeof IntersectionObserver !== 'function') return this.make()
      this.observer = new IntersectionObserver(seen => {
        if (seen.some(one => one.isIntersecting)) { this.observer.disconnect(); this.make() }
      }, { rootMargin: '300px' })
      this.observer.observe(box)
    },
    async make() {
      let libre
      try { libre = await loadLibre() } catch (e) { this.problem = this.say('failed'); return }
      if (!this.$refs.map || this.map) return
      const map = new libre.Map({ container: this.$refs.map, style: STYLES[this.look] || STYLES.liberty, center: [10.7389, 59.9133], zoom: Number(this.zoom) || 14, attributionControl: { compact: true }, cooperativeGestures: false })
      this.map = map
      this.libre = libre
      if (!this.scrollZoom) map.scrollZoom.disable()
      map.addControl(new libre.NavigationControl({ showCompass: false }), 'top-right')
      map.on('load', () => { this.ready = true; this.draw() })
      map.on('click', 'vp-map-clusters', event => {
        const feature = event.features?.[0]
        map.getSource('vp-map-places').getClusterExpansionZoom(feature.properties.cluster_id).then(zoom => map.easeTo({ center: feature.geometry.coordinates, zoom }))
      })
      map.on('click', 'vp-map-points', event => this.popup(event.features?.[0]))
      for (const layer of ['vp-map-clusters', 'vp-map-points']) {
        map.on('mouseenter', layer, () => { map.getCanvas().style.cursor = 'pointer' })
        map.on('mouseleave', layer, () => { map.getCanvas().style.cursor = '' })
      }
    },
    // The places as points: their coordinates, or their address looked up
    async points() {
      const list = Array.isArray(this.places) ? this.places : []
      const shown = []
      for (const [index, one] of list.entries()) {
        let at = Number.isFinite(parseFloat(one?.lat)) && Number.isFinite(parseFloat(one?.lng)) ? [parseFloat(one.lng), parseFloat(one.lat)] : null
        if (!at && one?.address) at = await locate(one.address)
        if (at) shown.push({ type: 'Feature', geometry: { type: 'Point', coordinates: at }, properties: { index } })
      }
      return shown
    },
    async draw() {
      const map = this.map
      if (!map || !map.isStyleLoaded()) return
      const turn = this.turn = (this.turn || 0) + 1
      const features = await this.points()
      if (turn !== this.turn || this.map !== map) return
      const data = { type: 'FeatureCollection', features }
      const source = map.getSource('vp-map-places')
      if (source) source.setData(data)
      else {
        map.addSource('vp-map-places', { type: 'geojson', data, cluster: true, clusterRadius: 44, clusterMaxZoom: 15 })
        map.addLayer({ id: 'vp-map-clusters', type: 'circle', source: 'vp-map-places', filter: ['has', 'point_count'], paint: { 'circle-radius': ['step', ['get', 'point_count'], 16, 10, 20, 50, 26], 'circle-stroke-width': 3, 'circle-stroke-color': '#ffffff' } })
        map.addLayer({ id: 'vp-map-count', type: 'symbol', source: 'vp-map-places', filter: ['has', 'point_count'], layout: { 'text-field': ['get', 'point_count_abbreviated'], 'text-size': 13, 'text-font': ['Noto Sans Bold'] }, paint: { 'text-color': '#ffffff' } })
        map.addLayer({ id: 'vp-map-points', type: 'circle', source: 'vp-map-places', filter: ['!', ['has', 'point_count']], paint: { 'circle-radius': 8, 'circle-stroke-width': 3, 'circle-stroke-color': '#ffffff' } })
        this.paint()
      }
      // (where it looks: all the places, or the address, or one place at the chosen zoom)
      if (features.length > 1) {
        const bounds = new this.libre.LngLatBounds()
        for (const one of features) bounds.extend(one.geometry.coordinates)
        map.fitBounds(bounds, { padding: 56, maxZoom: Number(this.zoom) || 14, duration: 0 })
      } else if (features.length === 1) map.jumpTo({ center: features[0].geometry.coordinates, zoom: Number(this.zoom) || 14 })
      else if (this.place) {
        const at = await locate(this.place)
        if (at && turn === this.turn) map.jumpTo({ center: at, zoom: Number(this.zoom) || 14 })
      }
    },
    paint() {
      const color = this.pin || getComputedStyle(this.$el).getPropertyValue('--vp-primary').trim() || '#2563eb'
      for (const layer of ['vp-map-clusters', 'vp-map-points']) if (this.map?.getLayer(layer)) this.map.setPaintProperty(layer, 'circle-color', color)
    },
    // A place's card on the map: made of elements, so what a place says is never read as HTML
    popup(feature) {
      const one = this.places?.[feature?.properties?.index]
      if (!one) return
      const card = document.createElement('div')
      card.className = 'vp-map__card'
      if (one.image) {
        const img = document.createElement('img')
        img.src = one.image
        img.alt = one.title || ''
        img.decoding = 'async'
        card.appendChild(img)
      }
      for (const [tag, text, name] of [['b', one.title, 'vp-map__card-title'], ['p', one.text, 'vp-map__card-text']]) {
        if (!text) continue
        const el = document.createElement(tag)
        el.className = name
        el.textContent = text
        card.appendChild(el)
      }
      if (one.href) {
        const link = document.createElement('a')
        link.href = one.href
        link.textContent = this.say('more', this.linkText)
        link.className = 'vp-map__card-link'
        link.addEventListener('click', event => {
          if (this.$router && String(one.href).startsWith('/')) { event.preventDefault(); this.$router.push(one.href) }
        })
        card.appendChild(link)
      }
      new this.libre.Popup({ offset: 14, maxWidth: '260px' }).setLngLat(feature.geometry.coordinates).setDOMContent(card).addTo(this.map)
    }
  },
  // What search engines read about the place (on the site, not in the editor, when asked): one place with its
  // address, and where it is when its coordinates are written
  head() {
    if (!this.seo || this.inStudio) return {}
    const places = this.kind === 'interactive' && Array.isArray(this.places) ? this.places.filter(Boolean) : []
    if (places.length > 1) return {}
    const one = places[0] || {}
    const address = String(one.address || (places.length ? '' : this.place) || '').trim()
    const lat = parseFloat(one.lat), lng = parseFloat(one.lng)
    const geo = Number.isFinite(lat) && Number.isFinite(lng) ? { geo: { '@type': 'GeoCoordinates', latitude: lat, longitude: lng } } : {}
    if (!address && !geo.geo) return {}
    return {
      script: [{
        type: 'application/ld+json',
        textContent: {
          '@context': 'https://schema.org',
          '@type': 'Place',
          ...(one.title ? { name: String(one.title).trim() } : {}),
          ...(address ? { address } : {}),
          ...geo,
          ...(one.href && /^https?:/.test(one.href) ? { url: one.href } : {})
        }
      }]
    }
  }
}
<\/script>
<style>
.vp-map {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: var(--vp-map-height, clamp(16rem, 45vw, 26rem));
  overflow: hidden;
  border-radius: var(--vp-map-radius, var(--vp-radius, 12px));
  background: var(--vp-surface, #f1f5f9);
}
.vp-map__frame { display: block; width: 100%; height: 100%; border: 0; filter: var(--vp-map-filter, none); }
.vp-map__canvas { width: 100%; height: 100%; }
.vp-map__canvas canvas { filter: var(--vp-map-filter, none); }
.vp-map__empty { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 1rem; color: var(--vp-muted, #94a3b8); font-size: 0.875rem; text-align: center; }
.vp-map__loading { background: linear-gradient(100deg, transparent 30%, rgba(255, 255, 255, 0.45) 50%, transparent 70%) var(--vp-surface, #f1f5f9); background-size: 200% 100%; animation: vp-map-shine 1.4s linear infinite; }
@keyframes vp-map-shine { to { background-position: -200% 0; } }
.vp-map__card { display: flex; flex-direction: column; gap: 0.3rem; font: 0.875rem/1.45 system-ui, sans-serif; color: #111827; }
.vp-map__card img { width: calc(100% + 20px); margin: -10px -10px 0.35rem; aspect-ratio: 16 / 9; object-fit: cover; border-radius: 4px 4px 0 0; }
.vp-map__card-title { font-size: 0.95rem; }
.vp-map__card-text { margin: 0; opacity: 0.8; }
.vp-map__card-link { color: var(--vp-map-pin, var(--vp-primary, #2563eb)); font-weight: 600; text-decoration: none; }
.vp-map__card-link:hover { text-decoration: underline; }
@media (prefers-reduced-motion: reduce) { .vp-map__loading { animation: none; } }
</style>
`;export{e as default};