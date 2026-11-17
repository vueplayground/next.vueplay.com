var e=`<template>
  <div class="vp-photo-gallery" :class="classes" :style="style">
    <div v-if="filters && tags.length" class="vp-photo-gallery__filters" role="group" :aria-label="say('show')">
      <button type="button" class="vp-photo-gallery__filter" :class="{ 'vp-photo-gallery__filter--on': !tag }" :aria-pressed="!tag" @click="tag = ''">{{ say('all', allLabel) }}</button>
      <button v-for="one in tags" :key="one" type="button" class="vp-photo-gallery__filter" :class="{ 'vp-photo-gallery__filter--on': tag === one }" :aria-pressed="tag === one" @click="tag = one">{{ one }}</button>
    </div>
    <div class="vp-photo-gallery__items">
      <figure
        v-for="item in shown"
        :key="item.index"
        class="vp-photo-gallery__item"
        :style="item.ratio ? { '--vp-photo-gallery-ratio': item.ratio } : undefined"
        @pointermove="tilt"
        @pointerleave="untilt"
      >
        <img
          class="vp-photo-gallery__image"
          :src="address(item.src) || undefined"
          :style="held(item.src)"
          :alt="item.caption || ''"
          loading="lazy"
          decoding="async"
          :tabindex="lightbox ? 0 : undefined"
          :role="lightbox ? 'button' : undefined"
          :aria-label="lightbox && !item.caption ? say('picture') : undefined"
          @load="sized(item.index, $event)"
          @click="open(item.index)"
          @keydown.enter="open(item.index)"
          @keydown.space.prevent="lightbox && open(item.index)"
        >
        <figcaption v-if="item.caption && captions !== 'none'" class="vp-photo-gallery__caption">{{ item.caption }}</figcaption>
      </figure>
      <div v-if="!images.length" class="vp-photo-gallery__empty">{{ say('empty') }}</div>
    </div>
    <!-- (moved to the end of the page: inside a part that moves or is held, like Motion or a carousel, it would be
         placed and cut off by that part instead of the screen) -->
    <Teleport to="body">
    <div
      v-if="large !== null && images[large]"
      ref="box"
      class="vp-photo-gallery__box"
      role="dialog"
      aria-modal="true"
      :aria-label="say('picture', images[large].caption)"
      tabindex="-1"
      @click.self="close"
      @keydown.esc="close"
      @keydown.tab="trap"
      @keydown.left="step(-1)"
      @keydown.right="step(1)"
      @touchstart.passive="touched"
      @touchend="swiped"
    >
      <img :key="large" class="vp-photo-gallery__large" :src="address(images[large].src) || undefined" :style="held(images[large].src)" :alt="images[large].caption || ''" decoding="async">
      <div class="vp-photo-gallery__about">
        <span v-if="images[large].caption">{{ images[large].caption }}</span>
        <span class="vp-photo-gallery__counter">{{ order.indexOf(large) + 1 }} / {{ order.length }}</span>
      </div>
      <button type="button" class="vp-photo-gallery__close" :aria-label="say('close')" @click="close"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg></button>
      <button v-if="order.length > 1" type="button" class="vp-photo-gallery__turn vp-photo-gallery__turn--back" :aria-label="say('back')" @click="step(-1)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg></button>
      <button v-if="order.length > 1" type="button" class="vp-photo-gallery__turn vp-photo-gallery__turn--on" :aria-label="say('next')" @click="step(1)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg></button>
    </div>
    </Teleport>
  </div>
</template>
<script>
// Pictures laid out as a grid, as masonry (each as tall as it is), as rows that fill the width or as a bento of
// one large and smaller ones beside it; they react when pointed at, can be sorted by tags with buttons above, and
// open large with a click: the large one turns with arrows, the arrow keys or a swipe, and closes with Esc.
// (A picture picked in the Studio is the name of a variable that holds it, like --image-boat: it is shown
// through that variable at once, and its address is read from it when the page is alive. An address is used as it is.)

// The words it says itself, in the site's language (App.vue's head says it: \`htmlAttrs: { lang }\`). A text
// that is filled in in the Props tab is said as it is written.
const WORDS = {
  en: { empty: 'Add pictures in the list', picture: 'Picture', back: 'Previous picture', next: 'Next picture', close: 'Close', show: 'Show', all: 'All' },
  nb: { empty: 'Legg til bilder i listen', picture: 'Bilde', back: 'Forrige bilde', next: 'Neste bilde', close: 'Lukk', show: 'Vis', all: 'Alle' },
  sv: { empty: 'Lägg till bilder i listan', picture: 'Bild', back: 'Föregående bild', next: 'Nästa bild', close: 'Stäng', show: 'Visa', all: 'Alla' },
  da: { empty: 'Tilføj billeder i listen', picture: 'Billede', back: 'Forrige billede', next: 'Næste billede', close: 'Luk', show: 'Vis', all: 'Alle' },
  fi: { empty: 'Lisää kuvia luetteloon', picture: 'Kuva', back: 'Edellinen kuva', next: 'Seuraava kuva', close: 'Sulje', show: 'Näytä', all: 'Kaikki' },
  de: { empty: 'Füge Bilder in der Liste hinzu', picture: 'Bild', back: 'Vorheriges Bild', next: 'Nächstes Bild', close: 'Schließen', show: 'Anzeigen', all: 'Alle' },
  fr: { empty: 'Ajoutez des images dans la liste', picture: 'Image', back: 'Image précédente', next: 'Image suivante', close: 'Fermer', show: 'Afficher', all: 'Tout' },
  es: { empty: 'Añade imágenes en la lista', picture: 'Imagen', back: 'Imagen anterior', next: 'Imagen siguiente', close: 'Cerrar', show: 'Mostrar', all: 'Todo' },
  it: { empty: 'Aggiungi immagini nell’elenco', picture: 'Immagine', back: 'Immagine precedente', next: 'Immagine successiva', close: 'Chiudi', show: 'Mostra', all: 'Tutte' },
  nl: { empty: 'Voeg afbeeldingen toe in de lijst', picture: 'Afbeelding', back: 'Vorige afbeelding', next: 'Volgende afbeelding', close: 'Sluiten', show: 'Toon', all: 'Alle' },
  pt: { empty: 'Adicione imagens na lista', picture: 'Imagem', back: 'Imagem anterior', next: 'Próxima imagem', close: 'Fechar', show: 'Mostrar', all: 'Todas' },
  pl: { empty: 'Dodaj zdjęcia na liście', picture: 'Zdjęcie', back: 'Poprzednie zdjęcie', next: 'Następne zdjęcie', close: 'Zamknij', show: 'Pokaż', all: 'Wszystkie' },
  zh: { empty: '在列表中添加图片', picture: '图片', back: '上一张图片', next: '下一张图片', close: '关闭', show: '显示', all: '全部' },
  ja: { empty: 'リストに画像を追加してください', picture: '画像', back: '前の画像', next: '次の画像', close: '閉じる', show: '表示', all: 'すべて' }
}

export default {
  props: {
    images: {
      type: Array,
      default: () => [],
      label: 'Pictures',
      control: 'list',
      fields: [
        { key: 'src', label: 'Picture', control: 'media' },
        { key: 'caption', label: 'Caption (also what it shows)' },
        { key: 'tag', label: 'Tag (for the buttons above)' }
      ]
    },
    layout: {
      type: String,
      default: 'grid',
      label: 'Layout',
      options: [{ key: 'Grid', value: 'grid' }, { key: 'Masonry', value: 'masonry' }, { key: 'Rows that fill the width', value: 'rows' }, { key: 'Bento (one large)', value: 'bento' }]
    },
    columns: { type: Number, default: 3, label: 'Columns', control: 'number', min: 1, max: 6 },
    shape: {
      type: String,
      default: '4 / 3',
      label: 'Shape (grid)',
      options: [{ key: 'Square', value: '1 / 1' }, { key: 'Photo (4:3)', value: '4 / 3' }, { key: 'Wide (16:9)', value: '16 / 9' }, { key: 'Tall (3:4)', value: '3 / 4' }]
    },
    rowHeight: { type: String, default: '260px', label: 'Row height (rows)', control: 'slider', unit: 'px', min: 120, max: 480 },
    gap: { type: String, default: '12px', label: 'Space between', control: 'slider', unit: 'px', min: 0, max: 48 },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 40 },
    hover: {
      type: String,
      default: 'zoom',
      label: 'When pointed at',
      options: [{ key: 'Zoom in', value: 'zoom' }, { key: 'Lift', value: 'lift' }, { key: 'Colour comes in', value: 'color' }, { key: 'Tilt', value: 'tilt' }, { key: 'Nothing', value: 'none' }]
    },
    captions: {
      type: String,
      default: 'hover',
      label: 'Captions',
      options: [{ key: 'When pointed at', value: 'hover' }, { key: 'On the picture', value: 'over' }, { key: 'Under it', value: 'below' }, { key: 'None', value: 'none' }]
    },
    filters: { type: Boolean, default: false, label: 'Buttons to show one tag' },
    allLabel: { type: String, default: '', label: 'Name of the "All" button', placeholder: 'All' },
    lightbox: { type: Boolean, default: true, label: 'A click shows it large' }
  },
  data() {
    return { tag: '', large: null, ratios: {}, found: {}, touch: null }
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
      return ['vp-photo-gallery--' + this.layout, 'vp-photo-gallery--hover-' + this.hover, 'vp-photo-gallery--captions-' + this.captions, { 'vp-photo-gallery--zoomable': this.lightbox }]
    },
    style() {
      return {
        '--vp-photo-gallery-columns': Math.max(1, Math.min(6, Math.round(Number(this.columns) || 3))),
        '--vp-photo-gallery-shape': this.shape || undefined,
        '--vp-photo-gallery-row': this.rowHeight || undefined,
        '--vp-photo-gallery-gap': this.gap || undefined,
        '--vp-photo-gallery-radius': this.radius || undefined
      }
    },
    tags() {
      return [...new Set((this.images || []).map(one => String(one.tag || '').trim()).filter(Boolean))]
    },
    // the pictures shown (one tag, or all), with their place in the list and their own shape once known
    shown() {
      return (this.images || [])
        .map((one, index) => ({ ...one, index, ratio: this.ratios[index] }))
        .filter(one => !this.tag || String(one.tag || '').trim() === this.tag)
    },
    order() {
      return this.shown.map(one => one.index)
    }
  },
  watch: {
    images: {
      deep: true,
      handler() {
        this.find()
        if (this.tag && !this.tags.includes(this.tag)) this.tag = ''
      }
    },
    large(value) {
      if (typeof document === 'undefined') return
      document.documentElement.style.overflow = value === null ? '' : 'hidden'
      if (value !== null) this.$nextTick(() => this.$refs.box?.focus())
    }
  },
  mounted() {
    this.find()
  },
  beforeUnmount() {
    if (this.large !== null && typeof document !== 'undefined') document.documentElement.style.overflow = ''
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
      for (const one of this.images || []) {
        if (!/^--/.test(one.src)) continue
        const address = /^\\s*url\\(\\s*(['"]?)(.*?)\\1\\s*\\)\\s*$/.exec(style.getPropertyValue(one.src))
        if (address) found[one.src] = address[2]
      }
      this.found = found
    },
    // (rows that fill the width give each picture the room its own shape asks)
    sized(index, event) {
      const img = event.target
      if (img.naturalWidth && img.naturalHeight) this.ratios = { ...this.ratios, [index]: (img.naturalWidth / img.naturalHeight).toFixed(3) }
    },
    open(index) {
      if (!this.lightbox) return
      // (the picture it opened from has the keys again when it closes)
      if (this.large === null && typeof document !== 'undefined') this.opener = document.activeElement
      this.large = index
    },
    close() {
      this.large = null
      const opener = this.opener
      this.opener = null
      if (opener?.isConnected) this.$nextTick(() => opener.focus?.())
    },
    // (Tab goes round the buttons of the large picture, not out to the page behind it)
    trap(event) {
      const all = [...(this.$refs.box?.querySelectorAll('button') || [])]
      if (!all.length) return
      const at = all.indexOf(document.activeElement)
      event.preventDefault()
      all[at < 0 ? (event.shiftKey ? all.length - 1 : 0) : (at + (event.shiftKey ? -1 : 1) + all.length) % all.length].focus()
    },
    step(by) {
      const at = this.order.indexOf(this.large)
      if (at < 0) return
      this.large = this.order[(at + by + this.order.length) % this.order.length]
    },
    touched(event) {
      this.touch = event.touches[0]?.clientX ?? null
    },
    swiped(event) {
      if (this.touch === null) return
      const dx = (event.changedTouches[0]?.clientX ?? this.touch) - this.touch
      this.touch = null
      if (Math.abs(dx) > 50) this.step(dx < 0 ? 1 : -1)
    },
    tilt(event) {
      if (this.hover !== 'tilt' || event.pointerType !== 'mouse') return
      if (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const el = event.currentTarget
      const box = el.getBoundingClientRect()
      el.style.setProperty('--vp-photo-gallery-rx', ((event.clientY - box.top) / box.height - 0.5) * -10 + 'deg')
      el.style.setProperty('--vp-photo-gallery-ry', ((event.clientX - box.left) / box.width - 0.5) * 10 + 'deg')
    },
    untilt(event) {
      event.currentTarget.style.removeProperty('--vp-photo-gallery-rx')
      event.currentTarget.style.removeProperty('--vp-photo-gallery-ry')
    }
  }
}
<\/script>
<style>
.vp-photo-gallery {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.vp-photo-gallery__filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}
.vp-photo-gallery__filter {
  min-height: 40px;
  padding: 8px 18px;
  border: 1px solid var(--vp-border, #e5e7eb);
  border-radius: 999px;
  background: var(--vp-background, #fff);
  color: color-mix(in oklch, var(--vp-text, #111827) 78%, transparent);
  font: inherit;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.2;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}
.vp-photo-gallery__filter:hover {
  border-color: color-mix(in oklch, var(--vp-text, #111827) 45%, transparent);
  color: var(--vp-text, #111827);
}
.vp-photo-gallery__filter:focus-visible {
  outline: 2px solid var(--vp-primary, #6366f1);
  outline-offset: 2px;
}
.vp-photo-gallery__filter--on {
  border-color: var(--vp-primary, #6366f1);
  background: var(--vp-primary, #6366f1);
  color: var(--vp-primary-contrast, #fff);
  box-shadow: 0 6px 16px -8px var(--vp-primary, #6366f1);
}
.vp-photo-gallery__filter--on:hover {
  border-color: var(--vp-primary, #6366f1);
  color: var(--vp-primary-contrast, #fff);
}
.vp-photo-gallery__items {
  display: grid;
  grid-template-columns: repeat(var(--vp-photo-gallery-columns, 3), minmax(0, 1fr));
  gap: var(--vp-photo-gallery-gap, 12px);
}
.vp-photo-gallery__item {
  position: relative;
  margin: 0;
  overflow: hidden;
  border-radius: var(--vp-photo-gallery-radius, var(--vp-radius, 10px));
  background: color-mix(in oklch, var(--vp-text, #111827) 6%, transparent);
  isolation: isolate;
  animation: vp-photo-gallery-in 0.45s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.vp-photo-gallery__image {
  display: block;
  width: 100%;
  height: 100%;
  aspect-ratio: var(--vp-photo-gallery-shape, 4 / 3);
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.5s ease;
}
.vp-photo-gallery--zoomable .vp-photo-gallery__image { cursor: zoom-in; }
.vp-photo-gallery__image:focus-visible { outline: 3px solid var(--vp-primary, #6366f1); outline-offset: -3px; }

/* Layouts */
.vp-photo-gallery--masonry .vp-photo-gallery__items {
  display: block;
  columns: var(--vp-photo-gallery-columns, 3);
  column-gap: var(--vp-photo-gallery-gap, 12px);
}
.vp-photo-gallery--masonry .vp-photo-gallery__item {
  break-inside: avoid;
  margin-bottom: var(--vp-photo-gallery-gap, 12px);
}
.vp-photo-gallery--masonry .vp-photo-gallery__image,
.vp-photo-gallery--rows .vp-photo-gallery__image { aspect-ratio: auto; }
.vp-photo-gallery--rows .vp-photo-gallery__items {
  display: flex;
  flex-wrap: wrap;
}
.vp-photo-gallery--rows .vp-photo-gallery__item {
  flex: var(--vp-photo-gallery-ratio, 1.4) 1 calc(var(--vp-photo-gallery-row, 260px) * var(--vp-photo-gallery-ratio, 1.4));
}
.vp-photo-gallery--rows .vp-photo-gallery__image {
  height: var(--vp-photo-gallery-row, 260px);
}
.vp-photo-gallery--rows .vp-photo-gallery__items::after {
  content: '';
  flex: 999 1 0;
}
.vp-photo-gallery--bento .vp-photo-gallery__items {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-auto-rows: clamp(130px, 17vw, 230px);
  grid-auto-flow: dense;
}
.vp-photo-gallery--bento .vp-photo-gallery__image {
  position: absolute;
  inset: 0;
  aspect-ratio: auto;
}
.vp-photo-gallery--bento .vp-photo-gallery__item:nth-child(6n + 1) { grid-column: span 2; grid-row: span 2; }
.vp-photo-gallery--bento .vp-photo-gallery__item:nth-child(6n + 4) { grid-column: span 2; }

/* When pointed at */
.vp-photo-gallery--hover-zoom .vp-photo-gallery__item:hover .vp-photo-gallery__image { transform: scale(1.07); }
.vp-photo-gallery--hover-lift .vp-photo-gallery__item { transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.35s ease; }
.vp-photo-gallery--hover-lift .vp-photo-gallery__item:hover { transform: translateY(-6px); box-shadow: 0 18px 40px rgb(0 0 0 / 0.18); }
.vp-photo-gallery--hover-color .vp-photo-gallery__image { filter: grayscale(1) contrast(1.05); }
.vp-photo-gallery--hover-color .vp-photo-gallery__item:hover .vp-photo-gallery__image { filter: none; transform: scale(1.03); }
.vp-photo-gallery--hover-tilt .vp-photo-gallery__items { perspective: 900px; }
.vp-photo-gallery--hover-tilt .vp-photo-gallery__item {
  transform: rotateX(var(--vp-photo-gallery-rx, 0deg)) rotateY(var(--vp-photo-gallery-ry, 0deg));
  transition: transform 0.25s ease, box-shadow 0.3s ease;
}
.vp-photo-gallery--hover-tilt .vp-photo-gallery__item:hover { box-shadow: 0 20px 40px rgb(0 0 0 / 0.2); }

/* Captions */
.vp-photo-gallery__caption {
  position: absolute;
  inset: auto 0 0;
  padding: 56px 16px 14px;
  background: linear-gradient(to top, rgb(0 0 0 / 0.72), rgb(0 0 0 / 0.38) 45%, rgb(0 0 0 / 0.1) 75%, transparent);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.35;
  text-shadow: 0 1px 8px rgb(0 0 0 / 0.35);
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.vp-photo-gallery--captions-hover .vp-photo-gallery__caption { opacity: 0; transform: translateY(8px); }
.vp-photo-gallery--captions-hover .vp-photo-gallery__item:hover .vp-photo-gallery__caption,
.vp-photo-gallery--captions-hover .vp-photo-gallery__item:focus-within .vp-photo-gallery__caption { opacity: 1; transform: none; }
.vp-photo-gallery--captions-below .vp-photo-gallery__item { overflow: visible; background: none; }
/* (the picture keeps its shape: the caption under it has the rest of the cell) */
.vp-photo-gallery--grid.vp-photo-gallery--captions-below .vp-photo-gallery__image { height: auto; }
.vp-photo-gallery--captions-below .vp-photo-gallery__image { border-radius: var(--vp-photo-gallery-radius, var(--vp-radius, 10px)); }
.vp-photo-gallery--captions-below .vp-photo-gallery__caption {
  position: static;
  padding: 10px 2px 8px;
  background: none;
  color: var(--vp-text, #111827);
  font-weight: 600;
  text-shadow: none;
  pointer-events: auto;
}
.vp-photo-gallery__empty {
  grid-column: 1 / -1;
  display: grid;
  place-items: center;
  min-height: 160px;
  border: 2px dashed var(--vp-border, #d1d5db);
  border-radius: var(--vp-radius, 10px);
  color: var(--vp-muted, #6b7280);
}

/* Large */
.vp-photo-gallery__box {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 56px 72px 72px;
  background: rgb(8 10 18 / 0.92);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  outline: none;
  animation: vp-photo-gallery-fade 0.25s ease both;
}
.vp-photo-gallery__large {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 30px 80px rgb(0 0 0 / 0.5);
  animation: vp-photo-gallery-zoom 0.35s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.vp-photo-gallery__about {
  position: absolute;
  inset: auto 0 20px;
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 14px;
  padding-inline: 72px;
  color: rgb(255 255 255 / 0.92);
  font-size: 15px;
  line-height: 1.4;
  text-align: center;
}
.vp-photo-gallery__counter {
  flex: none;
  font-variant-numeric: tabular-nums;
  font-size: 13px;
  letter-spacing: 0.04em;
  color: rgb(255 255 255 / 0.6);
}
.vp-photo-gallery__close,
.vp-photo-gallery__turn {
  position: absolute;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  padding: 0;
  border: 1px solid rgb(255 255 255 / 0.2);
  border-radius: 50%;
  background: rgb(255 255 255 / 0.1);
  color: #fff;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, scale 0.2s ease;
}
.vp-photo-gallery__close:hover,
.vp-photo-gallery__turn:hover { background: rgb(255 255 255 / 0.24); border-color: rgb(255 255 255 / 0.45); }
.vp-photo-gallery__close:active,
.vp-photo-gallery__turn:active { scale: 0.94; }
.vp-photo-gallery__close:focus-visible,
.vp-photo-gallery__turn:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.vp-photo-gallery__close svg,
.vp-photo-gallery__turn svg {
  width: 22px;
  height: 22px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.vp-photo-gallery__close { top: 14px; right: 14px; }
.vp-photo-gallery__turn { top: 50%; translate: 0 -50%; }
.vp-photo-gallery__turn--back { left: 14px; }
.vp-photo-gallery__turn--on { right: 14px; }

@media (max-width: 640px) {
  .vp-photo-gallery__items { grid-template-columns: repeat(min(2, var(--vp-photo-gallery-columns, 3)), minmax(0, 1fr)); }
  .vp-photo-gallery--masonry .vp-photo-gallery__items { columns: min(2, var(--vp-photo-gallery-columns, 3)); }
  .vp-photo-gallery--bento .vp-photo-gallery__items { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .vp-photo-gallery--rows .vp-photo-gallery__image { height: calc(var(--vp-photo-gallery-row, 260px) * 0.6); }
  .vp-photo-gallery { gap: 20px; }
  .vp-photo-gallery__box { padding: 64px 8px 76px; }
  .vp-photo-gallery__about { inset: auto 0 24px; padding-inline: 68px; font-size: 14px; }
  .vp-photo-gallery__turn { top: auto; bottom: 10px; translate: none; }
}
@keyframes vp-photo-gallery-in {
  from { opacity: 0; transform: scale(0.97); }
}
@keyframes vp-photo-gallery-fade {
  from { opacity: 0; }
}
@keyframes vp-photo-gallery-zoom {
  from { opacity: 0; transform: scale(0.94); }
}
@media (prefers-reduced-motion: reduce) {
  .vp-photo-gallery__item,
  .vp-photo-gallery__box,
  .vp-photo-gallery__large { animation: none; }
  .vp-photo-gallery__image,
  .vp-photo-gallery__filter,
  .vp-photo-gallery__close,
  .vp-photo-gallery__turn,
  .vp-photo-gallery__caption { transition: none; }
  .vp-photo-gallery__item,
  .vp-photo-gallery__item:hover,
  .vp-photo-gallery__item:hover .vp-photo-gallery__image { transform: none !important; transition: none; }
}
</style>
`;export{e as default};