var e=`<template>
  <div class="vp-cart-button" :style="style">
    <button type="button" class="vp-cart-button__open" :class="'vp-cart-button__open--' + look" :aria-label="say('label', label) + (count ? ' (' + count + ')' : '')" :aria-expanded="open ? 'true' : 'false'" @click="toggle">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path v-if="icon === 'bag'" d="M5 8h14l-1.2 12H6.2L5 8Zm4 0V6.5a3 3 0 0 1 6 0V8" />
        <template v-else><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6" /><circle cx="10" cy="20" r="1.2" /><circle cx="17" cy="20" r="1.2" /></template>
      </svg>
      <span v-if="showLabel" class="vp-cart-button__label">{{ say('label', label) }}</span>
      <span v-if="count" :key="count" class="vp-cart-button__count">{{ count }}</span>
    </button>

    <Teleport to="body" :disabled="inStudio">
      <div v-if="open" class="vp-cart-button vp-cart-button__layer" :class="{ 'vp-cart-button__layer--studio': inStudio, 'vp-cart-button__layer--left': side === 'left' }" @keydown.esc="close">
        <div class="vp-cart-button__shade" @click="close" />
        <aside ref="panel" class="vp-cart-button__panel" role="dialog" aria-modal="true" :aria-label="say('title', title)" tabindex="-1">
          <header class="vp-cart-button__head">
            <b>{{ say('title', title) }}</b>
            <button type="button" class="vp-cart-button__close" :aria-label="say('close')" @click="close">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
          </header>
          <p v-if="!lines.length" class="vp-cart-button__empty">{{ say('empty', emptyText) }}</p>
          <ul v-else class="vp-cart-button__lines">
            <li v-for="(line, i) in lines" :key="line.id + JSON.stringify(line.options || {})" class="vp-cart-button__line">
              <span class="vp-cart-button__picture"><img v-if="line.image" :src="line.image" alt="" loading="lazy" decoding="async"><template v-else>{{ (line.title || '?').charAt(0) }}</template></span>
              <div class="vp-cart-button__about">
                <span class="vp-cart-button__name">{{ line.title }}</span>
                <div class="vp-cart-button__quantity" role="group" :aria-label="say('howMany', '', '', line.title)">
                  <button type="button" :aria-label="say('less')" @click="change(i, line.quantity - 1)">−</button>
                  <span>{{ line.quantity }}</span>
                  <button type="button" :aria-label="say('more')" @click="change(i, line.quantity + 1)">+</button>
                </div>
              </div>
              <b>{{ price(line.price * line.quantity, line.currency) }}</b>
            </li>
          </ul>
          <footer v-if="lines.length" class="vp-cart-button__foot">
            <div class="vp-cart-button__sum"><span>{{ say('subtotal', subtotalText) }}</span><b>{{ price(total, currency) }}</b></div>
            <p v-if="problem" class="vp-cart-button__problem" role="alert">{{ problem }}</p>
            <button type="button" class="vp-cart-button__checkout" :disabled="busy" @click="checkout">{{ say('checkout', checkoutText) }}</button>
            <a v-if="cartLink" class="vp-cart-button__all" :href="cartLink" @click="go($event, cartLink)">{{ say('cart', cartText) }}</a>
          </footer>
        </aside>
      </div>
    </Teleport>
  </div>
</template>
<script>
// For a site's header: the cart's sign with how many things are in it, which opens the cart from the side (what is
// in it, how many, the sum, and the way to pay). It opens by itself when something is put in the cart. In the
// editor a click shows it with a sample cart.
const SAMPLE = [{ id: 's1', title: 'Linen shirt · M', price: 590, currency: 'EUR', quantity: 1 }, { id: 's2', title: 'Wool cap', price: 290, currency: 'EUR', quantity: 2 }]

// The words it says itself, in the site's language (App.vue's head says it: \`htmlAttrs: { lang }\`). A text
// that is filled in in the Props tab is said as it is written.
const WORDS = {
  en: { label: 'Cart', title: 'Your cart', close: 'Close', checkout: 'Go to checkout', cart: 'See the whole cart', subtotal: 'Subtotal', empty: 'Your cart is empty.', howMany: 'How many: {name}', less: 'One less', more: 'One more' },
  nb: { label: 'Handlekurv', title: 'Handlekurven din', close: 'Lukk', checkout: 'Gå til kassen', cart: 'Se hele handlekurven', subtotal: 'Delsum', empty: 'Handlekurven er tom.', howMany: 'Antall: {name}', less: 'Én mindre', more: 'Én til' },
  sv: { label: 'Varukorg', title: 'Din varukorg', close: 'Stäng', checkout: 'Till kassan', cart: 'Visa hela varukorgen', subtotal: 'Delsumma', empty: 'Varukorgen är tom.', howMany: 'Antal: {name}', less: 'En färre', more: 'En till' },
  da: { label: 'Kurv', title: 'Din kurv', close: 'Luk', checkout: 'Gå til kassen', cart: 'Se hele kurven', subtotal: 'Subtotal', empty: 'Din kurv er tom.', howMany: 'Antal: {name}', less: 'Én mindre', more: 'Én mere' },
  fi: { label: 'Ostoskori', title: 'Ostoskorisi', close: 'Sulje', checkout: 'Siirry kassalle', cart: 'Näytä koko ostoskori', subtotal: 'Välisumma', empty: 'Ostoskorisi on tyhjä.', howMany: 'Määrä: {name}', less: 'Yksi vähemmän', more: 'Yksi lisää' },
  de: { label: 'Warenkorb', title: 'Dein Warenkorb', close: 'Schließen', checkout: 'Zur Kasse', cart: 'Ganzen Warenkorb ansehen', subtotal: 'Zwischensumme', empty: 'Dein Warenkorb ist leer.', howMany: 'Menge: {name}', less: 'Eins weniger', more: 'Eins mehr' },
  fr: { label: 'Panier', title: 'Votre panier', close: 'Fermer', checkout: 'Passer commande', cart: 'Voir tout le panier', subtotal: 'Sous-total', empty: 'Votre panier est vide.', howMany: 'Quantité : {name}', less: 'Un de moins', more: 'Un de plus' },
  es: { label: 'Carrito', title: 'Tu carrito', close: 'Cerrar', checkout: 'Finalizar compra', cart: 'Ver todo el carrito', subtotal: 'Subtotal', empty: 'Tu carrito está vacío.', howMany: 'Cantidad: {name}', less: 'Uno menos', more: 'Uno más' },
  it: { label: 'Carrello', title: 'Il tuo carrello', close: 'Chiudi', checkout: 'Vai alla cassa', cart: 'Vedi tutto il carrello', subtotal: 'Subtotale', empty: 'Il tuo carrello è vuoto.', howMany: 'Quantità: {name}', less: 'Uno in meno', more: 'Uno in più' },
  nl: { label: 'Winkelwagen', title: 'Je winkelwagen', close: 'Sluiten', checkout: 'Afrekenen', cart: 'Bekijk je winkelwagen', subtotal: 'Subtotaal', empty: 'Je winkelwagen is leeg.', howMany: 'Aantal: {name}', less: 'Eén minder', more: 'Eén meer' },
  pt: { label: 'Carrinho', title: 'Seu carrinho', close: 'Fechar', checkout: 'Finalizar compra', cart: 'Ver o carrinho completo', subtotal: 'Subtotal', empty: 'Seu carrinho está vazio.', howMany: 'Quantidade: {name}', less: 'Menos um', more: 'Mais um' },
  pl: { label: 'Koszyk', title: 'Twój koszyk', close: 'Zamknij', checkout: 'Przejdź do kasy', cart: 'Zobacz cały koszyk', subtotal: 'Suma częściowa', empty: 'Twój koszyk jest pusty.', howMany: 'Ilość: {name}', less: 'Jeden mniej', more: 'Jeden więcej' },
  zh: { label: '购物车', title: '你的购物车', close: '关闭', checkout: '去结算', cart: '查看完整购物车', subtotal: '小计', empty: '购物车是空的。', howMany: '数量：{name}', less: '减少一件', more: '增加一件' },
  ja: { label: 'カート', title: 'ショッピングカート', close: '閉じる', checkout: 'レジに進む', cart: 'カートをすべて見る', subtotal: '小計', empty: 'カートは空です。', howMany: '数量：{name}', less: '1つ減らす', more: '1つ増やす' }
}

export default {
  inject: { vpData: { default: null } },
  props: {
    label: { type: String, default: '', label: 'Its name', placeholder: 'Cart' },
    showLabel: { type: Boolean, default: false, label: 'Show its name beside the sign' },
    icon: { type: String, default: 'cart', label: 'Sign', control: 'select', options: [{ key: 'A cart', value: 'cart' }, { key: 'A bag', value: 'bag' }] },
    look: { type: String, default: 'plain', label: 'Look', control: 'select', options: [{ key: 'Plain', value: 'plain' }, { key: 'A round button', value: 'round' }, { key: 'A filled button', value: 'solid' }] },
    title: { type: String, default: '', label: 'Title of the cart', placeholder: 'Your cart' },
    checkoutText: { type: String, default: '', label: 'Checkout button', placeholder: 'Go to checkout' },
    checkoutLink: { type: String, default: '', label: 'Checkout page (else straight to paying)', placeholder: '/checkout' },
    cartText: { type: String, default: '', label: 'Link to the cart page', placeholder: 'See the whole cart' },
    cartLink: { type: String, default: '/cart', label: 'Its link' },
    subtotalText: { type: String, default: '', label: 'Before the sum', placeholder: 'Subtotal' },
    emptyText: { type: String, default: '', label: 'Said when empty', placeholder: 'Your cart is empty.' },
    openOnAdd: { type: Boolean, default: true, label: 'Open when something is added' },
    side: { type: String, default: 'right', label: 'Opens from the', control: 'select', options: [{ key: 'Right', value: 'right' }, { key: 'Left', value: 'left' }] }
  },
  data() {
    return { studioOpen: false }
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
      return typeof document !== 'undefined' && (!!document.getElementById('receiver') || !!window.studio)
    },
    cart() {
      return this.vpData?.cart || null
    },
    open() {
      return this.inStudio ? this.studioOpen : !!this.cart?.open
    },
    lines() {
      const lines = this.cart?.lines || []
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
      return !!this.cart?.busy
    },
    problem() {
      return this.cart?.error || ''
    },
    style() {
      return {}
    }
  },
  watch: {
    open(now) {
      if (this.inStudio) return
      if (now && !this.openOnAdd && !this.clicked) { this.cart.open = false; return }
      this.clicked = false
      document.documentElement.style.overflow = now ? 'hidden' : ''
      if (now) this.$nextTick(() => this.$refs.panel?.focus())
    }
  },
  methods: {
    toggle() {
      if (this.inStudio) { this.studioOpen = !this.studioOpen; return }
      this.clicked = true
      if (this.cart) this.cart.open = !this.cart.open
    },
    close() {
      if (this.inStudio) this.studioOpen = false
      else if (this.cart) this.cart.open = false
    },
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
    change(index, quantity) {
      if (!this.inStudio) this.vpData?.setQuantity?.(index, quantity)
    },
    async checkout() {
      if (this.inStudio) return
      this.close()
      if (this.checkoutLink) return this.navigate(this.checkoutLink)
      await this.vpData?.checkout?.()
    },
    go(event, href) {
      event.preventDefault()
      if (this.inStudio) return
      this.close()
      this.navigate(href)
    },
    navigate(href) {
      if (this.$router && String(href).startsWith('/')) this.$router.push(href)
      else window.location.href = href
    }
  },
  beforeUnmount() {
    if (this.open && !this.inStudio) document.documentElement.style.overflow = ''
  }
}
<\/script>
<style>
.vp-cart-button { position: relative; display: inline-flex; }
.vp-cart-button__open {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem;
  border: 0;
  border-radius: 999px;
  background: none;
  color: inherit;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: background 150ms ease;
}
.vp-cart-button__open:hover { background: color-mix(in srgb, currentColor 8%, transparent); }
.vp-cart-button__open--round { box-shadow: inset 0 0 0 1.5px currentColor; padding: 0.6rem; }
.vp-cart-button__open--solid { background: var(--vp-primary, #2563eb); color: var(--vp-primary-contrast, #fff); padding: 0.55rem 0.9rem; }
.vp-cart-button__open--solid:hover { background: var(--vp-primary, #2563eb); filter: brightness(1.08); }
.vp-cart-button__open svg { width: 1.4rem; height: 1.4rem; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.vp-cart-button__count {
  position: absolute;
  top: -0.1rem;
  right: -0.15rem;
  display: grid;
  place-items: center;
  min-width: 1.15rem;
  height: 1.15rem;
  padding: 0 0.3rem;
  border-radius: 999px;
  background: var(--vp-primary, #2563eb);
  color: var(--vp-primary-contrast, #fff);
  font-size: 0.7rem;
  font-weight: 700;
  animation: vp-cart-button-pop 0.35s cubic-bezier(0.3, 1.6, 0.5, 1);
}
.vp-cart-button__open--solid .vp-cart-button__count { position: static; background: var(--vp-primary-contrast, #fff); color: var(--vp-primary, #2563eb); }
@keyframes vp-cart-button-pop { from { transform: scale(0.4); } }
.vp-cart-button__layer { position: fixed; inset: 0; z-index: 1000; display: block; color: var(--vp-text, #111827); }
.vp-cart-button__layer--studio { position: absolute; inset: auto; top: calc(100% + 8px); right: 0; z-index: 50; width: min(24rem, 90vw); height: 30rem; }
.vp-cart-button__shade { position: absolute; inset: 0; background: rgba(15, 23, 42, 0.45); animation: vp-cart-button-fade 0.25s ease both; }
.vp-cart-button__layer--studio .vp-cart-button__shade { display: none; }
.vp-cart-button__panel {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: min(26rem, 92vw);
  background: var(--vp-background, #fff);
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.2);
  outline: none;
  animation: vp-cart-button-in 0.35s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.vp-cart-button__panel { right: 0; }
.vp-cart-button__layer--left .vp-cart-button__panel { right: auto; left: 0; --vp-cart-button-from: -100%; }
.vp-cart-button__layer--studio .vp-cart-button__panel { position: relative; width: 100%; height: 100%; border-radius: 12px; animation: none; }
@keyframes vp-cart-button-in { from { transform: translateX(var(--vp-cart-button-from, 100%)); } }
@keyframes vp-cart-button-fade { from { opacity: 0; } }
.vp-cart-button__head { display: flex; align-items: center; justify-content: space-between; padding: 1.1rem 1.25rem; border-bottom: 1px solid var(--vp-border, rgba(127, 127, 127, 0.18)); font-size: 1.1rem; }
.vp-cart-button__close { display: flex; padding: 0.35rem; border: 0; border-radius: 50%; background: none; color: inherit; cursor: pointer; }
.vp-cart-button__close:hover { background: color-mix(in srgb, currentColor 8%, transparent); }
.vp-cart-button__close svg { width: 1.2rem; height: 1.2rem; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }
.vp-cart-button__empty { margin: 0; padding: 2.5rem 1.25rem; text-align: center; opacity: 0.65; }
.vp-cart-button__lines { flex: 1; margin: 0; padding: 0.5rem 1.25rem; overflow-y: auto; list-style: none; }
.vp-cart-button__line { display: grid; grid-template-columns: 3.75rem minmax(0, 1fr) auto; gap: 0.85rem; align-items: start; padding: 0.85rem 0; border-bottom: 1px solid var(--vp-border, rgba(127, 127, 127, 0.14)); }
.vp-cart-button__picture { display: grid; place-items: center; width: 3.75rem; aspect-ratio: 1; overflow: hidden; border-radius: 8px; background: var(--vp-surface, #f4f4f5); font-weight: 700; }
.vp-cart-button__picture img { width: 100%; height: 100%; object-fit: cover; }
.vp-cart-button__about { display: flex; flex-direction: column; gap: 0.4rem; min-width: 0; }
.vp-cart-button__name { font-weight: 600; line-height: 1.3; }
.vp-cart-button__quantity { display: inline-flex; align-items: center; align-self: flex-start; border: 1px solid var(--vp-border, rgba(127, 127, 127, 0.3)); border-radius: 999px; }
.vp-cart-button__quantity button { width: 1.8rem; height: 1.8rem; border: 0; border-radius: 50%; background: none; color: inherit; font: inherit; cursor: pointer; }
.vp-cart-button__quantity span { min-width: 1.4rem; text-align: center; font-size: 0.9rem; }
.vp-cart-button__foot { display: flex; flex-direction: column; gap: 0.75rem; padding: 1.1rem 1.25rem 1.4rem; border-top: 1px solid var(--vp-border, rgba(127, 127, 127, 0.18)); }
.vp-cart-button__sum { display: flex; justify-content: space-between; font-size: 1.05rem; }
.vp-cart-button__problem { margin: 0; color: #c0362c; font-size: 0.9rem; }
.vp-cart-button__checkout { min-height: 3rem; border: 0; border-radius: var(--vp-radius, 8px); background: var(--vp-primary, #2563eb); color: var(--vp-primary-contrast, #fff); font: inherit; font-weight: 650; cursor: pointer; }
.vp-cart-button__checkout:hover:not(:disabled) { filter: brightness(1.08); }
.vp-cart-button__checkout:disabled { opacity: 0.7; }
.vp-cart-button__all { align-self: center; color: var(--vp-primary, #2563eb); font-size: 0.9375rem; font-weight: 600; text-decoration: none; }
.vp-cart-button__all:hover { text-decoration: underline; }
@media (prefers-reduced-motion: reduce) { .vp-cart-button__panel, .vp-cart-button__shade, .vp-cart-button__count { animation: none; } }
</style>
`;export{e as default};