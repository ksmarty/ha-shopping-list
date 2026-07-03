//#region node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js
var e = globalThis, t = e.ShadowRoot && (e.ShadyCSS === void 0 || e.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, n = Symbol(), r = /* @__PURE__ */ new WeakMap(), i = class {
	constructor(e, t, r) {
		if (this._$cssResult$ = !0, r !== n) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, n = this.t;
		if (t && e === void 0) {
			let t = n !== void 0 && n.length === 1;
			t && (e = r.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), t && r.set(n, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, a = (e) => new i(typeof e == "string" ? e : e + "", void 0, n), o = (e, ...t) => new i(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, n), s = (n, r) => {
	if (t) n.adoptedStyleSheets = r.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let t of r) {
		let r = document.createElement("style"), i = e.litNonce;
		i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, n.appendChild(r);
	}
}, c = t ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return a(t);
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: f, getOwnPropertySymbols: p, getPrototypeOf: m } = Object, h = globalThis, g = h.trustedTypes, ee = g ? g.emptyScript : "", te = h.reactiveElementPolyfillSupport, _ = (e, t) => e, v = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? ee : null;
				break;
			case Object:
			case Array: e = e == null ? e : JSON.stringify(e);
		}
		return e;
	},
	fromAttribute(e, t) {
		let n = e;
		switch (t) {
			case Boolean:
				n = e !== null;
				break;
			case Number:
				n = e === null ? null : Number(e);
				break;
			case Object:
			case Array: try {
				n = JSON.parse(e);
			} catch {
				n = null;
			}
		}
		return n;
	}
}, y = (e, t) => !l(e, t), ne = {
	attribute: !0,
	type: String,
	converter: v,
	reflect: !1,
	useDefault: !1,
	hasChanged: y
};
Symbol.metadata ??= Symbol("metadata"), h.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var b = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = ne) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && u(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = d(this.prototype, e) ?? {
			get() {
				return this[t];
			},
			set(e) {
				this[t] = e;
			}
		};
		return {
			get: r,
			set(t) {
				let a = r?.call(this);
				i?.call(this, t), this.requestUpdate(e, a, n);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(e) {
		return this.elementProperties.get(e) ?? ne;
	}
	static _$Ei() {
		if (this.hasOwnProperty(_("elementProperties"))) return;
		let e = m(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(_("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(_("properties"))) {
			let e = this.properties, t = [...f(e), ...p(e)];
			for (let n of t) this.createProperty(n, e[n]);
		}
		let e = this[Symbol.metadata];
		if (e !== null) {
			let t = litPropertyMetadata.get(e);
			if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
		}
		this._$Eh = /* @__PURE__ */ new Map();
		for (let [e, t] of this.elementProperties) {
			let n = this._$Eu(e, t);
			n !== void 0 && this._$Eh.set(n, e);
		}
		this.elementStyles = this.finalizeStyles(this.styles);
	}
	static finalizeStyles(e) {
		let t = [];
		if (Array.isArray(e)) {
			let n = new Set(e.flat(Infinity).reverse());
			for (let e of n) t.unshift(c(e));
		} else e !== void 0 && t.push(c(e));
		return t;
	}
	static _$Eu(e, t) {
		let n = t.attribute;
		return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
	}
	constructor() {
		super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
	}
	_$Ev() {
		this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
	}
	addController(e) {
		(this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
	}
	removeController(e) {
		this._$EO?.delete(e);
	}
	_$E_() {
		let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
		for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
		e.size > 0 && (this._$Ep = e);
	}
	createRenderRoot() {
		let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
		return s(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach((e) => e.hostDisconnected?.());
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? v : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? v : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? y)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
			this.C(e, t, n);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
		n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
	}
	async _$EP() {
		this.isUpdatePending = !0;
		try {
			await this._$ES;
		} catch (e) {
			Promise.reject(e);
		}
		let e = this.scheduleUpdate();
		return e != null && await e, !this.isUpdatePending;
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		if (!this.hasUpdated) {
			if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
				for (let [e, t] of this._$Ep) this[e] = t;
				this._$Ep = void 0;
			}
			let e = this.constructor.elementProperties;
			if (e.size > 0) for (let [t, n] of e) {
				let { wrapped: e } = n, r = this[t];
				!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
			}
		}
		let e = !1, t = this._$AL;
		try {
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
	}
	_$EM() {
		this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
	}
	get updateComplete() {
		return this.getUpdateComplete();
	}
	getUpdateComplete() {
		return this._$ES;
	}
	shouldUpdate(e) {
		return !0;
	}
	update(e) {
		this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[_("elementProperties")] = /* @__PURE__ */ new Map(), b[_("finalized")] = /* @__PURE__ */ new Map(), te?.({ ReactiveElement: b }), (h.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/lit-html.js
var x = globalThis, re = (e) => e, S = x.trustedTypes, ie = S ? S.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ae = "$lit$", C = `lit$${Math.random().toFixed(9).slice(2)}$`, w = "?" + C, oe = `<${w}>`, T = document, E = () => T.createComment(""), D = (e) => e === null || typeof e != "object" && typeof e != "function", O = Array.isArray, se = (e) => O(e) || typeof e?.[Symbol.iterator] == "function", k = "[ 	\n\f\r]", A = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ce = /-->/g, le = />/g, j = RegExp(`>|${k}(?:([^\\s"'>=/]+)(${k}*=${k}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), ue = /'/g, de = /"/g, fe = /^(?:script|style|textarea|title)$/i, M = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), N = Symbol.for("lit-noChange"), P = Symbol.for("lit-nothing"), pe = /* @__PURE__ */ new WeakMap(), F = T.createTreeWalker(T, 129);
function me(e, t) {
	if (!O(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return ie === void 0 ? t : ie.createHTML(t);
}
var he = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = A;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === A ? c[1] === "!--" ? o = ce : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = j) : (fe.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = j) : o = le : o === j ? c[0] === ">" ? (o = i ?? A, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? j : c[3] === "\"" ? de : ue) : o === de || o === ue ? o = j : o === ce || o === le ? o = A : (o = j, i = void 0);
		let d = o === j && e[t + 1].startsWith("/>") ? " " : "";
		a += o === A ? n + oe : l >= 0 ? (r.push(s), n.slice(0, l) + ae + n.slice(l) + C + d) : n + C + (l === -2 ? t : d);
	}
	return [me(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, I = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = he(t, n);
		if (this.el = e.createElement(l, r), F.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = F.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(ae)) {
					let t = u[o++], n = i.getAttribute(e).split(C), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? _e : r[1] === "?" ? ve : r[1] === "@" ? ye : z
					}), i.removeAttribute(e);
				} else e.startsWith(C) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (fe.test(i.tagName)) {
					let e = i.textContent.split(C), t = e.length - 1;
					if (t > 0) {
						i.textContent = S ? S.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], E()), F.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], E());
					}
				}
			} else if (i.nodeType === 8) if (i.data === w) c.push({
				type: 2,
				index: a
			});
			else {
				let e = -1;
				for (; (e = i.data.indexOf(C, e + 1)) !== -1;) c.push({
					type: 7,
					index: a
				}), e += C.length - 1;
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = T.createElement("template");
		return n.innerHTML = e, n;
	}
};
function L(e, t, n = e, r) {
	if (t === N) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = D(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = L(e, i._$AS(e, t.values), i, r)), t;
}
var ge = class {
	constructor(e, t) {
		this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
	}
	get parentNode() {
		return this._$AM.parentNode;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	u(e) {
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? T).importNode(t, !0);
		F.currentNode = r;
		let i = F.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new R(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new be(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = F.nextNode(), a++);
		}
		return F.currentNode = T, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, R = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = P, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
	}
	get parentNode() {
		let e = this._$AA.parentNode, t = this._$AM;
		return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(e, t = this) {
		e = L(this, e, t), D(e) ? e === P || e == null || e === "" ? (this._$AH !== P && this._$AR(), this._$AH = P) : e !== this._$AH && e !== N && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? se(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== P && D(this._$AH) ? this._$AA.nextSibling.data = e : this.T(T.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = I.createElement(me(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new ge(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = pe.get(e.strings);
		return t === void 0 && pe.set(e.strings, t = new I(e)), t;
	}
	k(t) {
		O(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(E()), this.O(E()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = re(e).nextSibling;
			re(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, z = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = P, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = P;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = L(this, e, t, 0), a = !D(e) || e !== this._$AH && e !== N, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = L(this, r[n + o], t, o), s === N && (s = this._$AH[o]), a ||= !D(s) || s !== this._$AH[o], s === P ? e = P : e !== P && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === P ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, _e = class extends z {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === P ? void 0 : e;
	}
}, ve = class extends z {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== P);
	}
}, ye = class extends z {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = L(this, e, t, 0) ?? P) === N) return;
		let n = this._$AH, r = e === P && n !== P || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== P && (n === P || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, be = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		L(this, e);
	}
}, xe = {
	M: ae,
	P: C,
	A: w,
	C: 1,
	L: he,
	R: ge,
	D: se,
	V: L,
	I: R,
	H: z,
	N: ve,
	U: ye,
	B: _e,
	F: be
}, Se = x.litHtmlPolyfillSupport;
Se?.(I, R), (x.litHtmlVersions ??= []).push("3.3.3");
var Ce = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new R(t.insertBefore(E(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, B = globalThis, V = class extends b {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ce(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return N;
	}
};
V._$litElement$ = !0, V.finalized = !0, B.litElementHydrateSupport?.({ LitElement: V });
var we = B.litElementPolyfillSupport;
we?.({ LitElement: V }), (B.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/custom-element.js
var Te = (e) => (t, n) => {
	n === void 0 ? customElements.define(e, t) : n.addInitializer(() => {
		customElements.define(e, t);
	});
}, Ee = {
	attribute: !0,
	type: String,
	converter: v,
	reflect: !1,
	hasChanged: y
}, De = (e = Ee, t, n) => {
	let { kind: r, metadata: i } = n, a = globalThis.litPropertyMetadata.get(i);
	if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(n.name, e), r === "accessor") {
		let { name: r } = n;
		return {
			set(n) {
				let i = t.get.call(this);
				t.set.call(this, n), this.requestUpdate(r, i, e, !0, n);
			},
			init(t) {
				return t !== void 0 && this.C(r, void 0, e, t), t;
			}
		};
	}
	if (r === "setter") {
		let { name: r } = n;
		return function(n) {
			let i = this[r];
			t.call(this, n), this.requestUpdate(r, i, e, !0, n);
		};
	}
	throw Error("Unsupported decorator location: " + r);
};
function H(e) {
	return (t, n) => typeof n == "object" ? De(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/state.js
function U(e) {
	return H({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/directive.js
var Oe = {
	ATTRIBUTE: 1,
	CHILD: 2,
	PROPERTY: 3,
	BOOLEAN_ATTRIBUTE: 4,
	EVENT: 5,
	ELEMENT: 6
}, ke = (e) => (...t) => ({
	_$litDirective$: e,
	values: t
}), Ae = class {
	constructor(e) {}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AT(e, t, n) {
		this._$Ct = e, this._$AM = t, this._$Ci = n;
	}
	_$AS(e, t) {
		return this.update(e, t);
	}
	update(e, t) {
		return this.render(...t);
	}
}, { I: je } = xe, Me = (e) => e, Ne = () => document.createComment(""), W = (e, t, n) => {
	let r = e._$AA.parentNode, i = t === void 0 ? e._$AB : t._$AA;
	if (n === void 0) n = new je(r.insertBefore(Ne(), i), r.insertBefore(Ne(), i), e, e.options);
	else {
		let t = n._$AB.nextSibling, a = n._$AM, o = a !== e;
		if (o) {
			let t;
			n._$AQ?.(e), n._$AM = e, n._$AP !== void 0 && (t = e._$AU) !== a._$AU && n._$AP(t);
		}
		if (t !== i || o) {
			let e = n._$AA;
			for (; e !== t;) {
				let t = Me(e).nextSibling;
				Me(r).insertBefore(e, i), e = t;
			}
		}
	}
	return n;
}, G = (e, t, n = e) => (e._$AI(t, n), e), Pe = {}, Fe = (e, t = Pe) => e._$AH = t, Ie = (e) => e._$AH, Le = (e) => {
	e._$AR(), e._$AA.remove();
}, Re = (e, t, n) => {
	let r = /* @__PURE__ */ new Map();
	for (let i = t; i <= n; i++) r.set(e[i], i);
	return r;
}, K = ke(class extends Ae {
	constructor(e) {
		if (super(e), e.type !== Oe.CHILD) throw Error("repeat() can only be used in text expressions");
	}
	dt(e, t, n) {
		let r;
		n === void 0 ? n = t : t !== void 0 && (r = t);
		let i = [], a = [], o = 0;
		for (let t of e) i[o] = r ? r(t, o) : o, a[o] = n(t, o), o++;
		return {
			values: a,
			keys: i
		};
	}
	render(e, t, n) {
		return this.dt(e, t, n).values;
	}
	update(e, [t, n, r]) {
		let i = Ie(e), { values: a, keys: o } = this.dt(t, n, r);
		if (!Array.isArray(i)) return this.ut = o, a;
		let s = this.ut ??= [], c = [], l, u, d = 0, f = i.length - 1, p = 0, m = a.length - 1;
		for (; d <= f && p <= m;) if (i[d] === null) d++;
		else if (i[f] === null) f--;
		else if (s[d] === o[p]) c[p] = G(i[d], a[p]), d++, p++;
		else if (s[f] === o[m]) c[m] = G(i[f], a[m]), f--, m--;
		else if (s[d] === o[m]) c[m] = G(i[d], a[m]), W(e, c[m + 1], i[d]), d++, m--;
		else if (s[f] === o[p]) c[p] = G(i[f], a[p]), W(e, i[d], i[f]), f--, p++;
		else if (l === void 0 && (l = Re(o, p, m), u = Re(s, d, f)), l.has(s[d])) if (l.has(s[f])) {
			let t = u.get(o[p]), n = t === void 0 ? null : i[t];
			if (n === null) {
				let t = W(e, i[d]);
				G(t, a[p]), c[p] = t;
			} else c[p] = G(n, a[p]), W(e, i[d], n), i[t] = null;
			p++;
		} else Le(i[f]), f--;
		else Le(i[d]), d++;
		for (; p <= m;) {
			let t = W(e, c[m + 1]);
			G(t, a[p]), c[p++] = t;
		}
		for (; d <= f;) {
			let e = i[d++];
			e !== null && Le(e);
		}
		return this.ut = o, Fe(e, c), N;
	}
}), ze = "0.2.0", Be = "shopping-list-card-improved", Ve = "shopping-list-card-improved-editor", q = {
	type: `custom:${Be}`,
	title: "Shopping List",
	show_header: !0,
	completed: "bottom",
	completed_label: "Completed",
	show_add_input: !0,
	add_input_position: "bottom",
	add_button_label: "Add",
	enable_edit: !0,
	enable_remove: !0,
	click_to_check: !0,
	enable_quantity: !1,
	quantity_max: 0,
	enable_categories: !1,
	group_by_category: !0,
	category_collapsible: !0,
	category_check_all: !0,
	category_show_count: !0,
	general_category_label: "General",
	empty_message: "Nothing on the list",
	sort: "manual",
	fill_screen: !1,
	enable_reorder: !0
}, He = /^\s*\[([^\]]+)\]\s*/;
function Ue(e) {
	let t = e.match(He);
	if (!t) return {
		category: null,
		rest: e
	};
	let n = t[1].trim(), r = e.slice(t[0].length);
	return n ? {
		category: n,
		rest: r
	} : {
		category: null,
		rest: r
	};
}
function We(e) {
	let t = {};
	if (!e) return t;
	for (let n of e.split("\n")) {
		let e = n.trim();
		if (!e || e.startsWith("#")) continue;
		let r = e.replace(/^-\s*/, ""), i = r.indexOf(":");
		if (i <= 0) continue;
		let a = r.slice(0, i).trim(), o = r.slice(i + 1).trim();
		o = o.replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1"), a && o && (t[a] = o);
	}
	return t;
}
function Ge(e) {
	return e ? Object.entries(e).map(([e, t]) => `${e}: ${t}`).join("\n") : "";
}
var Ke = Object.freeze({
	General: "grey",
	Veggies: "green"
}), qe = /<quantity:\s*(\d+)\s*>/gi;
function Je(e) {
	let t = null;
	for (let n of e.matchAll(qe)) {
		let e = Number.parseInt(n[1], 10);
		Number.isFinite(e) && e > 0 && (t = e);
	}
	return {
		name: e.replace(qe, "").replace(/\s+/g, " ").trim(),
		quantity: t ?? 1
	};
}
function Ye(e, t) {
	let n = e.trim();
	return t <= 1 ? n : `${n} <quantity: ${t}>`;
}
function J(e, t) {
	let n = Math.floor(Number(e) || 1), r = Math.max(1, n);
	return t && t > 0 ? Math.min(r, t) : r;
}
//#endregion
//#region src/styles.ts
var Xe = o`
  :host {
    --shopping-list-pill-bg: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.04);
    --shopping-list-pill-bg-hover: rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.08);
    --shopping-list-pill-border: 1px solid rgba(var(--rgb-primary-text-color, 33, 33, 33), 0.06);

    --shopping-list-bg: var(--ha-card-background, var(--card-background-color, white));
    --shopping-list-fg: var(--primary-text-color, #212121);
    --shopping-list-muted: var(--secondary-text-color, #727272);
    --shopping-list-accent: var(--primary-color, #03a9f4);
    --shopping-list-error: var(--error-color, #db4437);
    --shopping-list-radius: 20px;
    --shopping-list-padding: 16px;
    --shopping-list-gap: 4px;

    --shopping-list-inner-radius: 14px;

    --shopping-list-header-gap: 10px;
    --shopping-list-header-padding: 4px 8px 8px;
    --shopping-list-header-icon-size: 22px;
    --shopping-list-header-icon-color: currentColor;
    --shopping-list-header-font-size: 1.1rem;
    --shopping-list-header-font-weight: 500;

    --shopping-list-item-bg: var(--shopping-list-pill-bg);
    --shopping-list-item-bg-hover: var(--shopping-list-pill-bg-hover);
    --shopping-list-item-radius: var(--shopping-list-inner-radius);
    --shopping-list-item-padding: 8px 12px;
    --shopping-list-item-gap: 12px;
    --shopping-list-list-gap: 4px;

    --shopping-list-actions-gap: 0px;
    --shopping-list-action-size: 28px;
    --shopping-list-action-icon-size: 16px;
    --shopping-list-action-margin: -4px 0;

    --shopping-list-quantity-badge-bg: rgba(var(--rgb-primary-color, 3, 169, 244), 0.14);
    --shopping-list-quantity-badge-fg: var(--shopping-list-accent);
    --shopping-list-quantity-badge-padding: 1px 8px;
    --shopping-list-quantity-badge-radius: 999px;
    --shopping-list-quantity-badge-font-size: 0.85em;
    --shopping-list-quantity-badge-font-weight: 600;
    --shopping-list-quantity-badge-margin: 0 0 0 6px;

    --shopping-list-quantity-stepper-gap: 2px;
    --shopping-list-quantity-step-size: 28px;
    --shopping-list-quantity-step-icon-size: 16px;
    --shopping-list-quantity-step-bg: var(--shopping-list-pill-bg);
    --shopping-list-quantity-step-bg-hover: var(--shopping-list-pill-bg-hover);
    --shopping-list-quantity-step-fg: var(--shopping-list-fg);
    --shopping-list-quantity-step-radius: 999px;
    --shopping-list-quantity-value-min-width: 22px;

    --shopping-list-completed-fg: var(--disabled-text-color, #bdbdbd);
    --shopping-list-completed-decoration: line-through;

    --shopping-list-completed-toggle-bg: transparent;
    --shopping-list-completed-toggle-bg-hover: var(--shopping-list-pill-bg);
    --shopping-list-completed-toggle-fg: var(--shopping-list-muted);
    --shopping-list-completed-toggle-padding: 6px 10px;
    --shopping-list-completed-toggle-radius: var(--shopping-list-inner-radius);
    --shopping-list-completed-toggle-font-size: 0.85rem;
    --shopping-list-completed-toggle-font-weight: 500;
    --shopping-list-completed-toggle-icon-size: 18px;
    --shopping-list-completed-toggle-margin: 6px 0 0;

    --shopping-list-input-bg: var(--shopping-list-pill-bg);
    --shopping-list-input-bg-focus: var(--shopping-list-pill-bg-hover);
    --shopping-list-input-fg: var(--shopping-list-fg);
    --shopping-list-input-placeholder: var(--shopping-list-muted);
    --shopping-list-input-border: var(--shopping-list-pill-border);
    --shopping-list-input-border-focus: 1px solid var(--shopping-list-accent);
    --shopping-list-input-radius: var(--shopping-list-inner-radius);
    --shopping-list-input-padding: 10px 14px;
    --shopping-list-input-font-size: 0.95rem;

    --shopping-list-button-bg: var(--shopping-list-accent);
    --shopping-list-button-fg: var(--text-primary-color, white);
    --shopping-list-button-radius: var(--shopping-list-inner-radius);
    --shopping-list-button-padding: 10px 16px;
    --shopping-list-button-font-size: 0.95rem;
    --shopping-list-button-font-weight: 500;

    --shopping-list-empty-fg: var(--shopping-list-muted);
    --shopping-list-empty-padding: 16px 8px;

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

    --shopping-list-add-row-gap: 8px;
    --shopping-list-add-row-spacing: 8px;

    --shopping-list-drag-handle-size: 24px;
    --shopping-list-drag-handle-icon-size: 18px;
    --shopping-list-drag-handle-color: var(--shopping-list-muted);
    --shopping-list-drag-handle-active-color: var(--shopping-list-accent);
    --shopping-list-drag-over-bg: rgba(var(--rgb-primary-color, 3, 169, 244), 0.1);
    --shopping-list-drag-over-border-color: var(--shopping-list-accent);

    --shopping-list-offline-bg: rgba(var(--rgb-error-color, 219, 68, 55), 0.1);
    --shopping-list-offline-fg: var(--shopping-list-error);
    --shopping-list-offline-padding: 6px 12px;
    --shopping-list-offline-font-size: 0.85rem;

    display: block;
    height: var(--shopping-list-host-height, auto);
  }

  .sl-card {
    background: var(--shopping-list-bg);
    color: var(--shopping-list-fg);
    border-radius: var(--shopping-list-radius);
    padding: var(--shopping-list-padding);
    display: flex;
    flex-direction: column;
    gap: var(--shopping-list-gap);
    height: var(--shopping-list-card-height, auto);
    max-height: var(--shopping-list-card-max-height, none);
    box-sizing: border-box;
    overflow: hidden;
  }
  .sl-card--fill-screen {
    height: 100%;
    max-height: 100%;
  }

  .sl-header {
    display: flex;
    align-items: center;
    gap: var(--shopping-list-header-gap);
    padding: var(--shopping-list-header-padding);
    font-size: var(--shopping-list-header-font-size);
    font-weight: var(--shopping-list-header-font-weight);
    flex-shrink: 0;
  }

  .sl-icon {
    --mdc-icon-size: var(--shopping-list-header-icon-size);
    color: var(--shopping-list-header-icon-color);
  }

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
    flex-shrink: 0;
  }

  .sl-offline {
    color: var(--shopping-list-offline-fg);
    background: var(--shopping-list-offline-bg);
    border-radius: var(--shopping-list-inner-radius);
    padding: var(--shopping-list-offline-padding);
    font-size: var(--shopping-list-offline-font-size);
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  .sl-list-scroll {
    flex: 1;
    overflow-y: auto;
    min-height: 0;
    -webkit-overflow-scrolling: touch;
  }
  .sl-list-scroll::-webkit-scrollbar {
    width: 4px;
  }
  .sl-list-scroll::-webkit-scrollbar-thumb {
    background: var(--shopping-list-pill-bg-hover);
    border-radius: 2px;
  }

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
    position: relative;
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
  .sl-item--no-row-click {
    cursor: default;
  }
  .sl-item--no-row-click:active {
    transform: none;
  }

  .sl-item--dragging {
    opacity: 0.5;
  }

  .sl-item--drop-above::before {
    content: "";
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--shopping-list-accent);
    border-radius: 1px;
    z-index: 1;
  }

  .sl-item--drop-below::after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--shopping-list-accent);
    border-radius: 1px;
    z-index: 1;
  }

  .sl-item--completed .sl-summary {
    color: var(--shopping-list-completed-fg);
    text-decoration: var(--shopping-list-completed-decoration);
  }

  .sl-checkbox {
    --mdc-checkbox-unchecked-color: var(--shopping-list-muted);
    --mdc-theme-secondary: var(--shopping-list-accent);
    margin: -8px 0 -8px -8px;
    flex-shrink: 0;
  }

  .sl-summary {
    flex: 1;
    word-break: break-word;
    min-width: 0;
  }

  .sl-drag-handle {
    width: var(--shopping-list-drag-handle-size);
    height: var(--shopping-list-drag-handle-size);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--shopping-list-drag-handle-color);
    cursor: grab;
    --mdc-icon-size: var(--shopping-list-drag-handle-icon-size);
    border-radius: 4px;
    transition: color 120ms ease;
  }
  .sl-drag-handle:hover {
    color: var(--shopping-list-drag-handle-active-color);
  }
  .sl-drag-handle:active {
    cursor: grabbing;
    color: var(--shopping-list-drag-handle-active-color);
  }

  .sl-actions {
    display: flex;
    align-items: center;
    gap: var(--shopping-list-actions-gap);
    flex-shrink: 0;
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
    --ha-icon-button-size: var(--shopping-list-action-size);
    --mdc-icon-button-size: var(--shopping-list-action-size);
    --mdc-icon-size: var(--shopping-list-action-icon-size);
    color: var(--shopping-list-muted);
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

  .sl-grouped-completed {
    margin: 0;
    padding: 0;
  }

  .sl-category-prefix {
    color: var(--shopping-list-category-color);
    font-weight: var(--shopping-list-category-prefix-font-weight);
    opacity: var(--shopping-list-category-prefix-opacity);
    margin: var(--shopping-list-category-prefix-margin);
  }
  .sl-item--completed .sl-category-prefix {
    color: var(--shopping-list-completed-fg);
  }

  .sl-add-row {
    display: flex;
    gap: var(--shopping-list-add-row-gap);
    align-items: center;
    flex-shrink: 0;
  }
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
`;
//#endregion
//#region \0@oxc-project+runtime@0.137.0/helpers/esm/decorate.js
function Y(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/shopping-list-card-editor.ts
var Ze, Qe = "yaml", $e = 8, et = [
	{
		name: "entity",
		required: !0,
		selector: { entity: { domain: "todo" } }
	},
	{
		type: "expandable",
		name: "_grp_header",
		title: "Header",
		icon: "mdi:format-title",
		flatten: !0,
		schema: [
			{
				name: "show_header",
				selector: { boolean: {} }
			},
			{
				name: "title",
				selector: { text: {} }
			},
			{
				name: "icon",
				selector: { icon: {} }
			}
		]
	},
	{
		type: "expandable",
		name: "_grp_list",
		title: "To-do items",
		icon: "mdi:format-list-bulleted",
		flatten: !0,
		schema: [
			{
				name: "sort",
				selector: { select: {
					mode: "dropdown",
					options: [
						{
							value: "manual",
							label: "Manual (HA order)"
						},
						{
							value: "alpha",
							label: "Alphabetical"
						},
						{
							value: "created",
							label: "Created order"
						}
					]
				} }
			},
			{
				name: "click_to_check",
				selector: { boolean: {} }
			},
			{
				name: "enable_edit",
				selector: { boolean: {} }
			},
			{
				name: "enable_remove",
				selector: { boolean: {} }
			},
			{
				name: "enable_reorder",
				selector: { boolean: {} }
			},
			{
				name: "empty_message",
				selector: { text: {} }
			}
		]
	},
	{
		type: "expandable",
		name: "_grp_quantity",
		title: "Quantities",
		icon: "mdi:counter",
		flatten: !0,
		schema: [{
			name: "enable_quantity",
			selector: { boolean: {} }
		}, {
			name: "quantity_max",
			selector: { number: {
				min: 0,
				max: 9999,
				step: 1,
				mode: "box"
			} }
		}]
	},
	{
		type: "expandable",
		name: "_grp_layout",
		title: "Layout",
		icon: "mdi:view-quilt",
		flatten: !0,
		schema: [{
			name: "fill_screen",
			selector: { boolean: {} }
		}]
	},
	{
		type: "expandable",
		name: "_grp_completed",
		title: "Completed items",
		icon: "mdi:check-circle-outline",
		flatten: !0,
		schema: [{
			name: "completed",
			selector: { select: {
				mode: "dropdown",
				options: [
					{
						value: "bottom",
						label: "At the bottom of the list"
					},
					{
						value: "inline",
						label: "Mixed with active items"
					},
					{
						value: "collapse",
						label: "Collapsible section"
					},
					{
						value: "hide",
						label: "Hide completed items"
					}
				]
			} }
		}, {
			name: "completed_label",
			selector: { text: {} }
		}]
	},
	{
		type: "expandable",
		name: "_grp_add",
		title: "Add items",
		icon: "mdi:plus-circle-outline",
		flatten: !0,
		schema: [
			{
				name: "show_add_input",
				selector: { boolean: {} }
			},
			{
				name: "add_input_position",
				selector: { select: {
					mode: "dropdown",
					options: [{
						value: "bottom",
						label: "Bottom (below the list)"
					}, {
						value: "top",
						label: "Top (below the header)"
					}]
				} }
			},
			{
				name: "add_button_label",
				selector: { text: {} }
			}
		]
	}
], tt = [
	{
		name: "enable_categories",
		selector: { boolean: {} }
	},
	{
		name: "group_by_category",
		selector: { boolean: {} }
	},
	{
		name: "category_collapsible",
		selector: { boolean: {} }
	},
	{
		name: "category_check_all",
		selector: { boolean: {} }
	},
	{
		name: "category_show_count",
		selector: { boolean: {} }
	},
	{
		name: "general_category_label",
		selector: { text: {} }
	}
], X = (Ze = class extends V {
	constructor(...e) {
		super(...e), this._labelFor = (e) => "type" in e && e.type === "expandable" ? e.title ?? e.name : {
			entity: "Todo Entity (required)",
			title: "Title",
			icon: "Icon",
			show_header: "Show header",
			completed: "Show completed items",
			completed_label: "Completed group label",
			show_add_input: "Show add-item input",
			add_input_position: "Add bar position",
			add_button_label: "Add button label",
			empty_message: "Empty list message",
			sort: "Sort order",
			click_to_check: "Click row to check/uncheck",
			enable_edit: "Allow editing items",
			enable_remove: "Allow removing items",
			enable_quantity: "Enable quantities",
			quantity_max: "Maximum quantity (0 = unlimited)",
			enable_categories: "Enable categories",
			group_by_category: "Group items by category",
			category_collapsible: "Allow collapsing categories",
			category_check_all: "Allow check-all on categories",
			category_show_count: "Show item count on category headers",
			general_category_label: "Label for uncategorized items",
			fill_screen: "Fill the screen (use full available height)",
			enable_reorder: "Allow drag-and-drop reorder"
		}[e.name] ?? e.name;
	}
	setConfig(e) {
		this._config = e;
	}
	updated(e) {
		super.updated(e), this._patchHaFormSpacing();
	}
	_patchHaFormSpacing() {
		for (let e of this.renderRoot.querySelectorAll("ha-form")) {
			let t = e.shadowRoot;
			if (!t || t.querySelector("style[data-sl-spacing]")) continue;
			let n = document.createElement("style");
			n.setAttribute("data-sl-spacing", ""), n.textContent = `.root > *:not([own-margin]):not(:last-child) { margin-bottom: ${$e}px !important; }`, t.appendChild(n);
		}
	}
	render() {
		if (!this.hass || !this._config) return M``;
		let e = {
			...q,
			...this._config
		};
		return M`
      <ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${et}
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
            .data=${e}
            .schema=${tt}
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
            .mode=${Qe}
            .value=${Ge(this._config.category_colors === void 0 ? Ke : this._config.category_colors)}
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
            .mode=${Qe}
            .value=${typeof this._config.style == "string" ? this._config.style : ""}
            @value-changed=${this._styleChanged}
          ></ha-code-editor>
        </div>
      </details>
    `;
	}
	_formValueChanged(e) {
		if (e.stopPropagation(), !this._config) return;
		let t = e.detail.value, n = this._config, r = q, i = { ...this._config };
		for (let [e, a] of Object.entries(t)) {
			let t = e in n, o = a === r[e];
			(t || !o) && (i[e] = a);
		}
		"show_completed" in i && delete i.show_completed, this._fireChange(i);
	}
	_styleChanged(e) {
		if (e.stopPropagation(), !this._config) return;
		let t = e.detail?.value ?? "", n = {
			...this._config,
			style: t
		};
		t || delete n.style, this._fireChange(n);
	}
	_categoryColorsChanged(e) {
		if (e.stopPropagation(), !this._config) return;
		let t = We(e.detail?.value ?? ""), n = {
			...this._config,
			category_colors: t
		};
		this._fireChange(n);
	}
	_fireChange(e) {
		this.dispatchEvent(new CustomEvent("config-changed", {
			detail: { config: e },
			bubbles: !0,
			composed: !0
		}));
	}
}, Ze.styles = o`
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
      margin-top: ${a(`${$e}px`)};
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
  `, Ze);
Y([H({ attribute: !1 })], X.prototype, "hass", void 0), Y([U()], X.prototype, "_config", void 0), X = Y([Te(Ve)], X);
//#endregion
//#region src/shopping-list-card.ts
var Z, nt = "__general__", Q = window;
Q.customCards = Q.customCards || [], Q.customCards.find((e) => e.type === "shopping-list-card-improved") || Q.customCards.push({
	type: Be,
	name: "Shopping List Card",
	description: "A shopping-style list view for any todo entity, with categories, quantities, offline support, and drag-and-drop reorder.",
	preview: !0,
	documentationURL: "https://github.com/ksmarty/ha-shopping-list"
}), console.info(`%c SHOPPING-LIST-CARD %c v${ze} `, "color: white; background: #03a9f4; font-weight: 700;", "color: #03a9f4; background: white; font-weight: 700;");
var $ = (Z = class extends V {
	constructor(...e) {
		super(...e), this._items = [], this._loading = !1, this._draft = "", this._completedExpanded = !1, this._editDraft = "", this._editQuantity = 1, this._addQuantity = 1, this._collapsedCategories = /* @__PURE__ */ new Set(), this._connected = !0, this._offlineQueue = [], this._draggedUid = null, this._dropPosition = "above", this._focusEditOnUpdate = !1, this._connectionUnsubs = [], this._itemOrder = [], this._toggleCompletedExpanded = () => {
			this._completedExpanded = !this._completedExpanded;
		};
	}
	static getStubConfig() {
		return { ...q };
	}
	static async getConfigElement() {
		return document.createElement(Ve);
	}
	setConfig(e) {
		if (!e) throw Error("Invalid configuration");
		let t = { ...e };
		t.completed === void 0 && t.show_completed !== void 0 && (t.completed = t.show_completed ? "inline" : "hide"), this._config = {
			...q,
			...t
		}, this._loadItemOrder();
	}
	getCardSize() {
		return (this._config?.show_header ? 2 : 1) + Math.min(this._items.length, 6);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._teardownSubscription(), this._teardownConnectionMonitoring();
	}
	updated(e) {
		if (super.updated(e), this._focusEditOnUpdate) {
			let e = this.renderRoot.querySelector(".sl-edit-input");
			e && (e.focus(), e.select(), this._focusEditOnUpdate = !1);
		}
		e.has("_config") && this._config && (this._config.fill_screen ? this.style.setProperty("--shopping-list-host-height", "100%") : this.style.removeProperty("--shopping-list-host-height"));
		let t = this._config?.entity;
		!t || !this.hass || t !== this._lastEntity && (this._lastEntity = t, this._setupSubscription(t), this._setupConnectionMonitoring());
	}
	_setupConnectionMonitoring() {
		this._teardownConnectionMonitoring();
		let e = this.hass?.connection;
		if (!e) return;
		let t = "connected" in e ? !!e.connected : !0;
		this._connected = t;
		let n = () => {
			this._connected = !0, this._flushOfflineQueue();
		}, r = () => {
			this._connected = !1;
		};
		typeof e.addEventListener == "function" && (e.addEventListener("ready", n), e.addEventListener("disconnected", r), this._connectionUnsubs.push(() => {
			e.removeEventListener("ready", n), e.removeEventListener("disconnected", r);
		})), window.addEventListener("online", n), window.addEventListener("offline", r), this._connectionUnsubs.push(() => {
			window.removeEventListener("online", n), window.removeEventListener("offline", r);
		});
	}
	_teardownConnectionMonitoring() {
		for (let e of this._connectionUnsubs) try {
			e();
		} catch {}
		this._connectionUnsubs = [];
	}
	async _executeService(e, t, n) {
		if (this.hass) {
			if (!this._connected) {
				this._offlineQueue = [...this._offlineQueue, {
					domain: e,
					service: t,
					serviceData: n
				}];
				return;
			}
			try {
				await this.hass.callService(e, t, n);
			} catch (r) {
				this._isConnectionError(r) ? (this._connected = !1, this._offlineQueue = [...this._offlineQueue, {
					domain: e,
					service: t,
					serviceData: n
				}]) : this._error = r instanceof Error ? r.message : String(r);
			}
		}
	}
	_isConnectionError(e) {
		if (e instanceof Error) {
			let t = e.message.toLowerCase();
			return t.includes("connection") || t.includes("network") || t.includes("fetch") || t.includes("websocket") || t.includes("closed") || t.includes("offline");
		}
		return !1;
	}
	async _flushOfflineQueue() {
		if (!this.hass || this._offlineQueue.length === 0) return;
		let e = [...this._offlineQueue];
		this._offlineQueue = [];
		for (let t of e) try {
			await this.hass.callService(t.domain, t.service, t.serviceData);
		} catch (e) {
			if (this._isConnectionError(e)) {
				this._offlineQueue = [t, ...this._offlineQueue], this._connected = !1;
				return;
			}
		}
		let t = this._config?.entity;
		if (t) try {
			let e = await this.hass.callWS({
				type: "todo/item/list",
				entity_id: t
			});
			this._items = e.items ?? [];
		} catch {}
	}
	_getOrderKey() {
		return `shopping_list_order_${this._config?.entity ?? "default"}`;
	}
	_loadItemOrder() {
		try {
			let e = localStorage.getItem(this._getOrderKey());
			e ? this._itemOrder = JSON.parse(e) : this._itemOrder = [];
		} catch {
			this._itemOrder = [];
		}
	}
	_saveItemOrder() {
		try {
			this._itemOrder.length > 0 ? localStorage.setItem(this._getOrderKey(), JSON.stringify(this._itemOrder)) : localStorage.removeItem(this._getOrderKey());
		} catch {}
	}
	_getOrderedItems(e) {
		let t = this._config, n = t?.sort, r = t?.enable_reorder !== !1;
		if (n === "manual" && r && this._itemOrder.length > 0) {
			let t = new Set(e.map((e) => e.uid)), n = this._itemOrder.filter((e) => t.has(e)), r = e.filter((e) => !n.includes(e.uid));
			return [...n.map((t) => e.find((e) => e.uid === t)).filter(Boolean), ...r];
		}
		return n === "alpha" ? [...e].sort((e, t) => e.summary.localeCompare(t.summary)) : e;
	}
	_onDragStart(e) {
		let t = e.target.closest(".sl-item");
		if (!t) return;
		let n = t.dataset.uid;
		n && (this._draggedUid = n, e.dataTransfer?.setData("text/plain", n), e.dataTransfer && (e.dataTransfer.effectAllowed = "move"), t.classList.add("sl-item--dragging"));
	}
	_onDragOver(e) {
		if (e.preventDefault(), !e.dataTransfer) return;
		e.dataTransfer.dropEffect = "move", this.renderRoot.querySelectorAll(".sl-item--drop-above, .sl-item--drop-below").forEach((e) => e.classList.remove("sl-item--drop-above", "sl-item--drop-below"));
		let t = this.renderRoot.querySelectorAll(".sl-item");
		if (t.length === 0) return;
		let n = e.clientY;
		for (let e of t) {
			if (e.dataset.uid === this._draggedUid) continue;
			let t = e.getBoundingClientRect();
			if (n <= t.top + t.height / 2) {
				this._dropPosition = "above", e.classList.add("sl-item--drop-above");
				return;
			}
		}
		let r = t[t.length - 1];
		this._dropPosition = "below", r.classList.add("sl-item--drop-below");
	}
	_onDropWrapper(e) {
		e.preventDefault();
		let t = this.renderRoot.querySelector(".sl-item--drop-above, .sl-item--drop-below");
		this.renderRoot.querySelectorAll(".sl-item--drop-above, .sl-item--drop-below, .sl-item--dragging").forEach((e) => e.classList.remove("sl-item--drop-above", "sl-item--drop-below", "sl-item--dragging"));
		let n = t?.dataset.uid;
		if (!n || !this._draggedUid || this._draggedUid === n) {
			this._draggedUid = null, this._dropPosition = "above";
			return;
		}
		let r = this._getOrderedItems(this._items), i = r.findIndex((e) => e.uid === this._draggedUid), a = r.findIndex((e) => e.uid === n);
		if (i === -1 || a === -1) {
			this._draggedUid = null, this._dropPosition = "above";
			return;
		}
		let [o] = r.splice(i, 1), s = r.findIndex((e) => e.uid === n), c = s >= 0 ? this._dropPosition === "below" ? s + 1 : s : a > i ? a - 1 : a;
		r.splice(c, 0, o);
		let l = new Set(this._items.filter((e) => e.status !== "completed").map((e) => e.uid));
		this._itemOrder = r.filter((e) => l.has(e.uid) || e.status === "needs_action").map((e) => e.uid), this._saveItemOrder(), this._draggedUid = null, this._dropPosition = "above", this.requestUpdate();
	}
	_onDragEnd() {
		this.renderRoot.querySelectorAll(".sl-item--drop-above, .sl-item--drop-below, .sl-item--dragging").forEach((e) => e.classList.remove("sl-item--drop-above", "sl-item--drop-below", "sl-item--dragging")), this._draggedUid = null, this._dropPosition = "above";
	}
	async _setupSubscription(e) {
		if (this._teardownSubscription(), this.hass) {
			this._loading = !0, this._error = void 0;
			try {
				let t = await this.hass.callWS({
					type: "todo/item/list",
					entity_id: e
				});
				this._items = t.items ?? [], this._unsub = await this.hass.connection.subscribeMessage((e) => {
					this._items = e.items ?? [];
				}, {
					type: "todo/item/subscribe",
					entity_id: e
				});
			} catch (e) {
				this._error = e instanceof Error ? e.message : String(e);
			} finally {
				this._loading = !1;
			}
		}
	}
	_teardownSubscription() {
		if (this._unsub) {
			try {
				this._unsub();
			} catch {}
			this._unsub = void 0;
		}
	}
	async _addItem() {
		let e = this._config, t = e?.entity, n = this._draft.trim();
		if (!t || !n || !this.hass) return;
		let r = e.enable_quantity ?? !1, i = J(this._addQuantity, e.quantity_max ?? 0), a = r ? Ye(n, i) : n, o = `temp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`, s = {
			uid: o,
			summary: a,
			status: "needs_action"
		};
		this._connected || (this._items = [...this._items, s]);
		try {
			await this._executeService("todo", "add_item", {
				entity_id: t,
				item: a
			}), this._draft = "", this._addQuantity = 1;
		} catch {
			this._items = this._items.filter((e) => e.uid !== o);
		}
	}
	_adjustAddQuantity(e) {
		let t = this._config?.quantity_max ?? 0;
		this._addQuantity = J(this._addQuantity + e, t);
	}
	async _toggleItem(e) {
		let t = this._config?.entity;
		if (!t || !this.hass) return;
		let n = e.status === "completed" ? "needs_action" : "completed";
		this._connected || (this._items = this._items.map((t) => t.uid === e.uid ? {
			...t,
			status: n
		} : t));
		try {
			await this._executeService("todo", "update_item", {
				entity_id: t,
				item: e.uid,
				status: n
			});
		} catch {
			this._items = this._items.map((t) => t.uid === e.uid ? {
				...t,
				status: e.status
			} : t);
		}
	}
	async _removeItem(e) {
		let t = this._config?.entity;
		if (!(!t || !this.hass)) {
			this._connected || (this._items = this._items.filter((t) => t.uid !== e.uid));
			try {
				await this._executeService("todo", "remove_item", {
					entity_id: t,
					item: e.uid
				});
			} catch {
				this._connected || (this._items = [...this._items, e]);
			}
		}
	}
	async _toggleCategoryAll(e, t) {
		let n = this._config?.entity;
		if (!n || !this.hass || e.length === 0) return;
		let r = t ? "needs_action" : "completed";
		if (!this._connected) {
			let t = new Set(e.filter((e) => e.status !== r).map((e) => e.uid));
			this._items = this._items.map((e) => t.has(e.uid) ? {
				...e,
				status: r
			} : e);
		}
		let i = e.filter((e) => e.status !== r);
		for (let e of i) try {
			await this._executeService("todo", "update_item", {
				entity_id: n,
				item: e.uid,
				status: r
			});
		} catch (e) {
			this._error = e instanceof Error ? e.message : String(e);
			return;
		}
	}
	_toggleCategoryCollapse(e) {
		let t = new Set(this._collapsedCategories);
		t.has(e) ? t.delete(e) : t.add(e), this._collapsedCategories = t;
	}
	_categoryColor(e) {
		let t = this._config;
		return (t.category_colors === void 0 ? Ke : t.category_colors)[e];
	}
	_startEdit(e) {
		if (this._config?.enable_quantity ?? !1) {
			let { name: t, quantity: n } = Je(e.summary);
			this._editDraft = t, this._editQuantity = n;
		} else this._editDraft = e.summary, this._editQuantity = 1;
		this._editingUid = e.uid, this._focusEditOnUpdate = !0;
	}
	_cancelEdit() {
		this._editingUid = void 0, this._editDraft = "", this._editQuantity = 1;
	}
	async _saveEdit(e) {
		if (this._editingUid !== e.uid) return;
		let t = this._config;
		if (!t) {
			this._cancelEdit();
			return;
		}
		let n = this._editDraft.trim();
		if (!n) {
			this._cancelEdit();
			return;
		}
		let r = t.enable_quantity ?? !1 ? Ye(n, J(this._editQuantity, t.quantity_max ?? 0)) : n;
		if (r === e.summary) {
			this._cancelEdit();
			return;
		}
		let i = t.entity;
		if (!i || !this.hass) {
			this._cancelEdit();
			return;
		}
		this._cancelEdit(), this._connected || (this._items = this._items.map((t) => t.uid === e.uid ? {
			...t,
			summary: r
		} : t));
		try {
			await this._executeService("todo", "update_item", {
				entity_id: i,
				item: e.uid,
				rename: r
			});
		} catch {
			this._items = this._items.map((t) => t.uid === e.uid ? {
				...t,
				summary: e.summary
			} : t);
		}
	}
	_adjustEditQuantity(e) {
		let t = this._config?.quantity_max ?? 0;
		this._editQuantity = J(this._editQuantity + e, t);
	}
	_sort(e) {
		return this._getOrderedItems(e);
	}
	_splitItems() {
		let e = [], t = [];
		for (let n of this._items) n.status === "completed" ? t.push(n) : e.push(n);
		return {
			active: this._sort(e),
			completed: this._sort(t)
		};
	}
	_buildGroups() {
		let e = this._config, t = e.general_category_label || "General", n = /* @__PURE__ */ new Map(), r = [];
		for (let e of this._items) {
			let { category: i } = Ue(e.summary), a = i ?? nt, o = n.get(a);
			o || (o = {
				key: a,
				category: i,
				displayName: i ?? t,
				active: [],
				completed: []
			}, n.set(a, o), r.push(a)), e.status === "completed" ? o.completed.push(e) : o.active.push(e);
		}
		let i = r.map((e) => {
			let t = n.get(e);
			return {
				...t,
				active: this._sort(t.active),
				completed: this._sort(t.completed)
			};
		});
		return e.sort === "alpha" && i.sort((e, t) => e.displayName.localeCompare(t.displayName)), i;
	}
	render() {
		if (!this._config || !this.hass) return P;
		let e = this._config, t = this._extractCustomStyle(), n = !!(e.show_add_input && e.entity), r = e.fill_screen ?? !1, i = e.add_input_position ?? "bottom";
		return M`
      <ha-card class="sl-card ${r ? "sl-card--fill-screen" : ""}">
        ${e.show_header ? this._renderHeader() : P}
        ${this._error ? M`<div class="sl-error">${this._error}</div>` : P}
        ${this._offlineQueue.length > 0 ? this._renderOfflineBanner() : P}
        ${n && i === "top" ? this._renderAddRow("top") : P}
        ${this._renderScrollWrapper()}
        ${n && i !== "top" ? this._renderAddRow("bottom") : P}
      </ha-card>
      ${t ? M`<style>
              ${t}
            </style>` : P}
    `;
	}
	_renderOfflineBanner() {
		let e = this._offlineQueue.length;
		return M`
      <div class="sl-offline">
        <ha-icon icon="mdi:cloud-off-outline"></ha-icon>
        <span>Offline — ${e} pending change${e === 1 ? "" : "s"}</span>
      </div>
    `;
	}
	_renderScrollWrapper() {
		let e = this._config, t = e.enable_reorder !== !1 && (e.sort === "manual" || !e.sort);
		return M`
      <div
        class="sl-list-scroll"
        @dragover=${t ? this._onDragOver : null}
        @drop=${t ? this._onDropWrapper : null}
      >
        ${this._renderBody()}
      </div>
    `;
	}
	_renderBody() {
		let e = this._config;
		return e.entity ? this._loading && this._items.length === 0 ? M`<div class="sl-empty">Loading…</div>` : e.enable_categories && e.group_by_category !== !1 ? this._renderGrouped() : this._renderFlat() : M`<div class="sl-empty">
        No todo entity selected. Open the editor to pick one.
      </div>`;
	}
	_renderFlat() {
		let e = this._config, t = e.completed ?? "bottom", { active: n, completed: r } = this._splitItems(), i, a = [], o = !1;
		return t === "hide" ? i = n : t === "inline" ? i = this._sort([...this._items]) : t === "bottom" ? (i = n, a = r) : (i = n, o = r.length > 0, this._completedExpanded && (a = r)), i.length === 0 && a.length === 0 && !o ? M`<div class="sl-empty">${e.empty_message}</div>` : M`
      <ul class="sl-list">
        ${K(i, (e) => e.uid, (e) => this._renderItem(e))}
        ${o ? this._renderCompletedToggle(r.length) : P}
        ${K(a, (e) => e.uid, (e) => this._renderItem(e))}
      </ul>
    `;
	}
	_renderGrouped() {
		let e = this._config, t = e.completed ?? "bottom", n = this._buildGroups(), r = [], i = !1;
		if (t === "collapse") {
			let e = [];
			for (let t of n) e.push(...t.completed);
			r = this._sort(e), i = r.length > 0;
		}
		let a = n.filter((e) => t === "hide" || t === "collapse" ? e.active.length > 0 : e.active.length + e.completed.length > 0);
		return a.length === 0 && !i ? M`<div class="sl-empty">${e.empty_message}</div>` : M`
      <div class="sl-list sl-list--grouped">
        ${K(a, (e) => e.key, (e) => this._renderGroup(e))}
        ${i ? M`
                <ul class="sl-list sl-grouped-completed">
                  ${this._renderCompletedToggle(r.length)}
                  ${this._completedExpanded ? K(r, (e) => e.uid, (e) => this._renderItem(e, { hidePrefix: !1 })) : P}
                </ul>
              ` : P}
      </div>
    `;
	}
	_renderGroup(e) {
		let t = this._config, n = t.completed ?? "bottom", r = n === "collapse" ? e.active : [...e.active, ...e.completed], i = r.length > 0 && r.every((e) => e.status === "completed"), a = !i && r.some((e) => e.status === "completed"), o = t.category_check_all !== !1, s = t.category_collapsible !== !1, c = s && this._collapsedCategories.has(e.key), l;
		l = n === "hide" || n === "collapse" ? e.active : n === "inline" ? this._sort([...e.active, ...e.completed]) : [...e.active, ...e.completed];
		let u = this._categoryColor(e.displayName);
		return M`
      <section class="sl-category" style=${u ? `--shopping-list-category-color: ${u}` : ""}>
        <div class="sl-category-header">
          ${o ? M`<ha-checkbox
                  class="sl-category-checkbox"
                  .checked=${i}
                  .indeterminate=${a}
                  @click=${(e) => e.stopPropagation()}
                  @change=${() => this._toggleCategoryAll(r, i)}
                ></ha-checkbox>` : P}
          <button
            class="sl-category-name"
            type="button"
            ?disabled=${!s}
            aria-expanded=${s && c ? "false" : "true"}
            @click=${s ? () => this._toggleCategoryCollapse(e.key) : null}
          >
            [${e.displayName}]${t.category_show_count !== !1 && e.active.length > 0 ? M`<span class="sl-category-count" aria-label="active items"
                    >(${e.active.length})</span
                  >` : P}
          </button>
          ${s ? M`<button
                  type="button"
                  class="sl-category-collapse"
                  aria-label=${c ? "Expand category" : "Collapse category"}
                  @click=${() => this._toggleCategoryCollapse(e.key)}
                >
                  <ha-icon .icon=${c ? "mdi:chevron-down" : "mdi:chevron-up"}></ha-icon>
                </button>` : P}
        </div>
        ${c ? P : M`<ul class="sl-category-items">
                ${K(l, (e) => e.uid, (e) => this._renderItem(e, { hidePrefix: !0 }))}
              </ul>`}
      </section>
    `;
	}
	_renderCompletedToggle(e) {
		let t = this._completedExpanded, n = this._config?.completed_label || "Completed";
		return M`
      <li
        class="sl-completed-toggle ${t ? "sl-completed-toggle--expanded" : ""}"
        role="button"
        tabindex="0"
        aria-expanded=${t ? "true" : "false"}
        @click=${this._toggleCompletedExpanded}
        @keydown=${(e) => {
			(e.key === "Enter" || e.key === " ") && (e.preventDefault(), this._toggleCompletedExpanded());
		}}
      >
        <ha-icon
          class="sl-completed-toggle-icon"
          .icon=${t ? "mdi:chevron-up" : "mdi:chevron-down"}
        ></ha-icon>
        <span class="sl-completed-toggle-label">${n} (${e})</span>
      </li>
    `;
	}
	_renderHeader() {
		let e = this._config;
		return M`
      <div class="sl-header">
        ${e.icon ? M`<ha-icon class="sl-icon" .icon=${e.icon}></ha-icon>` : P}
        <span class="sl-title">${e.title}</span>
      </div>
    `;
	}
	_renderItem(e, t) {
		let n = this._config, r = e.status === "completed", i = this._editingUid === e.uid, a = n.enable_edit !== !1, o = n.enable_remove !== !1, s = n.enable_quantity ?? !1, c = n.quantity_max ?? 0, l = n.click_to_check !== !1, u = n.enable_categories ?? !1, d = n.enable_reorder !== !1 && (n.sort === "manual" || !n.sort) && !i, f = e.summary, p = null;
		if (u) {
			let t = Ue(e.summary);
			p = t.category, f = t.rest;
		}
		let m = s ? Je(f) : {
			name: f,
			quantity: 1
		}, h = s && m.quantity > 1, g = u && !t?.hidePrefix && !!p, ee = p ? this._categoryColor(p) : void 0, te = ee ? `--shopping-list-category-color: ${ee}` : "", _ = this._editQuantity > 1, v = c <= 0 || this._editQuantity < c, y = (e) => e.preventDefault();
		return M`
      <li
        class="sl-item ${r ? "sl-item--completed" : ""} ${i ? "sl-item--editing" : ""} ${l ? "" : "sl-item--no-row-click"} ${this._draggedUid === e.uid ? "sl-item--dragging" : ""}"
        style=${te}
        data-uid=${e.uid}
        @click=${(t) => {
			l && (i || t.target.tagName !== "HA-CHECKBOX" && this._toggleItem(e));
		}}
      >
        ${d ? M`<ha-icon
                class="sl-drag-handle"
                draggable="true"
                icon="mdi:drag"
                @mousedown=${(e) => e.stopPropagation()}
                @dragstart=${this._onDragStart}
                @dragend=${this._onDragEnd}
              ></ha-icon>` : P}

        <ha-checkbox
          class="sl-checkbox"
          .checked=${r}
          ?disabled=${i}
          @change=${() => this._toggleItem(e)}
        ></ha-checkbox>

        ${i ? M`<input
                class="sl-edit-input"
                type="text"
                .value=${this._editDraft}
                aria-label="Edit item"
                @click=${(e) => e.stopPropagation()}
                @input=${(e) => {
			this._editDraft = e.target.value;
		}}
                @keydown=${(t) => {
			t.key === "Enter" ? (t.preventDefault(), this._saveEdit(e)) : t.key === "Escape" && (t.preventDefault(), this._cancelEdit());
		}}
                @blur=${() => {
			this._editingUid === e.uid && this._saveEdit(e);
		}}
              />` : M`<span class="sl-summary">
                ${g ? M`<span class="sl-category-prefix">[${p}]</span> ` : P}<span class="sl-name">${m.name}</span>${h ? M`<span class="sl-quantity-badge">×${m.quantity}</span>` : P}
              </span>`}
        ${i && s ? M`
                <div class="sl-quantity-stepper" aria-label="Item quantity">
                  <button
                    type="button"
                    class="sl-quantity-step sl-quantity-step--minus"
                    ?disabled=${!_}
                    aria-label="Decrease quantity"
                    @mousedown=${y}
                    @click=${(e) => {
			e.stopPropagation(), this._adjustEditQuantity(-1);
		}}
                  >
                    <ha-icon icon="mdi:minus"></ha-icon>
                  </button>
                  <span class="sl-quantity-value" aria-live="polite">${this._editQuantity}</span>
                  <button
                    type="button"
                    class="sl-quantity-step sl-quantity-step--plus"
                    ?disabled=${!v}
                    aria-label="Increase quantity"
                    @mousedown=${y}
                    @click=${(e) => {
			e.stopPropagation(), this._adjustEditQuantity(1);
		}}
                  >
                    <ha-icon icon="mdi:plus"></ha-icon>
                  </button>
                </div>
              ` : P}

        <div class="sl-actions">
          ${i ? M`
                  <ha-icon-button
                    class="sl-action-button sl-action-button-save"
                    .label=${"Save"}
                    @mousedown=${y}
                    @click=${(t) => {
			t.stopPropagation(), this._saveEdit(e);
		}}
                  >
                    <ha-icon icon="mdi:check"></ha-icon>
                  </ha-icon-button>
                  <ha-icon-button
                    class="sl-action-button sl-action-button-cancel"
                    .label=${"Cancel"}
                    @mousedown=${y}
                    @click=${(e) => {
			e.stopPropagation(), this._cancelEdit();
		}}
                  >
                    <ha-icon icon="mdi:close"></ha-icon>
                  </ha-icon-button>
                ` : M`
                  ${a ? M`<ha-icon-button
                          class="sl-action-button sl-action-button-edit"
                          .label=${"Edit"}
                          @click=${(t) => {
			t.stopPropagation(), this._startEdit(e);
		}}
                        >
                          <ha-icon icon="mdi:pencil"></ha-icon>
                        </ha-icon-button>` : P}
                  ${o ? M`<ha-icon-button
                          class="sl-action-button sl-action-button-delete"
                          .label=${"Remove"}
                          @click=${(t) => {
			t.stopPropagation(), this._removeItem(e);
		}}
                        >
                          <ha-icon icon="mdi:close"></ha-icon>
                        </ha-icon-button>` : P}
                `}
        </div>
      </li>
    `;
	}
	_renderAddRow(e) {
		let t = this._config, n = this._draft.trim().length > 0, r = t.enable_quantity ?? !1, i = t.quantity_max ?? 0, a = this._addQuantity > 1, o = i <= 0 || this._addQuantity < i, s = (e) => e.preventDefault();
		return M`
      <div class="sl-add-row sl-add-row--${e}">
        <input
          class="sl-input"
          type="text"
          placeholder="Add an item…"
          .value=${this._draft}
          @input=${(e) => {
			this._draft = e.target.value;
		}}
          @keydown=${(e) => {
			e.key === "Enter" && (e.preventDefault(), this._addItem());
		}}
        />
        ${r ? M`
                <div
                  class="sl-quantity-stepper sl-quantity-stepper--add"
                  aria-label="Initial quantity for new item"
                >
                  <button
                    type="button"
                    class="sl-quantity-step sl-quantity-step--minus"
                    ?disabled=${!a}
                    aria-label="Decrease quantity"
                    @mousedown=${s}
                    @click=${() => this._adjustAddQuantity(-1)}
                  >
                    <ha-icon icon="mdi:minus"></ha-icon>
                  </button>
                  <span class="sl-quantity-value" aria-live="polite">${this._addQuantity}</span>
                  <button
                    type="button"
                    class="sl-quantity-step sl-quantity-step--plus"
                    ?disabled=${!o}
                    aria-label="Increase quantity"
                    @mousedown=${s}
                    @click=${() => this._adjustAddQuantity(1)}
                  >
                    <ha-icon icon="mdi:plus"></ha-icon>
                  </button>
                </div>
              ` : P}
        <button
          class="sl-add-button"
          type="button"
          ?disabled=${!n}
          @click=${() => this._addItem()}
        >
          ${t.add_button_label}
        </button>
      </div>
    `;
	}
	_extractCustomStyle() {
		let e = this._config;
		if (e) {
			if (typeof e.style == "string" && e.style.trim()) return e.style;
			if (e.card_mod) {
				if (typeof e.card_mod == "string") return e.card_mod;
				if (typeof e.card_mod == "object" && e.card_mod.style) return e.card_mod.style;
			}
		}
	}
}, Z.styles = Xe, Z);
Y([H({ attribute: !1 })], $.prototype, "hass", void 0), Y([U()], $.prototype, "_config", void 0), Y([U()], $.prototype, "_items", void 0), Y([U()], $.prototype, "_loading", void 0), Y([U()], $.prototype, "_error", void 0), Y([U()], $.prototype, "_draft", void 0), Y([U()], $.prototype, "_completedExpanded", void 0), Y([U()], $.prototype, "_editingUid", void 0), Y([U()], $.prototype, "_editDraft", void 0), Y([U()], $.prototype, "_editQuantity", void 0), Y([U()], $.prototype, "_addQuantity", void 0), Y([U()], $.prototype, "_collapsedCategories", void 0), Y([U()], $.prototype, "_connected", void 0), Y([U()], $.prototype, "_offlineQueue", void 0), Y([U()], $.prototype, "_draggedUid", void 0), $ = Y([Te(Be)], $);
//#endregion
export { $ as ShoppingListCard };
