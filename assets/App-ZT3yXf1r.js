var e=`<template>
  <nav
    class="vp-language-switcher"
    :class="['vp-language-switcher--' + lookName, 'vp-language-switcher--' + sizeName, 'vp-language-switcher--' + alignName]"
    :aria-label="label || say('label')"
    :hidden="choices.length > 1 ? undefined : true"
    @keydown.esc="close(true)"
  >
    <template v-if="lookName === 'dropdown'">
      <button
        ref="button"
        type="button"
        class="vp-language-switcher__button"
        :aria-expanded="open ? 'true' : 'false'"
        :aria-label="say('choose') + ': ' + (here ? here.name : '')"
        @click="open = !open"
        @keydown.down.prevent="openAt(0)"
      >
        <span class="vp-language-switcher__short" aria-hidden="true">{{ here ? here.short : '' }}</span>
        <span class="vp-language-switcher__current">{{ here ? here.name : '' }}</span>
        <span class="vp-language-switcher__arrow" aria-hidden="true"></span>
      </button>
      <ul ref="menu" class="vp-language-switcher__menu" :hidden="open ? undefined : true">
        <li v-for="(one, i) in choices" :key="one.lang" class="vp-language-switcher__item">
          <a
            class="vp-language-switcher__link"
            :class="{ 'vp-language-switcher__link--here': one.here }"
            :href="one.href"
            :hreflang="one.lang"
            :lang="one.lang"
            :aria-current="one.here ? 'true' : undefined"
            @click="go($event, one.href)"
            @keydown.down.prevent="move(i + 1)"
            @keydown.up.prevent="move(i - 1)"
          >{{ one.name }}</a>
        </li>
      </ul>
    </template>
    <ul v-else class="vp-language-switcher__list">
      <li v-for="one in choices" :key="one.lang" class="vp-language-switcher__item">
        <a
          class="vp-language-switcher__link"
          :class="{ 'vp-language-switcher__link--here': one.here }"
          :href="one.href"
          :hreflang="one.lang"
          :lang="one.lang"
          :title="lookName === 'codes' ? one.name : undefined"
          :aria-label="lookName === 'codes' ? one.name : undefined"
          :aria-current="one.here ? 'true' : undefined"
          @click="go($event, one.href)"
        >{{ lookName === 'codes' ? one.short : one.name }}</a>
      </li>
    </ul>
  </nav>
</template>
<script>
// Languages: links to the page that is open in each of the site's languages. A site in more languages (made in the
// Studio's Look panel) has a copy of each page per language at /<lang>/…, whose route says \`meta: { lang, main }\`;
// this reads the router for them, so it needs no settings: the same page in another language where there is one,
// else that language's front page. Each language is said in itself (Deutsch, Norsk, 日本語), or as a short code.
// A list, a dropdown (a button that opens the list: arrows, Escape) or the codes alone. In the editor, on a site in
// one language, it shows a sample.
const NAMES = {
  en: 'English', nb: 'Norsk', nn: 'Nynorsk', no: 'Norsk', sv: 'Svenska', da: 'Dansk', fi: 'Suomi', de: 'Deutsch', fr: 'Français',
  es: 'Español', it: 'Italiano', nl: 'Nederlands', pt: 'Português', pl: 'Polski', zh: '中文', ja: '日本語'
}
const SAMPLE = ['en', 'nb', 'de']

// The words it says itself, in the site's language
const WORDS = {
  en: { label: 'Language', choose: 'Choose a language' },
  nb: { label: 'Språk', choose: 'Velg språk' },
  sv: { label: 'Språk', choose: 'Välj språk' },
  da: { label: 'Sprog', choose: 'Vælg sprog' },
  fi: { label: 'Kieli', choose: 'Valitse kieli' },
  de: { label: 'Sprache', choose: 'Sprache wählen' },
  fr: { label: 'Langue', choose: 'Choisir la langue' },
  es: { label: 'Idioma', choose: 'Elegir idioma' },
  it: { label: 'Lingua', choose: 'Scegli la lingua' },
  nl: { label: 'Taal', choose: 'Kies een taal' },
  pt: { label: 'Idioma', choose: 'Escolher idioma' },
  pl: { label: 'Język', choose: 'Wybierz język' },
  zh: { label: '语言', choose: '选择语言' },
  ja: { label: '言語', choose: '言語を選択' }
}

export default {
  props: {
    look: { type: String, default: 'list', label: 'Look', control: 'select', options: [{ key: 'A list', value: 'list' }, { key: 'A dropdown', value: 'dropdown' }, { key: 'Short codes (EN, NB)', value: 'codes' }] },
    align: { type: String, default: 'start', label: 'Placed', control: 'select', options: [{ key: 'At the start', value: 'start' }, { key: 'In the middle', value: 'center' }, { key: 'At the end', value: 'end' }] },
    size: { type: String, default: 'medium', label: 'Size', control: 'select', options: [{ key: 'Small', value: 'small' }, { key: 'Medium', value: 'medium' }] },
    label: { type: String, default: '', label: 'Its name for screen readers', placeholder: 'Language' }
  },
  data() {
    return { open: false }
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
    lookName() {
      return ['dropdown', 'codes'].includes(this.look) ? this.look : 'list'
    },
    sizeName() {
      return this.size === 'small' ? 'small' : 'medium'
    },
    alignName() {
      return ['center', 'end'].includes(this.align) ? this.align : 'start'
    },
    // The site's languages, from its routes: the main one first, then the others in the order of the routes
    languages() {
      let routes = []
      try { routes = (this.$router && typeof this.$router.getRoutes === 'function' ? this.$router.getRoutes() : []) || [] } catch (e) {}
      let main = ''
      const others = []
      for (const route of routes) {
        const meta = route && route.meta ? route.meta : {}
        if (!main && typeof meta.main === 'string' && meta.main) main = meta.main
        if (typeof meta.lang === 'string' && meta.lang && !others.includes(meta.lang)) others.push(meta.lang)
      }
      if (!main || !others.length) return null
      return { main, list: [main, ...others.filter(one => one !== main)] }
    },
    // The language of the page shown
    current() {
      const meta = this.$route && this.$route.meta ? this.$route.meta : {}
      return (typeof meta.lang === 'string' && meta.lang) || (this.languages ? this.languages.main : '')
    },
    // The address of the page shown, in the main language
    mainPath() {
      const path = String((this.$route && this.$route.path) || '/')
      const lang = this.current
      if (!this.languages || lang === this.languages.main) return path
      const prefix = '/' + lang
      return path === prefix ? '/' : path.startsWith(prefix + '/') ? path.slice(prefix.length) : '/'
    },
    choices() {
      if (!this.languages) {
        if (!this.inStudio) return []
        return SAMPLE.map((lang, i) => ({ lang, name: this.nameOf(lang), short: lang.toUpperCase(), href: i ? '/' + lang : '/', here: i === 0 }))
      }
      return this.languages.list.map(lang => ({ lang, name: this.nameOf(lang), short: lang.split('-')[0].toUpperCase(), href: this.addressIn(lang), here: lang === this.current }))
    },
    here() {
      return this.choices.find(one => one.here) || this.choices[0] || null
    }
  },
  watch: {
    // (a page shown by the router closes the list)
    '$route.path'() {
      this.open = false
    }
  },
  mounted() {
    if (typeof document !== 'undefined') document.addEventListener('click', this.outside)
  },
  beforeUnmount() {
    if (typeof document !== 'undefined') document.removeEventListener('click', this.outside)
  },
  methods: {
    say(key) {
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return words[key] || WORDS.en[key]
    },
    nameOf(lang) {
      if (NAMES[lang]) return NAMES[lang]
      try {
        const name = new Intl.DisplayNames([lang], { type: 'language' }).of(lang)
        if (name && name !== lang) return name.charAt(0).toUpperCase() + name.slice(1)
      } catch (e) {}
      return NAMES[lang.split('-')[0]] || lang
    },
    // The page shown in a language: its own copy where the router has one, else that language's front page
    addressIn(lang) {
      const main = this.languages.main
      const home = lang === main ? '/' : '/' + lang
      const path = lang === main ? this.mainPath : this.mainPath === '/' ? home : '/' + lang + this.mainPath
      const router = this.$router
      if (!router || typeof router.resolve !== 'function') return path
      try {
        const found = router.resolve(path)
        const route = found && found.matched ? found.matched[found.matched.length - 1] : null
        const meta = (found && found.meta) || (route && route.meta) || {}
        const said = (typeof meta.lang === 'string' && meta.lang) || main
        if (route && !/[*(]|pathMatch/.test(String(route.path || '')) && route.name !== 'NotFound' && said === lang) return path
      } catch (e) {}
      return home
    },
    openAt(i) {
      this.open = true
      this.$nextTick(() => this.move(i))
    },
    move(i) {
      const links = this.$refs.menu ? Array.from(this.$refs.menu.querySelectorAll('a')) : []
      if (!links.length) return
      const at = (i + links.length) % links.length
      links[at].focus()
    },
    close(focus) {
      if (!this.open) return
      this.open = false
      if (focus && this.$refs.button) this.$refs.button.focus()
    },
    outside(event) {
      if (this.open && this.$el && !this.$el.contains(event.target)) this.open = false
    },
    // A page of the site is shown by the site's router where there is one, without loading the site again
    go(event, href) {
      if (this.inStudio) { event.preventDefault(); return }
      if (event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      this.open = false
      if (this.$router && /^\\/(?!\\/)/.test(String(href || ''))) { event.preventDefault(); this.$router.push(href) }
    }
  }
}
<\/script>
<style>
.vp-language-switcher {
  position: relative;
  box-sizing: border-box;
  display: flex;
  min-width: 0;
  color: var(--vp-text, inherit);
  font-size: 0.9375rem;
  line-height: 1.4;
}
.vp-language-switcher[hidden] { display: none; }
.vp-language-switcher--small { font-size: 0.8125rem; }
.vp-language-switcher--center { justify-content: center; }
.vp-language-switcher--end { justify-content: flex-end; }
.vp-language-switcher__list { display: flex; flex-wrap: wrap; align-items: center; gap: 0.25rem; margin: 0; padding: 0; list-style: none; }
.vp-language-switcher__item { margin: 0; padding: 0; }
.vp-language-switcher__link {
  display: inline-flex;
  align-items: center;
  min-height: 2.25rem;
  padding: 0.25rem 0.6rem;
  border-radius: var(--vp-radius, 6px);
  color: color-mix(in oklch, currentColor 76%, transparent);
  text-decoration: none;
  white-space: nowrap;
  transition: background-color 140ms ease, color 140ms ease;
}
.vp-language-switcher__link:hover { background: color-mix(in srgb, currentColor 8%, transparent); color: inherit; }
.vp-language-switcher__link:focus-visible,
.vp-language-switcher__button:focus-visible { outline: 2px solid var(--vp-primary, #2563eb); outline-offset: 2px; }
/* (the language shown: heavier, in the text's own colour on a tint of the site's, so it reads on a light page and a dark one) */
.vp-language-switcher__link--here, .vp-language-switcher__link--here:hover { background: color-mix(in oklch, var(--vp-primary, currentColor) 11%, transparent); color: inherit; font-weight: 650; }
.vp-language-switcher--codes .vp-language-switcher__link { min-width: 2.25rem; justify-content: center; font-size: 0.85em; letter-spacing: 0.04em; }
.vp-language-switcher__button {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 2.25rem;
  padding: 0.3rem 0.7rem;
  border: 1px solid var(--vp-border, color-mix(in srgb, currentColor 25%, transparent));
  border-radius: var(--vp-radius, 6px);
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
  transition: background-color 140ms ease, border-color 140ms ease;
}
.vp-language-switcher__button:hover, .vp-language-switcher__button[aria-expanded='true'] { border-color: color-mix(in oklch, currentColor 30%, var(--vp-border, transparent)); background: color-mix(in srgb, currentColor 6%, transparent); }
.vp-language-switcher__short { font-size: 0.75em; font-weight: 650; letter-spacing: 0.06em; opacity: 0.7; }
.vp-language-switcher__arrow { width: 0.4em; height: 0.4em; border-right: 1.5px solid currentColor; border-bottom: 1.5px solid currentColor; opacity: 0.7; transform: translateY(-25%) rotate(45deg); }
.vp-language-switcher__menu {
  position: absolute;
  top: calc(100% + 0.4rem);
  z-index: 30;
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 11rem;
  margin: 0;
  padding: 0.35rem;
  list-style: none;
  border: 1px solid var(--vp-border, color-mix(in srgb, CanvasText 18%, transparent));
  border-radius: var(--vp-radius, 6px);
  background: var(--vp-background, Canvas);
  color: var(--vp-text, CanvasText);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05), 0 20px 40px -14px rgba(0, 0, 0, 0.24);
  animation: vp-language-switcher-in 150ms ease;
}
@keyframes vp-language-switcher-in {
  from { opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .vp-language-switcher__menu { animation: none; }
  .vp-language-switcher__link, .vp-language-switcher__button { transition: none; }
}
.vp-language-switcher__menu[hidden] { display: none; }
.vp-language-switcher--start .vp-language-switcher__menu { left: 0; }
.vp-language-switcher--center .vp-language-switcher__menu { left: 50%; transform: translateX(-50%); }
.vp-language-switcher--end .vp-language-switcher__menu { right: 0; }
.vp-language-switcher__menu .vp-language-switcher__link { display: flex; width: 100%; box-sizing: border-box; }
@media (max-width: 480px) {
  .vp-language-switcher__current { display: none; }
  .vp-language-switcher__link { min-height: 2.75rem; }
}
</style>
`;export{e as default};