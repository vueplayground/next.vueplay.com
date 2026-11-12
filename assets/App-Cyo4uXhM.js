var e=`<template>
  <div class="vp-chat" :style="style">
    <div ref="list" class="vp-chat__list" aria-live="polite">
      <div v-if="greeting" class="vp-chat__message vp-chat__message--them"><div class="vp-chat__bubble">{{ greeting }}</div></div>
      <div v-for="(message, index) in said" :key="index" class="vp-chat__message" :class="'vp-chat__message--' + (message.role === 'user' ? 'me' : 'them')">
        <div class="vp-chat__bubble">{{ message.content }}</div>
      </div>
      <div v-if="waiting" class="vp-chat__message vp-chat__message--them"><div class="vp-chat__bubble vp-chat__bubble--waiting" aria-label="Answering"><span /><span /><span /></div></div>
      <div v-if="!said.length && ideas.length" class="vp-chat__ideas">
        <button v-for="(idea, index) in ideas" :key="index" type="button" class="vp-chat__idea" @click="ask(idea.text)">{{ idea.text }}</button>
      </div>
    </div>
    <form class="vp-chat__form" @submit.prevent="ask(draft)">
      <textarea v-model="draft" class="vp-chat__input" rows="1" :placeholder="placeholder" aria-label="Message" @keydown.enter.exact.prevent="ask(draft)" />
      <button class="vp-chat__send" type="submit" :disabled="waiting || !draft.trim()" aria-label="Send"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M12 6l6 6-6 6" /></svg></button>
    </form>
  </div>
</template>
<script>
// A chat with an assistant. What is written is sent, with what was said before, to the address of your own
// chat service ("Ask at"), and its answer is shown. Until an address is given it answers with a line that
// says so, so the page can be designed first. Never put a secret key in the page: the service keeps it.
// Sent: { messages: [{ role, content }, …] } (and \`model\` when one is named). Read from the answer: \`reply\`,
// \`message\`, \`content\`, \`text\`, or the first choice of an OpenAI-style answer; plain text is used as it is.
export default {
  emits: ['asked', 'answered'],
  props: {
    endpoint: { type: String, default: '', label: 'Ask at', placeholder: 'The address of your chat service' },
    model: { type: String, default: '', label: 'Model (when the service wants one)' },
    system: { type: String, default: '', label: 'How it should behave', control: 'textarea', placeholder: 'You are a helpful assistant for …' },
    greeting: { type: String, default: 'Hi! What can I help you with?', label: 'First line', control: 'textarea' },
    placeholder: { type: String, default: 'Write a message…', label: 'Shown while empty' },
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
  computed: {
    style() {
      return {
        '--vp-chat-height': this.height || undefined,
        '--vp-chat-color': this.color || undefined,
        '--vp-chat-radius': this.radius || undefined
      }
    }
  },
  methods: {
    async ask(text) {
      text = String(text || '').trim()
      if (!text || this.waiting) return
      this.draft = ''
      this.said.push({ role: 'user', content: text })
      this.$emit('asked', text)
      this.waiting = true
      this.down()
      let answer
      try {
        answer = await this.answer()
      } catch (e) {
        answer = 'Something went wrong. Please try again in a moment.'
      }
      this.waiting = false
      this.said.push({ role: 'assistant', content: answer })
      this.$emit('answered', answer)
      this.down()
    },
    async answer() {
      if (!this.endpoint) return 'This is where the answer will be. Give the chat the address of your chat service ("Ask at") to make it real.'
      const messages = (this.system ? [{ role: 'system', content: this.system }] : []).concat(this.said)
      const body = this.model ? { model: this.model, messages } : { messages }
      const response = await fetch(this.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(body) })
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
.vp-chat { box-sizing: border-box; display: flex; flex-direction: column; width: 100%; height: var(--vp-chat-height, 520px); max-height: 90vh; overflow: hidden; border: 1px solid var(--vp-border, #e5e7eb); border-radius: var(--vp-chat-radius, var(--vp-radius, 14px)); background: var(--vp-card, var(--vp-background, #fff)); color: var(--vp-text, #111827); text-align: left; }
.vp-chat__list { flex: 1; display: flex; flex-direction: column; gap: 0.6rem; overflow-y: auto; padding: 1.1rem; }
.vp-chat__message { display: flex; }
.vp-chat__message--me { justify-content: flex-end; }
.vp-chat__bubble { max-width: min(80%, 40em); padding: 0.65em 0.95em; border-radius: 1.1em; background: var(--vp-surface, #f1f3f6); line-height: 1.5; white-space: pre-wrap; overflow-wrap: anywhere; }
.vp-chat__message--me .vp-chat__bubble { background: var(--vp-chat-color, var(--vp-primary, #2563eb)); color: var(--vp-primary-contrast, #fff); border-bottom-right-radius: 0.3em; }
.vp-chat__message--them .vp-chat__bubble { border-bottom-left-radius: 0.3em; }
.vp-chat__bubble--waiting { display: inline-flex; gap: 0.3em; padding: 0.9em 1em; }
.vp-chat__bubble--waiting span { width: 0.45em; height: 0.45em; border-radius: 50%; background: currentColor; opacity: 0.35; animation: vp-chat-wait 1s infinite ease-in-out; }
.vp-chat__bubble--waiting span:nth-child(2) { animation-delay: 0.15s; }
.vp-chat__bubble--waiting span:nth-child(3) { animation-delay: 0.3s; }
.vp-chat__ideas { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: auto; padding-top: 0.75rem; }
.vp-chat__idea { padding: 0.45em 0.9em; border: 1px solid var(--vp-border, #e5e7eb); border-radius: 999px; background: transparent; color: inherit; font: inherit; font-size: 0.9rem; cursor: pointer; }
.vp-chat__idea:hover { border-color: var(--vp-chat-color, var(--vp-primary, #2563eb)); color: var(--vp-chat-color, var(--vp-primary, #2563eb)); }
.vp-chat__form { display: flex; align-items: flex-end; gap: 0.5rem; padding: 0.75rem; border-top: 1px solid var(--vp-border, #e5e7eb); }
.vp-chat__input { flex: 1; box-sizing: border-box; min-height: 2.6rem; max-height: 9rem; padding: 0.65em 0.9em; border: 1px solid var(--vp-border, #e5e7eb); border-radius: 1.3rem; background: transparent; color: inherit; font: inherit; line-height: 1.4; resize: none; field-sizing: content; }
.vp-chat__input:focus { outline: 2px solid var(--vp-chat-color, var(--vp-primary, #2563eb)); outline-offset: -1px; border-color: transparent; }
.vp-chat__send { flex: none; display: flex; align-items: center; justify-content: center; width: 2.6rem; height: 2.6rem; padding: 0; border: 0; border-radius: 50%; background: var(--vp-chat-color, var(--vp-primary, #2563eb)); color: var(--vp-primary-contrast, #fff); cursor: pointer; }
.vp-chat__send:disabled { opacity: 0.4; cursor: default; }
.vp-chat__send svg { width: 1.2rem; height: 1.2rem; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
@keyframes vp-chat-wait {
  0%, 80%, 100% { opacity: 0.25; transform: translateY(0); }
  40% { opacity: 0.9; transform: translateY(-0.2em); }
}
</style>
`;export{e as default};