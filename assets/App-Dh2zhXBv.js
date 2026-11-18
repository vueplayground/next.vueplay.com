var e=`<template>
  <figure class="vp-model-viewer" :class="{ 'vp-model-viewer--bare': !frame }" :style="style">
    <div ref="stage" class="vp-model-viewer__stage">
      <p v-if="!address" class="vp-model-viewer__empty">{{ say('empty') }}</p>
      <p v-else-if="failed" class="vp-model-viewer__empty">{{ say('failed') }}</p>
    </div>
    <figcaption v-if="caption" class="vp-model-viewer__caption">{{ caption }}</figcaption>
  </figure>
</template>
<script>
// A real 3D object on the page that visitors turn round, zoom into and look at from every side: a glTF or GLB
// file from the site's own files, from any address, or from data (a setting bound to an API in the Props tab).
// It turns slowly by itself if asked, plays the model's own animation, and on a phone it can be placed in the
// room (AR). Drawn by Google's open-source <model-viewer>, fetched the first time a page shows a model, so a site
// installs nothing. The element is made by hand in the stage, never as a tag of this template.
// (A file picked in the Studio is the name of a variable that holds it, like --model-chair: its address is read
// from that variable when the page is alive. An address is used as it is.)
const VIEWER = 'https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js'
let loading = null
const loadViewer = () => {
  if (typeof window === 'undefined') return Promise.resolve(false)
  if (window.customElements && window.customElements.get('model-viewer')) return Promise.resolve(true)
  if (!loading) {
    loading = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.type = 'module'
      script.src = VIEWER
      script.onload = () => window.customElements.whenDefined('model-viewer').then(() => resolve(true))
      script.onerror = () => { loading = null; reject(new Error('model-viewer could not be loaded')) }
      document.head.appendChild(script)
    })
  }
  return loading
}

// The words it says itself, in the site's language (App.vue's head says it: \`htmlAttrs: { lang }\`).
const WORDS = {
  en: { empty: 'Pick a 3D model (.glb or .gltf) in the settings.', failed: 'The 3D model could not be shown.', model: '3D model', ar: 'View in your room' },
  nb: { empty: 'Velg en 3D-modell (.glb eller .gltf) i innstillingene.', failed: '3D-modellen kunne ikke vises.', model: '3D-modell', ar: 'Se i rommet ditt' },
  sv: { empty: 'Välj en 3D-modell (.glb eller .gltf) i inställningarna.', failed: '3D-modellen kunde inte visas.', model: '3D-modell', ar: 'Se i ditt rum' },
  da: { empty: 'Vælg en 3D-model (.glb eller .gltf) i indstillingerne.', failed: '3D-modellen kunne ikke vises.', model: '3D-model', ar: 'Se i dit rum' },
  fi: { empty: 'Valitse 3D-malli (.glb tai .gltf) asetuksista.', failed: '3D-mallia ei voitu näyttää.', model: '3D-malli', ar: 'Katso huoneessasi' },
  de: { empty: 'Wähle ein 3D-Modell (.glb oder .gltf) in den Einstellungen.', failed: 'Das 3D-Modell konnte nicht angezeigt werden.', model: '3D-Modell', ar: 'In deinem Raum ansehen' },
  fr: { empty: 'Choisissez un modèle 3D (.glb ou .gltf) dans les réglages.', failed: "Le modèle 3D n'a pas pu être affiché.", model: 'Modèle 3D', ar: 'Voir dans votre pièce' },
  es: { empty: 'Elige un modelo 3D (.glb o .gltf) en los ajustes.', failed: 'No se pudo mostrar el modelo 3D.', model: 'Modelo 3D', ar: 'Ver en tu espacio' },
  it: { empty: 'Scegli un modello 3D (.glb o .gltf) nelle impostazioni.', failed: 'Non è stato possibile mostrare il modello 3D.', model: 'Modello 3D', ar: 'Guarda nella tua stanza' },
  nl: { empty: 'Kies een 3D-model (.glb of .gltf) in de instellingen.', failed: 'Het 3D-model kon niet worden getoond.', model: '3D-model', ar: 'Bekijk in je ruimte' },
  pt: { empty: 'Escolha um modelo 3D (.glb ou .gltf) nas definições.', failed: 'Não foi possível mostrar o modelo 3D.', model: 'Modelo 3D', ar: 'Ver no seu espaço' },
  pl: { empty: 'Wybierz model 3D (.glb lub .gltf) w ustawieniach.', failed: 'Nie udało się pokazać modelu 3D.', model: 'Model 3D', ar: 'Zobacz w swoim pokoju' },
  zh: { empty: '请在设置中选择一个 3D 模型（.glb 或 .gltf）。', failed: '无法显示该 3D 模型。', model: '3D 模型', ar: '在你的房间中查看' },
  ja: { empty: '設定で 3D モデル（.glb または .gltf）を選んでください。', failed: '3D モデルを表示できませんでした。', model: '3D モデル', ar: 'お部屋で見る' }
}

export default {
  props: {
    src: { type: String, default: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb', label: 'Model (.glb or .gltf)', control: 'media', placeholder: 'A file, or https://…/model.glb' },
    alt: { type: String, default: 'An astronaut', label: 'What it shows', placeholder: 'For screen readers and search engines' },
    poster: { type: String, default: '', label: 'Picture while it loads', control: 'media' },
    controls: { type: Boolean, default: true, label: 'Turn and zoom with the pointer or fingers' },
    zoom: { type: Boolean, default: true, label: 'Zoom in and out' },
    autoRotate: { type: Boolean, default: true, label: 'Turns slowly by itself' },
    speed: { type: String, default: '', label: 'How fast it turns', control: 'slider', unit: 'deg', min: 5, max: 90 },
    angle: { type: String, default: '', label: 'Seen from (side)', control: 'slider', unit: 'deg', min: -180, max: 180 },
    tilt: { type: String, default: '', label: 'Seen from (above)', control: 'slider', unit: 'deg', min: 0, max: 180 },
    animate: { type: Boolean, default: false, label: "Plays the model's own animation" },
    animation: { type: String, default: '', label: 'Which animation', placeholder: 'Its name (the first when empty)' },
    ar: { type: Boolean, default: true, label: 'View in your room (on a phone)' },
    light: {
      type: String,
      default: 'neutral',
      label: 'Light',
      options: [{ key: 'Even', value: 'neutral' }, { key: 'Studio', value: 'legacy' }]
    },
    exposure: { type: String, default: '', label: 'Brightness', control: 'slider', unit: '', min: 0.2, max: 2 },
    shadow: { type: String, default: '', label: 'Shadow under it', control: 'slider', unit: '', min: 0, max: 2 },
    height: { type: String, default: '', label: 'Height', control: 'slider', unit: 'px', min: 200, max: 900 },
    background: { type: String, default: '', label: 'Background', control: 'color' },
    frame: { type: Boolean, default: true, label: 'In a frame' },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 40 },
    caption: { type: String, default: '', label: 'Caption' }
  },
  data() {
    return { found: {}, failed: false }
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
    address() {
      return this.addressOf(this.src)
    },
    style() {
      return {
        '--vp-model-viewer-height': this.height || undefined,
        '--vp-model-viewer-background': this.background || undefined,
        '--vp-model-viewer-radius': this.radius || undefined
      }
    },
    // what the element is given, as its own attributes
    settings() {
      const side = this.angle === '' ? 0 : parseFloat(this.angle) || 0
      const above = this.tilt === '' ? 75 : parseFloat(this.tilt) || 0
      return {
        src: this.address,
        alt: this.alt || this.say('model'),
        poster: this.addressOf(this.poster) || null,
        'camera-controls': this.controls ? '' : null,
        'disable-zoom': this.controls && !this.zoom ? '' : null,
        'auto-rotate': this.autoRotate ? '' : null,
        'rotation-per-second': (this.speed === '' ? 20 : parseFloat(this.speed) || 20) + 'deg',
        'camera-orbit': side + 'deg ' + above + 'deg auto',
        autoplay: this.animate ? '' : null,
        'animation-name': this.animate && this.animation ? this.animation : null,
        ar: this.ar ? '' : null,
        'ar-modes': this.ar ? 'webxr scene-viewer quick-look' : null,
        'environment-image': this.light,
        exposure: this.exposure === '' ? '1' : String(parseFloat(this.exposure) || 1),
        'shadow-intensity': this.shadow === '' ? '1' : String(parseFloat(this.shadow) || 0),
        'interaction-prompt': this.controls ? 'auto' : 'none',
        loading: 'lazy'
      }
    }
  },
  watch: {
    settings: {
      deep: true,
      handler() {
        this.apply()
      }
    },
    src() {
      this.find()
    },
    poster() {
      this.find()
    }
  },
  mounted() {
    this.find()
    this.apply()
  },
  beforeUnmount() {
    if (this.viewer && this.viewer.parentNode) this.viewer.parentNode.removeChild(this.viewer)
    this.viewer = null
  },
  methods: {
    say(key) {
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return words[key] ?? WORDS.en[key]
    },
    addressOf(value) {
      if (!value) return ''
      return /^--/.test(value) ? this.found[value] || '' : value
    },
    // the element, made once the viewer is there, given the settings as attributes
    async apply() {
      const stage = this.$refs.stage
      if (!stage || !this.address) {
        if (this.viewer) this.viewer.style.display = 'none'
        return
      }
      try {
        await loadViewer()
      } catch (e) {
        this.failed = true
        return
      }
      if (!this.$refs.stage) return
      if (!this.viewer) {
        this.viewer = document.createElement('model-viewer')
        this.viewer.className = 'vp-model-viewer__model'
        this.viewer.addEventListener('error', () => { this.failed = true })
        this.viewer.addEventListener('load', () => { this.failed = false })
        stage.appendChild(this.viewer)
      }
      this.viewer.style.display = ''
      for (const [name, value] of Object.entries(this.settings)) {
        if (value === null || value === undefined) this.viewer.removeAttribute(name)
        else if (this.viewer.getAttribute(name) !== value) this.viewer.setAttribute(name, value)
      }
    },
    find() {
      if (!this.$el || this.$el.nodeType !== 1) return
      const found = {}
      const style = getComputedStyle(this.$el)
      for (const value of [this.src, this.poster]) {
        if (!/^--/.test(value || '')) continue
        const address = /^\\s*url\\(\\s*(['"]?)(.*?)\\1\\s*\\)\\s*$/.exec(style.getPropertyValue(value))
        if (address) found[value] = address[2]
      }
      this.found = found
    }
  }
}
<\/script>
<style>
.vp-model-viewer {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  margin: 0;
}
.vp-model-viewer__stage {
  position: relative;
  display: grid;
  place-items: center;
  height: var(--vp-model-viewer-height, clamp(320px, 50vw, 520px));
  border: 1px solid var(--vp-border, rgba(127, 127, 127, 0.28));
  border-radius: var(--vp-model-viewer-radius, var(--vp-radius, 16px));
  background: var(--vp-model-viewer-background, radial-gradient(circle at 50% 35%, var(--vp-background, #fff), var(--vp-surface, #f4f6f8)));
  overflow: hidden;
}
.vp-model-viewer--bare .vp-model-viewer__stage { border-color: transparent; background: var(--vp-model-viewer-background, transparent); }
.vp-model-viewer__model {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  --poster-color: transparent;
  --progress-bar-color: var(--vp-primary, #2563eb);
}
.vp-model-viewer__model:focus-visible { outline: 2px solid var(--vp-primary, #2563eb); outline-offset: -2px; }
.vp-model-viewer__empty {
  margin: 0;
  padding: 1rem;
  color: var(--vp-muted, #64748b);
  text-align: center;
  font-size: 0.95em;
}
.vp-model-viewer__caption { margin-top: 0.6rem; color: var(--vp-muted, #64748b); font-size: 0.9em; text-align: center; }
</style>
`;export{e as default};