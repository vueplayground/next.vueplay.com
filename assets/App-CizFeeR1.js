var e=`<template>
  <div class="vp-product-grid" :class="['vp-product-grid--' + look, 'vp-product-grid--' + align]" :style="style">
    <p v-if="!shown.length" class="vp-product-grid__empty">{{ emptyText }}</p>
    <article v-for="(item, i) in shown" :key="item.id || i" class="vp-product-grid__item">
      <a class="vp-product-grid__picture" :href="item.href || undefined" @click="go($event, item.href)">
        <img v-if="item.image" :src="item.image" :alt="item.title" loading="lazy">
        <span v-else class="vp-product-grid__none" :style="{ '--vp-product-grid-hue': (i * 47) % 360 }">{{ (item.title || '?').charAt(0) }}</span>
        <span v-if="item.badge || onSale(item)" class="vp-product-grid__badge" :class="{ 'vp-product-grid__badge--sale': onSale(item) && !item.badge }">{{ item.badge || saleText }}</span>
      </a>
      <div class="vp-product-grid__words">
        <h3 class="vp-product-grid__title"><a :href="item.href || undefined" @click="go($event, item.href)">{{ item.title }}</a></h3>
        <p v-if="showText && item.text" class="vp-product-grid__text">{{ item.text }}</p>
        <p class="vp-product-grid__price">
          <span>{{ price(item.price, item.currency) }}</span>
          <s v-if="onSale(item)">{{ price(item.compare, item.currency) }}</s>
        </p>
      </div>
      <button v-if="addButton" type="button" class="vp-product-grid__add" :class="{ 'vp-product-grid__add--done': added === i }" :disabled="!item.id && !inStudio" @click="add(item, i)">
        <svg v-if="added === i" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
        {{ added === i ? addedText : addText }}
      </button>
    </article>
  </div>
</template>
<script>
// Products in a grid: a picture, a name, a price (and the price before, when it is on sale), and a button that puts
// it in the cart. Fill the list by hand, or show it from your shop with the plug (Shopify, WooCommerce, your API):
// \`id\` is what goes in the cart (a Shopify variant, a WooCommerce product). In the editor an empty list shows samples.
const SAMPLES = [
  { id: 's1', title: 'Linen shirt', price: 590, compare: 790, currency: 'EUR', href: '#', text: 'Light and cool' },
  { id: 's2', title: 'Wool cap', price: 290, currency: 'EUR', href: '#', badge: 'New' },
  { id: 's3', title: 'Canvas bag', price: 450, currency: 'EUR', href: '#' },
  { id: 's4', title: 'Leather belt', price: 650, currency: 'EUR', href: '#' }
]

export default {
  inject: { vpData: { default: null } },
  props: {
    items: {
      type: Array,
      default: () => [],
      label: 'Products',
      control: 'list',
      fields: [
        { key: 'title', label: 'Name' },
        { key: 'price', label: 'Price', control: 'number' },
        { key: 'compare', label: 'Price before (on sale)', control: 'number' },
        { key: 'currency', label: 'Currency', placeholder: 'EUR' },
        { key: 'image', label: 'Picture', control: 'media' },
        { key: 'href', label: 'Its page', placeholder: '/products/shirt' },
        { key: 'id', label: 'What goes in the cart (its id)' },
        { key: 'badge', label: 'A word on the picture', placeholder: 'New' },
        { key: 'text', label: 'A line about it' }
      ]
    },
    columns: { type: Number, default: 4, label: 'Side by side', control: 'number', min: 1, max: 6 },
    phoneColumns: { type: Number, default: 2, label: 'Side by side on a phone', control: 'number', min: 1, max: 3 },
    limit: { type: Number, default: 0, label: 'At most (0 for all)', control: 'number', min: 0, max: 100 },
    look: { type: String, default: 'plain', label: 'Look', control: 'select', options: [{ key: 'Plain', value: 'plain' }, { key: 'Cards', value: 'cards' }, { key: 'Pictures first, words over them', value: 'over' }] },
    align: { type: String, default: 'start', label: 'Words', control: 'select', options: [{ key: 'At the start', value: 'start' }, { key: 'In the middle', value: 'center' }] },
    ratio: { type: String, default: '4 / 5', label: 'Shape of the pictures', control: 'select', options: [{ key: 'Square', value: '1 / 1' }, { key: 'Tall', value: '4 / 5' }, { key: 'Taller', value: '3 / 4' }, { key: 'Wide', value: '4 / 3' }] },
    showText: { type: Boolean, default: false, label: 'Show the line about it' },
    addButton: { type: Boolean, default: true, label: 'A button to add it to the cart' },
    addText: { type: String, default: 'Add to cart', label: 'Its text' },
    addedText: { type: String, default: 'Added', label: 'Said when added' },
    saleText: { type: String, default: 'Sale', label: 'Word when on sale' },
    currency: { type: String, default: '', label: 'Currency (when the products do not say)', placeholder: 'EUR' },
    emptyText: { type: String, default: 'Nothing here yet.', label: 'Said when there are none' },
    gap: { type: String, default: '', label: 'Space between', control: 'slider', unit: 'px', min: 0, max: 64 },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 40 }
  },
  data() {
    return { added: -1 }
  },
  computed: {
    inStudio() {
      return typeof document !== 'undefined' && (!!document.getElementById('receiver') || !!window.studio)
    },
    shown() {
      const list = Array.isArray(this.items) && this.items.length ? this.items : this.inStudio ? SAMPLES : []
      return Number(this.limit) > 0 ? list.slice(0, Number(this.limit)) : list
    },
    style() {
      return {
        '--vp-product-grid-columns': Math.max(1, Math.min(6, Number(this.columns) || 4)),
        '--vp-product-grid-phone': Math.max(1, Math.min(3, Number(this.phoneColumns) || 2)),
        '--vp-product-grid-ratio': this.ratio,
        '--vp-product-grid-gap': this.gap || undefined,
        '--vp-product-grid-radius': this.radius || undefined
      }
    }
  },
  methods: {
    onSale(item) {
      return Number(item.compare) > Number(item.price)
    },
    price(amount, currency) {
      const code = currency || this.currency
      if (this.vpData?.money) return this.vpData.money(amount, code)
      const value = Number(amount) || 0
      try { return code ? value.toLocaleString(undefined, { style: 'currency', currency: code }) : value.toFixed(2) } catch (e) { return value.toFixed(2) + ' ' + code }
    },
    add(item, i) {
      if (!this.inStudio) this.vpData?.addToCart?.({ id: item.id, title: item.title, price: Number(item.price) || 0, currency: item.currency || this.currency, image: item.image, href: item.href })
      this.added = i
      clearTimeout(this.timer)
      this.timer = setTimeout(() => { this.added = -1 }, 1600)
    },
    go(event, href) {
      if (this.inStudio) { event.preventDefault(); return }
      if (this.$router && String(href || '').startsWith('/')) { event.preventDefault(); this.$router.push(href) }
    }
  },
  beforeUnmount() {
    clearTimeout(this.timer)
  }
}
<\/script>
<style>
.vp-product-grid {
  --_gap: var(--vp-product-grid-gap, clamp(1rem, 2.5vw, 1.75rem));
  --_radius: var(--vp-product-grid-radius, var(--vp-radius, 12px));
  display: grid;
  grid-template-columns: repeat(var(--vp-product-grid-columns, 4), minmax(0, 1fr));
  gap: calc(var(--_gap) * 1.4) var(--_gap);
  width: 100%;
}
@media (max-width: 900px) { .vp-product-grid { grid-template-columns: repeat(min(var(--vp-product-grid-columns, 4), 3), minmax(0, 1fr)); } }
@media (max-width: 600px) { .vp-product-grid { grid-template-columns: repeat(var(--vp-product-grid-phone, 2), minmax(0, 1fr)); } }
.vp-product-grid__empty { grid-column: 1 / -1; margin: 0; padding: 2rem; text-align: center; opacity: 0.6; }
.vp-product-grid__item { position: relative; display: flex; flex-direction: column; gap: 0.75rem; min-width: 0; }
.vp-product-grid--center .vp-product-grid__item { text-align: center; }
.vp-product-grid--cards .vp-product-grid__item { padding: 0.75rem 0.75rem 1rem; border: 1px solid var(--vp-border, rgba(127, 127, 127, 0.2)); border-radius: calc(var(--_radius) + 4px); background: var(--vp-surface, transparent); }
.vp-product-grid__picture {
  position: relative;
  display: block;
  overflow: hidden;
  aspect-ratio: var(--vp-product-grid-ratio, 4 / 5);
  border-radius: var(--_radius);
  background: var(--vp-surface, #f4f4f5);
}
.vp-product-grid__picture img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1); }
.vp-product-grid__item:hover .vp-product-grid__picture img { transform: scale(1.04); }
.vp-product-grid__none {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(140deg, hsl(var(--vp-product-grid-hue, 0) 55% 88%), hsl(calc(var(--vp-product-grid-hue, 0) + 40) 60% 78%));
  color: hsl(var(--vp-product-grid-hue, 0) 35% 35%);
  font-size: 2.5rem;
  font-weight: 700;
}
.vp-product-grid__badge {
  position: absolute;
  top: 0.65rem;
  left: 0.65rem;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  background: var(--vp-background, #fff);
  color: var(--vp-text, #111827);
  font-size: 0.75rem;
  font-weight: 650;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.vp-product-grid__badge--sale { background: #dc2626; color: #fff; }
.vp-product-grid__words { display: flex; flex-direction: column; gap: 0.25rem; }
.vp-product-grid--over .vp-product-grid__words { position: absolute; left: 0.75rem; right: 0.75rem; bottom: 3.75rem; padding: 0.65rem 0.8rem; border-radius: calc(var(--_radius) - 2px); background: color-mix(in srgb, var(--vp-background, #fff) 88%, transparent); backdrop-filter: blur(8px); }
.vp-product-grid__title { margin: 0; font-size: 1rem; font-weight: 600; line-height: 1.35; }
.vp-product-grid__title a { color: inherit; text-decoration: none; }
.vp-product-grid__title a:hover { text-decoration: underline; text-underline-offset: 3px; }
.vp-product-grid__text { margin: 0; font-size: 0.875rem; opacity: 0.7; }
.vp-product-grid__price { display: flex; gap: 0.5rem; align-items: baseline; margin: 0; font-weight: 600; }
.vp-product-grid--center .vp-product-grid__price { justify-content: center; }
.vp-product-grid__price s { font-weight: 400; opacity: 0.55; font-size: 0.875rem; }
.vp-product-grid__add {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  margin-top: auto;
  padding: 0.65em 1em;
  border: 1.5px solid currentColor;
  border-radius: var(--vp-radius, 8px);
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 150ms ease, color 150ms ease, border-color 150ms ease;
}
.vp-product-grid__add:hover:not(:disabled), .vp-product-grid__add--done { border-color: var(--vp-primary, #2563eb); background: var(--vp-primary, #2563eb); color: var(--vp-primary-contrast, #fff); }
.vp-product-grid__add:disabled { opacity: 0.45; cursor: default; }
.vp-product-grid__add svg { width: 1rem; height: 1rem; fill: none; stroke: currentColor; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
@media (prefers-reduced-motion: reduce) { .vp-product-grid__picture img { transition: none; } }
</style>
`;export{e as default};