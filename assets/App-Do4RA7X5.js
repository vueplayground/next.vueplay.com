var e=`<template>
  <component
    :is="href ? 'a' : 'button'"
    class="vp-button"
    :class="['vp-button--' + variant, 'vp-button--' + size, { 'vp-button--wide': wide }]"
    :style="style"
    :href="href || undefined"
    :target="href && newTab ? '_blank' : undefined"
    :rel="href && newTab ? 'noopener' : undefined"
    :type="href ? undefined : 'button'"
    @click="go"
  >
    <svg v-if="drawing.length && iconPosition !== 'after'" class="vp-button__icon" viewBox="0 0 24 24" aria-hidden="true"><path v-for="(d, index) in drawing" :key="index" :d="d" /></svg>
    <slot>Button</slot>
    <svg v-if="drawing.length && iconPosition === 'after'" class="vp-button__icon" viewBox="0 0 24 24" aria-hidden="true"><path v-for="(d, index) in drawing" :key="index" :d="d" /></svg>
  </component>
</template>
<script>
// A button that goes somewhere: to a page of the site (/about), to a place on the page (#prices) or to
// another site. Without a link it is a plain button, for a @click of your own. It can have a small icon before
// or after its text (an arrow, a cart, a phone, the networks people follow a site on).
export default {
  wysiwyg: true,
  props: {
    href: { type: String, default: '', label: 'Link', placeholder: '/page, #anchor or https://…' },
    variant: {
      type: String,
      default: 'solid',
      label: 'Look',
      options: [{ key: 'Filled', value: 'solid' }, { key: 'Outline', value: 'outline' }, { key: 'Soft', value: 'soft' }, { key: 'Text only', value: 'text' }]
    },
    size: {
      type: String,
      default: 'medium',
      label: 'Size',
      options: [{ key: 'Small', value: 'small' }, { key: 'Medium', value: 'medium' }, { key: 'Large', value: 'large' }]
    },
    color: { type: String, default: '', label: 'Color', control: 'color' },
    textColor: { type: String, default: '', label: 'Text color', control: 'color' },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 40 },
    icon: {
      type: String,
      default: '',
      label: 'Icon',
      control: 'icons',
      options: [
        { key: 'No icon', value: '', icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636' },
        { key: 'Arrow', value: 'arrow', icon: 'M5 12h14|M12 5l7 7-7 7' },
        { key: 'Arrow back', value: 'arrow-left', icon: 'M19 12H5|M12 19l-7-7 7-7' },
        { key: 'Arrow down', value: 'arrow-down', icon: 'M12 5v14|M19 12l-7 7-7-7' },
        { key: 'Opens elsewhere', value: 'external', icon: 'M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6|M15 3h6v6|M10 14L21 3' },
        { key: 'Download', value: 'download', icon: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4|M7 10l5 5 5-5|M12 15V3' },
        { key: 'Cart', value: 'cart', icon: 'M8 21a1 1 0 102 0 1 1 0 10-2 0z|M19 21a1 1 0 102 0 1 1 0 10-2 0z|M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6' },
        { key: 'Shop', value: 'shop', icon: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z|M3 6h18|M16 10a4 4 0 01-8 0' },
        { key: 'Phone', value: 'phone', icon: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z' },
        { key: 'Mail', value: 'mail', icon: 'M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z|M22 6l-10 7L2 6' },
        { key: 'Calendar', value: 'calendar', icon: 'M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z|M16 2v4|M8 2v4|M3 10h18' },
        { key: 'Play', value: 'play', icon: 'M6 3l14 9-14 9V3z' },
        { key: 'Check', value: 'check', icon: 'M20 6L9 17l-5-5' },
        { key: 'Link', value: 'link', icon: 'M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71|M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71' },
        { key: 'Instagram', value: 'instagram', icon: 'M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z|M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z|M17.5 6.5h.01' },
        { key: 'YouTube', value: 'youtube', icon: 'M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z|M9.75 15.02l5.75-3.27-5.75-3.27v6.54z' },
        { key: 'Facebook', value: 'facebook', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
        { key: 'X (Twitter)', value: 'x', icon: 'M4 4l11.733 16H20L8.267 4z|M4 20l6.768-6.768|M13.228 10.772L20 4' },
        { key: 'LinkedIn', value: 'linkedin', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z|M2 9h4v12H2z|M2 4a2 2 0 104 0 2 2 0 10-4 0z' },
        { key: 'TikTok', value: 'tiktok', icon: 'M21 7.917v4.034A9.948 9.948 0 0116 10v4.5a6.5 6.5 0 11-8-6.326v4.326a2.5 2.5 0 104 2V3h4.083A6.005 6.005 0 0021 7.917z' }
      ]
    },
    iconPosition: {
      type: String,
      default: 'before',
      label: 'Icon placed',
      options: [{ key: 'Before the text', value: 'before' }, { key: 'After the text', value: 'after' }]
    },
    wide: { type: Boolean, default: false, label: 'Full width' },
    newTab: { type: Boolean, default: false, label: 'Open in a new tab' }
  },
  computed: {
    // the drawing is kept with its name in the options above, where the Studio reads it for its picker
    drawing() {
      const found = this.icon ? this.$options.props.icon.options.find(option => option.value === this.icon) : null
      return found ? found.icon.split('|') : []
    },
    style() {
      return {
        '--vp-button-color': this.color || undefined,
        '--vp-button-text': this.textColor || undefined,
        '--vp-button-radius': this.radius || undefined
      }
    }
  },
  methods: {
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
.vp-button {
  --_color: var(--vp-button-color, var(--vp-primary, #2563eb));
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  max-width: 100%;
  margin: 0;
  border: 1.5px solid transparent;
  border-radius: var(--vp-button-radius, var(--vp-radius, 8px));
  font: inherit;
  font-weight: 600;
  line-height: 1.2;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: filter 120ms ease, background-color 120ms ease, transform 120ms ease;
}
.vp-button:active { transform: translateY(1px); }
.vp-button__icon { flex: none; width: 1.15em; height: 1.15em; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.vp-button:focus-visible { outline: 2px solid var(--_color); outline-offset: 2px; }
.vp-button--small { padding: 0.45em 0.9em; font-size: 0.875rem; }
.vp-button--medium { padding: 0.7em 1.35em; font-size: 1rem; }
.vp-button--large { padding: 0.85em 1.75em; font-size: 1.125rem; }
.vp-button--wide { display: flex; width: 100%; }
.vp-button--solid { background: var(--_color); color: var(--vp-button-text, var(--vp-primary-contrast, #fff)); }
.vp-button--solid:hover { filter: brightness(1.08); }
.vp-button--outline { background: transparent; border-color: var(--_color); color: var(--vp-button-text, var(--_color)); }
.vp-button--outline:hover { background: color-mix(in srgb, var(--_color) 10%, transparent); }
.vp-button--soft { background: color-mix(in srgb, var(--_color) 14%, transparent); color: var(--vp-button-text, var(--_color)); }
.vp-button--soft:hover { background: color-mix(in srgb, var(--_color) 22%, transparent); }
.vp-button--text { background: transparent; padding-inline: 0.25em; color: var(--vp-button-text, var(--_color)); }
.vp-button--text:hover { text-decoration: underline; text-underline-offset: 0.2em; }
</style>
`;export{e as default};