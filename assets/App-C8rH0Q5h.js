var e=`<template>
  <component
    :is="tag"
    :id="anchor || undefined"
    class="vp-backdrop"
    :class="classes"
    :style="style"
    @pointermove="point"
    @pointerleave="leave"
  >
    <div class="vp-backdrop__fx" aria-hidden="true">
      <template v-if="kind === 'aurora'">
        <i class="vp-backdrop__ribbon vp-backdrop__ribbon--1" />
        <i class="vp-backdrop__ribbon vp-backdrop__ribbon--2" />
        <i class="vp-backdrop__ribbon vp-backdrop__ribbon--3" />
      </template>
      <template v-else-if="kind === 'blobs'">
        <i class="vp-backdrop__blob vp-backdrop__blob--1" />
        <i class="vp-backdrop__blob vp-backdrop__blob--2" />
        <i class="vp-backdrop__blob vp-backdrop__blob--3" />
      </template>
      <template v-else-if="kind === 'stars'">
        <i class="vp-backdrop__stars vp-backdrop__stars--1" />
        <i class="vp-backdrop__stars vp-backdrop__stars--2" />
        <i class="vp-backdrop__stars vp-backdrop__stars--3" />
      </template>
      <template v-else-if="kind === 'waves'">
        <i class="vp-backdrop__wave vp-backdrop__wave--1" />
        <i class="vp-backdrop__wave vp-backdrop__wave--2" />
        <i class="vp-backdrop__wave vp-backdrop__wave--3" />
      </template>
      <i v-else-if="kind === 'picture'" class="vp-backdrop__picture" />
      <i v-else class="vp-backdrop__layer" />
      <i v-if="grain" class="vp-backdrop__grain" />
      <i v-if="shade" class="vp-backdrop__shade" />
    </div>
    <div class="vp-backdrop__inner">
      <slot />
    </div>
  </component>
</template>
<script>
// A part of the page with a living background behind whatever is put in it: soft moving colours, light,
// patterns or a picture, that can follow the pointer and change as the page scrolls. It holds its content to a
// width with room around it, as a Section does, so it can be used in a Section's place. The colours are the
// site's own until others are picked. Motion stops for those who ask their device for less of it.
// (A picture picked in the Studio is the name of a variable that holds it, like --image-boat. An address is used as it is.)
export default {
  props: {
    kind: {
      type: String,
      default: 'aurora',
      label: 'Background',
      options: [
        { key: 'Aurora', value: 'aurora' },
        { key: 'Colour mesh', value: 'mesh' },
        { key: 'Glowing blobs', value: 'blobs' },
        { key: 'Flowing gradient', value: 'gradient' },
        { key: 'Light beams', value: 'beams' },
        { key: 'Spotlight', value: 'spotlight' },
        { key: 'Dots', value: 'dots' },
        { key: 'Grid', value: 'grid' },
        { key: 'Horizon grid', value: 'horizon' },
        { key: 'Waves', value: 'waves' },
        { key: 'Stars', value: 'stars' },
        { key: 'Stripes', value: 'stripes' },
        { key: 'Picture', value: 'picture' }
      ]
    },
    tone: {
      type: String,
      default: 'dark',
      label: 'Base',
      options: [{ key: 'Dark', value: 'dark' }, { key: 'Light', value: 'light' }, { key: 'The site colour', value: 'brand' }]
    },
    color1: { type: String, default: '', label: 'First colour', control: 'color' },
    color2: { type: String, default: '', label: 'Second colour', control: 'color' },
    color3: { type: String, default: '', label: 'Third colour', control: 'color' },
    image: { type: String, default: '', label: 'Picture', control: 'media' },
    motion: {
      type: String,
      default: 'calm',
      label: 'Movement',
      options: [{ key: 'Still', value: 'still' }, { key: 'Calm', value: 'calm' }, { key: 'Lively', value: 'lively' }]
    },
    follow: { type: Boolean, default: true, label: 'Follows the pointer' },
    scroll: {
      type: String,
      default: 'none',
      label: 'When the page scrolls',
      options: [{ key: 'Nothing', value: 'none' }, { key: 'Moves slower (depth)', value: 'parallax' }, { key: 'Colours shift', value: 'shift' }, { key: 'Fades as it leaves', value: 'fade' }]
    },
    strength: { type: Number, default: 70, label: 'Strength (%)', control: 'number', min: 10, max: 100 },
    grain: { type: Boolean, default: false, label: 'Film grain' },
    shade: { type: Boolean, default: false, label: 'Darken behind the text' },
    width: {
      type: String,
      default: 'normal',
      label: 'Content width',
      options: [{ key: 'Narrow', value: 'narrow' }, { key: 'Normal', value: 'normal' }, { key: 'Wide', value: 'wide' }, { key: 'Full', value: 'full' }]
    },
    space: {
      type: String,
      default: 'large',
      label: 'Room above and below',
      options: [{ key: 'None', value: 'none' }, { key: 'Small', value: 'small' }, { key: 'Medium', value: 'medium' }, { key: 'Large', value: 'large' }, { key: 'Extra large', value: 'xlarge' }]
    },
    align: {
      type: String,
      default: 'center',
      label: 'Align',
      options: [{ key: 'Left', value: 'left' }, { key: 'Center', value: 'center' }, { key: 'Right', value: 'right' }]
    },
    height: {
      type: String,
      default: 'auto',
      label: 'Height',
      options: [{ key: 'As its content', value: 'auto' }, { key: 'Half the screen', value: 'half' }, { key: 'The whole screen', value: 'screen' }]
    },
    gap: { type: String, default: '24px', label: 'Gap between parts', control: 'slider', unit: 'px', min: 0, max: 96 },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 64 },
    color: { type: String, default: '', label: 'Text color', control: 'color' },
    tag: {
      type: String,
      default: 'section',
      label: 'Kind',
      options: [{ key: 'Section', value: 'section' }, { key: 'Header', value: 'header' }, { key: 'Footer', value: 'footer' }, { key: 'Plain (div)', value: 'div' }]
    },
    anchor: { type: String, default: '', label: 'Anchor', placeholder: 'A name to link to: #name' }
  },
  data() {
    // (the frame asked for is kept off the reactive data)
    return { mx: 0.5, my: 0.35, progress: 0.5, away: false }
  },
  computed: {
    classes() {
      return [
        'vp-backdrop--' + this.kind, 'vp-backdrop--tone-' + this.tone, 'vp-backdrop--motion-' + this.motion,
        'vp-backdrop--' + this.width, 'vp-backdrop--space-' + this.space, 'vp-backdrop--' + this.align, 'vp-backdrop--' + this.height,
        { 'vp-backdrop--follow': this.follow, 'vp-backdrop--away': this.away, ['vp-backdrop--scroll-' + this.scroll]: this.scroll !== 'none' }
      ]
    },
    picture() {
      if (!this.image) return undefined
      return /^--/.test(this.image) ? 'var(' + this.image + ')' : 'url("' + String(this.image).replace(/"/g, '%22') + '")'
    },
    style() {
      const strength = Math.max(10, Math.min(100, Number(this.strength) || 70)) / 100
      return {
        '--vp-backdrop-c1': this.color1 || undefined,
        '--vp-backdrop-c2': this.color2 || undefined,
        '--vp-backdrop-c3': this.color3 || undefined,
        '--vp-backdrop-image': this.picture,
        '--vp-backdrop-strength': strength,
        '--vp-backdrop-gap': this.gap || undefined,
        '--vp-backdrop-radius': this.radius || undefined,
        '--vp-backdrop-mx': this.mx,
        '--vp-backdrop-my': this.my,
        '--vp-backdrop-scroll': this.progress,
        color: this.color || undefined
      }
    }
  },
  watch: {
    scroll() {
      this.listen()
    }
  },
  mounted() {
    this.listen()
    // (its moving layers are paused while it is out of sight)
    if (typeof IntersectionObserver === 'function') {
      this.sight = new IntersectionObserver(([entry]) => { this.away = !entry.isIntersecting })
      this.sight.observe(this.$el)
    }
  },
  beforeUnmount() {
    this.sight?.disconnect()
    window.removeEventListener('scroll', this.scrolled)
    cancelAnimationFrame(this.frame)
  },
  methods: {
    calm() {
      return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
    },
    // The pointer, as a part of the width and the height (0–1), at most once a frame
    point(event) {
      if (!this.follow || this.calm() || event.pointerType === 'touch') return
      const box = this.$el.getBoundingClientRect()
      if (!box.width || !box.height) return
      cancelAnimationFrame(this.frame)
      this.frame = requestAnimationFrame(() => {
        this.mx = Math.max(0, Math.min(1, (event.clientX - box.left) / box.width))
        this.my = Math.max(0, Math.min(1, (event.clientY - box.top) / box.height))
      })
    },
    leave() {
      if (!this.follow) return
      this.mx = 0.5
      this.my = 0.35
    },
    listen() {
      window.removeEventListener('scroll', this.scrolled)
      if (this.scroll === 'none' || typeof window === 'undefined') return
      window.addEventListener('scroll', this.scrolled, { passive: true })
      this.scrolled()
    },
    // How far it has come through the screen: 0 as it comes in at the bottom, 1 as it leaves at the top
    scrolled() {
      if (!this.$el || this.$el.nodeType !== 1 || this.calm()) return
      cancelAnimationFrame(this.frame)
      this.frame = requestAnimationFrame(() => {
        const box = this.$el.getBoundingClientRect()
        const seen = window.innerHeight + box.height
        this.progress = seen > 0 ? Math.max(0, Math.min(1, (window.innerHeight - box.top) / seen)) : 0.5
      })
    }
  }
}
<\/script>
<style>
.vp-backdrop {
  /* the colours: the site's own until others are picked */
  --vp-backdrop-a: var(--vp-backdrop-c1, var(--vp-primary, #6366f1));
  --vp-backdrop-b: var(--vp-backdrop-c2, color-mix(in oklch, var(--vp-primary, #6366f1) 45%, #22d3ee));
  --vp-backdrop-c: var(--vp-backdrop-c3, color-mix(in oklch, var(--vp-primary, #6366f1) 45%, #f472b6));
  --vp-backdrop-speed: 1;
  --vp-backdrop-px: calc((var(--vp-backdrop-mx, 0.5) - 0.5) * 2);
  --vp-backdrop-py: calc((var(--vp-backdrop-my, 0.35) - 0.35) * 2);
  position: relative;
  isolation: isolate;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-inline: clamp(16px, 4vw, 40px);
  border-radius: var(--vp-backdrop-radius, 0);
}
.vp-backdrop--tone-dark {
  /* what is put in a dark band reads the site's colours as a dark page's: light text on dark cards, not white on white */
  --vp-background: #070b18;
  --vp-text: #f8fafc;
  --vp-muted: #a8b3c7;
  --vp-border: rgb(255 255 255 / 0.16);
  --vp-surface: #111a2e;
  --vp-muted-surface: rgb(255 255 255 / 0.08);
  background: #070b18;
  color: #f8fafc;
}
.vp-backdrop--tone-light { background: var(--vp-background, #ffffff); color: var(--vp-text, #111827); }
.vp-backdrop--tone-brand {
  --vp-background: color-mix(in oklch, var(--vp-primary, #6366f1) 88%, #000);
  --vp-text: var(--vp-primary-contrast, #ffffff);
  --vp-muted: color-mix(in srgb, var(--vp-primary-contrast, #ffffff) 78%, transparent);
  --vp-border: color-mix(in srgb, var(--vp-primary-contrast, #ffffff) 24%, transparent);
  --vp-surface: color-mix(in oklch, var(--vp-primary, #6366f1) 70%, #000);
  --vp-muted-surface: color-mix(in srgb, var(--vp-primary-contrast, #ffffff) 10%, transparent);
  background: color-mix(in oklch, var(--vp-primary, #6366f1) 88%, #000);
  color: var(--vp-primary-contrast, #ffffff);
}
.vp-backdrop--motion-calm { --vp-backdrop-speed: 1; }
.vp-backdrop--motion-lively { --vp-backdrop-speed: 0.45; }

.vp-backdrop__fx {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  opacity: var(--vp-backdrop-strength, 0.7);
  transition: opacity 0.4s ease;
}
.vp-backdrop__fx > i {
  position: absolute;
  display: block;
}
.vp-backdrop__inner {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  gap: var(--vp-backdrop-gap, 24px);
}
.vp-backdrop--narrow > .vp-backdrop__inner { max-width: 720px; }
.vp-backdrop--normal > .vp-backdrop__inner { max-width: var(--vp-width, 1120px); }
.vp-backdrop--wide > .vp-backdrop__inner { max-width: 1360px; }
.vp-backdrop--full > .vp-backdrop__inner { max-width: none; }
.vp-backdrop--space-none { padding-block: 0; }
.vp-backdrop--space-small { padding-block: clamp(16px, 3vw, 32px); }
.vp-backdrop--space-medium { padding-block: clamp(32px, 6vw, 64px); }
.vp-backdrop--space-large { padding-block: clamp(56px, 10vw, 120px); }
.vp-backdrop--space-xlarge { padding-block: clamp(80px, 14vw, 184px); }
.vp-backdrop--left > .vp-backdrop__inner { align-items: flex-start; text-align: left; }
.vp-backdrop--center > .vp-backdrop__inner { align-items: center; text-align: center; }
.vp-backdrop--right > .vp-backdrop__inner { align-items: flex-end; text-align: right; }
.vp-backdrop__inner > .vp-columns,
.vp-backdrop__inner > .vp-divider { align-self: stretch; }
.vp-backdrop--half { min-height: 50vh; }
.vp-backdrop--screen { min-height: 100vh; min-height: 100svh; }

/* Aurora: wide soft ribbons of light drifting across */
.vp-backdrop__ribbon {
  width: 110%;
  height: 46%;
  border-radius: 50%;
  filter: blur(48px) saturate(1.3);
  mix-blend-mode: screen;
  translate: calc(var(--vp-backdrop-px) * 40px) calc(var(--vp-backdrop-py) * 30px);
  transition: translate 0.9s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.vp-backdrop--tone-light .vp-backdrop__ribbon { mix-blend-mode: multiply; filter: blur(80px); opacity: 0.55; }
.vp-backdrop__ribbon--1 { left: -30%; top: -8%; rotate: -12deg; background: radial-gradient(ellipse at 50% 50%, var(--vp-backdrop-a), transparent 68%); animation: vp-backdrop-drift calc(22s * var(--vp-backdrop-speed)) ease-in-out infinite alternate; }
.vp-backdrop__ribbon--2 { right: -35%; top: 18%; rotate: 14deg; background: radial-gradient(ellipse at 50% 50%, var(--vp-backdrop-b), transparent 68%); animation: vp-backdrop-drift calc(28s * var(--vp-backdrop-speed)) ease-in-out infinite alternate-reverse; }
.vp-backdrop__ribbon--3 { left: 0%; bottom: -12%; rotate: -6deg; background: radial-gradient(ellipse at 50% 50%, var(--vp-backdrop-c), transparent 68%); animation: vp-backdrop-drift calc(34s * var(--vp-backdrop-speed)) ease-in-out infinite alternate; }

/* Glowing blobs: round lights that float and lean towards the pointer */
.vp-backdrop__blob {
  width: 48vmax;
  height: 48vmax;
  max-width: 760px;
  max-height: 760px;
  border-radius: 50%;
  filter: blur(24px);
  opacity: 0.9;
  transition: translate 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.vp-backdrop__blob--1 { left: -8%; top: -18%; background: radial-gradient(circle, var(--vp-backdrop-a) 0, color-mix(in oklch, var(--vp-backdrop-a) 40%, transparent) 38%, transparent 68%); animation: vp-backdrop-float calc(18s * var(--vp-backdrop-speed)) ease-in-out infinite; translate: calc(var(--vp-backdrop-px) * 60px) calc(var(--vp-backdrop-py) * 40px); }
.vp-backdrop__blob--2 { right: -10%; top: 10%; background: radial-gradient(circle, var(--vp-backdrop-b) 0, color-mix(in oklch, var(--vp-backdrop-b) 40%, transparent) 38%, transparent 68%); animation: vp-backdrop-float calc(23s * var(--vp-backdrop-speed)) ease-in-out infinite reverse; translate: calc(var(--vp-backdrop-px) * -40px) calc(var(--vp-backdrop-py) * 50px); }
.vp-backdrop__blob--3 { left: 30%; bottom: -30%; background: radial-gradient(circle, var(--vp-backdrop-c) 0, color-mix(in oklch, var(--vp-backdrop-c) 40%, transparent) 38%, transparent 68%); animation: vp-backdrop-float calc(27s * var(--vp-backdrop-speed)) ease-in-out infinite; translate: calc(var(--vp-backdrop-px) * 30px) calc(var(--vp-backdrop-py) * -30px); }

/* One layer of pattern or light: each kind is a background of its own */
.vp-backdrop__layer {
  inset: -10%;
}
.vp-backdrop--mesh .vp-backdrop__layer {
  background:
    radial-gradient(at calc(20% + var(--vp-backdrop-px) * 6%) 25%, var(--vp-backdrop-a) 0, transparent 45%),
    radial-gradient(at 80% calc(15% + var(--vp-backdrop-py) * 8%), var(--vp-backdrop-b) 0, transparent 45%),
    radial-gradient(at 70% 85%, var(--vp-backdrop-c) 0, transparent 50%),
    radial-gradient(at 15% 90%, color-mix(in oklch, var(--vp-backdrop-a) 50%, var(--vp-backdrop-b)) 0, transparent 45%);
  filter: blur(30px) saturate(1.2);
  animation: vp-backdrop-breathe calc(20s * var(--vp-backdrop-speed)) ease-in-out infinite alternate;
}
.vp-backdrop--gradient .vp-backdrop__layer {
  inset: 0;
  background: linear-gradient(120deg, var(--vp-backdrop-a), var(--vp-backdrop-b), var(--vp-backdrop-c), var(--vp-backdrop-a));
  background-size: 300% 300%;
  animation: vp-backdrop-flow calc(18s * var(--vp-backdrop-speed)) ease-in-out infinite;
}
.vp-backdrop--beams .vp-backdrop__layer {
  inset: -10% -20% 0;
  background: linear-gradient(90deg, var(--vp-backdrop-a), var(--vp-backdrop-b) 50%, var(--vp-backdrop-c));
  -webkit-mask-image: repeating-conic-gradient(from 0deg at 50% -25%, #000 0deg 1.6deg, transparent 2.4deg 7deg), radial-gradient(ellipse 60% 85% at 50% 0%, #000 15%, transparent 80%);
  -webkit-mask-composite: source-in;
  mask-image: repeating-conic-gradient(from 0deg at 50% -25%, #000 0deg 1.6deg, transparent 2.4deg 7deg), radial-gradient(ellipse 60% 85% at 50% 0%, #000 15%, transparent 80%);
  mask-composite: intersect;
  filter: blur(3px);
  transform-origin: 50% -25%;
  rotate: calc(var(--vp-backdrop-px) * 5deg);
  transition: rotate 1s cubic-bezier(0.2, 0.8, 0.2, 1);
  animation: vp-backdrop-sway calc(14s * var(--vp-backdrop-speed)) ease-in-out infinite alternate;
}
.vp-backdrop--beams .vp-backdrop__fx {
  background: radial-gradient(ellipse 50% 45% at 50% 0%, color-mix(in oklch, var(--vp-backdrop-a) 45%, transparent), transparent 70%);
}
.vp-backdrop--spotlight .vp-backdrop__layer {
  inset: 0;
  background:
    radial-gradient(600px circle at calc(var(--vp-backdrop-mx) * 100%) calc(var(--vp-backdrop-my) * 100%), color-mix(in oklch, var(--vp-backdrop-a) 70%, transparent), transparent 60%),
    radial-gradient(900px circle at calc(100% - var(--vp-backdrop-mx) * 60%) 100%, color-mix(in oklch, var(--vp-backdrop-b) 35%, transparent), transparent 60%);
}
.vp-backdrop--dots .vp-backdrop__layer,
.vp-backdrop--grid .vp-backdrop__layer {
  inset: 0;
  --vp-backdrop-ink: color-mix(in oklch, currentColor 34%, transparent);
  -webkit-mask-image: radial-gradient(ellipse 60% 70% at calc(var(--vp-backdrop-mx) * 100%) calc(var(--vp-backdrop-my) * 100%), #000 10%, transparent 75%);
  mask-image: radial-gradient(ellipse 60% 70% at calc(var(--vp-backdrop-mx) * 100%) calc(var(--vp-backdrop-my) * 100%), #000 10%, transparent 75%);
}
.vp-backdrop--dots .vp-backdrop__layer {
  background-image: radial-gradient(var(--vp-backdrop-ink) 1.2px, transparent 1.6px);
  background-size: 22px 22px;
  animation: vp-backdrop-pan calc(40s * var(--vp-backdrop-speed)) linear infinite;
}
.vp-backdrop--grid .vp-backdrop__layer {
  background-image: linear-gradient(var(--vp-backdrop-ink) 1px, transparent 1px), linear-gradient(90deg, var(--vp-backdrop-ink) 1px, transparent 1px);
  background-size: 48px 48px;
  animation: vp-backdrop-pan calc(60s * var(--vp-backdrop-speed)) linear infinite;
}
.vp-backdrop--dots .vp-backdrop__fx,
.vp-backdrop--grid .vp-backdrop__fx {
  background: radial-gradient(ellipse 70% 60% at 50% 0%, color-mix(in oklch, var(--vp-backdrop-a) 35%, transparent), transparent 70%);
}
.vp-backdrop--horizon .vp-backdrop__fx {
  background: linear-gradient(180deg, transparent 30%, color-mix(in oklch, var(--vp-backdrop-c) 45%, transparent) 55%, transparent 58%);
}
.vp-backdrop--horizon .vp-backdrop__layer {
  inset: 50% -50% -50%;
  background-image: linear-gradient(color-mix(in oklch, var(--vp-backdrop-a) 80%, transparent) 2px, transparent 2px), linear-gradient(90deg, color-mix(in oklch, var(--vp-backdrop-a) 80%, transparent) 2px, transparent 2px);
  background-size: 64px 64px;
  transform: perspective(500px) rotateX(64deg);
  transform-origin: 50% 0%;
  -webkit-mask-image: linear-gradient(180deg, transparent, #000 40%);
  mask-image: linear-gradient(180deg, transparent, #000 40%);
  animation: vp-backdrop-forward calc(4s * var(--vp-backdrop-speed)) linear infinite;
}
.vp-backdrop--stripes .vp-backdrop__layer {
  background: repeating-linear-gradient(-45deg, color-mix(in oklch, var(--vp-backdrop-a) 40%, transparent) 0 14px, transparent 14px 34px);
  -webkit-mask-image: linear-gradient(180deg, #000, transparent 85%);
  mask-image: linear-gradient(180deg, #000, transparent 85%);
  animation: vp-backdrop-slide calc(8s * var(--vp-backdrop-speed)) linear infinite;
}

/* Waves: three layers of one wave shape, each sliding by its own length so it never jumps */
.vp-backdrop__wave {
  left: 0;
  right: 0;
  bottom: 0;
  height: 42%;
  --vp-backdrop-wave: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 120' preserveAspectRatio='none'%3E%3Cpath d='M0 40C360 0 360 0 720 40S1080 80 1440 40V120H0Z'/%3E%3C/svg%3E");
  -webkit-mask: var(--vp-backdrop-wave) repeat-x 0 100% / 900px 100%;
  mask: var(--vp-backdrop-wave) repeat-x 0 100% / 900px 100%;
}
.vp-backdrop__wave--1 { background: linear-gradient(180deg, var(--vp-backdrop-a), transparent); opacity: 0.8; animation: vp-backdrop-roll calc(16s * var(--vp-backdrop-speed)) linear infinite; }
.vp-backdrop__wave--2 { height: 32%; background: linear-gradient(180deg, var(--vp-backdrop-b), transparent); opacity: 0.65; -webkit-mask-size: 1300px 100%; mask-size: 1300px 100%; animation: vp-backdrop-roll-wide calc(24s * var(--vp-backdrop-speed)) linear infinite reverse; }
.vp-backdrop__wave--3 { height: 22%; background: linear-gradient(180deg, var(--vp-backdrop-c), transparent); opacity: 0.55; -webkit-mask-size: 700px 100%; mask-size: 700px 100%; animation: vp-backdrop-roll-narrow calc(12s * var(--vp-backdrop-speed)) linear infinite; }

/* Stars: three depths of points that twinkle, the near ones moving more with the pointer */
.vp-backdrop__stars {
  inset: -20%;
  background-repeat: repeat;
  transition: translate 1.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.vp-backdrop__stars--1 {
  background-image: radial-gradient(1px 1px at 20px 30px, #fff, transparent), radial-gradient(1px 1px at 120px 80px, #fff, transparent), radial-gradient(1px 1px at 190px 160px, #fff, transparent), radial-gradient(1px 1px at 60px 140px, #fff, transparent);
  background-size: 220px 200px;
  opacity: 0.5;
  translate: calc(var(--vp-backdrop-px) * 6px) calc(var(--vp-backdrop-py) * 6px);
}
.vp-backdrop__stars--2 {
  background-image: radial-gradient(1.5px 1.5px at 40px 60px, #fff, transparent), radial-gradient(1.5px 1.5px at 170px 20px, #fff, transparent), radial-gradient(1.5px 1.5px at 260px 190px, var(--vp-backdrop-b), transparent);
  background-size: 300px 260px;
  animation: vp-backdrop-twinkle calc(5s * var(--vp-backdrop-speed)) ease-in-out infinite alternate;
  translate: calc(var(--vp-backdrop-px) * 16px) calc(var(--vp-backdrop-py) * 16px);
}
.vp-backdrop__stars--3 {
  background-image: radial-gradient(2px 2px at 90px 120px, #fff, transparent), radial-gradient(2px 2px at 330px 260px, var(--vp-backdrop-a), transparent);
  background-size: 420px 380px;
  animation: vp-backdrop-twinkle calc(7s * var(--vp-backdrop-speed)) ease-in-out infinite alternate-reverse;
  translate: calc(var(--vp-backdrop-px) * 32px) calc(var(--vp-backdrop-py) * 32px);
}
.vp-backdrop--stars .vp-backdrop__fx {
  background: radial-gradient(ellipse 80% 60% at 50% 110%, color-mix(in oklch, var(--vp-backdrop-a) 40%, transparent), transparent 70%);
}
.vp-backdrop--tone-light .vp-backdrop__stars { filter: invert(1); }

/* Picture: a little larger than the part, so it can move with the pointer and the scroll */
.vp-backdrop__picture {
  inset: -8%;
  background: var(--vp-backdrop-image, linear-gradient(135deg, var(--vp-backdrop-a), var(--vp-backdrop-c))) center / cover no-repeat;
  translate: calc(var(--vp-backdrop-px) * -14px) calc(var(--vp-backdrop-py) * -10px);
  transition: translate 1s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.vp-backdrop--picture .vp-backdrop__fx { opacity: 1; }

/* Over it all: grain and a shade that keeps text readable */
.vp-backdrop__grain {
  inset: 0;
  opacity: 0.22;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
.vp-backdrop__shade {
  inset: 0;
  background: radial-gradient(ellipse 70% 60% at 50% 50%, rgb(0 0 0 / 0.45), rgb(0 0 0 / 0.15));
}
.vp-backdrop--tone-light .vp-backdrop__shade {
  background: radial-gradient(ellipse 70% 60% at 50% 50%, rgb(255 255 255 / 0.7), rgb(255 255 255 / 0.2));
}

/* With the scroll */
.vp-backdrop--scroll-parallax .vp-backdrop__fx { transform: translateY(calc((var(--vp-backdrop-scroll) - 0.5) * 30%)); }
.vp-backdrop--scroll-shift .vp-backdrop__fx { filter: hue-rotate(calc(var(--vp-backdrop-scroll) * 140deg)); }
.vp-backdrop--scroll-fade .vp-backdrop__fx { opacity: calc(var(--vp-backdrop-strength) * min(1, (1 - var(--vp-backdrop-scroll)) * 2.2)); }

.vp-backdrop--motion-still .vp-backdrop__fx *,
.vp-backdrop--motion-still .vp-backdrop__layer { animation: none !important; }
/* out of sight it rests: nothing is drawn again for a band no one sees */
.vp-backdrop--away .vp-backdrop__fx * { animation-play-state: paused !important; }
/* a phone draws less blur */
@media (hover: none) {
  .vp-backdrop__ribbon { filter: blur(32px) saturate(1.3); }
  .vp-backdrop--tone-light .vp-backdrop__ribbon { filter: blur(52px); }
  .vp-backdrop__blob { filter: blur(16px); }
  .vp-backdrop--mesh .vp-backdrop__layer { filter: blur(20px) saturate(1.2); }
}

@keyframes vp-backdrop-drift {
  0% { transform: translate(0, 0) rotate(0deg) scale(1); }
  50% { transform: translate(8%, 6%) rotate(8deg) scale(1.1); }
  100% { transform: translate(-6%, 10%) rotate(-6deg) scale(0.95); }
}
@keyframes vp-backdrop-float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(12%, 10%) scale(1.12); }
  66% { transform: translate(-10%, 6%) scale(0.92); }
}
@keyframes vp-backdrop-breathe {
  0% { transform: scale(1) rotate(0deg); }
  100% { transform: scale(1.15) rotate(6deg); }
}
@keyframes vp-backdrop-flow {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
@keyframes vp-backdrop-sway {
  0% { transform: rotate(-4deg); }
  100% { transform: rotate(4deg); }
}
@keyframes vp-backdrop-pan {
  0% { background-position: 0 0; }
  100% { background-position: 240px 240px; }
}
@keyframes vp-backdrop-forward {
  0% { background-position: 0 0; }
  100% { background-position: 0 64px; }
}
@keyframes vp-backdrop-slide {
  0% { background-position: 0 0; }
  100% { background-position: 96px 0; }
}
@keyframes vp-backdrop-roll {
  0% { -webkit-mask-position: 0 100%; mask-position: 0 100%; }
  100% { -webkit-mask-position: 900px 100%; mask-position: 900px 100%; }
}
@keyframes vp-backdrop-roll-wide {
  0% { -webkit-mask-position: 0 100%; mask-position: 0 100%; }
  100% { -webkit-mask-position: 1300px 100%; mask-position: 1300px 100%; }
}
@keyframes vp-backdrop-roll-narrow {
  0% { -webkit-mask-position: 0 100%; mask-position: 0 100%; }
  100% { -webkit-mask-position: 700px 100%; mask-position: 700px 100%; }
}
@keyframes vp-backdrop-twinkle {
  0% { opacity: 0.25; }
  100% { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .vp-backdrop__fx *,
  .vp-backdrop__layer { animation: none !important; transition: none !important; }
}
</style>
`;export{e as default};