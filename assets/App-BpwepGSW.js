var e=`<template>
  <figure class="vp-chart" :class="classes" :style="style">
    <figcaption v-if="showTitle" class="vp-chart__title">{{ say('chart', title) }}</figcaption>
    <div class="vp-chart__frame" tabindex="0" role="img" :aria-label="summary" @keydown="key" @blur="active = -1">
      <p v-if="!shown.length" class="vp-chart__empty">{{ say('empty') }}</p>
      <svg v-else :key="seen ? 'seen' : 'waiting'" class="vp-chart__svg" :width="width" :height="tall" :viewBox="'0 0 ' + width + ' ' + tall" aria-hidden="true" focusable="false" @pointermove="point" @pointerdown="point" @pointerleave="leave">
        <defs v-if="type === 'area'">
          <linearGradient :id="uid + '-a'" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" class="vp-chart__stop vp-chart__stop--top" />
            <stop offset="1" class="vp-chart__stop" />
          </linearGradient>
          <linearGradient :id="uid + '-b'" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" class="vp-chart__stop vp-chart__stop--top vp-chart__stop--two" />
            <stop offset="1" class="vp-chart__stop vp-chart__stop--two" />
          </linearGradient>
        </defs>

        <g v-if="type === 'donut'" class="vp-chart__donut">
          <path v-for="slice in plot.slices" :key="slice.i" class="vp-chart__slice" :class="{ 'vp-chart__slice--on': active === slice.i, 'vp-chart__slice--off': active !== -1 && active !== slice.i }" :d="slice.d" :style="{ fill: slice.color }" @pointerenter="active = slice.i" />
          <text class="vp-chart__middle" :x="plot.cx" :y="plot.cy - 6" text-anchor="middle">{{ middleValue }}</text>
          <text class="vp-chart__middle-word" :x="plot.cx" :y="plot.cy + 16" text-anchor="middle">{{ middleWord }}</text>
        </g>

        <template v-else>
          <g v-if="showGrid" class="vp-chart__grid">
            <line v-for="tick in plot.ticks" :key="'g' + tick.v" :x1="tick.x1" :y1="tick.y1" :x2="tick.x2" :y2="tick.y2" :class="{ 'vp-chart__zero': tick.v === 0 }" />
          </g>
          <g class="vp-chart__axis">
            <text v-for="tick in plot.ticks" :key="'t' + tick.v" class="vp-chart__tick" :x="tick.tx" :y="tick.ty" :text-anchor="tick.anchor">{{ tick.text }}</text>
            <text v-for="one in plot.labels" :key="'l' + one.i" class="vp-chart__label" :x="one.x" :y="one.y" :text-anchor="one.anchor">{{ one.text }}</text>
          </g>
          <rect v-if="plot.band && active !== -1" class="vp-chart__band" :x="plot.band.x" :y="plot.band.y" :width="plot.band.w" :height="plot.band.h" />
          <line v-if="plot.guide && active !== -1" class="vp-chart__guide" :x1="plot.guide.x" :x2="plot.guide.x" :y1="plot.top" :y2="plot.bottom" />

          <g v-for="line in plot.lines" :key="line.n" class="vp-chart__series" :class="'vp-chart__series--' + line.n">
            <path v-if="line.area" class="vp-chart__area" :d="line.area" :fill="'url(#' + uid + '-' + (line.n === 1 ? 'a' : 'b') + ')'" />
            <path class="vp-chart__line" :d="line.d" :pathLength="line.n === 2 && kind === 'line' ? undefined : 1" />
            <circle v-for="dot in line.dots" :key="dot.i" class="vp-chart__dot" :class="{ 'vp-chart__dot--on': active === dot.i }" :cx="dot.x" :cy="dot.y" :r="active === dot.i ? 5 : 3.25" />
          </g>

          <g v-if="plot.bars.length" class="vp-chart__bars">
            <path v-for="bar in plot.bars" :key="bar.k" class="vp-chart__bar" :class="['vp-chart__bar--' + bar.n, { 'vp-chart__bar--off': active !== -1 && active !== bar.i }]" :d="bar.d" :style="{ fill: bar.color }" />
          </g>

          <g v-if="showValues" class="vp-chart__values">
            <text v-for="one in plot.values" :key="one.k" class="vp-chart__value" :x="one.x" :y="one.y" :text-anchor="one.anchor">{{ one.text }}</text>
          </g>
        </template>
      </svg>
      <div v-if="tip" class="vp-chart__tip" :class="['vp-chart__tip--' + tip.side, { 'vp-chart__tip--below': tip.below }]" :style="{ left: tip.left, top: tip.top }" aria-hidden="true">
        <strong>{{ tip.label }}</strong>
        <span v-for="row in tip.rows" :key="row.name" class="vp-chart__tip-row">
          <i :style="{ background: row.color }"></i>{{ row.name }}<b>{{ row.value }}</b>
        </span>
      </div>
    </div>
    <ul v-if="showLegend && legend.length" class="vp-chart__legend">
      <li v-for="item in legend" :key="item.name + item.i"><i :style="{ background: item.color }"></i>{{ item.name }}<span v-if="item.note">{{ item.note }}</span></li>
    </ul>
    <table class="vp-chart__sr">
      <caption>{{ say('chart', title) }}</caption>
      <thead>
        <tr>
          <th scope="col">{{ say('label') }}</th>
          <th scope="col">{{ firstName }}</th>
          <th v-if="second" scope="col">{{ secondName }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(p, i) in shown" :key="i">
          <th scope="row">{{ p.label }}</th>
          <td>{{ fmt(p.value) }}</td>
          <td v-if="second">{{ fmt(p.value2) }}</td>
        </tr>
      </tbody>
    </table>
    <p class="vp-chart__sr" aria-live="polite">{{ tipText }}</p>
  </figure>
</template>
<script>
// A chart drawn as SVG by itself, no library: a line, an area, bars standing or lying down, or a donut. Points are
// a label and a value (and a second value for last year's line or a second bar). It measures its own width, finds
// nice steps for its axis, leaves labels out when they do not fit, and shows a tip under the pointer or with the
// arrow keys. A screen reader is told what it shows and gets the values as a table. In the editor an empty list
// shows samples.
const SAMPLES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((label, i) => ({
  label,
  value: [42, 48, 45, 56, 61, 58, 67, 72, 69, 78, 84, 96][i] * 100,
  value2: [38, 40, 43, 44, 49, 52, 50, 57, 60, 59, 64, 70][i] * 100
}))

// Colours of a donut's slices after the first (which is the chart's colour): a theme sets them with
// --vp-chart-c3 … --vp-chart-c12 (a dark one, say), these are what is used without
const PALETTE = ['#14b8a6', '#f59e0b', '#ec4899', '#8b5cf6', '#22c55e', '#0ea5e9', '#ef4444', '#64748b', '#a3e635', '#f97316']
  .map((hex, k) => 'var(--vp-chart-c' + (k + 3) + ', ' + hex + ')')

// The words it says itself, in the site's language (App.vue's head says it: \`htmlAttrs: { lang }\`)
const WORDS = {
  en: { chart: 'Chart', value: 'Value', empty: 'No data yet.', summary: '{t}: {n} values. Highest {hi}, lowest {lo}.', total: 'Total', label: 'Label', first: 'This year', second: 'Last year' },
  nb: { chart: 'Diagram', value: 'Verdi', empty: 'Ingen data ennå.', summary: '{t}: {n} verdier. Høyest {hi}, lavest {lo}.', total: 'Totalt', label: 'Navn', first: 'I år', second: 'I fjor' },
  sv: { chart: 'Diagram', value: 'Värde', empty: 'Inga data än.', summary: '{t}: {n} värden. Högst {hi}, lägst {lo}.', total: 'Totalt', label: 'Etikett', first: 'I år', second: 'I fjol' },
  da: { chart: 'Diagram', value: 'Værdi', empty: 'Ingen data endnu.', summary: '{t}: {n} værdier. Højest {hi}, lavest {lo}.', total: 'I alt', label: 'Etiket', first: 'I år', second: 'Sidste år' },
  fi: { chart: 'Kaavio', value: 'Arvo', empty: 'Ei vielä tietoja.', summary: '{t}: {n} arvoa. Suurin {hi}, pienin {lo}.', total: 'Yhteensä', label: 'Nimike', first: 'Tänä vuonna', second: 'Viime vuonna' },
  de: { chart: 'Diagramm', value: 'Wert', empty: 'Noch keine Daten.', summary: '{t}: {n} Werte. Höchster {hi}, niedrigster {lo}.', total: 'Gesamt', label: 'Bezeichnung', first: 'Dieses Jahr', second: 'Letztes Jahr' },
  fr: { chart: 'Graphique', value: 'Valeur', empty: 'Pas encore de données.', summary: '{t} : {n} valeurs. Maximum {hi}, minimum {lo}.', total: 'Total', label: 'Libellé', first: 'Cette année', second: 'L’an dernier' },
  es: { chart: 'Gráfico', value: 'Valor', empty: 'Aún no hay datos.', summary: '{t}: {n} valores. Máximo {hi}, mínimo {lo}.', total: 'Total', label: 'Etiqueta', first: 'Este año', second: 'El año pasado' },
  it: { chart: 'Grafico', value: 'Valore', empty: 'Ancora nessun dato.', summary: '{t}: {n} valori. Massimo {hi}, minimo {lo}.', total: 'Totale', label: 'Etichetta', first: 'Quest’anno', second: 'L’anno scorso' },
  nl: { chart: 'Grafiek', value: 'Waarde', empty: 'Nog geen gegevens.', summary: '{t}: {n} waarden. Hoogste {hi}, laagste {lo}.', total: 'Totaal', label: 'Label', first: 'Dit jaar', second: 'Vorig jaar' },
  pt: { chart: 'Gráfico', value: 'Valor', empty: 'Ainda sem dados.', summary: '{t}: {n} valores. Máximo {hi}, mínimo {lo}.', total: 'Total', label: 'Rótulo', first: 'Este ano', second: 'Ano passado' },
  pl: { chart: 'Wykres', value: 'Wartość', empty: 'Brak danych.', summary: '{t}: {n} wartości. Najwyższa {hi}, najniższa {lo}.', total: 'Razem', label: 'Etykieta', first: 'W tym roku', second: 'W zeszłym roku' },
  zh: { chart: '图表', value: '数值', empty: '暂无数据。', summary: '{t}：{n} 个数值。最高 {hi}，最低 {lo}。', total: '合计', label: '标签', first: '今年', second: '去年' },
  ja: { chart: 'グラフ', value: '値', empty: 'まだデータがありません。', summary: '{t}：{n}個の値。最高 {hi}、最低 {lo}。', total: '合計', label: 'ラベル', first: '今年', second: '昨年' }
}

const round = value => Math.round(value * 10) / 10
let made = 0

export default {
  inject: { vpData: { default: null } },
  props: {
    type: { type: String, default: 'area', label: 'Kind', control: 'select', options: [{ key: 'Line', value: 'line' }, { key: 'Area', value: 'area' }, { key: 'Bars', value: 'bar' }, { key: 'Bars lying down', value: 'hbar' }, { key: 'Donut', value: 'donut' }] },
    points: {
      type: Array,
      default: () => [],
      label: 'Points',
      control: 'list',
      fields: [
        { key: 'label', label: 'Label', placeholder: 'Jan' },
        { key: 'value', label: 'Value', control: 'number' },
        { key: 'value2', label: 'Second value (a second line or bar)', control: 'number' },
        { key: 'color', label: 'Its colour (bars and donut)', placeholder: '#22c55e' }
      ]
    },
    name: { type: String, default: '', label: 'Name of the values', placeholder: 'This year' },
    name2: { type: String, default: '', label: 'Name of the second values', placeholder: 'Last year' },
    showSecond: { type: Boolean, default: false, label: 'Draw the second values' },
    title: { type: String, default: '', label: 'Title', placeholder: 'Chart' },
    showTitle: { type: Boolean, default: false, label: 'Show the title' },
    format: { type: String, default: 'number', label: 'Values are', control: 'select', options: [{ key: 'Numbers', value: 'number' }, { key: 'Money', value: 'money' }, { key: 'Percent', value: 'percent' }, { key: 'Short numbers (1.2K)', value: 'compact' }] },
    currency: { type: String, default: '', label: 'Currency', placeholder: 'USD' },
    height: { type: String, default: '', label: 'Height', control: 'slider', unit: 'px', min: 120, max: 600 },
    color: { type: String, default: '', label: 'Colour', control: 'color' },
    color2: { type: String, default: '', label: 'Colour of the second values', control: 'color' },
    showGrid: { type: Boolean, default: true, label: 'Lines behind' },
    showLegend: { type: Boolean, default: true, label: 'Say what each colour is' },
    showValues: { type: Boolean, default: false, label: 'Write the values on it' },
    smooth: { type: Boolean, default: true, label: 'Curved lines' },
    total: { type: String, default: '', label: 'Said in the middle of a donut', placeholder: 'Total' },
    animate: { type: Boolean, default: true, label: 'Drawn in when shown' }
  },
  data() {
    return { width: 600, active: -1, seen: true, uid: 'vp-chart-' + ++made }
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
    shown() {
      const list = Array.isArray(this.points) && this.points.length ? this.points : this.inStudio ? SAMPLES : []
      return list.filter(p => p && typeof p === 'object').map((p, i) => ({
        label: p.label === undefined || p.label === null || p.label === '' ? String(i + 1) : String(p.label),
        value: Number(p.value) || 0,
        value2: Number(p.value2) || 0,
        color: p.color || ''
      }))
    },
    second() {
      return this.showSecond && this.type !== 'donut'
    },
    kind() {
      return ['line', 'area', 'bar', 'hbar', 'donut'].includes(this.type) ? this.type : 'area'
    },
    tall() {
      const said = parseFloat(this.height)
      return said > 0 ? Math.max(120, Math.min(600, said)) : 260
    },
    // One series is its values ("Value"); "This year" only beside a second one
    firstName() {
      return this.say(this.second ? 'first' : 'value', this.name)
    },
    secondName() {
      return this.say('second', this.name2)
    },
    c1() {
      return 'var(--vp-chart-c1)'
    },
    sum() {
      return this.shown.reduce((all, p) => all + Math.max(0, p.value), 0)
    },
    middleValue() {
      return this.fmt(this.sum, true)
    },
    middleWord() {
      return this.say('total', this.total)
    },
    plot() {
      const empty = { ticks: [], labels: [], lines: [], bars: [], values: [], slices: [], xs: [], top: 0, bottom: 0 }
      if (!this.shown.length) return empty
      return this.kind === 'donut' ? this.drawDonut() : this.kind === 'hbar' ? this.drawLying() : this.drawStanding()
    },
    tip() {
      const i = this.active, p = this.shown[i]
      if (!p) return null
      const plot = this.plot
      let x, y
      if (this.kind === 'donut') {
        const slice = plot.slices.find(one => one.i === i)
        if (!slice) return null
        x = slice.tx; y = slice.ty
      } else if (this.kind === 'hbar') {
        x = plot.ends[i]; y = plot.ys[i]
      } else {
        x = plot.xs[i]; y = plot.tops[i]
      }
      const rows = this.kind === 'donut'
        ? [{ name: this.percentOf(p.value), color: this.colorOf(i), value: this.fmt(p.value) }]
        : [{ name: this.firstName, color: p.color && !this.second && this.kind !== 'line' && this.kind !== 'area' ? p.color : this.c1, value: this.fmt(p.value) }]
          .concat(this.second ? [{ name: this.secondName, color: 'var(--vp-chart-c2)', value: this.fmt(p.value2) }] : [])
      const side = x > this.width * 0.7 ? 'end' : x < this.width * 0.3 ? 'start' : 'middle'
      // near the top it goes under the point, not over the title or what is above the chart
      const below = this.kind !== 'hbar' && y < this.tall * 0.25
      return { label: p.label, rows, side, below, left: (x / this.width) * 100 + '%', top: (y / this.tall) * 100 + '%' }
    },
    tipText() {
      const tip = this.tip
      if (!tip) return ''
      return tip.label + ': ' + tip.rows.map(row => (this.second ? row.name + ' ' : '') + row.value).join(', ')
    },
    summary() {
      const list = this.shown
      if (!list.length) return this.say('chart', this.title) + ': ' + this.say('empty')
      let hi = list[0], lo = list[0]
      for (const p of list) { if (p.value > hi.value) hi = p; if (p.value < lo.value) lo = p }
      return this.say('summary', '', list.length).replace('{t}', this.say('chart', this.title))
        .replace('{hi}', hi.label + ' ' + this.fmt(hi.value)).replace('{lo}', lo.label + ' ' + this.fmt(lo.value))
    },
    legend() {
      if (!this.shown.length) return []
      if (this.kind === 'donut') return this.shown.map((p, i) => ({ i, name: p.label, color: this.colorOf(i), note: this.percentOf(p.value) }))
      // (one series without a name of its own needs no legend)
      if (!this.second && !this.name) return []
      return [{ i: 1, name: this.firstName, color: this.c1 }].concat(this.second ? [{ i: 2, name: this.secondName, color: 'var(--vp-chart-c2)' }] : [])
    },
    classes() {
      return ['vp-chart--' + this.kind, { 'vp-chart--animate': this.animate, 'vp-chart--waiting': this.animate && !this.seen, 'vp-chart--active': this.active !== -1 }]
    },
    style() {
      return {
        '--vp-chart-c1': this.color || 'var(--vp-primary, #2563eb)',
        '--vp-chart-c2': this.color2 || 'var(--vp-muted, #94a3b8)',
        '--vp-chart-height': this.tall + 'px'
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
    // A value as it is said: \`short\` for the axis (1.2K)
    fmt(value, short) {
      const n = Number(value) || 0
      const big = Math.abs(n) >= 10000
      try {
        if (this.format === 'money') {
          if (!short && this.vpData?.money) return this.vpData.money(n, this.currency, this.lang)
          const compact = short && big ? { notation: 'compact', maximumFractionDigits: 1 } : {}
          if (this.currency) return n.toLocaleString(this.lang, { style: 'currency', currency: this.currency, ...(short && !compact.notation ? { maximumFractionDigits: 0 } : {}), ...compact })
          return n.toLocaleString(this.lang, { maximumFractionDigits: short ? 1 : 2, ...compact })
        }
        if (this.format === 'percent') return (n / 100).toLocaleString(this.lang, { style: 'percent', maximumFractionDigits: 1 })
        if (this.format === 'compact' || (short && big)) return n.toLocaleString(this.lang, { notation: 'compact', maximumFractionDigits: 1 })
        return n.toLocaleString(this.lang, { maximumFractionDigits: 2 })
      } catch (e) { return String(n) }
    },
    percentOf(value) {
      return this.sum > 0 ? Math.round((Math.max(0, value) / this.sum) * 1000) / 10 + '%' : '0%'
    },
    colorOf(i) {
      const p = this.shown[i]
      if (p?.color) return p.color
      return i === 0 ? this.c1 : PALETTE[(i - 1) % PALETTE.length]
    },
    // 4 to 6 steps of 1, 2, 2.5 or 5 (times a power of ten) that hold every value, 0 among them
    ticks(values) {
      let lo = Math.min(0, ...values), hi = Math.max(0, ...values)
      if (lo === hi) hi = lo + 1
      const span = hi - lo
      const power = Math.pow(10, Math.floor(Math.log10(span / 4)))
      let best = null
      for (const scale of [0.1, 1, 10]) {
        for (const step of [1, 2, 2.5, 5]) {
          const size = step * power * scale
          const from = Math.floor(lo / size + 1e-9) * size, to = Math.ceil(hi / size - 1e-9) * size
          const count = Math.round((to - from) / size) + 1
          if (count < 4 || count > 6) continue
          const score = Math.abs(count - 5)
          if (!best || score < best.score) best = { from, to, size, count, score }
        }
      }
      if (!best) best = { from: lo, to: hi, size: span / 4, count: 5 }
      const list = []
      for (let k = 0; k < best.count; k++) list.push(Number((best.from + k * best.size).toPrecision(12)))
      return list
    },
    // A label that does not fit in its room is cut, and labels are left out so that the rest do not touch
    thin(room, length) {
      const each = Math.max(...this.shown.map(p => Math.min(p.label.length, length || 99))) * 6.6 + 12
      return Math.max(1, Math.ceil(each / Math.max(1, room)))
    },
    cut(text, room) {
      const fits = Math.max(3, Math.floor(room / 6.6))
      return text.length > fits ? text.slice(0, fits - 1) + '…' : text
    },
    // A line through the points, curved without overshooting (monotone) when \`smooth\`
    curve(points) {
      if (!points.length) return ''
      const at = p => round(p[0]) + ' ' + round(p[1])
      if (points.length === 1 || !this.smooth) return 'M' + points.map(at).join('L')
      const n = points.length, dx = [], m = [], t = []
      for (let i = 0; i < n - 1; i++) {
        dx[i] = points[i + 1][0] - points[i][0]
        m[i] = dx[i] ? (points[i + 1][1] - points[i][1]) / dx[i] : 0
      }
      t[0] = m[0]
      t[n - 1] = m[n - 2]
      for (let i = 1; i < n - 1; i++) t[i] = m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2
      for (let i = 0; i < n - 1; i++) {
        if (!m[i]) { t[i] = 0; t[i + 1] = 0; continue }
        const a = t[i] / m[i], b = t[i + 1] / m[i], s = a * a + b * b
        if (s > 9) { const k = 3 / Math.sqrt(s); t[i] = k * a * m[i]; t[i + 1] = k * b * m[i] }
      }
      let d = 'M' + at(points[0])
      for (let i = 0; i < n - 1; i++) {
        const [x0, y0] = points[i], [x1, y1] = points[i + 1], third = dx[i] / 3
        d += 'C' + at([x0 + third, y0 + t[i] * third]) + ' ' + at([x1 - third, y1 - t[i + 1] * third]) + ' ' + at([x1, y1])
      }
      return d
    },
    // A bar with its far end rounded
    bar(x, y, w, h, lying) {
      const r = Math.max(0, Math.min(4, (lying ? h : w) / 2, Math.abs(lying ? w : h)))
      if (lying) {
        if (w < 0) return 'M' + round(x) + ' ' + round(y) + 'h' + round(w + r) + 'q' + -r + ' 0 ' + -r + ' ' + r + 'v' + round(h - 2 * r) + 'q0 ' + r + ' ' + r + ' ' + r + 'h' + round(-w - r) + 'z'
        return 'M' + round(x) + ' ' + round(y) + 'h' + round(w - r) + 'q' + r + ' 0 ' + r + ' ' + r + 'v' + round(h - 2 * r) + 'q0 ' + r + ' ' + -r + ' ' + r + 'h' + round(-w + r) + 'z'
      }
      if (h < 0) return 'M' + round(x) + ' ' + round(y) + 'v' + round(-h - r) + 'q0 ' + r + ' ' + r + ' ' + r + 'h' + round(w - 2 * r) + 'q' + r + ' 0 ' + r + ' ' + -r + 'v' + round(h + r) + 'z'
      return 'M' + round(x) + ' ' + round(y) + 'v' + round(-h + r) + 'q0 ' + -r + ' ' + r + ' ' + -r + 'h' + round(w - 2 * r) + 'q' + r + ' 0 ' + r + ' ' + r + 'v' + round(h - r) + 'z'
    },
    // Line, area and standing bars: values up, labels along the bottom
    drawStanding() {
      const list = this.shown, n = list.length, bars = this.kind === 'bar'
      const values = list.map(p => p.value).concat(this.second ? list.map(p => p.value2) : [])
      const ticks = this.ticks(values)
      const lo = ticks[0], hi = ticks[ticks.length - 1]
      const said = ticks.map(v => this.fmt(v, true))
      const left = Math.max(28, Math.min(84, Math.max(...said.map(s => s.length)) * 6.6 + 12))
      const top = 12, right = 12, bottom = this.tall - 26
      const room = Math.max(10, this.width - left - right)
      const y = v => top + (bottom - top) * (1 - (v - lo) / (hi - lo || 1))
      const band = room / n
      const inset = bars ? 0 : 8
      const x = i => bars ? left + band * (i + 0.5) : left + inset + (n === 1 ? (room - 2 * inset) / 2 : i * (room - 2 * inset) / (n - 1))
      const xs = list.map((p, i) => x(i))
      const step = this.thin(bars || n === 1 ? band : (room - 2 * inset) / (n - 1), 14)
      const zero = y(Math.max(lo, Math.min(hi, 0)))
      const plot = {
        top, bottom, xs,
        tops: list.map(p => Math.min(y(p.value), this.second ? y(p.value2) : Infinity)),
        ticks: ticks.map((v, k) => ({ v, x1: left, x2: this.width - right, y1: round(y(v)), y2: round(y(v)), tx: left - 8, ty: round(y(v) + 4), anchor: 'end', text: said[k] })),
        labels: list.map((p, i) => ({ i, x: round(xs[i]), y: this.tall - 6, anchor: 'middle', text: this.cut(p.label, band * step - 4) })).filter(one => one.i % step === 0),
        lines: [], bars: [], values: [], slices: []
      }
      if (bars) {
        const series = this.second ? 2 : 1
        const each = Math.min(series === 2 ? band * 0.36 : band * 0.62, series === 2 ? 26 : 44)
        const gap = series === 2 ? Math.min(4, each * 0.15) : 0
        list.forEach((p, i) => {
          const start = xs[i] - (each * series + gap * (series - 1)) / 2
          plot.bars.push({ k: i + '-1', i, n: 1, d: this.bar(start, zero, each, zero - y(p.value)), color: p.color || this.c1 })
          if (series === 2) plot.bars.push({ k: i + '-2', i, n: 2, d: this.bar(start + each + gap, zero, each, zero - y(p.value2)), color: 'var(--vp-chart-c2)' })
          if (this.showValues) plot.values.push({ k: 'v' + i, x: round(xs[i] - (series === 2 ? (each + gap) / 2 : 0)), y: round(y(p.value) - (p.value < 0 ? -14 : 6)), anchor: 'middle', text: this.fmt(p.value, true) })
        })
        plot.band = this.active !== -1 ? { x: round(xs[this.active] - band / 2 + 2), y: top, w: round(band - 4), h: round(bottom - top) } : null
      } else {
        const make = (key, n) => {
          const points = list.map((p, i) => [xs[i], y(p[key])])
          const d = this.curve(points)
          return {
            n, d,
            area: this.kind === 'area' ? d + 'L' + round(xs[list.length - 1]) + ' ' + round(zero) + 'L' + round(xs[0]) + ' ' + round(zero) + 'Z' : '',
            dots: points.map(([px, py], i) => ({ i, x: round(px), y: round(py) })).filter(dot => n === 1 ? this.active === dot.i || list.length <= 16 && this.kind === 'line' : this.active === dot.i)
          }
        }
        if (this.second) plot.lines.push(make('value2', 2))
        plot.lines.push(make('value', 1))
        if (this.showValues) list.forEach((p, i) => { if (i % step === 0) plot.values.push({ k: 'v' + i, x: round(xs[i]), y: round(y(p.value) - 10), anchor: 'middle', text: this.fmt(p.value, true) }) })
        plot.guide = this.active !== -1 ? { x: round(xs[this.active]) } : null
      }
      return plot
    },
    // Bars lying down: labels at the start, values along the bottom
    drawLying() {
      const list = this.shown, n = list.length
      const values = list.map(p => p.value).concat(this.second ? list.map(p => p.value2) : [])
      const ticks = this.ticks(values)
      const lo = ticks[0], hi = ticks[ticks.length - 1]
      const left = Math.max(40, Math.min(this.width * 0.34, Math.max(...list.map(p => p.label.length)) * 6.6 + 16))
      const right = 16, top = 6, bottom = this.tall - 24
      const x = v => left + (this.width - left - right) * ((v - lo) / (hi - lo || 1))
      const band = (bottom - top) / n
      const series = this.second ? 2 : 1
      const each = Math.min(series === 2 ? band * 0.36 : band * 0.62, series === 2 ? 16 : 26)
      const gap = series === 2 ? Math.min(3, each * 0.15) : 0
      const zero = x(Math.max(lo, Math.min(hi, 0)))
      const ys = list.map((p, i) => top + band * (i + 0.5))
      const plot = {
        top, bottom, ys,
        ends: list.map(p => Math.max(x(p.value), this.second ? x(p.value2) : -Infinity)),
        ticks: ticks.map(v => ({ v, x1: round(x(v)), x2: round(x(v)), y1: top, y2: bottom, tx: round(x(v)), ty: this.tall - 6, anchor: 'middle', text: this.fmt(v, true) })),
        labels: list.map((p, i) => ({ i, x: left - 10, y: round(ys[i] + 4), anchor: 'end', text: this.cut(p.label, left - 14) })).filter((one, i) => i % Math.max(1, Math.ceil(16 / band)) === 0),
        lines: [], bars: [], values: [], slices: []
      }
      list.forEach((p, i) => {
        const start = ys[i] - (each * series + gap * (series - 1)) / 2
        plot.bars.push({ k: i + '-1', i, n: 1, d: this.bar(zero, start, x(p.value) - zero, each, true), color: p.color || this.c1 })
        if (series === 2) plot.bars.push({ k: i + '-2', i, n: 2, d: this.bar(zero, start + each + gap, x(p.value2) - zero, each, true), color: 'var(--vp-chart-c2)' })
        if (this.showValues) plot.values.push({ k: 'v' + i, x: round(x(p.value) + (p.value < 0 ? -6 : 6)), y: round(start + each / 2 + 4), anchor: p.value < 0 ? 'end' : 'start', text: this.fmt(p.value, true) })
      })
      plot.band = this.active !== -1 ? { x: left, y: round(ys[this.active] - band / 2 + 1), w: round(this.width - left - right), h: round(band - 2) } : null
      return plot
    },
    drawDonut() {
      const cx = this.width / 2, cy = this.tall / 2
      const outer = Math.max(20, Math.min(this.width, this.tall) / 2 - 8), inner = outer * 0.64
      const plot = { cx, cy, top: 0, bottom: this.tall, ticks: [], labels: [], lines: [], bars: [], values: [], slices: [] }
      const sum = this.sum
      if (!sum) return plot
      let angle = -Math.PI / 2
      const at = (r, a) => round(cx + r * Math.cos(a)) + ' ' + round(cy + r * Math.sin(a))
      this.shown.forEach((p, i) => {
        if (p.value <= 0) return
        const turn = Math.min((p.value / sum) * Math.PI * 2, Math.PI * 2 - 0.0001)
        const gap = turn > 0.04 && this.shown.length > 1 ? 0.012 : 0
        const a0 = angle + gap, a1 = angle + turn - gap
        const r = this.active === i ? outer + 4 : outer
        const large = a1 - a0 > Math.PI ? 1 : 0
        const d = 'M' + at(r, a0) + 'A' + round(r) + ' ' + round(r) + ' 0 ' + large + ' 1 ' + at(r, a1) + 'L' + at(inner, a1) + 'A' + round(inner) + ' ' + round(inner) + ' 0 ' + large + ' 0 ' + at(inner, a0) + 'Z'
        const mid = angle + turn / 2
        plot.slices.push({ i, d, color: this.colorOf(i), tx: cx + (outer + 2) * Math.cos(mid), ty: cy + (outer + 2) * Math.sin(mid) })
        angle += turn
      })
      return plot
    },
    // The point under the pointer: the nearest along the axis (a donut's slices say it themselves)
    point(event) {
      if (this.kind === 'donut' || !this.shown.length) return
      const svg = event.currentTarget
      const box = svg?.getBoundingClientRect ? svg.getBoundingClientRect() : null
      const lying = this.kind === 'hbar'
      const scale = box && (lying ? box.height : box.width) ? (lying ? this.tall / box.height : this.width / box.width) : 1
      const at = ((lying ? event.clientY - (box?.top || 0) : event.clientX - (box?.left || 0))) * scale
      const list = lying ? this.plot.ys : this.plot.xs
      let best = 0
      list.forEach((one, i) => { if (Math.abs(one - at) < Math.abs(list[best] - at)) best = i })
      this.active = best
    },
    // A finger lifted is not the pointer leaving: the tip stays until the chart loses focus (a tap elsewhere)
    leave(event) {
      if (event?.pointerType !== 'touch') this.active = -1
    },
    // Drawn in when it comes into sight, not when the page is made (a chart further down waits)
    wait() {
      if (!this.animate || this.inStudio || typeof IntersectionObserver === 'undefined' || !this.$el?.getBoundingClientRect) return
      const box = this.$el.getBoundingClientRect(), high = window.innerHeight || document.documentElement.clientHeight || 0
      if (box.top < high && box.bottom > 0) return
      this.seen = false
      this.looker = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return
        this.seen = true
        this.looker?.disconnect()
        this.looker = null
      }, { threshold: 0.2 })
      this.looker.observe(this.$el)
    },
    // The arrow keys move the tip from point to point
    key(event) {
      const n = this.shown.length
      if (!n) return
      const back = ['ArrowLeft', 'ArrowUp'], on = ['ArrowRight', 'ArrowDown']
      if (back.includes(event.key)) this.active = this.active <= 0 ? n - 1 : this.active - 1
      else if (on.includes(event.key)) this.active = this.active === -1 || this.active >= n - 1 ? 0 : this.active + 1
      else if (event.key === 'Home') this.active = 0
      else if (event.key === 'End') this.active = n - 1
      else if (event.key === 'Escape') this.active = -1
      else return
      event.preventDefault()
    },
    measure() {
      const frame = this.$el?.querySelector ? this.$el.querySelector('.vp-chart__frame') : null
      const width = frame ? frame.clientWidth : 0
      if (width > 0 && Math.abs(width - this.width) > 0.5) this.width = Math.round(width)
    }
  },
  watch: {
    points() { if (this.active >= this.shown.length) this.active = -1 }
  },
  mounted() {
    this.measure()
    this.wait()
    if (typeof ResizeObserver !== 'undefined') {
      this.watcher = new ResizeObserver(() => this.measure())
      const frame = this.$el.querySelector('.vp-chart__frame')
      if (frame) this.watcher.observe(frame)
    }
  },
  beforeUnmount() {
    this.watcher?.disconnect()
    this.looker?.disconnect()
  }
}
<\/script>
<style>
.vp-chart {
  --_muted: var(--vp-muted, #6b7280);
  --_line: var(--vp-border, #e5e7eb);
  --_bg: var(--vp-background, #fff);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  min-width: 0;
  margin: 0;
  color: var(--vp-text, #111827);
  font-size: 0.875rem;
}
.vp-chart__title { font-family: var(--vp-font-heading, inherit); font-size: 1.0625rem; font-weight: 650; line-height: 1.3; }
.vp-chart__frame { position: relative; width: 100%; min-width: 0; height: var(--vp-chart-height, 260px); border-radius: var(--vp-radius, 8px); outline: none; }
.vp-chart__frame:focus-visible { box-shadow: 0 0 0 2px var(--_bg), 0 0 0 4px var(--vp-chart-c1, #2563eb); }
.vp-chart__svg { display: block; width: 100%; height: 100%; overflow: visible; touch-action: pan-y; }
.vp-chart__empty { display: grid; place-items: center; height: 100%; margin: 0; border: 1px dashed var(--_line); border-radius: var(--vp-radius, 8px); color: var(--_muted); }
.vp-chart__grid line { stroke: var(--_line); stroke-width: 1; stroke-dasharray: 3 4; shape-rendering: crispEdges; }
.vp-chart__grid .vp-chart__zero { stroke: color-mix(in srgb, var(--vp-text, #111827) 22%, transparent); stroke-dasharray: none; }
.vp-chart__tick, .vp-chart__label { fill: var(--_muted); font-size: 11px; font-variant-numeric: tabular-nums; }
.vp-chart__label { font-size: 11.5px; }
.vp-chart__line { fill: none; stroke: var(--vp-chart-c1); stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
.vp-chart__series--2 .vp-chart__line { stroke: var(--vp-chart-c2); stroke-width: 2; stroke-dasharray: 5 4; }
.vp-chart--area .vp-chart__series--2 .vp-chart__line { stroke-dasharray: none; }
.vp-chart__stop { stop-color: var(--vp-chart-c1); stop-opacity: 0; }
.vp-chart__stop--top { stop-opacity: 0.28; }
.vp-chart__stop--two { stop-color: var(--vp-chart-c2); }
.vp-chart__stop--two.vp-chart__stop--top { stop-opacity: 0.18; }
.vp-chart__dot { fill: var(--_bg); stroke: var(--vp-chart-c1); stroke-width: 2.25; transition: r 120ms ease; }
.vp-chart__series--2 .vp-chart__dot { stroke: var(--vp-chart-c2); }
.vp-chart__guide { stroke: color-mix(in srgb, var(--vp-text, #111827) 25%, transparent); stroke-width: 1; stroke-dasharray: 3 3; }
.vp-chart__band { fill: color-mix(in srgb, var(--vp-text, #111827) 5%, transparent); rx: 6px; }
.vp-chart__bar { transition: opacity 150ms ease; }
.vp-chart__bar--off { opacity: 0.45; }
.vp-chart__value { fill: var(--vp-text, #111827); font-size: 11px; font-weight: 600; font-variant-numeric: tabular-nums; }
.vp-chart__slice { stroke: var(--_bg); stroke-width: 1; transition: opacity 150ms ease, d 150ms ease; cursor: default; }
.vp-chart__slice--off { opacity: 0.4; }
.vp-chart__middle { fill: var(--vp-text, #111827); font-family: var(--vp-font-heading, inherit); font-size: 22px; font-weight: 700; font-variant-numeric: tabular-nums; }
.vp-chart__middle-word { fill: var(--_muted); font-size: 12px; font-weight: 500; }
.vp-chart__tip {
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 8rem;
  max-width: 15rem;
  padding: 0.55rem 0.7rem;
  border: 1px solid var(--_line);
  border-radius: 8px;
  background: var(--_bg);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.12), 0 2px 6px rgba(15, 23, 42, 0.06);
  color: var(--vp-text, #111827);
  font-size: 0.8125rem;
  line-height: 1.35;
  pointer-events: none;
  transform: translate(-50%, calc(-100% - 12px));
  white-space: nowrap;
}
.vp-chart__tip--start { transform: translate(-12px, calc(-100% - 12px)); }
.vp-chart__tip--end { transform: translate(calc(-100% + 12px), calc(-100% - 12px)); }
.vp-chart__tip--below { transform: translate(-50%, 12px); }
.vp-chart__tip--below.vp-chart__tip--start { transform: translate(-12px, 12px); }
.vp-chart__tip--below.vp-chart__tip--end { transform: translate(calc(-100% + 12px), 12px); }
.vp-chart--hbar .vp-chart__tip { transform: translate(10px, -50%); }
.vp-chart--hbar .vp-chart__tip--end { transform: translate(calc(-100% - 10px), -50%); }
.vp-chart__tip strong { font-weight: 650; }
.vp-chart__tip-row { display: flex; gap: 0.45rem; align-items: center; color: var(--_muted); }
.vp-chart__tip-row i, .vp-chart__legend i { flex: none; width: 0.6rem; height: 0.6rem; border-radius: 3px; }
.vp-chart__tip-row b { margin-inline-start: auto; padding-inline-start: 0.75rem; color: var(--vp-text, #111827); font-weight: 650; font-variant-numeric: tabular-nums; }
.vp-chart__legend { display: flex; flex-wrap: wrap; gap: 0.4rem 1.1rem; margin: 0; padding: 0; list-style: none; color: var(--_muted); font-size: 0.8125rem; }
.vp-chart__legend li { display: inline-flex; gap: 0.45rem; align-items: center; }
.vp-chart__legend span { color: var(--vp-text, #111827); font-weight: 600; font-variant-numeric: tabular-nums; }
.vp-chart--donut .vp-chart__legend { justify-content: center; }
.vp-chart__sr { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
.vp-chart--animate .vp-chart__line { stroke-dasharray: 1; stroke-dashoffset: 1; animation: vp-chart-draw 1s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
.vp-chart--animate .vp-chart__series--2 .vp-chart__line { animation-delay: 0.1s; }
.vp-chart--animate.vp-chart--line .vp-chart__series--2 .vp-chart__line { stroke-dasharray: 5 4; stroke-dashoffset: 0; animation: vp-chart-fade 0.8s ease both; }
.vp-chart--animate .vp-chart__area, .vp-chart--animate .vp-chart__value { animation: vp-chart-fade 0.9s ease 0.25s both; }
.vp-chart--animate .vp-chart__bar { transform-box: fill-box; transform-origin: bottom; animation: vp-chart-rise 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
.vp-chart--animate.vp-chart--hbar .vp-chart__bar { transform-origin: left; animation-name: vp-chart-reach; }
.vp-chart--animate .vp-chart__donut { transform-box: fill-box; transform-origin: center; animation: vp-chart-turn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
/* not in sight yet: held at its start (the drawing is made again when it comes, so it starts from the beginning) */
.vp-chart--waiting .vp-chart__line, .vp-chart--waiting .vp-chart__area, .vp-chart--waiting .vp-chart__value, .vp-chart--waiting .vp-chart__bar, .vp-chart--waiting .vp-chart__donut { animation-play-state: paused; }
@keyframes vp-chart-draw { to { stroke-dashoffset: 0; } }
@keyframes vp-chart-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes vp-chart-rise { from { transform: scaleY(0); } to { transform: scaleY(1); } }
@keyframes vp-chart-reach { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes vp-chart-turn { from { opacity: 0; transform: rotate(-60deg) scale(0.9); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .vp-chart--animate .vp-chart__line, .vp-chart--animate .vp-chart__area, .vp-chart--animate .vp-chart__value, .vp-chart--animate .vp-chart__bar, .vp-chart--animate .vp-chart__donut { animation: none; stroke-dashoffset: 0; }
  .vp-chart__bar, .vp-chart__slice, .vp-chart__dot { transition: none; }
}
@media (max-width: 480px) { .vp-chart__tip { min-width: 7rem; font-size: 0.75rem; } }
</style>
`;export{e as default};