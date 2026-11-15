var e=`<template>
  <form
    ref="form"
    class="vp-form"
    :class="['vp-form--' + state, { 'vp-form--steps': pages.length > 1 }]"
    :style="style"
    novalidate
    @submit.prevent="submit"
  >
    <div v-if="state === 'sent'" class="vp-form__thanks" role="status" tabindex="-1">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
      <span>{{ say('thanks', thanks) }}<small v-if="studioNote" class="vp-form__note">{{ studioNote }} <button type="button" class="vp-form__again" @click="again">{{ say('again') }}</button></small></span>
    </div>
    <template v-else>
      <!-- in steps: where the visitor is -->
      <div v-if="pages.length > 1" class="vp-form__progress" aria-hidden="true">
        <span v-for="(one, i) in pages" :key="i" class="vp-form__dot" :class="{ 'vp-form__dot--done': page > i, 'vp-form__dot--now': i === page }">
          <b>{{ i + 1 }}</b><small v-if="one.title">{{ one.title }}</small>
        </span>
      </div>

      <div class="vp-form__fields">
        <template v-for="field in pages[page].fields" :key="field.key">
          <div
            v-if="shown(field)"
            class="vp-form__field"
            :class="['vp-form__field--' + field.kind, { 'vp-form__field--half': field.half, 'vp-form__field--wrong': errors[field.key] }]"
          >
            <!-- a box to tick (and consent): the box beside its words -->
            <label v-if="field.kind === 'checkbox' || field.kind === 'consent'" class="vp-form__tick">
              <input v-model="values[field.key]" class="vp-form__check" type="checkbox" :name="field.key" :required="field.required" :aria-invalid="!!errors[field.key]" :aria-describedby="describedBy(field)" @change="check(field)">
              <span class="vp-form__label">{{ field.label }}<span v-if="field.required" class="vp-form__must" aria-hidden="true"> *</span></span>
            </label>
            <template v-else-if="field.kind !== 'hidden'">
              <label :id="'vp-form-' + uid + '-' + field.key + '-label'" class="vp-form__label" :for="'vp-form-' + uid + '-' + field.key">{{ field.label }}<span v-if="field.required" class="vp-form__must" aria-hidden="true"> *</span></label>
              <textarea
                v-if="field.kind === 'textarea'"
                :id="'vp-form-' + uid + '-' + field.key"
                v-model="values[field.key]"
                class="vp-form__input"
                rows="5"
                :name="field.key"
                :placeholder="field.placeholder || undefined"
                :required="field.required"
                :aria-invalid="!!errors[field.key]"
                :aria-describedby="describedBy(field)"
                @blur="check(field)"
              />
              <select
                v-else-if="field.kind === 'select'"
                :id="'vp-form-' + uid + '-' + field.key"
                v-model="values[field.key]"
                class="vp-form__input vp-form__select"
                :name="field.key"
                :required="field.required"
                :aria-invalid="!!errors[field.key]"
                :aria-describedby="describedBy(field)"
                @change="check(field)"
              >
                <option value="" disabled>{{ field.placeholder || say('choose') }}</option>
                <option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
              </select>
              <div v-else-if="field.kind === 'radio' || field.kind === 'checkboxes'" class="vp-form__choices" role="group" :aria-labelledby="'vp-form-' + uid + '-' + field.key + '-label'" :aria-describedby="describedBy(field)">
                <label v-for="option in field.options" :key="option" class="vp-form__choice">
                  <input
                    v-if="field.kind === 'radio'"
                    v-model="values[field.key]"
                    class="vp-form__check"
                    type="radio"
                    :name="field.key"
                    :value="option"
                    @change="check(field)"
                  >
                  <input v-else v-model="values[field.key]" class="vp-form__check" type="checkbox" :name="field.key" :value="option" @change="check(field)">
                  <span>{{ option }}</span>
                </label>
              </div>
              <label v-else-if="field.kind === 'file'" class="vp-form__file" :class="{ 'vp-form__file--chosen': files[field.key] }">
                <input :id="'vp-form-' + uid + '-' + field.key" class="vp-form__file-input" type="file" :name="field.key" :accept="field.accept || undefined" :required="field.required" :aria-invalid="!!errors[field.key]" :aria-describedby="describedBy(field)" @change="chooseFile(field, $event)">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4M7 9l5-5 5 5M5 20h14" /></svg>
                <span>{{ files[field.key]?.name || field.placeholder || say('chooseFile') }}</span>
              </label>
              <input
                v-else
                :id="'vp-form-' + uid + '-' + field.key"
                v-model="values[field.key]"
                class="vp-form__input"
                :type="field.kind"
                :name="field.key"
                :placeholder="field.placeholder || undefined"
                :required="field.required"
                :autocomplete="autocomplete(field)"
                :inputmode="inputmode(field)"
                :aria-invalid="!!errors[field.key]"
                :aria-describedby="describedBy(field)"
                @blur="check(field)"
              >
            </template>
            <small v-if="field.help && !errors[field.key]" :id="'vp-form-' + uid + '-' + field.key + '-help'" class="vp-form__help">{{ field.help }}</small>
            <small v-if="errors[field.key]" :id="'vp-form-' + uid + '-' + field.key + '-error'" class="vp-form__error" role="alert">{{ errors[field.key] }}</small>
          </div>
        </template>
      </div>

      <!-- what else is put in the form, on the last step -->
      <slot v-if="page === pages.length - 1" />

      <!-- for robots only: a person never sees it, so one that is filled in is not a person -->
      <div class="vp-form__trap" aria-hidden="true">
        <label>{{ say('trap') }} <input v-model="trap" type="text" name="website" tabindex="-1" autocomplete="off"></label>
      </div>

      <div v-if="captcha !== 'none' && page === pages.length - 1" class="vp-form__captcha">
        <div v-if="inStudio" class="vp-form__captcha-shown">{{ captchaName }} · {{ captchaKey ? say('captchaShown') : say('captchaKey') }}</div>
        <div v-else ref="captcha" />
      </div>

      <p v-if="state === 'failed'" class="vp-form__problem" role="alert">{{ failure || say('problem', problem) }}</p>

      <div class="vp-form__buttons">
        <button v-if="page > 0" class="vp-form__back" type="button" @click="back">{{ say('back', backText) }}</button>
        <button class="vp-form__button" type="submit" :disabled="state === 'sending'" :aria-busy="state === 'sending' ? 'true' : 'false'">
          <span v-if="state === 'sending'" class="vp-form__spinner" aria-hidden="true" />
          {{ buttonText }}
        </button>
      </div>
    </template>
  </form>
</template>
<script>
// A form: the fields you list (or put inside it), checked as they are filled in, in one go or in steps, and
// sent where you say: a route of your own backend (a source in Data), any address, or, with only an e-mail,
// a ready-written e-mail in the visitor's mail program. A field can be half as wide, have a line of help, and
// show only when another field has a value. A hidden field and the time it took keep most robots out, and a
// CAPTCHA (Turnstile, hCaptcha or reCAPTCHA) can be added with its site key: its answer is sent with the form
// for your backend to check. In the Studio nothing is sent: it says what would have been.
let made = 0
const KINDS = ['text', 'email', 'tel', 'url', 'number', 'date', 'time', 'textarea', 'select', 'radio', 'checkboxes', 'checkbox', 'consent', 'file', 'hidden', 'step']
const CAPTCHAS = {
  turnstile: { name: 'Turnstile', script: 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit', global: 'turnstile', field: 'cf-turnstile-response' },
  hcaptcha: { name: 'hCaptcha', script: 'https://js.hcaptcha.com/1/api.js?render=explicit', global: 'hcaptcha', field: 'h-captcha-response' },
  recaptcha: { name: 'reCAPTCHA', script: 'https://www.google.com/recaptcha/api.js?render=explicit', global: 'grecaptcha', field: 'g-recaptcha-response' }
}

// The words it says itself, in the site's language (App.vue's head says it: \`htmlAttrs: { lang }\`). A text
// that is filled in in the Props tab is said as it is written; the fields' labels and choices are yours.
const WORDS = {
  en: {
    send: 'Send', next: 'Next', back: 'Back', sending: 'Sending…', thanks: 'Thank you! We will get back to you soon.',
    problem: 'It could not be sent. Please try again in a moment.', required: 'Please fill this in',
    badEmail: 'This does not look like an e-mail address', badUrl: 'Write the whole address, with https://', badTel: 'This does not look like a phone number',
    badNumber: 'Please write a number', choose: 'Choose…', chooseFile: 'Choose a file', trap: 'Leave this empty',
    robot: 'Please show that you are not a robot first.', nowhere: 'This form has nowhere to send to yet.', noCaptcha: 'The CAPTCHA could not be shown.',
    yes: 'Yes', no: 'No', subject: 'Message',
    again: 'Show the form again', studioTo: 'In the editor nothing is sent. On the site this goes to {name}.',
    studioNowhere: 'Choose where it is sent: a source in Data, an address or an e-mail.', mailTo: 'an e-mail to {name}',
    captchaShown: 'shown here on the site', captchaKey: 'needs its site key'
  },
  nb: {
    send: 'Send', next: 'Neste', back: 'Tilbake', sending: 'Sender…', thanks: 'Takk! Vi tar kontakt snart.',
    problem: 'Det kunne ikke sendes. Prøv igjen om litt.', required: 'Fyll ut dette',
    badEmail: 'Dette ser ikke ut som en e-postadresse', badUrl: 'Skriv hele adressen, med https://', badTel: 'Dette ser ikke ut som et telefonnummer',
    badNumber: 'Skriv et tall', choose: 'Velg…', chooseFile: 'Velg en fil', trap: 'La dette stå tomt',
    robot: 'Vis først at du ikke er en robot.', nowhere: 'Dette skjemaet har ingen mottaker ennå.', noCaptcha: 'CAPTCHA-en kunne ikke vises.',
    yes: 'Ja', no: 'Nei', subject: 'Melding',
    again: 'Vis skjemaet igjen', studioTo: 'I editoren sendes ingenting. På nettstedet går dette til {name}.',
    studioNowhere: 'Velg hvor det sendes: en kilde i Data, en adresse eller en e-post.', mailTo: 'en e-post til {name}',
    captchaShown: 'vises her på nettstedet', captchaKey: 'trenger nettstedsnøkkelen sin'
  },
  sv: {
    send: 'Skicka', next: 'Nästa', back: 'Tillbaka', sending: 'Skickar…', thanks: 'Tack! Vi hör av oss snart.',
    problem: 'Det gick inte att skicka. Försök igen om en stund.', required: 'Fyll i det här',
    badEmail: 'Det här ser inte ut som en e-postadress', badUrl: 'Skriv hela adressen, med https://', badTel: 'Det här ser inte ut som ett telefonnummer',
    badNumber: 'Skriv ett tal', choose: 'Välj…', chooseFile: 'Välj en fil', trap: 'Lämna detta tomt',
    robot: 'Visa först att du inte är en robot.', nowhere: 'Det här formuläret har ingen mottagare än.', noCaptcha: 'CAPTCHA:n kunde inte visas.',
    yes: 'Ja', no: 'Nej', subject: 'Meddelande',
    again: 'Visa formuläret igen', studioTo: 'I redigeraren skickas ingenting. På webbplatsen går detta till {name}.',
    studioNowhere: 'Välj vart det skickas: en källa i Data, en adress eller ett mejl.', mailTo: 'ett mejl till {name}',
    captchaShown: 'visas här på webbplatsen', captchaKey: 'behöver sin webbplatsnyckel'
  },
  da: {
    send: 'Send', next: 'Næste', back: 'Tilbage', sending: 'Sender…', thanks: 'Tak! Vi vender tilbage snarest.',
    problem: 'Det kunne ikke sendes. Prøv igen om lidt.', required: 'Udfyld venligst dette',
    badEmail: 'Det ligner ikke en e-mailadresse', badUrl: 'Skriv hele adressen, med https://', badTel: 'Det ligner ikke et telefonnummer',
    badNumber: 'Skriv et tal', choose: 'Vælg…', chooseFile: 'Vælg en fil', trap: 'Lad dette være tomt',
    robot: 'Vis først, at du ikke er en robot.', nowhere: 'Denne formular har endnu ingen modtager.', noCaptcha: 'CAPTCHA’en kunne ikke vises.',
    yes: 'Ja', no: 'Nej', subject: 'Besked',
    again: 'Vis formularen igen', studioTo: 'I editoren sendes intet. På webstedet går dette til {name}.',
    studioNowhere: 'Vælg, hvor det sendes hen: en kilde i Data, en adresse eller en e-mail.', mailTo: 'en e-mail til {name}',
    captchaShown: 'vises her på webstedet', captchaKey: 'mangler sin webstedsnøgle'
  },
  fi: {
    send: 'Lähetä', next: 'Seuraava', back: 'Takaisin', sending: 'Lähetetään…', thanks: 'Kiitos! Palaamme asiaan pian.',
    problem: 'Lähettäminen ei onnistunut. Yritä hetken päästä uudelleen.', required: 'Täytä tämä kenttä',
    badEmail: 'Tämä ei näytä sähköpostiosoitteelta', badUrl: 'Kirjoita koko osoite, https:// mukaan lukien', badTel: 'Tämä ei näytä puhelinnumerolta',
    badNumber: 'Kirjoita numero', choose: 'Valitse…', chooseFile: 'Valitse tiedosto', trap: 'Jätä tämä tyhjäksi',
    robot: 'Osoita ensin, ettet ole robotti.', nowhere: 'Tällä lomakkeella ei ole vielä vastaanottajaa.', noCaptcha: 'CAPTCHA-tarkistusta ei voitu näyttää.',
    yes: 'Kyllä', no: 'Ei', subject: 'Viesti',
    again: 'Näytä lomake uudelleen', studioTo: 'Editorissa mitään ei lähetetä. Sivustolla tämä menee kohteeseen {name}.',
    studioNowhere: 'Valitse, minne se lähetetään: Data-lähde, osoite tai sähköposti.', mailTo: 'sähköposti osoitteeseen {name}',
    captchaShown: 'näytetään täällä sivustolla', captchaKey: 'tarvitsee sivustoavaimensa'
  },
  de: {
    send: 'Senden', next: 'Weiter', back: 'Zurück', sending: 'Wird gesendet…', thanks: 'Danke! Wir melden uns bald bei dir.',
    problem: 'Das konnte nicht gesendet werden. Bitte versuche es gleich noch einmal.', required: 'Bitte ausfüllen',
    badEmail: 'Das sieht nicht wie eine E-Mail-Adresse aus', badUrl: 'Schreib die ganze Adresse, mit https://', badTel: 'Das sieht nicht wie eine Telefonnummer aus',
    badNumber: 'Bitte eine Zahl eingeben', choose: 'Auswählen…', chooseFile: 'Datei auswählen', trap: 'Dieses Feld leer lassen',
    robot: 'Bitte zeige zuerst, dass du kein Roboter bist.', nowhere: 'Dieses Formular hat noch kein Ziel.', noCaptcha: 'Das CAPTCHA konnte nicht angezeigt werden.',
    yes: 'Ja', no: 'Nein', subject: 'Nachricht',
    again: 'Formular wieder zeigen', studioTo: 'Im Editor wird nichts gesendet. Auf der Website geht dies an {name}.',
    studioNowhere: 'Wähle, wohin es gesendet wird: eine Quelle unter Daten, eine Adresse oder eine E-Mail.', mailTo: 'eine E-Mail an {name}',
    captchaShown: 'wird hier auf der Website gezeigt', captchaKey: 'braucht seinen Website-Schlüssel'
  },
  fr: {
    send: 'Envoyer', next: 'Suivant', back: 'Retour', sending: 'Envoi…', thanks: 'Merci ! Nous revenons vers vous très vite.',
    problem: 'L’envoi a échoué. Veuillez réessayer dans un instant.', required: 'Veuillez remplir ce champ',
    badEmail: 'Cela ne ressemble pas à une adresse e-mail', badUrl: 'Écrivez l’adresse complète, avec https://', badTel: 'Cela ne ressemble pas à un numéro de téléphone',
    badNumber: 'Veuillez saisir un nombre', choose: 'Choisir…', chooseFile: 'Choisir un fichier', trap: 'Laissez ce champ vide',
    robot: 'Veuillez d’abord montrer que vous n’êtes pas un robot.', nowhere: 'Ce formulaire n’a pas encore de destination.', noCaptcha: 'Le CAPTCHA n’a pas pu être affiché.',
    yes: 'Oui', no: 'Non', subject: 'Message',
    again: 'Afficher à nouveau le formulaire', studioTo: 'Dans l’éditeur, rien n’est envoyé. Sur le site, ceci part vers {name}.',
    studioNowhere: 'Choisissez où l’envoyer : une source dans Données, une adresse ou un e-mail.', mailTo: 'un e-mail à {name}',
    captchaShown: 'affiché ici sur le site', captchaKey: 'il faut sa clé de site'
  },
  es: {
    send: 'Enviar', next: 'Siguiente', back: 'Atrás', sending: 'Enviando…', thanks: '¡Gracias! Te responderemos pronto.',
    problem: 'No se ha podido enviar. Inténtalo de nuevo en un momento.', required: 'Rellena este campo',
    badEmail: 'Esto no parece una dirección de correo', badUrl: 'Escribe la dirección completa, con https://', badTel: 'Esto no parece un número de teléfono',
    badNumber: 'Escribe un número', choose: 'Elige…', chooseFile: 'Elige un archivo', trap: 'Deja esto vacío',
    robot: 'Demuestra primero que no eres un robot.', nowhere: 'Este formulario aún no tiene adónde enviar.', noCaptcha: 'No se ha podido mostrar el CAPTCHA.',
    yes: 'Sí', no: 'No', subject: 'Mensaje',
    again: 'Mostrar el formulario de nuevo', studioTo: 'En el editor no se envía nada. En el sitio esto va a {name}.',
    studioNowhere: 'Elige adónde se envía: una fuente de Datos, una dirección o un correo.', mailTo: 'un correo a {name}',
    captchaShown: 'se muestra aquí en el sitio', captchaKey: 'necesita su clave del sitio'
  },
  it: {
    send: 'Invia', next: 'Avanti', back: 'Indietro', sending: 'Invio…', thanks: 'Grazie! Ti risponderemo presto.',
    problem: 'Impossibile inviare. Riprova tra un momento.', required: 'Compila questo campo',
    badEmail: 'Non sembra un indirizzo e-mail', badUrl: 'Scrivi l’indirizzo completo, con https://', badTel: 'Non sembra un numero di telefono',
    badNumber: 'Scrivi un numero', choose: 'Scegli…', chooseFile: 'Scegli un file', trap: 'Lascia vuoto questo campo',
    robot: 'Dimostra prima di non essere un robot.', nowhere: 'Questo modulo non ha ancora una destinazione.', noCaptcha: 'Impossibile mostrare il CAPTCHA.',
    yes: 'Sì', no: 'No', subject: 'Messaggio',
    again: 'Mostra di nuovo il modulo', studioTo: 'Nell’editor non viene inviato nulla. Sul sito questo va a {name}.',
    studioNowhere: 'Scegli dove inviarlo: una fonte in Dati, un indirizzo o un’e-mail.', mailTo: 'un’e-mail a {name}',
    captchaShown: 'mostrato qui sul sito', captchaKey: 'serve la sua chiave del sito'
  },
  nl: {
    send: 'Versturen', next: 'Volgende', back: 'Terug', sending: 'Bezig met versturen…', thanks: 'Bedankt! We nemen snel contact met je op.',
    problem: 'Versturen is niet gelukt. Probeer het zo meteen opnieuw.', required: 'Vul dit in',
    badEmail: 'Dit lijkt geen e-mailadres', badUrl: 'Schrijf het hele adres, met https://', badTel: 'Dit lijkt geen telefoonnummer',
    badNumber: 'Vul een getal in', choose: 'Kies…', chooseFile: 'Kies een bestand', trap: 'Laat dit leeg',
    robot: 'Laat eerst zien dat je geen robot bent.', nowhere: 'Dit formulier heeft nog geen bestemming.', noCaptcha: 'De CAPTCHA kon niet worden getoond.',
    yes: 'Ja', no: 'Nee', subject: 'Bericht',
    again: 'Formulier opnieuw tonen', studioTo: 'In de editor wordt niets verstuurd. Op de site gaat dit naar {name}.',
    studioNowhere: 'Kies waarheen het gaat: een bron in Data, een adres of een e-mail.', mailTo: 'een e-mail aan {name}',
    captchaShown: 'hier op de site getoond', captchaKey: 'heeft zijn sitesleutel nodig'
  },
  pt: {
    send: 'Enviar', next: 'Seguinte', back: 'Voltar', sending: 'A enviar…', thanks: 'Obrigado! Responderemos em breve.',
    problem: 'Não foi possível enviar. Tente novamente daqui a pouco.', required: 'Preencha este campo',
    badEmail: 'Isto não parece um endereço de e-mail', badUrl: 'Escreva o endereço completo, com https://', badTel: 'Isto não parece um número de telefone',
    badNumber: 'Escreva um número', choose: 'Escolha…', chooseFile: 'Escolha um ficheiro', trap: 'Deixe isto em branco',
    robot: 'Mostre primeiro que não é um robô.', nowhere: 'Este formulário ainda não tem destino.', noCaptcha: 'Não foi possível mostrar o CAPTCHA.',
    yes: 'Sim', no: 'Não', subject: 'Mensagem',
    again: 'Mostrar o formulário de novo', studioTo: 'No editor nada é enviado. No site, isto vai para {name}.',
    studioNowhere: 'Escolha para onde é enviado: uma fonte em Dados, um endereço ou um e-mail.', mailTo: 'um e-mail para {name}',
    captchaShown: 'mostrado aqui no site', captchaKey: 'precisa da sua chave do site'
  },
  pl: {
    send: 'Wyślij', next: 'Dalej', back: 'Wstecz', sending: 'Wysyłanie…', thanks: 'Dziękujemy! Wkrótce się odezwiemy.',
    problem: 'Nie udało się wysłać. Spróbuj ponownie za chwilę.', required: 'Wypełnij to pole',
    badEmail: 'To nie wygląda na adres e-mail', badUrl: 'Wpisz cały adres, z https://', badTel: 'To nie wygląda na numer telefonu',
    badNumber: 'Wpisz liczbę', choose: 'Wybierz…', chooseFile: 'Wybierz plik', trap: 'Zostaw to pole puste',
    robot: 'Najpierw pokaż, że nie jesteś robotem.', nowhere: 'Ten formularz nie ma jeszcze adresata.', noCaptcha: 'Nie udało się wyświetlić CAPTCHA.',
    yes: 'Tak', no: 'Nie', subject: 'Wiadomość',
    again: 'Pokaż formularz ponownie', studioTo: 'W edytorze nic nie jest wysyłane. Na stronie trafi to do: {name}.',
    studioNowhere: 'Wybierz, dokąd ma trafić: źródło w Danych, adres lub e-mail.', mailTo: 'e-mail do {name}',
    captchaShown: 'wyświetlana tutaj na stronie', captchaKey: 'potrzebuje klucza witryny'
  },
  zh: {
    send: '发送', next: '下一步', back: '上一步', sending: '正在发送…', thanks: '谢谢！我们会尽快回复你。',
    problem: '发送失败，请稍后重试。', required: '请填写此项',
    badEmail: '这看起来不像电子邮箱地址', badUrl: '请填写完整地址，包括 https://', badTel: '这看起来不像电话号码',
    badNumber: '请填写数字', choose: '请选择…', chooseFile: '选择文件', trap: '请留空',
    robot: '请先证明你不是机器人。', nowhere: '此表单还没有发送目标。', noCaptcha: '无法显示验证码。',
    yes: '是', no: '否', subject: '留言',
    again: '再次显示表单', studioTo: '在编辑器中不会发送任何内容。在网站上，这将发送到 {name}。',
    studioNowhere: '请选择发送到哪里：“数据”中的数据源、一个地址或一个电子邮箱。', mailTo: '发给 {name} 的邮件',
    captchaShown: '会显示在网站上', captchaKey: '需要站点密钥'
  },
  ja: {
    send: '送信', next: '次へ', back: '戻る', sending: '送信中…', thanks: 'ありがとうございます。近日中にご連絡します。',
    problem: '送信できませんでした。しばらくしてからもう一度お試しください。', required: '入力してください',
    badEmail: 'メールアドレスの形式ではありません', badUrl: 'https:// から始まる完全なアドレスを入力してください', badTel: '電話番号の形式ではありません',
    badNumber: '数字を入力してください', choose: '選択してください…', chooseFile: 'ファイルを選択', trap: 'ここは空欄のままにしてください',
    robot: '先にロボットでないことを確認してください。', nowhere: 'このフォームにはまだ送信先がありません。', noCaptcha: 'CAPTCHA を表示できませんでした。',
    yes: 'はい', no: 'いいえ', subject: 'メッセージ',
    again: 'フォームをもう一度表示', studioTo: 'エディターでは何も送信されません。サイトでは {name} に送られます。',
    studioNowhere: '送信先を選んでください：データのソース、アドレス、またはメール。', mailTo: '{name} 宛てのメール',
    captchaShown: 'サイト上でここに表示されます', captchaKey: 'サイトキーが必要です'
  }
}
const loaded = {}
const load = src => (loaded[src] ||= new Promise((resolve, reject) => {
  const script = document.createElement('script')
  script.src = src
  script.async = true
  script.onload = resolve
  script.onerror = reject
  document.head.appendChild(script)
}))

export default {
  inject: { vpData: { default: null } },
  props: {
    fields: {
      type: Array,
      default: () => [
        { label: 'Name', type: 'text', required: true, width: 'half' },
        { label: 'E-mail', type: 'email', required: true, width: 'half' },
        { label: 'Message', type: 'textarea', required: true }
      ],
      label: 'Fields',
      control: 'list',
      fields: [
        { key: 'label', label: 'Label' },
        {
          key: 'type',
          label: 'Kind',
          control: 'select',
          default: 'text',
          options: [
            { key: 'A line of text', value: 'text' }, { key: 'E-mail', value: 'email' }, { key: 'Phone', value: 'tel' }, { key: 'Web address', value: 'url' },
            { key: 'Number', value: 'number' }, { key: 'Date', value: 'date' }, { key: 'Time', value: 'time' }, { key: 'Several lines', value: 'textarea' },
            { key: 'Choose from a list', value: 'select' }, { key: 'Choose one', value: 'radio' }, { key: 'Choose several', value: 'checkboxes' },
            { key: 'A box to tick', value: 'checkbox' }, { key: 'Agree to terms', value: 'consent' }, { key: 'A file', value: 'file' },
            { key: 'Hidden (sent as it is)', value: 'hidden' }, { key: 'A new step starts here', value: 'step' }
          ]
        },
        { key: 'options', label: 'Choices (with commas between)', placeholder: 'Small, Medium, Large' },
        { key: 'placeholder', label: 'Shown while empty' },
        { key: 'help', label: 'A line of help under it' },
        { key: 'required', label: 'Must be filled in', control: 'boolean' },
        { key: 'width', label: 'Width', control: 'select', default: 'full', options: [{ key: 'The whole row', value: 'full' }, { key: 'Half', value: 'half' }] },
        { key: 'name', label: 'Sent as (name)', placeholder: 'From the label' },
        { key: 'showIf', label: 'Only when', placeholder: 'contact = Phone' },
        { key: 'value', label: 'Value (hidden ones)' }
      ]
    },
    source: { type: String, default: '', label: 'Send to your backend (a source in Data)', control: 'source' },
    path: { type: String, default: '', label: 'Its route', placeholder: '/contact' },
    action: { type: String, default: '', label: 'Or send to this address', placeholder: 'https://… (a form service, or your API)' },
    method: { type: String, default: 'POST', label: 'Sent as', control: 'select', options: [{ key: 'POST (new)', value: 'POST' }, { key: 'PUT (replace)', value: 'PUT' }, { key: 'PATCH (change)', value: 'PATCH' }] },
    format: { type: String, default: 'auto', label: 'In the format', control: 'select', options: [{ key: 'Usual (JSON to a source, form data to an address)', value: 'auto' }, { key: 'JSON', value: 'json' }, { key: 'Form data (always with files)', value: 'form' }] },
    email: { type: String, default: '', label: 'Or open an e-mail to', placeholder: 'you@example.com' },
    captcha: { type: String, default: 'none', label: 'CAPTCHA', control: 'select', options: [{ key: 'None (a hidden trap is always on)', value: 'none' }, { key: 'Cloudflare Turnstile', value: 'turnstile' }, { key: 'hCaptcha', value: 'hcaptcha' }, { key: 'Google reCAPTCHA', value: 'recaptcha' }] },
    captchaKey: { type: String, default: '', label: 'CAPTCHA site key', placeholder: 'The public key; your backend checks the answer' },
    button: { type: String, default: '', label: 'Button text', placeholder: 'Send' },
    nextText: { type: String, default: '', label: 'Next step button', placeholder: 'Next' },
    backText: { type: String, default: '', label: 'Back button', placeholder: 'Back' },
    sendingText: { type: String, default: '', label: 'While sending', placeholder: 'Sending…' },
    thanks: { type: String, default: '', label: 'Said when sent', control: 'textarea', placeholder: 'Thank you! We will get back to you soon.' },
    problem: { type: String, default: '', label: 'Said when it fails', placeholder: 'It could not be sent. Please try again in a moment.' },
    requiredText: { type: String, default: '', label: 'Said for an empty one', placeholder: 'Please fill this in' },
    redirect: { type: String, default: '', label: 'Then go to', placeholder: '/thank-you' },
    color: { type: String, default: '', label: 'Button color', control: 'color' },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 30 }
  },
  emits: ['sent', 'failed'],
  data() {
    return { state: 'ready', values: {}, files: {}, errors: {}, page: 0, trap: '', started: 0, token: '', failure: '', studioNote: '', uid: ++made, widget: null }
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
      return { '--vp-form-color': this.color || undefined, '--vp-form-radius': this.radius || undefined }
    },
    inStudio() {
      return typeof document !== 'undefined' && (document.getElementById('receiver') ? document.getElementById('receiver').getAttribute('live') !== 'yes' : !!window.studio)
    },
    // The fields as the form uses them: each with its kind, its name, its choices
    list() {
      const used = new Set()
      return (this.fields || []).map((field, index) => {
        const kind = KINDS.includes(field.type) ? field.type : 'text'
        let key = String(field.name || field.label || '').trim().toLowerCase().replace(/[^\\p{L}\\p{N}]+/gu, '_').replace(/^_|_$/g, '') || 'field_' + (index + 1)
        while (used.has(key)) key += '_'
        used.add(key)
        return {
          kind,
          key,
          label: field.label || '',
          placeholder: field.placeholder || '',
          help: field.help || '',
          required: !!field.required,
          half: field.width === 'half',
          options: String(field.options || '').split(',').map(one => one.trim()).filter(Boolean),
          showIf: String(field.showIf || '').trim(),
          value: field.value ?? '',
          accept: field.accept || ''
        }
      })
    },
    // The steps: a "new step" field starts one, with its label as the step's title
    pages() {
      const pages = [{ title: '', fields: [] }]
      for (const field of this.list) {
        if (field.kind === 'step') {
          if (pages.at(-1).fields.length) pages.push({ title: field.label, fields: [] })
          else pages.at(-1).title = field.label
        } else pages.at(-1).fields.push(field)
      }
      return pages
    },
    // (the Studio reads templates as HTML: a "less than" inside {{ }} would start a tag there)
    buttonText() {
      if (this.page !== this.pages.length - 1) return this.say('next', this.nextText)
      return this.state === 'sending' ? this.say('sending', this.sendingText) : this.say('send', this.button)
    },
    captchaName() {
      return CAPTCHAS[this.captcha]?.name || ''
    }
  },
  watch: {
    list: { handler: 'fill', immediate: true },
    page() { this.$nextTick(() => this.showCaptcha()) },
    captcha() { this.$nextTick(() => this.showCaptcha()) }
  },
  mounted() {
    this.started = Date.now()
    this.showCaptcha()
  },
  methods: {
    say(key, own, n) {
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return String(own || (words[key] ?? WORDS.en[key])).replace(/\\{(n|name)\\}/g, n ?? '')
    },
    // Every field has a value to start with: what a hidden one says, a list for "choose several"
    fill() {
      const values = {}
      for (const field of this.list) {
        if (field.kind === 'step') continue
        values[field.key] = field.key in this.values ? this.values[field.key]
          : field.kind === 'checkboxes' ? []
          : field.kind === 'checkbox' || field.kind === 'consent' ? false
          : field.kind === 'hidden' ? field.value : ''
      }
      this.values = values
      if (this.page >= this.pages.length) this.page = 0
    },
    // "contact = Phone", "contact != Phone", or just "newsletter" (ticked, or filled in)
    shown(field) {
      if (!field.showIf) return true
      const found = /^(.+?)\\s*(!=|=)\\s*(.*)$/.exec(field.showIf)
      const keyOf = name => this.list.find(one => one.key === name || one.label.toLowerCase() === name.toLowerCase())?.key
      if (!found) {
        const value = this.values[keyOf(field.showIf.trim())]
        return Array.isArray(value) ? value.length > 0 : !!value
      }
      const value = this.values[keyOf(found[1].trim())]
      const wanted = found[3].trim().toLowerCase()
      const has = Array.isArray(value) ? value.some(one => String(one).toLowerCase() === wanted) : String(value ?? '').toLowerCase() === wanted
      return found[2] === '=' ? has : !has
    },
    autocomplete(field) {
      return { email: 'email', tel: 'tel', url: 'url' }[field.kind] || (/name/i.test(field.label) ? 'name' : undefined)
    },
    inputmode(field) {
      return { email: 'email', tel: 'tel', url: 'url' }[field.kind]
    },
    describedBy(field) {
      const id = 'vp-form-' + this.uid + '-' + field.key
      return this.errors[field.key] ? id + '-error' : field.help ? id + '-help' : undefined
    },
    chooseFile(field, event) {
      this.files = { ...this.files, [field.key]: event.target.files?.[0] || null }
      this.check(field)
    },
    // What is wrong with a field, said under it ('' when nothing is)
    check(field) {
      const value = field.kind === 'file' ? this.files[field.key] : this.values[field.key]
      let wrong = ''
      const empty = value === undefined || value === null || value === '' || value === false || (Array.isArray(value) && !value.length)
      if (field.required && empty && this.shown(field)) wrong = this.say('required', this.requiredText)
      else if (!empty && field.kind === 'email' && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)) wrong = this.say('badEmail')
      else if (!empty && field.kind === 'url' && !/^https?:\\/\\/\\S+\\.\\S+/.test(value)) wrong = this.say('badUrl')
      else if (!empty && field.kind === 'tel' && !/^[+()\\d\\s.-]{5,}$/.test(value)) wrong = this.say('badTel')
      else if (!empty && field.kind === 'number' && !Number.isFinite(Number(value))) wrong = this.say('badNumber')
      const errors = { ...this.errors }
      if (wrong) errors[field.key] = wrong
      else delete errors[field.key]
      this.errors = errors
      return !wrong
    },
    // The fields of this step are checked; the first one that is wrong gets the focus
    checkPage() {
      let ok = true
      for (const field of this.pages[this.page].fields) if (field.kind !== 'hidden' && !this.check(field)) ok = false
      if (!ok) this.$nextTick(() => this.$refs.form?.querySelector('[aria-invalid="true"], .vp-form__field--wrong input')?.focus())
      return ok
    },
    back() {
      if (this.page > 0) this.page--
    },
    async submit() {
      if (this.state === 'sending' || !this.checkPage()) return
      if (this.page < this.pages.length - 1) {
        this.page++
        this.$nextTick(() => this.$refs.form?.querySelector('input, textarea, select')?.focus())
        return
      }
      // (a robot fills in the trap, or sends at once: it is told it was sent, and nothing is)
      if (this.trap || Date.now() - this.started < 1500) return this.done()
      const payload = this.payload()
      if (this.inStudio) {
        this.studioNote = this.whereTo() ? this.say('studioTo', '', this.whereTo()) : this.say('studioNowhere')
        return this.done(true)
      }
      if (this.captcha !== 'none' && this.captchaKey && !this.token) {
        this.state = 'failed'
        this.failure = this.say('robot')
        return
      }
      if (!this.source && !this.action) {
        if (this.email) return this.mail()
        this.state = 'failed'
        this.failure = this.say('nowhere')
        return
      }
      this.state = 'sending'
      this.failure = ''
      let answer
      try {
        if (this.source && this.vpData?.send) answer = await this.vpData.send(this.source, this.path || '/', payload, { method: this.method })
        else {
          const response = await fetch(this.action, { method: this.method, body: payload instanceof FormData ? payload : JSON.stringify(payload), headers: payload instanceof FormData ? { Accept: 'application/json' } : { Accept: 'application/json', 'Content-Type': 'application/json' } })
          const data = await response.json().catch(() => null)
          answer = { ok: response.ok, data, error: response.ok ? '' : data?.message || '' }
        }
      } catch (e) {
        answer = { ok: false, data: null, error: '' }
      }
      if (answer.ok) return this.done()
      // (a backend that says what is wrong with which field: { errors: { email: '…' } })
      const said = answer.data?.errors
      if (said && typeof said === 'object' && !Array.isArray(said)) this.errors = Object.fromEntries(Object.entries(said).map(([key, value]) => [key, Array.isArray(value) ? value[0] : String(value)]))
      this.state = 'failed'
      this.failure = answer.error && answer.error.length < 160 ? answer.error : ''
      this.resetCaptcha()
      this.$emit('failed', answer)
    },
    whereTo() {
      return this.source ? \`\${this.source} \${this.path || '/'}\` : this.action || (this.email ? this.say('mailTo', '', this.email) : '')
    },
    // What is sent: the fields that are shown, by name, the CAPTCHA's answer, and files as form data
    payload() {
      const shown = this.list.filter(field => field.kind !== 'step' && this.shown(field))
      const hasFiles = shown.some(field => field.kind === 'file' && this.files[field.key])
      const token = this.captcha !== 'none' && this.token ? { [CAPTCHAS[this.captcha].field]: this.token } : {}
      if (hasFiles || this.format === 'form' || (this.format !== 'json' && !this.source)) {
        const data = new FormData()
        for (const field of shown) {
          if (field.kind === 'file') { if (this.files[field.key]) data.append(field.key, this.files[field.key]) }
          else if (Array.isArray(this.values[field.key])) for (const one of this.values[field.key]) data.append(field.key, one)
          else data.append(field.key, String(this.values[field.key] ?? ''))
        }
        for (const [key, value] of Object.entries(token)) data.append(key, value)
        return data
      }
      return { ...Object.fromEntries(shown.filter(field => field.kind !== 'file').map(field => [field.key, this.values[field.key]])), ...token }
    },
    mail() {
      const lines = this.list.filter(field => field.kind !== 'step' && field.kind !== 'file' && this.shown(field)).map(field => {
        const value = this.values[field.key]
        return (field.label || field.key) + ': ' + (Array.isArray(value) ? value.join(', ') : value === true ? this.say('yes') : value === false ? this.say('no') : value)
      })
      window.location.href = 'mailto:' + this.email + '?subject=' + encodeURIComponent(document.title || this.say('subject')) + '&body=' + encodeURIComponent(lines.join('\\n'))
      this.done()
    },
    again() {
      this.state = 'ready'
      this.studioNote = ''
      this.page = 0
    },
    done(simulated = false) {
      this.state = 'sent'
      this.$emit('sent', { simulated })
      this.$nextTick(() => this.$el?.querySelector?.('.vp-form__thanks')?.focus())
      if (this.redirect && !simulated && !this.inStudio) {
        if (this.$router && this.redirect.startsWith('/')) this.$router.push(this.redirect)
        else window.location.href = this.redirect
      }
    },
    async showCaptcha() {
      const kind = CAPTCHAS[this.captcha]
      const place = this.$refs.captcha
      if (!kind || !this.captchaKey || this.inStudio || !place || this.widget !== null) return
      try {
        await load(kind.script)
        const api = await new Promise((resolve, reject) => {
          let tries = 0
          const look = () => window[kind.global]?.render ? resolve(window[kind.global]) : ++tries > 100 ? reject(new Error('no captcha')) : setTimeout(look, 50)
          look()
        })
        if (this.$refs.captcha !== place) return
        this.widget = api.render(place, { sitekey: this.captchaKey, callback: token => { this.token = token }, 'expired-callback': () => { this.token = '' } })
      } catch (e) {
        this.failure = this.say('noCaptcha')
      }
    },
    resetCaptcha() {
      const api = window[CAPTCHAS[this.captcha]?.global]
      if (api?.reset && this.widget !== null) { try { api.reset(this.widget) } catch (e) { /* gone */ } }
      this.token = ''
    }
  }
}
<\/script>
<style>
.vp-form {
  --_color: var(--vp-form-color, var(--vp-primary, #2563eb));
  --_radius: var(--vp-form-radius, var(--vp-radius, 8px));
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  width: 100%;
  max-width: 36rem;
  min-width: 0;
  text-align: left;
}
.vp-form__fields { display: flex; flex-wrap: wrap; gap: 1rem; }
.vp-form__field { display: flex; flex-direction: column; gap: 0.35rem; flex: 1 1 100%; min-width: 0; }
.vp-form__field--half { flex: 1 1 calc(50% - 0.5rem); }
@media (max-width: 520px) { .vp-form__field--half { flex-basis: 100%; } }
.vp-form__field--hidden { display: none; }
.vp-form__label { font-size: 0.9375rem; font-weight: 550; line-height: 1.4; }
.vp-form__must { color: var(--_color); }
.vp-form__input {
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 0.7rem 0.85rem;
  border: 1px solid var(--vp-border, rgba(127, 127, 127, 0.4));
  border-radius: var(--_radius);
  background: var(--vp-input, transparent);
  color: inherit;
  font: inherit;
  line-height: 1.4;
  transition: border-color 120ms ease, box-shadow 120ms ease;
}
.vp-form__input:focus { outline: none; border-color: var(--_color); box-shadow: 0 0 0 3px color-mix(in srgb, var(--_color) 22%, transparent); }
.vp-form__select {
  appearance: none;
  padding-right: 2.4rem;
  background-image: linear-gradient(45deg, transparent 50%, currentColor 50%), linear-gradient(135deg, currentColor 50%, transparent 50%);
  background-position: calc(100% - 1.15rem) 55%, calc(100% - 0.8rem) 55%;
  background-size: 0.35rem 0.35rem;
  background-repeat: no-repeat;
}
.vp-form__field--wrong .vp-form__input,
.vp-form__field--wrong .vp-form__file { border-color: #d0453b; }
.vp-form__field--wrong .vp-form__input:focus { box-shadow: 0 0 0 3px rgba(208, 69, 59, 0.2); }
.vp-form__help { font-size: 0.8125rem; line-height: 1.4; opacity: 0.7; }
.vp-form__error { font-size: 0.8125rem; line-height: 1.4; color: #c0362c; }
.vp-form__tick, .vp-form__choice { display: flex; align-items: flex-start; gap: 0.6rem; cursor: pointer; line-height: 1.45; }
.vp-form__choices { display: flex; flex-wrap: wrap; gap: 0.5rem 1.25rem; padding-top: 0.15rem; }
.vp-form__check { flex: none; width: 1.1rem; height: 1.1rem; margin: 0.15rem 0 0; accent-color: var(--_color); }
.vp-form__file {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 1rem;
  border: 1.5px dashed var(--vp-border, rgba(127, 127, 127, 0.45));
  border-radius: var(--_radius);
  cursor: pointer;
  transition: border-color 120ms ease, background 120ms ease;
}
.vp-form__file:hover, .vp-form__file:focus-within { border-color: var(--_color); background: color-mix(in srgb, var(--_color) 6%, transparent); }
.vp-form__file--chosen { border-style: solid; }
.vp-form__file svg { flex: none; width: 1.2rem; height: 1.2rem; fill: none; stroke: var(--_color); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.vp-form__file-input { position: absolute; width: 1px; height: 1px; opacity: 0; }
.vp-form__trap { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
.vp-form__captcha-shown {
  display: inline-flex;
  padding: 0.85rem 1rem;
  border: 1px solid var(--vp-border, rgba(127, 127, 127, 0.4));
  border-radius: var(--_radius);
  font-size: 0.875rem;
  opacity: 0.75;
}
.vp-form__progress { display: flex; gap: 0.5rem; }
.vp-form__dot { display: flex; align-items: center; gap: 0.45rem; flex: 1; min-width: 0; padding-top: 0.6rem; border-top: 3px solid var(--vp-border, rgba(127, 127, 127, 0.3)); font-size: 0.8125rem; opacity: 0.6; }
.vp-form__dot b { font-weight: 700; }
.vp-form__dot small { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: inherit; }
.vp-form__dot--done, .vp-form__dot--now { border-color: var(--_color); opacity: 1; }
.vp-form__buttons { display: flex; gap: 0.6rem; align-items: center; }
.vp-form__button, .vp-form__back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.25rem 0 0;
  padding: 0.75em 1.5em;
  border: 0;
  border-radius: var(--_radius);
  background: var(--_color);
  color: var(--vp-primary-contrast, #fff);
  font: inherit;
  font-weight: 600;
  line-height: 1.2;
  cursor: pointer;
  transition: filter 120ms ease, transform 120ms ease;
}
.vp-form__back { background: transparent; color: inherit; box-shadow: inset 0 0 0 1px var(--vp-border, rgba(127, 127, 127, 0.4)); }
.vp-form__button:hover { filter: brightness(1.08); }
.vp-form__button:active { transform: translateY(1px); }
.vp-form__button:disabled { opacity: 0.7; cursor: default; }
.vp-form__button:focus-visible, .vp-form__back:focus-visible { outline: 2px solid var(--_color); outline-offset: 2px; }
.vp-form__spinner { width: 0.95em; height: 0.95em; border: 2px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: vp-form-spin 0.7s linear infinite; }
@keyframes vp-form-spin { to { transform: rotate(360deg); } }
.vp-form__thanks {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1.25rem;
  border-radius: var(--_radius);
  background: color-mix(in srgb, var(--_color) 10%, transparent);
  line-height: 1.6;
  white-space: pre-line;
  outline: none;
  animation: vp-form-in 0.35s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.vp-form__thanks svg { flex: none; width: 1.4rem; height: 1.4rem; margin-top: 0.1rem; fill: none; stroke: var(--_color); stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
@keyframes vp-form-in { from { opacity: 0; transform: translateY(6px); } }
.vp-form__problem { margin: 0; color: #c0362c; font-size: 0.9375rem; }
.vp-form__note { display: block; margin-top: 0.4rem; font-size: 0.875rem; opacity: 0.75; }
.vp-form__again { padding: 0; border: 0; background: none; color: var(--_color); font: inherit; font-weight: 600; text-decoration: underline; cursor: pointer; }
@media (prefers-reduced-motion: reduce) { .vp-form__thanks, .vp-form__spinner { animation: none; } }
</style>
`;export{e as default};