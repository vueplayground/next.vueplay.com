var e=`<template>
  <figure class="vp-image" :class="{ 'vp-image--shadow': shadow }" :style="style">
    <component
      :is="href ? 'a' : 'button'"
      v-if="src && (href || zoom)"
      class="vp-image__link"
      :class="{ 'vp-image__link--zoom': !href }"
      :href="href || undefined"
      :target="href && newTab ? '_blank' : undefined"
      :rel="href && newTab ? 'noopener' : undefined"
      :type="href ? undefined : 'button'"
      :aria-haspopup="href ? undefined : 'dialog'"
      :aria-label="href ? undefined : say('open') + (alt ? ': ' + alt : '')"
      @click="go"
    >
      <img class="vp-image__img" :src="picture || undefined" :style="held" :alt="alt" :loading="eager ? 'eager' : 'lazy'" :fetchpriority="eager ? 'high' : undefined" decoding="async">
    </component>
    <img v-else-if="src" class="vp-image__img" :src="picture || undefined" :style="held" :alt="alt" :loading="eager ? 'eager' : 'lazy'" :fetchpriority="eager ? 'high' : undefined" decoding="async">
    <div v-else class="vp-image__empty" role="img" :aria-label="say('none', alt)">
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="M4 18l5-5 3.5 3.5L16 13l4 4" /></svg>
    </div>
    <figcaption v-if="caption" class="vp-image__caption">{{ caption }}</figcaption>
    <dialog v-if="src && zoom && !href" ref="large" class="vp-image__large" :aria-label="alt || say('picture')" @click="shut" @cancel.prevent="shut" @keydown.esc.prevent="shut">
      <img class="vp-image__shown" :src="picture || undefined" :style="held" :alt="alt" decoding="async">
      <button type="button" class="vp-image__close" :aria-label="say('close')" :title="say('close')" @click.stop="shut">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
    </dialog>
  </figure>
</template>
<script>
// A picture from the project's files, cut to a shape that stays the same on every screen. Until one is
// chosen it shows a grey box of that shape, so the page can be laid out first.
// (A picture picked in the Studio is the name of a variable that holds it, like --image-boat: it is shown
// through that variable at once, and its address is read from it when the page is alive. An address is used as it is.)
// It can be a link (a logo that goes home), or open larger in a dialog when clicked.

// The words it says itself, in the site's language (App.vue's head says it: \`htmlAttrs: { lang }\`). A text
// that is filled in in the Props tab is said as it is written.
const WORDS = {
  en: { none: 'No image chosen yet', open: 'Show larger', close: 'Close', picture: 'Picture' },
  nb: { none: 'Ikke noe bilde valgt ennå', open: 'Vis større', close: 'Lukk', picture: 'Bilde' },
  sv: { none: 'Ingen bild vald än', open: 'Visa större', close: 'Stäng', picture: 'Bild' },
  da: { none: 'Intet billede valgt endnu', open: 'Vis større', close: 'Luk', picture: 'Billede' },
  fi: { none: 'Kuvaa ei ole vielä valittu', open: 'Näytä suurempana', close: 'Sulje', picture: 'Kuva' },
  de: { none: 'Noch kein Bild gewählt', open: 'Größer anzeigen', close: 'Schließen', picture: 'Bild' },
  fr: { none: 'Aucune image choisie pour l’instant', open: 'Afficher en plus grand', close: 'Fermer', picture: 'Image' },
  es: { none: 'Aún no se ha elegido ninguna imagen', open: 'Ver más grande', close: 'Cerrar', picture: 'Imagen' },
  it: { none: 'Nessuna immagine ancora scelta', open: 'Mostra più grande', close: 'Chiudi', picture: 'Immagine' },
  nl: { none: 'Nog geen afbeelding gekozen', open: 'Groter weergeven', close: 'Sluiten', picture: 'Afbeelding' },
  pt: { none: 'Ainda não foi escolhida nenhuma imagem', open: 'Mostrar maior', close: 'Fechar', picture: 'Imagem' },
  pl: { none: 'Nie wybrano jeszcze zdjęcia', open: 'Pokaż większe', close: 'Zamknij', picture: 'Zdjęcie' },
  zh: { none: '尚未选择图片', open: '放大查看', close: '关闭', picture: '图片' },
  ja: { none: '画像はまだ選択されていません', open: '拡大して表示', close: '閉じる', picture: '画像' }
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
    eager: { type: Boolean, default: false, label: 'Loads at once (a picture at the top of the page)' },
    href: { type: String, default: '', label: 'Link', placeholder: 'A page or an address it goes to' },
    newTab: { type: Boolean, default: false, label: 'Open in a new tab' },
    zoom: { type: Boolean, default: false, label: 'Opens larger when clicked (without a link)' }
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
    // a link to a page of the site is shown by the site's router where there is one; without a link, it opens larger
    go(event) {
      if (!this.href) return this.show()
      const router = this.$router
      if (!router || this.newTab || !/^\\/(?!\\/)/.test(this.href)) return
      if (event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      event.preventDefault()
      router.push(this.href)
    },
    // (not in the Studio's editor, where a click chooses it)
    inStudio() {
      const receiver = typeof document !== 'undefined' && document.getElementById('receiver')
      return receiver ? receiver.getAttribute('live') !== 'yes' : typeof window !== 'undefined' && !!window.studio
    },
    show() {
      const dialog = this.$refs.large
      if (!dialog || this.inStudio()) return
      if (typeof dialog.showModal === 'function') dialog.showModal()
      else dialog.setAttribute('open', '')
    },
    shut() {
      const dialog = this.$refs.large
      if (!dialog) return
      if (typeof dialog.close === 'function') dialog.close()
      else dialog.removeAttribute('open')
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
.vp-image__link {
  display: block;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  text-align: inherit;
  cursor: pointer;
  border-radius: var(--vp-image-radius, var(--vp-radius, 8px));
}
.vp-image__link--zoom { cursor: zoom-in; }
.vp-image__link:focus-visible { outline: 2px solid var(--vp-primary, #2563eb); outline-offset: 3px; }
.vp-image__large {
  box-sizing: border-box;
  max-width: 100vw;
  max-height: 100vh;
  margin: auto;
  padding: 0;
  border: 0;
  background: transparent;
  overflow: visible;
}
.vp-image__large::backdrop { background: rgba(0, 0, 0, 0.85); }
.vp-image__shown {
  display: block;
  max-width: 94vw;
  max-height: 90vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: var(--vp-image-radius, var(--vp-radius, 8px));
}
.vp-image__close {
  position: fixed;
  top: 12px;
  right: 12px;
  display: inline-grid;
  place-items: center;
  width: 40px;
  height: 40px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  cursor: pointer;
}
.vp-image__close:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.vp-image__caption {
  margin-top: 0.6em;
  font-size: 0.875rem;
  color: var(--vp-muted, #64748b);
}
</style>
`;export{e as default};