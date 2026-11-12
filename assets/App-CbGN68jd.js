var e=`<template>
  <component :is="level" class="vp-heading" :class="['vp-heading--' + size, align ? 'vp-heading--' + align : '']" :style="style">
    <slot>Your heading</slot>
  </component>
</template>
<script>
// A heading. Its level (h1 … h6) says what it is to search engines and screen readers; how large it looks
// is picked apart from that, and each size shrinks by itself on a small screen.
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
      default: '700',
      label: 'Weight',
      options: [{ key: 'Light', value: '300' }, { key: 'Normal', value: '400' }, { key: 'Medium', value: '500' }, { key: 'Semi bold', value: '600' }, { key: 'Bold', value: '700' }, { key: 'Extra bold', value: '800' }]
    },
    color: { type: String, default: '', label: 'Color', control: 'color' },
    font: { type: String, default: '', label: 'Font', control: 'font' }
  },
  computed: {
    style() {
      return { color: this.color || undefined, fontWeight: this.weight || undefined, fontFamily: this.font || undefined }
    }
  }
}
<\/script>
<style>
.vp-heading {
  margin: 0;
  max-width: 100%;
  font-family: var(--vp-font-heading, inherit);
  line-height: 1.15;
  letter-spacing: -0.02em;
  text-wrap: balance;
  overflow-wrap: break-word;
}
.vp-heading--small { font-size: clamp(1.05rem, 0.98rem + 0.3vw, 1.25rem); letter-spacing: -0.01em; line-height: 1.3; }
.vp-heading--medium { font-size: clamp(1.3rem, 1.15rem + 0.7vw, 1.75rem); line-height: 1.25; }
.vp-heading--large { font-size: clamp(1.7rem, 1.35rem + 1.6vw, 2.5rem); }
.vp-heading--xlarge { font-size: clamp(2.1rem, 1.5rem + 2.8vw, 3.5rem); line-height: 1.1; }
.vp-heading--huge { font-size: clamp(2.5rem, 1.5rem + 4.6vw, 4.75rem); line-height: 1.05; letter-spacing: -0.03em; }
/* aligned by itself it also stands there, in a section or a stack that lines its parts up another way */
.vp-heading--left { align-self: flex-start; margin-right: auto; text-align: left; }
.vp-heading--center { align-self: center; margin-inline: auto; text-align: center; }
.vp-heading--right { align-self: flex-end; margin-left: auto; text-align: right; }
</style>
`;export{e as default};