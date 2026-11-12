var e=`<template>
  <component :is="tag" :id="anchor || undefined" class="vp-section" :class="classes" :style="style">
    <div v-if="image" class="vp-section__image" aria-hidden="true" />
    <div class="vp-section__inner">
      <slot />
    </div>
  </component>
</template>
<script>
// A band across the page with its content held to a width in the middle: the part every page is built of
// (hero, features, footer …). Background, room above and below and the width are picked from short lists,
// so sections of a page fit each other without measuring.
export default {
  props: {
    width: {
      type: String,
      default: 'normal',
      label: 'Content width',
      options: [{ key: 'Narrow', value: 'narrow' }, { key: 'Normal', value: 'normal' }, { key: 'Wide', value: 'wide' }, { key: 'Full', value: 'full' }]
    },
    space: {
      type: String,
      default: 'large',
      label: 'Room above and below',
      options: [{ key: 'None', value: 'none' }, { key: 'Small', value: 'small' }, { key: 'Medium', value: 'medium' }, { key: 'Large', value: 'large' }, { key: 'Extra large', value: 'xlarge' }]
    },
    align: {
      type: String,
      default: 'left',
      label: 'Align',
      options: [{ key: 'Left', value: 'left' }, { key: 'Center', value: 'center' }, { key: 'Right', value: 'right' }]
    },
    gap: { type: String, default: '24px', label: 'Gap between parts', control: 'slider', unit: 'px', min: 0, max: 96 },
    background: { type: String, default: '', label: 'Background', control: 'color' },
    color: { type: String, default: '', label: 'Text color', control: 'color' },
    image: { type: String, default: '', label: 'Background image', control: 'media' },
    shade: { type: String, default: '', label: 'Shade over the image', control: 'color' },
    height: {
      type: String,
      default: 'auto',
      label: 'Height',
      options: [{ key: 'As its content', value: 'auto' }, { key: 'Half the screen', value: 'half' }, { key: 'The whole screen', value: 'screen' }]
    },
    tag: {
      type: String,
      default: 'section',
      label: 'Kind',
      options: [{ key: 'Section', value: 'section' }, { key: 'Header', value: 'header' }, { key: 'Main', value: 'main' }, { key: 'Footer', value: 'footer' }, { key: 'Plain (div)', value: 'div' }]
    },
    anchor: { type: String, default: '', label: 'Anchor', placeholder: 'A name to link to: #name' }
  },
  computed: {
    classes() {
      return ['vp-section--' + this.width, 'vp-section--space-' + this.space, 'vp-section--' + this.align, 'vp-section--' + this.height]
    },
    style() {
      return {
        '--vp-section-gap': this.gap || undefined,
        // a picture picked in the Studio is the name of a variable that holds it (--image-boat); anything else is an address
        '--vp-section-image': !this.image ? undefined : /^--/.test(this.image) ? 'var(' + this.image + ')' : 'url("' + String(this.image).replace(/"/g, '%22') + '")',
        '--vp-section-shade': this.shade || undefined,
        background: this.background || undefined,
        color: this.color || undefined
      }
    }
  }
}
<\/script>
<style>
.vp-section {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-inline: clamp(16px, 4vw, 40px);
}
.vp-section__inner {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  gap: var(--vp-section-gap, 24px);
}
.vp-section__image {
  position: absolute;
  inset: 0;
  background: var(--vp-section-image) center / cover no-repeat;
}
.vp-section__image::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--vp-section-shade, transparent);
}
.vp-section--narrow > .vp-section__inner { max-width: 720px; }
.vp-section--normal > .vp-section__inner { max-width: var(--vp-width, 1120px); }
.vp-section--wide > .vp-section__inner { max-width: 1360px; }
.vp-section--full > .vp-section__inner { max-width: none; }
.vp-section--space-none { padding-block: 0; }
.vp-section--space-small { padding-block: clamp(16px, 3vw, 32px); }
.vp-section--space-medium { padding-block: clamp(32px, 6vw, 64px); }
.vp-section--space-large { padding-block: clamp(48px, 9vw, 104px); }
.vp-section--space-xlarge { padding-block: clamp(72px, 13vw, 168px); }
.vp-section--left > .vp-section__inner { align-items: flex-start; text-align: left; }
.vp-section--center > .vp-section__inner { align-items: center; text-align: center; }
.vp-section--right > .vp-section__inner { align-items: flex-end; text-align: right; }
/* what fills the width (columns, images) still does, whatever the alignment */
.vp-section__inner > .vp-columns,
.vp-section__inner > .vp-divider { align-self: stretch; }
.vp-section--half { min-height: 50vh; }
.vp-section--screen { min-height: 100vh; min-height: 100svh; }
</style>
`;export{e as default};