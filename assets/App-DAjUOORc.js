var e=`<template>
  <div class="vp-chat-app" :class="{ 'vp-chat-app--menu': menuOpen, 'vp-chat-app--no-side': !showChats }" :style="style">
    <aside v-if="showChats" class="vp-chat-app__side" :aria-label="say('chats')">
      <div class="vp-chat-app__side-top">
        <button type="button" class="vp-chat-app__new" @click="newChat"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>{{ say('newChat') }}</button>
        <button type="button" class="vp-chat-app__icon vp-chat-app__close" :aria-label="say('closeMenu')" :title="say('closeMenu')" @click="menuOpen = false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg></button>
      </div>
      <button v-if="hasAgents" type="button" class="vp-chat-app__go" :class="{ 'vp-chat-app__go--on': view === 'agents' }" :aria-current="view === 'agents' ? 'page' : null" @click="showAgents"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="8" width="14" height="11" rx="3" /><path d="M12 8V4M9.5 13v1.5M14.5 13v1.5" /></svg>{{ say('agents') }}<span v-if="allAgents.length" class="vp-chat-app__count">{{ allAgents.length }}</span></button>
      <input v-if="chats.length > 6" v-model="find" class="vp-chat-app__find" type="search" :placeholder="say('findChats')" :aria-label="say('findChats')">
      <nav class="vp-chat-app__chats">
        <p v-if="!chats.length" class="vp-chat-app__none">{{ say('noChats') }}</p>
        <div v-for="chat in shownChats" :key="chat.id" class="vp-chat-app__chat" :class="{ 'vp-chat-app__chat--on': view === 'chat' && chat.id === currentId }">
          <button type="button" class="vp-chat-app__chat-open" :aria-current="view === 'chat' && chat.id === currentId ? 'page' : null" @click="open(chat.id)"><span v-if="agentOf(chat)" class="vp-chat-app__face vp-chat-app__face--dot" :style="tint(agentOf(chat))" :title="agentOf(chat).name" aria-hidden="true">{{ letter(agentOf(chat)) }}</span>{{ chat.title || say('newChat') }}</button>
          <button type="button" class="vp-chat-app__icon vp-chat-app__chat-delete" :aria-label="say('deleteChat') + ': ' + (chat.title || say('newChat'))" :title="say('deleteChat')" @click="remove(chat.id)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14M10 7V5h4v2M7 7l1 12h8l1-12" /></svg></button>
        </div>
      </nav>
      <p v-if="remember" class="vp-chat-app__kept">{{ say('kept') }}</p>
      <nav v-if="links.length" class="vp-chat-app__links">
        <a v-for="(link, index) in links" :key="index" :href="link.href" class="vp-chat-app__link">{{ link.text }}</a>
      </nav>
    </aside>
    <div v-if="showChats && menuOpen" class="vp-chat-app__shade" @click="menuOpen = false" />

    <section v-if="view === 'agents'" class="vp-chat-app__main vp-chat-app__main--agents">
      <header class="vp-chat-app__top">
        <button v-if="showChats" type="button" class="vp-chat-app__icon vp-chat-app__menu" :aria-label="say('menu')" :title="say('menu')" @click="menuOpen = true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg></button>
        <button v-if="form || !showChats" type="button" class="vp-chat-app__icon" :aria-label="say('back')" :title="say('back')" @click="form ? (form = null) : showChat()"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg></button>
        <strong class="vp-chat-app__name">{{ form ? say(form.id ? 'editAgent' : 'newAgent') : say('agents') }}</strong>
        <span class="vp-chat-app__space" />
        <button v-if="ownAgents && !form && allAgents.length" type="button" class="vp-chat-app__do vp-chat-app__do--main" @click="newAgent"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>{{ say('newAgent') }}</button>
      </header>
      <div class="vp-chat-app__list">
        <form v-if="form" class="vp-chat-app__form" @submit.prevent="saveAgent">
          <div class="vp-chat-app__form-top">
            <span class="vp-chat-app__face vp-chat-app__face--big" :style="tint(form)" aria-hidden="true">{{ letter(form) }}</span>
            <label class="vp-chat-app__field">
              <span class="vp-chat-app__label">{{ say('agentName') }}</span>
              <input ref="agentName" v-model="form.name" class="vp-chat-app__box" type="text" name="agent-name" required maxlength="60" autocomplete="off">
            </label>
          </div>
          <label class="vp-chat-app__field">
            <span class="vp-chat-app__label">{{ say('agentText') }}</span>
            <input v-model="form.text" class="vp-chat-app__box" type="text" name="agent-text" maxlength="140" autocomplete="off">
            <span class="vp-chat-app__hint">{{ say('agentTextHint') }}</span>
          </label>
          <label class="vp-chat-app__field">
            <span class="vp-chat-app__label">{{ say('instructions') }}</span>
            <textarea v-model="form.instructions" class="vp-chat-app__box vp-chat-app__box--tall" name="agent-instructions" rows="10" />
            <span class="vp-chat-app__hint">{{ say('instructionsHint') }}</span>
          </label>
          <label class="vp-chat-app__field">
            <span class="vp-chat-app__label">{{ say('questions') }}</span>
            <textarea v-model="form.questions" class="vp-chat-app__box vp-chat-app__box--mid" name="agent-questions" rows="4" />
            <span class="vp-chat-app__hint">{{ say('questionsHint') }}</span>
          </label>
          <div class="vp-chat-app__pair">
            <label class="vp-chat-app__field">
              <span class="vp-chat-app__label">{{ say('model') }}</span>
              <select v-if="models.length" v-model="form.model" class="vp-chat-app__box" name="agent-model">
                <option value="">{{ say('defaultModel') }}</option>
                <option v-for="(one, index) in models" :key="index" :value="one.value">{{ one.label || one.value }}</option>
              </select>
              <input v-else v-model="form.model" class="vp-chat-app__box" type="text" name="agent-model" autocomplete="off" spellcheck="false" :placeholder="say('defaultModel')">
            </label>
            <div class="vp-chat-app__field" role="group" :aria-label="say('color')">
              <span class="vp-chat-app__label">{{ say('color') }}</span>
              <div class="vp-chat-app__swatches">
                <button v-for="(turn, index) in turns" :key="turn" type="button" class="vp-chat-app__face vp-chat-app__swatch" :class="{ 'vp-chat-app__swatch--on': form.turn === turn }" :style="{ '--vp-chat-app-turn': String(turn) }" :aria-label="say('color') + ' ' + (index + 1)" :aria-pressed="form.turn === turn ? 'true' : 'false'" @click="form.turn = turn" />
              </div>
            </div>
          </div>
          <fieldset class="vp-chat-app__servers">
            <legend class="vp-chat-app__label">{{ say('tools') }}</legend>
            <p class="vp-chat-app__hint">{{ say('toolsHint') }}</p>
            <div v-for="(one, index) in form.tools" :key="index" class="vp-chat-app__server">
              <input v-model="one.name" class="vp-chat-app__box" type="text" autocomplete="off" :placeholder="say('agentName')" :aria-label="say('agentName')">
              <input v-model="one.url" class="vp-chat-app__box" type="url" inputmode="url" pattern="[Hh][Tt][Tt][Pp][Ss]://.+|http://(localhost|127\\.0\\.0\\.1)(:[0-9]+)?(/.*)?" autocomplete="off" spellcheck="false" :placeholder="say('toolAddress')" :aria-label="say('toolAddress')">
              <input v-model="one.token" class="vp-chat-app__box" type="password" autocomplete="off" spellcheck="false" :placeholder="say('toolToken')" :aria-label="say('toolToken')">
              <button type="button" class="vp-chat-app__icon" :aria-label="say('remove')" :title="say('remove')" @click="form.tools.splice(index, 1)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg></button>
            </div>
            <button type="button" class="vp-chat-app__do vp-chat-app__do--add" @click="form.tools.push({ name: '', url: '', token: '' })"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>{{ say('addTool') }}</button>
          </fieldset>
          <div class="vp-chat-app__form-acts">
            <button type="button" class="vp-chat-app__do" @click="form = null">{{ say('cancel') }}</button>
            <button type="submit" class="vp-chat-app__do vp-chat-app__do--main" :disabled="!form.name.trim()">{{ say('save') }}</button>
          </div>
        </form>
        <div v-else class="vp-chat-app__desk">
          <div v-if="!allAgents.length" class="vp-chat-app__empty">
            <span class="vp-chat-app__face vp-chat-app__face--big" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="5" y="8" width="14" height="11" rx="3" /><path d="M12 8V4M9.5 13v1.5M14.5 13v1.5" /></svg></span>
            <strong>{{ say('noAgents') }}</strong>
            <p>{{ say('agentsAbout') }}</p>
            <button v-if="ownAgents" type="button" class="vp-chat-app__do vp-chat-app__do--main" @click="newAgent"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>{{ say('newAgent') }}</button>
          </div>
          <template v-else>
            <div class="vp-chat-app__desk-top">
              <div>
                <h1 class="vp-chat-app__title">{{ say('agents') }}</h1>
                <p class="vp-chat-app__lead">{{ say('agentsAbout') }}</p>
              </div>
              <input v-if="allAgents.length > 6" v-model="findAgent" class="vp-chat-app__find vp-chat-app__find--agents" type="search" :placeholder="say('findAgents')" :aria-label="say('findAgents')">
            </div>
            <p v-if="!shownAgents.length" class="vp-chat-app__none">{{ say('noneFound') }}</p>
            <ul class="vp-chat-app__agents">
              <li v-for="one in shownAgents" :key="one.id" class="vp-chat-app__agent">
                <div class="vp-chat-app__agent-top">
                  <span class="vp-chat-app__face" :style="tint(one)" aria-hidden="true">{{ letter(one) }}</span>
                  <div class="vp-chat-app__agent-name">
                    <strong>{{ one.name }}</strong>
                    <span class="vp-chat-app__badge" :class="{ 'vp-chat-app__badge--own': !one.site }">{{ say(one.site ? 'fromSite' : 'yours') }}</span>
                  </div>
                </div>
                <p class="vp-chat-app__agent-text">{{ one.text || one.instructions }}</p>
                <p v-if="one.tools.length" class="vp-chat-app__agent-tools"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 6.5a4 4 0 0 0-5.2 5.2L4 17v3h3l5.3-5.3a4 4 0 0 0 5.2-5.2L15 12l-3-3z" /></svg>{{ one.tools.map(tool => tool.name || tool.url).join(', ') }}</p>
                <div v-if="asking === one.id" class="vp-chat-app__acts vp-chat-app__acts--sure" role="alert">
                  <span>{{ say('deleteAgent') }}</span>
                  <button type="button" class="vp-chat-app__do vp-chat-app__do--risk" @click="removeAgent(one.id)">{{ say('delete') }}</button>
                  <button type="button" class="vp-chat-app__do" @click="asking = ''">{{ say('cancel') }}</button>
                </div>
                <div v-else class="vp-chat-app__acts">
                  <button type="button" class="vp-chat-app__do vp-chat-app__do--main" :aria-label="say('chatWith', '', one.name)" @click="chatWith(one)">{{ say('startChat') }}</button>
                  <span class="vp-chat-app__space" />
                  <button v-if="!one.site" type="button" class="vp-chat-app__icon" :aria-label="say('edit') + ': ' + one.name" :title="say('edit')" @click="editAgent(one)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16zM14 6l4 4" /></svg></button>
                  <button v-if="ownAgents" type="button" class="vp-chat-app__icon" :aria-label="say('duplicate') + ': ' + one.name" :title="say('duplicate')" @click="duplicate(one)"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></svg></button>
                  <button v-if="!one.site" type="button" class="vp-chat-app__icon" :aria-label="say('delete') + ': ' + one.name" :title="say('delete')" @click="asking = one.id"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14M10 7V5h4v2M7 7l1 12h8l1-12" /></svg></button>
                </div>
              </li>
            </ul>
          </template>
        </div>
      </div>
    </section>
    <section v-else class="vp-chat-app__main" @dragover.prevent="dragOver" @dragleave="dragLeave" @drop.prevent="dropped">
      <div v-if="dragging" class="vp-chat-app__drop" aria-hidden="true"><span><svg viewBox="0 0 24 24"><path d="M12 15V4M7 9l5-5 5 5M5 15v4h14v-4" /></svg>{{ say('dropHere') }}</span></div>
      <header class="vp-chat-app__top">
        <button v-if="showChats" type="button" class="vp-chat-app__icon vp-chat-app__menu" :aria-label="say('menu')" :title="say('menu')" @click="menuOpen = true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg></button>
        <span v-if="agent" class="vp-chat-app__face vp-chat-app__face--small" :style="tint(agent)" aria-hidden="true">{{ letter(agent) }}</span>
        <strong class="vp-chat-app__name">{{ agent ? agent.name : name || say('assistant') }}</strong>
        <select v-if="modelList.length > 1 && !(agent && agent.model)" v-model="picked" class="vp-chat-app__model" :aria-label="say('model')">
          <option v-for="(one, index) in modelList" :key="index" :value="one.value">{{ one.label || one.value }}</option>
        </select>
        <span class="vp-chat-app__space" />
        <button v-if="hasAgents && !showChats" type="button" class="vp-chat-app__icon" :aria-label="say('agents')" :title="say('agents')" @click="showAgents"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="8" width="14" height="11" rx="3" /><path d="M12 8V4M9.5 13v1.5M14.5 13v1.5" /></svg></button>
        <button v-if="usesKey" ref="plug" type="button" class="vp-chat-app__icon" :aria-label="say('connection')" :title="say('connection')" :aria-expanded="sheet ? 'true' : 'false'" @click="sheet ? closeSheet() : openSheet()"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4" /></svg></button>
        <button type="button" class="vp-chat-app__icon" :aria-label="say('newChat')" :title="say('newChat')" @click="newChat"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16zM14 6l4 4" /></svg></button>
      </header>
      <div v-if="sheet" class="vp-chat-app__sheet-shade" @click="closeSheet" />
      <form v-if="sheet" class="vp-chat-app__sheet" role="dialog" aria-modal="true" aria-labelledby="vp-chat-app-sheet-title" @submit.prevent="saveSheet" @keydown.esc.prevent="closeSheet">
        <div class="vp-chat-app__sheet-top">
          <strong id="vp-chat-app-sheet-title" class="vp-chat-app__sheet-title">{{ say('connection') }}</strong>
          <button type="button" class="vp-chat-app__icon" :aria-label="say('close')" :title="say('close')" @click="closeSheet"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg></button>
        </div>
        <p class="vp-chat-app__hint">{{ say('connectionHelp') }}</p>
        <label v-if="provider === 'openai'" class="vp-chat-app__field">
          <span class="vp-chat-app__label">{{ say('address') }}</span>
          <input v-model="sheet.address" class="vp-chat-app__box" type="url" name="server-address" inputmode="url" autocomplete="off" spellcheck="false" placeholder="https://api.openai.com/v1">
          <span class="vp-chat-app__hint">{{ say('addressHint') }}</span>
        </label>
        <label class="vp-chat-app__field">
          <span class="vp-chat-app__label">{{ provider === 'openai' ? say('keyOptional') : say('keyField', '', providerName) }}</span>
          <input v-model="sheet.key" class="vp-chat-app__box" type="password" name="server-key" autocomplete="off" spellcheck="false">
        </label>
        <label class="vp-chat-app__field">
          <span class="vp-chat-app__label">{{ say('model') }}</span>
          <input v-model="sheet.model" class="vp-chat-app__box" type="text" name="server-model" autocomplete="off" spellcheck="false" :placeholder="picked || model">
        </label>
        <div class="vp-chat-app__test">
          <button type="button" class="vp-chat-app__do" :disabled="sheet.state === 'testing'" @click="testSheet"><span v-if="sheet.state === 'testing'" class="vp-chat-app__spin" aria-hidden="true" />{{ say('test') }}</button>
          <p class="vp-chat-app__test-note" :class="sheet.state && 'vp-chat-app__test-note--' + sheet.state" role="status">{{ sheet.message }}</p>
        </div>
        <div v-if="sheet.list.length" class="vp-chat-app__found" role="group" :aria-label="say('model')">
          <button v-for="one in sheet.list.slice(0, 40)" :key="one.value" type="button" class="vp-chat-app__pick" :class="{ 'vp-chat-app__pick--on': sheet.model === one.value }" :aria-pressed="sheet.model === one.value ? 'true' : 'false'" @click="sheet.model = one.value">{{ one.label }}</button>
        </div>
        <div class="vp-chat-app__sheet-acts">
          <button v-if="key" type="button" class="vp-chat-app__do vp-chat-app__do--quiet" @click="sheet.key = ''; forgetKey()">{{ say('keyForget') }}</button>
          <span class="vp-chat-app__space" />
          <button type="button" class="vp-chat-app__do" @click="closeSheet">{{ say('cancel') }}</button>
          <button type="submit" class="vp-chat-app__do vp-chat-app__do--main">{{ say('save') }}</button>
        </div>
      </form>

      <div ref="list" class="vp-chat-app__list" @scroll="scrolled">
        <div class="vp-chat-app__column">
          <div v-if="!messages.length" class="vp-chat-app__welcome">
            <span v-if="agent" class="vp-chat-app__face vp-chat-app__face--big" :style="tint(agent)" aria-hidden="true">{{ letter(agent) }}</span>
            <h1 class="vp-chat-app__hello">{{ agent ? agent.name : say('welcome', welcome) }}</h1>
            <p v-if="agent ? agent.text : intro" class="vp-chat-app__intro">{{ agent ? agent.text : intro }}</p>
            <div v-if="hasAgents && allAgents.length" class="vp-chat-app__picks" role="group" :aria-label="say('agent')">
              <button v-for="one in allAgents.slice(0, 6)" :key="one.id" type="button" class="vp-chat-app__pick" :class="{ 'vp-chat-app__pick--on': agentId === one.id }" :aria-pressed="agentId === one.id ? 'true' : 'false'" @click="pick(one.id)"><span class="vp-chat-app__face vp-chat-app__face--dot" :style="tint(one)" aria-hidden="true">{{ letter(one) }}</span>{{ one.name }}</button>
              <button type="button" class="vp-chat-app__pick vp-chat-app__pick--all" @click="showAgents">{{ say('allAgents') }}</button>
            </div>
            <div v-if="shownIdeas.length" class="vp-chat-app__ideas">
              <button v-for="(idea, index) in shownIdeas" :key="index" type="button" class="vp-chat-app__idea" @click="ask(idea.text || idea.title)">
                <strong>{{ idea.title || idea.text }}</strong>
                <span v-if="idea.title && idea.text">{{ idea.text }}</span>
              </button>
            </div>
          </div>

          <div v-for="(message, index) in messages" :key="index" class="vp-chat-app__message" :class="'vp-chat-app__message--' + (message.role === 'user' ? 'me' : 'them')">
            <div v-if="message.role === 'user' && message.files && message.files.length" class="vp-chat-app__sent">
              <template v-for="(file, f) in message.files" :key="f">
                <img v-if="file.kind === 'image' && file.data" class="vp-chat-app__sent-pic" :src="file.data" :alt="file.name">
                <span v-else class="vp-chat-app__file"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l5 5v13H7zM14 3v5h5" /></svg><span class="vp-chat-app__file-name">{{ file.name }}</span></span>
              </template>
            </div>
            <div v-if="message.role === 'user' && message.content" class="vp-chat-app__mine">{{ message.content }}</div>
            <div v-if="message.role !== 'user' && message.thought" class="vp-chat-app__thought" :class="{ 'vp-chat-app__thought--open': shownThought === index, 'vp-chat-app__thought--now': message.thinking && busy && index === messages.length - 1 }">
              <button type="button" class="vp-chat-app__thought-top" :aria-expanded="shownThought === index ? 'true' : 'false'" @click="shownThought = shownThought === index ? -1 : index">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.2h5c0-.9.4-1.7 1.1-2.2A6 6 0 0 0 12 3z" /></svg>
                <span class="vp-chat-app__thought-label">{{ message.thinking && busy && index === messages.length - 1 ? say('thinking') : sayN('thoughtFor', seconds(message)) }}</span>
                <svg class="vp-chat-app__use-turn" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
              </button>
              <div v-if="shownThought === index" class="vp-chat-app__thought-text">{{ message.thought }}</div>
            </div>
            <div v-if="message.role !== 'user' && message.uses && message.uses.length" class="vp-chat-app__uses">
              <template v-for="(use, u) in message.uses" :key="use.key || u">
                <div v-if="use.state === 'ask'" class="vp-chat-app__ask" role="group" :aria-labelledby="'vp-chat-app-ask-' + use.key">
                  <div class="vp-chat-app__ask-top">
                    <span class="vp-chat-app__ask-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M14.5 6.5a4 4 0 0 0-5.2 5.2L4 17v3h3l5.3-5.3a4 4 0 0 0 5.2-5.2L15 12l-3-3z" /></svg></span>
                    <div class="vp-chat-app__ask-what">
                      <strong :id="'vp-chat-app-ask-' + use.key">{{ toolLine('askTool', use) }}</strong>
                      <span>{{ say('askWhy') }}</span>
                    </div>
                  </div>
                  <pre v-if="use.input && use.input !== '{}'" class="vp-chat-app__ask-input">{{ use.input }}</pre>
                  <div class="vp-chat-app__ask-acts">
                    <button type="button" class="vp-chat-app__do vp-chat-app__do--main" @click="decide(use, 'once')">{{ say('allowOnce') }}</button>
                    <button type="button" class="vp-chat-app__do" @click="decide(use, 'always')">{{ say('allowAlways') }}</button>
                    <button type="button" class="vp-chat-app__do vp-chat-app__do--quiet" @click="decide(use, 'no')">{{ say('deny') }}</button>
                  </div>
                </div>
                <div v-else class="vp-chat-app__use" :class="{ 'vp-chat-app__use--error': use.error, 'vp-chat-app__use--denied': use.state === 'denied', 'vp-chat-app__use--open': shownUse === index + ':' + u }">
                  <button type="button" class="vp-chat-app__use-top" :aria-expanded="shownUse === index + ':' + u ? 'true' : 'false'" :disabled="!use.input && !use.result" @click="shownUse = shownUse === index + ':' + u ? '' : index + ':' + u">
                    <span v-if="!use.done && busy && index === messages.length - 1" class="vp-chat-app__spin" aria-hidden="true" />
                    <svg v-else-if="use.error" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16v.5" /></svg>
                    <svg v-else-if="use.state === 'denied'" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M6 18L18 6" /></svg>
                    <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 6.5a4 4 0 0 0-5.2 5.2L4 17v3h3l5.3-5.3a4 4 0 0 0 5.2-5.2L15 12l-3-3z" /></svg>
                    <span class="vp-chat-app__use-text">{{ useLine(use, busy && index === messages.length - 1) }}</span>
                    <span v-if="use.state === 'denied'" class="vp-chat-app__use-bad vp-chat-app__use-bad--quiet">{{ say('denied') }}</span>
                    <span v-else-if="use.error" class="vp-chat-app__use-bad">{{ say('toolFailed') }}</span>
                    <svg v-if="use.input || use.result" class="vp-chat-app__use-turn" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                  </button>
                  <div v-if="shownUse === index + ':' + u" class="vp-chat-app__use-more">
                    <template v-if="use.input"><span>{{ say('toolInput') }}</span><pre>{{ use.input }}</pre></template>
                    <template v-if="use.result"><span>{{ say('toolResult') }}</span><pre>{{ use.result }}</pre></template>
                  </div>
                </div>
              </template>
            </div>
            <div v-if="message.role !== 'user'" class="vp-chat-app__answer" :class="{ 'vp-chat-app__answer--note': message.local }">
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
              <span v-if="busy && index === messages.length - 1 && message.content && !message.waiting" class="vp-chat-app__caret" aria-hidden="true" />
            </div>
            <div v-if="busy && index === messages.length - 1 && message.waiting" class="vp-chat-app__dots" role="status" :aria-label="say('thinking')"><span /><span /><span /></div>
            <p v-if="message.stopped" class="vp-chat-app__stopped">{{ sayN('tooMany', rounds) }}</p>
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
        <form v-if="needsKey" class="vp-chat-app__key" @submit.prevent="saveKey">
          <strong>{{ say('keyTitle', '', providerName) }}</strong>
          <span>{{ say('keyHelp') }}</span>
          <div class="vp-chat-app__key-row">
            <input v-model="keyDraft" type="password" autocomplete="off" spellcheck="false" :placeholder="say('keyField', '', providerName)" :aria-label="say('keyField', '', providerName)">
            <button type="submit" :disabled="!keyDraft.trim()">{{ say('keySave') }}</button>
          </div>
          <button v-if="provider === 'openai'" type="button" class="vp-chat-app__other" @click="openSheet">{{ say('otherServer') }}</button>
        </form>
        <form v-else class="vp-chat-app__composer" :class="{ 'vp-chat-app__composer--drop': dragging }" @submit.prevent="busy ? stop() : ask(draft)">
          <div v-if="files.length" class="vp-chat-app__files">
            <span v-for="(file, i) in files" :key="file.key" class="vp-chat-app__file" :class="'vp-chat-app__file--' + file.kind">
              <img v-if="file.kind === 'image'" :src="file.data" alt="">
              <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l5 5v13H7zM14 3v5h5" /></svg>
              <span class="vp-chat-app__file-name">{{ file.name }}</span>
              <button type="button" class="vp-chat-app__file-x" :aria-label="say('removeFile', '', file.name)" :title="say('removeFile', '', file.name)" @click="files.splice(i, 1)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg></button>
            </span>
          </div>
          <div class="vp-chat-app__row">
            <button v-if="attachFiles" type="button" class="vp-chat-app__icon vp-chat-app__clip" :aria-label="say('attach')" :title="say('attach')" @click="$refs.picker.click()"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5l-8.2 8.2a5 5 0 0 1-7.1-7.1l8.6-8.6a3.3 3.3 0 0 1 4.7 4.7l-8.6 8.6a1.7 1.7 0 0 1-2.4-2.4l7.9-7.9" /></svg></button>
            <textarea ref="input" v-model="draft" class="vp-chat-app__input" rows="1" name="message" enterkeyhint="send" :placeholder="say('placeholder', placeholder)" :aria-label="say('message')" @keydown.enter.exact="enter" @paste="pasted" />
            <button class="vp-chat-app__send" :class="{ 'vp-chat-app__send--stop': busy }" type="submit" :disabled="!busy && !draft.trim() && !files.length" :aria-label="busy ? say('stop') : say('send')" :title="busy ? say('stop') : say('send')">
              <svg v-if="busy" viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="1.5" /></svg>
              <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
            </button>
          </div>
          <input v-if="attachFiles" ref="picker" class="vp-chat-app__picker" type="file" multiple :accept="accept" tabindex="-1" aria-hidden="true" @change="chooseFiles">
        </form>
        <p v-if="fileNote" class="vp-chat-app__file-note" role="alert">{{ fileNote }}</p>
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
//
// Agents: an assistant set up for one kind of job (name, what it does, instructions on top of "How it should
// behave", its own model, starter questions, connected tools). The site's come from "Agents" (read-only for
// visitors, who can duplicate them); a visitor's own are kept on their device (vp-chat-app-agents:<kept under>).
// "Opens on" says which of the two views a page starts on, so a page can be the agents. A chat remembers its agent.
//
// Connected tools (MCP): remote MCP servers, the site's ("Connected tools (MCP)": name and address, never a
// secret, a prop is public) and an agent's own (a visitor's token stays on their device and goes out only with
// their questions).
// - Anthropic: sent as \`mcp_servers\` + one \`mcp_toolset\` in \`tools\` per server, with the \`mcp-client-2025-11-20\`
//   beta. Anthropic calls the servers; what was used comes back in the stream and is shown as rows above the answer.
// - Your own service: sent as \`mcp_servers: [{ name, url }]\` (with \`authorization_token\` when the visitor gave
//   one). It may stream Anthropic's tool events back and they are shown the same way.
// - OpenAI: nothing is sent (the chat talks to chat completions, which has no remote MCP).
// Only the text of earlier turns is sent back, never the tool rows.
// The words it says itself are in the site's language (App.vue's head: \`htmlAttrs: { lang }\`). A text filled in in
// the Props tab is said as it is written.
const WORDS = {
  en: { newChat: 'New chat', chats: 'Chats', noChats: 'Your chats show up here.', findChats: 'Find a chat', deleteChat: 'Delete chat', kept: 'Chats are kept on this device only.', menu: 'Show chats', closeMenu: 'Hide chats', assistant: 'Assistant', model: 'Model', welcome: 'How can I help you today?', placeholder: 'Ask anything…', message: 'Message', send: 'Send', stop: 'Stop', copy: 'Copy', copied: 'Copied', edit: 'Edit', again: 'Try again', code: 'Code', thinking: 'Thinking', wrong: 'Something went wrong. Please try again in a moment.', noService: 'This is where the answer will be. Say in the settings what the chat talks to to make it real.', refused: 'I can not help with that one. Try asking another way.', noModel: 'Name the model to use in the chat\\'s settings.', badKey: 'The key was not accepted. Check it and give it again.', stopped: 'Stopped.', keyTitle: 'Your {name} key', keyHelp: 'The chat uses your own key. It stays in this browser and goes only to {name}.', keyField: '{name} API key', keySave: 'Use this key', keyForget: 'Forget my key', agents: 'Agents', agent: 'Agent', newAgent: 'New agent', editAgent: 'Edit agent', agentsAbout: 'An agent is an assistant set up for one kind of job, with its own instructions, starter questions and tools.', noAgents: 'No agents yet', findAgents: 'Find an agent', noneFound: 'Nothing found.', fromSite: 'Built in', yours: 'Yours', startChat: 'Start a chat', chatWith: 'Chat with {name}', duplicate: 'Duplicate', copyOf: 'Copy of {name}', delete: 'Delete', deleteAgent: 'Delete this agent? Its chats stay.', cancel: 'Cancel', save: 'Save', back: 'Back', agentName: 'Name', agentText: 'What it does', agentTextHint: 'One line, shown under its name.', instructions: 'Instructions', instructionsHint: 'How it should work and answer, and what to leave alone. The more exact, the better.', questions: 'Starter questions', questionsHint: 'One on each line.', color: 'Colour', defaultModel: 'The chat\\'s own model', tools: 'Connected tools', addTool: 'Add a tool', toolAddress: 'Address (https://…)', toolToken: 'Token, if it needs one', remove: 'Remove', allAgents: 'All agents', used: 'Used {tool} from {name}', using: 'Using {tool} from {name}…', toolFailed: 'Did not work', toolInput: 'Sent', toolResult: 'Came back', thoughtFor: 'Thought for {n} s', askTool: 'Allow {tool} from {name}?', askWhy: 'The assistant wants to use this tool with what is shown below.', allowOnce: 'Allow once', allowAlways: 'Always allow in this chat', deny: 'Don\\'t allow', denied: 'Not allowed', toolFrom: '{tool} from {name}', tooMany: 'Stopped after {n} rounds of tools. Ask it to go on if you need more.', noServer: 'Could not connect to {name}', attach: 'Attach pictures or files', removeFile: 'Remove {name}', tooBig: '{name} is too big. Pictures can be up to 5 MB, text files up to 512 KB.', notFile: '{name} can not be attached. Pictures (PNG, JPEG, GIF, WebP) and text files can.', tooManyFiles: 'Up to {n} files at a time.', dropHere: 'Drop to attach', connection: 'Connection', connectionHelp: 'Where the chat sends your questions, and with which key. Kept on this device only.', address: 'Server address', addressHint: 'Any OpenAI-compatible server: one on your own computer (such as http://localhost:11434/v1) or one on the web (such as https://openrouter.ai/api/v1). Empty: OpenAI.', keyOptional: 'API key (a server on your own computer often needs none)', test: 'Test', testing: 'Testing…', testOk: 'Connected: {n} models found.', testCors: 'Could not reach the server. If it is running, it may not let this site call it (CORS): allow this site\\'s address in the server\\'s settings.', testKey: 'The key was not accepted.', testAddress: 'The server answered, but not as expected. Check the address: it often ends in /v1.', testFailed: 'The server answered with an error ({n}).', close: 'Close', otherServer: 'Use another server', toolsHint: 'Remote MCP servers this agent can use. A token stays on this device and goes only to its server.' },
  nb: { newChat: 'Ny samtale', chats: 'Samtaler', noChats: 'Samtalene dine vises her.', findChats: 'Finn en samtale', deleteChat: 'Slett samtale', kept: 'Samtalene lagres bare på denne enheten.', menu: 'Vis samtaler', closeMenu: 'Skjul samtaler', assistant: 'Assistent', model: 'Modell', welcome: 'Hva kan jeg hjelpe deg med i dag?', placeholder: 'Spør om hva som helst…', message: 'Melding', send: 'Send', stop: 'Stopp', copy: 'Kopier', copied: 'Kopiert', edit: 'Rediger', again: 'Prøv igjen', code: 'Kode', thinking: 'Tenker', wrong: 'Noe gikk galt. Prøv igjen om litt.', noService: 'Her kommer svaret. Si i innstillingene hva chatten snakker med for å gjøre den ekte.', refused: 'Det kan jeg ikke hjelpe med. Prøv å spørre på en annen måte.', noModel: 'Skriv hvilken modell som skal brukes i chattens innstillinger.', badKey: 'Nøkkelen ble ikke godtatt. Sjekk den og gi den på nytt.', stopped: 'Stoppet.', keyTitle: 'Din {name}-nøkkel', keyHelp: 'Chatten bruker din egen nøkkel. Den blir i denne nettleseren og går bare til {name}.', keyField: '{name} API-nøkkel', keySave: 'Bruk denne nøkkelen', keyForget: 'Glem nøkkelen min', agents: 'Agenter', agent: 'Agent', newAgent: 'Ny agent', editAgent: 'Rediger agent', agentsAbout: 'En agent er en assistent satt opp for én type oppgave, med egne instrukser, startspørsmål og verktøy.', noAgents: 'Ingen agenter ennå', findAgents: 'Finn en agent', noneFound: 'Fant ingenting.', fromSite: 'Innebygd', yours: 'Din', startChat: 'Start en samtale', chatWith: 'Snakk med {name}', duplicate: 'Dupliser', copyOf: 'Kopi av {name}', delete: 'Slett', deleteAgent: 'Slette denne agenten? Samtalene blir værende.', cancel: 'Avbryt', save: 'Lagre', back: 'Tilbake', agentName: 'Navn', agentText: 'Hva den gjør', agentTextHint: 'Én linje, vises under navnet.', instructions: 'Instrukser', instructionsHint: 'Hvordan den skal arbeide og svare, og hva den skal la være. Jo mer presist, jo bedre.', questions: 'Startspørsmål', questionsHint: 'Ett på hver linje.', color: 'Farge', defaultModel: 'Chattens egen modell', tools: 'Tilkoblede verktøy', addTool: 'Legg til et verktøy', toolAddress: 'Adresse (https://…)', toolToken: 'Token, hvis det trengs', remove: 'Fjern', allAgents: 'Alle agenter', used: 'Brukte {tool} fra {name}', using: 'Bruker {tool} fra {name}…', toolFailed: 'Virket ikke', toolInput: 'Sendt', toolResult: 'Kom tilbake', thoughtFor: 'Tenkte i {n} s', askTool: 'Tillate {tool} fra {name}?', askWhy: 'Assistenten vil bruke dette verktøyet med det som vises under.', allowOnce: 'Tillat én gang', allowAlways: 'Tillat alltid i denne samtalen', deny: 'Ikke tillat', denied: 'Ikke tillatt', toolFrom: '{tool} fra {name}', tooMany: 'Stoppet etter {n} runder med verktøy. Be den fortsette hvis du trenger mer.', noServer: 'Fikk ikke kontakt med {name}', attach: 'Legg ved bilder eller filer', removeFile: 'Fjern {name}', tooBig: '{name} er for stor. Bilder kan være opptil 5 MB, tekstfiler opptil 512 KB.', notFile: '{name} kan ikke legges ved. Bilder (PNG, JPEG, GIF, WebP) og tekstfiler kan.', tooManyFiles: 'Opptil {n} filer om gangen.', dropHere: 'Slipp for å legge ved', connection: 'Tilkobling', connectionHelp: 'Hvor chatten sender spørsmålene dine, og med hvilken nøkkel. Lagres bare på denne enheten.', address: 'Serveradresse', addressHint: 'En hvilken som helst OpenAI-kompatibel server: en på din egen maskin (som http://localhost:11434/v1) eller en på nettet (som https://openrouter.ai/api/v1). Tom: OpenAI.', keyOptional: 'API-nøkkel (en server på din egen maskin trenger ofte ingen)', test: 'Test', testing: 'Tester…', testOk: 'Tilkoblet: fant {n} modeller.', testCors: 'Fikk ikke kontakt med serveren. Hvis den kjører, slipper den kanskje ikke inn denne siden (CORS): tillat denne sidens adresse i serverens innstillinger.', testKey: 'Nøkkelen ble ikke godtatt.', testAddress: 'Serveren svarte, men ikke som ventet. Sjekk adressen: den slutter ofte på /v1.', testFailed: 'Serveren svarte med en feil ({n}).', close: 'Lukk', otherServer: 'Bruk en annen server', toolsHint: 'Eksterne MCP-servere agenten kan bruke. Et token blir på denne enheten og går bare til sin server.' },
  sv: { newChat: 'Ny chatt', chats: 'Chattar', noChats: 'Dina chattar visas här.', findChats: 'Hitta en chatt', deleteChat: 'Radera chatt', kept: 'Chattar sparas bara på den här enheten.', menu: 'Visa chattar', closeMenu: 'Dölj chattar', assistant: 'Assistent', model: 'Modell', welcome: 'Hur kan jag hjälpa dig i dag?', placeholder: 'Fråga vad som helst…', message: 'Meddelande', send: 'Skicka', stop: 'Stoppa', copy: 'Kopiera', copied: 'Kopierat', edit: 'Redigera', again: 'Försök igen', code: 'Kod', thinking: 'Tänker', wrong: 'Något gick fel. Försök igen om en stund.', noService: 'Här kommer svaret. Ange i inställningarna vad chatten pratar med för att göra den på riktigt.', refused: 'Det kan jag inte hjälpa till med. Försök fråga på ett annat sätt.', noModel: 'Ange vilken modell som ska användas i chattens inställningar.', badKey: 'Nyckeln godtogs inte. Kontrollera den och ange den igen.', stopped: 'Stoppad.', keyTitle: 'Din {name}-nyckel', keyHelp: 'Chatten använder din egen nyckel. Den stannar i den här webbläsaren och går bara till {name}.', keyField: '{name} API-nyckel', keySave: 'Använd nyckeln', keyForget: 'Glöm min nyckel', agents: 'Agenter', agent: 'Agent', newAgent: 'Ny agent', editAgent: 'Redigera agent', agentsAbout: 'En agent är en assistent inställd för en sorts uppgift, med egna instruktioner, startfrågor och verktyg.', noAgents: 'Inga agenter ännu', findAgents: 'Hitta en agent', noneFound: 'Inget hittades.', fromSite: 'Inbyggd', yours: 'Din', startChat: 'Starta en chatt', chatWith: 'Chatta med {name}', duplicate: 'Duplicera', copyOf: 'Kopia av {name}', delete: 'Radera', deleteAgent: 'Radera den här agenten? Dess chattar blir kvar.', cancel: 'Avbryt', save: 'Spara', back: 'Tillbaka', agentName: 'Namn', agentText: 'Vad den gör', agentTextHint: 'En rad, visas under namnet.', instructions: 'Instruktioner', instructionsHint: 'Hur den ska arbeta och svara, och vad den ska låta bli. Ju mer exakt, desto bättre.', questions: 'Startfrågor', questionsHint: 'En på varje rad.', color: 'Färg', defaultModel: 'Chattens egen modell', tools: 'Anslutna verktyg', addTool: 'Lägg till ett verktyg', toolAddress: 'Adress (https://…)', toolToken: 'Token, om det behövs', remove: 'Ta bort', allAgents: 'Alla agenter', used: 'Använde {tool} från {name}', using: 'Använder {tool} från {name}…', toolFailed: 'Fungerade inte', toolInput: 'Skickat', toolResult: 'Kom tillbaka', thoughtFor: 'Tänkte i {n} s', askTool: 'Tillåt {tool} från {name}?', askWhy: 'Assistenten vill använda verktyget med det som visas nedan.', allowOnce: 'Tillåt en gång', allowAlways: 'Tillåt alltid i den här chatten', deny: 'Tillåt inte', denied: 'Inte tillåtet', toolFrom: '{tool} från {name}', tooMany: 'Stoppade efter {n} rundor med verktyg. Be den fortsätta om du behöver mer.', noServer: 'Kunde inte ansluta till {name}', attach: 'Bifoga bilder eller filer', removeFile: 'Ta bort {name}', tooBig: '{name} är för stor. Bilder får vara upp till 5 MB, textfiler upp till 512 KB.', notFile: '{name} kan inte bifogas. Bilder (PNG, JPEG, GIF, WebP) och textfiler kan.', tooManyFiles: 'Upp till {n} filer åt gången.', dropHere: 'Släpp för att bifoga', connection: 'Anslutning', connectionHelp: 'Vart chatten skickar dina frågor, och med vilken nyckel. Sparas bara på den här enheten.', address: 'Serveradress', addressHint: 'Valfri OpenAI-kompatibel server: en på din egen dator (som http://localhost:11434/v1) eller en på webben (som https://openrouter.ai/api/v1). Tom: OpenAI.', keyOptional: 'API-nyckel (en server på din egen dator behöver ofta ingen)', test: 'Testa', testing: 'Testar…', testOk: 'Ansluten: hittade {n} modeller.', testCors: 'Kunde inte nå servern. Om den körs kanske den inte låter den här sidan anropa den (CORS): tillåt sidans adress i serverns inställningar.', testKey: 'Nyckeln godtogs inte.', testAddress: 'Servern svarade, men inte som väntat. Kontrollera adressen: den slutar ofta på /v1.', testFailed: 'Servern svarade med ett fel ({n}).', close: 'Stäng', otherServer: 'Använd en annan server', toolsHint: 'Externa MCP-servrar som agenten kan använda. En token stannar på den här enheten och går bara till sin server.' },
  da: { newChat: 'Ny chat', chats: 'Chats', noChats: 'Dine chats vises her.', findChats: 'Find en chat', deleteChat: 'Slet chat', kept: 'Chats gemmes kun på denne enhed.', menu: 'Vis chats', closeMenu: 'Skjul chats', assistant: 'Assistent', model: 'Model', welcome: 'Hvad kan jeg hjælpe dig med i dag?', placeholder: 'Spørg om hvad som helst…', message: 'Besked', send: 'Send', stop: 'Stop', copy: 'Kopiér', copied: 'Kopieret', edit: 'Redigér', again: 'Prøv igen', code: 'Kode', thinking: 'Tænker', wrong: 'Noget gik galt. Prøv igen om lidt.', noService: 'Her kommer svaret. Angiv i indstillingerne, hvad chatten taler med, for at gøre den rigtig.', refused: 'Det kan jeg ikke hjælpe med. Prøv at spørge på en anden måde.', noModel: 'Angiv modellen i chattens indstillinger.', badKey: 'Nøglen blev ikke godkendt. Tjek den og angiv den igen.', stopped: 'Stoppet.', keyTitle: 'Din {name}-nøgle', keyHelp: 'Chatten bruger din egen nøgle. Den bliver i denne browser og går kun til {name}.', keyField: '{name} API-nøgle', keySave: 'Brug denne nøgle', keyForget: 'Glem min nøgle', agents: 'Agenter', agent: 'Agent', newAgent: 'Ny agent', editAgent: 'Redigér agent', agentsAbout: 'En agent er en assistent sat op til én slags opgave, med egne instrukser, startspørgsmål og værktøjer.', noAgents: 'Ingen agenter endnu', findAgents: 'Find en agent', noneFound: 'Intet fundet.', fromSite: 'Indbygget', yours: 'Din', startChat: 'Start en chat', chatWith: 'Chat med {name}', duplicate: 'Duplikér', copyOf: 'Kopi af {name}', delete: 'Slet', deleteAgent: 'Slet denne agent? Dens chats bliver.', cancel: 'Annullér', save: 'Gem', back: 'Tilbage', agentName: 'Navn', agentText: 'Hvad den gør', agentTextHint: 'Én linje, vist under navnet.', instructions: 'Instrukser', instructionsHint: 'Hvordan den skal arbejde og svare, og hvad den skal lade være. Jo mere præcist, jo bedre.', questions: 'Startspørgsmål', questionsHint: 'Ét på hver linje.', color: 'Farve', defaultModel: 'Chattens egen model', tools: 'Tilsluttede værktøjer', addTool: 'Tilføj et værktøj', toolAddress: 'Adresse (https://…)', toolToken: 'Token, hvis det kræves', remove: 'Fjern', allAgents: 'Alle agenter', used: 'Brugte {tool} fra {name}', using: 'Bruger {tool} fra {name}…', toolFailed: 'Virkede ikke', toolInput: 'Sendt', toolResult: 'Kom tilbage', thoughtFor: 'Tænkte i {n} s', askTool: 'Tillad {tool} fra {name}?', askWhy: 'Assistenten vil bruge dette værktøj med det, der vises nedenfor.', allowOnce: 'Tillad én gang', allowAlways: 'Tillad altid i denne chat', deny: 'Tillad ikke', denied: 'Ikke tilladt', toolFrom: '{tool} fra {name}', tooMany: 'Stoppede efter {n} runder med værktøjer. Bed den fortsætte, hvis du har brug for mere.', noServer: 'Kunne ikke forbinde til {name}', attach: 'Vedhæft billeder eller filer', removeFile: 'Fjern {name}', tooBig: '{name} er for stor. Billeder må fylde op til 5 MB, tekstfiler op til 512 KB.', notFile: '{name} kan ikke vedhæftes. Billeder (PNG, JPEG, GIF, WebP) og tekstfiler kan.', tooManyFiles: 'Op til {n} filer ad gangen.', dropHere: 'Slip for at vedhæfte', connection: 'Forbindelse', connectionHelp: 'Hvor chatten sender dine spørgsmål hen, og med hvilken nøgle. Gemmes kun på denne enhed.', address: 'Serveradresse', addressHint: 'En hvilken som helst OpenAI-kompatibel server: en på din egen computer (som http://localhost:11434/v1) eller en på nettet (som https://openrouter.ai/api/v1). Tom: OpenAI.', keyOptional: 'API-nøgle (en server på din egen computer kræver ofte ingen)', test: 'Test', testing: 'Tester…', testOk: 'Forbundet: fandt {n} modeller.', testCors: 'Kunne ikke nå serveren. Hvis den kører, lader den måske ikke dette websted kalde den (CORS): tillad webstedets adresse i serverens indstillinger.', testKey: 'Nøglen blev ikke godkendt.', testAddress: 'Serveren svarede, men ikke som ventet. Tjek adressen: den slutter ofte på /v1.', testFailed: 'Serveren svarede med en fejl ({n}).', close: 'Luk', otherServer: 'Brug en anden server', toolsHint: 'Eksterne MCP-servere, som agenten kan bruge. Et token bliver på denne enhed og går kun til sin server.' },
  fi: { newChat: 'Uusi keskustelu', chats: 'Keskustelut', noChats: 'Keskustelusi näkyvät tässä.', findChats: 'Etsi keskustelu', deleteChat: 'Poista keskustelu', kept: 'Keskustelut tallennetaan vain tälle laitteelle.', menu: 'Näytä keskustelut', closeMenu: 'Piilota keskustelut', assistant: 'Avustaja', model: 'Malli', welcome: 'Miten voin auttaa tänään?', placeholder: 'Kysy mitä tahansa…', message: 'Viesti', send: 'Lähetä', stop: 'Pysäytä', copy: 'Kopioi', copied: 'Kopioitu', edit: 'Muokkaa', again: 'Yritä uudelleen', code: 'Koodi', thinking: 'Miettii', wrong: 'Jokin meni vikaan. Yritä hetken päästä uudelleen.', noService: 'Tähän tulee vastaus. Kerro asetuksissa, mihin chat on yhteydessä, niin se toimii oikeasti.', refused: 'En voi auttaa siinä. Kokeile kysyä toisin.', noModel: 'Kirjoita käytettävä malli chatin asetuksiin.', badKey: 'Avainta ei hyväksytty. Tarkista se ja anna uudelleen.', stopped: 'Pysäytetty.', keyTitle: 'Oma {name}-avaimesi', keyHelp: 'Chat käyttää omaa avaintasi. Se pysyy tässä selaimessa ja menee vain palveluun {name}.', keyField: '{name} API-avain', keySave: 'Käytä tätä avainta', keyForget: 'Unohda avaimeni', agents: 'Agentit', agent: 'Agentti', newAgent: 'Uusi agentti', editAgent: 'Muokkaa agenttia', agentsAbout: 'Agentti on yhtä tehtävää varten tehty avustaja, jolla on omat ohjeet, aloituskysymykset ja työkalut.', noAgents: 'Ei vielä agentteja', findAgents: 'Etsi agentti', noneFound: 'Mitään ei löytynyt.', fromSite: 'Valmiina', yours: 'Oma', startChat: 'Aloita keskustelu', chatWith: 'Keskustele: {name}', duplicate: 'Monista', copyOf: 'Kopio: {name}', delete: 'Poista', deleteAgent: 'Poistetaanko tämä agentti? Sen keskustelut säilyvät.', cancel: 'Peruuta', save: 'Tallenna', back: 'Takaisin', agentName: 'Nimi', agentText: 'Mitä se tekee', agentTextHint: 'Yksi rivi, näkyy nimen alla.', instructions: 'Ohjeet', instructionsHint: 'Miten sen pitää toimia ja vastata ja mitä jättää tekemättä. Mitä tarkemmin, sitä parempi.', questions: 'Aloituskysymykset', questionsHint: 'Yksi kullekin riville.', color: 'Väri', defaultModel: 'Chatin oma malli', tools: 'Yhdistetyt työkalut', addTool: 'Lisää työkalu', toolAddress: 'Osoite (https://…)', toolToken: 'Tunnus, jos tarvitaan', remove: 'Poista', allAgents: 'Kaikki agentit', used: 'Käytti työkalua {tool} ({name})', using: 'Käyttää työkalua {tool} ({name})…', toolFailed: 'Ei onnistunut', toolInput: 'Lähetetty', toolResult: 'Palautui', thoughtFor: 'Mietti {n} s', askTool: 'Sallitaanko {tool} ({name})?', askWhy: 'Avustaja haluaa käyttää tätä työkalua alla näkyvillä tiedoilla.', allowOnce: 'Salli kerran', allowAlways: 'Salli aina tässä keskustelussa', deny: 'Älä salli', denied: 'Ei sallittu', toolFrom: '{tool} ({name})', tooMany: 'Pysähtyi {n} työkalukierroksen jälkeen. Pyydä sitä jatkamaan, jos tarvitset lisää.', noServer: 'Yhteys palvelimeen {name} ei onnistunut', attach: 'Liitä kuvia tai tiedostoja', removeFile: 'Poista {name}', tooBig: '{name} on liian suuri. Kuvat voivat olla enintään 5 Mt, tekstitiedostot 512 kt.', notFile: 'Tiedostoa {name} ei voi liittää. Kuvat (PNG, JPEG, GIF, WebP) ja tekstitiedostot käyvät.', tooManyFiles: 'Enintään {n} tiedostoa kerrallaan.', dropHere: 'Pudota liittääksesi', connection: 'Yhteys', connectionHelp: 'Minne chat lähettää kysymyksesi ja millä avaimella. Tallennetaan vain tälle laitteelle.', address: 'Palvelimen osoite', addressHint: 'Mikä tahansa OpenAI-yhteensopiva palvelin: omalla koneellasi (kuten http://localhost:11434/v1) tai verkossa (kuten https://openrouter.ai/api/v1). Tyhjä: OpenAI.', keyOptional: 'API-avain (oman koneen palvelin ei usein tarvitse sitä)', test: 'Testaa', testing: 'Testataan…', testOk: 'Yhdistetty: löytyi {n} mallia.', testCors: 'Palvelinta ei tavoitettu. Jos se on käynnissä, se ei ehkä salli tämän sivuston kutsuja (CORS): salli sivuston osoite palvelimen asetuksissa.', testKey: 'Avainta ei hyväksytty.', testAddress: 'Palvelin vastasi, mutta ei odotetusti. Tarkista osoite: se päättyy usein /v1.', testFailed: 'Palvelin vastasi virheellä ({n}).', close: 'Sulje', otherServer: 'Käytä toista palvelinta', toolsHint: 'Etä-MCP-palvelimet, joita agentti voi käyttää. Tunnus pysyy tällä laitteella ja menee vain omalle palvelimelleen.' },
  de: { newChat: 'Neuer Chat', chats: 'Chats', noChats: 'Deine Chats erscheinen hier.', findChats: 'Chat suchen', deleteChat: 'Chat löschen', kept: 'Chats werden nur auf diesem Gerät gespeichert.', menu: 'Chats zeigen', closeMenu: 'Chats ausblenden', assistant: 'Assistent', model: 'Modell', welcome: 'Wobei kann ich dir heute helfen?', placeholder: 'Frag, was du willst…', message: 'Nachricht', send: 'Senden', stop: 'Stoppen', copy: 'Kopieren', copied: 'Kopiert', edit: 'Bearbeiten', again: 'Nochmal versuchen', code: 'Code', thinking: 'Denkt nach', wrong: 'Etwas ist schiefgelaufen. Bitte versuche es gleich noch einmal.', noService: 'Hier erscheint die Antwort. Gib in den Einstellungen an, womit der Chat spricht, damit er echt antwortet.', refused: 'Dabei kann ich nicht helfen. Versuch es anders zu fragen.', noModel: 'Gib in den Einstellungen des Chats das Modell an.', badKey: 'Der Schlüssel wurde nicht angenommen. Prüfe ihn und gib ihn erneut ein.', stopped: 'Gestoppt.', keyTitle: 'Dein {name}-Schlüssel', keyHelp: 'Der Chat nutzt deinen eigenen Schlüssel. Er bleibt in diesem Browser und geht nur an {name}.', keyField: '{name}-API-Schlüssel', keySave: 'Diesen Schlüssel nutzen', keyForget: 'Meinen Schlüssel vergessen', agents: 'Agenten', agent: 'Agent', newAgent: 'Neuer Agent', editAgent: 'Agent bearbeiten', agentsAbout: 'Ein Agent ist ein Assistent für eine bestimmte Aufgabe, mit eigenen Anweisungen, Startfragen und Werkzeugen.', noAgents: 'Noch keine Agenten', findAgents: 'Agent suchen', noneFound: 'Nichts gefunden.', fromSite: 'Mitgeliefert', yours: 'Eigener', startChat: 'Chat starten', chatWith: 'Mit {name} chatten', duplicate: 'Duplizieren', copyOf: 'Kopie von {name}', delete: 'Löschen', deleteAgent: 'Diesen Agenten löschen? Seine Chats bleiben.', cancel: 'Abbrechen', save: 'Speichern', back: 'Zurück', agentName: 'Name', agentText: 'Was er tut', agentTextHint: 'Eine Zeile, erscheint unter dem Namen.', instructions: 'Anweisungen', instructionsHint: 'Wie er arbeiten und antworten soll und was er lassen soll. Je genauer, desto besser.', questions: 'Startfragen', questionsHint: 'Eine pro Zeile.', color: 'Farbe', defaultModel: 'Das Modell des Chats', tools: 'Verbundene Werkzeuge', addTool: 'Werkzeug hinzufügen', toolAddress: 'Adresse (https://…)', toolToken: 'Token, falls nötig', remove: 'Entfernen', allAgents: 'Alle Agenten', used: '{tool} von {name} verwendet', using: 'Verwendet {tool} von {name}…', toolFailed: 'Hat nicht geklappt', toolInput: 'Gesendet', toolResult: 'Zurückgekommen', thoughtFor: '{n} s nachgedacht', askTool: '{tool} von {name} erlauben?', askWhy: 'Der Assistent möchte dieses Werkzeug mit den unten gezeigten Angaben nutzen.', allowOnce: 'Einmal erlauben', allowAlways: 'In diesem Chat immer erlauben', deny: 'Nicht erlauben', denied: 'Nicht erlaubt', toolFrom: '{tool} von {name}', tooMany: 'Nach {n} Runden mit Werkzeugen gestoppt. Bitte ihn weiterzumachen, wenn du mehr brauchst.', noServer: 'Keine Verbindung zu {name}', attach: 'Bilder oder Dateien anhängen', removeFile: '{name} entfernen', tooBig: '{name} ist zu groß. Bilder dürfen bis zu 5 MB haben, Textdateien bis zu 512 KB.', notFile: '{name} kann nicht angehängt werden. Bilder (PNG, JPEG, GIF, WebP) und Textdateien gehen.', tooManyFiles: 'Bis zu {n} Dateien auf einmal.', dropHere: 'Zum Anhängen loslassen', connection: 'Verbindung', connectionHelp: 'Wohin der Chat deine Fragen schickt und mit welchem Schlüssel. Nur auf diesem Gerät gespeichert.', address: 'Serveradresse', addressHint: 'Jeder OpenAI-kompatible Server: einer auf deinem Rechner (etwa http://localhost:11434/v1) oder einer im Netz (etwa https://openrouter.ai/api/v1). Leer: OpenAI.', keyOptional: 'API-Schlüssel (ein Server auf deinem Rechner braucht oft keinen)', test: 'Testen', testing: 'Teste…', testOk: 'Verbunden: {n} Modelle gefunden.', testCors: 'Der Server war nicht erreichbar. Läuft er, lässt er diese Seite vielleicht nicht zu (CORS): erlaube die Adresse dieser Seite in den Einstellungen des Servers.', testKey: 'Der Schlüssel wurde nicht angenommen.', testAddress: 'Der Server hat geantwortet, aber nicht wie erwartet. Prüfe die Adresse: Sie endet oft auf /v1.', testFailed: 'Der Server hat mit einem Fehler geantwortet ({n}).', close: 'Schließen', otherServer: 'Anderen Server nutzen', toolsHint: 'Entfernte MCP-Server, die dieser Agent nutzen kann. Ein Token bleibt auf diesem Gerät und geht nur an seinen Server.' },
  fr: { newChat: 'Nouvelle conversation', chats: 'Conversations', noChats: 'Vos conversations apparaissent ici.', findChats: 'Trouver une conversation', deleteChat: 'Supprimer la conversation', kept: 'Les conversations restent sur cet appareil uniquement.', menu: 'Afficher les conversations', closeMenu: 'Masquer les conversations', assistant: 'Assistant', model: 'Modèle', welcome: 'Comment puis-je vous aider aujourd’hui ?', placeholder: 'Posez votre question…', message: 'Message', send: 'Envoyer', stop: 'Arrêter', copy: 'Copier', copied: 'Copié', edit: 'Modifier', again: 'Réessayer', code: 'Code', thinking: 'Réflexion', wrong: 'Un problème est survenu. Veuillez réessayer dans un instant.', noService: 'La réponse apparaîtra ici. Indiquez dans les réglages avec quoi le chat communique pour qu’il réponde vraiment.', refused: 'Je ne peux pas vous aider sur ce point. Essayez de demander autrement.', noModel: 'Indiquez le modèle dans les réglages du chat.', badKey: 'La clé n’a pas été acceptée. Vérifiez-la et saisissez-la de nouveau.', stopped: 'Arrêté.', keyTitle: 'Votre clé {name}', keyHelp: 'Le chat utilise votre propre clé. Elle reste dans ce navigateur et n’est envoyée qu’à {name}.', keyField: 'Clé API {name}', keySave: 'Utiliser cette clé', keyForget: 'Oublier ma clé', agents: 'Agents', agent: 'Agent', newAgent: 'Nouvel agent', editAgent: 'Modifier l’agent', agentsAbout: 'Un agent est un assistant préparé pour un type de tâche, avec ses propres instructions, questions de départ et outils.', noAgents: 'Aucun agent pour l’instant', findAgents: 'Trouver un agent', noneFound: 'Aucun résultat.', fromSite: 'Intégré', yours: 'Le vôtre', startChat: 'Démarrer une conversation', chatWith: 'Discuter avec {name}', duplicate: 'Dupliquer', copyOf: 'Copie de {name}', delete: 'Supprimer', deleteAgent: 'Supprimer cet agent ? Ses conversations restent.', cancel: 'Annuler', save: 'Enregistrer', back: 'Retour', agentName: 'Nom', agentText: 'Ce qu’il fait', agentTextHint: 'Une ligne, affichée sous son nom.', instructions: 'Instructions', instructionsHint: 'Comment il doit travailler et répondre, et ce qu’il doit éviter. Plus c’est précis, mieux c’est.', questions: 'Questions de départ', questionsHint: 'Une par ligne.', color: 'Couleur', defaultModel: 'Le modèle du chat', tools: 'Outils connectés', addTool: 'Ajouter un outil', toolAddress: 'Adresse (https://…)', toolToken: 'Jeton, si nécessaire', remove: 'Retirer', allAgents: 'Tous les agents', used: 'A utilisé {tool} de {name}', using: 'Utilise {tool} de {name}…', toolFailed: 'N’a pas fonctionné', toolInput: 'Envoyé', toolResult: 'Reçu', thoughtFor: 'Réflexion de {n} s', askTool: 'Autoriser {tool} de {name} ?', askWhy: 'L’assistant veut utiliser cet outil avec ce qui est affiché ci-dessous.', allowOnce: 'Autoriser une fois', allowAlways: 'Toujours autoriser dans cette conversation', deny: 'Ne pas autoriser', denied: 'Non autorisé', toolFrom: '{tool} de {name}', tooMany: 'Arrêté après {n} tours d’outils. Demandez-lui de continuer si vous avez besoin de plus.', noServer: 'Connexion impossible à {name}', attach: 'Joindre des images ou des fichiers', removeFile: 'Retirer {name}', tooBig: '{name} est trop volumineux. Les images peuvent faire jusqu’à 5 Mo, les fichiers texte jusqu’à 512 Ko.', notFile: '{name} ne peut pas être joint. Les images (PNG, JPEG, GIF, WebP) et les fichiers texte le peuvent.', tooManyFiles: 'Jusqu’à {n} fichiers à la fois.', dropHere: 'Déposez pour joindre', connection: 'Connexion', connectionHelp: 'Où la conversation envoie vos questions, et avec quelle clé. Gardé sur cet appareil uniquement.', address: 'Adresse du serveur', addressHint: 'N’importe quel serveur compatible OpenAI : sur votre ordinateur (comme http://localhost:11434/v1) ou sur le web (comme https://openrouter.ai/api/v1). Vide : OpenAI.', keyOptional: 'Clé API (un serveur sur votre ordinateur n’en demande souvent pas)', test: 'Tester', testing: 'Test…', testOk: 'Connecté : {n} modèles trouvés.', testCors: 'Impossible de joindre le serveur. S’il tourne, il n’autorise peut-être pas ce site (CORS) : autorisez l’adresse de ce site dans ses réglages.', testKey: 'La clé n’a pas été acceptée.', testAddress: 'Le serveur a répondu, mais pas comme prévu. Vérifiez l’adresse : elle se termine souvent par /v1.', testFailed: 'Le serveur a répondu par une erreur ({n}).', close: 'Fermer', otherServer: 'Utiliser un autre serveur', toolsHint: 'Serveurs MCP distants que cet agent peut utiliser. Un jeton reste sur cet appareil et ne va qu’à son serveur.' },
  es: { newChat: 'Nueva conversación', chats: 'Conversaciones', noChats: 'Tus conversaciones aparecen aquí.', findChats: 'Buscar una conversación', deleteChat: 'Eliminar conversación', kept: 'Las conversaciones se guardan solo en este dispositivo.', menu: 'Mostrar conversaciones', closeMenu: 'Ocultar conversaciones', assistant: 'Asistente', model: 'Modelo', welcome: '¿En qué puedo ayudarte hoy?', placeholder: 'Pregunta lo que quieras…', message: 'Mensaje', send: 'Enviar', stop: 'Detener', copy: 'Copiar', copied: 'Copiado', edit: 'Editar', again: 'Reintentar', code: 'Código', thinking: 'Pensando', wrong: 'Algo ha ido mal. Inténtalo de nuevo en un momento.', noService: 'Aquí aparecerá la respuesta. Indica en los ajustes con qué habla el chat para que funcione de verdad.', refused: 'No puedo ayudarte con eso. Prueba a preguntarlo de otra forma.', noModel: 'Indica el modelo en los ajustes del chat.', badKey: 'La clave no fue aceptada. Revísala y vuelve a darla.', stopped: 'Detenido.', keyTitle: 'Tu clave de {name}', keyHelp: 'El chat usa tu propia clave. Se queda en este navegador y solo va a {name}.', keyField: 'Clave API de {name}', keySave: 'Usar esta clave', keyForget: 'Olvidar mi clave', agents: 'Agentes', agent: 'Agente', newAgent: 'Nuevo agente', editAgent: 'Editar agente', agentsAbout: 'Un agente es un asistente preparado para un tipo de tarea, con sus propias instrucciones, preguntas iniciales y herramientas.', noAgents: 'Aún no hay agentes', findAgents: 'Buscar un agente', noneFound: 'No se encontró nada.', fromSite: 'Incluido', yours: 'Tuyo', startChat: 'Iniciar una conversación', chatWith: 'Hablar con {name}', duplicate: 'Duplicar', copyOf: 'Copia de {name}', delete: 'Eliminar', deleteAgent: '¿Eliminar este agente? Sus conversaciones se conservan.', cancel: 'Cancelar', save: 'Guardar', back: 'Atrás', agentName: 'Nombre', agentText: 'Qué hace', agentTextHint: 'Una línea, se muestra bajo su nombre.', instructions: 'Instrucciones', instructionsHint: 'Cómo debe trabajar y responder, y qué debe evitar. Cuanto más preciso, mejor.', questions: 'Preguntas iniciales', questionsHint: 'Una en cada línea.', color: 'Color', defaultModel: 'El modelo del chat', tools: 'Herramientas conectadas', addTool: 'Añadir una herramienta', toolAddress: 'Dirección (https://…)', toolToken: 'Token, si hace falta', remove: 'Quitar', allAgents: 'Todos los agentes', used: 'Usó {tool} de {name}', using: 'Usando {tool} de {name}…', toolFailed: 'No funcionó', toolInput: 'Enviado', toolResult: 'Devuelto', thoughtFor: 'Pensó durante {n} s', askTool: '¿Permitir {tool} de {name}?', askWhy: 'El asistente quiere usar esta herramienta con lo que se muestra abajo.', allowOnce: 'Permitir una vez', allowAlways: 'Permitir siempre en esta conversación', deny: 'No permitir', denied: 'No permitido', toolFrom: '{tool} de {name}', tooMany: 'Se detuvo tras {n} rondas de herramientas. Pídele que siga si necesitas más.', noServer: 'No se pudo conectar con {name}', attach: 'Adjuntar imágenes o archivos', removeFile: 'Quitar {name}', tooBig: '{name} es demasiado grande. Las imágenes pueden pesar hasta 5 MB y los archivos de texto hasta 512 KB.', notFile: '{name} no se puede adjuntar. Se pueden imágenes (PNG, JPEG, GIF, WebP) y archivos de texto.', tooManyFiles: 'Hasta {n} archivos a la vez.', dropHere: 'Suelta para adjuntar', connection: 'Conexión', connectionHelp: 'Adónde envía el chat tus preguntas, y con qué clave. Se guarda solo en este dispositivo.', address: 'Dirección del servidor', addressHint: 'Cualquier servidor compatible con OpenAI: uno en tu ordenador (como http://localhost:11434/v1) o uno en la web (como https://openrouter.ai/api/v1). Vacío: OpenAI.', keyOptional: 'Clave API (un servidor en tu ordenador a menudo no la necesita)', test: 'Probar', testing: 'Probando…', testOk: 'Conectado: {n} modelos encontrados.', testCors: 'No se pudo llegar al servidor. Si está en marcha, puede que no deje llamarlo a este sitio (CORS): permite la dirección de este sitio en sus ajustes.', testKey: 'La clave no fue aceptada.', testAddress: 'El servidor respondió, pero no como se esperaba. Revisa la dirección: suele terminar en /v1.', testFailed: 'El servidor respondió con un error ({n}).', close: 'Cerrar', otherServer: 'Usar otro servidor', toolsHint: 'Servidores MCP remotos que este agente puede usar. Un token se queda en este dispositivo y solo va a su servidor.' },
  it: { newChat: 'Nuova chat', chats: 'Chat', noChats: 'Le tue chat compaiono qui.', findChats: 'Trova una chat', deleteChat: 'Elimina chat', kept: 'Le chat restano solo su questo dispositivo.', menu: 'Mostra chat', closeMenu: 'Nascondi chat', assistant: 'Assistente', model: 'Modello', welcome: 'Come posso aiutarti oggi?', placeholder: 'Chiedi qualsiasi cosa…', message: 'Messaggio', send: 'Invia', stop: 'Ferma', copy: 'Copia', copied: 'Copiato', edit: 'Modifica', again: 'Riprova', code: 'Codice', thinking: 'Sta pensando', wrong: 'Qualcosa è andato storto. Riprova tra un momento.', noService: 'Qui apparirà la risposta. Indica nelle impostazioni con cosa parla la chat per renderla reale.', refused: 'Non posso aiutarti con questo. Prova a chiedere in un altro modo.', noModel: 'Indica il modello nelle impostazioni della chat.', badKey: 'La chiave non è stata accettata. Controllala e inseriscila di nuovo.', stopped: 'Fermato.', keyTitle: 'La tua chiave {name}', keyHelp: 'La chat usa la tua chiave. Resta in questo browser e va solo a {name}.', keyField: 'Chiave API {name}', keySave: 'Usa questa chiave', keyForget: 'Dimentica la mia chiave', agents: 'Agenti', agent: 'Agente', newAgent: 'Nuovo agente', editAgent: 'Modifica agente', agentsAbout: 'Un agente è un assistente preparato per un tipo di compito, con istruzioni, domande iniziali e strumenti propri.', noAgents: 'Ancora nessun agente', findAgents: 'Trova un agente', noneFound: 'Nessun risultato.', fromSite: 'Incluso', yours: 'Tuo', startChat: 'Avvia una chat', chatWith: 'Chatta con {name}', duplicate: 'Duplica', copyOf: 'Copia di {name}', delete: 'Elimina', deleteAgent: 'Eliminare questo agente? Le sue chat restano.', cancel: 'Annulla', save: 'Salva', back: 'Indietro', agentName: 'Nome', agentText: 'Che cosa fa', agentTextHint: 'Una riga, mostrata sotto il nome.', instructions: 'Istruzioni', instructionsHint: 'Come deve lavorare e rispondere, e che cosa deve evitare. Più è preciso, meglio è.', questions: 'Domande iniziali', questionsHint: 'Una per riga.', color: 'Colore', defaultModel: 'Il modello della chat', tools: 'Strumenti collegati', addTool: 'Aggiungi uno strumento', toolAddress: 'Indirizzo (https://…)', toolToken: 'Token, se serve', remove: 'Rimuovi', allAgents: 'Tutti gli agenti', used: 'Ha usato {tool} di {name}', using: 'Sta usando {tool} di {name}…', toolFailed: 'Non ha funzionato', toolInput: 'Inviato', toolResult: 'Ricevuto', thoughtFor: 'Ha pensato per {n} s', askTool: 'Consentire {tool} di {name}?', askWhy: 'L’assistente vuole usare questo strumento con quanto mostrato qui sotto.', allowOnce: 'Consenti una volta', allowAlways: 'Consenti sempre in questa chat', deny: 'Non consentire', denied: 'Non consentito', toolFrom: '{tool} di {name}', tooMany: 'Fermato dopo {n} giri di strumenti. Chiedigli di continuare se ti serve altro.', noServer: 'Impossibile collegarsi a {name}', attach: 'Allega immagini o file', removeFile: 'Rimuovi {name}', tooBig: '{name} è troppo grande. Le immagini possono arrivare a 5 MB, i file di testo a 512 KB.', notFile: '{name} non si può allegare. Si possono allegare immagini (PNG, JPEG, GIF, WebP) e file di testo.', tooManyFiles: 'Fino a {n} file alla volta.', dropHere: 'Rilascia per allegare', connection: 'Connessione', connectionHelp: 'Dove la chat invia le tue domande, e con quale chiave. Resta solo su questo dispositivo.', address: 'Indirizzo del server', addressHint: 'Qualsiasi server compatibile con OpenAI: sul tuo computer (come http://localhost:11434/v1) o sul web (come https://openrouter.ai/api/v1). Vuoto: OpenAI.', keyOptional: 'Chiave API (un server sul tuo computer spesso non la richiede)', test: 'Prova', testing: 'Prova in corso…', testOk: 'Connesso: trovati {n} modelli.', testCors: 'Impossibile raggiungere il server. Se è attivo, forse non permette a questo sito di chiamarlo (CORS): consenti l’indirizzo di questo sito nelle sue impostazioni.', testKey: 'La chiave non è stata accettata.', testAddress: 'Il server ha risposto, ma non come previsto. Controlla l’indirizzo: spesso finisce con /v1.', testFailed: 'Il server ha risposto con un errore ({n}).', close: 'Chiudi', otherServer: 'Usa un altro server', toolsHint: 'Server MCP remoti che questo agente può usare. Un token resta su questo dispositivo e va solo al suo server.' },
  nl: { newChat: 'Nieuw gesprek', chats: 'Gesprekken', noChats: 'Je gesprekken verschijnen hier.', findChats: 'Zoek een gesprek', deleteChat: 'Gesprek verwijderen', kept: 'Gesprekken blijven alleen op dit apparaat.', menu: 'Gesprekken tonen', closeMenu: 'Gesprekken verbergen', assistant: 'Assistent', model: 'Model', welcome: 'Waarmee kan ik je vandaag helpen?', placeholder: 'Vraag wat je wilt…', message: 'Bericht', send: 'Versturen', stop: 'Stoppen', copy: 'Kopiëren', copied: 'Gekopieerd', edit: 'Bewerken', again: 'Opnieuw proberen', code: 'Code', thinking: 'Denkt na', wrong: 'Er ging iets mis. Probeer het zo meteen opnieuw.', noService: 'Hier komt het antwoord. Geef in de instellingen aan waarmee de chat praat om hem echt te maken.', refused: 'Daar kan ik niet mee helpen. Probeer het anders te vragen.', noModel: 'Geef het model op in de instellingen van de chat.', badKey: 'De sleutel werd niet geaccepteerd. Controleer hem en geef hem opnieuw.', stopped: 'Gestopt.', keyTitle: 'Je {name}-sleutel', keyHelp: 'De chat gebruikt je eigen sleutel. Die blijft in deze browser en gaat alleen naar {name}.', keyField: '{name} API-sleutel', keySave: 'Deze sleutel gebruiken', keyForget: 'Mijn sleutel vergeten', agents: 'Agents', agent: 'Agent', newAgent: 'Nieuwe agent', editAgent: 'Agent bewerken', agentsAbout: 'Een agent is een assistent die is ingesteld voor één soort taak, met eigen instructies, startvragen en tools.', noAgents: 'Nog geen agents', findAgents: 'Zoek een agent', noneFound: 'Niets gevonden.', fromSite: 'Ingebouwd', yours: 'Van jou', startChat: 'Start een gesprek', chatWith: 'Praat met {name}', duplicate: 'Dupliceren', copyOf: 'Kopie van {name}', delete: 'Verwijderen', deleteAgent: 'Deze agent verwijderen? De gesprekken blijven.', cancel: 'Annuleren', save: 'Opslaan', back: 'Terug', agentName: 'Naam', agentText: 'Wat hij doet', agentTextHint: 'Eén regel, getoond onder de naam.', instructions: 'Instructies', instructionsHint: 'Hoe hij moet werken en antwoorden, en wat hij moet laten. Hoe preciezer, hoe beter.', questions: 'Startvragen', questionsHint: 'Eén per regel.', color: 'Kleur', defaultModel: 'Het model van de chat', tools: 'Verbonden tools', addTool: 'Tool toevoegen', toolAddress: 'Adres (https://…)', toolToken: 'Token, indien nodig', remove: 'Weghalen', allAgents: 'Alle agents', used: '{tool} van {name} gebruikt', using: 'Gebruikt {tool} van {name}…', toolFailed: 'Werkte niet', toolInput: 'Verstuurd', toolResult: 'Kwam terug', thoughtFor: '{n} s nagedacht', askTool: '{tool} van {name} toestaan?', askWhy: 'De assistent wil deze tool gebruiken met wat hieronder staat.', allowOnce: 'Eén keer toestaan', allowAlways: 'Altijd toestaan in dit gesprek', deny: 'Niet toestaan', denied: 'Niet toegestaan', toolFrom: '{tool} van {name}', tooMany: 'Gestopt na {n} rondes met tools. Vraag hem door te gaan als je meer nodig hebt.', noServer: 'Kon geen verbinding maken met {name}', attach: 'Afbeeldingen of bestanden toevoegen', removeFile: '{name} weghalen', tooBig: '{name} is te groot. Afbeeldingen mogen tot 5 MB zijn, tekstbestanden tot 512 KB.', notFile: '{name} kan niet worden toegevoegd. Afbeeldingen (PNG, JPEG, GIF, WebP) en tekstbestanden wel.', tooManyFiles: 'Tot {n} bestanden tegelijk.', dropHere: 'Loslaten om toe te voegen', connection: 'Verbinding', connectionHelp: 'Waar de chat je vragen heen stuurt, en met welke sleutel. Blijft alleen op dit apparaat.', address: 'Serveradres', addressHint: 'Elke OpenAI-compatibele server: een op je eigen computer (zoals http://localhost:11434/v1) of een op het web (zoals https://openrouter.ai/api/v1). Leeg: OpenAI.', keyOptional: 'API-sleutel (een server op je eigen computer heeft er vaak geen nodig)', test: 'Testen', testing: 'Bezig met testen…', testOk: 'Verbonden: {n} modellen gevonden.', testCors: 'Kon de server niet bereiken. Als hij draait, laat hij deze site misschien niet toe (CORS): sta het adres van deze site toe in de instellingen van de server.', testKey: 'De sleutel werd niet geaccepteerd.', testAddress: 'De server antwoordde, maar niet zoals verwacht. Controleer het adres: het eindigt vaak op /v1.', testFailed: 'De server antwoordde met een fout ({n}).', close: 'Sluiten', otherServer: 'Een andere server gebruiken', toolsHint: 'Externe MCP-servers die deze agent kan gebruiken. Een token blijft op dit apparaat en gaat alleen naar zijn server.' },
  pt: { newChat: 'Nova conversa', chats: 'Conversas', noChats: 'As suas conversas aparecem aqui.', findChats: 'Procurar conversa', deleteChat: 'Apagar conversa', kept: 'As conversas ficam só neste dispositivo.', menu: 'Mostrar conversas', closeMenu: 'Ocultar conversas', assistant: 'Assistente', model: 'Modelo', welcome: 'Como posso ajudar hoje?', placeholder: 'Pergunte o que quiser…', message: 'Mensagem', send: 'Enviar', stop: 'Parar', copy: 'Copiar', copied: 'Copiado', edit: 'Editar', again: 'Tentar de novo', code: 'Código', thinking: 'A pensar', wrong: 'Algo correu mal. Tente novamente daqui a pouco.', noService: 'A resposta aparecerá aqui. Indique nas definições com o que o chat fala para o tornar real.', refused: 'Não posso ajudar com isso. Tente perguntar de outra forma.', noModel: 'Indique o modelo nas definições do chat.', badKey: 'A chave não foi aceite. Verifique-a e introduza-a de novo.', stopped: 'Parado.', keyTitle: 'A sua chave {name}', keyHelp: 'O chat usa a sua própria chave. Fica neste navegador e só vai para {name}.', keyField: 'Chave API {name}', keySave: 'Usar esta chave', keyForget: 'Esquecer a minha chave', agents: 'Agentes', agent: 'Agente', newAgent: 'Novo agente', editAgent: 'Editar agente', agentsAbout: 'Um agente é um assistente preparado para um tipo de tarefa, com instruções, perguntas iniciais e ferramentas próprias.', noAgents: 'Ainda não há agentes', findAgents: 'Procurar um agente', noneFound: 'Nada encontrado.', fromSite: 'Incluído', yours: 'Seu', startChat: 'Iniciar uma conversa', chatWith: 'Conversar com {name}', duplicate: 'Duplicar', copyOf: 'Cópia de {name}', delete: 'Apagar', deleteAgent: 'Apagar este agente? As conversas dele ficam.', cancel: 'Cancelar', save: 'Guardar', back: 'Voltar', agentName: 'Nome', agentText: 'O que faz', agentTextHint: 'Uma linha, mostrada por baixo do nome.', instructions: 'Instruções', instructionsHint: 'Como deve trabalhar e responder, e o que deve evitar. Quanto mais exato, melhor.', questions: 'Perguntas iniciais', questionsHint: 'Uma em cada linha.', color: 'Cor', defaultModel: 'O modelo do chat', tools: 'Ferramentas ligadas', addTool: 'Adicionar uma ferramenta', toolAddress: 'Endereço (https://…)', toolToken: 'Token, se for preciso', remove: 'Remover', allAgents: 'Todos os agentes', used: 'Usou {tool} de {name}', using: 'A usar {tool} de {name}…', toolFailed: 'Não funcionou', toolInput: 'Enviado', toolResult: 'Devolvido', thoughtFor: 'Pensou durante {n} s', askTool: 'Permitir {tool} de {name}?', askWhy: 'O assistente quer usar esta ferramenta com o que é mostrado abaixo.', allowOnce: 'Permitir uma vez', allowAlways: 'Permitir sempre nesta conversa', deny: 'Não permitir', denied: 'Não permitido', toolFrom: '{tool} de {name}', tooMany: 'Parou após {n} rondas de ferramentas. Peça-lhe para continuar se precisar de mais.', noServer: 'Não foi possível ligar a {name}', attach: 'Anexar imagens ou ficheiros', removeFile: 'Remover {name}', tooBig: '{name} é demasiado grande. As imagens podem ter até 5 MB e os ficheiros de texto até 512 KB.', notFile: '{name} não pode ser anexado. Podem ser imagens (PNG, JPEG, GIF, WebP) e ficheiros de texto.', tooManyFiles: 'Até {n} ficheiros de cada vez.', dropHere: 'Largue para anexar', connection: 'Ligação', connectionHelp: 'Para onde o chat envia as suas perguntas, e com que chave. Fica só neste dispositivo.', address: 'Endereço do servidor', addressHint: 'Qualquer servidor compatível com OpenAI: um no seu computador (como http://localhost:11434/v1) ou um na web (como https://openrouter.ai/api/v1). Vazio: OpenAI.', keyOptional: 'Chave API (um servidor no seu computador muitas vezes não precisa)', test: 'Testar', testing: 'A testar…', testOk: 'Ligado: {n} modelos encontrados.', testCors: 'Não foi possível chegar ao servidor. Se estiver a correr, talvez não deixe este site chamá-lo (CORS): permita o endereço deste site nas definições do servidor.', testKey: 'A chave não foi aceite.', testAddress: 'O servidor respondeu, mas não como esperado. Verifique o endereço: costuma terminar em /v1.', testFailed: 'O servidor respondeu com um erro ({n}).', close: 'Fechar', otherServer: 'Usar outro servidor', toolsHint: 'Servidores MCP remotos que este agente pode usar. Um token fica neste dispositivo e só vai para o seu servidor.' },
  pl: { newChat: 'Nowa rozmowa', chats: 'Rozmowy', noChats: 'Tutaj pojawią się Twoje rozmowy.', findChats: 'Znajdź rozmowę', deleteChat: 'Usuń rozmowę', kept: 'Rozmowy są zapisywane tylko na tym urządzeniu.', menu: 'Pokaż rozmowy', closeMenu: 'Ukryj rozmowy', assistant: 'Asystent', model: 'Model', welcome: 'W czym mogę dziś pomóc?', placeholder: 'Zapytaj o cokolwiek…', message: 'Wiadomość', send: 'Wyślij', stop: 'Zatrzymaj', copy: 'Kopiuj', copied: 'Skopiowano', edit: 'Edytuj', again: 'Spróbuj ponownie', code: 'Kod', thinking: 'Myśli', wrong: 'Coś poszło nie tak. Spróbuj ponownie za chwilę.', noService: 'Tutaj pojawi się odpowiedź. Wskaż w ustawieniach, z czym rozmawia czat, aby działał naprawdę.', refused: 'Nie mogę w tym pomóc. Spróbuj zapytać inaczej.', noModel: 'Podaj model w ustawieniach czatu.', badKey: 'Klucz nie został przyjęty. Sprawdź go i podaj ponownie.', stopped: 'Zatrzymano.', keyTitle: 'Twój klucz {name}', keyHelp: 'Czat używa Twojego klucza. Zostaje w tej przeglądarce i trafia tylko do {name}.', keyField: 'Klucz API {name}', keySave: 'Użyj tego klucza', keyForget: 'Zapomnij mój klucz', agents: 'Agenci', agent: 'Agent', newAgent: 'Nowy agent', editAgent: 'Edytuj agenta', agentsAbout: 'Agent to asystent przygotowany do jednego rodzaju zadań, z własnymi instrukcjami, pytaniami na start i narzędziami.', noAgents: 'Nie ma jeszcze agentów', findAgents: 'Znajdź agenta', noneFound: 'Nic nie znaleziono.', fromSite: 'Wbudowany', yours: 'Twój', startChat: 'Rozpocznij rozmowę', chatWith: 'Rozmawiaj: {name}', duplicate: 'Duplikuj', copyOf: 'Kopia: {name}', delete: 'Usuń', deleteAgent: 'Usunąć tego agenta? Jego rozmowy zostaną.', cancel: 'Anuluj', save: 'Zapisz', back: 'Wstecz', agentName: 'Nazwa', agentText: 'Co robi', agentTextHint: 'Jedna linia, widoczna pod nazwą.', instructions: 'Instrukcje', instructionsHint: 'Jak ma pracować i odpowiadać oraz czego unikać. Im dokładniej, tym lepiej.', questions: 'Pytania na start', questionsHint: 'Jedno w każdej linii.', color: 'Kolor', defaultModel: 'Model czatu', tools: 'Podłączone narzędzia', addTool: 'Dodaj narzędzie', toolAddress: 'Adres (https://…)', toolToken: 'Token, jeśli jest potrzebny', remove: 'Usuń', allAgents: 'Wszyscy agenci', used: 'Użyto {tool} z {name}', using: 'Używa {tool} z {name}…', toolFailed: 'Nie zadziałało', toolInput: 'Wysłano', toolResult: 'Zwrócono', thoughtFor: 'Myślał przez {n} s', askTool: 'Zezwolić na {tool} z {name}?', askWhy: 'Asystent chce użyć tego narzędzia z tym, co widać poniżej.', allowOnce: 'Zezwól raz', allowAlways: 'Zawsze zezwalaj w tej rozmowie', deny: 'Nie zezwalaj', denied: 'Nie zezwolono', toolFrom: '{tool} z {name}', tooMany: 'Zatrzymano po {n} rundach narzędzi. Poproś o kontynuację, jeśli potrzebujesz więcej.', noServer: 'Nie udało się połączyć z {name}', attach: 'Dołącz obrazy lub pliki', removeFile: 'Usuń {name}', tooBig: '{name} jest za duży. Obrazy mogą mieć do 5 MB, pliki tekstowe do 512 KB.', notFile: 'Nie można dołączyć {name}. Można dołączać obrazy (PNG, JPEG, GIF, WebP) i pliki tekstowe.', tooManyFiles: 'Do {n} plików naraz.', dropHere: 'Upuść, aby dołączyć', connection: 'Połączenie', connectionHelp: 'Dokąd czat wysyła Twoje pytania i z jakim kluczem. Zapisane tylko na tym urządzeniu.', address: 'Adres serwera', addressHint: 'Dowolny serwer zgodny z OpenAI: na Twoim komputerze (np. http://localhost:11434/v1) lub w sieci (np. https://openrouter.ai/api/v1). Puste: OpenAI.', keyOptional: 'Klucz API (serwer na Twoim komputerze często go nie wymaga)', test: 'Sprawdź', testing: 'Sprawdzanie…', testOk: 'Połączono: znaleziono modeli: {n}.', testCors: 'Nie udało się połączyć z serwerem. Jeśli działa, może nie pozwalać tej stronie na wywołania (CORS): zezwól na adres tej strony w ustawieniach serwera.', testKey: 'Klucz nie został przyjęty.', testAddress: 'Serwer odpowiedział, ale nie tak, jak oczekiwano. Sprawdź adres: często kończy się na /v1.', testFailed: 'Serwer odpowiedział błędem ({n}).', close: 'Zamknij', otherServer: 'Użyj innego serwera', toolsHint: 'Zdalne serwery MCP, z których agent może korzystać. Token zostaje na tym urządzeniu i trafia tylko do swojego serwera.' },
  zh: { newChat: '新对话', chats: '对话', noChats: '你的对话会显示在这里。', findChats: '查找对话', deleteChat: '删除对话', kept: '对话只保存在这台设备上。', menu: '显示对话', closeMenu: '隐藏对话', assistant: '助手', model: '模型', welcome: '今天我能帮你做什么？', placeholder: '问点什么…', message: '消息', send: '发送', stop: '停止', copy: '复制', copied: '已复制', edit: '编辑', again: '重试', code: '代码', thinking: '思考中', wrong: '出了点问题，请稍后重试。', noService: '回答会显示在这里。在设置中说明聊天连接到哪里，让它真正工作。', refused: '这个我帮不上忙。换个方式问问看。', noModel: '请在聊天设置中填写要使用的模型。', badKey: '密钥未被接受。请检查后重新输入。', stopped: '已停止。', keyTitle: '你的 {name} 密钥', keyHelp: '聊天使用你自己的密钥。它只保存在此浏览器中，只发送给 {name}。', keyField: '{name} API 密钥', keySave: '使用此密钥', keyForget: '忘记我的密钥', agents: '智能体', agent: '智能体', newAgent: '新建智能体', editAgent: '编辑智能体', agentsAbout: '智能体是为某一类任务设置的助手，有自己的指令、开场问题和工具。', noAgents: '还没有智能体', findAgents: '查找智能体', noneFound: '没有找到。', fromSite: '内置', yours: '我的', startChat: '开始对话', chatWith: '与 {name} 对话', duplicate: '复制一份', copyOf: '{name} 的副本', delete: '删除', deleteAgent: '删除这个智能体？它的对话会保留。', cancel: '取消', save: '保存', back: '返回', agentName: '名称', agentText: '它做什么', agentTextHint: '一行文字，显示在名称下方。', instructions: '指令', instructionsHint: '它应如何工作和回答，以及不该做什么。越具体越好。', questions: '开场问题', questionsHint: '每行一个。', color: '颜色', defaultModel: '聊天自己的模型', tools: '已连接的工具', addTool: '添加工具', toolAddress: '地址（https://…）', toolToken: '令牌（如需要）', remove: '移除', allAgents: '所有智能体', used: '已使用 {name} 的 {tool}', using: '正在使用 {name} 的 {tool}…', toolFailed: '未成功', toolInput: '发送内容', toolResult: '返回内容', thoughtFor: '思考了 {n} 秒', askTool: '允许使用 {name} 的 {tool}？', askWhy: '助手想用下面显示的内容调用这个工具。', allowOnce: '允许一次', allowAlways: '在此对话中始终允许', deny: '不允许', denied: '未允许', toolFrom: '{name} 的 {tool}', tooMany: '已在 {n} 轮工具调用后停止。如需更多，请让它继续。', noServer: '无法连接到 {name}', attach: '附加图片或文件', removeFile: '移除 {name}', tooBig: '{name} 太大。图片最大 5 MB，文本文件最大 512 KB。', notFile: '无法附加 {name}。只能附加图片（PNG、JPEG、GIF、WebP）和文本文件。', tooManyFiles: '一次最多 {n} 个文件。', dropHere: '松开即可附加', connection: '连接', connectionHelp: '聊天把你的问题发送到哪里，以及使用哪个密钥。只保存在这台设备上。', address: '服务器地址', addressHint: '任何兼容 OpenAI 的服务器：你电脑上的（如 http://localhost:11434/v1）或网上的（如 https://openrouter.ai/api/v1）。留空：OpenAI。', keyOptional: 'API 密钥（你电脑上的服务器通常不需要）', test: '测试', testing: '测试中…', testOk: '已连接：找到 {n} 个模型。', testCors: '无法连接服务器。如果它正在运行，可能不允许本网站调用（CORS）：请在服务器设置中允许本网站的地址。', testKey: '密钥未被接受。', testAddress: '服务器有回应，但不是预期的格式。请检查地址：通常以 /v1 结尾。', testFailed: '服务器返回了错误（{n}）。', close: '关闭', otherServer: '使用其他服务器', toolsHint: '这个智能体可以使用的远程 MCP 服务器。令牌只保存在这台设备上，只发送给对应的服务器。' },
  ja: { newChat: '新しいチャット', chats: 'チャット', noChats: 'チャットはここに表示されます。', findChats: 'チャットを探す', deleteChat: 'チャットを削除', kept: 'チャットはこの端末にのみ保存されます。', menu: 'チャットを表示', closeMenu: 'チャットを隠す', assistant: 'アシスタント', model: 'モデル', welcome: '今日はどんなお手伝いをしましょうか？', placeholder: '何でも聞いてください…', message: 'メッセージ', send: '送信', stop: '停止', copy: 'コピー', copied: 'コピーしました', edit: '編集', again: 'もう一度', code: 'コード', thinking: '考え中', wrong: '問題が発生しました。しばらくしてからもう一度お試しください。', noService: 'ここに回答が表示されます。設定でチャットの接続先を指定すると実際に動きます。', refused: 'その件はお手伝いできません。別の聞き方を試してください。', noModel: 'チャットの設定で使用するモデルを指定してください。', badKey: 'キーが受け付けられませんでした。確認してもう一度入力してください。', stopped: '停止しました。', keyTitle: 'あなたの {name} キー', keyHelp: 'チャットはあなた自身のキーを使います。キーはこのブラウザに残り、{name} にだけ送られます。', keyField: '{name} API キー', keySave: 'このキーを使う', keyForget: 'キーを削除', agents: 'エージェント', agent: 'エージェント', newAgent: '新しいエージェント', editAgent: 'エージェントを編集', agentsAbout: 'エージェントは、ひとつの種類の仕事のために用意したアシスタントです。独自の指示、最初の質問、ツールを持ちます。', noAgents: 'エージェントはまだありません', findAgents: 'エージェントを探す', noneFound: '見つかりませんでした。', fromSite: '標準', yours: '自分用', startChat: 'チャットを始める', chatWith: '{name} とチャット', duplicate: '複製', copyOf: '{name} のコピー', delete: '削除', deleteAgent: 'このエージェントを削除しますか？チャットは残ります。', cancel: 'キャンセル', save: '保存', back: '戻る', agentName: '名前', agentText: 'できること', agentTextHint: '1 行。名前の下に表示されます。', instructions: '指示', instructionsHint: 'どのように作業し答えるか、何をしないか。具体的なほど良くなります。', questions: '最初の質問', questionsHint: '1 行にひとつ。', color: '色', defaultModel: 'チャットのモデル', tools: '接続したツール', addTool: 'ツールを追加', toolAddress: 'アドレス（https://…）', toolToken: 'トークン（必要な場合）', remove: '削除', allAgents: 'すべてのエージェント', used: '{name} の {tool} を使用しました', using: '{name} の {tool} を使用中…', toolFailed: 'うまくいきませんでした', toolInput: '送信内容', toolResult: '結果', thoughtFor: '{n} 秒考えました', askTool: '{name} の {tool} を許可しますか？', askWhy: 'アシスタントが下に表示された内容でこのツールを使おうとしています。', allowOnce: '今回だけ許可', allowAlways: 'このチャットでは常に許可', deny: '許可しない', denied: '許可されませんでした', toolFrom: '{name} の {tool}', tooMany: 'ツールを {n} 回使ったところで止めました。さらに必要なら続けるよう頼んでください。', noServer: '{name} に接続できませんでした', attach: '画像やファイルを添付', removeFile: '{name} を削除', tooBig: '{name} は大きすぎます。画像は 5 MB まで、テキストファイルは 512 KB までです。', notFile: '{name} は添付できません。画像（PNG、JPEG、GIF、WebP）とテキストファイルを添付できます。', tooManyFiles: '一度に {n} 個まで。', dropHere: 'ドロップして添付', connection: '接続', connectionHelp: 'チャットが質問を送る先と、使うキー。この端末にのみ保存されます。', address: 'サーバーのアドレス', addressHint: 'OpenAI 互換のサーバーならどれでも：自分のパソコン上（例 http://localhost:11434/v1）やウェブ上（例 https://openrouter.ai/api/v1）。空欄：OpenAI。', keyOptional: 'API キー（自分のパソコン上のサーバーなら多くは不要）', test: 'テスト', testing: 'テスト中…', testOk: '接続しました：{n} 個のモデルが見つかりました。', testCors: 'サーバーに届きませんでした。動いている場合、このサイトからの呼び出しを許可していない可能性があります（CORS）。サーバーの設定でこのサイトのアドレスを許可してください。', testKey: 'キーが受け付けられませんでした。', testAddress: 'サーバーは応答しましたが、想定と違う内容でした。アドレスを確認してください（多くは /v1 で終わります）。', testFailed: 'サーバーがエラーを返しました（{n}）。', close: '閉じる', otherServer: '別のサーバーを使う', toolsHint: 'このエージェントが使えるリモート MCP サーバー。トークンはこの端末に残り、そのサーバーにだけ送られます。' }
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

// (how far round the colour wheel an agent's face is turned from the site's colour)
const TURNS = [0, 55, 110, 170, 230, 295]
// Lines of text as a list, the empty ones gone
const lines = text => (Array.isArray(text) ? text : String(text || '').split('\\n')).map(one => String(one && typeof one === 'object' ? one.text || '' : one).trim()).filter(Boolean)
// What a tool was sent and gave back, short enough to keep
const clip = text => { text = String(text || ''); return text.length > 2000 ? text.slice(0, 2000) + '…' : text }
const pretty = text => { try { return JSON.stringify(JSON.parse(text), null, 2) } catch (e) { return text } }
// (tools: how many rounds of them one answer may take, and what the model hears when one was not allowed)
const MAX_ROUNDS = 10
const DENIED = 'The user did not allow this tool to run.'
// (MCP: the version of the protocol asked for; the server says which it speaks)
const MCP_VERSION = '2025-11-25'
// (Anthropic's models that take adaptive thinking, and so can show it)
const ADAPTIVE = /^claude-(opus|sonnet|fable|mythos|haiku)-([5-9]|4-[6-9])/
// Attachments: pictures every service takes, text files read into the message, and how big each may be
const PICTURES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp']
const PICTURE_MAX = 5 * 1024 * 1024
const TEXT_MAX = 512 * 1024
const FILES_MAX = 6
const TEXT_ENDINGS = /\\.(txt|md|markdown|csv|tsv|json|jsonl|xml|html?|css|scss|less|js|mjs|cjs|ts|tsx|jsx|vue|svelte|py|rb|php|java|kt|go|rs|c|h|cpp|hpp|cs|swift|sh|bash|zsh|sql|ya?ml|toml|ini|cfg|conf|log|tex|rst|srt|vtt)$/i
const textual = file => /^text\\//.test(file.type || '') || /json|xml|javascript|typescript|yaml|toml|csv|x-sh|sql/.test(file.type || '') || TEXT_ENDINGS.test(file.name || '')
const base64 = buffer => {
  const bytes = new Uint8Array(buffer)
  let text = ''
  for (let i = 0; i < bytes.length; i += 0x8000) text += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000))
  return btoa(text)
}
// A text file in a message, fenced so the model sees where it starts and ends
const fence = (name, text) => { const tick = text.includes('\`\`\`') ? '\`\`\`\`' : '\`\`\`'; return 'File: ' + name + '\\n' + tick + '\\n' + text + '\\n' + tick }

// An OpenAI-compatible address: a base (…/v1, as Ollama, LM Studio, vLLM, llama.cpp, OpenRouter and Groq give it)
// gets /chat/completions; a whole address, or your own that passes it on, is used as it is
function completions(address) {
  const url = String(address || '').trim().replace(/\\/+$/, '')
  if (!url || /\\/chat\\/completions$/i.test(url)) return url
  if (/\\/(v\\d+[a-z0-9]*|openai)$/i.test(url)) return url + '/chat/completions'
  if (/^https?:\\/\\/[^/]+$/i.test(url)) return url + '/v1/chat/completions'
  return url
}
const modelsAt = url => (/\\/chat\\/completions$/i.test(url) ? url.replace(/\\/chat\\/completions$/i, '/models') : '')
// (a server on this computer or this network, which needs no key)
const local = url => /^https?:\\/\\/(localhost|127\\.|0\\.0\\.0\\.0|\\[::1\\]|10\\.|192\\.168\\.|172\\.(1[6-9]|2\\d|3[01])\\.|[^/]+\\.local(:|\\/|$))/i.test(url || '')
// (a request the browser could not make at all: the server is down, or does not let this site call it)
const offline = e => !!e && e.name === 'TypeError' && /fetch|network|load/i.test(e.message || '')
const said = key => { const e = new Error(key); e.said = key; return e }

// A tool's name as both OpenAI and Anthropic take it
const toolName = text => String(text || '').replace(/[^a-zA-Z0-9_-]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 64) || 'tool'
// What an MCP tool gave back: as text, and as Anthropic's blocks (with its pictures)
const toolText = result => {
  const parts = (result && Array.isArray(result.content) ? result.content : []).map(one => (!one ? '' : one.type === 'text' ? one.text : one.type === 'resource' && one.resource ? one.resource.text || one.resource.uri || '' : one.type === 'resource_link' ? one.uri || '' : one.type === 'image' ? '[image]' : one.type === 'audio' ? '[audio]' : '')).filter(Boolean)
  if (!parts.length && result && result.structuredContent) parts.push(JSON.stringify(result.structuredContent))
  return parts.join('\\n') || 'The tool returned nothing.'
}
const toolBlocks = (result, text) => {
  const pictures = (result && Array.isArray(result.content) ? result.content : []).filter(one => one && one.type === 'image' && one.data && PICTURES.includes(one.mimeType))
  return pictures.length ? [{ type: 'text', text }, ...pictures.map(one => ({ type: 'image', source: { type: 'base64', media_type: one.mimeType, data: one.data } }))] : text
}

// Text that opens with <think>…</think> (some open models write their thinking so): the thinking apart from the answer
function thinkTags(text, thought) {
  let mode = 'wait'
  let held = ''
  const feed = piece => {
    if (!piece) return
    if (mode === 'text') return text(piece)
    if (mode === 'after') { piece = piece.replace(/^\\s+/, ''); if (!piece) return; mode = 'text'; return text(piece) }
    held += piece
    if (mode === 'wait') {
      const start = held.replace(/^\\s+/, '')
      // (it may be the tag, still on its way)
      if (!start || '<think>'.startsWith(start)) return
      if (!start.startsWith('<think>')) { mode = 'text'; const all = held; held = ''; return text(all) }
      mode = 'think'
      held = start.slice(7)
    }
    const end = held.indexOf('</think>')
    if (end < 0) { if (held.length > 8) { thought(held.slice(0, -8)); held = held.slice(-8) } return }
    thought(held.slice(0, end))
    const rest = held.slice(end + 8)
    held = ''
    mode = 'after'
    feed(rest)
  }
  feed.end = () => { if (mode === 'wait' && held) text(held); if (mode === 'think' && held) thought(held); held = '' }
  return feed
}
// An agent as it is kept: every part there, of the right kind
const whole = one => ({ id: String(one.id), name: String(one.name || '').trim(), text: String(one.text || ''), instructions: String(one.instructions || ''), model: String(one.model || ''), questions: lines(one.questions), turn: Number(one.turn) || 0, tools: (Array.isArray(one.tools) ? one.tools : []).filter(tool => tool && tool.url).map(tool => ({ name: String(tool.name || ''), url: String(tool.url), token: String(tool.token || '') })) })

export default {
  emits: ['asked', 'answered'],
  props: {
    provider: {
      type: String,
      default: 'service',
      label: 'Talks to',
      control: 'select',
      options: [{ key: 'Your own chat service', value: 'service' }, { key: 'OpenAI or compatible (Ollama, LM Studio, OpenRouter…)', value: 'openai' }, { key: 'Anthropic', value: 'anthropic' }]
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
    agents: {
      type: Array,
      default: () => [],
      label: 'Agents',
      control: 'list',
      fields: [
        { key: 'name', label: 'Name' },
        { key: 'text', label: 'What it does' },
        { key: 'instructions', label: 'Instructions', control: 'textarea' },
        { key: 'model', label: 'Model', placeholder: 'Empty: the chat\\'s own' },
        { key: 'questions', label: 'Starter questions (one per line)', control: 'textarea' }
      ]
    },
    ownAgents: { type: Boolean, default: true, label: 'Visitors can make agents' },
    opens: { type: String, default: 'chat', label: 'Opens on', control: 'select', options: [{ key: 'The chat', value: 'chat' }, { key: 'Agents', value: 'agents' }] },
    tools: {
      type: Array,
      default: () => [],
      label: 'Connected tools (MCP)',
      control: 'list',
      fields: [{ key: 'name', label: 'Name' }, { key: 'url', label: 'Address (never a secret: a server that needs one goes through your own address)', placeholder: 'https://…' }]
    },
    toolsBy: { type: String, default: 'browser', label: 'With Anthropic, tools are called by', control: 'select', options: [{ key: 'The browser', value: 'browser' }, { key: 'Anthropic (its MCP connector)', value: 'anthropic' }] },
    approval: { type: String, default: 'ask', label: 'Before a tool runs', control: 'select', options: [{ key: 'Ask the visitor', value: 'ask' }, { key: 'Run without asking', value: 'run' }] },
    showThinking: { type: Boolean, default: true, label: 'Show the thinking' },
    attachFiles: { type: Boolean, default: true, label: 'Visitors can attach pictures and files' },
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
    return { chats: [], currentId: '', draft: '', busy: false, waitingFirst: false, menuOpen: false, find: '', copied: '', picked: '', key: '', keyDraft: '', follow: true, view: this.opens === 'agents' ? 'agents' : 'chat', own: [], agentId: '', form: null, findAgent: '', asking: '', shownUse: '', shownThought: -1, server: '', chosen: '', listed: [], sheet: null, files: [], fileNote: '', dragging: false }
  },
  created() {
    // Which answer is being written: a new chat, Stop or leaving the page stops the one on its way
    this.turn = 0
    this.control = null
    // (the MCP servers spoken to, the tool cards waiting for an answer, and a list of models on its way)
    this.mcp = {}
    this.waiting = new Map()
    this.looking = null
    this.read()
  },
  mounted() {
    if (this.provider === 'openai' && !this.model && !this.needsKey) this.discover()
  },
  beforeUnmount() {
    this.stop()
  },
  watch: {
    // (kept when it changes, and once an answer is written, not at every word of it)
    chats: { deep: true, handler() { if (!this.busy) this.keep() } },
    opens(value) { this.view = value === 'agents' ? 'agents' : 'chat' },
    modelList: { immediate: true, handler(list) { if (list && list.length && !list.some(one => one.value === this.picked)) this.picked = (list.find(one => one.value === this.chosen) || list[0]).value } }
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
    // Where questions go: OpenAI or a compatible server (a visitor's own address first), or Anthropic
    target() {
      if (this.provider === 'anthropic') return this.usesKey ? PROVIDERS.anthropic.url : this.endpoint
      if (this.provider !== 'openai') return this.endpoint
      if (this.usesKey) return completions(this.server || this.endpoint) || PROVIDERS.openai.url
      return completions(this.endpoint)
    },
    modelsUrl() {
      return this.provider === 'openai' ? modelsAt(this.target) : ''
    },
    // (a visitor's key is asked for before the first question, unless the server is on their own computer or network)
    needsKey() {
      return this.usesKey && !this.key && !(this.provider === 'openai' && local(this.target))
    },
    providerName() {
      if (this.provider === 'openai' && this.usesKey && this.target !== PROVIDERS.openai.url) return (/^https?:\\/\\/([^/]+)/i.exec(this.target) || [])[1] || 'OpenAI'
      return PROVIDERS[this.provider] ? PROVIDERS[this.provider].name : ''
    },
    // The models to pick from: the site's, or the ones the server said it has
    modelList() {
      return !this.server && this.models && this.models.length ? this.models : this.listed
    },
    rounds() {
      return MAX_ROUNDS
    },
    accept() {
      return PICTURES.join(',') + ',text/*,.md,.csv,.json,.xml,.yaml,.yml,.toml,.js,.ts,.jsx,.tsx,.vue,.py,.rb,.php,.java,.go,.rs,.c,.h,.cpp,.cs,.swift,.sh,.sql,.log'
    },
    storeKey() {
      return 'vp-chat-app:' + (this.keepAs || 'chats')
    },
    agentsKey() {
      return 'vp-chat-app-agents:' + (this.keepAs || 'chats')
    },
    // The site's agents (from the props: read-only, no tools of their own) and then the visitor's own
    siteAgents() {
      const seen = {}
      return (this.agents || []).filter(one => one && String(one.name || '').trim()).map((one, index) => {
        let id = 'site:' + (String(one.name).trim().toLowerCase().replace(/[^\\p{L}\\p{N}]+/gu, '-').replace(/^-|-$/g, '') || index)
        if (seen[id]) id += '-' + index
        seen[id] = true
        return { ...whole({ ...one, id, tools: [] }), site: true, turn: TURNS[index % TURNS.length] }
      })
    },
    allAgents() {
      return this.siteAgents.concat(this.ownAgents ? this.own : [])
    },
    hasAgents() {
      return this.ownAgents || this.siteAgents.length > 0
    },
    shownAgents() {
      const q = this.findAgent.trim().toLowerCase()
      return q ? this.allAgents.filter(one => (one.name + ' ' + one.text).toLowerCase().includes(q)) : this.allAgents
    },
    // The agent of the open chat, or the one picked for the next (none when it was deleted since)
    agent() {
      const id = this.current ? this.current.agent : this.agentId
      return (id && this.allAgents.find(one => one.id === id)) || null
    },
    shownIdeas() {
      return this.agent && this.agent.questions.length ? this.agent.questions.map(text => ({ text })) : this.ideas
    },
    turns() {
      return TURNS
    }
  },
  methods: {
    say(key, own, name) {
      const lang = this.lang, short = lang.split('-')[0]
      const words = WORDS[lang] || WORDS[short] || (short === 'no' || short === 'nn' ? WORDS.nb : null) || WORDS.en
      return String(own || (words[key] ?? WORDS.en[key])).replace(/\\{name\\}/g, name ?? '')
    },
    sayN(key, n) {
      return this.say(key).replace(/\\{n\\}/g, n ?? '')
    },
    seconds(message) {
      return Math.max(1, Math.round((message.thinkMs || 0) / 1000))
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
        if (this.visitorKey && PROVIDERS[this.provider]) {
          this.key = localStorage.getItem('vp-chat-app-key:' + this.provider) || ''
          // (a visitor's own server and model, from the connection sheet)
          const server = JSON.parse(localStorage.getItem('vp-chat-app-server:' + this.provider) || '{}') || {}
          this.server = this.provider === 'openai' ? String(server.address || '') : ''
          this.chosen = String(server.model || '')
        }
      } catch (e) {}
      try {
        if (typeof localStorage === 'undefined' || !this.ownAgents) return
        const kept = JSON.parse(localStorage.getItem(this.agentsKey) || '[]')
        if (Array.isArray(kept)) this.own = kept.filter(one => one && one.id && one.name).map(whole)
      } catch (e) {}
    },
    // The visitor's own agents, kept on this device (with the tokens of their tools: nowhere else)
    keepAgents() {
      try { localStorage.setItem(this.agentsKey, JSON.stringify(this.own.slice(0, 100))) } catch (e) {}
    },
    letter(agent) {
      return (Array.from(String(agent.name || '').trim())[0] || '?').toUpperCase()
    },
    tint(agent) {
      return { '--vp-chat-app-turn': String(agent.turn || 0) }
    },
    agentOf(chat) {
      return (chat.agent && this.allAgents.find(one => one.id === chat.agent)) || null
    },
    toolLine(key, use) {
      return this.say(key, '', use.server || 'MCP').replace(/\\{tool\\}/g, use.name || '…')
    },
    useLine(use, running) {
      if (use.failed) return this.say('noServer', '', use.server)
      return this.toolLine(use.state === 'denied' ? 'toolFrom' : use.done || !running ? 'used' : 'using', use)
    },
    showAgents() {
      this.view = 'agents'
      this.form = null
      this.asking = ''
      this.menuOpen = false
    },
    showChat() {
      this.view = 'chat'
      this.form = null
      this.menuOpen = false
    },
    // Picks the agent of the next chat (again: none)
    pick(id) {
      this.agentId = this.agentId === id ? '' : id
    },
    chatWith(agent) {
      this.agentId = agent.id
      this.newChat()
    },
    newAgent() {
      this.form = { id: '', name: '', text: '', instructions: '', model: '', questions: '', turn: TURNS[this.own.length % TURNS.length], tools: [] }
      this.$nextTick(() => this.$refs.agentName && this.$refs.agentName.focus())
    },
    editAgent(agent) {
      if (agent.site) return
      this.form = { id: agent.id, name: agent.name, text: agent.text, instructions: agent.instructions, model: agent.model, questions: agent.questions.join('\\n'), turn: agent.turn, tools: agent.tools.map(one => ({ ...one })) }
    },
    // A copy of an agent (the site's too) as one of the visitor's own, to change
    duplicate(agent) {
      const copy = whole({ ...agent, id: newId(), name: this.say('copyOf', '', agent.name) })
      this.own = [copy, ...this.own]
      this.keepAgents()
      return copy
    },
    saveAgent() {
      const form = this.form
      if (!form || !form.name.trim()) return
      const agent = whole({ ...form, id: form.id || newId(), text: form.text.trim(), instructions: form.instructions.trim(), model: form.model.trim(), tools: form.tools.map(one => ({ name: one.name.trim(), url: one.url.trim(), token: one.token.trim() })) })
      this.own = form.id ? this.own.map(one => (one.id === form.id ? agent : one)) : [agent, ...this.own]
      this.keepAgents()
      this.form = null
    },
    // (its chats stay, and go on with no agent)
    removeAgent(id) {
      this.own = this.own.filter(one => one.id !== id)
      if (this.agentId === id) this.agentId = ''
      this.asking = ''
      this.keepAgents()
    },
    // The MCP servers of this question: the site's, then the agent's. Only https addresses (or this computer's own,
    // while trying one out), each once.
    servers() {
      const found = []
      // (a site's server never carries a token: whatever is in a prop is public)
      const all = (this.tools || []).map(one => ({ name: one && one.name, url: one && one.url })).concat(this.agent ? this.agent.tools : [])
      for (const one of all) {
        const url = String(one.url || '').trim()
        if (!/^https:\\/\\/\\S+$/i.test(url) && !/^http:\\/\\/(localhost|127\\.0\\.0\\.1|\\[::1\\])(:\\d+)?(\\/\\S*)?$/i.test(url)) continue
        if (found.some(other => other.url === url)) continue
        let name = String(one.name || '').trim() || url.replace(/^https?:\\/\\//i, '').split(/[/?#]/)[0]
        while (found.some(other => other.name === name)) name += '-2'
        found.push(one.token ? { name, url, token: one.token } : { name, url })
      }
      return found
    },
    keep() {
      if (!this.remember) return
      // (files are kept by name only: pictures would fill the device's room for the chats)
      try { localStorage.setItem(this.storeKey, JSON.stringify(this.chats.filter(one => one.messages.length).slice(0, 100), (key, value) => (key === 'data' ? undefined : value))) } catch (e) {}
    },
    saveKey() {
      const key = this.keyDraft.trim()
      if (!key) return
      this.key = key
      this.keyDraft = ''
      try { localStorage.setItem('vp-chat-app-key:' + this.provider, key) } catch (e) {}
      if (!this.model) this.discover()
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
      this.view = 'chat'
      this.form = null
      this.menuOpen = false
      this.$nextTick(() => this.$refs.input && this.$refs.input.focus())
    },
    open(id) {
      this.stop()
      this.currentId = id
      this.shownThought = -1
      this.shownUse = ''
      this.view = 'chat'
      this.form = null
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
      const files = this.files.slice()
      if ((!text && !files.length) || this.busy) return
      if (!this.current) {
        const chat = { id: newId(), title: (text || files.map(one => one.name).join(', ')).slice(0, 60), messages: [], at: Date.now() }
        if (this.agent) chat.agent = this.agent.id
        this.chats = [chat, ...this.chats]
        this.currentId = chat.id
      }
      this.draft = ''
      this.files = []
      this.fileNote = ''
      const message = { role: 'user', content: text }
      if (files.length) message.files = files.map(({ name, type, size, kind, data }) => ({ name, type, size, kind, data }))
      this.current.messages.push(message)
      this.current.at = Date.now()
      this.$emit('asked', text)
      this.follow = true
      await this.answer()
    },
    // The answer to what was said so far, written into the chat as it comes: its thinking, the tools it uses (each
    // allowed first, unless the site lets them run), and its words
    async answer() {
      const chat = this.current
      if (!chat) return
      const turn = ++this.turn
      const live = () => turn === this.turn
      const control = typeof AbortController === 'function' ? new AbortController() : null
      this.control = control
      this.busy = true
      this.waitingFirst = true
      this.down()
      let reply = { role: 'assistant', content: '' }
      let shown = false
      let gap = false
      let since = 0
      // (once in the chat, it is written to through the chat, so every word shows as it comes)
      const show = () => {
        if (!shown) { chat.messages.push(reply); reply = chat.messages[chat.messages.length - 1]; shown = true; this.waitingFirst = false }
        if (reply.waiting) reply.waiting = false
      }
      // (how long it thought: from its first thought to the first word or tool after it)
      const thought = () => { if (since) { reply.thinkMs = (reply.thinkMs || 0) + Date.now() - since; since = 0; reply.thinking = false } }
      const out = {
        live,
        text: piece => {
          if (!live() || !piece) return
          show()
          thought()
          if (gap && reply.content && !/\\n\\n$/.test(reply.content)) reply.content += '\\n\\n'
          gap = false
          reply.content += piece
          this.down()
        },
        thought: piece => {
          if (!live() || !piece || !this.showThinking) return
          show()
          if (!since) { since = Date.now(); reply.thinking = true }
          reply.thought = (reply.thought || '') + piece
          this.down()
        },
        // (the words of the next round start a paragraph of their own; meanwhile the dots say it is working)
        round: () => { gap = true; if (shown) reply.waiting = true; this.down() },
        // A row for a tool: one the model asked for, or one Anthropic used through its MCP connector
        use: step => {
          show()
          thought()
          if (!reply.uses) reply.uses = []
          reply.uses.push({ key: newId(), id: step.id || '', at: step.index, name: step.name || '', server: step.server || '', input: step.input || '', result: step.result || '', error: !!step.error, done: !!step.done, state: step.state || 'run', ...(step.failed ? { failed: true } : {}) })
          this.down()
          return reply.uses[reply.uses.length - 1]
        },
        // (Anthropic's MCP connector: what a tool was sent comes in pieces, and what it gave back ends it)
        tool: step => {
          if (!live()) return
          if (step.start) { out.use({ id: step.id, index: step.index, name: step.name, server: step.server, input: step.input }); return }
          const use = (reply.uses || []).find(one => (step.id ? one.id === step.id : one.at === step.index && !one.done))
          if (!use) return
          if (step.json) use.input += step.json
          if (step.done) { use.done = true; use.error = !!step.error; use.state = use.error ? 'error' : 'done'; use.result = clip(step.text); use.input = clip(pretty(use.input)) }
          this.down()
        },
        stopped: () => { show(); reply.stopped = true }
      }
      let own = ''
      try {
        await this.request(this.history(chat), out, control && control.signal, chat)
        if (live() && !shown) own = this.say('wrong')
      } catch (e) {
        if (!live()) return
        own = e && e.said ? this.say(e.said) : this.say(offline(e) ? 'testCors' : 'wrong')
      }
      if (!live()) return
      thought()
      if (shown && reply.waiting) reply.waiting = false
      for (const use of reply.uses || []) use.input = clip(pretty(use.input))
      if (own) {
        // (what the tools did stays to be seen; words cut off do not)
        if (shown && !(reply.uses && reply.uses.length)) chat.messages.splice(chat.messages.indexOf(reply), 1)
        chat.messages.push({ role: 'assistant', content: own, local: true })
      }
      this.control = null
      this.busy = false
      this.waitingFirst = false
      this.keep()
      if (!own) this.$emit('answered', reply.content)
      this.down()
    },
    // What was said so far: the words of each turn (never the tools or the thinking), and the visitor's files
    history(chat) {
      return chat.messages.filter(one => !one.local && (one.content || (one.files && one.files.length))).map(one => ({ role: one.role, content: one.content || '', files: one.files }))
    },
    // One message as a service takes it: the words alone, or with text files read in and pictures in its format
    message(one, format) {
      const files = (one.files || []).filter(file => file && file.data)
      const parts = [one.content || '']
      for (const file of files) if (file.kind === 'text') parts.push(fence(file.name, file.data))
      // (a picture no longer here, after the page was left: its name stands in)
      const gone = (one.files || []).filter(file => file && !file.data).map(file => '[' + file.name + ']')
      if (gone.length) parts.push(gone.join(' '))
      const text = parts.filter(Boolean).join('\\n\\n')
      const pictures = files.filter(file => file.kind === 'image')
      if (!pictures.length) return { role: one.role, content: text }
      if (format === 'anthropic') return { role: one.role, content: [...pictures.map(file => ({ type: 'image', source: { type: 'base64', media_type: file.type, data: file.data.slice(file.data.indexOf(',') + 1) } })), ...(text ? [{ type: 'text', text }] : [])] }
      return { role: one.role, content: [...(text ? [{ type: 'text', text }] : []), ...pictures.map(file => ({ type: 'image_url', image_url: { url: file.data } }))] }
    },
    async request(messages, out, signal, chat) {
      const known = PROVIDERS[this.provider]
      const agent = this.agent
      // (an agent's instructions come on top of the site's, and its own model before the one picked)
      const system = [this.system, agent && agent.instructions].filter(Boolean).join('\\n\\n')
      let model = (agent && agent.model) || this.picked || this.chosen || (this.server ? '' : this.model) || (known ? known.model : '')
      const servers = this.servers()
      // (servers Anthropic or your own service calls must be on the open web)
      const remote = servers.filter(one => /^https:/i.test(one.url))
      if (!known) {
        if (!this.endpoint) throw said('noService')
        const body = { messages: (system ? [{ role: 'system', content: system }] : []).concat(messages.map(one => this.message(one, 'openai'))) }
        if (model) body.model = model
        if (remote.length) body.mcp_servers = remote.map(one => (one.token ? { name: one.name, url: one.url, authorization_token: one.token } : { name: one.name, url: one.url }))
        await this.readAnswer(await this.send(this.endpoint, { 'Content-Type': 'application/json', Accept: 'text/event-stream, application/json' }, body, signal), out, 'any')
        return
      }
      const url = this.target
      if (!url) throw said('noService')
      if (!model && this.provider === 'openai') { await this.discover(signal); model = this.picked || (this.modelList[0] ? this.modelList[0].value : '') }
      if (!model) throw said('noModel')
      const anthropic = this.provider === 'anthropic'
      const connector = anthropic && this.toolsBy === 'anthropic'
      // (the browser speaks to the MCP servers itself, and hands their tools to the model)
      const tools = servers.length && !connector ? await this.catalog(servers, signal, out) : []
      const conversation = messages.map(one => this.message(one, anthropic ? 'anthropic' : 'openai'))
      for (let round = 0; ; round++) {
        const got = anthropic
          ? await this.askAnthropic(url, model, system, conversation, tools, connector ? remote : [], out, signal)
          : await this.askOpenAI(url, model, system, conversation, tools, out, signal)
        if (!out.live() || !got.calls.length || !tools.length) return
        // (an answer cut off, or declined, may have a tool's input cut off too: it is not run)
        if (got.stop === 'refusal' || got.stop === 'max_tokens' || got.stop === 'length') return
        if (round >= MAX_ROUNDS) { out.stopped(); return }
        const results = []
        for (const call of got.calls) results.push(await this.useTool(call, tools.find(one => one.name === call.name), chat, out, signal))
        if (anthropic) {
          // (the model's own blocks go back as they came, thinking with its signature, and then what each tool gave)
          conversation.push({ role: 'assistant', content: got.blocks }, { role: 'user', content: results.map((result, i) => ({ type: 'tool_result', tool_use_id: got.calls[i].id, content: result.blocks, ...(result.error ? { is_error: true } : {}) })) })
        } else {
          conversation.push({ role: 'assistant', content: got.text || null, tool_calls: got.calls.map(call => ({ id: call.id, type: 'function', function: { name: call.name, arguments: call.json || '{}' } })) })
          results.forEach((result, i) => conversation.push({ role: 'tool', tool_call_id: got.calls[i].id, content: result.text }))
        }
        out.round()
      }
    },
    async askAnthropic(url, model, system, messages, tools, remote, out, signal) {
      const headers = { 'Content-Type': 'application/json', Accept: 'text/event-stream', 'anthropic-version': '2026-10-21' }
      const body = { model, max_tokens: 64000, stream: true, messages }
      if (system) body.system = system
      // (its thinking, summed up, to show; on models that think whether asked or not, it is only made visible)
      if (this.showThinking && ADAPTIVE.test(model)) body.thinking = { type: 'adaptive', display: 'summarized' }
      const betas = []
      // (a declined request is answered by the next model, when the model takes that)
      if (FALLBACK_MODELS.includes(model)) { betas.push('server-side-fallback-2026-07-01'); body.fallbacks = 'default' }
      if (tools.length) body.tools = tools.map(one => ({ name: one.name, ...(one.description ? { description: one.description } : {}), input_schema: one.schema }))
      // (MCP connector: the servers, and one toolset for each, by the same name)
      if (remote.length) {
        betas.push('mcp-client-2025-11-20')
        body.mcp_servers = remote.map(one => (one.token ? { type: 'url', url: one.url, name: one.name, authorization_token: one.token } : { type: 'url', url: one.url, name: one.name }))
        body.tools = remote.map(one => ({ type: 'mcp_toolset', mcp_server_name: one.name }))
      }
      if (betas.length) headers['anthropic-beta'] = betas.join(',')
      if (this.usesKey) { headers['x-api-key'] = this.key; headers['anthropic-dangerous-direct-browser-access'] = 'true' }
      return this.readAnswer(await this.send(url, headers, body, signal), out, 'anthropic')
    },
    async askOpenAI(url, model, system, messages, tools, out, signal) {
      const headers = { 'Content-Type': 'application/json', Accept: 'text/event-stream' }
      // (a key only when there is one: a server on this computer needs none)
      if (this.usesKey && this.key) headers.Authorization = 'Bearer ' + this.key
      const body = { model, stream: true, messages: (system ? [{ role: 'system', content: system }] : []).concat(messages) }
      if (tools.length) body.tools = tools.map(one => ({ type: 'function', function: { name: one.name, ...(one.description ? { description: one.description } : {}), parameters: one.schema } }))
      return this.readAnswer(await this.send(url, headers, body, signal), out, 'openai')
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
    // An answer as it comes: a stream of events (OpenAI's, Anthropic's, or { text }), JSON, or plain text. What it
    // gives back: its words, the tools it asked for, its blocks as they came (Anthropic) and why it stopped.
    async readAnswer(response, out, kind) {
      const got = { text: '', calls: [], blocks: [], stop: '' }
      const blocks = []
      const asked = []
      const words = piece => { got.text += piece; out.text(piece) }
      const feed = kind === 'anthropic' ? words : thinkTags(words, out.thought)
      let refused = false
      let wrote = false
      const take = data => {
        if (data.type === 'error' || data.error) throw new Error('stream error')
        if (kind === 'anthropic' || /^(content_block_|message_delta)/.test(data.type || '')) {
          if (data.type === 'content_block_start' && data.content_block) {
            const block = { ...data.content_block }
            blocks[data.index] = block
            // (text after a tool or other block starts on a line of its own)
            if (block.type === 'text') { if (wrote) feed('\\n\\n'); if (block.text) { feed(block.text); wrote = true } }
            if (block.type === 'thinking') { block.thinking = block.thinking || ''; block.signature = block.signature || ''; out.thought(block.thinking) }
            if (block.type === 'tool_use') block.json = ''
            if (block.type === 'mcp_tool_use') out.tool({ start: true, index: data.index, id: block.id, name: block.name, server: block.server_name, input: block.input && Object.keys(block.input).length ? JSON.stringify(block.input) : '' })
            if (block.type === 'mcp_tool_result') out.tool({ done: true, id: block.tool_use_id, error: block.is_error, text: toolText({ content: Array.isArray(block.content) ? block.content : [{ type: 'text', text: String(block.content || '') }] }) })
          }
          const delta = data.type === 'content_block_delta' && data.delta
          if (delta) {
            const block = blocks[data.index] || {}
            if (delta.type === 'text_delta') { block.text = (block.text || '') + delta.text; feed(delta.text); wrote = wrote || !!delta.text }
            if (delta.type === 'thinking_delta') { block.thinking = (block.thinking || '') + delta.thinking; out.thought(delta.thinking) }
            if (delta.type === 'signature_delta') block.signature = (block.signature || '') + delta.signature
            if (delta.type === 'input_json_delta') { if (block.type === 'tool_use') block.json += delta.partial_json; else out.tool({ index: data.index, json: delta.partial_json }) }
          }
          if (data.type === 'message_delta' && data.delta && data.delta.stop_reason) { got.stop = data.delta.stop_reason; if (got.stop === 'refusal') refused = true }
          return
        }
        const choice = data.choices && data.choices[0]
        if (choice) {
          const delta = choice.delta || choice.message || {}
          // (open models' thinking: reasoning_content from vLLM, llama.cpp and DeepSeek; reasoning from Ollama and OpenRouter)
          const thinking = typeof delta.reasoning_content === 'string' ? delta.reasoning_content : typeof delta.reasoning === 'string' ? delta.reasoning : ''
          if (thinking) out.thought(thinking)
          if (typeof delta.content === 'string') feed(delta.content)
          else if (typeof choice.text === 'string') feed(choice.text)
          for (const piece of Array.isArray(delta.tool_calls) ? delta.tool_calls : []) {
            // (each call comes in pieces by its index: the id and name first, the arguments a little at a time)
            const at = typeof piece.index === 'number' ? piece.index : piece.id || !asked.length ? asked.length : asked.length - 1
            const call = asked[at] || (asked[at] = { id: '', name: '', json: '' })
            if (piece.id) call.id = piece.id
            if (piece.function && piece.function.name && !call.name) call.name = piece.function.name
            if (piece.function && typeof piece.function.arguments === 'string') call.json += piece.function.arguments
            else if (piece.function && piece.function.arguments && typeof piece.function.arguments === 'object') call.json += JSON.stringify(piece.function.arguments)
          }
          if (choice.finish_reason) got.stop = choice.finish_reason
          return
        }
        if (kind === 'any') feed(typeof data.text === 'string' ? data.text : typeof data.delta === 'string' ? data.delta : typeof data.content === 'string' ? data.content : '')
      }
      const type = (response.headers && response.headers.get && response.headers.get('content-type')) || ''
      if (!/event-stream/.test(type) || !response.body || !response.body.getReader) {
        const raw = await response.text()
        let data
        try { data = JSON.parse(raw) } catch (e) { feed(raw.trim()) }
        if (data && kind === 'anthropic' && Array.isArray(data.content)) {
          data.content.forEach((block, index) => take({ type: 'content_block_start', index, content_block: block }))
          if (data.stop_reason) take({ type: 'message_delta', delta: { stop_reason: data.stop_reason } })
        } else if (data && data.choices && data.choices[0] && data.choices[0].message) take({ choices: [{ ...data.choices[0], delta: data.choices[0].message }] })
        else if (data) feed(this.found(data))
      } else {
        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let rest = ''
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
            try { data = JSON.parse(raw) } catch (e) { if (kind === 'any') feed(raw); continue }
            take(data)
          }
          if (done) break
        }
      }
      if (feed.end) feed.end()
      if (refused) out.text('\\n\\n' + this.say('refused'))
      if (kind === 'anthropic') {
        // (after a model declined and the next one went on, what came before the last fallback block is left out)
        const last = blocks.reduce((at, block, i) => (block && block.type === 'fallback' ? i : at), -1)
        blocks.forEach((block, i) => {
          if (!block) return
          if (block.type === 'text' && block.text) got.blocks.push({ type: 'text', text: block.text })
          if (i < last) return
          if (block.type === 'thinking') got.blocks.push({ type: 'thinking', thinking: block.thinking || '', signature: block.signature || '' })
          if (block.type === 'redacted_thinking') got.blocks.push({ type: 'redacted_thinking', data: block.data })
          if (block.type === 'tool_use') {
            const call = { id: block.id, name: block.name, json: block.json || '' }
            try { call.input = call.json ? JSON.parse(call.json) : block.input || {} } catch (e) { call.bad = true; call.input = {} }
            got.blocks.push({ type: 'tool_use', id: block.id, name: block.name, input: call.input })
            got.calls.push(call)
          }
        })
      } else {
        got.calls = asked.filter(Boolean).map((call, i) => {
          const one = { ...call, id: call.id || 'call_' + newId() + i }
          try { one.input = call.json.trim() ? JSON.parse(call.json) : {} } catch (e) { one.bad = true; one.input = {} }
          return one
        })
      }
      return got
    },
    found(data) {
      const first = data && data.choices && data.choices[0]
      const blocks = data && Array.isArray(data.content) ? data.content.filter(one => one && one.type === 'text').map(one => one.text).join('') : ''
      const found = [data && data.reply, data && data.message && data.message.content, data && data.message, typeof (data && data.content) === 'string' ? data.content : blocks, data && data.text, first && first.message && first.message.content, first && first.text]
        .find(one => typeof one === 'string' && one.trim())
      if (!found) throw new Error('no answer')
      return found.trim()
    },
    // The tools of the connected servers, each with a name both APIs take (the server's name before it when two clash)
    async catalog(servers, signal, out) {
      const lists = await Promise.all(servers.map(server => this.connect(server, signal).then(tools => ({ server, tools }), error => ({ server, error }))))
      const entries = []
      for (const one of lists) {
        if (one.error) {
          if (!out.live()) throw one.error
          const e = one.error
          out.use({ server: one.server.name, failed: true, done: true, error: true, state: 'error', result: e.rpc ? e.rpc.message || '' : e.status ? 'HTTP ' + e.status : this.say('testCors') })
          continue
        }
        for (const tool of one.tools || []) {
          if (!tool || !tool.name) continue
          const schema = tool.inputSchema && typeof tool.inputSchema === 'object' ? { ...tool.inputSchema, type: 'object' } : { type: 'object', properties: {} }
          entries.push({ server: one.server, tool: tool.name, description: String(tool.description || tool.title || ''), schema })
        }
      }
      const plain = entries.map(one => toolName(one.tool))
      const taken = new Set()
      entries.forEach((one, i) => {
        const name = plain.filter(other => other === plain[i]).length > 1 ? toolName(toolName(one.server.name) + '_' + plain[i]) : plain[i]
        let free = name
        for (let n = 2; taken.has(free); n++) free = name.slice(0, 60) + '_' + n
        taken.add(free)
        one.name = free
      })
      return entries
    },
    // An MCP server spoken to over Streamable HTTP: initialize, initialized, then its tools (kept while the page is open)
    connect(server, signal) {
      const key = server.url + ' ' + (server.token || '')
      if (this.mcp[key]) return this.mcp[key].tools
      const link = { session: '', version: '', id: 0 }
      link.tools = (async () => {
        const hello = await this.rpc(server, link, 'initialize', { protocolVersion: MCP_VERSION, capabilities: {}, clientInfo: { name: 'vueplay-chat-app', version: '1.0.0' } }, signal)
        link.version = (hello && hello.protocolVersion) || MCP_VERSION
        await this.rpc(server, link, 'notifications/initialized', undefined, signal, true)
        const tools = []
        let cursor
        for (let page = 0; page < 10; page++) {
          const list = await this.rpc(server, link, 'tools/list', cursor ? { cursor } : {}, signal)
          tools.push(...((list && Array.isArray(list.tools) && list.tools) || []))
          cursor = list && list.nextCursor
          if (!cursor) break
        }
        return tools
      })()
      this.mcp[key] = link
      link.tools.catch(() => { if (this.mcp[key] === link) delete this.mcp[key] })
      return link.tools
    },
    // One JSON-RPC message to an MCP server. The answer comes as JSON or as a stream of events; the session it
    // gives (Mcp-Session-Id) and the version agreed go with every message after.
    async rpc(server, link, method, params, signal, notify) {
      const headers = { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' }
      if (server.token) headers.Authorization = 'Bearer ' + server.token
      if (link.session) headers['Mcp-Session-Id'] = link.session
      if (link.version) headers['MCP-Protocol-Version'] = link.version
      const id = notify ? undefined : ++link.id
      const message = { jsonrpc: '2.0', ...(notify ? {} : { id }), method, ...(params === undefined ? {} : { params }) }
      const response = await fetch(server.url, { method: 'POST', headers, body: JSON.stringify(message), signal: signal || undefined })
      const session = response.headers && response.headers.get && response.headers.get('mcp-session-id')
      if (session) link.session = session
      if (!response.ok) { const e = new Error('MCP ' + response.status); e.status = response.status; throw e }
      if (notify) return null
      const type = (response.headers && response.headers.get && response.headers.get('content-type')) || ''
      const answer = /event-stream/.test(type) ? await this.mcpEvent(response, id) : [].concat(JSON.parse(await response.text())).find(one => one && one.id === id)
      if (!answer) throw new Error('MCP: no answer')
      if (answer.error) { const e = new Error(answer.error.message || 'MCP error'); e.rpc = answer.error; throw e }
      return answer.result
    },
    // The answer to one message in an MCP server's stream of events (other messages may come before it)
    async mcpEvent(response, id) {
      let data = ''
      const check = () => {
        let message
        try { message = JSON.parse(data) } catch (e) {}
        data = ''
        return [].concat(message || []).find(one => one && one.id === id && ('result' in one || 'error' in one))
      }
      const each = line => {
        if (line.startsWith('data:')) { data += (data ? '\\n' : '') + line.slice(5).replace(/^ /, ''); return null }
        return !line.trim() && data ? check() : null
      }
      if (!response.body || !response.body.getReader) {
        for (const line of (await response.text()).split(/\\r?\\n/)) { const found = each(line); if (found) return found }
        return data ? check() : null
      }
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let rest = ''
      for (;;) {
        const { done, value } = await reader.read()
        rest += decoder.decode(value || new Uint8Array(), { stream: !done })
        const lines = rest.split(/\\r?\\n/)
        rest = done ? '' : lines.pop()
        for (const line of lines) {
          const found = each(line)
          if (found) { try { const stopped = reader.cancel && reader.cancel(); if (stopped && stopped.catch) stopped.catch(() => {}) } catch (e) {} return found }
        }
        if (done) break
      }
      return data ? check() : null
    },
    async callTool(entry, input, signal) {
      const key = entry.server.url + ' ' + (entry.server.token || '')
      const call = async () => {
        await this.connect(entry.server, signal)
        return this.rpc(entry.server, this.mcp[key], 'tools/call', { name: entry.tool, arguments: input || {} }, signal)
      }
      try {
        return await call()
      } catch (e) {
        // (a session the server has forgotten: once more, from the start)
        if (e && e.status === 404 && this.mcp[key] && this.mcp[key].session) { delete this.mcp[key]; return call() }
        throw e
      }
    },
    // A tool the model asked for: allowed first (unless the site lets tools run), run on its server, its answer given back
    async useTool(call, entry, chat, out, signal) {
      const use = out.use({ id: call.id, name: entry ? entry.tool : call.name, server: entry ? entry.server.name : '', input: clip(pretty(call.json || JSON.stringify(call.input || {}))) })
      const end = (state, result) => { use.state = state; use.done = true; use.error = state === 'error'; use.result = clip(result); this.down() }
      if (!entry) { const text = 'There is no tool called ' + call.name + '.'; end('error', text); return { text, error: true, blocks: text } }
      if (call.bad) { const text = JSON.stringify({ INVALID_JSON: call.json }); end('error', text); return { text, error: true, blocks: text } }
      if (this.approval !== 'run' && !(chat.allowed || []).includes(entry.name)) {
        use.state = 'ask'
        this.$nextTick(() => { const button = this.$el && this.$el.querySelector && this.$el.querySelector('.vp-chat-app__ask .vp-chat-app__do--main'); if (button) button.focus() })
        const choice = await new Promise(resolve => this.waiting.set(use.key, resolve))
        this.waiting.delete(use.key)
        if (!out.live()) throw new Error('stopped')
        if (choice === 'always') chat.allowed = [...(chat.allowed || []), entry.name]
        if (choice === 'no') { end('denied', ''); return { text: DENIED, error: true, blocks: DENIED } }
        use.state = 'run'
      }
      try {
        const result = await this.callTool(entry, call.input, signal)
        const text = toolText(result)
        const error = !!(result && result.isError)
        end(error ? 'error' : 'done', text)
        return { text, error, blocks: toolBlocks(result, text) }
      } catch (e) {
        if (!out.live()) throw e
        const text = e && e.rpc ? e.rpc.message || 'The tool failed.' : 'The tool could not be reached' + (e && e.status ? ' (' + e.status + ').' : '.')
        end('error', text)
        return { text, error: true, blocks: text }
      }
    },
    // The visitor's answer on the card before a tool runs: once, always in this chat, or not
    decide(use, choice) {
      const resolve = this.waiting.get(use.key)
      if (resolve) resolve(choice)
    },
    // The models a server has, for the picker (OpenAI-compatible: GET …/models) and for Test in the connection sheet
    async listModels(url, key, signal) {
      const anthropic = /^https:\\/\\/api\\.anthropic\\.com\\//.test(url)
      const headers = { Accept: 'application/json' }
      if (anthropic) { headers['anthropic-version'] = '2026-10-21'; headers['anthropic-dangerous-direct-browser-access'] = 'true'; if (key) headers['x-api-key'] = key } else if (key) headers.Authorization = 'Bearer ' + key
      const response = await fetch(url, { headers, signal: signal || undefined })
      if (!response.ok) { const e = new Error(String(response.status)); e.status = response.status; throw e }
      const data = JSON.parse(await response.text())
      const ids = (Array.isArray(data) ? data : (data && (data.data || data.models)) || []).map(one => (typeof one === 'string' ? one : one && (one.id || one.name || one.model))).filter(id => typeof id === 'string' && id)
      // (OpenAI's own list has its pictures, voices and search too: only the ones that chat)
      const chat = /^https:\\/\\/api\\.openai\\.com\\//.test(url) ? ids.filter(id => !/embed|whisper|tts|dall-e|moderation|transcribe|realtime|image|audio|search|babbage|davinci/i.test(id)) : ids
      return [...new Set(chat)].sort().map(id => ({ value: id, label: id }))
    },
    // (asked once, when the site names no model: the server's own list fills the picker)
    discover(signal) {
      if (this.provider !== 'openai' || (!this.server && this.models && this.models.length) || this.listed.length || !this.modelsUrl) return Promise.resolve(this.listed)
      if (!this.looking) {
        this.looking = this.listModels(this.modelsUrl, this.usesKey ? this.key : '', signal).then(list => { this.listed = list; return list }, () => []).then(list => { this.looking = null; return list })
      }
      return this.looking
    },
    // The connection sheet (visitors with their own key): address, key and model, kept on this device, and a Test
    openSheet() {
      this.sheet = { address: this.server, key: this.key, model: this.chosen || this.picked, state: '', message: '', list: [] }
      this.menuOpen = false
      this.$nextTick(() => { const first = this.$el && this.$el.querySelector && this.$el.querySelector('.vp-chat-app__sheet input'); if (first) first.focus() })
    },
    closeSheet() {
      this.sheet = null
      this.$nextTick(() => this.$refs.plug && this.$refs.plug.focus())
    },
    async testSheet() {
      const sheet = this.sheet
      if (!sheet) return
      sheet.state = 'testing'
      sheet.message = this.say('testing')
      sheet.list = []
      const url = this.provider === 'anthropic' ? 'https://api.anthropic.com/v1/models' : modelsAt(completions(sheet.address) || PROVIDERS.openai.url)
      try {
        if (!url) { const e = new Error('address'); e.status = 404; throw e }
        const list = await this.listModels(url, sheet.key.trim())
        if (this.sheet !== sheet) return
        sheet.list = list
        sheet.state = 'ok'
        sheet.message = this.sayN('testOk', list.length)
        if (!sheet.model && list.length) sheet.model = list[0].value
      } catch (e) {
        if (this.sheet !== sheet) return
        sheet.state = 'bad'
        const status = e && e.status
        sheet.message = this.sayN(status === 401 || status === 403 ? 'testKey' : status === 404 ? 'testAddress' : status ? 'testFailed' : 'testCors', status)
      }
    },
    saveSheet() {
      const sheet = this.sheet
      if (!sheet) return
      const address = this.provider === 'openai' ? sheet.address.trim() : ''
      if (address !== this.server) { this.listed = []; this.mcp = {} }
      this.server = address
      const key = sheet.key.trim()
      if (key) { this.key = key; try { localStorage.setItem('vp-chat-app-key:' + this.provider, key) } catch (e) {} } else this.forgetKey()
      this.chosen = sheet.model.trim()
      if (sheet.list.length && (this.server || !this.models.length)) this.listed = sheet.list
      if (this.chosen) this.picked = this.chosen
      try { localStorage.setItem('vp-chat-app-server:' + this.provider, JSON.stringify({ address: this.server, model: this.chosen })) } catch (e) {}
      this.closeSheet()
      if (!this.listed.length) this.discover()
    },
    // Attachments: pictures and text files, chosen, dropped or pasted
    async addFiles(list) {
      if (!this.attachFiles) return
      this.fileNote = ''
      for (const file of Array.from(list || [])) {
        if (this.files.length >= FILES_MAX) { this.fileNote = this.sayN('tooManyFiles', FILES_MAX); break }
        const kind = PICTURES.includes(file.type) ? 'image' : textual(file) ? 'text' : ''
        if (!kind) { this.fileNote = this.say('notFile', '', file.name); continue }
        if (file.size > (kind === 'image' ? PICTURE_MAX : TEXT_MAX)) { this.fileNote = this.say('tooBig', '', file.name); continue }
        try {
          const data = kind === 'image' ? 'data:' + file.type + ';base64,' + base64(await file.arrayBuffer()) : await file.text()
          this.files.push({ key: newId(), name: file.name || kind, type: file.type || 'text/plain', size: file.size, kind, data })
        } catch (e) {}
      }
    },
    chooseFiles(event) {
      this.addFiles(event.target.files)
      event.target.value = ''
    },
    pasted(event) {
      const data = event.clipboardData
      if (!this.attachFiles || !data || !data.files || !data.files.length) return
      if (!Array.from(data.types || []).includes('text/plain')) event.preventDefault()
      this.addFiles(data.files)
    },
    dragOver(event) {
      if (this.attachFiles && event.dataTransfer && Array.from(event.dataTransfer.types || []).includes('Files')) this.dragging = true
    },
    dragLeave(event) {
      if (!event.currentTarget || !event.currentTarget.contains(event.relatedTarget)) this.dragging = false
    },
    dropped(event) {
      this.dragging = false
      this.addFiles(event.dataTransfer && event.dataTransfer.files)
    },
    // Stops the answer on its way; what has come stays
    stop() {
      this.turn++
      // (a tool card waiting for an answer is let go)
      if (this.waiting) for (const resolve of this.waiting.values()) resolve('stop')
      if (this.control) this.control.abort()
      this.control = null
      this.busy = false
      this.waitingFirst = false
    },
    // The last question back in the box to change, and what came after it gone
    edit(index) {
      if (this.busy || !this.current) return
      const message = this.current.messages[index]
      this.draft = message.content
      this.files = (message.files || []).filter(file => file.data).map(file => ({ ...file, key: newId() }))
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
.vp-chat-app__main { position: relative; flex: 1; min-width: 0; display: flex; flex-direction: column; }
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
.vp-chat-app__table th, .vp-chat-app__table td { overflow-wrap: normal; min-width: 3.5rem; }
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
.vp-chat-app__composer { display: flex; flex-direction: column; padding: 0.5rem 0.5rem 0.5rem 1rem; border: 1px solid var(--vp-border, #e5e7eb); border-radius: 1.5rem; background: var(--vp-background, #fff); box-shadow: 0 4px 18px rgb(0 0 0 / 0.06); }
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
.vp-chat-app :focus-visible { outline: 2px solid var(--vp-chat-app-accent); outline-offset: 2px; }
.vp-chat-app .vp-chat-app__input:focus-visible { outline: none; }
.vp-chat-app__go { display: flex; align-items: center; gap: 0.55rem; height: 2.4rem; flex: none; padding: 0 0.7rem; border: 0; border-radius: 0.6rem; background: transparent; color: inherit; font: inherit; font-size: 0.92rem; font-weight: 600; text-align: left; cursor: pointer; }
.vp-chat-app__go:hover { background: color-mix(in oklch, currentColor 8%, transparent); }
.vp-chat-app__go--on { background: color-mix(in oklch, var(--vp-chat-app-accent) 16%, transparent); }
.vp-chat-app__count { margin-left: auto; padding: 0 0.45rem; border-radius: 999px; background: color-mix(in oklch, currentColor 10%, transparent); font-size: 0.75rem; line-height: 1.5; opacity: 0.8; }
.vp-chat-app__face { display: inline-flex; align-items: center; justify-content: center; width: 2.6rem; height: 2.6rem; flex: none; border-radius: 0.8rem; background: var(--vp-chat-app-accent); color: var(--vp-primary-contrast, #fff); font-family: var(--vp-font-heading, inherit); font-size: 1.1rem; font-weight: 700; line-height: 1; }
@supports (color: oklch(from red l c h)) {
  .vp-chat-app__face { background: oklch(from var(--vp-chat-app-accent) l c calc(h + var(--vp-chat-app-turn, 0))); }
}
.vp-chat-app__face--small { width: 1.6rem; height: 1.6rem; border-radius: 0.5rem; font-size: 0.8rem; }
.vp-chat-app__face--dot { width: 1.35rem; height: 1.35rem; border-radius: 50%; font-size: 0.68rem; }
.vp-chat-app__face--big { width: 3.5rem; height: 3.5rem; border-radius: 1.1rem; font-size: 1.5rem; }
.vp-chat-app__face--big svg { width: 1.6rem; height: 1.6rem; }
.vp-chat-app__chat-open .vp-chat-app__face { margin-right: 0.45rem; vertical-align: -0.2em; }
.vp-chat-app__picks { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.4rem; max-width: 40rem; }
.vp-chat-app__pick { display: inline-flex; align-items: center; gap: 0.45rem; height: 2.25rem; padding: 0 0.85rem 0 0.4rem; border: 1px solid var(--vp-border, #e5e7eb); border-radius: 999px; background: transparent; color: inherit; font: inherit; font-size: 0.9rem; cursor: pointer; transition: border-color 0.15s, background-color 0.15s; }
.vp-chat-app__pick:hover { border-color: var(--vp-chat-app-accent); }
.vp-chat-app__pick--on { border-color: var(--vp-chat-app-accent); background: color-mix(in oklch, var(--vp-chat-app-accent) 16%, transparent); font-weight: 600; }
.vp-chat-app__pick--all { padding: 0 0.85rem; border-style: dashed; opacity: 0.75; }
.vp-chat-app__pick--all:hover { opacity: 1; }
.vp-chat-app__do { display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem; height: 2.3rem; padding: 0 0.9rem; border: 1px solid var(--vp-border, #e5e7eb); border-radius: 0.65rem; background: transparent; color: inherit; font: inherit; font-size: 0.9rem; font-weight: 600; white-space: nowrap; cursor: pointer; transition: border-color 0.15s, background-color 0.15s; }
.vp-chat-app__do svg { width: 1rem; height: 1rem; }
.vp-chat-app__do:hover { border-color: var(--vp-chat-app-accent); }
.vp-chat-app__do--main { border-color: transparent; background: var(--vp-chat-app-accent); color: var(--vp-primary-contrast, #fff); }
.vp-chat-app__do--main:hover { border-color: transparent; background: color-mix(in oklch, var(--vp-chat-app-accent) 86%, var(--vp-text, #111827)); }
.vp-chat-app__do--main:disabled { opacity: 0.4; cursor: default; }
.vp-chat-app__do--risk { border-color: transparent; background: color-mix(in oklch, #e5484d 88%, var(--vp-text, #111827)); color: #fff; }
.vp-chat-app__do--risk:hover { border-color: transparent; background: #e5484d; }
.vp-chat-app__do--add { align-self: flex-start; border-style: dashed; }
.vp-chat-app__desk { display: flex; flex-direction: column; gap: 1.5rem; max-width: 62rem; margin: 0 auto; padding: 1rem 0.5rem 2rem; }
.vp-chat-app__desk-top { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 1rem 2rem; }
.vp-chat-app__title { margin: 0 0 0.4rem; font-family: var(--vp-font-heading, inherit); font-size: clamp(1.6rem, 3vw, 2.1rem); font-weight: 650; line-height: 1.2; }
.vp-chat-app__lead { margin: 0; max-width: 38rem; line-height: 1.55; opacity: 0.7; }
.vp-chat-app__find--agents { width: 16rem; max-width: 100%; height: 2.4rem; }
.vp-chat-app__agents { display: grid; grid-template-columns: repeat(auto-fill, minmax(17.5rem, 1fr)); gap: 0.9rem; margin: 0; padding: 0; list-style: none; }
.vp-chat-app__agent { display: flex; flex-direction: column; gap: 0.8rem; min-width: 0; padding: 1.15rem; border: 1px solid var(--vp-border, #e5e7eb); border-radius: 1.1rem; background: color-mix(in oklch, var(--vp-surface, #f4f5f7) 55%, var(--vp-background, #fff)); transition: border-color 0.15s, box-shadow 0.15s; }
.vp-chat-app__agent:hover, .vp-chat-app__agent:focus-within { border-color: color-mix(in oklch, var(--vp-chat-app-accent) 55%, var(--vp-border, #e5e7eb)); box-shadow: 0 8px 24px rgb(0 0 0 / 0.08); }
.vp-chat-app__agent-top { display: flex; align-items: center; gap: 0.8rem; min-width: 0; }
.vp-chat-app__agent-name { display: flex; flex-direction: column; align-items: flex-start; gap: 0.25rem; min-width: 0; }
.vp-chat-app__agent-name strong { max-width: 100%; overflow: hidden; font-weight: 650; line-height: 1.25; text-overflow: ellipsis; white-space: nowrap; }
.vp-chat-app__badge { padding: 0.1rem 0.5rem; border-radius: 999px; background: color-mix(in oklch, var(--vp-chat-app-accent) 18%, transparent); color: color-mix(in oklch, var(--vp-chat-app-accent) 55%, var(--vp-text, #111827)); font-size: 0.72rem; font-weight: 600; line-height: 1.5; }
.vp-chat-app__badge--own { background: color-mix(in oklch, currentColor 9%, transparent); color: inherit; opacity: 0.75; }
.vp-chat-app__agent-text { display: -webkit-box; flex: 1; margin: 0; overflow: hidden; font-size: 0.93rem; line-height: 1.5; opacity: 0.75; -webkit-box-orient: vertical; -webkit-line-clamp: 3; line-clamp: 3; }
.vp-chat-app__agent-tools { display: flex; align-items: center; gap: 0.4rem; margin: 0; overflow: hidden; font-size: 0.8rem; opacity: 0.65; text-overflow: ellipsis; white-space: nowrap; }
.vp-chat-app__agent-tools svg { width: 0.95rem; height: 0.95rem; }
.vp-chat-app__acts { display: flex; flex-wrap: wrap; align-items: center; gap: 0.25rem; min-height: 2.3rem; }
.vp-chat-app__acts--sure { gap: 0.4rem; font-size: 0.88rem; }
.vp-chat-app__acts--sure span { flex: 1 1 100%; }
.vp-chat-app__empty { display: flex; flex-direction: column; align-items: center; gap: 0.8rem; margin-top: 6vh; padding: 3rem 1.5rem; border: 1px dashed var(--vp-border, #e5e7eb); border-radius: 1.3rem; text-align: center; }
.vp-chat-app__empty strong { font-family: var(--vp-font-heading, inherit); font-size: 1.3rem; font-weight: 650; }
.vp-chat-app__empty p { max-width: 30rem; margin: 0 0 0.5rem; line-height: 1.55; opacity: 0.7; }
.vp-chat-app__form { display: flex; flex-direction: column; gap: 1.25rem; max-width: 42rem; margin: 0 auto; padding: 0.5rem 0.25rem 0; }
.vp-chat-app__form-top { display: flex; align-items: flex-end; gap: 1rem; }
.vp-chat-app__form-top .vp-chat-app__field { flex: 1; }
.vp-chat-app__pair { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 1.25rem; }
.vp-chat-app__field { display: flex; flex-direction: column; gap: 0.4rem; min-width: 0; }
.vp-chat-app__label { padding: 0; font-size: 0.88rem; font-weight: 600; }
.vp-chat-app__hint { margin: 0; font-size: 0.82rem; line-height: 1.5; opacity: 0.6; }
.vp-chat-app__hint--note { padding: 0.7rem 0.85rem; border-radius: 0.7rem; background: color-mix(in oklch, var(--vp-chat-app-accent) 12%, transparent); opacity: 0.9; }
.vp-chat-app__box { width: 100%; min-width: 0; height: 2.7rem; padding: 0 0.85rem; border: 1px solid var(--vp-border, #e5e7eb); border-radius: 0.7rem; background: var(--vp-background, #fff); color: inherit; font: inherit; line-height: 1.5; transition: border-color 0.15s; }
.vp-chat-app__box:hover, .vp-chat-app__box:focus { border-color: var(--vp-chat-app-accent); }
.vp-chat-app__box::placeholder { color: inherit; opacity: 0.45; }
.vp-chat-app__box--tall, .vp-chat-app__box--mid { height: auto; min-height: 6.5rem; padding: 0.7rem 0.85rem; resize: vertical; }
.vp-chat-app__box--tall { min-height: 14rem; }
.vp-chat-app__swatches { display: flex; align-items: center; gap: 0.5rem; height: 2.7rem; }
.vp-chat-app__swatch { width: 1.75rem; height: 1.75rem; padding: 0; border: 0; border-radius: 50%; cursor: pointer; }
.vp-chat-app__swatch--on { box-shadow: 0 0 0 2px var(--vp-background, #fff), 0 0 0 4px var(--vp-text, #111827); }
.vp-chat-app__servers { display: flex; flex-direction: column; gap: 0.7rem; min-width: 0; margin: 0; padding: 0.4rem 1rem 1rem; border: 1px solid var(--vp-border, #e5e7eb); border-radius: 1rem; }
.vp-chat-app__servers legend { padding: 0 0.4rem; }
.vp-chat-app__server { display: grid; grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.4fr) minmax(0, 1fr) auto; align-items: center; gap: 0.4rem; }
.vp-chat-app__form-acts { position: sticky; bottom: -1rem; display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 0.25rem; padding: 0.9rem 0 1.25rem; border-top: 1px solid var(--vp-border, #e5e7eb); background: var(--vp-background, #fff); }
.vp-chat-app__uses { display: flex; flex-direction: column; gap: 0.35rem; width: 100%; max-width: 38rem; margin-bottom: 0.3rem; }
.vp-chat-app__use { overflow: hidden; border: 1px solid var(--vp-border, #e5e7eb); border-radius: 0.75rem; font-size: 0.88rem; }
.vp-chat-app__use--error { border-color: color-mix(in oklch, #e5484d 50%, var(--vp-border, #e5e7eb)); }
.vp-chat-app__use-top { display: flex; align-items: center; gap: 0.55rem; width: 100%; padding: 0.5rem 0.7rem; border: 0; background: transparent; color: inherit; font: inherit; text-align: left; cursor: pointer; }
.vp-chat-app__use-top:hover { background: color-mix(in oklch, currentColor 6%, transparent); }
.vp-chat-app__use-top svg { width: 1rem; height: 1rem; opacity: 0.7; }
.vp-chat-app__use-text { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; opacity: 0.85; }
.vp-chat-app__use-bad { flex: none; color: color-mix(in oklch, #e5484d 75%, var(--vp-text, #111827)); font-size: 0.8rem; font-weight: 600; }
.vp-chat-app__use--error .vp-chat-app__use-top > svg:first-child { color: color-mix(in oklch, #e5484d 75%, var(--vp-text, #111827)); opacity: 1; }
.vp-chat-app__use-turn { transition: transform 0.15s; }
.vp-chat-app__use--open .vp-chat-app__use-turn { transform: rotate(180deg); }
.vp-chat-app__spin { width: 1rem; height: 1rem; flex: none; border: 2px solid color-mix(in oklch, currentColor 22%, transparent); border-top-color: var(--vp-chat-app-accent); border-radius: 50%; animation: vp-chat-app-spin 0.8s linear infinite; }
.vp-chat-app__use-more { display: flex; flex-direction: column; gap: 0.35rem; padding: 0.65rem 0.7rem 0.75rem; border-top: 1px solid var(--vp-border, #e5e7eb); }
.vp-chat-app__use-more span { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; opacity: 0.6; }
.vp-chat-app__use-more pre { max-height: 14rem; margin: 0 0 0.3rem; overflow: auto; padding: 0.6rem 0.7rem; border-radius: 0.5rem; background: color-mix(in oklch, var(--vp-text, #111827) 6%, var(--vp-background, #fff)); font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.8rem; line-height: 1.5; white-space: pre-wrap; overflow-wrap: anywhere; }
.vp-chat-app__composer--drop { border-color: var(--vp-chat-app-accent); }
.vp-chat-app__row { display: flex; align-items: flex-end; gap: 0.35rem; }
.vp-chat-app__clip { width: 2.4rem; height: 2.4rem; margin-left: -0.55rem; border-radius: 50%; }
.vp-chat-app__picker { display: none; }
.vp-chat-app__files, .vp-chat-app__sent { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.vp-chat-app__files { padding: 0.15rem 0 0.45rem; }
.vp-chat-app__sent { justify-content: flex-end; max-width: min(85%, 38rem); }
.vp-chat-app__file { display: inline-flex; align-items: center; gap: 0.4rem; max-width: 15rem; height: 2.4rem; padding: 0 0.3rem 0 0.55rem; border: 1px solid var(--vp-border, #e5e7eb); border-radius: 0.7rem; background: var(--vp-surface, #f4f5f7); font-size: 0.85rem; }
.vp-chat-app__file--image { padding-left: 0.2rem; }
.vp-chat-app__file img { width: 1.9rem; height: 1.9rem; flex: none; border-radius: 0.5rem; object-fit: cover; }
.vp-chat-app__file svg { width: 1rem; height: 1rem; opacity: 0.7; }
.vp-chat-app__file-name { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.vp-chat-app__sent .vp-chat-app__file { padding-right: 0.7rem; }
.vp-chat-app__file-x { display: inline-flex; align-items: center; justify-content: center; width: 1.6rem; height: 1.6rem; flex: none; padding: 0; border: 0; border-radius: 50%; background: transparent; color: inherit; opacity: 0.6; cursor: pointer; }
.vp-chat-app__file-x:hover { opacity: 1; background: color-mix(in oklch, currentColor 10%, transparent); }
.vp-chat-app__file-x svg { width: 0.85rem; height: 0.85rem; opacity: 1; }
.vp-chat-app__sent-pic { display: block; max-width: min(16rem, 100%); max-height: 12rem; border: 1px solid var(--vp-border, #e5e7eb); border-radius: 1rem; object-fit: cover; }
.vp-chat-app__file-note { max-width: 48rem; margin: 0.45rem auto 0; color: color-mix(in oklch, #e5484d 75%, var(--vp-text, #111827)); font-size: 0.82rem; text-align: center; }
.vp-chat-app__drop { position: absolute; z-index: 5; inset: 0.75rem; display: flex; align-items: center; justify-content: center; border: 2px dashed var(--vp-chat-app-accent); border-radius: 1.25rem; background: color-mix(in oklch, var(--vp-background, #fff) 82%, transparent); pointer-events: none; }
.vp-chat-app__drop span { display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.7rem 1.1rem; border-radius: 999px; background: var(--vp-chat-app-accent); color: var(--vp-primary-contrast, #fff); font-weight: 600; }
.vp-chat-app__thought { width: 100%; max-width: 38rem; }
.vp-chat-app__thought-top { display: inline-flex; align-items: center; gap: 0.45rem; max-width: 100%; padding: 0.3rem 0.6rem 0.3rem 0.45rem; border: 0; border-radius: 0.6rem; background: transparent; color: inherit; font: inherit; font-size: 0.88rem; opacity: 0.72; cursor: pointer; }
.vp-chat-app__thought-top:hover { opacity: 1; background: color-mix(in oklch, currentColor 7%, transparent); }
.vp-chat-app__thought-top svg { width: 1rem; height: 1rem; }
.vp-chat-app__thought--open .vp-chat-app__use-turn { transform: rotate(180deg); }
.vp-chat-app__thought--now .vp-chat-app__thought-label { background: linear-gradient(90deg, currentColor 0%, currentColor 35%, color-mix(in oklch, currentColor 35%, transparent) 50%, currentColor 65%, currentColor 100%); background-size: 250% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: vp-chat-app-shine 1.6s linear infinite; }
.vp-chat-app__thought-text { margin: 0.35rem 0 0.2rem 0.95rem; padding: 0.1rem 0 0.1rem 0.9rem; border-left: 2px solid var(--vp-border, #e5e7eb); font-size: 0.9rem; line-height: 1.6; white-space: pre-wrap; overflow-wrap: anywhere; opacity: 0.75; }
.vp-chat-app__ask { display: flex; flex-direction: column; gap: 0.75rem; padding: 1rem; border: 1px solid color-mix(in oklch, var(--vp-chat-app-accent) 55%, var(--vp-border, #e5e7eb)); border-radius: 1rem; background: color-mix(in oklch, var(--vp-chat-app-accent) 7%, var(--vp-background, #fff)); box-shadow: 0 6px 20px rgb(0 0 0 / 0.06); }
.vp-chat-app__ask-top { display: flex; align-items: flex-start; gap: 0.75rem; }
.vp-chat-app__ask-icon { display: inline-flex; align-items: center; justify-content: center; width: 2.2rem; height: 2.2rem; flex: none; border-radius: 0.7rem; background: var(--vp-chat-app-accent); color: var(--vp-primary-contrast, #fff); }
.vp-chat-app__ask-icon svg { width: 1.1rem; height: 1.1rem; }
.vp-chat-app__ask-what { display: flex; flex-direction: column; gap: 0.15rem; min-width: 0; }
.vp-chat-app__ask-what strong { font-weight: 650; line-height: 1.35; overflow-wrap: anywhere; }
.vp-chat-app__ask-what span { font-size: 0.85rem; opacity: 0.7; }
.vp-chat-app__ask-input { max-height: 12rem; margin: 0; overflow: auto; padding: 0.65rem 0.75rem; border-radius: 0.6rem; background: color-mix(in oklch, var(--vp-text, #111827) 6%, var(--vp-background, #fff)); font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.8rem; line-height: 1.5; white-space: pre-wrap; overflow-wrap: anywhere; }
.vp-chat-app__ask-acts { display: flex; flex-wrap: wrap; gap: 0.45rem; }
.vp-chat-app__do--quiet { border-color: transparent; opacity: 0.8; }
.vp-chat-app__do--quiet:hover { border-color: var(--vp-border, #e5e7eb); opacity: 1; }
.vp-chat-app__use--denied { opacity: 0.8; }
.vp-chat-app__use-bad--quiet { color: inherit; opacity: 0.65; font-weight: 500; }
.vp-chat-app__use-top:disabled { cursor: default; }
.vp-chat-app__use-top:disabled:hover { background: transparent; }
.vp-chat-app__stopped { margin: 0; padding: 0.55rem 0.8rem; border-radius: 0.7rem; background: color-mix(in oklch, currentColor 6%, transparent); font-size: 0.86rem; opacity: 0.8; }
.vp-chat-app__other { align-self: flex-start; padding: 0.2rem 0; border: 0; background: none; color: var(--vp-chat-app-accent); font: inherit; font-size: 0.88rem; font-weight: 600; text-decoration: underline; text-underline-offset: 3px; cursor: pointer; }
.vp-chat-app__sheet-shade { position: absolute; z-index: 6; inset: 0; background: rgb(0 0 0 / 0.35); }
.vp-chat-app__sheet { position: absolute; z-index: 7; top: 0.75rem; left: 50%; display: flex; flex-direction: column; gap: 1rem; width: min(34rem, calc(100% - 1.5rem)); max-height: calc(100% - 1.5rem); overflow-y: auto; padding: 1.1rem 1.25rem 1.25rem; border: 1px solid var(--vp-border, #e5e7eb); border-radius: 1.2rem; background: var(--vp-background, #fff); box-shadow: 0 24px 60px rgb(0 0 0 / 0.3); transform: translateX(-50%); animation: vp-chat-app-drop 0.18s ease-out; }
.vp-chat-app__sheet-top { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
.vp-chat-app__sheet-title { font-family: var(--vp-font-heading, inherit); font-size: 1.2rem; font-weight: 650; }
.vp-chat-app__sheet > .vp-chat-app__hint { margin-top: -0.6rem; }
.vp-chat-app__test { display: flex; align-items: center; gap: 0.75rem; }
.vp-chat-app__test .vp-chat-app__spin { width: 0.9rem; height: 0.9rem; }
.vp-chat-app__test-note { flex: 1; min-width: 0; margin: 0; font-size: 0.85rem; line-height: 1.45; }
.vp-chat-app__test-note--ok { color: color-mix(in oklch, #2fa46b 70%, var(--vp-text, #111827)); }
.vp-chat-app__test-note--bad { color: color-mix(in oklch, #e5484d 75%, var(--vp-text, #111827)); }
.vp-chat-app__found { display: flex; flex-wrap: wrap; gap: 0.35rem; max-height: 9rem; overflow-y: auto; }
.vp-chat-app__found .vp-chat-app__pick { height: 2rem; padding: 0 0.75rem; font-size: 0.82rem; }
.vp-chat-app__sheet-acts { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; padding-top: 0.9rem; border-top: 1px solid var(--vp-border, #e5e7eb); }
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
  .vp-chat-app__desk { gap: 1.1rem; padding: 0.25rem 0 1.5rem; }
  .vp-chat-app__agents { grid-template-columns: 1fr; }
  .vp-chat-app__find--agents { width: 100%; }
  .vp-chat-app__main--agents .vp-chat-app__do--main svg { display: none; }
  .vp-chat-app__pair { grid-template-columns: 1fr; }
  .vp-chat-app__server { grid-template-columns: minmax(0, 1fr) auto; padding-bottom: 0.7rem; border-bottom: 1px solid var(--vp-border, #e5e7eb); }
  .vp-chat-app__server .vp-chat-app__box:nth-child(2), .vp-chat-app__server .vp-chat-app__box:nth-child(3) { grid-column: 1 / -1; }
  .vp-chat-app__server .vp-chat-app__icon { grid-row: 1; grid-column: 2; }
  .vp-chat-app__form-acts .vp-chat-app__do { flex: 1; height: 2.7rem; }
  .vp-chat-app__empty { margin-top: 2vh; padding: 2.25rem 1.1rem; }
  .vp-chat-app__sheet { top: 0.5rem; width: calc(100% - 1rem); max-height: calc(100% - 1rem); padding: 1rem; }
  .vp-chat-app__sheet-acts .vp-chat-app__do { flex: 1; height: 2.7rem; }
  .vp-chat-app__sheet-acts .vp-chat-app__space { display: none; }
  .vp-chat-app__ask-acts .vp-chat-app__do { flex: 1 1 100%; height: 2.6rem; }
  .vp-chat-app__file { max-width: 11rem; }
}
@media (prefers-reduced-motion: reduce) {
  .vp-chat-app__dots span, .vp-chat-app__caret, .vp-chat-app__sheet { animation: none; }
  .vp-chat-app__thought--now .vp-chat-app__thought-label { animation: none; background: none; color: inherit; }
  .vp-chat-app__spin { animation-duration: 2.4s; }
  .vp-chat-app__side, .vp-chat-app__use-turn, .vp-chat-app__pick, .vp-chat-app__do, .vp-chat-app__agent, .vp-chat-app__box { transition: none; }
}
@keyframes vp-chat-app-wait {
  0%, 80%, 100% { opacity: 0.25; transform: translateY(0); }
  40% { opacity: 0.9; transform: translateY(-0.2em); }
}
@keyframes vp-chat-app-shine {
  from { background-position: 100% 0; }
  to { background-position: -150% 0; }
}
@keyframes vp-chat-app-drop {
  from { opacity: 0; transform: translate(-50%, -0.6rem); }
}
@keyframes vp-chat-app-spin {
  to { transform: rotate(360deg); }
}
@keyframes vp-chat-app-blink {
  to { opacity: 0; }
}
</style>
`;export{e as default};