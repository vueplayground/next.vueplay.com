var e=`<template>
  <article class="vp-product" :class="{ 'vp-product--row': row }" :style="style">
    <component :is="href ? 'a' : 'div'" class="vp-product__picture" :href="href || undefined" @click="go">
      <img v-if="image" class="vp-product__image" :src="picture || undefined" :style="held" :alt="name" loading="lazy" decoding="async">
      <span v-if="badge" class="vp-product__badge">{{ badge }}</span>
    </component>
    <div class="vp-product__body">
      <div v-if="seller" class="vp-product__seller">{{ seller }}</div>
      <component :is="href ? 'a' : 'div'" class="vp-product__name" :href="href || undefined" @click="go">{{ name }}</component>
      <div v-if="rated" class="vp-product__rating" role="img" :aria-label="say('rated', '', number(rated))">
        <span class="vp-product__rating-stars" :style="{ '--vp-product-stars': rated / 5 }" aria-hidden="true"></span>
        <span v-if="ratedBy" class="vp-product__reviews" aria-hidden="true">({{ ratedBy }})</span>
      </div>
      <div v-else-if="stars > 0" class="vp-product__stars" role="img" :aria-label="say('rated', '', number(stars))">
        <svg v-for="n in 5" :key="n" viewBox="0 0 24 24" aria-hidden="true" :class="{ 'vp-product__star--on': n <= Math.round(stars) }"><path d="M12 3.500l2.600 5.300 5.900.900-4.300 4.100 1 5.800-5.200-2.700-5.200 2.700 1-5.800-4.300-4.100 5.900-.900z" /></svg>
      </div>
      <p v-if="text" class="vp-product__text">{{ text }}</p>
      <div class="vp-product__foot">
        <div class="vp-product__prices">
          <span v-if="price" class="vp-product__price">{{ price }}</span>
          <s v-if="was" class="vp-product__was">{{ was }}</s>
        </div>
        <button v-if="button" type="button" class="vp-product__button" @click="pick">{{ buttonText }}</button>
      </div>
    </div>
  </article>
</template>
<script>
// One thing for sale: its picture, name, price and a button. The button tells the page (@pick) and goes to
// the link where there is one; the page decides what picking means (a cart, a checkout, a message). With "What
// goes in the cart" filled in and a shop in Data, the button puts it in the site's cart instead of following the link.
// (A picture picked in the Studio is the name of a variable that holds it, like --image-boat: it is shown
// through that variable at once, and its address is read from it when the page is alive. An address is used as it is.)
// The words it says itself, in the site's language (App.vue's head says it: \`htmlAttrs: { lang }\`).
const WORDS = {
  en: { rated: 'Rated {n} out of 5', add: 'Add to cart' },
  nb: { rated: 'Vurdert til {n} av 5', add: 'Legg i handlekurven' },
  sv: { rated: 'Betyg {n} av 5', add: 'Lägg i varukorgen' },
  da: { rated: 'Bedømt {n} ud af 5', add: 'Læg i kurven' },
  fi: { rated: 'Arvio {n}/5', add: 'Lisää ostoskoriin' },
  de: { rated: 'Bewertet mit {n} von 5', add: 'In den Warenkorb' },
  fr: { rated: 'Noté {n} sur 5', add: 'Ajouter au panier' },
  es: { rated: 'Valorado con {n} de 5', add: 'Añadir al carrito' },
  it: { rated: 'Valutato {n} su 5', add: 'Aggiungi al carrello' },
  nl: { rated: 'Beoordeeld met {n} van 5', add: 'In winkelwagen' },
  pt: { rated: 'Avaliado com {n} de 5', add: 'Adicionar ao carrinho' },
  pl: { rated: 'Ocena {n} na 5', add: 'Dodaj do koszyka' },
  zh: { rated: '评分 {n}/5', add: '加入购物车' },
  ja: { rated: '5段階中{n}の評価', add: 'カートに入れる' }
}
// (what a price's sign says about its currency, for search engines, when Currency is not set)
const SIGNS = { '$': 'USD', '€': 'EUR', '£': 'GBP', '¥': 'JPY' }

export default {
  inject: { vpData: { default: null } },
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
    rating: { type: Number, default: null, label: 'Rating (0 to 5)', control: 'number', min: 0, max: 5 },
    reviewCount: { type: Number, default: null, label: 'How many have rated it', control: 'number', min: 0 },
    button: { type: String, default: 'Add to cart', label: 'Button text' },
    href: { type: String, default: '', label: 'Link', placeholder: '/page, #anchor or https://…' },
    cartId: { type: String, default: '', label: 'What goes in the cart (its id)', placeholder: 'A Shopify variant, a WooCommerce product' },
    shape: {
      type: String,
      default: '1 / 1',
      label: 'Picture shape',
      options: [{ key: 'Square', value: '1 / 1' }, { key: 'Photo (4:3)', value: '4 / 3' }, { key: 'Tall (3:4)', value: '3 / 4' }, { key: 'Wide (16:9)', value: '16 / 9' }]
    },
    row: { type: Boolean, default: false, label: 'Picture beside the text' },
    color: { type: String, default: '', label: 'Button color', control: 'color' },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 40 },
    currency: { type: String, default: '', label: 'Currency (for search engines)', placeholder: 'USD' },
    seo: { type: Boolean, default: true, label: 'Tell search engines about the product' }
  },
  data() {
    return { found: '' }
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
    inStudio() {
      return typeof document !== 'undefined' && (document.getElementById('receiver') ? document.getElementById('receiver').getAttribute('live') !== 'yes' : !!window.studio)
    },
    // The button's text: the English sample default is said in the site's language, a text of your own as it is
    buttonText() {
      return this.button === this.$options.props.button.default ? this.say('add') : this.button
    },
    currencyCode() {
      return this.currency || Object.entries(SIGNS).find(([sign]) => String(this.price).includes(sign))?.[1] || ''
    },
    rated() {
      const value = Number(this.rating)
      return value > 0 ? Math.round(Math.min(5, value) * 10) / 10 : 0
    },
    ratedBy() {
      const value = Math.round(Number(this.reviewCount))
      return value > 0 ? value : 0
    },
    // The price as a number, from what is written ('$49', '349 kr', '1 299,50 €'), or null
    amount() {
      const found = String(this.price || '').match(/\\d[\\d\\s.,]*/)
      if (!found) return null
      let digits = found[0].replace(/\\s/g, '').replace(/[.,]$/, '')
      const comma = digits.lastIndexOf(','), dot = digits.lastIndexOf('.')
      const decimal = Math.max(comma, dot)
      if (decimal > -1 && digits.length - decimal - 1 !== 3) digits = digits.slice(0, decimal).replace(/[.,]/g, '') + '.' + digits.slice(decimal + 1)
      else digits = digits.replace(/[.,]/g, '')
      const value = Number(digits)
      return Number.isFinite(value) ? value : null
    },
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
    say(key, own, n) {
      if (own) return own
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return String(words[key] ?? WORDS.en[key]).replace('{n}', n ?? '')
    },
    number(value) {
      try { return Number(value).toLocaleString(this.lang) } catch (e) { return String(value) }
    },
    find() {
      const value = this.named && this.$el && this.$el.nodeType === 1 ? getComputedStyle(this.$el).getPropertyValue(this.image) : ''
      const address = /^\\s*url\\(\\s*(['"]?)(.*?)\\1\\s*\\)\\s*$/.exec(value)
      this.found = address ? address[2] : ''
    },
    pick(event) {
      this.$emit('pick', { name: this.name, price: this.price, href: this.href })
      if (this.cartId && this.vpData?.addToCart) {
        if (!this.inStudio) this.vpData.addToCart({ id: this.cartId, title: this.name, price: this.amount ?? 0, currency: this.currencyCode, image: this.picture, href: this.href })
        return
      }
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
  },
  // What search engines read about it (on the site, not in the editor), when it has a name and a price
  head() {
    // (nothing about the sample product a component shows before it is filled in)
    if (!this.seo || this.inStudio || !this.name || this.amount === null || this.name === this.$options.props.name.default) return {}
    const currency = this.currencyCode
    let url = ''
    try { url = this.href && typeof window !== 'undefined' ? new URL(this.href, window.location.href).href : /^https?:/.test(this.href) ? this.href : '' } catch (e) {}
    const rating = this.rated || (Number(this.stars) > 0 ? Number(this.stars) : 0)
    return {
      script: [{
        type: 'application/ld+json',
        textContent: {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: String(this.name),
          ...(this.image && !this.named ? { image: [this.image] } : {}),
          ...(this.text ? { description: String(this.text) } : {}),
          ...(this.seller ? { brand: { '@type': 'Brand', name: String(this.seller) } } : {}),
          offers: { '@type': 'Offer', price: this.amount, ...(currency ? { priceCurrency: currency } : {}), ...(url ? { url } : {}) },
          ...(rating && this.ratedBy ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: rating, reviewCount: this.ratedBy, bestRating: 5 } } : {})
        }
      }]
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
.vp-product__rating { display: flex; gap: 0.35rem; align-items: center; font-size: 0.8rem; }
.vp-product__rating-stars { position: relative; display: inline-block; font-size: 0.95rem; line-height: 1; letter-spacing: 0.08em; color: color-mix(in srgb, currentColor 22%, transparent); }
.vp-product__rating-stars::before { content: '★★★★★'; }
.vp-product__rating-stars::after { content: '★★★★★'; position: absolute; inset: 0; overflow: hidden; width: calc(var(--vp-product-stars, 0) * 100%); color: var(--vp-rating, #f5a524); white-space: nowrap; }
.vp-product__reviews { color: var(--vp-muted, #6b7280); }
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