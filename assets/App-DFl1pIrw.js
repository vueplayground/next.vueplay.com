var e=`<template>
  <div class="vp-tabs" :class="['vp-tabs--' + look, 'vp-tabs--' + align]" :style="style">
    <div class="vp-tabs__list" role="tablist">
      <button
        v-for="(item, index) in items"
        :key="index"
        type="button"
        :id="uid + '-tab-' + index"
        role="tab"
        :aria-controls="uid + '-panel-' + index"
        class="vp-tabs__tab"
        :class="{ 'vp-tabs__tab--on': index === shown }"
        :aria-selected="index === shown ? 'true' : 'false'"
        :tabindex="index === shown ? 0 : -1"
        @click="picked = index"
        @keydown.right.prevent="step(1, $event)"
        @keydown.left.prevent="step(-1, $event)"
        @keydown.home.prevent="go(0, $event)"
        @keydown.end.prevent="go(-1, $event)"
      >{{ item.title }}</button>
    </div>
    <div v-for="(item, index) in items" v-show="index === shown" :id="uid + '-panel-' + index" :key="index" class="vp-tabs__panel" role="tabpanel" :aria-labelledby="uid + '-tab-' + index" tabindex="0">{{ item.text }}</div>
  </div>
</template>
<script>
// A few texts in the room of one: a row of titles, each showing its own text when picked.

// each Tabs on the page its own ids, so a title and its text name each other for screen readers
let made = 0

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
    return { picked: 0, uid: 'vp-tabs-' + ++made }
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
      this.go((this.shown + by + count) % count, event)
    },
    // to a tab by its place (-1: the last), with the focus on it
    go(index, event) {
      const count = (this.items || []).length
      if (!count) return
      this.picked = index < 0 ? count - 1 : Math.min(index, count - 1)
      const tabs = event.currentTarget.parentNode.children
      this.$nextTick(() => tabs[this.picked] && tabs[this.picked].focus())
    }
  }
}
<\/script>
<style>
.vp-tabs { --_color: var(--vp-tabs-color, var(--vp-primary, #2563eb)); --_hair: var(--vp-border, rgba(127, 127, 127, 0.28)); box-sizing: border-box; display: flex; flex-direction: column; gap: 1.5rem; width: 100%; min-width: 0; text-align: left; }
.vp-tabs__list { display: flex; flex-wrap: wrap; gap: 0.25rem 0.5rem; }
.vp-tabs--center .vp-tabs__list { justify-content: center; }
.vp-tabs--center { text-align: center; }
.vp-tabs--line .vp-tabs__list { gap: 0 0.25rem; border-bottom: 1px solid var(--_hair); }
.vp-tabs__tab { margin: 0; min-height: 2.75rem; padding: 0.7rem 0.9rem; border: 0; background: none; color: color-mix(in oklch, currentColor 66%, transparent); font: inherit; font-size: 0.9375rem; font-weight: 600; line-height: 1.3; cursor: pointer; -webkit-tap-highlight-color: transparent; transition: color 140ms ease, background-color 140ms ease, box-shadow 140ms ease, border-color 140ms ease; }
.vp-tabs__tab:hover { color: inherit; }
.vp-tabs__tab:focus-visible { outline: 2px solid var(--_color); outline-offset: 2px; border-radius: 4px; }
/* (the colour leans a little to the text's, so the chosen one is read on a light page and a dark one alike) */
.vp-tabs__tab--on, .vp-tabs__tab--on:hover { color: color-mix(in srgb, var(--_color) 65%, var(--vp-text, #111827)); }
/* (line under: pointed at, a title gets a pale line where the chosen one has the coloured one) */
.vp-tabs--line .vp-tabs__tab { margin-bottom: -1px; border-bottom: 2px solid transparent; }
.vp-tabs--line .vp-tabs__tab:hover { border-bottom-color: color-mix(in oklch, currentColor 30%, transparent); }
.vp-tabs--line .vp-tabs__tab--on, .vp-tabs--line .vp-tabs__tab--on:hover { border-bottom-color: var(--_color); }
.vp-tabs--pills .vp-tabs__list { gap: 0.375rem; }
.vp-tabs--pills .vp-tabs__tab { padding: 0.55rem 1.1rem; border-radius: 999px; }
.vp-tabs--pills .vp-tabs__tab:hover { background: color-mix(in oklch, currentColor 7%, transparent); }
.vp-tabs--pills .vp-tabs__tab--on, .vp-tabs--pills .vp-tabs__tab--on:hover { background: color-mix(in srgb, var(--_color) 14%, transparent); box-shadow: inset 0 0 0 1px color-mix(in oklch, var(--_color) 26%, transparent); }
/* on a phone the titles stay on one line that is scrolled sideways, so the line under them stays one line */
@media (max-width: 640px) {
  .vp-tabs__list { flex-wrap: nowrap; overflow-x: auto; scroll-snap-type: x proximity; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
  .vp-tabs__list::-webkit-scrollbar { display: none; }
  .vp-tabs__tab { flex: none; white-space: nowrap; scroll-snap-align: start; }
  .vp-tabs--center .vp-tabs__list { justify-content: safe center; }
  /* (what scrolls is cut at its edges: the line under a title sits on the grey line, the focus ring inside) */
  .vp-tabs--line .vp-tabs__tab { margin-bottom: 0; }
  .vp-tabs__tab:focus-visible { outline-offset: -2px; }
}
@keyframes vp-tabs-in {
  from { opacity: 0; transform: translateY(4px); }
}
.vp-tabs__panel { max-width: 46rem; line-height: 1.65; white-space: pre-line; animation: vp-tabs-in 240ms ease; }
.vp-tabs--center .vp-tabs__panel { margin-inline: auto; }
.vp-tabs__panel:focus-visible { outline: 2px solid var(--_color); outline-offset: 4px; border-radius: 4px; }
@media (prefers-reduced-motion: reduce) {
  .vp-tabs__tab { transition: none; }
  .vp-tabs__panel { animation: none; }
}
</style>
`;export{e as default};