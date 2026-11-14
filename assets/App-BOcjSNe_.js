var e=`<template>
  <div class="vp-marquee" :class="classes" :style="style" role="group" :aria-label="label || undefined">
    <div class="vp-marquee__track" :style="{ '--vp-marquee-copies': copies }">
      <div v-for="n in copies" :key="n" class="vp-marquee__group" :aria-hidden="n > 1 ? 'true' : undefined" :inert="n > 1 ? '' : undefined">
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
// What is put in it (logos, words, cards, pictures) moves along in a row that never ends: it is shown again as
// often as the width needs, so there is never a gap. It goes left or right, waits while it is pointed at if
// asked, and fades out at its edges. It stands still for those who ask their device for less motion.
export default {
  props: {
    seconds: { type: Number, default: 30, label: 'Seconds for one round', control: 'number', min: 4, max: 240 },
    direction: {
      type: String,
      default: 'left',
      label: 'Moves to the',
      options: [{ key: 'Left', value: 'left' }, { key: 'Right', value: 'right' }]
    },
    gap: { type: String, default: '48px', label: 'Space between', control: 'slider', unit: 'px', min: 0, max: 160 },
    pause: { type: Boolean, default: true, label: 'Stops when pointed at' },
    fade: { type: Boolean, default: true, label: 'Fades out at the edges' },
    align: {
      type: String,
      default: 'center',
      label: 'Lined up',
      options: [{ key: 'In the middle', value: 'center' }, { key: 'At the top', value: 'start' }, { key: 'At the bottom', value: 'end' }]
    },
    label: { type: String, default: '', label: 'What it shows', placeholder: 'For screen readers' }
  },
  data() {
    // (the observer is kept off the reactive data: a browser will not observe through a proxy)
    return { copies: 2 }
  },
  computed: {
    classes() {
      return ['vp-marquee--' + this.direction, 'vp-marquee--' + this.align, { 'vp-marquee--pause': this.pause, 'vp-marquee--fade': this.fade }]
    },
    style() {
      return {
        '--vp-marquee-seconds': Math.max(4, Number(this.seconds) || 30) + 's',
        '--vp-marquee-gap': this.gap || '0px'
      }
    }
  },
  mounted() {
    this.fill()
    if (typeof ResizeObserver === 'function') {
      this.sizer = new ResizeObserver(() => this.fill())
      this.sizer.observe(this.$el)
      const first = this.$el.querySelector('.vp-marquee__group')
      if (first) this.sizer.observe(first)
    }
  },
  beforeUnmount() {
    this.sizer?.disconnect()
  },
  methods: {
    // as many rounds of it as fill the width and one more, so the row never runs out
    fill() {
      const first = this.$el?.querySelector?.('.vp-marquee__group')
      const wide = this.$el?.getBoundingClientRect?.().width || 0
      const one = first?.getBoundingClientRect?.().width || 0
      const copies = one > 0 ? Math.min(12, Math.max(2, Math.ceil(wide / one) + 1)) : 2
      if (copies !== this.copies) this.copies = copies
    }
  }
}
<\/script>
<style>
.vp-marquee {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  overflow: hidden;
}
.vp-marquee--fade {
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
}
.vp-marquee__track {
  display: flex;
  width: max-content;
  animation: vp-marquee-left var(--vp-marquee-seconds, 30s) linear infinite;
}
.vp-marquee--right .vp-marquee__track {
  animation-name: vp-marquee-right;
}
.vp-marquee--pause:hover .vp-marquee__track,
.vp-marquee--pause:focus-within .vp-marquee__track {
  animation-play-state: paused;
}
.vp-marquee__group {
  display: flex;
  flex: none;
  align-items: center;
  gap: var(--vp-marquee-gap, 48px);
  padding-right: var(--vp-marquee-gap, 48px);
}
.vp-marquee--start .vp-marquee__group { align-items: flex-start; }
.vp-marquee--end .vp-marquee__group { align-items: flex-end; }
.vp-marquee__group > * {
  flex: none;
  max-width: none;
}
@keyframes vp-marquee-left {
  from { transform: translateX(0); }
  to { transform: translateX(calc(-100% / var(--vp-marquee-copies, 2))); }
}
@keyframes vp-marquee-right {
  from { transform: translateX(calc(-100% / var(--vp-marquee-copies, 2))); }
  to { transform: translateX(0); }
}
@media (prefers-reduced-motion: reduce) {
  .vp-marquee__track { animation: none; }
}
</style>
`;export{e as default};