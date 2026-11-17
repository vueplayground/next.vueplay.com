var e=`<template>
  <div class="vp-countdown" :class="['vp-countdown--' + kind, 'vp-countdown--' + (align === 'start' ? 'start' : 'center')]">
    <div v-if="!over" class="vp-countdown__units" aria-hidden="true">
      <div v-for="unit in units" :key="unit.key" class="vp-countdown__unit">
        <span class="vp-countdown__number">{{ unit.number }}</span>
        <span class="vp-countdown__label">{{ unit.label }}</span>
      </div>
    </div>
    <p v-if="!over" class="vp-countdown__said" role="timer" aria-atomic="true">{{ spoken }}</p>
    <div v-else class="vp-countdown__done">
      <p class="vp-countdown__done-text" role="status">{{ doneText || say('done') }}</p>
      <a v-if="doneHref" class="vp-countdown__button" :href="doneHref" @click="go">{{ doneButton || say('go') }}</a>
    </div>
  </div>
</template>
<script>
// Countdown: the days, hours, minutes and seconds left until a date and time (\`to\`, as 2027-05-20T09:00). The
// time is where \`timezone\` says (+02:00), or the visitor's own; a \`to\` that says its own (…Z, …+02:00) is read
// as it says. The numbers change every second; a screen reader is told the time left in words, at most once a
// minute. Nothing runs while the tab is hidden. When the time has come it says \`doneText\`, with a button if
// asked. The numbers are drawn only once the page is alive (on the server they are dashes), so the first paint
// and the live page agree. In the editor an empty one counts down to a date a few days off.
const DAY = 86400000
const SIZES = { days: DAY, hours: 3600000, minutes: 60000, seconds: 1000 }

// The words it says itself, in the site's language, each unit in the forms the language counts with
// (Intl.PluralRules: one, few, many, other)
const WORDS = {
  en: { days: { one: 'day', other: 'days' }, hours: { one: 'hour', other: 'hours' }, minutes: { one: 'minute', other: 'minutes' }, seconds: { one: 'second', other: 'seconds' }, left: '{time} left', soon: 'Less than a minute left', done: 'It has started!', go: 'Continue' },
  nb: { days: { one: 'dag', other: 'dager' }, hours: { one: 'time', other: 'timer' }, minutes: { one: 'minutt', other: 'minutter' }, seconds: { one: 'sekund', other: 'sekunder' }, left: '{time} igjen', soon: 'Under ett minutt igjen', done: 'Det har begynt!', go: 'Fortsett' },
  sv: { days: { one: 'dag', other: 'dagar' }, hours: { one: 'timme', other: 'timmar' }, minutes: { one: 'minut', other: 'minuter' }, seconds: { one: 'sekund', other: 'sekunder' }, left: '{time} kvar', soon: 'Mindre än en minut kvar', done: 'Det har börjat!', go: 'Fortsätt' },
  da: { days: { one: 'dag', other: 'dage' }, hours: { one: 'time', other: 'timer' }, minutes: { one: 'minut', other: 'minutter' }, seconds: { one: 'sekund', other: 'sekunder' }, left: '{time} tilbage', soon: 'Under et minut tilbage', done: 'Det er begyndt!', go: 'Fortsæt' },
  fi: { days: { one: 'päivä', other: 'päivää' }, hours: { one: 'tunti', other: 'tuntia' }, minutes: { one: 'minuutti', other: 'minuuttia' }, seconds: { one: 'sekunti', other: 'sekuntia' }, left: '{time} jäljellä', soon: 'Alle minuutti jäljellä', done: 'Se on alkanut!', go: 'Jatka' },
  de: { days: { one: 'Tag', other: 'Tage' }, hours: { one: 'Stunde', other: 'Stunden' }, minutes: { one: 'Minute', other: 'Minuten' }, seconds: { one: 'Sekunde', other: 'Sekunden' }, left: 'Noch {time}', soon: 'Noch weniger als eine Minute', done: 'Es hat begonnen!', go: 'Weiter' },
  fr: { days: { one: 'jour', other: 'jours' }, hours: { one: 'heure', other: 'heures' }, minutes: { one: 'minute', other: 'minutes' }, seconds: { one: 'seconde', other: 'secondes' }, left: 'Encore {time}', soon: 'Moins d’une minute', done: 'C’est parti !', go: 'Continuer' },
  es: { days: { one: 'día', other: 'días' }, hours: { one: 'hora', other: 'horas' }, minutes: { one: 'minuto', other: 'minutos' }, seconds: { one: 'segundo', other: 'segundos' }, left: 'Quedan {time}', soon: 'Queda menos de un minuto', done: '¡Ya ha empezado!', go: 'Continuar' },
  it: { days: { one: 'giorno', other: 'giorni' }, hours: { one: 'ora', other: 'ore' }, minutes: { one: 'minuto', other: 'minuti' }, seconds: { one: 'secondo', other: 'secondi' }, left: 'Mancano {time}', soon: 'Manca meno di un minuto', done: 'È iniziato!', go: 'Continua' },
  nl: { days: { one: 'dag', other: 'dagen' }, hours: { one: 'uur', other: 'uur' }, minutes: { one: 'minuut', other: 'minuten' }, seconds: { one: 'seconde', other: 'seconden' }, left: 'Nog {time}', soon: 'Nog minder dan een minuut', done: 'Het is begonnen!', go: 'Verder' },
  pt: { days: { one: 'dia', other: 'dias' }, hours: { one: 'hora', other: 'horas' }, minutes: { one: 'minuto', other: 'minutos' }, seconds: { one: 'segundo', other: 'segundos' }, left: 'Faltam {time}', soon: 'Falta menos de um minuto', done: 'Já começou!', go: 'Continuar' },
  pl: { days: { one: 'dzień', few: 'dni', many: 'dni', other: 'dnia' }, hours: { one: 'godzina', few: 'godziny', many: 'godzin', other: 'godziny' }, minutes: { one: 'minuta', few: 'minuty', many: 'minut', other: 'minuty' }, seconds: { one: 'sekunda', few: 'sekundy', many: 'sekund', other: 'sekundy' }, left: 'Zostało {time}', soon: 'Zostało mniej niż minutę', done: 'Już się zaczęło!', go: 'Dalej' },
  zh: { days: { other: '天' }, hours: { other: '小时' }, minutes: { other: '分钟' }, seconds: { other: '秒' }, left: '还剩 {time}', soon: '还剩不到一分钟', done: '已经开始了！', go: '继续' },
  ja: { days: { other: '日' }, hours: { other: '時間' }, minutes: { other: '分' }, seconds: { other: '秒' }, left: '残り {time}', soon: '残り1分未満', done: '始まりました！', go: '続ける' }
}
const LOOKS = ['boxes', 'plain', 'big']

export default {
  props: {
    to: { type: String, default: '', label: 'Counts down to', placeholder: '2027-05-20T09:00' },
    timezone: {
      type: String,
      default: '',
      label: 'In the time zone',
      control: 'select',
      options: [
        { key: 'The visitor\\'s own', value: '' },
        { key: 'UTC−10 (Hawaii)', value: '-10:00' }, { key: 'UTC−8 (Los Angeles, winter)', value: '-08:00' }, { key: 'UTC−7 (Los Angeles, summer)', value: '-07:00' },
        { key: 'UTC−6 (Chicago, winter)', value: '-06:00' }, { key: 'UTC−5 (New York, winter)', value: '-05:00' }, { key: 'UTC−4 (New York, summer)', value: '-04:00' },
        { key: 'UTC−3 (São Paulo)', value: '-03:00' }, { key: 'UTC (London, winter)', value: '+00:00' }, { key: 'UTC+1 (Paris, Oslo, winter)', value: '+01:00' },
        { key: 'UTC+2 (Paris, Oslo, summer)', value: '+02:00' }, { key: 'UTC+3 (Istanbul, Moscow)', value: '+03:00' }, { key: 'UTC+4 (Dubai)', value: '+04:00' },
        { key: 'UTC+5:30 (India)', value: '+05:30' }, { key: 'UTC+7 (Bangkok)', value: '+07:00' }, { key: 'UTC+8 (Singapore, Beijing)', value: '+08:00' },
        { key: 'UTC+9 (Tokyo)', value: '+09:00' }, { key: 'UTC+10 (Sydney, winter)', value: '+10:00' }, { key: 'UTC+11 (Sydney, summer)', value: '+11:00' },
        { key: 'UTC+12 (Auckland, winter)', value: '+12:00' }, { key: 'UTC+13 (Auckland, summer)', value: '+13:00' }
      ]
    },
    showDays: { type: Boolean, default: true, label: 'Show days' },
    showHours: { type: Boolean, default: true, label: 'Show hours' },
    showMinutes: { type: Boolean, default: true, label: 'Show minutes' },
    showSeconds: { type: Boolean, default: true, label: 'Show seconds' },
    look: { type: String, default: 'boxes', label: 'Look', control: 'select', options: [{ key: 'Boxes', value: 'boxes' }, { key: 'Plain', value: 'plain' }, { key: 'Big numbers', value: 'big' }] },
    align: { type: String, default: 'center', label: 'Placed', control: 'select', options: [{ key: 'At the start', value: 'start' }, { key: 'In the middle', value: 'center' }] },
    doneText: { type: String, default: '', label: 'Said when the time has come', placeholder: 'It has started!' },
    doneHref: { type: String, default: '', label: 'Then a button to', placeholder: '/programme' },
    doneButton: { type: String, default: '', label: 'Its text', placeholder: 'Continue' }
  },
  data() {
    // (no time before the page is alive: the server and the first paint draw the same dashes)
    return { now: null, spokenAt: null, sample: null }
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
      return LOOKS.includes(this.look) ? this.look : 'boxes'
    },
    // The moment counted down to, in ms (NaN when there is none)
    target() {
      const text = String(this.to || '').trim()
      if (!text) return this.sample ?? NaN
      const found = /^(\\d{4})-(\\d{2})-(\\d{2})(?:[T ](\\d{2}):(\\d{2})(?::(\\d{2}))?)?\\s*(Z|[+-]\\d{2}:?\\d{2})?$/i.exec(text)
      if (!found) return NaN
      const [, y, mo, d, h = '0', mi = '0', s = '0', own] = found
      const zone = own || this.timezone
      if (!zone) return new Date(+y, +mo - 1, +d, +h, +mi, +s).getTime()
      const utc = Date.UTC(+y, +mo - 1, +d, +h, +mi, +s)
      if (/^z$/i.test(zone)) return utc
      const offset = /^([+-])(\\d{2}):?(\\d{2})$/.exec(zone)
      if (!offset) return NaN
      return utc - (offset[1] === '-' ? -1 : 1) * (+offset[2] * 60 + +offset[3]) * 60000
    },
    left() {
      return this.now === null || !Number.isFinite(this.target) ? null : Math.max(0, this.target - this.now)
    },
    over() {
      return this.left === 0
    },
    chosen() {
      const keys = [this.showDays && 'days', this.showHours && 'hours', this.showMinutes && 'minutes', this.showSeconds && 'seconds'].filter(Boolean)
      return keys.length ? keys : ['days']
    },
    // Each unit shown, the biggest holding all above it (without days, the hours go past 24)
    units() {
      // (whole seconds, rounded up: the last second shows 1 until it has gone)
      let rest = this.left === null ? null : Math.ceil(this.left / 1000) * 1000
      return this.chosen.map((key, i) => {
        if (rest === null) return { key, number: '––', label: this.unitWord(key, 5) }
        const value = Math.floor(rest / SIZES[key])
        rest -= value * SIZES[key]
        return { key, number: i ? String(value).padStart(2, '0') : String(value), label: this.unitWord(key, value) }
      })
    },
    // What a screen reader is told: the days, hours and minutes left, changed once a minute at most
    spoken() {
      if (this.spokenAt === null || !Number.isFinite(this.target)) return ''
      let rest = Math.max(0, this.target - this.spokenAt)
      if (rest < 60000) return this.say('soon')
      const parts = []
      for (const key of ['days', 'hours', 'minutes']) {
        const value = Math.floor(rest / SIZES[key])
        rest -= value * SIZES[key]
        if (value) parts.push(value + ' ' + this.unitWord(key, value))
      }
      let time = parts.join(', ')
      try { time = new Intl.ListFormat(this.locale, { style: 'long', type: 'conjunction' }).format(parts) } catch (e) {}
      return this.say('left').replace('{time}', time)
    }
  },
  methods: {
    say(key) {
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return words[key] ?? WORDS.en[key]
    },
    unitWord(key, n) {
      const forms = this.say(key)
      let form = 'other'
      try { form = new Intl.PluralRules(this.locale).select(n) } catch (e) {}
      return forms[form] || forms.other
    },
    tick() {
      clearTimeout(this.timer)
      this.now = Date.now()
      // (the words change when the minute does, not with every second)
      const minute = Number.isFinite(this.target) ? Math.ceil(Math.max(0, this.target - this.now) / 60000) : null
      if (minute !== this.minute) { this.minute = minute; this.spokenAt = this.now }
      if (this.over || this.hidden) return
      // when the next second has gone
      const left = Number.isFinite(this.target) ? this.target - this.now : 0
      this.timer = setTimeout(() => this.tick(), (left % 1000 || 1000) + 10)
    },
    onVisibility() {
      this.hidden = typeof document !== 'undefined' && document.visibilityState === 'hidden'
      if (this.hidden) clearTimeout(this.timer)
      else this.tick()
    },
    // A page of the site is shown by the site's router where there is one, without loading the site again
    go(event) {
      if (this.inStudio) { event.preventDefault(); return }
      if (event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      if (this.$router && /^\\/(?!\\/)/.test(String(this.doneHref || ''))) { event.preventDefault(); this.$router.push(this.doneHref) }
    }
  },
  watch: {
    target() { this.minute = undefined; this.tick() }
  },
  mounted() {
    if (this.inStudio) this.sample = Date.now() + 12 * DAY + 5 * 3600000 + 42 * 60000 + 30000
    this.hidden = document.visibilityState === 'hidden'
    document.addEventListener('visibilitychange', this.onVisibility)
    this.tick()
  },
  beforeUnmount() {
    clearTimeout(this.timer)
    document.removeEventListener('visibilitychange', this.onVisibility)
  }
}
<\/script>
<style>
.vp-countdown {
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 0;
  color: inherit;
  text-align: center;
}
.vp-countdown--start { align-items: flex-start; text-align: left; }
.vp-countdown__units { display: flex; flex-wrap: wrap; justify-content: center; gap: clamp(0.5rem, 2vw, 1rem); }
.vp-countdown--start .vp-countdown__units { justify-content: flex-start; }
.vp-countdown__unit { display: flex; flex-direction: column; align-items: center; gap: 0.45rem; min-width: 0; }
/* (every digit as wide as the others: nothing moves when they change) */
.vp-countdown__number { font-family: var(--vp-font-heading, inherit); font-size: clamp(1.75rem, 6vw, 2.75rem); font-variant-numeric: tabular-nums; font-weight: 700; line-height: 1; letter-spacing: -0.025em; }
.vp-countdown__label { font-size: 0.6875rem; font-weight: 600; line-height: 1.3; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.7; }
.vp-countdown--boxes .vp-countdown__unit {
  box-sizing: border-box;
  min-width: clamp(4.25rem, 18vw, 6.5rem);
  padding: clamp(0.85rem, 2.2vw, 1.25rem) 0.5rem clamp(0.7rem, 2vw, 1rem);
  border: 1px solid color-mix(in srgb, currentColor 14%, transparent);
  border-radius: var(--vp-radius, 12px);
  background: linear-gradient(180deg, color-mix(in srgb, currentColor 9%, transparent), color-mix(in srgb, currentColor 4%, transparent));
  box-shadow: inset 0 1px 0 color-mix(in srgb, currentColor 10%, transparent);
}
/* (plain and big: a thin line between the units keeps them apart without a box) */
.vp-countdown--plain .vp-countdown__unit + .vp-countdown__unit, .vp-countdown--big .vp-countdown__unit + .vp-countdown__unit { padding-left: clamp(1rem, 4vw, 2rem); border-left: 1px solid color-mix(in srgb, currentColor 16%, transparent); }
.vp-countdown--big .vp-countdown__unit + .vp-countdown__unit { padding-left: clamp(0.75rem, 4vw, 2.5rem); }
.vp-countdown--plain .vp-countdown__units { gap: clamp(1rem, 4vw, 2rem); }
.vp-countdown--plain .vp-countdown__number { font-size: clamp(1.5rem, 5vw, 2.25rem); }
.vp-countdown--big .vp-countdown__units { gap: clamp(0.75rem, 4vw, 2.5rem); }
.vp-countdown--big .vp-countdown__number { font-size: clamp(2.25rem, 10vw, 5.5rem); font-weight: 800; letter-spacing: -0.04em; }
.vp-countdown__said { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
.vp-countdown__done { display: flex; flex-direction: column; align-items: inherit; gap: 0.9rem; }
.vp-countdown__done-text { margin: 0; font-family: var(--vp-font-heading, inherit); font-size: clamp(1.25rem, 3.5vw, 1.75rem); font-weight: 700; line-height: 1.25; }
.vp-countdown__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.7em 1.35em;
  border-radius: var(--vp-radius, 8px);
  background: var(--vp-primary, #2563eb);
  color: var(--vp-primary-contrast, #fff);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16), 0 1px 2px color-mix(in oklch, var(--vp-primary, #2563eb) 40%, transparent);
  font-weight: 600;
  line-height: 1.2;
  text-decoration: none;
  transition: filter 140ms ease, transform 140ms ease;
}
.vp-countdown__button:hover { filter: brightness(1.08); transform: translateY(-1px); }
.vp-countdown__button:focus-visible { outline: 2px solid var(--vp-primary, #2563eb); outline-offset: 2px; }
@media (max-width: 400px) {
  .vp-countdown--boxes .vp-countdown__units { gap: 0.4rem; }
  .vp-countdown--boxes .vp-countdown__unit { min-width: 0; flex: 1 1 0; padding-inline: 0.25rem; }
  .vp-countdown__label { font-size: 0.6875rem; letter-spacing: 0.02em; }
}
@media (prefers-reduced-motion: reduce) {
  .vp-countdown__button { transition: none; }
  .vp-countdown__button:hover { transform: none; }
}
</style>
`;export{e as default};