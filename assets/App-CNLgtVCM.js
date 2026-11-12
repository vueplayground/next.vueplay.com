var e=`<template>
  <header class="vp-site-header" :class="['vp-site-header--' + place, { 'vp-site-header--sticky': sticky, 'vp-site-header--line': line, 'vp-site-header--open': open }]" :style="style">
    <div class="vp-site-header__inner">
      <a class="vp-site-header__brand" :href="home" @click="go($event, home)">
        <img v-if="logo" class="vp-site-header__logo" :src="picture || undefined" :style="held" :alt="brand">
        <span v-if="brand && !(logo && onlyLogo)" class="vp-site-header__name">{{ brand }}</span>
      </a>
      <button type="button" class="vp-site-header__toggle" aria-label="Menu" :aria-expanded="open ? 'true' : 'false'" @click="open = !open">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path :d="open ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'" /></svg>
      </button>
      <nav class="vp-site-header__menu">
        <a
          v-for="(link, index) in links"
          :key="index"
          class="vp-site-header__link"
          :class="{ 'vp-site-header__link--here': here(link.href) }"
          :href="link.href || undefined"
          :aria-current="here(link.href) ? 'page' : undefined"
          @click="go($event, link.href)"
        >{{ link.text }}</a>
        <slot />
        <a v-if="button" class="vp-site-header__button" :href="buttonLink || undefined" @click="go($event, buttonLink)">{{ button }}</a>
      </nav>
    </div>
  </header>
</template>
<script>
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
    sticky: { type: Boolean, default: false, label: 'Stays at the top when scrolling' },
    line: { type: Boolean, default: true, label: 'Line under it' },
    background: { type: String, default: '', label: 'Background', control: 'color' },
    color: { type: String, default: '', label: 'Text color', control: 'color' },
    accent: { type: String, default: '', label: 'Button color', control: 'color' }
  },
  data() {
    return { open: false, found: '' }
  },
  watch: {
    logo() {
      this.find()
    }
  },
  mounted() {
    this.find()
  },
  computed: {
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
    find() {
      const value = this.named && this.$el && this.$el.nodeType === 1 ? getComputedStyle(this.$el).getPropertyValue(this.logo) : ''
      const address = /^\\s*url\\(\\s*(['"]?)(.*?)\\1\\s*\\)\\s*$/.exec(value)
      this.found = address ? address[2] : ''
    },
    // the page that is open, where the site has a router to ask
    here(href) {
      const route = this.$route
      return !!(route && href && route.path === href)
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
.vp-site-header__link { padding: 0.4rem 0; color: inherit; font-weight: 500; text-decoration: none; opacity: 0.75; transition: opacity 120ms ease; }
.vp-site-header__link:hover,
.vp-site-header__link--here { opacity: 1; }
.vp-site-header__link--here { box-shadow: inset 0 -2px 0 var(--_accent); }
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
@media (max-width: 760px) {
  .vp-site-header__toggle { display: block; }
  .vp-site-header__menu { display: none; flex: 1 0 100%; flex-direction: column; align-items: stretch; gap: 0; padding: 0.25rem 0 0.75rem; }
  .vp-site-header--open .vp-site-header__menu { display: flex; }
  .vp-site-header__link { padding: 0.7rem 0; }
  .vp-site-header__link--here { box-shadow: none; color: var(--_accent); }
  .vp-site-header__button { justify-content: center; margin: 0.5rem 0 0; }
}
</style>
`;export{e as default};