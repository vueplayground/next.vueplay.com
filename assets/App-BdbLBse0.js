var e=`<template>
  <div class="vp-spacer" :style="{ height: size || undefined }" aria-hidden="true" />
</template>
<script>
// Empty room between two parts, where the gap of what they are in is not enough.
export default {
  props: {
    size: { type: String, default: '32px', label: 'Height', control: 'slider', unit: 'px', min: 0, max: 240 }
  }
}
<\/script>
<style>
.vp-spacer {
  flex: none;
  width: 100%;
}
</style>
`;export{e as default};