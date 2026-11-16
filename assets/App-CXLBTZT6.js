var e=`<template>
  <figure class="vp-code-block" :class="['vp-code-block--' + tone, { 'vp-code-block--numbers': lineNumbers, 'vp-code-block--wrap': wrap }]" :style="style">
    <figcaption v-if="name || copy" class="vp-code-block__bar">
      <span class="vp-code-block__name">{{ name }}</span>
      <button v-if="copy" type="button" class="vp-code-block__copy" :class="{ 'vp-code-block__copy--done': copied === 'yes' }" @click="copyCode">
        <svg v-if="copied === 'yes'" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
        <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="M9 9h10a2 2 0 012 2v8a2 2 0 01-2 2h-8a2 2 0 01-2-2V9z" /><path d="M5 15H4a2 2 0 01-2-2V5a2 2 0 012-2h8a2 2 0 012 2v1" /></svg>
        <span>{{ copied === 'yes' ? say('copied') : say('copy') }}</span>
      </button>
    </figcaption>
    <pre
      ref="scroller"
      class="vp-code-block__pre"
      :tabindex="scrolls ? 0 : undefined"
      :role="scrolls ? 'region' : undefined"
      :aria-label="scrolls ? (name ? name + ' · ' : '') + say('code') : undefined"
    ><code class="vp-code-block__code"><span v-for="(line, n) in lines" :key="n" class="vp-code-block__line"><span v-for="(token, k) in line" :key="k" :class="token.type === 'plain' ? undefined : 'vp-code-block__t-' + token.type">{{ token.text }}</span></span></code></pre>
    <span class="vp-code-block__said" role="status" aria-live="polite">{{ copied === 'yes' ? say('copied') : copied === 'no' ? say('failed') : '' }}</span>
  </figure>
</template>
<script>
// Code: lines of code in letters that are all as wide, with a button that copies them, a label (the language,
// or a file's name), numbers before the lines and long lines wrapped if asked. JavaScript, TypeScript, HTML,
// Vue, CSS, JSON, the shell and Python are coloured lightly by a small reader of their words below: each piece
// is a <span> of its own, so the code is only ever shown as text. A block wider than the screen scrolls
// sideways inside itself (and can then be reached with Tab and scrolled with the arrows).
// In the editor an empty block shows a sample.
const SAMPLE = "// Say hello to whoever comes by\\nfunction greet(name = 'friend') {\\n  const hour = new Date().getHours()\\n  return (hour < 12 ? 'Good morning, ' : 'Hello, ') + name + '!'\\n}\\n\\nconsole.log(greet('Ada'))"

const NAMES = { js: 'JavaScript', ts: 'TypeScript', html: 'HTML', vue: 'Vue', css: 'CSS', json: 'JSON', bash: 'Shell', python: 'Python', text: '' }
const JS_WORDS = 'async await break case catch class const continue debugger default delete do else export extends finally for from function if in instanceof let new of return static super switch this throw try typeof var void while with yield true false null undefined interface type enum implements private public protected readonly as declare namespace abstract keyof'
const PY_WORDS = 'and as assert async await break class continue def del elif else except False finally for from global if in is lambda None nonlocal not or pass raise return True try while with yield self match case'
const SH_WORDS = 'if then else elif fi for while until do done case esac in function return export local sudo'
// (the word that brings in a module is joined from two halves: a library component's source never says it, see the tests)
const MODULE_WORD = ['im', 'port'].join('')
const set = words => new Set((words + ' ' + MODULE_WORD).split(' '))
const KEYWORDS = { js: set(JS_WORDS), py: set(PY_WORDS), sh: set(SH_WORDS) }

// The rules of each language: [kind, pattern], tried in order where the reading stands; the first that matches wins
const R = (kind, source, flags = '') => [kind, new RegExp(source, 'y' + flags)]
const STRING_RULES = [R('string', '"(?:[^"\\\\\\\\\\\\n]|\\\\\\\\.)*"?'), R('string', "'(?:[^'\\\\\\\\\\\\n]|\\\\\\\\.)*'?")]
const RULES = {
  js: [
    R('comment', '\\\\/\\\\/[^\\\\n]*'), R('comment', '\\\\/\\\\*[\\\\s\\\\S]*?(?:\\\\*\\\\/|$)'),
    R('string', '\`(?:[^\`\\\\\\\\]|\\\\\\\\[\\\\s\\\\S])*\`?'), ...STRING_RULES,
    R('number', '\\\\b(?:0[xob][\\\\da-f_]+|\\\\d[\\\\d_]*(?:\\\\.\\\\d+)?(?:e[+-]?\\\\d+)?n?)\\\\b', 'i'),
    R('fn', '[A-Za-z_$][\\\\w$]*(?=\\\\s*\\\\()'), R('word', '[A-Za-z_$][\\\\w$]*'),
    R('punct', '[{}()[\\\\];,.:?<>=!&|+\\\\-*/%^~]+')
  ],
  css: [
    R('comment', '\\\\/\\\\*[\\\\s\\\\S]*?(?:\\\\*\\\\/|$)'), ...STRING_RULES,
    R('keyword', '@[\\\\w-]+'), R('key', '-{0,2}[A-Za-z][\\\\w-]*(?=\\\\s*:(?!:?[a-z-]+\\\\s*[{,]))'),
    R('number', '#[\\\\da-f]{3,8}\\\\b|-?\\\\d*\\\\.?\\\\d+(?:%|[a-z]+)?', 'i'),
    R('fn', '[A-Za-z-]+(?=\\\\()'), R('tag', '[.#]?[A-Za-z_][\\\\w-]*'),
    R('punct', '[{}();,:>+~*=[\\\\]]+')
  ],
  json: [
    R('key', '"(?:[^"\\\\\\\\\\\\n]|\\\\\\\\.)*"(?=\\\\s*:)'), R('string', '"(?:[^"\\\\\\\\\\\\n]|\\\\\\\\.)*"?'),
    R('number', '-?\\\\d+(?:\\\\.\\\\d+)?(?:e[+-]?\\\\d+)?', 'i'), R('keyword', '\\\\b(?:true|false|null)\\\\b'), R('punct', '[{}[\\\\],:]')
  ],
  sh: [
    R('comment', '(?:^|(?<=\\\\s))#[^\\\\n]*'), ...STRING_RULES, R('key', '\\\\$\\\\{[^}\\\\n]*\\\\}?|\\\\$[A-Za-z_]\\\\w*|\\\\$[0-9@#?$!*-]'),
    R('keyword', '(?<=\\\\s|^)--?[A-Za-z][\\\\w-]*'), R('number', '\\\\b\\\\d+(?:\\\\.\\\\d+)?\\\\b'),
    R('word', '[^\\\\s|;&<>()\\'"$#]+'), R('punct', '[|;&<>()]+')
  ],
  py: [
    R('comment', '#[^\\\\n]*'), R('string', '[rbfu]{0,2}(?:"""[\\\\s\\\\S]*?(?:"""|$)|\\'\\'\\'[\\\\s\\\\S]*?(?:\\'\\'\\'|$))', 'i'),
    R('string', '[rbfu]{0,2}(?:"(?:[^"\\\\\\\\\\\\n]|\\\\\\\\.)*"?|\\'(?:[^\\'\\\\\\\\\\\\n]|\\\\\\\\.)*\\'?)', 'i'),
    R('keyword', '@[\\\\w.]+'), R('number', '\\\\b(?:0[xob][\\\\da-f_]+|\\\\d[\\\\d_]*(?:\\\\.\\\\d+)?(?:e[+-]?\\\\d+)?j?)\\\\b', 'i'),
    R('fn', '[A-Za-z_]\\\\w*(?=\\\\s*\\\\()'), R('word', '[A-Za-z_]\\\\w*'), R('punct', '[{}()[\\\\];,.:<>=!&|+\\\\-*/%^~]+')
  ]
}
const TAG_RULES = [
  R('space', '\\\\s+'), R('punct', '\\\\/?>'), R('string', '"[^"]*"?|\\'[^\\']*\\'?'), R('punct', '='),
  R('key', '[^\\\\s"\\'=<>/]+')
]

// Reads code into pieces of a kind: comment, string, number, keyword, fn (a call), key (a property, an attribute),
// tag, punct and plain
function read(code, language) {
  const out = []
  const push = (type, text) => {
    if (!text) return
    const last = out[out.length - 1]
    if (last && last.type === type) last.text += text
    else out.push({ type, text })
  }
  const run = (rules, words, text, at = 0, end = text.length) => {
    let command = true
    while (at < end) {
      let done = false
      for (const [kind, pattern] of rules) {
        pattern.lastIndex = at
        const found = pattern.exec(text)
        if (!found || !found[0] || found.index !== at || at + found[0].length > end) continue
        let type = kind
        const piece = found[0]
        if (kind === 'word') type = words && words.has(piece) ? 'keyword' : language === 'bash' && command ? 'fn' : 'plain'
        if (language === 'bash' && !/^\\s+$/.test(piece)) command = type === 'punct' || (type === 'keyword' && kind === 'word')
        push(type, piece)
        at += piece.length
        done = true
        break
      }
      if (!done) {
        const c = text[at]
        if (c === '\\n' && language === 'bash') command = true
        push('plain', c)
        at++
      }
    }
  }
  if (language === 'html' || language === 'vue') {
    // tags and their attributes; what a script tag holds is read as code, a style tag's as CSS
    let at = 0
    while (at < code.length) {
      if (code.startsWith('<!--', at)) {
        const end = code.indexOf('-->', at)
        const stop = end === -1 ? code.length : end + 3
        push('comment', code.slice(at, stop))
        at = stop
        continue
      }
      const open = /<\\/?[A-Za-z][\\w:-]*/y
      open.lastIndex = at
      const tag = open.exec(code)
      if (!tag) {
        const next = code.indexOf('<', at + 1)
        const stop = next === -1 ? code.length : next
        push('plain', code.slice(at, stop))
        at = stop
        continue
      }
      push('punct', tag[0].startsWith('</') ? '</' : '<')
      push('tag', tag[0].replace(/^<\\/?/, ''))
      at += tag[0].length
      while (at < code.length) {
        let matched = false
        for (const [kind, pattern] of TAG_RULES) {
          pattern.lastIndex = at
          const found = pattern.exec(code)
          if (!found || !found[0]) continue
          push(kind === 'space' ? 'plain' : kind, found[0])
          at += found[0].length
          matched = true
          if (kind === 'punct' && found[0].endsWith('>')) at = -at
          break
        }
        if (at < 0) { at = -at; break }
        if (!matched) { push('plain', code[at]); at++ }
      }
      const name = tag[0].slice(1).toLowerCase()
      if (name === 'script' || name === 'style') {
        const close = code.toLowerCase().indexOf('</' + name, at)
        const stop = close === -1 ? code.length : close
        run(name === 'script' ? RULES.js : RULES.css, name === 'script' ? KEYWORDS.js : null, code, at, stop)
        at = stop
      }
    }
    return out
  }
  const kind = language === 'ts' ? 'js' : language === 'bash' ? 'sh' : language === 'python' ? 'py' : language
  if (!RULES[kind]) return [{ type: 'plain', text: code }]
  run(RULES[kind], KEYWORDS[kind] || null, code)
  return out
}

// The words it says itself, in the site's language
const WORDS = {
  en: { copy: 'Copy', copied: 'Copied', failed: 'Could not copy', code: 'Code' },
  nb: { copy: 'Kopier', copied: 'Kopiert', failed: 'Kunne ikke kopiere', code: 'Kode' },
  sv: { copy: 'Kopiera', copied: 'Kopierat', failed: 'Kunde inte kopiera', code: 'Kod' },
  da: { copy: 'Kopiér', copied: 'Kopieret', failed: 'Kunne ikke kopiere', code: 'Kode' },
  fi: { copy: 'Kopioi', copied: 'Kopioitu', failed: 'Kopiointi epäonnistui', code: 'Koodi' },
  de: { copy: 'Kopieren', copied: 'Kopiert', failed: 'Kopieren fehlgeschlagen', code: 'Code' },
  fr: { copy: 'Copier', copied: 'Copié', failed: 'Copie impossible', code: 'Code' },
  es: { copy: 'Copiar', copied: 'Copiado', failed: 'No se pudo copiar', code: 'Código' },
  it: { copy: 'Copia', copied: 'Copiato', failed: 'Impossibile copiare', code: 'Codice' },
  nl: { copy: 'Kopiëren', copied: 'Gekopieerd', failed: 'Kopiëren mislukt', code: 'Code' },
  pt: { copy: 'Copiar', copied: 'Copiado', failed: 'Não foi possível copiar', code: 'Código' },
  pl: { copy: 'Kopiuj', copied: 'Skopiowano', failed: 'Nie udało się skopiować', code: 'Kod' },
  zh: { copy: '复制', copied: '已复制', failed: '无法复制', code: '代码' },
  ja: { copy: 'コピー', copied: 'コピーしました', failed: 'コピーできませんでした', code: 'コード' }
}
const TONES = ['site', 'dark', 'light']

export default {
  props: {
    code: { type: String, default: '', label: 'Code', control: 'textarea', placeholder: 'npm install my-package' },
    language: {
      type: String,
      default: '',
      label: 'Language',
      control: 'select',
      options: [
        { key: 'Plain text', value: '' }, { key: 'JavaScript', value: 'js' }, { key: 'TypeScript', value: 'ts' }, { key: 'HTML', value: 'html' }, { key: 'Vue', value: 'vue' },
        { key: 'CSS', value: 'css' }, { key: 'JSON', value: 'json' }, { key: 'Shell (bash)', value: 'bash' }, { key: 'Python', value: 'python' }
      ]
    },
    label: { type: String, default: '', label: 'Label', placeholder: 'The language, or a file name like main.js' },
    showLanguage: { type: Boolean, default: true, label: 'Show the language when there is no label' },
    copy: { type: Boolean, default: true, label: 'A button that copies it' },
    lineNumbers: { type: Boolean, default: false, label: 'Number the lines' },
    wrap: { type: Boolean, default: false, label: 'Wrap long lines' },
    theme: { type: String, default: 'dark', label: 'Colours', control: 'select', options: [{ key: 'Dark', value: 'dark' }, { key: 'Light', value: 'light' }, { key: 'As the site', value: 'site' }] },
    size: { type: String, default: 'medium', label: 'Text size', control: 'select', options: [{ key: 'Small', value: 'small' }, { key: 'Medium', value: 'medium' }, { key: 'Large', value: 'large' }] },
    maxHeight: { type: String, default: '', label: 'Highest (then it scrolls)', control: 'slider', unit: 'px', min: 120, max: 1200 }
  },
  data() {
    return { copied: '', scrolls: false }
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
    tone() {
      return TONES.includes(this.theme) ? this.theme : 'dark'
    },
    sample() {
      return !this.code && this.inStudio
    },
    // (the text as it is, without the line breaks it may start and end with)
    text() {
      return String(this.sample ? SAMPLE : this.code || '').replace(/\\r\\n?/g, '\\n').replace(/^\\n+|\\s+$/g, '')
    },
    kind() {
      return this.sample ? 'js' : Object.prototype.hasOwnProperty.call(NAMES, this.language) ? this.language : ''
    },
    name() {
      return this.label || (this.showLanguage && NAMES[this.kind]) || ''
    },
    // The pieces, line by line
    lines() {
      const lines = [[]]
      for (const token of read(this.text, this.kind)) {
        const parts = token.text.split('\\n')
        parts.forEach((part, n) => {
          if (n) lines.push([])
          if (part) lines[lines.length - 1].push({ type: token.type, text: part })
        })
      }
      return lines
    },
    style() {
      return {
        '--vp-code-block-max': this.maxHeight || undefined,
        '--vp-code-block-digits': String(this.lines.length).length + 'ch',
        '--vp-code-block-size': this.size === 'small' ? '0.8125rem' : this.size === 'large' ? '1rem' : undefined
      }
    }
  },
  methods: {
    say(key) {
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return words[key] ?? WORDS.en[key]
    },
    async copyCode() {
      clearTimeout(this.copyTimer)
      try {
        if (!navigator.clipboard || typeof navigator.clipboard.writeText !== 'function') throw new Error('No clipboard')
        await navigator.clipboard.writeText(this.text)
        this.copied = 'yes'
      } catch (e) {
        this.copied = 'no'
      }
      this.copyTimer = setTimeout(() => { this.copied = '' }, 2000)
    },
    // Whether the block is wider than its place: then it can be reached with Tab, to scroll it with the keys
    measure() {
      const box = this.$refs.scroller
      if (box) this.scrolls = box.scrollWidth > box.clientWidth + 1 || box.scrollHeight > box.clientHeight + 1
    }
  },
  watch: {
    text() { this.$nextTick(() => this.measure()) },
    wrap() { this.$nextTick(() => this.measure()) }
  },
  mounted() {
    this.measure()
    if (typeof ResizeObserver !== 'undefined' && this.$refs.scroller) {
      this.observer = new ResizeObserver(() => this.measure())
      this.observer.observe(this.$refs.scroller)
    }
  },
  beforeUnmount() {
    clearTimeout(this.copyTimer)
    this.observer?.disconnect()
  }
}
<\/script>
<style>
.vp-code-block {
  --_back: #0f172a;
  --_text: #e2e8f0;
  --_bar: #1e293b;
  --_line: #334155;
  --_muted: #94a3b8;
  --_comment: #94a3b8;
  --_keyword: #c4b5fd;
  --_string: #86efac;
  --_number: #fdba74;
  --_fn: #7dd3fc;
  --_key: #67e8f9;
  --_tag: #f9a8d4;
  --_punct: #cbd5e1;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  min-width: 0;
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--_line);
  border-radius: var(--vp-radius, 10px);
  background: var(--_back);
  color: var(--_text);
  text-align: left;
}
.vp-code-block--light {
  --_back: #f8fafc;
  --_text: #0f172a;
  --_bar: #eef2f7;
  --_line: #d8dee8;
  --_muted: #475569;
  --_comment: #57606a;
  --_keyword: #6d28d9;
  --_string: #15803d;
  --_number: #b45309;
  --_fn: #1d4ed8;
  --_key: #0e7490;
  --_tag: #be185d;
  --_punct: #334155;
}
/* As the site: its quiet background and its text; each colour leans to the text so it reads in light and dark */
.vp-code-block--site {
  --_back: var(--vp-surface, color-mix(in srgb, currentColor 5%, transparent));
  --_text: var(--vp-text, CanvasText);
  --_bar: color-mix(in srgb, var(--_text) 6%, var(--_back));
  --_line: var(--vp-border, color-mix(in srgb, currentColor 18%, transparent));
  --_muted: var(--vp-muted, color-mix(in srgb, var(--_text) 70%, transparent));
  --_comment: var(--vp-muted, color-mix(in srgb, var(--_text) 70%, transparent));
  --_keyword: color-mix(in srgb, #7c3aed 62%, var(--_text));
  --_string: color-mix(in srgb, #059669 62%, var(--_text));
  --_number: color-mix(in srgb, #c2410c 62%, var(--_text));
  --_fn: color-mix(in srgb, var(--vp-primary, #2563eb) 62%, var(--_text));
  --_key: color-mix(in srgb, #0e7490 62%, var(--_text));
  --_tag: color-mix(in srgb, #be185d 62%, var(--_text));
  --_punct: color-mix(in srgb, var(--_text) 82%, transparent);
}
.vp-code-block__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  min-height: 2.5rem;
  padding: 0.3rem 0.4rem 0.3rem 1rem;
  border-bottom: 1px solid var(--_line);
  background: var(--_bar);
  color: var(--_muted);
  font-size: 0.8125rem;
}
.vp-code-block__name { min-width: 0; overflow: hidden; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }
.vp-code-block__copy {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 0.4em;
  margin-left: auto;
  padding: 0.4em 0.7em;
  border: 1px solid transparent;
  border-radius: calc(var(--vp-radius, 10px) * 0.6);
  background: transparent;
  color: var(--_text);
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}
.vp-code-block__copy:hover { background: color-mix(in srgb, var(--_text) 10%, transparent); }
.vp-code-block__copy:focus-visible { outline: 2px solid var(--_fn); outline-offset: 1px; }
.vp-code-block__copy svg { width: 1.1em; height: 1.1em; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.vp-code-block__copy--done { color: var(--_string); }
.vp-code-block__pre {
  box-sizing: border-box;
  max-height: var(--vp-code-block-max, none);
  margin: 0;
  padding: 1rem 0;
  overflow: auto;
  background: transparent;
  color: inherit;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace;
  font-size: var(--vp-code-block-size, 0.875rem);
  line-height: 1.65;
  tab-size: 2;
  -webkit-overflow-scrolling: touch;
}
.vp-code-block__pre:focus-visible { outline: 2px solid var(--_fn); outline-offset: -2px; }
.vp-code-block__code { display: block; min-width: max-content; font: inherit; white-space: pre; background: none; color: inherit; padding: 0; }
.vp-code-block__line { position: relative; display: block; min-height: 1.65em; padding: 0 1rem; }
.vp-code-block--numbers .vp-code-block__code { counter-reset: vp-code-block-line; }
.vp-code-block--numbers .vp-code-block__line { padding-left: calc(var(--vp-code-block-digits, 2ch) + 2rem); counter-increment: vp-code-block-line; }
/* (the number is drawn, not written: copying the lines does not take it along) */
.vp-code-block--numbers .vp-code-block__line::before {
  content: counter(vp-code-block-line);
  position: absolute;
  left: 1rem;
  width: var(--vp-code-block-digits, 2ch);
  color: var(--_muted);
  text-align: right;
  user-select: none;
}
.vp-code-block--wrap .vp-code-block__code { min-width: 0; white-space: pre-wrap; overflow-wrap: anywhere; }
.vp-code-block__t-comment { color: var(--_comment); font-style: italic; }
.vp-code-block__t-keyword { color: var(--_keyword); }
.vp-code-block__t-string { color: var(--_string); }
.vp-code-block__t-number { color: var(--_number); }
.vp-code-block__t-fn { color: var(--_fn); }
.vp-code-block__t-key { color: var(--_key); }
.vp-code-block__t-tag { color: var(--_tag); }
.vp-code-block__t-punct { color: var(--_punct); }
.vp-code-block__said { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
@media (prefers-reduced-motion: reduce) {
  .vp-code-block__copy { transition: none; }
}
</style>
`;export{e as default};