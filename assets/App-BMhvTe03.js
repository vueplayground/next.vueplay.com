var e=`<template>
  <div
    class="vp-tilt-card"
    :class="['vp-tilt-card--' + look, 'vp-tilt-card--' + align, { 'vp-tilt-card--sway': sway && !still }]"
    :style="style"
    @pointerenter="enter"
    @pointermove="move"
    @pointerleave="leave"
  >
    <div class="vp-tilt-card__inner">
      <img v-if="image" class="vp-tilt-card__image" :src="picture || undefined" :style="held" :alt="alt" loading="lazy" decoding="async">
      <div class="vp-tilt-card__body">
        <slot />
      </div>
      <span v-if="glare" class="vp-tilt-card__glare" aria-hidden="true"></span>
    </div>
  </div>
</template>
<script>
// A card that leans toward the pointer as if it were held in the hand: a light glides over it, and what is put
// in it stands out from it in depth. It eases back when the pointer leaves; with nothing pointing at it, it can
// sway a little by itself. People who ask for less motion get a still card.
// (A picture picked in the Studio is the name of a variable that holds it, like --image-boat: it is shown
// through that variable at once, and its address is read from it when the page is alive. An address is used as it is.)
export default {
  props: {
    look: {
      type: String,
      default: 'glass',
      label: 'Look',
      options: [{ key: 'Glass', value: 'glass' }, { key: 'Shadow', value: 'shadow' }, { key: 'Outline', value: 'outline' }, { key: 'Filled', value: 'filled' }, { key: 'Gradient', value: 'gradient' }]
    },
    tilt: { type: String, default: '', label: 'How far it leans', control: 'slider', unit: 'deg', min: 0, max: 30 },
    depth: { type: String, default: '', label: 'How far its contents stand out', control: 'slider', unit: 'px', min: 0, max: 100 },
    grow: {
      type: String,
      default: 'small',
      label: 'Grows when pointed at',
      options: [{ key: 'No', value: 'none' }, { key: 'A little', value: 'small' }, { key: 'More', value: 'large' }]
    },
    glare: { type: Boolean, default: true, label: 'A light glides over it' },
    sway: { type: Boolean, default: false, label: 'Sways by itself' },
    image: { type: String, default: '', label: 'Picture', control: 'media' },
    alt: { type: String, default: '', label: 'Picture described', placeholder: 'For those who cannot see it' },
    align: {
      type: String,
      default: 'left',
      label: 'Align',
      options: [{ key: 'Left', value: 'left' }, { key: 'Center', value: 'center' }, { key: 'Right', value: 'right' }]
    },
    padding: { type: String, default: '', label: 'Room inside', control: 'slider', unit: 'px', min: 0, max: 80 },
    background: { type: String, default: '', label: 'Background', control: 'color' },
    color: { type: String, default: '', label: 'Text color', control: 'color' },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 48 }
  },
  data() {
    return { found: '', still: false }
  },
  computed: {
    named() {
      return /^--/.test(this.image)
    },
    picture() {
      return this.named ? this.found : this.image
    },
    held() {
      return this.named && !this.found ? { content: 'var(' + this.image + ')' } : undefined
    },
    scale() {
      return { none: 1, small: 1.03, large: 1.07 }[this.grow] || 1
    },
    style() {
      return {
        '--vp-tilt-card-depth': this.depth || undefined,
        '--vp-tilt-card-padding': this.padding || undefined,
        '--vp-tilt-card-background': this.background || undefined,
        '--vp-tilt-card-color': this.color || undefined,
        '--vp-tilt-card-radius': this.radius || undefined
      }
    }
  },
  watch: {
    image() {
      this.find()
    }
  },
  mounted() {
    this.still = typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    this.aim = { x: 0, y: 0, s: 1 }
    this.now = { x: 0, y: 0, s: 1 }
    this.find()
  },
  beforeUnmount() {
    if (this.frame) cancelAnimationFrame(this.frame)
  },
  methods: {
    enter(event) {
      this.move(event)
    },
    move(event) {
      if (this.still || !this.$el || this.$el.nodeType !== 1) return
      const box = this.$el.getBoundingClientRect()
      if (!box.width || !box.height) return
      const x = Math.min(1, Math.max(0, (event.clientX - box.left) / box.width))
      const y = Math.min(1, Math.max(0, (event.clientY - box.top) / box.height))
      this.aim = { x: x - 0.5, y: y - 0.5, s: this.scale }
      this.$el.style.setProperty('--vp-tilt-card-gx', (x * 100).toFixed(1) + '%')
      this.$el.style.setProperty('--vp-tilt-card-gy', (y * 100).toFixed(1) + '%')
      this.$el.classList.add('vp-tilt-card--on')
      this.run()
    },
    leave() {
      if (this.still || !this.$el || this.$el.nodeType !== 1) return
      this.aim = { x: 0, y: 0, s: 1 }
      this.$el.classList.remove('vp-tilt-card--on')
      this.run()
    },
    // eased toward where the pointer is, one frame at a time, until it is there
    run() {
      if (this.frame) return
      const step = () => {
        const now = this.now, aim = this.aim
        now.x += (aim.x - now.x) * 0.14
        now.y += (aim.y - now.y) * 0.14
        now.s += (aim.s - now.s) * 0.14
        const most = parseFloat(this.tilt) || 12
        const el = this.$el
        if (el && el.nodeType === 1) {
          el.style.setProperty('--vp-tilt-card-ry', (now.x * most * 2).toFixed(3) + 'deg')
          el.style.setProperty('--vp-tilt-card-rx', (-now.y * most * 2).toFixed(3) + 'deg')
          el.style.setProperty('--vp-tilt-card-scale', now.s.toFixed(4))
        }
        const done = Math.abs(aim.x - now.x) < 0.001 && Math.abs(aim.y - now.y) < 0.001 && Math.abs(aim.s - now.s) < 0.0005
        this.frame = done ? 0 : requestAnimationFrame(step)
      }
      this.frame = requestAnimationFrame(step)
    },
    find() {
      const value = this.named && this.$el && this.$el.nodeType === 1 ? getComputedStyle(this.$el).getPropertyValue(this.image) : ''
      const address = /^\\s*url\\(\\s*(['"]?)(.*?)\\1\\s*\\)\\s*$/.exec(value)
      this.found = address ? address[2] : ''
    }
  }
}
<\/script>
<style>
.vp-tilt-card {
  box-sizing: border-box;
  min-width: 0;
  perspective: 900px;
  color: var(--vp-tilt-card-color, inherit);
}
.vp-tilt-card__inner {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid transparent;
  border-radius: var(--vp-tilt-card-radius, var(--vp-radius, 16px));
  background: var(--vp-tilt-card-background, transparent);
  transform-style: preserve-3d;
  transform: rotateX(var(--vp-tilt-card-rx, 0deg)) rotateY(var(--vp-tilt-card-ry, 0deg)) scale(var(--vp-tilt-card-scale, 1));
  transition: box-shadow 300ms ease;
  will-change: transform;
}
.vp-tilt-card--glass .vp-tilt-card__inner {
  background: var(--vp-tilt-card-background, linear-gradient(150deg, color-mix(in srgb, var(--vp-surface, #fff) 70%, transparent), color-mix(in srgb, var(--vp-surface, #fff) 35%, transparent)));
  border-color: color-mix(in srgb, var(--vp-text, #0f172a) 12%, transparent);
  box-shadow: 0 20px 50px -20px color-mix(in srgb, var(--vp-text, #0f172a) 35%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
}
.vp-tilt-card--shadow .vp-tilt-card__inner {
  background: var(--vp-tilt-card-background, var(--vp-surface, #fff));
  box-shadow: 0 2px 4px color-mix(in srgb, var(--vp-text, #0f172a) 6%, transparent), 0 24px 48px -18px color-mix(in srgb, var(--vp-text, #0f172a) 30%, transparent);
}
.vp-tilt-card--outline .vp-tilt-card__inner { border-color: var(--vp-border, rgba(127, 127, 127, 0.28)); }
.vp-tilt-card--filled .vp-tilt-card__inner { background: var(--vp-tilt-card-background, color-mix(in srgb, var(--vp-text, rgb(127, 127, 127)) 8%, transparent)); }
.vp-tilt-card--gradient .vp-tilt-card__inner {
  background: var(--vp-tilt-card-background, linear-gradient(135deg, var(--vp-primary, #2563eb), color-mix(in oklch, var(--vp-primary, #2563eb) 55%, #a855f7)));
  color: var(--vp-tilt-card-color, var(--vp-primary-contrast, #fff));
  box-shadow: 0 24px 50px -20px color-mix(in srgb, var(--vp-primary, #2563eb) 70%, transparent);
}
.vp-tilt-card--on .vp-tilt-card__inner { box-shadow: 0 34px 70px -24px color-mix(in srgb, var(--vp-text, #0f172a) 45%, transparent); }
.vp-tilt-card--gradient.vp-tilt-card--on .vp-tilt-card__inner { box-shadow: 0 34px 70px -22px color-mix(in srgb, var(--vp-primary, #2563eb) 80%, transparent); }
.vp-tilt-card__image {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: var(--vp-tilt-card-radius, var(--vp-radius, 16px)) var(--vp-tilt-card-radius, var(--vp-radius, 16px)) 0 0;
  transform: translateZ(calc(var(--vp-tilt-card-depth, 40px) * 0.35));
}
.vp-tilt-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  min-width: 0;
  padding: var(--vp-tilt-card-padding, clamp(1.25rem, 3vw, 1.75rem));
  text-align: left;
  transform-style: preserve-3d;
}
/* what is in it stands out from the card */
.vp-tilt-card__body > * { transform: translateZ(var(--vp-tilt-card-depth, 40px)); }
.vp-tilt-card--center .vp-tilt-card__body { align-items: center; text-align: center; }
.vp-tilt-card--right .vp-tilt-card__body { align-items: flex-end; text-align: right; }
.vp-tilt-card__glare {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  background: radial-gradient(circle at var(--vp-tilt-card-gx, 50%) var(--vp-tilt-card-gy, 50%), rgba(255, 255, 255, 0.45), rgba(255, 255, 255, 0) 55%);
  mix-blend-mode: soft-light;
  transition: opacity 300ms ease;
  transform: translateZ(1px);
}
.vp-tilt-card--on .vp-tilt-card__glare { opacity: 1; }
.vp-tilt-card--sway:not(.vp-tilt-card--on) .vp-tilt-card__inner { animation: vp-tilt-card-sway 7s ease-in-out infinite alternate; }
@keyframes vp-tilt-card-sway {
  from { transform: rotateX(4deg) rotateY(-6deg); }
  to { transform: rotateX(-3deg) rotateY(6deg); }
}
@media (prefers-reduced-motion: reduce) {
  .vp-tilt-card__inner { transform: none; animation: none; }
}
</style>
`;export{e as default};