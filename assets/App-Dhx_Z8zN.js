var e=`<template>
  <component :is="level" class="vp-heading" :class="['vp-heading--' + size, align ? 'vp-heading--' + align : '']" :style="style">
    <a
      v-if="href"
      class="vp-heading__link"
      :href="href"
      :target="newTab ? '_blank' : undefined"
      :rel="newTab ? 'noopener' : undefined"
      @click="go"
    ><slot>Your heading</slot></a>
    <slot v-else>Your heading</slot>
  </component>
</template>
<script>
// A heading. Its level (h1 … h6) says what it is to search engines and screen readers; how large it looks
// is picked apart from that, and each size shrinks by itself on a small screen. It can link to a page (a post's
// title to the post). Its weight is the site's (--vp-heading-weight, else bold) until one is picked.
export default {
  wysiwyg: true,
  props: {
    level: {
      type: String,
      default: 'h2',
      label: 'Level',
      options: [{ key: 'H1: the page', value: 'h1' }, { key: 'H2: a section', value: 'h2' }, { key: 'H3', value: 'h3' }, { key: 'H4', value: 'h4' }, { key: 'H5', value: 'h5' }, { key: 'H6', value: 'h6' }]
    },
    size: {
      type: String,
      default: 'large',
      label: 'Size',
      options: [{ key: 'Small', value: 'small' }, { key: 'Medium', value: 'medium' }, { key: 'Large', value: 'large' }, { key: 'Extra large', value: 'xlarge' }, { key: 'Huge', value: 'huge' }]
    },
    align: {
      type: String,
      default: '',
      label: 'Align',
      options: [{ key: 'As around it', value: '' }, { key: 'Left', value: 'left' }, { key: 'Center', value: 'center' }, { key: 'Right', value: 'right' }]
    },
    weight: {
      type: String,
      default: '',
      label: 'Weight',
      options: [{ key: 'As the site', value: '' }, { key: 'Light', value: '300' }, { key: 'Normal', value: '400' }, { key: 'Medium', value: '500' }, { key: 'Semi bold', value: '600' }, { key: 'Bold', value: '700' }, { key: 'Extra bold', value: '800' }]
    },
    color: { type: String, default: '', label: 'Color', control: 'color' },
    font: { type: String, default: '', label: 'Font', control: 'font' },
    href: { type: String, default: '', label: 'Link', placeholder: '/page, #anchor or https://…' },
    newTab: { type: Boolean, default: false, label: 'Open in a new tab' }
  },
  computed: {
    style() {
      return { color: this.color || undefined, fontWeight: this.weight || undefined, fontFamily: this.font || undefined }
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
.vp-heading {
  margin: 0;
  max-width: 100%;
  font-family: var(--vp-font-heading, inherit);
  font-weight: var(--vp-heading-weight, 700);
  line-height: 1.15;
  letter-spacing: -0.02em;
  text-wrap: balance;
  overflow-wrap: break-word;
}
/* the larger the letters, the closer they stand and the tighter the lines: what makes a large heading look set, not typed */
.vp-heading--small { font-size: clamp(1.05rem, 0.98rem + 0.3vw, 1.25rem); letter-spacing: -0.011em; line-height: 1.3; }
.vp-heading--medium { font-size: clamp(1.3rem, 1.15rem + 0.7vw, 1.75rem); letter-spacing: -0.017em; line-height: 1.22; }
.vp-heading--large { font-size: clamp(1.75rem, 1.35rem + 1.7vw, 2.625rem); letter-spacing: -0.024em; line-height: 1.12; }
.vp-heading--xlarge { font-size: clamp(2.15rem, 1.45rem + 3vw, 3.75rem); letter-spacing: -0.03em; line-height: 1.06; }
.vp-heading--huge { font-size: clamp(2.5rem, 1.4rem + 4.9vw, 5rem); letter-spacing: -0.036em; line-height: 1.02; }
/* aligned by itself it also stands there, in a section or a stack that lines its parts up another way */
.vp-heading--left { align-self: flex-start; margin-right: auto; text-align: left; }
.vp-heading--center { align-self: center; margin-inline: auto; text-align: center; }
.vp-heading--right { align-self: flex-end; margin-left: auto; text-align: right; }
.vp-heading__link { color: inherit; }
.vp-heading__link { text-decoration: underline; text-decoration-color: transparent; text-decoration-thickness: 0.06em; text-underline-offset: 0.16em; transition: text-decoration-color 160ms ease, color 160ms ease; }
.vp-heading__link:hover { text-decoration-color: currentColor; }
@media (prefers-reduced-motion: reduce) { .vp-heading__link { transition: none; } }
.vp-heading__link:focus-visible { outline: 2px solid var(--vp-primary, #2563eb); outline-offset: 2px; border-radius: 2px; }
</style>
`;export{e as default};