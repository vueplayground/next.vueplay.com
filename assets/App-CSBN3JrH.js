var e=`<template>
  <figure class="vp-image" :class="{ 'vp-image--shadow': shadow }" :style="style">
    <img v-if="src" class="vp-image__img" :src="picture || undefined" :style="held" :alt="alt" :loading="eager ? 'eager' : 'lazy'" :fetchpriority="eager ? 'high' : undefined" decoding="async">
    <div v-else class="vp-image__empty" role="img" :aria-label="say('none', alt)">
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="M4 18l5-5 3.5 3.5L16 13l4 4" /></svg>
    </div>
    <figcaption v-if="caption" class="vp-image__caption">{{ caption }}</figcaption>
  </figure>
</template>
<script>
// A picture from the project's files, cut to a shape that stays the same on every screen. Until one is
// chosen it shows a grey box of that shape, so the page can be laid out first.
// (A picture picked in the Studio is the name of a variable that holds it, like --image-boat: it is shown
// through that variable at once, and its address is read from it when the page is alive. An address is used as it is.)

// The words it says itself, in the site's language (App.vue's head says it: \`htmlAttrs: { lang }\`). A text
// that is filled in in the Props tab is said as it is written.
const WORDS = {
  en: { none: 'No image chosen yet' },
  nb: { none: 'Ikke noe bilde valgt ennå' },
  sv: { none: 'Ingen bild vald än' },
  da: { none: 'Intet billede valgt endnu' },
  fi: { none: 'Kuvaa ei ole vielä valittu' },
  de: { none: 'Noch kein Bild gewählt' },
  fr: { none: 'Aucune image choisie pour l’instant' },
  es: { none: 'Aún no se ha elegido ninguna imagen' },
  it: { none: 'Nessuna immagine ancora scelta' },
  nl: { none: 'Nog geen afbeelding gekozen' },
  pt: { none: 'Ainda não foi escolhida nenhuma imagem' },
  pl: { none: 'Nie wybrano jeszcze zdjęcia' },
  zh: { none: '尚未选择图片' },
  ja: { none: '画像はまだ選択されていません' }
}

export default {
  props: {
    src: { type: String, default: '', label: 'Image', control: 'media' },
    alt: { type: String, default: '', label: 'What it shows', placeholder: 'For screen readers and search engines' },
    shape: {
      type: String,
      default: 'auto',
      label: 'Shape',
      options: [{ key: 'As the image', value: 'auto' }, { key: 'Square', value: '1 / 1' }, { key: 'Photo (4:3)', value: '4 / 3' }, { key: 'Wide (16:9)', value: '16 / 9' }, { key: 'Banner (21:9)', value: '21 / 9' }, { key: 'Portrait (3:4)', value: '3 / 4' }]
    },
    fit: {
      type: String,
      default: 'cover',
      label: 'In its shape',
      options: [{ key: 'Fill it (may cut)', value: 'cover' }, { key: 'Show all of it', value: 'contain' }]
    },
    width: { type: String, default: '', label: 'Widest', control: 'slider', unit: 'px', min: 40, max: 1600, placeholder: 'As wide as there is room' },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 200 },
    shadow: { type: Boolean, default: false, label: 'Shadow' },
    caption: { type: String, default: '', label: 'Caption' },
    eager: { type: Boolean, default: false, label: 'Loads at once (a picture at the top of the page)' }
  },
  data() {
    return { found: '' }
  },
  watch: {
    src() {
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
      return /^--/.test(this.src)
    },
    picture() {
      return this.named ? this.found : this.src
    },
    held() {
      return this.named && !this.found ? { content: 'var(' + this.src + ')' } : undefined
    },
    style() {
      return {
        '--vp-image-shape': this.shape && this.shape !== 'auto' ? this.shape : (this.src ? undefined : '16 / 9'),
        '--vp-image-fit': this.fit || undefined,
        '--vp-image-radius': this.radius || undefined,
        maxWidth: this.width || undefined
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
    find() {
      const value = this.named && this.$el && this.$el.nodeType === 1 ? getComputedStyle(this.$el).getPropertyValue(this.src) : ''
      const address = /^\\s*url\\(\\s*(['"]?)(.*?)\\1\\s*\\)\\s*$/.exec(value)
      this.found = address ? address[2] : ''
    }
  }
}
<\/script>
<style>
.vp-image {
  box-sizing: border-box;
  display: block;
  width: 100%;
  max-width: 100%;
  margin: 0;
}
.vp-image__img,
.vp-image__empty {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: auto;
  aspect-ratio: var(--vp-image-shape, auto);
  object-fit: var(--vp-image-fit, cover);
  border-radius: var(--vp-image-radius, var(--vp-radius, 8px));
}
.vp-image__empty {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-surface, #f1f5f9);
  color: var(--vp-muted, #94a3b8);
}
.vp-image--shadow .vp-image__img,
.vp-image--shadow .vp-image__empty { box-shadow: 0 18px 40px -18px rgba(15, 23, 42, 0.35), 0 4px 10px -4px rgba(15, 23, 42, 0.12); }
.vp-image__caption {
  margin-top: 0.6em;
  font-size: 0.875rem;
  color: var(--vp-muted, #64748b);
}
</style>
`;export{e as default};