var e=`<template>
  <div
    class="vp-ring-carousel"
    :class="{ 'vp-ring-carousel--mirror': mirror, 'vp-ring-carousel--dragging': dragging }"
    :style="style"
    role="region"
    aria-roledescription="carousel"
    :aria-label="label || say('carousel')"
    @pointerenter="hovered = true"
    @pointerleave="hovered = false"
    @focusin="hovered = true"
    @focusout="hovered = false"
  >
    <div
      class="vp-ring-carousel__stage"
      tabindex="0"
      @keydown.left.prevent="step(-1)"
      @keydown.right.prevent="step(1)"
      @pointerdown="down"
    >
      <div class="vp-ring-carousel__ring" :style="ringStyle">
        <figure
          v-for="(item, index) in list"
          :key="index"
          class="vp-ring-carousel__item"
          :class="{ 'vp-ring-carousel__item--front': index === front }"
          :style="itemStyle(index)"
          role="group"
          aria-roledescription="slide"
          :aria-label="say('slide').replace('{n}', index + 1).replace('{count}', list.length)"
          :aria-hidden="index === front ? undefined : 'true'"
          @click="pick(index, $event)"
        >
          <img v-if="item.image" class="vp-ring-carousel__image" :src="address(item.image) || undefined" :style="held(item.image)" :alt="item.title || ''" loading="lazy" decoding="async" draggable="false">
          <span v-else class="vp-ring-carousel__blank" :style="{ '--vp-ring-carousel-hue': (index * 47) % 360 }"></span>
          <figcaption v-if="item.title || item.text" class="vp-ring-carousel__caption">
            <strong v-if="item.title">{{ item.title }}</strong>
            <span v-if="item.text">{{ item.text }}</span>
          </figcaption>
        </figure>
      </div>
    </div>
    <div v-if="arrows && list.length > 1" class="vp-ring-carousel__nav">
      <button type="button" class="vp-ring-carousel__arrow" :aria-label="say('previous')" @click="step(-1)">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
      </button>
      <span class="vp-ring-carousel__count" aria-live="polite">{{ front + 1 }} / {{ list.length }}</span>
      <button type="button" class="vp-ring-carousel__arrow" :aria-label="say('next')" @click="step(1)">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
      </button>
    </div>
  </div>
</template>
<script>
// Pictures standing in a ring, seen from the front: the ring turns to the next by itself, with the arrows or
// the arrow keys, by dragging it round (or swiping), or by clicking one at the side. The one in front is
// clear, its caption under it; a click on it follows its link. The ring is seen from a little above or below
// as asked, and can stand on a floor that mirrors it.
// (A picture picked in the Studio is the name of a variable that holds it, like --image-boat: it is shown
// through that variable at once, and its address is read from it when the page is alive. An address is used as it is.)

// The words it says itself, in the site's language (App.vue's head says it: \`htmlAttrs: { lang }\`).
const WORDS = {
  en: { carousel: 'Pictures', slide: '{n} of {count}', previous: 'Previous', next: 'Next' },
  nb: { carousel: 'Bilder', slide: '{n} av {count}', previous: 'Forrige', next: 'Neste' },
  sv: { carousel: 'Bilder', slide: '{n} av {count}', previous: 'Föregående', next: 'Nästa' },
  da: { carousel: 'Billeder', slide: '{n} af {count}', previous: 'Forrige', next: 'Næste' },
  fi: { carousel: 'Kuvat', slide: '{n}/{count}', previous: 'Edellinen', next: 'Seuraava' },
  de: { carousel: 'Bilder', slide: '{n} von {count}', previous: 'Zurück', next: 'Weiter' },
  fr: { carousel: 'Images', slide: '{n} sur {count}', previous: 'Précédent', next: 'Suivant' },
  es: { carousel: 'Imágenes', slide: '{n} de {count}', previous: 'Anterior', next: 'Siguiente' },
  it: { carousel: 'Immagini', slide: '{n} di {count}', previous: 'Precedente', next: 'Successivo' },
  nl: { carousel: 'Afbeeldingen', slide: '{n} van {count}', previous: 'Vorige', next: 'Volgende' },
  pt: { carousel: 'Imagens', slide: '{n} de {count}', previous: 'Anterior', next: 'Seguinte' },
  pl: { carousel: 'Zdjęcia', slide: '{n} z {count}', previous: 'Poprzedni', next: 'Następny' },
  zh: { carousel: '图片', slide: '第 {n} 张，共 {count} 张', previous: '上一张', next: '下一张' },
  ja: { carousel: '画像', slide: '{count} 枚中 {n} 枚目', previous: '前へ', next: '次へ' }
}

export default {
  props: {
    items: {
      type: Array,
      default: () => [
        { image: '', title: 'Mountains', text: 'Where the air is thin', href: '' },
        { image: '', title: 'Coast', text: 'Salt and wind', href: '' },
        { image: '', title: 'Forest', text: 'Green and still', href: '' },
        { image: '', title: 'City', text: 'Lights at night', href: '' },
        { image: '', title: 'Desert', text: 'Sand to the edge', href: '' },
        { image: '', title: 'Islands', text: 'Out in the blue', href: '' },
        { image: '', title: 'Lakes', text: 'Clear and cold', href: '' }
      ],
      label: 'Pictures',
      control: 'list',
      fields: [{ key: 'image', label: 'Picture', control: 'media' }, { key: 'title', label: 'Title' }, { key: 'text', label: 'Text' }, { key: 'href', label: 'Link', placeholder: '/page or https://…' }]
    },
    width: { type: String, default: '', label: 'Width of each', control: 'slider', unit: 'px', min: 140, max: 420 },
    shape: {
      type: String,
      default: 'portrait',
      label: 'Shape',
      options: [{ key: 'Upright', value: 'portrait' }, { key: 'Square', value: 'square' }, { key: 'Wide', value: 'landscape' }]
    },
    angle: { type: String, default: '', label: 'Seen from above', control: 'slider', unit: 'deg', min: -20, max: 30 },
    gap: { type: String, default: '', label: 'Space between', control: 'slider', unit: 'px', min: 0, max: 120 },
    autoplay: { type: Boolean, default: true, label: 'Turns by itself' },
    every: { type: String, default: '', label: 'Every', control: 'slider', unit: 's', min: 2, max: 12 },
    arrows: { type: Boolean, default: true, label: 'Arrows' },
    mirror: { type: Boolean, default: false, label: 'Mirrored in the floor' },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 40 },
    label: { type: String, default: '', label: 'Described', placeholder: 'What the pictures are, for screen readers' }
  },
  data() {
    return { turn: 0, drag: 0, dragging: false, hovered: false, room: 0, found: {} }
  },
  computed: {
    list() {
      return Array.isArray(this.items) ? this.items : []
    },
    count() {
      return Math.max(1, this.list.length)
    },
    size() {
      const wanted = parseFloat(this.width) || 240
      return this.room ? Math.max(110, Math.min(wanted, this.room * 0.5)) : wanted
    },
    tall() {
      return this.size * ({ portrait: 4 / 3, square: 1, landscape: 0.66 }[this.shape] || 4 / 3)
    },
    apart() {
      return 360 / this.count
    },
    // far enough out for the pictures to stand side by side, with the space between
    reach() {
      const space = this.gap === '' ? 24 : parseFloat(this.gap) || 0
      return this.count < 3 ? this.size : Math.round((this.size + space) / 2 / Math.tan(Math.PI / this.count))
    },
    front() {
      return ((Math.round(-this.turn) % this.count) + this.count) % this.count
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
        '--vp-ring-carousel-width': this.size + 'px',
        '--vp-ring-carousel-height': Math.round(this.tall) + 'px',
        '--vp-ring-carousel-reach': this.reach + 'px',
        '--vp-ring-carousel-angle': this.angle === '' ? '-8deg' : (-parseFloat(this.angle) || 0) + 'deg',
        '--vp-ring-carousel-radius': this.radius || undefined
      }
    },
    ringStyle() {
      return { transform: 'translateZ(calc(var(--vp-ring-carousel-reach) * -1)) rotateX(var(--vp-ring-carousel-angle)) rotateY(' + ((this.turn + this.drag) * this.apart) + 'deg)' }
    }
  },
  watch: {
    items: {
      deep: true,
      handler() {
        this.find()
      }
    },
    autoplay() {
      this.time()
    },
    every() {
      this.time()
    }
  },
  mounted() {
    this.measure()
    this.find()
    this.time()
    if (typeof ResizeObserver !== 'undefined' && this.$el && this.$el.nodeType === 1) {
      this.watcher = new ResizeObserver(() => this.measure())
      this.watcher.observe(this.$el)
    }
  },
  beforeUnmount() {
    clearInterval(this.timer)
    if (this.watcher) this.watcher.disconnect()
    this.up()
  },
  methods: {
    say(key) {
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return words[key] ?? WORDS.en[key]
    },
    itemStyle(index) {
      const away = Math.abs((((index + this.turn + this.drag) % this.count) + this.count + this.count / 2) % this.count - this.count / 2)
      return {
        transform: 'rotateY(' + (index * this.apart) + 'deg) translateZ(var(--vp-ring-carousel-reach))',
        opacity: Math.max(0.25, 1 - away * 0.18).toFixed(2),
        filter: away > 0.5 ? 'saturate(' + Math.max(0.3, 1 - away * 0.2).toFixed(2) + ')' : undefined
      }
    },
    step(by) {
      this.turn = Math.round(this.turn) - by
      this.time()
    },
    // a click on one at the side turns it to the front; on the one in front, its link is followed
    pick(index, event) {
      if (this.moved) return
      if (index !== this.front) {
        let by = index - this.front
        if (by > this.count / 2) by -= this.count
        if (by < -this.count / 2) by += this.count
        this.step(by)
        return
      }
      const href = this.list[index] && this.list[index].href
      if (!href) return
      const router = this.$router
      if (router && /^\\/(?!\\/)/.test(href) && !(event.metaKey || event.ctrlKey || event.shiftKey)) router.push(href)
      else if (typeof window !== 'undefined') window.location.assign(href)
    },
    down(event) {
      if (event.button) return
      this.startX = event.clientX
      this.moved = false
      this.dragging = true
      this.onMove = e => {
        const dx = e.clientX - this.startX
        if (Math.abs(dx) > 4) this.moved = true
        this.drag = dx / (this.size + 40)
      }
      this.onUp = () => this.up()
      window.addEventListener('pointermove', this.onMove)
      window.addEventListener('pointerup', this.onUp)
      window.addEventListener('pointercancel', this.onUp)
    },
    up() {
      if (typeof window === 'undefined' || !this.onMove) return
      window.removeEventListener('pointermove', this.onMove)
      window.removeEventListener('pointerup', this.onUp)
      window.removeEventListener('pointercancel', this.onUp)
      this.onMove = null
      this.turn = Math.round(this.turn + this.drag)
      this.drag = 0
      this.dragging = false
      this.time()
      // (the click that ends a drag is not a pick)
      setTimeout(() => { this.moved = false }, 0)
    },
    time() {
      clearInterval(this.timer)
      if (!this.autoplay || typeof window === 'undefined' || this.list.length < 2) return
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const seconds = Math.max(2, parseFloat(this.every) || 4)
      this.timer = setInterval(() => {
        if (this.hovered || this.dragging || (typeof document !== 'undefined' && document.hidden)) return
        this.turn = Math.round(this.turn) - 1
      }, seconds * 1000)
    },
    measure() {
      if (this.$el && this.$el.nodeType === 1) this.room = this.$el.clientWidth
    },
    address(value) {
      return /^--/.test(value) ? this.found[value] || '' : value || ''
    },
    held(value) {
      return /^--/.test(value) && !this.found[value] ? { content: 'var(' + value + ')' } : undefined
    },
    find() {
      if (!this.$el || this.$el.nodeType !== 1) return
      const found = {}
      const style = getComputedStyle(this.$el)
      for (const item of this.list) {
        if (!item || !/^--/.test(item.image)) continue
        const address = /^\\s*url\\(\\s*(['"]?)(.*?)\\1\\s*\\)\\s*$/.exec(style.getPropertyValue(item.image))
        if (address) found[item.image] = address[2]
      }
      this.found = found
    }
  }
}
<\/script>
<style>
.vp-ring-carousel {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  padding: 1.5rem 0;
}
.vp-ring-carousel__stage {
  position: relative;
  height: calc(var(--vp-ring-carousel-height, 320px) * 1.35 + 3.5rem);
  perspective: calc(var(--vp-ring-carousel-reach, 400px) * 3.2 + 600px);
  perspective-origin: 50% 45%;
  cursor: grab;
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
  outline: none;
}
.vp-ring-carousel__stage:focus-visible { box-shadow: inset 0 0 0 2px var(--vp-primary, #2563eb); border-radius: 12px; }
.vp-ring-carousel--dragging .vp-ring-carousel__stage { cursor: grabbing; }
.vp-ring-carousel__ring {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0;
  height: 0;
  transform-style: preserve-3d;
  transition: transform 900ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.vp-ring-carousel--dragging .vp-ring-carousel__ring { transition: none; }
.vp-ring-carousel__item {
  position: absolute;
  left: calc(var(--vp-ring-carousel-width, 240px) / -2);
  top: calc(var(--vp-ring-carousel-height, 320px) / -2);
  width: var(--vp-ring-carousel-width, 240px);
  height: var(--vp-ring-carousel-height, 320px);
  margin: 0;
  border-radius: var(--vp-ring-carousel-radius, var(--vp-radius, 16px));
  overflow: visible;
  transition: opacity 600ms ease, filter 600ms ease;
  cursor: pointer;
}
.vp-ring-carousel--mirror .vp-ring-carousel__image,
.vp-ring-carousel--mirror .vp-ring-carousel__blank {
  -webkit-box-reflect: below 10px linear-gradient(transparent 60%, rgba(0, 0, 0, 0.3));
}
.vp-ring-carousel__image,
.vp-ring-carousel__blank {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
  box-shadow: 0 24px 50px -24px color-mix(in srgb, var(--vp-text, #0f172a) 55%, transparent);
  pointer-events: none;
}
.vp-ring-carousel__blank {
  background:
    radial-gradient(circle at 30% 25%, hsl(calc(var(--vp-ring-carousel-hue, 0) + 40) 90% 75% / 0.9), transparent 55%),
    linear-gradient(160deg, hsl(var(--vp-ring-carousel-hue, 0) 70% 55%), hsl(calc(var(--vp-ring-carousel-hue, 0) + 70) 70% 35%));
}
.vp-ring-carousel__caption {
  position: absolute;
  left: 0;
  right: 0;
  top: calc(100% + 0.9rem);
  display: grid;
  gap: 0.15rem;
  text-align: center;
  opacity: 0;
  transform: translateY(-6px);
  transition: opacity 400ms ease, transform 400ms ease;
}
.vp-ring-carousel--mirror .vp-ring-carousel__caption { top: auto; bottom: 1rem; padding: 0 0.75rem; color: #fff; text-shadow: 0 1px 8px rgba(0, 0, 0, 0.6); }
.vp-ring-carousel__item--front .vp-ring-carousel__caption { opacity: 1; transform: none; }
.vp-ring-carousel__caption strong { font-family: var(--vp-font-heading, inherit); font-size: 1.05em; }
.vp-ring-carousel__caption span { font-size: 0.9em; opacity: 0.75; }
.vp-ring-carousel__nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.5rem;
}
.vp-ring-carousel__arrow {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  border: 1px solid var(--vp-border, rgba(127, 127, 127, 0.3));
  border-radius: 50%;
  background: var(--vp-surface, #fff);
  color: var(--vp-text, inherit);
  cursor: pointer;
  transition: border-color 150ms ease, transform 150ms ease;
}
.vp-ring-carousel__arrow:hover { border-color: var(--vp-primary, #2563eb); }
.vp-ring-carousel__arrow:active { transform: scale(0.94); }
.vp-ring-carousel__arrow:focus-visible { outline: 2px solid var(--vp-primary, #2563eb); outline-offset: 2px; }
.vp-ring-carousel__arrow svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.vp-ring-carousel__count { min-width: 3.5em; text-align: center; font-variant-numeric: tabular-nums; opacity: 0.7; font-size: 0.9em; }
@media (prefers-reduced-motion: reduce) {
  .vp-ring-carousel__ring { transition: none; }
}
</style>
`;export{e as default};