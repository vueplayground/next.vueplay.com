var e=`<template>
  <div class="vp-gallery" :class="classes" :style="style">
    <div v-if="filters && tags.length" class="vp-gallery__filters" role="group" aria-label="Show">
      <button type="button" class="vp-gallery__filter" :class="{ 'vp-gallery__filter--on': !tag }" :aria-pressed="!tag" @click="tag = ''">{{ allLabel || 'All' }}</button>
      <button v-for="one in tags" :key="one" type="button" class="vp-gallery__filter" :class="{ 'vp-gallery__filter--on': tag === one }" :aria-pressed="tag === one" @click="tag = one">{{ one }}</button>
    </div>
    <div class="vp-gallery__items">
      <figure
        v-for="item in shown"
        :key="item.index"
        class="vp-gallery__item"
        :style="item.ratio ? { '--vp-gallery-ratio': item.ratio } : undefined"
        @pointermove="tilt"
        @pointerleave="untilt"
      >
        <img
          class="vp-gallery__image"
          :src="address(item.src) || undefined"
          :style="held(item.src)"
          :alt="item.caption || ''"
          loading="lazy"
          :tabindex="lightbox ? 0 : undefined"
          :role="lightbox ? 'button' : undefined"
          @load="sized(item.index, $event)"
          @click="open(item.index)"
          @keydown.enter="open(item.index)"
        >
        <figcaption v-if="item.caption && captions !== 'none'" class="vp-gallery__caption">{{ item.caption }}</figcaption>
      </figure>
      <div v-if="!images.length" class="vp-gallery__empty">Add pictures in the list</div>
    </div>
    <div
      v-if="large !== null && images[large]"
      class="vp-gallery__box"
      role="dialog"
      aria-modal="true"
      :aria-label="images[large].caption || 'Picture'"
      tabindex="-1"
      @click.self="close"
      @keydown.esc="close"
      @keydown.left="step(-1)"
      @keydown.right="step(1)"
      @touchstart.passive="touched"
      @touchend="swiped"
    >
      <img :key="large" class="vp-gallery__large" :src="address(images[large].src) || undefined" :style="held(images[large].src)" :alt="images[large].caption || ''">
      <div class="vp-gallery__about">
        <span v-if="images[large].caption">{{ images[large].caption }}</span>
        <span class="vp-gallery__counter">{{ order.indexOf(large) + 1 }} / {{ order.length }}</span>
      </div>
      <button type="button" class="vp-gallery__close" aria-label="Close" @click="close"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg></button>
      <button v-if="order.length > 1" type="button" class="vp-gallery__turn vp-gallery__turn--back" aria-label="Previous picture" @click="step(-1)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg></button>
      <button v-if="order.length > 1" type="button" class="vp-gallery__turn vp-gallery__turn--on" aria-label="Next picture" @click="step(1)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg></button>
    </div>
  </div>
</template>
<script>
// Pictures laid out as a grid, as masonry (each as tall as it is), as rows that fill the width or as a bento of
// one large and smaller ones beside it; they react when pointed at, can be sorted by tags with buttons above, and
// open large with a click: the large one turns with arrows, the arrow keys or a swipe, and closes with Esc.
// (A picture picked in the Studio is the name of a variable that holds it, like --image-boat: it is shown
// through that variable at once, and its address is read from it when the page is alive. An address is used as it is.)
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
    classes() {
      return ['vp-gallery--' + this.layout, 'vp-gallery--hover-' + this.hover, 'vp-gallery--captions-' + this.captions, { 'vp-gallery--zoomable': this.lightbox }]
    },
    style() {
      return {
        '--vp-gallery-columns': Math.max(1, Math.min(6, Math.round(Number(this.columns) || 3))),
        '--vp-gallery-shape': this.shape || undefined,
        '--vp-gallery-row': this.rowHeight || undefined,
        '--vp-gallery-gap': this.gap || undefined,
        '--vp-gallery-radius': this.radius || undefined
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
      if (value !== null) this.$nextTick(() => this.$el.querySelector('.vp-gallery__box')?.focus())
    }
  },
  mounted() {
    this.find()
  },
  beforeUnmount() {
    if (this.large !== null && typeof document !== 'undefined') document.documentElement.style.overflow = ''
  },
  methods: {
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
      if (this.lightbox) this.large = index
    },
    close() {
      this.large = null
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
      const el = event.currentTarget
      const box = el.getBoundingClientRect()
      el.style.setProperty('--vp-gallery-rx', ((event.clientY - box.top) / box.height - 0.5) * -10 + 'deg')
      el.style.setProperty('--vp-gallery-ry', ((event.clientX - box.left) / box.width - 0.5) * 10 + 'deg')
    },
    untilt(event) {
      event.currentTarget.style.removeProperty('--vp-gallery-rx')
      event.currentTarget.style.removeProperty('--vp-gallery-ry')
    }
  }
}
<\/script>
<style>
.vp-gallery {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.vp-gallery__filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}
.vp-gallery__filter {
  padding: 8px 16px;
  border: 1px solid var(--vp-border, #e5e7eb);
  border-radius: 999px;
  background: var(--vp-background, #fff);
  color: var(--vp-text, #111827);
  font: inherit;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.vp-gallery__filter:hover {
  border-color: var(--vp-primary, #6366f1);
}
.vp-gallery__filter--on {
  border-color: var(--vp-primary, #6366f1);
  background: var(--vp-primary, #6366f1);
  color: var(--vp-primary-contrast, #fff);
}
.vp-gallery__items {
  display: grid;
  grid-template-columns: repeat(var(--vp-gallery-columns, 3), minmax(0, 1fr));
  gap: var(--vp-gallery-gap, 12px);
}
.vp-gallery__item {
  position: relative;
  margin: 0;
  overflow: hidden;
  border-radius: var(--vp-gallery-radius, var(--vp-radius, 10px));
  background: color-mix(in oklch, var(--vp-text, #111827) 6%, transparent);
  isolation: isolate;
  animation: vp-gallery-in 0.45s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.vp-gallery__image {
  display: block;
  width: 100%;
  height: 100%;
  aspect-ratio: var(--vp-gallery-shape, 4 / 3);
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.5s ease;
}
.vp-gallery--zoomable .vp-gallery__image { cursor: zoom-in; }
.vp-gallery__image:focus-visible { outline: 3px solid var(--vp-primary, #6366f1); outline-offset: -3px; }

/* Layouts */
.vp-gallery--masonry .vp-gallery__items {
  display: block;
  columns: var(--vp-gallery-columns, 3);
  column-gap: var(--vp-gallery-gap, 12px);
}
.vp-gallery--masonry .vp-gallery__item {
  break-inside: avoid;
  margin-bottom: var(--vp-gallery-gap, 12px);
}
.vp-gallery--masonry .vp-gallery__image,
.vp-gallery--rows .vp-gallery__image { aspect-ratio: auto; }
.vp-gallery--rows .vp-gallery__items {
  display: flex;
  flex-wrap: wrap;
}
.vp-gallery--rows .vp-gallery__item {
  flex: var(--vp-gallery-ratio, 1.4) 1 calc(var(--vp-gallery-row, 260px) * var(--vp-gallery-ratio, 1.4));
}
.vp-gallery--rows .vp-gallery__image {
  height: var(--vp-gallery-row, 260px);
}
.vp-gallery--rows .vp-gallery__items::after {
  content: '';
  flex: 999 1 0;
}
.vp-gallery--bento .vp-gallery__items {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-auto-rows: clamp(130px, 17vw, 230px);
  grid-auto-flow: dense;
}
.vp-gallery--bento .vp-gallery__image {
  position: absolute;
  inset: 0;
  aspect-ratio: auto;
}
.vp-gallery--bento .vp-gallery__item:nth-child(6n + 1) { grid-column: span 2; grid-row: span 2; }
.vp-gallery--bento .vp-gallery__item:nth-child(6n + 4) { grid-column: span 2; }

/* When pointed at */
.vp-gallery--hover-zoom .vp-gallery__item:hover .vp-gallery__image { transform: scale(1.07); }
.vp-gallery--hover-lift .vp-gallery__item { transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.35s ease; }
.vp-gallery--hover-lift .vp-gallery__item:hover { transform: translateY(-6px); box-shadow: 0 18px 40px rgb(0 0 0 / 0.18); }
.vp-gallery--hover-color .vp-gallery__image { filter: grayscale(1) contrast(1.05); }
.vp-gallery--hover-color .vp-gallery__item:hover .vp-gallery__image { filter: none; transform: scale(1.03); }
.vp-gallery--hover-tilt .vp-gallery__items { perspective: 900px; }
.vp-gallery--hover-tilt .vp-gallery__item {
  transform: rotateX(var(--vp-gallery-rx, 0deg)) rotateY(var(--vp-gallery-ry, 0deg));
  transition: transform 0.25s ease, box-shadow 0.3s ease;
}
.vp-gallery--hover-tilt .vp-gallery__item:hover { box-shadow: 0 20px 40px rgb(0 0 0 / 0.2); }

/* Captions */
.vp-gallery__caption {
  position: absolute;
  inset: auto 0 0;
  padding: 28px 14px 12px;
  background: linear-gradient(transparent, rgb(0 0 0 / 0.65));
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.35;
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.vp-gallery--captions-hover .vp-gallery__caption { opacity: 0; transform: translateY(8px); }
.vp-gallery--captions-hover .vp-gallery__item:hover .vp-gallery__caption,
.vp-gallery--captions-hover .vp-gallery__item:focus-within .vp-gallery__caption { opacity: 1; transform: none; }
.vp-gallery--captions-below .vp-gallery__item { overflow: visible; background: none; }
.vp-gallery--captions-below .vp-gallery__image { border-radius: var(--vp-gallery-radius, var(--vp-radius, 10px)); }
.vp-gallery--captions-below .vp-gallery__caption {
  position: static;
  padding: 8px 2px 0;
  background: none;
  color: var(--vp-muted, #6b7280);
  font-weight: 500;
}
.vp-gallery__empty {
  grid-column: 1 / -1;
  display: grid;
  place-items: center;
  min-height: 160px;
  border: 2px dashed var(--vp-border, #d1d5db);
  border-radius: var(--vp-radius, 10px);
  color: var(--vp-muted, #6b7280);
}

/* Large */
.vp-gallery__box {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 56px 72px 72px;
  background: rgb(8 10 18 / 0.92);
  backdrop-filter: blur(6px);
  outline: none;
  animation: vp-gallery-fade 0.25s ease both;
}
.vp-gallery__large {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 30px 80px rgb(0 0 0 / 0.5);
  animation: vp-gallery-zoom 0.35s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.vp-gallery__about {
  position: absolute;
  inset: auto 0 20px;
  display: flex;
  justify-content: center;
  gap: 16px;
  color: rgb(255 255 255 / 0.9);
  font-size: 15px;
}
.vp-gallery__counter {
  font-variant-numeric: tabular-nums;
  color: rgb(255 255 255 / 0.55);
}
.vp-gallery__close,
.vp-gallery__turn {
  position: absolute;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: rgb(255 255 255 / 0.1);
  color: #fff;
  cursor: pointer;
  transition: background 0.2s ease;
}
.vp-gallery__close:hover,
.vp-gallery__turn:hover { background: rgb(255 255 255 / 0.22); }
.vp-gallery__close svg,
.vp-gallery__turn svg {
  width: 22px;
  height: 22px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.vp-gallery__close { top: 14px; right: 14px; }
.vp-gallery__turn { top: 50%; translate: 0 -50%; }
.vp-gallery__turn--back { left: 14px; }
.vp-gallery__turn--on { right: 14px; }

@media (max-width: 640px) {
  .vp-gallery__items { grid-template-columns: repeat(min(2, var(--vp-gallery-columns, 3)), minmax(0, 1fr)); }
  .vp-gallery--masonry .vp-gallery__items { columns: min(2, var(--vp-gallery-columns, 3)); }
  .vp-gallery--bento .vp-gallery__items { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .vp-gallery--rows .vp-gallery__image { height: calc(var(--vp-gallery-row, 260px) * 0.6); }
  .vp-gallery__box { padding: 56px 8px 72px; }
  .vp-gallery__turn { top: auto; bottom: 10px; translate: none; }
}
@keyframes vp-gallery-in {
  from { opacity: 0; transform: scale(0.97); }
}
@keyframes vp-gallery-fade {
  from { opacity: 0; }
}
@keyframes vp-gallery-zoom {
  from { opacity: 0; transform: scale(0.94); }
}
@media (prefers-reduced-motion: reduce) {
  .vp-gallery__item,
  .vp-gallery__box,
  .vp-gallery__large { animation: none; }
  .vp-gallery__image { transition: none; }
}
</style>
`;export{e as default};