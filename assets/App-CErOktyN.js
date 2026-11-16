var e=`<template>
  <div v-if="label" class="vp-divider vp-divider--words" :class="classes" :style="style" role="separator" :aria-label="label">
    <span class="vp-divider__line" />
    <span class="vp-divider__words">{{ label }}</span>
    <span class="vp-divider__line" />
  </div>
  <hr v-else class="vp-divider" :class="classes" :style="style">
</template>
<script>
// A line between two parts; shorter than the width, it stands at the left, in the middle or at the right. It can
// have a word or a sign in the middle ("or", ★), with the line on each side of it.
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
    align: {
      type: String,
      default: 'center',
      label: 'Stands (when shorter)',
      options: [{ key: 'Left', value: 'left' }, { key: 'In the middle', value: 'center' }, { key: 'Right', value: 'right' }]
    },
    space: { type: String, default: '8px', label: 'Room above and below', control: 'slider', unit: 'px', min: 0, max: 96 },
    label: { type: String, default: '', label: 'Words in the middle', placeholder: 'or, ★' }
  },
  computed: {
    classes() {
      return ['vp-divider--' + this.line, 'vp-divider--' + (['left', 'right'].includes(this.align) ? this.align : 'center')]
    },
    style() {
      return {
        '--vp-divider-color': this.color || undefined,
        '--vp-divider-thickness': this.label ? this.thickness || undefined : undefined,
        borderTopWidth: this.label ? undefined : this.thickness || undefined,
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
.vp-divider--left { margin-inline: 0 auto; }
.vp-divider--right { margin-inline: auto 0; }
.vp-divider--words {
  display: flex;
  align-items: center;
  gap: 0.75em;
  height: auto;
  border-top: 0;
  color: var(--vp-muted, #64748b);
  font-size: 0.875rem;
  line-height: 1.4;
}
.vp-divider__line {
  flex: 1;
  min-width: 1rem;
  border-top: var(--vp-divider-thickness, 1px) solid var(--vp-divider-color, var(--vp-border, rgba(100, 116, 139, 0.3)));
}
.vp-divider--dashed .vp-divider__line { border-top-style: dashed; }
.vp-divider--dotted .vp-divider__line { border-top-style: dotted; }
.vp-divider__words { flex: none; max-width: 80%; text-align: center; }
</style>
`;export{e as default};