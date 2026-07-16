/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let r=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(s,t,i)},n=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:p}=Object,u=globalThis,_=u.trustedTypes,g=_?_.emptyScript:"",f=u.reactiveElementPolyfillSupport,m=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!a(t,e),b={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:$};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...h(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),r=t.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const o=r.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const o=this.constructor;if(!1===s&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??$)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[m("elementProperties")]=new Map,y[m("finalized")]=new Map,f?.({ReactiveElement:y}),(u.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,w=t=>t,A=x.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+k,P=`<${C}>`,O=document,M=()=>O.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,z=Array.isArray,N="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,T=/>/g,j=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,D=/"/g,I=/^(?:script|style|textarea|title)$/i,V=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),W=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),q=new WeakMap,F=O.createTreeWalker(O,129);function J(t,e){if(!z(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,s=[];let r,o=2===e?"<svg>":3===e?"<math>":"",n=R;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(n.lastIndex=h,l=n.exec(i),null!==l);)h=n.lastIndex,n===R?"!--"===l[1]?n=H:void 0!==l[1]?n=T:void 0!==l[2]?(I.test(l[2])&&(r=RegExp("</"+l[2],"g")),n=j):void 0!==l[3]&&(n=j):n===j?">"===l[0]?(n=r??R,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?j:'"'===l[3]?D:L):n===D||n===L?n=j:n===H||n===T?n=R:(n=j,r=void 0);const d=n===j&&t[e+1].startsWith("/>")?" ":"";o+=n===R?i+P:c>=0?(s.push(a),i.slice(0,c)+S+i.slice(c)+k+d):i+k+(-2===c?e:d)}return[J(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0;const n=t.length-1,a=this.parts,[l,c]=K(t,e);if(this.el=Z.createElement(l,i),F.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=F.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=c[o++],i=s.getAttribute(t).split(k),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?it:Y}),s.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(I.test(s.tagName)){const t=s.textContent.split(k),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],M()),F.nextNode(),a.push({type:2,index:++r});s.append(t[e],M())}}}else if(8===s.nodeType)if(s.data===C)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(k,t+1));)a.push({type:7,index:r}),t+=k.length-1}r++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,s){if(e===W)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=U(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=G(t,r._$AS(t,e.values),r,s)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??O).importNode(e,!0);F.currentNode=s;let r=F.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new X(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new st(r,this,t)),this._$AV.push(e),a=i[++n]}o!==a?.index&&(r=F.nextNode(),o++)}return F.currentNode=O,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),U(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>z(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==B&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Z.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Q(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=q.get(t.strings);return void 0===e&&q.set(t.strings,e=new Z(t)),e}k(t){z(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new X(this.O(M()),this.O(M()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(void 0===r)t=G(this,t,e,0),o=!U(t)||t!==this._$AH&&t!==W,o&&(this._$AH=t);else{const s=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=G(this,s[i+n],e,n),a===W&&(a=this._$AH[n]),o||=!U(a)||a!==this._$AH[n],a===B?t=B:t!==B&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!s&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Y{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}class et extends Y{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==B)}}class it extends Y{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??B)===W)return;const i=this._$AH,s=t===B&&i!==B||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==B&&(i===B||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const rt=x.litHtmlPolyfillSupport;rt?.(Z,X),(x.litHtmlVersions??=[]).push("3.3.3");const ot=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class nt extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new X(e.insertBefore(M(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}nt._$litElement$=!0,nt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:nt});const at=ot.litElementPolyfillSupport;at?.({LitElement:nt}),(ot.litElementVersions??=[]).push("4.2.2");const lt=[{key:"standby",name:"待机",icon:"mdi:power-standby",color:"#546e7a"},{key:"preset",name:"预约中",icon:"mdi:clock-outline",color:"#78909c"},{key:"prewash",name:"预洗",icon:"mdi:water",color:"#29b6f6"},{key:"wash",name:"主洗",icon:"mdi:waves",color:"#42a5f5"},{key:"rinse",name:"漂洗",icon:"mdi:water-outline",color:"#66bb6a"},{key:"spin",name:"脱水",icon:"mdi:refresh",color:"#ffa726"},{key:"dry",name:"烘干",icon:"mdi:fire",color:"#ef5350"},{key:"done",name:"完成",icon:"mdi:check-circle",color:"#66bb6a"},{key:"error",name:"故障",icon:"mdi:alert-circle",color:"#f44336"}];customElements.define("midea-washer-card",class extends nt{static get properties(){return{hass:{type:Object},config:{type:Object},_showModeSelector:{type:Boolean,state:!0}}}static get styles(){return o`
      :host {
        display: block;
      }

      ha-card {
        border-radius: 20px;
        overflow: hidden;
        background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        -webkit-tap-highlight-color: transparent;
        cursor: default;
      }

      .card-body {
        padding: 20px;
        display: flex;
        flex-direction: column;
      }

      /* ── 顶部标题栏 ── */
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
      }
      .header-left {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .header-left ha-icon {
        color: var(--midea-accent, #42a5f5);
        --mdi-icon-size: 22px;
      }
      .header-title {
        color: #e0e0e0;
        font-size: 16px;
        font-weight: 600;
      }
      .status-badge {
        display: flex;
        align-items: center;
        gap: 6px;
        background: rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        padding: 4px 12px;
      }
      .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }
      .status-dot.active {
        animation: pulse 1.5s ease-in-out infinite;
      }
      .status-text {
        font-size: 12px;
        font-weight: 600;
      }

      /* ── 中间区域: 进度环 + 信息 ── */
      .body {
        display: flex;
        align-items: center;
        gap: 24px;
        margin-bottom: 20px;
      }
      .ring-wrap {
        position: relative;
        width: 120px;
        height: 120px;
        flex-shrink: 0;
      }
      .ring-wrap svg {
        width: 100%;
        height: 100%;
        transform: rotate(-90deg);
      }
      .ring-bg {
        fill: none;
        stroke: rgba(255, 255, 255, 0.08);
        stroke-width: 7;
      }
      .ring-fill {
        fill: none;
        stroke-width: 7;
        stroke-linecap: round;
        transition: stroke-dashoffset 1s ease, stroke 0.5s ease;
      }
      .ring-center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        pointer-events: none;
      }
      .ring-value {
        font-size: 28px;
        font-weight: 700;
        color: #fff;
        line-height: 1;
      }
      .ring-unit {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.5);
      }

      .body-info {
        flex: 1;
        min-width: 0;
      }
      .phase-row {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 8px;
      }
      .phase-row ha-icon {
        --mdi-icon-size: 20px;
      }
      .phase-name {
        font-size: 18px;
        font-weight: 600;
        color: #fff;
      }
      .info-line {
        color: rgba(255, 255, 255, 0.6);
        font-size: 13px;
        margin-bottom: 4px;
      }
      .info-line span {
        color: #e0e0e0;
      }

      /* ── 阶段进度条 ── */
      .phases-bar {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        padding: 0 4px;
      }
      .phase-step {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        flex: 1;
      }
      .phase-dot {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.05);
        border: 2px solid rgba(255, 255, 255, 0.1);
        transition: all 0.4s ease;
      }
      .phase-dot.active {
        border-color: var(--phase-color, #42a5f5);
        background: rgba(66, 165, 245, 0.2);
        box-shadow: 0 0 10px rgba(66, 165, 245, 0.3);
      }
      .phase-dot.done {
        border-color: #66bb6a;
        background: rgba(102, 187, 106, 0.2);
      }
      .phase-dot ha-icon {
        --mdi-icon-size: 16px;
        color: #546e7a;
        transition: color 0.4s ease;
      }
      .phase-dot.active ha-icon,
      .phase-dot.done ha-icon {
        color: var(--phase-color, #42a5f5);
      }
      .phase-dot.done ha-icon {
        --phase-color: #66bb6a;
        color: #66bb6a;
      }
      .phase-label {
        font-size: 10px;
        color: #546e7a;
        transition: color 0.4s ease;
      }
      .phase-step.active .phase-label {
        color: var(--phase-color, #42a5f5);
        font-weight: 600;
      }
      .phase-step.done .phase-label {
        color: #66bb6a;
      }
      .phase-conn {
        flex: 0.4;
        height: 2px;
        margin: 0 -4px;
        margin-bottom: 16px;
        background: rgba(255, 255, 255, 0.08);
        transition: background 0.4s ease;
      }
      .phase-conn.done {
        background: #66bb6a;
      }

      /* ── 属性网格 ── */
      .attr-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        margin-bottom: 16px;
      }
      .attr-item {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 10px;
        padding: 10px 12px;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        transition: background 0.3s ease;
      }
      .attr-item:hover {
        background: rgba(255, 255, 255, 0.08);
      }
      .attr-item ha-icon {
        --mdi-icon-size: 18px;
        flex-shrink: 0;
      }
      .attr-text {
        min-width: 0;
      }
      .attr-label {
        color: rgba(255, 255, 255, 0.5);
        font-size: 11px;
      }
      .attr-value {
        color: #fff;
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /* ── 模式选择弹层 ── */
      .mode-selector {
        margin-bottom: 16px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 12px;
        overflow: hidden;
        transition: max-height 0.3s ease;
      }
      .mode-selector-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px;
        cursor: pointer;
        transition: background 0.2s ease;
      }
      .mode-selector-header:hover {
        background: rgba(255, 255, 255, 0.05);
      }
      .mode-selector-header ha-icon {
        --mdi-icon-size: 18px;
        color: #78909c;
      }
      .mode-selector-header .current-mode {
        color: #fff;
        font-size: 14px;
        font-weight: 500;
      }
      .mode-selector-header .label {
        color: rgba(255, 255, 255, 0.6);
        font-size: 13px;
      }
      .mode-selector-header .arrow {
        color: #78909c;
        --mdi-icon-size: 16px;
        transition: transform 0.3s ease;
      }
      .mode-selector-header .arrow.open {
        transform: rotate(180deg);
      }
      .mode-options {
        display: none;
        flex-direction: column;
        gap: 2px;
        padding: 0 8px 8px;
      }
      .mode-options.open {
        display: flex;
      }
      .mode-option {
        padding: 8px 12px;
        border-radius: 8px;
        color: #e0e0e0;
        font-size: 13px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .mode-option:hover {
        background: rgba(255, 255, 255, 0.08);
      }
      .mode-option.selected {
        background: rgba(66, 165, 245, 0.2);
        color: #42a5f5;
        font-weight: 600;
      }

      /* ── 控制按钮 ── */
      .controls {
        display: flex;
        gap: 8px;
      }
      .ctrl-btn {
        flex: 1;
        padding: 12px 0;
        border-radius: 12px;
        border: none;
        cursor: pointer;
        font-size: 13px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        transition: all 0.3s ease;
        -webkit-tap-highlight-color: transparent;
      }
      .ctrl-btn ha-icon {
        --mdi-icon-size: 18px;
      }
      .ctrl-btn:active {
        transform: scale(0.96);
      }
      .ctrl-btn.power-off {
        background: rgba(66, 165, 245, 0.15);
        color: #42a5f5;
      }
      .ctrl-btn.power-off:hover {
        background: rgba(66, 165, 245, 0.25);
      }
      .ctrl-btn.power-on {
        background: rgba(255, 82, 82, 0.15);
        color: #ff5252;
      }
      .ctrl-btn.power-on:hover {
        background: rgba(255, 82, 82, 0.25);
      }
      .ctrl-btn.start {
        background: rgba(76, 175, 80, 0.15);
        color: #4caf50;
      }
      .ctrl-btn.start:hover {
        background: rgba(76, 175, 80, 0.25);
      }
      .ctrl-btn.pause {
        background: rgba(255, 167, 38, 0.15);
        color: #ffa726;
      }
      .ctrl-btn.pause:hover {
        background: rgba(255, 167, 38, 0.25);
      }
      .ctrl-btn:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }

      /* ── 离线提示 ── */
      .offline-msg {
        text-align: center;
        padding: 32px 20px;
        color: #78909c;
      }
      .offline-msg ha-icon {
        --mdi-icon-size: 48px;
        color: #37474f;
      }
      .offline-msg p {
        margin-top: 12px;
        font-size: 14px;
      }

      /* ── 动画 ── */
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .spinning {
        animation: spin 2s linear infinite;
      }
    `}setConfig(t){if(!t.entity)throw new Error("请指定 entity (binary_sensor.xxxx_status)");this.config={entity:t.entity,power_entity:t.power_entity||"",start_pause_entity:t.start_pause_entity||"",mode_entity:t.mode_entity||"",door_entity:t.door_entity||"",water_overheating_entity:t.water_overheating_entity||"",title:t.title||"",attr_progress:t.attr_progress||"progress",attr_time_remaining:t.attr_time_remaining||"time_remaining",attr_wash_mode:t.attr_wash_mode||"wash_mode",attr_temperature:t.attr_temperature||"temperature",attr_spin_speed:t.attr_spin_speed||"spin_speed",attr_water_level:t.attr_water_level||"water_level",attr_phase:t.attr_phase||"job_phase",extra_attrs:t.extra_attrs||[]},this._showModeSelector=!1}get _entity(){return this.config?.entity||""}get _state(){return this.hass?.states[this._entity]}get _attrs(){return this._state?.attributes||{}}get _isOn(){return"on"===this._state?.state}get _devicePrefix(){return this._entity.replace("binary_sensor.","").replace(/_status$/,"")}get _realDevicePrefix(){const t=this._devicePrefix,e=Object.keys(this.hass?.states||{});if(e.some(e=>e.split(".").slice(1).join(".").startsWith(t+"_")))return t;(this._attrs?.friendly_name||"").toLowerCase();const i={};for(const t of e){const e=t.match(/\.(\d{10,})_/);if(e){const t=e[1];i[t]=(i[t]||0)+1}}const s=Object.entries(i).sort((t,e)=>e[1]-t[1]);return s.length>0?s[0][0]:t}_findEntity(t){if(this.config[t+"_entity"])return this.config[t+"_entity"];const e=Object.keys(this.hass?.states||{}),i=this._devicePrefix,s=this._buildCandidates(i,t);for(const t of s)if(void 0!==this.hass?.states[t])return t;const r=this._realDevicePrefix;if(r!==i){const e=this._buildCandidates(r,t);for(const t of e)if(void 0!==this.hass?.states[t])return t}const o=this._getSuffixPatterns(t);for(const t of o){const i=e.find(e=>{const i=e.split(".").slice(1).join(".");return i===t||i.endsWith("_"+t)});if(i)return i}return""}_buildCandidates(t,e){const i=[`${t}_${e}`,`${t}.${e}`];return"power"===e&&i.push(`${t}_power`,`${t}_switch_power`,`switch.${t}_power`,`switch.${t}`),"start_pause"===e&&i.push(`${t}_start_pause`,`${t}_start`,`switch.${t}_start_pause`,`switch.${t}_start`),"wash_mode"!==e&&"mode"!==e||i.push(`${t}_wash_mode`,`${t}_mode`,`select.${t}_wash_mode`,`select.${t}_mode`),"door_status"===e&&i.push(`${t}_door_status`,`${t}_door`,`binary_sensor.${t}_door_status`,`binary_sensor.${t}_door`),"bucket_water_overheating"!==e&&"water_overheating"!==e||i.push(`${t}_bucket_water_overheating`,`${t}_water_overheating`,`binary_sensor.${t}_bucket_water_overheating`,`binary_sensor.${t}_water_overheating`),i}_getSuffixPatterns(t){return"power"===t?["power"]:"start_pause"===t?["start_pause","start"]:"wash_mode"===t||"mode"===t?["wash_mode","mode"]:"door_status"===t?["door_status","door"]:"bucket_water_overheating"===t||"water_overheating"===t?["bucket_water_overheating","water_overheating"]:[t]}get _powerEntity(){return this._findEntity("power")}get _startPauseEntity(){return this._findEntity("start_pause")}get _modeEntity(){return this._findEntity("wash_mode")||this._findEntity("mode")}get _doorEntity(){return this._findEntity("door_status")}get _waterOverheatingEntity(){return this._findEntity("bucket_water_overheating")||this._findEntity("water_overheating")}get _progress(){return parseFloat(this._attrs[this.config.attr_progress])||0}get _timeRemaining(){return function(t){if(null==t||""===t||"--"===t)return"--";const e=parseInt(t,10);if(isNaN(e))return String(t);const i=Math.floor(e/60),s=e%60;return i>0?`${i}:${String(s).padStart(2,"0")}`:`${s} 分钟`}(this._attrs[this.config.attr_time_remaining]||this._attrs.remaining_time||this._attrs.time_left)}get _washMode(){return this._attrs[this.config.attr_wash_mode]||this._attrs.mode||"--"}get _temperature(){return this._attrs[this.config.attr_temperature]||this._attrs.temp||"--"}get _spinSpeed(){return this._attrs[this.config.attr_spin_speed]||this._attrs.spin||"--"}get _waterLevel(){return this._attrs[this.config.attr_water_level]||"--"}get _phase(){const t=this._attrs[this.config.attr_phase]||this._attrs.phase;return function(t,e){if(null!=e&&""!==e){const t=parseInt(e,10);if(!isNaN(t))return lt[t]||lt[0];const i=String(e).toLowerCase(),s=lt.find(t=>t.key===i);if(s)return s}return t<=0?lt[0]:t>0&&t<=15?lt[2]:t>15&&t<=50?lt[3]:t>50&&t<=75?lt[4]:t>75&&t<=95?lt[5]:lt[6]}(this._progress,t)}get _isRunning(){const t=this.hass?.states[this._startPauseEntity];return this._isOn&&"on"===t?.state}get _modeOptions(){const t=this.hass?.states[this._modeEntity];return t&&t.attributes?.options||[]}_callService(t,e,i){this.hass&&i&&this.hass.callService(t,e,{entity_id:i})}_togglePower(){this._callService("switch","toggle",this._powerEntity)}_toggleStartPause(){this._callService("switch","toggle",this._startPauseEntity)}_selectMode(t){this._modeEntity&&(this.hass.callService("select","select_option",{entity_id:this._modeEntity,option:t}),this._showModeSelector=!1)}_toggleModeSelector(){this._showModeSelector=!this._showModeSelector}render(){if(!this._state)return V`
        <ha-card>
          <div class="offline-msg">
            <ha-icon icon="mdi:washing-machine"></ha-icon>
            <p>未找到实体: ${this._entity}</p>
            <p style="font-size:12px;color:#546e7a;margin-top:4px;">请检查卡片配置中的 entity 是否正确</p>
          </div>
        </ha-card>
      `;const t=this._isOn,e=this._isRunning,i=this._progress,s=this._phase,r=t?e?"#42a5f5":"#ffa726":"#78909c",o=t?e?"洗涤中":"已暂停":"待机",n=2*Math.PI*54,a=n-i/100*n,l=[lt[2],lt[3],lt[4],lt[5]],c=l.findIndex(t=>t.key===s.key),h=this._modeOptions,d=this._washMode,p=this.config.extra_attrs||[],u=this._doorEntity,_=u?this.hass?.states[u]:null,g="on"===_?.state,f=this._waterOverheatingEntity,m=f?this.hass?.states[f]:null,v="on"===m?.state;return V`
      <ha-card>
        <div class="card-body">

          <!-- 顶部标题 -->
          <div class="header">
            <div class="header-left">
              <ha-icon icon="mdi:washing-machine" style="color:${r}"></ha-icon>
              <span class="header-title">${this.config.title||"美的洗衣机"}</span>
            </div>
            <div class="status-badge">
              <div class="status-dot ${t?"active":""}" style="background:${r}"></div>
              <span class="status-text" style="color:${r}">${o}</span>
            </div>
          </div>

          <!-- 进度环 + 信息 -->
          <div class="body">
            <div class="ring-wrap">
              <svg viewBox="0 0 120 120">
                <circle class="ring-bg" cx="60" cy="60" r="${54}"></circle>
                <circle class="ring-fill" cx="60" cy="60" r="${54}"
                  stroke="${s.color}"
                  stroke-dasharray="${n}"
                  stroke-dashoffset="${a}">
                </circle>
              </svg>
              <div class="ring-center">
                <div class="ring-value">${Math.round(i)}<span class="ring-unit">%</span></div>
              </div>
            </div>
            <div class="body-info">
              <div class="phase-row">
                <ha-icon icon="${s.icon}" style="color:${s.color}" class="${e&&"wash"===s.key?"spinning":""}"></ha-icon>
                <span class="phase-name" style="color:${s.color}">${s.name}</span>
              </div>
              <div class="info-line">模式: <span>${d}</span></div>
              <div class="info-line">剩余: <span>${this._timeRemaining}</span></div>
            </div>
          </div>

          <!-- 阶段进度条 -->
          ${t?V`
          <div class="phases-bar">
            ${l.map((t,e)=>{const i=c>e,s=c===e;return V`
                <div class="phase-step ${s?"active":""} ${i?"done":""}" style="--phase-color:${t.color}">
                  <div class="phase-dot ${s?"active":""} ${i?"done":""}">
                    <ha-icon icon="${t.icon}"></ha-icon>
                  </div>
                  <span class="phase-label">${t.name}</span>
                </div>
                ${e<l.length-1?V`
                  <div class="phase-conn ${i?"done":""}"></div>
                `:""}
              `})}
          </div>
          `:""}

          <!-- 属性网格 -->
          <div class="attr-grid">
            <div class="attr-item">
              <ha-icon icon="mdi:thermometer" style="color:#ef5350"></ha-icon>
              <div class="attr-text">
                <div class="attr-label">温度</div>
                <div class="attr-value">${this._temperature}</div>
              </div>
            </div>
            <div class="attr-item">
              <ha-icon icon="mdi:rotate-3d-variant" style="color:#42a5f5"></ha-icon>
              <div class="attr-text">
                <div class="attr-label">转速</div>
                <div class="attr-value">${this._spinSpeed}</div>
              </div>
            </div>
            <div class="attr-item">
              <ha-icon icon="mdi:water" style="color:#29b6f6"></ha-icon>
              <div class="attr-text">
                <div class="attr-label">水位</div>
                <div class="attr-value">${this._waterLevel}</div>
              </div>
            </div>
            <div class="attr-item">
              <ha-icon icon="mdi:clock-outline" style="color:#ffa726"></ha-icon>
              <div class="attr-text">
                <div class="attr-label">剩余时间</div>
                <div class="attr-value">${this._timeRemaining}</div>
              </div>
            </div>
            ${_?V`
            <div class="attr-item" style="${g?"background:rgba(255,152,0,0.15);border:1px solid rgba(255,152,0,0.3)":""}">
              <ha-icon icon="${g?"mdi:door-open":"mdi:door-closed"}" style="color:${g?"#ff9800":"#66bb6a"}"></ha-icon>
              <div class="attr-text">
                <div class="attr-label">门状态</div>
                <div class="attr-value" style="color:${g?"#ff9800":"#66bb6a"}">${g?"已开门":"已关门"}</div>
              </div>
            </div>
            `:""}
            ${m?V`
            <div class="attr-item" style="${v?"background:rgba(244,67,54,0.15);border:1px solid rgba(244,67,54,0.3)":""}">
              <ha-icon icon="mdi:thermometer-alert" style="color:${v?"#f44336":"#66bb6a"}"></ha-icon>
              <div class="attr-text">
                <div class="attr-label">水温</div>
                <div class="attr-value" style="color:${v?"#f44336":"#66bb6a"}">${v?"过热报警":"正常"}</div>
              </div>
            </div>
            `:""}
            ${p.map(t=>V`
              <div class="attr-item">
                <ha-icon icon="${t.icon||"mdi:information-outline"}" style="color:${t.color||"#78909c"}"></ha-icon>
                <div class="attr-text">
                  <div class="attr-label">${t.label||t.attr}</div>
                  <div class="attr-value">${this._attrs[t.attr]||"--"}</div>
                </div>
              </div>
            `)}
          </div>

          <!-- 模式选择器 -->
          ${h.length>0?V`
          <div class="mode-selector">
            <div class="mode-selector-header" @click=${this._toggleModeSelector}>
              <div style="display:flex;align-items:center;gap:8px;">
                <ha-icon icon="mdi:tune-variant"></ha-icon>
                <span class="label">洗涤模式</span>
                <span class="current-mode">${d}</span>
              </div>
              <ha-icon icon="mdi:chevron-down" class="arrow ${this._showModeSelector?"open":""}"></ha-icon>
            </div>
            <div class="mode-options ${this._showModeSelector?"open":""}">
              ${h.map(t=>V`
                <div class="mode-option ${t===d?"selected":""}"
                  @click=${()=>this._selectMode(t)}>
                  ${t}
                </div>
              `)}
            </div>
          </div>
          `:""}

          <!-- 控制按钮 -->
          <div class="controls">
            ${t?V`
              <button class="ctrl-btn power-on" @click=${this._togglePower}>
                <ha-icon icon="mdi:power"></ha-icon>
                关机
              </button>
              <button class="ctrl-btn ${e?"pause":"start"}"
                @click=${this._toggleStartPause}>
                <ha-icon icon="${e?"mdi:pause":"mdi:play"}"></ha-icon>
                ${e?"暂停":"启动"}
              </button>
            `:V`
              <button class="ctrl-btn power-off" @click=${this._togglePower}
                ?disabled=${!this._powerEntity}>
                <ha-icon icon="mdi:power"></ha-icon>
                开机
              </button>
            `}
          </div>

        </div>
      </ha-card>
    `}getCardSize(){return 4}static getConfigElement(){return document.createElement("midea-washer-card-editor")}}),customElements.define("midea-washer-card-editor",class extends nt{static get properties(){return{hass:{type:Object},config:{type:Object}}}setConfig(t){this.config=t}_valueChanged(t){if(!this.config||!this.hass)return;const e=t.target;e.configValue&&(this.config={...this.config,[e.configValue]:e.value},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0})))}render(){if(!this.hass||!this.config)return V``;const t=Object.keys(this.hass.states).filter(t=>{if(!t.startsWith("binary_sensor."))return!1;const e=t.replace("binary_sensor.","");if(e.endsWith("_status"))return!0;if(e.endsWith("_zhuang_tai"))return!0;if(e.endsWith("_she_bei_zhuang_tai"))return!0;const i=this.hass.states[t];return"running"===i?.attributes?.device_class}).sort();return V`
      <style>
        .editor { padding: 16px; display: flex; flex-direction: column; gap: 16px; }
        .field { display: flex; flex-direction: column; gap: 4px; }
        .field label { font-size: 12px; color: var(--secondary-text-color); font-weight: 500; }
        .field input, .field select {
          padding: 8px 12px;
          border: 1px solid var(--divider-color);
          border-radius: 8px;
          background: var(--card-background-color);
          color: var(--primary-text-color);
          font-size: 14px;
        }
      </style>
      <div class="editor">
        <div class="field">
          <label>状态实体 (必填)</label>
          <select .value=${this.config.entity||""} configValue="entity" @change=${this._valueChanged}>
            <option value="">-- 选择 Status 实体 --</option>
            ${t.map(t=>V`
              <option value="${t}" ?selected=${this.config.entity===t}>${t}</option>
            `)}
          </select>
        </div>
        <div class="field">
          <label>电源开关实体 (可选，留空自动探测)</label>
          <input type="text" .value=${this.config.power_entity||""} configValue="power_entity"
            @input=${this._valueChanged} placeholder="switch.xxxx_power">
        </div>
        <div class="field">
          <label>启动/暂停实体 (可选)</label>
          <input type="text" .value=${this.config.start_pause_entity||""} configValue="start_pause_entity"
            @input=${this._valueChanged} placeholder="switch.xxxx_start_pause">
        </div>
        <div class="field">
          <label>模式选择实体 (可选)</label>
          <input type="text" .value=${this.config.mode_entity||""} configValue="mode_entity"
            @input=${this._valueChanged} placeholder="select.xxxx_wash_mode">
        </div>
        <div class="field">
          <label>门状态实体 (可选，留空自动探测)</label>
          <input type="text" .value=${this.config.door_entity||""} configValue="door_entity"
            @input=${this._valueChanged} placeholder="binary_sensor.xxxx_door_status">
        </div>
        <div class="field">
          <label>水温过热实体 (可选)</label>
          <input type="text" .value=${this.config.water_overheating_entity||""} configValue="water_overheating_entity"
            @input=${this._valueChanged} placeholder="binary_sensor.xxxx_bucket_water_overheating">
        </div>
        <div class="field">
          <label>卡片标题 (可选)</label>
          <input type="text" .value=${this.config.title||""} configValue="title"
            @input=${this._valueChanged} placeholder="美的洗衣机">
        </div>
      </div>
    `}}),window.customCards=window.customCards||[],window.customCards.push({type:"midea-washer-card",name:"Midea Washer Card",description:"美的洗衣机状态卡片 — 适配 midea_auto_cloud 集成",documentationURL:"https://github.com/tiejiang29/midea-washer-card"});
