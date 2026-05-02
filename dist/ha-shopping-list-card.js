function t(t,e,s,i){var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&o.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new n(s,t,i)},a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:l,defineProperty:p,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:c,getPrototypeOf:g}=Object,u=globalThis,m=u.trustedTypes,_=m?m.emptyScript:"",f=u.reactiveElementPolyfillSupport,v=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},y=(t,e)=>!l(t,e),$={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&p(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:o}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const n=i?.call(this);o?.call(this,e),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...h(t),...c(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),o=e.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const o=(void 0!==s.converter?.toAttribute?s.converter:b).toAttribute(e,s.type);this._$Em=t,null==o?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=i;const n=o.fromAttribute(e,t.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(void 0!==t){const n=this.constructor;if(!1===i&&(o=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??y)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[v("elementProperties")]=new Map,A[v("finalized")]=new Map,f?.({ReactiveElement:A}),(u.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,w=t=>t,E=x.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+k,z=`<${P}>`,U=document,H=()=>U.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,T="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,I=/>/g,L=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,j=/"/g,B=/^(?:script|style|textarea|title)$/i,W=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),q=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),F=new WeakMap,K=U.createTreeWalker(U,129);function J(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}class Z{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[l,p]=((t,e)=>{const s=t.length-1,i=[];let o,n=2===e?"<svg>":3===e?"<math>":"",r=R;for(let e=0;e<s;e++){const s=t[e];let a,l,p=-1,d=0;for(;d<s.length&&(r.lastIndex=d,l=r.exec(s),null!==l);)d=r.lastIndex,r===R?"!--"===l[1]?r=N:void 0!==l[1]?r=I:void 0!==l[2]?(B.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=L):void 0!==l[3]&&(r=L):r===L?">"===l[0]?(r=o??R,p=-1):void 0===l[1]?p=-2:(p=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?L:'"'===l[3]?j:D):r===j||r===D?r=L:r===N||r===I?r=R:(r=L,o=void 0);const h=r===L&&t[e+1].startsWith("/>")?" ":"";n+=r===R?s+z:p>=0?(i.push(a),s.slice(0,p)+C+s.slice(p)+k+h):s+k+(-2===p?e:h)}return[J(t,n+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]})(t,e);if(this.el=Z.createElement(l,s),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=K.nextNode())&&a.length<r;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(C)){const e=p[n++],s=i.getAttribute(t).split(k),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:r[2],strings:s,ctor:"."===r[1]?tt:"?"===r[1]?et:"@"===r[1]?st:Y}),i.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:o}),i.removeAttribute(t));if(B.test(i.tagName)){const t=i.textContent.split(k),e=t.length-1;if(e>0){i.textContent=E?E.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],H()),K.nextNode(),a.push({type:2,index:++o});i.append(t[e],H())}}}else if(8===i.nodeType)if(i.data===P)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(k,t+1));)a.push({type:7,index:o}),t+=k.length-1}o++}}static createElement(t,e){const s=U.createElement("template");return s.innerHTML=t,s}}function G(t,e,s=t,i){if(e===q)return e;let o=void 0!==i?s._$Co?.[i]:s._$Cl;const n=O(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=o:s._$Cl=o),void 0!==o&&(e=G(t,o._$AS(t,e.values),o,i)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??U).importNode(e,!0);K.currentNode=i;let o=K.nextNode(),n=0,r=0,a=s[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new X(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new it(o,this,t)),this._$AV.push(e),a=s[++r]}n!==a?.index&&(o=K.nextNode(),n++)}return K.currentNode=U,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),O(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=Z.createElement(J(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Q(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new Z(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new X(this.O(H()),this.O(H()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=V}_$AI(t,e=this,s,i){const o=this.strings;let n=!1;if(void 0===o)t=G(this,t,e,0),n=!O(t)||t!==this._$AH&&t!==q,n&&(this._$AH=t);else{const i=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=G(this,i[s+r],e,r),a===q&&(a=this._$AH[r]),n||=!O(a)||a!==this._$AH[r],a===V?t=V:t!==V&&(t+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!i&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class et extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class st extends Y{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??V)===q)return;const s=this._$AH,i=t===V&&s!==V||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==V&&(s===V||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const ot={I:X},nt=x.litHtmlPolyfillSupport;nt?.(Z,X),(x.litHtmlVersions??=[]).push("3.3.2");const rt=globalThis;let at=class extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let o=i._$litPart$;if(void 0===o){const t=s?.renderBefore??null;i._$litPart$=o=new X(e.insertBefore(H(),t),t,void 0,s??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}};at._$litElement$=!0,at.finalized=!0,rt.litElementHydrateSupport?.({LitElement:at});const lt=rt.litElementPolyfillSupport;lt?.({LitElement:at}),(rt.litElementVersions??=[]).push("4.2.2");const pt=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:y},ht=(t=dt,e,s)=>{const{kind:i,metadata:o}=s;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),n.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const o=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,o,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const o=this[i];e.call(this,s),this.requestUpdate(i,o,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function ct(t){return(e,s)=>"object"==typeof s?ht(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function gt(t){return ct({...t,state:!0,attribute:!1})}const ut=2;let mt=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const{I:_t}=ot,ft=t=>t,vt=()=>document.createComment(""),bt=(t,e,s)=>{const i=t._$AA.parentNode,o=void 0===e?t._$AB:e._$AA;if(void 0===s){const e=i.insertBefore(vt(),o),n=i.insertBefore(vt(),o);s=new _t(e,n,t,t.options)}else{const e=s._$AB.nextSibling,n=s._$AM,r=n!==t;if(r){let e;s._$AQ?.(t),s._$AM=t,void 0!==s._$AP&&(e=t._$AU)!==n._$AU&&s._$AP(e)}if(e!==o||r){let t=s._$AA;for(;t!==e;){const e=ft(t).nextSibling;ft(i).insertBefore(t,o),t=e}}}return s},yt=(t,e,s=t)=>(t._$AI(e,s),t),$t={},At=(t,e=$t)=>t._$AH=e,xt=t=>{t._$AR(),t._$AA.remove()},wt=(t,e,s)=>{const i=new Map;for(let o=e;o<=s;o++)i.set(t[o],o);return i},Et=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends mt{constructor(t){if(super(t),t.type!==ut)throw Error("repeat() can only be used in text expressions")}dt(t,e,s){let i;void 0===s?s=e:void 0!==e&&(i=e);const o=[],n=[];let r=0;for(const e of t)o[r]=i?i(e,r):r,n[r]=s(e,r),r++;return{values:n,keys:o}}render(t,e,s){return this.dt(t,e,s).values}update(t,[e,s,i]){const o=(t=>t._$AH)(t),{values:n,keys:r}=this.dt(e,s,i);if(!Array.isArray(o))return this.ut=r,n;const a=this.ut??=[],l=[];let p,d,h=0,c=o.length-1,g=0,u=n.length-1;for(;h<=c&&g<=u;)if(null===o[h])h++;else if(null===o[c])c--;else if(a[h]===r[g])l[g]=yt(o[h],n[g]),h++,g++;else if(a[c]===r[u])l[u]=yt(o[c],n[u]),c--,u--;else if(a[h]===r[u])l[u]=yt(o[h],n[u]),bt(t,l[u+1],o[h]),h++,u--;else if(a[c]===r[g])l[g]=yt(o[c],n[g]),bt(t,o[h],o[c]),c--,g++;else if(void 0===p&&(p=wt(r,g,u),d=wt(a,h,c)),p.has(a[h]))if(p.has(a[c])){const e=d.get(r[g]),s=void 0!==e?o[e]:null;if(null===s){const e=bt(t,o[h]);yt(e,n[g]),l[g]=e}else l[g]=yt(s,n[g]),bt(t,o[h],s),o[e]=null;g++}else xt(o[c]),c--;else xt(o[h]),h++;for(;g<=u;){const e=bt(t,l[u+1]);yt(e,n[g]),l[g++]=e}for(;h<=c;){const t=o[h++];null!==t&&xt(t)}return this.ut=r,At(t,l),q}}),St="shopping-list-card",Ct="shopping-list-card-editor",kt={type:`custom:${St}`,title:"Shopping List",show_header:!0,completed:"bottom",completed_label:"Completed",show_add_input:!0,add_button_label:"Add",empty_message:"Nothing on the list",sort:"manual"},Pt=r`
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
    --shopping-list-add-row-margin: 8px 0 0;

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

  .sl-delete-button {
    --mdc-icon-button-size: 32px;
    --mdc-icon-size: 18px;
    color: var(--shopping-list-muted);
    opacity: 0;
    transition: opacity 120ms ease;
  }
  .sl-item:hover .sl-delete-button,
  .sl-item:focus-within .sl-delete-button {
    opacity: 1;
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
    margin: var(--shopping-list-add-row-margin);
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
`,zt=[{name:"entity",required:!0,selector:{entity:{domain:"todo"}}},{type:"expandable",name:"_grp_header",title:"Header",icon:"mdi:format-title",flatten:!0,schema:[{name:"show_header",selector:{boolean:{}}},{name:"title",selector:{text:{}}},{name:"icon",selector:{icon:{}}}]},{type:"expandable",name:"_grp_list",title:"To-do items",icon:"mdi:format-list-bulleted",flatten:!0,schema:[{name:"sort",selector:{select:{mode:"dropdown",options:[{value:"manual",label:"Manual (HA order)"},{value:"alpha",label:"Alphabetical"},{value:"created",label:"Created order"}]}}},{name:"empty_message",selector:{text:{}}}]},{type:"expandable",name:"_grp_completed",title:"Completed items",icon:"mdi:check-circle-outline",flatten:!0,schema:[{name:"completed",selector:{select:{mode:"dropdown",options:[{value:"bottom",label:"At the bottom of the list"},{value:"inline",label:"Mixed with active items"},{value:"collapse",label:"Collapsible section"},{value:"hide",label:"Hide completed items"}]}}},{name:"completed_label",selector:{text:{}}}]},{type:"expandable",name:"_grp_add",title:"Add items",icon:"mdi:plus-circle-outline",flatten:!0,schema:[{name:"show_add_input",selector:{boolean:{}}},{name:"add_button_label",selector:{text:{}}}]}];let Ut=class extends at{constructor(){super(...arguments),this._labelFor=t=>{if("type"in t&&"expandable"===t.type)return t.title??t.name;return{entity:"Todo Entity (required)",title:"Title",icon:"Icon",show_header:"Show header",completed:"Show completed items",completed_label:"Completed group label",show_add_input:"Show add-item input",add_button_label:"Add button label",empty_message:"Empty list message",sort:"Sort order"}[t.name]??t.name}}setConfig(t){this._config=t}render(){return this.hass&&this._config?W`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${zt}
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
    `:W``}_formValueChanged(t){if(t.stopPropagation(),!this._config)return;const e=t.detail.value,s={...this._config,...e};"show_completed"in s&&delete s.show_completed,this._fireChange(s)}_styleChanged(t){if(t.stopPropagation(),!this._config)return;const e=t.detail?.value??"",s={...this._config,style:e};e||delete s.style,this._fireChange(s)}_fireChange(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}};Ut.styles=r`
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
  `,t([ct({attribute:!1})],Ut.prototype,"hass",void 0),t([gt()],Ut.prototype,"_config",void 0),Ut=t([pt(Ct)],Ut);const Ht=window;Ht.customCards=Ht.customCards||[],Ht.customCards.find(t=>t.type===St)||Ht.customCards.push({type:St,name:"Shopping List Card",description:"Work in progress — a Lovelace shopping list card.",preview:!0,documentationURL:"https://github.com/MCuello17/ha-shopping-list"}),console.info("%c SHOPPING-LIST-CARD %c v0.1.0 ","color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: white; font-weight: 700;");let Ot=class extends at{constructor(){super(...arguments),this._items=[],this._loading=!1,this._draft="",this._completedExpanded=!1,this._toggleCompletedExpanded=()=>{this._completedExpanded=!this._completedExpanded}}static getStubConfig(){return{...kt}}static async getConfigElement(){return document.createElement(Ct)}setConfig(t){if(!t)throw new Error("Invalid configuration");const e={...t};void 0===e.completed&&void 0!==e.show_completed&&(e.completed=e.show_completed?"inline":"hide"),this._config={...kt,...e}}getCardSize(){return(this._config?.show_header?2:1)+Math.min(this._items.length,6)}disconnectedCallback(){super.disconnectedCallback(),this._teardownSubscription()}updated(t){super.updated(t);const e=this._config?.entity;e&&this.hass&&e!==this._lastEntity&&(this._lastEntity=e,this._setupSubscription(e))}async _setupSubscription(t){if(this._teardownSubscription(),this.hass){this._loading=!0,this._error=void 0;try{const e=await this.hass.callWS({type:"todo/item/list",entity_id:t});this._items=e.items??[],this._unsub=await this.hass.connection.subscribeMessage(t=>{this._items=t.items??[]},{type:"todo/item/subscribe",entity_id:t})}catch(t){this._error=t instanceof Error?t.message:String(t)}finally{this._loading=!1}}}_teardownSubscription(){if(this._unsub){try{this._unsub()}catch{}this._unsub=void 0}}async _addItem(){const t=this._config?.entity,e=this._draft.trim();if(t&&e&&this.hass)try{await this.hass.callService("todo","add_item",{entity_id:t,item:e}),this._draft=""}catch(t){this._error=t instanceof Error?t.message:String(t)}}async _toggleItem(t){const e=this._config?.entity;if(!e||!this.hass)return;const s="completed"===t.status?"needs_action":"completed";try{await this.hass.callService("todo","update_item",{entity_id:e,item:t.uid,status:s})}catch(t){this._error=t instanceof Error?t.message:String(t)}}async _removeItem(t){const e=this._config?.entity;if(e&&this.hass)try{await this.hass.callService("todo","remove_item",{entity_id:e,item:t.uid})}catch(t){this._error=t instanceof Error?t.message:String(t)}}_sort(t){const e=this._config?.sort;return"alpha"===e?[...t].sort((t,e)=>t.summary.localeCompare(e.summary)):t}_splitItems(){const t=[],e=[];for(const s of this._items)"completed"===s.status?e.push(s):t.push(s);return{active:this._sort(t),completed:this._sort(e)}}render(){if(!this._config||!this.hass)return V;const t=this._config,e=this._extractCustomStyle();return W`
      <ha-card class="sl-card">
        ${t.show_header?this._renderHeader():V}
        ${this._error?W`<div class="sl-error">${this._error}</div>`:V}
        ${this._renderBody()} ${t.show_add_input&&t.entity?this._renderAddRow():V}
      </ha-card>
      ${e?W`<style>
            ${e}
          </style>`:V}
    `}_renderBody(){const t=this._config;if(!t.entity)return W`<div class="sl-empty">
        No todo entity selected. Open the editor to pick one.
      </div>`;if(this._loading&&0===this._items.length)return W`<div class="sl-empty">Loading…</div>`;const e=t.completed??"bottom",{active:s,completed:i}=this._splitItems();let o,n=[],r=!1;return"hide"===e?o=s:"inline"===e?o=this._sort([...this._items]):"bottom"===e?(o=s,n=i):(o=s,r=i.length>0,this._completedExpanded&&(n=i)),0!==o.length||0!==n.length||r?W`
      <ul class="sl-list">
        ${Et(o,t=>t.uid,t=>this._renderItem(t))}
        ${r?this._renderCompletedToggle(i.length):V}
        ${Et(n,t=>t.uid,t=>this._renderItem(t))}
      </ul>
    `:W`<div class="sl-empty">${t.empty_message}</div>`}_renderCompletedToggle(t){const e=this._completedExpanded,s=this._config?.completed_label||"Completed";return W`
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
        <span class="sl-completed-toggle-label">${s} (${t})</span>
      </li>
    `}_renderHeader(){const t=this._config;return W`
      <div class="sl-header">
        ${t.icon?W`<ha-icon class="sl-icon" .icon=${t.icon}></ha-icon>`:V}
        <span class="sl-title">${t.title}</span>
      </div>
    `}_renderItem(t){const e="completed"===t.status;return W`
      <li
        class="sl-item ${e?"sl-item--completed":""}"
        @click=${e=>{"HA-CHECKBOX"!==e.target.tagName&&this._toggleItem(t)}}
      >
        <ha-checkbox
          class="sl-checkbox"
          .checked=${e}
          @change=${()=>this._toggleItem(t)}
        ></ha-checkbox>
        <span class="sl-summary">${t.summary}</span>
        <ha-icon-button
          class="sl-delete-button"
          .label=${"Remove"}
          @click=${e=>{e.stopPropagation(),this._removeItem(t)}}
        >
          <ha-icon icon="mdi:close"></ha-icon>
        </ha-icon-button>
      </li>
    `}_renderAddRow(){const t=this._config,e=this._draft.trim().length>0;return W`
      <div class="sl-add-row">
        <input
          class="sl-input"
          type="text"
          placeholder="Add an item…"
          .value=${this._draft}
          @input=${t=>{this._draft=t.target.value}}
          @keydown=${t=>{"Enter"===t.key&&(t.preventDefault(),this._addItem())}}
        />
        <button
          class="sl-add-button"
          type="button"
          ?disabled=${!e}
          @click=${()=>this._addItem()}
        >
          ${t.add_button_label}
        </button>
      </div>
    `}_extractCustomStyle(){const t=this._config;if(t){if("string"==typeof t.style&&t.style.trim())return t.style;if(t.card_mod){if("string"==typeof t.card_mod)return t.card_mod;if("object"==typeof t.card_mod&&t.card_mod.style)return t.card_mod.style}}}};Ot.styles=Pt,t([ct({attribute:!1})],Ot.prototype,"hass",void 0),t([gt()],Ot.prototype,"_config",void 0),t([gt()],Ot.prototype,"_items",void 0),t([gt()],Ot.prototype,"_loading",void 0),t([gt()],Ot.prototype,"_error",void 0),t([gt()],Ot.prototype,"_draft",void 0),t([gt()],Ot.prototype,"_completedExpanded",void 0),Ot=t([pt(St)],Ot);export{Ot as ShoppingListCard};
