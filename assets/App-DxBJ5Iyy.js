var e=`<template>
  <div class="vp-motion-effects" :class="classes" :style="style" @mouseenter="enter" @mouseleave="leave" @focusin="enter" @focusout="leave" @click="tap">
    <slot />
    <template v-if="inStudio && empty()">
      <span v-for="n in 4" :key="n" class="vp-motion-effects__sample" :title="say('sample')">{{ n }}</span>
    </template>
  </div>
</template>
<script>
// Each part put in it moves: they come in (fade, rise, grow, bounce, spin, flip, sharpen, shake) one after the
// other, or move all the time (pulse, float, a wave, a swarm, shapes that morph). When it is scrolled to, at once,
// when it is pointed at, or always. Where it stands and how its parts are laid out is not changed: it only moves
// them. Nothing moves for those who ask their device for less motion, and nothing is hidden until it can move.
// In the Studio's editor it plays at once, and what comes in comes in again every few seconds to be judged.
// On a site what moves all the time stops while something in it has focus, and a click or tap on it (not on a
// link or button in it) stops it and starts it again (WCAG 2.2.2). "Always" is for decoration, never for what
// must be read.

// The effects that move all the time; the others come in once (bounce and spin go on when looped)
const ROUNDS = ['pulse', 'float', 'swarm', 'morph', 'wave']
const LOOPED = ['bounce', 'spin']
// The ones that start out of sight (a shake starts where it is)
const HIDDEN = ['fade', 'rise', 'zoom', 'bounce', 'spin', 'flip', 'blur']
const EFFECTS = [...HIDDEN, 'shake', ...ROUNDS]
const EASINGS = {
  smooth: ['cubic-bezier(0.2, 0.8, 0.2, 1)', 'ease-in-out'],
  gentle: ['ease-in-out', 'ease-in-out'],
  spring: ['cubic-bezier(0.34, 1.56, 0.64, 1)', 'cubic-bezier(0.34, 1.56, 0.64, 1)'],
  snappy: ['cubic-bezier(0.7, 0, 0.2, 1)', 'cubic-bezier(0.7, 0, 0.2, 1)'],
  linear: ['linear', 'linear']
}
// How long it rests between two times of coming in, when it comes in again and again (ms)
const REST = 1200
const STUDIO_REST = 1600

// A number from 0 to 1 that is the same every time for the same part (a swarm's path, a random order)
const seeded = (i, k) => {
  const x = Math.sin((i + 1) * 12.9898 + (k + 1) * 78.233) * 43758.5453
  return x - Math.floor(x)
}

// The words it says itself, in the site's language
const WORDS = {
  en: { sample: 'A sample: put your own parts in here' },
  nb: { sample: 'Et eksempel: legg dine egne deler her' },
  sv: { sample: 'Ett exempel: lägg dina egna delar här' },
  da: { sample: 'Et eksempel: læg dine egne dele her' },
  fi: { sample: 'Esimerkki: lisää omat osasi tähän' },
  de: { sample: 'Ein Beispiel: Füge hier deine eigenen Teile ein' },
  fr: { sample: 'Un exemple : placez vos propres éléments ici' },
  es: { sample: 'Un ejemplo: pon aquí tus propios elementos' },
  it: { sample: 'Un esempio: inserisci qui i tuoi elementi' },
  nl: { sample: 'Een voorbeeld: zet hier je eigen onderdelen' },
  pt: { sample: 'Um exemplo: coloque aqui os seus próprios elementos' },
  pl: { sample: 'Przykład: umieść tutaj własne elementy' },
  zh: { sample: '示例：在此放入你自己的内容' },
  ja: { sample: 'サンプル：ここに自分のパーツを入れてください' }
}

export default {
  props: {
    effect: {
      type: String,
      default: 'rise',
      label: 'How the parts move',
      control: 'select',
      options: [
        { key: 'Fade in', value: 'fade' }, { key: 'Rise', value: 'rise' }, { key: 'Grow (zoom)', value: 'zoom' },
        { key: 'Bounce', value: 'bounce' }, { key: 'Spin', value: 'spin' }, { key: 'Flip', value: 'flip' },
        { key: 'Sharpen (blur)', value: 'blur' }, { key: 'Shake', value: 'shake' }, { key: 'Pulse (all the time)', value: 'pulse' },
        { key: 'Float (all the time)', value: 'float' }, { key: 'Wave (all the time)', value: 'wave' },
        { key: 'Swarm (all the time)', value: 'swarm' }, { key: 'Morph (all the time)', value: 'morph' }
      ]
    },
    when: {
      type: String,
      default: 'in-view',
      label: 'Starts',
      control: 'select',
      options: [
        { key: 'When scrolled to', value: 'in-view' }, { key: 'At once', value: 'load' },
        { key: 'When pointed at', value: 'hover' }, { key: 'Always (for decoration only)', value: 'always' }
      ]
    },
    duration: { type: Number, default: 800, label: 'How long (ms)', control: 'number', min: 100, max: 5000 },
    delay: { type: Number, default: 0, label: 'Waits first (ms)', control: 'number', min: 0, max: 5000 },
    stagger: { type: Number, default: 120, label: 'Each part after the one before (ms)', control: 'number', min: 0, max: 1000 },
    order: {
      type: String,
      default: 'first-to-last',
      label: 'In the order',
      control: 'select',
      options: [
        { key: 'First to last', value: 'first-to-last' }, { key: 'Last to first', value: 'last-to-first' },
        { key: 'From the middle', value: 'from-center' }, { key: 'Random', value: 'random' }
      ]
    },
    easing: {
      type: String,
      default: 'smooth',
      label: 'Feel',
      control: 'select',
      options: [
        { key: 'Smooth', value: 'smooth' }, { key: 'Gentle', value: 'gentle' }, { key: 'Springy', value: 'spring' },
        { key: 'Snappy', value: 'snappy' }, { key: 'Even (linear)', value: 'linear' }
      ]
    },
    intensity: { type: Number, default: 50, label: 'How much', control: 'number', min: 0, max: 100 },
    repeat: { type: Boolean, default: false, label: 'Again each time it is scrolled to' },
    loop: { type: Boolean, default: false, label: 'Again and again' }
  },
  data() {
    // still: as it is (before it runs, and when it cannot); waiting: ready (what comes in is out of sight, what
    // moves all the time is held); playing; done: in, and nothing moves. (Observers and timers are kept off
    // the reactive data: a browser will not observe through a proxy.)
    return { stage: 'still', held: false }
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
      return typeof document !== 'undefined' && (document.getElementById('receiver') ? document.getElementById('receiver').getAttribute('live') !== 'yes' : !!window.studio)
    },
    kind() {
      return EFFECTS.includes(this.effect) ? this.effect : 'rise'
    },
    // An effect that comes in, looped as one that goes on (a bounce that keeps bouncing, a spin that keeps turning)
    endless() {
      return !!this.loop && LOOPED.includes(this.kind)
    },
    continuous() {
      return ROUNDS.includes(this.kind) || this.endless
    },
    classes() {
      return ['vp-motion-effects--' + this.kind, {
        'vp-motion-effects--endless': this.endless,
        'vp-motion-effects--hides': !this.continuous && HIDDEN.includes(this.kind),
        'vp-motion-effects--on': this.stage === 'waiting' || this.stage === 'playing',
        'vp-motion-effects--playing': this.stage === 'playing',
        // what moves all the time stops with focus in it, and when tapped
        'vp-motion-effects--pausable': this.continuous && this.when !== 'hover' && !this.inStudio,
        'vp-motion-effects--held': this.held
      }]
    },
    style() {
      const ease = EASINGS[this.easing] || EASINGS.smooth
      const amount = Math.min(100, Math.max(0, Number(this.intensity ?? 50) || 0)) / 100
      return {
        '--vp-motion-effects-duration': Math.max(100, Number(this.duration) || 800) + 'ms',
        '--vp-motion-effects-ease': ease[0],
        '--vp-motion-effects-ease-round': ease[1],
        '--vp-motion-effects-amount': String(amount)
      }
    }
  },
  watch: {
    // a setting changed in the Props tab is seen at once
    $props: { deep: true, handler() { this.$nextTick(() => this.restart()) } }
  },
  mounted() {
    this.restart()
    if (typeof MutationObserver === 'function') {
      this.watcher = new MutationObserver(() => this.number())
      this.watcher.observe(this.$el, { childList: true })
    }
  },
  updated() {
    this.number()
  },
  beforeUnmount() {
    this.clear()
    this.sight?.disconnect()
    this.watcher?.disconnect()
  },
  methods: {
    say(key, own) {
      if (own) return own
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return String(words[key] ?? WORDS.en[key])
    },
    // nothing is put in it (only comments or blank text)
    empty() {
      const nodes = this.$slots.default ? this.$slots.default() : []
      const shows = list => list.some(node => {
        // (Vue's fragment and text nodes are these symbols; a comment is the third)
        if (node.type === Symbol.for('v-fgt')) return Array.isArray(node.children) && shows(node.children)
        if (node.type === Symbol.for('v-txt')) return String(node.children || '').trim() !== ''
        if (typeof node.type === 'symbol') return false
        return true
      })
      return !shows(nodes)
    },
    // the place in the line each part has: 0 goes first
    ranks(n) {
      const order = this.order
      if (order === 'last-to-first') return [...Array(n).keys()].map(i => n - 1 - i)
      if (order === 'from-center') return [...Array(n).keys()].map(i => Math.floor(Math.abs(i - (n - 1) / 2)))
      if (order === 'random') {
        const ranks = []
        ;[...Array(n).keys()].sort((a, b) => seeded(a, n) - seeded(b, n)).forEach((i, place) => { ranks[i] = place })
        return ranks
      }
      return [...Array(n).keys()]
    },
    // each part its turn (and a swarm its own path), written on the part itself
    number() {
      const items = [...(this.$el?.children || [])]
      const ranks = this.ranks(items.length)
      const wait = Math.max(0, Number(this.delay) || 0), step = Math.max(0, Number(this.stagger) || 0)
      let last = 0
      items.forEach((el, i) => {
        const at = wait + ranks[i] * step
        last = Math.max(last, at)
        const set = (name, value) => { if (el.style.getPropertyValue(name) !== String(value)) el.style.setProperty(name, String(value)) }
        set('--vp-motion-effects-i', i)
        set('--vp-motion-effects-delay', at + 'ms')
        set('--vp-motion-effects-r', seeded(i, 0).toFixed(3))
        for (let k = 1; k <= 3; k++) {
          set('--vp-motion-effects-x' + k, (seeded(i, k * 2) * 2 - 1).toFixed(3))
          set('--vp-motion-effects-y' + k, (seeded(i, k * 2 + 1) * 2 - 1).toFixed(3))
        }
      })
      this.last = last
    },
    clear() {
      clearTimeout(this.ending)
      clearTimeout(this.resting)
      this.ending = this.resting = null
    },
    // starts again from what is set now
    restart() {
      this.clear()
      this.sight?.disconnect()
      this.sight = null
      this.number()
      const calm = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
      this.editing = this.inStudio
      this.seen = false
      this.held = false
      if (calm) { this.stage = 'still'; return }
      if (this.editing || this.when === 'load' || this.when === 'always') { this.seen = true; this.play(); return }
      if (this.when === 'hover') { this.stage = this.continuous ? 'waiting' : 'still'; return }
      // when scrolled to; with no way to watch, at once
      if (typeof IntersectionObserver !== 'function') { this.seen = true; this.play(); return }
      // already on the screen (at the top of the page): it comes in now, rather than vanish until the observer says so
      if (this.onScreen()) { this.seen = true; this.play() } else this.stage = 'waiting'
      this.sight = new IntersectionObserver(([entry]) => this.onSight(entry), { threshold: 0.15, rootMargin: '0px 0px -8% 0px' })
      this.sight.observe(this.$el)
    },
    onScreen() {
      const box = this.$el?.getBoundingClientRect?.()
      const high = typeof window !== 'undefined' ? window.innerHeight || 0 : 0
      return !!box && box.height > 0 && high > 0 && box.bottom > 0 && box.top < high * 0.92
    },
    onSight(entry) {
      if (!entry) return
      if (entry.isIntersecting) {
        this.seen = true
        if (this.continuous) { this.stage = 'playing'; return }
        if (this.stage === 'waiting' || (this.loop && this.stage !== 'playing' && !this.resting)) this.play()
        if (!this.repeat && !this.loop) this.sight?.disconnect()
        return
      }
      this.seen = false
      if (this.continuous) { if (this.stage === 'playing') this.stage = 'waiting'; return }
      if (this.repeat) { this.clear(); this.stage = 'waiting' }
    },
    // what comes in, comes in (and again after a rest when it is to); what moves all the time, moves
    play() {
      if (this.continuous) { this.stage = 'playing'; return }
      this.clear()
      this.stage = 'playing'
      const length = (this.last || 0) + Math.max(100, Number(this.duration) || 800) + 50
      this.ending = setTimeout(() => {
        this.ending = null
        this.stage = 'done'
        if (!(this.editing || this.loop || this.when === 'always')) return
        this.resting = setTimeout(() => {
          this.resting = null
          if (this.seen) this.play()
        }, this.editing ? STUDIO_REST : REST)
      }, length)
    },
    // a click or tap stops what moves all the time, and starts it again; one on a link, a button or a field is theirs
    tap(event) {
      if (!this.continuous || this.when === 'hover' || this.editing) return
      if (event?.target?.closest?.('a, button, input, select, textarea, label, summary, [role="button"]')) return
      this.held = !this.held
    },
    enter() {
      if (this.when !== 'hover' || this.editing || this.stage === 'playing' || !this.$el) return
      if (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches) return
      this.seen = true
      this.play()
    },
    leave(event) {
      if (this.when !== 'hover' || this.editing) return
      if (event?.relatedTarget && this.$el?.contains?.(event.relatedTarget)) return
      this.seen = false
      if (this.continuous && this.stage === 'playing') this.stage = 'waiting'
    }
  }
}
<\/script>
<style>
.vp-motion-effects {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
}

/* what moves sideways stays inside it, so it cannot push past the page's edge on a phone */
.vp-motion-effects--swarm,
.vp-motion-effects--shake { overflow-x: clip; }

/* Samples in the editor while nothing is put in it */
.vp-motion-effects__sample {
  display: inline-grid;
  place-items: center;
  box-sizing: border-box;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: var(--vp-radius, 12px);
  background: color-mix(in srgb, var(--vp-primary, #2563eb) 85%, #fff);
  color: var(--vp-primary-contrast, #fff);
  font-weight: 700;
  font-size: 1.25rem;
  vertical-align: middle;
}
.vp-motion-effects__sample:nth-child(4n + 2) { background: color-mix(in srgb, var(--vp-primary, #2563eb) 65%, #fff); }
.vp-motion-effects__sample:nth-child(4n + 3) { background: color-mix(in srgb, var(--vp-primary, #2563eb) 45%, #fff); }
.vp-motion-effects__sample:nth-child(4n) { background: color-mix(in srgb, var(--vp-primary, #2563eb) 100%, #000 20%); }

/* Ready: each part its time, its feel and its turn; moving: told to the browser only while it moves */
.vp-motion-effects--on > * {
  animation-duration: var(--vp-motion-effects-duration, 800ms);
  animation-timing-function: var(--vp-motion-effects-ease, ease);
  animation-delay: var(--vp-motion-effects-delay, 0ms);
  animation-fill-mode: both;
}
.vp-motion-effects--playing > * { will-change: transform, opacity; }
.vp-motion-effects--playing.vp-motion-effects--blur > * { will-change: filter, opacity; }
.vp-motion-effects--playing.vp-motion-effects--morph > * { will-change: transform, border-radius; }
.vp-motion-effects--on:not(.vp-motion-effects--playing) > * { animation-play-state: paused; }
/* what moves all the time stops while held (tapped) or while something in it has focus */
.vp-motion-effects--held > *,
.vp-motion-effects--pausable:focus-within > * { animation-play-state: paused !important; }
/* what comes in waits out of sight (only once it is sure to come in) */
.vp-motion-effects--on.vp-motion-effects--hides:not(.vp-motion-effects--playing) > * { opacity: 0; }

/* Coming in */
.vp-motion-effects--playing.vp-motion-effects--fade > * { animation-name: vp-motion-effects-fade; }
.vp-motion-effects--playing.vp-motion-effects--rise > * { animation-name: vp-motion-effects-rise; }
.vp-motion-effects--playing.vp-motion-effects--zoom > * { animation-name: vp-motion-effects-zoom; }
.vp-motion-effects--playing.vp-motion-effects--bounce > * { animation-name: vp-motion-effects-bounce; animation-timing-function: ease-out; animation-duration: calc(var(--vp-motion-effects-duration, 800ms) * 1.4); }
.vp-motion-effects--playing.vp-motion-effects--spin > * { animation-name: vp-motion-effects-spin; }
.vp-motion-effects--playing.vp-motion-effects--flip > * { animation-name: vp-motion-effects-flip; transform-origin: 50% 50%; }
.vp-motion-effects--playing.vp-motion-effects--blur > * { animation-name: vp-motion-effects-blur; }
.vp-motion-effects--playing.vp-motion-effects--shake > * { animation-name: vp-motion-effects-shake; animation-timing-function: ease-in-out; }

/* Going on all the time (held while out of sight) */
.vp-motion-effects--on.vp-motion-effects--pulse > *,
.vp-motion-effects--on.vp-motion-effects--float > *,
.vp-motion-effects--on.vp-motion-effects--wave > *,
.vp-motion-effects--on.vp-motion-effects--swarm > *,
.vp-motion-effects--on.vp-motion-effects--morph > *,
.vp-motion-effects--on.vp-motion-effects--endless > * {
  animation-iteration-count: infinite;
  animation-timing-function: var(--vp-motion-effects-ease-round, ease-in-out);
}
.vp-motion-effects--on.vp-motion-effects--pulse > * { animation-name: vp-motion-effects-pulse; animation-duration: calc(var(--vp-motion-effects-duration, 800ms) * 2); }
.vp-motion-effects--on.vp-motion-effects--wave > * { animation-name: vp-motion-effects-wave; animation-duration: calc(var(--vp-motion-effects-duration, 800ms) * 2); }
/* float, swarm and morph: each part already somewhere in its round, so no two are alike */
.vp-motion-effects--on.vp-motion-effects--float > * {
  animation-name: vp-motion-effects-float;
  animation-duration: calc(var(--vp-motion-effects-duration, 800ms) * 4);
  animation-delay: calc(var(--vp-motion-effects-delay, 0ms) - var(--vp-motion-effects-r, 0) * var(--vp-motion-effects-duration, 800ms) * 4);
}
.vp-motion-effects--on.vp-motion-effects--swarm > * {
  animation-name: vp-motion-effects-swarm;
  animation-timing-function: ease-in-out;
  animation-duration: calc(var(--vp-motion-effects-duration, 800ms) * (6 + 4 * var(--vp-motion-effects-r, 0)));
  animation-delay: calc(var(--vp-motion-effects-delay, 0ms) - var(--vp-motion-effects-r, 0) * var(--vp-motion-effects-duration, 800ms) * 6);
}
.vp-motion-effects--on.vp-motion-effects--morph > * {
  overflow: hidden;
  animation-name: vp-motion-effects-morph;
  animation-duration: calc(var(--vp-motion-effects-duration, 800ms) * (8 + 2 * var(--vp-motion-effects-r, 0)));
  animation-delay: calc(var(--vp-motion-effects-delay, 0ms) - var(--vp-motion-effects-r, 0) * var(--vp-motion-effects-duration, 800ms) * 8);
}
.vp-motion-effects--on.vp-motion-effects--bounce.vp-motion-effects--endless > * { animation-name: vp-motion-effects-hop; animation-duration: calc(var(--vp-motion-effects-duration, 800ms) * 1.5); }
.vp-motion-effects--on.vp-motion-effects--spin.vp-motion-effects--endless > * { animation-name: vp-motion-effects-turn; animation-timing-function: linear; animation-duration: calc(var(--vp-motion-effects-duration, 800ms) * 10); }

@keyframes vp-motion-effects-fade { from { opacity: 0; } }
@keyframes vp-motion-effects-rise { from { opacity: 0; transform: translateY(calc(var(--vp-motion-effects-amount, 0.5) * 64px)); } }
@keyframes vp-motion-effects-zoom { from { opacity: 0; transform: scale(calc(1 - var(--vp-motion-effects-amount, 0.5) * 0.5)); } }
@keyframes vp-motion-effects-spin { from { opacity: 0; transform: rotate(calc(var(--vp-motion-effects-amount, 0.5) * -360deg)) scale(0.5); } }
@keyframes vp-motion-effects-flip {
  from { opacity: 0; transform: perspective(800px) rotateY(calc(var(--vp-motion-effects-amount, 0.5) * 160deg)); }
  60% { opacity: 1; }
}
@keyframes vp-motion-effects-blur { from { opacity: 0; filter: blur(calc(var(--vp-motion-effects-amount, 0.5) * 24px)); } }
@keyframes vp-motion-effects-bounce {
  0% { opacity: 0; transform: translateY(calc(var(--vp-motion-effects-amount, 0.5) * -96px)); }
  45% { opacity: 1; transform: translateY(0); }
  62% { transform: translateY(calc(var(--vp-motion-effects-amount, 0.5) * -32px)); }
  78% { transform: translateY(0); }
  90% { transform: translateY(calc(var(--vp-motion-effects-amount, 0.5) * -10px)); }
  100% { transform: translateY(0); }
}
@keyframes vp-motion-effects-shake {
  0%, 100% { transform: translateX(0); }
  15% { transform: translateX(calc(var(--vp-motion-effects-amount, 0.5) * -20px)) rotate(calc(var(--vp-motion-effects-amount, 0.5) * -3deg)); }
  30% { transform: translateX(calc(var(--vp-motion-effects-amount, 0.5) * 20px)) rotate(calc(var(--vp-motion-effects-amount, 0.5) * 3deg)); }
  45% { transform: translateX(calc(var(--vp-motion-effects-amount, 0.5) * -12px)) rotate(calc(var(--vp-motion-effects-amount, 0.5) * -2deg)); }
  60% { transform: translateX(calc(var(--vp-motion-effects-amount, 0.5) * 12px)) rotate(calc(var(--vp-motion-effects-amount, 0.5) * 2deg)); }
  75% { transform: translateX(calc(var(--vp-motion-effects-amount, 0.5) * -6px)); }
  90% { transform: translateX(calc(var(--vp-motion-effects-amount, 0.5) * 6px)); }
}
@keyframes vp-motion-effects-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: calc(1 - var(--vp-motion-effects-amount, 0.5) * 0.5); transform: scale(calc(1 + var(--vp-motion-effects-amount, 0.5) * 0.16)); }
}
@keyframes vp-motion-effects-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(calc(var(--vp-motion-effects-amount, 0.5) * -24px)); }
}
@keyframes vp-motion-effects-wave {
  0%, 50%, 100% { transform: translateY(0); }
  25% { transform: translateY(calc(var(--vp-motion-effects-amount, 0.5) * -28px)); }
}
@keyframes vp-motion-effects-swarm {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(calc(var(--vp-motion-effects-x1, 0) * var(--vp-motion-effects-amount, 0.5) * 48px), calc(var(--vp-motion-effects-y1, 0) * var(--vp-motion-effects-amount, 0.5) * 48px)) rotate(calc(var(--vp-motion-effects-x2, 0) * var(--vp-motion-effects-amount, 0.5) * 16deg)); }
  50% { transform: translate(calc(var(--vp-motion-effects-x2, 0) * var(--vp-motion-effects-amount, 0.5) * 48px), calc(var(--vp-motion-effects-y2, 0) * var(--vp-motion-effects-amount, 0.5) * 48px)) rotate(calc(var(--vp-motion-effects-y3, 0) * var(--vp-motion-effects-amount, 0.5) * 16deg)); }
  75% { transform: translate(calc(var(--vp-motion-effects-x3, 0) * var(--vp-motion-effects-amount, 0.5) * 48px), calc(var(--vp-motion-effects-y3, 0) * var(--vp-motion-effects-amount, 0.5) * 48px)) rotate(calc(var(--vp-motion-effects-x1, 0) * var(--vp-motion-effects-amount, 0.5) * 16deg)); }
}
@keyframes vp-motion-effects-morph {
  0%, 100% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; transform: scale(1) rotate(0deg); }
  33% { border-radius: 70% 30% 46% 54% / 30% 39% 61% 70%; transform: scale(calc(1 + var(--vp-motion-effects-amount, 0.5) * 0.08)) rotate(calc(var(--vp-motion-effects-amount, 0.5) * 10deg)); }
  66% { border-radius: 30% 70% 30% 70% / 60% 30% 70% 40%; transform: scale(calc(1 - var(--vp-motion-effects-amount, 0.5) * 0.06)) rotate(calc(var(--vp-motion-effects-amount, 0.5) * -8deg)); }
}
@keyframes vp-motion-effects-hop {
  0%, 50%, 72%, 100% { transform: translateY(0); }
  30% { transform: translateY(calc(var(--vp-motion-effects-amount, 0.5) * -40px)); }
  62% { transform: translateY(calc(var(--vp-motion-effects-amount, 0.5) * -12px)); }
}
@keyframes vp-motion-effects-turn { to { transform: rotate(360deg); } }

/* Less motion asked for: everything shown, nothing moves */
@media (prefers-reduced-motion: reduce) {
  .vp-motion-effects > * { animation: none !important; opacity: 1 !important; will-change: auto !important; }
}
</style>
`;export{e as default};