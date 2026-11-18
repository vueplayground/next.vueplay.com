var e=`<template>
  <figure class="vp-globe" :class="{ 'vp-globe--dragging': dragging }" :style="style">
    <div class="vp-globe__stage" @pointerdown="down">
      <canvas ref="canvas" class="vp-globe__canvas" aria-hidden="true"></canvas>
      <span
        v-for="(place, index) in spots"
        :key="index"
        ref="labels"
        class="vp-globe__label"
        aria-hidden="true"
      >{{ place.name }}</span>
    </div>
    <figcaption class="vp-globe__places">
      <span v-if="label">{{ label }}</span>
      <ul v-if="spots.length">
        <li v-for="(place, index) in spots" :key="index">{{ place.name }}</li>
      </ul>
    </figcaption>
  </figure>
</template>
<script>
// The earth as a globe of dots that turns slowly: the land drawn in dots, the places asked for marked and named,
// and arcs flying between them. It can be turned by dragging (or swiping); let go, it goes on by itself. It is
// drawn on a canvas, only while it is on the screen; the places are also written out for screen readers.
// (The land is a rough outline of each continent, enough for a globe of dots, kept here so nothing is fetched.)
const LAND = [
  [[-168, 66], [-162, 70], [-140, 70], [-120, 72], [-95, 72], [-80, 73], [-62, 66], [-55, 52], [-66, 45], [-70, 42], [-76, 35], [-80, 32], [-81, 25], [-84, 30], [-90, 29], [-97, 26], [-97, 21], [-90, 21], [-87, 15], [-83, 9], [-79, 8], [-85, 11], [-92, 15], [-105, 20], [-110, 24], [-112, 31], [-117, 33], [-124, 40], [-124, 48], [-132, 55], [-140, 60], [-152, 59], [-165, 55], [-160, 60], [-166, 62]],
  [[-55, 60], [-44, 60], [-20, 70], [-18, 77], [-30, 83], [-60, 82], [-72, 78], [-58, 75], [-52, 68]],
  [[-80, 9], [-77, 8], [-60, 11], [-50, 0], [-35, -5], [-35, -9], [-39, -15], [-41, -22], [-48, -26], [-53, -34], [-58, -38], [-63, -41], [-65, -47], [-68, -52], [-74, -53], [-73, -45], [-73, -37], [-71, -30], [-70, -18], [-76, -14], [-81, -6], [-80, -1]],
  [[-10, 36], [-9, 43], [-2, 44], [-5, 48], [2, 51], [5, 53], [8, 57], [5, 62], [12, 66], [18, 70], [28, 71], [40, 67], [44, 68], [60, 69], [60, 55], [50, 47], [40, 47], [36, 45], [29, 41], [26, 40], [23, 36], [20, 40], [16, 38], [12, 44], [8, 44], [3, 43], [-1, 37]],
  [[-17, 21], [-13, 28], [-10, 30], [-6, 36], [10, 37], [11, 33], [20, 31], [25, 32], [32, 31], [34, 28], [39, 22], [43, 12], [51, 12], [45, 2], [40, -5], [39, -10], [41, -15], [35, -22], [33, -27], [28, -33], [20, -35], [17, -29], [12, -17], [13, -8], [9, -1], [9, 4], [4, 6], [-4, 5], [-8, 4], [-13, 8], [-17, 14]],
  [[26, 40], [36, 36], [35, 32], [43, 13], [52, 16], [58, 22], [56, 26], [50, 30], [57, 25], [62, 25], [67, 24], [72, 21], [77, 8], [80, 15], [87, 22], [92, 22], [98, 16], [98, 8], [103, 1], [104, 10], [109, 12], [108, 21], [118, 24], [122, 31], [119, 35], [122, 40], [127, 35], [129, 40], [135, 43], [141, 50], [136, 54], [142, 59], [156, 59], [163, 62], [180, 65], [180, 70], [160, 71], [140, 73], [113, 74], [100, 78], [80, 73], [68, 73], [60, 69], [60, 55], [50, 47], [40, 47], [36, 45], [29, 41]],
  [[114, -22], [114, -34], [118, -35], [123, -34], [131, -31], [138, -35], [141, -38], [147, -38], [150, -37], [153, -28], [153, -25], [146, -19], [142, -11], [141, -17], [136, -12], [131, -11], [126, -14], [122, -18]],
  [[95, 5], [98, 4], [106, -6], [102, -4]],
  [[109, 2], [117, 7], [119, 1], [116, -4], [110, -3]],
  [[131, -1], [141, -3], [150, -10], [141, -9], [137, -5]],
  [[130, 31], [135, 34], [140, 35], [142, 40], [141, 45], [144, 44], [140, 41], [136, 37], [132, 35]],
  [[-5, 50], [1, 51], [2, 53], [-1, 55], [-3, 59], [-6, 58], [-5, 55], [-3, 54], [-5, 52]],
  [[44, -25], [47, -25], [50, -15], [49, -12], [44, -17]],
  [[172, -34], [178, -38], [174, -41], [167, -46], [171, -44]],
  [[-24, 64], [-14, 64], [-14, 66], [-22, 66]]
]
const inside = (lng, lat, ring) => {
  let yes = false
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j]
    if ((yi > lat) !== (yj > lat) && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) yes = !yes
  }
  return yes
}
// points spread evenly over the sphere, those on land kept (made once, the first time a globe is drawn)
let dots = null
const pointsOf = (all) => {
  const out = []
  const many = 9000
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < many; i++) {
    const y = 1 - (i / (many - 1)) * 2
    const lat = Math.asin(y) * 180 / Math.PI
    const lng = ((((i * golden) * 180 / Math.PI) % 360) + 540) % 360 - 180
    if (all || lat < -72 || LAND.some(ring => inside(lng, lat, ring))) out.push([lat * Math.PI / 180, lng * Math.PI / 180])
  }
  return out
}

export default {
  props: {
    places: {
      type: Array,
      default: () => [
        { name: 'Oslo', lat: 59.9, lng: 10.7 },
        { name: 'New York', lat: 40.7, lng: -74 },
        { name: 'São Paulo', lat: -23.5, lng: -46.6 },
        { name: 'Nairobi', lat: -1.3, lng: 36.8 },
        { name: 'Singapore', lat: 1.35, lng: 103.8 },
        { name: 'Tokyo', lat: 35.7, lng: 139.7 },
        { name: 'Sydney', lat: -33.9, lng: 151.2 }
      ],
      label: 'Places',
      control: 'list',
      fields: [{ key: 'name', label: 'Name' }, { key: 'lat', label: 'Latitude', control: 'number', min: -90, max: 90 }, { key: 'lng', label: 'Longitude', control: 'number', min: -180, max: 180 }]
    },
    look: {
      type: String,
      default: 'land',
      label: 'Look',
      options: [{ key: 'Land in dots', value: 'land' }, { key: 'All dots', value: 'dots' }, { key: 'Lines', value: 'lines' }]
    },
    arcs: {
      type: String,
      default: 'chain',
      label: 'Arcs',
      options: [{ key: 'From one to the next', value: 'chain' }, { key: 'From the first to all', value: 'hub' }, { key: 'None', value: 'none' }]
    },
    names: { type: Boolean, default: true, label: 'Names of the places' },
    color: { type: String, default: '', label: 'Land color', control: 'color' },
    accent: { type: String, default: '', label: 'Places and arcs', control: 'color' },
    glow: { type: Boolean, default: true, label: 'Glow around it' },
    size: { type: String, default: '', label: 'Size', control: 'slider', unit: 'px', min: 200, max: 800 },
    speed: { type: String, default: '', label: 'Turns by itself', control: 'slider', unit: '', min: 0, max: 10 },
    tilt: { type: String, default: '', label: 'Leans', control: 'slider', unit: 'deg', min: -40, max: 40 },
    start: { type: Number, default: 10, label: 'Faces at first (longitude)', control: 'number', min: -180, max: 180 },
    label: { type: String, default: '', label: 'Described', placeholder: 'What the globe shows' }
  },
  data() {
    return { dragging: false }
  },
  computed: {
    spots() {
      return (Array.isArray(this.places) ? this.places : [])
        .filter(place => place && isFinite(parseFloat(place.lat)) && isFinite(parseFloat(place.lng)))
        .map(place => ({ name: place.name || '', lat: parseFloat(place.lat) * Math.PI / 180, lng: parseFloat(place.lng) * Math.PI / 180 }))
    },
    style() {
      return {
        '--vp-globe-size': this.size || undefined,
        '--vp-globe-land': this.color || undefined,
        '--vp-globe-accent': this.accent || undefined
      }
    }
  },
  watch: {
    look() {
      this.points = null
      this.draw()
    },
    places: { deep: true, handler() { this.$nextTick(() => this.draw()) } },
    arcs() { this.draw() },
    tilt() { this.draw() },
    glow() { this.draw() },
    color() { this.$nextTick(() => this.draw()) },
    accent() { this.$nextTick(() => this.draw()) }
  },
  mounted() {
    this.still = typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    this.turn = -(this.start || 0) * Math.PI / 180
    this.spin = 0
    this.fit()
    if (typeof ResizeObserver !== 'undefined' && this.$el && this.$el.nodeType === 1) {
      this.sizer = new ResizeObserver(() => this.fit())
      this.sizer.observe(this.$refs.canvas)
    }
    if (typeof IntersectionObserver !== 'undefined' && this.$el && this.$el.nodeType === 1) {
      this.watcher = new IntersectionObserver(entries => {
        this.seen = entries.some(entry => entry.isIntersecting)
        if (this.seen) this.run()
      })
      this.watcher.observe(this.$el)
    } else {
      this.seen = true
      this.run()
    }
  },
  beforeUnmount() {
    if (this.frame) cancelAnimationFrame(this.frame)
    if (this.watcher) this.watcher.disconnect()
    if (this.sizer) this.sizer.disconnect()
    this.up()
  },
  methods: {
    fit() {
      const canvas = this.$refs.canvas
      if (!canvas || !canvas.getBoundingClientRect) return
      const box = canvas.getBoundingClientRect()
      const ratio = Math.min(2, (typeof window !== 'undefined' && window.devicePixelRatio) || 1)
      this.side = box.width || 0
      canvas.width = Math.round(this.side * ratio)
      canvas.height = Math.round(this.side * ratio)
      this.ratio = ratio
      this.draw()
    },
    run() {
      if (this.frame) return
      let last = 0
      const step = time => {
        const dt = last ? Math.min(64, time - last) / 16.67 : 1
        last = time
        const own = this.still ? 0 : (this.speed === '' ? 3 : parseFloat(this.speed) || 0) * 0.0007
        if (!this.dragging) {
          this.turn += (own + this.spin) * dt
          this.spin *= Math.pow(0.95, dt)
        }
        this.time = time
        this.draw()
        const hidden = typeof document !== 'undefined' && document.hidden
        const moving = !this.still || this.dragging || Math.abs(this.spin) > 0.00005
        this.frame = this.seen && !hidden && moving ? requestAnimationFrame(step) : 0
      }
      this.frame = requestAnimationFrame(step)
    },
    draw() {
      const canvas = this.$refs.canvas
      const ctx = canvas && canvas.getContext && canvas.getContext('2d')
      if (!ctx || !this.side) return
      if (!this.points) this.points = this.look === 'dots' ? pointsOf(true) : this.look === 'land' ? (dots || (dots = pointsOf(false))) : []
      const style = getComputedStyle(this.$el)
      const land = style.getPropertyValue('--_land').trim() || '#10a37c'
      const accent = style.getPropertyValue('--_accent').trim() || '#00a6ff'
      const w = canvas.width, r = w * 0.4, c = w / 2
      const lean = (this.tilt === '' ? 18 : parseFloat(this.tilt) || 0) * Math.PI / 180
      const cl = Math.cos(lean), sl = Math.sin(lean), turn = this.turn || 0
      // a point of the globe on the canvas: x, y, and how far toward the viewer (1 front, -1 back)
      const at = (lat, lng, lift = 1) => {
        const x0 = Math.cos(lat) * Math.sin(lng + turn), y0 = Math.sin(lat), z0 = Math.cos(lat) * Math.cos(lng + turn)
        const y = y0 * cl - z0 * sl, z = y0 * sl + z0 * cl
        return [c + x0 * r * lift, c - y * r * lift, z]
      }
      ctx.clearRect(0, 0, w, w)
      if (this.glow) {
        const halo = ctx.createRadialGradient(c, c, r * 0.95, c, c, r * 1.24)
        halo.addColorStop(0, this.tint(land, 0.22))
        halo.addColorStop(1, this.tint(land, 0))
        ctx.fillStyle = halo
        ctx.fillRect(0, 0, w, w)
      }
      // the sphere itself, faintly
      const body = ctx.createRadialGradient(c - r * 0.35, c - r * 0.35, r * 0.1, c, c, r)
      body.addColorStop(0, this.tint(land, 0.1))
      body.addColorStop(1, this.tint(land, 0.03))
      ctx.fillStyle = body
      ctx.beginPath()
      ctx.arc(c, c, r, 0, Math.PI * 2)
      ctx.fill()
      const dot = Math.max(1.2, r / 120)
      if (this.look === 'lines') {
        ctx.strokeStyle = this.tint(land, 0.55)
        ctx.lineWidth = dot * 0.8
        for (let lat = -60; lat <= 60; lat += 30) this.line(ctx, at, d => [lat * Math.PI / 180, d])
        for (let lng = 0; lng < 360; lng += 20) this.line(ctx, at, d => [d / 2, lng * Math.PI / 180], true)
      } else {
        ctx.fillStyle = land
        for (const [lat, lng] of this.points) {
          const [x, y, z] = at(lat, lng)
          if (z < 0) continue
          ctx.globalAlpha = 0.35 + z * 0.65
          ctx.beginPath()
          ctx.arc(x, y, dot * 0.6, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.globalAlpha = 1
      }
      // arcs between the places, a light running along each
      const spots = this.spots
      const pairs = this.arcs === 'none' || spots.length < 2 ? [] : this.arcs === 'hub' ? spots.slice(1).map(s => [spots[0], s]) : spots.slice(1).map((s, i) => [spots[i], s])
      const now = (this.time || 0) / 2600
      ctx.lineWidth = dot * 1.1
      pairs.forEach(([a, b], index) => {
        const path = this.arc(a, b)
        ctx.strokeStyle = this.tint(accent, 0.55)
        ctx.beginPath()
        let pen = false
        path.forEach(([lat, lng, lift]) => {
          const [x, y, z] = at(lat, lng, lift)
          if (z < 0 && Math.hypot(x - c, y - c) < r) { pen = false; return }
          if (pen) ctx.lineTo(x, y)
          else ctx.moveTo(x, y)
          pen = true
        })
        ctx.stroke()
        const t = ((now + index * 0.37) % 1)
        const [lat, lng, lift] = path[Math.floor(t * (path.length - 1))]
        const [x, y, z] = at(lat, lng, lift)
        if (z >= 0 || Math.hypot(x - c, y - c) >= r) {
          ctx.fillStyle = accent
          ctx.beginPath()
          ctx.arc(x, y, dot * 2.2, 0, Math.PI * 2)
          ctx.fill()
        }
      })
      // the places, and their names beside them
      const labels = this.$refs.labels || []
      spots.forEach((spot, index) => {
        const [x, y, z] = at(spot.lat, spot.lng)
        const shown = z > 0
        if (shown) {
          const pulse = 1 + ((now * 1.5 + index * 0.3) % 1) * 2.5
          ctx.strokeStyle = this.tint(accent, Math.max(0, 0.7 - (pulse - 1) / 3))
          ctx.lineWidth = dot
          ctx.beginPath()
          ctx.arc(x, y, dot * 2 * pulse, 0, Math.PI * 2)
          ctx.stroke()
          ctx.fillStyle = accent
          ctx.beginPath()
          ctx.arc(x, y, dot * 2.2, 0, Math.PI * 2)
          ctx.fill()
        }
        const label = labels[index]
        if (label) {
          label.style.opacity = this.names && z > 0.15 ? String(Math.min(1, z * 1.6)) : '0'
          // (on the right half the name goes to the left of its place, so it stays on the globe's side)
          const right = x > c
          label.style.transform = 'translate(' + (x / (this.ratio || 1) + (right ? -10 : 10)).toFixed(1) + 'px, ' + (y / (this.ratio || 1) - 10).toFixed(1) + 'px)' + (right ? ' translateX(-100%)' : '')
        }
      })
    },
    line(ctx, at, point, half) {
      ctx.beginPath()
      let pen = false
      for (let i = 0; i <= 72; i++) {
        const d = half ? (i / 72 - 0.5) * Math.PI * 2 : (i / 72) * Math.PI * 2
        const [lat, lng] = point(d)
        const [x, y, z] = at(lat, lng)
        if (z < 0) { pen = false; continue }
        if (pen) ctx.lineTo(x, y)
        else ctx.moveTo(x, y)
        pen = true
      }
      ctx.stroke()
    },
    // the way between two places along the globe, lifted above it in the middle
    arc(a, b) {
      const v = (lat, lng) => [Math.cos(lat) * Math.cos(lng), Math.cos(lat) * Math.sin(lng), Math.sin(lat)]
      const p = v(a.lat, a.lng), q = v(b.lat, b.lng)
      const angle = Math.acos(Math.max(-1, Math.min(1, p[0] * q[0] + p[1] * q[1] + p[2] * q[2])))
      const out = []
      for (let i = 0; i <= 40; i++) {
        const t = i / 40
        const s = Math.sin(angle) || 1
        const f1 = Math.sin((1 - t) * angle) / s, f2 = Math.sin(t * angle) / s
        const x = f1 * p[0] + f2 * q[0], y = f1 * p[1] + f2 * q[1], z = f1 * p[2] + f2 * q[2]
        out.push([Math.atan2(z, Math.hypot(x, y)), Math.atan2(y, x), 1 + Math.sin(t * Math.PI) * Math.min(0.22, angle * 0.14)])
      }
      return out
    },
    // a colour see-through by \`alpha\` (any colour the page gives, through the canvas's own reading of it)
    tint(color, alpha) {
      if (!this.mixer && typeof document !== 'undefined') this.mixer = document.createElement('canvas').getContext('2d')
      const m = this.mixer
      if (!m) return color
      m.fillStyle = '#000'
      m.fillStyle = color
      const hex = m.fillStyle
      if (/^#[0-9a-f]{6}$/i.test(hex)) return 'rgba(' + parseInt(hex.slice(1, 3), 16) + ',' + parseInt(hex.slice(3, 5), 16) + ',' + parseInt(hex.slice(5, 7), 16) + ',' + alpha + ')'
      return hex.replace(/rgba?\\(([^,]+),([^,]+),([^,)]+)(?:,[^)]+)?\\)/, 'rgba($1,$2,$3,' + alpha + ')')
    },
    down(event) {
      if (event.button) return
      this.dragging = true
      this.from = event.clientX
      this.onMove = e => {
        const dx = e.clientX - this.from
        this.from = e.clientX
        const by = dx / Math.max(200, this.side || 400) * Math.PI
        this.turn += by
        this.spin = by * 0.5
      }
      this.onUp = () => this.up()
      window.addEventListener('pointermove', this.onMove)
      window.addEventListener('pointerup', this.onUp)
      window.addEventListener('pointercancel', this.onUp)
      this.run()
    },
    up() {
      if (typeof window === 'undefined' || !this.onMove) return
      window.removeEventListener('pointermove', this.onMove)
      window.removeEventListener('pointerup', this.onUp)
      window.removeEventListener('pointercancel', this.onUp)
      this.onMove = null
      this.dragging = false
      this.run()
    }
  }
}
<\/script>
<style>
.vp-globe {
  --_land: var(--vp-globe-land, var(--vp-primary, #10a37c));
  --_accent: var(--vp-globe-accent, #00a6ff);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 0;
  margin: 0;
  overflow: clip;
}
.vp-globe__stage {
  position: relative;
  width: min(var(--vp-globe-size, 480px), 100%);
  aspect-ratio: 1;
  cursor: grab;
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
}
.vp-globe--dragging .vp-globe__stage { cursor: grabbing; }
.vp-globe__canvas { display: block; width: 100%; height: 100%; }
.vp-globe__label {
  position: absolute;
  left: 0;
  top: 0;
  padding: 0.15em 0.55em;
  border-radius: 999px;
  background: color-mix(in srgb, var(--vp-surface, #fff) 80%, transparent);
  border: 1px solid color-mix(in srgb, var(--_accent) 40%, transparent);
  color: var(--vp-text, #0f172a);
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  backdrop-filter: blur(4px);
  transition: opacity 200ms ease;
}
.vp-globe__places { font-size: 0.9em; opacity: 0.75; text-align: center; }
.vp-globe__places ul {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
</style>
`;export{e as default};