import{t as e}from"./ready-DhtrBBEP.js";import{n as t,o as n}from"./pageHeadTags-6JrUkAHc.js";import"./main-DgqhRvZQ.js";function r(e,t){return t=String(t??``),t.includes(`"`)?t.includes(`'`)?`${e}="${t.replaceAll(`"`,`&quot;`)}"`:`${e}='${t}'`:`${e}="${t}"`}function i(e,t=0){let n=`  `.repeat(t);if(e.type===`text`)return n+e.content;let a=Object.entries(e.attrs||{}).map(([e,t])=>r(e,t)),o=`<`+[e.name,...a].join(` `),s=e.children||[];return s.length?s.length===1&&s[0].type===`text`?n+o+`>`+s[0].content+`</`+e.name+`>`:n+o+`>
`+s.map(e=>i(e,t+1)).join(`
`)+`
`+n+`</`+e.name+`>`:n+o+` />`}function a(t,n=[]){for(let r of[t].flat())r.type===`tag`&&(e[r.name]&&!n.includes(r.name)&&n.push(r.name),a(r.children||[],n));return n}var o=e=>`'`+String(e).replaceAll(`\\`,`\\\\`).replaceAll(`'`,`\\'`)+`'`;function s(r,{name:s,title:c,description:l,hidden:u=!1,head:d={},script:f=``}={}){let p=a(r),m=c?`  `+t(n(d,{title:c,description:l,hidden:u}))+`,
`:``;return`<template>
`+i(r,1)+`
</template>
<script>
`+p.map(t=>`import ${t} from '@vueplayio/${e[t]}'\n`).join(``)+`export default {
`+(s?`  name: ${o(s)},\n`:``)+(p.length?`  components: { ${p.join(`, `)} },\n`:``)+m+(f?f.replace(/\n*$/,`
`):``)+`}
<\/script>
`}var c=e=>`--image-`+e.replace(/[ .]/g,`-`).replace(/[^a-zA-Z0-9-]/g,``).toLowerCase().replace(/^[^a-z]+/,``).replace(/-+$/,``),l=`system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`;function u(e){let t={background:`#ffffff`,text:`#111827`,font:l,...e.look};return{root:[[`--color-primary`,t.primary],[`--color-secondary`,t.secondary||t.primary],[`--vp-primary`,t.primary],[`--vp-primary-contrast`,t.contrast||`#ffffff`],[`--vp-background`,t.background],[`--vp-text`,t.text],[`--vp-muted`,t.muted||`#6b7280`],[`--vp-surface`,t.surface||`#f8fafc`],[`--vp-border`,t.border||`#e5e7eb`],[`--vp-radius`,t.radius||`10px`],[`--vp-width`,t.width||`1120px`],[`--vp-font-heading`,t.heading||t.font]],body:[[`background`,t.background],[`color`,t.text],[`font-family`,t.font]]}}export{a,s as i,u as n,c as r,i as t};