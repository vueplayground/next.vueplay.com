var e=`<template>
  <div class="vp-user-profile" :class="'vp-user-profile--' + look" :style="style">
    <div v-if="!person" class="vp-user-profile__out">
      <p>{{ say('signedOut', signedOutText) }}</p>
      <a v-if="signInLink" class="vp-user-profile__button" :href="signInLink" @click="go($event, signInLink)">{{ say('signIn', signInText) }}</a>
    </div>

    <form v-else class="vp-user-profile__form" novalidate :aria-label="say('title', title)" @submit.prevent="save">
      <h2 v-if="showTitle" class="vp-user-profile__title">{{ say('title', title) }}</h2>

      <!-- the picture: chosen, cut square in the middle and made small here, then sent -->
      <div v-if="avatar" class="vp-user-profile__picture">
        <span class="vp-user-profile__face" :class="{ 'vp-user-profile__face--busy': uploading }">
          <img v-if="preview || person.avatar" :src="preview || person.avatar" alt="">
          <template v-else>{{ initials }}</template>
          <span v-if="uploading" class="vp-user-profile__spinner" aria-hidden="true" />
        </span>
        <div class="vp-user-profile__picture-text">
          <label class="vp-user-profile__change">
            <input class="vp-user-profile__file" type="file" accept="image/*" :aria-describedby="'vp-user-profile-' + uid + '-help'" @change="choose">
            {{ pictureText }}
          </label>
          <small :id="'vp-user-profile-' + uid + '-help'">{{ say('pictureHelp', pictureHelp) }}</small>
          <small v-if="pictureProblem" class="vp-user-profile__wrong" role="alert" :title="pictureDetail || undefined">{{ pictureProblem }}</small>
        </div>
      </div>

      <label class="vp-user-profile__field">
        <span class="vp-user-profile__label">{{ say('name', nameLabel) }}</span>
        <input v-model="values.name" class="vp-user-profile__input" name="name" autocomplete="name" autocapitalize="words">
      </label>
      <label class="vp-user-profile__field">
        <span class="vp-user-profile__label">{{ say('email', emailLabel) }}</span>
        <input class="vp-user-profile__input" :value="person.email" type="email" name="email" autocomplete="email" readonly>
      </label>
      <label v-for="one in extra" :key="one.key" class="vp-user-profile__field">
        <span class="vp-user-profile__label">{{ one.label }}</span>
        <textarea v-if="one.type === 'textarea'" v-model="values[one.key]" class="vp-user-profile__input" rows="3" :name="one.key" />
        <input v-else v-model="values[one.key]" class="vp-user-profile__input" :type="one.type" :name="one.key" :autocomplete="one.autocomplete">
      </label>

      <p v-if="problem" class="vp-user-profile__problem" role="alert" :title="detail || undefined">{{ problem }}</p>
      <div class="vp-user-profile__buttons">
        <button class="vp-user-profile__button" type="submit" :disabled="saving" :aria-busy="saving ? 'true' : 'false'">
          <span v-if="saving" class="vp-user-profile__spinner vp-user-profile__spinner--small" aria-hidden="true" />
          <span aria-live="polite">{{ saved ? say('saved', savedText) : say('save', saveText) }}</span>
        </button>
        <button v-if="signOut" type="button" class="vp-user-profile__out-button" @click="out">{{ say('signOut', signOutText) }}</button>
      </div>
    </form>
  </div>
</template>
<script>
// The signed-in visitor's own page: their picture (chosen, cut square and made small in the browser, then put in
// the backend's storage), their name and the other fields you list, saved to the source in Data that visitors
// sign in with. Signed out, it says so with a link to sign in. In the Studio it shows a made-up person.
const SAMPLE = { id: 'sample', name: 'Kari Nordmann', email: 'kari@example.com', avatar: '' }
let made = 0

// The words it says itself, in the site's language (App.vue's head says it: \`htmlAttrs: { lang }\`). A text
// that is filled in in the Props tab is said as it is written.
const WORDS = {
  en: { title: 'Your profile', name: 'Name', email: 'E-mail', bio: 'About you', addPicture: 'Add a picture', changePicture: 'Change the picture', pictureHelp: 'A square one looks best. It is made small before it is sent.', save: 'Save', saved: 'Saved', signOut: 'Sign out', signedOut: 'Sign in to see your profile.', signIn: 'Sign in', notSaved: 'It could not be saved.', notPicture: 'That is not a picture.', unreadable: 'That picture could not be read.', notSent: 'The picture could not be sent.' },
  nb: { title: 'Profilen din', name: 'Navn', email: 'E-post', bio: 'Om deg', addPicture: 'Legg til et bilde', changePicture: 'Bytt bilde', pictureHelp: 'Et kvadratisk bilde ser best ut. Det gjøres mindre før det sendes.', save: 'Lagre', saved: 'Lagret', signOut: 'Logg ut', signedOut: 'Logg inn for å se profilen din.', signIn: 'Logg inn', notSaved: 'Det kunne ikke lagres.', notPicture: 'Det er ikke et bilde.', unreadable: 'Bildet kunne ikke leses.', notSent: 'Bildet kunne ikke sendes.' },
  sv: { title: 'Din profil', name: 'Namn', email: 'E-post', bio: 'Om dig', addPicture: 'Lägg till en bild', changePicture: 'Byt bild', pictureHelp: 'En kvadratisk bild ser bäst ut. Den görs mindre innan den skickas.', save: 'Spara', saved: 'Sparat', signOut: 'Logga ut', signedOut: 'Logga in för att se din profil.', signIn: 'Logga in', notSaved: 'Det gick inte att spara.', notPicture: 'Det är ingen bild.', unreadable: 'Bilden gick inte att läsa.', notSent: 'Bilden gick inte att skicka.' },
  da: { title: 'Din profil', name: 'Navn', email: 'E-mail', bio: 'Om dig', addPicture: 'Tilføj et billede', changePicture: 'Skift billedet', pictureHelp: 'Et kvadratisk billede ser bedst ud. Det gøres mindre, før det sendes.', save: 'Gem', saved: 'Gemt', signOut: 'Log ud', signedOut: 'Log ind for at se din profil.', signIn: 'Log ind', notSaved: 'Det kunne ikke gemmes.', notPicture: 'Det er ikke et billede.', unreadable: 'Billedet kunne ikke læses.', notSent: 'Billedet kunne ikke sendes.' },
  fi: { title: 'Profiilisi', name: 'Nimi', email: 'Sähköposti', bio: 'Tietoa sinusta', addPicture: 'Lisää kuva', changePicture: 'Vaihda kuva', pictureHelp: 'Neliön muotoinen kuva näyttää parhaalta. Se pienennetään ennen lähettämistä.', save: 'Tallenna', saved: 'Tallennettu', signOut: 'Kirjaudu ulos', signedOut: 'Kirjaudu sisään nähdäksesi profiilisi.', signIn: 'Kirjaudu sisään', notSaved: 'Tallentaminen ei onnistunut.', notPicture: 'Tämä ei ole kuva.', unreadable: 'Kuvaa ei voitu lukea.', notSent: 'Kuvaa ei voitu lähettää.' },
  de: { title: 'Dein Profil', name: 'Name', email: 'E-Mail', bio: 'Über dich', addPicture: 'Bild hinzufügen', changePicture: 'Bild ändern', pictureHelp: 'Ein quadratisches Bild sieht am besten aus. Es wird vor dem Senden verkleinert.', save: 'Speichern', saved: 'Gespeichert', signOut: 'Abmelden', signedOut: 'Melde dich an, um dein Profil zu sehen.', signIn: 'Anmelden', notSaved: 'Das konnte nicht gespeichert werden.', notPicture: 'Das ist kein Bild.', unreadable: 'Das Bild konnte nicht gelesen werden.', notSent: 'Das Bild konnte nicht gesendet werden.' },
  fr: { title: 'Votre profil', name: 'Nom', email: 'E-mail', bio: 'À propos de vous', addPicture: 'Ajouter une photo', changePicture: 'Changer la photo', pictureHelp: 'Une image carrée rend mieux. Elle est réduite avant l’envoi.', save: 'Enregistrer', saved: 'Enregistré', signOut: 'Se déconnecter', signedOut: 'Connectez-vous pour voir votre profil.', signIn: 'Se connecter', notSaved: 'Impossible d’enregistrer.', notPicture: 'Ce n’est pas une image.', unreadable: 'Cette image n’a pas pu être lue.', notSent: 'L’image n’a pas pu être envoyée.' },
  es: { title: 'Tu perfil', name: 'Nombre', email: 'Correo electrónico', bio: 'Sobre ti', addPicture: 'Añadir una foto', changePicture: 'Cambiar la foto', pictureHelp: 'Una imagen cuadrada queda mejor. Se reduce antes de enviarla.', save: 'Guardar', saved: 'Guardado', signOut: 'Cerrar sesión', signedOut: 'Inicia sesión para ver tu perfil.', signIn: 'Iniciar sesión', notSaved: 'No se ha podido guardar.', notPicture: 'Eso no es una imagen.', unreadable: 'No se ha podido leer la imagen.', notSent: 'No se ha podido enviar la imagen.' },
  it: { title: 'Il tuo profilo', name: 'Nome', email: 'E-mail', bio: 'Su di te', addPicture: 'Aggiungi una foto', changePicture: 'Cambia la foto', pictureHelp: 'Un’immagine quadrata rende meglio. Viene ridotta prima dell’invio.', save: 'Salva', saved: 'Salvato', signOut: 'Esci', signedOut: 'Accedi per vedere il tuo profilo.', signIn: 'Accedi', notSaved: 'Impossibile salvare.', notPicture: 'Questa non è un’immagine.', unreadable: 'Impossibile leggere l’immagine.', notSent: 'Impossibile inviare l’immagine.' },
  nl: { title: 'Je profiel', name: 'Naam', email: 'E-mail', bio: 'Over jou', addPicture: 'Foto toevoegen', changePicture: 'Foto wijzigen', pictureHelp: 'Een vierkante foto ziet er het best uit. Hij wordt verkleind voor het versturen.', save: 'Opslaan', saved: 'Opgeslagen', signOut: 'Uitloggen', signedOut: 'Log in om je profiel te zien.', signIn: 'Inloggen', notSaved: 'Opslaan is niet gelukt.', notPicture: 'Dat is geen afbeelding.', unreadable: 'De afbeelding kon niet worden gelezen.', notSent: 'De afbeelding kon niet worden verstuurd.' },
  pt: { title: 'O seu perfil', name: 'Nome', email: 'E-mail', bio: 'Sobre si', addPicture: 'Adicionar uma foto', changePicture: 'Mudar a foto', pictureHelp: 'Uma imagem quadrada fica melhor. É reduzida antes de ser enviada.', save: 'Guardar', saved: 'Guardado', signOut: 'Sair', signedOut: 'Inicie sessão para ver o seu perfil.', signIn: 'Entrar', notSaved: 'Não foi possível guardar.', notPicture: 'Isso não é uma imagem.', unreadable: 'Não foi possível ler a imagem.', notSent: 'Não foi possível enviar a imagem.' },
  pl: { title: 'Twój profil', name: 'Imię i nazwisko', email: 'E-mail', bio: 'O tobie', addPicture: 'Dodaj zdjęcie', changePicture: 'Zmień zdjęcie', pictureHelp: 'Najlepiej wygląda kwadratowe zdjęcie. Przed wysłaniem jest zmniejszane.', save: 'Zapisz', saved: 'Zapisano', signOut: 'Wyloguj się', signedOut: 'Zaloguj się, aby zobaczyć swój profil.', signIn: 'Zaloguj się', notSaved: 'Nie udało się zapisać.', notPicture: 'To nie jest obraz.', unreadable: 'Nie udało się odczytać zdjęcia.', notSent: 'Nie udało się wysłać zdjęcia.' },
  zh: { title: '你的资料', name: '姓名', email: '电子邮箱', bio: '关于你', addPicture: '添加头像', changePicture: '更换头像', pictureHelp: '方形图片效果最好。发送前会自动缩小。', save: '保存', saved: '已保存', signOut: '退出登录', signedOut: '登录后即可查看你的资料。', signIn: '登录', notSaved: '无法保存。', notPicture: '这不是图片。', unreadable: '无法读取该图片。', notSent: '无法发送该图片。' },
  ja: { title: 'プロフィール', name: '名前', email: 'メールアドレス', bio: '自己紹介', addPicture: '写真を追加', changePicture: '写真を変更', pictureHelp: '正方形の画像がおすすめです。送信前に縮小されます。', save: '保存', saved: '保存しました', signOut: 'ログアウト', signedOut: 'プロフィールを見るにはログインしてください。', signIn: 'ログイン', notSaved: '保存できませんでした。', notPicture: '画像ではありません。', unreadable: '画像を読み込めませんでした。', notSent: '画像を送信できませんでした。' }
}

export default {
  inject: { vpData: { default: null } },
  props: {
    showTitle: { type: Boolean, default: true, label: 'Show the title' },
    title: { type: String, default: '', label: 'Title', placeholder: 'Your profile' },
    avatar: { type: Boolean, default: true, label: 'A profile picture' },
    fields: {
      type: Array,
      default: () => [{ label: '', name: 'bio', type: 'textarea' }],
      label: 'More fields',
      control: 'list',
      fields: [
        { key: 'label', label: 'Label' },
        { key: 'name', label: 'Kept as (name)', placeholder: 'From the label' },
        { key: 'type', label: 'Kind', control: 'select', default: 'text', options: [{ key: 'A line of text', value: 'text' }, { key: 'Several lines', value: 'textarea' }, { key: 'Phone', value: 'tel' }, { key: 'Web address', value: 'url' }, { key: 'Date', value: 'date' }] }
      ]
    },
    nameLabel: { type: String, default: '', label: 'Label: name', placeholder: 'Name' },
    emailLabel: { type: String, default: '', label: 'Label: e-mail', placeholder: 'E-mail' },
    addPictureText: { type: String, default: '', label: 'Add a picture', placeholder: 'Add a picture' },
    changePictureText: { type: String, default: '', label: 'Change the picture', placeholder: 'Change the picture' },
    pictureHelp: { type: String, default: '', label: 'Line under the picture', placeholder: 'A square one looks best. It is made small before it is sent.' },
    saveText: { type: String, default: '', label: 'Button: save', placeholder: 'Save' },
    savedText: { type: String, default: '', label: 'Said when saved', placeholder: 'Saved' },
    signOut: { type: Boolean, default: true, label: 'A Sign out button' },
    signOutText: { type: String, default: '', label: 'Sign out', placeholder: 'Sign out' },
    signedOutText: { type: String, default: '', label: 'Said when nobody is signed in', placeholder: 'Sign in to see your profile.' },
    signInText: { type: String, default: '', label: 'Its link text', placeholder: 'Sign in' },
    signInLink: { type: String, default: '/sign-in', label: 'Its link' },
    look: { type: String, default: 'card', label: 'Look', control: 'select', options: [{ key: 'A card', value: 'card' }, { key: 'Plain', value: 'plain' }] },
    color: { type: String, default: '', label: 'Button color', control: 'color' },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 30 }
  },
  emits: ['saved'],
  data() {
    return { values: {}, saving: false, saved: false, problem: '', detail: '', uploading: false, preview: '', pictureProblem: '', pictureDetail: '' }
  },
  created() {
    this.uid = ++made
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
      return { '--vp-user-profile-color': this.color || undefined, '--vp-user-profile-radius': this.radius || undefined }
    },
    inStudio() {
      return typeof document !== 'undefined' && (document.getElementById('receiver') ? document.getElementById('receiver').getAttribute('live') !== 'yes' : !!window.studio)
    },
    person() {
      return this.inStudio ? SAMPLE : this.vpData?.auth?.user || null
    },
    personKey() {
      const person = this.person
      return person ? String(person.id ?? person.email ?? '') || 'someone' : ''
    },
    initials() {
      return String(this.person?.name || this.person?.email || '?').split(/[\\s@.]+/).filter(Boolean).slice(0, 2).map(word => word[0].toUpperCase()).join('')
    },
    // (the Studio reads templates as HTML: the choice is made here, not inside {{ }})
    pictureText() {
      return this.person?.avatar || this.preview ? this.say('changePicture', this.changePictureText) : this.say('addPicture', this.addPictureText)
    },
    // A name written in "Kept as" is the backend's field as it is written (firstName stays firstName); one made
    // from the label is made lower case. \`was\`: how it was kept before, read when the person has nothing under it
    extra() {
      const made = text => String(text || '').trim().toLowerCase().replace(/[^\\p{L}\\p{N}]+/gu, '_').replace(/^_|_$/g, '')
      return (this.fields || []).map((one, index) => ({
        label: one.label || (one.name === 'bio' ? this.say('bio') : ''),
        key: (one.name ? String(one.name).trim().replace(/[^\\p{L}\\p{N}_$-]+/gu, '_').replace(/^_|_$/g, '') : made(one.label)) || 'field_' + (index + 1),
        was: made(one.name || one.label) || 'field_' + (index + 1),
        type: ['text', 'textarea', 'tel', 'url', 'date'].includes(one.type) ? one.type : 'text',
        autocomplete: { tel: 'tel', url: 'url' }[one.type] || undefined
      }))
    }
  },
  watch: {
    // Filled again only for another visitor: auth.user is replaced after a save or a new picture, and what is
    // being typed must stay
    personKey: { immediate: true, handler: 'fill' },
    extra: 'fill'
  },
  methods: {
    words() {
      const lang = this.lang, short = lang.split('-')[0]
      return WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
    },
    // The backend's own text is English: shown as it is on an English site, else the site's words with it as the title
    failed(answer, key) {
      const english = this.words() === WORDS.en
      return [(english && answer.error) || this.say(key), english ? '' : String(answer.error || '')]
    },
    say(key, own, n) {
      const words = this.words()
      return String(own || (words[key] ?? WORDS.en[key])).replace(/\\{(n|name)\\}/g, n ?? '')
    },
    fill() {
      const person = this.person || {}
      this.values = { name: person.name || '', ...Object.fromEntries(this.extra.map(one => [one.key, person[one.key] ?? person[one.was] ?? ''])) }
    },
    async save() {
      if (this.saving || !this.person) return
      this.problem = ''
      this.detail = ''
      if (this.inStudio) { this.flash(); return }
      this.saving = true
      const answer = await this.vpData.saveProfile({ ...this.values })
      this.saving = false
      if (!answer.ok) { [this.problem, this.detail] = this.failed(answer, 'notSaved'); return }
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
      this.pictureDetail = ''
      if (!/^image\\//.test(file.type)) { this.pictureProblem = this.say('notPicture'); return }
      let picture
      try { picture = await this.square(file) } catch (e) { this.pictureProblem = this.say('unreadable'); return }
      this.forget()
      this.preview = URL.createObjectURL(picture)
      if (this.inStudio) return
      this.uploading = true
      const answer = await this.vpData.uploadAvatar(picture)
      this.uploading = false
      if (!answer.ok) {
        // not saved: the picture that is saved is shown again
        this.forget()
        ;[this.pictureProblem, this.pictureDetail] = this.failed(answer, 'notSent')
      }
    },
    forget() {
      if (this.preview) URL.revokeObjectURL(this.preview)
      this.preview = ''
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
    this.forget()
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
  font-size: 0.9375rem;
  text-align: left;
}
.vp-user-profile--card {
  padding: clamp(1.5rem, 4vw, 2.25rem);
  border: 1px solid var(--vp-border, rgba(127, 127, 127, 0.25));
  border-radius: calc(var(--_radius) + 6px);
  background: var(--vp-background, transparent);
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 12px 32px -8px rgba(15, 23, 42, 0.1), 0 32px 64px -24px rgba(15, 23, 42, 0.1);
}
.vp-user-profile__form { display: flex; flex-direction: column; gap: 1rem; }
.vp-user-profile__title { margin: 0 0 0.25rem; font-family: var(--vp-font-heading, inherit); font-size: 1.5rem; font-weight: 700; line-height: 1.2; letter-spacing: -0.015em; }
.vp-user-profile__picture { display: flex; align-items: center; gap: 1rem; padding-bottom: 1.1rem; border-bottom: 1px solid var(--vp-border, rgba(127, 127, 127, 0.25)); }
.vp-user-profile__face {
  position: relative;
  display: grid;
  flex: none;
  place-items: center;
  width: 4.5rem;
  height: 4.5rem;
  overflow: hidden;
  border-radius: 50%;
  background: color-mix(in srgb, var(--_color) 12%, transparent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--_color) 22%, transparent);
  color: var(--_color);
  font-size: 1.375rem;
  font-weight: 650;
}
.vp-user-profile__face img { width: 100%; height: 100%; object-fit: cover; }
.vp-user-profile__face--busy img { opacity: 0.5; }
.vp-user-profile__picture-text { display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.8125rem; }
.vp-user-profile__picture-text small { color: var(--vp-muted, inherit); }
.vp-user-profile__change { align-self: flex-start; color: var(--_color); font-size: 0.875rem; font-weight: 600; cursor: pointer; }
.vp-user-profile__change:hover { text-decoration: underline; }
.vp-user-profile__change:focus-within { outline: 2px solid var(--_color); outline-offset: 2px; border-radius: 4px; }
.vp-user-profile__file { position: absolute; width: 1px; height: 1px; opacity: 0; }
.vp-user-profile__field { display: flex; flex-direction: column; gap: 0.35rem; }
.vp-user-profile__label { font-size: 0.8125rem; font-weight: 600; }
.vp-user-profile__input {
  box-sizing: border-box;
  width: 100%;
  padding: 0.65rem 0.8rem;
  border: 1px solid color-mix(in srgb, var(--vp-text, #111827) 16%, var(--vp-border, rgba(127, 127, 127, 0.4)));
  border-radius: var(--_radius);
  background: var(--vp-input, transparent);
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
  color: inherit;
  font: inherit;
  transition: border-color 120ms ease, box-shadow 120ms ease;
}
.vp-user-profile__input:hover:not([readonly]) { border-color: color-mix(in srgb, var(--vp-text, #111827) 30%, var(--vp-border, rgba(127, 127, 127, 0.4))); }
.vp-user-profile__input:focus { outline: none; border-color: var(--_color); box-shadow: 0 0 0 3px color-mix(in srgb, var(--_color) 20%, transparent); }
.vp-user-profile__input[readonly] { background: color-mix(in srgb, var(--vp-text, #111827) 4%, transparent); box-shadow: none; color: var(--vp-muted, inherit); }
.vp-user-profile__wrong, .vp-user-profile__problem { color: #c0362c; font-size: 0.8125rem; }
.vp-user-profile__problem { margin: 0; }
.vp-user-profile__buttons { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; flex-wrap: wrap; margin-top: 0.25rem; }
.vp-user-profile__button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65em 1.4em;
  border: 0;
  border-radius: var(--_radius);
  background: var(--_color);
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.14);
  color: var(--vp-primary-contrast, #fff);
  font: inherit;
  font-weight: 650;
  text-decoration: none;
  cursor: pointer;
}
.vp-user-profile__button:hover { filter: brightness(1.08); }
.vp-user-profile__button:disabled { opacity: 0.7; cursor: default; }
.vp-user-profile__button:focus-visible, .vp-user-profile__out-button:focus-visible { outline: 2px solid var(--_color); outline-offset: 2px; }
.vp-user-profile__out-button { padding: 0.5em 0.25em; border: 0; background: none; border-radius: 6px; color: var(--vp-muted, inherit); font: inherit; font-size: 0.875rem; font-weight: 550; cursor: pointer; }
.vp-user-profile__out-button:hover { color: var(--vp-text, inherit); text-decoration: underline; text-underline-offset: 3px; }
.vp-user-profile__out { display: flex; flex-direction: column; align-items: flex-start; gap: 0.75rem; }
.vp-user-profile__out p { margin: 0; }
.vp-user-profile__spinner { position: absolute; width: 1.6rem; height: 1.6rem; border: 2.5px solid var(--_color); border-right-color: transparent; border-radius: 50%; animation: vp-user-profile-spin 0.7s linear infinite; }
.vp-user-profile__spinner--small { position: static; width: 1em; height: 1em; border-width: 2px; border-color: currentColor; border-right-color: transparent; }
@keyframes vp-user-profile-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .vp-user-profile__spinner { animation-duration: 2s; } .vp-user-profile__input { transition: none; } }
</style>
`;export{e as default};