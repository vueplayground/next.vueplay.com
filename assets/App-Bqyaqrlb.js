var e=`<template>
  <div class="vp-shop-cart" :class="['vp-shop-cart--' + width, { 'vp-shop-cart--empty': !lines.length }]" :style="style">
    <h2 v-if="showTitle" class="vp-shop-cart__title">{{ say('title', title) }} <small v-if="lines.length">({{ count }})</small></h2>

    <div v-if="!lines.length" class="vp-shop-cart__empty">
      <span class="vp-shop-cart__sign"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6" /><circle cx="10" cy="20" r="1.2" /><circle cx="17" cy="20" r="1.2" /></svg></span>
      <p>{{ say('empty', emptyText) }}</p>
      <a v-if="shopLink" class="vp-shop-cart__link vp-shop-cart__back" :href="shopLink" @click="go($event, shopLink)">{{ say('shop', shopText) }}</a>
    </div>

    <template v-else>
      <ul class="vp-shop-cart__lines">
        <li v-for="(line, i) in lines" :key="line.id + JSON.stringify(line.options || {})" class="vp-shop-cart__line">
          <component :is="line.href ? 'a' : 'span'" class="vp-shop-cart__picture" :href="line.href || undefined" :tabindex="line.href ? -1 : undefined" :aria-hidden="line.href ? 'true' : undefined" @click="line.href && go($event, line.href)">
            <img v-if="line.image" :src="line.image" alt="" loading="lazy" decoding="async">
            <span v-else>{{ (line.title || '?').charAt(0) }}</span>
          </component>
          <div class="vp-shop-cart__about">
            <a v-if="line.href" class="vp-shop-cart__name" :href="line.href" @click="go($event, line.href)">{{ line.title }}</a>
            <span v-else class="vp-shop-cart__name">{{ line.title }}</span>
            <small v-if="optionsOf(line)">{{ optionsOf(line) }}</small>
            <div class="vp-shop-cart__quantity" role="group" :aria-label="say('howMany', '', '', line.title)">
              <button type="button" :aria-label="say('less')" @click="change(i, line.quantity - 1)">−</button>
              <span>{{ line.quantity }}</span>
              <button type="button" :aria-label="say('more')" @click="change(i, line.quantity + 1)">+</button>
            </div>
          </div>
          <div class="vp-shop-cart__end">
            <b>{{ price(line.price * line.quantity, line.currency) }}</b>
            <button type="button" class="vp-shop-cart__remove" :aria-label="say('remove', removeText) + ': ' + line.title" @click="change(i, 0)">{{ say('remove', removeText) }}</button>
          </div>
        </li>
      </ul>

      <div class="vp-shop-cart__summary">
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
      </div>
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
    width: { type: String, default: 'narrow', label: 'Width', control: 'select', options: [{ key: 'Narrow', value: 'narrow' }, { key: 'Wide', value: 'wide' }, { key: 'Full width', value: 'full' }] },
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
.vp-shop-cart {
  --_radius: var(--vp-shop-cart-radius, var(--vp-radius, 10px));
  --_line: var(--vp-border, color-mix(in oklch, currentColor 14%, transparent));
  container-type: inline-size;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.5rem clamp(2rem, 5vw, 4rem);
  width: 100%;
  max-width: var(--vp-shop-cart-width, 40rem);
  margin: 0 auto;
}
.vp-shop-cart--wide { --vp-shop-cart-width: 64rem; }
.vp-shop-cart--full { --vp-shop-cart-width: none; }
.vp-shop-cart__title { display: flex; gap: 0.6rem; align-items: baseline; margin: 0; padding-bottom: 1.25rem; border-bottom: 1px solid var(--_line); font-family: var(--vp-font-heading, inherit); font-size: clamp(1.6rem, 3.5vw, 2.1rem); line-height: 1.15; letter-spacing: -0.015em; }
.vp-shop-cart__title small { color: var(--vp-muted, inherit); font-family: var(--vp-font-body, inherit); font-size: 1rem; font-weight: 500; letter-spacing: 0; font-variant-numeric: tabular-nums; }
.vp-shop-cart--empty .vp-shop-cart__title { justify-content: center; padding-bottom: 0; border-bottom: 0; text-align: center; }
.vp-shop-cart__empty { display: flex; flex-direction: column; align-items: center; gap: 0.9rem; padding: clamp(2.5rem, 7vw, 4rem) 1.5rem; border: 1px dashed color-mix(in oklch, var(--vp-text, currentColor) 20%, transparent); border-radius: calc(var(--_radius) + 4px); text-align: center; }
.vp-shop-cart__sign { display: grid; place-items: center; width: 4.5rem; height: 4.5rem; margin-bottom: 0.25rem; border-radius: 50%; background: color-mix(in oklch, var(--vp-primary, #2563eb) 10%, transparent); color: var(--vp-primary, #2563eb); }
.vp-shop-cart__sign svg { width: 1.9rem; height: 1.9rem; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
.vp-shop-cart__empty p { margin: 0; font-size: 1.0625rem; color: var(--vp-muted, inherit); }
.vp-shop-cart__lines { display: flex; flex-direction: column; margin: 0; padding: 0; list-style: none; }
.vp-shop-cart__line { display: grid; grid-template-columns: clamp(4.5rem, 18cqi, 6.5rem) minmax(0, 1fr) auto; gap: clamp(0.85rem, 3cqi, 1.5rem); align-items: stretch; padding: 1.25rem 0; border-bottom: 1px solid var(--_line); }
.vp-shop-cart__line:first-child { padding-top: 0; }
.vp-shop-cart__picture { position: relative; display: grid; place-items: center; align-self: start; width: 100%; aspect-ratio: 1; overflow: hidden; border-radius: max(calc(var(--_radius) * 0.7), 2px); background: var(--vp-surface, color-mix(in oklch, currentColor 6%, transparent)); box-shadow: inset 0 0 0 1px color-mix(in oklch, var(--vp-text, #111827) 7%, transparent); color: var(--vp-muted, inherit); font-family: var(--vp-font-heading, inherit); font-size: 1.5rem; font-weight: 600; text-decoration: none; }
.vp-shop-cart__picture img { position: absolute; inset: 0; display: block; width: 100%; height: 100%; object-fit: cover; }
.vp-shop-cart__about { display: flex; flex-direction: column; gap: 0.25rem; min-width: 0; }
.vp-shop-cart__name { color: inherit; font-size: 1.0625rem; font-weight: 600; line-height: 1.3; text-decoration: none; }
.vp-shop-cart__name[href]:hover { text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 3px; }
.vp-shop-cart__name[href]:focus-visible { outline: 2px solid var(--vp-primary, #2563eb); outline-offset: 3px; border-radius: 3px; }
.vp-shop-cart__about small { color: var(--vp-muted, inherit); font-size: 0.875rem; }
.vp-shop-cart__quantity { display: inline-flex; align-items: center; align-self: flex-start; margin-top: auto; border: 1px solid color-mix(in oklch, var(--vp-text, currentColor) 22%, transparent); border-radius: var(--vp-radius, 8px); }
.vp-shop-cart__about > :nth-last-child(2) { margin-bottom: 0.6rem; }
.vp-shop-cart__quantity button { width: 2.25rem; height: 2.25rem; padding: 0; border: 0; border-radius: inherit; background: none; color: inherit; font: inherit; font-size: 1.05rem; line-height: 1; cursor: pointer; transition: background 150ms ease; }
.vp-shop-cart__quantity button:hover { background: color-mix(in srgb, currentColor 8%, transparent); }
.vp-shop-cart__quantity button:focus-visible { outline: 2px solid var(--vp-primary, #2563eb); outline-offset: -2px; }
.vp-shop-cart__quantity span { min-width: 1.75rem; text-align: center; font-size: 0.9375rem; font-weight: 600; font-variant-numeric: tabular-nums; }
.vp-shop-cart__end { display: flex; flex-direction: column; align-items: flex-end; justify-content: space-between; gap: 0.4rem; white-space: nowrap; }
.vp-shop-cart__end b { font-size: 1.0625rem; font-weight: 650; line-height: 1.3; font-variant-numeric: tabular-nums; }
.vp-shop-cart__remove { min-height: 2.25rem; padding: 0; border: 0; background: none; color: var(--vp-muted, inherit); font: inherit; font-size: 0.8125rem; text-decoration: underline; text-decoration-color: color-mix(in oklch, currentColor 35%, transparent); text-underline-offset: 3px; cursor: pointer; transition: color 150ms ease; }
.vp-shop-cart__remove:hover { color: var(--vp-text, inherit); text-decoration-color: currentColor; }
.vp-shop-cart__remove:focus-visible { outline: 2px solid var(--vp-primary, #2563eb); outline-offset: 3px; border-radius: 3px; }
/* (the sum and the way on: a card of its own, beside the lines where the cart is wide) */
.vp-shop-cart__summary { display: flex; flex-direction: column; gap: 1rem; align-self: start; padding: clamp(1.25rem, 4cqi, 1.75rem); border: 1px solid var(--_line); border-radius: calc(var(--_radius) + 4px); background: var(--vp-surface, color-mix(in oklch, currentColor 4%, transparent)); }
@container (min-width: 52rem) {
  .vp-shop-cart:not(.vp-shop-cart--empty) { grid-template-columns: minmax(0, 1fr) minmax(18rem, 22rem); }
  .vp-shop-cart__title { grid-column: 1 / -1; }
  .vp-shop-cart__summary { position: sticky; top: clamp(1rem, 4vw, 5.5rem); }
}
.vp-shop-cart__sum { display: flex; justify-content: space-between; gap: 1rem; align-items: baseline; font-size: 1rem; }
.vp-shop-cart__sum b { font-size: 1.5rem; font-weight: 650; line-height: 1.1; letter-spacing: -0.015em; font-variant-numeric: tabular-nums; }
.vp-shop-cart__note { margin: -0.5rem 0 0; color: var(--vp-muted, inherit); font-size: 0.875rem; line-height: 1.45; }
.vp-shop-cart__problem { margin: 0; padding: 0.7rem 0.9rem; border-radius: var(--vp-radius, 8px); background: color-mix(in srgb, #c0362c 10%, transparent); color: #c0362c; font-size: 0.9375rem; }
.vp-shop-cart__checkout, .vp-shop-cart__back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 3.25rem;
  padding: 0 1.75rem;
  border: 0;
  border-radius: var(--vp-radius, 8px);
  background: var(--vp-primary, #2563eb);
  color: var(--vp-primary-contrast, #fff);
  font: inherit;
  font-weight: 650;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 8px 20px -10px color-mix(in oklch, var(--vp-primary, #2563eb) 70%, transparent);
  transition: background 180ms ease, transform 120ms ease;
}
.vp-shop-cart__back { min-height: 3rem; margin-top: 0.5rem; }
.vp-shop-cart__checkout:hover:not(:disabled), .vp-shop-cart__back:hover { background: color-mix(in oklch, var(--vp-primary, #2563eb) 88%, var(--vp-text, #000)); text-decoration: none; }
.vp-shop-cart__checkout:active:not(:disabled) { transform: translateY(1px); }
.vp-shop-cart__checkout:focus-visible, .vp-shop-cart__back:focus-visible { outline: 2px solid var(--vp-primary, #2563eb); outline-offset: 3px; }
.vp-shop-cart__checkout:disabled { opacity: 0.7; cursor: default; }
.vp-shop-cart__link { font-weight: 600; text-decoration: none; }
.vp-shop-cart__on { align-self: center; color: inherit; font-size: 0.9375rem; text-decoration: underline; text-decoration-color: color-mix(in oklch, currentColor 35%, transparent); text-underline-offset: 4px; }
.vp-shop-cart__on:hover { text-decoration-color: currentColor; }
.vp-shop-cart__on:focus-visible { outline: 2px solid var(--vp-primary, #2563eb); outline-offset: 3px; border-radius: 3px; }
.vp-shop-cart__spinner { width: 1em; height: 1em; border: 2px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: vp-shop-cart-spin 0.7s linear infinite; }
@keyframes vp-shop-cart-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .vp-shop-cart__spinner { animation-duration: 2.4s; } .vp-shop-cart__checkout, .vp-shop-cart__back { transition: none; } .vp-shop-cart__checkout:active:not(:disabled) { transform: none; } }
</style>
`;export{e as default};