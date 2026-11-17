var e=`<template>
  <figure class="vp-testimonial" :class="['vp-testimonial--' + look, 'vp-testimonial--' + align]" :style="style">
    <div v-if="count" class="vp-testimonial__stars" role="img" :aria-label="say('stars', '', count)">
      <svg v-for="n in count" :key="n" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.2l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7z" /></svg>
    </div>
    <blockquote class="vp-testimonial__quote">{{ quote }}</blockquote>
    <figcaption class="vp-testimonial__who">
      <img v-if="photo" class="vp-testimonial__photo" :src="picture || undefined" :style="held" alt="" loading="lazy" decoding="async">
      <span v-else-if="initials" class="vp-testimonial__initials" aria-hidden="true">{{ initials }}</span>
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
    // (without a photo: the first letters of the first and the last name, as a round mark)
    initials() {
      const words = String(this.name || '').trim().split(/\\s+/).filter(Boolean)
      const first = word => Array.from(word)[0] || ''
      return (words.length > 1 ? first(words[0]) + first(words[words.length - 1]) : first(words[0] || '')).toUpperCase()
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
  --_accent: var(--vp-primary, #2563eb);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.125rem;
  min-width: 0;
  margin: 0;
  text-align: left;
}
.vp-testimonial--center { align-items: center; text-align: center; }
.vp-testimonial--card {
  padding: clamp(1.5rem, 3vw, 2rem);
  border: 1px solid var(--vp-border, rgba(127, 127, 127, 0.28));
  border-radius: var(--vp-radius, 12px);
  background: var(--vp-surface, transparent);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}
.vp-testimonial__stars { display: flex; gap: 0.125rem; color: var(--vp-testimonial-color, #f5a524); }
.vp-testimonial__stars svg { width: 1rem; height: 1rem; fill: currentColor; stroke: currentColor; stroke-width: 1.5; stroke-linejoin: round; }
.vp-testimonial__quote { margin: 0; font-size: 1.0625rem; line-height: 1.6; letter-spacing: -0.003em; text-wrap: pretty; white-space: pre-line; }
.vp-testimonial--large { gap: 1.5rem; }
.vp-testimonial--large .vp-testimonial__quote { font-family: var(--vp-font-heading, inherit); font-size: clamp(1.375rem, 2.8vw, 2rem); line-height: 1.35; font-weight: 500; letter-spacing: -0.02em; text-wrap: balance; }
/* (a large quote opens with a large quotation mark in the accent colour; screen readers skip it) */
.vp-testimonial--large .vp-testimonial__quote::before {
  content: '\\201C';
  content: '\\201C' / '';
  display: block;
  height: 0.48em;
  margin-bottom: 0.2em;
  color: var(--vp-testimonial-color, var(--vp-primary, #2563eb));
  font-family: var(--vp-font-heading, Georgia, serif);
  font-size: 3.2em;
  font-weight: 700;
  line-height: 1;
  opacity: 0.9;
}
.vp-testimonial__who { display: flex; align-items: center; gap: 0.8rem; margin-top: auto; }
/* (in a card the name line stands on a hairline, so cards of different lengths end alike) */
.vp-testimonial--card .vp-testimonial__who { align-self: stretch; padding-top: 1.125rem; border-top: 1px solid var(--vp-border, rgba(127, 127, 127, 0.22)); }
.vp-testimonial--center .vp-testimonial__who { justify-content: center; }
.vp-testimonial__photo, .vp-testimonial__initials { flex: none; width: 2.75rem; height: 2.75rem; border-radius: 999px; }
.vp-testimonial__photo { object-fit: cover; box-shadow: 0 0 0 1px var(--vp-border, rgba(127, 127, 127, 0.22)); }
/* (nobody's photo: their initials on a tint of the site's colour) */
.vp-testimonial__initials { display: inline-flex; align-items: center; justify-content: center; background: color-mix(in oklch, var(--_accent) 14%, transparent); color: color-mix(in oklch, var(--_accent) 78%, var(--vp-text, currentColor)); font-size: 0.875rem; font-weight: 650; letter-spacing: 0.02em; line-height: 1; }
.vp-testimonial--large .vp-testimonial__photo, .vp-testimonial--large .vp-testimonial__initials { width: 3.25rem; height: 3.25rem; }
.vp-testimonial__names { display: flex; flex-direction: column; gap: 0.1rem; min-width: 0; text-align: left; line-height: 1.35; }
.vp-testimonial__name { font-size: 0.9375rem; font-weight: 650; }
.vp-testimonial__role { color: color-mix(in oklch, currentColor 62%, transparent); font-size: 0.8125rem; }
</style>
`;export{e as default};