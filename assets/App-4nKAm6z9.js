var e=`<template>
  <component :is="tag" class="vp-paragraph" :class="['vp-paragraph--' + size, align ? 'vp-paragraph--' + align : '', { 'vp-paragraph--muted': muted }]" :style="style">
    <slot>Write something here. Double-click the text to change it.</slot>
  </component>
</template>
<script>
// Running text: a paragraph, a lead under a heading, a small note.
export default {
  wysiwyg: true,
  props: {
    size: {
      type: String,
      default: 'medium',
      label: 'Size',
      options: [{ key: 'Small', value: 'small' }, { key: 'Medium', value: 'medium' }, { key: 'Large (a lead)', value: 'large' }]
    },
    align: {
      type: String,
      default: '',
      label: 'Align',
      options: [{ key: 'As around it', value: '' }, { key: 'Left', value: 'left' }, { key: 'Center', value: 'center' }, { key: 'Right', value: 'right' }]
    },
    muted: { type: Boolean, default: false, label: 'Quieter (grey)' },
    color: { type: String, default: '', label: 'Color', control: 'color' },
    width: { type: String, default: '', label: 'Widest', control: 'slider', unit: 'px', min: 200, max: 1200, placeholder: 'No limit' },
    tag: {
      type: String,
      default: 'p',
      label: 'Kind',
      options: [{ key: 'Paragraph', value: 'p' }, { key: 'Plain (div)', value: 'div' }, { key: 'In a line (span)', value: 'span' }]
    }
  },
  computed: {
    style() {
      return { color: this.color || undefined, maxWidth: this.width || undefined }
    }
  }
}
<\/script>
<style>
.vp-paragraph {
  margin: 0;
  max-width: 100%;
  line-height: 1.65;
  overflow-wrap: break-word;
}
.vp-paragraph--small { font-size: 0.875rem; line-height: 1.55; }
.vp-paragraph--medium { font-size: 1rem; }
.vp-paragraph--large { font-size: clamp(1.075rem, 1rem + 0.45vw, 1.3rem); line-height: 1.55; }
.vp-paragraph--muted { color: var(--vp-muted, #64748b); }
/* aligned by itself it also stands there, in a section or a stack that lines its parts up another way */
.vp-paragraph--left { align-self: flex-start; margin-right: auto; text-align: left; }
.vp-paragraph--center { align-self: center; margin-inline: auto; text-align: center; }
.vp-paragraph--right { align-self: flex-end; margin-left: auto; text-align: right; }
</style>
`;export{e as default};