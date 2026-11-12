var e=`<template>
  <div class="vp-tabs" :class="['vp-tabs--' + look, 'vp-tabs--' + align]" :style="style">
    <div class="vp-tabs__list" role="tablist">
      <button
        v-for="(item, index) in items"
        :key="index"
        type="button"
        role="tab"
        class="vp-tabs__tab"
        :class="{ 'vp-tabs__tab--on': index === shown }"
        :aria-selected="index === shown ? 'true' : 'false'"
        :tabindex="index === shown ? 0 : -1"
        @click="picked = index"
        @keydown.right.prevent="step(1, $event)"
        @keydown.left.prevent="step(-1, $event)"
      >{{ item.title }}</button>
    </div>
    <div v-for="(item, index) in items" v-show="index === shown" :key="index" class="vp-tabs__panel" role="tabpanel">{{ item.text }}</div>
  </div>
</template>
<script>
// A few texts in the room of one: a row of titles, each showing its own text when picked.
export default {
  props: {
    items: {
      type: Array,
      default: () => [
        { title: 'First', text: 'What the first tab tells. Add, move and remove tabs in the list.' },
        { title: 'Second', text: 'What the second tab tells.' },
        { title: 'Third', text: 'What the third tab tells.' }
      ],
      label: 'Tabs',
      control: 'list',
      fields: [{ key: 'title', label: 'Title' }, { key: 'text', label: 'Text', control: 'textarea' }]
    },
    look: {
      type: String,
      default: 'line',
      label: 'Look',
      options: [{ key: 'Line under', value: 'line' }, { key: 'Pills', value: 'pills' }]
    },
    align: {
      type: String,
      default: 'left',
      label: 'Align',
      options: [{ key: 'Left', value: 'left' }, { key: 'Center', value: 'center' }]
    },
    color: { type: String, default: '', label: 'Color', control: 'color' }
  },
  data() {
    return { picked: 0 }
  },
  computed: {
    // (the list can get shorter than what was picked)
    shown() {
      return Math.min(this.picked, Math.max(0, (this.items || []).length - 1))
    },
    style() {
      return { '--vp-tabs-color': this.color || undefined }
    }
  },
  methods: {
    step(by, event) {
      const count = (this.items || []).length
      if (!count) return
      this.picked = (this.shown + by + count) % count
      const tabs = event.currentTarget.parentNode.children
      this.$nextTick(() => tabs[this.picked] && tabs[this.picked].focus())
    }
  }
}
<\/script>
<style>
.vp-tabs { --_color: var(--vp-tabs-color, var(--vp-primary, #2563eb)); box-sizing: border-box; display: flex; flex-direction: column; gap: 1.25rem; width: 100%; min-width: 0; text-align: left; }
.vp-tabs__list { display: flex; flex-wrap: wrap; gap: 0.25rem 1.5rem; }
.vp-tabs--center .vp-tabs__list { justify-content: center; }
.vp-tabs--center { text-align: center; }
.vp-tabs--line .vp-tabs__list { border-bottom: 1px solid var(--vp-border, rgba(127, 127, 127, 0.28)); }
.vp-tabs__tab { margin: 0; padding: 0.7rem 0; border: 0; background: none; color: inherit; font: inherit; font-weight: 600; opacity: 0.6; cursor: pointer; transition: opacity 120ms ease, background-color 120ms ease; }
.vp-tabs__tab:hover { opacity: 1; }
.vp-tabs__tab:focus-visible { outline: 2px solid var(--_color); outline-offset: 2px; border-radius: 4px; }
.vp-tabs__tab--on { opacity: 1; color: var(--_color); }
.vp-tabs--line .vp-tabs__tab { margin-bottom: -1px; border-bottom: 2px solid transparent; }
.vp-tabs--line .vp-tabs__tab--on { border-bottom-color: var(--_color); }
.vp-tabs--pills .vp-tabs__list { gap: 0.5rem; }
.vp-tabs--pills .vp-tabs__tab { padding: 0.5rem 1rem; border-radius: 999px; }
.vp-tabs--pills .vp-tabs__tab--on { background: color-mix(in srgb, var(--_color) 14%, transparent); }
.vp-tabs__panel { line-height: 1.65; white-space: pre-line; }
</style>
`;export{e as default};