import{S as Re}from"./SectionRenderer-CWr6ipPp.js";import{S as Ke,a as Ee,b as De,c as Ae,d as Fe,e as We,f as He,T as Le,M as Be,g as Oe,h as ze,i as Ue,j as Ve,k as Xe,N as Ge,s as w,l as b,m as pe}from"./index-Dge_aIgK.js";import{S as qe,M as Je,A as Qe,s as Ye,j as fe,H as he}from"./ast-D7KK25_4.js";import{_ as Ze,c as d,a,d as m,n as u,f as ye,t as g,g as ve,h as T,v as C,b as v,i as k,u as $e,r as p,o as r}from"./index-BPi9N1fW.js";import"./compiler-DAeNYoVm.js";import"./ModalProfileSubscriptionPricing-D-5usdd8.js";const P={props:["doc"],inject:["services","fs","account","packer","compiler","broadcaster","pkg","gitserver"],components:{SectionRenderer:Re,SectionTree:Ke,SectionStyles:Ee,SectionVue:De,SectionFiles:qe,SectionRoutes:Ae,SectionDeploy:Fe,SectionTimeline:We,SectionBreadcrumb:He,Transform:Le,ModalEditor:Je,ModalMenu:Be,ModalProfile:Oe,ModalElements:ze,ModalStylesheets:Ue,ModalRules:Ve,ModalKeyframes:Xe,Navigator:Ge},data:()=>({componentRouteMappings:[],lockBroadcast:!1,editorWindow:null,editorWindows:[],route:"/",modified:!1,breakpoint:null,timeline:!1,keyframesName:"",keyframesTimeline:null,previewWindows:[],code:null,before:null,after:null,inside:null,storingonline:!1,moving:null,insert:null,mainMenu:!1,profile:!1,routerOverlay:localStorage.getItem("routerOverlay")!==null?localStorage.getItem("routerOverlay")==="true":!1,showTransform:!0,showPosition:!1,alwaysMount:!1,events:!1,renderKey:0,fsItem:null,fsItemTitle:"",mobile:!1,navigator:!0,menu:!0,width:0,layers:"files",layerStyle:null,layerRule:null,layerKeyframe:null,stylesheets:!1,rules:!1,keyframes:!1,storing:!1,selected:null,selectedParent:null,selectedType:null,ast:new Qe,tempId:null,server:Ye,widthNavmenu:localStorage.getItem("widthNavmenu")||250,widthSidemenu:localStorage.getItem("widthSidemenu")||250,dragNavigator:!1,dragSidemenu:!1,landscape:!1,undoCount:0,redoCount:0,historyLock:!1,syncing:!1,loadingSync:!1}),computed:{admin(){var e;return(e=this.account.globalRoles)==null?void 0:e.includes("admin")},premium(){var e,t,n;return(n=(t=(e=this.account)==null?void 0:e.subscriptions)==null?void 0:t.data)==null?void 0:n.length},emptyProject(){var e;return!this.fsItem||!((e=this.account.project.data)!=null&&e.id)},bottomTabsHeight(){return"42px"},navmenu(){return this.navigator?this.mobile?"100%":this.widthNavmenu+"px":"0px"},sidemenu(){return this.menu?this.mobile?"100%":this.widthSidemenu+"px":"0px"},activeMenu(){return this.navmenu!=="0px"||this.sidemenu!=="0px"},breadcrumbBottom(){return this.timeline?"142px":"42px"},editorsTopMobile(){const e=this.timeline?this.activeMenu?"calc(30% - 50px)":"50px":this.activeMenu?"calc(30% + 50px)":"50px";return this.landscape?"50px":e},transformToolsHeight(){return this.timeline?"calc(100% - 92px - 100px - 42px - 40px)":"calc(100% - 92px - 42px - 40px)"},transformToolsHeightMobile(){return this.timeline?this.activeMenu?"calc(30% - 100px - 42px - 40px)":"calc(100vh - 92px - 100px - 42px - 40px)":this.activeMenu?"calc(30% - 42px - 40px)":"calc(100vh - 92px - 42px - 40px)"},mobileMenuHeight(){return this.landscape?"100%":"70%"}},watch:{ast:{handler(){this.sendToWindow(this.editorWindow)},deep:!0},routerOverlay(){localStorage.setItem("routerOverlay",this.routerOverlay)},async"account.project.data.id"(){var e,t;this.route="/",this.undoCount=0,this.redoCount=0,await w("undoHistory",{}),await w("redoHistory",{}),this.modified=await this.packer.gitModified(),this.fsItem=null,((t=(e=this.account.project)==null?void 0:e.data)==null?void 0:t.type)==="vue-sfc"?this.layers="component":this.layers="files"},"account.main"(e){this.ast.parse(e)},async"account.filepath"(e){var n;if(e===((n=this.fsItem)==null?void 0:n.path))return;let t=this.account.filepath.split("/");try{let o=await this.fs.stat(this.account.filepath);this.fsItem={title:t[t.length-1],path:this.account.filepath,...o}}catch{this.fsItem=null}},async fsItem(e,t){var l,i,f,h;if(e!=null&&e.path.endsWith(".vue")){this.selected=null,this.selectedType=null,this.getNavTitle(),this.account.filepath=e.path;try{this.account.main=await this.fs.readFile(e.path,{encoding:"utf8"}),((i=(l=this.account.project)==null?void 0:l.data)==null?void 0:i.type)==="vue-sfc"&&(this.layers="component")}catch{this.account.main=""}}const n=await b("undoHistory"),o=await b("redoHistory");this.undoCount=((f=n==null?void 0:n[e==null?void 0:e.path])==null?void 0:f.length)||0,this.redoCount=((h=o==null?void 0:o[e==null?void 0:e.path])==null?void 0:h.length)||0,this.modified=await this.packer.gitModified()},async selected(e){var t;this.getNavTitle(),(e==null?void 0:e.type)==="keyframes"?(this.keyframesTimeline||(this.timeline=!0),this.keyframesName=e.name,this.keyframesTimeline=e.keyframes):(e==null?void 0:e.type)==="keyframe"?(this.keyframesTimeline||(this.timeline=!0),this.keyframesName=((t=e==null?void 0:e.parent)==null?void 0:t.name)||"?",this.keyframesTimeline=this.selectedParent):(this.keyframesName="",this.keyframesTimeline=null,this.timeline=!1)}},async created(){var t,n;if(window.addEventListener("beforeunload",this.handleBeforeUnload),this.broadcaster.onmessage=async o=>{var l,i,f,h,y,M,I;if(!((l=o.data)!=null&&l.id)!==((h=(f=(i=this.account)==null?void 0:i.project)==null?void 0:f.data)==null?void 0:h.id)&&(o.data.reload&&await this.reload(!1),(y=this.fsItem)!=null&&y.path.endsWith(".vue")&&((M=this.fsItem)==null?void 0:M.path)===((I=o.data)==null?void 0:I.path)))try{this.account.main=await this.fs.readFile(this.fsItem.path,{encoding:"utf8"})}catch(j){console.log(j)}},this.ast.listen(async o=>{o&&(o!=null&&o.attrs)&&(this.selected=o),await this.save()}),this.account.filepath&&((t=this.account)==null?void 0:t.filepath)!==((n=this.fsItem)==null?void 0:n.path)){let o=this.account.filepath.split("/");try{let l=await this.fs.stat(this.account.filepath);this.fsItem={title:o[o.length-1],path:this.account.filepath,...l}}catch{this.fsItem=null}}const e={};onkeydown=onkeyup=async o=>{["INPUT","TEXTAREA"].includes(o.target.nodeName.toUpperCase())||(o.type==="keydown"&&(o.key.toLowerCase()==="meta"||o.key.toLowerCase()==="control")?e.meta=!0:o.type==="keyup"&&(o.key.toLowerCase()==="meta"||o.key.toLowerCase()==="control")?e.meta=!1:o.type==="keydown"&&o.key.toLowerCase()==="z"?e.z=!0:o.type==="keyup"&&o.key.toLowerCase()==="z"?e.z=!1:o.type==="keydown"&&o.key.toLowerCase()==="shift"?e.shift=!0:o.type==="keyup"&&o.key.toLowerCase()==="shift"&&(e.shift=!1),o.key.toLowerCase()==="z"&&(o.preventDefault(),e.meta&&e.shift&&e.z?await this.redo():e.meta&&e.z&&await this.undo()))}},async mounted(){this.isMobile(),this.navigator=!this.mobile,this.menu=!this.mobile,window.addEventListener("resize",()=>this.isMobile()),this.ast.parse(this.account.main)},destroyed(){window.removeEventListener("beforeunload",this.handleBeforeUnload)},methods:{handleBeforeUnload(){if(this.editorWindow&&this.editorWindow.close(),this.editors.length){for(const e of this.editorWindows)e.closed||e.close();this.editorWindows=[]}},async sync(e="web"){this.loadingSync=!0,await this.fs.sync(e),this.fs.watch(async()=>{await this.reload()}),this.syncing=!0,this.loadingSync=!1},syncOff(){this.fs.syncOff(),this.syncing=!1,this.loadingSync=!1},async redo(){var l;const e=await b("undoHistory"),t=await b("redoHistory");let n=this.fsItem;if(!n||!n.title.includes(".vue")||!((l=t[n.path])!=null&&l.length))return;let o=t[n.path][t[n.path].length-1];t[n.path].pop(),e[n.path]||(e[n.path]=[]),e[n.path].push(this.ast.stringify()),this.undoCount=e==null?void 0:e[n.path].length,this.redoCount=t==null?void 0:t[n.path].length,await w("undoHistory",e),await w("redoHistory",t),await this.save(o,!1),this.account.main=o,this.ast.parse(o)},async undo(){var l;const e=await b("undoHistory"),t=await b("redoHistory");let n=this.fsItem;if(!n||!n.title.includes(".vue")||!((l=e[n.path])!=null&&l.length))return;let o=e[n.path][e[n.path].length-1];e[n.path].pop(),t[n.path]||(t[n.path]=[]),t[n.path].push(this.ast.stringify()),this.undoCount=e==null?void 0:e[n.path].length,this.redoCount=t==null?void 0:t[n.path].length,await w("undoHistory",e),await w("redoHistory",t),await this.save(o,!1),this.account.main=o,this.ast.parse(o)},fixFontImport(e){this.ast.addGoogleFont(e)},draggingNavigator(e){var n;let t=(n=e==null?void 0:e.touches)!=null&&n.length?e.touches[0]:e;this.widthNavmenu=t.clientX,localStorage.setItem("widthNavmenu",this.widthNavmenu)},draggingSidemenu(e){var n;let t=(n=e==null?void 0:e.touches)!=null&&n.length?e.touches[0]:e;this.widthSidemenu=window.innerWidth-t.clientX,localStorage.setItem("widthSidemenu",this.widthSidemenu)},async remove(e){this.selected&&this.ast.id(this.selected)===this.ast.id(e)&&(this.selected=null,this.selectedType=null,this.getNavTitle()),await this.ast.remove(e)},async removeSafe(e){if(this.selectedType==="style"){let t=-1,n=0;for(const o of this.selectedParent||[]){if(o===this.selected){t=n;break}n++}t>-1&&(this.selectedParent.splice(t,1),await this.save())}else this.selected&&this.ast.id(this.selected)===this.ast.id(e)&&(this.selected=null,this.selectedType=null,this.getNavTitle()),await this.ast.remove(e)},async drop(e){var t,n,o,l,i,f;if(e!=null&&e.target){const h=!((f=(i=(l=(o=(n=(t=this.ast)==null?void 0:t.AST)==null?void 0:n.html)==null?void 0:o[0])==null?void 0:l[0])==null?void 0:i.children)!=null&&f.filter(y=>y.type!=="text").length);if(this.insert)["top","left"].includes(e.position)?await this.ast.before(e.target,this.insert):["bottom","right"].includes(e.position)?await this.ast.after(e.target,this.insert):await this.ast.inside(e.target,this.insert);else return await this.domove(e);this.insert=this.moving=null,await this.save(),h&&await this.reload()}else this.insert=this.moving=null},async domove(e){var t;if(this.moving){let n=(t=this.moving)!=null&&t.sid?this.ast.search(this.moving.sid):this.moving;["top","left"].includes(e.position)?(await this.ast.remove(n),await this.ast.before(e.target,n)):["bottom","right"].includes(e.position)?(await this.ast.remove(n),await this.ast.after(e.target,n)):(await this.ast.remove(n),await this.ast.inside(e.target,n)),await this.save()}this.insert=this.moving=null},getNavTitle(){var e;this.selectedType==="element"?this.fsItemTitle=((e=this.selected)==null?void 0:e.name)||"":this.selectedType==="style"&&this.selected.type==="rule"?this.fsItemTitle=this.selected.selectors.join(", "):this.selectedType==="style"&&this.selected.type==="font-face"?this.fsItemTitle=this.selected.type:this.selectedType==="style"&&this.selected.type==="keyframe"?this.fsItemTitle=this.selected.values.join(", "):this.selected?this.fsItemTitle=this.selected.type:this.fsItemTitle=this.fsItem.title},async reload(e=!0){var t,n,o,l;try{await this.fs.stat((t=this.fsItem)==null?void 0:t.path),this.selected=null,this.selectedType=null,this.account.main=await this.fs.readFile(this.fsItem.path,{encoding:"utf8"}),this.modified=await this.packer.gitModified(),this.ast.parse(this.account.main),e&&this.broadcaster.postMessage({id:(l=(o=(n=this.account)==null?void 0:n.project)==null?void 0:o.data)==null?void 0:l.id,reload:!0})}catch{}this.renderKey++},isMobile(){let e=window.innerWidth;this.width>900&&e<=900?(this.navigator=!1,this.menu=!1):this.width<=900&&e>900&&(this.navigator=!0,this.menu=!0),this.width=e,this.mobile=this.width<=900,this.landscape=e>window.innerHeight},async move(e){await this.ast.remove(e.bullet),e.inside?await this.ast.inside(e.target,e.bullet):await this.ast.after(e.target,e.bullet),this.moving=null,await this.save()},async insertion(e){var n,o,l,i,f,h;const t=!((h=(f=(i=(l=(o=(n=this.ast)==null?void 0:n.AST)==null?void 0:o.html)==null?void 0:l[0])==null?void 0:i[0])==null?void 0:f.children)!=null&&h.filter(y=>y.type!=="text").length);e.inside?await this.ast.inside(e.target,e.bullet):await this.ast.after(e.target,e.bullet),this.insert=null,await this.save(),t&&await this.reload()},async add(e){var n,o,l,i,f,h;const t=!((h=(f=(i=(l=(o=(n=this.ast)==null?void 0:n.AST)==null?void 0:o.html)==null?void 0:l[0])==null?void 0:i[0])==null?void 0:f.children)!=null&&h.filter(y=>y.type!=="text").length);this.before?await this.ast.before(this.before,e):this.after?await this.ast.after(this.after,e):this.inside?await this.ast.inside(this.inside,e):await this.ast.init(e),this.before=this.after=this.inside=null,await this.save(),t&&await this.reload()},appendStyle(e){this.layerStyle=e,this.stylesheets=!0},async addStyle(e){this.stylesheets=!1,this.layerStyle.parent.splice(this.layerStyle.index,0,e),await this.save()},async removeStyle(e){e.parent.splice(e.index,1),await this.save()},async appendRule(e){this.layerRule=e,this.rules=!0,await this.save()},async addRule(e){this.rules=!1,this.layerRule.parent.splice(this.layerRule.index,0,e),await this.save()},async removeRule(e){e.parent.splice(e.index,1),await this.save()},async appendKeyframe(e){this.layerKeyframe=e,this.keyframes=!0,await this.save()},async addKeyframe(e){this.keyframes=!1,this.layerKeyframe.parent.splice(this.layerKeyframe.index,0,e);const t=new Intl.Collator(void 0,{numeric:!0,sensitivity:"base"});this.layerKeyframe.parent.sort((n,o)=>{var l,i;return t.compare((l=n.values)==null?void 0:l[0],(i=o.values)==null?void 0:i[0])}),await this.save()},async deleteKeyframe(e){e.parent.splice(e.index,1),await this.save()},async save(e=this.ast.stringify(),t=!0){let n=this.fsItem;if(n&&n.title.includes(".vue")){const o=await this.fs.readFile(n.path,{encoding:"utf8"});if(e=fe.html(e.replace("<template><",`<template>
<`),he),t&&e!==o&&!this.historyLock){this.historyLock=!0;const l=await b("undoHistory"),i=await b("redoHistory");l[n.path]||(l[n.path]=[]),i[n.path]||(i[n.path]=[]),l[n.path].push(o),l[n.path].slice(-500),i[n.path]=[],this.undoCount=l==null?void 0:l[n.path].length,this.redoCount=i==null?void 0:i[n.path].length,await w("undoHistory",l),await w("redoHistory",i),setTimeout(()=>{this.historyLock=!1},100)}await this.fs.writeFile(n.path,e.trim(),{encoding:"utf8"}),this.modified=await this.packer.gitModified(!0),this.broadcaster.postMessage({id:this.account.project.data.id,path:this.fsItem.path})}},async getCode(){if(this.mobile)this.code=await this.fs.readFile(this.fsItem.path,{encoding:"utf8"});else if(!this.editorWindow||this.editorWindow.closed){const e=await this.fs.readFile(this.fsItem.path,{encoding:"utf8"});this.editorWindow=pe(e),this.editorWindow.addEventListener("message",async t=>{t.data.event==="content-parent"&&(this.lockBroadcast=!0,this.account.main=t.data.content,this.$nextTick(async()=>{await this.save(),this.selected&&(this.selected=this.ast.search(this.ast.id(this.selected)))}))})}else this.editorWindow.focus()},async sendToWindow(e){if(e&&!this.lockBroadcast){let t=this.ast.stringify();t=fe.html(t.replace("<template><",`<template>
<`),he),e.postMessage({event:"content",content:t.trim()},"*")}this.$nextTick(()=>{this.lockBroadcast=!1})},async store(){var e;this.storingonline=!0,(e=this.account.project.data)!=null&&e.id?await this.update():await this.create(),this.storingonline=!1,this.modified=await this.packer.gitModified()},async update(){let e=Date.now();this.account.progress.save=0,this.admin&&console.log("Committing changes",0),await this.packer.gitSave(this.admin,e),this.account.progress.save=30,this.admin&&console.log("Pushing to internal git repo new",Date.now()-e);let t=await this.services.users.authentication.getAccessToken();await this.packer.gitPush(`${this.gitserver}/git/${this.account.project.data.uuid}`,o=>{this.account.progress.save=30+o.progress*60},{"authorization-x":"Bearer "+t}),this.account.progress.save=90,this.admin&&console.log("Updating meta data.",Date.now()-e);let n=!1;try{await this.fs.stat("/tailwind.config.js"),n=!0}catch{}this.account.project.data=await this.services.manager.service("applications").patch(this.account.project.data.id,{title:this.account.project.data.title,slug:this.account.project.data.slug,description:this.account.project.data.description,icon:this.account.project.data.icon,tailwind:n}),this.account.project.data.type,this.account.progress.save=100,this.admin&&console.log("Saving to localstorage",Date.now()-e),this.account.save(),this.account.progress.save=null},async create(){var e,t,n;if((n=(t=(e=this.account)==null?void 0:e.project)==null?void 0:t.data)!=null&&n.title)await this.packer.gitSave(),this.account.project.data=await this.services.manager.service("applications").create(this.account.project.data),this.account.save(),await this.update();else{let o=prompt("Title");if(!o)return alert("A title is required");await this.packer.gitSave(),this.account.project.data=await this.services.manager.service("applications").create({title:o}),this.account.save(),await this.update()}},preview(){this.open(location.protocol+"//"+location.host+"/live-preview")},open(e){window.open(e,"_blank")},async openEditor(e){let t=await this.fs.readFile(e,{encoding:"utf8"}),n=this.editorWindows.find(o=>o.path===e);!n||n.window.closed?(n={window:pe(t,e,e),path:e},n.window.addEventListener("message",async o=>{if(o.data.event==="content-parent"&&o.data.path===e){await this.fs.writeFile(e,o.data.content,{encoding:"utf8"});let l=this.selected;await this.reload(),this.$nextTick(async()=>{l&&(this.selected=this.ast.search(this.ast.id(l)))})}}),this.editorWindows.push(n),await this.sendToFileWindow(n,t,e)):n.window.focus()},async sendToFileWindow(e,t,n){e.window.postMessage({event:"content",content:t,path:n},"*")}}},ge=()=>{$e(e=>({"7e59859b":e.editorsTopMobile,fdba721c:e.mobileMenuHeight,"7595e710":e.navmenu,"70dfc680":e.sidemenu,"782ff7cc":e.bottomTabsHeight,48465550:e.breadcrumbBottom,"098df4e2":e.transformToolsHeightMobile,f4b9dfc0:e.transformToolsHeight}))},we=P.setup;P.setup=we?(e,t)=>(ge(),we(e,t)):ge;const xe={id:"tools"},_e=["title"],et={key:0},tt={key:1},st={key:1,class:"code-file"},it=["title"],nt={key:1},ot={key:2,class:"code-file"},at=["title"],lt={key:1},rt={class:"topbar"},dt=["disabled"],ut=["disabled"],mt={key:2,class:"transform-tools welcome"},pt={id:"layers"},ft={class:"tabs"},ht={key:5},yt={class:"tabs-bottom"},vt=["disabled"],gt={class:"infobar"},wt={class:"tools tools--left"},bt={class:"info"},kt={key:0,style:{"margin-right":"5px"}},St={key:1},ct={key:2},Tt={key:3},Ct={key:4},Mt={key:5},It={class:"tools"},jt=["title"],Pt=["title"],Nt={class:"tools-menu--wrapper"},Rt={class:"tools-menu"};function Kt(e,t,n,o,l,i){var N,R,K,E,D,A,F,W,H,L,B,O,z,U,V,X,G,q,J,Q,Y,Z,$,x,_,ee,te,se,ie,ne,oe,ae,le,re,de,ue,me;const f=p("Navigator"),h=p("Transform"),y=p("SectionTimeline"),M=p("SectionBreadcrumb"),I=p("SectionTree"),j=p("SectionStyles"),be=p("SectionFiles"),ke=p("SectionRoutes"),Se=p("SectionDeploy"),ce=p("SectionVue"),Te=p("ModalElements"),Ce=p("ModalStylesheets"),Me=p("ModalRules"),Ie=p("ModalKeyframes"),je=p("ModalMenu"),Pe=p("ModalProfile"),Ne=p("ModalEditor");return r(),d("div",{class:u(["home",{mobile:e.mobile,landscape:e.landscape,mi:e.breakpoint==="mi",sm:e.breakpoint==="sm",md:e.breakpoint==="md",lg:e.breakpoint==="lg",xl:e.breakpoint==="xl",xl2:e.breakpoint==="2xl"}])},[a("div",xe,[a("button",{onClick:t[0]||(t[0]=s=>e.mainMenu=!0),class:"main-menu",title:"Project settings"}),a("div",{title:"Vue Play v"+i.pkg.version,class:"logo",onClick:t[1]||(t[1]=s=>i.open("https://vueplay.com"))},null,8,_e),!i.premium&&!i.admin?(r(),d("button",{key:0,onClick:t[2]||(t[2]=s=>e.profile="Plan"),class:"upgrade",title:"Upgrade to Premium"},[e.mobile?(r(),d("span",tt,"Premium")):(r(),d("span",et,"Get Premium Access")),t[106]||(t[106]=a("span",{style:{color:"yellow"}},"★",-1))])):m("",!0),a("button",{onClick:t[3]||(t[3]=s=>e.profile=!0),class:u(["profile",{"profile-placeholder":!((R=(N=i.account)==null?void 0:N.user)!=null&&R.picture)}]),style:ye({backgroundImage:(E=(K=i.account)==null?void 0:K.user)!=null&&E.picture?"url("+((A=(D=i.account)==null?void 0:D.user)==null?void 0:A.picture)+")":""}),title:"Show profile"},null,6),e.mobile?m("",!0):(r(),d("div",st,[(W=(F=i.account)==null?void 0:F.project)!=null&&W.data?(r(),d("span",{key:0,class:"project-title",title:((L=(H=i.account.project)==null?void 0:H.data)==null?void 0:L.type)==="vue-sfc"?"Components":"Applications",onClick:t[4]||(t[4]=s=>{var S,c;return e.mainMenu=((c=(S=i.account.project)==null?void 0:S.data)==null?void 0:c.type)==="vue-sfc"?"Components":"Applications"})},g((z=(O=(B=i.account)==null?void 0:B.project)==null?void 0:O.data)==null?void 0:z.title),9,it)):m("",!0),(U=e.fsItem)!=null&&U.title?(r(),d("span",nt," / ")):m("",!0),(V=e.fsItem)!=null&&V.title?(r(),d("b",{key:2,class:"project-title",onClick:t[5]||(t[5]=(...s)=>i.getCode&&i.getCode(...s)),title:"Edit code"},[ve(g((X=e.fsItem)==null?void 0:X.title)+" ",1),t[107]||(t[107]=a("div",{class:"code-edit"},null,-1))])):m("",!0)])),e.mobile?(r(),d("div",ot,[(q=(G=i.account)==null?void 0:G.project)!=null&&q.data?(r(),d("span",{key:0,class:"project-title",title:((Q=(J=i.account.project)==null?void 0:J.data)==null?void 0:Q.type)==="vue-sfc"?"Components":"Applications",onClick:t[6]||(t[6]=s=>{var S,c;return e.mainMenu=((c=(S=i.account.project)==null?void 0:S.data)==null?void 0:c.type)==="vue-sfc"?"Components":"Applications"})},g(($=(Z=(Y=i.account)==null?void 0:Y.project)==null?void 0:Z.data)==null?void 0:$.title),9,at)):m("",!0),(x=e.fsItem)!=null&&x.title?(r(),d("br",lt)):m("",!0),(_=e.fsItem)!=null&&_.title?(r(),d("b",{key:2,class:"project-title",onClick:t[7]||(t[7]=(...s)=>i.getCode&&i.getCode(...s)),title:"Edit code"},[ve(g((ee=e.fsItem)==null?void 0:ee.title)+" ",1),t[108]||(t[108]=a("div",{class:"code-edit small"},null,-1))])):m("",!0)])):m("",!0)]),T(v(f,{onSave:t[8]||(t[8]=s=>i.save()),onStore:t[9]||(t[9]=s=>i.store()),onInsert:t[10]||(t[10]=s=>e.insert=s),onChanged:i.reload,onFixFontImport:i.fixFontImport,onBreakpoint:t[11]||(t[11]=s=>e.breakpoint=s),onReload:t[12]||(t[12]=s=>i.reload()),onRemoveComponent:t[13]||(t[13]=s=>i.save().then(()=>i.reload())),onUpgrade:t[14]||(t[14]=s=>e.profile="Plan"),modified:e.modified,breakpoint:e.breakpoint,storingonline:e.storingonline,header:e.fsItemTitle,element:e.selected,parent:e.selectedParent,type:e.selectedType,empty:i.emptyProject,ast:e.ast,path:(te=e.fsItem)==null?void 0:te.path,id:"navigator"},null,8,["onChanged","onFixFontImport","modified","breakpoint","storingonline","header","element","parent","type","empty","ast","path"]),[[C,e.navigator]]),e.mobile?m("",!0):(r(),d("div",{key:0,class:"resizer-navigator",onMousedown:t[15]||(t[15]=s=>e.dragNavigator=!0),onTouchstart:t[16]||(t[16]=s=>e.dragNavigator=!0)},null,32)),e.dragNavigator?(r(),d("div",{key:1,class:"cover",onMousemove:t[17]||(t[17]=(...s)=>i.draggingNavigator&&i.draggingNavigator(...s)),onTouchmove:t[18]||(t[18]=(...s)=>i.draggingNavigator&&i.draggingNavigator(...s)),onMouseup:t[19]||(t[19]=s=>e.dragNavigator=!1),onTouchend:t[20]||(t[20]=s=>e.dragNavigator=!1)},null,32)):m("",!0),v(h,{class:"transform-tools",onSelection:t[21]||(t[21]=s=>(e.selected=e.ast.search(s),e.selectedType="element")),onParent:t[22]||(t[22]=s=>e.selectedParent=s),onSelected:t[23]||(t[23]=s=>e.selected=s),onDrop:i.drop,onMove:t[24]||(t[24]=s=>e.moving=s),onBefore:t[25]||(t[25]=s=>e.before=s),onAfter:t[26]||(t[26]=s=>e.after=s),onInside:t[27]||(t[27]=s=>e.inside=s),onDuplicate:t[28]||(t[28]=s=>e.ast.duplicate(s)),onRemove:i.remove,onRemoveSafe:i.removeSafe,onUndo:i.undo,onRedo:i.redo,onRoute:t[29]||(t[29]=s=>e.route=s),moving:e.moving,insert:e.insert,element:e.selected,parent:e.selectedParent,type:e.selectedType,mobile:e.mobile,showTransform:e.showTransform,showPosition:e.showPosition,ast:e.ast},null,8,["onDrop","onRemove","onRemoveSafe","onUndo","onRedo","moving","insert","element","parent","type","mobile","showTransform","showPosition","ast"]),a("div",rt,[a("button",{title:"Hard reload",onClick:t[30]||(t[30]=s=>i.reload()),class:"screen ref"}),a("button",{onClick:t[31]||(t[31]=s=>e.breakpoint!=="2xl"?e.breakpoint="2xl":e.breakpoint=null),class:u([{active:e.breakpoint==="2xl"},"screen xl2"])},null,2),a("button",{onClick:t[32]||(t[32]=s=>e.breakpoint!=="xl"?e.breakpoint="xl":e.breakpoint=null),class:u([{active:e.breakpoint==="xl"},"screen xl"])},null,2),a("button",{onClick:t[33]||(t[33]=s=>e.breakpoint!=="lg"?e.breakpoint="lg":e.breakpoint=null),class:u([{active:e.breakpoint==="lg"},"screen lg"])},null,2),a("button",{onClick:t[34]||(t[34]=s=>e.breakpoint!=="md"?e.breakpoint="md":e.breakpoint=null),class:u([{active:e.breakpoint==="md"},"screen md"])},null,2),a("button",{onClick:t[35]||(t[35]=s=>e.breakpoint!=="sm"?e.breakpoint="sm":e.breakpoint=null),class:u([{active:e.breakpoint==="sm"},"screen sm"])},null,2),a("button",{onClick:t[36]||(t[36]=s=>e.breakpoint!=="mi"?e.breakpoint="mi":e.breakpoint=null),class:u([{active:e.breakpoint==="mi"},"screen mi"])},null,2),a("button",{class:"undo",onClick:t[37]||(t[37]=s=>i.undo()),disabled:e.undoCount<=0},null,8,dt),a("button",{class:"redo",onClick:t[38]||(t[38]=s=>i.redo()),disabled:e.redoCount<=0},null,8,ut)]),i.emptyProject?(r(),d("div",mt,[t[109]||(t[109]=a("h1",{style:{margin:"35vh 0px 0px"}},"Welcome to",-1)),t[110]||(t[110]=a("h1",{style:{margin:"0px","font-size":"50px",color:"white"}}," Vue Play Studio ",-1)),a("button",{class:"open-project-button",onClick:t[39]||(t[39]=s=>e.mainMenu="Applications")}," Create or Open Project ")])):m("",!0),e.timeline?(r(),k(y,{key:3,class:"timeline",keyframesName:e.keyframesName,keyframes:e.keyframesTimeline,selected:e.selected,onSelection:t[40]||(t[40]=s=>(e.selected=s,e.selectedType="style")),onAddKeyframe:i.appendKeyframe,onDeleteKeyframe:i.deleteKeyframe,onParent:t[41]||(t[41]=s=>e.selectedParent=s),onSave:t[42]||(t[42]=s=>i.save())},null,8,["keyframesName","keyframes","selected","onAddKeyframe","onDeleteKeyframe"])):m("",!0),v(M,{onSelection:t[43]||(t[43]=s=>(e.selected=s,e.selectedType="element")),onSelected:t[44]||(t[44]=s=>e.fsItem=s),onMap:t[45]||(t[45]=s=>e.componentRouteMappings=s),class:"breadcrumbbar",path:(se=e.fsItem)==null?void 0:se.path,ast:e.ast,selected:e.selected,route:e.route,renderKey:e.renderKey},null,8,["path","ast","selected","route","renderKey"]),e.mobile?m("",!0):(r(),d("div",{key:4,class:"resizer-sidemenu",onMousedown:t[46]||(t[46]=s=>e.dragSidemenu=!0),onTouchstart:t[47]||(t[47]=s=>e.dragSidemenu=!0)},null,32)),e.dragSidemenu?(r(),d("div",{key:5,class:"cover",onMousemove:t[48]||(t[48]=(...s)=>i.draggingSidemenu&&i.draggingSidemenu(...s)),onTouchmove:t[49]||(t[49]=(...s)=>i.draggingSidemenu&&i.draggingSidemenu(...s)),onMouseup:t[50]||(t[50]=s=>e.dragSidemenu=!1),onTouchend:t[51]||(t[51]=s=>e.dragSidemenu=!1)},null,32)):m("",!0),T(a("div",{id:"editors",style:ye(e.moving||e.insert?"z-index: 101!important":"")},[T(a("div",pt,[a("div",ft,[a("button",{class:u(["tab component",e.layers==="component"?"active":""]),title:"Layers",onClick:t[52]||(t[52]=s=>e.layers="component")},null,2),a("button",{class:u(["tab style",e.layers==="styles"?"active":""]),title:"Style",onClick:t[53]||(t[53]=s=>e.layers="styles")},null,2),a("button",{class:u(["tab vue",e.layers==="vue"?"active":""]),title:"Options API",onClick:t[54]||(t[54]=s=>e.layers="vue")},null,2)]),e.layers==="component"?(r(),k(I,{key:0,parent:e.ast.html,selected:e.selected,type:e.selectedType,mobile:e.mobile,moving:e.moving?(ie=e.moving)!=null&&ie.sid?e.ast.search((ne=e.moving)==null?void 0:ne.sid):e.moving:"",insert:e.insert,ast:e.ast,onSelection:t[55]||(t[55]=s=>(e.selected=s,e.selectedType="element")),onParent:t[56]||(t[56]=s=>e.selectedParent=s),onDelete:t[57]||(t[57]=s=>i.remove(s)),onBefore:t[58]||(t[58]=s=>e.before=s),onAfter:t[59]||(t[59]=s=>e.after=s),onInside:t[60]||(t[60]=s=>e.inside=s),onDuplicate:t[61]||(t[61]=s=>e.ast.duplicate(s)),onMoveit:t[62]||(t[62]=s=>(e.selected=s,e.selectedType="element",e.$nextTick(()=>{e.moving=s,e.server.send({event:"positions-excluded"})}))),onMove:i.move,onInsert:i.insertion,onDragEnd:t[63]||(t[63]=s=>e.moving=null)},null,8,["parent","selected","type","mobile","moving","insert","ast","onMove","onInsert"])):e.layers==="styles"?(r(),k(j,{key:1,onSelection:t[64]||(t[64]=s=>(e.selected=s,e.selectedType="style")),onParent:t[65]||(t[65]=s=>e.selectedParent=s),onAdd:i.appendStyle,onDelete:i.removeStyle,onAddRule:i.appendRule,onDeleteRule:i.removeRule,onAddKeyframe:i.appendKeyframe,onDeleteKeyframe:i.deleteKeyframe,onSave:t[66]||(t[66]=s=>i.save()),parent:e.ast.css,selected:e.selected},null,8,["onAdd","onDelete","onAddRule","onDeleteRule","onAddKeyframe","onDeleteKeyframe","parent","selected"])):e.layers==="files"?(r(),k(be,{key:2,mobile:e.mobile,selected:e.fsItem,renderKey:e.renderKey,syncing:e.syncing,loadingSync:e.loadingSync,ast:e.ast,onCodeEditor:t[67]||(t[67]=s=>i.openEditor(s)),onSelected:t[68]||(t[68]=s=>e.fsItem=s),onCreate:t[69]||(t[69]=s=>i.reload()),onUpdate:t[70]||(t[70]=s=>i.reload()),onDelete:t[71]||(t[71]=s=>i.reload()),onSync:i.sync,onSyncOff:i.syncOff},null,8,["mobile","selected","renderKey","syncing","loadingSync","ast","onSync","onSyncOff"])):e.layers==="routes"?(r(),k(ke,{key:3,onSelected:t[72]||(t[72]=s=>e.fsItem=s),onRoute:t[73]||(t[73]=s=>e.route=s),onCodeEditor:t[74]||(t[74]=s=>i.openEditor(s)),renderKey:e.renderKey,mappings:e.componentRouteMappings,filepath:(oe=e.fsItem)==null?void 0:oe.path},null,8,["renderKey","mappings","filepath"])):e.layers==="deploy"?(r(),k(Se,{key:4,mobile:e.mobile,ast:e.ast},null,8,["mobile","ast"])):m("",!0),e.ast.js?(r(),d("div",ht,[T(v(ce,{onSave:t[75]||(t[75]=s=>i.save().then(()=>s())),onReload:t[76]||(t[76]=s=>(e.ast.insertcomponent=null,i.reload())),onReset:t[77]||(t[77]=s=>e.ast.insertcomponent=null),parent:e.ast.js,insertcomponent:e.ast.insertcomponent},null,8,["parent","insertcomponent"]),[[C,e.layers==="vue"]])])):m("",!0)],512),[[C,!i.emptyProject]]),T(a("div",yt,[a("button",{class:u(["tab folder",e.layers==="files"?"active":""]),title:"Files",onClick:t[78]||(t[78]=s=>e.layers="files")},null,2),a("button",{class:u(["tab routes",e.layers==="routes"?"active":""]),title:"Routes",disabled:((le=(ae=i.account.project)==null?void 0:ae.data)==null?void 0:le.type)==="vue-sfc",onClick:t[79]||(t[79]=s=>e.layers="routes")},null,10,vt),a("button",{class:u(["tab deploy",e.layers==="deploy"?"active":""]),title:"Deploy",onClick:t[80]||(t[80]=s=>e.layers="deploy")},null,2)],512),[[C,!i.emptyProject]])],4),[[C,e.menu]]),a("div",gt,[a("div",wt,[e.mobile?(r(),d("button",{key:1,title:"Navigator",class:u(["menu left",{active:!e.menu}]),onClick:t[82]||(t[82]=s=>(e.menu=!e.menu,e.navigator=!1))},null,2)):(r(),d("button",{key:0,title:"Navigator",class:u(["menu left",{active:!e.navigator}]),onClick:t[81]||(t[81]=s=>e.navigator=!e.navigator)},null,2))]),a("div",bt,[e.fsItem?(r(),d("span",kt,[t[111]||(t[111]=a("b",null,"File:",-1)),t[112]||(t[112]=a("br",null,null,-1)),a("span",null,g(e.fsItem.title),1)])):m("",!0),e.selectedType==="element"?(r(),d("span",St,[t[113]||(t[113]=a("b",null,"Element:",-1)),t[114]||(t[114]=a("br",null,null,-1)),a("span",null,g(((re=e.selected)==null?void 0:re.name)||"-"),1)])):e.selectedType==="style"&&e.selected.type==="rule"?(r(),d("span",ct,[t[115]||(t[115]=a("b",null,"Selector:",-1)),t[116]||(t[116]=a("br",null,null,-1)),a("span",null,g(e.selected.selectors.join(", ")),1)])):e.selectedType==="style"&&e.selected.type==="font-face"?(r(),d("span",Tt,[t[117]||(t[117]=a("b",null,"Style:",-1)),t[118]||(t[118]=a("br",null,null,-1)),a("span",null,g(e.selected.type),1)])):e.selectedType==="style"&&e.selected.type==="keyframe"?(r(),d("span",Ct,[t[119]||(t[119]=a("b",null,"Keyframe:",-1)),t[120]||(t[120]=a("br",null,null,-1)),a("span",null,g(e.selected.values.join(", ")),1)])):e.selected?(r(),d("span",Mt,[t[121]||(t[121]=a("b",null,"Style:",-1)),t[122]||(t[122]=a("br",null,null,-1)),a("span",null,g(e.selected.type),1)])):m("",!0)]),a("div",It,[e.mobile?(r(),d("button",{key:1,title:"Menu",class:u(["menu",{active:e.navigator}]),onClick:t[84]||(t[84]=s=>(e.navigator=!e.navigator,e.menu=!1))},null,2)):(r(),d("button",{key:0,title:"Menu",class:u(["menu",{active:e.menu}]),onClick:t[83]||(t[83]=s=>e.menu=!e.menu)},null,2)),a("button",{class:"preview",title:"Open live-preview",onClick:t[85]||(t[85]=(...s)=>i.preview&&i.preview(...s))}),a("button",{class:u(["events",{active:e.events}]),title:(e.events?"Disable":"Enable")+" click events",onClick:t[86]||(t[86]=s=>e.events=!e.events)},null,10,jt),a("button",{class:u(["clock",{active:e.timeline}]),title:(e.timeline?"Close":"Open")+" timeline",onClick:t[87]||(t[87]=s=>e.timeline=!e.timeline)},null,10,Pt),a("button",{class:u([{position:e.showPosition,transform:e.showTransform},"tools-button"]),title:"Tools"},[a("div",Nt,[a("div",Rt,[a("button",{class:u(["always-mount",{active:e.alwaysMount}]),title:"Mount on template change",onClick:t[88]||(t[88]=s=>e.alwaysMount=!e.alwaysMount)},null,2),a("button",{class:u(["show-transform",{active:e.showTransform}]),title:"Transform",onClick:t[89]||(t[89]=s=>(e.showTransform=!0,e.showPosition=!1))},null,2),a("button",{class:u(["show-position",{active:e.showPosition}]),title:"Position",onClick:t[90]||(t[90]=s=>(e.showPosition=!0,e.showTransform=!1))},null,2),a("button",{class:u(["show-none",{active:!e.showPosition&&!e.showTransform}]),title:"Hide helpers",onClick:t[91]||(t[91]=s=>(e.showPosition=!1,e.showTransform=!1))},null,2)])])],2)])]),v(Te,{open:e.before||e.after||e.inside,onSelection:t[92]||(t[92]=s=>i.add(s)),onClose:t[93]||(t[93]=s=>e.before=e.after=e.inside=null),onUpgrade:t[94]||(t[94]=s=>(e.before=e.after=e.inside=null,e.profile="Plan"))},null,8,["open"]),v(Ce,{open:e.stylesheets,onClose:t[95]||(t[95]=s=>e.stylesheets=!1),onSelection:t[96]||(t[96]=s=>i.addStyle(s))},null,8,["open"]),v(Me,{open:e.rules,onClose:t[97]||(t[97]=s=>e.rules=!1),onSelection:t[98]||(t[98]=s=>i.addRule(s))},null,8,["open"]),v(Ie,{open:e.keyframes,onClose:t[99]||(t[99]=s=>e.keyframes=!1),onSelection:t[100]||(t[100]=s=>i.addKeyframe(s))},null,8,["open"]),v(je,{mobile:e.mobile,open:e.mainMenu,setPage:e.mainMenu,onClose:t[101]||(t[101]=s=>e.mainMenu=!1),onChanged:i.reload},null,8,["mobile","open","setPage","onChanged"]),v(Pe,{mobile:e.mobile,open:e.profile||!((de=i.account)!=null&&de.user),setPage:e.profile,ast:e.ast,onClose:t[102]||(t[102]=s=>e.profile=!1),onLogout:t[103]||(t[103]=s=>e.profile=!1),onChanged:i.reload},null,8,["mobile","open","setPage","ast","onChanged"]),v(Ne,{open:((ue=e.fsItem)==null?void 0:ue.path)&&e.code,code:e.code,path:(me=e.fsItem)==null?void 0:me.path,language:"vue",onChange:t[104]||(t[104]=s=>i.save(s).then(()=>{i.reload()})),onClose:t[105]||(t[105]=s=>e.code=null)},null,8,["open","code","path"])],2)}const Lt=Ze(P,[["render",Kt],["__scopeId","data-v-23a1a56e"]]);export{Lt as default};