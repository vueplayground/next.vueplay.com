var e=`<template>
  <div class="vp-shop-cart" :style="style">
    <h2 v-if="showTitle" class="vp-shop-cart__title">{{ say('title', title) }} <small v-if="lines.length">({{ count }})</small></h2>

    <div v-if="!lines.length" class="vp-shop-cart__empty">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6" /><circle cx="10" cy="20" r="1.2" /><circle cx="17" cy="20" r="1.2" /></svg>
      <p>{{ say('empty', emptyText) }}</p>
      <a v-if="shopLink" class="vp-shop-cart__link" :href="shopLink" @click="go($event, shopLink)">{{ say('shop', shopText) }}</a>
    </div>

    <template v-else>
      <ul class="vp-shop-cart__lines">
        <li v-for="(line, i) in lines" :key="line.id + JSON.stringify(line.options || {})" class="vp-shop-cart__line">
          <a class="vp-shop-cart__picture" :href="line.href || undefined" @click="go($event, line.href)">
            <img v-if="line.image" :src="line.image" alt="" loading="lazy" decoding="async">
            <span v-else>{{ (line.title || '?').charAt(0) }}</span>
          </a>
          <div class="vp-shop-cart__about">
            <a class="vp-shop-cart__name" :href="line.href || undefined" @click="go($event, line.href)">{{ line.title }}</a>
            <small v-if="optionsOf(line)">{{ optionsOf(line) }}</small>
            <div class="vp-shop-cart__quantity" role="group" :aria-label="say('howMany', '', '', line.title)">
              <button type="button" :aria-label="say('less')" @click="change(i, line.quantity - 1)">−</button>
              <span>{{ line.quantity }}</span>
              <button type="button" :aria-label="say('more')" @click="change(i, line.quantity + 1)">+</button>
            </div>
          </div>
          <div class="vp-shop-cart__end">
            <b>{{ price(line.price * line.quantity, line.currency) }}</b>
            <button type="button" class="vp-shop-cart__remove" @click="change(i, 0)">{{ say('remove', removeText) }}</button>
          </div>
        </li>
      </ul>

      <div class="vp-shop-cart__sum">
        <span>{{ say('subtotal', subtotalText) }}</span>
        <b>{{ price(total, currency) }}</b>
      </div>
      <p v-if="showNote" class="vp-shop-cart__note">{{ say('note', note) }}</p>
      <p v-if="problem" class="vp-shop-cart__problem" role="alert">{{ problem }}</p>
      <button type="button" class="vp-shop-cart__checkout" :disabled="busy" @click="checkout">
        <span v-if="busy" class="vp-shop-cart__spinner" aria-hidden="true" />
        {{ say('checkout', checkoutText) }}
      </button>
      <a v-if="shopLink" class="vp-shop-cart__link vp-shop-cart__on" :href="shopLink" @click="go($event, shopLink)">{{ say('shop', shopText) }}</a>
    </template>
  </div>
</template>
<script>
// The cart: what is in it with a picture, how many (to change), the price of each line, the sum, and the way to pay.
// It is the site's own cart (kept on the visitor's device); paying is the shop's (Shopify's or WooCommerce's
// checkout, or your backend's), or a Checkout page of the site when it asks for more first. In the editor it shows
// a sample cart.
const SAMPLE = [
  { id: 's1', title: 'Linen shirt · M', price: 590, currency: 'EUR', quantity: 1, options: {} },
  { id: 's2', title: 'Wool cap', price: 290, currency: 'EUR', quantity: 2, options: {} }
]

// The words it says itself, in the site's language (App.vue's head says it: \`htmlAttrs: { lang }\`). A text
// that is filled in in the Props tab is said as it is written.
const WORDS = {
  en: { title: 'Your cart', checkout: 'Go to checkout', subtotal: 'Subtotal', note: 'Shipping and taxes are worked out at checkout.', remove: 'Remove', empty: 'Your cart is empty.', shop: 'Keep shopping', howMany: 'How many: {name}', less: 'One less', more: 'One more' },
  nb: { title: 'Handlekurven din', checkout: 'Gå til kassen', subtotal: 'Delsum', note: 'Frakt og avgifter beregnes i kassen.', remove: 'Fjern', empty: 'Handlekurven er tom.', shop: 'Fortsett å handle', howMany: 'Antall: {name}', less: 'Én mindre', more: 'Én til' },
  sv: { title: 'Din varukorg', checkout: 'Till kassan', subtotal: 'Delsumma', note: 'Frakt och skatter beräknas i kassan.', remove: 'Ta bort', empty: 'Varukorgen är tom.', shop: 'Fortsätt handla', howMany: 'Antal: {name}', less: 'En färre', more: 'En till' },
  da: { title: 'Din kurv', checkout: 'Gå til kassen', subtotal: 'Subtotal', note: 'Fragt og afgifter beregnes ved kassen.', remove: 'Fjern', empty: 'Din kurv er tom.', shop: 'Fortsæt med at handle', howMany: 'Antal: {name}', less: 'Én mindre', more: 'Én mere' },
  fi: { title: 'Ostoskorisi', checkout: 'Siirry kassalle', subtotal: 'Välisumma', note: 'Toimituskulut ja verot lasketaan kassalla.', remove: 'Poista', empty: 'Ostoskorisi on tyhjä.', shop: 'Jatka ostoksia', howMany: 'Määrä: {name}', less: 'Yksi vähemmän', more: 'Yksi lisää' },
  de: { title: 'Dein Warenkorb', checkout: 'Zur Kasse', subtotal: 'Zwischensumme', note: 'Versand und Steuern werden an der Kasse berechnet.', remove: 'Entfernen', empty: 'Dein Warenkorb ist leer.', shop: 'Weiter einkaufen', howMany: 'Menge: {name}', less: 'Eins weniger', more: 'Eins mehr' },
  fr: { title: 'Votre panier', checkout: 'Passer commande', subtotal: 'Sous-total', note: 'Frais de livraison et taxes calculés lors du paiement.', remove: 'Retirer', empty: 'Votre panier est vide.', shop: 'Continuer mes achats', howMany: 'Quantité : {name}', less: 'Un de moins', more: 'Un de plus' },
  es: { title: 'Tu carrito', checkout: 'Finalizar compra', subtotal: 'Subtotal', note: 'Los gastos de envío y los impuestos se calculan al finalizar la compra.', remove: 'Eliminar', empty: 'Tu carrito está vacío.', shop: 'Seguir comprando', howMany: 'Cantidad: {name}', less: 'Uno menos', more: 'Uno más' },
  it: { title: 'Il tuo carrello', checkout: 'Vai alla cassa', subtotal: 'Subtotale', note: 'Spedizione e tasse calcolate alla cassa.', remove: 'Rimuovi', empty: 'Il tuo carrello è vuoto.', shop: 'Continua lo shopping', howMany: 'Quantità: {name}', less: 'Uno in meno', more: 'Uno in più' },
  nl: { title: 'Je winkelwagen', checkout: 'Afrekenen', subtotal: 'Subtotaal', note: 'Verzendkosten en btw worden berekend bij het afrekenen.', remove: 'Verwijderen', empty: 'Je winkelwagen is leeg.', shop: 'Verder winkelen', howMany: 'Aantal: {name}', less: 'Eén minder', more: 'Eén meer' },
  pt: { title: 'Seu carrinho', checkout: 'Finalizar compra', subtotal: 'Subtotal', note: 'Frete e impostos são calculados na finalização da compra.', remove: 'Remover', empty: 'Seu carrinho está vazio.', shop: 'Continuar comprando', howMany: 'Quantidade: {name}', less: 'Menos um', more: 'Mais um' },
  pl: { title: 'Twój koszyk', checkout: 'Przejdź do kasy', subtotal: 'Suma częściowa', note: 'Koszty wysyłki i podatki zostaną obliczone przy kasie.', remove: 'Usuń', empty: 'Twój koszyk jest pusty.', shop: 'Kontynuuj zakupy', howMany: 'Ilość: {name}', less: 'Jeden mniej', more: 'Jeden więcej' },
  zh: { title: '你的购物车', checkout: '去结算', subtotal: '小计', note: '运费和税费将在结算时计算。', remove: '删除', empty: '购物车是空的。', shop: '继续购物', howMany: '数量：{name}', less: '减少一件', more: '增加一件' },
  ja: { title: 'ショッピングカート', checkout: 'レジに進む', subtotal: '小計', note: '送料と税金はレジで計算されます。', remove: '削除', empty: 'カートは空です。', shop: '買い物を続ける', howMany: '数量：{name}', less: '1つ減らす', more: '1つ増やす' }
}

export default {
  inject: { vpData: { default: null } },
  props: {
    title: { type: String, default: '', label: 'Title', placeholder: 'Your cart' },
    showTitle: { type: Boolean, default: true, label: 'Show the title' },
    checkoutText: { type: String, default: '', label: 'Checkout button', placeholder: 'Go to checkout' },
    checkoutLink: { type: String, default: '', label: 'Checkout page (else straight to paying)', placeholder: '/checkout' },
    subtotalText: { type: String, default: '', label: 'Before the sum', placeholder: 'Subtotal' },
    note: { type: String, default: '', label: 'A line under the sum', placeholder: 'Shipping and taxes are worked out at checkout.' },
    showNote: { type: Boolean, default: true, label: 'Show the line under the sum' },
    removeText: { type: String, default: '', label: 'Remove', placeholder: 'Remove' },
    emptyText: { type: String, default: '', label: 'Said when empty', placeholder: 'Your cart is empty.' },
    shopText: { type: String, default: '', label: 'Link back to the shop', placeholder: 'Keep shopping' },
    shopLink: { type: String, default: '/shop', label: 'Its link' },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 30 }
  },
  emits: ['checkout'],
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
    lines() {
      const lines = this.vpData?.cart?.lines || []
      return lines.length || !this.inStudio ? lines : SAMPLE
    },
    count() {
      return this.lines.reduce((sum, line) => sum + (Number(line.quantity) || 0), 0)
    },
    total() {
      return this.lines.reduce((sum, line) => sum + (Number(line.price) || 0) * (Number(line.quantity) || 0), 0)
    },
    currency() {
      return this.lines.find(line => line.currency)?.currency || ''
    },
    busy() {
      return !!this.vpData?.cart?.busy
    },
    problem() {
      return this.vpData?.cart?.error || ''
    },
    style() {
      return { '--vp-shop-cart-radius': this.radius || undefined }
    }
  },
  methods: {
    say(key, own, n, name) {
      if (own) return own
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return String(words[key] ?? WORDS.en[key]).replace('{n}', n ?? '').replace('{name}', name ?? '')
    },
    price(amount, currency) {
      if (this.vpData?.money) return this.vpData.money(amount, currency, this.lang)
      const value = Number(amount) || 0
      try { return currency ? value.toLocaleString(this.lang, { style: 'currency', currency }) : value.toFixed(2) } catch (e) { return value.toFixed(2) }
    },
    optionsOf(line) {
      return Object.entries(line.options || {}).map(([name, value]) => \`\${name}: \${value}\`).join(' · ')
    },
    change(index, quantity) {
      if (this.inStudio && !this.vpData?.cart?.lines?.length) return
      this.vpData?.setQuantity?.(index, quantity)
    },
    async checkout() {
      this.$emit('checkout')
      if (this.inStudio) return
      if (this.vpData?.cart) this.vpData.cart.open = false
      if (this.checkoutLink) {
        if (this.$router && this.checkoutLink.startsWith('/')) this.$router.push(this.checkoutLink)
        else window.location.href = this.checkoutLink
        return
      }
      await this.vpData?.checkout?.()
    },
    go(event, href) {
      if (this.inStudio) { event.preventDefault(); return }
      if (this.vpData?.cart) this.vpData.cart.open = false
      if (this.$router && String(href || '').startsWith('/')) { event.preventDefault(); this.$router.push(href) }
    }
  }
}
<\/script>
<style>
.vp-shop-cart { --_radius: var(--vp-shop-cart-radius, var(--vp-radius, 10px)); display: flex; flex-direction: column; gap: 1rem; width: 100%; max-width: 40rem; margin: 0 auto; }
.vp-shop-cart__title { margin: 0; font-family: var(--vp-heading, inherit); font-size: 1.6rem; }
.vp-shop-cart__title small { font-size: 1rem; font-weight: 500; opacity: 0.6; }
.vp-shop-cart__empty { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; padding: 2.5rem 1rem; text-align: center; }
.vp-shop-cart__empty svg { width: 2.75rem; height: 2.75rem; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; opacity: 0.35; }
.vp-shop-cart__empty p { margin: 0; opacity: 0.7; }
.vp-shop-cart__lines { display: flex; flex-direction: column; margin: 0; padding: 0; list-style: none; }
.vp-shop-cart__line { display: grid; grid-template-columns: 4.5rem minmax(0, 1fr) auto; gap: 1rem; align-items: start; padding: 1rem 0; border-bottom: 1px solid var(--vp-border, rgba(127, 127, 127, 0.18)); }
.vp-shop-cart__line:first-child { padding-top: 0; }
.vp-shop-cart__picture { display: grid; place-items: center; width: 4.5rem; aspect-ratio: 1; overflow: hidden; border-radius: calc(var(--_radius) - 2px); background: var(--vp-surface, #f4f4f5); color: inherit; font-weight: 700; text-decoration: none; }
.vp-shop-cart__picture img { width: 100%; height: 100%; object-fit: cover; }
.vp-shop-cart__about { display: flex; flex-direction: column; gap: 0.3rem; min-width: 0; }
.vp-shop-cart__name { color: inherit; font-weight: 600; text-decoration: none; }
.vp-shop-cart__name:hover { text-decoration: underline; text-underline-offset: 3px; }
.vp-shop-cart__about small { opacity: 0.65; }
.vp-shop-cart__quantity { display: inline-flex; align-items: center; align-self: flex-start; margin-top: 0.25rem; border: 1px solid var(--vp-border, rgba(127, 127, 127, 0.3)); border-radius: 999px; }
.vp-shop-cart__quantity button { width: 2rem; height: 2rem; border: 0; border-radius: 50%; background: none; color: inherit; font: inherit; cursor: pointer; }
.vp-shop-cart__quantity button:hover { background: color-mix(in srgb, currentColor 8%, transparent); }
.vp-shop-cart__quantity span { min-width: 1.5rem; text-align: center; font-variant-numeric: tabular-nums; }
.vp-shop-cart__end { display: flex; flex-direction: column; align-items: flex-end; gap: 0.4rem; white-space: nowrap; }
.vp-shop-cart__remove { padding: 0; border: 0; background: none; color: inherit; font: inherit; font-size: 0.8125rem; opacity: 0.6; cursor: pointer; }
.vp-shop-cart__remove:hover { opacity: 1; text-decoration: underline; }
.vp-shop-cart__sum { display: flex; justify-content: space-between; align-items: baseline; font-size: 1.1rem; }
.vp-shop-cart__sum b { font-size: 1.25rem; }
.vp-shop-cart__note { margin: -0.5rem 0 0; font-size: 0.875rem; opacity: 0.6; }
.vp-shop-cart__problem { margin: 0; color: #c0362c; }
.vp-shop-cart__checkout {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 3.1rem;
  border: 0;
  border-radius: var(--vp-radius, 8px);
  background: var(--vp-primary, #2563eb);
  color: var(--vp-primary-contrast, #fff);
  font: inherit;
  font-weight: 650;
  cursor: pointer;
  transition: filter 150ms ease;
}
.vp-shop-cart__checkout:hover:not(:disabled) { filter: brightness(1.08); }
.vp-shop-cart__checkout:disabled { opacity: 0.7; cursor: default; }
.vp-shop-cart__link { color: var(--vp-primary, #2563eb); font-weight: 600; text-decoration: none; }
.vp-shop-cart__on { align-self: center; font-size: 0.9375rem; }
.vp-shop-cart__link:hover { text-decoration: underline; }
.vp-shop-cart__spinner { width: 1em; height: 1em; border: 2px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: vp-shop-cart-spin 0.7s linear infinite; }
@keyframes vp-shop-cart-spin { to { transform: rotate(360deg); } }
</style>
`;export{e as default};