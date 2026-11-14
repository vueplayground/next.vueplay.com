var e=`<template>
  <div
    class="vp-carousel-slides"
    :class="classes"
    :style="style"
    role="region"
    aria-roledescription="carousel"
    :aria-label="label || 'Carousel'"
    @mouseenter="over = true"
    @mouseleave="over = false"
    @focusin="over = true"
    @focusout="over = false"
  >
    <div class="vp-carousel-slides__viewport">
      <div
        ref="track"
        class="vp-carousel-slides__track"
        tabindex="0"
        @scroll.passive="scrolled"
        @keydown.left.prevent="turn(-1)"
        @keydown.right.prevent="turn(1)"
        @pointerdown="grab"
        @dragstart.prevent
      >
        <slot />
      </div>
      <div v-if="!count" class="vp-carousel-slides__empty">Put cards, pictures or anything else in here: each is a slide</div>
      <template v-if="arrows === 'sides' && count > shownAtOnce">
        <button type="button" class="vp-carousel-slides__arrow vp-carousel-slides__arrow--back" :disabled="!loop && at <= 0" aria-label="Previous" @click="turn(-1)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg></button>
        <button type="button" class="vp-carousel-slides__arrow vp-carousel-slides__arrow--on" :disabled="!loop && at >= last" aria-label="Next" @click="turn(1)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg></button>
      </template>
    </div>
    <div v-if="count > shownAtOnce && (indicator !== 'none' || arrows === 'below')" class="vp-carousel-slides__bar">
      <div v-if="indicator === 'dots'" class="vp-carousel-slides__dots">
        <button v-for="n in last + 1" :key="n" type="button" class="vp-carousel-slides__dot" :class="{ 'vp-carousel-slides__dot--on': n - 1 === at }" :aria-label="'Slide ' + n" :aria-current="n - 1 === at ? 'true' : undefined" @click="go(n - 1)" />
      </div>
      <div v-else-if="indicator === 'bar'" class="vp-carousel-slides__progress" aria-hidden="true"><i :style="{ width: ((at + 1) / (last + 1)) * 100 + '%' }" /></div>
      <div v-else-if="indicator === 'count'" class="vp-carousel-slides__count" aria-live="polite">{{ at + 1 }} / {{ last + 1 }}</div>
      <span v-else class="vp-carousel-slides__spacer" />
      <div v-if="arrows === 'below'" class="vp-carousel-slides__turns">
        <button type="button" class="vp-carousel-slides__arrow" :disabled="!loop && at <= 0" aria-label="Previous" @click="turn(-1)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg></button>
        <button type="button" class="vp-carousel-slides__arrow" :disabled="!loop && at >= last" aria-label="Next" @click="turn(1)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg></button>
      </div>
    </div>
  </div>
</template>
<script>
// Slides in a row, one or more in sight at a time: whatever is put in it (cards, pictures, quotes, whole
// parts) is a slide. It is swiped on a phone and dragged or scrolled with a mouse, and stops at each slide; it
// can show a bit of the next one, keep the one in the middle large, turn by itself, and start over at the end.
// Arrows at the sides or under it, and dots, a bar or a count to say where one is.
export default {
  props: {
    perView: { type: Number, default: 3, label: 'Slides in sight', control: 'number', min: 1, max: 6 },
    perViewPhone: { type: Number, default: 1, label: 'Slides in sight on a phone', control: 'number', min: 1, max: 3 },
    gap: { type: String, default: '24px', label: 'Space between', control: 'slider', unit: 'px', min: 0, max: 64 },
    peek: { type: String, default: '', label: 'Show a bit of the next', control: 'slider', unit: 'px', min: 0, max: 160 },
    focus: { type: Boolean, default: false, label: 'The one in the middle stands out' },
    seconds: { type: Number, default: 0, label: 'Turns by itself every … seconds (0: no)', control: 'number', min: 0, max: 30 },
    loop: { type: Boolean, default: true, label: 'Starts over at the end' },
    arrows: {
      type: String,
      default: 'sides',
      label: 'Arrows',
      options: [{ key: 'At the sides', value: 'sides' }, { key: 'Under it', value: 'below' }, { key: 'None', value: 'none' }]
    },
    indicator: {
      type: String,
      default: 'dots',
      label: 'Where one is',
      options: [{ key: 'Dots', value: 'dots' }, { key: 'A bar', value: 'bar' }, { key: 'A count (2 / 5)', value: 'count' }, { key: 'Nothing', value: 'none' }]
    },
    height: {
      type: String,
      default: 'equal',
      label: 'Height of the slides',
      options: [{ key: 'All as the tallest', value: 'equal' }, { key: 'Each its own', value: 'own' }]
    },
    label: { type: String, default: '', label: 'What it shows', placeholder: 'For screen readers' }
  },
  data() {
    // (the observers and the timer are kept off the reactive data: a browser will not observe through a proxy)
    return { count: 0, at: 0, over: false, seen: true, wide: 1000 }
  },
  computed: {
    // (a phone's count where the carousel is narrow)
    shownAtOnce() {
      const phone = this.wide < 640
      const value = phone ? Number(this.perViewPhone) || 1 : Number(this.perView) || 1
      return Math.max(1, Math.min(phone ? 3 : 6, Math.round(value)))
    },
    last() {
      return Math.max(0, this.count - this.shownAtOnce)
    },
    classes() {
      return ['vp-carousel-slides--arrows-' + this.arrows, 'vp-carousel-slides--' + this.height, { 'vp-carousel-slides--focus': this.focus, 'vp-carousel-slides--peek': !!this.peek }]
    },
    style() {
      return {
        '--vp-carousel-slides-per': this.shownAtOnce,
        '--vp-carousel-slides-gap': this.gap || '0px',
        '--vp-carousel-slides-peek': this.peek || '0px'
      }
    }
  },
  watch: {
    seconds() {
      this.start()
    },
    shownAtOnce() {
      this.$nextTick(() => this.go(Math.min(this.at, this.last), false))
    }
  },
  mounted() {
    this.measure()
    // slides added or taken away (in the Studio, as it is built)
    if (typeof MutationObserver === 'function' && this.$refs.track) {
      this.watcher = new MutationObserver(() => this.measure())
      this.watcher.observe(this.$refs.track, { childList: true })
    }
    if (typeof ResizeObserver === 'function') {
      this.sizer = new ResizeObserver(() => this.measure())
      this.sizer.observe(this.$el)
    }
    if (typeof IntersectionObserver === 'function') {
      this.sight = new IntersectionObserver(([entry]) => { this.seen = entry.isIntersecting })
      this.sight.observe(this.$el)
    }
    this.start()
  },
  beforeUnmount() {
    clearInterval(this.timer)
    this.watcher?.disconnect()
    this.sizer?.disconnect()
    this.sight?.disconnect()
  },
  methods: {
    slides() {
      return this.$refs.track ? [...this.$refs.track.children].filter(el => el.nodeType === 1) : []
    },
    measure() {
      this.count = this.slides().length
      this.wide = this.$el?.getBoundingClientRect?.().width || this.wide
      this.mark()
    },
    // The slide that stands out (focus) and the ones in sight, for screen readers too
    mark() {
      this.slides().forEach((el, index) => {
        const inSight = index >= this.at && index < this.at + this.shownAtOnce
        el.classList.toggle('vp-carousel-slides-off', !inSight)
        el.classList.toggle('vp-carousel-slides-middle', index === this.at + Math.floor((this.shownAtOnce - 1) / 2))
      })
    },
    go(index, smooth = true) {
      const track = this.$refs.track
      const slides = this.slides()
      if (!track || !slides.length) return
      const to = Math.max(0, Math.min(this.last, index))
      const left = slides[to].offsetLeft - slides[0].offsetLeft
      track.scrollTo({ left, behavior: smooth && !this.calm() ? 'smooth' : 'auto' })
      this.at = to
      this.mark()
    },
    turn(step) {
      if (this.loop && step > 0 && this.at >= this.last) return this.go(0)
      if (this.loop && step < 0 && this.at <= 0) return this.go(this.last)
      this.go(this.at + step)
    },
    // Where it has been scrolled or swiped to: the slide nearest the start
    scrolled() {
      const track = this.$refs.track
      const slides = this.slides()
      if (!track || !slides.length) return
      const from = track.scrollLeft
      let nearest = 0
      slides.forEach((el, index) => {
        if (Math.abs(el.offsetLeft - slides[0].offsetLeft - from) < Math.abs(slides[nearest].offsetLeft - slides[0].offsetLeft - from)) nearest = index
      })
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 2) nearest = this.last
      if (nearest !== this.at) {
        this.at = Math.min(nearest, this.last)
        this.mark()
      }
    },
    // A mouse drags it as a finger swipes it (a click on something in it stays a click)
    grab(event) {
      if (event.pointerType !== 'mouse' || event.button !== 0) return
      const track = this.$refs.track
      const start = { x: event.clientX, left: track.scrollLeft, moved: false }
      const move = (e) => {
        const dx = e.clientX - start.x
        if (!start.moved && Math.abs(dx) < 6) return
        if (!start.moved) { start.moved = true; track.classList.add('vp-carousel-slides__track--held') }
        track.scrollLeft = start.left - dx
      }
      const up = () => {
        window.removeEventListener('pointermove', move)
        window.removeEventListener('pointerup', up)
        window.removeEventListener('pointercancel', up)
        if (!start.moved) return
        track.classList.remove('vp-carousel-slides__track--held')
        const stop = (e) => { e.stopPropagation(); e.preventDefault() }
        track.addEventListener('click', stop, { capture: true, once: true })
        setTimeout(() => track.removeEventListener('click', stop, { capture: true }), 0)
        this.scrolled()
        this.go(this.at)
      }
      window.addEventListener('pointermove', move)
      window.addEventListener('pointerup', up)
      // (a picture the browser would drag on its own lets go of the pointer: that is letting go too)
      window.addEventListener('pointercancel', up)
    },
    calm() {
      return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
    },
    start() {
      clearInterval(this.timer)
      const seconds = Number(this.seconds) || 0
      if (seconds > 0 && !this.calm()) this.timer = setInterval(() => { if (!this.over && this.seen) this.turn(1) }, seconds * 1000)
    }
  }
}
<\/script>
<style>
.vp-carousel-slides {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.vp-carousel-slides__viewport {
  position: relative;
}
.vp-carousel-slides__track {
  display: flex;
  gap: var(--vp-carousel-slides-gap, 24px);
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: var(--vp-carousel-slides-peek, 0px);
  padding-inline: var(--vp-carousel-slides-peek, 0px);
  padding-block: 6px;
  scrollbar-width: none;
  outline: none;
  cursor: grab;
}
.vp-carousel-slides__track::-webkit-scrollbar {
  display: none;
}
.vp-carousel-slides__track:focus-visible {
  box-shadow: inset 0 0 0 2px var(--vp-primary, #6366f1);
  border-radius: var(--vp-radius, 10px);
}
.vp-carousel-slides__track--held {
  cursor: grabbing;
  scroll-snap-type: none;
  user-select: none;
}
.vp-carousel-slides__track > * {
  flex: 0 0 calc((100% - var(--vp-carousel-slides-peek, 0px) * 2 - var(--vp-carousel-slides-gap, 24px) * (var(--vp-carousel-slides-per, 3) - 1)) / var(--vp-carousel-slides-per, 3));
  min-width: 0;
  box-sizing: border-box;
  scroll-snap-align: start;
  transition: transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.45s ease, filter 0.45s ease;
}
.vp-carousel-slides--equal .vp-carousel-slides__track { align-items: stretch; }
.vp-carousel-slides--own .vp-carousel-slides__track { align-items: flex-start; }
.vp-carousel-slides__track > img,
.vp-carousel-slides__track > .vp-image {
  object-fit: cover;
  border-radius: var(--vp-radius, 10px);
}
/* the one in the middle stands out, the others step back */
.vp-carousel-slides--focus .vp-carousel-slides__track > * { scroll-snap-align: center; }
.vp-carousel-slides--focus .vp-carousel-slides__track > .vp-carousel-slides-off,
.vp-carousel-slides--focus .vp-carousel-slides__track > :not(.vp-carousel-slides-middle) {
  transform: scale(0.9);
  opacity: 0.55;
}
.vp-carousel-slides__empty {
  display: grid;
  place-items: center;
  min-height: 180px;
  padding: 24px;
  border: 2px dashed var(--vp-border, #d1d5db);
  border-radius: var(--vp-radius, 10px);
  color: var(--vp-muted, #6b7280);
  text-align: center;
  font: inherit;
}
.vp-carousel-slides__arrow {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 1px solid color-mix(in oklch, var(--vp-text, #111827) 10%, transparent);
  border-radius: 50%;
  background: var(--vp-background, #fff);
  color: var(--vp-text, #111827);
  box-shadow: 0 6px 20px rgb(0 0 0 / 0.12);
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease, background 0.2s ease, color 0.2s ease;
}
.vp-carousel-slides__arrow svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.vp-carousel-slides__arrow:hover:not(:disabled) {
  background: var(--vp-primary, #6366f1);
  color: var(--vp-primary-contrast, #fff);
  transform: scale(1.06);
}
.vp-carousel-slides__arrow:focus-visible {
  outline: 2px solid var(--vp-primary, #6366f1);
  outline-offset: 2px;
}
.vp-carousel-slides__arrow:disabled {
  opacity: 0;
  pointer-events: none;
}
.vp-carousel-slides__arrow--back,
.vp-carousel-slides__arrow--on {
  position: absolute;
  top: 50%;
  z-index: 2;
  translate: 0 -50%;
}
.vp-carousel-slides__arrow--back { left: calc(var(--vp-carousel-slides-peek, 0px) - 22px); }
.vp-carousel-slides__arrow--on { right: calc(var(--vp-carousel-slides-peek, 0px) - 22px); }
.vp-carousel-slides__bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding-inline: var(--vp-carousel-slides-peek, 0px);
}
.vp-carousel-slides--arrows-below .vp-carousel-slides__bar { justify-content: space-between; }
.vp-carousel-slides__spacer { flex: 1; }
.vp-carousel-slides__dots {
  display: flex;
  gap: 8px;
}
.vp-carousel-slides__dot {
  width: 8px;
  height: 8px;
  padding: 0;
  border: 0;
  border-radius: 4px;
  background: color-mix(in oklch, var(--vp-text, #111827) 22%, transparent);
  cursor: pointer;
  transition: width 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), background 0.3s ease;
}
.vp-carousel-slides__dot--on {
  width: 26px;
  background: var(--vp-primary, #6366f1);
}
.vp-carousel-slides__progress {
  flex: 1;
  max-width: 320px;
  height: 4px;
  border-radius: 2px;
  background: color-mix(in oklch, var(--vp-text, #111827) 12%, transparent);
  overflow: hidden;
}
.vp-carousel-slides__progress i {
  display: block;
  height: 100%;
  border-radius: 2px;
  background: var(--vp-primary, #6366f1);
  transition: width 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.vp-carousel-slides__count {
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--vp-muted, #6b7280);
}
.vp-carousel-slides__turns {
  display: flex;
  gap: 10px;
}
@media (hover: none) {
  .vp-carousel-slides--arrows-sides .vp-carousel-slides__arrow--back,
  .vp-carousel-slides--arrows-sides .vp-carousel-slides__arrow--on { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .vp-carousel-slides__track > *,
  .vp-carousel-slides__dot,
  .vp-carousel-slides__progress i { transition: none; }
}
</style>
`;export{e as default};