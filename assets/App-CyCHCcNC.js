var e=`<template>
  <div class="vp-reveal" :class="classes" :style="style">
    <slot />
  </div>
</template>
<script>
// What is put in it comes into sight as the page is scrolled to it: it fades in, rises, slides in from a side,
// grows, sharpens or turns, each part a little after the one before. Once, or every time it comes back into
// sight. Nothing moves for those who ask their device for less motion; in the Studio's editor it is all shown.
export default {
  props: {
    effect: {
      type: String,
      default: 'rise',
      label: 'How it comes in',
      options: [
        { key: 'Rises', value: 'rise' }, { key: 'Fades in', value: 'fade' }, { key: 'From the left', value: 'left' },
        { key: 'From the right', value: 'right' }, { key: 'Grows', value: 'zoom' }, { key: 'Sharpens', value: 'blur' }, { key: 'Turns', value: 'flip' }
      ]
    },
    duration: { type: Number, default: 700, label: 'How long (ms)', control: 'number', min: 100, max: 3000 },
    delay: { type: Number, default: 0, label: 'Waits first (ms)', control: 'number', min: 0, max: 3000 },
    stagger: { type: Number, default: 120, label: 'Each part after the one before (ms)', control: 'number', min: 0, max: 1000 },
    distance: { type: String, default: '32px', label: 'How far it moves', control: 'slider', unit: 'px', min: 0, max: 200 },
    once: { type: Boolean, default: true, label: 'Only the first time' },
    layout: {
      type: String,
      default: 'stack',
      label: 'Parts placed',
      options: [{ key: 'Under each other', value: 'stack' }, { key: 'In a row', value: 'row' }, { key: 'As they are', value: 'plain' }]
    },
    gap: { type: String, default: '24px', label: 'Gap between parts', control: 'slider', unit: 'px', min: 0, max: 96 }
  },
  data() {
    // (the observers are kept off the reactive data: a browser will not observe through a proxy)
    return { inSight: false }
  },
  computed: {
    classes() {
      return ['vp-reveal--' + this.effect, 'vp-reveal--' + this.layout, { 'vp-reveal--in': this.inSight }]
    },
    style() {
      return {
        '--vp-reveal-duration': Math.max(100, Number(this.duration) || 700) + 'ms',
        '--vp-reveal-delay': Math.max(0, Number(this.delay) || 0) + 'ms',
        '--vp-reveal-stagger': Math.max(0, Number(this.stagger) || 0) + 'ms',
        '--vp-reveal-distance': this.distance || undefined,
        '--vp-reveal-gap': this.gap || undefined
      }
    }
  },
  mounted() {
    this.number()
    // in the Studio's editor, or with less motion asked for, or with no way to watch: shown at once
    // (the Studio's canvas has its bridge: window.studio and the #receiver it listens on)
    const editing = !!window.studio || !!document.getElementById('receiver')
    const calm = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
    if (editing || calm || typeof IntersectionObserver !== 'function') {
      this.inSight = true
      return
    }
    this.sight = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.inSight = true
        if (this.once) this.sight.disconnect()
      } else if (!this.once && entry.boundingClientRect.top > 0) {
        this.inSight = false
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' })
    this.sight.observe(this.$el)
    if (typeof MutationObserver === 'function') {
      this.watcher = new MutationObserver(() => this.number())
      this.watcher.observe(this.$el, { childList: true })
    }
  },
  beforeUnmount() {
    this.sight?.disconnect()
    this.watcher?.disconnect()
  },
  methods: {
    // each part its place in the line, for its turn to come in
    number() {
      ;[...(this.$el?.children || [])].forEach((el, index) => el.style.setProperty('--vp-reveal-i', index))
    }
  }
}
<\/script>
<style>
.vp-reveal {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
}
.vp-reveal--stack { display: flex; flex-direction: column; gap: var(--vp-reveal-gap, 24px); }
.vp-reveal--row { display: flex; flex-wrap: wrap; gap: var(--vp-reveal-gap, 24px); }
.vp-reveal--row > * { flex: 1 1 220px; min-width: 0; }
.vp-reveal > * {
  transition:
    opacity var(--vp-reveal-duration, 700ms) cubic-bezier(0.2, 0.8, 0.2, 1),
    transform var(--vp-reveal-duration, 700ms) cubic-bezier(0.2, 0.8, 0.2, 1),
    filter var(--vp-reveal-duration, 700ms) ease;
  transition-delay: calc(var(--vp-reveal-delay, 0ms) + var(--vp-reveal-i, 0) * var(--vp-reveal-stagger, 120ms));
}
.vp-reveal:not(.vp-reveal--in) > * { opacity: 0; }
.vp-reveal--rise:not(.vp-reveal--in) > * { transform: translateY(var(--vp-reveal-distance, 32px)); }
.vp-reveal--left:not(.vp-reveal--in) > * { transform: translateX(calc(var(--vp-reveal-distance, 32px) * -1)); }
.vp-reveal--right:not(.vp-reveal--in) > * { transform: translateX(var(--vp-reveal-distance, 32px)); }
.vp-reveal--zoom:not(.vp-reveal--in) > * { transform: scale(0.88); }
.vp-reveal--blur:not(.vp-reveal--in) > * { filter: blur(12px); transform: scale(1.03); }
.vp-reveal--flip { perspective: 1000px; }
.vp-reveal--flip:not(.vp-reveal--in) > * { transform: rotateX(28deg) translateY(var(--vp-reveal-distance, 32px)); transform-origin: 50% 100%; }
@media (prefers-reduced-motion: reduce) {
  .vp-reveal > * { transition: none; }
  .vp-reveal:not(.vp-reveal--in) > * { opacity: 1; transform: none; filter: none; }
}
</style>
`;export{e as default};