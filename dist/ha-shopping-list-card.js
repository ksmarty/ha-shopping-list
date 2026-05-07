function t(t,e,i,s){var o,n=arguments.length,a=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(i,t,s)},r=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:p,getOwnPropertyDescriptor:d,getOwnPropertyNames:c,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,g=globalThis,m=g.trustedTypes,_=m?m.emptyScript:"",f=g.reactiveElementPolyfillSupport,b=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!l(t,e),$={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&p(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);o?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...c(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const n=o.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const n=this.constructor;if(!1===s&&(o=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??v)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[b("elementProperties")]=new Map,x[b("finalized")]=new Map,f?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,A=t=>t,E=w.trustedTypes,k=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,q="?"+C,P=`<${q}>`,z=document,U=()=>z.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,M="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,R=/>/g,N=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,Q=/"/g,j=/^(?:script|style|textarea|title)$/i,L=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),B=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),V=new WeakMap,F=z.createTreeWalker(z,129);function K(t,e){if(!H(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const a=t.length-1,r=this.parts,[l,p]=((t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":3===e?"<math>":"",a=T;for(let e=0;e<i;e++){const i=t[e];let r,l,p=-1,d=0;for(;d<i.length&&(a.lastIndex=d,l=a.exec(i),null!==l);)d=a.lastIndex,a===T?"!--"===l[1]?a=I:void 0!==l[1]?a=R:void 0!==l[2]?(j.test(l[2])&&(o=RegExp("</"+l[2],"g")),a=N):void 0!==l[3]&&(a=N):a===N?">"===l[0]?(a=o??T,p=-1):void 0===l[1]?p=-2:(p=a.lastIndex-l[2].length,r=l[1],a=void 0===l[3]?N:'"'===l[3]?Q:D):a===Q||a===D?a=N:a===I||a===R?a=T:(a=N,o=void 0);const c=a===N&&t[e+1].startsWith("/>")?" ":"";n+=a===T?i+P:p>=0?(s.push(r),i.slice(0,p)+S+i.slice(p)+C+c):i+C+(-2===p?e:c)}return[K(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]})(t,e);if(this.el=J.createElement(l,i),F.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=F.nextNode())&&r.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=p[n++],i=s.getAttribute(t).split(C),a=/([.?@])?(.*)/.exec(e);r.push({type:1,index:o,name:a[2],strings:i,ctor:"."===a[1]?tt:"?"===a[1]?et:"@"===a[1]?it:Y}),s.removeAttribute(t)}else t.startsWith(C)&&(r.push({type:6,index:o}),s.removeAttribute(t));if(j.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],U()),F.nextNode(),r.push({type:2,index:++o});s.append(t[e],U())}}}else if(8===s.nodeType)if(s.data===q)r.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)r.push({type:7,index:o}),t+=C.length-1}o++}}static createElement(t,e){const i=z.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,s){if(e===B)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=O(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=Z(t,o._$AS(t,e.values),o,s)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??z).importNode(e,!0);F.currentNode=s;let o=F.nextNode(),n=0,a=0,r=i[0];for(;void 0!==r;){if(n===r.index){let e;2===r.type?e=new X(o,o.nextSibling,this,t):1===r.type?e=new r.ctor(o,r.name,r.strings,this,t):6===r.type&&(e=new st(o,this,t)),this._$AV.push(e),r=i[++a]}n!==r?.index&&(o=F.nextNode(),n++)}return F.currentNode=z,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),O(t)?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>H(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(z.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new G(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new J(t)),e}k(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new X(this.O(U()),this.O(U()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=Z(this,t,e,0),n=!O(t)||t!==this._$AH&&t!==B,n&&(this._$AH=t);else{const s=t;let a,r;for(t=o[0],a=0;a<o.length-1;a++)r=Z(this,s[i+a],e,a),r===B&&(r=this._$AH[a]),n||=!O(r)||r!==this._$AH[a],r===W?t=W:t!==W&&(t+=(r??"")+o[a+1]),this._$AH[a]=r}n&&!s&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class et extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class it extends Y{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??W)===B)return;const i=this._$AH,s=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==W&&(i===W||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const ot={I:X},nt=w.litHtmlPolyfillSupport;nt?.(J,X),(w.litHtmlVersions??=[]).push("3.3.2");const at=globalThis;let rt=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new X(e.insertBefore(U(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}};rt._$litElement$=!0,rt.finalized=!0,at.litElementHydrateSupport?.({LitElement:rt});const lt=at.litElementPolyfillSupport;lt?.({LitElement:rt}),(at.litElementVersions??=[]).push("4.2.2");const pt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:v},ct=(t=dt,e,i)=>{const{kind:s,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ht(t){return(e,i)=>"object"==typeof i?ct(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return ht({...t,state:!0,attribute:!1})}const gt=2;let mt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const{I:_t}=ot,ft=t=>t,bt=()=>document.createComment(""),yt=(t,e,i)=>{const s=t._$AA.parentNode,o=void 0===e?t._$AB:e._$AA;if(void 0===i){const e=s.insertBefore(bt(),o),n=s.insertBefore(bt(),o);i=new _t(e,n,t,t.options)}else{const e=i._$AB.nextSibling,n=i._$AM,a=n!==t;if(a){let e;i._$AQ?.(t),i._$AM=t,void 0!==i._$AP&&(e=t._$AU)!==n._$AU&&i._$AP(e)}if(e!==o||a){let t=i._$AA;for(;t!==e;){const e=ft(t).nextSibling;ft(s).insertBefore(t,o),t=e}}}return i},vt=(t,e,i=t)=>(t._$AI(e,i),t),$t={},xt=(t,e=$t)=>t._$AH=e,wt=t=>{t._$AR(),t._$AA.remove()},At=(t,e,i)=>{const s=new Map;for(let o=e;o<=i;o++)s.set(t[o],o);return s},Et=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends mt{constructor(t){if(super(t),t.type!==gt)throw Error("repeat() can only be used in text expressions")}dt(t,e,i){let s;void 0===i?i=e:void 0!==e&&(s=e);const o=[],n=[];let a=0;for(const e of t)o[a]=s?s(e,a):a,n[a]=i(e,a),a++;return{values:n,keys:o}}render(t,e,i){return this.dt(t,e,i).values}update(t,[e,i,s]){const o=(t=>t._$AH)(t),{values:n,keys:a}=this.dt(e,i,s);if(!Array.isArray(o))return this.ut=a,n;const r=this.ut??=[],l=[];let p,d,c=0,h=o.length-1,u=0,g=n.length-1;for(;c<=h&&u<=g;)if(null===o[c])c++;else if(null===o[h])h--;else if(r[c]===a[u])l[u]=vt(o[c],n[u]),c++,u++;else if(r[h]===a[g])l[g]=vt(o[h],n[g]),h--,g--;else if(r[c]===a[g])l[g]=vt(o[c],n[g]),yt(t,l[g+1],o[c]),c++,g--;else if(r[h]===a[u])l[u]=vt(o[h],n[u]),yt(t,o[c],o[h]),h--,u++;else if(void 0===p&&(p=At(a,u,g),d=At(r,c,h)),p.has(r[c]))if(p.has(r[h])){const e=d.get(a[u]),i=void 0!==e?o[e]:null;if(null===i){const e=yt(t,o[c]);vt(e,n[u]),l[u]=e}else l[u]=vt(i,n[u]),yt(t,o[c],i),o[e]=null;u++}else wt(o[h]),h--;else wt(o[c]),c++;for(;u<=g;){const e=yt(t,l[g+1]);vt(e,n[u]),l[u++]=e}for(;c<=h;){const t=o[c++];null!==t&&wt(t)}return this.ut=a,xt(t,l),B}}),kt="shopping-list-card",St="shopping-list-card-editor",Ct={type:`custom:${kt}`,title:"Shopping List",show_header:!0,completed:"bottom",completed_label:"Completed",show_add_input:!0,add_input_position:"bottom",add_button_label:"Add",enable_edit:!0,enable_remove:!0,click_to_check:!0,enable_quantity:!1,quantity_max:0,empty_message:"Nothing on the list",sort:"manual"},qt=/<quantity:\s*(\d+)\s*>/gi;function Pt(t){let e=null;for(const i of t.matchAll(qt)){const t=Number.parseInt(i[1],10);Number.isFinite(t)&&t>0&&(e=t)}return{name:t.replace(qt,"").replace(/\s+/g," ").trim(),quantity:e??1}}function zt(t,e){const i=t.trim();return e<=1?i:`${i} <quantity: ${e}>`}function Ut(t,e){const i=Math.floor(Number(t)||1),s=Math.max(1,i);return e&&e>0?Math.min(s,e):s}const Ot=a`
  /* ─── Tokens ─────────────────────────────────────────────────── */
  :host {
    /* Surface tokens — alpha-blended foreground for subtle pills /
       dividers / hover states. Works in both dark and light themes. */
    --shopping-list-pill-bg: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.04);
    --shopping-list-pill-bg-hover: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08);
    --shopping-list-pill-border: 1px solid rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.06);

    /* Card chrome */
    --shopping-list-bg: var(--ha-card-background, var(--card-background-color, white));
    --shopping-list-fg: var(--primary-text-color, #212121);
    --shopping-list-muted: var(--secondary-text-color, #727272);
    --shopping-list-accent: var(--primary-color, #03a9f4);
    --shopping-list-error: var(--error-color, #db4437);
    --shopping-list-radius: 20px;
    --shopping-list-padding: 16px;
    --shopping-list-gap: 4px;

    /* Shared "inner element" radius — used by items, input, button so
       they all relate to each other and to the outer card. Override
       this single variable to retune the whole interior at once.
       Use 999px here for the full-pill aesthetic. */
    --shopping-list-inner-radius: 14px;

    /* Header */
    --shopping-list-header-gap: 10px;
    --shopping-list-header-padding: 4px 8px 8px;
    --shopping-list-header-icon-size: 22px;
    --shopping-list-header-icon-color: currentColor;
    --shopping-list-header-font-size: 1.1rem;
    --shopping-list-header-font-weight: 500;

    /* Items */
    --shopping-list-item-bg: var(--shopping-list-pill-bg);
    --shopping-list-item-bg-hover: var(--shopping-list-pill-bg-hover);
    --shopping-list-item-radius: var(--shopping-list-inner-radius);
    --shopping-list-item-padding: 8px 12px;
    --shopping-list-item-gap: 12px;
    --shopping-list-list-gap: 4px;

    /* Per-item actions (edit / delete / save / cancel) */
    --shopping-list-actions-gap: 2px;
    --shopping-list-action-size: 32px;
    --shopping-list-action-icon-size: 18px;

    /* Quantity badge (display) */
    --shopping-list-quantity-badge-bg: rgba(var(--rgb-primary-color, 3, 169, 244), 0.14);
    --shopping-list-quantity-badge-fg: var(--shopping-list-accent);
    --shopping-list-quantity-badge-padding: 1px 8px;
    --shopping-list-quantity-badge-radius: 999px;
    --shopping-list-quantity-badge-font-size: 0.85em;
    --shopping-list-quantity-badge-font-weight: 600;
    --shopping-list-quantity-badge-margin: 0 0 0 6px;

    /* Quantity stepper (edit mode) */
    --shopping-list-quantity-stepper-gap: 2px;
    --shopping-list-quantity-step-size: 28px;
    --shopping-list-quantity-step-icon-size: 16px;
    --shopping-list-quantity-step-bg: var(--shopping-list-pill-bg);
    --shopping-list-quantity-step-bg-hover: var(--shopping-list-pill-bg-hover);
    --shopping-list-quantity-step-fg: var(--shopping-list-fg);
    --shopping-list-quantity-step-radius: 999px;
    --shopping-list-quantity-value-min-width: 22px;

    /* Completed items */
    --shopping-list-completed-fg: var(--disabled-text-color, #bdbdbd);
    --shopping-list-completed-decoration: line-through;

    /* Completed-section toggle (collapse mode) */
    --shopping-list-completed-toggle-bg: transparent;
    --shopping-list-completed-toggle-bg-hover: var(--shopping-list-pill-bg);
    --shopping-list-completed-toggle-fg: var(--shopping-list-muted);
    --shopping-list-completed-toggle-padding: 6px 10px;
    --shopping-list-completed-toggle-radius: var(--shopping-list-inner-radius);
    --shopping-list-completed-toggle-font-size: 0.85rem;
    --shopping-list-completed-toggle-font-weight: 500;
    --shopping-list-completed-toggle-icon-size: 18px;
    --shopping-list-completed-toggle-margin: 6px 0 0;

    /* Input */
    --shopping-list-input-bg: var(--shopping-list-pill-bg);
    --shopping-list-input-bg-focus: var(--shopping-list-pill-bg-hover);
    --shopping-list-input-fg: var(--shopping-list-fg);
    --shopping-list-input-placeholder: var(--shopping-list-muted);
    --shopping-list-input-border: var(--shopping-list-pill-border);
    --shopping-list-input-border-focus: 1px solid var(--shopping-list-accent);
    --shopping-list-input-radius: var(--shopping-list-inner-radius);
    --shopping-list-input-padding: 10px 14px;
    --shopping-list-input-font-size: 0.95rem;

    /* Add button */
    --shopping-list-button-bg: var(--shopping-list-accent);
    --shopping-list-button-fg: var(--text-primary-color, white);
    --shopping-list-button-radius: var(--shopping-list-inner-radius);
    --shopping-list-button-padding: 10px 16px;
    --shopping-list-button-font-size: 0.95rem;
    --shopping-list-button-font-weight: 500;

    /* Empty / loading */
    --shopping-list-empty-fg: var(--shopping-list-muted);
    --shopping-list-empty-padding: 16px 8px;

    /* Layout */
    --shopping-list-add-row-gap: 8px;
    /* Breathing room between the add row and the list. Applied to the
       side facing the list so it works for both top and bottom placement
       (margin-top when the row sits at the bottom, margin-bottom when it
       sits at the top). */
    --shopping-list-add-row-spacing: 8px;

    display: block;
  }

  /* ─── Card chrome ─────────────────────────────────────────────── */
  .sl-card {
    background: var(--shopping-list-bg);
    color: var(--shopping-list-fg);
    border-radius: var(--shopping-list-radius);
    padding: var(--shopping-list-padding);
    display: flex;
    flex-direction: column;
    gap: var(--shopping-list-gap);
  }

  /* ─── Header ──────────────────────────────────────────────────── */
  .sl-header {
    display: flex;
    align-items: center;
    gap: var(--shopping-list-header-gap);
    padding: var(--shopping-list-header-padding);
    font-size: var(--shopping-list-header-font-size);
    font-weight: var(--shopping-list-header-font-weight);
  }

  .sl-icon {
    --mdc-icon-size: var(--shopping-list-header-icon-size);
    color: var(--shopping-list-header-icon-color);
  }

  /* ─── Banners (empty / error) ─────────────────────────────────── */
  .sl-empty {
    color: var(--shopping-list-empty-fg);
    font-style: italic;
    padding: var(--shopping-list-empty-padding);
    text-align: center;
  }

  .sl-error {
    color: var(--shopping-list-error);
    background: rgba(var(--rgb-error-color, 219, 68, 55), 0.08);
    border-radius: var(--shopping-list-inner-radius);
    padding: 8px 12px;
    font-size: 0.9rem;
  }

  /* ─── List + items ────────────────────────────────────────────── */
  .sl-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--shopping-list-list-gap);
  }

  .sl-item {
    display: flex;
    align-items: center;
    gap: var(--shopping-list-item-gap);
    padding: var(--shopping-list-item-padding);
    border-radius: var(--shopping-list-item-radius);
    background: var(--shopping-list-item-bg);
    cursor: pointer;
    user-select: none;
    transition:
      background 120ms ease,
      transform 80ms ease;
  }
  .sl-item:hover {
    background: var(--shopping-list-item-bg-hover);
  }
  .sl-item:active {
    transform: scale(0.99);
  }
  /* Dial back affordances that hint at "press to act" when row click is
     disabled. The hover background is preserved — it still reads as
     "this is the row I'm pointing at" without falsely promising an
     action. */
  .sl-item--no-row-click {
    cursor: default;
  }
  .sl-item--no-row-click:active {
    transform: none;
  }

  .sl-item--completed .sl-summary {
    color: var(--shopping-list-completed-fg);
    text-decoration: var(--shopping-list-completed-decoration);
  }

  .sl-checkbox {
    --mdc-checkbox-unchecked-color: var(--shopping-list-muted);
    --mdc-theme-secondary: var(--shopping-list-accent);
    margin: -8px 0 -8px -8px;
  }

  .sl-summary {
    flex: 1;
    word-break: break-word;
  }

  /* ─── Per-item action buttons (edit / delete / save / cancel) ─── */
  .sl-actions {
    display: flex;
    align-items: center;
    gap: var(--shopping-list-actions-gap);
    flex-shrink: 0;
    /* Hidden by default; revealed on hover or focus on devices that
       support hover. The @media (hover: none) block below makes them
       always visible on touch devices (phones, tablets, HA's mobile
       dashboards) where hover is not a viable affordance. */
    opacity: 0;
    transition: opacity 120ms ease;
  }
  .sl-item:hover .sl-actions,
  .sl-item:focus-within .sl-actions,
  .sl-item--editing .sl-actions {
    opacity: 1;
  }
  @media (hover: none) {
    .sl-actions {
      opacity: 1;
    }
  }

  .sl-edit-button,
  .sl-delete-button,
  .sl-save-button,
  .sl-cancel-button {
    --mdc-icon-button-size: var(--shopping-list-action-size);
    --mdc-icon-size: var(--shopping-list-action-icon-size);
    color: var(--shopping-list-muted);
  }
  .sl-save-button {
    color: var(--shopping-list-accent);
  }

  .sl-edit-input {
    flex: 1;
    min-width: 0;
    background: transparent;
    color: var(--shopping-list-fg);
    border: none;
    border-bottom: 1px solid var(--shopping-list-accent);
    font: inherit;
    outline: none;
    padding: 2px 0;
  }
  .sl-edit-input::selection {
    background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.35);
  }

  /* ─── Quantity (badge + stepper) ────────────────────────────── */
  .sl-quantity-badge {
    display: inline-block;
    margin: var(--shopping-list-quantity-badge-margin);
    padding: var(--shopping-list-quantity-badge-padding);
    background: var(--shopping-list-quantity-badge-bg);
    color: var(--shopping-list-quantity-badge-fg);
    border-radius: var(--shopping-list-quantity-badge-radius);
    font-size: var(--shopping-list-quantity-badge-font-size);
    font-weight: var(--shopping-list-quantity-badge-font-weight);
    vertical-align: middle;
    white-space: nowrap;
  }
  /* Inherit the muted/strikethrough treatment of completed items so the
     badge fades along with the rest of the row. */
  .sl-item--completed .sl-quantity-badge {
    color: var(--shopping-list-completed-fg);
    background: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.06);
  }

  .sl-quantity-stepper {
    display: inline-flex;
    align-items: center;
    gap: var(--shopping-list-quantity-stepper-gap);
    flex-shrink: 0;
  }
  .sl-quantity-step {
    width: var(--shopping-list-quantity-step-size);
    height: var(--shopping-list-quantity-step-size);
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--shopping-list-quantity-step-bg);
    color: var(--shopping-list-quantity-step-fg);
    border: none;
    border-radius: var(--shopping-list-quantity-step-radius);
    cursor: pointer;
    line-height: 1;
    transition: background 120ms ease;
    --mdc-icon-size: var(--shopping-list-quantity-step-icon-size);
  }
  .sl-quantity-step:hover:not(:disabled) {
    background: var(--shopping-list-quantity-step-bg-hover);
  }
  .sl-quantity-step:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
  .sl-quantity-value {
    min-width: var(--shopping-list-quantity-value-min-width);
    text-align: center;
    font-variant-numeric: tabular-nums;
    font-weight: 500;
    color: var(--shopping-list-fg);
  }

  /* ─── Completed section toggle (collapse mode) ─────────────────── */
  .sl-completed-toggle {
    list-style: none;
    display: flex;
    align-items: center;
    gap: var(--shopping-list-item-gap);
    padding: var(--shopping-list-completed-toggle-padding);
    margin: var(--shopping-list-completed-toggle-margin);
    border-radius: var(--shopping-list-completed-toggle-radius);
    background: var(--shopping-list-completed-toggle-bg);
    color: var(--shopping-list-completed-toggle-fg);
    font-size: var(--shopping-list-completed-toggle-font-size);
    font-weight: var(--shopping-list-completed-toggle-font-weight);
    cursor: pointer;
    user-select: none;
    transition: background 120ms ease;
  }
  .sl-completed-toggle:hover,
  .sl-completed-toggle:focus-visible {
    background: var(--shopping-list-completed-toggle-bg-hover);
    outline: none;
  }
  .sl-completed-toggle-icon {
    --mdc-icon-size: var(--shopping-list-completed-toggle-icon-size);
    color: currentColor;
    flex-shrink: 0;
  }
  .sl-completed-toggle-label {
    flex: 1;
  }

  /* ─── Add row (input + button) ────────────────────────────────── */
  .sl-add-row {
    display: flex;
    gap: var(--shopping-list-add-row-gap);
    align-items: center;
  }
  /* Position-aware spacing: push away from the list, not from the edge. */
  .sl-add-row--bottom {
    margin-top: var(--shopping-list-add-row-spacing);
  }
  .sl-add-row--top {
    margin-bottom: var(--shopping-list-add-row-spacing);
  }

  .sl-input {
    flex: 1;
    min-width: 0;
    background: var(--shopping-list-input-bg);
    color: var(--shopping-list-input-fg);
    border: var(--shopping-list-input-border);
    border-radius: var(--shopping-list-input-radius);
    padding: var(--shopping-list-input-padding);
    font: inherit;
    font-size: var(--shopping-list-input-font-size);
    outline: none;
    transition:
      background 120ms ease,
      border-color 120ms ease;
  }
  .sl-input:focus {
    background: var(--shopping-list-input-bg-focus);
    border: var(--shopping-list-input-border-focus);
  }
  .sl-input::placeholder {
    color: var(--shopping-list-input-placeholder);
  }

  .sl-add-button {
    background: var(--shopping-list-button-bg);
    color: var(--shopping-list-button-fg);
    border: none;
    border-radius: var(--shopping-list-button-radius);
    padding: var(--shopping-list-button-padding);
    font: inherit;
    font-size: var(--shopping-list-button-font-size);
    font-weight: var(--shopping-list-button-font-weight);
    cursor: pointer;
    transition:
      filter 120ms ease,
      transform 80ms ease,
      opacity 120ms ease;
  }
  .sl-add-button:hover:not(:disabled) {
    filter: brightness(1.1);
  }
  .sl-add-button:active:not(:disabled) {
    transform: scale(0.97);
  }
  .sl-add-button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`,Ht=[{name:"entity",required:!0,selector:{entity:{domain:"todo"}}},{type:"expandable",name:"_grp_header",title:"Header",icon:"mdi:format-title",flatten:!0,schema:[{name:"show_header",selector:{boolean:{}}},{name:"title",selector:{text:{}}},{name:"icon",selector:{icon:{}}}]},{type:"expandable",name:"_grp_list",title:"To-do items",icon:"mdi:format-list-bulleted",flatten:!0,schema:[{name:"sort",selector:{select:{mode:"dropdown",options:[{value:"manual",label:"Manual (HA order)"},{value:"alpha",label:"Alphabetical"},{value:"created",label:"Created order"}]}}},{name:"click_to_check",selector:{boolean:{}}},{name:"enable_edit",selector:{boolean:{}}},{name:"enable_remove",selector:{boolean:{}}},{name:"empty_message",selector:{text:{}}}]},{type:"expandable",name:"_grp_quantity",title:"Quantities",icon:"mdi:counter",flatten:!0,schema:[{name:"enable_quantity",selector:{boolean:{}}},{name:"quantity_max",selector:{number:{min:0,max:9999,step:1,mode:"box"}}}]},{type:"expandable",name:"_grp_completed",title:"Completed items",icon:"mdi:check-circle-outline",flatten:!0,schema:[{name:"completed",selector:{select:{mode:"dropdown",options:[{value:"bottom",label:"At the bottom of the list"},{value:"inline",label:"Mixed with active items"},{value:"collapse",label:"Collapsible section"},{value:"hide",label:"Hide completed items"}]}}},{name:"completed_label",selector:{text:{}}}]},{type:"expandable",name:"_grp_add",title:"Add items",icon:"mdi:plus-circle-outline",flatten:!0,schema:[{name:"show_add_input",selector:{boolean:{}}},{name:"add_input_position",selector:{select:{mode:"dropdown",options:[{value:"bottom",label:"Bottom (below the list)"},{value:"top",label:"Top (below the header)"}]}}},{name:"add_button_label",selector:{text:{}}}]}];let Mt=class extends rt{constructor(){super(...arguments),this._labelFor=t=>{if("type"in t&&"expandable"===t.type)return t.title??t.name;return{entity:"Todo Entity (required)",title:"Title",icon:"Icon",show_header:"Show header",completed:"Show completed items",completed_label:"Completed group label",show_add_input:"Show add-item input",add_input_position:"Add bar position",add_button_label:"Add button label",empty_message:"Empty list message",sort:"Sort order",click_to_check:"Click row to check/uncheck",enable_edit:"Allow editing items",enable_remove:"Allow removing items",enable_quantity:"Enable quantities",quantity_max:"Maximum quantity (0 = unlimited)"}[t.name]??t.name}}setConfig(t){this._config=t}render(){if(!this.hass||!this._config)return L``;const t={...Ct,...this._config};return L`
      <ha-form
        .hass=${this.hass}
        .data=${t}
        .schema=${Ht}
        .computeLabel=${this._labelFor}
        @value-changed=${this._formValueChanged}
      ></ha-form>

      <details class="customization">
        <summary>
          <ha-icon icon="mdi:palette-outline"></ha-icon>
          <span>Customization</span>
          <ha-icon class="chevron" icon="mdi:chevron-down"></ha-icon>
        </summary>
        <div class="customization-body">
          <p class="hint">
            Custom CSS appended to the card. Target <code>.sl-*</code> classes or override
            <code>--shopping-list-*</code> variables.
          </p>
          <ha-code-editor
            mode="css"
            .value=${"string"==typeof this._config.style?this._config.style:""}
            @value-changed=${this._styleChanged}
          ></ha-code-editor>
        </div>
      </details>
    `}_formValueChanged(t){if(t.stopPropagation(),!this._config)return;const e=t.detail.value,i=this._config,s=Ct,o={...this._config};for(const[t,n]of Object.entries(e)){!(t in i)&&n===s[t]||(o[t]=n)}"show_completed"in o&&delete o.show_completed,this._fireChange(o)}_styleChanged(t){if(t.stopPropagation(),!this._config)return;const e=t.detail?.value??"",i={...this._config,style:e};e||delete i.style,this._fireChange(i)}_fireChange(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}};Mt.styles=a`
    :host {
      display: block;
    }
    ha-form {
      display: block;
    }
    /* Visual match for the Customization section so it sits naturally
       below HA's native ha-form expandable groups. */
    .customization {
      display: block;
      margin-top: 8px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      border-radius: 8px;
      background: var(--card-background-color, var(--ha-card-background, transparent));
      overflow: hidden;
    }
    .customization > summary {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      cursor: pointer;
      user-select: none;
      list-style: none;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .customization > summary::-webkit-details-marker {
      display: none;
    }
    .customization > summary ha-icon {
      --mdc-icon-size: 22px;
      color: var(--secondary-text-color);
    }
    .customization > summary .chevron {
      margin-left: auto;
      transition: transform 200ms ease;
      color: var(--secondary-text-color);
      --mdc-icon-size: 20px;
    }
    .customization[open] > summary .chevron {
      transform: rotate(180deg);
    }
    .customization-body {
      padding: 0 16px 16px;
    }
    .customization-body .hint {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin: 0 0 6px;
    }
    ha-code-editor {
      --code-mirror-max-height: 240px;
    }
  `,t([ht({attribute:!1})],Mt.prototype,"hass",void 0),t([ut()],Mt.prototype,"_config",void 0),Mt=t([pt(St)],Mt);const Tt=window;Tt.customCards=Tt.customCards||[],Tt.customCards.find(t=>t.type===kt)||Tt.customCards.push({type:kt,name:"Shopping List Card",description:"Work in progress — a Lovelace shopping list card.",preview:!0,documentationURL:"https://github.com/MCuello17/ha-shopping-list"}),console.info("%c SHOPPING-LIST-CARD %c v0.1.0 ","color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: white; font-weight: 700;");let It=class extends rt{constructor(){super(...arguments),this._items=[],this._loading=!1,this._draft="",this._completedExpanded=!1,this._editDraft="",this._editQuantity=1,this._addQuantity=1,this._focusEditOnUpdate=!1,this._toggleCompletedExpanded=()=>{this._completedExpanded=!this._completedExpanded}}static getStubConfig(){return{...Ct}}static async getConfigElement(){return document.createElement(St)}setConfig(t){if(!t)throw new Error("Invalid configuration");const e={...t};void 0===e.completed&&void 0!==e.show_completed&&(e.completed=e.show_completed?"inline":"hide"),this._config={...Ct,...e}}getCardSize(){return(this._config?.show_header?2:1)+Math.min(this._items.length,6)}disconnectedCallback(){super.disconnectedCallback(),this._teardownSubscription()}updated(t){if(super.updated(t),this._focusEditOnUpdate){const t=this.renderRoot.querySelector(".sl-edit-input");t&&(t.focus(),t.select(),this._focusEditOnUpdate=!1)}const e=this._config?.entity;e&&this.hass&&e!==this._lastEntity&&(this._lastEntity=e,this._setupSubscription(e))}async _setupSubscription(t){if(this._teardownSubscription(),this.hass){this._loading=!0,this._error=void 0;try{const e=await this.hass.callWS({type:"todo/item/list",entity_id:t});this._items=e.items??[],this._unsub=await this.hass.connection.subscribeMessage(t=>{this._items=t.items??[]},{type:"todo/item/subscribe",entity_id:t})}catch(t){this._error=t instanceof Error?t.message:String(t)}finally{this._loading=!1}}}_teardownSubscription(){if(this._unsub){try{this._unsub()}catch{}this._unsub=void 0}}async _addItem(){const t=this._config,e=t?.entity,i=this._draft.trim();if(!e||!i||!this.hass)return;const s=t.enable_quantity??!1,o=Ut(this._addQuantity,t.quantity_max??0),n=s?zt(i,o):i;try{await this.hass.callService("todo","add_item",{entity_id:e,item:n}),this._draft="",this._addQuantity=1}catch(t){this._error=t instanceof Error?t.message:String(t)}}_adjustAddQuantity(t){const e=this._config?.quantity_max??0;this._addQuantity=Ut(this._addQuantity+t,e)}async _toggleItem(t){const e=this._config?.entity;if(!e||!this.hass)return;const i="completed"===t.status?"needs_action":"completed";try{await this.hass.callService("todo","update_item",{entity_id:e,item:t.uid,status:i})}catch(t){this._error=t instanceof Error?t.message:String(t)}}async _removeItem(t){const e=this._config?.entity;if(e&&this.hass)try{await this.hass.callService("todo","remove_item",{entity_id:e,item:t.uid})}catch(t){this._error=t instanceof Error?t.message:String(t)}}_startEdit(t){if(this._config?.enable_quantity??!1){const{name:e,quantity:i}=Pt(t.summary);this._editDraft=e,this._editQuantity=i}else this._editDraft=t.summary,this._editQuantity=1;this._editingUid=t.uid,this._focusEditOnUpdate=!0}_cancelEdit(){this._editingUid=void 0,this._editDraft="",this._editQuantity=1}async _saveEdit(t){if(this._editingUid!==t.uid)return;const e=this._config;if(!e)return void this._cancelEdit();const i=this._editDraft.trim();if(!i)return void this._cancelEdit();const s=e.enable_quantity??!1?zt(i,Ut(this._editQuantity,e.quantity_max??0)):i;if(s===t.summary)return void this._cancelEdit();const o=e.entity;if(o&&this.hass){this._cancelEdit();try{await this.hass.callService("todo","update_item",{entity_id:o,item:t.uid,rename:s})}catch(t){this._error=t instanceof Error?t.message:String(t)}}else this._cancelEdit()}_adjustEditQuantity(t){const e=this._config?.quantity_max??0;this._editQuantity=Ut(this._editQuantity+t,e)}_sort(t){const e=this._config?.sort;return"alpha"===e?[...t].sort((t,e)=>t.summary.localeCompare(e.summary)):t}_splitItems(){const t=[],e=[];for(const i of this._items)"completed"===i.status?e.push(i):t.push(i);return{active:this._sort(t),completed:this._sort(e)}}render(){if(!this._config||!this.hass)return W;const t=this._config,e=this._extractCustomStyle(),i=!(!t.show_add_input||!t.entity),s=t.add_input_position??"bottom";return L`
      <ha-card class="sl-card">
        ${t.show_header?this._renderHeader():W}
        ${this._error?L`<div class="sl-error">${this._error}</div>`:W}
        ${i&&"top"===s?this._renderAddRow("top"):W} ${this._renderBody()}
        ${i&&"top"!==s?this._renderAddRow("bottom"):W}
      </ha-card>
      ${e?L`<style>
            ${e}
          </style>`:W}
    `}_renderBody(){const t=this._config;if(!t.entity)return L`<div class="sl-empty">
        No todo entity selected. Open the editor to pick one.
      </div>`;if(this._loading&&0===this._items.length)return L`<div class="sl-empty">Loading…</div>`;const e=t.completed??"bottom",{active:i,completed:s}=this._splitItems();let o,n=[],a=!1;return"hide"===e?o=i:"inline"===e?o=this._sort([...this._items]):"bottom"===e?(o=i,n=s):(o=i,a=s.length>0,this._completedExpanded&&(n=s)),0!==o.length||0!==n.length||a?L`
      <ul class="sl-list">
        ${Et(o,t=>t.uid,t=>this._renderItem(t))}
        ${a?this._renderCompletedToggle(s.length):W}
        ${Et(n,t=>t.uid,t=>this._renderItem(t))}
      </ul>
    `:L`<div class="sl-empty">${t.empty_message}</div>`}_renderCompletedToggle(t){const e=this._completedExpanded,i=this._config?.completed_label||"Completed";return L`
      <li
        class="sl-completed-toggle ${e?"sl-completed-toggle--expanded":""}"
        role="button"
        tabindex="0"
        aria-expanded=${e?"true":"false"}
        @click=${this._toggleCompletedExpanded}
        @keydown=${t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._toggleCompletedExpanded())}}
      >
        <ha-icon
          class="sl-completed-toggle-icon"
          .icon=${e?"mdi:chevron-up":"mdi:chevron-down"}
        ></ha-icon>
        <span class="sl-completed-toggle-label">${i} (${t})</span>
      </li>
    `}_renderHeader(){const t=this._config;return L`
      <div class="sl-header">
        ${t.icon?L`<ha-icon class="sl-icon" .icon=${t.icon}></ha-icon>`:W}
        <span class="sl-title">${t.title}</span>
      </div>
    `}_renderItem(t){const e=this._config,i="completed"===t.status,s=this._editingUid===t.uid,o=!1!==e.enable_edit,n=!1!==e.enable_remove,a=e.enable_quantity??!1,r=e.quantity_max??0,l=!1!==e.click_to_check,p=a?Pt(t.summary):{name:t.summary,quantity:1},d=a&&p.quantity>1,c=this._editQuantity>1,h=r<=0||this._editQuantity<r,u=t=>t.preventDefault();return L`
      <li
        class="sl-item ${i?"sl-item--completed":""} ${s?"sl-item--editing":""} ${l?"":"sl-item--no-row-click"}"
        @click=${e=>{l&&(s||"HA-CHECKBOX"!==e.target.tagName&&this._toggleItem(t))}}
      >
        <ha-checkbox
          class="sl-checkbox"
          .checked=${i}
          ?disabled=${s}
          @change=${()=>this._toggleItem(t)}
        ></ha-checkbox>

        ${s?L`<input
              class="sl-edit-input"
              type="text"
              .value=${this._editDraft}
              aria-label="Edit item"
              @click=${t=>t.stopPropagation()}
              @input=${t=>{this._editDraft=t.target.value}}
              @keydown=${e=>{"Enter"===e.key?(e.preventDefault(),this._saveEdit(t)):"Escape"===e.key&&(e.preventDefault(),this._cancelEdit())}}
              @blur=${()=>{this._editingUid===t.uid&&this._saveEdit(t)}}
            />`:L`<span class="sl-summary"
              >${p.name}${d?L`<span class="sl-quantity-badge">×${p.quantity}</span>`:W}</span
            >`}
        ${s&&a?L`
              <div class="sl-quantity-stepper" aria-label="Item quantity">
                <button
                  type="button"
                  class="sl-quantity-step sl-quantity-step--minus"
                  ?disabled=${!c}
                  aria-label="Decrease quantity"
                  @mousedown=${u}
                  @click=${t=>{t.stopPropagation(),this._adjustEditQuantity(-1)}}
                >
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>
                <span class="sl-quantity-value" aria-live="polite">${this._editQuantity}</span>
                <button
                  type="button"
                  class="sl-quantity-step sl-quantity-step--plus"
                  ?disabled=${!h}
                  aria-label="Increase quantity"
                  @mousedown=${u}
                  @click=${t=>{t.stopPropagation(),this._adjustEditQuantity(1)}}
                >
                  <ha-icon icon="mdi:plus"></ha-icon>
                </button>
              </div>
            `:W}

        <div class="sl-actions">
          ${s?L`
                <ha-icon-button
                  class="sl-save-button"
                  .label=${"Save"}
                  @mousedown=${u}
                  @click=${e=>{e.stopPropagation(),this._saveEdit(t)}}
                >
                  <ha-icon icon="mdi:check"></ha-icon>
                </ha-icon-button>
                <ha-icon-button
                  class="sl-cancel-button"
                  .label=${"Cancel"}
                  @mousedown=${u}
                  @click=${t=>{t.stopPropagation(),this._cancelEdit()}}
                >
                  <ha-icon icon="mdi:close"></ha-icon>
                </ha-icon-button>
              `:L`
                ${o?L`<ha-icon-button
                      class="sl-edit-button"
                      .label=${"Edit"}
                      @click=${e=>{e.stopPropagation(),this._startEdit(t)}}
                    >
                      <ha-icon icon="mdi:pencil"></ha-icon>
                    </ha-icon-button>`:W}
                ${n?L`<ha-icon-button
                      class="sl-delete-button"
                      .label=${"Remove"}
                      @click=${e=>{e.stopPropagation(),this._removeItem(t)}}
                    >
                      <ha-icon icon="mdi:close"></ha-icon>
                    </ha-icon-button>`:W}
              `}
        </div>
      </li>
    `}_renderAddRow(t){const e=this._config,i=this._draft.trim().length>0,s=e.enable_quantity??!1,o=e.quantity_max??0,n=this._addQuantity>1,a=o<=0||this._addQuantity<o,r=t=>t.preventDefault();return L`
      <div class="sl-add-row sl-add-row--${t}">
        <input
          class="sl-input"
          type="text"
          placeholder="Add an item…"
          .value=${this._draft}
          @input=${t=>{this._draft=t.target.value}}
          @keydown=${t=>{"Enter"===t.key&&(t.preventDefault(),this._addItem())}}
        />
        ${s?L`
              <div
                class="sl-quantity-stepper sl-quantity-stepper--add"
                aria-label="Initial quantity for new item"
              >
                <button
                  type="button"
                  class="sl-quantity-step sl-quantity-step--minus"
                  ?disabled=${!n}
                  aria-label="Decrease quantity"
                  @mousedown=${r}
                  @click=${()=>this._adjustAddQuantity(-1)}
                >
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>
                <span class="sl-quantity-value" aria-live="polite">${this._addQuantity}</span>
                <button
                  type="button"
                  class="sl-quantity-step sl-quantity-step--plus"
                  ?disabled=${!a}
                  aria-label="Increase quantity"
                  @mousedown=${r}
                  @click=${()=>this._adjustAddQuantity(1)}
                >
                  <ha-icon icon="mdi:plus"></ha-icon>
                </button>
              </div>
            `:W}
        <button
          class="sl-add-button"
          type="button"
          ?disabled=${!i}
          @click=${()=>this._addItem()}
        >
          ${e.add_button_label}
        </button>
      </div>
    `}_extractCustomStyle(){const t=this._config;if(t){if("string"==typeof t.style&&t.style.trim())return t.style;if(t.card_mod){if("string"==typeof t.card_mod)return t.card_mod;if("object"==typeof t.card_mod&&t.card_mod.style)return t.card_mod.style}}}};It.styles=Ot,t([ht({attribute:!1})],It.prototype,"hass",void 0),t([ut()],It.prototype,"_config",void 0),t([ut()],It.prototype,"_items",void 0),t([ut()],It.prototype,"_loading",void 0),t([ut()],It.prototype,"_error",void 0),t([ut()],It.prototype,"_draft",void 0),t([ut()],It.prototype,"_completedExpanded",void 0),t([ut()],It.prototype,"_editingUid",void 0),t([ut()],It.prototype,"_editDraft",void 0),t([ut()],It.prototype,"_editQuantity",void 0),t([ut()],It.prototype,"_addQuantity",void 0),It=t([pt(kt)],It);export{It as ShoppingListCard};
