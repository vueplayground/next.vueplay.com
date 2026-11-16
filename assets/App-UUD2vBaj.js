var e=`<template>
  <div class="vp-shop-checkout" :style="style">
    <!-- done: the order went through, or the visitor came back from paying -->
    <div v-if="done" class="vp-shop-checkout__done" role="status">
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="m8 12.5 2.8 2.8L16.5 9.5" /></svg>
      <h2>{{ say('thanksTitle', thanksTitle) }}</h2>
      <p>{{ say('thanksText', thanksText) }}</p>
      <p v-if="orderNumber" class="vp-shop-checkout__number">{{ say('order', orderText) }} {{ orderNumber }}</p>
      <a v-if="shopLink" class="vp-shop-checkout__link" :href="shopLink" @click="go($event, shopLink)">{{ say('shop', shopText) }}</a>
    </div>

    <p v-else-if="!lines.length" class="vp-shop-checkout__empty">{{ say('empty', emptyText) }} <a v-if="shopLink" class="vp-shop-checkout__link" :href="shopLink" @click="go($event, shopLink)">{{ say('shop', shopText) }}</a></p>

    <form v-else class="vp-shop-checkout__grid" novalidate @submit.prevent="pay">
      <div class="vp-shop-checkout__you">
        <h2 class="vp-shop-checkout__title">{{ say('title', title) }}</h2>
        <template v-if="asking.length">
          <div class="vp-shop-checkout__fields">
            <label v-for="one in asking" :key="one.key" class="vp-shop-checkout__field" :class="{ 'vp-shop-checkout__field--half': one.half }">
              <span>{{ say(one.key) }}</span>
              <input v-model="values[one.key]" class="vp-shop-checkout__input" :type="one.type" :name="one.key" :autocomplete="one.autocomplete" :aria-invalid="!!wrong[one.key]" :aria-describedby="wrong[one.key] ? idOf(one.key) : undefined" @input="wrong = { ...wrong, [one.key]: '' }">
              <small v-if="wrong[one.key]" :id="idOf(one.key)">{{ say(wrong[one.key]) }}</small>
            </label>
          </div>
        </template>
        <p v-else class="vp-shop-checkout__hosted">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
          {{ say('hosted', hostedText) }}
        </p>
        <div v-if="terms" class="vp-shop-checkout__agree">
          <label class="vp-shop-checkout__terms">
            <input ref="terms" v-model="agreed" type="checkbox" name="terms" :aria-invalid="own === 'agree'" :aria-describedby="own === 'agree' ? idOf('terms') : undefined" @change="own = ''">
            <span>{{ terms }} <a v-if="termsLink" :href="termsLink" target="_blank" rel="noopener">{{ say('termsLink', termsLinkText) }}</a></span>
          </label>
          <small v-if="own === 'agree'" :id="idOf('terms')" class="vp-shop-checkout__wrong">{{ say('agree') }}</small>
        </div>
      </div>

      <aside class="vp-shop-checkout__summary">
        <h3>{{ say('summary', summaryTitle) }}</h3>
        <ul>
          <li v-for="line in lines" :key="line.id + JSON.stringify(line.options || {})">
            <span class="vp-shop-checkout__picture"><img v-if="line.image" :src="line.image" alt="" loading="lazy" decoding="async"><template v-else>{{ (line.title || '?').charAt(0) }}</template><i>{{ line.quantity }}</i></span>
            <span class="vp-shop-checkout__name">{{ line.title }}</span>
            <b>{{ price(line.price * line.quantity, line.currency) }}</b>
          </li>
        </ul>
        <div class="vp-shop-checkout__sum"><span>{{ say('total', totalText) }}</span><b>{{ price(total, currency) }}</b></div>
        <p v-if="problem" class="vp-shop-checkout__problem" role="alert" :title="problem">{{ say('failed') }}</p>
        <button type="submit" class="vp-shop-checkout__pay" :disabled="busy">
          <span v-if="busy" class="vp-shop-checkout__spinner" aria-hidden="true" />
          {{ say('pay', payText) }}
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

// The words it says itself, in the site's language (App.vue's head says it: \`htmlAttrs: { lang }\`). A text
// that is filled in in the Props tab is said as it is written. (The note shown only in the editor stays English.)
const WORDS = {
  en: { title: 'Checkout', summary: 'Your order', total: 'Total', pay: 'Go to payment', hosted: 'You give your address and pay on the shop\\'s own secure page.', termsLink: 'terms of sale', thanksTitle: 'Thank you for your order!', thanksText: 'A receipt is on its way to your e-mail.', order: 'Order', empty: 'There is nothing to check out yet.', shop: 'Back to the shop', email: 'E-mail', name: 'Name', address: 'Address', postcode: 'Postcode', city: 'Town', country: 'Country', phone: 'Phone', fill: 'Please fill this in', badEmail: 'This does not look like an e-mail address', agree: 'Please agree first', failed: 'The checkout did not work. Please try again.' },
  nb: { title: 'Kasse', summary: 'Din bestilling', total: 'Totalt', pay: 'Gå til betaling', hosted: 'Du oppgir adressen og betaler på butikkens egen sikre side.', termsLink: 'salgsvilkårene', thanksTitle: 'Takk for bestillingen!', thanksText: 'En kvittering er på vei til e-posten din.', order: 'Bestilling', empty: 'Det er ingenting i handlekurven ennå.', shop: 'Tilbake til butikken', email: 'E-post', name: 'Navn', address: 'Adresse', postcode: 'Postnummer', city: 'Sted', country: 'Land', phone: 'Telefon', fill: 'Fyll ut dette feltet', badEmail: 'Dette ser ikke ut som en e-postadresse', agree: 'Du må godta vilkårene først', failed: 'Betalingen fungerte ikke. Prøv igjen.' },
  sv: { title: 'Kassa', summary: 'Din beställning', total: 'Totalt', pay: 'Gå till betalning', hosted: 'Du anger din adress och betalar på butikens egen säkra sida.', termsLink: 'köpvillkoren', thanksTitle: 'Tack för din beställning!', thanksText: 'Ett kvitto är på väg till din e-post.', order: 'Order', empty: 'Det finns inget i varukorgen än.', shop: 'Tillbaka till butiken', email: 'E-post', name: 'Namn', address: 'Adress', postcode: 'Postnummer', city: 'Ort', country: 'Land', phone: 'Telefon', fill: 'Fyll i det här fältet', badEmail: 'Det här ser inte ut som en e-postadress', agree: 'Godkänn villkoren först', failed: 'Det gick inte att gå till betalning. Försök igen.' },
  da: { title: 'Kasse', summary: 'Din ordre', total: 'I alt', pay: 'Gå til betaling', hosted: 'Du angiver din adresse og betaler på butikkens egen sikre side.', termsLink: 'salgsbetingelserne', thanksTitle: 'Tak for din ordre!', thanksText: 'En kvittering er på vej til din e-mail.', order: 'Ordre', empty: 'Der er intet i kurven endnu.', shop: 'Tilbage til butikken', email: 'E-mail', name: 'Navn', address: 'Adresse', postcode: 'Postnummer', city: 'By', country: 'Land', phone: 'Telefon', fill: 'Udfyld dette felt', badEmail: 'Det ligner ikke en e-mailadresse', agree: 'Accepter venligst betingelserne først', failed: 'Betalingen lykkedes ikke. Prøv igen.' },
  fi: { title: 'Kassa', summary: 'Tilauksesi', total: 'Yhteensä', pay: 'Siirry maksamaan', hosted: 'Annat osoitteesi ja maksat kaupan omalla suojatulla sivulla.', termsLink: 'myyntiehdot', thanksTitle: 'Kiitos tilauksestasi!', thanksText: 'Kuitti on matkalla sähköpostiisi.', order: 'Tilaus', empty: 'Ostoskorissa ei ole vielä mitään.', shop: 'Takaisin kauppaan', email: 'Sähköposti', name: 'Nimi', address: 'Osoite', postcode: 'Postinumero', city: 'Postitoimipaikka', country: 'Maa', phone: 'Puhelin', fill: 'Täytä tämä kenttä', badEmail: 'Tämä ei näytä sähköpostiosoitteelta', agree: 'Hyväksy ehdot ensin', failed: 'Kassalle siirtyminen ei onnistunut. Yritä uudelleen.' },
  de: { title: 'Kasse', summary: 'Deine Bestellung', total: 'Gesamt', pay: 'Zur Zahlung', hosted: 'Adresse und Zahlung gibst du auf der sicheren Seite des Shops ein.', termsLink: 'Verkaufsbedingungen', thanksTitle: 'Vielen Dank für deine Bestellung!', thanksText: 'Eine Bestätigung ist unterwegs in dein Postfach.', order: 'Bestellung', empty: 'Dein Warenkorb ist noch leer.', shop: 'Zurück zum Shop', email: 'E-Mail', name: 'Name', address: 'Adresse', postcode: 'PLZ', city: 'Ort', country: 'Land', phone: 'Telefon', fill: 'Bitte ausfüllen', badEmail: 'Das sieht nicht wie eine E-Mail-Adresse aus', agree: 'Bitte stimme zuerst zu', failed: 'Der Bezahlvorgang hat nicht funktioniert. Bitte versuche es erneut.' },
  fr: { title: 'Paiement', summary: 'Votre commande', total: 'Total', pay: 'Procéder au paiement', hosted: 'Vous indiquez votre adresse et payez sur la page sécurisée de la boutique.', termsLink: 'conditions générales de vente', thanksTitle: 'Merci pour votre commande !', thanksText: 'Un reçu vous a été envoyé par e-mail.', order: 'Commande', empty: 'Votre panier est encore vide.', shop: 'Retour à la boutique', email: 'E-mail', name: 'Nom', address: 'Adresse', postcode: 'Code postal', city: 'Ville', country: 'Pays', phone: 'Téléphone', fill: 'Veuillez remplir ce champ', badEmail: 'Cette adresse e-mail ne semble pas valide', agree: 'Veuillez d’abord accepter les conditions', failed: 'Le paiement n’a pas fonctionné. Veuillez réessayer.' },
  es: { title: 'Pago', summary: 'Tu pedido', total: 'Total', pay: 'Ir al pago', hosted: 'Indicas tu dirección y pagas en la página segura de la tienda.', termsLink: 'condiciones de venta', thanksTitle: '¡Gracias por tu pedido!', thanksText: 'Te hemos enviado el recibo por correo electrónico.', order: 'Pedido', empty: 'Tu carrito todavía está vacío.', shop: 'Volver a la tienda', email: 'Correo electrónico', name: 'Nombre', address: 'Dirección', postcode: 'Código postal', city: 'Ciudad', country: 'País', phone: 'Teléfono', fill: 'Rellena este campo', badEmail: 'Esto no parece un correo electrónico válido', agree: 'Acepta primero las condiciones', failed: 'No se pudo completar la compra. Inténtalo de nuevo.' },
  it: { title: 'Pagamento', summary: 'Il tuo ordine', total: 'Totale', pay: 'Vai al pagamento', hosted: 'Inserisci l’indirizzo e paghi sulla pagina sicura del negozio.', termsLink: 'condizioni di vendita', thanksTitle: 'Grazie per il tuo ordine!', thanksText: 'Ti abbiamo inviato la ricevuta via e-mail.', order: 'Ordine', empty: 'Il carrello è ancora vuoto.', shop: 'Torna al negozio', email: 'E-mail', name: 'Nome', address: 'Indirizzo', postcode: 'CAP', city: 'Città', country: 'Paese', phone: 'Telefono', fill: 'Compila questo campo', badEmail: 'Non sembra un indirizzo e-mail valido', agree: 'Accetta prima le condizioni', failed: 'Il pagamento non è andato a buon fine. Riprova.' },
  nl: { title: 'Afrekenen', summary: 'Je bestelling', total: 'Totaal', pay: 'Naar betalen', hosted: 'Je vult je adres in en betaalt op de beveiligde pagina van de winkel.', termsLink: 'verkoopvoorwaarden', thanksTitle: 'Bedankt voor je bestelling!', thanksText: 'Er is een bevestiging naar je e-mail onderweg.', order: 'Bestelling', empty: 'Je winkelwagen is nog leeg.', shop: 'Terug naar de winkel', email: 'E-mail', name: 'Naam', address: 'Adres', postcode: 'Postcode', city: 'Plaats', country: 'Land', phone: 'Telefoon', fill: 'Vul dit veld in', badEmail: 'Dit lijkt geen geldig e-mailadres', agree: 'Ga eerst akkoord met de voorwaarden', failed: 'Afrekenen is niet gelukt. Probeer het opnieuw.' },
  pt: { title: 'Finalizar compra', summary: 'Seu pedido', total: 'Total', pay: 'Ir para o pagamento', hosted: 'Você informa seu endereço e paga na página segura da loja.', termsLink: 'termos de venda', thanksTitle: 'Obrigado pelo seu pedido!', thanksText: 'Um recibo foi enviado para o seu e-mail.', order: 'Pedido', empty: 'Seu carrinho ainda está vazio.', shop: 'Voltar para a loja', email: 'E-mail', name: 'Nome', address: 'Endereço', postcode: 'Código postal', city: 'Cidade', country: 'País', phone: 'Telefone', fill: 'Preencha este campo', badEmail: 'Isto não parece um e-mail válido', agree: 'Aceite primeiro os termos', failed: 'Não foi possível finalizar a compra. Tente novamente.' },
  pl: { title: 'Kasa', summary: 'Twoje zamówienie', total: 'Razem', pay: 'Przejdź do płatności', hosted: 'Adres podajesz i płacisz na bezpiecznej stronie sklepu.', termsLink: 'regulamin sprzedaży', thanksTitle: 'Dziękujemy za zamówienie!', thanksText: 'Potwierdzenie jest już w drodze na Twój e-mail.', order: 'Zamówienie', empty: 'Koszyk jest jeszcze pusty.', shop: 'Wróć do sklepu', email: 'E-mail', name: 'Imię i nazwisko', address: 'Adres', postcode: 'Kod pocztowy', city: 'Miejscowość', country: 'Kraj', phone: 'Telefon', fill: 'Wypełnij to pole', badEmail: 'To nie wygląda na adres e-mail', agree: 'Najpierw zaakceptuj warunki', failed: 'Nie udało się przejść do płatności. Spróbuj ponownie.' },
  zh: { title: '结算', summary: '你的订单', total: '合计', pay: '去付款', hosted: '你将在商店的安全页面填写地址并付款。', termsLink: '销售条款', thanksTitle: '感谢你的订购！', thanksText: '收据已发送至你的邮箱。', order: '订单', empty: '购物车里还没有商品。', shop: '返回商店', email: '电子邮箱', name: '姓名', address: '地址', postcode: '邮政编码', city: '城市', country: '国家/地区', phone: '电话', fill: '请填写此项', badEmail: '这看起来不是有效的邮箱地址', agree: '请先同意条款', failed: '结算未成功，请重试。' },
  ja: { title: 'ご購入手続き', summary: 'ご注文内容', total: '合計', pay: 'お支払いへ進む', hosted: '住所の入力とお支払いはショップの安全なページで行います。', termsLink: '販売条件', thanksTitle: 'ご注文ありがとうございます！', thanksText: '領収書をメールでお送りしました。', order: '注文番号', empty: 'カートにはまだ何もありません。', shop: 'ショップに戻る', email: 'メールアドレス', name: 'お名前', address: '住所', postcode: '郵便番号', city: '市区町村', country: '国', phone: '電話番号', fill: '入力してください', badEmail: '有効なメールアドレスではないようです', agree: '先に同意してください', failed: '購入手続きができませんでした。もう一度お試しください。' }
}

export default {
  inject: { vpData: { default: null } },
  props: {
    title: { type: String, default: '', label: 'Title', placeholder: 'Checkout' },
    ask: { type: String, default: 'email', label: 'Asked here (your own backend)', control: 'select', options: [{ key: 'Nothing', value: 'nothing' }, { key: 'An e-mail', value: 'email' }, { key: 'An e-mail and the address', value: 'address' }] },
    summaryTitle: { type: String, default: '', label: 'Over the order', placeholder: 'Your order' },
    totalText: { type: String, default: '', label: 'Before the sum', placeholder: 'Total' },
    payText: { type: String, default: '', label: 'Pay button', placeholder: 'Go to payment' },
    hostedText: { type: String, default: '', label: 'Said when the shop asks for the rest', placeholder: 'You give your address and pay on the shop\\'s own secure page.' },
    terms: { type: String, default: '', label: 'Agree to', placeholder: 'I agree to the' },
    termsLinkText: { type: String, default: '', label: 'Its link text', placeholder: 'terms of sale' },
    termsLink: { type: String, default: '', label: 'Its link', placeholder: '/terms' },
    thanksTitle: { type: String, default: '', label: 'Title when done', placeholder: 'Thank you for your order!' },
    thanksText: { type: String, default: '', label: 'Said when done', control: 'textarea', placeholder: 'A receipt is on its way to your e-mail.' },
    orderText: { type: String, default: '', label: 'Before the order number', placeholder: 'Order' },
    paidParam: { type: String, default: 'paid', label: 'Back from paying when the address has', placeholder: 'paid' },
    emptyText: { type: String, default: '', label: 'Said when the cart is empty', placeholder: 'There is nothing to check out yet.' },
    shopText: { type: String, default: '', label: 'Link back to the shop', placeholder: 'Back to the shop' },
    shopLink: { type: String, default: '/shop', label: 'Its link' },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 30 }
  },
  data() {
    return { values: {}, wrong: {}, agreed: false, own: '', back: false }
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
    // (what the shop said went wrong: shown in the site's language, its own words kept as the title)
    problem() {
      return this.cart?.error || ''
    },
    done() {
      return !!this.cart?.order || this.back
    },
    count() {
      return this.cart?.lines?.length || 0
    },
    orderNumber() {
      const order = this.cart?.order
      return order && typeof order === 'object' ? order.number || order.id || '' : ''
    },
    style() {
      return { '--vp-shop-checkout-radius': this.radius || undefined }
    }
  },
  watch: {
    // Something new in the cart after an order: a new order, so the thanks for the last one is done with
    count(now, before) {
      if (now > 0 && !before) this.forgetOrder()
    }
  },
  created() {
    this.forgetOrder()
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
    say(key, own, n) {
      if (own) return own
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return String(words[key] ?? WORDS.en[key]).replace('{n}', n ?? '')
    },
    price(amount, currency) {
      if (this.vpData?.money) return this.vpData.money(amount, currency, this.lang)
      const value = Number(amount) || 0
      try { return currency ? value.toLocaleString(this.lang, { style: 'currency', currency }) : value.toFixed(2) } catch (e) { return value.toFixed(2) }
    },
    idOf(key) {
      return 'vp-shop-checkout-' + (this.$?.uid ?? 0) + '-' + key
    },
    // (an order the runtime still holds while the cart has new things in it is an order from before)
    forgetOrder() {
      if (this.cart?.order && this.count > 0) this.cart.order = null
    },
    check() {
      const wrong = {}
      for (const one of this.asking) {
        const value = String(this.values[one.key] || '').trim()
        if (!value && one.key !== 'phone') wrong[one.key] = 'fill'
        else if (one.key === 'email' && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)) wrong[one.key] = 'badEmail'
      }
      this.wrong = wrong
      this.own = this.terms && !this.agreed ? 'agree' : ''
      return !Object.keys(wrong).length && !this.own
    },
    // The focus goes to the first field that needs something, so the visitor hears what is wrong
    focusWrong() {
      this.$nextTick(() => {
        const key = this.asking.find(one => this.wrong[one.key])?.key
        const field = key ? this.$el?.querySelector?.('[name="' + key + '"]') : this.own === 'agree' ? this.$refs.terms : null
        field?.focus?.()
      })
    },
    async pay() {
      if (this.busy) return
      if (!this.check()) { this.focusWrong(); return }
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
.vp-shop-checkout__title { margin: 0; font-family: var(--vp-font-heading, inherit); font-size: 1.8rem; }
.vp-shop-checkout__fields { display: flex; flex-wrap: wrap; gap: 0.9rem; }
.vp-shop-checkout__field { display: flex; flex: 1 1 100%; flex-direction: column; gap: 0.35rem; font-size: 0.9375rem; font-weight: 550; }
.vp-shop-checkout__field--half { flex-basis: calc(50% - 0.45rem); }
.vp-shop-checkout__field small { color: #c0362c; font-weight: 400; }
.vp-shop-checkout__input { box-sizing: border-box; width: 100%; padding: 0.75rem 0.9rem; border: 1px solid var(--vp-border, rgba(127, 127, 127, 0.4)); border-radius: var(--_radius); background: var(--vp-input, transparent); color: inherit; font: inherit; font-weight: 400; }
.vp-shop-checkout__input:focus { outline: none; border-color: var(--vp-primary, #2563eb); box-shadow: 0 0 0 3px color-mix(in srgb, var(--vp-primary, #2563eb) 22%, transparent); }
.vp-shop-checkout__input[aria-invalid="true"] { border-color: #d0453b; }
.vp-shop-checkout__hosted { display: flex; gap: 0.75rem; align-items: flex-start; margin: 0; padding: 1rem; border-radius: var(--_radius); background: var(--vp-surface, rgba(127, 127, 127, 0.07)); line-height: 1.5; }
.vp-shop-checkout__hosted svg, .vp-shop-checkout__done svg { flex: none; width: 1.3rem; height: 1.3rem; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.vp-shop-checkout__agree { display: flex; flex-direction: column; gap: 0.35rem; }
.vp-shop-checkout__wrong { color: #c0362c; font-size: 0.9375rem; }
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
@media (prefers-reduced-motion: reduce) { .vp-shop-checkout__spinner { animation-duration: 2.4s; } }
.vp-shop-checkout__note { margin: 0; font-size: 0.8125rem; opacity: 0.6; }
.vp-shop-checkout__empty { padding: 2.5rem 1rem; text-align: center; opacity: 0.85; }
.vp-shop-checkout__done { display: flex; flex-direction: column; align-items: center; gap: 0.6rem; max-width: 32rem; margin: 0 auto; padding: 2.5rem 1rem; text-align: center; }
.vp-shop-checkout__done svg { width: 3rem; height: 3rem; color: #16a34a; stroke-width: 1.5; }
.vp-shop-checkout__done h2 { margin: 0.25rem 0 0; font-family: var(--vp-font-heading, inherit); }
.vp-shop-checkout__done p { margin: 0; opacity: 0.8; }
.vp-shop-checkout__number { font-weight: 600; }
.vp-shop-checkout__link { color: var(--vp-primary, #2563eb); font-weight: 600; text-decoration: none; }
.vp-shop-checkout__link:hover { text-decoration: underline; }
</style>
`;export{e as default};