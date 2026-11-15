var e=`<template>
  <div class="vp-user-profile" :class="'vp-user-profile--' + look" :style="style">
    <div v-if="!person" class="vp-user-profile__out">
      <p>{{ signedOutText }}</p>
      <a v-if="signInLink" class="vp-user-profile__button" :href="signInLink" @click="go($event, signInLink)">{{ signInText }}</a>
    </div>

    <form v-else class="vp-user-profile__form" novalidate @submit.prevent="save">
      <h2 v-if="title" class="vp-user-profile__title">{{ title }}</h2>

      <!-- the picture: chosen, cut square in the middle and made small here, then sent -->
      <div v-if="avatar" class="vp-user-profile__picture">
        <span class="vp-user-profile__face" :class="{ 'vp-user-profile__face--busy': uploading }">
          <img v-if="preview || person.avatar" :src="preview || person.avatar" alt="">
          <template v-else>{{ initials }}</template>
          <span v-if="uploading" class="vp-user-profile__spinner" aria-hidden="true" />
        </span>
        <div class="vp-user-profile__picture-text">
          <label class="vp-user-profile__change">
            <input class="vp-user-profile__file" type="file" accept="image/*" @change="choose">
            {{ person.avatar || preview ? changePictureText : addPictureText }}
          </label>
          <small>{{ pictureHelp }}</small>
          <small v-if="pictureProblem" class="vp-user-profile__wrong">{{ pictureProblem }}</small>
        </div>
      </div>

      <label class="vp-user-profile__field">
        <span class="vp-user-profile__label">{{ nameLabel }}</span>
        <input v-model="values.name" class="vp-user-profile__input" name="name" autocomplete="name">
      </label>
      <label class="vp-user-profile__field">
        <span class="vp-user-profile__label">{{ emailLabel }}</span>
        <input class="vp-user-profile__input" :value="person.email" type="email" readonly>
      </label>
      <label v-for="one in extra" :key="one.key" class="vp-user-profile__field">
        <span class="vp-user-profile__label">{{ one.label }}</span>
        <textarea v-if="one.type === 'textarea'" v-model="values[one.key]" class="vp-user-profile__input" rows="3" :name="one.key" />
        <input v-else v-model="values[one.key]" class="vp-user-profile__input" :type="one.type" :name="one.key">
      </label>

      <p v-if="problem" class="vp-user-profile__problem" role="alert">{{ problem }}</p>
      <div class="vp-user-profile__buttons">
        <button class="vp-user-profile__button" type="submit" :disabled="saving">
          <span v-if="saving" class="vp-user-profile__spinner vp-user-profile__spinner--small" aria-hidden="true" />
          {{ saved ? savedText : saveText }}
        </button>
        <button v-if="signOut" type="button" class="vp-user-profile__out-button" @click="out">{{ signOutText }}</button>
      </div>
    </form>
  </div>
</template>
<script>
// The signed-in visitor's own page: their picture (chosen, cut square and made small in the browser, then put in
// the backend's storage), their name and the other fields you list, saved to the source in Data that visitors
// sign in with. Signed out, it says so with a link to sign in. In the Studio it shows a made-up person.
const SAMPLE = { id: 'sample', name: 'Kari Nordmann', email: 'kari@example.com', avatar: '' }

export default {
  inject: { vpData: { default: null } },
  props: {
    title: { type: String, default: 'Your profile', label: 'Title' },
    avatar: { type: Boolean, default: true, label: 'A profile picture' },
    fields: {
      type: Array,
      default: () => [{ label: 'About you', name: 'bio', type: 'textarea' }],
      label: 'More fields',
      control: 'list',
      fields: [
        { key: 'label', label: 'Label' },
        { key: 'name', label: 'Kept as (name)', placeholder: 'From the label' },
        { key: 'type', label: 'Kind', control: 'select', default: 'text', options: [{ key: 'A line of text', value: 'text' }, { key: 'Several lines', value: 'textarea' }, { key: 'Phone', value: 'tel' }, { key: 'Web address', value: 'url' }, { key: 'Date', value: 'date' }] }
      ]
    },
    nameLabel: { type: String, default: 'Name', label: 'Label: name' },
    emailLabel: { type: String, default: 'E-mail', label: 'Label: e-mail' },
    addPictureText: { type: String, default: 'Add a picture', label: 'Add a picture' },
    changePictureText: { type: String, default: 'Change the picture', label: 'Change the picture' },
    pictureHelp: { type: String, default: 'A square one looks best. It is made small before it is sent.', label: 'Line under the picture' },
    saveText: { type: String, default: 'Save', label: 'Button: save' },
    savedText: { type: String, default: 'Saved', label: 'Said when saved' },
    signOut: { type: Boolean, default: true, label: 'A Sign out button' },
    signOutText: { type: String, default: 'Sign out', label: 'Sign out' },
    signedOutText: { type: String, default: 'Sign in to see your profile.', label: 'Said when nobody is signed in' },
    signInText: { type: String, default: 'Sign in', label: 'Its link text' },
    signInLink: { type: String, default: '/sign-in', label: 'Its link' },
    look: { type: String, default: 'card', label: 'Look', control: 'select', options: [{ key: 'A card', value: 'card' }, { key: 'Plain', value: 'plain' }] },
    color: { type: String, default: '', label: 'Button color', control: 'color' },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 30 }
  },
  emits: ['saved'],
  data() {
    return { values: {}, saving: false, saved: false, problem: '', uploading: false, preview: '', pictureProblem: '' }
  },
  computed: {
    style() {
      return { '--vp-user-profile-color': this.color || undefined, '--vp-user-profile-radius': this.radius || undefined }
    },
    inStudio() {
      return typeof document !== 'undefined' && (!!document.getElementById('receiver') || !!window.studio)
    },
    person() {
      return this.inStudio ? SAMPLE : this.vpData?.auth?.user || null
    },
    initials() {
      return String(this.person?.name || this.person?.email || '?').split(/[\\s@.]+/).filter(Boolean).slice(0, 2).map(word => word[0].toUpperCase()).join('')
    },
    extra() {
      return (this.fields || []).map((one, index) => ({
        label: one.label || '',
        key: String(one.name || one.label || '').trim().toLowerCase().replace(/[^\\p{L}\\p{N}]+/gu, '_').replace(/^_|_$/g, '') || 'field_' + (index + 1),
        type: ['text', 'textarea', 'tel', 'url', 'date'].includes(one.type) ? one.type : 'text'
      }))
    }
  },
  watch: {
    person: { immediate: true, handler: 'fill' },
    extra: 'fill'
  },
  methods: {
    fill() {
      const person = this.person || {}
      this.values = { name: person.name || '', ...Object.fromEntries(this.extra.map(one => [one.key, person[one.key] ?? ''])) }
    },
    async save() {
      if (this.saving || !this.person) return
      this.problem = ''
      if (this.inStudio) { this.flash(); return }
      this.saving = true
      const answer = await this.vpData.saveProfile({ ...this.values })
      this.saving = false
      if (!answer.ok) { this.problem = answer.error || 'It could not be saved.'; return }
      this.$emit('saved', answer.user)
      this.flash()
    },
    flash() {
      this.saved = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => { this.saved = false }, 2200)
    },
    // The picture made square (the middle of it) and 320 px, as a JPEG
    square(file) {
      return new Promise((resolve, reject) => {
        const img = new Image()
        const url = URL.createObjectURL(file)
        img.onload = () => {
          const side = Math.min(img.naturalWidth, img.naturalHeight)
          const size = Math.min(320, side)
          const canvas = document.createElement('canvas')
          canvas.width = size
          canvas.height = size
          canvas.getContext('2d').drawImage(img, (img.naturalWidth - side) / 2, (img.naturalHeight - side) / 2, side, side, 0, 0, size, size)
          URL.revokeObjectURL(url)
          canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('no picture')), 'image/jpeg', 0.88)
        }
        img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('not a picture')) }
        img.src = url
      })
    },
    async choose(event) {
      const file = event.target.files?.[0]
      event.target.value = ''
      if (!file) return
      this.pictureProblem = ''
      if (!/^image\\//.test(file.type)) { this.pictureProblem = 'That is not a picture.'; return }
      let picture
      try { picture = await this.square(file) } catch (e) { this.pictureProblem = 'That picture could not be read.'; return }
      this.preview = URL.createObjectURL(picture)
      if (this.inStudio) return
      this.uploading = true
      const answer = await this.vpData.uploadAvatar(picture)
      this.uploading = false
      if (!answer.ok) this.pictureProblem = answer.error || 'The picture could not be sent.'
    },
    out() {
      if (!this.inStudio) this.vpData?.signOut?.()
    },
    go(event, link) {
      if (this.$router && link.startsWith('/')) { event.preventDefault(); this.$router.push(link) }
    }
  },
  beforeUnmount() {
    clearTimeout(this.timer)
  }
}
<\/script>
<style>
.vp-user-profile {
  --_color: var(--vp-user-profile-color, var(--vp-primary, #2563eb));
  --_radius: var(--vp-user-profile-radius, var(--vp-radius, 10px));
  box-sizing: border-box;
  width: 100%;
  max-width: 34rem;
  margin: 0 auto;
  text-align: left;
}
.vp-user-profile--card {
  padding: clamp(1.25rem, 4vw, 2.25rem);
  border: 1px solid var(--vp-border, rgba(127, 127, 127, 0.25));
  border-radius: calc(var(--_radius) + 6px);
  background: var(--vp-surface, transparent);
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.08);
}
.vp-user-profile__form { display: flex; flex-direction: column; gap: 1rem; }
.vp-user-profile__title { margin: 0 0 0.25rem; font-family: var(--vp-heading, inherit); font-size: 1.6rem; line-height: 1.2; }
.vp-user-profile__picture { display: flex; align-items: center; gap: 1rem; }
.vp-user-profile__face {
  position: relative;
  display: grid;
  flex: none;
  place-items: center;
  width: 5rem;
  height: 5rem;
  overflow: hidden;
  border-radius: 50%;
  background: color-mix(in srgb, var(--_color) 15%, transparent);
  color: var(--_color);
  font-size: 1.5rem;
  font-weight: 700;
}
.vp-user-profile__face img { width: 100%; height: 100%; object-fit: cover; }
.vp-user-profile__face--busy img { opacity: 0.5; }
.vp-user-profile__picture-text { display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.8125rem; }
.vp-user-profile__picture-text small { opacity: 0.65; }
.vp-user-profile__change { align-self: flex-start; color: var(--_color); font-size: 0.9375rem; font-weight: 600; cursor: pointer; }
.vp-user-profile__change:hover { text-decoration: underline; }
.vp-user-profile__change:focus-within { outline: 2px solid var(--_color); outline-offset: 2px; border-radius: 4px; }
.vp-user-profile__file { position: absolute; width: 1px; height: 1px; opacity: 0; }
.vp-user-profile__field { display: flex; flex-direction: column; gap: 0.35rem; }
.vp-user-profile__label { font-size: 0.9375rem; font-weight: 550; }
.vp-user-profile__input {
  box-sizing: border-box;
  width: 100%;
  padding: 0.75rem 0.9rem;
  border: 1px solid var(--vp-border, rgba(127, 127, 127, 0.4));
  border-radius: var(--_radius);
  background: var(--vp-input, transparent);
  color: inherit;
  font: inherit;
}
.vp-user-profile__input:focus { outline: none; border-color: var(--_color); box-shadow: 0 0 0 3px color-mix(in srgb, var(--_color) 22%, transparent); }
.vp-user-profile__input[readonly] { opacity: 0.7; }
.vp-user-profile__wrong, .vp-user-profile__problem { color: #c0362c; }
.vp-user-profile__problem { margin: 0; }
.vp-user-profile__buttons { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; flex-wrap: wrap; }
.vp-user-profile__button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75em 1.6em;
  border: 0;
  border-radius: var(--_radius);
  background: var(--_color);
  color: var(--vp-primary-contrast, #fff);
  font: inherit;
  font-weight: 650;
  text-decoration: none;
  cursor: pointer;
}
.vp-user-profile__button:hover { filter: brightness(1.08); }
.vp-user-profile__button:disabled { opacity: 0.7; cursor: default; }
.vp-user-profile__out-button { padding: 0.5em 0.25em; border: 0; background: none; color: inherit; font: inherit; opacity: 0.75; cursor: pointer; }
.vp-user-profile__out-button:hover { opacity: 1; text-decoration: underline; }
.vp-user-profile__out { display: flex; flex-direction: column; align-items: flex-start; gap: 0.75rem; }
.vp-user-profile__out p { margin: 0; }
.vp-user-profile__spinner { position: absolute; width: 1.6rem; height: 1.6rem; border: 2.5px solid var(--_color); border-right-color: transparent; border-radius: 50%; animation: vp-user-profile-spin 0.7s linear infinite; }
.vp-user-profile__spinner--small { position: static; width: 1em; height: 1em; border-width: 2px; border-color: currentColor; border-right-color: transparent; }
@keyframes vp-user-profile-spin { to { transform: rotate(360deg); } }
</style>
`;export{e as default};