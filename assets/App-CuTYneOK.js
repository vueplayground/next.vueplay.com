var e=`<template>
  <div class="vp-spacer" :class="{ 'vp-spacer--same': phone === 'same' }" :style="{ '--vp-spacer-size': size || undefined }" aria-hidden="true" />
</template>
<script>
// Empty room between two parts, where the gap of what they are in is not enough. On a phone a large room is
// made smaller (a little over half, never under 24px), so it does not take most of the screen.
export default {
  props: {
    size: { type: String, default: '32px', label: 'Height', control: 'slider', unit: 'px', min: 0, max: 240 },
    phone: {
      type: String,
      default: 'smaller',
      label: 'On a phone',
      options: [{ key: 'Smaller', value: 'smaller' }, { key: 'The same', value: 'same' }]
    }
  }
}
<\/script>
<style>
.vp-spacer {
  flex: none;
  width: 100%;
  height: var(--vp-spacer-size, 32px);
}
@media (max-width: 640px) {
  .vp-spacer:not(.vp-spacer--same) { height: max(min(var(--vp-spacer-size, 32px), 24px), calc(var(--vp-spacer-size, 32px) * 0.6)); }
}
</style>
`;export{e as default};