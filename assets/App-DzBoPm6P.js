var e=`<template>
  <div class="vp-columns" :class="['vp-columns--' + align, widths !== 'equal' ? 'vp-columns--' + widths : '', { 'vp-columns--reverse': reverse }]" :style="style">
    <slot />
  </div>
</template>
<script>
// Parts side by side that fold under each other by themselves on a narrow screen: each part put inside is
// one column. There are never more beside each other than \`columns\`, and none gets narrower than \`min\`.
// With \`widths\` two columns are not the same: one twice as wide as the other (a chart and a list beside it), on a
// screen wide enough for it (below, under each other); \`columns\` and \`min\` are then not used.
// With \`reverse\` they stand under each other on a phone the last first (a picture beside its text, the text
// first on the left on a wide screen but the picture first above it on a phone).
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
    },
    widths: {
      type: String,
      default: 'equal',
      label: 'Widths',
      control: 'select',
      options: [{ key: 'All the same', value: 'equal' }, { key: 'Two: the first twice as wide', value: 'wide-first' }, { key: 'Two: the last twice as wide', value: 'wide-last' }, { key: 'Two: the first three times as wide', value: 'widest-first' }]
    },
    reverse: { type: Boolean, default: false, label: 'On a phone: under each other, the last first' }
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
.vp-columns--wide-first, .vp-columns--wide-last, .vp-columns--widest-first { grid-template-columns: minmax(0, 1fr); }
@media (min-width: 900px) {
  .vp-columns--wide-first { grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); }
  .vp-columns--wide-last { grid-template-columns: minmax(0, 1fr) minmax(0, 2fr); }
  .vp-columns--widest-first { grid-template-columns: minmax(0, 3fr) minmax(0, 1fr); }
}
/* on a phone (or, for two of different widths, wherever they stand under each other) the last comes first */
@media (max-width: 639px) {
  .vp-columns--reverse { display: flex; flex-direction: column-reverse; }
}
@media (max-width: 899px) {
  .vp-columns--reverse.vp-columns--wide-first, .vp-columns--reverse.vp-columns--wide-last, .vp-columns--reverse.vp-columns--widest-first { display: flex; flex-direction: column-reverse; }
}
</style>
`;export{e as default};