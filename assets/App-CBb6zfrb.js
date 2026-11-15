var e=`<template>
  <div class="vp-shop-checkout" :style="style">
    <!-- done: the order went through, or the visitor came back from paying -->
    <div v-if="done" class="vp-shop-checkout__done" role="status">
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="m8 12.5 2.8 2.8L16.5 9.5" /></svg>
      <h2>{{ thanksTitle }}</h2>
      <p>{{ thanksText }}</p>
      <p v-if="orderNumber" class="vp-shop-checkout__number">{{ orderText }} {{ orderNumber }}</p>
      <a v-if="shopLink" class="vp-shop-checkout__link" :href="shopLink" @click="go($event, shopLink)">{{ shopText }}</a>
    </div>

    <p v-else-if="!lines.length" class="vp-shop-checkout__empty">{{ emptyText }} <a v-if="shopLink" class="vp-shop-checkout__link" :href="shopLink" @click="go($event, shopLink)">{{ shopText }}</a></p>

    <form v-else class="vp-shop-checkout__grid" novalidate @submit.prevent="pay">
      <div class="vp-shop-checkout__you">
        <h2 class="vp-shop-checkout__title">{{ title }}</h2>
        <template v-if="asking.length">
          <div class="vp-shop-checkout__fields">
            <label v-for="one in asking" :key="one.key" class="vp-shop-checkout__field" :class="{ 'vp-shop-checkout__field--half': one.half }">
              <span>{{ one.label }}</span>
              <input v-model="values[one.key]" class="vp-shop-checkout__input" :type="one.type" :name="one.key" :autocomplete="one.autocomplete" :aria-invalid="!!wrong[one.key]" @input="wrong = { ...wrong, [one.key]: '' }">
              <small v-if="wrong[one.key]">{{ wrong[one.key] }}</small>
            </label>
          </div>
        </template>
        <p v-else class="vp-shop-checkout__hosted">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
          {{ hostedText }}
        </p>
        <label v-if="terms" class="vp-shop-checkout__terms">
          <input v-model="agreed" type="checkbox">
          <span>{{ terms }} <a v-if="termsLink" :href="termsLink" target="_blank" rel="noopener">{{ termsLinkText }}</a></span>
        </label>
      </div>

      <aside class="vp-shop-checkout__summary">
        <h3>{{ summaryTitle }}</h3>
        <ul>
          <li v-for="line in lines" :key="line.id + JSON.stringify(line.options || {})">
            <span class="vp-shop-checkout__picture"><img v-if="line.image" :src="line.image" alt=""><template v-else>{{ (line.title || '?').charAt(0) }}</template><i>{{ line.quantity }}</i></span>
            <span class="vp-shop-checkout__name">{{ line.title }}</span>
            <b>{{ price(line.price * line.quantity, line.currency) }}</b>
          </li>
        </ul>
        <div class="vp-shop-checkout__sum"><span>{{ totalText }}</span><b>{{ price(total, currency) }}</b></div>
        <p v-if="problem" class="vp-shop-checkout__problem" role="alert">{{ problem }}</p>
        <button type="submit" class="vp-shop-checkout__pay" :disabled="busy">
          <span v-if="busy" class="vp-shop-checkout__spinner" aria-hidden="true" />
          {{ payText }}
        </button>
        <p v-if="inStudio" class="vp-shop-checkout__note">In the editor nothing is sent: on the site this goes to {{ where }}.</p>
      </aside>
    </form>
  </div>
</template>
<script>
// The last step: what is bought and the sum, then off to pay. With Shopify or WooCommerce the shop's own checkout
// asks for the address and the card; with your own backend this asks what you choose (an e-mail, or the address
// too), sends it with the cart to your checkout route, and goes where it answers (a Stripe Checkout, say). Back
// from paying (an address with ?paid, or the order your backend answered), it says thank you. Nothing about a card
// is ever asked here. In the editor it shows a sample cart.
const SAMPLE = [{ id: 's1', title: 'Linen shirt · M', price: 590, currency: 'EUR', quantity: 1 }, { id: 's2', title: 'Wool cap', price: 290, currency: 'EUR', quantity: 2 }]
const NAMES = { shopify: 'Shopify', woocommerce: 'WooCommerce' }

export default {
  inject: { vpData: { default: null } },
  props: {
    title: { type: String, default: 'Checkout', label: 'Title' },
    ask: { type: String, default: 'email', label: 'Asked here (your own backend)', control: 'select', options: [{ key: 'Nothing', value: 'nothing' }, { key: 'An e-mail', value: 'email' }, { key: 'An e-mail and the address', value: 'address' }] },
    summaryTitle: { type: String, default: 'Your order', label: 'Over the order' },
    totalText: { type: String, default: 'Total', label: 'Before the sum' },
    payText: { type: String, default: 'Go to payment', label: 'Pay button' },
    hostedText: { type: String, default: 'You give your address and pay on the shop\\'s own secure page.', label: 'Said when the shop asks for the rest' },
    terms: { type: String, default: '', label: 'Agree to', placeholder: 'I agree to the' },
    termsLinkText: { type: String, default: 'terms of sale', label: 'Its link text' },
    termsLink: { type: String, default: '', label: 'Its link', placeholder: '/terms' },
    thanksTitle: { type: String, default: 'Thank you for your order!', label: 'Title when done' },
    thanksText: { type: String, default: 'A receipt is on its way to your e-mail.', label: 'Said when done', control: 'textarea' },
    orderText: { type: String, default: 'Order', label: 'Before the order number' },
    paidParam: { type: String, default: 'paid', label: 'Back from paying when the address has', placeholder: 'paid' },
    emptyText: { type: String, default: 'There is nothing to check out yet.', label: 'Said when the cart is empty' },
    shopText: { type: String, default: 'Back to the shop', label: 'Link back to the shop' },
    shopLink: { type: String, default: '/shop', label: 'Its link' },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 30 }
  },
  data() {
    return { values: {}, wrong: {}, agreed: false, own: '', back: false }
  },
  computed: {
    inStudio() {
      return typeof document !== 'undefined' && (!!document.getElementById('receiver') || !!window.studio)
    },
    cart() {
      return this.vpData?.cart || null
    },
    shop() {
      return Object.values(this.vpData?.sources || {}).find(source => source?.shop?.kind)?.shop || null
    },
    hosted() {
      return !!NAMES[this.shop?.kind]
    },
    where() {
      return this.hosted ? NAMES[this.shop.kind] + '\\'s checkout' : this.shop ? 'your backend\\'s ' + (this.shop.checkout || '/checkout') : 'the shop in Data (none is chosen yet)'
    },
    lines() {
      const lines = this.cart?.lines || []
      return lines.length || !this.inStudio ? lines : SAMPLE
    },
    total() {
      return this.lines.reduce((sum, line) => sum + (Number(line.price) || 0) * (Number(line.quantity) || 0), 0)
    },
    currency() {
      return this.lines.find(line => line.currency)?.currency || ''
    },
    asking() {
      if (this.hosted || this.ask === 'nothing') return []
      const email = { key: 'email', label: 'E-mail', type: 'email', autocomplete: 'email' }
      if (this.ask === 'email') return [email]
      return [
        email,
        { key: 'name', label: 'Name', type: 'text', autocomplete: 'name' },
        { key: 'address', label: 'Address', type: 'text', autocomplete: 'street-address' },
        { key: 'postcode', label: 'Postcode', type: 'text', autocomplete: 'postal-code', half: true },
        { key: 'city', label: 'Town', type: 'text', autocomplete: 'address-level2', half: true },
        { key: 'country', label: 'Country', type: 'text', autocomplete: 'country-name' },
        { key: 'phone', label: 'Phone', type: 'tel', autocomplete: 'tel' }
      ]
    },
    busy() {
      return !!this.cart?.busy
    },
    problem() {
      return this.own || this.cart?.error || ''
    },
    done() {
      return !!this.cart?.order || this.back
    },
    orderNumber() {
      const order = this.cart?.order
      return order && typeof order === 'object' ? order.number || order.id || '' : ''
    },
    style() {
      return { '--vp-shop-checkout-radius': this.radius || undefined }
    }
  },
  mounted() {
    // (back from paying: the shop's cart is done with)
    if (this.inStudio || !this.paidParam) return
    const params = new URLSearchParams(window.location.search)
    if (params.has(this.paidParam)) {
      this.back = true
      this.vpData?.clearCart?.()
    }
  },
  methods: {
    price(amount, currency) {
      if (this.vpData?.money) return this.vpData.money(amount, currency)
      const value = Number(amount) || 0
      try { return currency ? value.toLocaleString(undefined, { style: 'currency', currency }) : value.toFixed(2) } catch (e) { return value.toFixed(2) }
    },
    check() {
      const wrong = {}
      for (const one of this.asking) {
        const value = String(this.values[one.key] || '').trim()
        if (!value && one.key !== 'phone') wrong[one.key] = 'Please fill this in'
        else if (one.key === 'email' && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)) wrong[one.key] = 'This does not look like an e-mail address'
      }
      this.wrong = wrong
      if (this.terms && !this.agreed) { this.own = 'Please agree first'; return false }
      this.own = ''
      return !Object.keys(wrong).length
    },
    async pay() {
      if (this.busy || !this.check()) return
      if (this.inStudio) return
      await this.vpData?.checkout?.({ ...this.values })
    },
    go(event, href) {
      if (this.inStudio) { event.preventDefault(); return }
      if (this.$router && String(href || '').startsWith('/')) { event.preventDefault(); this.$router.push(href) }
    }
  }
}
<\/script>
<style>
.vp-shop-checkout { --_radius: var(--vp-shop-checkout-radius, var(--vp-radius, 10px)); width: 100%; }
.vp-shop-checkout__grid { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); gap: clamp(1.5rem, 5vw, 3.5rem); align-items: start; }
@media (max-width: 760px) { .vp-shop-checkout__grid { grid-template-columns: minmax(0, 1fr); } }
.vp-shop-checkout__you { display: flex; flex-direction: column; gap: 1.1rem; }
.vp-shop-checkout__title { margin: 0; font-family: var(--vp-heading, inherit); font-size: 1.8rem; }
.vp-shop-checkout__fields { display: flex; flex-wrap: wrap; gap: 0.9rem; }
.vp-shop-checkout__field { display: flex; flex: 1 1 100%; flex-direction: column; gap: 0.35rem; font-size: 0.9375rem; font-weight: 550; }
.vp-shop-checkout__field--half { flex-basis: calc(50% - 0.45rem); }
.vp-shop-checkout__field small { color: #c0362c; font-weight: 400; }
.vp-shop-checkout__input { box-sizing: border-box; width: 100%; padding: 0.75rem 0.9rem; border: 1px solid var(--vp-border, rgba(127, 127, 127, 0.4)); border-radius: var(--_radius); background: var(--vp-input, transparent); color: inherit; font: inherit; font-weight: 400; }
.vp-shop-checkout__input:focus { outline: none; border-color: var(--vp-primary, #2563eb); box-shadow: 0 0 0 3px color-mix(in srgb, var(--vp-primary, #2563eb) 22%, transparent); }
.vp-shop-checkout__input[aria-invalid="true"] { border-color: #d0453b; }
.vp-shop-checkout__hosted { display: flex; gap: 0.75rem; align-items: flex-start; margin: 0; padding: 1rem; border-radius: var(--_radius); background: var(--vp-surface, rgba(127, 127, 127, 0.07)); line-height: 1.5; }
.vp-shop-checkout__hosted svg, .vp-shop-checkout__done svg { flex: none; width: 1.3rem; height: 1.3rem; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.vp-shop-checkout__terms { display: flex; gap: 0.6rem; align-items: flex-start; line-height: 1.45; cursor: pointer; }
.vp-shop-checkout__terms input { flex: none; width: 1.05rem; height: 1.05rem; margin-top: 0.2rem; accent-color: var(--vp-primary, #2563eb); }
.vp-shop-checkout__terms a { color: var(--vp-primary, #2563eb); }
.vp-shop-checkout__summary { display: flex; flex-direction: column; gap: 1rem; padding: clamp(1.1rem, 3vw, 1.75rem); border-radius: calc(var(--_radius) + 4px); background: var(--vp-surface, rgba(127, 127, 127, 0.06)); }
.vp-shop-checkout__summary h3 { margin: 0; font-size: 1.1rem; }
.vp-shop-checkout__summary ul { display: flex; flex-direction: column; gap: 0.85rem; margin: 0; padding: 0; list-style: none; }
.vp-shop-checkout__summary li { display: grid; grid-template-columns: 3.25rem minmax(0, 1fr) auto; gap: 0.85rem; align-items: center; }
.vp-shop-checkout__picture { position: relative; display: grid; place-items: center; width: 3.25rem; aspect-ratio: 1; border-radius: 8px; background: var(--vp-background, #fff); font-weight: 700; }
.vp-shop-checkout__picture img { width: 100%; height: 100%; object-fit: cover; border-radius: 8px; }
.vp-shop-checkout__picture i { position: absolute; top: -0.4rem; right: -0.4rem; display: grid; place-items: center; min-width: 1.2rem; height: 1.2rem; padding: 0 0.3rem; border-radius: 999px; background: var(--vp-text, #111827); color: var(--vp-background, #fff); font-size: 0.7rem; font-style: normal; font-weight: 700; }
.vp-shop-checkout__name { font-size: 0.9375rem; line-height: 1.3; }
.vp-shop-checkout__sum { display: flex; justify-content: space-between; padding-top: 1rem; border-top: 1px solid var(--vp-border, rgba(127, 127, 127, 0.2)); font-size: 1.15rem; }
.vp-shop-checkout__problem { margin: 0; color: #c0362c; }
.vp-shop-checkout__pay { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; min-height: 3.2rem; border: 0; border-radius: var(--vp-radius, 8px); background: var(--vp-primary, #2563eb); color: var(--vp-primary-contrast, #fff); font: inherit; font-weight: 650; cursor: pointer; }
.vp-shop-checkout__pay:hover:not(:disabled) { filter: brightness(1.08); }
.vp-shop-checkout__pay:disabled { opacity: 0.7; cursor: default; }
.vp-shop-checkout__spinner { width: 1em; height: 1em; border: 2px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: vp-shop-checkout-spin 0.7s linear infinite; }
@keyframes vp-shop-checkout-spin { to { transform: rotate(360deg); } }
.vp-shop-checkout__note { margin: 0; font-size: 0.8125rem; opacity: 0.6; }
.vp-shop-checkout__empty { padding: 2.5rem 1rem; text-align: center; opacity: 0.85; }
.vp-shop-checkout__done { display: flex; flex-direction: column; align-items: center; gap: 0.6rem; max-width: 32rem; margin: 0 auto; padding: 2.5rem 1rem; text-align: center; }
.vp-shop-checkout__done svg { width: 3rem; height: 3rem; color: #16a34a; stroke-width: 1.5; }
.vp-shop-checkout__done h2 { margin: 0.25rem 0 0; font-family: var(--vp-heading, inherit); }
.vp-shop-checkout__done p { margin: 0; opacity: 0.8; }
.vp-shop-checkout__number { font-weight: 600; }
.vp-shop-checkout__link { color: var(--vp-primary, #2563eb); font-weight: 600; text-decoration: none; }
.vp-shop-checkout__link:hover { text-decoration: underline; }
</style>
`;export{e as default};