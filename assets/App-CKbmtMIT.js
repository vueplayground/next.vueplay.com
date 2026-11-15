var e=`<template>
  <div ref="root" class="vp-account-button" :style="style" @keydown.esc="open = false">
    <a v-if="!person" class="vp-account-button__sign-in" :class="'vp-account-button__sign-in--' + variant" :href="signInLink" @click="go($event, signInLink)">{{ say('signIn', signInText) }}</a>
    <template v-else>
      <button type="button" class="vp-account-button__me" :aria-expanded="open ? 'true' : 'false'" aria-haspopup="menu" :aria-controls="open ? menuId : undefined" :aria-label="say('account', '', person.name || person.email)" @click="open = !open">
        <span class="vp-account-button__face">
          <img v-if="person.avatar" :src="person.avatar" alt="">
          <template v-else>{{ initials }}</template>
        </span>
        <span v-if="showName" class="vp-account-button__name">{{ person.name || person.email }}</span>
        <svg class="vp-account-button__more" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
      </button>
      <div v-if="open" :id="menuId" class="vp-account-button__menu" :class="'vp-account-button__menu--' + side" role="menu">
        <div class="vp-account-button__who">
          <b>{{ person.name || person.email }}</b>
          <small v-if="person.name">{{ person.email }}</small>
        </div>
        <a v-for="(link, i) in menu" :key="i" class="vp-account-button__item" role="menuitem" :href="link.href" @click="go($event, link.href)">{{ link.text }}</a>
        <button type="button" class="vp-account-button__item vp-account-button__out" role="menuitem" @click="out">{{ say('signOut', signOutText) }}</button>
      </div>
    </template>
  </div>
</template>
<script>
// For a site's header: "Sign in" while nobody is, and the visitor's picture once they are, which opens a small
// menu (their profile and the links you list, and Sign out). It uses the source in Data that visitors sign in
// with. In the Studio it shows the way you choose (signed in or not).
const SAMPLE = { id: 'sample', name: 'Kari Nordmann', email: 'kari@example.com', avatar: '' }

// The words it says itself, in the site's language (App.vue's head says it: \`htmlAttrs: { lang }\`). A text
// that is filled in in the Props tab is said as it is written.
const WORDS = {
  en: { signIn: 'Sign in', signOut: 'Sign out', profile: 'Your profile', account: 'Your account: {name}' },
  nb: { signIn: 'Logg inn', signOut: 'Logg ut', profile: 'Profilen din', account: 'Kontoen din: {name}' },
  sv: { signIn: 'Logga in', signOut: 'Logga ut', profile: 'Din profil', account: 'Ditt konto: {name}' },
  da: { signIn: 'Log ind', signOut: 'Log ud', profile: 'Din profil', account: 'Din konto: {name}' },
  fi: { signIn: 'Kirjaudu sisään', signOut: 'Kirjaudu ulos', profile: 'Profiilisi', account: 'Tilisi: {name}' },
  de: { signIn: 'Anmelden', signOut: 'Abmelden', profile: 'Dein Profil', account: 'Dein Konto: {name}' },
  fr: { signIn: 'Se connecter', signOut: 'Se déconnecter', profile: 'Votre profil', account: 'Votre compte : {name}' },
  es: { signIn: 'Iniciar sesión', signOut: 'Cerrar sesión', profile: 'Tu perfil', account: 'Tu cuenta: {name}' },
  it: { signIn: 'Accedi', signOut: 'Esci', profile: 'Il tuo profilo', account: 'Il tuo account: {name}' },
  nl: { signIn: 'Inloggen', signOut: 'Uitloggen', profile: 'Je profiel', account: 'Je account: {name}' },
  pt: { signIn: 'Entrar', signOut: 'Sair', profile: 'O seu perfil', account: 'A sua conta: {name}' },
  pl: { signIn: 'Zaloguj się', signOut: 'Wyloguj się', profile: 'Twój profil', account: 'Twoje konto: {name}' },
  zh: { signIn: '登录', signOut: '退出登录', profile: '你的资料', account: '你的账户：{name}' },
  ja: { signIn: 'ログイン', signOut: 'ログアウト', profile: 'プロフィール', account: 'アカウント：{name}' }
}

export default {
  inject: { vpData: { default: null } },
  props: {
    signInText: { type: String, default: '', label: 'Text when signed out', placeholder: 'Sign in' },
    signInLink: { type: String, default: '/sign-in', label: 'Its link' },
    variant: { type: String, default: 'outline', label: 'Look when signed out', control: 'select', options: [{ key: 'A filled button', value: 'solid' }, { key: 'An outlined button', value: 'outline' }, { key: 'A link', value: 'link' }] },
    links: {
      type: Array,
      default: () => [{ text: '', href: '/profile' }],
      label: 'Links in its menu',
      control: 'list',
      fields: [{ key: 'text', label: 'Text', placeholder: 'Your profile' }, { key: 'href', label: 'Goes to', placeholder: '/profile' }]
    },
    signOutText: { type: String, default: '', label: 'Sign out', placeholder: 'Sign out' },
    showName: { type: Boolean, default: false, label: 'Show the name beside the picture' },
    side: { type: String, default: 'right', label: 'The menu opens to the', control: 'select', options: [{ key: 'Left', value: 'left' }, { key: 'Right', value: 'right' }] },
    preview: { type: String, default: 'in', label: 'In the editor, show it', control: 'select', options: [{ key: 'Signed in', value: 'in' }, { key: 'Signed out', value: 'out' }] },
    color: { type: String, default: '', label: 'Color', control: 'color' }
  },
  data() {
    return { open: false }
  },
  created() {
    this.menuId = 'vp-account-button-' + Math.random().toString(36).slice(2, 9)
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
    style() {
      return { '--vp-account-button-color': this.color || undefined }
    },
    inStudio() {
      return typeof document !== 'undefined' && (document.getElementById('receiver') ? document.getElementById('receiver').getAttribute('live') !== 'yes' : !!window.studio)
    },
    person() {
      if (this.inStudio) return this.preview === 'out' ? null : SAMPLE
      return this.vpData?.auth?.user || null
    },
    // A link with no text of its own: the profile's is said in the site's language
    menu() {
      return (this.links || []).map(link => ({ href: link.href, text: link.text || (link.href === '/profile' ? this.say('profile') : link.href) }))
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
    say(key, own, n) {
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return String(own || (words[key] ?? WORDS.en[key])).replace(/\\{(n|name)\\}/g, n ?? '')
    },
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