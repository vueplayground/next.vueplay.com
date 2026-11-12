var e=`<template>
  <article class="vp-product" :class="{ 'vp-product--row': row }" :style="style">
    <component :is="href ? 'a' : 'div'" class="vp-product__picture" :href="href || undefined" @click="go">
      <img v-if="image" class="vp-product__image" :src="picture || undefined" :style="held" :alt="name" loading="lazy">
      <span v-if="badge" class="vp-product__badge">{{ badge }}</span>
    </component>
    <div class="vp-product__body">
      <div v-if="seller" class="vp-product__seller">{{ seller }}</div>
      <component :is="href ? 'a' : 'div'" class="vp-product__name" :href="href || undefined" @click="go">{{ name }}</component>
      <div v-if="stars > 0" class="vp-product__stars" role="img" :aria-label="stars + ' of 5 stars'">
        <svg v-for="n in 5" :key="n" viewBox="0 0 24 24" aria-hidden="true" :class="{ 'vp-product__star--on': n <= Math.round(stars) }"><path d="M12 3.500l2.600 5.300 5.900.900-4.300 4.100 1 5.800-5.200-2.700-5.200 2.700 1-5.800-4.300-4.100 5.900-.900z" /></svg>
      </div>
      <p v-if="text" class="vp-product__text">{{ text }}</p>
      <div class="vp-product__foot">
        <div class="vp-product__prices">
          <span v-if="price" class="vp-product__price">{{ price }}</span>
          <s v-if="was" class="vp-product__was">{{ was }}</s>
        </div>
        <button v-if="button" type="button" class="vp-product__button" @click="pick">{{ button }}</button>
      </div>
    </div>
  </article>
</template>
<script>
// One thing for sale: its picture, name, price and a button. The button tells the page (@pick) and goes to
// the link where there is one; the page decides what picking means (a cart, a checkout, a message).
// (A picture picked in the Studio is the name of a variable that holds it, like --image-boat: it is shown
// through that variable at once, and its address is read from it when the page is alive. An address is used as it is.)
export default {
  emits: ['pick'],
  props: {
    image: { type: String, default: '', label: 'Picture', control: 'media' },
    name: { type: String, default: 'Product name', label: 'Name' },
    price: { type: String, default: '$49', label: 'Price' },
    was: { type: String, default: '', label: 'Price before', placeholder: '$69' },
    text: { type: String, default: '', label: 'Text', control: 'textarea' },
    seller: { type: String, default: '', label: 'Seller or brand' },
    badge: { type: String, default: '', label: 'Badge', placeholder: 'New, Sale, -20 %' },
    stars: { type: Number, default: 0, label: 'Stars (0: none)', control: 'number', min: 0, max: 5 },
    button: { type: String, default: 'Add to cart', label: 'Button text' },
    href: { type: String, default: '', label: 'Link', placeholder: '/page, #anchor or https://…' },
    shape: {
      type: String,
      default: '1 / 1',
      label: 'Picture shape',
      options: [{ key: 'Square', value: '1 / 1' }, { key: 'Photo (4:3)', value: '4 / 3' }, { key: 'Tall (3:4)', value: '3 / 4' }, { key: 'Wide (16:9)', value: '16 / 9' }]
    },
    row: { type: Boolean, default: false, label: 'Picture beside the text' },
    color: { type: String, default: '', label: 'Button color', control: 'color' },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 40 }
  },
  data() {
    return { found: '' }
  },
  computed: {
    named() {
      return /^--/.test(this.image)
    },
    picture() {
      return this.named ? this.found : this.image
    },
    held() {
      return this.named && !this.found ? { content: 'var(' + this.image + ')' } : undefined
    },
    style() {
      return {
        '--vp-product-shape': this.shape || undefined,
        '--vp-product-color': this.color || undefined,
        '--vp-product-radius': this.radius || undefined
      }
    }
  },
  watch: {
    image() {
      this.find()
    }
  },
  mounted() {
    this.find()
  },
  methods: {
    find() {
      const value = this.named && this.$el && this.$el.nodeType === 1 ? getComputedStyle(this.$el).getPropertyValue(this.image) : ''
      const address = /^\\s*url\\(\\s*(['"]?)(.*?)\\1\\s*\\)\\s*$/.exec(value)
      this.found = address ? address[2] : ''
    },
    pick(event) {
      this.$emit('pick', { name: this.name, price: this.price, href: this.href })
      if (!this.href) return
      if (this.$router && /^\\/(?!\\/)/.test(this.href)) this.$router.push(this.href)
      else window.location.href = this.href
    },
    // A page of the site is shown by the site's router where there is one, without loading the site again
    go(event) {
      const router = this.$router
      if (!router || !this.href || !/^\\/(?!\\/)/.test(this.href)) return
      if (event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      event.preventDefault()
      router.push(this.href)
    }
  }
}
<\/script>
<style>
.vp-product { box-sizing: border-box; display: flex; flex-direction: column; width: 100%; height: 100%; overflow: hidden; border: 1px solid var(--vp-border, #e5e7eb); border-radius: var(--vp-product-radius, var(--vp-radius, 12px)); background: var(--vp-card, var(--vp-background, #fff)); color: var(--vp-text, #111827); text-align: left; }
.vp-product--row { flex-direction: row; }
.vp-product__picture { position: relative; display: block; flex: none; aspect-ratio: var(--vp-product-shape, 1 / 1); overflow: hidden; background: var(--vp-surface, #f3f4f6); }
.vp-product--row .vp-product__picture { width: 40%; max-width: 260px; aspect-ratio: auto; min-height: 140px; }
.vp-product__image { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform 300ms ease; }
.vp-product:hover .vp-product__image { transform: scale(1.04); }
.vp-product__badge { position: absolute; top: 0.75rem; left: 0.75rem; padding: 0.25em 0.7em; border-radius: 999px; background: var(--vp-product-color, var(--vp-primary, #2563eb)); color: var(--vp-primary-contrast, #fff); font-size: 0.75rem; font-weight: 700; }
.vp-product__body { display: flex; flex: 1; flex-direction: column; gap: 0.4rem; min-width: 0; padding: 1rem 1.1rem 1.1rem; }
.vp-product__seller { font-size: 0.78rem; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: var(--vp-muted, #6b7280); }
.vp-product__name { font-family: var(--vp-font-heading, inherit); font-size: 1.05rem; font-weight: 650; line-height: 1.3; color: inherit; text-decoration: none; }
.vp-product__stars { display: flex; gap: 2px; }
.vp-product__stars svg { width: 0.95rem; height: 0.95rem; fill: var(--vp-border, #d1d5db); }
.vp-product__stars .vp-product__star--on { fill: #f5a524; }
.vp-product__text { margin: 0; font-size: 0.92rem; line-height: 1.5; color: var(--vp-muted, #6b7280); }
.vp-product__foot { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.6rem; margin-top: auto; padding-top: 0.6rem; }
.vp-product__prices { display: flex; align-items: baseline; gap: 0.5rem; }
.vp-product__price { font-size: 1.15rem; font-weight: 700; }
.vp-product__was { font-size: 0.9rem; color: var(--vp-muted, #6b7280); }
.vp-product__button { padding: 0.55em 1em; border: 0; border-radius: var(--vp-radius, 8px); background: var(--vp-product-color, var(--vp-primary, #2563eb)); color: var(--vp-primary-contrast, #fff); font: inherit; font-size: 0.9rem; font-weight: 600; cursor: pointer; }
.vp-product__button:hover { filter: brightness(1.08); }
@media (max-width: 480px) {
  .vp-product--row { flex-direction: column; }
  .vp-product--row .vp-product__picture { width: 100%; max-width: none; aspect-ratio: var(--vp-product-shape, 1 / 1); }
}
</style>
`;export{e as default};