var e=`<template>
  <div class="vp-signed-in" :class="{ 'vp-signed-in--studio': inStudio }" :data-for="studioLabel">
    <slot v-if="inStudio || shown" />
  </div>
</template>
<script>
// What is put inside it is shown only to visitors who are signed in (a member's page, a Sign out button), or
// only to those who are not (a Sign in button, a "join us"). The source in Data that visitors sign in with
// says who is. In the Studio it is always shown, marked with who sees it.
// What the Studio marks it with, in the site's language (App.vue's head says it: \`htmlAttrs: { lang }\`)
const WORDS = {
  en: { in: 'Shown to visitors who are signed in', out: 'Shown to visitors who are not signed in' },
  nb: { in: 'Vises for besøkende som er logget inn', out: 'Vises for besøkende som ikke er logget inn' },
  sv: { in: 'Visas för besökare som är inloggade', out: 'Visas för besökare som inte är inloggade' },
  da: { in: 'Vises for besøgende, der er logget ind', out: 'Vises for besøgende, der ikke er logget ind' },
  fi: { in: 'Näytetään kirjautuneille vierailijoille', out: 'Näytetään vierailijoille, jotka eivät ole kirjautuneet' },
  de: { in: 'Sichtbar für angemeldete Besucher', out: 'Sichtbar für nicht angemeldete Besucher' },
  fr: { in: 'Visible par les visiteurs connectés', out: 'Visible par les visiteurs non connectés' },
  es: { in: 'Visible para los visitantes con sesión iniciada', out: 'Visible para los visitantes sin sesión iniciada' },
  it: { in: 'Visibile ai visitatori che hanno effettuato l’accesso', out: 'Visibile ai visitatori che non hanno effettuato l’accesso' },
  nl: { in: 'Zichtbaar voor ingelogde bezoekers', out: 'Zichtbaar voor bezoekers die niet zijn ingelogd' },
  pt: { in: 'Visível para visitantes com sessão iniciada', out: 'Visível para visitantes sem sessão iniciada' },
  pl: { in: 'Widoczne dla zalogowanych odwiedzających', out: 'Widoczne dla niezalogowanych odwiedzających' },
  zh: { in: '仅对已登录的访客显示', out: '仅对未登录的访客显示' },
  ja: { in: 'ログイン中の訪問者に表示', out: 'ログインしていない訪問者に表示' }
}

export default {
  inject: { vpData: { default: null } },
  props: {
    show: { type: String, default: 'in', label: 'Shown to', control: 'select', options: [{ key: 'Visitors who are signed in', value: 'in' }, { key: 'Visitors who are not', value: 'out' }] }
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
    inStudio() {
      return typeof document !== 'undefined' && (!!document.getElementById('receiver') || !!window.studio)
    },
    shown() {
      const signedIn = !!this.vpData?.auth?.user
      return this.show === 'out' ? !signedIn : signedIn
    },
    studioLabel() {
      return this.inStudio ? this.say(this.show === 'out' ? 'out' : 'in') : undefined
    }
  },
  methods: {
    say(key, own, n) {
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return String(own || (words[key] ?? WORDS.en[key])).replace(/\\{(n|name)\\}/g, n ?? '')
    }
  }
}
<\/script>
<style>
.vp-signed-in { display: contents; }
.vp-signed-in--studio {
  position: relative;
  display: block;
  min-height: 2.5rem;
  outline: 1.5px dashed color-mix(in srgb, var(--vp-primary, #2563eb) 45%, transparent);
  outline-offset: 4px;
}
.vp-signed-in--studio::before {
  content: attr(data-for);
  position: absolute;
  top: -1.55rem;
  left: 0;
  padding: 0.1rem 0.45rem;
  border-radius: 4px;
  background: color-mix(in srgb, var(--vp-primary, #2563eb) 12%, transparent);
  color: var(--vp-primary, #2563eb);
  font-size: 0.6875rem;
  font-weight: 600;
  white-space: nowrap;
}
</style>
`;export{e as default};