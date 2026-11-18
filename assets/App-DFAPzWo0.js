var e=`<template>
  <section
    class="vp-floating-shapes"
    :class="['vp-floating-shapes--' + look, 'vp-floating-shapes--' + align, 'vp-floating-shapes--' + motion]"
    :style="style"
    @pointermove="move"
    @pointerleave="leave"
  >
    <div class="vp-floating-shapes__world" aria-hidden="true">
      <div class="vp-floating-shapes__glow"></div>
      <div ref="camera" class="vp-floating-shapes__camera">
        <div v-if="floor" class="vp-floating-shapes__floor"></div>
        <div
          v-for="(shape, index) in placed"
          :key="index"
          class="vp-floating-shapes__item"
          :style="{ transform: 'translate3d(' + shape.x + 'px, ' + shape.y + 'px, ' + shape.z + 'px)', '--vp-floating-shapes-delay': shape.delay + 's', '--vp-floating-shapes-time': shape.time + 's' }"
        >
          <div class="vp-floating-shapes__float">
            <div class="vp-floating-shapes__shape" :class="'vp-floating-shapes__shape--' + shape.kind" :style="{ '--vp-floating-shapes-size': shape.size + 'px', '--vp-floating-shapes-tint': shape.tint }">
              <template v-if="shape.kind === 'cube'"><i v-for="side in 6" :key="side"></i></template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="vp-floating-shapes__content">
      <slot />
    </div>
  </section>
</template>
<script>
// A part of the page in a small world of shapes floating in 3D: cubes, rings, spheres and bars hanging in the
// air over a glowing floor, seen by a camera that turns toward the pointer and drifts slowly round by itself.
// What is put in it stands in front, like in a Section. The shapes are placed the same way every time, so the
// page looks the same when it is drawn on the server. Less motion asked for: a still picture.
const KINDS = { mixed: ['cube', 'ring', 'sphere', 'bar', 'cube', 'sphere'], cubes: ['cube'], rings: ['ring'], spheres: ['sphere'], bars: ['bar'] }

// the same "random" numbers every time
const seeded = seed => () => {
  seed = (seed * 16807) % 2147483647
  return (seed - 1) / 2147483646
}

export default {
  props: {
    shapes: {
      type: String,
      default: 'mixed',
      label: 'Shapes',
      options: [{ key: 'All kinds', value: 'mixed' }, { key: 'Cubes', value: 'cubes' }, { key: 'Rings', value: 'rings' }, { key: 'Spheres', value: 'spheres' }, { key: 'Bars', value: 'bars' }]
    },
    count: { type: Number, default: 14, label: 'How many', control: 'number', min: 3, max: 40 },
    look: {
      type: String,
      default: 'night',
      label: 'Look',
      options: [{ key: 'Night', value: 'night' }, { key: 'Day', value: 'day' }, { key: 'As the site', value: 'site' }]
    },
    color1: { type: String, default: '', label: 'First color', control: 'color' },
    color2: { type: String, default: '', label: 'Second color', control: 'color' },
    background: { type: String, default: '', label: 'Background', control: 'color' },
    floor: { type: Boolean, default: true, label: 'Glowing floor' },
    follow: { type: Boolean, default: true, label: 'Camera follows the pointer' },
    motion: {
      type: String,
      default: 'calm',
      label: 'Movement',
      options: [{ key: 'Calm', value: 'calm' }, { key: 'Lively', value: 'lively' }, { key: 'Still', value: 'still' }]
    },
    seed: { type: Number, default: 7, label: 'Arrangement', control: 'number', min: 1, max: 999 },
    height: { type: String, default: '', label: 'Least height', control: 'slider', unit: 'px', min: 200, max: 1000 },
    align: {
      type: String,
      default: 'center',
      label: 'Content',
      options: [{ key: 'In the middle', value: 'center' }, { key: 'At the left', value: 'left' }]
    },
    color: { type: String, default: '', label: 'Text color', control: 'color' }
  },
  computed: {
    placed() {
      const kinds = KINDS[this.shapes] || KINDS.mixed
      const random = seeded(Math.max(1, Math.round(this.seed) || 7) * 7919)
      const many = Math.max(1, Math.min(40, Math.round(this.count) || 14))
      const tints = ['var(--vp-floating-shapes-one)', 'var(--vp-floating-shapes-two)']
      return Array.from({ length: many }, (_, i) => {
        // round the middle, never right in front of what is written there
        const side = i % 2 ? 1 : -1
        const x = side * (220 + random() * 620)
        const y = (random() - 0.5) * 640
        const z = -random() * 900 + 120
        const kind = kinds[i % kinds.length]
        return {
          kind,
          x: Math.round(x),
          y: Math.round(y),
          z: Math.round(z),
          size: Math.round((kind === 'ring' ? 90 : kind === 'bar' ? 70 : 40) + random() * (kind === 'ring' ? 140 : 60)),
          tint: tints[Math.floor(random() * 2)],
          delay: -(random() * 10).toFixed(2),
          time: (8 + random() * 8).toFixed(2)
        }
      })
    },
    style() {
      return {
        '--vp-floating-shapes-one': this.color1 || undefined,
        '--vp-floating-shapes-two': this.color2 || undefined,
        '--vp-floating-shapes-background': this.background || undefined,
        '--vp-floating-shapes-height': this.height || undefined,
        '--vp-floating-shapes-color': this.color || undefined
      }
    }
  },
  mounted() {
    this.still = this.motion === 'still' || (typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    this.aim = null
    this.now = { x: 0, y: 0 }
    this.moved = -Infinity
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
  },
  watch: {
    motion(value) {
      this.still = value === 'still' || (typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      this.run()
    }
  },
  methods: {
    move(event) {
      if (!this.follow || !this.$el || this.$el.nodeType !== 1) return
      const box = this.$el.getBoundingClientRect()
      this.aim = { x: (event.clientX - box.left) / box.width - 0.5, y: (event.clientY - box.top) / box.height - 0.5 }
      this.moved = performance.now()
    },
    leave() {
      this.aim = null
    },
    run() {
      if (this.frame || this.still) {
        if (this.still) this.place({ x: 0, y: 0 })
        return
      }
      const step = time => {
        const idle = !this.aim || time - this.moved > 2500
        const lively = this.motion === 'lively'
        const aim = idle ? { x: Math.sin(time / (lively ? 2600 : 5200)) * 0.35, y: Math.sin(time / (lively ? 3700 : 7300)) * 0.2 } : this.aim
        const ease = idle ? 0.02 : 0.07
        this.now.x += (aim.x - this.now.x) * ease
        this.now.y += (aim.y - this.now.y) * ease
        this.place(this.now)
        const hidden = typeof document !== 'undefined' && document.hidden
        this.frame = this.seen && !hidden && !this.still ? requestAnimationFrame(step) : 0
      }
      this.frame = requestAnimationFrame(step)
    },
    place({ x, y }) {
      const el = this.$el
      if (!el || el.nodeType !== 1) return
      el.style.setProperty('--vp-floating-shapes-ry', (x * 26).toFixed(3) + 'deg')
      el.style.setProperty('--vp-floating-shapes-rx', (-y * 14).toFixed(3) + 'deg')
      el.style.setProperty('--vp-floating-shapes-cx', (-x * 120).toFixed(1) + 'px')
      el.style.setProperty('--vp-floating-shapes-gx', (50 + x * 70).toFixed(1) + '%')
      el.style.setProperty('--vp-floating-shapes-gy', (45 + y * 60).toFixed(1) + '%')
    }
  }
}
<\/script>
<style>
.vp-floating-shapes {
  --vp-floating-shapes-one: var(--vp-primary, #17e8c2);
  --vp-floating-shapes-two: #00a6ff;
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: var(--vp-floating-shapes-height, 560px);
  padding: clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem);
  overflow: hidden;
  isolation: isolate;
  color: var(--vp-floating-shapes-color, inherit);
}
.vp-floating-shapes--night {
  background: var(--vp-floating-shapes-background, linear-gradient(180deg, #04161a 0%, #062a2a 55%, #08332c 100%));
  color: var(--vp-floating-shapes-color, #fff);
}
.vp-floating-shapes--day {
  background: var(--vp-floating-shapes-background, linear-gradient(180deg, #f3fbff 0%, #e6f7f1 100%));
  color: var(--vp-floating-shapes-color, #0f172a);
}
.vp-floating-shapes--site { background: var(--vp-floating-shapes-background, var(--vp-background, transparent)); }
.vp-floating-shapes__world {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  perspective: 1100px;
  perspective-origin: 50% 45%;
}
.vp-floating-shapes__glow {
  position: absolute;
  inset: -20%;
  background:
    radial-gradient(circle 420px at var(--vp-floating-shapes-gx, 50%) var(--vp-floating-shapes-gy, 45%), color-mix(in srgb, var(--vp-floating-shapes-one) 24%, transparent), transparent 70%),
    radial-gradient(circle 560px at calc(100% - var(--vp-floating-shapes-gx, 50%)) 15%, color-mix(in srgb, var(--vp-floating-shapes-two) 16%, transparent), transparent 70%);
}
.vp-floating-shapes__camera {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0;
  height: 0;
  transform-style: preserve-3d;
  transform: translateX(var(--vp-floating-shapes-cx, 0px)) rotateX(var(--vp-floating-shapes-rx, 0deg)) rotateY(var(--vp-floating-shapes-ry, 0deg));
}
.vp-floating-shapes__floor {
  position: absolute;
  left: -2000px;
  top: -2000px;
  width: 4000px;
  height: 4000px;
  transform: translateY(420px) rotateX(90deg);
  background-image:
    linear-gradient(color-mix(in srgb, var(--vp-floating-shapes-one) 40%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--vp-floating-shapes-one) 40%, transparent) 1px, transparent 1px);
  background-size: 80px 80px;
  -webkit-mask-image: radial-gradient(circle 1400px at 50% 50%, #000, transparent 70%);
  mask-image: radial-gradient(circle 1400px at 50% 50%, #000, transparent 70%);
  animation: vp-floating-shapes-floor 6s linear infinite;
}
@keyframes vp-floating-shapes-floor { to { background-position: 0 80px, 0 80px; } }
.vp-floating-shapes__item { position: absolute; transform-style: preserve-3d; }
.vp-floating-shapes__float {
  transform-style: preserve-3d;
  animation: vp-floating-shapes-float var(--vp-floating-shapes-time, 10s) ease-in-out var(--vp-floating-shapes-delay, 0s) infinite alternate;
}
.vp-floating-shapes--lively .vp-floating-shapes__float { animation-duration: calc(var(--vp-floating-shapes-time, 10s) / 2); }
@keyframes vp-floating-shapes-float {
  from { transform: translate3d(0, -18px, 0) rotateX(-20deg) rotateY(0deg); }
  to { transform: translate3d(0, 18px, 40px) rotateX(25deg) rotateY(200deg); }
}
.vp-floating-shapes__shape {
  position: relative;
  left: calc(var(--vp-floating-shapes-size) / -2);
  top: calc(var(--vp-floating-shapes-size) / -2);
  width: var(--vp-floating-shapes-size);
  height: var(--vp-floating-shapes-size);
  transform-style: preserve-3d;
}
.vp-floating-shapes__shape--cube i {
  position: absolute;
  inset: 0;
  border: 1px solid color-mix(in srgb, var(--vp-floating-shapes-tint) 85%, #fff);
  background: color-mix(in srgb, var(--vp-floating-shapes-tint) 25%, transparent);
  box-shadow: inset 0 0 22px color-mix(in srgb, var(--vp-floating-shapes-tint) 45%, transparent);
}
.vp-floating-shapes__shape--cube i:nth-child(1) { transform: translateZ(calc(var(--vp-floating-shapes-size) / 2)); }
.vp-floating-shapes__shape--cube i:nth-child(2) { transform: rotateY(180deg) translateZ(calc(var(--vp-floating-shapes-size) / 2)); }
.vp-floating-shapes__shape--cube i:nth-child(3) { transform: rotateY(90deg) translateZ(calc(var(--vp-floating-shapes-size) / 2)); }
.vp-floating-shapes__shape--cube i:nth-child(4) { transform: rotateY(-90deg) translateZ(calc(var(--vp-floating-shapes-size) / 2)); }
.vp-floating-shapes__shape--cube i:nth-child(5) { transform: rotateX(90deg) translateZ(calc(var(--vp-floating-shapes-size) / 2)); }
.vp-floating-shapes__shape--cube i:nth-child(6) { transform: rotateX(-90deg) translateZ(calc(var(--vp-floating-shapes-size) / 2)); }
.vp-floating-shapes__shape--ring {
  border-radius: 50%;
  border: 3px solid color-mix(in srgb, var(--vp-floating-shapes-tint) 60%, transparent);
  box-shadow: 0 0 40px color-mix(in srgb, var(--vp-floating-shapes-tint) 30%, transparent), inset 0 0 40px color-mix(in srgb, var(--vp-floating-shapes-tint) 20%, transparent);
}
.vp-floating-shapes__shape--sphere {
  border-radius: 50%;
  background: radial-gradient(circle at 32% 28%, #fff 0%, color-mix(in srgb, var(--vp-floating-shapes-tint) 70%, #fff) 18%, var(--vp-floating-shapes-tint) 48%, color-mix(in srgb, var(--vp-floating-shapes-tint) 45%, #000) 100%);
  box-shadow: 0 20px 40px -10px color-mix(in srgb, var(--vp-floating-shapes-tint) 50%, transparent);
}
.vp-floating-shapes__shape--bar {
  height: calc(var(--vp-floating-shapes-size) / 4);
  border-radius: 999px;
  background: linear-gradient(90deg, var(--vp-floating-shapes-one), var(--vp-floating-shapes-two));
  box-shadow: 0 0 30px color-mix(in srgb, var(--vp-floating-shapes-tint) 40%, transparent);
}
.vp-floating-shapes__content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
  max-width: var(--vp-width, 1100px);
  text-align: center;
}
.vp-floating-shapes--left .vp-floating-shapes__content { align-items: flex-start; text-align: left; }
.vp-floating-shapes--still .vp-floating-shapes__float,
.vp-floating-shapes--still .vp-floating-shapes__floor { animation: none; }
@media (max-width: 700px) {
  .vp-floating-shapes__camera { scale: 0.6; }
}
@media (prefers-reduced-motion: reduce) {
  .vp-floating-shapes__float, .vp-floating-shapes__floor { animation: none; }
}
</style>
`;export{e as default};