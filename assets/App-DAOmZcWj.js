var e=`<template>
  <component :is="tag" class="vp-paragraph" :class="classes" :style="style" :tabindex="tag === 'pre' ? 0 : undefined">
    <slot>{{ say('empty') }}</slot>
  </component>
</template>
<script>
// Running text: a paragraph, a lead under a heading, a small note; or a command or a bit of code, in a font
// whose letters are all as wide (\`font: mono\`), kept as it is written in a block that scrolls sideways (\`pre\`).

// The words it says itself until it is written in, in the site's language (App.vue's head says it:
// \`htmlAttrs: { lang }\`)
const WORDS = {
  en: { empty: 'Write something here. Double-click the text to change it.' },
  nb: { empty: 'Skriv noe her. Dobbeltklikk på teksten for å endre den.' },
  sv: { empty: 'Skriv något här. Dubbelklicka på texten för att ändra den.' },
  da: { empty: 'Skriv noget her. Dobbeltklik på teksten for at ændre den.' },
  fi: { empty: 'Kirjoita jotain tähän. Muuta tekstiä kaksoisnapsauttamalla sitä.' },
  de: { empty: 'Schreib hier etwas. Doppelklicke auf den Text, um ihn zu ändern.' },
  fr: { empty: 'Écrivez quelque chose ici. Double-cliquez sur le texte pour le modifier.' },
  es: { empty: 'Escribe algo aquí. Haz doble clic en el texto para cambiarlo.' },
  it: { empty: 'Scrivi qualcosa qui. Fai doppio clic sul testo per modificarlo.' },
  nl: { empty: 'Schrijf hier iets. Dubbelklik op de tekst om hem te wijzigen.' },
  pt: { empty: 'Escreva algo aqui. Clique duas vezes no texto para o alterar.' },
  pl: { empty: 'Napisz tu coś. Kliknij dwukrotnie tekst, aby go zmienić.' },
  zh: { empty: '在这里写点什么。双击文字即可修改。' },
  ja: { empty: 'ここに何か書いてください。テキストをダブルクリックすると変更できます。' }
}

export default {
  wysiwyg: true,
  props: {
    size: {
      type: String,
      default: 'medium',
      label: 'Size',
      options: [{ key: 'Small', value: 'small' }, { key: 'Medium', value: 'medium' }, { key: 'Large (a lead)', value: 'large' }]
    },
    align: {
      type: String,
      default: '',
      label: 'Align',
      options: [{ key: 'As around it', value: '' }, { key: 'Left', value: 'left' }, { key: 'Center', value: 'center' }, { key: 'Right', value: 'right' }]
    },
    muted: { type: Boolean, default: false, label: 'Quieter (grey)' },
    color: { type: String, default: '', label: 'Color', control: 'color' },
    width: { type: String, default: '', label: 'Widest', control: 'slider', unit: 'px', min: 200, max: 1200, placeholder: 'No limit' },
    font: {
      type: String,
      default: '',
      label: 'Font',
      options: [{ key: 'As the page', value: '' }, { key: 'Code (monospace)', value: 'mono' }]
    },
    tag: {
      type: String,
      default: 'p',
      label: 'Kind',
      options: [{ key: 'Paragraph', value: 'p' }, { key: 'Plain (div)', value: 'div' }, { key: 'In a line (span)', value: 'span' }, { key: 'As written (pre: keeps its lines)', value: 'pre' }]
    }
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
    classes() {
      return [
        'vp-paragraph--' + this.size,
        this.align ? 'vp-paragraph--' + this.align : '',
        {
          'vp-paragraph--muted': this.muted,
          'vp-paragraph--mono': this.font === 'mono' || this.tag === 'pre',
          'vp-paragraph--pre': this.tag === 'pre',
          // in a line it is in the line, until it is given a width or an alignment to stand in
          'vp-paragraph--inline': this.tag === 'span' && !this.width && !this.align,
          'vp-paragraph--inline-block': this.tag === 'span' && !!(this.width || this.align)
        }
      ]
    },
    style() {
      return { color: this.color || undefined, maxWidth: this.width || undefined }
    }
  },
  methods: {
    say(key) {
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return words[key] ?? WORDS.en[key]
    }
  }
}
<\/script>
<style>
.vp-paragraph {
  display: block;
  box-sizing: border-box;
  margin: 0;
  max-width: 100%;
  line-height: 1.65;
  overflow-wrap: break-word;
}
.vp-paragraph--inline { display: inline; }
.vp-paragraph--inline-block { display: inline-block; vertical-align: top; }
.vp-paragraph--small { font-size: 0.875rem; line-height: 1.55; }
.vp-paragraph--medium { font-size: 1rem; }
.vp-paragraph--large { font-size: clamp(1.075rem, 1rem + 0.45vw, 1.3rem); line-height: 1.55; }
.vp-paragraph--muted { color: var(--vp-muted, #64748b); }
.vp-paragraph--mono { font-family: var(--vp-font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace); letter-spacing: 0; }
/* kept as written: its lines and spaces stay, and a long line scrolls sideways instead of running out */
.vp-paragraph--pre {
  white-space: pre;
  overflow-wrap: normal;
  overflow-x: auto;
  tab-size: 2;
  padding: 0.85em 1em;
  border: 1px solid var(--vp-border, rgba(127, 127, 127, 0.22));
  border-radius: var(--vp-radius, 8px);
  background: var(--vp-surface, rgba(127, 127, 127, 0.08));
  line-height: 1.55;
}
.vp-paragraph--pre:focus-visible { outline: 2px solid var(--vp-primary, #2563eb); outline-offset: 2px; }
/* aligned by itself it also stands there, in a section or a stack that lines its parts up another way */
.vp-paragraph--left { align-self: flex-start; margin-right: auto; text-align: left; }
.vp-paragraph--center { align-self: center; margin-inline: auto; text-align: center; }
.vp-paragraph--right { align-self: flex-end; margin-left: auto; text-align: right; }
</style>
`;export{e as default};