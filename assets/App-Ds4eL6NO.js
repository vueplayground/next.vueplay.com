var e=`<template>
  <div
    class="vp-card"
    :class="['vp-card--' + look, 'vp-card--' + align, { 'vp-card--link': !!href, 'vp-card--side': side }]"
    :style="style"
  >
    <a
      v-if="href && !inStudio"
      class="vp-card__link"
      :href="href"
      :target="newTab ? '_blank' : undefined"
      :rel="newTab ? 'noopener' : undefined"
      :aria-label="linkText || heard || undefined"
      @click="go"
    ></a>
    <img v-if="image" class="vp-card__image" :src="picture || undefined" :style="held" :alt="alt" loading="lazy" decoding="async">
    <div class="vp-card__body">
      <slot />
    </div>
  </div>
</template>
<script>
// A box that holds a few things together: a picture on top (or at the side) and whatever is put inside.
// With a link the whole card is the link: a link laid over it, under the links and buttons put inside it, which
// stay links of their own (a link may not hold another). Three of them in Columns is a row of cards.
// (A picture picked in the Studio is the name of a variable that holds it, like --image-boat: it is shown
// through that variable at once, and its address is read from it when the page is alive. An address is used as it is.)
export default {
  props: {
    look: {
      type: String,
      default: 'outline',
      label: 'Look',
      options: [{ key: 'Outline', value: 'outline' }, { key: 'Shadow', value: 'shadow' }, { key: 'Filled', value: 'filled' }, { key: 'Plain', value: 'plain' }]
    },
    image: { type: String, default: '', label: 'Picture', control: 'media' },
    alt: { type: String, default: '', label: 'Picture described', placeholder: 'For those who cannot see it' },
    side: { type: Boolean, default: false, label: 'Picture at the side' },
    align: {
      type: String,
      default: 'left',
      label: 'Align',
      options: [{ key: 'Left', value: 'left' }, { key: 'Center', value: 'center' }, { key: 'Right', value: 'right' }]
    },
    padding: { type: String, default: '', label: 'Room inside', control: 'slider', unit: 'px', min: 0, max: 80 },
    gap: { type: String, default: '', label: 'Space between', control: 'slider', unit: 'px', min: 0, max: 60 },
    background: { type: String, default: '', label: 'Background', control: 'color' },
    color: { type: String, default: '', label: 'Text color', control: 'color' },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 40 },
    href: { type: String, default: '', label: 'Link', placeholder: '/page, #anchor or https://…' },
    newTab: { type: Boolean, default: false, label: 'Open in a new tab' },
    linkText: { type: String, default: '', label: 'Link described', placeholder: 'Where it goes, for screen readers (else its heading)' }
  },
  data() {
    return { found: '', heard: '' }
  },
  watch: {
    image() {
      this.find()
    }
  },
  mounted() {
    this.find()
    this.listen()
  },
  updated() {
    this.listen()
  },
  computed: {
    // (in the Studio, where the parts of the card are picked by clicking them, there is no link over them)
    inStudio() {
      return typeof document !== 'undefined' && (document.getElementById('receiver') ? document.getElementById('receiver').getAttribute('live') !== 'yes' : !!window.studio)
    },
    named() {
      return /^--/.test(this.image)
    },
    picture() {
      return this.named ? this.found : this.image
    },
    held() {
      return this.named && !this.found ? { content: 'var(' + this.image + ')' } : undefined
    },
    style() {
      return {
        '--vp-card-padding': this.padding || undefined,
        '--vp-card-gap': this.gap || undefined,
        '--vp-card-background': this.background || undefined,
        '--vp-card-color': this.color || undefined,
        '--vp-card-radius': this.radius || undefined
      }
    }
  },
  methods: {
    // What the link is called for a screen reader when it is not described: the card's heading, else its first words
    listen() {
      if (!this.href || this.linkText || !this.$el || this.$el.nodeType !== 1) return
      const body = this.$el.querySelector('.vp-card__body')
      const heading = body && body.querySelector('h1, h2, h3, h4, h5, h6, .vp-heading')
      const words = String(((heading || body) && (heading || body).textContent) || '').replace(/\\s+/g, ' ').trim().slice(0, 120)
      if (words !== this.heard) this.heard = words
    },
    find() {
      const value = this.named && this.$el && this.$el.nodeType === 1 ? getComputedStyle(this.$el).getPropertyValue(this.image) : ''
      const address = /^\\s*url\\(\\s*(['"]?)(.*?)\\1\\s*\\)\\s*$/.exec(value)
      this.found = address ? address[2] : ''
    },
    // A page of the site is shown by the site's router where there is one, without loading the site again
    go(event) {
      const router = this.$router
      if (!router || !this.href || this.newTab || !/^\\/(?!\\/)/.test(this.href)) return
      if (event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      event.preventDefault()
      router.push(this.href)
    }
  }
}
<\/script>
<style>
.vp-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  border: 1px solid transparent;
  border-radius: var(--vp-card-radius, var(--vp-radius, 12px));
  background: var(--vp-card-background, transparent);
  color: var(--vp-card-color, inherit);
  text-decoration: none;
  transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
}
.vp-card--outline { border-color: var(--vp-border, rgba(127, 127, 127, 0.28)); }
.vp-card--shadow { background: var(--vp-card-background, var(--vp-surface, #fff)); box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06), 0 8px 24px rgba(0, 0, 0, 0.08); }
.vp-card--filled { background: var(--vp-card-background, var(--vp-muted-surface, rgba(127, 127, 127, 0.1))); }
.vp-card--plain { border-radius: 0; overflow: visible; }
.vp-card--link { position: relative; cursor: pointer; }
.vp-card--link:hover { transform: translateY(-3px); box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06), 0 14px 32px rgba(0, 0, 0, 0.12); }
/* the link lies over the whole card; what is inside lets a click through to it, but its own links and buttons take theirs */
.vp-card__link { position: absolute; inset: 0; z-index: 1; border-radius: inherit; }
.vp-card__link:focus-visible { outline: 2px solid var(--vp-primary, #2563eb); outline-offset: 2px; }
.vp-card__link ~ .vp-card__body { position: relative; z-index: 2; pointer-events: none; }
.vp-card__link ~ .vp-card__body :where(a[href], button, input, select, textarea, label, summary, video, audio, iframe, [tabindex], [role="button"], [contenteditable]) { pointer-events: auto; }
@media (prefers-reduced-motion: reduce) {
  .vp-card { transition: none; }
  .vp-card--link:hover { transform: none; }
}
.vp-card__image { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; }
.vp-card--plain .vp-card__image { border-radius: var(--vp-card-radius, var(--vp-radius, 12px)); }
.vp-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--vp-card-gap, 0.75rem);
  min-width: 0;
  padding: var(--vp-card-padding, clamp(1rem, 3vw, 1.5rem));
  text-align: left;
}
.vp-card--plain .vp-card__body { padding: var(--vp-card-padding, 1rem 0 0); }
.vp-card--center .vp-card__body { align-items: center; text-align: center; }
.vp-card--right .vp-card__body { align-items: flex-end; text-align: right; }
/* side by side while there is room for both, the picture on top when there is not */
.vp-card--side { flex-flow: row wrap; }
.vp-card--side .vp-card__image { flex: 1 1 14rem; width: auto; min-width: 0; aspect-ratio: auto; min-height: 12rem; }
.vp-card--side .vp-card__body { flex: 2 1 16rem; justify-content: center; }
</style>
`;export{e as default};