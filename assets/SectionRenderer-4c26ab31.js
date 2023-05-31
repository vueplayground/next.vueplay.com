import{c as y}from"./compiler-d0e4e557.js";import{_,o as k,c as E,l as x,a as w,b as C,y as T,v as A}from"./index-a2b79509.js";const P='function e(e,t){const n=Object.create(null),o=e.split(",");for(let r=0;r<o.length;r++)n[o[r]]=!0;return t?e=>!!n[e.toLowerCase()]:e=>!!n[e]}const t=e("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt"),n=e("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");function o(e){return!!e||""===e}function r(e){if(E(e)){const t={};for(let n=0;n<e.length;n++){const o=e[n],s=A(o)?l(o):r(o);if(s)for(const e in s)t[e]=s[e]}return t}return A(e)||M(e)?e:void 0}const s=/;(?![^(]*\\))/g,i=/:(.+)/;function l(e){const t={};return e.split(s).forEach((e=>{if(e){const n=e.split(i);n.length>1&&(t[n[0].trim()]=n[1].trim())}})),t}function c(e){let t="";if(A(e))t=e;else if(E(e))for(let n=0;n<e.length;n++){const o=c(e[n]);o&&(t+=o+" ")}else if(M(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}function a(e){if(!e)return null;let{class:t,style:n}=e;return t&&!A(t)&&(e.class=c(t)),n&&(e.style=r(n)),e}const u=e("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot"),p=e("svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view"),f=e("area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr");function d(e,t){if(e===t)return!0;let n=R(e),o=R(t);if(n||o)return!(!n||!o)&&e.getTime()===t.getTime();if(n=P(e),o=P(t),n||o)return e===t;if(n=E(e),o=E(t),n||o)return!(!n||!o)&&function(e,t){if(e.length!==t.length)return!1;let n=!0;for(let o=0;n&&o<e.length;o++)n=d(e[o],t[o]);return n}(e,t);if(n=M(e),o=M(t),n||o){if(!n||!o)return!1;if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e){const o=e.hasOwnProperty(n),r=t.hasOwnProperty(n);if(o&&!r||!o&&r||!d(e[n],t[n]))return!1}}return String(e)===String(t)}function h(e,t){return e.findIndex((e=>d(e,t)))}const m=e=>A(e)?e:null==e?"":E(e)||M(e)&&(e.toString===I||!F(e.toString))?JSON.stringify(e,g,2):String(e),g=(e,t)=>t&&t.__v_isRef?g(e,t.value):$(t)?{[`Map(${t.size})`]:[...t.entries()].reduce(((e,[t,n])=>(e[`${t} =>`]=n,e)),{})}:O(t)?{[`Set(${t.size})`]:[...t.values()]}:!M(t)||E(t)||L(t)?t:String(t),v={},y=[],_=()=>{},b=()=>!1,S=/^on[^a-z]/,x=e=>S.test(e),C=e=>e.startsWith("onUpdate:"),k=Object.assign,w=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},T=Object.prototype.hasOwnProperty,N=(e,t)=>T.call(e,t),E=Array.isArray,$=e=>"[object Map]"===B(e),O=e=>"[object Set]"===B(e),R=e=>"[object Date]"===B(e),F=e=>"function"==typeof e,A=e=>"string"==typeof e,P=e=>"symbol"==typeof e,M=e=>null!==e&&"object"==typeof e,V=e=>M(e)&&F(e.then)&&F(e.catch),I=Object.prototype.toString,B=e=>I.call(e),L=e=>"[object Object]"===B(e),j=e=>A(e)&&"NaN"!==e&&"-"!==e[0]&&""+parseInt(e,10)===e,U=e(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),D=e("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"),H=e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))},W=/-(\\w)/g,z=H((e=>e.replace(W,((e,t)=>t?t.toUpperCase():"")))),K=/\\B([A-Z])/g,G=H((e=>e.replace(K,"-$1").toLowerCase())),q=H((e=>e.charAt(0).toUpperCase()+e.slice(1))),J=H((e=>e?`on${q(e)}`:"")),Z=(e,t)=>!Object.is(e,t),Y=(e,t)=>{for(let n=0;n<e.length;n++)e[n](t)},Q=(e,t,n)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:n})},X=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let ee;let te;class ne{constructor(e=!1){this.detached=e,this.active=!0,this.effects=[],this.cleanups=[],this.parent=te,!e&&te&&(this.index=(te.scopes||(te.scopes=[])).push(this)-1)}run(e){if(this.active){const t=te;try{return te=this,e()}finally{te=t}}}on(){te=this}off(){te=this.parent}stop(e){if(this.active){let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);if(!this.detached&&this.parent&&!e){const e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index)}this.parent=void 0,this.active=!1}}}function oe(e){return new ne(e)}function re(e,t=te){t&&t.active&&t.effects.push(e)}function se(){return te}function ie(e){te&&te.cleanups.push(e)}const le=e=>{const t=new Set(e);return t.w=0,t.n=0,t},ce=e=>(e.w&fe)>0,ae=e=>(e.n&fe)>0,ue=new WeakMap;let pe=0,fe=1;let de;const he=Symbol(""),me=Symbol("");class ge{constructor(e,t=null,n){this.fn=e,this.scheduler=t,this.active=!0,this.deps=[],this.parent=void 0,re(this,n)}run(){if(!this.active)return this.fn();let e=de,t=be;for(;e;){if(e===this)return;e=e.parent}try{return this.parent=de,de=this,be=!0,fe=1<<++pe,pe<=30?(({deps:e})=>{if(e.length)for(let t=0;t<e.length;t++)e[t].w|=fe})(this):ve(this),this.fn()}finally{pe<=30&&(e=>{const{deps:t}=e;if(t.length){let n=0;for(let o=0;o<t.length;o++){const r=t[o];ce(r)&&!ae(r)?r.delete(e):t[n++]=r,r.w&=~fe,r.n&=~fe}t.length=n}})(this),fe=1<<--pe,de=this.parent,be=t,this.parent=void 0,this.deferStop&&this.stop()}}stop(){de===this?this.deferStop=!0:this.active&&(ve(this),this.onStop&&this.onStop(),this.active=!1)}}function ve(e){const{deps:t}=e;if(t.length){for(let n=0;n<t.length;n++)t[n].delete(e);t.length=0}}function ye(e,t){e.effect&&(e=e.effect.fn);const n=new ge(e);t&&(k(n,t),t.scope&&re(n,t.scope)),t&&t.lazy||n.run();const o=n.run.bind(n);return o.effect=n,o}function _e(e){e.effect.stop()}let be=!0;const Se=[];function xe(){Se.push(be),be=!1}function Ce(){const e=Se.pop();be=void 0===e||e}function ke(e,t,n){if(be&&de){let t=ue.get(e);t||ue.set(e,t=new Map);let o=t.get(n);o||t.set(n,o=le()),we(o)}}function we(e,t){let n=!1;pe<=30?ae(e)||(e.n|=fe,n=!ce(e)):n=!e.has(de),n&&(e.add(de),de.deps.push(e))}function Te(e,t,n,o,r,s){const i=ue.get(e);if(!i)return;let l=[];if("clear"===t)l=[...i.values()];else if("length"===n&&E(e))i.forEach(((e,t)=>{("length"===t||t>=o)&&l.push(e)}));else switch(void 0!==n&&l.push(i.get(n)),t){case"add":E(e)?j(n)&&l.push(i.get("length")):(l.push(i.get(he)),$(e)&&l.push(i.get(me)));break;case"delete":E(e)||(l.push(i.get(he)),$(e)&&l.push(i.get(me)));break;case"set":$(e)&&l.push(i.get(he))}if(1===l.length)l[0]&&Ne(l[0]);else{const e=[];for(const t of l)t&&e.push(...t);Ne(le(e))}}function Ne(e,t){const n=E(e)?e:[...e];for(const o of n)o.computed&&Ee(o);for(const o of n)o.computed||Ee(o)}function Ee(e,t){(e!==de||e.allowRecurse)&&(e.scheduler?e.scheduler():e.run())}const $e=e("__proto__,__v_isRef,__isVue"),Oe=new Set(Object.getOwnPropertyNames(Symbol).filter((e=>"arguments"!==e&&"caller"!==e)).map((e=>Symbol[e])).filter(P)),Re=Ie(),Fe=Ie(!1,!0),Ae=Ie(!0),Pe=Ie(!0,!0),Me=Ve();function Ve(){const e={};return["includes","indexOf","lastIndexOf"].forEach((t=>{e[t]=function(...e){const n=wt(this);for(let t=0,r=this.length;t<r;t++)ke(n,0,t+"");const o=n[t](...e);return-1===o||!1===o?n[t](...e.map(wt)):o}})),["push","pop","shift","unshift","splice"].forEach((t=>{e[t]=function(...e){xe();const n=wt(this)[t].apply(this,e);return Ce(),n}})),e}function Ie(e=!1,t=!1){return function(n,o,r){if("__v_isReactive"===o)return!e;if("__v_isReadonly"===o)return e;if("__v_isShallow"===o)return t;if("__v_raw"===o&&r===(e?t?ht:dt:t?ft:pt).get(n))return n;const s=E(n);if(!e&&s&&N(Me,o))return Reflect.get(Me,o,r);const i=Reflect.get(n,o,r);return(P(o)?Oe.has(o):$e(o))?i:(e||ke(n,0,o),t?i:Rt(i)?s&&j(o)?i:i.value:M(i)?e?yt(i):gt(i):i)}}function Be(e=!1){return function(t,n,o,r){let s=t[n];if(xt(s)&&Rt(s)&&!Rt(o))return!1;if(!e&&(Ct(o)||xt(o)||(s=wt(s),o=wt(o)),!E(t)&&Rt(s)&&!Rt(o)))return s.value=o,!0;const i=E(t)&&j(n)?Number(n)<t.length:N(t,n),l=Reflect.set(t,n,o,r);return t===wt(r)&&(i?Z(o,s)&&Te(t,"set",n,o):Te(t,"add",n,o)),l}}const Le={get:Re,set:Be(),deleteProperty:function(e,t){const n=N(e,t),o=Reflect.deleteProperty(e,t);return o&&n&&Te(e,"delete",t,void 0),o},has:function(e,t){const n=Reflect.has(e,t);return P(t)&&Oe.has(t)||ke(e,0,t),n},ownKeys:function(e){return ke(e,0,E(e)?"length":he),Reflect.ownKeys(e)}},je={get:Ae,set:(e,t)=>!0,deleteProperty:(e,t)=>!0},Ue=k({},Le,{get:Fe,set:Be(!0)}),De=k({},je,{get:Pe}),He=e=>e,We=e=>Reflect.getPrototypeOf(e);function ze(e,t,n=!1,o=!1){const r=wt(e=e.__v_raw),s=wt(t);n||(t!==s&&ke(r,0,t),ke(r,0,s));const{has:i}=We(r),l=o?He:n?Et:Nt;return i.call(r,t)?l(e.get(t)):i.call(r,s)?l(e.get(s)):void(e!==r&&e.get(t))}function Ke(e,t=!1){const n=this.__v_raw,o=wt(n),r=wt(e);return t||(e!==r&&ke(o,0,e),ke(o,0,r)),e===r?n.has(e):n.has(e)||n.has(r)}function Ge(e,t=!1){return e=e.__v_raw,!t&&ke(wt(e),0,he),Reflect.get(e,"size",e)}function qe(e){e=wt(e);const t=wt(this);return We(t).has.call(t,e)||(t.add(e),Te(t,"add",e,e)),this}function Je(e,t){t=wt(t);const n=wt(this),{has:o,get:r}=We(n);let s=o.call(n,e);s||(e=wt(e),s=o.call(n,e));const i=r.call(n,e);return n.set(e,t),s?Z(t,i)&&Te(n,"set",e,t):Te(n,"add",e,t),this}function Ze(e){const t=wt(this),{has:n,get:o}=We(t);let r=n.call(t,e);r||(e=wt(e),r=n.call(t,e)),o&&o.call(t,e);const s=t.delete(e);return r&&Te(t,"delete",e,void 0),s}function Ye(){const e=wt(this),t=0!==e.size,n=e.clear();return t&&Te(e,"clear",void 0,void 0),n}function Qe(e,t){return function(n,o){const r=this,s=r.__v_raw,i=wt(s),l=t?He:e?Et:Nt;return!e&&ke(i,0,he),s.forEach(((e,t)=>n.call(o,l(e),l(t),r)))}}function Xe(e,t,n){return function(...o){const r=this.__v_raw,s=wt(r),i=$(s),l="entries"===e||e===Symbol.iterator&&i,c="keys"===e&&i,a=r[e](...o),u=n?He:t?Et:Nt;return!t&&ke(s,0,c?me:he),{next(){const{value:e,done:t}=a.next();return t?{value:e,done:t}:{value:l?[u(e[0]),u(e[1])]:u(e),done:t}},[Symbol.iterator](){return this}}}}function et(e){return function(...t){return"delete"!==e&&this}}function tt(){const e={get(e){return ze(this,e)},get size(){return Ge(this)},has:Ke,add:qe,set:Je,delete:Ze,clear:Ye,forEach:Qe(!1,!1)},t={get(e){return ze(this,e,!1,!0)},get size(){return Ge(this)},has:Ke,add:qe,set:Je,delete:Ze,clear:Ye,forEach:Qe(!1,!0)},n={get(e){return ze(this,e,!0)},get size(){return Ge(this,!0)},has(e){return Ke.call(this,e,!0)},add:et("add"),set:et("set"),delete:et("delete"),clear:et("clear"),forEach:Qe(!0,!1)},o={get(e){return ze(this,e,!0,!0)},get size(){return Ge(this,!0)},has(e){return Ke.call(this,e,!0)},add:et("add"),set:et("set"),delete:et("delete"),clear:et("clear"),forEach:Qe(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach((r=>{e[r]=Xe(r,!1,!1),n[r]=Xe(r,!0,!1),t[r]=Xe(r,!1,!0),o[r]=Xe(r,!0,!0)})),[e,n,t,o]}const[nt,ot,rt,st]=tt();function it(e,t){const n=t?e?st:rt:e?ot:nt;return(t,o,r)=>"__v_isReactive"===o?!e:"__v_isReadonly"===o?e:"__v_raw"===o?t:Reflect.get(N(n,o)&&o in t?n:t,o,r)}const lt={get:it(!1,!1)},ct={get:it(!1,!0)},at={get:it(!0,!1)},ut={get:it(!0,!0)},pt=new WeakMap,ft=new WeakMap,dt=new WeakMap,ht=new WeakMap;function mt(e){return e.__v_skip||!Object.isExtensible(e)?0:function(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}((e=>B(e).slice(8,-1))(e))}function gt(e){return xt(e)?e:bt(e,!1,Le,lt,pt)}function vt(e){return bt(e,!1,Ue,ct,ft)}function yt(e){return bt(e,!0,je,at,dt)}function _t(e){return bt(e,!0,De,ut,ht)}function bt(e,t,n,o,r){if(!M(e))return e;if(e.__v_raw&&(!t||!e.__v_isReactive))return e;const s=r.get(e);if(s)return s;const i=mt(e);if(0===i)return e;const l=new Proxy(e,2===i?o:n);return r.set(e,l),l}function St(e){return xt(e)?St(e.__v_raw):!(!e||!e.__v_isReactive)}function xt(e){return!(!e||!e.__v_isReadonly)}function Ct(e){return!(!e||!e.__v_isShallow)}function kt(e){return St(e)||xt(e)}function wt(e){const t=e&&e.__v_raw;return t?wt(t):e}function Tt(e){return Q(e,"__v_skip",!0),e}const Nt=e=>M(e)?gt(e):e,Et=e=>M(e)?yt(e):e;function $t(e){be&&de&&we((e=wt(e)).dep||(e.dep=le()))}function Ot(e,t){(e=wt(e)).dep&&Ne(e.dep)}function Rt(e){return!(!e||!0!==e.__v_isRef)}function Ft(e){return Pt(e,!1)}function At(e){return Pt(e,!0)}function Pt(e,t){return Rt(e)?e:new Mt(e,t)}class Mt{constructor(e,t){this.__v_isShallow=t,this.dep=void 0,this.__v_isRef=!0,this._rawValue=t?e:wt(e),this._value=t?e:Nt(e)}get value(){return $t(this),this._value}set value(e){const t=this.__v_isShallow||Ct(e)||xt(e);e=t?e:wt(e),Z(e,this._rawValue)&&(this._rawValue=e,this._value=t?e:Nt(e),Ot(this))}}function Vt(e){Ot(e)}function It(e){return Rt(e)?e.value:e}const Bt={get:(e,t,n)=>It(Reflect.get(e,t,n)),set:(e,t,n,o)=>{const r=e[t];return Rt(r)&&!Rt(n)?(r.value=n,!0):Reflect.set(e,t,n,o)}};function Lt(e){return St(e)?e:new Proxy(e,Bt)}class jt{constructor(e){this.dep=void 0,this.__v_isRef=!0;const{get:t,set:n}=e((()=>$t(this)),(()=>Ot(this)));this._get=t,this._set=n}get value(){return this._get()}set value(e){this._set(e)}}function Ut(e){return new jt(e)}function Dt(e){const t=E(e)?new Array(e.length):{};for(const n in e)t[n]=Wt(e,n);return t}class Ht{constructor(e,t,n){this._object=e,this._key=t,this._defaultValue=n,this.__v_isRef=!0}get value(){const e=this._object[this._key];return void 0===e?this._defaultValue:e}set value(e){this._object[this._key]=e}}function Wt(e,t,n){const o=e[t];return Rt(o)?o:new Ht(e,t,n)}var zt;class Kt{constructor(e,t,n,o){this._setter=t,this.dep=void 0,this.__v_isRef=!0,this[zt]=!1,this._dirty=!0,this.effect=new ge(e,(()=>{this._dirty||(this._dirty=!0,Ot(this))})),this.effect.computed=this,this.effect.active=this._cacheable=!o,this.__v_isReadonly=n}get value(){const e=wt(this);return $t(e),!e._dirty&&e._cacheable||(e._dirty=!1,e._value=e.effect.run()),e._value}set value(e){this._setter(e)}}zt="__v_isReadonly";const Gt=[];function qt(e,...t){xe();const n=Gt.length?Gt[Gt.length-1].component:null,o=n&&n.appContext.config.warnHandler,r=function(){let e=Gt[Gt.length-1];if(!e)return[];const t=[];for(;e;){const n=t[0];n&&n.vnode===e?n.recurseCount++:t.push({vnode:e,recurseCount:0});const o=e.component&&e.component.parent;e=o&&o.vnode}return t}();if(o)Yt(o,n,11,[e+t.join(""),n&&n.proxy,r.map((({vnode:e})=>`at <${Vs(n,e.type)}>`)).join("\\n"),r]);else{const n=[`[Vue warn]: ${e}`,...t];r.length&&n.push("\\n",...function(e){const t=[];return e.forEach(((e,n)=>{t.push(...0===n?[]:["\\n"],...function({vnode:e,recurseCount:t}){const n=t>0?`... (${t} recursive calls)`:"",o=` at <${Vs(e.component,e.type,!!e.component&&null==e.component.parent)}`,r=">"+n;return e.props?[o,...Jt(e.props),r]:[o+r]}(e))})),t}(r)),console.warn(...n)}Ce()}function Jt(e){const t=[],n=Object.keys(e);return n.slice(0,3).forEach((n=>{t.push(...Zt(n,e[n]))})),n.length>3&&t.push(" ..."),t}function Zt(e,t,n){return A(t)?(t=JSON.stringify(t),n?t:[`${e}=${t}`]):"number"==typeof t||"boolean"==typeof t||null==t?n?t:[`${e}=${t}`]:Rt(t)?(t=Zt(e,wt(t.value),!0),n?t:[`${e}=Ref<`,t,">"]):F(t)?[`${e}=fn${t.name?`<${t.name}>`:""}`]:(t=wt(t),n?t:[`${e}=`,t])}function Yt(e,t,n,o){let r;try{r=o?e(...o):e()}catch(s){Xt(s,t,n)}return r}function Qt(e,t,n,o){if(F(e)){const r=Yt(e,t,n,o);return r&&V(r)&&r.catch((e=>{Xt(e,t,n)})),r}const r=[];for(let s=0;s<e.length;s++)r.push(Qt(e[s],t,n,o));return r}function Xt(e,t,n,o=!0){if(t){let o=t.parent;const r=t.proxy,s=n;for(;o;){const t=o.ec;if(t)for(let n=0;n<t.length;n++)if(!1===t[n](e,r,s))return;o=o.parent}const i=t.appContext.config.errorHandler;if(i)return void Yt(i,null,10,[e,r,s])}!function(e,t,n,o=!0){console.error(e)}(e,0,0,o)}let en=!1,tn=!1;const nn=[];let on=0;const rn=[];let sn=null,ln=0;const cn=Promise.resolve();let an=null;function un(e){const t=an||cn;return e?t.then(this?e.bind(this):e):t}function pn(e){nn.length&&nn.includes(e,en&&e.allowRecurse?on+1:on)||(null==e.id?nn.push(e):nn.splice(function(e){let t=on+1,n=nn.length;for(;t<n;){const o=t+n>>>1;gn(nn[o])<e?t=o+1:n=o}return t}(e.id),0,e),fn())}function fn(){en||tn||(tn=!0,an=cn.then(yn))}function dn(e){E(e)?rn.push(...e):sn&&sn.includes(e,e.allowRecurse?ln+1:ln)||rn.push(e),fn()}function hn(e,t=(en?on+1:0)){for(;t<nn.length;t++){const e=nn[t];e&&e.pre&&(nn.splice(t,1),t--,e())}}function mn(e){if(rn.length){const e=[...new Set(rn)];if(rn.length=0,sn)return void sn.push(...e);for(sn=e,sn.sort(((e,t)=>gn(e)-gn(t))),ln=0;ln<sn.length;ln++)sn[ln]();sn=null,ln=0}}const gn=e=>null==e.id?1/0:e.id,vn=(e,t)=>{const n=gn(e)-gn(t);if(0===n){if(e.pre&&!t.pre)return-1;if(t.pre&&!e.pre)return 1}return n};function yn(e){tn=!1,en=!0,nn.sort(vn);try{for(on=0;on<nn.length;on++){const e=nn[on];e&&!1!==e.active&&Yt(e,null,14)}}finally{on=0,nn.length=0,mn(),en=!1,an=null,(nn.length||rn.length)&&yn()}}let _n,bn=[];function Sn(e,t){var n,o;if(_n=e,_n)_n.enabled=!0,bn.forEach((({event:e,args:t})=>_n.emit(e,...t))),bn=[];else if("undefined"!=typeof window&&window.HTMLElement&&!(null===(o=null===(n=window.navigator)||void 0===n?void 0:n.userAgent)||void 0===o?void 0:o.includes("jsdom"))){(t.__VUE_DEVTOOLS_HOOK_REPLAY__=t.__VUE_DEVTOOLS_HOOK_REPLAY__||[]).push((e=>{Sn(e,t)})),setTimeout((()=>{_n||(t.__VUE_DEVTOOLS_HOOK_REPLAY__=null,bn=[])}),3e3)}else bn=[]}function xn(e,t,...n){if(e.isUnmounted)return;const o=e.vnode.props||v;let r=n;const s=t.startsWith("update:"),i=s&&t.slice(7);if(i&&i in o){const e=`${"modelValue"===i?"model":i}Modifiers`,{number:t,trim:s}=o[e]||v;s&&(r=n.map((e=>e.trim()))),t&&(r=n.map(X))}let l,c=o[l=J(t)]||o[l=J(z(t))];!c&&s&&(c=o[l=J(G(t))]),c&&Qt(c,e,6,r);const a=o[l+"Once"];if(a){if(e.emitted){if(e.emitted[l])return}else e.emitted={};e.emitted[l]=!0,Qt(a,e,6,r)}}function Cn(e,t,n=!1){const o=t.emitsCache,r=o.get(e);if(void 0!==r)return r;const s=e.emits;let i={},l=!1;if(!F(e)){const o=e=>{const n=Cn(e,t,!0);n&&(l=!0,k(i,n))};!n&&t.mixins.length&&t.mixins.forEach(o),e.extends&&o(e.extends),e.mixins&&e.mixins.forEach(o)}return s||l?(E(s)?s.forEach((e=>i[e]=null)):k(i,s),M(e)&&o.set(e,i),i):(M(e)&&o.set(e,null),null)}function kn(e,t){return!(!e||!x(t))&&(t=t.slice(2).replace(/Once$/,""),N(e,t[0].toLowerCase()+t.slice(1))||N(e,G(t))||N(e,t))}let wn=null,Tn=null;function Nn(e){const t=wn;return wn=e,Tn=e&&e.type.__scopeId||null,t}function En(e){Tn=e}function $n(){Tn=null}const On=e=>Rn;function Rn(e,t=wn,n){if(!t)return e;if(e._n)return e;const o=(...n)=>{o._d&&Zr(-1);const r=Nn(t);let s;try{s=e(...n)}finally{Nn(r),o._d&&Zr(1)}return s};return o._n=!0,o._c=!0,o._d=!0,o}function Fn(e){const{type:t,vnode:n,proxy:o,withProxy:r,props:s,propsOptions:[i],slots:l,attrs:c,emit:a,render:u,renderCache:p,data:f,setupState:d,ctx:h,inheritAttrs:m}=e;let g,v;const y=Nn(e);try{if(4&n.shapeFlag){const e=r||o;g=ds(u.call(e,e,p,s,d,f,h)),v=c}else{const e=t;0,g=ds(e(s,e.length>1?{attrs:c,slots:l,emit:a}:null)),v=t.props?c:An(c)}}catch(b){zr.length=0,Xt(b,e,1),g=ls(Hr)}let _=g;if(v&&!1!==m){const e=Object.keys(v),{shapeFlag:t}=_;e.length&&7&t&&(i&&e.some(C)&&(v=Pn(v,i)),_=as(_,v))}return n.dirs&&(_=as(_),_.dirs=_.dirs?_.dirs.concat(n.dirs):n.dirs),n.transition&&(_.transition=n.transition),g=_,Nn(y),g}const An=e=>{let t;for(const n in e)("class"===n||"style"===n||x(n))&&((t||(t={}))[n]=e[n]);return t},Pn=(e,t)=>{const n={};for(const o in e)C(o)&&o.slice(9)in t||(n[o]=e[o]);return n};function Mn(e,t,n){const o=Object.keys(t);if(o.length!==Object.keys(e).length)return!0;for(let r=0;r<o.length;r++){const s=o[r];if(t[s]!==e[s]&&!kn(n,s))return!0}return!1}function Vn({vnode:e,parent:t},n){for(;t&&t.subTree===e;)(e=t.vnode).el=n,t=t.parent}const In=e=>e.__isSuspense,Bn={name:"Suspense",__isSuspense:!0,process(e,t,n,o,r,s,i,l,c,a){null==e?function(e,t,n,o,r,s,i,l,c){const{p:a,o:{createElement:u}}=c,p=u("div"),f=e.suspense=jn(e,r,o,t,p,n,s,i,l,c);a(null,f.pendingBranch=e.ssContent,p,null,o,f,s,i),f.deps>0?(Ln(e,"onPending"),Ln(e,"onFallback"),a(null,e.ssFallback,t,n,o,null,s,i),Hn(f,e.ssFallback)):f.resolve()}(t,n,o,r,s,i,l,c,a):function(e,t,n,o,r,s,i,l,{p:c,um:a,o:{createElement:u}}){const p=t.suspense=e.suspense;p.vnode=t,t.el=e.el;const f=t.ssContent,d=t.ssFallback,{activeBranch:h,pendingBranch:m,isInFallback:g,isHydrating:v}=p;if(m)p.pendingBranch=f,ts(f,m)?(c(m,f,p.hiddenContainer,null,r,p,s,i,l),p.deps<=0?p.resolve():g&&(c(h,d,n,o,r,null,s,i,l),Hn(p,d))):(p.pendingId++,v?(p.isHydrating=!1,p.activeBranch=m):a(m,r,p),p.deps=0,p.effects.length=0,p.hiddenContainer=u("div"),g?(c(null,f,p.hiddenContainer,null,r,p,s,i,l),p.deps<=0?p.resolve():(c(h,d,n,o,r,null,s,i,l),Hn(p,d))):h&&ts(f,h)?(c(h,f,n,o,r,p,s,i,l),p.resolve(!0)):(c(null,f,p.hiddenContainer,null,r,p,s,i,l),p.deps<=0&&p.resolve()));else if(h&&ts(f,h))c(h,f,n,o,r,p,s,i,l),Hn(p,f);else if(Ln(t,"onPending"),p.pendingBranch=f,p.pendingId++,c(null,f,p.hiddenContainer,null,r,p,s,i,l),p.deps<=0)p.resolve();else{const{timeout:e,pendingId:t}=p;e>0?setTimeout((()=>{p.pendingId===t&&p.fallback(d)}),e):0===e&&p.fallback(d)}}(e,t,n,o,r,i,l,c,a)},hydrate:function(e,t,n,o,r,s,i,l,c){const a=t.suspense=jn(t,o,n,e.parentNode,document.createElement("div"),null,r,s,i,l,!0),u=c(e,a.pendingBranch=t.ssContent,n,a,s,i);0===a.deps&&a.resolve();return u},create:jn,normalize:function(e){const{shapeFlag:t,children:n}=e,o=32&t;e.ssContent=Un(o?n.default:n),e.ssFallback=o?Un(n.fallback):ls(Hr)}};function Ln(e,t){const n=e.props&&e.props[t];F(n)&&n()}function jn(e,t,n,o,r,s,i,l,c,a,u=!1){const{p:p,m:f,um:d,n:h,o:{parentNode:m,remove:g}}=a,v=X(e.props&&e.props.timeout),y={vnode:e,parent:t,parentComponent:n,isSVG:i,container:o,hiddenContainer:r,anchor:s,deps:0,pendingId:0,timeout:"number"==typeof v?v:-1,activeBranch:null,pendingBranch:null,isInFallback:!0,isHydrating:u,isUnmounted:!1,effects:[],resolve(e=!1){const{vnode:t,activeBranch:n,pendingBranch:o,pendingId:r,effects:s,parentComponent:i,container:l}=y;if(y.isHydrating)y.isHydrating=!1;else if(!e){const e=n&&o.transition&&"out-in"===o.transition.mode;e&&(n.transition.afterLeave=()=>{r===y.pendingId&&f(o,l,t,0)});let{anchor:t}=y;n&&(t=h(n),d(n,i,y,!0)),e||f(o,l,t,0)}Hn(y,o),y.pendingBranch=null,y.isInFallback=!1;let c=y.parent,a=!1;for(;c;){if(c.pendingBranch){c.effects.push(...s),a=!0;break}c=c.parent}a||dn(s),y.effects=[],Ln(t,"onResolve")},fallback(e){if(!y.pendingBranch)return;const{vnode:t,activeBranch:n,parentComponent:o,container:r,isSVG:s}=y;Ln(t,"onFallback");const i=h(n),a=()=>{y.isInFallback&&(p(null,e,r,i,o,null,s,l,c),Hn(y,e))},u=e.transition&&"out-in"===e.transition.mode;u&&(n.transition.afterLeave=a),y.isInFallback=!0,d(n,o,null,!0),u||a()},move(e,t,n){y.activeBranch&&f(y.activeBranch,e,t,n),y.container=e},next:()=>y.activeBranch&&h(y.activeBranch),registerDep(e,t){const n=!!y.pendingBranch;n&&y.deps++;const o=e.vnode.el;e.asyncDep.catch((t=>{Xt(t,e,0)})).then((r=>{if(e.isUnmounted||y.isUnmounted||y.pendingId!==e.suspenseId)return;e.asyncResolved=!0;const{vnode:s}=e;Es(e,r,!1),o&&(s.el=o);const l=!o&&e.subTree.el;t(e,s,m(o||e.subTree.el),o?null:h(e.subTree),y,i,c),l&&g(l),Vn(e,s.el),n&&0==--y.deps&&y.resolve()}))},unmount(e,t){y.isUnmounted=!0,y.activeBranch&&d(y.activeBranch,n,e,t),y.pendingBranch&&d(y.pendingBranch,n,e,t)}};return y}function Un(e){let t;if(F(e)){const n=Jr&&e._c;n&&(e._d=!1,Gr()),e=e(),n&&(e._d=!0,t=Kr,qr())}if(E(e)){const t=function(e){let t;for(let n=0;n<e.length;n++){const o=e[n];if(!es(o))return;if(o.type!==Hr||"v-if"===o.children){if(t)return;t=o}}return t}(e);e=t}return e=ds(e),t&&!e.dynamicChildren&&(e.dynamicChildren=t.filter((t=>t!==e))),e}function Dn(e,t){t&&t.pendingBranch?E(e)?t.effects.push(...e):t.effects.push(e):dn(e)}function Hn(e,t){e.activeBranch=t;const{vnode:n,parentComponent:o}=e,r=n.el=t.el;o&&o.subTree===n&&(o.vnode.el=r,Vn(o,r))}function Wn(e,t){if(bs){let n=bs.provides;const o=bs.parent&&bs.parent.provides;o===n&&(n=bs.provides=Object.create(o)),n[e]=t}else;}function zn(e,t,n=!1){const o=bs||wn;if(o){const r=null==o.parent?o.vnode.appContext&&o.vnode.appContext.provides:o.parent.provides;if(r&&e in r)return r[e];if(arguments.length>1)return n&&F(t)?t.call(o.proxy):t}}function Kn(e,t){return Yn(e,null,t)}function Gn(e,t){return Yn(e,null,{flush:"post"})}function qn(e,t){return Yn(e,null,{flush:"sync"})}const Jn={};function Zn(e,t,n){return Yn(e,t,n)}function Yn(e,t,{immediate:n,deep:o,flush:r}=v){const s=bs;let i,l,c=!1,a=!1;if(Rt(e)?(i=()=>e.value,c=Ct(e)):St(e)?(i=()=>e,o=!0):E(e)?(a=!0,c=e.some((e=>St(e)||Ct(e))),i=()=>e.map((e=>Rt(e)?e.value:St(e)?eo(e):F(e)?Yt(e,s,2):void 0))):i=F(e)?t?()=>Yt(e,s,2):()=>{if(!s||!s.isUnmounted)return l&&l(),Qt(e,s,3,[u])}:_,t&&o){const e=i;i=()=>eo(e())}let u=e=>{l=h.onStop=()=>{Yt(e,s,4)}},p=a?[]:Jn;const f=()=>{if(h.active)if(t){const e=h.run();(o||c||(a?e.some(((e,t)=>Z(e,p[t]))):Z(e,p)))&&(l&&l(),Qt(t,s,3,[e,p===Jn?void 0:p,u]),p=e)}else h.run()};let d;f.allowRecurse=!!t,"sync"===r?d=f:"post"===r?d=()=>Or(f,s&&s.suspense):(f.pre=!0,s&&(f.id=s.uid),d=()=>pn(f));const h=new ge(i,d);return t?n?f():p=h.run():"post"===r?Or(h.run.bind(h),s&&s.suspense):h.run(),()=>{h.stop(),s&&s.scope&&w(s.scope.effects,h)}}function Qn(e,t,n){const o=this.proxy,r=A(e)?e.includes(".")?Xn(o,e):()=>o[e]:e.bind(o,o);let s;F(t)?s=t:(s=t.handler,n=t);const i=bs;xs(this);const l=Yn(r,s.bind(o),n);return i?xs(i):Cs(),l}function Xn(e,t){const n=t.split(".");return()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}function eo(e,t){if(!M(e)||e.__v_skip)return e;if((t=t||new Set).has(e))return e;if(t.add(e),Rt(e))eo(e.value,t);else if(E(e))for(let n=0;n<e.length;n++)eo(e[n],t);else if(O(e)||$(e))e.forEach((e=>{eo(e,t)}));else if(L(e))for(const n in e)eo(e[n],t);return e}function to(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return No((()=>{e.isMounted=!0})),Oo((()=>{e.isUnmounting=!0})),e}const no=[Function,Array],oo={name:"BaseTransition",props:{mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:no,onEnter:no,onAfterEnter:no,onEnterCancelled:no,onBeforeLeave:no,onLeave:no,onAfterLeave:no,onLeaveCancelled:no,onBeforeAppear:no,onAppear:no,onAfterAppear:no,onAppearCancelled:no},setup(e,{slots:t}){const n=Ss(),o=to();let r;return()=>{const s=t.default&&ao(t.default(),!0);if(!s||!s.length)return;let i=s[0];if(s.length>1)for(const e of s)if(e.type!==Hr){i=e;break}const l=wt(e),{mode:c}=l;if(o.isLeaving)return io(i);const a=lo(i);if(!a)return io(i);const u=so(a,l,o,n);co(a,u);const p=n.subTree,f=p&&lo(p);let d=!1;const{getTransitionKey:h}=a.type;if(h){const e=h();void 0===r?r=e:e!==r&&(r=e,d=!0)}if(f&&f.type!==Hr&&(!ts(a,f)||d)){const e=so(f,l,o,n);if(co(f,e),"out-in"===c)return o.isLeaving=!0,e.afterLeave=()=>{o.isLeaving=!1,n.update()},io(i);"in-out"===c&&a.type!==Hr&&(e.delayLeave=(e,t,n)=>{ro(o,f)[String(f.key)]=f,e._leaveCb=()=>{t(),e._leaveCb=void 0,delete u.delayedLeave},u.delayedLeave=n})}return i}}};function ro(e,t){const{leavingVNodes:n}=e;let o=n.get(t.type);return o||(o=Object.create(null),n.set(t.type,o)),o}function so(e,t,n,o){const{appear:r,mode:s,persisted:i=!1,onBeforeEnter:l,onEnter:c,onAfterEnter:a,onEnterCancelled:u,onBeforeLeave:p,onLeave:f,onAfterLeave:d,onLeaveCancelled:h,onBeforeAppear:m,onAppear:g,onAfterAppear:v,onAppearCancelled:y}=t,_=String(e.key),b=ro(n,e),S=(e,t)=>{e&&Qt(e,o,9,t)},x=(e,t)=>{const n=t[1];S(e,t),E(e)?e.every((e=>e.length<=1))&&n():e.length<=1&&n()},C={mode:s,persisted:i,beforeEnter(t){let o=l;if(!n.isMounted){if(!r)return;o=m||l}t._leaveCb&&t._leaveCb(!0);const s=b[_];s&&ts(e,s)&&s.el._leaveCb&&s.el._leaveCb(),S(o,[t])},enter(e){let t=c,o=a,s=u;if(!n.isMounted){if(!r)return;t=g||c,o=v||a,s=y||u}let i=!1;const l=e._enterCb=t=>{i||(i=!0,S(t?s:o,[e]),C.delayedLeave&&C.delayedLeave(),e._enterCb=void 0)};t?x(t,[e,l]):l()},leave(t,o){const r=String(e.key);if(t._enterCb&&t._enterCb(!0),n.isUnmounting)return o();S(p,[t]);let s=!1;const i=t._leaveCb=n=>{s||(s=!0,o(),S(n?h:d,[t]),t._leaveCb=void 0,b[r]===e&&delete b[r])};b[r]=e,f?x(f,[t,i]):i()},clone:e=>so(e,t,n,o)};return C}function io(e){if(mo(e))return(e=as(e)).children=null,e}function lo(e){return mo(e)?e.children?e.children[0]:void 0:e}function co(e,t){6&e.shapeFlag&&e.component?co(e.component.subTree,t):128&e.shapeFlag?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function ao(e,t=!1,n){let o=[],r=0;for(let s=0;s<e.length;s++){let i=e[s];const l=null==n?i.key:String(n)+String(null!=i.key?i.key:s);i.type===Ur?(128&i.patchFlag&&r++,o=o.concat(ao(i.children,t,l))):(t||i.type!==Hr)&&o.push(null!=l?as(i,{key:l}):i)}if(r>1)for(let s=0;s<o.length;s++)o[s].patchFlag=-2;return o}function uo(e){return F(e)?{setup:e,name:e.name}:e}const po=e=>!!e.type.__asyncLoader;function fo(e){F(e)&&(e={loader:e});const{loader:t,loadingComponent:n,errorComponent:o,delay:r=200,timeout:s,suspensible:i=!0,onError:l}=e;let c,a=null,u=0;const p=()=>{let e;return a||(e=a=t().catch((e=>{if(e=e instanceof Error?e:new Error(String(e)),l)return new Promise(((t,n)=>{l(e,(()=>t((u++,a=null,p()))),(()=>n(e)),u+1)}));throw e})).then((t=>e!==a&&a?a:(t&&(t.__esModule||"Module"===t[Symbol.toStringTag])&&(t=t.default),c=t,t))))};return uo({name:"AsyncComponentWrapper",__asyncLoader:p,get __asyncResolved(){return c},setup(){const e=bs;if(c)return()=>ho(c,e);const t=t=>{a=null,Xt(t,e,13,!o)};if(i&&e.suspense)return p().then((t=>()=>ho(t,e))).catch((e=>(t(e),()=>o?ls(o,{error:e}):null)));const l=Ft(!1),u=Ft(),f=Ft(!!r);return r&&setTimeout((()=>{f.value=!1}),r),null!=s&&setTimeout((()=>{if(!l.value&&!u.value){const e=new Error(`Async component timed out after ${s}ms.`);t(e),u.value=e}}),s),p().then((()=>{l.value=!0,e.parent&&mo(e.parent.vnode)&&pn(e.parent.update)})).catch((e=>{t(e),u.value=e})),()=>l.value&&c?ho(c,e):u.value&&o?ls(o,{error:u.value}):n&&!f.value?ls(n):void 0}})}function ho(e,{vnode:{ref:t,props:n,children:o}}){const r=ls(e,n,o);return r.ref=t,r}const mo=e=>e.type.__isKeepAlive,go={name:"KeepAlive",__isKeepAlive:!0,props:{include:[String,RegExp,Array],exclude:[String,RegExp,Array],max:[String,Number]},setup(e,{slots:t}){const n=Ss(),o=n.ctx,r=new Map,s=new Set;let i=null;const l=n.suspense,{renderer:{p:c,m:a,um:u,o:{createElement:p}}}=o,f=p("div");function d(e){xo(e),u(e,n,l,!0)}function h(e){r.forEach(((t,n)=>{const o=Ms(t.type);!o||e&&e(o)||m(n)}))}function m(e){const t=r.get(e);i&&t.type===i.type?i&&xo(i):d(t),r.delete(e),s.delete(e)}o.activate=(e,t,n,o,r)=>{const s=e.component;a(e,t,n,0,l),c(s.vnode,e,t,n,s,l,o,e.slotScopeIds,r),Or((()=>{s.isDeactivated=!1,s.a&&Y(s.a);const t=e.props&&e.props.onVnodeMounted;t&&vs(t,s.parent,e)}),l)},o.deactivate=e=>{const t=e.component;a(e,f,null,1,l),Or((()=>{t.da&&Y(t.da);const n=e.props&&e.props.onVnodeUnmounted;n&&vs(n,t.parent,e),t.isDeactivated=!0}),l)},Zn((()=>[e.include,e.exclude]),(([e,t])=>{e&&h((t=>vo(e,t))),t&&h((e=>!vo(t,e)))}),{flush:"post",deep:!0});let g=null;const v=()=>{null!=g&&r.set(g,Co(n.subTree))};return No(v),$o(v),Oo((()=>{r.forEach((e=>{const{subTree:t,suspense:o}=n,r=Co(t);if(e.type!==r.type)d(e);else{xo(r);const e=r.component.da;e&&Or(e,o)}}))})),()=>{if(g=null,!t.default)return null;const n=t.default(),o=n[0];if(n.length>1)return i=null,n;if(!(es(o)&&(4&o.shapeFlag||128&o.shapeFlag)))return i=null,o;let l=Co(o);const c=l.type,a=Ms(po(l)?l.type.__asyncResolved||{}:c),{include:u,exclude:p,max:f}=e;if(u&&(!a||!vo(u,a))||p&&a&&vo(p,a))return i=l,o;const d=null==l.key?c:l.key,h=r.get(d);return l.el&&(l=as(l),128&o.shapeFlag&&(o.ssContent=l)),g=d,h?(l.el=h.el,l.component=h.component,l.transition&&co(l,l.transition),l.shapeFlag|=512,s.delete(d),s.add(d)):(s.add(d),f&&s.size>parseInt(f,10)&&m(s.values().next().value)),l.shapeFlag|=256,i=l,In(o.type)?o:l}}};function vo(e,t){return E(e)?e.some((e=>vo(e,t))):A(e)?e.split(",").includes(t):!!e.test&&e.test(t)}function yo(e,t){bo(e,"a",t)}function _o(e,t){bo(e,"da",t)}function bo(e,t,n=bs){const o=e.__wdc||(e.__wdc=()=>{let t=n;for(;t;){if(t.isDeactivated)return;t=t.parent}return e()});if(ko(t,o,n),n){let e=n.parent;for(;e&&e.parent;)mo(e.parent.vnode)&&So(o,t,n,e),e=e.parent}}function So(e,t,n,o){const r=ko(t,e,o,!0);Ro((()=>{w(o[t],r)}),n)}function xo(e){let t=e.shapeFlag;256&t&&(t-=256),512&t&&(t-=512),e.shapeFlag=t}function Co(e){return 128&e.shapeFlag?e.ssContent:e}function ko(e,t,n=bs,o=!1){if(n){const r=n[e]||(n[e]=[]),s=t.__weh||(t.__weh=(...o)=>{if(n.isUnmounted)return;xe(),xs(n);const r=Qt(t,n,e,o);return Cs(),Ce(),r});return o?r.unshift(s):r.push(s),s}}const wo=e=>(t,n=bs)=>(!Ns||"sp"===e)&&ko(e,((...e)=>t(...e)),n),To=wo("bm"),No=wo("m"),Eo=wo("bu"),$o=wo("u"),Oo=wo("bum"),Ro=wo("um"),Fo=wo("sp"),Ao=wo("rtg"),Po=wo("rtc");function Mo(e,t=bs){ko("ec",e,t)}function Vo(e,t){const n=wn;if(null===n)return e;const o=As(n)||n.proxy,r=e.dirs||(e.dirs=[]);for(let s=0;s<t.length;s++){let[e,n,i,l=v]=t[s];F(e)&&(e={mounted:e,updated:e}),e.deep&&eo(n),r.push({dir:e,instance:o,value:n,oldValue:void 0,arg:i,modifiers:l})}return e}function Io(e,t,n,o){const r=e.dirs,s=t&&t.dirs;for(let i=0;i<r.length;i++){const l=r[i];s&&(l.oldValue=s[i].value);let c=l.dir[o];c&&(xe(),Qt(c,n,8,[e.el,l,e,t]),Ce())}}function Bo(e,t){return Do("components",e,!0,t)||e}const Lo=Symbol();function jo(e){return A(e)?Do("components",e,!1)||e:e||Lo}function Uo(e){return Do("directives",e)}function Do(e,t,n=!0,o=!1){const r=wn||bs;if(r){const n=r.type;if("components"===e){const e=Ms(n,!1);if(e&&(e===t||e===z(t)||e===q(z(t))))return n}const s=Ho(r[e]||n[e],t)||Ho(r.appContext[e],t);return!s&&o?n:s}}function Ho(e,t){return e&&(e[t]||e[z(t)]||e[q(z(t))])}function Wo(e,t,n,o){let r;const s=n&&n[o];if(E(e)||A(e)){r=new Array(e.length);for(let n=0,o=e.length;n<o;n++)r[n]=t(e[n],n,void 0,s&&s[n])}else if("number"==typeof e){r=new Array(e);for(let n=0;n<e;n++)r[n]=t(n+1,n,void 0,s&&s[n])}else if(M(e))if(e[Symbol.iterator])r=Array.from(e,((e,n)=>t(e,n,void 0,s&&s[n])));else{const n=Object.keys(e);r=new Array(n.length);for(let o=0,i=n.length;o<i;o++){const i=n[o];r[o]=t(e[i],i,o,s&&s[o])}}else r=[];return n&&(n[o]=r),r}function zo(e,t){for(let n=0;n<t.length;n++){const o=t[n];if(E(o))for(let t=0;t<o.length;t++)e[o[t].name]=o[t].fn;else o&&(e[o.name]=o.key?(...e)=>{const t=o.fn(...e);return t&&(t.key=o.key),t}:o.fn)}return e}function Ko(e,t,n={},o,r){if(wn.isCE||wn.parent&&po(wn.parent)&&wn.parent.isCE)return ls("slot","default"===t?null:{name:t},o&&o());let s=e[t];s&&s._c&&(s._d=!1),Gr();const i=s&&Go(s(n)),l=Xr(Ur,{key:n.key||i&&i.key||`_${t}`},i||(o?o():[]),i&&1===e._?64:-2);return!r&&l.scopeId&&(l.slotScopeIds=[l.scopeId+"-s"]),s&&s._c&&(s._d=!0),l}function Go(e){return e.some((e=>!es(e)||e.type!==Hr&&!(e.type===Ur&&!Go(e.children))))?e:null}function qo(e,t){const n={};for(const o in e)n[t&&/[A-Z]/.test(o)?`on:${o}`:J(o)]=e[o];return n}const Jo=e=>e?ks(e)?As(e)||e.proxy:Jo(e.parent):null,Zo=k(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>Jo(e.parent),$root:e=>Jo(e.root),$emit:e=>e.emit,$options:e=>or(e),$forceUpdate:e=>e.f||(e.f=()=>pn(e.update)),$nextTick:e=>e.n||(e.n=un.bind(e.proxy)),$watch:e=>Qn.bind(e)}),Yo={get({_:e},t){const{ctx:n,setupState:o,data:r,props:s,accessCache:i,type:l,appContext:c}=e;let a;if("$"!==t[0]){const l=i[t];if(void 0!==l)switch(l){case 1:return o[t];case 2:return r[t];case 4:return n[t];case 3:return s[t]}else{if(o!==v&&N(o,t))return i[t]=1,o[t];if(r!==v&&N(r,t))return i[t]=2,r[t];if((a=e.propsOptions[0])&&N(a,t))return i[t]=3,s[t];if(n!==v&&N(n,t))return i[t]=4,n[t];Xo&&(i[t]=0)}}const u=Zo[t];let p,f;return u?("$attrs"===t&&ke(e,0,t),u(e)):(p=l.__cssModules)&&(p=p[t])?p:n!==v&&N(n,t)?(i[t]=4,n[t]):(f=c.config.globalProperties,N(f,t)?f[t]:void 0)},set({_:e},t,n){const{data:o,setupState:r,ctx:s}=e;return r!==v&&N(r,t)?(r[t]=n,!0):o!==v&&N(o,t)?(o[t]=n,!0):!N(e.props,t)&&(("$"!==t[0]||!(t.slice(1)in e))&&(s[t]=n,!0))},has({_:{data:e,setupState:t,accessCache:n,ctx:o,appContext:r,propsOptions:s}},i){let l;return!!n[i]||e!==v&&N(e,i)||t!==v&&N(t,i)||(l=s[0])&&N(l,i)||N(o,i)||N(Zo,i)||N(r.config.globalProperties,i)},defineProperty(e,t,n){return null!=n.get?e._.accessCache[t]=0:N(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}},Qo=k({},Yo,{get(e,t){if(t!==Symbol.unscopables)return Yo.get(e,t,e)},has:(e,n)=>"_"!==n[0]&&!t(n)});let Xo=!0;function er(e){const t=or(e),n=e.proxy,o=e.ctx;Xo=!1,t.beforeCreate&&tr(t.beforeCreate,e,"bc");const{data:r,computed:s,methods:i,watch:l,provide:c,inject:a,created:u,beforeMount:p,mounted:f,beforeUpdate:d,updated:h,activated:m,deactivated:g,beforeUnmount:v,unmounted:y,render:b,renderTracked:S,renderTriggered:x,errorCaptured:C,serverPrefetch:k,expose:w,inheritAttrs:T,components:N,directives:$}=t;if(a&&function(e,t,n=_,o=!1){E(e)&&(e=lr(e));for(const r in e){const n=e[r];let s;s=M(n)?"default"in n?zn(n.from||r,n.default,!0):zn(n.from||r):zn(n),Rt(s)&&o?Object.defineProperty(t,r,{enumerable:!0,configurable:!0,get:()=>s.value,set:e=>s.value=e}):t[r]=s}}(a,o,null,e.appContext.config.unwrapInjectedRef),i)for(const _ in i){const e=i[_];F(e)&&(o[_]=e.bind(n))}if(r){const t=r.call(n,n);M(t)&&(e.data=gt(t))}if(Xo=!0,s)for(const E in s){const e=s[E],t=F(e)?e.bind(n,n):F(e.get)?e.get.bind(n,n):_,r=!F(e)&&F(e.set)?e.set.bind(n):_,i=Is({get:t,set:r});Object.defineProperty(o,E,{enumerable:!0,configurable:!0,get:()=>i.value,set:e=>i.value=e})}if(l)for(const _ in l)nr(l[_],o,n,_);if(c){const e=F(c)?c.call(n):c;Reflect.ownKeys(e).forEach((t=>{Wn(t,e[t])}))}function O(e,t){E(t)?t.forEach((t=>e(t.bind(n)))):t&&e(t.bind(n))}if(u&&tr(u,e,"c"),O(To,p),O(No,f),O(Eo,d),O($o,h),O(yo,m),O(_o,g),O(Mo,C),O(Po,S),O(Ao,x),O(Oo,v),O(Ro,y),O(Fo,k),E(w))if(w.length){const t=e.exposed||(e.exposed={});w.forEach((e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t})}))}else e.exposed||(e.exposed={});b&&e.render===_&&(e.render=b),null!=T&&(e.inheritAttrs=T),N&&(e.components=N),$&&(e.directives=$)}function tr(e,t,n){Qt(E(e)?e.map((e=>e.bind(t.proxy))):e.bind(t.proxy),t,n)}function nr(e,t,n,o){const r=o.includes(".")?Xn(n,o):()=>n[o];if(A(e)){const n=t[e];F(n)&&Zn(r,n)}else if(F(e))Zn(r,e.bind(n));else if(M(e))if(E(e))e.forEach((e=>nr(e,t,n,o)));else{const o=F(e.handler)?e.handler.bind(n):t[e.handler];F(o)&&Zn(r,o,e)}}function or(e){const t=e.type,{mixins:n,extends:o}=t,{mixins:r,optionsCache:s,config:{optionMergeStrategies:i}}=e.appContext,l=s.get(t);let c;return l?c=l:r.length||n||o?(c={},r.length&&r.forEach((e=>rr(c,e,i,!0))),rr(c,t,i)):c=t,M(t)&&s.set(t,c),c}function rr(e,t,n,o=!1){const{mixins:r,extends:s}=t;s&&rr(e,s,n,!0),r&&r.forEach((t=>rr(e,t,n,!0)));for(const i in t)if(o&&"expose"===i);else{const o=sr[i]||n&&n[i];e[i]=o?o(e[i],t[i]):t[i]}return e}const sr={data:ir,props:ar,emits:ar,methods:ar,computed:ar,beforeCreate:cr,created:cr,beforeMount:cr,mounted:cr,beforeUpdate:cr,updated:cr,beforeDestroy:cr,beforeUnmount:cr,destroyed:cr,unmounted:cr,activated:cr,deactivated:cr,errorCaptured:cr,serverPrefetch:cr,components:ar,directives:ar,watch:function(e,t){if(!e)return t;if(!t)return e;const n=k(Object.create(null),e);for(const o in t)n[o]=cr(e[o],t[o]);return n},provide:ir,inject:function(e,t){return ar(lr(e),lr(t))}};function ir(e,t){return t?e?function(){return k(F(e)?e.call(this,this):e,F(t)?t.call(this,this):t)}:t:e}function lr(e){if(E(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function cr(e,t){return e?[...new Set([].concat(e,t))]:t}function ar(e,t){return e?k(k(Object.create(null),e),t):t}function ur(e,t,n,o){const[r,s]=e.propsOptions;let i,l=!1;if(t)for(let c in t){if(U(c))continue;const a=t[c];let u;r&&N(r,u=z(c))?s&&s.includes(u)?(i||(i={}))[u]=a:n[u]=a:kn(e.emitsOptions,c)||c in o&&a===o[c]||(o[c]=a,l=!0)}if(s){const t=wt(n),o=i||v;for(let i=0;i<s.length;i++){const l=s[i];n[l]=pr(r,t,l,o[l],e,!N(o,l))}}return l}function pr(e,t,n,o,r,s){const i=e[n];if(null!=i){const e=N(i,"default");if(e&&void 0===o){const e=i.default;if(i.type!==Function&&F(e)){const{propsDefaults:s}=r;n in s?o=s[n]:(xs(r),o=s[n]=e.call(null,t),Cs())}else o=e}i[0]&&(s&&!e?o=!1:!i[1]||""!==o&&o!==G(n)||(o=!0))}return o}function fr(e,t,n=!1){const o=t.propsCache,r=o.get(e);if(r)return r;const s=e.props,i={},l=[];let c=!1;if(!F(e)){const o=e=>{c=!0;const[n,o]=fr(e,t,!0);k(i,n),o&&l.push(...o)};!n&&t.mixins.length&&t.mixins.forEach(o),e.extends&&o(e.extends),e.mixins&&e.mixins.forEach(o)}if(!s&&!c)return M(e)&&o.set(e,y),y;if(E(s))for(let u=0;u<s.length;u++){const e=z(s[u]);dr(e)&&(i[e]=v)}else if(s)for(const u in s){const e=z(u);if(dr(e)){const t=s[u],n=i[e]=E(t)||F(t)?{type:t}:t;if(n){const t=gr(Boolean,n.type),o=gr(String,n.type);n[0]=t>-1,n[1]=o<0||t<o,(t>-1||N(n,"default"))&&l.push(e)}}}const a=[i,l];return M(e)&&o.set(e,a),a}function dr(e){return"$"!==e[0]}function hr(e){const t=e&&e.toString().match(/^\\s*function (\\w+)/);return t?t[1]:null===e?"null":""}function mr(e,t){return hr(e)===hr(t)}function gr(e,t){return E(t)?t.findIndex((t=>mr(t,e))):F(t)&&mr(t,e)?0:-1}const vr=e=>"_"===e[0]||"$stable"===e,yr=e=>E(e)?e.map(ds):[ds(e)],_r=(e,t,n)=>{if(t._n)return t;const o=Rn(((...e)=>yr(t(...e))),n);return o._c=!1,o},br=(e,t,n)=>{const o=e._ctx;for(const r in e){if(vr(r))continue;const n=e[r];if(F(n))t[r]=_r(0,n,o);else if(null!=n){const e=yr(n);t[r]=()=>e}}},Sr=(e,t)=>{const n=yr(t);e.slots.default=()=>n};function xr(){return{app:null,config:{isNativeTag:b,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Cr=0;function kr(e,t){return function(n,o=null){F(n)||(n=Object.assign({},n)),null==o||M(o)||(o=null);const r=xr(),s=new Set;let i=!1;const l=r.app={_uid:Cr++,_component:n,_props:o,_container:null,_context:r,_instance:null,version:ei,get config(){return r.config},set config(e){},use:(e,...t)=>(s.has(e)||(e&&F(e.install)?(s.add(e),e.install(l,...t)):F(e)&&(s.add(e),e(l,...t))),l),mixin:e=>(r.mixins.includes(e)||r.mixins.push(e),l),component:(e,t)=>t?(r.components[e]=t,l):r.components[e],directive:(e,t)=>t?(r.directives[e]=t,l):r.directives[e],mount(s,c,a){if(!i){const u=ls(n,o);return u.appContext=r,c&&t?t(u,s):e(u,s,a),i=!0,l._container=s,s.__vue_app__=l,As(u.component)||u.component.proxy}},unmount(){i&&(e(null,l._container),delete l._container.__vue_app__)},provide:(e,t)=>(r.provides[e]=t,l)};return l}}function wr(e,t,n,o,r=!1){if(E(e))return void e.forEach(((e,s)=>wr(e,t&&(E(t)?t[s]:t),n,o,r)));if(po(o)&&!r)return;const s=4&o.shapeFlag?As(o.component)||o.component.proxy:o.el,i=r?null:s,{i:l,r:c}=e,a=t&&t.r,u=l.refs===v?l.refs={}:l.refs,p=l.setupState;if(null!=a&&a!==c&&(A(a)?(u[a]=null,N(p,a)&&(p[a]=null)):Rt(a)&&(a.value=null)),F(c))Yt(c,l,12,[i,u]);else{const t=A(c),o=Rt(c);if(t||o){const l=()=>{if(e.f){const n=t?N(p,c)?p[c]:u[c]:c.value;r?E(n)&&w(n,s):E(n)?n.includes(s)||n.push(s):t?(u[c]=[s],N(p,c)&&(p[c]=u[c])):(c.value=[s],e.k&&(u[e.k]=c.value))}else t?(u[c]=i,N(p,c)&&(p[c]=i)):o&&(c.value=i,e.k&&(u[e.k]=i))};i?(l.id=-1,Or(l,n)):l()}}}let Tr=!1;const Nr=e=>/svg/.test(e.namespaceURI)&&"foreignObject"!==e.tagName,Er=e=>8===e.nodeType;function $r(e){const{mt:t,p:n,o:{patchProp:o,createText:r,nextSibling:s,parentNode:i,remove:l,insert:c,createComment:a}}=e,u=(n,o,l,a,g,v=!1)=>{const y=Er(n)&&"["===n.data,_=()=>h(n,o,l,a,g,y),{type:b,ref:S,shapeFlag:x,patchFlag:C}=o;let k=n.nodeType;o.el=n,-2===C&&(v=!1,o.dynamicChildren=null);let w=null;switch(b){case Dr:3!==k?""===o.children?(c(o.el=r(""),i(n),n),w=n):w=_():(n.data!==o.children&&(Tr=!0,n.data=o.children),w=s(n));break;case Hr:w=8!==k||y?_():s(n);break;case Wr:if(y&&(k=(n=s(n)).nodeType),1===k||3===k){w=n;const e=!o.children.length;for(let t=0;t<o.staticCount;t++)e&&(o.children+=1===w.nodeType?w.outerHTML:w.data),t===o.staticCount-1&&(o.anchor=w),w=s(w);return y?s(w):w}_();break;case Ur:w=y?d(n,o,l,a,g,v):_();break;default:if(1&x)w=1!==k||o.type.toLowerCase()!==n.tagName.toLowerCase()?_():p(n,o,l,a,g,v);else if(6&x){o.slotScopeIds=g;const e=i(n);if(t(o,e,null,l,a,Nr(e),v),w=y?m(n):s(n),w&&Er(w)&&"teleport end"===w.data&&(w=s(w)),po(o)){let t;y?(t=ls(Ur),t.anchor=w?w.previousSibling:e.lastChild):t=3===n.nodeType?us(""):ls("div"),t.el=n,o.component.subTree=t}}else 64&x?w=8!==k?_():o.type.hydrate(n,o,l,a,g,v,e,f):128&x&&(w=o.type.hydrate(n,o,l,a,Nr(i(n)),g,v,e,u))}return null!=S&&wr(S,null,a,o),w},p=(e,t,n,r,s,i)=>{i=i||!!t.dynamicChildren;const{type:c,props:a,patchFlag:u,shapeFlag:p,dirs:d}=t,h="input"===c&&d||"option"===c;if(h||-1!==u){if(d&&Io(t,null,n,"created"),a)if(h||!i||48&u)for(const t in a)(h&&t.endsWith("value")||x(t)&&!U(t))&&o(e,t,null,a[t],!1,void 0,n);else a.onClick&&o(e,"onClick",null,a.onClick,!1,void 0,n);let c;if((c=a&&a.onVnodeBeforeMount)&&vs(c,n,t),d&&Io(t,null,n,"beforeMount"),((c=a&&a.onVnodeMounted)||d)&&Dn((()=>{c&&vs(c,n,t),d&&Io(t,null,n,"mounted")}),r),16&p&&(!a||!a.innerHTML&&!a.textContent)){let o=f(e.firstChild,t,e,n,r,s,i);for(;o;){Tr=!0;const e=o;o=o.nextSibling,l(e)}}else 8&p&&e.textContent!==t.children&&(Tr=!0,e.textContent=t.children)}return e.nextSibling},f=(e,t,o,r,s,i,l)=>{l=l||!!t.dynamicChildren;const c=t.children,a=c.length;for(let p=0;p<a;p++){const t=l?c[p]:c[p]=ds(c[p]);if(e)e=u(e,t,r,s,i,l);else{if(t.type===Dr&&!t.children)continue;Tr=!0,n(null,t,o,null,r,s,Nr(o),i)}}return e},d=(e,t,n,o,r,l)=>{const{slotScopeIds:u}=t;u&&(r=r?r.concat(u):u);const p=i(e),d=f(s(e),t,p,n,o,r,l);return d&&Er(d)&&"]"===d.data?s(t.anchor=d):(Tr=!0,c(t.anchor=a("]"),p,d),d)},h=(e,t,o,r,c,a)=>{if(Tr=!0,t.el=null,a){const t=m(e);for(;;){const n=s(e);if(!n||n===t)break;l(n)}}const u=s(e),p=i(e);return l(e),n(null,t,p,u,o,r,Nr(p),c),u},m=e=>{let t=0;for(;e;)if((e=s(e))&&Er(e)&&("["===e.data&&t++,"]"===e.data)){if(0===t)return s(e);t--}return e};return[(e,t)=>{if(!t.hasChildNodes())return n(null,e,t),mn(),void(t._vnode=e);Tr=!1,u(t.firstChild,e,null,null,null),mn(),t._vnode=e,Tr&&console.error("Hydration completed but contains mismatches.")},u]}const Or=Dn;function Rr(e){return Ar(e)}function Fr(e){return Ar(e,$r)}function Ar(e,t){(ee||(ee="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{})).__VUE__=!0;const{insert:n,remove:o,patchProp:r,createElement:s,createText:i,createComment:l,setText:c,setElementText:a,parentNode:u,nextSibling:p,setScopeId:f=_,insertStaticContent:d}=e,h=(e,t,n,o=null,r=null,s=null,i=!1,l=null,c=!!t.dynamicChildren)=>{if(e===t)return;e&&!ts(e,t)&&(o=J(e),D(e,r,s,!0),e=null),-2===t.patchFlag&&(c=!1,t.dynamicChildren=null);const{type:a,ref:u,shapeFlag:p}=t;switch(a){case Dr:m(e,t,n,o);break;case Hr:g(e,t,n,o);break;case Wr:null==e&&b(t,n,o,i);break;case Ur:O(e,t,n,o,r,s,i,l,c);break;default:1&p?S(e,t,n,o,r,s,i,l,c):6&p?R(e,t,n,o,r,s,i,l,c):(64&p||128&p)&&a.process(e,t,n,o,r,s,i,l,c,X)}null!=u&&r&&wr(u,e&&e.ref,s,t||e,!t)},m=(e,t,o,r)=>{if(null==e)n(t.el=i(t.children),o,r);else{const n=t.el=e.el;t.children!==e.children&&c(n,t.children)}},g=(e,t,o,r)=>{null==e?n(t.el=l(t.children||""),o,r):t.el=e.el},b=(e,t,n,o)=>{[e.el,e.anchor]=d(e.children,t,n,o,e.el,e.anchor)},S=(e,t,n,o,r,s,i,l,c)=>{i=i||"svg"===t.type,null==e?x(t,n,o,r,s,i,l,c):T(e,t,r,s,i,l,c)},x=(e,t,o,i,l,c,u,p)=>{let f,d;const{type:h,props:m,shapeFlag:g,transition:v,dirs:y}=e;if(f=e.el=s(e.type,c,m&&m.is,m),8&g?a(f,e.children):16&g&&w(e.children,f,null,i,l,c&&"foreignObject"!==h,u,p),y&&Io(e,null,i,"created"),m){for(const t in m)"value"===t||U(t)||r(f,t,null,m[t],c,e.children,i,l,q);"value"in m&&r(f,"value",null,m.value),(d=m.onVnodeBeforeMount)&&vs(d,i,e)}C(f,e,e.scopeId,u,i),y&&Io(e,null,i,"beforeMount");const _=(!l||l&&!l.pendingBranch)&&v&&!v.persisted;_&&v.beforeEnter(f),n(f,t,o),((d=m&&m.onVnodeMounted)||_||y)&&Or((()=>{d&&vs(d,i,e),_&&v.enter(f),y&&Io(e,null,i,"mounted")}),l)},C=(e,t,n,o,r)=>{if(n&&f(e,n),o)for(let s=0;s<o.length;s++)f(e,o[s]);if(r){if(t===r.subTree){const t=r.vnode;C(e,t,t.scopeId,t.slotScopeIds,r.parent)}}},w=(e,t,n,o,r,s,i,l,c=0)=>{for(let a=c;a<e.length;a++){const c=e[a]=l?hs(e[a]):ds(e[a]);h(null,c,t,n,o,r,s,i,l)}},T=(e,t,n,o,s,i,l)=>{const c=t.el=e.el;let{patchFlag:u,dynamicChildren:p,dirs:f}=t;u|=16&e.patchFlag;const d=e.props||v,h=t.props||v;let m;n&&Pr(n,!1),(m=h.onVnodeBeforeUpdate)&&vs(m,n,t,e),f&&Io(t,e,n,"beforeUpdate"),n&&Pr(n,!0);const g=s&&"foreignObject"!==t.type;if(p?E(e.dynamicChildren,p,c,n,o,g,i):l||I(e,t,c,null,n,o,g,i,!1),u>0){if(16&u)$(c,t,d,h,n,o,s);else if(2&u&&d.class!==h.class&&r(c,"class",null,h.class,s),4&u&&r(c,"style",d.style,h.style,s),8&u){const i=t.dynamicProps;for(let t=0;t<i.length;t++){const l=i[t],a=d[l],u=h[l];u===a&&"value"!==l||r(c,l,a,u,s,e.children,n,o,q)}}1&u&&e.children!==t.children&&a(c,t.children)}else l||null!=p||$(c,t,d,h,n,o,s);((m=h.onVnodeUpdated)||f)&&Or((()=>{m&&vs(m,n,t,e),f&&Io(t,e,n,"updated")}),o)},E=(e,t,n,o,r,s,i)=>{for(let l=0;l<t.length;l++){const c=e[l],a=t[l],p=c.el&&(c.type===Ur||!ts(c,a)||70&c.shapeFlag)?u(c.el):n;h(c,a,p,null,o,r,s,i,!0)}},$=(e,t,n,o,s,i,l)=>{if(n!==o){if(n!==v)for(const c in n)U(c)||c in o||r(e,c,n[c],null,l,t.children,s,i,q);for(const c in o){if(U(c))continue;const a=o[c],u=n[c];a!==u&&"value"!==c&&r(e,c,u,a,l,t.children,s,i,q)}"value"in o&&r(e,"value",n.value,o.value)}},O=(e,t,o,r,s,l,c,a,u)=>{const p=t.el=e?e.el:i(""),f=t.anchor=e?e.anchor:i("");let{patchFlag:d,dynamicChildren:h,slotScopeIds:m}=t;m&&(a=a?a.concat(m):m),null==e?(n(p,o,r),n(f,o,r),w(t.children,o,f,s,l,c,a,u)):d>0&&64&d&&h&&e.dynamicChildren?(E(e.dynamicChildren,h,o,s,l,c,a),(null!=t.key||s&&t===s.subTree)&&Mr(e,t,!0)):I(e,t,o,f,s,l,c,a,u)},R=(e,t,n,o,r,s,i,l,c)=>{t.slotScopeIds=l,null==e?512&t.shapeFlag?r.ctx.activate(t,n,o,i,c):F(t,n,o,r,s,i,c):A(e,t,c)},F=(e,t,n,o,r,s,i)=>{const l=e.component=function(e,t,n){const o=e.type,r=(t?t.appContext:e.appContext)||ys,s={uid:_s++,vnode:e,type:o,parent:t,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,scope:new ne(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(r.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:fr(o,r),emitsOptions:Cn(o,r),emit:null,emitted:null,propsDefaults:v,inheritAttrs:o.inheritAttrs,ctx:v,data:v,props:v,attrs:v,slots:v,refs:v,setupState:v,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};s.ctx={_:s},s.root=t?t.root:s,s.emit=xn.bind(null,s),e.ce&&e.ce(s);return s}(e,o,r);if(mo(e)&&(l.ctx.renderer=X),function(e,t=!1){Ns=t;const{props:n,children:o}=e.vnode,r=ks(e);(function(e,t,n,o=!1){const r={},s={};Q(s,os,1),e.propsDefaults=Object.create(null),ur(e,t,r,s);for(const i in e.propsOptions[0])i in r||(r[i]=void 0);e.props=n?o?r:vt(r):e.type.props?r:s,e.attrs=s})(e,n,r,t),((e,t)=>{if(32&e.vnode.shapeFlag){const n=t._;n?(e.slots=wt(t),Q(t,"_",n)):br(t,e.slots={})}else e.slots={},t&&Sr(e,t);Q(e.slots,os,1)})(e,o);const s=r?function(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=Tt(new Proxy(e.ctx,Yo));const{setup:o}=n;if(o){const n=e.setupContext=o.length>1?Fs(e):null;xs(e),xe();const r=Yt(o,e,0,[e.props,n]);if(Ce(),Cs(),V(r)){if(r.then(Cs,Cs),t)return r.then((n=>{Es(e,n,t)})).catch((t=>{Xt(t,e,0)}));e.asyncDep=r}else Es(e,r,t)}else Rs(e,t)}(e,t):void 0;Ns=!1}(l),l.asyncDep){if(r&&r.registerDep(l,P),!e.el){const e=l.subTree=ls(Hr);g(null,e,t,n)}}else P(l,e,t,n,r,s,i)},A=(e,t,n)=>{const o=t.component=e.component;if(function(e,t,n){const{props:o,children:r,component:s}=e,{props:i,children:l,patchFlag:c}=t,a=s.emitsOptions;if(t.dirs||t.transition)return!0;if(!(n&&c>=0))return!(!r&&!l||l&&l.$stable)||o!==i&&(o?!i||Mn(o,i,a):!!i);if(1024&c)return!0;if(16&c)return o?Mn(o,i,a):!!i;if(8&c){const e=t.dynamicProps;for(let t=0;t<e.length;t++){const n=e[t];if(i[n]!==o[n]&&!kn(a,n))return!0}}return!1}(e,t,n)){if(o.asyncDep&&!o.asyncResolved)return void M(o,t,n);o.next=t,function(e){const t=nn.indexOf(e);t>on&&nn.splice(t,1)}(o.update),o.update()}else t.el=e.el,o.vnode=t},P=(e,t,n,o,r,s,i)=>{const l=e.effect=new ge((()=>{if(e.isMounted){let t,{next:n,bu:o,u:l,parent:c,vnode:a}=e,p=n;Pr(e,!1),n?(n.el=a.el,M(e,n,i)):n=a,o&&Y(o),(t=n.props&&n.props.onVnodeBeforeUpdate)&&vs(t,c,n,a),Pr(e,!0);const f=Fn(e),d=e.subTree;e.subTree=f,h(d,f,u(d.el),J(d),e,r,s),n.el=f.el,null===p&&Vn(e,f.el),l&&Or(l,r),(t=n.props&&n.props.onVnodeUpdated)&&Or((()=>vs(t,c,n,a)),r)}else{let i;const{el:l,props:c}=t,{bm:a,m:u,parent:p}=e,f=po(t);if(Pr(e,!1),a&&Y(a),!f&&(i=c&&c.onVnodeBeforeMount)&&vs(i,p,t),Pr(e,!0),l&&oe){const n=()=>{e.subTree=Fn(e),oe(l,e.subTree,e,r,null)};f?t.type.__asyncLoader().then((()=>!e.isUnmounted&&n())):n()}else{const i=e.subTree=Fn(e);h(null,i,n,o,e,r,s),t.el=i.el}if(u&&Or(u,r),!f&&(i=c&&c.onVnodeMounted)){const e=t;Or((()=>vs(i,p,e)),r)}(256&t.shapeFlag||p&&po(p.vnode)&&256&p.vnode.shapeFlag)&&e.a&&Or(e.a,r),e.isMounted=!0,t=n=o=null}}),(()=>pn(c)),e.scope),c=e.update=()=>l.run();c.id=e.uid,Pr(e,!0),c()},M=(e,t,n)=>{t.component=e;const o=e.vnode.props;e.vnode=t,e.next=null,function(e,t,n,o){const{props:r,attrs:s,vnode:{patchFlag:i}}=e,l=wt(r),[c]=e.propsOptions;let a=!1;if(!(o||i>0)||16&i){let o;ur(e,t,r,s)&&(a=!0);for(const s in l)t&&(N(t,s)||(o=G(s))!==s&&N(t,o))||(c?!n||void 0===n[s]&&void 0===n[o]||(r[s]=pr(c,l,s,void 0,e,!0)):delete r[s]);if(s!==l)for(const e in s)t&&N(t,e)||(delete s[e],a=!0)}else if(8&i){const n=e.vnode.dynamicProps;for(let o=0;o<n.length;o++){let i=n[o];if(kn(e.emitsOptions,i))continue;const u=t[i];if(c)if(N(s,i))u!==s[i]&&(s[i]=u,a=!0);else{const t=z(i);r[t]=pr(c,l,t,u,e,!1)}else u!==s[i]&&(s[i]=u,a=!0)}}a&&Te(e,"set","$attrs")}(e,t.props,o,n),((e,t,n)=>{const{vnode:o,slots:r}=e;let s=!0,i=v;if(32&o.shapeFlag){const e=t._;e?n&&1===e?s=!1:(k(r,t),n||1!==e||delete r._):(s=!t.$stable,br(t,r)),i=t}else t&&(Sr(e,t),i={default:1});if(s)for(const l in r)vr(l)||l in i||delete r[l]})(e,t.children,n),xe(),hn(),Ce()},I=(e,t,n,o,r,s,i,l,c=!1)=>{const u=e&&e.children,p=e?e.shapeFlag:0,f=t.children,{patchFlag:d,shapeFlag:h}=t;if(d>0){if(128&d)return void L(u,f,n,o,r,s,i,l,c);if(256&d)return void B(u,f,n,o,r,s,i,l,c)}8&h?(16&p&&q(u,r,s),f!==u&&a(n,f)):16&p?16&h?L(u,f,n,o,r,s,i,l,c):q(u,r,s,!0):(8&p&&a(n,""),16&h&&w(f,n,o,r,s,i,l,c))},B=(e,t,n,o,r,s,i,l,c)=>{const a=(e=e||y).length,u=(t=t||y).length,p=Math.min(a,u);let f;for(f=0;f<p;f++){const o=t[f]=c?hs(t[f]):ds(t[f]);h(e[f],o,n,null,r,s,i,l,c)}a>u?q(e,r,s,!0,!1,p):w(t,n,o,r,s,i,l,c,p)},L=(e,t,n,o,r,s,i,l,c)=>{let a=0;const u=t.length;let p=e.length-1,f=u-1;for(;a<=p&&a<=f;){const o=e[a],u=t[a]=c?hs(t[a]):ds(t[a]);if(!ts(o,u))break;h(o,u,n,null,r,s,i,l,c),a++}for(;a<=p&&a<=f;){const o=e[p],a=t[f]=c?hs(t[f]):ds(t[f]);if(!ts(o,a))break;h(o,a,n,null,r,s,i,l,c),p--,f--}if(a>p){if(a<=f){const e=f+1,p=e<u?t[e].el:o;for(;a<=f;)h(null,t[a]=c?hs(t[a]):ds(t[a]),n,p,r,s,i,l,c),a++}}else if(a>f)for(;a<=p;)D(e[a],r,s,!0),a++;else{const d=a,m=a,g=new Map;for(a=m;a<=f;a++){const e=t[a]=c?hs(t[a]):ds(t[a]);null!=e.key&&g.set(e.key,a)}let v,_=0;const b=f-m+1;let S=!1,x=0;const C=new Array(b);for(a=0;a<b;a++)C[a]=0;for(a=d;a<=p;a++){const o=e[a];if(_>=b){D(o,r,s,!0);continue}let u;if(null!=o.key)u=g.get(o.key);else for(v=m;v<=f;v++)if(0===C[v-m]&&ts(o,t[v])){u=v;break}void 0===u?D(o,r,s,!0):(C[u-m]=a+1,u>=x?x=u:S=!0,h(o,t[u],n,null,r,s,i,l,c),_++)}const k=S?function(e){const t=e.slice(),n=[0];let o,r,s,i,l;const c=e.length;for(o=0;o<c;o++){const c=e[o];if(0!==c){if(r=n[n.length-1],e[r]<c){t[o]=r,n.push(o);continue}for(s=0,i=n.length-1;s<i;)l=s+i>>1,e[n[l]]<c?s=l+1:i=l;c<e[n[s]]&&(s>0&&(t[o]=n[s-1]),n[s]=o)}}s=n.length,i=n[s-1];for(;s-- >0;)n[s]=i,i=t[i];return n}(C):y;for(v=k.length-1,a=b-1;a>=0;a--){const e=m+a,p=t[e],f=e+1<u?t[e+1].el:o;0===C[a]?h(null,p,n,f,r,s,i,l,c):S&&(v<0||a!==k[v]?j(p,n,f,2):v--)}}},j=(e,t,o,r,s=null)=>{const{el:i,type:l,transition:c,children:a,shapeFlag:u}=e;if(6&u)return void j(e.component.subTree,t,o,r);if(128&u)return void e.suspense.move(t,o,r);if(64&u)return void l.move(e,t,o,X);if(l===Ur){n(i,t,o);for(let e=0;e<a.length;e++)j(a[e],t,o,r);return void n(e.anchor,t,o)}if(l===Wr)return void(({el:e,anchor:t},o,r)=>{let s;for(;e&&e!==t;)s=p(e),n(e,o,r),e=s;n(t,o,r)})(e,t,o);if(2!==r&&1&u&&c)if(0===r)c.beforeEnter(i),n(i,t,o),Or((()=>c.enter(i)),s);else{const{leave:e,delayLeave:r,afterLeave:s}=c,l=()=>n(i,t,o),a=()=>{e(i,(()=>{l(),s&&s()}))};r?r(i,l,a):a()}else n(i,t,o)},D=(e,t,n,o=!1,r=!1)=>{const{type:s,props:i,ref:l,children:c,dynamicChildren:a,shapeFlag:u,patchFlag:p,dirs:f}=e;if(null!=l&&wr(l,null,n,e,!0),256&u)return void t.ctx.deactivate(e);const d=1&u&&f,h=!po(e);let m;if(h&&(m=i&&i.onVnodeBeforeUnmount)&&vs(m,t,e),6&u)K(e.component,n,o);else{if(128&u)return void e.suspense.unmount(n,o);d&&Io(e,null,t,"beforeUnmount"),64&u?e.type.remove(e,t,n,r,X,o):a&&(s!==Ur||p>0&&64&p)?q(a,t,n,!1,!0):(s===Ur&&384&p||!r&&16&u)&&q(c,t,n),o&&H(e)}(h&&(m=i&&i.onVnodeUnmounted)||d)&&Or((()=>{m&&vs(m,t,e),d&&Io(e,null,t,"unmounted")}),n)},H=e=>{const{type:t,el:n,anchor:r,transition:s}=e;if(t===Ur)return void W(n,r);if(t===Wr)return void(({el:e,anchor:t})=>{let n;for(;e&&e!==t;)n=p(e),o(e),e=n;o(t)})(e);const i=()=>{o(n),s&&!s.persisted&&s.afterLeave&&s.afterLeave()};if(1&e.shapeFlag&&s&&!s.persisted){const{leave:t,delayLeave:o}=s,r=()=>t(n,i);o?o(e.el,i,r):r()}else i()},W=(e,t)=>{let n;for(;e!==t;)n=p(e),o(e),e=n;o(t)},K=(e,t,n)=>{const{bum:o,scope:r,update:s,subTree:i,um:l}=e;o&&Y(o),r.stop(),s&&(s.active=!1,D(i,e,t,n)),l&&Or(l,t),Or((()=>{e.isUnmounted=!0}),t),t&&t.pendingBranch&&!t.isUnmounted&&e.asyncDep&&!e.asyncResolved&&e.suspenseId===t.pendingId&&(t.deps--,0===t.deps&&t.resolve())},q=(e,t,n,o=!1,r=!1,s=0)=>{for(let i=s;i<e.length;i++)D(e[i],t,n,o,r)},J=e=>6&e.shapeFlag?J(e.component.subTree):128&e.shapeFlag?e.suspense.next():p(e.anchor||e.el),Z=(e,t,n)=>{null==e?t._vnode&&D(t._vnode,null,null,!0):h(t._vnode||null,e,t,null,null,null,n),hn(),mn(),t._vnode=e},X={p:h,um:D,m:j,r:H,mt:F,mc:w,pc:I,pbc:E,n:J,o:e};let te,oe;return t&&([te,oe]=t(X)),{render:Z,hydrate:te,createApp:kr(Z,te)}}function Pr({effect:e,update:t},n){e.allowRecurse=t.allowRecurse=n}function Mr(e,t,n=!1){const o=e.children,r=t.children;if(E(o)&&E(r))for(let s=0;s<o.length;s++){const e=o[s];let t=r[s];1&t.shapeFlag&&!t.dynamicChildren&&((t.patchFlag<=0||32===t.patchFlag)&&(t=r[s]=hs(r[s]),t.el=e.el),n||Mr(e,t))}}const Vr=e=>e&&(e.disabled||""===e.disabled),Ir=e=>"undefined"!=typeof SVGElement&&e instanceof SVGElement,Br=(e,t)=>{const n=e&&e.to;if(A(n)){if(t){return t(n)}return null}return n};function Lr(e,t,n,{o:{insert:o},m:r},s=2){0===s&&o(e.targetAnchor,t,n);const{el:i,anchor:l,shapeFlag:c,children:a,props:u}=e,p=2===s;if(p&&o(i,t,n),(!p||Vr(u))&&16&c)for(let f=0;f<a.length;f++)r(a[f],t,n,2);p&&o(l,t,n)}const jr={__isTeleport:!0,process(e,t,n,o,r,s,i,l,c,a){const{mc:u,pc:p,pbc:f,o:{insert:d,querySelector:h,createText:m}}=a,g=Vr(t.props);let{shapeFlag:v,children:y,dynamicChildren:_}=t;if(null==e){const e=t.el=m(""),a=t.anchor=m("");d(e,n,o),d(a,n,o);const p=t.target=Br(t.props,h),f=t.targetAnchor=m("");p&&(d(f,p),i=i||Ir(p));const _=(e,t)=>{16&v&&u(y,e,t,r,s,i,l,c)};g?_(n,a):p&&_(p,f)}else{t.el=e.el;const o=t.anchor=e.anchor,u=t.target=e.target,d=t.targetAnchor=e.targetAnchor,m=Vr(e.props),v=m?n:u,y=m?o:d;if(i=i||Ir(u),_?(f(e.dynamicChildren,_,v,r,s,i,l),Mr(e,t,!0)):c||p(e,t,v,y,r,s,i,l,!1),g)m||Lr(t,n,o,a,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){const e=t.target=Br(t.props,h);e&&Lr(t,e,null,a,0)}else m&&Lr(t,u,d,a,1)}},remove(e,t,n,o,{um:r,o:{remove:s}},i){const{shapeFlag:l,children:c,anchor:a,targetAnchor:u,target:p,props:f}=e;if(p&&s(u),(i||!Vr(f))&&(s(a),16&l))for(let d=0;d<c.length;d++){const e=c[d];r(e,t,n,!0,!!e.dynamicChildren)}},move:Lr,hydrate:function(e,t,n,o,r,s,{o:{nextSibling:i,parentNode:l,querySelector:c}},a){const u=t.target=Br(t.props,c);if(u){const c=u._lpa||u.firstChild;if(16&t.shapeFlag)if(Vr(t.props))t.anchor=a(i(e),t,l(e),n,o,r,s),t.targetAnchor=c;else{t.anchor=i(e);let l=c;for(;l;)if(l=i(l),l&&8===l.nodeType&&"teleport anchor"===l.data){t.targetAnchor=l,u._lpa=t.targetAnchor&&i(t.targetAnchor);break}a(c,t,u,n,o,r,s)}}return t.anchor&&i(t.anchor)}},Ur=Symbol(void 0),Dr=Symbol(void 0),Hr=Symbol(void 0),Wr=Symbol(void 0),zr=[];let Kr=null;function Gr(e=!1){zr.push(Kr=e?null:[])}function qr(){zr.pop(),Kr=zr[zr.length-1]||null}let Jr=1;function Zr(e){Jr+=e}function Yr(e){return e.dynamicChildren=Jr>0?Kr||y:null,qr(),Jr>0&&Kr&&Kr.push(e),e}function Qr(e,t,n,o,r,s){return Yr(is(e,t,n,o,r,s,!0))}function Xr(e,t,n,o,r){return Yr(ls(e,t,n,o,r,!0))}function es(e){return!!e&&!0===e.__v_isVNode}function ts(e,t){return e.type===t.type&&e.key===t.key}function ns(e){}const os="__vInternal",rs=({key:e})=>null!=e?e:null,ss=({ref:e,ref_key:t,ref_for:n})=>null!=e?A(e)||Rt(e)||F(e)?{i:wn,r:e,k:t,f:!!n}:e:null;function is(e,t=null,n=null,o=0,r=null,s=(e===Ur?0:1),i=!1,l=!1){const c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&rs(t),ref:t&&ss(t),scopeId:Tn,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:o,dynamicProps:r,dynamicChildren:null,appContext:null};return l?(ms(c,n),128&s&&e.normalize(c)):n&&(c.shapeFlag|=A(n)?8:16),Jr>0&&!i&&Kr&&(c.patchFlag>0||6&s)&&32!==c.patchFlag&&Kr.push(c),c}const ls=function(e,t=null,n=null,o=0,s=null,i=!1){e&&e!==Lo||(e=Hr);if(es(e)){const o=as(e,t,!0);return n&&ms(o,n),Jr>0&&!i&&Kr&&(6&o.shapeFlag?Kr[Kr.indexOf(e)]=o:Kr.push(o)),o.patchFlag|=-2,o}l=e,F(l)&&"__vccOpts"in l&&(e=e.__vccOpts);var l;if(t){t=cs(t);let{class:e,style:n}=t;e&&!A(e)&&(t.class=c(e)),M(n)&&(kt(n)&&!E(n)&&(n=k({},n)),t.style=r(n))}const a=A(e)?1:In(e)?128:(e=>e.__isTeleport)(e)?64:M(e)?4:F(e)?2:0;return is(e,t,n,o,s,a,i,!0)};function cs(e){return e?kt(e)||os in e?k({},e):e:null}function as(e,t,n=!1){const{props:o,ref:r,patchFlag:s,children:i}=e,l=t?gs(o||{},t):o;return{__v_isVNode:!0,__v_skip:!0,type:e.type,props:l,key:l&&rs(l),ref:t&&t.ref?n&&r?E(r)?r.concat(ss(t)):[r,ss(t)]:ss(t):r,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:i,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Ur?-1===s?16:16|s:s,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&as(e.ssContent),ssFallback:e.ssFallback&&as(e.ssFallback),el:e.el,anchor:e.anchor}}function us(e=" ",t=0){return ls(Dr,null,e,t)}function ps(e,t){const n=ls(Wr,null,e);return n.staticCount=t,n}function fs(e="",t=!1){return t?(Gr(),Xr(Hr,null,e)):ls(Hr,null,e)}function ds(e){return null==e||"boolean"==typeof e?ls(Hr):E(e)?ls(Ur,null,e.slice()):"object"==typeof e?hs(e):ls(Dr,null,String(e))}function hs(e){return null===e.el&&-1!==e.patchFlag||e.memo?e:as(e)}function ms(e,t){let n=0;const{shapeFlag:o}=e;if(null==t)t=null;else if(E(t))n=16;else if("object"==typeof t){if(65&o){const n=t.default;return void(n&&(n._c&&(n._d=!1),ms(e,n()),n._c&&(n._d=!0)))}{n=32;const o=t._;o||os in t?3===o&&wn&&(1===wn.slots._?t._=1:(t._=2,e.patchFlag|=1024)):t._ctx=wn}}else F(t)?(t={default:t,_ctx:wn},n=32):(t=String(t),64&o?(n=16,t=[us(t)]):n=8);e.children=t,e.shapeFlag|=n}function gs(...e){const t={};for(let n=0;n<e.length;n++){const o=e[n];for(const e in o)if("class"===e)t.class!==o.class&&(t.class=c([t.class,o.class]));else if("style"===e)t.style=r([t.style,o.style]);else if(x(e)){const n=t[e],r=o[e];!r||n===r||E(n)&&n.includes(r)||(t[e]=n?[].concat(n,r):r)}else""!==e&&(t[e]=o[e])}return t}function vs(e,t,n,o=null){Qt(e,t,7,[n,o])}const ys=xr();let _s=0;let bs=null;const Ss=()=>bs||wn,xs=e=>{bs=e,e.scope.on()},Cs=()=>{bs&&bs.scope.off(),bs=null};function ks(e){return 4&e.vnode.shapeFlag}let ws,Ts,Ns=!1;function Es(e,t,n){F(t)?e.render=t:M(t)&&(e.setupState=Lt(t)),Rs(e,n)}function $s(e){ws=e,Ts=e=>{e.render._rc&&(e.withProxy=new Proxy(e.ctx,Qo))}}const Os=()=>!ws;function Rs(e,t,n){const o=e.type;if(!e.render){if(!t&&ws&&!o.render){const t=o.template||or(e).template;if(t){const{isCustomElement:n,compilerOptions:r}=e.appContext.config,{delimiters:s,compilerOptions:i}=o,l=k(k({isCustomElement:n,delimiters:s},r),i);o.render=ws(t,l)}}e.render=o.render||_,Ts&&Ts(e)}xs(e),xe(),er(e),Ce(),Cs()}function Fs(e){const t=t=>{e.exposed=t||{}};let n;return{get attrs(){return n||(n=function(e){return new Proxy(e.attrs,{get:(t,n)=>(ke(e,0,"$attrs"),t[n])})}(e))},slots:e.slots,emit:e.emit,expose:t}}function As(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy(Lt(Tt(e.exposed)),{get:(t,n)=>n in t?t[n]:n in Zo?Zo[n](e):void 0}))}const Ps=/(?:^|[-_])(\\w)/g;function Ms(e,t=!0){return F(e)?e.displayName||e.name:e.name||t&&e.__name}function Vs(e,t,n=!1){let o=Ms(t);if(!o&&t.__file){const e=t.__file.match(/([^/\\\\]+)\\.\\w+$/);e&&(o=e[1])}if(!o&&e&&e.parent){const n=e=>{for(const n in e)if(e[n]===t)return n};o=n(e.components||e.parent.type.components)||n(e.appContext.components)}return o?o.replace(Ps,(e=>e.toUpperCase())).replace(/[-_]/g,""):n?"App":"Anonymous"}const Is=(e,t)=>function(e,t,n=!1){let o,r;const s=F(e);return s?(o=e,r=_):(o=e.get,r=e.set),new Kt(o,r,s||!r,n)}(e,0,Ns);function Bs(){return null}function Ls(){return null}function js(e){}function Us(e,t){return null}function Ds(){return Ws().slots}function Hs(){return Ws().attrs}function Ws(){const e=Ss();return e.setupContext||(e.setupContext=Fs(e))}function zs(e,t){const n=E(e)?e.reduce(((e,t)=>(e[t]={},e)),{}):e;for(const o in t){const e=n[o];e?E(e)||F(e)?n[o]={type:e,default:t[o]}:e.default=t[o]:null===e&&(n[o]={default:t[o]})}return n}function Ks(e,t){const n={};for(const o in e)t.includes(o)||Object.defineProperty(n,o,{enumerable:!0,get:()=>e[o]});return n}function Gs(e){const t=Ss();let n=e();return Cs(),V(n)&&(n=n.catch((e=>{throw xs(t),e}))),[n,()=>xs(t)]}function qs(e,t,n){const o=arguments.length;return 2===o?M(t)&&!E(t)?es(t)?ls(e,null,[t]):ls(e,t):ls(e,null,t):(o>3?n=Array.prototype.slice.call(arguments,2):3===o&&es(n)&&(n=[n]),ls(e,t,n))}const Js=Symbol(""),Zs=()=>{{const e=zn(Js);return e||qt("Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."),e}};function Ys(){}function Qs(e,t,n,o){const r=n[o];if(r&&Xs(r,e))return r;const s=t();return s.memo=e.slice(),n[o]=s}function Xs(e,t){const n=e.memo;if(n.length!=t.length)return!1;for(let o=0;o<n.length;o++)if(Z(n[o],t[o]))return!1;return Jr>0&&Kr&&Kr.push(e),!0}const ei="3.2.41",ti=null,ni=null,oi=null,ri="undefined"!=typeof document?document:null,si=ri&&ri.createElement("template"),ii={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,o)=>{const r=t?ri.createElementNS("http://www.w3.org/2000/svg",e):ri.createElement(e,n?{is:n}:void 0);return"select"===e&&o&&null!=o.multiple&&r.setAttribute("multiple",o.multiple),r},createText:e=>ri.createTextNode(e),createComment:e=>ri.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>ri.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,o,r,s){const i=n?n.previousSibling:t.lastChild;if(r&&(r===s||r.nextSibling))for(;t.insertBefore(r.cloneNode(!0),n),r!==s&&(r=r.nextSibling););else{si.innerHTML=o?`<svg>${e}</svg>`:e;const r=si.content;if(o){const e=r.firstChild;for(;e.firstChild;)r.appendChild(e.firstChild);r.removeChild(e)}t.insertBefore(r,n)}return[i?i.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}};const li=/\\s*!important$/;function ci(e,t,n){if(E(n))n.forEach((n=>ci(e,t,n)));else if(null==n&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const o=function(e,t){const n=ui[t];if(n)return n;let o=z(t);if("filter"!==o&&o in e)return ui[t]=o;o=q(o);for(let r=0;r<ai.length;r++){const n=ai[r]+o;if(n in e)return ui[t]=n}return t}(e,t);li.test(n)?e.setProperty(G(o),n.replace(li,""),"important"):e[o]=n}}const ai=["Webkit","Moz","ms"],ui={};const pi="http://www.w3.org/1999/xlink";function fi(e,t,n,o){e.addEventListener(t,n,o)}function di(e,t,n,o,r=null){const s=e._vei||(e._vei={}),i=s[t];if(o&&i)i.value=o;else{const[n,l]=function(e){let t;if(hi.test(e)){let n;for(t={};n=e.match(hi);)e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0}return[":"===e[2]?e.slice(3):G(e.slice(2)),t]}(t);if(o){const i=s[t]=function(e,t){const n=e=>{if(e._vts){if(e._vts<=n.attached)return}else e._vts=Date.now();Qt(function(e,t){if(E(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map((e=>t=>!t._stopped&&e&&e(t)))}return t}(e,n.value),t,5,[e])};return n.value=e,n.attached=(()=>mi||(gi.then((()=>mi=0)),mi=Date.now()))(),n}(o,r);fi(e,n,i,l)}else i&&(!function(e,t,n,o){e.removeEventListener(t,n,o)}(e,n,i,l),s[t]=void 0)}}const hi=/(?:Once|Passive|Capture)$/;let mi=0;const gi=Promise.resolve();const vi=/^on[a-z]/;function yi(e,t){const n=uo(e);class o extends Si{constructor(e){super(n,e,t)}}return o.def=n,o}const _i=e=>yi(e,bl),bi="undefined"!=typeof HTMLElement?HTMLElement:class{};class Si extends bi{constructor(e,t={},n){super(),this._def=e,this._props=t,this._instance=null,this._connected=!1,this._resolved=!1,this._numberProps=null,this.shadowRoot&&n?n(this._createVNode(),this.shadowRoot):this.attachShadow({mode:"open"})}connectedCallback(){this._connected=!0,this._instance||this._resolveDef()}disconnectedCallback(){this._connected=!1,un((()=>{this._connected||(_l(null,this.shadowRoot),this._instance=null)}))}_resolveDef(){if(this._resolved)return;this._resolved=!0;for(let n=0;n<this.attributes.length;n++)this._setAttr(this.attributes[n].name);new MutationObserver((e=>{for(const t of e)this._setAttr(t.attributeName)})).observe(this,{attributes:!0});const e=e=>{const{props:t,styles:n}=e,o=!E(t),r=t?o?Object.keys(t):t:[];let s;if(o)for(const i in this._props){const e=t[i];(e===Number||e&&e.type===Number)&&(this._props[i]=X(this._props[i]),(s||(s=Object.create(null)))[i]=!0)}this._numberProps=s;for(const i of Object.keys(this))"_"!==i[0]&&this._setProp(i,this[i],!0,!1);for(const i of r.map(z))Object.defineProperty(this,i,{get(){return this._getProp(i)},set(e){this._setProp(i,e)}});this._applyStyles(n),this._update()},t=this._def.__asyncLoader;t?t().then(e):e(this._def)}_setAttr(e){let t=this.getAttribute(e);this._numberProps&&this._numberProps[e]&&(t=X(t)),this._setProp(z(e),t,!1)}_getProp(e){return this._props[e]}_setProp(e,t,n=!0,o=!0){t!==this._props[e]&&(this._props[e]=t,o&&this._instance&&this._update(),n&&(!0===t?this.setAttribute(G(e),""):"string"==typeof t||"number"==typeof t?this.setAttribute(G(e),t+""):t||this.removeAttribute(G(e))))}_update(){_l(this._createVNode(),this.shadowRoot)}_createVNode(){const e=ls(this._def,k({},this._props));return this._instance||(e.ce=e=>{this._instance=e,e.isCE=!0,e.emit=(e,...t)=>{this.dispatchEvent(new CustomEvent(e,{detail:t}))};let t=this;for(;t=t&&(t.parentNode||t.host);)if(t instanceof Si){e.parent=t._instance;break}}),e}_applyStyles(e){e&&e.forEach((e=>{const t=document.createElement("style");t.textContent=e,this.shadowRoot.appendChild(t)}))}}function xi(e="$style"){{const t=Ss();if(!t)return v;const n=t.type.__cssModules;if(!n)return v;const o=n[e];return o||v}}function Ci(e){const t=Ss();if(!t)return;const n=()=>ki(t.subTree,e(t.proxy));Gn(n),No((()=>{const e=new MutationObserver(n);e.observe(t.subTree.el.parentNode,{childList:!0}),Ro((()=>e.disconnect()))}))}function ki(e,t){if(128&e.shapeFlag){const n=e.suspense;e=n.activeBranch,n.pendingBranch&&!n.isHydrating&&n.effects.push((()=>{ki(n.activeBranch,t)}))}for(;e.component;)e=e.component.subTree;if(1&e.shapeFlag&&e.el)wi(e.el,t);else if(e.type===Ur)e.children.forEach((e=>ki(e,t)));else if(e.type===Wr){let{el:n,anchor:o}=e;for(;n&&(wi(n,t),n!==o);)n=n.nextSibling}}function wi(e,t){if(1===e.nodeType){const n=e.style;for(const e in t)n.setProperty(`--${e}`,t[e])}}const Ti=(e,{slots:t})=>qs(oo,Ri(e),t);Ti.displayName="Transition";const Ni={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},Ei=Ti.props=k({},oo.props,Ni),$i=(e,t=[])=>{E(e)?e.forEach((e=>e(...t))):e&&e(...t)},Oi=e=>!!e&&(E(e)?e.some((e=>e.length>1)):e.length>1);function Ri(e){const t={};for(const k in e)k in Ni||(t[k]=e[k]);if(!1===e.css)return t;const{name:n="v",type:o,duration:r,enterFromClass:s=`${n}-enter-from`,enterActiveClass:i=`${n}-enter-active`,enterToClass:l=`${n}-enter-to`,appearFromClass:c=s,appearActiveClass:a=i,appearToClass:u=l,leaveFromClass:p=`${n}-leave-from`,leaveActiveClass:f=`${n}-leave-active`,leaveToClass:d=`${n}-leave-to`}=e,h=function(e){if(null==e)return null;if(M(e))return[Fi(e.enter),Fi(e.leave)];{const t=Fi(e);return[t,t]}}(r),m=h&&h[0],g=h&&h[1],{onBeforeEnter:v,onEnter:y,onEnterCancelled:_,onLeave:b,onLeaveCancelled:S,onBeforeAppear:x=v,onAppear:C=y,onAppearCancelled:w=_}=t,T=(e,t,n)=>{Pi(e,t?u:l),Pi(e,t?a:i),n&&n()},N=(e,t)=>{e._isLeaving=!1,Pi(e,p),Pi(e,d),Pi(e,f),t&&t()},E=e=>(t,n)=>{const r=e?C:y,i=()=>T(t,e,n);$i(r,[t,i]),Mi((()=>{Pi(t,e?c:s),Ai(t,e?u:l),Oi(r)||Ii(t,o,m,i)}))};return k(t,{onBeforeEnter(e){$i(v,[e]),Ai(e,s),Ai(e,i)},onBeforeAppear(e){$i(x,[e]),Ai(e,c),Ai(e,a)},onEnter:E(!1),onAppear:E(!0),onLeave(e,t){e._isLeaving=!0;const n=()=>N(e,t);Ai(e,p),Ui(),Ai(e,f),Mi((()=>{e._isLeaving&&(Pi(e,p),Ai(e,d),Oi(b)||Ii(e,o,g,n))})),$i(b,[e,n])},onEnterCancelled(e){T(e,!1),$i(_,[e])},onAppearCancelled(e){T(e,!0),$i(w,[e])},onLeaveCancelled(e){N(e),$i(S,[e])}})}function Fi(e){return X(e)}function Ai(e,t){t.split(/\\s+/).forEach((t=>t&&e.classList.add(t))),(e._vtc||(e._vtc=new Set)).add(t)}function Pi(e,t){t.split(/\\s+/).forEach((t=>t&&e.classList.remove(t)));const{_vtc:n}=e;n&&(n.delete(t),n.size||(e._vtc=void 0))}function Mi(e){requestAnimationFrame((()=>{requestAnimationFrame(e)}))}let Vi=0;function Ii(e,t,n,o){const r=e._endId=++Vi,s=()=>{r===e._endId&&o()};if(n)return setTimeout(s,n);const{type:i,timeout:l,propCount:c}=Bi(e,t);if(!i)return o();const a=i+"end";let u=0;const p=()=>{e.removeEventListener(a,f),s()},f=t=>{t.target===e&&++u>=c&&p()};setTimeout((()=>{u<c&&p()}),l+1),e.addEventListener(a,f)}function Bi(e,t){const n=window.getComputedStyle(e),o=e=>(n[e]||"").split(", "),r=o("transitionDelay"),s=o("transitionDuration"),i=Li(r,s),l=o("animationDelay"),c=o("animationDuration"),a=Li(l,c);let u=null,p=0,f=0;"transition"===t?i>0&&(u="transition",p=i,f=s.length):"animation"===t?a>0&&(u="animation",p=a,f=c.length):(p=Math.max(i,a),u=p>0?i>a?"transition":"animation":null,f=u?"transition"===u?s.length:c.length:0);return{type:u,timeout:p,propCount:f,hasTransform:"transition"===u&&/\\b(transform|all)(,|$)/.test(n.transitionProperty)}}function Li(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map(((t,n)=>ji(t)+ji(e[n]))))}function ji(e){return 1e3*Number(e.slice(0,-1).replace(",","."))}function Ui(){return document.body.offsetHeight}const Di=new WeakMap,Hi=new WeakMap,Wi={name:"TransitionGroup",props:k({},Ei,{tag:String,moveClass:String}),setup(e,{slots:t}){const n=Ss(),o=to();let r,s;return $o((()=>{if(!r.length)return;const t=e.moveClass||`${e.name||"v"}-move`;if(!function(e,t,n){const o=e.cloneNode();e._vtc&&e._vtc.forEach((e=>{e.split(/\\s+/).forEach((e=>e&&o.classList.remove(e)))}));n.split(/\\s+/).forEach((e=>e&&o.classList.add(e))),o.style.display="none";const r=1===t.nodeType?t:t.parentNode;r.appendChild(o);const{hasTransform:s}=Bi(o);return r.removeChild(o),s}(r[0].el,n.vnode.el,t))return;r.forEach(zi),r.forEach(Ki);const o=r.filter(Gi);Ui(),o.forEach((e=>{const n=e.el,o=n.style;Ai(n,t),o.transform=o.webkitTransform=o.transitionDuration="";const r=n._moveCb=e=>{e&&e.target!==n||e&&!/transform$/.test(e.propertyName)||(n.removeEventListener("transitionend",r),n._moveCb=null,Pi(n,t))};n.addEventListener("transitionend",r)}))})),()=>{const i=wt(e),l=Ri(i);let c=i.tag||Ur;r=s,s=t.default?ao(t.default()):[];for(let e=0;e<s.length;e++){const t=s[e];null!=t.key&&co(t,so(t,l,o,n))}if(r)for(let e=0;e<r.length;e++){const t=r[e];co(t,so(t,l,o,n)),Di.set(t,t.el.getBoundingClientRect())}return ls(c,null,s)}}};function zi(e){const t=e.el;t._moveCb&&t._moveCb(),t._enterCb&&t._enterCb()}function Ki(e){Hi.set(e,e.el.getBoundingClientRect())}function Gi(e){const t=Di.get(e),n=Hi.get(e),o=t.left-n.left,r=t.top-n.top;if(o||r){const t=e.el.style;return t.transform=t.webkitTransform=`translate(${o}px,${r}px)`,t.transitionDuration="0s",e}}const qi=e=>{const t=e.props["onUpdate:modelValue"]||!1;return E(t)?e=>Y(t,e):t};function Ji(e){e.target.composing=!0}function Zi(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const Yi={created(e,{modifiers:{lazy:t,trim:n,number:o}},r){e._assign=qi(r);const s=o||r.props&&"number"===r.props.type;fi(e,t?"change":"input",(t=>{if(t.target.composing)return;let o=e.value;n&&(o=o.trim()),s&&(o=X(o)),e._assign(o)})),n&&fi(e,"change",(()=>{e.value=e.value.trim()})),t||(fi(e,"compositionstart",Ji),fi(e,"compositionend",Zi),fi(e,"change",Zi))},mounted(e,{value:t}){e.value=null==t?"":t},beforeUpdate(e,{value:t,modifiers:{lazy:n,trim:o,number:r}},s){if(e._assign=qi(s),e.composing)return;if(document.activeElement===e&&"range"!==e.type){if(n)return;if(o&&e.value.trim()===t)return;if((r||"number"===e.type)&&X(e.value)===t)return}const i=null==t?"":t;e.value!==i&&(e.value=i)}},Qi={deep:!0,created(e,t,n){e._assign=qi(n),fi(e,"change",(()=>{const t=e._modelValue,n=ol(e),o=e.checked,r=e._assign;if(E(t)){const e=h(t,n),s=-1!==e;if(o&&!s)r(t.concat(n));else if(!o&&s){const n=[...t];n.splice(e,1),r(n)}}else if(O(t)){const e=new Set(t);o?e.add(n):e.delete(n),r(e)}else r(rl(e,o))}))},mounted:Xi,beforeUpdate(e,t,n){e._assign=qi(n),Xi(e,t,n)}};function Xi(e,{value:t,oldValue:n},o){e._modelValue=t,E(t)?e.checked=h(t,o.props.value)>-1:O(t)?e.checked=t.has(o.props.value):t!==n&&(e.checked=d(t,rl(e,!0)))}const el={created(e,{value:t},n){e.checked=d(t,n.props.value),e._assign=qi(n),fi(e,"change",(()=>{e._assign(ol(e))}))},beforeUpdate(e,{value:t,oldValue:n},o){e._assign=qi(o),t!==n&&(e.checked=d(t,o.props.value))}},tl={deep:!0,created(e,{value:t,modifiers:{number:n}},o){const r=O(t);fi(e,"change",(()=>{const t=Array.prototype.filter.call(e.options,(e=>e.selected)).map((e=>n?X(ol(e)):ol(e)));e._assign(e.multiple?r?new Set(t):t:t[0])})),e._assign=qi(o)},mounted(e,{value:t}){nl(e,t)},beforeUpdate(e,t,n){e._assign=qi(n)},updated(e,{value:t}){nl(e,t)}};function nl(e,t){const n=e.multiple;if(!n||E(t)||O(t)){for(let o=0,r=e.options.length;o<r;o++){const r=e.options[o],s=ol(r);if(n)r.selected=E(t)?h(t,s)>-1:t.has(s);else if(d(ol(r),t))return void(e.selectedIndex!==o&&(e.selectedIndex=o))}n||-1===e.selectedIndex||(e.selectedIndex=-1)}}function ol(e){return"_value"in e?e._value:e.value}function rl(e,t){const n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}const sl={created(e,t,n){il(e,t,n,null,"created")},mounted(e,t,n){il(e,t,n,null,"mounted")},beforeUpdate(e,t,n,o){il(e,t,n,o,"beforeUpdate")},updated(e,t,n,o){il(e,t,n,o,"updated")}};function il(e,t,n,o,r){const s=function(e,t){switch(e){case"SELECT":return tl;case"TEXTAREA":return Yi;default:switch(t){case"checkbox":return Qi;case"radio":return el;default:return Yi}}}(e.tagName,n.props&&n.props.type)[r];s&&s(e,t,n,o)}const ll=["ctrl","shift","alt","meta"],cl={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&0!==e.button,middle:e=>"button"in e&&1!==e.button,right:e=>"button"in e&&2!==e.button,exact:(e,t)=>ll.some((n=>e[`${n}Key`]&&!t.includes(n)))},al=(e,t)=>(n,...o)=>{for(let e=0;e<t.length;e++){const o=cl[t[e]];if(o&&o(n,t))return}return e(n,...o)},ul={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},pl=(e,t)=>n=>{if(!("key"in n))return;const o=G(n.key);return t.some((e=>e===o||ul[e]===o))?e(n):void 0},fl={beforeMount(e,{value:t},{transition:n}){e._vod="none"===e.style.display?"":e.style.display,n&&t?n.beforeEnter(e):dl(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:o}){!t!=!n&&(o?t?(o.beforeEnter(e),dl(e,!0),o.enter(e)):o.leave(e,(()=>{dl(e,!1)})):dl(e,t))},beforeUnmount(e,{value:t}){dl(e,t)}};function dl(e,t){e.style.display=t?e._vod:"none"}const hl=k({patchProp:(e,t,r,s,i=!1,l,c,a,u)=>{"class"===t?function(e,t,n){const o=e._vtc;o&&(t=(t?[t,...o]:[...o]).join(" ")),null==t?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}(e,s,i):"style"===t?function(e,t,n){const o=e.style,r=A(n);if(n&&!r){for(const e in n)ci(o,e,n[e]);if(t&&!A(t))for(const e in t)null==n[e]&&ci(o,e,"")}else{const s=o.display;r?t!==n&&(o.cssText=n):t&&e.removeAttribute("style"),"_vod"in e&&(o.display=s)}}(e,r,s):x(t)?C(t)||di(e,t,0,s,c):("."===t[0]?(t=t.slice(1),1):"^"===t[0]?(t=t.slice(1),0):function(e,t,n,o){if(o)return"innerHTML"===t||"textContent"===t||!!(t in e&&vi.test(t)&&F(n));if("spellcheck"===t||"draggable"===t||"translate"===t)return!1;if("form"===t)return!1;if("list"===t&&"INPUT"===e.tagName)return!1;if("type"===t&&"TEXTAREA"===e.tagName)return!1;if(vi.test(t)&&A(n))return!1;return t in e}(e,t,s,i))?function(e,t,n,r,s,i,l){if("innerHTML"===t||"textContent"===t)return r&&l(r,s,i),void(e[t]=null==n?"":n);if("value"===t&&"PROGRESS"!==e.tagName&&!e.tagName.includes("-")){e._value=n;const o=null==n?"":n;return e.value===o&&"OPTION"!==e.tagName||(e.value=o),void(null==n&&e.removeAttribute(t))}let c=!1;if(""===n||null==n){const r=typeof e[t];"boolean"===r?n=o(n):null==n&&"string"===r?(n="",c=!0):"number"===r&&(n=0,c=!0)}try{e[t]=n}catch(a){}c&&e.removeAttribute(t)}(e,t,s,l,c,a,u):("true-value"===t?e._trueValue=s:"false-value"===t&&(e._falseValue=s),function(e,t,r,s,i){if(s&&t.startsWith("xlink:"))null==r?e.removeAttributeNS(pi,t.slice(6,t.length)):e.setAttributeNS(pi,t,r);else{const s=n(t);null==r||s&&!o(r)?e.removeAttribute(t):e.setAttribute(t,s?"":r)}}(e,t,s,i))}},ii);let ml,gl=!1;function vl(){return ml||(ml=Rr(hl))}function yl(){return ml=gl?ml:Fr(hl),gl=!0,ml}const _l=(...e)=>{vl().render(...e)},bl=(...e)=>{yl().hydrate(...e)},Sl=(...e)=>{const t=vl().createApp(...e),{mount:n}=t;return t.mount=e=>{const o=Cl(e);if(!o)return;const r=t._component;F(r)||r.render||r.template||(r.template=o.innerHTML),o.innerHTML="";const s=n(o,!1,o instanceof SVGElement);return o instanceof Element&&(o.removeAttribute("v-cloak"),o.setAttribute("data-v-app","")),s},t},xl=(...e)=>{const t=yl().createApp(...e),{mount:n}=t;return t.mount=e=>{const t=Cl(e);if(t)return n(t,!0,t instanceof SVGElement)},t};function Cl(e){if(A(e)){return document.querySelector(e)}return e}const kl=_;var wl=Object.freeze({__proto__:null,render:_l,hydrate:bl,createApp:Sl,createSSRApp:xl,initDirectivesForSSR:kl,defineCustomElement:yi,defineSSRCustomElement:_i,VueElement:Si,useCssModule:xi,useCssVars:Ci,Transition:Ti,TransitionGroup:Wi,vModelText:Yi,vModelCheckbox:Qi,vModelRadio:el,vModelSelect:tl,vModelDynamic:sl,withModifiers:al,withKeys:pl,vShow:fl,reactive:gt,ref:Ft,readonly:yt,unref:It,proxyRefs:Lt,isRef:Rt,toRef:Wt,toRefs:Dt,isProxy:kt,isReactive:St,isReadonly:xt,isShallow:Ct,customRef:Ut,triggerRef:Vt,shallowRef:At,shallowReactive:vt,shallowReadonly:_t,markRaw:Tt,toRaw:wt,effect:ye,stop:_e,ReactiveEffect:ge,effectScope:oe,EffectScope:ne,getCurrentScope:se,onScopeDispose:ie,computed:Is,watch:Zn,watchEffect:Kn,watchPostEffect:Gn,watchSyncEffect:qn,onBeforeMount:To,onMounted:No,onBeforeUpdate:Eo,onUpdated:$o,onBeforeUnmount:Oo,onUnmounted:Ro,onActivated:yo,onDeactivated:_o,onRenderTracked:Po,onRenderTriggered:Ao,onErrorCaptured:Mo,onServerPrefetch:Fo,provide:Wn,inject:zn,nextTick:un,defineComponent:uo,defineAsyncComponent:fo,useAttrs:Hs,useSlots:Ds,defineProps:Bs,defineEmits:Ls,defineExpose:js,withDefaults:Us,mergeDefaults:zs,createPropsRestProxy:Ks,withAsyncContext:Gs,getCurrentInstance:Ss,h:qs,createVNode:ls,cloneVNode:as,mergeProps:gs,isVNode:es,Fragment:Ur,Text:Dr,Comment:Hr,Static:Wr,Teleport:jr,Suspense:Bn,KeepAlive:go,BaseTransition:oo,withDirectives:Vo,useSSRContext:Zs,ssrContextKey:Js,createRenderer:Rr,createHydrationRenderer:Fr,queuePostFlushCb:dn,warn:qt,handleError:Xt,callWithErrorHandling:Yt,callWithAsyncErrorHandling:Qt,resolveComponent:Bo,resolveDirective:Uo,resolveDynamicComponent:jo,registerRuntimeCompiler:$s,isRuntimeOnly:Os,useTransitionState:to,resolveTransitionHooks:so,setTransitionHooks:co,getTransitionRawChildren:ao,initCustomFormatter:Ys,get devtools(){return _n},setDevtoolsHook:Sn,withCtx:Rn,pushScopeId:En,popScopeId:$n,withScopeId:On,renderList:Wo,toHandlers:qo,renderSlot:Ko,createSlots:zo,withMemo:Qs,isMemoSame:Xs,openBlock:Gr,createBlock:Xr,setBlockTracking:Zr,createTextVNode:us,createCommentVNode:fs,createStaticVNode:ps,createElementVNode:is,createElementBlock:Qr,guardReactiveProps:cs,toDisplayString:m,camelize:z,capitalize:q,toHandlerKey:J,normalizeProps:a,normalizeClass:c,normalizeStyle:r,transformVNodeArgs:ns,version:ei,ssrUtils:null,resolveFilter:null,compatUtils:null});function Tl(e){throw e}function Nl(e){}function El(e,t,n,o){const r=new SyntaxError(String(e));return r.code=e,r.loc=t,r}const $l=Symbol(""),Ol=Symbol(""),Rl=Symbol(""),Fl=Symbol(""),Al=Symbol(""),Pl=Symbol(""),Ml=Symbol(""),Vl=Symbol(""),Il=Symbol(""),Bl=Symbol(""),Ll=Symbol(""),jl=Symbol(""),Ul=Symbol(""),Dl=Symbol(""),Hl=Symbol(""),Wl=Symbol(""),zl=Symbol(""),Kl=Symbol(""),Gl=Symbol(""),ql=Symbol(""),Jl=Symbol(""),Zl=Symbol(""),Yl=Symbol(""),Ql=Symbol(""),Xl=Symbol(""),ec=Symbol(""),tc=Symbol(""),nc=Symbol(""),oc=Symbol(""),rc=Symbol(""),sc=Symbol(""),ic=Symbol(""),lc=Symbol(""),cc=Symbol(""),ac=Symbol(""),uc=Symbol(""),pc=Symbol(""),fc=Symbol(""),dc=Symbol(""),hc={[$l]:"Fragment",[Ol]:"Teleport",[Rl]:"Suspense",[Fl]:"KeepAlive",[Al]:"BaseTransition",[Pl]:"openBlock",[Ml]:"createBlock",[Vl]:"createElementBlock",[Il]:"createVNode",[Bl]:"createElementVNode",[Ll]:"createCommentVNode",[jl]:"createTextVNode",[Ul]:"createStaticVNode",[Dl]:"resolveComponent",[Hl]:"resolveDynamicComponent",[Wl]:"resolveDirective",[zl]:"resolveFilter",[Kl]:"withDirectives",[Gl]:"renderList",[ql]:"renderSlot",[Jl]:"createSlots",[Zl]:"toDisplayString",[Yl]:"mergeProps",[Ql]:"normalizeClass",[Xl]:"normalizeStyle",[ec]:"normalizeProps",[tc]:"guardReactiveProps",[nc]:"toHandlers",[oc]:"camelize",[rc]:"capitalize",[sc]:"toHandlerKey",[ic]:"setBlockTracking",[lc]:"pushScopeId",[cc]:"popScopeId",[ac]:"withCtx",[uc]:"unref",[pc]:"isRef",[fc]:"withMemo",[dc]:"isMemoSame"};const mc={source:"",start:{line:1,column:1,offset:0},end:{line:1,column:1,offset:0}};function gc(e,t,n,o,r,s,i,l=!1,c=!1,a=!1,u=mc){return e&&(l?(e.helper(Pl),e.helper(zc(e.inSSR,a))):e.helper(Wc(e.inSSR,a)),i&&e.helper(Kl)),{type:13,tag:t,props:n,children:o,patchFlag:r,dynamicProps:s,directives:i,isBlock:l,disableTracking:c,isComponent:a,loc:u}}function vc(e,t=mc){return{type:17,loc:t,elements:e}}function yc(e,t=mc){return{type:15,loc:t,properties:e}}function _c(e,t){return{type:16,loc:mc,key:A(e)?bc(e,!0):e,value:t}}function bc(e,t=!1,n=mc,o=0){return{type:4,loc:n,content:e,isStatic:t,constType:t?3:o}}function Sc(e,t=mc){return{type:8,loc:t,children:e}}function xc(e,t=[],n=mc){return{type:14,loc:n,callee:e,arguments:t}}function Cc(e,t,n=!1,o=!1,r=mc){return{type:18,params:e,returns:t,newline:n,isSlot:o,loc:r}}function kc(e,t,n,o=!0){return{type:19,test:e,consequent:t,alternate:n,newline:o,loc:mc}}const wc=e=>4===e.type&&e.isStatic,Tc=(e,t)=>e===t||e===G(t);function Nc(e){return Tc(e,"Teleport")?Ol:Tc(e,"Suspense")?Rl:Tc(e,"KeepAlive")?Fl:Tc(e,"BaseTransition")?Al:void 0}const Ec=/^\\d|[^\\$\\w]/,$c=e=>!Ec.test(e),Oc=/[A-Za-z_$\\xA0-\\uFFFF]/,Rc=/[\\.\\?\\w$\\xA0-\\uFFFF]/,Fc=/\\s+[.[]\\s*|\\s*[.[]\\s+/g,Ac=e=>{e=e.trim().replace(Fc,(e=>e.trim()));let t=0,n=[],o=0,r=0,s=null;for(let i=0;i<e.length;i++){const l=e.charAt(i);switch(t){case 0:if("["===l)n.push(t),t=1,o++;else if("("===l)n.push(t),t=2,r++;else if(!(0===i?Oc:Rc).test(l))return!1;break;case 1:"\'"===l||\'"\'===l||"`"===l?(n.push(t),t=3,s=l):"["===l?o++:"]"===l&&(--o||(t=n.pop()));break;case 2:if("\'"===l||\'"\'===l||"`"===l)n.push(t),t=3,s=l;else if("("===l)r++;else if(")"===l){if(i===e.length-1)return!1;--r||(t=n.pop())}break;case 3:l===s&&(t=n.pop(),s=null)}}return!o&&!r};function Pc(e,t,n){const o={source:e.source.slice(t,t+n),start:Mc(e.start,e.source,t),end:e.end};return null!=n&&(o.end=Mc(e.start,e.source,t+n)),o}function Mc(e,t,n=t.length){return Vc(k({},e),t,n)}function Vc(e,t,n=t.length){let o=0,r=-1;for(let s=0;s<n;s++)10===t.charCodeAt(s)&&(o++,r=s);return e.offset+=n,e.line+=o,e.column=-1===r?e.column+n:n-r,e}function Ic(e,t,n=!1){for(let o=0;o<e.props.length;o++){const r=e.props[o];if(7===r.type&&(n||r.exp)&&(A(t)?r.name===t:t.test(r.name)))return r}}function Bc(e,t,n=!1,o=!1){for(let r=0;r<e.props.length;r++){const s=e.props[r];if(6===s.type){if(n)continue;if(s.name===t&&(s.value||o))return s}else if("bind"===s.name&&(s.exp||o)&&Lc(s.arg,t))return s}}function Lc(e,t){return!(!e||!wc(e)||e.content!==t)}function jc(e){return 5===e.type||2===e.type}function Uc(e){return 7===e.type&&"slot"===e.name}function Dc(e){return 1===e.type&&3===e.tagType}function Hc(e){return 1===e.type&&2===e.tagType}function Wc(e,t){return e||t?Il:Bl}function zc(e,t){return e||t?Ml:Vl}const Kc=new Set([ec,tc]);function Gc(e,t=[]){if(e&&!A(e)&&14===e.type){const n=e.callee;if(!A(n)&&Kc.has(n))return Gc(e.arguments[0],t.concat(e))}return[e,t]}function qc(e,t,n){let o,r,s=13===e.type?e.props:e.arguments[2],i=[];if(s&&!A(s)&&14===s.type){const e=Gc(s);s=e[0],i=e[1],r=i[i.length-1]}if(null==s||A(s))o=yc([t]);else if(14===s.type){const e=s.arguments[0];A(e)||15!==e.type?s.callee===nc?o=xc(n.helper(Yl),[yc([t]),s]):s.arguments.unshift(yc([t])):e.properties.unshift(t),!o&&(o=s)}else if(15===s.type){let e=!1;if(4===t.key.type){const n=t.key.content;e=s.properties.some((e=>4===e.key.type&&e.key.content===n))}e||s.properties.unshift(t),o=s}else o=xc(n.helper(Yl),[yc([t]),s]),r&&r.callee===tc&&(r=i[i.length-2]);13===e.type?r?r.arguments[0]=o:e.props=o:r?r.arguments[0]=o:e.arguments[2]=o}function Jc(e,t){return`_${t}_${e.replace(/[^\\w]/g,((t,n)=>"-"===t?"_":e.charCodeAt(n).toString()))}`}function Zc(e,{helper:t,removeHelper:n,inSSR:o}){e.isBlock||(e.isBlock=!0,n(Wc(o,e.isComponent)),t(Pl),t(zc(o,e.isComponent)))}const Yc=/&(gt|lt|amp|apos|quot);/g,Qc={gt:">",lt:"<",amp:"&",apos:"\'",quot:\'"\'},Xc={delimiters:["{{","}}"],getNamespace:()=>0,getTextMode:()=>0,isVoidTag:b,isPreTag:b,isCustomElement:b,decodeEntities:e=>e.replace(Yc,((e,t)=>Qc[t])),onError:Tl,onWarn:Nl,comments:!1};function ea(e,t={}){const n=function(e,t){const n=k({},Xc);let o;for(o in t)n[o]=void 0===t[o]?Xc[o]:t[o];return{options:n,column:1,line:1,offset:0,originalSource:e,source:e,inPre:!1,inVPre:!1,onWarn:n.onWarn}}(e,t),o=ha(n);return function(e,t=mc){return{type:0,children:e,helpers:[],components:[],directives:[],hoists:[],imports:[],cached:0,temps:0,codegenNode:void 0,loc:t}}(ta(n,0,[]),ma(n,o))}function ta(e,t,n){const o=ga(n),r=o?o.ns:0,s=[];for(;!Sa(e,t,n);){const i=e.source;let l;if(0===t||1===t)if(!e.inVPre&&va(i,e.options.delimiters[0]))l=pa(e,t);else if(0===t&&"<"===i[0])if(1===i.length);else if("!"===i[1])l=va(i,"\\x3c!--")?ra(e):va(i,"<!DOCTYPE")?sa(e):va(i,"<![CDATA[")&&0!==r?oa(e,n):sa(e);else if("/"===i[1])if(2===i.length);else{if(">"===i[2]){ya(e,3);continue}if(/[a-z]/i.test(i[2])){ca(e,1,o);continue}l=sa(e)}else/[a-z]/i.test(i[1])?l=ia(e,n):"?"===i[1]&&(l=sa(e));if(l||(l=fa(e,t)),E(l))for(let e=0;e<l.length;e++)na(s,l[e]);else na(s,l)}let i=!1;if(2!==t&&1!==t){const t="preserve"!==e.options.whitespace;for(let n=0;n<s.length;n++){const o=s[n];if(2===o.type)if(e.inPre)o.content=o.content.replace(/\\r\\n/g,"\\n");else if(/[^\\t\\r\\n\\f ]/.test(o.content))t&&(o.content=o.content.replace(/[\\t\\r\\n\\f ]+/g," "));else{const e=s[n-1],r=s[n+1];!e||!r||t&&(3===e.type||3===r.type||1===e.type&&1===r.type&&/[\\r\\n]/.test(o.content))?(i=!0,s[n]=null):o.content=" "}else 3!==o.type||e.options.comments||(i=!0,s[n]=null)}if(e.inPre&&o&&e.options.isPreTag(o.tag)){const e=s[0];e&&2===e.type&&(e.content=e.content.replace(/^\\r?\\n/,""))}}return i?s.filter(Boolean):s}function na(e,t){if(2===t.type){const n=ga(e);if(n&&2===n.type&&n.loc.end.offset===t.loc.start.offset)return n.content+=t.content,n.loc.end=t.loc.end,void(n.loc.source+=t.loc.source)}e.push(t)}function oa(e,t){ya(e,9);const n=ta(e,3,t);return 0===e.source.length||ya(e,3),n}function ra(e){const t=ha(e);let n;const o=/--(\\!)?>/.exec(e.source);if(o){n=e.source.slice(4,o.index);const t=e.source.slice(0,o.index);let r=1,s=0;for(;-1!==(s=t.indexOf("\\x3c!--",r));)ya(e,s-r+1),r=s+1;ya(e,o.index+o[0].length-r+1)}else n=e.source.slice(4),ya(e,e.source.length);return{type:3,content:n,loc:ma(e,t)}}function sa(e){const t=ha(e),n="?"===e.source[1]?1:2;let o;const r=e.source.indexOf(">");return-1===r?(o=e.source.slice(n),ya(e,e.source.length)):(o=e.source.slice(n,r),ya(e,r+1)),{type:3,content:o,loc:ma(e,t)}}function ia(e,t){const n=e.inPre,o=e.inVPre,r=ga(t),s=ca(e,0,r),i=e.inPre&&!n,l=e.inVPre&&!o;if(s.isSelfClosing||e.options.isVoidTag(s.tag))return i&&(e.inPre=!1),l&&(e.inVPre=!1),s;t.push(s);const c=e.options.getTextMode(s,r),a=ta(e,c,t);if(t.pop(),s.children=a,xa(e.source,s.tag))ca(e,1,r);else if(0===e.source.length&&"script"===s.tag.toLowerCase()){const e=a[0];e&&va(e.loc.source,"\\x3c!--")}return s.loc=ma(e,s.loc.start),i&&(e.inPre=!1),l&&(e.inVPre=!1),s}const la=e("if,else,else-if,for,slot");function ca(e,t,n){const o=ha(e),r=/^<\\/?([a-z][^\\t\\r\\n\\f />]*)/i.exec(e.source),s=r[1],i=e.options.getNamespace(s,n);ya(e,r[0].length),_a(e);const l=ha(e),c=e.source;e.options.isPreTag(s)&&(e.inPre=!0);let a=aa(e,t);0===t&&!e.inVPre&&a.some((e=>7===e.type&&"pre"===e.name))&&(e.inVPre=!0,k(e,l),e.source=c,a=aa(e,t).filter((e=>"v-pre"!==e.name)));let u=!1;if(0===e.source.length||(u=va(e.source,"/>"),ya(e,u?2:1)),1===t)return;let p=0;return e.inVPre||("slot"===s?p=2:"template"===s?a.some((e=>7===e.type&&la(e.name)))&&(p=3):function(e,t,n){const o=n.options;if(o.isCustomElement(e))return!1;if("component"===e||/^[A-Z]/.test(e)||Nc(e)||o.isBuiltInComponent&&o.isBuiltInComponent(e)||o.isNativeTag&&!o.isNativeTag(e))return!0;for(let r=0;r<t.length;r++){const e=t[r];if(6===e.type){if("is"===e.name&&e.value&&e.value.content.startsWith("vue:"))return!0}else{if("is"===e.name)return!0;"bind"===e.name&&Lc(e.arg,"is")}}}(s,a,e)&&(p=1)),{type:1,ns:i,tag:s,tagType:p,props:a,isSelfClosing:u,children:[],loc:ma(e,o),codegenNode:void 0}}function aa(e,t){const n=[],o=new Set;for(;e.source.length>0&&!va(e.source,">")&&!va(e.source,"/>");){if(va(e.source,"/")){ya(e,1),_a(e);continue}const r=ua(e,o);6===r.type&&r.value&&"class"===r.name&&(r.value.content=r.value.content.replace(/\\s+/g," ").trim()),0===t&&n.push(r),/^[^\\t\\r\\n\\f />]/.test(e.source),_a(e)}return n}function ua(e,t){const n=ha(e),o=/^[^\\t\\r\\n\\f />][^\\t\\r\\n\\f />=]*/.exec(e.source)[0];t.has(o),t.add(o);{const e=/["\'<]/g;let t;for(;t=e.exec(o););}let r;ya(e,o.length),/^[\\t\\r\\n\\f ]*=/.test(e.source)&&(_a(e),ya(e,1),_a(e),r=function(e){const t=ha(e);let n;const o=e.source[0],r=\'"\'===o||"\'"===o;if(r){ya(e,1);const t=e.source.indexOf(o);-1===t?n=da(e,e.source.length,4):(n=da(e,t,4),ya(e,1))}else{const t=/^[^\\t\\r\\n\\f >]+/.exec(e.source);if(!t)return;const o=/["\'<=`]/g;let r;for(;r=o.exec(t[0]););n=da(e,t[0].length,4)}return{content:n,isQuoted:r,loc:ma(e,t)}}(e));const s=ma(e,n);if(!e.inVPre&&/^(v-[A-Za-z0-9-]|:|\\.|@|#)/.test(o)){const t=/(?:^v-([a-z0-9-]+))?(?:(?::|^\\.|^@|^#)(\\[[^\\]]+\\]|[^\\.]+))?(.+)?$/i.exec(o);let i,l=va(o,"."),c=t[1]||(l||va(o,":")?"bind":va(o,"@")?"on":"slot");if(t[2]){const r="slot"===c,s=o.lastIndexOf(t[2]),l=ma(e,ba(e,n,s),ba(e,n,s+t[2].length+(r&&t[3]||"").length));let a=t[2],u=!0;a.startsWith("[")?(u=!1,a=a.endsWith("]")?a.slice(1,a.length-1):a.slice(1)):r&&(a+=t[3]||""),i={type:4,content:a,isStatic:u,constType:u?3:0,loc:l}}if(r&&r.isQuoted){const e=r.loc;e.start.offset++,e.start.column++,e.end=Mc(e.start,r.content),e.source=e.source.slice(1,-1)}const a=t[3]?t[3].slice(1).split("."):[];return l&&a.push("prop"),{type:7,name:c,exp:r&&{type:4,content:r.content,isStatic:!1,constType:0,loc:r.loc},arg:i,modifiers:a,loc:s}}return!e.inVPre&&va(o,"v-"),{type:6,name:o,value:r&&{type:2,content:r.content,loc:r.loc},loc:s}}function pa(e,t){const[n,o]=e.options.delimiters,r=e.source.indexOf(o,n.length);if(-1===r)return;const s=ha(e);ya(e,n.length);const i=ha(e),l=ha(e),c=r-n.length,a=e.source.slice(0,c),u=da(e,c,t),p=u.trim(),f=u.indexOf(p);f>0&&Vc(i,a,f);return Vc(l,a,c-(u.length-p.length-f)),ya(e,o.length),{type:5,content:{type:4,isStatic:!1,constType:0,content:p,loc:ma(e,i,l)},loc:ma(e,s)}}function fa(e,t){const n=3===t?["]]>"]:["<",e.options.delimiters[0]];let o=e.source.length;for(let s=0;s<n.length;s++){const t=e.source.indexOf(n[s],1);-1!==t&&o>t&&(o=t)}const r=ha(e);return{type:2,content:da(e,o,t),loc:ma(e,r)}}function da(e,t,n){const o=e.source.slice(0,t);return ya(e,t),2!==n&&3!==n&&o.includes("&")?e.options.decodeEntities(o,4===n):o}function ha(e){const{column:t,line:n,offset:o}=e;return{column:t,line:n,offset:o}}function ma(e,t,n){return{start:t,end:n=n||ha(e),source:e.originalSource.slice(t.offset,n.offset)}}function ga(e){return e[e.length-1]}function va(e,t){return e.startsWith(t)}function ya(e,t){const{source:n}=e;Vc(e,n,t),e.source=n.slice(t)}function _a(e){const t=/^[\\t\\r\\n\\f ]+/.exec(e.source);t&&ya(e,t[0].length)}function ba(e,t,n){return Mc(t,e.originalSource.slice(t.offset,n),n)}function Sa(e,t,n){const o=e.source;switch(t){case 0:if(va(o,"</"))for(let e=n.length-1;e>=0;--e)if(xa(o,n[e].tag))return!0;break;case 1:case 2:{const e=ga(n);if(e&&xa(o,e.tag))return!0;break}case 3:if(va(o,"]]>"))return!0}return!o}function xa(e,t){return va(e,"</")&&e.slice(2,2+t.length).toLowerCase()===t.toLowerCase()&&/[\\t\\r\\n\\f />]/.test(e[2+t.length]||">")}function Ca(e,t){wa(e,t,ka(e,e.children[0]))}function ka(e,t){const{children:n}=e;return 1===n.length&&1===t.type&&!Hc(t)}function wa(e,t,n=!1){const{children:o}=e,r=o.length;let s=0;for(let i=0;i<o.length;i++){const e=o[i];if(1===e.type&&0===e.tagType){const o=n?0:Ta(e,t);if(o>0){if(o>=2){e.codegenNode.patchFlag="-1",e.codegenNode=t.hoist(e.codegenNode),s++;continue}}else{const n=e.codegenNode;if(13===n.type){const o=Ra(n);if((!o||512===o||1===o)&&$a(e,t)>=2){const o=Oa(e);o&&(n.props=t.hoist(o))}n.dynamicProps&&(n.dynamicProps=t.hoist(n.dynamicProps))}}}if(1===e.type){const n=1===e.tagType;n&&t.scopes.vSlot++,wa(e,t),n&&t.scopes.vSlot--}else if(11===e.type)wa(e,t,1===e.children.length);else if(9===e.type)for(let n=0;n<e.branches.length;n++)wa(e.branches[n],t,1===e.branches[n].children.length)}s&&t.transformHoist&&t.transformHoist(o,t,e),s&&s===r&&1===e.type&&0===e.tagType&&e.codegenNode&&13===e.codegenNode.type&&E(e.codegenNode.children)&&(e.codegenNode.children=t.hoist(vc(e.codegenNode.children)))}function Ta(e,t){const{constantCache:n}=t;switch(e.type){case 1:if(0!==e.tagType)return 0;const o=n.get(e);if(void 0!==o)return o;const r=e.codegenNode;if(13!==r.type)return 0;if(r.isBlock&&"svg"!==e.tag&&"foreignObject"!==e.tag)return 0;if(Ra(r))return n.set(e,0),0;{let o=3;const s=$a(e,t);if(0===s)return n.set(e,0),0;s<o&&(o=s);for(let r=0;r<e.children.length;r++){const s=Ta(e.children[r],t);if(0===s)return n.set(e,0),0;s<o&&(o=s)}if(o>1)for(let r=0;r<e.props.length;r++){const s=e.props[r];if(7===s.type&&"bind"===s.name&&s.exp){const r=Ta(s.exp,t);if(0===r)return n.set(e,0),0;r<o&&(o=r)}}if(r.isBlock){for(let t=0;t<e.props.length;t++){if(7===e.props[t].type)return n.set(e,0),0}t.removeHelper(Pl),t.removeHelper(zc(t.inSSR,r.isComponent)),r.isBlock=!1,t.helper(Wc(t.inSSR,r.isComponent))}return n.set(e,o),o}case 2:case 3:return 3;case 9:case 11:case 10:default:return 0;case 5:case 12:return Ta(e.content,t);case 4:return e.constType;case 8:let s=3;for(let n=0;n<e.children.length;n++){const o=e.children[n];if(A(o)||P(o))continue;const r=Ta(o,t);if(0===r)return 0;r<s&&(s=r)}return s}}const Na=new Set([Ql,Xl,ec,tc]);function Ea(e,t){if(14===e.type&&!A(e.callee)&&Na.has(e.callee)){const n=e.arguments[0];if(4===n.type)return Ta(n,t);if(14===n.type)return Ea(n,t)}return 0}function $a(e,t){let n=3;const o=Oa(e);if(o&&15===o.type){const{properties:e}=o;for(let o=0;o<e.length;o++){const{key:r,value:s}=e[o],i=Ta(r,t);if(0===i)return i;let l;if(i<n&&(n=i),l=4===s.type?Ta(s,t):14===s.type?Ea(s,t):0,0===l)return l;l<n&&(n=l)}}return n}function Oa(e){const t=e.codegenNode;if(13===t.type)return t.props}function Ra(e){const t=e.patchFlag;return t?parseInt(t,10):void 0}function Fa(e,{filename:t="",prefixIdentifiers:n=!1,hoistStatic:o=!1,cacheHandlers:r=!1,nodeTransforms:s=[],directiveTransforms:i={},transformHoist:l=null,isBuiltInComponent:c=_,isCustomElement:a=_,expressionPlugins:u=[],scopeId:p=null,slotted:f=!0,ssr:d=!1,inSSR:h=!1,ssrCssVars:m="",bindingMetadata:g=v,inline:y=!1,isTS:b=!1,onError:S=Tl,onWarn:x=Nl,compatConfig:C}){const k=t.replace(/\\?.*$/,"").match(/([^/\\\\]+)\\.\\w+$/),w={selfName:k&&q(z(k[1])),prefixIdentifiers:n,hoistStatic:o,cacheHandlers:r,nodeTransforms:s,directiveTransforms:i,transformHoist:l,isBuiltInComponent:c,isCustomElement:a,expressionPlugins:u,scopeId:p,slotted:f,ssr:d,inSSR:h,ssrCssVars:m,bindingMetadata:g,inline:y,isTS:b,onError:S,onWarn:x,compatConfig:C,root:e,helpers:new Map,components:new Set,directives:new Set,hoists:[],imports:[],constantCache:new Map,temps:0,cached:0,identifiers:Object.create(null),scopes:{vFor:0,vSlot:0,vPre:0,vOnce:0},parent:null,currentNode:e,childIndex:0,inVOnce:!1,helper(e){const t=w.helpers.get(e)||0;return w.helpers.set(e,t+1),e},removeHelper(e){const t=w.helpers.get(e);if(t){const n=t-1;n?w.helpers.set(e,n):w.helpers.delete(e)}},helperString:e=>`_${hc[w.helper(e)]}`,replaceNode(e){w.parent.children[w.childIndex]=w.currentNode=e},removeNode(e){const t=e?w.parent.children.indexOf(e):w.currentNode?w.childIndex:-1;e&&e!==w.currentNode?w.childIndex>t&&(w.childIndex--,w.onNodeRemoved()):(w.currentNode=null,w.onNodeRemoved()),w.parent.children.splice(t,1)},onNodeRemoved:()=>{},addIdentifiers(e){},removeIdentifiers(e){},hoist(e){A(e)&&(e=bc(e)),w.hoists.push(e);const t=bc(`_hoisted_${w.hoists.length}`,!1,e.loc,2);return t.hoisted=e,t},cache:(e,t=!1)=>function(e,t,n=!1){return{type:20,index:e,value:t,isVNode:n,loc:mc}}(w.cached++,e,t)};return w}function Aa(e,t){const n=Fa(e,t);Pa(e,n),t.hoistStatic&&Ca(e,n),t.ssr||function(e,t){const{helper:n}=t,{children:o}=e;if(1===o.length){const n=o[0];if(ka(e,n)&&n.codegenNode){const o=n.codegenNode;13===o.type&&Zc(o,t),e.codegenNode=o}else e.codegenNode=n}else if(o.length>1){let o=64;e.codegenNode=gc(t,n($l),void 0,e.children,o+"",void 0,void 0,!0,void 0,!1)}}(e,n),e.helpers=[...n.helpers.keys()],e.components=[...n.components],e.directives=[...n.directives],e.imports=n.imports,e.hoists=n.hoists,e.temps=n.temps,e.cached=n.cached}function Pa(e,t){t.currentNode=e;const{nodeTransforms:n}=t,o=[];for(let s=0;s<n.length;s++){const r=n[s](e,t);if(r&&(E(r)?o.push(...r):o.push(r)),!t.currentNode)return;e=t.currentNode}switch(e.type){case 3:t.ssr||t.helper(Ll);break;case 5:t.ssr||t.helper(Zl);break;case 9:for(let n=0;n<e.branches.length;n++)Pa(e.branches[n],t);break;case 10:case 11:case 1:case 0:!function(e,t){let n=0;const o=()=>{n--};for(;n<e.children.length;n++){const r=e.children[n];A(r)||(t.parent=e,t.childIndex=n,t.onNodeRemoved=o,Pa(r,t))}}(e,t)}t.currentNode=e;let r=o.length;for(;r--;)o[r]()}function Ma(e,t){const n=A(e)?t=>t===e:t=>e.test(t);return(e,o)=>{if(1===e.type){const{props:r}=e;if(3===e.tagType&&r.some(Uc))return;const s=[];for(let i=0;i<r.length;i++){const l=r[i];if(7===l.type&&n(l.name)){r.splice(i,1),i--;const n=t(e,l,o);n&&s.push(n)}}return s}}}const Va=e=>`${hc[e]}: _${hc[e]}`;function Ia(e,t={}){const n=function(e,{mode:t="function",prefixIdentifiers:n="module"===t,sourceMap:o=!1,filename:r="template.vue.html",scopeId:s=null,optimizeImports:i=!1,runtimeGlobalName:l="Vue",runtimeModuleName:c="vue",ssrRuntimeModuleName:a="vue/server-renderer",ssr:u=!1,isTS:p=!1,inSSR:f=!1}){const d={mode:t,prefixIdentifiers:n,sourceMap:o,filename:r,scopeId:s,optimizeImports:i,runtimeGlobalName:l,runtimeModuleName:c,ssrRuntimeModuleName:a,ssr:u,isTS:p,inSSR:f,source:e.loc.source,code:"",column:1,line:1,offset:0,indentLevel:0,pure:!1,map:void 0,helper:e=>`_${hc[e]}`,push(e,t){d.code+=e},indent(){h(++d.indentLevel)},deindent(e=!1){e?--d.indentLevel:h(--d.indentLevel)},newline(){h(d.indentLevel)}};function h(e){d.push("\\n"+"  ".repeat(e))}return d}(e,t);t.onContextCreated&&t.onContextCreated(n);const{mode:o,push:r,prefixIdentifiers:s,indent:i,deindent:l,newline:c,ssr:a}=n,u=e.helpers.length>0,p=!s&&"module"!==o;!function(e,t){const{push:n,newline:o,runtimeGlobalName:r}=t,s=r;if(e.helpers.length>0&&(n(`const _Vue = ${s}\\n`),e.hoists.length)){n(`const { ${[Il,Bl,Ll,jl,Ul].filter((t=>e.helpers.includes(t))).map(Va).join(", ")} } = _Vue\\n`)}(function(e,t){if(!e.length)return;t.pure=!0;const{push:n,newline:o}=t;o();for(let r=0;r<e.length;r++){const s=e[r];s&&(n(`const _hoisted_${r+1} = `),Ua(s,t),o())}t.pure=!1})(e.hoists,t),o(),n("return ")}(e,n);if(r(`function ${a?"ssrRender":"render"}(${(a?["_ctx","_push","_parent","_attrs"]:["_ctx","_cache"]).join(", ")}) {`),i(),p&&(r("with (_ctx) {"),i(),u&&(r(`const { ${e.helpers.map(Va).join(", ")} } = _Vue`),r("\\n"),c())),e.components.length&&(Ba(e.components,"component",n),(e.directives.length||e.temps>0)&&c()),e.directives.length&&(Ba(e.directives,"directive",n),e.temps>0&&c()),e.temps>0){r("let ");for(let t=0;t<e.temps;t++)r(`${t>0?", ":""}_temp${t}`)}return(e.components.length||e.directives.length||e.temps)&&(r("\\n"),c()),a||r("return "),e.codegenNode?Ua(e.codegenNode,n):r("null"),p&&(l(),r("}")),l(),r("}"),{ast:e,code:n.code,preamble:"",map:n.map?n.map.toJSON():void 0}}function Ba(e,t,{helper:n,push:o,newline:r,isTS:s}){const i=n("component"===t?Dl:Wl);for(let l=0;l<e.length;l++){let n=e[l];const c=n.endsWith("__self");c&&(n=n.slice(0,-6)),o(`const ${Jc(n,t)} = ${i}(${JSON.stringify(n)}${c?", true":""})${s?"!":""}`),l<e.length-1&&r()}}function La(e,t){const n=e.length>3||!1;t.push("["),n&&t.indent(),ja(e,t,n),n&&t.deindent(),t.push("]")}function ja(e,t,n=!1,o=!0){const{push:r,newline:s}=t;for(let i=0;i<e.length;i++){const l=e[i];A(l)?r(l):E(l)?La(l,t):Ua(l,t),i<e.length-1&&(n?(o&&r(","),s()):o&&r(", "))}}function Ua(e,t){if(A(e))t.push(e);else if(P(e))t.push(t.helper(e));else switch(e.type){case 1:case 9:case 11:case 12:Ua(e.codegenNode,t);break;case 2:!function(e,t){t.push(JSON.stringify(e.content),e)}(e,t);break;case 4:Da(e,t);break;case 5:!function(e,t){const{push:n,helper:o,pure:r}=t;r&&n("/*#__PURE__*/");n(`${o(Zl)}(`),Ua(e.content,t),n(")")}(e,t);break;case 8:Ha(e,t);break;case 3:!function(e,t){const{push:n,helper:o,pure:r}=t;r&&n("/*#__PURE__*/");n(`${o(Ll)}(${JSON.stringify(e.content)})`,e)}(e,t);break;case 13:!function(e,t){const{push:n,helper:o,pure:r}=t,{tag:s,props:i,children:l,patchFlag:c,dynamicProps:a,directives:u,isBlock:p,disableTracking:f,isComponent:d}=e;u&&n(o(Kl)+"(");p&&n(`(${o(Pl)}(${f?"true":""}), `);r&&n("/*#__PURE__*/");const h=p?zc(t.inSSR,d):Wc(t.inSSR,d);n(o(h)+"(",e),ja(function(e){let t=e.length;for(;t--&&null==e[t];);return e.slice(0,t+1).map((e=>e||"null"))}([s,i,l,c,a]),t),n(")"),p&&n(")");u&&(n(", "),Ua(u,t),n(")"))}(e,t);break;case 14:!function(e,t){const{push:n,helper:o,pure:r}=t,s=A(e.callee)?e.callee:o(e.callee);r&&n("/*#__PURE__*/");n(s+"(",e),ja(e.arguments,t),n(")")}(e,t);break;case 15:!function(e,t){const{push:n,indent:o,deindent:r,newline:s}=t,{properties:i}=e;if(!i.length)return void n("{}",e);const l=i.length>1||!1;n(l?"{":"{ "),l&&o();for(let c=0;c<i.length;c++){const{key:e,value:o}=i[c];Wa(e,t),n(": "),Ua(o,t),c<i.length-1&&(n(","),s())}l&&r(),n(l?"}":" }")}(e,t);break;case 17:!function(e,t){La(e.elements,t)}(e,t);break;case 18:!function(e,t){const{push:n,indent:o,deindent:r}=t,{params:s,returns:i,body:l,newline:c,isSlot:a}=e;a&&n(`_${hc[ac]}(`);n("(",e),E(s)?ja(s,t):s&&Ua(s,t);n(") => "),(c||l)&&(n("{"),o());i?(c&&n("return "),E(i)?La(i,t):Ua(i,t)):l&&Ua(l,t);(c||l)&&(r(),n("}"));a&&n(")")}(e,t);break;case 19:!function(e,t){const{test:n,consequent:o,alternate:r,newline:s}=e,{push:i,indent:l,deindent:c,newline:a}=t;if(4===n.type){const e=!$c(n.content);e&&i("("),Da(n,t),e&&i(")")}else i("("),Ua(n,t),i(")");s&&l(),t.indentLevel++,s||i(" "),i("? "),Ua(o,t),t.indentLevel--,s&&a(),s||i(" "),i(": ");const u=19===r.type;u||t.indentLevel++;Ua(r,t),u||t.indentLevel--;s&&c(!0)}(e,t);break;case 20:!function(e,t){const{push:n,helper:o,indent:r,deindent:s,newline:i}=t;n(`_cache[${e.index}] || (`),e.isVNode&&(r(),n(`${o(ic)}(-1),`),i());n(`_cache[${e.index}] = `),Ua(e.value,t),e.isVNode&&(n(","),i(),n(`${o(ic)}(1),`),i(),n(`_cache[${e.index}]`),s());n(")")}(e,t);break;case 21:ja(e.body,t,!0,!1)}}function Da(e,t){const{content:n,isStatic:o}=e;t.push(o?JSON.stringify(n):n,e)}function Ha(e,t){for(let n=0;n<e.children.length;n++){const o=e.children[n];A(o)?t.push(o):Ua(o,t)}}function Wa(e,t){const{push:n}=t;if(8===e.type)n("["),Ha(e,t),n("]");else if(e.isStatic){n($c(e.content)?e.content:JSON.stringify(e.content),e)}else n(`[${e.content}]`,e)}const za=Ma(/^(if|else|else-if)$/,((e,t,n)=>function(e,t,n,o){if(!("else"===t.name||t.exp&&t.exp.content.trim())){t.exp=bc("true",!1,t.exp?t.exp.loc:e.loc)}if("if"===t.name){const r=Ka(e,t),s={type:9,loc:e.loc,branches:[r]};if(n.replaceNode(s),o)return o(s,r,!0)}else{const r=n.parent.children;let s=r.indexOf(e);for(;s-- >=-1;){const i=r[s];if(!i||2!==i.type||i.content.trim().length){if(i&&9===i.type){n.removeNode();const r=Ka(e,t);i.branches.push(r);const s=o&&o(i,r,!1);Pa(r,n),s&&s(),n.currentNode=null}break}n.removeNode(i)}}}(e,t,n,((e,t,o)=>{const r=n.parent.children;let s=r.indexOf(e),i=0;for(;s-- >=0;){const e=r[s];e&&9===e.type&&(i+=e.branches.length)}return()=>{if(o)e.codegenNode=Ga(t,i,n);else{const o=function(e){for(;;)if(19===e.type){if(19!==e.alternate.type)return e;e=e.alternate}else 20===e.type&&(e=e.value)}(e.codegenNode);o.alternate=Ga(t,i+e.branches.length-1,n)}}}))));function Ka(e,t){const n=3===e.tagType;return{type:10,loc:e.loc,condition:"else"===t.name?void 0:t.exp,children:n&&!Ic(e,"for")?e.children:[e],userKey:Bc(e,"key"),isTemplateIf:n}}function Ga(e,t,n){return e.condition?kc(e.condition,qa(e,t,n),xc(n.helper(Ll),[\'""\',"true"])):qa(e,t,n)}function qa(e,t,n){const{helper:o}=n,r=_c("key",bc(`${t}`,!1,mc,2)),{children:s}=e,i=s[0];if(1!==s.length||1!==i.type){if(1===s.length&&11===i.type){const e=i.codegenNode;return qc(e,r,n),e}{let t=64;return gc(n,o($l),yc([r]),s,t+"",void 0,void 0,!0,!1,!1,e.loc)}}{const e=i.codegenNode,t=14===(l=e).type&&l.callee===fc?l.arguments[1].returns:l;return 13===t.type&&Zc(t,n),qc(t,r,n),e}var l}const Ja=Ma("for",((e,t,n)=>{const{helper:o,removeHelper:r}=n;return function(e,t,n,o){if(!t.exp)return;const r=Xa(t.exp);if(!r)return;const{scopes:s}=n,{source:i,value:l,key:c,index:a}=r,u={type:11,loc:t.loc,source:i,valueAlias:l,keyAlias:c,objectIndexAlias:a,parseResult:r,children:Dc(e)?e.children:[e]};n.replaceNode(u),s.vFor++;const p=o&&o(u);return()=>{s.vFor--,p&&p()}}(e,t,n,(t=>{const s=xc(o(Gl),[t.source]),i=Dc(e),l=Ic(e,"memo"),c=Bc(e,"key"),a=c&&(6===c.type?bc(c.value.content,!0):c.exp),u=c?_c("key",a):null,p=4===t.source.type&&t.source.constType>0,f=p?64:c?128:256;return t.codegenNode=gc(n,o($l),void 0,s,f+"",void 0,void 0,!0,!p,!1,e.loc),()=>{let c;const{children:f}=t,d=1!==f.length||1!==f[0].type,h=Hc(e)?e:i&&1===e.children.length&&Hc(e.children[0])?e.children[0]:null;if(h?(c=h.codegenNode,i&&u&&qc(c,u,n)):d?c=gc(n,o($l),u?yc([u]):void 0,e.children,"64",void 0,void 0,!0,void 0,!1):(c=f[0].codegenNode,i&&u&&qc(c,u,n),c.isBlock!==!p&&(c.isBlock?(r(Pl),r(zc(n.inSSR,c.isComponent))):r(Wc(n.inSSR,c.isComponent))),c.isBlock=!p,c.isBlock?(o(Pl),o(zc(n.inSSR,c.isComponent))):o(Wc(n.inSSR,c.isComponent))),l){const e=Cc(tu(t.parseResult,[bc("_cached")]));e.body={type:21,body:[Sc(["const _memo = (",l.exp,")"]),Sc(["if (_cached",...a?[" && _cached.key === ",a]:[],` && ${n.helperString(dc)}(_cached, _memo)) return _cached`]),Sc(["const _item = ",c]),bc("_item.memo = _memo"),bc("return _item")],loc:mc},s.arguments.push(e,bc("_cache"),bc(String(n.cached++)))}else s.arguments.push(Cc(tu(t.parseResult),c,!0))}}))}));const Za=/([\\s\\S]*?)\\s+(?:in|of)\\s+([\\s\\S]*)/,Ya=/,([^,\\}\\]]*)(?:,([^,\\}\\]]*))?$/,Qa=/^\\(|\\)$/g;function Xa(e,t){const n=e.loc,o=e.content,r=o.match(Za);if(!r)return;const[,s,i]=r,l={source:eu(n,i.trim(),o.indexOf(i,s.length)),value:void 0,key:void 0,index:void 0};let c=s.trim().replace(Qa,"").trim();const a=s.indexOf(c),u=c.match(Ya);if(u){c=c.replace(Ya,"").trim();const e=u[1].trim();let t;if(e&&(t=o.indexOf(e,a+c.length),l.key=eu(n,e,t)),u[2]){const r=u[2].trim();r&&(l.index=eu(n,r,o.indexOf(r,l.key?t+e.length:a+c.length)))}}return c&&(l.value=eu(n,c,a)),l}function eu(e,t,n){return bc(t,!1,Pc(e,n,t.length))}function tu({value:e,key:t,index:n},o=[]){return function(e){let t=e.length;for(;t--&&!e[t];);return e.slice(0,t+1).map(((e,t)=>e||bc("_".repeat(t+1),!1)))}([e,t,n,...o])}const nu=bc("undefined",!1),ou=(e,t)=>{if(1===e.type&&(1===e.tagType||3===e.tagType)){const n=Ic(e,"slot");if(n)return t.scopes.vSlot++,()=>{t.scopes.vSlot--}}},ru=(e,t,n)=>Cc(e,t,!1,!0,t.length?t[0].loc:n);function su(e,t,n=ru){t.helper(ac);const{children:o,loc:r}=e,s=[],i=[];let l=t.scopes.vSlot>0||t.scopes.vFor>0;const c=Ic(e,"slot",!0);if(c){const{arg:e,exp:t}=c;e&&!wc(e)&&(l=!0),s.push(_c(e||bc("default",!0),n(t,o,r)))}let a=!1,u=!1;const p=[],f=new Set;let d=0;for(let g=0;g<o.length;g++){const e=o[g];let r;if(!Dc(e)||!(r=Ic(e,"slot",!0))){3!==e.type&&p.push(e);continue}if(c)break;a=!0;const{children:h,loc:m}=e,{arg:v=bc("default",!0),exp:y}=r;let _;wc(v)?_=v?v.content:"default":l=!0;const b=n(y,h,m);let S,x,C;if(S=Ic(e,"if"))l=!0,i.push(kc(S.exp,iu(v,b,d++),nu));else if(x=Ic(e,/^else(-if)?$/,!0)){let e,t=g;for(;t--&&(e=o[t],3===e.type););if(e&&Dc(e)&&Ic(e,"if")){o.splice(g,1),g--;let e=i[i.length-1];for(;19===e.alternate.type;)e=e.alternate;e.alternate=x.exp?kc(x.exp,iu(v,b,d++),nu):iu(v,b,d++)}}else if(C=Ic(e,"for")){l=!0;const e=C.parseResult||Xa(C.exp);e&&i.push(xc(t.helper(Gl),[e.source,Cc(tu(e),iu(v,b),!0)]))}else{if(_){if(f.has(_))continue;f.add(_),"default"===_&&(u=!0)}s.push(_c(v,b))}}if(!c){const e=(e,t)=>_c("default",n(e,t,r));a?p.length&&p.some((e=>cu(e)))&&(u||s.push(e(void 0,p))):s.push(e(void 0,o))}const h=l?2:lu(e.children)?3:1;let m=yc(s.concat(_c("_",bc(h+"",!1))),r);return i.length&&(m=xc(t.helper(Jl),[m,vc(i)])),{slots:m,hasDynamicSlots:l}}function iu(e,t,n){const o=[_c("name",e),_c("fn",t)];return null!=n&&o.push(_c("key",bc(String(n),!0))),yc(o)}function lu(e){for(let t=0;t<e.length;t++){const n=e[t];switch(n.type){case 1:if(2===n.tagType||lu(n.children))return!0;break;case 9:if(lu(n.branches))return!0;break;case 10:case 11:if(lu(n.children))return!0}}return!1}function cu(e){return 2!==e.type&&12!==e.type||(2===e.type?!!e.content.trim():cu(e.content))}const au=new WeakMap,uu=(e,t)=>function(){if(1!==(e=t.currentNode).type||0!==e.tagType&&1!==e.tagType)return;const{tag:n,props:o}=e,r=1===e.tagType;let s=r?function(e,t,n=!1){let{tag:o}=e;const r=hu(o),s=Bc(e,"is");if(s)if(r){const e=6===s.type?s.value&&bc(s.value.content,!0):s.exp;if(e)return xc(t.helper(Hl),[e])}else 6===s.type&&s.value.content.startsWith("vue:")&&(o=s.value.content.slice(4));const i=!r&&Ic(e,"is");if(i&&i.exp)return xc(t.helper(Hl),[i.exp]);const l=Nc(o)||t.isBuiltInComponent(o);if(l)return n||t.helper(l),l;return t.helper(Dl),t.components.add(o),Jc(o,"component")}(e,t):`"${n}"`;const i=M(s)&&s.callee===Hl;let l,c,a,u,p,f,d=0,h=i||s===Ol||s===Rl||!r&&("svg"===n||"foreignObject"===n);if(o.length>0){const n=pu(e,t,void 0,r,i);l=n.props,d=n.patchFlag,p=n.dynamicPropNames;const o=n.directives;f=o&&o.length?vc(o.map((e=>function(e,t){const n=[],o=au.get(e);o?n.push(t.helperString(o)):(t.helper(Wl),t.directives.add(e.name),n.push(Jc(e.name,"directive")));const{loc:r}=e;e.exp&&n.push(e.exp);e.arg&&(e.exp||n.push("void 0"),n.push(e.arg));if(Object.keys(e.modifiers).length){e.arg||(e.exp||n.push("void 0"),n.push("void 0"));const t=bc("true",!1,r);n.push(yc(e.modifiers.map((e=>_c(e,t))),r))}return vc(n,e.loc)}(e,t)))):void 0,n.shouldUseBlock&&(h=!0)}if(e.children.length>0){s===Fl&&(h=!0,d|=1024);if(r&&s!==Ol&&s!==Fl){const{slots:n,hasDynamicSlots:o}=su(e,t);c=n,o&&(d|=1024)}else if(1===e.children.length&&s!==Ol){const n=e.children[0],o=n.type,r=5===o||8===o;r&&0===Ta(n,t)&&(d|=1),c=r||2===o?n:e.children}else c=e.children}0!==d&&(a=String(d),p&&p.length&&(u=function(e){let t="[";for(let n=0,o=e.length;n<o;n++)t+=JSON.stringify(e[n]),n<o-1&&(t+=", ");return t+"]"}(p))),e.codegenNode=gc(t,s,l,c,a,u,f,!!h,!1,r,e.loc)};function pu(e,t,n=e.props,o,r,s=!1){const{tag:i,loc:l,children:c}=e;let a=[];const u=[],p=[],f=c.length>0;let d=!1,h=0,m=!1,g=!1,v=!1,y=!1,_=!1,b=!1;const S=[],C=e=>{a.length&&(u.push(yc(fu(a),l)),a=[]),e&&u.push(e)},k=({key:e,value:n})=>{if(wc(e)){const s=e.content,i=x(s);if(!i||o&&!r||"onclick"===s.toLowerCase()||"onUpdate:modelValue"===s||U(s)||(y=!0),i&&U(s)&&(b=!0),20===n.type||(4===n.type||8===n.type)&&Ta(n,t)>0)return;"ref"===s?m=!0:"class"===s?g=!0:"style"===s?v=!0:"key"===s||S.includes(s)||S.push(s),!o||"class"!==s&&"style"!==s||S.includes(s)||S.push(s)}else _=!0};for(let x=0;x<n.length;x++){const r=n[x];if(6===r.type){const{loc:e,name:n,value:o}=r;let s=!0;if("ref"===n&&(m=!0,t.scopes.vFor>0&&a.push(_c(bc("ref_for",!0),bc("true")))),"is"===n&&(hu(i)||o&&o.content.startsWith("vue:")))continue;a.push(_c(bc(n,!0,Pc(e,0,n.length)),bc(o?o.content:"",s,o?o.loc:e)))}else{const{name:n,arg:c,exp:h,loc:m}=r,g="bind"===n,v="on"===n;if("slot"===n)continue;if("once"===n||"memo"===n)continue;if("is"===n||g&&Lc(c,"is")&&hu(i))continue;if(v&&s)continue;if((g&&Lc(c,"key")||v&&f&&Lc(c,"vue:before-update"))&&(d=!0),g&&Lc(c,"ref")&&t.scopes.vFor>0&&a.push(_c(bc("ref_for",!0),bc("true"))),!c&&(g||v)){_=!0,h&&(g?(C(),u.push(h)):C({type:14,loc:m,callee:t.helper(nc),arguments:o?[h]:[h,"true"]}));continue}const y=t.directiveTransforms[n];if(y){const{props:n,needRuntime:o}=y(r,e,t);!s&&n.forEach(k),v&&c&&!wc(c)?C(yc(n,l)):a.push(...n),o&&(p.push(r),P(o)&&au.set(r,o))}else D(n)||(p.push(r),f&&(d=!0))}}let w;if(u.length?(C(),w=u.length>1?xc(t.helper(Yl),u,l):u[0]):a.length&&(w=yc(fu(a),l)),_?h|=16:(g&&!o&&(h|=2),v&&!o&&(h|=4),S.length&&(h|=8),y&&(h|=32)),d||0!==h&&32!==h||!(m||b||p.length>0)||(h|=512),!t.inSSR&&w)switch(w.type){case 15:let e=-1,n=-1,o=!1;for(let t=0;t<w.properties.length;t++){const r=w.properties[t].key;wc(r)?"class"===r.content?e=t:"style"===r.content&&(n=t):r.isHandlerKey||(o=!0)}const r=w.properties[e],s=w.properties[n];o?w=xc(t.helper(ec),[w]):(r&&!wc(r.value)&&(r.value=xc(t.helper(Ql),[r.value])),s&&(v||4===s.value.type&&"["===s.value.content.trim()[0]||17===s.value.type)&&(s.value=xc(t.helper(Xl),[s.value])));break;case 14:break;default:w=xc(t.helper(ec),[xc(t.helper(tc),[w])])}return{props:w,directives:p,patchFlag:h,dynamicPropNames:S,shouldUseBlock:d}}function fu(e){const t=new Map,n=[];for(let o=0;o<e.length;o++){const r=e[o];if(8===r.key.type||!r.key.isStatic){n.push(r);continue}const s=r.key.content,i=t.get(s);i?("style"===s||"class"===s||x(s))&&du(i,r):(t.set(s,r),n.push(r))}return n}function du(e,t){17===e.value.type?e.value.elements.push(t.value):e.value=vc([e.value,t.value],e.loc)}function hu(e){return"component"===e||"Component"===e}const mu=(e,t)=>{if(Hc(e)){const{children:n,loc:o}=e,{slotName:r,slotProps:s}=function(e,t){let n,o=\'"default"\';const r=[];for(let s=0;s<e.props.length;s++){const t=e.props[s];6===t.type?t.value&&("name"===t.name?o=JSON.stringify(t.value.content):(t.name=z(t.name),r.push(t))):"bind"===t.name&&Lc(t.arg,"name")?t.exp&&(o=t.exp):("bind"===t.name&&t.arg&&wc(t.arg)&&(t.arg.content=z(t.arg.content)),r.push(t))}if(r.length>0){const{props:o,directives:s}=pu(e,t,r,!1,!1);n=o}return{slotName:o,slotProps:n}}(e,t),i=[t.prefixIdentifiers?"_ctx.$slots":"$slots",r,"{}","undefined","true"];let l=2;s&&(i[2]=s,l=3),n.length&&(i[3]=Cc([],n,!1,!1,o),l=4),t.scopeId&&!t.slotted&&(l=5),i.splice(l),e.codegenNode=xc(t.helper(ql),i,o)}};const gu=/^\\s*([\\w$_]+|(async\\s*)?\\([^)]*?\\))\\s*=>|^\\s*(async\\s+)?function(?:\\s+[\\w$]+)?\\s*\\(/,vu=(e,t,n,o)=>{const{loc:r,modifiers:s,arg:i}=e;let l;if(4===i.type)if(i.isStatic){let e=i.content;e.startsWith("vue:")&&(e=`vnode-${e.slice(4)}`);l=bc(1===t.tagType||e.startsWith("vnode")||!/[A-Z]/.test(e)?J(z(e)):`on:${e}`,!0,i.loc)}else l=Sc([`${n.helperString(sc)}(`,i,")"]);else l=i,l.children.unshift(`${n.helperString(sc)}(`),l.children.push(")");let c=e.exp;c&&!c.content.trim()&&(c=void 0);let a=n.cacheHandlers&&!c&&!n.inVOnce;if(c){const e=Ac(c.content),t=!(e||gu.test(c.content)),n=c.content.includes(";");(t||a&&e)&&(c=Sc([`${t?"$event":"(...args)"} => ${n?"{":"("}`,c,n?"}":")"]))}let u={props:[_c(l,c||bc("() => {}",!1,r))]};return o&&(u=o(u)),a&&(u.props[0].value=n.cache(u.props[0].value)),u.props.forEach((e=>e.key.isHandlerKey=!0)),u},yu=(e,t,n)=>{const{exp:o,modifiers:r,loc:s}=e,i=e.arg;return 4!==i.type?(i.children.unshift("("),i.children.push(\') || ""\')):i.isStatic||(i.content=`${i.content} || ""`),r.includes("camel")&&(4===i.type?i.content=i.isStatic?z(i.content):`${n.helperString(oc)}(${i.content})`:(i.children.unshift(`${n.helperString(oc)}(`),i.children.push(")"))),n.inSSR||(r.includes("prop")&&_u(i,"."),r.includes("attr")&&_u(i,"^")),!o||4===o.type&&!o.content.trim()?{props:[_c(i,bc("",!0,s))]}:{props:[_c(i,o)]}},_u=(e,t)=>{4===e.type?e.content=e.isStatic?t+e.content:`\\`${t}\\${${e.content}}\\``:(e.children.unshift(`\'${t}\' + (`),e.children.push(")"))},bu=(e,t)=>{if(0===e.type||1===e.type||11===e.type||10===e.type)return()=>{const n=e.children;let o,r=!1;for(let e=0;e<n.length;e++){const t=n[e];if(jc(t)){r=!0;for(let r=e+1;r<n.length;r++){const s=n[r];if(!jc(s)){o=void 0;break}o||(o=n[e]=Sc([t],t.loc)),o.children.push(" + ",s),n.splice(r,1),r--}}}if(r&&(1!==n.length||0!==e.type&&(1!==e.type||0!==e.tagType||e.props.find((e=>7===e.type&&!t.directiveTransforms[e.name])))))for(let e=0;e<n.length;e++){const o=n[e];if(jc(o)||8===o.type){const r=[];2===o.type&&" "===o.content||r.push(o),t.ssr||0!==Ta(o,t)||r.push("1"),n[e]={type:12,content:o,loc:o.loc,codegenNode:xc(t.helper(jl),r)}}}}},Su=new WeakSet,xu=(e,t)=>{if(1===e.type&&Ic(e,"once",!0)){if(Su.has(e)||t.inVOnce)return;return Su.add(e),t.inVOnce=!0,t.helper(ic),()=>{t.inVOnce=!1;const e=t.currentNode;e.codegenNode&&(e.codegenNode=t.cache(e.codegenNode,!0))}}},Cu=(e,t,n)=>{const{exp:o,arg:r}=e;if(!o)return ku();const s=o.loc.source,i=4===o.type?o.content:s;if(!i.trim()||!Ac(i))return ku();const l=r||bc("modelValue",!0),c=r?wc(r)?`onUpdate:${r.content}`:Sc([\'"onUpdate:" + \',r]):"onUpdate:modelValue";let a;a=Sc([`${n.isTS?"($event: any)":"$event"} => ((`,o,") = $event)"]);const u=[_c(l,e.exp),_c(c,a)];if(e.modifiers.length&&1===t.tagType){const t=e.modifiers.map((e=>($c(e)?e:JSON.stringify(e))+": true")).join(", "),n=r?wc(r)?`${r.content}Modifiers`:Sc([r,\' + "Modifiers"\']):"modelModifiers";u.push(_c(n,bc(`{ ${t} }`,!1,e.loc,2)))}return ku(u)};function ku(e=[]){return{props:e}}const wu=new WeakSet,Tu=(e,t)=>{if(1===e.type){const n=Ic(e,"memo");if(!n||wu.has(e))return;return wu.add(e),()=>{const o=e.codegenNode||t.currentNode.codegenNode;o&&13===o.type&&(1!==e.tagType&&Zc(o,t),e.codegenNode=xc(t.helper(fc),[n.exp,Cc(void 0,o),"_cache",String(t.cached++)]))}}};function Nu(e,t={}){const n=t.onError||Tl,o="module"===t.mode;!0===t.prefixIdentifiers?n(El(46)):o&&n(El(47));t.cacheHandlers&&n(El(48)),t.scopeId&&!o&&n(El(49));const r=A(e)?ea(e,t):e,[s,i]=[[xu,za,Tu,Ja,mu,uu,ou,bu],{on:vu,bind:yu,model:Cu}];return Aa(r,k({},t,{prefixIdentifiers:false,nodeTransforms:[...s,...t.nodeTransforms||[]],directiveTransforms:k({},i,t.directiveTransforms||{})})),Ia(r,k({},t,{prefixIdentifiers:false}))}const Eu=Symbol(""),$u=Symbol(""),Ou=Symbol(""),Ru=Symbol(""),Fu=Symbol(""),Au=Symbol(""),Pu=Symbol(""),Mu=Symbol(""),Vu=Symbol(""),Iu=Symbol("");var Bu;let Lu;Bu={[Eu]:"vModelRadio",[$u]:"vModelCheckbox",[Ou]:"vModelText",[Ru]:"vModelSelect",[Fu]:"vModelDynamic",[Au]:"withModifiers",[Pu]:"withKeys",[Mu]:"vShow",[Vu]:"Transition",[Iu]:"TransitionGroup"},Object.getOwnPropertySymbols(Bu).forEach((e=>{hc[e]=Bu[e]}));const ju=e("style,iframe,script,noscript",!0),Uu={isVoidTag:f,isNativeTag:e=>u(e)||p(e),isPreTag:e=>"pre"===e,decodeEntities:function(e,t=!1){return Lu||(Lu=document.createElement("div")),t?(Lu.innerHTML=`<div foo="${e.replace(/"/g,"&quot;")}">`,Lu.children[0].getAttribute("foo")):(Lu.innerHTML=e,Lu.textContent)},isBuiltInComponent:e=>Tc(e,"Transition")?Vu:Tc(e,"TransitionGroup")?Iu:void 0,getNamespace(e,t){let n=t?t.ns:0;if(t&&2===n)if("annotation-xml"===t.tag){if("svg"===e)return 1;t.props.some((e=>6===e.type&&"encoding"===e.name&&null!=e.value&&("text/html"===e.value.content||"application/xhtml+xml"===e.value.content)))&&(n=0)}else/^m(?:[ions]|text)$/.test(t.tag)&&"mglyph"!==e&&"malignmark"!==e&&(n=0);else t&&1===n&&("foreignObject"!==t.tag&&"desc"!==t.tag&&"title"!==t.tag||(n=0));if(0===n){if("svg"===e)return 1;if("math"===e)return 2}return n},getTextMode({tag:e,ns:t}){if(0===t){if("textarea"===e||"title"===e)return 1;if(ju(e))return 2}return 0}},Du=(e,t)=>{const n=l(e);return bc(JSON.stringify(n),!1,t,3)};const Hu=e("passive,once,capture"),Wu=e("stop,prevent,self,ctrl,shift,alt,meta,exact,middle"),zu=e("left,right"),Ku=e("onkeyup,onkeydown,onkeypress",!0),Gu=(e,t)=>wc(e)&&"onclick"===e.content.toLowerCase()?bc(t,!0):4!==e.type?Sc(["(",e,`) === "onClick" ? "${t}" : (`,e,")"]):e,qu=(e,t)=>{1!==e.type||0!==e.tagType||"script"!==e.tag&&"style"!==e.tag||t.removeNode()},Ju=[e=>{1===e.type&&e.props.forEach(((t,n)=>{6===t.type&&"style"===t.name&&t.value&&(e.props[n]={type:7,name:"bind",arg:bc("style",!0,t.loc),exp:Du(t.value.content,t.loc),modifiers:[],loc:t.loc})}))}],Zu={cloak:()=>({props:[]}),html:(e,t,n)=>{const{exp:o,loc:r}=e;return t.children.length&&(t.children.length=0),{props:[_c(bc("innerHTML",!0,r),o||bc("",!0))]}},text:(e,t,n)=>{const{exp:o,loc:r}=e;return t.children.length&&(t.children.length=0),{props:[_c(bc("textContent",!0),o?Ta(o,n)>0?o:xc(n.helperString(Zl),[o],r):bc("",!0))]}},model:(e,t,n)=>{const o=Cu(e,t,n);if(!o.props.length||1===t.tagType)return o;const{tag:r}=t,s=n.isCustomElement(r);if("input"===r||"textarea"===r||"select"===r||s){let e=Ou,i=!1;if("input"===r||s){const n=Bc(t,"type");if(n){if(7===n.type)e=Fu;else if(n.value)switch(n.value.content){case"radio":e=Eu;break;case"checkbox":e=$u;break;case"file":i=!0}}else(function(e){return e.props.some((e=>!(7!==e.type||"bind"!==e.name||e.arg&&4===e.arg.type&&e.arg.isStatic)))})(t)&&(e=Fu)}else"select"===r&&(e=Ru);i||(o.needRuntime=n.helper(e))}return o.props=o.props.filter((e=>!(4===e.key.type&&"modelValue"===e.key.content))),o},on:(e,t,n)=>vu(e,t,n,(t=>{const{modifiers:o}=e;if(!o.length)return t;let{key:r,value:s}=t.props[0];const{keyModifiers:i,nonKeyModifiers:l,eventOptionModifiers:c}=((e,t,n,o)=>{const r=[],s=[],i=[];for(let l=0;l<t.length;l++){const n=t[l];Hu(n)?i.push(n):zu(n)?wc(e)?Ku(e.content)?r.push(n):s.push(n):(r.push(n),s.push(n)):Wu(n)?s.push(n):r.push(n)}return{keyModifiers:r,nonKeyModifiers:s,eventOptionModifiers:i}})(r,o);if(l.includes("right")&&(r=Gu(r,"onContextmenu")),l.includes("middle")&&(r=Gu(r,"onMouseup")),l.length&&(s=xc(n.helper(Au),[s,JSON.stringify(l)])),!i.length||wc(r)&&!Ku(r.content)||(s=xc(n.helper(Pu),[s,JSON.stringify(i)])),c.length){const e=c.map(q).join("");r=wc(r)?bc(`${r.content}${e}`,!0):Sc(["(",r,`) + "${e}"`])}return{props:[_c(r,s)]}})),show:(e,t,n)=>({props:[],needRuntime:n.helper(Mu)})};const Yu=Object.create(null);function Qu(e,t){if(!A(e)){if(!e.nodeType)return _;e=e.innerHTML}const n=e,o=Yu[n];if(o)return o;if("#"===e[0]){const t=document.querySelector(e);e=t?t.innerHTML:""}const r=k({hoistStatic:!0,onError:void 0,onWarn:_},t);r.isCustomElement||"undefined"==typeof customElements||(r.isCustomElement=e=>!!customElements.get(e));const{code:s}=function(e,t={}){return Nu(e,k({},Uu,t,{nodeTransforms:[qu,...Ju,...t.nodeTransforms||[]],directiveTransforms:k({},Zu,t.directiveTransforms||{}),transformHoist:null}))}(e,r),i=new Function("Vue",s)(wl);return i._rc=!0,Yu[n]=i}$s(Qu);export{oo as BaseTransition,Hr as Comment,ne as EffectScope,Ur as Fragment,go as KeepAlive,ge as ReactiveEffect,Wr as Static,Bn as Suspense,jr as Teleport,Dr as Text,Ti as Transition,Wi as TransitionGroup,Si as VueElement,Qt as callWithAsyncErrorHandling,Yt as callWithErrorHandling,z as camelize,q as capitalize,as as cloneVNode,oi as compatUtils,Qu as compile,Is as computed,Sl as createApp,Xr as createBlock,fs as createCommentVNode,Qr as createElementBlock,is as createElementVNode,Fr as createHydrationRenderer,Ks as createPropsRestProxy,Rr as createRenderer,xl as createSSRApp,zo as createSlots,ps as createStaticVNode,us as createTextVNode,ls as createVNode,Ut as customRef,fo as defineAsyncComponent,uo as defineComponent,yi as defineCustomElement,Ls as defineEmits,js as defineExpose,Bs as defineProps,_i as defineSSRCustomElement,_n as devtools,ye as effect,oe as effectScope,Ss as getCurrentInstance,se as getCurrentScope,ao as getTransitionRawChildren,cs as guardReactiveProps,qs as h,Xt as handleError,bl as hydrate,Ys as initCustomFormatter,kl as initDirectivesForSSR,zn as inject,Xs as isMemoSame,kt as isProxy,St as isReactive,xt as isReadonly,Rt as isRef,Os as isRuntimeOnly,Ct as isShallow,es as isVNode,Tt as markRaw,zs as mergeDefaults,gs as mergeProps,un as nextTick,c as normalizeClass,a as normalizeProps,r as normalizeStyle,yo as onActivated,To as onBeforeMount,Oo as onBeforeUnmount,Eo as onBeforeUpdate,_o as onDeactivated,Mo as onErrorCaptured,No as onMounted,Po as onRenderTracked,Ao as onRenderTriggered,ie as onScopeDispose,Fo as onServerPrefetch,Ro as onUnmounted,$o as onUpdated,Gr as openBlock,$n as popScopeId,Wn as provide,Lt as proxyRefs,En as pushScopeId,dn as queuePostFlushCb,gt as reactive,yt as readonly,Ft as ref,$s as registerRuntimeCompiler,_l as render,Wo as renderList,Ko as renderSlot,Bo as resolveComponent,Uo as resolveDirective,jo as resolveDynamicComponent,ni as resolveFilter,so as resolveTransitionHooks,Zr as setBlockTracking,Sn as setDevtoolsHook,co as setTransitionHooks,vt as shallowReactive,_t as shallowReadonly,At as shallowRef,Js as ssrContextKey,ti as ssrUtils,_e as stop,m as toDisplayString,J as toHandlerKey,qo as toHandlers,wt as toRaw,Wt as toRef,Dt as toRefs,ns as transformVNodeArgs,Vt as triggerRef,It as unref,Hs as useAttrs,xi as useCssModule,Ci as useCssVars,Zs as useSSRContext,Ds as useSlots,to as useTransitionState,Qi as vModelCheckbox,sl as vModelDynamic,el as vModelRadio,tl as vModelSelect,Yi as vModelText,fl as vShow,ei as version,qt as warn,Zn as watch,Kn as watchEffect,Gn as watchPostEffect,qn as watchSyncEffect,Gs as withAsyncContext,Rn as withCtx,Us as withDefaults,Vo as withDirectives,pl as withKeys,Qs as withMemo,al as withModifiers,On as withScopeId};',L=`/*!
  * vue-router v4.1.6
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
import { getCurrentInstance, inject, onUnmounted, onDeactivated, onActivated, computed, unref, watchEffect, defineComponent, reactive, h, provide, ref, watch, shallowRef, nextTick } from 'vue';

const isBrowser = typeof window !== 'undefined';

function isESModule(obj) {
    return obj.__esModule || obj[Symbol.toStringTag] === 'Module';
}
const assign = Object.assign;
function applyToParams(fn, params) {
    const newParams = {};
    for (const key in params) {
        const value = params[key];
        newParams[key] = isArray(value)
            ? value.map(fn)
            : fn(value);
    }
    return newParams;
}
const noop = () => { };
/**
 * Typesafe alternative to Array.isArray
 * https://github.com/microsoft/TypeScript/pull/48228
 */
const isArray = Array.isArray;

function warn(msg) {
    // avoid using ...args as it breaks in older Edge builds
    const args = Array.from(arguments).slice(1);
    console.warn.apply(console, ['[Vue Router warn]: ' + msg].concat(args));
}

const TRAILING_SLASH_RE = /\\/$/;
const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, '');
/**
 * Transforms a URI into a normalized history location
 *
 * @param parseQuery
 * @param location - URI to normalize
 * @param currentLocation - current absolute location. Allows resolving relative
 * paths. Must start with \`/\`. Defaults to \`/\`
 * @returns a normalized history location
 */
function parseURL(parseQuery, location, currentLocation = '/') {
    let path, query = {}, searchString = '', hash = '';
    // Could use URL and URLSearchParams but IE 11 doesn't support it
    // TODO: move to new URL()
    const hashPos = location.indexOf('#');
    let searchPos = location.indexOf('?');
    // the hash appears before the search, so it's not part of the search string
    if (hashPos < searchPos && hashPos >= 0) {
        searchPos = -1;
    }
    if (searchPos > -1) {
        path = location.slice(0, searchPos);
        searchString = location.slice(searchPos + 1, hashPos > -1 ? hashPos : location.length);
        query = parseQuery(searchString);
    }
    if (hashPos > -1) {
        path = path || location.slice(0, hashPos);
        // keep the # character
        hash = location.slice(hashPos, location.length);
    }
    // no search and no query
    path = resolveRelativePath(path != null ? path : location, currentLocation);
    // empty path means a relative query or hash \`?foo=f\`, \`#thing\`
    return {
        fullPath: path + (searchString && '?') + searchString + hash,
        path,
        query,
        hash,
    };
}
/**
 * Stringifies a URL object
 *
 * @param stringifyQuery
 * @param location
 */
function stringifyURL(stringifyQuery, location) {
    const query = location.query ? stringifyQuery(location.query) : '';
    return location.path + (query && '?') + query + (location.hash || '');
}
/**
 * Strips off the base from the beginning of a location.pathname in a non-case-sensitive way.
 *
 * @param pathname - location.pathname
 * @param base - base to strip off
 */
function stripBase(pathname, base) {
    // no base or base is not found at the beginning
    if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase()))
        return pathname;
    return pathname.slice(base.length) || '/';
}
/**
 * Checks if two RouteLocation are equal. This means that both locations are
 * pointing towards the same {@link RouteRecord} and that all \`params\`, \`query\`
 * parameters and \`hash\` are the same
 *
 * @param a - first {@link RouteLocation}
 * @param b - second {@link RouteLocation}
 */
function isSameRouteLocation(stringifyQuery, a, b) {
    const aLastIndex = a.matched.length - 1;
    const bLastIndex = b.matched.length - 1;
    return (aLastIndex > -1 &&
        aLastIndex === bLastIndex &&
        isSameRouteRecord(a.matched[aLastIndex], b.matched[bLastIndex]) &&
        isSameRouteLocationParams(a.params, b.params) &&
        stringifyQuery(a.query) === stringifyQuery(b.query) &&
        a.hash === b.hash);
}
/**
 * Check if two \`RouteRecords\` are equal. Takes into account aliases: they are
 * considered equal to the \`RouteRecord\` they are aliasing.
 *
 * @param a - first {@link RouteRecord}
 * @param b - second {@link RouteRecord}
 */
function isSameRouteRecord(a, b) {
    // since the original record has an undefined value for aliasOf
    // but all aliases point to the original record, this will always compare
    // the original record
    return (a.aliasOf || a) === (b.aliasOf || b);
}
function isSameRouteLocationParams(a, b) {
    if (Object.keys(a).length !== Object.keys(b).length)
        return false;
    for (const key in a) {
        if (!isSameRouteLocationParamsValue(a[key], b[key]))
            return false;
    }
    return true;
}
function isSameRouteLocationParamsValue(a, b) {
    return isArray(a)
        ? isEquivalentArray(a, b)
        : isArray(b)
            ? isEquivalentArray(b, a)
            : a === b;
}
/**
 * Check if two arrays are the same or if an array with one single entry is the
 * same as another primitive value. Used to check query and parameters
 *
 * @param a - array of values
 * @param b - array of values or a single value
 */
function isEquivalentArray(a, b) {
    return isArray(b)
        ? a.length === b.length && a.every((value, i) => value === b[i])
        : a.length === 1 && a[0] === b;
}
/**
 * Resolves a relative path that starts with \`.\`.
 *
 * @param to - path location we are resolving
 * @param from - currentLocation.path, should start with \`/\`
 */
function resolveRelativePath(to, from) {
    if (to.startsWith('/'))
        return to;
    if (!from.startsWith('/')) {
        warn(\`Cannot resolve a relative location without an absolute path. Trying to resolve "\${to}" from "\${from}". It should look like "/\${from}".\`);
        return to;
    }
    if (!to)
        return from;
    const fromSegments = from.split('/');
    const toSegments = to.split('/');
    let position = fromSegments.length - 1;
    let toPosition;
    let segment;
    for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
        segment = toSegments[toPosition];
        // we stay on the same position
        if (segment === '.')
            continue;
        // go up in the from array
        if (segment === '..') {
            // we can't go below zero, but we still need to increment toPosition
            if (position > 1)
                position--;
            // continue
        }
        // we reached a non-relative path, we stop here
        else
            break;
    }
    return (fromSegments.slice(0, position).join('/') +
        '/' +
        toSegments
            // ensure we use at least the last element in the toSegments
            .slice(toPosition - (toPosition === toSegments.length ? 1 : 0))
            .join('/'));
}

var NavigationType;
(function (NavigationType) {
    NavigationType["pop"] = "pop";
    NavigationType["push"] = "push";
})(NavigationType || (NavigationType = {}));
var NavigationDirection;
(function (NavigationDirection) {
    NavigationDirection["back"] = "back";
    NavigationDirection["forward"] = "forward";
    NavigationDirection["unknown"] = "";
})(NavigationDirection || (NavigationDirection = {}));
/**
 * Starting location for Histories
 */
const START = '';
// Generic utils
/**
 * Normalizes a base by removing any trailing slash and reading the base tag if
 * present.
 *
 * @param base - base to normalize
 */
function normalizeBase(base) {
    if (!base) {
        if (isBrowser) {
            // respect <base> tag
            const baseEl = document.querySelector('base');
            base = (baseEl && baseEl.getAttribute('href')) || '/';
            // strip full URL origin
            base = base.replace(/^\\w+:\\/\\/[^\\/]+/, '');
        }
        else {
            base = '/';
        }
    }
    // ensure leading slash when it was removed by the regex above avoid leading
    // slash with hash because the file could be read from the disk like file://
    // and the leading slash would cause problems
    if (base[0] !== '/' && base[0] !== '#')
        base = '/' + base;
    // remove the trailing slash so all other method can just do \`base + fullPath\`
    // to build an href
    return removeTrailingSlash(base);
}
// remove any character before the hash
const BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base, location) {
    return base.replace(BEFORE_HASH_RE, '#') + location;
}

function getElementPosition(el, offset) {
    const docRect = document.documentElement.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    return {
        behavior: offset.behavior,
        left: elRect.left - docRect.left - (offset.left || 0),
        top: elRect.top - docRect.top - (offset.top || 0),
    };
}
const computeScrollPosition = () => ({
    left: window.pageXOffset,
    top: window.pageYOffset,
});
function scrollToPosition(position) {
    let scrollToOptions;
    if ('el' in position) {
        const positionEl = position.el;
        const isIdSelector = typeof positionEl === 'string' && positionEl.startsWith('#');
        /**
         * \`id\`s can accept pretty much any characters, including CSS combinators
         * like \`>\` or \`~\`. It's still possible to retrieve elements using
         * \`document.getElementById('~')\` but it needs to be escaped when using
         * \`document.querySelector('#\\\\~')\` for it to be valid. The only
         * requirements for \`id\`s are them to be unique on the page and to not be
         * empty (\`id=""\`). Because of that, when passing an id selector, it should
         * be properly escaped for it to work with \`querySelector\`. We could check
         * for the id selector to be simple (no CSS combinators \`+ >~\`) but that
         * would make things inconsistent since they are valid characters for an
         * \`id\` but would need to be escaped when using \`querySelector\`, breaking
         * their usage and ending up in no selector returned. Selectors need to be
         * escaped:
         *
         * - \`#1-thing\` becomes \`#\\31 -thing\`
         * - \`#with~symbols\` becomes \`#with\\\\~symbols\`
         *
         * - More information about  the topic can be found at
         *   https://mathiasbynens.be/notes/html5-id-class.
         * - Practical example: https://mathiasbynens.be/demo/html5-id
         */
        if (typeof position.el === 'string') {
            if (!isIdSelector || !document.getElementById(position.el.slice(1))) {
                try {
                    const foundEl = document.querySelector(position.el);
                    if (isIdSelector && foundEl) {
                        warn(\`The selector "\${position.el}" should be passed as "el: document.querySelector('\${position.el}')" because it starts with "#".\`);
                        // return to avoid other warnings
                        return;
                    }
                }
                catch (err) {
                    warn(\`The selector "\${position.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).\`);
                    // return to avoid other warnings
                    return;
                }
            }
        }
        const el = typeof positionEl === 'string'
            ? isIdSelector
                ? document.getElementById(positionEl.slice(1))
                : document.querySelector(positionEl)
            : positionEl;
        if (!el) {
            warn(\`Couldn't find element using selector "\${position.el}" returned by scrollBehavior.\`);
            return;
        }
        scrollToOptions = getElementPosition(el, position);
    }
    else {
        scrollToOptions = position;
    }
    if ('scrollBehavior' in document.documentElement.style)
        window.scrollTo(scrollToOptions);
    else {
        window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.pageXOffset, scrollToOptions.top != null ? scrollToOptions.top : window.pageYOffset);
    }
}
function getScrollKey(path, delta) {
    const position = history.state ? history.state.position - delta : -1;
    return position + path;
}
const scrollPositions = new Map();
function saveScrollPosition(key, scrollPosition) {
    scrollPositions.set(key, scrollPosition);
}
function getSavedScrollPosition(key) {
    const scroll = scrollPositions.get(key);
    // consume it so it's not used again
    scrollPositions.delete(key);
    return scroll;
}
// TODO: RFC about how to save scroll position
/**
 * ScrollBehavior instance used by the router to compute and restore the scroll
 * position when navigating.
 */
// export interface ScrollHandler<ScrollPositionEntry extends HistoryStateValue, ScrollPosition extends ScrollPositionEntry> {
//   // returns a scroll position that can be saved in history
//   compute(): ScrollPositionEntry
//   // can take an extended ScrollPositionEntry
//   scroll(position: ScrollPosition): void
// }
// export const scrollHandler: ScrollHandler<ScrollPosition> = {
//   compute: computeScroll,
//   scroll: scrollToPosition,
// }

let createBaseLocation = () => location.protocol + '//' + location.host;
/**
 * Creates a normalized history location from a window.location object
 * @param location -
 */
function createCurrentLocation(base, location) {
    const { pathname, search, hash } = location;
    // allows hash bases like #, /#, #/, #!, #!/, /#!/, or even /folder#end
    const hashPos = base.indexOf('#');
    if (hashPos > -1) {
        let slicePos = hash.includes(base.slice(hashPos))
            ? base.slice(hashPos).length
            : 1;
        let pathFromHash = hash.slice(slicePos);
        // prepend the starting slash to hash so the url starts with /#
        if (pathFromHash[0] !== '/')
            pathFromHash = '/' + pathFromHash;
        return stripBase(pathFromHash, '');
    }
    const path = stripBase(pathname, base);
    return path + search + hash;
}
function useHistoryListeners(base, historyState, currentLocation, replace) {
    let listeners = [];
    let teardowns = [];
    // TODO: should it be a stack? a Dict. Check if the popstate listener
    // can trigger twice
    let pauseState = null;
    const popStateHandler = ({ state, }) => {
        const to = createCurrentLocation(base, location);
        const from = currentLocation.value;
        const fromState = historyState.value;
        let delta = 0;
        if (state) {
            currentLocation.value = to;
            historyState.value = state;
            // ignore the popstate and reset the pauseState
            if (pauseState && pauseState === from) {
                pauseState = null;
                return;
            }
            delta = fromState ? state.position - fromState.position : 0;
        }
        else {
            replace(to);
        }
        // console.log({ deltaFromCurrent })
        // Here we could also revert the navigation by calling history.go(-delta)
        // this listener will have to be adapted to not trigger again and to wait for the url
        // to be updated before triggering the listeners. Some kind of validation function would also
        // need to be passed to the listeners so the navigation can be accepted
        // call all listeners
        listeners.forEach(listener => {
            listener(currentLocation.value, from, {
                delta,
                type: NavigationType.pop,
                direction: delta
                    ? delta > 0
                        ? NavigationDirection.forward
                        : NavigationDirection.back
                    : NavigationDirection.unknown,
            });
        });
    };
    function pauseListeners() {
        pauseState = currentLocation.value;
    }
    function listen(callback) {
        // set up the listener and prepare teardown callbacks
        listeners.push(callback);
        const teardown = () => {
            const index = listeners.indexOf(callback);
            if (index > -1)
                listeners.splice(index, 1);
        };
        teardowns.push(teardown);
        return teardown;
    }
    function beforeUnloadListener() {
        const { history } = window;
        if (!history.state)
            return;
        history.replaceState(assign({}, history.state, { scroll: computeScrollPosition() }), '');
    }
    function destroy() {
        for (const teardown of teardowns)
            teardown();
        teardowns = [];
        window.removeEventListener('popstate', popStateHandler);
        window.removeEventListener('beforeunload', beforeUnloadListener);
    }
    // set up the listeners and prepare teardown callbacks
    window.addEventListener('popstate', popStateHandler);
    window.addEventListener('beforeunload', beforeUnloadListener);
    return {
        pauseListeners,
        listen,
        destroy,
    };
}
/**
 * Creates a state object
 */
function buildState(back, current, forward, replaced = false, computeScroll = false) {
    return {
        back,
        current,
        forward,
        replaced,
        position: window.history.length,
        scroll: computeScroll ? computeScrollPosition() : null,
    };
}
function useHistoryStateNavigation(base) {
    const { history, location } = window;
    // private variables
    const currentLocation = {
        value: createCurrentLocation(base, location),
    };
    const historyState = { value: history.state };
    // build current history entry as this is a fresh navigation
    if (!historyState.value) {
        changeLocation(currentLocation.value, {
            back: null,
            current: currentLocation.value,
            forward: null,
            // the length is off by one, we need to decrease it
            position: history.length - 1,
            replaced: true,
            // don't add a scroll as the user may have an anchor, and we want
            // scrollBehavior to be triggered without a saved position
            scroll: null,
        }, true);
    }
    function changeLocation(to, state, replace) {
        /**
         * if a base tag is provided, and we are on a normal domain, we have to
         * respect the provided \`base\` attribute because pushState() will use it and
         * potentially erase anything before the \`#\` like at
         * https://github.com/vuejs/router/issues/685 where a base of
         * \`/folder/#\` but a base of \`/\` would erase the \`/folder/\` section. If
         * there is no host, the \`<base>\` tag makes no sense and if there isn't a
         * base tag we can just use everything after the \`#\`.
         */
        const hashIndex = base.indexOf('#');
        const url = hashIndex > -1
            ? (location.host && document.querySelector('base')
                ? base
                : base.slice(hashIndex)) + to
            : createBaseLocation() + base + to;
        try {
            // BROWSER QUIRK
            // NOTE: Safari throws a SecurityError when calling this function 100 times in 30 seconds
            history[replace ? 'replaceState' : 'pushState'](state, '', url);
            historyState.value = state;
        }
        catch (err) {
            {
                warn('Error with push/replace State', err);
            }
            // Force the navigation, this also resets the call count
            location[replace ? 'replace' : 'assign'](url);
        }
    }
    function replace(to, data) {
        const state = assign({}, history.state, buildState(historyState.value.back, 
        // keep back and forward entries but override current position
        to, historyState.value.forward, true), data, { position: historyState.value.position });
        changeLocation(to, state, true);
        currentLocation.value = to;
    }
    function push(to, data) {
        // Add to current entry the information of where we are going
        // as well as saving the current position
        const currentState = assign({}, 
        // use current history state to gracefully handle a wrong call to
        // history.replaceState
        // https://github.com/vuejs/router/issues/366
        historyState.value, history.state, {
            forward: to,
            scroll: computeScrollPosition(),
        });
        if (!history.state) {
            warn(\`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:\\n\\n\` +
                \`history.replaceState(history.state, '', url)\\n\\n\` +
                \`You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.\`);
        }
        changeLocation(currentState.current, currentState, true);
        const state = assign({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data);
        changeLocation(to, state, false);
        currentLocation.value = to;
    }
    return {
        location: currentLocation,
        state: historyState,
        push,
        replace,
    };
}
/**
 * Creates an HTML5 history. Most common history for single page applications.
 *
 * @param base -
 */
function createWebHistory(base) {
    base = normalizeBase(base);
    const historyNavigation = useHistoryStateNavigation(base);
    const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
    function go(delta, triggerListeners = true) {
        if (!triggerListeners)
            historyListeners.pauseListeners();
        history.go(delta);
    }
    const routerHistory = assign({
        // it's overridden right after
        location: '',
        base,
        go,
        createHref: createHref.bind(null, base),
    }, historyNavigation, historyListeners);
    Object.defineProperty(routerHistory, 'location', {
        enumerable: true,
        get: () => historyNavigation.location.value,
    });
    Object.defineProperty(routerHistory, 'state', {
        enumerable: true,
        get: () => historyNavigation.state.value,
    });
    return routerHistory;
}

/**
 * Creates an in-memory based history. The main purpose of this history is to handle SSR. It starts in a special location that is nowhere.
 * It's up to the user to replace that location with the starter location by either calling \`router.push\` or \`router.replace\`.
 *
 * @param base - Base applied to all urls, defaults to '/'
 * @returns a history object that can be passed to the router constructor
 */
function createMemoryHistory(base = '') {
    let listeners = [];
    let queue = [START];
    let position = 0;
    base = normalizeBase(base);
    function setLocation(location) {
        position++;
        if (position === queue.length) {
            // we are at the end, we can simply append a new entry
            queue.push(location);
        }
        else {
            // we are in the middle, we remove everything from here in the queue
            queue.splice(position);
            queue.push(location);
        }
    }
    function triggerListeners(to, from, { direction, delta }) {
        const info = {
            direction,
            delta,
            type: NavigationType.pop,
        };
        for (const callback of listeners) {
            callback(to, from, info);
        }
    }
    const routerHistory = {
        // rewritten by Object.defineProperty
        location: START,
        // TODO: should be kept in queue
        state: {},
        base,
        createHref: createHref.bind(null, base),
        replace(to) {
            // remove current entry and decrement position
            queue.splice(position--, 1);
            setLocation(to);
        },
        push(to, data) {
            setLocation(to);
        },
        listen(callback) {
            listeners.push(callback);
            return () => {
                const index = listeners.indexOf(callback);
                if (index > -1)
                    listeners.splice(index, 1);
            };
        },
        destroy() {
            listeners = [];
            queue = [START];
            position = 0;
        },
        go(delta, shouldTrigger = true) {
            const from = this.location;
            const direction = 
            // we are considering delta === 0 going forward, but in abstract mode
            // using 0 for the delta doesn't make sense like it does in html5 where
            // it reloads the page
            delta < 0 ? NavigationDirection.back : NavigationDirection.forward;
            position = Math.max(0, Math.min(position + delta, queue.length - 1));
            if (shouldTrigger) {
                triggerListeners(this.location, from, {
                    direction,
                    delta,
                });
            }
        },
    };
    Object.defineProperty(routerHistory, 'location', {
        enumerable: true,
        get: () => queue[position],
    });
    return routerHistory;
}

/**
 * Creates a hash history. Useful for web applications with no host (e.g. \`file://\`) or when configuring a server to
 * handle any URL is not possible.
 *
 * @param base - optional base to provide. Defaults to \`location.pathname + location.search\` If there is a \`<base>\` tag
 * in the \`head\`, its value will be ignored in favor of this parameter **but note it affects all the history.pushState()
 * calls**, meaning that if you use a \`<base>\` tag, it's \`href\` value **has to match this parameter** (ignoring anything
 * after the \`#\`).
 *
 * @example
 * \`\`\`js
 * // at https://example.com/folder
 * createWebHashHistory() // gives a url of \`https://example.com/folder#\`
 * createWebHashHistory('/folder/') // gives a url of \`https://example.com/folder/#\`
 * // if the \`#\` is provided in the base, it won't be added by \`createWebHashHistory\`
 * createWebHashHistory('/folder/#/app/') // gives a url of \`https://example.com/folder/#/app/\`
 * // you should avoid doing this because it changes the original url and breaks copying urls
 * createWebHashHistory('/other-folder/') // gives a url of \`https://example.com/other-folder/#\`
 *
 * // at file:///usr/etc/folder/index.html
 * // for locations with no \`host\`, the base is ignored
 * createWebHashHistory('/iAmIgnored') // gives a url of \`file:///usr/etc/folder/index.html#\`
 * \`\`\`
 */
function createWebHashHistory(base) {
    // Make sure this implementation is fine in terms of encoding, specially for IE11
    // for \`file://\`, directly use the pathname and ignore the base
    // location.pathname contains an initial \`/\` even at the root: \`https://example.com\`
    base = location.host ? base || location.pathname + location.search : '';
    // allow the user to provide a \`#\` in the middle: \`/base/#/app\`
    if (!base.includes('#'))
        base += '#';
    if (!base.endsWith('#/') && !base.endsWith('#')) {
        warn(\`A hash base must end with a "#":\\n"\${base}" should be "\${base.replace(/#.*$/, '#')}".\`);
    }
    return createWebHistory(base);
}

function isRouteLocation(route) {
    return typeof route === 'string' || (route && typeof route === 'object');
}
function isRouteName(name) {
    return typeof name === 'string' || typeof name === 'symbol';
}

/**
 * Initial route location where the router is. Can be used in navigation guards
 * to differentiate the initial navigation.
 *
 * @example
 * \`\`\`js
 * import { START_LOCATION } from 'vue-router'
 *
 * router.beforeEach((to, from) => {
 *   if (from === START_LOCATION) {
 *     // initial navigation
 *   }
 * })
 * \`\`\`
 */
const START_LOCATION_NORMALIZED = {
    path: '/',
    name: undefined,
    params: {},
    query: {},
    hash: '',
    fullPath: '/',
    matched: [],
    meta: {},
    redirectedFrom: undefined,
};

const NavigationFailureSymbol = Symbol('navigation failure' );
/**
 * Enumeration with all possible types for navigation failures. Can be passed to
 * {@link isNavigationFailure} to check for specific failures.
 */
var NavigationFailureType;
(function (NavigationFailureType) {
    /**
     * An aborted navigation is a navigation that failed because a navigation
     * guard returned \`false\` or called \`next(false)\`
     */
    NavigationFailureType[NavigationFailureType["aborted"] = 4] = "aborted";
    /**
     * A cancelled navigation is a navigation that failed because a more recent
     * navigation finished started (not necessarily finished).
     */
    NavigationFailureType[NavigationFailureType["cancelled"] = 8] = "cancelled";
    /**
     * A duplicated navigation is a navigation that failed because it was
     * initiated while already being at the exact same location.
     */
    NavigationFailureType[NavigationFailureType["duplicated"] = 16] = "duplicated";
})(NavigationFailureType || (NavigationFailureType = {}));
// DEV only debug messages
const ErrorTypeMessages = {
    [1 /* ErrorTypes.MATCHER_NOT_FOUND */]({ location, currentLocation }) {
        return \`No match for\\n \${JSON.stringify(location)}\${currentLocation
            ? '\\nwhile being at\\n' + JSON.stringify(currentLocation)
            : ''}\`;
    },
    [2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */]({ from, to, }) {
        return \`Redirected from "\${from.fullPath}" to "\${stringifyRoute(to)}" via a navigation guard.\`;
    },
    [4 /* ErrorTypes.NAVIGATION_ABORTED */]({ from, to }) {
        return \`Navigation aborted from "\${from.fullPath}" to "\${to.fullPath}" via a navigation guard.\`;
    },
    [8 /* ErrorTypes.NAVIGATION_CANCELLED */]({ from, to }) {
        return \`Navigation cancelled from "\${from.fullPath}" to "\${to.fullPath}" with a new navigation.\`;
    },
    [16 /* ErrorTypes.NAVIGATION_DUPLICATED */]({ from, to }) {
        return \`Avoided redundant navigation to current location: "\${from.fullPath}".\`;
    },
};
function createRouterError(type, params) {
    // keep full error messages in cjs versions
    {
        return assign(new Error(ErrorTypeMessages[type](params)), {
            type,
            [NavigationFailureSymbol]: true,
        }, params);
    }
}
function isNavigationFailure(error, type) {
    return (error instanceof Error &&
        NavigationFailureSymbol in error &&
        (type == null || !!(error.type & type)));
}
const propertiesToLog = ['params', 'query', 'hash'];
function stringifyRoute(to) {
    if (typeof to === 'string')
        return to;
    if ('path' in to)
        return to.path;
    const location = {};
    for (const key of propertiesToLog) {
        if (key in to)
            location[key] = to[key];
    }
    return JSON.stringify(location, null, 2);
}

// default pattern for a param: non-greedy everything but /
const BASE_PARAM_PATTERN = '[^/]+?';
const BASE_PATH_PARSER_OPTIONS = {
    sensitive: false,
    strict: false,
    start: true,
    end: true,
};
// Special Regex characters that must be escaped in static tokens
const REGEX_CHARS_RE = /[.+*?^\${}()[\\]/\\\\]/g;
/**
 * Creates a path parser from an array of Segments (a segment is an array of Tokens)
 *
 * @param segments - array of segments returned by tokenizePath
 * @param extraOptions - optional options for the regexp
 * @returns a PathParser
 */
function tokensToParser(segments, extraOptions) {
    const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
    // the amount of scores is the same as the length of segments except for the root segment "/"
    const score = [];
    // the regexp as a string
    let pattern = options.start ? '^' : '';
    // extracted keys
    const keys = [];
    for (const segment of segments) {
        // the root segment needs special treatment
        const segmentScores = segment.length ? [] : [90 /* PathScore.Root */];
        // allow trailing slash
        if (options.strict && !segment.length)
            pattern += '/';
        for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
            const token = segment[tokenIndex];
            // resets the score if we are inside a sub-segment /:a-other-:b
            let subSegmentScore = 40 /* PathScore.Segment */ +
                (options.sensitive ? 0.25 /* PathScore.BonusCaseSensitive */ : 0);
            if (token.type === 0 /* TokenType.Static */) {
                // prepend the slash if we are starting a new segment
                if (!tokenIndex)
                    pattern += '/';
                pattern += token.value.replace(REGEX_CHARS_RE, '\\\\$&');
                subSegmentScore += 40 /* PathScore.Static */;
            }
            else if (token.type === 1 /* TokenType.Param */) {
                const { value, repeatable, optional, regexp } = token;
                keys.push({
                    name: value,
                    repeatable,
                    optional,
                });
                const re = regexp ? regexp : BASE_PARAM_PATTERN;
                // the user provided a custom regexp /:id(\\\\d+)
                if (re !== BASE_PARAM_PATTERN) {
                    subSegmentScore += 10 /* PathScore.BonusCustomRegExp */;
                    // make sure the regexp is valid before using it
                    try {
                        new RegExp(\`(\${re})\`);
                    }
                    catch (err) {
                        throw new Error(\`Invalid custom RegExp for param "\${value}" (\${re}): \` +
                            err.message);
                    }
                }
                // when we repeat we must take care of the repeating leading slash
                let subPattern = repeatable ? \`((?:\${re})(?:/(?:\${re}))*)\` : \`(\${re})\`;
                // prepend the slash if we are starting a new segment
                if (!tokenIndex)
                    subPattern =
                        // avoid an optional / if there are more segments e.g. /:p?-static
                        // or /:p?-:p2
                        optional && segment.length < 2
                            ? \`(?:/\${subPattern})\`
                            : '/' + subPattern;
                if (optional)
                    subPattern += '?';
                pattern += subPattern;
                subSegmentScore += 20 /* PathScore.Dynamic */;
                if (optional)
                    subSegmentScore += -8 /* PathScore.BonusOptional */;
                if (repeatable)
                    subSegmentScore += -20 /* PathScore.BonusRepeatable */;
                if (re === '.*')
                    subSegmentScore += -50 /* PathScore.BonusWildcard */;
            }
            segmentScores.push(subSegmentScore);
        }
        // an empty array like /home/ -> [[{home}], []]
        // if (!segment.length) pattern += '/'
        score.push(segmentScores);
    }
    // only apply the strict bonus to the last score
    if (options.strict && options.end) {
        const i = score.length - 1;
        score[i][score[i].length - 1] += 0.7000000000000001 /* PathScore.BonusStrict */;
    }
    // TODO: dev only warn double trailing slash
    if (!options.strict)
        pattern += '/?';
    if (options.end)
        pattern += '$';
    // allow paths like /dynamic to only match dynamic or dynamic/... but not dynamic_something_else
    else if (options.strict)
        pattern += '(?:/|$)';
    const re = new RegExp(pattern, options.sensitive ? '' : 'i');
    function parse(path) {
        const match = path.match(re);
        const params = {};
        if (!match)
            return null;
        for (let i = 1; i < match.length; i++) {
            const value = match[i] || '';
            const key = keys[i - 1];
            params[key.name] = value && key.repeatable ? value.split('/') : value;
        }
        return params;
    }
    function stringify(params) {
        let path = '';
        // for optional parameters to allow to be empty
        let avoidDuplicatedSlash = false;
        for (const segment of segments) {
            if (!avoidDuplicatedSlash || !path.endsWith('/'))
                path += '/';
            avoidDuplicatedSlash = false;
            for (const token of segment) {
                if (token.type === 0 /* TokenType.Static */) {
                    path += token.value;
                }
                else if (token.type === 1 /* TokenType.Param */) {
                    const { value, repeatable, optional } = token;
                    const param = value in params ? params[value] : '';
                    if (isArray(param) && !repeatable) {
                        throw new Error(\`Provided param "\${value}" is an array but it is not repeatable (* or + modifiers)\`);
                    }
                    const text = isArray(param)
                        ? param.join('/')
                        : param;
                    if (!text) {
                        if (optional) {
                            // if we have more than one optional param like /:a?-static we don't need to care about the optional param
                            if (segment.length < 2) {
                                // remove the last slash as we could be at the end
                                if (path.endsWith('/'))
                                    path = path.slice(0, -1);
                                // do not append a slash on the next iteration
                                else
                                    avoidDuplicatedSlash = true;
                            }
                        }
                        else
                            throw new Error(\`Missing required param "\${value}"\`);
                    }
                    path += text;
                }
            }
        }
        // avoid empty path when we have multiple optional params
        return path || '/';
    }
    return {
        re,
        score,
        keys,
        parse,
        stringify,
    };
}
/**
 * Compares an array of numbers as used in PathParser.score and returns a
 * number. This function can be used to \`sort\` an array
 *
 * @param a - first array of numbers
 * @param b - second array of numbers
 * @returns 0 if both are equal, < 0 if a should be sorted first, > 0 if b
 * should be sorted first
 */
function compareScoreArray(a, b) {
    let i = 0;
    while (i < a.length && i < b.length) {
        const diff = b[i] - a[i];
        // only keep going if diff === 0
        if (diff)
            return diff;
        i++;
    }
    // if the last subsegment was Static, the shorter segments should be sorted first
    // otherwise sort the longest segment first
    if (a.length < b.length) {
        return a.length === 1 && a[0] === 40 /* PathScore.Static */ + 40 /* PathScore.Segment */
            ? -1
            : 1;
    }
    else if (a.length > b.length) {
        return b.length === 1 && b[0] === 40 /* PathScore.Static */ + 40 /* PathScore.Segment */
            ? 1
            : -1;
    }
    return 0;
}
/**
 * Compare function that can be used with \`sort\` to sort an array of PathParser
 *
 * @param a - first PathParser
 * @param b - second PathParser
 * @returns 0 if both are equal, < 0 if a should be sorted first, > 0 if b
 */
function comparePathParserScore(a, b) {
    let i = 0;
    const aScore = a.score;
    const bScore = b.score;
    while (i < aScore.length && i < bScore.length) {
        const comp = compareScoreArray(aScore[i], bScore[i]);
        // do not return if both are equal
        if (comp)
            return comp;
        i++;
    }
    if (Math.abs(bScore.length - aScore.length) === 1) {
        if (isLastScoreNegative(aScore))
            return 1;
        if (isLastScoreNegative(bScore))
            return -1;
    }
    // if a and b share the same score entries but b has more, sort b first
    return bScore.length - aScore.length;
    // this is the ternary version
    // return aScore.length < bScore.length
    //   ? 1
    //   : aScore.length > bScore.length
    //   ? -1
    //   : 0
}
/**
 * This allows detecting splats at the end of a path: /home/:id(.*)*
 *
 * @param score - score to check
 * @returns true if the last entry is negative
 */
function isLastScoreNegative(score) {
    const last = score[score.length - 1];
    return score.length > 0 && last[last.length - 1] < 0;
}

const ROOT_TOKEN = {
    type: 0 /* TokenType.Static */,
    value: '',
};
const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
// After some profiling, the cache seems to be unnecessary because tokenizePath
// (the slowest part of adding a route) is very fast
// const tokenCache = new Map<string, Token[][]>()
function tokenizePath(path) {
    if (!path)
        return [[]];
    if (path === '/')
        return [[ROOT_TOKEN]];
    if (!path.startsWith('/')) {
        throw new Error(\`Route paths should start with a "/": "\${path}" should be "/\${path}".\`
            );
    }
    // if (tokenCache.has(path)) return tokenCache.get(path)!
    function crash(message) {
        throw new Error(\`ERR (\${state})/"\${buffer}": \${message}\`);
    }
    let state = 0 /* TokenizerState.Static */;
    let previousState = state;
    const tokens = [];
    // the segment will always be valid because we get into the initial state
    // with the leading /
    let segment;
    function finalizeSegment() {
        if (segment)
            tokens.push(segment);
        segment = [];
    }
    // index on the path
    let i = 0;
    // char at index
    let char;
    // buffer of the value read
    let buffer = '';
    // custom regexp for a param
    let customRe = '';
    function consumeBuffer() {
        if (!buffer)
            return;
        if (state === 0 /* TokenizerState.Static */) {
            segment.push({
                type: 0 /* TokenType.Static */,
                value: buffer,
            });
        }
        else if (state === 1 /* TokenizerState.Param */ ||
            state === 2 /* TokenizerState.ParamRegExp */ ||
            state === 3 /* TokenizerState.ParamRegExpEnd */) {
            if (segment.length > 1 && (char === '*' || char === '+'))
                crash(\`A repeatable param (\${buffer}) must be alone in its segment. eg: '/:ids+.\`);
            segment.push({
                type: 1 /* TokenType.Param */,
                value: buffer,
                regexp: customRe,
                repeatable: char === '*' || char === '+',
                optional: char === '*' || char === '?',
            });
        }
        else {
            crash('Invalid state to consume buffer');
        }
        buffer = '';
    }
    function addCharToBuffer() {
        buffer += char;
    }
    while (i < path.length) {
        char = path[i++];
        if (char === '\\\\' && state !== 2 /* TokenizerState.ParamRegExp */) {
            previousState = state;
            state = 4 /* TokenizerState.EscapeNext */;
            continue;
        }
        switch (state) {
            case 0 /* TokenizerState.Static */:
                if (char === '/') {
                    if (buffer) {
                        consumeBuffer();
                    }
                    finalizeSegment();
                }
                else if (char === ':') {
                    consumeBuffer();
                    state = 1 /* TokenizerState.Param */;
                }
                else {
                    addCharToBuffer();
                }
                break;
            case 4 /* TokenizerState.EscapeNext */:
                addCharToBuffer();
                state = previousState;
                break;
            case 1 /* TokenizerState.Param */:
                if (char === '(') {
                    state = 2 /* TokenizerState.ParamRegExp */;
                }
                else if (VALID_PARAM_RE.test(char)) {
                    addCharToBuffer();
                }
                else {
                    consumeBuffer();
                    state = 0 /* TokenizerState.Static */;
                    // go back one character if we were not modifying
                    if (char !== '*' && char !== '?' && char !== '+')
                        i--;
                }
                break;
            case 2 /* TokenizerState.ParamRegExp */:
                // TODO: is it worth handling nested regexp? like :p(?:prefix_([^/]+)_suffix)
                // it already works by escaping the closing )
                // https://paths.esm.dev/?p=AAMeJbiAwQEcDKbAoAAkP60PG2R6QAvgNaA6AFACM2ABuQBB#
                // is this really something people need since you can also write
                // /prefix_:p()_suffix
                if (char === ')') {
                    // handle the escaped )
                    if (customRe[customRe.length - 1] == '\\\\')
                        customRe = customRe.slice(0, -1) + char;
                    else
                        state = 3 /* TokenizerState.ParamRegExpEnd */;
                }
                else {
                    customRe += char;
                }
                break;
            case 3 /* TokenizerState.ParamRegExpEnd */:
                // same as finalizing a param
                consumeBuffer();
                state = 0 /* TokenizerState.Static */;
                // go back one character if we were not modifying
                if (char !== '*' && char !== '?' && char !== '+')
                    i--;
                customRe = '';
                break;
            default:
                crash('Unknown state');
                break;
        }
    }
    if (state === 2 /* TokenizerState.ParamRegExp */)
        crash(\`Unfinished custom RegExp for param "\${buffer}"\`);
    consumeBuffer();
    finalizeSegment();
    // tokenCache.set(path, tokens)
    return tokens;
}

function createRouteRecordMatcher(record, parent, options) {
    const parser = tokensToParser(tokenizePath(record.path), options);
    // warn against params with the same name
    {
        const existingKeys = new Set();
        for (const key of parser.keys) {
            if (existingKeys.has(key.name))
                warn(\`Found duplicated params with name "\${key.name}" for path "\${record.path}". Only the last one will be available on "$route.params".\`);
            existingKeys.add(key.name);
        }
    }
    const matcher = assign(parser, {
        record,
        parent,
        // these needs to be populated by the parent
        children: [],
        alias: [],
    });
    if (parent) {
        // both are aliases or both are not aliases
        // we don't want to mix them because the order is used when
        // passing originalRecord in Matcher.addRoute
        if (!matcher.record.aliasOf === !parent.record.aliasOf)
            parent.children.push(matcher);
    }
    return matcher;
}

/**
 * Creates a Router Matcher.
 *
 * @internal
 * @param routes - array of initial routes
 * @param globalOptions - global route options
 */
function createRouterMatcher(routes, globalOptions) {
    // normalized ordered array of matchers
    const matchers = [];
    const matcherMap = new Map();
    globalOptions = mergeOptions({ strict: false, end: true, sensitive: false }, globalOptions);
    function getRecordMatcher(name) {
        return matcherMap.get(name);
    }
    function addRoute(record, parent, originalRecord) {
        // used later on to remove by name
        const isRootAdd = !originalRecord;
        const mainNormalizedRecord = normalizeRouteRecord(record);
        {
            checkChildMissingNameWithEmptyPath(mainNormalizedRecord, parent);
        }
        // we might be the child of an alias
        mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
        const options = mergeOptions(globalOptions, record);
        // generate an array of records to correctly handle aliases
        const normalizedRecords = [
            mainNormalizedRecord,
        ];
        if ('alias' in record) {
            const aliases = typeof record.alias === 'string' ? [record.alias] : record.alias;
            for (const alias of aliases) {
                normalizedRecords.push(assign({}, mainNormalizedRecord, {
                    // this allows us to hold a copy of the \`components\` option
                    // so that async components cache is hold on the original record
                    components: originalRecord
                        ? originalRecord.record.components
                        : mainNormalizedRecord.components,
                    path: alias,
                    // we might be the child of an alias
                    aliasOf: originalRecord
                        ? originalRecord.record
                        : mainNormalizedRecord,
                    // the aliases are always of the same kind as the original since they
                    // are defined on the same record
                }));
            }
        }
        let matcher;
        let originalMatcher;
        for (const normalizedRecord of normalizedRecords) {
            const { path } = normalizedRecord;
            // Build up the path for nested routes if the child isn't an absolute
            // route. Only add the / delimiter if the child path isn't empty and if the
            // parent path doesn't have a trailing slash
            if (parent && path[0] !== '/') {
                const parentPath = parent.record.path;
                const connectingSlash = parentPath[parentPath.length - 1] === '/' ? '' : '/';
                normalizedRecord.path =
                    parent.record.path + (path && connectingSlash + path);
            }
            if (normalizedRecord.path === '*') {
                throw new Error('Catch all routes ("*") must now be defined using a param with a custom regexp.\\n' +
                    'See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.');
            }
            // create the object beforehand, so it can be passed to children
            matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
            if (parent && path[0] === '/')
                checkMissingParamsInAbsolutePath(matcher, parent);
            // if we are an alias we must tell the original record that we exist,
            // so we can be removed
            if (originalRecord) {
                originalRecord.alias.push(matcher);
                {
                    checkSameParams(originalRecord, matcher);
                }
            }
            else {
                // otherwise, the first record is the original and others are aliases
                originalMatcher = originalMatcher || matcher;
                if (originalMatcher !== matcher)
                    originalMatcher.alias.push(matcher);
                // remove the route if named and only for the top record (avoid in nested calls)
                // this works because the original record is the first one
                if (isRootAdd && record.name && !isAliasRecord(matcher))
                    removeRoute(record.name);
            }
            if (mainNormalizedRecord.children) {
                const children = mainNormalizedRecord.children;
                for (let i = 0; i < children.length; i++) {
                    addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
                }
            }
            // if there was no original record, then the first one was not an alias and all
            // other aliases (if any) need to reference this record when adding children
            originalRecord = originalRecord || matcher;
            // TODO: add normalized records for more flexibility
            // if (parent && isAliasRecord(originalRecord)) {
            //   parent.children.push(originalRecord)
            // }
            // Avoid adding a record that doesn't display anything. This allows passing through records without a component to
            // not be reached and pass through the catch all route
            if ((matcher.record.components &&
                Object.keys(matcher.record.components).length) ||
                matcher.record.name ||
                matcher.record.redirect) {
                insertMatcher(matcher);
            }
        }
        return originalMatcher
            ? () => {
                // since other matchers are aliases, they should be removed by the original matcher
                removeRoute(originalMatcher);
            }
            : noop;
    }
    function removeRoute(matcherRef) {
        if (isRouteName(matcherRef)) {
            const matcher = matcherMap.get(matcherRef);
            if (matcher) {
                matcherMap.delete(matcherRef);
                matchers.splice(matchers.indexOf(matcher), 1);
                matcher.children.forEach(removeRoute);
                matcher.alias.forEach(removeRoute);
            }
        }
        else {
            const index = matchers.indexOf(matcherRef);
            if (index > -1) {
                matchers.splice(index, 1);
                if (matcherRef.record.name)
                    matcherMap.delete(matcherRef.record.name);
                matcherRef.children.forEach(removeRoute);
                matcherRef.alias.forEach(removeRoute);
            }
        }
    }
    function getRoutes() {
        return matchers;
    }
    function insertMatcher(matcher) {
        let i = 0;
        while (i < matchers.length &&
            comparePathParserScore(matcher, matchers[i]) >= 0 &&
            // Adding children with empty path should still appear before the parent
            // https://github.com/vuejs/router/issues/1124
            (matcher.record.path !== matchers[i].record.path ||
                !isRecordChildOf(matcher, matchers[i])))
            i++;
        matchers.splice(i, 0, matcher);
        // only add the original record to the name map
        if (matcher.record.name && !isAliasRecord(matcher))
            matcherMap.set(matcher.record.name, matcher);
    }
    function resolve(location, currentLocation) {
        let matcher;
        let params = {};
        let path;
        let name;
        if ('name' in location && location.name) {
            matcher = matcherMap.get(location.name);
            if (!matcher)
                throw createRouterError(1 /* ErrorTypes.MATCHER_NOT_FOUND */, {
                    location,
                });
            // warn if the user is passing invalid params so they can debug it better when they get removed
            {
                const invalidParams = Object.keys(location.params || {}).filter(paramName => !matcher.keys.find(k => k.name === paramName));
                if (invalidParams.length) {
                    warn(\`Discarded invalid param(s) "\${invalidParams.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.\`);
                }
            }
            name = matcher.record.name;
            params = assign(
            // paramsFromLocation is a new object
            paramsFromLocation(currentLocation.params, 
            // only keep params that exist in the resolved location
            // TODO: only keep optional params coming from a parent record
            matcher.keys.filter(k => !k.optional).map(k => k.name)), 
            // discard any existing params in the current location that do not exist here
            // #1497 this ensures better active/exact matching
            location.params &&
                paramsFromLocation(location.params, matcher.keys.map(k => k.name)));
            // throws if cannot be stringified
            path = matcher.stringify(params);
        }
        else if ('path' in location) {
            // no need to resolve the path with the matcher as it was provided
            // this also allows the user to control the encoding
            path = location.path;
            if (!path.startsWith('/')) {
                warn(\`The Matcher cannot resolve relative paths but received "\${path}". Unless you directly called \\\`matcher.resolve("\${path}")\\\`, this is probably a bug in vue-router. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/router.\`);
            }
            matcher = matchers.find(m => m.re.test(path));
            // matcher should have a value after the loop
            if (matcher) {
                // we know the matcher works because we tested the regexp
                params = matcher.parse(path);
                name = matcher.record.name;
            }
            // location is a relative path
        }
        else {
            // match by name or path of current route
            matcher = currentLocation.name
                ? matcherMap.get(currentLocation.name)
                : matchers.find(m => m.re.test(currentLocation.path));
            if (!matcher)
                throw createRouterError(1 /* ErrorTypes.MATCHER_NOT_FOUND */, {
                    location,
                    currentLocation,
                });
            name = matcher.record.name;
            // since we are navigating to the same location, we don't need to pick the
            // params like when \`name\` is provided
            params = assign({}, currentLocation.params, location.params);
            path = matcher.stringify(params);
        }
        const matched = [];
        let parentMatcher = matcher;
        while (parentMatcher) {
            // reversed order so parents are at the beginning
            matched.unshift(parentMatcher.record);
            parentMatcher = parentMatcher.parent;
        }
        return {
            name,
            path,
            params,
            matched,
            meta: mergeMetaFields(matched),
        };
    }
    // add initial routes
    routes.forEach(route => addRoute(route));
    return { addRoute, resolve, removeRoute, getRoutes, getRecordMatcher };
}
function paramsFromLocation(params, keys) {
    const newParams = {};
    for (const key of keys) {
        if (key in params)
            newParams[key] = params[key];
    }
    return newParams;
}
/**
 * Normalizes a RouteRecordRaw. Creates a copy
 *
 * @param record
 * @returns the normalized version
 */
function normalizeRouteRecord(record) {
    return {
        path: record.path,
        redirect: record.redirect,
        name: record.name,
        meta: record.meta || {},
        aliasOf: undefined,
        beforeEnter: record.beforeEnter,
        props: normalizeRecordProps(record),
        children: record.children || [],
        instances: {},
        leaveGuards: new Set(),
        updateGuards: new Set(),
        enterCallbacks: {},
        components: 'components' in record
            ? record.components || null
            : record.component && { default: record.component },
    };
}
/**
 * Normalize the optional \`props\` in a record to always be an object similar to
 * components. Also accept a boolean for components.
 * @param record
 */
function normalizeRecordProps(record) {
    const propsObject = {};
    // props does not exist on redirect records, but we can set false directly
    const props = record.props || false;
    if ('component' in record) {
        propsObject.default = props;
    }
    else {
        // NOTE: we could also allow a function to be applied to every component.
        // Would need user feedback for use cases
        for (const name in record.components)
            propsObject[name] = typeof props === 'boolean' ? props : props[name];
    }
    return propsObject;
}
/**
 * Checks if a record or any of its parent is an alias
 * @param record
 */
function isAliasRecord(record) {
    while (record) {
        if (record.record.aliasOf)
            return true;
        record = record.parent;
    }
    return false;
}
/**
 * Merge meta fields of an array of records
 *
 * @param matched - array of matched records
 */
function mergeMetaFields(matched) {
    return matched.reduce((meta, record) => assign(meta, record.meta), {});
}
function mergeOptions(defaults, partialOptions) {
    const options = {};
    for (const key in defaults) {
        options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
    }
    return options;
}
function isSameParam(a, b) {
    return (a.name === b.name &&
        a.optional === b.optional &&
        a.repeatable === b.repeatable);
}
/**
 * Check if a path and its alias have the same required params
 *
 * @param a - original record
 * @param b - alias record
 */
function checkSameParams(a, b) {
    for (const key of a.keys) {
        if (!key.optional && !b.keys.find(isSameParam.bind(null, key)))
            return warn(\`Alias "\${b.record.path}" and the original record: "\${a.record.path}" must have the exact same param named "\${key.name}"\`);
    }
    for (const key of b.keys) {
        if (!key.optional && !a.keys.find(isSameParam.bind(null, key)))
            return warn(\`Alias "\${b.record.path}" and the original record: "\${a.record.path}" must have the exact same param named "\${key.name}"\`);
    }
}
/**
 * A route with a name and a child with an empty path without a name should warn when adding the route
 *
 * @param mainNormalizedRecord - RouteRecordNormalized
 * @param parent - RouteRecordMatcher
 */
function checkChildMissingNameWithEmptyPath(mainNormalizedRecord, parent) {
    if (parent &&
        parent.record.name &&
        !mainNormalizedRecord.name &&
        !mainNormalizedRecord.path) {
        warn(\`The route named "\${String(parent.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.\`);
    }
}
function checkMissingParamsInAbsolutePath(record, parent) {
    for (const key of parent.keys) {
        if (!record.keys.find(isSameParam.bind(null, key)))
            return warn(\`Absolute path "\${record.record.path}" must have the exact same param named "\${key.name}" as its parent "\${parent.record.path}".\`);
    }
}
function isRecordChildOf(record, parent) {
    return parent.children.some(child => child === record || isRecordChildOf(record, child));
}

/**
 * Encoding Rules ␣ = Space Path: ␣ " < > # ? { } Query: ␣ " < > # & = Hash: ␣ "
 * < > \`
 *
 * On top of that, the RFC3986 (https://tools.ietf.org/html/rfc3986#section-2.2)
 * defines some extra characters to be encoded. Most browsers do not encode them
 * in encodeURI https://github.com/whatwg/url/issues/369, so it may be safer to
 * also encode \`!'()*\`. Leaving un-encoded only ASCII alphanumeric(\`a-zA-Z0-9\`)
 * plus \`-._~\`. This extra safety should be applied to query by patching the
 * string returned by encodeURIComponent encodeURI also encodes \`[\\]^\`. \`\\\`
 * should be encoded to avoid ambiguity. Browsers (IE, FF, C) transform a \`\\\`
 * into a \`/\` if directly typed in. The _backtick_ (\`\`\`\`\`) should also be
 * encoded everywhere because some browsers like FF encode it when directly
 * written while others don't. Safari and IE don't encode \`\`"<>{}\`\`\` in hash.
 */
// const EXTRA_RESERVED_RE = /[!'()*]/g
// const encodeReservedReplacer = (c: string) => '%' + c.charCodeAt(0).toString(16)
const HASH_RE = /#/g; // %23
const AMPERSAND_RE = /&/g; // %26
const SLASH_RE = /\\//g; // %2F
const EQUAL_RE = /=/g; // %3D
const IM_RE = /\\?/g; // %3F
const PLUS_RE = /\\+/g; // %2B
/**
 * NOTE: It's not clear to me if we should encode the + symbol in queries, it
 * seems to be less flexible than not doing so and I can't find out the legacy
 * systems requiring this for regular requests like text/html. In the standard,
 * the encoding of the plus character is only mentioned for
 * application/x-www-form-urlencoded
 * (https://url.spec.whatwg.org/#urlencoded-parsing) and most browsers seems lo
 * leave the plus character as is in queries. To be more flexible, we allow the
 * plus character on the query, but it can also be manually encoded by the user.
 *
 * Resources:
 * - https://url.spec.whatwg.org/#urlencoded-parsing
 * - https://stackoverflow.com/questions/1634271/url-encoding-the-space-character-or-20
 */
const ENC_BRACKET_OPEN_RE = /%5B/g; // [
const ENC_BRACKET_CLOSE_RE = /%5D/g; // ]
const ENC_CARET_RE = /%5E/g; // ^
const ENC_BACKTICK_RE = /%60/g; // \`
const ENC_CURLY_OPEN_RE = /%7B/g; // {
const ENC_PIPE_RE = /%7C/g; // |
const ENC_CURLY_CLOSE_RE = /%7D/g; // }
const ENC_SPACE_RE = /%20/g; // }
/**
 * Encode characters that need to be encoded on the path, search and hash
 * sections of the URL.
 *
 * @internal
 * @param text - string to encode
 * @returns encoded string
 */
function commonEncode(text) {
    return encodeURI('' + text)
        .replace(ENC_PIPE_RE, '|')
        .replace(ENC_BRACKET_OPEN_RE, '[')
        .replace(ENC_BRACKET_CLOSE_RE, ']');
}
/**
 * Encode characters that need to be encoded on the hash section of the URL.
 *
 * @param text - string to encode
 * @returns encoded string
 */
function encodeHash(text) {
    return commonEncode(text)
        .replace(ENC_CURLY_OPEN_RE, '{')
        .replace(ENC_CURLY_CLOSE_RE, '}')
        .replace(ENC_CARET_RE, '^');
}
/**
 * Encode characters that need to be encoded query values on the query
 * section of the URL.
 *
 * @param text - string to encode
 * @returns encoded string
 */
function encodeQueryValue(text) {
    return (commonEncode(text)
        // Encode the space as +, encode the + to differentiate it from the space
        .replace(PLUS_RE, '%2B')
        .replace(ENC_SPACE_RE, '+')
        .replace(HASH_RE, '%23')
        .replace(AMPERSAND_RE, '%26')
        .replace(ENC_BACKTICK_RE, '\`')
        .replace(ENC_CURLY_OPEN_RE, '{')
        .replace(ENC_CURLY_CLOSE_RE, '}')
        .replace(ENC_CARET_RE, '^'));
}
/**
 * Like \`encodeQueryValue\` but also encodes the \`=\` character.
 *
 * @param text - string to encode
 */
function encodeQueryKey(text) {
    return encodeQueryValue(text).replace(EQUAL_RE, '%3D');
}
/**
 * Encode characters that need to be encoded on the path section of the URL.
 *
 * @param text - string to encode
 * @returns encoded string
 */
function encodePath(text) {
    return commonEncode(text).replace(HASH_RE, '%23').replace(IM_RE, '%3F');
}
/**
 * Encode characters that need to be encoded on the path section of the URL as a
 * param. This function encodes everything {@link encodePath} does plus the
 * slash (\`/\`) character. If \`text\` is \`null\` or \`undefined\`, returns an empty
 * string instead.
 *
 * @param text - string to encode
 * @returns encoded string
 */
function encodeParam(text) {
    return text == null ? '' : encodePath(text).replace(SLASH_RE, '%2F');
}
/**
 * Decode text using \`decodeURIComponent\`. Returns the original text if it
 * fails.
 *
 * @param text - string to decode
 * @returns decoded string
 */
function decode(text) {
    try {
        return decodeURIComponent('' + text);
    }
    catch (err) {
        warn(\`Error decoding "\${text}". Using original value\`);
    }
    return '' + text;
}

/**
 * Transforms a queryString into a {@link LocationQuery} object. Accept both, a
 * version with the leading \`?\` and without Should work as URLSearchParams

 * @internal
 *
 * @param search - search string to parse
 * @returns a query object
 */
function parseQuery(search) {
    const query = {};
    // avoid creating an object with an empty key and empty value
    // because of split('&')
    if (search === '' || search === '?')
        return query;
    const hasLeadingIM = search[0] === '?';
    const searchParams = (hasLeadingIM ? search.slice(1) : search).split('&');
    for (let i = 0; i < searchParams.length; ++i) {
        // pre decode the + into space
        const searchParam = searchParams[i].replace(PLUS_RE, ' ');
        // allow the = character
        const eqPos = searchParam.indexOf('=');
        const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
        const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
        if (key in query) {
            // an extra variable for ts types
            let currentValue = query[key];
            if (!isArray(currentValue)) {
                currentValue = query[key] = [currentValue];
            }
            currentValue.push(value);
        }
        else {
            query[key] = value;
        }
    }
    return query;
}
/**
 * Stringifies a {@link LocationQueryRaw} object. Like \`URLSearchParams\`, it
 * doesn't prepend a \`?\`
 *
 * @internal
 *
 * @param query - query object to stringify
 * @returns string version of the query without the leading \`?\`
 */
function stringifyQuery(query) {
    let search = '';
    for (let key in query) {
        const value = query[key];
        key = encodeQueryKey(key);
        if (value == null) {
            // only null adds the value
            if (value !== undefined) {
                search += (search.length ? '&' : '') + key;
            }
            continue;
        }
        // keep null values
        const values = isArray(value)
            ? value.map(v => v && encodeQueryValue(v))
            : [value && encodeQueryValue(value)];
        values.forEach(value => {
            // skip undefined values in arrays as if they were not present
            // smaller code than using filter
            if (value !== undefined) {
                // only append & with non-empty search
                search += (search.length ? '&' : '') + key;
                if (value != null)
                    search += '=' + value;
            }
        });
    }
    return search;
}
/**
 * Transforms a {@link LocationQueryRaw} into a {@link LocationQuery} by casting
 * numbers into strings, removing keys with an undefined value and replacing
 * undefined with null in arrays
 *
 * @param query - query object to normalize
 * @returns a normalized query object
 */
function normalizeQuery(query) {
    const normalizedQuery = {};
    for (const key in query) {
        const value = query[key];
        if (value !== undefined) {
            normalizedQuery[key] = isArray(value)
                ? value.map(v => (v == null ? null : '' + v))
                : value == null
                    ? value
                    : '' + value;
        }
    }
    return normalizedQuery;
}

/**
 * RouteRecord being rendered by the closest ancestor Router View. Used for
 * \`onBeforeRouteUpdate\` and \`onBeforeRouteLeave\`. rvlm stands for Router View
 * Location Matched
 *
 * @internal
 */
const matchedRouteKey = Symbol('router view location matched' );
/**
 * Allows overriding the router view depth to control which component in
 * \`matched\` is rendered. rvd stands for Router View Depth
 *
 * @internal
 */
const viewDepthKey = Symbol('router view depth' );
/**
 * Allows overriding the router instance returned by \`useRouter\` in tests. r
 * stands for router
 *
 * @internal
 */
const routerKey = Symbol('router' );
/**
 * Allows overriding the current route returned by \`useRoute\` in tests. rl
 * stands for route location
 *
 * @internal
 */
const routeLocationKey = Symbol('route location' );
/**
 * Allows overriding the current route used by router-view. Internally this is
 * used when the \`route\` prop is passed.
 *
 * @internal
 */
const routerViewLocationKey = Symbol('router view location' );

/**
 * Create a list of callbacks that can be reset. Used to create before and after navigation guards list
 */
function useCallbacks() {
    let handlers = [];
    function add(handler) {
        handlers.push(handler);
        return () => {
            const i = handlers.indexOf(handler);
            if (i > -1)
                handlers.splice(i, 1);
        };
    }
    function reset() {
        handlers = [];
    }
    return {
        add,
        list: () => handlers,
        reset,
    };
}

function registerGuard(record, name, guard) {
    const removeFromList = () => {
        record[name].delete(guard);
    };
    onUnmounted(removeFromList);
    onDeactivated(removeFromList);
    onActivated(() => {
        record[name].add(guard);
    });
    record[name].add(guard);
}
/**
 * Add a navigation guard that triggers whenever the component for the current
 * location is about to be left. Similar to {@link beforeRouteLeave} but can be
 * used in any component. The guard is removed when the component is unmounted.
 *
 * @param leaveGuard - {@link NavigationGuard}
 */
function onBeforeRouteLeave(leaveGuard) {
    if (!getCurrentInstance()) {
        warn('getCurrentInstance() returned null. onBeforeRouteLeave() must be called at the top of a setup function');
        return;
    }
    const activeRecord = inject(matchedRouteKey, 
    // to avoid warning
    {}).value;
    if (!activeRecord) {
        warn('No active route record was found when calling \`onBeforeRouteLeave()\`. Make sure you call this function inside a component child of <router-view>. Maybe you called it inside of App.vue?');
        return;
    }
    registerGuard(activeRecord, 'leaveGuards', leaveGuard);
}
/**
 * Add a navigation guard that triggers whenever the current location is about
 * to be updated. Similar to {@link beforeRouteUpdate} but can be used in any
 * component. The guard is removed when the component is unmounted.
 *
 * @param updateGuard - {@link NavigationGuard}
 */
function onBeforeRouteUpdate(updateGuard) {
    if (!getCurrentInstance()) {
        warn('getCurrentInstance() returned null. onBeforeRouteUpdate() must be called at the top of a setup function');
        return;
    }
    const activeRecord = inject(matchedRouteKey, 
    // to avoid warning
    {}).value;
    if (!activeRecord) {
        warn('No active route record was found when calling \`onBeforeRouteUpdate()\`. Make sure you call this function inside a component child of <router-view>. Maybe you called it inside of App.vue?');
        return;
    }
    registerGuard(activeRecord, 'updateGuards', updateGuard);
}
function guardToPromiseFn(guard, to, from, record, name) {
    // keep a reference to the enterCallbackArray to prevent pushing callbacks if a new navigation took place
    const enterCallbackArray = record &&
        // name is defined if record is because of the function overload
        (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
    return () => new Promise((resolve, reject) => {
        const next = (valid) => {
            if (valid === false) {
                reject(createRouterError(4 /* ErrorTypes.NAVIGATION_ABORTED */, {
                    from,
                    to,
                }));
            }
            else if (valid instanceof Error) {
                reject(valid);
            }
            else if (isRouteLocation(valid)) {
                reject(createRouterError(2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */, {
                    from: to,
                    to: valid,
                }));
            }
            else {
                if (enterCallbackArray &&
                    // since enterCallbackArray is truthy, both record and name also are
                    record.enterCallbacks[name] === enterCallbackArray &&
                    typeof valid === 'function') {
                    enterCallbackArray.push(valid);
                }
                resolve();
            }
        };
        // wrapping with Promise.resolve allows it to work with both async and sync guards
        const guardReturn = guard.call(record && record.instances[name], to, from, canOnlyBeCalledOnce(next, to, from) );
        let guardCall = Promise.resolve(guardReturn);
        if (guard.length < 3)
            guardCall = guardCall.then(next);
        if (guard.length > 2) {
            const message = \`The "next" callback was never called inside of \${guard.name ? '"' + guard.name + '"' : ''}:\\n\${guard.toString()}\\n. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.\`;
            if (typeof guardReturn === 'object' && 'then' in guardReturn) {
                guardCall = guardCall.then(resolvedValue => {
                    // @ts-expect-error: _called is added at canOnlyBeCalledOnce
                    if (!next._called) {
                        warn(message);
                        return Promise.reject(new Error('Invalid navigation guard'));
                    }
                    return resolvedValue;
                });
            }
            else if (guardReturn !== undefined) {
                // @ts-expect-error: _called is added at canOnlyBeCalledOnce
                if (!next._called) {
                    warn(message);
                    reject(new Error('Invalid navigation guard'));
                    return;
                }
            }
        }
        guardCall.catch(err => reject(err));
    });
}
function canOnlyBeCalledOnce(next, to, from) {
    let called = 0;
    return function () {
        if (called++ === 1)
            warn(\`The "next" callback was called more than once in one navigation guard when going from "\${from.fullPath}" to "\${to.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.\`);
        // @ts-expect-error: we put it in the original one because it's easier to check
        next._called = true;
        if (called === 1)
            next.apply(null, arguments);
    };
}
function extractComponentsGuards(matched, guardType, to, from) {
    const guards = [];
    for (const record of matched) {
        if (!record.components && !record.children.length) {
            warn(\`Record with path "\${record.path}" is either missing a "component(s)"\` +
                \` or "children" property.\`);
        }
        for (const name in record.components) {
            let rawComponent = record.components[name];
            {
                if (!rawComponent ||
                    (typeof rawComponent !== 'object' &&
                        typeof rawComponent !== 'function')) {
                    warn(\`Component "\${name}" in record with path "\${record.path}" is not\` +
                        \` a valid component. Received "\${String(rawComponent)}".\`);
                    // throw to ensure we stop here but warn to ensure the message isn't
                    // missed by the user
                    throw new Error('Invalid route component');
                }
                else if ('then' in rawComponent) {
                    // warn if user wrote import('/component.vue') instead of () =>
                    // import('./component.vue')
                    warn(\`Component "\${name}" in record with path "\${record.path}" is a \` +
                        \`Promise instead of a function that returns a Promise. Did you \` +
                        \`write "import('./MyPage.vue')" instead of \` +
                        \`"() => import('./MyPage.vue')" ? This will break in \` +
                        \`production if not fixed.\`);
                    const promise = rawComponent;
                    rawComponent = () => promise;
                }
                else if (rawComponent.__asyncLoader &&
                    // warn only once per component
                    !rawComponent.__warnedDefineAsync) {
                    rawComponent.__warnedDefineAsync = true;
                    warn(\`Component "\${name}" in record with path "\${record.path}" is defined \` +
                        \`using "defineAsyncComponent()". \` +
                        \`Write "() => import('./MyPage.vue')" instead of \` +
                        \`"defineAsyncComponent(() => import('./MyPage.vue'))".\`);
                }
            }
            // skip update and leave guards if the route component is not mounted
            if (guardType !== 'beforeRouteEnter' && !record.instances[name])
                continue;
            if (isRouteComponent(rawComponent)) {
                // __vccOpts is added by vue-class-component and contain the regular options
                const options = rawComponent.__vccOpts || rawComponent;
                const guard = options[guardType];
                guard && guards.push(guardToPromiseFn(guard, to, from, record, name));
            }
            else {
                // start requesting the chunk already
                let componentPromise = rawComponent();
                if (!('catch' in componentPromise)) {
                    warn(\`Component "\${name}" in record with path "\${record.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.\`);
                    componentPromise = Promise.resolve(componentPromise);
                }
                guards.push(() => componentPromise.then(resolved => {
                    if (!resolved)
                        return Promise.reject(new Error(\`Couldn't resolve component "\${name}" at "\${record.path}"\`));
                    const resolvedComponent = isESModule(resolved)
                        ? resolved.default
                        : resolved;
                    // replace the function with the resolved component
                    // cannot be null or undefined because we went into the for loop
                    record.components[name] = resolvedComponent;
                    // __vccOpts is added by vue-class-component and contain the regular options
                    const options = resolvedComponent.__vccOpts || resolvedComponent;
                    const guard = options[guardType];
                    return guard && guardToPromiseFn(guard, to, from, record, name)();
                }));
            }
        }
    }
    return guards;
}
/**
 * Allows differentiating lazy components from functional components and vue-class-component
 * @internal
 *
 * @param component
 */
function isRouteComponent(component) {
    return (typeof component === 'object' ||
        'displayName' in component ||
        'props' in component ||
        '__vccOpts' in component);
}
/**
 * Ensures a route is loaded, so it can be passed as o prop to \`<RouterView>\`.
 *
 * @param route - resolved route to load
 */
function loadRouteLocation(route) {
    return route.matched.every(record => record.redirect)
        ? Promise.reject(new Error('Cannot load a route that redirects.'))
        : Promise.all(route.matched.map(record => record.components &&
            Promise.all(Object.keys(record.components).reduce((promises, name) => {
                const rawComponent = record.components[name];
                if (typeof rawComponent === 'function' &&
                    !('displayName' in rawComponent)) {
                    promises.push(rawComponent().then(resolved => {
                        if (!resolved)
                            return Promise.reject(new Error(\`Couldn't resolve component "\${name}" at "\${record.path}". Ensure you passed a function that returns a promise.\`));
                        const resolvedComponent = isESModule(resolved)
                            ? resolved.default
                            : resolved;
                        // replace the function with the resolved component
                        // cannot be null or undefined because we went into the for loop
                        record.components[name] = resolvedComponent;
                        return;
                    }));
                }
                return promises;
            }, [])))).then(() => route);
}

// TODO: we could allow currentRoute as a prop to expose \`isActive\` and
// \`isExactActive\` behavior should go through an RFC
function useLink(props) {
    const router = inject(routerKey);
    const currentRoute = inject(routeLocationKey);
    const route = computed(() => router.resolve(unref(props.to)));
    const activeRecordIndex = computed(() => {
        const { matched } = route.value;
        const { length } = matched;
        const routeMatched = matched[length - 1];
        const currentMatched = currentRoute.matched;
        if (!routeMatched || !currentMatched.length)
            return -1;
        const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
        if (index > -1)
            return index;
        // possible parent record
        const parentRecordPath = getOriginalPath(matched[length - 2]);
        return (
        // we are dealing with nested routes
        length > 1 &&
            // if the parent and matched route have the same path, this link is
            // referring to the empty child. Or we currently are on a different
            // child of the same parent
            getOriginalPath(routeMatched) === parentRecordPath &&
            // avoid comparing the child with its parent
            currentMatched[currentMatched.length - 1].path !== parentRecordPath
            ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2]))
            : index);
    });
    const isActive = computed(() => activeRecordIndex.value > -1 &&
        includesParams(currentRoute.params, route.value.params));
    const isExactActive = computed(() => activeRecordIndex.value > -1 &&
        activeRecordIndex.value === currentRoute.matched.length - 1 &&
        isSameRouteLocationParams(currentRoute.params, route.value.params));
    function navigate(e = {}) {
        if (guardEvent(e)) {
            return router[unref(props.replace) ? 'replace' : 'push'](unref(props.to)
            // avoid uncaught errors are they are logged anyway
            ).catch(noop);
        }
        return Promise.resolve();
    }
    // devtools only
    if (isBrowser) {
        const instance = getCurrentInstance();
        if (instance) {
            const linkContextDevtools = {
                route: route.value,
                isActive: isActive.value,
                isExactActive: isExactActive.value,
            };
            // @ts-expect-error: this is internal
            instance.__vrl_devtools = instance.__vrl_devtools || [];
            // @ts-expect-error: this is internal
            instance.__vrl_devtools.push(linkContextDevtools);
            watchEffect(() => {
                linkContextDevtools.route = route.value;
                linkContextDevtools.isActive = isActive.value;
                linkContextDevtools.isExactActive = isExactActive.value;
            }, { flush: 'post' });
        }
    }
    /**
     * NOTE: update {@link _RouterLinkI}'s \`$slots\` type when updating this
     */
    return {
        route,
        href: computed(() => route.value.href),
        isActive,
        isExactActive,
        navigate,
    };
}
const RouterLinkImpl = /*#__PURE__*/ defineComponent({
    name: 'RouterLink',
    compatConfig: { MODE: 3 },
    props: {
        to: {
            type: [String, Object],
            required: true,
        },
        replace: Boolean,
        activeClass: String,
        // inactiveClass: String,
        exactActiveClass: String,
        custom: Boolean,
        ariaCurrentValue: {
            type: String,
            default: 'page',
        },
    },
    useLink,
    setup(props, { slots }) {
        const link = reactive(useLink(props));
        const { options } = inject(routerKey);
        const elClass = computed(() => ({
            [getLinkClass(props.activeClass, options.linkActiveClass, 'router-link-active')]: link.isActive,
            // [getLinkClass(
            //   props.inactiveClass,
            //   options.linkInactiveClass,
            //   'router-link-inactive'
            // )]: !link.isExactActive,
            [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, 'router-link-exact-active')]: link.isExactActive,
        }));
        return () => {
            const children = slots.default && slots.default(link);
            return props.custom
                ? children
                : h('a', {
                    'aria-current': link.isExactActive
                        ? props.ariaCurrentValue
                        : null,
                    href: link.href,
                    // this would override user added attrs but Vue will still add
                    // the listener, so we end up triggering both
                    onClick: link.navigate,
                    class: elClass.value,
                }, children);
        };
    },
});
// export the public type for h/tsx inference
// also to avoid inline import() in generated d.ts files
/**
 * Component to render a link that triggers a navigation on click.
 */
const RouterLink = RouterLinkImpl;
function guardEvent(e) {
    // don't redirect with control keys
    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
        return;
    // don't redirect when preventDefault called
    if (e.defaultPrevented)
        return;
    // don't redirect on right click
    if (e.button !== undefined && e.button !== 0)
        return;
    // don't redirect if \`target="_blank"\`
    // @ts-expect-error getAttribute does exist
    if (e.currentTarget && e.currentTarget.getAttribute) {
        // @ts-expect-error getAttribute exists
        const target = e.currentTarget.getAttribute('target');
        if (/\\b_blank\\b/i.test(target))
            return;
    }
    // this may be a Weex event which doesn't have this method
    if (e.preventDefault)
        e.preventDefault();
    return true;
}
function includesParams(outer, inner) {
    for (const key in inner) {
        const innerValue = inner[key];
        const outerValue = outer[key];
        if (typeof innerValue === 'string') {
            if (innerValue !== outerValue)
                return false;
        }
        else {
            if (!isArray(outerValue) ||
                outerValue.length !== innerValue.length ||
                innerValue.some((value, i) => value !== outerValue[i]))
                return false;
        }
    }
    return true;
}
/**
 * Get the original path value of a record by following its aliasOf
 * @param record
 */
function getOriginalPath(record) {
    return record ? (record.aliasOf ? record.aliasOf.path : record.path) : '';
}
/**
 * Utility class to get the active class based on defaults.
 * @param propClass
 * @param globalClass
 * @param defaultClass
 */
const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null
    ? propClass
    : globalClass != null
        ? globalClass
        : defaultClass;

const RouterViewImpl = /*#__PURE__*/ defineComponent({
    name: 'RouterView',
    // #674 we manually inherit them
    inheritAttrs: false,
    props: {
        name: {
            type: String,
            default: 'default',
        },
        route: Object,
    },
    // Better compat for @vue/compat users
    // https://github.com/vuejs/router/issues/1315
    compatConfig: { MODE: 3 },
    setup(props, { attrs, slots }) {
        warnDeprecatedUsage();
        const injectedRoute = inject(routerViewLocationKey);
        const routeToDisplay = computed(() => props.route || injectedRoute.value);
        const injectedDepth = inject(viewDepthKey, 0);
        // The depth changes based on empty components option, which allows passthrough routes e.g. routes with children
        // that are used to reuse the \`path\` property
        const depth = computed(() => {
            let initialDepth = unref(injectedDepth);
            const { matched } = routeToDisplay.value;
            let matchedRoute;
            while ((matchedRoute = matched[initialDepth]) &&
                !matchedRoute.components) {
                initialDepth++;
            }
            return initialDepth;
        });
        const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth.value]);
        provide(viewDepthKey, computed(() => depth.value + 1));
        provide(matchedRouteKey, matchedRouteRef);
        provide(routerViewLocationKey, routeToDisplay);
        const viewRef = ref();
        // watch at the same time the component instance, the route record we are
        // rendering, and the name
        watch(() => [viewRef.value, matchedRouteRef.value, props.name], ([instance, to, name], [oldInstance, from, oldName]) => {
            // copy reused instances
            if (to) {
                // this will update the instance for new instances as well as reused
                // instances when navigating to a new route
                to.instances[name] = instance;
                // the component instance is reused for a different route or name, so
                // we copy any saved update or leave guards. With async setup, the
                // mounting component will mount before the matchedRoute changes,
                // making instance === oldInstance, so we check if guards have been
                // added before. This works because we remove guards when
                // unmounting/deactivating components
                if (from && from !== to && instance && instance === oldInstance) {
                    if (!to.leaveGuards.size) {
                        to.leaveGuards = from.leaveGuards;
                    }
                    if (!to.updateGuards.size) {
                        to.updateGuards = from.updateGuards;
                    }
                }
            }
            // trigger beforeRouteEnter next callbacks
            if (instance &&
                to &&
                // if there is no instance but to and from are the same this might be
                // the first visit
                (!from || !isSameRouteRecord(to, from) || !oldInstance)) {
                (to.enterCallbacks[name] || []).forEach(callback => callback(instance));
            }
        }, { flush: 'post' });
        return () => {
            const route = routeToDisplay.value;
            // we need the value at the time we render because when we unmount, we
            // navigated to a different location so the value is different
            const currentName = props.name;
            const matchedRoute = matchedRouteRef.value;
            const ViewComponent = matchedRoute && matchedRoute.components[currentName];
            if (!ViewComponent) {
                return normalizeSlot(slots.default, { Component: ViewComponent, route });
            }
            // props from route configuration
            const routePropsOption = matchedRoute.props[currentName];
            const routeProps = routePropsOption
                ? routePropsOption === true
                    ? route.params
                    : typeof routePropsOption === 'function'
                        ? routePropsOption(route)
                        : routePropsOption
                : null;
            const onVnodeUnmounted = vnode => {
                // remove the instance reference to prevent leak
                if (vnode.component.isUnmounted) {
                    matchedRoute.instances[currentName] = null;
                }
            };
            const component = h(ViewComponent, assign({}, routeProps, attrs, {
                onVnodeUnmounted,
                ref: viewRef,
            }));
            if (isBrowser &&
                component.ref) {
                // TODO: can display if it's an alias, its props
                const info = {
                    depth: depth.value,
                    name: matchedRoute.name,
                    path: matchedRoute.path,
                    meta: matchedRoute.meta,
                };
                const internalInstances = isArray(component.ref)
                    ? component.ref.map(r => r.i)
                    : [component.ref.i];
                internalInstances.forEach(instance => {
                    // @ts-expect-error
                    instance.__vrv_devtools = info;
                });
            }
            return (
            // pass the vnode to the slot as a prop.
            // h and <component :is="..."> both accept vnodes
            normalizeSlot(slots.default, { Component: component, route }) ||
                component);
        };
    },
});
function normalizeSlot(slot, data) {
    if (!slot)
        return null;
    const slotContent = slot(data);
    return slotContent.length === 1 ? slotContent[0] : slotContent;
}
// export the public type for h/tsx inference
// also to avoid inline import() in generated d.ts files
/**
 * Component to display the current route the user is at.
 */
const RouterView = RouterViewImpl;
// warn against deprecated usage with <transition> & <keep-alive>
// due to functional component being no longer eager in Vue 3
function warnDeprecatedUsage() {
    const instance = getCurrentInstance();
    const parentName = instance.parent && instance.parent.type.name;
    if (parentName &&
        (parentName === 'KeepAlive' || parentName.includes('Transition'))) {
        const comp = parentName === 'KeepAlive' ? 'keep-alive' : 'transition';
        warn(\`<router-view> can no longer be used directly inside <transition> or <keep-alive>.\\n\` +
            \`Use slot props instead:\\n\\n\` +
            \`<router-view v-slot="{ Component }">\\n\` +
            \`  <\${comp}>\\n\` +
            \`    <component :is="Component" />\\n\` +
            \`  </\${comp}>\\n\` +
            \`</router-view>\`);
    }
}

/**
 * Copies a route location and removes any problematic properties that cannot be shown in devtools (e.g. Vue instances).
 *
 * @param routeLocation - routeLocation to format
 * @param tooltip - optional tooltip
 * @returns a copy of the routeLocation
 */
function formatRouteLocation(routeLocation, tooltip) {
    const copy = assign({}, routeLocation, {
        // remove variables that can contain vue instances
        matched: routeLocation.matched.map(matched => omit(matched, ['instances', 'children', 'aliasOf'])),
    });
    return {
        _custom: {
            type: null,
            readOnly: true,
            display: routeLocation.fullPath,
            tooltip,
            value: copy,
        },
    };
}
function formatDisplay(display) {
    return {
        _custom: {
            display,
        },
    };
}
function modifierForKey(key) {
    if (key.optional) {
        return key.repeatable ? '*' : '?';
    }
    else {
        return key.repeatable ? '+' : '';
    }
}
function formatRouteRecordMatcherForStateInspector(route) {
    const { record } = route;
    const fields = [
        { editable: false, key: 'path', value: record.path },
    ];
    if (record.name != null) {
        fields.push({
            editable: false,
            key: 'name',
            value: record.name,
        });
    }
    fields.push({ editable: false, key: 'regexp', value: route.re });
    if (route.keys.length) {
        fields.push({
            editable: false,
            key: 'keys',
            value: {
                _custom: {
                    type: null,
                    readOnly: true,
                    display: route.keys
                        .map(key => \`\${key.name}\${modifierForKey(key)}\`)
                        .join(' '),
                    tooltip: 'Param keys',
                    value: route.keys,
                },
            },
        });
    }
    if (record.redirect != null) {
        fields.push({
            editable: false,
            key: 'redirect',
            value: record.redirect,
        });
    }
    if (route.alias.length) {
        fields.push({
            editable: false,
            key: 'aliases',
            value: route.alias.map(alias => alias.record.path),
        });
    }
    if (Object.keys(route.record.meta).length) {
        fields.push({
            editable: false,
            key: 'meta',
            value: route.record.meta,
        });
    }
    fields.push({
        key: 'score',
        editable: false,
        value: {
            _custom: {
                type: null,
                readOnly: true,
                display: route.score.map(score => score.join(', ')).join(' | '),
                tooltip: 'Score used to sort routes',
                value: route.score,
            },
        },
    });
    return fields;
}
/**
 * Extracted from tailwind palette
 */
const PINK_500 = 0xec4899;
const BLUE_600 = 0x2563eb;
const LIME_500 = 0x84cc16;
const CYAN_400 = 0x22d3ee;
const ORANGE_400 = 0xfb923c;
// const GRAY_100 = 0xf4f4f5
const DARK = 0x666666;
function formatRouteRecordForInspector(route) {
    const tags = [];
    const { record } = route;
    if (record.name != null) {
        tags.push({
            label: String(record.name),
            textColor: 0,
            backgroundColor: CYAN_400,
        });
    }
    if (record.aliasOf) {
        tags.push({
            label: 'alias',
            textColor: 0,
            backgroundColor: ORANGE_400,
        });
    }
    if (route.__vd_match) {
        tags.push({
            label: 'matches',
            textColor: 0,
            backgroundColor: PINK_500,
        });
    }
    if (route.__vd_exactActive) {
        tags.push({
            label: 'exact',
            textColor: 0,
            backgroundColor: LIME_500,
        });
    }
    if (route.__vd_active) {
        tags.push({
            label: 'active',
            textColor: 0,
            backgroundColor: BLUE_600,
        });
    }
    if (record.redirect) {
        tags.push({
            label: typeof record.redirect === 'string'
                ? \`redirect: \${record.redirect}\`
                : 'redirects',
            textColor: 0xffffff,
            backgroundColor: DARK,
        });
    }
    // add an id to be able to select it. Using the \`path\` is not possible because
    // empty path children would collide with their parents
    let id = record.__vd_id;
    if (id == null) {
        id = String(routeRecordId++);
        record.__vd_id = id;
    }
    return {
        id,
        label: record.path,
        tags,
        children: route.children.map(formatRouteRecordForInspector),
    };
}
//  incremental id for route records and inspector state
let routeRecordId = 0;
const EXTRACT_REGEXP_RE = /^\\/(.*)\\/([a-z]*)$/;
function markRouteRecordActive(route, currentRoute) {
    // no route will be active if matched is empty
    // reset the matching state
    const isExactActive = currentRoute.matched.length &&
        isSameRouteRecord(currentRoute.matched[currentRoute.matched.length - 1], route.record);
    route.__vd_exactActive = route.__vd_active = isExactActive;
    if (!isExactActive) {
        route.__vd_active = currentRoute.matched.some(match => isSameRouteRecord(match, route.record));
    }
    route.children.forEach(childRoute => markRouteRecordActive(childRoute, currentRoute));
}
function resetMatchStateOnRouteRecord(route) {
    route.__vd_match = false;
    route.children.forEach(resetMatchStateOnRouteRecord);
}
function isRouteMatching(route, filter) {
    const found = String(route.re).match(EXTRACT_REGEXP_RE);
    route.__vd_match = false;
    if (!found || found.length < 3) {
        return false;
    }
    // use a regexp without $ at the end to match nested routes better
    const nonEndingRE = new RegExp(found[1].replace(/\\$$/, ''), found[2]);
    if (nonEndingRE.test(filter)) {
        // mark children as matches
        route.children.forEach(child => isRouteMatching(child, filter));
        // exception case: \`/\`
        if (route.record.path !== '/' || filter === '/') {
            route.__vd_match = route.re.test(filter);
            return true;
        }
        // hide the / route
        return false;
    }
    const path = route.record.path.toLowerCase();
    const decodedPath = decode(path);
    // also allow partial matching on the path
    if (!filter.startsWith('/') &&
        (decodedPath.includes(filter) || path.includes(filter)))
        return true;
    if (decodedPath.startsWith(filter) || path.startsWith(filter))
        return true;
    if (route.record.name && String(route.record.name).includes(filter))
        return true;
    return route.children.some(child => isRouteMatching(child, filter));
}
function omit(obj, keys) {
    const ret = {};
    for (const key in obj) {
        if (!keys.includes(key)) {
            // @ts-expect-error
            ret[key] = obj[key];
        }
    }
    return ret;
}

/**
 * Creates a Router instance that can be used by a Vue app.
 *
 * @param options - {@link RouterOptions}
 */
function createRouter(options) {
    const matcher = createRouterMatcher(options.routes, options);
    const parseQuery$1 = options.parseQuery || parseQuery;
    const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
    const routerHistory = options.history;
    if (!routerHistory)
        throw new Error('Provide the "history" option when calling "createRouter()":' +
            ' https://next.router.vuejs.org/api/#history.');
    const beforeGuards = useCallbacks();
    const beforeResolveGuards = useCallbacks();
    const afterGuards = useCallbacks();
    const currentRoute = shallowRef(START_LOCATION_NORMALIZED);
    let pendingLocation = START_LOCATION_NORMALIZED;
    // leave the scrollRestoration if no scrollBehavior is provided
    if (isBrowser && options.scrollBehavior && 'scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    const normalizeParams = applyToParams.bind(null, paramValue => '' + paramValue);
    const encodeParams = applyToParams.bind(null, encodeParam);
    const decodeParams = 
    // @ts-expect-error: intentionally avoid the type check
    applyToParams.bind(null, decode);
    function addRoute(parentOrRoute, route) {
        let parent;
        let record;
        if (isRouteName(parentOrRoute)) {
            parent = matcher.getRecordMatcher(parentOrRoute);
            record = route;
        }
        else {
            record = parentOrRoute;
        }
        return matcher.addRoute(record, parent);
    }
    function removeRoute(name) {
        const recordMatcher = matcher.getRecordMatcher(name);
        if (recordMatcher) {
            matcher.removeRoute(recordMatcher);
        }
        else {
            warn(\`Cannot remove non-existent route "\${String(name)}"\`);
        }
    }
    function getRoutes() {
        return matcher.getRoutes().map(routeMatcher => routeMatcher.record);
    }
    function hasRoute(name) {
        return !!matcher.getRecordMatcher(name);
    }
    function resolve(rawLocation, currentLocation) {
        // const objectLocation = routerLocationAsObject(rawLocation)
        // we create a copy to modify it later
        currentLocation = assign({}, currentLocation || currentRoute.value);
        if (typeof rawLocation === 'string') {
            const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
            const matchedRoute = matcher.resolve({ path: locationNormalized.path }, currentLocation);
            const href = routerHistory.createHref(locationNormalized.fullPath);
            {
                if (href.startsWith('//'))
                    warn(\`Location "\${rawLocation}" resolved to "\${href}". A resolved location cannot start with multiple slashes.\`);
                else if (!matchedRoute.matched.length) {
                    warn(\`No match found for location with path "\${rawLocation}"\`);
                }
            }
            // locationNormalized is always a new object
            return assign(locationNormalized, matchedRoute, {
                params: decodeParams(matchedRoute.params),
                hash: decode(locationNormalized.hash),
                redirectedFrom: undefined,
                href,
            });
        }
        let matcherLocation;
        // path could be relative in object as well
        if ('path' in rawLocation) {
            if ('params' in rawLocation &&
                !('name' in rawLocation) &&
                // @ts-expect-error: the type is never
                Object.keys(rawLocation.params).length) {
                warn(\`Path "\${
                // @ts-expect-error: the type is never
                rawLocation.path}" was passed with params but they will be ignored. Use a named route alongside params instead.\`);
            }
            matcherLocation = assign({}, rawLocation, {
                path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path,
            });
        }
        else {
            // remove any nullish param
            const targetParams = assign({}, rawLocation.params);
            for (const key in targetParams) {
                if (targetParams[key] == null) {
                    delete targetParams[key];
                }
            }
            // pass encoded values to the matcher, so it can produce encoded path and fullPath
            matcherLocation = assign({}, rawLocation, {
                params: encodeParams(rawLocation.params),
            });
            // current location params are decoded, we need to encode them in case the
            // matcher merges the params
            currentLocation.params = encodeParams(currentLocation.params);
        }
        const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
        const hash = rawLocation.hash || '';
        if (hash && !hash.startsWith('#')) {
            warn(\`A \\\`hash\\\` should always start with the character "#". Replace "\${hash}" with "#\${hash}".\`);
        }
        // the matcher might have merged current location params, so
        // we need to run the decoding again
        matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
        const fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
            hash: encodeHash(hash),
            path: matchedRoute.path,
        }));
        const href = routerHistory.createHref(fullPath);
        {
            if (href.startsWith('//')) {
                warn(\`Location "\${rawLocation}" resolved to "\${href}". A resolved location cannot start with multiple slashes.\`);
            }
            else if (!matchedRoute.matched.length) {
                warn(\`No match found for location with path "\${'path' in rawLocation ? rawLocation.path : rawLocation}"\`);
            }
        }
        return assign({
            fullPath,
            // keep the hash encoded so fullPath is effectively path + encodedQuery +
            // hash
            hash,
            query: 
            // if the user is using a custom query lib like qs, we might have
            // nested objects, so we keep the query as is, meaning it can contain
            // numbers at \`$route.query\`, but at the point, the user will have to
            // use their own type anyway.
            // https://github.com/vuejs/router/issues/328#issuecomment-649481567
            stringifyQuery$1 === stringifyQuery
                ? normalizeQuery(rawLocation.query)
                : (rawLocation.query || {}),
        }, matchedRoute, {
            redirectedFrom: undefined,
            href,
        });
    }
    function locationAsObject(to) {
        return typeof to === 'string'
            ? parseURL(parseQuery$1, to, currentRoute.value.path)
            : assign({}, to);
    }
    function checkCanceledNavigation(to, from) {
        if (pendingLocation !== to) {
            return createRouterError(8 /* ErrorTypes.NAVIGATION_CANCELLED */, {
                from,
                to,
            });
        }
    }
    function push(to) {
        return pushWithRedirect(to);
    }
    function replace(to) {
        return push(assign(locationAsObject(to), { replace: true }));
    }
    function handleRedirectRecord(to) {
        const lastMatched = to.matched[to.matched.length - 1];
        if (lastMatched && lastMatched.redirect) {
            const { redirect } = lastMatched;
            let newTargetLocation = typeof redirect === 'function' ? redirect(to) : redirect;
            if (typeof newTargetLocation === 'string') {
                newTargetLocation =
                    newTargetLocation.includes('?') || newTargetLocation.includes('#')
                        ? (newTargetLocation = locationAsObject(newTargetLocation))
                        : // force empty params
                            { path: newTargetLocation };
                // @ts-expect-error: force empty params when a string is passed to let
                // the router parse them again
                newTargetLocation.params = {};
            }
            if (!('path' in newTargetLocation) &&
                !('name' in newTargetLocation)) {
                warn(\`Invalid redirect found:\\n\${JSON.stringify(newTargetLocation, null, 2)}\\n when navigating to "\${to.fullPath}". A redirect must contain a name or path. This will break in production.\`);
                throw new Error('Invalid redirect');
            }
            return assign({
                query: to.query,
                hash: to.hash,
                // avoid transferring params if the redirect has a path
                params: 'path' in newTargetLocation ? {} : to.params,
            }, newTargetLocation);
        }
    }
    function pushWithRedirect(to, redirectedFrom) {
        const targetLocation = (pendingLocation = resolve(to));
        const from = currentRoute.value;
        const data = to.state;
        const force = to.force;
        // to could be a string where \`replace\` is a function
        const replace = to.replace === true;
        const shouldRedirect = handleRedirectRecord(targetLocation);
        if (shouldRedirect)
            return pushWithRedirect(assign(locationAsObject(shouldRedirect), {
                state: typeof shouldRedirect === 'object'
                    ? assign({}, data, shouldRedirect.state)
                    : data,
                force,
                replace,
            }), 
            // keep original redirectedFrom if it exists
            redirectedFrom || targetLocation);
        // if it was a redirect we already called \`pushWithRedirect\` above
        const toLocation = targetLocation;
        toLocation.redirectedFrom = redirectedFrom;
        let failure;
        if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
            failure = createRouterError(16 /* ErrorTypes.NAVIGATION_DUPLICATED */, { to: toLocation, from });
            // trigger scroll to allow scrolling to the same anchor
            handleScroll(from, from, 
            // this is a push, the only way for it to be triggered from a
            // history.listen is with a redirect, which makes it become a push
            true, 
            // This cannot be the first navigation because the initial location
            // cannot be manually navigated to
            false);
        }
        return (failure ? Promise.resolve(failure) : navigate(toLocation, from))
            .catch((error) => isNavigationFailure(error)
            ? // navigation redirects still mark the router as ready
                isNavigationFailure(error, 2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */)
                    ? error
                    : markAsReady(error) // also returns the error
            : // reject any unknown error
                triggerError(error, toLocation, from))
            .then((failure) => {
            if (failure) {
                if (isNavigationFailure(failure, 2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */)) {
                    if (// we are redirecting to the same location we were already at
                        isSameRouteLocation(stringifyQuery$1, resolve(failure.to), toLocation) &&
                        // and we have done it a couple of times
                        redirectedFrom &&
                        // @ts-expect-error: added only in dev
                        (redirectedFrom._count = redirectedFrom._count
                            ? // @ts-expect-error
                                redirectedFrom._count + 1
                            : 1) > 10) {
                        warn(\`Detected an infinite redirection in a navigation guard when going from "\${from.fullPath}" to "\${toLocation.fullPath}". Aborting to avoid a Stack Overflow. This will break in production if not fixed.\`);
                        return Promise.reject(new Error('Infinite redirect in navigation guard'));
                    }
                    return pushWithRedirect(
                    // keep options
                    assign({
                        // preserve an existing replacement but allow the redirect to override it
                        replace,
                    }, locationAsObject(failure.to), {
                        state: typeof failure.to === 'object'
                            ? assign({}, data, failure.to.state)
                            : data,
                        force,
                    }), 
                    // preserve the original redirectedFrom if any
                    redirectedFrom || toLocation);
                }
            }
            else {
                // if we fail we don't finalize the navigation
                failure = finalizeNavigation(toLocation, from, true, replace, data);
            }
            triggerAfterEach(toLocation, from, failure);
            return failure;
        });
    }
    /**
     * Helper to reject and skip all navigation guards if a new navigation happened
     * @param to
     * @param from
     */
    function checkCanceledNavigationAndReject(to, from) {
        const error = checkCanceledNavigation(to, from);
        return error ? Promise.reject(error) : Promise.resolve();
    }
    // TODO: refactor the whole before guards by internally using router.beforeEach
    function navigate(to, from) {
        let guards;
        const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
        // all components here have been resolved once because we are leaving
        guards = extractComponentsGuards(leavingRecords.reverse(), 'beforeRouteLeave', to, from);
        // leavingRecords is already reversed
        for (const record of leavingRecords) {
            record.leaveGuards.forEach(guard => {
                guards.push(guardToPromiseFn(guard, to, from));
            });
        }
        const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
        guards.push(canceledNavigationCheck);
        // run the queue of per route beforeRouteLeave guards
        return (runGuardQueue(guards)
            .then(() => {
            // check global guards beforeEach
            guards = [];
            for (const guard of beforeGuards.list()) {
                guards.push(guardToPromiseFn(guard, to, from));
            }
            guards.push(canceledNavigationCheck);
            return runGuardQueue(guards);
        })
            .then(() => {
            // check in components beforeRouteUpdate
            guards = extractComponentsGuards(updatingRecords, 'beforeRouteUpdate', to, from);
            for (const record of updatingRecords) {
                record.updateGuards.forEach(guard => {
                    guards.push(guardToPromiseFn(guard, to, from));
                });
            }
            guards.push(canceledNavigationCheck);
            // run the queue of per route beforeEnter guards
            return runGuardQueue(guards);
        })
            .then(() => {
            // check the route beforeEnter
            guards = [];
            for (const record of to.matched) {
                // do not trigger beforeEnter on reused views
                if (record.beforeEnter && !from.matched.includes(record)) {
                    if (isArray(record.beforeEnter)) {
                        for (const beforeEnter of record.beforeEnter)
                            guards.push(guardToPromiseFn(beforeEnter, to, from));
                    }
                    else {
                        guards.push(guardToPromiseFn(record.beforeEnter, to, from));
                    }
                }
            }
            guards.push(canceledNavigationCheck);
            // run the queue of per route beforeEnter guards
            return runGuardQueue(guards);
        })
            .then(() => {
            // NOTE: at this point to.matched is normalized and does not contain any () => Promise<Component>
            // clear existing enterCallbacks, these are added by extractComponentsGuards
            to.matched.forEach(record => (record.enterCallbacks = {}));
            // check in-component beforeRouteEnter
            guards = extractComponentsGuards(enteringRecords, 'beforeRouteEnter', to, from);
            guards.push(canceledNavigationCheck);
            // run the queue of per route beforeEnter guards
            return runGuardQueue(guards);
        })
            .then(() => {
            // check global guards beforeResolve
            guards = [];
            for (const guard of beforeResolveGuards.list()) {
                guards.push(guardToPromiseFn(guard, to, from));
            }
            guards.push(canceledNavigationCheck);
            return runGuardQueue(guards);
        })
            // catch any navigation canceled
            .catch(err => isNavigationFailure(err, 8 /* ErrorTypes.NAVIGATION_CANCELLED */)
            ? err
            : Promise.reject(err)));
    }
    function triggerAfterEach(to, from, failure) {
        // navigation is confirmed, call afterGuards
        // TODO: wrap with error handlers
        for (const guard of afterGuards.list())
            guard(to, from, failure);
    }
    /**
     * - Cleans up any navigation guards
     * - Changes the url if necessary
     * - Calls the scrollBehavior
     */
    function finalizeNavigation(toLocation, from, isPush, replace, data) {
        // a more recent navigation took place
        const error = checkCanceledNavigation(toLocation, from);
        if (error)
            return error;
        // only consider as push if it's not the first navigation
        const isFirstNavigation = from === START_LOCATION_NORMALIZED;
        const state = !isBrowser ? {} : history.state;
        // change URL only if the user did a push/replace and if it's not the initial navigation because
        // it's just reflecting the url
        if (isPush) {
            // on the initial navigation, we want to reuse the scroll position from
            // history state if it exists
            if (replace || isFirstNavigation)
                routerHistory.replace(toLocation.fullPath, assign({
                    scroll: isFirstNavigation && state && state.scroll,
                }, data));
            else
                routerHistory.push(toLocation.fullPath, data);
        }
        // accept current navigation
        currentRoute.value = toLocation;
        handleScroll(toLocation, from, isPush, isFirstNavigation);
        markAsReady();
    }
    let removeHistoryListener;
    // attach listener to history to trigger navigations
    function setupListeners() {
        // avoid setting up listeners twice due to an invalid first navigation
        if (removeHistoryListener)
            return;
        removeHistoryListener = routerHistory.listen((to, _from, info) => {
            if (!router.listening)
                return;
            // cannot be a redirect route because it was in history
            const toLocation = resolve(to);
            // due to dynamic routing, and to hash history with manual navigation
            // (manually changing the url or calling history.hash = '#/somewhere'),
            // there could be a redirect record in history
            const shouldRedirect = handleRedirectRecord(toLocation);
            if (shouldRedirect) {
                pushWithRedirect(assign(shouldRedirect, { replace: true }), toLocation).catch(noop);
                return;
            }
            pendingLocation = toLocation;
            const from = currentRoute.value;
            // TODO: should be moved to web history?
            if (isBrowser) {
                saveScrollPosition(getScrollKey(from.fullPath, info.delta), computeScrollPosition());
            }
            navigate(toLocation, from)
                .catch((error) => {
                if (isNavigationFailure(error, 4 /* ErrorTypes.NAVIGATION_ABORTED */ | 8 /* ErrorTypes.NAVIGATION_CANCELLED */)) {
                    return error;
                }
                if (isNavigationFailure(error, 2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */)) {
                    // Here we could call if (info.delta) routerHistory.go(-info.delta,
                    // false) but this is bug prone as we have no way to wait the
                    // navigation to be finished before calling pushWithRedirect. Using
                    // a setTimeout of 16ms seems to work but there is no guarantee for
                    // it to work on every browser. So instead we do not restore the
                    // history entry and trigger a new navigation as requested by the
                    // navigation guard.
                    // the error is already handled by router.push we just want to avoid
                    // logging the error
                    pushWithRedirect(error.to, toLocation
                    // avoid an uncaught rejection, let push call triggerError
                    )
                        .then(failure => {
                        // manual change in hash history #916 ending up in the URL not
                        // changing, but it was changed by the manual url change, so we
                        // need to manually change it ourselves
                        if (isNavigationFailure(failure, 4 /* ErrorTypes.NAVIGATION_ABORTED */ |
                            16 /* ErrorTypes.NAVIGATION_DUPLICATED */) &&
                            !info.delta &&
                            info.type === NavigationType.pop) {
                            routerHistory.go(-1, false);
                        }
                    })
                        .catch(noop);
                    // avoid the then branch
                    return Promise.reject();
                }
                // do not restore history on unknown direction
                if (info.delta) {
                    routerHistory.go(-info.delta, false);
                }
                // unrecognized error, transfer to the global handler
                return triggerError(error, toLocation, from);
            })
                .then((failure) => {
                failure =
                    failure ||
                        finalizeNavigation(
                        // after navigation, all matched components are resolved
                        toLocation, from, false);
                // revert the navigation
                if (failure) {
                    if (info.delta &&
                        // a new navigation has been triggered, so we do not want to revert, that will change the current history
                        // entry while a different route is displayed
                        !isNavigationFailure(failure, 8 /* ErrorTypes.NAVIGATION_CANCELLED */)) {
                        routerHistory.go(-info.delta, false);
                    }
                    else if (info.type === NavigationType.pop &&
                        isNavigationFailure(failure, 4 /* ErrorTypes.NAVIGATION_ABORTED */ | 16 /* ErrorTypes.NAVIGATION_DUPLICATED */)) {
                        // manual change in hash history #916
                        // it's like a push but lacks the information of the direction
                        routerHistory.go(-1, false);
                    }
                }
                triggerAfterEach(toLocation, from, failure);
            })
                .catch(noop);
        });
    }
    // Initialization and Errors
    let readyHandlers = useCallbacks();
    let errorHandlers = useCallbacks();
    let ready;
    /**
     * Trigger errorHandlers added via onError and throws the error as well
     *
     * @param error - error to throw
     * @param to - location we were navigating to when the error happened
     * @param from - location we were navigating from when the error happened
     * @returns the error as a rejected promise
     */
    function triggerError(error, to, from) {
        markAsReady(error);
        const list = errorHandlers.list();
        if (list.length) {
            list.forEach(handler => handler(error, to, from));
        }
        else {
            {
                warn('uncaught error during route navigation:');
            }
            console.error(error);
        }
        return Promise.reject(error);
    }
    function isReady() {
        if (ready && currentRoute.value !== START_LOCATION_NORMALIZED)
            return Promise.resolve();
        return new Promise((resolve, reject) => {
            readyHandlers.add([resolve, reject]);
        });
    }
    function markAsReady(err) {
        if (!ready) {
            // still not ready if an error happened
            ready = !err;
            setupListeners();
            readyHandlers
                .list()
                .forEach(([resolve, reject]) => (err ? reject(err) : resolve()));
            readyHandlers.reset();
        }
        return err;
    }
    // Scroll behavior
    function handleScroll(to, from, isPush, isFirstNavigation) {
        const { scrollBehavior } = options;
        if (!isBrowser || !scrollBehavior)
            return Promise.resolve();
        const scrollPosition = (!isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0))) ||
            ((isFirstNavigation || !isPush) &&
                history.state &&
                history.state.scroll) ||
            null;
        return nextTick()
            .then(() => scrollBehavior(to, from, scrollPosition))
            .then(position => position && scrollToPosition(position))
            .catch(err => triggerError(err, to, from));
    }
    const go = (delta) => routerHistory.go(delta);
    let started;
    const installedApps = new Set();
    const router = {
        currentRoute,
        listening: true,
        addRoute,
        removeRoute,
        hasRoute,
        getRoutes,
        resolve,
        options,
        push,
        replace,
        go,
        back: () => go(-1),
        forward: () => go(1),
        beforeEach: beforeGuards.add,
        beforeResolve: beforeResolveGuards.add,
        afterEach: afterGuards.add,
        onError: errorHandlers.add,
        isReady,
        install(app) {
            const router = this;
            app.component('RouterLink', RouterLink);
            app.component('RouterView', RouterView);
            app.config.globalProperties.$router = router;
            Object.defineProperty(app.config.globalProperties, '$route', {
                enumerable: true,
                get: () => unref(currentRoute),
            });
            // this initial navigation is only necessary on client, on server it doesn't
            // make sense because it will create an extra unnecessary navigation and could
            // lead to problems
            if (isBrowser &&
                // used for the initial navigation client side to avoid pushing
                // multiple times when the router is used in multiple apps
                !started &&
                currentRoute.value === START_LOCATION_NORMALIZED) {
                // see above
                started = true;
                push(routerHistory.location).catch(err => {
                    warn('Unexpected error when starting the router:', err);
                });
            }
            const reactiveRoute = {};
            for (const key in START_LOCATION_NORMALIZED) {
                // @ts-expect-error: the key matches
                reactiveRoute[key] = computed(() => currentRoute.value[key]);
            }
            app.provide(routerKey, router);
            app.provide(routeLocationKey, reactive(reactiveRoute));
            app.provide(routerViewLocationKey, currentRoute);
            const unmountApp = app.unmount;
            installedApps.add(app);
            app.unmount = function () {
                installedApps.delete(app);
                // the router is not attached to an app anymore
                if (installedApps.size < 1) {
                    // invalidate the current navigation
                    pendingLocation = START_LOCATION_NORMALIZED;
                    removeHistoryListener && removeHistoryListener();
                    removeHistoryListener = null;
                    currentRoute.value = START_LOCATION_NORMALIZED;
                    started = false;
                    ready = false;
                }
                unmountApp();
            };
        },
    };
    return router;
}
function runGuardQueue(guards) {
    return guards.reduce((promise, guard) => promise.then(() => guard()), Promise.resolve());
}
function extractChangingRecords(to, from) {
    const leavingRecords = [];
    const updatingRecords = [];
    const enteringRecords = [];
    const len = Math.max(from.matched.length, to.matched.length);
    for (let i = 0; i < len; i++) {
        const recordFrom = from.matched[i];
        if (recordFrom) {
            if (to.matched.find(record => isSameRouteRecord(record, recordFrom)))
                updatingRecords.push(recordFrom);
            else
                leavingRecords.push(recordFrom);
        }
        const recordTo = to.matched[i];
        if (recordTo) {
            // the type doesn't matter because we are comparing per reference
            if (!from.matched.find(record => isSameRouteRecord(record, recordTo))) {
                enteringRecords.push(recordTo);
            }
        }
    }
    return [leavingRecords, updatingRecords, enteringRecords];
}

/**
 * Returns the router instance. Equivalent to using \`$router\` inside
 * templates.
 */
function useRouter() {
    return inject(routerKey);
}
/**
 * Returns the current route location. Equivalent to using \`$route\` inside
 * templates.
 */
function useRoute() {
    return inject(routeLocationKey);
}

export { NavigationFailureType, RouterLink, RouterView, START_LOCATION_NORMALIZED as START_LOCATION, createMemoryHistory, createRouter, createRouterMatcher, createWebHashHistory, createWebHistory, isNavigationFailure, loadRouteLocation, matchedRouteKey, onBeforeRouteLeave, onBeforeRouteUpdate, parseQuery, routeLocationKey, routerKey, routerViewLocationKey, stringifyQuery, useLink, useRoute, useRouter, viewDepthKey };`;let f=null,h={},a=async(e,r=!1,o=[])=>{if(e.startsWith("@")&&!e.startsWith("@/"))return e;if(["vue","vue-router"].includes(e))return h[e];try{if(e.includes("://")||(e.startsWith("@/")&&(e=e.replace("@/","/src/")),!e.startsWith("/")&&!e.startsWith("./")))return e;if(h[e]&&!r)return h[e];let n=["jpg","jpeg","gif","png","apng","avif","svg","webp","ico"];for await(const l of n)if(e.toLowerCase().endsWith(l)){let u=await f.readFile(e),g="image/"+l.replace("jpg","jpeg").replace("svg","svg+xml");return h[e]=URL.createObjectURL(new Blob([u],{type:g})),h[e]}let t="";e.includes(".")||(t=".js");let s=await f.readFile(e+t,{encoding:"utf8"});return(e+t).toLowerCase().includes("router.js")&&(s=s.replaceAll("createWebHistory","createMemoryHistory"),s=s.replaceAll('"/"',"")),h[e+t]=await R(s,e+t,o),h[e+t]}catch{return e}},R=async(e,r="",o=[])=>{if(r&&o.includes(r))return URL.createObjectURL(new Blob(["export default {}"],{type:"text/javascript"}));if(e=e.replaceAll('}from"',' } from "'),e=e.replaceAll("import{","import { "),e=e.replaceAll("import*","import * "),e=e.replaceAll("export{","export { "),e=e.replaceAll("export*","export * "),e=e.replaceAll('from"','from "'),e=await i(e,/(?:import\(')(.*?)(?='\))/g,async(n,t)=>{let s=await a(t,!1,o);return n.replace(t,s)}),e=await i(e,/(?:import\(")(.*?)(?="\))/g,async(n,t)=>{let s=await a(t,!1,o);return n.replace(t,s)}),e=await i(e,/(?:import\(`)(.*?)(?=`\))/g,async(n,t)=>{let s=await a(t,!1,o);return n.replace(t,s)}),e=await i(e,/import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g,async n=>(n=await i(n,/'(.*?)'/,async t=>(t=await a(t.split("'")[1],!1,o),"'"+t+"'")),n=await i(n,/"(.*?)"/,async t=>(t=await a(t.split('"')[1],!1,o),'"'+t+'"')),n=await i(n,/`(.*?)`/,async t=>(t=await a(t.split("`")[1],!1,o),"`"+t+"`")),n+`
`)),e=await i(e,/(?:export\(')(.*?)(?='\))/g,async(n,t)=>{let s=await a(t,!1,o);return n.replace(t,s)}),e=await i(e,/(?:export\(")(.*?)(?="\))/g,async(n,t)=>{let s=await a(t,!1,o);return n.replace(t,s)}),e=await i(e,/(?:export\(`)(.*?)(?=`\))/g,async(n,t)=>{let s=await a(t,!1,o);return n.replace(t,s)}),e=await i(e,/export\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g,async n=>(n=await i(n,/'(.*?)'/,async t=>(t=await a(t.split("'")[1],!1,o),"'"+t+"'")),n=await i(n,/"(.*?)"/,async t=>(t=await a(t.split('"')[1],!1,o),'"'+t+'"')),n=await i(n,/`(.*?)`/,async t=>(t=await a(t.split("`")[1],!1,o),"`"+t+"`")),n+`
`)),r.toLowerCase().endsWith(".vue")){let n=y.parse(e),t=y.stringify(n,!1,!0,!0),s=t.style;s=s.replaceAll("<style>","").replaceAll("<style scoped>","").replaceAll("</style>",""),s=await i(s,/(?:url\()(.*?)(?=\))/g,async(d,c)=>{let p=await a(c,!1,o);return d.replace(c,p)}),s=await i(s,/(?:url\(')(.*?)(?='\))/g,async(d,c)=>{let p=await a(c,!1,o);return d.replace(c,p)}),s=await i(s,/(?:url\(")(.*?)(?="\))/g,async(d,c)=>{let p=await a(c,!1,o);return d.replace(c,p)}),s=s.replaceAll("@blob","blob");let l=URL.createObjectURL(new Blob([s],{type:"text/css"})),u=t.template.replaceAll(`
`,"").trim();u=await i(u,/(?:\=")(.*?)(?=")/g,async(d,c)=>{let p=await a(c,!1,o);return d.replace(c,p)}),u=await i(u,/(?:url\()(.*?)(?=\))/g,async(d,c)=>{let p=await a(c,!1,o);return d.replace(c,p)}),u=await i(u,/(?:url\(')(.*?)(?='\))/g,async(d,c)=>{let p=await a(c,!1,o);return d.replace(c,p)}),u=await i(u,/(?:url\(")(.*?)(?="\))/g,async(d,c)=>{let p=await a(c,!1,o);return d.replace(c,p)}),u=u.replaceAll("@blob","blob"),e=t.script.replace("export default{",`

            let link = document.createElement('link')
            link.setAttribute('rel', 'stylesheet')
            link.setAttribute('href', '${l}')
            let hgroup = document.querySelector('hgroup')
            let parent = hgroup.parentNode
            parent.insertBefore(link, hgroup)
            // import sheet from '${l}' assert { type: 'css' } // not supported by ff & safari
            // document.adoptedStyleSheets.push(sheet)
export default{
template: \``+u+"`,"),e=e.replaceAll("this.router","window.router"),["setup"].forEach(d=>e=e.replace("<script "+d+">","")),e=e.replace("<script>",""),e=e.replace("<\/script>","")}return URL.createObjectURL(new Blob([e],{type:"text/javascript"}))},i=async(e,r,o)=>{let n=[];e.replace(r,(s,...l)=>{const u=o(s,...l);n.push(u)});const t=await Promise.all(n);return e.replace(r,()=>t.shift())},N=()=>S(),S=()=>{h={},h.vue=URL.createObjectURL(new Blob([P],{type:"text/javascript"})),h["vue-router"]=URL.createObjectURL(new Blob([L.replace("from 'vue'",`from '${h.vue}'`)],{type:"text/javascript"}))};S();let O=async(e,r)=>{f=e,r()};const I=`let ORIGIN = origin || window.origin
let SELECTED = null
let scrollX = window.scrollX
let scrollY = window.scrollY
let PROPERTIES = [
  'tagName',
  'attributes',
  'offsetTop',
  'offsetLeft',
  'offsetHeight',
  'offsetWidth',
  'clientTop',
  'clientLeft',
  'clientHeight',
  'clientWidth',
  'scrollTop',
  'scrollLeft',
  'scrollHeight',
  'scrollWidth',
  'bounding',
  'computed',
  'sid',
  'width',
  'height',
  'top',
  'left'
]
let IGNORE = [
  'style',
  'ownerDocument',
  'parentElement',
  'parentNode',
  'cookie',
  'sessionStorage',
  'localStorage',
  'formAction',
  'baseURI',
  'previousSibling',
  'nextSibling',
  'firstChild',
  'firstElementChild',
  'lastChild',
  'lastElementChild'
]
let EVENTS = [
  'mousedown',
  'mouseup',
  'mousemove',
  'mouseenter',
  'mouseleave',
  'touchstart',
  'touchmove',
  'touchend',
  'click'
]
let PATH = '/'

const getRender = () => {
  let el = document.getElementById('receiver')
  let styling = el.getAttribute('styling')
  let hgroup = document.querySelector('hgroup')
  hgroup.innerHTML = styling
  return el.getAttribute('html')
}
setTimeout(() => {
  vueux.value = getRender()
  if (vueux.router) vueux.router.push(PATH)
})

let element = document.getElementById('receiver')
let observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.type === 'attributes') {
      vueux.value = getRender()
      window.scrollX = scrollX
      window.scrollY = scrollY
      setTimeout(() => fixPosition())
      if (mutation.attributeName === 'path') {
        window.focus()
      }
    }
  })
})
observer.observe(element, { attributes: true })

if (!window.studio) window.studio = {}

window.parent.postMessage({event: 'init'}, origin)

window.addEventListener('message', e => {
  if (e.data.event === 'refresh' || e.data.event === 'template') {
    let element = document.querySelectorAll('[' + e.data.id + '=""]')
    if (!element.length && e.data.id) element = [document.body]
    if (element.length) {
      element[0].bounding = element[0].getBoundingClientRect()
      element[0].computed = computedStyle(element[0])
      SELECTED = cloneTarget(element[0], PROPERTIES)
      if (!SELECTED.sid || SELECTED.sid === 'sid-root') return selectRoot()
      window.parent.postMessage({
        event: e.data.event === 'template' ? 'refresh' : e.data.event,
        target: SELECTED
      }, origin)
    }
  } else if (e.data.event === 'positions') {
    let elements = document.querySelectorAll('body, body *')
    let targets = []
    elements.forEach(el => {
      if (el.tagName.toLowerCase() === 'body') {
        el.setAttribute('sid-root', '')
      }
      if (!['receiver'].includes(el.id) && [...el.attributes || []].some(a => a.name.includes('sid-'))) {
        el.bounding = el.getBoundingClientRect()
        el.computed = computedStyle(el)
        let clone = cloneTarget(el, PROPERTIES)
        if (clone.sid === 'sid-root') {
          clone.top = 0
          clone.left = 0
          clone.right = 0
          clone.bottom = 0
          clone.width = window.innerWidth
          clone.height = window.innerHeight
        } else {
          clone.top = clone.bounding?.top || clone?.offsetTop || 0
          clone.left = clone.bounding?.left || clone?.offsetLeft || 0
          clone.right = clone.bounding?.right || 0
          clone.bottom = clone.bounding?.bottom || 0
          clone.width = clone?.bounding?.width || (
            clone?.offsetWidth > clone?.clientWidth
              ? clone?.offsetWidth || 0
              : clone?.clientWidth || 0
          )
          clone.height = clone?.bounding?.height || (
            clone?.offsetHeight > clone?.clientHeight
              ? clone?.offsetHeight || 0
              : clone?.clientHeight || 0
          )
        }
        targets.push(clone)
      }
    })
    window.parent.postMessage({ event: 'positions', targets }, origin)
  } else if (e.data.event === 'positions-excluded') {
    if (SELECTED.tagName.toLowerCase() === 'body') {
      return window.parent.postMessage({ event: 'positions', targets: [] }, origin)
    }
    let elements = document.querySelectorAll('body, body *:not([' + SELECTED.sid  + '=""], [' + SELECTED.sid  + '=""] *)')
    let targets = []
    elements.forEach(el => {
      if (el.tagName.toLowerCase() === 'body') {
        el.setAttribute('sid-root', '')
      }
      if (!['receiver'].includes(el.id) && [...el.attributes || []].some(a => a.name.includes('sid-'))) {
        el.bounding = el.getBoundingClientRect()
        el.computed = computedStyle(el)
        let clone = cloneTarget(el, PROPERTIES)
        if (clone.sid === 'sid-root') {
          clone.top = 0
          clone.left = 0
          clone.right = 0
          clone.bottom = 0
          clone.width = window.innerWidth
          clone.height = window.innerHeight
        } else {
          clone.top = clone.bounding?.top || clone?.offsetTop || 0
          clone.left = clone.bounding?.left || clone?.offsetLeft || 0
          clone.right = clone.bounding?.right || 0
          clone.bottom = clone.bounding?.bottom || 0
          clone.width = clone?.bounding?.width || (
            clone?.offsetWidth > clone?.clientWidth
              ? clone?.offsetWidth || 0
              : clone?.clientWidth || 0
          )
          clone.height = clone?.bounding?.height || (
            clone?.offsetHeight > clone?.clientHeight
              ? clone?.offsetHeight || 0
              : clone?.clientHeight || 0
          )
        }
        targets.push(clone)
      }
    })
    window.parent.postMessage({ event: 'positions', targets }, origin)
  } else if (e.data.event === 'positions-clear') {
    window.parent.postMessage({ event: 'positions', targets: [] }, origin)
  } else if (e.data.event === 'go') {
    PATH = e.data.path
    if (vueux.router) vueux.router.push(PATH)
  }
})

window.addEventListener('resize', () => {
  scrollX = window.scrollX
  scrollY = window.scrollY
  fixPosition()
})
window.addEventListener('scroll', () => {
  scrollX = window.scrollX
  scrollY = window.scrollY
  fixPosition()
})

EVENTS.forEach(event => {
  if (window.studio[event]) document.body.removeEventListener(event, window.studio[event])
  window.studio[event] = document.body.addEventListener(event, e => {
    let target = e.path?.find(el => [...el.attributes || []].find(t => t.name.includes('sid-')))
    if (!target) {
      let parent = e.target
      while (!target && parent) {
        if ([...parent.attributes || []].find(t => t.name.includes('sid-'))) {
          target = parent
        } else {
          parent = parent?.parentElement || parent?.parentNode || null
        }
      }
      if (!target) target = e.target
    }
    target.bounding = target.getBoundingClientRect()
    target.computed = computedStyle(target)
    target = cloneTarget(target, PROPERTIES)
    if (!target.sid || target.sid === 'sid-root') return
    if (event === 'click') SELECTED = target
    window.parent.postMessage({event, target}, origin)
  })
})

if (window.studioIframe) window.removeEventListener('blur', window.studioIframe)
window.studioIframe = window.addEventListener('blur', () => {
  if (document.activeElement.tagName.toUpperCase() === 'IFRAME') {
    let target = document.activeElement
    target.bounding = target.getBoundingClientRect()
    target.computed = computedStyle(target)
    target = cloneTarget(target, PROPERTIES)
    SELECTED = target
    window.parent.postMessage({event: 'click', target}, origin)
  }
})

let cloneTarget = (e, properties = [], deep = 0) => {
  let clone = {}
  if (deep <= 2) {
    for (let k in e) {
      let rule = null
      try { rule = e[k] } catch(e) {}
      if (
        (isNaN(k) && k.toUpperCase() === k) ||
        IGNORE.includes(k) ||
        (deep === 0 && properties.length && !properties.includes(k)) ||
        typeof rule === 'function' ||
        typeof rule === 'object' && !rule
      ) {
        continue
      } else if (Array.isArray(rule)) {
        let path = []
        rule.forEach(p => path.push(cloneTarget(p, properties, deep + 1)))
        clone[k] = path
      } else if (typeof rule === 'object' && rule !== null) {
        clone[k] = cloneTarget(rule, properties, deep + 1)
      } else {
        clone[k] = rule
      }
    }
  }
  if (deep === 0 && e.attributes) {
    clone.sid = [...e.attributes].find(t => t?.name?.includes('sid'))?.name || undefined
  } else if (deep === 0) {
    clone.sid = undefined
  }
  return clone
}

let computedStyle = (target) => {
  let style = getComputedStyle(target)
  return {
    left: style.left,
    right: style.right,
    top: style.top,
    bottom: style.bottom,
    width: style.width,
    height: style.height    
  }
}

let fixPosition = () => {
  if (SELECTED && SELECTED.sid !== 'sid-root') {
    let element = document.querySelectorAll('[' + SELECTED.sid + '=""]')
    if (!element.length) element = [document.body]
    SELECTED.bounding = element[0].getBoundingClientRect()
    SELECTED.computed = computedStyle(element[0])
    window.parent.postMessage({
      event: 'refresh',
      target: SELECTED
    }, origin)
  } else if (SELECTED) {
    selectRoot()
  }
}

window.addEventListener('click', e => {
  if (
    e.target.tagName.toLowerCase() === 'a' &&
    [...e.target.attributes || []].some(a => a.name.includes('href'))
  ) {
    e.preventDefault()
  } else if (
    e.target.tagName.toLowerCase() === 'html' ||
    e.target.tagName.toLowerCase() === 'body' || (
      e.target.tagName.toLowerCase() === 'div' &&
      e.target.id === 'app'
    )
  ) {
    selectRoot()
  }
}, true)

let selectRoot = () => {
  let target = document.querySelector('body')
  target = cloneTarget(target, PROPERTIES)
  target.sid = 'sid-root'
  target.bounding = {
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: window.innerWidth,
    height: window.innerHeight
  }
  target.computed = target.bounding
  target.offsetWidth = target.bounding.width
  target.offsetHeight = target.bounding.height
  SELECTED = target
  window.parent.postMessage({event: 'click', target}, origin)
}`;const m={inject:["fs","compiler","account"],emits:["init","rendered"],props:["ast","navmenu","sidemenu","mobile","events","full","path","renderKey","timeline"],created(){O(this.fs,()=>this.$emit("init")&&this.renderIframe())},data:()=>({vendor:{},rendering:!1,css:"",template:""}),watch:{"code.script"(){this.code.script?this.renderIframe():this.clear()},"code.style"(e){this.setStyle(e)},"code.template"(e){this.setTemplate(e)},events(){this.setTemplate(this.code.template)},renderKey(){this.renderIframe()}},computed:{code(){return this.compiler.stringify(this.ast,!1,!0,!0)},getHeight(){return this.timeline?this.full?"100px":"192px":this.full?"0px":"92px"},getTop(){return this.full?"0px":"50px"},getTopMobile(){const e=this.full?"0px":"50px";return this.activeMenu?"50px":e},getHeightMobile(){return this.timeline?this.activeMenu?"70% - 100px":this.getHeight:this.activeMenu?"70% - 100px":this.getHeight},activeMenu(){return this.navmenu!=="0px"||this.sidemenu!=="0px"}},methods:{async master(){let e=`
        let renderTemplate = reactive({ value: '' })
        let error = reactive({ value: '' })
        let propertiesToArray = (obj) => {
          const isObject = val => val && typeof val === 'object' && !Array.isArray(val)
          const addDelimiter = (a, b) => a ? (a + '.' + b) : b
          const paths = (obj = {}, head = '') => {
            return Object.entries(obj).reduce((product, [key, value]) => {
              let fullPath = addDelimiter(head, key)
              return isObject(value) ? product.concat(paths(value, fullPath)) : product.concat(fullPath)
            }, [])
          }
          return paths(obj)
        }
      `,r=`
        render(ctx, cache) {
          return h(compile(renderTemplate.value)(ctx, cache))
        }
      `,o=`
        ${e}
        let APP = { ${r} }
      `,n=this.code.script||"";n=n.replace("<script>",""),n.indexOf("export default{")>=0&&(n=n.replace("export default{",`
          ${e}
          let APP = { ${r},
        `),n=n.slice(0,n.lastIndexOf("}"))+"}");let t=this.mockup(),s=await a("/src/main.js",!0,[this.path]),l=await(await fetch(s)).text();return t&&(l=`import mockup from '${t}'
`+l),l=l.replace(/({[\s\S]*?createApp)/,"$1, reactive, compile, h, isVNode"),l=l.replace("import App","// import App"),l=l.replace("const app = createApp(App)",`
      ${n||o}
        const app = createApp(APP)
        
        app.config.errorHandler = (err, vm, info) => {
          renderTemplate.value = \`
          <div style="padding: 30px 20px 10px; font-weight: bold; font-size: 20px; color: #555">Ooopsy :(</div>
          <div style="padding: 20px; color: #555">\` + err.message + \`</div>
          \`
        }
        app.config.warnHandler = (msg, instance, trace) => {
          if (
            !msg.includes('Avoid app logic that relies on enumerating') &&
            !msg.includes('Property "$watchers" was accessed')
          ) console.warn(msg, instance, trace)
        }

        ${t?"mockup(app)":""}

        vueux.listener = val => renderTemplate.value = val

        vueux.app = app

        
        if (typeof router !== 'undefined') {

          vueux.router = router

        }

      `),l},async setStyle(e){e=await i(e,/(?:url\()(.*?)(?=\))/g,async(r,o)=>{let n=await a(o);return r.replace(o,n)}),e=await i(e,/(?:url\(')(.*?)(?='\))/g,async(r,o)=>{let n=await a(o);return r.replace(o,n)}),e=await i(e,/(?:url\(")(.*?)(?="\))/g,async(r,o)=>{let n=await a(o);return r.replace(o,n)}),this.css=e.replaceAll("@blob","blob")},async setTemplate(e){e=await i(e,/(?:\=")(.*?)(?=")/g,async(r,o)=>{let n=await a(o);return r.replace(o,n)}),e=e.replaceAll("@blob","blob"),this.events||(e=e.replaceAll("@click","@click-disabled")),this.template="",this.$nextTick(()=>this.template=e)},async addModule(e){let r=document.createElement("script");return r.type="text/javascript",e=e.trim(),["setup"].forEach(n=>e=e.replace("<script "+n+">","")),e=e.replace("<script>","").replace("<\/script>",""),r.setAttribute("type","module"),r.src=await R(e),r},addMap(e){let r=document.createElement("script");return r.setAttribute("type","importmap"),r.innerHTML=e.trim(),r},addScript(e){let r=document.createElement("script");return r.innerHTML=e.trim(),r},addStyle(e){let r=document.createElement("hgroup");return r.innerHTML=e,r},async renderIframe(){if(this.rendering)setTimeout(()=>this.rendering?"":this.renderIframe(),500);else{this.rendering=!0,N();let e=await this.master(),r=await this.addModule(e+`

          let origin = '${window.origin}'
          ${I}
        `),o=document.getElementById("iframe-container"),n=document.createElement("iframe");n.setAttribute("id","builder"),o.innerHTML="",o.appendChild(n),navigator.userAgent.toLowerCase().includes("firefox")?n.onload=async()=>await this.iframeInit(n,r):await this.iframeInit(n,r),setTimeout(()=>this.rendering=!1,500)}},clear(){let e=document.getElementById("iframe-container");e.innerHTML=""},async iframeInit(e,r){try{let o=JSON.parse(await this.fs.readFile("/package.json",{encoding:"utf8"})),n={imports:{}};for(const t of Object.keys(o.dependencies)){const s=o.dependencies[t];s.startsWith("http")||s.startsWith("git")?n.imports[t]=s:t==="vue"?n.imports[t]=await a("vue"):t==="vue-router"?n.imports[t]=await a("vue-router"):t==="template-compiler"?n.imports[t]=await a("template-compiler"):n.imports[t]="https://cdn.jsdelivr.net/npm/"+t+"@"+s+"/+esm"}e.contentDocument.head.appendChild(this.addMap(JSON.stringify(n))),e.contentDocument.body.innerHTML=`
          <div id="app"></div>
        `,e.contentDocument.body.appendChild(this.$refs.receiver),e.contentDocument.head.appendChild(this.addScript(`
          const vueux = {
            init: true,
            listener() {},
            get value() {
              return this.$value
            },
            set value(val) {
              this.$value = val
              if (this.init) {
                this.init = false
                setTimeout(() => this.listener(this.$value), 100)
              } else {
                this.listener(this.$value)
              }
            },
            $value: '',
            get app() {
              return this.$app
            },
            set app(val) {
              this.$app = val
            },
            $app: null,
            get router() {
              return this.$router
            },
            set router(val) {
              this.$router = val
            },
            $router: null
          }
        `)),e.contentDocument.head.appendChild(r),e.contentDocument.head.appendChild(this.addStyle("")),this.$emit("rendered")}catch(o){e.contentDocument.body.innerHTML=o.message}},mockup(){var o;let e=(o=this.account.project.data)==null?void 0:o.provide,r="";try{r=new TextDecoder().decode(e)}catch(n){console.log(n)}return r?URL.createObjectURL(new Blob([r],{type:"text/javascript"})):!1}}},v=()=>{T(e=>({"52397b0c":e.getTopMobile,"742f4bd4":e.getHeightMobile,91234292:e.navmenu,"7e50fdca":e.getTop,"7e050492":e.getHeight,"745e87be":e.sidemenu}))},b=m.setup;m.setup=b?(e,r)=>(v(),b(e,r)):v;const M=["html","styling","path"],F=w("div",{id:"iframe-container"},null,-1);function $(e,r,o,n,t,s){return k(),E("div",{class:C({mobile:o.mobile})},[x(w("div",{id:"receiver",ref:"receiver",html:e.template,styling:e.css,path:o.path},null,8,M),[[A,!1]]),F],2)}const H=_(m,[["render",$]]);export{H as S,a as l};
