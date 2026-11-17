var e=`<template>
  <div class="vp-chat" :style="style">
    <div ref="list" class="vp-chat__list" aria-live="polite">
      <div v-if="showGreeting" class="vp-chat__message vp-chat__message--them"><div class="vp-chat__bubble">{{ say('greeting', greeting) }}</div></div>
      <div v-for="(message, index) in said" :key="index" class="vp-chat__message" :class="'vp-chat__message--' + (message.role === 'user' ? 'me' : 'them')">
        <div class="vp-chat__bubble">{{ message.content }}</div>
      </div>
      <div v-if="waiting" class="vp-chat__message vp-chat__message--them"><div class="vp-chat__bubble vp-chat__bubble--waiting" :aria-label="say('answering')" role="status"><span /><span /><span /></div></div>
      <div v-if="!said.length && ideas.length" class="vp-chat__ideas">
        <button v-for="(idea, index) in ideas" :key="index" type="button" class="vp-chat__idea" @click="ask(idea.text)">{{ idea.text }}</button>
      </div>
    </div>
    <form class="vp-chat__form" @submit.prevent="ask(draft)">
      <button v-if="said.length || waiting" class="vp-chat__new" type="button" :aria-label="say('newChat')" :title="say('newChat')" @click="clear"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg></button>
      <textarea ref="input" v-model="draft" class="vp-chat__input" rows="1" name="message" enterkeyhint="send" :placeholder="say('placeholder', placeholder)" :aria-label="say('message')" @keydown.enter.exact="enter" />
      <button class="vp-chat__send" type="submit" :disabled="waiting || !draft.trim()" :aria-label="say('send')" :title="say('send')"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M12 6l6 6-6 6" /></svg></button>
    </form>
  </div>
</template>
<script>
// A chat with an assistant. What is written is sent, with what was said before, to the address of your own
// chat service ("Ask at"), and its answer is shown. Until an address is given it answers with a line that
// says so, so the page can be designed first. Never put a secret key in the page: the service keeps it.
// Sent: { messages: [{ role, content }, …] } (and \`model\` when one is named). Read from the answer: \`reply\`,
// \`message\`, \`content\`, \`text\`, or the first choice of an OpenAI-style answer; plain text is used as it is.
// The words it says itself, in the site's language (App.vue's head says it: \`htmlAttrs: { lang }\`). A text
// that is filled in in the Props tab is said as it is written.
const WORDS = {
  en: { newChat: 'New chat', greeting: 'Hi! What can I help you with?', placeholder: 'Write a message…', message: 'Message', send: 'Send', answering: 'Answering', wrong: 'Something went wrong. Please try again in a moment.', noService: 'This is where the answer will be. Give the chat the address of your chat service ("Ask at") to make it real.' },
  nb: { newChat: 'Ny samtale', greeting: 'Hei! Hva kan jeg hjelpe deg med?', placeholder: 'Skriv en melding…', message: 'Melding', send: 'Send', answering: 'Svarer', wrong: 'Noe gikk galt. Prøv igjen om litt.', noService: 'Her kommer svaret. Gi chatten adressen til chattetjenesten din («Ask at») for å gjøre den ekte.' },
  sv: { newChat: 'Ny chatt', greeting: 'Hej! Vad kan jag hjälpa dig med?', placeholder: 'Skriv ett meddelande…', message: 'Meddelande', send: 'Skicka', answering: 'Svarar', wrong: 'Något gick fel. Försök igen om en stund.', noService: 'Här kommer svaret. Ge chatten adressen till din chattjänst (”Ask at”) för att göra den på riktigt.' },
  da: { newChat: 'Ny chat', greeting: 'Hej! Hvad kan jeg hjælpe dig med?', placeholder: 'Skriv en besked…', message: 'Besked', send: 'Send', answering: 'Svarer', wrong: 'Noget gik galt. Prøv igen om lidt.', noService: 'Her kommer svaret. Giv chatten adressen på din chattjeneste (»Ask at«) for at gøre den rigtig.' },
  fi: { newChat: 'Uusi keskustelu', greeting: 'Hei! Miten voin auttaa?', placeholder: 'Kirjoita viesti…', message: 'Viesti', send: 'Lähetä', answering: 'Vastaa', wrong: 'Jokin meni vikaan. Yritä hetken päästä uudelleen.', noService: 'Tähän tulee vastaus. Anna chatille chat-palvelusi osoite (”Ask at”), niin se toimii oikeasti.' },
  de: { newChat: 'Neuer Chat', greeting: 'Hallo! Wobei kann ich dir helfen?', placeholder: 'Nachricht schreiben…', message: 'Nachricht', send: 'Senden', answering: 'Antwortet', wrong: 'Etwas ist schiefgelaufen. Bitte versuche es gleich noch einmal.', noService: 'Hier erscheint die Antwort. Gib dem Chat die Adresse deines Chat-Dienstes („Ask at“), damit er echt antwortet.' },
  fr: { newChat: 'Nouvelle conversation', greeting: 'Bonjour ! Comment puis-je vous aider ?', placeholder: 'Écrivez un message…', message: 'Message', send: 'Envoyer', answering: 'Réponse en cours', wrong: 'Un problème est survenu. Veuillez réessayer dans un instant.', noService: 'La réponse apparaîtra ici. Donnez au chat l’adresse de votre service de chat (« Ask at ») pour qu’il réponde vraiment.' },
  es: { newChat: 'Nueva conversación', greeting: '¡Hola! ¿En qué puedo ayudarte?', placeholder: 'Escribe un mensaje…', message: 'Mensaje', send: 'Enviar', answering: 'Respondiendo', wrong: 'Algo ha ido mal. Inténtalo de nuevo en un momento.', noService: 'Aquí aparecerá la respuesta. Da al chat la dirección de tu servicio de chat («Ask at») para que funcione de verdad.' },
  it: { newChat: 'Nuova chat', greeting: 'Ciao! Come posso aiutarti?', placeholder: 'Scrivi un messaggio…', message: 'Messaggio', send: 'Invia', answering: 'Sta rispondendo', wrong: 'Qualcosa è andato storto. Riprova tra un momento.', noService: 'Qui apparirà la risposta. Dai alla chat l’indirizzo del tuo servizio di chat («Ask at») per renderla reale.' },
  nl: { newChat: 'Nieuw gesprek', greeting: 'Hoi! Waarmee kan ik je helpen?', placeholder: 'Schrijf een bericht…', message: 'Bericht', send: 'Versturen', answering: 'Bezig met antwoorden', wrong: 'Er ging iets mis. Probeer het zo meteen opnieuw.', noService: 'Hier komt het antwoord. Geef de chat het adres van je chatdienst („Ask at”) om hem echt te maken.' },
  pt: { newChat: 'Nova conversa', greeting: 'Olá! Em que posso ajudar?', placeholder: 'Escreva uma mensagem…', message: 'Mensagem', send: 'Enviar', answering: 'A responder', wrong: 'Algo correu mal. Tente novamente daqui a pouco.', noService: 'A resposta aparecerá aqui. Dê ao chat o endereço do seu serviço de chat («Ask at») para o tornar real.' },
  pl: { newChat: 'Nowa rozmowa', greeting: 'Cześć! W czym mogę pomóc?', placeholder: 'Napisz wiadomość…', message: 'Wiadomość', send: 'Wyślij', answering: 'Odpowiada', wrong: 'Coś poszło nie tak. Spróbuj ponownie za chwilę.', noService: 'Tutaj pojawi się odpowiedź. Podaj czatowi adres swojej usługi czatu („Ask at”), aby działał naprawdę.' },
  zh: { newChat: '新对话', greeting: '你好！有什么可以帮你？', placeholder: '输入消息…', message: '消息', send: '发送', answering: '正在回答', wrong: '出了点问题，请稍后重试。', noService: '回答会显示在这里。请给聊天填写你的聊天服务地址（“Ask at”），让它真正工作。' },
  ja: { newChat: '新しいチャット', greeting: 'こんにちは！何かお手伝いできることはありますか？', placeholder: 'メッセージを入力…', message: 'メッセージ', send: '送信', answering: '回答中', wrong: '問題が発生しました。しばらくしてからもう一度お試しください。', noService: 'ここに回答が表示されます。チャットにチャットサービスのアドレス（「Ask at」）を設定すると実際に動きます。' }
}

export default {
  emits: ['asked', 'answered'],
  props: {
    endpoint: { type: String, default: '', label: 'Ask at', placeholder: 'The address of your chat service' },
    model: { type: String, default: '', label: 'Model (when the service wants one)' },
    system: { type: String, default: '', label: 'How it should behave', control: 'textarea', placeholder: 'You are a helpful assistant for …' },
    showGreeting: { type: Boolean, default: true, label: 'Start with a first line' },
    greeting: { type: String, default: '', label: 'First line', control: 'textarea', placeholder: 'Hi! What can I help you with?' },
    placeholder: { type: String, default: '', label: 'Shown while empty', placeholder: 'Write a message…' },
    ideas: {
      type: Array,
      default: () => [{ text: 'What can you do?' }, { text: 'Give me an example' }],
      label: 'Suggested questions',
      control: 'list',
      fields: [{ key: 'text', label: 'Question' }]
    },
    height: { type: String, default: '', label: 'Height', control: 'slider', unit: 'px', min: 240, max: 1000 },
    color: { type: String, default: '', label: 'Color', control: 'color' },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 40 }
  },
  data() {
    return { said: [], draft: '', waiting: false }
  },
  created() {
    // Which question is being answered: a new chat (or leaving the page) stops the one on its way
    this.turn = 0
    this.control = null
  },
  beforeUnmount() {
    this.stop()
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
        '--vp-chat-height': this.height || undefined,
        '--vp-chat-color': this.color || undefined,
        '--vp-chat-radius': this.radius || undefined
      }
    }
  },
  methods: {
    say(key, own, n) {
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return String(own || (words[key] ?? WORDS.en[key])).replace(/\\{(n|name)\\}/g, n ?? '')
    },
    // Enter sends, unless it is choosing a word in an input method (Chinese, Japanese …)
    enter(event) {
      if (event.isComposing || event.keyCode === 229) return
      event.preventDefault()
      this.ask(this.draft)
    },
    async ask(text) {
      text = String(text || '').trim()
      if (!text || this.waiting) return
      this.draft = ''
      this.said.push({ role: 'user', content: text })
      this.$emit('asked', text)
      this.waiting = true
      this.down()
      // (what the chat says itself, not the service, is shown but never sent back to it)
      let answer, local = false
      const turn = ++this.turn
      const control = typeof AbortController === 'function' ? new AbortController() : null
      this.control = control
      try {
        if (this.endpoint) answer = await this.answer(control && control.signal)
        else { answer = this.say('noService'); local = true }
      } catch (e) {
        answer = this.say('wrong')
        local = true
      }
      if (turn !== this.turn) return
      this.control = null
      this.waiting = false
      this.said.push(local ? { role: 'assistant', content: answer, local } : { role: 'assistant', content: answer })
      this.$emit('answered', answer)
      this.down()
    },
    // Stops the answer on its way, if there is one
    stop() {
      this.turn++
      if (this.control) this.control.abort()
      this.control = null
      this.waiting = false
    },
    // A new chat: what was said is gone, and an answer still on its way is stopped
    clear() {
      this.stop()
      this.said = []
      this.$nextTick(() => this.$refs.input && this.$refs.input.focus())
    },
    async answer(signal) {
      const messages = (this.system ? [{ role: 'system', content: this.system }] : []).concat(this.said.filter(one => !one.local).map(one => ({ role: one.role, content: one.content })))
      const body = this.model ? { model: this.model, messages } : { messages }
      const response = await fetch(this.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(body), signal: signal || undefined })
      if (!response.ok) throw new Error(String(response.status))
      const raw = await response.text()
      let data
      try {
        data = JSON.parse(raw)
      } catch (e) {
        return raw.trim()
      }
      const first = data && data.choices && data.choices[0]
      const found = [data && data.reply, data && data.message && data.message.content, data && data.message, data && data.content, data && data.text, first && first.message && first.message.content, first && first.text]
        .find(one => typeof one === 'string' && one.trim())
      if (!found) throw new Error('no answer')
      return found.trim()
    },
    down() {
      this.$nextTick(() => {
        const list = this.$refs.list
        if (list) list.scrollTop = list.scrollHeight
      })
    }
  }
}
<\/script>
<style>
.vp-chat { --vp-chat-ink: var(--vp-chat-color, var(--vp-primary, #2563eb)); box-sizing: border-box; display: flex; flex-direction: column; width: 100%; height: var(--vp-chat-height, 520px); max-height: 90vh; overflow: hidden; border: 1px solid var(--vp-border, #e5e7eb); border-radius: var(--vp-chat-radius, var(--vp-radius, 14px)); background: var(--vp-card, var(--vp-background, #fff)); color: var(--vp-text, #111827); text-align: left; box-shadow: 0 1px 2px color-mix(in oklch, var(--vp-text, #111827) 5%, transparent), 0 18px 40px -24px color-mix(in oklch, var(--vp-text, #111827) 28%, transparent); }
.vp-chat__list { flex: 1; display: flex; flex-direction: column; gap: 0.5rem; overflow-y: auto; overscroll-behavior: contain; padding: 1.25rem 1.25rem 1rem; scrollbar-width: thin; scrollbar-color: color-mix(in oklch, var(--vp-text, #111827) 18%, transparent) transparent; }
.vp-chat__message { display: flex; animation: vp-chat-in 240ms cubic-bezier(0.2, 0.8, 0.2, 1) both; }
.vp-chat__message--me { justify-content: flex-end; }
/* (a little more air where the speaker changes) */
.vp-chat__message--me + .vp-chat__message--them, .vp-chat__message--them + .vp-chat__message--me { margin-top: 0.4rem; }
.vp-chat__bubble { max-width: min(82%, 40em); padding: 0.7em 1em; border-radius: 1.15em; background: var(--vp-surface, #f1f3f6); font-size: 0.95rem; line-height: 1.5; white-space: pre-wrap; overflow-wrap: anywhere; }
.vp-chat__message--me .vp-chat__bubble { background: var(--vp-chat-ink); color: var(--vp-primary-contrast, #fff); border-bottom-right-radius: 0.35em; box-shadow: 0 6px 14px -10px var(--vp-chat-ink); }
.vp-chat__message--them .vp-chat__bubble { border: 1px solid color-mix(in oklch, var(--vp-text, #111827) 6%, transparent); border-bottom-left-radius: 0.35em; }
.vp-chat__bubble--waiting { display: inline-flex; align-items: center; gap: 0.3em; padding: 0.95em 1.05em; }
.vp-chat__bubble--waiting span { width: 0.42em; height: 0.42em; border-radius: 50%; background: currentColor; opacity: 0.35; animation: vp-chat-wait 1s infinite ease-in-out; }
.vp-chat__bubble--waiting span:nth-child(2) { animation-delay: 0.15s; }
.vp-chat__bubble--waiting span:nth-child(3) { animation-delay: 0.3s; }
.vp-chat__ideas { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: auto; padding-top: 1rem; }
.vp-chat__idea { min-height: 2.25rem; padding: 0.45em 0.95em; border: 1px solid var(--vp-border, #e5e7eb); border-radius: 999px; background: var(--vp-background, transparent); color: inherit; font: inherit; font-size: 0.875rem; font-weight: 500; line-height: 1.3; text-align: left; cursor: pointer; transition: border-color 160ms ease, color 160ms ease, background-color 160ms ease, transform 160ms ease; }
.vp-chat__idea:hover { border-color: var(--vp-chat-ink); background: color-mix(in oklch, var(--vp-chat-ink) 8%, transparent); color: var(--vp-chat-ink); transform: translateY(-1px); }
.vp-chat__idea:focus-visible { outline: 2px solid var(--vp-chat-ink); outline-offset: 2px; }
.vp-chat__form { display: flex; align-items: flex-end; gap: 0.5rem; padding: 0.75rem 0.85rem; border-top: 1px solid var(--vp-border, #e5e7eb); background: color-mix(in oklch, var(--vp-surface, #f1f3f6) 55%, transparent); }
.vp-chat__input { flex: 1; box-sizing: border-box; min-width: 0; min-height: 2.75rem; max-height: 9rem; padding: 0.68em 1em; border: 1px solid var(--vp-border, #e5e7eb); border-radius: 1.375rem; background: var(--vp-background, #fff); color: inherit; font: inherit; font-size: max(1rem, 16px); line-height: 1.4; resize: none; field-sizing: content; transition: border-color 160ms ease, box-shadow 160ms ease; }
.vp-chat__input::placeholder { color: var(--vp-muted, #6b7280); opacity: 0.85; }
.vp-chat__input:hover { border-color: color-mix(in oklch, var(--vp-text, #111827) 30%, var(--vp-border, #e5e7eb)); }
.vp-chat__input:focus { outline: 2px solid var(--vp-chat-ink); outline-offset: -1px; border-color: transparent; box-shadow: 0 0 0 4px color-mix(in oklch, var(--vp-chat-ink) 16%, transparent); }
.vp-chat__new { flex: none; display: flex; align-items: center; justify-content: center; width: 2.75rem; height: 2.75rem; padding: 0; border: 1px solid var(--vp-border, #e5e7eb); border-radius: 50%; background: var(--vp-background, transparent); color: var(--vp-muted, inherit); cursor: pointer; transition: border-color 160ms ease, color 160ms ease; }
.vp-chat__new:hover { border-color: var(--vp-chat-ink); color: var(--vp-chat-ink); }
.vp-chat__new svg { width: 1.15rem; height: 1.15rem; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }
.vp-chat__send { flex: none; display: flex; align-items: center; justify-content: center; width: 2.75rem; height: 2.75rem; padding: 0; border: 0; border-radius: 50%; background: var(--vp-chat-ink); color: var(--vp-primary-contrast, #fff); cursor: pointer; box-shadow: 0 6px 14px -8px var(--vp-chat-ink); transition: transform 160ms ease, filter 160ms ease, opacity 160ms ease, box-shadow 160ms ease; }
.vp-chat__send:hover:not(:disabled) { filter: brightness(1.08); transform: translateY(-1px); }
.vp-chat__send:active:not(:disabled) { transform: scale(0.95); }
.vp-chat__send:disabled { opacity: 0.35; box-shadow: none; cursor: default; }
.vp-chat__send svg { width: 1.2rem; height: 1.2rem; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.vp-chat__new:focus-visible, .vp-chat__send:focus-visible { outline: 2px solid var(--vp-chat-ink); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  .vp-chat__bubble--waiting span { animation: none; opacity: 0.6; }
  .vp-chat__message { animation: none; }
  .vp-chat__idea, .vp-chat__send, .vp-chat__input, .vp-chat__new { transition: none; }
  .vp-chat__idea:hover, .vp-chat__send:hover:not(:disabled) { transform: none; }
}
@keyframes vp-chat-in {
  from { opacity: 0; transform: translateY(0.4em); }
}
@keyframes vp-chat-wait {
  0%, 80%, 100% { opacity: 0.25; transform: translateY(0); }
  40% { opacity: 0.9; transform: translateY(-0.2em); }
}
</style>
`;export{e as default};