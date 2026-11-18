var e=`<template>
  <div
    class="vp-flip-card"
    :class="['vp-flip-card--' + turn, 'vp-flip-card--' + direction, 'vp-flip-card--' + look, { 'vp-flip-card--over': over }]"
    :style="style"
    :tabindex="turn === 'click' ? 0 : undefined"
    :role="turn === 'click' ? 'button' : undefined"
    :aria-pressed="turn === 'click' ? String(over) : undefined"
    @click="click"
    @keydown.enter.self.prevent="flip"
    @keydown.space.self.prevent="flip"
    @pointerenter="point(true, $event)"
    @pointerleave="point(false, $event)"
  >
    <div class="vp-flip-card__inner">
      <div class="vp-flip-card__face vp-flip-card__front" :aria-hidden="over ? 'true' : undefined">
        <slot><p class="vp-flip-card__hint">{{ say(turn === 'click' ? 'click' : 'hover') }}</p></slot>
      </div>
      <div class="vp-flip-card__face vp-flip-card__back" :aria-hidden="over ? undefined : 'true'">
        <img v-if="backImage" class="vp-flip-card__image" :src="picture || undefined" :style="held" alt="" loading="lazy" decoding="async">
        <strong v-if="backTitle" class="vp-flip-card__title">{{ backTitle }}</strong>
        <p v-if="backText" class="vp-flip-card__text">{{ backText }}</p>
        <a v-if="buttonText" class="vp-flip-card__button" :href="href || '#'" :tabindex="over ? undefined : -1" @click="go">{{ buttonText }}</a>
      </div>
    </div>
  </div>
</template>
<script>
// A card with two sides that turns over: on hover (a tap on a phone), on a click, or by itself now and then.
// The front is whatever is put in it; the back is a title, a few lines, a picture and a button. Both sides are
// as tall as the taller one. While editing, "Show the back" turns it so the back can be seen.
// (A picture picked in the Studio is the name of a variable that holds it, like --image-boat: it is shown
// through that variable at once, and its address is read from it when the page is alive. An address is used as it is.)

// The words it says itself, in the site's language (App.vue's head says it: \`htmlAttrs: { lang }\`).
const WORDS = {
  en: { hover: 'Point at me to turn me over', click: 'Click to turn me over' },
  nb: { hover: 'Pek på meg for å snu meg', click: 'Klikk for å snu meg' },
  sv: { hover: 'Peka på mig för att vända mig', click: 'Klicka för att vända mig' },
  da: { hover: 'Peg på mig for at vende mig', click: 'Klik for at vende mig' },
  fi: { hover: 'Osoita minua kääntääksesi minut', click: 'Napsauta kääntääksesi minut' },
  de: { hover: 'Zeig auf mich, um mich umzudrehen', click: 'Klick, um mich umzudrehen' },
  fr: { hover: 'Pointez-moi pour me retourner', click: 'Cliquez pour me retourner' },
  es: { hover: 'Señálame para darme la vuelta', click: 'Haz clic para darme la vuelta' },
  it: { hover: 'Puntami per girarmi', click: 'Clicca per girarmi' },
  nl: { hover: 'Wijs me aan om me om te draaien', click: 'Klik om me om te draaien' },
  pt: { hover: 'Aponte para mim para me virar', click: 'Clique para me virar' },
  pl: { hover: 'Wskaż mnie, aby mnie odwrócić', click: 'Kliknij, aby mnie odwrócić' },
  zh: { hover: '指向我即可翻转', click: '点击翻转' },
  ja: { hover: 'ポインターを合わせると裏返ります', click: 'クリックで裏返ります' }
}

export default {
  props: {
    turn: {
      type: String,
      default: 'hover',
      label: 'Turns over',
      options: [{ key: 'When pointed at', value: 'hover' }, { key: 'On a click', value: 'click' }, { key: 'By itself', value: 'auto' }]
    },
    direction: {
      type: String,
      default: 'sideways',
      label: 'Turns',
      options: [{ key: 'Sideways', value: 'sideways' }, { key: 'Upwards', value: 'upwards' }]
    },
    showBack: { type: Boolean, default: false, label: 'Show the back' },
    every: { type: String, default: '', label: 'By itself every', control: 'slider', unit: 's', min: 2, max: 20 },
    look: {
      type: String,
      default: 'shadow',
      label: 'Look',
      options: [{ key: 'Shadow', value: 'shadow' }, { key: 'Outline', value: 'outline' }, { key: 'Filled', value: 'filled' }, { key: 'Gradient back', value: 'gradient' }]
    },
    backTitle: { type: String, default: 'The other side', label: 'Back: title' },
    backText: { type: String, default: 'Write here what shows when the card turns over.', label: 'Back: text', control: 'textarea' },
    backImage: { type: String, default: '', label: 'Back: picture', control: 'media' },
    buttonText: { type: String, default: '', label: 'Back: button' },
    href: { type: String, default: '', label: 'Button link', placeholder: '/page, #anchor or https://…' },
    height: { type: String, default: '', label: 'Least height', control: 'slider', unit: 'px', min: 120, max: 600 },
    padding: { type: String, default: '', label: 'Room inside', control: 'slider', unit: 'px', min: 0, max: 80 },
    background: { type: String, default: '', label: 'Front background', control: 'color' },
    backBackground: { type: String, default: '', label: 'Back background', control: 'color' },
    color: { type: String, default: '', label: 'Text color', control: 'color' },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 48 }
  },
  data() {
    return { turned: false, pointed: false, found: '' }
  },
  computed: {
    over() {
      return this.showBack || this.turned || (this.turn === 'hover' && this.pointed)
    },
    named() {
      return /^--/.test(this.backImage)
    },
    picture() {
      return this.named ? this.found : this.backImage
    },
    held() {
      return this.named && !this.found ? { content: 'var(' + this.backImage + ')' } : undefined
    },
    lang() {
      let lang = ''
      try {
        const head = this.$root?.$options?.head
        lang = (typeof head === 'function' ? head.call(this.$root) : head)?.htmlAttrs?.lang || ''
      } catch (e) {}
      if (!lang && typeof document !== 'undefined') lang = document.documentElement.lang || ''
      return String(lang || 'en').toLowerCase()
    },
    style() {
      return {
        '--vp-flip-card-height': this.height || undefined,
        '--vp-flip-card-padding': this.padding || undefined,
        '--vp-flip-card-background': this.background || undefined,
        '--vp-flip-card-back': this.backBackground || undefined,
        '--vp-flip-card-color': this.color || undefined,
        '--vp-flip-card-radius': this.radius || undefined
      }
    }
  },
  watch: {
    backImage() {
      this.find()
    },
    turn() {
      this.turned = false
      this.time()
    },
    every() {
      this.time()
    }
  },
  mounted() {
    this.find()
    this.time()
  },
  beforeUnmount() {
    clearInterval(this.timer)
  },
  methods: {
    say(key) {
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return words[key] ?? WORDS.en[key]
    },
    flip() {
      this.turned = !this.turned
    },
    // a click turns a "click" card, and a "hover" one on a screen without a pointer that hovers (a phone)
    click(event) {
      if (event.target && event.target.closest && event.target.closest('a, button, input, select, textarea')) return
      if (this.turn === 'click') this.flip()
      else if (this.turn === 'hover' && event.pointerType && event.pointerType !== 'mouse') this.flip()
    },
    point(on, event) {
      if (event && event.pointerType && event.pointerType !== 'mouse') return
      this.pointed = on
    },
    time() {
      clearInterval(this.timer)
      if (this.turn !== 'auto' || typeof window === 'undefined') return
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const seconds = Math.max(2, parseFloat(this.every) || 5)
      this.timer = setInterval(() => {
        if (typeof document !== 'undefined' && document.hidden) return
        this.flip()
      }, seconds * 1000)
    },
    find() {
      const value = this.named && this.$el && this.$el.nodeType === 1 ? getComputedStyle(this.$el).getPropertyValue(this.backImage) : ''
      const address = /^\\s*url\\(\\s*(['"]?)(.*?)\\1\\s*\\)\\s*$/.exec(value)
      this.found = address ? address[2] : ''
    },
    // A page of the site is shown by the site's router where there is one, without loading the site again
    go(event) {
      if (!this.href) return event.preventDefault()
      const router = this.$router
      if (!router || !/^\\/(?!\\/)/.test(this.href)) return
      if (event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      event.preventDefault()
      router.push(this.href)
    }
  }
}
<\/script>
<style>
.vp-flip-card {
  box-sizing: border-box;
  min-width: 0;
  perspective: 1200px;
  color: var(--vp-flip-card-color, inherit);
}
.vp-flip-card--click { cursor: pointer; }
.vp-flip-card--click:focus-visible { outline: 2px solid var(--vp-primary, #2563eb); outline-offset: 4px; border-radius: var(--vp-flip-card-radius, var(--vp-radius, 16px)); }
/* both sides in the same place: the card is as tall as the taller */
.vp-flip-card__inner {
  display: grid;
  min-height: var(--vp-flip-card-height, 220px);
  transform-style: preserve-3d;
  transition: transform 700ms cubic-bezier(0.3, 1.4, 0.5, 1);
}
.vp-flip-card--sideways.vp-flip-card--over .vp-flip-card__inner { transform: rotateY(180deg); }
.vp-flip-card--upwards.vp-flip-card--over .vp-flip-card__inner { transform: rotateX(180deg); }
.vp-flip-card__face {
  grid-area: 1 / 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
  padding: var(--vp-flip-card-padding, clamp(1.25rem, 3vw, 1.75rem));
  text-align: center;
  border: 1px solid transparent;
  border-radius: var(--vp-flip-card-radius, var(--vp-radius, 16px));
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  overflow: hidden;
}
.vp-flip-card__front { background: var(--vp-flip-card-background, var(--vp-surface, #fff)); }
.vp-flip-card__back { background: var(--vp-flip-card-back, var(--vp-surface, #fff)); }
.vp-flip-card--sideways .vp-flip-card__back { transform: rotateY(180deg); }
.vp-flip-card--upwards .vp-flip-card__back { transform: rotateX(180deg); }
.vp-flip-card--shadow .vp-flip-card__face { box-shadow: 0 2px 4px color-mix(in srgb, var(--vp-text, #0f172a) 6%, transparent), 0 20px 44px -18px color-mix(in srgb, var(--vp-text, #0f172a) 28%, transparent); border-color: color-mix(in srgb, var(--vp-border, rgba(127, 127, 127, 0.28)) 60%, transparent); }
.vp-flip-card--outline .vp-flip-card__face { border-color: var(--vp-border, rgba(127, 127, 127, 0.28)); }
.vp-flip-card--filled .vp-flip-card__front { background: var(--vp-flip-card-background, color-mix(in srgb, var(--vp-text, rgb(127, 127, 127)) 8%, transparent)); }
.vp-flip-card--filled .vp-flip-card__back { background: var(--vp-flip-card-back, color-mix(in srgb, var(--vp-text, rgb(127, 127, 127)) 12%, transparent)); }
.vp-flip-card--gradient .vp-flip-card__front { border-color: var(--vp-border, rgba(127, 127, 127, 0.28)); }
.vp-flip-card--gradient .vp-flip-card__back {
  background: var(--vp-flip-card-back, linear-gradient(135deg, var(--vp-primary, #2563eb), color-mix(in oklch, var(--vp-primary, #2563eb) 55%, #a855f7)));
  color: var(--vp-flip-card-color, var(--vp-primary-contrast, #fff));
}
.vp-flip-card__hint { margin: 0; opacity: 0.6; font-size: 0.95em; }
.vp-flip-card__image { width: 64px; height: 64px; object-fit: cover; border-radius: 50%; }
.vp-flip-card__title { font-family: var(--vp-font-heading, inherit); font-size: 1.25em; line-height: 1.25; }
.vp-flip-card__text { margin: 0; line-height: 1.55; opacity: 0.85; }
.vp-flip-card__button {
  display: inline-flex;
  align-items: center;
  padding: 0.6em 1.2em;
  border-radius: 999px;
  background: var(--vp-primary, #2563eb);
  color: var(--vp-primary-contrast, #fff);
  font-weight: 600;
  text-decoration: none;
}
.vp-flip-card--gradient .vp-flip-card__button { background: var(--vp-primary-contrast, #fff); color: var(--vp-primary, #2563eb); }
.vp-flip-card__button:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) {
  .vp-flip-card__inner { transition: none; }
}
</style>
`;export{e as default};