var e=`<template>
  <div class="vp-stack" :class="['vp-stack--' + direction, 'vp-stack--align-' + align, 'vp-stack--place-' + spread, { 'vp-stack--nowrap': !wrap }]" :style="style">
    <slot />
  </div>
</template>
<script>
// Puts what is inside it after each other with the same space between: in a row (two buttons, a few logos,
// a picture beside its text) or under each other. A row folds onto more lines when it runs out of room.
export default {
  props: {
    direction: {
      type: String,
      default: 'row',
      label: 'Direction',
      options: [{ key: 'In a row', value: 'row' }, { key: 'Under each other', value: 'column' }]
    },
    gap: { type: String, default: '', label: 'Space between', control: 'slider', unit: 'px', min: 0, max: 80 },
    align: {
      type: String,
      default: 'center',
      label: 'Line up',
      options: [{ key: 'At the start', value: 'start' }, { key: 'In the middle', value: 'center' }, { key: 'At the end', value: 'end' }, { key: 'Same size', value: 'stretch' }]
    },
    spread: {
      type: String,
      default: 'start',
      label: 'Place',
      options: [{ key: 'At the start', value: 'start' }, { key: 'In the middle', value: 'center' }, { key: 'At the end', value: 'end' }, { key: 'Spread out', value: 'between' }]
    },
    wrap: { type: Boolean, default: true, label: 'Fold onto more lines' }
  },
  computed: {
    style() {
      return { '--vp-stack-gap': this.gap || undefined }
    }
  }
}
<\/script>
<style>
.vp-stack {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  gap: var(--vp-stack-gap, 1rem);
  min-width: 0;
  max-width: 100%;
}
.vp-stack--row { flex-direction: row; }
.vp-stack--column { flex-direction: column; flex-wrap: nowrap; }
.vp-stack--nowrap { flex-wrap: nowrap; }
.vp-stack--align-start { align-items: flex-start; }
.vp-stack--align-center { align-items: center; }
.vp-stack--align-end { align-items: flex-end; }
.vp-stack--align-stretch { align-items: stretch; }
.vp-stack--place-start { justify-content: flex-start; }
.vp-stack--place-center { justify-content: center; }
.vp-stack--place-end { justify-content: flex-end; }
.vp-stack--place-between { justify-content: space-between; }
/* parts placed in the middle, at the end or apart need the whole width to be placed in, also in a Section
   that holds its content to the left */
.vp-stack--place-center, .vp-stack--place-end, .vp-stack--place-between { align-self: stretch; }
</style>
`;export{e as default};