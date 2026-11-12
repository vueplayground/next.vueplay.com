var e=`<template>
  <form class="vp-form" :class="'vp-form--' + state" :style="style" :action="action || undefined" method="post" @submit="send">
    <div v-if="state === 'sent'" class="vp-form__thanks" role="status">{{ thanks }}</div>
    <template v-else>
      <label v-for="(field, index) in fields" :key="index" class="vp-form__field" :class="'vp-form__field--' + kind(field)">
        <input v-if="kind(field) === 'checkbox'" class="vp-form__check" type="checkbox" :name="name(field, index)" :required="!!field.required" value="yes">
        <span class="vp-form__label">{{ field.label }}<span v-if="field.required" class="vp-form__must" aria-hidden="true"> *</span></span>
        <textarea v-if="kind(field) === 'textarea'" class="vp-form__input" rows="5" :name="name(field, index)" :placeholder="field.placeholder || undefined" :required="!!field.required" />
        <input v-else-if="kind(field) !== 'checkbox'" class="vp-form__input" :type="kind(field)" :name="name(field, index)" :placeholder="field.placeholder || undefined" :required="!!field.required">
      </label>
      <slot />
      <p v-if="state === 'failed'" class="vp-form__problem" role="alert">{{ problem }}</p>
      <button class="vp-form__button" type="submit" :disabled="state === 'sending'">{{ state === 'sending' ? 'Sending…' : button }}</button>
    </template>
  </form>
</template>
<script>
// A contact form: the fields you list, and a button that sends what was written. It is sent to the address
// of a form service ("Send to") without leaving the page, or, with only an e-mail address given, opened as
// a ready-written e-mail in the visitor's own mail program.
export default {
  props: {
    fields: {
      type: Array,
      default: () => [
        { label: 'Name', type: 'text', required: true },
        { label: 'E-mail', type: 'email', required: true },
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
          options: [{ key: 'A line of text', value: 'text' }, { key: 'E-mail', value: 'email' }, { key: 'Phone', value: 'tel' }, { key: 'Number', value: 'number' }, { key: 'Date', value: 'date' }, { key: 'Several lines', value: 'textarea' }, { key: 'A box to tick', value: 'checkbox' }]
        },
        { key: 'placeholder', label: 'Shown while empty' },
        { key: 'required', label: 'Must be filled in', control: 'boolean' }
      ]
    },
    button: { type: String, default: 'Send', label: 'Button text' },
    action: { type: String, default: '', label: 'Send to', placeholder: 'The address your form service gave you' },
    email: { type: String, default: '', label: 'Or to this e-mail', placeholder: 'you@example.com' },
    thanks: { type: String, default: 'Thank you! We will get back to you soon.', label: 'Said when sent', control: 'textarea' },
    problem: { type: String, default: 'It could not be sent. Please try again in a moment.', label: 'Said when it fails' },
    color: { type: String, default: '', label: 'Button color', control: 'color' },
    radius: { type: String, default: '', label: 'Round corners', control: 'slider', unit: 'px', min: 0, max: 30 }
  },
  data() {
    return { state: 'ready' }
  },
  computed: {
    style() {
      return { '--vp-form-color': this.color || undefined, '--vp-form-radius': this.radius || undefined }
    }
  },
  methods: {
    kind(field) {
      return ['text', 'email', 'tel', 'number', 'date', 'textarea', 'checkbox'].includes(field.type) ? field.type : 'text'
    },
    // what the field is called where it is sent: its label in small letters
    name(field, index) {
      return String(field.label || '').trim().toLowerCase().replace(/[^\\p{L}\\p{N}]+/gu, '_').replace(/^_|_$/g, '') || 'field_' + (index + 1)
    },
    async send(event) {
      const form = event.target
      if (!this.action) {
        event.preventDefault()
        if (!this.email) return
        // no service to send to: a ready-written e-mail in the visitor's own mail program
        const lines = this.fields.map((field, index) => {
          const input = form.elements[this.name(field, index)]
          return (field.label || 'Field ' + (index + 1)) + ': ' + (this.kind(field) === 'checkbox' ? (input && input.checked ? 'Yes' : 'No') : (input ? input.value : ''))
        })
        window.location.href = 'mailto:' + this.email + '?subject=' + encodeURIComponent(document.title || 'Message') + '&body=' + encodeURIComponent(lines.join('\\n'))
        this.state = 'sent'
        return
      }
      event.preventDefault()
      this.state = 'sending'
      try {
        const answer = await fetch(this.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        this.state = answer.ok ? 'sent' : 'failed'
      } catch (e) {
        this.state = 'failed'
      }
    }
  }
}
<\/script>
<style>
.vp-form {
  --_color: var(--vp-form-color, var(--vp-primary, #2563eb));
  --_radius: var(--vp-form-radius, var(--vp-radius, 8px));
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 34rem;
  min-width: 0;
  text-align: left;
}
.vp-form__field { display: flex; flex-direction: column; gap: 0.35rem; min-width: 0; }
.vp-form__field--checkbox { flex-direction: row; align-items: flex-start; gap: 0.6rem; cursor: pointer; }
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
.vp-form__check { flex: none; width: 1.1rem; height: 1.1rem; margin: 0.15rem 0 0; accent-color: var(--_color); }
.vp-form__button {
  align-self: flex-start;
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
  transition: filter 120ms ease;
}
.vp-form__button:hover { filter: brightness(1.08); }
.vp-form__button:disabled { opacity: 0.6; cursor: default; }
.vp-form__button:focus-visible { outline: 2px solid var(--_color); outline-offset: 2px; }
.vp-form__thanks { padding: 1.25rem; border-radius: var(--_radius); background: color-mix(in srgb, var(--_color) 10%, transparent); line-height: 1.6; white-space: pre-line; }
.vp-form__problem { margin: 0; color: #c0362c; font-size: 0.9375rem; }
</style>
`;export{e as default};