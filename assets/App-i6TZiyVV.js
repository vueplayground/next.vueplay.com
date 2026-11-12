var e=`<template>
  <div class="vp-price" :class="{ 'vp-price--featured': featured }" :style="style">
    <span v-if="badge" class="vp-price__badge">{{ badge }}</span>
    <component :is="level" class="vp-price__name">{{ name }}</component>
    <p v-if="text" class="vp-price__text">{{ text }}</p>
    <p class="vp-price__amount">
      <span class="vp-price__number">{{ price }}</span>
      <span v-if="period" class="vp-price__period">{{ period }}</span>
    </p>
    <a v-if="button" class="vp-price__button" :href="href || undefined" @click="go">{{ button }}</a>
    <ul v-if="features.length" class="vp-price__list">
      <li v-for="(feature, index) in features" :key="index" class="vp-price__item" :class="{ 'vp-price__item--without': feature.without }">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path :d="feature.without ? 'M7 7l10 10M17 7L7 17' : 'M5 12.5l4.5 4.5L19 7.5'" /></svg>
        <span>{{ feature.text }}</span>
      </li>
    </ul>
    <slot />
  </div>
</template>
<script>
// One plan with its price: what it is called, what it costs, what is in it, and a button to pick it.
// Two or three of them in Columns is a price table; mark the one most people should take as featured.
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
    href: { type: String, default: '', label: 'Button link', placeholder: '/page, #anchor or https://…' },
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
    style() {
      return { '--vp-price-color': this.color || undefined }
    }
  },
  methods: {
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
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 0;
  padding: clamp(1.25rem, 3vw, 2rem);
  border: 1px solid var(--vp-border, rgba(127, 127, 127, 0.28));
  border-radius: var(--vp-radius, 12px);
  text-align: left;
}
.vp-price--featured { border-color: var(--_color); box-shadow: 0 0 0 1px var(--_color), 0 12px 32px color-mix(in srgb, var(--_color) 18%, transparent); }
.vp-price__badge {
  position: absolute;
  top: 0;
  right: 1.25rem;
  transform: translateY(-50%);
  padding: 0.25em 0.75em;
  border-radius: 999px;
  background: var(--_color);
  color: var(--vp-primary-contrast, #fff);
  font-size: 0.75rem;
  font-weight: 650;
  line-height: 1.4;
}
.vp-price__name { margin: 0; font-family: var(--vp-font-heading, inherit); font-size: 1.125rem; font-weight: 650; line-height: 1.3; }
.vp-price__text { margin: 0; opacity: 0.7; line-height: 1.5; }
.vp-price__amount { display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.4rem; margin: 0.25rem 0; }
.vp-price__number { font-family: var(--vp-font-heading, inherit); font-size: clamp(2rem, 5vw, 2.75rem); font-weight: 700; line-height: 1.1; letter-spacing: -0.02em; }
.vp-price__period { opacity: 0.65; }
.vp-price__button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.7em 1.25em;
  border: 1.5px solid var(--_color);
  border-radius: var(--vp-radius, 8px);
  color: var(--_color);
  font-weight: 600;
  line-height: 1.2;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: filter 120ms ease, background-color 120ms ease;
}
.vp-price__button:hover { background: color-mix(in srgb, var(--_color) 10%, transparent); }
.vp-price--featured .vp-price__button { background: var(--_color); color: var(--vp-primary-contrast, #fff); }
.vp-price--featured .vp-price__button:hover { background: var(--_color); filter: brightness(1.08); }
.vp-price__list { display: flex; flex-direction: column; gap: 0.6rem; margin: 0.5rem 0 0; padding: 0; list-style: none; }
.vp-price__item { display: flex; align-items: flex-start; gap: 0.6rem; line-height: 1.45; }
.vp-price__item svg { flex: none; width: 1.15rem; height: 1.15rem; margin-top: 0.15em; fill: none; stroke: var(--_color); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.vp-price__item--without { opacity: 0.5; }
.vp-price__item--without svg { stroke: currentColor; }
</style>
`;export{e as default};