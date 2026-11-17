var e=`<template>
  <nav class="vp-breadcrumbs" :class="['vp-breadcrumbs--' + sizeName]" :aria-label="say('label')" :hidden="trail.length ? undefined : true">
    <ol class="vp-breadcrumbs__list">
      <li v-for="(crumb, i) in trail" :key="i + crumb.href" class="vp-breadcrumbs__item">
        <a v-if="i !== trail.length - 1 && crumb.href" class="vp-breadcrumbs__link" :href="crumb.href" @click="go($event, crumb.href)">{{ crumb.label }}</a>
        <span v-else-if="i !== trail.length - 1" class="vp-breadcrumbs__plain">{{ crumb.label }}</span>
        <span v-else class="vp-breadcrumbs__current" aria-current="page">{{ crumb.label }}</span>
        <span v-if="i !== trail.length - 1" class="vp-breadcrumbs__sep" aria-hidden="true">{{ mark }}</span>
      </li>
    </ol>
  </nav>
</template>
<script>
// Breadcrumbs: where the page is in the site (Home › Guides › Charts). Made from the address of the page that is
// open, each part named by its route (its meta title, or its name), by \`labels\`, or by the part itself made
// readable ("sending-data": Sending data); or written by hand in \`items\`. The last one is the page itself,
// not a link. Search engines are told the same as BreadcrumbList structured data (in head()).
// On the front page there is nothing to show, and it shows nothing; in the editor it shows a sample.
const SAMPLE = [{ label: 'Home', href: '/' }, { label: 'Guides', href: '/guides' }, { label: 'Charts', href: '/guides/charts' }]
const MARKS = { chevron: '›', slash: '/', arrow: '→', dot: '·' }

// The words it says itself, in the site's language
const WORDS = {
  en: { label: 'Breadcrumb', home: 'Home' },
  nb: { label: 'Brødsmulesti', home: 'Hjem' },
  sv: { label: 'Brödsmulor', home: 'Hem' },
  da: { label: 'Brødkrummesti', home: 'Forside' },
  fi: { label: 'Murupolku', home: 'Etusivu' },
  de: { label: 'Brotkrümelnavigation', home: 'Startseite' },
  fr: { label: 'Fil d’Ariane', home: 'Accueil' },
  es: { label: 'Ruta de navegación', home: 'Inicio' },
  it: { label: 'Percorso di navigazione', home: 'Home' },
  nl: { label: 'Kruimelpad', home: 'Home' },
  pt: { label: 'Trilha de navegação', home: 'Início' },
  pl: { label: 'Ścieżka nawigacji', home: 'Strona główna' },
  zh: { label: '面包屑导航', home: '首页' },
  ja: { label: 'パンくずリスト', home: 'ホーム' }
}

export default {
  props: {
    items: {
      type: Array,
      default: () => [],
      label: 'Written by hand (else from the address)',
      control: 'list',
      fields: [
        { key: 'label', label: 'Name' },
        { key: 'href', label: 'Its address', placeholder: '/guides' }
      ]
    },
    labels: {
      type: Array,
      default: () => [],
      label: 'Names for parts of the address',
      control: 'list',
      fields: [
        { key: 'part', label: 'Part of the address', placeholder: 'guides or /guides' },
        { key: 'label', label: 'Name', placeholder: 'All guides' }
      ]
    },
    separator: { type: String, default: 'chevron', label: 'Between them', control: 'select', options: [{ key: '›', value: 'chevron' }, { key: '/', value: 'slash' }, { key: '→', value: 'arrow' }, { key: '·', value: 'dot' }] },
    showHome: { type: Boolean, default: true, label: 'Start at the front page' },
    homeText: { type: String, default: '', label: 'The front page is called', placeholder: 'Home' },
    size: { type: String, default: 'medium', label: 'Size', control: 'select', options: [{ key: 'Small', value: 'small' }, { key: 'Medium', value: 'medium' }] },
    structuredData: { type: Boolean, default: true, label: 'Tell search engines the trail' }
  },
  computed: {
    lang() {
      // (a page in a language of a site in several: its route says which, see pageLang)
      let lang = this.pageLang
      if (lang) return lang
      try {
        const head = this.$root?.$options?.head
        lang = (typeof head === 'function' ? head.call(this.$root) : head)?.htmlAttrs?.lang || ''
      } catch (e) {}
      if (!lang && typeof document !== 'undefined') lang = document.documentElement.lang || ''
      return String(lang || 'en').toLowerCase()
    },
    // A site in several languages gives each page in a language a route with \`meta.lang\` under /<lang>: its
    // trail starts at that language's front page, and the language is not a part of its own
    pageLang() {
      const lang = this.$route?.meta?.lang
      return typeof lang === 'string' && /^[a-z]{2,3}(-[a-z0-9]{2,8})*$/i.test(lang) ? lang.toLowerCase() : ''
    },
    inStudio() {
      return typeof document !== 'undefined' && (document.getElementById('receiver') ? document.getElementById('receiver').getAttribute('live') !== 'yes' : !!window.studio)
    },
    mark() {
      return MARKS[this.separator] || MARKS.chevron
    },
    sizeName() {
      return this.size === 'small' ? 'small' : 'medium'
    },
    // Written by hand, or from the address of the page that is open
    trail() {
      const own = (Array.isArray(this.items) ? this.items : []).filter(item => item && (item.label || item.href))
      let trail = own.length
        ? own.map(item => ({ label: String(item.label || this.readable(item.href)), href: this.safe(item.href) ? String(item.href || '') : '' }))
        : this.fromAddress()
      if (trail.length < 2) trail = this.inStudio ? SAMPLE.map((one, i) => i ? one : { ...one, label: this.homeText || this.say('home') }) : []
      return trail
    }
  },
  methods: {
    say(key) {
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return words[key] ?? WORDS.en[key]
    },
    safe(href) {
      const text = String(href || '').trim()
      return !/^[a-z][a-z\\d+.-]*:/i.test(text.replace(/[\\u0000- ]/g, '')) || /^(https?|mailto|tel):/i.test(text)
    },
    readable(href) {
      const part = String(href || '').split(/[?#]/)[0].split('/').filter(Boolean).pop()
      if (!part) return this.homeText || this.say('home')
      let text = part
      try { text = decodeURIComponent(part) } catch (e) {}
      text = text.replace(/[-_]+/g, ' ').trim()
      return text.charAt(0).toUpperCase() + text.slice(1)
    },
    // What a part of the address is called: by \`labels\`, by its own route (not one that stands for many, nor the
    // one that catches every address), or by itself
    nameOf(path, part) {
      const named = (Array.isArray(this.labels) ? this.labels : []).find(one => one && one.label && (one.part === path || one.part === part || String(one.part || '').replace(/^\\/|\\/$/g, '') === path.replace(/^\\//, '')))
      if (named) return String(named.label)
      const router = this.$router
      if (router && typeof router.resolve === 'function') {
        try {
          const found = router.resolve(path)
          const route = found?.matched?.[found.matched.length - 1]
          if (route && !/[:*(]/.test(String(route.path || '')) && route.name !== 'NotFound') {
            const meta = found.meta || route.meta || {}
            if (meta.breadcrumb) return String(meta.breadcrumb)
            if (meta.title) return String(meta.title)
            // (a page in a language is named after the main one, with the language after it)
            if (typeof route.name === 'string' && route.name) {
              const after = meta.lang ? ' (' + meta.lang + ')' : ''
              return after && route.name.endsWith(after) && route.name.length > after.length ? route.name.slice(0, -after.length) : route.name
            }
          }
        } catch (e) {}
      }
      return this.readable(path)
    },
    fromAddress() {
      const path = String(this.$route?.path || '')
      if (!path.startsWith('/')) return []
      const parts = path.split('/').filter(Boolean)
      // (a page in a language: /nb/guides is Hjem › Guides, Hjem being /nb)
      const lang = this.pageLang
      let at = ''
      if (lang && parts[0] && parts[0].toLowerCase() === lang) at = '/' + parts.shift()
      const trail = this.showHome ? [{ label: this.homeText || this.say('home'), href: at || '/' }] : []
      for (const part of parts) {
        at += '/' + part
        trail.push({ label: this.nameOf(at, part), href: at })
      }
      // (without the front page, one part is still a trail of one: there is nothing to say then)
      return trail
    },
    // A page of the site is shown by the site's router where there is one, without loading the site again
    go(event, href) {
      if (this.inStudio) { event.preventDefault(); return }
      if (event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      if (this.$router && /^\\/(?!\\/)/.test(String(href || ''))) { event.preventDefault(); this.$router.push(href) }
    }
  },
  head() {
    if (!this.structuredData || this.inStudio || this.trail.length < 2) return {}
    const origin = typeof window !== 'undefined' && window.location && /^https?:/.test(window.location.origin || '') ? window.location.origin : ''
    const whole = href => /^\\/(?!\\/)/.test(href) ? origin + href : href
    return {
      script: [{
        type: 'application/ld+json',
        textContent: {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: this.trail.map((crumb, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: crumb.label,
            ...(crumb.href ? { item: whole(crumb.href) } : {})
          }))
        }
      }]
    }
  }
}
<\/script>
<style>
.vp-breadcrumbs {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  color: var(--vp-muted, inherit);
  font-size: 0.875rem;
  line-height: 1.5;
}
.vp-breadcrumbs[hidden] { display: none; }
.vp-breadcrumbs--small { font-size: 0.8125rem; }
.vp-breadcrumbs__list { display: flex; flex-wrap: wrap; align-items: center; gap: 0.25rem 0; margin: 0; padding: 0; list-style: none; }
.vp-breadcrumbs__item { display: inline-flex; align-items: center; min-width: 0; max-width: 100%; }
.vp-breadcrumbs__link, .vp-breadcrumbs__plain, .vp-breadcrumbs__current { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
/* (links lean to the text's colour, so they read on a light page and a dark one alike) */
.vp-breadcrumbs__link {
  border-radius: 3px;
  color: inherit;
  text-decoration: underline;
  text-decoration-color: transparent;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.25em;
  transition: color 140ms ease, text-decoration-color 140ms ease;
}
.vp-breadcrumbs__link:hover { color: color-mix(in srgb, var(--vp-primary, #2563eb) 72%, var(--vp-text, currentColor)); text-decoration-color: color-mix(in srgb, currentColor 45%, transparent); }
.vp-breadcrumbs__link:focus-visible { outline: 2px solid var(--vp-primary, #2563eb); outline-offset: 2px; }
.vp-breadcrumbs__current { color: var(--vp-text, inherit); font-weight: 550; }
.vp-breadcrumbs__sep { flex: none; padding-inline: 0.6em; opacity: 0.5; }
@media (prefers-reduced-motion: reduce) {
  .vp-breadcrumbs__link { transition: none; }
}
@media (max-width: 480px) {
  .vp-breadcrumbs__link, .vp-breadcrumbs__plain { max-width: 12ch; }
}
</style>
`;export{e as default};