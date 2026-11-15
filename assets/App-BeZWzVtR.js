var e=`<template>
  <div ref="root" class="vp-account-button" :style="style" @keydown.esc="open = false">
    <a v-if="!person" class="vp-account-button__sign-in" :class="'vp-account-button__sign-in--' + variant" :href="signInLink" @click="go($event, signInLink)">{{ signInText }}</a>
    <template v-else>
      <button type="button" class="vp-account-button__me" :aria-expanded="open ? 'true' : 'false'" aria-haspopup="true" @click="open = !open">
        <span class="vp-account-button__face">
          <img v-if="person.avatar" :src="person.avatar" alt="">
          <template v-else>{{ initials }}</template>
        </span>
        <span v-if="showName" class="vp-account-button__name">{{ person.name || person.email }}</span>
        <svg class="vp-account-button__more" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
      </button>
      <div v-if="open" class="vp-account-button__menu" :class="'vp-account-button__menu--' + side" role="menu">
        <div class="vp-account-button__who">
          <b>{{ person.name || person.email }}</b>
          <small v-if="person.name">{{ person.email }}</small>
        </div>
        <a v-for="(link, i) in links" :key="i" class="vp-account-button__item" role="menuitem" :href="link.href" @click="go($event, link.href)">{{ link.text }}</a>
        <button type="button" class="vp-account-button__item vp-account-button__out" role="menuitem" @click="out">{{ signOutText }}</button>
      </div>
    </template>
  </div>
</template>
<script>
// For a site's header: "Sign in" while nobody is, and the visitor's picture once they are, which opens a small
// menu (their profile and the links you list, and Sign out). It uses the source in Data that visitors sign in
// with. In the Studio it shows the way you choose (signed in or not).
const SAMPLE = { id: 'sample', name: 'Kari Nordmann', email: 'kari@example.com', avatar: '' }

export default {
  inject: { vpData: { default: null } },
  props: {
    signInText: { type: String, default: 'Sign in', label: 'Text when signed out' },
    signInLink: { type: String, default: '/sign-in', label: 'Its link' },
    variant: { type: String, default: 'outline', label: 'Look when signed out', control: 'select', options: [{ key: 'A filled button', value: 'solid' }, { key: 'An outlined button', value: 'outline' }, { key: 'A link', value: 'link' }] },
    links: {
      type: Array,
      default: () => [{ text: 'Your profile', href: '/profile' }],
      label: 'Links in its menu',
      control: 'list',
      fields: [{ key: 'text', label: 'Text' }, { key: 'href', label: 'Goes to', placeholder: '/profile' }]
    },
    signOutText: { type: String, default: 'Sign out', label: 'Sign out' },
    showName: { type: Boolean, default: false, label: 'Show the name beside the picture' },
    side: { type: String, default: 'right', label: 'The menu opens to the', control: 'select', options: [{ key: 'Left', value: 'left' }, { key: 'Right', value: 'right' }] },
    preview: { type: String, default: 'in', label: 'In the editor, show it', control: 'select', options: [{ key: 'Signed in', value: 'in' }, { key: 'Signed out', value: 'out' }] },
    color: { type: String, default: '', label: 'Color', control: 'color' }
  },
  data() {
    return { open: false }
  },
  computed: {
    style() {
      return { '--vp-account-button-color': this.color || undefined }
    },
    inStudio() {
      return typeof document !== 'undefined' && (!!document.getElementById('receiver') || !!window.studio)
    },
    person() {
      if (this.inStudio) return this.preview === 'out' ? null : SAMPLE
      return this.vpData?.auth?.user || null
    },
    initials() {
      return String(this.person?.name || this.person?.email || '?').split(/[\\s@.]+/).filter(Boolean).slice(0, 2).map(word => word[0].toUpperCase()).join('')
    }
  },
  watch: {
    open(now) {
      if (now) document.addEventListener('pointerdown', this.outside)
      else document.removeEventListener('pointerdown', this.outside)
    }
  },
  methods: {
    outside(event) {
      if (!this.$refs.root?.contains(event.target)) this.open = false
    },
    go(event, link) {
      this.open = false
      if (this.$router && String(link).startsWith('/')) { event.preventDefault(); this.$router.push(link) }
    },
    out() {
      this.open = false
      if (!this.inStudio) this.vpData?.signOut?.()
    }
  },
  beforeUnmount() {
    document.removeEventListener('pointerdown', this.outside)
  }
}
<\/script>
<style>
.vp-account-button {
  --_color: var(--vp-account-button-color, var(--vp-primary, #2563eb));
  position: relative;
  display: inline-flex;
}
.vp-account-button__sign-in {
  display: inline-flex;
  align-items: center;
  padding: 0.55em 1.15em;
  border-radius: var(--vp-radius, 8px);
  color: inherit;
  font-weight: 600;
  line-height: 1.2;
  text-decoration: none;
  white-space: nowrap;
  transition: filter 120ms ease, background 120ms ease;
}
.vp-account-button__sign-in--solid { background: var(--_color); color: var(--vp-primary-contrast, #fff); }
.vp-account-button__sign-in--solid:hover { filter: brightness(1.08); }
.vp-account-button__sign-in--outline { box-shadow: inset 0 0 0 1.5px currentColor; }
.vp-account-button__sign-in--outline:hover { background: color-mix(in srgb, currentColor 8%, transparent); }
.vp-account-button__sign-in--link { padding-inline: 0.25em; }
.vp-account-button__sign-in--link:hover { text-decoration: underline; }
.vp-account-button__me {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.2rem 0.4rem 0.2rem 0.2rem;
  border: 0;
  border-radius: 999px;
  background: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
}
.vp-account-button__me:hover, .vp-account-button__me[aria-expanded="true"] { background: color-mix(in srgb, currentColor 8%, transparent); }
.vp-account-button__me:focus-visible { outline: 2px solid var(--_color); outline-offset: 2px; }
.vp-account-button__face {
  display: grid;
  place-items: center;
  width: 2.1rem;
  height: 2.1rem;
  overflow: hidden;
  border-radius: 50%;
  background: color-mix(in srgb, var(--_color) 18%, transparent);
  color: var(--_color);
  font-size: 0.8125rem;
  font-weight: 700;
}
.vp-account-button__face img { width: 100%; height: 100%; object-fit: cover; }
.vp-account-button__name { max-width: 10rem; overflow: hidden; font-weight: 550; text-overflow: ellipsis; white-space: nowrap; }
.vp-account-button__more { width: 1rem; height: 1rem; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; opacity: 0.6; }
.vp-account-button__menu {
  position: absolute;
  top: calc(100% + 8px);
  z-index: 50;
  display: flex;
  flex-direction: column;
  min-width: 13rem;
  padding: 0.4rem;
  border: 1px solid color-mix(in srgb, var(--vp-text, #111827) 10%, transparent);
  border-radius: calc(var(--vp-radius, 8px) + 4px);
  background: var(--vp-background, #fff);
  color: var(--vp-text, #111827);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.14), 0 2px 6px rgba(0, 0, 0, 0.05);
  animation: vp-account-button-in 0.18s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.vp-account-button__menu--right { right: 0; }
.vp-account-button__menu--left { left: 0; }
.vp-account-button__who { display: flex; flex-direction: column; padding: 0.5rem 0.7rem 0.6rem; margin-bottom: 0.3rem; border-bottom: 1px solid color-mix(in srgb, currentColor 10%, transparent); }
.vp-account-button__who small { opacity: 0.65; }
.vp-account-button__item {
  display: block;
  padding: 0.55rem 0.7rem;
  border: 0;
  border-radius: calc(var(--vp-radius, 8px) - 2px);
  background: none;
  color: inherit;
  font: inherit;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
}
.vp-account-button__item:hover, .vp-account-button__item:focus-visible { background: color-mix(in srgb, var(--_color) 10%, transparent); outline: none; }
.vp-account-button__out { color: #c0362c; }
@keyframes vp-account-button-in { from { opacity: 0; transform: translateY(-4px); } }
@media (prefers-reduced-motion: reduce) { .vp-account-button__menu { animation: none; } }
</style>
`;export{e as default};