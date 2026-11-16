var e=`<template>
  <header class="vp-site-header" :class="['vp-site-header--' + place, { 'vp-site-header--sticky': sticky, 'vp-site-header--line': line, 'vp-site-header--open': open, 'vp-site-header--narrow': narrow === true, 'vp-site-header--wide': narrow === false }]" :style="style" @keydown.esc="shut">
    <div class="vp-site-header__inner">
      <a class="vp-site-header__brand" :href="home" @click="go($event, home)">
        <img v-if="logo" class="vp-site-header__logo" :src="picture || undefined" :style="held" :alt="brand && !onlyLogo ? '' : brand" decoding="async">
        <span v-if="brand && !(logo && onlyLogo)" class="vp-site-header__name">{{ brand }}</span>
      </a>
      <button ref="toggle" type="button" class="vp-site-header__toggle" :aria-label="say('menu')" :aria-expanded="open ? 'true' : 'false'" @click="open = !open">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path :d="open ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'" /></svg>
      </button>
      <nav class="vp-site-header__menu" :aria-label="say('nav')">
        <ul v-if="links && links.length" class="vp-site-header__list">
          <li v-for="(link, index) in links" :key="index">
            <a
              class="vp-site-header__link"
              :class="{ 'vp-site-header__link--here': here(link.href) }"
              :href="link.href || undefined"
              :aria-current="here(link.href) ? 'page' : undefined"
              @click="go($event, link.href)"
            >{{ link.text }}</a>
          </li>
        </ul>
        <slot />
        <a v-if="button" class="vp-site-header__button" :href="buttonLink || undefined" @click="go($event, buttonLink)">{{ button }}</a>
      </nav>
    </div>
  </header>
</template>
<script>
// The words it says itself, in the site's language (App.vue's head says it: \`htmlAttrs: { lang }\`). A text
// that is filled in in the Props tab is said as it is written.
const WORDS = {
  en: { menu: 'Menu', nav: 'Main menu' },
  nb: { menu: 'Meny', nav: 'Hovedmeny' },
  sv: { menu: 'Meny', nav: 'Huvudmeny' },
  da: { menu: 'Menu', nav: 'Hovedmenu' },
  fi: { menu: 'Valikko', nav: 'Päävalikko' },
  de: { menu: 'Menü', nav: 'Hauptmenü' },
  fr: { menu: 'Menu', nav: 'Menu principal' },
  es: { menu: 'Menú', nav: 'Menú principal' },
  it: { menu: 'Menu', nav: 'Menu principale' },
  nl: { menu: 'Menu', nav: 'Hoofdmenu' },
  pt: { menu: 'Menu', nav: 'Menu principal' },
  pl: { menu: 'Menu', nav: 'Menu główne' },
  zh: { menu: '菜单', nav: '主菜单' },
  ja: { menu: 'メニュー', nav: 'メインメニュー' }
}

// The top of a site: its name or logo, the links to its pages and one button. On a narrow screen the links
// fold into a menu behind a button. The page that is open is marked.
// (A picture picked in the Studio is the name of a variable that holds it, like --image-boat: it is shown
// through that variable at once, and its address is read from it when the page is alive. An address is used as it is.)
export default {
  props: {
    brand: { type: String, default: 'Your name', label: 'Name' },
    logo: { type: String, default: '', label: 'Logo', control: 'media' },
    onlyLogo: { type: Boolean, default: false, label: 'Only the logo, no name' },
    home: { type: String, default: '/', label: 'Name links to' },
    links: {
      type: Array,
      default: () => [{ text: 'Home', href: '/' }, { text: 'About', href: '/about' }, { text: 'Contact', href: '/contact' }],
      label: 'Links',
      control: 'list',
      fields: [{ key: 'text', label: 'Text' }, { key: 'href', label: 'Link', placeholder: '/page, #anchor or https://…' }]
    },
    button: { type: String, default: '', label: 'Button text', placeholder: 'Get started' },
    buttonLink: { type: String, default: '', label: 'Button link', placeholder: '/page, #anchor or https://…' },
    place: {
      type: String,
      default: 'right',
      label: 'Links placed',
      options: [{ key: 'To the right', value: 'right' }, { key: 'In the middle', value: 'center' }, { key: 'After the name', value: 'left' }]
    },
    phoneWidth: { type: Number, default: 760, label: 'A phone is narrower than (px)', control: 'number', min: 0, max: 1600 },
    sticky: { type: Boolean, default: false, label: 'Stays at the top when scrolling' },
    line: { type: Boolean, default: true, label: 'Line under it' },
    background: { type: String, default: '', label: 'Background', control: 'color' },
    color: { type: String, default: '', label: 'Text color', control: 'color' },
    accent: { type: String, default: '', label: 'Button color', control: 'color' }
  },
  data() {
    // (narrow: null until the page is alive; until then the screen's width decides, at 760px)
    return { open: false, found: '', narrow: null }
  },
  watch: {
    logo() {
      this.find()
    },
    // (a page shown by the router, also by the back button, closes the phone menu)
    '$route.path'() {
      this.open = false
    },
    phoneWidth() {
      this.listen()
    },
    // (a screen grown past a phone closes the phone menu)
    narrow(value, before) {
      if (before && !value) this.open = false
    }
  },
  mounted() {
    this.find()
    this.listen()
    if (typeof document !== 'undefined') document.addEventListener('click', this.outside)
  },
  beforeUnmount() {
    if (typeof document !== 'undefined') document.removeEventListener('click', this.outside)
    this.media?.removeEventListener?.('change', this.measure)
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
    named() {
      return /^--/.test(this.logo)
    },
    picture() {
      return this.named ? this.found : this.logo
    },
    held() {
      return this.named && !this.found ? { content: 'var(' + this.logo + ')' } : undefined
    },
    style() {
      return {
        '--vp-site-header-background': this.background || undefined,
        '--vp-site-header-color': this.color || undefined,
        '--vp-site-header-accent': this.accent || undefined
      }
    }
  },
  methods: {
    say(key, own, n) {
      if (own) return own
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return String(words[key] ?? WORDS.en[key]).replace('{n}', n ?? '')
    },
    find() {
      const value = this.named && this.$el && this.$el.nodeType === 1 ? getComputedStyle(this.$el).getPropertyValue(this.logo) : ''
      const address = /^\\s*url\\(\\s*(['"]?)(.*?)\\1\\s*\\)\\s*$/.exec(value)
      this.found = address ? address[2] : ''
    },
    // (the links fold behind the button where the screen is narrower than phoneWidth)
    listen() {
      if (typeof matchMedia !== 'function') return
      this.media?.removeEventListener?.('change', this.measure)
      this.media = matchMedia('(max-width: ' + Math.max(0, Number(this.phoneWidth) || 0) + 'px)')
      this.media.addEventListener?.('change', this.measure)
      this.measure()
    },
    measure() {
      this.narrow = !!this.media?.matches && Number(this.phoneWidth) > 0
    },
    // the page that is open, where the site has a router to ask
    here(href) {
      const route = this.$route
      return !!(route && href && route.path === href)
    },
    // Esc closes the phone menu and gives the keys back to its button
    shut() {
      if (!this.open) return
      this.open = false
      this.$refs.toggle?.focus()
    },
    // (a tap outside the header closes the phone menu)
    outside(event) {
      if (this.open && this.$el?.contains && !this.$el.contains(event.target)) this.open = false
    },
    // A page of the site is shown by the site's router where there is one, without loading the site again
    go(event, href) {
      this.open = false
      const router = this.$router
      if (!router || !href || !/^\\/(?!\\/)/.test(href)) return
      if (event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      event.preventDefault()
      router.push(href)
    }
  }
}
<\/script>
<style>
.vp-site-header {
  --_accent: var(--vp-site-header-accent, var(--vp-primary, #2563eb));
  box-sizing: border-box;
  position: relative;
  z-index: 20;
  width: 100%;
  background: var(--vp-site-header-background, var(--vp-background, transparent));
  color: var(--vp-site-header-color, inherit);
}
.vp-site-header--sticky { position: sticky; top: 0; background: var(--vp-site-header-background, var(--vp-background, #fff)); }
.vp-site-header--line { border-bottom: 1px solid var(--vp-border, rgba(127, 127, 127, 0.22)); }
.vp-site-header__inner {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1.5rem;
  width: 100%;
  max-width: var(--vp-width, 1120px);
  min-height: 4rem;
  margin: 0 auto;
  padding: 0.5rem clamp(1rem, 4vw, 2rem);
}
.vp-site-header__brand { display: inline-flex; align-items: center; gap: 0.6rem; color: inherit; font-family: var(--vp-font-heading, inherit); font-size: 1.125rem; font-weight: 700; text-decoration: none; }
.vp-site-header__logo { display: block; width: auto; height: 2rem; max-width: 10rem; object-fit: contain; }
.vp-site-header__menu { display: flex; flex: 1; flex-wrap: wrap; align-items: center; justify-content: flex-end; gap: 0.25rem 1.5rem; }
.vp-site-header--center .vp-site-header__menu { justify-content: center; }
.vp-site-header--left .vp-site-header__menu { justify-content: flex-start; }
.vp-site-header__list, .vp-site-header__list > li { display: contents; }
.vp-site-header__link { padding: 0.4rem 0; color: inherit; font-weight: 500; text-decoration: none; transition: box-shadow 120ms ease; }
/* (links keep the full text colour, so they stay readable on any background; pointed at they get a thin line,
   the open page a line in the accent colour) */
.vp-site-header__link:hover { box-shadow: inset 0 -1px 0 currentColor; }
.vp-site-header__link--here { font-weight: 600; box-shadow: inset 0 -2px 0 var(--_accent); }
.vp-site-header__button {
  display: inline-flex;
  align-items: center;
  padding: 0.55em 1.1em;
  border-radius: var(--vp-radius, 8px);
  background: var(--_accent);
  color: var(--vp-primary-contrast, #fff);
  font-weight: 600;
  line-height: 1.2;
  text-decoration: none;
  transition: filter 120ms ease;
}
.vp-site-header__button:hover { filter: brightness(1.08); }
.vp-site-header--center .vp-site-header__button,
.vp-site-header--left .vp-site-header__button { margin-left: auto; }
.vp-site-header__toggle { display: none; margin: 0 0 0 auto; padding: 0.4rem; border: 0; border-radius: 6px; background: none; color: inherit; cursor: pointer; }
.vp-site-header__toggle svg { display: block; width: 1.5rem; height: 1.5rem; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }
/* On a phone (narrower than phoneWidth, measured once the page is alive; 760px before that) the links fold
   behind the button. :where() keeps these rules as strong as they were. */
@media (max-width: 760px) {
  .vp-site-header__toggle:where(.vp-site-header:not(.vp-site-header--wide) *) { display: block; }
  .vp-site-header__menu:where(.vp-site-header:not(.vp-site-header--wide) *) { display: none; flex: 1 0 100%; flex-direction: column; align-items: stretch; gap: 0; padding: 0.25rem 0 0.75rem; }
  .vp-site-header--open:where(:not(.vp-site-header--wide)) .vp-site-header__menu { display: flex; }
  .vp-site-header__link:where(.vp-site-header:not(.vp-site-header--wide) *) { padding: 0.7rem 0; }
  .vp-site-header__link--here:where(.vp-site-header:not(.vp-site-header--wide) *) { box-shadow: none; color: var(--_accent); }
  .vp-site-header__button:where(.vp-site-header:not(.vp-site-header--wide) *) { justify-content: center; margin: 0.5rem 0 0; }
}
.vp-site-header__toggle:where(.vp-site-header--narrow *) { display: block; }
.vp-site-header__menu:where(.vp-site-header--narrow *) { display: none; flex: 1 0 100%; flex-direction: column; align-items: stretch; gap: 0; padding: 0.25rem 0 0.75rem; }
.vp-site-header--open:where(.vp-site-header--narrow) .vp-site-header__menu { display: flex; }
.vp-site-header__link:where(.vp-site-header--narrow *) { padding: 0.7rem 0; }
.vp-site-header__link--here:where(.vp-site-header--narrow *) { box-shadow: none; color: var(--_accent); }
.vp-site-header__button:where(.vp-site-header--narrow *) { justify-content: center; margin: 0.5rem 0 0; }
</style>
`;export{e as default};