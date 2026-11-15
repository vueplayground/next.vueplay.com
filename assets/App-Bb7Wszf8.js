var e=`<template>
  <div class="vp-product-details" :class="'vp-product-details--' + layout" :style="style">
    <div class="vp-product-details__pictures">
      <div class="vp-product-details__main">
        <img v-if="pictures[shownPicture]" :src="pictures[shownPicture]" :alt="product.title">
        <span v-else class="vp-product-details__none">{{ (product.title || '?').charAt(0) }}</span>
        <span v-if="onSale" class="vp-product-details__sale">{{ saleText }}</span>
      </div>
      <div v-if="pictures.length > 1" class="vp-product-details__thumbs">
        <button v-for="(src, i) in pictures" :key="src + i" type="button" class="vp-product-details__thumb" :class="{ 'vp-product-details__thumb--on': i === shownPicture }" :aria-label="'Picture ' + (i + 1)" @click="shownPicture = i">
          <img :src="src" alt="">
        </button>
      </div>
    </div>

    <div class="vp-product-details__words">
      <p v-if="kicker" class="vp-product-details__kicker">{{ kicker }}</p>
      <h1 class="vp-product-details__title">{{ product.title }}</h1>
      <p class="vp-product-details__price">
        <span>{{ price(chosenPrice) }}</span>
        <s v-if="onSale">{{ price(product.compare) }}</s>
      </p>

      <!-- the kinds there are (sizes, colours): each a button; one that is sold out cannot be chosen -->
      <div v-if="kinds.length > 1" class="vp-product-details__kinds" role="group" :aria-label="variantLabel">
        <span class="vp-product-details__label">{{ variantLabel }}</span>
        <div class="vp-product-details__choices">
          <button
            v-for="(one, i) in kinds"
            :key="one.id || i"
            type="button"
            class="vp-product-details__choice"
            :class="{ 'vp-product-details__choice--on': i === chosen, 'vp-product-details__choice--out': !one.available }"
            :disabled="!one.available"
            :aria-pressed="i === chosen ? 'true' : 'false'"
            @click="chosen = i"
          >{{ one.title }}</button>
        </div>
      </div>

      <div class="vp-product-details__buy">
        <div class="vp-product-details__quantity" role="group" :aria-label="quantityLabel">
          <button type="button" :aria-label="'One less'" :disabled="quantity <= 1" @click="quantity--">−</button>
          <input v-model.number="quantity" type="number" min="1" max="99" :aria-label="quantityLabel">
          <button type="button" :aria-label="'One more'" @click="quantity = Math.min(99, quantity + 1)">+</button>
        </div>
        <button type="button" class="vp-product-details__add" :disabled="!canBuy" @click="add">
          <svg v-if="added" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
          {{ !variant.available ? soldOutText : added ? addedText : addText }}
        </button>
      </div>
      <button v-if="buyNow" type="button" class="vp-product-details__now" :disabled="!canBuy" @click="now">{{ buyNowText }}</button>

      <div v-if="product.description" class="vp-product-details__about">
        <p v-if="!drawn" class="vp-product-details__plain">{{ plainDescription }}</p>
        <div ref="about" class="vp-product-details__drawn" />
      </div>
      <p v-else-if="product.text" class="vp-product-details__about">{{ product.text }}</p>
      <slot />
    </div>
  </div>
</template>
<script>
// One product: its pictures (a large one and the others to pick), its name, price and the price before, the kinds
// there are (sizes, colours: Shopify's variants or your own list), how many, and Add to cart (or Buy now, straight
// to checkout). Made for the page of each product: show each setting from the product's query with the plug.
// What is put inside it comes under the description. In the editor, nothing set shows a sample.
const SAMPLE = { id: 's1', title: 'Linen shirt', price: 590, compare: 790, currency: 'EUR', text: 'Woven in Portugal from European flax. Light, cool and softer with every wash.' }

export default {
  inject: { vpData: { default: null } },
  props: {
    title: { type: String, default: '', label: 'Name' },
    price: { type: Number, default: null, label: 'Price', control: 'number' },
    compare: { type: Number, default: null, label: 'Price before (on sale)', control: 'number' },
    currency: { type: String, default: '', label: 'Currency', placeholder: 'EUR' },
    id: { type: String, default: '', label: 'What goes in the cart (its id)' },
    image: { type: String, default: '', label: 'Picture', control: 'media' },
    images: { type: Array, default: () => [], label: 'More pictures', control: 'list', fields: [{ key: 'src', label: 'Picture', control: 'media' }] },
    description: { type: String, default: '', label: 'Description (as the shop wrote it, HTML)', control: 'textarea' },
    text: { type: String, default: '', label: 'Description (words)', control: 'textarea' },
    variants: {
      type: Array,
      default: () => [],
      label: 'Kinds (sizes, colours)',
      control: 'list',
      fields: [{ key: 'title', label: 'Name', placeholder: 'M / Blue' }, { key: 'id', label: 'Its id (for the cart)' }, { key: 'price', label: 'Its price (when another)', control: 'number' }, { key: 'available', label: 'In stock', control: 'boolean', default: true }]
    },
    kicker: { type: String, default: '', label: 'A word over the name', placeholder: 'New in' },
    variantLabel: { type: String, default: 'Choose', label: 'Over the kinds' },
    quantityLabel: { type: String, default: 'How many', label: 'How many' },
    addText: { type: String, default: 'Add to cart', label: 'Add to cart' },
    addedText: { type: String, default: 'Added to the cart', label: 'Said when added' },
    soldOutText: { type: String, default: 'Sold out', label: 'Said when sold out' },
    buyNow: { type: Boolean, default: false, label: 'A Buy now button (straight to paying)' },
    buyNowText: { type: String, default: 'Buy now', label: 'Its text' },
    saleText: { type: String, default: 'Sale', label: 'Word when on sale' },
    layout: { type: String, default: 'side', label: 'Layout', control: 'select', options: [{ key: 'Pictures beside the words', value: 'side' }, { key: 'Pictures above the words', value: 'stacked' }] },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 40 }
  },
  emits: ['added'],
  data() {
    return { chosen: 0, quantity: 1, shownPicture: 0, added: false, drawn: false }
  },
  computed: {
    inStudio() {
      return typeof document !== 'undefined' && (!!document.getElementById('receiver') || !!window.studio)
    },
    product() {
      const own = { id: this.id, title: this.title, price: this.price, compare: this.compare, currency: this.currency, description: this.description, text: this.text }
      return !this.title && this.inStudio ? { ...SAMPLE, ...Object.fromEntries(Object.entries(own).filter(([, v]) => v !== '' && v !== null && v !== undefined)) } : own
    },
    pictures() {
      const list = [this.image, ...(Array.isArray(this.images) ? this.images : []).map(one => typeof one === 'string' ? one : one?.src || one?.url || '')]
      return [...new Set(list.filter(Boolean))]
    },
    // A variant from Shopify ({ id, title, price: { amount }, availableForSale }) or from the list here
    kinds() {
      return (Array.isArray(this.variants) ? this.variants : []).map(one => ({
        id: String(one?.id ?? ''),
        title: one?.title || '',
        price: one?.price?.amount ?? one?.price ?? '',
        available: one?.availableForSale ?? one?.available ?? true
      }))
    },
    variant() {
      return this.kinds[this.chosen] || { id: this.product.id, title: '', price: '', available: true }
    },
    chosenPrice() {
      return this.variant.price !== '' && this.variant.price !== undefined && this.variant.price !== null ? this.variant.price : this.product.price
    },
    onSale() {
      return Number(this.product.compare) > Number(this.chosenPrice)
    },
    // (the description's words, until it is drawn: on the server, and for a moment in the browser)
    plainDescription() {
      return String(this.product.description || '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\\s+/g, ' ').trim()
    },
    canBuy() {
      return this.variant.available && (!!(this.variant.id || this.product.id) || this.inStudio)
    },
    style() {
      return { '--vp-product-details-radius': this.radius || undefined }
    }
  },
  watch: {
    'product.description'() { this.$nextTick(() => this.drawDescription()) },
    kinds: { immediate: true, handler(list) { const first = list.findIndex(one => one.available); this.chosen = first < 0 ? 0 : first } },
    pictures() { this.shownPicture = 0 }
  },
  mounted() {
    this.drawDescription()
  },
  methods: {
    // The shop's description, made again of elements from a short list (never read as HTML: what is not on the list
    // stays as its words), so a description cannot run anything on the page
    drawDescription() {
      const box = this.$refs.about
      if (!box || typeof DOMParser !== 'function' || !this.product.description) return
      const OK = ['P', 'BR', 'STRONG', 'B', 'EM', 'I', 'U', 'UL', 'OL', 'LI', 'H2', 'H3', 'H4', 'BLOCKQUOTE', 'A', 'SPAN', 'DIV', 'TABLE', 'TBODY', 'TR', 'TD', 'TH']
      const copy = (from, to) => {
        for (const node of from.childNodes) {
          if (node.nodeType === 3) to.appendChild(document.createTextNode(node.textContent))
          else if (node.nodeType === 1) {
            if (!OK.includes(node.tagName)) { copy(node, to); continue }
            const el = document.createElement(node.tagName.toLowerCase())
            const href = node.tagName === 'A' ? node.getAttribute('href') || '' : ''
            if (href && /^(https?:|\\/|#)/i.test(href)) { el.setAttribute('href', href); el.setAttribute('rel', 'noopener') }
            copy(node, el)
            to.appendChild(el)
          }
        }
      }
      const parsed = new DOMParser().parseFromString(String(this.product.description), 'text/html')
      box.replaceChildren()
      copy(parsed.body, box)
      this.drawn = true
    },
    price(amount) {
      if (this.vpData?.money) return this.vpData.money(amount, this.product.currency)
      const value = Number(amount) || 0
      try { return this.product.currency ? value.toLocaleString(undefined, { style: 'currency', currency: this.product.currency }) : value.toFixed(2) } catch (e) { return value.toFixed(2) }
    },
    line() {
      return {
        id: this.variant.id || this.product.id,
        title: this.product.title + (this.kinds.length > 1 && this.variant.title ? ' · ' + this.variant.title : ''),
        price: Number(this.chosenPrice) || 0,
        currency: this.product.currency,
        image: this.pictures[0] || ''
      }
    },
    add() {
      const quantity = Math.max(1, Math.min(99, Math.round(Number(this.quantity) || 1)))
      if (!this.inStudio) this.vpData?.addToCart?.(this.line(), quantity)
      this.$emit('added', this.line())
      this.added = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => { this.added = false }, 1800)
    },
    async now() {
      if (this.inStudio) return
      this.vpData?.addToCart?.(this.line(), Math.max(1, Math.round(Number(this.quantity) || 1)), { open: false })
      await this.vpData?.checkout?.()
    }
  },
  beforeUnmount() {
    clearTimeout(this.timer)
  }
}
<\/script>
<style>
.vp-product-details {
  --_radius: var(--vp-product-details-radius, var(--vp-radius, 12px));
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: clamp(1.5rem, 5vw, 4rem);
  align-items: start;
  width: 100%;
}
.vp-product-details--stacked { grid-template-columns: minmax(0, 1fr); max-width: 44rem; margin: 0 auto; }
@media (max-width: 760px) { .vp-product-details { grid-template-columns: minmax(0, 1fr); } }
.vp-product-details__pictures { display: flex; flex-direction: column; gap: 0.75rem; }
.vp-product-details__main { position: relative; overflow: hidden; aspect-ratio: 4 / 5; border-radius: var(--_radius); background: var(--vp-surface, #f4f4f5); }
.vp-product-details__main img { width: 100%; height: 100%; object-fit: cover; }
.vp-product-details__none { display: grid; place-items: center; width: 100%; height: 100%; background: linear-gradient(140deg, #fde2d1, #f6b8c6); color: #8a3f52; font-size: 4rem; font-weight: 700; }
.vp-product-details__sale { position: absolute; top: 1rem; left: 1rem; padding: 0.3rem 0.75rem; border-radius: 999px; background: #dc2626; color: #fff; font-size: 0.8rem; font-weight: 650; }
.vp-product-details__thumbs { display: flex; gap: 0.5rem; overflow-x: auto; }
.vp-product-details__thumb { flex: none; width: 4.5rem; aspect-ratio: 1; padding: 0; overflow: hidden; border: 2px solid transparent; border-radius: calc(var(--_radius) - 4px); background: none; cursor: pointer; opacity: 0.7; transition: opacity 150ms ease, border-color 150ms ease; }
.vp-product-details__thumb img { width: 100%; height: 100%; object-fit: cover; }
.vp-product-details__thumb--on, .vp-product-details__thumb:hover { opacity: 1; border-color: var(--vp-primary, #2563eb); }
.vp-product-details__words { display: flex; flex-direction: column; gap: 1.1rem; }
.vp-product-details__kicker { margin: 0; font-size: 0.8rem; font-weight: 650; letter-spacing: 0.08em; text-transform: uppercase; color: var(--vp-primary, #2563eb); }
.vp-product-details__title { margin: 0; font-family: var(--vp-heading, inherit); font-size: clamp(1.8rem, 4vw, 2.6rem); line-height: 1.1; }
.vp-product-details__price { display: flex; gap: 0.75rem; align-items: baseline; margin: 0; font-size: 1.35rem; font-weight: 600; }
.vp-product-details__price s { font-size: 1rem; font-weight: 400; opacity: 0.55; }
.vp-product-details__label { display: block; margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 600; }
.vp-product-details__choices { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.vp-product-details__choice {
  min-width: 3rem;
  padding: 0.55rem 0.9rem;
  border: 1.5px solid var(--vp-border, rgba(127, 127, 127, 0.35));
  border-radius: calc(var(--_radius) - 4px);
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 0.9rem;
  cursor: pointer;
  transition: border-color 150ms ease, background 150ms ease;
}
.vp-product-details__choice:hover:not(:disabled) { border-color: currentColor; }
.vp-product-details__choice--on { border-color: var(--vp-primary, #2563eb); background: color-mix(in srgb, var(--vp-primary, #2563eb) 10%, transparent); font-weight: 600; }
.vp-product-details__choice--out { opacity: 0.4; text-decoration: line-through; cursor: not-allowed; }
.vp-product-details__buy { display: flex; gap: 0.75rem; flex-wrap: wrap; }
.vp-product-details__quantity { display: inline-flex; align-items: center; border: 1.5px solid var(--vp-border, rgba(127, 127, 127, 0.35)); border-radius: var(--vp-radius, 8px); }
.vp-product-details__quantity button { width: 2.6rem; height: 3rem; border: 0; background: none; color: inherit; font: inherit; font-size: 1.15rem; cursor: pointer; }
.vp-product-details__quantity button:disabled { opacity: 0.35; cursor: default; }
.vp-product-details__quantity input { width: 2.6rem; border: 0; background: none; color: inherit; font: inherit; text-align: center; -moz-appearance: textfield; }
.vp-product-details__quantity input::-webkit-inner-spin-button { -webkit-appearance: none; }
.vp-product-details__add, .vp-product-details__now {
  display: inline-flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-width: 12rem;
  min-height: 3rem;
  padding: 0 1.5rem;
  border: 0;
  border-radius: var(--vp-radius, 8px);
  background: var(--vp-primary, #2563eb);
  color: var(--vp-primary-contrast, #fff);
  font: inherit;
  font-weight: 650;
  cursor: pointer;
  transition: filter 150ms ease, transform 150ms ease;
}
.vp-product-details__now { flex: none; width: 100%; background: transparent; color: inherit; box-shadow: inset 0 0 0 1.5px currentColor; }
.vp-product-details__add:hover:not(:disabled) { filter: brightness(1.08); }
.vp-product-details__add:active:not(:disabled) { transform: translateY(1px); }
.vp-product-details__add:disabled, .vp-product-details__now:disabled { opacity: 0.5; cursor: not-allowed; }
.vp-product-details__add svg { width: 1.1rem; height: 1.1rem; fill: none; stroke: currentColor; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
.vp-product-details__about { margin: 0.5rem 0 0; padding-top: 1.25rem; border-top: 1px solid var(--vp-border, rgba(127, 127, 127, 0.2)); line-height: 1.7; }
.vp-product-details__about img { max-width: 100%; height: auto; }
.vp-product-details__plain { margin: 0; }
.vp-product-details__drawn > :first-child { margin-top: 0; }
</style>
`;export{e as default};