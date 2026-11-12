var e=`<template>
  <div class="vp-logos" :class="{ 'vp-logos--grey': grey }" :style="style">
    <div v-if="title" class="vp-logos__title">{{ title }}</div>
    <div class="vp-logos__row">
      <component :is="logo.href ? 'a' : 'span'" v-for="(logo, index) in logos" :key="index" class="vp-logos__item" :href="logo.href || undefined" :target="logo.href ? '_blank' : undefined" :rel="logo.href ? 'noopener' : undefined">
        <img v-if="logo.src" class="vp-logos__image" :src="address(logo.src) || undefined" :style="held(logo.src)" :alt="logo.name || ''" loading="lazy">
        <span v-else class="vp-logos__name">{{ logo.name || 'Logo' }}</span>
      </component>
    </div>
  </div>
</template>
<script>
// A row of logos: who you work with, where you were written about. One without a picture shows its name.
// (A picture picked in the Studio is the name of a variable that holds it, like --image-boat: it is shown
// through that variable at once, and its address is read from it when the page is alive. An address is used as it is.)
export default {
  props: {
    title: { type: String, default: 'Trusted by', label: 'Line above' },
    logos: {
      type: Array,
      default: () => [{ src: '', name: 'Northwind', href: '' }, { src: '', name: 'Fjord & Co', href: '' }, { src: '', name: 'Lumen', href: '' }, { src: '', name: 'Kite', href: '' }],
      label: 'Logos',
      control: 'list',
      fields: [{ key: 'src', label: 'Logo', control: 'media' }, { key: 'name', label: 'Name' }, { key: 'href', label: 'Link', placeholder: 'https://…' }]
    },
    height: { type: String, default: '', label: 'Height', control: 'slider', unit: 'px', min: 16, max: 120 },
    gap: { type: String, default: '', label: 'Space between', control: 'slider', unit: 'px', min: 8, max: 120 },
    grey: { type: Boolean, default: true, label: 'In grey until pointed at' }
  },
  data() {
    return { found: {} }
  },
  computed: {
    style() {
      return { '--vp-logos-height': this.height || undefined, '--vp-logos-gap': this.gap || undefined }
    }
  },
  watch: {
    logos: {
      deep: true,
      handler() {
        this.find()
      }
    }
  },
  mounted() {
    this.find()
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
      for (const logo of this.logos || []) {
        if (!/^--/.test(logo.src)) continue
        const address = /^\\s*url\\(\\s*(['"]?)(.*?)\\1\\s*\\)\\s*$/.exec(style.getPropertyValue(logo.src))
        if (address) found[logo.src] = address[2]
      }
      this.found = found
    }
  }
}
<\/script>
<style>
.vp-logos { box-sizing: border-box; width: 100%; text-align: center; }
.vp-logos__title { margin-bottom: 1.25rem; font-size: 0.85rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--vp-muted, #6b7280); }
.vp-logos__row { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 1.25rem var(--vp-logos-gap, clamp(1.5rem, 5vw, 3.5rem)); }
.vp-logos__item { display: inline-flex; align-items: center; color: inherit; text-decoration: none; transition: filter 150ms ease, opacity 150ms ease; }
.vp-logos__image { display: block; height: var(--vp-logos-height, 36px); width: auto; max-width: 180px; object-fit: contain; }
.vp-logos__name { font-family: var(--vp-font-heading, inherit); font-size: calc(var(--vp-logos-height, 36px) * 0.6); font-weight: 700; letter-spacing: -0.01em; white-space: nowrap; }
.vp-logos--grey .vp-logos__item { filter: grayscale(1); opacity: 0.6; }
.vp-logos--grey .vp-logos__item:hover { filter: none; opacity: 1; }
</style>
`;export{e as default};