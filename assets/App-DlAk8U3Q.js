var e=`<template>
  <div class="vp-chat-app" :class="{ 'vp-chat-app--menu': menuOpen, 'vp-chat-app--no-side': !showChats }" :style="style">
    <aside v-if="showChats" class="vp-chat-app__side" :aria-label="say('chats')">
      <div class="vp-chat-app__side-top">
        <button type="button" class="vp-chat-app__new" @click="newChat"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>{{ say('newChat') }}</button>
        <button type="button" class="vp-chat-app__icon vp-chat-app__close" :aria-label="say('closeMenu')" :title="say('closeMenu')" @click="menuOpen = false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg></button>
      </div>
      <input v-if="chats.length > 6" v-model="find" class="vp-chat-app__find" type="search" :placeholder="say('findChats')" :aria-label="say('findChats')">
      <nav class="vp-chat-app__chats">
        <p v-if="!chats.length" class="vp-chat-app__none">{{ say('noChats') }}</p>
        <div v-for="chat in shownChats" :key="chat.id" class="vp-chat-app__chat" :class="{ 'vp-chat-app__chat--on': chat.id === currentId }">
          <button type="button" class="vp-chat-app__chat-open" :aria-current="chat.id === currentId ? 'page' : null" @click="open(chat.id)">{{ chat.title || say('newChat') }}</button>
          <button type="button" class="vp-chat-app__icon vp-chat-app__chat-delete" :aria-label="say('deleteChat') + ': ' + (chat.title || say('newChat'))" :title="say('deleteChat')" @click="remove(chat.id)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14M10 7V5h4v2M7 7l1 12h8l1-12" /></svg></button>
        </div>
      </nav>
      <p v-if="remember" class="vp-chat-app__kept">{{ say('kept') }}</p>
      <nav v-if="links.length" class="vp-chat-app__links">
        <a v-for="(link, index) in links" :key="index" :href="link.href" class="vp-chat-app__link">{{ link.text }}</a>
      </nav>
    </aside>
    <div v-if="showChats && menuOpen" class="vp-chat-app__shade" @click="menuOpen = false" />

    <section class="vp-chat-app__main">
      <header class="vp-chat-app__top">
        <button v-if="showChats" type="button" class="vp-chat-app__icon vp-chat-app__menu" :aria-label="say('menu')" :title="say('menu')" @click="menuOpen = true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg></button>
        <strong class="vp-chat-app__name">{{ name || say('assistant') }}</strong>
        <select v-if="models.length > 1" v-model="picked" class="vp-chat-app__model" :aria-label="say('model')">
          <option v-for="(one, index) in models" :key="index" :value="one.value">{{ one.label || one.value }}</option>
        </select>
        <span class="vp-chat-app__space" />
        <button v-if="usesKey && key" type="button" class="vp-chat-app__icon" :aria-label="say('keyForget')" :title="say('keyForget')" @click="forgetKey"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="15" r="4" /><path d="M11 12l9-9M17 6l3 3" /></svg></button>
        <button type="button" class="vp-chat-app__icon" :aria-label="say('newChat')" :title="say('newChat')" @click="newChat"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16zM14 6l4 4" /></svg></button>
      </header>

      <div ref="list" class="vp-chat-app__list" @scroll="scrolled">
        <div class="vp-chat-app__column">
          <div v-if="!messages.length" class="vp-chat-app__welcome">
            <h2 class="vp-chat-app__hello">{{ say('welcome', welcome) }}</h2>
            <p v-if="intro" class="vp-chat-app__intro">{{ intro }}</p>
            <div v-if="ideas.length" class="vp-chat-app__ideas">
              <button v-for="(idea, index) in ideas" :key="index" type="button" class="vp-chat-app__idea" @click="ask(idea.text || idea.title)">
                <strong>{{ idea.title || idea.text }}</strong>
                <span v-if="idea.title && idea.text">{{ idea.text }}</span>
              </button>
            </div>
          </div>

          <div v-for="(message, index) in messages" :key="index" class="vp-chat-app__message" :class="'vp-chat-app__message--' + (message.role === 'user' ? 'me' : 'them')">
            <div v-if="message.role === 'user'" class="vp-chat-app__mine">{{ message.content }}</div>
            <div v-else class="vp-chat-app__answer" :class="{ 'vp-chat-app__answer--note': message.local }">
              <template v-for="(block, b) in parse(message.content)" :key="b">
                <component :is="'h' + block.level" v-if="block.type === 'heading'" class="vp-chat-app__h">
                  <template v-for="(run, r) in block.runs" :key="r"><a v-if="run.href" :href="run.href" target="_blank" rel="noopener noreferrer">{{ run.text }}</a><code v-else-if="run.code" class="vp-chat-app__tick">{{ run.text }}</code><span v-else :class="look(run)">{{ run.text }}</span></template>
                </component>
                <div v-else-if="block.type === 'code'" class="vp-chat-app__code">
                  <div class="vp-chat-app__code-top">
                    <span>{{ block.lang || say('code') }}</span>
                    <button type="button" class="vp-chat-app__code-copy" @click="copy(block.code, index + ':' + b)">{{ copied === index + ':' + b ? say('copied') : say('copy') }}</button>
                  </div>
                  <pre><code>{{ block.code }}</code></pre>
                </div>
                <ul v-else-if="block.type === 'list' && !block.ordered" class="vp-chat-app__ul">
                  <li v-for="(item, i) in block.items" :key="i" :style="{ marginLeft: item.depth * 1.25 + 'em' }"><template v-for="(run, r) in item.runs" :key="r"><a v-if="run.href" :href="run.href" target="_blank" rel="noopener noreferrer">{{ run.text }}</a><code v-else-if="run.code" class="vp-chat-app__tick">{{ run.text }}</code><span v-else :class="look(run)">{{ run.text }}</span></template></li>
                </ul>
                <ol v-else-if="block.type === 'list'" class="vp-chat-app__ol" :start="block.start">
                  <li v-for="(item, i) in block.items" :key="i" :style="{ marginLeft: item.depth * 1.25 + 'em' }"><template v-for="(run, r) in item.runs" :key="r"><a v-if="run.href" :href="run.href" target="_blank" rel="noopener noreferrer">{{ run.text }}</a><code v-else-if="run.code" class="vp-chat-app__tick">{{ run.text }}</code><span v-else :class="look(run)">{{ run.text }}</span></template></li>
                </ol>
                <blockquote v-else-if="block.type === 'quote'" class="vp-chat-app__quote"><template v-for="(run, r) in block.runs" :key="r"><a v-if="run.href" :href="run.href" target="_blank" rel="noopener noreferrer">{{ run.text }}</a><code v-else-if="run.code" class="vp-chat-app__tick">{{ run.text }}</code><span v-else :class="look(run)">{{ run.text }}</span></template></blockquote>
                <hr v-else-if="block.type === 'rule'" class="vp-chat-app__rule">
                <div v-else-if="block.type === 'table'" class="vp-chat-app__table-box">
                  <table class="vp-chat-app__table">
                    <thead><tr><th v-for="(cell, c) in block.head" :key="c"><template v-for="(run, r) in cell" :key="r"><code v-if="run.code" class="vp-chat-app__tick">{{ run.text }}</code><span v-else :class="look(run)">{{ run.text }}</span></template></th></tr></thead>
                    <tbody><tr v-for="(row, i) in block.rows" :key="i"><td v-for="(cell, c) in row" :key="c"><template v-for="(run, r) in cell" :key="r"><a v-if="run.href" :href="run.href" target="_blank" rel="noopener noreferrer">{{ run.text }}</a><code v-else-if="run.code" class="vp-chat-app__tick">{{ run.text }}</code><span v-else :class="look(run)">{{ run.text }}</span></template></td></tr></tbody>
                  </table>
                </div>
                <p v-else class="vp-chat-app__p"><template v-for="(run, r) in block.runs" :key="r"><a v-if="run.href" :href="run.href" target="_blank" rel="noopener noreferrer">{{ run.text }}</a><code v-else-if="run.code" class="vp-chat-app__tick">{{ run.text }}</code><span v-else :class="look(run)">{{ run.text }}</span></template></p>
              </template>
              <span v-if="busy && index === messages.length - 1 && message.content" class="vp-chat-app__caret" aria-hidden="true" />
            </div>
            <div v-if="!(busy && index === messages.length - 1)" class="vp-chat-app__tools">
              <button v-if="message.content" type="button" class="vp-chat-app__tool" @click="copy(message.content, String(index))">{{ copied === String(index) ? say('copied') : say('copy') }}</button>
              <button v-if="message.role === 'user' && index === lastMine" type="button" class="vp-chat-app__tool" @click="edit(index)">{{ say('edit') }}</button>
              <button v-if="message.role !== 'user' && index === messages.length - 1" type="button" class="vp-chat-app__tool" @click="again">{{ say('again') }}</button>
            </div>
          </div>
          <div v-if="busy && waitingFirst" class="vp-chat-app__message vp-chat-app__message--them">
            <div class="vp-chat-app__dots" role="status" :aria-label="say('thinking')"><span /><span /><span /></div>
          </div>
        </div>
      </div>

      <div class="vp-chat-app__bottom">
        <form v-if="usesKey && !key" class="vp-chat-app__key" @submit.prevent="saveKey">
          <strong>{{ say('keyTitle', '', providerName) }}</strong>
          <span>{{ say('keyHelp') }}</span>
          <div class="vp-chat-app__key-row">
            <input v-model="keyDraft" type="password" autocomplete="off" spellcheck="false" :placeholder="say('keyField', '', providerName)" :aria-label="say('keyField', '', providerName)">
            <button type="submit" :disabled="!keyDraft.trim()">{{ say('keySave') }}</button>
          </div>
        </form>
        <form v-else class="vp-chat-app__composer" @submit.prevent="busy ? stop() : ask(draft)">
          <textarea ref="input" v-model="draft" class="vp-chat-app__input" rows="1" name="message" enterkeyhint="send" :placeholder="say('placeholder', placeholder)" :aria-label="say('message')" @keydown.enter.exact="enter" />
          <button class="vp-chat-app__send" :class="{ 'vp-chat-app__send--stop': busy }" type="submit" :disabled="!busy && !draft.trim()" :aria-label="busy ? say('stop') : say('send')" :title="busy ? say('stop') : say('send')">
            <svg v-if="busy" viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="1.5" /></svg>
            <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
          </button>
        </form>
        <p v-if="note" class="vp-chat-app__note">{{ note }}</p>
      </div>
    </section>
  </div>
</template>
<script>
// A whole chat with an assistant, the way the big chat apps look: the chats down the side (kept on the visitor's
// device when asked), a welcome with ideas, answers written as they come with headings, lists, tables and code
// (with Copy), and Stop, Copy, Edit and Try again.
//
// It talks to one of three ("Talks to"):
// - Your own service: sent { messages, model } at "Ask at"; the answer is read from \`reply\`, \`message\`, \`content\`,
//   \`text\` or an OpenAI-style answer, as JSON, plain text, or a stream of events.
// - OpenAI or Anthropic: their own request and stream. At "Ask at" goes your own address that passes it on with
//   your key (a key in a page is a key anyone can read and spend). Or "Visitors use their own key": each visitor
//   gives theirs, it stays in their browser, and the chat calls OpenAI or Anthropic itself.
// The words it says itself are in the site's language (App.vue's head: \`htmlAttrs: { lang }\`). A text filled in in
// the Props tab is said as it is written.
const WORDS = {
  en: { newChat: 'New chat', chats: 'Chats', noChats: 'Your chats show up here.', findChats: 'Find a chat', deleteChat: 'Delete chat', kept: 'Chats are kept on this device only.', menu: 'Show chats', closeMenu: 'Hide chats', assistant: 'Assistant', model: 'Model', welcome: 'How can I help you today?', placeholder: 'Ask anything…', message: 'Message', send: 'Send', stop: 'Stop', copy: 'Copy', copied: 'Copied', edit: 'Edit', again: 'Try again', code: 'Code', thinking: 'Thinking', wrong: 'Something went wrong. Please try again in a moment.', noService: 'This is where the answer will be. Say in the settings what the chat talks to to make it real.', refused: 'I can not help with that one. Try asking another way.', noModel: 'Name the model to use in the chat\\'s settings.', badKey: 'The key was not accepted. Check it and give it again.', stopped: 'Stopped.', keyTitle: 'Your {name} key', keyHelp: 'The chat uses your own key. It stays in this browser and goes only to {name}.', keyField: '{name} API key', keySave: 'Use this key', keyForget: 'Forget my key' },
  nb: { newChat: 'Ny samtale', chats: 'Samtaler', noChats: 'Samtalene dine vises her.', findChats: 'Finn en samtale', deleteChat: 'Slett samtale', kept: 'Samtalene lagres bare på denne enheten.', menu: 'Vis samtaler', closeMenu: 'Skjul samtaler', assistant: 'Assistent', model: 'Modell', welcome: 'Hva kan jeg hjelpe deg med i dag?', placeholder: 'Spør om hva som helst…', message: 'Melding', send: 'Send', stop: 'Stopp', copy: 'Kopier', copied: 'Kopiert', edit: 'Rediger', again: 'Prøv igjen', code: 'Kode', thinking: 'Tenker', wrong: 'Noe gikk galt. Prøv igjen om litt.', noService: 'Her kommer svaret. Si i innstillingene hva chatten snakker med for å gjøre den ekte.', refused: 'Det kan jeg ikke hjelpe med. Prøv å spørre på en annen måte.', noModel: 'Skriv hvilken modell som skal brukes i chattens innstillinger.', badKey: 'Nøkkelen ble ikke godtatt. Sjekk den og gi den på nytt.', stopped: 'Stoppet.', keyTitle: 'Din {name}-nøkkel', keyHelp: 'Chatten bruker din egen nøkkel. Den blir i denne nettleseren og går bare til {name}.', keyField: '{name} API-nøkkel', keySave: 'Bruk denne nøkkelen', keyForget: 'Glem nøkkelen min' },
  sv: { newChat: 'Ny chatt', chats: 'Chattar', noChats: 'Dina chattar visas här.', findChats: 'Hitta en chatt', deleteChat: 'Radera chatt', kept: 'Chattar sparas bara på den här enheten.', menu: 'Visa chattar', closeMenu: 'Dölj chattar', assistant: 'Assistent', model: 'Modell', welcome: 'Hur kan jag hjälpa dig i dag?', placeholder: 'Fråga vad som helst…', message: 'Meddelande', send: 'Skicka', stop: 'Stoppa', copy: 'Kopiera', copied: 'Kopierat', edit: 'Redigera', again: 'Försök igen', code: 'Kod', thinking: 'Tänker', wrong: 'Något gick fel. Försök igen om en stund.', noService: 'Här kommer svaret. Ange i inställningarna vad chatten pratar med för att göra den på riktigt.', refused: 'Det kan jag inte hjälpa till med. Försök fråga på ett annat sätt.', noModel: 'Ange vilken modell som ska användas i chattens inställningar.', badKey: 'Nyckeln godtogs inte. Kontrollera den och ange den igen.', stopped: 'Stoppad.', keyTitle: 'Din {name}-nyckel', keyHelp: 'Chatten använder din egen nyckel. Den stannar i den här webbläsaren och går bara till {name}.', keyField: '{name} API-nyckel', keySave: 'Använd nyckeln', keyForget: 'Glöm min nyckel' },
  da: { newChat: 'Ny chat', chats: 'Chats', noChats: 'Dine chats vises her.', findChats: 'Find en chat', deleteChat: 'Slet chat', kept: 'Chats gemmes kun på denne enhed.', menu: 'Vis chats', closeMenu: 'Skjul chats', assistant: 'Assistent', model: 'Model', welcome: 'Hvad kan jeg hjælpe dig med i dag?', placeholder: 'Spørg om hvad som helst…', message: 'Besked', send: 'Send', stop: 'Stop', copy: 'Kopiér', copied: 'Kopieret', edit: 'Redigér', again: 'Prøv igen', code: 'Kode', thinking: 'Tænker', wrong: 'Noget gik galt. Prøv igen om lidt.', noService: 'Her kommer svaret. Angiv i indstillingerne, hvad chatten taler med, for at gøre den rigtig.', refused: 'Det kan jeg ikke hjælpe med. Prøv at spørge på en anden måde.', noModel: 'Angiv modellen i chattens indstillinger.', badKey: 'Nøglen blev ikke godkendt. Tjek den og angiv den igen.', stopped: 'Stoppet.', keyTitle: 'Din {name}-nøgle', keyHelp: 'Chatten bruger din egen nøgle. Den bliver i denne browser og går kun til {name}.', keyField: '{name} API-nøgle', keySave: 'Brug denne nøgle', keyForget: 'Glem min nøgle' },
  fi: { newChat: 'Uusi keskustelu', chats: 'Keskustelut', noChats: 'Keskustelusi näkyvät tässä.', findChats: 'Etsi keskustelu', deleteChat: 'Poista keskustelu', kept: 'Keskustelut tallennetaan vain tälle laitteelle.', menu: 'Näytä keskustelut', closeMenu: 'Piilota keskustelut', assistant: 'Avustaja', model: 'Malli', welcome: 'Miten voin auttaa tänään?', placeholder: 'Kysy mitä tahansa…', message: 'Viesti', send: 'Lähetä', stop: 'Pysäytä', copy: 'Kopioi', copied: 'Kopioitu', edit: 'Muokkaa', again: 'Yritä uudelleen', code: 'Koodi', thinking: 'Miettii', wrong: 'Jokin meni vikaan. Yritä hetken päästä uudelleen.', noService: 'Tähän tulee vastaus. Kerro asetuksissa, mihin chat on yhteydessä, niin se toimii oikeasti.', refused: 'En voi auttaa siinä. Kokeile kysyä toisin.', noModel: 'Kirjoita käytettävä malli chatin asetuksiin.', badKey: 'Avainta ei hyväksytty. Tarkista se ja anna uudelleen.', stopped: 'Pysäytetty.', keyTitle: 'Oma {name}-avaimesi', keyHelp: 'Chat käyttää omaa avaintasi. Se pysyy tässä selaimessa ja menee vain palveluun {name}.', keyField: '{name} API-avain', keySave: 'Käytä tätä avainta', keyForget: 'Unohda avaimeni' },
  de: { newChat: 'Neuer Chat', chats: 'Chats', noChats: 'Deine Chats erscheinen hier.', findChats: 'Chat suchen', deleteChat: 'Chat löschen', kept: 'Chats werden nur auf diesem Gerät gespeichert.', menu: 'Chats zeigen', closeMenu: 'Chats ausblenden', assistant: 'Assistent', model: 'Modell', welcome: 'Wobei kann ich dir heute helfen?', placeholder: 'Frag, was du willst…', message: 'Nachricht', send: 'Senden', stop: 'Stoppen', copy: 'Kopieren', copied: 'Kopiert', edit: 'Bearbeiten', again: 'Nochmal versuchen', code: 'Code', thinking: 'Denkt nach', wrong: 'Etwas ist schiefgelaufen. Bitte versuche es gleich noch einmal.', noService: 'Hier erscheint die Antwort. Gib in den Einstellungen an, womit der Chat spricht, damit er echt antwortet.', refused: 'Dabei kann ich nicht helfen. Versuch es anders zu fragen.', noModel: 'Gib in den Einstellungen des Chats das Modell an.', badKey: 'Der Schlüssel wurde nicht angenommen. Prüfe ihn und gib ihn erneut ein.', stopped: 'Gestoppt.', keyTitle: 'Dein {name}-Schlüssel', keyHelp: 'Der Chat nutzt deinen eigenen Schlüssel. Er bleibt in diesem Browser und geht nur an {name}.', keyField: '{name}-API-Schlüssel', keySave: 'Diesen Schlüssel nutzen', keyForget: 'Meinen Schlüssel vergessen' },
  fr: { newChat: 'Nouvelle conversation', chats: 'Conversations', noChats: 'Vos conversations apparaissent ici.', findChats: 'Trouver une conversation', deleteChat: 'Supprimer la conversation', kept: 'Les conversations restent sur cet appareil uniquement.', menu: 'Afficher les conversations', closeMenu: 'Masquer les conversations', assistant: 'Assistant', model: 'Modèle', welcome: 'Comment puis-je vous aider aujourd’hui ?', placeholder: 'Posez votre question…', message: 'Message', send: 'Envoyer', stop: 'Arrêter', copy: 'Copier', copied: 'Copié', edit: 'Modifier', again: 'Réessayer', code: 'Code', thinking: 'Réflexion', wrong: 'Un problème est survenu. Veuillez réessayer dans un instant.', noService: 'La réponse apparaîtra ici. Indiquez dans les réglages avec quoi le chat communique pour qu’il réponde vraiment.', refused: 'Je ne peux pas vous aider sur ce point. Essayez de demander autrement.', noModel: 'Indiquez le modèle dans les réglages du chat.', badKey: 'La clé n’a pas été acceptée. Vérifiez-la et saisissez-la de nouveau.', stopped: 'Arrêté.', keyTitle: 'Votre clé {name}', keyHelp: 'Le chat utilise votre propre clé. Elle reste dans ce navigateur et n’est envoyée qu’à {name}.', keyField: 'Clé API {name}', keySave: 'Utiliser cette clé', keyForget: 'Oublier ma clé' },
  es: { newChat: 'Nueva conversación', chats: 'Conversaciones', noChats: 'Tus conversaciones aparecen aquí.', findChats: 'Buscar una conversación', deleteChat: 'Eliminar conversación', kept: 'Las conversaciones se guardan solo en este dispositivo.', menu: 'Mostrar conversaciones', closeMenu: 'Ocultar conversaciones', assistant: 'Asistente', model: 'Modelo', welcome: '¿En qué puedo ayudarte hoy?', placeholder: 'Pregunta lo que quieras…', message: 'Mensaje', send: 'Enviar', stop: 'Detener', copy: 'Copiar', copied: 'Copiado', edit: 'Editar', again: 'Reintentar', code: 'Código', thinking: 'Pensando', wrong: 'Algo ha ido mal. Inténtalo de nuevo en un momento.', noService: 'Aquí aparecerá la respuesta. Indica en los ajustes con qué habla el chat para que funcione de verdad.', refused: 'No puedo ayudarte con eso. Prueba a preguntarlo de otra forma.', noModel: 'Indica el modelo en los ajustes del chat.', badKey: 'La clave no fue aceptada. Revísala y vuelve a darla.', stopped: 'Detenido.', keyTitle: 'Tu clave de {name}', keyHelp: 'El chat usa tu propia clave. Se queda en este navegador y solo va a {name}.', keyField: 'Clave API de {name}', keySave: 'Usar esta clave', keyForget: 'Olvidar mi clave' },
  it: { newChat: 'Nuova chat', chats: 'Chat', noChats: 'Le tue chat compaiono qui.', findChats: 'Trova una chat', deleteChat: 'Elimina chat', kept: 'Le chat restano solo su questo dispositivo.', menu: 'Mostra chat', closeMenu: 'Nascondi chat', assistant: 'Assistente', model: 'Modello', welcome: 'Come posso aiutarti oggi?', placeholder: 'Chiedi qualsiasi cosa…', message: 'Messaggio', send: 'Invia', stop: 'Ferma', copy: 'Copia', copied: 'Copiato', edit: 'Modifica', again: 'Riprova', code: 'Codice', thinking: 'Sta pensando', wrong: 'Qualcosa è andato storto. Riprova tra un momento.', noService: 'Qui apparirà la risposta. Indica nelle impostazioni con cosa parla la chat per renderla reale.', refused: 'Non posso aiutarti con questo. Prova a chiedere in un altro modo.', noModel: 'Indica il modello nelle impostazioni della chat.', badKey: 'La chiave non è stata accettata. Controllala e inseriscila di nuovo.', stopped: 'Fermato.', keyTitle: 'La tua chiave {name}', keyHelp: 'La chat usa la tua chiave. Resta in questo browser e va solo a {name}.', keyField: 'Chiave API {name}', keySave: 'Usa questa chiave', keyForget: 'Dimentica la mia chiave' },
  nl: { newChat: 'Nieuw gesprek', chats: 'Gesprekken', noChats: 'Je gesprekken verschijnen hier.', findChats: 'Zoek een gesprek', deleteChat: 'Gesprek verwijderen', kept: 'Gesprekken blijven alleen op dit apparaat.', menu: 'Gesprekken tonen', closeMenu: 'Gesprekken verbergen', assistant: 'Assistent', model: 'Model', welcome: 'Waarmee kan ik je vandaag helpen?', placeholder: 'Vraag wat je wilt…', message: 'Bericht', send: 'Versturen', stop: 'Stoppen', copy: 'Kopiëren', copied: 'Gekopieerd', edit: 'Bewerken', again: 'Opnieuw proberen', code: 'Code', thinking: 'Denkt na', wrong: 'Er ging iets mis. Probeer het zo meteen opnieuw.', noService: 'Hier komt het antwoord. Geef in de instellingen aan waarmee de chat praat om hem echt te maken.', refused: 'Daar kan ik niet mee helpen. Probeer het anders te vragen.', noModel: 'Geef het model op in de instellingen van de chat.', badKey: 'De sleutel werd niet geaccepteerd. Controleer hem en geef hem opnieuw.', stopped: 'Gestopt.', keyTitle: 'Je {name}-sleutel', keyHelp: 'De chat gebruikt je eigen sleutel. Die blijft in deze browser en gaat alleen naar {name}.', keyField: '{name} API-sleutel', keySave: 'Deze sleutel gebruiken', keyForget: 'Mijn sleutel vergeten' },
  pt: { newChat: 'Nova conversa', chats: 'Conversas', noChats: 'As suas conversas aparecem aqui.', findChats: 'Procurar conversa', deleteChat: 'Apagar conversa', kept: 'As conversas ficam só neste dispositivo.', menu: 'Mostrar conversas', closeMenu: 'Ocultar conversas', assistant: 'Assistente', model: 'Modelo', welcome: 'Como posso ajudar hoje?', placeholder: 'Pergunte o que quiser…', message: 'Mensagem', send: 'Enviar', stop: 'Parar', copy: 'Copiar', copied: 'Copiado', edit: 'Editar', again: 'Tentar de novo', code: 'Código', thinking: 'A pensar', wrong: 'Algo correu mal. Tente novamente daqui a pouco.', noService: 'A resposta aparecerá aqui. Indique nas definições com o que o chat fala para o tornar real.', refused: 'Não posso ajudar com isso. Tente perguntar de outra forma.', noModel: 'Indique o modelo nas definições do chat.', badKey: 'A chave não foi aceite. Verifique-a e introduza-a de novo.', stopped: 'Parado.', keyTitle: 'A sua chave {name}', keyHelp: 'O chat usa a sua própria chave. Fica neste navegador e só vai para {name}.', keyField: 'Chave API {name}', keySave: 'Usar esta chave', keyForget: 'Esquecer a minha chave' },
  pl: { newChat: 'Nowa rozmowa', chats: 'Rozmowy', noChats: 'Tutaj pojawią się Twoje rozmowy.', findChats: 'Znajdź rozmowę', deleteChat: 'Usuń rozmowę', kept: 'Rozmowy są zapisywane tylko na tym urządzeniu.', menu: 'Pokaż rozmowy', closeMenu: 'Ukryj rozmowy', assistant: 'Asystent', model: 'Model', welcome: 'W czym mogę dziś pomóc?', placeholder: 'Zapytaj o cokolwiek…', message: 'Wiadomość', send: 'Wyślij', stop: 'Zatrzymaj', copy: 'Kopiuj', copied: 'Skopiowano', edit: 'Edytuj', again: 'Spróbuj ponownie', code: 'Kod', thinking: 'Myśli', wrong: 'Coś poszło nie tak. Spróbuj ponownie za chwilę.', noService: 'Tutaj pojawi się odpowiedź. Wskaż w ustawieniach, z czym rozmawia czat, aby działał naprawdę.', refused: 'Nie mogę w tym pomóc. Spróbuj zapytać inaczej.', noModel: 'Podaj model w ustawieniach czatu.', badKey: 'Klucz nie został przyjęty. Sprawdź go i podaj ponownie.', stopped: 'Zatrzymano.', keyTitle: 'Twój klucz {name}', keyHelp: 'Czat używa Twojego klucza. Zostaje w tej przeglądarce i trafia tylko do {name}.', keyField: 'Klucz API {name}', keySave: 'Użyj tego klucza', keyForget: 'Zapomnij mój klucz' },
  zh: { newChat: '新对话', chats: '对话', noChats: '你的对话会显示在这里。', findChats: '查找对话', deleteChat: '删除对话', kept: '对话只保存在这台设备上。', menu: '显示对话', closeMenu: '隐藏对话', assistant: '助手', model: '模型', welcome: '今天我能帮你做什么？', placeholder: '问点什么…', message: '消息', send: '发送', stop: '停止', copy: '复制', copied: '已复制', edit: '编辑', again: '重试', code: '代码', thinking: '思考中', wrong: '出了点问题，请稍后重试。', noService: '回答会显示在这里。在设置中说明聊天连接到哪里，让它真正工作。', refused: '这个我帮不上忙。换个方式问问看。', noModel: '请在聊天设置中填写要使用的模型。', badKey: '密钥未被接受。请检查后重新输入。', stopped: '已停止。', keyTitle: '你的 {name} 密钥', keyHelp: '聊天使用你自己的密钥。它只保存在此浏览器中，只发送给 {name}。', keyField: '{name} API 密钥', keySave: '使用此密钥', keyForget: '忘记我的密钥' },
  ja: { newChat: '新しいチャット', chats: 'チャット', noChats: 'チャットはここに表示されます。', findChats: 'チャットを探す', deleteChat: 'チャットを削除', kept: 'チャットはこの端末にのみ保存されます。', menu: 'チャットを表示', closeMenu: 'チャットを隠す', assistant: 'アシスタント', model: 'モデル', welcome: '今日はどんなお手伝いをしましょうか？', placeholder: '何でも聞いてください…', message: 'メッセージ', send: '送信', stop: '停止', copy: 'コピー', copied: 'コピーしました', edit: '編集', again: 'もう一度', code: 'コード', thinking: '考え中', wrong: '問題が発生しました。しばらくしてからもう一度お試しください。', noService: 'ここに回答が表示されます。設定でチャットの接続先を指定すると実際に動きます。', refused: 'その件はお手伝いできません。別の聞き方を試してください。', noModel: 'チャットの設定で使用するモデルを指定してください。', badKey: 'キーが受け付けられませんでした。確認してもう一度入力してください。', stopped: '停止しました。', keyTitle: 'あなたの {name} キー', keyHelp: 'チャットはあなた自身のキーを使います。キーはこのブラウザに残り、{name} にだけ送られます。', keyField: '{name} API キー', keySave: 'このキーを使う', keyForget: 'キーを削除' }
}

// The services it can talk to: where, and the model when none is named
const PROVIDERS = {
  openai: { name: 'OpenAI', url: 'https://api.openai.com/v1/chat/completions', model: '' },
  anthropic: { name: 'Anthropic', url: 'https://api.anthropic.com/v1/messages', model: 'claude-opus-5-5' }
}
// (Anthropic's models that take a fallback when a request is declined)
const FALLBACK_MODELS = ['claude-fable-5-1', 'claude-opus-5-5', 'claude-opus-5', 'claude-sonnet-5-5']

// A link that may be followed: the web, mail, or this site (never a script)
const safeHref = href => (/^(https?:|mailto:|\\/|#)/i.test(href) ? href : '')

// Text with **bold**, *slanted*, ~~struck~~, \`code\` and [links](https://…) as runs of one kind each
function inline(text) {
  const runs = []
  const add = (part, how) => { if (part) runs.push({ text: part, ...how }) }
  const pattern = /(\`+)([\\s\\S]*?)\\1|\\[([^\\]]+)\\]\\(([^)\\s]+)\\)|(\\*\\*|__)([\\s\\S]+?)\\5|(\\*|_)([^*_\\s][\\s\\S]*?)\\7|~~([\\s\\S]+?)~~|(https?:\\/\\/[^\\s<>()]+[^\\s<>().,;:!?'"])/g
  let at = 0
  let found
  while ((found = pattern.exec(text))) {
    add(text.slice(at, found.index), {})
    if (found[1]) add(found[2], { code: true })
    else if (found[3]) { const href = safeHref(found[4]); href ? add(found[3], { href }) : add(found[3], {}) }
    else if (found[5]) for (const run of inline(found[6])) runs.push({ ...run, b: true })
    else if (found[7]) for (const run of inline(found[8])) runs.push({ ...run, i: true })
    else if (found[9]) for (const run of inline(found[9])) runs.push({ ...run, s: true })
    else if (found[10]) add(found[10], { href: found[10] })
    at = pattern.lastIndex
  }
  add(text.slice(at), {})
  return runs
}

const cells = line => line.trim().replace(/^\\||\\|$/g, '').split('|').map(cell => inline(cell.trim()))

// An answer written in Markdown as blocks: headings, paragraphs, lists, quotes, tables, code and rules. Drawn by the
// template (never as HTML text). A code block still being written is shown as far as it has come.
function parse(text) {
  const lines = String(text || '').replace(/\\r\\n?/g, '\\n').split('\\n')
  const blocks = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) { i++; continue }
    const fence = /^\\s*(\`\`\`+|~~~+)\\s*([\\w+#.-]*)/.exec(line)
    if (fence) {
      const code = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith(fence[1])) code.push(lines[i++])
      i++
      blocks.push({ type: 'code', lang: fence[2], code: code.join('\\n') })
      continue
    }
    const heading = /^(#{1,6})\\s+(.*)$/.exec(line)
    if (heading) { blocks.push({ type: 'heading', level: Math.min(6, heading[1].length + 1), runs: inline(heading[2].replace(/\\s#+\\s*$/, '')) }); i++; continue }
    if (/^\\s*([-*_])(\\s*\\1){2,}\\s*$/.test(line)) { blocks.push({ type: 'rule' }); i++; continue }
    if (/^\\s*\\|.*\\|\\s*$/.test(line) && /^\\s*\\|?[\\s:|-]+\\|?\\s*$/.test(lines[i + 1] || '') && (lines[i + 1] || '').includes('-')) {
      const head = cells(line)
      i += 2
      const rows = []
      while (i < lines.length && /^\\s*\\|.*\\|\\s*$/.test(lines[i])) rows.push(cells(lines[i++]))
      blocks.push({ type: 'table', head, rows })
      continue
    }
    if (/^\\s*>/.test(line)) {
      const said = []
      while (i < lines.length && /^\\s*>/.test(lines[i])) said.push(lines[i++].replace(/^\\s*>\\s?/, ''))
      blocks.push({ type: 'quote', runs: inline(said.join(' ')) })
      continue
    }
    const item = /^(\\s*)([-*+]|(\\d+)[.)])\\s+(.*)$/.exec(line)
    if (item) {
      const ordered = !!item[3]
      const items = []
      while (i < lines.length) {
        const one = /^(\\s*)([-*+]|(\\d+)[.)])\\s+(.*)$/.exec(lines[i])
        if (one) { items.push({ depth: Math.min(4, Math.floor(one[1].replace(/\\t/g, '  ').length / 2)), runs: inline(one[4]) }); i++; continue }
        // (a line that goes on with the item before it)
        if (lines[i].trim() && /^\\s+\\S/.test(lines[i]) && items.length) { items[items.length - 1].runs.push(...inline(' ' + lines[i].trim())); i++; continue }
        break
      }
      blocks.push({ type: 'list', ordered, start: ordered ? Number(item[3]) : undefined, items })
      continue
    }
    const said = []
    while (i < lines.length && lines[i].trim() && !/^(#{1,6}\\s|\\s*(\`\`\`|~~~)|\\s*>|\\s*([-*+]|\\d+[.)])\\s)/.test(lines[i])) said.push(lines[i++].trim())
    if (!said.length) said.push(lines[i++].trim())
    blocks.push({ type: 'paragraph', runs: inline(said.join('\\n')) })
  }
  return blocks
}

const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7)

export default {
  emits: ['asked', 'answered'],
  props: {
    provider: {
      type: String,
      default: 'service',
      label: 'Talks to',
      control: 'select',
      options: [{ key: 'Your own chat service', value: 'service' }, { key: 'OpenAI', value: 'openai' }, { key: 'Anthropic', value: 'anthropic' }]
    },
    endpoint: { type: String, default: '', label: 'Ask at', placeholder: 'Your address that passes it on with your key' },
    visitorKey: { type: Boolean, default: false, label: 'Visitors use their own key (kept in their browser)' },
    model: { type: String, default: '', label: 'Model', placeholder: 'claude-opus-5-5' },
    models: {
      type: Array,
      default: () => [],
      label: 'Models to choose from',
      control: 'list',
      fields: [{ key: 'value', label: 'Model' }, { key: 'label', label: 'Shown as' }]
    },
    system: { type: String, default: '', label: 'How it should behave', control: 'textarea', placeholder: 'You are a helpful assistant for …' },
    name: { type: String, default: '', label: 'Its name', placeholder: 'Assistant' },
    welcome: { type: String, default: '', label: 'Welcome', placeholder: 'How can I help you today?' },
    intro: { type: String, default: '', label: 'Under the welcome', control: 'textarea' },
    placeholder: { type: String, default: '', label: 'Shown while empty', placeholder: 'Ask anything…' },
    ideas: {
      type: Array,
      default: () => [
        { title: 'Explain something', text: 'Explain how the internet works, simply' },
        { title: 'Write something', text: 'Write a short, friendly thank-you note' },
        { title: 'Plan something', text: 'Plan a relaxed three-day trip to Lisbon' },
        { title: 'Fix some code', text: 'Why does 0.1 + 0.2 not equal 0.3 in JavaScript?' }
      ],
      label: 'Ideas',
      control: 'list',
      fields: [{ key: 'title', label: 'Title' }, { key: 'text', label: 'Question' }]
    },
    showChats: { type: Boolean, default: true, label: 'Show the chats down the side' },
    remember: { type: Boolean, default: true, label: 'Keep chats on the visitor\\'s device' },
    keepAs: { type: String, default: '', label: 'Kept under (for two chats on one site)', placeholder: 'chats' },
    links: {
      type: Array,
      default: () => [],
      label: 'Links under the chats',
      control: 'list',
      fields: [{ key: 'text', label: 'Text' }, { key: 'href', label: 'Link' }]
    },
    note: { type: String, default: '', label: 'Small print under the box', placeholder: 'Answers can be wrong. Check what matters.' },
    height: { type: String, default: '', label: 'Height (empty: the whole screen)', control: 'slider', unit: 'px', min: 360, max: 1400 },
    color: { type: String, default: '', label: 'Color', control: 'color' },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 40 }
  },
  data() {
    return { chats: [], currentId: '', draft: '', busy: false, waitingFirst: false, menuOpen: false, find: '', copied: '', picked: '', key: '', keyDraft: '', follow: true }
  },
  created() {
    // Which answer is being written: a new chat, Stop or leaving the page stops the one on its way
    this.turn = 0
    this.control = null
    this.read()
  },
  beforeUnmount() {
    this.stop()
  },
  watch: {
    // (kept when it changes, and once an answer is written, not at every word of it)
    chats: { deep: true, handler() { if (!this.busy) this.keep() } },
    models: { immediate: true, handler(list) { if (list && list.length && !list.some(one => one.value === this.picked)) this.picked = list[0].value } }
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
      return {
        '--vp-chat-app-height': this.height || undefined,
        '--vp-chat-app-color': this.color || undefined,
        '--vp-chat-app-radius': this.radius || undefined
      }
    },
    current() {
      return this.chats.find(one => one.id === this.currentId) || null
    },
    messages() {
      return this.current ? this.current.messages : []
    },
    lastMine() {
      for (let i = this.messages.length - 1; i >= 0; i--) if (this.messages[i].role === 'user') return i
      return -1
    },
    shownChats() {
      const q = this.find.trim().toLowerCase()
      return q ? this.chats.filter(one => (one.title || '').toLowerCase().includes(q)) : this.chats
    },
    usesKey() {
      return this.visitorKey && !!PROVIDERS[this.provider]
    },
    providerName() {
      return PROVIDERS[this.provider] ? PROVIDERS[this.provider].name : ''
    },
    storeKey() {
      return 'vp-chat-app:' + (this.keepAs || 'chats')
    }
  },
  methods: {
    say(key, own, name) {
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return String(own || (words[key] ?? WORDS.en[key])).replace(/\\{name\\}/g, name ?? '')
    },
    parse,
    look(run) {
      return { 'vp-chat-app__b': run.b, 'vp-chat-app__i': run.i, 'vp-chat-app__s': run.s }
    },
    // What is kept on this device: the chats, and a visitor's own key (each only when asked for)
    read() {
      try {
        if (typeof localStorage === 'undefined') return
        if (this.remember) {
          const kept = JSON.parse(localStorage.getItem(this.storeKey) || '[]')
          if (Array.isArray(kept)) this.chats = kept.filter(one => one && one.id && Array.isArray(one.messages))
        }
        if (this.visitorKey && PROVIDERS[this.provider]) this.key = localStorage.getItem('vp-chat-app-key:' + this.provider) || ''
      } catch (e) {}
    },
    keep() {
      if (!this.remember) return
      try { localStorage.setItem(this.storeKey, JSON.stringify(this.chats.filter(one => one.messages.length).slice(0, 100))) } catch (e) {}
    },
    saveKey() {
      const key = this.keyDraft.trim()
      if (!key) return
      this.key = key
      this.keyDraft = ''
      try { localStorage.setItem('vp-chat-app-key:' + this.provider, key) } catch (e) {}
      this.$nextTick(() => this.$refs.input && this.$refs.input.focus())
    },
    forgetKey() {
      this.key = ''
      try { localStorage.removeItem('vp-chat-app-key:' + this.provider) } catch (e) {}
    },
    newChat() {
      this.stop()
      this.currentId = ''
      this.draft = ''
      this.menuOpen = false
      this.$nextTick(() => this.$refs.input && this.$refs.input.focus())
    },
    open(id) {
      this.stop()
      this.currentId = id
      this.menuOpen = false
      this.follow = true
      this.down(true)
    },
    remove(id) {
      if (id === this.currentId) this.newChat()
      this.chats = this.chats.filter(one => one.id !== id)
    },
    // Enter sends, unless it is choosing a word in an input method (Chinese, Japanese …); Shift+Enter is a new line
    enter(event) {
      if (event.isComposing || event.keyCode === 229) return
      event.preventDefault()
      if (!this.busy) this.ask(this.draft)
    },
    async ask(text) {
      text = String(text || '').trim()
      if (!text || this.busy) return
      if (!this.current) {
        const chat = { id: newId(), title: text.slice(0, 60), messages: [], at: Date.now() }
        this.chats = [chat, ...this.chats]
        this.currentId = chat.id
      }
      this.draft = ''
      this.current.messages.push({ role: 'user', content: text })
      this.current.at = Date.now()
      this.$emit('asked', text)
      this.follow = true
      await this.answer()
    },
    // The answer to what was said so far, written into the chat as it comes
    async answer() {
      const chat = this.current
      if (!chat) return
      const turn = ++this.turn
      const control = typeof AbortController === 'function' ? new AbortController() : null
      this.control = control
      this.busy = true
      this.waitingFirst = true
      this.down()
      const reply = { role: 'assistant', content: '' }
      let shown = false
      const write = piece => {
        if (turn !== this.turn || !piece) return
        if (!shown) { chat.messages.push(reply); shown = true; this.waitingFirst = false }
        reply.content += piece
        this.down()
      }
      let own = ''
      try {
        await this.request(chat.messages.filter(one => !one.local && one.content).map(one => ({ role: one.role, content: one.content })), write, control && control.signal)
        if (turn === this.turn && !shown) own = this.say('wrong')
      } catch (e) {
        if (turn !== this.turn) return
        own = e && e.said ? this.say(e.said) : this.say('wrong')
      }
      if (turn !== this.turn) return
      if (own) {
        if (shown) chat.messages.splice(chat.messages.indexOf(reply), 1)
        chat.messages.push({ role: 'assistant', content: own, local: true })
      }
      this.control = null
      this.busy = false
      this.waitingFirst = false
      this.keep()
      if (!own) this.$emit('answered', reply.content)
      this.down()
    },
    async request(messages, write, signal) {
      const known = PROVIDERS[this.provider]
      const model = this.picked || this.model || (known ? known.model : '')
      if (!known) {
        if (!this.endpoint) { const e = new Error('no service'); e.said = 'noService'; throw e }
        const body = { messages: (this.system ? [{ role: 'system', content: this.system }] : []).concat(messages) }
        if (model) body.model = model
        return this.readAnswer(await this.send(this.endpoint, { 'Content-Type': 'application/json', Accept: 'text/event-stream, application/json' }, body, signal), write, 'any')
      }
      if (!this.endpoint && !this.usesKey) { const e = new Error('no service'); e.said = 'noService'; throw e }
      if (!model) { const e = new Error('no model'); e.said = 'noModel'; throw e }
      const direct = this.usesKey
      const url = direct ? known.url : this.endpoint
      if (this.provider === 'anthropic') {
        const headers = { 'Content-Type': 'application/json', Accept: 'text/event-stream', 'anthropic-version': '2026-10-21' }
        const body = { model, max_tokens: 64000, stream: true, messages }
        if (this.system) body.system = this.system
        // (a declined request is answered by the next model, when the model takes that)
        if (FALLBACK_MODELS.includes(model)) { headers['anthropic-beta'] = 'server-side-fallback-2026-07-01'; body.fallbacks = 'default' }
        if (direct) { headers['x-api-key'] = this.key; headers['anthropic-dangerous-direct-browser-access'] = 'true' }
        return this.readAnswer(await this.send(url, headers, body, signal), write, 'anthropic')
      }
      const headers = { 'Content-Type': 'application/json', Accept: 'text/event-stream' }
      if (direct) headers.Authorization = 'Bearer ' + this.key
      const body = { model, stream: true, messages: (this.system ? [{ role: 'system', content: this.system }] : []).concat(messages) }
      return this.readAnswer(await this.send(url, headers, body, signal), write, 'openai')
    },
    async send(url, headers, body, signal) {
      const response = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body), signal: signal || undefined })
      if (!response.ok) {
        const e = new Error(String(response.status))
        if ((response.status === 401 || response.status === 403) && this.usesKey) { e.said = 'badKey'; this.forgetKey() }
        throw e
      }
      return response
    },
    // An answer as it comes: a stream of events (OpenAI's, Anthropic's, or { text }), JSON, or plain text
    async readAnswer(response, write, kind) {
      const type = (response.headers && response.headers.get && response.headers.get('content-type')) || ''
      if (!/event-stream/.test(type) || !response.body || !response.body.getReader) {
        const raw = await response.text()
        let data
        try { data = JSON.parse(raw) } catch (e) { write(raw.trim()); return }
        write(this.found(data))
        return
      }
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let rest = ''
      let refused = false
      for (;;) {
        const { done, value } = await reader.read()
        rest += decoder.decode(value || new Uint8Array(), { stream: !done })
        const lines = rest.split('\\n')
        rest = done ? '' : lines.pop()
        for (const line of lines) {
          if (!line.startsWith('data:')) continue
          const raw = line.slice(5).trim()
          if (!raw || raw === '[DONE]') continue
          let data
          try { data = JSON.parse(raw) } catch (e) { if (kind === 'any') write(raw); continue }
          if (data.type === 'error' || data.error) throw new Error('stream error')
          if (kind === 'anthropic' || data.type === 'content_block_delta') {
            if (data.type === 'content_block_delta' && data.delta && data.delta.type === 'text_delta') write(data.delta.text)
            if (data.type === 'message_delta' && data.delta && data.delta.stop_reason === 'refusal') refused = true
            continue
          }
          const choice = data.choices && data.choices[0]
          if (choice) { write((choice.delta && choice.delta.content) || (choice.message && choice.message.content) || choice.text || ''); continue }
          if (kind === 'any') write(typeof data.text === 'string' ? data.text : typeof data.delta === 'string' ? data.delta : typeof data.content === 'string' ? data.content : '')
        }
        if (done) break
      }
      if (refused) write('\\n\\n' + this.say('refused'))
    },
    found(data) {
      const first = data && data.choices && data.choices[0]
      const blocks = data && Array.isArray(data.content) ? data.content.filter(one => one && one.type === 'text').map(one => one.text).join('') : ''
      const found = [data && data.reply, data && data.message && data.message.content, data && data.message, typeof (data && data.content) === 'string' ? data.content : blocks, data && data.text, first && first.message && first.message.content, first && first.text]
        .find(one => typeof one === 'string' && one.trim())
      if (!found) throw new Error('no answer')
      return found.trim()
    },
    // Stops the answer on its way; what has come stays
    stop() {
      this.turn++
      if (this.control) this.control.abort()
      this.control = null
      this.busy = false
      this.waitingFirst = false
    },
    // The last question back in the box to change, and what came after it gone
    edit(index) {
      if (this.busy || !this.current) return
      this.draft = this.current.messages[index].content
      this.current.messages.splice(index)
      this.$nextTick(() => this.$refs.input && this.$refs.input.focus())
    },
    // The last answer asked again
    async again() {
      if (this.busy || !this.current) return
      const list = this.current.messages
      while (list.length && list[list.length - 1].role !== 'user') list.pop()
      if (list.length) await this.answer()
    },
    async copy(text, which) {
      try {
        await navigator.clipboard.writeText(text)
        this.copied = which
        setTimeout(() => { if (this.copied === which) this.copied = '' }, 1500)
      } catch (e) {}
    },
    // Follows the answer down while it is written, unless the visitor scrolled up to read
    scrolled() {
      const list = this.$refs.list
      if (list) this.follow = list.scrollHeight - list.scrollTop - list.clientHeight < 80
    },
    down(always) {
      this.$nextTick(() => {
        const list = this.$refs.list
        if (list && (always || this.follow)) list.scrollTop = list.scrollHeight
      })
    }
  }
}
<\/script>
<style>
.vp-chat-app { --vp-chat-app-accent: var(--vp-chat-app-color, var(--vp-primary, #2563eb)); position: relative; box-sizing: border-box; display: flex; width: 100%; height: var(--vp-chat-app-height, 100dvh); min-height: 360px; overflow: hidden; border-radius: var(--vp-chat-app-radius, 0); background: var(--vp-background, #fff); color: var(--vp-text, #111827); text-align: left; font: inherit; }
.vp-chat-app *, .vp-chat-app *::before, .vp-chat-app *::after { box-sizing: border-box; }
.vp-chat-app svg { width: 1.15rem; height: 1.15rem; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; flex: none; }
.vp-chat-app__side { display: flex; flex-direction: column; gap: 0.5rem; width: 16.5rem; flex: none; padding: 0.75rem; background: var(--vp-surface, #f4f5f7); border-right: 1px solid var(--vp-border, #e5e7eb); }
.vp-chat-app__side-top { display: flex; gap: 0.4rem; }
.vp-chat-app__new { flex: 1; display: flex; align-items: center; gap: 0.5rem; height: 2.5rem; padding: 0 0.8rem; border: 1px solid var(--vp-border, #e5e7eb); border-radius: 0.7rem; background: var(--vp-background, #fff); color: inherit; font: inherit; font-weight: 600; cursor: pointer; }
.vp-chat-app__new:hover { border-color: var(--vp-chat-app-accent); }
.vp-chat-app__icon { display: inline-flex; align-items: center; justify-content: center; width: 2.25rem; height: 2.25rem; padding: 0; border: 0; border-radius: 0.6rem; background: transparent; color: inherit; cursor: pointer; opacity: 0.75; }
.vp-chat-app__icon:hover { opacity: 1; background: color-mix(in srgb, currentColor 8%, transparent); }
.vp-chat-app__close, .vp-chat-app__menu { display: none; }
.vp-chat-app__find { width: 100%; height: 2.2rem; padding: 0 0.7rem; border: 1px solid var(--vp-border, #e5e7eb); border-radius: 0.6rem; background: var(--vp-background, #fff); color: inherit; font: inherit; font-size: 0.9rem; }
.vp-chat-app__chats { flex: 1; display: flex; flex-direction: column; gap: 2px; overflow-y: auto; margin: 0.25rem -0.25rem 0; padding: 0 0.25rem; }
.vp-chat-app__none, .vp-chat-app__kept { margin: 0.5rem 0.25rem; font-size: 0.85rem; opacity: 0.6; }
.vp-chat-app__links { display: flex; flex-wrap: wrap; gap: 0.15rem 0.9rem; padding: 0.6rem 0.25rem 0; border-top: 1px solid var(--vp-border, #e5e7eb); font-size: 0.85rem; }
.vp-chat-app__link { color: inherit; opacity: 0.7; text-decoration: none; }
.vp-chat-app__link:hover { opacity: 1; text-decoration: underline; }
.vp-chat-app__chat { display: flex; align-items: center; border-radius: 0.6rem; }
.vp-chat-app__chat:hover, .vp-chat-app__chat--on { background: color-mix(in srgb, currentColor 8%, transparent); }
.vp-chat-app__chat-open { flex: 1; min-width: 0; overflow: hidden; padding: 0.55rem 0.6rem; border: 0; background: none; color: inherit; font: inherit; font-size: 0.92rem; text-align: left; text-overflow: ellipsis; white-space: nowrap; cursor: pointer; }
.vp-chat-app__chat-delete { width: 2rem; height: 2rem; opacity: 0; }
.vp-chat-app__chat:hover .vp-chat-app__chat-delete, .vp-chat-app__chat-delete:focus-visible, .vp-chat-app__chat--on .vp-chat-app__chat-delete { opacity: 0.6; }
.vp-chat-app__main { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.vp-chat-app__top { display: flex; align-items: center; gap: 0.5rem; min-height: 3.25rem; padding: 0.5rem 0.75rem; border-bottom: 1px solid var(--vp-border, #e5e7eb); }
.vp-chat-app__name { font-weight: 650; }
.vp-chat-app__model { max-width: 14rem; height: 2rem; padding: 0 0.5rem; border: 1px solid var(--vp-border, #e5e7eb); border-radius: 0.5rem; background: var(--vp-background, #fff); color: inherit; font: inherit; font-size: 0.88rem; }
.vp-chat-app__space { flex: 1; }
.vp-chat-app__list { flex: 1; overflow-y: auto; padding: 1.5rem 1rem 1rem; }
.vp-chat-app__column { max-width: 48rem; margin: 0 auto; display: flex; flex-direction: column; gap: 1.4rem; }
.vp-chat-app__welcome { display: flex; flex-direction: column; align-items: center; gap: 1rem; padding: 12vh 0 1rem; text-align: center; }
.vp-chat-app__hello { margin: 0; font-size: clamp(1.5rem, 3vw, 2.1rem); font-weight: 650; line-height: 1.2; }
.vp-chat-app__intro { margin: 0; max-width: 36rem; opacity: 0.7; line-height: 1.5; }
.vp-chat-app__ideas { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.6rem; width: 100%; margin-top: 1rem; }
.vp-chat-app__idea { display: flex; flex-direction: column; gap: 0.2rem; padding: 0.85rem 1rem; border: 1px solid var(--vp-border, #e5e7eb); border-radius: 0.9rem; background: transparent; color: inherit; font: inherit; text-align: left; cursor: pointer; }
.vp-chat-app__idea span { font-size: 0.9rem; opacity: 0.65; }
.vp-chat-app__idea:hover { border-color: var(--vp-chat-app-accent); background: color-mix(in srgb, var(--vp-chat-app-accent) 6%, transparent); }
.vp-chat-app__message { display: flex; flex-direction: column; gap: 0.35rem; }
.vp-chat-app__message--me { align-items: flex-end; }
.vp-chat-app__mine { max-width: min(85%, 38rem); padding: 0.7rem 1rem; border-radius: 1.2rem; background: var(--vp-surface, #f1f3f6); line-height: 1.55; white-space: pre-wrap; overflow-wrap: anywhere; }
.vp-chat-app__answer { width: 100%; line-height: 1.65; overflow-wrap: anywhere; }
.vp-chat-app__answer--note { opacity: 0.75; font-style: italic; }
.vp-chat-app__answer > :first-child { margin-top: 0; }
.vp-chat-app__p { margin: 0 0 0.8rem; white-space: pre-wrap; }
.vp-chat-app__h { margin: 1.3rem 0 0.5rem; line-height: 1.3; font-weight: 650; font-size: 1.05rem; }
.vp-chat-app h2.vp-chat-app__h { font-size: 1.4rem; }
.vp-chat-app h3.vp-chat-app__h { font-size: 1.2rem; }
.vp-chat-app__ul, .vp-chat-app__ol { margin: 0 0 0.8rem; padding-left: 1.4rem; }
.vp-chat-app__ul li, .vp-chat-app__ol li { margin: 0.2rem 0; }
.vp-chat-app__quote { margin: 0 0 0.8rem; padding: 0.2rem 0 0.2rem 1rem; border-left: 3px solid var(--vp-border, #d1d5db); opacity: 0.85; }
.vp-chat-app__rule { margin: 1.2rem 0; border: 0; border-top: 1px solid var(--vp-border, #e5e7eb); }
.vp-chat-app__b { font-weight: 650; }
.vp-chat-app__i { font-style: italic; }
.vp-chat-app__s { text-decoration: line-through; }
.vp-chat-app__answer a { color: var(--vp-chat-app-accent); text-decoration: underline; text-underline-offset: 2px; }
.vp-chat-app__tick { padding: 0.1em 0.35em; border-radius: 0.35em; background: color-mix(in srgb, currentColor 9%, transparent); font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.88em; }
.vp-chat-app__code { margin: 0 0 0.9rem; overflow: hidden; border: 1px solid var(--vp-border, #e5e7eb); border-radius: 0.8rem; background: color-mix(in srgb, var(--vp-text, #111827) 4%, var(--vp-background, #fff)); }
.vp-chat-app__code-top { display: flex; align-items: center; justify-content: space-between; padding: 0.35rem 0.5rem 0.35rem 0.9rem; border-bottom: 1px solid var(--vp-border, #e5e7eb); font-size: 0.8rem; opacity: 0.8; }
.vp-chat-app__code-copy { padding: 0.2rem 0.55rem; border: 0; border-radius: 0.4rem; background: transparent; color: inherit; font: inherit; cursor: pointer; }
.vp-chat-app__code-copy:hover { background: color-mix(in srgb, currentColor 10%, transparent); }
.vp-chat-app__code pre { margin: 0; padding: 0.9rem; overflow-x: auto; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.86rem; line-height: 1.55; white-space: pre; }
.vp-chat-app__table-box { margin: 0 0 0.9rem; overflow-x: auto; }
.vp-chat-app__table { border-collapse: collapse; font-size: 0.93rem; }
.vp-chat-app__table th, .vp-chat-app__table td { padding: 0.45rem 0.7rem; border: 1px solid var(--vp-border, #e5e7eb); text-align: left; vertical-align: top; }
.vp-chat-app__table th { background: var(--vp-surface, #f4f5f7); font-weight: 650; }
.vp-chat-app__caret { display: inline-block; width: 0.55em; height: 1.1em; margin-left: 2px; vertical-align: -0.15em; border-radius: 2px; background: currentColor; opacity: 0.5; animation: vp-chat-app-blink 1s steps(2) infinite; }
.vp-chat-app__tools { display: flex; gap: 0.15rem; opacity: 0; transition: opacity 0.15s; }
.vp-chat-app__message:hover .vp-chat-app__tools, .vp-chat-app__message:last-child .vp-chat-app__tools, .vp-chat-app__tools:focus-within { opacity: 1; }
.vp-chat-app__tool { padding: 0.25rem 0.55rem; border: 0; border-radius: 0.45rem; background: transparent; color: inherit; font: inherit; font-size: 0.82rem; opacity: 0.65; cursor: pointer; }
.vp-chat-app__tool:hover { opacity: 1; background: color-mix(in srgb, currentColor 8%, transparent); }
.vp-chat-app__dots { display: inline-flex; gap: 0.3em; padding: 0.5rem 0; }
.vp-chat-app__dots span { width: 0.5em; height: 0.5em; border-radius: 50%; background: currentColor; opacity: 0.35; animation: vp-chat-app-wait 1s infinite ease-in-out; }
.vp-chat-app__dots span:nth-child(2) { animation-delay: 0.15s; }
.vp-chat-app__dots span:nth-child(3) { animation-delay: 0.3s; }
.vp-chat-app__bottom { padding: 0.5rem 1rem 1rem; }
.vp-chat-app__composer, .vp-chat-app__key { max-width: 48rem; margin: 0 auto; }
.vp-chat-app__composer { display: flex; align-items: flex-end; gap: 0.5rem; padding: 0.5rem 0.5rem 0.5rem 1rem; border: 1px solid var(--vp-border, #e5e7eb); border-radius: 1.5rem; background: var(--vp-background, #fff); box-shadow: 0 4px 18px rgb(0 0 0 / 0.06); }
.vp-chat-app__composer:focus-within { border-color: var(--vp-chat-app-accent); }
.vp-chat-app__input { flex: 1; min-height: 2.4rem; max-height: 12rem; padding: 0.55rem 0; border: 0; background: transparent; color: inherit; font: inherit; line-height: 1.45; resize: none; outline: none; field-sizing: content; }
.vp-chat-app__send { display: flex; align-items: center; justify-content: center; width: 2.4rem; height: 2.4rem; flex: none; padding: 0; border: 0; border-radius: 50%; background: var(--vp-chat-app-accent); color: var(--vp-primary-contrast, #fff); cursor: pointer; }
.vp-chat-app__send:disabled { opacity: 0.35; cursor: default; }
.vp-chat-app__send--stop svg { fill: currentColor; stroke: none; }
.vp-chat-app__note { max-width: 48rem; margin: 0.5rem auto 0; font-size: 0.78rem; text-align: center; opacity: 0.55; }
.vp-chat-app__key { display: flex; flex-direction: column; gap: 0.4rem; padding: 1rem; border: 1px solid var(--vp-border, #e5e7eb); border-radius: 1rem; background: var(--vp-surface, #f4f5f7); }
.vp-chat-app__key span { font-size: 0.9rem; opacity: 0.75; }
.vp-chat-app__key-row { display: flex; gap: 0.5rem; margin-top: 0.3rem; }
.vp-chat-app__key-row input { flex: 1; min-width: 0; height: 2.5rem; padding: 0 0.8rem; border: 1px solid var(--vp-border, #e5e7eb); border-radius: 0.6rem; background: var(--vp-background, #fff); color: inherit; font: inherit; }
.vp-chat-app__key-row button { height: 2.5rem; padding: 0 1rem; border: 0; border-radius: 0.6rem; background: var(--vp-chat-app-accent); color: var(--vp-primary-contrast, #fff); font: inherit; font-weight: 600; cursor: pointer; }
.vp-chat-app__key-row button:disabled { opacity: 0.4; cursor: default; }
.vp-chat-app__shade { display: none; }
@media (max-width: 760px) {
  .vp-chat-app__side { position: absolute; z-index: 3; top: 0; bottom: 0; left: 0; width: min(18rem, 85%); transform: translateX(-105%); transition: transform 0.2s ease; box-shadow: 0 0 30px rgb(0 0 0 / 0.2); }
  .vp-chat-app--menu .vp-chat-app__side { transform: none; }
  .vp-chat-app--menu .vp-chat-app__shade { display: block; position: absolute; z-index: 2; inset: 0; background: rgb(0 0 0 / 0.35); }
  .vp-chat-app__close, .vp-chat-app__menu { display: inline-flex; }
  .vp-chat-app__list { padding: 1rem 0.75rem; }
  .vp-chat-app__bottom { padding: 0.5rem 0.6rem 0.75rem; }
  .vp-chat-app__welcome { padding-top: 6vh; }
  .vp-chat-app__ideas { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .vp-chat-app__dots span, .vp-chat-app__caret { animation: none; }
  .vp-chat-app__side { transition: none; }
}
@keyframes vp-chat-app-wait {
  0%, 80%, 100% { opacity: 0.25; transform: translateY(0); }
  40% { opacity: 0.9; transform: translateY(-0.2em); }
}
@keyframes vp-chat-app-blink {
  to { opacity: 0; }
}
</style>
`;export{e as default};