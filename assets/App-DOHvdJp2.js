var e=`<template>
  <div class="vp-sign-in" :class="'vp-sign-in--' + look" :style="style">
    <!-- signed in already -->
    <div v-if="signedInNow && whenSignedIn !== 'form'" class="vp-sign-in__done">
      <span class="vp-sign-in__face" aria-hidden="true">
        <img v-if="person.avatar" :src="person.avatar" alt="">
        <template v-else>{{ initials }}</template>
      </span>
      <div>
        <b>{{ signedInText.replace('{name}', person.name || person.email) }}</b>
        <button type="button" class="vp-sign-in__link" @click="out">{{ signOutText }}</button>
      </div>
    </div>

    <form v-else class="vp-sign-in__form" novalidate @submit.prevent="go">
      <h2 v-if="heading" class="vp-sign-in__title">{{ heading }}</h2>
      <p v-if="said" class="vp-sign-in__said" role="status">{{ said }}</p>

      <template v-if="!said || mode !== 'forgot'">
        <label v-for="one in shownFields" :key="one.key" class="vp-sign-in__field">
          <span class="vp-sign-in__label">{{ one.label }}</span>
          <span class="vp-sign-in__box">
            <input
              v-model="values[one.key]"
              class="vp-sign-in__input"
              :type="one.key === 'password' && showPassword ? 'text' : one.type"
              :name="one.key"
              :autocomplete="one.autocomplete"
              :required="one.required"
              :aria-invalid="!!wrong[one.key]"
              @input="wrong = { ...wrong, [one.key]: '' }"
            >
            <button v-if="one.key === 'password'" type="button" class="vp-sign-in__eye" :aria-label="showPassword ? 'Hide the password' : 'Show the password'" @click="showPassword = !showPassword">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /><path v-if="showPassword" d="M3 3l18 18" /></svg>
            </button>
          </span>
          <small v-if="wrong[one.key]" class="vp-sign-in__wrong">{{ wrong[one.key] }}</small>
        </label>

        <div v-if="mode === 'sign-in' && forgotText" class="vp-sign-in__row">
          <button type="button" class="vp-sign-in__link" @click="switchTo('forgot')">{{ forgotText }}</button>
        </div>
        <label v-if="mode === 'register' && terms" class="vp-sign-in__terms">
          <input v-model="agreed" type="checkbox">
          <span>{{ terms }} <a v-if="termsLink" :href="termsLink" target="_blank" rel="noopener">{{ termsLinkText }}</a></span>
        </label>

        <p v-if="problem" class="vp-sign-in__problem" role="alert">{{ problem }}</p>
        <button class="vp-sign-in__button" type="submit" :disabled="busy">
          <span v-if="busy" class="vp-sign-in__spinner" aria-hidden="true" />
          {{ mode === 'register' ? registerButton : mode === 'forgot' ? forgotButton : signInButton }}
        </button>
      </template>

      <p class="vp-sign-in__switch">
        <template v-if="mode === 'sign-in' && allowRegister">{{ noAccountText }} <button type="button" class="vp-sign-in__link" @click="switchTo('register')">{{ registerTitle }}</button></template>
        <template v-else-if="mode !== 'sign-in'"><button type="button" class="vp-sign-in__link" @click="switchTo('sign-in')">{{ backToSignIn }}</button></template>
      </p>
      <p v-if="inStudio" class="vp-sign-in__note">In the editor nothing is sent. {{ hasSource ? '' : 'Switch on "Visitors sign in with this source" for a source in Data.' }}</p>
    </form>
  </div>
</template>
<script>
// Signing in, making an account and a forgotten password in one: the visitor switches between them. It uses the
// source in Data that visitors sign in with (Supabase, Firebase or your own API): nothing is kept here. Signed in,
// it says so with a way to sign out (or goes to a page, or is not shown). In the Studio nothing is sent.
export default {
  inject: { vpData: { default: null } },
  props: {
    start: { type: String, default: 'sign-in', label: 'Shows first', control: 'select', options: [{ key: 'Sign in', value: 'sign-in' }, { key: 'Make an account', value: 'register' }] },
    allowRegister: { type: Boolean, default: true, label: 'Visitors can make an account' },
    nameField: { type: Boolean, default: true, label: 'Ask for a name when making one' },
    signInTitle: { type: String, default: 'Welcome back', label: 'Title: sign in' },
    registerTitle: { type: String, default: 'Make an account', label: 'Title: make an account' },
    forgotTitle: { type: String, default: 'Forgot your password?', label: 'Title: forgotten password' },
    signInButton: { type: String, default: 'Sign in', label: 'Button: sign in' },
    registerButton: { type: String, default: 'Make my account', label: 'Button: make an account' },
    forgotButton: { type: String, default: 'Send me a link', label: 'Button: forgotten password' },
    forgotText: { type: String, default: 'Forgot your password?', label: 'Link to a forgotten password' },
    noAccountText: { type: String, default: 'No account yet?', label: 'Before the link to make one' },
    backToSignIn: { type: String, default: 'Back to sign in', label: 'Link back to sign in' },
    emailLabel: { type: String, default: 'E-mail', label: 'Label: e-mail' },
    passwordLabel: { type: String, default: 'Password', label: 'Label: password' },
    nameLabel: { type: String, default: 'Name', label: 'Label: name' },
    terms: { type: String, default: '', label: 'Agree to (when making an account)', placeholder: 'I agree to the' },
    termsLinkText: { type: String, default: 'terms', label: 'Its link text' },
    termsLink: { type: String, default: '', label: 'Its link', placeholder: '/terms' },
    after: { type: String, default: '', label: 'Then go to', placeholder: '/account' },
    whenSignedIn: { type: String, default: 'say', label: 'When signed in already', control: 'select', options: [{ key: 'Say so, with Sign out', value: 'say' }, { key: 'Go to the page above', value: 'go' }, { key: 'Show the form all the same', value: 'form' }] },
    signedInText: { type: String, default: 'Signed in as {name}', label: 'Said when signed in' },
    signOutText: { type: String, default: 'Sign out', label: 'Sign out' },
    sentText: { type: String, default: 'If there is an account for that address, a link to choose a new password is on its way.', label: 'Said when the link is sent', control: 'textarea' },
    confirmText: { type: String, default: 'Almost there: open the e-mail we sent to confirm your address.', label: 'Said when the address must be confirmed', control: 'textarea' },
    look: { type: String, default: 'card', label: 'Look', control: 'select', options: [{ key: 'A card', value: 'card' }, { key: 'Plain', value: 'plain' }] },
    color: { type: String, default: '', label: 'Button color', control: 'color' },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 30 }
  },
  emits: ['signed-in', 'registered'],
  data() {
    return { mode: this.start === 'register' ? 'register' : 'sign-in', values: { email: '', password: '', name: '' }, wrong: {}, problem: '', said: '', busy: false, showPassword: false, agreed: false }
  },
  computed: {
    style() {
      return { '--vp-sign-in-color': this.color || undefined, '--vp-sign-in-radius': this.radius || undefined }
    },
    inStudio() {
      return typeof document !== 'undefined' && (!!document.getElementById('receiver') || !!window.studio)
    },
    auth() {
      return this.vpData?.auth || null
    },
    hasSource() {
      return !!Object.values(this.vpData?.sources || {}).find(source => source?.auth?.kind)
    },
    signedInNow() {
      return !this.inStudio && !!this.auth?.user
    },
    person() {
      return this.auth?.user || {}
    },
    initials() {
      return String(this.person.name || this.person.email || '?').split(/[\\s@.]+/).filter(Boolean).slice(0, 2).map(word => word[0].toUpperCase()).join('')
    },
    heading() {
      return this.mode === 'register' ? this.registerTitle : this.mode === 'forgot' ? this.forgotTitle : this.signInTitle
    },
    shownFields() {
      const email = { key: 'email', label: this.emailLabel, type: 'email', autocomplete: 'email', required: true }
      const password = { key: 'password', label: this.passwordLabel, type: 'password', autocomplete: this.mode === 'register' ? 'new-password' : 'current-password', required: true }
      if (this.mode === 'forgot') return [email]
      if (this.mode === 'register') return [...(this.nameField ? [{ key: 'name', label: this.nameLabel, type: 'text', autocomplete: 'name', required: true }] : []), email, password]
      return [email, password]
    }
  },
  watch: {
    start(value) { this.switchTo(value === 'register' ? 'register' : 'sign-in') },
    signedInNow: { immediate: true, handler(now) { if (now && this.whenSignedIn === 'go') this.leave() } }
  },
  methods: {
    switchTo(mode) {
      this.mode = mode
      this.problem = ''
      this.said = ''
      this.wrong = {}
    },
    check() {
      const wrong = {}
      for (const one of this.shownFields) {
        const value = String(this.values[one.key] || '').trim()
        if (!value) wrong[one.key] = 'Please fill this in'
        else if (one.key === 'email' && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)) wrong[one.key] = 'This does not look like an e-mail address'
        else if (one.key === 'password' && this.mode === 'register' && value.length < 8) wrong[one.key] = 'At least 8 letters, numbers or signs'
      }
      this.wrong = wrong
      if (this.mode === 'register' && this.terms && !this.agreed) { this.problem = 'Please agree first'; return false }
      return !Object.keys(wrong).length
    },
    async go() {
      this.problem = ''
      if (this.busy || !this.check()) return
      if (this.inStudio) {
        this.said = this.mode === 'forgot' ? this.sentText : ''
        this.problem = this.mode === 'forgot' ? '' : 'In the editor nobody signs in: on the site this signs the visitor in.'
        return
      }
      if (!this.vpData?.signIn) { this.problem = 'This site has no source to sign in with yet.'; return }
      this.busy = true
      const { email, password, name } = this.values
      let answer
      if (this.mode === 'forgot') answer = await this.vpData.forgot(email)
      else if (this.mode === 'register') answer = await this.vpData.register({ email, password, ...(this.nameField ? { name } : {}) })
      else answer = await this.vpData.signIn(email, password)
      this.busy = false
      if (!answer.ok) {
        this.problem = this.mode === 'sign-in' && [400, 401, 403].includes(answer.status) ? 'The e-mail or the password is not right.' : answer.error || 'It did not work. Please try again.'
        return
      }
      this.values.password = ''
      if (this.mode === 'forgot') { this.said = this.sentText; return }
      if (this.mode === 'register' && answer.confirm) { this.said = this.confirmText; return }
      this.$emit(this.mode === 'register' ? 'registered' : 'signed-in', answer.user)
      if (this.after) this.leave()
    },
    leave() {
      if (!this.after || this.inStudio) return
      if (this.$router && this.after.startsWith('/')) this.$router.push(this.after)
      else window.location.href = this.after
    },
    out() {
      this.vpData?.signOut?.()
      this.switchTo('sign-in')
    }
  }
}
<\/script>
<style>
.vp-sign-in {
  --_color: var(--vp-sign-in-color, var(--vp-primary, #2563eb));
  --_radius: var(--vp-sign-in-radius, var(--vp-radius, 10px));
  box-sizing: border-box;
  width: 100%;
  max-width: 26rem;
  margin: 0 auto;
  text-align: left;
}
.vp-sign-in--card {
  padding: clamp(1.25rem, 4vw, 2.25rem);
  border: 1px solid var(--vp-border, rgba(127, 127, 127, 0.25));
  border-radius: calc(var(--_radius) + 6px);
  background: var(--vp-surface, transparent);
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.08);
}
.vp-sign-in__form { display: flex; flex-direction: column; gap: 1rem; }
.vp-sign-in__title { margin: 0 0 0.25rem; font-family: var(--vp-heading, inherit); font-size: 1.6rem; line-height: 1.2; }
.vp-sign-in__field { display: flex; flex-direction: column; gap: 0.35rem; }
.vp-sign-in__label { font-size: 0.9375rem; font-weight: 550; }
.vp-sign-in__box { position: relative; display: flex; }
.vp-sign-in__input {
  box-sizing: border-box;
  width: 100%;
  padding: 0.75rem 0.9rem;
  border: 1px solid var(--vp-border, rgba(127, 127, 127, 0.4));
  border-radius: var(--_radius);
  background: var(--vp-input, transparent);
  color: inherit;
  font: inherit;
  transition: border-color 120ms ease, box-shadow 120ms ease;
}
.vp-sign-in__input[name="password"] { padding-right: 2.8rem; }
.vp-sign-in__input:focus { outline: none; border-color: var(--_color); box-shadow: 0 0 0 3px color-mix(in srgb, var(--_color) 22%, transparent); }
.vp-sign-in__input[aria-invalid="true"] { border-color: #d0453b; }
.vp-sign-in__eye { position: absolute; top: 50%; right: 0.5rem; display: flex; padding: 0.35rem; border: 0; border-radius: 6px; background: none; color: inherit; opacity: 0.6; transform: translateY(-50%); cursor: pointer; }
.vp-sign-in__eye:hover { opacity: 1; }
.vp-sign-in__eye svg { width: 1.1rem; height: 1.1rem; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.vp-sign-in__wrong { font-size: 0.8125rem; color: #c0362c; }
.vp-sign-in__row { display: flex; justify-content: flex-end; margin-top: -0.5rem; }
.vp-sign-in__link { padding: 0; border: 0; background: none; color: var(--_color); font: inherit; font-weight: 600; cursor: pointer; }
.vp-sign-in__link:hover { text-decoration: underline; }
.vp-sign-in__terms { display: flex; gap: 0.6rem; align-items: flex-start; font-size: 0.9375rem; line-height: 1.45; cursor: pointer; }
.vp-sign-in__terms input { flex: none; width: 1.05rem; height: 1.05rem; margin-top: 0.2rem; accent-color: var(--_color); }
.vp-sign-in__terms a { color: var(--_color); }
.vp-sign-in__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.85em 1.5em;
  border: 0;
  border-radius: var(--_radius);
  background: var(--_color);
  color: var(--vp-primary-contrast, #fff);
  font: inherit;
  font-weight: 650;
  cursor: pointer;
  transition: filter 120ms ease, transform 120ms ease;
}
.vp-sign-in__button:hover { filter: brightness(1.08); }
.vp-sign-in__button:active { transform: translateY(1px); }
.vp-sign-in__button:disabled { opacity: 0.7; cursor: default; }
.vp-sign-in__button:focus-visible { outline: 2px solid var(--_color); outline-offset: 2px; }
.vp-sign-in__spinner { width: 1em; height: 1em; border: 2px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: vp-sign-in-spin 0.7s linear infinite; }
@keyframes vp-sign-in-spin { to { transform: rotate(360deg); } }
.vp-sign-in__switch { margin: 0; text-align: center; font-size: 0.9375rem; opacity: 0.9; }
.vp-sign-in__problem { margin: 0; color: #c0362c; font-size: 0.9375rem; }
.vp-sign-in__said { margin: 0; padding: 0.9rem 1rem; border-radius: var(--_radius); background: color-mix(in srgb, var(--_color) 10%, transparent); line-height: 1.5; }
.vp-sign-in__note { margin: 0; font-size: 0.8125rem; opacity: 0.6; text-align: center; }
.vp-sign-in__done { display: flex; align-items: center; gap: 0.9rem; }
.vp-sign-in__face {
  display: grid;
  flex: none;
  place-items: center;
  width: 3rem;
  height: 3rem;
  overflow: hidden;
  border-radius: 50%;
  background: color-mix(in srgb, var(--_color) 16%, transparent);
  color: var(--_color);
  font-weight: 700;
}
.vp-sign-in__face img { width: 100%; height: 100%; object-fit: cover; }
.vp-sign-in__done b { display: block; margin-bottom: 0.15rem; }
@media (prefers-reduced-motion: reduce) { .vp-sign-in__spinner { animation-duration: 2s; } }
</style>
`;export{e as default};