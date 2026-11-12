var e=`<template>
  <div class="vp-stat" :class="['vp-stat--' + align, 'vp-stat--' + size]" :style="style">
    <span class="vp-stat__value">{{ value }}</span>
    <span v-if="label" class="vp-stat__label">{{ label }}</span>
  </div>
</template>
<script>
// A number that says something about you (10k users, 99.9 %, 24/7), with a line under it saying what it counts.
export default {
  props: {
    value: { type: String, default: '10k+', label: 'Number' },
    label: { type: String, default: 'Happy customers', label: 'What it counts' },
    size: {
      type: String,
      default: 'medium',
      label: 'Size',
      options: [{ key: 'Small', value: 'small' }, { key: 'Medium', value: 'medium' }, { key: 'Large', value: 'large' }]
    },
    align: {
      type: String,
      default: 'center',
      label: 'Align',
      options: [{ key: 'Left', value: 'left' }, { key: 'Center', value: 'center' }, { key: 'Right', value: 'right' }]
    },
    color: { type: String, default: '', label: 'Number color', control: 'color' }
  },
  computed: {
    style() {
      return { '--vp-stat-color': this.color || undefined }
    }
  }
}
<\/script>
<style>
.vp-stat { box-sizing: border-box; display: flex; flex-direction: column; gap: 0.25rem; min-width: 0; }
.vp-stat--left { align-items: flex-start; text-align: left; }
.vp-stat--center { align-items: center; text-align: center; }
.vp-stat--right { align-items: flex-end; text-align: right; }
.vp-stat__value {
  color: var(--vp-stat-color, var(--vp-primary, inherit));
  font-family: var(--vp-font-heading, inherit);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
}
.vp-stat--small .vp-stat__value { font-size: clamp(1.5rem, 3vw, 2rem); }
.vp-stat--medium .vp-stat__value { font-size: clamp(2rem, 5vw, 3rem); }
.vp-stat--large .vp-stat__value { font-size: clamp(2.75rem, 8vw, 4.5rem); }
.vp-stat__label { opacity: 0.7; line-height: 1.4; }
</style>
`;export{e as default};