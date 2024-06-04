import{c as v}from"./compiler-C4M42AxZ.js";import{Z as _,$ as x,_ as A,o as E,c as T,w as O,a as k,n as R,u as P,v as I}from"./index-CGGIW2w_.js";const L='/**\n* vue v3.4.19\n* (c) 2018-present Yuxi (Evan) You and Vue contributors\n* @license MIT\n**/\nfunction e(e,t){const n=new Set(e.split(","));return t?e=>n.has(e.toLowerCase()):e=>n.has(e)}const t={},n=[],s=()=>{},o=()=>!1,r=e=>111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),i=e=>e.startsWith("onUpdate:"),l=Object.assign,c=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},a=Object.prototype.hasOwnProperty,u=(e,t)=>a.call(e,t),d=Array.isArray,p=e=>"[object Map]"===S(e),h=e=>"[object Set]"===S(e),f=e=>"[object Date]"===S(e),m=e=>"function"==typeof e,g=e=>"string"==typeof e,y=e=>"symbol"==typeof e,v=e=>null!==e&&"object"==typeof e,b=e=>(v(e)||m(e))&&m(e.then)&&m(e.catch),_=Object.prototype.toString,S=e=>_.call(e),x=e=>S(e).slice(8,-1),C=e=>"[object Object]"===S(e),k=e=>g(e)&&"NaN"!==e&&"-"!==e[0]&&""+parseInt(e,10)===e,T=e(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),w=e("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"),E=e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))},N=/-(\\w)/g,A=E((e=>e.replace(N,((e,t)=>t?t.toUpperCase():"")))),I=/\\B([A-Z])/g,R=E((e=>e.replace(I,"-$1").toLowerCase())),O=E((e=>e.charAt(0).toUpperCase()+e.slice(1))),L=E((e=>e?`on${O(e)}`:"")),F=(e,t)=>!Object.is(e,t),M=(e,t)=>{for(let n=0;n<e.length;n++)e[n](t)},P=(e,t,n)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,value:n})},$=e=>{const t=parseFloat(e);return isNaN(t)?e:t},B=e=>{const t=g(e)?Number(e):NaN;return isNaN(t)?e:t};let V;const D=()=>V||(V="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}),U=e("Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error");function j(e){if(d(e)){const t={};for(let n=0;n<e.length;n++){const s=e[n],o=g(s)?K(s):j(s);if(o)for(const e in o)t[e]=o[e]}return t}if(g(e)||v(e))return e}const H=/;(?![^(]*\\))/g,q=/:([^]+)/,W=/\\/\\*[^]*?\\*\\//g;function K(e){const t={};return e.replace(W,"").split(H).forEach((e=>{if(e){const n=e.split(q);n.length>1&&(t[n[0].trim()]=n[1].trim())}})),t}function z(e){let t="";if(g(e))t=e;else if(d(e))for(let n=0;n<e.length;n++){const s=z(e[n]);s&&(t+=s+" ")}else if(v(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}function G(e){if(!e)return null;let{class:t,style:n}=e;return t&&!g(t)&&(e.class=z(t)),n&&(e.style=j(n)),e}const J=e("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot"),X=e("svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view"),Q=e("annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics"),Z=e("area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr"),Y=e("itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly");function ee(e){return!!e||""===e}function te(e,t){if(e===t)return!0;let n=f(e),s=f(t);if(n||s)return!(!n||!s)&&e.getTime()===t.getTime();if(n=y(e),s=y(t),n||s)return e===t;if(n=d(e),s=d(t),n||s)return!(!n||!s)&&function(e,t){if(e.length!==t.length)return!1;let n=!0;for(let s=0;n&&s<e.length;s++)n=te(e[s],t[s]);return n}(e,t);if(n=v(e),s=v(t),n||s){if(!n||!s)return!1;if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e){const s=e.hasOwnProperty(n),o=t.hasOwnProperty(n);if(s&&!o||!s&&o||!te(e[n],t[n]))return!1}}return String(e)===String(t)}function ne(e,t){return e.findIndex((e=>te(e,t)))}const se=e=>g(e)?e:null==e?"":d(e)||v(e)&&(e.toString===_||!m(e.toString))?JSON.stringify(e,oe,2):String(e),oe=(e,t)=>t&&t.__v_isRef?oe(e,t.value):p(t)?{[`Map(${t.size})`]:[...t.entries()].reduce(((e,[t,n],s)=>(e[re(t,s)+" =>"]=n,e)),{})}:h(t)?{[`Set(${t.size})`]:[...t.values()].map((e=>re(e)))}:y(t)?re(t):!v(t)||d(t)||C(t)?t:String(t),re=(e,t="")=>{var n;return y(e)?`Symbol(${null!=(n=e.description)?n:t})`:e};let ie,le;class ce{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this.parent=ie,!e&&ie&&(this.index=(ie.scopes||(ie.scopes=[])).push(this)-1)}get active(){return this._active}run(e){if(this._active){const t=ie;try{return ie=this,e()}finally{ie=t}}}on(){ie=this}off(){ie=this.parent}stop(e){if(this._active){let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].stop(!0);if(!this.detached&&this.parent&&!e){const e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index)}this.parent=void 0,this._active=!1}}}function ae(e){return new ce(e)}function ue(e,t=ie){t&&t.active&&t.effects.push(e)}function de(){return ie}function pe(e){ie&&ie.cleanups.push(e)}class he{constructor(e,t,n,s){this.fn=e,this.trigger=t,this.scheduler=n,this.active=!0,this.deps=[],this._dirtyLevel=4,this._trackId=0,this._runnings=0,this._shouldSchedule=!1,this._depsLength=0,ue(this,s)}get dirty(){if(2===this._dirtyLevel||3===this._dirtyLevel){this._dirtyLevel=1,Ce();for(let e=0;e<this._depsLength;e++){const t=this.deps[e];if(t.computed&&(fe(t.computed),this._dirtyLevel>=4))break}1===this._dirtyLevel&&(this._dirtyLevel=0),ke()}return this._dirtyLevel>=4}set dirty(e){this._dirtyLevel=e?4:0}run(){if(this._dirtyLevel=0,!this.active)return this.fn();let e=_e,t=le;try{return _e=!0,le=this,this._runnings++,me(this),this.fn()}finally{ge(this),this._runnings--,le=t,_e=e}}stop(){var e;this.active&&(me(this),ge(this),null==(e=this.onStop)||e.call(this),this.active=!1)}}function fe(e){return e.value}function me(e){e._trackId++,e._depsLength=0}function ge(e){if(e.deps.length>e._depsLength){for(let t=e._depsLength;t<e.deps.length;t++)ye(e.deps[t],e);e.deps.length=e._depsLength}}function ye(e,t){const n=e.get(t);void 0!==n&&t._trackId!==n&&(e.delete(t),0===e.size&&e.cleanup())}function ve(e,t){e.effect instanceof he&&(e=e.effect.fn);const n=new he(e,s,(()=>{n.dirty&&n.run()}));t&&(l(n,t),t.scope&&ue(n,t.scope)),t&&t.lazy||n.run();const o=n.run.bind(n);return o.effect=n,o}function be(e){e.effect.stop()}let _e=!0,Se=0;const xe=[];function Ce(){xe.push(_e),_e=!1}function ke(){const e=xe.pop();_e=void 0===e||e}function Te(){Se++}function we(){for(Se--;!Se&&Ne.length;)Ne.shift()()}function Ee(e,t,n){if(t.get(e)!==e._trackId){t.set(e,e._trackId);const n=e.deps[e._depsLength];n!==t?(n&&ye(n,e),e.deps[e._depsLength++]=t):e._depsLength++}}const Ne=[];function Ae(e,t,n){Te();for(const s of e.keys()){let n;s._dirtyLevel<t&&(null!=n?n:n=e.get(s)===s._trackId)&&(s._shouldSchedule||(s._shouldSchedule=0===s._dirtyLevel),s._dirtyLevel=t),s._shouldSchedule&&(null!=n?n:n=e.get(s)===s._trackId)&&(s.trigger(),s._runnings&&!s.allowRecurse||2===s._dirtyLevel||(s._shouldSchedule=!1,s.scheduler&&Ne.push(s.scheduler)))}we()}const Ie=(e,t)=>{const n=new Map;return n.cleanup=e,n.computed=t,n},Re=new WeakMap,Oe=Symbol(""),Le=Symbol("");function Fe(e,t,n){if(_e&&le){let t=Re.get(e);t||Re.set(e,t=new Map);let s=t.get(n);s||t.set(n,s=Ie((()=>t.delete(n)))),Ee(le,s)}}function Me(e,t,n,s,o,r){const i=Re.get(e);if(!i)return;let l=[];if("clear"===t)l=[...i.values()];else if("length"===n&&d(e)){const e=Number(s);i.forEach(((t,n)=>{("length"===n||!y(n)&&n>=e)&&l.push(t)}))}else switch(void 0!==n&&l.push(i.get(n)),t){case"add":d(e)?k(n)&&l.push(i.get("length")):(l.push(i.get(Oe)),p(e)&&l.push(i.get(Le)));break;case"delete":d(e)||(l.push(i.get(Oe)),p(e)&&l.push(i.get(Le)));break;case"set":p(e)&&l.push(i.get(Oe))}Te();for(const c of l)c&&Ae(c,4);we()}const Pe=e("__proto__,__v_isRef,__isVue"),$e=new Set(Object.getOwnPropertyNames(Symbol).filter((e=>"arguments"!==e&&"caller"!==e)).map((e=>Symbol[e])).filter(y)),Be=Ve();function Ve(){const e={};return["includes","indexOf","lastIndexOf"].forEach((t=>{e[t]=function(...e){const n=At(this);for(let t=0,o=this.length;t<o;t++)Fe(n,0,t+"");const s=n[t](...e);return-1===s||!1===s?n[t](...e.map(At)):s}})),["push","pop","shift","unshift","splice"].forEach((t=>{e[t]=function(...e){Ce(),Te();const n=At(this)[t].apply(this,e);return we(),ke(),n}})),e}function De(e){const t=At(this);return Fe(t,0,e),t.hasOwnProperty(e)}class Ue{constructor(e=!1,t=!1){this._isReadonly=e,this._shallow=t}get(e,t,n){const s=this._isReadonly,o=this._shallow;if("__v_isReactive"===t)return!s;if("__v_isReadonly"===t)return s;if("__v_isShallow"===t)return o;if("__v_raw"===t)return n===(s?o?bt:vt:o?yt:gt).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;const r=d(e);if(!s){if(r&&u(Be,t))return Reflect.get(Be,t,n);if("hasOwnProperty"===t)return De}const i=Reflect.get(e,t,n);return(y(t)?$e.has(t):Pe(t))?i:(s||Fe(e,0,t),o?i:Pt(i)?r&&k(t)?i:i.value:v(i)?s?xt(i):_t(i):i)}}class je extends Ue{constructor(e=!1){super(!1,e)}set(e,t,n,s){let o=e[t];if(!this._shallow){const t=wt(o);if(Et(n)||wt(n)||(o=At(o),n=At(n)),!d(e)&&Pt(o)&&!Pt(n))return!t&&(o.value=n,!0)}const r=d(e)&&k(t)?Number(t)<e.length:u(e,t),i=Reflect.set(e,t,n,s);return e===At(s)&&(r?F(n,o)&&Me(e,"set",t,n):Me(e,"add",t,n)),i}deleteProperty(e,t){const n=u(e,t),s=Reflect.deleteProperty(e,t);return s&&n&&Me(e,"delete",t,void 0),s}has(e,t){const n=Reflect.has(e,t);return y(t)&&$e.has(t)||Fe(e,0,t),n}ownKeys(e){return Fe(e,0,d(e)?"length":Oe),Reflect.ownKeys(e)}}class He extends Ue{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const qe=new je,We=new He,Ke=new je(!0),ze=new He(!0),Ge=e=>e,Je=e=>Reflect.getPrototypeOf(e);function Xe(e,t,n=!1,s=!1){const o=At(e=e.__v_raw),r=At(t);n||(F(t,r)&&Fe(o,0,t),Fe(o,0,r));const{has:i}=Je(o),l=s?Ge:n?Ot:Rt;return i.call(o,t)?l(e.get(t)):i.call(o,r)?l(e.get(r)):void(e!==o&&e.get(t))}function Qe(e,t=!1){const n=this.__v_raw,s=At(n),o=At(e);return t||(F(e,o)&&Fe(s,0,e),Fe(s,0,o)),e===o?n.has(e):n.has(e)||n.has(o)}function Ze(e,t=!1){return e=e.__v_raw,!t&&Fe(At(e),0,Oe),Reflect.get(e,"size",e)}function Ye(e){e=At(e);const t=At(this);return Je(t).has.call(t,e)||(t.add(e),Me(t,"add",e,e)),this}function et(e,t){t=At(t);const n=At(this),{has:s,get:o}=Je(n);let r=s.call(n,e);r||(e=At(e),r=s.call(n,e));const i=o.call(n,e);return n.set(e,t),r?F(t,i)&&Me(n,"set",e,t):Me(n,"add",e,t),this}function tt(e){const t=At(this),{has:n,get:s}=Je(t);let o=n.call(t,e);o||(e=At(e),o=n.call(t,e)),s&&s.call(t,e);const r=t.delete(e);return o&&Me(t,"delete",e,void 0),r}function nt(){const e=At(this),t=0!==e.size,n=e.clear();return t&&Me(e,"clear",void 0,void 0),n}function st(e,t){return function(n,s){const o=this,r=o.__v_raw,i=At(r),l=t?Ge:e?Ot:Rt;return!e&&Fe(i,0,Oe),r.forEach(((e,t)=>n.call(s,l(e),l(t),o)))}}function ot(e,t,n){return function(...s){const o=this.__v_raw,r=At(o),i=p(r),l="entries"===e||e===Symbol.iterator&&i,c="keys"===e&&i,a=o[e](...s),u=n?Ge:t?Ot:Rt;return!t&&Fe(r,0,c?Le:Oe),{next(){const{value:e,done:t}=a.next();return t?{value:e,done:t}:{value:l?[u(e[0]),u(e[1])]:u(e),done:t}},[Symbol.iterator](){return this}}}}function rt(e){return function(...t){return"delete"!==e&&("clear"===e?void 0:this)}}function it(){const e={get(e){return Xe(this,e)},get size(){return Ze(this)},has:Qe,add:Ye,set:et,delete:tt,clear:nt,forEach:st(!1,!1)},t={get(e){return Xe(this,e,!1,!0)},get size(){return Ze(this)},has:Qe,add:Ye,set:et,delete:tt,clear:nt,forEach:st(!1,!0)},n={get(e){return Xe(this,e,!0)},get size(){return Ze(this,!0)},has(e){return Qe.call(this,e,!0)},add:rt("add"),set:rt("set"),delete:rt("delete"),clear:rt("clear"),forEach:st(!0,!1)},s={get(e){return Xe(this,e,!0,!0)},get size(){return Ze(this,!0)},has(e){return Qe.call(this,e,!0)},add:rt("add"),set:rt("set"),delete:rt("delete"),clear:rt("clear"),forEach:st(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach((o=>{e[o]=ot(o,!1,!1),n[o]=ot(o,!0,!1),t[o]=ot(o,!1,!0),s[o]=ot(o,!0,!0)})),[e,n,t,s]}const[lt,ct,at,ut]=it();function dt(e,t){const n=t?e?ut:at:e?ct:lt;return(t,s,o)=>"__v_isReactive"===s?!e:"__v_isReadonly"===s?e:"__v_raw"===s?t:Reflect.get(u(n,s)&&s in t?n:t,s,o)}const pt={get:dt(!1,!1)},ht={get:dt(!1,!0)},ft={get:dt(!0,!1)},mt={get:dt(!0,!0)},gt=new WeakMap,yt=new WeakMap,vt=new WeakMap,bt=new WeakMap;function _t(e){return wt(e)?e:kt(e,!1,qe,pt,gt)}function St(e){return kt(e,!1,Ke,ht,yt)}function xt(e){return kt(e,!0,We,ft,vt)}function Ct(e){return kt(e,!0,ze,mt,bt)}function kt(e,t,n,s,o){if(!v(e))return e;if(e.__v_raw&&(!t||!e.__v_isReactive))return e;const r=o.get(e);if(r)return r;const i=(l=e).__v_skip||!Object.isExtensible(l)?0:function(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}(x(l));var l;if(0===i)return e;const c=new Proxy(e,2===i?s:n);return o.set(e,c),c}function Tt(e){return wt(e)?Tt(e.__v_raw):!(!e||!e.__v_isReactive)}function wt(e){return!(!e||!e.__v_isReadonly)}function Et(e){return!(!e||!e.__v_isShallow)}function Nt(e){return Tt(e)||wt(e)}function At(e){const t=e&&e.__v_raw;return t?At(t):e}function It(e){return Object.isExtensible(e)&&P(e,"__v_skip",!0),e}const Rt=e=>v(e)?_t(e):e,Ot=e=>v(e)?xt(e):e;class Lt{constructor(e,t,n,s){this._setter=t,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this.effect=new he((()=>e(this._value)),(()=>Mt(this,2===this.effect._dirtyLevel?2:3))),this.effect.computed=this,this.effect.active=this._cacheable=!s,this.__v_isReadonly=n}get value(){const e=At(this);return e._cacheable&&!e.effect.dirty||!F(e._value,e._value=e.effect.run())||Mt(e,4),Ft(e),e.effect._dirtyLevel>=2&&Mt(e,2),e._value}set value(e){this._setter(e)}get _dirty(){return this.effect.dirty}set _dirty(e){this.effect.dirty=e}}function Ft(e){var t;_e&&le&&(e=At(e),Ee(le,null!=(t=e.dep)?t:e.dep=Ie((()=>e.dep=void 0),e instanceof Lt?e:void 0)))}function Mt(e,t=4,n){const s=(e=At(e)).dep;s&&Ae(s,t)}function Pt(e){return!(!e||!0!==e.__v_isRef)}function $t(e){return Vt(e,!1)}function Bt(e){return Vt(e,!0)}function Vt(e,t){return Pt(e)?e:new Dt(e,t)}class Dt{constructor(e,t){this.__v_isShallow=t,this.dep=void 0,this.__v_isRef=!0,this._rawValue=t?e:At(e),this._value=t?e:Rt(e)}get value(){return Ft(this),this._value}set value(e){const t=this.__v_isShallow||Et(e)||wt(e);e=t?e:At(e),F(e,this._rawValue)&&(this._rawValue=e,this._value=t?e:Rt(e),Mt(this,4))}}function Ut(e){Mt(e,4)}function jt(e){return Pt(e)?e.value:e}function Ht(e){return m(e)?e():jt(e)}const qt={get:(e,t,n)=>jt(Reflect.get(e,t,n)),set:(e,t,n,s)=>{const o=e[t];return Pt(o)&&!Pt(n)?(o.value=n,!0):Reflect.set(e,t,n,s)}};function Wt(e){return Tt(e)?e:new Proxy(e,qt)}class Kt{constructor(e){this.dep=void 0,this.__v_isRef=!0;const{get:t,set:n}=e((()=>Ft(this)),(()=>Mt(this)));this._get=t,this._set=n}get value(){return this._get()}set value(e){this._set(e)}}function zt(e){return new Kt(e)}function Gt(e){const t=d(e)?new Array(e.length):{};for(const n in e)t[n]=Zt(e,n);return t}class Jt{constructor(e,t,n){this._object=e,this._key=t,this._defaultValue=n,this.__v_isRef=!0}get value(){const e=this._object[this._key];return void 0===e?this._defaultValue:e}set value(e){this._object[this._key]=e}get dep(){return e=At(this._object),t=this._key,null==(n=Re.get(e))?void 0:n.get(t);var e,t,n}}class Xt{constructor(e){this._getter=e,this.__v_isRef=!0,this.__v_isReadonly=!0}get value(){return this._getter()}}function Qt(e,t,n){return Pt(e)?e:m(e)?new Xt(e):v(e)&&arguments.length>1?Zt(e,t,n):$t(e)}function Zt(e,t,n){const s=e[t];return Pt(s)?s:new Jt(e,t,n)}const Yt={GET:"get",HAS:"has",ITERATE:"iterate"},en={SET:"set",ADD:"add",DELETE:"delete",CLEAR:"clear"};function tn(e,t){}const nn={SETUP_FUNCTION:0,0:"SETUP_FUNCTION",RENDER_FUNCTION:1,1:"RENDER_FUNCTION",WATCH_GETTER:2,2:"WATCH_GETTER",WATCH_CALLBACK:3,3:"WATCH_CALLBACK",WATCH_CLEANUP:4,4:"WATCH_CLEANUP",NATIVE_EVENT_HANDLER:5,5:"NATIVE_EVENT_HANDLER",COMPONENT_EVENT_HANDLER:6,6:"COMPONENT_EVENT_HANDLER",VNODE_HOOK:7,7:"VNODE_HOOK",DIRECTIVE_HOOK:8,8:"DIRECTIVE_HOOK",TRANSITION_HOOK:9,9:"TRANSITION_HOOK",APP_ERROR_HANDLER:10,10:"APP_ERROR_HANDLER",APP_WARN_HANDLER:11,11:"APP_WARN_HANDLER",FUNCTION_REF:12,12:"FUNCTION_REF",ASYNC_COMPONENT_LOADER:13,13:"ASYNC_COMPONENT_LOADER",SCHEDULER:14,14:"SCHEDULER"};function sn(e,t,n,s){try{return s?e(...s):e()}catch(o){rn(o,t,n)}}function on(e,t,n,s){if(m(e)){const o=sn(e,t,n,s);return o&&b(o)&&o.catch((e=>{rn(e,t,n)})),o}const o=[];for(let r=0;r<e.length;r++)o.push(on(e[r],t,n,s));return o}function rn(e,t,n,s=!0){if(t){let s=t.parent;const o=t.proxy,r=`https://vuejs.org/error-reference/#runtime-${n}`;for(;s;){const t=s.ec;if(t)for(let n=0;n<t.length;n++)if(!1===t[n](e,o,r))return;s=s.parent}const i=t.appContext.config.errorHandler;if(i)return void sn(i,null,10,[e,o,r])}!function(e,t,n,s=!0){console.error(e)}(e,0,0,s)}let ln=!1,cn=!1;const an=[];let un=0;const dn=[];let pn=null,hn=0;const fn=Promise.resolve();let mn=null;function gn(e){const t=mn||fn;return e?t.then(this?e.bind(this):e):t}function yn(e){an.length&&an.includes(e,ln&&e.allowRecurse?un+1:un)||(null==e.id?an.push(e):an.splice(function(e){let t=un+1,n=an.length;for(;t<n;){const s=t+n>>>1,o=an[s],r=xn(o);r<e||r===e&&o.pre?t=s+1:n=s}return t}(e.id),0,e),vn())}function vn(){ln||cn||(cn=!0,mn=fn.then(kn))}function bn(e){d(e)?dn.push(...e):pn&&pn.includes(e,e.allowRecurse?hn+1:hn)||dn.push(e),vn()}function _n(e,t,n=(ln?un+1:0)){for(;n<an.length;n++){const t=an[n];if(t&&t.pre){if(e&&t.id!==e.uid)continue;an.splice(n,1),n--,t()}}}function Sn(e){if(dn.length){const e=[...new Set(dn)].sort(((e,t)=>xn(e)-xn(t)));if(dn.length=0,pn)return void pn.push(...e);for(pn=e,hn=0;hn<pn.length;hn++)pn[hn]();pn=null,hn=0}}const xn=e=>null==e.id?1/0:e.id,Cn=(e,t)=>{const n=xn(e)-xn(t);if(0===n){if(e.pre&&!t.pre)return-1;if(t.pre&&!e.pre)return 1}return n};function kn(e){cn=!1,ln=!0,an.sort(Cn);try{for(un=0;un<an.length;un++){const e=an[un];e&&!1!==e.active&&sn(e,null,14)}}finally{un=0,an.length=0,Sn(),ln=!1,mn=null,(an.length||dn.length)&&kn()}}function Tn(e,n,...s){if(e.isUnmounted)return;const o=e.vnode.props||t;let r=s;const i=n.startsWith("update:"),l=i&&n.slice(7);if(l&&l in o){const e=`${"modelValue"===l?"model":l}Modifiers`,{number:n,trim:i}=o[e]||t;i&&(r=s.map((e=>g(e)?e.trim():e))),n&&(r=s.map($))}let c,a=o[c=L(n)]||o[c=L(A(n))];!a&&i&&(a=o[c=L(R(n))]),a&&on(a,e,6,r);const u=o[c+"Once"];if(u){if(e.emitted){if(e.emitted[c])return}else e.emitted={};e.emitted[c]=!0,on(u,e,6,r)}}function wn(e,t,n=!1){const s=t.emitsCache,o=s.get(e);if(void 0!==o)return o;const r=e.emits;let i={},c=!1;if(!m(e)){const s=e=>{const n=wn(e,t,!0);n&&(c=!0,l(i,n))};!n&&t.mixins.length&&t.mixins.forEach(s),e.extends&&s(e.extends),e.mixins&&e.mixins.forEach(s)}return r||c?(d(r)?r.forEach((e=>i[e]=null)):l(i,r),v(e)&&s.set(e,i),i):(v(e)&&s.set(e,null),null)}function En(e,t){return!(!e||!r(t))&&(t=t.slice(2).replace(/Once$/,""),u(e,t[0].toLowerCase()+t.slice(1))||u(e,R(t))||u(e,t))}let Nn=null,An=null;function In(e){const t=Nn;return Nn=e,An=e&&e.type.__scopeId||null,t}function Rn(e){An=e}function On(){An=null}const Ln=e=>Fn;function Fn(e,t=Nn,n){if(!t)return e;if(e._n)return e;const s=(...n)=>{s._d&&Or(-1);const o=In(t);let r;try{r=e(...n)}finally{In(o),s._d&&Or(1)}return r};return s._n=!0,s._c=!0,s._d=!0,s}function Mn(e){const{type:t,vnode:n,proxy:s,withProxy:o,props:r,propsOptions:[l],slots:c,attrs:a,emit:u,render:d,renderCache:p,data:h,setupState:f,ctx:m,inheritAttrs:g}=e;let y,v;const b=In(e);try{if(4&n.shapeFlag){const e=o||s;y=Jr(d.call(e,e,p,r,f,h,m)),v=a}else{const e=t;0,y=Jr(e(r,e.length>1?{attrs:a,slots:c,emit:u}:null)),v=t.props?a:Pn(a)}}catch(S){Er.length=0,rn(S,e,1),y=Hr(Tr)}let _=y;if(v&&!1!==g){const e=Object.keys(v),{shapeFlag:t}=_;e.length&&7&t&&(l&&e.some(i)&&(v=$n(v,l)),_=Wr(_,v))}return n.dirs&&(_=Wr(_),_.dirs=_.dirs?_.dirs.concat(n.dirs):n.dirs),n.transition&&(_.transition=n.transition),y=_,In(b),y}const Pn=e=>{let t;for(const n in e)("class"===n||"style"===n||r(n))&&((t||(t={}))[n]=e[n]);return t},$n=(e,t)=>{const n={};for(const s in e)i(s)&&s.slice(9)in t||(n[s]=e[s]);return n};function Bn(e,t,n){const s=Object.keys(t);if(s.length!==Object.keys(e).length)return!0;for(let o=0;o<s.length;o++){const r=s[o];if(t[r]!==e[r]&&!En(n,r))return!0}return!1}function Vn({vnode:e,parent:t},n){for(;t;){const s=t.subTree;if(s.suspense&&s.suspense.activeBranch===e&&(s.el=e.el),s!==e)break;(e=t.vnode).el=n,t=t.parent}}const Dn="components";function Un(e,t){return Wn(Dn,e,!0,t)||e}const jn=Symbol.for("v-ndc");function Hn(e){return g(e)?Wn(Dn,e,!1)||e:e||jn}function qn(e){return Wn("directives",e)}function Wn(e,t,n=!0,s=!1){const o=Nn||ni;if(o){const n=o.type;if(e===Dn){const e=vi(n,!1);if(e&&(e===t||e===A(t)||e===O(A(t))))return n}const r=Kn(o[e]||n[e],t)||Kn(o.appContext[e],t);return!r&&s?n:r}}function Kn(e,t){return e&&(e[t]||e[A(t)]||e[O(A(t))])}const zn=e=>e.__isSuspense;let Gn=0;const Jn={name:"Suspense",__isSuspense:!0,process(e,t,n,s,o,r,i,l,c,a){if(null==e)!function(e,t,n,s,o,r,i,l,c){const{p:a,o:{createElement:u}}=c,d=u("div"),p=e.suspense=Qn(e,o,s,t,d,n,r,i,l,c);a(null,p.pendingBranch=e.ssContent,d,null,s,p,r,i),p.deps>0?(Xn(e,"onPending"),Xn(e,"onFallback"),a(null,e.ssFallback,t,n,s,null,r,i),es(p,e.ssFallback)):p.resolve(!1,!0)}(t,n,s,o,r,i,l,c,a);else{if(r&&r.deps>0)return void(t.suspense=e.suspense);!function(e,t,n,s,o,r,i,l,{p:c,um:a,o:{createElement:u}}){const d=t.suspense=e.suspense;d.vnode=t,t.el=e.el;const p=t.ssContent,h=t.ssFallback,{activeBranch:f,pendingBranch:m,isInFallback:g,isHydrating:y}=d;if(m)d.pendingBranch=p,$r(p,m)?(c(m,p,d.hiddenContainer,null,o,d,r,i,l),d.deps<=0?d.resolve():g&&(y||(c(f,h,n,s,o,null,r,i,l),es(d,h)))):(d.pendingId=Gn++,y?(d.isHydrating=!1,d.activeBranch=m):a(m,o,d),d.deps=0,d.effects.length=0,d.hiddenContainer=u("div"),g?(c(null,p,d.hiddenContainer,null,o,d,r,i,l),d.deps<=0?d.resolve():(c(f,h,n,s,o,null,r,i,l),es(d,h))):f&&$r(p,f)?(c(f,p,n,s,o,d,r,i,l),d.resolve(!0)):(c(null,p,d.hiddenContainer,null,o,d,r,i,l),d.deps<=0&&d.resolve()));else if(f&&$r(p,f))c(f,p,n,s,o,d,r,i,l),es(d,p);else if(Xn(t,"onPending"),d.pendingBranch=p,d.pendingId=512&p.shapeFlag?p.component.suspenseId:Gn++,c(null,p,d.hiddenContainer,null,o,d,r,i,l),d.deps<=0)d.resolve();else{const{timeout:e,pendingId:t}=d;e>0?setTimeout((()=>{d.pendingId===t&&d.fallback(h)}),e):0===e&&d.fallback(h)}}(e,t,n,s,o,i,l,c,a)}},hydrate:function(e,t,n,s,o,r,i,l,c){const a=t.suspense=Qn(t,s,n,e.parentNode,document.createElement("div"),null,o,r,i,l,!0),u=c(e,a.pendingBranch=t.ssContent,n,a,r,i);0===a.deps&&a.resolve(!1,!0);return u},create:Qn,normalize:function(e){const{shapeFlag:t,children:n}=e,s=32&t;e.ssContent=Zn(s?n.default:n),e.ssFallback=s?Zn(n.fallback):Hr(Tr)}};function Xn(e,t){const n=e.props&&e.props[t];m(n)&&n()}function Qn(e,t,n,s,o,r,i,l,c,a,u=!1){const{p:d,m:p,um:h,n:f,o:{parentNode:m,remove:g}}=a;let y;const v=function(e){var t;return null!=(null==(t=e.props)?void 0:t.suspensible)&&!1!==e.props.suspensible}(e);v&&(null==t?void 0:t.pendingBranch)&&(y=t.pendingId,t.deps++);const b=e.props?B(e.props.timeout):void 0,_=r,S={vnode:e,parent:t,parentComponent:n,namespace:i,container:s,hiddenContainer:o,deps:0,pendingId:Gn++,timeout:"number"==typeof b?b:-1,activeBranch:null,pendingBranch:null,isInFallback:!u,isHydrating:u,isUnmounted:!1,effects:[],resolve(e=!1,n=!1){const{vnode:s,activeBranch:o,pendingBranch:i,pendingId:l,effects:c,parentComponent:a,container:u}=S;let d=!1;S.isHydrating?S.isHydrating=!1:e||(d=o&&i.transition&&"out-in"===i.transition.mode,d&&(o.transition.afterLeave=()=>{l===S.pendingId&&(p(i,u,r===_?f(o):r,0),bn(c))}),o&&(m(o.el)!==S.hiddenContainer&&(r=f(o)),h(o,a,S,!0)),d||p(i,u,r,0)),es(S,i),S.pendingBranch=null,S.isInFallback=!1;let g=S.parent,b=!1;for(;g;){if(g.pendingBranch){g.effects.push(...c),b=!0;break}g=g.parent}b||d||bn(c),S.effects=[],v&&t&&t.pendingBranch&&y===t.pendingId&&(t.deps--,0!==t.deps||n||t.resolve()),Xn(s,"onResolve")},fallback(e){if(!S.pendingBranch)return;const{vnode:t,activeBranch:n,parentComponent:s,container:o,namespace:r}=S;Xn(t,"onFallback");const i=f(n),a=()=>{S.isInFallback&&(d(null,e,o,i,s,null,r,l,c),es(S,e))},u=e.transition&&"out-in"===e.transition.mode;u&&(n.transition.afterLeave=a),S.isInFallback=!0,h(n,s,null,!0),u||a()},move(e,t,n){S.activeBranch&&p(S.activeBranch,e,t,n),S.container=e},next:()=>S.activeBranch&&f(S.activeBranch),registerDep(e,t){const n=!!S.pendingBranch;n&&S.deps++;const s=e.vnode.el;e.asyncDep.catch((t=>{rn(t,e,0)})).then((o=>{if(e.isUnmounted||S.isUnmounted||S.pendingId!==e.suspenseId)return;e.asyncResolved=!0;const{vnode:r}=e;pi(e,o,!1),s&&(r.el=s);const l=!s&&e.subTree.el;t(e,r,m(s||e.subTree.el),s?null:f(e.subTree),S,i,c),l&&g(l),Vn(e,r.el),n&&0==--S.deps&&S.resolve()}))},unmount(e,t){S.isUnmounted=!0,S.activeBranch&&h(S.activeBranch,n,e,t),S.pendingBranch&&h(S.pendingBranch,n,e,t)}};return S}function Zn(e){let t;if(m(e)){const n=Rr&&e._c;n&&(e._d=!1,Ar()),e=e(),n&&(e._d=!0,t=Nr,Ir())}if(d(e)){const t=function(e,t=!0){let n;for(let s=0;s<e.length;s++){const t=e[s];if(!Pr(t))return;if(t.type!==Tr||"v-if"===t.children){if(n)return;n=t}}return n}(e);e=t}return e=Jr(e),t&&!e.dynamicChildren&&(e.dynamicChildren=t.filter((t=>t!==e))),e}function Yn(e,t){t&&t.pendingBranch?d(e)?t.effects.push(...e):t.effects.push(e):bn(e)}function es(e,t){e.activeBranch=t;const{vnode:n,parentComponent:s}=e;let o=t.el;for(;!o&&t.component;)o=(t=t.component.subTree).el;n.el=o,s&&s.subTree===n&&(s.vnode.el=o,Vn(s,o))}const ts=Symbol.for("v-scx"),ns=()=>Do(ts);function ss(e,t){return cs(e,null,t)}function os(e,t){return cs(e,null,{flush:"post"})}function rs(e,t){return cs(e,null,{flush:"sync"})}const is={};function ls(e,t,n){return cs(e,t,n)}function cs(e,n,{immediate:o,deep:r,flush:i,once:l}=t){if(n&&l){const e=n;n=(...t)=>{e(...t),C()}}const a=ni,u=e=>!0===r?e:ds(e,!1===r?1:void 0);let p,h,f=!1,g=!1;if(Pt(e)?(p=()=>e.value,f=Et(e)):Tt(e)?(p=()=>u(e),f=!0):d(e)?(g=!0,f=e.some((e=>Tt(e)||Et(e))),p=()=>e.map((e=>Pt(e)?e.value:Tt(e)?u(e):m(e)?sn(e,a,2):void 0))):p=m(e)?n?()=>sn(e,a,2):()=>(h&&h(),on(e,a,3,[y])):s,n&&r){const e=p;p=()=>ds(e())}let y=e=>{h=S.onStop=()=>{sn(e,a,4),h=S.onStop=void 0}},v=g?new Array(e.length).fill(is):is;const b=()=>{if(S.active&&S.dirty)if(n){const e=S.run();(r||f||(g?e.some(((e,t)=>F(e,v[t]))):F(e,v)))&&(h&&h(),on(n,a,3,[e,v===is?void 0:g&&v[0]===is?[]:v,y]),v=e)}else S.run()};let _;b.allowRecurse=!!n,"sync"===i?_=b:"post"===i?_=()=>lr(b,a&&a.suspense):(b.pre=!0,a&&(b.id=a.uid),_=()=>yn(b));const S=new he(p,s,_),x=de(),C=()=>{S.stop(),x&&c(x.effects,S)};return n?o?b():v=S.run():"post"===i?lr(S.run.bind(S),a&&a.suspense):S.run(),C}function as(e,t,n){const s=this.proxy,o=g(e)?e.includes(".")?us(s,e):()=>s[e]:e.bind(s,s);let r;m(t)?r=t:(r=t.handler,n=t);const i=ii(this),l=cs(o,r.bind(s),n);return i(),l}function us(e,t){const n=t.split(".");return()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}function ds(e,t,n=0,s){if(!v(e)||e.__v_skip)return e;if(t&&t>0){if(n>=t)return e;n++}if((s=s||new Set).has(e))return e;if(s.add(e),Pt(e))ds(e.value,t,n,s);else if(d(e))for(let o=0;o<e.length;o++)ds(e[o],t,n,s);else if(h(e)||p(e))e.forEach((e=>{ds(e,t,n,s)}));else if(C(e))for(const o in e)ds(e[o],t,n,s);return e}function ps(e,n){if(null===Nn)return e;const s=yi(Nn)||Nn.proxy,o=e.dirs||(e.dirs=[]);for(let r=0;r<n.length;r++){let[e,i,l,c=t]=n[r];e&&(m(e)&&(e={mounted:e,updated:e}),e.deep&&ds(i),o.push({dir:e,instance:s,value:i,oldValue:void 0,arg:l,modifiers:c}))}return e}function hs(e,t,n,s){const o=e.dirs,r=t&&t.dirs;for(let i=0;i<o.length;i++){const l=o[i];r&&(l.oldValue=r[i].value);let c=l.dir[s];c&&(Ce(),on(c,n,8,[e.el,l,e,t]),ke())}}const fs=Symbol("_leaveCb"),ms=Symbol("_enterCb");function gs(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return js((()=>{e.isMounted=!0})),Ws((()=>{e.isUnmounting=!0})),e}const ys=[Function,Array],vs={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:ys,onEnter:ys,onAfterEnter:ys,onEnterCancelled:ys,onBeforeLeave:ys,onLeave:ys,onAfterLeave:ys,onLeaveCancelled:ys,onBeforeAppear:ys,onAppear:ys,onAfterAppear:ys,onAppearCancelled:ys},bs={name:"BaseTransition",props:vs,setup(e,{slots:t}){const n=si(),s=gs();let o;return()=>{const r=t.default&&Ts(t.default(),!0);if(!r||!r.length)return;let i=r[0];if(r.length>1)for(const e of r)if(e.type!==Tr){i=e;break}const l=At(e),{mode:c}=l;if(s.isLeaving)return xs(i);const a=Cs(i);if(!a)return xs(i);const u=Ss(a,l,s,n);ks(a,u);const d=n.subTree,p=d&&Cs(d);let h=!1;const{getTransitionKey:f}=a.type;if(f){const e=f();void 0===o?o=e:e!==o&&(o=e,h=!0)}if(p&&p.type!==Tr&&(!$r(a,p)||h)){const e=Ss(p,l,s,n);if(ks(p,e),"out-in"===c)return s.isLeaving=!0,e.afterLeave=()=>{s.isLeaving=!1,!1!==n.update.active&&(n.effect.dirty=!0,n.update())},xs(i);"in-out"===c&&a.type!==Tr&&(e.delayLeave=(e,t,n)=>{_s(s,p)[String(p.key)]=p,e[fs]=()=>{t(),e[fs]=void 0,delete u.delayedLeave},u.delayedLeave=n})}return i}}};function _s(e,t){const{leavingVNodes:n}=e;let s=n.get(t.type);return s||(s=Object.create(null),n.set(t.type,s)),s}function Ss(e,t,n,s){const{appear:o,mode:r,persisted:i=!1,onBeforeEnter:l,onEnter:c,onAfterEnter:a,onEnterCancelled:u,onBeforeLeave:p,onLeave:h,onAfterLeave:f,onLeaveCancelled:m,onBeforeAppear:g,onAppear:y,onAfterAppear:v,onAppearCancelled:b}=t,_=String(e.key),S=_s(n,e),x=(e,t)=>{e&&on(e,s,9,t)},C=(e,t)=>{const n=t[1];x(e,t),d(e)?e.every((e=>e.length<=1))&&n():e.length<=1&&n()},k={mode:r,persisted:i,beforeEnter(t){let s=l;if(!n.isMounted){if(!o)return;s=g||l}t[fs]&&t[fs](!0);const r=S[_];r&&$r(e,r)&&r.el[fs]&&r.el[fs](),x(s,[t])},enter(e){let t=c,s=a,r=u;if(!n.isMounted){if(!o)return;t=y||c,s=v||a,r=b||u}let i=!1;const l=e[ms]=t=>{i||(i=!0,x(t?r:s,[e]),k.delayedLeave&&k.delayedLeave(),e[ms]=void 0)};t?C(t,[e,l]):l()},leave(t,s){const o=String(e.key);if(t[ms]&&t[ms](!0),n.isUnmounting)return s();x(p,[t]);let r=!1;const i=t[fs]=n=>{r||(r=!0,s(),x(n?m:f,[t]),t[fs]=void 0,S[o]===e&&delete S[o])};S[o]=e,h?C(h,[t,i]):i()},clone:e=>Ss(e,t,n,s)};return k}function xs(e){if(Is(e))return(e=Wr(e)).children=null,e}function Cs(e){return Is(e)?e.children?e.children[0]:void 0:e}function ks(e,t){6&e.shapeFlag&&e.component?ks(e.component.subTree,t):128&e.shapeFlag?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Ts(e,t=!1,n){let s=[],o=0;for(let r=0;r<e.length;r++){let i=e[r];const l=null==n?i.key:String(n)+String(null!=i.key?i.key:r);i.type===Cr?(128&i.patchFlag&&o++,s=s.concat(Ts(i.children,t,l))):(t||i.type!==Tr)&&s.push(null!=l?Wr(i,{key:l}):i)}if(o>1)for(let r=0;r<s.length;r++)s[r].patchFlag=-2;return s}\n/*! #__NO_SIDE_EFFECTS__ */function ws(e,t){return m(e)?(()=>l({name:e.name},t,{setup:e}))():e}const Es=e=>!!e.type.__asyncLoader\n/*! #__NO_SIDE_EFFECTS__ */;function Ns(e){m(e)&&(e={loader:e});const{loader:t,loadingComponent:n,errorComponent:s,delay:o=200,timeout:r,suspensible:i=!0,onError:l}=e;let c,a=null,u=0;const d=()=>{let e;return a||(e=a=t().catch((e=>{if(e=e instanceof Error?e:new Error(String(e)),l)return new Promise(((t,n)=>{l(e,(()=>t((u++,a=null,d()))),(()=>n(e)),u+1)}));throw e})).then((t=>e!==a&&a?a:(t&&(t.__esModule||"Module"===t[Symbol.toStringTag])&&(t=t.default),c=t,t))))};return ws({name:"AsyncComponentWrapper",__asyncLoader:d,get __asyncResolved(){return c},setup(){const e=ni;if(c)return()=>As(c,e);const t=t=>{a=null,rn(t,e,13,!s)};if(i&&e.suspense)return d().then((t=>()=>As(t,e))).catch((e=>(t(e),()=>s?Hr(s,{error:e}):null)));const l=$t(!1),u=$t(),p=$t(!!o);return o&&setTimeout((()=>{p.value=!1}),o),null!=r&&setTimeout((()=>{if(!l.value&&!u.value){const e=new Error(`Async component timed out after ${r}ms.`);t(e),u.value=e}}),r),d().then((()=>{l.value=!0,e.parent&&Is(e.parent.vnode)&&(e.parent.effect.dirty=!0,yn(e.parent.update))})).catch((e=>{t(e),u.value=e})),()=>l.value&&c?As(c,e):u.value&&s?Hr(s,{error:u.value}):n&&!p.value?Hr(n):void 0}})}function As(e,t){const{ref:n,props:s,children:o,ce:r}=t.vnode,i=Hr(e,s,o);return i.ref=n,i.ce=r,delete t.vnode.ce,i}const Is=e=>e.type.__isKeepAlive,Rs={name:"KeepAlive",__isKeepAlive:!0,props:{include:[String,RegExp,Array],exclude:[String,RegExp,Array],max:[String,Number]},setup(e,{slots:t}){const n=si(),s=n.ctx,o=new Map,r=new Set;let i=null;const l=n.suspense,{renderer:{p:c,m:a,um:u,o:{createElement:d}}}=s,p=d("div");function h(e){$s(e),u(e,n,l,!0)}function f(e){o.forEach(((t,n)=>{const s=vi(t.type);!s||e&&e(s)||m(n)}))}function m(e){const t=o.get(e);i&&$r(t,i)?i&&$s(i):h(t),o.delete(e),r.delete(e)}s.activate=(e,t,n,s,o)=>{const r=e.component;a(e,t,n,0,l),c(r.vnode,e,t,n,r,l,s,e.slotScopeIds,o),lr((()=>{r.isDeactivated=!1,r.a&&M(r.a);const t=e.props&&e.props.onVnodeMounted;t&&Yr(t,r.parent,e)}),l)},s.deactivate=e=>{const t=e.component;a(e,p,null,1,l),lr((()=>{t.da&&M(t.da);const n=e.props&&e.props.onVnodeUnmounted;n&&Yr(n,t.parent,e),t.isDeactivated=!0}),l)},ls((()=>[e.include,e.exclude]),(([e,t])=>{e&&f((t=>Os(e,t))),t&&f((e=>!Os(t,e)))}),{flush:"post",deep:!0});let g=null;const y=()=>{null!=g&&o.set(g,Bs(n.subTree))};return js(y),qs(y),Ws((()=>{o.forEach((e=>{const{subTree:t,suspense:s}=n,o=Bs(t);if(e.type!==o.type||e.key!==o.key)h(e);else{$s(o);const e=o.component.da;e&&lr(e,s)}}))})),()=>{if(g=null,!t.default)return null;const n=t.default(),s=n[0];if(n.length>1)return i=null,n;if(!(Pr(s)&&(4&s.shapeFlag||128&s.shapeFlag)))return i=null,s;let l=Bs(s);const c=l.type,a=vi(Es(l)?l.type.__asyncResolved||{}:c),{include:u,exclude:d,max:p}=e;if(u&&(!a||!Os(u,a))||d&&a&&Os(d,a))return i=l,s;const h=null==l.key?c:l.key,f=o.get(h);return l.el&&(l=Wr(l),128&s.shapeFlag&&(s.ssContent=l)),g=h,f?(l.el=f.el,l.component=f.component,l.transition&&ks(l,l.transition),l.shapeFlag|=512,r.delete(h),r.add(h)):(r.add(h),p&&r.size>parseInt(p,10)&&m(r.values().next().value)),l.shapeFlag|=256,i=l,zn(s.type)?s:l}}};function Os(e,t){return d(e)?e.some((e=>Os(e,t))):g(e)?e.split(",").includes(t):"[object RegExp]"===S(e)&&e.test(t)}function Ls(e,t){Ms(e,"a",t)}function Fs(e,t){Ms(e,"da",t)}function Ms(e,t,n=ni){const s=e.__wdc||(e.__wdc=()=>{let t=n;for(;t;){if(t.isDeactivated)return;t=t.parent}return e()});if(Vs(t,s,n),n){let e=n.parent;for(;e&&e.parent;)Is(e.parent.vnode)&&Ps(s,t,n,e),e=e.parent}}function Ps(e,t,n,s){const o=Vs(t,e,s,!0);Ks((()=>{c(s[t],o)}),n)}function $s(e){e.shapeFlag&=-257,e.shapeFlag&=-513}function Bs(e){return 128&e.shapeFlag?e.ssContent:e}function Vs(e,t,n=ni,s=!1){if(n){const o=n[e]||(n[e]=[]),r=t.__weh||(t.__weh=(...s)=>{if(n.isUnmounted)return;Ce();const o=ii(n),r=on(t,n,e,s);return o(),ke(),r});return s?o.unshift(r):o.push(r),r}}const Ds=e=>(t,n=ni)=>(!di||"sp"===e)&&Vs(e,((...e)=>t(...e)),n),Us=Ds("bm"),js=Ds("m"),Hs=Ds("bu"),qs=Ds("u"),Ws=Ds("bum"),Ks=Ds("um"),zs=Ds("sp"),Gs=Ds("rtg"),Js=Ds("rtc");function Xs(e,t=ni){Vs("ec",e,t)}function Qs(e,t,n,s){let o;const r=n&&n[s];if(d(e)||g(e)){o=new Array(e.length);for(let n=0,s=e.length;n<s;n++)o[n]=t(e[n],n,void 0,r&&r[n])}else if("number"==typeof e){o=new Array(e);for(let n=0;n<e;n++)o[n]=t(n+1,n,void 0,r&&r[n])}else if(v(e))if(e[Symbol.iterator])o=Array.from(e,((e,n)=>t(e,n,void 0,r&&r[n])));else{const n=Object.keys(e);o=new Array(n.length);for(let s=0,i=n.length;s<i;s++){const i=n[s];o[s]=t(e[i],i,s,r&&r[s])}}else o=[];return n&&(n[s]=o),o}function Zs(e,t){for(let n=0;n<t.length;n++){const s=t[n];if(d(s))for(let t=0;t<s.length;t++)e[s[t].name]=s[t].fn;else s&&(e[s.name]=s.key?(...e)=>{const t=s.fn(...e);return t&&(t.key=s.key),t}:s.fn)}return e}function Ys(e,t,n={},s,o){if(Nn.isCE||Nn.parent&&Es(Nn.parent)&&Nn.parent.isCE)return"default"!==t&&(n.name=t),Hr("slot",n,s&&s());let r=e[t];r&&r._c&&(r._d=!1),Ar();const i=r&&eo(r(n)),l=Mr(Cr,{key:n.key||i&&i.key||`_${t}`},i||(s?s():[]),i&&1===e._?64:-2);return!o&&l.scopeId&&(l.slotScopeIds=[l.scopeId+"-s"]),r&&r._c&&(r._d=!0),l}function eo(e){return e.some((e=>!Pr(e)||e.type!==Tr&&!(e.type===Cr&&!eo(e.children))))?e:null}function to(e,t){const n={};for(const s in e)n[t&&/[A-Z]/.test(s)?`on:${s}`:L(s)]=e[s];return n}const no=e=>e?ci(e)?yi(e)||e.proxy:no(e.parent):null,so=l(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>no(e.parent),$root:e=>no(e.root),$emit:e=>e.emit,$options:e=>Eo(e),$forceUpdate:e=>e.f||(e.f=()=>{e.effect.dirty=!0,yn(e.update)}),$nextTick:e=>e.n||(e.n=gn.bind(e.proxy)),$watch:e=>as.bind(e)}),oo=(e,n)=>e!==t&&!e.__isScriptSetup&&u(e,n),ro={get({_:e},n){const{ctx:s,setupState:o,data:r,props:i,accessCache:l,type:c,appContext:a}=e;let d;if("$"!==n[0]){const c=l[n];if(void 0!==c)switch(c){case 1:return o[n];case 2:return r[n];case 4:return s[n];case 3:return i[n]}else{if(oo(o,n))return l[n]=1,o[n];if(r!==t&&u(r,n))return l[n]=2,r[n];if((d=e.propsOptions[0])&&u(d,n))return l[n]=3,i[n];if(s!==t&&u(s,n))return l[n]=4,s[n];Co&&(l[n]=0)}}const p=so[n];let h,f;return p?("$attrs"===n&&Fe(e,0,n),p(e)):(h=c.__cssModules)&&(h=h[n])?h:s!==t&&u(s,n)?(l[n]=4,s[n]):(f=a.config.globalProperties,u(f,n)?f[n]:void 0)},set({_:e},n,s){const{data:o,setupState:r,ctx:i}=e;return oo(r,n)?(r[n]=s,!0):o!==t&&u(o,n)?(o[n]=s,!0):!u(e.props,n)&&(("$"!==n[0]||!(n.slice(1)in e))&&(i[n]=s,!0))},has({_:{data:e,setupState:n,accessCache:s,ctx:o,appContext:r,propsOptions:i}},l){let c;return!!s[l]||e!==t&&u(e,l)||oo(n,l)||(c=i[0])&&u(c,l)||u(o,l)||u(so,l)||u(r.config.globalProperties,l)},defineProperty(e,t,n){return null!=n.get?e._.accessCache[t]=0:u(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}},io=l({},ro,{get(e,t){if(t!==Symbol.unscopables)return ro.get(e,t,e)},has:(e,t)=>"_"!==t[0]&&!U(t)});function lo(){return null}function co(){return null}function ao(e){}function uo(e){}function po(){return null}function ho(){}function fo(e,t){return null}function mo(){return yo().slots}function go(){return yo().attrs}function yo(){const e=si();return e.setupContext||(e.setupContext=gi(e))}function vo(e){return d(e)?e.reduce(((e,t)=>(e[t]=null,e)),{}):e}function bo(e,t){const n=vo(e);for(const s in t){if(s.startsWith("__skip"))continue;let e=n[s];e?d(e)||m(e)?e=n[s]={type:e,default:t[s]}:e.default=t[s]:null===e&&(e=n[s]={default:t[s]}),e&&t[`__skip_${s}`]&&(e.skipFactory=!0)}return n}function _o(e,t){return e&&t?d(e)&&d(t)?e.concat(t):l({},vo(e),vo(t)):e||t}function So(e,t){const n={};for(const s in e)t.includes(s)||Object.defineProperty(n,s,{enumerable:!0,get:()=>e[s]});return n}function xo(e){const t=si();let n=e();return li(),b(n)&&(n=n.catch((e=>{throw ii(t),e}))),[n,()=>ii(t)]}let Co=!0;function ko(e){const t=Eo(e),n=e.proxy,o=e.ctx;Co=!1,t.beforeCreate&&To(t.beforeCreate,e,"bc");const{data:r,computed:i,methods:l,watch:c,provide:a,inject:u,created:p,beforeMount:h,mounted:f,beforeUpdate:g,updated:y,activated:b,deactivated:_,beforeUnmount:S,unmounted:x,render:C,renderTracked:k,renderTriggered:T,errorCaptured:w,serverPrefetch:E,expose:N,inheritAttrs:A,components:I,directives:R}=t;if(u&&function(e,t,n=s){d(e)&&(e=Ro(e));for(const s in e){const n=e[s];let o;o=v(n)?"default"in n?Do(n.from||s,n.default,!0):Do(n.from||s):Do(n),Pt(o)?Object.defineProperty(t,s,{enumerable:!0,configurable:!0,get:()=>o.value,set:e=>o.value=e}):t[s]=o}}(u,o,null),l)for(const s in l){const e=l[s];m(e)&&(o[s]=e.bind(n))}if(r){const t=r.call(n,n);v(t)&&(e.data=_t(t))}if(Co=!0,i)for(const d in i){const e=i[d],t=m(e)?e.bind(n,n):m(e.get)?e.get.bind(n,n):s,r=!m(e)&&m(e.set)?e.set.bind(n):s,l=bi({get:t,set:r});Object.defineProperty(o,d,{enumerable:!0,configurable:!0,get:()=>l.value,set:e=>l.value=e})}if(c)for(const s in c)wo(c[s],o,n,s);if(a){const e=m(a)?a.call(n):a;Reflect.ownKeys(e).forEach((t=>{Vo(t,e[t])}))}function O(e,t){d(t)?t.forEach((t=>e(t.bind(n)))):t&&e(t.bind(n))}if(p&&To(p,e,"c"),O(Us,h),O(js,f),O(Hs,g),O(qs,y),O(Ls,b),O(Fs,_),O(Xs,w),O(Js,k),O(Gs,T),O(Ws,S),O(Ks,x),O(zs,E),d(N))if(N.length){const t=e.exposed||(e.exposed={});N.forEach((e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t})}))}else e.exposed||(e.exposed={});C&&e.render===s&&(e.render=C),null!=A&&(e.inheritAttrs=A),I&&(e.components=I),R&&(e.directives=R)}function To(e,t,n){on(d(e)?e.map((e=>e.bind(t.proxy))):e.bind(t.proxy),t,n)}function wo(e,t,n,s){const o=s.includes(".")?us(n,s):()=>n[s];if(g(e)){const n=t[e];m(n)&&ls(o,n)}else if(m(e))ls(o,e.bind(n));else if(v(e))if(d(e))e.forEach((e=>wo(e,t,n,s)));else{const s=m(e.handler)?e.handler.bind(n):t[e.handler];m(s)&&ls(o,s,e)}}function Eo(e){const t=e.type,{mixins:n,extends:s}=t,{mixins:o,optionsCache:r,config:{optionMergeStrategies:i}}=e.appContext,l=r.get(t);let c;return l?c=l:o.length||n||s?(c={},o.length&&o.forEach((e=>No(c,e,i,!0))),No(c,t,i)):c=t,v(t)&&r.set(t,c),c}function No(e,t,n,s=!1){const{mixins:o,extends:r}=t;r&&No(e,r,n,!0),o&&o.forEach((t=>No(e,t,n,!0)));for(const i in t)if(s&&"expose"===i);else{const s=Ao[i]||n&&n[i];e[i]=s?s(e[i],t[i]):t[i]}return e}const Ao={data:Io,props:Fo,emits:Fo,methods:Lo,computed:Lo,beforeCreate:Oo,created:Oo,beforeMount:Oo,mounted:Oo,beforeUpdate:Oo,updated:Oo,beforeDestroy:Oo,beforeUnmount:Oo,destroyed:Oo,unmounted:Oo,activated:Oo,deactivated:Oo,errorCaptured:Oo,serverPrefetch:Oo,components:Lo,directives:Lo,watch:function(e,t){if(!e)return t;if(!t)return e;const n=l(Object.create(null),e);for(const s in t)n[s]=Oo(e[s],t[s]);return n},provide:Io,inject:function(e,t){return Lo(Ro(e),Ro(t))}};function Io(e,t){return t?e?function(){return l(m(e)?e.call(this,this):e,m(t)?t.call(this,this):t)}:t:e}function Ro(e){if(d(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function Oo(e,t){return e?[...new Set([].concat(e,t))]:t}function Lo(e,t){return e?l(Object.create(null),e,t):t}function Fo(e,t){return e?d(e)&&d(t)?[...new Set([...e,...t])]:l(Object.create(null),vo(e),vo(null!=t?t:{})):t}function Mo(){return{app:null,config:{isNativeTag:o,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Po=0;function $o(e,t){return function(n,s=null){m(n)||(n=l({},n)),null==s||v(s)||(s=null);const o=Mo(),r=new WeakSet;let i=!1;const c=o.app={_uid:Po++,_component:n,_props:s,_container:null,_context:o,_instance:null,version:Ti,get config(){return o.config},set config(e){},use:(e,...t)=>(r.has(e)||(e&&m(e.install)?(r.add(e),e.install(c,...t)):m(e)&&(r.add(e),e(c,...t))),c),mixin:e=>(o.mixins.includes(e)||o.mixins.push(e),c),component:(e,t)=>t?(o.components[e]=t,c):o.components[e],directive:(e,t)=>t?(o.directives[e]=t,c):o.directives[e],mount(r,l,a){if(!i){const u=Hr(n,s);return u.appContext=o,!0===a?a="svg":!1===a&&(a=void 0),l&&t?t(u,r):e(u,r,a),i=!0,c._container=r,r.__vue_app__=c,yi(u.component)||u.component.proxy}},unmount(){i&&(e(null,c._container),delete c._container.__vue_app__)},provide:(e,t)=>(o.provides[e]=t,c),runWithContext(e){const t=Bo;Bo=c;try{return e()}finally{Bo=t}}};return c}}let Bo=null;function Vo(e,t){if(ni){let n=ni.provides;const s=ni.parent&&ni.parent.provides;s===n&&(n=ni.provides=Object.create(s)),n[e]=t}else;}function Do(e,t,n=!1){const s=ni||Nn;if(s||Bo){const o=s?null==s.parent?s.vnode.appContext&&s.vnode.appContext.provides:s.parent.provides:Bo._context.provides;if(o&&e in o)return o[e];if(arguments.length>1)return n&&m(t)?t.call(s&&s.proxy):t}}function Uo(){return!!(ni||Nn||Bo)}function jo(e,n,s,o){const[r,i]=e.propsOptions;let l,c=!1;if(n)for(let t in n){if(T(t))continue;const a=n[t];let d;r&&u(r,d=A(t))?i&&i.includes(d)?(l||(l={}))[d]=a:s[d]=a:En(e.emitsOptions,t)||t in o&&a===o[t]||(o[t]=a,c=!0)}if(i){const n=At(s),o=l||t;for(let t=0;t<i.length;t++){const l=i[t];s[l]=Ho(r,n,l,o[l],e,!u(o,l))}}return c}function Ho(e,t,n,s,o,r){const i=e[n];if(null!=i){const e=u(i,"default");if(e&&void 0===s){const e=i.default;if(i.type!==Function&&!i.skipFactory&&m(e)){const{propsDefaults:r}=o;if(n in r)s=r[n];else{const i=ii(o);s=r[n]=e.call(null,t),i()}}else s=e}i[0]&&(r&&!e?s=!1:!i[1]||""!==s&&s!==R(n)||(s=!0))}return s}function qo(e,s,o=!1){const r=s.propsCache,i=r.get(e);if(i)return i;const c=e.props,a={},p=[];let h=!1;if(!m(e)){const t=e=>{h=!0;const[t,n]=qo(e,s,!0);l(a,t),n&&p.push(...n)};!o&&s.mixins.length&&s.mixins.forEach(t),e.extends&&t(e.extends),e.mixins&&e.mixins.forEach(t)}if(!c&&!h)return v(e)&&r.set(e,n),n;if(d(c))for(let n=0;n<c.length;n++){const e=A(c[n]);Wo(e)&&(a[e]=t)}else if(c)for(const t in c){const e=A(t);if(Wo(e)){const n=c[t],s=a[e]=d(n)||m(n)?{type:n}:l({},n);if(s){const t=Go(Boolean,s.type),n=Go(String,s.type);s[0]=t>-1,s[1]=n<0||t<n,(t>-1||u(s,"default"))&&p.push(e)}}}const f=[a,p];return v(e)&&r.set(e,f),f}function Wo(e){return"$"!==e[0]&&!T(e)}function Ko(e){if(null===e)return"null";if("function"==typeof e)return e.name||"";if("object"==typeof e){return e.constructor&&e.constructor.name||""}return""}function zo(e,t){return Ko(e)===Ko(t)}function Go(e,t){return d(t)?t.findIndex((t=>zo(t,e))):m(t)&&zo(t,e)?0:-1}const Jo=e=>"_"===e[0]||"$stable"===e,Xo=e=>d(e)?e.map(Jr):[Jr(e)],Qo=(e,t,n)=>{if(t._n)return t;const s=Fn(((...e)=>Xo(t(...e))),n);return s._c=!1,s},Zo=(e,t,n)=>{const s=e._ctx;for(const o in e){if(Jo(o))continue;const n=e[o];if(m(n))t[o]=Qo(0,n,s);else if(null!=n){const e=Xo(n);t[o]=()=>e}}},Yo=(e,t)=>{const n=Xo(t);e.slots.default=()=>n},er=(e,t)=>{if(32&e.vnode.shapeFlag){const n=t._;n?(e.slots=At(t),P(t,"_",n)):Zo(t,e.slots={})}else e.slots={},t&&Yo(e,t);P(e.slots,Vr,1)},tr=(e,n,s)=>{const{vnode:o,slots:r}=e;let i=!0,c=t;if(32&o.shapeFlag){const e=n._;e?s&&1===e?i=!1:(l(r,n),s||1!==e||delete r._):(i=!n.$stable,Zo(n,r)),c=n}else n&&(Yo(e,n),c={default:1});if(i)for(const t in r)Jo(t)||null!=c[t]||delete r[t]};function nr(e,n,s,o,r=!1){if(d(e))return void e.forEach(((e,t)=>nr(e,n&&(d(n)?n[t]:n),s,o,r)));if(Es(o)&&!r)return;const i=4&o.shapeFlag?yi(o.component)||o.component.proxy:o.el,l=r?null:i,{i:a,r:p}=e,h=n&&n.r,f=a.refs===t?a.refs={}:a.refs,y=a.setupState;if(null!=h&&h!==p&&(g(h)?(f[h]=null,u(y,h)&&(y[h]=null)):Pt(h)&&(h.value=null)),m(p))sn(p,a,12,[l,f]);else{const t=g(p),n=Pt(p);if(t||n){const o=()=>{if(e.f){const n=t?u(y,p)?y[p]:f[p]:p.value;r?d(n)&&c(n,i):d(n)?n.includes(i)||n.push(i):t?(f[p]=[i],u(y,p)&&(y[p]=f[p])):(p.value=[i],e.k&&(f[e.k]=p.value))}else t?(f[p]=l,u(y,p)&&(y[p]=l)):n&&(p.value=l,e.k&&(f[e.k]=l))};l?(o.id=-1,lr(o,s)):o()}}}let sr=!1;const or=e=>(e=>e.namespaceURI.includes("svg")&&"foreignObject"!==e.tagName)(e)?"svg":(e=>e.namespaceURI.includes("MathML"))(e)?"mathml":void 0,rr=e=>8===e.nodeType;function ir(e){const{mt:t,p:n,o:{patchProp:s,createText:o,nextSibling:i,parentNode:l,remove:c,insert:a,createComment:u}}=e,d=(n,s,r,c,u,b=!1)=>{const _=rr(n)&&"["===n.data,S=()=>m(n,s,r,c,u,_),{type:x,ref:C,shapeFlag:k,patchFlag:T}=s;let w=n.nodeType;s.el=n,-2===T&&(b=!1,s.dynamicChildren=null);let E=null;switch(x){case kr:3!==w?""===s.children?(a(s.el=o(""),l(n),n),E=n):E=S():(n.data!==s.children&&(sr=!0,n.data=s.children),E=i(n));break;case Tr:v(n)?(E=i(n),y(s.el=n.content.firstChild,n,r)):E=8!==w||_?S():i(n);break;case wr:if(_&&(w=(n=i(n)).nodeType),1===w||3===w){E=n;const e=!s.children.length;for(let t=0;t<s.staticCount;t++)e&&(s.children+=1===E.nodeType?E.outerHTML:E.data),t===s.staticCount-1&&(s.anchor=E),E=i(E);return _?i(E):E}S();break;case Cr:E=_?f(n,s,r,c,u,b):S();break;default:if(1&k)E=1===w&&s.type.toLowerCase()===n.tagName.toLowerCase()||v(n)?p(n,s,r,c,u,b):S();else if(6&k){s.slotScopeIds=u;const e=l(n);if(E=_?g(n):rr(n)&&"teleport start"===n.data?g(n,n.data,"teleport end"):i(n),t(s,e,null,r,c,or(e),b),Es(s)){let t;_?(t=Hr(Cr),t.anchor=E?E.previousSibling:e.lastChild):t=3===n.nodeType?Kr(""):Hr("div"),t.el=n,s.component.subTree=t}}else 64&k?E=8!==w?S():s.type.hydrate(n,s,r,c,u,b,e,h):128&k&&(E=s.type.hydrate(n,s,r,c,or(l(n)),u,b,e,d))}return null!=C&&nr(C,null,c,s),E},p=(e,t,n,o,i,l)=>{l=l||!!t.dynamicChildren;const{type:a,props:u,patchFlag:d,shapeFlag:p,dirs:f,transition:m}=t,g="input"===a||"option"===a;if(g||-1!==d){f&&hs(t,null,n,"created");let a,b=!1;if(v(e)){b=hr(o,m)&&n&&n.vnode.props&&n.vnode.props.appear;const s=e.content.firstChild;b&&m.beforeEnter(s),y(s,e,n),t.el=e=s}if(16&p&&(!u||!u.innerHTML&&!u.textContent)){let s=h(e.firstChild,t,e,n,o,i,l);for(;s;){sr=!0;const e=s;s=s.nextSibling,c(e)}}else 8&p&&e.textContent!==t.children&&(sr=!0,e.textContent=t.children);if(u)if(g||!l||48&d)for(const t in u)(g&&(t.endsWith("value")||"indeterminate"===t)||r(t)&&!T(t)||"."===t[0])&&s(e,t,null,u[t],void 0,void 0,n);else u.onClick&&s(e,"onClick",null,u.onClick,void 0,void 0,n);(a=u&&u.onVnodeBeforeMount)&&Yr(a,n,t),f&&hs(t,null,n,"beforeMount"),((a=u&&u.onVnodeMounted)||f||b)&&Yn((()=>{a&&Yr(a,n,t),b&&m.enter(e),f&&hs(t,null,n,"mounted")}),o)}return e.nextSibling},h=(e,t,s,o,r,i,l)=>{l=l||!!t.dynamicChildren;const c=t.children,a=c.length;for(let u=0;u<a;u++){const t=l?c[u]:c[u]=Jr(c[u]);if(e)e=d(e,t,o,r,i,l);else{if(t.type===kr&&!t.children)continue;sr=!0,n(null,t,s,null,o,r,or(s),i)}}return e},f=(e,t,n,s,o,r)=>{const{slotScopeIds:c}=t;c&&(o=o?o.concat(c):c);const d=l(e),p=h(i(e),t,d,n,s,o,r);return p&&rr(p)&&"]"===p.data?i(t.anchor=p):(sr=!0,a(t.anchor=u("]"),d,p),p)},m=(e,t,s,o,r,a)=>{if(sr=!0,t.el=null,a){const t=g(e);for(;;){const n=i(e);if(!n||n===t)break;c(n)}}const u=i(e),d=l(e);return c(e),n(null,t,d,u,s,o,or(d),r),u},g=(e,t="[",n="]")=>{let s=0;for(;e;)if((e=i(e))&&rr(e)&&(e.data===t&&s++,e.data===n)){if(0===s)return i(e);s--}return e},y=(e,t,n)=>{const s=t.parentNode;s&&s.replaceChild(e,t);let o=n;for(;o;)o.vnode.el===t&&(o.vnode.el=o.subTree.el=e),o=o.parent},v=e=>1===e.nodeType&&"template"===e.tagName.toLowerCase();return[(e,t)=>{if(!t.hasChildNodes())return n(null,e,t),Sn(),void(t._vnode=e);sr=!1,d(t.firstChild,e,null,null,null),Sn(),t._vnode=e,sr&&console.error("Hydration completed but contains mismatches.")},d]}const lr=Yn;function cr(e){return ur(e)}function ar(e){return ur(e,ir)}function ur(e,o){D().__VUE__=!0;const{insert:r,remove:i,patchProp:l,createElement:c,createText:a,createComment:d,setText:p,setElementText:h,parentNode:f,nextSibling:m,setScopeId:g=s,insertStaticContent:y}=e,v=(e,t,n,s=null,o=null,r=null,i=void 0,l=null,c=!!t.dynamicChildren)=>{if(e===t)return;e&&!$r(e,t)&&(s=Q(e),K(e,o,r,!0),e=null),-2===t.patchFlag&&(c=!1,t.dynamicChildren=null);const{type:a,ref:u,shapeFlag:d}=t;switch(a){case kr:_(e,t,n,s);break;case Tr:S(e,t,n,s);break;case wr:null==e&&x(t,n,s,i);break;case Cr:L(e,t,n,s,o,r,i,l,c);break;default:1&d?C(e,t,n,s,o,r,i,l,c):6&d?F(e,t,n,s,o,r,i,l,c):(64&d||128&d)&&a.process(e,t,n,s,o,r,i,l,c,ee)}null!=u&&o&&nr(u,e&&e.ref,r,t||e,!t)},_=(e,t,n,s)=>{if(null==e)r(t.el=a(t.children),n,s);else{const n=t.el=e.el;t.children!==e.children&&p(n,t.children)}},S=(e,t,n,s)=>{null==e?r(t.el=d(t.children||""),n,s):t.el=e.el},x=(e,t,n,s)=>{[e.el,e.anchor]=y(e.children,t,n,s,e.el,e.anchor)},C=(e,t,n,s,o,r,i,l,c)=>{"svg"===t.type?i="svg":"math"===t.type&&(i="mathml"),null==e?k(t,n,s,o,r,i,l,c):N(e,t,o,r,i,l,c)},k=(e,t,n,s,o,i,a,u)=>{let d,p;const{props:f,shapeFlag:m,transition:g,dirs:y}=e;if(d=e.el=c(e.type,i,f&&f.is,f),8&m?h(d,e.children):16&m&&E(e.children,d,null,s,o,dr(e,i),a,u),y&&hs(e,null,s,"created"),w(d,e,e.scopeId,a,s),f){for(const t in f)"value"===t||T(t)||l(d,t,null,f[t],i,e.children,s,o,X);"value"in f&&l(d,"value",null,f.value,i),(p=f.onVnodeBeforeMount)&&Yr(p,s,e)}y&&hs(e,null,s,"beforeMount");const v=hr(o,g);v&&g.beforeEnter(d),r(d,t,n),((p=f&&f.onVnodeMounted)||v||y)&&lr((()=>{p&&Yr(p,s,e),v&&g.enter(d),y&&hs(e,null,s,"mounted")}),o)},w=(e,t,n,s,o)=>{if(n&&g(e,n),s)for(let r=0;r<s.length;r++)g(e,s[r]);if(o){if(t===o.subTree){const t=o.vnode;w(e,t,t.scopeId,t.slotScopeIds,o.parent)}}},E=(e,t,n,s,o,r,i,l,c=0)=>{for(let a=c;a<e.length;a++){const c=e[a]=l?Xr(e[a]):Jr(e[a]);v(null,c,t,n,s,o,r,i,l)}},N=(e,n,s,o,r,i,c)=>{const a=n.el=e.el;let{patchFlag:u,dynamicChildren:d,dirs:p}=n;u|=16&e.patchFlag;const f=e.props||t,m=n.props||t;let g;if(s&&pr(s,!1),(g=m.onVnodeBeforeUpdate)&&Yr(g,s,n,e),p&&hs(n,e,s,"beforeUpdate"),s&&pr(s,!0),d?I(e.dynamicChildren,d,a,s,o,dr(n,r),i):c||j(e,n,a,null,s,o,dr(n,r),i,!1),u>0){if(16&u)O(a,n,f,m,s,o,r);else if(2&u&&f.class!==m.class&&l(a,"class",null,m.class,r),4&u&&l(a,"style",f.style,m.style,r),8&u){const t=n.dynamicProps;for(let n=0;n<t.length;n++){const i=t[n],c=f[i],u=m[i];u===c&&"value"!==i||l(a,i,c,u,r,e.children,s,o,X)}}1&u&&e.children!==n.children&&h(a,n.children)}else c||null!=d||O(a,n,f,m,s,o,r);((g=m.onVnodeUpdated)||p)&&lr((()=>{g&&Yr(g,s,n,e),p&&hs(n,e,s,"updated")}),o)},I=(e,t,n,s,o,r,i)=>{for(let l=0;l<t.length;l++){const c=e[l],a=t[l],u=c.el&&(c.type===Cr||!$r(c,a)||70&c.shapeFlag)?f(c.el):n;v(c,a,u,null,s,o,r,i,!0)}},O=(e,n,s,o,r,i,c)=>{if(s!==o){if(s!==t)for(const t in s)T(t)||t in o||l(e,t,s[t],null,c,n.children,r,i,X);for(const t in o){if(T(t))continue;const a=o[t],u=s[t];a!==u&&"value"!==t&&l(e,t,u,a,c,n.children,r,i,X)}"value"in o&&l(e,"value",s.value,o.value,c)}},L=(e,t,n,s,o,i,l,c,u)=>{const d=t.el=e?e.el:a(""),p=t.anchor=e?e.anchor:a("");let{patchFlag:h,dynamicChildren:f,slotScopeIds:m}=t;m&&(c=c?c.concat(m):m),null==e?(r(d,n,s),r(p,n,s),E(t.children||[],n,p,o,i,l,c,u)):h>0&&64&h&&f&&e.dynamicChildren?(I(e.dynamicChildren,f,n,o,i,l,c),(null!=t.key||o&&t===o.subTree)&&fr(e,t,!0)):j(e,t,n,p,o,i,l,c,u)},F=(e,t,n,s,o,r,i,l,c)=>{t.slotScopeIds=l,null==e?512&t.shapeFlag?o.ctx.activate(t,n,s,i,c):$(t,n,s,o,r,i,c):B(e,t,c)},$=(e,n,s,o,r,i,l)=>{const c=e.component=function(e,n,s){const o=e.type,r=(n?n.appContext:e.appContext)||ei,i={uid:ti++,vnode:e,type:o,parent:n,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,scope:new ce(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:n?n.provides:Object.create(r.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:qo(o,r),emitsOptions:wn(o,r),emit:null,emitted:null,propsDefaults:t,inheritAttrs:o.inheritAttrs,ctx:t,data:t,props:t,attrs:t,slots:t,refs:t,setupState:t,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:s,suspenseId:s?s.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};i.ctx={_:i},i.root=n?n.root:i,i.emit=Tn.bind(null,i),e.ce&&e.ce(i);return i}(e,o,r);if(Is(e)&&(c.ctx.renderer=ee),function(e,t=!1){t&&ri(t);const{props:n,children:s}=e.vnode,o=ci(e);(function(e,t,n,s=!1){const o={},r={};P(r,Vr,1),e.propsDefaults=Object.create(null),jo(e,t,o,r);for(const i in e.propsOptions[0])i in o||(o[i]=void 0);e.props=n?s?o:St(o):e.type.props?o:r,e.attrs=r})(e,n,o,t),er(e,s);const r=o?function(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=It(new Proxy(e.ctx,ro));const{setup:s}=n;if(s){const n=e.setupContext=s.length>1?gi(e):null,o=ii(e);Ce();const r=sn(s,e,0,[e.props,n]);if(ke(),o(),b(r)){if(r.then(li,li),t)return r.then((n=>{pi(e,n,t)})).catch((t=>{rn(t,e,0)}));e.asyncDep=r}else pi(e,r,t)}else mi(e,t)}(e,t):void 0;t&&ri(!1)}(c),c.asyncDep){if(r&&r.registerDep(c,V),!e.el){const e=c.subTree=Hr(Tr);S(null,e,n,s)}}else V(c,e,n,s,r,i,l)},B=(e,t,n)=>{const s=t.component=e.component;if(function(e,t,n){const{props:s,children:o,component:r}=e,{props:i,children:l,patchFlag:c}=t,a=r.emitsOptions;if(t.dirs||t.transition)return!0;if(!(n&&c>=0))return!(!o&&!l||l&&l.$stable)||s!==i&&(s?!i||Bn(s,i,a):!!i);if(1024&c)return!0;if(16&c)return s?Bn(s,i,a):!!i;if(8&c){const e=t.dynamicProps;for(let t=0;t<e.length;t++){const n=e[t];if(i[n]!==s[n]&&!En(a,n))return!0}}return!1}(e,t,n)){if(s.asyncDep&&!s.asyncResolved)return void U(s,t,n);s.next=t,function(e){const t=an.indexOf(e);t>un&&an.splice(t,1)}(s.update),s.effect.dirty=!0,s.update()}else t.el=e.el,s.vnode=t},V=(e,t,n,o,r,i,l)=>{const c=()=>{if(e.isMounted){let{next:t,bu:n,u:s,parent:o,vnode:a}=e;{const n=mr(e);if(n)return t&&(t.el=a.el,U(e,t,l)),void n.asyncDep.then((()=>{e.isUnmounted||c()}))}let u,d=t;pr(e,!1),t?(t.el=a.el,U(e,t,l)):t=a,n&&M(n),(u=t.props&&t.props.onVnodeBeforeUpdate)&&Yr(u,o,t,a),pr(e,!0);const p=Mn(e),h=e.subTree;e.subTree=p,v(h,p,f(h.el),Q(h),e,r,i),t.el=p.el,null===d&&Vn(e,p.el),s&&lr(s,r),(u=t.props&&t.props.onVnodeUpdated)&&lr((()=>Yr(u,o,t,a)),r)}else{let s;const{el:l,props:c}=t,{bm:a,m:u,parent:d}=e,p=Es(t);if(pr(e,!1),a&&M(a),!p&&(s=c&&c.onVnodeBeforeMount)&&Yr(s,d,t),pr(e,!0),l&&ne){const n=()=>{e.subTree=Mn(e),ne(l,e.subTree,e,r,null)};p?t.type.__asyncLoader().then((()=>!e.isUnmounted&&n())):n()}else{const s=e.subTree=Mn(e);v(null,s,n,o,e,r,i),t.el=s.el}if(u&&lr(u,r),!p&&(s=c&&c.onVnodeMounted)){const e=t;lr((()=>Yr(s,d,e)),r)}(256&t.shapeFlag||d&&Es(d.vnode)&&256&d.vnode.shapeFlag)&&e.a&&lr(e.a,r),e.isMounted=!0,t=n=o=null}},a=e.effect=new he(c,s,(()=>yn(u)),e.scope),u=e.update=()=>{a.dirty&&a.run()};u.id=e.uid,pr(e,!0),u()},U=(e,t,n)=>{t.component=e;const s=e.vnode.props;e.vnode=t,e.next=null,function(e,t,n,s){const{props:o,attrs:r,vnode:{patchFlag:i}}=e,l=At(o),[c]=e.propsOptions;let a=!1;if(!(s||i>0)||16&i){let s;jo(e,t,o,r)&&(a=!0);for(const r in l)t&&(u(t,r)||(s=R(r))!==r&&u(t,s))||(c?!n||void 0===n[r]&&void 0===n[s]||(o[r]=Ho(c,l,r,void 0,e,!0)):delete o[r]);if(r!==l)for(const e in r)t&&u(t,e)||(delete r[e],a=!0)}else if(8&i){const n=e.vnode.dynamicProps;for(let s=0;s<n.length;s++){let i=n[s];if(En(e.emitsOptions,i))continue;const d=t[i];if(c)if(u(r,i))d!==r[i]&&(r[i]=d,a=!0);else{const t=A(i);o[t]=Ho(c,l,t,d,e,!1)}else d!==r[i]&&(r[i]=d,a=!0)}}a&&Me(e,"set","$attrs")}(e,t.props,s,n),tr(e,t.children,n),Ce(),_n(e),ke()},j=(e,t,n,s,o,r,i,l,c=!1)=>{const a=e&&e.children,u=e?e.shapeFlag:0,d=t.children,{patchFlag:p,shapeFlag:f}=t;if(p>0){if(128&p)return void q(a,d,n,s,o,r,i,l,c);if(256&p)return void H(a,d,n,s,o,r,i,l,c)}8&f?(16&u&&X(a,o,r),d!==a&&h(n,d)):16&u?16&f?q(a,d,n,s,o,r,i,l,c):X(a,o,r,!0):(8&u&&h(n,""),16&f&&E(d,n,s,o,r,i,l,c))},H=(e,t,s,o,r,i,l,c,a)=>{const u=(e=e||n).length,d=(t=t||n).length,p=Math.min(u,d);let h;for(h=0;h<p;h++){const n=t[h]=a?Xr(t[h]):Jr(t[h]);v(e[h],n,s,null,r,i,l,c,a)}u>d?X(e,r,i,!0,!1,p):E(t,s,o,r,i,l,c,a,p)},q=(e,t,s,o,r,i,l,c,a)=>{let u=0;const d=t.length;let p=e.length-1,h=d-1;for(;u<=p&&u<=h;){const n=e[u],o=t[u]=a?Xr(t[u]):Jr(t[u]);if(!$r(n,o))break;v(n,o,s,null,r,i,l,c,a),u++}for(;u<=p&&u<=h;){const n=e[p],o=t[h]=a?Xr(t[h]):Jr(t[h]);if(!$r(n,o))break;v(n,o,s,null,r,i,l,c,a),p--,h--}if(u>p){if(u<=h){const e=h+1,n=e<d?t[e].el:o;for(;u<=h;)v(null,t[u]=a?Xr(t[u]):Jr(t[u]),s,n,r,i,l,c,a),u++}}else if(u>h)for(;u<=p;)K(e[u],r,i,!0),u++;else{const f=u,m=u,g=new Map;for(u=m;u<=h;u++){const e=t[u]=a?Xr(t[u]):Jr(t[u]);null!=e.key&&g.set(e.key,u)}let y,b=0;const _=h-m+1;let S=!1,x=0;const C=new Array(_);for(u=0;u<_;u++)C[u]=0;for(u=f;u<=p;u++){const n=e[u];if(b>=_){K(n,r,i,!0);continue}let o;if(null!=n.key)o=g.get(n.key);else for(y=m;y<=h;y++)if(0===C[y-m]&&$r(n,t[y])){o=y;break}void 0===o?K(n,r,i,!0):(C[o-m]=u+1,o>=x?x=o:S=!0,v(n,t[o],s,null,r,i,l,c,a),b++)}const k=S?function(e){const t=e.slice(),n=[0];let s,o,r,i,l;const c=e.length;for(s=0;s<c;s++){const c=e[s];if(0!==c){if(o=n[n.length-1],e[o]<c){t[s]=o,n.push(s);continue}for(r=0,i=n.length-1;r<i;)l=r+i>>1,e[n[l]]<c?r=l+1:i=l;c<e[n[r]]&&(r>0&&(t[s]=n[r-1]),n[r]=s)}}r=n.length,i=n[r-1];for(;r-- >0;)n[r]=i,i=t[i];return n}(C):n;for(y=k.length-1,u=_-1;u>=0;u--){const e=m+u,n=t[e],p=e+1<d?t[e+1].el:o;0===C[u]?v(null,n,s,p,r,i,l,c,a):S&&(y<0||u!==k[y]?W(n,s,p,2):y--)}}},W=(e,t,n,s,o=null)=>{const{el:i,type:l,transition:c,children:a,shapeFlag:u}=e;if(6&u)return void W(e.component.subTree,t,n,s);if(128&u)return void e.suspense.move(t,n,s);if(64&u)return void l.move(e,t,n,ee);if(l===Cr){r(i,t,n);for(let e=0;e<a.length;e++)W(a[e],t,n,s);return void r(e.anchor,t,n)}if(l===wr)return void(({el:e,anchor:t},n,s)=>{let o;for(;e&&e!==t;)o=m(e),r(e,n,s),e=o;r(t,n,s)})(e,t,n);if(2!==s&&1&u&&c)if(0===s)c.beforeEnter(i),r(i,t,n),lr((()=>c.enter(i)),o);else{const{leave:e,delayLeave:s,afterLeave:o}=c,l=()=>r(i,t,n),a=()=>{e(i,(()=>{l(),o&&o()}))};s?s(i,l,a):a()}else r(i,t,n)},K=(e,t,n,s=!1,o=!1)=>{const{type:r,props:i,ref:l,children:c,dynamicChildren:a,shapeFlag:u,patchFlag:d,dirs:p}=e;if(null!=l&&nr(l,null,n,e,!0),256&u)return void t.ctx.deactivate(e);const h=1&u&&p,f=!Es(e);let m;if(f&&(m=i&&i.onVnodeBeforeUnmount)&&Yr(m,t,e),6&u)J(e.component,n,s);else{if(128&u)return void e.suspense.unmount(n,s);h&&hs(e,null,t,"beforeUnmount"),64&u?e.type.remove(e,t,n,o,ee,s):a&&(r!==Cr||d>0&&64&d)?X(a,t,n,!1,!0):(r===Cr&&384&d||!o&&16&u)&&X(c,t,n),s&&z(e)}(f&&(m=i&&i.onVnodeUnmounted)||h)&&lr((()=>{m&&Yr(m,t,e),h&&hs(e,null,t,"unmounted")}),n)},z=e=>{const{type:t,el:n,anchor:s,transition:o}=e;if(t===Cr)return void G(n,s);if(t===wr)return void(({el:e,anchor:t})=>{let n;for(;e&&e!==t;)n=m(e),i(e),e=n;i(t)})(e);const r=()=>{i(n),o&&!o.persisted&&o.afterLeave&&o.afterLeave()};if(1&e.shapeFlag&&o&&!o.persisted){const{leave:t,delayLeave:s}=o,i=()=>t(n,r);s?s(e.el,r,i):i()}else r()},G=(e,t)=>{let n;for(;e!==t;)n=m(e),i(e),e=n;i(t)},J=(e,t,n)=>{const{bum:s,scope:o,update:r,subTree:i,um:l}=e;s&&M(s),o.stop(),r&&(r.active=!1,K(i,e,t,n)),l&&lr(l,t),lr((()=>{e.isUnmounted=!0}),t),t&&t.pendingBranch&&!t.isUnmounted&&e.asyncDep&&!e.asyncResolved&&e.suspenseId===t.pendingId&&(t.deps--,0===t.deps&&t.resolve())},X=(e,t,n,s=!1,o=!1,r=0)=>{for(let i=r;i<e.length;i++)K(e[i],t,n,s,o)},Q=e=>6&e.shapeFlag?Q(e.component.subTree):128&e.shapeFlag?e.suspense.next():m(e.anchor||e.el);let Z=!1;const Y=(e,t,n)=>{null==e?t._vnode&&K(t._vnode,null,null,!0):v(t._vnode||null,e,t,null,null,null,n),Z||(Z=!0,_n(),Sn(),Z=!1),t._vnode=e},ee={p:v,um:K,m:W,r:z,mt:$,mc:E,pc:j,pbc:I,n:Q,o:e};let te,ne;return o&&([te,ne]=o(ee)),{render:Y,hydrate:te,createApp:$o(Y,te)}}function dr({type:e,props:t},n){return"svg"===n&&"foreignObject"===e||"mathml"===n&&"annotation-xml"===e&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function pr({effect:e,update:t},n){e.allowRecurse=t.allowRecurse=n}function hr(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function fr(e,t,n=!1){const s=e.children,o=t.children;if(d(s)&&d(o))for(let r=0;r<s.length;r++){const e=s[r];let t=o[r];1&t.shapeFlag&&!t.dynamicChildren&&((t.patchFlag<=0||32===t.patchFlag)&&(t=o[r]=Xr(o[r]),t.el=e.el),n||fr(e,t)),t.type===kr&&(t.el=e.el)}}function mr(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:mr(t)}const gr=e=>e&&(e.disabled||""===e.disabled),yr=e=>"undefined"!=typeof SVGElement&&e instanceof SVGElement,vr=e=>"function"==typeof MathMLElement&&e instanceof MathMLElement,br=(e,t)=>{const n=e&&e.to;if(g(n)){if(t){return t(n)}return null}return n};function _r(e,t,n,{o:{insert:s},m:o},r=2){0===r&&s(e.targetAnchor,t,n);const{el:i,anchor:l,shapeFlag:c,children:a,props:u}=e,d=2===r;if(d&&s(i,t,n),(!d||gr(u))&&16&c)for(let p=0;p<a.length;p++)o(a[p],t,n,2);d&&s(l,t,n)}const Sr={name:"Teleport",__isTeleport:!0,process(e,t,n,s,o,r,i,l,c,a){const{mc:u,pc:d,pbc:p,o:{insert:h,querySelector:f,createText:m}}=a,g=gr(t.props);let{shapeFlag:y,children:v,dynamicChildren:b}=t;if(null==e){const e=t.el=m(""),a=t.anchor=m("");h(e,n,s),h(a,n,s);const d=t.target=br(t.props,f),p=t.targetAnchor=m("");d&&(h(p,d),"svg"===i||yr(d)?i="svg":("mathml"===i||vr(d))&&(i="mathml"));const b=(e,t)=>{16&y&&u(v,e,t,o,r,i,l,c)};g?b(n,a):d&&b(d,p)}else{t.el=e.el;const s=t.anchor=e.anchor,u=t.target=e.target,h=t.targetAnchor=e.targetAnchor,m=gr(e.props),y=m?n:u,v=m?s:h;if("svg"===i||yr(u)?i="svg":("mathml"===i||vr(u))&&(i="mathml"),b?(p(e.dynamicChildren,b,y,o,r,i,l),fr(e,t,!0)):c||d(e,t,y,v,o,r,i,l,!1),g)m?t.props&&e.props&&t.props.to!==e.props.to&&(t.props.to=e.props.to):_r(t,n,s,a,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){const e=t.target=br(t.props,f);e&&_r(t,e,null,a,0)}else m&&_r(t,u,h,a,1)}xr(t)},remove(e,t,n,s,{um:o,o:{remove:r}},i){const{shapeFlag:l,children:c,anchor:a,targetAnchor:u,target:d,props:p}=e;if(d&&r(u),i&&r(a),16&l){const e=i||!gr(p);for(let s=0;s<c.length;s++){const r=c[s];o(r,t,n,e,!!r.dynamicChildren)}}},move:_r,hydrate:function(e,t,n,s,o,r,{o:{nextSibling:i,parentNode:l,querySelector:c}},a){const u=t.target=br(t.props,c);if(u){const c=u._lpa||u.firstChild;if(16&t.shapeFlag)if(gr(t.props))t.anchor=a(i(e),t,l(e),n,s,o,r),t.targetAnchor=c;else{t.anchor=i(e);let l=c;for(;l;)if(l=i(l),l&&8===l.nodeType&&"teleport anchor"===l.data){t.targetAnchor=l,u._lpa=t.targetAnchor&&i(t.targetAnchor);break}a(c,t,u,n,s,o,r)}xr(t)}return t.anchor&&i(t.anchor)}};function xr(e){const t=e.ctx;if(t&&t.ut){let n=e.children[0].el;for(;n&&n!==e.targetAnchor;)1===n.nodeType&&n.setAttribute("data-v-owner",t.uid),n=n.nextSibling;t.ut()}}const Cr=Symbol.for("v-fgt"),kr=Symbol.for("v-txt"),Tr=Symbol.for("v-cmt"),wr=Symbol.for("v-stc"),Er=[];let Nr=null;function Ar(e=!1){Er.push(Nr=e?null:[])}function Ir(){Er.pop(),Nr=Er[Er.length-1]||null}let Rr=1;function Or(e){Rr+=e}function Lr(e){return e.dynamicChildren=Rr>0?Nr||n:null,Ir(),Rr>0&&Nr&&Nr.push(e),e}function Fr(e,t,n,s,o,r){return Lr(jr(e,t,n,s,o,r,!0))}function Mr(e,t,n,s,o){return Lr(Hr(e,t,n,s,o,!0))}function Pr(e){return!!e&&!0===e.__v_isVNode}function $r(e,t){return e.type===t.type&&e.key===t.key}function Br(e){}const Vr="__vInternal",Dr=({key:e})=>null!=e?e:null,Ur=({ref:e,ref_key:t,ref_for:n})=>("number"==typeof e&&(e=""+e),null!=e?g(e)||Pt(e)||m(e)?{i:Nn,r:e,k:t,f:!!n}:e:null);function jr(e,t=null,n=null,s=0,o=null,r=(e===Cr?0:1),i=!1,l=!1){const c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Dr(t),ref:t&&Ur(t),scopeId:An,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:s,dynamicProps:o,dynamicChildren:null,appContext:null,ctx:Nn};return l?(Qr(c,n),128&r&&e.normalize(c)):n&&(c.shapeFlag|=g(n)?8:16),Rr>0&&!i&&Nr&&(c.patchFlag>0||6&r)&&32!==c.patchFlag&&Nr.push(c),c}const Hr=function(e,t=null,n=null,s=0,o=null,r=!1){e&&e!==jn||(e=Tr);if(Pr(e)){const s=Wr(e,t,!0);return n&&Qr(s,n),Rr>0&&!r&&Nr&&(6&s.shapeFlag?Nr[Nr.indexOf(e)]=s:Nr.push(s)),s.patchFlag|=-2,s}i=e,m(i)&&"__vccOpts"in i&&(e=e.__vccOpts);var i;if(t){t=qr(t);let{class:e,style:n}=t;e&&!g(e)&&(t.class=z(e)),v(n)&&(Nt(n)&&!d(n)&&(n=l({},n)),t.style=j(n))}const c=g(e)?1:zn(e)?128:(e=>e.__isTeleport)(e)?64:v(e)?4:m(e)?2:0;return jr(e,t,n,s,o,c,r,!0)};function qr(e){return e?Nt(e)||Vr in e?l({},e):e:null}function Wr(e,t,n=!1){const{props:s,ref:o,patchFlag:r,children:i}=e,l=t?Zr(s||{},t):s;return{__v_isVNode:!0,__v_skip:!0,type:e.type,props:l,key:l&&Dr(l),ref:t&&t.ref?n&&o?d(o)?o.concat(Ur(t)):[o,Ur(t)]:Ur(t):o,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:i,target:e.target,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Cr?-1===r?16:16|r:r,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:e.transition,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Wr(e.ssContent),ssFallback:e.ssFallback&&Wr(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce}}function Kr(e=" ",t=0){return Hr(kr,null,e,t)}function zr(e,t){const n=Hr(wr,null,e);return n.staticCount=t,n}function Gr(e="",t=!1){return t?(Ar(),Mr(Tr,null,e)):Hr(Tr,null,e)}function Jr(e){return null==e||"boolean"==typeof e?Hr(Tr):d(e)?Hr(Cr,null,e.slice()):"object"==typeof e?Xr(e):Hr(kr,null,String(e))}function Xr(e){return null===e.el&&-1!==e.patchFlag||e.memo?e:Wr(e)}function Qr(e,t){let n=0;const{shapeFlag:s}=e;if(null==t)t=null;else if(d(t))n=16;else if("object"==typeof t){if(65&s){const n=t.default;return void(n&&(n._c&&(n._d=!1),Qr(e,n()),n._c&&(n._d=!0)))}{n=32;const s=t._;s||Vr in t?3===s&&Nn&&(1===Nn.slots._?t._=1:(t._=2,e.patchFlag|=1024)):t._ctx=Nn}}else m(t)?(t={default:t,_ctx:Nn},n=32):(t=String(t),64&s?(n=16,t=[Kr(t)]):n=8);e.children=t,e.shapeFlag|=n}function Zr(...e){const t={};for(let n=0;n<e.length;n++){const s=e[n];for(const e in s)if("class"===e)t.class!==s.class&&(t.class=z([t.class,s.class]));else if("style"===e)t.style=j([t.style,s.style]);else if(r(e)){const n=t[e],o=s[e];!o||n===o||d(n)&&n.includes(o)||(t[e]=n?[].concat(n,o):o)}else""!==e&&(t[e]=s[e])}return t}function Yr(e,t,n,s=null){on(e,t,7,[n,s])}const ei=Mo();let ti=0;let ni=null;const si=()=>ni||Nn;let oi,ri;oi=e=>{ni=e},ri=e=>{di=e};const ii=e=>{const t=ni;return oi(e),e.scope.on(),()=>{e.scope.off(),oi(t)}},li=()=>{ni&&ni.scope.off(),oi(null)};function ci(e){return 4&e.vnode.shapeFlag}let ai,ui,di=!1;function pi(e,t,n){m(t)?e.render=t:v(t)&&(e.setupState=Wt(t)),mi(e,n)}function hi(e){ai=e,ui=e=>{e.render._rc&&(e.withProxy=new Proxy(e.ctx,io))}}const fi=()=>!ai;function mi(e,t,n){const o=e.type;if(!e.render){if(!t&&ai&&!o.render){const t=o.template||Eo(e).template;if(t){const{isCustomElement:n,compilerOptions:s}=e.appContext.config,{delimiters:r,compilerOptions:i}=o,c=l(l({isCustomElement:n,delimiters:r},s),i);o.render=ai(t,c)}}e.render=o.render||s,ui&&ui(e)}{const t=ii(e);Ce();try{ko(e)}finally{ke(),t()}}}function gi(e){const t=t=>{e.exposed=t||{}};return{get attrs(){return function(e){return e.attrsProxy||(e.attrsProxy=new Proxy(e.attrs,{get:(t,n)=>(Fe(e,0,"$attrs"),t[n])}))}(e)},slots:e.slots,emit:e.emit,expose:t}}function yi(e){if(e.exposed)return e.exposeProxy||(e.exposeProxy=new Proxy(Wt(It(e.exposed)),{get:(t,n)=>n in t?t[n]:n in so?so[n](e):void 0,has:(e,t)=>t in e||t in so}))}function vi(e,t=!0){return m(e)?e.displayName||e.name:e.name||t&&e.__name}const bi=(e,t)=>function(e,t,n=!1){let o,r;const i=m(e);return i?(o=e,r=s):(o=e.get,r=e.set),new Lt(o,r,i||!r,n)}(e,0,di);function _i(e,n,s=t){const o=si(),r=A(n),i=R(n),l=zt(((t,l)=>{let c;return rs((()=>{const t=e[n];F(c,t)&&(c=t,l())})),{get:()=>(t(),s.get?s.get(c):c),set(e){const t=o.vnode.props;t&&(n in t||r in t||i in t)&&(`onUpdate:${n}`in t||`onUpdate:${r}`in t||`onUpdate:${i}`in t)||!F(e,c)||(c=e,l()),o.emit(`update:${n}`,s.set?s.set(e):e)}}})),c="modelValue"===n?"modelModifiers":`${n}Modifiers`;return l[Symbol.iterator]=()=>{let t=0;return{next:()=>t<2?{value:t++?e[c]||{}:l,done:!1}:{done:!0}}},l}function Si(e,t,n){const s=arguments.length;return 2===s?v(t)&&!d(t)?Pr(t)?Hr(e,null,[t]):Hr(e,t):Hr(e,null,t):(s>3?n=Array.prototype.slice.call(arguments,2):3===s&&Pr(n)&&(n=[n]),Hr(e,t,n))}function xi(){}function Ci(e,t,n,s){const o=n[s];if(o&&ki(o,e))return o;const r=t();return r.memo=e.slice(),n[s]=r}function ki(e,t){const n=e.memo;if(n.length!=t.length)return!1;for(let s=0;s<n.length;s++)if(F(n[s],t[s]))return!1;return Rr>0&&Nr&&Nr.push(e),!0}const Ti="3.4.19",wi=s,Ei=null,Ni=void 0,Ai=s,Ii=null,Ri=null,Oi=null,Li=null,Fi="undefined"!=typeof document?document:null,Mi=Fi&&Fi.createElement("template"),Pi={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,s)=>{const o="svg"===t?Fi.createElementNS("http://www.w3.org/2000/svg",e):"mathml"===t?Fi.createElementNS("http://www.w3.org/1998/Math/MathML",e):Fi.createElement(e,n?{is:n}:void 0);return"select"===e&&s&&null!=s.multiple&&o.setAttribute("multiple",s.multiple),o},createText:e=>Fi.createTextNode(e),createComment:e=>Fi.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>Fi.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,s,o,r){const i=n?n.previousSibling:t.lastChild;if(o&&(o===r||o.nextSibling))for(;t.insertBefore(o.cloneNode(!0),n),o!==r&&(o=o.nextSibling););else{Mi.innerHTML="svg"===s?`<svg>${e}</svg>`:"mathml"===s?`<math>${e}</math>`:e;const o=Mi.content;if("svg"===s||"mathml"===s){const e=o.firstChild;for(;e.firstChild;)o.appendChild(e.firstChild);o.removeChild(e)}t.insertBefore(o,n)}return[i?i.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},$i="transition",Bi="animation",Vi=Symbol("_vtc"),Di=(e,{slots:t})=>Si(bs,Wi(e),t);Di.displayName="Transition";const Ui={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},ji=Di.props=l({},vs,Ui),Hi=(e,t=[])=>{d(e)?e.forEach((e=>e(...t))):e&&e(...t)},qi=e=>!!e&&(d(e)?e.some((e=>e.length>1)):e.length>1);function Wi(e){const t={};for(const l in e)l in Ui||(t[l]=e[l]);if(!1===e.css)return t;const{name:n="v",type:s,duration:o,enterFromClass:r=`${n}-enter-from`,enterActiveClass:i=`${n}-enter-active`,enterToClass:c=`${n}-enter-to`,appearFromClass:a=r,appearActiveClass:u=i,appearToClass:d=c,leaveFromClass:p=`${n}-leave-from`,leaveActiveClass:h=`${n}-leave-active`,leaveToClass:f=`${n}-leave-to`}=e,m=function(e){if(null==e)return null;if(v(e))return[Ki(e.enter),Ki(e.leave)];{const t=Ki(e);return[t,t]}}(o),g=m&&m[0],y=m&&m[1],{onBeforeEnter:b,onEnter:_,onEnterCancelled:S,onLeave:x,onLeaveCancelled:C,onBeforeAppear:k=b,onAppear:T=_,onAppearCancelled:w=S}=t,E=(e,t,n)=>{Gi(e,t?d:c),Gi(e,t?u:i),n&&n()},N=(e,t)=>{e._isLeaving=!1,Gi(e,p),Gi(e,f),Gi(e,h),t&&t()},A=e=>(t,n)=>{const o=e?T:_,i=()=>E(t,e,n);Hi(o,[t,i]),Ji((()=>{Gi(t,e?a:r),zi(t,e?d:c),qi(o)||Qi(t,s,g,i)}))};return l(t,{onBeforeEnter(e){Hi(b,[e]),zi(e,r),zi(e,i)},onBeforeAppear(e){Hi(k,[e]),zi(e,a),zi(e,u)},onEnter:A(!1),onAppear:A(!0),onLeave(e,t){e._isLeaving=!0;const n=()=>N(e,t);zi(e,p),tl(),zi(e,h),Ji((()=>{e._isLeaving&&(Gi(e,p),zi(e,f),qi(x)||Qi(e,s,y,n))})),Hi(x,[e,n])},onEnterCancelled(e){E(e,!1),Hi(S,[e])},onAppearCancelled(e){E(e,!0),Hi(w,[e])},onLeaveCancelled(e){N(e),Hi(C,[e])}})}function Ki(e){return B(e)}function zi(e,t){t.split(/\\s+/).forEach((t=>t&&e.classList.add(t))),(e[Vi]||(e[Vi]=new Set)).add(t)}function Gi(e,t){t.split(/\\s+/).forEach((t=>t&&e.classList.remove(t)));const n=e[Vi];n&&(n.delete(t),n.size||(e[Vi]=void 0))}function Ji(e){requestAnimationFrame((()=>{requestAnimationFrame(e)}))}let Xi=0;function Qi(e,t,n,s){const o=e._endId=++Xi,r=()=>{o===e._endId&&s()};if(n)return setTimeout(r,n);const{type:i,timeout:l,propCount:c}=Zi(e,t);if(!i)return s();const a=i+"end";let u=0;const d=()=>{e.removeEventListener(a,p),r()},p=t=>{t.target===e&&++u>=c&&d()};setTimeout((()=>{u<c&&d()}),l+1),e.addEventListener(a,p)}function Zi(e,t){const n=window.getComputedStyle(e),s=e=>(n[e]||"").split(", "),o=s(`${$i}Delay`),r=s(`${$i}Duration`),i=Yi(o,r),l=s(`${Bi}Delay`),c=s(`${Bi}Duration`),a=Yi(l,c);let u=null,d=0,p=0;t===$i?i>0&&(u=$i,d=i,p=r.length):t===Bi?a>0&&(u=Bi,d=a,p=c.length):(d=Math.max(i,a),u=d>0?i>a?$i:Bi:null,p=u?u===$i?r.length:c.length:0);return{type:u,timeout:d,propCount:p,hasTransform:u===$i&&/\\b(transform|all)(,|$)/.test(s(`${$i}Property`).toString())}}function Yi(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map(((t,n)=>el(t)+el(e[n]))))}function el(e){return"auto"===e?0:1e3*Number(e.slice(0,-1).replace(",","."))}function tl(){return document.body.offsetHeight}const nl=Symbol("_vod"),sl={beforeMount(e,{value:t},{transition:n}){e[nl]="none"===e.style.display?"":e.style.display,n&&t?n.beforeEnter(e):ol(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:s}){(!t!=!n||e.style.display!==e[nl]&&t)&&(s?t?(s.beforeEnter(e),ol(e,!0),s.enter(e)):s.leave(e,(()=>{ol(e,!1)})):ol(e,t))},beforeUnmount(e,{value:t}){ol(e,t)}};function ol(e,t){e.style.display=t?e[nl]:"none"}const rl=Symbol("");function il(e){const t=si();if(!t)return;const n=t.ut=(n=e(t.proxy))=>{Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach((e=>cl(e,n)))},s=()=>{const s=e(t.proxy);ll(t.subTree,s),n(s)};os(s),js((()=>{const e=new MutationObserver(s);e.observe(t.subTree.el.parentNode,{childList:!0}),Ks((()=>e.disconnect()))}))}function ll(e,t){if(128&e.shapeFlag){const n=e.suspense;e=n.activeBranch,n.pendingBranch&&!n.isHydrating&&n.effects.push((()=>{ll(n.activeBranch,t)}))}for(;e.component;)e=e.component.subTree;if(1&e.shapeFlag&&e.el)cl(e.el,t);else if(e.type===Cr)e.children.forEach((e=>ll(e,t)));else if(e.type===wr){let{el:n,anchor:s}=e;for(;n&&(cl(n,t),n!==s);)n=n.nextSibling}}function cl(e,t){if(1===e.nodeType){const n=e.style;let s="";for(const e in t)n.setProperty(`--${e}`,t[e]),s+=`--${e}: ${t[e]};`;n[rl]=s}}const al=/(^|;)\\s*display\\s*:/;const ul=/\\s*!important$/;function dl(e,t,n){if(d(n))n.forEach((n=>dl(e,t,n)));else if(null==n&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const s=function(e,t){const n=hl[t];if(n)return n;let s=A(t);if("filter"!==s&&s in e)return hl[t]=s;s=O(s);for(let o=0;o<pl.length;o++){const n=pl[o]+s;if(n in e)return hl[t]=n}return t}(e,t);ul.test(n)?e.setProperty(R(s),n.replace(ul,""),"important"):e[s]=n}}const pl=["Webkit","Moz","ms"],hl={};const fl="http://www.w3.org/1999/xlink";function ml(e,t,n,s){e.addEventListener(t,n,s)}const gl=Symbol("_vei");function yl(e,t,n,s,o=null){const r=e[gl]||(e[gl]={}),i=r[t];if(s&&i)i.value=s;else{const[n,l]=function(e){let t;if(vl.test(e)){let n;for(t={};n=e.match(vl);)e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0}const n=":"===e[2]?e.slice(3):R(e.slice(2));return[n,t]}(t);if(s){const i=r[t]=function(e,t){const n=e=>{if(e._vts){if(e._vts<=n.attached)return}else e._vts=Date.now();on(function(e,t){if(d(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map((e=>t=>!t._stopped&&e&&e(t)))}return t}(e,n.value),t,5,[e])};return n.value=e,n.attached=Sl(),n}(s,o);ml(e,n,i,l)}else i&&(!function(e,t,n,s){e.removeEventListener(t,n,s)}(e,n,i,l),r[t]=void 0)}}const vl=/(?:Once|Passive|Capture)$/;let bl=0;const _l=Promise.resolve(),Sl=()=>bl||(_l.then((()=>bl=0)),bl=Date.now());const xl=e=>111===e.charCodeAt(0)&&110===e.charCodeAt(1)&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123;\n/*! #__NO_SIDE_EFFECTS__ */\nfunction Cl(e,t){const n=ws(e);class s extends wl{constructor(e){super(n,e,t)}}return s.def=n,s}\n/*! #__NO_SIDE_EFFECTS__ */const kl=e=>Cl(e,cc),Tl="undefined"!=typeof HTMLElement?HTMLElement:class{};class wl extends Tl{constructor(e,t={},n){super(),this._def=e,this._props=t,this._instance=null,this._connected=!1,this._resolved=!1,this._numberProps=null,this._ob=null,this.shadowRoot&&n?n(this._createVNode(),this.shadowRoot):(this.attachShadow({mode:"open"}),this._def.__asyncLoader||this._resolveProps(this._def))}connectedCallback(){this._connected=!0,this._instance||(this._resolved?this._update():this._resolveDef())}disconnectedCallback(){this._connected=!1,this._ob&&(this._ob.disconnect(),this._ob=null),gn((()=>{this._connected||(lc(null,this.shadowRoot),this._instance=null)}))}_resolveDef(){this._resolved=!0;for(let n=0;n<this.attributes.length;n++)this._setAttr(this.attributes[n].name);this._ob=new MutationObserver((e=>{for(const t of e)this._setAttr(t.attributeName)})),this._ob.observe(this,{attributes:!0});const e=(e,t=!1)=>{const{props:n,styles:s}=e;let o;if(n&&!d(n))for(const r in n){const e=n[r];(e===Number||e&&e.type===Number)&&(r in this._props&&(this._props[r]=B(this._props[r])),(o||(o=Object.create(null)))[A(r)]=!0)}this._numberProps=o,t&&this._resolveProps(e),this._applyStyles(s),this._update()},t=this._def.__asyncLoader;t?t().then((t=>e(t,!0))):e(this._def)}_resolveProps(e){const{props:t}=e,n=d(t)?t:Object.keys(t||{});for(const s of Object.keys(this))"_"!==s[0]&&n.includes(s)&&this._setProp(s,this[s],!0,!1);for(const s of n.map(A))Object.defineProperty(this,s,{get(){return this._getProp(s)},set(e){this._setProp(s,e)}})}_setAttr(e){let t=this.getAttribute(e);const n=A(e);this._numberProps&&this._numberProps[n]&&(t=B(t)),this._setProp(n,t,!1)}_getProp(e){return this._props[e]}_setProp(e,t,n=!0,s=!0){t!==this._props[e]&&(this._props[e]=t,s&&this._instance&&this._update(),n&&(!0===t?this.setAttribute(R(e),""):"string"==typeof t||"number"==typeof t?this.setAttribute(R(e),t+""):t||this.removeAttribute(R(e))))}_update(){lc(this._createVNode(),this.shadowRoot)}_createVNode(){const e=Hr(this._def,l({},this._props));return this._instance||(e.ce=e=>{this._instance=e,e.isCE=!0;const t=(e,t)=>{this.dispatchEvent(new CustomEvent(e,{detail:t}))};e.emit=(e,...n)=>{t(e,n),R(e)!==e&&t(R(e),n)};let n=this;for(;n=n&&(n.parentNode||n.host);)if(n instanceof wl){e.parent=n._instance,e.provides=n._instance.provides;break}}),e}_applyStyles(e){e&&e.forEach((e=>{const t=document.createElement("style");t.textContent=e,this.shadowRoot.appendChild(t)}))}}function El(e="$style"){{const n=si();if(!n)return t;const s=n.type.__cssModules;if(!s)return t;const o=s[e];return o||t}}const Nl=new WeakMap,Al=new WeakMap,Il=Symbol("_moveCb"),Rl=Symbol("_enterCb"),Ol={name:"TransitionGroup",props:l({},ji,{tag:String,moveClass:String}),setup(e,{slots:t}){const n=si(),s=gs();let o,r;return qs((()=>{if(!o.length)return;const t=e.moveClass||`${e.name||"v"}-move`;if(!function(e,t,n){const s=e.cloneNode(),o=e[Vi];o&&o.forEach((e=>{e.split(/\\s+/).forEach((e=>e&&s.classList.remove(e)))}));n.split(/\\s+/).forEach((e=>e&&s.classList.add(e))),s.style.display="none";const r=1===t.nodeType?t:t.parentNode;r.appendChild(s);const{hasTransform:i}=Zi(s);return r.removeChild(s),i}(o[0].el,n.vnode.el,t))return;o.forEach(Fl),o.forEach(Ml);const s=o.filter(Pl);tl(),s.forEach((e=>{const n=e.el,s=n.style;zi(n,t),s.transform=s.webkitTransform=s.transitionDuration="";const o=n[Il]=e=>{e&&e.target!==n||e&&!/transform$/.test(e.propertyName)||(n.removeEventListener("transitionend",o),n[Il]=null,Gi(n,t))};n.addEventListener("transitionend",o)}))})),()=>{const i=At(e),l=Wi(i);let c=i.tag||Cr;o=r,r=t.default?Ts(t.default()):[];for(let e=0;e<r.length;e++){const t=r[e];null!=t.key&&ks(t,Ss(t,l,s,n))}if(o)for(let e=0;e<o.length;e++){const t=o[e];ks(t,Ss(t,l,s,n)),Nl.set(t,t.el.getBoundingClientRect())}return Hr(c,null,r)}}},Ll=Ol;function Fl(e){const t=e.el;t[Il]&&t[Il](),t[Rl]&&t[Rl]()}function Ml(e){Al.set(e,e.el.getBoundingClientRect())}function Pl(e){const t=Nl.get(e),n=Al.get(e),s=t.left-n.left,o=t.top-n.top;if(s||o){const t=e.el.style;return t.transform=t.webkitTransform=`translate(${s}px,${o}px)`,t.transitionDuration="0s",e}}const $l=e=>{const t=e.props["onUpdate:modelValue"]||!1;return d(t)?e=>M(t,e):t};function Bl(e){e.target.composing=!0}function Vl(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const Dl=Symbol("_assign"),Ul={created(e,{modifiers:{lazy:t,trim:n,number:s}},o){e[Dl]=$l(o);const r=s||o.props&&"number"===o.props.type;ml(e,t?"change":"input",(t=>{if(t.target.composing)return;let s=e.value;n&&(s=s.trim()),r&&(s=$(s)),e[Dl](s)})),n&&ml(e,"change",(()=>{e.value=e.value.trim()})),t||(ml(e,"compositionstart",Bl),ml(e,"compositionend",Vl),ml(e,"change",Vl))},mounted(e,{value:t}){e.value=null==t?"":t},beforeUpdate(e,{value:t,modifiers:{lazy:n,trim:s,number:o}},r){if(e[Dl]=$l(r),e.composing)return;const i=null==t?"":t;if((o||"number"===e.type?$(e.value):e.value)!==i){if(document.activeElement===e&&"range"!==e.type){if(n)return;if(s&&e.value.trim()===i)return}e.value=i}}},jl={deep:!0,created(e,t,n){e[Dl]=$l(n),ml(e,"change",(()=>{const t=e._modelValue,n=zl(e),s=e.checked,o=e[Dl];if(d(t)){const e=ne(t,n),r=-1!==e;if(s&&!r)o(t.concat(n));else if(!s&&r){const n=[...t];n.splice(e,1),o(n)}}else if(h(t)){const e=new Set(t);s?e.add(n):e.delete(n),o(e)}else o(Gl(e,s))}))},mounted:Hl,beforeUpdate(e,t,n){e[Dl]=$l(n),Hl(e,t,n)}};function Hl(e,{value:t,oldValue:n},s){e._modelValue=t,d(t)?e.checked=ne(t,s.props.value)>-1:h(t)?e.checked=t.has(s.props.value):t!==n&&(e.checked=te(t,Gl(e,!0)))}const ql={created(e,{value:t},n){e.checked=te(t,n.props.value),e[Dl]=$l(n),ml(e,"change",(()=>{e[Dl](zl(e))}))},beforeUpdate(e,{value:t,oldValue:n},s){e[Dl]=$l(s),t!==n&&(e.checked=te(t,s.props.value))}},Wl={deep:!0,created(e,{value:t,modifiers:{number:n}},s){const o=h(t);ml(e,"change",(()=>{const t=Array.prototype.filter.call(e.options,(e=>e.selected)).map((e=>n?$(zl(e)):zl(e)));e[Dl](e.multiple?o?new Set(t):t:t[0]),e._assigning=!0,gn((()=>{e._assigning=!1}))})),e[Dl]=$l(s)},mounted(e,{value:t,oldValue:n,modifiers:{number:s}}){Kl(e,t,n,s)},beforeUpdate(e,t,n){e[Dl]=$l(n)},updated(e,{value:t,oldValue:n,modifiers:{number:s}}){e._assigning||Kl(e,t,n,s)}};function Kl(e,t,n,s){const o=e.multiple,r=d(t);if(!o||r||h(t)){for(let n=0,i=e.options.length;n<i;n++){const i=e.options[n],l=zl(i);if(o)if(r){const e=typeof l;i.selected="string"===e||"number"===e?t.includes(s?$(l):l):ne(t,l)>-1}else i.selected=t.has(l);else if(te(zl(i),t))return void(e.selectedIndex!==n&&(e.selectedIndex=n))}o||-1===e.selectedIndex||(e.selectedIndex=-1)}}function zl(e){return"_value"in e?e._value:e.value}function Gl(e,t){const n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}const Jl={created(e,t,n){Xl(e,t,n,null,"created")},mounted(e,t,n){Xl(e,t,n,null,"mounted")},beforeUpdate(e,t,n,s){Xl(e,t,n,s,"beforeUpdate")},updated(e,t,n,s){Xl(e,t,n,s,"updated")}};function Xl(e,t,n,s,o){const r=function(e,t){switch(e){case"SELECT":return Wl;case"TEXTAREA":return Ul;default:switch(t){case"checkbox":return jl;case"radio":return ql;default:return Ul}}}(e.tagName,n.props&&n.props.type)[o];r&&r(e,t,n,s)}const Ql=["ctrl","shift","alt","meta"],Zl={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&0!==e.button,middle:e=>"button"in e&&1!==e.button,right:e=>"button"in e&&2!==e.button,exact:(e,t)=>Ql.some((n=>e[`${n}Key`]&&!t.includes(n)))},Yl=(e,t)=>{const n=e._withMods||(e._withMods={}),s=t.join(".");return n[s]||(n[s]=(n,...s)=>{for(let e=0;e<t.length;e++){const s=Zl[t[e]];if(s&&s(n,t))return}return e(n,...s)})},ec={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},tc=(e,t)=>{const n=e._withKeys||(e._withKeys={}),s=t.join(".");return n[s]||(n[s]=n=>{if(!("key"in n))return;const s=R(n.key);return t.some((e=>e===s||ec[e]===s))?e(n):void 0})},nc=l({patchProp:(e,t,n,s,o,l,c,a,u)=>{const d="svg"===o;"class"===t?function(e,t,n){const s=e[Vi];s&&(t=(t?[t,...s]:[...s]).join(" ")),null==t?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}(e,s,d):"style"===t?function(e,t,n){const s=e.style,o=g(n),r=s.display;let i=!1;if(n&&!o){if(t&&!g(t))for(const e in t)null==n[e]&&dl(s,e,"");for(const e in n)"display"===e&&(i=!0),dl(s,e,n[e])}else if(o){if(t!==n){const e=s[rl];e&&(n+=";"+e),s.cssText=n,i=al.test(n)}}else t&&e.removeAttribute("style");nl in e&&(e[nl]=i?s.display:"",s.display=r)}(e,n,s):r(t)?i(t)||yl(e,t,0,s,c):("."===t[0]?(t=t.slice(1),1):"^"===t[0]?(t=t.slice(1),0):function(e,t,n,s){if(s)return"innerHTML"===t||"textContent"===t||!!(t in e&&xl(t)&&m(n));if("spellcheck"===t||"draggable"===t||"translate"===t)return!1;if("form"===t)return!1;if("list"===t&&"INPUT"===e.tagName)return!1;if("type"===t&&"TEXTAREA"===e.tagName)return!1;if("width"===t||"height"===t){const t=e.tagName;if("IMG"===t||"VIDEO"===t||"CANVAS"===t||"SOURCE"===t)return!1}if(xl(t)&&g(n))return!1;return t in e}(e,t,s,d))?function(e,t,n,s,o,r,i){if("innerHTML"===t||"textContent"===t)return s&&i(s,o,r),void(e[t]=null==n?"":n);const l=e.tagName;if("value"===t&&"PROGRESS"!==l&&!l.includes("-")){e._value=n;const s=null==n?"":n;return("OPTION"===l?e.getAttribute("value"):e.value)!==s&&(e.value=s),void(null==n&&e.removeAttribute(t))}let c=!1;if(""===n||null==n){const s=typeof e[t];"boolean"===s?n=ee(n):null==n&&"string"===s?(n="",c=!0):"number"===s&&(n=0,c=!0)}try{e[t]=n}catch(a){}c&&e.removeAttribute(t)}(e,t,s,l,c,a,u):("true-value"===t?e._trueValue=s:"false-value"===t&&(e._falseValue=s),function(e,t,n,s,o){if(s&&t.startsWith("xlink:"))null==n?e.removeAttributeNS(fl,t.slice(6,t.length)):e.setAttributeNS(fl,t,n);else{const s=Y(t);null==n||s&&!ee(n)?e.removeAttribute(t):e.setAttribute(t,s?"":n)}}(e,t,s,d))}},Pi);let sc,oc=!1;function rc(){return sc||(sc=cr(nc))}function ic(){return sc=oc?sc:ar(nc),oc=!0,sc}const lc=(...e)=>{rc().render(...e)},cc=(...e)=>{ic().hydrate(...e)},ac=(...e)=>{const t=rc().createApp(...e),{mount:n}=t;return t.mount=e=>{const s=pc(e);if(!s)return;const o=t._component;m(o)||o.render||o.template||(o.template=s.innerHTML),s.innerHTML="";const r=n(s,!1,dc(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),r},t},uc=(...e)=>{const t=ic().createApp(...e),{mount:n}=t;return t.mount=e=>{const t=pc(e);if(t)return n(t,!0,dc(t))},t};function dc(e){return e instanceof SVGElement?"svg":"function"==typeof MathMLElement&&e instanceof MathMLElement?"mathml":void 0}function pc(e){if(g(e)){return document.querySelector(e)}return e}const hc=s;var fc=Object.freeze({__proto__:null,BaseTransition:bs,BaseTransitionPropsValidators:vs,Comment:Tr,DeprecationTypes:null,EffectScope:ce,ErrorCodes:nn,ErrorTypeStrings:null,Fragment:Cr,KeepAlive:Rs,ReactiveEffect:he,Static:wr,Suspense:Jn,Teleport:Sr,Text:kr,TrackOpTypes:Yt,Transition:Di,TransitionGroup:Ll,TriggerOpTypes:en,VueElement:wl,assertNumber:tn,callWithAsyncErrorHandling:on,callWithErrorHandling:sn,camelize:A,capitalize:O,cloneVNode:Wr,compatUtils:null,computed:bi,createApp:ac,createBlock:Mr,createCommentVNode:Gr,createElementBlock:Fr,createElementVNode:jr,createHydrationRenderer:ar,createPropsRestProxy:So,createRenderer:cr,createSSRApp:uc,createSlots:Zs,createStaticVNode:zr,createTextVNode:Kr,createVNode:Hr,customRef:zt,defineAsyncComponent:Ns,defineComponent:ws,defineCustomElement:Cl,defineEmits:co,defineExpose:ao,defineModel:ho,defineOptions:uo,defineProps:lo,defineSSRCustomElement:kl,defineSlots:po,devtools:Ni,effect:ve,effectScope:ae,getCurrentInstance:si,getCurrentScope:de,getTransitionRawChildren:Ts,guardReactiveProps:qr,h:Si,handleError:rn,hasInjectionContext:Uo,hydrate:cc,initCustomFormatter:xi,initDirectivesForSSR:hc,inject:Do,isMemoSame:ki,isProxy:Nt,isReactive:Tt,isReadonly:wt,isRef:Pt,isRuntimeOnly:fi,isShallow:Et,isVNode:Pr,markRaw:It,mergeDefaults:bo,mergeModels:_o,mergeProps:Zr,nextTick:gn,normalizeClass:z,normalizeProps:G,normalizeStyle:j,onActivated:Ls,onBeforeMount:Us,onBeforeUnmount:Ws,onBeforeUpdate:Hs,onDeactivated:Fs,onErrorCaptured:Xs,onMounted:js,onRenderTracked:Js,onRenderTriggered:Gs,onScopeDispose:pe,onServerPrefetch:zs,onUnmounted:Ks,onUpdated:qs,openBlock:Ar,popScopeId:On,provide:Vo,proxyRefs:Wt,pushScopeId:Rn,queuePostFlushCb:bn,reactive:_t,readonly:xt,ref:$t,registerRuntimeCompiler:hi,render:lc,renderList:Qs,renderSlot:Ys,resolveComponent:Un,resolveDirective:qn,resolveDynamicComponent:Hn,resolveFilter:null,resolveTransitionHooks:Ss,setBlockTracking:Or,setDevtoolsHook:Ai,setTransitionHooks:ks,shallowReactive:St,shallowReadonly:Ct,shallowRef:Bt,ssrContextKey:ts,ssrUtils:null,stop:be,toDisplayString:se,toHandlerKey:L,toHandlers:to,toRaw:At,toRef:Qt,toRefs:Gt,toValue:Ht,transformVNodeArgs:Br,triggerRef:Ut,unref:jt,useAttrs:go,useCssModule:El,useCssVars:il,useModel:_i,useSSRContext:ns,useSlots:mo,useTransitionState:gs,vModelCheckbox:jl,vModelDynamic:Jl,vModelRadio:ql,vModelSelect:Wl,vModelText:Ul,vShow:sl,version:Ti,warn:wi,watch:ls,watchEffect:ss,watchPostEffect:os,watchSyncEffect:rs,withAsyncContext:xo,withCtx:Fn,withDefaults:fo,withDirectives:ps,withKeys:tc,withMemo:Ci,withModifiers:Yl,withScopeId:Ln});const mc=Symbol(""),gc=Symbol(""),yc=Symbol(""),vc=Symbol(""),bc=Symbol(""),_c=Symbol(""),Sc=Symbol(""),xc=Symbol(""),Cc=Symbol(""),kc=Symbol(""),Tc=Symbol(""),wc=Symbol(""),Ec=Symbol(""),Nc=Symbol(""),Ac=Symbol(""),Ic=Symbol(""),Rc=Symbol(""),Oc=Symbol(""),Lc=Symbol(""),Fc=Symbol(""),Mc=Symbol(""),Pc=Symbol(""),$c=Symbol(""),Bc=Symbol(""),Vc=Symbol(""),Dc=Symbol(""),Uc=Symbol(""),jc=Symbol(""),Hc=Symbol(""),qc=Symbol(""),Wc=Symbol(""),Kc=Symbol(""),zc=Symbol(""),Gc=Symbol(""),Jc=Symbol(""),Xc=Symbol(""),Qc=Symbol(""),Zc=Symbol(""),Yc=Symbol(""),ea={[mc]:"Fragment",[gc]:"Teleport",[yc]:"Suspense",[vc]:"KeepAlive",[bc]:"BaseTransition",[_c]:"openBlock",[Sc]:"createBlock",[xc]:"createElementBlock",[Cc]:"createVNode",[kc]:"createElementVNode",[Tc]:"createCommentVNode",[wc]:"createTextVNode",[Ec]:"createStaticVNode",[Nc]:"resolveComponent",[Ac]:"resolveDynamicComponent",[Ic]:"resolveDirective",[Rc]:"resolveFilter",[Oc]:"withDirectives",[Lc]:"renderList",[Fc]:"renderSlot",[Mc]:"createSlots",[Pc]:"toDisplayString",[$c]:"mergeProps",[Bc]:"normalizeClass",[Vc]:"normalizeStyle",[Dc]:"normalizeProps",[Uc]:"guardReactiveProps",[jc]:"toHandlers",[Hc]:"camelize",[qc]:"capitalize",[Wc]:"toHandlerKey",[Kc]:"setBlockTracking",[zc]:"pushScopeId",[Gc]:"popScopeId",[Jc]:"withCtx",[Xc]:"unref",[Qc]:"isRef",[Zc]:"withMemo",[Yc]:"isMemoSame"};const ta={start:{line:1,column:1,offset:0},end:{line:1,column:1,offset:0},source:""};function na(e,t,n,s,o,r,i,l=!1,c=!1,a=!1,u=ta){return e&&(l?(e.helper(_c),e.helper(pa(e.inSSR,a))):e.helper(da(e.inSSR,a)),i&&e.helper(Oc)),{type:13,tag:t,props:n,children:s,patchFlag:o,dynamicProps:r,directives:i,isBlock:l,disableTracking:c,isComponent:a,loc:u}}function sa(e,t=ta){return{type:17,loc:t,elements:e}}function oa(e,t=ta){return{type:15,loc:t,properties:e}}function ra(e,t){return{type:16,loc:ta,key:g(e)?ia(e,!0):e,value:t}}function ia(e,t=!1,n=ta,s=0){return{type:4,loc:n,content:e,isStatic:t,constType:t?3:s}}function la(e,t=ta){return{type:8,loc:t,children:e}}function ca(e,t=[],n=ta){return{type:14,loc:n,callee:e,arguments:t}}function aa(e,t=void 0,n=!1,s=!1,o=ta){return{type:18,params:e,returns:t,newline:n,isSlot:s,loc:o}}function ua(e,t,n,s=!0){return{type:19,test:e,consequent:t,alternate:n,newline:s,loc:ta}}function da(e,t){return e||t?Cc:kc}function pa(e,t){return e||t?Sc:xc}function ha(e,{helper:t,removeHelper:n,inSSR:s}){e.isBlock||(e.isBlock=!0,n(da(s,e.isComponent)),t(_c),t(pa(s,e.isComponent)))}const fa=new Uint8Array([123,123]),ma=new Uint8Array([125,125]);function ga(e){return e>=97&&e<=122||e>=65&&e<=90}function ya(e){return 32===e||10===e||9===e||12===e||13===e}function va(e){return 47===e||62===e||ya(e)}function ba(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}const _a={Cdata:new Uint8Array([67,68,65,84,65,91]),CdataEnd:new Uint8Array([93,93,62]),CommentEnd:new Uint8Array([45,45,62]),ScriptEnd:new Uint8Array([60,47,115,99,114,105,112,116]),StyleEnd:new Uint8Array([60,47,115,116,121,108,101]),TitleEnd:new Uint8Array([60,47,116,105,116,108,101]),TextareaEnd:new Uint8Array([60,47,116,101,120,116,97,114,101,97])};function Sa(e){throw e}function xa(e){}function Ca(e,t,n,s){const o=new SyntaxError(String(`https://vuejs.org/error-reference/#compiler-${e}`));return o.code=e,o.loc=t,o}const ka=e=>4===e.type&&e.isStatic;function Ta(e){switch(e){case"Teleport":case"teleport":return gc;case"Suspense":case"suspense":return yc;case"KeepAlive":case"keep-alive":return vc;case"BaseTransition":case"base-transition":return bc}}const wa=/^\\d|[^\\$\\w]/,Ea=e=>!wa.test(e),Na=/[A-Za-z_$\\xA0-\\uFFFF]/,Aa=/[\\.\\?\\w$\\xA0-\\uFFFF]/,Ia=/\\s+[.[]\\s*|\\s*[.[]\\s+/g,Ra=e=>{e=e.trim().replace(Ia,(e=>e.trim()));let t=0,n=[],s=0,o=0,r=null;for(let i=0;i<e.length;i++){const l=e.charAt(i);switch(t){case 0:if("["===l)n.push(t),t=1,s++;else if("("===l)n.push(t),t=2,o++;else if(!(0===i?Na:Aa).test(l))return!1;break;case 1:"\'"===l||\'"\'===l||"`"===l?(n.push(t),t=3,r=l):"["===l?s++:"]"===l&&(--s||(t=n.pop()));break;case 2:if("\'"===l||\'"\'===l||"`"===l)n.push(t),t=3,r=l;else if("("===l)o++;else if(")"===l){if(i===e.length-1)return!1;--o||(t=n.pop())}break;case 3:l===r&&(t=n.pop(),r=null)}}return!s&&!o};function Oa(e,t,n=!1){for(let s=0;s<e.props.length;s++){const o=e.props[s];if(7===o.type&&(n||o.exp)&&(g(t)?o.name===t:t.test(o.name)))return o}}function La(e,t,n=!1,s=!1){for(let o=0;o<e.props.length;o++){const r=e.props[o];if(6===r.type){if(n)continue;if(r.name===t&&(r.value||s))return r}else if("bind"===r.name&&(r.exp||s)&&Fa(r.arg,t))return r}}function Fa(e,t){return!(!e||!ka(e)||e.content!==t)}function Ma(e){return 5===e.type||2===e.type}function Pa(e){return 7===e.type&&"slot"===e.name}function $a(e){return 1===e.type&&3===e.tagType}function Ba(e){return 1===e.type&&2===e.tagType}const Va=new Set([Dc,Uc]);function Da(e,t=[]){if(e&&!g(e)&&14===e.type){const n=e.callee;if(!g(n)&&Va.has(n))return Da(e.arguments[0],t.concat(e))}return[e,t]}function Ua(e,t,n){let s,o,r=13===e.type?e.props:e.arguments[2],i=[];if(r&&!g(r)&&14===r.type){const e=Da(r);r=e[0],i=e[1],o=i[i.length-1]}if(null==r||g(r))s=oa([t]);else if(14===r.type){const e=r.arguments[0];g(e)||15!==e.type?r.callee===jc?s=ca(n.helper($c),[oa([t]),r]):r.arguments.unshift(oa([t])):ja(t,e)||e.properties.unshift(t),!s&&(s=r)}else 15===r.type?(ja(t,r)||r.properties.unshift(t),s=r):(s=ca(n.helper($c),[oa([t]),r]),o&&o.callee===Uc&&(o=i[i.length-2]));13===e.type?o?o.arguments[0]=s:e.props=s:o?o.arguments[0]=s:e.arguments[2]=s}function ja(e,t){let n=!1;if(4===e.key.type){const s=e.key.content;n=t.properties.some((e=>4===e.key.type&&e.key.content===s))}return n}function Ha(e,t){return`_${t}_${e.replace(/[^\\w]/g,((t,n)=>"-"===t?"_":e.charCodeAt(n).toString()))}`}const qa=/([\\s\\S]*?)\\s+(?:in|of)\\s+([\\s\\S]*)/,Wa={parseMode:"base",ns:0,delimiters:["{{","}}"],getNamespace:()=>0,isVoidTag:o,isPreTag:o,isCustomElement:o,onError:Sa,onWarn:xa,comments:!1,prefixIdentifiers:!1};let Ka=Wa,za=null,Ga="",Ja=null,Xa=null,Qa="",Za=-1,Ya=-1,eu=0,tu=!1,nu=null;const su=[],ou=new class{constructor(e,t){this.stack=e,this.cbs=t,this.state=1,this.buffer="",this.sectionStart=0,this.index=0,this.entityStart=0,this.baseState=1,this.inRCDATA=!1,this.inXML=!1,this.inVPre=!1,this.newlines=[],this.mode=0,this.delimiterOpen=fa,this.delimiterClose=ma,this.delimiterIndex=-1,this.currentSequence=void 0,this.sequenceIndex=0}get inSFCRoot(){return 2===this.mode&&0===this.stack.length}reset(){this.state=1,this.mode=0,this.buffer="",this.sectionStart=0,this.index=0,this.baseState=1,this.inRCDATA=!1,this.currentSequence=void 0,this.newlines.length=0,this.delimiterOpen=fa,this.delimiterClose=ma}getPos(e){let t=1,n=e+1;for(let s=this.newlines.length-1;s>=0;s--){const o=this.newlines[s];if(e>o){t=s+2,n=e-o;break}}return{column:n,line:t,offset:e}}peek(){return this.buffer.charCodeAt(this.index+1)}stateText(e){60===e?(this.index>this.sectionStart&&this.cbs.ontext(this.sectionStart,this.index),this.state=5,this.sectionStart=this.index):this.inVPre||e!==this.delimiterOpen[0]||(this.state=2,this.delimiterIndex=0,this.stateInterpolationOpen(e))}stateInterpolationOpen(e){if(e===this.delimiterOpen[this.delimiterIndex])if(this.delimiterIndex===this.delimiterOpen.length-1){const e=this.index+1-this.delimiterOpen.length;e>this.sectionStart&&this.cbs.ontext(this.sectionStart,e),this.state=3,this.sectionStart=e}else this.delimiterIndex++;else this.inRCDATA?(this.state=32,this.stateInRCDATA(e)):(this.state=1,this.stateText(e))}stateInterpolation(e){e===this.delimiterClose[0]&&(this.state=4,this.delimiterIndex=0,this.stateInterpolationClose(e))}stateInterpolationClose(e){e===this.delimiterClose[this.delimiterIndex]?this.delimiterIndex===this.delimiterClose.length-1?(this.cbs.oninterpolation(this.sectionStart,this.index+1),this.state=this.inRCDATA?32:1,this.sectionStart=this.index+1):this.delimiterIndex++:(this.state=3,this.stateInterpolation(e))}stateSpecialStartSequence(e){const t=this.sequenceIndex===this.currentSequence.length;if(t?va(e):(32|e)===this.currentSequence[this.sequenceIndex]){if(!t)return void this.sequenceIndex++}else this.inRCDATA=!1;this.sequenceIndex=0,this.state=6,this.stateInTagName(e)}stateInRCDATA(e){if(this.sequenceIndex===this.currentSequence.length){if(62===e||ya(e)){const t=this.index-this.currentSequence.length;if(this.sectionStart<t){const e=this.index;this.index=t,this.cbs.ontext(this.sectionStart,t),this.index=e}return this.sectionStart=t+2,this.stateInClosingTagName(e),void(this.inRCDATA=!1)}this.sequenceIndex=0}(32|e)===this.currentSequence[this.sequenceIndex]?this.sequenceIndex+=1:0===this.sequenceIndex?this.currentSequence===_a.TitleEnd||this.currentSequence===_a.TextareaEnd&&!this.inSFCRoot?e===this.delimiterOpen[0]&&(this.state=2,this.delimiterIndex=0,this.stateInterpolationOpen(e)):this.fastForwardTo(60)&&(this.sequenceIndex=1):this.sequenceIndex=Number(60===e)}stateCDATASequence(e){e===_a.Cdata[this.sequenceIndex]?++this.sequenceIndex===_a.Cdata.length&&(this.state=28,this.currentSequence=_a.CdataEnd,this.sequenceIndex=0,this.sectionStart=this.index+1):(this.sequenceIndex=0,this.state=23,this.stateInDeclaration(e))}fastForwardTo(e){for(;++this.index<this.buffer.length;){const t=this.buffer.charCodeAt(this.index);if(10===t&&this.newlines.push(this.index),t===e)return!0}return this.index=this.buffer.length-1,!1}stateInCommentLike(e){e===this.currentSequence[this.sequenceIndex]?++this.sequenceIndex===this.currentSequence.length&&(this.currentSequence===_a.CdataEnd?this.cbs.oncdata(this.sectionStart,this.index-2):this.cbs.oncomment(this.sectionStart,this.index-2),this.sequenceIndex=0,this.sectionStart=this.index+1,this.state=1):0===this.sequenceIndex?this.fastForwardTo(this.currentSequence[0])&&(this.sequenceIndex=1):e!==this.currentSequence[this.sequenceIndex-1]&&(this.sequenceIndex=0)}startSpecial(e,t){this.enterRCDATA(e,t),this.state=31}enterRCDATA(e,t){this.inRCDATA=!0,this.currentSequence=e,this.sequenceIndex=t}stateBeforeTagName(e){if(33===e)this.state=22,this.sectionStart=this.index+1;else if(63===e)this.state=24,this.sectionStart=this.index+1;else if(ga(e))if(this.sectionStart=this.index,0===this.mode)this.state=6;else if(this.inSFCRoot)this.state=34;else if(this.inXML)this.state=6;else{const t=32|e;this.state=116===t?30:115===t?29:6}else 47===e?this.state=8:(this.state=1,this.stateText(e))}stateInTagName(e){va(e)&&this.handleTagName(e)}stateInSFCRootTagName(e){if(va(e)){const t=this.buffer.slice(this.sectionStart,this.index);"template"!==t&&this.enterRCDATA(ba("</"+t),0),this.handleTagName(e)}}handleTagName(e){this.cbs.onopentagname(this.sectionStart,this.index),this.sectionStart=-1,this.state=11,this.stateBeforeAttrName(e)}stateBeforeClosingTagName(e){ya(e)||(62===e?(this.state=1,this.sectionStart=this.index+1):(this.state=ga(e)?9:27,this.sectionStart=this.index))}stateInClosingTagName(e){(62===e||ya(e))&&(this.cbs.onclosetag(this.sectionStart,this.index),this.sectionStart=-1,this.state=10,this.stateAfterClosingTagName(e))}stateAfterClosingTagName(e){62===e&&(this.state=1,this.sectionStart=this.index+1)}stateBeforeAttrName(e){62===e?(this.cbs.onopentagend(this.index),this.state=this.inRCDATA?32:1,this.sectionStart=this.index+1):47===e?this.state=7:60===e&&47===this.peek()?(this.cbs.onopentagend(this.index),this.state=5,this.sectionStart=this.index):ya(e)||this.handleAttrStart(e)}handleAttrStart(e){118===e&&45===this.peek()?(this.state=13,this.sectionStart=this.index):46===e||58===e||64===e||35===e?(this.cbs.ondirname(this.index,this.index+1),this.state=14,this.sectionStart=this.index+1):(this.state=12,this.sectionStart=this.index)}stateInSelfClosingTag(e){62===e?(this.cbs.onselfclosingtag(this.index),this.state=1,this.sectionStart=this.index+1,this.inRCDATA=!1):ya(e)||(this.state=11,this.stateBeforeAttrName(e))}stateInAttrName(e){(61===e||va(e))&&(this.cbs.onattribname(this.sectionStart,this.index),this.handleAttrNameEnd(e))}stateInDirName(e){61===e||va(e)?(this.cbs.ondirname(this.sectionStart,this.index),this.handleAttrNameEnd(e)):58===e?(this.cbs.ondirname(this.sectionStart,this.index),this.state=14,this.sectionStart=this.index+1):46===e&&(this.cbs.ondirname(this.sectionStart,this.index),this.state=16,this.sectionStart=this.index+1)}stateInDirArg(e){61===e||va(e)?(this.cbs.ondirarg(this.sectionStart,this.index),this.handleAttrNameEnd(e)):91===e?this.state=15:46===e&&(this.cbs.ondirarg(this.sectionStart,this.index),this.state=16,this.sectionStart=this.index+1)}stateInDynamicDirArg(e){93===e?this.state=14:(61===e||va(e))&&(this.cbs.ondirarg(this.sectionStart,this.index+1),this.handleAttrNameEnd(e))}stateInDirModifier(e){61===e||va(e)?(this.cbs.ondirmodifier(this.sectionStart,this.index),this.handleAttrNameEnd(e)):46===e&&(this.cbs.ondirmodifier(this.sectionStart,this.index),this.sectionStart=this.index+1)}handleAttrNameEnd(e){this.sectionStart=this.index,this.state=17,this.cbs.onattribnameend(this.index),this.stateAfterAttrName(e)}stateAfterAttrName(e){61===e?this.state=18:47===e||62===e?(this.cbs.onattribend(0,this.sectionStart),this.sectionStart=-1,this.state=11,this.stateBeforeAttrName(e)):ya(e)||(this.cbs.onattribend(0,this.sectionStart),this.handleAttrStart(e))}stateBeforeAttrValue(e){34===e?(this.state=19,this.sectionStart=this.index+1):39===e?(this.state=20,this.sectionStart=this.index+1):ya(e)||(this.sectionStart=this.index,this.state=21,this.stateInAttrValueNoQuotes(e))}handleInAttrValue(e,t){(e===t||this.fastForwardTo(t))&&(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(34===t?3:2,this.index+1),this.state=11)}stateInAttrValueDoubleQuotes(e){this.handleInAttrValue(e,34)}stateInAttrValueSingleQuotes(e){this.handleInAttrValue(e,39)}stateInAttrValueNoQuotes(e){ya(e)||62===e?(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(1,this.index),this.state=11,this.stateBeforeAttrName(e)):39!==e&&60!==e&&61!==e&&96!==e||this.cbs.onerr(18,this.index)}stateBeforeDeclaration(e){91===e?(this.state=26,this.sequenceIndex=0):this.state=45===e?25:23}stateInDeclaration(e){(62===e||this.fastForwardTo(62))&&(this.state=1,this.sectionStart=this.index+1)}stateInProcessingInstruction(e){(62===e||this.fastForwardTo(62))&&(this.cbs.onprocessinginstruction(this.sectionStart,this.index),this.state=1,this.sectionStart=this.index+1)}stateBeforeComment(e){45===e?(this.state=28,this.currentSequence=_a.CommentEnd,this.sequenceIndex=2,this.sectionStart=this.index+1):this.state=23}stateInSpecialComment(e){(62===e||this.fastForwardTo(62))&&(this.cbs.oncomment(this.sectionStart,this.index),this.state=1,this.sectionStart=this.index+1)}stateBeforeSpecialS(e){const t=32|e;t===_a.ScriptEnd[3]?this.startSpecial(_a.ScriptEnd,4):t===_a.StyleEnd[3]?this.startSpecial(_a.StyleEnd,4):(this.state=6,this.stateInTagName(e))}stateBeforeSpecialT(e){const t=32|e;t===_a.TitleEnd[3]?this.startSpecial(_a.TitleEnd,4):t===_a.TextareaEnd[3]?this.startSpecial(_a.TextareaEnd,4):(this.state=6,this.stateInTagName(e))}startEntity(){}stateInEntity(){}parse(e){for(this.buffer=e;this.index<this.buffer.length;){const e=this.buffer.charCodeAt(this.index);switch(10===e&&this.newlines.push(this.index),this.state){case 1:this.stateText(e);break;case 2:this.stateInterpolationOpen(e);break;case 3:this.stateInterpolation(e);break;case 4:this.stateInterpolationClose(e);break;case 31:this.stateSpecialStartSequence(e);break;case 32:this.stateInRCDATA(e);break;case 26:this.stateCDATASequence(e);break;case 19:this.stateInAttrValueDoubleQuotes(e);break;case 12:this.stateInAttrName(e);break;case 13:this.stateInDirName(e);break;case 14:this.stateInDirArg(e);break;case 15:this.stateInDynamicDirArg(e);break;case 16:this.stateInDirModifier(e);break;case 28:this.stateInCommentLike(e);break;case 27:this.stateInSpecialComment(e);break;case 11:this.stateBeforeAttrName(e);break;case 6:this.stateInTagName(e);break;case 34:this.stateInSFCRootTagName(e);break;case 9:this.stateInClosingTagName(e);break;case 5:this.stateBeforeTagName(e);break;case 17:this.stateAfterAttrName(e);break;case 20:this.stateInAttrValueSingleQuotes(e);break;case 18:this.stateBeforeAttrValue(e);break;case 8:this.stateBeforeClosingTagName(e);break;case 10:this.stateAfterClosingTagName(e);break;case 29:this.stateBeforeSpecialS(e);break;case 30:this.stateBeforeSpecialT(e);break;case 21:this.stateInAttrValueNoQuotes(e);break;case 7:this.stateInSelfClosingTag(e);break;case 23:this.stateInDeclaration(e);break;case 22:this.stateBeforeDeclaration(e);break;case 25:this.stateBeforeComment(e);break;case 24:this.stateInProcessingInstruction(e);break;case 33:this.stateInEntity()}this.index++}this.cleanup(),this.finish()}cleanup(){this.sectionStart!==this.index&&(1===this.state||32===this.state&&0===this.sequenceIndex?(this.cbs.ontext(this.sectionStart,this.index),this.sectionStart=this.index):19!==this.state&&20!==this.state&&21!==this.state||(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=this.index))}finish(){this.handleTrailingData(),this.cbs.onend()}handleTrailingData(){const e=this.buffer.length;this.sectionStart>=e||(28===this.state?this.currentSequence===_a.CdataEnd?this.cbs.oncdata(this.sectionStart,e):this.cbs.oncomment(this.sectionStart,e):6===this.state||11===this.state||18===this.state||17===this.state||12===this.state||13===this.state||14===this.state||15===this.state||16===this.state||20===this.state||19===this.state||21===this.state||9===this.state||this.cbs.ontext(this.sectionStart,e))}emitCodePoint(e,t){}}(su,{onerr:Cu,ontext(e,t){au(lu(e,t),e,t)},ontextentity(e,t,n){au(e,t,n)},oninterpolation(e,t){if(tu)return au(lu(e,t),e,t);let n=e+ou.delimiterOpen.length,s=t-ou.delimiterClose.length;for(;ya(Ga.charCodeAt(n));)n++;for(;ya(Ga.charCodeAt(s-1));)s--;let o=lu(n,s);o.includes("&")&&(o=Ka.decodeEntities(o,!1)),vu({type:5,content:xu(o,!1,bu(n,s)),loc:bu(e,t)})},onopentagname(e,t){const n=lu(e,t);Ja={type:1,tag:n,ns:Ka.getNamespace(n,su[0],Ka.ns),tagType:0,props:[],children:[],loc:bu(e-1,t),codegenNode:void 0}},onopentagend(e){cu(e)},onclosetag(e,t){const n=lu(e,t);if(!Ka.isVoidTag(n)){let s=!1;for(let e=0;e<su.length;e++){if(su[e].tag.toLowerCase()===n.toLowerCase()){s=!0;for(let n=0;n<=e;n++){uu(su.shift(),t,n<e)}break}}s||du(e,60)}},onselfclosingtag(e){var t;const n=Ja.tag;Ja.isSelfClosing=!0,cu(e),(null==(t=su[0])?void 0:t.tag)===n&&uu(su.shift(),e)},onattribname(e,t){Xa={type:6,name:lu(e,t),nameLoc:bu(e,t),value:void 0,loc:bu(e)}},ondirname(e,t){const n=lu(e,t),s="."===n||":"===n?"bind":"@"===n?"on":"#"===n?"slot":n.slice(2);if(tu||""===s)Xa={type:6,name:n,nameLoc:bu(e,t),value:void 0,loc:bu(e)};else if(Xa={type:7,name:s,rawName:n,exp:void 0,arg:void 0,modifiers:"."===n?["prop"]:[],loc:bu(e)},"pre"===s){tu=ou.inVPre=!0,nu=Ja;const e=Ja.props;for(let t=0;t<e.length;t++)7===e[t].type&&(e[t]=Su(e[t]))}},ondirarg(e,t){if(e===t)return;const n=lu(e,t);if(tu)Xa.name+=n,_u(Xa.nameLoc,t);else{const s="["!==n[0];Xa.arg=xu(s?n:n.slice(1,-1),s,bu(e,t),s?3:0)}},ondirmodifier(e,t){const n=lu(e,t);if(tu)Xa.name+="."+n,_u(Xa.nameLoc,t);else if("slot"===Xa.name){const e=Xa.arg;e&&(e.content+="."+n,_u(e.loc,t))}else Xa.modifiers.push(n)},onattribdata(e,t){Qa+=lu(e,t),Za<0&&(Za=e),Ya=t},onattribentity(e,t,n){Qa+=e,Za<0&&(Za=t),Ya=n},onattribnameend(e){const t=lu(Xa.loc.start.offset,e);7===Xa.type&&(Xa.rawName=t),Ja.props.some((e=>(7===e.type?e.rawName:e.name)===t))},onattribend(e,t){if(Ja&&Xa){if(_u(Xa.loc,t),0!==e)if(Qa.includes("&")&&(Qa=Ka.decodeEntities(Qa,!0)),6===Xa.type)"class"===Xa.name&&(Qa=yu(Qa).trim()),Xa.value={type:2,content:Qa,loc:1===e?bu(Za,Ya):bu(Za-1,Ya+1)},ou.inSFCRoot&&"template"===Ja.tag&&"lang"===Xa.name&&Qa&&"html"!==Qa&&ou.enterRCDATA(ba("</template"),0);else{let e=0;Xa.exp=xu(Qa,!1,bu(Za,Ya),0,e),"for"===Xa.name&&(Xa.forParseResult=function(e){const t=e.loc,n=e.content,s=n.match(qa);if(!s)return;const[,o,r]=s,i=(e,n,s=!1)=>{const o=t.start.offset+n;return xu(e,!1,bu(o,o+e.length),0,s?1:0)},l={source:i(r.trim(),n.indexOf(r,o.length)),value:void 0,key:void 0,index:void 0,finalized:!1};let c=o.trim().replace(iu,"").trim();const a=o.indexOf(c),u=c.match(ru);if(u){c=c.replace(ru,"").trim();const e=u[1].trim();let t;if(e&&(t=n.indexOf(e,a+c.length),l.key=i(e,t,!0)),u[2]){const s=u[2].trim();s&&(l.index=i(s,n.indexOf(s,l.key?t+e.length:a+c.length),!0))}}c&&(l.value=i(c,a,!0));return l}(Xa.exp))}7===Xa.type&&"pre"===Xa.name||Ja.props.push(Xa)}Qa="",Za=Ya=-1},oncomment(e,t){Ka.comments&&vu({type:3,content:lu(e,t),loc:bu(e-4,t+3)})},onend(){const e=Ga.length;for(let t=0;t<su.length;t++)uu(su[t],e-1)},oncdata(e,t){0!==su[0].ns&&au(lu(e,t),e,t)},onprocessinginstruction(e){0===(su[0]?su[0].ns:Ka.ns)&&Cu(21,e-1)}}),ru=/,([^,\\}\\]]*)(?:,([^,\\}\\]]*))?$/,iu=/^\\(|\\)$/g;function lu(e,t){return Ga.slice(e,t)}function cu(e){ou.inSFCRoot&&(Ja.innerLoc=bu(e+1,e+1)),vu(Ja);const{tag:t,ns:n}=Ja;0===n&&Ka.isPreTag(t)&&eu++,Ka.isVoidTag(t)?uu(Ja,e):(su.unshift(Ja),1!==n&&2!==n||(ou.inXML=!0)),Ja=null}function au(e,t,n){var s;{const t=null==(s=su[0])?void 0:s.tag;"script"!==t&&"style"!==t&&e.includes("&")&&(e=Ka.decodeEntities(e,!1))}const o=su[0]||za,r=o.children[o.children.length-1];2===(null==r?void 0:r.type)?(r.content+=e,_u(r.loc,n)):o.children.push({type:2,content:e,loc:bu(t,n)})}function uu(e,t,n=!1){_u(e.loc,n?du(t,60):t+1),ou.inSFCRoot&&(e.innerLoc.end=l({},e.children.length?e.children[e.children.length-1].loc.end:e.innerLoc.start),e.innerLoc.source=lu(e.innerLoc.start.offset,e.innerLoc.end.offset));const{tag:s,ns:o}=e;tu||("slot"===s?e.tagType=2:!function({tag:e,props:t}){if("template"===e)for(let n=0;n<t.length;n++)if(7===t[n].type&&pu.has(t[n].name))return!0;return!1}(e)?function({tag:e,props:t}){var n;if(Ka.isCustomElement(e))return!1;if("component"===e||(s=e.charCodeAt(0),s>64&&s<91)||Ta(e)||(null==(n=Ka.isBuiltInComponent)?void 0:n.call(Ka,e))||Ka.isNativeTag&&!Ka.isNativeTag(e))return!0;var s;for(let o=0;o<t.length;o++){const e=t[o];if(6===e.type&&"is"===e.name&&e.value&&e.value.content.startsWith("vue:"))return!0}return!1}(e)&&(e.tagType=1):e.tagType=3),ou.inRCDATA||(e.children=fu(e.children,e.tag)),0===o&&Ka.isPreTag(s)&&eu--,nu===e&&(tu=ou.inVPre=!1,nu=null),ou.inXML&&0===(su[0]?su[0].ns:Ka.ns)&&(ou.inXML=!1)}function du(e,t){let n=e;for(;Ga.charCodeAt(n)!==t&&n>=0;)n--;return n}const pu=new Set(["if","else","else-if","for","slot"]);const hu=/\\r\\n/g;function fu(e,t){var n,s;const o="preserve"!==Ka.whitespace;let r=!1;for(let i=0;i<e.length;i++){const t=e[i];if(2===t.type)if(eu)t.content=t.content.replace(hu,"\\n");else if(mu(t.content)){const l=null==(n=e[i-1])?void 0:n.type,c=null==(s=e[i+1])?void 0:s.type;!l||!c||o&&(3===l&&(3===c||1===c)||1===l&&(3===c||1===c&&gu(t.content)))?(r=!0,e[i]=null):t.content=" "}else o&&(t.content=yu(t.content))}if(eu&&t&&Ka.isPreTag(t)){const t=e[0];t&&2===t.type&&(t.content=t.content.replace(/^\\r?\\n/,""))}return r?e.filter(Boolean):e}function mu(e){for(let t=0;t<e.length;t++)if(!ya(e.charCodeAt(t)))return!1;return!0}function gu(e){for(let t=0;t<e.length;t++){const n=e.charCodeAt(t);if(10===n||13===n)return!0}return!1}function yu(e){let t="",n=!1;for(let s=0;s<e.length;s++)ya(e.charCodeAt(s))?n||(t+=" ",n=!0):(t+=e[s],n=!1);return t}function vu(e){(su[0]||za).children.push(e)}function bu(e,t){return{start:ou.getPos(e),end:null==t?t:ou.getPos(t),source:null==t?t:lu(e,t)}}function _u(e,t){e.end=ou.getPos(t),e.source=lu(e.start.offset,t)}function Su(e){const t={type:6,name:e.rawName,nameLoc:bu(e.loc.start.offset,e.loc.start.offset+e.rawName.length),value:void 0,loc:e.loc};if(e.exp){const n=e.exp.loc;n.end.offset<e.loc.end.offset&&(n.start.offset--,n.start.column--,n.end.offset++,n.end.column++),t.value={type:2,content:e.exp.content,loc:n}}return t}function xu(e,t=!1,n,s=0,o=0){return ia(e,t,n,s)}function Cu(e,t,n){Ka.onError(Ca(e,bu(t,t)))}function ku(e,t){if(ou.reset(),Ja=null,Xa=null,Qa="",Za=-1,Ya=-1,su.length=0,Ga=e,Ka=l({},Wa),t){let e;for(e in t)null!=t[e]&&(Ka[e]=t[e])}ou.mode="html"===Ka.parseMode?1:"sfc"===Ka.parseMode?2:0,ou.inXML=1===Ka.ns||2===Ka.ns;const n=null==t?void 0:t.delimiters;n&&(ou.delimiterOpen=ba(n[0]),ou.delimiterClose=ba(n[1]));const s=za=function(e,t=""){return{type:0,source:t,children:e,helpers:new Set,components:[],directives:[],hoists:[],imports:[],cached:0,temps:0,codegenNode:void 0,loc:ta}}([],e);return ou.parse(Ga),s.loc=bu(0,e.length),s.children=fu(s.children),za=null,s}function Tu(e,t){Eu(e,t,wu(e,e.children[0]))}function wu(e,t){const{children:n}=e;return 1===n.length&&1===t.type&&!Ba(t)}function Eu(e,t,n=!1){const{children:s}=e,o=s.length;let r=0;for(let i=0;i<s.length;i++){const e=s[i];if(1===e.type&&0===e.tagType){const s=n?0:Nu(e,t);if(s>0){if(s>=2){e.codegenNode.patchFlag="-1",e.codegenNode=t.hoist(e.codegenNode),r++;continue}}else{const n=e.codegenNode;if(13===n.type){const s=Lu(n);if((!s||512===s||1===s)&&Ru(e,t)>=2){const s=Ou(e);s&&(n.props=t.hoist(s))}n.dynamicProps&&(n.dynamicProps=t.hoist(n.dynamicProps))}}}if(1===e.type){const n=1===e.tagType;n&&t.scopes.vSlot++,Eu(e,t),n&&t.scopes.vSlot--}else if(11===e.type)Eu(e,t,1===e.children.length);else if(9===e.type)for(let n=0;n<e.branches.length;n++)Eu(e.branches[n],t,1===e.branches[n].children.length)}if(r&&t.transformHoist&&t.transformHoist(s,t,e),r&&r===o&&1===e.type&&0===e.tagType&&e.codegenNode&&13===e.codegenNode.type&&d(e.codegenNode.children)){const n=t.hoist(sa(e.codegenNode.children));t.hmr&&(n.content=`[...${n.content}]`),e.codegenNode.children=n}}function Nu(e,t){const{constantCache:n}=t;switch(e.type){case 1:if(0!==e.tagType)return 0;const s=n.get(e);if(void 0!==s)return s;const o=e.codegenNode;if(13!==o.type)return 0;if(o.isBlock&&"svg"!==e.tag&&"foreignObject"!==e.tag)return 0;if(Lu(o))return n.set(e,0),0;{let s=3;const r=Ru(e,t);if(0===r)return n.set(e,0),0;r<s&&(s=r);for(let o=0;o<e.children.length;o++){const r=Nu(e.children[o],t);if(0===r)return n.set(e,0),0;r<s&&(s=r)}if(s>1)for(let o=0;o<e.props.length;o++){const r=e.props[o];if(7===r.type&&"bind"===r.name&&r.exp){const o=Nu(r.exp,t);if(0===o)return n.set(e,0),0;o<s&&(s=o)}}if(o.isBlock){for(let t=0;t<e.props.length;t++){if(7===e.props[t].type)return n.set(e,0),0}t.removeHelper(_c),t.removeHelper(pa(t.inSSR,o.isComponent)),o.isBlock=!1,t.helper(da(t.inSSR,o.isComponent))}return n.set(e,s),s}case 2:case 3:return 3;case 9:case 11:case 10:default:return 0;case 5:case 12:return Nu(e.content,t);case 4:return e.constType;case 8:let r=3;for(let n=0;n<e.children.length;n++){const s=e.children[n];if(g(s)||y(s))continue;const o=Nu(s,t);if(0===o)return 0;o<r&&(r=o)}return r}}const Au=new Set([Bc,Vc,Dc,Uc]);function Iu(e,t){if(14===e.type&&!g(e.callee)&&Au.has(e.callee)){const n=e.arguments[0];if(4===n.type)return Nu(n,t);if(14===n.type)return Iu(n,t)}return 0}function Ru(e,t){let n=3;const s=Ou(e);if(s&&15===s.type){const{properties:e}=s;for(let s=0;s<e.length;s++){const{key:o,value:r}=e[s],i=Nu(o,t);if(0===i)return i;let l;if(i<n&&(n=i),l=4===r.type?Nu(r,t):14===r.type?Iu(r,t):0,0===l)return l;l<n&&(n=l)}}return n}function Ou(e){const t=e.codegenNode;if(13===t.type)return t.props}function Lu(e){const t=e.patchFlag;return t?parseInt(t,10):void 0}function Fu(e,{filename:n="",prefixIdentifiers:o=!1,hoistStatic:r=!1,hmr:i=!1,cacheHandlers:l=!1,nodeTransforms:c=[],directiveTransforms:a={},transformHoist:u=null,isBuiltInComponent:d=s,isCustomElement:p=s,expressionPlugins:h=[],scopeId:f=null,slotted:m=!0,ssr:y=!1,inSSR:v=!1,ssrCssVars:b="",bindingMetadata:_=t,inline:S=!1,isTS:x=!1,onError:C=Sa,onWarn:k=xa,compatConfig:T}){const w=n.replace(/\\?.*$/,"").match(/([^/\\\\]+)\\.\\w+$/),E={filename:n,selfName:w&&O(A(w[1])),prefixIdentifiers:o,hoistStatic:r,hmr:i,cacheHandlers:l,nodeTransforms:c,directiveTransforms:a,transformHoist:u,isBuiltInComponent:d,isCustomElement:p,expressionPlugins:h,scopeId:f,slotted:m,ssr:y,inSSR:v,ssrCssVars:b,bindingMetadata:_,inline:S,isTS:x,onError:C,onWarn:k,compatConfig:T,root:e,helpers:new Map,components:new Set,directives:new Set,hoists:[],imports:[],constantCache:new WeakMap,temps:0,cached:0,identifiers:Object.create(null),scopes:{vFor:0,vSlot:0,vPre:0,vOnce:0},parent:null,currentNode:e,childIndex:0,inVOnce:!1,helper(e){const t=E.helpers.get(e)||0;return E.helpers.set(e,t+1),e},removeHelper(e){const t=E.helpers.get(e);if(t){const n=t-1;n?E.helpers.set(e,n):E.helpers.delete(e)}},helperString:e=>`_${ea[E.helper(e)]}`,replaceNode(e){E.parent.children[E.childIndex]=E.currentNode=e},removeNode(e){const t=e?E.parent.children.indexOf(e):E.currentNode?E.childIndex:-1;e&&e!==E.currentNode?E.childIndex>t&&(E.childIndex--,E.onNodeRemoved()):(E.currentNode=null,E.onNodeRemoved()),E.parent.children.splice(t,1)},onNodeRemoved:s,addIdentifiers(e){},removeIdentifiers(e){},hoist(e){g(e)&&(e=ia(e)),E.hoists.push(e);const t=ia(`_hoisted_${E.hoists.length}`,!1,e.loc,2);return t.hoisted=e,t},cache:(e,t=!1)=>function(e,t,n=!1){return{type:20,index:e,value:t,isVNode:n,loc:ta}}(E.cached++,e,t)};return E}function Mu(e,t){const n=Fu(e,t);Pu(e,n),t.hoistStatic&&Tu(e,n),t.ssr||function(e,t){const{helper:n}=t,{children:s}=e;if(1===s.length){const n=s[0];if(wu(e,n)&&n.codegenNode){const s=n.codegenNode;13===s.type&&ha(s,t),e.codegenNode=s}else e.codegenNode=n}else if(s.length>1){let s=64;e.codegenNode=na(t,n(mc),void 0,e.children,s+"",void 0,void 0,!0,void 0,!1)}}(e,n),e.helpers=new Set([...n.helpers.keys()]),e.components=[...n.components],e.directives=[...n.directives],e.imports=n.imports,e.hoists=n.hoists,e.temps=n.temps,e.cached=n.cached,e.transformed=!0}function Pu(e,t){t.currentNode=e;const{nodeTransforms:n}=t,s=[];for(let r=0;r<n.length;r++){const o=n[r](e,t);if(o&&(d(o)?s.push(...o):s.push(o)),!t.currentNode)return;e=t.currentNode}switch(e.type){case 3:t.ssr||t.helper(Tc);break;case 5:t.ssr||t.helper(Pc);break;case 9:for(let n=0;n<e.branches.length;n++)Pu(e.branches[n],t);break;case 10:case 11:case 1:case 0:!function(e,t){let n=0;const s=()=>{n--};for(;n<e.children.length;n++){const o=e.children[n];g(o)||(t.parent=e,t.childIndex=n,t.onNodeRemoved=s,Pu(o,t))}}(e,t)}t.currentNode=e;let o=s.length;for(;o--;)s[o]()}function $u(e,t){const n=g(e)?t=>t===e:t=>e.test(t);return(e,s)=>{if(1===e.type){const{props:o}=e;if(3===e.tagType&&o.some(Pa))return;const r=[];for(let i=0;i<o.length;i++){const l=o[i];if(7===l.type&&n(l.name)){o.splice(i,1),i--;const n=t(e,l,s);n&&r.push(n)}}return r}}}const Bu="/*#__PURE__*/",Vu=e=>`${ea[e]}: _${ea[e]}`;function Du(e,t={}){const n=function(e,{mode:t="function",prefixIdentifiers:n="module"===t,sourceMap:s=!1,filename:o="template.vue.html",scopeId:r=null,optimizeImports:i=!1,runtimeGlobalName:l="Vue",runtimeModuleName:c="vue",ssrRuntimeModuleName:a="vue/server-renderer",ssr:u=!1,isTS:d=!1,inSSR:p=!1}){const h={mode:t,prefixIdentifiers:n,sourceMap:s,filename:o,scopeId:r,optimizeImports:i,runtimeGlobalName:l,runtimeModuleName:c,ssrRuntimeModuleName:a,ssr:u,isTS:d,inSSR:p,source:e.source,code:"",column:1,line:1,offset:0,indentLevel:0,pure:!1,map:void 0,helper:e=>`_${ea[e]}`,push(e,t=-2,n){h.code+=e},indent(){f(++h.indentLevel)},deindent(e=!1){e?--h.indentLevel:f(--h.indentLevel)},newline(){f(h.indentLevel)}};function f(e){h.push("\\n"+"  ".repeat(e),0)}return h}(e,t);t.onContextCreated&&t.onContextCreated(n);const{mode:s,push:o,prefixIdentifiers:r,indent:i,deindent:l,newline:c,ssr:a}=n,u=Array.from(e.helpers),d=u.length>0,p=!r&&"module"!==s;!function(e,t){const{push:n,newline:s,runtimeGlobalName:o}=t,r=o,i=Array.from(e.helpers);if(i.length>0&&(n(`const _Vue = ${r}\\n`,-1),e.hoists.length)){n(`const { ${[Cc,kc,Tc,wc,Ec].filter((e=>i.includes(e))).map(Vu).join(", ")} } = _Vue\\n`,-1)}(function(e,t){if(!e.length)return;t.pure=!0;const{push:n,newline:s}=t;s();for(let o=0;o<e.length;o++){const r=e[o];r&&(n(`const _hoisted_${o+1} = `),qu(r,t),s())}t.pure=!1})(e.hoists,t),s(),n("return ")}(e,n);if(o(`function ${a?"ssrRender":"render"}(${(a?["_ctx","_push","_parent","_attrs"]:["_ctx","_cache"]).join(", ")}) {`),i(),p&&(o("with (_ctx) {"),i(),d&&(o(`const { ${u.map(Vu).join(", ")} } = _Vue\\n`,-1),c())),e.components.length&&(Uu(e.components,"component",n),(e.directives.length||e.temps>0)&&c()),e.directives.length&&(Uu(e.directives,"directive",n),e.temps>0&&c()),e.temps>0){o("let ");for(let t=0;t<e.temps;t++)o(`${t>0?", ":""}_temp${t}`)}return(e.components.length||e.directives.length||e.temps)&&(o("\\n",0),c()),a||o("return "),e.codegenNode?qu(e.codegenNode,n):o("null"),p&&(l(),o("}")),l(),o("}"),{ast:e,code:n.code,preamble:"",map:n.map?n.map.toJSON():void 0}}function Uu(e,t,{helper:n,push:s,newline:o,isTS:r}){const i=n("component"===t?Nc:Ic);for(let l=0;l<e.length;l++){let n=e[l];const c=n.endsWith("__self");c&&(n=n.slice(0,-6)),s(`const ${Ha(n,t)} = ${i}(${JSON.stringify(n)}${c?", true":""})${r?"!":""}`),l<e.length-1&&o()}}function ju(e,t){const n=e.length>3||!1;t.push("["),n&&t.indent(),Hu(e,t,n),n&&t.deindent(),t.push("]")}function Hu(e,t,n=!1,s=!0){const{push:o,newline:r}=t;for(let i=0;i<e.length;i++){const l=e[i];g(l)?o(l,-3):d(l)?ju(l,t):qu(l,t),i<e.length-1&&(n?(s&&o(","),r()):s&&o(", "))}}function qu(e,t){if(g(e))t.push(e,-3);else if(y(e))t.push(t.helper(e));else switch(e.type){case 1:case 9:case 11:case 12:qu(e.codegenNode,t);break;case 2:!function(e,t){t.push(JSON.stringify(e.content),-3,e)}(e,t);break;case 4:Wu(e,t);break;case 5:!function(e,t){const{push:n,helper:s,pure:o}=t;o&&n(Bu);n(`${s(Pc)}(`),qu(e.content,t),n(")")}(e,t);break;case 8:Ku(e,t);break;case 3:!function(e,t){const{push:n,helper:s,pure:o}=t;o&&n(Bu);n(`${s(Tc)}(${JSON.stringify(e.content)})`,-3,e)}(e,t);break;case 13:!function(e,t){const{push:n,helper:s,pure:o}=t,{tag:r,props:i,children:l,patchFlag:c,dynamicProps:a,directives:u,isBlock:d,disableTracking:p,isComponent:h}=e;u&&n(s(Oc)+"(");d&&n(`(${s(_c)}(${p?"true":""}), `);o&&n(Bu);const f=d?pa(t.inSSR,h):da(t.inSSR,h);n(s(f)+"(",-2,e),Hu(function(e){let t=e.length;for(;t--&&null==e[t];);return e.slice(0,t+1).map((e=>e||"null"))}([r,i,l,c,a]),t),n(")"),d&&n(")");u&&(n(", "),qu(u,t),n(")"))}(e,t);break;case 14:!function(e,t){const{push:n,helper:s,pure:o}=t,r=g(e.callee)?e.callee:s(e.callee);o&&n(Bu);n(r+"(",-2,e),Hu(e.arguments,t),n(")")}(e,t);break;case 15:!function(e,t){const{push:n,indent:s,deindent:o,newline:r}=t,{properties:i}=e;if(!i.length)return void n("{}",-2,e);const l=i.length>1||!1;n(l?"{":"{ "),l&&s();for(let c=0;c<i.length;c++){const{key:e,value:s}=i[c];zu(e,t),n(": "),qu(s,t),c<i.length-1&&(n(","),r())}l&&o(),n(l?"}":" }")}(e,t);break;case 17:!function(e,t){ju(e.elements,t)}(e,t);break;case 18:!function(e,t){const{push:n,indent:s,deindent:o}=t,{params:r,returns:i,body:l,newline:c,isSlot:a}=e;a&&n(`_${ea[Jc]}(`);n("(",-2,e),d(r)?Hu(r,t):r&&qu(r,t);n(") => "),(c||l)&&(n("{"),s());i?(c&&n("return "),d(i)?ju(i,t):qu(i,t)):l&&qu(l,t);(c||l)&&(o(),n("}"));a&&n(")")}(e,t);break;case 19:!function(e,t){const{test:n,consequent:s,alternate:o,newline:r}=e,{push:i,indent:l,deindent:c,newline:a}=t;if(4===n.type){const e=!Ea(n.content);e&&i("("),Wu(n,t),e&&i(")")}else i("("),qu(n,t),i(")");r&&l(),t.indentLevel++,r||i(" "),i("? "),qu(s,t),t.indentLevel--,r&&a(),r||i(" "),i(": ");const u=19===o.type;u||t.indentLevel++;qu(o,t),u||t.indentLevel--;r&&c(!0)}(e,t);break;case 20:!function(e,t){const{push:n,helper:s,indent:o,deindent:r,newline:i}=t;n(`_cache[${e.index}] || (`),e.isVNode&&(o(),n(`${s(Kc)}(-1),`),i());n(`_cache[${e.index}] = `),qu(e.value,t),e.isVNode&&(n(","),i(),n(`${s(Kc)}(1),`),i(),n(`_cache[${e.index}]`),r());n(")")}(e,t);break;case 21:Hu(e.body,t,!0,!1)}}function Wu(e,t){const{content:n,isStatic:s}=e;t.push(s?JSON.stringify(n):n,-3,e)}function Ku(e,t){for(let n=0;n<e.children.length;n++){const s=e.children[n];g(s)?t.push(s,-3):qu(s,t)}}function zu(e,t){const{push:n}=t;if(8===e.type)n("["),Ku(e,t),n("]");else if(e.isStatic){n(Ea(e.content)?e.content:JSON.stringify(e.content),-2,e)}else n(`[${e.content}]`,-3,e)}const Gu=$u(/^(if|else|else-if)$/,((e,t,n)=>function(e,t,n,s){if(!("else"===t.name||t.exp&&t.exp.content.trim())){const s=t.exp?t.exp.loc:e.loc;n.onError(Ca(28,t.loc)),t.exp=ia("true",!1,s)}if("if"===t.name){const o=Ju(e,t),r={type:9,loc:e.loc,branches:[o]};if(n.replaceNode(r),s)return s(r,o,!0)}else{const o=n.parent.children;let r=o.indexOf(e);for(;r-- >=-1;){const i=o[r];if(i&&3===i.type)n.removeNode(i);else{if(!i||2!==i.type||i.content.trim().length){if(i&&9===i.type){"else-if"===t.name&&void 0===i.branches[i.branches.length-1].condition&&n.onError(Ca(30,e.loc)),n.removeNode();const o=Ju(e,t);i.branches.push(o);const r=s&&s(i,o,!1);Pu(o,n),r&&r(),n.currentNode=null}else n.onError(Ca(30,e.loc));break}n.removeNode(i)}}}}(e,t,n,((e,t,s)=>{const o=n.parent.children;let r=o.indexOf(e),i=0;for(;r-- >=0;){const e=o[r];e&&9===e.type&&(i+=e.branches.length)}return()=>{if(s)e.codegenNode=Xu(t,i,n);else{const s=function(e){for(;;)if(19===e.type){if(19!==e.alternate.type)return e;e=e.alternate}else 20===e.type&&(e=e.value)}(e.codegenNode);s.alternate=Xu(t,i+e.branches.length-1,n)}}}))));function Ju(e,t){const n=3===e.tagType;return{type:10,loc:e.loc,condition:"else"===t.name?void 0:t.exp,children:n&&!Oa(e,"for")?e.children:[e],userKey:La(e,"key"),isTemplateIf:n}}function Xu(e,t,n){return e.condition?ua(e.condition,Qu(e,t,n),ca(n.helper(Tc),[\'""\',"true"])):Qu(e,t,n)}function Qu(e,t,n){const{helper:s}=n,o=ra("key",ia(`${t}`,!1,ta,2)),{children:r}=e,i=r[0];if(1!==r.length||1!==i.type){if(1===r.length&&11===i.type){const e=i.codegenNode;return Ua(e,o,n),e}{let t=64;return na(n,s(mc),oa([o]),r,t+"",void 0,void 0,!0,!1,!1,e.loc)}}{const e=i.codegenNode,t=14===(l=e).type&&l.callee===Zc?l.arguments[1].returns:l;return 13===t.type&&ha(t,n),Ua(t,o,n),e}var l}const Zu=$u("for",((e,t,n)=>{const{helper:s,removeHelper:o}=n;return function(e,t,n,s){if(!t.exp)return void n.onError(Ca(31,t.loc));const o=t.forParseResult;if(!o)return void n.onError(Ca(32,t.loc));Yu(o);const{scopes:r}=n,{source:i,value:l,key:c,index:a}=o,u={type:11,loc:t.loc,source:i,valueAlias:l,keyAlias:c,objectIndexAlias:a,parseResult:o,children:$a(e)?e.children:[e]};n.replaceNode(u),r.vFor++;const d=s&&s(u);return()=>{r.vFor--,d&&d()}}(e,t,n,(t=>{const r=ca(s(Lc),[t.source]),i=$a(e),l=Oa(e,"memo"),c=La(e,"key"),a=c&&(6===c.type?ia(c.value.content,!0):c.exp),u=c?ra("key",a):null,d=4===t.source.type&&t.source.constType>0,p=d?64:c?128:256;return t.codegenNode=na(n,s(mc),void 0,r,p+"",void 0,void 0,!0,!d,!1,e.loc),()=>{let c;const{children:p}=t,h=1!==p.length||1!==p[0].type,f=Ba(e)?e:i&&1===e.children.length&&Ba(e.children[0])?e.children[0]:null;if(f?(c=f.codegenNode,i&&u&&Ua(c,u,n)):h?c=na(n,s(mc),u?oa([u]):void 0,e.children,"64",void 0,void 0,!0,void 0,!1):(c=p[0].codegenNode,i&&u&&Ua(c,u,n),c.isBlock!==!d&&(c.isBlock?(o(_c),o(pa(n.inSSR,c.isComponent))):o(da(n.inSSR,c.isComponent))),c.isBlock=!d,c.isBlock?(s(_c),s(pa(n.inSSR,c.isComponent))):s(da(n.inSSR,c.isComponent))),l){const e=aa(ed(t.parseResult,[ia("_cached")]));e.body={type:21,body:[la(["const _memo = (",l.exp,")"]),la(["if (_cached",...a?[" && _cached.key === ",a]:[],` && ${n.helperString(Yc)}(_cached, _memo)) return _cached`]),la(["const _item = ",c]),ia("_item.memo = _memo"),ia("return _item")],loc:ta},r.arguments.push(e,ia("_cache"),ia(String(n.cached++)))}else r.arguments.push(aa(ed(t.parseResult),c,!0))}}))}));function Yu(e,t){e.finalized||(e.finalized=!0)}function ed({value:e,key:t,index:n},s=[]){return function(e){let t=e.length;for(;t--&&!e[t];);return e.slice(0,t+1).map(((e,t)=>e||ia("_".repeat(t+1),!1)))}([e,t,n,...s])}const td=ia("undefined",!1),nd=(e,t)=>{if(1===e.type&&(1===e.tagType||3===e.tagType)){const n=Oa(e,"slot");if(n)return t.scopes.vSlot++,()=>{t.scopes.vSlot--}}},sd=(e,t,n,s)=>aa(e,n,!1,!0,n.length?n[0].loc:s);function od(e,t,n=sd){t.helper(Jc);const{children:s,loc:o}=e,r=[],i=[];let l=t.scopes.vSlot>0||t.scopes.vFor>0;const c=Oa(e,"slot",!0);if(c){const{arg:e,exp:t}=c;e&&!ka(e)&&(l=!0),r.push(ra(e||ia("default",!0),n(t,void 0,s,o)))}let a=!1,u=!1;const d=[],p=new Set;let h=0;for(let g=0;g<s.length;g++){const e=s[g];let o;if(!$a(e)||!(o=Oa(e,"slot",!0))){3!==e.type&&d.push(e);continue}if(c){t.onError(Ca(37,o.loc));break}a=!0;const{children:f,loc:m}=e,{arg:y=ia("default",!0),exp:v,loc:b}=o;let _;ka(y)?_=y?y.content:"default":l=!0;const S=Oa(e,"for"),x=n(v,S,f,m);let C,k;if(C=Oa(e,"if"))l=!0,i.push(ua(C.exp,rd(y,x,h++),td));else if(k=Oa(e,/^else(-if)?$/,!0)){let e,n=g;for(;n--&&(e=s[n],3===e.type););if(e&&$a(e)&&Oa(e,"if")){s.splice(g,1),g--;let e=i[i.length-1];for(;19===e.alternate.type;)e=e.alternate;e.alternate=k.exp?ua(k.exp,rd(y,x,h++),td):rd(y,x,h++)}else t.onError(Ca(30,k.loc))}else if(S){l=!0;const e=S.forParseResult;e?(Yu(e),i.push(ca(t.helper(Lc),[e.source,aa(ed(e),rd(y,x),!0)]))):t.onError(Ca(32,S.loc))}else{if(_){if(p.has(_)){t.onError(Ca(38,b));continue}p.add(_),"default"===_&&(u=!0)}r.push(ra(y,x))}}if(!c){const e=(e,t)=>ra("default",n(e,void 0,t,o));a?d.length&&d.some((e=>ld(e)))&&(u?t.onError(Ca(39,d[0].loc)):r.push(e(void 0,d))):r.push(e(void 0,s))}const f=l?2:id(e.children)?3:1;let m=oa(r.concat(ra("_",ia(f+"",!1))),o);return i.length&&(m=ca(t.helper(Mc),[m,sa(i)])),{slots:m,hasDynamicSlots:l}}function rd(e,t,n){const s=[ra("name",e),ra("fn",t)];return null!=n&&s.push(ra("key",ia(String(n),!0))),oa(s)}function id(e){for(let t=0;t<e.length;t++){const n=e[t];switch(n.type){case 1:if(2===n.tagType||id(n.children))return!0;break;case 9:if(id(n.branches))return!0;break;case 10:case 11:if(id(n.children))return!0}}return!1}function ld(e){return 2!==e.type&&12!==e.type||(2===e.type?!!e.content.trim():ld(e.content))}const cd=new WeakMap,ad=(e,t)=>function(){if(1!==(e=t.currentNode).type||0!==e.tagType&&1!==e.tagType)return;const{tag:n,props:s}=e,o=1===e.tagType;let r=o?function(e,t,n=!1){let{tag:s}=e;const o=hd(s),r=La(e,"is");if(r)if(o){const e=6===r.type?r.value&&ia(r.value.content,!0):r.exp;if(e)return ca(t.helper(Ac),[e])}else 6===r.type&&r.value.content.startsWith("vue:")&&(s=r.value.content.slice(4));const i=Ta(s)||t.isBuiltInComponent(s);if(i)return n||t.helper(i),i;return t.helper(Nc),t.components.add(s),Ha(s,"component")}(e,t):`"${n}"`;const i=v(r)&&r.callee===Ac;let l,c,a,u,d,p,h=0,f=i||r===gc||r===yc||!o&&("svg"===n||"foreignObject"===n);if(s.length>0){const n=ud(e,t,void 0,o,i);l=n.props,h=n.patchFlag,d=n.dynamicPropNames;const s=n.directives;p=s&&s.length?sa(s.map((e=>function(e,t){const n=[],s=cd.get(e);s?n.push(t.helperString(s)):(t.helper(Ic),t.directives.add(e.name),n.push(Ha(e.name,"directive")));const{loc:o}=e;e.exp&&n.push(e.exp);e.arg&&(e.exp||n.push("void 0"),n.push(e.arg));if(Object.keys(e.modifiers).length){e.arg||(e.exp||n.push("void 0"),n.push("void 0"));const t=ia("true",!1,o);n.push(oa(e.modifiers.map((e=>ra(e,t))),o))}return sa(n,e.loc)}(e,t)))):void 0,n.shouldUseBlock&&(f=!0)}if(e.children.length>0){r===vc&&(f=!0,h|=1024);if(o&&r!==gc&&r!==vc){const{slots:n,hasDynamicSlots:s}=od(e,t);c=n,s&&(h|=1024)}else if(1===e.children.length&&r!==gc){const n=e.children[0],s=n.type,o=5===s||8===s;o&&0===Nu(n,t)&&(h|=1),c=o||2===s?n:e.children}else c=e.children}0!==h&&(a=String(h),d&&d.length&&(u=function(e){let t="[";for(let n=0,s=e.length;n<s;n++)t+=JSON.stringify(e[n]),n<s-1&&(t+=", ");return t+"]"}(d))),e.codegenNode=na(t,r,l,c,a,u,p,!!f,!1,o,e.loc)};function ud(e,t,n=e.props,s,o,i=!1){const{tag:l,loc:c,children:a}=e;let u=[];const d=[],p=[],h=a.length>0;let f=!1,m=0,g=!1,v=!1,b=!1,_=!1,S=!1,x=!1;const C=[],k=e=>{u.length&&(d.push(oa(dd(u),c)),u=[]),e&&d.push(e)},E=({key:e,value:n})=>{if(ka(e)){const i=e.content,l=r(i);if(!l||s&&!o||"onclick"===i.toLowerCase()||"onUpdate:modelValue"===i||T(i)||(_=!0),l&&T(i)&&(x=!0),l&&14===n.type&&(n=n.arguments[0]),20===n.type||(4===n.type||8===n.type)&&Nu(n,t)>0)return;"ref"===i?g=!0:"class"===i?v=!0:"style"===i?b=!0:"key"===i||C.includes(i)||C.push(i),!s||"class"!==i&&"style"!==i||C.includes(i)||C.push(i)}else S=!0};for(let r=0;r<n.length;r++){const o=n[r];if(6===o.type){const{loc:e,name:n,nameLoc:s,value:r}=o;let i=!0;if("ref"===n&&(g=!0,t.scopes.vFor>0&&u.push(ra(ia("ref_for",!0),ia("true")))),"is"===n&&(hd(l)||r&&r.content.startsWith("vue:")))continue;u.push(ra(ia(n,!0,s),ia(r?r.content:"",i,r?r.loc:e)))}else{const{name:n,arg:r,exp:a,loc:g,modifiers:v}=o,b="bind"===n,_="on"===n;if("slot"===n){s||t.onError(Ca(40,g));continue}if("once"===n||"memo"===n)continue;if("is"===n||b&&Fa(r,"is")&&hd(l))continue;if(_&&i)continue;if((b&&Fa(r,"key")||_&&h&&Fa(r,"vue:before-update"))&&(f=!0),b&&Fa(r,"ref")&&t.scopes.vFor>0&&u.push(ra(ia("ref_for",!0),ia("true"))),!r&&(b||_)){S=!0,a?b?(k(),d.push(a)):k({type:14,loc:g,callee:t.helper(jc),arguments:s?[a]:[a,"true"]}):t.onError(Ca(b?34:35,g));continue}b&&v.includes("prop")&&(m|=32);const x=t.directiveTransforms[n];if(x){const{props:n,needRuntime:s}=x(o,e,t);!i&&n.forEach(E),_&&r&&!ka(r)?k(oa(n,c)):u.push(...n),s&&(p.push(o),y(s)&&cd.set(o,s))}else w(n)||(p.push(o),h&&(f=!0))}}let N;if(d.length?(k(),N=d.length>1?ca(t.helper($c),d,c):d[0]):u.length&&(N=oa(dd(u),c)),S?m|=16:(v&&!s&&(m|=2),b&&!s&&(m|=4),C.length&&(m|=8),_&&(m|=32)),f||0!==m&&32!==m||!(g||x||p.length>0)||(m|=512),!t.inSSR&&N)switch(N.type){case 15:let e=-1,n=-1,s=!1;for(let t=0;t<N.properties.length;t++){const o=N.properties[t].key;ka(o)?"class"===o.content?e=t:"style"===o.content&&(n=t):o.isHandlerKey||(s=!0)}const o=N.properties[e],r=N.properties[n];s?N=ca(t.helper(Dc),[N]):(o&&!ka(o.value)&&(o.value=ca(t.helper(Bc),[o.value])),r&&(b||4===r.value.type&&"["===r.value.content.trim()[0]||17===r.value.type)&&(r.value=ca(t.helper(Vc),[r.value])));break;case 14:break;default:N=ca(t.helper(Dc),[ca(t.helper(Uc),[N])])}return{props:N,directives:p,patchFlag:m,dynamicPropNames:C,shouldUseBlock:f}}function dd(e){const t=new Map,n=[];for(let s=0;s<e.length;s++){const o=e[s];if(8===o.key.type||!o.key.isStatic){n.push(o);continue}const i=o.key.content,l=t.get(i);l?("style"===i||"class"===i||r(i))&&pd(l,o):(t.set(i,o),n.push(o))}return n}function pd(e,t){17===e.value.type?e.value.elements.push(t.value):e.value=sa([e.value,t.value],e.loc)}function hd(e){return"component"===e||"Component"===e}const fd=(e,t)=>{if(Ba(e)){const{children:n,loc:s}=e,{slotName:o,slotProps:r}=function(e,t){let n,s=\'"default"\';const o=[];for(let r=0;r<e.props.length;r++){const t=e.props[r];if(6===t.type)t.value&&("name"===t.name?s=JSON.stringify(t.value.content):(t.name=A(t.name),o.push(t)));else if("bind"===t.name&&Fa(t.arg,"name")){if(t.exp)s=t.exp;else if(t.arg&&4===t.arg.type){const e=A(t.arg.content);s=t.exp=ia(e,!1,t.arg.loc)}}else"bind"===t.name&&t.arg&&ka(t.arg)&&(t.arg.content=A(t.arg.content)),o.push(t)}if(o.length>0){const{props:s,directives:r}=ud(e,t,o,!1,!1);n=s,r.length&&t.onError(Ca(36,r[0].loc))}return{slotName:s,slotProps:n}}(e,t),i=[t.prefixIdentifiers?"_ctx.$slots":"$slots",o,"{}","undefined","true"];let l=2;r&&(i[2]=r,l=3),n.length&&(i[3]=aa([],n,!1,!1,s),l=4),t.scopeId&&!t.slotted&&(l=5),i.splice(l),e.codegenNode=ca(t.helper(Fc),i,s)}};const md=/^\\s*([\\w$_]+|(async\\s*)?\\([^)]*?\\))\\s*(:[^=]+)?=>|^\\s*(async\\s+)?function(?:\\s+[\\w$]+)?\\s*\\(/,gd=(e,t,n,s)=>{const{loc:o,modifiers:r,arg:i}=e;let l;if(4===i.type)if(i.isStatic){let e=i.content;e.startsWith("vue:")&&(e=`vnode-${e.slice(4)}`);l=ia(0!==t.tagType||e.startsWith("vnode")||!/[A-Z]/.test(e)?L(A(e)):`on:${e}`,!0,i.loc)}else l=la([`${n.helperString(Wc)}(`,i,")"]);else l=i,l.children.unshift(`${n.helperString(Wc)}(`),l.children.push(")");let c=e.exp;c&&!c.content.trim()&&(c=void 0);let a=n.cacheHandlers&&!c&&!n.inVOnce;if(c){const e=Ra(c.content),t=!(e||md.test(c.content)),n=c.content.includes(";");(t||a&&e)&&(c=la([`${t?"$event":"(...args)"} => ${n?"{":"("}`,c,n?"}":")"]))}let u={props:[ra(l,c||ia("() => {}",!1,o))]};return s&&(u=s(u)),a&&(u.props[0].value=n.cache(u.props[0].value)),u.props.forEach((e=>e.key.isHandlerKey=!0)),u},yd=(e,t,n)=>{const{modifiers:s,loc:o}=e,r=e.arg;let{exp:i}=e;if(i&&4===i.type&&!i.content.trim()&&(i=void 0),!i){if(4!==r.type||!r.isStatic)return n.onError(Ca(52,r.loc)),{props:[ra(r,ia("",!0,o))]};const t=A(r.content);i=e.exp=ia(t,!1,r.loc)}return 4!==r.type?(r.children.unshift("("),r.children.push(\') || ""\')):r.isStatic||(r.content=`${r.content} || ""`),s.includes("camel")&&(4===r.type?r.content=r.isStatic?A(r.content):`${n.helperString(Hc)}(${r.content})`:(r.children.unshift(`${n.helperString(Hc)}(`),r.children.push(")"))),n.inSSR||(s.includes("prop")&&vd(r,"."),s.includes("attr")&&vd(r,"^")),{props:[ra(r,i)]}},vd=(e,t)=>{4===e.type?e.content=e.isStatic?t+e.content:`\\`${t}\\${${e.content}}\\``:(e.children.unshift(`\'${t}\' + (`),e.children.push(")"))},bd=(e,t)=>{if(0===e.type||1===e.type||11===e.type||10===e.type)return()=>{const n=e.children;let s,o=!1;for(let e=0;e<n.length;e++){const t=n[e];if(Ma(t)){o=!0;for(let o=e+1;o<n.length;o++){const r=n[o];if(!Ma(r)){s=void 0;break}s||(s=n[e]=la([t],t.loc)),s.children.push(" + ",r),n.splice(o,1),o--}}}if(o&&(1!==n.length||0!==e.type&&(1!==e.type||0!==e.tagType||e.props.find((e=>7===e.type&&!t.directiveTransforms[e.name])))))for(let e=0;e<n.length;e++){const s=n[e];if(Ma(s)||8===s.type){const o=[];2===s.type&&" "===s.content||o.push(s),t.ssr||0!==Nu(s,t)||o.push("1"),n[e]={type:12,content:s,loc:s.loc,codegenNode:ca(t.helper(wc),o)}}}}},_d=new WeakSet,Sd=(e,t)=>{if(1===e.type&&Oa(e,"once",!0)){if(_d.has(e)||t.inVOnce||t.inSSR)return;return _d.add(e),t.inVOnce=!0,t.helper(Kc),()=>{t.inVOnce=!1;const e=t.currentNode;e.codegenNode&&(e.codegenNode=t.cache(e.codegenNode,!0))}}},xd=(e,t,n)=>{const{exp:s,arg:o}=e;if(!s)return n.onError(Ca(41,e.loc)),Cd();const r=s.loc.source,i=4===s.type?s.content:r,l=n.bindingMetadata[r];if("props"===l||"props-aliased"===l)return Cd();if(!i.trim()||!Ra(i))return n.onError(Ca(42,s.loc)),Cd();const c=o||ia("modelValue",!0),a=o?ka(o)?`onUpdate:${A(o.content)}`:la([\'"onUpdate:" + \',o]):"onUpdate:modelValue";let u;u=la([`${n.isTS?"($event: any)":"$event"} => ((`,s,") = $event)"]);const d=[ra(c,e.exp),ra(a,u)];if(e.modifiers.length&&1===t.tagType){const t=e.modifiers.map((e=>(Ea(e)?e:JSON.stringify(e))+": true")).join(", "),n=o?ka(o)?`${o.content}Modifiers`:la([o,\' + "Modifiers"\']):"modelModifiers";d.push(ra(n,ia(`{ ${t} }`,!1,e.loc,2)))}return Cd(d)};function Cd(e=[]){return{props:e}}const kd=new WeakSet,Td=(e,t)=>{if(1===e.type){const n=Oa(e,"memo");if(!n||kd.has(e))return;return kd.add(e),()=>{const s=e.codegenNode||t.currentNode.codegenNode;s&&13===s.type&&(1!==e.tagType&&ha(s,t),e.codegenNode=ca(t.helper(Zc),[n.exp,aa(void 0,s),"_cache",String(t.cached++)]))}}};function wd(e,t={}){const n=t.onError||Sa,s="module"===t.mode;!0===t.prefixIdentifiers?n(Ca(47)):s&&n(Ca(48));t.cacheHandlers&&n(Ca(49)),t.scopeId&&!s&&n(Ca(50));const o=l({},t,{prefixIdentifiers:!1}),r=g(e)?ku(e,o):e,[i,c]=[[Sd,Gu,Td,Zu,fd,ad,nd,bd],{on:gd,bind:yd,model:xd}];return Mu(r,l({},o,{nodeTransforms:[...i,...t.nodeTransforms||[]],directiveTransforms:l({},c,t.directiveTransforms||{})})),Du(r,o)}const Ed=Symbol(""),Nd=Symbol(""),Ad=Symbol(""),Id=Symbol(""),Rd=Symbol(""),Od=Symbol(""),Ld=Symbol(""),Fd=Symbol(""),Md=Symbol(""),Pd=Symbol("");var $d;let Bd;$d={[Ed]:"vModelRadio",[Nd]:"vModelCheckbox",[Ad]:"vModelText",[Id]:"vModelSelect",[Rd]:"vModelDynamic",[Od]:"withModifiers",[Ld]:"withKeys",[Fd]:"vShow",[Md]:"Transition",[Pd]:"TransitionGroup"},Object.getOwnPropertySymbols($d).forEach((e=>{ea[e]=$d[e]}));const Vd={parseMode:"html",isVoidTag:Z,isNativeTag:e=>J(e)||X(e)||Q(e),isPreTag:e=>"pre"===e,decodeEntities:function(e,t=!1){return Bd||(Bd=document.createElement("div")),t?(Bd.innerHTML=`<div foo="${e.replace(/"/g,"&quot;")}">`,Bd.children[0].getAttribute("foo")):(Bd.innerHTML=e,Bd.textContent)},isBuiltInComponent:e=>"Transition"===e||"transition"===e?Md:"TransitionGroup"===e||"transition-group"===e?Pd:void 0,getNamespace(e,t,n){let s=t?t.ns:n;if(t&&2===s)if("annotation-xml"===t.tag){if("svg"===e)return 1;t.props.some((e=>6===e.type&&"encoding"===e.name&&null!=e.value&&("text/html"===e.value.content||"application/xhtml+xml"===e.value.content)))&&(s=0)}else/^m(?:[ions]|text)$/.test(t.tag)&&"mglyph"!==e&&"malignmark"!==e&&(s=0);else t&&1===s&&("foreignObject"!==t.tag&&"desc"!==t.tag&&"title"!==t.tag||(s=0));if(0===s){if("svg"===e)return 1;if("math"===e)return 2}return s}},Dd=(e,t)=>{const n=K(e);return ia(JSON.stringify(n),!1,t,3)};function Ud(e,t){return Ca(e,t)}const jd=e("passive,once,capture"),Hd=e("stop,prevent,self,ctrl,shift,alt,meta,exact,middle"),qd=e("left,right"),Wd=e("onkeyup,onkeydown,onkeypress",!0),Kd=(e,t)=>ka(e)&&"onclick"===e.content.toLowerCase()?ia(t,!0):4!==e.type?la(["(",e,`) === "onClick" ? "${t}" : (`,e,")"]):e,zd=(e,t)=>{1!==e.type||0!==e.tagType||"script"!==e.tag&&"style"!==e.tag||t.removeNode()},Gd=[e=>{1===e.type&&e.props.forEach(((t,n)=>{6===t.type&&"style"===t.name&&t.value&&(e.props[n]={type:7,name:"bind",arg:ia("style",!0,t.loc),exp:Dd(t.value.content,t.loc),modifiers:[],loc:t.loc})}))}],Jd={cloak:()=>({props:[]}),html:(e,t,n)=>{const{exp:s,loc:o}=e;return s||n.onError(Ud(53,o)),t.children.length&&(n.onError(Ud(54,o)),t.children.length=0),{props:[ra(ia("innerHTML",!0,o),s||ia("",!0))]}},text:(e,t,n)=>{const{exp:s,loc:o}=e;return s||n.onError(Ud(55,o)),t.children.length&&(n.onError(Ud(56,o)),t.children.length=0),{props:[ra(ia("textContent",!0),s?Nu(s,n)>0?s:ca(n.helperString(Pc),[s],o):ia("",!0))]}},model:(e,t,n)=>{const s=xd(e,t,n);if(!s.props.length||1===t.tagType)return s;e.arg&&n.onError(Ud(58,e.arg.loc));const{tag:o}=t,r=n.isCustomElement(o);if("input"===o||"textarea"===o||"select"===o||r){let i=Ad,l=!1;if("input"===o||r){const s=La(t,"type");if(s){if(7===s.type)i=Rd;else if(s.value)switch(s.value.content){case"radio":i=Ed;break;case"checkbox":i=Nd;break;case"file":l=!0,n.onError(Ud(59,e.loc))}}else(function(e){return e.props.some((e=>!(7!==e.type||"bind"!==e.name||e.arg&&4===e.arg.type&&e.arg.isStatic)))})(t)&&(i=Rd)}else"select"===o&&(i=Id);l||(s.needRuntime=n.helper(i))}else n.onError(Ud(57,e.loc));return s.props=s.props.filter((e=>!(4===e.key.type&&"modelValue"===e.key.content))),s},on:(e,t,n)=>gd(e,t,n,(t=>{const{modifiers:s}=e;if(!s.length)return t;let{key:o,value:r}=t.props[0];const{keyModifiers:i,nonKeyModifiers:l,eventOptionModifiers:c}=((e,t,n,s)=>{const o=[],r=[],i=[];for(let l=0;l<t.length;l++){const n=t[l];jd(n)?i.push(n):qd(n)?ka(e)?Wd(e.content)?o.push(n):r.push(n):(o.push(n),r.push(n)):Hd(n)?r.push(n):o.push(n)}return{keyModifiers:o,nonKeyModifiers:r,eventOptionModifiers:i}})(o,s);if(l.includes("right")&&(o=Kd(o,"onContextmenu")),l.includes("middle")&&(o=Kd(o,"onMouseup")),l.length&&(r=ca(n.helper(Od),[r,JSON.stringify(l)])),!i.length||ka(o)&&!Wd(o.content)||(r=ca(n.helper(Ld),[r,JSON.stringify(i)])),c.length){const e=c.map(O).join("");o=ka(o)?ia(`${o.content}${e}`,!0):la(["(",o,`) + "${e}"`])}return{props:[ra(o,r)]}})),show:(e,t,n)=>{const{exp:s,loc:o}=e;return s||n.onError(Ud(61,o)),{props:[],needRuntime:n.helper(Fd)}}};const Xd=new WeakMap;function Qd(e,n){if(!g(e)){if(!e.nodeType)return s;e=e.innerHTML}const o=e,r=function(e){let n=Xd.get(null!=e?e:t);return n||(n=Object.create(null),Xd.set(null!=e?e:t,n)),n}(n),i=r[o];if(i)return i;if("#"===e[0]){const t=document.querySelector(e);e=t?t.innerHTML:""}const c=l({hoistStatic:!0,onError:void 0,onWarn:s},n);c.isCustomElement||"undefined"==typeof customElements||(c.isCustomElement=e=>!!customElements.get(e));const{code:a}=function(e,t={}){return wd(e,l({},Vd,t,{nodeTransforms:[zd,...Gd,...t.nodeTransforms||[]],directiveTransforms:l({},Jd,t.directiveTransforms||{}),transformHoist:null}))}(e,c),u=new Function("Vue",a)(fc);return u._rc=!0,r[o]=u}hi(Qd);export{bs as BaseTransition,vs as BaseTransitionPropsValidators,Tr as Comment,Li as DeprecationTypes,ce as EffectScope,nn as ErrorCodes,Ei as ErrorTypeStrings,Cr as Fragment,Rs as KeepAlive,he as ReactiveEffect,wr as Static,Jn as Suspense,Sr as Teleport,kr as Text,Yt as TrackOpTypes,Di as Transition,Ll as TransitionGroup,en as TriggerOpTypes,wl as VueElement,tn as assertNumber,on as callWithAsyncErrorHandling,sn as callWithErrorHandling,A as camelize,O as capitalize,Wr as cloneVNode,Oi as compatUtils,Qd as compile,bi as computed,ac as createApp,Mr as createBlock,Gr as createCommentVNode,Fr as createElementBlock,jr as createElementVNode,ar as createHydrationRenderer,So as createPropsRestProxy,cr as createRenderer,uc as createSSRApp,Zs as createSlots,zr as createStaticVNode,Kr as createTextVNode,Hr as createVNode,zt as customRef,Ns as defineAsyncComponent,ws as defineComponent,Cl as defineCustomElement,co as defineEmits,ao as defineExpose,ho as defineModel,uo as defineOptions,lo as defineProps,kl as defineSSRCustomElement,po as defineSlots,Ni as devtools,ve as effect,ae as effectScope,si as getCurrentInstance,de as getCurrentScope,Ts as getTransitionRawChildren,qr as guardReactiveProps,Si as h,rn as handleError,Uo as hasInjectionContext,cc as hydrate,xi as initCustomFormatter,hc as initDirectivesForSSR,Do as inject,ki as isMemoSame,Nt as isProxy,Tt as isReactive,wt as isReadonly,Pt as isRef,fi as isRuntimeOnly,Et as isShallow,Pr as isVNode,It as markRaw,bo as mergeDefaults,_o as mergeModels,Zr as mergeProps,gn as nextTick,z as normalizeClass,G as normalizeProps,j as normalizeStyle,Ls as onActivated,Us as onBeforeMount,Ws as onBeforeUnmount,Hs as onBeforeUpdate,Fs as onDeactivated,Xs as onErrorCaptured,js as onMounted,Js as onRenderTracked,Gs as onRenderTriggered,pe as onScopeDispose,zs as onServerPrefetch,Ks as onUnmounted,qs as onUpdated,Ar as openBlock,On as popScopeId,Vo as provide,Wt as proxyRefs,Rn as pushScopeId,bn as queuePostFlushCb,_t as reactive,xt as readonly,$t as ref,hi as registerRuntimeCompiler,lc as render,Qs as renderList,Ys as renderSlot,Un as resolveComponent,qn as resolveDirective,Hn as resolveDynamicComponent,Ri as resolveFilter,Ss as resolveTransitionHooks,Or as setBlockTracking,Ai as setDevtoolsHook,ks as setTransitionHooks,St as shallowReactive,Ct as shallowReadonly,Bt as shallowRef,ts as ssrContextKey,Ii as ssrUtils,be as stop,se as toDisplayString,L as toHandlerKey,to as toHandlers,At as toRaw,Qt as toRef,Gt as toRefs,Ht as toValue,Br as transformVNodeArgs,Ut as triggerRef,jt as unref,go as useAttrs,El as useCssModule,il as useCssVars,_i as useModel,ns as useSSRContext,mo as useSlots,gs as useTransitionState,jl as vModelCheckbox,Jl as vModelDynamic,ql as vModelRadio,Wl as vModelSelect,Ul as vModelText,sl as vShow,Ti as version,wi as warn,ls as watch,ss as watchEffect,os as watchPostEffect,rs as watchSyncEffect,xo as withAsyncContext,Fn as withCtx,fo as withDefaults,ps as withDirectives,tc as withKeys,Ci as withMemo,Yl as withModifiers,Ln as withScopeId};',N=`/*!
  * vue-router v4.2.5
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
import { getCurrentInstance, inject, onUnmounted, onDeactivated, onActivated, computed, unref, watchEffect, defineComponent, reactive, h, provide, ref, watch, shallowRef, shallowReactive, nextTick } from 'vue';

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
 * @param stringifyQuery - A function that takes a query object of type LocationQueryRaw and returns a string representation of it.
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
    const lastToSegment = toSegments[toSegments.length - 1];
    // make . and ./ the same (../ === .., ../../ === ../..)
    // this is the same behavior as new URL()
    if (lastToSegment === '..' || lastToSegment === '.') {
        toSegments.push('');
    }
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
 * @param base - The base path
 * @param location - The window.location object
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
    // TODO: could we use 'pagehide' or 'visibilitychange' instead?
    // https://developer.chrome.com/blog/page-lifecycle-api/
    window.addEventListener('beforeunload', beforeUnloadListener, {
        passive: true,
    });
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
        if (position !== queue.length) {
            // we are in the middle, we remove everything from here in the queue
            queue.splice(position);
        }
        queue.push(location);
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
                warn(\`The Matcher cannot resolve relative paths but received "\${path}". Unless you directly called \\\`matcher.resolve("\${path}")\\\`, this is probably a bug in vue-router. Please open an issue at https://github.com/vuejs/router/issues/new/choose.\`);
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
            propsObject[name] = typeof props === 'object' ? props[name] : props;
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
        list: () => handlers.slice(),
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
    const parentSubTreeType = instance.parent && instance.parent.subTree && instance.parent.subTree.type;
    if (parentName &&
        (parentName === 'KeepAlive' || parentName.includes('Transition')) &&
        typeof parentSubTreeType === 'object' &&
        parentSubTreeType.name === 'RouterView') {
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
                warn(\`Path "\${rawLocation.path}" was passed with params but they will be ignored. Use a named route alongside params instead.\`);
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
                params: encodeParams(targetParams),
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
                            : 1) > 30) {
                        warn(\`Detected a possibly infinite redirection in a navigation guard when going from "\${from.fullPath}" to "\${toLocation.fullPath}". Aborting to avoid a Stack Overflow.\\n Are you always returning a new location within a navigation guard? That would lead to this error. Only return when redirecting or aborting, that should fix this. This might break in production if not fixed.\`);
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
    function runWithContext(fn) {
        const app = installedApps.values().next().value;
        // support Vue < 3.3
        return app && typeof app.runWithContext === 'function'
            ? app.runWithContext(fn)
            : fn();
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
            for (const record of enteringRecords) {
                // do not trigger beforeEnter on reused views
                if (record.beforeEnter) {
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
        afterGuards
            .list()
            .forEach(guard => runWithContext(() => guard(to, from, failure)));
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
                // avoid warnings in the console about uncaught rejections, they are logged by triggerErrors
                .catch(noop);
        });
    }
    // Initialization and Errors
    let readyHandlers = useCallbacks();
    let errorListeners = useCallbacks();
    let ready;
    /**
     * Trigger errorListeners added via onError and throws the error as well
     *
     * @param error - error to throw
     * @param to - location we were navigating to when the error happened
     * @param from - location we were navigating from when the error happened
     * @returns the error as a rejected promise
     */
    function triggerError(error, to, from) {
        markAsReady(error);
        const list = errorListeners.list();
        if (list.length) {
            list.forEach(handler => handler(error, to, from));
        }
        else {
            {
                warn('uncaught error during route navigation:');
            }
            console.error(error);
        }
        // reject the error no matter there were error listeners or not
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
        onError: errorListeners.add,
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
                Object.defineProperty(reactiveRoute, key, {
                    get: () => currentRoute.value[key],
                    enumerable: true,
                });
            }
            app.provide(routerKey, router);
            app.provide(routeLocationKey, shallowReactive(reactiveRoute));
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
    // TODO: type this as NavigationGuardReturn or similar instead of any
    function runGuardQueue(guards) {
        return guards.reduce((promise, guard) => promise.then(() => runWithContext(guard)), Promise.resolve());
    }
    return router;
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

export { NavigationFailureType, RouterLink, RouterView, START_LOCATION_NORMALIZED as START_LOCATION, createMemoryHistory, createRouter, createRouterMatcher, createWebHashHistory, createWebHistory, isNavigationFailure, loadRouteLocation, matchedRouteKey, onBeforeRouteLeave, onBeforeRouteUpdate, parseQuery, routeLocationKey, routerKey, routerViewLocationKey, stringifyQuery, useLink, useRoute, useRouter, viewDepthKey };`;let g=null,f={},D=(t,e,i="/",r=/[\/|\\]/g)=>{t=t.replaceAll(r,i).split(i),e=e.replaceAll(r,i).split(i);const o=t.filter(n=>n==="..").length;return[...e.slice(0,-(o+1)),...t.filter(n=>n!==".."&&n!==".")].join(i)},a=async(t="/src/",e,i=!1,r=[])=>{if(e.startsWith("@")&&!e.startsWith("@/"))return e;if(["vue","vue-router"].includes(e))return f[e];try{let o=e.endsWith("?raw");if(o&&(e=e.replace("?raw","")),e.includes("://")||(e.startsWith("@/")&&(e=e.replace("@/","/src/")),!e.startsWith("/")&&!e.startsWith("./")&&!e.startsWith("../")))return e;if((e.startsWith("./")||e.startsWith("../"))&&(t=t.substring(0,t.lastIndexOf("/"))+"/",e=D(e,t)),o&&(e=e+"?raw"),f[e]&&!i)return f[e];const n=_.getType(e);if(o){let h=await g.readFile(e.replace("?raw",""),{encoding:"utf8"});return h=h.replaceAll("`","`"),f[e]=URL.createObjectURL(new Blob([`export default \`${h}\``],{type:"text/javascript"})),f[e]}else if(n&&!e.endsWith("vue")&&!e.endsWith("ts")&&n!=="text/css"&&n!=="text/javascript"&&n!=="application/json"){let h=await g.readFile(e);return f[e]=URL.createObjectURL(new Blob([h],{type:n})),f[e]}else if(n==="application/json"){let h=await g.readFile(e,{encoding:"utf8"});return f[e]=URL.createObjectURL(new Blob([`export default ${h}`],{type:"text/javascript"})),f[e]}let s="";e.includes(".")||(s=".js");let u=await g.readFile(e+s,{encoding:"utf8"});e.endsWith(".ts")&&(u=x.transpile(u,{module:"ESNext"}));let d=(e+s).toLowerCase();return["router.js","router.ts","router.mjs","router/index.js","router/index.ts","router/index.mjs"].some(h=>d.endsWith(h))&&(u=u.replaceAll("createWebHistory","createMemoryHistory"),u=u.replaceAll("import.meta.env.BASE_URL","")),d.endsWith(".vue")&&(u=u.replaceAll("<router-link","<router-link vue-play-link"),u=u.replaceAll("<RouterLink","<RouterLink vue-play-link")),f[e+s]=await S(e+s,u,e+s,r),f[e+s]}catch{return e}},S=async(t="/src/",e,i="",r=[])=>{if(i&&r.includes(i))return URL.createObjectURL(new Blob(["export default {}"],{type:"text/javascript"}));if(e=e.replaceAll("@tailwind base;","/*@tailwind base;*/"),e=e.replaceAll("@tailwind components;","/*@tailwind components;*/"),e=e.replaceAll("@tailwind utilities;","/*@tailwind utilities;*/"),e=e.replaceAll('}from"',' } from "'),e=e.replaceAll("import{","import { "),e=e.replaceAll("import*","import * "),e=e.replaceAll("export{","export { "),e=e.replaceAll("export*","export * "),e=e.replaceAll('import"','import "'),e=e.replaceAll('from"','from "'),e=await l(e,/(?:import\(')(.*?)(?='\))/g,async(o,n)=>{let s=await a(t,n,!1,r);return o.replace(n,s)}),e=await l(e,/(?:import\(")(.*?)(?="\))/g,async(o,n)=>{let s=await a(t,n,!1,r);return o.replace(n,s)}),e=await l(e,/(?:import\(`)(.*?)(?=`\))/g,async(o,n)=>{let s=await a(t,n,!1,r);return o.replace(n,s)}),e=await l(e,/import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g,async o=>(o=await l(o,/'(.*?)'/,async n=>(n=await a(t,n.split("'")[1],!1,r),"'"+n+"'")),o=await l(o,/"(.*?)"/,async n=>(n=await a(t,n.split('"')[1],!1,r),'"'+n+'"')),o=await l(o,/`(.*?)`/,async n=>(n=await a(t,n.split("`")[1],!1,r),"`"+n+"`")),o+`
`)),e=await l(e,/(?:export\(')(.*?)(?='\))/g,async(o,n)=>{let s=await a(t,n,!1,r);return o.replace(n,s)}),e=await l(e,/(?:export\(")(.*?)(?="\))/g,async(o,n)=>{let s=await a(t,n,!1,r);return o.replace(n,s)}),e=await l(e,/(?:export\(`)(.*?)(?=`\))/g,async(o,n)=>{let s=await a(t,n,!1,r);return o.replace(n,s)}),e=await l(e,/export\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g,async o=>(o=await l(o,/'(.*?)'/,async n=>(n=await a(t,n.split("'")[1],!1,r),"'"+n+"'")),o=await l(o,/"(.*?)"/,async n=>(n=await a(t,n.split('"')[1],!1,r),'"'+n+'"')),o=await l(o,/`(.*?)`/,async n=>(n=await a(t,n.split("`")[1],!1,r),"`"+n+"`")),o+`
`)),i.toLowerCase().endsWith(".vue")){let o=v.parse(e),n=v.stringify(o,!1,!0,!0,!0,!1,t),s=n.style;s=s.replaceAll("<style>","").replaceAll("<style scoped>","").replaceAll("</style>",""),s=await l(s,/(?:url\()(.*?)(?=\))/g,async(p,c)=>{let m=await a(t,c,!1,r);return p.replace(c,m)}),s=await l(s,/(?:url\(')(.*?)(?='\))/g,async(p,c)=>{let m=await a(t,c,!1,r);return p.replace(c,m)}),s=await l(s,/(?:url\(")(.*?)(?="\))/g,async(p,c)=>{let m=await a(t,c,!1,r);return p.replace(c,m)}),s=s.replaceAll("@blob","blob");let u=URL.createObjectURL(new Blob([s],{type:"text/css"})),d=n.template.replaceAll(`
`,"").trim();d=await l(d,/(?:\=")(.*?)(?=")/g,async(p,c)=>{let m=await a(t,c,!1,r);return p.replace(c,m)}),d=await l(d,/(?:url\()(.*?)(?=\))/g,async(p,c)=>{let m=await a(t,c,!1,r);return p.replace(c,m)}),d=await l(d,/(?:url\(')(.*?)(?='\))/g,async(p,c)=>{let m=await a(t,c,!1,r);return p.replace(c,m)}),d=await l(d,/(?:url\(")(.*?)(?="\))/g,async(p,c)=>{let m=await a(t,c,!1,r);return p.replace(c,m)}),d=d.replaceAll("@blob","blob"),e=n.script.replace("export default{",`

            let link = document.createElement('link')
            link.setAttribute('rel', 'stylesheet')
            link.setAttribute('href', '${u}')
            let hgroup = document.querySelector('hgroup')
            let parent = hgroup.parentNode
            parent.insertBefore(link, hgroup)
            // import sheet from '${u}' assert { type: 'css' } // not supported by ff & safari
            // document.adoptedStyleSheets.push(sheet)
export default{
template: \``+d+"`,"),e=e.replaceAll("this.router","window.router"),["setup"].forEach(p=>e=e.replace("<script "+p+">","")),e=e.replace("<script>",""),e=e.replace("<\/script>","")}return URL.createObjectURL(new Blob([e],{type:"text/javascript"}))},l=async(t,e,i)=>{let r=[];t.replace(e,(n,...s)=>{const u=i(n,...s);r.push(u)});const o=await Promise.all(r);return t.replace(e,()=>o.shift())},M=()=>C(),C=()=>{f={},f.vue=URL.createObjectURL(new Blob([L],{type:"text/javascript"})),f["vue-router"]=URL.createObjectURL(new Blob([N.replace("from 'vue'",`from '${f.vue}'`)],{type:"text/javascript"}))};C();let j=async(t,e)=>{g=t,e()};const $=`let ORIGIN = origin || window.origin
let SELECTED = null
let FULL = false
let scrollX = window.scrollX
let scrollY = window.scrollY
let scrolledElements = {}
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
  let alwaysMount = el.getAttribute('alwaysMount')
  let routerOverlay = el.getAttribute('routerOverlay')
  let styling = el.getAttribute('styling')
  let hgroup = document.querySelector('hgroup')
  FULL = el.getAttribute('full')
  hgroup.innerHTML = styling
  let content = el.getAttribute('html')
  if (routerOverlay === 'true') {
    content = content.replaceAll('<router-view', '<router-view vue-play-router')
    content = content.replaceAll('<RouterView', '<RouterView vue-play-router')
  }
  vueux.alwaysMount = alwaysMount === 'true'
  content = content.replaceAll('<router-link', '<router-link vue-play-link')
  content = content.replaceAll('<RouterLink', '<RouterLink vue-play-link')
  setTimeout(() => {
    setRouterOverlay()
  }, 200)
  return content
}
setTimeout(() => {
  vueux.value = getRender()
  if (vueux.router) {
    vueux.router.push(PATH)
    vueux.router.beforeEach((to, from, next) => {
      window.parent.postMessage({
        event: 'route',
        path: to.fullPath
      }, origin)
      next()
    })
  }
})

document.body.addEventListener('render', () => {
  window.scrollX = scrollX
  window.scrollY = scrollY
  for (const key of Object.keys(scrolledElements)) {
    for (const el of document.querySelectorAll(\`[\${key}]\`)) {
      el.scrollLeft = scrolledElements[key].scrollLeft
      el.scrollTop = scrolledElements[key].scrollTop
    }
  }
  setTimeout(() => fixPosition())
})

let element = document.getElementById('receiver')
let observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.type === 'attributes') {
      vueux.value = getRender()
      /* @todo - remove?
      window.scrollX = scrollX
      window.scrollY = scrollY
      for (const key of Object.keys(scrolledElements)) {
        for (const el of document.querySelectorAll(\`[\${key}]\`)) {
          el.scrollLeft = scrolledElements[key].scrollLeft
          el.scrollTop = scrolledElements[key].scrollTop
        }
      }
      setTimeout(() => fixPosition())
      */
      if (mutation.attributeName === 'path') {
        window.focus()
      }
    }
  })
})
observer.observe(element, { attributes: true })

if (!window.studio) window.studio = {}

window.parent.postMessage({event: 'init'}, origin)

window.addEventListener('copy', (event) => {
  if (['INPUT', 'TEXTAREA'].includes(event.target.nodeName.toUpperCase())) return
  window.parent.postMessage({
    event: 'copy',
    target: SELECTED
  }, origin)
})

window.addEventListener('paste', (event) => {
  if (['INPUT', 'TEXTAREA'].includes(event.target.nodeName.toUpperCase())) return
  window.parent.postMessage({
    event: 'paste',
    target: SELECTED
  }, origin)
})

window.addEventListener('keydown', (event) => {
  if (['INPUT', 'TEXTAREA'].includes(event.target.nodeName.toUpperCase())) return
  if (['BACKSPACE', 'DELETE'].includes(event.key.toUpperCase())) {
    event.preventDefault()
    window.parent.postMessage({
      event: 'delete',
      target: SELECTED
    }, origin)
  } else if (['TAB'].includes(event.key.toUpperCase())) {
    event.preventDefault()
    window.parent.postMessage({
      event: 'TAB',
      shiftKey: event.shiftKey
    }, origin)
  } else if (['ARROWUP'].includes(event.key.toUpperCase())) {
    event.preventDefault()
    window.parent.postMessage({
      event: 'ARROWUP'
    }, origin)
  } else if (['ARROWLEFT'].includes(event.key.toUpperCase())) {
    event.preventDefault()
    window.parent.postMessage({
      event: 'ARROWLEFT'
    }, origin)
  } else if (['ARROWRIGHT'].includes(event.key.toUpperCase())) {
    event.preventDefault()
    window.parent.postMessage({
      event: 'ARROWRIGHT'
    }, origin)
  } else if (['ARROWDOWN'].includes(event.key.toUpperCase())) {
    event.preventDefault()
    window.parent.postMessage({
      event: 'ARROWDOWN'
    }, origin)
  } else if (['ENTER'].includes(event.key.toUpperCase())) {
    event.preventDefault()
    window.parent.postMessage({
      event: 'ENTER'
    }, origin)
  } else if (['ESCAPE'].includes(event.key.toUpperCase())) {
    event.preventDefault()
    window.parent.postMessage({
      event: 'ESCAPE'
    }, origin)
  }
})

const map = {}
onkeydown = onkeyup = async (e) => {
  if (['INPUT', 'TEXTAREA'].includes(e.target.nodeName.toUpperCase())) return
  if (e.type === 'keydown' && (e.key.toLowerCase() === 'meta' || e.key.toLowerCase() === 'control')) {
    map['meta'] = true
  } else if (e.type === 'keyup' && (e.key.toLowerCase() === 'meta' || e.key.toLowerCase() === 'control')) {
    map['meta'] = false
  } else if (e.type === 'keydown' && e.key.toLowerCase() === 'z') {
    map['z'] = true
  } else if (e.type === 'keyup' && e.key.toLowerCase() === 'z') {
    map['z'] = false
  } else if (e.type === 'keydown' && e.key.toLowerCase() === 'shift') {
    map['shift'] = true
  } else if (e.type === 'keyup' && e.key.toLowerCase() === 'shift') {
    map['shift'] = false
  }
  if (e.key.toLowerCase() !== 'z') return
  if (map['meta'] && map['shift'] && map['z']) {
    window.parent.postMessage({
      event: 'redo'
    }, origin)
  } else if (map['meta'] && map['z']) {
    window.parent.postMessage({
      event: 'undo'
    }, origin)
  }
}

window.addEventListener('message', e => {
  if (e.data.event === 'refresh' || e.data.event === 'template') {
    let element = document.querySelectorAll('[' + e.data.id + '=""]')
    if (element.length) {
      let lastIndex = element.length - 1
      let currentIndex = 0
      element[currentIndex].bounding = element[currentIndex].getBoundingClientRect()
      element[currentIndex].computed = computedStyle(element[currentIndex])
      let b = element[currentIndex].bounding
      while (currentIndex < lastIndex && b.x === b.y === b.width === b.height === 0) {
        currentIndex++
        element[currentIndex].bounding = element[currentIndex].getBoundingClientRect()
        element[currentIndex].computed = computedStyle(element[currentIndex])
        b = element[currentIndex].bounding
      }
      SELECTED = cloneTarget(element[currentIndex], PROPERTIES)
      if (SELECTED.sid === 'sid-root') return selectRoot()
      window.parent.postMessage({
        event: e.data.event === 'template' ? 'refresh' : e.data.event,
        target: SELECTED
      }, origin)
    } else {
      SELECTED = { sid: e.data.id, hidden: true }
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
  } else if (e.data.event === 'positions-excluded' && SELECTED) {
    if (SELECTED.tagName?.toLowerCase() === 'body') {
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

window.addEventListener('resize', (e) => {
  let attr = [...e.target.attributes || []].find(attr => attr.name.includes('sid-'))
  if (attr) {
    scrolledElements[attr.name] = {
      scrollLeft: e.target.scrollLeft,
      scrollTop: e.target.scrollTop
    }
  } else {
    scrollX = window.scrollX
    scrollY = window.scrollY
  }
  fixPosition()
}, true)
window.addEventListener('scroll', (e) => {
  let attr = [...e.target.attributes || []].find(attr => attr.name.includes('sid-'))
  if (attr) {
    scrolledElements[attr.name] = {
      scrollLeft: e.target.scrollLeft,
      scrollTop: e.target.scrollTop
    }
  } else {
    scrollX = window.scrollX
    scrollY = window.scrollY
  }
  fixPosition()
}, true)

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
    let lastIndex = element.length - 1
    let currentIndex = 0
    SELECTED.bounding = element[currentIndex].getBoundingClientRect()
    SELECTED.computed = computedStyle(element[currentIndex])
    let b = SELECTED.bounding
    while (currentIndex < lastIndex && b.x === b.y === b.width === b.height === 0) {
      currentIndex++
      SELECTED.bounding = element[currentIndex].getBoundingClientRect()
      SELECTED.computed = computedStyle(element[currentIndex])
      b = SELECTED.bounding
    }
    window.parent.postMessage({
      event: 'refresh',
      target: SELECTED
    }, origin)
  } else if (SELECTED) {
    selectRoot()
  }
  setRouterOverlay()
}

let setRouterOverlay = () => {
  for (const element of document.querySelectorAll('.router-overlay')) {
    element.remove()
  }
  for (const el of document.querySelectorAll('[vue-play-router]')) {
    const rect = el.getBoundingClientRect()
    let element = document.createElement('div')
    element.classList.add('router-overlay')
    element.style.width = rect.width
    element.style.height = rect.height
    el.prepend(element)
  }
}

document.addEventListener('keydown', async (e) => {
  if (!FULL && e.key === 's' && (navigator.userAgent.indexOf('Mac') !== -1 ? e.metaKey : e.ctrlKey)) {
    e.preventDefault()
    window.parent.postMessage({event: 'store'}, origin)
  }
}, false)

window.addEventListener('click', e => {
  let targetLink = e.target.tagName.toLowerCase() === 'a' ? e.target : e.target.closest('a')
  if (
    targetLink &&
    [...targetLink.attributes || []].some(a => a.name.includes('href')) &&
    ![...targetLink.attributes || []].some(a => a.name.includes('vue-play-link'))
  ) {
    if (!FULL) e.preventDefault()
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
}

var style = document.createElement('style')
style.innerHTML = \`
  .router-overlay {
    position: absolute;
    pointer-events: none;
  }
  .router-overlay::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      -45deg,
      #606dbc,
      #606dbc 10px,
      #465298 10px,
      #465298 20px
    );
    opacity: .5;
    z-index: 10000;
  }
  .router-overlay::after {
    content: "ROUTER VIEW";
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 10px;
    background: #465298;
    border-radius: 4px;
    color: #fff;
    font-weight: bold;
    opacity: .9;
    font-size: .9rem;
    transform: translateX(-50%) translateY(-50%);
    z-index: 10000;
  }
  svg * {
    pointer-events: none;
  }
\`
document.getElementsByTagName('head')[0].appendChild(style)
`,B='(()=>{var xb=Object.create;var li=Object.defineProperty;var kb=Object.getOwnPropertyDescriptor;var Sb=Object.getOwnPropertyNames;var Cb=Object.getPrototypeOf,Ab=Object.prototype.hasOwnProperty;var uu=i=>li(i,"__esModule",{value:!0});var fu=i=>{if(typeof require!="undefined")return require(i);throw new Error(\'Dynamic require of "\'+i+\'" is not supported\')};var C=(i,e)=>()=>(i&&(e=i(i=0)),e);var v=(i,e)=>()=>(e||i((e={exports:{}}).exports,e),e.exports),Ae=(i,e)=>{uu(i);for(var t in e)li(i,t,{get:e[t],enumerable:!0})},_b=(i,e,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Sb(e))!Ab.call(i,r)&&r!=="default"&&li(i,r,{get:()=>e[r],enumerable:!(t=kb(e,r))||t.enumerable});return i},K=i=>_b(uu(li(i!=null?xb(Cb(i)):{},"default",i&&i.__esModule&&"default"in i?{get:()=>i.default,enumerable:!0}:{value:i,enumerable:!0})),i);var h,l=C(()=>{h={platform:"",env:{},versions:{node:"14.17.6"}}});var Ob,re,je=C(()=>{l();Ob=0,re={readFileSync:i=>self[i]||"",statSync:()=>({mtimeMs:Ob++}),promises:{readFile:i=>Promise.resolve(self[i]||"")}}});var Qn=v((XO,pu)=>{l();"use strict";var cu=class{constructor(e={}){if(!(e.maxSize&&e.maxSize>0))throw new TypeError("`maxSize` must be a number greater than 0");if(typeof e.maxAge=="number"&&e.maxAge===0)throw new TypeError("`maxAge` must be a number greater than 0");this.maxSize=e.maxSize,this.maxAge=e.maxAge||1/0,this.onEviction=e.onEviction,this.cache=new Map,this.oldCache=new Map,this._size=0}_emitEvictions(e){if(typeof this.onEviction=="function")for(let[t,r]of e)this.onEviction(t,r.value)}_deleteIfExpired(e,t){return typeof t.expiry=="number"&&t.expiry<=Date.now()?(typeof this.onEviction=="function"&&this.onEviction(e,t.value),this.delete(e)):!1}_getOrDeleteIfExpired(e,t){if(this._deleteIfExpired(e,t)===!1)return t.value}_getItemValue(e,t){return t.expiry?this._getOrDeleteIfExpired(e,t):t.value}_peek(e,t){let r=t.get(e);return this._getItemValue(e,r)}_set(e,t){this.cache.set(e,t),this._size++,this._size>=this.maxSize&&(this._size=0,this._emitEvictions(this.oldCache),this.oldCache=this.cache,this.cache=new Map)}_moveToRecent(e,t){this.oldCache.delete(e),this._set(e,t)}*_entriesAscending(){for(let e of this.oldCache){let[t,r]=e;this.cache.has(t)||this._deleteIfExpired(t,r)===!1&&(yield e)}for(let e of this.cache){let[t,r]=e;this._deleteIfExpired(t,r)===!1&&(yield e)}}get(e){if(this.cache.has(e)){let t=this.cache.get(e);return this._getItemValue(e,t)}if(this.oldCache.has(e)){let t=this.oldCache.get(e);if(this._deleteIfExpired(e,t)===!1)return this._moveToRecent(e,t),t.value}}set(e,t,{maxAge:r=this.maxAge===1/0?void 0:Date.now()+this.maxAge}={}){this.cache.has(e)?this.cache.set(e,{value:t,maxAge:r}):this._set(e,{value:t,expiry:r})}has(e){return this.cache.has(e)?!this._deleteIfExpired(e,this.cache.get(e)):this.oldCache.has(e)?!this._deleteIfExpired(e,this.oldCache.get(e)):!1}peek(e){if(this.cache.has(e))return this._peek(e,this.cache);if(this.oldCache.has(e))return this._peek(e,this.oldCache)}delete(e){let t=this.cache.delete(e);return t&&this._size--,this.oldCache.delete(e)||t}clear(){this.cache.clear(),this.oldCache.clear(),this._size=0}resize(e){if(!(e&&e>0))throw new TypeError("`maxSize` must be a number greater than 0");let t=[...this._entriesAscending()],r=t.length-e;r<0?(this.cache=new Map(t),this.oldCache=new Map,this._size=t.length):(r>0&&this._emitEvictions(t.slice(0,r)),this.oldCache=new Map(t.slice(r)),this.cache=new Map,this._size=0),this.maxSize=e}*keys(){for(let[e]of this)yield e}*values(){for(let[,e]of this)yield e}*[Symbol.iterator](){for(let e of this.cache){let[t,r]=e;this._deleteIfExpired(t,r)===!1&&(yield[t,r.value])}for(let e of this.oldCache){let[t,r]=e;this.cache.has(t)||this._deleteIfExpired(t,r)===!1&&(yield[t,r.value])}}*entriesDescending(){let e=[...this.cache];for(let t=e.length-1;t>=0;--t){let r=e[t],[n,a]=r;this._deleteIfExpired(n,a)===!1&&(yield[n,a.value])}e=[...this.oldCache];for(let t=e.length-1;t>=0;--t){let r=e[t],[n,a]=r;this.cache.has(n)||this._deleteIfExpired(n,a)===!1&&(yield[n,a.value])}}*entriesAscending(){for(let[e,t]of this._entriesAscending())yield[e,t.value]}get size(){if(!this._size)return this.oldCache.size;let e=0;for(let t of this.oldCache.keys())this.cache.has(t)||e++;return Math.min(this._size+e,this.maxSize)}};pu.exports=cu});var du,hu=C(()=>{l();du=i=>i&&i._hash});function ui(i){return du(i,{ignoreUnknown:!0})}var mu=C(()=>{l();hu()});function Xe(i){if(i=`${i}`,i==="0")return"0";if(/^[+-]?(\\d+|\\d*\\.\\d+)(e[+-]?\\d+)?(%|\\w+)?$/.test(i))return i.replace(/^[+-]?/,t=>t==="-"?"":"-");let e=["var","calc","min","max","clamp"];for(let t of e)if(i.includes(`${t}(`))return`calc(${i} * -1)`}var fi=C(()=>{l()});var gu,yu=C(()=>{l();gu=["preflight","container","accessibility","pointerEvents","visibility","position","inset","isolation","zIndex","order","gridColumn","gridColumnStart","gridColumnEnd","gridRow","gridRowStart","gridRowEnd","float","clear","margin","boxSizing","lineClamp","display","aspectRatio","size","height","maxHeight","minHeight","width","minWidth","maxWidth","flex","flexShrink","flexGrow","flexBasis","tableLayout","captionSide","borderCollapse","borderSpacing","transformOrigin","translate","rotate","skew","scale","transform","animation","cursor","touchAction","userSelect","resize","scrollSnapType","scrollSnapAlign","scrollSnapStop","scrollMargin","scrollPadding","listStylePosition","listStyleType","listStyleImage","appearance","columns","breakBefore","breakInside","breakAfter","gridAutoColumns","gridAutoFlow","gridAutoRows","gridTemplateColumns","gridTemplateRows","flexDirection","flexWrap","placeContent","placeItems","alignContent","alignItems","justifyContent","justifyItems","gap","space","divideWidth","divideStyle","divideColor","divideOpacity","placeSelf","alignSelf","justifySelf","overflow","overscrollBehavior","scrollBehavior","textOverflow","hyphens","whitespace","textWrap","wordBreak","borderRadius","borderWidth","borderStyle","borderColor","borderOpacity","backgroundColor","backgroundOpacity","backgroundImage","gradientColorStops","boxDecorationBreak","backgroundSize","backgroundAttachment","backgroundClip","backgroundPosition","backgroundRepeat","backgroundOrigin","fill","stroke","strokeWidth","objectFit","objectPosition","padding","textAlign","textIndent","verticalAlign","fontFamily","fontSize","fontWeight","textTransform","fontStyle","fontVariantNumeric","lineHeight","letterSpacing","textColor","textOpacity","textDecoration","textDecorationColor","textDecorationStyle","textDecorationThickness","textUnderlineOffset","fontSmoothing","placeholderColor","placeholderOpacity","caretColor","accentColor","opacity","backgroundBlendMode","mixBlendMode","boxShadow","boxShadowColor","outlineStyle","outlineWidth","outlineOffset","outlineColor","ringWidth","ringColor","ringOpacity","ringOffsetWidth","ringOffsetColor","blur","brightness","contrast","dropShadow","grayscale","hueRotate","invert","saturate","sepia","filter","backdropBlur","backdropBrightness","backdropContrast","backdropGrayscale","backdropHueRotate","backdropInvert","backdropOpacity","backdropSaturate","backdropSepia","backdropFilter","transitionProperty","transitionDelay","transitionDuration","transitionTimingFunction","willChange","content","forcedColorAdjust"]});function wu(i,e){return i===void 0?e:Array.isArray(i)?i:[...new Set(e.filter(r=>i!==!1&&i[r]!==!1).concat(Object.keys(i).filter(r=>i[r]!==!1)))]}var bu=C(()=>{l()});var vu={};Ae(vu,{default:()=>_e});var _e,ci=C(()=>{l();_e=new Proxy({},{get:()=>String})});function Jn(i,e,t){typeof h!="undefined"&&h.env.JEST_WORKER_ID||t&&xu.has(t)||(t&&xu.add(t),console.warn(""),e.forEach(r=>console.warn(i,"-",r)))}function Xn(i){return _e.dim(i)}var xu,F,Oe=C(()=>{l();ci();xu=new Set;F={info(i,e){Jn(_e.bold(_e.cyan("info")),...Array.isArray(i)?[i]:[e,i])},warn(i,e){["content-problems"].includes(i)||Jn(_e.bold(_e.yellow("warn")),...Array.isArray(i)?[i]:[e,i])},risk(i,e){Jn(_e.bold(_e.magenta("risk")),...Array.isArray(i)?[i]:[e,i])}}});var ku={};Ae(ku,{default:()=>Kn});function sr({version:i,from:e,to:t}){F.warn(`${e}-color-renamed`,[`As of Tailwind CSS ${i}, \\`${e}\\` has been renamed to \\`${t}\\`.`,"Update your configuration file to silence this warning."])}var Kn,Zn=C(()=>{l();Oe();Kn={inherit:"inherit",current:"currentColor",transparent:"transparent",black:"#000",white:"#fff",slate:{50:"#f8fafc",100:"#f1f5f9",200:"#e2e8f0",300:"#cbd5e1",400:"#94a3b8",500:"#64748b",600:"#475569",700:"#334155",800:"#1e293b",900:"#0f172a",950:"#020617"},gray:{50:"#f9fafb",100:"#f3f4f6",200:"#e5e7eb",300:"#d1d5db",400:"#9ca3af",500:"#6b7280",600:"#4b5563",700:"#374151",800:"#1f2937",900:"#111827",950:"#030712"},zinc:{50:"#fafafa",100:"#f4f4f5",200:"#e4e4e7",300:"#d4d4d8",400:"#a1a1aa",500:"#71717a",600:"#52525b",700:"#3f3f46",800:"#27272a",900:"#18181b",950:"#09090b"},neutral:{50:"#fafafa",100:"#f5f5f5",200:"#e5e5e5",300:"#d4d4d4",400:"#a3a3a3",500:"#737373",600:"#525252",700:"#404040",800:"#262626",900:"#171717",950:"#0a0a0a"},stone:{50:"#fafaf9",100:"#f5f5f4",200:"#e7e5e4",300:"#d6d3d1",400:"#a8a29e",500:"#78716c",600:"#57534e",700:"#44403c",800:"#292524",900:"#1c1917",950:"#0c0a09"},red:{50:"#fef2f2",100:"#fee2e2",200:"#fecaca",300:"#fca5a5",400:"#f87171",500:"#ef4444",600:"#dc2626",700:"#b91c1c",800:"#991b1b",900:"#7f1d1d",950:"#450a0a"},orange:{50:"#fff7ed",100:"#ffedd5",200:"#fed7aa",300:"#fdba74",400:"#fb923c",500:"#f97316",600:"#ea580c",700:"#c2410c",800:"#9a3412",900:"#7c2d12",950:"#431407"},amber:{50:"#fffbeb",100:"#fef3c7",200:"#fde68a",300:"#fcd34d",400:"#fbbf24",500:"#f59e0b",600:"#d97706",700:"#b45309",800:"#92400e",900:"#78350f",950:"#451a03"},yellow:{50:"#fefce8",100:"#fef9c3",200:"#fef08a",300:"#fde047",400:"#facc15",500:"#eab308",600:"#ca8a04",700:"#a16207",800:"#854d0e",900:"#713f12",950:"#422006"},lime:{50:"#f7fee7",100:"#ecfccb",200:"#d9f99d",300:"#bef264",400:"#a3e635",500:"#84cc16",600:"#65a30d",700:"#4d7c0f",800:"#3f6212",900:"#365314",950:"#1a2e05"},green:{50:"#f0fdf4",100:"#dcfce7",200:"#bbf7d0",300:"#86efac",400:"#4ade80",500:"#22c55e",600:"#16a34a",700:"#15803d",800:"#166534",900:"#14532d",950:"#052e16"},emerald:{50:"#ecfdf5",100:"#d1fae5",200:"#a7f3d0",300:"#6ee7b7",400:"#34d399",500:"#10b981",600:"#059669",700:"#047857",800:"#065f46",900:"#064e3b",950:"#022c22"},teal:{50:"#f0fdfa",100:"#ccfbf1",200:"#99f6e4",300:"#5eead4",400:"#2dd4bf",500:"#14b8a6",600:"#0d9488",700:"#0f766e",800:"#115e59",900:"#134e4a",950:"#042f2e"},cyan:{50:"#ecfeff",100:"#cffafe",200:"#a5f3fc",300:"#67e8f9",400:"#22d3ee",500:"#06b6d4",600:"#0891b2",700:"#0e7490",800:"#155e75",900:"#164e63",950:"#083344"},sky:{50:"#f0f9ff",100:"#e0f2fe",200:"#bae6fd",300:"#7dd3fc",400:"#38bdf8",500:"#0ea5e9",600:"#0284c7",700:"#0369a1",800:"#075985",900:"#0c4a6e",950:"#082f49"},blue:{50:"#eff6ff",100:"#dbeafe",200:"#bfdbfe",300:"#93c5fd",400:"#60a5fa",500:"#3b82f6",600:"#2563eb",700:"#1d4ed8",800:"#1e40af",900:"#1e3a8a",950:"#172554"},indigo:{50:"#eef2ff",100:"#e0e7ff",200:"#c7d2fe",300:"#a5b4fc",400:"#818cf8",500:"#6366f1",600:"#4f46e5",700:"#4338ca",800:"#3730a3",900:"#312e81",950:"#1e1b4b"},violet:{50:"#f5f3ff",100:"#ede9fe",200:"#ddd6fe",300:"#c4b5fd",400:"#a78bfa",500:"#8b5cf6",600:"#7c3aed",700:"#6d28d9",800:"#5b21b6",900:"#4c1d95",950:"#2e1065"},purple:{50:"#faf5ff",100:"#f3e8ff",200:"#e9d5ff",300:"#d8b4fe",400:"#c084fc",500:"#a855f7",600:"#9333ea",700:"#7e22ce",800:"#6b21a8",900:"#581c87",950:"#3b0764"},fuchsia:{50:"#fdf4ff",100:"#fae8ff",200:"#f5d0fe",300:"#f0abfc",400:"#e879f9",500:"#d946ef",600:"#c026d3",700:"#a21caf",800:"#86198f",900:"#701a75",950:"#4a044e"},pink:{50:"#fdf2f8",100:"#fce7f3",200:"#fbcfe8",300:"#f9a8d4",400:"#f472b6",500:"#ec4899",600:"#db2777",700:"#be185d",800:"#9d174d",900:"#831843",950:"#500724"},rose:{50:"#fff1f2",100:"#ffe4e6",200:"#fecdd3",300:"#fda4af",400:"#fb7185",500:"#f43f5e",600:"#e11d48",700:"#be123c",800:"#9f1239",900:"#881337",950:"#4c0519"},get lightBlue(){return sr({version:"v2.2",from:"lightBlue",to:"sky"}),this.sky},get warmGray(){return sr({version:"v3.0",from:"warmGray",to:"stone"}),this.stone},get trueGray(){return sr({version:"v3.0",from:"trueGray",to:"neutral"}),this.neutral},get coolGray(){return sr({version:"v3.0",from:"coolGray",to:"gray"}),this.gray},get blueGray(){return sr({version:"v3.0",from:"blueGray",to:"slate"}),this.slate}}});function es(i,...e){for(let t of e){for(let r in t)i?.hasOwnProperty?.(r)||(i[r]=t[r]);for(let r of Object.getOwnPropertySymbols(t))i?.hasOwnProperty?.(r)||(i[r]=t[r])}return i}var Su=C(()=>{l()});function Ke(i){if(Array.isArray(i))return i;let e=i.split("[").length-1,t=i.split("]").length-1;if(e!==t)throw new Error(`Path is invalid. Has unbalanced brackets: ${i}`);return i.split(/\\.(?![^\\[]*\\])|[\\[\\]]/g).filter(Boolean)}var pi=C(()=>{l()});function Z(i,e){return di.future.includes(e)?i.future==="all"||(i?.future?.[e]??Cu[e]??!1):di.experimental.includes(e)?i.experimental==="all"||(i?.experimental?.[e]??Cu[e]??!1):!1}function Au(i){return i.experimental==="all"?di.experimental:Object.keys(i?.experimental??{}).filter(e=>di.experimental.includes(e)&&i.experimental[e])}function _u(i){if(h.env.JEST_WORKER_ID===void 0&&Au(i).length>0){let e=Au(i).map(t=>_e.yellow(t)).join(", ");F.warn("experimental-flags-enabled",[`You have enabled experimental features: ${e}`,"Experimental features in Tailwind CSS are not covered by semver, may introduce breaking changes, and can change at any time."])}}var Cu,di,ze=C(()=>{l();ci();Oe();Cu={optimizeUniversalDefaults:!1,generalizedModifiers:!0,get disableColorOpacityUtilitiesByDefault(){return!1},get relativeContentPathsByDefault(){return!1}},di={future:["hoverOnlyWhenSupported","respectDefaultRingColorOpacity","disableColorOpacityUtilitiesByDefault","relativeContentPathsByDefault"],experimental:["optimizeUniversalDefaults","generalizedModifiers"]}});function Ou(i){(()=>{if(i.purge||!i.content||!Array.isArray(i.content)&&!(typeof i.content=="object"&&i.content!==null))return!1;if(Array.isArray(i.content))return i.content.every(t=>typeof t=="string"?!0:!(typeof t?.raw!="string"||t?.extension&&typeof t?.extension!="string"));if(typeof i.content=="object"&&i.content!==null){if(Object.keys(i.content).some(t=>!["files","relative","extract","transform"].includes(t)))return!1;if(Array.isArray(i.content.files)){if(!i.content.files.every(t=>typeof t=="string"?!0:!(typeof t?.raw!="string"||t?.extension&&typeof t?.extension!="string")))return!1;if(typeof i.content.extract=="object"){for(let t of Object.values(i.content.extract))if(typeof t!="function")return!1}else if(!(i.content.extract===void 0||typeof i.content.extract=="function"))return!1;if(typeof i.content.transform=="object"){for(let t of Object.values(i.content.transform))if(typeof t!="function")return!1}else if(!(i.content.transform===void 0||typeof i.content.transform=="function"))return!1;if(typeof i.content.relative!="boolean"&&typeof i.content.relative!="undefined")return!1}return!0}return!1})()||F.warn("purge-deprecation",["The `purge`/`content` options have changed in Tailwind CSS v3.0.","Update your configuration file to eliminate this warning.","https://tailwindcss.com/docs/upgrade-guide#configure-content-sources"]),i.safelist=(()=>{let{content:t,purge:r,safelist:n}=i;return Array.isArray(n)?n:Array.isArray(t?.safelist)?t.safelist:Array.isArray(r?.safelist)?r.safelist:Array.isArray(r?.options?.safelist)?r.options.safelist:[]})(),i.blocklist=(()=>{let{blocklist:t}=i;if(Array.isArray(t)){if(t.every(r=>typeof r=="string"))return t;F.warn("blocklist-invalid",["The `blocklist` option must be an array of strings.","https://tailwindcss.com/docs/content-configuration#discarding-classes"])}return[]})(),typeof i.prefix=="function"?(F.warn("prefix-function",["As of Tailwind CSS v3.0, `prefix` cannot be a function.","Update `prefix` in your configuration to be a string to eliminate this warning.","https://tailwindcss.com/docs/upgrade-guide#prefix-cannot-be-a-function"]),i.prefix=""):i.prefix=i.prefix??"",i.content={relative:(()=>{let{content:t}=i;return t?.relative?t.relative:Z(i,"relativeContentPathsByDefault")})(),files:(()=>{let{content:t,purge:r}=i;return Array.isArray(r)?r:Array.isArray(r?.content)?r.content:Array.isArray(t)?t:Array.isArray(t?.content)?t.content:Array.isArray(t?.files)?t.files:[]})(),extract:(()=>{let t=(()=>i.purge?.extract?i.purge.extract:i.content?.extract?i.content.extract:i.purge?.extract?.DEFAULT?i.purge.extract.DEFAULT:i.content?.extract?.DEFAULT?i.content.extract.DEFAULT:i.purge?.options?.extractors?i.purge.options.extractors:i.content?.options?.extractors?i.content.options.extractors:{})(),r={},n=(()=>{if(i.purge?.options?.defaultExtractor)return i.purge.options.defaultExtractor;if(i.content?.options?.defaultExtractor)return i.content.options.defaultExtractor})();if(n!==void 0&&(r.DEFAULT=n),typeof t=="function")r.DEFAULT=t;else if(Array.isArray(t))for(let{extensions:a,extractor:s}of t??[])for(let o of a)r[o]=s;else typeof t=="object"&&t!==null&&Object.assign(r,t);return r})(),transform:(()=>{let t=(()=>i.purge?.transform?i.purge.transform:i.content?.transform?i.content.transform:i.purge?.transform?.DEFAULT?i.purge.transform.DEFAULT:i.content?.transform?.DEFAULT?i.content.transform.DEFAULT:{})(),r={};return typeof t=="function"&&(r.DEFAULT=t),typeof t=="object"&&t!==null&&Object.assign(r,t),r})()};for(let t of i.content.files)if(typeof t=="string"&&/{([^,]*?)}/g.test(t)){F.warn("invalid-glob-braces",[`The glob pattern ${Xn(t)} in your Tailwind CSS configuration is invalid.`,`Update it to ${Xn(t.replace(/{([^,]*?)}/g,"$1"))} to silence this warning.`]);break}return i}var Eu=C(()=>{l();ze();Oe()});function ne(i){if(Object.prototype.toString.call(i)!=="[object Object]")return!1;let e=Object.getPrototypeOf(i);return e===null||Object.getPrototypeOf(e)===null}var kt=C(()=>{l()});function Ze(i){return Array.isArray(i)?i.map(e=>Ze(e)):typeof i=="object"&&i!==null?Object.fromEntries(Object.entries(i).map(([e,t])=>[e,Ze(t)])):i}var hi=C(()=>{l()});function mt(i){return i.replace(/\\\\,/g,"\\\\2c ")}var mi=C(()=>{l()});var ts,Tu=C(()=>{l();ts={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}});function ar(i,{loose:e=!1}={}){if(typeof i!="string")return null;if(i=i.trim(),i==="transparent")return{mode:"rgb",color:["0","0","0"],alpha:"0"};if(i in ts)return{mode:"rgb",color:ts[i].map(a=>a.toString())};let t=i.replace(Tb,(a,s,o,u,c)=>["#",s,s,o,o,u,u,c?c+c:""].join("")).match(Eb);if(t!==null)return{mode:"rgb",color:[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)].map(a=>a.toString()),alpha:t[4]?(parseInt(t[4],16)/255).toString():void 0};let r=i.match(Pb)??i.match(Db);if(r===null)return null;let n=[r[2],r[3],r[4]].filter(Boolean).map(a=>a.toString());return n.length===2&&n[0].startsWith("var(")?{mode:r[1],color:[n[0]],alpha:n[1]}:!e&&n.length!==3||n.length<3&&!n.some(a=>/^var\\(.*?\\)$/.test(a))?null:{mode:r[1],color:n,alpha:r[5]?.toString?.()}}function rs({mode:i,color:e,alpha:t}){let r=t!==void 0;return i==="rgba"||i==="hsla"?`${i}(${e.join(", ")}${r?`, ${t}`:""})`:`${i}(${e.join(" ")}${r?` / ${t}`:""})`}var Eb,Tb,et,gi,Pu,tt,Pb,Db,is=C(()=>{l();Tu();Eb=/^#([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})?$/i,Tb=/^#([a-f\\d])([a-f\\d])([a-f\\d])([a-f\\d])?$/i,et=/(?:\\d+|\\d*\\.\\d+)%?/,gi=/(?:\\s*,\\s*|\\s+)/,Pu=/\\s*[,/]\\s*/,tt=/var\\(--(?:[^ )]*?)(?:,(?:[^ )]*?|var\\(--[^ )]*?\\)))?\\)/,Pb=new RegExp(`^(rgba?)\\\\(\\\\s*(${et.source}|${tt.source})(?:${gi.source}(${et.source}|${tt.source}))?(?:${gi.source}(${et.source}|${tt.source}))?(?:${Pu.source}(${et.source}|${tt.source}))?\\\\s*\\\\)$`),Db=new RegExp(`^(hsla?)\\\\(\\\\s*((?:${et.source})(?:deg|rad|grad|turn)?|${tt.source})(?:${gi.source}(${et.source}|${tt.source}))?(?:${gi.source}(${et.source}|${tt.source}))?(?:${Pu.source}(${et.source}|${tt.source}))?\\\\s*\\\\)$`)});function De(i,e,t){if(typeof i=="function")return i({opacityValue:e});let r=ar(i,{loose:!0});return r===null?t:rs({...r,alpha:e})}function ae({color:i,property:e,variable:t}){let r=[].concat(e);if(typeof i=="function")return{[t]:"1",...Object.fromEntries(r.map(a=>[a,i({opacityVariable:t,opacityValue:`var(${t})`})]))};let n=ar(i);return n===null?Object.fromEntries(r.map(a=>[a,i])):n.alpha!==void 0?Object.fromEntries(r.map(a=>[a,i])):{[t]:"1",...Object.fromEntries(r.map(a=>[a,rs({...n,alpha:`var(${t})`})]))}}var or=C(()=>{l();is()});function oe(i,e){let t=[],r=[],n=0,a=!1;for(let s=0;s<i.length;s++){let o=i[s];t.length===0&&o===e[0]&&!a&&(e.length===1||i.slice(s,s+e.length)===e)&&(r.push(i.slice(n,s)),n=s+e.length),a?a=!1:o==="\\\\"&&(a=!0),o==="("||o==="["||o==="{"?t.push(o):(o===")"&&t[t.length-1]==="("||o==="]"&&t[t.length-1]==="["||o==="}"&&t[t.length-1]==="{")&&t.pop()}return r.push(i.slice(n)),r}var St=C(()=>{l()});function yi(i){return oe(i,",").map(t=>{let r=t.trim(),n={raw:r},a=r.split(qb),s=new Set;for(let o of a)Du.lastIndex=0,!s.has("KEYWORD")&&Ib.has(o)?(n.keyword=o,s.add("KEYWORD")):Du.test(o)?s.has("X")?s.has("Y")?s.has("BLUR")?s.has("SPREAD")||(n.spread=o,s.add("SPREAD")):(n.blur=o,s.add("BLUR")):(n.y=o,s.add("Y")):(n.x=o,s.add("X")):n.color?(n.unknown||(n.unknown=[]),n.unknown.push(o)):n.color=o;return n.valid=n.x!==void 0&&n.y!==void 0,n})}function Iu(i){return i.map(e=>e.valid?[e.keyword,e.x,e.y,e.blur,e.spread,e.color].filter(Boolean).join(" "):e.raw).join(", ")}var Ib,qb,Du,ns=C(()=>{l();St();Ib=new Set(["inset","inherit","initial","revert","unset"]),qb=/\\ +(?![^(]*\\))/g,Du=/^-?(\\d+|\\.\\d+)(.*?)$/g});function ss(i){return Rb.some(e=>new RegExp(`^${e}\\\\(.*\\\\)`).test(i))}function N(i,e=null,t=!0){let r=e&&Mb.has(e.property);return i.startsWith("--")&&!r?`var(${i})`:i.includes("url(")?i.split(/(url\\(.*?\\))/g).filter(Boolean).map(n=>/^url\\(.*?\\)$/.test(n)?n:N(n,e,!1)).join(""):(i=i.replace(/([^\\\\])_+/g,(n,a)=>a+" ".repeat(n.length-1)).replace(/^_/g," ").replace(/\\\\_/g,"_"),t&&(i=i.trim()),i=Bb(i),i)}function Bb(i){let e=["theme"],t=["min-content","max-content","fit-content","safe-area-inset-top","safe-area-inset-right","safe-area-inset-bottom","safe-area-inset-left","titlebar-area-x","titlebar-area-y","titlebar-area-width","titlebar-area-height","keyboard-inset-top","keyboard-inset-right","keyboard-inset-bottom","keyboard-inset-left","keyboard-inset-width","keyboard-inset-height","radial-gradient","linear-gradient","conic-gradient","repeating-radial-gradient","repeating-linear-gradient","repeating-conic-gradient"];return i.replace(/(calc|min|max|clamp)\\(.+\\)/g,r=>{let n="";function a(){let s=n.trimEnd();return s[s.length-1]}for(let s=0;s<r.length;s++){let o=function(f){return f.split("").every((d,p)=>r[s+p]===d)},u=function(f){let d=1/0;for(let m of f){let w=r.indexOf(m,s);w!==-1&&w<d&&(d=w)}let p=r.slice(s,d);return s+=p.length-1,p},c=r[s];if(o("var"))n+=u([")",","]);else if(t.some(f=>o(f))){let f=t.find(d=>o(d));n+=f,s+=f.length-1}else e.some(f=>o(f))?n+=u([")"]):o("[")?n+=u(["]"]):["+","-","*","/"].includes(c)&&!["(","+","-","*","/",","].includes(a())?n+=` ${c} `:n+=c}return n.replace(/\\s+/g," ")})}function as(i){return i.startsWith("url(")}function os(i){return!isNaN(Number(i))||ss(i)}function lr(i){return i.endsWith("%")&&os(i.slice(0,-1))||ss(i)}function ur(i){return i==="0"||new RegExp(`^[+-]?[0-9]*.?[0-9]+(?:[eE][+-]?[0-9]+)?${Nb}$`).test(i)||ss(i)}function qu(i){return Lb.has(i)}function Ru(i){let e=yi(N(i));for(let t of e)if(!t.valid)return!1;return!0}function Mu(i){let e=0;return oe(i,"_").every(r=>(r=N(r),r.startsWith("var(")?!0:ar(r,{loose:!0})!==null?(e++,!0):!1))?e>0:!1}function Bu(i){let e=0;return oe(i,",").every(r=>(r=N(r),r.startsWith("var(")?!0:as(r)||jb(r)||["element(","image(","cross-fade(","image-set("].some(n=>r.startsWith(n))?(e++,!0):!1))?e>0:!1}function jb(i){i=N(i);for(let e of $b)if(i.startsWith(`${e}(`))return!0;return!1}function Fu(i){let e=0;return oe(i,"_").every(r=>(r=N(r),r.startsWith("var(")?!0:zb.has(r)||ur(r)||lr(r)?(e++,!0):!1))?e>0:!1}function Nu(i){let e=0;return oe(i,",").every(r=>(r=N(r),r.startsWith("var(")?!0:r.includes(" ")&&!/([\'"])([^"\']+)\\1/g.test(r)||/^\\d/g.test(r)?!1:(e++,!0)))?e>0:!1}function Lu(i){return Vb.has(i)}function $u(i){return Ub.has(i)}function ju(i){return Wb.has(i)}var Rb,Mb,Fb,Nb,Lb,$b,zb,Vb,Ub,Wb,fr=C(()=>{l();is();ns();St();Rb=["min","max","clamp","calc"];Mb=new Set(["scroll-timeline-name","timeline-scope","view-timeline-name","font-palette","scroll-timeline","animation-timeline","view-timeline"]);Fb=["cm","mm","Q","in","pc","pt","px","em","ex","ch","rem","lh","rlh","vw","vh","vmin","vmax","vb","vi","svw","svh","lvw","lvh","dvw","dvh","cqw","cqh","cqi","cqb","cqmin","cqmax"],Nb=`(?:${Fb.join("|")})`;Lb=new Set(["thin","medium","thick"]);$b=new Set(["conic-gradient","linear-gradient","radial-gradient","repeating-conic-gradient","repeating-linear-gradient","repeating-radial-gradient"]);zb=new Set(["center","top","right","bottom","left"]);Vb=new Set(["serif","sans-serif","monospace","cursive","fantasy","system-ui","ui-serif","ui-sans-serif","ui-monospace","ui-rounded","math","emoji","fangsong"]);Ub=new Set(["xx-small","x-small","small","medium","large","x-large","x-large","xxx-large"]);Wb=new Set(["larger","smaller"])});function zu(i){let e=["cover","contain"];return oe(i,",").every(t=>{let r=oe(t,"_").filter(Boolean);return r.length===1&&e.includes(r[0])?!0:r.length!==1&&r.length!==2?!1:r.every(n=>ur(n)||lr(n)||n==="auto")})}var Vu=C(()=>{l();fr();St()});function Uu(i,e){i.walkClasses(t=>{t.value=e(t.value),t.raws&&t.raws.value&&(t.raws.value=mt(t.raws.value))})}function Wu(i,e){if(!rt(i))return;let t=i.slice(1,-1);if(!!e(t))return N(t)}function Gb(i,e={},t){let r=e[i];if(r!==void 0)return Xe(r);if(rt(i)){let n=Wu(i,t);return n===void 0?void 0:Xe(n)}}function wi(i,e={},{validate:t=()=>!0}={}){let r=e.values?.[i];return r!==void 0?r:e.supportsNegativeValues&&i.startsWith("-")?Gb(i.slice(1),e.values,t):Wu(i,t)}function rt(i){return i.startsWith("[")&&i.endsWith("]")}function Gu(i){let e=i.lastIndexOf("/"),t=i.lastIndexOf("[",e),r=i.indexOf("]",e);return i[e-1]==="]"||i[e+1]==="["||t!==-1&&r!==-1&&t<e&&e<r&&(e=i.lastIndexOf("/",t)),e===-1||e===i.length-1?[i,void 0]:rt(i)&&!i.includes("]/[")?[i,void 0]:[i.slice(0,e),i.slice(e+1)]}function Ct(i){if(typeof i=="string"&&i.includes("<alpha-value>")){let e=i;return({opacityValue:t=1})=>e.replace("<alpha-value>",t)}return i}function Hu(i){return N(i.slice(1,-1))}function Hb(i,e={},{tailwindConfig:t={}}={}){if(e.values?.[i]!==void 0)return Ct(e.values?.[i]);let[r,n]=Gu(i);if(n!==void 0){let a=e.values?.[r]??(rt(r)?r.slice(1,-1):void 0);return a===void 0?void 0:(a=Ct(a),rt(n)?De(a,Hu(n)):t.theme?.opacity?.[n]===void 0?void 0:De(a,t.theme.opacity[n]))}return wi(i,e,{validate:Mu})}function Yb(i,e={}){return e.values?.[i]}function me(i){return(e,t)=>wi(e,t,{validate:i})}function Qb(i,e){let t=i.indexOf(e);return t===-1?[void 0,i]:[i.slice(0,t),i.slice(t+1)]}function us(i,e,t,r){if(t.values&&e in t.values)for(let{type:a}of i??[]){let s=ls[a](e,t,{tailwindConfig:r});if(s!==void 0)return[s,a,null]}if(rt(e)){let a=e.slice(1,-1),[s,o]=Qb(a,":");if(!/^[\\w-_]+$/g.test(s))o=a;else if(s!==void 0&&!Yu.includes(s))return[];if(o.length>0&&Yu.includes(s))return[wi(`[${o}]`,t),s,null]}let n=fs(i,e,t,r);for(let a of n)return a;return[]}function*fs(i,e,t,r){let n=Z(r,"generalizedModifiers"),[a,s]=Gu(e);if(n&&t.modifiers!=null&&(t.modifiers==="any"||typeof t.modifiers=="object"&&(s&&rt(s)||s in t.modifiers))||(a=e,s=void 0),s!==void 0&&a===""&&(a="DEFAULT"),s!==void 0&&typeof t.modifiers=="object"){let u=t.modifiers?.[s]??null;u!==null?s=u:rt(s)&&(s=Hu(s))}for(let{type:u}of i??[]){let c=ls[u](a,t,{tailwindConfig:r});c!==void 0&&(yield[c,u,s??null])}}var ls,Yu,cr=C(()=>{l();mi();or();fr();fi();Vu();ze();ls={any:wi,color:Hb,url:me(as),image:me(Bu),length:me(ur),percentage:me(lr),position:me(Fu),lookup:Yb,"generic-name":me(Lu),"family-name":me(Nu),number:me(os),"line-width":me(qu),"absolute-size":me($u),"relative-size":me(ju),shadow:me(Ru),size:me(zu)},Yu=Object.keys(ls)});function L(i){return typeof i=="function"?i({}):i}var cs=C(()=>{l()});function At(i){return typeof i=="function"}function pr(i,...e){let t=e.pop();for(let r of e)for(let n in r){let a=t(i[n],r[n]);a===void 0?ne(i[n])&&ne(r[n])?i[n]=pr({},i[n],r[n],t):i[n]=r[n]:i[n]=a}return i}function Jb(i,...e){return At(i)?i(...e):i}function Xb(i){return i.reduce((e,{extend:t})=>pr(e,t,(r,n)=>r===void 0?[n]:Array.isArray(r)?[n,...r]:[n,r]),{})}function Kb(i){return{...i.reduce((e,t)=>es(e,t),{}),extend:Xb(i)}}function Qu(i,e){if(Array.isArray(i)&&ne(i[0]))return i.concat(e);if(Array.isArray(e)&&ne(e[0])&&ne(i))return[i,...e];if(Array.isArray(e))return e}function Zb({extend:i,...e}){return pr(e,i,(t,r)=>!At(t)&&!r.some(At)?pr({},t,...r,Qu):(n,a)=>pr({},...[t,...r].map(s=>Jb(s,n,a)),Qu))}function*e0(i){let e=Ke(i);if(e.length===0||(yield e,Array.isArray(i)))return;let t=/^(.*?)\\s*\\/\\s*([^/]+)$/,r=i.match(t);if(r!==null){let[,n,a]=r,s=Ke(n);s.alpha=a,yield s}}function t0(i){let e=(t,r)=>{for(let n of e0(t)){let a=0,s=i;for(;s!=null&&a<n.length;)s=s[n[a++]],s=At(s)&&(n.alpha===void 0||a<=n.length-1)?s(e,ps):s;if(s!==void 0){if(n.alpha!==void 0){let o=Ct(s);return De(o,n.alpha,L(o))}return ne(s)?Ze(s):s}}return r};return Object.assign(e,{theme:e,...ps}),Object.keys(i).reduce((t,r)=>(t[r]=At(i[r])?i[r](e,ps):i[r],t),{})}function Ju(i){let e=[];return i.forEach(t=>{e=[...e,t];let r=t?.plugins??[];r.length!==0&&r.forEach(n=>{n.__isOptionsFunction&&(n=n()),e=[...e,...Ju([n?.config??{}])]})}),e}function r0(i){return[...i].reduceRight((t,r)=>At(r)?r({corePlugins:t}):wu(r,t),gu)}function i0(i){return[...i].reduceRight((t,r)=>[...t,...r],[])}function ds(i){let e=[...Ju(i),{prefix:"",important:!1,separator:":"}];return Ou(es({theme:t0(Zb(Kb(e.map(t=>t?.theme??{})))),corePlugins:r0(e.map(t=>t.corePlugins)),plugins:i0(i.map(t=>t?.plugins??[]))},...e))}var ps,Xu=C(()=>{l();fi();yu();bu();Zn();Su();pi();Eu();kt();hi();cr();or();cs();ps={colors:Kn,negative(i){return Object.keys(i).filter(e=>i[e]!=="0").reduce((e,t)=>{let r=Xe(i[t]);return r!==void 0&&(e[`-${t}`]=r),e},{})},breakpoints(i){return Object.keys(i).filter(e=>typeof i[e]=="string").reduce((e,t)=>({...e,[`screen-${t}`]:i[t]}),{})}}});var bi=v((eT,Ku)=>{l();Ku.exports={content:[],presets:[],darkMode:"media",theme:{accentColor:({theme:i})=>({...i("colors"),auto:"auto"}),animation:{none:"none",spin:"spin 1s linear infinite",ping:"ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",pulse:"pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",bounce:"bounce 1s infinite"},aria:{busy:\'busy="true"\',checked:\'checked="true"\',disabled:\'disabled="true"\',expanded:\'expanded="true"\',hidden:\'hidden="true"\',pressed:\'pressed="true"\',readonly:\'readonly="true"\',required:\'required="true"\',selected:\'selected="true"\'},aspectRatio:{auto:"auto",square:"1 / 1",video:"16 / 9"},backdropBlur:({theme:i})=>i("blur"),backdropBrightness:({theme:i})=>i("brightness"),backdropContrast:({theme:i})=>i("contrast"),backdropGrayscale:({theme:i})=>i("grayscale"),backdropHueRotate:({theme:i})=>i("hueRotate"),backdropInvert:({theme:i})=>i("invert"),backdropOpacity:({theme:i})=>i("opacity"),backdropSaturate:({theme:i})=>i("saturate"),backdropSepia:({theme:i})=>i("sepia"),backgroundColor:({theme:i})=>i("colors"),backgroundImage:{none:"none","gradient-to-t":"linear-gradient(to top, var(--tw-gradient-stops))","gradient-to-tr":"linear-gradient(to top right, var(--tw-gradient-stops))","gradient-to-r":"linear-gradient(to right, var(--tw-gradient-stops))","gradient-to-br":"linear-gradient(to bottom right, var(--tw-gradient-stops))","gradient-to-b":"linear-gradient(to bottom, var(--tw-gradient-stops))","gradient-to-bl":"linear-gradient(to bottom left, var(--tw-gradient-stops))","gradient-to-l":"linear-gradient(to left, var(--tw-gradient-stops))","gradient-to-tl":"linear-gradient(to top left, var(--tw-gradient-stops))"},backgroundOpacity:({theme:i})=>i("opacity"),backgroundPosition:{bottom:"bottom",center:"center",left:"left","left-bottom":"left bottom","left-top":"left top",right:"right","right-bottom":"right bottom","right-top":"right top",top:"top"},backgroundSize:{auto:"auto",cover:"cover",contain:"contain"},blur:{0:"0",none:"0",sm:"4px",DEFAULT:"8px",md:"12px",lg:"16px",xl:"24px","2xl":"40px","3xl":"64px"},borderColor:({theme:i})=>({...i("colors"),DEFAULT:i("colors.gray.200","currentColor")}),borderOpacity:({theme:i})=>i("opacity"),borderRadius:{none:"0px",sm:"0.125rem",DEFAULT:"0.25rem",md:"0.375rem",lg:"0.5rem",xl:"0.75rem","2xl":"1rem","3xl":"1.5rem",full:"9999px"},borderSpacing:({theme:i})=>({...i("spacing")}),borderWidth:{DEFAULT:"1px",0:"0px",2:"2px",4:"4px",8:"8px"},boxShadow:{sm:"0 1px 2px 0 rgb(0 0 0 / 0.05)",DEFAULT:"0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",md:"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",lg:"0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",xl:"0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)","2xl":"0 25px 50px -12px rgb(0 0 0 / 0.25)",inner:"inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",none:"none"},boxShadowColor:({theme:i})=>i("colors"),brightness:{0:"0",50:".5",75:".75",90:".9",95:".95",100:"1",105:"1.05",110:"1.1",125:"1.25",150:"1.5",200:"2"},caretColor:({theme:i})=>i("colors"),colors:({colors:i})=>({inherit:i.inherit,current:i.current,transparent:i.transparent,black:i.black,white:i.white,slate:i.slate,gray:i.gray,zinc:i.zinc,neutral:i.neutral,stone:i.stone,red:i.red,orange:i.orange,amber:i.amber,yellow:i.yellow,lime:i.lime,green:i.green,emerald:i.emerald,teal:i.teal,cyan:i.cyan,sky:i.sky,blue:i.blue,indigo:i.indigo,violet:i.violet,purple:i.purple,fuchsia:i.fuchsia,pink:i.pink,rose:i.rose}),columns:{auto:"auto",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",10:"10",11:"11",12:"12","3xs":"16rem","2xs":"18rem",xs:"20rem",sm:"24rem",md:"28rem",lg:"32rem",xl:"36rem","2xl":"42rem","3xl":"48rem","4xl":"56rem","5xl":"64rem","6xl":"72rem","7xl":"80rem"},container:{},content:{none:"none"},contrast:{0:"0",50:".5",75:".75",100:"1",125:"1.25",150:"1.5",200:"2"},cursor:{auto:"auto",default:"default",pointer:"pointer",wait:"wait",text:"text",move:"move",help:"help","not-allowed":"not-allowed",none:"none","context-menu":"context-menu",progress:"progress",cell:"cell",crosshair:"crosshair","vertical-text":"vertical-text",alias:"alias",copy:"copy","no-drop":"no-drop",grab:"grab",grabbing:"grabbing","all-scroll":"all-scroll","col-resize":"col-resize","row-resize":"row-resize","n-resize":"n-resize","e-resize":"e-resize","s-resize":"s-resize","w-resize":"w-resize","ne-resize":"ne-resize","nw-resize":"nw-resize","se-resize":"se-resize","sw-resize":"sw-resize","ew-resize":"ew-resize","ns-resize":"ns-resize","nesw-resize":"nesw-resize","nwse-resize":"nwse-resize","zoom-in":"zoom-in","zoom-out":"zoom-out"},divideColor:({theme:i})=>i("borderColor"),divideOpacity:({theme:i})=>i("borderOpacity"),divideWidth:({theme:i})=>i("borderWidth"),dropShadow:{sm:"0 1px 1px rgb(0 0 0 / 0.05)",DEFAULT:["0 1px 2px rgb(0 0 0 / 0.1)","0 1px 1px rgb(0 0 0 / 0.06)"],md:["0 4px 3px rgb(0 0 0 / 0.07)","0 2px 2px rgb(0 0 0 / 0.06)"],lg:["0 10px 8px rgb(0 0 0 / 0.04)","0 4px 3px rgb(0 0 0 / 0.1)"],xl:["0 20px 13px rgb(0 0 0 / 0.03)","0 8px 5px rgb(0 0 0 / 0.08)"],"2xl":"0 25px 25px rgb(0 0 0 / 0.15)",none:"0 0 #0000"},fill:({theme:i})=>({none:"none",...i("colors")}),flex:{1:"1 1 0%",auto:"1 1 auto",initial:"0 1 auto",none:"none"},flexBasis:({theme:i})=>({auto:"auto",...i("spacing"),"1/2":"50%","1/3":"33.333333%","2/3":"66.666667%","1/4":"25%","2/4":"50%","3/4":"75%","1/5":"20%","2/5":"40%","3/5":"60%","4/5":"80%","1/6":"16.666667%","2/6":"33.333333%","3/6":"50%","4/6":"66.666667%","5/6":"83.333333%","1/12":"8.333333%","2/12":"16.666667%","3/12":"25%","4/12":"33.333333%","5/12":"41.666667%","6/12":"50%","7/12":"58.333333%","8/12":"66.666667%","9/12":"75%","10/12":"83.333333%","11/12":"91.666667%",full:"100%"}),flexGrow:{0:"0",DEFAULT:"1"},flexShrink:{0:"0",DEFAULT:"1"},fontFamily:{sans:["ui-sans-serif","system-ui","sans-serif",\'"Apple Color Emoji"\',\'"Segoe UI Emoji"\',\'"Segoe UI Symbol"\',\'"Noto Color Emoji"\'],serif:["ui-serif","Georgia","Cambria",\'"Times New Roman"\',"Times","serif"],mono:["ui-monospace","SFMono-Regular","Menlo","Monaco","Consolas",\'"Liberation Mono"\',\'"Courier New"\',"monospace"]},fontSize:{xs:["0.75rem",{lineHeight:"1rem"}],sm:["0.875rem",{lineHeight:"1.25rem"}],base:["1rem",{lineHeight:"1.5rem"}],lg:["1.125rem",{lineHeight:"1.75rem"}],xl:["1.25rem",{lineHeight:"1.75rem"}],"2xl":["1.5rem",{lineHeight:"2rem"}],"3xl":["1.875rem",{lineHeight:"2.25rem"}],"4xl":["2.25rem",{lineHeight:"2.5rem"}],"5xl":["3rem",{lineHeight:"1"}],"6xl":["3.75rem",{lineHeight:"1"}],"7xl":["4.5rem",{lineHeight:"1"}],"8xl":["6rem",{lineHeight:"1"}],"9xl":["8rem",{lineHeight:"1"}]},fontWeight:{thin:"100",extralight:"200",light:"300",normal:"400",medium:"500",semibold:"600",bold:"700",extrabold:"800",black:"900"},gap:({theme:i})=>i("spacing"),gradientColorStops:({theme:i})=>i("colors"),gradientColorStopPositions:{"0%":"0%","5%":"5%","10%":"10%","15%":"15%","20%":"20%","25%":"25%","30%":"30%","35%":"35%","40%":"40%","45%":"45%","50%":"50%","55%":"55%","60%":"60%","65%":"65%","70%":"70%","75%":"75%","80%":"80%","85%":"85%","90%":"90%","95%":"95%","100%":"100%"},grayscale:{0:"0",DEFAULT:"100%"},gridAutoColumns:{auto:"auto",min:"min-content",max:"max-content",fr:"minmax(0, 1fr)"},gridAutoRows:{auto:"auto",min:"min-content",max:"max-content",fr:"minmax(0, 1fr)"},gridColumn:{auto:"auto","span-1":"span 1 / span 1","span-2":"span 2 / span 2","span-3":"span 3 / span 3","span-4":"span 4 / span 4","span-5":"span 5 / span 5","span-6":"span 6 / span 6","span-7":"span 7 / span 7","span-8":"span 8 / span 8","span-9":"span 9 / span 9","span-10":"span 10 / span 10","span-11":"span 11 / span 11","span-12":"span 12 / span 12","span-full":"1 / -1"},gridColumnEnd:{auto:"auto",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",10:"10",11:"11",12:"12",13:"13"},gridColumnStart:{auto:"auto",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",10:"10",11:"11",12:"12",13:"13"},gridRow:{auto:"auto","span-1":"span 1 / span 1","span-2":"span 2 / span 2","span-3":"span 3 / span 3","span-4":"span 4 / span 4","span-5":"span 5 / span 5","span-6":"span 6 / span 6","span-7":"span 7 / span 7","span-8":"span 8 / span 8","span-9":"span 9 / span 9","span-10":"span 10 / span 10","span-11":"span 11 / span 11","span-12":"span 12 / span 12","span-full":"1 / -1"},gridRowEnd:{auto:"auto",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",10:"10",11:"11",12:"12",13:"13"},gridRowStart:{auto:"auto",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",10:"10",11:"11",12:"12",13:"13"},gridTemplateColumns:{none:"none",subgrid:"subgrid",1:"repeat(1, minmax(0, 1fr))",2:"repeat(2, minmax(0, 1fr))",3:"repeat(3, minmax(0, 1fr))",4:"repeat(4, minmax(0, 1fr))",5:"repeat(5, minmax(0, 1fr))",6:"repeat(6, minmax(0, 1fr))",7:"repeat(7, minmax(0, 1fr))",8:"repeat(8, minmax(0, 1fr))",9:"repeat(9, minmax(0, 1fr))",10:"repeat(10, minmax(0, 1fr))",11:"repeat(11, minmax(0, 1fr))",12:"repeat(12, minmax(0, 1fr))"},gridTemplateRows:{none:"none",subgrid:"subgrid",1:"repeat(1, minmax(0, 1fr))",2:"repeat(2, minmax(0, 1fr))",3:"repeat(3, minmax(0, 1fr))",4:"repeat(4, minmax(0, 1fr))",5:"repeat(5, minmax(0, 1fr))",6:"repeat(6, minmax(0, 1fr))",7:"repeat(7, minmax(0, 1fr))",8:"repeat(8, minmax(0, 1fr))",9:"repeat(9, minmax(0, 1fr))",10:"repeat(10, minmax(0, 1fr))",11:"repeat(11, minmax(0, 1fr))",12:"repeat(12, minmax(0, 1fr))"},height:({theme:i})=>({auto:"auto",...i("spacing"),"1/2":"50%","1/3":"33.333333%","2/3":"66.666667%","1/4":"25%","2/4":"50%","3/4":"75%","1/5":"20%","2/5":"40%","3/5":"60%","4/5":"80%","1/6":"16.666667%","2/6":"33.333333%","3/6":"50%","4/6":"66.666667%","5/6":"83.333333%",full:"100%",screen:"100vh",svh:"100svh",lvh:"100lvh",dvh:"100dvh",min:"min-content",max:"max-content",fit:"fit-content"}),hueRotate:{0:"0deg",15:"15deg",30:"30deg",60:"60deg",90:"90deg",180:"180deg"},inset:({theme:i})=>({auto:"auto",...i("spacing"),"1/2":"50%","1/3":"33.333333%","2/3":"66.666667%","1/4":"25%","2/4":"50%","3/4":"75%",full:"100%"}),invert:{0:"0",DEFAULT:"100%"},keyframes:{spin:{to:{transform:"rotate(360deg)"}},ping:{"75%, 100%":{transform:"scale(2)",opacity:"0"}},pulse:{"50%":{opacity:".5"}},bounce:{"0%, 100%":{transform:"translateY(-25%)",animationTimingFunction:"cubic-bezier(0.8,0,1,1)"},"50%":{transform:"none",animationTimingFunction:"cubic-bezier(0,0,0.2,1)"}}},letterSpacing:{tighter:"-0.05em",tight:"-0.025em",normal:"0em",wide:"0.025em",wider:"0.05em",widest:"0.1em"},lineHeight:{none:"1",tight:"1.25",snug:"1.375",normal:"1.5",relaxed:"1.625",loose:"2",3:".75rem",4:"1rem",5:"1.25rem",6:"1.5rem",7:"1.75rem",8:"2rem",9:"2.25rem",10:"2.5rem"},listStyleType:{none:"none",disc:"disc",decimal:"decimal"},listStyleImage:{none:"none"},margin:({theme:i})=>({auto:"auto",...i("spacing")}),lineClamp:{1:"1",2:"2",3:"3",4:"4",5:"5",6:"6"},maxHeight:({theme:i})=>({...i("spacing"),none:"none",full:"100%",screen:"100vh",svh:"100svh",lvh:"100lvh",dvh:"100dvh",min:"min-content",max:"max-content",fit:"fit-content"}),maxWidth:({theme:i,breakpoints:e})=>({...i("spacing"),none:"none",xs:"20rem",sm:"24rem",md:"28rem",lg:"32rem",xl:"36rem","2xl":"42rem","3xl":"48rem","4xl":"56rem","5xl":"64rem","6xl":"72rem","7xl":"80rem",full:"100%",min:"min-content",max:"max-content",fit:"fit-content",prose:"65ch",...e(i("screens"))}),minHeight:({theme:i})=>({...i("spacing"),full:"100%",screen:"100vh",svh:"100svh",lvh:"100lvh",dvh:"100dvh",min:"min-content",max:"max-content",fit:"fit-content"}),minWidth:({theme:i})=>({...i("spacing"),full:"100%",min:"min-content",max:"max-content",fit:"fit-content"}),objectPosition:{bottom:"bottom",center:"center",left:"left","left-bottom":"left bottom","left-top":"left top",right:"right","right-bottom":"right bottom","right-top":"right top",top:"top"},opacity:{0:"0",5:"0.05",10:"0.1",15:"0.15",20:"0.2",25:"0.25",30:"0.3",35:"0.35",40:"0.4",45:"0.45",50:"0.5",55:"0.55",60:"0.6",65:"0.65",70:"0.7",75:"0.75",80:"0.8",85:"0.85",90:"0.9",95:"0.95",100:"1"},order:{first:"-9999",last:"9999",none:"0",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",10:"10",11:"11",12:"12"},outlineColor:({theme:i})=>i("colors"),outlineOffset:{0:"0px",1:"1px",2:"2px",4:"4px",8:"8px"},outlineWidth:{0:"0px",1:"1px",2:"2px",4:"4px",8:"8px"},padding:({theme:i})=>i("spacing"),placeholderColor:({theme:i})=>i("colors"),placeholderOpacity:({theme:i})=>i("opacity"),ringColor:({theme:i})=>({DEFAULT:i("colors.blue.500","#3b82f6"),...i("colors")}),ringOffsetColor:({theme:i})=>i("colors"),ringOffsetWidth:{0:"0px",1:"1px",2:"2px",4:"4px",8:"8px"},ringOpacity:({theme:i})=>({DEFAULT:"0.5",...i("opacity")}),ringWidth:{DEFAULT:"3px",0:"0px",1:"1px",2:"2px",4:"4px",8:"8px"},rotate:{0:"0deg",1:"1deg",2:"2deg",3:"3deg",6:"6deg",12:"12deg",45:"45deg",90:"90deg",180:"180deg"},saturate:{0:"0",50:".5",100:"1",150:"1.5",200:"2"},scale:{0:"0",50:".5",75:".75",90:".9",95:".95",100:"1",105:"1.05",110:"1.1",125:"1.25",150:"1.5"},screens:{sm:"640px",md:"768px",lg:"1024px",xl:"1280px","2xl":"1536px"},scrollMargin:({theme:i})=>({...i("spacing")}),scrollPadding:({theme:i})=>i("spacing"),sepia:{0:"0",DEFAULT:"100%"},skew:{0:"0deg",1:"1deg",2:"2deg",3:"3deg",6:"6deg",12:"12deg"},space:({theme:i})=>({...i("spacing")}),spacing:{px:"1px",0:"0px",.5:"0.125rem",1:"0.25rem",1.5:"0.375rem",2:"0.5rem",2.5:"0.625rem",3:"0.75rem",3.5:"0.875rem",4:"1rem",5:"1.25rem",6:"1.5rem",7:"1.75rem",8:"2rem",9:"2.25rem",10:"2.5rem",11:"2.75rem",12:"3rem",14:"3.5rem",16:"4rem",20:"5rem",24:"6rem",28:"7rem",32:"8rem",36:"9rem",40:"10rem",44:"11rem",48:"12rem",52:"13rem",56:"14rem",60:"15rem",64:"16rem",72:"18rem",80:"20rem",96:"24rem"},stroke:({theme:i})=>({none:"none",...i("colors")}),strokeWidth:{0:"0",1:"1",2:"2"},supports:{},data:{},textColor:({theme:i})=>i("colors"),textDecorationColor:({theme:i})=>i("colors"),textDecorationThickness:{auto:"auto","from-font":"from-font",0:"0px",1:"1px",2:"2px",4:"4px",8:"8px"},textIndent:({theme:i})=>({...i("spacing")}),textOpacity:({theme:i})=>i("opacity"),textUnderlineOffset:{auto:"auto",0:"0px",1:"1px",2:"2px",4:"4px",8:"8px"},transformOrigin:{center:"center",top:"top","top-right":"top right",right:"right","bottom-right":"bottom right",bottom:"bottom","bottom-left":"bottom left",left:"left","top-left":"top left"},transitionDelay:{0:"0s",75:"75ms",100:"100ms",150:"150ms",200:"200ms",300:"300ms",500:"500ms",700:"700ms",1e3:"1000ms"},transitionDuration:{DEFAULT:"150ms",0:"0s",75:"75ms",100:"100ms",150:"150ms",200:"200ms",300:"300ms",500:"500ms",700:"700ms",1e3:"1000ms"},transitionProperty:{none:"none",all:"all",DEFAULT:"color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",colors:"color, background-color, border-color, text-decoration-color, fill, stroke",opacity:"opacity",shadow:"box-shadow",transform:"transform"},transitionTimingFunction:{DEFAULT:"cubic-bezier(0.4, 0, 0.2, 1)",linear:"linear",in:"cubic-bezier(0.4, 0, 1, 1)",out:"cubic-bezier(0, 0, 0.2, 1)","in-out":"cubic-bezier(0.4, 0, 0.2, 1)"},translate:({theme:i})=>({...i("spacing"),"1/2":"50%","1/3":"33.333333%","2/3":"66.666667%","1/4":"25%","2/4":"50%","3/4":"75%",full:"100%"}),size:({theme:i})=>({auto:"auto",...i("spacing"),"1/2":"50%","1/3":"33.333333%","2/3":"66.666667%","1/4":"25%","2/4":"50%","3/4":"75%","1/5":"20%","2/5":"40%","3/5":"60%","4/5":"80%","1/6":"16.666667%","2/6":"33.333333%","3/6":"50%","4/6":"66.666667%","5/6":"83.333333%","1/12":"8.333333%","2/12":"16.666667%","3/12":"25%","4/12":"33.333333%","5/12":"41.666667%","6/12":"50%","7/12":"58.333333%","8/12":"66.666667%","9/12":"75%","10/12":"83.333333%","11/12":"91.666667%",full:"100%",min:"min-content",max:"max-content",fit:"fit-content"}),width:({theme:i})=>({auto:"auto",...i("spacing"),"1/2":"50%","1/3":"33.333333%","2/3":"66.666667%","1/4":"25%","2/4":"50%","3/4":"75%","1/5":"20%","2/5":"40%","3/5":"60%","4/5":"80%","1/6":"16.666667%","2/6":"33.333333%","3/6":"50%","4/6":"66.666667%","5/6":"83.333333%","1/12":"8.333333%","2/12":"16.666667%","3/12":"25%","4/12":"33.333333%","5/12":"41.666667%","6/12":"50%","7/12":"58.333333%","8/12":"66.666667%","9/12":"75%","10/12":"83.333333%","11/12":"91.666667%",full:"100%",screen:"100vw",svw:"100svw",lvw:"100lvw",dvw:"100dvw",min:"min-content",max:"max-content",fit:"fit-content"}),willChange:{auto:"auto",scroll:"scroll-position",contents:"contents",transform:"transform"},zIndex:{auto:"auto",0:"0",10:"10",20:"20",30:"30",40:"40",50:"50"}},plugins:[]}});function vi(i){let e=(i?.presets??[Zu.default]).slice().reverse().flatMap(n=>vi(n instanceof Function?n():n)),t={respectDefaultRingColorOpacity:{theme:{ringColor:({theme:n})=>({DEFAULT:"#3b82f67f",...n("colors")})}},disableColorOpacityUtilitiesByDefault:{corePlugins:{backgroundOpacity:!1,borderOpacity:!1,divideOpacity:!1,placeholderOpacity:!1,ringOpacity:!1,textOpacity:!1}}},r=Object.keys(t).filter(n=>Z(i,n)).map(n=>t[n]);return[i,...r,...e]}var Zu,ef=C(()=>{l();Zu=K(bi());ze()});var tf={};Ae(tf,{default:()=>dr});function dr(...i){let[,...e]=vi(i[0]);return ds([...i,...e])}var hs=C(()=>{l();Xu();ef()});var rf={};Ae(rf,{default:()=>ee});var ee,gt=C(()=>{l();ee={resolve:i=>i,extname:i=>"."+i.split(".").pop()}});function xi(i){return typeof i=="object"&&i!==null}function s0(i){return Object.keys(i).length===0}function nf(i){return typeof i=="string"||i instanceof String}function ms(i){return xi(i)&&i.config===void 0&&!s0(i)?null:xi(i)&&i.config!==void 0&&nf(i.config)?ee.resolve(i.config):xi(i)&&i.config!==void 0&&xi(i.config)?null:nf(i)?ee.resolve(i):a0()}function a0(){for(let i of n0)try{let e=ee.resolve(i);return re.accessSync(e),e}catch(e){}return null}var n0,sf=C(()=>{l();je();gt();n0=["./tailwind.config.js","./tailwind.config.cjs","./tailwind.config.mjs","./tailwind.config.ts"]});var af={};Ae(af,{default:()=>gs});var gs,ys=C(()=>{l();gs={parse:i=>({href:i})}});var ws=v(()=>{l()});var ki=v((fT,uf)=>{l();"use strict";var of=(ci(),vu),lf=ws(),_t=class extends Error{constructor(e,t,r,n,a,s){super(e);this.name="CssSyntaxError",this.reason=e,a&&(this.file=a),n&&(this.source=n),s&&(this.plugin=s),typeof t!="undefined"&&typeof r!="undefined"&&(typeof t=="number"?(this.line=t,this.column=r):(this.line=t.line,this.column=t.column,this.endLine=r.line,this.endColumn=r.column)),this.setMessage(),Error.captureStackTrace&&Error.captureStackTrace(this,_t)}setMessage(){this.message=this.plugin?this.plugin+": ":"",this.message+=this.file?this.file:"<css input>",typeof this.line!="undefined"&&(this.message+=":"+this.line+":"+this.column),this.message+=": "+this.reason}showSourceCode(e){if(!this.source)return"";let t=this.source;e==null&&(e=of.isColorSupported),lf&&e&&(t=lf(t));let r=t.split(/\\r?\\n/),n=Math.max(this.line-3,0),a=Math.min(this.line+2,r.length),s=String(a).length,o,u;if(e){let{bold:c,red:f,gray:d}=of.createColors(!0);o=p=>c(f(p)),u=p=>d(p)}else o=u=c=>c;return r.slice(n,a).map((c,f)=>{let d=n+1+f,p=" "+(" "+d).slice(-s)+" | ";if(d===this.line){let m=u(p.replace(/\\d/g," "))+c.slice(0,this.column-1).replace(/[^\\t]/g," ");return o(">")+u(p)+c+`\n `+m+o("^")}return" "+u(p)+c}).join(`\n`)}toString(){let e=this.showSourceCode();return e&&(e=`\n\n`+e+`\n`),this.name+": "+this.message+e}};uf.exports=_t;_t.default=_t});var Si=v((cT,bs)=>{l();"use strict";bs.exports.isClean=Symbol("isClean");bs.exports.my=Symbol("my")});var vs=v((pT,cf)=>{l();"use strict";var ff={colon:": ",indent:"    ",beforeDecl:`\n`,beforeRule:`\n`,beforeOpen:" ",beforeClose:`\n`,beforeComment:`\n`,after:`\n`,emptyBody:"",commentLeft:" ",commentRight:" ",semicolon:!1};function o0(i){return i[0].toUpperCase()+i.slice(1)}var Ci=class{constructor(e){this.builder=e}stringify(e,t){if(!this[e.type])throw new Error("Unknown AST node type "+e.type+". Maybe you need to change PostCSS stringifier.");this[e.type](e,t)}document(e){this.body(e)}root(e){this.body(e),e.raws.after&&this.builder(e.raws.after)}comment(e){let t=this.raw(e,"left","commentLeft"),r=this.raw(e,"right","commentRight");this.builder("/*"+t+e.text+r+"*/",e)}decl(e,t){let r=this.raw(e,"between","colon"),n=e.prop+r+this.rawValue(e,"value");e.important&&(n+=e.raws.important||" !important"),t&&(n+=";"),this.builder(n,e)}rule(e){this.block(e,this.rawValue(e,"selector")),e.raws.ownSemicolon&&this.builder(e.raws.ownSemicolon,e,"end")}atrule(e,t){let r="@"+e.name,n=e.params?this.rawValue(e,"params"):"";if(typeof e.raws.afterName!="undefined"?r+=e.raws.afterName:n&&(r+=" "),e.nodes)this.block(e,r+n);else{let a=(e.raws.between||"")+(t?";":"");this.builder(r+n+a,e)}}body(e){let t=e.nodes.length-1;for(;t>0&&e.nodes[t].type==="comment";)t-=1;let r=this.raw(e,"semicolon");for(let n=0;n<e.nodes.length;n++){let a=e.nodes[n],s=this.raw(a,"before");s&&this.builder(s),this.stringify(a,t!==n||r)}}block(e,t){let r=this.raw(e,"between","beforeOpen");this.builder(t+r+"{",e,"start");let n;e.nodes&&e.nodes.length?(this.body(e),n=this.raw(e,"after")):n=this.raw(e,"after","emptyBody"),n&&this.builder(n),this.builder("}",e,"end")}raw(e,t,r){let n;if(r||(r=t),t&&(n=e.raws[t],typeof n!="undefined"))return n;let a=e.parent;if(r==="before"&&(!a||a.type==="root"&&a.first===e||a&&a.type==="document"))return"";if(!a)return ff[r];let s=e.root();if(s.rawCache||(s.rawCache={}),typeof s.rawCache[r]!="undefined")return s.rawCache[r];if(r==="before"||r==="after")return this.beforeAfter(e,r);{let o="raw"+o0(r);this[o]?n=this[o](s,e):s.walk(u=>{if(n=u.raws[t],typeof n!="undefined")return!1})}return typeof n=="undefined"&&(n=ff[r]),s.rawCache[r]=n,n}rawSemicolon(e){let t;return e.walk(r=>{if(r.nodes&&r.nodes.length&&r.last.type==="decl"&&(t=r.raws.semicolon,typeof t!="undefined"))return!1}),t}rawEmptyBody(e){let t;return e.walk(r=>{if(r.nodes&&r.nodes.length===0&&(t=r.raws.after,typeof t!="undefined"))return!1}),t}rawIndent(e){if(e.raws.indent)return e.raws.indent;let t;return e.walk(r=>{let n=r.parent;if(n&&n!==e&&n.parent&&n.parent===e&&typeof r.raws.before!="undefined"){let a=r.raws.before.split(`\n`);return t=a[a.length-1],t=t.replace(/\\S/g,""),!1}}),t}rawBeforeComment(e,t){let r;return e.walkComments(n=>{if(typeof n.raws.before!="undefined")return r=n.raws.before,r.includes(`\n`)&&(r=r.replace(/[^\\n]+$/,"")),!1}),typeof r=="undefined"?r=this.raw(t,null,"beforeDecl"):r&&(r=r.replace(/\\S/g,"")),r}rawBeforeDecl(e,t){let r;return e.walkDecls(n=>{if(typeof n.raws.before!="undefined")return r=n.raws.before,r.includes(`\n`)&&(r=r.replace(/[^\\n]+$/,"")),!1}),typeof r=="undefined"?r=this.raw(t,null,"beforeRule"):r&&(r=r.replace(/\\S/g,"")),r}rawBeforeRule(e){let t;return e.walk(r=>{if(r.nodes&&(r.parent!==e||e.first!==r)&&typeof r.raws.before!="undefined")return t=r.raws.before,t.includes(`\n`)&&(t=t.replace(/[^\\n]+$/,"")),!1}),t&&(t=t.replace(/\\S/g,"")),t}rawBeforeClose(e){let t;return e.walk(r=>{if(r.nodes&&r.nodes.length>0&&typeof r.raws.after!="undefined")return t=r.raws.after,t.includes(`\n`)&&(t=t.replace(/[^\\n]+$/,"")),!1}),t&&(t=t.replace(/\\S/g,"")),t}rawBeforeOpen(e){let t;return e.walk(r=>{if(r.type!=="decl"&&(t=r.raws.between,typeof t!="undefined"))return!1}),t}rawColon(e){let t;return e.walkDecls(r=>{if(typeof r.raws.between!="undefined")return t=r.raws.between.replace(/[^\\s:]/g,""),!1}),t}beforeAfter(e,t){let r;e.type==="decl"?r=this.raw(e,null,"beforeDecl"):e.type==="comment"?r=this.raw(e,null,"beforeComment"):t==="before"?r=this.raw(e,null,"beforeRule"):r=this.raw(e,null,"beforeClose");let n=e.parent,a=0;for(;n&&n.type!=="root";)a+=1,n=n.parent;if(r.includes(`\n`)){let s=this.raw(e,null,"indent");if(s.length)for(let o=0;o<a;o++)r+=s}return r}rawValue(e,t){let r=e[t],n=e.raws[t];return n&&n.value===r?n.raw:r}};cf.exports=Ci;Ci.default=Ci});var hr=v((dT,pf)=>{l();"use strict";var l0=vs();function xs(i,e){new l0(e).stringify(i)}pf.exports=xs;xs.default=xs});var mr=v((hT,df)=>{l();"use strict";var{isClean:Ai,my:u0}=Si(),f0=ki(),c0=vs(),p0=hr();function ks(i,e){let t=new i.constructor;for(let r in i){if(!Object.prototype.hasOwnProperty.call(i,r)||r==="proxyCache")continue;let n=i[r],a=typeof n;r==="parent"&&a==="object"?e&&(t[r]=e):r==="source"?t[r]=n:Array.isArray(n)?t[r]=n.map(s=>ks(s,t)):(a==="object"&&n!==null&&(n=ks(n)),t[r]=n)}return t}var _i=class{constructor(e={}){this.raws={},this[Ai]=!1,this[u0]=!0;for(let t in e)if(t==="nodes"){this.nodes=[];for(let r of e[t])typeof r.clone=="function"?this.append(r.clone()):this.append(r)}else this[t]=e[t]}error(e,t={}){if(this.source){let{start:r,end:n}=this.rangeBy(t);return this.source.input.error(e,{line:r.line,column:r.column},{line:n.line,column:n.column},t)}return new f0(e)}warn(e,t,r){let n={node:this};for(let a in r)n[a]=r[a];return e.warn(t,n)}remove(){return this.parent&&this.parent.removeChild(this),this.parent=void 0,this}toString(e=p0){e.stringify&&(e=e.stringify);let t="";return e(this,r=>{t+=r}),t}assign(e={}){for(let t in e)this[t]=e[t];return this}clone(e={}){let t=ks(this);for(let r in e)t[r]=e[r];return t}cloneBefore(e={}){let t=this.clone(e);return this.parent.insertBefore(this,t),t}cloneAfter(e={}){let t=this.clone(e);return this.parent.insertAfter(this,t),t}replaceWith(...e){if(this.parent){let t=this,r=!1;for(let n of e)n===this?r=!0:r?(this.parent.insertAfter(t,n),t=n):this.parent.insertBefore(t,n);r||this.remove()}return this}next(){if(!this.parent)return;let e=this.parent.index(this);return this.parent.nodes[e+1]}prev(){if(!this.parent)return;let e=this.parent.index(this);return this.parent.nodes[e-1]}before(e){return this.parent.insertBefore(this,e),this}after(e){return this.parent.insertAfter(this,e),this}root(){let e=this;for(;e.parent&&e.parent.type!=="document";)e=e.parent;return e}raw(e,t){return new c0().raw(this,e,t)}cleanRaws(e){delete this.raws.before,delete this.raws.after,e||delete this.raws.between}toJSON(e,t){let r={},n=t==null;t=t||new Map;let a=0;for(let s in this){if(!Object.prototype.hasOwnProperty.call(this,s)||s==="parent"||s==="proxyCache")continue;let o=this[s];if(Array.isArray(o))r[s]=o.map(u=>typeof u=="object"&&u.toJSON?u.toJSON(null,t):u);else if(typeof o=="object"&&o.toJSON)r[s]=o.toJSON(null,t);else if(s==="source"){let u=t.get(o.input);u==null&&(u=a,t.set(o.input,a),a++),r[s]={inputId:u,start:o.start,end:o.end}}else r[s]=o}return n&&(r.inputs=[...t.keys()].map(s=>s.toJSON())),r}positionInside(e){let t=this.toString(),r=this.source.start.column,n=this.source.start.line;for(let a=0;a<e;a++)t[a]===`\n`?(r=1,n+=1):r+=1;return{line:n,column:r}}positionBy(e){let t=this.source.start;if(e.index)t=this.positionInside(e.index);else if(e.word){let r=this.toString().indexOf(e.word);r!==-1&&(t=this.positionInside(r))}return t}rangeBy(e){let t={line:this.source.start.line,column:this.source.start.column},r=this.source.end?{line:this.source.end.line,column:this.source.end.column+1}:{line:t.line,column:t.column+1};if(e.word){let n=this.toString().indexOf(e.word);n!==-1&&(t=this.positionInside(n),r=this.positionInside(n+e.word.length))}else e.start?t={line:e.start.line,column:e.start.column}:e.index&&(t=this.positionInside(e.index)),e.end?r={line:e.end.line,column:e.end.column}:e.endIndex?r=this.positionInside(e.endIndex):e.index&&(r=this.positionInside(e.index+1));return(r.line<t.line||r.line===t.line&&r.column<=t.column)&&(r={line:t.line,column:t.column+1}),{start:t,end:r}}getProxyProcessor(){return{set(e,t,r){return e[t]===r||(e[t]=r,(t==="prop"||t==="value"||t==="name"||t==="params"||t==="important"||t==="text")&&e.markDirty()),!0},get(e,t){return t==="proxyOf"?e:t==="root"?()=>e.root().toProxy():e[t]}}}toProxy(){return this.proxyCache||(this.proxyCache=new Proxy(this,this.getProxyProcessor())),this.proxyCache}addToError(e){if(e.postcssNode=this,e.stack&&this.source&&/\\n\\s{4}at /.test(e.stack)){let t=this.source;e.stack=e.stack.replace(/\\n\\s{4}at /,`$&${t.input.from}:${t.start.line}:${t.start.column}$&`)}return e}markDirty(){if(this[Ai]){this[Ai]=!1;let e=this;for(;e=e.parent;)e[Ai]=!1}}get proxyOf(){return this}};df.exports=_i;_i.default=_i});var gr=v((mT,hf)=>{l();"use strict";var d0=mr(),Oi=class extends d0{constructor(e){e&&typeof e.value!="undefined"&&typeof e.value!="string"&&(e={...e,value:String(e.value)});super(e);this.type="decl"}get variable(){return this.prop.startsWith("--")||this.prop[0]==="$"}};hf.exports=Oi;Oi.default=Oi});var Ss=v((gT,mf)=>{l();mf.exports=function(i,e){return{generate:()=>{let t="";return i(e,r=>{t+=r}),[t]}}}});var yr=v((yT,gf)=>{l();"use strict";var h0=mr(),Ei=class extends h0{constructor(e){super(e);this.type="comment"}};gf.exports=Ei;Ei.default=Ei});var it=v((wT,Af)=>{l();"use strict";var{isClean:yf,my:wf}=Si(),bf=gr(),vf=yr(),m0=mr(),xf,Cs,As,kf;function Sf(i){return i.map(e=>(e.nodes&&(e.nodes=Sf(e.nodes)),delete e.source,e))}function Cf(i){if(i[yf]=!1,i.proxyOf.nodes)for(let e of i.proxyOf.nodes)Cf(e)}var we=class extends m0{push(e){return e.parent=this,this.proxyOf.nodes.push(e),this}each(e){if(!this.proxyOf.nodes)return;let t=this.getIterator(),r,n;for(;this.indexes[t]<this.proxyOf.nodes.length&&(r=this.indexes[t],n=e(this.proxyOf.nodes[r],r),n!==!1);)this.indexes[t]+=1;return delete this.indexes[t],n}walk(e){return this.each((t,r)=>{let n;try{n=e(t,r)}catch(a){throw t.addToError(a)}return n!==!1&&t.walk&&(n=t.walk(e)),n})}walkDecls(e,t){return t?e instanceof RegExp?this.walk((r,n)=>{if(r.type==="decl"&&e.test(r.prop))return t(r,n)}):this.walk((r,n)=>{if(r.type==="decl"&&r.prop===e)return t(r,n)}):(t=e,this.walk((r,n)=>{if(r.type==="decl")return t(r,n)}))}walkRules(e,t){return t?e instanceof RegExp?this.walk((r,n)=>{if(r.type==="rule"&&e.test(r.selector))return t(r,n)}):this.walk((r,n)=>{if(r.type==="rule"&&r.selector===e)return t(r,n)}):(t=e,this.walk((r,n)=>{if(r.type==="rule")return t(r,n)}))}walkAtRules(e,t){return t?e instanceof RegExp?this.walk((r,n)=>{if(r.type==="atrule"&&e.test(r.name))return t(r,n)}):this.walk((r,n)=>{if(r.type==="atrule"&&r.name===e)return t(r,n)}):(t=e,this.walk((r,n)=>{if(r.type==="atrule")return t(r,n)}))}walkComments(e){return this.walk((t,r)=>{if(t.type==="comment")return e(t,r)})}append(...e){for(let t of e){let r=this.normalize(t,this.last);for(let n of r)this.proxyOf.nodes.push(n)}return this.markDirty(),this}prepend(...e){e=e.reverse();for(let t of e){let r=this.normalize(t,this.first,"prepend").reverse();for(let n of r)this.proxyOf.nodes.unshift(n);for(let n in this.indexes)this.indexes[n]=this.indexes[n]+r.length}return this.markDirty(),this}cleanRaws(e){if(super.cleanRaws(e),this.nodes)for(let t of this.nodes)t.cleanRaws(e)}insertBefore(e,t){let r=this.index(e),n=r===0?"prepend":!1,a=this.normalize(t,this.proxyOf.nodes[r],n).reverse();r=this.index(e);for(let o of a)this.proxyOf.nodes.splice(r,0,o);let s;for(let o in this.indexes)s=this.indexes[o],r<=s&&(this.indexes[o]=s+a.length);return this.markDirty(),this}insertAfter(e,t){let r=this.index(e),n=this.normalize(t,this.proxyOf.nodes[r]).reverse();r=this.index(e);for(let s of n)this.proxyOf.nodes.splice(r+1,0,s);let a;for(let s in this.indexes)a=this.indexes[s],r<a&&(this.indexes[s]=a+n.length);return this.markDirty(),this}removeChild(e){e=this.index(e),this.proxyOf.nodes[e].parent=void 0,this.proxyOf.nodes.splice(e,1);let t;for(let r in this.indexes)t=this.indexes[r],t>=e&&(this.indexes[r]=t-1);return this.markDirty(),this}removeAll(){for(let e of this.proxyOf.nodes)e.parent=void 0;return this.proxyOf.nodes=[],this.markDirty(),this}replaceValues(e,t,r){return r||(r=t,t={}),this.walkDecls(n=>{t.props&&!t.props.includes(n.prop)||t.fast&&!n.value.includes(t.fast)||(n.value=n.value.replace(e,r))}),this.markDirty(),this}every(e){return this.nodes.every(e)}some(e){return this.nodes.some(e)}index(e){return typeof e=="number"?e:(e.proxyOf&&(e=e.proxyOf),this.proxyOf.nodes.indexOf(e))}get first(){if(!!this.proxyOf.nodes)return this.proxyOf.nodes[0]}get last(){if(!!this.proxyOf.nodes)return this.proxyOf.nodes[this.proxyOf.nodes.length-1]}normalize(e,t){if(typeof e=="string")e=Sf(xf(e).nodes);else if(Array.isArray(e)){e=e.slice(0);for(let n of e)n.parent&&n.parent.removeChild(n,"ignore")}else if(e.type==="root"&&this.type!=="document"){e=e.nodes.slice(0);for(let n of e)n.parent&&n.parent.removeChild(n,"ignore")}else if(e.type)e=[e];else if(e.prop){if(typeof e.value=="undefined")throw new Error("Value field is missed in node creation");typeof e.value!="string"&&(e.value=String(e.value)),e=[new bf(e)]}else if(e.selector)e=[new Cs(e)];else if(e.name)e=[new As(e)];else if(e.text)e=[new vf(e)];else throw new Error("Unknown node type in node creation");return e.map(n=>(n[wf]||we.rebuild(n),n=n.proxyOf,n.parent&&n.parent.removeChild(n),n[yf]&&Cf(n),typeof n.raws.before=="undefined"&&t&&typeof t.raws.before!="undefined"&&(n.raws.before=t.raws.before.replace(/\\S/g,"")),n.parent=this.proxyOf,n))}getProxyProcessor(){return{set(e,t,r){return e[t]===r||(e[t]=r,(t==="name"||t==="params"||t==="selector")&&e.markDirty()),!0},get(e,t){return t==="proxyOf"?e:e[t]?t==="each"||typeof t=="string"&&t.startsWith("walk")?(...r)=>e[t](...r.map(n=>typeof n=="function"?(a,s)=>n(a.toProxy(),s):n)):t==="every"||t==="some"?r=>e[t]((n,...a)=>r(n.toProxy(),...a)):t==="root"?()=>e.root().toProxy():t==="nodes"?e.nodes.map(r=>r.toProxy()):t==="first"||t==="last"?e[t].toProxy():e[t]:e[t]}}}getIterator(){this.lastEach||(this.lastEach=0),this.indexes||(this.indexes={}),this.lastEach+=1;let e=this.lastEach;return this.indexes[e]=0,e}};we.registerParse=i=>{xf=i};we.registerRule=i=>{Cs=i};we.registerAtRule=i=>{As=i};we.registerRoot=i=>{kf=i};Af.exports=we;we.default=we;we.rebuild=i=>{i.type==="atrule"?Object.setPrototypeOf(i,As.prototype):i.type==="rule"?Object.setPrototypeOf(i,Cs.prototype):i.type==="decl"?Object.setPrototypeOf(i,bf.prototype):i.type==="comment"?Object.setPrototypeOf(i,vf.prototype):i.type==="root"&&Object.setPrototypeOf(i,kf.prototype),i[wf]=!0,i.nodes&&i.nodes.forEach(e=>{we.rebuild(e)})}});var Ti=v((bT,Ef)=>{l();"use strict";var g0=it(),_f,Of,Ot=class extends g0{constructor(e){super({type:"document",...e});this.nodes||(this.nodes=[])}toResult(e={}){return new _f(new Of,this,e).stringify()}};Ot.registerLazyResult=i=>{_f=i};Ot.registerProcessor=i=>{Of=i};Ef.exports=Ot;Ot.default=Ot});var _s=v((vT,Pf)=>{l();"use strict";var Tf={};Pf.exports=function(e){Tf[e]||(Tf[e]=!0,typeof console!="undefined"&&console.warn&&console.warn(e))}});var Os=v((xT,Df)=>{l();"use strict";var Pi=class{constructor(e,t={}){if(this.type="warning",this.text=e,t.node&&t.node.source){let r=t.node.rangeBy(t);this.line=r.start.line,this.column=r.start.column,this.endLine=r.end.line,this.endColumn=r.end.column}for(let r in t)this[r]=t[r]}toString(){return this.node?this.node.error(this.text,{plugin:this.plugin,index:this.index,word:this.word}).message:this.plugin?this.plugin+": "+this.text:this.text}};Df.exports=Pi;Pi.default=Pi});var Ii=v((kT,If)=>{l();"use strict";var y0=Os(),Di=class{constructor(e,t,r){this.processor=e,this.messages=[],this.root=t,this.opts=r,this.css=void 0,this.map=void 0}toString(){return this.css}warn(e,t={}){t.plugin||this.lastPlugin&&this.lastPlugin.postcssPlugin&&(t.plugin=this.lastPlugin.postcssPlugin);let r=new y0(e,t);return this.messages.push(r),r}warnings(){return this.messages.filter(e=>e.type==="warning")}get content(){return this.css}};If.exports=Di;Di.default=Di});var Ff=v((ST,Bf)=>{l();"use strict";var Es="\'".charCodeAt(0),qf=\'"\'.charCodeAt(0),qi="\\\\".charCodeAt(0),Rf="/".charCodeAt(0),Ri=`\n`.charCodeAt(0),wr=" ".charCodeAt(0),Mi="\\f".charCodeAt(0),Bi="	".charCodeAt(0),Fi="\\r".charCodeAt(0),w0="[".charCodeAt(0),b0="]".charCodeAt(0),v0="(".charCodeAt(0),x0=")".charCodeAt(0),k0="{".charCodeAt(0),S0="}".charCodeAt(0),C0=";".charCodeAt(0),A0="*".charCodeAt(0),_0=":".charCodeAt(0),O0="@".charCodeAt(0),Ni=/[\\t\\n\\f\\r "#\'()/;[\\\\\\]{}]/g,Li=/[\\t\\n\\f\\r !"#\'():;@[\\\\\\]{}]|\\/(?=\\*)/g,E0=/.[\\n"\'(/\\\\]/,Mf=/[\\da-f]/i;Bf.exports=function(e,t={}){let r=e.css.valueOf(),n=t.ignoreErrors,a,s,o,u,c,f,d,p,m,w,x=r.length,y=0,b=[],k=[];function S(){return y}function _(q){throw e.error("Unclosed "+q,y)}function O(){return k.length===0&&y>=x}function I(q){if(k.length)return k.pop();if(y>=x)return;let X=q?q.ignoreUnclosed:!1;switch(a=r.charCodeAt(y),a){case Ri:case wr:case Bi:case Fi:case Mi:{s=y;do s+=1,a=r.charCodeAt(s);while(a===wr||a===Ri||a===Bi||a===Fi||a===Mi);w=["space",r.slice(y,s)],y=s-1;break}case w0:case b0:case k0:case S0:case _0:case C0:case x0:{let le=String.fromCharCode(a);w=[le,le,y];break}case v0:{if(p=b.length?b.pop()[1]:"",m=r.charCodeAt(y+1),p==="url"&&m!==Es&&m!==qf&&m!==wr&&m!==Ri&&m!==Bi&&m!==Mi&&m!==Fi){s=y;do{if(f=!1,s=r.indexOf(")",s+1),s===-1)if(n||X){s=y;break}else _("bracket");for(d=s;r.charCodeAt(d-1)===qi;)d-=1,f=!f}while(f);w=["brackets",r.slice(y,s+1),y,s],y=s}else s=r.indexOf(")",y+1),u=r.slice(y,s+1),s===-1||E0.test(u)?w=["(","(",y]:(w=["brackets",u,y,s],y=s);break}case Es:case qf:{o=a===Es?"\'":\'"\',s=y;do{if(f=!1,s=r.indexOf(o,s+1),s===-1)if(n||X){s=y+1;break}else _("string");for(d=s;r.charCodeAt(d-1)===qi;)d-=1,f=!f}while(f);w=["string",r.slice(y,s+1),y,s],y=s;break}case O0:{Ni.lastIndex=y+1,Ni.test(r),Ni.lastIndex===0?s=r.length-1:s=Ni.lastIndex-2,w=["at-word",r.slice(y,s+1),y,s],y=s;break}case qi:{for(s=y,c=!0;r.charCodeAt(s+1)===qi;)s+=1,c=!c;if(a=r.charCodeAt(s+1),c&&a!==Rf&&a!==wr&&a!==Ri&&a!==Bi&&a!==Fi&&a!==Mi&&(s+=1,Mf.test(r.charAt(s)))){for(;Mf.test(r.charAt(s+1));)s+=1;r.charCodeAt(s+1)===wr&&(s+=1)}w=["word",r.slice(y,s+1),y,s],y=s;break}default:{a===Rf&&r.charCodeAt(y+1)===A0?(s=r.indexOf("*/",y+2)+1,s===0&&(n||X?s=r.length:_("comment")),w=["comment",r.slice(y,s+1),y,s],y=s):(Li.lastIndex=y+1,Li.test(r),Li.lastIndex===0?s=r.length-1:s=Li.lastIndex-2,w=["word",r.slice(y,s+1),y,s],b.push(w),y=s);break}}return y++,w}function B(q){k.push(q)}return{back:B,nextToken:I,endOfFile:O,position:S}}});var $i=v((CT,Lf)=>{l();"use strict";var Nf=it(),br=class extends Nf{constructor(e){super(e);this.type="atrule"}append(...e){return this.proxyOf.nodes||(this.nodes=[]),super.append(...e)}prepend(...e){return this.proxyOf.nodes||(this.nodes=[]),super.prepend(...e)}};Lf.exports=br;br.default=br;Nf.registerAtRule(br)});var Et=v((AT,Vf)=>{l();"use strict";var $f=it(),jf,zf,yt=class extends $f{constructor(e){super(e);this.type="root",this.nodes||(this.nodes=[])}removeChild(e,t){let r=this.index(e);return!t&&r===0&&this.nodes.length>1&&(this.nodes[1].raws.before=this.nodes[r].raws.before),super.removeChild(e)}normalize(e,t,r){let n=super.normalize(e);if(t){if(r==="prepend")this.nodes.length>1?t.raws.before=this.nodes[1].raws.before:delete t.raws.before;else if(this.first!==t)for(let a of n)a.raws.before=t.raws.before}return n}toResult(e={}){return new jf(new zf,this,e).stringify()}};yt.registerLazyResult=i=>{jf=i};yt.registerProcessor=i=>{zf=i};Vf.exports=yt;yt.default=yt;$f.registerRoot(yt)});var Ts=v((_T,Uf)=>{l();"use strict";var vr={split(i,e,t){let r=[],n="",a=!1,s=0,o=!1,u="",c=!1;for(let f of i)c?c=!1:f==="\\\\"?c=!0:o?f===u&&(o=!1):f===\'"\'||f==="\'"?(o=!0,u=f):f==="("?s+=1:f===")"?s>0&&(s-=1):s===0&&e.includes(f)&&(a=!0),a?(n!==""&&r.push(n.trim()),n="",a=!1):n+=f;return(t||n!=="")&&r.push(n.trim()),r},space(i){let e=[" ",`\n`,"	"];return vr.split(i,e)},comma(i){return vr.split(i,[","],!0)}};Uf.exports=vr;vr.default=vr});var ji=v((OT,Gf)=>{l();"use strict";var Wf=it(),T0=Ts(),xr=class extends Wf{constructor(e){super(e);this.type="rule",this.nodes||(this.nodes=[])}get selectors(){return T0.comma(this.selector)}set selectors(e){let t=this.selector?this.selector.match(/,\\s*/):null,r=t?t[0]:","+this.raw("between","beforeOpen");this.selector=e.join(r)}};Gf.exports=xr;xr.default=xr;Wf.registerRule(xr)});var Xf=v((ET,Jf)=>{l();"use strict";var P0=gr(),D0=Ff(),I0=yr(),q0=$i(),R0=Et(),Hf=ji(),Yf={empty:!0,space:!0};function M0(i){for(let e=i.length-1;e>=0;e--){let t=i[e],r=t[3]||t[2];if(r)return r}}var Qf=class{constructor(e){this.input=e,this.root=new R0,this.current=this.root,this.spaces="",this.semicolon=!1,this.customProperty=!1,this.createTokenizer(),this.root.source={input:e,start:{offset:0,line:1,column:1}}}createTokenizer(){this.tokenizer=D0(this.input)}parse(){let e;for(;!this.tokenizer.endOfFile();)switch(e=this.tokenizer.nextToken(),e[0]){case"space":this.spaces+=e[1];break;case";":this.freeSemicolon(e);break;case"}":this.end(e);break;case"comment":this.comment(e);break;case"at-word":this.atrule(e);break;case"{":this.emptyRule(e);break;default:this.other(e);break}this.endFile()}comment(e){let t=new I0;this.init(t,e[2]),t.source.end=this.getPosition(e[3]||e[2]);let r=e[1].slice(2,-2);if(/^\\s*$/.test(r))t.text="",t.raws.left=r,t.raws.right="";else{let n=r.match(/^(\\s*)([^]*\\S)(\\s*)$/);t.text=n[2],t.raws.left=n[1],t.raws.right=n[3]}}emptyRule(e){let t=new Hf;this.init(t,e[2]),t.selector="",t.raws.between="",this.current=t}other(e){let t=!1,r=null,n=!1,a=null,s=[],o=e[1].startsWith("--"),u=[],c=e;for(;c;){if(r=c[0],u.push(c),r==="("||r==="[")a||(a=c),s.push(r==="("?")":"]");else if(o&&n&&r==="{")a||(a=c),s.push("}");else if(s.length===0)if(r===";")if(n){this.decl(u,o);return}else break;else if(r==="{"){this.rule(u);return}else if(r==="}"){this.tokenizer.back(u.pop()),t=!0;break}else r===":"&&(n=!0);else r===s[s.length-1]&&(s.pop(),s.length===0&&(a=null));c=this.tokenizer.nextToken()}if(this.tokenizer.endOfFile()&&(t=!0),s.length>0&&this.unclosedBracket(a),t&&n){if(!o)for(;u.length&&(c=u[u.length-1][0],!(c!=="space"&&c!=="comment"));)this.tokenizer.back(u.pop());this.decl(u,o)}else this.unknownWord(u)}rule(e){e.pop();let t=new Hf;this.init(t,e[0][2]),t.raws.between=this.spacesAndCommentsFromEnd(e),this.raw(t,"selector",e),this.current=t}decl(e,t){let r=new P0;this.init(r,e[0][2]);let n=e[e.length-1];for(n[0]===";"&&(this.semicolon=!0,e.pop()),r.source.end=this.getPosition(n[3]||n[2]||M0(e));e[0][0]!=="word";)e.length===1&&this.unknownWord(e),r.raws.before+=e.shift()[1];for(r.source.start=this.getPosition(e[0][2]),r.prop="";e.length;){let c=e[0][0];if(c===":"||c==="space"||c==="comment")break;r.prop+=e.shift()[1]}r.raws.between="";let a;for(;e.length;)if(a=e.shift(),a[0]===":"){r.raws.between+=a[1];break}else a[0]==="word"&&/\\w/.test(a[1])&&this.unknownWord([a]),r.raws.between+=a[1];(r.prop[0]==="_"||r.prop[0]==="*")&&(r.raws.before+=r.prop[0],r.prop=r.prop.slice(1));let s=[],o;for(;e.length&&(o=e[0][0],!(o!=="space"&&o!=="comment"));)s.push(e.shift());this.precheckMissedSemicolon(e);for(let c=e.length-1;c>=0;c--){if(a=e[c],a[1].toLowerCase()==="!important"){r.important=!0;let f=this.stringFrom(e,c);f=this.spacesFromEnd(e)+f,f!==" !important"&&(r.raws.important=f);break}else if(a[1].toLowerCase()==="important"){let f=e.slice(0),d="";for(let p=c;p>0;p--){let m=f[p][0];if(d.trim().indexOf("!")===0&&m!=="space")break;d=f.pop()[1]+d}d.trim().indexOf("!")===0&&(r.important=!0,r.raws.important=d,e=f)}if(a[0]!=="space"&&a[0]!=="comment")break}e.some(c=>c[0]!=="space"&&c[0]!=="comment")&&(r.raws.between+=s.map(c=>c[1]).join(""),s=[]),this.raw(r,"value",s.concat(e),t),r.value.includes(":")&&!t&&this.checkMissedSemicolon(e)}atrule(e){let t=new q0;t.name=e[1].slice(1),t.name===""&&this.unnamedAtrule(t,e),this.init(t,e[2]);let r,n,a,s=!1,o=!1,u=[],c=[];for(;!this.tokenizer.endOfFile();){if(e=this.tokenizer.nextToken(),r=e[0],r==="("||r==="["?c.push(r==="("?")":"]"):r==="{"&&c.length>0?c.push("}"):r===c[c.length-1]&&c.pop(),c.length===0)if(r===";"){t.source.end=this.getPosition(e[2]),this.semicolon=!0;break}else if(r==="{"){o=!0;break}else if(r==="}"){if(u.length>0){for(a=u.length-1,n=u[a];n&&n[0]==="space";)n=u[--a];n&&(t.source.end=this.getPosition(n[3]||n[2]))}this.end(e);break}else u.push(e);else u.push(e);if(this.tokenizer.endOfFile()){s=!0;break}}t.raws.between=this.spacesAndCommentsFromEnd(u),u.length?(t.raws.afterName=this.spacesAndCommentsFromStart(u),this.raw(t,"params",u),s&&(e=u[u.length-1],t.source.end=this.getPosition(e[3]||e[2]),this.spaces=t.raws.between,t.raws.between="")):(t.raws.afterName="",t.params=""),o&&(t.nodes=[],this.current=t)}end(e){this.current.nodes&&this.current.nodes.length&&(this.current.raws.semicolon=this.semicolon),this.semicolon=!1,this.current.raws.after=(this.current.raws.after||"")+this.spaces,this.spaces="",this.current.parent?(this.current.source.end=this.getPosition(e[2]),this.current=this.current.parent):this.unexpectedClose(e)}endFile(){this.current.parent&&this.unclosedBlock(),this.current.nodes&&this.current.nodes.length&&(this.current.raws.semicolon=this.semicolon),this.current.raws.after=(this.current.raws.after||"")+this.spaces}freeSemicolon(e){if(this.spaces+=e[1],this.current.nodes){let t=this.current.nodes[this.current.nodes.length-1];t&&t.type==="rule"&&!t.raws.ownSemicolon&&(t.raws.ownSemicolon=this.spaces,this.spaces="")}}getPosition(e){let t=this.input.fromOffset(e);return{offset:e,line:t.line,column:t.col}}init(e,t){this.current.push(e),e.source={start:this.getPosition(t),input:this.input},e.raws.before=this.spaces,this.spaces="",e.type!=="comment"&&(this.semicolon=!1)}raw(e,t,r,n){let a,s,o=r.length,u="",c=!0,f,d;for(let p=0;p<o;p+=1)a=r[p],s=a[0],s==="space"&&p===o-1&&!n?c=!1:s==="comment"?(d=r[p-1]?r[p-1][0]:"empty",f=r[p+1]?r[p+1][0]:"empty",!Yf[d]&&!Yf[f]?u.slice(-1)===","?c=!1:u+=a[1]:c=!1):u+=a[1];if(!c){let p=r.reduce((m,w)=>m+w[1],"");e.raws[t]={value:u,raw:p}}e[t]=u}spacesAndCommentsFromEnd(e){let t,r="";for(;e.length&&(t=e[e.length-1][0],!(t!=="space"&&t!=="comment"));)r=e.pop()[1]+r;return r}spacesAndCommentsFromStart(e){let t,r="";for(;e.length&&(t=e[0][0],!(t!=="space"&&t!=="comment"));)r+=e.shift()[1];return r}spacesFromEnd(e){let t,r="";for(;e.length&&(t=e[e.length-1][0],t==="space");)r=e.pop()[1]+r;return r}stringFrom(e,t){let r="";for(let n=t;n<e.length;n++)r+=e[n][1];return e.splice(t,e.length-t),r}colon(e){let t=0,r,n,a;for(let[s,o]of e.entries()){if(r=o,n=r[0],n==="("&&(t+=1),n===")"&&(t-=1),t===0&&n===":")if(!a)this.doubleColon(r);else{if(a[0]==="word"&&a[1]==="progid")continue;return s}a=r}return!1}unclosedBracket(e){throw this.input.error("Unclosed bracket",{offset:e[2]},{offset:e[2]+1})}unknownWord(e){throw this.input.error("Unknown word",{offset:e[0][2]},{offset:e[0][2]+e[0][1].length})}unexpectedClose(e){throw this.input.error("Unexpected }",{offset:e[2]},{offset:e[2]+1})}unclosedBlock(){let e=this.current.source.start;throw this.input.error("Unclosed block",e.line,e.column)}doubleColon(e){throw this.input.error("Double colon",{offset:e[2]},{offset:e[2]+e[1].length})}unnamedAtrule(e,t){throw this.input.error("At-rule without name",{offset:t[2]},{offset:t[2]+t[1].length})}precheckMissedSemicolon(){}checkMissedSemicolon(e){let t=this.colon(e);if(t===!1)return;let r=0,n;for(let a=t-1;a>=0&&(n=e[a],!(n[0]!=="space"&&(r+=1,r===2)));a--);throw this.input.error("Missed semicolon",n[0]==="word"?n[3]+1:n[2])}};Jf.exports=Qf});var Kf=v(()=>{l()});var ec=v((DT,Zf)=>{l();var B0="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict",F0=(i,e=21)=>(t=e)=>{let r="",n=t;for(;n--;)r+=i[Math.random()*i.length|0];return r},N0=(i=21)=>{let e="",t=i;for(;t--;)e+=B0[Math.random()*64|0];return e};Zf.exports={nanoid:N0,customAlphabet:F0}});var Ps=v((IT,tc)=>{l();tc.exports={}});var Vi=v((qT,sc)=>{l();"use strict";var{SourceMapConsumer:L0,SourceMapGenerator:$0}=Kf(),{fileURLToPath:rc,pathToFileURL:zi}=(ys(),af),{resolve:Ds,isAbsolute:Is}=(gt(),rf),{nanoid:j0}=ec(),qs=ws(),ic=ki(),z0=Ps(),Rs=Symbol("fromOffsetCache"),V0=Boolean(L0&&$0),nc=Boolean(Ds&&Is),kr=class{constructor(e,t={}){if(e===null||typeof e=="undefined"||typeof e=="object"&&!e.toString)throw new Error(`PostCSS received ${e} instead of CSS string`);if(this.css=e.toString(),this.css[0]==="\\uFEFF"||this.css[0]==="\\uFFFE"?(this.hasBOM=!0,this.css=this.css.slice(1)):this.hasBOM=!1,t.from&&(!nc||/^\\w+:\\/\\//.test(t.from)||Is(t.from)?this.file=t.from:this.file=Ds(t.from)),nc&&V0){let r=new z0(this.css,t);if(r.text){this.map=r;let n=r.consumer().file;!this.file&&n&&(this.file=this.mapResolve(n))}}this.file||(this.id="<input css "+j0(6)+">"),this.map&&(this.map.file=this.from)}fromOffset(e){let t,r;if(this[Rs])r=this[Rs];else{let a=this.css.split(`\n`);r=new Array(a.length);let s=0;for(let o=0,u=a.length;o<u;o++)r[o]=s,s+=a[o].length+1;this[Rs]=r}t=r[r.length-1];let n=0;if(e>=t)n=r.length-1;else{let a=r.length-2,s;for(;n<a;)if(s=n+(a-n>>1),e<r[s])a=s-1;else if(e>=r[s+1])n=s+1;else{n=s;break}}return{line:n+1,col:e-r[n]+1}}error(e,t,r,n={}){let a,s,o;if(t&&typeof t=="object"){let c=t,f=r;if(typeof c.offset=="number"){let d=this.fromOffset(c.offset);t=d.line,r=d.col}else t=c.line,r=c.column;if(typeof f.offset=="number"){let d=this.fromOffset(f.offset);s=d.line,o=d.col}else s=f.line,o=f.column}else if(!r){let c=this.fromOffset(t);t=c.line,r=c.col}let u=this.origin(t,r,s,o);return u?a=new ic(e,u.endLine===void 0?u.line:{line:u.line,column:u.column},u.endLine===void 0?u.column:{line:u.endLine,column:u.endColumn},u.source,u.file,n.plugin):a=new ic(e,s===void 0?t:{line:t,column:r},s===void 0?r:{line:s,column:o},this.css,this.file,n.plugin),a.input={line:t,column:r,endLine:s,endColumn:o,source:this.css},this.file&&(zi&&(a.input.url=zi(this.file).toString()),a.input.file=this.file),a}origin(e,t,r,n){if(!this.map)return!1;let a=this.map.consumer(),s=a.originalPositionFor({line:e,column:t});if(!s.source)return!1;let o;typeof r=="number"&&(o=a.originalPositionFor({line:r,column:n}));let u;Is(s.source)?u=zi(s.source):u=new URL(s.source,this.map.consumer().sourceRoot||zi(this.map.mapFile));let c={url:u.toString(),line:s.line,column:s.column,endLine:o&&o.line,endColumn:o&&o.column};if(u.protocol==="file:")if(rc)c.file=rc(u);else throw new Error("file: protocol is not available in this PostCSS build");let f=a.sourceContentFor(s.source);return f&&(c.source=f),c}mapResolve(e){return/^\\w+:\\/\\//.test(e)?e:Ds(this.map.consumer().sourceRoot||this.map.root||".",e)}get from(){return this.file||this.id}toJSON(){let e={};for(let t of["hasBOM","css","file","id"])this[t]!=null&&(e[t]=this[t]);return this.map&&(e.map={...this.map},e.map.consumerCache&&(e.map.consumerCache=void 0)),e}};sc.exports=kr;kr.default=kr;qs&&qs.registerInput&&qs.registerInput(kr)});var Wi=v((RT,ac)=>{l();"use strict";var U0=it(),W0=Xf(),G0=Vi();function Ui(i,e){let t=new G0(i,e),r=new W0(t);try{r.parse()}catch(n){throw n}return r.root}ac.exports=Ui;Ui.default=Ui;U0.registerParse(Ui)});var Fs=v((BT,fc)=>{l();"use strict";var{isClean:Ie,my:H0}=Si(),Y0=Ss(),Q0=hr(),J0=it(),X0=Ti(),MT=_s(),oc=Ii(),K0=Wi(),Z0=Et(),ev={document:"Document",root:"Root",atrule:"AtRule",rule:"Rule",decl:"Declaration",comment:"Comment"},tv={postcssPlugin:!0,prepare:!0,Once:!0,Document:!0,Root:!0,Declaration:!0,Rule:!0,AtRule:!0,Comment:!0,DeclarationExit:!0,RuleExit:!0,AtRuleExit:!0,CommentExit:!0,RootExit:!0,DocumentExit:!0,OnceExit:!0},rv={postcssPlugin:!0,prepare:!0,Once:!0},Tt=0;function Sr(i){return typeof i=="object"&&typeof i.then=="function"}function lc(i){let e=!1,t=ev[i.type];return i.type==="decl"?e=i.prop.toLowerCase():i.type==="atrule"&&(e=i.name.toLowerCase()),e&&i.append?[t,t+"-"+e,Tt,t+"Exit",t+"Exit-"+e]:e?[t,t+"-"+e,t+"Exit",t+"Exit-"+e]:i.append?[t,Tt,t+"Exit"]:[t,t+"Exit"]}function uc(i){let e;return i.type==="document"?e=["Document",Tt,"DocumentExit"]:i.type==="root"?e=["Root",Tt,"RootExit"]:e=lc(i),{node:i,events:e,eventIndex:0,visitors:[],visitorIndex:0,iterator:0}}function Ms(i){return i[Ie]=!1,i.nodes&&i.nodes.forEach(e=>Ms(e)),i}var Bs={},Ve=class{constructor(e,t,r){this.stringified=!1,this.processed=!1;let n;if(typeof t=="object"&&t!==null&&(t.type==="root"||t.type==="document"))n=Ms(t);else if(t instanceof Ve||t instanceof oc)n=Ms(t.root),t.map&&(typeof r.map=="undefined"&&(r.map={}),r.map.inline||(r.map.inline=!1),r.map.prev=t.map);else{let a=K0;r.syntax&&(a=r.syntax.parse),r.parser&&(a=r.parser),a.parse&&(a=a.parse);try{n=a(t,r)}catch(s){this.processed=!0,this.error=s}n&&!n[H0]&&J0.rebuild(n)}this.result=new oc(e,n,r),this.helpers={...Bs,result:this.result,postcss:Bs},this.plugins=this.processor.plugins.map(a=>typeof a=="object"&&a.prepare?{...a,...a.prepare(this.result)}:a)}get[Symbol.toStringTag](){return"LazyResult"}get processor(){return this.result.processor}get opts(){return this.result.opts}get css(){return this.stringify().css}get content(){return this.stringify().content}get map(){return this.stringify().map}get root(){return this.sync().root}get messages(){return this.sync().messages}warnings(){return this.sync().warnings()}toString(){return this.css}then(e,t){return this.async().then(e,t)}catch(e){return this.async().catch(e)}finally(e){return this.async().then(e,e)}async(){return this.error?Promise.reject(this.error):this.processed?Promise.resolve(this.result):(this.processing||(this.processing=this.runAsync()),this.processing)}sync(){if(this.error)throw this.error;if(this.processed)return this.result;if(this.processed=!0,this.processing)throw this.getAsyncError();for(let e of this.plugins){let t=this.runOnRoot(e);if(Sr(t))throw this.getAsyncError()}if(this.prepareVisitors(),this.hasListener){let e=this.result.root;for(;!e[Ie];)e[Ie]=!0,this.walkSync(e);if(this.listeners.OnceExit)if(e.type==="document")for(let t of e.nodes)this.visitSync(this.listeners.OnceExit,t);else this.visitSync(this.listeners.OnceExit,e)}return this.result}stringify(){if(this.error)throw this.error;if(this.stringified)return this.result;this.stringified=!0,this.sync();let e=this.result.opts,t=Q0;e.syntax&&(t=e.syntax.stringify),e.stringifier&&(t=e.stringifier),t.stringify&&(t=t.stringify);let n=new Y0(t,this.result.root,this.result.opts).generate();return this.result.css=n[0],this.result.map=n[1],this.result}walkSync(e){e[Ie]=!0;let t=lc(e);for(let r of t)if(r===Tt)e.nodes&&e.each(n=>{n[Ie]||this.walkSync(n)});else{let n=this.listeners[r];if(n&&this.visitSync(n,e.toProxy()))return}}visitSync(e,t){for(let[r,n]of e){this.result.lastPlugin=r;let a;try{a=n(t,this.helpers)}catch(s){throw this.handleError(s,t.proxyOf)}if(t.type!=="root"&&t.type!=="document"&&!t.parent)return!0;if(Sr(a))throw this.getAsyncError()}}runOnRoot(e){this.result.lastPlugin=e;try{if(typeof e=="object"&&e.Once){if(this.result.root.type==="document"){let t=this.result.root.nodes.map(r=>e.Once(r,this.helpers));return Sr(t[0])?Promise.all(t):t}return e.Once(this.result.root,this.helpers)}else if(typeof e=="function")return e(this.result.root,this.result)}catch(t){throw this.handleError(t)}}getAsyncError(){throw new Error("Use process(css).then(cb) to work with async plugins")}handleError(e,t){let r=this.result.lastPlugin;try{t&&t.addToError(e),this.error=e,e.name==="CssSyntaxError"&&!e.plugin?(e.plugin=r.postcssPlugin,e.setMessage()):r.postcssVersion}catch(n){console&&console.error&&console.error(n)}return e}async runAsync(){this.plugin=0;for(let e=0;e<this.plugins.length;e++){let t=this.plugins[e],r=this.runOnRoot(t);if(Sr(r))try{await r}catch(n){throw this.handleError(n)}}if(this.prepareVisitors(),this.hasListener){let e=this.result.root;for(;!e[Ie];){e[Ie]=!0;let t=[uc(e)];for(;t.length>0;){let r=this.visitTick(t);if(Sr(r))try{await r}catch(n){let a=t[t.length-1].node;throw this.handleError(n,a)}}}if(this.listeners.OnceExit)for(let[t,r]of this.listeners.OnceExit){this.result.lastPlugin=t;try{if(e.type==="document"){let n=e.nodes.map(a=>r(a,this.helpers));await Promise.all(n)}else await r(e,this.helpers)}catch(n){throw this.handleError(n)}}}return this.processed=!0,this.stringify()}prepareVisitors(){this.listeners={};let e=(t,r,n)=>{this.listeners[r]||(this.listeners[r]=[]),this.listeners[r].push([t,n])};for(let t of this.plugins)if(typeof t=="object")for(let r in t){if(!tv[r]&&/^[A-Z]/.test(r))throw new Error(`Unknown event ${r} in ${t.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`);if(!rv[r])if(typeof t[r]=="object")for(let n in t[r])n==="*"?e(t,r,t[r][n]):e(t,r+"-"+n.toLowerCase(),t[r][n]);else typeof t[r]=="function"&&e(t,r,t[r])}this.hasListener=Object.keys(this.listeners).length>0}visitTick(e){let t=e[e.length-1],{node:r,visitors:n}=t;if(r.type!=="root"&&r.type!=="document"&&!r.parent){e.pop();return}if(n.length>0&&t.visitorIndex<n.length){let[s,o]=n[t.visitorIndex];t.visitorIndex+=1,t.visitorIndex===n.length&&(t.visitors=[],t.visitorIndex=0),this.result.lastPlugin=s;try{return o(r.toProxy(),this.helpers)}catch(u){throw this.handleError(u,r)}}if(t.iterator!==0){let s=t.iterator,o;for(;o=r.nodes[r.indexes[s]];)if(r.indexes[s]+=1,!o[Ie]){o[Ie]=!0,e.push(uc(o));return}t.iterator=0,delete r.indexes[s]}let a=t.events;for(;t.eventIndex<a.length;){let s=a[t.eventIndex];if(t.eventIndex+=1,s===Tt){r.nodes&&r.nodes.length&&(r[Ie]=!0,t.iterator=r.getIterator());return}else if(this.listeners[s]){t.visitors=this.listeners[s];return}}e.pop()}};Ve.registerPostcss=i=>{Bs=i};fc.exports=Ve;Ve.default=Ve;Z0.registerLazyResult(Ve);X0.registerLazyResult(Ve)});var pc=v((NT,cc)=>{l();"use strict";var iv=Ss(),nv=hr(),FT=_s(),sv=Wi(),av=Ii(),Gi=class{constructor(e,t,r){t=t.toString(),this.stringified=!1,this._processor=e,this._css=t,this._opts=r,this._map=void 0;let n,a=nv;this.result=new av(this._processor,n,this._opts),this.result.css=t;let s=this;Object.defineProperty(this.result,"root",{get(){return s.root}});let o=new iv(a,n,this._opts,t);if(o.isMap()){let[u,c]=o.generate();u&&(this.result.css=u),c&&(this.result.map=c)}}get[Symbol.toStringTag](){return"NoWorkResult"}get processor(){return this.result.processor}get opts(){return this.result.opts}get css(){return this.result.css}get content(){return this.result.css}get map(){return this.result.map}get root(){if(this._root)return this._root;let e,t=sv;try{e=t(this._css,this._opts)}catch(r){this.error=r}if(this.error)throw this.error;return this._root=e,e}get messages(){return[]}warnings(){return[]}toString(){return this._css}then(e,t){return this.async().then(e,t)}catch(e){return this.async().catch(e)}finally(e){return this.async().then(e,e)}async(){return this.error?Promise.reject(this.error):Promise.resolve(this.result)}sync(){if(this.error)throw this.error;return this.result}};cc.exports=Gi;Gi.default=Gi});var hc=v((LT,dc)=>{l();"use strict";var ov=pc(),lv=Fs(),uv=Ti(),fv=Et(),Pt=class{constructor(e=[]){this.version="8.4.24",this.plugins=this.normalize(e)}use(e){return this.plugins=this.plugins.concat(this.normalize([e])),this}process(e,t={}){return this.plugins.length===0&&typeof t.parser=="undefined"&&typeof t.stringifier=="undefined"&&typeof t.syntax=="undefined"?new ov(this,e,t):new lv(this,e,t)}normalize(e){let t=[];for(let r of e)if(r.postcss===!0?r=r():r.postcss&&(r=r.postcss),typeof r=="object"&&Array.isArray(r.plugins))t=t.concat(r.plugins);else if(typeof r=="object"&&r.postcssPlugin)t.push(r);else if(typeof r=="function")t.push(r);else if(!(typeof r=="object"&&(r.parse||r.stringify)))throw new Error(r+" is not a PostCSS plugin");return t}};dc.exports=Pt;Pt.default=Pt;fv.registerProcessor(Pt);uv.registerProcessor(Pt)});var gc=v(($T,mc)=>{l();"use strict";var cv=gr(),pv=Ps(),dv=yr(),hv=$i(),mv=Vi(),gv=Et(),yv=ji();function Cr(i,e){if(Array.isArray(i))return i.map(n=>Cr(n));let{inputs:t,...r}=i;if(t){e=[];for(let n of t){let a={...n,__proto__:mv.prototype};a.map&&(a.map={...a.map,__proto__:pv.prototype}),e.push(a)}}if(r.nodes&&(r.nodes=i.nodes.map(n=>Cr(n,e))),r.source){let{inputId:n,...a}=r.source;r.source=a,n!=null&&(r.source.input=e[n])}if(r.type==="root")return new gv(r);if(r.type==="decl")return new cv(r);if(r.type==="rule")return new yv(r);if(r.type==="comment")return new dv(r);if(r.type==="atrule")return new hv(r);throw new Error("Unknown node type: "+i.type)}mc.exports=Cr;Cr.default=Cr});var ge=v((jT,Sc)=>{l();"use strict";var wv=ki(),yc=gr(),bv=Fs(),vv=it(),Ns=hc(),xv=hr(),kv=gc(),wc=Ti(),Sv=Os(),bc=yr(),vc=$i(),Cv=Ii(),Av=Vi(),_v=Wi(),Ov=Ts(),xc=ji(),kc=Et(),Ev=mr();function z(...i){return i.length===1&&Array.isArray(i[0])&&(i=i[0]),new Ns(i)}z.plugin=function(e,t){let r=!1;function n(...s){console&&console.warn&&!r&&(r=!0,console.warn(e+`: postcss.plugin was deprecated. Migration guide:\nhttps://evilmartians.com/chronicles/postcss-8-plugin-migration`),h.env.LANG&&h.env.LANG.startsWith("cn")&&console.warn(e+`: \\u91CC\\u9762 postcss.plugin \\u88AB\\u5F03\\u7528. \\u8FC1\\u79FB\\u6307\\u5357:\nhttps://www.w3ctech.com/topic/2226`));let o=t(...s);return o.postcssPlugin=e,o.postcssVersion=new Ns().version,o}let a;return Object.defineProperty(n,"postcss",{get(){return a||(a=n()),a}}),n.process=function(s,o,u){return z([n(u)]).process(s,o)},n};z.stringify=xv;z.parse=_v;z.fromJSON=kv;z.list=Ov;z.comment=i=>new bc(i);z.atRule=i=>new vc(i);z.decl=i=>new yc(i);z.rule=i=>new xc(i);z.root=i=>new kc(i);z.document=i=>new wc(i);z.CssSyntaxError=wv;z.Declaration=yc;z.Container=vv;z.Processor=Ns;z.Document=wc;z.Comment=bc;z.Warning=Sv;z.AtRule=vc;z.Result=Cv;z.Input=Av;z.Rule=xc;z.Root=kc;z.Node=Ev;bv.registerPostcss(z);Sc.exports=z;z.default=z});var W,V,zT,VT,UT,WT,GT,HT,YT,QT,JT,XT,KT,ZT,e3,t3,r3,i3,n3,s3,a3,o3,l3,u3,f3,c3,nt=C(()=>{l();W=K(ge()),V=W.default,zT=W.default.stringify,VT=W.default.fromJSON,UT=W.default.plugin,WT=W.default.parse,GT=W.default.list,HT=W.default.document,YT=W.default.comment,QT=W.default.atRule,JT=W.default.rule,XT=W.default.decl,KT=W.default.root,ZT=W.default.CssSyntaxError,e3=W.default.Declaration,t3=W.default.Container,r3=W.default.Processor,i3=W.default.Document,n3=W.default.Comment,s3=W.default.Warning,a3=W.default.AtRule,o3=W.default.Result,l3=W.default.Input,u3=W.default.Rule,f3=W.default.Root,c3=W.default.Node});var Ls=v((d3,Cc)=>{l();Cc.exports=function(i,e,t,r,n){for(e=e.split?e.split("."):e,r=0;r<e.length;r++)i=i?i[e[r]]:n;return i===n?t:i}});var Yi=v((Hi,Ac)=>{l();"use strict";Hi.__esModule=!0;Hi.default=Dv;function Tv(i){for(var e=i.toLowerCase(),t="",r=!1,n=0;n<6&&e[n]!==void 0;n++){var a=e.charCodeAt(n),s=a>=97&&a<=102||a>=48&&a<=57;if(r=a===32,!s)break;t+=e[n]}if(t.length!==0){var o=parseInt(t,16),u=o>=55296&&o<=57343;return u||o===0||o>1114111?["\\uFFFD",t.length+(r?1:0)]:[String.fromCodePoint(o),t.length+(r?1:0)]}}var Pv=/\\\\/;function Dv(i){var e=Pv.test(i);if(!e)return i;for(var t="",r=0;r<i.length;r++){if(i[r]==="\\\\"){var n=Tv(i.slice(r+1,r+7));if(n!==void 0){t+=n[0],r+=n[1];continue}if(i[r+1]==="\\\\"){t+="\\\\",r++;continue}i.length===r+1&&(t+=i[r]);continue}t+=i[r]}return t}Ac.exports=Hi.default});var Oc=v((Qi,_c)=>{l();"use strict";Qi.__esModule=!0;Qi.default=Iv;function Iv(i){for(var e=arguments.length,t=new Array(e>1?e-1:0),r=1;r<e;r++)t[r-1]=arguments[r];for(;t.length>0;){var n=t.shift();if(!i[n])return;i=i[n]}return i}_c.exports=Qi.default});var Tc=v((Ji,Ec)=>{l();"use strict";Ji.__esModule=!0;Ji.default=qv;function qv(i){for(var e=arguments.length,t=new Array(e>1?e-1:0),r=1;r<e;r++)t[r-1]=arguments[r];for(;t.length>0;){var n=t.shift();i[n]||(i[n]={}),i=i[n]}}Ec.exports=Ji.default});var Dc=v((Xi,Pc)=>{l();"use strict";Xi.__esModule=!0;Xi.default=Rv;function Rv(i){for(var e="",t=i.indexOf("/*"),r=0;t>=0;){e=e+i.slice(r,t);var n=i.indexOf("*/",t+2);if(n<0)return e;r=n+2,t=i.indexOf("/*",r)}return e=e+i.slice(r),e}Pc.exports=Xi.default});var Ar=v(qe=>{l();"use strict";qe.__esModule=!0;qe.unesc=qe.stripComments=qe.getProp=qe.ensureObject=void 0;var Mv=Ki(Yi());qe.unesc=Mv.default;var Bv=Ki(Oc());qe.getProp=Bv.default;var Fv=Ki(Tc());qe.ensureObject=Fv.default;var Nv=Ki(Dc());qe.stripComments=Nv.default;function Ki(i){return i&&i.__esModule?i:{default:i}}});var Ue=v((_r,Rc)=>{l();"use strict";_r.__esModule=!0;_r.default=void 0;var Ic=Ar();function qc(i,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(i,r.key,r)}}function Lv(i,e,t){return e&&qc(i.prototype,e),t&&qc(i,t),Object.defineProperty(i,"prototype",{writable:!1}),i}var $v=function i(e,t){if(typeof e!="object"||e===null)return e;var r=new e.constructor;for(var n in e)if(!!e.hasOwnProperty(n)){var a=e[n],s=typeof a;n==="parent"&&s==="object"?t&&(r[n]=t):a instanceof Array?r[n]=a.map(function(o){return i(o,r)}):r[n]=i(a,r)}return r},jv=function(){function i(t){t===void 0&&(t={}),Object.assign(this,t),this.spaces=this.spaces||{},this.spaces.before=this.spaces.before||"",this.spaces.after=this.spaces.after||""}var e=i.prototype;return e.remove=function(){return this.parent&&this.parent.removeChild(this),this.parent=void 0,this},e.replaceWith=function(){if(this.parent){for(var r in arguments)this.parent.insertBefore(this,arguments[r]);this.remove()}return this},e.next=function(){return this.parent.at(this.parent.index(this)+1)},e.prev=function(){return this.parent.at(this.parent.index(this)-1)},e.clone=function(r){r===void 0&&(r={});var n=$v(this);for(var a in r)n[a]=r[a];return n},e.appendToPropertyAndEscape=function(r,n,a){this.raws||(this.raws={});var s=this[r],o=this.raws[r];this[r]=s+n,o||a!==n?this.raws[r]=(o||s)+a:delete this.raws[r]},e.setPropertyAndEscape=function(r,n,a){this.raws||(this.raws={}),this[r]=n,this.raws[r]=a},e.setPropertyWithoutEscape=function(r,n){this[r]=n,this.raws&&delete this.raws[r]},e.isAtPosition=function(r,n){if(this.source&&this.source.start&&this.source.end)return!(this.source.start.line>r||this.source.end.line<r||this.source.start.line===r&&this.source.start.column>n||this.source.end.line===r&&this.source.end.column<n)},e.stringifyProperty=function(r){return this.raws&&this.raws[r]||this[r]},e.valueToString=function(){return String(this.stringifyProperty("value"))},e.toString=function(){return[this.rawSpaceBefore,this.valueToString(),this.rawSpaceAfter].join("")},Lv(i,[{key:"rawSpaceBefore",get:function(){var r=this.raws&&this.raws.spaces&&this.raws.spaces.before;return r===void 0&&(r=this.spaces&&this.spaces.before),r||""},set:function(r){(0,Ic.ensureObject)(this,"raws","spaces"),this.raws.spaces.before=r}},{key:"rawSpaceAfter",get:function(){var r=this.raws&&this.raws.spaces&&this.raws.spaces.after;return r===void 0&&(r=this.spaces.after),r||""},set:function(r){(0,Ic.ensureObject)(this,"raws","spaces"),this.raws.spaces.after=r}}]),i}();_r.default=jv;Rc.exports=_r.default});var se=v(G=>{l();"use strict";G.__esModule=!0;G.UNIVERSAL=G.TAG=G.STRING=G.SELECTOR=G.ROOT=G.PSEUDO=G.NESTING=G.ID=G.COMMENT=G.COMBINATOR=G.CLASS=G.ATTRIBUTE=void 0;var zv="tag";G.TAG=zv;var Vv="string";G.STRING=Vv;var Uv="selector";G.SELECTOR=Uv;var Wv="root";G.ROOT=Wv;var Gv="pseudo";G.PSEUDO=Gv;var Hv="nesting";G.NESTING=Hv;var Yv="id";G.ID=Yv;var Qv="comment";G.COMMENT=Qv;var Jv="combinator";G.COMBINATOR=Jv;var Xv="class";G.CLASS=Xv;var Kv="attribute";G.ATTRIBUTE=Kv;var Zv="universal";G.UNIVERSAL=Zv});var Zi=v((Or,Nc)=>{l();"use strict";Or.__esModule=!0;Or.default=void 0;var ex=rx(Ue()),We=tx(se());function Mc(i){if(typeof WeakMap!="function")return null;var e=new WeakMap,t=new WeakMap;return(Mc=function(n){return n?t:e})(i)}function tx(i,e){if(!e&&i&&i.__esModule)return i;if(i===null||typeof i!="object"&&typeof i!="function")return{default:i};var t=Mc(e);if(t&&t.has(i))return t.get(i);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in i)if(a!=="default"&&Object.prototype.hasOwnProperty.call(i,a)){var s=n?Object.getOwnPropertyDescriptor(i,a):null;s&&(s.get||s.set)?Object.defineProperty(r,a,s):r[a]=i[a]}return r.default=i,t&&t.set(i,r),r}function rx(i){return i&&i.__esModule?i:{default:i}}function ix(i,e){var t=typeof Symbol!="undefined"&&i[Symbol.iterator]||i["@@iterator"];if(t)return(t=t.call(i)).next.bind(t);if(Array.isArray(i)||(t=nx(i))||e&&i&&typeof i.length=="number"){t&&(i=t);var r=0;return function(){return r>=i.length?{done:!0}:{done:!1,value:i[r++]}}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function nx(i,e){if(!!i){if(typeof i=="string")return Bc(i,e);var t=Object.prototype.toString.call(i).slice(8,-1);if(t==="Object"&&i.constructor&&(t=i.constructor.name),t==="Map"||t==="Set")return Array.from(i);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return Bc(i,e)}}function Bc(i,e){(e==null||e>i.length)&&(e=i.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=i[t];return r}function Fc(i,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(i,r.key,r)}}function sx(i,e,t){return e&&Fc(i.prototype,e),t&&Fc(i,t),Object.defineProperty(i,"prototype",{writable:!1}),i}function ax(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,$s(i,e)}function $s(i,e){return $s=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},$s(i,e)}var ox=function(i){ax(e,i);function e(r){var n;return n=i.call(this,r)||this,n.nodes||(n.nodes=[]),n}var t=e.prototype;return t.append=function(n){return n.parent=this,this.nodes.push(n),this},t.prepend=function(n){return n.parent=this,this.nodes.unshift(n),this},t.at=function(n){return this.nodes[n]},t.index=function(n){return typeof n=="number"?n:this.nodes.indexOf(n)},t.removeChild=function(n){n=this.index(n),this.at(n).parent=void 0,this.nodes.splice(n,1);var a;for(var s in this.indexes)a=this.indexes[s],a>=n&&(this.indexes[s]=a-1);return this},t.removeAll=function(){for(var n=ix(this.nodes),a;!(a=n()).done;){var s=a.value;s.parent=void 0}return this.nodes=[],this},t.empty=function(){return this.removeAll()},t.insertAfter=function(n,a){a.parent=this;var s=this.index(n);this.nodes.splice(s+1,0,a),a.parent=this;var o;for(var u in this.indexes)o=this.indexes[u],s<=o&&(this.indexes[u]=o+1);return this},t.insertBefore=function(n,a){a.parent=this;var s=this.index(n);this.nodes.splice(s,0,a),a.parent=this;var o;for(var u in this.indexes)o=this.indexes[u],o<=s&&(this.indexes[u]=o+1);return this},t._findChildAtPosition=function(n,a){var s=void 0;return this.each(function(o){if(o.atPosition){var u=o.atPosition(n,a);if(u)return s=u,!1}else if(o.isAtPosition(n,a))return s=o,!1}),s},t.atPosition=function(n,a){if(this.isAtPosition(n,a))return this._findChildAtPosition(n,a)||this},t._inferEndPosition=function(){this.last&&this.last.source&&this.last.source.end&&(this.source=this.source||{},this.source.end=this.source.end||{},Object.assign(this.source.end,this.last.source.end))},t.each=function(n){this.lastEach||(this.lastEach=0),this.indexes||(this.indexes={}),this.lastEach++;var a=this.lastEach;if(this.indexes[a]=0,!!this.length){for(var s,o;this.indexes[a]<this.length&&(s=this.indexes[a],o=n(this.at(s),s),o!==!1);)this.indexes[a]+=1;if(delete this.indexes[a],o===!1)return!1}},t.walk=function(n){return this.each(function(a,s){var o=n(a,s);if(o!==!1&&a.length&&(o=a.walk(n)),o===!1)return!1})},t.walkAttributes=function(n){var a=this;return this.walk(function(s){if(s.type===We.ATTRIBUTE)return n.call(a,s)})},t.walkClasses=function(n){var a=this;return this.walk(function(s){if(s.type===We.CLASS)return n.call(a,s)})},t.walkCombinators=function(n){var a=this;return this.walk(function(s){if(s.type===We.COMBINATOR)return n.call(a,s)})},t.walkComments=function(n){var a=this;return this.walk(function(s){if(s.type===We.COMMENT)return n.call(a,s)})},t.walkIds=function(n){var a=this;return this.walk(function(s){if(s.type===We.ID)return n.call(a,s)})},t.walkNesting=function(n){var a=this;return this.walk(function(s){if(s.type===We.NESTING)return n.call(a,s)})},t.walkPseudos=function(n){var a=this;return this.walk(function(s){if(s.type===We.PSEUDO)return n.call(a,s)})},t.walkTags=function(n){var a=this;return this.walk(function(s){if(s.type===We.TAG)return n.call(a,s)})},t.walkUniversals=function(n){var a=this;return this.walk(function(s){if(s.type===We.UNIVERSAL)return n.call(a,s)})},t.split=function(n){var a=this,s=[];return this.reduce(function(o,u,c){var f=n.call(a,u);return s.push(u),f?(o.push(s),s=[]):c===a.length-1&&o.push(s),o},[])},t.map=function(n){return this.nodes.map(n)},t.reduce=function(n,a){return this.nodes.reduce(n,a)},t.every=function(n){return this.nodes.every(n)},t.some=function(n){return this.nodes.some(n)},t.filter=function(n){return this.nodes.filter(n)},t.sort=function(n){return this.nodes.sort(n)},t.toString=function(){return this.map(String).join("")},sx(e,[{key:"first",get:function(){return this.at(0)}},{key:"last",get:function(){return this.at(this.length-1)}},{key:"length",get:function(){return this.nodes.length}}]),e}(ex.default);Or.default=ox;Nc.exports=Or.default});var zs=v((Er,$c)=>{l();"use strict";Er.__esModule=!0;Er.default=void 0;var lx=fx(Zi()),ux=se();function fx(i){return i&&i.__esModule?i:{default:i}}function Lc(i,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(i,r.key,r)}}function cx(i,e,t){return e&&Lc(i.prototype,e),t&&Lc(i,t),Object.defineProperty(i,"prototype",{writable:!1}),i}function px(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,js(i,e)}function js(i,e){return js=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},js(i,e)}var dx=function(i){px(e,i);function e(r){var n;return n=i.call(this,r)||this,n.type=ux.ROOT,n}var t=e.prototype;return t.toString=function(){var n=this.reduce(function(a,s){return a.push(String(s)),a},[]).join(",");return this.trailingComma?n+",":n},t.error=function(n,a){return this._error?this._error(n,a):new Error(n)},cx(e,[{key:"errorGenerator",set:function(n){this._error=n}}]),e}(lx.default);Er.default=dx;$c.exports=Er.default});var Us=v((Tr,jc)=>{l();"use strict";Tr.__esModule=!0;Tr.default=void 0;var hx=gx(Zi()),mx=se();function gx(i){return i&&i.__esModule?i:{default:i}}function yx(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,Vs(i,e)}function Vs(i,e){return Vs=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},Vs(i,e)}var wx=function(i){yx(e,i);function e(t){var r;return r=i.call(this,t)||this,r.type=mx.SELECTOR,r}return e}(hx.default);Tr.default=wx;jc.exports=Tr.default});var en=v((g3,zc)=>{l();"use strict";var bx={},vx=bx.hasOwnProperty,xx=function(e,t){if(!e)return t;var r={};for(var n in t)r[n]=vx.call(e,n)?e[n]:t[n];return r},kx=/[ -,\\.\\/:-@\\[-\\^`\\{-~]/,Sx=/[ -,\\.\\/:-@\\[\\]\\^`\\{-~]/,Cx=/(^|\\\\+)?(\\\\[A-F0-9]{1,6})\\x20(?![a-fA-F0-9\\x20])/g,Ws=function i(e,t){t=xx(t,i.options),t.quotes!="single"&&t.quotes!="double"&&(t.quotes="single");for(var r=t.quotes=="double"?\'"\':"\'",n=t.isIdentifier,a=e.charAt(0),s="",o=0,u=e.length;o<u;){var c=e.charAt(o++),f=c.charCodeAt(),d=void 0;if(f<32||f>126){if(f>=55296&&f<=56319&&o<u){var p=e.charCodeAt(o++);(p&64512)==56320?f=((f&1023)<<10)+(p&1023)+65536:o--}d="\\\\"+f.toString(16).toUpperCase()+" "}else t.escapeEverything?kx.test(c)?d="\\\\"+c:d="\\\\"+f.toString(16).toUpperCase()+" ":/[\\t\\n\\f\\r\\x0B]/.test(c)?d="\\\\"+f.toString(16).toUpperCase()+" ":c=="\\\\"||!n&&(c==\'"\'&&r==c||c=="\'"&&r==c)||n&&Sx.test(c)?d="\\\\"+c:d=c;s+=d}return n&&(/^-[-\\d]/.test(s)?s="\\\\-"+s.slice(1):/\\d/.test(a)&&(s="\\\\3"+a+" "+s.slice(1))),s=s.replace(Cx,function(m,w,x){return w&&w.length%2?m:(w||"")+x}),!n&&t.wrap?r+s+r:s};Ws.options={escapeEverything:!1,isIdentifier:!1,quotes:"single",wrap:!1};Ws.version="3.0.0";zc.exports=Ws});var Hs=v((Pr,Wc)=>{l();"use strict";Pr.__esModule=!0;Pr.default=void 0;var Ax=Vc(en()),_x=Ar(),Ox=Vc(Ue()),Ex=se();function Vc(i){return i&&i.__esModule?i:{default:i}}function Uc(i,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(i,r.key,r)}}function Tx(i,e,t){return e&&Uc(i.prototype,e),t&&Uc(i,t),Object.defineProperty(i,"prototype",{writable:!1}),i}function Px(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,Gs(i,e)}function Gs(i,e){return Gs=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},Gs(i,e)}var Dx=function(i){Px(e,i);function e(r){var n;return n=i.call(this,r)||this,n.type=Ex.CLASS,n._constructed=!0,n}var t=e.prototype;return t.valueToString=function(){return"."+i.prototype.valueToString.call(this)},Tx(e,[{key:"value",get:function(){return this._value},set:function(n){if(this._constructed){var a=(0,Ax.default)(n,{isIdentifier:!0});a!==n?((0,_x.ensureObject)(this,"raws"),this.raws.value=a):this.raws&&delete this.raws.value}this._value=n}}]),e}(Ox.default);Pr.default=Dx;Wc.exports=Pr.default});var Qs=v((Dr,Gc)=>{l();"use strict";Dr.__esModule=!0;Dr.default=void 0;var Ix=Rx(Ue()),qx=se();function Rx(i){return i&&i.__esModule?i:{default:i}}function Mx(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,Ys(i,e)}function Ys(i,e){return Ys=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},Ys(i,e)}var Bx=function(i){Mx(e,i);function e(t){var r;return r=i.call(this,t)||this,r.type=qx.COMMENT,r}return e}(Ix.default);Dr.default=Bx;Gc.exports=Dr.default});var Xs=v((Ir,Hc)=>{l();"use strict";Ir.__esModule=!0;Ir.default=void 0;var Fx=Lx(Ue()),Nx=se();function Lx(i){return i&&i.__esModule?i:{default:i}}function $x(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,Js(i,e)}function Js(i,e){return Js=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},Js(i,e)}var jx=function(i){$x(e,i);function e(r){var n;return n=i.call(this,r)||this,n.type=Nx.ID,n}var t=e.prototype;return t.valueToString=function(){return"#"+i.prototype.valueToString.call(this)},e}(Fx.default);Ir.default=jx;Hc.exports=Ir.default});var tn=v((qr,Jc)=>{l();"use strict";qr.__esModule=!0;qr.default=void 0;var zx=Yc(en()),Vx=Ar(),Ux=Yc(Ue());function Yc(i){return i&&i.__esModule?i:{default:i}}function Qc(i,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(i,r.key,r)}}function Wx(i,e,t){return e&&Qc(i.prototype,e),t&&Qc(i,t),Object.defineProperty(i,"prototype",{writable:!1}),i}function Gx(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,Ks(i,e)}function Ks(i,e){return Ks=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},Ks(i,e)}var Hx=function(i){Gx(e,i);function e(){return i.apply(this,arguments)||this}var t=e.prototype;return t.qualifiedName=function(n){return this.namespace?this.namespaceString+"|"+n:n},t.valueToString=function(){return this.qualifiedName(i.prototype.valueToString.call(this))},Wx(e,[{key:"namespace",get:function(){return this._namespace},set:function(n){if(n===!0||n==="*"||n==="&"){this._namespace=n,this.raws&&delete this.raws.namespace;return}var a=(0,zx.default)(n,{isIdentifier:!0});this._namespace=n,a!==n?((0,Vx.ensureObject)(this,"raws"),this.raws.namespace=a):this.raws&&delete this.raws.namespace}},{key:"ns",get:function(){return this._namespace},set:function(n){this.namespace=n}},{key:"namespaceString",get:function(){if(this.namespace){var n=this.stringifyProperty("namespace");return n===!0?"":n}else return""}}]),e}(Ux.default);qr.default=Hx;Jc.exports=qr.default});var ea=v((Rr,Xc)=>{l();"use strict";Rr.__esModule=!0;Rr.default=void 0;var Yx=Jx(tn()),Qx=se();function Jx(i){return i&&i.__esModule?i:{default:i}}function Xx(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,Zs(i,e)}function Zs(i,e){return Zs=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},Zs(i,e)}var Kx=function(i){Xx(e,i);function e(t){var r;return r=i.call(this,t)||this,r.type=Qx.TAG,r}return e}(Yx.default);Rr.default=Kx;Xc.exports=Rr.default});var ra=v((Mr,Kc)=>{l();"use strict";Mr.__esModule=!0;Mr.default=void 0;var Zx=t1(Ue()),e1=se();function t1(i){return i&&i.__esModule?i:{default:i}}function r1(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,ta(i,e)}function ta(i,e){return ta=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},ta(i,e)}var i1=function(i){r1(e,i);function e(t){var r;return r=i.call(this,t)||this,r.type=e1.STRING,r}return e}(Zx.default);Mr.default=i1;Kc.exports=Mr.default});var na=v((Br,Zc)=>{l();"use strict";Br.__esModule=!0;Br.default=void 0;var n1=a1(Zi()),s1=se();function a1(i){return i&&i.__esModule?i:{default:i}}function o1(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,ia(i,e)}function ia(i,e){return ia=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},ia(i,e)}var l1=function(i){o1(e,i);function e(r){var n;return n=i.call(this,r)||this,n.type=s1.PSEUDO,n}var t=e.prototype;return t.toString=function(){var n=this.length?"("+this.map(String).join(",")+")":"";return[this.rawSpaceBefore,this.stringifyProperty("value"),n,this.rawSpaceAfter].join("")},e}(n1.default);Br.default=l1;Zc.exports=Br.default});var ep={};Ae(ep,{deprecate:()=>u1});function u1(i){return i}var tp=C(()=>{l()});var ip=v((y3,rp)=>{l();rp.exports=(tp(),ep).deprecate});var fa=v(Lr=>{l();"use strict";Lr.__esModule=!0;Lr.default=void 0;Lr.unescapeValue=la;var Fr=aa(en()),f1=aa(Yi()),c1=aa(tn()),p1=se(),sa;function aa(i){return i&&i.__esModule?i:{default:i}}function np(i,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(i,r.key,r)}}function d1(i,e,t){return e&&np(i.prototype,e),t&&np(i,t),Object.defineProperty(i,"prototype",{writable:!1}),i}function h1(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,oa(i,e)}function oa(i,e){return oa=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},oa(i,e)}var Nr=ip(),m1=/^(\'|")([^]*)\\1$/,g1=Nr(function(){},"Assigning an attribute a value containing characters that might need to be escaped is deprecated. Call attribute.setValue() instead."),y1=Nr(function(){},"Assigning attr.quoted is deprecated and has no effect. Assign to attr.quoteMark instead."),w1=Nr(function(){},"Constructing an Attribute selector with a value without specifying quoteMark is deprecated. Note: The value should be unescaped now.");function la(i){var e=!1,t=null,r=i,n=r.match(m1);return n&&(t=n[1],r=n[2]),r=(0,f1.default)(r),r!==i&&(e=!0),{deprecatedUsage:e,unescaped:r,quoteMark:t}}function b1(i){if(i.quoteMark!==void 0||i.value===void 0)return i;w1();var e=la(i.value),t=e.quoteMark,r=e.unescaped;return i.raws||(i.raws={}),i.raws.value===void 0&&(i.raws.value=i.value),i.value=r,i.quoteMark=t,i}var rn=function(i){h1(e,i);function e(r){var n;return r===void 0&&(r={}),n=i.call(this,b1(r))||this,n.type=p1.ATTRIBUTE,n.raws=n.raws||{},Object.defineProperty(n.raws,"unquoted",{get:Nr(function(){return n.value},"attr.raws.unquoted is deprecated. Call attr.value instead."),set:Nr(function(){return n.value},"Setting attr.raws.unquoted is deprecated and has no effect. attr.value is unescaped by default now.")}),n._constructed=!0,n}var t=e.prototype;return t.getQuotedValue=function(n){n===void 0&&(n={});var a=this._determineQuoteMark(n),s=ua[a],o=(0,Fr.default)(this._value,s);return o},t._determineQuoteMark=function(n){return n.smart?this.smartQuoteMark(n):this.preferredQuoteMark(n)},t.setValue=function(n,a){a===void 0&&(a={}),this._value=n,this._quoteMark=this._determineQuoteMark(a),this._syncRawValue()},t.smartQuoteMark=function(n){var a=this.value,s=a.replace(/[^\']/g,"").length,o=a.replace(/[^"]/g,"").length;if(s+o===0){var u=(0,Fr.default)(a,{isIdentifier:!0});if(u===a)return e.NO_QUOTE;var c=this.preferredQuoteMark(n);if(c===e.NO_QUOTE){var f=this.quoteMark||n.quoteMark||e.DOUBLE_QUOTE,d=ua[f],p=(0,Fr.default)(a,d);if(p.length<u.length)return f}return c}else return o===s?this.preferredQuoteMark(n):o<s?e.DOUBLE_QUOTE:e.SINGLE_QUOTE},t.preferredQuoteMark=function(n){var a=n.preferCurrentQuoteMark?this.quoteMark:n.quoteMark;return a===void 0&&(a=n.preferCurrentQuoteMark?n.quoteMark:this.quoteMark),a===void 0&&(a=e.DOUBLE_QUOTE),a},t._syncRawValue=function(){var n=(0,Fr.default)(this._value,ua[this.quoteMark]);n===this._value?this.raws&&delete this.raws.value:this.raws.value=n},t._handleEscapes=function(n,a){if(this._constructed){var s=(0,Fr.default)(a,{isIdentifier:!0});s!==a?this.raws[n]=s:delete this.raws[n]}},t._spacesFor=function(n){var a={before:"",after:""},s=this.spaces[n]||{},o=this.raws.spaces&&this.raws.spaces[n]||{};return Object.assign(a,s,o)},t._stringFor=function(n,a,s){a===void 0&&(a=n),s===void 0&&(s=sp);var o=this._spacesFor(a);return s(this.stringifyProperty(n),o)},t.offsetOf=function(n){var a=1,s=this._spacesFor("attribute");if(a+=s.before.length,n==="namespace"||n==="ns")return this.namespace?a:-1;if(n==="attributeNS"||(a+=this.namespaceString.length,this.namespace&&(a+=1),n==="attribute"))return a;a+=this.stringifyProperty("attribute").length,a+=s.after.length;var o=this._spacesFor("operator");a+=o.before.length;var u=this.stringifyProperty("operator");if(n==="operator")return u?a:-1;a+=u.length,a+=o.after.length;var c=this._spacesFor("value");a+=c.before.length;var f=this.stringifyProperty("value");if(n==="value")return f?a:-1;a+=f.length,a+=c.after.length;var d=this._spacesFor("insensitive");return a+=d.before.length,n==="insensitive"&&this.insensitive?a:-1},t.toString=function(){var n=this,a=[this.rawSpaceBefore,"["];return a.push(this._stringFor("qualifiedAttribute","attribute")),this.operator&&(this.value||this.value==="")&&(a.push(this._stringFor("operator")),a.push(this._stringFor("value")),a.push(this._stringFor("insensitiveFlag","insensitive",function(s,o){return s.length>0&&!n.quoted&&o.before.length===0&&!(n.spaces.value&&n.spaces.value.after)&&(o.before=" "),sp(s,o)}))),a.push("]"),a.push(this.rawSpaceAfter),a.join("")},d1(e,[{key:"quoted",get:function(){var n=this.quoteMark;return n==="\'"||n===\'"\'},set:function(n){y1()}},{key:"quoteMark",get:function(){return this._quoteMark},set:function(n){if(!this._constructed){this._quoteMark=n;return}this._quoteMark!==n&&(this._quoteMark=n,this._syncRawValue())}},{key:"qualifiedAttribute",get:function(){return this.qualifiedName(this.raws.attribute||this.attribute)}},{key:"insensitiveFlag",get:function(){return this.insensitive?"i":""}},{key:"value",get:function(){return this._value},set:function(n){if(this._constructed){var a=la(n),s=a.deprecatedUsage,o=a.unescaped,u=a.quoteMark;if(s&&g1(),o===this._value&&u===this._quoteMark)return;this._value=o,this._quoteMark=u,this._syncRawValue()}else this._value=n}},{key:"insensitive",get:function(){return this._insensitive},set:function(n){n||(this._insensitive=!1,this.raws&&(this.raws.insensitiveFlag==="I"||this.raws.insensitiveFlag==="i")&&(this.raws.insensitiveFlag=void 0)),this._insensitive=n}},{key:"attribute",get:function(){return this._attribute},set:function(n){this._handleEscapes("attribute",n),this._attribute=n}}]),e}(c1.default);Lr.default=rn;rn.NO_QUOTE=null;rn.SINGLE_QUOTE="\'";rn.DOUBLE_QUOTE=\'"\';var ua=(sa={"\'":{quotes:"single",wrap:!0},\'"\':{quotes:"double",wrap:!0}},sa[null]={isIdentifier:!0},sa);function sp(i,e){return""+e.before+i+e.after}});var pa=v(($r,ap)=>{l();"use strict";$r.__esModule=!0;$r.default=void 0;var v1=k1(tn()),x1=se();function k1(i){return i&&i.__esModule?i:{default:i}}function S1(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,ca(i,e)}function ca(i,e){return ca=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},ca(i,e)}var C1=function(i){S1(e,i);function e(t){var r;return r=i.call(this,t)||this,r.type=x1.UNIVERSAL,r.value="*",r}return e}(v1.default);$r.default=C1;ap.exports=$r.default});var ha=v((jr,op)=>{l();"use strict";jr.__esModule=!0;jr.default=void 0;var A1=O1(Ue()),_1=se();function O1(i){return i&&i.__esModule?i:{default:i}}function E1(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,da(i,e)}function da(i,e){return da=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},da(i,e)}var T1=function(i){E1(e,i);function e(t){var r;return r=i.call(this,t)||this,r.type=_1.COMBINATOR,r}return e}(A1.default);jr.default=T1;op.exports=jr.default});var ga=v((zr,lp)=>{l();"use strict";zr.__esModule=!0;zr.default=void 0;var P1=I1(Ue()),D1=se();function I1(i){return i&&i.__esModule?i:{default:i}}function q1(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,ma(i,e)}function ma(i,e){return ma=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,n){return r.__proto__=n,r},ma(i,e)}var R1=function(i){q1(e,i);function e(t){var r;return r=i.call(this,t)||this,r.type=D1.NESTING,r.value="&",r}return e}(P1.default);zr.default=R1;lp.exports=zr.default});var fp=v((nn,up)=>{l();"use strict";nn.__esModule=!0;nn.default=M1;function M1(i){return i.sort(function(e,t){return e-t})}up.exports=nn.default});var ya=v(D=>{l();"use strict";D.__esModule=!0;D.word=D.tilde=D.tab=D.str=D.space=D.slash=D.singleQuote=D.semicolon=D.plus=D.pipe=D.openSquare=D.openParenthesis=D.newline=D.greaterThan=D.feed=D.equals=D.doubleQuote=D.dollar=D.cr=D.comment=D.comma=D.combinator=D.colon=D.closeSquare=D.closeParenthesis=D.caret=D.bang=D.backslash=D.at=D.asterisk=D.ampersand=void 0;var B1=38;D.ampersand=B1;var F1=42;D.asterisk=F1;var N1=64;D.at=N1;var L1=44;D.comma=L1;var $1=58;D.colon=$1;var j1=59;D.semicolon=j1;var z1=40;D.openParenthesis=z1;var V1=41;D.closeParenthesis=V1;var U1=91;D.openSquare=U1;var W1=93;D.closeSquare=W1;var G1=36;D.dollar=G1;var H1=126;D.tilde=H1;var Y1=94;D.caret=Y1;var Q1=43;D.plus=Q1;var J1=61;D.equals=J1;var X1=124;D.pipe=X1;var K1=62;D.greaterThan=K1;var Z1=32;D.space=Z1;var cp=39;D.singleQuote=cp;var ek=34;D.doubleQuote=ek;var tk=47;D.slash=tk;var rk=33;D.bang=rk;var ik=92;D.backslash=ik;var nk=13;D.cr=nk;var sk=12;D.feed=sk;var ak=10;D.newline=ak;var ok=9;D.tab=ok;var lk=cp;D.str=lk;var uk=-1;D.comment=uk;var fk=-2;D.word=fk;var ck=-3;D.combinator=ck});var hp=v(Vr=>{l();"use strict";Vr.__esModule=!0;Vr.FIELDS=void 0;Vr.default=wk;var E=pk(ya()),Dt,U;function pp(i){if(typeof WeakMap!="function")return null;var e=new WeakMap,t=new WeakMap;return(pp=function(n){return n?t:e})(i)}function pk(i,e){if(!e&&i&&i.__esModule)return i;if(i===null||typeof i!="object"&&typeof i!="function")return{default:i};var t=pp(e);if(t&&t.has(i))return t.get(i);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in i)if(a!=="default"&&Object.prototype.hasOwnProperty.call(i,a)){var s=n?Object.getOwnPropertyDescriptor(i,a):null;s&&(s.get||s.set)?Object.defineProperty(r,a,s):r[a]=i[a]}return r.default=i,t&&t.set(i,r),r}var dk=(Dt={},Dt[E.tab]=!0,Dt[E.newline]=!0,Dt[E.cr]=!0,Dt[E.feed]=!0,Dt),hk=(U={},U[E.space]=!0,U[E.tab]=!0,U[E.newline]=!0,U[E.cr]=!0,U[E.feed]=!0,U[E.ampersand]=!0,U[E.asterisk]=!0,U[E.bang]=!0,U[E.comma]=!0,U[E.colon]=!0,U[E.semicolon]=!0,U[E.openParenthesis]=!0,U[E.closeParenthesis]=!0,U[E.openSquare]=!0,U[E.closeSquare]=!0,U[E.singleQuote]=!0,U[E.doubleQuote]=!0,U[E.plus]=!0,U[E.pipe]=!0,U[E.tilde]=!0,U[E.greaterThan]=!0,U[E.equals]=!0,U[E.dollar]=!0,U[E.caret]=!0,U[E.slash]=!0,U),wa={},dp="0123456789abcdefABCDEF";for(sn=0;sn<dp.length;sn++)wa[dp.charCodeAt(sn)]=!0;var sn;function mk(i,e){var t=e,r;do{if(r=i.charCodeAt(t),hk[r])return t-1;r===E.backslash?t=gk(i,t)+1:t++}while(t<i.length);return t-1}function gk(i,e){var t=e,r=i.charCodeAt(t+1);if(!dk[r])if(wa[r]){var n=0;do t++,n++,r=i.charCodeAt(t+1);while(wa[r]&&n<6);n<6&&r===E.space&&t++}else t++;return t}var yk={TYPE:0,START_LINE:1,START_COL:2,END_LINE:3,END_COL:4,START_POS:5,END_POS:6};Vr.FIELDS=yk;function wk(i){var e=[],t=i.css.valueOf(),r=t,n=r.length,a=-1,s=1,o=0,u=0,c,f,d,p,m,w,x,y,b,k,S,_,O;function I(B,q){if(i.safe)t+=q,b=t.length-1;else throw i.error("Unclosed "+B,s,o-a,o)}for(;o<n;){switch(c=t.charCodeAt(o),c===E.newline&&(a=o,s+=1),c){case E.space:case E.tab:case E.newline:case E.cr:case E.feed:b=o;do b+=1,c=t.charCodeAt(b),c===E.newline&&(a=b,s+=1);while(c===E.space||c===E.newline||c===E.tab||c===E.cr||c===E.feed);O=E.space,p=s,d=b-a-1,u=b;break;case E.plus:case E.greaterThan:case E.tilde:case E.pipe:b=o;do b+=1,c=t.charCodeAt(b);while(c===E.plus||c===E.greaterThan||c===E.tilde||c===E.pipe);O=E.combinator,p=s,d=o-a,u=b;break;case E.asterisk:case E.ampersand:case E.bang:case E.comma:case E.equals:case E.dollar:case E.caret:case E.openSquare:case E.closeSquare:case E.colon:case E.semicolon:case E.openParenthesis:case E.closeParenthesis:b=o,O=c,p=s,d=o-a,u=b+1;break;case E.singleQuote:case E.doubleQuote:_=c===E.singleQuote?"\'":\'"\',b=o;do for(m=!1,b=t.indexOf(_,b+1),b===-1&&I("quote",_),w=b;t.charCodeAt(w-1)===E.backslash;)w-=1,m=!m;while(m);O=E.str,p=s,d=o-a,u=b+1;break;default:c===E.slash&&t.charCodeAt(o+1)===E.asterisk?(b=t.indexOf("*/",o+2)+1,b===0&&I("comment","*/"),f=t.slice(o,b+1),y=f.split(`\n`),x=y.length-1,x>0?(k=s+x,S=b-y[x].length):(k=s,S=a),O=E.comment,s=k,p=k,d=b-S):c===E.slash?(b=o,O=c,p=s,d=o-a,u=b+1):(b=mk(t,o),O=E.word,p=s,d=b-a),u=b+1;break}e.push([O,s,o-a,p,d,o,u]),S&&(a=S,S=null),o=u}return e}});var kp=v((Ur,xp)=>{l();"use strict";Ur.__esModule=!0;Ur.default=void 0;var bk=be(zs()),ba=be(Us()),vk=be(Hs()),mp=be(Qs()),xk=be(Xs()),kk=be(ea()),va=be(ra()),Sk=be(na()),gp=an(fa()),Ck=be(pa()),xa=be(ha()),Ak=be(ga()),_k=be(fp()),A=an(hp()),T=an(ya()),Ok=an(se()),Q=Ar(),wt,ka;function yp(i){if(typeof WeakMap!="function")return null;var e=new WeakMap,t=new WeakMap;return(yp=function(n){return n?t:e})(i)}function an(i,e){if(!e&&i&&i.__esModule)return i;if(i===null||typeof i!="object"&&typeof i!="function")return{default:i};var t=yp(e);if(t&&t.has(i))return t.get(i);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in i)if(a!=="default"&&Object.prototype.hasOwnProperty.call(i,a)){var s=n?Object.getOwnPropertyDescriptor(i,a):null;s&&(s.get||s.set)?Object.defineProperty(r,a,s):r[a]=i[a]}return r.default=i,t&&t.set(i,r),r}function be(i){return i&&i.__esModule?i:{default:i}}function wp(i,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(i,r.key,r)}}function Ek(i,e,t){return e&&wp(i.prototype,e),t&&wp(i,t),Object.defineProperty(i,"prototype",{writable:!1}),i}var Sa=(wt={},wt[T.space]=!0,wt[T.cr]=!0,wt[T.feed]=!0,wt[T.newline]=!0,wt[T.tab]=!0,wt),Tk=Object.assign({},Sa,(ka={},ka[T.comment]=!0,ka));function bp(i){return{line:i[A.FIELDS.START_LINE],column:i[A.FIELDS.START_COL]}}function vp(i){return{line:i[A.FIELDS.END_LINE],column:i[A.FIELDS.END_COL]}}function bt(i,e,t,r){return{start:{line:i,column:e},end:{line:t,column:r}}}function It(i){return bt(i[A.FIELDS.START_LINE],i[A.FIELDS.START_COL],i[A.FIELDS.END_LINE],i[A.FIELDS.END_COL])}function Ca(i,e){if(!!i)return bt(i[A.FIELDS.START_LINE],i[A.FIELDS.START_COL],e[A.FIELDS.END_LINE],e[A.FIELDS.END_COL])}function qt(i,e){var t=i[e];if(typeof t=="string")return t.indexOf("\\\\")!==-1&&((0,Q.ensureObject)(i,"raws"),i[e]=(0,Q.unesc)(t),i.raws[e]===void 0&&(i.raws[e]=t)),i}function Aa(i,e){for(var t=-1,r=[];(t=i.indexOf(e,t+1))!==-1;)r.push(t);return r}function Pk(){var i=Array.prototype.concat.apply([],arguments);return i.filter(function(e,t){return t===i.indexOf(e)})}var Dk=function(){function i(t,r){r===void 0&&(r={}),this.rule=t,this.options=Object.assign({lossy:!1,safe:!1},r),this.position=0,this.css=typeof this.rule=="string"?this.rule:this.rule.selector,this.tokens=(0,A.default)({css:this.css,error:this._errorGenerator(),safe:this.options.safe});var n=Ca(this.tokens[0],this.tokens[this.tokens.length-1]);this.root=new bk.default({source:n}),this.root.errorGenerator=this._errorGenerator();var a=new ba.default({source:{start:{line:1,column:1}}});this.root.append(a),this.current=a,this.loop()}var e=i.prototype;return e._errorGenerator=function(){var r=this;return function(n,a){return typeof r.rule=="string"?new Error(n):r.rule.error(n,a)}},e.attribute=function(){var r=[],n=this.currToken;for(this.position++;this.position<this.tokens.length&&this.currToken[A.FIELDS.TYPE]!==T.closeSquare;)r.push(this.currToken),this.position++;if(this.currToken[A.FIELDS.TYPE]!==T.closeSquare)return this.expected("closing square bracket",this.currToken[A.FIELDS.START_POS]);var a=r.length,s={source:bt(n[1],n[2],this.currToken[3],this.currToken[4]),sourceIndex:n[A.FIELDS.START_POS]};if(a===1&&!~[T.word].indexOf(r[0][A.FIELDS.TYPE]))return this.expected("attribute",r[0][A.FIELDS.START_POS]);for(var o=0,u="",c="",f=null,d=!1;o<a;){var p=r[o],m=this.content(p),w=r[o+1];switch(p[A.FIELDS.TYPE]){case T.space:if(d=!0,this.options.lossy)break;if(f){(0,Q.ensureObject)(s,"spaces",f);var x=s.spaces[f].after||"";s.spaces[f].after=x+m;var y=(0,Q.getProp)(s,"raws","spaces",f,"after")||null;y&&(s.raws.spaces[f].after=y+m)}else u=u+m,c=c+m;break;case T.asterisk:if(w[A.FIELDS.TYPE]===T.equals)s.operator=m,f="operator";else if((!s.namespace||f==="namespace"&&!d)&&w){u&&((0,Q.ensureObject)(s,"spaces","attribute"),s.spaces.attribute.before=u,u=""),c&&((0,Q.ensureObject)(s,"raws","spaces","attribute"),s.raws.spaces.attribute.before=u,c=""),s.namespace=(s.namespace||"")+m;var b=(0,Q.getProp)(s,"raws","namespace")||null;b&&(s.raws.namespace+=m),f="namespace"}d=!1;break;case T.dollar:if(f==="value"){var k=(0,Q.getProp)(s,"raws","value");s.value+="$",k&&(s.raws.value=k+"$");break}case T.caret:w[A.FIELDS.TYPE]===T.equals&&(s.operator=m,f="operator"),d=!1;break;case T.combinator:if(m==="~"&&w[A.FIELDS.TYPE]===T.equals&&(s.operator=m,f="operator"),m!=="|"){d=!1;break}w[A.FIELDS.TYPE]===T.equals?(s.operator=m,f="operator"):!s.namespace&&!s.attribute&&(s.namespace=!0),d=!1;break;case T.word:if(w&&this.content(w)==="|"&&r[o+2]&&r[o+2][A.FIELDS.TYPE]!==T.equals&&!s.operator&&!s.namespace)s.namespace=m,f="namespace";else if(!s.attribute||f==="attribute"&&!d){u&&((0,Q.ensureObject)(s,"spaces","attribute"),s.spaces.attribute.before=u,u=""),c&&((0,Q.ensureObject)(s,"raws","spaces","attribute"),s.raws.spaces.attribute.before=c,c=""),s.attribute=(s.attribute||"")+m;var S=(0,Q.getProp)(s,"raws","attribute")||null;S&&(s.raws.attribute+=m),f="attribute"}else if(!s.value&&s.value!==""||f==="value"&&!(d||s.quoteMark)){var _=(0,Q.unesc)(m),O=(0,Q.getProp)(s,"raws","value")||"",I=s.value||"";s.value=I+_,s.quoteMark=null,(_!==m||O)&&((0,Q.ensureObject)(s,"raws"),s.raws.value=(O||I)+m),f="value"}else{var B=m==="i"||m==="I";(s.value||s.value==="")&&(s.quoteMark||d)?(s.insensitive=B,(!B||m==="I")&&((0,Q.ensureObject)(s,"raws"),s.raws.insensitiveFlag=m),f="insensitive",u&&((0,Q.ensureObject)(s,"spaces","insensitive"),s.spaces.insensitive.before=u,u=""),c&&((0,Q.ensureObject)(s,"raws","spaces","insensitive"),s.raws.spaces.insensitive.before=c,c="")):(s.value||s.value==="")&&(f="value",s.value+=m,s.raws.value&&(s.raws.value+=m))}d=!1;break;case T.str:if(!s.attribute||!s.operator)return this.error("Expected an attribute followed by an operator preceding the string.",{index:p[A.FIELDS.START_POS]});var q=(0,gp.unescapeValue)(m),X=q.unescaped,le=q.quoteMark;s.value=X,s.quoteMark=le,f="value",(0,Q.ensureObject)(s,"raws"),s.raws.value=m,d=!1;break;case T.equals:if(!s.attribute)return this.expected("attribute",p[A.FIELDS.START_POS],m);if(s.value)return this.error(\'Unexpected "=" found; an operator was already defined.\',{index:p[A.FIELDS.START_POS]});s.operator=s.operator?s.operator+m:m,f="operator",d=!1;break;case T.comment:if(f)if(d||w&&w[A.FIELDS.TYPE]===T.space||f==="insensitive"){var ce=(0,Q.getProp)(s,"spaces",f,"after")||"",$e=(0,Q.getProp)(s,"raws","spaces",f,"after")||ce;(0,Q.ensureObject)(s,"raws","spaces",f),s.raws.spaces[f].after=$e+m}else{var j=s[f]||"",ue=(0,Q.getProp)(s,"raws",f)||j;(0,Q.ensureObject)(s,"raws"),s.raws[f]=ue+m}else c=c+m;break;default:return this.error(\'Unexpected "\'+m+\'" found.\',{index:p[A.FIELDS.START_POS]})}o++}qt(s,"attribute"),qt(s,"namespace"),this.newNode(new gp.default(s)),this.position++},e.parseWhitespaceEquivalentTokens=function(r){r<0&&(r=this.tokens.length);var n=this.position,a=[],s="",o=void 0;do if(Sa[this.currToken[A.FIELDS.TYPE]])this.options.lossy||(s+=this.content());else if(this.currToken[A.FIELDS.TYPE]===T.comment){var u={};s&&(u.before=s,s=""),o=new mp.default({value:this.content(),source:It(this.currToken),sourceIndex:this.currToken[A.FIELDS.START_POS],spaces:u}),a.push(o)}while(++this.position<r);if(s){if(o)o.spaces.after=s;else if(!this.options.lossy){var c=this.tokens[n],f=this.tokens[this.position-1];a.push(new va.default({value:"",source:bt(c[A.FIELDS.START_LINE],c[A.FIELDS.START_COL],f[A.FIELDS.END_LINE],f[A.FIELDS.END_COL]),sourceIndex:c[A.FIELDS.START_POS],spaces:{before:s,after:""}}))}}return a},e.convertWhitespaceNodesToSpace=function(r,n){var a=this;n===void 0&&(n=!1);var s="",o="";r.forEach(function(c){var f=a.lossySpace(c.spaces.before,n),d=a.lossySpace(c.rawSpaceBefore,n);s+=f+a.lossySpace(c.spaces.after,n&&f.length===0),o+=f+c.value+a.lossySpace(c.rawSpaceAfter,n&&d.length===0)}),o===s&&(o=void 0);var u={space:s,rawSpace:o};return u},e.isNamedCombinator=function(r){return r===void 0&&(r=this.position),this.tokens[r+0]&&this.tokens[r+0][A.FIELDS.TYPE]===T.slash&&this.tokens[r+1]&&this.tokens[r+1][A.FIELDS.TYPE]===T.word&&this.tokens[r+2]&&this.tokens[r+2][A.FIELDS.TYPE]===T.slash},e.namedCombinator=function(){if(this.isNamedCombinator()){var r=this.content(this.tokens[this.position+1]),n=(0,Q.unesc)(r).toLowerCase(),a={};n!==r&&(a.value="/"+r+"/");var s=new xa.default({value:"/"+n+"/",source:bt(this.currToken[A.FIELDS.START_LINE],this.currToken[A.FIELDS.START_COL],this.tokens[this.position+2][A.FIELDS.END_LINE],this.tokens[this.position+2][A.FIELDS.END_COL]),sourceIndex:this.currToken[A.FIELDS.START_POS],raws:a});return this.position=this.position+3,s}else this.unexpected()},e.combinator=function(){var r=this;if(this.content()==="|")return this.namespace();var n=this.locateNextMeaningfulToken(this.position);if(n<0||this.tokens[n][A.FIELDS.TYPE]===T.comma){var a=this.parseWhitespaceEquivalentTokens(n);if(a.length>0){var s=this.current.last;if(s){var o=this.convertWhitespaceNodesToSpace(a),u=o.space,c=o.rawSpace;c!==void 0&&(s.rawSpaceAfter+=c),s.spaces.after+=u}else a.forEach(function(O){return r.newNode(O)})}return}var f=this.currToken,d=void 0;n>this.position&&(d=this.parseWhitespaceEquivalentTokens(n));var p;if(this.isNamedCombinator()?p=this.namedCombinator():this.currToken[A.FIELDS.TYPE]===T.combinator?(p=new xa.default({value:this.content(),source:It(this.currToken),sourceIndex:this.currToken[A.FIELDS.START_POS]}),this.position++):Sa[this.currToken[A.FIELDS.TYPE]]||d||this.unexpected(),p){if(d){var m=this.convertWhitespaceNodesToSpace(d),w=m.space,x=m.rawSpace;p.spaces.before=w,p.rawSpaceBefore=x}}else{var y=this.convertWhitespaceNodesToSpace(d,!0),b=y.space,k=y.rawSpace;k||(k=b);var S={},_={spaces:{}};b.endsWith(" ")&&k.endsWith(" ")?(S.before=b.slice(0,b.length-1),_.spaces.before=k.slice(0,k.length-1)):b.startsWith(" ")&&k.startsWith(" ")?(S.after=b.slice(1),_.spaces.after=k.slice(1)):_.value=k,p=new xa.default({value:" ",source:Ca(f,this.tokens[this.position-1]),sourceIndex:f[A.FIELDS.START_POS],spaces:S,raws:_})}return this.currToken&&this.currToken[A.FIELDS.TYPE]===T.space&&(p.spaces.after=this.optionalSpace(this.content()),this.position++),this.newNode(p)},e.comma=function(){if(this.position===this.tokens.length-1){this.root.trailingComma=!0,this.position++;return}this.current._inferEndPosition();var r=new ba.default({source:{start:bp(this.tokens[this.position+1])}});this.current.parent.append(r),this.current=r,this.position++},e.comment=function(){var r=this.currToken;this.newNode(new mp.default({value:this.content(),source:It(r),sourceIndex:r[A.FIELDS.START_POS]})),this.position++},e.error=function(r,n){throw this.root.error(r,n)},e.missingBackslash=function(){return this.error("Expected a backslash preceding the semicolon.",{index:this.currToken[A.FIELDS.START_POS]})},e.missingParenthesis=function(){return this.expected("opening parenthesis",this.currToken[A.FIELDS.START_POS])},e.missingSquareBracket=function(){return this.expected("opening square bracket",this.currToken[A.FIELDS.START_POS])},e.unexpected=function(){return this.error("Unexpected \'"+this.content()+"\'. Escaping special characters with \\\\ may help.",this.currToken[A.FIELDS.START_POS])},e.unexpectedPipe=function(){return this.error("Unexpected \'|\'.",this.currToken[A.FIELDS.START_POS])},e.namespace=function(){var r=this.prevToken&&this.content(this.prevToken)||!0;if(this.nextToken[A.FIELDS.TYPE]===T.word)return this.position++,this.word(r);if(this.nextToken[A.FIELDS.TYPE]===T.asterisk)return this.position++,this.universal(r);this.unexpectedPipe()},e.nesting=function(){if(this.nextToken){var r=this.content(this.nextToken);if(r==="|"){this.position++;return}}var n=this.currToken;this.newNode(new Ak.default({value:this.content(),source:It(n),sourceIndex:n[A.FIELDS.START_POS]})),this.position++},e.parentheses=function(){var r=this.current.last,n=1;if(this.position++,r&&r.type===Ok.PSEUDO){var a=new ba.default({source:{start:bp(this.tokens[this.position-1])}}),s=this.current;for(r.append(a),this.current=a;this.position<this.tokens.length&&n;)this.currToken[A.FIELDS.TYPE]===T.openParenthesis&&n++,this.currToken[A.FIELDS.TYPE]===T.closeParenthesis&&n--,n?this.parse():(this.current.source.end=vp(this.currToken),this.current.parent.source.end=vp(this.currToken),this.position++);this.current=s}else{for(var o=this.currToken,u="(",c;this.position<this.tokens.length&&n;)this.currToken[A.FIELDS.TYPE]===T.openParenthesis&&n++,this.currToken[A.FIELDS.TYPE]===T.closeParenthesis&&n--,c=this.currToken,u+=this.parseParenthesisToken(this.currToken),this.position++;r?r.appendToPropertyAndEscape("value",u,u):this.newNode(new va.default({value:u,source:bt(o[A.FIELDS.START_LINE],o[A.FIELDS.START_COL],c[A.FIELDS.END_LINE],c[A.FIELDS.END_COL]),sourceIndex:o[A.FIELDS.START_POS]}))}if(n)return this.expected("closing parenthesis",this.currToken[A.FIELDS.START_POS])},e.pseudo=function(){for(var r=this,n="",a=this.currToken;this.currToken&&this.currToken[A.FIELDS.TYPE]===T.colon;)n+=this.content(),this.position++;if(!this.currToken)return this.expected(["pseudo-class","pseudo-element"],this.position-1);if(this.currToken[A.FIELDS.TYPE]===T.word)this.splitWord(!1,function(s,o){n+=s,r.newNode(new Sk.default({value:n,source:Ca(a,r.currToken),sourceIndex:a[A.FIELDS.START_POS]})),o>1&&r.nextToken&&r.nextToken[A.FIELDS.TYPE]===T.openParenthesis&&r.error("Misplaced parenthesis.",{index:r.nextToken[A.FIELDS.START_POS]})});else return this.expected(["pseudo-class","pseudo-element"],this.currToken[A.FIELDS.START_POS])},e.space=function(){var r=this.content();this.position===0||this.prevToken[A.FIELDS.TYPE]===T.comma||this.prevToken[A.FIELDS.TYPE]===T.openParenthesis||this.current.nodes.every(function(n){return n.type==="comment"})?(this.spaces=this.optionalSpace(r),this.position++):this.position===this.tokens.length-1||this.nextToken[A.FIELDS.TYPE]===T.comma||this.nextToken[A.FIELDS.TYPE]===T.closeParenthesis?(this.current.last.spaces.after=this.optionalSpace(r),this.position++):this.combinator()},e.string=function(){var r=this.currToken;this.newNode(new va.default({value:this.content(),source:It(r),sourceIndex:r[A.FIELDS.START_POS]})),this.position++},e.universal=function(r){var n=this.nextToken;if(n&&this.content(n)==="|")return this.position++,this.namespace();var a=this.currToken;this.newNode(new Ck.default({value:this.content(),source:It(a),sourceIndex:a[A.FIELDS.START_POS]}),r),this.position++},e.splitWord=function(r,n){for(var a=this,s=this.nextToken,o=this.content();s&&~[T.dollar,T.caret,T.equals,T.word].indexOf(s[A.FIELDS.TYPE]);){this.position++;var u=this.content();if(o+=u,u.lastIndexOf("\\\\")===u.length-1){var c=this.nextToken;c&&c[A.FIELDS.TYPE]===T.space&&(o+=this.requiredSpace(this.content(c)),this.position++)}s=this.nextToken}var f=Aa(o,".").filter(function(w){var x=o[w-1]==="\\\\",y=/^\\d+\\.\\d+%$/.test(o);return!x&&!y}),d=Aa(o,"#").filter(function(w){return o[w-1]!=="\\\\"}),p=Aa(o,"#{");p.length&&(d=d.filter(function(w){return!~p.indexOf(w)}));var m=(0,_k.default)(Pk([0].concat(f,d)));m.forEach(function(w,x){var y=m[x+1]||o.length,b=o.slice(w,y);if(x===0&&n)return n.call(a,b,m.length);var k,S=a.currToken,_=S[A.FIELDS.START_POS]+m[x],O=bt(S[1],S[2]+w,S[3],S[2]+(y-1));if(~f.indexOf(w)){var I={value:b.slice(1),source:O,sourceIndex:_};k=new vk.default(qt(I,"value"))}else if(~d.indexOf(w)){var B={value:b.slice(1),source:O,sourceIndex:_};k=new xk.default(qt(B,"value"))}else{var q={value:b,source:O,sourceIndex:_};qt(q,"value"),k=new kk.default(q)}a.newNode(k,r),r=null}),this.position++},e.word=function(r){var n=this.nextToken;return n&&this.content(n)==="|"?(this.position++,this.namespace()):this.splitWord(r)},e.loop=function(){for(;this.position<this.tokens.length;)this.parse(!0);return this.current._inferEndPosition(),this.root},e.parse=function(r){switch(this.currToken[A.FIELDS.TYPE]){case T.space:this.space();break;case T.comment:this.comment();break;case T.openParenthesis:this.parentheses();break;case T.closeParenthesis:r&&this.missingParenthesis();break;case T.openSquare:this.attribute();break;case T.dollar:case T.caret:case T.equals:case T.word:this.word();break;case T.colon:this.pseudo();break;case T.comma:this.comma();break;case T.asterisk:this.universal();break;case T.ampersand:this.nesting();break;case T.slash:case T.combinator:this.combinator();break;case T.str:this.string();break;case T.closeSquare:this.missingSquareBracket();case T.semicolon:this.missingBackslash();default:this.unexpected()}},e.expected=function(r,n,a){if(Array.isArray(r)){var s=r.pop();r=r.join(", ")+" or "+s}var o=/^[aeiou]/.test(r[0])?"an":"a";return a?this.error("Expected "+o+" "+r+\', found "\'+a+\'" instead.\',{index:n}):this.error("Expected "+o+" "+r+".",{index:n})},e.requiredSpace=function(r){return this.options.lossy?" ":r},e.optionalSpace=function(r){return this.options.lossy?"":r},e.lossySpace=function(r,n){return this.options.lossy?n?" ":"":r},e.parseParenthesisToken=function(r){var n=this.content(r);return r[A.FIELDS.TYPE]===T.space?this.requiredSpace(n):n},e.newNode=function(r,n){return n&&(/^ +$/.test(n)&&(this.options.lossy||(this.spaces=(this.spaces||"")+n),n=!0),r.namespace=n,qt(r,"namespace")),this.spaces&&(r.spaces.before=this.spaces,this.spaces=""),this.current.append(r)},e.content=function(r){return r===void 0&&(r=this.currToken),this.css.slice(r[A.FIELDS.START_POS],r[A.FIELDS.END_POS])},e.locateNextMeaningfulToken=function(r){r===void 0&&(r=this.position+1);for(var n=r;n<this.tokens.length;)if(Tk[this.tokens[n][A.FIELDS.TYPE]]){n++;continue}else return n;return-1},Ek(i,[{key:"currToken",get:function(){return this.tokens[this.position]}},{key:"nextToken",get:function(){return this.tokens[this.position+1]}},{key:"prevToken",get:function(){return this.tokens[this.position-1]}}]),i}();Ur.default=Dk;xp.exports=Ur.default});var Cp=v((Wr,Sp)=>{l();"use strict";Wr.__esModule=!0;Wr.default=void 0;var Ik=qk(kp());function qk(i){return i&&i.__esModule?i:{default:i}}var Rk=function(){function i(t,r){this.func=t||function(){},this.funcRes=null,this.options=r}var e=i.prototype;return e._shouldUpdateSelector=function(r,n){n===void 0&&(n={});var a=Object.assign({},this.options,n);return a.updateSelector===!1?!1:typeof r!="string"},e._isLossy=function(r){r===void 0&&(r={});var n=Object.assign({},this.options,r);return n.lossless===!1},e._root=function(r,n){n===void 0&&(n={});var a=new Ik.default(r,this._parseOptions(n));return a.root},e._parseOptions=function(r){return{lossy:this._isLossy(r)}},e._run=function(r,n){var a=this;return n===void 0&&(n={}),new Promise(function(s,o){try{var u=a._root(r,n);Promise.resolve(a.func(u)).then(function(c){var f=void 0;return a._shouldUpdateSelector(r,n)&&(f=u.toString(),r.selector=f),{transform:c,root:u,string:f}}).then(s,o)}catch(c){o(c);return}})},e._runSync=function(r,n){n===void 0&&(n={});var a=this._root(r,n),s=this.func(a);if(s&&typeof s.then=="function")throw new Error("Selector processor returned a promise to a synchronous call.");var o=void 0;return n.updateSelector&&typeof r!="string"&&(o=a.toString(),r.selector=o),{transform:s,root:a,string:o}},e.ast=function(r,n){return this._run(r,n).then(function(a){return a.root})},e.astSync=function(r,n){return this._runSync(r,n).root},e.transform=function(r,n){return this._run(r,n).then(function(a){return a.transform})},e.transformSync=function(r,n){return this._runSync(r,n).transform},e.process=function(r,n){return this._run(r,n).then(function(a){return a.string||a.root.toString()})},e.processSync=function(r,n){var a=this._runSync(r,n);return a.string||a.root.toString()},i}();Wr.default=Rk;Sp.exports=Wr.default});var Ap=v(H=>{l();"use strict";H.__esModule=!0;H.universal=H.tag=H.string=H.selector=H.root=H.pseudo=H.nesting=H.id=H.comment=H.combinator=H.className=H.attribute=void 0;var Mk=ve(fa()),Bk=ve(Hs()),Fk=ve(ha()),Nk=ve(Qs()),Lk=ve(Xs()),$k=ve(ga()),jk=ve(na()),zk=ve(zs()),Vk=ve(Us()),Uk=ve(ra()),Wk=ve(ea()),Gk=ve(pa());function ve(i){return i&&i.__esModule?i:{default:i}}var Hk=function(e){return new Mk.default(e)};H.attribute=Hk;var Yk=function(e){return new Bk.default(e)};H.className=Yk;var Qk=function(e){return new Fk.default(e)};H.combinator=Qk;var Jk=function(e){return new Nk.default(e)};H.comment=Jk;var Xk=function(e){return new Lk.default(e)};H.id=Xk;var Kk=function(e){return new $k.default(e)};H.nesting=Kk;var Zk=function(e){return new jk.default(e)};H.pseudo=Zk;var eS=function(e){return new zk.default(e)};H.root=eS;var tS=function(e){return new Vk.default(e)};H.selector=tS;var rS=function(e){return new Uk.default(e)};H.string=rS;var iS=function(e){return new Wk.default(e)};H.tag=iS;var nS=function(e){return new Gk.default(e)};H.universal=nS});var Tp=v($=>{l();"use strict";$.__esModule=!0;$.isComment=$.isCombinator=$.isClassName=$.isAttribute=void 0;$.isContainer=gS;$.isIdentifier=void 0;$.isNamespace=yS;$.isNesting=void 0;$.isNode=_a;$.isPseudo=void 0;$.isPseudoClass=mS;$.isPseudoElement=Ep;$.isUniversal=$.isTag=$.isString=$.isSelector=$.isRoot=void 0;var J=se(),pe,sS=(pe={},pe[J.ATTRIBUTE]=!0,pe[J.CLASS]=!0,pe[J.COMBINATOR]=!0,pe[J.COMMENT]=!0,pe[J.ID]=!0,pe[J.NESTING]=!0,pe[J.PSEUDO]=!0,pe[J.ROOT]=!0,pe[J.SELECTOR]=!0,pe[J.STRING]=!0,pe[J.TAG]=!0,pe[J.UNIVERSAL]=!0,pe);function _a(i){return typeof i=="object"&&sS[i.type]}function xe(i,e){return _a(e)&&e.type===i}var _p=xe.bind(null,J.ATTRIBUTE);$.isAttribute=_p;var aS=xe.bind(null,J.CLASS);$.isClassName=aS;var oS=xe.bind(null,J.COMBINATOR);$.isCombinator=oS;var lS=xe.bind(null,J.COMMENT);$.isComment=lS;var uS=xe.bind(null,J.ID);$.isIdentifier=uS;var fS=xe.bind(null,J.NESTING);$.isNesting=fS;var Oa=xe.bind(null,J.PSEUDO);$.isPseudo=Oa;var cS=xe.bind(null,J.ROOT);$.isRoot=cS;var pS=xe.bind(null,J.SELECTOR);$.isSelector=pS;var dS=xe.bind(null,J.STRING);$.isString=dS;var Op=xe.bind(null,J.TAG);$.isTag=Op;var hS=xe.bind(null,J.UNIVERSAL);$.isUniversal=hS;function Ep(i){return Oa(i)&&i.value&&(i.value.startsWith("::")||i.value.toLowerCase()===":before"||i.value.toLowerCase()===":after"||i.value.toLowerCase()===":first-letter"||i.value.toLowerCase()===":first-line")}function mS(i){return Oa(i)&&!Ep(i)}function gS(i){return!!(_a(i)&&i.walk)}function yS(i){return _p(i)||Op(i)}});var Pp=v(Ee=>{l();"use strict";Ee.__esModule=!0;var Ea=se();Object.keys(Ea).forEach(function(i){i==="default"||i==="__esModule"||i in Ee&&Ee[i]===Ea[i]||(Ee[i]=Ea[i])});var Ta=Ap();Object.keys(Ta).forEach(function(i){i==="default"||i==="__esModule"||i in Ee&&Ee[i]===Ta[i]||(Ee[i]=Ta[i])});var Pa=Tp();Object.keys(Pa).forEach(function(i){i==="default"||i==="__esModule"||i in Ee&&Ee[i]===Pa[i]||(Ee[i]=Pa[i])})});var Re=v((Gr,Ip)=>{l();"use strict";Gr.__esModule=!0;Gr.default=void 0;var wS=xS(Cp()),bS=vS(Pp());function Dp(i){if(typeof WeakMap!="function")return null;var e=new WeakMap,t=new WeakMap;return(Dp=function(n){return n?t:e})(i)}function vS(i,e){if(!e&&i&&i.__esModule)return i;if(i===null||typeof i!="object"&&typeof i!="function")return{default:i};var t=Dp(e);if(t&&t.has(i))return t.get(i);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in i)if(a!=="default"&&Object.prototype.hasOwnProperty.call(i,a)){var s=n?Object.getOwnPropertyDescriptor(i,a):null;s&&(s.get||s.set)?Object.defineProperty(r,a,s):r[a]=i[a]}return r.default=i,t&&t.set(i,r),r}function xS(i){return i&&i.__esModule?i:{default:i}}var Da=function(e){return new wS.default(e)};Object.assign(Da,bS);delete Da.__esModule;var kS=Da;Gr.default=kS;Ip.exports=Gr.default});function Ge(i){return["fontSize","outline"].includes(i)?e=>(typeof e=="function"&&(e=e({})),Array.isArray(e)&&(e=e[0]),e):i==="fontFamily"?e=>{typeof e=="function"&&(e=e({}));let t=Array.isArray(e)&&ne(e[1])?e[0]:e;return Array.isArray(t)?t.join(", "):t}:["boxShadow","transitionProperty","transitionDuration","transitionDelay","transitionTimingFunction","backgroundImage","backgroundSize","backgroundColor","cursor","animation"].includes(i)?e=>(typeof e=="function"&&(e=e({})),Array.isArray(e)&&(e=e.join(", ")),e):["gridTemplateColumns","gridTemplateRows","objectPosition"].includes(i)?e=>(typeof e=="function"&&(e=e({})),typeof e=="string"&&(e=V.list.comma(e).join(" ")),e):(e,t={})=>(typeof e=="function"&&(e=e(t)),e)}var Hr=C(()=>{l();nt();kt()});var Lp=v((O3,Ba)=>{l();var{Rule:qp,AtRule:SS}=ge(),Rp=Re();function Ia(i,e){let t;try{Rp(r=>{t=r}).processSync(i)}catch(r){throw i.includes(":")?e?e.error("Missed semicolon"):r:e?e.error(r.message):r}return t.at(0)}function Mp(i,e){let t=!1;return i.each(r=>{if(r.type==="nesting"){let n=e.clone({});r.value!=="&"?r.replaceWith(Ia(r.value.replace("&",n.toString()))):r.replaceWith(n),t=!0}else"nodes"in r&&r.nodes&&Mp(r,e)&&(t=!0)}),t}function Bp(i,e){let t=[];return i.selectors.forEach(r=>{let n=Ia(r,i);e.selectors.forEach(a=>{if(!a)return;let s=Ia(a,e);Mp(s,n)||(s.prepend(Rp.combinator({value:" "})),s.prepend(n.clone({}))),t.push(s.toString())})}),t}function on(i,e){let t=i.prev();for(e.after(i);t&&t.type==="comment";){let r=t.prev();e.after(t),t=r}return i}function CS(i){return function e(t,r,n,a=n){let s=[];if(r.each(o=>{o.type==="rule"&&n?a&&(o.selectors=Bp(t,o)):o.type==="atrule"&&o.nodes?i[o.name]?e(t,o,a):r[Ra]!==!1&&s.push(o):s.push(o)}),n&&s.length){let o=t.clone({nodes:[]});for(let u of s)o.append(u);r.prepend(o)}}}function qa(i,e,t){let r=new qp({selector:i,nodes:[]});return r.append(e),t.after(r),r}function Fp(i,e){let t={};for(let r of i)t[r]=!0;if(e)for(let r of e)t[r.replace(/^@/,"")]=!0;return t}function AS(i){i=i.trim();let e=i.match(/^\\((.*)\\)$/);if(!e)return{type:"basic",selector:i};let t=e[1].match(/^(with(?:out)?):(.+)$/);if(t){let r=t[1]==="with",n=Object.fromEntries(t[2].trim().split(/\\s+/).map(s=>[s,!0]));if(r&&n.all)return{type:"noop"};let a=s=>!!n[s];return n.all?a=()=>!0:r&&(a=s=>s==="all"?!1:!n[s]),{type:"withrules",escapes:a}}return{type:"unknown"}}function _S(i){let e=[],t=i.parent;for(;t&&t instanceof SS;)e.push(t),t=t.parent;return e}function OS(i){let e=i[Np];if(!e)i.after(i.nodes);else{let t=i.nodes,r,n=-1,a,s,o,u=_S(i);if(u.forEach((c,f)=>{if(e(c.name))r=c,n=f,s=o;else{let d=o;o=c.clone({nodes:[]}),d&&o.append(d),a=a||o}}),r?s?(a.append(t),r.after(s)):r.after(t):i.after(t),i.next()&&r){let c;u.slice(0,n+1).forEach((f,d,p)=>{let m=c;c=f.clone({nodes:[]}),m&&c.append(m);let w=[],y=(p[d-1]||i).next();for(;y;)w.push(y),y=y.next();c.append(w)}),c&&(s||t[t.length-1]).after(c)}}i.remove()}var Ra=Symbol("rootRuleMergeSel"),Np=Symbol("rootRuleEscapes");function ES(i){let{params:e}=i,{type:t,selector:r,escapes:n}=AS(e);if(t==="unknown")throw i.error(`Unknown @${i.name} parameter ${JSON.stringify(e)}`);if(t==="basic"&&r){let a=new qp({selector:r,nodes:i.nodes});i.removeAll(),i.append(a)}i[Np]=n,i[Ra]=n?!n("all"):t==="noop"}var Ma=Symbol("hasRootRule");Ba.exports=(i={})=>{let e=Fp(["media","supports","layer","container"],i.bubble),t=CS(e),r=Fp(["document","font-face","keyframes","-webkit-keyframes","-moz-keyframes"],i.unwrap),n=(i.rootRuleName||"at-root").replace(/^@/,""),a=i.preserveEmpty;return{postcssPlugin:"postcss-nested",Once(s){s.walkAtRules(n,o=>{ES(o),s[Ma]=!0})},Rule(s){let o=!1,u=s,c=!1,f=[];s.each(d=>{d.type==="rule"?(f.length&&(u=qa(s.selector,f,u),f=[]),c=!0,o=!0,d.selectors=Bp(s,d),u=on(d,u)):d.type==="atrule"?(f.length&&(u=qa(s.selector,f,u),f=[]),d.name===n?(o=!0,t(s,d,!0,d[Ra]),u=on(d,u)):e[d.name]?(c=!0,o=!0,t(s,d,!0),u=on(d,u)):r[d.name]?(c=!0,o=!0,t(s,d,!1),u=on(d,u)):c&&f.push(d)):d.type==="decl"&&c&&f.push(d)}),f.length&&(u=qa(s.selector,f,u)),o&&a!==!0&&(s.raws.semicolon=!0,s.nodes.length===0&&s.remove())},RootExit(s){s[Ma]&&(s.walkAtRules(n,OS),s[Ma]=!1)}}};Ba.exports.postcss=!0});var Vp=v((E3,zp)=>{l();"use strict";var $p=/-(\\w|$)/g,jp=(i,e)=>e.toUpperCase(),TS=i=>(i=i.toLowerCase(),i==="float"?"cssFloat":i.startsWith("-ms-")?i.substr(1).replace($p,jp):i.replace($p,jp));zp.exports=TS});var La=v((T3,Up)=>{l();var PS=Vp(),DS={boxFlex:!0,boxFlexGroup:!0,columnCount:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,strokeDashoffset:!0,strokeOpacity:!0,strokeWidth:!0};function Fa(i){return typeof i.nodes=="undefined"?!0:Na(i)}function Na(i){let e,t={};return i.each(r=>{if(r.type==="atrule")e="@"+r.name,r.params&&(e+=" "+r.params),typeof t[e]=="undefined"?t[e]=Fa(r):Array.isArray(t[e])?t[e].push(Fa(r)):t[e]=[t[e],Fa(r)];else if(r.type==="rule"){let n=Na(r);if(t[r.selector])for(let a in n)t[r.selector][a]=n[a];else t[r.selector]=n}else if(r.type==="decl"){r.prop[0]==="-"&&r.prop[1]==="-"||r.parent&&r.parent.selector===":export"?e=r.prop:e=PS(r.prop);let n=r.value;!isNaN(r.value)&&DS[e]&&(n=parseFloat(r.value)),r.important&&(n+=" !important"),typeof t[e]=="undefined"?t[e]=n:Array.isArray(t[e])?t[e].push(n):t[e]=[t[e],n]}}),t}Up.exports=Na});var ln=v((P3,Yp)=>{l();var Yr=ge(),Wp=/\\s*!important\\s*$/i,IS={"box-flex":!0,"box-flex-group":!0,"column-count":!0,flex:!0,"flex-grow":!0,"flex-positive":!0,"flex-shrink":!0,"flex-negative":!0,"font-weight":!0,"line-clamp":!0,"line-height":!0,opacity:!0,order:!0,orphans:!0,"tab-size":!0,widows:!0,"z-index":!0,zoom:!0,"fill-opacity":!0,"stroke-dashoffset":!0,"stroke-opacity":!0,"stroke-width":!0};function qS(i){return i.replace(/([A-Z])/g,"-$1").replace(/^ms-/,"-ms-").toLowerCase()}function Gp(i,e,t){t===!1||t===null||(e.startsWith("--")||(e=qS(e)),typeof t=="number"&&(t===0||IS[e]?t=t.toString():t+="px"),e==="css-float"&&(e="float"),Wp.test(t)?(t=t.replace(Wp,""),i.push(Yr.decl({prop:e,value:t,important:!0}))):i.push(Yr.decl({prop:e,value:t})))}function Hp(i,e,t){let r=Yr.atRule({name:e[1],params:e[3]||""});typeof t=="object"&&(r.nodes=[],$a(t,r)),i.push(r)}function $a(i,e){let t,r,n;for(t in i)if(r=i[t],!(r===null||typeof r=="undefined"))if(t[0]==="@"){let a=t.match(/@(\\S+)(\\s+([\\W\\w]*)\\s*)?/);if(Array.isArray(r))for(let s of r)Hp(e,a,s);else Hp(e,a,r)}else if(Array.isArray(r))for(let a of r)Gp(e,t,a);else typeof r=="object"?(n=Yr.rule({selector:t}),$a(r,n),e.push(n)):Gp(e,t,r)}Yp.exports=function(i){let e=Yr.root();return $a(i,e),e}});var ja=v((D3,Qp)=>{l();var RS=La();Qp.exports=function(e){return console&&console.warn&&e.warnings().forEach(t=>{let r=t.plugin||"PostCSS";console.warn(r+": "+t.text)}),RS(e.root)}});var Xp=v((I3,Jp)=>{l();var MS=ge(),BS=ja(),FS=ln();Jp.exports=function(e){let t=MS(e);return async r=>{let n=await t.process(r,{parser:FS,from:void 0});return BS(n)}}});var Zp=v((q3,Kp)=>{l();var NS=ge(),LS=ja(),$S=ln();Kp.exports=function(i){let e=NS(i);return t=>{let r=e.process(t,{parser:$S,from:void 0});return LS(r)}}});var td=v((R3,ed)=>{l();var jS=La(),zS=ln(),VS=Xp(),US=Zp();ed.exports={objectify:jS,parse:zS,async:VS,sync:US}});var Rt,rd,M3,B3,F3,N3,id=C(()=>{l();Rt=K(td()),rd=Rt.default,M3=Rt.default.objectify,B3=Rt.default.parse,F3=Rt.default.async,N3=Rt.default.sync});function Mt(i){return Array.isArray(i)?i.flatMap(e=>V([(0,nd.default)({bubble:["screen"]})]).process(e,{parser:rd}).root.nodes):Mt([i])}var nd,za=C(()=>{l();nt();nd=K(Lp());id()});function Bt(i,e,t=!1){if(i==="")return e;let r=typeof e=="string"?(0,sd.default)().astSync(e):e;return r.walkClasses(n=>{let a=n.value,s=t&&a.startsWith("-");n.value=s?`-${i}${a.slice(1)}`:`${i}${a}`}),typeof e=="string"?r.toString():r}var sd,un=C(()=>{l();sd=K(Re())});function de(i){let e=ad.default.className();return e.value=i,mt(e?.raws?.value??e.value)}var ad,Ft=C(()=>{l();ad=K(Re());mi()});function Va(i){return mt(`.${de(i)}`)}function fn(i,e){return Va(Qr(i,e))}function Qr(i,e){return e==="DEFAULT"?i:e==="-"||e==="-DEFAULT"?`-${i}`:e.startsWith("-")?`-${i}${e}`:e.startsWith("/")?`${i}${e}`:`${i}-${e}`}var Ua=C(()=>{l();Ft();mi()});function P(i,e=[[i,[i]]],{filterDefault:t=!1,...r}={}){let n=Ge(i);return function({matchUtilities:a,theme:s}){for(let o of e){let u=Array.isArray(o[0])?o:[o];a(u.reduce((c,[f,d])=>Object.assign(c,{[f]:p=>d.reduce((m,w)=>Array.isArray(w)?Object.assign(m,{[w[0]]:w[1]}):Object.assign(m,{[w]:n(p)}),{})}),{}),{...r,values:t?Object.fromEntries(Object.entries(s(i)??{}).filter(([c])=>c!=="DEFAULT")):s(i)})}}}var od=C(()=>{l();Hr()});function st(i){return i=Array.isArray(i)?i:[i],i.map(e=>{let t=e.values.map(r=>r.raw!==void 0?r.raw:[r.min&&`(min-width: ${r.min})`,r.max&&`(max-width: ${r.max})`].filter(Boolean).join(" and "));return e.not?`not all and ${t}`:t}).join(", ")}var cn=C(()=>{l()});function Wa(i){return i.split(XS).map(t=>{let r=t.trim(),n={value:r},a=r.split(KS),s=new Set;for(let o of a)!s.has("DIRECTIONS")&&WS.has(o)?(n.direction=o,s.add("DIRECTIONS")):!s.has("PLAY_STATES")&&GS.has(o)?(n.playState=o,s.add("PLAY_STATES")):!s.has("FILL_MODES")&&HS.has(o)?(n.fillMode=o,s.add("FILL_MODES")):!s.has("ITERATION_COUNTS")&&(YS.has(o)||ZS.test(o))?(n.iterationCount=o,s.add("ITERATION_COUNTS")):!s.has("TIMING_FUNCTION")&&QS.has(o)||!s.has("TIMING_FUNCTION")&&JS.some(u=>o.startsWith(`${u}(`))?(n.timingFunction=o,s.add("TIMING_FUNCTION")):!s.has("DURATION")&&ld.test(o)?(n.duration=o,s.add("DURATION")):!s.has("DELAY")&&ld.test(o)?(n.delay=o,s.add("DELAY")):s.has("NAME")?(n.unknown||(n.unknown=[]),n.unknown.push(o)):(n.name=o,s.add("NAME"));return n})}var WS,GS,HS,YS,QS,JS,XS,KS,ld,ZS,ud=C(()=>{l();WS=new Set(["normal","reverse","alternate","alternate-reverse"]),GS=new Set(["running","paused"]),HS=new Set(["none","forwards","backwards","both"]),YS=new Set(["infinite"]),QS=new Set(["linear","ease","ease-in","ease-out","ease-in-out","step-start","step-end"]),JS=["cubic-bezier","steps"],XS=/\\,(?![^(]*\\))/g,KS=/\\ +(?![^(]*\\))/g,ld=/^(-?[\\d.]+m?s)$/,ZS=/^(\\d+)$/});var fd,ie,cd=C(()=>{l();fd=i=>Object.assign({},...Object.entries(i??{}).flatMap(([e,t])=>typeof t=="object"?Object.entries(fd(t)).map(([r,n])=>({[e+(r==="DEFAULT"?"":`-${r}`)]:n})):[{[`${e}`]:t}])),ie=fd});var eC,Ha,tC,rC,iC,nC,sC,aC,oC,lC,uC,fC,cC,pC,dC,hC,mC,gC,Ya,Ga=C(()=>{eC="tailwindcss",Ha="3.4.1",tC="A utility-first CSS framework for rapidly building custom user interfaces.",rC="MIT",iC="lib/index.js",nC="types/index.d.ts",sC="https://github.com/tailwindlabs/tailwindcss.git",aC="https://github.com/tailwindlabs/tailwindcss/issues",oC="https://tailwindcss.com",lC={tailwind:"lib/cli.js",tailwindcss:"lib/cli.js"},uC={engine:"stable"},fC={prebuild:"npm run generate && rimraf lib",build:`swc src --out-dir lib --copy-files --config jsc.transform.optimizer.globals.vars.__OXIDE__=\'"false"\'`,postbuild:"esbuild lib/cli-peer-dependencies.js --bundle --platform=node --outfile=peers/index.js --define:process.env.CSS_TRANSFORMER_WASM=false","rebuild-fixtures":"npm run build && node -r @swc/register scripts/rebuildFixtures.js",style:"eslint .",pretest:"npm run generate",test:"jest","test:integrations":"npm run test --prefix ./integrations","install:integrations":"node scripts/install-integrations.js","generate:plugin-list":"node -r @swc/register scripts/create-plugin-list.js","generate:types":"node -r @swc/register scripts/generate-types.js",generate:"npm run generate:plugin-list && npm run generate:types","release-channel":"node ./scripts/release-channel.js","release-notes":"node ./scripts/release-notes.js",prepublishOnly:"npm install --force && npm run build"},cC=["src/*","cli/*","lib/*","peers/*","scripts/*.js","stubs/*","nesting/*","types/**/*","*.d.ts","*.css","*.js"],pC={"@swc/cli":"^0.1.62","@swc/core":"^1.3.55","@swc/jest":"^0.2.26","@swc/register":"^0.1.10",autoprefixer:"^10.4.14",browserslist:"^4.21.5",concurrently:"^8.0.1",cssnano:"^6.0.0",esbuild:"^0.17.18",eslint:"^8.39.0","eslint-config-prettier":"^8.8.0","eslint-plugin-prettier":"^4.2.1",jest:"^29.6.0","jest-diff":"^29.6.0",lightningcss:"1.18.0",prettier:"^2.8.8",rimraf:"^5.0.0","source-map-js":"^1.0.2",turbo:"^1.9.3"},dC={"@alloc/quick-lru":"^5.2.0",arg:"^5.0.2",chokidar:"^3.5.3",didyoumean:"^1.2.2",dlv:"^1.1.3","fast-glob":"^3.3.0","glob-parent":"^6.0.2","is-glob":"^4.0.3",jiti:"^1.19.1",lilconfig:"^2.1.0",micromatch:"^4.0.5","normalize-path":"^3.0.0","object-hash":"^3.0.0",picocolors:"^1.0.0",postcss:"^8.4.23","postcss-import":"^15.1.0","postcss-js":"^4.0.1","postcss-load-config":"^4.0.1","postcss-nested":"^6.0.1","postcss-selector-parser":"^6.0.11",resolve:"^1.22.2",sucrase:"^3.32.0"},hC=["> 1%","not edge <= 18","not ie 11","not op_mini all"],mC={testTimeout:3e4,setupFilesAfterEnv:["<rootDir>/jest/customMatchers.js"],testPathIgnorePatterns:["/node_modules/","/integrations/","/standalone-cli/","\\\\.test\\\\.skip\\\\.js$"],transformIgnorePatterns:["node_modules/(?!lightningcss)"],transform:{"\\\\.js$":"@swc/jest","\\\\.ts$":"@swc/jest"}},gC={node:">=14.0.0"},Ya={name:eC,version:Ha,description:tC,license:rC,main:iC,types:nC,repository:sC,bugs:aC,homepage:oC,bin:lC,tailwindcss:uC,scripts:fC,files:cC,devDependencies:pC,dependencies:dC,browserslist:hC,jest:mC,engines:gC}});function at(i,e=!0){return Array.isArray(i)?i.map(t=>{if(e&&Array.isArray(t))throw new Error("The tuple syntax is not supported for `screens`.");if(typeof t=="string")return{name:t.toString(),not:!1,values:[{min:t,max:void 0}]};let[r,n]=t;return r=r.toString(),typeof n=="string"?{name:r,not:!1,values:[{min:n,max:void 0}]}:Array.isArray(n)?{name:r,not:!1,values:n.map(a=>dd(a))}:{name:r,not:!1,values:[dd(n)]}}):at(Object.entries(i??{}),!1)}function pn(i){return i.values.length!==1?{result:!1,reason:"multiple-values"}:i.values[0].raw!==void 0?{result:!1,reason:"raw-values"}:i.values[0].min!==void 0&&i.values[0].max!==void 0?{result:!1,reason:"min-and-max"}:{result:!0,reason:null}}function pd(i,e,t){let r=dn(e,i),n=dn(t,i),a=pn(r),s=pn(n);if(a.reason==="multiple-values"||s.reason==="multiple-values")throw new Error("Attempted to sort a screen with multiple values. This should never happen. Please open a bug report.");if(a.reason==="raw-values"||s.reason==="raw-values")throw new Error("Attempted to sort a screen with raw values. This should never happen. Please open a bug report.");if(a.reason==="min-and-max"||s.reason==="min-and-max")throw new Error("Attempted to sort a screen with both min and max values. This should never happen. Please open a bug report.");let{min:o,max:u}=r.values[0],{min:c,max:f}=n.values[0];e.not&&([o,u]=[u,o]),t.not&&([c,f]=[f,c]),o=o===void 0?o:parseFloat(o),u=u===void 0?u:parseFloat(u),c=c===void 0?c:parseFloat(c),f=f===void 0?f:parseFloat(f);let[d,p]=i==="min"?[o,c]:[f,u];return d-p}function dn(i,e){return typeof i=="object"?i:{name:"arbitrary-screen",values:[{[e]:i}]}}function dd({"min-width":i,min:e=i,max:t,raw:r}={}){return{min:e,max:t,raw:r}}var hn=C(()=>{l()});function mn(i,e){i.walkDecls(t=>{if(e.includes(t.prop)){t.remove();return}for(let r of e)t.value.includes(`/ var(${r})`)&&(t.value=t.value.replace(`/ var(${r})`,""))})}var hd=C(()=>{l()});var Y,Te,Me,Be,md,gd=C(()=>{l();je();gt();nt();od();cn();Ft();ud();cd();or();cs();kt();Hr();Ga();Oe();hn();ns();hd();ze();fr();Xr();Y={childVariant:({addVariant:i})=>{i("*","& > *")},pseudoElementVariants:({addVariant:i})=>{i("first-letter","&::first-letter"),i("first-line","&::first-line"),i("marker",[({container:e})=>(mn(e,["--tw-text-opacity"]),"& *::marker"),({container:e})=>(mn(e,["--tw-text-opacity"]),"&::marker")]),i("selection",["& *::selection","&::selection"]),i("file","&::file-selector-button"),i("placeholder","&::placeholder"),i("backdrop","&::backdrop"),i("before",({container:e})=>(e.walkRules(t=>{let r=!1;t.walkDecls("content",()=>{r=!0}),r||t.prepend(V.decl({prop:"content",value:"var(--tw-content)"}))}),"&::before")),i("after",({container:e})=>(e.walkRules(t=>{let r=!1;t.walkDecls("content",()=>{r=!0}),r||t.prepend(V.decl({prop:"content",value:"var(--tw-content)"}))}),"&::after"))},pseudoClassVariants:({addVariant:i,matchVariant:e,config:t,prefix:r})=>{let n=[["first","&:first-child"],["last","&:last-child"],["only","&:only-child"],["odd","&:nth-child(odd)"],["even","&:nth-child(even)"],"first-of-type","last-of-type","only-of-type",["visited",({container:s})=>(mn(s,["--tw-text-opacity","--tw-border-opacity","--tw-bg-opacity"]),"&:visited")],"target",["open","&[open]"],"default","checked","indeterminate","placeholder-shown","autofill","optional","required","valid","invalid","in-range","out-of-range","read-only","empty","focus-within",["hover",Z(t(),"hoverOnlyWhenSupported")?"@media (hover: hover) and (pointer: fine) { &:hover }":"&:hover"],"focus","focus-visible","active","enabled","disabled"].map(s=>Array.isArray(s)?s:[s,`&:${s}`]);for(let[s,o]of n)i(s,u=>typeof o=="function"?o(u):o);let a={group:(s,{modifier:o})=>o?[`:merge(${r(".group")}\\\\/${de(o)})`," &"]:[`:merge(${r(".group")})`," &"],peer:(s,{modifier:o})=>o?[`:merge(${r(".peer")}\\\\/${de(o)})`," ~ &"]:[`:merge(${r(".peer")})`," ~ &"]};for(let[s,o]of Object.entries(a))e(s,(u="",c)=>{let f=N(typeof u=="function"?u(c):u);f.includes("&")||(f="&"+f);let[d,p]=o("",c),m=null,w=null,x=0;for(let y=0;y<f.length;++y){let b=f[y];b==="&"?m=y:b==="\'"||b===\'"\'?x+=1:m!==null&&b===" "&&!x&&(w=y)}return m!==null&&w===null&&(w=f.length),f.slice(0,m)+d+f.slice(m+1,w)+p+f.slice(w)},{values:Object.fromEntries(n),[Jr]:{respectPrefix:!1}})},directionVariants:({addVariant:i})=>{i("ltr",\'&:where([dir="ltr"], [dir="ltr"] *)\'),i("rtl",\'&:where([dir="rtl"], [dir="rtl"] *)\')},reducedMotionVariants:({addVariant:i})=>{i("motion-safe","@media (prefers-reduced-motion: no-preference)"),i("motion-reduce","@media (prefers-reduced-motion: reduce)")},darkVariants:({config:i,addVariant:e})=>{let[t,r=".dark"]=[].concat(i("darkMode","media"));if(t===!1&&(t="media",F.warn("darkmode-false",["The `darkMode` option in your Tailwind CSS configuration is set to `false`, which now behaves the same as `media`.","Change `darkMode` to `media` or remove it entirely.","https://tailwindcss.com/docs/upgrade-guide#remove-dark-mode-configuration"])),t==="variant"){let n;if(Array.isArray(r)||typeof r=="function"?n=r:typeof r=="string"&&(n=[r]),Array.isArray(n))for(let a of n)a===".dark"?(t=!1,F.warn("darkmode-variant-without-selector",["When using `variant` for `darkMode`, you must provide a selector.",\'Example: `darkMode: ["variant", ".your-selector &"]`\'])):a.includes("&")||(t=!1,F.warn("darkmode-variant-without-ampersand",["When using `variant` for `darkMode`, your selector must contain `&`.",\'Example `darkMode: ["variant", ".your-selector &"]`\']));r=n}t==="selector"?e("dark",`&:where(${r}, ${r} *)`):t==="media"?e("dark","@media (prefers-color-scheme: dark)"):t==="variant"?e("dark",r):t==="class"&&e("dark",`:is(${r} &)`)},printVariant:({addVariant:i})=>{i("print","@media print")},screenVariants:({theme:i,addVariant:e,matchVariant:t})=>{let r=i("screens")??{},n=Object.values(r).every(b=>typeof b=="string"),a=at(i("screens")),s=new Set([]);function o(b){return b.match(/(\\D+)$/)?.[1]??"(none)"}function u(b){b!==void 0&&s.add(o(b))}function c(b){return u(b),s.size===1}for(let b of a)for(let k of b.values)u(k.min),u(k.max);let f=s.size<=1;function d(b){return Object.fromEntries(a.filter(k=>pn(k).result).map(k=>{let{min:S,max:_}=k.values[0];if(b==="min"&&S!==void 0)return k;if(b==="min"&&_!==void 0)return{...k,not:!k.not};if(b==="max"&&_!==void 0)return k;if(b==="max"&&S!==void 0)return{...k,not:!k.not}}).map(k=>[k.name,k]))}function p(b){return(k,S)=>pd(b,k.value,S.value)}let m=p("max"),w=p("min");function x(b){return k=>{if(n)if(f){if(typeof k=="string"&&!c(k))return F.warn("minmax-have-mixed-units",["The `min-*` and `max-*` variants are not supported with a `screens` configuration containing mixed units."]),[]}else return F.warn("mixed-screen-units",["The `min-*` and `max-*` variants are not supported with a `screens` configuration containing mixed units."]),[];else return F.warn("complex-screen-config",["The `min-*` and `max-*` variants are not supported with a `screens` configuration containing objects."]),[];return[`@media ${st(dn(k,b))}`]}}t("max",x("max"),{sort:m,values:n?d("max"):{}});let y="min-screens";for(let b of a)e(b.name,`@media ${st(b)}`,{id:y,sort:n&&f?w:void 0,value:b});t("min",x("min"),{id:y,sort:w})},supportsVariants:({matchVariant:i,theme:e})=>{i("supports",(t="")=>{let r=N(t),n=/^\\w*\\s*\\(/.test(r);return r=n?r.replace(/\\b(and|or|not)\\b/g," $1 "):r,n?`@supports ${r}`:(r.includes(":")||(r=`${r}: var(--tw)`),r.startsWith("(")&&r.endsWith(")")||(r=`(${r})`),`@supports ${r}`)},{values:e("supports")??{}})},hasVariants:({matchVariant:i})=>{i("has",e=>`&:has(${N(e)})`,{values:{}}),i("group-has",(e,{modifier:t})=>t?`:merge(.group\\\\/${t}):has(${N(e)}) &`:`:merge(.group):has(${N(e)}) &`,{values:{}}),i("peer-has",(e,{modifier:t})=>t?`:merge(.peer\\\\/${t}):has(${N(e)}) ~ &`:`:merge(.peer):has(${N(e)}) ~ &`,{values:{}})},ariaVariants:({matchVariant:i,theme:e})=>{i("aria",t=>`&[aria-${N(t)}]`,{values:e("aria")??{}}),i("group-aria",(t,{modifier:r})=>r?`:merge(.group\\\\/${r})[aria-${N(t)}] &`:`:merge(.group)[aria-${N(t)}] &`,{values:e("aria")??{}}),i("peer-aria",(t,{modifier:r})=>r?`:merge(.peer\\\\/${r})[aria-${N(t)}] ~ &`:`:merge(.peer)[aria-${N(t)}] ~ &`,{values:e("aria")??{}})},dataVariants:({matchVariant:i,theme:e})=>{i("data",t=>`&[data-${N(t)}]`,{values:e("data")??{}}),i("group-data",(t,{modifier:r})=>r?`:merge(.group\\\\/${r})[data-${N(t)}] &`:`:merge(.group)[data-${N(t)}] &`,{values:e("data")??{}}),i("peer-data",(t,{modifier:r})=>r?`:merge(.peer\\\\/${r})[data-${N(t)}] ~ &`:`:merge(.peer)[data-${N(t)}] ~ &`,{values:e("data")??{}})},orientationVariants:({addVariant:i})=>{i("portrait","@media (orientation: portrait)"),i("landscape","@media (orientation: landscape)")},prefersContrastVariants:({addVariant:i})=>{i("contrast-more","@media (prefers-contrast: more)"),i("contrast-less","@media (prefers-contrast: less)")},forcedColorsVariants:({addVariant:i})=>{i("forced-colors","@media (forced-colors: active)")}},Te=["translate(var(--tw-translate-x), var(--tw-translate-y))","rotate(var(--tw-rotate))","skewX(var(--tw-skew-x))","skewY(var(--tw-skew-y))","scaleX(var(--tw-scale-x))","scaleY(var(--tw-scale-y))"].join(" "),Me=["var(--tw-blur)","var(--tw-brightness)","var(--tw-contrast)","var(--tw-grayscale)","var(--tw-hue-rotate)","var(--tw-invert)","var(--tw-saturate)","var(--tw-sepia)","var(--tw-drop-shadow)"].join(" "),Be=["var(--tw-backdrop-blur)","var(--tw-backdrop-brightness)","var(--tw-backdrop-contrast)","var(--tw-backdrop-grayscale)","var(--tw-backdrop-hue-rotate)","var(--tw-backdrop-invert)","var(--tw-backdrop-opacity)","var(--tw-backdrop-saturate)","var(--tw-backdrop-sepia)"].join(" "),md={preflight:({addBase:i})=>{let e=V.parse(`*,::after,::before{box-sizing:border-box;border-width:0;border-style:solid;border-color:theme(\'borderColor.DEFAULT\', currentColor)}::after,::before{--tw-content:\'\'}:host,html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:theme(\'fontFamily.sans\', ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:theme(\'fontFamily.sans[1].fontFeatureSettings\', normal);font-variation-settings:theme(\'fontFamily.sans[1].fontVariationSettings\', normal);-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:theme(\'fontFamily.mono\', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:theme(\'fontFamily.mono[1].fontFeatureSettings\', normal);font-variation-settings:theme(\'fontFamily.mono[1].fontVariationSettings\', normal);font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::placeholder,textarea::placeholder{opacity:1;color:theme(\'colors.gray.4\', #9ca3af)}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}`);i([V.comment({text:`! tailwindcss v${Ha} | MIT License | https://tailwindcss.com`}),...e.nodes])},container:(()=>{function i(t=[]){return t.flatMap(r=>r.values.map(n=>n.min)).filter(r=>r!==void 0)}function e(t,r,n){if(typeof n=="undefined")return[];if(!(typeof n=="object"&&n!==null))return[{screen:"DEFAULT",minWidth:0,padding:n}];let a=[];n.DEFAULT&&a.push({screen:"DEFAULT",minWidth:0,padding:n.DEFAULT});for(let s of t)for(let o of r)for(let{min:u}of o.values)u===s&&a.push({minWidth:s,padding:n[o.name]});return a}return function({addComponents:t,theme:r}){let n=at(r("container.screens",r("screens"))),a=i(n),s=e(a,n,r("container.padding")),o=c=>{let f=s.find(d=>d.minWidth===c);return f?{paddingRight:f.padding,paddingLeft:f.padding}:{}},u=Array.from(new Set(a.slice().sort((c,f)=>parseInt(c)-parseInt(f)))).map(c=>({[`@media (min-width: ${c})`]:{".container":{"max-width":c,...o(c)}}}));t([{".container":Object.assign({width:"100%"},r("container.center",!1)?{marginRight:"auto",marginLeft:"auto"}:{},o(0))},...u])}})(),accessibility:({addUtilities:i})=>{i({".sr-only":{position:"absolute",width:"1px",height:"1px",padding:"0",margin:"-1px",overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0"},".not-sr-only":{position:"static",width:"auto",height:"auto",padding:"0",margin:"0",overflow:"visible",clip:"auto",whiteSpace:"normal"}})},pointerEvents:({addUtilities:i})=>{i({".pointer-events-none":{"pointer-events":"none"},".pointer-events-auto":{"pointer-events":"auto"}})},visibility:({addUtilities:i})=>{i({".visible":{visibility:"visible"},".invisible":{visibility:"hidden"},".collapse":{visibility:"collapse"}})},position:({addUtilities:i})=>{i({".static":{position:"static"},".fixed":{position:"fixed"},".absolute":{position:"absolute"},".relative":{position:"relative"},".sticky":{position:"sticky"}})},inset:P("inset",[["inset",["inset"]],[["inset-x",["left","right"]],["inset-y",["top","bottom"]]],[["start",["inset-inline-start"]],["end",["inset-inline-end"]],["top",["top"]],["right",["right"]],["bottom",["bottom"]],["left",["left"]]]],{supportsNegativeValues:!0}),isolation:({addUtilities:i})=>{i({".isolate":{isolation:"isolate"},".isolation-auto":{isolation:"auto"}})},zIndex:P("zIndex",[["z",["zIndex"]]],{supportsNegativeValues:!0}),order:P("order",void 0,{supportsNegativeValues:!0}),gridColumn:P("gridColumn",[["col",["gridColumn"]]]),gridColumnStart:P("gridColumnStart",[["col-start",["gridColumnStart"]]]),gridColumnEnd:P("gridColumnEnd",[["col-end",["gridColumnEnd"]]]),gridRow:P("gridRow",[["row",["gridRow"]]]),gridRowStart:P("gridRowStart",[["row-start",["gridRowStart"]]]),gridRowEnd:P("gridRowEnd",[["row-end",["gridRowEnd"]]]),float:({addUtilities:i})=>{i({".float-start":{float:"inline-start"},".float-end":{float:"inline-end"},".float-right":{float:"right"},".float-left":{float:"left"},".float-none":{float:"none"}})},clear:({addUtilities:i})=>{i({".clear-start":{clear:"inline-start"},".clear-end":{clear:"inline-end"},".clear-left":{clear:"left"},".clear-right":{clear:"right"},".clear-both":{clear:"both"},".clear-none":{clear:"none"}})},margin:P("margin",[["m",["margin"]],[["mx",["margin-left","margin-right"]],["my",["margin-top","margin-bottom"]]],[["ms",["margin-inline-start"]],["me",["margin-inline-end"]],["mt",["margin-top"]],["mr",["margin-right"]],["mb",["margin-bottom"]],["ml",["margin-left"]]]],{supportsNegativeValues:!0}),boxSizing:({addUtilities:i})=>{i({".box-border":{"box-sizing":"border-box"},".box-content":{"box-sizing":"content-box"}})},lineClamp:({matchUtilities:i,addUtilities:e,theme:t})=>{i({"line-clamp":r=>({overflow:"hidden",display:"-webkit-box","-webkit-box-orient":"vertical","-webkit-line-clamp":`${r}`})},{values:t("lineClamp")}),e({".line-clamp-none":{overflow:"visible",display:"block","-webkit-box-orient":"horizontal","-webkit-line-clamp":"none"}})},display:({addUtilities:i})=>{i({".block":{display:"block"},".inline-block":{display:"inline-block"},".inline":{display:"inline"},".flex":{display:"flex"},".inline-flex":{display:"inline-flex"},".table":{display:"table"},".inline-table":{display:"inline-table"},".table-caption":{display:"table-caption"},".table-cell":{display:"table-cell"},".table-column":{display:"table-column"},".table-column-group":{display:"table-column-group"},".table-footer-group":{display:"table-footer-group"},".table-header-group":{display:"table-header-group"},".table-row-group":{display:"table-row-group"},".table-row":{display:"table-row"},".flow-root":{display:"flow-root"},".grid":{display:"grid"},".inline-grid":{display:"inline-grid"},".contents":{display:"contents"},".list-item":{display:"list-item"},".hidden":{display:"none"}})},aspectRatio:P("aspectRatio",[["aspect",["aspect-ratio"]]]),size:P("size",[["size",["width","height"]]]),height:P("height",[["h",["height"]]]),maxHeight:P("maxHeight",[["max-h",["maxHeight"]]]),minHeight:P("minHeight",[["min-h",["minHeight"]]]),width:P("width",[["w",["width"]]]),minWidth:P("minWidth",[["min-w",["minWidth"]]]),maxWidth:P("maxWidth",[["max-w",["maxWidth"]]]),flex:P("flex"),flexShrink:P("flexShrink",[["flex-shrink",["flex-shrink"]],["shrink",["flex-shrink"]]]),flexGrow:P("flexGrow",[["flex-grow",["flex-grow"]],["grow",["flex-grow"]]]),flexBasis:P("flexBasis",[["basis",["flex-basis"]]]),tableLayout:({addUtilities:i})=>{i({".table-auto":{"table-layout":"auto"},".table-fixed":{"table-layout":"fixed"}})},captionSide:({addUtilities:i})=>{i({".caption-top":{"caption-side":"top"},".caption-bottom":{"caption-side":"bottom"}})},borderCollapse:({addUtilities:i})=>{i({".border-collapse":{"border-collapse":"collapse"},".border-separate":{"border-collapse":"separate"}})},borderSpacing:({addDefaults:i,matchUtilities:e,theme:t})=>{i("border-spacing",{"--tw-border-spacing-x":0,"--tw-border-spacing-y":0}),e({"border-spacing":r=>({"--tw-border-spacing-x":r,"--tw-border-spacing-y":r,"@defaults border-spacing":{},"border-spacing":"var(--tw-border-spacing-x) var(--tw-border-spacing-y)"}),"border-spacing-x":r=>({"--tw-border-spacing-x":r,"@defaults border-spacing":{},"border-spacing":"var(--tw-border-spacing-x) var(--tw-border-spacing-y)"}),"border-spacing-y":r=>({"--tw-border-spacing-y":r,"@defaults border-spacing":{},"border-spacing":"var(--tw-border-spacing-x) var(--tw-border-spacing-y)"})},{values:t("borderSpacing")})},transformOrigin:P("transformOrigin",[["origin",["transformOrigin"]]]),translate:P("translate",[[["translate-x",[["@defaults transform",{}],"--tw-translate-x",["transform",Te]]],["translate-y",[["@defaults transform",{}],"--tw-translate-y",["transform",Te]]]]],{supportsNegativeValues:!0}),rotate:P("rotate",[["rotate",[["@defaults transform",{}],"--tw-rotate",["transform",Te]]]],{supportsNegativeValues:!0}),skew:P("skew",[[["skew-x",[["@defaults transform",{}],"--tw-skew-x",["transform",Te]]],["skew-y",[["@defaults transform",{}],"--tw-skew-y",["transform",Te]]]]],{supportsNegativeValues:!0}),scale:P("scale",[["scale",[["@defaults transform",{}],"--tw-scale-x","--tw-scale-y",["transform",Te]]],[["scale-x",[["@defaults transform",{}],"--tw-scale-x",["transform",Te]]],["scale-y",[["@defaults transform",{}],"--tw-scale-y",["transform",Te]]]]],{supportsNegativeValues:!0}),transform:({addDefaults:i,addUtilities:e})=>{i("transform",{"--tw-translate-x":"0","--tw-translate-y":"0","--tw-rotate":"0","--tw-skew-x":"0","--tw-skew-y":"0","--tw-scale-x":"1","--tw-scale-y":"1"}),e({".transform":{"@defaults transform":{},transform:Te},".transform-cpu":{transform:Te},".transform-gpu":{transform:Te.replace("translate(var(--tw-translate-x), var(--tw-translate-y))","translate3d(var(--tw-translate-x), var(--tw-translate-y), 0)")},".transform-none":{transform:"none"}})},animation:({matchUtilities:i,theme:e,config:t})=>{let r=a=>de(t("prefix")+a),n=Object.fromEntries(Object.entries(e("keyframes")??{}).map(([a,s])=>[a,{[`@keyframes ${r(a)}`]:s}]));i({animate:a=>{let s=Wa(a);return[...s.flatMap(o=>n[o.name]),{animation:s.map(({name:o,value:u})=>o===void 0||n[o]===void 0?u:u.replace(o,r(o))).join(", ")}]}},{values:e("animation")})},cursor:P("cursor"),touchAction:({addDefaults:i,addUtilities:e})=>{i("touch-action",{"--tw-pan-x":" ","--tw-pan-y":" ","--tw-pinch-zoom":" "});let t="var(--tw-pan-x) var(--tw-pan-y) var(--tw-pinch-zoom)";e({".touch-auto":{"touch-action":"auto"},".touch-none":{"touch-action":"none"},".touch-pan-x":{"@defaults touch-action":{},"--tw-pan-x":"pan-x","touch-action":t},".touch-pan-left":{"@defaults touch-action":{},"--tw-pan-x":"pan-left","touch-action":t},".touch-pan-right":{"@defaults touch-action":{},"--tw-pan-x":"pan-right","touch-action":t},".touch-pan-y":{"@defaults touch-action":{},"--tw-pan-y":"pan-y","touch-action":t},".touch-pan-up":{"@defaults touch-action":{},"--tw-pan-y":"pan-up","touch-action":t},".touch-pan-down":{"@defaults touch-action":{},"--tw-pan-y":"pan-down","touch-action":t},".touch-pinch-zoom":{"@defaults touch-action":{},"--tw-pinch-zoom":"pinch-zoom","touch-action":t},".touch-manipulation":{"touch-action":"manipulation"}})},userSelect:({addUtilities:i})=>{i({".select-none":{"user-select":"none"},".select-text":{"user-select":"text"},".select-all":{"user-select":"all"},".select-auto":{"user-select":"auto"}})},resize:({addUtilities:i})=>{i({".resize-none":{resize:"none"},".resize-y":{resize:"vertical"},".resize-x":{resize:"horizontal"},".resize":{resize:"both"}})},scrollSnapType:({addDefaults:i,addUtilities:e})=>{i("scroll-snap-type",{"--tw-scroll-snap-strictness":"proximity"}),e({".snap-none":{"scroll-snap-type":"none"},".snap-x":{"@defaults scroll-snap-type":{},"scroll-snap-type":"x var(--tw-scroll-snap-strictness)"},".snap-y":{"@defaults scroll-snap-type":{},"scroll-snap-type":"y var(--tw-scroll-snap-strictness)"},".snap-both":{"@defaults scroll-snap-type":{},"scroll-snap-type":"both var(--tw-scroll-snap-strictness)"},".snap-mandatory":{"--tw-scroll-snap-strictness":"mandatory"},".snap-proximity":{"--tw-scroll-snap-strictness":"proximity"}})},scrollSnapAlign:({addUtilities:i})=>{i({".snap-start":{"scroll-snap-align":"start"},".snap-end":{"scroll-snap-align":"end"},".snap-center":{"scroll-snap-align":"center"},".snap-align-none":{"scroll-snap-align":"none"}})},scrollSnapStop:({addUtilities:i})=>{i({".snap-normal":{"scroll-snap-stop":"normal"},".snap-always":{"scroll-snap-stop":"always"}})},scrollMargin:P("scrollMargin",[["scroll-m",["scroll-margin"]],[["scroll-mx",["scroll-margin-left","scroll-margin-right"]],["scroll-my",["scroll-margin-top","scroll-margin-bottom"]]],[["scroll-ms",["scroll-margin-inline-start"]],["scroll-me",["scroll-margin-inline-end"]],["scroll-mt",["scroll-margin-top"]],["scroll-mr",["scroll-margin-right"]],["scroll-mb",["scroll-margin-bottom"]],["scroll-ml",["scroll-margin-left"]]]],{supportsNegativeValues:!0}),scrollPadding:P("scrollPadding",[["scroll-p",["scroll-padding"]],[["scroll-px",["scroll-padding-left","scroll-padding-right"]],["scroll-py",["scroll-padding-top","scroll-padding-bottom"]]],[["scroll-ps",["scroll-padding-inline-start"]],["scroll-pe",["scroll-padding-inline-end"]],["scroll-pt",["scroll-padding-top"]],["scroll-pr",["scroll-padding-right"]],["scroll-pb",["scroll-padding-bottom"]],["scroll-pl",["scroll-padding-left"]]]]),listStylePosition:({addUtilities:i})=>{i({".list-inside":{"list-style-position":"inside"},".list-outside":{"list-style-position":"outside"}})},listStyleType:P("listStyleType",[["list",["listStyleType"]]]),listStyleImage:P("listStyleImage",[["list-image",["listStyleImage"]]]),appearance:({addUtilities:i})=>{i({".appearance-none":{appearance:"none"},".appearance-auto":{appearance:"auto"}})},columns:P("columns",[["columns",["columns"]]]),breakBefore:({addUtilities:i})=>{i({".break-before-auto":{"break-before":"auto"},".break-before-avoid":{"break-before":"avoid"},".break-before-all":{"break-before":"all"},".break-before-avoid-page":{"break-before":"avoid-page"},".break-before-page":{"break-before":"page"},".break-before-left":{"break-before":"left"},".break-before-right":{"break-before":"right"},".break-before-column":{"break-before":"column"}})},breakInside:({addUtilities:i})=>{i({".break-inside-auto":{"break-inside":"auto"},".break-inside-avoid":{"break-inside":"avoid"},".break-inside-avoid-page":{"break-inside":"avoid-page"},".break-inside-avoid-column":{"break-inside":"avoid-column"}})},breakAfter:({addUtilities:i})=>{i({".break-after-auto":{"break-after":"auto"},".break-after-avoid":{"break-after":"avoid"},".break-after-all":{"break-after":"all"},".break-after-avoid-page":{"break-after":"avoid-page"},".break-after-page":{"break-after":"page"},".break-after-left":{"break-after":"left"},".break-after-right":{"break-after":"right"},".break-after-column":{"break-after":"column"}})},gridAutoColumns:P("gridAutoColumns",[["auto-cols",["gridAutoColumns"]]]),gridAutoFlow:({addUtilities:i})=>{i({".grid-flow-row":{gridAutoFlow:"row"},".grid-flow-col":{gridAutoFlow:"column"},".grid-flow-dense":{gridAutoFlow:"dense"},".grid-flow-row-dense":{gridAutoFlow:"row dense"},".grid-flow-col-dense":{gridAutoFlow:"column dense"}})},gridAutoRows:P("gridAutoRows",[["auto-rows",["gridAutoRows"]]]),gridTemplateColumns:P("gridTemplateColumns",[["grid-cols",["gridTemplateColumns"]]]),gridTemplateRows:P("gridTemplateRows",[["grid-rows",["gridTemplateRows"]]]),flexDirection:({addUtilities:i})=>{i({".flex-row":{"flex-direction":"row"},".flex-row-reverse":{"flex-direction":"row-reverse"},".flex-col":{"flex-direction":"column"},".flex-col-reverse":{"flex-direction":"column-reverse"}})},flexWrap:({addUtilities:i})=>{i({".flex-wrap":{"flex-wrap":"wrap"},".flex-wrap-reverse":{"flex-wrap":"wrap-reverse"},".flex-nowrap":{"flex-wrap":"nowrap"}})},placeContent:({addUtilities:i})=>{i({".place-content-center":{"place-content":"center"},".place-content-start":{"place-content":"start"},".place-content-end":{"place-content":"end"},".place-content-between":{"place-content":"space-between"},".place-content-around":{"place-content":"space-around"},".place-content-evenly":{"place-content":"space-evenly"},".place-content-baseline":{"place-content":"baseline"},".place-content-stretch":{"place-content":"stretch"}})},placeItems:({addUtilities:i})=>{i({".place-items-start":{"place-items":"start"},".place-items-end":{"place-items":"end"},".place-items-center":{"place-items":"center"},".place-items-baseline":{"place-items":"baseline"},".place-items-stretch":{"place-items":"stretch"}})},alignContent:({addUtilities:i})=>{i({".content-normal":{"align-content":"normal"},".content-center":{"align-content":"center"},".content-start":{"align-content":"flex-start"},".content-end":{"align-content":"flex-end"},".content-between":{"align-content":"space-between"},".content-around":{"align-content":"space-around"},".content-evenly":{"align-content":"space-evenly"},".content-baseline":{"align-content":"baseline"},".content-stretch":{"align-content":"stretch"}})},alignItems:({addUtilities:i})=>{i({".items-start":{"align-items":"flex-start"},".items-end":{"align-items":"flex-end"},".items-center":{"align-items":"center"},".items-baseline":{"align-items":"baseline"},".items-stretch":{"align-items":"stretch"}})},justifyContent:({addUtilities:i})=>{i({".justify-normal":{"justify-content":"normal"},".justify-start":{"justify-content":"flex-start"},".justify-end":{"justify-content":"flex-end"},".justify-center":{"justify-content":"center"},".justify-between":{"justify-content":"space-between"},".justify-around":{"justify-content":"space-around"},".justify-evenly":{"justify-content":"space-evenly"},".justify-stretch":{"justify-content":"stretch"}})},justifyItems:({addUtilities:i})=>{i({".justify-items-start":{"justify-items":"start"},".justify-items-end":{"justify-items":"end"},".justify-items-center":{"justify-items":"center"},".justify-items-stretch":{"justify-items":"stretch"}})},gap:P("gap",[["gap",["gap"]],[["gap-x",["columnGap"]],["gap-y",["rowGap"]]]]),space:({matchUtilities:i,addUtilities:e,theme:t})=>{i({"space-x":r=>(r=r==="0"?"0px":r,{"& > :not([hidden]) ~ :not([hidden])":{"--tw-space-x-reverse":"0","margin-right":`calc(${r} * var(--tw-space-x-reverse))`,"margin-left":`calc(${r} * calc(1 - var(--tw-space-x-reverse)))`}}),"space-y":r=>(r=r==="0"?"0px":r,{"& > :not([hidden]) ~ :not([hidden])":{"--tw-space-y-reverse":"0","margin-top":`calc(${r} * calc(1 - var(--tw-space-y-reverse)))`,"margin-bottom":`calc(${r} * var(--tw-space-y-reverse))`}})},{values:t("space"),supportsNegativeValues:!0}),e({".space-y-reverse > :not([hidden]) ~ :not([hidden])":{"--tw-space-y-reverse":"1"},".space-x-reverse > :not([hidden]) ~ :not([hidden])":{"--tw-space-x-reverse":"1"}})},divideWidth:({matchUtilities:i,addUtilities:e,theme:t})=>{i({"divide-x":r=>(r=r==="0"?"0px":r,{"& > :not([hidden]) ~ :not([hidden])":{"@defaults border-width":{},"--tw-divide-x-reverse":"0","border-right-width":`calc(${r} * var(--tw-divide-x-reverse))`,"border-left-width":`calc(${r} * calc(1 - var(--tw-divide-x-reverse)))`}}),"divide-y":r=>(r=r==="0"?"0px":r,{"& > :not([hidden]) ~ :not([hidden])":{"@defaults border-width":{},"--tw-divide-y-reverse":"0","border-top-width":`calc(${r} * calc(1 - var(--tw-divide-y-reverse)))`,"border-bottom-width":`calc(${r} * var(--tw-divide-y-reverse))`}})},{values:t("divideWidth"),type:["line-width","length","any"]}),e({".divide-y-reverse > :not([hidden]) ~ :not([hidden])":{"@defaults border-width":{},"--tw-divide-y-reverse":"1"},".divide-x-reverse > :not([hidden]) ~ :not([hidden])":{"@defaults border-width":{},"--tw-divide-x-reverse":"1"}})},divideStyle:({addUtilities:i})=>{i({".divide-solid > :not([hidden]) ~ :not([hidden])":{"border-style":"solid"},".divide-dashed > :not([hidden]) ~ :not([hidden])":{"border-style":"dashed"},".divide-dotted > :not([hidden]) ~ :not([hidden])":{"border-style":"dotted"},".divide-double > :not([hidden]) ~ :not([hidden])":{"border-style":"double"},".divide-none > :not([hidden]) ~ :not([hidden])":{"border-style":"none"}})},divideColor:({matchUtilities:i,theme:e,corePlugins:t})=>{i({divide:r=>t("divideOpacity")?{["& > :not([hidden]) ~ :not([hidden])"]:ae({color:r,property:"border-color",variable:"--tw-divide-opacity"})}:{["& > :not([hidden]) ~ :not([hidden])"]:{"border-color":L(r)}}},{values:(({DEFAULT:r,...n})=>n)(ie(e("divideColor"))),type:["color","any"]})},divideOpacity:({matchUtilities:i,theme:e})=>{i({"divide-opacity":t=>({["& > :not([hidden]) ~ :not([hidden])"]:{"--tw-divide-opacity":t}})},{values:e("divideOpacity")})},placeSelf:({addUtilities:i})=>{i({".place-self-auto":{"place-self":"auto"},".place-self-start":{"place-self":"start"},".place-self-end":{"place-self":"end"},".place-self-center":{"place-self":"center"},".place-self-stretch":{"place-self":"stretch"}})},alignSelf:({addUtilities:i})=>{i({".self-auto":{"align-self":"auto"},".self-start":{"align-self":"flex-start"},".self-end":{"align-self":"flex-end"},".self-center":{"align-self":"center"},".self-stretch":{"align-self":"stretch"},".self-baseline":{"align-self":"baseline"}})},justifySelf:({addUtilities:i})=>{i({".justify-self-auto":{"justify-self":"auto"},".justify-self-start":{"justify-self":"start"},".justify-self-end":{"justify-self":"end"},".justify-self-center":{"justify-self":"center"},".justify-self-stretch":{"justify-self":"stretch"}})},overflow:({addUtilities:i})=>{i({".overflow-auto":{overflow:"auto"},".overflow-hidden":{overflow:"hidden"},".overflow-clip":{overflow:"clip"},".overflow-visible":{overflow:"visible"},".overflow-scroll":{overflow:"scroll"},".overflow-x-auto":{"overflow-x":"auto"},".overflow-y-auto":{"overflow-y":"auto"},".overflow-x-hidden":{"overflow-x":"hidden"},".overflow-y-hidden":{"overflow-y":"hidden"},".overflow-x-clip":{"overflow-x":"clip"},".overflow-y-clip":{"overflow-y":"clip"},".overflow-x-visible":{"overflow-x":"visible"},".overflow-y-visible":{"overflow-y":"visible"},".overflow-x-scroll":{"overflow-x":"scroll"},".overflow-y-scroll":{"overflow-y":"scroll"}})},overscrollBehavior:({addUtilities:i})=>{i({".overscroll-auto":{"overscroll-behavior":"auto"},".overscroll-contain":{"overscroll-behavior":"contain"},".overscroll-none":{"overscroll-behavior":"none"},".overscroll-y-auto":{"overscroll-behavior-y":"auto"},".overscroll-y-contain":{"overscroll-behavior-y":"contain"},".overscroll-y-none":{"overscroll-behavior-y":"none"},".overscroll-x-auto":{"overscroll-behavior-x":"auto"},".overscroll-x-contain":{"overscroll-behavior-x":"contain"},".overscroll-x-none":{"overscroll-behavior-x":"none"}})},scrollBehavior:({addUtilities:i})=>{i({".scroll-auto":{"scroll-behavior":"auto"},".scroll-smooth":{"scroll-behavior":"smooth"}})},textOverflow:({addUtilities:i})=>{i({".truncate":{overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap"},".overflow-ellipsis":{"text-overflow":"ellipsis"},".text-ellipsis":{"text-overflow":"ellipsis"},".text-clip":{"text-overflow":"clip"}})},hyphens:({addUtilities:i})=>{i({".hyphens-none":{hyphens:"none"},".hyphens-manual":{hyphens:"manual"},".hyphens-auto":{hyphens:"auto"}})},whitespace:({addUtilities:i})=>{i({".whitespace-normal":{"white-space":"normal"},".whitespace-nowrap":{"white-space":"nowrap"},".whitespace-pre":{"white-space":"pre"},".whitespace-pre-line":{"white-space":"pre-line"},".whitespace-pre-wrap":{"white-space":"pre-wrap"},".whitespace-break-spaces":{"white-space":"break-spaces"}})},textWrap:({addUtilities:i})=>{i({".text-wrap":{"text-wrap":"wrap"},".text-nowrap":{"text-wrap":"nowrap"},".text-balance":{"text-wrap":"balance"},".text-pretty":{"text-wrap":"pretty"}})},wordBreak:({addUtilities:i})=>{i({".break-normal":{"overflow-wrap":"normal","word-break":"normal"},".break-words":{"overflow-wrap":"break-word"},".break-all":{"word-break":"break-all"},".break-keep":{"word-break":"keep-all"}})},borderRadius:P("borderRadius",[["rounded",["border-radius"]],[["rounded-s",["border-start-start-radius","border-end-start-radius"]],["rounded-e",["border-start-end-radius","border-end-end-radius"]],["rounded-t",["border-top-left-radius","border-top-right-radius"]],["rounded-r",["border-top-right-radius","border-bottom-right-radius"]],["rounded-b",["border-bottom-right-radius","border-bottom-left-radius"]],["rounded-l",["border-top-left-radius","border-bottom-left-radius"]]],[["rounded-ss",["border-start-start-radius"]],["rounded-se",["border-start-end-radius"]],["rounded-ee",["border-end-end-radius"]],["rounded-es",["border-end-start-radius"]],["rounded-tl",["border-top-left-radius"]],["rounded-tr",["border-top-right-radius"]],["rounded-br",["border-bottom-right-radius"]],["rounded-bl",["border-bottom-left-radius"]]]]),borderWidth:P("borderWidth",[["border",[["@defaults border-width",{}],"border-width"]],[["border-x",[["@defaults border-width",{}],"border-left-width","border-right-width"]],["border-y",[["@defaults border-width",{}],"border-top-width","border-bottom-width"]]],[["border-s",[["@defaults border-width",{}],"border-inline-start-width"]],["border-e",[["@defaults border-width",{}],"border-inline-end-width"]],["border-t",[["@defaults border-width",{}],"border-top-width"]],["border-r",[["@defaults border-width",{}],"border-right-width"]],["border-b",[["@defaults border-width",{}],"border-bottom-width"]],["border-l",[["@defaults border-width",{}],"border-left-width"]]]],{type:["line-width","length"]}),borderStyle:({addUtilities:i})=>{i({".border-solid":{"border-style":"solid"},".border-dashed":{"border-style":"dashed"},".border-dotted":{"border-style":"dotted"},".border-double":{"border-style":"double"},".border-hidden":{"border-style":"hidden"},".border-none":{"border-style":"none"}})},borderColor:({matchUtilities:i,theme:e,corePlugins:t})=>{i({border:r=>t("borderOpacity")?ae({color:r,property:"border-color",variable:"--tw-border-opacity"}):{"border-color":L(r)}},{values:(({DEFAULT:r,...n})=>n)(ie(e("borderColor"))),type:["color","any"]}),i({"border-x":r=>t("borderOpacity")?ae({color:r,property:["border-left-color","border-right-color"],variable:"--tw-border-opacity"}):{"border-left-color":L(r),"border-right-color":L(r)},"border-y":r=>t("borderOpacity")?ae({color:r,property:["border-top-color","border-bottom-color"],variable:"--tw-border-opacity"}):{"border-top-color":L(r),"border-bottom-color":L(r)}},{values:(({DEFAULT:r,...n})=>n)(ie(e("borderColor"))),type:["color","any"]}),i({"border-s":r=>t("borderOpacity")?ae({color:r,property:"border-inline-start-color",variable:"--tw-border-opacity"}):{"border-inline-start-color":L(r)},"border-e":r=>t("borderOpacity")?ae({color:r,property:"border-inline-end-color",variable:"--tw-border-opacity"}):{"border-inline-end-color":L(r)},"border-t":r=>t("borderOpacity")?ae({color:r,property:"border-top-color",variable:"--tw-border-opacity"}):{"border-top-color":L(r)},"border-r":r=>t("borderOpacity")?ae({color:r,property:"border-right-color",variable:"--tw-border-opacity"}):{"border-right-color":L(r)},"border-b":r=>t("borderOpacity")?ae({color:r,property:"border-bottom-color",variable:"--tw-border-opacity"}):{"border-bottom-color":L(r)},"border-l":r=>t("borderOpacity")?ae({color:r,property:"border-left-color",variable:"--tw-border-opacity"}):{"border-left-color":L(r)}},{values:(({DEFAULT:r,...n})=>n)(ie(e("borderColor"))),type:["color","any"]})},borderOpacity:P("borderOpacity",[["border-opacity",["--tw-border-opacity"]]]),backgroundColor:({matchUtilities:i,theme:e,corePlugins:t})=>{i({bg:r=>t("backgroundOpacity")?ae({color:r,property:"background-color",variable:"--tw-bg-opacity"}):{"background-color":L(r)}},{values:ie(e("backgroundColor")),type:["color","any"]})},backgroundOpacity:P("backgroundOpacity",[["bg-opacity",["--tw-bg-opacity"]]]),backgroundImage:P("backgroundImage",[["bg",["background-image"]]],{type:["lookup","image","url"]}),gradientColorStops:(()=>{function i(e){return De(e,0,"rgb(255 255 255 / 0)")}return function({matchUtilities:e,theme:t,addDefaults:r}){r("gradient-color-stops",{"--tw-gradient-from-position":" ","--tw-gradient-via-position":" ","--tw-gradient-to-position":" "});let n={values:ie(t("gradientColorStops")),type:["color","any"]},a={values:t("gradientColorStopPositions"),type:["length","percentage"]};e({from:s=>{let o=i(s);return{"@defaults gradient-color-stops":{},"--tw-gradient-from":`${L(s)} var(--tw-gradient-from-position)`,"--tw-gradient-to":`${o} var(--tw-gradient-to-position)`,"--tw-gradient-stops":"var(--tw-gradient-from), var(--tw-gradient-to)"}}},n),e({from:s=>({"--tw-gradient-from-position":s})},a),e({via:s=>{let o=i(s);return{"@defaults gradient-color-stops":{},"--tw-gradient-to":`${o}  var(--tw-gradient-to-position)`,"--tw-gradient-stops":`var(--tw-gradient-from), ${L(s)} var(--tw-gradient-via-position), var(--tw-gradient-to)`}}},n),e({via:s=>({"--tw-gradient-via-position":s})},a),e({to:s=>({"@defaults gradient-color-stops":{},"--tw-gradient-to":`${L(s)} var(--tw-gradient-to-position)`})},n),e({to:s=>({"--tw-gradient-to-position":s})},a)}})(),boxDecorationBreak:({addUtilities:i})=>{i({".decoration-slice":{"box-decoration-break":"slice"},".decoration-clone":{"box-decoration-break":"clone"},".box-decoration-slice":{"box-decoration-break":"slice"},".box-decoration-clone":{"box-decoration-break":"clone"}})},backgroundSize:P("backgroundSize",[["bg",["background-size"]]],{type:["lookup","length","percentage","size"]}),backgroundAttachment:({addUtilities:i})=>{i({".bg-fixed":{"background-attachment":"fixed"},".bg-local":{"background-attachment":"local"},".bg-scroll":{"background-attachment":"scroll"}})},backgroundClip:({addUtilities:i})=>{i({".bg-clip-border":{"background-clip":"border-box"},".bg-clip-padding":{"background-clip":"padding-box"},".bg-clip-content":{"background-clip":"content-box"},".bg-clip-text":{"background-clip":"text"}})},backgroundPosition:P("backgroundPosition",[["bg",["background-position"]]],{type:["lookup",["position",{preferOnConflict:!0}]]}),backgroundRepeat:({addUtilities:i})=>{i({".bg-repeat":{"background-repeat":"repeat"},".bg-no-repeat":{"background-repeat":"no-repeat"},".bg-repeat-x":{"background-repeat":"repeat-x"},".bg-repeat-y":{"background-repeat":"repeat-y"},".bg-repeat-round":{"background-repeat":"round"},".bg-repeat-space":{"background-repeat":"space"}})},backgroundOrigin:({addUtilities:i})=>{i({".bg-origin-border":{"background-origin":"border-box"},".bg-origin-padding":{"background-origin":"padding-box"},".bg-origin-content":{"background-origin":"content-box"}})},fill:({matchUtilities:i,theme:e})=>{i({fill:t=>({fill:L(t)})},{values:ie(e("fill")),type:["color","any"]})},stroke:({matchUtilities:i,theme:e})=>{i({stroke:t=>({stroke:L(t)})},{values:ie(e("stroke")),type:["color","url","any"]})},strokeWidth:P("strokeWidth",[["stroke",["stroke-width"]]],{type:["length","number","percentage"]}),objectFit:({addUtilities:i})=>{i({".object-contain":{"object-fit":"contain"},".object-cover":{"object-fit":"cover"},".object-fill":{"object-fit":"fill"},".object-none":{"object-fit":"none"},".object-scale-down":{"object-fit":"scale-down"}})},objectPosition:P("objectPosition",[["object",["object-position"]]]),padding:P("padding",[["p",["padding"]],[["px",["padding-left","padding-right"]],["py",["padding-top","padding-bottom"]]],[["ps",["padding-inline-start"]],["pe",["padding-inline-end"]],["pt",["padding-top"]],["pr",["padding-right"]],["pb",["padding-bottom"]],["pl",["padding-left"]]]]),textAlign:({addUtilities:i})=>{i({".text-left":{"text-align":"left"},".text-center":{"text-align":"center"},".text-right":{"text-align":"right"},".text-justify":{"text-align":"justify"},".text-start":{"text-align":"start"},".text-end":{"text-align":"end"}})},textIndent:P("textIndent",[["indent",["text-indent"]]],{supportsNegativeValues:!0}),verticalAlign:({addUtilities:i,matchUtilities:e})=>{i({".align-baseline":{"vertical-align":"baseline"},".align-top":{"vertical-align":"top"},".align-middle":{"vertical-align":"middle"},".align-bottom":{"vertical-align":"bottom"},".align-text-top":{"vertical-align":"text-top"},".align-text-bottom":{"vertical-align":"text-bottom"},".align-sub":{"vertical-align":"sub"},".align-super":{"vertical-align":"super"}}),e({align:t=>({"vertical-align":t})})},fontFamily:({matchUtilities:i,theme:e})=>{i({font:t=>{let[r,n={}]=Array.isArray(t)&&ne(t[1])?t:[t],{fontFeatureSettings:a,fontVariationSettings:s}=n;return{"font-family":Array.isArray(r)?r.join(", "):r,...a===void 0?{}:{"font-feature-settings":a},...s===void 0?{}:{"font-variation-settings":s}}}},{values:e("fontFamily"),type:["lookup","generic-name","family-name"]})},fontSize:({matchUtilities:i,theme:e})=>{i({text:(t,{modifier:r})=>{let[n,a]=Array.isArray(t)?t:[t];if(r)return{"font-size":n,"line-height":r};let{lineHeight:s,letterSpacing:o,fontWeight:u}=ne(a)?a:{lineHeight:a};return{"font-size":n,...s===void 0?{}:{"line-height":s},...o===void 0?{}:{"letter-spacing":o},...u===void 0?{}:{"font-weight":u}}}},{values:e("fontSize"),modifiers:e("lineHeight"),type:["absolute-size","relative-size","length","percentage"]})},fontWeight:P("fontWeight",[["font",["fontWeight"]]],{type:["lookup","number","any"]}),textTransform:({addUtilities:i})=>{i({".uppercase":{"text-transform":"uppercase"},".lowercase":{"text-transform":"lowercase"},".capitalize":{"text-transform":"capitalize"},".normal-case":{"text-transform":"none"}})},fontStyle:({addUtilities:i})=>{i({".italic":{"font-style":"italic"},".not-italic":{"font-style":"normal"}})},fontVariantNumeric:({addDefaults:i,addUtilities:e})=>{let t="var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction)";i("font-variant-numeric",{"--tw-ordinal":" ","--tw-slashed-zero":" ","--tw-numeric-figure":" ","--tw-numeric-spacing":" ","--tw-numeric-fraction":" "}),e({".normal-nums":{"font-variant-numeric":"normal"},".ordinal":{"@defaults font-variant-numeric":{},"--tw-ordinal":"ordinal","font-variant-numeric":t},".slashed-zero":{"@defaults font-variant-numeric":{},"--tw-slashed-zero":"slashed-zero","font-variant-numeric":t},".lining-nums":{"@defaults font-variant-numeric":{},"--tw-numeric-figure":"lining-nums","font-variant-numeric":t},".oldstyle-nums":{"@defaults font-variant-numeric":{},"--tw-numeric-figure":"oldstyle-nums","font-variant-numeric":t},".proportional-nums":{"@defaults font-variant-numeric":{},"--tw-numeric-spacing":"proportional-nums","font-variant-numeric":t},".tabular-nums":{"@defaults font-variant-numeric":{},"--tw-numeric-spacing":"tabular-nums","font-variant-numeric":t},".diagonal-fractions":{"@defaults font-variant-numeric":{},"--tw-numeric-fraction":"diagonal-fractions","font-variant-numeric":t},".stacked-fractions":{"@defaults font-variant-numeric":{},"--tw-numeric-fraction":"stacked-fractions","font-variant-numeric":t}})},lineHeight:P("lineHeight",[["leading",["lineHeight"]]]),letterSpacing:P("letterSpacing",[["tracking",["letterSpacing"]]],{supportsNegativeValues:!0}),textColor:({matchUtilities:i,theme:e,corePlugins:t})=>{i({text:r=>t("textOpacity")?ae({color:r,property:"color",variable:"--tw-text-opacity"}):{color:L(r)}},{values:ie(e("textColor")),type:["color","any"]})},textOpacity:P("textOpacity",[["text-opacity",["--tw-text-opacity"]]]),textDecoration:({addUtilities:i})=>{i({".underline":{"text-decoration-line":"underline"},".overline":{"text-decoration-line":"overline"},".line-through":{"text-decoration-line":"line-through"},".no-underline":{"text-decoration-line":"none"}})},textDecorationColor:({matchUtilities:i,theme:e})=>{i({decoration:t=>({"text-decoration-color":L(t)})},{values:ie(e("textDecorationColor")),type:["color","any"]})},textDecorationStyle:({addUtilities:i})=>{i({".decoration-solid":{"text-decoration-style":"solid"},".decoration-double":{"text-decoration-style":"double"},".decoration-dotted":{"text-decoration-style":"dotted"},".decoration-dashed":{"text-decoration-style":"dashed"},".decoration-wavy":{"text-decoration-style":"wavy"}})},textDecorationThickness:P("textDecorationThickness",[["decoration",["text-decoration-thickness"]]],{type:["length","percentage"]}),textUnderlineOffset:P("textUnderlineOffset",[["underline-offset",["text-underline-offset"]]],{type:["length","percentage","any"]}),fontSmoothing:({addUtilities:i})=>{i({".antialiased":{"-webkit-font-smoothing":"antialiased","-moz-osx-font-smoothing":"grayscale"},".subpixel-antialiased":{"-webkit-font-smoothing":"auto","-moz-osx-font-smoothing":"auto"}})},placeholderColor:({matchUtilities:i,theme:e,corePlugins:t})=>{i({placeholder:r=>t("placeholderOpacity")?{"&::placeholder":ae({color:r,property:"color",variable:"--tw-placeholder-opacity"})}:{"&::placeholder":{color:L(r)}}},{values:ie(e("placeholderColor")),type:["color","any"]})},placeholderOpacity:({matchUtilities:i,theme:e})=>{i({"placeholder-opacity":t=>({["&::placeholder"]:{"--tw-placeholder-opacity":t}})},{values:e("placeholderOpacity")})},caretColor:({matchUtilities:i,theme:e})=>{i({caret:t=>({"caret-color":L(t)})},{values:ie(e("caretColor")),type:["color","any"]})},accentColor:({matchUtilities:i,theme:e})=>{i({accent:t=>({"accent-color":L(t)})},{values:ie(e("accentColor")),type:["color","any"]})},opacity:P("opacity",[["opacity",["opacity"]]]),backgroundBlendMode:({addUtilities:i})=>{i({".bg-blend-normal":{"background-blend-mode":"normal"},".bg-blend-multiply":{"background-blend-mode":"multiply"},".bg-blend-screen":{"background-blend-mode":"screen"},".bg-blend-overlay":{"background-blend-mode":"overlay"},".bg-blend-darken":{"background-blend-mode":"darken"},".bg-blend-lighten":{"background-blend-mode":"lighten"},".bg-blend-color-dodge":{"background-blend-mode":"color-dodge"},".bg-blend-color-burn":{"background-blend-mode":"color-burn"},".bg-blend-hard-light":{"background-blend-mode":"hard-light"},".bg-blend-soft-light":{"background-blend-mode":"soft-light"},".bg-blend-difference":{"background-blend-mode":"difference"},".bg-blend-exclusion":{"background-blend-mode":"exclusion"},".bg-blend-hue":{"background-blend-mode":"hue"},".bg-blend-saturation":{"background-blend-mode":"saturation"},".bg-blend-color":{"background-blend-mode":"color"},".bg-blend-luminosity":{"background-blend-mode":"luminosity"}})},mixBlendMode:({addUtilities:i})=>{i({".mix-blend-normal":{"mix-blend-mode":"normal"},".mix-blend-multiply":{"mix-blend-mode":"multiply"},".mix-blend-screen":{"mix-blend-mode":"screen"},".mix-blend-overlay":{"mix-blend-mode":"overlay"},".mix-blend-darken":{"mix-blend-mode":"darken"},".mix-blend-lighten":{"mix-blend-mode":"lighten"},".mix-blend-color-dodge":{"mix-blend-mode":"color-dodge"},".mix-blend-color-burn":{"mix-blend-mode":"color-burn"},".mix-blend-hard-light":{"mix-blend-mode":"hard-light"},".mix-blend-soft-light":{"mix-blend-mode":"soft-light"},".mix-blend-difference":{"mix-blend-mode":"difference"},".mix-blend-exclusion":{"mix-blend-mode":"exclusion"},".mix-blend-hue":{"mix-blend-mode":"hue"},".mix-blend-saturation":{"mix-blend-mode":"saturation"},".mix-blend-color":{"mix-blend-mode":"color"},".mix-blend-luminosity":{"mix-blend-mode":"luminosity"},".mix-blend-plus-lighter":{"mix-blend-mode":"plus-lighter"}})},boxShadow:(()=>{let i=Ge("boxShadow"),e=["var(--tw-ring-offset-shadow, 0 0 #0000)","var(--tw-ring-shadow, 0 0 #0000)","var(--tw-shadow)"].join(", ");return function({matchUtilities:t,addDefaults:r,theme:n}){r(" box-shadow",{"--tw-ring-offset-shadow":"0 0 #0000","--tw-ring-shadow":"0 0 #0000","--tw-shadow":"0 0 #0000","--tw-shadow-colored":"0 0 #0000"}),t({shadow:a=>{a=i(a);let s=yi(a);for(let o of s)!o.valid||(o.color="var(--tw-shadow-color)");return{"@defaults box-shadow":{},"--tw-shadow":a==="none"?"0 0 #0000":a,"--tw-shadow-colored":a==="none"?"0 0 #0000":Iu(s),"box-shadow":e}}},{values:n("boxShadow"),type:["shadow"]})}})(),boxShadowColor:({matchUtilities:i,theme:e})=>{i({shadow:t=>({"--tw-shadow-color":L(t),"--tw-shadow":"var(--tw-shadow-colored)"})},{values:ie(e("boxShadowColor")),type:["color","any"]})},outlineStyle:({addUtilities:i})=>{i({".outline-none":{outline:"2px solid transparent","outline-offset":"2px"},".outline":{"outline-style":"solid"},".outline-dashed":{"outline-style":"dashed"},".outline-dotted":{"outline-style":"dotted"},".outline-double":{"outline-style":"double"}})},outlineWidth:P("outlineWidth",[["outline",["outline-width"]]],{type:["length","number","percentage"]}),outlineOffset:P("outlineOffset",[["outline-offset",["outline-offset"]]],{type:["length","number","percentage","any"],supportsNegativeValues:!0}),outlineColor:({matchUtilities:i,theme:e})=>{i({outline:t=>({"outline-color":L(t)})},{values:ie(e("outlineColor")),type:["color","any"]})},ringWidth:({matchUtilities:i,addDefaults:e,addUtilities:t,theme:r,config:n})=>{let a=(()=>{if(Z(n(),"respectDefaultRingColorOpacity"))return r("ringColor.DEFAULT");let s=r("ringOpacity.DEFAULT","0.5");return r("ringColor")?.DEFAULT?De(r("ringColor")?.DEFAULT,s,`rgb(147 197 253 / ${s})`):`rgb(147 197 253 / ${s})`})();e("ring-width",{"--tw-ring-inset":" ","--tw-ring-offset-width":r("ringOffsetWidth.DEFAULT","0px"),"--tw-ring-offset-color":r("ringOffsetColor.DEFAULT","#fff"),"--tw-ring-color":a,"--tw-ring-offset-shadow":"0 0 #0000","--tw-ring-shadow":"0 0 #0000","--tw-shadow":"0 0 #0000","--tw-shadow-colored":"0 0 #0000"}),i({ring:s=>({"@defaults ring-width":{},"--tw-ring-offset-shadow":"var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)","--tw-ring-shadow":`var(--tw-ring-inset) 0 0 0 calc(${s} + var(--tw-ring-offset-width)) var(--tw-ring-color)`,"box-shadow":["var(--tw-ring-offset-shadow)","var(--tw-ring-shadow)","var(--tw-shadow, 0 0 #0000)"].join(", ")})},{values:r("ringWidth"),type:"length"}),t({".ring-inset":{"@defaults ring-width":{},"--tw-ring-inset":"inset"}})},ringColor:({matchUtilities:i,theme:e,corePlugins:t})=>{i({ring:r=>t("ringOpacity")?ae({color:r,property:"--tw-ring-color",variable:"--tw-ring-opacity"}):{"--tw-ring-color":L(r)}},{values:Object.fromEntries(Object.entries(ie(e("ringColor"))).filter(([r])=>r!=="DEFAULT")),type:["color","any"]})},ringOpacity:i=>{let{config:e}=i;return P("ringOpacity",[["ring-opacity",["--tw-ring-opacity"]]],{filterDefault:!Z(e(),"respectDefaultRingColorOpacity")})(i)},ringOffsetWidth:P("ringOffsetWidth",[["ring-offset",["--tw-ring-offset-width"]]],{type:"length"}),ringOffsetColor:({matchUtilities:i,theme:e})=>{i({"ring-offset":t=>({"--tw-ring-offset-color":L(t)})},{values:ie(e("ringOffsetColor")),type:["color","any"]})},blur:({matchUtilities:i,theme:e})=>{i({blur:t=>({"--tw-blur":`blur(${t})`,"@defaults filter":{},filter:Me})},{values:e("blur")})},brightness:({matchUtilities:i,theme:e})=>{i({brightness:t=>({"--tw-brightness":`brightness(${t})`,"@defaults filter":{},filter:Me})},{values:e("brightness")})},contrast:({matchUtilities:i,theme:e})=>{i({contrast:t=>({"--tw-contrast":`contrast(${t})`,"@defaults filter":{},filter:Me})},{values:e("contrast")})},dropShadow:({matchUtilities:i,theme:e})=>{i({"drop-shadow":t=>({"--tw-drop-shadow":Array.isArray(t)?t.map(r=>`drop-shadow(${r})`).join(" "):`drop-shadow(${t})`,"@defaults filter":{},filter:Me})},{values:e("dropShadow")})},grayscale:({matchUtilities:i,theme:e})=>{i({grayscale:t=>({"--tw-grayscale":`grayscale(${t})`,"@defaults filter":{},filter:Me})},{values:e("grayscale")})},hueRotate:({matchUtilities:i,theme:e})=>{i({"hue-rotate":t=>({"--tw-hue-rotate":`hue-rotate(${t})`,"@defaults filter":{},filter:Me})},{values:e("hueRotate"),supportsNegativeValues:!0})},invert:({matchUtilities:i,theme:e})=>{i({invert:t=>({"--tw-invert":`invert(${t})`,"@defaults filter":{},filter:Me})},{values:e("invert")})},saturate:({matchUtilities:i,theme:e})=>{i({saturate:t=>({"--tw-saturate":`saturate(${t})`,"@defaults filter":{},filter:Me})},{values:e("saturate")})},sepia:({matchUtilities:i,theme:e})=>{i({sepia:t=>({"--tw-sepia":`sepia(${t})`,"@defaults filter":{},filter:Me})},{values:e("sepia")})},filter:({addDefaults:i,addUtilities:e})=>{i("filter",{"--tw-blur":" ","--tw-brightness":" ","--tw-contrast":" ","--tw-grayscale":" ","--tw-hue-rotate":" ","--tw-invert":" ","--tw-saturate":" ","--tw-sepia":" ","--tw-drop-shadow":" "}),e({".filter":{"@defaults filter":{},filter:Me},".filter-none":{filter:"none"}})},backdropBlur:({matchUtilities:i,theme:e})=>{i({"backdrop-blur":t=>({"--tw-backdrop-blur":`blur(${t})`,"@defaults backdrop-filter":{},"backdrop-filter":Be})},{values:e("backdropBlur")})},backdropBrightness:({matchUtilities:i,theme:e})=>{i({"backdrop-brightness":t=>({"--tw-backdrop-brightness":`brightness(${t})`,"@defaults backdrop-filter":{},"backdrop-filter":Be})},{values:e("backdropBrightness")})},backdropContrast:({matchUtilities:i,theme:e})=>{i({"backdrop-contrast":t=>({"--tw-backdrop-contrast":`contrast(${t})`,"@defaults backdrop-filter":{},"backdrop-filter":Be})},{values:e("backdropContrast")})},backdropGrayscale:({matchUtilities:i,theme:e})=>{i({"backdrop-grayscale":t=>({"--tw-backdrop-grayscale":`grayscale(${t})`,"@defaults backdrop-filter":{},"backdrop-filter":Be})},{values:e("backdropGrayscale")})},backdropHueRotate:({matchUtilities:i,theme:e})=>{i({"backdrop-hue-rotate":t=>({"--tw-backdrop-hue-rotate":`hue-rotate(${t})`,"@defaults backdrop-filter":{},"backdrop-filter":Be})},{values:e("backdropHueRotate"),supportsNegativeValues:!0})},backdropInvert:({matchUtilities:i,theme:e})=>{i({"backdrop-invert":t=>({"--tw-backdrop-invert":`invert(${t})`,"@defaults backdrop-filter":{},"backdrop-filter":Be})},{values:e("backdropInvert")})},backdropOpacity:({matchUtilities:i,theme:e})=>{i({"backdrop-opacity":t=>({"--tw-backdrop-opacity":`opacity(${t})`,"@defaults backdrop-filter":{},"backdrop-filter":Be})},{values:e("backdropOpacity")})},backdropSaturate:({matchUtilities:i,theme:e})=>{i({"backdrop-saturate":t=>({"--tw-backdrop-saturate":`saturate(${t})`,"@defaults backdrop-filter":{},"backdrop-filter":Be})},{values:e("backdropSaturate")})},backdropSepia:({matchUtilities:i,theme:e})=>{i({"backdrop-sepia":t=>({"--tw-backdrop-sepia":`sepia(${t})`,"@defaults backdrop-filter":{},"backdrop-filter":Be})},{values:e("backdropSepia")})},backdropFilter:({addDefaults:i,addUtilities:e})=>{i("backdrop-filter",{"--tw-backdrop-blur":" ","--tw-backdrop-brightness":" ","--tw-backdrop-contrast":" ","--tw-backdrop-grayscale":" ","--tw-backdrop-hue-rotate":" ","--tw-backdrop-invert":" ","--tw-backdrop-opacity":" ","--tw-backdrop-saturate":" ","--tw-backdrop-sepia":" "}),e({".backdrop-filter":{"@defaults backdrop-filter":{},"backdrop-filter":Be},".backdrop-filter-none":{"backdrop-filter":"none"}})},transitionProperty:({matchUtilities:i,theme:e})=>{let t=e("transitionTimingFunction.DEFAULT"),r=e("transitionDuration.DEFAULT");i({transition:n=>({"transition-property":n,...n==="none"?{}:{"transition-timing-function":t,"transition-duration":r}})},{values:e("transitionProperty")})},transitionDelay:P("transitionDelay",[["delay",["transitionDelay"]]]),transitionDuration:P("transitionDuration",[["duration",["transitionDuration"]]],{filterDefault:!0}),transitionTimingFunction:P("transitionTimingFunction",[["ease",["transitionTimingFunction"]]],{filterDefault:!0}),willChange:P("willChange",[["will-change",["will-change"]]]),content:P("content",[["content",["--tw-content",["content","var(--tw-content)"]]]]),forcedColorAdjust:({addUtilities:i})=>{i({".forced-color-adjust-auto":{"forced-color-adjust":"auto"},".forced-color-adjust-none":{"forced-color-adjust":"none"}})}}});function yC(i){if(i===void 0)return!1;if(i==="true"||i==="1")return!0;if(i==="false"||i==="0")return!1;if(i==="*")return!0;let e=i.split(",").map(t=>t.split(":")[0]);return e.includes("-tailwindcss")?!1:!!e.includes("tailwindcss")}var Pe,yd,wd,gn,Qa,He,Kr,ot=C(()=>{l();Ga();Pe=typeof h!="undefined"?{NODE_ENV:"production",DEBUG:yC(h.env.DEBUG),ENGINE:Ya.tailwindcss.engine}:{NODE_ENV:"production",DEBUG:!1,ENGINE:Ya.tailwindcss.engine},yd=new Map,wd=new Map,gn=new Map,Qa=new Map,He=new String("*"),Kr=Symbol("__NONE__")});function Nt(i){let e=[],t=!1;for(let r=0;r<i.length;r++){let n=i[r];if(n===":"&&!t&&e.length===0)return!1;if(wC.has(n)&&i[r-1]!=="\\\\"&&(t=!t),!t&&i[r-1]!=="\\\\"){if(bd.has(n))e.push(n);else if(vd.has(n)){let a=vd.get(n);if(e.length<=0||e.pop()!==a)return!1}}}return!(e.length>0)}var bd,vd,wC,Ja=C(()=>{l();bd=new Map([["{","}"],["[","]"],["(",")"]]),vd=new Map(Array.from(bd.entries()).map(([i,e])=>[e,i])),wC=new Set([\'"\',"\'","`"])});function Lt(i){let[e]=xd(i);return e.forEach(([t,r])=>t.removeChild(r)),i.nodes.push(...e.map(([,t])=>t)),i}function xd(i){let e=[],t=null;for(let r of i.nodes)if(r.type==="combinator")e=e.filter(([,n])=>Ka(n).includes("jumpable")),t=null;else if(r.type==="pseudo"){bC(r)?(t=r,e.push([i,r,null])):t&&vC(r,t)?e.push([i,r,t]):t=null;for(let n of r.nodes??[]){let[a,s]=xd(n);t=s||t,e.push(...a)}}return[e,t]}function kd(i){return i.value.startsWith("::")||Xa[i.value]!==void 0}function bC(i){return kd(i)&&Ka(i).includes("terminal")}function vC(i,e){return i.type!=="pseudo"||kd(i)?!1:Ka(e).includes("actionable")}function Ka(i){return Xa[i.value]??Xa.__default__}var Xa,yn=C(()=>{l();Xa={"::after":["terminal","jumpable"],"::backdrop":["terminal","jumpable"],"::before":["terminal","jumpable"],"::cue":["terminal"],"::cue-region":["terminal"],"::first-letter":["terminal","jumpable"],"::first-line":["terminal","jumpable"],"::grammar-error":["terminal"],"::marker":["terminal","jumpable"],"::part":["terminal","actionable"],"::placeholder":["terminal","jumpable"],"::selection":["terminal","jumpable"],"::slotted":["terminal"],"::spelling-error":["terminal"],"::target-text":["terminal"],"::file-selector-button":["terminal","actionable"],"::deep":["actionable"],"::v-deep":["actionable"],"::ng-deep":["actionable"],":after":["terminal","jumpable"],":before":["terminal","jumpable"],":first-letter":["terminal","jumpable"],":first-line":["terminal","jumpable"],":where":[],":is":[],":has":[],__default__:["terminal","actionable"]}});function $t(i,{context:e,candidate:t}){let r=e?.tailwindConfig.prefix??"",n=i.map(s=>{let o=(0,Fe.default)().astSync(s.format);return{...s,ast:s.respectPrefix?Bt(r,o):o}}),a=Fe.default.root({nodes:[Fe.default.selector({nodes:[Fe.default.className({value:de(t)})]})]});for(let{ast:s}of n)[a,s]=kC(a,s),s.walkNesting(o=>o.replaceWith(...a.nodes[0].nodes)),a=s;return a}function Cd(i){let e=[];for(;i.prev()&&i.prev().type!=="combinator";)i=i.prev();for(;i&&i.type!=="combinator";)e.push(i),i=i.next();return e}function xC(i){return i.sort((e,t)=>e.type==="tag"&&t.type==="class"?-1:e.type==="class"&&t.type==="tag"?1:e.type==="class"&&t.type==="pseudo"&&t.value.startsWith("::")?-1:e.type==="pseudo"&&e.value.startsWith("::")&&t.type==="class"?1:i.index(e)-i.index(t)),i}function eo(i,e){let t=!1;i.walk(r=>{if(r.type==="class"&&r.value===e)return t=!0,!1}),t||i.remove()}function wn(i,e,{context:t,candidate:r,base:n}){let a=t?.tailwindConfig?.separator??":";n=n??oe(r,a).pop();let s=(0,Fe.default)().astSync(i);if(s.walkClasses(f=>{f.raws&&f.value.includes(n)&&(f.raws.value=de((0,Sd.default)(f.raws.value)))}),s.each(f=>eo(f,n)),s.length===0)return null;let o=Array.isArray(e)?$t(e,{context:t,candidate:r}):e;if(o===null)return s.toString();let u=Fe.default.comment({value:"/*__simple__*/"}),c=Fe.default.comment({value:"/*__simple__*/"});return s.walkClasses(f=>{if(f.value!==n)return;let d=f.parent,p=o.nodes[0].nodes;if(d.nodes.length===1){f.replaceWith(...p);return}let m=Cd(f);d.insertBefore(m[0],u),d.insertAfter(m[m.length-1],c);for(let x of p)d.insertBefore(m[0],x.clone());f.remove(),m=Cd(u);let w=d.index(u);d.nodes.splice(w,m.length,...xC(Fe.default.selector({nodes:m})).nodes),u.remove(),c.remove()}),s.walkPseudos(f=>{f.value===Za&&f.replaceWith(f.nodes)}),s.each(f=>Lt(f)),s.toString()}function kC(i,e){let t=[];return i.walkPseudos(r=>{r.value===Za&&t.push({pseudo:r,value:r.nodes[0].toString()})}),e.walkPseudos(r=>{if(r.value!==Za)return;let n=r.nodes[0].toString(),a=t.find(c=>c.value===n);if(!a)return;let s=[],o=r.next();for(;o&&o.type!=="combinator";)s.push(o),o=o.next();let u=o;a.pseudo.parent.insertAfter(a.pseudo,Fe.default.selector({nodes:s.map(c=>c.clone())})),r.remove(),s.forEach(c=>c.remove()),u&&u.type==="combinator"&&u.remove()}),[i,e]}var Fe,Sd,Za,to=C(()=>{l();Fe=K(Re()),Sd=K(Yi());Ft();un();yn();St();Za=":merge"});function bn(i,e){let t=(0,ro.default)().astSync(i);return t.each(r=>{r.nodes[0].type==="pseudo"&&r.nodes[0].value===":is"&&r.nodes.every(a=>a.type!=="combinator")||(r.nodes=[ro.default.pseudo({value:":is",nodes:[r.clone()]})]),Lt(r)}),`${e} ${t.toString()}`}var ro,io=C(()=>{l();ro=K(Re());yn()});function no(i){return SC.transformSync(i)}function*CC(i){let e=1/0;for(;e>=0;){let t,r=!1;if(e===1/0&&i.endsWith("]")){let s=i.indexOf("[");i[s-1]==="-"?t=s-1:i[s-1]==="/"?(t=s-1,r=!0):t=-1}else e===1/0&&i.includes("/")?(t=i.lastIndexOf("/"),r=!0):t=i.lastIndexOf("-",e);if(t<0)break;let n=i.slice(0,t),a=i.slice(r?t:t+1);e=t-1,!(n===""||a==="/")&&(yield[n,a])}}function AC(i,e){if(i.length===0||e.tailwindConfig.prefix==="")return i;for(let t of i){let[r]=t;if(r.options.respectPrefix){let n=V.root({nodes:[t[1].clone()]}),a=t[1].raws.tailwind.classCandidate;n.walkRules(s=>{let o=a.startsWith("-");s.selector=Bt(e.tailwindConfig.prefix,s.selector,o)}),t[1]=n.nodes[0]}}return i}function _C(i,e){if(i.length===0)return i;let t=[];function r(n){return n.parent&&n.parent.type==="atrule"&&n.parent.name==="keyframes"}for(let[n,a]of i){let s=V.root({nodes:[a.clone()]});s.walkRules(o=>{if(r(o))return;let u=(0,vn.default)().astSync(o.selector);u.each(c=>eo(c,e)),Uu(u,c=>c===e?`!${c}`:c),o.selector=u.toString(),o.walkDecls(c=>c.important=!0)}),t.push([{...n,important:!0},s.nodes[0]])}return t}function OC(i,e,t){if(e.length===0)return e;let r={modifier:null,value:Kr};{let[n,...a]=oe(i,"/");if(a.length>1&&(n=n+"/"+a.slice(0,-1).join("/"),a=a.slice(-1)),a.length&&!t.variantMap.has(i)&&(i=n,r.modifier=a[0],!Z(t.tailwindConfig,"generalizedModifiers")))return[]}if(i.endsWith("]")&&!i.startsWith("[")){let n=/(.)(-?)\\[(.*)\\]/g.exec(i);if(n){let[,a,s,o]=n;if(a==="@"&&s==="-")return[];if(a!=="@"&&s==="")return[];i=i.replace(`${s}[${o}]`,""),r.value=o}}if(oo(i)&&!t.variantMap.has(i)){let n=t.offsets.recordVariant(i),a=N(i.slice(1,-1)),s=oe(a,",");if(s.length>1)return[];if(!s.every(Cn))return[];let o=s.map((u,c)=>[t.offsets.applyParallelOffset(n,c),Zr(u.trim())]);t.variantMap.set(i,o)}if(t.variantMap.has(i)){let n=oo(i),a=t.variantOptions.get(i)?.[Jr]??{},s=t.variantMap.get(i).slice(),o=[],u=(()=>!(n||a.respectPrefix===!1))();for(let[c,f]of e){if(c.layer==="user")continue;let d=V.root({nodes:[f.clone()]});for(let[p,m,w]of s){let b=function(){x.raws.neededBackup||(x.raws.neededBackup=!0,x.walkRules(O=>O.raws.originalSelector=O.selector))},k=function(O){return b(),x.each(I=>{I.type==="rule"&&(I.selectors=I.selectors.map(B=>O({get className(){return no(B)},selector:B})))}),x},x=(w??d).clone(),y=[],S=m({get container(){return b(),x},separator:t.tailwindConfig.separator,modifySelectors:k,wrap(O){let I=x.nodes;x.removeAll(),O.append(I),x.append(O)},format(O){y.push({format:O,respectPrefix:u})},args:r});if(Array.isArray(S)){for(let[O,I]of S.entries())s.push([t.offsets.applyParallelOffset(p,O),I,x.clone()]);continue}if(typeof S=="string"&&y.push({format:S,respectPrefix:u}),S===null)continue;x.raws.neededBackup&&(delete x.raws.neededBackup,x.walkRules(O=>{let I=O.raws.originalSelector;if(!I||(delete O.raws.originalSelector,I===O.selector))return;let B=O.selector,q=(0,vn.default)(X=>{X.walkClasses(le=>{le.value=`${i}${t.tailwindConfig.separator}${le.value}`})}).processSync(I);y.push({format:B.replace(q,"&"),respectPrefix:u}),O.selector=I})),x.nodes[0].raws.tailwind={...x.nodes[0].raws.tailwind,parentLayer:c.layer};let _=[{...c,sort:t.offsets.applyVariantOffset(c.sort,p,Object.assign(r,t.variantOptions.get(i))),collectedFormats:(c.collectedFormats??[]).concat(y)},x.nodes[0]];o.push(_)}}return o}return[]}function so(i,e,t={}){return!ne(i)&&!Array.isArray(i)?[[i],t]:Array.isArray(i)?so(i[0],e,i[1]):(e.has(i)||e.set(i,Mt(i)),[e.get(i),t])}function TC(i){return EC.test(i)}function PC(i){if(!i.includes("://"))return!1;try{let e=new URL(i);return e.scheme!==""&&e.host!==""}catch(e){return!1}}function Ad(i){let e=!0;return i.walkDecls(t=>{if(!_d(t.prop,t.value))return e=!1,!1}),e}function _d(i,e){if(PC(`${i}:${e}`))return!1;try{return V.parse(`a{${i}:${e}}`).toResult(),!0}catch(t){return!1}}function DC(i,e){let[,t,r]=i.match(/^\\[([a-zA-Z0-9-_]+):(\\S+)\\]$/)??[];if(r===void 0||!TC(t)||!Nt(r))return null;let n=N(r,{property:t});return _d(t,n)?[[{sort:e.offsets.arbitraryProperty(),layer:"utilities"},()=>({[Va(i)]:{[t]:n}})]]:null}function*IC(i,e){e.candidateRuleMap.has(i)&&(yield[e.candidateRuleMap.get(i),"DEFAULT"]),yield*function*(o){o!==null&&(yield[o,"DEFAULT"])}(DC(i,e));let t=i,r=!1,n=e.tailwindConfig.prefix,a=n.length,s=t.startsWith(n)||t.startsWith(`-${n}`);t[a]==="-"&&s&&(r=!0,t=n+t.slice(a+1)),r&&e.candidateRuleMap.has(t)&&(yield[e.candidateRuleMap.get(t),"-DEFAULT"]);for(let[o,u]of CC(t))e.candidateRuleMap.has(o)&&(yield[e.candidateRuleMap.get(o),r?`-${u}`:u])}function qC(i,e){return i===He?[He]:oe(i,e)}function*RC(i,e){for(let t of i)t[1].raws.tailwind={...t[1].raws.tailwind,classCandidate:e,preserveSource:t[0].options?.preserveSource??!1},yield t}function*ao(i,e){let t=e.tailwindConfig.separator,[r,...n]=qC(i,t).reverse(),a=!1;r.startsWith("!")&&(a=!0,r=r.slice(1));for(let s of IC(r,e)){let o=[],u=new Map,[c,f]=s,d=c.length===1;for(let[p,m]of c){let w=[];if(typeof m=="function")for(let x of[].concat(m(f,{isOnlyPlugin:d}))){let[y,b]=so(x,e.postCssNodeCache);for(let k of y)w.push([{...p,options:{...p.options,...b}},k])}else if(f==="DEFAULT"||f==="-DEFAULT"){let x=m,[y,b]=so(x,e.postCssNodeCache);for(let k of y)w.push([{...p,options:{...p.options,...b}},k])}if(w.length>0){let x=Array.from(fs(p.options?.types??[],f,p.options??{},e.tailwindConfig)).map(([y,b])=>b);x.length>0&&u.set(w,x),o.push(w)}}if(oo(f)){if(o.length>1){let w=function(y){return y.length===1?y[0]:y.find(b=>{let k=u.get(b);return b.some(([{options:S},_])=>Ad(_)?S.types.some(({type:O,preferOnConflict:I})=>k.includes(O)&&I):!1)})},[p,m]=o.reduce((y,b)=>(b.some(([{options:S}])=>S.types.some(({type:_})=>_==="any"))?y[0].push(b):y[1].push(b),y),[[],[]]),x=w(m)??w(p);if(x)o=[x];else{let y=o.map(k=>new Set([...u.get(k)??[]]));for(let k of y)for(let S of k){let _=!1;for(let O of y)k!==O&&O.has(S)&&(O.delete(S),_=!0);_&&k.delete(S)}let b=[];for(let[k,S]of y.entries())for(let _ of S){let O=o[k].map(([,I])=>I).flat().map(I=>I.toString().split(`\n`).slice(1,-1).map(B=>B.trim()).map(B=>`      ${B}`).join(`\n`)).join(`\n\n`);b.push(`  Use \\`${i.replace("[",`[${_}:`)}\\` for \\`${O.trim()}\\``);break}F.warn([`The class \\`${i}\\` is ambiguous and matches multiple utilities.`,...b,`If this is content and not a class, replace it with \\`${i.replace("[","&lsqb;").replace("]","&rsqb;")}\\` to silence this warning.`]);continue}}o=o.map(p=>p.filter(m=>Ad(m[1])))}o=o.flat(),o=Array.from(RC(o,r)),o=AC(o,e),a&&(o=_C(o,r));for(let p of n)o=OC(p,o,e);for(let p of o)p[1].raws.tailwind={...p[1].raws.tailwind,candidate:i},p=MC(p,{context:e,candidate:i}),p!==null&&(yield p)}}function MC(i,{context:e,candidate:t}){if(!i[0].collectedFormats)return i;let r=!0,n;try{n=$t(i[0].collectedFormats,{context:e,candidate:t})}catch{return null}let a=V.root({nodes:[i[1].clone()]});return a.walkRules(s=>{if(!xn(s))try{let o=wn(s.selector,n,{candidate:t,context:e});if(o===null){s.remove();return}s.selector=o}catch{return r=!1,!1}}),!r||a.nodes.length===0?null:(i[1]=a.nodes[0],i)}function xn(i){return i.parent&&i.parent.type==="atrule"&&i.parent.name==="keyframes"}function BC(i){if(i===!0)return e=>{xn(e)||e.walkDecls(t=>{t.parent.type==="rule"&&!xn(t.parent)&&(t.important=!0)})};if(typeof i=="string")return e=>{xn(e)||(e.selectors=e.selectors.map(t=>bn(t,i)))}}function kn(i,e,t=!1){let r=[],n=BC(e.tailwindConfig.important);for(let a of i){if(e.notClassCache.has(a))continue;if(e.candidateRuleCache.has(a)){r=r.concat(Array.from(e.candidateRuleCache.get(a)));continue}let s=Array.from(ao(a,e));if(s.length===0){e.notClassCache.add(a);continue}e.classCache.set(a,s);let o=e.candidateRuleCache.get(a)??new Set;e.candidateRuleCache.set(a,o);for(let u of s){let[{sort:c,options:f},d]=u;if(f.respectImportant&&n){let m=V.root({nodes:[d.clone()]});m.walkRules(n),d=m.nodes[0]}let p=[c,t?d.clone():d];o.add(p),e.ruleCache.add(p),r.push(p)}}return r}function oo(i){return i.startsWith("[")&&i.endsWith("]")}var vn,SC,EC,Sn=C(()=>{l();nt();vn=K(Re());za();kt();un();cr();Oe();ot();to();Ua();fr();Xr();Ja();St();ze();io();SC=(0,vn.default)(i=>i.first.filter(({type:e})=>e==="class").pop().value);EC=/^[a-z_-]/});var Od,Ed=C(()=>{l();Od={}});function FC(i){try{return Od.createHash("md5").update(i,"utf-8").digest("binary")}catch(e){return""}}function Td(i,e){let t=e.toString();if(!t.includes("@tailwind"))return!1;let r=Qa.get(i),n=FC(t),a=r!==n;return Qa.set(i,n),a}var Pd=C(()=>{l();Ed();ot()});function An(i){return(i>0n)-(i<0n)}var Dd=C(()=>{l()});function Id(i,e){let t=0n,r=0n;for(let[n,a]of e)i&n&&(t=t|n,r=r|a);return i&~t|r}var qd=C(()=>{l()});function Rd(i){let e=null;for(let t of i)e=e??t,e=e>t?e:t;return e}function NC(i,e){let t=i.length,r=e.length,n=t<r?t:r;for(let a=0;a<n;a++){let s=i.charCodeAt(a)-e.charCodeAt(a);if(s!==0)return s}return t-r}var lo,Md=C(()=>{l();Dd();qd();lo=class{constructor(){this.offsets={defaults:0n,base:0n,components:0n,utilities:0n,variants:0n,user:0n},this.layerPositions={defaults:0n,base:1n,components:2n,utilities:3n,user:4n,variants:5n},this.reservedVariantBits=0n,this.variantOffsets=new Map}create(e){return{layer:e,parentLayer:e,arbitrary:0n,variants:0n,parallelIndex:0n,index:this.offsets[e]++,options:[]}}arbitraryProperty(){return{...this.create("utilities"),arbitrary:1n}}forVariant(e,t=0){let r=this.variantOffsets.get(e);if(r===void 0)throw new Error(`Cannot find offset for unknown variant ${e}`);return{...this.create("variants"),variants:r<<BigInt(t)}}applyVariantOffset(e,t,r){return r.variant=t.variants,{...e,layer:"variants",parentLayer:e.layer==="variants"?e.parentLayer:e.layer,variants:e.variants|t.variants,options:r.sort?[].concat(r,e.options):e.options,parallelIndex:Rd([e.parallelIndex,t.parallelIndex])}}applyParallelOffset(e,t){return{...e,parallelIndex:BigInt(t)}}recordVariants(e,t){for(let r of e)this.recordVariant(r,t(r))}recordVariant(e,t=1){return this.variantOffsets.set(e,1n<<this.reservedVariantBits),this.reservedVariantBits+=BigInt(t),{...this.create("variants"),variants:this.variantOffsets.get(e)}}compare(e,t){if(e.layer!==t.layer)return this.layerPositions[e.layer]-this.layerPositions[t.layer];if(e.parentLayer!==t.parentLayer)return this.layerPositions[e.parentLayer]-this.layerPositions[t.parentLayer];for(let r of e.options)for(let n of t.options){if(r.id!==n.id||!r.sort||!n.sort)continue;let a=Rd([r.variant,n.variant])??0n,s=~(a|a-1n),o=e.variants&s,u=t.variants&s;if(o!==u)continue;let c=r.sort({value:r.value,modifier:r.modifier},{value:n.value,modifier:n.modifier});if(c!==0)return c}return e.variants!==t.variants?e.variants-t.variants:e.parallelIndex!==t.parallelIndex?e.parallelIndex-t.parallelIndex:e.arbitrary!==t.arbitrary?e.arbitrary-t.arbitrary:e.index-t.index}recalculateVariantOffsets(){let e=Array.from(this.variantOffsets.entries()).filter(([n])=>n.startsWith("[")).sort(([n],[a])=>NC(n,a)),t=e.map(([,n])=>n).sort((n,a)=>An(n-a));return e.map(([,n],a)=>[n,t[a]]).filter(([n,a])=>n!==a)}remapArbitraryVariantOffsets(e){let t=this.recalculateVariantOffsets();return t.length===0?e:e.map(r=>{let[n,a]=r;return n={...n,variants:Id(n.variants,t)},[n,a]})}sort(e){return e=this.remapArbitraryVariantOffsets(e),e.sort(([t],[r])=>An(this.compare(t,r)))}}});function po(i,e){let t=i.tailwindConfig.prefix;return typeof t=="function"?t(e):t+e}function Fd({type:i="any",...e}){let t=[].concat(i);return{...e,types:t.map(r=>Array.isArray(r)?{type:r[0],...r[1]}:{type:r,preferOnConflict:!1})}}function LC(i){let e=[],t="",r=0;for(let n=0;n<i.length;n++){let a=i[n];if(a==="\\\\")t+="\\\\"+i[++n];else if(a==="{")++r,e.push(t.trim()),t="";else if(a==="}"){if(--r<0)throw new Error("Your { and } are unbalanced.");e.push(t.trim()),t=""}else t+=a}return t.length>0&&e.push(t.trim()),e=e.filter(n=>n!==""),e}function $C(i,e,{before:t=[]}={}){if(t=[].concat(t),t.length<=0){i.push(e);return}let r=i.length-1;for(let n of t){let a=i.indexOf(n);a!==-1&&(r=Math.min(r,a))}i.splice(r,0,e)}function Nd(i){return Array.isArray(i)?i.flatMap(e=>!Array.isArray(e)&&!ne(e)?e:Mt(e)):Nd([i])}function jC(i,e){return(0,uo.default)(r=>{let n=[];return e&&e(r),r.walkClasses(a=>{n.push(a.value)}),n}).transformSync(i)}function zC(i){i.walkPseudos(e=>{e.value===":not"&&e.remove()})}function VC(i,e={containsNonOnDemandable:!1},t=0){let r=[],n=[];i.type==="rule"?n.push(...i.selectors):i.type==="atrule"&&i.walkRules(a=>n.push(...a.selectors));for(let a of n){let s=jC(a,zC);s.length===0&&(e.containsNonOnDemandable=!0);for(let o of s)r.push(o)}return t===0?[e.containsNonOnDemandable||r.length===0,r]:r}function _n(i){return Nd(i).flatMap(e=>{let t=new Map,[r,n]=VC(e);return r&&n.unshift(He),n.map(a=>(t.has(e)||t.set(e,e),[a,t.get(e)]))})}function Cn(i){return i.startsWith("@")||i.includes("&")}function Zr(i){i=i.replace(/\\n+/g,"").replace(/\\s{1,}/g," ").trim();let e=LC(i).map(t=>{if(!t.startsWith("@"))return({format:a})=>a(t);let[,r,n]=/@(\\S*)( .+|[({].*)?/g.exec(t);return({wrap:a})=>a(V.atRule({name:r,params:n?.trim()??""}))}).reverse();return t=>{for(let r of e)r(t)}}function UC(i,e,{variantList:t,variantMap:r,offsets:n,classList:a}){function s(p,m){return p?(0,Bd.default)(i,p,m):i}function o(p){return Bt(i.prefix,p)}function u(p,m){return p===He?He:m.respectPrefix?e.tailwindConfig.prefix+p:p}function c(p,m,w={}){let x=Ke(p),y=s(["theme",...x],m);return Ge(x[0])(y,w)}let f=0,d={postcss:V,prefix:o,e:de,config:s,theme:c,corePlugins:p=>Array.isArray(i.corePlugins)?i.corePlugins.includes(p):s(["corePlugins",p],!0),variants:()=>[],addBase(p){for(let[m,w]of _n(p)){let x=u(m,{}),y=n.create("base");e.candidateRuleMap.has(x)||e.candidateRuleMap.set(x,[]),e.candidateRuleMap.get(x).push([{sort:y,layer:"base"},w])}},addDefaults(p,m){let w={[`@defaults ${p}`]:m};for(let[x,y]of _n(w)){let b=u(x,{});e.candidateRuleMap.has(b)||e.candidateRuleMap.set(b,[]),e.candidateRuleMap.get(b).push([{sort:n.create("defaults"),layer:"defaults"},y])}},addComponents(p,m){m=Object.assign({},{preserveSource:!1,respectPrefix:!0,respectImportant:!1},Array.isArray(m)?{}:m);for(let[x,y]of _n(p)){let b=u(x,m);a.add(b),e.candidateRuleMap.has(b)||e.candidateRuleMap.set(b,[]),e.candidateRuleMap.get(b).push([{sort:n.create("components"),layer:"components",options:m},y])}},addUtilities(p,m){m=Object.assign({},{preserveSource:!1,respectPrefix:!0,respectImportant:!0},Array.isArray(m)?{}:m);for(let[x,y]of _n(p)){let b=u(x,m);a.add(b),e.candidateRuleMap.has(b)||e.candidateRuleMap.set(b,[]),e.candidateRuleMap.get(b).push([{sort:n.create("utilities"),layer:"utilities",options:m},y])}},matchUtilities:function(p,m){m=Fd({...{respectPrefix:!0,respectImportant:!0,modifiers:!1},...m});let x=n.create("utilities");for(let y in p){let S=function(O,{isOnlyPlugin:I}){let[B,q,X]=us(m.types,O,m,i);if(B===void 0)return[];if(!m.types.some(({type:j})=>j===q))if(I)F.warn([`Unnecessary typehint \\`${q}\\` in \\`${y}-${O}\\`.`,`You can safely update it to \\`${y}-${O.replace(q+":","")}\\`.`]);else return[];if(!Nt(B))return[];let le={get modifier(){return m.modifiers||F.warn(`modifier-used-without-options-for-${y}`,["Your plugin must set `modifiers: true` in its options to support modifiers."]),X}},ce=Z(i,"generalizedModifiers");return[].concat(ce?k(B,le):k(B)).filter(Boolean).map(j=>({[fn(y,O)]:j}))},b=u(y,m),k=p[y];a.add([b,m]);let _=[{sort:x,layer:"utilities",options:m},S];e.candidateRuleMap.has(b)||e.candidateRuleMap.set(b,[]),e.candidateRuleMap.get(b).push(_)}},matchComponents:function(p,m){m=Fd({...{respectPrefix:!0,respectImportant:!1,modifiers:!1},...m});let x=n.create("components");for(let y in p){let S=function(O,{isOnlyPlugin:I}){let[B,q,X]=us(m.types,O,m,i);if(B===void 0)return[];if(!m.types.some(({type:j})=>j===q))if(I)F.warn([`Unnecessary typehint \\`${q}\\` in \\`${y}-${O}\\`.`,`You can safely update it to \\`${y}-${O.replace(q+":","")}\\`.`]);else return[];if(!Nt(B))return[];let le={get modifier(){return m.modifiers||F.warn(`modifier-used-without-options-for-${y}`,["Your plugin must set `modifiers: true` in its options to support modifiers."]),X}},ce=Z(i,"generalizedModifiers");return[].concat(ce?k(B,le):k(B)).filter(Boolean).map(j=>({[fn(y,O)]:j}))},b=u(y,m),k=p[y];a.add([b,m]);let _=[{sort:x,layer:"components",options:m},S];e.candidateRuleMap.has(b)||e.candidateRuleMap.set(b,[]),e.candidateRuleMap.get(b).push(_)}},addVariant(p,m,w={}){m=[].concat(m).map(x=>{if(typeof x!="string")return(y={})=>{let{args:b,modifySelectors:k,container:S,separator:_,wrap:O,format:I}=y,B=x(Object.assign({modifySelectors:k,container:S,separator:_},w.type===fo.MatchVariant&&{args:b,wrap:O,format:I}));if(typeof B=="string"&&!Cn(B))throw new Error(`Your custom variant \\`${p}\\` has an invalid format string. Make sure it\'s an at-rule or contains a \\`&\\` placeholder.`);return Array.isArray(B)?B.filter(q=>typeof q=="string").map(q=>Zr(q)):B&&typeof B=="string"&&Zr(B)(y)};if(!Cn(x))throw new Error(`Your custom variant \\`${p}\\` has an invalid format string. Make sure it\'s an at-rule or contains a \\`&\\` placeholder.`);return Zr(x)}),$C(t,p,w),r.set(p,m),e.variantOptions.set(p,w)},matchVariant(p,m,w){let x=w?.id??++f,y=p==="@",b=Z(i,"generalizedModifiers");for(let[S,_]of Object.entries(w?.values??{}))S!=="DEFAULT"&&d.addVariant(y?`${p}${S}`:`${p}-${S}`,({args:O,container:I})=>m(_,b?{modifier:O?.modifier,container:I}:{container:I}),{...w,value:_,id:x,type:fo.MatchVariant,variantInfo:co.Base});let k="DEFAULT"in(w?.values??{});d.addVariant(p,({args:S,container:_})=>S?.value===Kr&&!k?null:m(S?.value===Kr?w.values.DEFAULT:S?.value??(typeof S=="string"?S:""),b?{modifier:S?.modifier,container:_}:{container:_}),{...w,id:x,type:fo.MatchVariant,variantInfo:co.Dynamic})}};return d}function On(i){return ho.has(i)||ho.set(i,new Map),ho.get(i)}function Ld(i,e){let t=!1,r=new Map;for(let n of i){if(!n)continue;let a=gs.parse(n),s=a.hash?a.href.replace(a.hash,""):a.href;s=a.search?s.replace(a.search,""):s;let o=re.statSync(decodeURIComponent(s),{throwIfNoEntry:!1})?.mtimeMs;!o||((!e.has(n)||o>e.get(n))&&(t=!0),r.set(n,o))}return[t,r]}function $d(i){i.walkAtRules(e=>{["responsive","variants"].includes(e.name)&&($d(e),e.before(e.nodes),e.remove())})}function WC(i){let e=[];return i.each(t=>{t.type==="atrule"&&["responsive","variants"].includes(t.name)&&(t.name="layer",t.params="utilities")}),i.walkAtRules("layer",t=>{if($d(t),t.params==="base"){for(let r of t.nodes)e.push(function({addBase:n}){n(r,{respectPrefix:!1})});t.remove()}else if(t.params==="components"){for(let r of t.nodes)e.push(function({addComponents:n}){n(r,{respectPrefix:!1,preserveSource:!0})});t.remove()}else if(t.params==="utilities"){for(let r of t.nodes)e.push(function({addUtilities:n}){n(r,{respectPrefix:!1,preserveSource:!0})});t.remove()}}),e}function GC(i,e){let t=Object.entries({...Y,...md}).map(([u,c])=>i.tailwindConfig.corePlugins.includes(u)?c:null).filter(Boolean),r=i.tailwindConfig.plugins.map(u=>(u.__isOptionsFunction&&(u=u()),typeof u=="function"?u:u.handler)),n=WC(e),a=[Y.childVariant,Y.pseudoElementVariants,Y.pseudoClassVariants,Y.hasVariants,Y.ariaVariants,Y.dataVariants],s=[Y.supportsVariants,Y.reducedMotionVariants,Y.prefersContrastVariants,Y.screenVariants,Y.orientationVariants,Y.directionVariants,Y.darkVariants,Y.forcedColorsVariants,Y.printVariant];return(i.tailwindConfig.darkMode==="class"||Array.isArray(i.tailwindConfig.darkMode)&&i.tailwindConfig.darkMode[0]==="class")&&(s=[Y.supportsVariants,Y.reducedMotionVariants,Y.prefersContrastVariants,Y.darkVariants,Y.screenVariants,Y.orientationVariants,Y.directionVariants,Y.forcedColorsVariants,Y.printVariant]),[...t,...a,...r,...s,...n]}function HC(i,e){let t=[],r=new Map;e.variantMap=r;let n=new lo;e.offsets=n;let a=new Set,s=UC(e.tailwindConfig,e,{variantList:t,variantMap:r,offsets:n,classList:a});for(let f of i)if(Array.isArray(f))for(let d of f)d(s);else f?.(s);n.recordVariants(t,f=>r.get(f).length);for(let[f,d]of r.entries())e.variantMap.set(f,d.map((p,m)=>[n.forVariant(f,m),p]));let o=(e.tailwindConfig.safelist??[]).filter(Boolean);if(o.length>0){let f=[];for(let d of o){if(typeof d=="string"){e.changedContent.push({content:d,extension:"html"});continue}if(d instanceof RegExp){F.warn("root-regex",["Regular expressions in `safelist` work differently in Tailwind CSS v3.0.","Update your `safelist` configuration to eliminate this warning.","https://tailwindcss.com/docs/content-configuration#safelisting-classes"]);continue}f.push(d)}if(f.length>0){let d=new Map,p=e.tailwindConfig.prefix.length,m=f.some(w=>w.pattern.source.includes("!"));for(let w of a){let x=Array.isArray(w)?(()=>{let[y,b]=w,S=Object.keys(b?.values??{}).map(_=>Qr(y,_));return b?.supportsNegativeValues&&(S=[...S,...S.map(_=>"-"+_)],S=[...S,...S.map(_=>_.slice(0,p)+"-"+_.slice(p))]),b.types.some(({type:_})=>_==="color")&&(S=[...S,...S.flatMap(_=>Object.keys(e.tailwindConfig.theme.opacity).map(O=>`${_}/${O}`))]),m&&b?.respectImportant&&(S=[...S,...S.map(_=>"!"+_)]),S})():[w];for(let y of x)for(let{pattern:b,variants:k=[]}of f)if(b.lastIndex=0,d.has(b)||d.set(b,0),!!b.test(y)){d.set(b,d.get(b)+1),e.changedContent.push({content:y,extension:"html"});for(let S of k)e.changedContent.push({content:S+e.tailwindConfig.separator+y,extension:"html"})}}for(let[w,x]of d.entries())x===0&&F.warn([`The safelist pattern \\`${w}\\` doesn\'t match any Tailwind CSS classes.`,"Fix this pattern or remove it from your `safelist` configuration.","https://tailwindcss.com/docs/content-configuration#safelisting-classes"])}}let u=[].concat(e.tailwindConfig.darkMode??"media")[1]??"dark",c=[po(e,u),po(e,"group"),po(e,"peer")];e.getClassOrder=function(d){let p=[...d].sort((y,b)=>y===b?0:y<b?-1:1),m=new Map(p.map(y=>[y,null])),w=kn(new Set(p),e,!0);w=e.offsets.sort(w);let x=BigInt(c.length);for(let[,y]of w){let b=y.raws.tailwind.candidate;m.set(b,m.get(b)??x++)}return d.map(y=>{let b=m.get(y)??null,k=c.indexOf(y);return b===null&&k!==-1&&(b=BigInt(k)),[y,b]})},e.getClassList=function(d={}){let p=[];for(let m of a)if(Array.isArray(m)){let[w,x]=m,y=[],b=Object.keys(x?.modifiers??{});x?.types?.some(({type:_})=>_==="color")&&b.push(...Object.keys(e.tailwindConfig.theme.opacity??{}));let k={modifiers:b},S=d.includeMetadata&&b.length>0;for(let[_,O]of Object.entries(x?.values??{})){if(O==null)continue;let I=Qr(w,_);if(p.push(S?[I,k]:I),x?.supportsNegativeValues&&Xe(O)){let B=Qr(w,`-${_}`);y.push(S?[B,k]:B)}}p.push(...y)}else p.push(m);return p},e.getVariants=function(){let d=[];for(let[p,m]of e.variantOptions.entries())m.variantInfo!==co.Base&&d.push({name:p,isArbitrary:m.type===Symbol.for("MATCH_VARIANT"),values:Object.keys(m.values??{}),hasDash:p!=="@",selectors({modifier:w,value:x}={}){let y="__TAILWIND_PLACEHOLDER__",b=V.rule({selector:`.${y}`}),k=V.root({nodes:[b.clone()]}),S=k.toString(),_=(e.variantMap.get(p)??[]).flatMap(([j,ue])=>ue),O=[];for(let j of _){let ue=[],ai={args:{modifier:w,value:m.values?.[x]??x},separator:e.tailwindConfig.separator,modifySelectors(Ce){return k.each(Yn=>{Yn.type==="rule"&&(Yn.selectors=Yn.selectors.map(lu=>Ce({get className(){return no(lu)},selector:lu})))}),k},format(Ce){ue.push(Ce)},wrap(Ce){ue.push(`@${Ce.name} ${Ce.params} { & }`)},container:k},oi=j(ai);if(ue.length>0&&O.push(ue),Array.isArray(oi))for(let Ce of oi)ue=[],Ce(ai),O.push(ue)}let I=[],B=k.toString();S!==B&&(k.walkRules(j=>{let ue=j.selector,ai=(0,uo.default)(oi=>{oi.walkClasses(Ce=>{Ce.value=`${p}${e.tailwindConfig.separator}${Ce.value}`})}).processSync(ue);I.push(ue.replace(ai,"&").replace(y,"&"))}),k.walkAtRules(j=>{I.push(`@${j.name} (${j.params}) { & }`)}));let q=!(x in(m.values??{})),X=m[Jr]??{},le=(()=>!(q||X.respectPrefix===!1))();O=O.map(j=>j.map(ue=>({format:ue,respectPrefix:le}))),I=I.map(j=>({format:j,respectPrefix:le}));let ce={candidate:y,context:e},$e=O.map(j=>wn(`.${y}`,$t(j,ce),ce).replace(`.${y}`,"&").replace("{ & }","").trim());return I.length>0&&$e.push($t(I,ce).toString().replace(`.${y}`,"&")),$e}});return d}}function jd(i,e){!i.classCache.has(e)||(i.notClassCache.add(e),i.classCache.delete(e),i.applyClassCache.delete(e),i.candidateRuleMap.delete(e),i.candidateRuleCache.delete(e),i.stylesheetCache=null)}function YC(i,e){let t=e.raws.tailwind.candidate;if(!!t){for(let r of i.ruleCache)r[1].raws.tailwind.candidate===t&&i.ruleCache.delete(r);jd(i,t)}}function mo(i,e=[],t=V.root()){let r={disposables:[],ruleCache:new Set,candidateRuleCache:new Map,classCache:new Map,applyClassCache:new Map,notClassCache:new Set(i.blocklist??[]),postCssNodeCache:new Map,candidateRuleMap:new Map,tailwindConfig:i,changedContent:e,variantMap:new Map,stylesheetCache:null,variantOptions:new Map,markInvalidUtilityCandidate:a=>jd(r,a),markInvalidUtilityNode:a=>YC(r,a)},n=GC(r,t);return HC(n,r),r}function zd(i,e,t,r,n,a){let s=e.opts.from,o=r!==null;Pe.DEBUG&&console.log("Source path:",s);let u;if(o&&jt.has(s))u=jt.get(s);else if(ei.has(n)){let p=ei.get(n);lt.get(p).add(s),jt.set(s,p),u=p}let c=Td(s,i);if(u){let[p,m]=Ld([...a],On(u));if(!p&&!c)return[u,!1,m]}if(jt.has(s)){let p=jt.get(s);if(lt.has(p)&&(lt.get(p).delete(s),lt.get(p).size===0)){lt.delete(p);for(let[m,w]of ei)w===p&&ei.delete(m);for(let m of p.disposables.splice(0))m(p)}}Pe.DEBUG&&console.log("Setting up new context...");let f=mo(t,[],i);Object.assign(f,{userConfigPath:r});let[,d]=Ld([...a],On(f));return ei.set(n,f),jt.set(s,f),lt.has(f)||lt.set(f,new Set),lt.get(f).add(s),[f,!0,d]}var Bd,uo,Jr,fo,co,ho,jt,ei,lt,Xr=C(()=>{l();je();ys();nt();Bd=K(Ls()),uo=K(Re());Hr();za();un();kt();Ft();Ua();cr();gd();ot();ot();pi();Oe();fi();Ja();Sn();Pd();Md();ze();to();Jr=Symbol(),fo={AddVariant:Symbol.for("ADD_VARIANT"),MatchVariant:Symbol.for("MATCH_VARIANT")},co={Base:1<<0,Dynamic:1<<1};ho=new WeakMap;jt=yd,ei=wd,lt=gn});function go(i){return i.ignore?[]:i.glob?h.env.ROLLUP_WATCH==="true"?[{type:"dependency",file:i.base}]:[{type:"dir-dependency",dir:i.base,glob:i.glob}]:[{type:"dependency",file:i.base}]}var Vd=C(()=>{l()});function Ud(i,e){return{handler:i,config:e}}var Wd,Gd=C(()=>{l();Ud.withOptions=function(i,e=()=>({})){let t=function(r){return{__options:r,handler:i(r),config:e(r)}};return t.__isOptionsFunction=!0,t.__pluginFunction=i,t.__configFunction=e,t};Wd=Ud});var yo={};Ae(yo,{default:()=>QC});var QC,wo=C(()=>{l();Gd();QC=Wd});var Yd=v((qD,Hd)=>{l();var JC=(wo(),yo).default,XC={overflow:"hidden",display:"-webkit-box","-webkit-box-orient":"vertical"},KC=JC(function({matchUtilities:i,addUtilities:e,theme:t,variants:r}){let n=t("lineClamp");i({"line-clamp":a=>({...XC,"-webkit-line-clamp":`${a}`})},{values:n}),e([{".line-clamp-none":{"-webkit-line-clamp":"unset"}}],r("lineClamp"))},{theme:{lineClamp:{1:"1",2:"2",3:"3",4:"4",5:"5",6:"6"}},variants:{lineClamp:["responsive"]}});Hd.exports=KC});function bo(i){i.content.files.length===0&&F.warn("content-problems",["The `content` option in your Tailwind CSS configuration is missing or empty.","Configure your content sources or your generated CSS will be missing styles.","https://tailwindcss.com/docs/content-configuration"]);try{let e=Yd();i.plugins.includes(e)&&(F.warn("line-clamp-in-core",["As of Tailwind CSS v3.3, the `@tailwindcss/line-clamp` plugin is now included by default.","Remove it from the `plugins` array in your configuration to eliminate this warning."]),i.plugins=i.plugins.filter(t=>t!==e))}catch{}return i}var Qd=C(()=>{l();Oe()});var Jd,Xd=C(()=>{l();Jd=()=>!1});var En,Kd=C(()=>{l();En={sync:i=>[].concat(i),generateTasks:i=>[{dynamic:!1,base:".",negative:[],positive:[].concat(i),patterns:[].concat(i)}],escapePath:i=>i}});var vo,Zd=C(()=>{l();vo=i=>i});var eh,th=C(()=>{l();eh=()=>""});function rh(i){let e=i,t=eh(i);return t!=="."&&(e=i.substr(t.length),e.charAt(0)==="/"&&(e=e.substr(1))),e.substr(0,2)==="./"&&(e=e.substr(2)),e.charAt(0)==="/"&&(e=e.substr(1)),{base:t,glob:e}}var ih=C(()=>{l();th()});function nh(i,e){let t=e.content.files;t=t.filter(o=>typeof o=="string"),t=t.map(vo);let r=En.generateTasks(t),n=[],a=[];for(let o of r)n.push(...o.positive.map(u=>sh(u,!1))),a.push(...o.negative.map(u=>sh(u,!0)));let s=[...n,...a];return s=e2(i,s),s=s.flatMap(t2),s=s.map(ZC),s}function sh(i,e){let t={original:i,base:i,ignore:e,pattern:i,glob:null};return Jd(i)&&Object.assign(t,rh(i)),t}function ZC(i){let e=vo(i.base);return e=En.escapePath(e),i.pattern=i.glob?`${e}/${i.glob}`:e,i.pattern=i.ignore?`!${i.pattern}`:i.pattern,i}function e2(i,e){let t=[];return i.userConfigPath&&i.tailwindConfig.content.relative&&(t=[ee.dirname(i.userConfigPath)]),e.map(r=>(r.base=ee.resolve(...t,r.base),r))}function t2(i){let e=[i];try{let t=re.realpathSync(i.base);t!==i.base&&e.push({...i,base:t})}catch{}return e}function ah(i,e,t){let r=i.tailwindConfig.content.files.filter(s=>typeof s.raw=="string").map(({raw:s,extension:o="html"})=>({content:s,extension:o})),[n,a]=r2(e,t);for(let s of n){let o=ee.extname(s).slice(1);r.push({file:s,extension:o})}return[r,a]}function r2(i,e){let t=i.map(s=>s.pattern),r=new Map,n=new Set;Pe.DEBUG&&console.time("Finding changed files");let a=En.sync(t,{absolute:!0});for(let s of a){let o=e.get(s)||-1/0,u=re.statSync(s).mtimeMs;u>o&&(n.add(s),r.set(s,u))}return Pe.DEBUG&&console.timeEnd("Finding changed files"),[n,r]}var oh=C(()=>{l();je();gt();Xd();Kd();Zd();ih();ot()});function lh(){}var uh=C(()=>{l()});function a2(i,e){for(let t of e){let r=`${i}${t}`;if(re.existsSync(r)&&re.statSync(r).isFile())return r}for(let t of e){let r=`${i}/index${t}`;if(re.existsSync(r))return r}return null}function*fh(i,e,t,r=ee.extname(i)){let n=a2(ee.resolve(e,i),i2.includes(r)?n2:s2);if(n===null||t.has(n))return;t.add(n),yield n,e=ee.dirname(n),r=ee.extname(n);let a=re.readFileSync(n,"utf-8");for(let s of[...a.matchAll(/import[\\s\\S]*?[\'"](.{3,}?)[\'"]/gi),...a.matchAll(/import[\\s\\S]*from[\\s\\S]*?[\'"](.{3,}?)[\'"]/gi),...a.matchAll(/require\\([\'"`](.+)[\'"`]\\)/gi)])!s[1].startsWith(".")||(yield*fh(s[1],e,t,r))}function xo(i){return i===null?new Set:new Set(fh(i,ee.dirname(i),new Set))}var i2,n2,s2,ch=C(()=>{l();je();gt();i2=[".js",".cjs",".mjs"],n2=["",".js",".cjs",".mjs",".ts",".cts",".mts",".jsx",".tsx"],s2=["",".ts",".cts",".mts",".tsx",".js",".cjs",".mjs",".jsx"]});function o2(i,e){if(ko.has(i))return ko.get(i);let t=nh(i,e);return ko.set(i,t).get(i)}function l2(i){let e=ms(i);if(e!==null){let[r,n,a,s]=dh.get(e)||[],o=xo(e),u=!1,c=new Map;for(let p of o){let m=re.statSync(p).mtimeMs;c.set(p,m),(!s||!s.has(p)||m>s.get(p))&&(u=!0)}if(!u)return[r,e,n,a];for(let p of o)delete fu.cache[p];let f=bo(dr(lh(e))),d=ui(f);return dh.set(e,[f,d,o,c]),[f,e,d,o]}let t=dr(i?.config??i??{});return t=bo(t),[t,null,ui(t),[]]}function So(i){return({tailwindDirectives:e,registerDependency:t})=>(r,n)=>{let[a,s,o,u]=l2(i),c=new Set(u);if(e.size>0){c.add(n.opts.from);for(let w of n.messages)w.type==="dependency"&&c.add(w.file)}let[f,,d]=zd(r,n,a,s,o,c),p=On(f),m=o2(f,a);if(e.size>0){for(let y of m)for(let b of go(y))t(b);let[w,x]=ah(f,m,p);for(let y of w)f.changedContent.push(y);for(let[y,b]of x.entries())d.set(y,b)}for(let w of u)t({type:"dependency",file:w});for(let[w,x]of d.entries())p.set(w,x);return f}}var ph,dh,ko,hh=C(()=>{l();je();ph=K(Qn());mu();hs();sf();Xr();Vd();Qd();oh();uh();ch();dh=new ph.default({maxSize:100}),ko=new WeakMap});function Co(i){let e=new Set,t=new Set,r=new Set;if(i.walkAtRules(n=>{n.name==="apply"&&r.add(n),n.name==="import"&&(n.params===\'"tailwindcss/base"\'||n.params==="\'tailwindcss/base\'"?(n.name="tailwind",n.params="base"):n.params===\'"tailwindcss/components"\'||n.params==="\'tailwindcss/components\'"?(n.name="tailwind",n.params="components"):n.params===\'"tailwindcss/utilities"\'||n.params==="\'tailwindcss/utilities\'"?(n.name="tailwind",n.params="utilities"):(n.params===\'"tailwindcss/screens"\'||n.params==="\'tailwindcss/screens\'"||n.params===\'"tailwindcss/variants"\'||n.params==="\'tailwindcss/variants\'")&&(n.name="tailwind",n.params="variants")),n.name==="tailwind"&&(n.params==="screens"&&(n.params="variants"),e.add(n.params)),["layer","responsive","variants"].includes(n.name)&&(["responsive","variants"].includes(n.name)&&F.warn(`${n.name}-at-rule-deprecated`,[`The \\`@${n.name}\\` directive has been deprecated in Tailwind CSS v3.0.`,"Use `@layer utilities` or `@layer components` instead.","https://tailwindcss.com/docs/upgrade-guide#replace-variants-with-layer"]),t.add(n))}),!e.has("base")||!e.has("components")||!e.has("utilities")){for(let n of t)if(n.name==="layer"&&["base","components","utilities"].includes(n.params)){if(!e.has(n.params))throw n.error(`\\`@layer ${n.params}\\` is used but no matching \\`@tailwind ${n.params}\\` directive is present.`)}else if(n.name==="responsive"){if(!e.has("utilities"))throw n.error("`@responsive` is used but `@tailwind utilities` is missing.")}else if(n.name==="variants"&&!e.has("utilities"))throw n.error("`@variants` is used but `@tailwind utilities` is missing.")}return{tailwindDirectives:e,applyDirectives:r}}var mh=C(()=>{l();Oe()});function vt(i,e=void 0,t=void 0){return i.map(r=>{let n=r.clone();return t!==void 0&&(n.raws.tailwind={...n.raws.tailwind,...t}),e!==void 0&&gh(n,a=>{if(a.raws.tailwind?.preserveSource===!0&&a.source)return!1;a.source=e}),n})}function gh(i,e){e(i)!==!1&&i.each?.(t=>gh(t,e))}var yh=C(()=>{l()});function Ao(i){return i=Array.isArray(i)?i:[i],i=i.map(e=>e instanceof RegExp?e.source:e),i.join("")}function ye(i){return new RegExp(Ao(i),"g")}function ut(i){return`(?:${i.map(Ao).join("|")})`}function _o(i){return`(?:${Ao(i)})?`}function bh(i){return i&&u2.test(i)?i.replace(wh,"\\\\$&"):i||""}var wh,u2,vh=C(()=>{l();wh=/[\\\\^$.*+?()[\\]{}|]/g,u2=RegExp(wh.source)});function xh(i){let e=Array.from(f2(i));return t=>{let r=[];for(let n of e)for(let a of t.match(n)??[])r.push(d2(a));return r}}function*f2(i){let e=i.tailwindConfig.separator,t=i.tailwindConfig.prefix!==""?_o(ye([/-?/,bh(i.tailwindConfig.prefix)])):"",r=ut([/\\[[^\\s:\'"`]+:[^\\s\\[\\]]+\\]/,/\\[[^\\s:\'"`\\]]+:[^\\s]+?\\[[^\\s]+\\][^\\s]+?\\]/,ye([ut([/-?(?:\\w+)/,/@(?:\\w+)/]),_o(ut([ye([ut([/-(?:\\w+-)*\\[\'[^\\s]+\'\\]/,/-(?:\\w+-)*\\["[^\\s]+"\\]/,/-(?:\\w+-)*\\[`[^\\s]+`\\]/,/-(?:\\w+-)*\\[(?:[^\\s\\[\\]]+\\[[^\\s\\[\\]]+\\])*[^\\s:\\[\\]]+\\]/]),/(?![{([]])/,/(?:\\/[^\\s\'"`\\\\><$]*)?/]),ye([ut([/-(?:\\w+-)*\\[\'[^\\s]+\'\\]/,/-(?:\\w+-)*\\["[^\\s]+"\\]/,/-(?:\\w+-)*\\[`[^\\s]+`\\]/,/-(?:\\w+-)*\\[(?:[^\\s\\[\\]]+\\[[^\\s\\[\\]]+\\])*[^\\s\\[\\]]+\\]/]),/(?![{([]])/,/(?:\\/[^\\s\'"`\\\\$]*)?/]),/[-\\/][^\\s\'"`\\\\$={><]*/]))])]),n=[ut([ye([/@\\[[^\\s"\'`]+\\](\\/[^\\s"\'`]+)?/,e]),ye([/([^\\s"\'`\\[\\\\]+-)?\\[[^\\s"\'`]+\\]\\/\\w+/,e]),ye([/([^\\s"\'`\\[\\\\]+-)?\\[[^\\s"\'`]+\\]/,e]),ye([/[^\\s"\'`\\[\\\\]+/,e])]),ut([ye([/([^\\s"\'`\\[\\\\]+-)?\\[[^\\s`]+\\]\\/\\w+/,e]),ye([/([^\\s"\'`\\[\\\\]+-)?\\[[^\\s`]+\\]/,e]),ye([/[^\\s`\\[\\\\]+/,e])])];for(let a of n)yield ye(["((?=((",a,")+))\\\\2)?",/!?/,t,r]);yield/[^<>"\'`\\s.(){}[\\]#=%$]*[^<>"\'`\\s.(){}[\\]#=%:$]/g}function d2(i){if(!i.includes("-["))return i;let e=0,t=[],r=i.matchAll(c2);r=Array.from(r).flatMap(n=>{let[,...a]=n;return a.map((s,o)=>Object.assign([],n,{index:n.index+o,0:s}))});for(let n of r){let a=n[0],s=t[t.length-1];if(a===s?t.pop():(a==="\'"||a===\'"\'||a==="`")&&t.push(a),!s){if(a==="["){e++;continue}else if(a==="]"){e--;continue}if(e<0)return i.substring(0,n.index-1);if(e===0&&!p2.test(a))return i.substring(0,n.index)}}return i}var c2,p2,kh=C(()=>{l();vh();c2=/([\\[\\]\'"`])([^\\[\\]\'"`])?/g,p2=/[^"\'`\\s<>\\]]+/});function h2(i,e){let t=i.tailwindConfig.content.extract;return t[e]||t.DEFAULT||Ch[e]||Ch.DEFAULT(i)}function m2(i,e){let t=i.content.transform;return t[e]||t.DEFAULT||Ah[e]||Ah.DEFAULT}function g2(i,e,t,r){ti.has(e)||ti.set(e,new Sh.default({maxSize:25e3}));for(let n of i.split(`\n`))if(n=n.trim(),!r.has(n))if(r.add(n),ti.get(e).has(n))for(let a of ti.get(e).get(n))t.add(a);else{let a=e(n).filter(o=>o!=="!*"),s=new Set(a);for(let o of s)t.add(o);ti.get(e).set(n,s)}}function y2(i,e){let t=e.offsets.sort(i),r={base:new Set,defaults:new Set,components:new Set,utilities:new Set,variants:new Set};for(let[n,a]of t)r[n.layer].add(a);return r}function Oo(i){return async e=>{let t={base:null,components:null,utilities:null,variants:null};if(e.walkAtRules(w=>{w.name==="tailwind"&&Object.keys(t).includes(w.params)&&(t[w.params]=w)}),Object.values(t).every(w=>w===null))return e;let r=new Set([...i.candidates??[],He]),n=new Set;Ye.DEBUG&&console.time("Reading changed files");{let w=[];for(let y of i.changedContent){let b=m2(i.tailwindConfig,y.extension),k=h2(i,y.extension);w.push([y,{transformer:b,extractor:k}])}let x=500;for(let y=0;y<w.length;y+=x){let b=w.slice(y,y+x);await Promise.all(b.map(async([{file:k,content:S},{transformer:_,extractor:O}])=>{S=k?await re.promises.readFile(k,"utf8"):S,g2(_(S),O,r,n)}))}}Ye.DEBUG&&console.timeEnd("Reading changed files");let a=i.classCache.size;Ye.DEBUG&&console.time("Generate rules"),Ye.DEBUG&&console.time("Sorting candidates");let s=new Set([...r].sort((w,x)=>w===x?0:w<x?-1:1));Ye.DEBUG&&console.timeEnd("Sorting candidates"),kn(s,i),Ye.DEBUG&&console.timeEnd("Generate rules"),Ye.DEBUG&&console.time("Build stylesheet"),(i.stylesheetCache===null||i.classCache.size!==a)&&(i.stylesheetCache=y2([...i.ruleCache],i)),Ye.DEBUG&&console.timeEnd("Build stylesheet");let{defaults:o,base:u,components:c,utilities:f,variants:d}=i.stylesheetCache;t.base&&(t.base.before(vt([...u,...o],t.base.source,{layer:"base"})),t.base.remove()),t.components&&(t.components.before(vt([...c],t.components.source,{layer:"components"})),t.components.remove()),t.utilities&&(t.utilities.before(vt([...f],t.utilities.source,{layer:"utilities"})),t.utilities.remove());let p=Array.from(d).filter(w=>{let x=w.raws.tailwind?.parentLayer;return x==="components"?t.components!==null:x==="utilities"?t.utilities!==null:!0});t.variants?(t.variants.before(vt(p,t.variants.source,{layer:"variants"})),t.variants.remove()):p.length>0&&e.append(vt(p,e.source,{layer:"variants"})),e.source.end=e.source.end??e.source.start;let m=p.some(w=>w.raws.tailwind?.parentLayer==="utilities");t.utilities&&f.size===0&&!m&&F.warn("content-problems",["No utility classes were detected in your source files. If this is unexpected, double-check the `content` option in your Tailwind CSS configuration.","https://tailwindcss.com/docs/content-configuration"]),Ye.DEBUG&&(console.log("Potential classes: ",r.size),console.log("Active contexts: ",gn.size)),i.changedContent=[],e.walkAtRules("layer",w=>{Object.keys(t).includes(w.params)&&w.remove()})}}var Sh,Ye,Ch,Ah,ti,_h=C(()=>{l();je();Sh=K(Qn());ot();Sn();Oe();yh();kh();Ye=Pe,Ch={DEFAULT:xh},Ah={DEFAULT:i=>i,svelte:i=>i.replace(/(?:^|\\s)class:/g," ")};ti=new WeakMap});function Pn(i){let e=new Map;V.root({nodes:[i.clone()]}).walkRules(a=>{(0,Tn.default)(s=>{s.walkClasses(o=>{let u=o.parent.toString(),c=e.get(u);c||e.set(u,c=new Set),c.add(o.value)})}).processSync(a.selector)});let r=Array.from(e.values(),a=>Array.from(a)),n=r.flat();return Object.assign(n,{groups:r})}function Eo(i){return w2.astSync(i)}function Oh(i,e){let t=new Set;for(let r of i)t.add(r.split(e).pop());return Array.from(t)}function Eh(i,e){let t=i.tailwindConfig.prefix;return typeof t=="function"?t(e):t+e}function*Th(i){for(yield i;i.parent;)yield i.parent,i=i.parent}function b2(i,e={}){let t=i.nodes;i.nodes=[];let r=i.clone(e);return i.nodes=t,r}function v2(i){for(let e of Th(i))if(i!==e){if(e.type==="root")break;i=b2(e,{nodes:[i]})}return i}function x2(i,e){let t=new Map;return i.walkRules(r=>{for(let s of Th(r))if(s.raws.tailwind?.layer!==void 0)return;let n=v2(r),a=e.offsets.create("user");for(let s of Pn(r)){let o=t.get(s)||[];t.set(s,o),o.push([{layer:"user",sort:a,important:!1},n])}}),t}function k2(i,e){for(let t of i){if(e.notClassCache.has(t)||e.applyClassCache.has(t))continue;if(e.classCache.has(t)){e.applyClassCache.set(t,e.classCache.get(t).map(([n,a])=>[n,a.clone()]));continue}let r=Array.from(ao(t,e));if(r.length===0){e.notClassCache.add(t);continue}e.applyClassCache.set(t,r)}return e.applyClassCache}function S2(i){let e=null;return{get:t=>(e=e||i(),e.get(t)),has:t=>(e=e||i(),e.has(t))}}function C2(i){return{get:e=>i.flatMap(t=>t.get(e)||[]),has:e=>i.some(t=>t.has(e))}}function Ph(i){let e=i.split(/[\\s\\t\\n]+/g);return e[e.length-1]==="!important"?[e.slice(0,-1),!0]:[e,!1]}function Dh(i,e,t){let r=new Set,n=[];if(i.walkAtRules("apply",u=>{let[c]=Ph(u.params);for(let f of c)r.add(f);n.push(u)}),n.length===0)return;let a=C2([t,k2(r,e)]);function s(u,c,f){let d=Eo(u),p=Eo(c),w=Eo(`.${de(f)}`).nodes[0].nodes[0];return d.each(x=>{let y=new Set;p.each(b=>{let k=!1;b=b.clone(),b.walkClasses(S=>{S.value===w.value&&(k||(S.replaceWith(...x.nodes.map(_=>_.clone())),y.add(b),k=!0))})});for(let b of y){let k=[[]];for(let S of b.nodes)S.type==="combinator"?(k.push(S),k.push([])):k[k.length-1].push(S);b.nodes=[];for(let S of k)Array.isArray(S)&&S.sort((_,O)=>_.type==="tag"&&O.type==="class"?-1:_.type==="class"&&O.type==="tag"?1:_.type==="class"&&O.type==="pseudo"&&O.value.startsWith("::")?-1:_.type==="pseudo"&&_.value.startsWith("::")&&O.type==="class"?1:0),b.nodes=b.nodes.concat(S)}x.replaceWith(...y)}),d.toString()}let o=new Map;for(let u of n){let[c]=o.get(u.parent)||[[],u.source];o.set(u.parent,[c,u.source]);let[f,d]=Ph(u.params);if(u.parent.type==="atrule"){if(u.parent.name==="screen"){let p=u.parent.params;throw u.error(`@apply is not supported within nested at-rules like @screen. We suggest you write this as @apply ${f.map(m=>`${p}:${m}`).join(" ")} instead.`)}throw u.error(`@apply is not supported within nested at-rules like @${u.parent.name}. You can fix this by un-nesting @${u.parent.name}.`)}for(let p of f){if([Eh(e,"group"),Eh(e,"peer")].includes(p))throw u.error(`@apply should not be used with the \'${p}\' utility`);if(!a.has(p))throw u.error(`The \\`${p}\\` class does not exist. If \\`${p}\\` is a custom class, make sure it is defined within a \\`@layer\\` directive.`);let m=a.get(p);c.push([p,d,m])}}for(let[u,[c,f]]of o){let d=[];for(let[m,w,x]of c){let y=[m,...Oh([m],e.tailwindConfig.separator)];for(let[b,k]of x){let S=Pn(u),_=Pn(k);if(_=_.groups.filter(q=>q.some(X=>y.includes(X))).flat(),_=_.concat(Oh(_,e.tailwindConfig.separator)),S.some(q=>_.includes(q)))throw k.error(`You cannot \\`@apply\\` the \\`${m}\\` utility here because it creates a circular dependency.`);let I=V.root({nodes:[k.clone()]});I.walk(q=>{q.source=f}),(k.type!=="atrule"||k.type==="atrule"&&k.name!=="keyframes")&&I.walkRules(q=>{if(!Pn(q).some(j=>j===m)){q.remove();return}let X=typeof e.tailwindConfig.important=="string"?e.tailwindConfig.important:null,ce=u.raws.tailwind!==void 0&&X&&u.selector.indexOf(X)===0?u.selector.slice(X.length):u.selector;ce===""&&(ce=u.selector),q.selector=s(ce,q.selector,m),X&&ce!==u.selector&&(q.selector=bn(q.selector,X)),q.walkDecls(j=>{j.important=b.important||w});let $e=(0,Tn.default)().astSync(q.selector);$e.each(j=>Lt(j)),q.selector=$e.toString()}),!!I.nodes[0]&&d.push([b.sort,I.nodes[0]])}}let p=e.offsets.sort(d).map(m=>m[1]);u.after(p)}for(let u of n)u.parent.nodes.length>1?u.remove():u.parent.remove();Dh(i,e,t)}function To(i){return e=>{let t=S2(()=>x2(e,i));Dh(e,i,t)}}var Tn,w2,Ih=C(()=>{l();nt();Tn=K(Re());Sn();Ft();io();yn();w2=(0,Tn.default)()});var qh=v((P6,Dn)=>{l();(function(){"use strict";function i(r,n,a){if(!r)return null;i.caseSensitive||(r=r.toLowerCase());var s=i.threshold===null?null:i.threshold*r.length,o=i.thresholdAbsolute,u;s!==null&&o!==null?u=Math.min(s,o):s!==null?u=s:o!==null?u=o:u=null;var c,f,d,p,m,w=n.length;for(m=0;m<w;m++)if(f=n[m],a&&(f=f[a]),!!f&&(i.caseSensitive?d=f:d=f.toLowerCase(),p=t(r,d,u),(u===null||p<u)&&(u=p,a&&i.returnWinningObject?c=n[m]:c=f,i.returnFirstMatch)))return c;return c||i.nullResultValue}i.threshold=.4,i.thresholdAbsolute=20,i.caseSensitive=!1,i.nullResultValue=null,i.returnWinningObject=null,i.returnFirstMatch=!1,typeof Dn!="undefined"&&Dn.exports?Dn.exports=i:window.didYouMean=i;var e=Math.pow(2,32)-1;function t(r,n,a){a=a||a===0?a:e;var s=r.length,o=n.length;if(s===0)return Math.min(a+1,o);if(o===0)return Math.min(a+1,s);if(Math.abs(s-o)>a)return a+1;var u=[],c,f,d,p,m;for(c=0;c<=o;c++)u[c]=[c];for(f=0;f<=s;f++)u[0][f]=f;for(c=1;c<=o;c++){for(d=e,p=1,c>a&&(p=c-a),m=o+1,m>a+c&&(m=a+c),f=1;f<=s;f++)f<p||f>m?u[c][f]=a+1:n.charAt(c-1)===r.charAt(f-1)?u[c][f]=u[c-1][f-1]:u[c][f]=Math.min(u[c-1][f-1]+1,Math.min(u[c][f-1]+1,u[c-1][f]+1)),u[c][f]<d&&(d=u[c][f]);if(d>a)return a+1}return u[o][s]}})()});var Mh=v((D6,Rh)=>{l();var Po="(".charCodeAt(0),Do=")".charCodeAt(0),In="\'".charCodeAt(0),Io=\'"\'.charCodeAt(0),qo="\\\\".charCodeAt(0),zt="/".charCodeAt(0),Ro=",".charCodeAt(0),Mo=":".charCodeAt(0),qn="*".charCodeAt(0),A2="u".charCodeAt(0),_2="U".charCodeAt(0),O2="+".charCodeAt(0),E2=/^[a-f0-9?-]+$/i;Rh.exports=function(i){for(var e=[],t=i,r,n,a,s,o,u,c,f,d=0,p=t.charCodeAt(d),m=t.length,w=[{nodes:e}],x=0,y,b="",k="",S="";d<m;)if(p<=32){r=d;do r+=1,p=t.charCodeAt(r);while(p<=32);s=t.slice(d,r),a=e[e.length-1],p===Do&&x?S=s:a&&a.type==="div"?(a.after=s,a.sourceEndIndex+=s.length):p===Ro||p===Mo||p===zt&&t.charCodeAt(r+1)!==qn&&(!y||y&&y.type==="function"&&!1)?k=s:e.push({type:"space",sourceIndex:d,sourceEndIndex:r,value:s}),d=r}else if(p===In||p===Io){r=d,n=p===In?"\'":\'"\',s={type:"string",sourceIndex:d,quote:n};do if(o=!1,r=t.indexOf(n,r+1),~r)for(u=r;t.charCodeAt(u-1)===qo;)u-=1,o=!o;else t+=n,r=t.length-1,s.unclosed=!0;while(o);s.value=t.slice(d+1,r),s.sourceEndIndex=s.unclosed?r:r+1,e.push(s),d=r+1,p=t.charCodeAt(d)}else if(p===zt&&t.charCodeAt(d+1)===qn)r=t.indexOf("*/",d),s={type:"comment",sourceIndex:d,sourceEndIndex:r+2},r===-1&&(s.unclosed=!0,r=t.length,s.sourceEndIndex=r),s.value=t.slice(d+2,r),e.push(s),d=r+2,p=t.charCodeAt(d);else if((p===zt||p===qn)&&y&&y.type==="function")s=t[d],e.push({type:"word",sourceIndex:d-k.length,sourceEndIndex:d+s.length,value:s}),d+=1,p=t.charCodeAt(d);else if(p===zt||p===Ro||p===Mo)s=t[d],e.push({type:"div",sourceIndex:d-k.length,sourceEndIndex:d+s.length,value:s,before:k,after:""}),k="",d+=1,p=t.charCodeAt(d);else if(Po===p){r=d;do r+=1,p=t.charCodeAt(r);while(p<=32);if(f=d,s={type:"function",sourceIndex:d-b.length,value:b,before:t.slice(f+1,r)},d=r,b==="url"&&p!==In&&p!==Io){r-=1;do if(o=!1,r=t.indexOf(")",r+1),~r)for(u=r;t.charCodeAt(u-1)===qo;)u-=1,o=!o;else t+=")",r=t.length-1,s.unclosed=!0;while(o);c=r;do c-=1,p=t.charCodeAt(c);while(p<=32);f<c?(d!==c+1?s.nodes=[{type:"word",sourceIndex:d,sourceEndIndex:c+1,value:t.slice(d,c+1)}]:s.nodes=[],s.unclosed&&c+1!==r?(s.after="",s.nodes.push({type:"space",sourceIndex:c+1,sourceEndIndex:r,value:t.slice(c+1,r)})):(s.after=t.slice(c+1,r),s.sourceEndIndex=r)):(s.after="",s.nodes=[]),d=r+1,s.sourceEndIndex=s.unclosed?r:d,p=t.charCodeAt(d),e.push(s)}else x+=1,s.after="",s.sourceEndIndex=d+1,e.push(s),w.push(s),e=s.nodes=[],y=s;b=""}else if(Do===p&&x)d+=1,p=t.charCodeAt(d),y.after=S,y.sourceEndIndex+=S.length,S="",x-=1,w[w.length-1].sourceEndIndex=d,w.pop(),y=w[x],e=y.nodes;else{r=d;do p===qo&&(r+=1),r+=1,p=t.charCodeAt(r);while(r<m&&!(p<=32||p===In||p===Io||p===Ro||p===Mo||p===zt||p===Po||p===qn&&y&&y.type==="function"&&!0||p===zt&&y.type==="function"&&!0||p===Do&&x));s=t.slice(d,r),Po===p?b=s:(A2===s.charCodeAt(0)||_2===s.charCodeAt(0))&&O2===s.charCodeAt(1)&&E2.test(s.slice(2))?e.push({type:"unicode-range",sourceIndex:d,sourceEndIndex:r,value:s}):e.push({type:"word",sourceIndex:d,sourceEndIndex:r,value:s}),d=r}for(d=w.length-1;d;d-=1)w[d].unclosed=!0,w[d].sourceEndIndex=t.length;return w[0].nodes}});var Fh=v((I6,Bh)=>{l();Bh.exports=function i(e,t,r){var n,a,s,o;for(n=0,a=e.length;n<a;n+=1)s=e[n],r||(o=t(s,n,e)),o!==!1&&s.type==="function"&&Array.isArray(s.nodes)&&i(s.nodes,t,r),r&&t(s,n,e)}});var jh=v((q6,$h)=>{l();function Nh(i,e){var t=i.type,r=i.value,n,a;return e&&(a=e(i))!==void 0?a:t==="word"||t==="space"?r:t==="string"?(n=i.quote||"",n+r+(i.unclosed?"":n)):t==="comment"?"/*"+r+(i.unclosed?"":"*/"):t==="div"?(i.before||"")+r+(i.after||""):Array.isArray(i.nodes)?(n=Lh(i.nodes,e),t!=="function"?n:r+"("+(i.before||"")+n+(i.after||"")+(i.unclosed?"":")")):r}function Lh(i,e){var t,r;if(Array.isArray(i)){for(t="",r=i.length-1;~r;r-=1)t=Nh(i[r],e)+t;return t}return Nh(i,e)}$h.exports=Lh});var Vh=v((R6,zh)=>{l();var Rn="-".charCodeAt(0),Mn="+".charCodeAt(0),Bo=".".charCodeAt(0),T2="e".charCodeAt(0),P2="E".charCodeAt(0);function D2(i){var e=i.charCodeAt(0),t;if(e===Mn||e===Rn){if(t=i.charCodeAt(1),t>=48&&t<=57)return!0;var r=i.charCodeAt(2);return t===Bo&&r>=48&&r<=57}return e===Bo?(t=i.charCodeAt(1),t>=48&&t<=57):e>=48&&e<=57}zh.exports=function(i){var e=0,t=i.length,r,n,a;if(t===0||!D2(i))return!1;for(r=i.charCodeAt(e),(r===Mn||r===Rn)&&e++;e<t&&(r=i.charCodeAt(e),!(r<48||r>57));)e+=1;if(r=i.charCodeAt(e),n=i.charCodeAt(e+1),r===Bo&&n>=48&&n<=57)for(e+=2;e<t&&(r=i.charCodeAt(e),!(r<48||r>57));)e+=1;if(r=i.charCodeAt(e),n=i.charCodeAt(e+1),a=i.charCodeAt(e+2),(r===T2||r===P2)&&(n>=48&&n<=57||(n===Mn||n===Rn)&&a>=48&&a<=57))for(e+=n===Mn||n===Rn?3:2;e<t&&(r=i.charCodeAt(e),!(r<48||r>57));)e+=1;return{number:i.slice(0,e),unit:i.slice(e)}}});var Hh=v((M6,Gh)=>{l();var I2=Mh(),Uh=Fh(),Wh=jh();function ft(i){return this instanceof ft?(this.nodes=I2(i),this):new ft(i)}ft.prototype.toString=function(){return Array.isArray(this.nodes)?Wh(this.nodes):""};ft.prototype.walk=function(i,e){return Uh(this.nodes,i,e),this};ft.unit=Vh();ft.walk=Uh;ft.stringify=Wh;Gh.exports=ft});function No(i){return typeof i=="object"&&i!==null}function q2(i,e){let t=Ke(e);do if(t.pop(),(0,ri.default)(i,t)!==void 0)break;while(t.length);return t.length?t:void 0}function Vt(i){return typeof i=="string"?i:i.reduce((e,t,r)=>t.includes(".")?`${e}[${t}]`:r===0?t:`${e}.${t}`,"")}function Qh(i){return i.map(e=>`\'${e}\'`).join(", ")}function Jh(i){return Qh(Object.keys(i))}function Lo(i,e,t,r={}){let n=Array.isArray(e)?Vt(e):e.replace(/^[\'"]+|[\'"]+$/g,""),a=Array.isArray(e)?e:Ke(n),s=(0,ri.default)(i.theme,a,t);if(s===void 0){let u=`\'${n}\' does not exist in your theme config.`,c=a.slice(0,-1),f=(0,ri.default)(i.theme,c);if(No(f)){let d=Object.keys(f).filter(m=>Lo(i,[...c,m]).isValid),p=(0,Yh.default)(a[a.length-1],d);p?u+=` Did you mean \'${Vt([...c,p])}\'?`:d.length>0&&(u+=` \'${Vt(c)}\' has the following valid keys: ${Qh(d)}`)}else{let d=q2(i.theme,n);if(d){let p=(0,ri.default)(i.theme,d);No(p)?u+=` \'${Vt(d)}\' has the following keys: ${Jh(p)}`:u+=` \'${Vt(d)}\' is not an object.`}else u+=` Your theme has the following top-level keys: ${Jh(i.theme)}`}return{isValid:!1,error:u}}if(!(typeof s=="string"||typeof s=="number"||typeof s=="function"||s instanceof String||s instanceof Number||Array.isArray(s))){let u=`\'${n}\' was found but does not resolve to a string.`;if(No(s)){let c=Object.keys(s).filter(f=>Lo(i,[...a,f]).isValid);c.length&&(u+=` Did you mean something like \'${Vt([...a,c[0]])}\'?`)}return{isValid:!1,error:u}}let[o]=a;return{isValid:!0,value:Ge(o)(s,r)}}function R2(i,e,t){e=e.map(n=>Xh(i,n,t));let r=[""];for(let n of e)n.type==="div"&&n.value===","?r.push(""):r[r.length-1]+=Fo.default.stringify(n);return r}function Xh(i,e,t){if(e.type==="function"&&t[e.value]!==void 0){let r=R2(i,e.nodes,t);e.type="word",e.value=t[e.value](i,...r)}return e}function M2(i,e,t){return Object.keys(t).some(n=>e.includes(`${n}(`))?(0,Fo.default)(e).walk(n=>{Xh(i,n,t)}).toString():e}function*F2(i){i=i.replace(/^[\'"]+|[\'"]+$/g,"");let e=i.match(/^([^\\s]+)(?![^\\[]*\\])(?:\\s*\\/\\s*([^\\/\\s]+))$/),t;yield[i,void 0],e&&(i=e[1],t=e[2],yield[i,t])}function N2(i,e,t){let r=Array.from(F2(e)).map(([n,a])=>Object.assign(Lo(i,n,t,{opacityValue:a}),{resolvedPath:n,alpha:a}));return r.find(n=>n.isValid)??r[0]}function Kh(i){let e=i.tailwindConfig,t={theme:(r,n,...a)=>{let{isValid:s,value:o,error:u,alpha:c}=N2(e,n,a.length?a:void 0);if(!s){let p=r.parent,m=p?.raws.tailwind?.candidate;if(p&&m!==void 0){i.markInvalidUtilityNode(p),p.remove(),F.warn("invalid-theme-key-in-class",[`The utility \\`${m}\\` contains an invalid theme value and was not generated.`]);return}throw r.error(u)}let f=Ct(o),d=f!==void 0&&typeof f=="function";return(c!==void 0||d)&&(c===void 0&&(c=1),o=De(f,c,f)),o},screen:(r,n)=>{n=n.replace(/^[\'"]+/g,"").replace(/[\'"]+$/g,"");let s=at(e.theme.screens).find(({name:o})=>o===n);if(!s)throw r.error(`The \'${n}\' screen does not exist in your theme.`);return st(s)}};return r=>{r.walk(n=>{let a=B2[n.type];a!==void 0&&(n[a]=M2(n,n[a],t))})}}var ri,Yh,Fo,B2,Zh=C(()=>{l();ri=K(Ls()),Yh=K(qh());Hr();Fo=K(Hh());hn();cn();pi();or();cr();Oe();B2={atrule:"params",decl:"value"}});function em({tailwindConfig:{theme:i}}){return function(e){e.walkAtRules("screen",t=>{let r=t.params,a=at(i.screens).find(({name:s})=>s===r);if(!a)throw t.error(`No \\`${r}\\` screen found.`);t.name="media",t.params=st(a)})}}var tm=C(()=>{l();hn();cn()});function L2(i){let e=i.filter(o=>o.type!=="pseudo"||o.nodes.length>0?!0:o.value.startsWith("::")||[":before",":after",":first-line",":first-letter"].includes(o.value)).reverse(),t=new Set(["tag","class","id","attribute"]),r=e.findIndex(o=>t.has(o.type));if(r===-1)return e.reverse().join("").trim();let n=e[r],a=rm[n.type]?rm[n.type](n):n;e=e.slice(0,r);let s=e.findIndex(o=>o.type==="combinator"&&o.value===">");return s!==-1&&(e.splice(0,s),e.unshift(Bn.default.universal())),[a,...e.reverse()].join("").trim()}function j2(i){return $o.has(i)||$o.set(i,$2.transformSync(i)),$o.get(i)}function jo({tailwindConfig:i}){return e=>{let t=new Map,r=new Set;if(e.walkAtRules("defaults",n=>{if(n.nodes&&n.nodes.length>0){r.add(n);return}let a=n.params;t.has(a)||t.set(a,new Set),t.get(a).add(n.parent),n.remove()}),Z(i,"optimizeUniversalDefaults"))for(let n of r){let a=new Map,s=t.get(n.params)??[];for(let o of s)for(let u of j2(o.selector)){let c=u.includes(":-")||u.includes("::-")?u:"__DEFAULT__",f=a.get(c)??new Set;a.set(c,f),f.add(u)}if(Z(i,"optimizeUniversalDefaults")){if(a.size===0){n.remove();continue}for(let[,o]of a){let u=V.rule({source:n.source});u.selectors=[...o],u.append(n.nodes.map(c=>c.clone())),n.before(u)}}n.remove()}else if(r.size){let n=V.rule({selectors:["*","::before","::after"]});for(let s of r)n.append(s.nodes),n.parent||s.before(n),n.source||(n.source=s.source),s.remove();let a=n.clone({selectors:["::backdrop"]});n.after(a)}}}var Bn,rm,$2,$o,im=C(()=>{l();nt();Bn=K(Re());ze();rm={id(i){return Bn.default.attribute({attribute:"id",operator:"=",value:i.value,quoteMark:\'"\'})}};$2=(0,Bn.default)(i=>i.map(e=>{let t=e.split(r=>r.type==="combinator"&&r.value===" ").pop();return L2(t)})),$o=new Map});function zo(){function i(e){let t=null;e.each(r=>{if(!z2.has(r.type)){t=null;return}if(t===null){t=r;return}let n=nm[r.type];r.type==="atrule"&&r.name==="font-face"?t=r:n.every(a=>(r[a]??"").replace(/\\s+/g," ")===(t[a]??"").replace(/\\s+/g," "))?(r.nodes&&t.append(r.nodes),r.remove()):t=r}),e.each(r=>{r.type==="atrule"&&i(r)})}return e=>{i(e)}}var nm,z2,sm=C(()=>{l();nm={atrule:["name","params"],rule:["selector"]},z2=new Set(Object.keys(nm))});function Vo(){return i=>{i.walkRules(e=>{let t=new Map,r=new Set([]),n=new Map;e.walkDecls(a=>{if(a.parent===e){if(t.has(a.prop)){if(t.get(a.prop).value===a.value){r.add(t.get(a.prop)),t.set(a.prop,a);return}n.has(a.prop)||n.set(a.prop,new Set),n.get(a.prop).add(t.get(a.prop)),n.get(a.prop).add(a)}t.set(a.prop,a)}});for(let a of r)a.remove();for(let a of n.values()){let s=new Map;for(let o of a){let u=U2(o.value);u!==null&&(s.has(u)||s.set(u,new Set),s.get(u).add(o))}for(let o of s.values()){let u=Array.from(o).slice(0,-1);for(let c of u)c.remove()}}})}}function U2(i){let e=/^-?\\d*.?\\d+([\\w%]+)?$/g.exec(i);return e?e[1]??V2:null}var V2,am=C(()=>{l();V2=Symbol("unitless-number")});function W2(i){if(!i.walkAtRules)return;let e=new Set;if(i.walkAtRules("apply",t=>{e.add(t.parent)}),e.size!==0)for(let t of e){let r=[],n=[];for(let a of t.nodes)a.type==="atrule"&&a.name==="apply"?(n.length>0&&(r.push(n),n=[]),r.push([a])):n.push(a);if(n.length>0&&r.push(n),r.length!==1){for(let a of[...r].reverse()){let s=t.clone({nodes:[]});s.append(a),t.after(s)}t.remove()}}}function Fn(){return i=>{W2(i)}}var om=C(()=>{l()});function G2(i){return i.type==="root"}function H2(i){return i.type==="atrule"&&i.name==="layer"}function lm(i){return(e,t)=>{let r=!1;e.walkAtRules("tailwind",n=>{if(r)return!1;if(n.parent&&!(G2(n.parent)||H2(n.parent)))return r=!0,n.warn(t,["Nested @tailwind rules were detected, but are not supported.","Consider using a prefix to scope Tailwind\'s classes: https://tailwindcss.com/docs/configuration#prefix","Alternatively, use the important selector strategy: https://tailwindcss.com/docs/configuration#selector-strategy"].join(`\n`)),!1}),e.walkRules(n=>{if(r)return!1;n.walkRules(a=>(r=!0,a.warn(t,["Nested CSS was detected, but CSS nesting has not been configured correctly.","Please enable a CSS nesting plugin *before* Tailwind in your configuration.","See how here: https://tailwindcss.com/docs/using-with-preprocessors#nesting"].join(`\n`)),!1))})}}var um=C(()=>{l()});function Nn(i){return async function(e,t){let{tailwindDirectives:r,applyDirectives:n}=Co(e);lm()(e,t),Fn()(e,t);let a=i({tailwindDirectives:r,applyDirectives:n,registerDependency(s){t.messages.push({plugin:"tailwindcss",parent:t.opts.from,...s})},createContext(s,o){return mo(s,o,e)}})(e,t);if(a.tailwindConfig.separator==="-")throw new Error("The \'-\' character cannot be used as a custom separator in JIT mode due to parsing ambiguity. Please use another character like \'_\' instead.");_u(a.tailwindConfig),await Oo(a)(e,t),Fn()(e,t),To(a)(e,t),Kh(a)(e,t),em(a)(e,t),jo(a)(e,t),zo(a)(e,t),Vo(a)(e,t)}}var fm=C(()=>{l();mh();_h();Ih();Zh();tm();im();sm();am();om();um();Xr();ze()});function cm(i,e){let t=null,r=null;return i.walkAtRules("config",n=>{if(r=n.source?.input.file??e.opts.from??null,r===null)throw n.error("The `@config` directive cannot be used without setting `from` in your PostCSS config.");if(t)throw n.error("Only one `@config` directive is allowed per file.");let a=n.params.match(/([\'"])(.*?)\\1/);if(!a)throw n.error("A path is required when using the `@config` directive.");let s=a[2];if(ee.isAbsolute(s))throw n.error("The `@config` directive cannot be used with an absolute path.");if(t=ee.resolve(ee.dirname(r),s),!re.existsSync(t))throw n.error(`The config file at "${s}" does not exist. Make sure the path is correct and the file exists.`);n.remove()}),t||null}var pm=C(()=>{l();je();gt()});var dm=v((vI,Uo)=>{l();hh();fm();ot();pm();Uo.exports=function(e){return{postcssPlugin:"tailwindcss",plugins:[Pe.DEBUG&&function(t){return console.log(`\n`),console.time("JIT TOTAL"),t},async function(t,r){e=cm(t,r)??e;let n=So(e);if(t.type==="document"){let a=t.nodes.filter(s=>s.type==="root");for(let s of a)s.type==="root"&&await Nn(n)(s,r);return}await Nn(n)(t,r)},!1,Pe.DEBUG&&function(t){return console.timeEnd("JIT TOTAL"),console.log(`\n`),t}].filter(Boolean)}};Uo.exports.postcss=!0});var mm=v((xI,hm)=>{l();hm.exports=dm()});var Wo=v((kI,gm)=>{l();gm.exports=()=>["and_chr 114","and_uc 15.5","chrome 114","chrome 113","chrome 109","edge 114","firefox 114","ios_saf 16.5","ios_saf 16.4","ios_saf 16.3","ios_saf 16.1","opera 99","safari 16.5","samsung 21"]});var Ln={};Ae(Ln,{agents:()=>Y2,feature:()=>Q2});function Q2(){return{status:"cr",title:"CSS Feature Queries",stats:{ie:{"6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","5.5":"n"},edge:{"12":"y","13":"y","14":"y","15":"y","16":"y","17":"y","18":"y","79":"y","80":"y","81":"y","83":"y","84":"y","85":"y","86":"y","87":"y","88":"y","89":"y","90":"y","91":"y","92":"y","93":"y","94":"y","95":"y","96":"y","97":"y","98":"y","99":"y","100":"y","101":"y","102":"y","103":"y","104":"y","105":"y","106":"y","107":"y","108":"y","109":"y","110":"y","111":"y","112":"y","113":"y","114":"y"},firefox:{"2":"n","3":"n","4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y","45":"y","46":"y","47":"y","48":"y","49":"y","50":"y","51":"y","52":"y","53":"y","54":"y","55":"y","56":"y","57":"y","58":"y","59":"y","60":"y","61":"y","62":"y","63":"y","64":"y","65":"y","66":"y","67":"y","68":"y","69":"y","70":"y","71":"y","72":"y","73":"y","74":"y","75":"y","76":"y","77":"y","78":"y","79":"y","80":"y","81":"y","82":"y","83":"y","84":"y","85":"y","86":"y","87":"y","88":"y","89":"y","90":"y","91":"y","92":"y","93":"y","94":"y","95":"y","96":"y","97":"y","98":"y","99":"y","100":"y","101":"y","102":"y","103":"y","104":"y","105":"y","106":"y","107":"y","108":"y","109":"y","110":"y","111":"y","112":"y","113":"y","114":"y","115":"y","116":"y","117":"y","3.5":"n","3.6":"n"},chrome:{"4":"n","5":"n","6":"n","7":"n","8":"n","9":"n","10":"n","11":"n","12":"n","13":"n","14":"n","15":"n","16":"n","17":"n","18":"n","19":"n","20":"n","21":"n","22":"n","23":"n","24":"n","25":"n","26":"n","27":"n","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y","45":"y","46":"y","47":"y","48":"y","49":"y","50":"y","51":"y","52":"y","53":"y","54":"y","55":"y","56":"y","57":"y","58":"y","59":"y","60":"y","61":"y","62":"y","63":"y","64":"y","65":"y","66":"y","67":"y","68":"y","69":"y","70":"y","71":"y","72":"y","73":"y","74":"y","75":"y","76":"y","77":"y","78":"y","79":"y","80":"y","81":"y","83":"y","84":"y","85":"y","86":"y","87":"y","88":"y","89":"y","90":"y","91":"y","92":"y","93":"y","94":"y","95":"y","96":"y","97":"y","98":"y","99":"y","100":"y","101":"y","102":"y","103":"y","104":"y","105":"y","106":"y","107":"y","108":"y","109":"y","110":"y","111":"y","112":"y","113":"y","114":"y","115":"y","116":"y","117":"y"},safari:{"4":"n","5":"n","6":"n","7":"n","8":"n","9":"y","10":"y","11":"y","12":"y","13":"y","14":"y","15":"y","17":"y","9.1":"y","10.1":"y","11.1":"y","12.1":"y","13.1":"y","14.1":"y","15.1":"y","15.2-15.3":"y","15.4":"y","15.5":"y","15.6":"y","16.0":"y","16.1":"y","16.2":"y","16.3":"y","16.4":"y","16.5":"y","16.6":"y",TP:"y","3.1":"n","3.2":"n","5.1":"n","6.1":"n","7.1":"n"},opera:{"9":"n","11":"n","12":"n","15":"y","16":"y","17":"y","18":"y","19":"y","20":"y","21":"y","22":"y","23":"y","24":"y","25":"y","26":"y","27":"y","28":"y","29":"y","30":"y","31":"y","32":"y","33":"y","34":"y","35":"y","36":"y","37":"y","38":"y","39":"y","40":"y","41":"y","42":"y","43":"y","44":"y","45":"y","46":"y","47":"y","48":"y","49":"y","50":"y","51":"y","52":"y","53":"y","54":"y","55":"y","56":"y","57":"y","58":"y","60":"y","62":"y","63":"y","64":"y","65":"y","66":"y","67":"y","68":"y","69":"y","70":"y","71":"y","72":"y","73":"y","74":"y","75":"y","76":"y","77":"y","78":"y","79":"y","80":"y","81":"y","82":"y","83":"y","84":"y","85":"y","86":"y","87":"y","88":"y","89":"y","90":"y","91":"y","92":"y","93":"y","94":"y","95":"y","96":"y","97":"y","98":"y","99":"y","100":"y","12.1":"y","9.5-9.6":"n","10.0-10.1":"n","10.5":"n","10.6":"n","11.1":"n","11.5":"n","11.6":"n"},ios_saf:{"8":"n","17":"y","9.0-9.2":"y","9.3":"y","10.0-10.2":"y","10.3":"y","11.0-11.2":"y","11.3-11.4":"y","12.0-12.1":"y","12.2-12.5":"y","13.0-13.1":"y","13.2":"y","13.3":"y","13.4-13.7":"y","14.0-14.4":"y","14.5-14.8":"y","15.0-15.1":"y","15.2-15.3":"y","15.4":"y","15.5":"y","15.6":"y","16.0":"y","16.1":"y","16.2":"y","16.3":"y","16.4":"y","16.5":"y","16.6":"y","3.2":"n","4.0-4.1":"n","4.2-4.3":"n","5.0-5.1":"n","6.0-6.1":"n","7.0-7.1":"n","8.1-8.4":"n"},op_mini:{all:"y"},android:{"3":"n","4":"n","114":"y","4.4":"y","4.4.3-4.4.4":"y","2.1":"n","2.2":"n","2.3":"n","4.1":"n","4.2-4.3":"n"},bb:{"7":"n","10":"n"},op_mob:{"10":"n","11":"n","12":"n","73":"y","11.1":"n","11.5":"n","12.1":"n"},and_chr:{"114":"y"},and_ff:{"115":"y"},ie_mob:{"10":"n","11":"n"},and_uc:{"15.5":"y"},samsung:{"4":"y","20":"y","21":"y","5.0-5.4":"y","6.2-6.4":"y","7.2-7.4":"y","8.2":"y","9.2":"y","10.1":"y","11.1-11.2":"y","12.0":"y","13.0":"y","14.0":"y","15.0":"y","16.0":"y","17.0":"y","18.0":"y","19.0":"y"},and_qq:{"13.1":"y"},baidu:{"13.18":"y"},kaios:{"2.5":"y","3.0-3.1":"y"}}}}var Y2,$n=C(()=>{l();Y2={ie:{prefix:"ms"},edge:{prefix:"webkit",prefix_exceptions:{"12":"ms","13":"ms","14":"ms","15":"ms","16":"ms","17":"ms","18":"ms"}},firefox:{prefix:"moz"},chrome:{prefix:"webkit"},safari:{prefix:"webkit"},opera:{prefix:"webkit",prefix_exceptions:{"9":"o","11":"o","12":"o","9.5-9.6":"o","10.0-10.1":"o","10.5":"o","10.6":"o","11.1":"o","11.5":"o","11.6":"o","12.1":"o"}},ios_saf:{prefix:"webkit"},op_mini:{prefix:"o"},android:{prefix:"webkit"},bb:{prefix:"webkit"},op_mob:{prefix:"o",prefix_exceptions:{"73":"webkit"}},and_chr:{prefix:"webkit"},and_ff:{prefix:"moz"},ie_mob:{prefix:"ms"},and_uc:{prefix:"webkit",prefix_exceptions:{"15.5":"webkit"}},samsung:{prefix:"webkit"},and_qq:{prefix:"webkit"},baidu:{prefix:"webkit"},kaios:{prefix:"moz"}}});var ym=v(()=>{l()});var fe=v((AI,ct)=>{l();var{list:Go}=ge();ct.exports.error=function(i){let e=new Error(i);throw e.autoprefixer=!0,e};ct.exports.uniq=function(i){return[...new Set(i)]};ct.exports.removeNote=function(i){return i.includes(" ")?i.split(" ")[0]:i};ct.exports.escapeRegexp=function(i){return i.replace(/[$()*+-.?[\\\\\\]^{|}]/g,"\\\\$&")};ct.exports.regexp=function(i,e=!0){return e&&(i=this.escapeRegexp(i)),new RegExp(`(^|[\\\\s,(])(${i}($|[\\\\s(,]))`,"gi")};ct.exports.editList=function(i,e){let t=Go.comma(i),r=e(t,[]);if(t===r)return i;let n=i.match(/,\\s*/);return n=n?n[0]:", ",r.join(n)};ct.exports.splitSelector=function(i){return Go.comma(i).map(e=>Go.space(e).map(t=>t.split(/(?=\\.|#)/g)))}});var pt=v((_I,vm)=>{l();var J2=Wo(),wm=($n(),Ln).agents,X2=fe(),bm=class{static prefixes(){if(this.prefixesCache)return this.prefixesCache;this.prefixesCache=[];for(let e in wm)this.prefixesCache.push(`-${wm[e].prefix}-`);return this.prefixesCache=X2.uniq(this.prefixesCache).sort((e,t)=>t.length-e.length),this.prefixesCache}static withPrefix(e){return this.prefixesRegexp||(this.prefixesRegexp=new RegExp(this.prefixes().join("|"))),this.prefixesRegexp.test(e)}constructor(e,t,r,n){this.data=e,this.options=r||{},this.browserslistOpts=n||{},this.selected=this.parse(t)}parse(e){let t={};for(let r in this.browserslistOpts)t[r]=this.browserslistOpts[r];return t.path=this.options.from,J2(e,t)}prefix(e){let[t,r]=e.split(" "),n=this.data[t],a=n.prefix_exceptions&&n.prefix_exceptions[r];return a||(a=n.prefix),`-${a}-`}isSelected(e){return this.selected.includes(e)}};vm.exports=bm});var ii=v((OI,xm)=>{l();xm.exports={prefix(i){let e=i.match(/^(-\\w+-)/);return e?e[0]:""},unprefixed(i){return i.replace(/^-\\w+-/,"")}}});var Ut=v((EI,Sm)=>{l();var K2=pt(),km=ii(),Z2=fe();function Ho(i,e){let t=new i.constructor;for(let r of Object.keys(i||{})){let n=i[r];r==="parent"&&typeof n=="object"?e&&(t[r]=e):r==="source"||r===null?t[r]=n:Array.isArray(n)?t[r]=n.map(a=>Ho(a,t)):r!=="_autoprefixerPrefix"&&r!=="_autoprefixerValues"&&r!=="proxyCache"&&(typeof n=="object"&&n!==null&&(n=Ho(n,t)),t[r]=n)}return t}var jn=class{static hack(e){return this.hacks||(this.hacks={}),e.names.map(t=>(this.hacks[t]=e,this.hacks[t]))}static load(e,t,r){let n=this.hacks&&this.hacks[e];return n?new n(e,t,r):new this(e,t,r)}static clone(e,t){let r=Ho(e);for(let n in t)r[n]=t[n];return r}constructor(e,t,r){this.prefixes=t,this.name=e,this.all=r}parentPrefix(e){let t;return typeof e._autoprefixerPrefix!="undefined"?t=e._autoprefixerPrefix:e.type==="decl"&&e.prop[0]==="-"?t=km.prefix(e.prop):e.type==="root"?t=!1:e.type==="rule"&&e.selector.includes(":-")&&/:(-\\w+-)/.test(e.selector)?t=e.selector.match(/:(-\\w+-)/)[1]:e.type==="atrule"&&e.name[0]==="-"?t=km.prefix(e.name):t=this.parentPrefix(e.parent),K2.prefixes().includes(t)||(t=!1),e._autoprefixerPrefix=t,e._autoprefixerPrefix}process(e,t){if(!this.check(e))return;let r=this.parentPrefix(e),n=this.prefixes.filter(s=>!r||r===Z2.removeNote(s)),a=[];for(let s of n)this.add(e,s,a.concat([s]),t)&&a.push(s);return a}clone(e,t){return jn.clone(e,t)}};Sm.exports=jn});var R=v((TI,_m)=>{l();var eA=Ut(),tA=pt(),Cm=fe(),Am=class extends eA{check(){return!0}prefixed(e,t){return t+e}normalize(e){return e}otherPrefixes(e,t){for(let r of tA.prefixes())if(r!==t&&e.includes(r))return!0;return!1}set(e,t){return e.prop=this.prefixed(e.prop,t),e}needCascade(e){return e._autoprefixerCascade||(e._autoprefixerCascade=this.all.options.cascade!==!1&&e.raw("before").includes(`\n`)),e._autoprefixerCascade}maxPrefixed(e,t){if(t._autoprefixerMax)return t._autoprefixerMax;let r=0;for(let n of e)n=Cm.removeNote(n),n.length>r&&(r=n.length);return t._autoprefixerMax=r,t._autoprefixerMax}calcBefore(e,t,r=""){let a=this.maxPrefixed(e,t)-Cm.removeNote(r).length,s=t.raw("before");return a>0&&(s+=Array(a).fill(" ").join("")),s}restoreBefore(e){let t=e.raw("before").split(`\n`),r=t[t.length-1];this.all.group(e).up(n=>{let a=n.raw("before").split(`\n`),s=a[a.length-1];s.length<r.length&&(r=s)}),t[t.length-1]=r,e.raws.before=t.join(`\n`)}insert(e,t,r){let n=this.set(this.clone(e),t);if(!(!n||e.parent.some(s=>s.prop===n.prop&&s.value===n.value)))return this.needCascade(e)&&(n.raws.before=this.calcBefore(r,e,t)),e.parent.insertBefore(e,n)}isAlready(e,t){let r=this.all.group(e).up(n=>n.prop===t);return r||(r=this.all.group(e).down(n=>n.prop===t)),r}add(e,t,r,n){let a=this.prefixed(e.prop,t);if(!(this.isAlready(e,a)||this.otherPrefixes(e.value,t)))return this.insert(e,t,r,n)}process(e,t){if(!this.needCascade(e)){super.process(e,t);return}let r=super.process(e,t);!r||!r.length||(this.restoreBefore(e),e.raws.before=this.calcBefore(r,e))}old(e,t){return[this.prefixed(e,t)]}};_m.exports=Am});var Em=v((PI,Om)=>{l();Om.exports=function i(e){return{mul:t=>new i(e*t),div:t=>new i(e/t),simplify:()=>new i(e),toString:()=>e.toString()}}});var Dm=v((DI,Pm)=>{l();var rA=Em(),iA=Ut(),Yo=fe(),nA=/(min|max)-resolution\\s*:\\s*\\d*\\.?\\d+(dppx|dpcm|dpi|x)/gi,sA=/(min|max)-resolution(\\s*:\\s*)(\\d*\\.?\\d+)(dppx|dpcm|dpi|x)/i,Tm=class extends iA{prefixName(e,t){return e==="-moz-"?t+"--moz-device-pixel-ratio":e+t+"-device-pixel-ratio"}prefixQuery(e,t,r,n,a){return n=new rA(n),a==="dpi"?n=n.div(96):a==="dpcm"&&(n=n.mul(2.54).div(96)),n=n.simplify(),e==="-o-"&&(n=n.n+"/"+n.d),this.prefixName(e,t)+r+n}clean(e){if(!this.bad){this.bad=[];for(let t of this.prefixes)this.bad.push(this.prefixName(t,"min")),this.bad.push(this.prefixName(t,"max"))}e.params=Yo.editList(e.params,t=>t.filter(r=>this.bad.every(n=>!r.includes(n))))}process(e){let t=this.parentPrefix(e),r=t?[t]:this.prefixes;e.params=Yo.editList(e.params,(n,a)=>{for(let s of n){if(!s.includes("min-resolution")&&!s.includes("max-resolution")){a.push(s);continue}for(let o of r){let u=s.replace(nA,c=>{let f=c.match(sA);return this.prefixQuery(o,f[1],f[2],f[3],f[4])});a.push(u)}a.push(s)}return Yo.uniq(a)})}};Pm.exports=Tm});var qm=v((II,Im)=>{l();var Qo="(".charCodeAt(0),Jo=")".charCodeAt(0),zn="\'".charCodeAt(0),Xo=\'"\'.charCodeAt(0),Ko="\\\\".charCodeAt(0),Wt="/".charCodeAt(0),Zo=",".charCodeAt(0),el=":".charCodeAt(0),Vn="*".charCodeAt(0),aA="u".charCodeAt(0),oA="U".charCodeAt(0),lA="+".charCodeAt(0),uA=/^[a-f0-9?-]+$/i;Im.exports=function(i){for(var e=[],t=i,r,n,a,s,o,u,c,f,d=0,p=t.charCodeAt(d),m=t.length,w=[{nodes:e}],x=0,y,b="",k="",S="";d<m;)if(p<=32){r=d;do r+=1,p=t.charCodeAt(r);while(p<=32);s=t.slice(d,r),a=e[e.length-1],p===Jo&&x?S=s:a&&a.type==="div"?(a.after=s,a.sourceEndIndex+=s.length):p===Zo||p===el||p===Wt&&t.charCodeAt(r+1)!==Vn&&(!y||y&&y.type==="function"&&y.value!=="calc")?k=s:e.push({type:"space",sourceIndex:d,sourceEndIndex:r,value:s}),d=r}else if(p===zn||p===Xo){r=d,n=p===zn?"\'":\'"\',s={type:"string",sourceIndex:d,quote:n};do if(o=!1,r=t.indexOf(n,r+1),~r)for(u=r;t.charCodeAt(u-1)===Ko;)u-=1,o=!o;else t+=n,r=t.length-1,s.unclosed=!0;while(o);s.value=t.slice(d+1,r),s.sourceEndIndex=s.unclosed?r:r+1,e.push(s),d=r+1,p=t.charCodeAt(d)}else if(p===Wt&&t.charCodeAt(d+1)===Vn)r=t.indexOf("*/",d),s={type:"comment",sourceIndex:d,sourceEndIndex:r+2},r===-1&&(s.unclosed=!0,r=t.length,s.sourceEndIndex=r),s.value=t.slice(d+2,r),e.push(s),d=r+2,p=t.charCodeAt(d);else if((p===Wt||p===Vn)&&y&&y.type==="function"&&y.value==="calc")s=t[d],e.push({type:"word",sourceIndex:d-k.length,sourceEndIndex:d+s.length,value:s}),d+=1,p=t.charCodeAt(d);else if(p===Wt||p===Zo||p===el)s=t[d],e.push({type:"div",sourceIndex:d-k.length,sourceEndIndex:d+s.length,value:s,before:k,after:""}),k="",d+=1,p=t.charCodeAt(d);else if(Qo===p){r=d;do r+=1,p=t.charCodeAt(r);while(p<=32);if(f=d,s={type:"function",sourceIndex:d-b.length,value:b,before:t.slice(f+1,r)},d=r,b==="url"&&p!==zn&&p!==Xo){r-=1;do if(o=!1,r=t.indexOf(")",r+1),~r)for(u=r;t.charCodeAt(u-1)===Ko;)u-=1,o=!o;else t+=")",r=t.length-1,s.unclosed=!0;while(o);c=r;do c-=1,p=t.charCodeAt(c);while(p<=32);f<c?(d!==c+1?s.nodes=[{type:"word",sourceIndex:d,sourceEndIndex:c+1,value:t.slice(d,c+1)}]:s.nodes=[],s.unclosed&&c+1!==r?(s.after="",s.nodes.push({type:"space",sourceIndex:c+1,sourceEndIndex:r,value:t.slice(c+1,r)})):(s.after=t.slice(c+1,r),s.sourceEndIndex=r)):(s.after="",s.nodes=[]),d=r+1,s.sourceEndIndex=s.unclosed?r:d,p=t.charCodeAt(d),e.push(s)}else x+=1,s.after="",s.sourceEndIndex=d+1,e.push(s),w.push(s),e=s.nodes=[],y=s;b=""}else if(Jo===p&&x)d+=1,p=t.charCodeAt(d),y.after=S,y.sourceEndIndex+=S.length,S="",x-=1,w[w.length-1].sourceEndIndex=d,w.pop(),y=w[x],e=y.nodes;else{r=d;do p===Ko&&(r+=1),r+=1,p=t.charCodeAt(r);while(r<m&&!(p<=32||p===zn||p===Xo||p===Zo||p===el||p===Wt||p===Qo||p===Vn&&y&&y.type==="function"&&y.value==="calc"||p===Wt&&y.type==="function"&&y.value==="calc"||p===Jo&&x));s=t.slice(d,r),Qo===p?b=s:(aA===s.charCodeAt(0)||oA===s.charCodeAt(0))&&lA===s.charCodeAt(1)&&uA.test(s.slice(2))?e.push({type:"unicode-range",sourceIndex:d,sourceEndIndex:r,value:s}):e.push({type:"word",sourceIndex:d,sourceEndIndex:r,value:s}),d=r}for(d=w.length-1;d;d-=1)w[d].unclosed=!0,w[d].sourceEndIndex=t.length;return w[0].nodes}});var Mm=v((qI,Rm)=>{l();Rm.exports=function i(e,t,r){var n,a,s,o;for(n=0,a=e.length;n<a;n+=1)s=e[n],r||(o=t(s,n,e)),o!==!1&&s.type==="function"&&Array.isArray(s.nodes)&&i(s.nodes,t,r),r&&t(s,n,e)}});var Lm=v((RI,Nm)=>{l();function Bm(i,e){var t=i.type,r=i.value,n,a;return e&&(a=e(i))!==void 0?a:t==="word"||t==="space"?r:t==="string"?(n=i.quote||"",n+r+(i.unclosed?"":n)):t==="comment"?"/*"+r+(i.unclosed?"":"*/"):t==="div"?(i.before||"")+r+(i.after||""):Array.isArray(i.nodes)?(n=Fm(i.nodes,e),t!=="function"?n:r+"("+(i.before||"")+n+(i.after||"")+(i.unclosed?"":")")):r}function Fm(i,e){var t,r;if(Array.isArray(i)){for(t="",r=i.length-1;~r;r-=1)t=Bm(i[r],e)+t;return t}return Bm(i,e)}Nm.exports=Fm});var jm=v((MI,$m)=>{l();var Un="-".charCodeAt(0),Wn="+".charCodeAt(0),tl=".".charCodeAt(0),fA="e".charCodeAt(0),cA="E".charCodeAt(0);function pA(i){var e=i.charCodeAt(0),t;if(e===Wn||e===Un){if(t=i.charCodeAt(1),t>=48&&t<=57)return!0;var r=i.charCodeAt(2);return t===tl&&r>=48&&r<=57}return e===tl?(t=i.charCodeAt(1),t>=48&&t<=57):e>=48&&e<=57}$m.exports=function(i){var e=0,t=i.length,r,n,a;if(t===0||!pA(i))return!1;for(r=i.charCodeAt(e),(r===Wn||r===Un)&&e++;e<t&&(r=i.charCodeAt(e),!(r<48||r>57));)e+=1;if(r=i.charCodeAt(e),n=i.charCodeAt(e+1),r===tl&&n>=48&&n<=57)for(e+=2;e<t&&(r=i.charCodeAt(e),!(r<48||r>57));)e+=1;if(r=i.charCodeAt(e),n=i.charCodeAt(e+1),a=i.charCodeAt(e+2),(r===fA||r===cA)&&(n>=48&&n<=57||(n===Wn||n===Un)&&a>=48&&a<=57))for(e+=n===Wn||n===Un?3:2;e<t&&(r=i.charCodeAt(e),!(r<48||r>57));)e+=1;return{number:i.slice(0,e),unit:i.slice(e)}}});var Gn=v((BI,Um)=>{l();var dA=qm(),zm=Mm(),Vm=Lm();function dt(i){return this instanceof dt?(this.nodes=dA(i),this):new dt(i)}dt.prototype.toString=function(){return Array.isArray(this.nodes)?Vm(this.nodes):""};dt.prototype.walk=function(i,e){return zm(this.nodes,i,e),this};dt.unit=jm();dt.walk=zm;dt.stringify=Vm;Um.exports=dt});var Qm=v((FI,Ym)=>{l();var{list:hA}=ge(),Wm=Gn(),mA=pt(),Gm=ii(),Hm=class{constructor(e){this.props=["transition","transition-property"],this.prefixes=e}add(e,t){let r,n,a=this.prefixes.add[e.prop],s=this.ruleVendorPrefixes(e),o=s||a&&a.prefixes||[],u=this.parse(e.value),c=u.map(m=>this.findProp(m)),f=[];if(c.some(m=>m[0]==="-"))return;for(let m of u){if(n=this.findProp(m),n[0]==="-")continue;let w=this.prefixes.add[n];if(!(!w||!w.prefixes))for(r of w.prefixes){if(s&&!s.some(y=>r.includes(y)))continue;let x=this.prefixes.prefixed(n,r);x!=="-ms-transform"&&!c.includes(x)&&(this.disabled(n,r)||f.push(this.clone(n,x,m)))}}u=u.concat(f);let d=this.stringify(u),p=this.stringify(this.cleanFromUnprefixed(u,"-webkit-"));if(o.includes("-webkit-")&&this.cloneBefore(e,`-webkit-${e.prop}`,p),this.cloneBefore(e,e.prop,p),o.includes("-o-")){let m=this.stringify(this.cleanFromUnprefixed(u,"-o-"));this.cloneBefore(e,`-o-${e.prop}`,m)}for(r of o)if(r!=="-webkit-"&&r!=="-o-"){let m=this.stringify(this.cleanOtherPrefixes(u,r));this.cloneBefore(e,r+e.prop,m)}d!==e.value&&!this.already(e,e.prop,d)&&(this.checkForWarning(t,e),e.cloneBefore(),e.value=d)}findProp(e){let t=e[0].value;if(/^\\d/.test(t)){for(let[r,n]of e.entries())if(r!==0&&n.type==="word")return n.value}return t}already(e,t,r){return e.parent.some(n=>n.prop===t&&n.value===r)}cloneBefore(e,t,r){this.already(e,t,r)||e.cloneBefore({prop:t,value:r})}checkForWarning(e,t){if(t.prop!=="transition-property")return;let r=!1,n=!1;t.parent.each(a=>{if(a.type!=="decl"||a.prop.indexOf("transition-")!==0)return;let s=hA.comma(a.value);if(a.prop==="transition-property"){s.forEach(o=>{let u=this.prefixes.add[o];u&&u.prefixes&&u.prefixes.length>0&&(r=!0)});return}return n=n||s.length>1,!1}),r&&n&&t.warn(e,"Replace transition-property to transition, because Autoprefixer could not support any cases of transition-property and other transition-*")}remove(e){let t=this.parse(e.value);t=t.filter(s=>{let o=this.prefixes.remove[this.findProp(s)];return!o||!o.remove});let r=this.stringify(t);if(e.value===r)return;if(t.length===0){e.remove();return}let n=e.parent.some(s=>s.prop===e.prop&&s.value===r),a=e.parent.some(s=>s!==e&&s.prop===e.prop&&s.value.length>r.length);if(n||a){e.remove();return}e.value=r}parse(e){let t=Wm(e),r=[],n=[];for(let a of t.nodes)n.push(a),a.type==="div"&&a.value===","&&(r.push(n),n=[]);return r.push(n),r.filter(a=>a.length>0)}stringify(e){if(e.length===0)return"";let t=[];for(let r of e)r[r.length-1].type!=="div"&&r.push(this.div(e)),t=t.concat(r);return t[0].type==="div"&&(t=t.slice(1)),t[t.length-1].type==="div"&&(t=t.slice(0,-2+1||void 0)),Wm.stringify({nodes:t})}clone(e,t,r){let n=[],a=!1;for(let s of r)!a&&s.type==="word"&&s.value===e?(n.push({type:"word",value:t}),a=!0):n.push(s);return n}div(e){for(let t of e)for(let r of t)if(r.type==="div"&&r.value===",")return r;return{type:"div",value:",",after:" "}}cleanOtherPrefixes(e,t){return e.filter(r=>{let n=Gm.prefix(this.findProp(r));return n===""||n===t})}cleanFromUnprefixed(e,t){let r=e.map(a=>this.findProp(a)).filter(a=>a.slice(0,t.length)===t).map(a=>this.prefixes.unprefixed(a)),n=[];for(let a of e){let s=this.findProp(a),o=Gm.prefix(s);!r.includes(s)&&(o===t||o==="")&&n.push(a)}return n}disabled(e,t){let r=["order","justify-content","align-self","align-content"];if(e.includes("flex")||r.includes(e)){if(this.prefixes.options.flexbox===!1)return!0;if(this.prefixes.options.flexbox==="no-2009")return t.includes("2009")}}ruleVendorPrefixes(e){let{parent:t}=e;if(t.type!=="rule")return!1;if(!t.selector.includes(":-"))return!1;let r=mA.prefixes().filter(n=>t.selector.includes(":"+n));return r.length>0?r:!1}};Ym.exports=Hm});var Gt=v((NI,Xm)=>{l();var gA=fe(),Jm=class{constructor(e,t,r,n){this.unprefixed=e,this.prefixed=t,this.string=r||t,this.regexp=n||gA.regexp(t)}check(e){return e.includes(this.string)?!!e.match(this.regexp):!1}};Xm.exports=Jm});var ke=v((LI,Zm)=>{l();var yA=Ut(),wA=Gt(),bA=ii(),vA=fe(),Km=class extends yA{static save(e,t){let r=t.prop,n=[];for(let a in t._autoprefixerValues){let s=t._autoprefixerValues[a];if(s===t.value)continue;let o,u=bA.prefix(r);if(u==="-pie-")continue;if(u===a){o=t.value=s,n.push(o);continue}let c=e.prefixed(r,a),f=t.parent;if(!f.every(w=>w.prop!==c)){n.push(o);continue}let d=s.replace(/\\s+/," ");if(f.some(w=>w.prop===t.prop&&w.value.replace(/\\s+/," ")===d)){n.push(o);continue}let m=this.clone(t,{value:s});o=t.parent.insertBefore(t,m),n.push(o)}return n}check(e){let t=e.value;return t.includes(this.name)?!!t.match(this.regexp()):!1}regexp(){return this.regexpCache||(this.regexpCache=vA.regexp(this.name))}replace(e,t){return e.replace(this.regexp(),`$1${t}$2`)}value(e){return e.raws.value&&e.raws.value.value===e.value?e.raws.value.raw:e.value}add(e,t){e._autoprefixerValues||(e._autoprefixerValues={});let r=e._autoprefixerValues[t]||this.value(e),n;do if(n=r,r=this.replace(r,t),r===!1)return;while(r!==n);e._autoprefixerValues[t]=r}old(e){return new wA(this.name,e+this.name)}};Zm.exports=Km});var ht=v(($I,eg)=>{l();eg.exports={}});var il=v((jI,ig)=>{l();var tg=Gn(),xA=ke(),kA=ht().insertAreas,SA=/(^|[^-])linear-gradient\\(\\s*(top|left|right|bottom)/i,CA=/(^|[^-])radial-gradient\\(\\s*\\d+(\\w*|%)\\s+\\d+(\\w*|%)\\s*,/i,AA=/(!\\s*)?autoprefixer:\\s*ignore\\s+next/i,_A=/(!\\s*)?autoprefixer\\s*grid:\\s*(on|off|(no-)?autoplace)/i,OA=["width","height","min-width","max-width","min-height","max-height","inline-size","min-inline-size","max-inline-size","block-size","min-block-size","max-block-size"];function rl(i){return i.parent.some(e=>e.prop==="grid-template"||e.prop==="grid-template-areas")}function EA(i){let e=i.parent.some(r=>r.prop==="grid-template-rows"),t=i.parent.some(r=>r.prop==="grid-template-columns");return e&&t}var rg=class{constructor(e){this.prefixes=e}add(e,t){let r=this.prefixes.add["@resolution"],n=this.prefixes.add["@keyframes"],a=this.prefixes.add["@viewport"],s=this.prefixes.add["@supports"];e.walkAtRules(f=>{if(f.name==="keyframes"){if(!this.disabled(f,t))return n&&n.process(f)}else if(f.name==="viewport"){if(!this.disabled(f,t))return a&&a.process(f)}else if(f.name==="supports"){if(this.prefixes.options.supports!==!1&&!this.disabled(f,t))return s.process(f)}else if(f.name==="media"&&f.params.includes("-resolution")&&!this.disabled(f,t))return r&&r.process(f)}),e.walkRules(f=>{if(!this.disabled(f,t))return this.prefixes.add.selectors.map(d=>d.process(f,t))});function o(f){return f.parent.nodes.some(d=>{if(d.type!=="decl")return!1;let p=d.prop==="display"&&/(inline-)?grid/.test(d.value),m=d.prop.startsWith("grid-template"),w=/^grid-([A-z]+-)?gap/.test(d.prop);return p||m||w})}function u(f){return f.parent.some(d=>d.prop==="display"&&/(inline-)?flex/.test(d.value))}let c=this.gridStatus(e,t)&&this.prefixes.add["grid-area"]&&this.prefixes.add["grid-area"].prefixes;return e.walkDecls(f=>{if(this.disabledDecl(f,t))return;let d=f.parent,p=f.prop,m=f.value;if(p==="grid-row-span"){t.warn("grid-row-span is not part of final Grid Layout. Use grid-row.",{node:f});return}else if(p==="grid-column-span"){t.warn("grid-column-span is not part of final Grid Layout. Use grid-column.",{node:f});return}else if(p==="display"&&m==="box"){t.warn("You should write display: flex by final spec instead of display: box",{node:f});return}else if(p==="text-emphasis-position")(m==="under"||m==="over")&&t.warn("You should use 2 values for text-emphasis-position For example, `under left` instead of just `under`.",{node:f});else if(/^(align|justify|place)-(items|content)$/.test(p)&&u(f))(m==="start"||m==="end")&&t.warn(`${m} value has mixed support, consider using flex-${m} instead`,{node:f});else if(p==="text-decoration-skip"&&m==="ink")t.warn("Replace text-decoration-skip: ink to text-decoration-skip-ink: auto, because spec had been changed",{node:f});else{if(c&&this.gridStatus(f,t))if(f.value==="subgrid"&&t.warn("IE does not support subgrid",{node:f}),/^(align|justify|place)-items$/.test(p)&&o(f)){let x=p.replace("-items","-self");t.warn(`IE does not support ${p} on grid containers. Try using ${x} on child elements instead: ${f.parent.selector} > * { ${x}: ${f.value} }`,{node:f})}else if(/^(align|justify|place)-content$/.test(p)&&o(f))t.warn(`IE does not support ${f.prop} on grid containers`,{node:f});else if(p==="display"&&f.value==="contents"){t.warn("Please do not use display: contents; if you have grid setting enabled",{node:f});return}else if(f.prop==="grid-gap"){let x=this.gridStatus(f,t);x==="autoplace"&&!EA(f)&&!rl(f)?t.warn("grid-gap only works if grid-template(-areas) is being used or both rows and columns have been declared and cells have not been manually placed inside the explicit grid",{node:f}):(x===!0||x==="no-autoplace")&&!rl(f)&&t.warn("grid-gap only works if grid-template(-areas) is being used",{node:f})}else if(p==="grid-auto-columns"){t.warn("grid-auto-columns is not supported by IE",{node:f});return}else if(p==="grid-auto-rows"){t.warn("grid-auto-rows is not supported by IE",{node:f});return}else if(p==="grid-auto-flow"){let x=d.some(b=>b.prop==="grid-template-rows"),y=d.some(b=>b.prop==="grid-template-columns");rl(f)?t.warn("grid-auto-flow is not supported by IE",{node:f}):m.includes("dense")?t.warn("grid-auto-flow: dense is not supported by IE",{node:f}):!x&&!y&&t.warn("grid-auto-flow works only if grid-template-rows and grid-template-columns are present in the same rule",{node:f});return}else if(m.includes("auto-fit")){t.warn("auto-fit value is not supported by IE",{node:f,word:"auto-fit"});return}else if(m.includes("auto-fill")){t.warn("auto-fill value is not supported by IE",{node:f,word:"auto-fill"});return}else p.startsWith("grid-template")&&m.includes("[")&&t.warn("Autoprefixer currently does not support line names. Try using grid-template-areas instead.",{node:f,word:"["});if(m.includes("radial-gradient"))if(CA.test(f.value))t.warn("Gradient has outdated direction syntax. New syntax is like `closest-side at 0 0` instead of `0 0, closest-side`.",{node:f});else{let x=tg(m);for(let y of x.nodes)if(y.type==="function"&&y.value==="radial-gradient")for(let b of y.nodes)b.type==="word"&&(b.value==="cover"?t.warn("Gradient has outdated direction syntax. Replace `cover` to `farthest-corner`.",{node:f}):b.value==="contain"&&t.warn("Gradient has outdated direction syntax. Replace `contain` to `closest-side`.",{node:f}))}m.includes("linear-gradient")&&SA.test(m)&&t.warn("Gradient has outdated direction syntax. New syntax is like `to left` instead of `right`.",{node:f})}OA.includes(f.prop)&&(f.value.includes("-fill-available")||(f.value.includes("fill-available")?t.warn("Replace fill-available to stretch, because spec had been changed",{node:f}):f.value.includes("fill")&&tg(m).nodes.some(y=>y.type==="word"&&y.value==="fill")&&t.warn("Replace fill to stretch, because spec had been changed",{node:f})));let w;if(f.prop==="transition"||f.prop==="transition-property")return this.prefixes.transition.add(f,t);if(f.prop==="align-self"){if(this.displayType(f)!=="grid"&&this.prefixes.options.flexbox!==!1&&(w=this.prefixes.add["align-self"],w&&w.prefixes&&w.process(f)),this.gridStatus(f,t)!==!1&&(w=this.prefixes.add["grid-row-align"],w&&w.prefixes))return w.process(f,t)}else if(f.prop==="justify-self"){if(this.gridStatus(f,t)!==!1&&(w=this.prefixes.add["grid-column-align"],w&&w.prefixes))return w.process(f,t)}else if(f.prop==="place-self"){if(w=this.prefixes.add["place-self"],w&&w.prefixes&&this.gridStatus(f,t)!==!1)return w.process(f,t)}else if(w=this.prefixes.add[f.prop],w&&w.prefixes)return w.process(f,t)}),this.gridStatus(e,t)&&kA(e,this.disabled),e.walkDecls(f=>{if(this.disabledValue(f,t))return;let d=this.prefixes.unprefixed(f.prop),p=this.prefixes.values("add",d);if(Array.isArray(p))for(let m of p)m.process&&m.process(f,t);xA.save(this.prefixes,f)})}remove(e,t){let r=this.prefixes.remove["@resolution"];e.walkAtRules((n,a)=>{this.prefixes.remove[`@${n.name}`]?this.disabled(n,t)||n.parent.removeChild(a):n.name==="media"&&n.params.includes("-resolution")&&r&&r.clean(n)});for(let n of this.prefixes.remove.selectors)e.walkRules((a,s)=>{n.check(a)&&(this.disabled(a,t)||a.parent.removeChild(s))});return e.walkDecls((n,a)=>{if(this.disabled(n,t))return;let s=n.parent,o=this.prefixes.unprefixed(n.prop);if((n.prop==="transition"||n.prop==="transition-property")&&this.prefixes.transition.remove(n),this.prefixes.remove[n.prop]&&this.prefixes.remove[n.prop].remove){let u=this.prefixes.group(n).down(c=>this.prefixes.normalize(c.prop)===o);if(o==="flex-flow"&&(u=!0),n.prop==="-webkit-box-orient"){let c={"flex-direction":!0,"flex-flow":!0};if(!n.parent.some(f=>c[f.prop]))return}if(u&&!this.withHackValue(n)){n.raw("before").includes(`\n`)&&this.reduceSpaces(n),s.removeChild(a);return}}for(let u of this.prefixes.values("remove",o)){if(!u.check||!u.check(n.value))continue;if(o=u.unprefixed,this.prefixes.group(n).down(f=>f.value.includes(o))){s.removeChild(a);return}}})}withHackValue(e){return e.prop==="-webkit-background-clip"&&e.value==="text"}disabledValue(e,t){return this.gridStatus(e,t)===!1&&e.type==="decl"&&e.prop==="display"&&e.value.includes("grid")||this.prefixes.options.flexbox===!1&&e.type==="decl"&&e.prop==="display"&&e.value.includes("flex")||e.type==="decl"&&e.prop==="content"?!0:this.disabled(e,t)}disabledDecl(e,t){if(this.gridStatus(e,t)===!1&&e.type==="decl"&&(e.prop.includes("grid")||e.prop==="justify-items"))return!0;if(this.prefixes.options.flexbox===!1&&e.type==="decl"){let r=["order","justify-content","align-items","align-content"];if(e.prop.includes("flex")||r.includes(e.prop))return!0}return this.disabled(e,t)}disabled(e,t){if(!e)return!1;if(e._autoprefixerDisabled!==void 0)return e._autoprefixerDisabled;if(e.parent){let n=e.prev();if(n&&n.type==="comment"&&AA.test(n.text))return e._autoprefixerDisabled=!0,e._autoprefixerSelfDisabled=!0,!0}let r=null;if(e.nodes){let n;e.each(a=>{a.type==="comment"&&/(!\\s*)?autoprefixer:\\s*(off|on)/i.test(a.text)&&(typeof n!="undefined"?t.warn("Second Autoprefixer control comment was ignored. Autoprefixer applies control comment to whole block, not to next rules.",{node:a}):n=/on/i.test(a.text))}),n!==void 0&&(r=!n)}if(!e.nodes||r===null)if(e.parent){let n=this.disabled(e.parent,t);e.parent._autoprefixerSelfDisabled===!0?r=!1:r=n}else r=!1;return e._autoprefixerDisabled=r,r}reduceSpaces(e){let t=!1;if(this.prefixes.group(e).up(()=>(t=!0,!0)),t)return;let r=e.raw("before").split(`\n`),n=r[r.length-1].length,a=!1;this.prefixes.group(e).down(s=>{r=s.raw("before").split(`\n`);let o=r.length-1;r[o].length>n&&(a===!1&&(a=r[o].length-n),r[o]=r[o].slice(0,-a),s.raws.before=r.join(`\n`))})}displayType(e){for(let t of e.parent.nodes)if(t.prop==="display"){if(t.value.includes("flex"))return"flex";if(t.value.includes("grid"))return"grid"}return!1}gridStatus(e,t){if(!e)return!1;if(e._autoprefixerGridStatus!==void 0)return e._autoprefixerGridStatus;let r=null;if(e.nodes){let n;e.each(a=>{if(a.type==="comment"&&_A.test(a.text)){let s=/:\\s*autoplace/i.test(a.text),o=/no-autoplace/i.test(a.text);typeof n!="undefined"?t.warn("Second Autoprefixer grid control comment was ignored. Autoprefixer applies control comments to the whole block, not to the next rules.",{node:a}):s?n="autoplace":o?n=!0:n=/on/i.test(a.text)}}),n!==void 0&&(r=n)}if(e.type==="atrule"&&e.name==="supports"){let n=e.params;n.includes("grid")&&n.includes("auto")&&(r=!1)}if(!e.nodes||r===null)if(e.parent){let n=this.gridStatus(e.parent,t);e.parent._autoprefixerSelfDisabled===!0?r=!1:r=n}else typeof this.prefixes.options.grid!="undefined"?r=this.prefixes.options.grid:typeof h.env.AUTOPREFIXER_GRID!="undefined"?h.env.AUTOPREFIXER_GRID==="autoplace"?r="autoplace":r=!0:r=!1;return e._autoprefixerGridStatus=r,r}};ig.exports=rg});var sg=v((zI,ng)=>{l();ng.exports={A:{A:{"2":"K E F G A B JC"},B:{"1":"C L M H N D O P Q R S T U V W X Y Z a b c d e f g h i j n o p q r s t u v w x y z I"},C:{"1":"2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB VB WB XB YB ZB aB bB cB 0B dB 1B eB fB gB hB iB jB kB lB mB nB oB m pB qB rB sB tB P Q R 2B S T U V W X Y Z a b c d e f g h i j n o p q r s t u v w x y z I uB 3B 4B","2":"0 1 KC zB J K E F G A B C L M H N D O k l LC MC"},D:{"1":"8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB VB WB XB YB ZB aB bB cB 0B dB 1B eB fB gB hB iB jB kB lB mB nB oB m pB qB rB sB tB P Q R S T U V W X Y Z a b c d e f g h i j n o p q r s t u v w x y z I uB 3B 4B","2":"0 1 2 3 4 5 6 7 J K E F G A B C L M H N D O k l"},E:{"1":"G A B C L M H D RC 6B vB wB 7B SC TC 8B 9B xB AC yB BC CC DC EC FC GC UC","2":"0 J K E F NC 5B OC PC QC"},F:{"1":"1 2 3 4 5 6 7 8 9 H N D O k l AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB VB WB XB YB ZB aB bB cB dB eB fB gB hB iB jB kB lB mB nB oB m pB qB rB sB tB P Q R 2B S T U V W X Y Z a b c d e f g h i j wB","2":"G B C VC WC XC YC vB HC ZC"},G:{"1":"D fC gC hC iC jC kC lC mC nC oC pC qC rC sC tC 8B 9B xB AC yB BC CC DC EC FC GC","2":"F 5B aC IC bC cC dC eC"},H:{"1":"uC"},I:{"1":"I zC 0C","2":"zB J vC wC xC yC IC"},J:{"2":"E A"},K:{"1":"m","2":"A B C vB HC wB"},L:{"1":"I"},M:{"1":"uB"},N:{"2":"A B"},O:{"1":"xB"},P:{"1":"J k l 1C 2C 3C 4C 5C 6B 6C 7C 8C 9C AD yB BD CD DD"},Q:{"1":"7B"},R:{"1":"ED"},S:{"1":"FD GD"}},B:4,C:"CSS Feature Queries"}});var ug=v((VI,lg)=>{l();function ag(i){return i[i.length-1]}var og={parse(i){let e=[""],t=[e];for(let r of i){if(r==="("){e=[""],ag(t).push(e),t.push(e);continue}if(r===")"){t.pop(),e=ag(t),e.push("");continue}e[e.length-1]+=r}return t[0]},stringify(i){let e="";for(let t of i){if(typeof t=="object"){e+=`(${og.stringify(t)})`;continue}e+=t}return e}};lg.exports=og});var hg=v((UI,dg)=>{l();var TA=sg(),{feature:PA}=($n(),Ln),{parse:DA}=ge(),IA=pt(),nl=ug(),qA=ke(),RA=fe(),fg=PA(TA),cg=[];for(let i in fg.stats){let e=fg.stats[i];for(let t in e){let r=e[t];/y/.test(r)&&cg.push(i+" "+t)}}var pg=class{constructor(e,t){this.Prefixes=e,this.all=t}prefixer(){if(this.prefixerCache)return this.prefixerCache;let e=this.all.browsers.selected.filter(r=>cg.includes(r)),t=new IA(this.all.browsers.data,e,this.all.options);return this.prefixerCache=new this.Prefixes(this.all.data,t,this.all.options),this.prefixerCache}parse(e){let t=e.split(":"),r=t[0],n=t[1];return n||(n=""),[r.trim(),n.trim()]}virtual(e){let[t,r]=this.parse(e),n=DA("a{}").first;return n.append({prop:t,value:r,raws:{before:""}}),n}prefixed(e){let t=this.virtual(e);if(this.disabled(t.first))return t.nodes;let r={warn:()=>null},n=this.prefixer().add[t.first.prop];n&&n.process&&n.process(t.first,r);for(let a of t.nodes){for(let s of this.prefixer().values("add",t.first.prop))s.process(a);qA.save(this.all,a)}return t.nodes}isNot(e){return typeof e=="string"&&/not\\s*/i.test(e)}isOr(e){return typeof e=="string"&&/\\s*or\\s*/i.test(e)}isProp(e){return typeof e=="object"&&e.length===1&&typeof e[0]=="string"}isHack(e,t){return!new RegExp(`(\\\\(|\\\\s)${RA.escapeRegexp(t)}:`).test(e)}toRemove(e,t){let[r,n]=this.parse(e),a=this.all.unprefixed(r),s=this.all.cleaner();if(s.remove[r]&&s.remove[r].remove&&!this.isHack(t,a))return!0;for(let o of s.values("remove",a))if(o.check(n))return!0;return!1}remove(e,t){let r=0;for(;r<e.length;){if(!this.isNot(e[r-1])&&this.isProp(e[r])&&this.isOr(e[r+1])){if(this.toRemove(e[r][0],t)){e.splice(r,2);continue}r+=2;continue}typeof e[r]=="object"&&(e[r]=this.remove(e[r],t)),r+=1}return e}cleanBrackets(e){return e.map(t=>typeof t!="object"?t:t.length===1&&typeof t[0]=="object"?this.cleanBrackets(t[0]):this.cleanBrackets(t))}convert(e){let t=[""];for(let r of e)t.push([`${r.prop}: ${r.value}`]),t.push(" or ");return t[t.length-1]="",t}normalize(e){if(typeof e!="object")return e;if(e=e.filter(t=>t!==""),typeof e[0]=="string"){let t=e[0].trim();if(t.includes(":")||t==="selector"||t==="not selector")return[nl.stringify(e)]}return e.map(t=>this.normalize(t))}add(e,t){return e.map(r=>{if(this.isProp(r)){let n=this.prefixed(r[0]);return n.length>1?this.convert(n):r}return typeof r=="object"?this.add(r,t):r})}process(e){let t=nl.parse(e.params);t=this.normalize(t),t=this.remove(t,e.params),t=this.add(t,e.params),t=this.cleanBrackets(t),e.params=nl.stringify(t)}disabled(e){if(!this.all.options.grid&&(e.prop==="display"&&e.value.includes("grid")||e.prop.includes("grid")||e.prop==="justify-items"))return!0;if(this.all.options.flexbox===!1){if(e.prop==="display"&&e.value.includes("flex"))return!0;let t=["order","justify-content","align-items","align-content"];if(e.prop.includes("flex")||t.includes(e.prop))return!0}return!1}};dg.exports=pg});var yg=v((WI,gg)=>{l();var mg=class{constructor(e,t){this.prefix=t,this.prefixed=e.prefixed(this.prefix),this.regexp=e.regexp(this.prefix),this.prefixeds=e.possible().map(r=>[e.prefixed(r),e.regexp(r)]),this.unprefixed=e.name,this.nameRegexp=e.regexp()}isHack(e){let t=e.parent.index(e)+1,r=e.parent.nodes;for(;t<r.length;){let n=r[t].selector;if(!n)return!0;if(n.includes(this.unprefixed)&&n.match(this.nameRegexp))return!1;let a=!1;for(let[s,o]of this.prefixeds)if(n.includes(s)&&n.match(o)){a=!0;break}if(!a)return!0;t+=1}return!0}check(e){return!(!e.selector.includes(this.prefixed)||!e.selector.match(this.regexp)||this.isHack(e))}};gg.exports=mg});var Ht=v((GI,bg)=>{l();var{list:MA}=ge(),BA=yg(),FA=Ut(),NA=pt(),LA=fe(),wg=class extends FA{constructor(e,t,r){super(e,t,r);this.regexpCache=new Map}check(e){return e.selector.includes(this.name)?!!e.selector.match(this.regexp()):!1}prefixed(e){return this.name.replace(/^(\\W*)/,`$1${e}`)}regexp(e){if(!this.regexpCache.has(e)){let t=e?this.prefixed(e):this.name;this.regexpCache.set(e,new RegExp(`(^|[^:"\'=])${LA.escapeRegexp(t)}`,"gi"))}return this.regexpCache.get(e)}possible(){return NA.prefixes()}prefixeds(e){if(e._autoprefixerPrefixeds){if(e._autoprefixerPrefixeds[this.name])return e._autoprefixerPrefixeds}else e._autoprefixerPrefixeds={};let t={};if(e.selector.includes(",")){let n=MA.comma(e.selector).filter(a=>a.includes(this.name));for(let a of this.possible())t[a]=n.map(s=>this.replace(s,a)).join(", ")}else for(let r of this.possible())t[r]=this.replace(e.selector,r);return e._autoprefixerPrefixeds[this.name]=t,e._autoprefixerPrefixeds}already(e,t,r){let n=e.parent.index(e)-1;for(;n>=0;){let a=e.parent.nodes[n];if(a.type!=="rule")return!1;let s=!1;for(let o in t[this.name]){let u=t[this.name][o];if(a.selector===u){if(r===o)return!0;s=!0;break}}if(!s)return!1;n-=1}return!1}replace(e,t){return e.replace(this.regexp(),`$1${this.prefixed(t)}`)}add(e,t){let r=this.prefixeds(e);if(this.already(e,r,t))return;let n=this.clone(e,{selector:r[this.name][t]});e.parent.insertBefore(e,n)}old(e){return new BA(this,e)}};bg.exports=wg});var kg=v((HI,xg)=>{l();var $A=Ut(),vg=class extends $A{add(e,t){let r=t+e.name;if(e.parent.some(s=>s.name===r&&s.params===e.params))return;let a=this.clone(e,{name:r});return e.parent.insertBefore(e,a)}process(e){let t=this.parentPrefix(e);for(let r of this.prefixes)(!t||t===r)&&this.add(e,r)}};xg.exports=vg});var Cg=v((YI,Sg)=>{l();var jA=Ht(),sl=class extends jA{prefixed(e){return e==="-webkit-"?":-webkit-full-screen":e==="-moz-"?":-moz-full-screen":`:${e}fullscreen`}};sl.names=[":fullscreen"];Sg.exports=sl});var _g=v((QI,Ag)=>{l();var zA=Ht(),al=class extends zA{possible(){return super.possible().concat(["-moz- old","-ms- old"])}prefixed(e){return e==="-webkit-"?"::-webkit-input-placeholder":e==="-ms-"?"::-ms-input-placeholder":e==="-ms- old"?":-ms-input-placeholder":e==="-moz- old"?":-moz-placeholder":`::${e}placeholder`}};al.names=["::placeholder"];Ag.exports=al});var Eg=v((JI,Og)=>{l();var VA=Ht(),ol=class extends VA{prefixed(e){return e==="-ms-"?":-ms-input-placeholder":`:${e}placeholder-shown`}};ol.names=[":placeholder-shown"];Og.exports=ol});var Pg=v((XI,Tg)=>{l();var UA=Ht(),WA=fe(),ll=class extends UA{constructor(e,t,r){super(e,t,r);this.prefixes&&(this.prefixes=WA.uniq(this.prefixes.map(n=>"-webkit-")))}prefixed(e){return e==="-webkit-"?"::-webkit-file-upload-button":`::${e}file-selector-button`}};ll.names=["::file-selector-button"];Tg.exports=ll});var he=v((KI,Dg)=>{l();Dg.exports=function(i){let e;return i==="-webkit- 2009"||i==="-moz-"?e=2009:i==="-ms-"?e=2012:i==="-webkit-"&&(e="final"),i==="-webkit- 2009"&&(i="-webkit-"),[e,i]}});var Mg=v((ZI,Rg)=>{l();var Ig=ge().list,qg=he(),GA=R(),Yt=class extends GA{prefixed(e,t){let r;return[r,t]=qg(t),r===2009?t+"box-flex":super.prefixed(e,t)}normalize(){return"flex"}set(e,t){let r=qg(t)[0];if(r===2009)return e.value=Ig.space(e.value)[0],e.value=Yt.oldValues[e.value]||e.value,super.set(e,t);if(r===2012){let n=Ig.space(e.value);n.length===3&&n[2]==="0"&&(e.value=n.slice(0,2).concat("0px").join(" "))}return super.set(e,t)}};Yt.names=["flex","box-flex"];Yt.oldValues={auto:"1",none:"0"};Rg.exports=Yt});var Ng=v((e4,Fg)=>{l();var Bg=he(),HA=R(),ul=class extends HA{prefixed(e,t){let r;return[r,t]=Bg(t),r===2009?t+"box-ordinal-group":r===2012?t+"flex-order":super.prefixed(e,t)}normalize(){return"order"}set(e,t){return Bg(t)[0]===2009&&/\\d/.test(e.value)?(e.value=(parseInt(e.value)+1).toString(),super.set(e,t)):super.set(e,t)}};ul.names=["order","flex-order","box-ordinal-group"];Fg.exports=ul});var $g=v((t4,Lg)=>{l();var YA=R(),fl=class extends YA{check(e){let t=e.value;return!t.toLowerCase().includes("alpha(")&&!t.includes("DXImageTransform.Microsoft")&&!t.includes("data:image/svg+xml")}};fl.names=["filter"];Lg.exports=fl});var zg=v((r4,jg)=>{l();var QA=R(),cl=class extends QA{insert(e,t,r,n){if(t!=="-ms-")return super.insert(e,t,r);let a=this.clone(e),s=e.prop.replace(/end$/,"start"),o=t+e.prop.replace(/end$/,"span");if(!e.parent.some(u=>u.prop===o)){if(a.prop=o,e.value.includes("span"))a.value=e.value.replace(/span\\s/i,"");else{let u;if(e.parent.walkDecls(s,c=>{u=c}),u){let c=Number(e.value)-Number(u.value)+"";a.value=c}else e.warn(n,`Can not prefix ${e.prop} (${s} is not found)`)}e.cloneBefore(a)}}};cl.names=["grid-row-end","grid-column-end"];jg.exports=cl});var Ug=v((i4,Vg)=>{l();var JA=R(),pl=class extends JA{check(e){return!e.value.split(/\\s+/).some(t=>{let r=t.toLowerCase();return r==="reverse"||r==="alternate-reverse"})}};pl.names=["animation","animation-direction"];Vg.exports=pl});var Gg=v((n4,Wg)=>{l();var XA=he(),KA=R(),dl=class extends KA{insert(e,t,r){let n;if([n,t]=XA(t),n!==2009)return super.insert(e,t,r);let a=e.value.split(/\\s+/).filter(d=>d!=="wrap"&&d!=="nowrap"&&"wrap-reverse");if(a.length===0||e.parent.some(d=>d.prop===t+"box-orient"||d.prop===t+"box-direction"))return;let o=a[0],u=o.includes("row")?"horizontal":"vertical",c=o.includes("reverse")?"reverse":"normal",f=this.clone(e);return f.prop=t+"box-orient",f.value=u,this.needCascade(e)&&(f.raws.before=this.calcBefore(r,e,t)),e.parent.insertBefore(e,f),f=this.clone(e),f.prop=t+"box-direction",f.value=c,this.needCascade(e)&&(f.raws.before=this.calcBefore(r,e,t)),e.parent.insertBefore(e,f)}};dl.names=["flex-flow","box-direction","box-orient"];Wg.exports=dl});var Yg=v((s4,Hg)=>{l();var ZA=he(),e_=R(),hl=class extends e_{normalize(){return"flex"}prefixed(e,t){let r;return[r,t]=ZA(t),r===2009?t+"box-flex":r===2012?t+"flex-positive":super.prefixed(e,t)}};hl.names=["flex-grow","flex-positive"];Hg.exports=hl});var Jg=v((a4,Qg)=>{l();var t_=he(),r_=R(),ml=class extends r_{set(e,t){if(t_(t)[0]!==2009)return super.set(e,t)}};ml.names=["flex-wrap"];Qg.exports=ml});var Kg=v((o4,Xg)=>{l();var i_=R(),Qt=ht(),gl=class extends i_{insert(e,t,r,n){if(t!=="-ms-")return super.insert(e,t,r);let a=Qt.parse(e),[s,o]=Qt.translate(a,0,2),[u,c]=Qt.translate(a,1,3);[["grid-row",s],["grid-row-span",o],["grid-column",u],["grid-column-span",c]].forEach(([f,d])=>{Qt.insertDecl(e,f,d)}),Qt.warnTemplateSelectorNotFound(e,n),Qt.warnIfGridRowColumnExists(e,n)}};gl.names=["grid-area"];Xg.exports=gl});var ey=v((l4,Zg)=>{l();var n_=R(),ni=ht(),yl=class extends n_{insert(e,t,r){if(t!=="-ms-")return super.insert(e,t,r);if(e.parent.some(s=>s.prop==="-ms-grid-row-align"))return;let[[n,a]]=ni.parse(e);a?(ni.insertDecl(e,"grid-row-align",n),ni.insertDecl(e,"grid-column-align",a)):(ni.insertDecl(e,"grid-row-align",n),ni.insertDecl(e,"grid-column-align",n))}};yl.names=["place-self"];Zg.exports=yl});var ry=v((u4,ty)=>{l();var s_=R(),wl=class extends s_{check(e){let t=e.value;return!t.includes("/")||t.includes("span")}normalize(e){return e.replace("-start","")}prefixed(e,t){let r=super.prefixed(e,t);return t==="-ms-"&&(r=r.replace("-start","")),r}};wl.names=["grid-row-start","grid-column-start"];ty.exports=wl});var sy=v((f4,ny)=>{l();var iy=he(),a_=R(),Jt=class extends a_{check(e){return e.parent&&!e.parent.some(t=>t.prop&&t.prop.startsWith("grid-"))}prefixed(e,t){let r;return[r,t]=iy(t),r===2012?t+"flex-item-align":super.prefixed(e,t)}normalize(){return"align-self"}set(e,t){let r=iy(t)[0];if(r===2012)return e.value=Jt.oldValues[e.value]||e.value,super.set(e,t);if(r==="final")return super.set(e,t)}};Jt.names=["align-self","flex-item-align"];Jt.oldValues={"flex-end":"end","flex-start":"start"};ny.exports=Jt});var oy=v((c4,ay)=>{l();var o_=R(),l_=fe(),bl=class extends o_{constructor(e,t,r){super(e,t,r);this.prefixes&&(this.prefixes=l_.uniq(this.prefixes.map(n=>n==="-ms-"?"-webkit-":n)))}};bl.names=["appearance"];ay.exports=bl});var fy=v((p4,uy)=>{l();var ly=he(),u_=R(),vl=class extends u_{normalize(){return"flex-basis"}prefixed(e,t){let r;return[r,t]=ly(t),r===2012?t+"flex-preferred-size":super.prefixed(e,t)}set(e,t){let r;if([r,t]=ly(t),r===2012||r==="final")return super.set(e,t)}};vl.names=["flex-basis","flex-preferred-size"];uy.exports=vl});var py=v((d4,cy)=>{l();var f_=R(),xl=class extends f_{normalize(){return this.name.replace("box-image","border")}prefixed(e,t){let r=super.prefixed(e,t);return t==="-webkit-"&&(r=r.replace("border","box-image")),r}};xl.names=["mask-border","mask-border-source","mask-border-slice","mask-border-width","mask-border-outset","mask-border-repeat","mask-box-image","mask-box-image-source","mask-box-image-slice","mask-box-image-width","mask-box-image-outset","mask-box-image-repeat"];cy.exports=xl});var hy=v((h4,dy)=>{l();var c_=R(),Ne=class extends c_{insert(e,t,r){let n=e.prop==="mask-composite",a;n?a=e.value.split(","):a=e.value.match(Ne.regexp)||[],a=a.map(c=>c.trim()).filter(c=>c);let s=a.length,o;if(s&&(o=this.clone(e),o.value=a.map(c=>Ne.oldValues[c]||c).join(", "),a.includes("intersect")&&(o.value+=", xor"),o.prop=t+"mask-composite"),n)return s?(this.needCascade(e)&&(o.raws.before=this.calcBefore(r,e,t)),e.parent.insertBefore(e,o)):void 0;let u=this.clone(e);return u.prop=t+u.prop,s&&(u.value=u.value.replace(Ne.regexp,"")),this.needCascade(e)&&(u.raws.before=this.calcBefore(r,e,t)),e.parent.insertBefore(e,u),s?(this.needCascade(e)&&(o.raws.before=this.calcBefore(r,e,t)),e.parent.insertBefore(e,o)):e}};Ne.names=["mask","mask-composite"];Ne.oldValues={add:"source-over",subtract:"source-out",intersect:"source-in",exclude:"xor"};Ne.regexp=new RegExp(`\\\\s+(${Object.keys(Ne.oldValues).join("|")})\\\\b(?!\\\\))\\\\s*(?=[,])`,"ig");dy.exports=Ne});var yy=v((m4,gy)=>{l();var my=he(),p_=R(),Xt=class extends p_{prefixed(e,t){let r;return[r,t]=my(t),r===2009?t+"box-align":r===2012?t+"flex-align":super.prefixed(e,t)}normalize(){return"align-items"}set(e,t){let r=my(t)[0];return(r===2009||r===2012)&&(e.value=Xt.oldValues[e.value]||e.value),super.set(e,t)}};Xt.names=["align-items","flex-align","box-align"];Xt.oldValues={"flex-end":"end","flex-start":"start"};gy.exports=Xt});var by=v((g4,wy)=>{l();var d_=R(),kl=class extends d_{set(e,t){return t==="-ms-"&&e.value==="contain"&&(e.value="element"),super.set(e,t)}insert(e,t,r){if(!(e.value==="all"&&t==="-ms-"))return super.insert(e,t,r)}};kl.names=["user-select"];wy.exports=kl});var ky=v((y4,xy)=>{l();var vy=he(),h_=R(),Sl=class extends h_{normalize(){return"flex-shrink"}prefixed(e,t){let r;return[r,t]=vy(t),r===2012?t+"flex-negative":super.prefixed(e,t)}set(e,t){let r;if([r,t]=vy(t),r===2012||r==="final")return super.set(e,t)}};Sl.names=["flex-shrink","flex-negative"];xy.exports=Sl});var Cy=v((w4,Sy)=>{l();var m_=R(),Cl=class extends m_{prefixed(e,t){return`${t}column-${e}`}normalize(e){return e.includes("inside")?"break-inside":e.includes("before")?"break-before":"break-after"}set(e,t){return(e.prop==="break-inside"&&e.value==="avoid-column"||e.value==="avoid-page")&&(e.value="avoid"),super.set(e,t)}insert(e,t,r){if(e.prop!=="break-inside")return super.insert(e,t,r);if(!(/region/i.test(e.value)||/page/i.test(e.value)))return super.insert(e,t,r)}};Cl.names=["break-inside","page-break-inside","column-break-inside","break-before","page-break-before","column-break-before","break-after","page-break-after","column-break-after"];Sy.exports=Cl});var _y=v((b4,Ay)=>{l();var g_=R(),Al=class extends g_{prefixed(e,t){return t+"print-color-adjust"}normalize(){return"color-adjust"}};Al.names=["color-adjust","print-color-adjust"];Ay.exports=Al});var Ey=v((v4,Oy)=>{l();var y_=R(),Kt=class extends y_{insert(e,t,r){if(t==="-ms-"){let n=this.set(this.clone(e),t);this.needCascade(e)&&(n.raws.before=this.calcBefore(r,e,t));let a="ltr";return e.parent.nodes.forEach(s=>{s.prop==="direction"&&(s.value==="rtl"||s.value==="ltr")&&(a=s.value)}),n.value=Kt.msValues[a][e.value]||e.value,e.parent.insertBefore(e,n)}return super.insert(e,t,r)}};Kt.names=["writing-mode"];Kt.msValues={ltr:{"horizontal-tb":"lr-tb","vertical-rl":"tb-rl","vertical-lr":"tb-lr"},rtl:{"horizontal-tb":"rl-tb","vertical-rl":"bt-rl","vertical-lr":"bt-lr"}};Oy.exports=Kt});var Py=v((x4,Ty)=>{l();var w_=R(),_l=class extends w_{set(e,t){return e.value=e.value.replace(/\\s+fill(\\s)/,"$1"),super.set(e,t)}};_l.names=["border-image"];Ty.exports=_l});var qy=v((k4,Iy)=>{l();var Dy=he(),b_=R(),Zt=class extends b_{prefixed(e,t){let r;return[r,t]=Dy(t),r===2012?t+"flex-line-pack":super.prefixed(e,t)}normalize(){return"align-content"}set(e,t){let r=Dy(t)[0];if(r===2012)return e.value=Zt.oldValues[e.value]||e.value,super.set(e,t);if(r==="final")return super.set(e,t)}};Zt.names=["align-content","flex-line-pack"];Zt.oldValues={"flex-end":"end","flex-start":"start","space-between":"justify","space-around":"distribute"};Iy.exports=Zt});var My=v((S4,Ry)=>{l();var v_=R(),Se=class extends v_{prefixed(e,t){return t==="-moz-"?t+(Se.toMozilla[e]||e):super.prefixed(e,t)}normalize(e){return Se.toNormal[e]||e}};Se.names=["border-radius"];Se.toMozilla={};Se.toNormal={};for(let i of["top","bottom"])for(let e of["left","right"]){let t=`border-${i}-${e}-radius`,r=`border-radius-${i}${e}`;Se.names.push(t),Se.names.push(r),Se.toMozilla[t]=r,Se.toNormal[r]=t}Ry.exports=Se});var Fy=v((C4,By)=>{l();var x_=R(),Ol=class extends x_{prefixed(e,t){return e.includes("-start")?t+e.replace("-block-start","-before"):t+e.replace("-block-end","-after")}normalize(e){return e.includes("-before")?e.replace("-before","-block-start"):e.replace("-after","-block-end")}};Ol.names=["border-block-start","border-block-end","margin-block-start","margin-block-end","padding-block-start","padding-block-end","border-before","border-after","margin-before","margin-after","padding-before","padding-after"];By.exports=Ol});var Ly=v((A4,Ny)=>{l();var k_=R(),{parseTemplate:S_,warnMissedAreas:C_,getGridGap:A_,warnGridGap:__,inheritGridGap:O_}=ht(),El=class extends k_{insert(e,t,r,n){if(t!=="-ms-")return super.insert(e,t,r);if(e.parent.some(m=>m.prop==="-ms-grid-rows"))return;let a=A_(e),s=O_(e,a),{rows:o,columns:u,areas:c}=S_({decl:e,gap:s||a}),f=Object.keys(c).length>0,d=Boolean(o),p=Boolean(u);return __({gap:a,hasColumns:p,decl:e,result:n}),C_(c,e,n),(d&&p||f)&&e.cloneBefore({prop:"-ms-grid-rows",value:o,raws:{}}),p&&e.cloneBefore({prop:"-ms-grid-columns",value:u,raws:{}}),e}};El.names=["grid-template"];Ny.exports=El});var jy=v((_4,$y)=>{l();var E_=R(),Tl=class extends E_{prefixed(e,t){return t+e.replace("-inline","")}normalize(e){return e.replace(/(margin|padding|border)-(start|end)/,"$1-inline-$2")}};Tl.names=["border-inline-start","border-inline-end","margin-inline-start","margin-inline-end","padding-inline-start","padding-inline-end","border-start","border-end","margin-start","margin-end","padding-start","padding-end"];$y.exports=Tl});var Vy=v((O4,zy)=>{l();var T_=R(),Pl=class extends T_{check(e){return!e.value.includes("flex-")&&e.value!=="baseline"}prefixed(e,t){return t+"grid-row-align"}normalize(){return"align-self"}};Pl.names=["grid-row-align"];zy.exports=Pl});var Wy=v((E4,Uy)=>{l();var P_=R(),er=class extends P_{keyframeParents(e){let{parent:t}=e;for(;t;){if(t.type==="atrule"&&t.name==="keyframes")return!0;({parent:t}=t)}return!1}contain3d(e){if(e.prop==="transform-origin")return!1;for(let t of er.functions3d)if(e.value.includes(`${t}(`))return!0;return!1}set(e,t){return e=super.set(e,t),t==="-ms-"&&(e.value=e.value.replace(/rotatez/gi,"rotate")),e}insert(e,t,r){if(t==="-ms-"){if(!this.contain3d(e)&&!this.keyframeParents(e))return super.insert(e,t,r)}else if(t==="-o-"){if(!this.contain3d(e))return super.insert(e,t,r)}else return super.insert(e,t,r)}};er.names=["transform","transform-origin"];er.functions3d=["matrix3d","translate3d","translateZ","scale3d","scaleZ","rotate3d","rotateX","rotateY","perspective"];Uy.exports=er});var Yy=v((T4,Hy)=>{l();var Gy=he(),D_=R(),Dl=class extends D_{normalize(){return"flex-direction"}insert(e,t,r){let n;if([n,t]=Gy(t),n!==2009)return super.insert(e,t,r);if(e.parent.some(f=>f.prop===t+"box-orient"||f.prop===t+"box-direction"))return;let s=e.value,o,u;s==="inherit"||s==="initial"||s==="unset"?(o=s,u=s):(o=s.includes("row")?"horizontal":"vertical",u=s.includes("reverse")?"reverse":"normal");let c=this.clone(e);return c.prop=t+"box-orient",c.value=o,this.needCascade(e)&&(c.raws.before=this.calcBefore(r,e,t)),e.parent.insertBefore(e,c),c=this.clone(e),c.prop=t+"box-direction",c.value=u,this.needCascade(e)&&(c.raws.before=this.calcBefore(r,e,t)),e.parent.insertBefore(e,c)}old(e,t){let r;return[r,t]=Gy(t),r===2009?[t+"box-orient",t+"box-direction"]:super.old(e,t)}};Dl.names=["flex-direction","box-direction","box-orient"];Hy.exports=Dl});var Jy=v((P4,Qy)=>{l();var I_=R(),Il=class extends I_{check(e){return e.value==="pixelated"}prefixed(e,t){return t==="-ms-"?"-ms-interpolation-mode":super.prefixed(e,t)}set(e,t){return t!=="-ms-"?super.set(e,t):(e.prop="-ms-interpolation-mode",e.value="nearest-neighbor",e)}normalize(){return"image-rendering"}process(e,t){return super.process(e,t)}};Il.names=["image-rendering","interpolation-mode"];Qy.exports=Il});var Ky=v((D4,Xy)=>{l();var q_=R(),R_=fe(),ql=class extends q_{constructor(e,t,r){super(e,t,r);this.prefixes&&(this.prefixes=R_.uniq(this.prefixes.map(n=>n==="-ms-"?"-webkit-":n)))}};ql.names=["backdrop-filter"];Xy.exports=ql});var ew=v((I4,Zy)=>{l();var M_=R(),B_=fe(),Rl=class extends M_{constructor(e,t,r){super(e,t,r);this.prefixes&&(this.prefixes=B_.uniq(this.prefixes.map(n=>n==="-ms-"?"-webkit-":n)))}check(e){return e.value.toLowerCase()==="text"}};Rl.names=["background-clip"];Zy.exports=Rl});var rw=v((q4,tw)=>{l();var F_=R(),N_=["none","underline","overline","line-through","blink","inherit","initial","unset"],Ml=class extends F_{check(e){return e.value.split(/\\s+/).some(t=>!N_.includes(t))}};Ml.names=["text-decoration"];tw.exports=Ml});var sw=v((R4,nw)=>{l();var iw=he(),L_=R(),tr=class extends L_{prefixed(e,t){let r;return[r,t]=iw(t),r===2009?t+"box-pack":r===2012?t+"flex-pack":super.prefixed(e,t)}normalize(){return"justify-content"}set(e,t){let r=iw(t)[0];if(r===2009||r===2012){let n=tr.oldValues[e.value]||e.value;if(e.value=n,r!==2009||n!=="distribute")return super.set(e,t)}else if(r==="final")return super.set(e,t)}};tr.names=["justify-content","flex-pack","box-pack"];tr.oldValues={"flex-end":"end","flex-start":"start","space-between":"justify","space-around":"distribute"};nw.exports=tr});var ow=v((M4,aw)=>{l();var $_=R(),Bl=class extends $_{set(e,t){let r=e.value.toLowerCase();return t==="-webkit-"&&!r.includes(" ")&&r!=="contain"&&r!=="cover"&&(e.value=e.value+" "+e.value),super.set(e,t)}};Bl.names=["background-size"];aw.exports=Bl});var uw=v((B4,lw)=>{l();var j_=R(),Fl=ht(),Nl=class extends j_{insert(e,t,r){if(t!=="-ms-")return super.insert(e,t,r);let n=Fl.parse(e),[a,s]=Fl.translate(n,0,1);n[0]&&n[0].includes("span")&&(s=n[0].join("").replace(/\\D/g,"")),[[e.prop,a],[`${e.prop}-span`,s]].forEach(([u,c])=>{Fl.insertDecl(e,u,c)})}};Nl.names=["grid-row","grid-column"];lw.exports=Nl});var pw=v((F4,cw)=>{l();var z_=R(),{prefixTrackProp:fw,prefixTrackValue:V_,autoplaceGridItems:U_,getGridGap:W_,inheritGridGap:G_}=ht(),H_=il(),Ll=class extends z_{prefixed(e,t){return t==="-ms-"?fw({prop:e,prefix:t}):super.prefixed(e,t)}normalize(e){return e.replace(/^grid-(rows|columns)/,"grid-template-$1")}insert(e,t,r,n){if(t!=="-ms-")return super.insert(e,t,r);let{parent:a,prop:s,value:o}=e,u=s.includes("rows"),c=s.includes("columns"),f=a.some(k=>k.prop==="grid-template"||k.prop==="grid-template-areas");if(f&&u)return!1;let d=new H_({options:{}}),p=d.gridStatus(a,n),m=W_(e);m=G_(e,m)||m;let w=u?m.row:m.column;(p==="no-autoplace"||p===!0)&&!f&&(w=null);let x=V_({value:o,gap:w});e.cloneBefore({prop:fw({prop:s,prefix:t}),value:x});let y=a.nodes.find(k=>k.prop==="grid-auto-flow"),b="row";if(y&&!d.disabled(y,n)&&(b=y.value.trim()),p==="autoplace"){let k=a.nodes.find(_=>_.prop==="grid-template-rows");if(!k&&f)return;if(!k&&!f){e.warn(n,"Autoplacement does not work without grid-template-rows property");return}!a.nodes.find(_=>_.prop==="grid-template-columns")&&!f&&e.warn(n,"Autoplacement does not work without grid-template-columns property"),c&&!f&&U_(e,n,m,b)}}};Ll.names=["grid-template-rows","grid-template-columns","grid-rows","grid-columns"];cw.exports=Ll});var hw=v((N4,dw)=>{l();var Y_=R(),$l=class extends Y_{check(e){return!e.value.includes("flex-")&&e.value!=="baseline"}prefixed(e,t){return t+"grid-column-align"}normalize(){return"justify-self"}};$l.names=["grid-column-align"];dw.exports=$l});var gw=v((L4,mw)=>{l();var Q_=R(),jl=class extends Q_{prefixed(e,t){return t+"scroll-chaining"}normalize(){return"overscroll-behavior"}set(e,t){return e.value==="auto"?e.value="chained":(e.value==="none"||e.value==="contain")&&(e.value="none"),super.set(e,t)}};jl.names=["overscroll-behavior","scroll-chaining"];mw.exports=jl});var bw=v(($4,ww)=>{l();var J_=R(),{parseGridAreas:X_,warnMissedAreas:K_,prefixTrackProp:Z_,prefixTrackValue:yw,getGridGap:e5,warnGridGap:t5,inheritGridGap:r5}=ht();function i5(i){return i.trim().slice(1,-1).split(/["\']\\s*["\']?/g)}var zl=class extends J_{insert(e,t,r,n){if(t!=="-ms-")return super.insert(e,t,r);let a=!1,s=!1,o=e.parent,u=e5(e);u=r5(e,u)||u,o.walkDecls(/-ms-grid-rows/,d=>d.remove()),o.walkDecls(/grid-template-(rows|columns)/,d=>{if(d.prop==="grid-template-rows"){s=!0;let{prop:p,value:m}=d;d.cloneBefore({prop:Z_({prop:p,prefix:t}),value:yw({value:m,gap:u.row})})}else a=!0});let c=i5(e.value);a&&!s&&u.row&&c.length>1&&e.cloneBefore({prop:"-ms-grid-rows",value:yw({value:`repeat(${c.length}, auto)`,gap:u.row}),raws:{}}),t5({gap:u,hasColumns:a,decl:e,result:n});let f=X_({rows:c,gap:u});return K_(f,e,n),e}};zl.names=["grid-template-areas"];ww.exports=zl});var xw=v((j4,vw)=>{l();var n5=R(),Vl=class extends n5{set(e,t){return t==="-webkit-"&&(e.value=e.value.replace(/\\s*(right|left)\\s*/i,"")),super.set(e,t)}};Vl.names=["text-emphasis-position"];vw.exports=Vl});var Sw=v((z4,kw)=>{l();var s5=R(),Ul=class extends s5{set(e,t){return e.prop==="text-decoration-skip-ink"&&e.value==="auto"?(e.prop=t+"text-decoration-skip",e.value="ink",e):super.set(e,t)}};Ul.names=["text-decoration-skip-ink","text-decoration-skip"];kw.exports=Ul});var Tw=v((V4,Ew)=>{l();"use strict";Ew.exports={wrap:Cw,limit:Aw,validate:_w,test:Wl,curry:a5,name:Ow};function Cw(i,e,t){var r=e-i;return((t-i)%r+r)%r+i}function Aw(i,e,t){return Math.max(i,Math.min(e,t))}function _w(i,e,t,r,n){if(!Wl(i,e,t,r,n))throw new Error(t+" is outside of range ["+i+","+e+")");return t}function Wl(i,e,t,r,n){return!(t<i||t>e||n&&t===e||r&&t===i)}function Ow(i,e,t,r){return(t?"(":"[")+i+","+e+(r?")":"]")}function a5(i,e,t,r){var n=Ow.bind(null,i,e,t,r);return{wrap:Cw.bind(null,i,e),limit:Aw.bind(null,i,e),validate:function(a){return _w(i,e,a,t,r)},test:function(a){return Wl(i,e,a,t,r)},toString:n,name:n}}});var Iw=v((U4,Dw)=>{l();var Gl=Gn(),o5=Tw(),l5=Gt(),u5=ke(),f5=fe(),Pw=/top|left|right|bottom/gi,Qe=class extends u5{replace(e,t){let r=Gl(e);for(let n of r.nodes)if(n.type==="function"&&n.value===this.name)if(n.nodes=this.newDirection(n.nodes),n.nodes=this.normalize(n.nodes),t==="-webkit- old"){if(!this.oldWebkit(n))return!1}else n.nodes=this.convertDirection(n.nodes),n.value=t+n.value;return r.toString()}replaceFirst(e,...t){return t.map(n=>n===" "?{type:"space",value:n}:{type:"word",value:n}).concat(e.slice(1))}normalizeUnit(e,t){return`${parseFloat(e)/t*360}deg`}normalize(e){if(!e[0])return e;if(/-?\\d+(.\\d+)?grad/.test(e[0].value))e[0].value=this.normalizeUnit(e[0].value,400);else if(/-?\\d+(.\\d+)?rad/.test(e[0].value))e[0].value=this.normalizeUnit(e[0].value,2*Math.PI);else if(/-?\\d+(.\\d+)?turn/.test(e[0].value))e[0].value=this.normalizeUnit(e[0].value,1);else if(e[0].value.includes("deg")){let t=parseFloat(e[0].value);t=o5.wrap(0,360,t),e[0].value=`${t}deg`}return e[0].value==="0deg"?e=this.replaceFirst(e,"to"," ","top"):e[0].value==="90deg"?e=this.replaceFirst(e,"to"," ","right"):e[0].value==="180deg"?e=this.replaceFirst(e,"to"," ","bottom"):e[0].value==="270deg"&&(e=this.replaceFirst(e,"to"," ","left")),e}newDirection(e){if(e[0].value==="to"||(Pw.lastIndex=0,!Pw.test(e[0].value)))return e;e.unshift({type:"word",value:"to"},{type:"space",value:" "});for(let t=2;t<e.length&&e[t].type!=="div";t++)e[t].type==="word"&&(e[t].value=this.revertDirection(e[t].value));return e}isRadial(e){let t="before";for(let r of e)if(t==="before"&&r.type==="space")t="at";else if(t==="at"&&r.value==="at")t="after";else{if(t==="after"&&r.type==="space")return!0;if(r.type==="div")break;t="before"}return!1}convertDirection(e){return e.length>0&&(e[0].value==="to"?this.fixDirection(e):e[0].value.includes("deg")?this.fixAngle(e):this.isRadial(e)&&this.fixRadial(e)),e}fixDirection(e){e.splice(0,2);for(let t of e){if(t.type==="div")break;t.type==="word"&&(t.value=this.revertDirection(t.value))}}fixAngle(e){let t=e[0].value;t=parseFloat(t),t=Math.abs(450-t)%360,t=this.roundFloat(t,3),e[0].value=`${t}deg`}fixRadial(e){let t=[],r=[],n,a,s,o,u;for(o=0;o<e.length-2;o++)if(n=e[o],a=e[o+1],s=e[o+2],n.type==="space"&&a.value==="at"&&s.type==="space"){u=o+3;break}else t.push(n);let c;for(o=u;o<e.length;o++)if(e[o].type==="div"){c=e[o];break}else r.push(e[o]);e.splice(0,o,...r,c,...t)}revertDirection(e){return Qe.directions[e.toLowerCase()]||e}roundFloat(e,t){return parseFloat(e.toFixed(t))}oldWebkit(e){let{nodes:t}=e,r=Gl.stringify(e.nodes);if(this.name!=="linear-gradient"||t[0]&&t[0].value.includes("deg")||r.includes("px")||r.includes("-corner")||r.includes("-side"))return!1;let n=[[]];for(let a of t)n[n.length-1].push(a),a.type==="div"&&a.value===","&&n.push([]);this.oldDirection(n),this.colorStops(n),e.nodes=[];for(let a of n)e.nodes=e.nodes.concat(a);return e.nodes.unshift({type:"word",value:"linear"},this.cloneDiv(e.nodes)),e.value="-webkit-gradient",!0}oldDirection(e){let t=this.cloneDiv(e[0]);if(e[0][0].value!=="to")return e.unshift([{type:"word",value:Qe.oldDirections.bottom},t]);{let r=[];for(let a of e[0].slice(2))a.type==="word"&&r.push(a.value.toLowerCase());r=r.join(" ");let n=Qe.oldDirections[r]||r;return e[0]=[{type:"word",value:n},t],e[0]}}cloneDiv(e){for(let t of e)if(t.type==="div"&&t.value===",")return t;return{type:"div",value:",",after:" "}}colorStops(e){let t=[];for(let r=0;r<e.length;r++){let n,a=e[r],s;if(r===0)continue;let o=Gl.stringify(a[0]);a[1]&&a[1].type==="word"?n=a[1].value:a[2]&&a[2].type==="word"&&(n=a[2].value);let u;r===1&&(!n||n==="0%")?u=`from(${o})`:r===e.length-1&&(!n||n==="100%")?u=`to(${o})`:n?u=`color-stop(${n}, ${o})`:u=`color-stop(${o})`;let c=a[a.length-1];e[r]=[{type:"word",value:u}],c.type==="div"&&c.value===","&&(s=e[r].push(c)),t.push(s)}return t}old(e){if(e==="-webkit-"){let t=this.name==="linear-gradient"?"linear":"radial",r="-gradient",n=f5.regexp(`-webkit-(${t}-gradient|gradient\\\\(\\\\s*${t})`,!1);return new l5(this.name,e+this.name,r,n)}else return super.old(e)}add(e,t){let r=e.prop;if(r.includes("mask")){if(t==="-webkit-"||t==="-webkit- old")return super.add(e,t)}else if(r==="list-style"||r==="list-style-image"||r==="content"){if(t==="-webkit-"||t==="-webkit- old")return super.add(e,t)}else return super.add(e,t)}};Qe.names=["linear-gradient","repeating-linear-gradient","radial-gradient","repeating-radial-gradient"];Qe.directions={top:"bottom",left:"right",bottom:"top",right:"left"};Qe.oldDirections={top:"left bottom, left top",left:"right top, left top",bottom:"left top, left bottom",right:"left top, right top","top right":"left bottom, right top","top left":"right bottom, left top","right top":"left bottom, right top","right bottom":"left top, right bottom","bottom right":"left top, right bottom","bottom left":"right top, left bottom","left top":"right bottom, left top","left bottom":"right top, left bottom"};Dw.exports=Qe});var Mw=v((W4,Rw)=>{l();var c5=Gt(),p5=ke();function qw(i){return new RegExp(`(^|[\\\\s,(])(${i}($|[\\\\s),]))`,"gi")}var Hl=class extends p5{regexp(){return this.regexpCache||(this.regexpCache=qw(this.name)),this.regexpCache}isStretch(){return this.name==="stretch"||this.name==="fill"||this.name==="fill-available"}replace(e,t){return t==="-moz-"&&this.isStretch()?e.replace(this.regexp(),"$1-moz-available$3"):t==="-webkit-"&&this.isStretch()?e.replace(this.regexp(),"$1-webkit-fill-available$3"):super.replace(e,t)}old(e){let t=e+this.name;return this.isStretch()&&(e==="-moz-"?t="-moz-available":e==="-webkit-"&&(t="-webkit-fill-available")),new c5(this.name,t,t,qw(t))}add(e,t){if(!(e.prop.includes("grid")&&t!=="-webkit-"))return super.add(e,t)}};Hl.names=["max-content","min-content","fit-content","fill","fill-available","stretch"];Rw.exports=Hl});var Nw=v((G4,Fw)=>{l();var Bw=Gt(),d5=ke(),Yl=class extends d5{replace(e,t){return t==="-webkit-"?e.replace(this.regexp(),"$1-webkit-optimize-contrast"):t==="-moz-"?e.replace(this.regexp(),"$1-moz-crisp-edges"):super.replace(e,t)}old(e){return e==="-webkit-"?new Bw(this.name,"-webkit-optimize-contrast"):e==="-moz-"?new Bw(this.name,"-moz-crisp-edges"):super.old(e)}};Yl.names=["pixelated"];Fw.exports=Yl});var $w=v((H4,Lw)=>{l();var h5=ke(),Ql=class extends h5{replace(e,t){let r=super.replace(e,t);return t==="-webkit-"&&(r=r.replace(/("[^"]+"|\'[^\']+\')(\\s+\\d+\\w)/gi,"url($1)$2")),r}};Ql.names=["image-set"];Lw.exports=Ql});var zw=v((Y4,jw)=>{l();var m5=ge().list,g5=ke(),Jl=class extends g5{replace(e,t){return m5.space(e).map(r=>{if(r.slice(0,+this.name.length+1)!==this.name+"(")return r;let n=r.lastIndexOf(")"),a=r.slice(n+1),s=r.slice(this.name.length+1,n);if(t==="-webkit-"){let o=s.match(/\\d*.?\\d+%?/);o?(s=s.slice(o[0].length).trim(),s+=`, ${o[0]}`):s+=", 0.5"}return t+this.name+"("+s+")"+a}).join(" ")}};Jl.names=["cross-fade"];jw.exports=Jl});var Uw=v((Q4,Vw)=>{l();var y5=he(),w5=Gt(),b5=ke(),Xl=class extends b5{constructor(e,t){super(e,t);e==="display-flex"&&(this.name="flex")}check(e){return e.prop==="display"&&e.value===this.name}prefixed(e){let t,r;return[t,e]=y5(e),t===2009?this.name==="flex"?r="box":r="inline-box":t===2012?this.name==="flex"?r="flexbox":r="inline-flexbox":t==="final"&&(r=this.name),e+r}replace(e,t){return this.prefixed(t)}old(e){let t=this.prefixed(e);if(!!t)return new w5(this.name,t)}};Xl.names=["display-flex","inline-flex"];Vw.exports=Xl});var Gw=v((J4,Ww)=>{l();var v5=ke(),Kl=class extends v5{constructor(e,t){super(e,t);e==="display-grid"&&(this.name="grid")}check(e){return e.prop==="display"&&e.value===this.name}};Kl.names=["display-grid","inline-grid"];Ww.exports=Kl});var Yw=v((X4,Hw)=>{l();var x5=ke(),Zl=class extends x5{constructor(e,t){super(e,t);e==="filter-function"&&(this.name="filter")}};Zl.names=["filter","filter-function"];Hw.exports=Zl});var Kw=v((K4,Xw)=>{l();var Qw=ii(),M=R(),Jw=Dm(),k5=Qm(),S5=il(),C5=hg(),eu=pt(),rr=Ht(),A5=kg(),Le=ke(),ir=fe(),_5=Cg(),O5=_g(),E5=Eg(),T5=Pg(),P5=Mg(),D5=Ng(),I5=$g(),q5=zg(),R5=Ug(),M5=Gg(),B5=Yg(),F5=Jg(),N5=Kg(),L5=ey(),$5=ry(),j5=sy(),z5=oy(),V5=fy(),U5=py(),W5=hy(),G5=yy(),H5=by(),Y5=ky(),Q5=Cy(),J5=_y(),X5=Ey(),K5=Py(),Z5=qy(),eO=My(),tO=Fy(),rO=Ly(),iO=jy(),nO=Vy(),sO=Wy(),aO=Yy(),oO=Jy(),lO=Ky(),uO=ew(),fO=rw(),cO=sw(),pO=ow(),dO=uw(),hO=pw(),mO=hw(),gO=gw(),yO=bw(),wO=xw(),bO=Sw(),vO=Iw(),xO=Mw(),kO=Nw(),SO=$w(),CO=zw(),AO=Uw(),_O=Gw(),OO=Yw();rr.hack(_5);rr.hack(O5);rr.hack(E5);rr.hack(T5);M.hack(P5);M.hack(D5);M.hack(I5);M.hack(q5);M.hack(R5);M.hack(M5);M.hack(B5);M.hack(F5);M.hack(N5);M.hack(L5);M.hack($5);M.hack(j5);M.hack(z5);M.hack(V5);M.hack(U5);M.hack(W5);M.hack(G5);M.hack(H5);M.hack(Y5);M.hack(Q5);M.hack(J5);M.hack(X5);M.hack(K5);M.hack(Z5);M.hack(eO);M.hack(tO);M.hack(rO);M.hack(iO);M.hack(nO);M.hack(sO);M.hack(aO);M.hack(oO);M.hack(lO);M.hack(uO);M.hack(fO);M.hack(cO);M.hack(pO);M.hack(dO);M.hack(hO);M.hack(mO);M.hack(gO);M.hack(yO);M.hack(wO);M.hack(bO);Le.hack(vO);Le.hack(xO);Le.hack(kO);Le.hack(SO);Le.hack(CO);Le.hack(AO);Le.hack(_O);Le.hack(OO);var tu=new Map,si=class{constructor(e,t,r={}){this.data=e,this.browsers=t,this.options=r,[this.add,this.remove]=this.preprocess(this.select(this.data)),this.transition=new k5(this),this.processor=new S5(this)}cleaner(){if(this.cleanerCache)return this.cleanerCache;if(this.browsers.selected.length){let e=new eu(this.browsers.data,[]);this.cleanerCache=new si(this.data,e,this.options)}else return this;return this.cleanerCache}select(e){let t={add:{},remove:{}};for(let r in e){let n=e[r],a=n.browsers.map(u=>{let c=u.split(" ");return{browser:`${c[0]} ${c[1]}`,note:c[2]}}),s=a.filter(u=>u.note).map(u=>`${this.browsers.prefix(u.browser)} ${u.note}`);s=ir.uniq(s),a=a.filter(u=>this.browsers.isSelected(u.browser)).map(u=>{let c=this.browsers.prefix(u.browser);return u.note?`${c} ${u.note}`:c}),a=this.sort(ir.uniq(a)),this.options.flexbox==="no-2009"&&(a=a.filter(u=>!u.includes("2009")));let o=n.browsers.map(u=>this.browsers.prefix(u));n.mistakes&&(o=o.concat(n.mistakes)),o=o.concat(s),o=ir.uniq(o),a.length?(t.add[r]=a,a.length<o.length&&(t.remove[r]=o.filter(u=>!a.includes(u)))):t.remove[r]=o}return t}sort(e){return e.sort((t,r)=>{let n=ir.removeNote(t).length,a=ir.removeNote(r).length;return n===a?r.length-t.length:a-n})}preprocess(e){let t={selectors:[],"@supports":new C5(si,this)};for(let n in e.add){let a=e.add[n];if(n==="@keyframes"||n==="@viewport")t[n]=new A5(n,a,this);else if(n==="@resolution")t[n]=new Jw(n,a,this);else if(this.data[n].selector)t.selectors.push(rr.load(n,a,this));else{let s=this.data[n].props;if(s){let o=Le.load(n,a,this);for(let u of s)t[u]||(t[u]={values:[]}),t[u].values.push(o)}else{let o=t[n]&&t[n].values||[];t[n]=M.load(n,a,this),t[n].values=o}}}let r={selectors:[]};for(let n in e.remove){let a=e.remove[n];if(this.data[n].selector){let s=rr.load(n,a);for(let o of a)r.selectors.push(s.old(o))}else if(n==="@keyframes"||n==="@viewport")for(let s of a){let o=`@${s}${n.slice(1)}`;r[o]={remove:!0}}else if(n==="@resolution")r[n]=new Jw(n,a,this);else{let s=this.data[n].props;if(s){let o=Le.load(n,[],this);for(let u of a){let c=o.old(u);if(c)for(let f of s)r[f]||(r[f]={}),r[f].values||(r[f].values=[]),r[f].values.push(c)}}else for(let o of a){let u=this.decl(n).old(n,o);if(n==="align-self"){let c=t[n]&&t[n].prefixes;if(c){if(o==="-webkit- 2009"&&c.includes("-webkit-"))continue;if(o==="-webkit-"&&c.includes("-webkit- 2009"))continue}}for(let c of u)r[c]||(r[c]={}),r[c].remove=!0}}}return[t,r]}decl(e){return tu.has(e)||tu.set(e,M.load(e)),tu.get(e)}unprefixed(e){let t=this.normalize(Qw.unprefixed(e));return t==="flex-direction"&&(t="flex-flow"),t}normalize(e){return this.decl(e).normalize(e)}prefixed(e,t){return e=Qw.unprefixed(e),this.decl(e).prefixed(e,t)}values(e,t){let r=this[e],n=r["*"]&&r["*"].values,a=r[t]&&r[t].values;return n&&a?ir.uniq(n.concat(a)):n||a||[]}group(e){let t=e.parent,r=t.index(e),{length:n}=t.nodes,a=this.unprefixed(e.prop),s=(o,u)=>{for(r+=o;r>=0&&r<n;){let c=t.nodes[r];if(c.type==="decl"){if(o===-1&&c.prop===a&&!eu.withPrefix(c.value)||this.unprefixed(c.prop)!==a)break;if(u(c)===!0)return!0;if(o===1&&c.prop===a&&!eu.withPrefix(c.value))break}r+=o}return!1};return{up(o){return s(-1,o)},down(o){return s(1,o)}}}};Xw.exports=si});var eb=v((Z4,Zw)=>{l();Zw.exports={"backdrop-filter":{feature:"css-backdrop-filter",browsers:["ios_saf 16.1","ios_saf 16.3","ios_saf 16.4","ios_saf 16.5","safari 16.5"]},element:{props:["background","background-image","border-image","mask","list-style","list-style-image","content","mask-image"],feature:"css-element-function",browsers:["firefox 114"]},"user-select":{mistakes:["-khtml-"],feature:"user-select-none",browsers:["ios_saf 16.1","ios_saf 16.3","ios_saf 16.4","ios_saf 16.5","safari 16.5"]},"background-clip":{feature:"background-clip-text",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},hyphens:{feature:"css-hyphens",browsers:["ios_saf 16.1","ios_saf 16.3","ios_saf 16.4","ios_saf 16.5","safari 16.5"]},fill:{props:["width","min-width","max-width","height","min-height","max-height","inline-size","min-inline-size","max-inline-size","block-size","min-block-size","max-block-size","grid","grid-template","grid-template-rows","grid-template-columns","grid-auto-columns","grid-auto-rows"],feature:"intrinsic-width",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},"fill-available":{props:["width","min-width","max-width","height","min-height","max-height","inline-size","min-inline-size","max-inline-size","block-size","min-block-size","max-block-size","grid","grid-template","grid-template-rows","grid-template-columns","grid-auto-columns","grid-auto-rows"],feature:"intrinsic-width",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},stretch:{props:["width","min-width","max-width","height","min-height","max-height","inline-size","min-inline-size","max-inline-size","block-size","min-block-size","max-block-size","grid","grid-template","grid-template-rows","grid-template-columns","grid-auto-columns","grid-auto-rows"],feature:"intrinsic-width",browsers:["firefox 114"]},"fit-content":{props:["width","min-width","max-width","height","min-height","max-height","inline-size","min-inline-size","max-inline-size","block-size","min-block-size","max-block-size","grid","grid-template","grid-template-rows","grid-template-columns","grid-auto-columns","grid-auto-rows"],feature:"intrinsic-width",browsers:["firefox 114"]},"text-decoration-style":{feature:"text-decoration",browsers:["ios_saf 16.1","ios_saf 16.3","ios_saf 16.4","ios_saf 16.5"]},"text-decoration-color":{feature:"text-decoration",browsers:["ios_saf 16.1","ios_saf 16.3","ios_saf 16.4","ios_saf 16.5"]},"text-decoration-line":{feature:"text-decoration",browsers:["ios_saf 16.1","ios_saf 16.3","ios_saf 16.4","ios_saf 16.5"]},"text-decoration":{feature:"text-decoration",browsers:["ios_saf 16.1","ios_saf 16.3","ios_saf 16.4","ios_saf 16.5"]},"text-decoration-skip":{feature:"text-decoration",browsers:["ios_saf 16.1","ios_saf 16.3","ios_saf 16.4","ios_saf 16.5"]},"text-decoration-skip-ink":{feature:"text-decoration",browsers:["ios_saf 16.1","ios_saf 16.3","ios_saf 16.4","ios_saf 16.5"]},"text-size-adjust":{feature:"text-size-adjust",browsers:["ios_saf 16.1","ios_saf 16.3","ios_saf 16.4","ios_saf 16.5"]},"mask-clip":{feature:"css-masks",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},"mask-composite":{feature:"css-masks",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},"mask-image":{feature:"css-masks",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},"mask-origin":{feature:"css-masks",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},"mask-repeat":{feature:"css-masks",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},"mask-border-repeat":{feature:"css-masks",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},"mask-border-source":{feature:"css-masks",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},mask:{feature:"css-masks",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},"mask-position":{feature:"css-masks",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},"mask-size":{feature:"css-masks",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},"mask-border":{feature:"css-masks",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},"mask-border-outset":{feature:"css-masks",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},"mask-border-width":{feature:"css-masks",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},"mask-border-slice":{feature:"css-masks",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},"clip-path":{feature:"css-clip-path",browsers:["samsung 21"]},"box-decoration-break":{feature:"css-boxdecorationbreak",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","ios_saf 16.1","ios_saf 16.3","ios_saf 16.4","ios_saf 16.5","opera 99","safari 16.5","samsung 21"]},appearance:{feature:"css-appearance",browsers:["samsung 21"]},"image-set":{props:["background","background-image","border-image","cursor","mask","mask-image","list-style","list-style-image","content"],feature:"css-image-set",browsers:["and_uc 15.5","chrome 109","samsung 21"]},"cross-fade":{props:["background","background-image","border-image","mask","list-style","list-style-image","content","mask-image"],feature:"css-cross-fade",browsers:["and_chr 114","and_uc 15.5","chrome 109","chrome 113","chrome 114","edge 114","opera 99","samsung 21"]},isolate:{props:["unicode-bidi"],feature:"css-unicode-bidi",browsers:["ios_saf 16.1","ios_saf 16.3","ios_saf 16.4","ios_saf 16.5","safari 16.5"]},"color-adjust":{feature:"css-color-adjust",browsers:["chrome 109","chrome 113","chrome 114","edge 114","opera 99"]}}});var rb=v((eq,tb)=>{l();tb.exports={}});var ab=v((tq,sb)=>{l();var EO=Wo(),{agents:TO}=($n(),Ln),ru=ym(),PO=pt(),DO=Kw(),IO=eb(),qO=rb(),ib={browsers:TO,prefixes:IO},nb=`\n  Replace Autoprefixer \\`browsers\\` option to Browserslist config.\n  Use \\`browserslist\\` key in \\`package.json\\` or \\`.browserslistrc\\` file.\n\n  Using \\`browsers\\` option can cause errors. Browserslist config can\n  be used for Babel, Autoprefixer, postcss-normalize and other tools.\n\n  If you really need to use option, rename it to \\`overrideBrowserslist\\`.\n\n  Learn more at:\n  https://github.com/browserslist/browserslist#readme\n  https://twitter.com/browserslist\n\n`;function RO(i){return Object.prototype.toString.apply(i)==="[object Object]"}var iu=new Map;function MO(i,e){e.browsers.selected.length!==0&&(e.add.selectors.length>0||Object.keys(e.add).length>2||i.warn(`Autoprefixer target browsers do not need any prefixes.You do not need Autoprefixer anymore.\nCheck your Browserslist config to be sure that your targets are set up correctly.\n\n  Learn more at:\n  https://github.com/postcss/autoprefixer#readme\n  https://github.com/browserslist/browserslist#readme\n\n`))}sb.exports=nr;function nr(...i){let e;if(i.length===1&&RO(i[0])?(e=i[0],i=void 0):i.length===0||i.length===1&&!i[0]?i=void 0:i.length<=2&&(Array.isArray(i[0])||!i[0])?(e=i[1],i=i[0]):typeof i[i.length-1]=="object"&&(e=i.pop()),e||(e={}),e.browser)throw new Error("Change `browser` option to `overrideBrowserslist` in Autoprefixer");if(e.browserslist)throw new Error("Change `browserslist` option to `overrideBrowserslist` in Autoprefixer");e.overrideBrowserslist?i=e.overrideBrowserslist:e.browsers&&(typeof console!="undefined"&&console.warn&&(ru.red?console.warn(ru.red(nb.replace(/`[^`]+`/g,n=>ru.yellow(n.slice(1,-1))))):console.warn(nb)),i=e.browsers);let t={ignoreUnknownVersions:e.ignoreUnknownVersions,stats:e.stats,env:e.env};function r(n){let a=ib,s=new PO(a.browsers,i,n,t),o=s.selected.join(", ")+JSON.stringify(e);return iu.has(o)||iu.set(o,new DO(a.prefixes,s,e)),iu.get(o)}return{postcssPlugin:"autoprefixer",prepare(n){let a=r({from:n.opts.from,env:e.env});return{OnceExit(s){MO(n,a),e.remove!==!1&&a.processor.remove(s,n),e.add!==!1&&a.processor.add(s,n)}}},info(n){return n=n||{},n.from=n.from||h.cwd(),qO(r(n))},options:e,browsers:i}}nr.postcss=!0;nr.data=ib;nr.defaults=EO.defaults;nr.info=()=>nr().info()});var ob={};Ae(ob,{default:()=>BO});var BO,lb=C(()=>{l();BO=[]});var fb={};Ae(fb,{default:()=>FO});var ub,FO,cb=C(()=>{l();hi();ub=K(bi()),FO=Ze(ub.default.theme)});var db={};Ae(db,{default:()=>NO});var pb,NO,hb=C(()=>{l();hi();pb=K(bi()),NO=Ze(pb.default)});l();"use strict";var LO=Je(mm()),$O=Je(ge()),jO=Je(ab()),zO=Je((lb(),ob)),VO=Je((cb(),fb)),UO=Je((hb(),db)),WO=Je((Zn(),ku)),GO=Je((wo(),yo)),HO=Je((hs(),tf));function Je(i){return i&&i.__esModule?i:{default:i}};var Hn="tailwind",nu="text/tailwindcss",mb="/template.html",xt,gb=!0,yb=0,su=new Set,au,wb="",bb=(i=!1)=>({get(e,t){return(!i||t==="config")&&typeof e[t]=="object"&&e[t]!==null?new Proxy(e[t],bb()):e[t]},set(e,t,r){return e[t]=r,(!i||t==="config")&&ou(!0),!0}});window[Hn]=new Proxy({config:{},defaultTheme:VO.default,defaultConfig:UO.default,colors:WO.default,plugin:GO.default,resolveConfig:HO.default},bb(!0));function vb(i){au.observe(i,{attributes:!0,attributeFilter:["type"],characterData:!0,subtree:!0,childList:!0})}new MutationObserver(async i=>{let e=!1;if(!au){au=new MutationObserver(async()=>await ou(!0));for(let t of document.querySelectorAll(`style[type="${nu}"]`))vb(t)}for(let t of i)for(let r of t.addedNodes)r.nodeType===1&&r.tagName==="STYLE"&&r.getAttribute("type")===nu&&(vb(r),e=!0);await ou(e)}).observe(document.documentElement,{attributes:!0,attributeFilter:["class"],childList:!0,subtree:!0});async function ou(i=!1){i&&(yb++,su.clear());let e="";for(let r of document.querySelectorAll(`style[type="${nu}"]`))e+=r.textContent;let t=new Set;for(let r of document.querySelectorAll("[class]"))for(let n of r.classList)su.has(n)||t.add(n);if(document.body&&(gb||t.size>0||e!==wb||!xt||!xt.isConnected)){for(let n of t)su.add(n);gb=!1,wb=e,self[mb]=Array.from(t).join(" ");let{css:r}=await(0,$O.default)([(0,LO.default)({...window[Hn].config,_hash:yb,content:[mb],plugins:[...zO.default,...Array.isArray(window[Hn].config.plugins)?window[Hn].config.plugins:[]]}),(0,jO.default)({remove:!1})]).process(`@tailwind base;@tailwind components;@tailwind utilities;${e}`);(!xt||!xt.isConnected)&&(xt=document.createElement("style"),document.head.append(xt)),xt.textContent=r}}})();',F=`@tailwind base;
@tailwind components;
@tailwind utilities;`,U=`import {
    createApp
} from 'vue'
import App from '@/App.vue'

const app = createApp(App)

app.mount('#app')`,z=`{
    "homepage": "https://vueplay.com",
    "name": "@vueplayground/demo",
    "version": "1.0.0",
    "type": "module",
    "scripts": {
        "dev": "vite",
        "build": "vite build"
    },
    "dependencies": {
        "vue": "^3.4.19",
        "vue-router": "^4.2.5"
    },
    "devDependencies": {
        "@rollup/plugin-data-uri": "^1.0.3",
        "@vitejs/plugin-vue": "^5.0.4",
        "rollup-plugin-gzip": "^3.1.1",
        "vite": "^5.1.3",
        "tailwindcss": "^3.4.1",
        "autoprefixer": "^10.4.17",
        "postcss": "^8.4.35"
    }
}`,y={inject:["fs","compiler","account"],emits:["init","rendered","loaded"],props:["routerOverlay","ast","navmenu","sidemenu","mobile","events","full","lazy","path","renderKey","timeline","tailwind","alwaysMount"],created(){j(this.fs,()=>this.$emit("init")&&this.renderIframe())},data:()=>({vendor:{},rendering:!1,css:"",template:""}),watch:{"code.script"(t){t?this.renderIframe():this.clear()},"code.style"(t){this.setStyle(t)},"code.template"(t){this.setTemplate(t)},events(){this.setTemplate(this.code.template)},renderKey(){this.renderIframe()},rendering(t){t||this.$emit("loaded")}},computed:{code(){return this.compiler.stringify(this.ast,!1,!0,!0,!0,!0)},getHeight(){return this.timeline?this.full?"140px":"274px":this.full?"40px":"174px"},getTop(){return this.full?"0px":"92px"},getTopMobile(){const t=this.full?"0px":"92px";return this.activeMenu?"92px":t},getHeightMobile(){return this.timeline?this.activeMenu?"70% - 182px":this.getHeight:this.activeMenu?"70% - 82px":this.getHeight},activeMenu(){return this.navmenu!=="0px"||this.sidemenu!=="0px"}},methods:{async master(){var u,d,h;let t=`
        let renderTemplate = reactive({ value: '', inited: false, mounted: false })
        window.h = h
        window.compile = compile
        window.replaceAsync = async (str, regex, asyncFn) => {
          let promises = []
          str.replace(regex, (match, ...args) => {
            const promise = asyncFn(match, ...args)
            promises.push(promise)
          })
          const data = await Promise.all(promises)
          return str.replace(regex, () => data.shift())
        }
        window.load = (currentPath, path, reload, escape) => {
          const id = Math.random().toString(36).replace(/[^a-z]+/g, '').substring(0, 7)
          return new Promise(resolve => {
            const listener = window.addEventListener('message', e => {
              if (
                e.data.event === 'loaded-path' &&
                e.data.id === id
              ) {
                window.removeEventListener('message', listener)
                resolve(e.data.path)
              }
            })
            window.parent.postMessage({
              event: 'load',
              currentPath,
              path,
              reload,
              escape,
              id
            }, window.origin)
          })
        }
      `,e=`
        render(ctx, cache) {
          if (renderTemplate.inited && (!renderTemplate.mounted || vueux.alwaysMount)) {
            renderTemplate.mounted = true
            this.$nextTick(() => {
              if (this.VuePlayMountedCallback) this.VuePlayMountedCallback() // Options API
              if (VuePlayMountedCallback) VuePlayMountedCallback() // Composition API
            })
          }
          
          // Fix positions after render
          this.$nextTick(() => {
            // Cache scoped stylesheets
            if (window.scopeCache && window.scopeCache.on.length) {
              window.scopeCache.off = JSON.parse(JSON.stringify(window.scopeCache.on))
              window.scopeCache.on = []
            }
            document.body.dispatchEvent(new CustomEvent('render'))
          })
          return h(compile(renderTemplate.value)(ctx, cache))
        }
      `,i=`
        ${t}
        let APP = { ${e} }
      `,r=this.code.script||"";r=r.replace("<script>",""),r.indexOf("export default{")>=0&&(r=r.replace("export default{",`
          ${t}
          let APP = { ${e},
        `),r=r.slice(0,r.lastIndexOf("}"))+"}");let o=this.mockup(),n=this.lazy?U:await(await fetch(await a(this.path,"/src/main.js",!0,[this.path]))).text();o&&(n=`import mockup from '${o}'
`+n),n=n.replace(/({[\s\S]*?createApp)/,"$1, reactive, compile, h, isVNode"),n=n.replace("import App","// import App");let s=this.path!=="/src/App.vue"||((h=(d=(u=this.account)==null?void 0:u.project)==null?void 0:d.data)==null?void 0:h.component);return n=n.replace("const app = createApp(App)",`
        ${r||i}
        `+(s?`
          const app = createApp({
            template: '<suspense><APP/></suspense>',
            components: { APP }
          })
        `:`
          const app = createApp(APP)
        `)+`
        
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

        ${o?"mockup(app)":""}

        vueux.listener = val => {

          renderTemplate.value = val

          renderTemplate.inited = true

        }

        vueux.app = app

        
        if (typeof router !== 'undefined') {

          vueux.router = router

        }

      `),n},async setStyle(t){t=await l(t,/(?:url\()(.*?)(?=\))/g,async(e,i)=>{let r=await a(this.path,i);return e.replace(i,r)}),t=await l(t,/(?:url\(')(.*?)(?='\))/g,async(e,i)=>{let r=await a(this.path,i);return e.replace(i,r)}),t=await l(t,/(?:url\(")(.*?)(?="\))/g,async(e,i)=>{let r=await a(this.path,i);return e.replace(i,r)}),this.css=t.replaceAll("@blob","blob")},async setTemplate(t){t=await l(t,/(?:\=")(.*?)(?=")/g,async(e,i)=>{let r=await a(this.path,i);return e.replace(i,r)}),t=t.replaceAll("@blob","blob"),this.events||(t=t.replaceAll("@click","@click-disabled")),this.template="",this.$nextTick(()=>this.template=t)},async addModule(t){let e=document.createElement("script");return e.type="text/javascript",t=t.trim(),t=t.replace("<script>","").replace("<\/script>",""),e.setAttribute("type","module"),e.src=await S(this.path,t),e},addMap(t){let e=document.createElement("script");return e.setAttribute("type","importmap"),e.innerHTML=t.trim(),e},addScript(t){let e=document.createElement("script");return e.innerHTML=t.trim(),e},addStyle(t){let e=document.createElement("hgroup");return e.innerHTML=t,e},async renderIframe(){if(this.rendering)setTimeout(()=>this.renderIframe(),50);else{this.rendering=!0,M();let t=await this.master(),e=await this.addModule(t+`

          let origin = '${window.origin}'
          ${$}
        `),i=document.getElementById("iframe-container"),r=document.createElement("iframe");r.setAttribute("id","builder");try{r.setAttribute("srcdoc",await this.iframeContent())}catch{return this.rendering=!1,this.clear()}i.innerHTML="",i.appendChild(r),r.onload=async()=>{await this.iframeInit(r,e),setTimeout(()=>this.rendering=!1)}}},clear(){let t=document.getElementById("iframe-container");t.innerHTML=""},async importTailwind(){try{if(!this.tailwind&&!this.lazy&&await this.fs.stat("/tailwind.config.js"),this.tailwind||!this.lazy)return`<script src="${URL.createObjectURL(new Blob([B],{type:"text/javascript"}))}"><\/script>`}catch{}return""},async importMap(){let t=JSON.parse(this.lazy?z:await this.fs.readFile("/package.json",{encoding:"utf8"})),e={imports:{}};for(const i of Object.keys(t.dependencies)){const r=t.dependencies[i];r.startsWith("http")||r.startsWith("git")?e.imports[i]=r:i==="vue"?e.imports[i]=await a(this.path,"vue"):i==="vue-router"?e.imports[i]=await a(this.path,"vue-router"):i==="template-compiler"?e.imports[i]=await a(this.path,"template-compiler"):e.imports[i]="https://cdn.jsdelivr.net/npm/"+i+"@"+r+"/+esm"}return`<script type="importmap">
${JSON.stringify(e,null,2)}
<\/script>`},async iframeContent(){return`
        <!doctype html>
        <html>
          <head>
            ${await this.importMap()}
            ${await this.importTailwind()}
            <script>
              const vueux = {
                init: true,
                alwaysMount: ${this.alwaysMount?"true":"false"},
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
            <\/script>
            ${this.lazy&&this.tailwind?`<style>
${F}
</style>`:""}
          </head>
          <body>
            <div id="app"></div>
          </body>
        </html>
      `},async iframeInit(t,e){try{t.contentDocument.body.appendChild(this.$refs.receiver),t.contentDocument.head.appendChild(e),t.contentDocument.head.appendChild(this.addStyle("")),this.$emit("rendered")}catch(i){t.contentDocument.body.innerHTML=i.message}},mockup(){var i,r,o;let t=(o=(r=(i=this.account)==null?void 0:i.project)==null?void 0:r.data)==null?void 0:o.provide;if(!t)return!1;let e="";try{e=new TextDecoder().decode(t)}catch(n){console.log(n)}return e?URL.createObjectURL(new Blob([x.transpile(e,{module:"ESNext"})],{type:"text/javascript"})):!1}}},b=()=>{P(t=>({ea8da58e:t.getTopMobile,"484ece87":t.getHeightMobile,"4269446a":t.navmenu,cb9ae664:t.sidemenu,"974dd492":t.getTop,"35dd4985":t.getHeight}))},w=y.setup;y.setup=w?(t,e)=>(b(),w(t,e)):b;const V=["html","styling","path","routerOverlay","alwaysMount","full"],q=k("div",{id:"iframe-container"},null,-1);function W(t,e,i,r,o,n){return E(),T("div",{class:R([{mobile:i.mobile,full:i.full},"playground"])},[O(k("div",{id:"receiver",ref:"receiver",html:t.template,styling:t.css,path:i.path,routerOverlay:i.routerOverlay,alwaysMount:i.alwaysMount,full:i.full},null,8,V),[[I,!1]]),q],2)}const K=A(y,[["render",W]]);export{K as S,a as l,D as r};
