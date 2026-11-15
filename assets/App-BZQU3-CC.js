var e=`<template>
  <ul v-if="branch" class="vp-nav-menu__subs" :class="{ 'vp-nav-menu__subs--inline': inline }">
    <li
      v-for="(node, n) in branch"
      :key="n"
      class="vp-nav-menu__node"
      :class="{ 'vp-nav-menu__node--open': sub === n }"
      @mouseenter="subHover(n)"
      @mouseleave="subLeave(n)"
    >
      <a
        v-if="!node.children.length"
        class="vp-nav-menu__sub"
        :class="{ 'vp-nav-menu__sub--active': node.active }"
        :href="node.href || undefined"
        :target="node.newTab ? '_blank' : undefined"
        :rel="node.newTab ? 'noopener' : undefined"
        :aria-current="node.active ? 'page' : undefined"
        @click="$emit('chosen')"
      >
        <svg v-if="node.icon" class="vp-nav-menu__sub-icon" viewBox="0 0 24 24" aria-hidden="true"><path v-for="(d, i) in paths(node.icon)" :key="i" :d="d" /></svg>
        <span class="vp-nav-menu__sub-words"><b>{{ node.label }}<span v-if="node.badge" class="vp-nav-menu__badge">{{ node.badge }}</span></b><small v-if="node.description">{{ node.description }}</small></span>
      </a>
      <button
        v-else
        type="button"
        class="vp-nav-menu__sub vp-nav-menu__sub--parent"
        :class="{ 'vp-nav-menu__sub--active': node.active }"
        :aria-expanded="sub === n ? 'true' : 'false'"
        aria-haspopup="true"
        @click="toggleSub(n)"
        @keydown.right.prevent="!inline && toggleSub(n, true)"
      >
        <svg v-if="node.icon" class="vp-nav-menu__sub-icon" viewBox="0 0 24 24" aria-hidden="true"><path v-for="(d, i) in paths(node.icon)" :key="i" :d="d" /></svg>
        <span class="vp-nav-menu__sub-words"><b>{{ node.label }}<span v-if="node.badge" class="vp-nav-menu__badge">{{ node.badge }}</span></b><small v-if="node.description">{{ node.description }}</small></span>
        <svg class="vp-nav-menu__more" viewBox="0 0 24 24" aria-hidden="true"><path :d="inline ? 'M6 9l6 6 6-6' : 'M9 6l6 6-6 6'" /></svg>
      </button>
      <div v-if="node.children.length && sub === n" class="vp-nav-menu__fly" :class="{ 'vp-nav-menu__fly--left': flipped }" @keydown.left.stop.prevent="!inline && closeSub(n)">
        <VpNavMenu :branch="node.children" :inline="inline" :opens="opens" @chosen="$emit('chosen')" />
      </div>
    </li>
  </ul>
  <nav
    v-else
    class="vp-nav-menu"
    :class="classes"
    :style="style"
    :aria-label="say('menu', label)"
    @keydown.esc="closeAll"
  >
    <!-- on a phone: a button that opens the menu -->
    <button
      v-if="folded"
      type="button"
      class="vp-nav-menu__toggle"
      :aria-expanded="open ? 'true' : 'false'"
      :aria-label="open ? say('close') : say('open')"
      @click="open = !open"
    >
      <span class="vp-nav-menu__burger" aria-hidden="true"><i /><i /><i /></span>
      <span v-if="toggleText" class="vp-nav-menu__toggle-text">{{ toggleText }}</span>
    </button>

    <!-- the menu itself: in the row (or column), or in the drawer, the panel or the screen on a phone. The drawer
         and the screen are moved to the end of the page: a header with a blur or a transform would hold them -->
    <Teleport to="body" :disabled="!layered">
    <div ref="layer" :class="layered ? ['vp-nav-menu', 'vp-nav-menu--layer', ...classes] : 'vp-nav-menu__layer'" :style="layered ? style : undefined" @keydown.esc="closeAll">
    <div v-if="folded && open && phone !== 'dropdown'" class="vp-nav-menu__backdrop" @click="open = false" />
    <div
      class="vp-nav-menu__body"
      :class="{ 'vp-nav-menu__body--open': open }"
      :inert="folded && !open ? '' : undefined"
    >
      <button v-if="folded && phone !== 'dropdown'" type="button" class="vp-nav-menu__close" :aria-label="say('close')" @click="open = false">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
      <ul class="vp-nav-menu__list">
        <li
          v-for="(item, index) in tree"
          :key="index"
          class="vp-nav-menu__item"
          :class="{ 'vp-nav-menu__item--parent': item.children.length, 'vp-nav-menu__item--open': shown === index, 'vp-nav-menu__item--button': item.button }"
          :style="{ '--vp-nav-menu-i': index }"
          @mouseenter="hover(index)"
          @mouseleave="unhover(index)"
        >
          <component
            :is="item.href && !item.children.length ? 'a' : 'button'"
            class="vp-nav-menu__link"
            :class="{ 'vp-nav-menu__link--active': item.active }"
            :href="item.href && !item.children.length ? item.href : undefined"
            :type="item.href && !item.children.length ? undefined : 'button'"
            :target="item.newTab && item.href ? '_blank' : undefined"
            :rel="item.newTab && item.href ? 'noopener' : undefined"
            :aria-current="item.active ? 'page' : undefined"
            :aria-expanded="item.children.length ? (shown === index ? 'true' : 'false') : undefined"
            :aria-haspopup="item.children.length ? 'true' : undefined"
            @click="press(index, item, $event)"
            @keydown.down.prevent="item.children.length && openAndFocus(index)"
          >
            <svg v-if="item.icon" class="vp-nav-menu__icon" viewBox="0 0 24 24" aria-hidden="true"><path v-for="(d, n) in paths(item.icon)" :key="n" :d="d" /></svg>
            <span class="vp-nav-menu__label">{{ item.label }}</span>
            <span v-if="item.badge" class="vp-nav-menu__badge">{{ item.badge }}</span>
            <svg v-if="item.children.length" class="vp-nav-menu__caret" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
          </component>

          <!-- what opens from it: a list, or a large panel with columns -->
          <div v-if="item.children.length" class="vp-nav-menu__drop" :class="'vp-nav-menu__drop--' + dropdown" :style="{ '--vp-nav-menu-cols': Math.min(3, item.children.some(child => child.children.length) ? item.children.length : Math.ceil(item.children.length / 3)) || 1 }" :hidden="shown !== index ? true : undefined">
            <div class="vp-nav-menu__drop-inner">
              <template v-if="dropdown === 'mega' && !folded && direction !== 'column'">
                <template v-for="(child, c) in item.children" :key="c">
                  <div v-if="child.children.length" class="vp-nav-menu__group">
                    <div class="vp-nav-menu__group-title">{{ child.label }}</div>
                    <VpNavMenu :branch="child.children" inline :opens="opens" @chosen="chosen" />
                  </div>
                  <VpNavMenu v-else :branch="[child]" inline :opens="opens" @chosen="chosen" />
                </template>
              </template>
              <VpNavMenu v-else :branch="item.children" :inline="folded || direction === 'column'" :opens="opens" @chosen="chosen" />
            </div>
          </div>
        </li>
      </ul>
      <div v-if="$slots.default" class="vp-nav-menu__extra">
        <slot />
      </div>
      <div v-if="!items.length" class="vp-nav-menu__empty">{{ say('empty') }}</div>
    </div>
    </div>
    </Teleport>
  </nav>
</template>
<script>
// A menu of links for any part of a site: a row in the header, a column in a sidebar or a footer. A link can
// open more links under it (a dropdown, or a large panel with columns, pictures-as-icons and a line about each),
// stand out as a button, carry a small badge, and is marked while its page is open. On a phone it folds into a
// button that opens a drawer, a panel, the whole screen, or it becomes a row to scroll. Whatever is put in it
// (a button, a search) comes after the links, also on a phone.

// The words it says itself, in the site's language (App.vue's head says it: \`htmlAttrs: { lang }\`). A text
// that is filled in in the Props tab is said as it is written.
const WORDS = {
  en: { menu: 'Menu', open: 'Open the menu', close: 'Close the menu', empty: 'Add the menu’s links in the list' },
  nb: { menu: 'Meny', open: 'Åpne menyen', close: 'Lukk menyen', empty: 'Legg til menyens lenker i listen' },
  sv: { menu: 'Meny', open: 'Öppna menyn', close: 'Stäng menyn', empty: 'Lägg till menyns länkar i listan' },
  da: { menu: 'Menu', open: 'Åbn menuen', close: 'Luk menuen', empty: 'Tilføj menuens links i listen' },
  fi: { menu: 'Valikko', open: 'Avaa valikko', close: 'Sulje valikko', empty: 'Lisää valikon linkit luetteloon' },
  de: { menu: 'Menü', open: 'Menü öffnen', close: 'Menü schließen', empty: 'Füge die Links des Menüs in der Liste hinzu' },
  fr: { menu: 'Menu', open: 'Ouvrir le menu', close: 'Fermer le menu', empty: 'Ajoutez les liens du menu dans la liste' },
  es: { menu: 'Menú', open: 'Abrir el menú', close: 'Cerrar el menú', empty: 'Añade los enlaces del menú en la lista' },
  it: { menu: 'Menu', open: 'Apri il menu', close: 'Chiudi il menu', empty: 'Aggiungi i link del menu nell’elenco' },
  nl: { menu: 'Menu', open: 'Menu openen', close: 'Menu sluiten', empty: 'Voeg de links van het menu toe in de lijst' },
  pt: { menu: 'Menu', open: 'Abrir o menu', close: 'Fechar o menu', empty: 'Adicione os links do menu na lista' },
  pl: { menu: 'Menu', open: 'Otwórz menu', close: 'Zamknij menu', empty: 'Dodaj linki menu na liście' },
  zh: { menu: '菜单', open: '打开菜单', close: '关闭菜单', empty: '在列表中添加菜单的链接' },
  ja: { menu: 'メニュー', open: 'メニューを開く', close: 'メニューを閉じる', empty: 'リストにメニューのリンクを追加してください' }
}

export default {
  // (the menu draws the links under a link with itself, to any depth)
  name: 'VpNavMenu',
  props: {
    items: {
      type: Array,
      default: () => [
        { label: 'Home', href: '/', under: '', description: '', icon: '', badge: '', button: false, newTab: false },
        { label: 'Products', href: '', under: '', description: '', icon: '', badge: '', button: false, newTab: false },
        { label: 'For teams', href: '/teams', under: 'Products', description: 'Plan together, in one place.', icon: 'users', badge: '', button: false, newTab: false },
        { label: 'For one', href: '/solo', under: 'Products', description: 'Everything you need, nothing more.', icon: 'user', badge: 'New', button: false, newTab: false },
        { label: 'About', href: '/about', under: '', description: '', icon: '', badge: '', button: false, newTab: false },
        { label: 'Contact', href: '/contact', under: '', description: '', icon: '', badge: '', button: true, newTab: false }
      ],
      label: 'Links',
      control: 'list',
      fields: [
        { key: 'label', label: 'Text' },
        { key: 'href', label: 'Goes to', placeholder: '/page, #anchor or https://…' },
        { key: 'under', label: 'Under (the text of the link it opens from)' },
        { key: 'description', label: 'A line about it (in large panels)' },
        {
          key: 'icon',
          label: 'Icon',
          control: 'icons',
          options: [
            { key: 'None', value: '' },
            { key: 'Home', value: 'home', icon: 'M3 11l9-7 9 7|M5 10v10h14V10|M10 20v-6h4v6' },
            { key: 'Person', value: 'user', icon: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z|M4 21a8 8 0 0 1 16 0' },
            { key: 'People', value: 'users', icon: 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z|M2 21a7 7 0 0 1 14 0|M16 3.5a4 4 0 0 1 0 7.5|M22 21a7 7 0 0 0-4-6.3' },
            { key: 'Star', value: 'star', icon: 'M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z' },
            { key: 'Heart', value: 'heart', icon: 'M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9z' },
            { key: 'Mail', value: 'mail', icon: 'M3 6h18v12H3z|M3 7l9 6 9-6' },
            { key: 'Phone', value: 'phone', icon: 'M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z' },
            { key: 'Chat', value: 'chat', icon: 'M4 5h16v11H8l-4 4z' },
            { key: 'Cart', value: 'cart', icon: 'M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.5L21 8H6|M9 21h.01|M18 21h.01' },
            { key: 'Tag', value: 'tag', icon: 'M3 12V3h9l9 9-9 9z|M8 8h.01' },
            { key: 'Book', value: 'book', icon: 'M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z|M20 4h-6v16a2 2 0 0 1 2-2h4z' },
            { key: 'Briefcase', value: 'briefcase', icon: 'M3 7h18v13H3z|M8 7V4h8v3|M3 13h18' },
            { key: 'Chart', value: 'chart', icon: 'M4 20V10|M10 20V4|M16 20v-7|M22 20H2' },
            { key: 'Rocket', value: 'rocket', icon: 'M12 15l-3-3c1.5-5 5-8 10-9-1 5-4 8.5-9 10|M9 12l-4 1-2 4 4-1|M12 15l-1 4 4-2 1-4|M15 9h.01' },
            { key: 'Globe', value: 'globe', icon: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z|M3 12h18|M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z' },
            { key: 'Pin', value: 'pin', icon: 'M12 21s-7-6-7-12a7 7 0 0 1 14 0c0 6-7 12-7 12z|M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
            { key: 'Calendar', value: 'calendar', icon: 'M4 5h16v16H4z|M4 10h16|M8 3v4|M16 3v4' },
            { key: 'Picture', value: 'image', icon: 'M3 5h18v14H3z|M3 16l5-5 4 4 3-3 6 6|M15 9h.01' },
            { key: 'Play', value: 'play', icon: 'M7 4l13 8-13 8z' },
            { key: 'Code', value: 'code', icon: 'M8 7l-5 5 5 5|M16 7l5 5-5 5|M14 4l-4 16' },
            { key: 'Settings', value: 'settings', icon: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z|M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2-1.2L14 3h-4l-.5 2.6a7 7 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6a7 7 0 0 0 0 2.4l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 2 1.2L10 21h4l.5-2.6a7 7 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2z' },
            { key: 'Lock', value: 'lock', icon: 'M5 11h14v10H5z|M8 11V7a4 4 0 0 1 8 0v4' },
            { key: 'Help', value: 'help', icon: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z|M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.7v.5|M12 17h.01' },
            { key: 'Bolt', value: 'bolt', icon: 'M13 2L4 14h7l-1 8 9-12h-7z' },
            { key: 'Search', value: 'search', icon: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z|M21 21l-5-5' },
          ]
        },
        { key: 'badge', label: 'Badge', placeholder: 'New' },
        { key: 'button', label: 'Shown as a button', control: 'boolean' },
        { key: 'newTab', label: 'Opens in a new tab', control: 'boolean' }
      ]
    },
    look: {
      type: String,
      default: 'underline',
      label: 'Look',
      options: [
        { key: 'Plain', value: 'plain' }, { key: 'Line under', value: 'underline' }, { key: 'Pill', value: 'pill' },
        { key: 'Tabs', value: 'tabs' }, { key: 'Boxes', value: 'boxed' }, { key: 'Glass', value: 'glass' }
      ]
    },
    direction: {
      type: String,
      default: 'row',
      label: 'Direction',
      options: [{ key: 'In a row', value: 'row' }, { key: 'In a column', value: 'column' }]
    },
    align: {
      type: String,
      default: 'end',
      label: 'Placed',
      options: [{ key: 'At the start', value: 'start' }, { key: 'In the middle', value: 'center' }, { key: 'At the end', value: 'end' }, { key: 'Spread out', value: 'spread' }]
    },
    size: {
      type: String,
      default: 'medium',
      label: 'Size',
      options: [{ key: 'Small', value: 'small' }, { key: 'Medium', value: 'medium' }, { key: 'Large', value: 'large' }]
    },
    dropdown: {
      type: String,
      default: 'list',
      label: 'What opens from a link',
      options: [{ key: 'A list', value: 'list' }, { key: 'A large panel', value: 'mega' }]
    },
    opens: {
      type: String,
      default: 'hover',
      label: 'Opens',
      options: [{ key: 'When pointed at', value: 'hover' }, { key: 'When clicked', value: 'click' }]
    },
    phone: {
      type: String,
      default: 'drawer',
      label: 'On a phone',
      options: [
        { key: 'A drawer from the side', value: 'drawer' }, { key: 'A panel under it', value: 'dropdown' },
        { key: 'The whole screen', value: 'fullscreen' }, { key: 'A row to scroll', value: 'scroll' }, { key: 'As it is', value: 'none' }
      ]
    },
    phoneWidth: { type: Number, default: 768, label: 'A phone is narrower than (px)', control: 'number', min: 0, max: 1600 },
    side: {
      type: String,
      default: 'right',
      label: 'Drawer at the',
      options: [{ key: 'Right', value: 'right' }, { key: 'Left', value: 'left' }]
    },
    toggleText: { type: String, default: '', label: 'Text beside the menu button', placeholder: 'Menu' },
    gap: { type: String, default: '', label: 'Space between links', control: 'slider', unit: 'px', min: 0, max: 64 },
    color: { type: String, default: '', label: 'Text color', control: 'color' },
    accent: { type: String, default: '', label: 'Marked and pointed-at color', control: 'color' },
    panel: { type: String, default: '', label: 'Background of what opens', control: 'color' },
    label: { type: String, default: '', label: 'What it is', placeholder: 'For screen readers: Main menu' },
    branch: { type: Array, default: null, label: 'Links of a level (the menu sets it)', hidden: true },
    inline: { type: Boolean, default: false, label: 'Opens in place (the menu sets it)', hidden: true }
  },
  emits: ['chosen'],
  data() {
    // (the timer is kept off the reactive data)
    return { shown: null, open: false, narrow: false, here: '', sub: null, flipped: false }
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
    // the phone's way only where it is narrow, and where it folds
    folded() {
      return this.narrow && ['drawer', 'dropdown', 'fullscreen'].includes(this.phone)
    },
    // (the drawer and the whole screen, at the end of the page)
    layered() {
      return this.folded && this.phone !== 'dropdown'
    },
    classes() {
      return [
        'vp-nav-menu--' + this.look, 'vp-nav-menu--' + this.direction, 'vp-nav-menu--align-' + this.align, 'vp-nav-menu--' + this.size,
        { 'vp-nav-menu--folded': this.folded, ['vp-nav-menu--phone-' + this.phone]: this.narrow, ['vp-nav-menu--side-' + this.side]: this.folded && this.phone === 'drawer', 'vp-nav-menu--open': this.open }
      ]
    },
    style() {
      return {
        '--vp-nav-menu-gap': this.gap || undefined,
        '--vp-nav-menu-color': this.color || undefined,
        '--vp-nav-menu-accent': this.accent || undefined,
        '--vp-nav-menu-panel': this.panel || undefined
      }
    },
    // The links as a tree: those under no other link at the top, each with the ones under it (and theirs)
    tree() {
      const items = (this.items || []).filter(item => item && String(item.label || '').trim())
      const labels = new Set(items.map(item => String(item.label).trim()))
      const under = item => {
        const parent = String(item.under || '').trim()
        return parent && parent !== String(item.label).trim() && labels.has(parent) ? parent : ''
      }
      const make = (item, path) => {
        const name = String(item.label).trim()
        const children = path.length < 12 && !path.includes(name) ? items.filter(one => under(one) === name).map(one => make(one, [...path, name])) : []
        return {
          label: String(item.label).trim(), href: item.href || '', description: item.description || '', icon: item.icon || '',
          badge: item.badge || '', button: !!item.button, newTab: !!item.newTab, children,
          active: this.isHere(item.href) || children.some(child => child.active)
        }
      }
      return items.filter(item => !under(item)).map(item => make(item, []))
    }
  },
  watch: {
    open(value) {
      if (typeof document === 'undefined') return
      // (the page under a drawer or the whole screen does not scroll)
      if (this.folded && this.phone !== 'dropdown') document.documentElement.style.overflow = value ? 'hidden' : ''
      if (!value) this.shown = null
    },
    folded(value) {
      if (!value) this.open = false
    },
    phoneWidth() {
      this.listen()
    }
  },
  mounted() {
    // (a level of links listens to nothing of the page: the menu does)
    if (this.branch) return
    this.listen()
    this.where()
    document.addEventListener('click', this.outside)
    window.addEventListener('popstate', this.where)
  },
  beforeUnmount() {
    clearTimeout(this.timer)
    if (this.branch) return
    this.media?.removeEventListener?.('change', this.measure)
    document.removeEventListener('click', this.outside)
    window.removeEventListener('popstate', this.where)
    clearTimeout(this.timer)
    if (this.open && this.folded) document.documentElement.style.overflow = ''
  },
  methods: {
    say(key, own, n) {
      if (own) return own
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return String(words[key] ?? WORDS.en[key]).replace('{n}', n ?? '')
    },
    // (the drawings are the icon field's own options, written out where the Props tab reads them)
    paths(name) {
      const icons = this.$options.props.items.fields.find(field => field.key === 'icon')?.options || []
      const found = icons.find(one => one.value === name)
      return found?.icon ? found.icon.split('|') : []
    },
    // which page is open: the router's, where there is one, else the address
    where() {
      this.here = this.$route?.path || (typeof location !== 'undefined' ? location.pathname : '')
    },
    isHere(href) {
      const route = this.$route?.path ?? this.here
      if (!href || !route || /^(https?:|mailto:|tel:|#)/.test(href)) return false
      const path = href.split(/[?#]/)[0].replace(/\\/+$/, '') || '/'
      const now = String(route).replace(/\\/+$/, '') || '/'
      return path === '/' ? now === '/' : now === path || now.startsWith(path + '/')
    },
    listen() {
      if (typeof matchMedia !== 'function') return
      this.media?.removeEventListener?.('change', this.measure)
      this.media = matchMedia('(max-width: ' + Math.max(0, Number(this.phoneWidth) || 0) + 'px)')
      this.media.addEventListener?.('change', this.measure)
      this.measure()
    },
    measure() {
      this.narrow = !!this.media?.matches && Number(this.phoneWidth) > 0
    },
    // (what opened stays on the screen: moved in from an edge it would pass)
    keep(index) {
      this.$nextTick(() => {
        const drop = this.$el?.querySelectorAll?.('.vp-nav-menu__item')[index]?.querySelector('.vp-nav-menu__drop')
        if (!drop || this.folded || this.direction === 'column') return
        drop.style.removeProperty('--vp-nav-menu-shift')
        const box = drop.getBoundingClientRect()
        const room = document.documentElement.clientWidth - 8
        const shift = box.right > room ? room - box.right : box.left < 8 ? 8 - box.left : 0
        if (shift) drop.style.setProperty('--vp-nav-menu-shift', Math.round(shift) + 'px')
      })
    },
    // A level's link that opens more: on pointing (beside it), or a click (in place too)
    subHover(n) {
      if (this.inline || this.opens !== 'hover' || !this.branch?.[n]?.children.length) return
      if (typeof matchMedia === 'function' && matchMedia('(hover: none)').matches) return
      clearTimeout(this.timer)
      this.openSub(n)
    },
    subLeave(n) {
      if (this.inline || this.opens !== 'hover' || this.sub !== n) return
      clearTimeout(this.timer)
      this.timer = setTimeout(() => { if (this.sub === n) this.sub = null }, 260)
    },
    toggleSub(n, focus = false) {
      if (this.sub === n && !focus) this.sub = null
      else this.openSub(n, focus)
    },
    closeSub(n) {
      this.sub = null
      this.$nextTick(() => this.$el?.children?.[n]?.querySelector('.vp-nav-menu__sub')?.focus())
    },
    // (beside it, or at the other side where the screen ends)
    openSub(n, focus = false) {
      this.sub = n
      this.flipped = false
      this.$nextTick(() => {
        const fly = this.$el?.children?.[n]?.querySelector('.vp-nav-menu__fly')
        if (!fly) return
        if (!this.inline && fly.getBoundingClientRect().right > document.documentElement.clientWidth - 8) this.flipped = true
        if (focus) fly.querySelector('.vp-nav-menu__sub')?.focus()
      })
    },
    hover(index) {
      if (this.opens !== 'hover' || this.folded || !this.tree[index]?.children.length) return
      if (typeof matchMedia === 'function' && matchMedia('(hover: none)').matches) return
      clearTimeout(this.timer)
      this.shown = index
      this.keep(index)
    },
    unhover(index) {
      if (this.opens !== 'hover' || this.folded || this.shown !== index) return
      clearTimeout(this.timer)
      // (a moment to cross the gap to what opened)
      this.timer = setTimeout(() => { if (this.shown === index) this.shown = null }, 220)
    },
    press(index, item, event) {
      if (!item.children.length) return this.chosen()
      event.preventDefault()
      this.shown = this.shown === index ? null : index
      if (this.shown !== null) this.keep(index)
    },
    openAndFocus(index) {
      this.shown = index
      this.$nextTick(() => this.$el.querySelectorAll('.vp-nav-menu__item')[index]?.querySelector('.vp-nav-menu__sub')?.focus())
    },
    chosen() {
      this.open = false
      this.shown = null
      this.$nextTick(this.where)
    },
    closeAll() {
      const was = this.shown
      this.shown = null
      this.open = false
      if (was !== null) this.$el.querySelectorAll('.vp-nav-menu__item')[was]?.querySelector('.vp-nav-menu__link')?.focus()
    },
    outside(event) {
      const inside = this.$el?.contains?.(event.target) || this.$refs.layer?.contains?.(event.target)
      if (this.shown !== null && !inside) this.shown = null
    }
  }
}
<\/script>
<style>
.vp-nav-menu {
  --vp-nav-menu-text: var(--vp-nav-menu-color, currentColor);
  --vp-nav-menu-hi: var(--vp-nav-menu-accent, var(--vp-primary, #6366f1));
  --vp-nav-menu-bg: var(--vp-nav-menu-panel, var(--vp-background, #ffffff));
  --vp-nav-menu-pad-y: 8px;
  --vp-nav-menu-pad-x: 12px;
  --vp-nav-menu-font: 15px;
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  min-width: 0;
  color: var(--vp-nav-menu-text);
  font-size: var(--vp-nav-menu-font);
}
.vp-nav-menu--small { --vp-nav-menu-pad-y: 6px; --vp-nav-menu-pad-x: 10px; --vp-nav-menu-font: 14px; }
.vp-nav-menu--large { --vp-nav-menu-pad-y: 11px; --vp-nav-menu-pad-x: 16px; --vp-nav-menu-font: 17px; }
.vp-nav-menu--align-start { justify-content: flex-start; }
.vp-nav-menu--align-center { justify-content: center; }
.vp-nav-menu--align-end { justify-content: flex-end; }
.vp-nav-menu--align-spread .vp-nav-menu__body,
.vp-nav-menu--align-spread .vp-nav-menu__list { flex: 1; justify-content: space-between; }

.vp-nav-menu__body {
  display: flex;
  align-items: center;
  gap: var(--vp-nav-menu-gap, 4px);
  min-width: 0;
}
.vp-nav-menu__list {
  display: flex;
  align-items: center;
  gap: var(--vp-nav-menu-gap, 4px);
  margin: 0;
  padding: 0;
  list-style: none;
}
.vp-nav-menu--column,
.vp-nav-menu--column .vp-nav-menu__body,
.vp-nav-menu--column .vp-nav-menu__list {
  flex-direction: column;
  align-items: stretch;
}
.vp-nav-menu--column .vp-nav-menu__body { width: 100%; }
.vp-nav-menu__item {
  position: relative;
}
/* (what holds the links: no box of its own, in the menu or, on a phone, at the end of the page) */
.vp-nav-menu__layer,
.vp-nav-menu--layer { display: contents; }
.vp-nav-menu__link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  width: 100%;
  box-sizing: border-box;
  padding: var(--vp-nav-menu-pad-y) var(--vp-nav-menu-pad-x);
  border: 0;
  border-radius: var(--vp-radius, 10px);
  background: none;
  color: inherit;
  font: inherit;
  font-weight: 550;
  line-height: 1.2;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
}
.vp-nav-menu--column .vp-nav-menu__link { justify-content: flex-start; }
.vp-nav-menu__link:hover,
.vp-nav-menu__item--open > .vp-nav-menu__link { color: var(--vp-nav-menu-hi); }
.vp-nav-menu__link:focus-visible,
.vp-nav-menu__sub:focus-visible {
  outline: 2px solid var(--vp-nav-menu-hi);
  outline-offset: 2px;
}
.vp-nav-menu__link--active { color: var(--vp-nav-menu-hi); }
.vp-nav-menu__icon,
.vp-nav-menu__caret {
  flex: none;
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.vp-nav-menu__caret {
  width: 15px;
  height: 15px;
  margin-left: -2px;
  opacity: 0.7;
  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.vp-nav-menu__item--open > .vp-nav-menu__link .vp-nav-menu__caret { transform: rotate(180deg); }
.vp-nav-menu--column .vp-nav-menu__caret { margin-left: auto; }
.vp-nav-menu__badge {
  display: inline-block;
  margin-left: 6px;
  padding: 2px 7px;
  border-radius: 999px;
  background: color-mix(in oklch, var(--vp-nav-menu-hi) 14%, transparent);
  color: var(--vp-nav-menu-hi);
  font-size: 0.7em;
  font-weight: 700;
  letter-spacing: 0.02em;
  vertical-align: 1px;
}

/* Looks */
.vp-nav-menu--underline .vp-nav-menu__link::after {
  content: '';
  position: absolute;
  left: var(--vp-nav-menu-pad-x);
  right: var(--vp-nav-menu-pad-x);
  bottom: 2px;
  height: 2px;
  border-radius: 2px;
  background: var(--vp-nav-menu-hi);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.vp-nav-menu--underline .vp-nav-menu__link:hover::after,
.vp-nav-menu--underline .vp-nav-menu__link--active::after { transform: scaleX(1); }
.vp-nav-menu--column.vp-nav-menu--underline .vp-nav-menu__link::after { left: 0; right: auto; top: 20%; bottom: 20%; width: 3px; height: auto; transform: scaleY(0); transform-origin: top; }
.vp-nav-menu--column.vp-nav-menu--underline .vp-nav-menu__link:hover::after,
.vp-nav-menu--column.vp-nav-menu--underline .vp-nav-menu__link--active::after { transform: scaleY(1); }
.vp-nav-menu--pill .vp-nav-menu__link { border-radius: 999px; }
.vp-nav-menu--pill .vp-nav-menu__link:hover { background: color-mix(in oklch, var(--vp-nav-menu-hi) 8%, transparent); }
.vp-nav-menu--pill .vp-nav-menu__link--active { background: color-mix(in oklch, var(--vp-nav-menu-hi) 14%, transparent); }
.vp-nav-menu--tabs .vp-nav-menu__list {
  padding: 4px;
  border-radius: calc(var(--vp-radius, 10px) + 4px);
  background: color-mix(in oklch, var(--vp-text, #111827) 6%, transparent);
}
.vp-nav-menu--tabs .vp-nav-menu__link:hover { color: inherit; background: color-mix(in oklch, var(--vp-background, #fff) 60%, transparent); }
.vp-nav-menu--tabs .vp-nav-menu__link--active {
  background: var(--vp-background, #fff);
  color: var(--vp-nav-menu-hi);
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.1), 0 1px 1px rgb(0 0 0 / 0.04);
}
.vp-nav-menu--boxed .vp-nav-menu__link { border: 1px solid var(--vp-border, #e5e7eb); }
.vp-nav-menu--boxed .vp-nav-menu__link:hover,
.vp-nav-menu--boxed .vp-nav-menu__link--active { border-color: var(--vp-nav-menu-hi); }
.vp-nav-menu--glass:not(.vp-nav-menu--folded) .vp-nav-menu__list {
  padding: 5px;
  border: 1px solid color-mix(in oklch, currentColor 14%, transparent);
  border-radius: 999px;
  background: color-mix(in oklch, currentColor 10%, transparent);
  backdrop-filter: blur(14px) saturate(1.4);
  box-shadow: 0 8px 30px rgb(0 0 0 / 0.08);
}
.vp-nav-menu--glass .vp-nav-menu__link { border-radius: 999px; }
.vp-nav-menu--glass .vp-nav-menu__link:hover { color: inherit; background: color-mix(in oklch, currentColor 10%, transparent); }
.vp-nav-menu--glass .vp-nav-menu__link--active { color: inherit; background: color-mix(in oklch, currentColor 16%, transparent); }

/* A link that is a button */
.vp-nav-menu__item--button > .vp-nav-menu__link,
.vp-nav-menu--tabs .vp-nav-menu__item--button > .vp-nav-menu__link,
.vp-nav-menu--glass .vp-nav-menu__item--button > .vp-nav-menu__link {
  margin-left: 6px;
  padding-inline: calc(var(--vp-nav-menu-pad-x) + 6px);
  border-radius: var(--vp-radius, 10px);
  background: var(--vp-nav-menu-hi);
  color: var(--vp-primary-contrast, #fff);
  box-shadow: 0 6px 18px color-mix(in oklch, var(--vp-nav-menu-hi) 35%, transparent);
}
.vp-nav-menu--glass .vp-nav-menu__item--button > .vp-nav-menu__link,
.vp-nav-menu--pill .vp-nav-menu__item--button > .vp-nav-menu__link { border-radius: 999px; }
.vp-nav-menu__item--button > .vp-nav-menu__link:hover { color: var(--vp-primary-contrast, #fff); filter: brightness(1.08); }
.vp-nav-menu__item--button > .vp-nav-menu__link::after { display: none; }

/* What opens from a link */
.vp-nav-menu__drop {
  position: absolute;
  top: 100%;
  left: 50%;
  z-index: 50;
  padding-top: 10px;
  translate: calc(-50% + var(--vp-nav-menu-shift, 0px)) 0;
  animation: vp-nav-menu-drop 0.22s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.vp-nav-menu__drop[hidden] { display: none; }
.vp-nav-menu--column .vp-nav-menu__drop { position: static; translate: none; padding: 2px 0 6px 14px; animation: none; }
.vp-nav-menu__drop-inner {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 220px;
  padding: 8px;
  border: 1px solid color-mix(in oklch, var(--vp-text, #111827) 9%, transparent);
  border-radius: calc(var(--vp-radius, 10px) + 4px);
  background: var(--vp-nav-menu-bg);
  color: var(--vp-text, #111827);
  box-shadow: 0 18px 50px rgb(0 0 0 / 0.14), 0 2px 6px rgb(0 0 0 / 0.05);
}
.vp-nav-menu--column .vp-nav-menu__drop-inner { min-width: 0; padding: 0; border: 0; background: none; color: inherit; box-shadow: none; }
.vp-nav-menu__drop--mega .vp-nav-menu__drop-inner {
  display: grid;
  grid-template-columns: repeat(var(--vp-nav-menu-cols, 2), minmax(220px, 1fr));
  gap: 6px 14px;
  width: max-content;
  max-width: min(760px, 92vw);
  padding: 14px;
}
.vp-nav-menu__sub {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 9px 12px;
  border-radius: var(--vp-radius, 10px);
  color: inherit;
  text-decoration: none;
  transition: background 0.15s ease, color 0.15s ease;
}
.vp-nav-menu__sub:hover { background: color-mix(in oklch, var(--vp-nav-menu-hi) 8%, transparent); }
.vp-nav-menu__sub--active { color: var(--vp-nav-menu-hi); }
.vp-nav-menu__sub-words { display: flex; flex-direction: column; gap: 2px; }
.vp-nav-menu__sub-words b { font-weight: 600; }
.vp-nav-menu__sub-words small { color: var(--vp-muted, #6b7280); font-size: 0.85em; line-height: 1.35; }
.vp-nav-menu__sub-icon {
  flex: none;
  width: 36px;
  height: 36px;
  padding: 8px;
  box-sizing: border-box;
  border-radius: var(--vp-radius, 10px);
  background: color-mix(in oklch, var(--vp-nav-menu-hi) 10%, transparent);
  fill: none;
  stroke: var(--vp-nav-menu-hi);
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.vp-nav-menu__drop--list .vp-nav-menu__sub-icon { width: 20px; height: 20px; padding: 0; background: none; }
.vp-nav-menu__group { display: flex; flex-direction: column; gap: 2px; }
.vp-nav-menu__subs {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.vp-nav-menu__node { position: relative; }
.vp-nav-menu__sub--parent {
  width: 100%;
  border: 0;
  background: none;
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.vp-nav-menu__node--open > .vp-nav-menu__sub--parent { background: color-mix(in oklch, var(--vp-nav-menu-hi) 8%, transparent); }
.vp-nav-menu__more {
  flex: none;
  width: 15px;
  height: 15px;
  margin: 3px 0 0 auto;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.6;
  transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.vp-nav-menu__subs--inline > .vp-nav-menu__node--open > .vp-nav-menu__sub--parent .vp-nav-menu__more { transform: rotate(180deg); }
.vp-nav-menu__fly {
  position: absolute;
  top: -9px;
  left: 100%;
  z-index: 2;
  padding-left: 8px;
  animation: vp-nav-menu-drop 0.2s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.vp-nav-menu__fly--left { left: auto; right: 100%; padding: 0 8px 0 0; }
.vp-nav-menu__fly > .vp-nav-menu__subs {
  min-width: 220px;
  padding: 8px;
  border: 1px solid color-mix(in oklch, var(--vp-text, #111827) 9%, transparent);
  border-radius: calc(var(--vp-radius, 10px) + 4px);
  background: var(--vp-nav-menu-bg);
  color: var(--vp-text, #111827);
  box-shadow: 0 18px 50px rgb(0 0 0 / 0.14), 0 2px 6px rgb(0 0 0 / 0.05);
}
.vp-nav-menu__subs--inline .vp-nav-menu__fly {
  position: static;
  padding: 2px 0 4px 14px;
  animation: none;
}
.vp-nav-menu__subs--inline .vp-nav-menu__fly > .vp-nav-menu__subs {
  min-width: 0;
  padding: 0 0 0 10px;
  border: 0;
  border-left: 1px solid color-mix(in oklch, currentColor 14%, transparent);
  border-radius: 0;
  background: none;
  color: inherit;
  box-shadow: none;
}
.vp-nav-menu__group-title {
  padding: 6px 12px 4px;
  color: var(--vp-muted, #6b7280);
  font-size: 0.72em;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.vp-nav-menu__extra { display: flex; align-items: center; gap: 8px; }
.vp-nav-menu__empty { padding: 8px 12px; border: 1px dashed var(--vp-border, #d1d5db); border-radius: var(--vp-radius, 10px); color: var(--vp-muted, #6b7280); }

/* The phone's button */
.vp-nav-menu__toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border: 0;
  border-radius: var(--vp-radius, 10px);
  background: none;
  color: inherit;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}
.vp-nav-menu__toggle:focus-visible { outline: 2px solid var(--vp-nav-menu-hi); outline-offset: 2px; }
.vp-nav-menu__burger { position: relative; display: block; width: 22px; height: 16px; }
.vp-nav-menu__burger i {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  border-radius: 2px;
  background: currentColor;
  transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.2s ease, top 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.vp-nav-menu__burger i:nth-child(1) { top: 0; }
.vp-nav-menu__burger i:nth-child(2) { top: 7px; }
.vp-nav-menu__burger i:nth-child(3) { top: 14px; }
.vp-nav-menu--open .vp-nav-menu__burger i:nth-child(1) { top: 7px; transform: rotate(45deg); }
.vp-nav-menu--open .vp-nav-menu__burger i:nth-child(2) { opacity: 0; }
.vp-nav-menu--open .vp-nav-menu__burger i:nth-child(3) { top: 7px; transform: rotate(-45deg); }

/* Folded on a phone: the drawer, the panel or the whole screen */
.vp-nav-menu--folded .vp-nav-menu__body {
  position: fixed;
  z-index: 1000;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
  box-sizing: border-box;
  padding: 64px 20px 24px;
  overflow-y: auto;
  background: var(--vp-nav-menu-bg);
  color: var(--vp-text, #111827);
  visibility: hidden;
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease, visibility 0s linear 0.35s;
}
.vp-nav-menu--folded .vp-nav-menu__body--open { visibility: visible; transition-delay: 0s; }
.vp-nav-menu--folded .vp-nav-menu__list { flex-direction: column; align-items: stretch; gap: 2px; }
.vp-nav-menu--folded .vp-nav-menu__link { justify-content: flex-start; padding: 12px; font-size: 1.05em; }
.vp-nav-menu--folded .vp-nav-menu__caret { margin-left: auto; }
.vp-nav-menu--folded .vp-nav-menu__drop { position: static; translate: none; padding: 0 0 6px 12px; animation: none; }
.vp-nav-menu--folded .vp-nav-menu__drop-inner,
.vp-nav-menu--folded .vp-nav-menu__drop--mega .vp-nav-menu__drop-inner { display: flex; width: auto; min-width: 0; padding: 0; border: 0; background: none; box-shadow: none; }
.vp-nav-menu--folded .vp-nav-menu__item--button > .vp-nav-menu__link { justify-content: center; margin: 10px 0 0; }
.vp-nav-menu--folded .vp-nav-menu__extra { flex-direction: column; align-items: stretch; }
.vp-nav-menu--folded .vp-nav-menu__link::after { display: none; }
.vp-nav-menu--folded.vp-nav-menu--tabs .vp-nav-menu__list,
.vp-nav-menu--folded.vp-nav-menu--glass .vp-nav-menu__list { padding: 0; background: none; border: 0; box-shadow: none; }
.vp-nav-menu__backdrop {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgb(8 10 18 / 0.45);
  backdrop-filter: blur(2px);
  animation: vp-nav-menu-fade 0.25s ease both;
}
.vp-nav-menu__close {
  position: absolute;
  top: 14px;
  right: 14px;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: color-mix(in oklch, currentColor 8%, transparent);
  color: inherit;
  cursor: pointer;
}
.vp-nav-menu__close svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }
.vp-nav-menu--phone-drawer .vp-nav-menu__body { top: 0; bottom: 0; right: 0; width: min(340px, 86vw); box-shadow: -20px 0 50px rgb(0 0 0 / 0.2); transform: translateX(100%); }
.vp-nav-menu--phone-drawer.vp-nav-menu--side-left .vp-nav-menu__body { right: auto; left: 0; box-shadow: 20px 0 50px rgb(0 0 0 / 0.2); transform: translateX(-100%); }
.vp-nav-menu--phone-drawer .vp-nav-menu__body--open { transform: none; }
.vp-nav-menu--phone-fullscreen .vp-nav-menu__body { inset: 0; justify-content: center; text-align: center; opacity: 0; transform: scale(1.03); }
.vp-nav-menu--phone-fullscreen .vp-nav-menu__body--open { opacity: 1; transform: none; }
.vp-nav-menu--phone-fullscreen .vp-nav-menu__link { justify-content: center; font-size: 1.5em; font-weight: 700; }
.vp-nav-menu--phone-fullscreen .vp-nav-menu__body--open .vp-nav-menu__item { animation: vp-nav-menu-rise 0.45s cubic-bezier(0.2, 0.8, 0.2, 1) both; animation-delay: calc(var(--vp-nav-menu-i, 0) * 50ms + 80ms); }
.vp-nav-menu--phone-dropdown { position: static; }
.vp-nav-menu--phone-dropdown .vp-nav-menu__body {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding: 12px 16px 18px;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 20px 40px rgb(0 0 0 / 0.14);
  opacity: 0;
  transform: translateY(-8px);
}
.vp-nav-menu--phone-dropdown .vp-nav-menu__body--open { opacity: 1; transform: none; }
/* A row to scroll on a phone */
.vp-nav-menu--phone-scroll { min-width: 0; }
.vp-nav-menu--phone-scroll .vp-nav-menu__body,
.vp-nav-menu--phone-scroll .vp-nav-menu__list { min-width: 0; }
.vp-nav-menu--phone-scroll .vp-nav-menu__list {
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-mask-image: linear-gradient(90deg, #000 85%, transparent);
  mask-image: linear-gradient(90deg, #000 85%, transparent);
}
.vp-nav-menu--phone-scroll .vp-nav-menu__list::-webkit-scrollbar { display: none; }

@keyframes vp-nav-menu-drop {
  from { opacity: 0; transform: translateY(-6px) scale(0.98); }
}
@keyframes vp-nav-menu-fade {
  from { opacity: 0; }
}
@keyframes vp-nav-menu-rise {
  from { opacity: 0; transform: translateY(14px); }
}
@media (prefers-reduced-motion: reduce) {
  .vp-nav-menu__drop,
  .vp-nav-menu__backdrop,
  .vp-nav-menu--phone-fullscreen .vp-nav-menu__body--open .vp-nav-menu__item { animation: none; }
  .vp-nav-menu--folded .vp-nav-menu__body,
  .vp-nav-menu__link,
  .vp-nav-menu__burger i { transition: none; }
}
</style>
`;export{e as default};