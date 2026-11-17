var e=`<template>
  <article class="vp-product" :class="{ 'vp-product--row': row }" :style="style">
    <!-- (the picture's link is the name's again: out of the tab order and hidden from screen readers, which have the name) -->
    <component :is="href ? 'a' : 'div'" class="vp-product__picture" :href="href || undefined" :tabindex="href ? -1 : undefined" :aria-hidden="href ? 'true' : undefined" @click="go">
      <img v-if="image" class="vp-product__image" :src="picture || undefined" :style="held" :alt="shownName" loading="lazy" decoding="async">
      <span v-if="badge" class="vp-product__badge">{{ badge }}</span>
    </component>
    <div class="vp-product__body">
      <div v-if="seller" class="vp-product__seller">{{ seller }}</div>
      <component :is="href ? 'a' : 'div'" class="vp-product__name" :href="href || undefined" @click="go">{{ shownName }}</component>
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
          <span v-if="price" class="vp-product__price">{{ shownPrice }}</span>
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
  en: { rated: 'Rated {n} out of 5', add: 'Add to cart', name: 'Product name', price: '$49' },
  nb: { rated: 'Vurdert til {n} av 5', add: 'Legg i handlekurven', name: 'Produktnavn', price: '49 kr' },
  sv: { rated: 'Betyg {n} av 5', add: 'Lägg i varukorgen', name: 'Produktnamn', price: '49 kr' },
  da: { rated: 'Bedømt {n} ud af 5', add: 'Læg i kurven', name: 'Produktnavn', price: '49 kr' },
  fi: { rated: 'Arvio {n}/5', add: 'Lisää ostoskoriin', name: 'Tuotteen nimi', price: '49 €' },
  de: { rated: 'Bewertet mit {n} von 5', add: 'In den Warenkorb', name: 'Produktname', price: '49 €' },
  fr: { rated: 'Noté {n} sur 5', add: 'Ajouter au panier', name: 'Nom du produit', price: '49 €' },
  es: { rated: 'Valorado con {n} de 5', add: 'Añadir al carrito', name: 'Nombre del producto', price: '49 €' },
  it: { rated: 'Valutato {n} su 5', add: 'Aggiungi al carrello', name: 'Nome del prodotto', price: '49 €' },
  nl: { rated: 'Beoordeeld met {n} van 5', add: 'In winkelwagen', name: 'Productnaam', price: '€ 49' },
  pt: { rated: 'Avaliado com {n} de 5', add: 'Adicionar ao carrinho', name: 'Nome do produto', price: '49 €' },
  pl: { rated: 'Ocena {n} na 5', add: 'Dodaj do koszyka', name: 'Nazwa produktu', price: '49 zł' },
  zh: { rated: '评分 {n}/5', add: '加入购物车', name: '商品名称', price: '¥349' },
  ja: { rated: '5段階中{n}の評価', add: 'カートに入れる', name: '商品名', price: '¥4,900' }
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
    // (the older way of giving the stars, kept for pages that use it: Rating is the one the Props tab shows)
    stars: { type: Number, default: 0, label: 'Stars (0: none)', control: 'number', min: 0, max: 5, hidden: true },
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
    // The button's text, the name and the price: an untouched English default is said in the site's language
    // (a shop may use a default as it is), a text of your own as it is
    buttonText() {
      return this.button === this.$options.props.button.default ? this.say('add') : this.button
    },
    shownName() {
      return this.name === this.$options.props.name.default ? this.say('name') : this.name
    },
    shownPrice() {
      return this.price === this.$options.props.price.default ? this.say('price') : this.price
    },
    currencyCode() {
      if (this.currency) return this.currency
      const sign = Object.keys(SIGNS).find(one => String(this.shownPrice).includes(one))
      return sign === '¥' && this.lang.startsWith('zh') ? 'CNY' : SIGNS[sign] || ''
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
      const found = String(this.shownPrice || '').match(/\\d[\\d\\s.,]*/)
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
      this.$emit('pick', { name: this.shownName, price: this.shownPrice, href: this.href })
      if (this.cartId && this.vpData?.addToCart) {
        if (!this.inStudio) this.vpData.addToCart({ id: this.cartId, title: this.shownName, price: this.amount ?? 0, currency: this.currencyCode, image: this.picture, href: this.href })
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
.vp-product { box-sizing: border-box; position: relative; display: flex; flex-direction: column; width: 100%; height: 100%; overflow: hidden; border: 1px solid var(--vp-border, #e5e7eb); border-radius: var(--vp-product-radius, var(--vp-radius, 12px)); background: var(--vp-card, var(--vp-background, #fff)); color: var(--vp-text, #111827); text-align: left; transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.35s ease, border-color 0.2s ease; }
.vp-product:hover { transform: translateY(-3px); border-color: color-mix(in oklch, var(--vp-text, #111827) 22%, transparent); box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 16px 36px -16px rgba(0, 0, 0, 0.25); }
.vp-product--row { flex-direction: row; }
.vp-product__picture { position: relative; display: block; flex: none; aspect-ratio: var(--vp-product-shape, 1 / 1); overflow: hidden; background: var(--vp-surface, #f3f4f6); }
.vp-product--row .vp-product__picture { width: 40%; max-width: 260px; aspect-ratio: auto; min-height: 140px; }
/* (laid over the frame: a picture with a size of its own, an .svg shown through a variable, cannot push out of it) */
.vp-product__image { position: absolute; inset: 0; display: block; width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }
.vp-product:hover .vp-product__image { transform: scale(1.045); }
.vp-product__badge { position: absolute; top: 0.75rem; left: 0.75rem; z-index: 1; padding: 0.35rem 0.65rem; border-radius: min(calc(var(--vp-product-radius, var(--vp-radius, 12px)) * 0.6), 999px); background: var(--vp-product-color, var(--vp-primary, #2563eb)); color: var(--vp-primary-contrast, #fff); font-size: 0.6875rem; font-weight: 700; line-height: 1.1; letter-spacing: 0.07em; text-transform: uppercase; box-shadow: 0 4px 12px -4px rgba(0, 0, 0, 0.25); }
.vp-product__body { display: flex; flex: 1; flex-direction: column; gap: 0.4rem; min-width: 0; padding: 1.1rem 1.2rem 1.2rem; }
.vp-product__seller { font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--vp-muted, #6b7280); }
.vp-product__name { font-family: var(--vp-font-heading, inherit); font-size: 1.0625rem; font-weight: 650; line-height: 1.3; letter-spacing: -0.005em; color: inherit; text-decoration: none; text-wrap: balance; }
.vp-product__name[href]:focus-visible { outline: 2px solid var(--vp-primary, #2563eb); outline-offset: 3px; border-radius: 3px; }
.vp-product:hover a.vp-product__name { text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 3px; }
.vp-product__stars { display: flex; gap: 2px; }
.vp-product__rating { display: flex; gap: 0.4rem; align-items: center; font-size: 0.8125rem; line-height: 1; }
.vp-product__rating-stars { position: relative; display: inline-block; font-size: 0.8125rem; line-height: 1; letter-spacing: 0.1em; color: color-mix(in srgb, currentColor 18%, transparent); }
.vp-product__rating-stars::before { content: '★★★★★'; }
.vp-product__rating-stars::after { content: '★★★★★'; position: absolute; inset: 0; overflow: hidden; width: calc(var(--vp-product-stars, 0) * 100%); color: var(--vp-rating, #e8a317); white-space: nowrap; }
.vp-product__reviews { color: var(--vp-muted, #6b7280); font-variant-numeric: tabular-nums; }
.vp-product__stars svg { width: 0.9rem; height: 0.9rem; fill: var(--vp-border, #d1d5db); }
.vp-product__stars .vp-product__star--on { fill: var(--vp-rating, #e8a317); }
.vp-product__text { margin: 0; font-size: 0.9rem; line-height: 1.5; color: var(--vp-muted, #6b7280); }
.vp-product__foot { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.6rem; margin-top: auto; padding-top: 0.75rem; }
.vp-product__prices { display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.1rem 0.5rem; font-variant-numeric: tabular-nums; }
.vp-product__price { font-size: 1.1875rem; font-weight: 650; line-height: 1.2; letter-spacing: -0.01em; }
.vp-product__was { font-size: 0.875rem; color: var(--vp-muted, #6b7280); text-decoration-thickness: 1px; }
.vp-product__button { position: relative; z-index: 1; min-height: 2.5rem; padding: 0.5em 1.1em; border: 0; border-radius: var(--vp-radius, 8px); background: var(--vp-product-color, var(--vp-primary, #2563eb)); color: var(--vp-primary-contrast, #fff); font: inherit; font-size: 0.875rem; font-weight: 650; cursor: pointer; transition: filter 150ms ease, transform 120ms ease; }
.vp-product__button:hover { filter: brightness(1.1); }
.vp-product__button:active { transform: scale(0.97); }
.vp-product__button:focus-visible { outline: 2px solid var(--vp-product-color, var(--vp-primary, #2563eb)); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  .vp-product, .vp-product__image, .vp-product__button { transition: none; }
  .vp-product:hover, .vp-product:hover .vp-product__image, .vp-product__button:active { transform: none; }
}
@media (max-width: 480px) {
  .vp-product--row { flex-direction: column; }
  .vp-product--row .vp-product__picture { width: 100%; max-width: none; aspect-ratio: var(--vp-product-shape, 1 / 1); }
}
</style>
`;export{e as default};