var e=`<template>
  <hr class="vp-divider" :class="'vp-divider--' + line" :style="style">
</template>
<script>
// A line between two parts.
export default {
  props: {
    line: {
      type: String,
      default: 'solid',
      label: 'Line',
      options: [{ key: 'Solid', value: 'solid' }, { key: 'Dashed', value: 'dashed' }, { key: 'Dotted', value: 'dotted' }]
    },
    color: { type: String, default: '', label: 'Color', control: 'color' },
    thickness: { type: String, default: '1px', label: 'Thickness', control: 'slider', unit: 'px', min: 1, max: 12 },
    width: { type: String, default: '100%', label: 'Width', control: 'slider', unit: '%', min: 5, max: 100 },
    space: { type: String, default: '8px', label: 'Room above and below', control: 'slider', unit: 'px', min: 0, max: 96 }
  },
  computed: {
    style() {
      return {
        '--vp-divider-color': this.color || undefined,
        borderTopWidth: this.thickness || undefined,
        width: this.width || undefined,
        marginBlock: this.space || undefined
      }
    }
  }
}
<\/script>
<style>
.vp-divider {
  box-sizing: border-box;
  height: 0;
  max-width: 100%;
  margin-inline: auto;
  border: 0;
  border-top: 1px solid var(--vp-divider-color, var(--vp-border, rgba(100, 116, 139, 0.3)));
}
.vp-divider--dashed { border-top-style: dashed; }
.vp-divider--dotted { border-top-style: dotted; }
</style>
`;export{e as default};