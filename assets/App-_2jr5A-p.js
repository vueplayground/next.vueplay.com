var e=`<template>
  <div class="vp-slideshow" :style="style" role="group" aria-roledescription="carousel" :aria-label="say('slides', label)" @mouseenter="over = true" @mouseleave="over = false" @focusin="over = true" @focusout="over = false" @keydown.left="turn(-1)" @keydown.right="turn(1)" @touchstart.passive="touched" @touchend="swiped">
    <div class="vp-slideshow__track" :style="{ transform: 'translateX(' + -100 * shown + '%)' }">
      <div v-for="(slide, index) in slides" :key="index" class="vp-slideshow__slide" :class="'vp-slideshow__slide--' + place" :aria-hidden="index === shown ? undefined : 'true'">
        <img v-if="slide.image" class="vp-slideshow__image" :src="address(slide.image) || undefined" :style="held(slide.image)" :alt="slide.title || ''" :loading="index === 0 ? 'eager' : 'lazy'" decoding="async">
        <div v-if="slide.title || slide.text || slide.button" class="vp-slideshow__words">
          <div v-if="slide.title" class="vp-slideshow__title">{{ slide.title }}</div>
          <p v-if="slide.text" class="vp-slideshow__text">{{ slide.text }}</p>
          <a v-if="slide.button" class="vp-slideshow__button" :href="slide.href || undefined" :tabindex="index === shown ? undefined : -1" @click="go($event, slide.href)">{{ slide.button }}</a>
        </div>
      </div>
    </div>
    <div v-if="!slides.length" class="vp-slideshow__empty">{{ say('empty') }}</div>
    <button v-if="arrows && slides.length > 1" type="button" class="vp-slideshow__turn vp-slideshow__turn--back" :aria-label="say('back')" @click="turn(-1)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg></button>
    <button v-if="arrows && slides.length > 1" type="button" class="vp-slideshow__turn vp-slideshow__turn--on" :aria-label="say('next')" @click="turn(1)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg></button>
    <button v-if="moving" type="button" class="vp-slideshow__turn vp-slideshow__pause" :aria-label="stopped ? say('play') : say('pause')" :aria-pressed="stopped ? 'false' : 'true'" @click="toggle"><svg viewBox="0 0 24 24" aria-hidden="true"><path :d="stopped ? 'M8 5l11 7-11 7z' : 'M9 5v14M15 5v14'" /></svg></button>
    <div v-if="dots && slides.length > 1" class="vp-slideshow__dots">
      <button v-for="(slide, index) in slides" :key="index" type="button" class="vp-slideshow__dot" :class="{ 'vp-slideshow__dot--on': index === shown }" :aria-label="say('slide', '', index + 1)" :aria-current="index === shown ? 'true' : undefined" @click="picked = index" />
    </div>
  </div>
</template>
<script>
// Slides that take turns: a picture each, with a title, a line of text and a button over it. They turn by
// themselves (and wait while someone points at them), by the arrows, the dots or the arrow keys.
// (A picture picked in the Studio is the name of a variable that holds it, like --image-boat: it is shown
// through that variable at once, and its address is read from it when the page is alive. An address is used as it is.)

// The words it says itself, in the site's language (App.vue's head says it: \`htmlAttrs: { lang }\`). A text
// that is filled in in the Props tab is said as it is written.
const WORDS = {
  en: { slides: 'Slides', empty: 'Add slides in the list', back: 'Previous slide', next: 'Next slide', slide: 'Slide {n}', pause: 'Pause the slides', play: 'Play the slides' },
  nb: { slides: 'Lysbilder', empty: 'Legg til lysbilder i listen', back: 'Forrige lysbilde', next: 'Neste lysbilde', slide: 'Lysbilde {n}', pause: 'Sett lysbildene på pause', play: 'Spill av lysbildene' },
  sv: { slides: 'Bildspel', empty: 'Lägg till bilder i listan', back: 'Föregående bild', next: 'Nästa bild', slide: 'Bild {n}', pause: 'Pausa bildspelet', play: 'Spela bildspelet' },
  da: { slides: 'Diasshow', empty: 'Tilføj dias i listen', back: 'Forrige dias', next: 'Næste dias', slide: 'Dias {n}', pause: 'Sæt diasshowet på pause', play: 'Afspil diasshowet' },
  fi: { slides: 'Diaesitys', empty: 'Lisää dioja luetteloon', back: 'Edellinen dia', next: 'Seuraava dia', slide: 'Dia {n}', pause: 'Keskeytä diaesitys', play: 'Toista diaesitys' },
  de: { slides: 'Diashow', empty: 'Füge Folien in der Liste hinzu', back: 'Vorherige Folie', next: 'Nächste Folie', slide: 'Folie {n}', pause: 'Diashow anhalten', play: 'Diashow abspielen' },
  fr: { slides: 'Diaporama', empty: 'Ajoutez des diapositives dans la liste', back: 'Diapositive précédente', next: 'Diapositive suivante', slide: 'Diapositive {n}', pause: 'Mettre le diaporama en pause', play: 'Lire le diaporama' },
  es: { slides: 'Diapositivas', empty: 'Añade diapositivas en la lista', back: 'Diapositiva anterior', next: 'Diapositiva siguiente', slide: 'Diapositiva {n}', pause: 'Pausar las diapositivas', play: 'Reproducir las diapositivas' },
  it: { slides: 'Presentazione', empty: 'Aggiungi le slide nell’elenco', back: 'Slide precedente', next: 'Slide successiva', slide: 'Slide {n}', pause: 'Metti in pausa la presentazione', play: 'Avvia la presentazione' },
  nl: { slides: 'Diavoorstelling', empty: 'Voeg dia’s toe in de lijst', back: 'Vorige dia', next: 'Volgende dia', slide: 'Dia {n}', pause: 'Diavoorstelling pauzeren', play: 'Diavoorstelling afspelen' },
  pt: { slides: 'Apresentação', empty: 'Adicione slides na lista', back: 'Slide anterior', next: 'Próximo slide', slide: 'Slide {n}', pause: 'Pausar a apresentação', play: 'Reproduzir a apresentação' },
  pl: { slides: 'Pokaz slajdów', empty: 'Dodaj slajdy na liście', back: 'Poprzedni slajd', next: 'Następny slajd', slide: 'Slajd {n}', pause: 'Wstrzymaj pokaz slajdów', play: 'Odtwórz pokaz slajdów' },
  zh: { slides: '幻灯片', empty: '在列表中添加幻灯片', back: '上一张', next: '下一张', slide: '第 {n} 张', pause: '暂停幻灯片', play: '播放幻灯片' },
  ja: { slides: 'スライドショー', empty: 'リストにスライドを追加してください', back: '前のスライド', next: '次のスライド', slide: 'スライド {n}', pause: 'スライドショーを一時停止', play: 'スライドショーを再生' }
}

export default {
  props: {
    slides: {
      type: Array,
      default: () => [
        { image: '', title: 'The first slide', text: 'Pick a picture and write what it is about.', button: '', href: '' },
        { image: '', title: 'The second slide', text: 'Add, move and remove slides in the list.', button: '', href: '' }
      ],
      label: 'Slides',
      control: 'list',
      fields: [
        { key: 'image', label: 'Picture', control: 'media' },
        { key: 'title', label: 'Title' },
        { key: 'text', label: 'Text', control: 'textarea' },
        { key: 'button', label: 'Button text' },
        { key: 'href', label: 'Button link', placeholder: '/page, #anchor or https://…' }
      ]
    },
    seconds: { type: Number, default: 6, label: 'Seconds on each (0: stays)', control: 'number', min: 0, max: 60 },
    shape: {
      type: String,
      default: '16 / 7',
      label: 'Shape',
      options: [{ key: 'Banner (16:7)', value: '16 / 7' }, { key: 'Wide (16:9)', value: '16 / 9' }, { key: 'Photo (4:3)', value: '4 / 3' }, { key: 'Square', value: '1 / 1' }, { key: 'Low strip (3:1)', value: '3 / 1' }]
    },
    place: {
      type: String,
      default: 'center',
      label: 'Text placed',
      options: [{ key: 'In the middle', value: 'center' }, { key: 'At the left', value: 'left' }, { key: 'At the bottom', value: 'bottom' }]
    },
    shade: { type: Number, default: 35, label: 'Darken the picture (%)', control: 'number', min: 0, max: 90 },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 60 },
    arrows: { type: Boolean, default: true, label: 'Arrows' },
    dots: { type: Boolean, default: true, label: 'Dots' },
    label: { type: String, default: '', label: 'What it shows', placeholder: 'For screen readers' }
  },
  data() {
    // (the timer is kept off the reactive data)
    return { picked: 0, over: false, found: {}, stopped: false, touch: null }
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
    // (they turn by themselves: then there is a button to stop them)
    moving() {
      return (Number(this.seconds) || 0) > 0 && (this.slides || []).length > 1
    },
    // (the list can get shorter than what was picked)
    shown() {
      return Math.min(this.picked, Math.max(0, (this.slides || []).length - 1))
    },
    style() {
      const shade = Math.max(0, Math.min(90, Number(this.shade) || 0))
      return {
        '--vp-slideshow-shape': this.shape || undefined,
        '--vp-slideshow-radius': this.radius || undefined,
        '--vp-slideshow-shade': shade / 100
      }
    }
  },
  watch: {
    slides: {
      deep: true,
      handler() {
        this.find()
      }
    },
    seconds() {
      this.start()
    }
  },
  mounted() {
    this.find()
    // (with less motion asked for, they wait for the play button)
    this.stopped = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
    this.start()
  },
  beforeUnmount() {
    clearInterval(this.timer)
  },
  methods: {
    say(key, own, n) {
      if (own) return own
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return String(words[key] ?? WORDS.en[key]).replace('{n}', n ?? '')
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
      for (const slide of this.slides || []) {
        if (!/^--/.test(slide.image)) continue
        const address = /^\\s*url\\(\\s*(['"]?)(.*?)\\1\\s*\\)\\s*$/.exec(style.getPropertyValue(slide.image))
        if (address) found[slide.image] = address[2]
      }
      this.found = found
    },
    start() {
      clearInterval(this.timer)
      const seconds = Number(this.seconds) || 0
      if (seconds > 0 && !this.stopped) this.timer = setInterval(() => { if (!this.over) this.turn(1) }, seconds * 1000)
    },
    toggle() {
      this.stopped = !this.stopped
      this.start()
    },
    touched(event) {
      this.touch = event.touches[0]?.clientX ?? null
    },
    // (a swipe to the side turns them)
    swiped(event) {
      if (this.touch === null) return
      const dx = (event.changedTouches[0]?.clientX ?? this.touch) - this.touch
      this.touch = null
      if (Math.abs(dx) > 50) this.turn(dx < 0 ? 1 : -1)
    },
    turn(by) {
      const count = (this.slides || []).length
      if (count) this.picked = (this.shown + by + count) % count
    },
    // A page of the site is shown by the site's router where there is one, without loading the site again
    go(event, href) {
      const router = this.$router
      if (!router || !href || !/^\\/(?!\\/)/.test(href)) return
      if (event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      event.preventDefault()
      router.push(href)
    }
  }
}
<\/script>
<style>
.vp-slideshow {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  aspect-ratio: var(--vp-slideshow-shape, 16 / 7);
  min-height: 260px;
  overflow: hidden;
  border-radius: var(--vp-slideshow-radius, var(--vp-radius, 12px));
  background: var(--vp-surface, #eef1f5);
  color: #fff;
}
.vp-slideshow__track { display: flex; height: 100%; transition: transform 500ms ease; }
.vp-slideshow__slide { position: relative; flex: 0 0 100%; height: 100%; display: flex; align-items: center; justify-content: center; text-align: center; background: linear-gradient(135deg, var(--vp-primary, #2563eb), color-mix(in srgb, var(--vp-primary, #2563eb) 55%, #000)); }
.vp-slideshow__slide--left { justify-content: flex-start; text-align: left; }
.vp-slideshow__slide--bottom { align-items: flex-end; }
.vp-slideshow__image { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.vp-slideshow__words { position: relative; box-sizing: border-box; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: inherit; align-items: inherit; gap: 0.75rem; padding: clamp(1.25rem, 5vw, 4rem) clamp(1.25rem, 8vw, 6rem); background: rgb(0 0 0 / var(--vp-slideshow-shade, 0.35)); }
.vp-slideshow__slide .vp-slideshow__words { justify-content: center; align-items: center; }
.vp-slideshow__slide--left .vp-slideshow__words { align-items: flex-start; }
.vp-slideshow__slide--bottom .vp-slideshow__words { justify-content: flex-end; padding-bottom: clamp(2.5rem, 6vw, 4rem); }
.vp-slideshow__title { max-width: 22em; font-family: var(--vp-font-heading, inherit); font-size: clamp(1.5rem, 4vw, 3rem); font-weight: 700; line-height: 1.15; }
.vp-slideshow__text { max-width: 38em; margin: 0; font-size: clamp(1rem, 1.6vw, 1.2rem); line-height: 1.5; opacity: 0.92; }
.vp-slideshow__button { display: inline-block; margin-top: 0.5rem; padding: 0.7em 1.4em; border-radius: var(--vp-radius, 8px); background: #fff; color: #111; font-weight: 600; text-decoration: none; }
.vp-slideshow__button:hover { filter: brightness(0.94); }
.vp-slideshow__empty { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: var(--vp-muted, #6b7280); }
.vp-slideshow__turn { position: absolute; top: 50%; width: 2.5rem; height: 2.5rem; margin: -1.25rem 0 0; padding: 0; border: 0; border-radius: 50%; background: rgb(0 0 0 / 0.35); color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.vp-slideshow__turn:hover { background: rgb(0 0 0 / 0.55); }
.vp-slideshow__turn svg { width: 1.25rem; height: 1.25rem; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.vp-slideshow__turn--back { left: 0.75rem; }
.vp-slideshow__turn--on { right: 0.75rem; }
.vp-slideshow__pause { top: auto; bottom: 0.5rem; left: 0.75rem; width: 2rem; height: 2rem; margin: 0; z-index: 1; }
.vp-slideshow__pause svg { width: 1rem; height: 1rem; }
.vp-slideshow__pause svg path { stroke-width: 2.4; }
.vp-slideshow__turn:focus-visible, .vp-slideshow__dot:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.vp-slideshow__dots { position: absolute; left: 0; right: 0; bottom: 0.9rem; display: flex; justify-content: center; gap: 0.5rem; }
.vp-slideshow__dot { width: 0.6rem; height: 0.6rem; padding: 0; border: 0; border-radius: 50%; background: rgb(255 255 255 / 0.5); cursor: pointer; }
.vp-slideshow__dot--on { background: #fff; }
@media (prefers-reduced-motion: reduce) {
  .vp-slideshow__track { transition: none; }
}
</style>
`;export{e as default};