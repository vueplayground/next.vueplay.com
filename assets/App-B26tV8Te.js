var e=`<template>
  <section class="vp-post-list" :class="['vp-post-list--' + kind, 'vp-post-list--' + shape]" :style="style" :aria-label="say('title', title)">
    <h2 v-if="showTitle" class="vp-post-list__heading">{{ say('title', title) }}</h2>
    <p v-if="!shown.length" class="vp-post-list__empty">{{ say('empty', emptyText) }}</p>
    <div v-else class="vp-post-list__grid">
      <article
        v-for="(item, i) in shown"
        :key="item.id || i"
        class="vp-post-list__card"
        :class="{ 'vp-post-list__card--featured': kind === 'featured' && i === 0, 'vp-post-list__card--link': !!item.href }"
      >
        <div v-if="showImage" class="vp-post-list__picture">
          <img v-if="item.image" :src="address(item.image) || undefined" :style="held(item.image)" :alt="item.alt || item.title || ''" loading="lazy" decoding="async">
          <span v-else class="vp-post-list__none" :style="{ '--vp-post-list-hue': (i * 47 + 200) % 360 }" aria-hidden="true">{{ (item.title || '?').charAt(0) }}</span>
        </div>
        <div class="vp-post-list__words">
          <p v-if="showTag && item.tag" class="vp-post-list__tag">{{ item.tag }}</p>
          <component :is="level" class="vp-post-list__title">
            <a v-if="item.href" class="vp-post-list__link" :href="item.href" @click="go($event, item.href)">{{ item.title }}</a>
            <template v-else>{{ item.title }}</template>
          </component>
          <p v-if="showText && item.text" class="vp-post-list__text">{{ item.text }}</p>
          <p v-if="hasMeta(item)" class="vp-post-list__meta">
            <span v-if="showAuthor && item.author" class="vp-post-list__author">{{ item.author }}</span>
            <time v-if="showDate && item.date" class="vp-post-list__date" :datetime="isoOf(item.date) || undefined">{{ dateOf(item.date) }}</time>
            <span v-if="showReadTime && item.readTime" class="vp-post-list__read">{{ readOf(item.readTime) }}</span>
          </p>
          <span v-if="showMore && item.href" class="vp-post-list__more" aria-hidden="true">
            {{ say('more', moreText) }}
            <svg viewBox="0 0 24 24"><path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
          </span>
        </div>
      </article>
    </div>
  </section>
</template>
<script>
// Posts: articles as cards, a picture, a category, the title, a few lines of it, who wrote it and when. Fill the
// list by hand, or show it from a CMS with the plug (WordPress, Strapi, Ghost …), which binds \`items\` in the page:
// the component fetches nothing itself. A post with a page (\`href\`) is a link as a whole card, its title the
// link's name. In the editor an empty list shows samples; on a site an empty list says so.
// (A picture picked in the Studio is the name of a variable that holds it, like --image-boat: it is shown
// through that variable at once, and its address is read from it when the page is alive. An address is used as it is.)
const DAY = 86400000
const SAMPLES = now => [
  { title: 'Ten small habits that make a big difference', text: 'What we learned from a year of trying one new thing every month, and which of them stuck.', date: new Date(now - 2 * DAY).toISOString().slice(0, 10), author: 'Emma Hansen', tag: 'Guides', readTime: 6, href: '#' },
  { title: 'Behind the scenes of our new studio', text: 'A look at how the space came together, from the first sketch to opening day.', date: new Date(now - 9 * DAY).toISOString().slice(0, 10), author: 'Lucas Berg', tag: 'News', readTime: 4, href: '#' },
  { title: 'A beginner’s guide to getting started', text: 'Everything you need to know for the first week, in plain words and without the jargon.', date: new Date(now - 21 * DAY).toISOString().slice(0, 10), author: 'Sara Lind', tag: 'Guides', readTime: 8, href: '#' }
]

// The words it says itself, in the site's language. A text filled in in the Props tab is said as it is written.
const WORDS = {
  en: { title: 'Posts', empty: 'No posts yet.', more: 'Read more', read: '{n} min read' },
  nb: { title: 'Innlegg', empty: 'Ingen innlegg ennå.', more: 'Les mer', read: '{n} min lesing' },
  sv: { title: 'Inlägg', empty: 'Inga inlägg än.', more: 'Läs mer', read: '{n} min läsning' },
  da: { title: 'Indlæg', empty: 'Ingen indlæg endnu.', more: 'Læs mere', read: '{n} min. læsning' },
  fi: { title: 'Artikkelit', empty: 'Ei vielä artikkeleita.', more: 'Lue lisää', read: '{n} min lukuaika' },
  de: { title: 'Beiträge', empty: 'Noch keine Beiträge.', more: 'Weiterlesen', read: '{n} Min. Lesezeit' },
  fr: { title: 'Articles', empty: 'Aucun article pour l’instant.', more: 'Lire la suite', read: '{n} min de lecture' },
  es: { title: 'Entradas', empty: 'Aún no hay entradas.', more: 'Leer más', read: '{n} min de lectura' },
  it: { title: 'Articoli', empty: 'Ancora nessun articolo.', more: 'Leggi di più', read: '{n} min di lettura' },
  nl: { title: 'Berichten', empty: 'Nog geen berichten.', more: 'Lees meer', read: '{n} min leestijd' },
  pt: { title: 'Artigos', empty: 'Ainda não há artigos.', more: 'Ler mais', read: '{n} min de leitura' },
  pl: { title: 'Wpisy', empty: 'Brak wpisów.', more: 'Czytaj dalej', read: '{n} min czytania' },
  zh: { title: '文章', empty: '还没有文章。', more: '阅读更多', read: '阅读约 {n} 分钟' },
  ja: { title: '記事', empty: 'まだ記事はありません。', more: '続きを読む', read: '{n}分で読めます' }
}
const LAYOUTS = ['grid', 'list', 'featured']
const LOOKS = ['plain', 'card', 'minimal']

export default {
  props: {
    items: {
      type: Array,
      default: () => [],
      label: 'Posts',
      control: 'list',
      fields: [
        { key: 'title', label: 'Title' },
        { key: 'text', label: 'A few lines of it', control: 'textarea' },
        { key: 'image', label: 'Picture', control: 'media' },
        { key: 'alt', label: 'Picture described', placeholder: 'For those who cannot see it' },
        { key: 'date', label: 'Date', placeholder: '2026-11-15' },
        { key: 'href', label: 'Its page', placeholder: '/blog/my-post' },
        { key: 'author', label: 'Written by', placeholder: 'Emma Hansen' },
        { key: 'tag', label: 'Category', placeholder: 'News' },
        { key: 'readTime', label: 'Minutes to read', control: 'number' }
      ]
    },
    title: { type: String, default: '', label: 'Title', placeholder: 'Posts' },
    showTitle: { type: Boolean, default: false, label: 'Show the title' },
    layout: { type: String, default: 'grid', label: 'Layout', control: 'select', options: [{ key: 'A grid', value: 'grid' }, { key: 'A list (picture beside the words)', value: 'list' }, { key: 'The first one large', value: 'featured' }] },
    look: { type: String, default: 'card', label: 'Look', control: 'select', options: [{ key: 'Plain', value: 'plain' }, { key: 'Cards', value: 'card' }, { key: 'Minimal (lines between)', value: 'minimal' }] },
    columns: { type: Number, default: 3, label: 'Side by side', control: 'number', min: 1, max: 6 },
    min: { type: String, default: '260px', label: 'Narrowest card', control: 'slider', unit: 'px', min: 160, max: 600 },
    gap: { type: String, default: '', label: 'Space between', control: 'slider', unit: 'px', min: 0, max: 64 },
    limit: { type: Number, default: 0, label: 'At most (0 for all)', control: 'number', min: 0, max: 100 },
    ratio: { type: String, default: '16 / 9', label: 'Shape of the pictures', control: 'select', options: [{ key: 'Wide (16:9)', value: '16 / 9' }, { key: 'Photo (3:2)', value: '3 / 2' }, { key: 'Classic (4:3)', value: '4 / 3' }, { key: 'Square', value: '1 / 1' }] },
    showImage: { type: Boolean, default: true, label: 'Show the pictures' },
    showText: { type: Boolean, default: true, label: 'Show a few lines of each' },
    lines: { type: Number, default: 3, label: 'Lines of it at most (0 for all)', control: 'number', min: 0, max: 12 },
    showTag: { type: Boolean, default: true, label: 'Show the category' },
    showAuthor: { type: Boolean, default: true, label: 'Show who wrote it' },
    showDate: { type: Boolean, default: true, label: 'Show the date' },
    showReadTime: { type: Boolean, default: true, label: 'Show the minutes to read' },
    showMore: { type: Boolean, default: true, label: 'A "Read more" line on posts with a page' },
    moreText: { type: String, default: '', label: 'Its text', placeholder: 'Read more' },
    level: { type: String, default: 'h3', label: 'Titles are a', options: [{ key: 'Heading 2', value: 'h2' }, { key: 'Heading 3', value: 'h3' }, { key: 'Heading 4', value: 'h4' }] },
    emptyText: { type: String, default: '', label: 'Said when there are none', placeholder: 'No posts yet.' }
  },
  data() {
    return { now: Date.now(), found: {} }
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
    // The language Intl is given (Norwegian is nb there)
    locale() {
      const short = this.lang.split('-')[0]
      return short === 'no' || short === 'nn' ? 'nb' : this.lang
    },
    inStudio() {
      return typeof document !== 'undefined' && (document.getElementById('receiver') ? document.getElementById('receiver').getAttribute('live') !== 'yes' : !!window.studio)
    },
    kind() {
      return LAYOUTS.includes(this.layout) ? this.layout : 'grid'
    },
    shape() {
      return LOOKS.includes(this.look) ? this.look : 'card'
    },
    shown() {
      const list = Array.isArray(this.items) && this.items.length ? this.items : this.inStudio ? SAMPLES(this.now) : []
      const some = Number(this.limit) > 0 ? list.slice(0, Number(this.limit)) : list
      // (posts come from a CMS: a link that would run a script, javascript: or data:, is no link)
      return some.map(item => item && item.href && !this.safe(item.href) ? { ...item, href: '' } : item)
    },
    pictureNames() {
      return this.shown.map(item => item?.image).filter(one => /^--/.test(one || ''))
    },
    style() {
      const lines = Number(this.lines)
      return {
        '--vp-post-list-columns': Math.max(1, Math.min(6, Number(this.columns) || 3)),
        '--vp-post-list-min': this.min || undefined,
        '--vp-post-list-gap': this.gap || undefined,
        '--vp-post-list-ratio': this.ratio || undefined,
        '--vp-post-list-lines': lines > 0 ? Math.round(lines) : 'none'
      }
    }
  },
  methods: {
    // A page of the site, a part of the page, or a web, mail or phone address; anything with another scheme is not
    safe(href) {
      const text = String(href || '').trim()
      return !/^[a-z][a-z\\d+.-]*:/i.test(text.replace(/[\\u0000-\\u0020]/g, '')) || /^(https?|mailto|tel):/i.test(text)
    },
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
    hasMeta(item) {
      return !!((this.showAuthor && item.author) || (this.showDate && item.date) || (this.showReadTime && item.readTime))
    },
    // A date (2026-11-15, 2026-11-15T09:30) as a time; a date already said in words is not one
    stamp(value) {
      if (value instanceof Date) return value.getTime()
      const text = String(value || '').trim()
      const day = /^(\\d{4})-(\\d{2})-(\\d{2})$/.exec(text)
      if (day) return new Date(Number(day[1]), Number(day[2]) - 1, Number(day[3])).getTime()
      return /^\\d{4}-\\d{2}-\\d{2}T/.test(text) ? Date.parse(text) : NaN
    },
    isoOf(value) {
      const time = this.stamp(value)
      if (!Number.isFinite(time)) return ''
      const date = new Date(time)
      return /T/.test(String(value)) ? date.toISOString() : [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-')
    },
    dateOf(value) {
      const time = this.stamp(value)
      if (!Number.isFinite(time)) return String(value ?? '')
      try { return new Intl.DateTimeFormat(this.locale, { dateStyle: 'medium' }).format(time) } catch (e) { return new Date(time).toLocaleDateString() }
    },
    // A number of minutes is said in the site's language; words are shown as they are
    readOf(value) {
      const minutes = Number(value)
      return Number.isFinite(minutes) && minutes > 0 ? this.say('read', '', Math.max(1, Math.round(minutes))) : String(value)
    },
    // A page of the site is shown by the site's router where there is one, without loading the site again
    go(event, href) {
      if (this.inStudio) { event.preventDefault(); return }
      if (event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      if (this.$router && /^\\/(?!\\/)/.test(String(href || ''))) { event.preventDefault(); this.$router.push(href) }
    }
  },
  watch: {
    pictureNames() { this.$nextTick(() => this.findPictures()) }
  },
  mounted() {
    this.findPictures()
  }
}
<\/script>
<style>
.vp-post-list {
  --_gap: var(--vp-post-list-gap, clamp(1rem, 2.5vw, 1.75rem));
  --_radius: var(--vp-radius, 12px);
  --_min: var(--vp-post-list-min, 260px);
  --_columns: var(--vp-post-list-columns, 3);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
  min-width: 0;
  color: var(--vp-text, inherit);
  container-type: inline-size;
}
.vp-post-list__heading { margin: 0; font-family: var(--vp-font-heading, inherit); font-size: clamp(1.4rem, 3vw, 1.9rem); font-weight: 700; line-height: 1.2; color: var(--vp-heading, inherit); }
.vp-post-list__empty { margin: 0; padding: 2rem 1rem; border: 1px dashed var(--vp-border, rgba(127, 127, 127, 0.3)); border-radius: var(--_radius); color: var(--vp-muted, #6b7280); text-align: center; }

/* A grid: as many side by side as asked, but never narrower than the narrowest card (nor wider than the row) */
.vp-post-list__grid {
  display: grid;
  gap: calc(var(--_gap) * 1.25) var(--_gap);
  grid-template-columns: repeat(
    auto-fill,
    minmax(min(100%, max(var(--_min), (100% - (var(--_columns) - 1) * var(--_gap)) / var(--_columns))), 1fr)
  );
}
.vp-post-list--list .vp-post-list__grid { grid-template-columns: minmax(0, 1fr); }

.vp-post-list__card { position: relative; display: flex; flex-direction: column; gap: 0.9rem; min-width: 0; }
.vp-post-list--card .vp-post-list__card {
  overflow: hidden;
  gap: 0;
  border: 1px solid var(--vp-border, rgba(127, 127, 127, 0.22));
  border-radius: var(--_radius);
  background: var(--vp-surface, transparent);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 6px 20px rgba(0, 0, 0, 0.05);
  transition: transform 160ms ease, box-shadow 160ms ease;
}
.vp-post-list--card .vp-post-list__card--link:hover { transform: translateY(-3px); box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06), 0 14px 32px rgba(0, 0, 0, 0.12); }
.vp-post-list--minimal .vp-post-list__card { padding-bottom: calc(var(--_gap) * 0.75); border-bottom: 1px solid var(--vp-border, rgba(127, 127, 127, 0.22)); }

.vp-post-list__picture { position: relative; flex: none; overflow: hidden; aspect-ratio: var(--vp-post-list-ratio, 16 / 9); border-radius: var(--_radius); background: var(--vp-surface, rgba(127, 127, 127, 0.1)); }
.vp-post-list--card .vp-post-list__picture { border-radius: 0; }
.vp-post-list--minimal .vp-post-list__picture { border-radius: calc(var(--_radius) * 0.6); }
.vp-post-list__picture img { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1); }
.vp-post-list__card--link:hover .vp-post-list__picture img { transform: scale(1.04); }
.vp-post-list__none {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(140deg, hsl(var(--vp-post-list-hue, 200) 55% 86%), hsl(calc(var(--vp-post-list-hue, 200) + 40) 60% 76%));
  color: hsl(var(--vp-post-list-hue, 200) 35% 32%);
  font-size: 2.5rem;
  font-weight: 700;
}

.vp-post-list__words { display: flex; flex: 1; flex-direction: column; align-items: flex-start; gap: 0.45rem; min-width: 0; }
.vp-post-list--card .vp-post-list__words { padding: clamp(1rem, 2.5vw, 1.35rem); }
.vp-post-list__tag { margin: 0; color: var(--vp-primary, #2563eb); font-size: 0.75rem; font-weight: 650; letter-spacing: 0.06em; text-transform: uppercase; }
.vp-post-list__title { margin: 0; font-family: var(--vp-font-heading, inherit); font-size: 1.15rem; font-weight: 650; line-height: 1.3; color: var(--vp-heading, inherit); overflow-wrap: anywhere; }
.vp-post-list--minimal .vp-post-list__title { font-size: 1.05rem; }
.vp-post-list__link { color: inherit; text-decoration: none; }
/* the title's link covers the whole card, so the card is one link named by its title */
.vp-post-list__link::after { content: ''; position: absolute; inset: 0; z-index: 1; border-radius: inherit; }
.vp-post-list__card--link:hover .vp-post-list__link { text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 3px; }
.vp-post-list__link:focus-visible { outline: none; }
.vp-post-list__link:focus-visible::after { outline: 2px solid var(--vp-primary, #2563eb); outline-offset: 2px; border-radius: var(--_radius); }
.vp-post-list__text {
  display: -webkit-box;
  margin: 0;
  overflow: hidden;
  color: var(--vp-muted, inherit);
  font-size: 0.925rem;
  line-height: 1.55;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--vp-post-list-lines, 3);
  line-clamp: var(--vp-post-list-lines, 3);
}
/* (the dot between two is in the gap before the second; one that would begin a line is outside the row and not seen) */
.vp-post-list__meta { display: flex; flex-wrap: wrap; align-items: center; gap: 0.25rem 1rem; margin: 0.15rem 0 0; overflow: hidden; color: var(--vp-muted, #6b7280); font-size: 0.8rem; }
.vp-post-list__meta > * { position: relative; }
.vp-post-list__meta > * + *::before { content: '·'; position: absolute; left: -0.62rem; opacity: 0.7; }
.vp-post-list__author { font-weight: 600; color: var(--vp-text, inherit); }
.vp-post-list__date, .vp-post-list__read { font-variant-numeric: tabular-nums; white-space: nowrap; }
.vp-post-list__more { display: inline-flex; align-items: center; gap: 0.35rem; margin-top: auto; padding-top: 0.35rem; color: var(--vp-primary, #2563eb); font-size: 0.875rem; font-weight: 600; }
.vp-post-list__more svg { width: 1rem; height: 1rem; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: transform 150ms ease; }
.vp-post-list__card--link:hover .vp-post-list__more svg { transform: translateX(3px); }

/* The first one large: across the row, its picture beside the words where there is room */
.vp-post-list__card--featured { grid-column: 1 / -1; }
.vp-post-list__card--featured .vp-post-list__title { font-size: clamp(1.35rem, 3vw, 1.85rem); }
@container (min-width: 640px) {
  .vp-post-list__card--featured { flex-direction: row; align-items: stretch; }
  .vp-post-list__card--featured .vp-post-list__picture { flex: 0 0 58%; aspect-ratio: auto; min-height: 18rem; }
  .vp-post-list--card .vp-post-list__card--featured .vp-post-list__words { justify-content: center; padding: clamp(1.25rem, 3vw, 2rem); }
  .vp-post-list--plain .vp-post-list__card--featured, .vp-post-list--minimal .vp-post-list__card--featured { gap: var(--_gap); }
  .vp-post-list--plain .vp-post-list__card--featured .vp-post-list__words, .vp-post-list--minimal .vp-post-list__card--featured .vp-post-list__words { justify-content: center; }
}
/* A list: the picture beside the words, one on top of the other where it is narrow */
@container (min-width: 520px) {
  .vp-post-list--list .vp-post-list__card { flex-direction: row; align-items: stretch; }
  .vp-post-list--list .vp-post-list__picture { flex: 0 0 min(38%, 320px); align-self: flex-start; }
  .vp-post-list--card.vp-post-list--list .vp-post-list__picture { align-self: stretch; aspect-ratio: auto; min-height: 10rem; }
  .vp-post-list--plain.vp-post-list--list .vp-post-list__card, .vp-post-list--minimal.vp-post-list--list .vp-post-list__card { gap: var(--_gap); }
}
@media (prefers-reduced-motion: reduce) {
  .vp-post-list__picture img, .vp-post-list--card .vp-post-list__card, .vp-post-list__more svg { transition: none; }
  .vp-post-list__card--link:hover .vp-post-list__picture img { transform: none; }
}
</style>
`;export{e as default};