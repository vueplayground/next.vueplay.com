var e=`<template>
  <div class="vp-marquee" :class="classes" :style="style" role="group" :aria-label="label || undefined" @click="tap">
    <div class="vp-marquee__track" :style="{ '--vp-marquee-copies': copies }">
      <div v-for="n in copies" :key="n" class="vp-marquee__group" :aria-hidden="n > 1 ? 'true' : undefined" :inert="n > 1 ? '' : undefined">
        <slot />
      </div>
    </div>
    <button v-if="stopButton" type="button" class="vp-marquee__stop" :aria-label="say(stopped ? 'play' : 'pause')" :title="say(stopped ? 'play' : 'pause')" @click.stop="stopped = !stopped">
      <svg v-if="stopped" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
      <svg v-else viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M7 5h3v14H7zM14 5h3v14h-3z" fill="currentColor" /></svg>
    </button>
  </div>
</template>
<script>
// What is put in it (logos, words, cards, pictures) moves along in a row that never ends: it is shown again as
// often as the width needs, so there is never a gap. It goes left or right, waits while it is pointed at if
// asked, and fades out at its edges. It stands still for those who ask their device for less motion. A click or a
// tap on it (not on a link or button in it) stops it and starts it again, so it can be stopped on a phone too,
// and a small button can say so.

// The words it says itself, in the site's language (App.vue's head says it: \`htmlAttrs: { lang }\`)
const WORDS = {
  en: { pause: 'Pause the moving row', play: 'Play the moving row' },
  nb: { pause: 'Sett raden på pause', play: 'Spill av raden' },
  sv: { pause: 'Pausa raden', play: 'Spela upp raden' },
  da: { pause: 'Sæt rækken på pause', play: 'Afspil rækken' },
  fi: { pause: 'Keskeytä liikkuva rivi', play: 'Toista liikkuva rivi' },
  de: { pause: 'Laufende Reihe anhalten', play: 'Laufende Reihe abspielen' },
  fr: { pause: 'Mettre en pause le défilement', play: 'Relancer le défilement' },
  es: { pause: 'Pausar la fila en movimiento', play: 'Reanudar la fila en movimiento' },
  it: { pause: 'Metti in pausa lo scorrimento', play: 'Riprendi lo scorrimento' },
  nl: { pause: 'Bewegende rij pauzeren', play: 'Bewegende rij afspelen' },
  pt: { pause: 'Pausar a fila em movimento', play: 'Retomar a fila em movimento' },
  pl: { pause: 'Wstrzymaj przewijanie', play: 'Wznów przewijanie' },
  zh: { pause: '暂停滚动', play: '继续滚动' },
  ja: { pause: 'スクロールを一時停止', play: 'スクロールを再開' }
}

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
    label: { type: String, default: '', label: 'What it shows', placeholder: 'For screen readers' },
    stopButton: { type: Boolean, default: false, label: 'A button to stop it' }
  },
  data() {
    // (the observer is kept off the reactive data: a browser will not observe through a proxy)
    return { copies: 2, stopped: false }
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
    classes() {
      return ['vp-marquee--' + this.direction, 'vp-marquee--' + this.align, { 'vp-marquee--pause': this.pause, 'vp-marquee--fade': this.fade, 'vp-marquee--stopped': this.stopped }]
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
    say(key) {
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return String(words[key] ?? WORDS.en[key])
    },
    // a click or tap on the row stops it or starts it again; one on a link, a button or a field in it is theirs
    tap(event) {
      const target = event?.target
      if (target?.closest?.('a, button, input, select, textarea, label, summary, [role="button"]')) return
      this.stopped = !this.stopped
    },
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
.vp-marquee--stopped .vp-marquee__track { animation-play-state: paused; }
.vp-marquee__stop {
  position: absolute;
  right: 6px;
  bottom: 6px;
  z-index: 1;
  display: inline-grid;
  place-items: center;
  width: 28px;
  height: 28px;
  margin: 0;
  padding: 0;
  border: 1px solid var(--vp-border, rgba(127, 127, 127, 0.28));
  border-radius: 999px;
  background: var(--vp-background, #fff);
  color: var(--vp-text, #111827);
  cursor: pointer;
  opacity: 0.8;
}
/* clear of the faded edge, where it would fade out with the row */
.vp-marquee--fade .vp-marquee__stop { right: calc(10% + 4px); }
.vp-marquee__stop:hover { opacity: 1; }
.vp-marquee__stop:focus-visible { outline: 2px solid var(--vp-primary, #2563eb); outline-offset: 2px; opacity: 1; }
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
  .vp-marquee__stop { display: none; }
}
</style>
`;export{e as default};