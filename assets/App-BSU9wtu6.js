var e=`<template>
  <div class="vp-task-board" :class="{ 'vp-task-board--dragging': !!(drag && drag.on) }" :style="style">
    <p v-if="!grouped.length" class="vp-task-board__empty">{{ say('empty', emptyText) }}</p>
    <div v-else ref="scroller" class="vp-task-board__scroller" :aria-describedby="uid + '-help'">
      <section v-for="lane in grouped" :key="lane.key" class="vp-task-board__column" :class="{ 'vp-task-board__column--target': isTarget(lane) }" :data-lane="lane.key" :aria-label="lane.title">
        <header class="vp-task-board__head">
          <span class="vp-task-board__dot" :style="{ background: lane.color || undefined }" aria-hidden="true"></span>
          <h3 class="vp-task-board__name">{{ lane.title }}</h3>
          <span class="vp-task-board__count" :class="{ 'vp-task-board__count--over': overLimit(lane) }" :title="lane.limit ? say('limit', '', lane.limit) : undefined">{{ countText(lane) }}</span>
        </header>
        <p v-if="showSums" class="vp-task-board__sum">{{ money(sumOf(lane)) }}</p>
        <ol class="vp-task-board__cards">
          <template v-for="card in lane.cards" :key="card._k">
            <li v-if="placeholderBefore(lane, card)" class="vp-task-board__placeholder" :style="{ height: drag.height + 'px' }" aria-hidden="true"></li>
            <li class="vp-task-board__card" :class="{ 'vp-task-board__card--dragged': isDragged(card) }" :style="cardStyle(card)" :data-k="card._k" @pointerdown="down($event, card)" @keydown="keys($event, card)">
              <div v-if="card.tag || priorityOf(card) !== 'none'" class="vp-task-board__top">
                <span v-if="card.tag" class="vp-task-board__tag" :style="{ '--vp-task-board-hue': hue(card.tag) }">{{ card.tag }}</span>
                <span v-if="priorityOf(card) !== 'none'" class="vp-task-board__priority" :class="'vp-task-board__priority--' + priorityOf(card)">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" /></svg>
                  {{ say(priorityOf(card)) }}
                </span>
              </div>
              <component :is="card.href ? 'a' : 'button'" class="vp-task-board__open" :type="card.href ? undefined : 'button'" :href="card.href || undefined" :aria-describedby="uid + '-help'" @click="open($event, card)">{{ card.title || '…' }}</component>
              <p v-if="card.text" class="vp-task-board__text">{{ card.text }}</p>
              <div v-if="card.due || hasAmount(card) || card.who" class="vp-task-board__foot">
                <span v-if="card.due" class="vp-task-board__due" :class="{ 'vp-task-board__due--late': isLate(card) }">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <time :datetime="isDate(card.due) ? String(card.due).slice(0, 10) : undefined">{{ dueText(card.due) }}</time>
                </span>
                <span v-if="hasAmount(card)" class="vp-task-board__amount">{{ money(card.amount) }}</span>
                <span v-if="card.who" class="vp-task-board__who" :title="card.who" :style="{ '--vp-task-board-hue': hue(card.who) }"><span aria-hidden="true">{{ initials(card.who) }}</span><span class="vp-task-board__sr">{{ card.who }}</span></span>
              </div>
              <div class="vp-task-board__moves">
                <button type="button" class="vp-task-board__move" :disabled="!canStep(card, -1)" :aria-label="say('left')" :title="say('left')" @click="step(card, -1)">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
                </button>
                <button type="button" class="vp-task-board__move" :disabled="!canStep(card, 1)" :aria-label="say('right')" :title="say('right')" @click="step(card, 1)">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                </button>
              </div>
            </li>
          </template>
          <li v-if="placeholderAtEnd(lane)" class="vp-task-board__placeholder" :style="{ height: drag.height + 'px' }" aria-hidden="true"></li>
          <li v-if="isEmpty(lane)" class="vp-task-board__none">{{ say('empty', emptyText) }}</li>
        </ol>
        <form v-if="adds && adding === lane.key" class="vp-task-board__form" @submit.prevent="addCard(lane)">
          <input :ref="'field-' + lane.key" v-model="draft" class="vp-task-board__field" type="text" :aria-label="say('cardTitle')" :placeholder="say('cardTitle')" @keydown.esc.prevent="adding = ''">
          <div class="vp-task-board__actions">
            <button type="submit" class="vp-task-board__save">{{ say('save') }}</button>
            <button type="button" class="vp-task-board__cancel" @click="adding = ''">{{ say('cancel') }}</button>
          </div>
        </form>
        <button v-else-if="adds" type="button" class="vp-task-board__add" @click="startAdding(lane)">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4.5v15m7.5-7.5h-15" /></svg>
          {{ say('add', addText) }}
        </button>
      </section>
    </div>
    <p :id="uid + '-help'" class="vp-task-board__sr">{{ say('help') }}</p>
    <p class="vp-task-board__sr" aria-live="polite">{{ live }}</p>
  </div>
</template>
<script>
// Cards in columns: to do, doing, done, or the steps of a sales pipeline. A card is dragged to another column or
// place (with a mouse or a finger), or moved with the arrows on it or Alt + arrow keys. With a source and the
// path of a card, a move is sent to your backend (PATCH { column }) and an added card too (POST { title, column }).
// In the editor nothing is sent, and an empty board shows samples.
const SAMPLE_COLUMNS = [
  { title: 'To do', key: 'todo', color: '#94a3b8' },
  { title: 'Doing', key: 'doing', color: '#3b82f6', limit: 3 },
  { title: 'Done', key: 'done', color: '#22c55e' }
]
const SAMPLE_CARDS = [
  { id: 's1', title: 'Write the welcome email', text: 'Short, friendly, one link to start.', column: 0, tag: 'Marketing', priority: 'medium', who: 'Emma Hansen' },
  { id: 's2', title: 'New pictures for the shop', column: 0, tag: 'Design', due: '2026-12-01', who: 'Lucas Berg' },
  { id: 's3', title: 'Fix the checkout on phones', text: 'The pay button is under the keyboard.', column: 1, tag: 'Bug', priority: 'high', who: 'Sara Lind' },
  { id: 's4', title: 'Price page in German', column: 1, tag: 'Content', priority: 'low' },
  { id: 's5', title: 'Set up the newsletter', column: 2, tag: 'Marketing', who: 'Emma Hansen' },
  { id: 's6', title: 'Logo in the header', column: 2, tag: 'Design' }
]
const PRIORITIES = ['low', 'medium', 'high']

// The words it says itself, in the site's language. A text filled in in the Props tab is said as it is written.
const WORDS = {
  en: { add: 'Add a card', save: 'Add', cancel: 'Cancel', cardTitle: 'Title of the card', empty: 'Nothing here', left: 'Move left', right: 'Move right', moved: 'Moved “{n}” to {c}', failed: 'Could not save the change.', low: 'Low', medium: 'Medium', high: 'High', limit: 'At most {n}', help: 'Drag a card, or move it with Alt and the arrow keys.' },
  nb: { add: 'Legg til et kort', save: 'Legg til', cancel: 'Avbryt', cardTitle: 'Tittel på kortet', empty: 'Ingenting her', left: 'Flytt til venstre', right: 'Flytt til høyre', moved: 'Flyttet «{n}» til {c}', failed: 'Kunne ikke lagre endringen.', low: 'Lav', medium: 'Middels', high: 'Høy', limit: 'Høyst {n}', help: 'Dra et kort, eller flytt det med Alt og piltastene.' },
  sv: { add: 'Lägg till ett kort', save: 'Lägg till', cancel: 'Avbryt', cardTitle: 'Kortets titel', empty: 'Inget här', left: 'Flytta åt vänster', right: 'Flytta åt höger', moved: 'Flyttade ”{n}” till {c}', failed: 'Kunde inte spara ändringen.', low: 'Låg', medium: 'Medel', high: 'Hög', limit: 'Högst {n}', help: 'Dra ett kort, eller flytta det med Alt och piltangenterna.' },
  da: { add: 'Tilføj et kort', save: 'Tilføj', cancel: 'Annuller', cardTitle: 'Kortets titel', empty: 'Intet her', left: 'Flyt til venstre', right: 'Flyt til højre', moved: 'Flyttede »{n}« til {c}', failed: 'Kunne ikke gemme ændringen.', low: 'Lav', medium: 'Middel', high: 'Høj', limit: 'Højst {n}', help: 'Træk et kort, eller flyt det med Alt og piletasterne.' },
  fi: { add: 'Lisää kortti', save: 'Lisää', cancel: 'Peruuta', cardTitle: 'Kortin otsikko', empty: 'Ei mitään', left: 'Siirrä vasemmalle', right: 'Siirrä oikealle', moved: '”{n}” siirretty: {c}', failed: 'Muutosta ei voitu tallentaa.', low: 'Matala', medium: 'Keskitaso', high: 'Korkea', limit: 'Enintään {n}', help: 'Vedä korttia tai siirrä sitä Alt-näppäimellä ja nuolilla.' },
  de: { add: 'Karte hinzufügen', save: 'Hinzufügen', cancel: 'Abbrechen', cardTitle: 'Titel der Karte', empty: 'Nichts hier', left: 'Nach links', right: 'Nach rechts', moved: '„{n}“ nach {c} verschoben', failed: 'Die Änderung konnte nicht gespeichert werden.', low: 'Niedrig', medium: 'Mittel', high: 'Hoch', limit: 'Höchstens {n}', help: 'Ziehe eine Karte oder verschiebe sie mit Alt und den Pfeiltasten.' },
  fr: { add: 'Ajouter une carte', save: 'Ajouter', cancel: 'Annuler', cardTitle: 'Titre de la carte', empty: 'Rien ici', left: 'Déplacer à gauche', right: 'Déplacer à droite', moved: '« {n} » déplacé vers {c}', failed: 'Impossible d’enregistrer le changement.', low: 'Basse', medium: 'Moyenne', high: 'Haute', limit: 'Au plus {n}', help: 'Faites glisser une carte, ou déplacez-la avec Alt et les flèches.' },
  es: { add: 'Añadir una tarjeta', save: 'Añadir', cancel: 'Cancelar', cardTitle: 'Título de la tarjeta', empty: 'Nada aquí', left: 'Mover a la izquierda', right: 'Mover a la derecha', moved: '«{n}» movida a {c}', failed: 'No se pudo guardar el cambio.', low: 'Baja', medium: 'Media', high: 'Alta', limit: 'Como mucho {n}', help: 'Arrastra una tarjeta o muévela con Alt y las flechas.' },
  it: { add: 'Aggiungi una scheda', save: 'Aggiungi', cancel: 'Annulla', cardTitle: 'Titolo della scheda', empty: 'Niente qui', left: 'Sposta a sinistra', right: 'Sposta a destra', moved: '«{n}» spostata in {c}', failed: 'Impossibile salvare la modifica.', low: 'Bassa', medium: 'Media', high: 'Alta', limit: 'Al massimo {n}', help: 'Trascina una scheda, o spostala con Alt e le frecce.' },
  nl: { add: 'Kaart toevoegen', save: 'Toevoegen', cancel: 'Annuleren', cardTitle: 'Titel van de kaart', empty: 'Niets hier', left: 'Naar links', right: 'Naar rechts', moved: '‘{n}’ verplaatst naar {c}', failed: 'De wijziging kon niet worden opgeslagen.', low: 'Laag', medium: 'Gemiddeld', high: 'Hoog', limit: 'Hoogstens {n}', help: 'Sleep een kaart, of verplaats hem met Alt en de pijltjestoetsen.' },
  pt: { add: 'Adicionar um cartão', save: 'Adicionar', cancel: 'Cancelar', cardTitle: 'Título do cartão', empty: 'Nada aqui', left: 'Mover para a esquerda', right: 'Mover para a direita', moved: '“{n}” movido para {c}', failed: 'Não foi possível guardar a alteração.', low: 'Baixa', medium: 'Média', high: 'Alta', limit: 'No máximo {n}', help: 'Arraste um cartão ou mova-o com Alt e as setas.' },
  pl: { add: 'Dodaj kartę', save: 'Dodaj', cancel: 'Anuluj', cardTitle: 'Tytuł karty', empty: 'Nic tu nie ma', left: 'Przenieś w lewo', right: 'Przenieś w prawo', moved: 'Przeniesiono „{n}” do: {c}', failed: 'Nie udało się zapisać zmiany.', low: 'Niski', medium: 'Średni', high: 'Wysoki', limit: 'Najwyżej {n}', help: 'Przeciągnij kartę albo przenieś ją klawiszem Alt i strzałkami.' },
  zh: { add: '添加卡片', save: '添加', cancel: '取消', cardTitle: '卡片标题', empty: '这里没有内容', left: '向左移动', right: '向右移动', moved: '已将“{n}”移到 {c}', failed: '无法保存更改。', low: '低', medium: '中', high: '高', limit: '最多 {n} 个', help: '拖动卡片，或用 Alt 和方向键移动。' },
  ja: { add: 'カードを追加', save: '追加', cancel: 'キャンセル', cardTitle: 'カードのタイトル', empty: 'ここには何もありません', left: '左へ移動', right: '右へ移動', moved: '「{n}」を{c}へ移動しました', failed: '変更を保存できませんでした。', low: '低', medium: '中', high: '高', limit: '最大 {n}', help: 'カードをドラッグするか、Alt と矢印キーで移動します。' }
}
let made = 0

export default {
  inject: { vpData: { default: null } },
  emits: ['move', 'add', 'open'],
  props: {
    columns: {
      type: Array,
      default: () => [],
      label: 'Columns',
      control: 'list',
      fields: [
        { key: 'title', label: 'Title', placeholder: 'To do' },
        { key: 'key', label: 'What a card says to be in it', placeholder: 'todo' },
        { key: 'color', label: 'Its colour', placeholder: '#3b82f6' },
        { key: 'limit', label: 'At most (0 for no limit)', control: 'number' }
      ]
    },
    cards: {
      type: Array,
      default: () => [],
      label: 'Cards',
      control: 'list',
      fields: [
        { key: 'id', label: 'Its id' },
        { key: 'title', label: 'Title' },
        { key: 'text', label: 'A line about it', control: 'textarea' },
        { key: 'column', label: 'Column (its key)', placeholder: 'todo' },
        { key: 'tag', label: 'Tag', placeholder: 'Design' },
        { key: 'due', label: 'Due (a date or words)', placeholder: '2026-12-01' },
        { key: 'who', label: 'Who (a name: initials are shown)' },
        { key: 'priority', label: 'Priority', control: 'select', options: [{ key: 'None', value: 'none' }, { key: 'Low', value: 'low' }, { key: 'Medium', value: 'medium' }, { key: 'High', value: 'high' }] },
        { key: 'href', label: 'Its page', placeholder: '/tasks/12' },
        { key: 'amount', label: 'Amount (summed under the column)', control: 'number' }
      ]
    },
    currency: { type: String, default: '', label: 'Currency of the amounts', placeholder: 'USD' },
    showSums: { type: Boolean, default: false, label: 'Sum of the amounts under each column title' },
    canAdd: { type: Boolean, default: true, label: 'A way to add a card in each column (with a source and where a new card is sent)' },
    addText: { type: String, default: '', label: 'Text of the add button', placeholder: 'Add a card' },
    source: { type: String, default: '', label: 'Send changes to your backend (a source in Data)', control: 'source' },
    movePath: { type: String, default: '', label: 'Where a moved card is sent (PATCH)', placeholder: '/tasks/{id}' },
    addPath: { type: String, default: '', label: 'Where a new card is sent (POST)', placeholder: '/tasks' },
    emptyText: { type: String, default: '', label: 'Said in an empty column', placeholder: 'Nothing here' },
    minWidth: { type: String, default: '', label: 'Width of a column', control: 'slider', unit: 'px', min: 200, max: 400 }
  },
  data() {
    made += 1
    return { own: [], drag: null, adding: '', draft: '', live: '', uid: 'vp-task-board-' + made }
  },
  created() {
    // cards being added, by their key: what a move of one waits for (not shown, so not reactive)
    this.waits = {}
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
    // Adding is offered only where the new card is kept: sent to the backend, or taken by a parent's @add
    // (otherwise it would be gone at the next visit, with nothing said)
    adds() {
      if (!this.canAdd) return false
      if (this.source && this.addPath) return true
      return typeof this.$?.vnode?.props?.onAdd === 'function' || Array.isArray(this.$?.vnode?.props?.onAdd)
    },
    inStudio() {
      return typeof document !== 'undefined' && (document.getElementById('receiver') ? document.getElementById('receiver').getAttribute('live') !== 'yes' : !!window.studio)
    },
    // The columns as they are shown: the prop's, the samples in the editor, or (with cards and no columns) one
    // for each column the cards name
    lanes() {
      let list = Array.isArray(this.columns) && this.columns.length ? this.columns : []
      if (!list.length && this.inStudio) list = SAMPLE_COLUMNS
      if (!list.length) {
        const keys = [...new Set((Array.isArray(this.cards) ? this.cards : []).map(card => String(card?.column ?? '')).filter(Boolean))]
        list = keys.map(key => ({ title: key, key }))
      }
      return list.map((column, i) => ({
        key: String(column?.key || column?.title || 'c' + (i + 1)),
        title: String(column?.title || column?.key || ''),
        color: column?.color || '',
        limit: Math.max(0, Number(column?.limit) || 0)
      }))
    },
    grouped() {
      return this.lanes.map(lane => ({ ...lane, cards: this.own.filter(card => this.placeOf(card) === lane.key) }))
    },
    style() {
      return { '--vp-task-board-width': this.minWidth || undefined }
    }
  },
  watch: {
    cards: { handler() { this.take() }, deep: true, immediate: true },
    columns: { handler() { if (!(Array.isArray(this.cards) && this.cards.length)) this.take() }, deep: true }
  },
  methods: {
    say(key, own, n) {
      if (own) return own
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return String(words[key] ?? WORDS.en[key]).replace('{n}', n ?? '')
    },
    // Its own copy of the cards: moved and added to here, taken again when the prop changes
    take() {
      const given = Array.isArray(this.cards) && this.cards.length ? this.cards : null
      const keys = this.lanes.map(lane => lane.key)
      const list = given || (this.inStudio && keys.length ? SAMPLE_CARDS.map(card => ({ ...card, column: keys[card.column % keys.length] })) : [])
      made += 1
      this.own = list.map((card, i) => ({ ...(card || {}), _k: 'c' + made + '-' + i }))
    },
    plain(card) {
      const { _k, ...rest } = card
      return rest
    },
    placeOf(card) {
      const key = String(card?.column ?? '')
      return this.lanes.some(lane => lane.key === key) ? key : this.lanes[0]?.key
    },
    laneOf(key) {
      return this.lanes.find(lane => lane.key === key)
    },
    cardsIn(key, without) {
      return this.own.filter(card => card !== without && this.placeOf(card) === key)
    },
    countText(lane) {
      return lane.limit ? lane.cards.length + ' / ' + lane.limit : String(lane.cards.length)
    },
    overLimit(lane) {
      return lane.limit > 0 && lane.cards.length > lane.limit
    },
    sumOf(lane) {
      return lane.cards.reduce((sum, card) => sum + (Number(card.amount) || 0), 0)
    },
    hasAmount(card) {
      return card.amount !== undefined && card.amount !== null && card.amount !== '' && Number.isFinite(Number(card.amount))
    },
    money(amount) {
      const code = this.currency
      if (this.vpData?.money) return this.vpData.money(amount, code, this.lang)
      const value = Number(amount) || 0
      try {
        return code ? value.toLocaleString(this.locale, { style: 'currency', currency: code, maximumFractionDigits: value % 1 ? 2 : 0 }) : value.toLocaleString(this.locale)
      } catch (e) { return value.toFixed(2) + (code ? ' ' + code : '') }
    },
    priorityOf(card) {
      return PRIORITIES.includes(card?.priority) ? card.priority : 'none'
    },
    hue(text) {
      let sum = 0
      for (const char of String(text || '')) sum = (sum * 31 + char.charCodeAt(0)) % 360
      return sum
    },
    initials(name) {
      const words = String(name || '').trim().split(/\\s+/).filter(Boolean)
      if (!words.length) return ''
      return (words[0].charAt(0) + (words.length > 1 ? words[words.length - 1].charAt(0) : '')).toUpperCase()
    },
    isDate(value) {
      return /^\\d{4}-\\d{2}-\\d{2}/.test(String(value || '').trim()) && Number.isFinite(Date.parse(String(value).trim().slice(0, 10)))
    },
    dueText(value) {
      if (!this.isDate(value)) return String(value)
      const [y, m, d] = String(value).trim().slice(0, 10).split('-').map(Number)
      const date = new Date(y, m - 1, d)
      try {
        return new Intl.DateTimeFormat(this.locale, { month: 'short', day: 'numeric', ...(y === new Date().getFullYear() ? {} : { year: 'numeric' }) }).format(date)
      } catch (e) { return String(value).slice(0, 10) }
    },
    // Past its day, and not in the last column (that is where done things go)
    isLate(card) {
      if (!this.isDate(card.due)) return false
      if (this.placeOf(card) === this.lanes[this.lanes.length - 1]?.key && this.lanes.length > 1) return false
      const [y, m, d] = String(card.due).trim().slice(0, 10).split('-').map(Number)
      const today = new Date()
      return new Date(y, m - 1, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate())
    },
    isEmpty(lane) {
      return !lane.cards.filter(card => !this.isDragged(card)).length && !this.isTarget(lane)
    },
    fill(path, card) {
      return String(path).replace(/\\{(\\w+)\\}/g, (all, key) => encodeURIComponent(card[key] ?? ''))
    },
    sends(path) {
      return !!(this.source && path && !this.inStudio && this.vpData?.send)
    },
    // Whether every {name} of a path has a value on the card (a new card has no id until the backend gives one)
    filled(path, card) {
      return [...String(path).matchAll(/\\{(\\w+)\\}/g)].every(([, key]) => card[key] !== undefined && card[key] !== null && card[key] !== '')
    },

    // Moving: to a column, at a place among its cards (counted without the card itself)
    async moveCard(card, to, index) {
      const from = this.placeOf(card)
      const was = this.cardsIn(from).indexOf(card)
      const target = this.cardsIn(to, card)
      const at = Math.max(0, Math.min(Number(index) || 0, target.length))
      if (from === to && at === was) return false
      const kept = this.own.slice()
      const column = card.column
      const rest = this.own.filter(one => one !== card)
      card.column = to
      const place = at < target.length ? rest.indexOf(target[at]) : target.length ? rest.indexOf(target[target.length - 1]) + 1 : rest.length
      rest.splice(place, 0, card)
      this.own = rest
      this.live = this.say('moved', '', card.title || '…').replace('{c}', this.laneOf(to)?.title || to)
      this.$emit('move', { card: this.plain(card), from, to, index: at })
      if (from !== to && this.sends(this.movePath)) {
        // a card still being added waits for its id; one that never got one is only moved here
        if (this.waits[card._k]) await this.waits[card._k]
        const now = this.own.find(one => one._k === card._k) || card
        if (!this.filled(this.movePath, now)) return true
        card = now
        let answer = null
        try { answer = await this.vpData.send(this.source, this.fill(this.movePath, card), { column: to }, { method: 'PATCH' }) } catch (e) {}
        if (!answer?.ok) {
          card.column = column
          // (the card as it is now: it may have been given its id while it was moved)
          this.own = kept.map(one => one._k === card._k ? card : one)
          this.live = this.say('failed')
        }
      }
      return true
    },
    canStep(card, by) {
      const i = this.lanes.findIndex(lane => lane.key === this.placeOf(card)) + by
      return i >= 0 && i < this.lanes.length
    },
    step(card, by) {
      if (!this.canStep(card, by)) return
      const from = this.placeOf(card)
      const to = this.lanes[this.lanes.findIndex(lane => lane.key === from) + by].key
      this.moveCard(card, to, this.cardsIn(from).indexOf(card))
      this.focusCard(card)
    },
    keys(event, card) {
      if (!event.altKey || event.target?.closest?.('.vp-task-board__moves')) return
      const from = this.placeOf(card)
      const i = this.cardsIn(from).indexOf(card)
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault()
        this.step(card, event.key === 'ArrowLeft' ? -1 : 1)
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault()
        const to = event.key === 'ArrowUp' ? i - 1 : i + 1
        if (to < 0) return
        this.moveCard(card, from, to)
        this.focusCard(card)
      }
    },
    focusCard(card) {
      this.$nextTick(() => this.$el?.querySelector?.('[data-k="' + card._k + '"] .vp-task-board__open')?.focus())
    },
    open(event, card) {
      if (this.dropped) { event.preventDefault(); return }
      this.$emit('open', this.plain(card))
      if (!card.href) return
      if (this.inStudio) { event.preventDefault(); return }
      if (event.ctrlKey || event.metaKey || event.shiftKey) return
      if (this.$router && String(card.href).startsWith('/') && !String(card.href).startsWith('//')) { event.preventDefault(); this.$router.push(card.href) }
    },

    // Adding
    startAdding(lane) {
      this.adding = lane.key
      this.draft = ''
      this.$nextTick(() => {
        const field = this.$refs['field-' + lane.key]
        ;(Array.isArray(field) ? field[0] : field)?.focus?.()
      })
    },
    async addCard(lane) {
      const title = this.draft.trim()
      if (!title) return
      made += 1
      const card = { id: '', title, column: lane.key, _k: 'n' + made }
      this.own = [...this.own, card]
      this.draft = ''
      this.$emit('add', { title, column: lane.key })
      if (this.sends(this.addPath)) {
        let answer = null
        let done
        this.waits[card._k] = new Promise(resolve => { done = resolve })
        try { answer = await this.vpData.send(this.source, this.fill(this.addPath, card), { title, column: lane.key }, { method: 'POST' }) } catch (e) {}
        delete this.waits[card._k]
        done()
        if (answer?.ok) {
          const data = answer.data || {}
          const id = [data, data.data, data.item, data.task, data.card, data.record, data.result].map(one => one && typeof one === 'object' ? one.id ?? one._id : undefined).find(one => one !== undefined && one !== null)
          if (id !== undefined && id !== null) {
            const index = this.own.findIndex(one => one._k === card._k)
            if (index >= 0) this.own.splice(index, 1, { ...this.own[index], id })
          }
        } else {
          this.own = this.own.filter(one => one._k !== card._k)
          this.live = this.say('failed')
        }
      }
    },

    // Dragging with the pointer (mouse, pen or finger): a press that moves (or a finger held still a moment)
    // lifts the card; where it would land is held open; let go to drop it there
    isDragged(card) {
      return !!(this.drag && this.drag.on && this.drag.k === card._k)
    },
    isTarget(lane) {
      return !!(this.drag && this.drag.on && this.drag.over === lane.key)
    },
    placeholderBefore(lane, card) {
      if (!this.isTarget(lane) || this.isDragged(card)) return false
      return lane.cards.filter(one => !this.isDragged(one)).indexOf(card) === this.drag.index
    },
    placeholderAtEnd(lane) {
      return this.isTarget(lane) && this.drag.index >= lane.cards.filter(one => !this.isDragged(one)).length
    },
    cardStyle(card) {
      if (!this.isDragged(card)) return undefined
      return { left: this.drag.left + 'px', top: this.drag.top + 'px', width: this.drag.width + 'px' }
    },
    down(event, card) {
      if (event.button !== undefined && event.button !== 0) return
      if (event.target?.closest?.('.vp-task-board__moves, .vp-task-board__form')) return
      this.stopListening()
      const element = event.currentTarget
      this.drag = { k: card._k, card, on: false, x: event.clientX, y: event.clientY, touch: event.pointerType === 'touch', element, over: '', index: 0, left: 0, top: 0, width: 0, height: 0, grabX: 0, grabY: 0 }
      this.listen()
      if (this.drag.touch) this.hold = setTimeout(() => this.lift(this.drag.x, this.drag.y), 220)
    },
    listen() {
      this.onMove = event => this.moved(event)
      this.onUp = event => this.up(event)
      this.onCancel = () => this.cancel()
      this.onTouch = event => { if (this.drag?.on) event.preventDefault() }
      window.addEventListener('pointermove', this.onMove)
      window.addEventListener('pointerup', this.onUp)
      window.addEventListener('pointercancel', this.onCancel)
      window.addEventListener('touchmove', this.onTouch, { passive: false })
    },
    stopListening() {
      clearTimeout(this.hold)
      if (typeof window === 'undefined' || !this.onMove) return
      window.removeEventListener('pointermove', this.onMove)
      window.removeEventListener('pointerup', this.onUp)
      window.removeEventListener('pointercancel', this.onCancel)
      window.removeEventListener('touchmove', this.onTouch)
      this.onMove = null
    },
    scale() {
      const box = this.$el.getBoundingClientRect()
      const width = this.$el.offsetWidth
      return { box, by: width && box.width ? box.width / width : 1 }
    },
    lift(x, y) {
      const drag = this.drag
      if (!drag || drag.on) return
      const rect = drag.element.getBoundingClientRect()
      const { box, by } = this.scale()
      drag.width = (rect.width || 260) / by
      drag.height = (rect.height || 72) / by
      drag.grabX = (x - rect.left) / by
      drag.grabY = (y - rect.top) / by
      drag.over = this.placeOf(drag.card)
      drag.index = this.cardsIn(drag.over).indexOf(drag.card)
      drag.left = (x - box.left) / by - drag.grabX
      drag.top = (y - box.top) / by - drag.grabY
      drag.on = true
    },
    moved(event) {
      const drag = this.drag
      if (!drag) return
      if (!drag.on) {
        const far = Math.hypot(event.clientX - drag.x, event.clientY - drag.y)
        if (drag.touch) { if (far > 8) this.cancel(); return }
        if (far < 5) return
        this.lift(drag.x, drag.y)
      }
      event.preventDefault?.()
      const { box, by } = this.scale()
      drag.left = (event.clientX - box.left) / by - drag.grabX
      drag.top = (event.clientY - box.top) / by - drag.grabY
      this.aim(event.clientX, event.clientY)
      this.edgeScroll(event.clientX)
    },
    // The column under the pointer (or the nearest), and the place among its cards
    aim(x, y) {
      const drag = this.drag
      let best = null, distance = Infinity
      for (const column of this.$el.querySelectorAll('[data-lane]')) {
        const rect = column.getBoundingClientRect()
        const away = x < rect.left ? rect.left - x : x > rect.right ? x - rect.right : 0
        if (away < distance) { distance = away; best = column }
      }
      if (!best) return
      const key = best.getAttribute('data-lane')
      let index = 0
      for (const element of best.querySelectorAll('[data-k]')) {
        if (element.getAttribute('data-k') === drag.k) continue
        const rect = element.getBoundingClientRect()
        if (y > rect.top + rect.height / 2) index += 1
      }
      drag.over = key
      drag.index = index
    },
    edgeScroll(x) {
      const scroller = this.$refs.scroller
      if (!scroller) return
      const rect = scroller.getBoundingClientRect()
      if (!rect.width) return
      if (x < rect.left + 48) scroller.scrollLeft -= 16
      else if (x > rect.right - 48) scroller.scrollLeft += 16
    },
    up() {
      const drag = this.drag
      this.stopListening()
      this.drag = null
      if (!drag?.on) return
      // the click that follows a drop is not an open
      this.dropped = true
      setTimeout(() => { this.dropped = false }, 0)
      this.moveCard(drag.card, drag.over, drag.index)
    },
    cancel() {
      this.stopListening()
      this.drag = null
    }
  },
  beforeUnmount() {
    this.stopListening()
  }
}
<\/script>
<style>
.vp-task-board {
  --_width: var(--vp-task-board-width, 280px);
  --_radius: var(--vp-radius, 12px);
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  color: var(--vp-text, inherit);
}
.vp-task-board--dragging { cursor: grabbing; user-select: none; -webkit-user-select: none; }
.vp-task-board__empty { margin: 0; padding: 2rem 1rem; border: 1px dashed var(--vp-border, #e5e7eb); border-radius: var(--_radius); color: var(--vp-muted, #6b7280); text-align: center; }
.vp-task-board__scroller {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  overflow-x: auto;
  padding: 0.25rem 0.25rem 0.75rem;
  scroll-padding-inline: 0.25rem;
  overscroll-behavior-x: contain;
}
.vp-task-board__column {
  box-sizing: border-box;
  display: flex;
  flex: 0 0 var(--_width);
  flex-direction: column;
  gap: 0.6rem;
  min-width: 0;
  padding: 0.75rem;
  border: 1px solid transparent;
  border-radius: calc(var(--_radius) + 2px);
  background: color-mix(in srgb, var(--vp-text, #111827) 4%, var(--vp-background, #fff));
  transition: border-color 150ms ease, background 150ms ease;
}
.vp-task-board__column--target { border-color: color-mix(in srgb, var(--vp-primary, #2563eb) 35%, transparent); background: color-mix(in srgb, var(--vp-primary, #2563eb) 6%, var(--vp-background, #fff)); }
.vp-task-board__head { display: flex; gap: 0.5rem; align-items: center; min-width: 0; padding: 0 0.15rem; }
.vp-task-board__dot { flex: none; width: 0.6rem; height: 0.6rem; border-radius: 50%; background: var(--vp-primary, #2563eb); }
.vp-task-board__name { flex: 1; min-width: 0; margin: 0; overflow: hidden; font-family: var(--vp-font-heading, inherit); font-size: 0.9rem; font-weight: 650; line-height: 1.3; text-overflow: ellipsis; white-space: nowrap; }
.vp-task-board__count {
  flex: none;
  min-width: 1.5rem;
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--vp-text, #111827) 8%, transparent);
  color: var(--vp-muted, #6b7280);
  font-size: 0.75rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  text-align: center;
}
.vp-task-board__count--over { background: color-mix(in srgb, #dc2626 14%, transparent); color: #dc2626; }
.vp-task-board__sum { margin: -0.3rem 0 0; padding: 0 0.15rem 0 1.25rem; color: var(--vp-muted, #6b7280); font-size: 0.8rem; font-weight: 600; font-variant-numeric: tabular-nums; }
.vp-task-board__cards { display: flex; flex-direction: column; gap: 0.5rem; min-height: 2.5rem; margin: 0; padding: 0; list-style: none; }
.vp-task-board__none { padding: 0.9rem 0.5rem; border: 1px dashed var(--vp-border, #e5e7eb); border-radius: var(--_radius); color: var(--vp-muted, #6b7280); font-size: 0.825rem; text-align: center; }
.vp-task-board__placeholder { box-sizing: border-box; border: 2px dashed color-mix(in srgb, var(--vp-primary, #2563eb) 45%, transparent); border-radius: var(--_radius); background: color-mix(in srgb, var(--vp-primary, #2563eb) 6%, transparent); }
.vp-task-board__card {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 0.75rem 0.8rem;
  border: 1px solid var(--vp-border, #e5e7eb);
  border-radius: var(--_radius);
  background: var(--vp-surface, #fff);
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
  cursor: grab;
  touch-action: manipulation;
  transition: box-shadow 150ms ease, border-color 150ms ease;
}
.vp-task-board__card:hover { border-color: color-mix(in srgb, var(--vp-text, #111827) 18%, var(--vp-border, #e5e7eb)); box-shadow: 0 4px 12px rgba(16, 24, 40, 0.08); }
.vp-task-board__card:focus-within { border-color: var(--vp-primary, #2563eb); }
.vp-task-board__card--dragged {
  position: absolute;
  z-index: 20;
  margin: 0;
  pointer-events: none;
  cursor: grabbing;
  transform: rotate(2deg);
  box-shadow: 0 18px 40px rgba(16, 24, 40, 0.18);
}
.vp-task-board__top { display: flex; flex-wrap: wrap; gap: 0.35rem; align-items: center; }
.vp-task-board__tag {
  max-width: 100%;
  padding: 0.12rem 0.5rem;
  overflow: hidden;
  border-radius: 999px;
  background: hsl(var(--vp-task-board-hue, 220) 70% 93%);
  color: hsl(var(--vp-task-board-hue, 220) 55% 32%);
  font-size: 0.7rem;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.vp-task-board__priority { display: inline-flex; gap: 0.2rem; align-items: center; font-size: 0.7rem; font-weight: 600; }
.vp-task-board__priority svg { width: 0.85rem; height: 0.85rem; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.vp-task-board__priority--low { color: var(--vp-muted, #6b7280); }
.vp-task-board__priority--medium { color: #d97706; }
.vp-task-board__priority--high { color: #dc2626; }
.vp-task-board__open {
  display: block;
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.4;
  text-align: start;
  text-decoration: none;
  overflow-wrap: anywhere;
  cursor: inherit;
}
.vp-task-board__open::after { content: ''; position: absolute; inset: 0; border-radius: inherit; }
.vp-task-board__open:focus-visible { outline: none; }
.vp-task-board__card:has(.vp-task-board__open:focus-visible) { outline: 2px solid var(--vp-primary, #2563eb); outline-offset: 2px; }
.vp-task-board__open[href]:hover { text-decoration: underline; text-underline-offset: 3px; }
.vp-task-board__text { display: -webkit-box; margin: 0; overflow: hidden; color: var(--vp-muted, #6b7280); font-size: 0.825rem; line-height: 1.45; -webkit-line-clamp: 3; -webkit-box-orient: vertical; }
.vp-task-board__foot { display: flex; flex-wrap: wrap; gap: 0.4rem 0.75rem; align-items: center; margin-top: 0.1rem; color: var(--vp-muted, #6b7280); font-size: 0.75rem; }
.vp-task-board__due { display: inline-flex; gap: 0.25rem; align-items: center; font-variant-numeric: tabular-nums; }
.vp-task-board__due svg { width: 0.85rem; height: 0.85rem; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.vp-task-board__due--late { color: #dc2626; font-weight: 600; }
.vp-task-board__amount { color: var(--vp-text, inherit); font-weight: 650; font-variant-numeric: tabular-nums; }
.vp-task-board__who {
  display: inline-grid;
  place-items: center;
  width: 1.6rem;
  height: 1.6rem;
  margin-left: auto;
  border-radius: 50%;
  background: hsl(var(--vp-task-board-hue, 220) 60% 88%);
  color: hsl(var(--vp-task-board-hue, 220) 45% 30%);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}
.vp-task-board__moves { position: absolute; z-index: 1; top: 0.4rem; right: 0.4rem; display: flex; gap: 0.15rem; opacity: 0; transition: opacity 120ms ease; }
.vp-task-board__card:hover .vp-task-board__moves, .vp-task-board__card:focus-within .vp-task-board__moves { opacity: 1; }
.vp-task-board__move {
  display: grid;
  place-items: center;
  width: 1.6rem;
  height: 1.6rem;
  padding: 0;
  border: 1px solid var(--vp-border, #e5e7eb);
  border-radius: 6px;
  background: var(--vp-surface, #fff);
  color: inherit;
  cursor: pointer;
}
.vp-task-board__move:hover:not(:disabled) { background: color-mix(in srgb, var(--vp-text, #111827) 6%, var(--vp-surface, #fff)); }
.vp-task-board__move:disabled { opacity: 0.35; cursor: default; }
.vp-task-board__move:focus-visible { outline: 2px solid var(--vp-primary, #2563eb); outline-offset: 1px; }
.vp-task-board__move svg { width: 0.9rem; height: 0.9rem; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.vp-task-board__add {
  display: flex;
  gap: 0.35rem;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0.6rem;
  border: 0;
  border-radius: var(--_radius);
  background: transparent;
  color: var(--vp-muted, #6b7280);
  font: inherit;
  font-size: 0.85rem;
  font-weight: 550;
  text-align: start;
  cursor: pointer;
}
.vp-task-board__add:hover { background: color-mix(in srgb, var(--vp-text, #111827) 6%, transparent); color: var(--vp-text, inherit); }
.vp-task-board__add:focus-visible, .vp-task-board__save:focus-visible, .vp-task-board__cancel:focus-visible { outline: 2px solid var(--vp-primary, #2563eb); outline-offset: 2px; }
.vp-task-board__add svg { width: 1rem; height: 1rem; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }
.vp-task-board__form { display: flex; flex-direction: column; gap: 0.5rem; }
.vp-task-board__field {
  box-sizing: border-box;
  width: 100%;
  padding: 0.6rem 0.7rem;
  border: 1px solid var(--vp-border, #e5e7eb);
  border-radius: var(--_radius);
  background: var(--vp-surface, #fff);
  color: inherit;
  font: inherit;
  font-size: 0.9rem;
}
.vp-task-board__field:focus { outline: 2px solid color-mix(in srgb, var(--vp-primary, #2563eb) 50%, transparent); border-color: var(--vp-primary, #2563eb); }
.vp-task-board__actions { display: flex; gap: 0.4rem; }
.vp-task-board__save, .vp-task-board__cancel { padding: 0.45rem 0.85rem; border: 1px solid transparent; border-radius: calc(var(--_radius) * 0.75); font: inherit; font-size: 0.85rem; font-weight: 600; cursor: pointer; }
.vp-task-board__save { background: var(--vp-primary, #2563eb); color: var(--vp-primary-contrast, #fff); }
.vp-task-board__save:hover { filter: brightness(1.08); }
.vp-task-board__cancel { border-color: var(--vp-border, #e5e7eb); background: transparent; color: inherit; }
.vp-task-board__sr { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }
@media (hover: none) { .vp-task-board__moves { opacity: 1; } .vp-task-board__card { padding-right: 3.75rem; } }
@media (max-width: 600px) {
  .vp-task-board__scroller { scroll-snap-type: x mandatory; gap: 0.75rem; }
  .vp-task-board__column { flex-basis: min(var(--_width), 84vw); scroll-snap-align: start; }
}
@media (prefers-reduced-motion: reduce) {
  .vp-task-board__column, .vp-task-board__card, .vp-task-board__moves { transition: none; }
  .vp-task-board__card--dragged { transform: none; }
}
</style>
`;export{e as default};