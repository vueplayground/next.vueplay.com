import{S as r}from"./SectionRenderer-6eb9b37c.js";import{_ as n,r as o,c as p,j as l,o as m}from"./index-837acbfe.js";import"./compiler-8051713d.js";const c={components:{SectionRenderer:r},inject:["compiler"],data:()=>({ast:null,main:""}),watch:{main(e){e.indexOf("<template><")!==-1&&(e=e.replace("<template><",`<template>
        <`)),this.ast=this.compiler.parse(e,!0,!0)}},async mounted(){var a,i;let e=((a=window==null?void 0:window.location)==null?void 0:a.hash)||((i=window==null?void 0:window.frameElement)==null?void 0:i.getAttribute("uid"));if(e){e=e.replace("#","");let t=await fetch(`https://api.vueplay.io/types/sfc/${e}?ref=HEAD&type=vue`);this.main=await t.text(),this.ast=this.compiler.parse(this.main,!0,!0)}else this.main=`
        <template>
          <div>No Source</div>
        </template>
      `,this.ast=this.compiler.parse(this.main,!0,!0);window.addEventListener("message",t=>{typeof t.data.raw<"u"&&(this.main=t.data.raw,this.ast=this.compiler.parse(this.main,!0,!0))})}},d={class:"preview"};function u(e,a,i,t,_,h){const s=o("SectionRenderer");return m(),p("div",d,[l(s,{ast:e.ast,main:e.main,sidemenu:"0px",mobile:!1,fs:{},events:!0,full:!0,tailwind:!0},null,8,["ast","main"])])}const y=n(c,[["render",u],["__scopeId","data-v-a72d812e"]]);export{y as default};