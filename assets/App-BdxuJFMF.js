var e=`<template>
  <div class="vp-product-grid" :class="['vp-product-grid--' + look, 'vp-product-grid--' + align]" :style="style">
    <p v-if="!shown.length" class="vp-product-grid__empty">{{ say('empty', emptyText) }}</p>
    <article v-for="(item, i) in shown" :key="item.id || i" class="vp-product-grid__item">
      <!-- (the picture and the words in one box: the "over" look lays the words on the picture inside it) -->
      <div class="vp-product-grid__top">
        <!-- (the picture's link is the title's again: out of the tab order and hidden from screen readers) -->
        <a class="vp-product-grid__picture" :href="item.href || undefined" tabindex="-1" aria-hidden="true" @click="go($event, item.href)">
          <img v-if="item.image" :src="address(item.image) || undefined" :style="held(item.image)" :alt="item.title" loading="lazy" decoding="async">
          <span v-else class="vp-product-grid__none" :style="{ '--vp-product-grid-hue': (i * 47) % 360 }">{{ (item.title || '?').charAt(0) }}</span>
          <span v-if="item.badge || onSale(item)" class="vp-product-grid__badge" :class="{ 'vp-product-grid__badge--sale': onSale(item) && !item.badge }">{{ item.badge || say('sale', saleText) }}</span>
        </a>
        <div class="vp-product-grid__words">
          <h3 class="vp-product-grid__title"><a :href="item.href || undefined" @click="go($event, item.href)">{{ item.title }}</a></h3>
          <p v-if="showText && item.text" class="vp-product-grid__text">{{ item.text }}</p>
          <p v-if="showRating && rated(item)" class="vp-product-grid__rating" role="img" :aria-label="say('rated', '', rated(item))">
            <span class="vp-product-grid__stars" :style="{ '--vp-product-grid-stars': rated(item) / 5 }" aria-hidden="true"></span>
            <span v-if="Number(item.reviews) > 0" class="vp-product-grid__reviews" aria-hidden="true">({{ Number(item.reviews) }})</span>
          </p>
          <p class="vp-product-grid__price" :class="{ 'vp-product-grid__price--sale': onSale(item) }">
            <span>{{ price(item.price, item.currency) }}</span>
            <s v-if="onSale(item)">{{ price(item.compare, item.currency) }}</s>
          </p>
        </div>
      </div>
      <button v-if="addButton" type="button" class="vp-product-grid__add" :class="{ 'vp-product-grid__add--done': added === i }" :disabled="!cartId(item) && !inStudio" @click="add(item, i)">
        <svg v-if="added === i" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
        <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
        {{ added === i ? say('added', addedText) : say('add', addText) }}
      </button>
    </article>
  </div>
</template>
<script>
// Products in a grid: a picture, a name, a price (and the price before, when it is on sale), and a button that puts
// it in the cart. Fill the list by hand, or show it from your shop with the plug (Shopify, WooCommerce, your API):
// \`id\` is what goes in the cart (a Shopify variant, a WooCommerce product). In the editor an empty list shows samples.
// (their words are in WORDS, so they speak the site's language: \`sample1\`, \`sampleText\`, \`sampleNew\` …)
const SAMPLES = [
  { id: 's1', title: 'sample1', price: 590, compare: 790, currency: 'EUR', href: '#', text: 'sampleText', rating: 4.6, reviews: 38 },
  { id: 's2', title: 'sample2', price: 290, currency: 'EUR', href: '#', badge: 'sampleNew', rating: 4, reviews: 7 },
  { id: 's3', title: 'sample3', price: 450, currency: 'EUR', href: '#' },
  { id: 's4', title: 'sample4', price: 650, currency: 'EUR', href: '#' }
]

// The words it says itself, in the site's language (App.vue's head says it: \`htmlAttrs: { lang }\`). A text
// that is filled in in the Props tab is said as it is written.
const WORDS = {
  en: { add: 'Add to cart', added: 'Added', sale: 'Sale', empty: 'Nothing here yet.', rated: 'Rated {n} out of 5', sample1: 'Linen shirt', sample2: 'Wool cap', sample3: 'Canvas bag', sample4: 'Leather belt', sampleText: 'Light and cool', sampleNew: 'New' },
  nb: { add: 'Legg i handlekurven', added: 'Lagt til', sale: 'Salg', empty: 'Ingenting her ennå.', rated: 'Vurdert til {n} av 5', sample1: 'Linskjorte', sample2: 'Ullue', sample3: 'Lerretsveske', sample4: 'Skinnbelte', sampleText: 'Lett og svalt', sampleNew: 'Ny' },
  sv: { add: 'Lägg i varukorgen', added: 'Tillagd', sale: 'Rea', empty: 'Inget här än.', rated: 'Betyg {n} av 5', sample1: 'Linneskjorta', sample2: 'Ullmössa', sample3: 'Kanvasväska', sample4: 'Läderbälte', sampleText: 'Lätt och sval', sampleNew: 'Ny' },
  da: { add: 'Læg i kurven', added: 'Tilføjet', sale: 'Udsalg', empty: 'Intet her endnu.', rated: 'Bedømt {n} ud af 5', sample1: 'Hørskjorte', sample2: 'Uldhue', sample3: 'Canvastaske', sample4: 'Læderbælte', sampleText: 'Let og køligt', sampleNew: 'Ny' },
  fi: { add: 'Lisää ostoskoriin', added: 'Lisätty', sale: 'Ale', empty: 'Täällä ei ole vielä mitään.', rated: 'Arvio {n}/5', sample1: 'Pellavapaita', sample2: 'Villapipo', sample3: 'Kangaskassi', sample4: 'Nahkavyö', sampleText: 'Kevyt ja viileä', sampleNew: 'Uusi' },
  de: { add: 'In den Warenkorb', added: 'Hinzugefügt', sale: 'Sale', empty: 'Hier ist noch nichts.', rated: 'Bewertet mit {n} von 5', sample1: 'Leinenhemd', sample2: 'Wollmütze', sample3: 'Canvastasche', sample4: 'Ledergürtel', sampleText: 'Leicht und kühl', sampleNew: 'Neu' },
  fr: { add: 'Ajouter au panier', added: 'Ajouté', sale: 'Promo', empty: 'Rien pour l’instant.', rated: 'Noté {n} sur 5', sample1: 'Chemise en lin', sample2: 'Bonnet en laine', sample3: 'Sac en toile', sample4: 'Ceinture en cuir', sampleText: 'Léger et frais', sampleNew: 'Nouveau' },
  es: { add: 'Añadir al carrito', added: 'Añadido', sale: 'Oferta', empty: 'Aún no hay nada.', rated: 'Valorado con {n} de 5', sample1: 'Camisa de lino', sample2: 'Gorro de lana', sample3: 'Bolsa de lona', sample4: 'Cinturón de cuero', sampleText: 'Ligera y fresca', sampleNew: 'Nuevo' },
  it: { add: 'Aggiungi al carrello', added: 'Aggiunto', sale: 'Saldi', empty: 'Ancora niente qui.', rated: 'Valutato {n} su 5', sample1: 'Camicia di lino', sample2: 'Berretto di lana', sample3: 'Borsa di tela', sample4: 'Cintura in pelle', sampleText: 'Leggera e fresca', sampleNew: 'Novità' },
  nl: { add: 'In winkelwagen', added: 'Toegevoegd', sale: 'Sale', empty: 'Hier staat nog niets.', rated: 'Beoordeeld met {n} van 5', sample1: 'Linnen overhemd', sample2: 'Wollen muts', sample3: 'Canvas tas', sample4: 'Leren riem', sampleText: 'Licht en koel', sampleNew: 'Nieuw' },
  pt: { add: 'Adicionar ao carrinho', added: 'Adicionado', sale: 'Promoção', empty: 'Ainda não há nada aqui.', rated: 'Avaliado com {n} de 5', sample1: 'Camisa de linho', sample2: 'Gorro de lã', sample3: 'Bolsa de lona', sample4: 'Cinto de couro', sampleText: 'Leve e fresca', sampleNew: 'Novo' },
  pl: { add: 'Dodaj do koszyka', added: 'Dodano', sale: 'Wyprzedaż', empty: 'Na razie nic tu nie ma.', rated: 'Ocena {n} na 5', sample1: 'Lniana koszula', sample2: 'Wełniana czapka', sample3: 'Płócienna torba', sample4: 'Skórzany pasek', sampleText: 'Lekka i przewiewna', sampleNew: 'Nowość' },
  zh: { add: '加入购物车', added: '已加入', sale: '特价', empty: '这里还没有内容。', rated: '评分 {n}/5', sample1: '亚麻衬衫', sample2: '羊毛帽', sample3: '帆布包', sample4: '皮带', sampleText: '轻盈凉爽', sampleNew: '新品' },
  ja: { add: 'カートに入れる', added: '追加しました', sale: 'セール', empty: 'まだ何もありません。', rated: '5段階中{n}の評価', sample1: 'リネンシャツ', sample2: 'ウールキャップ', sample3: 'キャンバスバッグ', sample4: 'レザーベルト', sampleText: '軽くて涼しい', sampleNew: '新作' }
}

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
        { key: 'text', label: 'A line about it' },
        { key: 'rating', label: 'Rating (0 to 5)', control: 'number' },
        { key: 'reviews', label: 'How many have rated it', control: 'number' }
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
    showRating: { type: Boolean, default: true, label: 'Show the rating (stars)' },
    addText: { type: String, default: '', label: 'Its text', placeholder: 'Add to cart' },
    addedText: { type: String, default: '', label: 'Said when added', placeholder: 'Added' },
    saleText: { type: String, default: '', label: 'Word when on sale', placeholder: 'Sale' },
    currency: { type: String, default: '', label: 'Currency (when the products do not say)', placeholder: 'EUR' },
    emptyText: { type: String, default: '', label: 'Said when there are none', placeholder: 'Nothing here yet.' },
    seo: { type: Boolean, default: true, label: 'Tell search engines about the products' },
    gap: { type: String, default: '', label: 'Space between', control: 'slider', unit: 'px', min: 0, max: 64 },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 40 }
  },
  data() {
    return { added: -1, found: {} }
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
    shown() {
      const list = Array.isArray(this.items) && this.items.length ? this.items : this.inStudio ? this.samples : []
      return Number(this.limit) > 0 ? list.slice(0, Number(this.limit)) : list
    },
    samples() {
      return SAMPLES.map(one => ({ ...one, title: this.say(one.title), ...(one.text ? { text: this.say(one.text) } : {}), ...(one.badge ? { badge: this.say(one.badge) } : {}) }))
    },
    pictureNames() {
      return this.shown.map(item => item.image).filter(one => /^--/.test(one || ''))
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
    // A picture picked in the Studio is the name of a variable that holds it (--image-mug): shown through that
    // variable at once, and its address read from it when the page is alive. An address is used as it is.
    address(value) {
      return /^--/.test(value || '') ? this.found[value] || '' : value || ''
    },
    held(value) {
      return /^--/.test(value || '') && !this.found[value] ? { content: 'var(' + value + ')' } : undefined
    },
    findPictures() {
      if (!this.$el || this.$el.nodeType !== 1 || typeof getComputedStyle === 'undefined') return
      const style = getComputedStyle(this.$el)
      const found = {}
      for (const name of this.pictureNames) {
        const address = /^\\s*url\\(\\s*(['"]?)(.*?)\\1\\s*\\)\\s*$/.exec(style.getPropertyValue(name))
        if (address) found[name] = address[2]
      }
      this.found = found
    },
    say(key, own, n) {
      if (own) return own
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return String(words[key] ?? WORDS.en[key]).replace('{n}', n ?? '')
    },
    rated(item) {
      const value = Number(item?.rating)
      return value > 0 ? Math.round(Math.min(5, value) * 10) / 10 : 0
    },
    // What goes in the cart: its id, else (a product filled in by hand) its page or its name
    cartId(item) {
      return String(item?.id || item?.href || item?.title || '')
    },
    onSale(item) {
      return Number(item.compare) > Number(item.price)
    },
    price(amount, currency) {
      const code = currency || this.currency
      if (this.vpData?.money) return this.vpData.money(amount, code, this.lang)
      const value = Number(amount) || 0
      try { return code ? value.toLocaleString(this.lang, { style: 'currency', currency: code }) : value.toFixed(2) } catch (e) { return value.toFixed(2) + ' ' + code }
    },
    add(item, i) {
      if (!this.inStudio) this.vpData?.addToCart?.({ id: this.cartId(item), title: item.title, price: Number(item.price) || 0, currency: item.currency || this.currency, image: item.image ? this.address(item.image) : item.image, href: item.href })
      this.added = i
      clearTimeout(this.timer)
      this.timer = setTimeout(() => { this.added = -1 }, 1600)
    },
    go(event, href) {
      if (this.inStudio) { event.preventDefault(); return }
      if (this.$router && String(href || '').startsWith('/')) { event.preventDefault(); this.$router.push(href) }
    }
  },
  watch: {
    pictureNames() { this.$nextTick(() => this.findPictures()) }
  },
  mounted() {
    this.findPictures()
  },
  // What search engines read about the list (on the site, not in the editor): the products and their pages
  head() {
    const items = this.seo && !this.inStudio ? this.shown.filter(item => item.title) : []
    if (!items.length) return {}
    return {
      script: [{
        type: 'application/ld+json',
        textContent: {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: String(item.title), ...(item.href && item.href !== '#' ? { url: String(item.href) } : {}) }))
        }
      }]
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
  --_line: var(--vp-border, color-mix(in oklch, currentColor 14%, transparent));
  display: grid;
  --_columns: var(--vp-product-grid-columns, 4);
  /* (at most that many side by side, and fewer where the grid itself is narrow, as in a column beside a sidebar:
     a product is never narrower than --vp-product-grid-min) */
  grid-template-columns: repeat(auto-fill, minmax(max(min(var(--vp-product-grid-min, 10rem), 100%), calc((100% - (var(--_columns) - 1) * var(--_gap)) / var(--_columns) - 0.5px)), 1fr));
  gap: calc(var(--_gap) * 1.6) var(--_gap);
  width: 100%;
}
@media (max-width: 900px) { .vp-product-grid { --_columns: min(var(--vp-product-grid-columns, 4), 3); } }
@media (max-width: 600px) { .vp-product-grid { --_gap: var(--vp-product-grid-gap, 0.875rem); grid-template-columns: repeat(var(--vp-product-grid-phone, 2), minmax(0, 1fr)); } }
.vp-product-grid__empty { grid-column: 1 / -1; margin: 0; padding: 3rem 1.5rem; border: 1px dashed var(--_line); border-radius: var(--_radius); color: var(--vp-muted, inherit); text-align: center; }
.vp-product-grid__item { position: relative; display: flex; flex-direction: column; gap: 0.85rem; min-width: 0; }
.vp-product-grid--center .vp-product-grid__item { text-align: center; }
.vp-product-grid--cards .vp-product-grid__item {
  padding: 0.625rem 0.625rem 0.875rem;
  border: 1px solid var(--_line);
  border-radius: calc(var(--_radius) + 0.625rem);
  background: var(--vp-surface, transparent);
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.35s ease, border-color 0.2s ease;
}
.vp-product-grid--cards .vp-product-grid__item:hover { transform: translateY(-3px); border-color: color-mix(in oklch, var(--vp-text, currentColor) 22%, transparent); box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 14px 32px -14px rgba(0, 0, 0, 0.22); }
.vp-product-grid--cards .vp-product-grid__words { padding: 0 0.375rem; }
.vp-product-grid__picture {
  position: relative;
  display: block;
  flex: none;
  overflow: hidden;
  aspect-ratio: var(--vp-product-grid-ratio, 4 / 5);
  border-radius: var(--_radius);
  background: var(--vp-surface, color-mix(in oklch, currentColor 6%, transparent));
  isolation: isolate;
}
/* (a hairline round the picture, drawn over it: a pale picture on a pale page still has an edge) */
.vp-product-grid__picture::after { content: ''; position: absolute; inset: 0; z-index: 1; border-radius: inherit; box-shadow: inset 0 0 0 1px color-mix(in oklch, var(--vp-text, #111827) 7%, transparent); pointer-events: none; }
/* (the picture fills its frame whatever it is: laid over the frame, so a picture with a size of its own, an .svg
   shown through a variable, cannot push out of it) */
.vp-product-grid__picture img { position: absolute; inset: 0; display: block; width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }
.vp-product-grid__item:hover .vp-product-grid__picture img { transform: scale(1.045); }
.vp-product-grid__none {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: linear-gradient(140deg, hsl(var(--vp-product-grid-hue, 0) 45% 90%), hsl(calc(var(--vp-product-grid-hue, 0) + 40) 50% 82%));
  color: hsl(var(--vp-product-grid-hue, 0) 30% 38%);
  font-family: var(--vp-font-heading, inherit);
  font-size: clamp(2rem, 6vw, 3rem);
  font-weight: 600;
}
.vp-product-grid__badge {
  position: absolute;
  top: 0.625rem;
  left: 0.625rem;
  z-index: 2;
  padding: 0.3rem 0.6rem;
  border-radius: min(calc(var(--_radius) * 0.6), 999px);
  background: var(--vp-background, #fff);
  color: var(--vp-text, #111827);
  font-size: 0.6875rem;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08), 0 4px 12px -4px rgba(0, 0, 0, 0.16);
}
.vp-product-grid__badge--sale { background: var(--vp-sale, #c8321f); color: var(--vp-sale-contrast, #fff); }
.vp-product-grid__words { display: flex; flex: 1 1 auto; flex-direction: column; gap: 0.3rem; min-width: 0; }
.vp-product-grid__top { display: contents; }
.vp-product-grid--over .vp-product-grid__top { position: relative; display: block; }
.vp-product-grid--over .vp-product-grid__words { position: absolute; left: 0.625rem; right: 0.625rem; bottom: 0.625rem; z-index: 2; padding: 0.7rem 0.85rem; border-radius: max(calc(var(--_radius) - 0.4rem), 4px); background: color-mix(in srgb, var(--vp-background, #fff) 86%, transparent); backdrop-filter: blur(14px) saturate(1.4); -webkit-backdrop-filter: blur(14px) saturate(1.4); box-shadow: 0 8px 24px -12px rgba(0, 0, 0, 0.3); }
.vp-product-grid__title { margin: 0; font-family: inherit; font-size: 1rem; font-weight: 600; line-height: 1.3; letter-spacing: -0.005em; text-wrap: balance; }
.vp-product-grid__title a { color: inherit; text-decoration: none; background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat; transition: background-size 0.3s ease; }
.vp-product-grid__title a:hover, .vp-product-grid__item:hover .vp-product-grid__title a { background-size: 100% 1px; }
.vp-product-grid__title a:focus-visible { outline: 2px solid var(--vp-primary, #2563eb); outline-offset: 3px; border-radius: 3px; }
.vp-product-grid__text { display: -webkit-box; margin: 0; overflow: hidden; -webkit-box-orient: vertical; -webkit-line-clamp: 2; color: var(--vp-muted, inherit); font-size: 0.875rem; line-height: 1.45; }
.vp-product-grid__rating { display: flex; gap: 0.4rem; align-items: center; margin: 0.1rem 0 0; font-size: 0.8125rem; line-height: 1; }
.vp-product-grid--center .vp-product-grid__rating { justify-content: center; }
.vp-product-grid__stars {
  position: relative;
  display: inline-block;
  font-size: 0.8125rem;
  line-height: 1;
  letter-spacing: 0.1em;
  color: color-mix(in srgb, currentColor 18%, transparent);
}
.vp-product-grid__stars::before { content: '★★★★★'; }
.vp-product-grid__stars::after {
  content: '★★★★★';
  position: absolute;
  inset: 0;
  overflow: hidden;
  width: calc(var(--vp-product-grid-stars, 0) * 100%);
  color: var(--vp-rating, #e8a317);
  white-space: nowrap;
}
.vp-product-grid__reviews { color: var(--vp-muted, inherit); font-variant-numeric: tabular-nums; }
/* (the price sits at the foot of the words, so prices and buttons line up across a row of cards) */
.vp-product-grid__price { display: flex; flex-wrap: wrap; gap: 0.1rem 0.5rem; align-items: baseline; margin: auto 0 0; padding-top: 0.35rem; font-size: 1.0625rem; font-weight: 650; line-height: 1.2; letter-spacing: -0.01em; font-variant-numeric: tabular-nums; }
.vp-product-grid--center .vp-product-grid__price { justify-content: center; }
.vp-product-grid__price--sale span { color: var(--vp-sale, #c8321f); }
.vp-product-grid__price s { color: var(--vp-muted, inherit); font-size: 0.875rem; font-weight: 400; letter-spacing: 0; text-decoration-thickness: 1px; opacity: 0.85; }
.vp-product-grid__add {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  margin-top: auto;
  min-height: 2.75rem;
  padding: 0.55em 1em;
  border: 1px solid color-mix(in oklch, var(--vp-text, currentColor) 22%, transparent);
  border-radius: var(--vp-radius, 8px);
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.2;
  cursor: pointer;
  transition: background 180ms ease, color 180ms ease, border-color 180ms ease, transform 120ms ease;
}
.vp-product-grid--cards .vp-product-grid__add { background: color-mix(in oklch, var(--vp-text, currentColor) 5%, transparent); border-color: transparent; }
.vp-product-grid__add:hover:not(:disabled), .vp-product-grid__add--done { border-color: var(--vp-primary, #2563eb); background: var(--vp-primary, #2563eb); color: var(--vp-primary-contrast, #fff); }
.vp-product-grid__add:active:not(:disabled) { transform: scale(0.98); }
.vp-product-grid__add:focus-visible { outline: 2px solid var(--vp-primary, #2563eb); outline-offset: 2px; }
.vp-product-grid__add:disabled { opacity: 0.45; cursor: default; }
.vp-product-grid__add svg { flex: none; width: 0.95rem; height: 0.95rem; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
.vp-product-grid__add--done svg { animation: vp-product-grid-tick 0.35s cubic-bezier(0.3, 1.5, 0.5, 1); }
@keyframes vp-product-grid-tick { from { transform: scale(0.3); opacity: 0; } }
@media (max-width: 600px) {
  .vp-product-grid__title { font-size: 0.9375rem; }
  .vp-product-grid__price { font-size: 1rem; }
  .vp-product-grid__add { padding-inline: 0.5em; font-size: 0.85rem; }
}
@media (prefers-reduced-motion: reduce) {
  .vp-product-grid__picture img, .vp-product-grid--cards .vp-product-grid__item, .vp-product-grid__title a, .vp-product-grid__add { transition: none; }
  .vp-product-grid__item:hover .vp-product-grid__picture img, .vp-product-grid--cards .vp-product-grid__item:hover, .vp-product-grid__add:active:not(:disabled) { transform: none; }
  .vp-product-grid__add--done svg { animation: none; }
}
</style>
`;export{e as default};