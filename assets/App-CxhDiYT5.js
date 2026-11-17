var e=`<template>
  <div class="vp-video" :style="style">
    <iframe
      v-if="player"
      class="vp-video__frame"
      :src="player"
      :title="say('video', title)"
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      allowfullscreen
    />
    <video
      v-else-if="src"
      ref="file"
      class="vp-video__frame"
      :src="src"
      :poster="posterShown || undefined"
      :aria-label="title || undefined"
      :controls="controls || !moving"
      :autoplay="moving"
      :muted="moving || muted"
      :loop="loop"
      playsinline
      preload="metadata"
    />
    <div v-else class="vp-video__empty">
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M10 8.5l5.500 3.500-5.500 3.500z" /></svg>
      <span>{{ say('empty') }}</span>
    </div>
  </div>
</template>
<script>
// A video from YouTube or Vimeo (paste the address of its page), or a video file by its address.

// The words it says itself, in the site's language (App.vue's head says it: \`htmlAttrs: { lang }\`). A text
// that is filled in in the Props tab is said as it is written.
const WORDS = {
  en: { video: 'Video', empty: 'Paste the address of a video' },
  nb: { video: 'Video', empty: 'Lim inn adressen til en video' },
  sv: { video: 'Video', empty: 'Klistra in adressen till en video' },
  da: { video: 'Video', empty: 'Indsæt adressen på en video' },
  fi: { video: 'Video', empty: 'Liitä videon osoite' },
  de: { video: 'Video', empty: 'Füge die Adresse eines Videos ein' },
  fr: { video: 'Vidéo', empty: 'Collez l’adresse d’une vidéo' },
  es: { video: 'Vídeo', empty: 'Pega la dirección de un vídeo' },
  it: { video: 'Video', empty: 'Incolla l’indirizzo di un video' },
  nl: { video: 'Video', empty: 'Plak het adres van een video' },
  pt: { video: 'Vídeo', empty: 'Cole o endereço de um vídeo' },
  pl: { video: 'Wideo', empty: 'Wklej adres filmu' },
  zh: { video: '视频', empty: '粘贴视频的地址' },
  ja: { video: '動画', empty: '動画のアドレスを貼り付けてください' }
}

export default {
  props: {
    src: { type: String, default: '', label: 'Video address', placeholder: 'https://www.youtube.com/watch?v=…' },
    title: { type: String, default: '', label: 'What it shows', placeholder: 'For screen readers' },
    shape: {
      type: String,
      default: '16 / 9',
      label: 'Shape',
      options: [{ key: 'Wide (16:9)', value: '16 / 9' }, { key: 'Photo (4:3)', value: '4 / 3' }, { key: 'Square', value: '1 / 1' }, { key: 'Tall (9:16)', value: '9 / 16' }, { key: 'Cinema (21:9)', value: '21 / 9' }]
    },
    width: { type: String, default: '', label: 'Widest', control: 'slider', unit: 'px', min: 200, max: 1600 },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 60 },
    autoplay: { type: Boolean, default: false, label: 'Starts by itself (without sound)' },
    loop: { type: Boolean, default: false, label: 'Starts over when it ends' },
    controls: { type: Boolean, default: true, label: 'Play and pause buttons (kept when it does not start by itself)' },
    muted: { type: Boolean, default: false, label: 'Without sound' },
    poster: { type: String, default: '', label: 'Picture before it plays (video files)', control: 'media' },
    description: { type: String, default: '', label: 'What it is about (for search engines)', control: 'textarea' },
    uploadDate: { type: String, default: '', label: 'Put online on (for search engines)', placeholder: '2026-01-31' }
  },
  data() {
    return { posterFound: '', still: false }
  },
  computed: {
    // (a picture picked in the Studio is a variable that holds it, --image-boat: its address is read from the page)
    posterShown() {
      return /^--/.test(this.poster || '') ? this.posterFound : this.poster
    },
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
    // (it starts by itself only where less motion is not asked for)
    moving() {
      return !!this.autoplay && !this.still
    },
    // the video at YouTube or Vimeo: { site, id }; nothing for a video file
    hosted() {
      const src = String(this.src || '').trim()
      const youtube = /(?:youtube(?:-nocookie)?\\.com\\/(?:watch\\?(?:.*&)?v=|embed\\/|shorts\\/|live\\/)|youtu\\.be\\/)([\\w-]{6,})/.exec(src)
      if (youtube) return { site: 'youtube', id: youtube[1] }
      const vimeo = /vimeo\\.com\\/(?:video\\/)?(\\d+)/.exec(src)
      return vimeo ? { site: 'vimeo', id: vimeo[1] } : null
    },
    // the address of the player for a video that lives at YouTube or Vimeo; nothing for a video file
    player() {
      const hosted = this.hosted
      const quiet = this.moving || this.muted
      if (hosted?.site === 'youtube') {
        const id = hosted.id
        const ask = ['rel=0']
        if (this.moving) ask.push('autoplay=1')
        if (quiet) ask.push('mute=1')
        if (this.loop) ask.push('loop=1', 'playlist=' + id)
        if (!this.controls) ask.push('controls=0')
        return 'https://www.youtube-nocookie.com/embed/' + id + '?' + ask.join('&')
      }
      if (hosted?.site === 'vimeo') {
        const ask = ['dnt=1']
        if (this.moving) ask.push('autoplay=1')
        if (quiet) ask.push('muted=1')
        if (this.loop) ask.push('loop=1')
        if (!this.controls) ask.push('controls=0')
        return 'https://player.vimeo.com/video/' + hosted.id + '?' + ask.join('&')
      }
      return ''
    },
    style() {
      return {
        '--vp-video-shape': this.shape || undefined,
        '--vp-video-radius': this.radius || undefined,
        maxWidth: this.width || undefined,
        // (a video made narrower stands in the middle of its part)
        marginInline: this.width ? 'auto' : undefined
      }
    }
  },
  methods: {
    findPoster() {
      const value = /^--/.test(this.poster || '') && this.$el && this.$el.nodeType === 1 ? getComputedStyle(this.$el).getPropertyValue(this.poster) : ''
      const address = /^\\s*url\\(\\s*(['"]?)(.*?)\\1\\s*\\)\\s*$/.exec(value)
      this.posterFound = address ? address[2] : ''
    },
    say(key, own, n) {
      if (own) return own
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return String(words[key] ?? WORDS.en[key]).replace('{n}', n ?? '')
    }
  },
  mounted() {
    this.findPoster()
    if (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.still = true
      // (a file the page already started is stopped)
      if (this.autoplay) this.$refs.file?.pause?.()
    }
  },
  watch: {
    poster() { this.$nextTick(() => this.findPoster()) }
  },
  // What search engines read about the video (on the site, not in the editor). It needs its name, the day it was
  // put online and a picture of it (the poster, or YouTube's own), or it says nothing.
  head() {
    const name = String(this.title || '').trim()
    const date = String(this.uploadDate || '').trim()
    const src = String(this.src || '').trim()
    const hosted = this.hosted
    const thumbnail = this.posterShown ? this.posterShown : hosted?.site === 'youtube' ? 'https://i.ytimg.com/vi/' + hosted.id + '/hqdefault.jpg' : ''
    if (this.inStudio || !src || !name || !date || !thumbnail) return {}
    const where = hosted?.site === 'youtube' ? { embedUrl: 'https://www.youtube-nocookie.com/embed/' + hosted.id }
      : hosted?.site === 'vimeo' ? { embedUrl: 'https://player.vimeo.com/video/' + hosted.id }
        : { contentUrl: src }
    return {
      script: [{
        type: 'application/ld+json',
        textContent: {
          '@context': 'https://schema.org',
          '@type': 'VideoObject',
          name,
          description: String(this.description || '').trim() || name,
          thumbnailUrl: thumbnail,
          uploadDate: date,
          ...where
        }
      }]
    }
  }
}
<\/script>
<style>
.vp-video {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  max-width: 100%;
  aspect-ratio: var(--vp-video-shape, 16 / 9);
  overflow: hidden;
  border-radius: var(--vp-video-radius, var(--vp-radius, 12px));
  background: #000;
  box-shadow: 0 0 0 1px var(--vp-border, rgba(127, 127, 127, 0.22)), 0 24px 48px -28px rgba(0, 0, 0, 0.35);
}
.vp-video__frame { position: absolute; inset: 0; display: block; width: 100%; height: 100%; border: 0; object-fit: cover; }
.vp-video__empty {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background:
    radial-gradient(60% 80% at 50% 40%, color-mix(in oklch, var(--vp-primary, #2563eb) 9%, transparent), transparent 75%),
    var(--vp-surface, #f1f5f9);
  color: var(--vp-muted, #94a3b8);
  font-size: 0.875rem;
}
.vp-video__empty svg { box-sizing: content-box; width: 1.75rem; height: 1.75rem; padding: 0.9rem; border-radius: 50%; background: color-mix(in oklch, var(--vp-primary, #2563eb) 12%, transparent); color: color-mix(in oklch, var(--vp-primary, #2563eb) 75%, var(--vp-text, currentColor)); fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
</style>
`;export{e as default};