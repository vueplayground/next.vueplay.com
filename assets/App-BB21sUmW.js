var e=`<template>
  <div class="vp-signed-in" :class="{ 'vp-signed-in--studio': inStudio, 'vp-signed-in--empty': inStudio && !$slots.default }" :data-for="studioLabel">
    <span v-if="inStudio" class="vp-signed-in__label" aria-hidden="true">{{ studioLabel }}</span>
    <slot v-if="inStudio || shown" />
  </div>
</template>
<script>
// What is put inside it is shown only to visitors who are signed in (a member's page, a Sign out button), or
// only to those who are not (a Sign in button, a "join us"). The source in Data that visitors sign in with
// says who is; \`role\` narrows it to visitors with that role (auth.user.role or auth.user.roles). In the Studio
// it is always shown, marked with who sees it, and lays its parts out as on the site (display: contents).
// What the Studio marks it with, in the site's language (App.vue's head says it: \`htmlAttrs: { lang }\`)
const WORDS = {
  en: { in: 'Shown to visitors who are signed in', out: 'Shown to visitors who are not signed in', role: 'Shown to visitors with the role {name}', notRole: 'Shown to visitors without the role {name}' },
  nb: { in: 'Vises for besøkende som er logget inn', out: 'Vises for besøkende som ikke er logget inn', role: 'Vises for besøkende med rollen {name}', notRole: 'Vises for besøkende uten rollen {name}' },
  sv: { in: 'Visas för besökare som är inloggade', out: 'Visas för besökare som inte är inloggade', role: 'Visas för besökare med rollen {name}', notRole: 'Visas för besökare utan rollen {name}' },
  da: { in: 'Vises for besøgende, der er logget ind', out: 'Vises for besøgende, der ikke er logget ind', role: 'Vises for besøgende med rollen {name}', notRole: 'Vises for besøgende uden rollen {name}' },
  fi: { in: 'Näytetään kirjautuneille vierailijoille', out: 'Näytetään vierailijoille, jotka eivät ole kirjautuneet', role: 'Näytetään vierailijoille, joilla on rooli {name}', notRole: 'Näytetään vierailijoille, joilla ei ole roolia {name}' },
  de: { in: 'Sichtbar für angemeldete Besucher', out: 'Sichtbar für nicht angemeldete Besucher', role: 'Sichtbar für Besucher mit der Rolle {name}', notRole: 'Sichtbar für Besucher ohne die Rolle {name}' },
  fr: { in: 'Visible par les visiteurs connectés', out: 'Visible par les visiteurs non connectés', role: 'Visible par les visiteurs ayant le rôle {name}', notRole: 'Visible par les visiteurs sans le rôle {name}' },
  es: { in: 'Visible para los visitantes con sesión iniciada', out: 'Visible para los visitantes sin sesión iniciada', role: 'Visible para los visitantes con el rol {name}', notRole: 'Visible para los visitantes sin el rol {name}' },
  it: { in: 'Visibile ai visitatori che hanno effettuato l’accesso', out: 'Visibile ai visitatori che non hanno effettuato l’accesso', role: 'Visibile ai visitatori con il ruolo {name}', notRole: 'Visibile ai visitatori senza il ruolo {name}' },
  nl: { in: 'Zichtbaar voor ingelogde bezoekers', out: 'Zichtbaar voor bezoekers die niet zijn ingelogd', role: 'Zichtbaar voor bezoekers met de rol {name}', notRole: 'Zichtbaar voor bezoekers zonder de rol {name}' },
  pt: { in: 'Visível para visitantes com sessão iniciada', out: 'Visível para visitantes sem sessão iniciada', role: 'Visível para visitantes com a função {name}', notRole: 'Visível para visitantes sem a função {name}' },
  pl: { in: 'Widoczne dla zalogowanych odwiedzających', out: 'Widoczne dla niezalogowanych odwiedzających', role: 'Widoczne dla odwiedzających z rolą {name}', notRole: 'Widoczne dla odwiedzających bez roli {name}' },
  zh: { in: '仅对已登录的访客显示', out: '仅对未登录的访客显示', role: '仅对角色为 {name} 的访客显示', notRole: '仅对没有 {name} 角色的访客显示' },
  ja: { in: 'ログイン中の訪問者に表示', out: 'ログインしていない訪問者に表示', role: 'ロール {name} の訪問者に表示', notRole: 'ロール {name} を持たない訪問者に表示' }
}

export default {
  inject: { vpData: { default: null } },
  props: {
    show: { type: String, default: 'in', label: 'Shown to', control: 'select', options: [{ key: 'Visitors who are signed in', value: 'in' }, { key: 'Visitors who are not', value: 'out' }] },
    role: { type: String, default: '', label: 'Only with the role', placeholder: 'admin, member' }
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
      return typeof document !== 'undefined' && (document.getElementById('receiver') ? document.getElementById('receiver').getAttribute('live') !== 'yes' : !!window.studio)
    },
    roles() {
      return String(this.role || '').split(',').map(one => one.trim().toLowerCase()).filter(Boolean)
    },
    shown() {
      const user = this.vpData?.auth?.user
      let has = !!user
      if (has && this.roles.length) {
        const own = [].concat(user.roles ?? [], user.role ?? []).flatMap(one => typeof one === 'string' ? one.split(',') : [one?.name ?? one?.key ?? ''])
        has = own.some(one => this.roles.includes(String(one).trim().toLowerCase()))
      }
      return this.show === 'out' ? !has : has
    },
    studioLabel() {
      if (!this.inStudio) return undefined
      if (this.roles.length) return this.say(this.show === 'out' ? 'notRole' : 'role', '', this.roles.join(', '))
      return this.say(this.show === 'out' ? 'out' : 'in')
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
/* In the Studio too its parts are laid out by what is around it, as on the site: each is outlined instead */
.vp-signed-in--studio > :not(.vp-signed-in__label) {
  outline: 1.5px dashed color-mix(in srgb, var(--vp-primary, #2563eb) 45%, transparent);
  outline-offset: 4px;
}
/* With nothing in it yet it is a box to drop into */
.vp-signed-in--studio.vp-signed-in--empty {
  position: relative;
  display: block;
  min-height: 2.5rem;
  margin-top: 1.6rem;
  outline: 1.5px dashed color-mix(in srgb, var(--vp-primary, #2563eb) 45%, transparent);
  outline-offset: 4px;
}
/* Taken out of the flow (it never becomes a column or a row of what is around it) */
.vp-signed-in__label {
  position: absolute;
  z-index: 1;
  margin-top: -1.6rem;
  padding: 0.1rem 0.45rem;
  border-radius: 4px;
  background: color-mix(in srgb, var(--vp-primary, #2563eb) 12%, var(--vp-background, #fff));
  color: var(--vp-primary, #2563eb);
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 1.4;
  white-space: nowrap;
  pointer-events: none;
}
.vp-signed-in--empty > .vp-signed-in__label { top: 0; left: 0; }
</style>
`;export{e as default};