var e=`<template>
  <footer class="vp-footer" :style="style">
    <div class="vp-footer__inner">
      <div class="vp-footer__top">
        <div v-if="brand || text" class="vp-footer__about">
          <div v-if="brand" class="vp-footer__brand">{{ brand }}</div>
          <p v-if="text" class="vp-footer__text">{{ text }}</p>
          <slot />
        </div>
        <nav v-for="group in groups" :key="group.name" class="vp-footer__group" :aria-label="group.name || 'Links'">
          <div v-if="group.name" class="vp-footer__heading">{{ group.name }}</div>
          <a v-for="(link, index) in group.links" :key="index" class="vp-footer__link" :href="link.href || undefined" @click="go($event, link.href)">{{ link.text }}</a>
        </nav>
      </div>
      <div v-if="note" class="vp-footer__note">{{ note }}</div>
    </div>
  </footer>
</template>
<script>
// The bottom of a site: who it is, the links people look for there in a few groups, and the small print.
export default {
  props: {
    brand: { type: String, default: 'Your name', label: 'Name' },
    text: { type: String, default: 'A line about what you do.', label: 'About', control: 'textarea' },
    links: {
      type: Array,
      default: () => [
        { group: 'Site', text: 'Home', href: '/' },
        { group: 'Site', text: 'About', href: '/about' },
        { group: 'Help', text: 'Contact', href: '/contact' },
        { group: 'Help', text: 'Privacy', href: '/privacy' }
      ],
      label: 'Links',
      control: 'list',
      fields: [{ key: 'text', label: 'Text' }, { key: 'href', label: 'Link', placeholder: '/page, #anchor or https://…' }, { key: 'group', label: 'Under the heading' }]
    },
    note: { type: String, default: '© Your name. All rights reserved.', label: 'Small print' },
    background: { type: String, default: '', label: 'Background', control: 'color' },
    color: { type: String, default: '', label: 'Text color', control: 'color' }
  },
  computed: {
    // links under the same heading are one group, in the order the headings first come
    groups() {
      const groups = []
      for (const link of this.links || []) {
        const name = String(link.group || '').trim()
        let group = groups.find(one => one.name === name)
        if (!group) groups.push(group = { name, links: [] })
        group.links.push(link)
      }
      return groups
    },
    style() {
      return { background: this.background || undefined, color: this.color || undefined }
    }
  },
  methods: {
    // A page of the site is shown by the site's router where there is one, without loading the site again
    go(event, href) {
      const router = this.$router
      if (!router || !href || !/^\\/(?!\\/)/.test(href)) return
      if (event.defaultPrevented || event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      event.preventDefault()
      router.push(href)
    }
  }
}
<\/script>
<style>
.vp-footer { box-sizing: border-box; width: 100%; border-top: 1px solid var(--vp-border, rgba(127, 127, 127, 0.22)); text-align: left; }
.vp-footer__inner { box-sizing: border-box; width: 100%; max-width: var(--vp-width, 1120px); margin: 0 auto; padding: clamp(2rem, 6vw, 3.5rem) clamp(1rem, 4vw, 2rem) 1.5rem; }
.vp-footer__top { display: flex; flex-wrap: wrap; gap: 2rem clamp(2rem, 6vw, 4rem); }
.vp-footer__about { display: flex; flex: 2 1 16rem; flex-direction: column; gap: 0.6rem; min-width: 0; }
.vp-footer__brand { font-family: var(--vp-font-heading, inherit); font-size: 1.125rem; font-weight: 700; }
.vp-footer__text { max-width: 26rem; margin: 0; line-height: 1.6; opacity: 0.7; white-space: pre-line; }
.vp-footer__group { display: flex; flex: 1 1 8rem; flex-direction: column; align-items: flex-start; gap: 0.6rem; min-width: 0; }
.vp-footer__heading { font-size: 0.8125rem; font-weight: 650; letter-spacing: 0.06em; text-transform: uppercase; opacity: 0.6; }
.vp-footer__link { color: inherit; text-decoration: none; opacity: 0.8; transition: opacity 120ms ease; }
.vp-footer__link:hover { opacity: 1; text-decoration: underline; text-underline-offset: 0.2em; }
.vp-footer__note { margin-top: clamp(1.5rem, 5vw, 2.5rem); padding-top: 1.25rem; border-top: 1px solid var(--vp-border, rgba(127, 127, 127, 0.22)); font-size: 0.875rem; opacity: 0.65; }
</style>
`;export{e as default};