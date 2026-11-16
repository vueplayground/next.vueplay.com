var e=`<template>
  <div class="vp-accordion" :class="'vp-accordion--' + look" :style="style">
    <div v-for="(item, index) in items" :key="index" class="vp-accordion__item" :class="{ 'vp-accordion__item--open': isOpen(index) }">
      <component :is="level" class="vp-accordion__heading">
        <button
          :id="uid + '-title-' + index"
          type="button"
          class="vp-accordion__title"
          :aria-expanded="isOpen(index) ? 'true' : 'false'"
          :aria-controls="uid + '-text-' + index"
          @click="toggle(index)"
        >
          <span>{{ item.title }}</span>
          <svg class="vp-accordion__mark" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
        </button>
      </component>
      <div class="vp-accordion__panel">
        <div :id="uid + '-text-' + index" class="vp-accordion__text" role="region" :aria-labelledby="uid + '-title-' + index">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>
<script>
// Questions and answers, or anything long that reads better folded: a list of titles, each opening its text.
// Each title is a heading (screen readers jump between them) holding the button that opens its text.

// (each accordion on a page has a number of its own, so the ids that tie a title to its text are its own)
let made = 0

export default {
  props: {
    items: {
      type: Array,
      default: () => [
        { title: 'What is this?', text: 'A short answer that says the most important thing first.' },
        { title: 'How does it work?', text: 'Write the answer here. Add, move and remove questions in the list.' },
        { title: 'What does it cost?', text: 'Say it plainly, and link to the prices when there is more to tell.' }
      ],
      label: 'Questions',
      control: 'list',
      fields: [{ key: 'title', label: 'Title' }, { key: 'text', label: 'Text', control: 'textarea' }]
    },
    look: {
      type: String,
      default: 'lines',
      label: 'Look',
      options: [{ key: 'Lines between', value: 'lines' }, { key: 'Boxes', value: 'boxes' }]
    },
    first: { type: Boolean, default: true, label: 'First one open' },
    single: { type: Boolean, default: true, label: 'One open at a time' },
    color: { type: String, default: '', label: 'Title color', control: 'color' },
    level: {
      type: String,
      default: 'h3',
      label: 'Titles are a',
      options: [{ key: 'Heading 2', value: 'h2' }, { key: 'Heading 3', value: 'h3' }, { key: 'Heading 4', value: 'h4' }, { key: 'Plain line', value: 'div' }]
    },
    faq: { type: Boolean, default: false, label: 'Questions and answers for search engines (FAQ)' }
  },
  data() {
    return { open: this.first ? [0] : [], uid: 'vp-accordion-' + ++made }
  },
  watch: {
    // (turning "First one open" on or off in the Props tab is seen at once)
    first(now) {
      this.open = now ? [0] : []
    }
  },
  computed: {
    inStudio() {
      return typeof document !== 'undefined' && (document.getElementById('receiver') ? document.getElementById('receiver').getAttribute('live') !== 'yes' : !!window.studio)
    },
    style() {
      return { '--vp-accordion-color': this.color || undefined }
    }
  },
  methods: {
    isOpen(index) {
      return this.open.includes(index)
    },
    toggle(index) {
      if (this.isOpen(index)) this.open = this.open.filter(i => i !== index)
      else this.open = this.single ? [index] : [...this.open, index]
    }
  },
  // What search engines read (on the site, not in the editor): the questions and their answers, when it is an FAQ
  head() {
    const items = this.faq && !this.inStudio ? (this.items || []).filter(item => String(item?.title || '').trim() && String(item?.text || '').trim()) : []
    if (!items.length) return {}
    return {
      script: [{
        type: 'application/ld+json',
        textContent: {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: items.map(item => ({ '@type': 'Question', name: String(item.title).trim(), acceptedAnswer: { '@type': 'Answer', text: String(item.text).trim() } }))
        }
      }]
    }
  }
}
<\/script>
<style>
.vp-accordion {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  text-align: left;
}
.vp-accordion--boxes { gap: 0.75rem; }
.vp-accordion__item { border-bottom: 1px solid var(--vp-border, rgba(127, 127, 127, 0.28)); }
.vp-accordion--boxes .vp-accordion__item {
  border: 1px solid var(--vp-border, rgba(127, 127, 127, 0.28));
  border-radius: var(--vp-radius, 12px);
  padding-inline: 1.25rem;
}
.vp-accordion__heading { margin: 0; padding: 0; font: inherit; color: inherit; letter-spacing: inherit; text-transform: none; }
.vp-accordion__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  margin: 0;
  padding: 1.1rem 0;
  border: 0;
  background: none;
  color: var(--vp-accordion-color, inherit);
  font: inherit;
  font-weight: 600;
  font-size: 1.0625rem;
  line-height: 1.35;
  text-align: left;
  cursor: pointer;
}
.vp-accordion__title:focus-visible { outline: 2px solid var(--vp-primary, #2563eb); outline-offset: 2px; border-radius: 4px; }
.vp-accordion__mark {
  flex: none;
  width: 1.25rem;
  height: 1.25rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.6;
  transition: transform 180ms ease;
}
.vp-accordion__item--open .vp-accordion__mark { transform: rotate(180deg); }
/* a closed text folds to nothing (and is hidden from screen readers and the Tab key); it slides open */
.vp-accordion__panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 220ms ease;
}
.vp-accordion__item--open > .vp-accordion__panel { grid-template-rows: 1fr; }
.vp-accordion__text {
  min-height: 0;
  overflow: hidden;
  visibility: hidden;
  padding: 0 2.25rem 0 0;
  line-height: 1.65;
  opacity: 0.8;
  white-space: pre-line;
  transition: visibility 0s 220ms, padding-bottom 220ms ease;
}
.vp-accordion__item--open .vp-accordion__text { visibility: visible; padding-bottom: 1.25rem; transition: visibility 0s, padding-bottom 220ms ease; }
@media (prefers-reduced-motion: reduce) {
  .vp-accordion__mark, .vp-accordion__panel, .vp-accordion__text, .vp-accordion__item--open .vp-accordion__text { transition: none; }
}
</style>
`;export{e as default};