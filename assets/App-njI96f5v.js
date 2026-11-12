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
    <slot>Button</slot>
  </component>
</template>
<script>
// A button that goes somewhere: to a page of the site (/about), to a place on the page (#prices) or to
// another site. Without a link it is a plain button, for a @click of your own.
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
    wide: { type: Boolean, default: false, label: 'Full width' },
    newTab: { type: Boolean, default: false, label: 'Open in a new tab' }
  },
  computed: {
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