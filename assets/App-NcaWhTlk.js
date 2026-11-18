var e=`<template>
  <div
    class="vp-spinning-cube"
    :class="['vp-spinning-cube--' + look, { 'vp-spinning-cube--dragging': dragging }]"
    :style="style"
    role="img"
    :aria-label="label || named"
  >
    <div class="vp-spinning-cube__stage" @pointerdown="down">
      <div ref="cube" class="vp-spinning-cube__cube">
        <div
          v-for="(face, index) in faces"
          :key="index"
          class="vp-spinning-cube__face"
          :class="'vp-spinning-cube__face--' + index"
          :style="faceStyle(face, index)"
        >
          <img v-if="face.image" class="vp-spinning-cube__image" :src="address(face.image) || undefined" :style="held(face.image)" alt="" draggable="false">
          <span v-if="face.title" class="vp-spinning-cube__title">{{ face.title }}</span>
        </div>
      </div>
      <div v-if="shadow" class="vp-spinning-cube__shadow" aria-hidden="true"></div>
    </div>
  </div>
</template>
<script>
// A cube that turns slowly in the air with six faces: a picture, a word or a colour on each. It can be taken
// and spun by dragging (or swiping); let go, it slows down and goes on turning by itself. Glass faces let the
// ones behind be seen. People who ask for less motion get a cube that only turns when dragged.
// (A picture picked in the Studio is the name of a variable that holds it, like --image-boat: it is shown
// through that variable at once, and its address is read from it when the page is alive. An address is used as it is.)
const SIDES = ['rotateY(0deg)', 'rotateY(90deg)', 'rotateY(180deg)', 'rotateY(-90deg)', 'rotateX(90deg)', 'rotateX(-90deg)']

export default {
  props: {
    sides: {
      type: Array,
      default: () => [
        { image: '', title: 'Design', color: '' },
        { image: '', title: 'Code', color: '' },
        { image: '', title: 'Learn', color: '' },
        { image: '', title: 'Animate', color: '' },
        { image: '', title: 'Publish', color: '' },
        { image: '', title: 'Share', color: '' }
      ],
      label: 'Faces',
      control: 'list',
      fields: [{ key: 'image', label: 'Picture', control: 'media' }, { key: 'title', label: 'Word' }, { key: 'color', label: 'Colour', control: 'color' }]
    },
    size: { type: String, default: '', label: 'Size', control: 'slider', unit: 'px', min: 80, max: 400 },
    look: {
      type: String,
      default: 'solid',
      label: 'Look',
      options: [{ key: 'Solid', value: 'solid' }, { key: 'Glass', value: 'glass' }, { key: 'Lines', value: 'lines' }]
    },
    speed: { type: String, default: '', label: 'Turns by itself', control: 'slider', unit: '', min: 0, max: 10 },
    drag: { type: Boolean, default: true, label: 'Can be spun by dragging' },
    shadow: { type: Boolean, default: true, label: 'Shadow under it' },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 40 },
    label: { type: String, default: '', label: 'Described', placeholder: 'What it shows, for screen readers' }
  },
  data() {
    return { dragging: false, found: {} }
  },
  computed: {
    faces() {
      const list = Array.isArray(this.sides) ? this.sides.slice(0, 6) : []
      while (list.length < 6) list.push({})
      return list
    },
    named() {
      return this.faces.map(face => face && face.title).filter(Boolean).join(', ')
    },
    edge() {
      return parseFloat(this.size) || 200
    },
    style() {
      return {
        '--vp-spinning-cube-size': this.edge + 'px',
        '--vp-spinning-cube-radius': this.radius || undefined
      }
    }
  },
  watch: {
    sides: {
      deep: true,
      handler() {
        this.find()
      }
    }
  },
  mounted() {
    this.still = typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    this.turn = { x: -22, y: 32 }
    this.spin = { x: 0, y: 0 }
    this.place()
    this.find()
    if (typeof IntersectionObserver !== 'undefined' && this.$el && this.$el.nodeType === 1) {
      this.seen = false
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
    this.up()
  },
  methods: {
    faceStyle(face, index) {
      const hue = [158, 200, 265, 330, 30, 95][index]
      return {
        transform: SIDES[index] + ' translateZ(calc(var(--_s) / 2))',
        '--vp-spinning-cube-face': (face && face.color) || 'hsl(' + hue + ' 72% 48%)'
      }
    },
    place() {
      const cube = this.$refs.cube
      if (cube) cube.style.transform = 'rotateX(' + this.turn.x.toFixed(2) + 'deg) rotateY(' + this.turn.y.toFixed(2) + 'deg)'
    },
    // turning: by itself at its speed, plus what a drag gave it, slowing down
    run() {
      if (this.frame) return
      let last = 0
      const step = time => {
        const dt = last ? Math.min(64, time - last) / 16.67 : 1
        last = time
        const own = this.still ? 0 : (this.speed === '' ? 3 : parseFloat(this.speed) || 0) * 0.12
        if (!this.dragging) {
          this.turn.x += this.spin.x * dt
          this.turn.y += (this.spin.y + own) * dt
          this.spin.x *= Math.pow(0.95, dt)
          this.spin.y *= Math.pow(0.95, dt)
          // it leans back to a slant it is good to look at
          this.turn.x += (-22 - this.turn.x) * 0.01 * dt
        }
        this.place()
        const moving = this.dragging || own || Math.abs(this.spin.x) + Math.abs(this.spin.y) > 0.01
        const hidden = typeof document !== 'undefined' && document.hidden
        this.frame = moving && this.seen && !hidden ? requestAnimationFrame(step) : 0
      }
      this.frame = requestAnimationFrame(step)
    },
    down(event) {
      if (!this.drag || event.button) return
      this.dragging = true
      this.from = { x: event.clientX, y: event.clientY }
      this.onMove = e => {
        const dx = e.clientX - this.from.x, dy = e.clientY - this.from.y
        this.from = { x: e.clientX, y: e.clientY }
        this.turn.y += dx * 0.45
        this.turn.x -= dy * 0.45
        this.spin = { x: -dy * 0.45, y: dx * 0.45 }
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
    },
    address(value) {
      return /^--/.test(value) ? this.found[value] || '' : value || ''
    },
    held(value) {
      return /^--/.test(value) && !this.found[value] ? { content: 'var(' + value + ')' } : undefined
    },
    find() {
      if (!this.$el || this.$el.nodeType !== 1) return
      const found = {}
      const style = getComputedStyle(this.$el)
      for (const face of this.faces) {
        if (!face || !/^--/.test(face.image)) continue
        const address = /^\\s*url\\(\\s*(['"]?)(.*?)\\1\\s*\\)\\s*$/.exec(style.getPropertyValue(face.image))
        if (address) found[face.image] = address[2]
      }
      this.found = found
    }
  }
}
<\/script>
<style>
.vp-spinning-cube {
  --_s: min(var(--vp-spinning-cube-size, 200px), 60vw);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  width: 100%;
  min-width: 0;
  padding: calc(var(--_s) * 0.35) 0 calc(var(--_s) * 0.5);
}
.vp-spinning-cube__stage {
  position: relative;
  width: var(--_s);
  height: var(--_s);
  perspective: calc(var(--_s) * 4);
  cursor: grab;
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
}
.vp-spinning-cube--dragging .vp-spinning-cube__stage { cursor: grabbing; }
.vp-spinning-cube__cube {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  transform: rotateX(-22deg) rotateY(32deg);
}
.vp-spinning-cube__face {
  position: absolute;
  inset: 0;
  box-sizing: border-box;
  display: grid;
  place-items: center;
  overflow: hidden;
  border-radius: var(--vp-spinning-cube-radius, 10px);
  color: #fff;
  font-family: var(--vp-font-heading, inherit);
  font-weight: 700;
  font-size: calc(var(--_s) * 0.12);
  letter-spacing: -0.01em;
}
.vp-spinning-cube--solid .vp-spinning-cube__face {
  background:
    radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.35), transparent 60%),
    var(--vp-spinning-cube-face);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.25), inset 0 -20px 40px rgba(0, 0, 0, 0.18);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.vp-spinning-cube--glass .vp-spinning-cube__face {
  background: color-mix(in srgb, var(--vp-spinning-cube-face) 35%, transparent);
  border: 1px solid color-mix(in srgb, var(--vp-spinning-cube-face) 80%, #fff);
  box-shadow: inset 0 0 30px color-mix(in srgb, var(--vp-spinning-cube-face) 50%, transparent);
  backdrop-filter: blur(3px);
}
.vp-spinning-cube--lines .vp-spinning-cube__face {
  background: transparent;
  border: 2px solid var(--vp-spinning-cube-face);
  color: var(--vp-spinning-cube-face);
  box-shadow: 0 0 18px color-mix(in srgb, var(--vp-spinning-cube-face) 45%, transparent), inset 0 0 18px color-mix(in srgb, var(--vp-spinning-cube-face) 30%, transparent);
}
.vp-spinning-cube__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
.vp-spinning-cube__title { position: relative; padding: 0 0.5em; text-align: center; text-shadow: 0 2px 10px rgba(0, 0, 0, 0.25); }
.vp-spinning-cube__image + .vp-spinning-cube__title { align-self: end; margin-bottom: 0.6em; padding: 0.15em 0.6em; border-radius: 999px; background: rgba(0, 0, 0, 0.45); font-size: 0.6em; text-shadow: none; }
.vp-spinning-cube__shadow {
  position: absolute;
  left: 10%;
  right: 10%;
  bottom: -55%;
  height: 22%;
  border-radius: 50%;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--vp-text, #0f172a) 30%, transparent), transparent);
  filter: blur(6px);
  pointer-events: none;
}
.vp-spinning-cube--lines .vp-spinning-cube__shadow { display: none; }
</style>
`;export{e as default};