var e=`<template>
  <div class="vp-admin-nav" :class="classes" :style="style">
    <div class="vp-admin-nav__bar">
      <button ref="burger" type="button" class="vp-admin-nav__burger" :aria-expanded="open ? 'true' : 'false'" :aria-controls="panelId" :aria-label="say(open ? 'close' : 'menu')" @click="open = !open">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path :d="open ? 'M6 18 18 6M6 6l12 12' : 'M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5'" /></svg>
      </button>
      <a class="vp-admin-nav__brand" :href="href || undefined" @click="go($event, href)">
        <img v-if="logo" class="vp-admin-nav__logo" :src="address(logo) || undefined" :style="held(logo)" alt="">
        <span v-else class="vp-admin-nav__mark" aria-hidden="true">{{ initial }}</span>
        <span class="vp-admin-nav__name">{{ brand }}</span>
      </a>
    </div>
    <div v-if="open" class="vp-admin-nav__shade" aria-hidden="true" @click="open = false"></div>
    <aside ref="panel" :id="panelId" class="vp-admin-nav__panel" :aria-label="say('label', label)">
      <div class="vp-admin-nav__top">
        <a class="vp-admin-nav__brand" :href="href || undefined" @click="go($event, href)">
          <img v-if="logo" class="vp-admin-nav__logo" :src="address(logo) || undefined" :style="held(logo)" alt="">
          <span v-else class="vp-admin-nav__mark" aria-hidden="true">{{ initial }}</span>
          <span class="vp-admin-nav__name">{{ brand }}</span>
        </a>
        <button v-if="collapsible" type="button" class="vp-admin-nav__fold" :aria-label="say(narrow ? 'expand' : 'collapse')" :title="say(narrow ? 'expand' : 'collapse')" :aria-pressed="narrow ? 'true' : 'false'" @click="fold">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path :d="narrow ? 'm8.25 4.5 7.5 7.5-7.5 7.5' : 'M15.75 19.5 8.25 12l7.5-7.5'" /></svg>
        </button>
        <button ref="close" type="button" class="vp-admin-nav__close" :aria-label="say('close')" @click="open = false">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M6 6l12 12" /></svg>
        </button>
      </div>
      <nav class="vp-admin-nav__links" :aria-label="say('label', label)">
        <div v-for="(group, g) in groups" :key="g" class="vp-admin-nav__section">
          <p v-if="group.name" class="vp-admin-nav__group">{{ group.name }}</p>
          <ul class="vp-admin-nav__list">
            <li v-for="(link, i) in group.links" :key="i">
              <div v-if="link.children.length" class="vp-admin-nav__row">
                <!-- a link with links under it: it opens and closes them (with a page of its own, a button beside it does) -->
                <component :is="link.href ? 'a' : 'button'" :type="link.href ? undefined : 'button'" class="vp-admin-nav__link" :class="{ 'vp-admin-nav__link--here': here(link), 'vp-admin-nav__link--button': !link.href }" :href="link.href || undefined" :aria-current="here(link) ? 'page' : undefined" :aria-expanded="link.href ? undefined : (isOpen(link, g) ? 'true' : 'false')" :aria-controls="link.href ? undefined : subId(g, i)" :title="narrow ? link.text : undefined" :aria-label="narrow ? named(link) : undefined" @click="link.href ? go($event, link.href) : toggle(link, g)">
                  <svg v-if="drawing(link.icon)" class="vp-admin-nav__icon" viewBox="0 0 24 24" aria-hidden="true"><path v-for="(d, n) in drawing(link.icon)" :key="n" :d="d" /></svg>
                  <span v-else class="vp-admin-nav__icon vp-admin-nav__icon--letter" aria-hidden="true">{{ (link.text || '?').charAt(0) }}</span>
                  <span class="vp-admin-nav__text">{{ link.text }}</span>
                  <span v-if="hasBadge(link)" class="vp-admin-nav__badge">{{ link.badge }}</span>
                  <svg v-if="!link.href" class="vp-admin-nav__chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                </component>
                <button v-if="link.href" type="button" class="vp-admin-nav__toggle" :aria-expanded="isOpen(link, g) ? 'true' : 'false'" :aria-controls="subId(g, i)" :aria-label="say('sub', '', link.text)" :title="say('sub', '', link.text)" @click="toggle(link, g)">
                  <svg class="vp-admin-nav__chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                </button>
              </div>
              <a v-else class="vp-admin-nav__link" :class="{ 'vp-admin-nav__link--here': here(link) }" :href="link.href || undefined" :aria-current="here(link) ? 'page' : undefined" :title="narrow ? link.text : undefined" :aria-label="narrow ? named(link) : undefined" @click="go($event, link.href)">
                <svg v-if="drawing(link.icon)" class="vp-admin-nav__icon" viewBox="0 0 24 24" aria-hidden="true"><path v-for="(d, n) in drawing(link.icon)" :key="n" :d="d" /></svg>
                <span v-else class="vp-admin-nav__icon vp-admin-nav__icon--letter" aria-hidden="true">{{ (link.text || '?').charAt(0) }}</span>
                <span class="vp-admin-nav__text">{{ link.text }}</span>
                <span v-if="hasBadge(link)" class="vp-admin-nav__badge">{{ link.badge }}</span>
              </a>
              <ul v-if="link.children.length" :id="subId(g, i)" class="vp-admin-nav__list vp-admin-nav__sub" :class="{ 'vp-admin-nav__sub--open': isOpen(link, g) }">
                <li v-for="(child, c) in link.children" :key="c">
                  <a class="vp-admin-nav__link" :class="{ 'vp-admin-nav__link--here': here(child) }" :href="child.href || undefined" :aria-current="here(child) ? 'page' : undefined" :title="narrow ? child.text : undefined" :aria-label="narrow ? named(child) : undefined" @click="go($event, child.href)">
                    <svg v-if="drawing(child.icon)" class="vp-admin-nav__icon" viewBox="0 0 24 24" aria-hidden="true"><path v-for="(d, n) in drawing(child.icon)" :key="n" :d="d" /></svg>
                    <span v-else-if="narrow" class="vp-admin-nav__icon vp-admin-nav__icon--letter" aria-hidden="true">{{ (child.text || '?').charAt(0) }}</span>
                    <span class="vp-admin-nav__text">{{ child.text }}</span>
                    <span v-if="hasBadge(child)" class="vp-admin-nav__badge">{{ child.badge }}</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
      <div class="vp-admin-nav__more"><slot /></div>
      <div v-if="showUser" class="vp-admin-nav__user">
        <img v-if="person.avatar" class="vp-admin-nav__avatar" :src="address(person.avatar) || undefined" :style="held(person.avatar)" alt="">
        <span v-else-if="signedIn || userName" class="vp-admin-nav__avatar vp-admin-nav__avatar--letters" aria-hidden="true">{{ letters }}</span>
        <span v-else class="vp-admin-nav__avatar vp-admin-nav__avatar--letters" aria-hidden="true"><svg class="vp-admin-nav__icon" viewBox="0 0 24 24"><path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg></span>
        <span class="vp-admin-nav__who">
          <span class="vp-admin-nav__person">{{ person.name }}</span>
          <span v-if="person.note" class="vp-admin-nav__note">{{ person.note }}</span>
        </span>
        <button v-if="signedIn" type="button" class="vp-admin-nav__out" :aria-label="say('out', signOutText)" :title="say('out', signOutText)" @click="leave">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" /></svg>
        </button>
      </div>
    </aside>
  </div>
</template>
<script>
// The menu down the side of an admin (a dashboard, a shop's back office, a help desk): the name or logo, the
// pages in groups with an icon and a count, and who is signed in with Sign out. Put it in App.vue where a header
// goes: the page beside it makes room for it. It can be made narrow (icons only), and on a phone it is a bar at
// the top with a menu that slides in. With "Send visitors who are not signed in to", a visitor who is not
// signed in (with the source in Data visitors sign in with) is sent to that page; the backend must still refuse
// what they may not see: a menu only hides.
// (the drawings are the options of the links' icon field, where the Studio reads them: name → path data)
let ICONS = null

const WORDS = {
  en: { menu: 'Open the menu', close: 'Close the menu', collapse: 'Make the menu narrow', expand: 'Make the menu wide', label: 'Admin', out: 'Sign out', guest: 'Not signed in', sub: 'Pages under {n}' },
  nb: { menu: 'Åpne menyen', close: 'Lukk menyen', collapse: 'Gjør menyen smal', expand: 'Gjør menyen bred', label: 'Admin', out: 'Logg ut', guest: 'Ikke logget inn', sub: 'Sider under {n}' },
  sv: { menu: 'Öppna menyn', close: 'Stäng menyn', collapse: 'Gör menyn smal', expand: 'Gör menyn bred', label: 'Admin', out: 'Logga ut', guest: 'Inte inloggad', sub: 'Sidor under {n}' },
  da: { menu: 'Åbn menuen', close: 'Luk menuen', collapse: 'Gør menuen smal', expand: 'Gør menuen bred', label: 'Admin', out: 'Log ud', guest: 'Ikke logget ind', sub: 'Sider under {n}' },
  fi: { menu: 'Avaa valikko', close: 'Sulje valikko', collapse: 'Kavenna valikko', expand: 'Levennä valikko', label: 'Ylläpito', out: 'Kirjaudu ulos', guest: 'Ei kirjautunut', sub: 'Alasivut: {n}' },
  de: { menu: 'Menü öffnen', close: 'Menü schließen', collapse: 'Menü schmal machen', expand: 'Menü breit machen', label: 'Verwaltung', out: 'Abmelden', guest: 'Nicht angemeldet', sub: 'Seiten unter {n}' },
  fr: { menu: 'Ouvrir le menu', close: 'Fermer le menu', collapse: 'Réduire le menu', expand: 'Agrandir le menu', label: 'Administration', out: 'Se déconnecter', guest: 'Non connecté', sub: 'Pages sous {n}' },
  es: { menu: 'Abrir el menú', close: 'Cerrar el menú', collapse: 'Estrechar el menú', expand: 'Ensanchar el menú', label: 'Administración', out: 'Cerrar sesión', guest: 'Sin sesión iniciada', sub: 'Páginas dentro de {n}' },
  it: { menu: 'Apri il menu', close: 'Chiudi il menu', collapse: 'Restringi il menu', expand: 'Allarga il menu', label: 'Amministrazione', out: 'Esci', guest: 'Accesso non effettuato', sub: 'Pagine sotto {n}' },
  nl: { menu: 'Menu openen', close: 'Menu sluiten', collapse: 'Menu smal maken', expand: 'Menu breed maken', label: 'Beheer', out: 'Uitloggen', guest: 'Niet ingelogd', sub: 'Pagina’s onder {n}' },
  pt: { menu: 'Abrir o menu', close: 'Fechar o menu', collapse: 'Estreitar o menu', expand: 'Alargar o menu', label: 'Administração', out: 'Terminar sessão', guest: 'Sessão não iniciada', sub: 'Páginas dentro de {n}' },
  pl: { menu: 'Otwórz menu', close: 'Zamknij menu', collapse: 'Zwęź menu', expand: 'Poszerz menu', label: 'Administracja', out: 'Wyloguj się', guest: 'Nie zalogowano', sub: 'Podstrony: {n}' },
  zh: { menu: '打开菜单', close: '关闭菜单', collapse: '收起菜单', expand: '展开菜单', label: '管理', out: '退出登录', guest: '未登录', sub: '{n} 下的页面' },
  ja: { menu: 'メニューを開く', close: 'メニューを閉じる', collapse: 'メニューを狭くする', expand: 'メニューを広くする', label: '管理', out: 'ログアウト', guest: '未ログイン', sub: '{n} の下のページ' }
}

const SAMPLES = [
  { text: 'Overview', href: '/', icon: 'home' },
  { text: 'Orders', href: '/orders', icon: 'shopping-bag', badge: '4' },
  { text: 'Customers', href: '/customers', icon: 'users' },
  { text: 'Reports', href: '/reports', icon: 'chart-bar' },
  { group: 'Account', text: 'Settings', href: '/settings', icon: 'cog-6-tooth' }
]

const KEEP = 'vp-admin-nav-narrow'

export default {
  inject: { vpData: { default: null } },
  props: {
    brand: { type: String, default: 'Admin', label: 'Name' },
    logo: { type: String, default: '', label: 'Logo', control: 'media' },
    href: { type: String, default: '/', label: 'The name links to' },
    links: {
      type: Array,
      default: () => [],
      label: 'Links',
      control: 'list',
      fields: [
        { key: 'text', label: 'Text' },
        { key: 'href', label: 'Goes to', placeholder: '/orders' },
        { key: 'icon', label: 'Icon', control: 'icons', options: [
          { key: 'Home', value: 'home', icon: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25' },
          { key: 'Dashboard', value: 'squares-2x2', icon: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z' },
          { key: 'Bars', value: 'chart-bar', icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z' },
          { key: 'Pie', value: 'chart-pie', icon: 'M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z|M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z' },
          { key: 'Line', value: 'presentation-chart-line', icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605' },
          { key: 'People', value: 'users', icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z' },
          { key: 'Person', value: 'user', icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' },
          { key: 'Team', value: 'user-group', icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z' },
          { key: 'Account', value: 'user-circle', icon: 'M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z' },
          { key: 'Bag', value: 'shopping-bag', icon: 'M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' },
          { key: 'Cart', value: 'shopping-cart', icon: 'M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z' },
          { key: 'Box', value: 'cube', icon: 'M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9' },
          { key: 'Tag', value: 'tag', icon: 'M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z|M6 6h.008v.008H6V6z' },
          { key: 'Discount', value: 'receipt-percent', icon: 'M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' },
          { key: 'Card', value: 'credit-card', icon: 'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z' },
          { key: 'Money', value: 'banknotes', icon: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z' },
          { key: 'Inbox', value: 'inbox', icon: 'M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z' },
          { key: 'Mail', value: 'envelope', icon: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75' },
          { key: 'Chat', value: 'chat-bubble-left-right', icon: 'M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155' },
          { key: 'Bell', value: 'bell', icon: 'M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0' },
          { key: 'Document', value: 'document-text', icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z' },
          { key: 'Folder', value: 'folder', icon: 'M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z' },
          { key: 'Calendar', value: 'calendar', icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5' },
          { key: 'Tasks', value: 'clipboard-document-list', icon: 'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z' },
          { key: 'Ticket', value: 'ticket', icon: 'M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z' },
          { key: 'Truck', value: 'truck', icon: 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12' },
          { key: 'Archive', value: 'archive-box', icon: 'M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z' },
          { key: 'Settings', value: 'cog-6-tooth', icon: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z|M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
          { key: 'Controls', value: 'adjustments-horizontal', icon: 'M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75' },
          { key: 'Help', value: 'question-mark-circle', icon: 'M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z' },
          { key: 'Support', value: 'lifebuoy', icon: 'M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288' },
          { key: 'Megaphone', value: 'megaphone', icon: 'M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46' },
          { key: 'Star', value: 'star', icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z' },
          { key: 'Key', value: 'key', icon: 'M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z' },
          { key: 'Shield', value: 'shield-check', icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z' },
          { key: 'Globe', value: 'globe-alt', icon: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418' },
          { key: 'Server', value: 'server-stack', icon: 'M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z' },
          { key: 'Pages', value: 'rectangle-stack', icon: 'M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122' },
          { key: 'Picture', value: 'photo', icon: 'M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' },
          { key: 'News', value: 'newspaper', icon: 'M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z' },
          { key: 'Book', value: 'book-open', icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25' },
          { key: 'Link', value: 'link', icon: 'M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244' },
          { key: 'Exit', value: 'arrow-right-on-rectangle', icon: 'M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9' }
        ] },
        { key: 'group', label: 'Under the heading', placeholder: 'Shop' },
        { key: 'parent', label: 'Under the link (its text)', placeholder: 'Settings' },
        { key: 'badge', label: 'A count or a word beside it', placeholder: '4' },
        { key: 'exact', label: 'Marked only on exactly this address', control: 'boolean' }
      ]
    },
    look: { type: String, default: 'light', label: 'Look', control: 'select', options: [{ key: 'Light', value: 'light' }, { key: 'Grey', value: 'surface' }, { key: 'Dark', value: 'dark' }, { key: 'In the main colour', value: 'brand' }] },
    size: { type: String, default: 'normal', label: 'Width', control: 'select', options: [{ key: 'Narrow', value: 'small' }, { key: 'Normal', value: 'normal' }, { key: 'Wide', value: 'wide' }] },
    collapsible: { type: Boolean, default: true, label: 'Can be made narrow (icons only)' },
    showUser: { type: Boolean, default: true, label: 'Show who is signed in, with Sign out' },
    userName: { type: String, default: '', label: 'Name shown when nobody is signed in', placeholder: 'Not signed in' },
    userNote: { type: String, default: '', label: 'A line under the name', placeholder: 'Administrator' },
    guard: { type: String, default: '', label: 'Send visitors who are not signed in to', placeholder: '/login' },
    signOutLink: { type: String, default: '', label: 'After Sign out, go to', placeholder: '/login' },
    signOutText: { type: String, default: '', label: 'Sign out text', placeholder: 'Sign out' },
    label: { type: String, default: '', label: 'Name of the menu for screen readers', placeholder: 'Admin' },
    color: { type: String, default: '', label: 'Colour of the page that is open', control: 'color' }
  },
  data() {
    return { open: false, narrow: false, found: {}, opened: {}, placed: false, phone: false, panelId: 'vp-admin-nav-' + Math.random().toString(36).slice(2, 8) }
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
    inStudio() {
      return typeof document !== 'undefined' && (document.getElementById('receiver') ? document.getElementById('receiver').getAttribute('live') !== 'yes' : !!window.studio)
    },
    shown() {
      return Array.isArray(this.links) && this.links.length ? this.links : this.inStudio ? SAMPLES : []
    },
    // The links in their groups, in the order the groups first come; a link whose "Under the link" is the text of
    // another (one that is under none) is in that one's \`children\`, shown when it is opened
    groups() {
      const shown = this.shown
      const name = value => String(value || '').trim()
      const parentOf = link => name(link.parent) && shown.find(one => one !== link && !name(one.parent) && name(one.text) === name(link.parent))
      const out = []
      for (const link of shown) {
        if (parentOf(link)) continue
        const title = name(link.group)
        let group = out.find(one => one.name === title)
        if (!group) out.push(group = { name: title, links: [] })
        group.links.push({ ...link, children: shown.filter(one => parentOf(one) === link) })
      }
      return out
    },
    path() {
      return this.$route?.path || (typeof location !== 'undefined' ? location.pathname : '/')
    },
    signedIn() {
      return !!this.vpData?.auth?.user && !this.inStudio
    },
    person() {
      const user = this.signedIn ? this.vpData.auth.user : null
      if (user) return { name: user.name || user.email || '', note: this.userNote || (user.name ? user.email : '') || '', avatar: user.avatar || '' }
      return { name: this.say('guest', this.userName), note: this.userNote, avatar: '' }
    },
    initial() {
      return (String(this.brand || '').trim().charAt(0) || 'A').toUpperCase()
    },
    letters() {
      return String(this.person.name || '').split(/[\\s@.]+/).filter(Boolean).slice(0, 2).map(part => part.charAt(0).toUpperCase()).join('') || '?'
    },
    pictureNames() {
      return [this.logo, this.person.avatar].filter(one => /^--/.test(one || ''))
    },
    classes() {
      return ['vp-admin-nav--' + this.look, 'vp-admin-nav--' + this.size, { 'vp-admin-nav--narrow': this.narrow, 'vp-admin-nav--open': this.open, 'vp-admin-nav--studio': this.inStudio, 'vp-admin-nav--placed': this.placed }]
    },
    style() {
      return { '--vp-admin-nav-here': this.color || undefined }
    }
  },
  methods: {
    say(key, own, n) {
      if (own) return own
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return String(words[key] ?? WORDS.en[key]).replace('{n}', n ?? '')
    },
    drawing(name) {
      if (!ICONS) ICONS = Object.fromEntries((this.$options.props.links.fields.find(field => field.key === 'icon')?.options || []).map(one => [one.value, one.icon]))
      return name && ICONS[name] ? ICONS[name].split('|') : null
    },
    // What a narrow menu's link is called (its words are hidden, so its count alone would be its name)
    named(link) {
      return [link.text, this.hasBadge(link) ? link.badge : ''].filter(one => one !== '' && one != null).join(' ') || undefined
    },
    subId(g, i) {
      return this.panelId + '-sub-' + g + '-' + i
    },
    // Opened or closed by its button; until then open when the page that is open is one of its links
    isOpen(link, g) {
      const kept = this.opened[g + ':' + link.text]
      return kept ?? link.children.some(child => this.here(child))
    },
    toggle(link, g) {
      this.opened = { ...this.opened, [g + ':' + link.text]: !this.isOpen(link, g) }
    },
    hasBadge(link) {
      return link.badge !== undefined && link.badge !== null && String(link.badge) !== ''
    },
    // Whether a link is to the page that is open: its address, or one under it (/orders/42 marks Orders)
    here(link) {
      const href = String(link.href || '')
      if (!href.startsWith('/')) return false
      const path = this.path.replace(/\\/+$/, '') || '/'
      const to = href.split(/[?#]/)[0].replace(/\\/+$/, '') || '/'
      if (to === path) return true
      return !link.exact && to !== '/' && path.startsWith(to + '/')
    },
    address(value) {
      return /^--/.test(value || '') ? this.found[value] || '' : value || ''
    },
    held(value) {
      return /^--/.test(value || '') && !this.found[value] ? { content: 'var(' + value + ')' } : undefined
    },
    findPictures() {
      if (!this.$el || this.$el.nodeType !== 1 || typeof getComputedStyle === 'undefined') return
      const style = getComputedStyle(this.$el)
      const found = {}
      for (const name of this.pictureNames) {
        const address = /^\\s*url\\(\\s*(['"]?)(.*?)\\1\\s*\\)\\s*$/.exec(style.getPropertyValue(name))
        if (address) found[name] = address[2]
      }
      this.found = found
    },
    go(event, href) {
      if (this.inStudio) { event.preventDefault(); return }
      // a new tab or window: the browser's own
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button > 0) return
      this.open = false
      if (this.$router && String(href || '').startsWith('/')) { event.preventDefault(); this.$router.push(href) }
    },
    fold() {
      this.narrow = !this.narrow
      try { localStorage.setItem(KEEP, this.narrow ? '1' : '0') } catch (e) {}
    },
    leave() {
      this.vpData?.signOut?.()
      const to = this.signOutLink || this.guard
      if (to) this.travel(to)
    },
    travel(to) {
      if (this.$router && to.startsWith('/')) this.$router.replace(to)
      else if (typeof location !== 'undefined') location.href = to
    },
    // The room the page leaves for it: the body is moved over (so what is fixed to the page and a menu put inside
    // something else are right too), by --vp-admin-nav-room on <html>; none on a phone, where it is a bar on top.
    // Not in a picture of a page in the Studio (inert): the Studio's own page is not moved
    room() {
      if (typeof document === 'undefined' || !this.$el || this.$el.nodeType !== 1 || this.$el.closest('[inert]')) return
      const width = this.phone ? 0 : this.narrow ? 72 : { small: 220, wide: 280 }[this.size] || 248
      document.documentElement.style.setProperty('--vp-admin-nav-room', width + 'px')
      document.body.style.paddingLeft = 'var(--vp-admin-nav-room)'
      this.placed = true
    },
    unroom() {
      if (!this.placed || typeof document === 'undefined') return
      document.documentElement.style.removeProperty('--vp-admin-nav-room')
      document.body.style.paddingLeft = ''
      this.placed = false
    },
    // A visitor who is not signed in is sent to the sign-in page, where the site has a source to sign in with
    // (without one nobody could ever get in, so nobody is sent anywhere)
    check() {
      if (!this.guard || this.inStudio || !this.vpData) return
      const sources = Object.values(this.vpData.sources || {})
      if (!sources.some(source => source?.auth?.kind)) return
      const auth = this.vpData.auth || {}
      if (auth.busy || auth.user || auth.token) return
      const to = this.guard.split(/[?#]/)[0].replace(/\\/+$/, '') || '/'
      if ((this.path.replace(/\\/+$/, '') || '/') !== to) this.travel(this.guard)
    },
    escape(event) {
      if (!this.open) return
      if (event.key === 'Escape') this.open = false
      else if (event.key === 'Tab') this.keepInside(event)
    },
    // While the phone's menu is open, Tab goes round inside it
    keepInside(event) {
      const panel = this.$refs.panel
      if (!panel) return
      const all = [...panel.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])')]
        .filter(one => !one.disabled && one.getClientRects().length)
      if (!all.length) return
      const first = all[0], last = all[all.length - 1], at = document.activeElement
      if (!panel.contains(at)) { event.preventDefault(); first.focus() }
      else if (event.shiftKey && at === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && at === last) { event.preventDefault(); first.focus() }
    },
    // Opened: focus goes into the menu; closed: back to the button that opens it (unless it is somewhere else now)
    moveFocus(open) {
      if (typeof document === 'undefined') return
      this.$nextTick(() => {
        if (open) { this.$refs.close?.focus?.(); return }
        const at = document.activeElement
        if (!at || at === document.body || this.$refs.panel?.contains(at)) {
          if (this.$refs.burger?.getClientRects().length) this.$refs.burger.focus()
        }
      })
    }
  },
  watch: {
    open: 'moveFocus',
    pictureNames() { this.$nextTick(() => this.findPictures()) },
    path() { this.open = false; this.check() },
    signedIn() { this.check() },
    narrow: 'room',
    size: 'room',
    phone: 'room'
  },
  mounted() {
    try { this.narrow = this.collapsible && localStorage.getItem(KEEP) === '1' } catch (e) {}
    this.findPictures()
    this.check()
    if (typeof document !== 'undefined') document.addEventListener('keydown', this.escape)
    if (typeof window !== 'undefined' && window.matchMedia) {
      this.media = window.matchMedia('(max-width: 900px)')
      this.onMedia = () => { this.phone = this.media.matches }
      this.phone = this.media.matches
      this.media.addEventListener?.('change', this.onMedia)
    }
    this.room()
  },
  beforeUnmount() {
    if (typeof document !== 'undefined') document.removeEventListener('keydown', this.escape)
    this.media?.removeEventListener?.('change', this.onMedia)
    this.unroom()
  }
}
<\/script>
<style>
.vp-admin-nav {
  --vp-admin-nav-width: 248px;
  --vp-admin-nav-bg: var(--vp-background, #ffffff);
  --vp-admin-nav-ink: var(--vp-text, #111827);
  --vp-admin-nav-soft: var(--vp-muted, #6b7280);
  --vp-admin-nav-line: var(--vp-border, #e5e7eb);
  --vp-admin-nav-hover: color-mix(in srgb, var(--vp-admin-nav-ink) 6%, transparent);
  --vp-admin-nav-mark: var(--vp-admin-nav-here, var(--vp-primary, #4f46e5));
  box-sizing: border-box;
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 40;
  width: var(--vp-admin-nav-width);
  color: var(--vp-admin-nav-ink);
  font-size: 0.9375rem;
  transition: width 0.2s ease;
}
.vp-admin-nav *, .vp-admin-nav *::before, .vp-admin-nav *::after { box-sizing: border-box; }
.vp-admin-nav--small { --vp-admin-nav-width: 220px; }
.vp-admin-nav--wide { --vp-admin-nav-width: 280px; }
.vp-admin-nav--narrow { --vp-admin-nav-width: 72px; }
.vp-admin-nav--surface { --vp-admin-nav-bg: var(--vp-surface, #f8fafc); }
.vp-admin-nav--dark { --vp-admin-nav-bg: #0f172a; --vp-admin-nav-ink: #e2e8f0; --vp-admin-nav-soft: #94a3b8; --vp-admin-nav-line: #1e293b; --vp-admin-nav-hover: rgba(255, 255, 255, 0.06); --vp-admin-nav-mark: var(--vp-admin-nav-here, #ffffff); }
.vp-admin-nav--brand { --vp-admin-nav-bg: var(--vp-primary, #4f46e5); --vp-admin-nav-ink: var(--vp-primary-contrast, #ffffff); --vp-admin-nav-soft: color-mix(in srgb, var(--vp-primary-contrast, #ffffff) 72%, transparent); --vp-admin-nav-line: color-mix(in srgb, var(--vp-primary-contrast, #ffffff) 18%, transparent); --vp-admin-nav-hover: color-mix(in srgb, var(--vp-primary-contrast, #ffffff) 12%, transparent); --vp-admin-nav-mark: var(--vp-admin-nav-here, var(--vp-primary-contrast, #ffffff)); }

/* the page beside it makes room for it: once it is in the page the body is moved over (\`room\`, wherever the menu
   is put, with --vp-admin-nav-room on <html> saying by how much); until then (drawn on the server, or a picture
   of a page in the Studio) what comes after it is */
.vp-admin-nav:not(.vp-admin-nav--placed) ~ * { margin-left: var(--vp-admin-nav-room, 248px); }
.vp-admin-nav--small:not(.vp-admin-nav--placed) ~ * { --vp-admin-nav-room: 220px; }
.vp-admin-nav--wide:not(.vp-admin-nav--placed) ~ * { --vp-admin-nav-room: 280px; }
.vp-admin-nav--narrow:not(.vp-admin-nav--placed) ~ * { --vp-admin-nav-room: 72px; }

.vp-admin-nav__bar { display: none; }
.vp-admin-nav__panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px 12px;
  gap: 12px;
  overflow: hidden auto;
  background: var(--vp-admin-nav-bg);
  border-right: 1px solid var(--vp-admin-nav-line);
}
.vp-admin-nav__top { display: flex; align-items: center; gap: 8px; min-height: 40px; padding: 0 4px 4px; }
.vp-admin-nav__brand { display: flex; align-items: center; gap: 10px; min-width: 0; flex: 1; color: inherit; text-decoration: none; font-family: var(--vp-font-heading, inherit); font-weight: 700; font-size: 1.0625rem; letter-spacing: -0.01em; }
.vp-admin-nav__logo { width: 32px; height: 32px; object-fit: contain; flex: none; border-radius: 8px; }
.vp-admin-nav__mark { display: grid; place-items: center; width: 32px; height: 32px; flex: none; border-radius: 8px; background: var(--vp-admin-nav-mark); color: var(--vp-admin-nav-bg); font-size: 0.9375rem; }
.vp-admin-nav--brand .vp-admin-nav__mark { color: var(--vp-primary, #4f46e5); }
.vp-admin-nav__name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.vp-admin-nav__fold, .vp-admin-nav__close, .vp-admin-nav__burger, .vp-admin-nav__out, .vp-admin-nav__toggle {
  display: grid; place-items: center; flex: none; width: 32px; height: 32px; padding: 0; border: 0; border-radius: 8px;
  background: transparent; color: var(--vp-admin-nav-soft); cursor: pointer;
}
.vp-admin-nav__fold:hover, .vp-admin-nav__close:hover, .vp-admin-nav__burger:hover, .vp-admin-nav__out:hover, .vp-admin-nav__toggle:hover { background: var(--vp-admin-nav-hover); color: var(--vp-admin-nav-ink); }
.vp-admin-nav__fold svg, .vp-admin-nav__close svg, .vp-admin-nav__burger svg, .vp-admin-nav__out svg, .vp-admin-nav__icon, .vp-admin-nav__chevron {
  width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round;
}
.vp-admin-nav__close { display: none; }
.vp-admin-nav__links { display: flex; flex-direction: column; gap: 14px; flex: 1; }
.vp-admin-nav__group { margin: 0 0 4px; padding: 0 10px; color: var(--vp-admin-nav-soft); font-size: 0.75rem; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; white-space: nowrap; overflow: hidden; }
.vp-admin-nav__list { display: flex; flex-direction: column; gap: 2px; margin: 0; padding: 0; list-style: none; }
.vp-admin-nav__link {
  position: relative; display: flex; align-items: center; gap: 12px; min-height: 40px; padding: 8px 10px; border-radius: 8px;
  color: var(--vp-admin-nav-soft); text-decoration: none; font-weight: 500; white-space: nowrap;
}
.vp-admin-nav__link:hover { background: var(--vp-admin-nav-hover); color: var(--vp-admin-nav-ink); }
.vp-admin-nav__link:focus-visible, .vp-admin-nav__brand:focus-visible, .vp-admin-nav__fold:focus-visible, .vp-admin-nav__burger:focus-visible, .vp-admin-nav__out:focus-visible, .vp-admin-nav__close:focus-visible, .vp-admin-nav__toggle:focus-visible {
  outline: 2px solid var(--vp-admin-nav-mark); outline-offset: 2px;
}
.vp-admin-nav__link--here { background: color-mix(in srgb, var(--vp-admin-nav-mark) 12%, transparent); color: var(--vp-admin-nav-mark); font-weight: 600; }
.vp-admin-nav--dark .vp-admin-nav__link--here, .vp-admin-nav--brand .vp-admin-nav__link--here { background: var(--vp-admin-nav-hover); color: var(--vp-admin-nav-ink); }
.vp-admin-nav__icon { flex: none; }
.vp-admin-nav__link--button { width: 100%; border: 0; background: transparent; font: inherit; text-align: left; cursor: pointer; }
.vp-admin-nav__row { display: flex; align-items: center; gap: 2px; }
.vp-admin-nav__row > .vp-admin-nav__link { flex: 1; min-width: 0; }
.vp-admin-nav__chevron { flex: none; width: 16px; height: 16px; transition: transform 0.2s ease; }
.vp-admin-nav__link[aria-expanded="true"] > .vp-admin-nav__chevron, .vp-admin-nav__toggle[aria-expanded="true"] > .vp-admin-nav__chevron { transform: rotate(180deg); }
.vp-admin-nav__sub { display: none; margin-top: 2px; padding-left: 22px; }
.vp-admin-nav__sub--open { display: flex; }
.vp-admin-nav__sub .vp-admin-nav__link { min-height: 36px; font-size: 0.875rem; }
.vp-admin-nav__icon--letter { display: grid; place-items: center; border-radius: 6px; background: var(--vp-admin-nav-hover); font-size: 0.75rem; font-weight: 700; }
.vp-admin-nav__text { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; }
.vp-admin-nav__badge { min-width: 22px; padding: 1px 7px; border-radius: 999px; background: var(--vp-admin-nav-mark); color: var(--vp-admin-nav-bg); font-size: 0.75rem; font-weight: 600; line-height: 1.5; text-align: center; }
.vp-admin-nav--brand .vp-admin-nav__badge { color: var(--vp-primary, #4f46e5); }
.vp-admin-nav__more:empty { display: none; }
.vp-admin-nav__user { display: flex; align-items: center; gap: 10px; padding: 12px 4px 0; border-top: 1px solid var(--vp-admin-nav-line); }
.vp-admin-nav__avatar { width: 36px; height: 36px; flex: none; border-radius: 50%; object-fit: cover; }
.vp-admin-nav__avatar--letters { display: grid; place-items: center; background: var(--vp-admin-nav-hover); color: var(--vp-admin-nav-ink); font-size: 0.8125rem; font-weight: 700; }
.vp-admin-nav__who { display: flex; flex-direction: column; flex: 1; min-width: 0; line-height: 1.3; }
.vp-admin-nav__person { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 600; font-size: 0.875rem; }
.vp-admin-nav__note { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--vp-admin-nav-soft); font-size: 0.8125rem; }

/* narrow: icons only, the words as tooltips */
.vp-admin-nav--narrow .vp-admin-nav__top { flex-direction: column; padding: 0 0 4px; }
.vp-admin-nav--narrow .vp-admin-nav__brand { flex: none; }
.vp-admin-nav--narrow .vp-admin-nav__name, .vp-admin-nav--narrow .vp-admin-nav__text, .vp-admin-nav--narrow .vp-admin-nav__who { display: none; }
.vp-admin-nav--narrow .vp-admin-nav__group { height: 1px; margin: 0 10px 6px; padding: 0; background: var(--vp-admin-nav-line); color: transparent; }
.vp-admin-nav--narrow .vp-admin-nav__link { justify-content: center; padding: 8px; }
.vp-admin-nav--narrow .vp-admin-nav__badge { position: absolute; top: 2px; right: 2px; min-width: 16px; padding: 0 4px; font-size: 0.625rem; }
.vp-admin-nav--narrow .vp-admin-nav__user { flex-direction: column; padding: 12px 0 0; }
.vp-admin-nav--narrow .vp-admin-nav__sub { display: flex; padding-left: 0; }
.vp-admin-nav--narrow .vp-admin-nav__toggle, .vp-admin-nav--narrow .vp-admin-nav__chevron { display: none; }

/* a phone: a bar at the top, the menu slides in from the side */
@media (max-width: 900px) {
  .vp-admin-nav { position: sticky; inset: 0 0 auto; top: 0; width: auto; }
  .vp-admin-nav ~ * { margin-left: 0; }
  .vp-admin-nav__bar {
    display: flex; align-items: center; gap: 8px; height: 56px; padding: 0 12px;
    background: var(--vp-admin-nav-bg); border-bottom: 1px solid var(--vp-admin-nav-line);
  }
  .vp-admin-nav__panel {
    position: fixed; inset: 0 auto 0 0; z-index: 2; width: min(300px, 86vw);
    transform: translateX(-100%); visibility: hidden; transition: transform 0.25s ease, visibility 0s 0.25s;
    box-shadow: 0 10px 40px rgba(15, 23, 42, 0.2);
  }
  .vp-admin-nav--open .vp-admin-nav__panel { transform: none; visibility: visible; transition: transform 0.25s ease; }
  .vp-admin-nav__shade { position: fixed; inset: 0; z-index: 1; background: rgba(15, 23, 42, 0.45); }
  .vp-admin-nav__fold { display: none; }
  .vp-admin-nav__close { display: grid; }
  .vp-admin-nav--narrow .vp-admin-nav__name, .vp-admin-nav--narrow .vp-admin-nav__text, .vp-admin-nav--narrow .vp-admin-nav__who { display: revert; }
  .vp-admin-nav--narrow .vp-admin-nav__top { flex-direction: row; padding: 0 4px 4px; }
  .vp-admin-nav--narrow .vp-admin-nav__link { justify-content: flex-start; padding: 8px 10px; }
  .vp-admin-nav--narrow .vp-admin-nav__group { height: auto; margin: 0 0 4px; padding: 0 10px; background: none; color: var(--vp-admin-nav-soft); }
  .vp-admin-nav--narrow .vp-admin-nav__badge { position: static; }
  .vp-admin-nav--narrow .vp-admin-nav__user { flex-direction: row; padding: 12px 4px 0; }
  .vp-admin-nav--narrow .vp-admin-nav__sub { padding-left: 22px; }
  .vp-admin-nav--narrow .vp-admin-nav__sub:not(.vp-admin-nav__sub--open) { display: none; }
  .vp-admin-nav--narrow .vp-admin-nav__toggle { display: grid; }
  .vp-admin-nav--narrow .vp-admin-nav__chevron { display: block; }
}
@media (prefers-reduced-motion: reduce) {
  .vp-admin-nav, .vp-admin-nav__panel, .vp-admin-nav__chevron { transition: none; }
}
</style>
`;export{e as default};