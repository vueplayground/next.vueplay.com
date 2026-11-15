var e=`<template>
  <div class="vp-sign-in" :class="'vp-sign-in--' + look" :style="style">
    <!-- signed in already -->
    <div v-if="signedInNow && whenSignedIn !== 'form'" class="vp-sign-in__done">
      <span class="vp-sign-in__face" aria-hidden="true">
        <img v-if="person.avatar" :src="person.avatar" alt="">
        <template v-else>{{ initials }}</template>
      </span>
      <div>
        <b>{{ say('signedIn', signedInText, person.name || person.email) }}</b>
        <button type="button" class="vp-sign-in__link" @click="out">{{ say('signOut', signOutText) }}</button>
      </div>
    </div>

    <form v-else class="vp-sign-in__form" novalidate :aria-labelledby="'vp-sign-in-' + uid + '-title'" @submit.prevent="go">
      <h2 :id="'vp-sign-in-' + uid + '-title'" class="vp-sign-in__title">{{ heading }}</h2>
      <p v-if="said" class="vp-sign-in__said" role="status" aria-live="polite">{{ said }}</p>

      <template v-if="!said || mode !== 'forgot'">
        <div v-for="one in shownFields" :key="one.key" class="vp-sign-in__field">
          <label class="vp-sign-in__label" :for="'vp-sign-in-' + uid + '-' + one.key">{{ one.label }}</label>
          <span class="vp-sign-in__box">
            <input
              :id="'vp-sign-in-' + uid + '-' + one.key"
              v-model="values[one.key]"
              class="vp-sign-in__input"
              :type="one.key === 'password' && showPassword ? 'text' : one.type"
              :name="one.key"
              :autocomplete="one.autocomplete"
              :inputmode="one.inputmode"
              :autocapitalize="one.key === 'name' ? 'words' : 'off'"
              :spellcheck="false"
              :required="one.required"
              :aria-invalid="wrong[one.key] ? 'true' : 'false'"
              :aria-describedby="wrong[one.key] ? 'vp-sign-in-' + uid + '-' + one.key + '-wrong' : undefined"
              @input="wrong = { ...wrong, [one.key]: '' }"
            >
            <button v-if="one.key === 'password'" type="button" class="vp-sign-in__eye" :aria-label="showPassword ? say('hide') : say('show')" :title="showPassword ? say('hide') : say('show')" :aria-pressed="showPassword ? 'true' : 'false'" @click="showPassword = !showPassword">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /><path v-if="showPassword" d="M3 3l18 18" /></svg>
            </button>
          </span>
          <small v-if="wrong[one.key]" :id="'vp-sign-in-' + uid + '-' + one.key + '-wrong'" class="vp-sign-in__wrong" aria-live="polite">{{ wrong[one.key] }}</small>
        </div>

        <div v-if="mode === 'sign-in' && forgotLink" class="vp-sign-in__row">
          <button type="button" class="vp-sign-in__link" @click="switchTo('forgot')">{{ say('forgotTitle', forgotText) }}</button>
        </div>
        <label v-if="mode === 'register' && terms" class="vp-sign-in__terms">
          <input v-model="agreed" type="checkbox" name="terms">
          <span>{{ terms }} <a v-if="termsLink" :href="termsLink" target="_blank" rel="noopener">{{ say('terms', termsLinkText) }}</a></span>
        </label>

        <p v-if="problem" class="vp-sign-in__problem" role="alert">{{ problem }}</p>
        <button class="vp-sign-in__button" type="submit" :disabled="busy" :aria-busy="busy ? 'true' : 'false'">
          <span v-if="busy" class="vp-sign-in__spinner" aria-hidden="true" />
          {{ buttonText }}
        </button>
      </template>

      <p class="vp-sign-in__switch">
        <template v-if="mode === 'sign-in' && allowRegister">{{ say('noAccount', noAccountText) }} <button type="button" class="vp-sign-in__link" @click="switchTo('register')">{{ say('registerTitle', registerTitle) }}</button></template>
        <template v-else-if="mode !== 'sign-in'"><button type="button" class="vp-sign-in__link" @click="switchTo('sign-in')">{{ say('back', backToSignIn) }}</button></template>
      </p>
      <p v-if="inStudio" class="vp-sign-in__note">{{ say('studioNote') }} {{ hasSource ? '' : say('studioSource') }}</p>
    </form>
  </div>
</template>
<script>
// Signing in, making an account and a forgotten password in one: the visitor switches between them. It uses the
// source in Data that visitors sign in with (Supabase, Firebase or your own API): nothing is kept here. Signed in,
// it says so with a way to sign out (or goes to a page, or is not shown). In the Studio nothing is sent.
let made = 0

// The words it says itself, in the site's language (App.vue's head says it: \`htmlAttrs: { lang }\`). A text
// that is filled in in the Props tab is said as it is written.
const WORDS = {
  en: {
    signInTitle: 'Welcome back', registerTitle: 'Make an account', forgotTitle: 'Forgot your password?',
    signInButton: 'Sign in', registerButton: 'Make my account', forgotButton: 'Send me a link',
    noAccount: 'No account yet?', back: 'Back to sign in', email: 'E-mail', password: 'Password', name: 'Name', terms: 'terms',
    signedIn: 'Signed in as {name}', signOut: 'Sign out',
    sent: 'If there is an account for that address, a link to choose a new password is on its way.',
    confirm: 'Almost there: open the e-mail we sent to confirm your address.',
    show: 'Show the password', hide: 'Hide the password',
    required: 'Please fill this in', badEmail: 'This does not look like an e-mail address', short: 'At least 8 letters, numbers or signs',
    agree: 'Please agree first', wrongPassword: 'The e-mail or the password is not right.', failed: 'It did not work. Please try again.',
    noSource: 'This site has no source to sign in with yet.',
    studio: 'In the editor nobody signs in: on the site this signs the visitor in.',
    studioNote: 'In the editor nothing is sent.',
    studioSource: 'Switch on "Visitors sign in with this source" for a source in Data.'
  },
  nb: {
    signInTitle: 'Velkommen tilbake', registerTitle: 'Lag en konto', forgotTitle: 'Glemt passordet?',
    signInButton: 'Logg inn', registerButton: 'Lag kontoen min', forgotButton: 'Send meg en lenke',
    noAccount: 'Ingen konto ennå?', back: 'Tilbake til innlogging', email: 'E-post', password: 'Passord', name: 'Navn', terms: 'vilkårene',
    signedIn: 'Logget inn som {name}', signOut: 'Logg ut',
    sent: 'Finnes det en konto for den adressen, er en lenke for å velge nytt passord på vei.',
    confirm: 'Nesten ferdig: åpne e-posten vi sendte for å bekrefte adressen din.',
    show: 'Vis passordet', hide: 'Skjul passordet',
    required: 'Fyll ut dette', badEmail: 'Dette ser ikke ut som en e-postadresse', short: 'Minst 8 bokstaver, tall eller tegn',
    agree: 'Du må godta først', wrongPassword: 'E-posten eller passordet er feil.', failed: 'Det gikk ikke. Prøv igjen.',
    noSource: 'Dette nettstedet har ingen kilde å logge inn med ennå.',
    studio: 'I editoren logger ingen inn: på nettstedet logger dette inn den besøkende.',
    studioNote: 'I editoren sendes ingenting.',
    studioSource: 'Slå på «Besøkende logger inn med denne kilden» for en kilde i Data.'
  },
  sv: {
    signInTitle: 'Välkommen tillbaka', registerTitle: 'Skapa ett konto', forgotTitle: 'Glömt lösenordet?',
    signInButton: 'Logga in', registerButton: 'Skapa mitt konto', forgotButton: 'Skicka en länk',
    noAccount: 'Inget konto än?', back: 'Tillbaka till inloggning', email: 'E-post', password: 'Lösenord', name: 'Namn', terms: 'villkoren',
    signedIn: 'Inloggad som {name}', signOut: 'Logga ut',
    sent: 'Om det finns ett konto för den adressen är en länk för att välja nytt lösenord på väg.',
    confirm: 'Nästan klart: öppna mejlet vi skickade för att bekräfta din adress.',
    show: 'Visa lösenordet', hide: 'Dölj lösenordet',
    required: 'Fyll i det här', badEmail: 'Det här ser inte ut som en e-postadress', short: 'Minst 8 bokstäver, siffror eller tecken',
    agree: 'Godkänn först', wrongPassword: 'E-postadressen eller lösenordet stämmer inte.', failed: 'Det gick inte. Försök igen.',
    noSource: 'Den här webbplatsen har ingen källa att logga in med än.',
    studio: 'I redigeraren loggar ingen in: på webbplatsen loggar detta in besökaren.',
    studioNote: 'I redigeraren skickas ingenting.',
    studioSource: 'Slå på ”Besökare loggar in med den här källan” för en källa i Data.'
  },
  da: {
    signInTitle: 'Velkommen tilbage', registerTitle: 'Opret en konto', forgotTitle: 'Glemt din adgangskode?',
    signInButton: 'Log ind', registerButton: 'Opret min konto', forgotButton: 'Send mig et link',
    noAccount: 'Ingen konto endnu?', back: 'Tilbage til log ind', email: 'E-mail', password: 'Adgangskode', name: 'Navn', terms: 'betingelserne',
    signedIn: 'Logget ind som {name}', signOut: 'Log ud',
    sent: 'Hvis der findes en konto for den adresse, er et link til at vælge en ny adgangskode på vej.',
    confirm: 'Næsten færdig: åbn den e-mail, vi sendte, for at bekræfte din adresse.',
    show: 'Vis adgangskoden', hide: 'Skjul adgangskoden',
    required: 'Udfyld venligst dette', badEmail: 'Det ligner ikke en e-mailadresse', short: 'Mindst 8 bogstaver, tal eller tegn',
    agree: 'Du skal acceptere først', wrongPassword: 'E-mailen eller adgangskoden er forkert.', failed: 'Det lykkedes ikke. Prøv igen.',
    noSource: 'Dette websted har endnu ingen kilde at logge ind med.',
    studio: 'I editoren logger ingen ind: på webstedet logger dette den besøgende ind.',
    studioNote: 'I editoren sendes intet.',
    studioSource: 'Slå »Besøgende logger ind med denne kilde« til for en kilde i Data.'
  },
  fi: {
    signInTitle: 'Tervetuloa takaisin', registerTitle: 'Luo tili', forgotTitle: 'Unohditko salasanasi?',
    signInButton: 'Kirjaudu sisään', registerButton: 'Luo tilini', forgotButton: 'Lähetä minulle linkki',
    noAccount: 'Eikö sinulla ole vielä tiliä?', back: 'Takaisin kirjautumiseen', email: 'Sähköposti', password: 'Salasana', name: 'Nimi', terms: 'ehdot',
    signedIn: 'Kirjautuneena: {name}', signOut: 'Kirjaudu ulos',
    sent: 'Jos osoitteelle on tili, linkki uuden salasanan valitsemiseen on matkalla.',
    confirm: 'Melkein valmista: vahvista osoitteesi avaamalla lähettämämme sähköposti.',
    show: 'Näytä salasana', hide: 'Piilota salasana',
    required: 'Täytä tämä kenttä', badEmail: 'Tämä ei näytä sähköpostiosoitteelta', short: 'Vähintään 8 kirjainta, numeroa tai merkkiä',
    agree: 'Hyväksy ensin', wrongPassword: 'Sähköposti tai salasana on väärin.', failed: 'Se ei onnistunut. Yritä uudelleen.',
    noSource: 'Tällä sivustolla ei ole vielä lähdettä kirjautumiseen.',
    studio: 'Editorissa kukaan ei kirjaudu: sivustolla tämä kirjaa vierailijan sisään.',
    studioNote: 'Editorissa mitään ei lähetetä.',
    studioSource: 'Ota käyttöön ”Vierailijat kirjautuvat tällä lähteellä” jollekin Data-lähteelle.'
  },
  de: {
    signInTitle: 'Willkommen zurück', registerTitle: 'Konto erstellen', forgotTitle: 'Passwort vergessen?',
    signInButton: 'Anmelden', registerButton: 'Mein Konto erstellen', forgotButton: 'Link senden',
    noAccount: 'Noch kein Konto?', back: 'Zurück zur Anmeldung', email: 'E-Mail', password: 'Passwort', name: 'Name', terms: 'Bedingungen',
    signedIn: 'Angemeldet als {name}', signOut: 'Abmelden',
    sent: 'Wenn es für diese Adresse ein Konto gibt, ist ein Link zum Festlegen eines neuen Passworts unterwegs.',
    confirm: 'Fast geschafft: Öffne die E-Mail, die wir gesendet haben, um deine Adresse zu bestätigen.',
    show: 'Passwort anzeigen', hide: 'Passwort verbergen',
    required: 'Bitte ausfüllen', badEmail: 'Das sieht nicht wie eine E-Mail-Adresse aus', short: 'Mindestens 8 Buchstaben, Ziffern oder Zeichen',
    agree: 'Bitte zuerst zustimmen', wrongPassword: 'E-Mail oder Passwort ist falsch.', failed: 'Das hat nicht geklappt. Bitte versuche es erneut.',
    noSource: 'Diese Website hat noch keine Quelle für die Anmeldung.',
    studio: 'Im Editor meldet sich niemand an: Auf der Website meldet dies den Besucher an.',
    studioNote: 'Im Editor wird nichts gesendet.',
    studioSource: 'Schalte „Besucher melden sich mit dieser Quelle an“ für eine Quelle unter Daten ein.'
  },
  fr: {
    signInTitle: 'Bon retour', registerTitle: 'Créer un compte', forgotTitle: 'Mot de passe oublié ?',
    signInButton: 'Se connecter', registerButton: 'Créer mon compte', forgotButton: 'Envoyez-moi un lien',
    noAccount: 'Pas encore de compte ?', back: 'Retour à la connexion', email: 'E-mail', password: 'Mot de passe', name: 'Nom', terms: 'conditions',
    signedIn: 'Connecté en tant que {name}', signOut: 'Se déconnecter',
    sent: 'Si un compte existe pour cette adresse, un lien pour choisir un nouveau mot de passe est en route.',
    confirm: 'Presque fini : ouvrez l’e-mail que nous avons envoyé pour confirmer votre adresse.',
    show: 'Afficher le mot de passe', hide: 'Masquer le mot de passe',
    required: 'Veuillez remplir ce champ', badEmail: 'Cela ne ressemble pas à une adresse e-mail', short: 'Au moins 8 lettres, chiffres ou signes',
    agree: 'Veuillez d’abord accepter', wrongPassword: 'L’e-mail ou le mot de passe est incorrect.', failed: 'Cela n’a pas marché. Veuillez réessayer.',
    noSource: 'Ce site n’a pas encore de source pour se connecter.',
    studio: 'Dans l’éditeur, personne ne se connecte : sur le site, ceci connecte le visiteur.',
    studioNote: 'Dans l’éditeur, rien n’est envoyé.',
    studioSource: 'Activez « Les visiteurs se connectent avec cette source » pour une source dans Données.'
  },
  es: {
    signInTitle: 'Te damos la bienvenida', registerTitle: 'Crear una cuenta', forgotTitle: '¿Olvidaste tu contraseña?',
    signInButton: 'Iniciar sesión', registerButton: 'Crear mi cuenta', forgotButton: 'Envíame un enlace',
    noAccount: '¿Aún no tienes cuenta?', back: 'Volver a iniciar sesión', email: 'Correo electrónico', password: 'Contraseña', name: 'Nombre', terms: 'condiciones',
    signedIn: 'Sesión iniciada como {name}', signOut: 'Cerrar sesión',
    sent: 'Si hay una cuenta con esa dirección, va de camino un enlace para elegir una nueva contraseña.',
    confirm: 'Casi listo: abre el correo que te enviamos para confirmar tu dirección.',
    show: 'Mostrar la contraseña', hide: 'Ocultar la contraseña',
    required: 'Rellena este campo', badEmail: 'Esto no parece una dirección de correo', short: 'Al menos 8 letras, números o signos',
    agree: 'Acepta primero', wrongPassword: 'El correo o la contraseña no son correctos.', failed: 'No ha funcionado. Inténtalo de nuevo.',
    noSource: 'Este sitio aún no tiene una fuente para iniciar sesión.',
    studio: 'En el editor nadie inicia sesión: en el sitio, esto inicia la sesión del visitante.',
    studioNote: 'En el editor no se envía nada.',
    studioSource: 'Activa «Los visitantes inician sesión con esta fuente» en una fuente de Datos.'
  },
  it: {
    signInTitle: 'Bentornato', registerTitle: 'Crea un account', forgotTitle: 'Password dimenticata?',
    signInButton: 'Accedi', registerButton: 'Crea il mio account', forgotButton: 'Inviami un link',
    noAccount: 'Non hai ancora un account?', back: 'Torna all’accesso', email: 'E-mail', password: 'Password', name: 'Nome', terms: 'condizioni',
    signedIn: 'Accesso effettuato come {name}', signOut: 'Esci',
    sent: 'Se esiste un account per questo indirizzo, è in arrivo un link per scegliere una nuova password.',
    confirm: 'Ci siamo quasi: apri l’e-mail che ti abbiamo inviato per confermare il tuo indirizzo.',
    show: 'Mostra la password', hide: 'Nascondi la password',
    required: 'Compila questo campo', badEmail: 'Non sembra un indirizzo e-mail', short: 'Almeno 8 lettere, numeri o simboli',
    agree: 'Accetta prima', wrongPassword: 'L’e-mail o la password non sono corrette.', failed: 'Non ha funzionato. Riprova.',
    noSource: 'Questo sito non ha ancora una fonte per l’accesso.',
    studio: 'Nell’editor nessuno accede: sul sito questo fa accedere il visitatore.',
    studioNote: 'Nell’editor non viene inviato nulla.',
    studioSource: 'Attiva «I visitatori accedono con questa fonte» per una fonte in Dati.'
  },
  nl: {
    signInTitle: 'Welkom terug', registerTitle: 'Account aanmaken', forgotTitle: 'Wachtwoord vergeten?',
    signInButton: 'Inloggen', registerButton: 'Mijn account aanmaken', forgotButton: 'Stuur me een link',
    noAccount: 'Nog geen account?', back: 'Terug naar inloggen', email: 'E-mail', password: 'Wachtwoord', name: 'Naam', terms: 'voorwaarden',
    signedIn: 'Ingelogd als {name}', signOut: 'Uitloggen',
    sent: 'Als er een account is voor dat adres, is er een link onderweg om een nieuw wachtwoord te kiezen.',
    confirm: 'Bijna klaar: open de e-mail die we stuurden om je adres te bevestigen.',
    show: 'Wachtwoord tonen', hide: 'Wachtwoord verbergen',
    required: 'Vul dit in', badEmail: 'Dit lijkt geen e-mailadres', short: 'Minstens 8 letters, cijfers of tekens',
    agree: 'Ga eerst akkoord', wrongPassword: 'Het e-mailadres of het wachtwoord klopt niet.', failed: 'Dat lukte niet. Probeer het opnieuw.',
    noSource: 'Deze site heeft nog geen bron om mee in te loggen.',
    studio: 'In de editor logt niemand in: op de site logt dit de bezoeker in.',
    studioNote: 'In de editor wordt niets verstuurd.',
    studioSource: 'Zet „Bezoekers loggen in met deze bron” aan voor een bron in Data.'
  },
  pt: {
    signInTitle: 'Bem-vindo de volta', registerTitle: 'Criar uma conta', forgotTitle: 'Esqueceu a senha?',
    signInButton: 'Entrar', registerButton: 'Criar a minha conta', forgotButton: 'Enviar-me um link',
    noAccount: 'Ainda não tem conta?', back: 'Voltar ao início de sessão', email: 'E-mail', password: 'Senha', name: 'Nome', terms: 'termos',
    signedIn: 'Sessão iniciada como {name}', signOut: 'Sair',
    sent: 'Se existir uma conta para esse endereço, um link para escolher uma nova senha está a caminho.',
    confirm: 'Quase lá: abra o e-mail que enviámos para confirmar o seu endereço.',
    show: 'Mostrar a senha', hide: 'Ocultar a senha',
    required: 'Preencha este campo', badEmail: 'Isto não parece um endereço de e-mail', short: 'Pelo menos 8 letras, números ou sinais',
    agree: 'Aceite primeiro', wrongPassword: 'O e-mail ou a senha não estão corretos.', failed: 'Não funcionou. Tente novamente.',
    noSource: 'Este site ainda não tem uma fonte para iniciar sessão.',
    studio: 'No editor ninguém inicia sessão: no site, isto inicia a sessão do visitante.',
    studioNote: 'No editor nada é enviado.',
    studioSource: 'Ative «Os visitantes entram com esta fonte» numa fonte em Dados.'
  },
  pl: {
    signInTitle: 'Witaj ponownie', registerTitle: 'Załóż konto', forgotTitle: 'Nie pamiętasz hasła?',
    signInButton: 'Zaloguj się', registerButton: 'Załóż moje konto', forgotButton: 'Wyślij mi link',
    noAccount: 'Nie masz jeszcze konta?', back: 'Wróć do logowania', email: 'E-mail', password: 'Hasło', name: 'Imię i nazwisko', terms: 'warunki',
    signedIn: 'Zalogowano jako {name}', signOut: 'Wyloguj się',
    sent: 'Jeśli istnieje konto dla tego adresu, link do ustawienia nowego hasła jest już w drodze.',
    confirm: 'Prawie gotowe: otwórz wysłany przez nas e-mail, aby potwierdzić adres.',
    show: 'Pokaż hasło', hide: 'Ukryj hasło',
    required: 'Wypełnij to pole', badEmail: 'To nie wygląda na adres e-mail', short: 'Co najmniej 8 liter, cyfr lub znaków',
    agree: 'Najpierw wyraź zgodę', wrongPassword: 'E-mail lub hasło są nieprawidłowe.', failed: 'Nie udało się. Spróbuj ponownie.',
    noSource: 'Ta strona nie ma jeszcze źródła do logowania.',
    studio: 'W edytorze nikt się nie loguje: na stronie to loguje odwiedzającego.',
    studioNote: 'W edytorze nic nie jest wysyłane.',
    studioSource: 'Włącz „Odwiedzający logują się tym źródłem” dla źródła w Danych.'
  },
  zh: {
    signInTitle: '欢迎回来', registerTitle: '创建账户', forgotTitle: '忘记密码？',
    signInButton: '登录', registerButton: '创建我的账户', forgotButton: '发送链接给我',
    noAccount: '还没有账户？', back: '返回登录', email: '电子邮箱', password: '密码', name: '姓名', terms: '条款',
    signedIn: '已登录：{name}', signOut: '退出登录',
    sent: '如果该地址有账户，设置新密码的链接已在发送途中。',
    confirm: '快好了：请打开我们发送的邮件以确认你的地址。',
    show: '显示密码', hide: '隐藏密码',
    required: '请填写此项', badEmail: '这看起来不像电子邮箱地址', short: '至少 8 个字母、数字或符号',
    agree: '请先同意', wrongPassword: '邮箱或密码不正确。', failed: '没有成功，请重试。',
    noSource: '此网站还没有可用于登录的数据源。',
    studio: '在编辑器中不会有人登录：在网站上，这里会让访客登录。',
    studioNote: '在编辑器中不会发送任何内容。',
    studioSource: '请在“数据”中为一个数据源打开“访客用此数据源登录”。'
  },
  ja: {
    signInTitle: 'おかえりなさい', registerTitle: 'アカウントを作成', forgotTitle: 'パスワードをお忘れですか？',
    signInButton: 'ログイン', registerButton: 'アカウントを作成する', forgotButton: 'リンクを送信',
    noAccount: 'アカウントをお持ちでないですか？', back: 'ログインに戻る', email: 'メールアドレス', password: 'パスワード', name: '名前', terms: '利用規約',
    signedIn: '{name} としてログイン中', signOut: 'ログアウト',
    sent: 'そのアドレスのアカウントがあれば、新しいパスワードを設定するリンクをお送りします。',
    confirm: 'あと少しです：お送りしたメールを開いてアドレスを確認してください。',
    show: 'パスワードを表示', hide: 'パスワードを隠す',
    required: '入力してください', badEmail: 'メールアドレスの形式ではありません', short: '8 文字以上の英字・数字・記号',
    agree: '先に同意してください', wrongPassword: 'メールアドレスまたはパスワードが正しくありません。', failed: 'うまくいきませんでした。もう一度お試しください。',
    noSource: 'このサイトにはまだログイン用のソースがありません。',
    studio: 'エディターでは誰もログインしません。サイトでは訪問者がログインします。',
    studioNote: 'エディターでは何も送信されません。',
    studioSource: 'データのソースで「訪問者はこのソースでログイン」をオンにしてください。'
  }
}

export default {
  inject: { vpData: { default: null } },
  props: {
    start: { type: String, default: 'sign-in', label: 'Shows first', control: 'select', options: [{ key: 'Sign in', value: 'sign-in' }, { key: 'Make an account', value: 'register' }] },
    allowRegister: { type: Boolean, default: true, label: 'Visitors can make an account' },
    nameField: { type: Boolean, default: true, label: 'Ask for a name when making one' },
    signInTitle: { type: String, default: '', label: 'Title: sign in', placeholder: 'Welcome back' },
    registerTitle: { type: String, default: '', label: 'Title: make an account', placeholder: 'Make an account' },
    forgotTitle: { type: String, default: '', label: 'Title: forgotten password', placeholder: 'Forgot your password?' },
    signInButton: { type: String, default: '', label: 'Button: sign in', placeholder: 'Sign in' },
    registerButton: { type: String, default: '', label: 'Button: make an account', placeholder: 'Make my account' },
    forgotButton: { type: String, default: '', label: 'Button: forgotten password', placeholder: 'Send me a link' },
    forgotLink: { type: Boolean, default: true, label: 'A link for a forgotten password' },
    forgotText: { type: String, default: '', label: 'Link to a forgotten password', placeholder: 'Forgot your password?' },
    noAccountText: { type: String, default: '', label: 'Before the link to make one', placeholder: 'No account yet?' },
    backToSignIn: { type: String, default: '', label: 'Link back to sign in', placeholder: 'Back to sign in' },
    emailLabel: { type: String, default: '', label: 'Label: e-mail', placeholder: 'E-mail' },
    passwordLabel: { type: String, default: '', label: 'Label: password', placeholder: 'Password' },
    nameLabel: { type: String, default: '', label: 'Label: name', placeholder: 'Name' },
    terms: { type: String, default: '', label: 'Agree to (when making an account)', placeholder: 'I agree to the' },
    termsLinkText: { type: String, default: '', label: 'Its link text', placeholder: 'terms' },
    termsLink: { type: String, default: '', label: 'Its link', placeholder: '/terms' },
    after: { type: String, default: '', label: 'Then go to', placeholder: '/account' },
    whenSignedIn: { type: String, default: 'say', label: 'When signed in already', control: 'select', options: [{ key: 'Say so, with Sign out', value: 'say' }, { key: 'Go to the page above', value: 'go' }, { key: 'Show the form all the same', value: 'form' }] },
    signedInText: { type: String, default: '', label: 'Said when signed in', placeholder: 'Signed in as {name}' },
    signOutText: { type: String, default: '', label: 'Sign out', placeholder: 'Sign out' },
    sentText: { type: String, default: '', label: 'Said when the link is sent', control: 'textarea', placeholder: 'If there is an account for that address, a link to choose a new password is on its way.' },
    confirmText: { type: String, default: '', label: 'Said when the address must be confirmed', control: 'textarea', placeholder: 'Almost there: open the e-mail we sent to confirm your address.' },
    look: { type: String, default: 'card', label: 'Look', control: 'select', options: [{ key: 'A card', value: 'card' }, { key: 'Plain', value: 'plain' }] },
    color: { type: String, default: '', label: 'Button color', control: 'color' },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 30 }
  },
  emits: ['signed-in', 'registered'],
  data() {
    return { mode: this.start === 'register' ? 'register' : 'sign-in', values: { email: '', password: '', name: '' }, wrong: {}, problem: '', said: '', busy: false, showPassword: false, agreed: false }
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
      return this.mode === 'register' ? this.say('registerTitle', this.registerTitle) : this.mode === 'forgot' ? this.say('forgotTitle', this.forgotTitle) : this.say('signInTitle', this.signInTitle)
    },
    buttonText() {
      return this.mode === 'register' ? this.say('registerButton', this.registerButton) : this.mode === 'forgot' ? this.say('forgotButton', this.forgotButton) : this.say('signInButton', this.signInButton)
    },
    shownFields() {
      const email = { key: 'email', label: this.say('email', this.emailLabel), type: 'email', autocomplete: this.mode === 'register' ? 'email' : 'username', inputmode: 'email', required: true }
      const password = { key: 'password', label: this.say('password', this.passwordLabel), type: 'password', autocomplete: this.mode === 'register' ? 'new-password' : 'current-password', required: true }
      if (this.mode === 'forgot') return [email]
      if (this.mode === 'register') return [...(this.nameField ? [{ key: 'name', label: this.say('name', this.nameLabel), type: 'text', autocomplete: 'name', required: true }] : []), email, password]
      return [email, password]
    }
  },
  watch: {
    start(value) { this.switchTo(value === 'register' ? 'register' : 'sign-in') },
    signedInNow: { immediate: true, handler(now) { if (now && this.whenSignedIn === 'go') this.leave() } }
  },
  methods: {
    say(key, own, n) {
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return String(own || (words[key] ?? WORDS.en[key])).replace(/\\{(n|name)\\}/g, n ?? '')
    },
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
        if (!value) wrong[one.key] = this.say('required')
        else if (one.key === 'email' && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)) wrong[one.key] = this.say('badEmail')
        else if (one.key === 'password' && this.mode === 'register' && value.length < 8) wrong[one.key] = this.say('short')
      }
      this.wrong = wrong
      if (this.mode === 'register' && this.terms && !this.agreed) { this.problem = this.say('agree'); return false }
      return !Object.keys(wrong).length
    },
    async go() {
      this.problem = ''
      if (this.busy || !this.check()) return
      if (this.inStudio) {
        this.said = this.mode === 'forgot' ? this.say('sent', this.sentText) : ''
        this.problem = this.mode === 'forgot' ? '' : this.say('studio')
        return
      }
      if (!this.vpData?.signIn) { this.problem = this.say('noSource'); return }
      this.busy = true
      const { email, password, name } = this.values
      let answer
      if (this.mode === 'forgot') answer = await this.vpData.forgot(email)
      else if (this.mode === 'register') answer = await this.vpData.register({ email, password, ...(this.nameField ? { name } : {}) })
      else answer = await this.vpData.signIn(email, password)
      this.busy = false
      if (!answer.ok) {
        this.problem = this.mode === 'sign-in' && [400, 401, 403].includes(answer.status) ? this.say('wrongPassword') : answer.error || this.say('failed')
        return
      }
      this.values.password = ''
      if (this.mode === 'forgot') { this.said = this.say('sent', this.sentText); return }
      if (this.mode === 'register' && answer.confirm) { this.said = this.say('confirm', this.confirmText); return }
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