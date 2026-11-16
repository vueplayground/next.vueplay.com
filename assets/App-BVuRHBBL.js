var e=`<template>
  <section class="vp-activity-feed" :class="'vp-activity-feed--' + (look === 'list' ? 'list' : 'timeline')" :aria-label="say('title', title)">
    <header v-if="showTitle" class="vp-activity-feed__head">
      <h3 class="vp-activity-feed__title">{{ say('title', title) }}</h3>
    </header>
    <p v-if="!shown.length" class="vp-activity-feed__empty">{{ say('empty', emptyText) }}</p>
    <ol v-else class="vp-activity-feed__list">
      <li v-for="(item, i) in shown" :key="item.id || i" class="vp-activity-feed__item" :class="'vp-activity-feed__item--' + kindOf(item)">
        <span class="vp-activity-feed__marker" :class="{ 'vp-activity-feed__marker--dot': !item.avatar && !paths(item).length && !initials(item) }" aria-hidden="true">
          <img v-if="item.avatar" :src="address(item.avatar) || undefined" :style="held(item.avatar)" alt="" loading="lazy" decoding="async">
          <svg v-else-if="paths(item).length" viewBox="0 0 24 24"><path v-for="(d, n) in paths(item)" :key="n" :d="d" /></svg>
          <span v-else-if="initials(item)">{{ initials(item) }}</span>
        </span>
        <div class="vp-activity-feed__body">
          <p class="vp-activity-feed__text">
            <!-- what the marker's colour says, for a screen reader -->
            <span v-if="kindOf(item) === 'warning' || kindOf(item) === 'danger'" class="vp-activity-feed__kind">{{ say(kindOf(item)) }} </span>
            <a v-if="item.href" class="vp-activity-feed__link" :href="item.href" @click="go($event, item.href)"><strong v-if="item.who">{{ item.who }}</strong> {{ item.what }}</a>
            <template v-else><strong v-if="item.who">{{ item.who }}</strong> {{ item.what }}</template>
          </p>
          <time v-if="item.when" class="vp-activity-feed__when" :datetime="isoOf(item.when) || undefined" :title="exact(item.when) || undefined">{{ when(item.when) }}</time>
        </div>
      </li>
    </ol>
    <a v-if="moreLink" class="vp-activity-feed__more" :href="moreLink" @click="go($event, moreLink)">
      {{ say('more', moreText) }}
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
    </a>
  </section>
</template>
<script>
// What happened, newest first: who did what, and when ("2 hours ago" in the site's language). Fill the list by
// hand, or show it from a source with the plug. In the editor an empty list shows samples.
const HOUR = 3600000
const SAMPLES = now => [
  { who: 'Emma Hansen', what: 'placed an order of $240', when: new Date(now - 4 * 60000).toISOString(), kind: 'success', icon: 'shopping-bag', href: '#' },
  { who: 'Lucas Berg', what: 'signed up for the Pro plan', when: new Date(now - 2 * HOUR).toISOString(), kind: 'info', icon: 'user-plus' },
  { who: 'Payment', what: 'for invoice #1043 failed', when: new Date(now - 5 * HOUR).toISOString(), kind: 'danger', icon: 'credit-card' },
  { who: 'Sara Lind', what: 'left a 5-star review', when: new Date(now - 26 * HOUR).toISOString(), kind: 'warning', icon: 'star' },
  { who: 'Order #1038', what: 'was sent', when: new Date(now - 3 * 24 * HOUR).toISOString(), kind: 'neutral', icon: 'truck' }
]

// The words it says itself, in the site's language. A text filled in in the Props tab is said as it is written.
const WORDS = {
  en: { title: 'Activity', more: 'See all', empty: 'No activity yet.', warning: 'Warning:', danger: 'Error:' },
  nb: { title: 'Aktivitet', more: 'Se alt', empty: 'Ingen aktivitet ennå.', warning: 'Advarsel:', danger: 'Feil:' },
  sv: { title: 'Aktivitet', more: 'Visa alla', empty: 'Ingen aktivitet än.', warning: 'Varning:', danger: 'Fel:' },
  da: { title: 'Aktivitet', more: 'Se alle', empty: 'Ingen aktivitet endnu.', warning: 'Advarsel:', danger: 'Fejl:' },
  fi: { title: 'Toiminta', more: 'Näytä kaikki', empty: 'Ei vielä toimintaa.', warning: 'Varoitus:', danger: 'Virhe:' },
  de: { title: 'Aktivität', more: 'Alle ansehen', empty: 'Noch keine Aktivität.', warning: 'Warnung:', danger: 'Fehler:' },
  fr: { title: 'Activité', more: 'Tout voir', empty: 'Aucune activité pour l’instant.', warning: 'Avertissement :', danger: 'Erreur :' },
  es: { title: 'Actividad', more: 'Ver todo', empty: 'Aún no hay actividad.', warning: 'Aviso:', danger: 'Error:' },
  it: { title: 'Attività', more: 'Vedi tutto', empty: 'Ancora nessuna attività.', warning: 'Avviso:', danger: 'Errore:' },
  nl: { title: 'Activiteit', more: 'Alles bekijken', empty: 'Nog geen activiteit.', warning: 'Waarschuwing:', danger: 'Fout:' },
  pt: { title: 'Atividade', more: 'Ver tudo', empty: 'Ainda não há atividade.', warning: 'Aviso:', danger: 'Erro:' },
  pl: { title: 'Aktywność', more: 'Zobacz wszystko', empty: 'Brak aktywności.', warning: 'Ostrzeżenie:', danger: 'Błąd:' },
  zh: { title: '动态', more: '查看全部', empty: '暂无动态。', warning: '警告：', danger: '错误：' },
  ja: { title: 'アクティビティ', more: 'すべて表示', empty: 'まだアクティビティはありません。', warning: '警告：', danger: 'エラー：' }
}
const KINDS = ['info', 'success', 'warning', 'danger', 'neutral']
// From the largest: a time is said in the first unit it is at least one of
const UNITS = [['year', 31536000], ['month', 2592000], ['week', 604800], ['day', 86400], ['hour', 3600], ['minute', 60], ['second', 1]]

export default {
  inject: { vpData: { default: null } },
  props: {
    items: {
      type: Array,
      default: () => [],
      label: 'What happened',
      control: 'list',
      fields: [
        { key: 'who', label: 'Who', placeholder: 'Emma Hansen' },
        { key: 'what', label: 'What they did', placeholder: 'placed an order' },
        { key: 'when', label: 'When (a date and time, or words)', placeholder: '2026-11-15T09:30' },
        { key: 'kind', label: 'Kind', control: 'select', options: [{ key: 'Info', value: 'info' }, { key: 'Good (success)', value: 'success' }, { key: 'Warning', value: 'warning' }, { key: 'Bad (danger)', value: 'danger' }, { key: 'Neutral', value: 'neutral' }] },
        {
          key: 'icon',
          label: 'Icon',
          control: 'icons',
          options: [
            { key: 'None', value: '', icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636' },
            { key: 'Person', value: 'user', icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' },
            { key: 'New person', value: 'user-plus', icon: 'M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z' },
            { key: 'Order', value: 'shopping-bag', icon: 'M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' },
            { key: 'Payment', value: 'credit-card', icon: 'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z' },
            { key: 'Message', value: 'chat-bubble-left-right', icon: 'M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155' },
            { key: 'Done', value: 'check-circle', icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
            { key: 'Warning', value: 'exclamation-triangle', icon: 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z' },
            { key: 'Document', value: 'document-text', icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z' },
            { key: 'Star', value: 'star', icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z' },
            { key: 'Delivery', value: 'truck', icon: 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12' },
            { key: 'Update', value: 'arrow-path', icon: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99' },
            { key: 'Bell', value: 'bell', icon: 'M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0' }
          ]
        },
        { key: 'href', label: 'Its page', placeholder: '/orders/1043' },
        { key: 'avatar', label: 'Picture of who', control: 'media' }
      ]
    },
    title: { type: String, default: '', label: 'Title', placeholder: 'Activity' },
    showTitle: { type: Boolean, default: false, label: 'Show the title' },
    limit: { type: Number, default: 0, label: 'At most (0 for all)', control: 'number', min: 0, max: 100 },
    relative: { type: Boolean, default: true, label: 'Say when as \\'2 hours ago\\'' },
    look: { type: String, default: 'timeline', label: 'Look', control: 'select', options: [{ key: 'A timeline', value: 'timeline' }, { key: 'A list', value: 'list' }] },
    moreLink: { type: String, default: '', label: 'A link to all of it', placeholder: '/activity' },
    moreText: { type: String, default: '', label: 'Its text', placeholder: 'See all' },
    emptyText: { type: String, default: '', label: 'Said when there is none', placeholder: 'No activity yet.' },
    // (never read: what is shown comes from \`items\`, bound to a source with the plug; kept for pages that set it,
    // and hidden so that picking one does not seem to do something)
    source: { type: String, default: '', label: 'From your backend (a source in Data)', control: 'source', hidden: true }
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
    shown() {
      const list = Array.isArray(this.items) && this.items.length ? this.items : this.inStudio ? SAMPLES(this.now) : []
      return Number(this.limit) > 0 ? list.slice(0, Number(this.limit)) : list
    },
    pictureNames() {
      return this.shown.map(item => item.avatar).filter(one => /^--/.test(one || ''))
    },
    // Only a list with times in it said as "2 hours ago" needs the clock
    ticking() {
      return !!this.relative && this.shown.some(item => Number.isFinite(this.stamp(item?.when)))
    },
    icons() {
      const field = (this.$options.props.items.fields || []).find(one => one.key === 'icon')
      const map = {}
      for (const option of field?.options || []) if (option.icon && option.value) map[option.value] = option.icon.split('|')
      return map
    }
  },
  methods: {
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
    kindOf(item) {
      return KINDS.includes(item?.kind) ? item.kind : 'info'
    },
    paths(item) {
      return this.icons[item?.icon] || []
    },
    initials(item) {
      const words = String(item?.who || '').trim().split(/\\s+/).filter(word => /^\\p{L}/u.test(word))
      if (!words.length) return ''
      return (words[0].charAt(0) + (words.length > 1 ? words[words.length - 1].charAt(0) : '')).toUpperCase()
    },
    // A date (2026-11-15, 2026-11-15T09:30, with or without a zone) as a time; words are not one. A day alone is
    // that day where the visitor is (Date.parse would make it midnight in London: yesterday west of it)
    stamp(value) {
      if (value instanceof Date) return value.getTime()
      if (typeof value === 'number') return value
      const text = String(value || '').trim()
      if (!/^\\d{4}-\\d{2}-\\d{2}/.test(text)) return NaN
      if (this.dayOnly(text)) {
        const [y, m, d] = text.split('-').map(Number)
        return new Date(y, m - 1, d).getTime()
      }
      return Date.parse(text)
    },
    dayOnly(value) {
      return typeof value === 'string' && /^\\d{4}-\\d{2}-\\d{2}$/.test(value.trim())
    },
    isoOf(value) {
      const time = this.stamp(value)
      return Number.isFinite(time) ? new Date(time).toISOString() : ''
    },
    exact(value) {
      const time = this.stamp(value)
      if (!Number.isFinite(time)) return ''
      const day = this.dayOnly(value)
      try { return new Intl.DateTimeFormat(this.locale, day ? { dateStyle: 'medium' } : { dateStyle: 'medium', timeStyle: 'short' }).format(time) } catch (e) { return day ? new Date(time).toLocaleDateString() : new Date(time).toLocaleString() }
    },
    when(value) {
      const time = this.stamp(value)
      if (!Number.isFinite(time)) return String(value ?? '')
      if (!this.relative) return this.exact(value)
      // a day alone: today, yesterday, 3 days ago (counted in days where the visitor is, not in hours)
      if (this.dayOnly(value)) {
        const today = new Date(this.now)
        const days = Math.round((time - new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime()) / 86400000)
        if (Math.abs(days) < 7) {
          try { return new Intl.RelativeTimeFormat(this.locale, { numeric: 'auto' }).format(days, 'day') } catch (e) { return this.exact(value) }
        }
      }
      const seconds = (time - this.now) / 1000
      const away = Math.abs(seconds)
      const [unit, size] = UNITS.find(([, size]) => away >= size) || UNITS[UNITS.length - 1]
      const amount = away < 45 ? 0 : Math.round(seconds / size)
      try {
        return new Intl.RelativeTimeFormat(this.locale, { numeric: 'auto' }).format(amount, away < 45 ? 'second' : unit)
      } catch (e) {
        return this.exact(value)
      }
    },
    // "2 minutes ago" stays true while the page is open
    tick() {
      if (typeof window === 'undefined' || !this.$el) return
      if (this.ticking && !this.ticker) this.ticker = setInterval(() => { this.now = Date.now() }, 30000)
      else if (!this.ticking && this.ticker) { clearInterval(this.ticker); this.ticker = null }
    },
    go(event, href) {
      if (this.inStudio) { event.preventDefault(); return }
      if (event.ctrlKey || event.metaKey || event.shiftKey) return
      if (this.$router && String(href || '').startsWith('/') && !String(href).startsWith('//')) { event.preventDefault(); this.$router.push(href) }
    }
  },
  watch: {
    pictureNames() { this.$nextTick(() => this.findPictures()) },
    ticking: 'tick'
  },
  mounted() {
    this.findPictures()
    this.tick()
  },
  beforeUnmount() {
    clearInterval(this.ticker)
  }
}
<\/script>
<style>
.vp-activity-feed {
  --_size: 2.25rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  min-width: 0;
  color: var(--vp-text, inherit);
}
.vp-activity-feed__head { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
.vp-activity-feed__title { margin: 0; font-family: var(--vp-font-heading, inherit); font-size: 1.05rem; font-weight: 650; line-height: 1.3; }
.vp-activity-feed__empty { margin: 0; padding: 1.5rem 1rem; border: 1px dashed var(--vp-border, #e5e7eb); border-radius: var(--vp-radius, 12px); color: var(--vp-muted, #6b7280); text-align: center; font-size: 0.9rem; }
.vp-activity-feed__list { margin: 0; padding: 0; list-style: none; }
.vp-activity-feed__item {
  --_tone: #2563eb;
  position: relative;
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
  min-width: 0;
}
.vp-activity-feed__item--success { --_tone: #16a34a; }
.vp-activity-feed__item--warning { --_tone: #d97706; }
.vp-activity-feed__item--danger { --_tone: #dc2626; }
.vp-activity-feed__item--neutral { --_tone: #6b7280; }
.vp-activity-feed__marker {
  position: relative;
  z-index: 1;
  flex: none;
  display: grid;
  place-items: center;
  overflow: hidden;
  width: var(--_size);
  height: var(--_size);
  border-radius: 50%;
  background: color-mix(in srgb, var(--_tone) 13%, var(--vp-background, #fff));
  color: var(--_tone);
  box-shadow: 0 0 0 4px var(--vp-background, #fff);
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: 0.02em;
}
.vp-activity-feed__marker img { width: 100%; height: 100%; object-fit: cover; }
.vp-activity-feed__marker svg { width: 1.1rem; height: 1.1rem; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.vp-activity-feed__marker--dot::after { content: ''; width: 0.6rem; height: 0.6rem; border-radius: 50%; background: var(--_tone); }
.vp-activity-feed__body { display: flex; flex: 1; flex-direction: column; gap: 0.15rem; min-width: 0; padding-top: 0.45rem; }
.vp-activity-feed__kind { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
.vp-activity-feed__text { margin: 0; font-size: 0.925rem; line-height: 1.45; overflow-wrap: anywhere; }
.vp-activity-feed__text strong { font-weight: 600; }
.vp-activity-feed__link { color: inherit; text-decoration: none; border-radius: 4px; }
.vp-activity-feed__link:hover { text-decoration: underline; text-underline-offset: 3px; }
.vp-activity-feed__link:focus-visible, .vp-activity-feed__more:focus-visible { outline: 2px solid var(--vp-primary, #2563eb); outline-offset: 2px; }
.vp-activity-feed__when { color: var(--vp-muted, #6b7280); font-size: 0.8rem; font-variant-numeric: tabular-nums; white-space: nowrap; }

/* A timeline: a line through the markers, each step a little apart */
.vp-activity-feed--timeline .vp-activity-feed__item { padding-bottom: 1.25rem; }
.vp-activity-feed--timeline .vp-activity-feed__item:last-child { padding-bottom: 0; }
.vp-activity-feed--timeline .vp-activity-feed__item:not(:last-child)::before {
  content: '';
  position: absolute;
  top: var(--_size);
  bottom: 0;
  left: calc(var(--_size) / 2 - 1px);
  width: 2px;
  background: var(--vp-border, #e5e7eb);
}

/* A list: rows between lines, the time at the end of the row */
.vp-activity-feed--list .vp-activity-feed__item { align-items: center; padding: 0.75rem 0; border-bottom: 1px solid var(--vp-border, #e5e7eb); }
.vp-activity-feed--list .vp-activity-feed__item:first-child { padding-top: 0; }
.vp-activity-feed--list .vp-activity-feed__item:last-child { border-bottom: 0; padding-bottom: 0; }
.vp-activity-feed--list .vp-activity-feed__marker { box-shadow: none; }
.vp-activity-feed--list .vp-activity-feed__body { flex-direction: row; align-items: baseline; justify-content: space-between; gap: 1rem; padding-top: 0; }
@media (max-width: 480px) {
  .vp-activity-feed--list .vp-activity-feed__body { flex-direction: column; gap: 0.15rem; }
}

.vp-activity-feed__more {
  display: inline-flex;
  align-self: flex-start;
  gap: 0.35rem;
  align-items: center;
  margin-top: 0.25rem;
  color: var(--vp-primary, #2563eb);
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 4px;
}
.vp-activity-feed__more:hover { text-decoration: underline; text-underline-offset: 3px; }
.vp-activity-feed__more svg { width: 1rem; height: 1rem; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: transform 150ms ease; }
.vp-activity-feed__more:hover svg { transform: translateX(2px); }
@media (prefers-reduced-motion: reduce) { .vp-activity-feed__more svg { transition: none; } }
</style>
`;export{e as default};