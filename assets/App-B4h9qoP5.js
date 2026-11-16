var e=`<template>
  <div class="vp-data-table" :class="classes">
    <div v-if="showTitle || search || filterValues.length || exportCsv" class="vp-data-table__top">
      <h3 v-if="showTitle" class="vp-data-table__title">{{ say('title', title) }}</h3>
      <div class="vp-data-table__tools">
        <label v-if="search" class="vp-data-table__search">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></svg>
          <span class="vp-data-table__sr">{{ say('search', searchText) }}</span>
          <input v-model="query" type="search" :placeholder="say('search', searchText)" autocomplete="off" @input="page = 1">
        </label>
        <div v-if="filterValues.length" class="vp-data-table__filters" role="group" :aria-label="say('filter')">
          <button type="button" class="vp-data-table__filter" :aria-pressed="filterValue === '' ? 'true' : 'false'" @click="pick('')">{{ say('all') }}</button>
          <button v-for="one in filterValues" :key="one" type="button" class="vp-data-table__filter" :aria-pressed="filterValue === one ? 'true' : 'false'" @click="pick(one)">{{ one }}</button>
        </div>
        <button v-if="exportCsv" type="button" class="vp-data-table__csv" @click="download">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19.5h14" /></svg>
          {{ say('csv') }}
        </button>
      </div>
    </div>
    <div v-if="selectable && chosenRows.length" class="vp-data-table__bar">
      <span class="vp-data-table__count">{{ say('chosen', '', chosenRows.length) }}</span>
      <button v-if="source && deletePath" type="button" class="vp-data-table__delete" :disabled="busy" @click="remove">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 12.5h9l1-12.5M10 11v5M14 11v5" /></svg>
        {{ say('delete') }}
      </button>
      <button type="button" class="vp-data-table__clear" @click="clear">{{ say('clear') }}</button>
    </div>
    <p v-if="problem" class="vp-data-table__problem" role="alert">{{ problem }}</p>
    <div class="vp-data-table__scroll">
      <table class="vp-data-table__table">
        <caption v-if="showTitle" class="vp-data-table__sr">{{ say('title', title) }}</caption>
        <thead>
          <tr>
            <th v-if="selectable" scope="col" class="vp-data-table__check">
              <input type="checkbox" :checked="allOnPage" :indeterminate.prop="someOnPage" :disabled="!pageRows.length" :aria-label="say('chooseAll')" @change="choosePage">
            </th>
            <th v-for="(col, c) in cols" :key="c" scope="col" :aria-sort="ariaSort(c)" :class="cellClass(col, c)">
              <button v-if="col.sort" type="button" class="vp-data-table__sort" :class="{ 'vp-data-table__sort--on': sortAt === c }" @click="sortBy(c)">
                <span>{{ col.label }}</span>
                <svg viewBox="0 0 16 16" aria-hidden="true"><path class="vp-data-table__up" d="M5 6.5 8 3.5l3 3" /><path class="vp-data-table__down" d="M5 9.5l3 3 3-3" /></svg>
              </button>
              <span v-else>{{ col.label }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!pageRows.length" class="vp-data-table__nothing">
            <td :colspan="cols.length + (selectable ? 1 : 0)">{{ entries.length ? say('none') : say('empty', emptyText) }}</td>
          </tr>
          <tr v-for="entry in pageRows" :key="entry.key" class="vp-data-table__row" :class="{ 'vp-data-table__row--chosen': isChosen(entry), 'vp-data-table__row--link': !!linkOf(entry.row) }" @click="open(entry.row, $event)">
            <td v-if="selectable" class="vp-data-table__check">
              <input type="checkbox" :checked="isChosen(entry)" :aria-label="say('chooseRow') + ': ' + text(entry.row, cols[0])" @change="toggle(entry)">
            </td>
            <td v-for="(col, c) in cols" :key="c" :data-label="col.label" :class="cellClass(col, c)">
              <span v-if="col.type === 'person'" class="vp-data-table__person">
                <img v-if="entry.row.image" class="vp-data-table__avatar" :src="address(entry.row.image) || undefined" :style="held(entry.row.image)" alt="" loading="lazy" decoding="async">
                <span v-else class="vp-data-table__avatar vp-data-table__avatar--letters" :style="{ '--vp-data-table-hue': hue(text(entry.row, col)) }" aria-hidden="true">{{ initials(text(entry.row, col)) }}</span>
                <a v-if="linkCell === c && linkOf(entry.row)" :href="linkOf(entry.row)" @click="go($event, linkOf(entry.row))">{{ text(entry.row, col) }}</a>
                <span v-else>{{ text(entry.row, col) }}</span>
              </span>
              <span v-else-if="col.type === 'badge'" class="vp-data-table__badge" :class="'vp-data-table__badge--' + badgeTone(text(entry.row, col)).tone" :style="badgeTone(text(entry.row, col)).style">{{ text(entry.row, col) }}</span>
              <span v-else-if="col.type === 'progress'" class="vp-data-table__progress">
                <span class="vp-data-table__track" aria-hidden="true"><span :style="{ width: percent(entry.row, col) + '%' }"></span></span>
                <span class="vp-data-table__percent">{{ percent(entry.row, col) }}%</span>
              </span>
              <span v-else-if="col.type === 'yesno'" class="vp-data-table__yesno" :class="{ 'vp-data-table__yesno--yes': isYes(value(entry.row, col)) }">
                <span aria-hidden="true">{{ isYes(value(entry.row, col)) ? '✓' : '–' }}</span>
                <span class="vp-data-table__sr">{{ isYes(value(entry.row, col)) ? say('yes') : say('no') }}</span>
              </span>
              <a v-else-if="(col.type === 'link' || linkCell === c) && linkOf(entry.row)" class="vp-data-table__link" :href="linkOf(entry.row)" @click="go($event, linkOf(entry.row))">{{ text(entry.row, col) }}</a>
              <span v-else>{{ text(entry.row, col) }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="Number(pageSize) > 0 && total > 0" class="vp-data-table__foot">
      <span class="vp-data-table__range" aria-live="polite">{{ rangeText() }}</span>
      <div v-if="hasPrevious || hasNext" class="vp-data-table__pages">
        <button type="button" class="vp-data-table__prev" :disabled="!hasPrevious" @click="page = page - 1">
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3.5 5.5 8l4.5 4.5" /></svg>
          {{ say('previous') }}
        </button>
        <button type="button" class="vp-data-table__next" :disabled="!hasNext" @click="page = page + 1">
          {{ say('next') }}
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3.5 10.5 8 6 12.5" /></svg>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
// Rows of anything under columns that say how to show each value: a name with its picture, a status as a coloured
// word, money, dates, a bar of progress, yes or no. Fill the rows by hand, or bind them to a source with the plug.
// It sorts, searches, filters by the values of one column, shows them a page at a time, lets you choose rows (and
// delete them through your backend), downloads what it shows as CSV, and turns each row into a card on a phone.
// In the editor an empty list shows samples.
const SAMPLES = [
  { id: 's1', c1: 'Ada Lovelace', c2: 'Paid', c3: 1290, c4: '2026-11-12' },
  { id: 's2', c1: 'Alan Turing', c2: 'Pending', c3: 480, c4: '2026-11-11' },
  { id: 's3', c1: 'Grace Hopper', c2: 'Paid', c3: 2150.5, c4: '2026-11-09' },
  { id: 's4', c1: 'Linus Torvalds', c2: 'Refunded', c3: 99, c4: '2026-11-07' },
  { id: 's5', c1: 'Margaret Hamilton', c2: 'Paid', c3: 760, c4: '2026-11-04' },
  { id: 's6', c1: 'Tim Berners-Lee', c2: 'Failed', c3: 320, c4: '2026-11-02' }
]

// The words it says itself, in the site's language (App.vue's head says it: \`htmlAttrs: { lang }\`). A text
// that is filled in in the Props tab is said as it is written.
const WORDS = {
  en: { title: 'Table', search: 'Search…', empty: 'Nothing here yet.', none: 'No rows match.', all: 'All', filter: 'Filter', previous: 'Previous', next: 'Next', range: '{a}–{b} of {n}', chosen: '{n} chosen', delete: 'Delete', clear: 'Clear', confirm: 'Delete {n}? This cannot be undone.', failed: 'Could not delete {n}.', csv: 'Export CSV', chooseAll: 'Choose every row on this page', chooseRow: 'Choose', yes: 'Yes', no: 'No' },
  nb: { title: 'Tabell', search: 'Søk…', empty: 'Ingenting her ennå.', none: 'Ingen rader passer.', all: 'Alle', filter: 'Filter', previous: 'Forrige', next: 'Neste', range: '{a}–{b} av {n}', chosen: '{n} valgt', delete: 'Slett', clear: 'Fjern valg', confirm: 'Slette {n}? Dette kan ikke angres.', failed: 'Kunne ikke slette {n}.', csv: 'Eksporter CSV', chooseAll: 'Velg alle radene på siden', chooseRow: 'Velg', yes: 'Ja', no: 'Nei' },
  sv: { title: 'Tabell', search: 'Sök…', empty: 'Inget här än.', none: 'Inga rader matchar.', all: 'Alla', filter: 'Filter', previous: 'Föregående', next: 'Nästa', range: '{a}–{b} av {n}', chosen: '{n} valda', delete: 'Ta bort', clear: 'Rensa', confirm: 'Ta bort {n}? Det går inte att ångra.', failed: 'Kunde inte ta bort {n}.', csv: 'Exportera CSV', chooseAll: 'Välj alla rader på sidan', chooseRow: 'Välj', yes: 'Ja', no: 'Nej' },
  da: { title: 'Tabel', search: 'Søg…', empty: 'Intet her endnu.', none: 'Ingen rækker passer.', all: 'Alle', filter: 'Filter', previous: 'Forrige', next: 'Næste', range: '{a}–{b} af {n}', chosen: '{n} valgt', delete: 'Slet', clear: 'Ryd', confirm: 'Slet {n}? Det kan ikke fortrydes.', failed: 'Kunne ikke slette {n}.', csv: 'Eksportér CSV', chooseAll: 'Vælg alle rækker på siden', chooseRow: 'Vælg', yes: 'Ja', no: 'Nej' },
  fi: { title: 'Taulukko', search: 'Hae…', empty: 'Täällä ei ole vielä mitään.', none: 'Yksikään rivi ei täsmää.', all: 'Kaikki', filter: 'Suodata', previous: 'Edellinen', next: 'Seuraava', range: '{a}–{b} / {n}', chosen: '{n} valittu', delete: 'Poista', clear: 'Tyhjennä', confirm: 'Poistetaanko {n}? Tätä ei voi perua.', failed: '{n} jäi poistamatta.', csv: 'Vie CSV', chooseAll: 'Valitse kaikki sivun rivit', chooseRow: 'Valitse', yes: 'Kyllä', no: 'Ei' },
  de: { title: 'Tabelle', search: 'Suchen…', empty: 'Hier ist noch nichts.', none: 'Keine passenden Zeilen.', all: 'Alle', filter: 'Filter', previous: 'Zurück', next: 'Weiter', range: '{a}–{b} von {n}', chosen: '{n} ausgewählt', delete: 'Löschen', clear: 'Aufheben', confirm: '{n} löschen? Das lässt sich nicht rückgängig machen.', failed: 'Nicht gelöscht: {n}.', csv: 'CSV exportieren', chooseAll: 'Alle Zeilen dieser Seite auswählen', chooseRow: 'Auswählen', yes: 'Ja', no: 'Nein' },
  fr: { title: 'Tableau', search: 'Rechercher…', empty: 'Rien pour l’instant.', none: 'Aucune ligne ne correspond.', all: 'Tout', filter: 'Filtrer', previous: 'Précédent', next: 'Suivant', range: '{a}–{b} sur {n}', chosen: '{n} sélectionné(s)', delete: 'Supprimer', clear: 'Désélectionner', confirm: 'Supprimer {n} ? C’est définitif.', failed: 'Non supprimé(s) : {n}.', csv: 'Exporter en CSV', chooseAll: 'Choisir toutes les lignes de la page', chooseRow: 'Choisir', yes: 'Oui', no: 'Non' },
  es: { title: 'Tabla', search: 'Buscar…', empty: 'Aún no hay nada.', none: 'Ninguna fila coincide.', all: 'Todo', filter: 'Filtrar', previous: 'Anterior', next: 'Siguiente', range: '{a}–{b} de {n}', chosen: '{n} elegidos', delete: 'Eliminar', clear: 'Quitar selección', confirm: '¿Eliminar {n}? No se puede deshacer.', failed: 'No se pudieron eliminar: {n}.', csv: 'Exportar CSV', chooseAll: 'Elegir todas las filas de la página', chooseRow: 'Elegir', yes: 'Sí', no: 'No' },
  it: { title: 'Tabella', search: 'Cerca…', empty: 'Ancora niente qui.', none: 'Nessuna riga corrisponde.', all: 'Tutti', filter: 'Filtra', previous: 'Precedente', next: 'Successiva', range: '{a}–{b} di {n}', chosen: '{n} selezionati', delete: 'Elimina', clear: 'Deseleziona', confirm: 'Eliminare {n}? Non si può annullare.', failed: 'Non eliminati: {n}.', csv: 'Esporta CSV', chooseAll: 'Seleziona tutte le righe della pagina', chooseRow: 'Seleziona', yes: 'Sì', no: 'No' },
  nl: { title: 'Tabel', search: 'Zoeken…', empty: 'Hier staat nog niets.', none: 'Geen rijen gevonden.', all: 'Alle', filter: 'Filter', previous: 'Vorige', next: 'Volgende', range: '{a}–{b} van {n}', chosen: '{n} gekozen', delete: 'Verwijderen', clear: 'Wissen', confirm: '{n} verwijderen? Dit kan niet ongedaan worden gemaakt.', failed: 'Niet verwijderd: {n}.', csv: 'CSV exporteren', chooseAll: 'Alle rijen op deze pagina kiezen', chooseRow: 'Kiezen', yes: 'Ja', no: 'Nee' },
  pt: { title: 'Tabela', search: 'Pesquisar…', empty: 'Ainda não há nada aqui.', none: 'Nenhuma linha corresponde.', all: 'Todos', filter: 'Filtrar', previous: 'Anterior', next: 'Seguinte', range: '{a}–{b} de {n}', chosen: '{n} escolhidos', delete: 'Eliminar', clear: 'Limpar', confirm: 'Eliminar {n}? Não pode ser desfeito.', failed: 'Não eliminados: {n}.', csv: 'Exportar CSV', chooseAll: 'Escolher todas as linhas da página', chooseRow: 'Escolher', yes: 'Sim', no: 'Não' },
  pl: { title: 'Tabela', search: 'Szukaj…', empty: 'Na razie nic tu nie ma.', none: 'Brak pasujących wierszy.', all: 'Wszystkie', filter: 'Filtruj', previous: 'Poprzednia', next: 'Następna', range: '{a}–{b} z {n}', chosen: 'Wybrano: {n}', delete: 'Usuń', clear: 'Wyczyść', confirm: 'Usunąć {n}? Tego nie można cofnąć.', failed: 'Nie usunięto: {n}.', csv: 'Eksportuj CSV', chooseAll: 'Wybierz wszystkie wiersze na stronie', chooseRow: 'Wybierz', yes: 'Tak', no: 'Nie' },
  zh: { title: '表格', search: '搜索…', empty: '这里还没有内容。', none: '没有匹配的行。', all: '全部', filter: '筛选', previous: '上一页', next: '下一页', range: '第 {a}–{b} 条，共 {n} 条', chosen: '已选 {n} 项', delete: '删除', clear: '清除', confirm: '删除 {n} 项？此操作无法撤销。', failed: '有 {n} 项未能删除。', csv: '导出 CSV', chooseAll: '选择本页所有行', chooseRow: '选择', yes: '是', no: '否' },
  ja: { title: '表', search: '検索…', empty: 'まだ何もありません。', none: '一致する行がありません。', all: 'すべて', filter: '絞り込み', previous: '前へ', next: '次へ', range: '{n}件中 {a}–{b}件', chosen: '{n}件選択中', delete: '削除', clear: '選択解除', confirm: '{n}件を削除しますか？元に戻せません。', failed: '{n}件を削除できませんでした。', csv: 'CSVを書き出す', chooseAll: 'このページの行をすべて選択', chooseRow: '選択', yes: 'はい', no: 'いいえ' }
}

// A status said in one of these words is coloured by itself (badgeColors says it for other words)
const GREEN = /^(paid|active|done|delivered|sent|open|opened|complete|completed|success|successful|approved|live|published|online|shipped|won|ok|in stock|betalt|aktiv|levert|sendt|ferdig|bezahlt|payé|pagado)$/
const YELLOW = /^(pending|waiting|draft|trial|processing|in progress|on hold|review|in review|scheduled|unpaid|venter|utkast|ausstehend|en attente|pendiente)$/
const RED = /^(failed|cancelled|canceled|overdue|refunded|blocked|declined|rejected|error|expired|lost|out of stock|feilet|kansellert|refundert|forfalt|fehlgeschlagen|storniert|échoué|annulé|fallido|cancelado)$/
const TONES = ['green', 'yellow', 'red', 'blue', 'purple', 'grey', 'gray']

export default {
  inject: { vpData: { default: null } },
  emits: ['select', 'open'],
  props: {
    columns: {
      type: Array,
      default: () => [
        { label: 'Name', type: 'person' },
        { label: 'Status', type: 'badge' },
        { label: 'Amount', type: 'money', align: 'end' },
        { label: 'Date', type: 'date' }
      ],
      label: 'Columns',
      control: 'list',
      fields: [
        { key: 'label', label: 'Title' },
        { key: 'type', label: 'Shown as', control: 'select', default: 'text', options: [{ key: 'Text', value: 'text' }, { key: 'Number', value: 'number' }, { key: 'Money', value: 'money' }, { key: 'Date', value: 'date' }, { key: 'A coloured word (status)', value: 'badge' }, { key: 'A person (picture and name)', value: 'person' }, { key: 'A link to the row', value: 'link' }, { key: 'Progress (0 to 100)', value: 'progress' }, { key: 'Yes or no', value: 'yesno' }] },
        { key: 'key', label: 'Which value of a row (empty: by its place)', placeholder: 'c1' },
        { key: 'align', label: 'Lined up', control: 'select', default: 'start', options: [{ key: 'At the start', value: 'start' }, { key: 'In the middle', value: 'center' }, { key: 'At the end', value: 'end' }] },
        { key: 'phone', label: 'Shown on a phone', control: 'boolean', default: true },
        { key: 'sort', label: 'Can be sorted', control: 'boolean', default: true }
      ]
    },
    rows: {
      type: Array,
      default: () => [],
      label: 'Rows',
      control: 'list',
      fields: [
        { key: 'id', label: 'Its id' },
        { key: 'href', label: 'Its page', placeholder: '/orders/1' },
        { key: 'c1', label: 'Column 1' },
        { key: 'c2', label: 'Column 2' },
        { key: 'c3', label: 'Column 3' },
        { key: 'c4', label: 'Column 4' },
        { key: 'c5', label: 'Column 5' },
        { key: 'c6', label: 'Column 6' },
        { key: 'c7', label: 'Column 7' },
        { key: 'c8', label: 'Column 8' },
        { key: 'image', label: 'Picture (for a person column)', control: 'media' }
      ]
    },
    title: { type: String, default: '', label: 'Title', placeholder: 'Table' },
    showTitle: { type: Boolean, default: false, label: 'Show the title' },
    search: { type: Boolean, default: true, label: 'A search field' },
    searchText: { type: String, default: '', label: 'Said in the search field', placeholder: 'Search…' },
    filterBy: { type: Number, default: 0, label: 'Buttons to filter by the values of column (0 for none)', control: 'number', min: 0, max: 8 },
    pageSize: { type: Number, default: 10, label: 'Rows a page (0 for all)', control: 'number', min: 0, max: 500 },
    selectable: { type: Boolean, default: false, label: 'Boxes to choose rows' },
    rowLink: { type: String, default: '', label: 'A click on a row goes to (else the row\\'s page)', placeholder: '/orders/{id}' },
    source: { type: String, default: '', label: 'Your backend (a source in Data)', control: 'source' },
    deletePath: { type: String, default: '', label: 'Delete chosen rows at', placeholder: '/orders/{id}' },
    exportCsv: { type: Boolean, default: false, label: 'A button to download it as CSV' },
    currency: { type: String, default: '', label: 'Currency', placeholder: 'USD' },
    look: { type: String, default: 'lines', label: 'Look', control: 'select', options: [{ key: 'Lines between rows', value: 'lines' }, { key: 'Striped', value: 'striped' }, { key: 'In a box', value: 'boxed' }] },
    dense: { type: Boolean, default: false, label: 'Tight rows' },
    stickyHeader: { type: Boolean, default: true, label: 'Titles stay on top when scrolled' },
    emptyText: { type: String, default: '', label: 'Said when there are none', placeholder: 'Nothing here yet.' },
    badgeColors: { type: String, default: '', label: 'Colours of the coloured words', placeholder: 'Paid=green, Pending=yellow, Refunded=red' }
  },
  data() {
    return { query: '', filterValue: '', sortAt: -1, sortDir: 'asc', page: 1, chosen: [], gone: [], busy: false, problem: '', narrow: false, found: {} }
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
    list() {
      return Array.isArray(this.rows) && this.rows.length ? this.rows : this.inStudio ? SAMPLES : []
    },
    // The columns as they are drawn: each with the field it reads (c1, c2… by its place when it does not say)
    cols() {
      const given = Array.isArray(this.columns) ? this.columns.filter(col => col && typeof col === 'object') : []
      const made = given.length ? given : ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'].filter(key => this.list.some(row => row?.[key] !== undefined && row?.[key] !== '')).map(key => ({ label: key, key }))
      return made.map((col, i) => ({
        label: String(col.label ?? ''),
        type: col.type || 'text',
        key: String(col.key || '').trim() || 'c' + (i + 1),
        align: ['start', 'center', 'end'].includes(col.align) ? col.align : 'start',
        phone: col.phone !== false && col.phone !== 'false',
        sort: col.sort !== false && col.sort !== 'false'
      }))
    },
    // The column whose value is a link to the row when the row has one: a link column, else a person, else the first
    linkCell() {
      const link = this.cols.findIndex(col => col.type === 'link')
      if (link >= 0) return link
      const person = this.cols.findIndex(col => col.type === 'person')
      return person >= 0 ? person : this.cols.length && ['text', 'number', 'money', 'date'].includes(this.cols[0].type) ? 0 : -1
    },
    entries() {
      return this.list.map((row, i) => ({ row: row || {}, key: row && row.id !== undefined && row.id !== null && row.id !== '' ? 'id:' + row.id : 'at:' + i }))
        .filter(entry => !this.gone.includes(entry.key))
    },
    filterCol() {
      const at = Math.floor(Number(this.filterBy) || 0) - 1
      return at >= 0 && at < this.cols.length ? this.cols[at] : null
    },
    filterValues() {
      const col = this.filterCol
      if (!col) return []
      const seen = []
      for (const entry of this.entries) {
        const said = this.text(entry.row, col)
        if (said && !seen.includes(said)) seen.push(said)
      }
      return seen.slice(0, 12)
    },
    matched() {
      const words = this.query.trim().toLowerCase()
      const col = this.filterCol
      return this.entries.filter(entry => {
        if (col && this.filterValue && this.text(entry.row, col) !== this.filterValue) return false
        if (!words || !this.search) return true
        return this.cols.some(one => this.text(entry.row, one).toLowerCase().includes(words))
      })
    },
    sorted() {
      const col = this.cols[this.sortAt]
      if (!col) return this.matched
      const way = this.sortDir === 'desc' ? -1 : 1
      return this.matched.slice().sort((a, b) => way * this.compare(this.value(a.row, col), this.value(b.row, col), col))
    },
    total() {
      return this.sorted.length
    },
    size() {
      return Math.max(0, Math.floor(Number(this.pageSize) || 0))
    },
    pageCount() {
      return this.size ? Math.max(1, Math.ceil(this.total / this.size)) : 1
    },
    at() {
      return Math.min(Math.max(1, this.page), this.pageCount)
    },
    pageRows() {
      return this.size ? this.sorted.slice((this.at - 1) * this.size, this.at * this.size) : this.sorted
    },
    hasPrevious() {
      return this.at > 1
    },
    hasNext() {
      return this.at < this.pageCount
    },
    // Only the chosen rows the search and the filter let through: what is hidden is never counted or deleted
    chosenRows() {
      return this.matched.filter(entry => this.chosen.includes(entry.key))
    },
    allOnPage() {
      return this.pageRows.length > 0 && this.pageRows.every(entry => this.chosen.includes(entry.key))
    },
    someOnPage() {
      return !this.allOnPage && this.pageRows.some(entry => this.chosen.includes(entry.key))
    },
    colours() {
      const said = {}
      for (const pair of String(this.badgeColors || '').split(',')) {
        const [word, colour] = pair.split('=').map(one => (one || '').trim())
        if (word && colour) said[word.toLowerCase()] = colour
      }
      return said
    },
    pictureNames() {
      return this.list.map(row => row?.image).filter(one => /^--/.test(one || ''))
    },
    classes() {
      return ['vp-data-table--' + (['lines', 'striped', 'boxed'].includes(this.look) ? this.look : 'lines'), {
        'vp-data-table--dense': this.dense,
        'vp-data-table--sticky': this.stickyHeader,
        'vp-data-table--cards': this.narrow,
        'vp-data-table--selectable': this.selectable
      }]
    }
  },
  methods: {
    say(key, own, n) {
      if (own) return own
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return String(words[key] ?? WORDS.en[key]).replace('{n}', n ?? '')
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
    value(row, col) {
      const value = row?.[col.key]
      return value === undefined || value === null ? '' : value
    },
    // A value as it is said: in the cell, in the search, in the filter buttons and in the CSV
    text(row, col) {
      const value = this.value(row, col)
      if (value === '' || !col) return ''
      if (col.type === 'number') return this.isNumber(value) ? Number(value).toLocaleString(this.lang) : String(value)
      if (col.type === 'money') return this.isNumber(value) ? this.money(value) : String(value)
      if (col.type === 'date') return this.dateText(value)
      if (col.type === 'yesno') return this.isYes(value) ? this.say('yes') : this.say('no')
      if (col.type === 'progress') return this.percent(row, col) + '%'
      return typeof value === 'object' ? '' : String(value)
    },
    isNumber(value) {
      return value !== '' && value !== null && typeof value !== 'boolean' && !isNaN(Number(value))
    },
    money(amount) {
      const code = this.currency
      if (this.vpData?.money) return this.vpData.money(Number(amount), code, this.lang)
      const value = Number(amount) || 0
      try { return code ? value.toLocaleString(this.lang, { style: 'currency', currency: code }) : value.toLocaleString(this.lang, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) } catch (e) { return value.toFixed(2) + ' ' + code }
    },
    dateText(value) {
      const said = String(value)
      if (!/^\\d{4}-\\d{2}-\\d{2}/.test(said)) return said
      const onlyDay = /^\\d{4}-\\d{2}-\\d{2}$/.test(said)
      const date = new Date(onlyDay ? said + 'T00:00:00Z' : said)
      if (isNaN(date.getTime())) return said
      try {
        return new Intl.DateTimeFormat(this.lang, onlyDay ? { dateStyle: 'medium', timeZone: 'UTC' } : { dateStyle: 'medium', timeStyle: 'short' }).format(date)
      } catch (e) { return said }
    },
    percent(row, col) {
      const value = parseFloat(this.value(row, col))
      return isNaN(value) ? 0 : Math.round(Math.max(0, Math.min(100, value)))
    },
    isYes(value) {
      return value === true || value === 1 || /^(true|yes|y|1|x|✓|on|ja|oui|sí|si|tak|kyllä|是|はい)$/i.test(String(value).trim())
    },
    compare(a, b, col) {
      if (a === '' && b !== '') return 1
      if (b === '' && a !== '') return -1
      if (['number', 'money', 'progress'].includes(col.type) && this.isNumber(a) && this.isNumber(b)) return Number(a) - Number(b)
      if (col.type === 'yesno') return Number(this.isYes(a)) - Number(this.isYes(b))
      if (col.type === 'date') {
        const one = Date.parse(a), two = Date.parse(b)
        if (!isNaN(one) && !isNaN(two)) return one - two
      }
      return String(a).localeCompare(String(b), this.lang, { numeric: true, sensitivity: 'base' })
    },
    badgeTone(word) {
      const said = String(word || '').trim().toLowerCase()
      const own = this.colours[said]
      if (own) return TONES.includes(own.toLowerCase()) ? { tone: own.toLowerCase().replace('gray', 'grey') } : { tone: 'own', style: { '--vp-data-table-badge': own } }
      if (GREEN.test(said)) return { tone: 'green' }
      if (YELLOW.test(said)) return { tone: 'yellow' }
      if (RED.test(said)) return { tone: 'red' }
      return { tone: 'grey' }
    },
    initials(name) {
      const words = String(name || '').trim().split(/\\s+/).filter(Boolean)
      if (!words.length) return '?'
      return ((words[0][0] || '') + (words.length > 1 ? words[words.length - 1][0] : '')).toUpperCase()
    },
    hue(name) {
      let hash = 0
      for (const letter of String(name || '')) hash = (hash * 31 + letter.charCodeAt(0)) % 360
      return hash
    },
    cellClass(col, c) {
      return ['vp-data-table__cell', 'vp-data-table__cell--' + col.align, 'vp-data-table__cell--' + col.type, { 'vp-data-table__cell--lead': c === 0, 'vp-data-table__cell--nophone': !col.phone }]
    },
    // \`{id}\` (and any \`{field}\`) in a path is the row's value
    fill(path, row) {
      return String(path || '').replace(/\\{(\\w+)\\}/g, (all, key) => encodeURIComponent(row?.[key] ?? ''))
    },
    linkOf(row) {
      return this.rowLink ? this.fill(this.rowLink, row) : row?.href || ''
    },
    go(event, href) {
      event.stopPropagation()
      this.$emit('open', this.pageRows.find(entry => this.linkOf(entry.row) === href)?.row)
      if (this.inStudio) { event.preventDefault(); return }
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.button > 0) return
      if (this.$router && String(href || '').startsWith('/') && !String(href).startsWith('//')) { event.preventDefault(); this.$router.push(href) }
    },
    // A click anywhere on a row (not on its box or a link in it) opens it
    open(row, event) {
      const target = event?.target
      if (target?.closest && target.closest('a, button, input, label, select, textarea')) return
      this.$emit('open', row)
      const href = this.linkOf(row)
      if (!href || this.inStudio) return
      if (typeof window !== 'undefined' && window.getSelection && String(window.getSelection() || '')) return
      if (this.$router && href.startsWith('/') && !href.startsWith('//')) this.$router.push(href)
      else if (typeof window !== 'undefined') window.location.assign(href)
    },
    pick(one) {
      this.filterValue = one
      this.page = 1
    },
    sortBy(c) {
      if (this.sortAt === c) {
        if (this.sortDir === 'asc') this.sortDir = 'desc'
        else { this.sortAt = -1; this.sortDir = 'asc' }
      } else {
        this.sortAt = c
        this.sortDir = 'asc'
      }
      this.page = 1
    },
    ariaSort(c) {
      if (!this.cols[c]?.sort) return undefined
      return this.sortAt === c ? (this.sortDir === 'desc' ? 'descending' : 'ascending') : 'none'
    },
    isChosen(entry) {
      return this.chosen.includes(entry.key)
    },
    toggle(entry) {
      this.chosen = this.isChosen(entry) ? this.chosen.filter(key => key !== entry.key) : [...this.chosen, entry.key]
    },
    choosePage() {
      const keys = this.pageRows.map(entry => entry.key)
      this.chosen = this.allOnPage ? this.chosen.filter(key => !keys.includes(key)) : [...new Set([...this.chosen, ...keys])]
    },
    clear() {
      this.chosen = []
      this.problem = ''
    },
    // The chosen rows deleted on the backend one by one (DELETE at deletePath); each that went is taken out
    async remove() {
      const rows = this.chosenRows.slice()
      if (!rows.length || !this.source || !this.deletePath || this.inStudio || !this.vpData?.send) return
      if (typeof window !== 'undefined' && typeof window.confirm === 'function' && !window.confirm(this.say('confirm', '', rows.length))) return
      this.busy = true
      this.problem = ''
      let failed = 0
      for (const entry of rows) {
        let answer
        try { answer = await this.vpData.send(this.source, this.fill(this.deletePath, entry.row), undefined, { method: 'DELETE' }) } catch (e) { answer = { ok: false } }
        if (answer?.ok) {
          this.gone = [...this.gone, entry.key]
          this.chosen = this.chosen.filter(key => key !== entry.key)
        } else failed++
      }
      this.busy = false
      if (failed) this.problem = this.say('failed', '', failed)
    },
    rangeText() {
      if (!this.total) return ''
      const from = this.size ? (this.at - 1) * this.size + 1 : 1
      const to = this.size ? Math.min(this.total, this.at * this.size) : this.total
      return this.say('range', '', this.total.toLocaleString(this.lang)).replace('{a}', from.toLocaleString(this.lang)).replace('{b}', to.toLocaleString(this.lang))
    },
    // The rows it shows (searched, filtered and sorted, every page) as CSV: numbers as numbers, the rest as said
    csv() {
      const cell = value => {
        let said = value === undefined || value === null ? '' : String(value)
        if (/^[=+\\-@\\t\\r]/.test(said) && !this.isNumber(said)) said = '\\'' + said
        return /[",\\n\\r;]/.test(said) ? '"' + said.replace(/"/g, '""') + '"' : said
      }
      const lines = [this.cols.map(col => cell(col.label)).join(',')]
      for (const entry of this.sorted) {
        lines.push(this.cols.map(col => {
          const value = this.value(entry.row, col)
          if (['number', 'money', 'progress'].includes(col.type) && this.isNumber(value)) return cell(Number(value))
          if (col.type === 'date' || col.type === 'yesno') return cell(col.type === 'date' ? value : this.text(entry.row, col))
          return cell(this.text(entry.row, col))
        }).join(','))
      }
      return lines.join('\\r\\n')
    },
    download() {
      if (typeof document === 'undefined' || typeof Blob === 'undefined' || typeof URL === 'undefined' || !URL.createObjectURL) return
      const blob = new Blob(['﻿' + this.csv()], { type: 'text/csv;charset=utf-8' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = (String(this.title || '').trim().replace(/[\\\\/:*?"<>|]+/g, '') || 'table') + '.csv'
      document.body.appendChild(link)
      link.click()
      link.remove()
      setTimeout(() => URL.revokeObjectURL && URL.revokeObjectURL(link.href), 1000)
    },
    // Narrower than 640px (its own width, not the window's): each row a card
    measure(width) {
      const wide = Number(width) || (this.$el && this.$el.getBoundingClientRect ? this.$el.getBoundingClientRect().width : 0)
      this.narrow = wide > 0 && wide < 640
    }
  },
  watch: {
    pictureNames() { this.$nextTick(() => this.findPictures()) },
    chosenRows(list) { this.$emit('select', list.map(entry => entry.row)) },
    pageCount(count) { if (this.page > count) this.page = count }
  },
  mounted() {
    this.findPictures()
    this.measure()
    if (typeof ResizeObserver !== 'undefined') {
      this.watcher = new ResizeObserver(seen => this.measure(seen?.[0]?.contentRect?.width))
      this.watcher.observe(this.$el)
    }
  },
  beforeUnmount() {
    this.watcher?.disconnect()
  }
}
<\/script>
<style>
.vp-data-table {
  --_line: var(--vp-border, #e5e7eb);
  --_muted: var(--vp-muted, #6b7280);
  --_surface: var(--vp-surface, #f9fafb);
  --_radius: var(--vp-radius, 10px);
  --_primary: var(--vp-primary, #2563eb);
  --_pad-y: 0.8rem;
  --_pad-x: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  min-width: 0;
  color: var(--vp-text, #111827);
  font-size: 0.875rem;
}
.vp-data-table--dense { --_pad-y: 0.45rem; --_pad-x: 0.75rem; }
.vp-data-table__sr { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
.vp-data-table svg { flex: none; width: 1rem; height: 1rem; fill: none; stroke: currentColor; stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round; }
.vp-data-table__top { display: flex; flex-wrap: wrap; gap: 0.75rem 1rem; align-items: center; justify-content: space-between; }
.vp-data-table__title { margin: 0; font-family: var(--vp-font-heading, inherit); font-size: 1.125rem; font-weight: 650; line-height: 1.3; }
.vp-data-table__tools { display: flex; flex: 1 1 auto; flex-wrap: wrap; gap: 0.5rem; align-items: center; justify-content: flex-end; min-width: 0; }
.vp-data-table__search { position: relative; display: flex; flex: 0 1 16rem; align-items: center; min-width: 10rem; }
.vp-data-table__search svg { position: absolute; left: 0.65rem; color: var(--_muted); pointer-events: none; }
.vp-data-table__search input {
  width: 100%;
  height: 2.25rem;
  padding: 0 0.75rem 0 2.1rem;
  border: 1px solid var(--_line);
  border-radius: calc(var(--_radius) * 0.8);
  background: var(--vp-background, #fff);
  color: inherit;
  font: inherit;
  transition: border-color 150ms ease, box-shadow 150ms ease;
}
.vp-data-table__search input:focus { outline: none; border-color: var(--_primary); box-shadow: 0 0 0 3px color-mix(in srgb, var(--_primary) 18%, transparent); }
.vp-data-table__filters { display: inline-flex; flex-wrap: wrap; gap: 0.15rem; padding: 0.2rem; border: 1px solid var(--_line); border-radius: calc(var(--_radius) * 0.8); background: var(--_surface); }
.vp-data-table__filter {
  padding: 0.3rem 0.7rem;
  border: 0;
  border-radius: calc(var(--_radius) * 0.6);
  background: transparent;
  color: var(--_muted);
  font: inherit;
  font-size: 0.8125rem;
  font-weight: 550;
  cursor: pointer;
  transition: background 150ms ease, color 150ms ease;
}
.vp-data-table__filter:hover { color: var(--vp-text, #111827); }
.vp-data-table__filter[aria-pressed='true'] { background: var(--vp-background, #fff); color: var(--vp-text, #111827); box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08), 0 0 0 1px var(--_line); }
.vp-data-table__csv, .vp-data-table__clear, .vp-data-table__delete, .vp-data-table__prev, .vp-data-table__next {
  display: inline-flex;
  gap: 0.4rem;
  align-items: center;
  height: 2.25rem;
  padding: 0 0.85rem;
  border: 1px solid var(--_line);
  border-radius: calc(var(--_radius) * 0.8);
  background: var(--vp-background, #fff);
  color: inherit;
  font: inherit;
  font-weight: 550;
  white-space: nowrap;
  cursor: pointer;
  transition: background 150ms ease, border-color 150ms ease, color 150ms ease;
}
.vp-data-table__csv:hover, .vp-data-table__clear:hover, .vp-data-table__prev:hover:not(:disabled), .vp-data-table__next:hover:not(:disabled) { background: var(--_surface); }
.vp-data-table__prev:disabled, .vp-data-table__next:disabled, .vp-data-table__delete:disabled { opacity: 0.45; cursor: default; }
.vp-data-table button:focus-visible, .vp-data-table a:focus-visible, .vp-data-table input[type='checkbox']:focus-visible { outline: 2px solid var(--_primary); outline-offset: 2px; }
.vp-data-table__bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  padding: 0.45rem 0.5rem 0.45rem 0.9rem;
  border-radius: var(--_radius);
  background: color-mix(in srgb, var(--_primary) 9%, var(--vp-background, #fff));
  border: 1px solid color-mix(in srgb, var(--_primary) 25%, transparent);
}
.vp-data-table__count { flex: 1 1 auto; font-weight: 600; }
.vp-data-table__bar .vp-data-table__clear, .vp-data-table__bar .vp-data-table__delete { height: 2rem; }
.vp-data-table__delete { border-color: transparent; background: #dc2626; color: #fff; }
.vp-data-table__delete:hover:not(:disabled) { background: #b91c1c; }
.vp-data-table__problem { margin: 0; padding: 0.6rem 0.9rem; border-radius: var(--_radius); background: color-mix(in srgb, #dc2626 10%, transparent); color: color-mix(in srgb, #dc2626 65%, var(--vp-text, #111827)); font-weight: 550; }
.vp-data-table__scroll { overflow-x: auto; min-width: 0; -webkit-overflow-scrolling: touch; }
.vp-data-table--sticky .vp-data-table__scroll { max-height: min(75vh, 760px); overflow-y: auto; }
.vp-data-table--boxed .vp-data-table__scroll { border: 1px solid var(--_line); border-radius: var(--_radius); background: var(--vp-background, #fff); box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04); }
.vp-data-table__table { width: 100%; border-collapse: separate; border-spacing: 0; font-variant-numeric: tabular-nums; }
.vp-data-table__table th, .vp-data-table__table td { padding: var(--_pad-y) var(--_pad-x); border-bottom: 1px solid var(--_line); text-align: start; vertical-align: middle; }
.vp-data-table__table th {
  background: var(--vp-background, #fff);
  color: var(--_muted);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  white-space: nowrap;
}
.vp-data-table--boxed .vp-data-table__table th, .vp-data-table--striped .vp-data-table__table th { background: var(--_surface); }
.vp-data-table--sticky .vp-data-table__table thead th { position: sticky; top: 0; z-index: 1; }
.vp-data-table--boxed .vp-data-table__row:last-child td { border-bottom: 0; }
.vp-data-table--striped .vp-data-table__table td { border-bottom-color: transparent; }
.vp-data-table--striped .vp-data-table__row:nth-child(even) td { background: color-mix(in srgb, var(--_surface) 70%, transparent); }
.vp-data-table__row td { transition: background 120ms ease; }
.vp-data-table__row:hover td { background: color-mix(in srgb, var(--vp-text, #111827) 3%, transparent); }
.vp-data-table__row--link { cursor: pointer; }
.vp-data-table__row--chosen td, .vp-data-table__row--chosen:hover td { background: color-mix(in srgb, var(--_primary) 7%, transparent); }
.vp-data-table__cell--center { text-align: center !important; }
.vp-data-table__cell--end { text-align: end !important; }
.vp-data-table__cell--number, .vp-data-table__cell--money { white-space: nowrap; }
.vp-data-table__cell--date { color: var(--_muted); white-space: nowrap; }
.vp-data-table__check { width: 1%; padding-inline-end: 0 !important; }
.vp-data-table__check input { width: 1rem; height: 1rem; margin: 0; accent-color: var(--_primary); cursor: pointer; vertical-align: middle; }
.vp-data-table__sort {
  display: inline-flex;
  gap: 0.25rem;
  align-items: center;
  margin: -0.25rem -0.4rem;
  padding: 0.25rem 0.4rem;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: inherit;
  font: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
  cursor: pointer;
}
.vp-data-table__sort:hover, .vp-data-table__sort--on { color: var(--vp-text, #111827); }
.vp-data-table__sort svg { width: 0.85rem; height: 0.85rem; stroke-width: 2; }
.vp-data-table__sort path { opacity: 0.35; transition: opacity 150ms ease; }
.vp-data-table [aria-sort='ascending'] .vp-data-table__up, .vp-data-table [aria-sort='descending'] .vp-data-table__down { opacity: 1; }
.vp-data-table [aria-sort='ascending'] .vp-data-table__down, .vp-data-table [aria-sort='descending'] .vp-data-table__up { opacity: 0.12; }
.vp-data-table__nothing td { padding: 2.5rem 1rem; color: var(--_muted); text-align: center; }
.vp-data-table__person { display: inline-flex; gap: 0.65rem; align-items: center; min-width: 0; font-weight: 550; }
.vp-data-table__avatar { flex: none; width: 2rem; height: 2rem; border-radius: 50%; object-fit: cover; }
.vp-data-table--dense .vp-data-table__avatar { width: 1.6rem; height: 1.6rem; }
.vp-data-table__avatar--letters {
  display: inline-grid;
  place-items: center;
  /* light on a light page, dark on a dark one */
  background: color-mix(in srgb, hsl(var(--vp-data-table-hue, 210) 70% 50%) 18%, var(--vp-background, #fff));
  color: color-mix(in srgb, hsl(var(--vp-data-table-hue, 210) 60% 40%) 60%, var(--vp-text, #111827));
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}
.vp-data-table__person a, .vp-data-table__link { color: inherit; font-weight: 550; text-decoration: none; }
.vp-data-table__link { color: var(--_primary); }
.vp-data-table__person a:hover, .vp-data-table__link:hover { text-decoration: underline; text-underline-offset: 3px; }
.vp-data-table__badge {
  --_tone: var(--vp-data-table-badge, #6b7280);
  display: inline-flex;
  gap: 0.35rem;
  align-items: center;
  padding: 0.18rem 0.6rem 0.18rem 0.5rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--_tone) 13%, transparent);
  color: color-mix(in srgb, var(--_tone) 80%, var(--vp-text, #000));
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.4;
  white-space: nowrap;
}
.vp-data-table__badge::before { content: ''; width: 0.4rem; height: 0.4rem; border-radius: 50%; background: var(--_tone); }
.vp-data-table__badge--green { --_tone: #16a34a; }
.vp-data-table__badge--yellow { --_tone: #ca8a04; }
.vp-data-table__badge--red { --_tone: #dc2626; }
.vp-data-table__badge--blue { --_tone: #2563eb; }
.vp-data-table__badge--purple { --_tone: #7c3aed; }
.vp-data-table__badge--grey { --_tone: #6b7280; }
.vp-data-table__progress { display: inline-flex; gap: 0.6rem; align-items: center; width: 100%; min-width: 7rem; }
.vp-data-table__track { position: relative; flex: 1 1 auto; height: 0.4rem; overflow: hidden; border-radius: 999px; background: color-mix(in srgb, var(--vp-text, #111827) 9%, transparent); }
.vp-data-table__track span { position: absolute; inset: 0 auto 0 0; border-radius: inherit; background: var(--_primary); }
.vp-data-table__percent { flex: none; min-width: 2.6rem; color: var(--_muted); font-size: 0.8125rem; text-align: end; }
.vp-data-table__yesno { color: var(--_muted); }
.vp-data-table__yesno--yes { color: #16a34a; font-weight: 700; }
.vp-data-table__foot { display: flex; flex-wrap: wrap; gap: 0.5rem 1rem; align-items: center; justify-content: space-between; color: var(--_muted); }
.vp-data-table__pages { display: flex; gap: 0.4rem; }
.vp-data-table__prev, .vp-data-table__next { height: 2rem; padding: 0 0.7rem; color: var(--vp-text, #111827); }
/* A card for each row when it is narrow (a phone) */
.vp-data-table--cards .vp-data-table__table, .vp-data-table--cards .vp-data-table__table tbody, .vp-data-table--cards .vp-data-table__table tr, .vp-data-table--cards .vp-data-table__table td { display: block; }
.vp-data-table--cards .vp-data-table__scroll { max-height: none; overflow: visible; }
.vp-data-table--cards.vp-data-table--boxed .vp-data-table__scroll { border: 0; background: transparent; box-shadow: none; }
.vp-data-table--cards .vp-data-table__table thead { display: block; margin-bottom: 0.6rem; }
.vp-data-table--cards .vp-data-table__table thead tr { display: flex; flex-wrap: wrap; gap: 0.35rem; align-items: center; }
.vp-data-table--cards .vp-data-table__table thead th { display: block; padding: 0; border: 0; background: transparent; }
.vp-data-table--cards .vp-data-table__table thead th:not(.vp-data-table__check) { padding: 0.3rem 0.65rem; border: 1px solid var(--_line); border-radius: 999px; }
.vp-data-table--cards .vp-data-table__table thead .vp-data-table__check { padding: 0 0.4rem 0 0.2rem; }
.vp-data-table--cards .vp-data-table__table thead th:not([aria-sort]):not(.vp-data-table__check) { display: none; }
.vp-data-table--cards .vp-data-table__sort { margin: 0; padding: 0; }
.vp-data-table--cards .vp-data-table__cell--nophone { display: none !important; }
.vp-data-table--cards .vp-data-table__row {
  position: relative;
  margin-bottom: 0.65rem;
  padding: 0.35rem 0.9rem;
  border: 1px solid var(--_line);
  border-radius: var(--_radius);
  background: var(--vp-background, #fff);
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
}
.vp-data-table--cards .vp-data-table__row td { display: flex; gap: 1rem; align-items: center; justify-content: space-between; padding: 0.45rem 0; background: transparent !important; text-align: end !important; }
.vp-data-table--cards .vp-data-table__row td:last-child { border-bottom: 0; }
.vp-data-table--cards .vp-data-table__row td::before { content: attr(data-label); flex: none; color: var(--_muted); font-size: 0.75rem; font-weight: 600; text-align: start; }
.vp-data-table--cards .vp-data-table__row .vp-data-table__cell--lead { justify-content: flex-start; padding: 0.55rem 2rem 0.6rem 0; font-size: 0.9375rem; font-weight: 600; text-align: start !important; }
.vp-data-table--cards .vp-data-table__row .vp-data-table__cell--lead::before { display: none; }
.vp-data-table--cards .vp-data-table__row .vp-data-table__check { position: absolute; top: 0.85rem; right: 0.9rem; padding: 0; border: 0; }
.vp-data-table--cards .vp-data-table__row .vp-data-table__check::before { display: none; }
.vp-data-table--cards .vp-data-table__row--chosen { border-color: color-mix(in srgb, var(--_primary) 45%, transparent); background: color-mix(in srgb, var(--_primary) 5%, var(--vp-background, #fff)); }
.vp-data-table--cards .vp-data-table__progress { max-width: 60%; }
.vp-data-table--cards .vp-data-table__nothing td { border: 1px dashed var(--_line); border-radius: var(--_radius); }
.vp-data-table--cards .vp-data-table__search { flex: 1 1 100%; }
.vp-data-table--cards .vp-data-table__tools { justify-content: flex-start; }
@media (prefers-reduced-motion: reduce) { .vp-data-table__row td, .vp-data-table__filter, .vp-data-table__search input { transition: none; } }
</style>
`;export{e as default};