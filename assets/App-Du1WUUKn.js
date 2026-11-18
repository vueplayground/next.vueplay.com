var e=`<template>
  <div
    class="vp-extruded-text"
    :class="['vp-extruded-text--' + look, 'vp-extruded-text--' + align, { 'vp-extruded-text--float': float && !still }]"
    :style="style"
  >
    <div class="vp-extruded-text__block">
      <span
        v-for="layer in layers"
        :key="layer"
        class="vp-extruded-text__layer"
        :style="{ transform: 'translateZ(' + (-layer) + 'px)', '--vp-extruded-text-shade': (layer / layers.length).toFixed(3) }"
        aria-hidden="true"
      >{{ text }}</span>
      <component :is="tag" class="vp-extruded-text__face">{{ text }}</component>
    </div>
  </div>
</template>
<script>
// Words that stand out of the page as a solid block: the face in front, its sides in depth behind it, leaning
// toward the pointer as it moves over the page (or floating by itself). The words in front are a real heading
// or paragraph, read by search engines and screen readers; the depth is only to look at.
export default {
  props: {
    text: { type: String, default: 'Make it pop', label: 'Words' },
    tag: {
      type: String,
      default: 'h2',
      label: 'Is a',
      options: [{ key: 'Main heading', value: 'h1' }, { key: 'Heading', value: 'h2' }, { key: 'Small heading', value: 'h3' }, { key: 'Paragraph', value: 'p' }]
    },
    size: {
      type: String,
      default: 'large',
      label: 'Size',
      options: [{ key: 'Medium', value: 'medium' }, { key: 'Large', value: 'large' }, { key: 'Huge', value: 'huge' }, { key: 'Giant', value: 'giant' }]
    },
    look: {
      type: String,
      default: 'solid',
      label: 'Look',
      options: [{ key: 'Solid', value: 'solid' }, { key: 'Gradient', value: 'gradient' }, { key: 'Neon', value: 'neon' }, { key: 'Outline', value: 'outline' }]
    },
    depth: { type: String, default: '', label: 'Depth', control: 'slider', unit: 'px', min: 2, max: 60 },
    color: { type: String, default: '', label: 'Front color', control: 'color' },
    sideColor: { type: String, default: '', label: 'Side color', control: 'color' },
    follow: { type: Boolean, default: true, label: 'Leans toward the pointer' },
    float: { type: Boolean, default: false, label: 'Floats by itself' },
    lean: { type: String, default: '', label: 'How far it leans', control: 'slider', unit: 'deg', min: 0, max: 40 },
    align: {
      type: String,
      default: 'center',
      label: 'Align',
      options: [{ key: 'Left', value: 'left' }, { key: 'Center', value: 'center' }, { key: 'Right', value: 'right' }]
    },
    font: { type: String, default: '', label: 'Font', control: 'font' }
  },
  data() {
    return { still: false }
  },
  computed: {
    layers() {
      const deep = Math.max(2, Math.min(60, Math.round(parseFloat(this.depth) || 26)))
      return Array.from({ length: deep }, (_, i) => deep - i)
    },
    style() {
      return {
        '--vp-extruded-text-color': this.color || undefined,
        '--vp-extruded-text-side': this.sideColor || undefined,
        '--vp-extruded-text-font': this.font || undefined
      }
    }
  },
  watch: {
    follow() {
      this.listen()
    }
  },
  mounted() {
    this.still = typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    this.aim = { x: 0, y: 0 }
    this.now = { x: 0, y: 0 }
    this.listen()
  },
  beforeUnmount() {
    if (this.frame) cancelAnimationFrame(this.frame)
    if (this.onMove) window.removeEventListener('pointermove', this.onMove)
  },
  methods: {
    listen() {
      if (typeof window === 'undefined') return
      if (this.onMove) window.removeEventListener('pointermove', this.onMove)
      this.onMove = null
      if (!this.follow || this.still) {
        this.aim = { x: 0, y: 0 }
        this.run()
        return
      }
      this.onMove = event => {
        if (!this.$el || this.$el.nodeType !== 1) return
        const box = this.$el.getBoundingClientRect()
        if (box.bottom < 0 || box.top > window.innerHeight) return
        const x = (event.clientX - (box.left + box.width / 2)) / Math.max(320, window.innerWidth / 2)
        const y = (event.clientY - (box.top + box.height / 2)) / Math.max(240, window.innerHeight / 2)
        this.aim = { x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) }
        this.run()
      }
      window.addEventListener('pointermove', this.onMove, { passive: true })
    },
    run() {
      if (this.frame) return
      const step = () => {
        const now = this.now, aim = this.aim
        now.x += (aim.x - now.x) * 0.08
        now.y += (aim.y - now.y) * 0.08
        const most = this.lean === '' ? 30 : parseFloat(this.lean) || 0
        if (this.$el && this.$el.nodeType === 1) {
          this.$el.style.setProperty('--vp-extruded-text-ry', (now.x * most).toFixed(3) + 'deg')
          this.$el.style.setProperty('--vp-extruded-text-rx', (-now.y * most * 0.7).toFixed(3) + 'deg')
        }
        const done = Math.abs(aim.x - now.x) < 0.001 && Math.abs(aim.y - now.y) < 0.001
        this.frame = done ? 0 : requestAnimationFrame(step)
      }
      this.frame = requestAnimationFrame(step)
    }
  }
}
<\/script>
<style>
.vp-extruded-text {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  width: 100%;
  min-width: 0;
  padding: 0.3em 0;
  perspective: 600px;
  font-family: var(--vp-extruded-text-font, var(--vp-font-heading, inherit));
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.02em;
}
.vp-extruded-text--left { justify-content: flex-start; }
.vp-extruded-text--right { justify-content: flex-end; }
.vp-extruded-text__block {
  position: relative;
  display: grid;
  max-width: 100%;
  transform-style: preserve-3d;
  transform: rotateX(var(--vp-extruded-text-rx, 10deg)) rotateY(var(--vp-extruded-text-ry, -20deg));
}
.vp-extruded-text--float .vp-extruded-text__block { animation: vp-extruded-text-float 6s ease-in-out infinite alternate; }
@keyframes vp-extruded-text-float {
  from { translate: 0 -6px; }
  to { translate: 0 6px; }
}
.vp-extruded-text__face,
.vp-extruded-text__layer {
  grid-area: 1 / 1;
  margin: 0;
  font: inherit;
  font-size: clamp(2.5rem, 7vw, 4.5rem);
  line-height: 1.05;
  letter-spacing: inherit;
  text-align: inherit;
  overflow-wrap: anywhere;
}
.vp-extruded-text--left .vp-extruded-text__block { text-align: left; }
.vp-extruded-text--center .vp-extruded-text__block { text-align: center; }
.vp-extruded-text--right .vp-extruded-text__block { text-align: right; }
.vp-extruded-text--medium :is(.vp-extruded-text__face, .vp-extruded-text__layer) { font-size: clamp(1.75rem, 4.5vw, 2.75rem); }
.vp-extruded-text--huge :is(.vp-extruded-text__face, .vp-extruded-text__layer) { font-size: clamp(3rem, 10vw, 7rem); }
.vp-extruded-text--giant :is(.vp-extruded-text__face, .vp-extruded-text__layer) { font-size: clamp(3.5rem, 14vw, 11rem); }
.vp-extruded-text__face { position: relative; color: var(--vp-extruded-text-color, var(--vp-primary, #2563eb)); }
/* the sides: darker the deeper they lie */
.vp-extruded-text__layer {
  color: color-mix(in oklch, var(--vp-extruded-text-side, color-mix(in oklch, var(--vp-extruded-text-color, var(--vp-primary, #2563eb)) 55%, #000)) calc(100% - var(--vp-extruded-text-shade) * 45%), #000);
  pointer-events: none;
  user-select: none;
}
.vp-extruded-text__layer:first-child { text-shadow: 0 18px 30px color-mix(in srgb, var(--vp-text, #000) 30%, transparent); }
.vp-extruded-text--gradient .vp-extruded-text__face {
  background: linear-gradient(100deg, var(--vp-extruded-text-color, var(--vp-primary, #2563eb)), color-mix(in oklch, var(--vp-extruded-text-color, var(--vp-primary, #2563eb)) 40%, #ec4899) 55%, color-mix(in oklch, var(--vp-extruded-text-color, var(--vp-primary, #2563eb)) 30%, #f59e0b));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.vp-extruded-text--neon .vp-extruded-text__face {
  color: #fff;
  text-shadow: 0 0 6px var(--vp-extruded-text-color, var(--vp-primary, #2563eb)), 0 0 18px var(--vp-extruded-text-color, var(--vp-primary, #2563eb)), 0 0 42px var(--vp-extruded-text-color, var(--vp-primary, #2563eb));
}
.vp-extruded-text--neon .vp-extruded-text__layer { opacity: 0.55; }
.vp-extruded-text--outline .vp-extruded-text__face { color: var(--vp-background, #fff); -webkit-text-stroke: 2px var(--vp-extruded-text-color, var(--vp-primary, #2563eb)); }
.vp-extruded-text--outline .vp-extruded-text__layer { color: transparent; -webkit-text-stroke: 1px color-mix(in srgb, var(--vp-extruded-text-side, var(--vp-extruded-text-color, var(--vp-primary, #2563eb))) 50%, transparent); }
@media (prefers-reduced-motion: reduce) {
  .vp-extruded-text--float .vp-extruded-text__block { animation: none; }
}
</style>
`;export{e as default};