var e=`<template>
  <div class="vp-columns" :class="'vp-columns--' + align" :style="style">
    <slot />
  </div>
</template>
<script>
// Parts side by side that fold under each other by themselves on a narrow screen: each part put inside is
// one column. There are never more beside each other than \`columns\`, and none gets narrower than \`min\`.
export default {
  props: {
    columns: { type: Number, default: 3, label: 'Columns', control: 'number', min: 1, max: 6 },
    gap: { type: String, default: '24px', label: 'Gap', control: 'slider', unit: 'px', min: 0, max: 96 },
    min: { type: String, default: '240px', label: 'Narrowest column', control: 'slider', unit: 'px', min: 80, max: 600 },
    align: {
      type: String,
      default: 'stretch',
      label: 'Align up and down',
      options: [{ key: 'Same height', value: 'stretch' }, { key: 'Top', value: 'start' }, { key: 'Middle', value: 'center' }, { key: 'Bottom', value: 'end' }]
    }
  },
  computed: {
    style() {
      const columns = Math.min(6, Math.max(1, Math.round(Number(this.columns)) || 1))
      return { '--vp-columns': String(columns), '--vp-columns-gap': this.gap || '0px', '--vp-columns-min': this.min || '0px' }
    }
  }
}
<\/script>
<style>
.vp-columns {
  box-sizing: border-box;
  width: 100%;
  display: grid;
  gap: var(--vp-columns-gap, 24px);
  /* a column is the share it has of the width, but not narrower than the narrowest (nor wider than the row) */
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(100%, max(var(--vp-columns-min, 240px), (100% - (var(--vp-columns, 3) - 1) * var(--vp-columns-gap, 24px)) / var(--vp-columns, 3))), 1fr)
  );
}
.vp-columns > * { min-width: 0; }
.vp-columns--stretch { align-items: stretch; }
.vp-columns--start { align-items: start; }
.vp-columns--center { align-items: center; }
.vp-columns--end { align-items: end; }
</style>
`;export{e as default};