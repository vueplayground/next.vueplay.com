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
  --_ground: var(--vp-site-header-background, var(--vp-background, transparent));
  --_hair: var(--vp-border, rgba(127, 127, 127, 0.22));
  box-sizing: border-box;
  position: relative;
  z-index: 20;
  width: 100%;
  background: var(--_ground);
  color: var(--vp-site-header-color, inherit);
}
/* Staying at the top it lets a little of the page through, softened. The blur sits on a layer of its own
   behind the content, so a cart or a menu put in the header still opens over the whole screen. */
.vp-site-header--sticky { --_ground: var(--vp-site-header-background, var(--vp-background, #fff)); position: sticky; top: 0; }
@supports ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .vp-site-header--sticky { background: none; }
  .vp-site-header--sticky::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background: color-mix(in oklch, var(--_ground) 82%, transparent);
    -webkit-backdrop-filter: saturate(1.6) blur(14px);
    backdrop-filter: saturate(1.6) blur(14px);
    pointer-events: none;
  }
}
.vp-site-header--line { border-bottom: 1px solid var(--_hair); }
.vp-site-header--sticky.vp-site-header--line { border-bottom-color: color-mix(in oklch, var(--_hair) 70%, transparent); }
.vp-site-header__inner {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem clamp(1rem, 3vw, 2rem);
  width: 100%;
  max-width: var(--vp-width, 1120px);
  min-height: 4rem;
  margin: 0 auto;
  padding: 0.5rem clamp(1rem, 4vw, 2rem);
}
.vp-site-header__brand { display: inline-flex; align-items: center; gap: 0.6rem; border-radius: 6px; color: inherit; font-family: var(--vp-font-heading, inherit); font-size: 1.125rem; font-weight: 700; line-height: 1.2; letter-spacing: -0.015em; text-decoration: none; }
.vp-site-header__logo { display: block; width: auto; height: 2rem; max-width: 10rem; object-fit: contain; }
.vp-site-header__menu { display: flex; flex: 1; flex-wrap: wrap; align-items: center; justify-content: flex-end; gap: 0.25rem 0.25rem; }
.vp-site-header--center .vp-site-header__menu { justify-content: center; }
.vp-site-header--left .vp-site-header__menu { justify-content: flex-start; }
.vp-site-header__list, .vp-site-header__list > li { display: contents; }
/* (links are the text colour a little held back, so the name and the button lead; pointed at, and on the open
   page, they come forward on a soft ground. Held back by mixing with nothing, so it reads on any background) */
.vp-site-header__link {
  padding: 0.45rem 0.75rem;
  border-radius: min(var(--vp-radius, 8px), 999px);
  color: color-mix(in oklch, currentColor 74%, transparent);
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.3;
  text-decoration: none;
  transition: color 140ms ease, background-color 140ms ease;
}
.vp-site-header__link:hover { background: color-mix(in oklch, currentColor 7%, transparent); color: inherit; }
.vp-site-header__link--here { background: color-mix(in oklch, var(--_accent) 10%, transparent); color: inherit; font-weight: 600; }
.vp-site-header__link--here:hover { background: color-mix(in oklch, var(--_accent) 14%, transparent); }
.vp-site-header__button {
  display: inline-flex;
  align-items: center;
  margin-left: 0.75rem;
  padding: 0.6em 1.15em;
  border-radius: var(--vp-radius, 8px);
  background: var(--_accent);
  color: var(--vp-primary-contrast, #fff);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 1px 2px color-mix(in oklch, var(--_accent) 40%, transparent);
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.2;
  text-decoration: none;
  white-space: nowrap;
  transition: filter 140ms ease, box-shadow 140ms ease, transform 140ms ease;
}
.vp-site-header__button:hover { filter: brightness(1.08); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 4px 12px color-mix(in oklch, var(--_accent) 34%, transparent); transform: translateY(-1px); }
.vp-site-header__button:active { filter: brightness(0.97); transform: none; }
.vp-site-header__button:where(.vp-site-header--center *, .vp-site-header--left *) { margin-left: auto; }
.vp-site-header__brand:focus-visible,
.vp-site-header__link:focus-visible,
.vp-site-header__button:focus-visible,
.vp-site-header__toggle:focus-visible { outline: 2px solid var(--_accent); outline-offset: 2px; }
.vp-site-header__toggle { display: none; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; margin: 0 -0.5rem 0 auto; padding: 0; border: 0; border-radius: min(var(--vp-radius, 8px), 999px); background: none; color: inherit; cursor: pointer; transition: background-color 140ms ease; }
.vp-site-header__toggle:hover, .vp-site-header--open .vp-site-header__toggle { background: color-mix(in oklch, currentColor 8%, transparent); }
.vp-site-header__toggle svg { display: block; width: 1.375rem; height: 1.375rem; fill: none; stroke: currentColor; stroke-width: 1.75; stroke-linecap: round; }
@keyframes vp-site-header-in {
  from { opacity: 0; transform: translateY(-6px); }
}
/* On a phone (narrower than phoneWidth, measured once the page is alive; 760px before that) the links fold
   behind the button: a sheet that opens under the header, over the page, each link a row to tap.
   :where() keeps these rules as strong as they were. */
@media (max-width: 760px) {
  .vp-site-header__toggle:where(.vp-site-header:not(.vp-site-header--wide) *) { display: inline-flex; }
  .vp-site-header__menu:where(.vp-site-header:not(.vp-site-header--wide) *) {
    display: none;
    box-sizing: border-box;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: stretch;
    justify-content: flex-start;
    gap: 0;
    max-height: calc(100vh - 4rem);
    max-height: calc(100dvh - 4rem);
    overflow-y: auto;
    padding: 0.25rem clamp(1rem, 4vw, 2rem) 1.25rem;
    border-bottom: 1px solid var(--_hair);
    background: var(--vp-site-header-background, var(--vp-background, Canvas));
    box-shadow: 0 24px 40px -24px rgba(0, 0, 0, 0.28);
  }
  .vp-site-header--open:where(:not(.vp-site-header--wide)) .vp-site-header__menu { display: flex; animation: vp-site-header-in 180ms ease; }
  .vp-site-header__link:where(.vp-site-header:not(.vp-site-header--wide) *) { padding: 0.9rem 0; border-bottom: 1px solid color-mix(in oklch, var(--_hair) 70%, transparent); border-radius: 0; color: inherit; font-size: 1.0625rem; }
  .vp-site-header__link:where(.vp-site-header:not(.vp-site-header--wide) *):hover { background: none; }
  .vp-site-header__link--here:where(.vp-site-header:not(.vp-site-header--wide) *) { background: none; color: var(--_accent); }
  .vp-site-header__button:where(.vp-site-header:not(.vp-site-header--wide) *) { justify-content: center; margin: 1rem 0 0; padding: 0.85em 1.15em; font-size: 1rem; }
}
.vp-site-header__toggle:where(.vp-site-header--narrow *) { display: inline-flex; }
.vp-site-header__menu:where(.vp-site-header--narrow *) {
  display: none;
  box-sizing: border-box;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: stretch;
  justify-content: flex-start;
  gap: 0;
  max-height: calc(100vh - 4rem);
  max-height: calc(100dvh - 4rem);
  overflow-y: auto;
  padding: 0.25rem clamp(1rem, 4vw, 2rem) 1.25rem;
  border-bottom: 1px solid var(--_hair);
  background: var(--vp-site-header-background, var(--vp-background, Canvas));
  box-shadow: 0 24px 40px -24px rgba(0, 0, 0, 0.28);
}
.vp-site-header--open:where(.vp-site-header--narrow) .vp-site-header__menu { display: flex; animation: vp-site-header-in 180ms ease; }
.vp-site-header__link:where(.vp-site-header--narrow *) { padding: 0.9rem 0; border-bottom: 1px solid color-mix(in oklch, var(--_hair) 70%, transparent); border-radius: 0; color: inherit; font-size: 1.0625rem; }
.vp-site-header__link:where(.vp-site-header--narrow *):hover { background: none; }
.vp-site-header__link--here:where(.vp-site-header--narrow *) { background: none; color: var(--_accent); }
.vp-site-header__button:where(.vp-site-header--narrow *) { justify-content: center; margin: 1rem 0 0; padding: 0.85em 1.15em; font-size: 1rem; }
@media (prefers-reduced-motion: reduce) {
  .vp-site-header__link, .vp-site-header__button, .vp-site-header__toggle { transition: none; }
  .vp-site-header__button:hover { transform: none; }
  .vp-site-header--open .vp-site-header__menu { animation: none; }
}
</style>
`;export{e as default};