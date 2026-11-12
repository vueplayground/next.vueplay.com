var e=`<template>
  <div class="vp-photos" :class="{ 'vp-photos--zoom': zoom }" :style="style">
    <figure v-for="(image, index) in images" :key="index" class="vp-photos__item">
      <img
        class="vp-photos__image"
        :src="address(image.src) || undefined"
        :style="held(image.src)"
        :alt="image.alt || ''"
        loading="lazy"
        :tabindex="zoom ? 0 : undefined"
        @click="show(index)"
        @keydown.enter="show(index)"
      >
      <figcaption v-if="image.alt && captions" class="vp-photos__caption">{{ image.alt }}</figcaption>
    </figure>
    <div v-if="!images.length" class="vp-photos__empty">Add pictures in the list</div>
    <div v-if="large !== null && images[large]" class="vp-photos__large" role="dialog" aria-label="Picture" tabindex="-1" @click="large = null" @keydown.esc="large = null" @keydown.left="turn(-1)" @keydown.right="turn(1)">
      <img class="vp-photos__shown" :src="address(images[large].src) || undefined" :style="held(images[large].src)" :alt="images[large].alt || ''">
      <button v-if="images.length > 1" type="button" class="vp-photos__turn vp-photos__turn--back" aria-label="Previous picture" @click.stop="turn(-1)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg></button>
      <button v-if="images.length > 1" type="button" class="vp-photos__turn vp-photos__turn--on" aria-label="Next picture" @click.stop="turn(1)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg></button>
    </div>
  </div>
</template>
<script>
// Pictures in a grid that folds on a narrow screen. A click shows one large, with arrows to the next.
// (A picture picked in the Studio is the name of a variable that holds it, like --image-boat: it is shown
// through that variable at once, and its address is read from it when the page is alive. An address is used as it is.)
export default {
  props: {
    images: {
      type: Array,
      default: () => [],
      label: 'Pictures',
      control: 'list',
      fields: [{ key: 'src', label: 'Picture', control: 'media' }, { key: 'alt', label: 'What it shows' }]
    },
    columns: { type: Number, default: 3, label: 'Columns', control: 'number', min: 1, max: 8 },
    shape: {
      type: String,
      default: '1 / 1',
      label: 'Shape',
      options: [{ key: 'Square', value: '1 / 1' }, { key: 'Photo (4:3)', value: '4 / 3' }, { key: 'Wide (16:9)', value: '16 / 9' }, { key: 'Tall (3:4)', value: '3 / 4' }, { key: 'As the picture', value: 'auto' }]
    },
    gap: { type: String, default: '', label: 'Space between', control: 'slider', unit: 'px', min: 0, max: 60 },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 60 },
    captions: { type: Boolean, default: false, label: 'Text under each' },
    zoom: { type: Boolean, default: true, label: 'Click shows it large' }
  },
  data() {
    return { large: null, found: {} }
  },
  watch: {
    images: {
      deep: true,
      handler() {
        this.find()
      }
    },
    large(value) {
      if (value !== null) this.$nextTick(() => this.$el.querySelector('.vp-photos__large')?.focus())
    }
  },
  mounted() {
    this.find()
  },
  computed: {
    style() {
      const count = Math.max(1, Math.min(8, Math.round(Number(this.columns) || 1)))
      return {
        '--vp-photos-columns': count,
        '--vp-photos-shape': this.shape || undefined,
        '--vp-photos-gap': this.gap || undefined,
        '--vp-photos-radius': this.radius || undefined
      }
    }
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
      for (const image of this.images || []) {
        if (!/^--/.test(image.src)) continue
        const address = /^\\s*url\\(\\s*(['"]?)(.*?)\\1\\s*\\)\\s*$/.exec(style.getPropertyValue(image.src))
        if (address) found[image.src] = address[2]
      }
      this.found = found
    },
    show(index) {
      if (this.zoom) this.large = index
    },
    turn(by) {
      const count = this.images.length
      if (this.large !== null && count) this.large = (this.large + by + count) % count
    }
  }
}
<\/script>
<style>
.vp-photos {
  box-sizing: border-box;
  display: grid;
  /* as many columns as asked for while each keeps a width worth looking at, fewer when not */
  grid-template-columns: repeat(auto-fill, minmax(max(8rem, calc((100% - (var(--vp-photos-columns) - 1) * var(--vp-photos-gap, 0.75rem)) / var(--vp-photos-columns))), 1fr));
  gap: var(--vp-photos-gap, 0.75rem);
  width: 100%;
  min-width: 0;
}
.vp-photos__item { min-width: 0; margin: 0; }
.vp-photos__image {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: auto;
  aspect-ratio: var(--vp-photos-shape, 1 / 1);
  object-fit: cover;
  border-radius: var(--vp-photos-radius, var(--vp-radius, 8px));
  background: var(--vp-surface, rgba(127, 127, 127, 0.12));
}
.vp-photos--zoom .vp-photos__image { cursor: zoom-in; transition: filter 140ms ease; }
.vp-photos--zoom .vp-photos__image:hover { filter: brightness(0.92); }
.vp-photos--zoom .vp-photos__image:focus-visible { outline: 2px solid var(--vp-primary, #2563eb); outline-offset: 2px; }
.vp-photos__caption { margin-top: 0.4rem; font-size: 0.875rem; opacity: 0.7; }
.vp-photos__empty {
  grid-column: 1 / -1;
  padding: 2.5rem 1rem;
  border: 1px dashed var(--vp-border, rgba(127, 127, 127, 0.4));
  border-radius: var(--vp-radius, 8px);
  text-align: center;
  opacity: 0.6;
}
.vp-photos__large {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(0.75rem, 4vw, 3rem);
  background: rgba(0, 0, 0, 0.86);
  cursor: zoom-out;
  outline: none;
}
.vp-photos__shown { max-width: 100%; max-height: 100%; border-radius: 6px; object-fit: contain; }
.vp-photos__turn {
  position: absolute;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  margin: -1.375rem 0 0;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
  cursor: pointer;
}
.vp-photos__turn:hover { background: rgba(255, 255, 255, 0.26); }
.vp-photos__turn svg { width: 1.25rem; height: 1.25rem; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.vp-photos__turn--back { left: clamp(0.5rem, 2vw, 1.5rem); }
.vp-photos__turn--on { right: clamp(0.5rem, 2vw, 1.5rem); }
</style>
`;export{e as default};