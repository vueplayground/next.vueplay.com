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
            <p v-if="provider === 'openai'" class="vp-chat-app__hint vp-chat-app__hint--note">{{ say('toolsOnly') }}</p>
            <template v-else>
              <p class="vp-chat-app__hint">{{ say('toolsHint') }}</p>
              <div v-for="(one, index) in form.tools" :key="index" class="vp-chat-app__server">
                <input v-model="one.name" class="vp-chat-app__box" type="text" autocomplete="off" :placeholder="say('agentName')" :aria-label="say('agentName')">
                <input v-model="one.url" class="vp-chat-app__box" type="url" inputmode="url" pattern="[Hh][Tt][Tt][Pp][Ss]://.+" autocomplete="off" spellcheck="false" :placeholder="say('toolAddress')" :aria-label="say('toolAddress')">
                <input v-model="one.token" class="vp-chat-app__box" type="password" autocomplete="off" spellcheck="false" :placeholder="say('toolToken')" :aria-label="say('toolToken')">
                <button type="button" class="vp-chat-app__icon" :aria-label="say('remove')" :title="say('remove')" @click="form.tools.splice(index, 1)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg></button>
              </div>
              <button type="button" class="vp-chat-app__do vp-chat-app__do--add" @click="form.tools.push({ name: '', url: '', token: '' })"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>{{ say('addTool') }}</button>
            </template>
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
                <p v-if="one.tools.length && provider !== 'openai'" class="vp-chat-app__agent-tools"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 6.5a4 4 0 0 0-5.2 5.2L4 17v3h3l5.3-5.3a4 4 0 0 0 5.2-5.2L15 12l-3-3z" /></svg>{{ one.tools.map(tool => tool.name || tool.url).join(', ') }}</p>
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
    <section v-else class="vp-chat-app__main">
      <header class="vp-chat-app__top">
        <button v-if="showChats" type="button" class="vp-chat-app__icon vp-chat-app__menu" :aria-label="say('menu')" :title="say('menu')" @click="menuOpen = true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg></button>
        <span v-if="agent" class="vp-chat-app__face vp-chat-app__face--small" :style="tint(agent)" aria-hidden="true">{{ letter(agent) }}</span>
        <strong class="vp-chat-app__name">{{ agent ? agent.name : name || say('assistant') }}</strong>
        <select v-if="models.length > 1 && !(agent && agent.model)" v-model="picked" class="vp-chat-app__model" :aria-label="say('model')">
          <option v-for="(one, index) in models" :key="index" :value="one.value">{{ one.label || one.value }}</option>
        </select>
        <span class="vp-chat-app__space" />
        <button v-if="hasAgents && !showChats" type="button" class="vp-chat-app__icon" :aria-label="say('agents')" :title="say('agents')" @click="showAgents"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="8" width="14" height="11" rx="3" /><path d="M12 8V4M9.5 13v1.5M14.5 13v1.5" /></svg></button>
        <button v-if="usesKey && key" type="button" class="vp-chat-app__icon" :aria-label="say('keyForget')" :title="say('keyForget')" @click="forgetKey"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="15" r="4" /><path d="M11 12l9-9M17 6l3 3" /></svg></button>
        <button type="button" class="vp-chat-app__icon" :aria-label="say('newChat')" :title="say('newChat')" @click="newChat"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16zM14 6l4 4" /></svg></button>
      </header>

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
            <div v-if="message.role === 'user'" class="vp-chat-app__mine">{{ message.content }}</div>
            <div v-if="message.role !== 'user' && message.uses && message.uses.length" class="vp-chat-app__uses">
              <div v-for="(use, u) in message.uses" :key="u" class="vp-chat-app__use" :class="{ 'vp-chat-app__use--error': use.error, 'vp-chat-app__use--open': shownUse === index + ':' + u }">
                <button type="button" class="vp-chat-app__use-top" :aria-expanded="shownUse === index + ':' + u ? 'true' : 'false'" @click="shownUse = shownUse === index + ':' + u ? '' : index + ':' + u">
                  <span v-if="!use.done && busy && index === messages.length - 1" class="vp-chat-app__spin" aria-hidden="true" />
                  <svg v-else-if="use.error" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v5M12 16v.5" /></svg>
                  <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 6.5a4 4 0 0 0-5.2 5.2L4 17v3h3l5.3-5.3a4 4 0 0 0 5.2-5.2L15 12l-3-3z" /></svg>
                  <span class="vp-chat-app__use-text">{{ useLine(use, busy && index === messages.length - 1) }}</span>
                  <span v-if="use.error" class="vp-chat-app__use-bad">{{ say('toolFailed') }}</span>
                  <svg class="vp-chat-app__use-turn" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                </button>
                <div v-if="shownUse === index + ':' + u" class="vp-chat-app__use-more">
                  <template v-if="use.input"><span>{{ say('toolInput') }}</span><pre>{{ use.input }}</pre></template>
                  <template v-if="use.result"><span>{{ say('toolResult') }}</span><pre>{{ use.result }}</pre></template>
                </div>
              </div>
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
  en: { newChat: 'New chat', chats: 'Chats', noChats: 'Your chats show up here.', findChats: 'Find a chat', deleteChat: 'Delete chat', kept: 'Chats are kept on this device only.', menu: 'Show chats', closeMenu: 'Hide chats', assistant: 'Assistant', model: 'Model', welcome: 'How can I help you today?', placeholder: 'Ask anything…', message: 'Message', send: 'Send', stop: 'Stop', copy: 'Copy', copied: 'Copied', edit: 'Edit', again: 'Try again', code: 'Code', thinking: 'Thinking', wrong: 'Something went wrong. Please try again in a moment.', noService: 'This is where the answer will be. Say in the settings what the chat talks to to make it real.', refused: 'I can not help with that one. Try asking another way.', noModel: 'Name the model to use in the chat\\'s settings.', badKey: 'The key was not accepted. Check it and give it again.', stopped: 'Stopped.', keyTitle: 'Your {name} key', keyHelp: 'The chat uses your own key. It stays in this browser and goes only to {name}.', keyField: '{name} API key', keySave: 'Use this key', keyForget: 'Forget my key', agents: 'Agents', agent: 'Agent', newAgent: 'New agent', editAgent: 'Edit agent', agentsAbout: 'An agent is an assistant set up for one kind of job, with its own instructions, starter questions and tools.', noAgents: 'No agents yet', findAgents: 'Find an agent', noneFound: 'Nothing found.', fromSite: 'Built in', yours: 'Yours', startChat: 'Start a chat', chatWith: 'Chat with {name}', duplicate: 'Duplicate', copyOf: 'Copy of {name}', delete: 'Delete', deleteAgent: 'Delete this agent? Its chats stay.', cancel: 'Cancel', save: 'Save', back: 'Back', agentName: 'Name', agentText: 'What it does', agentTextHint: 'One line, shown under its name.', instructions: 'Instructions', instructionsHint: 'How it should work and answer, and what to leave alone. The more exact, the better.', questions: 'Starter questions', questionsHint: 'One on each line.', color: 'Colour', defaultModel: 'The chat\\'s own model', tools: 'Connected tools', toolsHint: 'Remote MCP servers this agent can use (https). A token stays on this device and is sent only with your questions.', toolsOnly: 'Connected tools work with Anthropic and with your own service.', addTool: 'Add a tool', toolAddress: 'Address (https://…)', toolToken: 'Token, if it needs one', remove: 'Remove', allAgents: 'All agents', used: 'Used {tool} from {name}', using: 'Using {tool} from {name}…', toolFailed: 'Did not work', toolInput: 'Sent', toolResult: 'Came back' },
  nb: { newChat: 'Ny samtale', chats: 'Samtaler', noChats: 'Samtalene dine vises her.', findChats: 'Finn en samtale', deleteChat: 'Slett samtale', kept: 'Samtalene lagres bare på denne enheten.', menu: 'Vis samtaler', closeMenu: 'Skjul samtaler', assistant: 'Assistent', model: 'Modell', welcome: 'Hva kan jeg hjelpe deg med i dag?', placeholder: 'Spør om hva som helst…', message: 'Melding', send: 'Send', stop: 'Stopp', copy: 'Kopier', copied: 'Kopiert', edit: 'Rediger', again: 'Prøv igjen', code: 'Kode', thinking: 'Tenker', wrong: 'Noe gikk galt. Prøv igjen om litt.', noService: 'Her kommer svaret. Si i innstillingene hva chatten snakker med for å gjøre den ekte.', refused: 'Det kan jeg ikke hjelpe med. Prøv å spørre på en annen måte.', noModel: 'Skriv hvilken modell som skal brukes i chattens innstillinger.', badKey: 'Nøkkelen ble ikke godtatt. Sjekk den og gi den på nytt.', stopped: 'Stoppet.', keyTitle: 'Din {name}-nøkkel', keyHelp: 'Chatten bruker din egen nøkkel. Den blir i denne nettleseren og går bare til {name}.', keyField: '{name} API-nøkkel', keySave: 'Bruk denne nøkkelen', keyForget: 'Glem nøkkelen min', agents: 'Agenter', agent: 'Agent', newAgent: 'Ny agent', editAgent: 'Rediger agent', agentsAbout: 'En agent er en assistent satt opp for én type oppgave, med egne instrukser, startspørsmål og verktøy.', noAgents: 'Ingen agenter ennå', findAgents: 'Finn en agent', noneFound: 'Fant ingenting.', fromSite: 'Innebygd', yours: 'Din', startChat: 'Start en samtale', chatWith: 'Snakk med {name}', duplicate: 'Dupliser', copyOf: 'Kopi av {name}', delete: 'Slett', deleteAgent: 'Slette denne agenten? Samtalene blir værende.', cancel: 'Avbryt', save: 'Lagre', back: 'Tilbake', agentName: 'Navn', agentText: 'Hva den gjør', agentTextHint: 'Én linje, vises under navnet.', instructions: 'Instrukser', instructionsHint: 'Hvordan den skal arbeide og svare, og hva den skal la være. Jo mer presist, jo bedre.', questions: 'Startspørsmål', questionsHint: 'Ett på hver linje.', color: 'Farge', defaultModel: 'Chattens egen modell', tools: 'Tilkoblede verktøy', toolsHint: 'Eksterne MCP-servere agenten kan bruke (https). Et token blir på denne enheten og sendes bare sammen med spørsmålene dine.', toolsOnly: 'Tilkoblede verktøy virker med Anthropic og med din egen tjeneste.', addTool: 'Legg til et verktøy', toolAddress: 'Adresse (https://…)', toolToken: 'Token, hvis det trengs', remove: 'Fjern', allAgents: 'Alle agenter', used: 'Brukte {tool} fra {name}', using: 'Bruker {tool} fra {name}…', toolFailed: 'Virket ikke', toolInput: 'Sendt', toolResult: 'Kom tilbake' },
  sv: { newChat: 'Ny chatt', chats: 'Chattar', noChats: 'Dina chattar visas här.', findChats: 'Hitta en chatt', deleteChat: 'Radera chatt', kept: 'Chattar sparas bara på den här enheten.', menu: 'Visa chattar', closeMenu: 'Dölj chattar', assistant: 'Assistent', model: 'Modell', welcome: 'Hur kan jag hjälpa dig i dag?', placeholder: 'Fråga vad som helst…', message: 'Meddelande', send: 'Skicka', stop: 'Stoppa', copy: 'Kopiera', copied: 'Kopierat', edit: 'Redigera', again: 'Försök igen', code: 'Kod', thinking: 'Tänker', wrong: 'Något gick fel. Försök igen om en stund.', noService: 'Här kommer svaret. Ange i inställningarna vad chatten pratar med för att göra den på riktigt.', refused: 'Det kan jag inte hjälpa till med. Försök fråga på ett annat sätt.', noModel: 'Ange vilken modell som ska användas i chattens inställningar.', badKey: 'Nyckeln godtogs inte. Kontrollera den och ange den igen.', stopped: 'Stoppad.', keyTitle: 'Din {name}-nyckel', keyHelp: 'Chatten använder din egen nyckel. Den stannar i den här webbläsaren och går bara till {name}.', keyField: '{name} API-nyckel', keySave: 'Använd nyckeln', keyForget: 'Glöm min nyckel', agents: 'Agenter', agent: 'Agent', newAgent: 'Ny agent', editAgent: 'Redigera agent', agentsAbout: 'En agent är en assistent inställd för en sorts uppgift, med egna instruktioner, startfrågor och verktyg.', noAgents: 'Inga agenter ännu', findAgents: 'Hitta en agent', noneFound: 'Inget hittades.', fromSite: 'Inbyggd', yours: 'Din', startChat: 'Starta en chatt', chatWith: 'Chatta med {name}', duplicate: 'Duplicera', copyOf: 'Kopia av {name}', delete: 'Radera', deleteAgent: 'Radera den här agenten? Dess chattar blir kvar.', cancel: 'Avbryt', save: 'Spara', back: 'Tillbaka', agentName: 'Namn', agentText: 'Vad den gör', agentTextHint: 'En rad, visas under namnet.', instructions: 'Instruktioner', instructionsHint: 'Hur den ska arbeta och svara, och vad den ska låta bli. Ju mer exakt, desto bättre.', questions: 'Startfrågor', questionsHint: 'En på varje rad.', color: 'Färg', defaultModel: 'Chattens egen modell', tools: 'Anslutna verktyg', toolsHint: 'Externa MCP-servrar som agenten kan använda (https). En token stannar på den här enheten och skickas bara med dina frågor.', toolsOnly: 'Anslutna verktyg fungerar med Anthropic och med din egen tjänst.', addTool: 'Lägg till ett verktyg', toolAddress: 'Adress (https://…)', toolToken: 'Token, om det behövs', remove: 'Ta bort', allAgents: 'Alla agenter', used: 'Använde {tool} från {name}', using: 'Använder {tool} från {name}…', toolFailed: 'Fungerade inte', toolInput: 'Skickat', toolResult: 'Kom tillbaka' },
  da: { newChat: 'Ny chat', chats: 'Chats', noChats: 'Dine chats vises her.', findChats: 'Find en chat', deleteChat: 'Slet chat', kept: 'Chats gemmes kun på denne enhed.', menu: 'Vis chats', closeMenu: 'Skjul chats', assistant: 'Assistent', model: 'Model', welcome: 'Hvad kan jeg hjælpe dig med i dag?', placeholder: 'Spørg om hvad som helst…', message: 'Besked', send: 'Send', stop: 'Stop', copy: 'Kopiér', copied: 'Kopieret', edit: 'Redigér', again: 'Prøv igen', code: 'Kode', thinking: 'Tænker', wrong: 'Noget gik galt. Prøv igen om lidt.', noService: 'Her kommer svaret. Angiv i indstillingerne, hvad chatten taler med, for at gøre den rigtig.', refused: 'Det kan jeg ikke hjælpe med. Prøv at spørge på en anden måde.', noModel: 'Angiv modellen i chattens indstillinger.', badKey: 'Nøglen blev ikke godkendt. Tjek den og angiv den igen.', stopped: 'Stoppet.', keyTitle: 'Din {name}-nøgle', keyHelp: 'Chatten bruger din egen nøgle. Den bliver i denne browser og går kun til {name}.', keyField: '{name} API-nøgle', keySave: 'Brug denne nøgle', keyForget: 'Glem min nøgle', agents: 'Agenter', agent: 'Agent', newAgent: 'Ny agent', editAgent: 'Redigér agent', agentsAbout: 'En agent er en assistent sat op til én slags opgave, med egne instrukser, startspørgsmål og værktøjer.', noAgents: 'Ingen agenter endnu', findAgents: 'Find en agent', noneFound: 'Intet fundet.', fromSite: 'Indbygget', yours: 'Din', startChat: 'Start en chat', chatWith: 'Chat med {name}', duplicate: 'Duplikér', copyOf: 'Kopi af {name}', delete: 'Slet', deleteAgent: 'Slet denne agent? Dens chats bliver.', cancel: 'Annullér', save: 'Gem', back: 'Tilbage', agentName: 'Navn', agentText: 'Hvad den gør', agentTextHint: 'Én linje, vist under navnet.', instructions: 'Instrukser', instructionsHint: 'Hvordan den skal arbejde og svare, og hvad den skal lade være. Jo mere præcist, jo bedre.', questions: 'Startspørgsmål', questionsHint: 'Ét på hver linje.', color: 'Farve', defaultModel: 'Chattens egen model', tools: 'Tilsluttede værktøjer', toolsHint: 'Eksterne MCP-servere, som agenten kan bruge (https). Et token bliver på denne enhed og sendes kun sammen med dine spørgsmål.', toolsOnly: 'Tilsluttede værktøjer virker med Anthropic og med din egen tjeneste.', addTool: 'Tilføj et værktøj', toolAddress: 'Adresse (https://…)', toolToken: 'Token, hvis det kræves', remove: 'Fjern', allAgents: 'Alle agenter', used: 'Brugte {tool} fra {name}', using: 'Bruger {tool} fra {name}…', toolFailed: 'Virkede ikke', toolInput: 'Sendt', toolResult: 'Kom tilbage' },
  fi: { newChat: 'Uusi keskustelu', chats: 'Keskustelut', noChats: 'Keskustelusi näkyvät tässä.', findChats: 'Etsi keskustelu', deleteChat: 'Poista keskustelu', kept: 'Keskustelut tallennetaan vain tälle laitteelle.', menu: 'Näytä keskustelut', closeMenu: 'Piilota keskustelut', assistant: 'Avustaja', model: 'Malli', welcome: 'Miten voin auttaa tänään?', placeholder: 'Kysy mitä tahansa…', message: 'Viesti', send: 'Lähetä', stop: 'Pysäytä', copy: 'Kopioi', copied: 'Kopioitu', edit: 'Muokkaa', again: 'Yritä uudelleen', code: 'Koodi', thinking: 'Miettii', wrong: 'Jokin meni vikaan. Yritä hetken päästä uudelleen.', noService: 'Tähän tulee vastaus. Kerro asetuksissa, mihin chat on yhteydessä, niin se toimii oikeasti.', refused: 'En voi auttaa siinä. Kokeile kysyä toisin.', noModel: 'Kirjoita käytettävä malli chatin asetuksiin.', badKey: 'Avainta ei hyväksytty. Tarkista se ja anna uudelleen.', stopped: 'Pysäytetty.', keyTitle: 'Oma {name}-avaimesi', keyHelp: 'Chat käyttää omaa avaintasi. Se pysyy tässä selaimessa ja menee vain palveluun {name}.', keyField: '{name} API-avain', keySave: 'Käytä tätä avainta', keyForget: 'Unohda avaimeni', agents: 'Agentit', agent: 'Agentti', newAgent: 'Uusi agentti', editAgent: 'Muokkaa agenttia', agentsAbout: 'Agentti on yhtä tehtävää varten tehty avustaja, jolla on omat ohjeet, aloituskysymykset ja työkalut.', noAgents: 'Ei vielä agentteja', findAgents: 'Etsi agentti', noneFound: 'Mitään ei löytynyt.', fromSite: 'Valmiina', yours: 'Oma', startChat: 'Aloita keskustelu', chatWith: 'Keskustele: {name}', duplicate: 'Monista', copyOf: 'Kopio: {name}', delete: 'Poista', deleteAgent: 'Poistetaanko tämä agentti? Sen keskustelut säilyvät.', cancel: 'Peruuta', save: 'Tallenna', back: 'Takaisin', agentName: 'Nimi', agentText: 'Mitä se tekee', agentTextHint: 'Yksi rivi, näkyy nimen alla.', instructions: 'Ohjeet', instructionsHint: 'Miten sen pitää toimia ja vastata ja mitä jättää tekemättä. Mitä tarkemmin, sitä parempi.', questions: 'Aloituskysymykset', questionsHint: 'Yksi kullekin riville.', color: 'Väri', defaultModel: 'Chatin oma malli', tools: 'Yhdistetyt työkalut', toolsHint: 'Etä-MCP-palvelimet, joita agentti voi käyttää (https). Tunnus pysyy tällä laitteella ja lähetetään vain kysymystesi mukana.', toolsOnly: 'Yhdistetyt työkalut toimivat Anthropicin ja oman palvelusi kanssa.', addTool: 'Lisää työkalu', toolAddress: 'Osoite (https://…)', toolToken: 'Tunnus, jos tarvitaan', remove: 'Poista', allAgents: 'Kaikki agentit', used: 'Käytti työkalua {tool} ({name})', using: 'Käyttää työkalua {tool} ({name})…', toolFailed: 'Ei onnistunut', toolInput: 'Lähetetty', toolResult: 'Palautui' },
  de: { newChat: 'Neuer Chat', chats: 'Chats', noChats: 'Deine Chats erscheinen hier.', findChats: 'Chat suchen', deleteChat: 'Chat löschen', kept: 'Chats werden nur auf diesem Gerät gespeichert.', menu: 'Chats zeigen', closeMenu: 'Chats ausblenden', assistant: 'Assistent', model: 'Modell', welcome: 'Wobei kann ich dir heute helfen?', placeholder: 'Frag, was du willst…', message: 'Nachricht', send: 'Senden', stop: 'Stoppen', copy: 'Kopieren', copied: 'Kopiert', edit: 'Bearbeiten', again: 'Nochmal versuchen', code: 'Code', thinking: 'Denkt nach', wrong: 'Etwas ist schiefgelaufen. Bitte versuche es gleich noch einmal.', noService: 'Hier erscheint die Antwort. Gib in den Einstellungen an, womit der Chat spricht, damit er echt antwortet.', refused: 'Dabei kann ich nicht helfen. Versuch es anders zu fragen.', noModel: 'Gib in den Einstellungen des Chats das Modell an.', badKey: 'Der Schlüssel wurde nicht angenommen. Prüfe ihn und gib ihn erneut ein.', stopped: 'Gestoppt.', keyTitle: 'Dein {name}-Schlüssel', keyHelp: 'Der Chat nutzt deinen eigenen Schlüssel. Er bleibt in diesem Browser und geht nur an {name}.', keyField: '{name}-API-Schlüssel', keySave: 'Diesen Schlüssel nutzen', keyForget: 'Meinen Schlüssel vergessen', agents: 'Agenten', agent: 'Agent', newAgent: 'Neuer Agent', editAgent: 'Agent bearbeiten', agentsAbout: 'Ein Agent ist ein Assistent für eine bestimmte Aufgabe, mit eigenen Anweisungen, Startfragen und Werkzeugen.', noAgents: 'Noch keine Agenten', findAgents: 'Agent suchen', noneFound: 'Nichts gefunden.', fromSite: 'Mitgeliefert', yours: 'Eigener', startChat: 'Chat starten', chatWith: 'Mit {name} chatten', duplicate: 'Duplizieren', copyOf: 'Kopie von {name}', delete: 'Löschen', deleteAgent: 'Diesen Agenten löschen? Seine Chats bleiben.', cancel: 'Abbrechen', save: 'Speichern', back: 'Zurück', agentName: 'Name', agentText: 'Was er tut', agentTextHint: 'Eine Zeile, erscheint unter dem Namen.', instructions: 'Anweisungen', instructionsHint: 'Wie er arbeiten und antworten soll und was er lassen soll. Je genauer, desto besser.', questions: 'Startfragen', questionsHint: 'Eine pro Zeile.', color: 'Farbe', defaultModel: 'Das Modell des Chats', tools: 'Verbundene Werkzeuge', toolsHint: 'Entfernte MCP-Server, die dieser Agent nutzen kann (https). Ein Token bleibt auf diesem Gerät und wird nur mit deinen Fragen gesendet.', toolsOnly: 'Verbundene Werkzeuge funktionieren mit Anthropic und mit deinem eigenen Dienst.', addTool: 'Werkzeug hinzufügen', toolAddress: 'Adresse (https://…)', toolToken: 'Token, falls nötig', remove: 'Entfernen', allAgents: 'Alle Agenten', used: '{tool} von {name} verwendet', using: 'Verwendet {tool} von {name}…', toolFailed: 'Hat nicht geklappt', toolInput: 'Gesendet', toolResult: 'Zurückgekommen' },
  fr: { newChat: 'Nouvelle conversation', chats: 'Conversations', noChats: 'Vos conversations apparaissent ici.', findChats: 'Trouver une conversation', deleteChat: 'Supprimer la conversation', kept: 'Les conversations restent sur cet appareil uniquement.', menu: 'Afficher les conversations', closeMenu: 'Masquer les conversations', assistant: 'Assistant', model: 'Modèle', welcome: 'Comment puis-je vous aider aujourd’hui ?', placeholder: 'Posez votre question…', message: 'Message', send: 'Envoyer', stop: 'Arrêter', copy: 'Copier', copied: 'Copié', edit: 'Modifier', again: 'Réessayer', code: 'Code', thinking: 'Réflexion', wrong: 'Un problème est survenu. Veuillez réessayer dans un instant.', noService: 'La réponse apparaîtra ici. Indiquez dans les réglages avec quoi le chat communique pour qu’il réponde vraiment.', refused: 'Je ne peux pas vous aider sur ce point. Essayez de demander autrement.', noModel: 'Indiquez le modèle dans les réglages du chat.', badKey: 'La clé n’a pas été acceptée. Vérifiez-la et saisissez-la de nouveau.', stopped: 'Arrêté.', keyTitle: 'Votre clé {name}', keyHelp: 'Le chat utilise votre propre clé. Elle reste dans ce navigateur et n’est envoyée qu’à {name}.', keyField: 'Clé API {name}', keySave: 'Utiliser cette clé', keyForget: 'Oublier ma clé', agents: 'Agents', agent: 'Agent', newAgent: 'Nouvel agent', editAgent: 'Modifier l’agent', agentsAbout: 'Un agent est un assistant préparé pour un type de tâche, avec ses propres instructions, questions de départ et outils.', noAgents: 'Aucun agent pour l’instant', findAgents: 'Trouver un agent', noneFound: 'Aucun résultat.', fromSite: 'Intégré', yours: 'Le vôtre', startChat: 'Démarrer une conversation', chatWith: 'Discuter avec {name}', duplicate: 'Dupliquer', copyOf: 'Copie de {name}', delete: 'Supprimer', deleteAgent: 'Supprimer cet agent ? Ses conversations restent.', cancel: 'Annuler', save: 'Enregistrer', back: 'Retour', agentName: 'Nom', agentText: 'Ce qu’il fait', agentTextHint: 'Une ligne, affichée sous son nom.', instructions: 'Instructions', instructionsHint: 'Comment il doit travailler et répondre, et ce qu’il doit éviter. Plus c’est précis, mieux c’est.', questions: 'Questions de départ', questionsHint: 'Une par ligne.', color: 'Couleur', defaultModel: 'Le modèle du chat', tools: 'Outils connectés', toolsHint: 'Serveurs MCP distants que cet agent peut utiliser (https). Un jeton reste sur cet appareil et n’est envoyé qu’avec vos questions.', toolsOnly: 'Les outils connectés fonctionnent avec Anthropic et avec votre propre service.', addTool: 'Ajouter un outil', toolAddress: 'Adresse (https://…)', toolToken: 'Jeton, si nécessaire', remove: 'Retirer', allAgents: 'Tous les agents', used: 'A utilisé {tool} de {name}', using: 'Utilise {tool} de {name}…', toolFailed: 'N’a pas fonctionné', toolInput: 'Envoyé', toolResult: 'Reçu' },
  es: { newChat: 'Nueva conversación', chats: 'Conversaciones', noChats: 'Tus conversaciones aparecen aquí.', findChats: 'Buscar una conversación', deleteChat: 'Eliminar conversación', kept: 'Las conversaciones se guardan solo en este dispositivo.', menu: 'Mostrar conversaciones', closeMenu: 'Ocultar conversaciones', assistant: 'Asistente', model: 'Modelo', welcome: '¿En qué puedo ayudarte hoy?', placeholder: 'Pregunta lo que quieras…', message: 'Mensaje', send: 'Enviar', stop: 'Detener', copy: 'Copiar', copied: 'Copiado', edit: 'Editar', again: 'Reintentar', code: 'Código', thinking: 'Pensando', wrong: 'Algo ha ido mal. Inténtalo de nuevo en un momento.', noService: 'Aquí aparecerá la respuesta. Indica en los ajustes con qué habla el chat para que funcione de verdad.', refused: 'No puedo ayudarte con eso. Prueba a preguntarlo de otra forma.', noModel: 'Indica el modelo en los ajustes del chat.', badKey: 'La clave no fue aceptada. Revísala y vuelve a darla.', stopped: 'Detenido.', keyTitle: 'Tu clave de {name}', keyHelp: 'El chat usa tu propia clave. Se queda en este navegador y solo va a {name}.', keyField: 'Clave API de {name}', keySave: 'Usar esta clave', keyForget: 'Olvidar mi clave', agents: 'Agentes', agent: 'Agente', newAgent: 'Nuevo agente', editAgent: 'Editar agente', agentsAbout: 'Un agente es un asistente preparado para un tipo de tarea, con sus propias instrucciones, preguntas iniciales y herramientas.', noAgents: 'Aún no hay agentes', findAgents: 'Buscar un agente', noneFound: 'No se encontró nada.', fromSite: 'Incluido', yours: 'Tuyo', startChat: 'Iniciar una conversación', chatWith: 'Hablar con {name}', duplicate: 'Duplicar', copyOf: 'Copia de {name}', delete: 'Eliminar', deleteAgent: '¿Eliminar este agente? Sus conversaciones se conservan.', cancel: 'Cancelar', save: 'Guardar', back: 'Atrás', agentName: 'Nombre', agentText: 'Qué hace', agentTextHint: 'Una línea, se muestra bajo su nombre.', instructions: 'Instrucciones', instructionsHint: 'Cómo debe trabajar y responder, y qué debe evitar. Cuanto más preciso, mejor.', questions: 'Preguntas iniciales', questionsHint: 'Una en cada línea.', color: 'Color', defaultModel: 'El modelo del chat', tools: 'Herramientas conectadas', toolsHint: 'Servidores MCP remotos que este agente puede usar (https). Un token se queda en este dispositivo y solo se envía con tus preguntas.', toolsOnly: 'Las herramientas conectadas funcionan con Anthropic y con tu propio servicio.', addTool: 'Añadir una herramienta', toolAddress: 'Dirección (https://…)', toolToken: 'Token, si hace falta', remove: 'Quitar', allAgents: 'Todos los agentes', used: 'Usó {tool} de {name}', using: 'Usando {tool} de {name}…', toolFailed: 'No funcionó', toolInput: 'Enviado', toolResult: 'Devuelto' },
  it: { newChat: 'Nuova chat', chats: 'Chat', noChats: 'Le tue chat compaiono qui.', findChats: 'Trova una chat', deleteChat: 'Elimina chat', kept: 'Le chat restano solo su questo dispositivo.', menu: 'Mostra chat', closeMenu: 'Nascondi chat', assistant: 'Assistente', model: 'Modello', welcome: 'Come posso aiutarti oggi?', placeholder: 'Chiedi qualsiasi cosa…', message: 'Messaggio', send: 'Invia', stop: 'Ferma', copy: 'Copia', copied: 'Copiato', edit: 'Modifica', again: 'Riprova', code: 'Codice', thinking: 'Sta pensando', wrong: 'Qualcosa è andato storto. Riprova tra un momento.', noService: 'Qui apparirà la risposta. Indica nelle impostazioni con cosa parla la chat per renderla reale.', refused: 'Non posso aiutarti con questo. Prova a chiedere in un altro modo.', noModel: 'Indica il modello nelle impostazioni della chat.', badKey: 'La chiave non è stata accettata. Controllala e inseriscila di nuovo.', stopped: 'Fermato.', keyTitle: 'La tua chiave {name}', keyHelp: 'La chat usa la tua chiave. Resta in questo browser e va solo a {name}.', keyField: 'Chiave API {name}', keySave: 'Usa questa chiave', keyForget: 'Dimentica la mia chiave', agents: 'Agenti', agent: 'Agente', newAgent: 'Nuovo agente', editAgent: 'Modifica agente', agentsAbout: 'Un agente è un assistente preparato per un tipo di compito, con istruzioni, domande iniziali e strumenti propri.', noAgents: 'Ancora nessun agente', findAgents: 'Trova un agente', noneFound: 'Nessun risultato.', fromSite: 'Incluso', yours: 'Tuo', startChat: 'Avvia una chat', chatWith: 'Chatta con {name}', duplicate: 'Duplica', copyOf: 'Copia di {name}', delete: 'Elimina', deleteAgent: 'Eliminare questo agente? Le sue chat restano.', cancel: 'Annulla', save: 'Salva', back: 'Indietro', agentName: 'Nome', agentText: 'Che cosa fa', agentTextHint: 'Una riga, mostrata sotto il nome.', instructions: 'Istruzioni', instructionsHint: 'Come deve lavorare e rispondere, e che cosa deve evitare. Più è preciso, meglio è.', questions: 'Domande iniziali', questionsHint: 'Una per riga.', color: 'Colore', defaultModel: 'Il modello della chat', tools: 'Strumenti collegati', toolsHint: 'Server MCP remoti che questo agente può usare (https). Un token resta su questo dispositivo e viene inviato solo con le tue domande.', toolsOnly: 'Gli strumenti collegati funzionano con Anthropic e con il tuo servizio.', addTool: 'Aggiungi uno strumento', toolAddress: 'Indirizzo (https://…)', toolToken: 'Token, se serve', remove: 'Rimuovi', allAgents: 'Tutti gli agenti', used: 'Ha usato {tool} di {name}', using: 'Sta usando {tool} di {name}…', toolFailed: 'Non ha funzionato', toolInput: 'Inviato', toolResult: 'Ricevuto' },
  nl: { newChat: 'Nieuw gesprek', chats: 'Gesprekken', noChats: 'Je gesprekken verschijnen hier.', findChats: 'Zoek een gesprek', deleteChat: 'Gesprek verwijderen', kept: 'Gesprekken blijven alleen op dit apparaat.', menu: 'Gesprekken tonen', closeMenu: 'Gesprekken verbergen', assistant: 'Assistent', model: 'Model', welcome: 'Waarmee kan ik je vandaag helpen?', placeholder: 'Vraag wat je wilt…', message: 'Bericht', send: 'Versturen', stop: 'Stoppen', copy: 'Kopiëren', copied: 'Gekopieerd', edit: 'Bewerken', again: 'Opnieuw proberen', code: 'Code', thinking: 'Denkt na', wrong: 'Er ging iets mis. Probeer het zo meteen opnieuw.', noService: 'Hier komt het antwoord. Geef in de instellingen aan waarmee de chat praat om hem echt te maken.', refused: 'Daar kan ik niet mee helpen. Probeer het anders te vragen.', noModel: 'Geef het model op in de instellingen van de chat.', badKey: 'De sleutel werd niet geaccepteerd. Controleer hem en geef hem opnieuw.', stopped: 'Gestopt.', keyTitle: 'Je {name}-sleutel', keyHelp: 'De chat gebruikt je eigen sleutel. Die blijft in deze browser en gaat alleen naar {name}.', keyField: '{name} API-sleutel', keySave: 'Deze sleutel gebruiken', keyForget: 'Mijn sleutel vergeten', agents: 'Agents', agent: 'Agent', newAgent: 'Nieuwe agent', editAgent: 'Agent bewerken', agentsAbout: 'Een agent is een assistent die is ingesteld voor één soort taak, met eigen instructies, startvragen en tools.', noAgents: 'Nog geen agents', findAgents: 'Zoek een agent', noneFound: 'Niets gevonden.', fromSite: 'Ingebouwd', yours: 'Van jou', startChat: 'Start een gesprek', chatWith: 'Praat met {name}', duplicate: 'Dupliceren', copyOf: 'Kopie van {name}', delete: 'Verwijderen', deleteAgent: 'Deze agent verwijderen? De gesprekken blijven.', cancel: 'Annuleren', save: 'Opslaan', back: 'Terug', agentName: 'Naam', agentText: 'Wat hij doet', agentTextHint: 'Eén regel, getoond onder de naam.', instructions: 'Instructies', instructionsHint: 'Hoe hij moet werken en antwoorden, en wat hij moet laten. Hoe preciezer, hoe beter.', questions: 'Startvragen', questionsHint: 'Eén per regel.', color: 'Kleur', defaultModel: 'Het model van de chat', tools: 'Verbonden tools', toolsHint: 'Externe MCP-servers die deze agent kan gebruiken (https). Een token blijft op dit apparaat en wordt alleen met je vragen meegestuurd.', toolsOnly: 'Verbonden tools werken met Anthropic en met je eigen dienst.', addTool: 'Tool toevoegen', toolAddress: 'Adres (https://…)', toolToken: 'Token, indien nodig', remove: 'Weghalen', allAgents: 'Alle agents', used: '{tool} van {name} gebruikt', using: 'Gebruikt {tool} van {name}…', toolFailed: 'Werkte niet', toolInput: 'Verstuurd', toolResult: 'Kwam terug' },
  pt: { newChat: 'Nova conversa', chats: 'Conversas', noChats: 'As suas conversas aparecem aqui.', findChats: 'Procurar conversa', deleteChat: 'Apagar conversa', kept: 'As conversas ficam só neste dispositivo.', menu: 'Mostrar conversas', closeMenu: 'Ocultar conversas', assistant: 'Assistente', model: 'Modelo', welcome: 'Como posso ajudar hoje?', placeholder: 'Pergunte o que quiser…', message: 'Mensagem', send: 'Enviar', stop: 'Parar', copy: 'Copiar', copied: 'Copiado', edit: 'Editar', again: 'Tentar de novo', code: 'Código', thinking: 'A pensar', wrong: 'Algo correu mal. Tente novamente daqui a pouco.', noService: 'A resposta aparecerá aqui. Indique nas definições com o que o chat fala para o tornar real.', refused: 'Não posso ajudar com isso. Tente perguntar de outra forma.', noModel: 'Indique o modelo nas definições do chat.', badKey: 'A chave não foi aceite. Verifique-a e introduza-a de novo.', stopped: 'Parado.', keyTitle: 'A sua chave {name}', keyHelp: 'O chat usa a sua própria chave. Fica neste navegador e só vai para {name}.', keyField: 'Chave API {name}', keySave: 'Usar esta chave', keyForget: 'Esquecer a minha chave', agents: 'Agentes', agent: 'Agente', newAgent: 'Novo agente', editAgent: 'Editar agente', agentsAbout: 'Um agente é um assistente preparado para um tipo de tarefa, com instruções, perguntas iniciais e ferramentas próprias.', noAgents: 'Ainda não há agentes', findAgents: 'Procurar um agente', noneFound: 'Nada encontrado.', fromSite: 'Incluído', yours: 'Seu', startChat: 'Iniciar uma conversa', chatWith: 'Conversar com {name}', duplicate: 'Duplicar', copyOf: 'Cópia de {name}', delete: 'Apagar', deleteAgent: 'Apagar este agente? As conversas dele ficam.', cancel: 'Cancelar', save: 'Guardar', back: 'Voltar', agentName: 'Nome', agentText: 'O que faz', agentTextHint: 'Uma linha, mostrada por baixo do nome.', instructions: 'Instruções', instructionsHint: 'Como deve trabalhar e responder, e o que deve evitar. Quanto mais exato, melhor.', questions: 'Perguntas iniciais', questionsHint: 'Uma em cada linha.', color: 'Cor', defaultModel: 'O modelo do chat', tools: 'Ferramentas ligadas', toolsHint: 'Servidores MCP remotos que este agente pode usar (https). Um token fica neste dispositivo e só é enviado com as suas perguntas.', toolsOnly: 'As ferramentas ligadas funcionam com a Anthropic e com o seu próprio serviço.', addTool: 'Adicionar uma ferramenta', toolAddress: 'Endereço (https://…)', toolToken: 'Token, se for preciso', remove: 'Remover', allAgents: 'Todos os agentes', used: 'Usou {tool} de {name}', using: 'A usar {tool} de {name}…', toolFailed: 'Não funcionou', toolInput: 'Enviado', toolResult: 'Devolvido' },
  pl: { newChat: 'Nowa rozmowa', chats: 'Rozmowy', noChats: 'Tutaj pojawią się Twoje rozmowy.', findChats: 'Znajdź rozmowę', deleteChat: 'Usuń rozmowę', kept: 'Rozmowy są zapisywane tylko na tym urządzeniu.', menu: 'Pokaż rozmowy', closeMenu: 'Ukryj rozmowy', assistant: 'Asystent', model: 'Model', welcome: 'W czym mogę dziś pomóc?', placeholder: 'Zapytaj o cokolwiek…', message: 'Wiadomość', send: 'Wyślij', stop: 'Zatrzymaj', copy: 'Kopiuj', copied: 'Skopiowano', edit: 'Edytuj', again: 'Spróbuj ponownie', code: 'Kod', thinking: 'Myśli', wrong: 'Coś poszło nie tak. Spróbuj ponownie za chwilę.', noService: 'Tutaj pojawi się odpowiedź. Wskaż w ustawieniach, z czym rozmawia czat, aby działał naprawdę.', refused: 'Nie mogę w tym pomóc. Spróbuj zapytać inaczej.', noModel: 'Podaj model w ustawieniach czatu.', badKey: 'Klucz nie został przyjęty. Sprawdź go i podaj ponownie.', stopped: 'Zatrzymano.', keyTitle: 'Twój klucz {name}', keyHelp: 'Czat używa Twojego klucza. Zostaje w tej przeglądarce i trafia tylko do {name}.', keyField: 'Klucz API {name}', keySave: 'Użyj tego klucza', keyForget: 'Zapomnij mój klucz', agents: 'Agenci', agent: 'Agent', newAgent: 'Nowy agent', editAgent: 'Edytuj agenta', agentsAbout: 'Agent to asystent przygotowany do jednego rodzaju zadań, z własnymi instrukcjami, pytaniami na start i narzędziami.', noAgents: 'Nie ma jeszcze agentów', findAgents: 'Znajdź agenta', noneFound: 'Nic nie znaleziono.', fromSite: 'Wbudowany', yours: 'Twój', startChat: 'Rozpocznij rozmowę', chatWith: 'Rozmawiaj: {name}', duplicate: 'Duplikuj', copyOf: 'Kopia: {name}', delete: 'Usuń', deleteAgent: 'Usunąć tego agenta? Jego rozmowy zostaną.', cancel: 'Anuluj', save: 'Zapisz', back: 'Wstecz', agentName: 'Nazwa', agentText: 'Co robi', agentTextHint: 'Jedna linia, widoczna pod nazwą.', instructions: 'Instrukcje', instructionsHint: 'Jak ma pracować i odpowiadać oraz czego unikać. Im dokładniej, tym lepiej.', questions: 'Pytania na start', questionsHint: 'Jedno w każdej linii.', color: 'Kolor', defaultModel: 'Model czatu', tools: 'Podłączone narzędzia', toolsHint: 'Zdalne serwery MCP, z których agent może korzystać (https). Token zostaje na tym urządzeniu i jest wysyłany tylko z Twoimi pytaniami.', toolsOnly: 'Podłączone narzędzia działają z Anthropic i z Twoją własną usługą.', addTool: 'Dodaj narzędzie', toolAddress: 'Adres (https://…)', toolToken: 'Token, jeśli jest potrzebny', remove: 'Usuń', allAgents: 'Wszyscy agenci', used: 'Użyto {tool} z {name}', using: 'Używa {tool} z {name}…', toolFailed: 'Nie zadziałało', toolInput: 'Wysłano', toolResult: 'Zwrócono' },
  zh: { newChat: '新对话', chats: '对话', noChats: '你的对话会显示在这里。', findChats: '查找对话', deleteChat: '删除对话', kept: '对话只保存在这台设备上。', menu: '显示对话', closeMenu: '隐藏对话', assistant: '助手', model: '模型', welcome: '今天我能帮你做什么？', placeholder: '问点什么…', message: '消息', send: '发送', stop: '停止', copy: '复制', copied: '已复制', edit: '编辑', again: '重试', code: '代码', thinking: '思考中', wrong: '出了点问题，请稍后重试。', noService: '回答会显示在这里。在设置中说明聊天连接到哪里，让它真正工作。', refused: '这个我帮不上忙。换个方式问问看。', noModel: '请在聊天设置中填写要使用的模型。', badKey: '密钥未被接受。请检查后重新输入。', stopped: '已停止。', keyTitle: '你的 {name} 密钥', keyHelp: '聊天使用你自己的密钥。它只保存在此浏览器中，只发送给 {name}。', keyField: '{name} API 密钥', keySave: '使用此密钥', keyForget: '忘记我的密钥', agents: '智能体', agent: '智能体', newAgent: '新建智能体', editAgent: '编辑智能体', agentsAbout: '智能体是为某一类任务设置的助手，有自己的指令、开场问题和工具。', noAgents: '还没有智能体', findAgents: '查找智能体', noneFound: '没有找到。', fromSite: '内置', yours: '我的', startChat: '开始对话', chatWith: '与 {name} 对话', duplicate: '复制一份', copyOf: '{name} 的副本', delete: '删除', deleteAgent: '删除这个智能体？它的对话会保留。', cancel: '取消', save: '保存', back: '返回', agentName: '名称', agentText: '它做什么', agentTextHint: '一行文字，显示在名称下方。', instructions: '指令', instructionsHint: '它应如何工作和回答，以及不该做什么。越具体越好。', questions: '开场问题', questionsHint: '每行一个。', color: '颜色', defaultModel: '聊天自己的模型', tools: '已连接的工具', toolsHint: '这个智能体可以使用的远程 MCP 服务器（https）。令牌只保存在这台设备上，只随你的问题发送。', toolsOnly: '已连接的工具适用于 Anthropic 和你自己的服务。', addTool: '添加工具', toolAddress: '地址（https://…）', toolToken: '令牌（如需要）', remove: '移除', allAgents: '所有智能体', used: '已使用 {name} 的 {tool}', using: '正在使用 {name} 的 {tool}…', toolFailed: '未成功', toolInput: '发送内容', toolResult: '返回内容' },
  ja: { newChat: '新しいチャット', chats: 'チャット', noChats: 'チャットはここに表示されます。', findChats: 'チャットを探す', deleteChat: 'チャットを削除', kept: 'チャットはこの端末にのみ保存されます。', menu: 'チャットを表示', closeMenu: 'チャットを隠す', assistant: 'アシスタント', model: 'モデル', welcome: '今日はどんなお手伝いをしましょうか？', placeholder: '何でも聞いてください…', message: 'メッセージ', send: '送信', stop: '停止', copy: 'コピー', copied: 'コピーしました', edit: '編集', again: 'もう一度', code: 'コード', thinking: '考え中', wrong: '問題が発生しました。しばらくしてからもう一度お試しください。', noService: 'ここに回答が表示されます。設定でチャットの接続先を指定すると実際に動きます。', refused: 'その件はお手伝いできません。別の聞き方を試してください。', noModel: 'チャットの設定で使用するモデルを指定してください。', badKey: 'キーが受け付けられませんでした。確認してもう一度入力してください。', stopped: '停止しました。', keyTitle: 'あなたの {name} キー', keyHelp: 'チャットはあなた自身のキーを使います。キーはこのブラウザに残り、{name} にだけ送られます。', keyField: '{name} API キー', keySave: 'このキーを使う', keyForget: 'キーを削除', agents: 'エージェント', agent: 'エージェント', newAgent: '新しいエージェント', editAgent: 'エージェントを編集', agentsAbout: 'エージェントは、ひとつの種類の仕事のために用意したアシスタントです。独自の指示、最初の質問、ツールを持ちます。', noAgents: 'エージェントはまだありません', findAgents: 'エージェントを探す', noneFound: '見つかりませんでした。', fromSite: '標準', yours: '自分用', startChat: 'チャットを始める', chatWith: '{name} とチャット', duplicate: '複製', copyOf: '{name} のコピー', delete: '削除', deleteAgent: 'このエージェントを削除しますか？チャットは残ります。', cancel: 'キャンセル', save: '保存', back: '戻る', agentName: '名前', agentText: 'できること', agentTextHint: '1 行。名前の下に表示されます。', instructions: '指示', instructionsHint: 'どのように作業し答えるか、何をしないか。具体的なほど良くなります。', questions: '最初の質問', questionsHint: '1 行にひとつ。', color: '色', defaultModel: 'チャットのモデル', tools: '接続したツール', toolsHint: 'このエージェントが使えるリモート MCP サーバー（https）。トークンはこの端末に残り、質問と一緒にだけ送られます。', toolsOnly: '接続したツールは Anthropic と独自サービスで使えます。', addTool: 'ツールを追加', toolAddress: 'アドレス（https://…）', toolToken: 'トークン（必要な場合）', remove: '削除', allAgents: 'すべてのエージェント', used: '{name} の {tool} を使用しました', using: '{name} の {tool} を使用中…', toolFailed: 'うまくいきませんでした', toolInput: '送信内容', toolResult: '結果' }
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
const said = content => (typeof content === 'string' ? content : Array.isArray(content) ? content.map(one => (one && typeof one.text === 'string' ? one.text : '')).filter(Boolean).join('\\n') : content ? JSON.stringify(content) : '')
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
    return { chats: [], currentId: '', draft: '', busy: false, waitingFirst: false, menuOpen: false, find: '', copied: '', picked: '', key: '', keyDraft: '', follow: true, view: this.opens === 'agents' ? 'agents' : 'chat', own: [], agentId: '', form: null, findAgent: '', asking: '', shownUse: '' }
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
    opens(value) { this.view = value === 'agents' ? 'agents' : 'chat' },
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
    useLine(use, running) {
      return this.say(use.done || !running ? 'used' : 'using', '', use.server || 'MCP').replace(/\\{tool\\}/g, use.name || '…')
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
    // The MCP servers of this question: the site's, then the agent's. Only https addresses, each name once.
    servers() {
      if (this.provider === 'openai') return []
      const found = []
      // (a site's server never carries a token: whatever is in a prop is public)
      const all = (this.tools || []).map(one => ({ name: one && one.name, url: one && one.url })).concat(this.agent ? this.agent.tools : [])
      for (const one of all) {
        const url = String(one.url || '').trim()
        if (!/^https:\\/\\/\\S+$/i.test(url) || found.some(other => other.url === url)) continue
        let name = String(one.name || '').trim() || url.replace(/^https:\\/\\//i, '').split(/[/?#]/)[0]
        while (found.some(other => other.name === name)) name += '-2'
        found.push(one.token ? { name, url, token: one.token } : { name, url })
      }
      return found
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
      this.view = 'chat'
      this.form = null
      this.menuOpen = false
      this.$nextTick(() => this.$refs.input && this.$refs.input.focus())
    },
    open(id) {
      this.stop()
      this.currentId = id
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
      if (!text || this.busy) return
      if (!this.current) {
        const chat = { id: newId(), title: text.slice(0, 60), messages: [], at: Date.now() }
        if (this.agent) chat.agent = this.agent.id
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
      let reply = { role: 'assistant', content: '' }
      let shown = false
      // (once in the chat, it is written to through the chat, so every word shows as it comes)
      const show = () => { if (!shown) { chat.messages.push(reply); reply = chat.messages[chat.messages.length - 1]; shown = true; this.waitingFirst = false } }
      const write = piece => {
        if (turn !== this.turn || !piece) return
        show()
        reply.content += piece
        this.down()
      }
      // A tool being used: it starts (a row), what it is sent comes in pieces, and what it gave back ends it
      const tool = step => {
        if (turn !== this.turn) return
        if (step.start) {
          show()
          if (!reply.uses) reply.uses = []
          reply.uses.push({ id: step.id || '', at: step.index, name: step.name || '', server: step.server || '', input: step.input || '', result: '', error: false, done: false })
        } else {
          const use = (reply.uses || []).find(one => (step.id ? one.id === step.id : one.at === step.index && !one.done))
          if (!use) return
          if (step.json) use.input += step.json
          if (step.done) { use.done = true; use.error = !!step.error; use.result = clip(step.text); use.input = clip(pretty(use.input)) }
        }
        this.down()
      }
      let own = ''
      try {
        await this.request(chat.messages.filter(one => !one.local && one.content).map(one => ({ role: one.role, content: one.content })), write, control && control.signal, tool)
        if (turn === this.turn && !shown) own = this.say('wrong')
      } catch (e) {
        if (turn !== this.turn) return
        own = e && e.said ? this.say(e.said) : this.say('wrong')
      }
      if (turn !== this.turn) return
      for (const use of reply.uses || []) use.input = clip(pretty(use.input))
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
    async request(messages, write, signal, tool) {
      const known = PROVIDERS[this.provider]
      const agent = this.agent
      // (an agent's instructions come on top of the site's, and its own model before the one picked)
      const system = [this.system, agent && agent.instructions].filter(Boolean).join('\\n\\n')
      const model = (agent && agent.model) || this.picked || this.model || (known ? known.model : '')
      const servers = this.servers()
      if (!known) {
        if (!this.endpoint) { const e = new Error('no service'); e.said = 'noService'; throw e }
        const body = { messages: (system ? [{ role: 'system', content: system }] : []).concat(messages) }
        if (model) body.model = model
        if (servers.length) body.mcp_servers = servers.map(one => (one.token ? { name: one.name, url: one.url, authorization_token: one.token } : { name: one.name, url: one.url }))
        return this.readAnswer(await this.send(this.endpoint, { 'Content-Type': 'application/json', Accept: 'text/event-stream, application/json' }, body, signal), write, 'any', tool)
      }
      if (!this.endpoint && !this.usesKey) { const e = new Error('no service'); e.said = 'noService'; throw e }
      if (!model) { const e = new Error('no model'); e.said = 'noModel'; throw e }
      const direct = this.usesKey
      const url = direct ? known.url : this.endpoint
      if (this.provider === 'anthropic') {
        const headers = { 'Content-Type': 'application/json', Accept: 'text/event-stream', 'anthropic-version': '2026-10-21' }
        const body = { model, max_tokens: 64000, stream: true, messages }
        if (system) body.system = system
        const betas = []
        // (a declined request is answered by the next model, when the model takes that)
        if (FALLBACK_MODELS.includes(model)) { betas.push('server-side-fallback-2026-07-01'); body.fallbacks = 'default' }
        // (MCP connector: the servers, and one toolset for each, by the same name)
        if (servers.length) {
          betas.push('mcp-client-2025-11-20')
          body.mcp_servers = servers.map(one => (one.token ? { type: 'url', url: one.url, name: one.name, authorization_token: one.token } : { type: 'url', url: one.url, name: one.name }))
          body.tools = servers.map(one => ({ type: 'mcp_toolset', mcp_server_name: one.name }))
        }
        if (betas.length) headers['anthropic-beta'] = betas.join(',')
        if (direct) { headers['x-api-key'] = this.key; headers['anthropic-dangerous-direct-browser-access'] = 'true' }
        return this.readAnswer(await this.send(url, headers, body, signal), write, 'anthropic', tool)
      }
      const headers = { 'Content-Type': 'application/json', Accept: 'text/event-stream' }
      if (direct) headers.Authorization = 'Bearer ' + this.key
      const body = { model, stream: true, messages: (system ? [{ role: 'system', content: system }] : []).concat(messages) }
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
    async readAnswer(response, write, kind, tool = () => {}) {
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
      let wrote = false
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
          if (kind === 'anthropic' || data.type === 'content_block_delta' || data.type === 'content_block_start') {
            const block = data.type === 'content_block_start' && data.content_block
            // (text after a tool was used starts on a line of its own)
            if (block && block.type === 'text' && wrote) write('\\n\\n')
            if (block && block.type === 'mcp_tool_use') tool({ start: true, index: data.index, id: block.id, name: block.name, server: block.server_name, input: block.input && Object.keys(block.input).length ? JSON.stringify(block.input) : '' })
            if (block && block.type === 'mcp_tool_result') tool({ done: true, id: block.tool_use_id, error: block.is_error, text: said(block.content) })
            if (data.type === 'content_block_delta' && data.delta && data.delta.type === 'input_json_delta') tool({ index: data.index, json: data.delta.partial_json })
            if (data.type === 'content_block_delta' && data.delta && data.delta.type === 'text_delta') { write(data.delta.text); wrote = wrote || !!data.delta.text }
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
}
@media (prefers-reduced-motion: reduce) {
  .vp-chat-app__dots span, .vp-chat-app__caret { animation: none; }
  .vp-chat-app__spin { animation-duration: 2.4s; }
  .vp-chat-app__side, .vp-chat-app__use-turn, .vp-chat-app__pick, .vp-chat-app__do, .vp-chat-app__agent, .vp-chat-app__box { transition: none; }
}
@keyframes vp-chat-app-wait {
  0%, 80%, 100% { opacity: 0.25; transform: translateY(0); }
  40% { opacity: 0.9; transform: translateY(-0.2em); }
}
@keyframes vp-chat-app-spin {
  to { transform: rotate(360deg); }
}
@keyframes vp-chat-app-blink {
  to { opacity: 0; }
}
</style>
`;export{e as default};