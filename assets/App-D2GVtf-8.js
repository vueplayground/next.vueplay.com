var e=`<template>
  <footer class="vp-footer" :style="style">
    <div class="vp-footer__inner">
      <div class="vp-footer__top">
        <div v-if="brand || text || networks.length || $slots.default" class="vp-footer__about">
          <div v-if="brand" class="vp-footer__brand">{{ brand }}</div>
          <p v-if="text" class="vp-footer__text">{{ text }}</p>
          <ul v-if="networks.length" class="vp-footer__social" :aria-label="say('social')">
            <li v-for="(one, index) in networks" :key="index">
              <a class="vp-footer__network" :href="one.href" target="_blank" rel="noopener" :aria-label="one.name">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path v-for="(d, n) in one.drawing" :key="n" :d="d" /></svg>
              </a>
            </li>
          </ul>
          <slot />
        </div>
        <nav v-for="group in groups" :key="group.name" class="vp-footer__group" :aria-label="say('links', group.name)">
          <component :is="level" v-if="group.name" class="vp-footer__heading">{{ group.name }}</component>
          <ul class="vp-footer__list">
            <li v-for="(link, index) in group.links" :key="index">
              <a v-if="hrefOf(link)" class="vp-footer__link" :href="hrefOf(link)" @click="go($event, hrefOf(link))">{{ link.text }}</a>
              <span v-else class="vp-footer__link vp-footer__link--plain">{{ link.text }}</span>
            </li>
          </ul>
        </nav>
      </div>
      <div v-if="note" class="vp-footer__note">{{ smallPrint }}</div>
    </div>
  </footer>
</template>
<script>
// The bottom of a site: who it is, the links people look for there in a few groups, and the small print.

// The words it says itself, in the site's language (App.vue's head says it: \`htmlAttrs: { lang }\`). A text
// that is filled in in the Props tab is said as it is written.
const WORDS = {
  en: { links: 'Links', social: 'Social media' },
  nb: { links: 'Lenker', social: 'Sosiale medier' },
  sv: { links: 'Länkar', social: 'Sociala medier' },
  da: { links: 'Links', social: 'Sociale medier' },
  fi: { links: 'Linkit', social: 'Sosiaalinen media' },
  de: { links: 'Links', social: 'Soziale Medien' },
  fr: { links: 'Liens', social: 'Réseaux sociaux' },
  es: { links: 'Enlaces', social: 'Redes sociales' },
  it: { links: 'Link', social: 'Social media' },
  nl: { links: 'Links', social: 'Sociale media' },
  pt: { links: 'Links', social: 'Redes sociais' },
  pl: { links: 'Linki', social: 'Media społecznościowe' },
  zh: { links: '链接', social: '社交媒体' },
  ja: { links: 'リンク', social: 'ソーシャルメディア' }
}

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
    social: {
      type: Array,
      default: () => [],
      label: 'Social media',
      control: 'list',
      fields: [{ key: 'network', label: 'Network', control: 'icons', options: [{ key: 'Instagram', value: 'instagram', icon: 'M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z|M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z|M17.5 6.5h.01' }, { key: 'Facebook', value: 'facebook', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' }, { key: 'X', value: 'x', icon: 'M4 4l11.733 16H20L8.267 4z|M4 20l6.768-6.768|M13.228 10.772L20 4' }, { key: 'LinkedIn', value: 'linkedin', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z|M2 9h4v12H2z|M2 4a2 2 0 104 0 2 2 0 10-4 0z' }, { key: 'YouTube', value: 'youtube', icon: 'M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z|M9.75 15.02l5.75-3.27-5.75-3.27v6.54z' }, { key: 'TikTok', value: 'tiktok', icon: 'M21 7.917v4.034A9.948 9.948 0 0116 10v4.5a6.5 6.5 0 11-8-6.326v4.326a2.5 2.5 0 104 2V3h4.083A6.005 6.005 0 0021 7.917z' }] }, { key: 'href', label: 'Link', placeholder: 'https://instagram.com/yourname' }, { key: 'label', label: 'Said to screen readers', placeholder: 'Else the name of the network' }]
    },
    note: { type: String, default: '© Your name. All rights reserved.', label: 'Small print', placeholder: '© {year} Your name' },
    // (a heading, so screen readers can jump to each group; it looks the same whatever its level)
    level: {
      type: String,
      default: 'h2',
      label: 'Headings of the groups are a',
      options: [{ key: 'Heading 2', value: 'h2' }, { key: 'Heading 3', value: 'h3' }, { key: 'Heading 4', value: 'h4' }, { key: 'Plain line', value: 'div' }]
    },
    background: { type: String, default: '', label: 'Background', control: 'color' },
    color: { type: String, default: '', label: 'Text color', control: 'color' }
  },
  computed: {
    lang() {
      let lang = ''
      try {
        const head = this.$root?.$options?.head
        lang = (typeof head === 'function' ? head.call(this.$root) : head)?.htmlAttrs?.lang || ''
      } catch (e) {}
      if (!lang && typeof document !== 'undefined') lang = document.documentElement.lang || ''
      return String(lang || 'en').toLowerCase()
    },
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
    // the networks that have a link, each with its drawing (kept with its name in the options above, for the Studio's picker)
    networks() {
      const options = this.$options.props.social.fields[0].options
      return (this.social || []).map(one => {
        const found = options.find(option => option.value === one?.network)
        const href = String(one?.href || '').trim()
        return found && href ? { href, name: String(one.label || '').trim() || found.key, drawing: found.icon.split('|') } : null
      }).filter(Boolean)
    },
    // the small print, with {year} as this year (so it is never a year behind)
    smallPrint() {
      return String(this.note).replace(/\\{year\\}/g, String(new Date().getFullYear()))
    },
    style() {
      return { background: this.background || undefined, color: this.color || undefined }
    }
  },
  methods: {
    say(key, own, n) {
      if (own) return own
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return String(words[key] ?? WORDS.en[key]).replace('{n}', n ?? '')
    },
    // (a link with no address is plain text: an <a> without one is neither focusable nor a link)
    hrefOf(link) {
      return String(link?.href || '').trim()
    },
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
.vp-footer { --_hair: var(--vp-border, rgba(127, 127, 127, 0.22)); box-sizing: border-box; width: 100%; border-top: 1px solid var(--_hair); font-size: 0.9375rem; text-align: left; }
.vp-footer__inner { box-sizing: border-box; width: 100%; max-width: var(--vp-width, 1120px); margin: 0 auto; padding: clamp(2.5rem, 7vw, 4.5rem) clamp(1rem, 4vw, 2rem) clamp(1.5rem, 4vw, 2rem); }
/* (the name and its line take the room of two groups; the groups share the rest in even columns, two side
   by side on a phone) */
.vp-footer__top { display: flex; flex-wrap: wrap; gap: 2.5rem clamp(1.5rem, 5vw, 4rem); }
.vp-footer__about { display: flex; flex: 2.5 1 17rem; flex-direction: column; align-items: flex-start; gap: 0.75rem; min-width: 0; }
.vp-footer__brand { font-family: var(--vp-font-heading, inherit); font-size: 1.1875rem; font-weight: 700; line-height: 1.25; letter-spacing: -0.015em; }
.vp-footer__text { max-width: 22rem; margin: 0; color: color-mix(in oklch, currentColor 68%, transparent); line-height: 1.6; white-space: pre-line; }
.vp-footer__social { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 0.5rem 0 0; padding: 0; list-style: none; }
.vp-footer__network { display: inline-flex; align-items: center; justify-content: center; width: 2.25rem; height: 2.25rem; border: 1px solid var(--_hair); border-radius: 999px; color: color-mix(in oklch, currentColor 72%, transparent); transition: color 140ms ease, border-color 140ms ease, background-color 140ms ease, transform 140ms ease; }
.vp-footer__network:hover { border-color: color-mix(in oklch, var(--vp-primary, #2563eb) 45%, transparent); background: color-mix(in oklch, var(--vp-primary, #2563eb) 9%, transparent); color: var(--vp-primary, #2563eb); transform: translateY(-1px); }
.vp-footer__network:focus-visible, .vp-footer__link:focus-visible { outline: 2px solid var(--vp-primary, #2563eb); outline-offset: 3px; border-radius: 4px; }
.vp-footer__network:focus-visible { border-radius: 999px; }
.vp-footer__network svg { width: 1.0625rem; height: 1.0625rem; fill: none; stroke: currentColor; stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round; }
.vp-footer__group { display: flex; flex: 1 1 8.5rem; flex-direction: column; align-items: flex-start; gap: 1rem; min-width: 0; }
.vp-footer__heading { margin: 0; padding-top: 0.3rem; font-family: inherit; line-height: 1.4; color: color-mix(in oklch, currentColor 58%, transparent); font-size: 0.75rem; font-weight: 600; letter-spacing: 0.09em; text-transform: uppercase; }
.vp-footer__list { display: flex; flex-direction: column; align-items: flex-start; gap: 0.7rem; margin: 0; padding: 0; list-style: none; }
.vp-footer__link { color: color-mix(in oklch, currentColor 80%, transparent); line-height: 1.4; text-decoration: none; transition: color 140ms ease; }
.vp-footer__link:any-link { background: linear-gradient(currentColor, currentColor) no-repeat 0 100% / 0 1px; transition: color 140ms ease, background-size 220ms ease; }
.vp-footer__link:any-link:hover { background-size: 100% 1px; color: inherit; }
.vp-footer__link--plain { color: color-mix(in oklch, currentColor 62%, transparent); }
.vp-footer__note { margin-top: clamp(2rem, 6vw, 3.5rem); padding-top: 1.5rem; border-top: 1px solid var(--_hair); color: color-mix(in oklch, currentColor 60%, transparent); font-size: 0.8125rem; line-height: 1.5; }
@media (prefers-reduced-motion: reduce) {
  .vp-footer__network, .vp-footer__link, .vp-footer__link:any-link { transition: none; }
  .vp-footer__network:hover { transform: none; }
}
</style>
`;export{e as default};