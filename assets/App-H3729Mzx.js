var e=`<template>
  <div class="vp-price" :class="{ 'vp-price--featured': featured }" :style="style">
    <span v-if="badge" class="vp-price__badge">{{ badge }}</span>
    <component :is="level" class="vp-price__name">{{ name }}</component>
    <p v-if="text" class="vp-price__text">{{ text }}</p>
    <p class="vp-price__amount">
      <span class="vp-price__number">{{ price }}</span>
      <span v-if="period" class="vp-price__period">{{ period }}</span>
    </p>
    <!-- (a button that goes nowhere is left out on the site; the editor shows it, waiting for its link) -->
    <a v-if="button && (href || inStudio)" class="vp-price__button" :href="href || undefined" @click="go">{{ button }}</a>
    <ul v-if="features.length" class="vp-price__list">
      <li v-for="(feature, index) in features" :key="index" class="vp-price__item" :class="{ 'vp-price__item--without': feature.without }">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path :d="feature.without ? 'M7 7l10 10M17 7L7 17' : 'M5 12.5l4.5 4.5L19 7.5'" /></svg>
        <span class="vp-price__hidden">{{ feature.without ? say('without') : say('with') }}: </span>
        <span>{{ feature.text }}</span>
      </li>
    </ul>
    <slot />
  </div>
</template>
<script>
// One plan with its price: what it is called, what it costs, what is in it, and a button to pick it.
// Two or three of them in Columns is a price table; mark the one most people should take as featured.
// The words it says itself, in the site's language (App.vue's head says it: \`htmlAttrs: { lang }\`).
const WORDS = {
  en: { with: 'Included', without: 'Not included' },
  nb: { with: 'Inkludert', without: 'Ikke inkludert' },
  sv: { with: 'Ingår', without: 'Ingår inte' },
  da: { with: 'Inkluderet', without: 'Ikke inkluderet' },
  fi: { with: 'Sisältyy', without: 'Ei sisälly' },
  de: { with: 'Enthalten', without: 'Nicht enthalten' },
  fr: { with: 'Inclus', without: 'Non inclus' },
  es: { with: 'Incluido', without: 'No incluido' },
  it: { with: 'Incluso', without: 'Non incluso' },
  nl: { with: 'Inbegrepen', without: 'Niet inbegrepen' },
  pt: { with: 'Incluído', without: 'Não incluído' },
  pl: { with: 'W cenie', without: 'Nie w cenie' },
  zh: { with: '包含', without: '不包含' },
  ja: { with: '含まれる', without: '含まれない' }
}

export default {
  props: {
    name: { type: String, default: 'Standard', label: 'Name' },
    text: { type: String, default: 'For most people.', label: 'A line about it' },
    price: { type: String, default: '$19', label: 'Price' },
    period: { type: String, default: '/ month', label: 'Per' },
    features: {
      type: Array,
      default: () => [{ text: 'Everything you need to start' }, { text: 'Your own address' }, { text: 'Help when you ask', without: true }],
      label: 'What is in it',
      control: 'list',
      fields: [{ key: 'text', label: 'Text' }, { key: 'without', label: 'Not in this one', control: 'boolean' }]
    },
    button: { type: String, default: 'Get started', label: 'Button text' },
    href: { type: String, default: '', label: 'Button link (shown on the site once it has one)', placeholder: '/page, #anchor or https://…' },
    featured: { type: Boolean, default: false, label: 'Featured' },
    badge: { type: String, default: '', label: 'Badge', placeholder: 'Most popular' },
    color: { type: String, default: '', label: 'Color', control: 'color' },
    level: {
      type: String,
      default: 'h3',
      label: 'Name is a',
      options: [{ key: 'Heading 2', value: 'h2' }, { key: 'Heading 3', value: 'h3' }, { key: 'Heading 4', value: 'h4' }, { key: 'Plain line', value: 'div' }]
    }
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
    style() {
      return { '--vp-price-color': this.color || undefined }
    },
    inStudio() {
      return typeof document !== 'undefined' && (document.getElementById('receiver') ? document.getElementById('receiver').getAttribute('live') !== 'yes' : !!window.studio)
    }
  },
  methods: {
    say(key, own, n) {
      if (own) return own
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return String(words[key] ?? WORDS.en[key]).replace('{n}', n ?? '')
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
.vp-price {
  --_color: var(--vp-price-color, var(--vp-primary, #2563eb));
  --_hair: var(--vp-border, rgba(127, 127, 127, 0.28));
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
  padding: clamp(1.5rem, 3vw, 2.25rem);
  border: 1px solid var(--_hair);
  border-radius: var(--vp-radius, 12px);
  background: var(--vp-surface, transparent);
  text-align: left;
}
/* The plan that is recommended leads: a ring and a glow in its colour, a wash of the colour from the top,
   its name in the colour and a filled button. */
.vp-price--featured {
  border-color: var(--_color);
  background:
    linear-gradient(180deg, color-mix(in oklch, var(--_color) 9%, transparent), transparent 42%),
    var(--vp-background, var(--vp-surface, transparent));
  box-shadow: 0 0 0 1px var(--_color), 0 1px 2px color-mix(in oklch, var(--_color) 16%, transparent), 0 18px 44px -12px color-mix(in oklch, var(--_color) 30%, transparent);
}
.vp-price__badge {
  position: absolute;
  top: 0;
  right: clamp(1.25rem, 3vw, 2rem);
  transform: translateY(-50%);
  padding: 0.3em 0.85em;
  border-radius: 999px;
  background: var(--_color);
  color: var(--vp-primary-contrast, #fff);
  box-shadow: 0 2px 8px color-mix(in oklch, var(--_color) 35%, transparent);
  font-size: 0.6875rem;
  font-weight: 650;
  line-height: 1.5;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  white-space: nowrap;
}
.vp-price__name { margin: 0; font-family: var(--vp-font-heading, inherit); font-size: 1.0625rem; font-weight: 650; line-height: 1.3; letter-spacing: -0.005em; }
.vp-price--featured .vp-price__name { color: color-mix(in oklch, var(--_color) 78%, var(--vp-text, currentColor)); }
.vp-price__text { margin: 0; color: color-mix(in oklch, currentColor 66%, transparent); font-size: 0.9375rem; line-height: 1.5; }
.vp-price__amount { display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.15rem 0.5rem; margin: 1rem 0 0.75rem; }
.vp-price__number { font-family: var(--vp-font-heading, inherit); font-size: clamp(2.5rem, 5vw, 3.25rem); font-weight: 700; font-variant-numeric: tabular-nums; line-height: 1; letter-spacing: -0.035em; }
.vp-price__period { color: color-mix(in oklch, currentColor 62%, transparent); font-size: 0.9375rem; line-height: 1.4; }
.vp-price__button {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 2.875rem;
  box-sizing: border-box;
  padding: 0.7em 1.25em;
  border: 1px solid color-mix(in oklch, var(--_color) 38%, var(--_hair));
  border-radius: var(--vp-radius, 8px);
  background: var(--vp-background, transparent);
  color: color-mix(in srgb, var(--_color) 72%, var(--vp-text, #111827));
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.2;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: filter 140ms ease, background-color 140ms ease, border-color 140ms ease, box-shadow 140ms ease, transform 140ms ease;
}
.vp-price__button:hover { border-color: var(--_color); background: color-mix(in oklch, var(--_color) 8%, var(--vp-background, transparent)); }
.vp-price__button:focus-visible { outline: 2px solid var(--_color); outline-offset: 2px; }
.vp-price--featured .vp-price__button { border-color: var(--_color); background: var(--_color); color: var(--vp-primary-contrast, #fff); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 2px 6px color-mix(in oklch, var(--_color) 36%, transparent); }
.vp-price--featured .vp-price__button:hover { background: var(--_color); filter: brightness(1.08); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 6px 16px color-mix(in oklch, var(--_color) 38%, transparent); transform: translateY(-1px); }
/* (what is in it: under a hairline, each line with a small round tick in the colour; what is not in it is
   pale with a plain cross) */
.vp-price__list { display: flex; flex-direction: column; gap: 0.7rem; margin: 1.25rem 0 0; padding: 1.25rem 0 0; border-top: 1px solid var(--_hair); list-style: none; font-size: 0.9375rem; }
.vp-price__item { display: flex; align-items: flex-start; gap: 0.7rem; line-height: 1.45; }
.vp-price__item svg { box-sizing: border-box; flex: none; width: 1.25rem; height: 1.25rem; margin-top: 0.06em; padding: 0.2rem; border-radius: 999px; background: color-mix(in oklch, var(--_color) 13%, transparent); fill: none; stroke: color-mix(in oklch, var(--_color) 82%, var(--vp-text, currentColor)); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
.vp-price__item--without { color: color-mix(in oklch, currentColor 46%, transparent); }
.vp-price__hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.vp-price__item--without svg { background: color-mix(in oklch, currentColor 9%, transparent); stroke: currentColor; stroke-width: 2.5; }
@media (prefers-reduced-motion: reduce) {
  .vp-price__button { transition: none; }
  .vp-price--featured .vp-price__button:hover { transform: none; }
}
</style>
`;export{e as default};