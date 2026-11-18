import{t as e}from"./ready-Bmqv8ZZc.js";import{c as t,n,s as r}from"./pageHeadTags-BmoQKmMQ.js";import"./main-BjHvPIhI.js";function i(e,t){return t=String(t??``),t.includes(`"`)?t.includes(`'`)?`${e}="${t.replaceAll(`"`,`&quot;`)}"`:`${e}='${t}'`:`${e}="${t}"`}function a(e,t=0){let n=`  `.repeat(t);if(e.type===`text`)return n+e.content;let r=Object.entries(e.attrs||{}).map(([e,t])=>i(e,t)),o=`<`+[e.name,...r].join(` `),s=e.children||[];return s.length?s.length===1&&s[0].type===`text`?n+o+`>`+s[0].content+`</`+e.name+`>`:n+o+`>
`+s.map(e=>a(e,t+1)).join(`
`)+`
`+n+`</`+e.name+`>`:n+o+` />`}function o(t,n=[]){for(let r of[t].flat())r.type===`tag`&&(e[r.name]&&!n.includes(r.name)&&n.push(r.name),o(r.children||[],n));return n}var s=e=>`'`+String(e).replaceAll(`\\`,`\\\\`).replaceAll(`'`,`\\'`)+`'`;function c(i,{name:c,title:l,description:u,hidden:d=!1,head:f={},script:p=``,schema:m=null}={}){let h=o(i),g=l?`  `+n(r(t(f,{title:l,description:u,hidden:d}),d?null:m))+`,
`:``;return`<template>
`+a(i,1)+`
</template>
<script>
`+h.map(t=>`import ${t} from '@vueplayio/${e[t]}'\n`).join(``)+`export default {
`+(c?`  name: ${s(c)},\n`:``)+(h.length?`  components: { ${h.join(`, `)} },\n`:``)+g+(p?p.replace(/\n*$/,`
`):``)+`}
<\/script>
`}var l=e=>`--image-`+e.replace(/[ .]/g,`-`).replace(/[^a-zA-Z0-9-]/g,``).toLowerCase().replace(/^[^a-z]+/,``).replace(/-+$/,``),u=`system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`;function d(e){let t={background:`#ffffff`,text:`#111827`,font:u,...e.look};return{root:[[`--color-primary`,t.primary],[`--color-secondary`,t.secondary||t.primary],[`--vp-primary`,t.primary],[`--vp-primary-contrast`,t.contrast||`#ffffff`],[`--vp-background`,t.background],[`--vp-text`,t.text],[`--vp-muted`,t.muted||`#6b7280`],[`--vp-surface`,t.surface||`#f8fafc`],[`--vp-border`,t.border||`#e5e7eb`],[`--vp-radius`,t.radius||`10px`],[`--vp-width`,t.width||`1120px`],[`--vp-font-heading`,t.heading||t.font]],body:[[`background`,t.background],[`color`,t.text],[`font-family`,t.font]]}}export{o as a,c as i,d as n,l as r,a as t};