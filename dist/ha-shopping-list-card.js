function t(t,e,i,s){var o,n=arguments.length,a=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(a=(n<3?o(a):n>3?o(e,i,a):o(e,i))||a);return n>3&&a&&Object.defineProperty(e,i,a),a}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const a=t=>new n("string"==typeof t?t:t+"",void 0,s),r=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(i,t,s)},l=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return a(e)})(t):t,{is:c,defineProperty:p,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:g,getPrototypeOf:u}=Object,m=globalThis,y=m.trustedTypes,_=y?y.emptyScript:"",f=m.reactiveElementPolyfillSupport,b=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!c(t,e),x={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=x){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&p(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:o}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const n=s?.call(this);o?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??x}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...h(t),...g(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),o=e.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const n=o.fromAttribute(e,t.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(void 0!==t){const n=this.constructor;if(!1===s&&(o=this[t]),i??=n.getPropertyOptions(t),!((i.hasChanged??$)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[b("elementProperties")]=new Map,w[b("finalized")]=new Map,f?.({ReactiveElement:w}),(m.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,k=t=>t,E=A.trustedTypes,C=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",q=`lit$${Math.random().toFixed(9).slice(2)}$`,z="?"+q,P=`<${z}>`,U=document,O=()=>U.createComment(""),H=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,M="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,R=/>/g,D=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,Q=/"/g,L=/^(?:script|style|textarea|title)$/i,B=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),G=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),W=new WeakMap,F=U.createTreeWalker(U,129);function K(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const a=t.length-1,r=this.parts,[l,c]=((t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":3===e?"<math>":"",a=N;for(let e=0;e<i;e++){const i=t[e];let r,l,c=-1,p=0;for(;p<i.length&&(a.lastIndex=p,l=a.exec(i),null!==l);)p=a.lastIndex,a===N?"!--"===l[1]?a=I:void 0!==l[1]?a=R:void 0!==l[2]?(L.test(l[2])&&(o=RegExp("</"+l[2],"g")),a=D):void 0!==l[3]&&(a=D):a===D?">"===l[0]?(a=o??N,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,r=l[1],a=void 0===l[3]?D:'"'===l[3]?Q:j):a===Q||a===j?a=D:a===I||a===R?a=N:(a=D,o=void 0);const d=a===D&&t[e+1].startsWith("/>")?" ":"";n+=a===N?i+P:c>=0?(s.push(r),i.slice(0,c)+S+i.slice(c)+q+d):i+q+(-2===c?e:d)}return[K(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]})(t,e);if(this.el=J.createElement(l,i),F.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=F.nextNode())&&r.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=c[n++],i=s.getAttribute(t).split(q),a=/([.?@])?(.*)/.exec(e);r.push({type:1,index:o,name:a[2],strings:i,ctor:"."===a[1]?et:"?"===a[1]?it:"@"===a[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(q)&&(r.push({type:6,index:o}),s.removeAttribute(t));if(L.test(s.tagName)){const t=s.textContent.split(q),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],O()),F.nextNode(),r.push({type:2,index:++o});s.append(t[e],O())}}}else if(8===s.nodeType)if(s.data===z)r.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(q,t+1));)r.push({type:7,index:o}),t+=q.length-1}o++}}static createElement(t,e){const i=U.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===G)return e;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=H(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(e=X(t,o._$AS(t,e.values),o,s)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??U).importNode(e,!0);F.currentNode=s;let o=F.nextNode(),n=0,a=0,r=i[0];for(;void 0!==r;){if(n===r.index){let e;2===r.type?e=new Y(o,o.nextSibling,this,t):1===r.type?e=new r.ctor(o,r.name,r.strings,this,t):6===r.type&&(e=new ot(o,this,t)),this._$AV.push(e),r=i[++a]}n!==r?.index&&(o=F.nextNode(),n++)}return F.currentNode=U,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),H(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==G&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Z(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new J(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new Y(this.O(O()),this.O(O()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=k(t).nextSibling;k(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=X(this,t,e,0),n=!H(t)||t!==this._$AH&&t!==G,n&&(this._$AH=t);else{const s=t;let a,r;for(t=o[0],a=0;a<o.length-1;a++)r=X(this,s[i+a],e,a),r===G&&(r=this._$AH[a]),n||=!H(r)||r!==this._$AH[a],r===V?t=V:t!==V&&(t+=(r??"")+o[a+1]),this._$AH[a]=r}n&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class st extends tt{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??V)===G)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const nt={I:Y},at=A.litHtmlPolyfillSupport;at?.(J,Y),(A.litHtmlVersions??=[]).push("3.3.2");const rt=globalThis;let lt=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let o=s._$litPart$;if(void 0===o){const t=i?.renderBefore??null;s._$litPart$=o=new Y(e.insertBefore(O(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return G}};lt._$litElement$=!0,lt.finalized=!0,rt.litElementHydrateSupport?.({LitElement:lt});const ct=rt.litElementPolyfillSupport;ct?.({LitElement:lt}),(rt.litElementVersions??=[]).push("4.2.2");const pt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:$},ht=(t=dt,e,i)=>{const{kind:s,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,o,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];e.call(this,i),this.requestUpdate(s,o,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function gt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return gt({...t,state:!0,attribute:!1})}const mt=2;let yt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const{I:_t}=nt,ft=t=>t,bt=()=>document.createComment(""),vt=(t,e,i)=>{const s=t._$AA.parentNode,o=void 0===e?t._$AB:e._$AA;if(void 0===i){const e=s.insertBefore(bt(),o),n=s.insertBefore(bt(),o);i=new _t(e,n,t,t.options)}else{const e=i._$AB.nextSibling,n=i._$AM,a=n!==t;if(a){let e;i._$AQ?.(t),i._$AM=t,void 0!==i._$AP&&(e=t._$AU)!==n._$AU&&i._$AP(e)}if(e!==o||a){let t=i._$AA;for(;t!==e;){const e=ft(t).nextSibling;ft(s).insertBefore(t,o),t=e}}}return i},$t=(t,e,i=t)=>(t._$AI(e,i),t),xt={},wt=(t,e=xt)=>t._$AH=e,At=t=>{t._$AR(),t._$AA.remove()},kt=(t,e,i)=>{const s=new Map;for(let o=e;o<=i;o++)s.set(t[o],o);return s},Et=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends yt{constructor(t){if(super(t),t.type!==mt)throw Error("repeat() can only be used in text expressions")}dt(t,e,i){let s;void 0===i?i=e:void 0!==e&&(s=e);const o=[],n=[];let a=0;for(const e of t)o[a]=s?s(e,a):a,n[a]=i(e,a),a++;return{values:n,keys:o}}render(t,e,i){return this.dt(t,e,i).values}update(t,[e,i,s]){const o=(t=>t._$AH)(t),{values:n,keys:a}=this.dt(e,i,s);if(!Array.isArray(o))return this.ut=a,n;const r=this.ut??=[],l=[];let c,p,d=0,h=o.length-1,g=0,u=n.length-1;for(;d<=h&&g<=u;)if(null===o[d])d++;else if(null===o[h])h--;else if(r[d]===a[g])l[g]=$t(o[d],n[g]),d++,g++;else if(r[h]===a[u])l[u]=$t(o[h],n[u]),h--,u--;else if(r[d]===a[u])l[u]=$t(o[d],n[u]),vt(t,l[u+1],o[d]),d++,u--;else if(r[h]===a[g])l[g]=$t(o[h],n[g]),vt(t,o[d],o[h]),h--,g++;else if(void 0===c&&(c=kt(a,g,u),p=kt(r,d,h)),c.has(r[d]))if(c.has(r[h])){const e=p.get(a[g]),i=void 0!==e?o[e]:null;if(null===i){const e=vt(t,o[d]);$t(e,n[g]),l[g]=e}else l[g]=$t(i,n[g]),vt(t,o[d],i),o[e]=null;g++}else At(o[h]),h--;else At(o[d]),d++;for(;g<=u;){const e=vt(t,l[u+1]);$t(e,n[g]),l[g++]=e}for(;d<=h;){const t=o[d++];null!==t&&At(t)}return this.ut=a,wt(t,l),G}}),Ct="shopping-list-card",St="shopping-list-card-editor",qt={type:`custom:${Ct}`,title:"Shopping List",show_header:!0,completed:"bottom",completed_label:"Completed",show_add_input:!0,add_input_position:"bottom",add_button_label:"Add",enable_edit:!0,enable_remove:!0,click_to_check:!0,enable_quantity:!1,quantity_max:0,enable_categories:!1,group_by_category:!0,category_collapsible:!0,category_check_all:!0,category_show_count:!0,general_category_label:"General",empty_message:"Nothing on the list",sort:"manual"},zt=/^\s*\[([^\]]+)\]\s*/;function Pt(t){const e=t.match(zt);if(!e)return{category:null,rest:t};const i=e[1].trim(),s=t.slice(e[0].length);return i?{category:i,rest:s}:{category:null,rest:s}}const Ut=Object.freeze({General:"grey",Veggies:"green"}),Ot=/<quantity:\s*(\d+)\s*>/gi;function Ht(t){let e=null;for(const i of t.matchAll(Ot)){const t=Number.parseInt(i[1],10);Number.isFinite(t)&&t>0&&(e=t)}return{name:t.replace(Ot,"").replace(/\s+/g," ").trim(),quantity:e??1}}function Tt(t,e){const i=t.trim();return e<=1?i:`${i} <quantity: ${e}>`}function Mt(t,e){const i=Math.floor(Number(t)||1),s=Math.max(1,i);return e&&e>0?Math.min(s,e):s}const Nt=r`
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

    /* Per-item actions (edit / delete / save / cancel).
       Sized down from the original 32 px touch target so a row with
       actions isn't visibly taller than one without. The negative
       --shopping-list-action-margin below pulls the wrapper out of the
       row's height calculation, so the surrounding text still drives
       row height. */
    --shopping-list-actions-gap: 0px;
    --shopping-list-action-size: 28px;
    --shopping-list-action-icon-size: 16px;
    --shopping-list-action-margin: -4px 0;

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

    /* Categories — grouped layout + flat-mode prefix.

       The color shown for a category is read from
       --shopping-list-category-color. Per-category overrides are set
       inline by the card itself when the user provides
       category_colors: { Veggies: green }; otherwise this falls back
       to currentColor so the label adopts the surrounding text color. */
    --shopping-list-category-color: currentColor;

    --shopping-list-category-gap: 12px;
    --shopping-list-category-bg: transparent;
    --shopping-list-category-radius: var(--shopping-list-inner-radius);
    --shopping-list-category-padding: 0;

    --shopping-list-category-header-padding: 4px 4px 4px 0;
    --shopping-list-category-header-gap: 6px;
    --shopping-list-category-header-font-size: 0.95rem;
    --shopping-list-category-header-font-weight: 600;
    --shopping-list-category-header-bg-hover: var(--shopping-list-pill-bg);
    --shopping-list-category-count-color: var(--shopping-list-muted);
    --shopping-list-category-count-font-weight: 500;
    --shopping-list-category-count-margin: 0 0 0 6px;
    --shopping-list-category-collapse-size: 28px;
    --shopping-list-category-collapse-icon-size: 18px;
    --shopping-list-category-items-gap: var(--shopping-list-list-gap);
    --shopping-list-category-items-padding: 0 0 0 4px;

    --shopping-list-category-prefix-margin: 0 6px 0 0;
    --shopping-list-category-prefix-font-weight: 600;
    --shopping-list-category-prefix-opacity: 0.85;

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

  .sl-action-button {
    --mdc-icon-button-size: var(--shopping-list-action-size);
    --mdc-icon-size: var(--shopping-list-action-icon-size);
    color: var(--shopping-list-muted);
    /* Negative vertical margin: the buttons render full-size visually
       but contribute less height to the row's flex layout, so the row
       is sized by the text/checkbox instead of the action buttons. */
    margin: var(--shopping-list-action-margin);
  }
  .sl-action-button-save {
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

  /* ─── Category (grouped layout) ──────────────────────────────── */
  /* When categories are grouped, the root <div> swaps from .sl-list to
     .sl-list.sl-list--grouped and contains <section class="sl-category">
     children. Each section keeps its own internal <ul> of items so the
     existing item styles apply unchanged. */
  .sl-list--grouped {
    gap: var(--shopping-list-category-gap);
  }

  .sl-category {
    display: block;
    background: var(--shopping-list-category-bg);
    border-radius: var(--shopping-list-category-radius);
    padding: var(--shopping-list-category-padding);
  }

  .sl-category-header {
    display: flex;
    align-items: center;
    gap: var(--shopping-list-category-header-gap);
    padding: var(--shopping-list-category-header-padding);
    font-size: var(--shopping-list-category-header-font-size);
    font-weight: var(--shopping-list-category-header-font-weight);
  }

  .sl-category-checkbox {
    --mdc-checkbox-unchecked-color: var(--shopping-list-muted);
    --mdc-theme-secondary: var(--shopping-list-accent);
    margin: -8px 0 -8px -4px;
    flex-shrink: 0;
  }

  .sl-category-name {
    flex: 1;
    text-align: left;
    background: transparent;
    border: none;
    color: var(--shopping-list-category-color);
    font: inherit;
    font-weight: var(--shopping-list-category-header-font-weight);
    padding: 4px 6px;
    border-radius: 6px;
    cursor: pointer;
  }
  .sl-category-name:disabled {
    cursor: default;
  }
  .sl-category-name:hover:not(:disabled) {
    background: var(--shopping-list-category-header-bg-hover);
  }

  /* Active-item count rendered inside .sl-category-name. The cursor is
     inherited from the parent button so clicking the count still
     toggles the collapse, and the color is muted even when the parent
     has a custom category color (the count is meta, not part of the
     label). */
  .sl-category-count {
    color: var(--shopping-list-category-count-color);
    font-weight: var(--shopping-list-category-count-font-weight);
    margin: var(--shopping-list-category-count-margin);
  }

  .sl-category-collapse {
    width: var(--shopping-list-category-collapse-size);
    height: var(--shopping-list-category-collapse-size);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: none;
    background: transparent;
    color: var(--shopping-list-muted);
    border-radius: 999px;
    cursor: pointer;
    --mdc-icon-size: var(--shopping-list-category-collapse-icon-size);
    transition: background 120ms ease;
    flex-shrink: 0;
  }
  .sl-category-collapse:hover,
  .sl-category-collapse:focus-visible {
    background: var(--shopping-list-pill-bg-hover);
    outline: none;
  }

  .sl-category-items {
    list-style: none;
    margin: 0;
    padding: var(--shopping-list-category-items-padding);
    display: flex;
    flex-direction: column;
    gap: var(--shopping-list-category-items-gap);
  }

  /* Global completed bucket below all categories (collapse mode).
     Sits as a peer of the .sl-category sections. The list's own gap
     handles spacing — this rule just suppresses the default <ul>
     padding/margin since this is a nested .sl-list. */
  .sl-grouped-completed {
    margin: 0;
    padding: 0;
  }

  /* Flat-mode prefix shown directly on each item when categories are on
     but grouping is off. Adopts the same color variable as the group
     header so a single user-provided color theme covers both layouts. */
  .sl-category-prefix {
    color: var(--shopping-list-category-color);
    font-weight: var(--shopping-list-category-prefix-font-weight);
    opacity: var(--shopping-list-category-prefix-opacity);
    margin: var(--shopping-list-category-prefix-margin);
  }
  .sl-item--completed .sl-category-prefix {
    color: var(--shopping-list-completed-fg);
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
`,It="yaml",Rt=[{name:"entity",required:!0,selector:{entity:{domain:"todo"}}},{type:"expandable",name:"_grp_header",title:"Header",icon:"mdi:format-title",flatten:!0,schema:[{name:"show_header",selector:{boolean:{}}},{name:"title",selector:{text:{}}},{name:"icon",selector:{icon:{}}}]},{type:"expandable",name:"_grp_list",title:"To-do items",icon:"mdi:format-list-bulleted",flatten:!0,schema:[{name:"sort",selector:{select:{mode:"dropdown",options:[{value:"manual",label:"Manual (HA order)"},{value:"alpha",label:"Alphabetical"},{value:"created",label:"Created order"}]}}},{name:"click_to_check",selector:{boolean:{}}},{name:"enable_edit",selector:{boolean:{}}},{name:"enable_remove",selector:{boolean:{}}},{name:"empty_message",selector:{text:{}}}]},{type:"expandable",name:"_grp_quantity",title:"Quantities",icon:"mdi:counter",flatten:!0,schema:[{name:"enable_quantity",selector:{boolean:{}}},{name:"quantity_max",selector:{number:{min:0,max:9999,step:1,mode:"box"}}}]},{type:"expandable",name:"_grp_completed",title:"Completed items",icon:"mdi:check-circle-outline",flatten:!0,schema:[{name:"completed",selector:{select:{mode:"dropdown",options:[{value:"bottom",label:"At the bottom of the list"},{value:"inline",label:"Mixed with active items"},{value:"collapse",label:"Collapsible section"},{value:"hide",label:"Hide completed items"}]}}},{name:"completed_label",selector:{text:{}}}]},{type:"expandable",name:"_grp_add",title:"Add items",icon:"mdi:plus-circle-outline",flatten:!0,schema:[{name:"show_add_input",selector:{boolean:{}}},{name:"add_input_position",selector:{select:{mode:"dropdown",options:[{value:"bottom",label:"Bottom (below the list)"},{value:"top",label:"Top (below the header)"}]}}},{name:"add_button_label",selector:{text:{}}}]}],Dt=[{name:"enable_categories",selector:{boolean:{}}},{name:"group_by_category",selector:{boolean:{}}},{name:"category_collapsible",selector:{boolean:{}}},{name:"category_check_all",selector:{boolean:{}}},{name:"category_show_count",selector:{boolean:{}}},{name:"general_category_label",selector:{text:{}}}];let jt=class extends lt{constructor(){super(...arguments),this._labelFor=t=>{if("type"in t&&"expandable"===t.type)return t.title??t.name;return{entity:"Todo Entity (required)",title:"Title",icon:"Icon",show_header:"Show header",completed:"Show completed items",completed_label:"Completed group label",show_add_input:"Show add-item input",add_input_position:"Add bar position",add_button_label:"Add button label",empty_message:"Empty list message",sort:"Sort order",click_to_check:"Click row to check/uncheck",enable_edit:"Allow editing items",enable_remove:"Allow removing items",enable_quantity:"Enable quantities",quantity_max:"Maximum quantity (0 = unlimited)",enable_categories:"Enable categories",group_by_category:"Group items by category",category_collapsible:"Allow collapsing categories",category_check_all:"Allow check-all on categories",category_show_count:"Show item count on category headers",general_category_label:"Label for uncategorized items"}[t.name]??t.name}}setConfig(t){this._config=t}updated(t){super.updated(t),this._patchHaFormSpacing()}_patchHaFormSpacing(){for(const t of this.renderRoot.querySelectorAll("ha-form")){const e=t.shadowRoot;if(!e)continue;if(e.querySelector("style[data-sl-spacing]"))continue;const i=document.createElement("style");i.setAttribute("data-sl-spacing",""),i.textContent=".root > *:not([own-margin]):not(:last-child) { margin-bottom: 8px !important; }",e.appendChild(i)}}render(){if(!this.hass||!this._config)return B``;const t={...qt,...this._config};return B`
      <ha-form
        .hass=${this.hass}
        .data=${t}
        .schema=${Rt}
        .computeLabel=${this._labelFor}
        @value-changed=${this._formValueChanged}
      ></ha-form>

      <details class="customization">
        <summary>
          <ha-icon icon="mdi:tag-multiple-outline"></ha-icon>
          <span>Categories</span>
          <ha-icon class="chevron" icon="mdi:chevron-down"></ha-icon>
        </summary>
        <div class="customization-body">
          <p class="hint">
            Prefix an item with <code>[Category]</code> to bucket it — e.g.
            <code>[Veggies] Lettuce</code>. Brackets are required; items without them land in the
            <em>General</em> bucket.
          </p>
          <ha-form
            class="categories-form"
            .hass=${this.hass}
            .data=${t}
            .schema=${Dt}
            .computeLabel=${this._labelFor}
            @value-changed=${this._formValueChanged}
          ></ha-form>

          <p class="hint">
            <strong>Category colors.</strong> One <code>Name: color</code> per line. Any CSS color
            works — named (<code>green</code>), hex (<code>"#171717"</code>), <code>rgb()</code>, or
            <code>var(--my-token)</code>. Categories without a mapping use the current text color.
            Clear the editor to remove all colors.
          </p>
          <ha-code-editor
            .mode=${It}
            .value=${e=void 0!==this._config.category_colors?this._config.category_colors:Ut,e?Object.entries(e).map(([t,e])=>`${t}: ${e}`).join("\n"):""}
            @value-changed=${this._categoryColorsChanged}
          ></ha-code-editor>
        </div>
      </details>

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
            .mode=${It}
            .value=${"string"==typeof this._config.style?this._config.style:""}
            @value-changed=${this._styleChanged}
          ></ha-code-editor>
        </div>
      </details>
    `;var e}_formValueChanged(t){if(t.stopPropagation(),!this._config)return;const e=t.detail.value,i=this._config,s=qt,o={...this._config};for(const[t,n]of Object.entries(e)){!(t in i)&&n===s[t]||(o[t]=n)}"show_completed"in o&&delete o.show_completed,this._fireChange(o)}_styleChanged(t){if(t.stopPropagation(),!this._config)return;const e=t.detail?.value??"",i={...this._config,style:e};e||delete i.style,this._fireChange(i)}_categoryColorsChanged(t){if(t.stopPropagation(),!this._config)return;const e=function(t){const e={};if(!t)return e;for(const i of t.split("\n")){const t=i.trim();if(!t)continue;if(t.startsWith("#"))continue;const s=t.replace(/^-\s*/,""),o=s.indexOf(":");if(o<=0)continue;const n=s.slice(0,o).trim();let a=s.slice(o+1).trim();a=a.replace(/^"(.*)"$/,"$1").replace(/^'(.*)'$/,"$1"),n&&a&&(e[n]=a)}return e}(t.detail?.value??""),i={...this._config,category_colors:e};this._fireChange(i)}_fireChange(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}};jt.styles=r`
    :host {
      display: block;
    }
    ha-form {
      display: block;
    }
    /* Visual match for the Customization section so it sits naturally
       below HA's native ha-form expandable groups.

       - Background is transparent: HA's own expandables (rendered by
         ha-form for "expandable" schema items) inherit the parent
         dialog background, so any explicit color visibly mismatches.
       - margin-top is the same SECTION_GAP_PX value injected into
         ha-form's shadow root by _patchHaFormSpacing, so every section
         (HA's expandables + our custom blocks) sits the same distance
         apart. */
    .customization {
      display: block;
      margin-top: ${a("8px")};
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      border-radius: 8px;
      background: transparent;
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
    /* Categories ha-form sits inside a custom <details>; tighten its
       default vertical rhythm so it visually belongs with the YAML editor
       and the example block beneath it. */
    .categories-form {
      margin-bottom: 4px;
    }
    ha-code-editor {
      --code-mirror-max-height: 240px;
    }
  `,t([gt({attribute:!1})],jt.prototype,"hass",void 0),t([ut()],jt.prototype,"_config",void 0),jt=t([pt(St)],jt);const Qt=window;Qt.customCards=Qt.customCards||[],Qt.customCards.find(t=>t.type===Ct)||Qt.customCards.push({type:Ct,name:"Shopping List Card",description:"A shopping-style list view for any todo entity, with categories and quantities.",preview:!0,documentationURL:"https://github.com/MCuello17/ha-shopping-list"}),console.info("%c SHOPPING-LIST-CARD %c v0.1.0 ","color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: white; font-weight: 700;");let Lt=class extends lt{constructor(){super(...arguments),this._items=[],this._loading=!1,this._draft="",this._completedExpanded=!1,this._editDraft="",this._editQuantity=1,this._addQuantity=1,this._collapsedCategories=new Set,this._focusEditOnUpdate=!1,this._toggleCompletedExpanded=()=>{this._completedExpanded=!this._completedExpanded}}static getStubConfig(){return{...qt}}static async getConfigElement(){return document.createElement(St)}setConfig(t){if(!t)throw new Error("Invalid configuration");const e={...t};void 0===e.completed&&void 0!==e.show_completed&&(e.completed=e.show_completed?"inline":"hide"),this._config={...qt,...e}}getCardSize(){return(this._config?.show_header?2:1)+Math.min(this._items.length,6)}disconnectedCallback(){super.disconnectedCallback(),this._teardownSubscription()}updated(t){if(super.updated(t),this._focusEditOnUpdate){const t=this.renderRoot.querySelector(".sl-edit-input");t&&(t.focus(),t.select(),this._focusEditOnUpdate=!1)}const e=this._config?.entity;e&&this.hass&&e!==this._lastEntity&&(this._lastEntity=e,this._setupSubscription(e))}async _setupSubscription(t){if(this._teardownSubscription(),this.hass){this._loading=!0,this._error=void 0;try{const e=await this.hass.callWS({type:"todo/item/list",entity_id:t});this._items=e.items??[],this._unsub=await this.hass.connection.subscribeMessage(t=>{this._items=t.items??[]},{type:"todo/item/subscribe",entity_id:t})}catch(t){this._error=t instanceof Error?t.message:String(t)}finally{this._loading=!1}}}_teardownSubscription(){if(this._unsub){try{this._unsub()}catch{}this._unsub=void 0}}async _addItem(){const t=this._config,e=t?.entity,i=this._draft.trim();if(!e||!i||!this.hass)return;const s=t.enable_quantity??!1,o=Mt(this._addQuantity,t.quantity_max??0),n=s?Tt(i,o):i;try{await this.hass.callService("todo","add_item",{entity_id:e,item:n}),this._draft="",this._addQuantity=1}catch(t){this._error=t instanceof Error?t.message:String(t)}}_adjustAddQuantity(t){const e=this._config?.quantity_max??0;this._addQuantity=Mt(this._addQuantity+t,e)}async _toggleItem(t){const e=this._config?.entity;if(!e||!this.hass)return;const i="completed"===t.status?"needs_action":"completed";try{await this.hass.callService("todo","update_item",{entity_id:e,item:t.uid,status:i})}catch(t){this._error=t instanceof Error?t.message:String(t)}}async _removeItem(t){const e=this._config?.entity;if(e&&this.hass)try{await this.hass.callService("todo","remove_item",{entity_id:e,item:t.uid})}catch(t){this._error=t instanceof Error?t.message:String(t)}}async _toggleCategoryAll(t,e){const i=this._config?.entity;if(!i||!this.hass||0===t.length)return;const s=e?"needs_action":"completed",o=t.filter(t=>t.status!==s);for(const t of o)try{await this.hass.callService("todo","update_item",{entity_id:i,item:t.uid,status:s})}catch(t){return void(this._error=t instanceof Error?t.message:String(t))}}_toggleCategoryCollapse(t){const e=new Set(this._collapsedCategories);e.has(t)?e.delete(t):e.add(t),this._collapsedCategories=e}_categoryColor(t){const e=this._config;return(void 0!==e.category_colors?e.category_colors:Ut)[t]}_startEdit(t){if(this._config?.enable_quantity??!1){const{name:e,quantity:i}=Ht(t.summary);this._editDraft=e,this._editQuantity=i}else this._editDraft=t.summary,this._editQuantity=1;this._editingUid=t.uid,this._focusEditOnUpdate=!0}_cancelEdit(){this._editingUid=void 0,this._editDraft="",this._editQuantity=1}async _saveEdit(t){if(this._editingUid!==t.uid)return;const e=this._config;if(!e)return void this._cancelEdit();const i=this._editDraft.trim();if(!i)return void this._cancelEdit();const s=e.enable_quantity??!1?Tt(i,Mt(this._editQuantity,e.quantity_max??0)):i;if(s===t.summary)return void this._cancelEdit();const o=e.entity;if(o&&this.hass){this._cancelEdit();try{await this.hass.callService("todo","update_item",{entity_id:o,item:t.uid,rename:s})}catch(t){this._error=t instanceof Error?t.message:String(t)}}else this._cancelEdit()}_adjustEditQuantity(t){const e=this._config?.quantity_max??0;this._editQuantity=Mt(this._editQuantity+t,e)}_sort(t){const e=this._config?.sort;return"alpha"===e?[...t].sort((t,e)=>t.summary.localeCompare(e.summary)):t}_splitItems(){const t=[],e=[];for(const i of this._items)"completed"===i.status?e.push(i):t.push(i);return{active:this._sort(t),completed:this._sort(e)}}_buildGroups(){const t=this._config,e=t.general_category_label||"General",i=new Map,s=[];for(const t of this._items){const{category:o}=Pt(t.summary),n=o??"__general__";let a=i.get(n);a||(a={key:n,category:o,displayName:o??e,active:[],completed:[]},i.set(n,a),s.push(n)),"completed"===t.status?a.completed.push(t):a.active.push(t)}const o=s.map(t=>{const e=i.get(t);return{...e,active:this._sort(e.active),completed:this._sort(e.completed)}});return"alpha"===t.sort&&o.sort((t,e)=>t.displayName.localeCompare(e.displayName)),o}render(){if(!this._config||!this.hass)return V;const t=this._config,e=this._extractCustomStyle(),i=!(!t.show_add_input||!t.entity),s=t.add_input_position??"bottom";return B`
      <ha-card class="sl-card">
        ${t.show_header?this._renderHeader():V}
        ${this._error?B`<div class="sl-error">${this._error}</div>`:V}
        ${i&&"top"===s?this._renderAddRow("top"):V} ${this._renderBody()}
        ${i&&"top"!==s?this._renderAddRow("bottom"):V}
      </ha-card>
      ${e?B`<style>
            ${e}
          </style>`:V}
    `}_renderBody(){const t=this._config;return t.entity?this._loading&&0===this._items.length?B`<div class="sl-empty">Loading…</div>`:t.enable_categories&&!1!==t.group_by_category?this._renderGrouped():this._renderFlat():B`<div class="sl-empty">
        No todo entity selected. Open the editor to pick one.
      </div>`}_renderFlat(){const t=this._config,e=t.completed??"bottom",{active:i,completed:s}=this._splitItems();let o,n=[],a=!1;return"hide"===e?o=i:"inline"===e?o=this._sort([...this._items]):"bottom"===e?(o=i,n=s):(o=i,a=s.length>0,this._completedExpanded&&(n=s)),0!==o.length||0!==n.length||a?B`
      <ul class="sl-list">
        ${Et(o,t=>t.uid,t=>this._renderItem(t))}
        ${a?this._renderCompletedToggle(s.length):V}
        ${Et(n,t=>t.uid,t=>this._renderItem(t))}
      </ul>
    `:B`<div class="sl-empty">${t.empty_message}</div>`}_renderGrouped(){const t=this._config,e=t.completed??"bottom",i=this._buildGroups();let s=[],o=!1;if("collapse"===e){const t=[];for(const e of i)t.push(...e.completed);s=this._sort(t),o=s.length>0}const n=i.filter(t=>"hide"===e||"collapse"===e?t.active.length>0:t.active.length+t.completed.length>0);return 0!==n.length||o?B`
      <div class="sl-list sl-list--grouped">
        ${Et(n,t=>t.key,t=>this._renderGroup(t))}
        ${o?B`
              <ul class="sl-list sl-grouped-completed">
                ${this._renderCompletedToggle(s.length)}
                ${this._completedExpanded?Et(s,t=>t.uid,t=>this._renderItem(t,{hidePrefix:!1})):V}
              </ul>
            `:V}
      </div>
    `:B`<div class="sl-empty">${t.empty_message}</div>`}_renderGroup(t){const e=this._config,i=e.completed??"bottom",s="collapse"===i?t.active:[...t.active,...t.completed],o=s.length>0&&s.every(t=>"completed"===t.status),n=!o&&s.some(t=>"completed"===t.status),a=!1!==e.category_check_all,r=!1!==e.category_collapsible,l=r&&this._collapsedCategories.has(t.key);let c;c="hide"===i||"collapse"===i?t.active:"inline"===i?this._sort([...t.active,...t.completed]):[...t.active,...t.completed];const p=this._categoryColor(t.displayName);return B`
      <section class="sl-category" style=${p?`--shopping-list-category-color: ${p}`:""}>
        <div class="sl-category-header">
          ${a?B`<ha-checkbox
                class="sl-category-checkbox"
                .checked=${o}
                .indeterminate=${n}
                @click=${t=>t.stopPropagation()}
                @change=${()=>this._toggleCategoryAll(s,o)}
              ></ha-checkbox>`:V}
          <button
            class="sl-category-name"
            type="button"
            ?disabled=${!r}
            aria-expanded=${r&&l?"false":"true"}
            @click=${r?()=>this._toggleCategoryCollapse(t.key):null}
          >
            [${t.displayName}]${!1!==e.category_show_count&&t.active.length>0?B`<span class="sl-category-count" aria-label="active items"
                  >(${t.active.length})</span
                >`:V}
          </button>
          ${r?B`<button
                type="button"
                class="sl-category-collapse"
                aria-label=${l?"Expand category":"Collapse category"}
                @click=${()=>this._toggleCategoryCollapse(t.key)}
              >
                <ha-icon .icon=${l?"mdi:chevron-down":"mdi:chevron-up"}></ha-icon>
              </button>`:V}
        </div>
        ${l?V:B`<ul class="sl-category-items">
              ${Et(c,t=>t.uid,t=>this._renderItem(t,{hidePrefix:!0}))}
            </ul>`}
      </section>
    `}_renderCompletedToggle(t){const e=this._completedExpanded,i=this._config?.completed_label||"Completed";return B`
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
    `}_renderHeader(){const t=this._config;return B`
      <div class="sl-header">
        ${t.icon?B`<ha-icon class="sl-icon" .icon=${t.icon}></ha-icon>`:V}
        <span class="sl-title">${t.title}</span>
      </div>
    `}_renderItem(t,e){const i=this._config,s="completed"===t.status,o=this._editingUid===t.uid,n=!1!==i.enable_edit,a=!1!==i.enable_remove,r=i.enable_quantity??!1,l=i.quantity_max??0,c=!1!==i.click_to_check,p=i.enable_categories??!1;let d=t.summary,h=null;if(p){const e=Pt(t.summary);h=e.category,d=e.rest}const g=r?Ht(d):{name:d,quantity:1},u=r&&g.quantity>1,m=p&&!e?.hidePrefix&&!!h,y=h?this._categoryColor(h):void 0,_=y?`--shopping-list-category-color: ${y}`:"",f=this._editQuantity>1,b=l<=0||this._editQuantity<l,v=t=>t.preventDefault();return B`
      <li
        class="sl-item ${s?"sl-item--completed":""} ${o?"sl-item--editing":""} ${c?"":"sl-item--no-row-click"}"
        style=${_}
        @click=${e=>{c&&(o||"HA-CHECKBOX"!==e.target.tagName&&this._toggleItem(t))}}
      >
        <ha-checkbox
          class="sl-checkbox"
          .checked=${s}
          ?disabled=${o}
          @change=${()=>this._toggleItem(t)}
        ></ha-checkbox>

        ${o?B`<input
              class="sl-edit-input"
              type="text"
              .value=${this._editDraft}
              aria-label="Edit item"
              @click=${t=>t.stopPropagation()}
              @input=${t=>{this._editDraft=t.target.value}}
              @keydown=${e=>{"Enter"===e.key?(e.preventDefault(),this._saveEdit(t)):"Escape"===e.key&&(e.preventDefault(),this._cancelEdit())}}
              @blur=${()=>{this._editingUid===t.uid&&this._saveEdit(t)}}
            />`:B`<span class="sl-summary">
              ${m?B`<span class="sl-category-prefix">[${h}]</span> `:V}<span class="sl-name">${g.name}</span>${u?B`<span class="sl-quantity-badge">×${g.quantity}</span>`:V}
            </span>`}
        ${o&&r?B`
              <div class="sl-quantity-stepper" aria-label="Item quantity">
                <button
                  type="button"
                  class="sl-quantity-step sl-quantity-step--minus"
                  ?disabled=${!f}
                  aria-label="Decrease quantity"
                  @mousedown=${v}
                  @click=${t=>{t.stopPropagation(),this._adjustEditQuantity(-1)}}
                >
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>
                <span class="sl-quantity-value" aria-live="polite">${this._editQuantity}</span>
                <button
                  type="button"
                  class="sl-quantity-step sl-quantity-step--plus"
                  ?disabled=${!b}
                  aria-label="Increase quantity"
                  @mousedown=${v}
                  @click=${t=>{t.stopPropagation(),this._adjustEditQuantity(1)}}
                >
                  <ha-icon icon="mdi:plus"></ha-icon>
                </button>
              </div>
            `:V}

        <div class="sl-actions">
          ${o?B`
                <ha-icon-button
                  class="sl-action-button sl-action-button-save"
                  .label=${"Save"}
                  @mousedown=${v}
                  @click=${e=>{e.stopPropagation(),this._saveEdit(t)}}
                >
                  <ha-icon icon="mdi:check"></ha-icon>
                </ha-icon-button>
                <ha-icon-button
                  class="sl-action-button sl-action-button-cancel"
                  .label=${"Cancel"}
                  @mousedown=${v}
                  @click=${t=>{t.stopPropagation(),this._cancelEdit()}}
                >
                  <ha-icon icon="mdi:close"></ha-icon>
                </ha-icon-button>
              `:B`
                ${n?B`<ha-icon-button
                      class="sl-action-button sl-action-button-edit"
                      .label=${"Edit"}
                      @click=${e=>{e.stopPropagation(),this._startEdit(t)}}
                    >
                      <ha-icon icon="mdi:pencil"></ha-icon>
                    </ha-icon-button>`:V}
                ${a?B`<ha-icon-button
                      class="sl-action-button sl-action-button-delete"
                      .label=${"Remove"}
                      @click=${e=>{e.stopPropagation(),this._removeItem(t)}}
                    >
                      <ha-icon icon="mdi:close"></ha-icon>
                    </ha-icon-button>`:V}
              `}
        </div>
      </li>
    `}_renderAddRow(t){const e=this._config,i=this._draft.trim().length>0,s=e.enable_quantity??!1,o=e.quantity_max??0,n=this._addQuantity>1,a=o<=0||this._addQuantity<o,r=t=>t.preventDefault();return B`
      <div class="sl-add-row sl-add-row--${t}">
        <input
          class="sl-input"
          type="text"
          placeholder="Add an item…"
          .value=${this._draft}
          @input=${t=>{this._draft=t.target.value}}
          @keydown=${t=>{"Enter"===t.key&&(t.preventDefault(),this._addItem())}}
        />
        ${s?B`
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
            `:V}
        <button
          class="sl-add-button"
          type="button"
          ?disabled=${!i}
          @click=${()=>this._addItem()}
        >
          ${e.add_button_label}
        </button>
      </div>
    `}_extractCustomStyle(){const t=this._config;if(t){if("string"==typeof t.style&&t.style.trim())return t.style;if(t.card_mod){if("string"==typeof t.card_mod)return t.card_mod;if("object"==typeof t.card_mod&&t.card_mod.style)return t.card_mod.style}}}};Lt.styles=Nt,t([gt({attribute:!1})],Lt.prototype,"hass",void 0),t([ut()],Lt.prototype,"_config",void 0),t([ut()],Lt.prototype,"_items",void 0),t([ut()],Lt.prototype,"_loading",void 0),t([ut()],Lt.prototype,"_error",void 0),t([ut()],Lt.prototype,"_draft",void 0),t([ut()],Lt.prototype,"_completedExpanded",void 0),t([ut()],Lt.prototype,"_editingUid",void 0),t([ut()],Lt.prototype,"_editDraft",void 0),t([ut()],Lt.prototype,"_editQuantity",void 0),t([ut()],Lt.prototype,"_addQuantity",void 0),t([ut()],Lt.prototype,"_collapsedCategories",void 0),Lt=t([pt(Ct)],Lt);export{Lt as ShoppingListCard};
