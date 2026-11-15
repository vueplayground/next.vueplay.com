var e=`<template>
  <div class="vp-signed-in" :class="{ 'vp-signed-in--studio': inStudio }" :data-for="studioLabel">
    <slot v-if="inStudio || shown" />
  </div>
</template>
<script>
// What is put inside it is shown only to visitors who are signed in (a member's page, a Sign out button), or
// only to those who are not (a Sign in button, a "join us"). The source in Data that visitors sign in with
// says who is. In the Studio it is always shown, marked with who sees it.
export default {
  inject: { vpData: { default: null } },
  props: {
    show: { type: String, default: 'in', label: 'Shown to', control: 'select', options: [{ key: 'Visitors who are signed in', value: 'in' }, { key: 'Visitors who are not', value: 'out' }] }
  },
  computed: {
    inStudio() {
      return typeof document !== 'undefined' && (!!document.getElementById('receiver') || !!window.studio)
    },
    shown() {
      const signedIn = !!this.vpData?.auth?.user
      return this.show === 'out' ? !signedIn : signedIn
    },
    studioLabel() {
      return this.inStudio ? (this.show === 'out' ? 'Shown to visitors who are not signed in' : 'Shown to visitors who are signed in') : undefined
    }
  }
}
<\/script>
<style>
.vp-signed-in { display: contents; }
.vp-signed-in--studio {
  position: relative;
  display: block;
  min-height: 2.5rem;
  outline: 1.5px dashed color-mix(in srgb, var(--vp-primary, #2563eb) 45%, transparent);
  outline-offset: 4px;
}
.vp-signed-in--studio::before {
  content: attr(data-for);
  position: absolute;
  top: -1.55rem;
  left: 0;
  padding: 0.1rem 0.45rem;
  border-radius: 4px;
  background: color-mix(in srgb, var(--vp-primary, #2563eb) 12%, transparent);
  color: var(--vp-primary, #2563eb);
  font-size: 0.6875rem;
  font-weight: 600;
  white-space: nowrap;
}
</style>
`;export{e as default};