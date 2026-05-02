function t(t,e,s,i){var o,r=arguments.length,n=r<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(r<3?o(n):r>3?o(e,s,n):o(e,s))||n);return r>3&&n&&Object.defineProperty(e,s,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let r=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&o.set(e,t))}return t}toString(){return this.cssText}};const n=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new r(s,t,i)},a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:h,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,_=globalThis,m=_.trustedTypes,g=m?m.emptyScript:"",f=_.reactiveElementPolyfillSupport,$=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},v=(t,e)=>!h(t,e),b={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&c(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:o}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const r=i?.call(this);o?.call(this,e),this.requestUpdate(t,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),o=e.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const o=(void 0!==s.converter?.toAttribute?s.converter:y).toAttribute(e,s.type);this._$Em=t,null==o?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=i;const r=o.fromAttribute(e,t.type);this[i]=r??this._$Ej?.get(i)??r,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(void 0!==t){const r=this.constructor;if(!1===i&&(o=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??v)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==o||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[$("elementProperties")]=new Map,A[$("finalized")]=new Map,f?.({ReactiveElement:A}),(_.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,S=t=>t,E=w.trustedTypes,x=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,O="?"+P,U=`<${O}>`,k=document,H=()=>k.createComment(""),M=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,T="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,L=/>/g,j=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,D=/"/g,B=/^(?:script|style|textarea|title)$/i,q=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),W=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),F=new WeakMap,K=k.createTreeWalker(k,129);function J(t,e){if(!R(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==x?x.createHTML(e):e}const Z=(t,e)=>{const s=t.length-1,i=[];let o,r=2===e?"<svg>":3===e?"<math>":"",n=N;for(let e=0;e<s;e++){const s=t[e];let a,h,c=-1,l=0;for(;l<s.length&&(n.lastIndex=l,h=n.exec(s),null!==h);)l=n.lastIndex,n===N?"!--"===h[1]?n=I:void 0!==h[1]?n=L:void 0!==h[2]?(B.test(h[2])&&(o=RegExp("</"+h[2],"g")),n=j):void 0!==h[3]&&(n=j):n===j?">"===h[0]?(n=o??N,c=-1):void 0===h[1]?c=-2:(c=n.lastIndex-h[2].length,a=h[1],n=void 0===h[3]?j:'"'===h[3]?D:z):n===D||n===z?n=j:n===I||n===L?n=N:(n=j,o=void 0);const d=n===j&&t[e+1].startsWith("/>")?" ":"";r+=n===N?s+U:c>=0?(i.push(a),s.slice(0,c)+C+s.slice(c)+P+d):s+P+(-2===c?e:d)}return[J(t,r+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class G{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,r=0;const n=t.length-1,a=this.parts,[h,c]=Z(t,e);if(this.el=G.createElement(h,s),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=K.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(C)){const e=c[r++],s=i.getAttribute(t).split(P),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:n[2],strings:s,ctor:"."===n[1]?et:"?"===n[1]?st:"@"===n[1]?it:tt}),i.removeAttribute(t)}else t.startsWith(P)&&(a.push({type:6,index:o}),i.removeAttribute(t));if(B.test(i.tagName)){const t=i.textContent.split(P),e=t.length-1;if(e>0){i.textContent=E?E.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],H()),K.nextNode(),a.push({type:2,index:++o});i.append(t[e],H())}}}else if(8===i.nodeType)if(i.data===O)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(P,t+1));)a.push({type:7,index:o}),t+=P.length-1}o++}}static createElement(t,e){const s=k.createElement("template");return s.innerHTML=t,s}}function X(t,e,s=t,i){if(e===W)return e;let o=void 0!==i?s._$Co?.[i]:s._$Cl;const r=M(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=o:s._$Cl=o),void 0!==o&&(e=X(t,o._$AS(t,e.values),o,i)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??k).importNode(e,!0);K.currentNode=i;let o=K.nextNode(),r=0,n=0,a=s[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new Y(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new ot(o,this,t)),this._$AV.push(e),a=s[++n]}r!==a?.index&&(o=K.nextNode(),r++)}return K.currentNode=k,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),M(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>R(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(k.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=G.createElement(J(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Q(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=F.get(t.strings);return void 0===e&&F.set(t.strings,e=new G(t)),e}k(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new Y(this.O(H()),this.O(H()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=S(t).nextSibling;S(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=V}_$AI(t,e=this,s,i){const o=this.strings;let r=!1;if(void 0===o)t=X(this,t,e,0),r=!M(t)||t!==this._$AH&&t!==W,r&&(this._$AH=t);else{const i=t;let n,a;for(t=o[0],n=0;n<o.length-1;n++)a=X(this,i[s+n],e,n),a===W&&(a=this._$AH[n]),r||=!M(a)||a!==this._$AH[n],a===V?t=V:t!==V&&(t+=(a??"")+o[n+1]),this._$AH[n]=a}r&&!i&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class st extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class it extends tt{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??V)===W)return;const s=this._$AH,i=t===V&&s!==V||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==V&&(s===V||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const rt=w.litHtmlPolyfillSupport;rt?.(G,Y),(w.litHtmlVersions??=[]).push("3.3.2");const nt=globalThis;class at extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let o=i._$litPart$;if(void 0===o){const t=s?.renderBefore??null;i._$litPart$=o=new Y(e.insertBefore(H(),t),t,void 0,s??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}at._$litElement$=!0,at.finalized=!0,nt.litElementHydrateSupport?.({LitElement:at});const ht=nt.litElementPolyfillSupport;ht?.({LitElement:at}),(nt.litElementVersions??=[]).push("4.2.2");const ct=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},lt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:v},dt=(t=lt,e,s)=>{const{kind:i,metadata:o}=s;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),r.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const o=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,o,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const o=this[i];e.call(this,s),this.requestUpdate(i,o,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function pt(t){return(e,s)=>"object"==typeof s?dt(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function ut(t){return pt({...t,state:!0,attribute:!1})}const _t="shopping-list-card",mt="shopping-list-card-editor",gt={type:`custom:${_t}`,title:"Shopping List",show_header:!0,show_completed:!1,show_add_input:!0,add_button_label:"Add",empty_message:"Nothing on the list",sort:"manual"},ft=n`
  :host {
    --slc-gap: var(--shopping-list-gap, 8px);
    --slc-radius: var(--shopping-list-radius, 12px);
    --slc-padding: var(--shopping-list-padding, 16px);
    --slc-bg: var(--shopping-list-bg, var(--ha-card-background, var(--card-background-color)));
    --slc-fg: var(--shopping-list-fg, var(--primary-text-color));
    --slc-muted: var(--shopping-list-muted, var(--secondary-text-color));
    --slc-accent: var(--shopping-list-accent, var(--primary-color));
    --slc-completed-fg: var(--shopping-list-completed-fg, var(--disabled-text-color));
    --slc-divider: var(--shopping-list-divider, var(--divider-color));
    display: block;
  }

  ha-card {
    background: var(--slc-bg);
    color: var(--slc-fg);
    border-radius: var(--slc-radius);
    padding: var(--slc-padding);
    display: flex;
    flex-direction: column;
    gap: var(--slc-gap);
  }

  .header {
    display: flex;
    align-items: center;
    gap: var(--slc-gap);
    font-size: 1.1rem;
    font-weight: 500;
  }

  .header ha-icon {
    --mdc-icon-size: 22px;
    color: var(--slc-accent);
  }

  .empty {
    color: var(--slc-muted);
    font-style: italic;
    padding: 12px 4px;
    text-align: center;
  }

  ul.items {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  li.item {
    display: flex;
    align-items: center;
    gap: var(--slc-gap);
    padding: 6px 4px;
    border-bottom: 1px solid var(--slc-divider);
    cursor: pointer;
    user-select: none;
  }

  li.item:last-child {
    border-bottom: none;
  }

  li.item .summary {
    flex: 1;
    word-break: break-word;
  }

  li.item.completed .summary {
    color: var(--slc-completed-fg);
    text-decoration: line-through;
  }

  ha-checkbox {
    --mdc-checkbox-unchecked-color: var(--slc-muted);
    --mdc-theme-secondary: var(--slc-accent);
  }

  .add-row {
    display: flex;
    gap: var(--slc-gap);
    align-items: center;
    margin-top: 4px;
  }

  .add-row ha-textfield {
    flex: 1;
  }

  .delete {
    --mdc-icon-button-size: 32px;
    --mdc-icon-size: 18px;
    color: var(--slc-muted);
    opacity: 0;
    transition: opacity 120ms ease;
  }

  li.item:hover .delete,
  li.item:focus-within .delete {
    opacity: 1;
  }

  .error {
    color: var(--error-color);
    padding: 8px 0;
    font-size: 0.9rem;
  }
`,$t=[{name:"entity",required:!0,selector:{entity:{domain:"todo"}}},{name:"title",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"show_header",selector:{boolean:{}}},{name:"show_completed",selector:{boolean:{}}},{name:"show_add_input",selector:{boolean:{}}},{name:"add_button_label",selector:{text:{}}},{name:"empty_message",selector:{text:{}}},{name:"sort",selector:{select:{mode:"dropdown",options:[{value:"manual",label:"Manual (HA order)"},{value:"alpha",label:"Alphabetical"},{value:"created",label:"Created order"}]}}}];let yt=class extends at{constructor(){super(...arguments),this._labelFor=t=>({entity:"Todo Entity (required)",title:"Title",icon:"Icon",show_header:"Show header",show_completed:"Show completed items",show_add_input:"Show add-item input",add_button_label:"Add button label",empty_message:"Empty list message",sort:"Sort order"}[t.name]??t.name)}setConfig(t){this._config=t}render(){return this.hass&&this._config?q`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${$t}
        .computeLabel=${this._labelFor}
        @value-changed=${this._formValueChanged}
      ></ha-form>

      <div class="group">
        <div class="group-title">Custom CSS (advanced)</div>
        <ha-code-editor
          mode="css"
          .value=${"string"==typeof this._config.style?this._config.style:""}
          @value-changed=${this._styleChanged}
        ></ha-code-editor>
      </div>
    `:q``}_formValueChanged(t){if(t.stopPropagation(),!this._config)return;const e=t.detail.value,s={...this._config,...e};this._fireChange(s)}_styleChanged(t){if(t.stopPropagation(),!this._config)return;const e=t.detail?.value??"",s={...this._config,style:e};e||delete s.style,this._fireChange(s)}_fireChange(t){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}};yt.styles=n`
    :host {
      display: block;
    }
    .group {
      margin-top: 12px;
    }
    .group-title {
      font-weight: 500;
      margin-bottom: 4px;
      color: var(--secondary-text-color);
    }
    ha-code-editor {
      --code-mirror-max-height: 200px;
    }
  `,t([pt({attribute:!1})],yt.prototype,"hass",void 0),t([ut()],yt.prototype,"_config",void 0),yt=t([ct(mt)],yt);const vt=window;vt.customCards=vt.customCards||[],vt.customCards.find(t=>t.type===_t)||vt.customCards.push({type:_t,name:"Shopping List Card",description:"Work in progress — a Lovelace shopping list card.",preview:!0,documentationURL:"https://github.com/MCuello17/ha-shopping-list"}),console.info("%c SHOPPING-LIST-CARD %c v0.1.0 ","color: white; background: #03a9f4; font-weight: 700;","color: #03a9f4; background: white; font-weight: 700;");let bt=class extends at{constructor(){super(...arguments),this._items=[],this._loading=!1,this._draft=""}static getStubConfig(){return{...gt}}static async getConfigElement(){return document.createElement(mt)}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={...gt,...t}}getCardSize(){return(this._config?.show_header?2:1)+Math.min(this._items.length,6)}disconnectedCallback(){super.disconnectedCallback(),this._teardownSubscription()}updated(t){super.updated(t);const e=this._config?.entity;e&&this.hass&&e!==this._lastEntity&&(this._lastEntity=e,this._setupSubscription(e))}async _setupSubscription(t){if(this._teardownSubscription(),this.hass){this._loading=!0,this._error=void 0;try{const e=await this.hass.callWS({type:"todo/item/list",entity_id:t});this._items=e.items??[],this._unsub=await this.hass.connection.subscribeMessage(t=>{this._items=t.items??[]},{type:"todo/item/subscribe",entity_id:t})}catch(t){this._error=t instanceof Error?t.message:String(t)}finally{this._loading=!1}}}_teardownSubscription(){if(this._unsub){try{this._unsub()}catch{}this._unsub=void 0}}async _addItem(){const t=this._config?.entity,e=this._draft.trim();if(t&&e&&this.hass)try{await this.hass.callService("todo","add_item",{entity_id:t,item:e}),this._draft=""}catch(t){this._error=t instanceof Error?t.message:String(t)}}async _toggleItem(t){const e=this._config?.entity;if(!e||!this.hass)return;const s="completed"===t.status?"needs_action":"completed";try{await this.hass.callService("todo","update_item",{entity_id:e,item:t.uid,status:s})}catch(t){this._error=t instanceof Error?t.message:String(t)}}async _removeItem(t){const e=this._config?.entity;if(e&&this.hass)try{await this.hass.callService("todo","remove_item",{entity_id:e,item:t.uid})}catch(t){this._error=t instanceof Error?t.message:String(t)}}_visibleItems(){const t=this._config;if(!t)return[];let e=[...this._items];if(t.show_completed||(e=e.filter(t=>"completed"!==t.status)),"alpha"===t.sort)e.sort((t,e)=>t.summary.localeCompare(e.summary));return e}render(){if(!this._config||!this.hass)return V;const t=this._config,e=this._visibleItems(),s=this._extractCustomStyle();return q`
      <ha-card>
        ${t.show_header?this._renderHeader():V}
        ${this._error?q`<div class="error">${this._error}</div>`:V}
        ${t.entity?this._loading&&0===this._items.length?q`<div class="empty">Loading…</div>`:0===e.length?q`<div class="empty">${t.empty_message}</div>`:q`<ul class="items">
                  ${e.map(t=>this._renderItem(t))}
                </ul>`:q`<div class="empty">No todo entity selected. Open the editor to pick one.</div>`}
        ${t.show_add_input&&t.entity?this._renderAddRow():V}
      </ha-card>
      ${s?q`<style>
            ${s}
          </style>`:V}
    `}_renderHeader(){const t=this._config;return q`
      <div class="header">
        ${t.icon?q`<ha-icon .icon=${t.icon}></ha-icon>`:V}
        <span>${t.title}</span>
      </div>
    `}_renderItem(t){const e="completed"===t.status;return q`
      <li
        class="item ${e?"completed":""}"
        @click=${e=>{"HA-CHECKBOX"!==e.target.tagName&&this._toggleItem(t)}}
      >
        <ha-checkbox .checked=${e} @change=${()=>this._toggleItem(t)}></ha-checkbox>
        <span class="summary">${t.summary}</span>
        <ha-icon-button
          class="delete"
          .label=${"Remove"}
          @click=${e=>{e.stopPropagation(),this._removeItem(t)}}
        >
          <ha-icon icon="mdi:close"></ha-icon>
        </ha-icon-button>
      </li>
    `}_renderAddRow(){const t=this._config;return q`
      <div class="add-row">
        <ha-textfield
          .value=${this._draft}
          .placeholder=${"Add an item…"}
          @input=${t=>this._draft=t.target.value}
          @keydown=${t=>{"Enter"===t.key&&(t.preventDefault(),this._addItem())}}
        ></ha-textfield>
        <mwc-button raised @click=${()=>this._addItem()}>${t.add_button_label}</mwc-button>
      </div>
    `}_extractCustomStyle(){const t=this._config;if(t){if("string"==typeof t.style&&t.style.trim())return t.style;if(t.card_mod){if("string"==typeof t.card_mod)return t.card_mod;if("object"==typeof t.card_mod&&t.card_mod.style)return t.card_mod.style}}}};bt.styles=ft,t([pt({attribute:!1})],bt.prototype,"hass",void 0),t([ut()],bt.prototype,"_config",void 0),t([ut()],bt.prototype,"_items",void 0),t([ut()],bt.prototype,"_loading",void 0),t([ut()],bt.prototype,"_error",void 0),t([ut()],bt.prototype,"_draft",void 0),bt=t([ct(_t)],bt);export{bt as ShoppingListCard};
