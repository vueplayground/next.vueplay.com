var e=`<template>
  <div class="vp-map" :style="style">
    <iframe v-if="place" class="vp-map__frame" :src="address" :title="'Map: ' + place" loading="lazy" referrerpolicy="no-referrer-when-downgrade" />
    <div v-else class="vp-map__empty">Write an address to show it on a map</div>
  </div>
</template>
<script>
// A map of one place: write the address the way you would search for it.
export default {
  props: {
    place: { type: String, default: 'Karl Johans gate 1, Oslo', label: 'Address', placeholder: 'Street, town' },
    zoom: { type: Number, default: 14, label: 'How close', control: 'number', min: 1, max: 20 },
    height: { type: String, default: '', label: 'Height', control: 'slider', unit: 'px', min: 160, max: 900 },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 60 },
    grey: { type: Boolean, default: false, label: 'In grey' }
  },
  computed: {
    address() {
      const zoom = Math.max(1, Math.min(20, Math.round(Number(this.zoom) || 14)))
      return 'https://www.google.com/maps?q=' + encodeURIComponent(this.place) + '&z=' + zoom + '&output=embed'
    },
    style() {
      return {
        '--vp-map-height': this.height || undefined,
        '--vp-map-radius': this.radius || undefined,
        '--vp-map-filter': this.grey ? 'grayscale(1)' : undefined
      }
    }
  }
}
<\/script>
<style>
.vp-map {
  box-sizing: border-box;
  width: 100%;
  height: var(--vp-map-height, clamp(16rem, 45vw, 26rem));
  overflow: hidden;
  border-radius: var(--vp-map-radius, var(--vp-radius, 12px));
  background: var(--vp-surface, #f1f5f9);
}
.vp-map__frame { display: block; width: 100%; height: 100%; border: 0; filter: var(--vp-map-filter, none); }
.vp-map__empty { display: flex; align-items: center; justify-content: center; height: 100%; padding: 1rem; color: var(--vp-muted, #94a3b8); font-size: 0.875rem; text-align: center; }
</style>
`;export{e as default};