var e=`<template>
  <div class="vp-site-search" :class="['vp-site-search--' + kind, { 'vp-site-search--open': popup }]" :style="style">
    <button v-if="kind === 'button'" ref="opener" type="button" class="vp-site-search__opener" aria-haspopup="dialog" @click="openDialog">
      <svg class="vp-site-search__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 21l-4.35-4.35" /><path d="M11 18a7 7 0 100-14 7 7 0 000 14z" /></svg>
      <span>{{ buttonText || say('open') }}</span>
    </button>
    <component
      :is="kind === 'button' ? 'dialog' : 'div'"
      ref="box"
      class="vp-site-search__box"
      :aria-label="kind === 'button' ? say('label') : undefined"
      @cancel="onCancel"
      @close="onClose"
      @click="onBoxClick"
    >
      <form v-if="kind !== 'button' || dialogOpen" class="vp-site-search__form" role="search" @submit.prevent="enter" @focusout="onFocusOut">
        <label class="vp-site-search__said" :for="uid + '-field'">{{ say('label') }}</label>
        <div class="vp-site-search__field">
          <svg class="vp-site-search__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 21l-4.35-4.35" /><path d="M11 18a7 7 0 100-14 7 7 0 000 14z" /></svg>
          <input
            :id="uid + '-field'"
            ref="field"
            class="vp-site-search__input"
            type="search"
            role="combobox"
            autocomplete="off"
            spellcheck="false"
            enterkeyhint="go"
            aria-autocomplete="list"
            :aria-expanded="expanded ? 'true' : 'false'"
            :aria-controls="uid + '-list'"
            :aria-activedescendant="expanded && active !== -1 ? uid + '-option-' + active : undefined"
            :placeholder="placeholder || say('placeholder')"
            :value="query"
            @input="onInput"
            @keydown="onKey"
            @focus="open = true"
          >
          <button v-if="query" type="button" class="vp-site-search__clear" :aria-label="say('clear')" @click="clear">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          <button v-if="kind === 'button'" type="button" class="vp-site-search__close" @click="closeDialog">{{ say('close') }}</button>
        </div>
        <div v-show="popup" class="vp-site-search__popup">
          <ul :id="uid + '-list'" ref="list" class="vp-site-search__list" role="listbox" :aria-label="say('label')">
            <li
              v-for="(item, i) in results"
              :id="uid + '-option-' + i"
              :key="item.href + '|' + i"
              class="vp-site-search__option"
              :class="{ 'vp-site-search__option--active': i === active }"
              role="option"
              :aria-selected="i === active ? 'true' : 'false'"
              @mousedown.prevent
              @mousemove="active = i"
              @click="choose(item)"
            >
              <span class="vp-site-search__title"><template v-for="(part, n) in marked(item.title)" :key="n"><mark v-if="part.hit" class="vp-site-search__hit">{{ part.text }}</mark><template v-else>{{ part.text }}</template></template></span>
              <span v-if="item.text" class="vp-site-search__text">{{ item.text }}</span>
              <span v-if="item.shown" class="vp-site-search__path">{{ item.shown }}</span>
            </li>
          </ul>
          <p v-if="!results.length" class="vp-site-search__none">{{ say('none') }}</p>
        </div>
        <p class="vp-site-search__said" role="status" aria-live="polite">{{ status }}</p>
      </form>
    </component>
  </div>
</template>
<script>
// Search: a field that finds the pages of the site as the visitor types. What it searches is the site's own
// pages (the router's routes: each one's title, from its meta or name, or from its page's head() when that page is
// loaded already) and the \`items\` list (guides, posts, anything with an address). Nothing is asked of a server:
// the list is filtered in memory, without caring about case or accents, the words in any order.
// The keys are those of a combobox with a list (WAI-ARIA APG): arrows move, Enter opens, Esc clears.
// In the editor, a site with no pages and no items searches a few samples.
let made = 0
const SAMPLES = [
  { title: 'Getting started', text: 'From nothing to your first page in five minutes.', href: '/start' },
  { title: 'Guides', text: 'One thing at a time, each read by itself.', href: '/guides' },
  { title: 'Questions and answers', text: 'What is asked most, answered.', href: '/help' },
  { title: 'Contact', text: 'Write to us, we answer within a day.', href: '/contact' }
]
// (letters an accent does not come off: æ, ø, ß …)
const LETTERS = { æ: 'ae', ø: 'o', œ: 'oe', ß: 'ss', đ: 'd', ł: 'l', ð: 'd', þ: 'th', ı: 'i' }
const fold = text => String(text ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[æøœßđłðþı]/g, c => LETTERS[c])

// The words it says itself, in the site's language. A text filled in in the Props tab is said as it is written.
const WORDS = {
  en: { label: 'Search', placeholder: 'Search the site…', none: 'No results', results: { one: '{n} result', other: '{n} results' }, clear: 'Clear', close: 'Close', open: 'Search', home: 'Home' },
  nb: { label: 'Søk', placeholder: 'Søk på nettstedet…', none: 'Ingen treff', results: { one: '{n} treff', other: '{n} treff' }, clear: 'Tøm', close: 'Lukk', open: 'Søk', home: 'Hjem' },
  sv: { label: 'Sök', placeholder: 'Sök på webbplatsen…', none: 'Inga träffar', results: { one: '{n} träff', other: '{n} träffar' }, clear: 'Rensa', close: 'Stäng', open: 'Sök', home: 'Hem' },
  da: { label: 'Søg', placeholder: 'Søg på siden…', none: 'Ingen resultater', results: { one: '{n} resultat', other: '{n} resultater' }, clear: 'Ryd', close: 'Luk', open: 'Søg', home: 'Forside' },
  fi: { label: 'Haku', placeholder: 'Hae sivustolta…', none: 'Ei tuloksia', results: { one: '{n} tulos', other: '{n} tulosta' }, clear: 'Tyhjennä', close: 'Sulje', open: 'Hae', home: 'Etusivu' },
  de: { label: 'Suche', placeholder: 'Website durchsuchen…', none: 'Keine Ergebnisse', results: { one: '{n} Ergebnis', other: '{n} Ergebnisse' }, clear: 'Leeren', close: 'Schließen', open: 'Suchen', home: 'Startseite' },
  fr: { label: 'Recherche', placeholder: 'Rechercher sur le site…', none: 'Aucun résultat', results: { one: '{n} résultat', other: '{n} résultats' }, clear: 'Effacer', close: 'Fermer', open: 'Rechercher', home: 'Accueil' },
  es: { label: 'Buscar', placeholder: 'Buscar en el sitio…', none: 'Sin resultados', results: { one: '{n} resultado', other: '{n} resultados' }, clear: 'Borrar', close: 'Cerrar', open: 'Buscar', home: 'Inicio' },
  it: { label: 'Cerca', placeholder: 'Cerca nel sito…', none: 'Nessun risultato', results: { one: '{n} risultato', other: '{n} risultati' }, clear: 'Cancella', close: 'Chiudi', open: 'Cerca', home: 'Home' },
  nl: { label: 'Zoeken', placeholder: 'Zoek op de site…', none: 'Geen resultaten', results: { one: '{n} resultaat', other: '{n} resultaten' }, clear: 'Wissen', close: 'Sluiten', open: 'Zoeken', home: 'Home' },
  pt: { label: 'Pesquisar', placeholder: 'Pesquisar no site…', none: 'Nenhum resultado', results: { one: '{n} resultado', other: '{n} resultados' }, clear: 'Limpar', close: 'Fechar', open: 'Pesquisar', home: 'Início' },
  pl: { label: 'Szukaj', placeholder: 'Szukaj na stronie…', none: 'Brak wyników', results: { one: '{n} wynik', few: '{n} wyniki', many: '{n} wyników', other: '{n} wyniku' }, clear: 'Wyczyść', close: 'Zamknij', open: 'Szukaj', home: 'Strona główna' },
  zh: { label: '搜索', placeholder: '搜索本站…', none: '没有结果', results: { other: '{n} 个结果' }, clear: '清除', close: '关闭', open: '搜索', home: '首页' },
  ja: { label: '検索', placeholder: 'サイト内を検索…', none: '結果はありません', results: { other: '{n} 件の結果' }, clear: 'クリア', close: '閉じる', open: '検索', home: 'ホーム' }
}
const LOOKS = ['field', 'big', 'button']

export default {
  props: {
    placeholder: { type: String, default: '', label: 'Placeholder', placeholder: 'Search the site…' },
    items: {
      type: Array,
      default: () => [],
      label: 'More to find',
      control: 'list',
      fields: [
        { key: 'title', label: 'Title' },
        { key: 'text', label: 'A line about it', control: 'textarea' },
        { key: 'href', label: 'Its address', placeholder: '/guides/charts' },
        { key: 'keywords', label: 'Words it is also found by', placeholder: 'graph, plot' }
      ]
    },
    includePages: { type: Boolean, default: true, label: 'Find the site\\'s pages too' },
    limit: { type: Number, default: 8, label: 'Results at most', control: 'number', min: 1, max: 30 },
    look: { type: String, default: 'field', label: 'Look', control: 'select', options: [{ key: 'A field', value: 'field' }, { key: 'A big field (for a hero)', value: 'big' }, { key: 'A button that opens it', value: 'button' }] },
    buttonText: { type: String, default: '', label: 'The button\\'s text', placeholder: 'Search' },
    width: { type: String, default: '', label: 'Widest', control: 'slider', unit: 'px', min: 200, max: 1000 }
  },
  data() {
    return { query: '', active: -1, open: false, dialogOpen: false, uid: 'vp-site-search-' + ++made }
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
    locale() {
      const short = this.lang.split('-')[0]
      return short === 'no' || short === 'nn' ? 'nb' : this.lang
    },
    inStudio() {
      return typeof document !== 'undefined' && (document.getElementById('receiver') ? document.getElementById('receiver').getAttribute('live') !== 'yes' : !!window.studio)
    },
    kind() {
      return LOOKS.includes(this.look) ? this.look : 'field'
    },
    // The site's pages, as the router has them: not those that stand for many (/post/:id), the one that catches
    // every other address, nor one whose meta says \`search: false\`
    pages() {
      if (!this.includePages || !this.$router || typeof this.$router.getRoutes !== 'function') return []
      let routes = []
      try { routes = this.$router.getRoutes() } catch (e) { return [] }
      const found = []
      for (const route of routes) {
        const path = String(route?.path || '')
        const meta = route?.meta || {}
        if (!path.startsWith('/') || /[:*(]/.test(path) || route.redirect || meta.search === false || meta.hidden || route.name === 'NotFound') continue
        if (found.some(one => one.href === path)) continue
        found.push({ title: this.titleOf(route), text: String(meta.description || ''), href: path, keywords: [meta.keywords].flat().filter(Boolean).join(' ') })
      }
      return found
    },
    index() {
      const own = (Array.isArray(this.items) ? this.items : []).filter(item => item && (item.title || item.href) && this.safe(item.href))
      const taken = new Set(own.map(item => String(item.href || '').split('#')[0]))
      let all = [...own, ...this.pages.filter(page => !taken.has(page.href))]
      if (!all.length && this.inStudio) all = SAMPLES
      return all.map(item => {
        const title = String(item.title || this.readable(item.href))
        const text = String(item.text || '')
        const href = String(item.href || '')
        return { title, text, href, shown: /^\\/(?!\\/)/.test(href) ? href : '', titleFolded: fold(title), hay: fold([title, text, item.keywords || '', href].join(' ')) }
      })
    },
    words() {
      return fold(this.query).split(/\\s+/).filter(Boolean)
    },
    // Each word somewhere in it; a word in the title counts most, one the title starts with more still
    results() {
      const words = this.words
      if (!words.length) return []
      const most = Math.max(1, Math.min(30, Number(this.limit) || 8))
      return this.index
        .map((item, n) => ({ item, n, score: words.every(word => item.hay.includes(word)) ? words.reduce((sum, word) => sum + (item.titleFolded.startsWith(word) ? 4 : (' ' + item.titleFolded).includes(' ' + word) ? 3 : item.titleFolded.includes(word) ? 2 : 1), 0) : 0 }))
        .filter(one => one.score)
        .sort((a, b) => b.score - a.score || a.n - b.n)
        .slice(0, most)
        .map(one => one.item)
    },
    popup() {
      return this.open && this.words.length > 0
    },
    expanded() {
      return this.popup && this.results.length > 0
    },
    // what a screen reader is told, politely, as the list changes
    status() {
      if (!this.words.length) return ''
      return this.results.length ? this.counted(this.results.length) : this.say('none')
    },
    style() {
      return { '--vp-site-search-width': this.width || undefined }
    }
  },
  methods: {
    say(key) {
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return words[key] ?? WORDS.en[key]
    },
    counted(n) {
      const forms = this.say('results')
      let form = 'other'
      try { form = new Intl.PluralRules(this.locale).select(n) } catch (e) {}
      return String(forms[form] || forms.other).replace('{n}', n)
    },
    safe(href) {
      const text = String(href || '').trim()
      return !/^[a-z][a-z\\d+.-]*:/i.test(text.replace(/[\\u0000- ]/g, '')) || /^(https?|mailto|tel):/i.test(text)
    },
    // "/guides/sending-data" is "Sending data"; the front page is Home
    readable(href) {
      const part = String(href || '').split(/[?#]/)[0].split('/').filter(Boolean).pop()
      if (!part) return this.say('home')
      let text = part
      try { text = decodeURIComponent(part) } catch (e) {}
      text = text.replace(/[-_]+/g, ' ').trim()
      return text.charAt(0).toUpperCase() + text.slice(1)
    },
    // A route's title: its meta's, its page's head() where the page is loaded already, its name, its address
    titleOf(route) {
      const meta = route.meta || {}
      if (meta.title) return String(meta.title)
      const page = route.components?.default
      if (page && typeof page === 'object' && page.head) {
        try {
          const head = typeof page.head === 'function' ? page.head.call({ $route: route }) : page.head
          if (head && typeof head.title === 'string' && head.title.trim()) return head.title.trim()
        } catch (e) {}
      }
      if (route.path === '/') return this.say('home')
      if (typeof route.name === 'string' && route.name) return route.name
      return this.readable(route.path)
    },
    // The title in parts, the words searched for marked
    marked(text) {
      const words = this.words
      if (!words.length) return [{ text, hit: false }]
      let folded = ''
      const from = []
      for (let i = 0; i < text.length; i++) {
        const one = fold(text[i])
        folded += one
        for (let k = 0; k < one.length; k++) from.push(i)
      }
      const hit = new Array(text.length).fill(false)
      for (const word of words) {
        let at = folded.indexOf(word)
        while (at !== -1) {
          for (let k = at; k < at + word.length; k++) hit[from[k]] = true
          at = folded.indexOf(word, at + word.length)
        }
      }
      const parts = []
      for (let i = 0; i < text.length; i++) {
        const last = parts[parts.length - 1]
        if (last && last.hit === hit[i]) last.text += text[i]
        else parts.push({ text: text[i], hit: hit[i] })
      }
      return parts
    },
    onInput(event) {
      this.query = event.target.value
      this.active = -1
      this.open = true
    },
    onKey(event) {
      const count = this.results.length
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault()
        this.open = true
        if (!count) return
        if (event.key === 'ArrowDown') this.active = this.active + 1 >= count ? 0 : this.active + 1
        else this.active = this.active <= 0 ? count - 1 : this.active - 1
        this.$nextTick(() => {
          const option = this.$refs.list?.children?.[this.active]
          if (option && typeof option.scrollIntoView === 'function') option.scrollIntoView({ block: 'nearest' })
        })
      } else if (event.key === 'Escape') {
        // (the first Esc clears what is written; in the dialog, the next closes it)
        if (this.query) {
          event.preventDefault()
          event.stopPropagation()
          this.clear()
        } else if (this.kind === 'button') {
          event.preventDefault()
          this.closeDialog()
        }
      } else if (event.key === 'Tab') {
        this.open = false
      }
    },
    // Enter: the result moved to, or the first one
    enter() {
      const item = this.results[this.active] || this.results[0]
      if (item) this.choose(item)
    },
    choose(item) {
      if (!item) return
      this.open = false
      this.active = -1
      if (this.inStudio) return
      const href = item.href
      if (!href || !this.safe(href)) return
      if (this.kind === 'button') this.closeDialog(true)
      if (this.$router && /^\\/(?!\\/)/.test(href)) this.$router.push(href)
      else if (typeof window !== 'undefined') window.location.assign(href)
    },
    clear() {
      this.query = ''
      this.active = -1
      this.$refs.field?.focus()
    },
    onFocusOut(event) {
      const to = event.relatedTarget
      if (!to || !this.$el.contains(to)) this.open = false
    },
    openDialog() {
      this.dialogOpen = true
      this.$nextTick(() => {
        const box = this.$refs.box
        if (box && typeof box.showModal === 'function') { try { if (!box.open) box.showModal() } catch (e) { box.setAttribute('open', '') } } else if (box) box.setAttribute('open', '')
        this.$refs.field?.focus()
        this.open = true
      })
    },
    closeDialog(quiet) {
      const box = this.$refs.box
      if (box && typeof box.close === 'function' && box.open) box.close()
      else if (box) box.removeAttribute('open')
      this.onClose(quiet)
    },
    onClose(quiet) {
      if (!this.dialogOpen) return
      this.dialogOpen = false
      this.open = false
      if (quiet !== true) this.$nextTick(() => this.$refs.opener?.focus())
    },
    // the browser's own Esc in the dialog: clear first, close after
    onCancel(event) {
      if (this.query) { event.preventDefault(); this.clear() }
    },
    // a click on the dim around the dialog closes it
    onBoxClick(event) {
      if (this.kind === 'button' && event.target === this.$refs.box) this.closeDialog()
    }
  },
  watch: {
    query() { this.active = -1 }
  }
}
<\/script>
<style>
.vp-site-search {
  --_accent: var(--vp-primary, #2563eb);
  --_line: var(--vp-border, color-mix(in srgb, currentColor 22%, transparent));
  --_radius: var(--vp-radius, 10px);
  --_back: var(--vp-background, Canvas);
  --_text: var(--vp-text, CanvasText);
  box-sizing: border-box;
  position: relative;
  width: 100%;
  max-width: var(--vp-site-search-width, 100%);
  min-width: 0;
  color: var(--_text);
}
.vp-site-search--big { margin-inline: auto; max-width: var(--vp-site-search-width, 640px); }
.vp-site-search--button { width: auto; }
.vp-site-search__said { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
.vp-site-search__form { position: relative; margin: 0; }
.vp-site-search__field { position: relative; display: flex; align-items: center; gap: 0.5rem; }
.vp-site-search__icon { flex: none; width: 1.15em; height: 1.15em; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.vp-site-search__field > .vp-site-search__icon { position: absolute; left: 0.85em; color: var(--vp-muted, currentColor); pointer-events: none; }
.vp-site-search__input {
  box-sizing: border-box;
  flex: 1;
  width: 100%;
  min-width: 0;
  margin: 0;
  min-height: 2.875rem;
  padding: 0.7em 2.6em 0.7em 2.6em;
  border: 1px solid color-mix(in oklch, var(--_text) 16%, var(--_line));
  border-radius: var(--_radius);
  background: var(--_back);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  color: var(--_text);
  font: inherit;
  font-size: 1rem;
  line-height: 1.3;
  appearance: none;
  transition: border-color 140ms ease, box-shadow 140ms ease;
}
.vp-site-search__input:hover { border-color: color-mix(in oklch, var(--_text) 34%, var(--_line)); }
.vp-site-search__input::placeholder { color: var(--vp-muted, color-mix(in srgb, currentColor 65%, transparent)); opacity: 1; }
.vp-site-search__input::-webkit-search-cancel-button { display: none; }
.vp-site-search__input:focus { outline: 2px solid transparent; border-color: var(--_accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--_accent) 24%, transparent); }
.vp-site-search--big .vp-site-search__input { padding: 0.95em 3em 0.95em 2.9em; font-size: 1.125rem; border-radius: calc(var(--_radius) * 1.4); box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 16px 36px -16px rgba(0, 0, 0, 0.2); }
.vp-site-search--big .vp-site-search__input:focus { box-shadow: 0 0 0 3px color-mix(in srgb, var(--_accent) 24%, transparent), 0 16px 36px -16px rgba(0, 0, 0, 0.2); }
.vp-site-search--big .vp-site-search__field > .vp-site-search__icon { left: 1em; width: 1.35em; height: 1.35em; }
.vp-site-search__clear {
  position: absolute;
  right: 0.45em;
  display: grid;
  place-items: center;
  width: 2em;
  height: 2em;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--vp-muted, currentColor);
  cursor: pointer;
}
.vp-site-search--button .vp-site-search__clear { right: 5.5em; }
.vp-site-search__clear svg { width: 1.1em; height: 1.1em; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }
.vp-site-search__clear:hover { background: color-mix(in srgb, currentColor 10%, transparent); }
.vp-site-search__clear:focus-visible, .vp-site-search__close:focus-visible, .vp-site-search__opener:focus-visible { outline: 2px solid var(--_accent); outline-offset: 2px; }
.vp-site-search__close { flex: none; padding: 0.55em 0.8em; border: 0; border-radius: var(--_radius); background: transparent; color: var(--_text); font: inherit; font-weight: 600; cursor: pointer; }
.vp-site-search__close:hover { background: color-mix(in srgb, currentColor 8%, transparent); }

.vp-site-search__popup {
  position: absolute;
  z-index: 30;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  overflow: hidden;
  border: 1px solid var(--_line);
  border-radius: var(--_radius);
  background: var(--_back);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05), 0 24px 48px -16px rgba(0, 0, 0, 0.22);
  animation: vp-site-search-in 160ms ease;
}
@keyframes vp-site-search-in {
  from { opacity: 0; transform: translateY(-4px); }
}
.vp-site-search--button .vp-site-search__popup { position: static; margin-top: 0.75rem; box-shadow: none; animation: none; }
.vp-site-search__list { max-height: min(60vh, 26rem); margin: 0; padding: 0.35rem; overflow-y: auto; list-style: none; }
.vp-site-search__list:empty { display: none; }
.vp-site-search__option { display: flex; flex-direction: column; gap: 0.15rem; padding: 0.6rem 0.75rem; border-radius: calc(var(--_radius) * 0.7); cursor: pointer; text-align: left; }
.vp-site-search__option--active { background: color-mix(in srgb, var(--_accent) 11%, transparent); }
.vp-site-search__title { font-weight: 600; line-height: 1.3; overflow-wrap: anywhere; }
.vp-site-search__option--active .vp-site-search__title { color: color-mix(in srgb, var(--_accent) 72%, var(--_text)); }
.vp-site-search__hit { padding: 0 0.1em; margin: 0 -0.1em; border-radius: 3px; background: color-mix(in srgb, var(--_accent) 20%, transparent); color: inherit; font-weight: 650; }
.vp-site-search__text { display: -webkit-box; overflow: hidden; color: var(--vp-muted, inherit); font-size: 0.875rem; line-height: 1.45; -webkit-box-orient: vertical; -webkit-line-clamp: 2; line-clamp: 2; }
.vp-site-search__path { color: var(--vp-muted, inherit); font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.72rem; opacity: 0.85; overflow-wrap: anywhere; }
.vp-site-search__none { margin: 0; padding: 1rem; color: var(--vp-muted, inherit); text-align: center; }

/* A button that opens the search in a dialog */
.vp-site-search__opener {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  min-height: 2.5rem;
  padding: 0.5em 0.95em;
  border: 1px solid color-mix(in oklch, var(--_text) 16%, var(--_line));
  border-radius: var(--_radius);
  background: transparent;
  color: color-mix(in oklch, var(--_text) 78%, transparent);
  font: inherit;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: border-color 140ms ease, background-color 140ms ease, color 140ms ease;
}
.vp-site-search__opener:hover { border-color: color-mix(in oklch, var(--_accent) 55%, var(--_line)); background: color-mix(in oklch, var(--_accent) 6%, transparent); color: var(--_text); }
.vp-site-search--button .vp-site-search__box {
  box-sizing: border-box;
  width: min(640px, calc(100vw - 2rem));
  max-height: calc(100dvh - 4rem);
  margin: 2rem auto auto;
  padding: 1rem;
  overflow: auto;
  border: 1px solid var(--_line);
  border-radius: calc(var(--_radius) * 1.4);
  background: var(--_back);
  color: var(--_text);
  box-shadow: 0 32px 72px -16px rgba(0, 0, 0, 0.4);
}
.vp-site-search--button .vp-site-search__box[open] { animation: vp-site-search-in 180ms ease; }
.vp-site-search--button .vp-site-search__box:not([open]) { display: none; }
.vp-site-search__box::backdrop { background: rgba(8, 10, 18, 0.5); -webkit-backdrop-filter: blur(3px); backdrop-filter: blur(3px); }
@media (max-width: 480px) {
  .vp-site-search--button .vp-site-search__box { width: calc(100vw - 1rem); margin-top: 0.5rem; padding: 0.75rem; }
  .vp-site-search--big .vp-site-search__input { font-size: 1.05rem; }
}
@media (prefers-reduced-motion: reduce) {
  .vp-site-search__option, .vp-site-search__input, .vp-site-search__opener { transition: none; }
  .vp-site-search__popup, .vp-site-search--button .vp-site-search__box[open] { animation: none; }
}
</style>
`;export{e as default};