var e=`<template>
  <figure class="vp-testimonial" :class="['vp-testimonial--' + look, 'vp-testimonial--' + align]" :style="style">
    <div v-if="count" class="vp-testimonial__stars" role="img" :aria-label="say('stars', '', count)">
      <svg v-for="n in count" :key="n" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.2l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7z" /></svg>
    </div>
    <blockquote class="vp-testimonial__quote">{{ quote }}</blockquote>
    <figcaption class="vp-testimonial__who">
      <img v-if="photo" class="vp-testimonial__photo" :src="picture || undefined" :style="held" alt="" loading="lazy" decoding="async">
      <span class="vp-testimonial__names">
        <span v-if="name" class="vp-testimonial__name">{{ name }}</span>
        <span v-if="role" class="vp-testimonial__role">{{ role }}</span>
      </span>
    </figcaption>
  </figure>
</template>
<script>
// What someone said about you: their words, who they are, and stars when they gave some.
// (A picture picked in the Studio is the name of a variable that holds it, like --image-boat: it is shown
// through that variable at once, and its address is read from it when the page is alive. An address is used as it is.)

// The words it says itself, in the site's language (App.vue's head says it: \`htmlAttrs: { lang }\`). A text
// that is filled in in the Props tab is said as it is written.
const WORDS = {
  en: { stars: '{n} of 5 stars' },
  nb: { stars: '{n} av 5 stjerner' },
  sv: { stars: '{n} av 5 stjärnor' },
  da: { stars: '{n} ud af 5 stjerner' },
  fi: { stars: '{n}/5 tähteä' },
  de: { stars: '{n} von 5 Sternen' },
  fr: { stars: '{n} étoiles sur 5' },
  es: { stars: '{n} de 5 estrellas' },
  it: { stars: '{n} stelle su 5' },
  nl: { stars: '{n} van 5 sterren' },
  pt: { stars: '{n} de 5 estrelas' },
  pl: { stars: '{n} na 5 gwiazdek' },
  zh: { stars: '{n}/5 星' },
  ja: { stars: '5つ星中{n}つ星' }
}

export default {
  props: {
    quote: {
      type: String,
      default: 'This is what a happy customer said. Keep it short, in their own words.',
      label: 'What they said',
      control: 'textarea'
    },
    name: { type: String, default: 'Ada Nilsen', label: 'Name' },
    role: { type: String, default: 'Founder, Northwind', label: 'Who they are' },
    photo: { type: String, default: '', label: 'Photo', control: 'media' },
    stars: { type: Number, default: 5, label: 'Stars', control: 'number', min: 0, max: 5 },
    look: {
      type: String,
      default: 'card',
      label: 'Look',
      options: [{ key: 'Card', value: 'card' }, { key: 'Plain', value: 'plain' }, { key: 'Large quote', value: 'large' }]
    },
    align: {
      type: String,
      default: 'left',
      label: 'Align',
      options: [{ key: 'Left', value: 'left' }, { key: 'Center', value: 'center' }]
    },
    color: { type: String, default: '', label: 'Star color', control: 'color' }
  },
  data() {
    return { found: '' }
  },
  watch: {
    photo() {
      this.find()
    }
  },
  mounted() {
    this.find()
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
    named() {
      return /^--/.test(this.photo)
    },
    picture() {
      return this.named ? this.found : this.photo
    },
    held() {
      return this.named && !this.found ? { content: 'var(' + this.photo + ')' } : undefined
    },
    count() {
      return Math.max(0, Math.min(5, Math.round(Number(this.stars) || 0)))
    },
    style() {
      return { '--vp-testimonial-color': this.color || undefined }
    }
  },
  methods: {
    say(key, own, n) {
      if (own) return own
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return String(words[key] ?? WORDS.en[key]).replace('{n}', n ?? '')
    },
    find() {
      const value = this.named && this.$el && this.$el.nodeType === 1 ? getComputedStyle(this.$el).getPropertyValue(this.photo) : ''
      const address = /^\\s*url\\(\\s*(['"]?)(.*?)\\1\\s*\\)\\s*$/.exec(value)
      this.found = address ? address[2] : ''
    }
  }
}
<\/script>
<style>
.vp-testimonial {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  min-width: 0;
  margin: 0;
  text-align: left;
}
.vp-testimonial--center { align-items: center; text-align: center; }
.vp-testimonial--card {
  padding: clamp(1.25rem, 3vw, 1.75rem);
  border: 1px solid var(--vp-border, rgba(127, 127, 127, 0.28));
  border-radius: var(--vp-radius, 12px);
  background: var(--vp-surface, transparent);
}
.vp-testimonial__stars { display: flex; gap: 0.15rem; color: var(--vp-testimonial-color, #f5a524); }
.vp-testimonial__stars svg { width: 1.1rem; height: 1.1rem; fill: currentColor; }
.vp-testimonial__quote { margin: 0; line-height: 1.65; white-space: pre-line; }
.vp-testimonial--large .vp-testimonial__quote { font-size: clamp(1.25rem, 2.6vw, 1.75rem); line-height: 1.45; font-weight: 500; }
/* (a large quote opens with a large quotation mark in the accent colour; screen readers skip it) */
.vp-testimonial--large .vp-testimonial__quote::before {
  content: '\\201C';
  content: '\\201C' / '';
  display: block;
  height: 0.5em;
  margin-bottom: 0.15em;
  color: var(--vp-testimonial-color, var(--vp-primary, #2563eb));
  font-family: var(--vp-font-heading, Georgia, serif);
  font-size: 3em;
  font-weight: 700;
  line-height: 1;
}
.vp-testimonial__who { display: flex; align-items: center; gap: 0.75rem; margin-top: auto; }
.vp-testimonial__photo { width: 2.75rem; height: 2.75rem; border-radius: 999px; object-fit: cover; }
.vp-testimonial__names { display: flex; flex-direction: column; text-align: left; line-height: 1.35; }
.vp-testimonial__name { font-weight: 650; }
.vp-testimonial__role { font-size: 0.875rem; opacity: 0.65; }
</style>
`;export{e as default};