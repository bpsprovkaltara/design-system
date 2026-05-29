import * as e from "react";
import t, { createContext as n, createElement as r, forwardRef as i, useCallback as a, useContext as o, useEffect as s, useLayoutEffect as c, useMemo as l, useRef as u, useState as d } from "react";
import * as f from "react-dom";
import p from "react-dom";
import { Fragment as m, jsx as h, jsxs as g } from "react/jsx-runtime";
//#region \0rolldown/runtime.js
var _ = Object.defineProperty, v = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), y = (e, t) => {
	let n = {};
	for (var r in e) _(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || _(n, Symbol.toStringTag, { value: "Module" }), n;
}, b = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (e, t) => (typeof require < "u" ? require : e)[t] }) : e)(function(e) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
});
//#endregion
//#region node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function x(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") if (Array.isArray(e)) {
		var i = e.length;
		for (t = 0; t < i; t++) e[t] && (n = x(e[t])) && (r && (r += " "), r += n);
	} else for (n in e) e[n] && (r && (r += " "), r += n);
	return r;
}
function S() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = x(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region node_modules/.pnpm/tailwind-merge@3.5.0/node_modules/tailwind-merge/dist/bundle-mjs.mjs
var C = (e, t) => {
	let n = Array(e.length + t.length);
	for (let t = 0; t < e.length; t++) n[t] = e[t];
	for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
	return n;
}, w = (e, t) => ({
	classGroupId: e,
	validator: t
}), T = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
	nextPart: e,
	validators: t,
	classGroupId: n
}), E = "-", D = [], O = "arbitrary..", k = (e) => {
	let t = M(e), { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
	return {
		getClassGroupId: (e) => {
			if (e.startsWith("[") && e.endsWith("]")) return j(e);
			let n = e.split(E);
			return A(n, +(n[0] === "" && n.length > 1), t);
		},
		getConflictingClassGroupIds: (e, t) => {
			if (t) {
				let t = r[e], i = n[e];
				return t ? i ? C(i, t) : t : i || D;
			}
			return n[e] || D;
		}
	};
}, A = (e, t, n) => {
	if (e.length - t === 0) return n.classGroupId;
	let r = e[t], i = n.nextPart.get(r);
	if (i) {
		let n = A(e, t + 1, i);
		if (n) return n;
	}
	let a = n.validators;
	if (a === null) return;
	let o = t === 0 ? e.join(E) : e.slice(t).join(E), s = a.length;
	for (let e = 0; e < s; e++) {
		let t = a[e];
		if (t.validator(o)) return t.classGroupId;
	}
}, j = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	let t = e.slice(1, -1), n = t.indexOf(":"), r = t.slice(0, n);
	return r ? O + r : void 0;
})(), M = (e) => {
	let { theme: t, classGroups: n } = e;
	return N(n, t);
}, N = (e, t) => {
	let n = T();
	for (let r in e) {
		let i = e[r];
		P(i, n, r, t);
	}
	return n;
}, P = (e, t, n, r) => {
	let i = e.length;
	for (let a = 0; a < i; a++) {
		let i = e[a];
		F(i, t, n, r);
	}
}, F = (e, t, n, r) => {
	if (typeof e == "string") {
		I(e, t, n);
		return;
	}
	if (typeof e == "function") {
		ee(e, t, n, r);
		return;
	}
	te(e, t, n, r);
}, I = (e, t, n) => {
	let r = e === "" ? t : ne(t, e);
	r.classGroupId = n;
}, ee = (e, t, n, r) => {
	if (re(e)) {
		P(e(r), t, n, r);
		return;
	}
	t.validators === null && (t.validators = []), t.validators.push(w(n, e));
}, te = (e, t, n, r) => {
	let i = Object.entries(e), a = i.length;
	for (let e = 0; e < a; e++) {
		let [a, o] = i[e];
		P(o, ne(t, a), n, r);
	}
}, ne = (e, t) => {
	let n = e, r = t.split(E), i = r.length;
	for (let e = 0; e < i; e++) {
		let t = r[e], i = n.nextPart.get(t);
		i || (i = T(), n.nextPart.set(t, i)), n = i;
	}
	return n;
}, re = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, L = (e) => {
	if (e < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let t = 0, n = Object.create(null), r = Object.create(null), i = (i, a) => {
		n[i] = a, t++, t > e && (t = 0, r = n, n = Object.create(null));
	};
	return {
		get(e) {
			let t = n[e];
			if (t !== void 0) return t;
			if ((t = r[e]) !== void 0) return i(e, t), t;
		},
		set(e, t) {
			e in n ? n[e] = t : i(e, t);
		}
	};
}, R = "!", ie = ":", ae = [], z = (e, t, n, r, i) => ({
	modifiers: e,
	hasImportantModifier: t,
	baseClassName: n,
	maybePostfixModifierPosition: r,
	isExternal: i
}), oe = (e) => {
	let { prefix: t, experimentalParseClassName: n } = e, r = (e) => {
		let t = [], n = 0, r = 0, i = 0, a, o = e.length;
		for (let s = 0; s < o; s++) {
			let o = e[s];
			if (n === 0 && r === 0) {
				if (o === ie) {
					t.push(e.slice(i, s)), i = s + 1;
					continue;
				}
				if (o === "/") {
					a = s;
					continue;
				}
			}
			o === "[" ? n++ : o === "]" ? n-- : o === "(" ? r++ : o === ")" && r--;
		}
		let s = t.length === 0 ? e : e.slice(i), c = s, l = !1;
		s.endsWith(R) ? (c = s.slice(0, -1), l = !0) : s.startsWith(R) && (c = s.slice(1), l = !0);
		let u = a && a > i ? a - i : void 0;
		return z(t, l, c, u);
	};
	if (t) {
		let e = t + ie, n = r;
		r = (t) => t.startsWith(e) ? n(t.slice(e.length)) : z(ae, !1, t, void 0, !0);
	}
	if (n) {
		let e = r;
		r = (t) => n({
			className: t,
			parseClassName: e
		});
	}
	return r;
}, se = (e) => {
	let t = /* @__PURE__ */ new Map();
	return e.orderSensitiveModifiers.forEach((e, n) => {
		t.set(e, 1e6 + n);
	}), (e) => {
		let n = [], r = [];
		for (let i = 0; i < e.length; i++) {
			let a = e[i], o = a[0] === "[", s = t.has(a);
			o || s ? (r.length > 0 && (r.sort(), n.push(...r), r = []), n.push(a)) : r.push(a);
		}
		return r.length > 0 && (r.sort(), n.push(...r)), n;
	};
}, ce = (e) => ({
	cache: L(e.cacheSize),
	parseClassName: oe(e),
	sortModifiers: se(e),
	...k(e)
}), B = /\s+/, le = (e, t) => {
	let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i, sortModifiers: a } = t, o = [], s = e.trim().split(B), c = "";
	for (let e = s.length - 1; e >= 0; --e) {
		let t = s[e], { isExternal: l, modifiers: u, hasImportantModifier: d, baseClassName: f, maybePostfixModifierPosition: p } = n(t);
		if (l) {
			c = t + (c.length > 0 ? " " + c : c);
			continue;
		}
		let m = !!p, h = r(m ? f.substring(0, p) : f);
		if (!h) {
			if (!m) {
				c = t + (c.length > 0 ? " " + c : c);
				continue;
			}
			if (h = r(f), !h) {
				c = t + (c.length > 0 ? " " + c : c);
				continue;
			}
			m = !1;
		}
		let g = u.length === 0 ? "" : u.length === 1 ? u[0] : a(u).join(":"), _ = d ? g + R : g, v = _ + h;
		if (o.indexOf(v) > -1) continue;
		o.push(v);
		let y = i(h, m);
		for (let e = 0; e < y.length; ++e) {
			let t = y[e];
			o.push(_ + t);
		}
		c = t + (c.length > 0 ? " " + c : c);
	}
	return c;
}, ue = (...e) => {
	let t = 0, n, r, i = "";
	for (; t < e.length;) (n = e[t++]) && (r = de(n)) && (i && (i += " "), i += r);
	return i;
}, de = (e) => {
	if (typeof e == "string") return e;
	let t, n = "";
	for (let r = 0; r < e.length; r++) e[r] && (t = de(e[r])) && (n && (n += " "), n += t);
	return n;
}, fe = (e, ...t) => {
	let n, r, i, a, o = (o) => (n = ce(t.reduce((e, t) => t(e), e())), r = n.cache.get, i = n.cache.set, a = s, s(o)), s = (e) => {
		let t = r(e);
		if (t) return t;
		let a = le(e, n);
		return i(e, a), a;
	};
	return a = o, (...e) => a(ue(...e));
}, pe = [], V = (e) => {
	let t = (t) => t[e] || pe;
	return t.isThemeGetter = !0, t;
}, me = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, he = /^\((?:(\w[\w-]*):)?(.+)\)$/i, ge = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, _e = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, ve = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, ye = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, be = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, xe = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Se = (e) => ge.test(e), H = (e) => !!e && !Number.isNaN(Number(e)), Ce = (e) => !!e && Number.isInteger(Number(e)), we = (e) => e.endsWith("%") && H(e.slice(0, -1)), Te = (e) => _e.test(e), Ee = () => !0, De = (e) => ve.test(e) && !ye.test(e), Oe = () => !1, ke = (e) => be.test(e), Ae = (e) => xe.test(e), je = (e) => !U(e) && !W(e), Me = (e) => qe(e, Ze, Oe), U = (e) => me.test(e), Ne = (e) => qe(e, Qe, De), Pe = (e) => qe(e, $e, H), Fe = (e) => qe(e, tt, Ee), Ie = (e) => qe(e, et, Oe), Le = (e) => qe(e, Ye, Oe), Re = (e) => qe(e, Xe, Ae), ze = (e) => qe(e, nt, ke), W = (e) => he.test(e), Be = (e) => Je(e, Qe), Ve = (e) => Je(e, et), He = (e) => Je(e, Ye), Ue = (e) => Je(e, Ze), We = (e) => Je(e, Xe), Ge = (e) => Je(e, nt, !0), Ke = (e) => Je(e, tt, !0), qe = (e, t, n) => {
	let r = me.exec(e);
	return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, Je = (e, t, n = !1) => {
	let r = he.exec(e);
	return r ? r[1] ? t(r[1]) : n : !1;
}, Ye = (e) => e === "position" || e === "percentage", Xe = (e) => e === "image" || e === "url", Ze = (e) => e === "length" || e === "size" || e === "bg-size", Qe = (e) => e === "length", $e = (e) => e === "number", et = (e) => e === "family-name", tt = (e) => e === "number" || e === "weight", nt = (e) => e === "shadow", rt = /* @__PURE__ */ fe(() => {
	let e = V("color"), t = V("font"), n = V("text"), r = V("font-weight"), i = V("tracking"), a = V("leading"), o = V("breakpoint"), s = V("container"), c = V("spacing"), l = V("radius"), u = V("shadow"), d = V("inset-shadow"), f = V("text-shadow"), p = V("drop-shadow"), m = V("blur"), h = V("perspective"), g = V("aspect"), _ = V("ease"), v = V("animate"), y = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	], b = () => [
		"center",
		"top",
		"bottom",
		"left",
		"right",
		"top-left",
		"left-top",
		"top-right",
		"right-top",
		"bottom-right",
		"right-bottom",
		"bottom-left",
		"left-bottom"
	], x = () => [
		...b(),
		W,
		U
	], S = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	], C = () => [
		"auto",
		"contain",
		"none"
	], w = () => [
		W,
		U,
		c
	], T = () => [
		Se,
		"full",
		"auto",
		...w()
	], E = () => [
		Ce,
		"none",
		"subgrid",
		W,
		U
	], D = () => [
		"auto",
		{ span: [
			"full",
			Ce,
			W,
			U
		] },
		Ce,
		W,
		U
	], O = () => [
		Ce,
		"auto",
		W,
		U
	], k = () => [
		"auto",
		"min",
		"max",
		"fr",
		W,
		U
	], A = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch",
		"baseline",
		"center-safe",
		"end-safe"
	], j = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	], M = () => ["auto", ...w()], N = () => [
		Se,
		"auto",
		"full",
		"dvw",
		"dvh",
		"lvw",
		"lvh",
		"svw",
		"svh",
		"min",
		"max",
		"fit",
		...w()
	], P = () => [
		Se,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...w()
	], F = () => [
		Se,
		"screen",
		"full",
		"lh",
		"dvh",
		"lvh",
		"svh",
		"min",
		"max",
		"fit",
		...w()
	], I = () => [
		e,
		W,
		U
	], ee = () => [
		...b(),
		He,
		Le,
		{ position: [W, U] }
	], te = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }], ne = () => [
		"auto",
		"cover",
		"contain",
		Ue,
		Me,
		{ size: [W, U] }
	], re = () => [
		we,
		Be,
		Ne
	], L = () => [
		"",
		"none",
		"full",
		l,
		W,
		U
	], R = () => [
		"",
		H,
		Be,
		Ne
	], ie = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	], ae = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	], z = () => [
		H,
		we,
		He,
		Le
	], oe = () => [
		"",
		"none",
		m,
		W,
		U
	], se = () => [
		"none",
		H,
		W,
		U
	], ce = () => [
		"none",
		H,
		W,
		U
	], B = () => [
		H,
		W,
		U
	], le = () => [
		Se,
		"full",
		...w()
	];
	return {
		cacheSize: 500,
		theme: {
			animate: [
				"spin",
				"ping",
				"pulse",
				"bounce"
			],
			aspect: ["video"],
			blur: [Te],
			breakpoint: [Te],
			color: [Ee],
			container: [Te],
			"drop-shadow": [Te],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [je],
			"font-weight": [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black"
			],
			"inset-shadow": [Te],
			leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose"
			],
			perspective: [
				"dramatic",
				"near",
				"normal",
				"midrange",
				"distant",
				"none"
			],
			radius: [Te],
			shadow: [Te],
			spacing: ["px", H],
			text: [Te],
			"text-shadow": [Te],
			tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest"
			]
		},
		classGroups: {
			aspect: [{ aspect: [
				"auto",
				"square",
				Se,
				U,
				W,
				g
			] }],
			container: ["container"],
			columns: [{ columns: [
				H,
				U,
				W,
				s
			] }],
			"break-after": [{ "break-after": y() }],
			"break-before": [{ "break-before": y() }],
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			box: [{ box: ["border", "content"] }],
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			sr: ["sr-only", "not-sr-only"],
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			isolation: ["isolate", "isolation-auto"],
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			"object-position": [{ object: x() }],
			overflow: [{ overflow: S() }],
			"overflow-x": [{ "overflow-x": S() }],
			"overflow-y": [{ "overflow-y": S() }],
			overscroll: [{ overscroll: C() }],
			"overscroll-x": [{ "overscroll-x": C() }],
			"overscroll-y": [{ "overscroll-y": C() }],
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			inset: [{ inset: T() }],
			"inset-x": [{ "inset-x": T() }],
			"inset-y": [{ "inset-y": T() }],
			start: [{
				"inset-s": T(),
				start: T()
			}],
			end: [{
				"inset-e": T(),
				end: T()
			}],
			"inset-bs": [{ "inset-bs": T() }],
			"inset-be": [{ "inset-be": T() }],
			top: [{ top: T() }],
			right: [{ right: T() }],
			bottom: [{ bottom: T() }],
			left: [{ left: T() }],
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			z: [{ z: [
				Ce,
				"auto",
				W,
				U
			] }],
			basis: [{ basis: [
				Se,
				"full",
				"auto",
				s,
				...w()
			] }],
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			"flex-wrap": [{ flex: [
				"nowrap",
				"wrap",
				"wrap-reverse"
			] }],
			flex: [{ flex: [
				H,
				Se,
				"auto",
				"initial",
				"none",
				U
			] }],
			grow: [{ grow: [
				"",
				H,
				W,
				U
			] }],
			shrink: [{ shrink: [
				"",
				H,
				W,
				U
			] }],
			order: [{ order: [
				Ce,
				"first",
				"last",
				"none",
				W,
				U
			] }],
			"grid-cols": [{ "grid-cols": E() }],
			"col-start-end": [{ col: D() }],
			"col-start": [{ "col-start": O() }],
			"col-end": [{ "col-end": O() }],
			"grid-rows": [{ "grid-rows": E() }],
			"row-start-end": [{ row: D() }],
			"row-start": [{ "row-start": O() }],
			"row-end": [{ "row-end": O() }],
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			"auto-cols": [{ "auto-cols": k() }],
			"auto-rows": [{ "auto-rows": k() }],
			gap: [{ gap: w() }],
			"gap-x": [{ "gap-x": w() }],
			"gap-y": [{ "gap-y": w() }],
			"justify-content": [{ justify: [...A(), "normal"] }],
			"justify-items": [{ "justify-items": [...j(), "normal"] }],
			"justify-self": [{ "justify-self": ["auto", ...j()] }],
			"align-content": [{ content: ["normal", ...A()] }],
			"align-items": [{ items: [...j(), { baseline: ["", "last"] }] }],
			"align-self": [{ self: [
				"auto",
				...j(),
				{ baseline: ["", "last"] }
			] }],
			"place-content": [{ "place-content": A() }],
			"place-items": [{ "place-items": [...j(), "baseline"] }],
			"place-self": [{ "place-self": ["auto", ...j()] }],
			p: [{ p: w() }],
			px: [{ px: w() }],
			py: [{ py: w() }],
			ps: [{ ps: w() }],
			pe: [{ pe: w() }],
			pbs: [{ pbs: w() }],
			pbe: [{ pbe: w() }],
			pt: [{ pt: w() }],
			pr: [{ pr: w() }],
			pb: [{ pb: w() }],
			pl: [{ pl: w() }],
			m: [{ m: M() }],
			mx: [{ mx: M() }],
			my: [{ my: M() }],
			ms: [{ ms: M() }],
			me: [{ me: M() }],
			mbs: [{ mbs: M() }],
			mbe: [{ mbe: M() }],
			mt: [{ mt: M() }],
			mr: [{ mr: M() }],
			mb: [{ mb: M() }],
			ml: [{ ml: M() }],
			"space-x": [{ "space-x": w() }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": w() }],
			"space-y-reverse": ["space-y-reverse"],
			size: [{ size: N() }],
			"inline-size": [{ inline: ["auto", ...P()] }],
			"min-inline-size": [{ "min-inline": ["auto", ...P()] }],
			"max-inline-size": [{ "max-inline": ["none", ...P()] }],
			"block-size": [{ block: ["auto", ...F()] }],
			"min-block-size": [{ "min-block": ["auto", ...F()] }],
			"max-block-size": [{ "max-block": ["none", ...F()] }],
			w: [{ w: [
				s,
				"screen",
				...N()
			] }],
			"min-w": [{ "min-w": [
				s,
				"screen",
				"none",
				...N()
			] }],
			"max-w": [{ "max-w": [
				s,
				"screen",
				"none",
				"prose",
				{ screen: [o] },
				...N()
			] }],
			h: [{ h: [
				"screen",
				"lh",
				...N()
			] }],
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...N()
			] }],
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				...N()
			] }],
			"font-size": [{ text: [
				"base",
				n,
				Be,
				Ne
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				r,
				Ke,
				Fe
			] }],
			"font-stretch": [{ "font-stretch": [
				"ultra-condensed",
				"extra-condensed",
				"condensed",
				"semi-condensed",
				"normal",
				"semi-expanded",
				"expanded",
				"extra-expanded",
				"ultra-expanded",
				we,
				U
			] }],
			"font-family": [{ font: [
				Ve,
				Ie,
				t
			] }],
			"font-features": [{ "font-features": [U] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				i,
				W,
				U
			] }],
			"line-clamp": [{ "line-clamp": [
				H,
				"none",
				W,
				Pe
			] }],
			leading: [{ leading: [a, ...w()] }],
			"list-image": [{ "list-image": [
				"none",
				W,
				U
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				W,
				U
			] }],
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			"placeholder-color": [{ placeholder: I() }],
			"text-color": [{ text: I() }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...ie(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				H,
				"from-font",
				"auto",
				W,
				Ne
			] }],
			"text-decoration-color": [{ decoration: I() }],
			"underline-offset": [{ "underline-offset": [
				H,
				"auto",
				W,
				U
			] }],
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			indent: [{ indent: w() }],
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				W,
				U
			] }],
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			wrap: [{ wrap: [
				"break-word",
				"anywhere",
				"normal"
			] }],
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			content: [{ content: [
				"none",
				W,
				U
			] }],
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			"bg-position": [{ bg: ee() }],
			"bg-repeat": [{ bg: te() }],
			"bg-size": [{ bg: ne() }],
			"bg-image": [{ bg: [
				"none",
				{
					linear: [
						{ to: [
							"t",
							"tr",
							"r",
							"br",
							"b",
							"bl",
							"l",
							"tl"
						] },
						Ce,
						W,
						U
					],
					radial: [
						"",
						W,
						U
					],
					conic: [
						Ce,
						W,
						U
					]
				},
				We,
				Re
			] }],
			"bg-color": [{ bg: I() }],
			"gradient-from-pos": [{ from: re() }],
			"gradient-via-pos": [{ via: re() }],
			"gradient-to-pos": [{ to: re() }],
			"gradient-from": [{ from: I() }],
			"gradient-via": [{ via: I() }],
			"gradient-to": [{ to: I() }],
			rounded: [{ rounded: L() }],
			"rounded-s": [{ "rounded-s": L() }],
			"rounded-e": [{ "rounded-e": L() }],
			"rounded-t": [{ "rounded-t": L() }],
			"rounded-r": [{ "rounded-r": L() }],
			"rounded-b": [{ "rounded-b": L() }],
			"rounded-l": [{ "rounded-l": L() }],
			"rounded-ss": [{ "rounded-ss": L() }],
			"rounded-se": [{ "rounded-se": L() }],
			"rounded-ee": [{ "rounded-ee": L() }],
			"rounded-es": [{ "rounded-es": L() }],
			"rounded-tl": [{ "rounded-tl": L() }],
			"rounded-tr": [{ "rounded-tr": L() }],
			"rounded-br": [{ "rounded-br": L() }],
			"rounded-bl": [{ "rounded-bl": L() }],
			"border-w": [{ border: R() }],
			"border-w-x": [{ "border-x": R() }],
			"border-w-y": [{ "border-y": R() }],
			"border-w-s": [{ "border-s": R() }],
			"border-w-e": [{ "border-e": R() }],
			"border-w-bs": [{ "border-bs": R() }],
			"border-w-be": [{ "border-be": R() }],
			"border-w-t": [{ "border-t": R() }],
			"border-w-r": [{ "border-r": R() }],
			"border-w-b": [{ "border-b": R() }],
			"border-w-l": [{ "border-l": R() }],
			"divide-x": [{ "divide-x": R() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": R() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...ie(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...ie(),
				"hidden",
				"none"
			] }],
			"border-color": [{ border: I() }],
			"border-color-x": [{ "border-x": I() }],
			"border-color-y": [{ "border-y": I() }],
			"border-color-s": [{ "border-s": I() }],
			"border-color-e": [{ "border-e": I() }],
			"border-color-bs": [{ "border-bs": I() }],
			"border-color-be": [{ "border-be": I() }],
			"border-color-t": [{ "border-t": I() }],
			"border-color-r": [{ "border-r": I() }],
			"border-color-b": [{ "border-b": I() }],
			"border-color-l": [{ "border-l": I() }],
			"divide-color": [{ divide: I() }],
			"outline-style": [{ outline: [
				...ie(),
				"none",
				"hidden"
			] }],
			"outline-offset": [{ "outline-offset": [
				H,
				W,
				U
			] }],
			"outline-w": [{ outline: [
				"",
				H,
				Be,
				Ne
			] }],
			"outline-color": [{ outline: I() }],
			shadow: [{ shadow: [
				"",
				"none",
				u,
				Ge,
				ze
			] }],
			"shadow-color": [{ shadow: I() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				d,
				Ge,
				ze
			] }],
			"inset-shadow-color": [{ "inset-shadow": I() }],
			"ring-w": [{ ring: R() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: I() }],
			"ring-offset-w": [{ "ring-offset": [H, Ne] }],
			"ring-offset-color": [{ "ring-offset": I() }],
			"inset-ring-w": [{ "inset-ring": R() }],
			"inset-ring-color": [{ "inset-ring": I() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				f,
				Ge,
				ze
			] }],
			"text-shadow-color": [{ "text-shadow": I() }],
			opacity: [{ opacity: [
				H,
				W,
				U
			] }],
			"mix-blend": [{ "mix-blend": [
				...ae(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": ae() }],
			"mask-clip": [{ "mask-clip": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }, "mask-no-clip"],
			"mask-composite": [{ mask: [
				"add",
				"subtract",
				"intersect",
				"exclude"
			] }],
			"mask-image-linear-pos": [{ "mask-linear": [H] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": z() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": z() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": I() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": I() }],
			"mask-image-t-from-pos": [{ "mask-t-from": z() }],
			"mask-image-t-to-pos": [{ "mask-t-to": z() }],
			"mask-image-t-from-color": [{ "mask-t-from": I() }],
			"mask-image-t-to-color": [{ "mask-t-to": I() }],
			"mask-image-r-from-pos": [{ "mask-r-from": z() }],
			"mask-image-r-to-pos": [{ "mask-r-to": z() }],
			"mask-image-r-from-color": [{ "mask-r-from": I() }],
			"mask-image-r-to-color": [{ "mask-r-to": I() }],
			"mask-image-b-from-pos": [{ "mask-b-from": z() }],
			"mask-image-b-to-pos": [{ "mask-b-to": z() }],
			"mask-image-b-from-color": [{ "mask-b-from": I() }],
			"mask-image-b-to-color": [{ "mask-b-to": I() }],
			"mask-image-l-from-pos": [{ "mask-l-from": z() }],
			"mask-image-l-to-pos": [{ "mask-l-to": z() }],
			"mask-image-l-from-color": [{ "mask-l-from": I() }],
			"mask-image-l-to-color": [{ "mask-l-to": I() }],
			"mask-image-x-from-pos": [{ "mask-x-from": z() }],
			"mask-image-x-to-pos": [{ "mask-x-to": z() }],
			"mask-image-x-from-color": [{ "mask-x-from": I() }],
			"mask-image-x-to-color": [{ "mask-x-to": I() }],
			"mask-image-y-from-pos": [{ "mask-y-from": z() }],
			"mask-image-y-to-pos": [{ "mask-y-to": z() }],
			"mask-image-y-from-color": [{ "mask-y-from": I() }],
			"mask-image-y-to-color": [{ "mask-y-to": I() }],
			"mask-image-radial": [{ "mask-radial": [W, U] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": z() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": z() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": I() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": I() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": b() }],
			"mask-image-conic-pos": [{ "mask-conic": [H] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": z() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": z() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": I() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": I() }],
			"mask-mode": [{ mask: [
				"alpha",
				"luminance",
				"match"
			] }],
			"mask-origin": [{ "mask-origin": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }],
			"mask-position": [{ mask: ee() }],
			"mask-repeat": [{ mask: te() }],
			"mask-size": [{ mask: ne() }],
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			"mask-image": [{ mask: [
				"none",
				W,
				U
			] }],
			filter: [{ filter: [
				"",
				"none",
				W,
				U
			] }],
			blur: [{ blur: oe() }],
			brightness: [{ brightness: [
				H,
				W,
				U
			] }],
			contrast: [{ contrast: [
				H,
				W,
				U
			] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				p,
				Ge,
				ze
			] }],
			"drop-shadow-color": [{ "drop-shadow": I() }],
			grayscale: [{ grayscale: [
				"",
				H,
				W,
				U
			] }],
			"hue-rotate": [{ "hue-rotate": [
				H,
				W,
				U
			] }],
			invert: [{ invert: [
				"",
				H,
				W,
				U
			] }],
			saturate: [{ saturate: [
				H,
				W,
				U
			] }],
			sepia: [{ sepia: [
				"",
				H,
				W,
				U
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				W,
				U
			] }],
			"backdrop-blur": [{ "backdrop-blur": oe() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				H,
				W,
				U
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				H,
				W,
				U
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				H,
				W,
				U
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				H,
				W,
				U
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				H,
				W,
				U
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				H,
				W,
				U
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				H,
				W,
				U
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				H,
				W,
				U
			] }],
			"border-collapse": [{ border: ["collapse", "separate"] }],
			"border-spacing": [{ "border-spacing": w() }],
			"border-spacing-x": [{ "border-spacing-x": w() }],
			"border-spacing-y": [{ "border-spacing-y": w() }],
			"table-layout": [{ table: ["auto", "fixed"] }],
			caption: [{ caption: ["top", "bottom"] }],
			transition: [{ transition: [
				"",
				"all",
				"colors",
				"opacity",
				"shadow",
				"transform",
				"none",
				W,
				U
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				H,
				"initial",
				W,
				U
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				_,
				W,
				U
			] }],
			delay: [{ delay: [
				H,
				W,
				U
			] }],
			animate: [{ animate: [
				"none",
				v,
				W,
				U
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				h,
				W,
				U
			] }],
			"perspective-origin": [{ "perspective-origin": x() }],
			rotate: [{ rotate: se() }],
			"rotate-x": [{ "rotate-x": se() }],
			"rotate-y": [{ "rotate-y": se() }],
			"rotate-z": [{ "rotate-z": se() }],
			scale: [{ scale: ce() }],
			"scale-x": [{ "scale-x": ce() }],
			"scale-y": [{ "scale-y": ce() }],
			"scale-z": [{ "scale-z": ce() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: B() }],
			"skew-x": [{ "skew-x": B() }],
			"skew-y": [{ "skew-y": B() }],
			transform: [{ transform: [
				W,
				U,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: x() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: le() }],
			"translate-x": [{ "translate-x": le() }],
			"translate-y": [{ "translate-y": le() }],
			"translate-z": [{ "translate-z": le() }],
			"translate-none": ["translate-none"],
			accent: [{ accent: I() }],
			appearance: [{ appearance: ["none", "auto"] }],
			"caret-color": [{ caret: I() }],
			"color-scheme": [{ scheme: [
				"normal",
				"dark",
				"light",
				"light-dark",
				"only-dark",
				"only-light"
			] }],
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				W,
				U
			] }],
			"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
			"pointer-events": [{ "pointer-events": ["auto", "none"] }],
			resize: [{ resize: [
				"none",
				"",
				"y",
				"x"
			] }],
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			"scroll-m": [{ "scroll-m": w() }],
			"scroll-mx": [{ "scroll-mx": w() }],
			"scroll-my": [{ "scroll-my": w() }],
			"scroll-ms": [{ "scroll-ms": w() }],
			"scroll-me": [{ "scroll-me": w() }],
			"scroll-mbs": [{ "scroll-mbs": w() }],
			"scroll-mbe": [{ "scroll-mbe": w() }],
			"scroll-mt": [{ "scroll-mt": w() }],
			"scroll-mr": [{ "scroll-mr": w() }],
			"scroll-mb": [{ "scroll-mb": w() }],
			"scroll-ml": [{ "scroll-ml": w() }],
			"scroll-p": [{ "scroll-p": w() }],
			"scroll-px": [{ "scroll-px": w() }],
			"scroll-py": [{ "scroll-py": w() }],
			"scroll-ps": [{ "scroll-ps": w() }],
			"scroll-pe": [{ "scroll-pe": w() }],
			"scroll-pbs": [{ "scroll-pbs": w() }],
			"scroll-pbe": [{ "scroll-pbe": w() }],
			"scroll-pt": [{ "scroll-pt": w() }],
			"scroll-pr": [{ "scroll-pr": w() }],
			"scroll-pb": [{ "scroll-pb": w() }],
			"scroll-pl": [{ "scroll-pl": w() }],
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			"snap-stop": [{ snap: ["normal", "always"] }],
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			"touch-pz": ["touch-pinch-zoom"],
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				W,
				U
			] }],
			fill: [{ fill: ["none", ...I()] }],
			"stroke-w": [{ stroke: [
				H,
				Be,
				Ne,
				Pe
			] }],
			stroke: [{ stroke: ["none", ...I()] }],
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"inset-bs",
				"inset-be",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": ["right", "left"],
			"inset-y": ["top", "bottom"],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pbs",
				"pbe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: ["pr", "pl"],
			py: ["pt", "pb"],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mbs",
				"mbe",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: ["mr", "ml"],
			my: ["mt", "mb"],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-x",
				"border-w-y",
				"border-w-s",
				"border-w-e",
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": ["border-w-r", "border-w-l"],
			"border-w-y": ["border-w-t", "border-w-b"],
			"border-color": [
				"border-color-x",
				"border-color-y",
				"border-color-s",
				"border-color-e",
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": ["border-color-r", "border-color-l"],
			"border-color-y": ["border-color-t", "border-color-b"],
			translate: [
				"translate-x",
				"translate-y",
				"translate-none"
			],
			"translate-none": [
				"translate",
				"translate-x",
				"translate-y",
				"translate-z"
			],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": ["scroll-mr", "scroll-ml"],
			"scroll-my": ["scroll-mt", "scroll-mb"],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": ["scroll-pr", "scroll-pl"],
			"scroll-py": ["scroll-pt", "scroll-pb"],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] },
		orderSensitiveModifiers: [
			"*",
			"**",
			"after",
			"backdrop",
			"before",
			"details-content",
			"file",
			"first-letter",
			"first-line",
			"marker",
			"placeholder",
			"selection"
		]
	};
});
//#endregion
//#region src/lib/utils.ts
function G(...e) {
	return rt(S(e));
}
//#endregion
//#region node_modules/.pnpm/lucide-react@1.14.0_react@19.2.6/node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs
var it = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), at = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), ot = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()), st = (e) => {
	let t = ot(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, ct = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
}, lt = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, ut = n({}), dt = () => o(ut), ft = i(({ color: e, size: t, strokeWidth: n, absoluteStrokeWidth: i, className: a = "", children: o, iconNode: s, ...c }, l) => {
	let { size: u = 24, strokeWidth: d = 2, absoluteStrokeWidth: f = !1, color: p = "currentColor", className: m = "" } = dt() ?? {}, h = i ?? f ? Number(n ?? d) * 24 / Number(t ?? u) : n ?? d;
	return r("svg", {
		ref: l,
		...ct,
		width: t ?? u ?? ct.width,
		height: t ?? u ?? ct.height,
		stroke: e ?? p,
		strokeWidth: h,
		className: it("lucide", m, a),
		...!o && !lt(c) && { "aria-hidden": "true" },
		...c
	}, [...s.map(([e, t]) => r(e, t)), ...Array.isArray(o) ? o : [o]]);
}), K = (e, t) => {
	let n = i(({ className: n, ...i }, a) => r(ft, {
		ref: a,
		iconNode: t,
		className: it(`lucide-${at(st(e))}`, `lucide-${e}`, n),
		...i
	}));
	return n.displayName = st(e), n;
}, pt = K("arrow-down-right", [["path", {
	d: "m7 7 10 10",
	key: "1fmybs"
}], ["path", {
	d: "M17 7v10H7",
	key: "6fjiku"
}]]), mt = K("arrow-left", [["path", {
	d: "m12 19-7-7 7-7",
	key: "1l729n"
}], ["path", {
	d: "M19 12H5",
	key: "x3x0zl"
}]]), ht = K("arrow-right", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "m12 5 7 7-7 7",
	key: "xquz4c"
}]]), gt = K("arrow-up-right", [["path", {
	d: "M7 7h10v10",
	key: "1tivn9"
}], ["path", {
	d: "M7 17 17 7",
	key: "1vkiza"
}]]), _t = K("bell", [["path", {
	d: "M10.268 21a2 2 0 0 0 3.464 0",
	key: "vwvbt9"
}], ["path", {
	d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
	key: "11g9vi"
}]]), vt = K("calendar", [
	["path", {
		d: "M8 2v4",
		key: "1cmpym"
	}],
	["path", {
		d: "M16 2v4",
		key: "4m81vk"
	}],
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "4",
		rx: "2",
		key: "1hopcy"
	}],
	["path", {
		d: "M3 10h18",
		key: "8toen8"
	}]
]), yt = K("check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]), bt = K("chevron-down", [["path", {
	d: "m6 9 6 6 6-6",
	key: "qrunsl"
}]]), xt = K("chevron-left", [["path", {
	d: "m15 18-6-6 6-6",
	key: "1wnfg3"
}]]), St = K("chevron-right", [["path", {
	d: "m9 18 6-6-6-6",
	key: "mthhwq"
}]]), Ct = K("chevron-up", [["path", {
	d: "m18 15-6-6-6 6",
	key: "153udz"
}]]), wt = K("chevrons-up-down", [["path", {
	d: "m7 15 5 5 5-5",
	key: "1hf1tw"
}], ["path", {
	d: "m7 9 5-5 5 5",
	key: "sgt6xg"
}]]), Tt = K("circle-alert", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "8",
		y2: "12",
		key: "1pkeuh"
	}],
	["line", {
		x1: "12",
		x2: "12.01",
		y1: "16",
		y2: "16",
		key: "4dfq90"
	}]
]), Et = K("circle-check", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]), Dt = K("circle", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}]]), Ot = K("cloud-upload", [
	["path", {
		d: "M12 13v8",
		key: "1l5pq0"
	}],
	["path", {
		d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",
		key: "1pljnt"
	}],
	["path", {
		d: "m8 17 4-4 4 4",
		key: "1quai1"
	}]
]), kt = K("ellipsis", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "1",
		key: "41hilf"
	}],
	["circle", {
		cx: "19",
		cy: "12",
		r: "1",
		key: "1wjl8i"
	}],
	["circle", {
		cx: "5",
		cy: "12",
		r: "1",
		key: "1pcz8c"
	}]
]), At = K("file-text", [
	["path", {
		d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
		key: "1oefj6"
	}],
	["path", {
		d: "M14 2v5a1 1 0 0 0 1 1h5",
		key: "wfsgrz"
	}],
	["path", {
		d: "M10 9H8",
		key: "b1mrlr"
	}],
	["path", {
		d: "M16 13H8",
		key: "t4e002"
	}],
	["path", {
		d: "M16 17H8",
		key: "z1uh3a"
	}]
]), jt = K("info", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M12 16v-4",
		key: "1dtifu"
	}],
	["path", {
		d: "M12 8h.01",
		key: "e9boi3"
	}]
]), Mt = K("loader-circle", [["path", {
	d: "M21 12a9 9 0 1 1-6.219-8.56",
	key: "13zald"
}]]), Nt = K("minus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}]]), Pt = K("search", [["path", {
	d: "m21 21-4.34-4.34",
	key: "14j7rj"
}], ["circle", {
	cx: "11",
	cy: "11",
	r: "8",
	key: "4ej97u"
}]]), Ft = K("triangle-alert", [
	["path", {
		d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
		key: "wmoenq"
	}],
	["path", {
		d: "M12 9v4",
		key: "juzpu7"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}]
]), It = K("user", [["path", {
	d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",
	key: "975kel"
}], ["circle", {
	cx: "12",
	cy: "7",
	r: "4",
	key: "17ys0d"
}]]), Lt = K("x", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]);
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-compose-refs@1.1.2_@types+react@19.2.14_react@19.2.6/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
function Rt(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
function zt(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = Rt(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : Rt(e[t], null);
			}
		};
	};
}
function q(...t) {
	return e.useCallback(zt(...t), t);
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-slot@1.2.3_@types+react@19.2.14_react@19.2.6/node_modules/@radix-ui/react-slot/dist/index.mjs
/* @__NO_SIDE_EFFECTS__ */
function Bt(t) {
	let n = /* @__PURE__ */ Ht(t), r = e.forwardRef((t, r) => {
		let { children: i, ...a } = t, o = e.Children.toArray(i), s = o.find(Gt);
		if (s) {
			let t = s.props.children, i = o.map((n) => n === s ? e.Children.count(t) > 1 ? e.Children.only(null) : e.isValidElement(t) ? t.props.children : null : n);
			return /* @__PURE__ */ h(n, {
				...a,
				ref: r,
				children: e.isValidElement(t) ? e.cloneElement(t, void 0, i) : null
			});
		}
		return /* @__PURE__ */ h(n, {
			...a,
			ref: r,
			children: i
		});
	});
	return r.displayName = `${t}.Slot`, r;
}
var Vt = /* @__PURE__ */ Bt("Slot");
/* @__NO_SIDE_EFFECTS__ */
function Ht(t) {
	let n = e.forwardRef((t, n) => {
		let { children: r, ...i } = t;
		if (e.isValidElement(r)) {
			let t = qt(r), a = Kt(i, r.props);
			return r.type !== e.Fragment && (a.ref = n ? zt(n, t) : t), e.cloneElement(r, a);
		}
		return e.Children.count(r) > 1 ? e.Children.only(null) : null;
	});
	return n.displayName = `${t}.SlotClone`, n;
}
var Ut = Symbol("radix.slottable");
/* @__NO_SIDE_EFFECTS__ */
function Wt(e) {
	let t = ({ children: e }) => /* @__PURE__ */ h(m, { children: e });
	return t.displayName = `${e}.Slottable`, t.__radixId = Ut, t;
}
function Gt(t) {
	return e.isValidElement(t) && typeof t.type == "function" && "__radixId" in t.type && t.type.__radixId === Ut;
}
function Kt(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
function qt(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-primitive@2.1.3_@types+react-dom@19.2.3_@types+react@19.2.14__@types+re_0935c7b95cefcdb4f10a34e92035e5e3/node_modules/@radix-ui/react-primitive/dist/index.mjs
var J = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((t, n) => {
	let r = /* @__PURE__ */ Bt(`Primitive.${n}`), i = e.forwardRef((e, t) => {
		let { asChild: i, ...a } = e, o = i ? r : n;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ h(o, {
			...a,
			ref: t
		});
	});
	return i.displayName = `Primitive.${n}`, {
		...t,
		[n]: i
	};
}, {});
function Jt(e, t) {
	e && f.flushSync(() => e.dispatchEvent(t));
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-visually-hidden@1.2.3_@types+react-dom@19.2.3_@types+react@19.2.14__@ty_d1be9c417e0b55d219bafdc186d26ce0/node_modules/@radix-ui/react-visually-hidden/dist/index.mjs
var Yt = Object.freeze({
	position: "absolute",
	border: 0,
	width: 1,
	height: 1,
	padding: 0,
	margin: -1,
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	wordWrap: "normal"
}), Xt = "VisuallyHidden", Zt = e.forwardRef((e, t) => /* @__PURE__ */ h(J.span, {
	...e,
	ref: t,
	style: {
		...Yt,
		...e.style
	}
}));
Zt.displayName = Xt;
var Qt = Zt;
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-context@1.1.2_@types+react@19.2.14_react@19.2.6/node_modules/@radix-ui/react-context/dist/index.mjs
function $t(t, n) {
	let r = e.createContext(n), i = (t) => {
		let { children: n, ...i } = t, a = e.useMemo(() => i, Object.values(i));
		return /* @__PURE__ */ h(r.Provider, {
			value: a,
			children: n
		});
	};
	i.displayName = t + "Provider";
	function a(i) {
		let a = e.useContext(r);
		if (a) return a;
		if (n !== void 0) return n;
		throw Error(`\`${i}\` must be used within \`${t}\``);
	}
	return [i, a];
}
function en(t, n = []) {
	let r = [];
	function i(n, i) {
		let a = e.createContext(i), o = r.length;
		r = [...r, i];
		let s = (n) => {
			let { scope: r, children: i, ...s } = n, c = r?.[t]?.[o] || a, l = e.useMemo(() => s, Object.values(s));
			return /* @__PURE__ */ h(c.Provider, {
				value: l,
				children: i
			});
		};
		s.displayName = n + "Provider";
		function c(r, s) {
			let c = s?.[t]?.[o] || a, l = e.useContext(c);
			if (l) return l;
			if (i !== void 0) return i;
			throw Error(`\`${r}\` must be used within \`${n}\``);
		}
		return [s, c];
	}
	let a = () => {
		let n = r.map((t) => e.createContext(t));
		return function(r) {
			let i = r?.[t] || n;
			return e.useMemo(() => ({ [`__scope${t}`]: {
				...r,
				[t]: i
			} }), [r, i]);
		};
	};
	return a.scopeName = t, [i, tn(a, ...n)];
}
function tn(...t) {
	let n = t[0];
	if (t.length === 1) return n;
	let r = () => {
		let r = t.map((e) => ({
			useScope: e(),
			scopeName: e.scopeName
		}));
		return function(t) {
			let i = r.reduce((e, { useScope: n, scopeName: r }) => {
				let i = n(t)[`__scope${r}`];
				return {
					...e,
					...i
				};
			}, {});
			return e.useMemo(() => ({ [`__scope${n.scopeName}`]: i }), [i]);
		};
	};
	return r.scopeName = n.scopeName, r;
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-collection@1.1.7_@types+react-dom@19.2.3_@types+react@19.2.14__@types+r_b94f5365b88697a700662930c56ccffc/node_modules/@radix-ui/react-collection/dist/index.mjs
function nn(e) {
	let n = e + "CollectionProvider", [r, i] = en(n), [a, o] = r(n, {
		collectionRef: { current: null },
		itemMap: /* @__PURE__ */ new Map()
	}), s = (e) => {
		let { scope: n, children: r } = e, i = t.useRef(null), o = t.useRef(/* @__PURE__ */ new Map()).current;
		return /* @__PURE__ */ h(a, {
			scope: n,
			itemMap: o,
			collectionRef: i,
			children: r
		});
	};
	s.displayName = n;
	let c = e + "CollectionSlot", l = /* @__PURE__ */ Bt(c), u = t.forwardRef((e, t) => {
		let { scope: n, children: r } = e;
		return /* @__PURE__ */ h(l, {
			ref: q(t, o(c, n).collectionRef),
			children: r
		});
	});
	u.displayName = c;
	let d = e + "CollectionItemSlot", f = "data-radix-collection-item", p = /* @__PURE__ */ Bt(d), m = t.forwardRef((e, n) => {
		let { scope: r, children: i, ...a } = e, s = t.useRef(null), c = q(n, s), l = o(d, r);
		return t.useEffect(() => (l.itemMap.set(s, {
			ref: s,
			...a
		}), () => void l.itemMap.delete(s))), /* @__PURE__ */ h(p, {
			[f]: "",
			ref: c,
			children: i
		});
	});
	m.displayName = d;
	function g(n) {
		let r = o(e + "CollectionConsumer", n);
		return t.useCallback(() => {
			let e = r.collectionRef.current;
			if (!e) return [];
			let t = Array.from(e.querySelectorAll(`[${f}]`));
			return Array.from(r.itemMap.values()).sort((e, n) => t.indexOf(e.ref.current) - t.indexOf(n.ref.current));
		}, [r.collectionRef, r.itemMap]);
	}
	return [
		{
			Provider: s,
			Slot: u,
			ItemSlot: m
		},
		g,
		i
	];
}
typeof window < "u" && window.document && window.document.createElement;
function Y(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
	return function(r) {
		if (e?.(r), n === !1 || !r.defaultPrevented) return t?.(r);
	};
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-use-layout-effect@1.1.1_@types+react@19.2.14_react@19.2.6/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var rn = globalThis?.document ? e.useLayoutEffect : () => {}, an = e.useInsertionEffect || rn;
function on({ prop: t, defaultProp: n, onChange: r = () => {}, caller: i }) {
	let [a, o, s] = sn({
		defaultProp: n,
		onChange: r
	}), c = t !== void 0, l = c ? t : a;
	{
		let n = e.useRef(t !== void 0);
		e.useEffect(() => {
			let e = n.current;
			e !== c && console.warn(`${i} is changing from ${e ? "controlled" : "uncontrolled"} to ${c ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`), n.current = c;
		}, [c, i]);
	}
	return [l, e.useCallback((e) => {
		if (c) {
			let n = cn(e) ? e(t) : e;
			n !== t && s.current?.(n);
		} else o(e);
	}, [
		c,
		t,
		o,
		s
	])];
}
function sn({ defaultProp: t, onChange: n }) {
	let [r, i] = e.useState(t), a = e.useRef(r), o = e.useRef(n);
	return an(() => {
		o.current = n;
	}, [n]), e.useEffect(() => {
		a.current !== r && (o.current?.(r), a.current = r);
	}, [r, a]), [
		r,
		i,
		o
	];
}
function cn(e) {
	return typeof e == "function";
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-presence@1.1.5_@types+react-dom@19.2.3_@types+react@19.2.14__@types+rea_abbc8bcf75333b39bfe32b13ef7abc0e/node_modules/@radix-ui/react-presence/dist/index.mjs
function ln(t, n) {
	return e.useReducer((e, t) => n[e][t] ?? e, t);
}
var un = (t) => {
	let { present: n, children: r } = t, i = dn(n), a = typeof r == "function" ? r({ present: i.isPresent }) : e.Children.only(r), o = q(i.ref, pn(a));
	return typeof r == "function" || i.isPresent ? e.cloneElement(a, { ref: o }) : null;
};
un.displayName = "Presence";
function dn(t) {
	let [n, r] = e.useState(), i = e.useRef(null), a = e.useRef(t), o = e.useRef("none"), [s, c] = ln(t ? "mounted" : "unmounted", {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	});
	return e.useEffect(() => {
		let e = fn(i.current);
		o.current = s === "mounted" ? e : "none";
	}, [s]), rn(() => {
		let e = i.current, n = a.current;
		if (n !== t) {
			let r = o.current, i = fn(e);
			t ? c("MOUNT") : i === "none" || e?.display === "none" ? c("UNMOUNT") : c(n && r !== i ? "ANIMATION_OUT" : "UNMOUNT"), a.current = t;
		}
	}, [t, c]), rn(() => {
		if (n) {
			let e, t = n.ownerDocument.defaultView ?? window, r = (r) => {
				let o = fn(i.current).includes(CSS.escape(r.animationName));
				if (r.target === n && o && (c("ANIMATION_END"), !a.current)) {
					let r = n.style.animationFillMode;
					n.style.animationFillMode = "forwards", e = t.setTimeout(() => {
						n.style.animationFillMode === "forwards" && (n.style.animationFillMode = r);
					});
				}
			}, s = (e) => {
				e.target === n && (o.current = fn(i.current));
			};
			return n.addEventListener("animationstart", s), n.addEventListener("animationcancel", r), n.addEventListener("animationend", r), () => {
				t.clearTimeout(e), n.removeEventListener("animationstart", s), n.removeEventListener("animationcancel", r), n.removeEventListener("animationend", r);
			};
		} else c("ANIMATION_END");
	}, [n, c]), {
		isPresent: ["mounted", "unmountSuspended"].includes(s),
		ref: e.useCallback((e) => {
			i.current = e ? getComputedStyle(e) : null, r(e);
		}, [])
	};
}
function fn(e) {
	return e?.animationName || "none";
}
function pn(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-id@1.1.1_@types+react@19.2.14_react@19.2.6/node_modules/@radix-ui/react-id/dist/index.mjs
var mn = e.useId || (() => void 0), hn = 0;
function gn(t) {
	let [n, r] = e.useState(mn());
	return rn(() => {
		t || r((e) => e ?? String(hn++));
	}, [t]), t || (n ? `radix-${n}` : "");
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-collapsible@1.1.12_@types+react-dom@19.2.3_@types+react@19.2.14__@types_e6de6020dad09a1b58742342f76b372e/node_modules/@radix-ui/react-collapsible/dist/index.mjs
var _n = "Collapsible", [vn, yn] = en(_n), [bn, xn] = vn(_n), Sn = e.forwardRef((t, n) => {
	let { __scopeCollapsible: r, open: i, defaultOpen: a, disabled: o, onOpenChange: s, ...c } = t, [l, u] = on({
		prop: i,
		defaultProp: a ?? !1,
		onChange: s,
		caller: _n
	});
	return /* @__PURE__ */ h(bn, {
		scope: r,
		disabled: o,
		contentId: gn(),
		open: l,
		onOpenToggle: e.useCallback(() => u((e) => !e), [u]),
		children: /* @__PURE__ */ h(J.div, {
			"data-state": On(l),
			"data-disabled": o ? "" : void 0,
			...c,
			ref: n
		})
	});
});
Sn.displayName = _n;
var Cn = "CollapsibleTrigger", wn = e.forwardRef((e, t) => {
	let { __scopeCollapsible: n, ...r } = e, i = xn(Cn, n);
	return /* @__PURE__ */ h(J.button, {
		type: "button",
		"aria-controls": i.contentId,
		"aria-expanded": i.open || !1,
		"data-state": On(i.open),
		"data-disabled": i.disabled ? "" : void 0,
		disabled: i.disabled,
		...r,
		ref: t,
		onClick: Y(e.onClick, i.onOpenToggle)
	});
});
wn.displayName = Cn;
var Tn = "CollapsibleContent", En = e.forwardRef((e, t) => {
	let { forceMount: n, ...r } = e, i = xn(Tn, e.__scopeCollapsible);
	return /* @__PURE__ */ h(un, {
		present: n || i.open,
		children: ({ present: e }) => /* @__PURE__ */ h(Dn, {
			...r,
			ref: t,
			present: e
		})
	});
});
En.displayName = Tn;
var Dn = e.forwardRef((t, n) => {
	let { __scopeCollapsible: r, present: i, children: a, ...o } = t, s = xn(Tn, r), [c, l] = e.useState(i), u = e.useRef(null), d = q(n, u), f = e.useRef(0), p = f.current, m = e.useRef(0), g = m.current, _ = s.open || c, v = e.useRef(_), y = e.useRef(void 0);
	return e.useEffect(() => {
		let e = requestAnimationFrame(() => v.current = !1);
		return () => cancelAnimationFrame(e);
	}, []), rn(() => {
		let e = u.current;
		if (e) {
			y.current = y.current || {
				transitionDuration: e.style.transitionDuration,
				animationName: e.style.animationName
			}, e.style.transitionDuration = "0s", e.style.animationName = "none";
			let t = e.getBoundingClientRect();
			f.current = t.height, m.current = t.width, v.current || (e.style.transitionDuration = y.current.transitionDuration, e.style.animationName = y.current.animationName), l(i);
		}
	}, [s.open, i]), /* @__PURE__ */ h(J.div, {
		"data-state": On(s.open),
		"data-disabled": s.disabled ? "" : void 0,
		id: s.contentId,
		hidden: !_,
		...o,
		ref: d,
		style: {
			"--radix-collapsible-content-height": p ? `${p}px` : void 0,
			"--radix-collapsible-content-width": g ? `${g}px` : void 0,
			...t.style
		},
		children: _ && a
	});
});
function On(e) {
	return e ? "open" : "closed";
}
var kn = Sn, An = wn, jn = En, Mn = e.createContext(void 0);
function Nn(t) {
	let n = e.useContext(Mn);
	return t || n || "ltr";
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-accordion@1.2.12_@types+react-dom@19.2.3_@types+react@19.2.14__@types+r_dd042184823cb7783b305fbc0c6ee2dd/node_modules/@radix-ui/react-accordion/dist/index.mjs
var Pn = "Accordion", Fn = [
	"Home",
	"End",
	"ArrowDown",
	"ArrowUp",
	"ArrowLeft",
	"ArrowRight"
], [In, Ln, Rn] = nn(Pn), [zn, Bn] = en(Pn, [Rn, yn]), Vn = yn(), Hn = t.forwardRef((e, t) => {
	let { type: n, ...r } = e, i = r, a = r;
	return /* @__PURE__ */ h(In.Provider, {
		scope: e.__scopeAccordion,
		children: n === "multiple" ? /* @__PURE__ */ h(Jn, {
			...a,
			ref: t
		}) : /* @__PURE__ */ h(qn, {
			...i,
			ref: t
		})
	});
});
Hn.displayName = Pn;
var [Un, Wn] = zn(Pn), [Gn, Kn] = zn(Pn, { collapsible: !1 }), qn = t.forwardRef((e, n) => {
	let { value: r, defaultValue: i, onValueChange: a = () => {}, collapsible: o = !1, ...s } = e, [c, l] = on({
		prop: r,
		defaultProp: i ?? "",
		onChange: a,
		caller: Pn
	});
	return /* @__PURE__ */ h(Un, {
		scope: e.__scopeAccordion,
		value: t.useMemo(() => c ? [c] : [], [c]),
		onItemOpen: l,
		onItemClose: t.useCallback(() => o && l(""), [o, l]),
		children: /* @__PURE__ */ h(Gn, {
			scope: e.__scopeAccordion,
			collapsible: o,
			children: /* @__PURE__ */ h(Zn, {
				...s,
				ref: n
			})
		})
	});
}), Jn = t.forwardRef((e, n) => {
	let { value: r, defaultValue: i, onValueChange: a = () => {}, ...o } = e, [s, c] = on({
		prop: r,
		defaultProp: i ?? [],
		onChange: a,
		caller: Pn
	}), l = t.useCallback((e) => c((t = []) => [...t, e]), [c]), u = t.useCallback((e) => c((t = []) => t.filter((t) => t !== e)), [c]);
	return /* @__PURE__ */ h(Un, {
		scope: e.__scopeAccordion,
		value: s,
		onItemOpen: l,
		onItemClose: u,
		children: /* @__PURE__ */ h(Gn, {
			scope: e.__scopeAccordion,
			collapsible: !0,
			children: /* @__PURE__ */ h(Zn, {
				...o,
				ref: n
			})
		})
	});
}), [Yn, Xn] = zn(Pn), Zn = t.forwardRef((e, n) => {
	let { __scopeAccordion: r, disabled: i, dir: a, orientation: o = "vertical", ...s } = e, c = q(t.useRef(null), n), l = Ln(r), u = Nn(a) === "ltr", d = Y(e.onKeyDown, (e) => {
		if (!Fn.includes(e.key)) return;
		let t = e.target, n = l().filter((e) => !e.ref.current?.disabled), r = n.findIndex((e) => e.ref.current === t), i = n.length;
		if (r === -1) return;
		e.preventDefault();
		let a = r, s = i - 1, c = () => {
			a = r + 1, a > s && (a = 0);
		}, d = () => {
			a = r - 1, a < 0 && (a = s);
		};
		switch (e.key) {
			case "Home":
				a = 0;
				break;
			case "End":
				a = s;
				break;
			case "ArrowRight":
				o === "horizontal" && (u ? c() : d());
				break;
			case "ArrowDown":
				o === "vertical" && c();
				break;
			case "ArrowLeft":
				o === "horizontal" && (u ? d() : c());
				break;
			case "ArrowUp":
				o === "vertical" && d();
				break;
		}
		n[a % i].ref.current?.focus();
	});
	return /* @__PURE__ */ h(Yn, {
		scope: r,
		disabled: i,
		direction: a,
		orientation: o,
		children: /* @__PURE__ */ h(In.Slot, {
			scope: r,
			children: /* @__PURE__ */ h(J.div, {
				...s,
				"data-orientation": o,
				ref: c,
				onKeyDown: i ? void 0 : d
			})
		})
	});
}), Qn = "AccordionItem", [$n, er] = zn(Qn), tr = t.forwardRef((e, t) => {
	let { __scopeAccordion: n, value: r, ...i } = e, a = Xn(Qn, n), o = Wn(Qn, n), s = Vn(n), c = gn(), l = r && o.value.includes(r) || !1, u = a.disabled || e.disabled;
	return /* @__PURE__ */ h($n, {
		scope: n,
		open: l,
		disabled: u,
		triggerId: c,
		children: /* @__PURE__ */ h(kn, {
			"data-orientation": a.orientation,
			"data-state": cr(l),
			...s,
			...i,
			ref: t,
			disabled: u,
			open: l,
			onOpenChange: (e) => {
				e ? o.onItemOpen(r) : o.onItemClose(r);
			}
		})
	});
});
tr.displayName = Qn;
var nr = "AccordionHeader", rr = t.forwardRef((e, t) => {
	let { __scopeAccordion: n, ...r } = e, i = Xn(Pn, n), a = er(nr, n);
	return /* @__PURE__ */ h(J.h3, {
		"data-orientation": i.orientation,
		"data-state": cr(a.open),
		"data-disabled": a.disabled ? "" : void 0,
		...r,
		ref: t
	});
});
rr.displayName = nr;
var ir = "AccordionTrigger", ar = t.forwardRef((e, t) => {
	let { __scopeAccordion: n, ...r } = e, i = Xn(Pn, n), a = er(ir, n), o = Kn(ir, n), s = Vn(n);
	return /* @__PURE__ */ h(In.ItemSlot, {
		scope: n,
		children: /* @__PURE__ */ h(An, {
			"aria-disabled": a.open && !o.collapsible || void 0,
			"data-orientation": i.orientation,
			id: a.triggerId,
			...s,
			...r,
			ref: t
		})
	});
});
ar.displayName = ir;
var or = "AccordionContent", sr = t.forwardRef((e, t) => {
	let { __scopeAccordion: n, ...r } = e, i = Xn(Pn, n), a = er(or, n), o = Vn(n);
	return /* @__PURE__ */ h(jn, {
		role: "region",
		"aria-labelledby": a.triggerId,
		"data-orientation": i.orientation,
		...o,
		...r,
		ref: t,
		style: {
			"--radix-accordion-content-height": "var(--radix-collapsible-content-height)",
			"--radix-accordion-content-width": "var(--radix-collapsible-content-width)",
			...e.style
		}
	});
});
sr.displayName = or;
function cr(e) {
	return e ? "open" : "closed";
}
var lr = Hn, ur = tr, dr = rr, fr = ar, pr = sr;
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-use-callback-ref@1.1.1_@types+react@19.2.14_react@19.2.6/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
function X(t) {
	let n = e.useRef(t);
	return e.useEffect(() => {
		n.current = t;
	}), e.useMemo(() => (...e) => n.current?.(...e), []);
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-use-escape-keydown@1.1.1_@types+react@19.2.14_react@19.2.6/node_modules/@radix-ui/react-use-escape-keydown/dist/index.mjs
function mr(t, n = globalThis?.document) {
	let r = X(t);
	e.useEffect(() => {
		let e = (e) => {
			e.key === "Escape" && r(e);
		};
		return n.addEventListener("keydown", e, { capture: !0 }), () => n.removeEventListener("keydown", e, { capture: !0 });
	}, [r, n]);
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-dismissable-layer@1.1.11_@types+react-dom@19.2.3_@types+react@19.2.14___9e4771d0900293d89694eff7a0933149/node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
var hr = "DismissableLayer", gr = "dismissableLayer.update", _r = "dismissableLayer.pointerDownOutside", vr = "dismissableLayer.focusOutside", yr, br = e.createContext({
	layers: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	branches: /* @__PURE__ */ new Set()
}), xr = e.forwardRef((t, n) => {
	let { disableOutsidePointerEvents: r = !1, onEscapeKeyDown: i, onPointerDownOutside: a, onFocusOutside: o, onInteractOutside: s, onDismiss: c, ...l } = t, u = e.useContext(br), [d, f] = e.useState(null), p = d?.ownerDocument ?? globalThis?.document, [, m] = e.useState({}), g = q(n, (e) => f(e)), _ = Array.from(u.layers), [v] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), y = _.indexOf(v), b = d ? _.indexOf(d) : -1, x = u.layersWithOutsidePointerEventsDisabled.size > 0, S = b >= y, C = wr((e) => {
		let t = e.target, n = [...u.branches].some((e) => e.contains(t));
		!S || n || (a?.(e), s?.(e), e.defaultPrevented || c?.());
	}, p), w = Tr((e) => {
		let t = e.target;
		[...u.branches].some((e) => e.contains(t)) || (o?.(e), s?.(e), e.defaultPrevented || c?.());
	}, p);
	return mr((e) => {
		b === u.layers.size - 1 && (i?.(e), !e.defaultPrevented && c && (e.preventDefault(), c()));
	}, p), e.useEffect(() => {
		if (d) return r && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (yr = p.body.style.pointerEvents, p.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(d)), u.layers.add(d), Er(), () => {
			r && u.layersWithOutsidePointerEventsDisabled.size === 1 && (p.body.style.pointerEvents = yr);
		};
	}, [
		d,
		p,
		r,
		u
	]), e.useEffect(() => () => {
		d && (u.layers.delete(d), u.layersWithOutsidePointerEventsDisabled.delete(d), Er());
	}, [d, u]), e.useEffect(() => {
		let e = () => m({});
		return document.addEventListener(gr, e), () => document.removeEventListener(gr, e);
	}, []), /* @__PURE__ */ h(J.div, {
		...l,
		ref: g,
		style: {
			pointerEvents: x ? S ? "auto" : "none" : void 0,
			...t.style
		},
		onFocusCapture: Y(t.onFocusCapture, w.onFocusCapture),
		onBlurCapture: Y(t.onBlurCapture, w.onBlurCapture),
		onPointerDownCapture: Y(t.onPointerDownCapture, C.onPointerDownCapture)
	});
});
xr.displayName = hr;
var Sr = "DismissableLayerBranch", Cr = e.forwardRef((t, n) => {
	let r = e.useContext(br), i = e.useRef(null), a = q(n, i);
	return e.useEffect(() => {
		let e = i.current;
		if (e) return r.branches.add(e), () => {
			r.branches.delete(e);
		};
	}, [r.branches]), /* @__PURE__ */ h(J.div, {
		...t,
		ref: a
	});
});
Cr.displayName = Sr;
function wr(t, n = globalThis?.document) {
	let r = X(t), i = e.useRef(!1), a = e.useRef(() => {});
	return e.useEffect(() => {
		let e = (e) => {
			if (e.target && !i.current) {
				let t = function() {
					Dr(_r, r, i, { discrete: !0 });
				}, i = { originalEvent: e };
				e.pointerType === "touch" ? (n.removeEventListener("click", a.current), a.current = t, n.addEventListener("click", a.current, { once: !0 })) : t();
			} else n.removeEventListener("click", a.current);
			i.current = !1;
		}, t = window.setTimeout(() => {
			n.addEventListener("pointerdown", e);
		}, 0);
		return () => {
			window.clearTimeout(t), n.removeEventListener("pointerdown", e), n.removeEventListener("click", a.current);
		};
	}, [n, r]), { onPointerDownCapture: () => i.current = !0 };
}
function Tr(t, n = globalThis?.document) {
	let r = X(t), i = e.useRef(!1);
	return e.useEffect(() => {
		let e = (e) => {
			e.target && !i.current && Dr(vr, r, { originalEvent: e }, { discrete: !1 });
		};
		return n.addEventListener("focusin", e), () => n.removeEventListener("focusin", e);
	}, [n, r]), {
		onFocusCapture: () => i.current = !0,
		onBlurCapture: () => i.current = !1
	};
}
function Er() {
	let e = new CustomEvent(gr);
	document.dispatchEvent(e);
}
function Dr(e, t, n, { discrete: r }) {
	let i = n.originalEvent.target, a = new CustomEvent(e, {
		bubbles: !1,
		cancelable: !0,
		detail: n
	});
	t && i.addEventListener(e, t, { once: !0 }), r ? Jt(i, a) : i.dispatchEvent(a);
}
var Or = xr, kr = Cr, Ar = "focusScope.autoFocusOnMount", jr = "focusScope.autoFocusOnUnmount", Mr = {
	bubbles: !1,
	cancelable: !0
}, Nr = "FocusScope", Pr = e.forwardRef((t, n) => {
	let { loop: r = !1, trapped: i = !1, onMountAutoFocus: a, onUnmountAutoFocus: o, ...s } = t, [c, l] = e.useState(null), u = X(a), d = X(o), f = e.useRef(null), p = q(n, (e) => l(e)), m = e.useRef({
		paused: !1,
		pause() {
			this.paused = !0;
		},
		resume() {
			this.paused = !1;
		}
	}).current;
	e.useEffect(() => {
		if (i) {
			let e = function(e) {
				if (m.paused || !c) return;
				let t = e.target;
				c.contains(t) ? f.current = t : Vr(f.current, { select: !0 });
			}, t = function(e) {
				if (m.paused || !c) return;
				let t = e.relatedTarget;
				t !== null && (c.contains(t) || Vr(f.current, { select: !0 }));
			}, n = function(e) {
				if (document.activeElement === document.body) for (let t of e) t.removedNodes.length > 0 && Vr(c);
			};
			document.addEventListener("focusin", e), document.addEventListener("focusout", t);
			let r = new MutationObserver(n);
			return c && r.observe(c, {
				childList: !0,
				subtree: !0
			}), () => {
				document.removeEventListener("focusin", e), document.removeEventListener("focusout", t), r.disconnect();
			};
		}
	}, [
		i,
		c,
		m.paused
	]), e.useEffect(() => {
		if (c) {
			Hr.add(m);
			let e = document.activeElement;
			if (!c.contains(e)) {
				let t = new CustomEvent(Ar, Mr);
				c.addEventListener(Ar, u), c.dispatchEvent(t), t.defaultPrevented || (Fr(Gr(Lr(c)), { select: !0 }), document.activeElement === e && Vr(c));
			}
			return () => {
				c.removeEventListener(Ar, u), setTimeout(() => {
					let t = new CustomEvent(jr, Mr);
					c.addEventListener(jr, d), c.dispatchEvent(t), t.defaultPrevented || Vr(e ?? document.body, { select: !0 }), c.removeEventListener(jr, d), Hr.remove(m);
				}, 0);
			};
		}
	}, [
		c,
		u,
		d,
		m
	]);
	let g = e.useCallback((e) => {
		if (!r && !i || m.paused) return;
		let t = e.key === "Tab" && !e.altKey && !e.ctrlKey && !e.metaKey, n = document.activeElement;
		if (t && n) {
			let t = e.currentTarget, [i, a] = Ir(t);
			i && a ? !e.shiftKey && n === a ? (e.preventDefault(), r && Vr(i, { select: !0 })) : e.shiftKey && n === i && (e.preventDefault(), r && Vr(a, { select: !0 })) : n === t && e.preventDefault();
		}
	}, [
		r,
		i,
		m.paused
	]);
	return /* @__PURE__ */ h(J.div, {
		tabIndex: -1,
		...s,
		ref: p,
		onKeyDown: g
	});
});
Pr.displayName = Nr;
function Fr(e, { select: t = !1 } = {}) {
	let n = document.activeElement;
	for (let r of e) if (Vr(r, { select: t }), document.activeElement !== n) return;
}
function Ir(e) {
	let t = Lr(e);
	return [Rr(t, e), Rr(t.reverse(), e)];
}
function Lr(e) {
	let t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: (e) => {
		let t = e.tagName === "INPUT" && e.type === "hidden";
		return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	for (; n.nextNode();) t.push(n.currentNode);
	return t;
}
function Rr(e, t) {
	for (let n of e) if (!zr(n, { upTo: t })) return n;
}
function zr(e, { upTo: t }) {
	if (getComputedStyle(e).visibility === "hidden") return !0;
	for (; e;) {
		if (t !== void 0 && e === t) return !1;
		if (getComputedStyle(e).display === "none") return !0;
		e = e.parentElement;
	}
	return !1;
}
function Br(e) {
	return e instanceof HTMLInputElement && "select" in e;
}
function Vr(e, { select: t = !1 } = {}) {
	if (e && e.focus) {
		let n = document.activeElement;
		e.focus({ preventScroll: !0 }), e !== n && Br(e) && t && e.select();
	}
}
var Hr = Ur();
function Ur() {
	let e = [];
	return {
		add(t) {
			let n = e[0];
			t !== n && n?.pause(), e = Wr(e, t), e.unshift(t);
		},
		remove(t) {
			e = Wr(e, t), e[0]?.resume();
		}
	};
}
function Wr(e, t) {
	let n = [...e], r = n.indexOf(t);
	return r !== -1 && n.splice(r, 1), n;
}
function Gr(e) {
	return e.filter((e) => e.tagName !== "A");
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-portal@1.1.9_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react_266ca67294f168fbf2e025541d323e69/node_modules/@radix-ui/react-portal/dist/index.mjs
var Kr = "Portal", qr = e.forwardRef((t, n) => {
	let { container: r, ...i } = t, [a, o] = e.useState(!1);
	rn(() => o(!0), []);
	let s = r || a && globalThis?.document?.body;
	return s ? p.createPortal(/* @__PURE__ */ h(J.div, {
		...i,
		ref: n
	}), s) : null;
});
qr.displayName = Kr;
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-focus-guards@1.1.3_@types+react@19.2.14_react@19.2.6/node_modules/@radix-ui/react-focus-guards/dist/index.mjs
var Jr = 0;
function Yr() {
	e.useEffect(() => {
		let e = document.querySelectorAll("[data-radix-focus-guard]");
		return document.body.insertAdjacentElement("afterbegin", e[0] ?? Xr()), document.body.insertAdjacentElement("beforeend", e[1] ?? Xr()), Jr++, () => {
			Jr === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((e) => e.remove()), Jr--;
		};
	}, []);
}
function Xr() {
	let e = document.createElement("span");
	return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
//#endregion
//#region node_modules/.pnpm/tslib@2.8.1/node_modules/tslib/tslib.es6.mjs
var Zr = function() {
	return Zr = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, Zr.apply(this, arguments);
};
function Qr(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function $r(e, t, n) {
	if (n || arguments.length === 2) for (var r = 0, i = t.length, a; r < i; r++) (a || !(r in t)) && (a ||= Array.prototype.slice.call(t, 0, r), a[r] = t[r]);
	return e.concat(a || Array.prototype.slice.call(t));
}
//#endregion
//#region node_modules/.pnpm/react-remove-scroll-bar@2.3.8_@types+react@19.2.14_react@19.2.6/node_modules/react-remove-scroll-bar/dist/es2015/constants.js
var ei = "right-scroll-bar-position", ti = "width-before-scroll-bar", ni = "with-scroll-bars-hidden", ri = "--removed-body-scroll-bar-size";
//#endregion
//#region node_modules/.pnpm/use-callback-ref@1.3.3_@types+react@19.2.14_react@19.2.6/node_modules/use-callback-ref/dist/es2015/assignRef.js
function ii(e, t) {
	return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
//#endregion
//#region node_modules/.pnpm/use-callback-ref@1.3.3_@types+react@19.2.14_react@19.2.6/node_modules/use-callback-ref/dist/es2015/useRef.js
function ai(e, t) {
	var n = d(function() {
		return {
			value: e,
			callback: t,
			facade: {
				get current() {
					return n.value;
				},
				set current(e) {
					var t = n.value;
					t !== e && (n.value = e, n.callback(e, t));
				}
			}
		};
	})[0];
	return n.callback = t, n.facade;
}
//#endregion
//#region node_modules/.pnpm/use-callback-ref@1.3.3_@types+react@19.2.14_react@19.2.6/node_modules/use-callback-ref/dist/es2015/useMergeRef.js
var oi = typeof window < "u" ? e.useLayoutEffect : e.useEffect, si = /* @__PURE__ */ new WeakMap();
function ci(e, t) {
	var n = ai(t || null, function(t) {
		return e.forEach(function(e) {
			return ii(e, t);
		});
	});
	return oi(function() {
		var t = si.get(n);
		if (t) {
			var r = new Set(t), i = new Set(e), a = n.current;
			r.forEach(function(e) {
				i.has(e) || ii(e, null);
			}), i.forEach(function(e) {
				r.has(e) || ii(e, a);
			});
		}
		si.set(n, e);
	}, [e]), n;
}
//#endregion
//#region node_modules/.pnpm/use-sidecar@1.1.3_@types+react@19.2.14_react@19.2.6/node_modules/use-sidecar/dist/es2015/medium.js
function li(e) {
	return e;
}
function ui(e, t) {
	t === void 0 && (t = li);
	var n = [], r = !1;
	return {
		read: function() {
			if (r) throw Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
			return n.length ? n[n.length - 1] : e;
		},
		useMedium: function(e) {
			var i = t(e, r);
			return n.push(i), function() {
				n = n.filter(function(e) {
					return e !== i;
				});
			};
		},
		assignSyncMedium: function(e) {
			for (r = !0; n.length;) {
				var t = n;
				n = [], t.forEach(e);
			}
			n = {
				push: function(t) {
					return e(t);
				},
				filter: function() {
					return n;
				}
			};
		},
		assignMedium: function(e) {
			r = !0;
			var t = [];
			if (n.length) {
				var i = n;
				n = [], i.forEach(e), t = n;
			}
			var a = function() {
				var n = t;
				t = [], n.forEach(e);
			}, o = function() {
				return Promise.resolve().then(a);
			};
			o(), n = {
				push: function(e) {
					t.push(e), o();
				},
				filter: function(e) {
					return t = t.filter(e), n;
				}
			};
		}
	};
}
function di(e) {
	e === void 0 && (e = {});
	var t = ui(null);
	return t.options = Zr({
		async: !0,
		ssr: !1
	}, e), t;
}
//#endregion
//#region node_modules/.pnpm/use-sidecar@1.1.3_@types+react@19.2.14_react@19.2.6/node_modules/use-sidecar/dist/es2015/exports.js
var fi = function(t) {
	var n = t.sideCar, r = Qr(t, ["sideCar"]);
	if (!n) throw Error("Sidecar: please provide `sideCar` property to import the right car");
	var i = n.read();
	if (!i) throw Error("Sidecar medium not found");
	return e.createElement(i, Zr({}, r));
};
fi.isSideCarExport = !0;
function pi(e, t) {
	return e.useMedium(t), fi;
}
//#endregion
//#region node_modules/.pnpm/react-remove-scroll@2.7.2_@types+react@19.2.14_react@19.2.6/node_modules/react-remove-scroll/dist/es2015/medium.js
var mi = di(), hi = function() {}, gi = e.forwardRef(function(t, n) {
	var r = e.useRef(null), i = e.useState({
		onScrollCapture: hi,
		onWheelCapture: hi,
		onTouchMoveCapture: hi
	}), a = i[0], o = i[1], s = t.forwardProps, c = t.children, l = t.className, u = t.removeScrollBar, d = t.enabled, f = t.shards, p = t.sideCar, m = t.noRelative, h = t.noIsolation, g = t.inert, _ = t.allowPinchZoom, v = t.as, y = v === void 0 ? "div" : v, b = t.gapMode, x = Qr(t, [
		"forwardProps",
		"children",
		"className",
		"removeScrollBar",
		"enabled",
		"shards",
		"sideCar",
		"noRelative",
		"noIsolation",
		"inert",
		"allowPinchZoom",
		"as",
		"gapMode"
	]), S = p, C = ci([r, n]), w = Zr(Zr({}, x), a);
	return e.createElement(e.Fragment, null, d && e.createElement(S, {
		sideCar: mi,
		removeScrollBar: u,
		shards: f,
		noRelative: m,
		noIsolation: h,
		inert: g,
		setCallbacks: o,
		allowPinchZoom: !!_,
		lockRef: r,
		gapMode: b
	}), s ? e.cloneElement(e.Children.only(c), Zr(Zr({}, w), { ref: C })) : e.createElement(y, Zr({}, w, {
		className: l,
		ref: C
	}), c));
});
gi.defaultProps = {
	enabled: !0,
	removeScrollBar: !0,
	inert: !1
}, gi.classNames = {
	fullWidth: ti,
	zeroRight: ei
};
//#endregion
//#region node_modules/.pnpm/get-nonce@1.0.1/node_modules/get-nonce/dist/es2015/index.js
var _i, vi = function() {
	if (_i) return _i;
	if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
//#endregion
//#region node_modules/.pnpm/react-style-singleton@2.2.3_@types+react@19.2.14_react@19.2.6/node_modules/react-style-singleton/dist/es2015/singleton.js
function yi() {
	if (!document) return null;
	var e = document.createElement("style");
	e.type = "text/css";
	var t = vi();
	return t && e.setAttribute("nonce", t), e;
}
function bi(e, t) {
	e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function xi(e) {
	(document.head || document.getElementsByTagName("head")[0]).appendChild(e);
}
var Si = function() {
	var e = 0, t = null;
	return {
		add: function(n) {
			e == 0 && (t = yi()) && (bi(t, n), xi(t)), e++;
		},
		remove: function() {
			e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
		}
	};
}, Ci = function() {
	var t = Si();
	return function(n, r) {
		e.useEffect(function() {
			return t.add(n), function() {
				t.remove();
			};
		}, [n && r]);
	};
}, wi = function() {
	var e = Ci();
	return function(t) {
		var n = t.styles, r = t.dynamic;
		return e(n, r), null;
	};
}, Ti = {
	left: 0,
	top: 0,
	right: 0,
	gap: 0
}, Ei = function(e) {
	return parseInt(e || "", 10) || 0;
}, Di = function(e) {
	var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], i = t[e === "padding" ? "paddingRight" : "marginRight"];
	return [
		Ei(n),
		Ei(r),
		Ei(i)
	];
}, Oi = function(e) {
	if (e === void 0 && (e = "margin"), typeof window > "u") return Ti;
	var t = Di(e), n = document.documentElement.clientWidth, r = window.innerWidth;
	return {
		left: t[0],
		top: t[1],
		right: t[2],
		gap: Math.max(0, r - n + t[2] - t[0])
	};
}, ki = wi(), Ai = "data-scroll-locked", ji = function(e, t, n, r) {
	var i = e.left, a = e.top, o = e.right, s = e.gap;
	return n === void 0 && (n = "margin"), `
  .${ni} {
   overflow: hidden ${r};
   padding-right: ${s}px ${r};
  }
  body[${Ai}] {
    overflow: hidden ${r};
    overscroll-behavior: contain;
    ${[
		t && `position: relative ${r};`,
		n === "margin" && `
    padding-left: ${i}px;
    padding-top: ${a}px;
    padding-right: ${o}px;
    margin-left:0;
    margin-top:0;
    margin-right: ${s}px ${r};
    `,
		n === "padding" && `padding-right: ${s}px ${r};`
	].filter(Boolean).join("")}
  }
  
  .${ei} {
    right: ${s}px ${r};
  }
  
  .${ti} {
    margin-right: ${s}px ${r};
  }
  
  .${ei} .${ei} {
    right: 0 ${r};
  }
  
  .${ti} .${ti} {
    margin-right: 0 ${r};
  }
  
  body[${Ai}] {
    ${ri}: ${s}px;
  }
`;
}, Mi = function() {
	var e = parseInt(document.body.getAttribute("data-scroll-locked") || "0", 10);
	return isFinite(e) ? e : 0;
}, Ni = function() {
	e.useEffect(function() {
		return document.body.setAttribute(Ai, (Mi() + 1).toString()), function() {
			var e = Mi() - 1;
			e <= 0 ? document.body.removeAttribute(Ai) : document.body.setAttribute(Ai, e.toString());
		};
	}, []);
}, Pi = function(t) {
	var n = t.noRelative, r = t.noImportant, i = t.gapMode, a = i === void 0 ? "margin" : i;
	Ni();
	var o = e.useMemo(function() {
		return Oi(a);
	}, [a]);
	return e.createElement(ki, { styles: ji(o, !n, a, r ? "" : "!important") });
}, Fi = !1;
if (typeof window < "u") try {
	var Ii = Object.defineProperty({}, "passive", { get: function() {
		return Fi = !0, !0;
	} });
	window.addEventListener("test", Ii, Ii), window.removeEventListener("test", Ii, Ii);
} catch {
	Fi = !1;
}
var Li = Fi ? { passive: !1 } : !1, Ri = function(e) {
	return e.tagName === "TEXTAREA";
}, zi = function(e, t) {
	if (!(e instanceof Element)) return !1;
	var n = window.getComputedStyle(e);
	return n[t] !== "hidden" && !(n.overflowY === n.overflowX && !Ri(e) && n[t] === "visible");
}, Bi = function(e) {
	return zi(e, "overflowY");
}, Vi = function(e) {
	return zi(e, "overflowX");
}, Hi = function(e, t) {
	var n = t.ownerDocument, r = t;
	do {
		if (typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host), Gi(e, r)) {
			var i = Ki(e, r);
			if (i[1] > i[2]) return !0;
		}
		r = r.parentNode;
	} while (r && r !== n.body);
	return !1;
}, Ui = function(e) {
	return [
		e.scrollTop,
		e.scrollHeight,
		e.clientHeight
	];
}, Wi = function(e) {
	return [
		e.scrollLeft,
		e.scrollWidth,
		e.clientWidth
	];
}, Gi = function(e, t) {
	return e === "v" ? Bi(t) : Vi(t);
}, Ki = function(e, t) {
	return e === "v" ? Ui(t) : Wi(t);
}, qi = function(e, t) {
	return e === "h" && t === "rtl" ? -1 : 1;
}, Ji = function(e, t, n, r, i) {
	var a = qi(e, window.getComputedStyle(t).direction), o = a * r, s = n.target, c = t.contains(s), l = !1, u = o > 0, d = 0, f = 0;
	do {
		if (!s) break;
		var p = Ki(e, s), m = p[0], h = p[1] - p[2] - a * m;
		(m || h) && Gi(e, s) && (d += h, f += m);
		var g = s.parentNode;
		s = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g;
	} while (!c && s !== document.body || c && (t.contains(s) || t === s));
	return (u && (i && Math.abs(d) < 1 || !i && o > d) || !u && (i && Math.abs(f) < 1 || !i && -o > f)) && (l = !0), l;
}, Yi = function(e) {
	return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, Xi = function(e) {
	return [e.deltaX, e.deltaY];
}, Zi = function(e) {
	return e && "current" in e ? e.current : e;
}, Qi = function(e, t) {
	return e[0] === t[0] && e[1] === t[1];
}, $i = function(e) {
	return `
  .block-interactivity-${e} {pointer-events: none;}
  .allow-interactivity-${e} {pointer-events: all;}
`;
}, ea = 0, ta = [];
function na(t) {
	var n = e.useRef([]), r = e.useRef([0, 0]), i = e.useRef(), a = e.useState(ea++)[0], o = e.useState(wi)[0], s = e.useRef(t);
	e.useEffect(function() {
		s.current = t;
	}, [t]), e.useEffect(function() {
		if (t.inert) {
			document.body.classList.add(`block-interactivity-${a}`);
			var e = $r([t.lockRef.current], (t.shards || []).map(Zi), !0).filter(Boolean);
			return e.forEach(function(e) {
				return e.classList.add(`allow-interactivity-${a}`);
			}), function() {
				document.body.classList.remove(`block-interactivity-${a}`), e.forEach(function(e) {
					return e.classList.remove(`allow-interactivity-${a}`);
				});
			};
		}
	}, [
		t.inert,
		t.lockRef.current,
		t.shards
	]);
	var c = e.useCallback(function(e, t) {
		if ("touches" in e && e.touches.length === 2 || e.type === "wheel" && e.ctrlKey) return !s.current.allowPinchZoom;
		var n = Yi(e), a = r.current, o = "deltaX" in e ? e.deltaX : a[0] - n[0], c = "deltaY" in e ? e.deltaY : a[1] - n[1], l, u = e.target, d = Math.abs(o) > Math.abs(c) ? "h" : "v";
		if ("touches" in e && d === "h" && u.type === "range") return !1;
		var f = window.getSelection(), p = f && f.anchorNode;
		if (p && (p === u || p.contains(u))) return !1;
		var m = Hi(d, u);
		if (!m) return !0;
		if (m ? l = d : (l = d === "v" ? "h" : "v", m = Hi(d, u)), !m) return !1;
		if (!i.current && "changedTouches" in e && (o || c) && (i.current = l), !l) return !0;
		var h = i.current || l;
		return Ji(h, t, e, h === "h" ? o : c, !0);
	}, []), l = e.useCallback(function(e) {
		var t = e;
		if (!(!ta.length || ta[ta.length - 1] !== o)) {
			var r = "deltaY" in t ? Xi(t) : Yi(t), i = n.current.filter(function(e) {
				return e.name === t.type && (e.target === t.target || t.target === e.shadowParent) && Qi(e.delta, r);
			})[0];
			if (i && i.should) {
				t.cancelable && t.preventDefault();
				return;
			}
			if (!i) {
				var a = (s.current.shards || []).map(Zi).filter(Boolean).filter(function(e) {
					return e.contains(t.target);
				});
				(a.length > 0 ? c(t, a[0]) : !s.current.noIsolation) && t.cancelable && t.preventDefault();
			}
		}
	}, []), u = e.useCallback(function(e, t, r, i) {
		var a = {
			name: e,
			delta: t,
			target: r,
			should: i,
			shadowParent: ra(r)
		};
		n.current.push(a), setTimeout(function() {
			n.current = n.current.filter(function(e) {
				return e !== a;
			});
		}, 1);
	}, []), d = e.useCallback(function(e) {
		r.current = Yi(e), i.current = void 0;
	}, []), f = e.useCallback(function(e) {
		u(e.type, Xi(e), e.target, c(e, t.lockRef.current));
	}, []), p = e.useCallback(function(e) {
		u(e.type, Yi(e), e.target, c(e, t.lockRef.current));
	}, []);
	e.useEffect(function() {
		return ta.push(o), t.setCallbacks({
			onScrollCapture: f,
			onWheelCapture: f,
			onTouchMoveCapture: p
		}), document.addEventListener("wheel", l, Li), document.addEventListener("touchmove", l, Li), document.addEventListener("touchstart", d, Li), function() {
			ta = ta.filter(function(e) {
				return e !== o;
			}), document.removeEventListener("wheel", l, Li), document.removeEventListener("touchmove", l, Li), document.removeEventListener("touchstart", d, Li);
		};
	}, []);
	var m = t.removeScrollBar, h = t.inert;
	return e.createElement(e.Fragment, null, h ? e.createElement(o, { styles: $i(a) }) : null, m ? e.createElement(Pi, {
		noRelative: t.noRelative,
		gapMode: t.gapMode
	}) : null);
}
function ra(e) {
	for (var t = null; e !== null;) e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
	return t;
}
//#endregion
//#region node_modules/.pnpm/react-remove-scroll@2.7.2_@types+react@19.2.14_react@19.2.6/node_modules/react-remove-scroll/dist/es2015/sidecar.js
var ia = pi(mi, na), aa = e.forwardRef(function(t, n) {
	return e.createElement(gi, Zr({}, t, {
		ref: n,
		sideCar: ia
	}));
});
aa.classNames = gi.classNames;
//#endregion
//#region node_modules/.pnpm/aria-hidden@1.2.6/node_modules/aria-hidden/dist/es2015/index.js
var oa = function(e) {
	return typeof document > "u" ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
}, sa = /* @__PURE__ */ new WeakMap(), ca = /* @__PURE__ */ new WeakMap(), la = {}, ua = 0, da = function(e) {
	return e && (e.host || da(e.parentNode));
}, fa = function(e, t) {
	return t.map(function(t) {
		if (e.contains(t)) return t;
		var n = da(t);
		return n && e.contains(n) ? n : (console.error("aria-hidden", t, "in not contained inside", e, ". Doing nothing"), null);
	}).filter(function(e) {
		return !!e;
	});
}, pa = function(e, t, n, r) {
	var i = fa(t, Array.isArray(e) ? e : [e]);
	la[n] || (la[n] = /* @__PURE__ */ new WeakMap());
	var a = la[n], o = [], s = /* @__PURE__ */ new Set(), c = new Set(i), l = function(e) {
		!e || s.has(e) || (s.add(e), l(e.parentNode));
	};
	i.forEach(l);
	var u = function(e) {
		!e || c.has(e) || Array.prototype.forEach.call(e.children, function(e) {
			if (s.has(e)) u(e);
			else try {
				var t = e.getAttribute(r), i = t !== null && t !== "false", c = (sa.get(e) || 0) + 1, l = (a.get(e) || 0) + 1;
				sa.set(e, c), a.set(e, l), o.push(e), c === 1 && i && ca.set(e, !0), l === 1 && e.setAttribute(n, "true"), i || e.setAttribute(r, "true");
			} catch (t) {
				console.error("aria-hidden: cannot operate on ", e, t);
			}
		});
	};
	return u(t), s.clear(), ua++, function() {
		o.forEach(function(e) {
			var t = sa.get(e) - 1, i = a.get(e) - 1;
			sa.set(e, t), a.set(e, i), t || (ca.has(e) || e.removeAttribute(r), ca.delete(e)), i || e.removeAttribute(n);
		}), ua--, ua || (sa = /* @__PURE__ */ new WeakMap(), sa = /* @__PURE__ */ new WeakMap(), ca = /* @__PURE__ */ new WeakMap(), la = {});
	};
}, ma = function(e, t, n) {
	n === void 0 && (n = "data-aria-hidden");
	var r = Array.from(Array.isArray(e) ? e : [e]), i = t || oa(e);
	return i ? (r.push.apply(r, Array.from(i.querySelectorAll("[aria-live], script"))), pa(r, i, n, "aria-hidden")) : function() {
		return null;
	};
}, ha = "Dialog", [ga, _a] = en(ha), [va, ya] = ga(ha), ba = (t) => {
	let { __scopeDialog: n, children: r, open: i, defaultOpen: a, onOpenChange: o, modal: s = !0 } = t, c = e.useRef(null), l = e.useRef(null), [u, d] = on({
		prop: i,
		defaultProp: a ?? !1,
		onChange: o,
		caller: ha
	});
	return /* @__PURE__ */ h(va, {
		scope: n,
		triggerRef: c,
		contentRef: l,
		contentId: gn(),
		titleId: gn(),
		descriptionId: gn(),
		open: u,
		onOpenChange: d,
		onOpenToggle: e.useCallback(() => d((e) => !e), [d]),
		modal: s,
		children: r
	});
};
ba.displayName = ha;
var xa = "DialogTrigger", Sa = e.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = ya(xa, n), a = q(t, i.triggerRef);
	return /* @__PURE__ */ h(J.button, {
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": i.open,
		"aria-controls": i.contentId,
		"data-state": Ha(i.open),
		...r,
		ref: a,
		onClick: Y(e.onClick, i.onOpenToggle)
	});
});
Sa.displayName = xa;
var Ca = "DialogPortal", [wa, Ta] = ga(Ca, { forceMount: void 0 }), Ea = (t) => {
	let { __scopeDialog: n, forceMount: r, children: i, container: a } = t, o = ya(Ca, n);
	return /* @__PURE__ */ h(wa, {
		scope: n,
		forceMount: r,
		children: e.Children.map(i, (e) => /* @__PURE__ */ h(un, {
			present: r || o.open,
			children: /* @__PURE__ */ h(qr, {
				asChild: !0,
				container: a,
				children: e
			})
		}))
	});
};
Ea.displayName = Ca;
var Da = "DialogOverlay", Oa = e.forwardRef((e, t) => {
	let n = Ta(Da, e.__scopeDialog), { forceMount: r = n.forceMount, ...i } = e, a = ya(Da, e.__scopeDialog);
	return a.modal ? /* @__PURE__ */ h(un, {
		present: r || a.open,
		children: /* @__PURE__ */ h(Aa, {
			...i,
			ref: t
		})
	}) : null;
});
Oa.displayName = Da;
var ka = /* @__PURE__ */ Bt("DialogOverlay.RemoveScroll"), Aa = e.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = ya(Da, n);
	return /* @__PURE__ */ h(aa, {
		as: ka,
		allowPinchZoom: !0,
		shards: [i.contentRef],
		children: /* @__PURE__ */ h(J.div, {
			"data-state": Ha(i.open),
			...r,
			ref: t,
			style: {
				pointerEvents: "auto",
				...r.style
			}
		})
	});
}), ja = "DialogContent", Ma = e.forwardRef((e, t) => {
	let n = Ta(ja, e.__scopeDialog), { forceMount: r = n.forceMount, ...i } = e, a = ya(ja, e.__scopeDialog);
	return /* @__PURE__ */ h(un, {
		present: r || a.open,
		children: a.modal ? /* @__PURE__ */ h(Na, {
			...i,
			ref: t
		}) : /* @__PURE__ */ h(Pa, {
			...i,
			ref: t
		})
	});
});
Ma.displayName = ja;
var Na = e.forwardRef((t, n) => {
	let r = ya(ja, t.__scopeDialog), i = e.useRef(null), a = q(n, r.contentRef, i);
	return e.useEffect(() => {
		let e = i.current;
		if (e) return ma(e);
	}, []), /* @__PURE__ */ h(Fa, {
		...t,
		ref: a,
		trapFocus: r.open,
		disableOutsidePointerEvents: !0,
		onCloseAutoFocus: Y(t.onCloseAutoFocus, (e) => {
			e.preventDefault(), r.triggerRef.current?.focus();
		}),
		onPointerDownOutside: Y(t.onPointerDownOutside, (e) => {
			let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0;
			(t.button === 2 || n) && e.preventDefault();
		}),
		onFocusOutside: Y(t.onFocusOutside, (e) => e.preventDefault())
	});
}), Pa = e.forwardRef((t, n) => {
	let r = ya(ja, t.__scopeDialog), i = e.useRef(!1), a = e.useRef(!1);
	return /* @__PURE__ */ h(Fa, {
		...t,
		ref: n,
		trapFocus: !1,
		disableOutsidePointerEvents: !1,
		onCloseAutoFocus: (e) => {
			t.onCloseAutoFocus?.(e), e.defaultPrevented || (i.current || r.triggerRef.current?.focus(), e.preventDefault()), i.current = !1, a.current = !1;
		},
		onInteractOutside: (e) => {
			t.onInteractOutside?.(e), e.defaultPrevented || (i.current = !0, e.detail.originalEvent.type === "pointerdown" && (a.current = !0));
			let n = e.target;
			r.triggerRef.current?.contains(n) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && a.current && e.preventDefault();
		}
	});
}), Fa = e.forwardRef((t, n) => {
	let { __scopeDialog: r, trapFocus: i, onOpenAutoFocus: a, onCloseAutoFocus: o, ...s } = t, c = ya(ja, r), l = e.useRef(null), u = q(n, l);
	return Yr(), /* @__PURE__ */ g(m, { children: [/* @__PURE__ */ h(Pr, {
		asChild: !0,
		loop: !0,
		trapped: i,
		onMountAutoFocus: a,
		onUnmountAutoFocus: o,
		children: /* @__PURE__ */ h(xr, {
			role: "dialog",
			id: c.contentId,
			"aria-describedby": c.descriptionId,
			"aria-labelledby": c.titleId,
			"data-state": Ha(c.open),
			...s,
			ref: u,
			onDismiss: () => c.onOpenChange(!1)
		})
	}), /* @__PURE__ */ g(m, { children: [/* @__PURE__ */ h(Ka, { titleId: c.titleId }), /* @__PURE__ */ h(Ja, {
		contentRef: l,
		descriptionId: c.descriptionId
	})] })] });
}), Ia = "DialogTitle", La = e.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = ya(Ia, n);
	return /* @__PURE__ */ h(J.h2, {
		id: i.titleId,
		...r,
		ref: t
	});
});
La.displayName = Ia;
var Ra = "DialogDescription", za = e.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = ya(Ra, n);
	return /* @__PURE__ */ h(J.p, {
		id: i.descriptionId,
		...r,
		ref: t
	});
});
za.displayName = Ra;
var Ba = "DialogClose", Va = e.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = ya(Ba, n);
	return /* @__PURE__ */ h(J.button, {
		type: "button",
		...r,
		ref: t,
		onClick: Y(e.onClick, () => i.onOpenChange(!1))
	});
});
Va.displayName = Ba;
function Ha(e) {
	return e ? "open" : "closed";
}
var Ua = "DialogTitleWarning", [Wa, Ga] = $t(Ua, {
	contentName: ja,
	titleName: Ia,
	docsSlug: "dialog"
}), Ka = ({ titleId: t }) => {
	let n = Ga(Ua), r = `\`${n.contentName}\` requires a \`${n.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${n.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${n.docsSlug}`;
	return e.useEffect(() => {
		t && (document.getElementById(t) || console.error(r));
	}, [r, t]), null;
}, qa = "DialogDescriptionWarning", Ja = ({ contentRef: t, descriptionId: n }) => {
	let r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Ga(qa).contentName}}.`;
	return e.useEffect(() => {
		let e = t.current?.getAttribute("aria-describedby");
		n && e && (document.getElementById(n) || console.warn(r));
	}, [
		r,
		t,
		n
	]), null;
}, Ya = ba, Xa = Sa, Za = Ea, Qa = Oa, $a = Ma, eo = La, to = za, no = Va, ro = /* @__PURE__ */ v(((e) => {
	var t = b("react");
	function n(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var r = typeof Object.is == "function" ? Object.is : n, i = t.useState, a = t.useEffect, o = t.useLayoutEffect, s = t.useDebugValue;
	function c(e, t) {
		var n = t(), r = i({ inst: {
			value: n,
			getSnapshot: t
		} }), c = r[0].inst, u = r[1];
		return o(function() {
			c.value = n, c.getSnapshot = t, l(c) && u({ inst: c });
		}, [
			e,
			n,
			t
		]), a(function() {
			return l(c) && u({ inst: c }), e(function() {
				l(c) && u({ inst: c });
			});
		}, [e]), s(n), n;
	}
	function l(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !r(e, n);
		} catch {
			return !0;
		}
	}
	function u(e, t) {
		return t();
	}
	var d = typeof window > "u" || window.document === void 0 || window.document.createElement === void 0 ? u : c;
	e.useSyncExternalStore = t.useSyncExternalStore === void 0 ? d : t.useSyncExternalStore;
})), io = /* @__PURE__ */ v(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e, t) {
			return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
		}
		function n(e, t) {
			d || a.startTransition === void 0 || (d = !0, console.error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
			var n = t();
			if (!f) {
				var i = t();
				o(n, i) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), f = !0);
			}
			i = s({ inst: {
				value: n,
				getSnapshot: t
			} });
			var p = i[0].inst, m = i[1];
			return l(function() {
				p.value = n, p.getSnapshot = t, r(p) && m({ inst: p });
			}, [
				e,
				n,
				t
			]), c(function() {
				return r(p) && m({ inst: p }), e(function() {
					r(p) && m({ inst: p });
				});
			}, [e]), u(n), n;
		}
		function r(e) {
			var t = e.getSnapshot;
			e = e.value;
			try {
				var n = t();
				return !o(e, n);
			} catch {
				return !0;
			}
		}
		function i(e, t) {
			return t();
		}
		typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
		var a = b("react"), o = typeof Object.is == "function" ? Object.is : t, s = a.useState, c = a.useEffect, l = a.useLayoutEffect, u = a.useDebugValue, d = !1, f = !1, p = typeof window > "u" || window.document === void 0 || window.document.createElement === void 0 ? i : n;
		e.useSyncExternalStore = a.useSyncExternalStore === void 0 ? p : a.useSyncExternalStore, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
	})();
})), ao = (/* @__PURE__ */ v(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = ro() : t.exports = io();
})))();
function oo() {
	return (0, ao.useSyncExternalStore)(so, () => !0, () => !1);
}
function so() {
	return () => {};
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-avatar@1.1.10_@types+react-dom@19.2.3_@types+react@19.2.14__@types+reac_0ea80bc1497a6ecfd0bb5e124b1154c7/node_modules/@radix-ui/react-avatar/dist/index.mjs
var co = "Avatar", [lo, uo] = en(co), [fo, po] = lo(co), mo = e.forwardRef((t, n) => {
	let { __scopeAvatar: r, ...i } = t, [a, o] = e.useState("idle");
	return /* @__PURE__ */ h(fo, {
		scope: r,
		imageLoadingStatus: a,
		onImageLoadingStatusChange: o,
		children: /* @__PURE__ */ h(J.span, {
			...i,
			ref: n
		})
	});
});
mo.displayName = co;
var ho = "AvatarImage", go = e.forwardRef((e, t) => {
	let { __scopeAvatar: n, src: r, onLoadingStatusChange: i = () => {}, ...a } = e, o = po(ho, n), s = bo(r, a), c = X((e) => {
		i(e), o.onImageLoadingStatusChange(e);
	});
	return rn(() => {
		s !== "idle" && c(s);
	}, [s, c]), s === "loaded" ? /* @__PURE__ */ h(J.img, {
		...a,
		ref: t,
		src: r
	}) : null;
});
go.displayName = ho;
var _o = "AvatarFallback", vo = e.forwardRef((t, n) => {
	let { __scopeAvatar: r, delayMs: i, ...a } = t, o = po(_o, r), [s, c] = e.useState(i === void 0);
	return e.useEffect(() => {
		if (i !== void 0) {
			let e = window.setTimeout(() => c(!0), i);
			return () => window.clearTimeout(e);
		}
	}, [i]), s && o.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ h(J.span, {
		...a,
		ref: n
	}) : null;
});
vo.displayName = _o;
function yo(e, t) {
	return e ? t ? (e.src !== t && (e.src = t), e.complete && e.naturalWidth > 0 ? "loaded" : "loading") : "error" : "idle";
}
function bo(t, { referrerPolicy: n, crossOrigin: r }) {
	let i = oo(), a = e.useRef(null), o = i ? (a.current ||= new window.Image(), a.current) : null, [s, c] = e.useState(() => yo(o, t));
	return rn(() => {
		c(yo(o, t));
	}, [o, t]), rn(() => {
		let e = (e) => () => {
			c(e);
		};
		if (!o) return;
		let t = e("loaded"), i = e("error");
		return o.addEventListener("load", t), o.addEventListener("error", i), n && (o.referrerPolicy = n), typeof r == "string" && (o.crossOrigin = r), () => {
			o.removeEventListener("load", t), o.removeEventListener("error", i);
		};
	}, [
		o,
		r,
		n
	]), s;
}
var xo = mo, So = go, Co = vo;
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-use-previous@1.1.1_@types+react@19.2.14_react@19.2.6/node_modules/@radix-ui/react-use-previous/dist/index.mjs
function wo(t) {
	let n = e.useRef({
		value: t,
		previous: t
	});
	return e.useMemo(() => (n.current.value !== t && (n.current.previous = n.current.value, n.current.value = t), n.current.previous), [t]);
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-use-size@1.1.1_@types+react@19.2.14_react@19.2.6/node_modules/@radix-ui/react-use-size/dist/index.mjs
function To(t) {
	let [n, r] = e.useState(void 0);
	return rn(() => {
		if (t) {
			r({
				width: t.offsetWidth,
				height: t.offsetHeight
			});
			let e = new ResizeObserver((e) => {
				if (!Array.isArray(e) || !e.length) return;
				let n = e[0], i, a;
				if ("borderBoxSize" in n) {
					let e = n.borderBoxSize, t = Array.isArray(e) ? e[0] : e;
					i = t.inlineSize, a = t.blockSize;
				} else i = t.offsetWidth, a = t.offsetHeight;
				r({
					width: i,
					height: a
				});
			});
			return e.observe(t, { box: "border-box" }), () => e.unobserve(t);
		} else r(void 0);
	}, [t]), n;
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-checkbox@1.3.3_@types+react-dom@19.2.3_@types+react@19.2.14__@types+rea_36946c77eec45f5a9fc04b1442c78a6c/node_modules/@radix-ui/react-checkbox/dist/index.mjs
var Eo = "Checkbox", [Do, Oo] = en(Eo), [ko, Ao] = Do(Eo);
function jo(t) {
	let { __scopeCheckbox: n, checked: r, children: i, defaultChecked: a, disabled: o, form: s, name: c, onCheckedChange: l, required: u, value: d = "on", internal_do_not_use_render: f } = t, [p, m] = on({
		prop: r,
		defaultProp: a ?? !1,
		onChange: l,
		caller: Eo
	}), [g, _] = e.useState(null), [v, y] = e.useState(null), b = e.useRef(!1), x = g ? !!s || !!g.closest("form") : !0, S = {
		checked: p,
		disabled: o,
		setChecked: m,
		control: g,
		setControl: _,
		name: c,
		form: s,
		value: d,
		hasConsumerStoppedPropagationRef: b,
		required: u,
		defaultChecked: Bo(a) ? !1 : a,
		isFormControl: x,
		bubbleInput: v,
		setBubbleInput: y
	};
	return /* @__PURE__ */ h(ko, {
		scope: n,
		...S,
		children: zo(f) ? f(S) : i
	});
}
var Mo = "CheckboxTrigger", No = e.forwardRef(({ __scopeCheckbox: t, onKeyDown: n, onClick: r, ...i }, a) => {
	let { control: o, value: s, disabled: c, checked: l, required: u, setControl: d, setChecked: f, hasConsumerStoppedPropagationRef: p, isFormControl: m, bubbleInput: g } = Ao(Mo, t), _ = q(a, d), v = e.useRef(l);
	return e.useEffect(() => {
		let e = o?.form;
		if (e) {
			let t = () => f(v.current);
			return e.addEventListener("reset", t), () => e.removeEventListener("reset", t);
		}
	}, [o, f]), /* @__PURE__ */ h(J.button, {
		type: "button",
		role: "checkbox",
		"aria-checked": Bo(l) ? "mixed" : l,
		"aria-required": u,
		"data-state": Vo(l),
		"data-disabled": c ? "" : void 0,
		disabled: c,
		value: s,
		...i,
		ref: _,
		onKeyDown: Y(n, (e) => {
			e.key === "Enter" && e.preventDefault();
		}),
		onClick: Y(r, (e) => {
			f((e) => Bo(e) ? !0 : !e), g && m && (p.current = e.isPropagationStopped(), p.current || e.stopPropagation());
		})
	});
});
No.displayName = Mo;
var Po = e.forwardRef((e, t) => {
	let { __scopeCheckbox: n, name: r, checked: i, defaultChecked: a, required: o, disabled: s, value: c, onCheckedChange: l, form: u, ...d } = e;
	return /* @__PURE__ */ h(jo, {
		__scopeCheckbox: n,
		checked: i,
		defaultChecked: a,
		disabled: s,
		required: o,
		onCheckedChange: l,
		name: r,
		form: u,
		value: c,
		internal_do_not_use_render: ({ isFormControl: e }) => /* @__PURE__ */ g(m, { children: [/* @__PURE__ */ h(No, {
			...d,
			ref: t,
			__scopeCheckbox: n
		}), e && /* @__PURE__ */ h(Ro, { __scopeCheckbox: n })] })
	});
});
Po.displayName = Eo;
var Fo = "CheckboxIndicator", Io = e.forwardRef((e, t) => {
	let { __scopeCheckbox: n, forceMount: r, ...i } = e, a = Ao(Fo, n);
	return /* @__PURE__ */ h(un, {
		present: r || Bo(a.checked) || a.checked === !0,
		children: /* @__PURE__ */ h(J.span, {
			"data-state": Vo(a.checked),
			"data-disabled": a.disabled ? "" : void 0,
			...i,
			ref: t,
			style: {
				pointerEvents: "none",
				...e.style
			}
		})
	});
});
Io.displayName = Fo;
var Lo = "CheckboxBubbleInput", Ro = e.forwardRef(({ __scopeCheckbox: t, ...n }, r) => {
	let { control: i, hasConsumerStoppedPropagationRef: a, checked: o, defaultChecked: s, required: c, disabled: l, name: u, value: d, form: f, bubbleInput: p, setBubbleInput: m } = Ao(Lo, t), g = q(r, m), _ = wo(o), v = To(i);
	e.useEffect(() => {
		let e = p;
		if (!e) return;
		let t = window.HTMLInputElement.prototype, n = Object.getOwnPropertyDescriptor(t, "checked").set, r = !a.current;
		if (_ !== o && n) {
			let t = new Event("click", { bubbles: r });
			e.indeterminate = Bo(o), n.call(e, Bo(o) ? !1 : o), e.dispatchEvent(t);
		}
	}, [
		p,
		_,
		o,
		a
	]);
	let y = e.useRef(Bo(o) ? !1 : o);
	return /* @__PURE__ */ h(J.input, {
		type: "checkbox",
		"aria-hidden": !0,
		defaultChecked: s ?? y.current,
		required: c,
		disabled: l,
		name: u,
		value: d,
		form: f,
		...n,
		tabIndex: -1,
		ref: g,
		style: {
			...n.style,
			...v,
			position: "absolute",
			pointerEvents: "none",
			opacity: 0,
			margin: 0,
			transform: "translateX(-100%)"
		}
	});
});
Ro.displayName = Lo;
function zo(e) {
	return typeof e == "function";
}
function Bo(e) {
	return e === "indeterminate";
}
function Vo(e) {
	return Bo(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
//#endregion
//#region node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var Ho = [
	"top",
	"right",
	"bottom",
	"left"
], Uo = Math.min, Wo = Math.max, Go = Math.round, Ko = Math.floor, qo = (e) => ({
	x: e,
	y: e
}), Jo = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function Yo(e, t, n) {
	return Wo(e, Uo(t, n));
}
function Xo(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function Zo(e) {
	return e.split("-")[0];
}
function Qo(e) {
	return e.split("-")[1];
}
function $o(e) {
	return e === "x" ? "y" : "x";
}
function es(e) {
	return e === "y" ? "height" : "width";
}
function ts(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function ns(e) {
	return $o(ts(e));
}
function rs(e, t, n) {
	n === void 0 && (n = !1);
	let r = Qo(e), i = ns(e), a = es(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = fs(o)), [o, fs(o)];
}
function is(e) {
	let t = fs(e);
	return [
		as(e),
		t,
		as(t)
	];
}
function as(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var os = ["left", "right"], ss = ["right", "left"], cs = ["top", "bottom"], ls = ["bottom", "top"];
function us(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? ss : os : t ? os : ss;
		case "left":
		case "right": return t ? cs : ls;
		default: return [];
	}
}
function ds(e, t, n, r) {
	let i = Qo(e), a = us(Zo(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(as)))), a;
}
function fs(e) {
	let t = Zo(e);
	return Jo[t] + e.slice(t.length);
}
function ps(e) {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...e
	};
}
function ms(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : ps(e);
}
function hs(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
//#endregion
//#region node_modules/.pnpm/@floating-ui+core@1.7.5/node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function gs(e, t, n) {
	let { reference: r, floating: i } = e, a = ts(t), o = ns(t), s = es(o), c = Zo(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	switch (Qo(t)) {
		case "start":
			p[o] -= f * (n && l ? -1 : 1);
			break;
		case "end":
			p[o] += f * (n && l ? -1 : 1);
			break;
	}
	return p;
}
async function _s(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = Xo(t, e), p = ms(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = hs(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = hs(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
var vs = 50, ys = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: _s
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = gs(l, r, c), f = r, p = 0, m = {};
	for (let n = 0; n < a.length; n++) {
		let h = a[n];
		if (!h) continue;
		let { name: g, fn: _ } = h, { x: v, y, data: b, reset: x } = await _({
			x: u,
			y: d,
			initialPlacement: r,
			placement: f,
			strategy: i,
			middlewareData: m,
			rects: l,
			platform: s,
			elements: {
				reference: e,
				floating: t
			}
		});
		u = v ?? u, d = y ?? d, m[g] = {
			...m[g],
			...b
		}, x && p < vs && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = gs(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, bs = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = Xo(e, t) || {};
		if (l == null) return {};
		let d = ms(u), f = {
			x: n,
			y: r
		}, p = ns(i), m = es(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		(!C || !await (o.isElement == null ? void 0 : o.isElement(S))) && (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = Uo(d[_], T), D = Uo(d[v], T), O = E, k = C - h[m] - D, A = C / 2 - h[m] / 2 + w, j = Yo(O, A, k), M = !c.arrow && Qo(i) != null && A !== j && a.reference[m] / 2 - (A < O ? E : D) - h[m] / 2 < 0, N = M ? A < O ? A - O : A - k : 0;
		return {
			[p]: f[p] + N,
			data: {
				[p]: j,
				centerOffset: A - j - N,
				...M && { alignmentOffset: N }
			},
			reset: M
		};
	}
}), xs = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = Xo(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = Zo(r), _ = ts(o), v = Zo(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [fs(o)] : is(o)), x = p !== "none";
			!d && x && b.push(...ds(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = rs(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (!(u === "alignment" && _ !== ts(t)) || T.every((e) => ts(e.placement) === _ ? e.overflows[0] > 0 : !0))) return {
					data: {
						index: e,
						overflows: T
					},
					reset: { placement: t }
				};
				let n = T.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (f) {
					case "bestFit": {
						let e = T.filter((e) => {
							if (x) {
								let t = ts(e.placement);
								return t === _ || t === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
						e && (n = e);
						break;
					}
					case "initialPlacement":
						n = o;
						break;
				}
				if (r !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
};
function Ss(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function Cs(e) {
	return Ho.some((t) => e[t] >= 0);
}
var ws = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = Xo(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = Ss(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: Cs(e)
					} };
				}
				case "escaped": {
					let e = Ss(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: Cs(e)
					} };
				}
				default: return {};
			}
		}
	};
}, Ts = /* @__PURE__ */ new Set(["left", "top"]);
async function Es(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = Zo(n), s = Qo(n), c = ts(n) === "y", l = Ts.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = Xo(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
		mainAxis: d,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: d.mainAxis || 0,
		crossAxis: d.crossAxis || 0,
		alignmentAxis: d.alignmentAxis
	};
	return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), c ? {
		x: p * u,
		y: f * l
	} : {
		x: f * l,
		y: p * u
	};
}
var Ds = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await Es(t, e);
			return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
				x: r + s.x,
				y: i + s.y,
				data: {
					...s,
					placement: a
				}
			};
		}
	};
}, Os = function(e) {
	return e === void 0 && (e = {}), {
		name: "shift",
		options: e,
		async fn(t) {
			let { x: n, y: r, placement: i, platform: a } = t, { mainAxis: o = !0, crossAxis: s = !1, limiter: c = { fn: (e) => {
				let { x: t, y: n } = e;
				return {
					x: t,
					y: n
				};
			} }, ...l } = Xo(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = ts(Zo(i)), p = $o(f), m = u[p], h = u[f];
			if (o) {
				let e = p === "y" ? "top" : "left", t = p === "y" ? "bottom" : "right", n = m + d[e], r = m - d[t];
				m = Yo(n, m, r);
			}
			if (s) {
				let e = f === "y" ? "top" : "left", t = f === "y" ? "bottom" : "right", n = h + d[e], r = h - d[t];
				h = Yo(n, h, r);
			}
			let g = c.fn({
				...t,
				[p]: m,
				[f]: h
			});
			return {
				...g,
				data: {
					x: g.x - n,
					y: g.y - r,
					enabled: {
						[p]: o,
						[f]: s
					}
				}
			};
		}
	};
}, ks = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = Xo(e, t), u = {
				x: n,
				y: r
			}, d = ts(i), f = $o(d), p = u[f], m = u[d], h = Xo(s, t), g = typeof h == "number" ? {
				mainAxis: h,
				crossAxis: 0
			} : {
				mainAxis: 0,
				crossAxis: 0,
				...h
			};
			if (c) {
				let e = f === "y" ? "height" : "width", t = a.reference[f] - a.floating[e] + g.mainAxis, n = a.reference[f] + a.reference[e] - g.mainAxis;
				p < t ? p = t : p > n && (p = n);
			}
			if (l) {
				let e = f === "y" ? "width" : "height", t = Ts.has(Zo(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, As = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			var n, r;
			let { placement: i, rects: a, platform: o, elements: s } = t, { apply: c = () => {}, ...l } = Xo(e, t), u = await o.detectOverflow(t, l), d = Zo(i), f = Qo(i), p = ts(i) === "y", { width: m, height: h } = a.floating, g, _;
			d === "top" || d === "bottom" ? (g = d, _ = f === (await (o.isRTL == null ? void 0 : o.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (_ = d, g = f === "end" ? "top" : "bottom");
			let v = h - u.top - u.bottom, y = m - u.left - u.right, b = Uo(h - u[g], v), x = Uo(m - u[_], y), S = !t.middlewareData.shift, C = b, w = x;
			if ((n = t.middlewareData.shift) != null && n.enabled.x && (w = y), (r = t.middlewareData.shift) != null && r.enabled.y && (C = v), S && !f) {
				let e = Wo(u.left, 0), t = Wo(u.right, 0), n = Wo(u.top, 0), r = Wo(u.bottom, 0);
				p ? w = m - 2 * (e !== 0 || t !== 0 ? e + t : Wo(u.left, u.right)) : C = h - 2 * (n !== 0 || r !== 0 ? n + r : Wo(u.top, u.bottom));
			}
			await c({
				...t,
				availableWidth: w,
				availableHeight: C
			});
			let T = await o.getDimensions(s.floating);
			return m !== T.width || h !== T.height ? { reset: { rects: !0 } } : {};
		}
	};
};
//#endregion
//#region node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function js() {
	return typeof window < "u";
}
function Ms(e) {
	return Fs(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Ns(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Ps(e) {
	return ((Fs(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function Fs(e) {
	return js() ? e instanceof Node || e instanceof Ns(e).Node : !1;
}
function Is(e) {
	return js() ? e instanceof Element || e instanceof Ns(e).Element : !1;
}
function Ls(e) {
	return js() ? e instanceof HTMLElement || e instanceof Ns(e).HTMLElement : !1;
}
function Rs(e) {
	return !js() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Ns(e).ShadowRoot;
}
function zs(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = Xs(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function Bs(e) {
	return /^(table|td|th)$/.test(Ms(e));
}
function Vs(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var Hs = /transform|translate|scale|rotate|perspective|filter/, Us = /paint|layout|strict|content/, Ws = (e) => !!e && e !== "none", Gs;
function Ks(e) {
	let t = Is(e) ? Xs(e) : e;
	return Ws(t.transform) || Ws(t.translate) || Ws(t.scale) || Ws(t.rotate) || Ws(t.perspective) || !Js() && (Ws(t.backdropFilter) || Ws(t.filter)) || Hs.test(t.willChange || "") || Us.test(t.contain || "");
}
function qs(e) {
	let t = Qs(e);
	for (; Ls(t) && !Ys(t);) {
		if (Ks(t)) return t;
		if (Vs(t)) return null;
		t = Qs(t);
	}
	return null;
}
function Js() {
	return Gs ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), Gs;
}
function Ys(e) {
	return /^(html|body|#document)$/.test(Ms(e));
}
function Xs(e) {
	return Ns(e).getComputedStyle(e);
}
function Zs(e) {
	return Is(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function Qs(e) {
	if (Ms(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || Rs(e) && e.host || Ps(e);
	return Rs(t) ? t.host : t;
}
function $s(e) {
	let t = Qs(e);
	return Ys(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Ls(t) && zs(t) ? t : $s(t);
}
function ec(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = $s(e), i = r === e.ownerDocument?.body, a = Ns(r);
	if (i) {
		let e = tc(a);
		return t.concat(a, a.visualViewport || [], zs(r) ? r : [], e && n ? ec(e) : []);
	} else return t.concat(r, ec(r, [], n));
}
function tc(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region node_modules/.pnpm/@floating-ui+dom@1.7.6/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function nc(e) {
	let t = Xs(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = Ls(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = Go(n) !== a || Go(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function rc(e) {
	return Is(e) ? e : e.contextElement;
}
function ic(e) {
	let t = rc(e);
	if (!Ls(t)) return qo(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = nc(t), o = (a ? Go(n.width) : n.width) / r, s = (a ? Go(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var ac = /* @__PURE__ */ qo(0);
function oc(e) {
	let t = Ns(e);
	return !Js() || !t.visualViewport ? ac : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function sc(e, t, n) {
	return t === void 0 && (t = !1), !n || t && n !== Ns(e) ? !1 : t;
}
function cc(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = rc(e), o = qo(1);
	t && (r ? Is(r) && (o = ic(r)) : o = ic(e));
	let s = sc(a, n, r) ? oc(a) : qo(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a) {
		let e = Ns(a), t = r && Is(r) ? Ns(r) : r, n = e, i = tc(n);
		for (; i && r && t !== n;) {
			let e = ic(i), t = i.getBoundingClientRect(), r = Xs(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = Ns(i), i = tc(n);
		}
	}
	return hs({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function lc(e, t) {
	let n = Zs(e).scrollLeft;
	return t ? t.left + n : cc(Ps(e)).left + n;
}
function uc(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - lc(e, n),
		y: n.top + t.scrollTop
	};
}
function dc(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = Ps(r), s = t ? Vs(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = qo(1), u = qo(0), d = Ls(r);
	if ((d || !d && !a) && ((Ms(r) !== "body" || zs(o)) && (c = Zs(r)), d)) {
		let e = cc(r);
		l = ic(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? uc(o, c) : qo(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function fc(e) {
	return Array.from(e.getClientRects());
}
function pc(e) {
	let t = Ps(e), n = Zs(e), r = e.ownerDocument.body, i = Wo(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = Wo(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight), o = -n.scrollLeft + lc(e), s = -n.scrollTop;
	return Xs(r).direction === "rtl" && (o += Wo(t.clientWidth, r.clientWidth) - i), {
		width: i,
		height: a,
		x: o,
		y: s
	};
}
var mc = 25;
function hc(e, t) {
	let n = Ns(e), r = Ps(e), i = n.visualViewport, a = r.clientWidth, o = r.clientHeight, s = 0, c = 0;
	if (i) {
		a = i.width, o = i.height;
		let e = Js();
		(!e || e && t === "fixed") && (s = i.offsetLeft, c = i.offsetTop);
	}
	let l = lc(r);
	if (l <= 0) {
		let e = r.ownerDocument, t = e.body, n = getComputedStyle(t), i = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, o = Math.abs(r.clientWidth - t.clientWidth - i);
		o <= mc && (a -= o);
	} else l <= mc && (a += l);
	return {
		width: a,
		height: o,
		x: s,
		y: c
	};
}
function gc(e, t) {
	let n = cc(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = Ls(e) ? ic(e) : qo(1);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function _c(e, t, n) {
	let r;
	if (t === "viewport") r = hc(e, n);
	else if (t === "document") r = pc(Ps(e));
	else if (Is(t)) r = gc(t, n);
	else {
		let n = oc(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return hs(r);
}
function vc(e, t) {
	let n = Qs(e);
	return n === t || !Is(n) || Ys(n) ? !1 : Xs(n).position === "fixed" || vc(n, t);
}
function yc(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = ec(e, [], !1).filter((e) => Is(e) && Ms(e) !== "body"), i = null, a = Xs(e).position === "fixed", o = a ? Qs(e) : e;
	for (; Is(o) && !Ys(o);) {
		let t = Xs(o), n = Ks(o);
		!n && t.position === "fixed" && (i = null), (a ? !n && !i : !n && t.position === "static" && i && (i.position === "absolute" || i.position === "fixed") || zs(o) && !n && vc(e, o)) ? r = r.filter((e) => e !== o) : i = t, o = Qs(o);
	}
	return t.set(e, r), r;
}
function bc(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? Vs(t) ? [] : yc(t, this._c) : [].concat(n), r], o = _c(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = _c(t, a[e], i);
		s = Wo(n.top, s), c = Uo(n.right, c), l = Uo(n.bottom, l), u = Wo(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function xc(e) {
	let { width: t, height: n } = nc(e);
	return {
		width: t,
		height: n
	};
}
function Sc(e, t, n) {
	let r = Ls(t), i = Ps(t), a = n === "fixed", o = cc(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = qo(0);
	function l() {
		c.x = lc(i);
	}
	if (r || !r && !a) if ((Ms(t) !== "body" || zs(i)) && (s = Zs(t)), r) {
		let e = cc(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	} else i && l();
	a && !r && i && l();
	let u = i && !r && !a ? uc(i, s) : qo(0);
	return {
		x: o.left + s.scrollLeft - c.x - u.x,
		y: o.top + s.scrollTop - c.y - u.y,
		width: o.width,
		height: o.height
	};
}
function Cc(e) {
	return Xs(e).position === "static";
}
function wc(e, t) {
	if (!Ls(e) || Xs(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return Ps(e) === n && (n = n.ownerDocument.body), n;
}
function Tc(e, t) {
	let n = Ns(e);
	if (Vs(e)) return n;
	if (!Ls(e)) {
		let t = Qs(e);
		for (; t && !Ys(t);) {
			if (Is(t) && !Cc(t)) return t;
			t = Qs(t);
		}
		return n;
	}
	let r = wc(e, t);
	for (; r && Bs(r) && Cc(r);) r = wc(r, t);
	return r && Ys(r) && Cc(r) && !Ks(r) ? n : r || qs(e) || n;
}
var Ec = async function(e) {
	let t = this.getOffsetParent || Tc, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: Sc(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function Dc(e) {
	return Xs(e).direction === "rtl";
}
var Oc = {
	convertOffsetParentRelativeRectToViewportRelativeRect: dc,
	getDocumentElement: Ps,
	getClippingRect: bc,
	getOffsetParent: Tc,
	getElementRects: Ec,
	getClientRects: fc,
	getDimensions: xc,
	getScale: ic,
	isElement: Is,
	isRTL: Dc
};
function kc(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Ac(e, t) {
	let n = null, r, i = Ps(e);
	function a() {
		var e;
		clearTimeout(r), (e = n) == null || e.disconnect(), n = null;
	}
	function o(s, c) {
		s === void 0 && (s = !1), c === void 0 && (c = 1), a();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (s || t(), !f || !p) return;
		let m = Ko(d), h = Ko(i.clientWidth - (u + f)), g = Ko(i.clientHeight - (d + p)), _ = Ko(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: Wo(0, Uo(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (n !== c) {
				if (!y) return o();
				n ? o(!1, n) : r = setTimeout(() => {
					o(!1, 1e-7);
				}, 1e3);
			}
			n === 1 && !kc(l, e.getBoundingClientRect()) && o(), y = !1;
		}
		try {
			n = new IntersectionObserver(b, {
				...v,
				root: i.ownerDocument
			});
		} catch {
			n = new IntersectionObserver(b, v);
		}
		n.observe(e);
	}
	return o(!0), a;
}
function jc(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = rc(e), u = i || a ? [...l ? ec(l) : [], ...t ? ec(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n, { passive: !0 }), a && e.addEventListener("resize", n);
	});
	let d = l && s ? Ac(l, n) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? cc(e) : null;
	c && g();
	function g() {
		let t = cc(e);
		h && !kc(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var Mc = Ds, Nc = Os, Pc = xs, Fc = As, Ic = ws, Lc = bs, Rc = ks, zc = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = {
		platform: Oc,
		...n
	}, a = {
		...i.platform,
		_c: r
	};
	return ys(e, t, {
		...i,
		platform: a
	});
}, Bc = typeof document < "u" ? c : function() {};
function Vc(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (typeof e == "function" && e.toString() === t.toString()) return !0;
	let n, r, i;
	if (e && t && typeof e == "object") {
		if (Array.isArray(e)) {
			if (n = e.length, n !== t.length) return !1;
			for (r = n; r-- !== 0;) if (!Vc(e[r], t[r])) return !1;
			return !0;
		}
		if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
		for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
		for (r = n; r-- !== 0;) {
			let n = i[r];
			if (!(n === "_owner" && e.$$typeof) && !Vc(e[n], t[n])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}
function Hc(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Uc(e, t) {
	let n = Hc(e);
	return Math.round(t * n) / n;
}
function Wc(t) {
	let n = e.useRef(t);
	return Bc(() => {
		n.current = t;
	}), n;
}
function Gc(t) {
	t === void 0 && (t = {});
	let { placement: n = "bottom", strategy: r = "absolute", middleware: i = [], platform: a, elements: { reference: o, floating: s } = {}, transform: c = !0, whileElementsMounted: l, open: u } = t, [d, p] = e.useState({
		x: 0,
		y: 0,
		strategy: r,
		placement: n,
		middlewareData: {},
		isPositioned: !1
	}), [m, h] = e.useState(i);
	Vc(m, i) || h(i);
	let [g, _] = e.useState(null), [v, y] = e.useState(null), b = e.useCallback((e) => {
		e !== w.current && (w.current = e, _(e));
	}, []), x = e.useCallback((e) => {
		e !== T.current && (T.current = e, y(e));
	}, []), S = o || g, C = s || v, w = e.useRef(null), T = e.useRef(null), E = e.useRef(d), D = l != null, O = Wc(l), k = Wc(a), A = Wc(u), j = e.useCallback(() => {
		if (!w.current || !T.current) return;
		let e = {
			placement: n,
			strategy: r,
			middleware: m
		};
		k.current && (e.platform = k.current), zc(w.current, T.current, e).then((e) => {
			let t = {
				...e,
				isPositioned: A.current !== !1
			};
			M.current && !Vc(E.current, t) && (E.current = t, f.flushSync(() => {
				p(t);
			}));
		});
	}, [
		m,
		n,
		r,
		k,
		A
	]);
	Bc(() => {
		u === !1 && E.current.isPositioned && (E.current.isPositioned = !1, p((e) => ({
			...e,
			isPositioned: !1
		})));
	}, [u]);
	let M = e.useRef(!1);
	Bc(() => (M.current = !0, () => {
		M.current = !1;
	}), []), Bc(() => {
		if (S && (w.current = S), C && (T.current = C), S && C) {
			if (O.current) return O.current(S, C, j);
			j();
		}
	}, [
		S,
		C,
		j,
		O,
		D
	]);
	let N = e.useMemo(() => ({
		reference: w,
		floating: T,
		setReference: b,
		setFloating: x
	}), [b, x]), P = e.useMemo(() => ({
		reference: S,
		floating: C
	}), [S, C]), F = e.useMemo(() => {
		let e = {
			position: r,
			left: 0,
			top: 0
		};
		if (!P.floating) return e;
		let t = Uc(P.floating, d.x), n = Uc(P.floating, d.y);
		return c ? {
			...e,
			transform: "translate(" + t + "px, " + n + "px)",
			...Hc(P.floating) >= 1.5 && { willChange: "transform" }
		} : {
			position: r,
			left: t,
			top: n
		};
	}, [
		r,
		c,
		P.floating,
		d.x,
		d.y
	]);
	return e.useMemo(() => ({
		...d,
		update: j,
		refs: N,
		elements: P,
		floatingStyles: F
	}), [
		d,
		j,
		N,
		P,
		F
	]);
}
var Kc = (e) => {
	function t(e) {
		return {}.hasOwnProperty.call(e, "current");
	}
	return {
		name: "arrow",
		options: e,
		fn(n) {
			let { element: r, padding: i } = typeof e == "function" ? e(n) : e;
			return r && t(r) ? r.current == null ? {} : Lc({
				element: r.current,
				padding: i
			}).fn(n) : r ? Lc({
				element: r,
				padding: i
			}).fn(n) : {};
		}
	};
}, qc = (e, t) => {
	let n = Mc(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Jc = (e, t) => {
	let n = Nc(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Yc = (e, t) => ({
	fn: Rc(e).fn,
	options: [e, t]
}), Xc = (e, t) => {
	let n = Pc(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Zc = (e, t) => {
	let n = Fc(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, Qc = (e, t) => {
	let n = Ic(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, $c = (e, t) => {
	let n = Kc(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, el = "Arrow", tl = e.forwardRef((e, t) => {
	let { children: n, width: r = 10, height: i = 5, ...a } = e;
	return /* @__PURE__ */ h(J.svg, {
		...a,
		ref: t,
		width: r,
		height: i,
		viewBox: "0 0 30 10",
		preserveAspectRatio: "none",
		children: e.asChild ? n : /* @__PURE__ */ h("polygon", { points: "0,0 30,0 15,10" })
	});
});
tl.displayName = el;
var nl = tl, rl = "Popper", [il, al] = en(rl), [ol, sl] = il(rl), cl = (t) => {
	let { __scopePopper: n, children: r } = t, [i, a] = e.useState(null);
	return /* @__PURE__ */ h(ol, {
		scope: n,
		anchor: i,
		onAnchorChange: a,
		children: r
	});
};
cl.displayName = rl;
var ll = "PopperAnchor", ul = e.forwardRef((t, n) => {
	let { __scopePopper: r, virtualRef: i, ...a } = t, o = sl(ll, r), s = e.useRef(null), c = q(n, s), l = e.useRef(null);
	return e.useEffect(() => {
		let e = l.current;
		l.current = i?.current || s.current, e !== l.current && o.onAnchorChange(l.current);
	}), i ? null : /* @__PURE__ */ h(J.div, {
		...a,
		ref: c
	});
});
ul.displayName = ll;
var dl = "PopperContent", [fl, pl] = il(dl), ml = e.forwardRef((t, n) => {
	let { __scopePopper: r, side: i = "bottom", sideOffset: a = 0, align: o = "center", alignOffset: s = 0, arrowPadding: c = 0, avoidCollisions: l = !0, collisionBoundary: u = [], collisionPadding: d = 0, sticky: f = "partial", hideWhenDetached: p = !1, updatePositionStrategy: m = "optimized", onPlaced: g, ..._ } = t, v = sl(dl, r), [y, b] = e.useState(null), x = q(n, (e) => b(e)), [S, C] = e.useState(null), w = To(S), T = w?.width ?? 0, E = w?.height ?? 0, D = i + (o === "center" ? "" : "-" + o), O = typeof d == "number" ? d : {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...d
	}, k = Array.isArray(u) ? u : [u], A = k.length > 0, j = {
		padding: O,
		boundary: k.filter(vl),
		altBoundary: A
	}, { refs: M, floatingStyles: N, placement: P, isPositioned: F, middlewareData: I } = Gc({
		strategy: "fixed",
		placement: D,
		whileElementsMounted: (...e) => jc(...e, { animationFrame: m === "always" }),
		elements: { reference: v.anchor },
		middleware: [
			qc({
				mainAxis: a + E,
				alignmentAxis: s
			}),
			l && Jc({
				mainAxis: !0,
				crossAxis: !1,
				limiter: f === "partial" ? Yc() : void 0,
				...j
			}),
			l && Xc({ ...j }),
			Zc({
				...j,
				apply: ({ elements: e, rects: t, availableWidth: n, availableHeight: r }) => {
					let { width: i, height: a } = t.reference, o = e.floating.style;
					o.setProperty("--radix-popper-available-width", `${n}px`), o.setProperty("--radix-popper-available-height", `${r}px`), o.setProperty("--radix-popper-anchor-width", `${i}px`), o.setProperty("--radix-popper-anchor-height", `${a}px`);
				}
			}),
			S && $c({
				element: S,
				padding: c
			}),
			yl({
				arrowWidth: T,
				arrowHeight: E
			}),
			p && Qc({
				strategy: "referenceHidden",
				...j
			})
		]
	}), [ee, te] = bl(P), ne = X(g);
	rn(() => {
		F && ne?.();
	}, [F, ne]);
	let re = I.arrow?.x, L = I.arrow?.y, R = I.arrow?.centerOffset !== 0, [ie, ae] = e.useState();
	return rn(() => {
		y && ae(window.getComputedStyle(y).zIndex);
	}, [y]), /* @__PURE__ */ h("div", {
		ref: M.setFloating,
		"data-radix-popper-content-wrapper": "",
		style: {
			...N,
			transform: F ? N.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: ie,
			"--radix-popper-transform-origin": [I.transformOrigin?.x, I.transformOrigin?.y].join(" "),
			...I.hide?.referenceHidden && {
				visibility: "hidden",
				pointerEvents: "none"
			}
		},
		dir: t.dir,
		children: /* @__PURE__ */ h(fl, {
			scope: r,
			placedSide: ee,
			onArrowChange: C,
			arrowX: re,
			arrowY: L,
			shouldHideArrow: R,
			children: /* @__PURE__ */ h(J.div, {
				"data-side": ee,
				"data-align": te,
				..._,
				ref: x,
				style: {
					..._.style,
					animation: F ? void 0 : "none"
				}
			})
		})
	});
});
ml.displayName = dl;
var hl = "PopperArrow", gl = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
}, _l = e.forwardRef(function(e, t) {
	let { __scopePopper: n, ...r } = e, i = pl(hl, n), a = gl[i.placedSide];
	return /* @__PURE__ */ h("span", {
		ref: i.onArrowChange,
		style: {
			position: "absolute",
			left: i.arrowX,
			top: i.arrowY,
			[a]: 0,
			transformOrigin: {
				top: "",
				right: "0 0",
				bottom: "center 0",
				left: "100% 0"
			}[i.placedSide],
			transform: {
				top: "translateY(100%)",
				right: "translateY(50%) rotate(90deg) translateX(-50%)",
				bottom: "rotate(180deg)",
				left: "translateY(50%) rotate(-90deg) translateX(50%)"
			}[i.placedSide],
			visibility: i.shouldHideArrow ? "hidden" : void 0
		},
		children: /* @__PURE__ */ h(nl, {
			...r,
			ref: t,
			style: {
				...r.style,
				display: "block"
			}
		})
	});
});
_l.displayName = hl;
function vl(e) {
	return e !== null;
}
var yl = (e) => ({
	name: "transformOrigin",
	options: e,
	fn(t) {
		let { placement: n, rects: r, middlewareData: i } = t, a = i.arrow?.centerOffset !== 0, o = a ? 0 : e.arrowWidth, s = a ? 0 : e.arrowHeight, [c, l] = bl(n), u = {
			start: "0%",
			center: "50%",
			end: "100%"
		}[l], d = (i.arrow?.x ?? 0) + o / 2, f = (i.arrow?.y ?? 0) + s / 2, p = "", m = "";
		return c === "bottom" ? (p = a ? u : `${d}px`, m = `${-s}px`) : c === "top" ? (p = a ? u : `${d}px`, m = `${r.floating.height + s}px`) : c === "right" ? (p = `${-s}px`, m = a ? u : `${f}px`) : c === "left" && (p = `${r.floating.width + s}px`, m = a ? u : `${f}px`), { data: {
			x: p,
			y: m
		} };
	}
});
function bl(e) {
	let [t, n = "center"] = e.split("-");
	return [t, n];
}
var xl = cl, Sl = ul, Cl = ml, wl = _l, Tl = "rovingFocusGroup.onEntryFocus", El = {
	bubbles: !1,
	cancelable: !0
}, Dl = "RovingFocusGroup", [Ol, kl, Al] = nn(Dl), [jl, Ml] = en(Dl, [Al]), [Nl, Pl] = jl(Dl), Fl = e.forwardRef((e, t) => /* @__PURE__ */ h(Ol.Provider, {
	scope: e.__scopeRovingFocusGroup,
	children: /* @__PURE__ */ h(Ol.Slot, {
		scope: e.__scopeRovingFocusGroup,
		children: /* @__PURE__ */ h(Il, {
			...e,
			ref: t
		})
	})
}));
Fl.displayName = Dl;
var Il = e.forwardRef((t, n) => {
	let { __scopeRovingFocusGroup: r, orientation: i, loop: a = !1, dir: o, currentTabStopId: s, defaultCurrentTabStopId: c, onCurrentTabStopIdChange: l, onEntryFocus: u, preventScrollOnEntryFocus: d = !1, ...f } = t, p = e.useRef(null), m = q(n, p), g = Nn(o), [_, v] = on({
		prop: s,
		defaultProp: c ?? null,
		onChange: l,
		caller: Dl
	}), [y, b] = e.useState(!1), x = X(u), S = kl(r), C = e.useRef(!1), [w, T] = e.useState(0);
	return e.useEffect(() => {
		let e = p.current;
		if (e) return e.addEventListener(Tl, x), () => e.removeEventListener(Tl, x);
	}, [x]), /* @__PURE__ */ h(Nl, {
		scope: r,
		orientation: i,
		dir: g,
		loop: a,
		currentTabStopId: _,
		onItemFocus: e.useCallback((e) => v(e), [v]),
		onItemShiftTab: e.useCallback(() => b(!0), []),
		onFocusableItemAdd: e.useCallback(() => T((e) => e + 1), []),
		onFocusableItemRemove: e.useCallback(() => T((e) => e - 1), []),
		children: /* @__PURE__ */ h(J.div, {
			tabIndex: y || w === 0 ? -1 : 0,
			"data-orientation": i,
			...f,
			ref: m,
			style: {
				outline: "none",
				...t.style
			},
			onMouseDown: Y(t.onMouseDown, () => {
				C.current = !0;
			}),
			onFocus: Y(t.onFocus, (e) => {
				let t = !C.current;
				if (e.target === e.currentTarget && t && !y) {
					let t = new CustomEvent(Tl, El);
					if (e.currentTarget.dispatchEvent(t), !t.defaultPrevented) {
						let e = S().filter((e) => e.focusable);
						Hl([
							e.find((e) => e.active),
							e.find((e) => e.id === _),
							...e
						].filter(Boolean).map((e) => e.ref.current), d);
					}
				}
				C.current = !1;
			}),
			onBlur: Y(t.onBlur, () => b(!1))
		})
	});
}), Ll = "RovingFocusGroupItem", Rl = e.forwardRef((t, n) => {
	let { __scopeRovingFocusGroup: r, focusable: i = !0, active: a = !1, tabStopId: o, children: s, ...c } = t, l = gn(), u = o || l, d = Pl(Ll, r), f = d.currentTabStopId === u, p = kl(r), { onFocusableItemAdd: m, onFocusableItemRemove: g, currentTabStopId: _ } = d;
	return e.useEffect(() => {
		if (i) return m(), () => g();
	}, [
		i,
		m,
		g
	]), /* @__PURE__ */ h(Ol.ItemSlot, {
		scope: r,
		id: u,
		focusable: i,
		active: a,
		children: /* @__PURE__ */ h(J.span, {
			tabIndex: f ? 0 : -1,
			"data-orientation": d.orientation,
			...c,
			ref: n,
			onMouseDown: Y(t.onMouseDown, (e) => {
				i ? d.onItemFocus(u) : e.preventDefault();
			}),
			onFocus: Y(t.onFocus, () => d.onItemFocus(u)),
			onKeyDown: Y(t.onKeyDown, (e) => {
				if (e.key === "Tab" && e.shiftKey) {
					d.onItemShiftTab();
					return;
				}
				if (e.target !== e.currentTarget) return;
				let t = Vl(e, d.orientation, d.dir);
				if (t !== void 0) {
					if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
					e.preventDefault();
					let n = p().filter((e) => e.focusable).map((e) => e.ref.current);
					if (t === "last") n.reverse();
					else if (t === "prev" || t === "next") {
						t === "prev" && n.reverse();
						let r = n.indexOf(e.currentTarget);
						n = d.loop ? Ul(n, r + 1) : n.slice(r + 1);
					}
					setTimeout(() => Hl(n));
				}
			}),
			children: typeof s == "function" ? s({
				isCurrentTabStop: f,
				hasTabStop: _ != null
			}) : s
		})
	});
});
Rl.displayName = Ll;
var zl = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last"
};
function Bl(e, t) {
	return t === "rtl" ? e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e : e;
}
function Vl(e, t, n) {
	let r = Bl(e.key, n);
	if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r))) return zl[r];
}
function Hl(e, t = !1) {
	let n = document.activeElement;
	for (let r of e) if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function Ul(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
var Wl = Fl, Gl = Rl, Kl = ["Enter", " "], ql = [
	"ArrowDown",
	"PageUp",
	"Home"
], Jl = [
	"ArrowUp",
	"PageDown",
	"End"
], Yl = [...ql, ...Jl], Xl = {
	ltr: [...Kl, "ArrowRight"],
	rtl: [...Kl, "ArrowLeft"]
}, Zl = {
	ltr: ["ArrowLeft"],
	rtl: ["ArrowRight"]
}, Ql = "Menu", [$l, eu, tu] = nn(Ql), [nu, ru] = en(Ql, [
	tu,
	al,
	Ml
]), iu = al(), au = Ml(), [ou, su] = nu(Ql), [cu, lu] = nu(Ql), uu = (t) => {
	let { __scopeMenu: n, open: r = !1, children: i, dir: a, onOpenChange: o, modal: s = !0 } = t, c = iu(n), [l, u] = e.useState(null), d = e.useRef(!1), f = X(o), p = Nn(a);
	return e.useEffect(() => {
		let e = () => {
			d.current = !0, document.addEventListener("pointerdown", t, {
				capture: !0,
				once: !0
			}), document.addEventListener("pointermove", t, {
				capture: !0,
				once: !0
			});
		}, t = () => d.current = !1;
		return document.addEventListener("keydown", e, { capture: !0 }), () => {
			document.removeEventListener("keydown", e, { capture: !0 }), document.removeEventListener("pointerdown", t, { capture: !0 }), document.removeEventListener("pointermove", t, { capture: !0 });
		};
	}, []), /* @__PURE__ */ h(xl, {
		...c,
		children: /* @__PURE__ */ h(ou, {
			scope: n,
			open: r,
			onOpenChange: f,
			content: l,
			onContentChange: u,
			children: /* @__PURE__ */ h(cu, {
				scope: n,
				onClose: e.useCallback(() => f(!1), [f]),
				isUsingKeyboardRef: d,
				dir: p,
				modal: s,
				children: i
			})
		})
	});
};
uu.displayName = Ql;
var du = "MenuAnchor", fu = e.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ h(Sl, {
		...iu(n),
		...r,
		ref: t
	});
});
fu.displayName = du;
var pu = "MenuPortal", [mu, hu] = nu(pu, { forceMount: void 0 }), gu = (e) => {
	let { __scopeMenu: t, forceMount: n, children: r, container: i } = e, a = su(pu, t);
	return /* @__PURE__ */ h(mu, {
		scope: t,
		forceMount: n,
		children: /* @__PURE__ */ h(un, {
			present: n || a.open,
			children: /* @__PURE__ */ h(qr, {
				asChild: !0,
				container: i,
				children: r
			})
		})
	});
};
gu.displayName = pu;
var _u = "MenuContent", [vu, yu] = nu(_u), bu = e.forwardRef((e, t) => {
	let n = hu(_u, e.__scopeMenu), { forceMount: r = n.forceMount, ...i } = e, a = su(_u, e.__scopeMenu), o = lu(_u, e.__scopeMenu);
	return /* @__PURE__ */ h($l.Provider, {
		scope: e.__scopeMenu,
		children: /* @__PURE__ */ h(un, {
			present: r || a.open,
			children: /* @__PURE__ */ h($l.Slot, {
				scope: e.__scopeMenu,
				children: o.modal ? /* @__PURE__ */ h(xu, {
					...i,
					ref: t
				}) : /* @__PURE__ */ h(Su, {
					...i,
					ref: t
				})
			})
		})
	});
}), xu = e.forwardRef((t, n) => {
	let r = su(_u, t.__scopeMenu), i = e.useRef(null), a = q(n, i);
	return e.useEffect(() => {
		let e = i.current;
		if (e) return ma(e);
	}, []), /* @__PURE__ */ h(wu, {
		...t,
		ref: a,
		trapFocus: r.open,
		disableOutsidePointerEvents: r.open,
		disableOutsideScroll: !0,
		onFocusOutside: Y(t.onFocusOutside, (e) => e.preventDefault(), { checkForDefaultPrevented: !1 }),
		onDismiss: () => r.onOpenChange(!1)
	});
}), Su = e.forwardRef((e, t) => {
	let n = su(_u, e.__scopeMenu);
	return /* @__PURE__ */ h(wu, {
		...e,
		ref: t,
		trapFocus: !1,
		disableOutsidePointerEvents: !1,
		disableOutsideScroll: !1,
		onDismiss: () => n.onOpenChange(!1)
	});
}), Cu = /* @__PURE__ */ Bt("MenuContent.ScrollLock"), wu = e.forwardRef((t, n) => {
	let { __scopeMenu: r, loop: i = !1, trapFocus: a, onOpenAutoFocus: o, onCloseAutoFocus: s, disableOutsidePointerEvents: c, onEntryFocus: l, onEscapeKeyDown: u, onPointerDownOutside: d, onFocusOutside: f, onInteractOutside: p, onDismiss: m, disableOutsideScroll: g, ..._ } = t, v = su(_u, r), y = lu(_u, r), b = iu(r), x = au(r), S = eu(r), [C, w] = e.useState(null), T = e.useRef(null), E = q(n, T, v.onContentChange), D = e.useRef(0), O = e.useRef(""), k = e.useRef(0), A = e.useRef(null), j = e.useRef("right"), M = e.useRef(0), N = g ? aa : e.Fragment, P = g ? {
		as: Cu,
		allowPinchZoom: !0
	} : void 0, F = (e) => {
		let t = O.current + e, n = S().filter((e) => !e.disabled), r = document.activeElement, i = n.find((e) => e.ref.current === r)?.textValue, a = cd(n.map((e) => e.textValue), t, i), o = n.find((e) => e.textValue === a)?.ref.current;
		(function e(t) {
			O.current = t, window.clearTimeout(D.current), t !== "" && (D.current = window.setTimeout(() => e(""), 1e3));
		})(t), o && setTimeout(() => o.focus());
	};
	e.useEffect(() => () => window.clearTimeout(D.current), []), Yr();
	let I = e.useCallback((e) => j.current === A.current?.side && ud(e, A.current?.area), []);
	return /* @__PURE__ */ h(vu, {
		scope: r,
		searchRef: O,
		onItemEnter: e.useCallback((e) => {
			I(e) && e.preventDefault();
		}, [I]),
		onItemLeave: e.useCallback((e) => {
			I(e) || (T.current?.focus(), w(null));
		}, [I]),
		onTriggerLeave: e.useCallback((e) => {
			I(e) && e.preventDefault();
		}, [I]),
		pointerGraceTimerRef: k,
		onPointerGraceIntentChange: e.useCallback((e) => {
			A.current = e;
		}, []),
		children: /* @__PURE__ */ h(N, {
			...P,
			children: /* @__PURE__ */ h(Pr, {
				asChild: !0,
				trapped: a,
				onMountAutoFocus: Y(o, (e) => {
					e.preventDefault(), T.current?.focus({ preventScroll: !0 });
				}),
				onUnmountAutoFocus: s,
				children: /* @__PURE__ */ h(xr, {
					asChild: !0,
					disableOutsidePointerEvents: c,
					onEscapeKeyDown: u,
					onPointerDownOutside: d,
					onFocusOutside: f,
					onInteractOutside: p,
					onDismiss: m,
					children: /* @__PURE__ */ h(Wl, {
						asChild: !0,
						...x,
						dir: y.dir,
						orientation: "vertical",
						loop: i,
						currentTabStopId: C,
						onCurrentTabStopIdChange: w,
						onEntryFocus: Y(l, (e) => {
							y.isUsingKeyboardRef.current || e.preventDefault();
						}),
						preventScrollOnEntryFocus: !0,
						children: /* @__PURE__ */ h(Cl, {
							role: "menu",
							"aria-orientation": "vertical",
							"data-state": rd(v.open),
							"data-radix-menu-content": "",
							dir: y.dir,
							...b,
							..._,
							ref: E,
							style: {
								outline: "none",
								..._.style
							},
							onKeyDown: Y(_.onKeyDown, (e) => {
								let t = e.target.closest("[data-radix-menu-content]") === e.currentTarget, n = e.ctrlKey || e.altKey || e.metaKey, r = e.key.length === 1;
								t && (e.key === "Tab" && e.preventDefault(), !n && r && F(e.key));
								let i = T.current;
								if (e.target !== i || !Yl.includes(e.key)) return;
								e.preventDefault();
								let a = S().filter((e) => !e.disabled).map((e) => e.ref.current);
								Jl.includes(e.key) && a.reverse(), od(a);
							}),
							onBlur: Y(t.onBlur, (e) => {
								e.currentTarget.contains(e.target) || (window.clearTimeout(D.current), O.current = "");
							}),
							onPointerMove: Y(t.onPointerMove, dd((e) => {
								let t = e.target, n = M.current !== e.clientX;
								e.currentTarget.contains(t) && n && (j.current = e.clientX > M.current ? "right" : "left", M.current = e.clientX);
							}))
						})
					})
				})
			})
		})
	});
});
bu.displayName = _u;
var Tu = "MenuGroup", Eu = e.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ h(J.div, {
		role: "group",
		...r,
		ref: t
	});
});
Eu.displayName = Tu;
var Du = "MenuLabel", Ou = e.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ h(J.div, {
		...r,
		ref: t
	});
});
Ou.displayName = Du;
var ku = "MenuItem", Au = "menu.itemSelect", ju = e.forwardRef((t, n) => {
	let { disabled: r = !1, onSelect: i, ...a } = t, o = e.useRef(null), s = lu(ku, t.__scopeMenu), c = yu(ku, t.__scopeMenu), l = q(n, o), u = e.useRef(!1), d = () => {
		let e = o.current;
		if (!r && e) {
			let t = new CustomEvent(Au, {
				bubbles: !0,
				cancelable: !0
			});
			e.addEventListener(Au, (e) => i?.(e), { once: !0 }), Jt(e, t), t.defaultPrevented ? u.current = !1 : s.onClose();
		}
	};
	return /* @__PURE__ */ h(Mu, {
		...a,
		ref: l,
		disabled: r,
		onClick: Y(t.onClick, d),
		onPointerDown: (e) => {
			t.onPointerDown?.(e), u.current = !0;
		},
		onPointerUp: Y(t.onPointerUp, (e) => {
			u.current || e.currentTarget?.click();
		}),
		onKeyDown: Y(t.onKeyDown, (e) => {
			let t = c.searchRef.current !== "";
			r || t && e.key === " " || Kl.includes(e.key) && (e.currentTarget.click(), e.preventDefault());
		})
	});
});
ju.displayName = ku;
var Mu = e.forwardRef((t, n) => {
	let { __scopeMenu: r, disabled: i = !1, textValue: a, ...o } = t, s = yu(ku, r), c = au(r), l = e.useRef(null), u = q(n, l), [d, f] = e.useState(!1), [p, m] = e.useState("");
	return e.useEffect(() => {
		let e = l.current;
		e && m((e.textContent ?? "").trim());
	}, [o.children]), /* @__PURE__ */ h($l.ItemSlot, {
		scope: r,
		disabled: i,
		textValue: a ?? p,
		children: /* @__PURE__ */ h(Gl, {
			asChild: !0,
			...c,
			focusable: !i,
			children: /* @__PURE__ */ h(J.div, {
				role: "menuitem",
				"data-highlighted": d ? "" : void 0,
				"aria-disabled": i || void 0,
				"data-disabled": i ? "" : void 0,
				...o,
				ref: u,
				onPointerMove: Y(t.onPointerMove, dd((e) => {
					i ? s.onItemLeave(e) : (s.onItemEnter(e), e.defaultPrevented || e.currentTarget.focus({ preventScroll: !0 }));
				})),
				onPointerLeave: Y(t.onPointerLeave, dd((e) => s.onItemLeave(e))),
				onFocus: Y(t.onFocus, () => f(!0)),
				onBlur: Y(t.onBlur, () => f(!1))
			})
		})
	});
}), Nu = "MenuCheckboxItem", Pu = e.forwardRef((e, t) => {
	let { checked: n = !1, onCheckedChange: r, ...i } = e;
	return /* @__PURE__ */ h(Hu, {
		scope: e.__scopeMenu,
		checked: n,
		children: /* @__PURE__ */ h(ju, {
			role: "menuitemcheckbox",
			"aria-checked": id(n) ? "mixed" : n,
			...i,
			ref: t,
			"data-state": ad(n),
			onSelect: Y(i.onSelect, () => r?.(id(n) ? !0 : !n), { checkForDefaultPrevented: !1 })
		})
	});
});
Pu.displayName = Nu;
var Fu = "MenuRadioGroup", [Iu, Lu] = nu(Fu, {
	value: void 0,
	onValueChange: () => {}
}), Ru = e.forwardRef((e, t) => {
	let { value: n, onValueChange: r, ...i } = e, a = X(r);
	return /* @__PURE__ */ h(Iu, {
		scope: e.__scopeMenu,
		value: n,
		onValueChange: a,
		children: /* @__PURE__ */ h(Eu, {
			...i,
			ref: t
		})
	});
});
Ru.displayName = Fu;
var zu = "MenuRadioItem", Bu = e.forwardRef((e, t) => {
	let { value: n, ...r } = e, i = Lu(zu, e.__scopeMenu), a = n === i.value;
	return /* @__PURE__ */ h(Hu, {
		scope: e.__scopeMenu,
		checked: a,
		children: /* @__PURE__ */ h(ju, {
			role: "menuitemradio",
			"aria-checked": a,
			...r,
			ref: t,
			"data-state": ad(a),
			onSelect: Y(r.onSelect, () => i.onValueChange?.(n), { checkForDefaultPrevented: !1 })
		})
	});
});
Bu.displayName = zu;
var Vu = "MenuItemIndicator", [Hu, Uu] = nu(Vu, { checked: !1 }), Wu = e.forwardRef((e, t) => {
	let { __scopeMenu: n, forceMount: r, ...i } = e, a = Uu(Vu, n);
	return /* @__PURE__ */ h(un, {
		present: r || id(a.checked) || a.checked === !0,
		children: /* @__PURE__ */ h(J.span, {
			...i,
			ref: t,
			"data-state": ad(a.checked)
		})
	});
});
Wu.displayName = Vu;
var Gu = "MenuSeparator", Ku = e.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ h(J.div, {
		role: "separator",
		"aria-orientation": "horizontal",
		...r,
		ref: t
	});
});
Ku.displayName = Gu;
var qu = "MenuArrow", Ju = e.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ h(wl, {
		...iu(n),
		...r,
		ref: t
	});
});
Ju.displayName = qu;
var Yu = "MenuSub", [Xu, Zu] = nu(Yu), Qu = (t) => {
	let { __scopeMenu: n, children: r, open: i = !1, onOpenChange: a } = t, o = su(Yu, n), s = iu(n), [c, l] = e.useState(null), [u, d] = e.useState(null), f = X(a);
	return e.useEffect(() => (o.open === !1 && f(!1), () => f(!1)), [o.open, f]), /* @__PURE__ */ h(xl, {
		...s,
		children: /* @__PURE__ */ h(ou, {
			scope: n,
			open: i,
			onOpenChange: f,
			content: u,
			onContentChange: d,
			children: /* @__PURE__ */ h(Xu, {
				scope: n,
				contentId: gn(),
				triggerId: gn(),
				trigger: c,
				onTriggerChange: l,
				children: r
			})
		})
	});
};
Qu.displayName = Yu;
var $u = "MenuSubTrigger", ed = e.forwardRef((t, n) => {
	let r = su($u, t.__scopeMenu), i = lu($u, t.__scopeMenu), a = Zu($u, t.__scopeMenu), o = yu($u, t.__scopeMenu), s = e.useRef(null), { pointerGraceTimerRef: c, onPointerGraceIntentChange: l } = o, u = { __scopeMenu: t.__scopeMenu }, d = e.useCallback(() => {
		s.current && window.clearTimeout(s.current), s.current = null;
	}, []);
	return e.useEffect(() => d, [d]), e.useEffect(() => {
		let e = c.current;
		return () => {
			window.clearTimeout(e), l(null);
		};
	}, [c, l]), /* @__PURE__ */ h(fu, {
		asChild: !0,
		...u,
		children: /* @__PURE__ */ h(Mu, {
			id: a.triggerId,
			"aria-haspopup": "menu",
			"aria-expanded": r.open,
			"aria-controls": a.contentId,
			"data-state": rd(r.open),
			...t,
			ref: zt(n, a.onTriggerChange),
			onClick: (e) => {
				t.onClick?.(e), !(t.disabled || e.defaultPrevented) && (e.currentTarget.focus(), r.open || r.onOpenChange(!0));
			},
			onPointerMove: Y(t.onPointerMove, dd((e) => {
				o.onItemEnter(e), !e.defaultPrevented && !t.disabled && !r.open && !s.current && (o.onPointerGraceIntentChange(null), s.current = window.setTimeout(() => {
					r.onOpenChange(!0), d();
				}, 100));
			})),
			onPointerLeave: Y(t.onPointerLeave, dd((e) => {
				d();
				let t = r.content?.getBoundingClientRect();
				if (t) {
					let n = r.content?.dataset.side, i = n === "right", a = i ? -5 : 5, s = t[i ? "left" : "right"], l = t[i ? "right" : "left"];
					o.onPointerGraceIntentChange({
						area: [
							{
								x: e.clientX + a,
								y: e.clientY
							},
							{
								x: s,
								y: t.top
							},
							{
								x: l,
								y: t.top
							},
							{
								x: l,
								y: t.bottom
							},
							{
								x: s,
								y: t.bottom
							}
						],
						side: n
					}), window.clearTimeout(c.current), c.current = window.setTimeout(() => o.onPointerGraceIntentChange(null), 300);
				} else {
					if (o.onTriggerLeave(e), e.defaultPrevented) return;
					o.onPointerGraceIntentChange(null);
				}
			})),
			onKeyDown: Y(t.onKeyDown, (e) => {
				let n = o.searchRef.current !== "";
				t.disabled || n && e.key === " " || Xl[i.dir].includes(e.key) && (r.onOpenChange(!0), r.content?.focus(), e.preventDefault());
			})
		})
	});
});
ed.displayName = $u;
var td = "MenuSubContent", nd = e.forwardRef((t, n) => {
	let r = hu(_u, t.__scopeMenu), { forceMount: i = r.forceMount, ...a } = t, o = su(_u, t.__scopeMenu), s = lu(_u, t.__scopeMenu), c = Zu(td, t.__scopeMenu), l = e.useRef(null), u = q(n, l);
	return /* @__PURE__ */ h($l.Provider, {
		scope: t.__scopeMenu,
		children: /* @__PURE__ */ h(un, {
			present: i || o.open,
			children: /* @__PURE__ */ h($l.Slot, {
				scope: t.__scopeMenu,
				children: /* @__PURE__ */ h(wu, {
					id: c.contentId,
					"aria-labelledby": c.triggerId,
					...a,
					ref: u,
					align: "start",
					side: s.dir === "rtl" ? "left" : "right",
					disableOutsidePointerEvents: !1,
					disableOutsideScroll: !1,
					trapFocus: !1,
					onOpenAutoFocus: (e) => {
						s.isUsingKeyboardRef.current && l.current?.focus(), e.preventDefault();
					},
					onCloseAutoFocus: (e) => e.preventDefault(),
					onFocusOutside: Y(t.onFocusOutside, (e) => {
						e.target !== c.trigger && o.onOpenChange(!1);
					}),
					onEscapeKeyDown: Y(t.onEscapeKeyDown, (e) => {
						s.onClose(), e.preventDefault();
					}),
					onKeyDown: Y(t.onKeyDown, (e) => {
						let t = e.currentTarget.contains(e.target), n = Zl[s.dir].includes(e.key);
						t && n && (o.onOpenChange(!1), c.trigger?.focus(), e.preventDefault());
					})
				})
			})
		})
	});
});
nd.displayName = td;
function rd(e) {
	return e ? "open" : "closed";
}
function id(e) {
	return e === "indeterminate";
}
function ad(e) {
	return id(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function od(e) {
	let t = document.activeElement;
	for (let n of e) if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function sd(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
function cd(e, t, n) {
	let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1, a = sd(e, Math.max(i, 0));
	r.length === 1 && (a = a.filter((e) => e !== n));
	let o = a.find((e) => e.toLowerCase().startsWith(r.toLowerCase()));
	return o === n ? void 0 : o;
}
function ld(e, t) {
	let { x: n, y: r } = e, i = !1;
	for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
		let o = t[e], s = t[a], c = o.x, l = o.y, u = s.x, d = s.y;
		l > r != d > r && n < (u - c) * (r - l) / (d - l) + c && (i = !i);
	}
	return i;
}
function ud(e, t) {
	return t ? ld({
		x: e.clientX,
		y: e.clientY
	}, t) : !1;
}
function dd(e) {
	return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var fd = uu, pd = fu, md = gu, hd = bu, gd = Eu, _d = Ou, vd = ju, yd = Pu, bd = Ru, xd = Bu, Sd = Wu, Cd = Ku, wd = Ju, Td = Qu, Ed = ed, Dd = nd, Od = "DropdownMenu", [kd, Ad] = en(Od, [ru]), jd = ru(), [Md, Nd] = kd(Od), Pd = (t) => {
	let { __scopeDropdownMenu: n, children: r, dir: i, open: a, defaultOpen: o, onOpenChange: s, modal: c = !0 } = t, l = jd(n), u = e.useRef(null), [d, f] = on({
		prop: a,
		defaultProp: o ?? !1,
		onChange: s,
		caller: Od
	});
	return /* @__PURE__ */ h(Md, {
		scope: n,
		triggerId: gn(),
		triggerRef: u,
		contentId: gn(),
		open: d,
		onOpenChange: f,
		onOpenToggle: e.useCallback(() => f((e) => !e), [f]),
		modal: c,
		children: /* @__PURE__ */ h(fd, {
			...l,
			open: d,
			onOpenChange: f,
			dir: i,
			modal: c,
			children: r
		})
	});
};
Pd.displayName = Od;
var Fd = "DropdownMenuTrigger", Id = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, disabled: r = !1, ...i } = e, a = Nd(Fd, n);
	return /* @__PURE__ */ h(pd, {
		asChild: !0,
		...jd(n),
		children: /* @__PURE__ */ h(J.button, {
			type: "button",
			id: a.triggerId,
			"aria-haspopup": "menu",
			"aria-expanded": a.open,
			"aria-controls": a.open ? a.contentId : void 0,
			"data-state": a.open ? "open" : "closed",
			"data-disabled": r ? "" : void 0,
			disabled: r,
			...i,
			ref: zt(t, a.triggerRef),
			onPointerDown: Y(e.onPointerDown, (e) => {
				!r && e.button === 0 && e.ctrlKey === !1 && (a.onOpenToggle(), a.open || e.preventDefault());
			}),
			onKeyDown: Y(e.onKeyDown, (e) => {
				r || (["Enter", " "].includes(e.key) && a.onOpenToggle(), e.key === "ArrowDown" && a.onOpenChange(!0), [
					"Enter",
					" ",
					"ArrowDown"
				].includes(e.key) && e.preventDefault());
			})
		})
	});
});
Id.displayName = Fd;
var Ld = "DropdownMenuPortal", Rd = (e) => {
	let { __scopeDropdownMenu: t, ...n } = e;
	return /* @__PURE__ */ h(md, {
		...jd(t),
		...n
	});
};
Rd.displayName = Ld;
var zd = "DropdownMenuContent", Bd = e.forwardRef((t, n) => {
	let { __scopeDropdownMenu: r, ...i } = t, a = Nd(zd, r), o = jd(r), s = e.useRef(!1);
	return /* @__PURE__ */ h(hd, {
		id: a.contentId,
		"aria-labelledby": a.triggerId,
		...o,
		...i,
		ref: n,
		onCloseAutoFocus: Y(t.onCloseAutoFocus, (e) => {
			s.current || a.triggerRef.current?.focus(), s.current = !1, e.preventDefault();
		}),
		onInteractOutside: Y(t.onInteractOutside, (e) => {
			let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0, r = t.button === 2 || n;
			(!a.modal || r) && (s.current = !0);
		}),
		style: {
			...t.style,
			"--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
			"--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
			"--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
Bd.displayName = zd;
var Vd = "DropdownMenuGroup", Hd = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ h(gd, {
		...jd(n),
		...r,
		ref: t
	});
});
Hd.displayName = Vd;
var Ud = "DropdownMenuLabel", Wd = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ h(_d, {
		...jd(n),
		...r,
		ref: t
	});
});
Wd.displayName = Ud;
var Gd = "DropdownMenuItem", Kd = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ h(vd, {
		...jd(n),
		...r,
		ref: t
	});
});
Kd.displayName = Gd;
var qd = "DropdownMenuCheckboxItem", Jd = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ h(yd, {
		...jd(n),
		...r,
		ref: t
	});
});
Jd.displayName = qd;
var Yd = "DropdownMenuRadioGroup", Xd = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ h(bd, {
		...jd(n),
		...r,
		ref: t
	});
});
Xd.displayName = Yd;
var Zd = "DropdownMenuRadioItem", Qd = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ h(xd, {
		...jd(n),
		...r,
		ref: t
	});
});
Qd.displayName = Zd;
var $d = "DropdownMenuItemIndicator", ef = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ h(Sd, {
		...jd(n),
		...r,
		ref: t
	});
});
ef.displayName = $d;
var tf = "DropdownMenuSeparator", nf = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ h(Cd, {
		...jd(n),
		...r,
		ref: t
	});
});
nf.displayName = tf;
var rf = "DropdownMenuArrow", af = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ h(wd, {
		...jd(n),
		...r,
		ref: t
	});
});
af.displayName = rf;
var of = (e) => {
	let { __scopeDropdownMenu: t, children: n, open: r, onOpenChange: i, defaultOpen: a } = e, o = jd(t), [s, c] = on({
		prop: r,
		defaultProp: a ?? !1,
		onChange: i,
		caller: "DropdownMenuSub"
	});
	return /* @__PURE__ */ h(Td, {
		...o,
		open: s,
		onOpenChange: c,
		children: n
	});
}, sf = "DropdownMenuSubTrigger", cf = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ h(Ed, {
		...jd(n),
		...r,
		ref: t
	});
});
cf.displayName = sf;
var lf = "DropdownMenuSubContent", uf = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ h(Dd, {
		...jd(n),
		...r,
		ref: t,
		style: {
			...e.style,
			"--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
			"--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
			"--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
uf.displayName = lf;
var df = Pd, ff = Id, pf = Rd, mf = Bd, hf = Hd, gf = Wd, _f = Kd, vf = Jd, yf = Xd, bf = Qd, xf = ef, Sf = nf, Cf = of, wf = cf, Tf = uf, Ef = "Label", Df = e.forwardRef((e, t) => /* @__PURE__ */ h(J.label, {
	...e,
	ref: t,
	onMouseDown: (t) => {
		t.target.closest("button, input, select, textarea") || (e.onMouseDown?.(t), !t.defaultPrevented && t.detail > 1 && t.preventDefault());
	}
}));
Df.displayName = Ef;
var Of = Df, kf = "NavigationMenu", [Af, jf, Mf] = nn(kf), [Nf, Pf, Ff] = nn(kf), [If, Lf] = en(kf, [Mf, Ff]), [Rf, zf] = If(kf), [Bf, Vf] = If(kf), Hf = e.forwardRef((t, n) => {
	let { __scopeNavigationMenu: r, value: i, onValueChange: a, defaultValue: o, delayDuration: s = 200, skipDelayDuration: c = 300, orientation: l = "horizontal", dir: u, ...d } = t, [f, p] = e.useState(null), m = q(n, (e) => p(e)), g = Nn(u), _ = e.useRef(0), v = e.useRef(0), y = e.useRef(0), [b, x] = e.useState(!0), [S, C] = on({
		prop: i,
		onChange: (e) => {
			let t = e !== "", n = c > 0;
			t ? (window.clearTimeout(y.current), n && x(!1)) : (window.clearTimeout(y.current), y.current = window.setTimeout(() => x(!0), c)), a?.(e);
		},
		defaultProp: o ?? "",
		caller: kf
	}), w = e.useCallback(() => {
		window.clearTimeout(v.current), v.current = window.setTimeout(() => C(""), 150);
	}, [C]), T = e.useCallback((e) => {
		window.clearTimeout(v.current), C(e);
	}, [C]), E = e.useCallback((e) => {
		S === e ? window.clearTimeout(v.current) : _.current = window.setTimeout(() => {
			window.clearTimeout(v.current), C(e);
		}, s);
	}, [
		S,
		C,
		s
	]);
	return e.useEffect(() => () => {
		window.clearTimeout(_.current), window.clearTimeout(v.current), window.clearTimeout(y.current);
	}, []), /* @__PURE__ */ h(Gf, {
		scope: r,
		isRootMenu: !0,
		value: S,
		dir: g,
		orientation: l,
		rootNavigationMenu: f,
		onTriggerEnter: (e) => {
			window.clearTimeout(_.current), b ? E(e) : T(e);
		},
		onTriggerLeave: () => {
			window.clearTimeout(_.current), w();
		},
		onContentEnter: () => window.clearTimeout(v.current),
		onContentLeave: w,
		onItemSelect: (e) => {
			C((t) => t === e ? "" : e);
		},
		onItemDismiss: () => C(""),
		children: /* @__PURE__ */ h(J.nav, {
			"aria-label": "Main",
			"data-orientation": l,
			dir: g,
			...d,
			ref: m
		})
	});
});
Hf.displayName = kf;
var Uf = "NavigationMenuSub", Wf = e.forwardRef((e, t) => {
	let { __scopeNavigationMenu: n, value: r, onValueChange: i, defaultValue: a, orientation: o = "horizontal", ...s } = e, c = zf(Uf, n), [l, u] = on({
		prop: r,
		onChange: i,
		defaultProp: a ?? "",
		caller: Uf
	});
	return /* @__PURE__ */ h(Gf, {
		scope: n,
		isRootMenu: !1,
		value: l,
		dir: c.dir,
		orientation: o,
		rootNavigationMenu: c.rootNavigationMenu,
		onTriggerEnter: (e) => u(e),
		onItemSelect: (e) => u(e),
		onItemDismiss: () => u(""),
		children: /* @__PURE__ */ h(J.div, {
			"data-orientation": o,
			...s,
			ref: t
		})
	});
});
Wf.displayName = Uf;
var Gf = (t) => {
	let { scope: n, isRootMenu: r, rootNavigationMenu: i, dir: a, orientation: o, children: s, value: c, onItemSelect: l, onItemDismiss: u, onTriggerEnter: d, onTriggerLeave: f, onContentEnter: p, onContentLeave: m } = t, [g, _] = e.useState(null), [v, y] = e.useState(/* @__PURE__ */ new Map()), [b, x] = e.useState(null);
	return /* @__PURE__ */ h(Rf, {
		scope: n,
		isRootMenu: r,
		rootNavigationMenu: i,
		value: c,
		previousValue: wo(c),
		baseId: gn(),
		dir: a,
		orientation: o,
		viewport: g,
		onViewportChange: _,
		indicatorTrack: b,
		onIndicatorTrackChange: x,
		onTriggerEnter: X(d),
		onTriggerLeave: X(f),
		onContentEnter: X(p),
		onContentLeave: X(m),
		onItemSelect: X(l),
		onItemDismiss: X(u),
		onViewportContentChange: e.useCallback((e, t) => {
			y((n) => (n.set(e, t), new Map(n)));
		}, []),
		onViewportContentRemove: e.useCallback((e) => {
			y((t) => t.has(e) ? (t.delete(e), new Map(t)) : t);
		}, []),
		children: /* @__PURE__ */ h(Af.Provider, {
			scope: n,
			children: /* @__PURE__ */ h(Bf, {
				scope: n,
				items: v,
				children: s
			})
		})
	});
}, Kf = "NavigationMenuList", qf = e.forwardRef((e, t) => {
	let { __scopeNavigationMenu: n, ...r } = e, i = zf(Kf, n), a = /* @__PURE__ */ h(J.ul, {
		"data-orientation": i.orientation,
		...r,
		ref: t
	});
	return /* @__PURE__ */ h(J.div, {
		style: { position: "relative" },
		ref: i.onIndicatorTrackChange,
		children: /* @__PURE__ */ h(Af.Slot, {
			scope: n,
			children: i.isRootMenu ? /* @__PURE__ */ h(hp, {
				asChild: !0,
				children: a
			}) : a
		})
	});
});
qf.displayName = Kf;
var Jf = "NavigationMenuItem", [Yf, Xf] = If(Jf), Zf = e.forwardRef((t, n) => {
	let { __scopeNavigationMenu: r, value: i, ...a } = t, o = gn(), s = i || o || "LEGACY_REACT_AUTO_VALUE", c = e.useRef(null), l = e.useRef(null), u = e.useRef(null), d = e.useRef(() => {}), f = e.useRef(!1), p = e.useCallback((e = "start") => {
		if (c.current) {
			d.current();
			let t = yp(c.current);
			t.length && bp(e === "start" ? t : t.reverse());
		}
	}, []), m = e.useCallback(() => {
		if (c.current) {
			let e = yp(c.current);
			e.length && (d.current = xp(e));
		}
	}, []);
	return /* @__PURE__ */ h(Yf, {
		scope: r,
		value: s,
		triggerRef: l,
		contentRef: c,
		focusProxyRef: u,
		wasEscapeCloseRef: f,
		onEntryKeyDown: p,
		onFocusProxyEnter: p,
		onRootContentClose: m,
		onContentFocusOutside: m,
		children: /* @__PURE__ */ h(J.li, {
			...a,
			ref: n
		})
	});
});
Zf.displayName = Jf;
var Qf = "NavigationMenuTrigger", $f = e.forwardRef((t, n) => {
	let { __scopeNavigationMenu: r, disabled: i, ...a } = t, o = zf(Qf, t.__scopeNavigationMenu), s = Xf(Qf, t.__scopeNavigationMenu), c = e.useRef(null), l = q(c, s.triggerRef, n), u = wp(o.baseId, s.value), d = Tp(o.baseId, s.value), f = e.useRef(!1), p = e.useRef(!1), _ = s.value === o.value;
	return /* @__PURE__ */ g(m, { children: [/* @__PURE__ */ h(Af.ItemSlot, {
		scope: r,
		value: s.value,
		children: /* @__PURE__ */ h(vp, {
			asChild: !0,
			children: /* @__PURE__ */ h(J.button, {
				id: u,
				disabled: i,
				"data-disabled": i ? "" : void 0,
				"data-state": Cp(_),
				"aria-expanded": _,
				"aria-controls": d,
				...a,
				ref: l,
				onPointerEnter: Y(t.onPointerEnter, () => {
					p.current = !1, s.wasEscapeCloseRef.current = !1;
				}),
				onPointerMove: Y(t.onPointerMove, Ep(() => {
					i || p.current || s.wasEscapeCloseRef.current || f.current || (o.onTriggerEnter(s.value), f.current = !0);
				})),
				onPointerLeave: Y(t.onPointerLeave, Ep(() => {
					i || (o.onTriggerLeave(), f.current = !1);
				})),
				onClick: Y(t.onClick, () => {
					o.onItemSelect(s.value), p.current = _;
				}),
				onKeyDown: Y(t.onKeyDown, (e) => {
					let t = {
						horizontal: "ArrowDown",
						vertical: o.dir === "rtl" ? "ArrowLeft" : "ArrowRight"
					}[o.orientation];
					_ && e.key === t && (s.onEntryKeyDown(), e.preventDefault());
				})
			})
		})
	}), _ && /* @__PURE__ */ g(m, { children: [/* @__PURE__ */ h(Qt, {
		"aria-hidden": !0,
		tabIndex: 0,
		ref: s.focusProxyRef,
		onFocus: (e) => {
			let t = s.contentRef.current, n = e.relatedTarget, r = n === c.current, i = t?.contains(n);
			(r || !i) && s.onFocusProxyEnter(r ? "start" : "end");
		}
	}), o.viewport && /* @__PURE__ */ h("span", { "aria-owns": d })] })] });
});
$f.displayName = Qf;
var ep = "NavigationMenuLink", tp = "navigationMenu.linkSelect", np = e.forwardRef((e, t) => {
	let { __scopeNavigationMenu: n, active: r, onSelect: i, ...a } = e;
	return /* @__PURE__ */ h(vp, {
		asChild: !0,
		children: /* @__PURE__ */ h(J.a, {
			"data-active": r ? "" : void 0,
			"aria-current": r ? "page" : void 0,
			...a,
			ref: t,
			onClick: Y(e.onClick, (e) => {
				let t = e.target, n = new CustomEvent(tp, {
					bubbles: !0,
					cancelable: !0
				});
				t.addEventListener(tp, (e) => i?.(e), { once: !0 }), Jt(t, n), !n.defaultPrevented && !e.metaKey && Jt(t, new CustomEvent(lp, {
					bubbles: !0,
					cancelable: !0
				}));
			}, { checkForDefaultPrevented: !1 })
		})
	});
});
np.displayName = ep;
var rp = "NavigationMenuIndicator", ip = e.forwardRef((e, t) => {
	let { forceMount: n, ...r } = e, i = zf(rp, e.__scopeNavigationMenu), a = !!i.value;
	return i.indicatorTrack ? p.createPortal(/* @__PURE__ */ h(un, {
		present: n || a,
		children: /* @__PURE__ */ h(ap, {
			...r,
			ref: t
		})
	}), i.indicatorTrack) : null;
});
ip.displayName = rp;
var ap = e.forwardRef((t, n) => {
	let { __scopeNavigationMenu: r, ...i } = t, a = zf(rp, r), o = jf(r), [s, c] = e.useState(null), [l, u] = e.useState(null), d = a.orientation === "horizontal", f = !!a.value;
	e.useEffect(() => {
		let e = o().find((e) => e.value === a.value)?.ref.current;
		e && c(e);
	}, [o, a.value]);
	let p = () => {
		s && u({
			size: d ? s.offsetWidth : s.offsetHeight,
			offset: d ? s.offsetLeft : s.offsetTop
		});
	};
	return Sp(s, p), Sp(a.indicatorTrack, p), l ? /* @__PURE__ */ h(J.div, {
		"aria-hidden": !0,
		"data-state": f ? "visible" : "hidden",
		"data-orientation": a.orientation,
		...i,
		ref: n,
		style: {
			position: "absolute",
			...d ? {
				left: 0,
				width: l.size + "px",
				transform: `translateX(${l.offset}px)`
			} : {
				top: 0,
				height: l.size + "px",
				transform: `translateY(${l.offset}px)`
			},
			...i.style
		}
	}) : null;
}), op = "NavigationMenuContent", sp = e.forwardRef((e, t) => {
	let { forceMount: n, ...r } = e, i = zf(op, e.__scopeNavigationMenu), a = Xf(op, e.__scopeNavigationMenu), o = q(a.contentRef, t), s = a.value === i.value, c = {
		value: a.value,
		triggerRef: a.triggerRef,
		focusProxyRef: a.focusProxyRef,
		wasEscapeCloseRef: a.wasEscapeCloseRef,
		onContentFocusOutside: a.onContentFocusOutside,
		onRootContentClose: a.onRootContentClose,
		...r
	};
	return i.viewport ? /* @__PURE__ */ h(cp, {
		forceMount: n,
		...c,
		ref: o
	}) : /* @__PURE__ */ h(un, {
		present: n || s,
		children: /* @__PURE__ */ h(up, {
			"data-state": Cp(s),
			...c,
			ref: o,
			onPointerEnter: Y(e.onPointerEnter, i.onContentEnter),
			onPointerLeave: Y(e.onPointerLeave, Ep(i.onContentLeave)),
			style: {
				pointerEvents: !s && i.isRootMenu ? "none" : void 0,
				...c.style
			}
		})
	});
});
sp.displayName = op;
var cp = e.forwardRef((e, t) => {
	let { onViewportContentChange: n, onViewportContentRemove: r } = zf(op, e.__scopeNavigationMenu);
	return rn(() => {
		n(e.value, {
			ref: t,
			...e
		});
	}, [
		e,
		t,
		n
	]), rn(() => () => r(e.value), [e.value, r]), null;
}), lp = "navigationMenu.rootContentDismiss", up = e.forwardRef((t, n) => {
	let { __scopeNavigationMenu: r, value: i, triggerRef: a, focusProxyRef: o, wasEscapeCloseRef: s, onRootContentClose: c, onContentFocusOutside: l, ...u } = t, d = zf(op, r), f = e.useRef(null), p = q(f, n), m = wp(d.baseId, i), g = Tp(d.baseId, i), _ = jf(r), v = e.useRef(null), { onItemDismiss: y } = d;
	return e.useEffect(() => {
		let e = f.current;
		if (d.isRootMenu && e) {
			let t = () => {
				y(), c(), e.contains(document.activeElement) && a.current?.focus();
			};
			return e.addEventListener(lp, t), () => e.removeEventListener(lp, t);
		}
	}, [
		d.isRootMenu,
		t.value,
		a,
		y,
		c
	]), /* @__PURE__ */ h(hp, {
		asChild: !0,
		children: /* @__PURE__ */ h(xr, {
			id: g,
			"aria-labelledby": m,
			"data-motion": e.useMemo(() => {
				let e = _().map((e) => e.value);
				d.dir === "rtl" && e.reverse();
				let t = e.indexOf(d.value), n = e.indexOf(d.previousValue), r = i === d.value, a = n === e.indexOf(i);
				if (!r && !a) return v.current;
				let o = (() => {
					if (t !== n) {
						if (r && n !== -1) return t > n ? "from-end" : "from-start";
						if (a && t !== -1) return t > n ? "to-start" : "to-end";
					}
					return null;
				})();
				return v.current = o, o;
			}, [
				d.previousValue,
				d.value,
				d.dir,
				_,
				i
			]),
			"data-orientation": d.orientation,
			...u,
			ref: p,
			disableOutsidePointerEvents: !1,
			onDismiss: () => {
				let e = new Event(lp, {
					bubbles: !0,
					cancelable: !0
				});
				f.current?.dispatchEvent(e);
			},
			onFocusOutside: Y(t.onFocusOutside, (e) => {
				l();
				let t = e.target;
				d.rootNavigationMenu?.contains(t) && e.preventDefault();
			}),
			onPointerDownOutside: Y(t.onPointerDownOutside, (e) => {
				let t = e.target, n = _().some((e) => e.ref.current?.contains(t)), r = d.isRootMenu && d.viewport?.contains(t);
				(n || r || !d.isRootMenu) && e.preventDefault();
			}),
			onKeyDown: Y(t.onKeyDown, (e) => {
				let t = e.altKey || e.ctrlKey || e.metaKey;
				if (e.key === "Tab" && !t) {
					let t = yp(e.currentTarget), n = document.activeElement, r = t.findIndex((e) => e === n);
					bp(e.shiftKey ? t.slice(0, r).reverse() : t.slice(r + 1, t.length)) ? e.preventDefault() : o.current?.focus();
				}
			}),
			onEscapeKeyDown: Y(t.onEscapeKeyDown, (e) => {
				s.current = !0;
			})
		})
	});
}), dp = "NavigationMenuViewport", fp = e.forwardRef((e, t) => {
	let { forceMount: n, ...r } = e, i = !!zf(dp, e.__scopeNavigationMenu).value;
	return /* @__PURE__ */ h(un, {
		present: n || i,
		children: /* @__PURE__ */ h(pp, {
			...r,
			ref: t
		})
	});
});
fp.displayName = dp;
var pp = e.forwardRef((t, n) => {
	let { __scopeNavigationMenu: r, children: i, ...a } = t, o = zf(dp, r), s = q(n, o.onViewportChange), c = Vf(op, t.__scopeNavigationMenu), [l, u] = e.useState(null), [d, f] = e.useState(null), p = l ? l?.width + "px" : void 0, m = l ? l?.height + "px" : void 0, g = !!o.value, _ = g ? o.value : o.previousValue;
	return Sp(d, () => {
		d && u({
			width: d.offsetWidth,
			height: d.offsetHeight
		});
	}), /* @__PURE__ */ h(J.div, {
		"data-state": Cp(g),
		"data-orientation": o.orientation,
		...a,
		ref: s,
		style: {
			pointerEvents: !g && o.isRootMenu ? "none" : void 0,
			"--radix-navigation-menu-viewport-width": p,
			"--radix-navigation-menu-viewport-height": m,
			...a.style
		},
		onPointerEnter: Y(t.onPointerEnter, o.onContentEnter),
		onPointerLeave: Y(t.onPointerLeave, Ep(o.onContentLeave)),
		children: Array.from(c.items).map(([e, { ref: t, forceMount: n, ...r }]) => {
			let i = _ === e;
			return /* @__PURE__ */ h(un, {
				present: n || i,
				children: /* @__PURE__ */ h(up, {
					...r,
					ref: zt(t, (e) => {
						i && e && f(e);
					})
				})
			}, e);
		})
	});
}), mp = "FocusGroup", hp = e.forwardRef((e, t) => {
	let { __scopeNavigationMenu: n, ...r } = e, i = zf(mp, n);
	return /* @__PURE__ */ h(Nf.Provider, {
		scope: n,
		children: /* @__PURE__ */ h(Nf.Slot, {
			scope: n,
			children: /* @__PURE__ */ h(J.div, {
				dir: i.dir,
				...r,
				ref: t
			})
		})
	});
}), gp = [
	"ArrowRight",
	"ArrowLeft",
	"ArrowUp",
	"ArrowDown"
], _p = "FocusGroupItem", vp = e.forwardRef((e, t) => {
	let { __scopeNavigationMenu: n, ...r } = e, i = Pf(n), a = zf(_p, n);
	return /* @__PURE__ */ h(Nf.ItemSlot, {
		scope: n,
		children: /* @__PURE__ */ h(J.button, {
			...r,
			ref: t,
			onKeyDown: Y(e.onKeyDown, (e) => {
				if ([
					"Home",
					"End",
					...gp
				].includes(e.key)) {
					let t = i().map((e) => e.ref.current);
					if ([
						a.dir === "rtl" ? "ArrowRight" : "ArrowLeft",
						"ArrowUp",
						"End"
					].includes(e.key) && t.reverse(), gp.includes(e.key)) {
						let n = t.indexOf(e.currentTarget);
						t = t.slice(n + 1);
					}
					setTimeout(() => bp(t)), e.preventDefault();
				}
			})
		})
	});
});
function yp(e) {
	let t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: (e) => {
		let t = e.tagName === "INPUT" && e.type === "hidden";
		return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	for (; n.nextNode();) t.push(n.currentNode);
	return t;
}
function bp(e) {
	let t = document.activeElement;
	return e.some((e) => e === t ? !0 : (e.focus(), document.activeElement !== t));
}
function xp(e) {
	return e.forEach((e) => {
		e.dataset.tabindex = e.getAttribute("tabindex") || "", e.setAttribute("tabindex", "-1");
	}), () => {
		e.forEach((e) => {
			let t = e.dataset.tabindex;
			e.setAttribute("tabindex", t);
		});
	};
}
function Sp(e, t) {
	let n = X(t);
	rn(() => {
		let t = 0;
		if (e) {
			let r = new ResizeObserver(() => {
				cancelAnimationFrame(t), t = window.requestAnimationFrame(n);
			});
			return r.observe(e), () => {
				window.cancelAnimationFrame(t), r.unobserve(e);
			};
		}
	}, [e, n]);
}
function Cp(e) {
	return e ? "open" : "closed";
}
function wp(e, t) {
	return `${e}-trigger-${t}`;
}
function Tp(e, t) {
	return `${e}-content-${t}`;
}
function Ep(e) {
	return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var Dp = Hf, Op = qf, kp = Zf, Ap = $f, jp = np, Mp = ip, Np = sp, Pp = fp;
//#endregion
//#region node_modules/.pnpm/@radix-ui+number@1.1.1/node_modules/@radix-ui/number/dist/index.mjs
function Fp(e, [t, n]) {
	return Math.min(n, Math.max(t, e));
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-popover@1.1.15_@types+react-dom@19.2.3_@types+react@19.2.14__@types+rea_70579f2082d5a15782122fa6c39e7d95/node_modules/@radix-ui/react-popover/dist/index.mjs
var Ip = "Popover", [Lp, Rp] = en(Ip, [al]), zp = al(), [Bp, Vp] = Lp(Ip), Hp = (t) => {
	let { __scopePopover: n, children: r, open: i, defaultOpen: a, onOpenChange: o, modal: s = !1 } = t, c = zp(n), l = e.useRef(null), [u, d] = e.useState(!1), [f, p] = on({
		prop: i,
		defaultProp: a ?? !1,
		onChange: o,
		caller: Ip
	});
	return /* @__PURE__ */ h(xl, {
		...c,
		children: /* @__PURE__ */ h(Bp, {
			scope: n,
			contentId: gn(),
			triggerRef: l,
			open: f,
			onOpenChange: p,
			onOpenToggle: e.useCallback(() => p((e) => !e), [p]),
			hasCustomAnchor: u,
			onCustomAnchorAdd: e.useCallback(() => d(!0), []),
			onCustomAnchorRemove: e.useCallback(() => d(!1), []),
			modal: s,
			children: r
		})
	});
};
Hp.displayName = Ip;
var Up = "PopoverAnchor", Wp = e.forwardRef((t, n) => {
	let { __scopePopover: r, ...i } = t, a = Vp(Up, r), o = zp(r), { onCustomAnchorAdd: s, onCustomAnchorRemove: c } = a;
	return e.useEffect(() => (s(), () => c()), [s, c]), /* @__PURE__ */ h(Sl, {
		...o,
		...i,
		ref: n
	});
});
Wp.displayName = Up;
var Gp = "PopoverTrigger", Kp = e.forwardRef((e, t) => {
	let { __scopePopover: n, ...r } = e, i = Vp(Gp, n), a = zp(n), o = q(t, i.triggerRef), s = /* @__PURE__ */ h(J.button, {
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": i.open,
		"aria-controls": i.contentId,
		"data-state": sm(i.open),
		...r,
		ref: o,
		onClick: Y(e.onClick, i.onOpenToggle)
	});
	return i.hasCustomAnchor ? s : /* @__PURE__ */ h(Sl, {
		asChild: !0,
		...a,
		children: s
	});
});
Kp.displayName = Gp;
var qp = "PopoverPortal", [Jp, Yp] = Lp(qp, { forceMount: void 0 }), Xp = (e) => {
	let { __scopePopover: t, forceMount: n, children: r, container: i } = e, a = Vp(qp, t);
	return /* @__PURE__ */ h(Jp, {
		scope: t,
		forceMount: n,
		children: /* @__PURE__ */ h(un, {
			present: n || a.open,
			children: /* @__PURE__ */ h(qr, {
				asChild: !0,
				container: i,
				children: r
			})
		})
	});
};
Xp.displayName = qp;
var Zp = "PopoverContent", Qp = e.forwardRef((e, t) => {
	let n = Yp(Zp, e.__scopePopover), { forceMount: r = n.forceMount, ...i } = e, a = Vp(Zp, e.__scopePopover);
	return /* @__PURE__ */ h(un, {
		present: r || a.open,
		children: a.modal ? /* @__PURE__ */ h(em, {
			...i,
			ref: t
		}) : /* @__PURE__ */ h(tm, {
			...i,
			ref: t
		})
	});
});
Qp.displayName = Zp;
var $p = /* @__PURE__ */ Bt("PopoverContent.RemoveScroll"), em = e.forwardRef((t, n) => {
	let r = Vp(Zp, t.__scopePopover), i = e.useRef(null), a = q(n, i), o = e.useRef(!1);
	return e.useEffect(() => {
		let e = i.current;
		if (e) return ma(e);
	}, []), /* @__PURE__ */ h(aa, {
		as: $p,
		allowPinchZoom: !0,
		children: /* @__PURE__ */ h(nm, {
			...t,
			ref: a,
			trapFocus: r.open,
			disableOutsidePointerEvents: !0,
			onCloseAutoFocus: Y(t.onCloseAutoFocus, (e) => {
				e.preventDefault(), o.current || r.triggerRef.current?.focus();
			}),
			onPointerDownOutside: Y(t.onPointerDownOutside, (e) => {
				let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0;
				o.current = t.button === 2 || n;
			}, { checkForDefaultPrevented: !1 }),
			onFocusOutside: Y(t.onFocusOutside, (e) => e.preventDefault(), { checkForDefaultPrevented: !1 })
		})
	});
}), tm = e.forwardRef((t, n) => {
	let r = Vp(Zp, t.__scopePopover), i = e.useRef(!1), a = e.useRef(!1);
	return /* @__PURE__ */ h(nm, {
		...t,
		ref: n,
		trapFocus: !1,
		disableOutsidePointerEvents: !1,
		onCloseAutoFocus: (e) => {
			t.onCloseAutoFocus?.(e), e.defaultPrevented || (i.current || r.triggerRef.current?.focus(), e.preventDefault()), i.current = !1, a.current = !1;
		},
		onInteractOutside: (e) => {
			t.onInteractOutside?.(e), e.defaultPrevented || (i.current = !0, e.detail.originalEvent.type === "pointerdown" && (a.current = !0));
			let n = e.target;
			r.triggerRef.current?.contains(n) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && a.current && e.preventDefault();
		}
	});
}), nm = e.forwardRef((e, t) => {
	let { __scopePopover: n, trapFocus: r, onOpenAutoFocus: i, onCloseAutoFocus: a, disableOutsidePointerEvents: o, onEscapeKeyDown: s, onPointerDownOutside: c, onFocusOutside: l, onInteractOutside: u, ...d } = e, f = Vp(Zp, n), p = zp(n);
	return Yr(), /* @__PURE__ */ h(Pr, {
		asChild: !0,
		loop: !0,
		trapped: r,
		onMountAutoFocus: i,
		onUnmountAutoFocus: a,
		children: /* @__PURE__ */ h(xr, {
			asChild: !0,
			disableOutsidePointerEvents: o,
			onInteractOutside: u,
			onEscapeKeyDown: s,
			onPointerDownOutside: c,
			onFocusOutside: l,
			onDismiss: () => f.onOpenChange(!1),
			children: /* @__PURE__ */ h(Cl, {
				"data-state": sm(f.open),
				role: "dialog",
				id: f.contentId,
				...p,
				...d,
				ref: t,
				style: {
					...d.style,
					"--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
					"--radix-popover-content-available-width": "var(--radix-popper-available-width)",
					"--radix-popover-content-available-height": "var(--radix-popper-available-height)",
					"--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
					"--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
				}
			})
		})
	});
}), rm = "PopoverClose", im = e.forwardRef((e, t) => {
	let { __scopePopover: n, ...r } = e, i = Vp(rm, n);
	return /* @__PURE__ */ h(J.button, {
		type: "button",
		...r,
		ref: t,
		onClick: Y(e.onClick, () => i.onOpenChange(!1))
	});
});
im.displayName = rm;
var am = "PopoverArrow", om = e.forwardRef((e, t) => {
	let { __scopePopover: n, ...r } = e;
	return /* @__PURE__ */ h(wl, {
		...zp(n),
		...r,
		ref: t
	});
});
om.displayName = am;
function sm(e) {
	return e ? "open" : "closed";
}
var cm = Hp, lm = Kp, um = Xp, dm = Qp, fm = "Progress", pm = 100, [mm, hm] = en(fm), [gm, _m] = mm(fm), vm = e.forwardRef((e, t) => {
	let { __scopeProgress: n, value: r = null, max: i, getValueLabel: a = xm, ...o } = e;
	(i || i === 0) && !wm(i) && console.error(Em(`${i}`, "Progress"));
	let s = wm(i) ? i : pm;
	r !== null && !Tm(r, s) && console.error(Dm(`${r}`, "Progress"));
	let c = Tm(r, s) ? r : null, l = Cm(c) ? a(c, s) : void 0;
	return /* @__PURE__ */ h(gm, {
		scope: n,
		value: c,
		max: s,
		children: /* @__PURE__ */ h(J.div, {
			"aria-valuemax": s,
			"aria-valuemin": 0,
			"aria-valuenow": Cm(c) ? c : void 0,
			"aria-valuetext": l,
			role: "progressbar",
			"data-state": Sm(c, s),
			"data-value": c ?? void 0,
			"data-max": s,
			...o,
			ref: t
		})
	});
});
vm.displayName = fm;
var ym = "ProgressIndicator", bm = e.forwardRef((e, t) => {
	let { __scopeProgress: n, ...r } = e, i = _m(ym, n);
	return /* @__PURE__ */ h(J.div, {
		"data-state": Sm(i.value, i.max),
		"data-value": i.value ?? void 0,
		"data-max": i.max,
		...r,
		ref: t
	});
});
bm.displayName = ym;
function xm(e, t) {
	return `${Math.round(e / t * 100)}%`;
}
function Sm(e, t) {
	return e == null ? "indeterminate" : e === t ? "complete" : "loading";
}
function Cm(e) {
	return typeof e == "number";
}
function wm(e) {
	return Cm(e) && !isNaN(e) && e > 0;
}
function Tm(e, t) {
	return Cm(e) && !isNaN(e) && e <= t && e >= 0;
}
function Em(e, t) {
	return `Invalid prop \`max\` of value \`${e}\` supplied to \`${t}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${pm}\`.`;
}
function Dm(e, t) {
	return `Invalid prop \`value\` of value \`${e}\` supplied to \`${t}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${pm} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Om = vm, km = bm, Am = "Radio", [jm, Mm] = en(Am), [Nm, Pm] = jm(Am), Fm = e.forwardRef((t, n) => {
	let { __scopeRadio: r, name: i, checked: a = !1, required: o, disabled: s, value: c = "on", onCheck: l, form: u, ...d } = t, [f, p] = e.useState(null), m = q(n, (e) => p(e)), _ = e.useRef(!1), v = f ? u || !!f.closest("form") : !0;
	return /* @__PURE__ */ g(Nm, {
		scope: r,
		checked: a,
		disabled: s,
		children: [/* @__PURE__ */ h(J.button, {
			type: "button",
			role: "radio",
			"aria-checked": a,
			"data-state": Bm(a),
			"data-disabled": s ? "" : void 0,
			disabled: s,
			value: c,
			...d,
			ref: m,
			onClick: Y(t.onClick, (e) => {
				a || l?.(), v && (_.current = e.isPropagationStopped(), _.current || e.stopPropagation());
			})
		}), v && /* @__PURE__ */ h(zm, {
			control: f,
			bubbles: !_.current,
			name: i,
			value: c,
			checked: a,
			required: o,
			disabled: s,
			form: u,
			style: { transform: "translateX(-100%)" }
		})]
	});
});
Fm.displayName = Am;
var Im = "RadioIndicator", Lm = e.forwardRef((e, t) => {
	let { __scopeRadio: n, forceMount: r, ...i } = e, a = Pm(Im, n);
	return /* @__PURE__ */ h(un, {
		present: r || a.checked,
		children: /* @__PURE__ */ h(J.span, {
			"data-state": Bm(a.checked),
			"data-disabled": a.disabled ? "" : void 0,
			...i,
			ref: t
		})
	});
});
Lm.displayName = Im;
var Rm = "RadioBubbleInput", zm = e.forwardRef(({ __scopeRadio: t, control: n, checked: r, bubbles: i = !0, ...a }, o) => {
	let s = e.useRef(null), c = q(s, o), l = wo(r), u = To(n);
	return e.useEffect(() => {
		let e = s.current;
		if (!e) return;
		let t = window.HTMLInputElement.prototype, n = Object.getOwnPropertyDescriptor(t, "checked").set;
		if (l !== r && n) {
			let t = new Event("click", { bubbles: i });
			n.call(e, r), e.dispatchEvent(t);
		}
	}, [
		l,
		r,
		i
	]), /* @__PURE__ */ h(J.input, {
		type: "radio",
		"aria-hidden": !0,
		defaultChecked: r,
		...a,
		tabIndex: -1,
		ref: c,
		style: {
			...a.style,
			...u,
			position: "absolute",
			pointerEvents: "none",
			opacity: 0,
			margin: 0
		}
	});
});
zm.displayName = Rm;
function Bm(e) {
	return e ? "checked" : "unchecked";
}
var Vm = [
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight"
], Hm = "RadioGroup", [Um, Wm] = en(Hm, [Ml, Mm]), Gm = Ml(), Km = Mm(), [qm, Jm] = Um(Hm), Ym = e.forwardRef((e, t) => {
	let { __scopeRadioGroup: n, name: r, defaultValue: i, value: a, required: o = !1, disabled: s = !1, orientation: c, dir: l, loop: u = !0, onValueChange: d, ...f } = e, p = Gm(n), m = Nn(l), [g, _] = on({
		prop: a,
		defaultProp: i ?? null,
		onChange: d,
		caller: Hm
	});
	return /* @__PURE__ */ h(qm, {
		scope: n,
		name: r,
		required: o,
		disabled: s,
		value: g,
		onValueChange: _,
		children: /* @__PURE__ */ h(Wl, {
			asChild: !0,
			...p,
			orientation: c,
			dir: m,
			loop: u,
			children: /* @__PURE__ */ h(J.div, {
				role: "radiogroup",
				"aria-required": o,
				"aria-orientation": c,
				"data-disabled": s ? "" : void 0,
				dir: m,
				...f,
				ref: t
			})
		})
	});
});
Ym.displayName = Hm;
var Xm = "RadioGroupItem", Zm = e.forwardRef((t, n) => {
	let { __scopeRadioGroup: r, disabled: i, ...a } = t, o = Jm(Xm, r), s = o.disabled || i, c = Gm(r), l = Km(r), u = e.useRef(null), d = q(n, u), f = o.value === a.value, p = e.useRef(!1);
	return e.useEffect(() => {
		let e = (e) => {
			Vm.includes(e.key) && (p.current = !0);
		}, t = () => p.current = !1;
		return document.addEventListener("keydown", e), document.addEventListener("keyup", t), () => {
			document.removeEventListener("keydown", e), document.removeEventListener("keyup", t);
		};
	}, []), /* @__PURE__ */ h(Gl, {
		asChild: !0,
		...c,
		focusable: !s,
		active: f,
		children: /* @__PURE__ */ h(Fm, {
			disabled: s,
			required: o.required,
			checked: f,
			...l,
			...a,
			name: o.name,
			ref: d,
			onCheck: () => o.onValueChange(a.value),
			onKeyDown: Y((e) => {
				e.key === "Enter" && e.preventDefault();
			}),
			onFocus: Y(a.onFocus, () => {
				p.current && u.current?.click();
			})
		})
	});
});
Zm.displayName = Xm;
var Qm = "RadioGroupIndicator", $m = e.forwardRef((e, t) => {
	let { __scopeRadioGroup: n, ...r } = e;
	return /* @__PURE__ */ h(Lm, {
		...Km(n),
		...r,
		ref: t
	});
});
$m.displayName = Qm;
var eh = Ym, th = Zm, nh = $m;
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-scroll-area@1.2.10_@types+react-dom@19.2.3_@types+react@19.2.14__@types_3f2ac5445210224aefd6333ca2197426/node_modules/@radix-ui/react-scroll-area/dist/index.mjs
function rh(t, n) {
	return e.useReducer((e, t) => n[e][t] ?? e, t);
}
var ih = "ScrollArea", [ah, oh] = en(ih), [sh, ch] = ah(ih), lh = e.forwardRef((t, n) => {
	let { __scopeScrollArea: r, type: i = "hover", dir: a, scrollHideDelay: o = 600, ...s } = t, [c, l] = e.useState(null), [u, d] = e.useState(null), [f, p] = e.useState(null), [m, g] = e.useState(null), [_, v] = e.useState(null), [y, b] = e.useState(0), [x, S] = e.useState(0), [C, w] = e.useState(!1), [T, E] = e.useState(!1), D = q(n, (e) => l(e)), O = Nn(a);
	return /* @__PURE__ */ h(sh, {
		scope: r,
		type: i,
		dir: O,
		scrollHideDelay: o,
		scrollArea: c,
		viewport: u,
		onViewportChange: d,
		content: f,
		onContentChange: p,
		scrollbarX: m,
		onScrollbarXChange: g,
		scrollbarXEnabled: C,
		onScrollbarXEnabledChange: w,
		scrollbarY: _,
		onScrollbarYChange: v,
		scrollbarYEnabled: T,
		onScrollbarYEnabledChange: E,
		onCornerWidthChange: b,
		onCornerHeightChange: S,
		children: /* @__PURE__ */ h(J.div, {
			dir: O,
			...s,
			ref: D,
			style: {
				position: "relative",
				"--radix-scroll-area-corner-width": y + "px",
				"--radix-scroll-area-corner-height": x + "px",
				...t.style
			}
		})
	});
});
lh.displayName = ih;
var uh = "ScrollAreaViewport", dh = e.forwardRef((t, n) => {
	let { __scopeScrollArea: r, children: i, nonce: a, ...o } = t, s = ch(uh, r), c = q(n, e.useRef(null), s.onViewportChange);
	return /* @__PURE__ */ g(m, { children: [/* @__PURE__ */ h("style", {
		dangerouslySetInnerHTML: { __html: "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}" },
		nonce: a
	}), /* @__PURE__ */ h(J.div, {
		"data-radix-scroll-area-viewport": "",
		...o,
		ref: c,
		style: {
			overflowX: s.scrollbarXEnabled ? "scroll" : "hidden",
			overflowY: s.scrollbarYEnabled ? "scroll" : "hidden",
			...t.style
		},
		children: /* @__PURE__ */ h("div", {
			ref: s.onContentChange,
			style: {
				minWidth: "100%",
				display: "table"
			},
			children: i
		})
	})] });
});
dh.displayName = uh;
var fh = "ScrollAreaScrollbar", ph = e.forwardRef((t, n) => {
	let { forceMount: r, ...i } = t, a = ch(fh, t.__scopeScrollArea), { onScrollbarXEnabledChange: o, onScrollbarYEnabledChange: s } = a, c = t.orientation === "horizontal";
	return e.useEffect(() => (c ? o(!0) : s(!0), () => {
		c ? o(!1) : s(!1);
	}), [
		c,
		o,
		s
	]), a.type === "hover" ? /* @__PURE__ */ h(mh, {
		...i,
		ref: n,
		forceMount: r
	}) : a.type === "scroll" ? /* @__PURE__ */ h(hh, {
		...i,
		ref: n,
		forceMount: r
	}) : a.type === "auto" ? /* @__PURE__ */ h(gh, {
		...i,
		ref: n,
		forceMount: r
	}) : a.type === "always" ? /* @__PURE__ */ h(_h, {
		...i,
		ref: n
	}) : null;
});
ph.displayName = fh;
var mh = e.forwardRef((t, n) => {
	let { forceMount: r, ...i } = t, a = ch(fh, t.__scopeScrollArea), [o, s] = e.useState(!1);
	return e.useEffect(() => {
		let e = a.scrollArea, t = 0;
		if (e) {
			let n = () => {
				window.clearTimeout(t), s(!0);
			}, r = () => {
				t = window.setTimeout(() => s(!1), a.scrollHideDelay);
			};
			return e.addEventListener("pointerenter", n), e.addEventListener("pointerleave", r), () => {
				window.clearTimeout(t), e.removeEventListener("pointerenter", n), e.removeEventListener("pointerleave", r);
			};
		}
	}, [a.scrollArea, a.scrollHideDelay]), /* @__PURE__ */ h(un, {
		present: r || o,
		children: /* @__PURE__ */ h(gh, {
			"data-state": o ? "visible" : "hidden",
			...i,
			ref: n
		})
	});
}), hh = e.forwardRef((t, n) => {
	let { forceMount: r, ...i } = t, a = ch(fh, t.__scopeScrollArea), o = t.orientation === "horizontal", s = Lh(() => l("SCROLL_END"), 100), [c, l] = rh("hidden", {
		hidden: { SCROLL: "scrolling" },
		scrolling: {
			SCROLL_END: "idle",
			POINTER_ENTER: "interacting"
		},
		interacting: {
			SCROLL: "interacting",
			POINTER_LEAVE: "idle"
		},
		idle: {
			HIDE: "hidden",
			SCROLL: "scrolling",
			POINTER_ENTER: "interacting"
		}
	});
	return e.useEffect(() => {
		if (c === "idle") {
			let e = window.setTimeout(() => l("HIDE"), a.scrollHideDelay);
			return () => window.clearTimeout(e);
		}
	}, [
		c,
		a.scrollHideDelay,
		l
	]), e.useEffect(() => {
		let e = a.viewport, t = o ? "scrollLeft" : "scrollTop";
		if (e) {
			let n = e[t], r = () => {
				let r = e[t];
				n !== r && (l("SCROLL"), s()), n = r;
			};
			return e.addEventListener("scroll", r), () => e.removeEventListener("scroll", r);
		}
	}, [
		a.viewport,
		o,
		l,
		s
	]), /* @__PURE__ */ h(un, {
		present: r || c !== "hidden",
		children: /* @__PURE__ */ h(_h, {
			"data-state": c === "hidden" ? "hidden" : "visible",
			...i,
			ref: n,
			onPointerEnter: Y(t.onPointerEnter, () => l("POINTER_ENTER")),
			onPointerLeave: Y(t.onPointerLeave, () => l("POINTER_LEAVE"))
		})
	});
}), gh = e.forwardRef((t, n) => {
	let r = ch(fh, t.__scopeScrollArea), { forceMount: i, ...a } = t, [o, s] = e.useState(!1), c = t.orientation === "horizontal", l = Lh(() => {
		if (r.viewport) {
			let e = r.viewport.offsetWidth < r.viewport.scrollWidth, t = r.viewport.offsetHeight < r.viewport.scrollHeight;
			s(c ? e : t);
		}
	}, 10);
	return Rh(r.viewport, l), Rh(r.content, l), /* @__PURE__ */ h(un, {
		present: i || o,
		children: /* @__PURE__ */ h(_h, {
			"data-state": o ? "visible" : "hidden",
			...a,
			ref: n
		})
	});
}), _h = e.forwardRef((t, n) => {
	let { orientation: r = "vertical", ...i } = t, a = ch(fh, t.__scopeScrollArea), o = e.useRef(null), s = e.useRef(0), [c, l] = e.useState({
		content: 0,
		viewport: 0,
		scrollbar: {
			size: 0,
			paddingStart: 0,
			paddingEnd: 0
		}
	}), u = Ah(c.viewport, c.content), d = {
		...i,
		sizes: c,
		onSizesChange: l,
		hasThumb: u > 0 && u < 1,
		onThumbChange: (e) => o.current = e,
		onThumbPointerUp: () => s.current = 0,
		onThumbPointerDown: (e) => s.current = e
	};
	function f(e, t) {
		return Mh(e, s.current, c, t);
	}
	return r === "horizontal" ? /* @__PURE__ */ h(vh, {
		...d,
		ref: n,
		onThumbPositionChange: () => {
			if (a.viewport && o.current) {
				let e = a.viewport.scrollLeft, t = Nh(e, c, a.dir);
				o.current.style.transform = `translate3d(${t}px, 0, 0)`;
			}
		},
		onWheelScroll: (e) => {
			a.viewport && (a.viewport.scrollLeft = e);
		},
		onDragScroll: (e) => {
			a.viewport && (a.viewport.scrollLeft = f(e, a.dir));
		}
	}) : r === "vertical" ? /* @__PURE__ */ h(yh, {
		...d,
		ref: n,
		onThumbPositionChange: () => {
			if (a.viewport && o.current) {
				let e = a.viewport.scrollTop, t = Nh(e, c);
				o.current.style.transform = `translate3d(0, ${t}px, 0)`;
			}
		},
		onWheelScroll: (e) => {
			a.viewport && (a.viewport.scrollTop = e);
		},
		onDragScroll: (e) => {
			a.viewport && (a.viewport.scrollTop = f(e));
		}
	}) : null;
}), vh = e.forwardRef((t, n) => {
	let { sizes: r, onSizesChange: i, ...a } = t, o = ch(fh, t.__scopeScrollArea), [s, c] = e.useState(), l = e.useRef(null), u = q(n, l, o.onScrollbarXChange);
	return e.useEffect(() => {
		l.current && c(getComputedStyle(l.current));
	}, [l]), /* @__PURE__ */ h(Sh, {
		"data-orientation": "horizontal",
		...a,
		ref: u,
		sizes: r,
		style: {
			bottom: 0,
			left: o.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
			right: o.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
			"--radix-scroll-area-thumb-width": jh(r) + "px",
			...t.style
		},
		onThumbPointerDown: (e) => t.onThumbPointerDown(e.x),
		onDragScroll: (e) => t.onDragScroll(e.x),
		onWheelScroll: (e, n) => {
			if (o.viewport) {
				let r = o.viewport.scrollLeft + e.deltaX;
				t.onWheelScroll(r), Fh(r, n) && e.preventDefault();
			}
		},
		onResize: () => {
			l.current && o.viewport && s && i({
				content: o.viewport.scrollWidth,
				viewport: o.viewport.offsetWidth,
				scrollbar: {
					size: l.current.clientWidth,
					paddingStart: kh(s.paddingLeft),
					paddingEnd: kh(s.paddingRight)
				}
			});
		}
	});
}), yh = e.forwardRef((t, n) => {
	let { sizes: r, onSizesChange: i, ...a } = t, o = ch(fh, t.__scopeScrollArea), [s, c] = e.useState(), l = e.useRef(null), u = q(n, l, o.onScrollbarYChange);
	return e.useEffect(() => {
		l.current && c(getComputedStyle(l.current));
	}, [l]), /* @__PURE__ */ h(Sh, {
		"data-orientation": "vertical",
		...a,
		ref: u,
		sizes: r,
		style: {
			top: 0,
			right: o.dir === "ltr" ? 0 : void 0,
			left: o.dir === "rtl" ? 0 : void 0,
			bottom: "var(--radix-scroll-area-corner-height)",
			"--radix-scroll-area-thumb-height": jh(r) + "px",
			...t.style
		},
		onThumbPointerDown: (e) => t.onThumbPointerDown(e.y),
		onDragScroll: (e) => t.onDragScroll(e.y),
		onWheelScroll: (e, n) => {
			if (o.viewport) {
				let r = o.viewport.scrollTop + e.deltaY;
				t.onWheelScroll(r), Fh(r, n) && e.preventDefault();
			}
		},
		onResize: () => {
			l.current && o.viewport && s && i({
				content: o.viewport.scrollHeight,
				viewport: o.viewport.offsetHeight,
				scrollbar: {
					size: l.current.clientHeight,
					paddingStart: kh(s.paddingTop),
					paddingEnd: kh(s.paddingBottom)
				}
			});
		}
	});
}), [bh, xh] = ah(fh), Sh = e.forwardRef((t, n) => {
	let { __scopeScrollArea: r, sizes: i, hasThumb: a, onThumbChange: o, onThumbPointerUp: s, onThumbPointerDown: c, onThumbPositionChange: l, onDragScroll: u, onWheelScroll: d, onResize: f, ...p } = t, m = ch(fh, r), [g, _] = e.useState(null), v = q(n, (e) => _(e)), y = e.useRef(null), b = e.useRef(""), x = m.viewport, S = i.content - i.viewport, C = X(d), w = X(l), T = Lh(f, 10);
	function E(e) {
		y.current && u({
			x: e.clientX - y.current.left,
			y: e.clientY - y.current.top
		});
	}
	return e.useEffect(() => {
		let e = (e) => {
			let t = e.target;
			g?.contains(t) && C(e, S);
		};
		return document.addEventListener("wheel", e, { passive: !1 }), () => document.removeEventListener("wheel", e, { passive: !1 });
	}, [
		x,
		g,
		S,
		C
	]), e.useEffect(w, [i, w]), Rh(g, T), Rh(m.content, T), /* @__PURE__ */ h(bh, {
		scope: r,
		scrollbar: g,
		hasThumb: a,
		onThumbChange: X(o),
		onThumbPointerUp: X(s),
		onThumbPositionChange: w,
		onThumbPointerDown: X(c),
		children: /* @__PURE__ */ h(J.div, {
			...p,
			ref: v,
			style: {
				position: "absolute",
				...p.style
			},
			onPointerDown: Y(t.onPointerDown, (e) => {
				e.button === 0 && (e.target.setPointerCapture(e.pointerId), y.current = g.getBoundingClientRect(), b.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", m.viewport && (m.viewport.style.scrollBehavior = "auto"), E(e));
			}),
			onPointerMove: Y(t.onPointerMove, E),
			onPointerUp: Y(t.onPointerUp, (e) => {
				let t = e.target;
				t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId), document.body.style.webkitUserSelect = b.current, m.viewport && (m.viewport.style.scrollBehavior = ""), y.current = null;
			})
		})
	});
}), Ch = "ScrollAreaThumb", wh = e.forwardRef((e, t) => {
	let { forceMount: n, ...r } = e, i = xh(Ch, e.__scopeScrollArea);
	return /* @__PURE__ */ h(un, {
		present: n || i.hasThumb,
		children: /* @__PURE__ */ h(Th, {
			ref: t,
			...r
		})
	});
}), Th = e.forwardRef((t, n) => {
	let { __scopeScrollArea: r, style: i, ...a } = t, o = ch(Ch, r), s = xh(Ch, r), { onThumbPositionChange: c } = s, l = q(n, (e) => s.onThumbChange(e)), u = e.useRef(void 0), d = Lh(() => {
		u.current &&= (u.current(), void 0);
	}, 100);
	return e.useEffect(() => {
		let e = o.viewport;
		if (e) {
			let t = () => {
				d(), u.current || (u.current = Ih(e, c), c());
			};
			return c(), e.addEventListener("scroll", t), () => e.removeEventListener("scroll", t);
		}
	}, [
		o.viewport,
		d,
		c
	]), /* @__PURE__ */ h(J.div, {
		"data-state": s.hasThumb ? "visible" : "hidden",
		...a,
		ref: l,
		style: {
			width: "var(--radix-scroll-area-thumb-width)",
			height: "var(--radix-scroll-area-thumb-height)",
			...i
		},
		onPointerDownCapture: Y(t.onPointerDownCapture, (e) => {
			let t = e.target.getBoundingClientRect(), n = e.clientX - t.left, r = e.clientY - t.top;
			s.onThumbPointerDown({
				x: n,
				y: r
			});
		}),
		onPointerUp: Y(t.onPointerUp, s.onThumbPointerUp)
	});
});
wh.displayName = Ch;
var Eh = "ScrollAreaCorner", Dh = e.forwardRef((e, t) => {
	let n = ch(Eh, e.__scopeScrollArea), r = !!(n.scrollbarX && n.scrollbarY);
	return n.type !== "scroll" && r ? /* @__PURE__ */ h(Oh, {
		...e,
		ref: t
	}) : null;
});
Dh.displayName = Eh;
var Oh = e.forwardRef((t, n) => {
	let { __scopeScrollArea: r, ...i } = t, a = ch(Eh, r), [o, s] = e.useState(0), [c, l] = e.useState(0), u = !!(o && c);
	return Rh(a.scrollbarX, () => {
		let e = a.scrollbarX?.offsetHeight || 0;
		a.onCornerHeightChange(e), l(e);
	}), Rh(a.scrollbarY, () => {
		let e = a.scrollbarY?.offsetWidth || 0;
		a.onCornerWidthChange(e), s(e);
	}), u ? /* @__PURE__ */ h(J.div, {
		...i,
		ref: n,
		style: {
			width: o,
			height: c,
			position: "absolute",
			right: a.dir === "ltr" ? 0 : void 0,
			left: a.dir === "rtl" ? 0 : void 0,
			bottom: 0,
			...t.style
		}
	}) : null;
});
function kh(e) {
	return e ? parseInt(e, 10) : 0;
}
function Ah(e, t) {
	let n = e / t;
	return isNaN(n) ? 0 : n;
}
function jh(e) {
	let t = Ah(e.viewport, e.content), n = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, r = (e.scrollbar.size - n) * t;
	return Math.max(r, 18);
}
function Mh(e, t, n, r = "ltr") {
	let i = jh(n), a = i / 2, o = t || a, s = i - o, c = n.scrollbar.paddingStart + o, l = n.scrollbar.size - n.scrollbar.paddingEnd - s, u = n.content - n.viewport, d = r === "ltr" ? [0, u] : [u * -1, 0];
	return Ph([c, l], d)(e);
}
function Nh(e, t, n = "ltr") {
	let r = jh(t), i = t.scrollbar.paddingStart + t.scrollbar.paddingEnd, a = t.scrollbar.size - i, o = t.content - t.viewport, s = a - r, c = Fp(e, n === "ltr" ? [0, o] : [o * -1, 0]);
	return Ph([0, o], [0, s])(c);
}
function Ph(e, t) {
	return (n) => {
		if (e[0] === e[1] || t[0] === t[1]) return t[0];
		let r = (t[1] - t[0]) / (e[1] - e[0]);
		return t[0] + r * (n - e[0]);
	};
}
function Fh(e, t) {
	return e > 0 && e < t;
}
var Ih = (e, t = () => {}) => {
	let n = {
		left: e.scrollLeft,
		top: e.scrollTop
	}, r = 0;
	return (function i() {
		let a = {
			left: e.scrollLeft,
			top: e.scrollTop
		}, o = n.left !== a.left, s = n.top !== a.top;
		(o || s) && t(), n = a, r = window.requestAnimationFrame(i);
	})(), () => window.cancelAnimationFrame(r);
};
function Lh(t, n) {
	let r = X(t), i = e.useRef(0);
	return e.useEffect(() => () => window.clearTimeout(i.current), []), e.useCallback(() => {
		window.clearTimeout(i.current), i.current = window.setTimeout(r, n);
	}, [r, n]);
}
function Rh(e, t) {
	let n = X(t);
	rn(() => {
		let t = 0;
		if (e) {
			let r = new ResizeObserver(() => {
				cancelAnimationFrame(t), t = window.requestAnimationFrame(n);
			});
			return r.observe(e), () => {
				window.cancelAnimationFrame(t), r.unobserve(e);
			};
		}
	}, [e, n]);
}
var zh = lh, Bh = dh, Vh = Dh, Hh = [
	" ",
	"Enter",
	"ArrowUp",
	"ArrowDown"
], Uh = [" ", "Enter"], Wh = "Select", [Gh, Kh, qh] = nn(Wh), [Jh, Yh] = en(Wh, [qh, al]), Xh = al(), [Zh, Qh] = Jh(Wh), [$h, eg] = Jh(Wh), tg = (t) => {
	let { __scopeSelect: n, children: r, open: i, defaultOpen: a, onOpenChange: o, value: s, defaultValue: c, onValueChange: l, dir: u, name: d, autoComplete: f, disabled: p, required: m, form: _ } = t, v = Xh(n), [y, b] = e.useState(null), [x, S] = e.useState(null), [C, w] = e.useState(!1), T = Nn(u), [E, D] = on({
		prop: i,
		defaultProp: a ?? !1,
		onChange: o,
		caller: Wh
	}), [O, k] = on({
		prop: s,
		defaultProp: c,
		onChange: l,
		caller: Wh
	}), A = e.useRef(null), j = y ? _ || !!y.closest("form") : !0, [M, N] = e.useState(/* @__PURE__ */ new Set()), P = Array.from(M).map((e) => e.props.value).join(";");
	return /* @__PURE__ */ h(xl, {
		...v,
		children: /* @__PURE__ */ g(Zh, {
			required: m,
			scope: n,
			trigger: y,
			onTriggerChange: b,
			valueNode: x,
			onValueNodeChange: S,
			valueNodeHasChildren: C,
			onValueNodeHasChildrenChange: w,
			contentId: gn(),
			value: O,
			onValueChange: k,
			open: E,
			onOpenChange: D,
			dir: T,
			triggerPointerDownPosRef: A,
			disabled: p,
			children: [/* @__PURE__ */ h(Gh.Provider, {
				scope: n,
				children: /* @__PURE__ */ h($h, {
					scope: t.__scopeSelect,
					onNativeOptionAdd: e.useCallback((e) => {
						N((t) => new Set(t).add(e));
					}, []),
					onNativeOptionRemove: e.useCallback((e) => {
						N((t) => {
							let n = new Set(t);
							return n.delete(e), n;
						});
					}, []),
					children: r
				})
			}), j ? /* @__PURE__ */ g(Xg, {
				"aria-hidden": !0,
				required: m,
				tabIndex: -1,
				name: d,
				autoComplete: f,
				value: O,
				onChange: (e) => k(e.target.value),
				disabled: p,
				form: _,
				children: [O === void 0 ? /* @__PURE__ */ h("option", { value: "" }) : null, Array.from(M)]
			}, P) : null]
		})
	});
};
tg.displayName = Wh;
var ng = "SelectTrigger", rg = e.forwardRef((t, n) => {
	let { __scopeSelect: r, disabled: i = !1, ...a } = t, o = Xh(r), s = Qh(ng, r), c = s.disabled || i, l = q(n, s.onTriggerChange), u = Kh(r), d = e.useRef("touch"), [f, p, m] = Qg((e) => {
		let t = u().filter((e) => !e.disabled), n = $g(t, e, t.find((e) => e.value === s.value));
		n !== void 0 && s.onValueChange(n.value);
	}), g = (e) => {
		c || (s.onOpenChange(!0), m()), e && (s.triggerPointerDownPosRef.current = {
			x: Math.round(e.pageX),
			y: Math.round(e.pageY)
		});
	};
	return /* @__PURE__ */ h(Sl, {
		asChild: !0,
		...o,
		children: /* @__PURE__ */ h(J.button, {
			type: "button",
			role: "combobox",
			"aria-controls": s.contentId,
			"aria-expanded": s.open,
			"aria-required": s.required,
			"aria-autocomplete": "none",
			dir: s.dir,
			"data-state": s.open ? "open" : "closed",
			disabled: c,
			"data-disabled": c ? "" : void 0,
			"data-placeholder": Zg(s.value) ? "" : void 0,
			...a,
			ref: l,
			onClick: Y(a.onClick, (e) => {
				e.currentTarget.focus(), d.current !== "mouse" && g(e);
			}),
			onPointerDown: Y(a.onPointerDown, (e) => {
				d.current = e.pointerType;
				let t = e.target;
				t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId), e.button === 0 && e.ctrlKey === !1 && e.pointerType === "mouse" && (g(e), e.preventDefault());
			}),
			onKeyDown: Y(a.onKeyDown, (e) => {
				let t = f.current !== "";
				!(e.ctrlKey || e.altKey || e.metaKey) && e.key.length === 1 && p(e.key), !(t && e.key === " ") && Hh.includes(e.key) && (g(), e.preventDefault());
			})
		})
	});
});
rg.displayName = ng;
var ig = "SelectValue", ag = e.forwardRef((e, t) => {
	let { __scopeSelect: n, className: r, style: i, children: a, placeholder: o = "", ...s } = e, c = Qh(ig, n), { onValueNodeHasChildrenChange: l } = c, u = a !== void 0, d = q(t, c.onValueNodeChange);
	return rn(() => {
		l(u);
	}, [l, u]), /* @__PURE__ */ h(J.span, {
		...s,
		ref: d,
		style: { pointerEvents: "none" },
		children: Zg(c.value) ? /* @__PURE__ */ h(m, { children: o }) : a
	});
});
ag.displayName = ig;
var og = "SelectIcon", sg = e.forwardRef((e, t) => {
	let { __scopeSelect: n, children: r, ...i } = e;
	return /* @__PURE__ */ h(J.span, {
		"aria-hidden": !0,
		...i,
		ref: t,
		children: r || "▼"
	});
});
sg.displayName = og;
var cg = "SelectPortal", lg = (e) => /* @__PURE__ */ h(qr, {
	asChild: !0,
	...e
});
lg.displayName = cg;
var ug = "SelectContent", dg = e.forwardRef((t, n) => {
	let r = Qh(ug, t.__scopeSelect), [i, a] = e.useState();
	if (rn(() => {
		a(new DocumentFragment());
	}, []), !r.open) {
		let e = i;
		return e ? f.createPortal(/* @__PURE__ */ h(pg, {
			scope: t.__scopeSelect,
			children: /* @__PURE__ */ h(Gh.Slot, {
				scope: t.__scopeSelect,
				children: /* @__PURE__ */ h("div", { children: t.children })
			})
		}), e) : null;
	}
	return /* @__PURE__ */ h(_g, {
		...t,
		ref: n
	});
});
dg.displayName = ug;
var fg = 10, [pg, mg] = Jh(ug), hg = "SelectContentImpl", gg = /* @__PURE__ */ Bt("SelectContent.RemoveScroll"), _g = e.forwardRef((t, n) => {
	let { __scopeSelect: r, position: i = "item-aligned", onCloseAutoFocus: a, onEscapeKeyDown: o, onPointerDownOutside: s, side: c, sideOffset: l, align: u, alignOffset: d, arrowPadding: f, collisionBoundary: p, collisionPadding: m, sticky: g, hideWhenDetached: _, avoidCollisions: v, ...y } = t, b = Qh(ug, r), [x, S] = e.useState(null), [C, w] = e.useState(null), T = q(n, (e) => S(e)), [E, D] = e.useState(null), [O, k] = e.useState(null), A = Kh(r), [j, M] = e.useState(!1), N = e.useRef(!1);
	e.useEffect(() => {
		if (x) return ma(x);
	}, [x]), Yr();
	let P = e.useCallback((e) => {
		let [t, ...n] = A().map((e) => e.ref.current), [r] = n.slice(-1), i = document.activeElement;
		for (let n of e) if (n === i || (n?.scrollIntoView({ block: "nearest" }), n === t && C && (C.scrollTop = 0), n === r && C && (C.scrollTop = C.scrollHeight), n?.focus(), document.activeElement !== i)) return;
	}, [A, C]), F = e.useCallback(() => P([E, x]), [
		P,
		E,
		x
	]);
	e.useEffect(() => {
		j && F();
	}, [j, F]);
	let { onOpenChange: I, triggerPointerDownPosRef: ee } = b;
	e.useEffect(() => {
		if (x) {
			let e = {
				x: 0,
				y: 0
			}, t = (t) => {
				e = {
					x: Math.abs(Math.round(t.pageX) - (ee.current?.x ?? 0)),
					y: Math.abs(Math.round(t.pageY) - (ee.current?.y ?? 0))
				};
			}, n = (n) => {
				e.x <= 10 && e.y <= 10 ? n.preventDefault() : x.contains(n.target) || I(!1), document.removeEventListener("pointermove", t), ee.current = null;
			};
			return ee.current !== null && (document.addEventListener("pointermove", t), document.addEventListener("pointerup", n, {
				capture: !0,
				once: !0
			})), () => {
				document.removeEventListener("pointermove", t), document.removeEventListener("pointerup", n, { capture: !0 });
			};
		}
	}, [
		x,
		I,
		ee
	]), e.useEffect(() => {
		let e = () => I(!1);
		return window.addEventListener("blur", e), window.addEventListener("resize", e), () => {
			window.removeEventListener("blur", e), window.removeEventListener("resize", e);
		};
	}, [I]);
	let [te, ne] = Qg((e) => {
		let t = A().filter((e) => !e.disabled), n = $g(t, e, t.find((e) => e.ref.current === document.activeElement));
		n && setTimeout(() => n.ref.current.focus());
	}), re = e.useCallback((e, t, n) => {
		let r = !N.current && !n;
		(b.value !== void 0 && b.value === t || r) && (D(e), r && (N.current = !0));
	}, [b.value]), L = e.useCallback(() => x?.focus(), [x]), R = e.useCallback((e, t, n) => {
		let r = !N.current && !n;
		(b.value !== void 0 && b.value === t || r) && k(e);
	}, [b.value]), ie = i === "popper" ? xg : yg, ae = ie === xg ? {
		side: c,
		sideOffset: l,
		align: u,
		alignOffset: d,
		arrowPadding: f,
		collisionBoundary: p,
		collisionPadding: m,
		sticky: g,
		hideWhenDetached: _,
		avoidCollisions: v
	} : {};
	return /* @__PURE__ */ h(pg, {
		scope: r,
		content: x,
		viewport: C,
		onViewportChange: w,
		itemRefCallback: re,
		selectedItem: E,
		onItemLeave: L,
		itemTextRefCallback: R,
		focusSelectedItem: F,
		selectedItemText: O,
		position: i,
		isPositioned: j,
		searchRef: te,
		children: /* @__PURE__ */ h(aa, {
			as: gg,
			allowPinchZoom: !0,
			children: /* @__PURE__ */ h(Pr, {
				asChild: !0,
				trapped: b.open,
				onMountAutoFocus: (e) => {
					e.preventDefault();
				},
				onUnmountAutoFocus: Y(a, (e) => {
					b.trigger?.focus({ preventScroll: !0 }), e.preventDefault();
				}),
				children: /* @__PURE__ */ h(xr, {
					asChild: !0,
					disableOutsidePointerEvents: !0,
					onEscapeKeyDown: o,
					onPointerDownOutside: s,
					onFocusOutside: (e) => e.preventDefault(),
					onDismiss: () => b.onOpenChange(!1),
					children: /* @__PURE__ */ h(ie, {
						role: "listbox",
						id: b.contentId,
						"data-state": b.open ? "open" : "closed",
						dir: b.dir,
						onContextMenu: (e) => e.preventDefault(),
						...y,
						...ae,
						onPlaced: () => M(!0),
						ref: T,
						style: {
							display: "flex",
							flexDirection: "column",
							outline: "none",
							...y.style
						},
						onKeyDown: Y(y.onKeyDown, (e) => {
							let t = e.ctrlKey || e.altKey || e.metaKey;
							if (e.key === "Tab" && e.preventDefault(), !t && e.key.length === 1 && ne(e.key), [
								"ArrowUp",
								"ArrowDown",
								"Home",
								"End"
							].includes(e.key)) {
								let t = A().filter((e) => !e.disabled).map((e) => e.ref.current);
								if (["ArrowUp", "End"].includes(e.key) && (t = t.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(e.key)) {
									let n = e.target, r = t.indexOf(n);
									t = t.slice(r + 1);
								}
								setTimeout(() => P(t)), e.preventDefault();
							}
						})
					})
				})
			})
		})
	});
});
_g.displayName = hg;
var vg = "SelectItemAlignedPosition", yg = e.forwardRef((t, n) => {
	let { __scopeSelect: r, onPlaced: i, ...a } = t, o = Qh(ug, r), s = mg(ug, r), [c, l] = e.useState(null), [u, d] = e.useState(null), f = q(n, (e) => d(e)), p = Kh(r), m = e.useRef(!1), g = e.useRef(!0), { viewport: _, selectedItem: v, selectedItemText: y, focusSelectedItem: b } = s, x = e.useCallback(() => {
		if (o.trigger && o.valueNode && c && u && _ && v && y) {
			let e = o.trigger.getBoundingClientRect(), t = u.getBoundingClientRect(), n = o.valueNode.getBoundingClientRect(), r = y.getBoundingClientRect();
			if (o.dir !== "rtl") {
				let i = r.left - t.left, a = n.left - i, o = e.left - a, s = e.width + o, l = Math.max(s, t.width), u = window.innerWidth - fg, d = Fp(a, [fg, Math.max(fg, u - l)]);
				c.style.minWidth = s + "px", c.style.left = d + "px";
			} else {
				let i = t.right - r.right, a = window.innerWidth - n.right - i, o = window.innerWidth - e.right - a, s = e.width + o, l = Math.max(s, t.width), u = window.innerWidth - fg, d = Fp(a, [fg, Math.max(fg, u - l)]);
				c.style.minWidth = s + "px", c.style.right = d + "px";
			}
			let a = p(), s = window.innerHeight - fg * 2, l = _.scrollHeight, d = window.getComputedStyle(u), f = parseInt(d.borderTopWidth, 10), h = parseInt(d.paddingTop, 10), g = parseInt(d.borderBottomWidth, 10), b = parseInt(d.paddingBottom, 10), x = f + h + l + b + g, S = Math.min(v.offsetHeight * 5, x), C = window.getComputedStyle(_), w = parseInt(C.paddingTop, 10), T = parseInt(C.paddingBottom, 10), E = e.top + e.height / 2 - fg, D = s - E, O = v.offsetHeight / 2, k = v.offsetTop + O, A = f + h + k, j = x - A;
			if (A <= E) {
				let e = a.length > 0 && v === a[a.length - 1].ref.current;
				c.style.bottom = "0px";
				let t = u.clientHeight - _.offsetTop - _.offsetHeight, n = A + Math.max(D, O + (e ? T : 0) + t + g);
				c.style.height = n + "px";
			} else {
				let e = a.length > 0 && v === a[0].ref.current;
				c.style.top = "0px";
				let t = Math.max(E, f + _.offsetTop + (e ? w : 0) + O) + j;
				c.style.height = t + "px", _.scrollTop = A - E + _.offsetTop;
			}
			c.style.margin = `${fg}px 0`, c.style.minHeight = S + "px", c.style.maxHeight = s + "px", i?.(), requestAnimationFrame(() => m.current = !0);
		}
	}, [
		p,
		o.trigger,
		o.valueNode,
		c,
		u,
		_,
		v,
		y,
		o.dir,
		i
	]);
	rn(() => x(), [x]);
	let [S, C] = e.useState();
	return rn(() => {
		u && C(window.getComputedStyle(u).zIndex);
	}, [u]), /* @__PURE__ */ h(Sg, {
		scope: r,
		contentWrapper: c,
		shouldExpandOnScrollRef: m,
		onScrollButtonChange: e.useCallback((e) => {
			e && g.current === !0 && (x(), b?.(), g.current = !1);
		}, [x, b]),
		children: /* @__PURE__ */ h("div", {
			ref: l,
			style: {
				display: "flex",
				flexDirection: "column",
				position: "fixed",
				zIndex: S
			},
			children: /* @__PURE__ */ h(J.div, {
				...a,
				ref: f,
				style: {
					boxSizing: "border-box",
					maxHeight: "100%",
					...a.style
				}
			})
		})
	});
});
yg.displayName = vg;
var bg = "SelectPopperPosition", xg = e.forwardRef((e, t) => {
	let { __scopeSelect: n, align: r = "start", collisionPadding: i = fg, ...a } = e;
	return /* @__PURE__ */ h(Cl, {
		...Xh(n),
		...a,
		ref: t,
		align: r,
		collisionPadding: i,
		style: {
			boxSizing: "border-box",
			...a.style,
			"--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-select-content-available-width": "var(--radix-popper-available-width)",
			"--radix-select-content-available-height": "var(--radix-popper-available-height)",
			"--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
xg.displayName = bg;
var [Sg, Cg] = Jh(ug, {}), wg = "SelectViewport", Tg = e.forwardRef((t, n) => {
	let { __scopeSelect: r, nonce: i, ...a } = t, o = mg(wg, r), s = Cg(wg, r), c = q(n, o.onViewportChange), l = e.useRef(0);
	return /* @__PURE__ */ g(m, { children: [/* @__PURE__ */ h("style", {
		dangerouslySetInnerHTML: { __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}" },
		nonce: i
	}), /* @__PURE__ */ h(Gh.Slot, {
		scope: r,
		children: /* @__PURE__ */ h(J.div, {
			"data-radix-select-viewport": "",
			role: "presentation",
			...a,
			ref: c,
			style: {
				position: "relative",
				flex: 1,
				overflow: "hidden auto",
				...a.style
			},
			onScroll: Y(a.onScroll, (e) => {
				let t = e.currentTarget, { contentWrapper: n, shouldExpandOnScrollRef: r } = s;
				if (r?.current && n) {
					let e = Math.abs(l.current - t.scrollTop);
					if (e > 0) {
						let r = window.innerHeight - fg * 2, i = parseFloat(n.style.minHeight), a = parseFloat(n.style.height), o = Math.max(i, a);
						if (o < r) {
							let i = o + e, a = Math.min(r, i), s = i - a;
							n.style.height = a + "px", n.style.bottom === "0px" && (t.scrollTop = s > 0 ? s : 0, n.style.justifyContent = "flex-end");
						}
					}
				}
				l.current = t.scrollTop;
			})
		})
	})] });
});
Tg.displayName = wg;
var Eg = "SelectGroup", [Dg, Og] = Jh(Eg), kg = e.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e, i = gn();
	return /* @__PURE__ */ h(Dg, {
		scope: n,
		id: i,
		children: /* @__PURE__ */ h(J.div, {
			role: "group",
			"aria-labelledby": i,
			...r,
			ref: t
		})
	});
});
kg.displayName = Eg;
var Ag = "SelectLabel", jg = e.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e, i = Og(Ag, n);
	return /* @__PURE__ */ h(J.div, {
		id: i.id,
		...r,
		ref: t
	});
});
jg.displayName = Ag;
var Mg = "SelectItem", [Ng, Pg] = Jh(Mg), Fg = e.forwardRef((t, n) => {
	let { __scopeSelect: r, value: i, disabled: a = !1, textValue: o, ...s } = t, c = Qh(Mg, r), l = mg(Mg, r), u = c.value === i, [d, f] = e.useState(o ?? ""), [p, m] = e.useState(!1), g = q(n, (e) => l.itemRefCallback?.(e, i, a)), _ = gn(), v = e.useRef("touch"), y = () => {
		a || (c.onValueChange(i), c.onOpenChange(!1));
	};
	if (i === "") throw Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
	return /* @__PURE__ */ h(Ng, {
		scope: r,
		value: i,
		disabled: a,
		textId: _,
		isSelected: u,
		onItemTextChange: e.useCallback((e) => {
			f((t) => t || (e?.textContent ?? "").trim());
		}, []),
		children: /* @__PURE__ */ h(Gh.ItemSlot, {
			scope: r,
			value: i,
			disabled: a,
			textValue: d,
			children: /* @__PURE__ */ h(J.div, {
				role: "option",
				"aria-labelledby": _,
				"data-highlighted": p ? "" : void 0,
				"aria-selected": u && p,
				"data-state": u ? "checked" : "unchecked",
				"aria-disabled": a || void 0,
				"data-disabled": a ? "" : void 0,
				tabIndex: a ? void 0 : -1,
				...s,
				ref: g,
				onFocus: Y(s.onFocus, () => m(!0)),
				onBlur: Y(s.onBlur, () => m(!1)),
				onClick: Y(s.onClick, () => {
					v.current !== "mouse" && y();
				}),
				onPointerUp: Y(s.onPointerUp, () => {
					v.current === "mouse" && y();
				}),
				onPointerDown: Y(s.onPointerDown, (e) => {
					v.current = e.pointerType;
				}),
				onPointerMove: Y(s.onPointerMove, (e) => {
					v.current = e.pointerType, a ? l.onItemLeave?.() : v.current === "mouse" && e.currentTarget.focus({ preventScroll: !0 });
				}),
				onPointerLeave: Y(s.onPointerLeave, (e) => {
					e.currentTarget === document.activeElement && l.onItemLeave?.();
				}),
				onKeyDown: Y(s.onKeyDown, (e) => {
					l.searchRef?.current !== "" && e.key === " " || (Uh.includes(e.key) && y(), e.key === " " && e.preventDefault());
				})
			})
		})
	});
});
Fg.displayName = Mg;
var Ig = "SelectItemText", Lg = e.forwardRef((t, n) => {
	let { __scopeSelect: r, className: i, style: a, ...o } = t, s = Qh(Ig, r), c = mg(Ig, r), l = Pg(Ig, r), u = eg(Ig, r), [d, p] = e.useState(null), _ = q(n, (e) => p(e), l.onItemTextChange, (e) => c.itemTextRefCallback?.(e, l.value, l.disabled)), v = d?.textContent, y = e.useMemo(() => /* @__PURE__ */ h("option", {
		value: l.value,
		disabled: l.disabled,
		children: v
	}, l.value), [
		l.disabled,
		l.value,
		v
	]), { onNativeOptionAdd: b, onNativeOptionRemove: x } = u;
	return rn(() => (b(y), () => x(y)), [
		b,
		x,
		y
	]), /* @__PURE__ */ g(m, { children: [/* @__PURE__ */ h(J.span, {
		id: l.textId,
		...o,
		ref: _
	}), l.isSelected && s.valueNode && !s.valueNodeHasChildren ? f.createPortal(o.children, s.valueNode) : null] });
});
Lg.displayName = Ig;
var Rg = "SelectItemIndicator", zg = e.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e;
	return Pg(Rg, n).isSelected ? /* @__PURE__ */ h(J.span, {
		"aria-hidden": !0,
		...r,
		ref: t
	}) : null;
});
zg.displayName = Rg;
var Bg = "SelectScrollUpButton", Vg = e.forwardRef((t, n) => {
	let r = mg(Bg, t.__scopeSelect), i = Cg(Bg, t.__scopeSelect), [a, o] = e.useState(!1), s = q(n, i.onScrollButtonChange);
	return rn(() => {
		if (r.viewport && r.isPositioned) {
			let e = function() {
				o(t.scrollTop > 0);
			}, t = r.viewport;
			return e(), t.addEventListener("scroll", e), () => t.removeEventListener("scroll", e);
		}
	}, [r.viewport, r.isPositioned]), a ? /* @__PURE__ */ h(Wg, {
		...t,
		ref: s,
		onAutoScroll: () => {
			let { viewport: e, selectedItem: t } = r;
			e && t && (e.scrollTop -= t.offsetHeight);
		}
	}) : null;
});
Vg.displayName = Bg;
var Hg = "SelectScrollDownButton", Ug = e.forwardRef((t, n) => {
	let r = mg(Hg, t.__scopeSelect), i = Cg(Hg, t.__scopeSelect), [a, o] = e.useState(!1), s = q(n, i.onScrollButtonChange);
	return rn(() => {
		if (r.viewport && r.isPositioned) {
			let e = function() {
				let e = t.scrollHeight - t.clientHeight;
				o(Math.ceil(t.scrollTop) < e);
			}, t = r.viewport;
			return e(), t.addEventListener("scroll", e), () => t.removeEventListener("scroll", e);
		}
	}, [r.viewport, r.isPositioned]), a ? /* @__PURE__ */ h(Wg, {
		...t,
		ref: s,
		onAutoScroll: () => {
			let { viewport: e, selectedItem: t } = r;
			e && t && (e.scrollTop += t.offsetHeight);
		}
	}) : null;
});
Ug.displayName = Hg;
var Wg = e.forwardRef((t, n) => {
	let { __scopeSelect: r, onAutoScroll: i, ...a } = t, o = mg("SelectScrollButton", r), s = e.useRef(null), c = Kh(r), l = e.useCallback(() => {
		s.current !== null && (window.clearInterval(s.current), s.current = null);
	}, []);
	return e.useEffect(() => () => l(), [l]), rn(() => {
		c().find((e) => e.ref.current === document.activeElement)?.ref.current?.scrollIntoView({ block: "nearest" });
	}, [c]), /* @__PURE__ */ h(J.div, {
		"aria-hidden": !0,
		...a,
		ref: n,
		style: {
			flexShrink: 0,
			...a.style
		},
		onPointerDown: Y(a.onPointerDown, () => {
			s.current === null && (s.current = window.setInterval(i, 50));
		}),
		onPointerMove: Y(a.onPointerMove, () => {
			o.onItemLeave?.(), s.current === null && (s.current = window.setInterval(i, 50));
		}),
		onPointerLeave: Y(a.onPointerLeave, () => {
			l();
		})
	});
}), Gg = "SelectSeparator", Kg = e.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e;
	return /* @__PURE__ */ h(J.div, {
		"aria-hidden": !0,
		...r,
		ref: t
	});
});
Kg.displayName = Gg;
var qg = "SelectArrow", Jg = e.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e, i = Xh(n), a = Qh(qg, n), o = mg(qg, n);
	return a.open && o.position === "popper" ? /* @__PURE__ */ h(wl, {
		...i,
		...r,
		ref: t
	}) : null;
});
Jg.displayName = qg;
var Yg = "SelectBubbleInput", Xg = e.forwardRef(({ __scopeSelect: t, value: n, ...r }, i) => {
	let a = e.useRef(null), o = q(i, a), s = wo(n);
	return e.useEffect(() => {
		let e = a.current;
		if (!e) return;
		let t = window.HTMLSelectElement.prototype, r = Object.getOwnPropertyDescriptor(t, "value").set;
		if (s !== n && r) {
			let t = new Event("change", { bubbles: !0 });
			r.call(e, n), e.dispatchEvent(t);
		}
	}, [s, n]), /* @__PURE__ */ h(J.select, {
		...r,
		style: {
			...Yt,
			...r.style
		},
		ref: o,
		defaultValue: n
	});
});
Xg.displayName = Yg;
function Zg(e) {
	return e === "" || e === void 0;
}
function Qg(t) {
	let n = X(t), r = e.useRef(""), i = e.useRef(0), a = e.useCallback((e) => {
		let t = r.current + e;
		n(t), (function e(t) {
			r.current = t, window.clearTimeout(i.current), t !== "" && (i.current = window.setTimeout(() => e(""), 1e3));
		})(t);
	}, [n]), o = e.useCallback(() => {
		r.current = "", window.clearTimeout(i.current);
	}, []);
	return e.useEffect(() => () => window.clearTimeout(i.current), []), [
		r,
		a,
		o
	];
}
function $g(e, t, n) {
	let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1, a = e_(e, Math.max(i, 0));
	r.length === 1 && (a = a.filter((e) => e !== n));
	let o = a.find((e) => e.textValue.toLowerCase().startsWith(r.toLowerCase()));
	return o === n ? void 0 : o;
}
function e_(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
var t_ = tg, n_ = rg, r_ = ag, i_ = sg, a_ = lg, o_ = dg, s_ = Tg, c_ = kg, l_ = jg, u_ = Fg, d_ = Lg, f_ = zg, p_ = Vg, m_ = Ug, h_ = Kg, g_ = "Separator", __ = "horizontal", v_ = ["horizontal", "vertical"], y_ = e.forwardRef((e, t) => {
	let { decorative: n, orientation: r = __, ...i } = e, a = b_(r) ? r : __, o = n ? { role: "none" } : {
		"aria-orientation": a === "vertical" ? a : void 0,
		role: "separator"
	};
	return /* @__PURE__ */ h(J.div, {
		"data-orientation": a,
		...o,
		...i,
		ref: t
	});
});
y_.displayName = g_;
function b_(e) {
	return v_.includes(e);
}
var x_ = y_, S_ = ["PageUp", "PageDown"], C_ = [
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight"
], w_ = {
	"from-left": [
		"Home",
		"PageDown",
		"ArrowDown",
		"ArrowLeft"
	],
	"from-right": [
		"Home",
		"PageDown",
		"ArrowDown",
		"ArrowRight"
	],
	"from-bottom": [
		"Home",
		"PageDown",
		"ArrowDown",
		"ArrowLeft"
	],
	"from-top": [
		"Home",
		"PageDown",
		"ArrowUp",
		"ArrowLeft"
	]
}, T_ = "Slider", [E_, D_, O_] = nn(T_), [k_, A_] = en(T_, [O_]), [j_, M_] = k_(T_), N_ = e.forwardRef((t, n) => {
	let { name: r, min: i = 0, max: a = 100, step: o = 1, orientation: s = "horizontal", disabled: c = !1, minStepsBetweenThumbs: l = 0, defaultValue: u = [i], value: d, onValueChange: f = () => {}, onValueCommit: p = () => {}, inverted: m = !1, form: g, ..._ } = t, v = e.useRef(/* @__PURE__ */ new Set()), y = e.useRef(0), b = s === "horizontal" ? I_ : L_, [x = [], S] = on({
		prop: d,
		defaultProp: u,
		onChange: (e) => {
			[...v.current][y.current]?.focus(), f(e);
		}
	}), C = e.useRef(x);
	function w(e) {
		D(e, Z_(x, e));
	}
	function T(e) {
		D(e, y.current);
	}
	function E() {
		let e = C.current[y.current];
		x[y.current] !== e && p(x);
	}
	function D(e, t, { commit: n } = { commit: !1 }) {
		let r = nv(o), s = Fp(rv(Math.round((e - i) / o) * o + i, r), [i, a]);
		S((e = []) => {
			let r = J_(e, s, t);
			if (ev(r, l * o)) {
				y.current = r.indexOf(s);
				let t = String(r) !== String(e);
				return t && n && p(r), t ? r : e;
			} else return e;
		});
	}
	return /* @__PURE__ */ h(j_, {
		scope: t.__scopeSlider,
		name: r,
		disabled: c,
		min: i,
		max: a,
		valueIndexToChangeRef: y,
		thumbs: v.current,
		values: x,
		orientation: s,
		form: g,
		children: /* @__PURE__ */ h(E_.Provider, {
			scope: t.__scopeSlider,
			children: /* @__PURE__ */ h(E_.Slot, {
				scope: t.__scopeSlider,
				children: /* @__PURE__ */ h(b, {
					"aria-disabled": c,
					"data-disabled": c ? "" : void 0,
					..._,
					ref: n,
					onPointerDown: Y(_.onPointerDown, () => {
						c || (C.current = x);
					}),
					min: i,
					max: a,
					inverted: m,
					onSlideStart: c ? void 0 : w,
					onSlideMove: c ? void 0 : T,
					onSlideEnd: c ? void 0 : E,
					onHomeKeyDown: () => !c && D(i, 0, { commit: !0 }),
					onEndKeyDown: () => !c && D(a, x.length - 1, { commit: !0 }),
					onStepKeyDown: ({ event: e, direction: t }) => {
						if (!c) {
							let n = S_.includes(e.key) || e.shiftKey && C_.includes(e.key) ? 10 : 1, r = y.current, i = x[r];
							D(i + o * n * t, r, { commit: !0 });
						}
					}
				})
			})
		})
	});
});
N_.displayName = T_;
var [P_, F_] = k_(T_, {
	startEdge: "left",
	endEdge: "right",
	size: "width",
	direction: 1
}), I_ = e.forwardRef((t, n) => {
	let { min: r, max: i, dir: a, inverted: o, onSlideStart: s, onSlideMove: c, onSlideEnd: l, onStepKeyDown: u, ...d } = t, [f, p] = e.useState(null), m = q(n, (e) => p(e)), g = e.useRef(void 0), _ = Nn(a), v = _ === "ltr", y = v && !o || !v && o;
	function b(e) {
		let t = g.current || f.getBoundingClientRect(), n = tv([0, t.width], y ? [r, i] : [i, r]);
		return g.current = t, n(e - t.left);
	}
	return /* @__PURE__ */ h(P_, {
		scope: t.__scopeSlider,
		startEdge: y ? "left" : "right",
		endEdge: y ? "right" : "left",
		direction: y ? 1 : -1,
		size: "width",
		children: /* @__PURE__ */ h(R_, {
			dir: _,
			"data-orientation": "horizontal",
			...d,
			ref: m,
			style: {
				...d.style,
				"--radix-slider-thumb-transform": "translateX(-50%)"
			},
			onSlideStart: (e) => {
				let t = b(e.clientX);
				s?.(t);
			},
			onSlideMove: (e) => {
				let t = b(e.clientX);
				c?.(t);
			},
			onSlideEnd: () => {
				g.current = void 0, l?.();
			},
			onStepKeyDown: (e) => {
				let t = w_[y ? "from-left" : "from-right"].includes(e.key);
				u?.({
					event: e,
					direction: t ? -1 : 1
				});
			}
		})
	});
}), L_ = e.forwardRef((t, n) => {
	let { min: r, max: i, inverted: a, onSlideStart: o, onSlideMove: s, onSlideEnd: c, onStepKeyDown: l, ...u } = t, d = e.useRef(null), f = q(n, d), p = e.useRef(void 0), m = !a;
	function g(e) {
		let t = p.current || d.current.getBoundingClientRect(), n = tv([0, t.height], m ? [i, r] : [r, i]);
		return p.current = t, n(e - t.top);
	}
	return /* @__PURE__ */ h(P_, {
		scope: t.__scopeSlider,
		startEdge: m ? "bottom" : "top",
		endEdge: m ? "top" : "bottom",
		size: "height",
		direction: m ? 1 : -1,
		children: /* @__PURE__ */ h(R_, {
			"data-orientation": "vertical",
			...u,
			ref: f,
			style: {
				...u.style,
				"--radix-slider-thumb-transform": "translateY(50%)"
			},
			onSlideStart: (e) => {
				let t = g(e.clientY);
				o?.(t);
			},
			onSlideMove: (e) => {
				let t = g(e.clientY);
				s?.(t);
			},
			onSlideEnd: () => {
				p.current = void 0, c?.();
			},
			onStepKeyDown: (e) => {
				let t = w_[m ? "from-bottom" : "from-top"].includes(e.key);
				l?.({
					event: e,
					direction: t ? -1 : 1
				});
			}
		})
	});
}), R_ = e.forwardRef((e, t) => {
	let { __scopeSlider: n, onSlideStart: r, onSlideMove: i, onSlideEnd: a, onHomeKeyDown: o, onEndKeyDown: s, onStepKeyDown: c, ...l } = e, u = M_(T_, n);
	return /* @__PURE__ */ h(J.span, {
		...l,
		ref: t,
		onKeyDown: Y(e.onKeyDown, (e) => {
			e.key === "Home" ? (o(e), e.preventDefault()) : e.key === "End" ? (s(e), e.preventDefault()) : S_.concat(C_).includes(e.key) && (c(e), e.preventDefault());
		}),
		onPointerDown: Y(e.onPointerDown, (e) => {
			let t = e.target;
			t.setPointerCapture(e.pointerId), e.preventDefault(), u.thumbs.has(t) ? t.focus() : r(e);
		}),
		onPointerMove: Y(e.onPointerMove, (e) => {
			e.target.hasPointerCapture(e.pointerId) && i(e);
		}),
		onPointerUp: Y(e.onPointerUp, (e) => {
			let t = e.target;
			t.hasPointerCapture(e.pointerId) && (t.releasePointerCapture(e.pointerId), a(e));
		})
	});
}), z_ = "SliderTrack", B_ = e.forwardRef((e, t) => {
	let { __scopeSlider: n, ...r } = e, i = M_(z_, n);
	return /* @__PURE__ */ h(J.span, {
		"data-disabled": i.disabled ? "" : void 0,
		"data-orientation": i.orientation,
		...r,
		ref: t
	});
});
B_.displayName = z_;
var V_ = "SliderRange", H_ = e.forwardRef((t, n) => {
	let { __scopeSlider: r, ...i } = t, a = M_(V_, r), o = F_(V_, r), s = q(n, e.useRef(null)), c = a.values.length, l = a.values.map((e) => Y_(e, a.min, a.max)), u = c > 1 ? Math.min(...l) : 0, d = 100 - Math.max(...l);
	return /* @__PURE__ */ h(J.span, {
		"data-orientation": a.orientation,
		"data-disabled": a.disabled ? "" : void 0,
		...i,
		ref: s,
		style: {
			...t.style,
			[o.startEdge]: u + "%",
			[o.endEdge]: d + "%"
		}
	});
});
H_.displayName = V_;
var U_ = "SliderThumb", W_ = e.forwardRef((t, n) => {
	let r = D_(t.__scopeSlider), [i, a] = e.useState(null), o = q(n, (e) => a(e)), s = e.useMemo(() => i ? r().findIndex((e) => e.ref.current === i) : -1, [r, i]);
	return /* @__PURE__ */ h(G_, {
		...t,
		ref: o,
		index: s
	});
}), G_ = e.forwardRef((t, n) => {
	let { __scopeSlider: r, index: i, name: a, ...o } = t, s = M_(U_, r), c = F_(U_, r), [l, u] = e.useState(null), d = q(n, (e) => u(e)), f = l ? s.form || !!l.closest("form") : !0, p = To(l), m = s.values[i], _ = m === void 0 ? 0 : Y_(m, s.min, s.max), v = X_(i, s.values.length), y = p?.[c.size], b = y ? Q_(y, _, c.direction) : 0;
	return e.useEffect(() => {
		if (l) return s.thumbs.add(l), () => {
			s.thumbs.delete(l);
		};
	}, [l, s.thumbs]), /* @__PURE__ */ g("span", {
		style: {
			transform: "var(--radix-slider-thumb-transform)",
			position: "absolute",
			[c.startEdge]: `calc(${_}% + ${b}px)`
		},
		children: [/* @__PURE__ */ h(E_.ItemSlot, {
			scope: t.__scopeSlider,
			children: /* @__PURE__ */ h(J.span, {
				role: "slider",
				"aria-label": t["aria-label"] || v,
				"aria-valuemin": s.min,
				"aria-valuenow": m,
				"aria-valuemax": s.max,
				"aria-orientation": s.orientation,
				"data-orientation": s.orientation,
				"data-disabled": s.disabled ? "" : void 0,
				tabIndex: s.disabled ? void 0 : 0,
				...o,
				ref: d,
				style: m === void 0 ? { display: "none" } : t.style,
				onFocus: Y(t.onFocus, () => {
					s.valueIndexToChangeRef.current = i;
				})
			})
		}), f && /* @__PURE__ */ h(q_, {
			name: a ?? (s.name ? s.name + (s.values.length > 1 ? "[]" : "") : void 0),
			form: s.form,
			value: m
		}, i)]
	});
});
W_.displayName = U_;
var K_ = "RadioBubbleInput", q_ = e.forwardRef(({ __scopeSlider: t, value: n, ...r }, i) => {
	let a = e.useRef(null), o = q(a, i), s = wo(n);
	return e.useEffect(() => {
		let e = a.current;
		if (!e) return;
		let t = window.HTMLInputElement.prototype, r = Object.getOwnPropertyDescriptor(t, "value").set;
		if (s !== n && r) {
			let t = new Event("input", { bubbles: !0 });
			r.call(e, n), e.dispatchEvent(t);
		}
	}, [s, n]), /* @__PURE__ */ h(J.input, {
		style: { display: "none" },
		...r,
		ref: o,
		defaultValue: n
	});
});
q_.displayName = K_;
function J_(e = [], t, n) {
	let r = [...e];
	return r[n] = t, r.sort((e, t) => e - t);
}
function Y_(e, t, n) {
	return Fp(100 / (n - t) * (e - t), [0, 100]);
}
function X_(e, t) {
	if (t > 2) return `Value ${e + 1} of ${t}`;
	if (t === 2) return ["Minimum", "Maximum"][e];
}
function Z_(e, t) {
	if (e.length === 1) return 0;
	let n = e.map((e) => Math.abs(e - t)), r = Math.min(...n);
	return n.indexOf(r);
}
function Q_(e, t, n) {
	let r = e / 2;
	return (r - tv([0, 50], [0, r])(t) * n) * n;
}
function $_(e) {
	return e.slice(0, -1).map((t, n) => e[n + 1] - t);
}
function ev(e, t) {
	if (t > 0) {
		let n = $_(e);
		return Math.min(...n) >= t;
	}
	return !0;
}
function tv(e, t) {
	return (n) => {
		if (e[0] === e[1] || t[0] === t[1]) return t[0];
		let r = (t[1] - t[0]) / (e[1] - e[0]);
		return t[0] + r * (n - e[0]);
	};
}
function nv(e) {
	return (String(e).split(".")[1] || "").length;
}
function rv(e, t) {
	let n = 10 ** t;
	return Math.round(e * n) / n;
}
var iv = N_, av = B_, ov = H_, sv = W_, cv = "Switch", [lv, uv] = en(cv), [dv, fv] = lv(cv), pv = e.forwardRef((t, n) => {
	let { __scopeSwitch: r, name: i, checked: a, defaultChecked: o, required: s, disabled: c, value: l = "on", onCheckedChange: u, form: d, ...f } = t, [p, m] = e.useState(null), _ = q(n, (e) => m(e)), v = e.useRef(!1), y = p ? d || !!p.closest("form") : !0, [b, x] = on({
		prop: a,
		defaultProp: o ?? !1,
		onChange: u,
		caller: cv
	});
	return /* @__PURE__ */ g(dv, {
		scope: r,
		checked: b,
		disabled: c,
		children: [/* @__PURE__ */ h(J.button, {
			type: "button",
			role: "switch",
			"aria-checked": b,
			"aria-required": s,
			"data-state": vv(b),
			"data-disabled": c ? "" : void 0,
			disabled: c,
			value: l,
			...f,
			ref: _,
			onClick: Y(t.onClick, (e) => {
				x((e) => !e), y && (v.current = e.isPropagationStopped(), v.current || e.stopPropagation());
			})
		}), y && /* @__PURE__ */ h(_v, {
			control: p,
			bubbles: !v.current,
			name: i,
			value: l,
			checked: b,
			required: s,
			disabled: c,
			form: d,
			style: { transform: "translateX(-100%)" }
		})]
	});
});
pv.displayName = cv;
var mv = "SwitchThumb", hv = e.forwardRef((e, t) => {
	let { __scopeSwitch: n, ...r } = e, i = fv(mv, n);
	return /* @__PURE__ */ h(J.span, {
		"data-state": vv(i.checked),
		"data-disabled": i.disabled ? "" : void 0,
		...r,
		ref: t
	});
});
hv.displayName = mv;
var gv = "SwitchBubbleInput", _v = e.forwardRef(({ __scopeSwitch: t, control: n, checked: r, bubbles: i = !0, ...a }, o) => {
	let s = e.useRef(null), c = q(s, o), l = wo(r), u = To(n);
	return e.useEffect(() => {
		let e = s.current;
		if (!e) return;
		let t = window.HTMLInputElement.prototype, n = Object.getOwnPropertyDescriptor(t, "checked").set;
		if (l !== r && n) {
			let t = new Event("click", { bubbles: i });
			n.call(e, r), e.dispatchEvent(t);
		}
	}, [
		l,
		r,
		i
	]), /* @__PURE__ */ h("input", {
		type: "checkbox",
		"aria-hidden": !0,
		defaultChecked: r,
		...a,
		tabIndex: -1,
		ref: c,
		style: {
			...a.style,
			...u,
			position: "absolute",
			pointerEvents: "none",
			opacity: 0,
			margin: 0
		}
	});
});
_v.displayName = gv;
function vv(e) {
	return e ? "checked" : "unchecked";
}
var yv = pv, bv = hv, xv = "Tabs", [Sv, Cv] = en(xv, [Ml]), wv = Ml(), [Tv, Ev] = Sv(xv), Dv = e.forwardRef((e, t) => {
	let { __scopeTabs: n, value: r, onValueChange: i, defaultValue: a, orientation: o = "horizontal", dir: s, activationMode: c = "automatic", ...l } = e, u = Nn(s), [d, f] = on({
		prop: r,
		onChange: i,
		defaultProp: a ?? "",
		caller: xv
	});
	return /* @__PURE__ */ h(Tv, {
		scope: n,
		baseId: gn(),
		value: d,
		onValueChange: f,
		orientation: o,
		dir: u,
		activationMode: c,
		children: /* @__PURE__ */ h(J.div, {
			dir: u,
			"data-orientation": o,
			...l,
			ref: t
		})
	});
});
Dv.displayName = xv;
var Ov = "TabsList", kv = e.forwardRef((e, t) => {
	let { __scopeTabs: n, loop: r = !0, ...i } = e, a = Ev(Ov, n);
	return /* @__PURE__ */ h(Wl, {
		asChild: !0,
		...wv(n),
		orientation: a.orientation,
		dir: a.dir,
		loop: r,
		children: /* @__PURE__ */ h(J.div, {
			role: "tablist",
			"aria-orientation": a.orientation,
			...i,
			ref: t
		})
	});
});
kv.displayName = Ov;
var Av = "TabsTrigger", jv = e.forwardRef((e, t) => {
	let { __scopeTabs: n, value: r, disabled: i = !1, ...a } = e, o = Ev(Av, n), s = wv(n), c = Pv(o.baseId, r), l = Fv(o.baseId, r), u = r === o.value;
	return /* @__PURE__ */ h(Gl, {
		asChild: !0,
		...s,
		focusable: !i,
		active: u,
		children: /* @__PURE__ */ h(J.button, {
			type: "button",
			role: "tab",
			"aria-selected": u,
			"aria-controls": l,
			"data-state": u ? "active" : "inactive",
			"data-disabled": i ? "" : void 0,
			disabled: i,
			id: c,
			...a,
			ref: t,
			onMouseDown: Y(e.onMouseDown, (e) => {
				!i && e.button === 0 && e.ctrlKey === !1 ? o.onValueChange(r) : e.preventDefault();
			}),
			onKeyDown: Y(e.onKeyDown, (e) => {
				[" ", "Enter"].includes(e.key) && o.onValueChange(r);
			}),
			onFocus: Y(e.onFocus, () => {
				let e = o.activationMode !== "manual";
				!u && !i && e && o.onValueChange(r);
			})
		})
	});
});
jv.displayName = Av;
var Mv = "TabsContent", Nv = e.forwardRef((t, n) => {
	let { __scopeTabs: r, value: i, forceMount: a, children: o, ...s } = t, c = Ev(Mv, r), l = Pv(c.baseId, i), u = Fv(c.baseId, i), d = i === c.value, f = e.useRef(d);
	return e.useEffect(() => {
		let e = requestAnimationFrame(() => f.current = !1);
		return () => cancelAnimationFrame(e);
	}, []), /* @__PURE__ */ h(un, {
		present: a || d,
		children: ({ present: e }) => /* @__PURE__ */ h(J.div, {
			"data-state": d ? "active" : "inactive",
			"data-orientation": c.orientation,
			role: "tabpanel",
			"aria-labelledby": l,
			hidden: !e,
			id: u,
			tabIndex: 0,
			...s,
			ref: n,
			style: {
				...t.style,
				animationDuration: f.current ? "0s" : void 0
			},
			children: e && o
		})
	});
});
Nv.displayName = Mv;
function Pv(e, t) {
	return `${e}-trigger-${t}`;
}
function Fv(e, t) {
	return `${e}-content-${t}`;
}
var Iv = Dv, Lv = kv, Rv = jv, zv = Nv, Bv = "ToastProvider", [Vv, Hv, Uv] = nn("Toast"), [Wv, Gv] = en("Toast", [Uv]), [Kv, qv] = Wv(Bv), Jv = (t) => {
	let { __scopeToast: n, label: r = "Notification", duration: i = 5e3, swipeDirection: a = "right", swipeThreshold: o = 50, children: s } = t, [c, l] = e.useState(null), [u, d] = e.useState(0), f = e.useRef(!1), p = e.useRef(!1);
	return r.trim() || console.error(`Invalid prop \`label\` supplied to \`${Bv}\`. Expected non-empty \`string\`.`), /* @__PURE__ */ h(Vv.Provider, {
		scope: n,
		children: /* @__PURE__ */ h(Kv, {
			scope: n,
			label: r,
			duration: i,
			swipeDirection: a,
			swipeThreshold: o,
			toastCount: u,
			viewport: c,
			onViewportChange: l,
			onToastAdd: e.useCallback(() => d((e) => e + 1), []),
			onToastRemove: e.useCallback(() => d((e) => e - 1), []),
			isFocusedToastEscapeKeyDownRef: f,
			isClosePausedRef: p,
			children: s
		})
	});
};
Jv.displayName = Bv;
var Yv = "ToastViewport", Xv = ["F8"], Zv = "toast.viewportPause", Qv = "toast.viewportResume", $v = e.forwardRef((t, n) => {
	let { __scopeToast: r, hotkey: i = Xv, label: a = "Notifications ({hotkey})", ...o } = t, s = qv(Yv, r), c = Hv(r), l = e.useRef(null), u = e.useRef(null), d = e.useRef(null), f = e.useRef(null), p = q(n, f, s.onViewportChange), m = i.join("+").replace(/Key/g, "").replace(/Digit/g, ""), _ = s.toastCount > 0;
	e.useEffect(() => {
		let e = (e) => {
			i.length !== 0 && i.every((t) => e[t] || e.code === t) && f.current?.focus();
		};
		return document.addEventListener("keydown", e), () => document.removeEventListener("keydown", e);
	}, [i]), e.useEffect(() => {
		let e = l.current, t = f.current;
		if (_ && e && t) {
			let n = () => {
				if (!s.isClosePausedRef.current) {
					let e = new CustomEvent(Zv);
					t.dispatchEvent(e), s.isClosePausedRef.current = !0;
				}
			}, r = () => {
				if (s.isClosePausedRef.current) {
					let e = new CustomEvent(Qv);
					t.dispatchEvent(e), s.isClosePausedRef.current = !1;
				}
			}, i = (t) => {
				e.contains(t.relatedTarget) || r();
			}, a = () => {
				e.contains(document.activeElement) || r();
			};
			return e.addEventListener("focusin", n), e.addEventListener("focusout", i), e.addEventListener("pointermove", n), e.addEventListener("pointerleave", a), window.addEventListener("blur", n), window.addEventListener("focus", r), () => {
				e.removeEventListener("focusin", n), e.removeEventListener("focusout", i), e.removeEventListener("pointermove", n), e.removeEventListener("pointerleave", a), window.removeEventListener("blur", n), window.removeEventListener("focus", r);
			};
		}
	}, [_, s.isClosePausedRef]);
	let v = e.useCallback(({ tabbingDirection: e }) => {
		let t = c().map((t) => {
			let n = t.ref.current, r = [n, ...Ey(n)];
			return e === "forwards" ? r : r.reverse();
		});
		return (e === "forwards" ? t.reverse() : t).flat();
	}, [c]);
	return e.useEffect(() => {
		let e = f.current;
		if (e) {
			let t = (t) => {
				let n = t.altKey || t.ctrlKey || t.metaKey;
				if (t.key === "Tab" && !n) {
					let n = document.activeElement, r = t.shiftKey;
					if (t.target === e && r) {
						u.current?.focus();
						return;
					}
					let i = v({ tabbingDirection: r ? "backwards" : "forwards" }), a = i.findIndex((e) => e === n);
					Dy(i.slice(a + 1)) ? t.preventDefault() : r ? u.current?.focus() : d.current?.focus();
				}
			};
			return e.addEventListener("keydown", t), () => e.removeEventListener("keydown", t);
		}
	}, [c, v]), /* @__PURE__ */ g(kr, {
		ref: l,
		role: "region",
		"aria-label": a.replace("{hotkey}", m),
		tabIndex: -1,
		style: { pointerEvents: _ ? void 0 : "none" },
		children: [
			_ && /* @__PURE__ */ h(ty, {
				ref: u,
				onFocusFromOutsideViewport: () => {
					Dy(v({ tabbingDirection: "forwards" }));
				}
			}),
			/* @__PURE__ */ h(Vv.Slot, {
				scope: r,
				children: /* @__PURE__ */ h(J.ol, {
					tabIndex: -1,
					...o,
					ref: p
				})
			}),
			_ && /* @__PURE__ */ h(ty, {
				ref: d,
				onFocusFromOutsideViewport: () => {
					Dy(v({ tabbingDirection: "backwards" }));
				}
			})
		]
	});
});
$v.displayName = Yv;
var ey = "ToastFocusProxy", ty = e.forwardRef((e, t) => {
	let { __scopeToast: n, onFocusFromOutsideViewport: r, ...i } = e, a = qv(ey, n);
	return /* @__PURE__ */ h(Zt, {
		tabIndex: 0,
		...i,
		ref: t,
		style: { position: "fixed" },
		onFocus: (e) => {
			let t = e.relatedTarget;
			a.viewport?.contains(t) || r();
		}
	});
});
ty.displayName = ey;
var ny = "Toast", ry = "toast.swipeStart", iy = "toast.swipeMove", ay = "toast.swipeCancel", oy = "toast.swipeEnd", sy = e.forwardRef((e, t) => {
	let { forceMount: n, open: r, defaultOpen: i, onOpenChange: a, ...o } = e, [s, c] = on({
		prop: r,
		defaultProp: i ?? !0,
		onChange: a,
		caller: ny
	});
	return /* @__PURE__ */ h(un, {
		present: n || s,
		children: /* @__PURE__ */ h(uy, {
			open: s,
			...o,
			ref: t,
			onClose: () => c(!1),
			onPause: X(e.onPause),
			onResume: X(e.onResume),
			onSwipeStart: Y(e.onSwipeStart, (e) => {
				e.currentTarget.setAttribute("data-swipe", "start");
			}),
			onSwipeMove: Y(e.onSwipeMove, (e) => {
				let { x: t, y: n } = e.detail.delta;
				e.currentTarget.setAttribute("data-swipe", "move"), e.currentTarget.style.setProperty("--radix-toast-swipe-move-x", `${t}px`), e.currentTarget.style.setProperty("--radix-toast-swipe-move-y", `${n}px`);
			}),
			onSwipeCancel: Y(e.onSwipeCancel, (e) => {
				e.currentTarget.setAttribute("data-swipe", "cancel"), e.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"), e.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"), e.currentTarget.style.removeProperty("--radix-toast-swipe-end-x"), e.currentTarget.style.removeProperty("--radix-toast-swipe-end-y");
			}),
			onSwipeEnd: Y(e.onSwipeEnd, (e) => {
				let { x: t, y: n } = e.detail.delta;
				e.currentTarget.setAttribute("data-swipe", "end"), e.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"), e.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"), e.currentTarget.style.setProperty("--radix-toast-swipe-end-x", `${t}px`), e.currentTarget.style.setProperty("--radix-toast-swipe-end-y", `${n}px`), c(!1);
			})
		})
	});
});
sy.displayName = ny;
var [cy, ly] = Wv(ny, { onClose() {} }), uy = e.forwardRef((t, n) => {
	let { __scopeToast: r, type: i = "foreground", duration: a, open: o, onClose: s, onEscapeKeyDown: c, onPause: l, onResume: u, onSwipeStart: d, onSwipeMove: p, onSwipeCancel: _, onSwipeEnd: v, ...y } = t, b = qv(ny, r), [x, S] = e.useState(null), C = q(n, (e) => S(e)), w = e.useRef(null), T = e.useRef(null), E = a || b.duration, D = e.useRef(0), O = e.useRef(E), k = e.useRef(0), { onToastAdd: A, onToastRemove: j } = b, M = X(() => {
		x?.contains(document.activeElement) && b.viewport?.focus(), s();
	}), N = e.useCallback((e) => {
		!e || e === Infinity || (window.clearTimeout(k.current), D.current = (/* @__PURE__ */ new Date()).getTime(), k.current = window.setTimeout(M, e));
	}, [M]);
	e.useEffect(() => {
		let e = b.viewport;
		if (e) {
			let t = () => {
				N(O.current), u?.();
			}, n = () => {
				let e = (/* @__PURE__ */ new Date()).getTime() - D.current;
				O.current -= e, window.clearTimeout(k.current), l?.();
			};
			return e.addEventListener(Zv, n), e.addEventListener(Qv, t), () => {
				e.removeEventListener(Zv, n), e.removeEventListener(Qv, t);
			};
		}
	}, [
		b.viewport,
		E,
		l,
		u,
		N
	]), e.useEffect(() => {
		o && !b.isClosePausedRef.current && N(E);
	}, [
		o,
		E,
		b.isClosePausedRef,
		N
	]), e.useEffect(() => (A(), () => j()), [A, j]);
	let P = e.useMemo(() => x ? xy(x) : null, [x]);
	return b.viewport ? /* @__PURE__ */ g(m, { children: [P && /* @__PURE__ */ h(dy, {
		__scopeToast: r,
		role: "status",
		"aria-live": i === "foreground" ? "assertive" : "polite",
		children: P
	}), /* @__PURE__ */ h(cy, {
		scope: r,
		onClose: M,
		children: f.createPortal(/* @__PURE__ */ h(Vv.ItemSlot, {
			scope: r,
			children: /* @__PURE__ */ h(Or, {
				asChild: !0,
				onEscapeKeyDown: Y(c, () => {
					b.isFocusedToastEscapeKeyDownRef.current || M(), b.isFocusedToastEscapeKeyDownRef.current = !1;
				}),
				children: /* @__PURE__ */ h(J.li, {
					tabIndex: 0,
					"data-state": o ? "open" : "closed",
					"data-swipe-direction": b.swipeDirection,
					...y,
					ref: C,
					style: {
						userSelect: "none",
						touchAction: "none",
						...t.style
					},
					onKeyDown: Y(t.onKeyDown, (e) => {
						e.key === "Escape" && (c?.(e.nativeEvent), e.nativeEvent.defaultPrevented || (b.isFocusedToastEscapeKeyDownRef.current = !0, M()));
					}),
					onPointerDown: Y(t.onPointerDown, (e) => {
						e.button === 0 && (w.current = {
							x: e.clientX,
							y: e.clientY
						});
					}),
					onPointerMove: Y(t.onPointerMove, (e) => {
						if (!w.current) return;
						let t = e.clientX - w.current.x, n = e.clientY - w.current.y, r = !!T.current, i = ["left", "right"].includes(b.swipeDirection), a = ["left", "up"].includes(b.swipeDirection) ? Math.min : Math.max, o = i ? a(0, t) : 0, s = i ? 0 : a(0, n), c = e.pointerType === "touch" ? 10 : 2, l = {
							x: o,
							y: s
						}, u = {
							originalEvent: e,
							delta: l
						};
						r ? (T.current = l, Sy(iy, p, u, { discrete: !1 })) : Cy(l, b.swipeDirection, c) ? (T.current = l, Sy(ry, d, u, { discrete: !1 }), e.target.setPointerCapture(e.pointerId)) : (Math.abs(t) > c || Math.abs(n) > c) && (w.current = null);
					}),
					onPointerUp: Y(t.onPointerUp, (e) => {
						let t = T.current, n = e.target;
						if (n.hasPointerCapture(e.pointerId) && n.releasePointerCapture(e.pointerId), T.current = null, w.current = null, t) {
							let n = e.currentTarget, r = {
								originalEvent: e,
								delta: t
							};
							Cy(t, b.swipeDirection, b.swipeThreshold) ? Sy(oy, v, r, { discrete: !0 }) : Sy(ay, _, r, { discrete: !0 }), n.addEventListener("click", (e) => e.preventDefault(), { once: !0 });
						}
					})
				})
			})
		}), b.viewport)
	})] }) : null;
}), dy = (t) => {
	let { __scopeToast: n, children: r, ...i } = t, a = qv(ny, n), [o, s] = e.useState(!1), [c, l] = e.useState(!1);
	return wy(() => s(!0)), e.useEffect(() => {
		let e = window.setTimeout(() => l(!0), 1e3);
		return () => window.clearTimeout(e);
	}, []), c ? null : /* @__PURE__ */ h(qr, {
		asChild: !0,
		children: /* @__PURE__ */ h(Zt, {
			...i,
			children: o && /* @__PURE__ */ g(m, { children: [
				a.label,
				" ",
				r
			] })
		})
	});
}, fy = "ToastTitle", py = e.forwardRef((e, t) => {
	let { __scopeToast: n, ...r } = e;
	return /* @__PURE__ */ h(J.div, {
		...r,
		ref: t
	});
});
py.displayName = fy;
var my = "ToastDescription", hy = e.forwardRef((e, t) => {
	let { __scopeToast: n, ...r } = e;
	return /* @__PURE__ */ h(J.div, {
		...r,
		ref: t
	});
});
hy.displayName = my;
var gy = "ToastAction", _y = e.forwardRef((e, t) => {
	let { altText: n, ...r } = e;
	return n.trim() ? /* @__PURE__ */ h(by, {
		altText: n,
		asChild: !0,
		children: /* @__PURE__ */ h(yy, {
			...r,
			ref: t
		})
	}) : (console.error(`Invalid prop \`altText\` supplied to \`${gy}\`. Expected non-empty \`string\`.`), null);
});
_y.displayName = gy;
var vy = "ToastClose", yy = e.forwardRef((e, t) => {
	let { __scopeToast: n, ...r } = e, i = ly(vy, n);
	return /* @__PURE__ */ h(by, {
		asChild: !0,
		children: /* @__PURE__ */ h(J.button, {
			type: "button",
			...r,
			ref: t,
			onClick: Y(e.onClick, i.onClose)
		})
	});
});
yy.displayName = vy;
var by = e.forwardRef((e, t) => {
	let { __scopeToast: n, altText: r, ...i } = e;
	return /* @__PURE__ */ h(J.div, {
		"data-radix-toast-announce-exclude": "",
		"data-radix-toast-announce-alt": r || void 0,
		...i,
		ref: t
	});
});
function xy(e) {
	let t = [];
	return Array.from(e.childNodes).forEach((e) => {
		if (e.nodeType === e.TEXT_NODE && e.textContent && t.push(e.textContent), Ty(e)) {
			let n = e.ariaHidden || e.hidden || e.style.display === "none", r = e.dataset.radixToastAnnounceExclude === "";
			if (!n) if (r) {
				let n = e.dataset.radixToastAnnounceAlt;
				n && t.push(n);
			} else t.push(...xy(e));
		}
	}), t;
}
function Sy(e, t, n, { discrete: r }) {
	let i = n.originalEvent.currentTarget, a = new CustomEvent(e, {
		bubbles: !0,
		cancelable: !0,
		detail: n
	});
	t && i.addEventListener(e, t, { once: !0 }), r ? Jt(i, a) : i.dispatchEvent(a);
}
var Cy = (e, t, n = 0) => {
	let r = Math.abs(e.x), i = Math.abs(e.y), a = r > i;
	return t === "left" || t === "right" ? a && r > n : !a && i > n;
};
function wy(e = () => {}) {
	let t = X(e);
	rn(() => {
		let e = 0, n = 0;
		return e = window.requestAnimationFrame(() => n = window.requestAnimationFrame(t)), () => {
			window.cancelAnimationFrame(e), window.cancelAnimationFrame(n);
		};
	}, [t]);
}
function Ty(e) {
	return e.nodeType === e.ELEMENT_NODE;
}
function Ey(e) {
	let t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: (e) => {
		let t = e.tagName === "INPUT" && e.type === "hidden";
		return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	for (; n.nextNode();) t.push(n.currentNode);
	return t;
}
function Dy(e) {
	let t = document.activeElement;
	return e.some((e) => e === t ? !0 : (e.focus(), document.activeElement !== t));
}
var Oy = Jv, ky = $v, Ay = sy, jy = py, My = hy, Ny = _y, Py = yy, [Fy, Iy] = en("Tooltip", [al]), Ly = al(), Ry = "TooltipProvider", zy = 700, By = "tooltip.open", [Vy, Hy] = Fy(Ry), Uy = (t) => {
	let { __scopeTooltip: n, delayDuration: r = zy, skipDelayDuration: i = 300, disableHoverableContent: a = !1, children: o } = t, s = e.useRef(!0), c = e.useRef(!1), l = e.useRef(0);
	return e.useEffect(() => {
		let e = l.current;
		return () => window.clearTimeout(e);
	}, []), /* @__PURE__ */ h(Vy, {
		scope: n,
		isOpenDelayedRef: s,
		delayDuration: r,
		onOpen: e.useCallback(() => {
			window.clearTimeout(l.current), s.current = !1;
		}, []),
		onClose: e.useCallback(() => {
			window.clearTimeout(l.current), l.current = window.setTimeout(() => s.current = !0, i);
		}, [i]),
		isPointerInTransitRef: c,
		onPointerInTransitChange: e.useCallback((e) => {
			c.current = e;
		}, []),
		disableHoverableContent: a,
		children: o
	});
};
Uy.displayName = Ry;
var Wy = "Tooltip", [Gy, Ky] = Fy(Wy), qy = (t) => {
	let { __scopeTooltip: n, children: r, open: i, defaultOpen: a, onOpenChange: o, disableHoverableContent: s, delayDuration: c } = t, l = Hy(Wy, t.__scopeTooltip), u = Ly(n), [d, f] = e.useState(null), p = gn(), m = e.useRef(0), g = s ?? l.disableHoverableContent, _ = c ?? l.delayDuration, v = e.useRef(!1), [y, b] = on({
		prop: i,
		defaultProp: a ?? !1,
		onChange: (e) => {
			e ? (l.onOpen(), document.dispatchEvent(new CustomEvent(By))) : l.onClose(), o?.(e);
		},
		caller: Wy
	}), x = e.useMemo(() => y ? v.current ? "delayed-open" : "instant-open" : "closed", [y]), S = e.useCallback(() => {
		window.clearTimeout(m.current), m.current = 0, v.current = !1, b(!0);
	}, [b]), C = e.useCallback(() => {
		window.clearTimeout(m.current), m.current = 0, b(!1);
	}, [b]), w = e.useCallback(() => {
		window.clearTimeout(m.current), m.current = window.setTimeout(() => {
			v.current = !0, b(!0), m.current = 0;
		}, _);
	}, [_, b]);
	return e.useEffect(() => () => {
		m.current &&= (window.clearTimeout(m.current), 0);
	}, []), /* @__PURE__ */ h(xl, {
		...u,
		children: /* @__PURE__ */ h(Gy, {
			scope: n,
			contentId: p,
			open: y,
			stateAttribute: x,
			trigger: d,
			onTriggerChange: f,
			onTriggerEnter: e.useCallback(() => {
				l.isOpenDelayedRef.current ? w() : S();
			}, [
				l.isOpenDelayedRef,
				w,
				S
			]),
			onTriggerLeave: e.useCallback(() => {
				g ? C() : (window.clearTimeout(m.current), m.current = 0);
			}, [C, g]),
			onOpen: S,
			onClose: C,
			disableHoverableContent: g,
			children: r
		})
	});
};
qy.displayName = Wy;
var Jy = "TooltipTrigger", Yy = e.forwardRef((t, n) => {
	let { __scopeTooltip: r, ...i } = t, a = Ky(Jy, r), o = Hy(Jy, r), s = Ly(r), c = q(n, e.useRef(null), a.onTriggerChange), l = e.useRef(!1), u = e.useRef(!1), d = e.useCallback(() => l.current = !1, []);
	return e.useEffect(() => () => document.removeEventListener("pointerup", d), [d]), /* @__PURE__ */ h(Sl, {
		asChild: !0,
		...s,
		children: /* @__PURE__ */ h(J.button, {
			"aria-describedby": a.open ? a.contentId : void 0,
			"data-state": a.stateAttribute,
			...i,
			ref: c,
			onPointerMove: Y(t.onPointerMove, (e) => {
				e.pointerType !== "touch" && !u.current && !o.isPointerInTransitRef.current && (a.onTriggerEnter(), u.current = !0);
			}),
			onPointerLeave: Y(t.onPointerLeave, () => {
				a.onTriggerLeave(), u.current = !1;
			}),
			onPointerDown: Y(t.onPointerDown, () => {
				a.open && a.onClose(), l.current = !0, document.addEventListener("pointerup", d, { once: !0 });
			}),
			onFocus: Y(t.onFocus, () => {
				l.current || a.onOpen();
			}),
			onBlur: Y(t.onBlur, a.onClose),
			onClick: Y(t.onClick, a.onClose)
		})
	});
});
Yy.displayName = Jy;
var Xy = "TooltipPortal", [Zy, Qy] = Fy(Xy, { forceMount: void 0 }), $y = (e) => {
	let { __scopeTooltip: t, forceMount: n, children: r, container: i } = e, a = Ky(Xy, t);
	return /* @__PURE__ */ h(Zy, {
		scope: t,
		forceMount: n,
		children: /* @__PURE__ */ h(un, {
			present: n || a.open,
			children: /* @__PURE__ */ h(qr, {
				asChild: !0,
				container: i,
				children: r
			})
		})
	});
};
$y.displayName = Xy;
var eb = "TooltipContent", tb = e.forwardRef((e, t) => {
	let n = Qy(eb, e.__scopeTooltip), { forceMount: r = n.forceMount, side: i = "top", ...a } = e, o = Ky(eb, e.__scopeTooltip);
	return /* @__PURE__ */ h(un, {
		present: r || o.open,
		children: o.disableHoverableContent ? /* @__PURE__ */ h(ob, {
			side: i,
			...a,
			ref: t
		}) : /* @__PURE__ */ h(nb, {
			side: i,
			...a,
			ref: t
		})
	});
}), nb = e.forwardRef((t, n) => {
	let r = Ky(eb, t.__scopeTooltip), i = Hy(eb, t.__scopeTooltip), a = e.useRef(null), o = q(n, a), [s, c] = e.useState(null), { trigger: l, onClose: u } = r, d = a.current, { onPointerInTransitChange: f } = i, p = e.useCallback(() => {
		c(null), f(!1);
	}, [f]), m = e.useCallback((e, t) => {
		let n = e.currentTarget, r = {
			x: e.clientX,
			y: e.clientY
		}, i = ub(r, lb(r, n.getBoundingClientRect())), a = db(t.getBoundingClientRect());
		c(pb([...i, ...a])), f(!0);
	}, [f]);
	return e.useEffect(() => () => p(), [p]), e.useEffect(() => {
		if (l && d) {
			let e = (e) => m(e, d), t = (e) => m(e, l);
			return l.addEventListener("pointerleave", e), d.addEventListener("pointerleave", t), () => {
				l.removeEventListener("pointerleave", e), d.removeEventListener("pointerleave", t);
			};
		}
	}, [
		l,
		d,
		m,
		p
	]), e.useEffect(() => {
		if (s) {
			let e = (e) => {
				let t = e.target, n = {
					x: e.clientX,
					y: e.clientY
				}, r = l?.contains(t) || d?.contains(t), i = !fb(n, s);
				r ? p() : i && (p(), u());
			};
			return document.addEventListener("pointermove", e), () => document.removeEventListener("pointermove", e);
		}
	}, [
		l,
		d,
		s,
		u,
		p
	]), /* @__PURE__ */ h(ob, {
		...t,
		ref: o
	});
}), [rb, ib] = Fy(Wy, { isInside: !1 }), ab = /* @__PURE__ */ Wt("TooltipContent"), ob = e.forwardRef((t, n) => {
	let { __scopeTooltip: r, children: i, "aria-label": a, onEscapeKeyDown: o, onPointerDownOutside: s, ...c } = t, l = Ky(eb, r), u = Ly(r), { onClose: d } = l;
	return e.useEffect(() => (document.addEventListener(By, d), () => document.removeEventListener(By, d)), [d]), e.useEffect(() => {
		if (l.trigger) {
			let e = (e) => {
				e.target?.contains(l.trigger) && d();
			};
			return window.addEventListener("scroll", e, { capture: !0 }), () => window.removeEventListener("scroll", e, { capture: !0 });
		}
	}, [l.trigger, d]), /* @__PURE__ */ h(xr, {
		asChild: !0,
		disableOutsidePointerEvents: !1,
		onEscapeKeyDown: o,
		onPointerDownOutside: s,
		onFocusOutside: (e) => e.preventDefault(),
		onDismiss: d,
		children: /* @__PURE__ */ g(Cl, {
			"data-state": l.stateAttribute,
			...u,
			...c,
			ref: n,
			style: {
				...c.style,
				"--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
				"--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
				"--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
				"--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
				"--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
			},
			children: [/* @__PURE__ */ h(ab, { children: i }), /* @__PURE__ */ h(rb, {
				scope: r,
				isInside: !0,
				children: /* @__PURE__ */ h(Qt, {
					id: l.contentId,
					role: "tooltip",
					children: a || i
				})
			})]
		})
	});
});
tb.displayName = eb;
var sb = "TooltipArrow", cb = e.forwardRef((e, t) => {
	let { __scopeTooltip: n, ...r } = e, i = Ly(n);
	return ib(sb, n).isInside ? null : /* @__PURE__ */ h(wl, {
		...i,
		...r,
		ref: t
	});
});
cb.displayName = sb;
function lb(e, t) {
	let n = Math.abs(t.top - e.y), r = Math.abs(t.bottom - e.y), i = Math.abs(t.right - e.x), a = Math.abs(t.left - e.x);
	switch (Math.min(n, r, i, a)) {
		case a: return "left";
		case i: return "right";
		case n: return "top";
		case r: return "bottom";
		default: throw Error("unreachable");
	}
}
function ub(e, t, n = 5) {
	let r = [];
	switch (t) {
		case "top":
			r.push({
				x: e.x - n,
				y: e.y + n
			}, {
				x: e.x + n,
				y: e.y + n
			});
			break;
		case "bottom":
			r.push({
				x: e.x - n,
				y: e.y - n
			}, {
				x: e.x + n,
				y: e.y - n
			});
			break;
		case "left":
			r.push({
				x: e.x + n,
				y: e.y - n
			}, {
				x: e.x + n,
				y: e.y + n
			});
			break;
		case "right":
			r.push({
				x: e.x - n,
				y: e.y - n
			}, {
				x: e.x - n,
				y: e.y + n
			});
			break;
	}
	return r;
}
function db(e) {
	let { top: t, right: n, bottom: r, left: i } = e;
	return [
		{
			x: i,
			y: t
		},
		{
			x: n,
			y: t
		},
		{
			x: n,
			y: r
		},
		{
			x: i,
			y: r
		}
	];
}
function fb(e, t) {
	let { x: n, y: r } = e, i = !1;
	for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
		let o = t[e], s = t[a], c = o.x, l = o.y, u = s.x, d = s.y;
		l > r != d > r && n < (u - c) * (r - l) / (d - l) + c && (i = !i);
	}
	return i;
}
function pb(e) {
	let t = e.slice();
	return t.sort((e, t) => e.x < t.x ? -1 : e.x > t.x ? 1 : e.y < t.y ? -1 : +(e.y > t.y)), mb(t);
}
function mb(e) {
	if (e.length <= 1) return e.slice();
	let t = [];
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		for (; t.length >= 2;) {
			let e = t[t.length - 1], n = t[t.length - 2];
			if ((e.x - n.x) * (r.y - n.y) >= (e.y - n.y) * (r.x - n.x)) t.pop();
			else break;
		}
		t.push(r);
	}
	t.pop();
	let n = [];
	for (let t = e.length - 1; t >= 0; t--) {
		let r = e[t];
		for (; n.length >= 2;) {
			let e = n[n.length - 1], t = n[n.length - 2];
			if ((e.x - t.x) * (r.y - t.y) >= (e.y - t.y) * (r.x - t.x)) n.pop();
			else break;
		}
		n.push(r);
	}
	return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n);
}
var hb = Uy, gb = qy, _b = Yy, vb = $y, yb = tb;
//#endregion
//#region src/components/ui/accordion.tsx
function bb({ ...e }) {
	return /* @__PURE__ */ h(lr, {
		"data-slot": "accordion",
		...e
	});
}
function xb({ className: e, ...t }) {
	return /* @__PURE__ */ h(ur, {
		"data-slot": "accordion-item",
		className: G("border-b border-border-subtle last:border-b-0", e),
		...t
	});
}
function Sb({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ h(dr, {
		className: "flex",
		children: /* @__PURE__ */ g(fr, {
			"data-slot": "accordion-trigger",
			className: G("flex flex-1 items-center justify-between gap-4 py-4 text-body-sm font-semibold text-content-primary", "rounded-sm transition-all duration-fast outline-none hover:text-content-brand", "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", "disabled:pointer-events-none disabled:opacity-50", "[&[data-state=open]>svg]:rotate-180", e),
			...n,
			children: [t, /* @__PURE__ */ h(bt, {
				"aria-hidden": "true",
				className: "pointer-events-none h-4 w-4 shrink-0 text-content-secondary transition-transform duration-base ease-out"
			})]
		})
	});
}
function Cb({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ h(pr, {
		"data-slot": "accordion-content",
		className: "overflow-hidden text-body-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
		...n,
		children: /* @__PURE__ */ h("div", {
			className: G("pb-4 pt-0 text-content-secondary", e),
			children: t
		})
	});
}
//#endregion
//#region node_modules/.pnpm/class-variance-authority@0.7.1/node_modules/class-variance-authority/dist/index.mjs
var wb = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Tb = S, Eb = (e, t) => (n) => {
	if (t?.variants == null) return Tb(e, n?.class, n?.className);
	let { variants: r, defaultVariants: i } = t, a = Object.keys(r).map((e) => {
		let t = n?.[e], a = i?.[e];
		if (t === null) return null;
		let o = wb(t) || wb(a);
		return r[e][o];
	}), o = n && Object.entries(n).reduce((e, t) => {
		let [n, r] = t;
		return r === void 0 || (e[n] = r), e;
	}, {});
	return Tb(e, a, t?.compoundVariants?.reduce((e, t) => {
		let { class: n, className: r, ...a } = t;
		return Object.entries(a).every((e) => {
			let [t, n] = e;
			return Array.isArray(n) ? n.includes({
				...i,
				...o
			}[t]) : {
				...i,
				...o
			}[t] === n;
		}) ? [
			...e,
			n,
			r
		] : e;
	}, []), n?.class, n?.className);
}, Db = Eb("relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:pl-7", {
	variants: { variant: {
		default: "bg-surface-raised border-border-default text-content-primary [&>svg]:text-content-secondary",
		info: "bg-feedback-info-bg border-feedback-info/30 text-content-primary [&>svg]:text-feedback-info",
		success: "bg-feedback-success-bg border-feedback-success/30 text-content-primary [&>svg]:text-feedback-success",
		warning: "bg-feedback-warning-bg border-feedback-warning/30 text-content-primary [&>svg]:text-feedback-warning",
		danger: "bg-feedback-danger-bg border-feedback-danger/30 text-content-primary [&>svg]:text-feedback-danger"
	} },
	defaultVariants: { variant: "default" }
}), Ob = {
	default: jt,
	info: jt,
	success: Et,
	warning: Ft,
	danger: Tt
};
function kb({ className: e, variant: t = "default", showIcon: n = !0, children: r, ...i }) {
	let a = Ob[t ?? "default"];
	return /* @__PURE__ */ g("div", {
		"data-slot": "alert",
		"data-variant": t,
		role: "alert",
		className: G(Db({ variant: t }), e),
		...i,
		children: [n && /* @__PURE__ */ h(a, {
			className: "h-4 w-4",
			"aria-hidden": "true"
		}), r]
	});
}
function Ab({ className: e, ...t }) {
	return /* @__PURE__ */ h("h5", {
		"data-slot": "alert-title",
		className: G("mb-1 font-semibold text-body-sm leading-none tracking-tight", e),
		...t
	});
}
function jb({ className: e, ...t }) {
	return /* @__PURE__ */ h("div", {
		"data-slot": "alert-description",
		className: G("text-body-sm text-content-secondary", e),
		...t
	});
}
//#endregion
//#region src/components/ui/avatar.tsx
var Mb = Eb("relative flex shrink-0 overflow-hidden rounded-full select-none", {
	variants: { size: {
		xs: "h-6 w-6 text-[10px]",
		sm: "h-8 w-8 text-xs",
		default: "h-10 w-10 text-sm",
		lg: "h-12 w-12 text-base",
		xl: "h-16 w-16 text-lg"
	} },
	defaultVariants: { size: "default" }
});
function Nb({ className: e, size: t, ...n }) {
	return /* @__PURE__ */ h(xo, {
		"data-slot": "avatar",
		className: G(Mb({ size: t }), e),
		...n
	});
}
function Pb({ className: e, ...t }) {
	return /* @__PURE__ */ h(So, {
		"data-slot": "avatar-image",
		className: G("aspect-square h-full w-full object-cover", e),
		...t
	});
}
function Fb({ className: e, ...t }) {
	return /* @__PURE__ */ h(Co, {
		"data-slot": "avatar-fallback",
		className: G("flex h-full w-full items-center justify-center rounded-full", "bg-primary text-primary-foreground font-semibold uppercase tracking-wide", e),
		...t
	});
}
function Ib({ children: t, max: n, size: r = "default", className: i }) {
	let a = e.Children.toArray(t), o = n ? a.slice(0, n) : a, s = n ? a.length - n : 0;
	return /* @__PURE__ */ g("div", {
		"data-slot": "avatar-group",
		className: G("flex -space-x-2", i),
		role: "group",
		children: [o.map((t, n) => e.cloneElement(t, {
			key: n,
			size: r,
			className: G("ring-2 ring-surface-raised", t.props?.className ?? "")
		})), s > 0 && /* @__PURE__ */ h(Nb, {
			size: r,
			className: "ring-2 ring-surface-raised",
			children: /* @__PURE__ */ g(Fb, { children: ["+", s] })
		})]
	});
}
//#endregion
//#region src/components/ui/badge.tsx
var Lb = Eb("inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-caption font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&>svg]:pointer-events-none [&>svg]:size-3", {
	variants: { variant: {
		default: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
		secondary: "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
		destructive: "bg-destructive text-white focus-visible:ring-destructive/20 [a&]:hover:bg-destructive/90",
		outline: "border-border-default text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
		ghost: "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
		link: "text-primary underline-offset-4 [a&]:hover:underline"
	} },
	defaultVariants: { variant: "default" }
});
function Rb({ className: e, variant: t = "default", asChild: n = !1, ...r }) {
	return /* @__PURE__ */ h(n ? Vt : "span", {
		"data-slot": "badge",
		"data-variant": t,
		className: G(Lb({ variant: t }), e),
		...r
	});
}
//#endregion
//#region src/components/ui/breadcrumb.tsx
function zb({ ...e }) {
	return /* @__PURE__ */ h("nav", {
		"aria-label": "breadcrumb",
		"data-slot": "breadcrumb",
		...e
	});
}
function Bb({ className: e, ...t }) {
	return /* @__PURE__ */ h("ol", {
		"data-slot": "breadcrumb-list",
		className: G("flex flex-wrap items-center gap-1.5 break-words text-caption text-content-secondary sm:gap-2.5", e),
		...t
	});
}
function Vb({ className: e, ...t }) {
	return /* @__PURE__ */ h("li", {
		"data-slot": "breadcrumb-item",
		className: G("inline-flex items-center gap-1.5", e),
		...t
	});
}
function Hb({ asChild: e, className: t, ...n }) {
	return /* @__PURE__ */ h(e ? Vt : "a", {
		"data-slot": "breadcrumb-link",
		className: G("transition-colors hover:text-content-primary", t),
		...n
	});
}
function Ub({ className: e, ...t }) {
	return /* @__PURE__ */ h("span", {
		"data-slot": "breadcrumb-page",
		role: "link",
		"aria-disabled": "true",
		"aria-current": "page",
		className: G("font-semibold text-content-primary", e),
		...t
	});
}
function Wb({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ h("li", {
		"data-slot": "breadcrumb-separator",
		role: "presentation",
		"aria-hidden": "true",
		className: G("[&>svg]:size-3.5", t),
		...n,
		children: e ?? /* @__PURE__ */ h(St, {})
	});
}
function Gb({ className: e, ...t }) {
	return /* @__PURE__ */ g("span", {
		"data-slot": "breadcrumb-ellipsis",
		role: "presentation",
		"aria-hidden": "true",
		className: G("flex size-9 items-center justify-center", e),
		...t,
		children: [/* @__PURE__ */ h(kt, { className: "size-4" }), /* @__PURE__ */ h("span", {
			className: "sr-only",
			children: "More"
		})]
	});
}
//#endregion
//#region src/components/ui/button.tsx
var Kb = Eb([
	"inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-medium rounded-md",
	"transition-all duration-fast ease-out outline-none",
	"focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
	"disabled:pointer-events-none disabled:opacity-50",
	"aria-invalid:border-destructive aria-invalid:ring-destructive/20",
	"[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4",
	"select-none"
].join(" "), {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow-elevation-2 hover:bg-primary/90 hover:shadow-elevation-3 hover:-translate-y-px active:translate-y-0 active:shadow-elevation-1",
			destructive: "bg-destructive text-destructive-foreground shadow-elevation-1 hover:bg-destructive/90 hover:shadow-elevation-2 hover:-translate-y-px active:translate-y-0",
			tertiary: "border border-border-default bg-surface-raised text-content-primary hover:bg-surface-sunken hover:border-border-strong",
			outline: "border border-border-default bg-transparent text-content-primary hover:bg-surface-sunken hover:border-border-strong",
			secondary: "bg-surface-sunken text-content-primary hover:bg-muted border border-border-subtle",
			ghost: "text-content-primary hover:bg-surface-sunken",
			link: "text-content-brand underline-offset-4 hover:underline p-0 h-auto",
			success: "bg-success text-success-foreground shadow-elevation-1 hover:bg-success/90 hover:shadow-elevation-2 hover:-translate-y-px active:translate-y-0",
			"danger-outline": "border border-feedback-danger text-feedback-danger bg-transparent hover:bg-feedback-danger-bg"
		},
		size: {
			xs: "h-6 px-2 text-[11px] gap-1 [&_svg]:size-3",
			sm: "h-8 px-3 text-body-sm gap-1.5 [&_svg]:size-3.5",
			default: "h-9 px-4 text-body-sm",
			lg: "h-11 px-6 text-body rounded-lg",
			icon: "h-9 w-9",
			"icon-sm": "h-7 w-7 rounded-sm [&_svg]:size-3.5"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function qb({ className: e, variant: t = "default", size: n = "default", asChild: r = !1, loading: i = !1, iconLeft: a, iconRight: o, children: s, disabled: c, ...l }) {
	return /* @__PURE__ */ g(r ? Vt : "button", {
		"data-slot": "button",
		"data-variant": t,
		"data-size": n,
		className: G(Kb({
			variant: t,
			size: n,
			className: e
		})),
		disabled: c || i,
		"aria-disabled": c || i,
		...l,
		children: [
			i ? /* @__PURE__ */ h(Mt, {
				className: "animate-spin",
				"aria-hidden": "true"
			}) : a && /* @__PURE__ */ h("span", {
				"aria-hidden": "true",
				children: a
			}),
			s,
			!i && o && /* @__PURE__ */ h("span", {
				"aria-hidden": "true",
				children: o
			})
		]
	});
}
//#endregion
//#region node_modules/.pnpm/@date-fns+tz@1.4.1/node_modules/@date-fns/tz/tzName/index.js
function Jb(e, t, n = "long") {
	return new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		timeZone: e,
		timeZoneName: n
	}).format(t).split(/\s/g).slice(2).join(" ");
}
//#endregion
//#region node_modules/.pnpm/@date-fns+tz@1.4.1/node_modules/@date-fns/tz/tzOffset/index.js
var Yb = {}, Xb = {};
function Zb(e, t) {
	try {
		let n = (Yb[e] ||= new Intl.DateTimeFormat("en-US", {
			timeZone: e,
			timeZoneName: "longOffset"
		}).format)(t).split("GMT")[1];
		return n in Xb ? Xb[n] : $b(n, n.split(":"));
	} catch {
		if (e in Xb) return Xb[e];
		let t = e?.match(Qb);
		return t ? $b(e, t.slice(1)) : NaN;
	}
}
var Qb = /([+-]\d\d):?(\d\d)?/;
function $b(e, t) {
	let n = +(t[0] || 0), r = +(t[1] || 0), i = (t[2] || 0) / 60;
	return Xb[e] = n * 60 + r > 0 ? n * 60 + r + i : n * 60 - r - i;
}
//#endregion
//#region node_modules/.pnpm/@date-fns+tz@1.4.1/node_modules/@date-fns/tz/date/mini.js
var ex = class e extends Date {
	constructor(...e) {
		super(), e.length > 1 && typeof e[e.length - 1] == "string" && (this.timeZone = e.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(Zb(this.timeZone, this)) ? this.setTime(NaN) : e.length ? typeof e[0] == "number" && (e.length === 1 || e.length === 2 && typeof e[1] != "number") ? this.setTime(e[0]) : typeof e[0] == "string" ? this.setTime(+new Date(e[0])) : e[0] instanceof Date ? this.setTime(+e[0]) : (this.setTime(+new Date(...e)), ix(this, NaN), nx(this)) : this.setTime(Date.now());
	}
	static tz(t, ...n) {
		return n.length ? new e(...n, t) : new e(Date.now(), t);
	}
	withTimeZone(t) {
		return new e(+this, t);
	}
	getTimezoneOffset() {
		let e = -Zb(this.timeZone, this);
		return e > 0 ? Math.floor(e) : Math.ceil(e);
	}
	setTime(e) {
		return Date.prototype.setTime.apply(this, arguments), nx(this), +this;
	}
	[Symbol.for("constructDateFrom")](t) {
		return new e(+new Date(t), this.timeZone);
	}
}, tx = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
	if (!tx.test(e)) return;
	let t = e.replace(tx, "$1UTC");
	ex.prototype[t] && (e.startsWith("get") ? ex.prototype[e] = function() {
		return this.internal[t]();
	} : (ex.prototype[e] = function() {
		return Date.prototype[t].apply(this.internal, arguments), rx(this), +this;
	}, ex.prototype[t] = function() {
		return Date.prototype[t].apply(this, arguments), nx(this), +this;
	}));
});
function nx(e) {
	e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-Zb(e.timeZone, e) * 60));
}
function rx(e) {
	Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), ix(e);
}
function ix(e) {
	let t = Zb(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
	r.setUTCHours(r.getUTCHours() - 1);
	let i = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), a = i - -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), o = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
	a && o && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + a);
	let s = i - n;
	s && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + s);
	let c = /* @__PURE__ */ new Date(+e);
	c.setUTCSeconds(0);
	let l = i > 0 ? c.getSeconds() : (c.getSeconds() - 60) % 60, u = Math.round(-(Zb(e.timeZone, e) * 60)) % 60;
	(u || l) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + u), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + u + l));
	let d = Zb(e.timeZone, e), f = d > 0 ? Math.floor(d) : Math.ceil(d), p = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - f, m = f !== n, h = p - s;
	if (m && h) {
		Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + h);
		let t = Zb(e.timeZone, e), n = f - (t > 0 ? Math.floor(t) : Math.ceil(t));
		n && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + n), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + n));
	}
}
//#endregion
//#region node_modules/.pnpm/@date-fns+tz@1.4.1/node_modules/@date-fns/tz/date/index.js
var ax = class e extends ex {
	static tz(t, ...n) {
		return n.length ? new e(...n, t) : new e(Date.now(), t);
	}
	toISOString() {
		let [e, t, n] = this.tzComponents(), r = `${e}${t}:${n}`;
		return this.internal.toISOString().slice(0, -1) + r;
	}
	toString() {
		return `${this.toDateString()} ${this.toTimeString()}`;
	}
	toDateString() {
		let [e, t, n, r] = this.internal.toUTCString().split(" ");
		return `${e?.slice(0, -1)} ${n} ${t} ${r}`;
	}
	toTimeString() {
		let e = this.internal.toUTCString().split(" ")[4], [t, n, r] = this.tzComponents();
		return `${e} GMT${t}${n}${r} (${Jb(this.timeZone, this)})`;
	}
	toLocaleString(e, t) {
		return Date.prototype.toLocaleString.call(this, e, {
			...t,
			timeZone: t?.timeZone || this.timeZone
		});
	}
	toLocaleDateString(e, t) {
		return Date.prototype.toLocaleDateString.call(this, e, {
			...t,
			timeZone: t?.timeZone || this.timeZone
		});
	}
	toLocaleTimeString(e, t) {
		return Date.prototype.toLocaleTimeString.call(this, e, {
			...t,
			timeZone: t?.timeZone || this.timeZone
		});
	}
	tzComponents() {
		let e = this.getTimezoneOffset();
		return [
			e > 0 ? "-" : "+",
			String(Math.floor(Math.abs(e) / 60)).padStart(2, "0"),
			String(Math.abs(e) % 60).padStart(2, "0")
		];
	}
	withTimeZone(t) {
		return new e(+this, t);
	}
	[Symbol.for("constructDateFrom")](t) {
		return new e(+new Date(t), this.timeZone);
	}
}, ox = 365.2425, sx = 6048e5, cx = 864e5, lx = 3600 * 24;
lx * 7, lx * ox / 12 * 3;
var ux = Symbol.for("constructDateFrom");
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/constructFrom.js
function dx(e, t) {
	return typeof e == "function" ? e(t) : e && typeof e == "object" && ux in e ? e[ux](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/toDate.js
function Z(e, t) {
	return dx(t || e, e);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addDays.js
function fx(e, t, n) {
	let r = Z(e, n?.in);
	return isNaN(t) ? dx(n?.in || e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addMonths.js
function px(e, t, n) {
	let r = Z(e, n?.in);
	if (isNaN(t)) return dx(n?.in || e, NaN);
	if (!t) return r;
	let i = r.getDate(), a = dx(n?.in || e, r.getTime());
	return a.setMonth(r.getMonth() + t + 1, 0), i >= a.getDate() ? a : (r.setFullYear(a.getFullYear(), a.getMonth(), i), r);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/defaultOptions.js
var mx = {};
function hx() {
	return mx;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfWeek.js
function gx(e, t) {
	let n = hx(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, i = Z(e, t?.in), a = i.getDay(), o = (a < r ? 7 : 0) + a - r;
	return i.setDate(i.getDate() - o), i.setHours(0, 0, 0, 0), i;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfISOWeek.js
function _x(e, t) {
	return gx(e, {
		...t,
		weekStartsOn: 1
	});
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getISOWeekYear.js
function vx(e, t) {
	let n = Z(e, t?.in), r = n.getFullYear(), i = dx(n, 0);
	i.setFullYear(r + 1, 0, 4), i.setHours(0, 0, 0, 0);
	let a = _x(i), o = dx(n, 0);
	o.setFullYear(r, 0, 4), o.setHours(0, 0, 0, 0);
	let s = _x(o);
	return n.getTime() >= a.getTime() ? r + 1 : n.getTime() >= s.getTime() ? r : r - 1;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js
function yx(e) {
	let t = Z(e), n = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()));
	return n.setUTCFullYear(t.getFullYear()), e - +n;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/normalizeDates.js
function bx(e, ...t) {
	let n = dx.bind(null, e || t.find((e) => typeof e == "object"));
	return t.map(n);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfDay.js
function xx(e, t) {
	let n = Z(e, t?.in);
	return n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/differenceInCalendarDays.js
function Sx(e, t, n) {
	let [r, i] = bx(n?.in, e, t), a = xx(r), o = xx(i), s = +a - yx(a), c = +o - yx(o);
	return Math.round((s - c) / cx);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfISOWeekYear.js
function Cx(e, t) {
	let n = vx(e, t), r = dx(t?.in || e, 0);
	return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), _x(r);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addWeeks.js
function wx(e, t, n) {
	return fx(e, t * 7, n);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addYears.js
function Tx(e, t, n) {
	return px(e, t * 12, n);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/max.js
function Ex(e, t) {
	let n, r = t?.in;
	return e.forEach((e) => {
		!r && typeof e == "object" && (r = dx.bind(null, e));
		let t = Z(e, r);
		(!n || n < t || isNaN(+t)) && (n = t);
	}), dx(r, n || NaN);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/min.js
function Dx(e, t) {
	let n, r = t?.in;
	return e.forEach((e) => {
		!r && typeof e == "object" && (r = dx.bind(null, e));
		let t = Z(e, r);
		(!n || n > t || isNaN(+t)) && (n = t);
	}), dx(r, n || NaN);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isSameDay.js
function Ox(e, t, n) {
	let [r, i] = bx(n?.in, e, t);
	return +xx(r) == +xx(i);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isDate.js
function kx(e) {
	return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isValid.js
function Ax(e) {
	return !(!kx(e) && typeof e != "number" || isNaN(+Z(e)));
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/differenceInCalendarMonths.js
function jx(e, t, n) {
	let [r, i] = bx(n?.in, e, t), a = r.getFullYear() - i.getFullYear(), o = r.getMonth() - i.getMonth();
	return a * 12 + o;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/endOfMonth.js
function Mx(e, t) {
	let n = Z(e, t?.in), r = n.getMonth();
	return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/normalizeInterval.js
function Nx(e, t) {
	let [n, r] = bx(e, t.start, t.end);
	return {
		start: n,
		end: r
	};
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/eachMonthOfInterval.js
function Px(e, t) {
	let { start: n, end: r } = Nx(t?.in, e), i = +n > +r, a = i ? +n : +r, o = i ? r : n;
	o.setHours(0, 0, 0, 0), o.setDate(1);
	let s = t?.step ?? 1;
	if (!s) return [];
	s < 0 && (s = -s, i = !i);
	let c = [];
	for (; +o <= a;) c.push(dx(n, o)), o.setMonth(o.getMonth() + s);
	return i ? c.reverse() : c;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfMonth.js
function Fx(e, t) {
	let n = Z(e, t?.in);
	return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/endOfYear.js
function Ix(e, t) {
	let n = Z(e, t?.in), r = n.getFullYear();
	return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfYear.js
function Lx(e, t) {
	let n = Z(e, t?.in);
	return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/eachYearOfInterval.js
function Rx(e, t) {
	let { start: n, end: r } = Nx(t?.in, e), i = +n > +r, a = i ? +n : +r, o = i ? r : n;
	o.setHours(0, 0, 0, 0), o.setMonth(0, 1);
	let s = t?.step ?? 1;
	if (!s) return [];
	s < 0 && (s = -s, i = !i);
	let c = [];
	for (; +o <= a;) c.push(dx(n, o)), o.setFullYear(o.getFullYear() + s);
	return i ? c.reverse() : c;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/endOfWeek.js
function zx(e, t) {
	let n = hx(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, i = Z(e, t?.in), a = i.getDay(), o = (a < r ? -7 : 0) + 6 - (a - r);
	return i.setDate(i.getDate() + o), i.setHours(23, 59, 59, 999), i;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/endOfISOWeek.js
function Bx(e, t) {
	return zx(e, {
		...t,
		weekStartsOn: 1
	});
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US/_lib/formatDistance.js
var Vx = {
	lessThanXSeconds: {
		one: "less than a second",
		other: "less than {{count}} seconds"
	},
	xSeconds: {
		one: "1 second",
		other: "{{count}} seconds"
	},
	halfAMinute: "half a minute",
	lessThanXMinutes: {
		one: "less than a minute",
		other: "less than {{count}} minutes"
	},
	xMinutes: {
		one: "1 minute",
		other: "{{count}} minutes"
	},
	aboutXHours: {
		one: "about 1 hour",
		other: "about {{count}} hours"
	},
	xHours: {
		one: "1 hour",
		other: "{{count}} hours"
	},
	xDays: {
		one: "1 day",
		other: "{{count}} days"
	},
	aboutXWeeks: {
		one: "about 1 week",
		other: "about {{count}} weeks"
	},
	xWeeks: {
		one: "1 week",
		other: "{{count}} weeks"
	},
	aboutXMonths: {
		one: "about 1 month",
		other: "about {{count}} months"
	},
	xMonths: {
		one: "1 month",
		other: "{{count}} months"
	},
	aboutXYears: {
		one: "about 1 year",
		other: "about {{count}} years"
	},
	xYears: {
		one: "1 year",
		other: "{{count}} years"
	},
	overXYears: {
		one: "over 1 year",
		other: "over {{count}} years"
	},
	almostXYears: {
		one: "almost 1 year",
		other: "almost {{count}} years"
	}
}, Hx = (e, t, n) => {
	let r, i = Vx[e];
	return r = typeof i == "string" ? i : t === 1 ? i.one : i.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildFormatLongFn.js
function Ux(e) {
	return (t = {}) => {
		let n = t.width ? String(t.width) : e.defaultWidth;
		return e.formats[n] || e.formats[e.defaultWidth];
	};
}
var Wx = {
	date: Ux({
		formats: {
			full: "EEEE, MMMM do, y",
			long: "MMMM do, y",
			medium: "MMM d, y",
			short: "MM/dd/yyyy"
		},
		defaultWidth: "full"
	}),
	time: Ux({
		formats: {
			full: "h:mm:ss a zzzz",
			long: "h:mm:ss a z",
			medium: "h:mm:ss a",
			short: "h:mm a"
		},
		defaultWidth: "full"
	}),
	dateTime: Ux({
		formats: {
			full: "{{date}} 'at' {{time}}",
			long: "{{date}} 'at' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, Gx = {
	lastWeek: "'last' eeee 'at' p",
	yesterday: "'yesterday at' p",
	today: "'today at' p",
	tomorrow: "'tomorrow at' p",
	nextWeek: "eeee 'at' p",
	other: "P"
}, Kx = (e, t, n, r) => Gx[e];
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildLocalizeFn.js
function qx(e) {
	return (t, n) => {
		let r = n?.context ? String(n.context) : "standalone", i;
		if (r === "formatting" && e.formattingValues) {
			let t = e.defaultFormattingWidth || e.defaultWidth, r = n?.width ? String(n.width) : t;
			i = e.formattingValues[r] || e.formattingValues[t];
		} else {
			let t = e.defaultWidth, r = n?.width ? String(n.width) : e.defaultWidth;
			i = e.values[r] || e.values[t];
		}
		let a = e.argumentCallback ? e.argumentCallback(t) : t;
		return i[a];
	};
}
var Jx = {
	ordinalNumber: (e, t) => {
		let n = Number(e), r = n % 100;
		if (r > 20 || r < 10) switch (r % 10) {
			case 1: return n + "st";
			case 2: return n + "nd";
			case 3: return n + "rd";
		}
		return n + "th";
	},
	era: qx({
		values: {
			narrow: ["B", "A"],
			abbreviated: ["BC", "AD"],
			wide: ["Before Christ", "Anno Domini"]
		},
		defaultWidth: "wide"
	}),
	quarter: qx({
		values: {
			narrow: [
				"1",
				"2",
				"3",
				"4"
			],
			abbreviated: [
				"Q1",
				"Q2",
				"Q3",
				"Q4"
			],
			wide: [
				"1st quarter",
				"2nd quarter",
				"3rd quarter",
				"4th quarter"
			]
		},
		defaultWidth: "wide",
		argumentCallback: (e) => e - 1
	}),
	month: qx({
		values: {
			narrow: [
				"J",
				"F",
				"M",
				"A",
				"M",
				"J",
				"J",
				"A",
				"S",
				"O",
				"N",
				"D"
			],
			abbreviated: [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec"
			],
			wide: [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December"
			]
		},
		defaultWidth: "wide"
	}),
	day: qx({
		values: {
			narrow: [
				"S",
				"M",
				"T",
				"W",
				"T",
				"F",
				"S"
			],
			short: [
				"Su",
				"Mo",
				"Tu",
				"We",
				"Th",
				"Fr",
				"Sa"
			],
			abbreviated: [
				"Sun",
				"Mon",
				"Tue",
				"Wed",
				"Thu",
				"Fri",
				"Sat"
			],
			wide: [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday"
			]
		},
		defaultWidth: "wide"
	}),
	dayPeriod: qx({
		values: {
			narrow: {
				am: "a",
				pm: "p",
				midnight: "mi",
				noon: "n",
				morning: "morning",
				afternoon: "afternoon",
				evening: "evening",
				night: "night"
			},
			abbreviated: {
				am: "AM",
				pm: "PM",
				midnight: "midnight",
				noon: "noon",
				morning: "morning",
				afternoon: "afternoon",
				evening: "evening",
				night: "night"
			},
			wide: {
				am: "a.m.",
				pm: "p.m.",
				midnight: "midnight",
				noon: "noon",
				morning: "morning",
				afternoon: "afternoon",
				evening: "evening",
				night: "night"
			}
		},
		defaultWidth: "wide",
		formattingValues: {
			narrow: {
				am: "a",
				pm: "p",
				midnight: "mi",
				noon: "n",
				morning: "in the morning",
				afternoon: "in the afternoon",
				evening: "in the evening",
				night: "at night"
			},
			abbreviated: {
				am: "AM",
				pm: "PM",
				midnight: "midnight",
				noon: "noon",
				morning: "in the morning",
				afternoon: "in the afternoon",
				evening: "in the evening",
				night: "at night"
			},
			wide: {
				am: "a.m.",
				pm: "p.m.",
				midnight: "midnight",
				noon: "noon",
				morning: "in the morning",
				afternoon: "in the afternoon",
				evening: "in the evening",
				night: "at night"
			}
		},
		defaultFormattingWidth: "wide"
	})
};
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildMatchFn.js
function Yx(e) {
	return (t, n = {}) => {
		let r = n.width, i = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], a = t.match(i);
		if (!a) return null;
		let o = a[0], s = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(s) ? Zx(s, (e) => e.test(o)) : Xx(s, (e) => e.test(o)), l;
		l = e.valueCallback ? e.valueCallback(c) : c, l = n.valueCallback ? n.valueCallback(l) : l;
		let u = t.slice(o.length);
		return {
			value: l,
			rest: u
		};
	};
}
function Xx(e, t) {
	for (let n in e) if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n])) return n;
}
function Zx(e, t) {
	for (let n = 0; n < e.length; n++) if (t(e[n])) return n;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildMatchPatternFn.js
function Qx(e) {
	return (t, n = {}) => {
		let r = t.match(e.matchPattern);
		if (!r) return null;
		let i = r[0], a = t.match(e.parsePattern);
		if (!a) return null;
		let o = e.valueCallback ? e.valueCallback(a[0]) : a[0];
		o = n.valueCallback ? n.valueCallback(o) : o;
		let s = t.slice(i.length);
		return {
			value: o,
			rest: s
		};
	};
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US.js
var $x = {
	code: "en-US",
	formatDistance: Hx,
	formatLong: Wx,
	formatRelative: Kx,
	localize: Jx,
	match: {
		ordinalNumber: Qx({
			matchPattern: /^(\d+)(th|st|nd|rd)?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: Yx({
			matchPatterns: {
				narrow: /^(b|a)/i,
				abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
				wide: /^(before christ|before common era|anno domini|common era)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^b/i, /^(a|c)/i] },
			defaultParseWidth: "any"
		}),
		quarter: Yx({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^q[1234]/i,
				wide: /^[1234](th|st|nd|rd)? quarter/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/1/i,
				/2/i,
				/3/i,
				/4/i
			] },
			defaultParseWidth: "any",
			valueCallback: (e) => e + 1
		}),
		month: Yx({
			matchPatterns: {
				narrow: /^[jfmasond]/i,
				abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
				wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^j/i,
					/^f/i,
					/^m/i,
					/^a/i,
					/^m/i,
					/^j/i,
					/^j/i,
					/^a/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				],
				any: [
					/^ja/i,
					/^f/i,
					/^mar/i,
					/^ap/i,
					/^may/i,
					/^jun/i,
					/^jul/i,
					/^au/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: Yx({
			matchPatterns: {
				narrow: /^[smtwf]/i,
				short: /^(su|mo|tu|we|th|fr|sa)/i,
				abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
				wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^s/i,
					/^m/i,
					/^t/i,
					/^w/i,
					/^t/i,
					/^f/i,
					/^s/i
				],
				any: [
					/^su/i,
					/^m/i,
					/^tu/i,
					/^w/i,
					/^th/i,
					/^f/i,
					/^sa/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: Yx({
			matchPatterns: {
				narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
				any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^a/i,
				pm: /^p/i,
				midnight: /^mi/i,
				noon: /^no/i,
				morning: /morning/i,
				afternoon: /afternoon/i,
				evening: /evening/i,
				night: /night/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 0,
		firstWeekContainsDate: 1
	}
};
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getDayOfYear.js
function eS(e, t) {
	let n = Z(e, t?.in);
	return Sx(n, Lx(n)) + 1;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getISOWeek.js
function tS(e, t) {
	let n = Z(e, t?.in), r = _x(n) - +Cx(n);
	return Math.round(r / sx) + 1;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getWeekYear.js
function nS(e, t) {
	let n = Z(e, t?.in), r = n.getFullYear(), i = hx(), a = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? i.firstWeekContainsDate ?? i.locale?.options?.firstWeekContainsDate ?? 1, o = dx(t?.in || e, 0);
	o.setFullYear(r + 1, 0, a), o.setHours(0, 0, 0, 0);
	let s = gx(o, t), c = dx(t?.in || e, 0);
	c.setFullYear(r, 0, a), c.setHours(0, 0, 0, 0);
	let l = gx(c, t);
	return +n >= +s ? r + 1 : +n >= +l ? r : r - 1;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfWeekYear.js
function rS(e, t) {
	let n = hx(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, i = nS(e, t), a = dx(t?.in || e, 0);
	return a.setFullYear(i, 0, r), a.setHours(0, 0, 0, 0), gx(a, t);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getWeek.js
function iS(e, t) {
	let n = Z(e, t?.in), r = gx(n, t) - +rS(n, t);
	return Math.round(r / sx) + 1;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/addLeadingZeros.js
function Q(e, t) {
	return (e < 0 ? "-" : "") + Math.abs(e).toString().padStart(t, "0");
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/format/lightFormatters.js
var aS = {
	y(e, t) {
		let n = e.getFullYear(), r = n > 0 ? n : 1 - n;
		return Q(t === "yy" ? r % 100 : r, t.length);
	},
	M(e, t) {
		let n = e.getMonth();
		return t === "M" ? String(n + 1) : Q(n + 1, 2);
	},
	d(e, t) {
		return Q(e.getDate(), t.length);
	},
	a(e, t) {
		let n = e.getHours() / 12 >= 1 ? "pm" : "am";
		switch (t) {
			case "a":
			case "aa": return n.toUpperCase();
			case "aaa": return n;
			case "aaaaa": return n[0];
			default: return n === "am" ? "a.m." : "p.m.";
		}
	},
	h(e, t) {
		return Q(e.getHours() % 12 || 12, t.length);
	},
	H(e, t) {
		return Q(e.getHours(), t.length);
	},
	m(e, t) {
		return Q(e.getMinutes(), t.length);
	},
	s(e, t) {
		return Q(e.getSeconds(), t.length);
	},
	S(e, t) {
		let n = t.length, r = e.getMilliseconds();
		return Q(Math.trunc(r * 10 ** (n - 3)), t.length);
	}
}, oS = {
	am: "am",
	pm: "pm",
	midnight: "midnight",
	noon: "noon",
	morning: "morning",
	afternoon: "afternoon",
	evening: "evening",
	night: "night"
}, sS = {
	G: function(e, t, n) {
		let r = +(e.getFullYear() > 0);
		switch (t) {
			case "G":
			case "GG":
			case "GGG": return n.era(r, { width: "abbreviated" });
			case "GGGGG": return n.era(r, { width: "narrow" });
			default: return n.era(r, { width: "wide" });
		}
	},
	y: function(e, t, n) {
		if (t === "yo") {
			let t = e.getFullYear(), r = t > 0 ? t : 1 - t;
			return n.ordinalNumber(r, { unit: "year" });
		}
		return aS.y(e, t);
	},
	Y: function(e, t, n, r) {
		let i = nS(e, r), a = i > 0 ? i : 1 - i;
		return t === "YY" ? Q(a % 100, 2) : t === "Yo" ? n.ordinalNumber(a, { unit: "year" }) : Q(a, t.length);
	},
	R: function(e, t) {
		return Q(vx(e), t.length);
	},
	u: function(e, t) {
		return Q(e.getFullYear(), t.length);
	},
	Q: function(e, t, n) {
		let r = Math.ceil((e.getMonth() + 1) / 3);
		switch (t) {
			case "Q": return String(r);
			case "QQ": return Q(r, 2);
			case "Qo": return n.ordinalNumber(r, { unit: "quarter" });
			case "QQQ": return n.quarter(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "QQQQQ": return n.quarter(r, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.quarter(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	q: function(e, t, n) {
		let r = Math.ceil((e.getMonth() + 1) / 3);
		switch (t) {
			case "q": return String(r);
			case "qq": return Q(r, 2);
			case "qo": return n.ordinalNumber(r, { unit: "quarter" });
			case "qqq": return n.quarter(r, {
				width: "abbreviated",
				context: "standalone"
			});
			case "qqqqq": return n.quarter(r, {
				width: "narrow",
				context: "standalone"
			});
			default: return n.quarter(r, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	M: function(e, t, n) {
		let r = e.getMonth();
		switch (t) {
			case "M":
			case "MM": return aS.M(e, t);
			case "Mo": return n.ordinalNumber(r + 1, { unit: "month" });
			case "MMM": return n.month(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "MMMMM": return n.month(r, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.month(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	L: function(e, t, n) {
		let r = e.getMonth();
		switch (t) {
			case "L": return String(r + 1);
			case "LL": return Q(r + 1, 2);
			case "Lo": return n.ordinalNumber(r + 1, { unit: "month" });
			case "LLL": return n.month(r, {
				width: "abbreviated",
				context: "standalone"
			});
			case "LLLLL": return n.month(r, {
				width: "narrow",
				context: "standalone"
			});
			default: return n.month(r, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	w: function(e, t, n, r) {
		let i = iS(e, r);
		return t === "wo" ? n.ordinalNumber(i, { unit: "week" }) : Q(i, t.length);
	},
	I: function(e, t, n) {
		let r = tS(e);
		return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : Q(r, t.length);
	},
	d: function(e, t, n) {
		return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : aS.d(e, t);
	},
	D: function(e, t, n) {
		let r = eS(e);
		return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : Q(r, t.length);
	},
	E: function(e, t, n) {
		let r = e.getDay();
		switch (t) {
			case "E":
			case "EE":
			case "EEE": return n.day(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "EEEEE": return n.day(r, {
				width: "narrow",
				context: "formatting"
			});
			case "EEEEEE": return n.day(r, {
				width: "short",
				context: "formatting"
			});
			default: return n.day(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	e: function(e, t, n, r) {
		let i = e.getDay(), a = (i - r.weekStartsOn + 8) % 7 || 7;
		switch (t) {
			case "e": return String(a);
			case "ee": return Q(a, 2);
			case "eo": return n.ordinalNumber(a, { unit: "day" });
			case "eee": return n.day(i, {
				width: "abbreviated",
				context: "formatting"
			});
			case "eeeee": return n.day(i, {
				width: "narrow",
				context: "formatting"
			});
			case "eeeeee": return n.day(i, {
				width: "short",
				context: "formatting"
			});
			default: return n.day(i, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	c: function(e, t, n, r) {
		let i = e.getDay(), a = (i - r.weekStartsOn + 8) % 7 || 7;
		switch (t) {
			case "c": return String(a);
			case "cc": return Q(a, t.length);
			case "co": return n.ordinalNumber(a, { unit: "day" });
			case "ccc": return n.day(i, {
				width: "abbreviated",
				context: "standalone"
			});
			case "ccccc": return n.day(i, {
				width: "narrow",
				context: "standalone"
			});
			case "cccccc": return n.day(i, {
				width: "short",
				context: "standalone"
			});
			default: return n.day(i, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	i: function(e, t, n) {
		let r = e.getDay(), i = r === 0 ? 7 : r;
		switch (t) {
			case "i": return String(i);
			case "ii": return Q(i, t.length);
			case "io": return n.ordinalNumber(i, { unit: "day" });
			case "iii": return n.day(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "iiiii": return n.day(r, {
				width: "narrow",
				context: "formatting"
			});
			case "iiiiii": return n.day(r, {
				width: "short",
				context: "formatting"
			});
			default: return n.day(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	a: function(e, t, n) {
		let r = e.getHours() / 12 >= 1 ? "pm" : "am";
		switch (t) {
			case "a":
			case "aa": return n.dayPeriod(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "aaa": return n.dayPeriod(r, {
				width: "abbreviated",
				context: "formatting"
			}).toLowerCase();
			case "aaaaa": return n.dayPeriod(r, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.dayPeriod(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	b: function(e, t, n) {
		let r = e.getHours(), i;
		switch (i = r === 12 ? oS.noon : r === 0 ? oS.midnight : r / 12 >= 1 ? "pm" : "am", t) {
			case "b":
			case "bb": return n.dayPeriod(i, {
				width: "abbreviated",
				context: "formatting"
			});
			case "bbb": return n.dayPeriod(i, {
				width: "abbreviated",
				context: "formatting"
			}).toLowerCase();
			case "bbbbb": return n.dayPeriod(i, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.dayPeriod(i, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	B: function(e, t, n) {
		let r = e.getHours(), i;
		switch (i = r >= 17 ? oS.evening : r >= 12 ? oS.afternoon : r >= 4 ? oS.morning : oS.night, t) {
			case "B":
			case "BB":
			case "BBB": return n.dayPeriod(i, {
				width: "abbreviated",
				context: "formatting"
			});
			case "BBBBB": return n.dayPeriod(i, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.dayPeriod(i, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	h: function(e, t, n) {
		if (t === "ho") {
			let t = e.getHours() % 12;
			return t === 0 && (t = 12), n.ordinalNumber(t, { unit: "hour" });
		}
		return aS.h(e, t);
	},
	H: function(e, t, n) {
		return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : aS.H(e, t);
	},
	K: function(e, t, n) {
		let r = e.getHours() % 12;
		return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : Q(r, t.length);
	},
	k: function(e, t, n) {
		let r = e.getHours();
		return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : Q(r, t.length);
	},
	m: function(e, t, n) {
		return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : aS.m(e, t);
	},
	s: function(e, t, n) {
		return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : aS.s(e, t);
	},
	S: function(e, t) {
		return aS.S(e, t);
	},
	X: function(e, t, n) {
		let r = e.getTimezoneOffset();
		if (r === 0) return "Z";
		switch (t) {
			case "X": return lS(r);
			case "XXXX":
			case "XX": return uS(r);
			default: return uS(r, ":");
		}
	},
	x: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "x": return lS(r);
			case "xxxx":
			case "xx": return uS(r);
			default: return uS(r, ":");
		}
	},
	O: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "O":
			case "OO":
			case "OOO": return "GMT" + cS(r, ":");
			default: return "GMT" + uS(r, ":");
		}
	},
	z: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "z":
			case "zz":
			case "zzz": return "GMT" + cS(r, ":");
			default: return "GMT" + uS(r, ":");
		}
	},
	t: function(e, t, n) {
		return Q(Math.trunc(e / 1e3), t.length);
	},
	T: function(e, t, n) {
		return Q(+e, t.length);
	}
};
function cS(e, t = "") {
	let n = e > 0 ? "-" : "+", r = Math.abs(e), i = Math.trunc(r / 60), a = r % 60;
	return a === 0 ? n + String(i) : n + String(i) + t + Q(a, 2);
}
function lS(e, t) {
	return e % 60 == 0 ? (e > 0 ? "-" : "+") + Q(Math.abs(e) / 60, 2) : uS(e, t);
}
function uS(e, t = "") {
	let n = e > 0 ? "-" : "+", r = Math.abs(e), i = Q(Math.trunc(r / 60), 2), a = Q(r % 60, 2);
	return n + i + t + a;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/format/longFormatters.js
var dS = (e, t) => {
	switch (e) {
		case "P": return t.date({ width: "short" });
		case "PP": return t.date({ width: "medium" });
		case "PPP": return t.date({ width: "long" });
		default: return t.date({ width: "full" });
	}
}, fS = (e, t) => {
	switch (e) {
		case "p": return t.time({ width: "short" });
		case "pp": return t.time({ width: "medium" });
		case "ppp": return t.time({ width: "long" });
		default: return t.time({ width: "full" });
	}
}, pS = {
	p: fS,
	P: (e, t) => {
		let n = e.match(/(P+)(p+)?/) || [], r = n[1], i = n[2];
		if (!i) return dS(e, t);
		let a;
		switch (r) {
			case "P":
				a = t.dateTime({ width: "short" });
				break;
			case "PP":
				a = t.dateTime({ width: "medium" });
				break;
			case "PPP":
				a = t.dateTime({ width: "long" });
				break;
			default:
				a = t.dateTime({ width: "full" });
				break;
		}
		return a.replace("{{date}}", dS(r, t)).replace("{{time}}", fS(i, t));
	}
}, mS = /^D+$/, hS = /^Y+$/, gS = [
	"D",
	"DD",
	"YY",
	"YYYY"
];
function _S(e) {
	return mS.test(e);
}
function vS(e) {
	return hS.test(e);
}
function yS(e, t, n) {
	let r = bS(e, t, n);
	if (console.warn(r), gS.includes(e)) throw RangeError(r);
}
function bS(e, t, n) {
	let r = e[0] === "Y" ? "years" : "days of the month";
	return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/format.js
var xS = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, SS = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, CS = /^'([^]*?)'?$/, wS = /''/g, TS = /[a-zA-Z]/;
function ES(e, t, n) {
	let r = hx(), i = n?.locale ?? r.locale ?? $x, a = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, o = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, s = Z(e, n?.in);
	if (!Ax(s)) throw RangeError("Invalid time value");
	let c = t.match(SS).map((e) => {
		let t = e[0];
		if (t === "p" || t === "P") {
			let n = pS[t];
			return n(e, i.formatLong);
		}
		return e;
	}).join("").match(xS).map((e) => {
		if (e === "''") return {
			isToken: !1,
			value: "'"
		};
		let t = e[0];
		if (t === "'") return {
			isToken: !1,
			value: DS(e)
		};
		if (sS[t]) return {
			isToken: !0,
			value: e
		};
		if (t.match(TS)) throw RangeError("Format string contains an unescaped latin alphabet character `" + t + "`");
		return {
			isToken: !1,
			value: e
		};
	});
	i.localize.preprocessor && (c = i.localize.preprocessor(s, c));
	let l = {
		firstWeekContainsDate: a,
		weekStartsOn: o,
		locale: i
	};
	return c.map((r) => {
		if (!r.isToken) return r.value;
		let a = r.value;
		(!n?.useAdditionalWeekYearTokens && vS(a) || !n?.useAdditionalDayOfYearTokens && _S(a)) && yS(a, t, String(e));
		let o = sS[a[0]];
		return o(s, a, i.localize, l);
	}).join("");
}
function DS(e) {
	let t = e.match(CS);
	return t ? t[1].replace(wS, "'") : e;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getDaysInMonth.js
function OS(e, t) {
	let n = Z(e, t?.in), r = n.getFullYear(), i = n.getMonth(), a = dx(n, 0);
	return a.setFullYear(r, i + 1, 0), a.setHours(0, 0, 0, 0), a.getDate();
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getMonth.js
function kS(e, t) {
	return Z(e, t?.in).getMonth();
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getYear.js
function AS(e, t) {
	return Z(e, t?.in).getFullYear();
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isAfter.js
function jS(e, t) {
	return +Z(e) > +Z(t);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isBefore.js
function MS(e, t) {
	return +Z(e) < +Z(t);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isSameMonth.js
function NS(e, t, n) {
	let [r, i] = bx(n?.in, e, t);
	return r.getFullYear() === i.getFullYear() && r.getMonth() === i.getMonth();
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isSameYear.js
function PS(e, t, n) {
	let [r, i] = bx(n?.in, e, t);
	return r.getFullYear() === i.getFullYear();
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/setMonth.js
function FS(e, t, n) {
	let r = Z(e, n?.in), i = r.getFullYear(), a = r.getDate(), o = dx(n?.in || e, 0);
	o.setFullYear(i, t, 15), o.setHours(0, 0, 0, 0);
	let s = OS(o);
	return r.setMonth(t, Math.min(a, s)), r;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/setYear.js
function IS(e, t, n) {
	let r = Z(e, n?.in);
	return isNaN(+r) ? dx(n?.in || e, NaN) : (r.setFullYear(t), r);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getBroadcastWeeksInMonth.js
var LS = 5, RS = 4;
function zS(e, t) {
	let n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, i = t.addDays(e, -r + 1), a = t.addDays(i, LS * 7 - 1);
	return t.getMonth(e) === t.getMonth(a) ? LS : RS;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/startOfBroadcastWeek.js
function BS(e, t) {
	let n = t.startOfMonth(e), r = n.getDay();
	return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/endOfBroadcastWeek.js
function VS(e, t) {
	let n = BS(e, t), r = zS(e, t);
	return t.addDays(n, r * 7 - 1);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/id/_lib/formatDistance.js
var HS = {
	lessThanXSeconds: {
		one: "kurang dari 1 detik",
		other: "kurang dari {{count}} detik"
	},
	xSeconds: {
		one: "1 detik",
		other: "{{count}} detik"
	},
	halfAMinute: "setengah menit",
	lessThanXMinutes: {
		one: "kurang dari 1 menit",
		other: "kurang dari {{count}} menit"
	},
	xMinutes: {
		one: "1 menit",
		other: "{{count}} menit"
	},
	aboutXHours: {
		one: "sekitar 1 jam",
		other: "sekitar {{count}} jam"
	},
	xHours: {
		one: "1 jam",
		other: "{{count}} jam"
	},
	xDays: {
		one: "1 hari",
		other: "{{count}} hari"
	},
	aboutXWeeks: {
		one: "sekitar 1 minggu",
		other: "sekitar {{count}} minggu"
	},
	xWeeks: {
		one: "1 minggu",
		other: "{{count}} minggu"
	},
	aboutXMonths: {
		one: "sekitar 1 bulan",
		other: "sekitar {{count}} bulan"
	},
	xMonths: {
		one: "1 bulan",
		other: "{{count}} bulan"
	},
	aboutXYears: {
		one: "sekitar 1 tahun",
		other: "sekitar {{count}} tahun"
	},
	xYears: {
		one: "1 tahun",
		other: "{{count}} tahun"
	},
	overXYears: {
		one: "lebih dari 1 tahun",
		other: "lebih dari {{count}} tahun"
	},
	almostXYears: {
		one: "hampir 1 tahun",
		other: "hampir {{count}} tahun"
	}
}, US = (e, t, n) => {
	let r, i = HS[e];
	return r = typeof i == "string" ? i : t === 1 ? i.one : i.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "dalam waktu " + r : r + " yang lalu" : r;
}, WS = {
	date: Ux({
		formats: {
			full: "EEEE, d MMMM yyyy",
			long: "d MMMM yyyy",
			medium: "d MMM yyyy",
			short: "d/M/yyyy"
		},
		defaultWidth: "full"
	}),
	time: Ux({
		formats: {
			full: "HH.mm.ss",
			long: "HH.mm.ss",
			medium: "HH.mm",
			short: "HH.mm"
		},
		defaultWidth: "full"
	}),
	dateTime: Ux({
		formats: {
			full: "{{date}} 'pukul' {{time}}",
			long: "{{date}} 'pukul' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, GS = {
	lastWeek: "eeee 'lalu pukul' p",
	yesterday: "'Kemarin pukul' p",
	today: "'Hari ini pukul' p",
	tomorrow: "'Besok pukul' p",
	nextWeek: "eeee 'pukul' p",
	other: "P"
}, KS = {
	code: "id",
	formatDistance: US,
	formatLong: WS,
	formatRelative: (e, t, n, r) => GS[e],
	localize: {
		ordinalNumber: (e, t) => "ke-" + Number(e),
		era: qx({
			values: {
				narrow: ["SM", "M"],
				abbreviated: ["SM", "M"],
				wide: ["Sebelum Masehi", "Masehi"]
			},
			defaultWidth: "wide"
		}),
		quarter: qx({
			values: {
				narrow: [
					"1",
					"2",
					"3",
					"4"
				],
				abbreviated: [
					"K1",
					"K2",
					"K3",
					"K4"
				],
				wide: [
					"Kuartal ke-1",
					"Kuartal ke-2",
					"Kuartal ke-3",
					"Kuartal ke-4"
				]
			},
			defaultWidth: "wide",
			argumentCallback: (e) => e - 1
		}),
		month: qx({
			values: {
				narrow: [
					"J",
					"F",
					"M",
					"A",
					"M",
					"J",
					"J",
					"A",
					"S",
					"O",
					"N",
					"D"
				],
				abbreviated: [
					"Jan",
					"Feb",
					"Mar",
					"Apr",
					"Mei",
					"Jun",
					"Jul",
					"Agt",
					"Sep",
					"Okt",
					"Nov",
					"Des"
				],
				wide: [
					"Januari",
					"Februari",
					"Maret",
					"April",
					"Mei",
					"Juni",
					"Juli",
					"Agustus",
					"September",
					"Oktober",
					"November",
					"Desember"
				]
			},
			defaultWidth: "wide"
		}),
		day: qx({
			values: {
				narrow: [
					"M",
					"S",
					"S",
					"R",
					"K",
					"J",
					"S"
				],
				short: [
					"Min",
					"Sen",
					"Sel",
					"Rab",
					"Kam",
					"Jum",
					"Sab"
				],
				abbreviated: [
					"Min",
					"Sen",
					"Sel",
					"Rab",
					"Kam",
					"Jum",
					"Sab"
				],
				wide: [
					"Minggu",
					"Senin",
					"Selasa",
					"Rabu",
					"Kamis",
					"Jumat",
					"Sabtu"
				]
			},
			defaultWidth: "wide"
		}),
		dayPeriod: qx({
			values: {
				narrow: {
					am: "AM",
					pm: "PM",
					midnight: "tengah malam",
					noon: "tengah hari",
					morning: "pagi",
					afternoon: "siang",
					evening: "sore",
					night: "malam"
				},
				abbreviated: {
					am: "AM",
					pm: "PM",
					midnight: "tengah malam",
					noon: "tengah hari",
					morning: "pagi",
					afternoon: "siang",
					evening: "sore",
					night: "malam"
				},
				wide: {
					am: "AM",
					pm: "PM",
					midnight: "tengah malam",
					noon: "tengah hari",
					morning: "pagi",
					afternoon: "siang",
					evening: "sore",
					night: "malam"
				}
			},
			defaultWidth: "wide",
			formattingValues: {
				narrow: {
					am: "AM",
					pm: "PM",
					midnight: "tengah malam",
					noon: "tengah hari",
					morning: "pagi",
					afternoon: "siang",
					evening: "sore",
					night: "malam"
				},
				abbreviated: {
					am: "AM",
					pm: "PM",
					midnight: "tengah malam",
					noon: "tengah hari",
					morning: "pagi",
					afternoon: "siang",
					evening: "sore",
					night: "malam"
				},
				wide: {
					am: "AM",
					pm: "PM",
					midnight: "tengah malam",
					noon: "tengah hari",
					morning: "pagi",
					afternoon: "siang",
					evening: "sore",
					night: "malam"
				}
			},
			defaultFormattingWidth: "wide"
		})
	},
	match: {
		ordinalNumber: Qx({
			matchPattern: /^ke-(\d+)?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: Yx({
			matchPatterns: {
				narrow: /^(sm|m)/i,
				abbreviated: /^(s\.?\s?m\.?|s\.?\s?e\.?\s?u\.?|m\.?|e\.?\s?u\.?)/i,
				wide: /^(sebelum masehi|sebelum era umum|masehi|era umum)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^s/i, /^(m|e)/i] },
			defaultParseWidth: "any"
		}),
		quarter: Yx({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^K-?\s[1234]/i,
				wide: /^Kuartal ke-?\s?[1234]/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/1/i,
				/2/i,
				/3/i,
				/4/i
			] },
			defaultParseWidth: "any",
			valueCallback: (e) => e + 1
		}),
		month: Yx({
			matchPatterns: {
				narrow: /^[jfmasond]/i,
				abbreviated: /^(jan|feb|mar|apr|mei|jun|jul|agt|sep|okt|nov|des)/i,
				wide: /^(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^j/i,
					/^f/i,
					/^m/i,
					/^a/i,
					/^m/i,
					/^j/i,
					/^j/i,
					/^a/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				],
				any: [
					/^ja/i,
					/^f/i,
					/^ma/i,
					/^ap/i,
					/^me/i,
					/^jun/i,
					/^jul/i,
					/^ag/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: Yx({
			matchPatterns: {
				narrow: /^[srkjm]/i,
				short: /^(min|sen|sel|rab|kam|jum|sab)/i,
				abbreviated: /^(min|sen|sel|rab|kam|jum|sab)/i,
				wide: /^(minggu|senin|selasa|rabu|kamis|jumat|sabtu)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^m/i,
					/^s/i,
					/^s/i,
					/^r/i,
					/^k/i,
					/^j/i,
					/^s/i
				],
				any: [
					/^m/i,
					/^sen/i,
					/^sel/i,
					/^r/i,
					/^k/i,
					/^j/i,
					/^sa/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: Yx({
			matchPatterns: {
				narrow: /^(a|p|tengah m|tengah h|(di(\swaktu)?) (pagi|siang|sore|malam))/i,
				any: /^([ap]\.?\s?m\.?|tengah malam|tengah hari|(di(\swaktu)?) (pagi|siang|sore|malam))/i
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^a/i,
				pm: /^pm/i,
				midnight: /^tengah m/i,
				noon: /^tengah h/i,
				morning: /pagi/i,
				afternoon: /siang/i,
				evening: /sore/i,
				night: /malam/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 1,
		firstWeekContainsDate: 1
	}
}, qS = {
	...$x,
	labels: {
		labelDayButton: (e, t, n, r) => {
			let i;
			i = r && typeof r.format == "function" ? r.format.bind(r) : (e, t) => ES(e, t, {
				locale: $x,
				...n
			});
			let a = i(e, "PPPP");
			return t.today && (a = `Today, ${a}`), t.selected && (a = `${a}, selected`), a;
		},
		labelMonthDropdown: "Choose the Month",
		labelNext: "Go to the Next Month",
		labelPrevious: "Go to the Previous Month",
		labelWeekNumber: (e) => `Week ${e}`,
		labelYearDropdown: "Choose the Year",
		labelGrid: (e, t, n) => {
			let r;
			return r = n && typeof n.format == "function" ? n.format.bind(n) : (e, n) => ES(e, n, {
				locale: $x,
				...t
			}), r(e, "LLLL yyyy");
		},
		labelGridcell: (e, t, n, r) => {
			let i;
			i = r && typeof r.format == "function" ? r.format.bind(r) : (e, t) => ES(e, t, {
				locale: $x,
				...n
			});
			let a = i(e, "PPPP");
			return t?.today && (a = `Today, ${a}`), a;
		},
		labelNav: "Navigation bar",
		labelWeekNumberHeader: "Week Number",
		labelWeekday: (e, t, n) => {
			let r;
			return r = n && typeof n.format == "function" ? n.format.bind(n) : (e, n) => ES(e, n, {
				locale: $x,
				...t
			}), r(e, "cccc");
		}
	}
}, JS = class e {
	constructor(e, t) {
		this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? ax.tz(this.options.timeZone) : new this.Date(), this.newDate = (e, t, n) => this.overrides?.newDate ? this.overrides.newDate(e, t, n) : this.options.timeZone ? new ax(e, t, n, this.options.timeZone) : new Date(e, t, n), this.addDays = (e, t) => this.overrides?.addDays ? this.overrides.addDays(e, t) : fx(e, t), this.addMonths = (e, t) => this.overrides?.addMonths ? this.overrides.addMonths(e, t) : px(e, t), this.addWeeks = (e, t) => this.overrides?.addWeeks ? this.overrides.addWeeks(e, t) : wx(e, t), this.addYears = (e, t) => this.overrides?.addYears ? this.overrides.addYears(e, t) : Tx(e, t), this.differenceInCalendarDays = (e, t) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(e, t) : Sx(e, t), this.differenceInCalendarMonths = (e, t) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(e, t) : jx(e, t), this.eachMonthOfInterval = (e) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(e) : Px(e), this.eachYearOfInterval = (e) => {
			let t = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(e) : Rx(e), n = new Set(t.map((e) => this.getYear(e)));
			if (n.size === t.length) return t;
			let r = [];
			return n.forEach((e) => {
				r.push(new Date(e, 0, 1));
			}), r;
		}, this.endOfBroadcastWeek = (e) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(e) : VS(e, this), this.endOfISOWeek = (e) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(e) : Bx(e), this.endOfMonth = (e) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(e) : Mx(e), this.endOfWeek = (e, t) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(e, t) : zx(e, this.options), this.endOfYear = (e) => this.overrides?.endOfYear ? this.overrides.endOfYear(e) : Ix(e), this.format = (e, t, n) => {
			let r = this.overrides?.format ? this.overrides.format(e, t, this.options) : ES(e, t, this.options);
			return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(r) : r;
		}, this.getISOWeek = (e) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(e) : tS(e), this.getMonth = (e, t) => this.overrides?.getMonth ? this.overrides.getMonth(e, this.options) : kS(e, this.options), this.getYear = (e, t) => this.overrides?.getYear ? this.overrides.getYear(e, this.options) : AS(e, this.options), this.getWeek = (e, t) => this.overrides?.getWeek ? this.overrides.getWeek(e, this.options) : iS(e, this.options), this.isAfter = (e, t) => this.overrides?.isAfter ? this.overrides.isAfter(e, t) : jS(e, t), this.isBefore = (e, t) => this.overrides?.isBefore ? this.overrides.isBefore(e, t) : MS(e, t), this.isDate = (e) => this.overrides?.isDate ? this.overrides.isDate(e) : kx(e), this.isSameDay = (e, t) => this.overrides?.isSameDay ? this.overrides.isSameDay(e, t) : Ox(e, t), this.isSameMonth = (e, t) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(e, t) : NS(e, t), this.isSameYear = (e, t) => this.overrides?.isSameYear ? this.overrides.isSameYear(e, t) : PS(e, t), this.max = (e) => this.overrides?.max ? this.overrides.max(e) : Ex(e), this.min = (e) => this.overrides?.min ? this.overrides.min(e) : Dx(e), this.setMonth = (e, t) => this.overrides?.setMonth ? this.overrides.setMonth(e, t) : FS(e, t), this.setYear = (e, t) => this.overrides?.setYear ? this.overrides.setYear(e, t) : IS(e, t), this.startOfBroadcastWeek = (e, t) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(e, this) : BS(e, this), this.startOfDay = (e) => this.overrides?.startOfDay ? this.overrides.startOfDay(e) : xx(e), this.startOfISOWeek = (e) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(e) : _x(e), this.startOfMonth = (e) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(e) : Fx(e), this.startOfWeek = (e, t) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(e, this.options) : gx(e, this.options), this.startOfYear = (e) => this.overrides?.startOfYear ? this.overrides.startOfYear(e) : Lx(e), this.options = {
			locale: qS,
			...e
		}, this.overrides = t;
	}
	getDigitMap() {
		let { numerals: e = "latn" } = this.options, t = new Intl.NumberFormat("en-US", { numberingSystem: e }), n = {};
		for (let e = 0; e < 10; e++) n[e.toString()] = t.format(e);
		return n;
	}
	replaceDigits(e) {
		let t = this.getDigitMap();
		return e.replace(/\d/g, (e) => t[e] || e);
	}
	formatNumber(e) {
		return this.replaceDigits(e.toString());
	}
	getMonthYearOrder() {
		let t = this.options.locale?.code;
		return t && e.yearFirstLocales.has(t) ? "year-first" : "month-first";
	}
	formatMonthYear(t) {
		let { locale: n, timeZone: r, numerals: i } = this.options, a = n?.code;
		if (a && e.yearFirstLocales.has(a)) try {
			return new Intl.DateTimeFormat(a, {
				month: "long",
				year: "numeric",
				timeZone: r,
				numberingSystem: i
			}).format(t);
		} catch {}
		let o = this.getMonthYearOrder() === "year-first" ? "y LLLL" : "LLLL y";
		return this.format(t, o);
	}
};
JS.yearFirstLocales = new Set([
	"eu",
	"hu",
	"ja",
	"ja-Hira",
	"ja-JP",
	"ko",
	"ko-KR",
	"lt",
	"lt-LT",
	"lv",
	"lv-LV",
	"mn",
	"mn-MN",
	"zh",
	"zh-CN",
	"zh-HK",
	"zh-TW"
]);
var YS = new JS(), XS = class {
	constructor(e, t, n = YS) {
		this.date = e, this.displayMonth = t, this.outside = !!(t && !n.isSameMonth(e, t)), this.dateLib = n, this.isoDate = n.format(e, "yyyy-MM-dd"), this.displayMonthId = n.format(t, "yyyy-MM"), this.dateMonthId = n.format(e, "yyyy-MM");
	}
	isEqualTo(e) {
		return this.dateLib.isSameDay(e.date, this.date) && this.dateLib.isSameMonth(e.displayMonth, this.displayMonth);
	}
}, ZS = class {
	constructor(e, t) {
		this.date = e, this.weeks = t;
	}
}, QS = class {
	constructor(e, t) {
		this.days = t, this.weekNumber = e;
	}
};
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/Button.js
function $S(e) {
	return t.createElement("button", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/CaptionLabel.js
function eC(e) {
	return t.createElement("span", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/Chevron.js
function tC(e) {
	let { size: n = 24, orientation: r = "left", className: i } = e;
	return t.createElement("svg", {
		className: i,
		width: n,
		height: n,
		viewBox: "0 0 24 24"
	}, r === "up" && t.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }), r === "down" && t.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }), r === "left" && t.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }), r === "right" && t.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" }));
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/Day.js
function nC(e) {
	let { day: n, modifiers: r, ...i } = e;
	return t.createElement("td", { ...i });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/DayButton.js
function rC(e) {
	let { day: n, modifiers: r, ...i } = e, a = t.useRef(null);
	return t.useEffect(() => {
		r.focused && a.current?.focus();
	}, [r.focused]), t.createElement("button", {
		ref: a,
		...i
	});
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/UI.js
var $;
(function(e) {
	e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})($ ||= {});
var iC;
(function(e) {
	e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(iC ||= {});
var aC;
(function(e) {
	e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(aC ||= {});
var oC;
(function(e) {
	e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(oC ||= {});
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/Dropdown.js
function sC(e) {
	let { options: n, className: r, components: i, classNames: a, ...o } = e, s = [a[$.Dropdown], r].join(" "), c = n?.find(({ value: e }) => e === o.value);
	return t.createElement("span", {
		"data-disabled": o.disabled,
		className: a[$.DropdownRoot]
	}, t.createElement(i.Select, {
		className: s,
		...o
	}, n?.map(({ value: e, label: n, disabled: r }) => t.createElement(i.Option, {
		key: e,
		value: e,
		disabled: r
	}, n))), t.createElement("span", {
		className: a[$.CaptionLabel],
		"aria-hidden": !0
	}, c?.label, t.createElement(i.Chevron, {
		orientation: "down",
		size: 18,
		className: a[$.Chevron]
	})));
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/DropdownNav.js
function cC(e) {
	return t.createElement("div", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/Footer.js
function lC(e) {
	return t.createElement("div", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/Month.js
function uC(e) {
	let { calendarMonth: n, displayIndex: r, ...i } = e;
	return t.createElement("div", { ...i }, e.children);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/MonthCaption.js
function dC(e) {
	let { calendarMonth: n, displayIndex: r, ...i } = e;
	return t.createElement("div", { ...i });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/MonthGrid.js
function fC(e) {
	return t.createElement("table", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/Months.js
function pC(e) {
	return t.createElement("div", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/useDayPicker.js
var mC = n(void 0);
function hC() {
	let e = o(mC);
	if (e === void 0) throw Error("useDayPicker() must be used within a custom component.");
	return e;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/MonthsDropdown.js
function gC(e) {
	let { components: n } = hC();
	return t.createElement(n.Dropdown, { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/Nav.js
function _C(e) {
	let { onPreviousClick: n, onNextClick: r, previousMonth: i, nextMonth: o, ...s } = e, { components: c, classNames: l, labels: { labelPrevious: u, labelNext: d } } = hC(), f = a((e) => {
		o && r?.(e);
	}, [o, r]), p = a((e) => {
		i && n?.(e);
	}, [i, n]);
	return t.createElement("nav", { ...s }, t.createElement(c.PreviousMonthButton, {
		type: "button",
		className: l[$.PreviousMonthButton],
		tabIndex: i ? void 0 : -1,
		"aria-disabled": i ? void 0 : !0,
		"aria-label": u(i),
		onClick: p
	}, t.createElement(c.Chevron, {
		disabled: i ? void 0 : !0,
		className: l[$.Chevron],
		orientation: "left"
	})), t.createElement(c.NextMonthButton, {
		type: "button",
		className: l[$.NextMonthButton],
		tabIndex: o ? void 0 : -1,
		"aria-disabled": o ? void 0 : !0,
		"aria-label": d(o),
		onClick: f
	}, t.createElement(c.Chevron, {
		disabled: o ? void 0 : !0,
		orientation: "right",
		className: l[$.Chevron]
	})));
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/NextMonthButton.js
function vC(e) {
	let { components: n } = hC();
	return t.createElement(n.Button, { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/Option.js
function yC(e) {
	return t.createElement("option", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/PreviousMonthButton.js
function bC(e) {
	let { components: n } = hC();
	return t.createElement(n.Button, { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/Root.js
function xC(e) {
	let { rootRef: n, ...r } = e;
	return t.createElement("div", {
		...r,
		ref: n
	});
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/Select.js
function SC(e) {
	return t.createElement("select", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/Week.js
function CC(e) {
	let { week: n, ...r } = e;
	return t.createElement("tr", { ...r });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/Weekday.js
function wC(e) {
	return t.createElement("th", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/Weekdays.js
function TC(e) {
	return t.createElement("thead", { "aria-hidden": !0 }, t.createElement("tr", { ...e }));
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/WeekNumber.js
function EC(e) {
	let { week: n, ...r } = e;
	return t.createElement("th", { ...r });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/WeekNumberHeader.js
function DC(e) {
	return t.createElement("th", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/Weeks.js
function OC(e) {
	return t.createElement("tbody", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/YearsDropdown.js
function kC(e) {
	let { components: n } = hC();
	return t.createElement(n.Dropdown, { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/custom-components.js
var AC = /* @__PURE__ */ y({
	Button: () => $S,
	CaptionLabel: () => eC,
	Chevron: () => tC,
	Day: () => nC,
	DayButton: () => rC,
	Dropdown: () => sC,
	DropdownNav: () => cC,
	Footer: () => lC,
	Month: () => uC,
	MonthCaption: () => dC,
	MonthGrid: () => fC,
	Months: () => pC,
	MonthsDropdown: () => gC,
	Nav: () => _C,
	NextMonthButton: () => vC,
	Option: () => yC,
	PreviousMonthButton: () => bC,
	Root: () => xC,
	Select: () => SC,
	Week: () => CC,
	WeekNumber: () => EC,
	WeekNumberHeader: () => DC,
	Weekday: () => wC,
	Weekdays: () => TC,
	Weeks: () => OC,
	YearsDropdown: () => kC
});
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/utils/rangeIncludesDate.js
function jC(e, t, n = !1, r = YS) {
	let { from: i, to: a } = e, { differenceInCalendarDays: o, isSameDay: s } = r;
	return i && a ? (o(a, i) < 0 && ([i, a] = [a, i]), o(t, i) >= +!!n && o(a, t) >= +!!n) : !n && a ? s(a, t) : !n && i ? s(i, t) : !1;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/utils/typeguards.js
function MC(e) {
	return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function NC(e) {
	return !!(e && typeof e == "object" && "from" in e);
}
function PC(e) {
	return !!(e && typeof e == "object" && "after" in e);
}
function FC(e) {
	return !!(e && typeof e == "object" && "before" in e);
}
function IC(e) {
	return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function LC(e, t) {
	return Array.isArray(e) && e.every(t.isDate);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/utils/dateMatchModifiers.js
function RC(e, t, n = YS) {
	let r = Array.isArray(t) ? t : [t], { isSameDay: i, differenceInCalendarDays: a, isAfter: o } = n;
	return r.some((t) => {
		if (typeof t == "boolean") return t;
		if (n.isDate(t)) return i(e, t);
		if (LC(t, n)) return t.some((t) => i(e, t));
		if (NC(t)) return jC(t, e, !1, n);
		if (IC(t)) return Array.isArray(t.dayOfWeek) ? t.dayOfWeek.includes(e.getDay()) : t.dayOfWeek === e.getDay();
		if (MC(t)) {
			let n = a(t.before, e), r = a(t.after, e), i = n > 0, s = r < 0;
			return o(t.before, t.after) ? s && i : i || s;
		}
		return PC(t) ? a(e, t.after) > 0 : FC(t) ? a(t.before, e) > 0 : typeof t == "function" ? t(e) : !1;
	});
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/createGetModifiers.js
function zC(e, t, n, r, i) {
	let { disabled: a, hidden: o, modifiers: s, showOutsideDays: c, broadcastCalendar: l, today: u = i.today() } = t, { isSameDay: d, isSameMonth: f, startOfMonth: p, isBefore: m, endOfMonth: h, isAfter: g } = i, _ = n && p(n), v = r && h(r), y = {
		[iC.focused]: [],
		[iC.outside]: [],
		[iC.disabled]: [],
		[iC.hidden]: [],
		[iC.today]: []
	}, b = {};
	for (let t of e) {
		let { date: e, displayMonth: n } = t, r = !!(n && !f(e, n)), p = !!(_ && m(e, _)), h = !!(v && g(e, v)), x = !!(a && RC(e, a, i)), S = !!(o && RC(e, o, i)) || p || h || !l && !c && r || l && c === !1 && r, C = d(e, u);
		r && y.outside.push(t), x && y.disabled.push(t), S && y.hidden.push(t), C && y.today.push(t), s && Object.keys(s).forEach((n) => {
			let r = s?.[n];
			r && RC(e, r, i) && (b[n] ? b[n].push(t) : b[n] = [t]);
		});
	}
	return (e) => {
		let t = {
			[iC.focused]: !1,
			[iC.disabled]: !1,
			[iC.hidden]: !1,
			[iC.outside]: !1,
			[iC.today]: !1
		}, n = {};
		for (let n in y) t[n] = y[n].some((t) => t === e);
		for (let t in b) n[t] = b[t].some((t) => t === e);
		return {
			...t,
			...n
		};
	};
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getClassNamesForModifiers.js
function BC(e, t, n = {}) {
	return Object.entries(e).filter(([, e]) => e === !0).reduce((e, [r]) => (n[r] ? e.push(n[r]) : t[iC[r]] ? e.push(t[iC[r]]) : t[aC[r]] && e.push(t[aC[r]]), e), [t[$.Day]]);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getComponents.js
function VC(e) {
	return {
		...AC,
		...e
	};
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getDataAttributes.js
function HC(e) {
	let t = {
		"data-mode": e.mode ?? void 0,
		"data-required": "required" in e ? e.required : void 0,
		"data-multiple-months": e.numberOfMonths && e.numberOfMonths > 1 || void 0,
		"data-week-numbers": e.showWeekNumber || void 0,
		"data-broadcast-calendar": e.broadcastCalendar || void 0,
		"data-nav-layout": e.navLayout || void 0
	};
	return Object.entries(e).forEach(([e, n]) => {
		e.startsWith("data-") && (t[e] = n);
	}), t;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getDefaultClassNames.js
function UC() {
	let e = {};
	for (let t in $) e[$[t]] = `rdp-${$[t]}`;
	for (let t in iC) e[iC[t]] = `rdp-${iC[t]}`;
	for (let t in aC) e[aC[t]] = `rdp-${aC[t]}`;
	for (let t in oC) e[oC[t]] = `rdp-${oC[t]}`;
	return e;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/formatters/formatCaption.js
function WC(e, t, n) {
	return (n ?? new JS(t)).formatMonthYear(e);
}
var GC = WC;
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/formatters/formatDay.js
function KC(e, t, n) {
	return (n ?? new JS(t)).format(e, "d");
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/formatters/formatMonthDropdown.js
function qC(e, t = YS) {
	return t.format(e, "LLLL");
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/formatters/formatWeekdayName.js
function JC(e, t, n) {
	return (n ?? new JS(t)).format(e, "cccccc");
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/formatters/formatWeekNumber.js
function YC(e, t = YS) {
	return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/formatters/formatWeekNumberHeader.js
function XC() {
	return "";
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/formatters/formatYearDropdown.js
function ZC(e, t = YS) {
	return t.format(e, "yyyy");
}
var QC = ZC, $C = /* @__PURE__ */ y({
	formatCaption: () => WC,
	formatDay: () => KC,
	formatMonthCaption: () => GC,
	formatMonthDropdown: () => qC,
	formatWeekNumber: () => YC,
	formatWeekNumberHeader: () => XC,
	formatWeekdayName: () => JC,
	formatYearCaption: () => QC,
	formatYearDropdown: () => ZC
});
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getFormatters.js
function ew(e) {
	return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
		...$C,
		...e
	};
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/labels/labelDayButton.js
function tw(e, t, n, r) {
	let i = (r ?? new JS(n)).format(e, "PPPP");
	return t.today && (i = `Today, ${i}`), t.selected && (i = `${i}, selected`), i;
}
var nw = tw;
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/labels/labelGrid.js
function rw(e, t, n) {
	return (n ?? new JS(t)).formatMonthYear(e);
}
var iw = rw;
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/labels/labelGridcell.js
function aw(e, t, n, r) {
	let i = (r ?? new JS(n)).format(e, "PPPP");
	return t?.today && (i = `Today, ${i}`), i;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/labels/labelMonthDropdown.js
function ow(e) {
	return "Choose the Month";
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/labels/labelNav.js
function sw() {
	return "";
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/labels/labelNext.js
var cw = "Go to the Next Month";
function lw(e, t) {
	return cw;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/labels/labelPrevious.js
function uw(e) {
	return "Go to the Previous Month";
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/labels/labelWeekday.js
function dw(e, t, n) {
	return (n ?? new JS(t)).format(e, "cccc");
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/labels/labelWeekNumber.js
function fw(e, t) {
	return `Week ${e}`;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/labels/labelWeekNumberHeader.js
function pw(e) {
	return "Week Number";
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/labels/labelYearDropdown.js
function mw(e) {
	return "Choose the Year";
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/labels/index.js
var hw = /* @__PURE__ */ y({
	labelCaption: () => iw,
	labelDay: () => nw,
	labelDayButton: () => tw,
	labelGrid: () => rw,
	labelGridcell: () => aw,
	labelMonthDropdown: () => ow,
	labelNav: () => sw,
	labelNext: () => lw,
	labelPrevious: () => uw,
	labelWeekNumber: () => fw,
	labelWeekNumberHeader: () => pw,
	labelWeekday: () => dw,
	labelYearDropdown: () => mw
}), gw = (e, t, n) => t || (n ? typeof n == "function" ? n : (...e) => n : e);
function _w(e, t) {
	let n = t.locale?.labels ?? {};
	return {
		...hw,
		...e ?? {},
		labelDayButton: gw(tw, e?.labelDayButton, n.labelDayButton),
		labelMonthDropdown: gw(ow, e?.labelMonthDropdown, n.labelMonthDropdown),
		labelNext: gw(lw, e?.labelNext, n.labelNext),
		labelPrevious: gw(uw, e?.labelPrevious, n.labelPrevious),
		labelWeekNumber: gw(fw, e?.labelWeekNumber, n.labelWeekNumber),
		labelYearDropdown: gw(mw, e?.labelYearDropdown, n.labelYearDropdown),
		labelGrid: gw(rw, e?.labelGrid, n.labelGrid),
		labelGridcell: gw(aw, e?.labelGridcell, n.labelGridcell),
		labelNav: gw(sw, e?.labelNav, n.labelNav),
		labelWeekNumberHeader: gw(pw, e?.labelWeekNumberHeader, n.labelWeekNumberHeader),
		labelWeekday: gw(dw, e?.labelWeekday, n.labelWeekday)
	};
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getMonthOptions.js
function vw(e, t, n, r, i) {
	let { startOfMonth: a, startOfYear: o, endOfYear: s, eachMonthOfInterval: c, getMonth: l } = i;
	return c({
		start: o(e),
		end: s(e)
	}).map((e) => {
		let o = r.formatMonthDropdown(e, i);
		return {
			value: l(e),
			label: o,
			disabled: t && e < a(t) || n && e > a(n) || !1
		};
	});
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getStyleForModifiers.js
function yw(e, t = {}, n = {}) {
	let r = { ...t?.[$.Day] };
	return Object.entries(e).filter(([, e]) => e === !0).forEach(([e]) => {
		r = {
			...r,
			...n?.[e]
		};
	}), r;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getWeekdays.js
function bw(e, t, n, r) {
	let i = r ?? e.today(), a = n ? e.startOfBroadcastWeek(i, e) : t ? e.startOfISOWeek(i) : e.startOfWeek(i), o = [];
	for (let t = 0; t < 7; t++) {
		let n = e.addDays(a, t);
		o.push(n);
	}
	return o;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getYearOptions.js
function xw(e, t, n, r, i = !1) {
	if (!e || !t) return;
	let { startOfYear: a, endOfYear: o, eachYearOfInterval: s, getYear: c } = r, l = s({
		start: a(e),
		end: o(t)
	});
	return i && l.reverse(), l.map((e) => {
		let t = n.formatYearDropdown(e, r);
		return {
			value: c(e),
			label: t,
			disabled: !1
		};
	});
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/noonDateLib.js
function Sw(e, t = {}) {
	let { weekStartsOn: n, locale: r } = t, i = n ?? r?.options?.weekStartsOn ?? 0, a = (t) => {
		let n = typeof t == "number" || typeof t == "string" ? new Date(t) : t;
		return new ax(n.getFullYear(), n.getMonth(), n.getDate(), 12, 0, 0, e);
	}, o = (e) => {
		let t = a(e);
		return new Date(t.getFullYear(), t.getMonth(), t.getDate(), 0, 0, 0, 0);
	};
	return {
		today: () => a(ax.tz(e)),
		newDate: (t, n, r) => new ax(t, n, r, 12, 0, 0, e),
		startOfDay: (e) => a(e),
		startOfWeek: (e, t) => {
			let n = a(e), r = t?.weekStartsOn ?? i, o = (n.getDay() - r + 7) % 7;
			return n.setDate(n.getDate() - o), n;
		},
		startOfISOWeek: (e) => {
			let t = a(e), n = (t.getDay() - 1 + 7) % 7;
			return t.setDate(t.getDate() - n), t;
		},
		startOfMonth: (e) => {
			let t = a(e);
			return t.setDate(1), t;
		},
		startOfYear: (e) => {
			let t = a(e);
			return t.setMonth(0, 1), t;
		},
		endOfWeek: (e, t) => {
			let n = a(e), r = (((t?.weekStartsOn ?? i) + 6) % 7 - n.getDay() + 7) % 7;
			return n.setDate(n.getDate() + r), n;
		},
		endOfISOWeek: (e) => {
			let t = a(e), n = (7 - t.getDay()) % 7;
			return t.setDate(t.getDate() + n), t;
		},
		endOfMonth: (e) => {
			let t = a(e);
			return t.setMonth(t.getMonth() + 1, 0), t;
		},
		endOfYear: (e) => {
			let t = a(e);
			return t.setMonth(11, 31), t;
		},
		eachMonthOfInterval: (t) => {
			let n = a(t.start), r = a(t.end), i = [], o = new ax(n.getFullYear(), n.getMonth(), 1, 12, 0, 0, e), s = r.getFullYear() * 12 + r.getMonth();
			for (; o.getFullYear() * 12 + o.getMonth() <= s;) i.push(new ax(o, e)), o.setMonth(o.getMonth() + 1, 1);
			return i;
		},
		addDays: (e, t) => {
			let n = a(e);
			return n.setDate(n.getDate() + t), n;
		},
		addWeeks: (e, t) => {
			let n = a(e);
			return n.setDate(n.getDate() + t * 7), n;
		},
		addMonths: (e, t) => {
			let n = a(e);
			return n.setMonth(n.getMonth() + t), n;
		},
		addYears: (e, t) => {
			let n = a(e);
			return n.setFullYear(n.getFullYear() + t), n;
		},
		eachYearOfInterval: (t) => {
			let n = a(t.start), r = a(t.end), i = [], o = new ax(n.getFullYear(), 0, 1, 12, 0, 0, e);
			for (; o.getFullYear() <= r.getFullYear();) i.push(new ax(o, e)), o.setFullYear(o.getFullYear() + 1, 0, 1);
			return i;
		},
		getWeek: (e, t) => iS(o(e), {
			weekStartsOn: t?.weekStartsOn ?? i,
			firstWeekContainsDate: t?.firstWeekContainsDate ?? r?.options?.firstWeekContainsDate ?? 1
		}),
		getISOWeek: (e) => tS(o(e)),
		differenceInCalendarDays: (e, t) => Sx(o(e), o(t)),
		differenceInCalendarMonths: (e, t) => jx(o(e), o(t))
	};
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/useAnimation.js
var Cw = (e) => e instanceof HTMLElement ? e : null, ww = (e) => [...e.querySelectorAll("[data-animated-month]") ?? []], Tw = (e) => Cw(e.querySelector("[data-animated-month]")), Ew = (e) => Cw(e.querySelector("[data-animated-caption]")), Dw = (e) => Cw(e.querySelector("[data-animated-weeks]")), Ow = (e) => Cw(e.querySelector("[data-animated-nav]")), kw = (e) => Cw(e.querySelector("[data-animated-weekdays]"));
function Aw(e, t, { classNames: n, months: r, focused: i, dateLib: a }) {
	let o = u(null), s = u(r), l = u(!1);
	c(() => {
		let c = s.current;
		if (s.current = r, !t || !e.current || !(e.current instanceof HTMLElement) || r.length === 0 || c.length === 0 || r.length !== c.length) return;
		let u = a.isSameMonth(r[0].date, c[0].date), d = a.isAfter(r[0].date, c[0].date), f = d ? n[oC.caption_after_enter] : n[oC.caption_before_enter], p = d ? n[oC.weeks_after_enter] : n[oC.weeks_before_enter], m = o.current, h = e.current.cloneNode(!0);
		if (h instanceof HTMLElement ? (ww(h).forEach((e) => {
			if (!(e instanceof HTMLElement)) return;
			let t = Tw(e);
			t && e.contains(t) && e.removeChild(t);
			let n = Ew(e);
			n && n.classList.remove(f);
			let r = Dw(e);
			r && r.classList.remove(p);
		}), o.current = h) : o.current = null, l.current || u || i) return;
		let g = m instanceof HTMLElement ? ww(m) : [], _ = ww(e.current);
		if (_?.every((e) => e instanceof HTMLElement) && g && g.every((e) => e instanceof HTMLElement)) {
			l.current = !0;
			let t = [];
			e.current.style.isolation = "isolate";
			let r = Ow(e.current);
			r && (r.style.zIndex = "1"), _.forEach((i, a) => {
				let o = g[a];
				if (!o) return;
				i.style.position = "relative", i.style.overflow = "hidden";
				let s = Ew(i);
				s && s.classList.add(f);
				let c = Dw(i);
				c && c.classList.add(p);
				let u = () => {
					l.current = !1, e.current && (e.current.style.isolation = ""), r && (r.style.zIndex = ""), s && s.classList.remove(f), c && c.classList.remove(p), i.style.position = "", i.style.overflow = "", i.contains(o) && i.removeChild(o);
				};
				t.push(u), o.style.pointerEvents = "none", o.style.position = "absolute", o.style.overflow = "hidden", o.setAttribute("aria-hidden", "true");
				let m = kw(o);
				m && (m.style.opacity = "0");
				let h = Ew(o);
				h && (h.classList.add(d ? n[oC.caption_before_exit] : n[oC.caption_after_exit]), h.addEventListener("animationend", u));
				let _ = Dw(o);
				_ && _.classList.add(d ? n[oC.weeks_before_exit] : n[oC.weeks_after_exit]), i.insertBefore(o, i.firstChild);
			});
		}
	});
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getDates.js
function jw(e, t, n, r) {
	let i = e[0], a = e[e.length - 1], { ISOWeek: o, fixedWeeks: s, broadcastCalendar: c } = n ?? {}, { addDays: l, differenceInCalendarDays: u, differenceInCalendarMonths: d, endOfBroadcastWeek: f, endOfISOWeek: p, endOfMonth: m, endOfWeek: h, isAfter: g, startOfBroadcastWeek: _, startOfISOWeek: v, startOfWeek: y } = r, b = c ? _(i, r) : o ? v(i) : y(i), x = c ? f(a) : o ? p(m(a)) : h(m(a)), S = t && (c ? f(t) : o ? p(t) : h(t)), C = u(S && g(x, S) ? S : x, b), w = d(a, i) + 1, T = [];
	for (let e = 0; e <= C; e++) {
		let t = l(b, e);
		T.push(t);
	}
	let E = (c ? 35 : 42) * w;
	if (s && T.length < E) {
		let e = E - T.length;
		for (let t = 0; t < e; t++) {
			let e = l(T[T.length - 1], 1);
			T.push(e);
		}
	}
	return T;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getDays.js
function Mw(e) {
	let t = [];
	return e.reduce((e, n) => {
		let r = n.weeks.reduce((e, t) => e.concat(t.days.slice()), t.slice());
		return e.concat(r.slice());
	}, t.slice());
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getDisplayMonths.js
function Nw(e, t, n, r) {
	let { numberOfMonths: i = 1 } = n, a = [];
	for (let n = 0; n < i; n++) {
		let i = r.addMonths(e, n);
		if (t && i > t) break;
		a.push(i);
	}
	return a;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getInitialMonth.js
function Pw(e, t, n, r) {
	let { month: i, defaultMonth: a, today: o = r.today(), numberOfMonths: s = 1 } = e, c = i || a || o, { differenceInCalendarMonths: l, addMonths: u, startOfMonth: d } = r;
	return n && l(n, c) < s - 1 && (c = u(n, -1 * (s - 1))), t && l(c, t) < 0 && (c = t), d(c);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getMonths.js
function Fw(e, t, n, r) {
	let { addDays: i, endOfBroadcastWeek: a, endOfISOWeek: o, endOfMonth: s, endOfWeek: c, getISOWeek: l, getWeek: u, startOfBroadcastWeek: d, startOfISOWeek: f, startOfWeek: p } = r, m = e.reduce((e, m) => {
		let h = n.broadcastCalendar ? d(m, r) : n.ISOWeek ? f(m) : p(m), g = n.broadcastCalendar ? a(m) : n.ISOWeek ? o(s(m)) : c(s(m)), _ = t.filter((e) => e >= h && e <= g), v = n.broadcastCalendar ? 35 : 42;
		if (n.fixedWeeks && _.length < v) {
			let e = t.filter((e) => {
				let t = v - _.length;
				return e > g && e <= i(g, t);
			});
			_.push(...e);
		}
		let y = new ZS(m, _.reduce((e, t) => {
			let i = n.ISOWeek ? l(t) : u(t), a = e.find((e) => e.weekNumber === i), o = new XS(t, m, r);
			return a ? a.days.push(o) : e.push(new QS(i, [o])), e;
		}, []));
		return e.push(y), e;
	}, []);
	return n.reverseMonths ? m.reverse() : m;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getNavMonth.js
function Iw(e, t) {
	let { startMonth: n, endMonth: r } = e, { startOfYear: i, startOfDay: a, startOfMonth: o, endOfMonth: s, addYears: c, endOfYear: l, newDate: u, today: d } = t, { fromYear: f, toYear: p, fromMonth: m, toMonth: h } = e;
	!n && m && (n = m), !n && f && (n = t.newDate(f, 0, 1)), !r && h && (r = h), !r && p && (r = u(p, 11, 31));
	let g = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
	return n ? n = o(n) : f ? n = u(f, 0, 1) : !n && g && (n = i(c(e.today ?? d(), -100))), r ? r = s(r) : p ? r = u(p, 11, 31) : !r && g && (r = l(e.today ?? d())), [n && a(n), r && a(r)];
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getNextMonth.js
function Lw(e, t, n, r) {
	if (n.disableNavigation) return;
	let { pagedNavigation: i, numberOfMonths: a = 1 } = n, { startOfMonth: o, addMonths: s, differenceInCalendarMonths: c } = r, l = i ? a : 1, u = o(e);
	if (!t || !(c(t, e) < a)) return s(u, l);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getPreviousMonth.js
function Rw(e, t, n, r) {
	if (n.disableNavigation) return;
	let { pagedNavigation: i, numberOfMonths: a } = n, { startOfMonth: o, addMonths: s, differenceInCalendarMonths: c } = r, l = i ? a ?? 1 : 1, u = o(e);
	if (!t || !(c(u, t) <= 0)) return s(u, -l);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getWeeks.js
function zw(e) {
	return e.reduce((e, t) => e.concat(t.weeks.slice()), [].slice());
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/useControlledValue.js
function Bw(e, t) {
	let [n, r] = d(e);
	return [t === void 0 ? n : t, r];
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/useCalendar.js
function Vw(e, t) {
	let [n, r] = Iw(e, t), { startOfMonth: i, endOfMonth: a } = t, o = Pw(e, n, r, t), [c, u] = Bw(o, e.month ? o : void 0);
	s(() => {
		u(Pw(e, n, r, t));
	}, [e.timeZone]);
	let { months: d, weeks: f, days: p, previousMonth: m, nextMonth: h } = l(() => {
		let i = Nw(c, r, { numberOfMonths: e.numberOfMonths }, t), o = Fw(i, jw(i, e.endMonth ? a(e.endMonth) : void 0, {
			ISOWeek: e.ISOWeek,
			fixedWeeks: e.fixedWeeks,
			broadcastCalendar: e.broadcastCalendar
		}, t), {
			broadcastCalendar: e.broadcastCalendar,
			fixedWeeks: e.fixedWeeks,
			ISOWeek: e.ISOWeek,
			reverseMonths: e.reverseMonths
		}, t);
		return {
			months: o,
			weeks: zw(o),
			days: Mw(o),
			previousMonth: Rw(c, n, e, t),
			nextMonth: Lw(c, r, e, t)
		};
	}, [
		t,
		c.getTime(),
		r?.getTime(),
		n?.getTime(),
		e.disableNavigation,
		e.broadcastCalendar,
		e.endMonth?.getTime(),
		e.fixedWeeks,
		e.ISOWeek,
		e.numberOfMonths,
		e.pagedNavigation,
		e.reverseMonths
	]), { disableNavigation: g, onMonthChange: _ } = e, v = (e) => f.some((t) => t.days.some((t) => t.isEqualTo(e))), y = (e) => {
		if (g) return;
		let t = i(e);
		n && t < i(n) && (t = i(n)), r && t > i(r) && (t = i(r)), u(t), _?.(t);
	};
	return {
		months: d,
		weeks: f,
		days: p,
		navStart: n,
		navEnd: r,
		previousMonth: m,
		nextMonth: h,
		goToMonth: y,
		goToDay: (e) => {
			v(e) || y(e.date);
		}
	};
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/calculateFocusTarget.js
var Hw;
(function(e) {
	e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(Hw ||= {});
function Uw(e) {
	return !e[iC.disabled] && !e[iC.hidden] && !e[iC.outside];
}
function Ww(e, t, n, r) {
	let i, a = -1;
	for (let o of e) {
		let e = t(o);
		Uw(e) && (e[iC.focused] && a < Hw.FocusedModifier ? (i = o, a = Hw.FocusedModifier) : r?.isEqualTo(o) && a < Hw.LastFocused ? (i = o, a = Hw.LastFocused) : n(o.date) && a < Hw.Selected ? (i = o, a = Hw.Selected) : e[iC.today] && a < Hw.Today && (i = o, a = Hw.Today));
	}
	return i ||= e.find((e) => Uw(t(e))), i;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getFocusableDate.js
function Gw(e, t, n, r, i, a, o) {
	let { ISOWeek: s, broadcastCalendar: c } = a, { addDays: l, addMonths: u, addWeeks: d, addYears: f, endOfBroadcastWeek: p, endOfISOWeek: m, endOfWeek: h, max: g, min: _, startOfBroadcastWeek: v, startOfISOWeek: y, startOfWeek: b } = o, x = {
		day: l,
		week: d,
		month: u,
		year: f,
		startOfWeek: (e) => c ? v(e, o) : s ? y(e) : b(e),
		endOfWeek: (e) => c ? p(e) : s ? m(e) : h(e)
	}[e](n, t === "after" ? 1 : -1);
	return t === "before" && r ? x = g([r, x]) : t === "after" && i && (x = _([i, x])), x;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getNextFocus.js
function Kw(e, t, n, r, i, a, o, s = 0) {
	if (s > 365) return;
	let c = Gw(e, t, n.date, r, i, a, o), l = !!(a.disabled && RC(c, a.disabled, o)), u = !!(a.hidden && RC(c, a.hidden, o)), d = new XS(c, c, o);
	return !l && !u ? d : Kw(e, t, d, r, i, a, o, s + 1);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/useFocus.js
function qw(e, t, n, r, i) {
	let { autoFocus: a } = e, [o, s] = d(), c = Ww(t.days, n, r || (() => !1), o), [l, u] = d(a ? c : void 0);
	return {
		isFocusTarget: (e) => !!c?.isEqualTo(e),
		setFocused: u,
		focused: l,
		blur: () => {
			s(l), u(void 0);
		},
		moveFocus: (n, r) => {
			if (!l) return;
			let a = Kw(n, r, l, t.navStart, t.navEnd, e, i);
			a && (e.disableNavigation && !t.days.some((e) => e.isEqualTo(a)) || (t.goToDay(a), u(a)));
		}
	};
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/selection/useMulti.js
function Jw(e, t) {
	let { selected: n, required: r, onSelect: i } = e, [a, o] = Bw(n, i ? n : void 0), s = i ? n : a, { isSameDay: c } = t, l = (e) => s?.some((t) => c(t, e)) ?? !1, { min: u, max: d } = e;
	return {
		selected: s,
		select: (e, t, n) => {
			let a = [...s ?? []];
			if (l(e)) {
				if (s?.length === u || r && s?.length === 1) return;
				a = s?.filter((t) => !c(t, e));
			} else a = s?.length === d ? [e] : [...a, e];
			return i || o(a), i?.(a, e, t, n), a;
		},
		isSelected: l
	};
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/utils/addToRange.js
function Yw(e, t, n = 0, r = 0, i = !1, a = YS) {
	let { from: o, to: s } = t || {}, { isSameDay: c, isAfter: l, isBefore: u } = a, d;
	if (!o && !s) d = {
		from: e,
		to: n > 0 ? void 0 : e
	};
	else if (o && !s) d = c(o, e) ? n === 0 ? {
		from: o,
		to: e
	} : i ? {
		from: o,
		to: void 0
	} : void 0 : u(e, o) ? {
		from: e,
		to: o
	} : {
		from: o,
		to: e
	};
	else if (o && s) if (c(o, e) && c(s, e)) d = i ? {
		from: o,
		to: s
	} : void 0;
	else if (c(o, e)) d = {
		from: o,
		to: n > 0 ? void 0 : e
	};
	else if (c(s, e)) d = {
		from: e,
		to: n > 0 ? void 0 : e
	};
	else if (u(e, o)) d = {
		from: e,
		to: s
	};
	else if (l(e, o)) d = {
		from: o,
		to: e
	};
	else if (l(e, s)) d = {
		from: o,
		to: e
	};
	else throw Error("Invalid range");
	if (d?.from && d?.to) {
		let t = a.differenceInCalendarDays(d.to, d.from);
		(r > 0 && t > r || n > 1 && t < n) && (d = {
			from: e,
			to: void 0
		});
	}
	return d;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/utils/rangeContainsDayOfWeek.js
function Xw(e, t, n = YS) {
	let r = Array.isArray(t) ? t : [t], i = e.from, a = n.differenceInCalendarDays(e.to, e.from), o = Math.min(a, 6);
	for (let e = 0; e <= o; e++) {
		if (r.includes(i.getDay())) return !0;
		i = n.addDays(i, 1);
	}
	return !1;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/utils/rangeOverlaps.js
function Zw(e, t, n = YS) {
	return jC(e, t.from, !1, n) || jC(e, t.to, !1, n) || jC(t, e.from, !1, n) || jC(t, e.to, !1, n);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/utils/rangeContainsModifiers.js
function Qw(e, t, n = YS) {
	let r = Array.isArray(t) ? t : [t];
	if (r.filter((e) => typeof e != "function").some((t) => typeof t == "boolean" ? t : n.isDate(t) ? jC(e, t, !1, n) : LC(t, n) ? t.some((t) => jC(e, t, !1, n)) : NC(t) ? t.from && t.to ? Zw(e, {
		from: t.from,
		to: t.to
	}, n) : !1 : IC(t) ? Xw(e, t.dayOfWeek, n) : MC(t) ? n.isAfter(t.before, t.after) ? Zw(e, {
		from: n.addDays(t.after, 1),
		to: n.addDays(t.before, -1)
	}, n) : RC(e.from, t, n) || RC(e.to, t, n) : PC(t) || FC(t) ? RC(e.from, t, n) || RC(e.to, t, n) : !1)) return !0;
	let i = r.filter((e) => typeof e == "function");
	if (i.length) {
		let t = e.from, r = n.differenceInCalendarDays(e.to, e.from);
		for (let e = 0; e <= r; e++) {
			if (i.some((e) => e(t))) return !0;
			t = n.addDays(t, 1);
		}
	}
	return !1;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/selection/useRange.js
function $w(e, t) {
	let { disabled: n, excludeDisabled: r, resetOnSelect: i, selected: a, required: o, onSelect: s } = e, [c, l] = Bw(a, s ? a : void 0), u = s ? a : c;
	return {
		selected: u,
		select: (a, c, d) => {
			let { min: f, max: p } = e, m;
			if (a) {
				let e = u?.from, n = u?.to, r = !!e && !!n, s = !!e && !!n && t.isSameDay(e, n) && t.isSameDay(a, e);
				m = i && (r || !u?.from) ? !o && s ? void 0 : {
					from: a,
					to: void 0
				} : Yw(a, u, f, p, o, t);
			}
			return r && n && m?.from && m.to && Qw({
				from: m.from,
				to: m.to
			}, n, t) && (m.from = a, m.to = void 0), s || l(m), s?.(m, a, c, d), m;
		},
		isSelected: (e) => u && jC(u, e, !1, t)
	};
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/selection/useSingle.js
function eT(e, t) {
	let { selected: n, required: r, onSelect: i } = e, [a, o] = Bw(n, i ? n : void 0), s = i ? n : a, { isSameDay: c } = t;
	return {
		selected: s,
		select: (e, t, n) => {
			let a = e;
			return !r && s && s && c(e, s) && (a = void 0), i || o(a), i?.(a, e, t, n), a;
		},
		isSelected: (e) => s ? c(s, e) : !1
	};
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/useSelection.js
function tT(e, t) {
	let n = eT(e, t), r = Jw(e, t), i = $w(e, t);
	switch (e.mode) {
		case "single": return n;
		case "multiple": return r;
		case "range": return i;
		default: return;
	}
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/utils/toTimeZone.js
function nT(e, t) {
	return e instanceof ax && e.timeZone === t ? e : new ax(e, t);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/utils/convertMatchersToTimeZone.js
function rT(e, t, n) {
	if (!n) return nT(e, t);
	let r = nT(e, t), i = new ax(r.getFullYear(), r.getMonth(), r.getDate(), 12, 0, 0, t);
	return new Date(i.getTime());
}
function iT(e, t, n) {
	return typeof e == "boolean" || typeof e == "function" ? e : e instanceof Date ? rT(e, t, n) : Array.isArray(e) ? e.map((e) => e instanceof Date ? rT(e, t, n) : e) : NC(e) ? {
		...e,
		from: e.from ? nT(e.from, t) : e.from,
		to: e.to ? nT(e.to, t) : e.to
	} : MC(e) ? {
		before: rT(e.before, t, n),
		after: rT(e.after, t, n)
	} : PC(e) ? { after: rT(e.after, t, n) } : FC(e) ? { before: rT(e.before, t, n) } : e;
}
function aT(e, t, n) {
	return e && (Array.isArray(e) ? e.map((e) => iT(e, t, n)) : iT(e, t, n));
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/DayPicker.js
function oT(e) {
	let n = e, r = n.timeZone;
	if (r && (n = {
		...e,
		timeZone: r
	}, n.today &&= nT(n.today, r), n.month &&= nT(n.month, r), n.defaultMonth &&= nT(n.defaultMonth, r), n.startMonth &&= nT(n.startMonth, r), n.endMonth &&= nT(n.endMonth, r), n.mode === "single" && n.selected ? n.selected = nT(n.selected, r) : n.mode === "multiple" && n.selected ? n.selected = n.selected?.map((e) => nT(e, r)) : n.mode === "range" && n.selected && (n.selected = {
		from: n.selected.from ? nT(n.selected.from, r) : n.selected.from,
		to: n.selected.to ? nT(n.selected.to, r) : n.selected.to
	}), n.disabled !== void 0 && (n.disabled = aT(n.disabled, r)), n.hidden !== void 0 && (n.hidden = aT(n.hidden, r)), n.modifiers)) {
		let e = {};
		Object.keys(n.modifiers).forEach((t) => {
			e[t] = aT(n.modifiers?.[t], r);
		}), n.modifiers = e;
	}
	let { components: i, formatters: o, labels: s, dateLib: c, locale: d, classNames: f } = l(() => {
		let e = {
			...qS,
			...n.locale
		}, t = n.broadcastCalendar ? 1 : n.weekStartsOn, r = n.noonSafe && n.timeZone ? Sw(n.timeZone, {
			weekStartsOn: t,
			locale: e
		}) : void 0, i = n.dateLib && r ? {
			...r,
			...n.dateLib
		} : n.dateLib ?? r, a = new JS({
			locale: e,
			weekStartsOn: t,
			firstWeekContainsDate: n.firstWeekContainsDate,
			useAdditionalWeekYearTokens: n.useAdditionalWeekYearTokens,
			useAdditionalDayOfYearTokens: n.useAdditionalDayOfYearTokens,
			timeZone: n.timeZone,
			numerals: n.numerals
		}, i);
		return {
			dateLib: a,
			components: VC(n.components),
			formatters: ew(n.formatters),
			labels: _w(n.labels, a.options),
			locale: e,
			classNames: {
				...UC(),
				...n.classNames
			}
		};
	}, [
		n.locale,
		n.broadcastCalendar,
		n.weekStartsOn,
		n.firstWeekContainsDate,
		n.useAdditionalWeekYearTokens,
		n.useAdditionalDayOfYearTokens,
		n.timeZone,
		n.numerals,
		n.dateLib,
		n.noonSafe,
		n.components,
		n.formatters,
		n.labels,
		n.classNames
	]);
	n.today || (n = {
		...n,
		today: c.today()
	});
	let { captionLayout: p, mode: m, navLayout: h, numberOfMonths: g = 1, onDayBlur: _, onDayClick: v, onDayFocus: y, onDayKeyDown: b, onDayMouseEnter: x, onDayMouseLeave: S, onNextClick: C, onPrevClick: w, showWeekNumber: T, styles: E } = n, { formatCaption: D, formatDay: O, formatMonthDropdown: k, formatWeekNumber: A, formatWeekNumberHeader: j, formatWeekdayName: M, formatYearDropdown: N } = o, P = Vw(n, c), { days: F, months: I, navStart: ee, navEnd: te, previousMonth: ne, nextMonth: re, goToMonth: L } = P, R = zC(F, n, ee, te, c), { isSelected: ie, select: ae, selected: z } = tT(n, c) ?? {}, { blur: oe, focused: se, isFocusTarget: ce, moveFocus: B, setFocused: le } = qw(n, P, R, ie ?? (() => !1), c), { labelDayButton: ue, labelGridcell: de, labelGrid: fe, labelMonthDropdown: pe, labelNav: V, labelPrevious: me, labelNext: he, labelWeekday: ge, labelWeekNumber: _e, labelWeekNumberHeader: ve, labelYearDropdown: ye } = s, be = l(() => bw(c, n.ISOWeek, n.broadcastCalendar, n.today), [
		c,
		n.ISOWeek,
		n.broadcastCalendar,
		n.today
	]), xe = m !== void 0 || v !== void 0, Se = a(() => {
		ne && (L(ne), w?.(ne));
	}, [
		ne,
		L,
		w
	]), H = a(() => {
		re && (L(re), C?.(re));
	}, [
		L,
		re,
		C
	]), Ce = a((e, t) => (n) => {
		n.preventDefault(), n.stopPropagation(), le(e), !t.disabled && (ae?.(e.date, t, n), v?.(e.date, t, n));
	}, [
		ae,
		v,
		le
	]), we = a((e, t) => (n) => {
		le(e), y?.(e.date, t, n);
	}, [y, le]), Te = a((e, t) => (n) => {
		oe(), _?.(e.date, t, n);
	}, [oe, _]), Ee = a((e, t) => (r) => {
		let i = {
			ArrowLeft: [r.shiftKey ? "month" : "day", n.dir === "rtl" ? "after" : "before"],
			ArrowRight: [r.shiftKey ? "month" : "day", n.dir === "rtl" ? "before" : "after"],
			ArrowDown: [r.shiftKey ? "year" : "week", "after"],
			ArrowUp: [r.shiftKey ? "year" : "week", "before"],
			PageUp: [r.shiftKey ? "year" : "month", "before"],
			PageDown: [r.shiftKey ? "year" : "month", "after"],
			Home: ["startOfWeek", "before"],
			End: ["endOfWeek", "after"]
		};
		if (i[r.key]) {
			r.preventDefault(), r.stopPropagation();
			let [e, t] = i[r.key];
			B(e, t);
		}
		b?.(e.date, t, r);
	}, [
		B,
		b,
		n.dir
	]), De = a((e, t) => (n) => {
		x?.(e.date, t, n);
	}, [x]), Oe = a((e, t) => (n) => {
		S?.(e.date, t, n);
	}, [S]), ke = a((e) => (t) => {
		let n = Number(t.target.value);
		L(c.setMonth(c.startOfMonth(e), n));
	}, [c, L]), Ae = a((e) => (t) => {
		let n = Number(t.target.value);
		L(c.setYear(c.startOfMonth(e), n));
	}, [c, L]), { className: je, style: Me } = l(() => ({
		className: [f[$.Root], n.className].filter(Boolean).join(" "),
		style: {
			...E?.[$.Root],
			...n.style
		}
	}), [
		f,
		n.className,
		n.style,
		E
	]), U = HC(n), Ne = u(null);
	Aw(Ne, !!n.animate, {
		classNames: f,
		months: I,
		focused: se,
		dateLib: c
	});
	let Pe = {
		dayPickerProps: n,
		selected: z,
		select: ae,
		isSelected: ie,
		months: I,
		nextMonth: re,
		previousMonth: ne,
		goToMonth: L,
		getModifiers: R,
		components: i,
		classNames: f,
		styles: E,
		labels: s,
		formatters: o
	};
	return t.createElement(mC.Provider, { value: Pe }, t.createElement(i.Root, {
		rootRef: n.animate ? Ne : void 0,
		className: je,
		style: Me,
		dir: n.dir,
		id: n.id,
		lang: n.lang ?? d.code,
		nonce: n.nonce,
		title: n.title,
		role: n.role,
		"aria-label": n["aria-label"],
		"aria-labelledby": n["aria-labelledby"],
		...U
	}, t.createElement(i.Months, {
		className: f[$.Months],
		style: E?.[$.Months]
	}, !n.hideNavigation && !h && t.createElement(i.Nav, {
		"data-animated-nav": n.animate ? "true" : void 0,
		className: f[$.Nav],
		style: E?.[$.Nav],
		"aria-label": V(),
		onPreviousClick: Se,
		onNextClick: H,
		previousMonth: ne,
		nextMonth: re
	}), I.map((e, r) => t.createElement(i.Month, {
		"data-animated-month": n.animate ? "true" : void 0,
		className: f[$.Month],
		style: E?.[$.Month],
		key: r,
		displayIndex: r,
		calendarMonth: e
	}, h === "around" && !n.hideNavigation && r === 0 && t.createElement(i.PreviousMonthButton, {
		type: "button",
		className: f[$.PreviousMonthButton],
		tabIndex: ne ? void 0 : -1,
		"aria-disabled": ne ? void 0 : !0,
		"aria-label": me(ne),
		onClick: Se,
		"data-animated-button": n.animate ? "true" : void 0
	}, t.createElement(i.Chevron, {
		disabled: ne ? void 0 : !0,
		className: f[$.Chevron],
		orientation: n.dir === "rtl" ? "right" : "left"
	})), t.createElement(i.MonthCaption, {
		"data-animated-caption": n.animate ? "true" : void 0,
		className: f[$.MonthCaption],
		style: E?.[$.MonthCaption],
		calendarMonth: e,
		displayIndex: r
	}, p?.startsWith("dropdown") ? t.createElement(i.DropdownNav, {
		className: f[$.Dropdowns],
		style: E?.[$.Dropdowns]
	}, (() => {
		let r = p === "dropdown" || p === "dropdown-months" ? t.createElement(i.MonthsDropdown, {
			key: "month",
			className: f[$.MonthsDropdown],
			"aria-label": pe(),
			classNames: f,
			components: i,
			disabled: !!n.disableNavigation,
			onChange: ke(e.date),
			options: vw(e.date, ee, te, o, c),
			style: E?.[$.Dropdown],
			value: c.getMonth(e.date)
		}) : t.createElement("span", { key: "month" }, k(e.date, c)), a = p === "dropdown" || p === "dropdown-years" ? t.createElement(i.YearsDropdown, {
			key: "year",
			className: f[$.YearsDropdown],
			"aria-label": ye(c.options),
			classNames: f,
			components: i,
			disabled: !!n.disableNavigation,
			onChange: Ae(e.date),
			options: xw(ee, te, o, c, !!n.reverseYears),
			style: E?.[$.Dropdown],
			value: c.getYear(e.date)
		}) : t.createElement("span", { key: "year" }, N(e.date, c));
		return c.getMonthYearOrder() === "year-first" ? [a, r] : [r, a];
	})(), t.createElement("span", {
		role: "status",
		"aria-live": "polite",
		style: {
			border: 0,
			clip: "rect(0 0 0 0)",
			height: "1px",
			margin: "-1px",
			overflow: "hidden",
			padding: 0,
			position: "absolute",
			width: "1px",
			whiteSpace: "nowrap",
			wordWrap: "normal"
		}
	}, D(e.date, c.options, c))) : t.createElement(i.CaptionLabel, {
		className: f[$.CaptionLabel],
		role: "status",
		"aria-live": "polite"
	}, D(e.date, c.options, c))), h === "around" && !n.hideNavigation && r === g - 1 && t.createElement(i.NextMonthButton, {
		type: "button",
		className: f[$.NextMonthButton],
		tabIndex: re ? void 0 : -1,
		"aria-disabled": re ? void 0 : !0,
		"aria-label": he(re),
		onClick: H,
		"data-animated-button": n.animate ? "true" : void 0
	}, t.createElement(i.Chevron, {
		disabled: re ? void 0 : !0,
		className: f[$.Chevron],
		orientation: n.dir === "rtl" ? "left" : "right"
	})), r === g - 1 && h === "after" && !n.hideNavigation && t.createElement(i.Nav, {
		"data-animated-nav": n.animate ? "true" : void 0,
		className: f[$.Nav],
		style: E?.[$.Nav],
		"aria-label": V(),
		onPreviousClick: Se,
		onNextClick: H,
		previousMonth: ne,
		nextMonth: re
	}), t.createElement(i.MonthGrid, {
		role: "grid",
		"aria-multiselectable": m === "multiple" || m === "range",
		"aria-label": fe(e.date, c.options, c) || void 0,
		className: f[$.MonthGrid],
		style: E?.[$.MonthGrid]
	}, !n.hideWeekdays && t.createElement(i.Weekdays, {
		"data-animated-weekdays": n.animate ? "true" : void 0,
		className: f[$.Weekdays],
		style: E?.[$.Weekdays]
	}, T && t.createElement(i.WeekNumberHeader, {
		"aria-label": ve(c.options),
		className: f[$.WeekNumberHeader],
		style: E?.[$.WeekNumberHeader],
		scope: "col"
	}, j()), be.map((e) => t.createElement(i.Weekday, {
		"aria-label": ge(e, c.options, c),
		className: f[$.Weekday],
		key: String(e),
		style: E?.[$.Weekday],
		scope: "col"
	}, M(e, c.options, c)))), t.createElement(i.Weeks, {
		"data-animated-weeks": n.animate ? "true" : void 0,
		className: f[$.Weeks],
		style: E?.[$.Weeks]
	}, e.weeks.map((e) => t.createElement(i.Week, {
		className: f[$.Week],
		key: e.weekNumber,
		style: E?.[$.Week],
		week: e
	}, T && t.createElement(i.WeekNumber, {
		week: e,
		style: E?.[$.WeekNumber],
		"aria-label": _e(e.weekNumber, { locale: d }),
		className: f[$.WeekNumber],
		scope: "row",
		role: "rowheader"
	}, A(e.weekNumber, c)), e.days.map((e) => {
		let { date: r } = e, a = R(e);
		if (a[iC.focused] = !a.hidden && !!se?.isEqualTo(e), a[aC.selected] = ie?.(r) || a.selected, NC(z)) {
			let { from: e, to: t } = z;
			a[aC.range_start] = !!(e && t && c.isSameDay(r, e)), a[aC.range_end] = !!(e && t && c.isSameDay(r, t)), a[aC.range_middle] = jC(z, r, !0, c);
		}
		let o = yw(a, E, n.modifiersStyles), s = BC(a, f, n.modifiersClassNames), l = !xe && !a.hidden ? de(r, a, c.options, c) : void 0;
		return t.createElement(i.Day, {
			key: `${e.isoDate}_${e.displayMonthId}`,
			day: e,
			modifiers: a,
			className: s.join(" "),
			style: o,
			role: "gridcell",
			"aria-selected": a.selected || void 0,
			"aria-label": l,
			"data-day": e.isoDate,
			"data-month": e.outside ? e.dateMonthId : void 0,
			"data-selected": a.selected || void 0,
			"data-disabled": a.disabled || void 0,
			"data-hidden": a.hidden || void 0,
			"data-outside": e.outside || void 0,
			"data-focused": a.focused || void 0,
			"data-today": a.today || void 0
		}, !a.hidden && xe ? t.createElement(i.DayButton, {
			className: f[$.DayButton],
			style: E?.[$.DayButton],
			type: "button",
			day: e,
			modifiers: a,
			disabled: !a.focused && a.disabled || void 0,
			"aria-disabled": a.focused && a.disabled || void 0,
			tabIndex: ce(e) ? 0 : -1,
			"aria-label": ue(r, a, c.options, c),
			onClick: Ce(e, a),
			onBlur: Te(e, a),
			onFocus: we(e, a),
			onKeyDown: Ee(e, a),
			onMouseEnter: De(e, a),
			onMouseLeave: Oe(e, a)
		}, O(r, c.options, c)) : !a.hidden && O(e.date, c.options, c));
	})))))))), n.footer && t.createElement(i.Footer, {
		className: f[$.Footer],
		style: E?.[$.Footer],
		role: "status",
		"aria-live": "polite"
	}, n.footer)));
}
//#endregion
//#region src/components/ui/calendar.tsx
function sT({ className: e, classNames: t, showOutsideDays: n = !0, captionLayout: r = "label", buttonVariant: i = "ghost", formatters: a, components: o, ...s }) {
	let c = UC();
	return /* @__PURE__ */ h(oT, {
		showOutsideDays: n,
		className: G("bg-background group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent", String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`, String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`, e),
		captionLayout: r,
		formatters: {
			formatMonthDropdown: (e) => e.toLocaleString("default", { month: "short" }),
			...a
		},
		classNames: {
			root: G("w-fit", c.root),
			months: G("relative flex flex-col gap-4 md:flex-row", c.months),
			month: G("flex w-full flex-col gap-4", c.month),
			nav: G("absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1", c.nav),
			button_previous: G(Kb({ variant: i }), "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50", c.button_previous),
			button_next: G(Kb({ variant: i }), "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50", c.button_next),
			month_caption: G("flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)", c.month_caption),
			dropdowns: G("flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium", c.dropdowns),
			dropdown_root: G("has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border", c.dropdown_root),
			dropdown: G("bg-popover absolute inset-0 opacity-0", c.dropdown),
			caption_label: G("select-none font-medium", r === "label" ? "text-sm" : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5", c.caption_label),
			table: "w-full border-collapse",
			weekdays: G("flex", c.weekdays),
			weekday: G("text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal", c.weekday),
			week: G("mt-2 flex w-full", c.week),
			week_number_header: G("w-(--cell-size) select-none", c.week_number_header),
			week_number: G("text-muted-foreground select-none text-[0.8rem]", c.week_number),
			day: G("group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md", c.day),
			range_start: G("bg-accent rounded-l-md", c.range_start),
			range_middle: G("rounded-none", c.range_middle),
			range_end: G("bg-accent rounded-r-md", c.range_end),
			today: G("bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none", c.today),
			outside: G("text-muted-foreground aria-selected:text-muted-foreground", c.outside),
			disabled: G("text-muted-foreground opacity-50", c.disabled),
			hidden: G("invisible", c.hidden),
			...t
		},
		components: {
			Root: ({ className: e, rootRef: t, ...n }) => /* @__PURE__ */ h("div", {
				"data-slot": "calendar",
				ref: t,
				className: G(e),
				...n
			}),
			Chevron: ({ className: e, orientation: t, ...n }) => h(t === "left" ? xt : t === "right" ? St : bt, {
				className: G("size-4", e),
				...n
			}),
			DayButton: cT,
			WeekNumber: ({ children: e, ...t }) => /* @__PURE__ */ h("td", {
				...t,
				children: /* @__PURE__ */ h("div", {
					className: "flex size-(--cell-size) items-center justify-center text-center",
					children: e
				})
			}),
			...o
		},
		...s
	});
}
function cT({ className: t, day: n, modifiers: r, ...i }) {
	let a = UC(), o = e.useRef(null);
	return e.useEffect(() => {
		r.focused && o.current?.focus();
	}, [r.focused]), /* @__PURE__ */ h(qb, {
		ref: o,
		variant: "ghost",
		size: "icon",
		"data-day": n.date.toLocaleDateString(),
		"data-selected-single": r.selected && !r.range_start && !r.range_end && !r.range_middle,
		"data-range-start": r.range_start,
		"data-range-end": r.range_end,
		"data-range-middle": r.range_middle,
		className: G("data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-(--cell-size) flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70", a.day, t),
		...i
	});
}
//#endregion
//#region node_modules/.pnpm/embla-carousel-reactive-utils@8.6.0_embla-carousel@8.6.0/node_modules/embla-carousel-reactive-utils/esm/embla-carousel-reactive-utils.esm.js
function lT(e) {
	return Object.prototype.toString.call(e) === "[object Object]";
}
function uT(e) {
	return lT(e) || Array.isArray(e);
}
function dT() {
	return !!(typeof window < "u" && window.document && window.document.createElement);
}
function fT(e, t) {
	let n = Object.keys(e), r = Object.keys(t);
	return n.length !== r.length || JSON.stringify(Object.keys(e.breakpoints || {})) !== JSON.stringify(Object.keys(t.breakpoints || {})) ? !1 : n.every((n) => {
		let r = e[n], i = t[n];
		return typeof r == "function" ? `${r}` == `${i}` : !uT(r) || !uT(i) ? r === i : fT(r, i);
	});
}
function pT(e) {
	return e.concat().sort((e, t) => e.name > t.name ? 1 : -1).map((e) => e.options);
}
function mT(e, t) {
	if (e.length !== t.length) return !1;
	let n = pT(e), r = pT(t);
	return n.every((e, t) => {
		let n = r[t];
		return fT(e, n);
	});
}
//#endregion
//#region node_modules/.pnpm/embla-carousel@8.6.0/node_modules/embla-carousel/esm/embla-carousel.esm.js
function hT(e) {
	return typeof e == "number";
}
function gT(e) {
	return typeof e == "string";
}
function _T(e) {
	return typeof e == "boolean";
}
function vT(e) {
	return Object.prototype.toString.call(e) === "[object Object]";
}
function yT(e) {
	return Math.abs(e);
}
function bT(e) {
	return Math.sign(e);
}
function xT(e, t) {
	return yT(e - t);
}
function ST(e, t) {
	return e === 0 || t === 0 || yT(e) <= yT(t) ? 0 : yT(xT(yT(e), yT(t)) / e);
}
function CT(e) {
	return Math.round(e * 100) / 100;
}
function wT(e) {
	return kT(e).map(Number);
}
function TT(e) {
	return e[ET(e)];
}
function ET(e) {
	return Math.max(0, e.length - 1);
}
function DT(e, t) {
	return t === ET(e);
}
function OT(e, t = 0) {
	return Array.from(Array(e), (e, n) => t + n);
}
function kT(e) {
	return Object.keys(e);
}
function AT(e, t) {
	return [e, t].reduce((e, t) => (kT(t).forEach((n) => {
		let r = e[n], i = t[n];
		e[n] = vT(r) && vT(i) ? AT(r, i) : i;
	}), e), {});
}
function jT(e, t) {
	return t.MouseEvent !== void 0 && e instanceof t.MouseEvent;
}
function MT(e, t) {
	let n = {
		start: r,
		center: i,
		end: a
	};
	function r() {
		return 0;
	}
	function i(e) {
		return a(e) / 2;
	}
	function a(e) {
		return t - e;
	}
	function o(r, i) {
		return gT(e) ? n[e](r) : e(t, r, i);
	}
	return { measure: o };
}
function NT() {
	let e = [];
	function t(t, n, i, a = { passive: !0 }) {
		let o;
		if ("addEventListener" in t) t.addEventListener(n, i, a), o = () => t.removeEventListener(n, i, a);
		else {
			let e = t;
			e.addListener(i), o = () => e.removeListener(i);
		}
		return e.push(o), r;
	}
	function n() {
		e = e.filter((e) => e());
	}
	let r = {
		add: t,
		clear: n
	};
	return r;
}
function PT(e, t, n, r) {
	let i = NT(), a = 1e3 / 60, o = null, s = 0, c = 0;
	function l() {
		i.add(e, "visibilitychange", () => {
			e.hidden && m();
		});
	}
	function u() {
		p(), i.clear();
	}
	function d(e) {
		if (!c) return;
		o || (o = e, n(), n());
		let i = e - o;
		for (o = e, s += i; s >= a;) n(), s -= a;
		r(s / a), c &&= t.requestAnimationFrame(d);
	}
	function f() {
		c ||= t.requestAnimationFrame(d);
	}
	function p() {
		t.cancelAnimationFrame(c), o = null, s = 0, c = 0;
	}
	function m() {
		o = null, s = 0;
	}
	return {
		init: l,
		destroy: u,
		start: f,
		stop: p,
		update: n,
		render: r
	};
}
function FT(e, t) {
	let n = t === "rtl", r = e === "y", i = r ? "y" : "x", a = r ? "x" : "y", o = !r && n ? -1 : 1, s = u(), c = d();
	function l(e) {
		let { height: t, width: n } = e;
		return r ? t : n;
	}
	function u() {
		return r ? "top" : n ? "right" : "left";
	}
	function d() {
		return r ? "bottom" : n ? "left" : "right";
	}
	function f(e) {
		return e * o;
	}
	return {
		scroll: i,
		cross: a,
		startEdge: s,
		endEdge: c,
		measureSize: l,
		direction: f
	};
}
function IT(e = 0, t = 0) {
	let n = yT(e - t);
	function r(t) {
		return t < e;
	}
	function i(e) {
		return e > t;
	}
	function a(e) {
		return r(e) || i(e);
	}
	function o(n) {
		return a(n) ? r(n) ? e : t : n;
	}
	function s(e) {
		return n ? e - n * Math.ceil((e - t) / n) : e;
	}
	return {
		length: n,
		max: t,
		min: e,
		constrain: o,
		reachedAny: a,
		reachedMax: i,
		reachedMin: r,
		removeOffset: s
	};
}
function LT(e, t, n) {
	let { constrain: r } = IT(0, e), i = e + 1, a = o(t);
	function o(e) {
		return n ? yT((i + e) % i) : r(e);
	}
	function s() {
		return a;
	}
	function c(e) {
		return a = o(e), d;
	}
	function l(e) {
		return u().set(s() + e);
	}
	function u() {
		return LT(e, s(), n);
	}
	let d = {
		get: s,
		set: c,
		add: l,
		clone: u
	};
	return d;
}
function RT(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v) {
	let { cross: y, direction: b } = e, x = [
		"INPUT",
		"SELECT",
		"TEXTAREA"
	], S = { passive: !1 }, C = NT(), w = NT(), T = IT(50, 225).constrain(p.measure(20)), E = {
		mouse: 300,
		touch: 400
	}, D = {
		mouse: 500,
		touch: 600
	}, O = m ? 43 : 25, k = !1, A = 0, j = 0, M = !1, N = !1, P = !1, F = !1;
	function I(e) {
		if (!v) return;
		function n(t) {
			(_T(v) || v(e, t)) && R(t);
		}
		let r = t;
		C.add(r, "dragstart", (e) => e.preventDefault(), S).add(r, "touchmove", () => void 0, S).add(r, "touchend", () => void 0).add(r, "touchstart", n).add(r, "mousedown", n).add(r, "touchcancel", ae).add(r, "contextmenu", ae).add(r, "click", z, !0);
	}
	function ee() {
		C.clear(), w.clear();
	}
	function te() {
		let e = F ? n : t;
		w.add(e, "touchmove", ie, S).add(e, "touchend", ae).add(e, "mousemove", ie, S).add(e, "mouseup", ae);
	}
	function ne(e) {
		let t = e.nodeName || "";
		return x.includes(t);
	}
	function re() {
		return (m ? D : E)[F ? "mouse" : "touch"];
	}
	function L(e, t) {
		let n = d.add(bT(e) * -1), r = u.byDistance(e, !m).distance;
		return m || yT(e) < T ? r : g && t ? r * .5 : u.byIndex(n.get(), 0).distance;
	}
	function R(e) {
		let t = jT(e, r);
		F = t, P = m && t && !e.buttons && k, k = xT(i.get(), o.get()) >= 2, !(t && e.button !== 0) && (ne(e.target) || (M = !0, a.pointerDown(e), l.useFriction(0).useDuration(0), i.set(o), te(), A = a.readPoint(e), j = a.readPoint(e, y), f.emit("pointerDown")));
	}
	function ie(e) {
		if (!jT(e, r) && e.touches.length >= 2) return ae(e);
		let t = a.readPoint(e), n = a.readPoint(e, y), o = xT(t, A), c = xT(n, j);
		if (!N && !F && (!e.cancelable || (N = o > c, !N))) return ae(e);
		let u = a.pointerMove(e);
		o > h && (P = !0), l.useFriction(.3).useDuration(.75), s.start(), i.add(b(u)), e.preventDefault();
	}
	function ae(e) {
		let t = u.byDistance(0, !1).index !== d.get(), n = a.pointerUp(e) * re(), r = L(b(n), t), i = ST(n, r), o = O - 10 * i, s = _ + i / 50;
		N = !1, M = !1, w.clear(), l.useDuration(o).useFriction(s), c.distance(r, !m), F = !1, f.emit("pointerUp");
	}
	function z(e) {
		P &&= (e.stopPropagation(), e.preventDefault(), !1);
	}
	function oe() {
		return M;
	}
	return {
		init: I,
		destroy: ee,
		pointerDown: oe
	};
}
function zT(e, t) {
	let n, r;
	function i(e) {
		return e.timeStamp;
	}
	function a(n, r) {
		let i = `client${(r || e.scroll) === "x" ? "X" : "Y"}`;
		return (jT(n, t) ? n : n.touches[0])[i];
	}
	function o(e) {
		return n = e, r = e, a(e);
	}
	function s(e) {
		let t = a(e) - a(r), o = i(e) - i(n) > 170;
		return r = e, o && (n = e), t;
	}
	function c(e) {
		if (!n || !r) return 0;
		let t = a(r) - a(n), o = i(e) - i(n), s = i(e) - i(r) > 170, c = t / o;
		return o && !s && yT(c) > .1 ? c : 0;
	}
	return {
		pointerDown: o,
		pointerMove: s,
		pointerUp: c,
		readPoint: a
	};
}
function BT() {
	function e(e) {
		let { offsetTop: t, offsetLeft: n, offsetWidth: r, offsetHeight: i } = e;
		return {
			top: t,
			right: n + r,
			bottom: t + i,
			left: n,
			width: r,
			height: i
		};
	}
	return { measure: e };
}
function VT(e) {
	function t(t) {
		return t / 100 * e;
	}
	return { measure: t };
}
function HT(e, t, n, r, i, a, o) {
	let s = [e].concat(r), c, l, u = [], d = !1;
	function f(e) {
		return i.measureSize(o.measure(e));
	}
	function p(i) {
		if (!a) return;
		l = f(e), u = r.map(f);
		function o(n) {
			for (let a of n) {
				if (d) return;
				let n = a.target === e, o = r.indexOf(a.target), s = n ? l : u[o];
				if (yT(f(n ? e : r[o]) - s) >= .5) {
					i.reInit(), t.emit("resize");
					break;
				}
			}
		}
		c = new ResizeObserver((e) => {
			(_T(a) || a(i, e)) && o(e);
		}), n.requestAnimationFrame(() => {
			s.forEach((e) => c.observe(e));
		});
	}
	function m() {
		d = !0, c && c.disconnect();
	}
	return {
		init: p,
		destroy: m
	};
}
function UT(e, t, n, r, i, a) {
	let o = 0, s = 0, c = i, l = a, u = e.get(), d = 0;
	function f() {
		let t = r.get() - e.get(), i = !c, a = 0;
		return i ? (o = 0, n.set(r), e.set(r), a = t) : (n.set(e), o += t / c, o *= l, u += o, e.add(o), a = u - d), s = bT(a), d = u, x;
	}
	function p() {
		return yT(r.get() - t.get()) < .001;
	}
	function m() {
		return c;
	}
	function h() {
		return s;
	}
	function g() {
		return o;
	}
	function _() {
		return y(i);
	}
	function v() {
		return b(a);
	}
	function y(e) {
		return c = e, x;
	}
	function b(e) {
		return l = e, x;
	}
	let x = {
		direction: h,
		duration: m,
		velocity: g,
		seek: f,
		settled: p,
		useBaseFriction: v,
		useBaseDuration: _,
		useFriction: b,
		useDuration: y
	};
	return x;
}
function WT(e, t, n, r, i) {
	let a = i.measure(10), o = i.measure(50), s = IT(.1, .99), c = !1;
	function l() {
		return !(c || !e.reachedAny(n.get()) || !e.reachedAny(t.get()));
	}
	function u(i) {
		if (!l()) return;
		let c = yT(e[e.reachedMin(t.get()) ? "min" : "max"] - t.get()), u = n.get() - t.get(), d = s.constrain(c / o);
		n.subtract(u * d), !i && yT(u) < a && (n.set(e.constrain(n.get())), r.useDuration(25).useBaseFriction());
	}
	function d(e) {
		c = !e;
	}
	return {
		shouldConstrain: l,
		constrain: u,
		toggleActive: d
	};
}
function GT(e, t, n, r, i) {
	let a = IT(-t + e, 0), o = d(), s = u(), c = f();
	function l(e, t) {
		return xT(e, t) <= 1;
	}
	function u() {
		let e = o[0], t = TT(o);
		return IT(o.lastIndexOf(e), o.indexOf(t) + 1);
	}
	function d() {
		return n.map((e, t) => {
			let { min: r, max: i } = a, o = a.constrain(e), s = !t, c = DT(n, t);
			return s ? i : c || l(r, o) ? r : l(i, o) ? i : o;
		}).map((e) => parseFloat(e.toFixed(3)));
	}
	function f() {
		if (t <= e + i) return [a.max];
		if (r === "keepSnaps") return o;
		let { min: n, max: c } = s;
		return o.slice(n, c);
	}
	return {
		snapsContained: c,
		scrollContainLimit: s
	};
}
function KT(e, t, n) {
	let r = t[0];
	return { limit: IT(n ? r - e : TT(t), r) };
}
function qT(e, t, n, r) {
	let i = .1, { reachedMin: a, reachedMax: o } = IT(t.min + i, t.max + i);
	function s(e) {
		return e === 1 ? o(n.get()) : e === -1 ? a(n.get()) : !1;
	}
	function c(t) {
		if (!s(t)) return;
		let n = t * -1 * e;
		r.forEach((e) => e.add(n));
	}
	return { loop: c };
}
function JT(e) {
	let { max: t, length: n } = e;
	function r(e) {
		let r = e - t;
		return n ? r / -n : 0;
	}
	return { get: r };
}
function YT(e, t, n, r, i) {
	let { startEdge: a, endEdge: o } = e, { groupSlides: s } = i, c = d().map(t.measure), l = f(), u = p();
	function d() {
		return s(r).map((e) => TT(e)[o] - e[0][a]).map(yT);
	}
	function f() {
		return r.map((e) => n[a] - e[a]).map((e) => -yT(e));
	}
	function p() {
		return s(l).map((e) => e[0]).map((e, t) => e + c[t]);
	}
	return {
		snaps: l,
		snapsAligned: u
	};
}
function XT(e, t, n, r, i, a) {
	let { groupSlides: o } = i, { min: s, max: c } = r, l = u();
	function u() {
		let r = o(a), i = !e || t === "keepSnaps";
		return n.length === 1 ? [a] : i ? r : r.slice(s, c).map((e, t, n) => {
			let r = !t, i = DT(n, t);
			return r ? OT(TT(n[0]) + 1) : i ? OT(ET(a) - TT(n)[0] + 1, TT(n)[0]) : e;
		});
	}
	return { slideRegistry: l };
}
function ZT(e, t, n, r, i) {
	let { reachedAny: a, removeOffset: o, constrain: s } = r;
	function c(e) {
		return e.concat().sort((e, t) => yT(e) - yT(t))[0];
	}
	function l(n) {
		let r = e ? o(n) : s(n), { index: i } = t.map((e, t) => ({
			diff: u(e - r, 0),
			index: t
		})).sort((e, t) => yT(e.diff) - yT(t.diff))[0];
		return {
			index: i,
			distance: r
		};
	}
	function u(t, r) {
		let i = [
			t,
			t + n,
			t - n
		];
		if (!e) return t;
		if (!r) return c(i);
		let a = i.filter((e) => bT(e) === r);
		return a.length ? c(a) : TT(i) - n;
	}
	function d(e, n) {
		return {
			index: e,
			distance: u(t[e] - i.get(), n)
		};
	}
	function f(n, r) {
		let o = i.get() + n, { index: s, distance: c } = l(o), d = !e && a(o);
		return !r || d ? {
			index: s,
			distance: n
		} : {
			index: s,
			distance: n + u(t[s] - c, 0)
		};
	}
	return {
		byDistance: f,
		byIndex: d,
		shortcut: u
	};
}
function QT(e, t, n, r, i, a, o) {
	function s(i) {
		let s = i.distance, c = i.index !== t.get();
		a.add(s), s && (r.duration() ? e.start() : (e.update(), e.render(1), e.update())), c && (n.set(t.get()), t.set(i.index), o.emit("select"));
	}
	function c(e, t) {
		s(i.byDistance(e, t));
	}
	function l(e, n) {
		let r = t.clone().set(e);
		s(i.byIndex(r.get(), n));
	}
	return {
		distance: c,
		index: l
	};
}
function $T(e, t, n, r, i, a, o, s) {
	let c = {
		passive: !0,
		capture: !0
	}, l = 0;
	function u(u) {
		if (!s) return;
		function f(t) {
			if ((/* @__PURE__ */ new Date()).getTime() - l > 10) return;
			o.emit("slideFocusStart"), e.scrollLeft = 0;
			let a = n.findIndex((e) => e.includes(t));
			hT(a) && (i.useDuration(0), r.index(a, 0), o.emit("slideFocus"));
		}
		a.add(document, "keydown", d, !1), t.forEach((e, t) => {
			a.add(e, "focus", (e) => {
				(_T(s) || s(u, e)) && f(t);
			}, c);
		});
	}
	function d(e) {
		e.code === "Tab" && (l = (/* @__PURE__ */ new Date()).getTime());
	}
	return { init: u };
}
function eE(e) {
	let t = e;
	function n() {
		return t;
	}
	function r(e) {
		t = o(e);
	}
	function i(e) {
		t += o(e);
	}
	function a(e) {
		t -= o(e);
	}
	function o(e) {
		return hT(e) ? e : e.get();
	}
	return {
		get: n,
		set: r,
		add: i,
		subtract: a
	};
}
function tE(e, t) {
	let n = e.scroll === "x" ? o : s, r = t.style, i = null, a = !1;
	function o(e) {
		return `translate3d(${e}px,0px,0px)`;
	}
	function s(e) {
		return `translate3d(0px,${e}px,0px)`;
	}
	function c(t) {
		if (a) return;
		let o = CT(e.direction(t));
		o !== i && (r.transform = n(o), i = o);
	}
	function l(e) {
		a = !e;
	}
	function u() {
		a || (r.transform = "", t.getAttribute("style") || t.removeAttribute("style"));
	}
	return {
		clear: u,
		to: c,
		toggleActive: l
	};
}
function nE(e, t, n, r, i, a, o, s, c) {
	let l = .5, u = wT(i), d = wT(i).reverse(), f = _().concat(v());
	function p(e, t) {
		return e.reduce((e, t) => e - i[t], t);
	}
	function m(e, t) {
		return e.reduce((e, n) => p(e, t) > 0 ? e.concat([n]) : e, []);
	}
	function h(e) {
		return a.map((n, i) => ({
			start: n - r[i] + l + e,
			end: n + t - l + e
		}));
	}
	function g(t, r, i) {
		let a = h(r);
		return t.map((t) => {
			let r = i ? 0 : -n, o = i ? n : 0, l = i ? "end" : "start", u = a[t][l];
			return {
				index: t,
				loopPoint: u,
				slideLocation: eE(-1),
				translate: tE(e, c[t]),
				target: () => s.get() > u ? r : o
			};
		});
	}
	function _() {
		let e = o[0];
		return g(m(d, e), n, !1);
	}
	function v() {
		return g(m(u, t - o[0] - 1), -n, !0);
	}
	function y() {
		return f.every(({ index: e }) => p(u.filter((t) => t !== e), t) <= .1);
	}
	function b() {
		f.forEach((e) => {
			let { target: t, translate: n, slideLocation: r } = e, i = t();
			i !== r.get() && (n.to(i), r.set(i));
		});
	}
	function x() {
		f.forEach((e) => e.translate.clear());
	}
	return {
		canLoop: y,
		clear: x,
		loop: b,
		loopPoints: f
	};
}
function rE(e, t, n) {
	let r, i = !1;
	function a(a) {
		if (!n) return;
		function o(e) {
			for (let n of e) if (n.type === "childList") {
				a.reInit(), t.emit("slidesChanged");
				break;
			}
		}
		r = new MutationObserver((e) => {
			i || (_T(n) || n(a, e)) && o(e);
		}), r.observe(e, { childList: !0 });
	}
	function o() {
		r && r.disconnect(), i = !0;
	}
	return {
		init: a,
		destroy: o
	};
}
function iE(e, t, n, r) {
	let i = {}, a = null, o = null, s, c = !1;
	function l() {
		s = new IntersectionObserver((e) => {
			c || (e.forEach((e) => {
				let n = t.indexOf(e.target);
				i[n] = e;
			}), a = null, o = null, n.emit("slidesInView"));
		}, {
			root: e.parentElement,
			threshold: r
		}), t.forEach((e) => s.observe(e));
	}
	function u() {
		s && s.disconnect(), c = !0;
	}
	function d(e) {
		return kT(i).reduce((t, n) => {
			let r = parseInt(n), { isIntersecting: a } = i[r];
			return (e && a || !e && !a) && t.push(r), t;
		}, []);
	}
	function f(e = !0) {
		if (e && a) return a;
		if (!e && o) return o;
		let t = d(e);
		return e && (a = t), e || (o = t), t;
	}
	return {
		init: l,
		destroy: u,
		get: f
	};
}
function aE(e, t, n, r, i, a) {
	let { measureSize: o, startEdge: s, endEdge: c } = e, l = n[0] && i, u = m(), d = h(), f = n.map(o), p = g();
	function m() {
		if (!l) return 0;
		let e = n[0];
		return yT(t[s] - e[s]);
	}
	function h() {
		if (!l) return 0;
		let e = a.getComputedStyle(TT(r));
		return parseFloat(e.getPropertyValue(`margin-${c}`));
	}
	function g() {
		return n.map((e, t, n) => {
			let r = !t, i = DT(n, t);
			return r ? f[t] + u : i ? f[t] + d : n[t + 1][s] - e[s];
		}).map(yT);
	}
	return {
		slideSizes: f,
		slideSizesWithGaps: p,
		startGap: u,
		endGap: d
	};
}
function oE(e, t, n, r, i, a, o, s, c) {
	let { startEdge: l, endEdge: u, direction: d } = e, f = hT(n);
	function p(e, t) {
		return wT(e).filter((e) => e % t === 0).map((n) => e.slice(n, n + t));
	}
	function m(e) {
		return e.length ? wT(e).reduce((n, f, p) => {
			let m = TT(n) || 0, h = m === 0, g = f === ET(e), _ = i[l] - a[m][l], v = i[l] - a[f][u], y = !r && h ? d(o) : 0, b = yT(v - (!r && g ? d(s) : 0) - (_ + y));
			return p && b > t + c && n.push(f), g && n.push(e.length), n;
		}, []).map((t, n, r) => {
			let i = Math.max(r[n - 1] || 0);
			return e.slice(i, t);
		}) : [];
	}
	function h(e) {
		return f ? p(e, n) : m(e);
	}
	return { groupSlides: h };
}
function sE(e, t, n, r, i, a, o) {
	let { align: s, axis: c, direction: l, startIndex: u, loop: d, duration: f, dragFree: p, dragThreshold: m, inViewThreshold: h, slidesToScroll: g, skipSnaps: _, containScroll: v, watchResize: y, watchSlides: b, watchDrag: x, watchFocus: S } = a, C = BT(), w = C.measure(t), T = n.map(C.measure), E = FT(c, l), D = E.measureSize(w), O = VT(D), k = MT(s, D), A = !d && !!v, { slideSizes: j, slideSizesWithGaps: M, startGap: N, endGap: P } = aE(E, w, T, n, d || !!v, i), F = oE(E, D, g, d, w, T, N, P, 2), { snaps: I, snapsAligned: ee } = YT(E, k, w, T, F), te = -TT(I) + TT(M), { snapsContained: ne, scrollContainLimit: re } = GT(D, te, ee, v, 2), L = A ? ne : ee, { limit: R } = KT(te, L, d), ie = LT(ET(L), u, d), ae = ie.clone(), z = wT(n), oe = ({ dragHandler: e, scrollBody: t, scrollBounds: n, options: { loop: r } }) => {
		r || n.constrain(e.pointerDown()), t.seek();
	}, se = ({ scrollBody: e, translate: t, location: n, offsetLocation: r, previousLocation: i, scrollLooper: a, slideLooper: o, dragHandler: s, animation: c, eventHandler: l, scrollBounds: u, options: { loop: d } }, f) => {
		let p = e.settled(), m = !u.shouldConstrain(), h = d ? p : p && m, g = h && !s.pointerDown();
		g && c.stop();
		let _ = n.get() * f + i.get() * (1 - f);
		r.set(_), d && (a.loop(e.direction()), o.loop()), t.to(r.get()), g && l.emit("settle"), h || l.emit("scroll");
	}, ce = PT(r, i, () => oe(xe), (e) => se(xe, e)), B = .68, le = L[ie.get()], ue = eE(le), de = eE(le), fe = eE(le), pe = eE(le), V = UT(ue, fe, de, pe, f, B), me = ZT(d, L, te, R, pe), he = QT(ce, ie, ae, V, me, pe, o), ge = JT(R), _e = NT(), ve = iE(t, n, o, h), { slideRegistry: ye } = XT(A, v, L, re, F, z), be = $T(e, n, ye, he, V, _e, o, S), xe = {
		ownerDocument: r,
		ownerWindow: i,
		eventHandler: o,
		containerRect: w,
		slideRects: T,
		animation: ce,
		axis: E,
		dragHandler: RT(E, e, r, i, pe, zT(E, i), ue, ce, he, V, me, ie, o, O, p, m, _, B, x),
		eventStore: _e,
		percentOfView: O,
		index: ie,
		indexPrevious: ae,
		limit: R,
		location: ue,
		offsetLocation: fe,
		previousLocation: de,
		options: a,
		resizeHandler: HT(t, o, i, n, E, y, C),
		scrollBody: V,
		scrollBounds: WT(R, fe, pe, V, O),
		scrollLooper: qT(te, R, fe, [
			ue,
			fe,
			de,
			pe
		]),
		scrollProgress: ge,
		scrollSnapList: L.map(ge.get),
		scrollSnaps: L,
		scrollTarget: me,
		scrollTo: he,
		slideLooper: nE(E, D, te, j, M, I, L, fe, n),
		slideFocus: be,
		slidesHandler: rE(t, o, b),
		slidesInView: ve,
		slideIndexes: z,
		slideRegistry: ye,
		slidesToScroll: F,
		target: pe,
		translate: tE(E, t)
	};
	return xe;
}
function cE() {
	let e = {}, t;
	function n(e) {
		t = e;
	}
	function r(t) {
		return e[t] || [];
	}
	function i(e) {
		return r(e).forEach((n) => n(t, e)), c;
	}
	function a(t, n) {
		return e[t] = r(t).concat([n]), c;
	}
	function o(t, n) {
		return e[t] = r(t).filter((e) => e !== n), c;
	}
	function s() {
		e = {};
	}
	let c = {
		init: n,
		emit: i,
		off: o,
		on: a,
		clear: s
	};
	return c;
}
var lE = {
	align: "center",
	axis: "x",
	container: null,
	slides: null,
	containScroll: "trimSnaps",
	direction: "ltr",
	slidesToScroll: 1,
	inViewThreshold: 0,
	breakpoints: {},
	dragFree: !1,
	dragThreshold: 10,
	loop: !1,
	skipSnaps: !1,
	duration: 25,
	startIndex: 0,
	active: !0,
	watchDrag: !0,
	watchResize: !0,
	watchSlides: !0,
	watchFocus: !0
};
function uE(e) {
	function t(e, t) {
		return AT(e, t || {});
	}
	function n(n) {
		let r = n.breakpoints || {};
		return t(n, kT(r).filter((t) => e.matchMedia(t).matches).map((e) => r[e]).reduce((e, n) => t(e, n), {}));
	}
	function r(t) {
		return t.map((e) => kT(e.breakpoints || {})).reduce((e, t) => e.concat(t), []).map(e.matchMedia);
	}
	return {
		mergeOptions: t,
		optionsAtMedia: n,
		optionsMediaQueries: r
	};
}
function dE(e) {
	let t = [];
	function n(n, r) {
		return t = r.filter(({ options: t }) => e.optionsAtMedia(t).active !== !1), t.forEach((t) => t.init(n, e)), r.reduce((e, t) => Object.assign(e, { [t.name]: t }), {});
	}
	function r() {
		t = t.filter((e) => e.destroy());
	}
	return {
		init: n,
		destroy: r
	};
}
function fE(e, t, n) {
	let r = e.ownerDocument, i = r.defaultView, a = uE(i), o = dE(a), s = NT(), c = cE(), { mergeOptions: l, optionsAtMedia: u, optionsMediaQueries: d } = a, { on: f, off: p, emit: m } = c, h = D, g = !1, _, v = l(lE, fE.globalOptions), y = l(v), b = [], x, S, C;
	function w() {
		let { container: t, slides: n } = y;
		S = (gT(t) ? e.querySelector(t) : t) || e.children[0];
		let r = gT(n) ? S.querySelectorAll(n) : n;
		C = [].slice.call(r || S.children);
	}
	function T(t) {
		let n = sE(e, S, C, r, i, t, c);
		return t.loop && !n.slideLooper.canLoop() ? T(Object.assign({}, t, { loop: !1 })) : n;
	}
	function E(e, t) {
		g || (v = l(v, e), y = u(v), b = t || b, w(), _ = T(y), d([v, ...b.map(({ options: e }) => e)]).forEach((e) => s.add(e, "change", D)), y.active && (_.translate.to(_.location.get()), _.animation.init(), _.slidesInView.init(), _.slideFocus.init(oe), _.eventHandler.init(oe), _.resizeHandler.init(oe), _.slidesHandler.init(oe), _.options.loop && _.slideLooper.loop(), S.offsetParent && C.length && _.dragHandler.init(oe), x = o.init(oe, b)));
	}
	function D(e, t) {
		let n = ee();
		O(), E(l({ startIndex: n }, e), t), c.emit("reInit");
	}
	function O() {
		_.dragHandler.destroy(), _.eventStore.clear(), _.translate.clear(), _.slideLooper.clear(), _.resizeHandler.destroy(), _.slidesHandler.destroy(), _.slidesInView.destroy(), _.animation.destroy(), o.destroy(), s.clear();
	}
	function k() {
		g || (g = !0, s.clear(), O(), c.emit("destroy"), c.clear());
	}
	function A(e, t, n) {
		!y.active || g || (_.scrollBody.useBaseFriction().useDuration(t === !0 ? 0 : y.duration), _.scrollTo.index(e, n || 0));
	}
	function j(e) {
		A(_.index.add(1).get(), e, -1);
	}
	function M(e) {
		A(_.index.add(-1).get(), e, 1);
	}
	function N() {
		return _.index.add(1).get() !== ee();
	}
	function P() {
		return _.index.add(-1).get() !== ee();
	}
	function F() {
		return _.scrollSnapList;
	}
	function I() {
		return _.scrollProgress.get(_.offsetLocation.get());
	}
	function ee() {
		return _.index.get();
	}
	function te() {
		return _.indexPrevious.get();
	}
	function ne() {
		return _.slidesInView.get();
	}
	function re() {
		return _.slidesInView.get(!1);
	}
	function L() {
		return x;
	}
	function R() {
		return _;
	}
	function ie() {
		return e;
	}
	function ae() {
		return S;
	}
	function z() {
		return C;
	}
	let oe = {
		canScrollNext: N,
		canScrollPrev: P,
		containerNode: ae,
		internalEngine: R,
		destroy: k,
		off: p,
		on: f,
		emit: m,
		plugins: L,
		previousScrollSnap: te,
		reInit: h,
		rootNode: ie,
		scrollNext: j,
		scrollPrev: M,
		scrollProgress: I,
		scrollSnapList: F,
		scrollTo: A,
		selectedScrollSnap: ee,
		slideNodes: z,
		slidesInView: ne,
		slidesNotInView: re
	};
	return E(t, n), setTimeout(() => c.emit("init"), 0), oe;
}
fE.globalOptions = void 0;
//#endregion
//#region node_modules/.pnpm/embla-carousel-react@8.6.0_react@19.2.6/node_modules/embla-carousel-react/esm/embla-carousel-react.esm.js
function pE(e = {}, t = []) {
	let n = u(e), r = u(t), [i, o] = d(), [c, l] = d(), f = a(() => {
		i && i.reInit(n.current, r.current);
	}, [i]);
	return s(() => {
		fT(n.current, e) || (n.current = e, f());
	}, [e, f]), s(() => {
		mT(r.current, t) || (r.current = t, f());
	}, [t, f]), s(() => {
		if (dT() && c) {
			fE.globalOptions = pE.globalOptions;
			let e = fE(c, n.current, r.current);
			return o(e), () => e.destroy();
		} else o(void 0);
	}, [c, o]), [l, i];
}
pE.globalOptions = void 0;
//#endregion
//#region src/components/ui/carousel.tsx
var mE = e.createContext(null);
function hE() {
	let t = e.useContext(mE);
	if (!t) throw Error("useCarousel must be used within a <Carousel />");
	return t;
}
function gE({ orientation: t = "horizontal", opts: n, setApi: r, plugins: i, className: a, children: o, ...s }) {
	let [c, l] = pE({
		...n,
		axis: t === "horizontal" ? "x" : "y"
	}, i), [u, d] = e.useState(!1), [f, p] = e.useState(!1), m = e.useCallback((e) => {
		e && (d(e.canScrollPrev()), p(e.canScrollNext()));
	}, []), g = e.useCallback(() => {
		l?.scrollPrev();
	}, [l]), _ = e.useCallback(() => {
		l?.scrollNext();
	}, [l]), v = e.useCallback((e) => {
		e.key === "ArrowLeft" ? (e.preventDefault(), g()) : e.key === "ArrowRight" && (e.preventDefault(), _());
	}, [g, _]);
	return e.useEffect(() => {
		!l || !r || r(l);
	}, [l, r]), e.useEffect(() => {
		if (l) return m(l), l.on("reInit", m), l.on("select", m), () => {
			l?.off("select", m);
		};
	}, [l, m]), /* @__PURE__ */ h(mE.Provider, {
		value: {
			carouselRef: c,
			api: l,
			opts: n,
			orientation: t || (n?.axis === "y" ? "vertical" : "horizontal"),
			scrollPrev: g,
			scrollNext: _,
			canScrollPrev: u,
			canScrollNext: f
		},
		children: /* @__PURE__ */ h("div", {
			"data-slot": "carousel",
			onKeyDownCapture: v,
			className: G("relative font-sans", a),
			role: "region",
			"aria-roledescription": "carousel",
			...s,
			children: o
		})
	});
}
function _E({ className: e, ...t }) {
	let { carouselRef: n, orientation: r } = hE();
	return /* @__PURE__ */ h("div", {
		ref: n,
		"data-slot": "carousel-content",
		className: "overflow-hidden",
		children: /* @__PURE__ */ h("div", {
			className: G("flex", r === "horizontal" ? "-ml-4" : "-mt-4 flex-col", e),
			...t
		})
	});
}
function vE({ className: e, ...t }) {
	let { orientation: n } = hE();
	return /* @__PURE__ */ h("div", {
		"data-slot": "carousel-item",
		role: "group",
		"aria-roledescription": "slide",
		className: G("min-w-0 shrink-0 grow-0 basis-full", n === "horizontal" ? "pl-4" : "pt-4", e),
		...t
	});
}
function yE({ className: e, variant: t = "outline", size: n = "icon", ...r }) {
	let { orientation: i, scrollPrev: a, canScrollPrev: o } = hE();
	return /* @__PURE__ */ g(qb, {
		"data-slot": "carousel-previous",
		variant: t,
		size: n,
		className: G("absolute h-8 w-8 rounded-full border-border-subtle bg-surface-raised text-content-primary hover:bg-surface-sunken", i === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90", e),
		disabled: !o,
		onClick: a,
		...r,
		children: [/* @__PURE__ */ h(mt, { className: "h-4 w-4" }), /* @__PURE__ */ h("span", {
			className: "sr-only",
			children: "Slide sebelumnya"
		})]
	});
}
function bE({ className: e, variant: t = "outline", size: n = "icon", ...r }) {
	let { orientation: i, scrollNext: a, canScrollNext: o } = hE();
	return /* @__PURE__ */ g(qb, {
		"data-slot": "carousel-next",
		variant: t,
		size: n,
		className: G("absolute h-8 w-8 rounded-full border-border-subtle bg-surface-raised text-content-primary hover:bg-surface-sunken", i === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90", e),
		disabled: !o,
		onClick: a,
		...r,
		children: [/* @__PURE__ */ h(ht, { className: "h-4 w-4" }), /* @__PURE__ */ h("span", {
			className: "sr-only",
			children: "Slide berikutnya"
		})]
	});
}
//#endregion
//#region src/components/ui/card.tsx
function xE({ className: e, ...t }) {
	return /* @__PURE__ */ h("div", {
		"data-slot": "card",
		className: G("rounded-xl border border-border-default bg-card text-card-foreground shadow-sm", e),
		...t
	});
}
function SE({ className: e, ...t }) {
	return /* @__PURE__ */ h("div", {
		"data-slot": "card-header",
		className: G("flex flex-col space-y-1.5 p-6", e),
		...t
	});
}
function CE({ className: e, ...t }) {
	return /* @__PURE__ */ h("div", {
		"data-slot": "card-title",
		className: G("font-semibold leading-none tracking-tight", e),
		...t
	});
}
function wE({ className: e, ...t }) {
	return /* @__PURE__ */ h("div", {
		"data-slot": "card-description",
		className: G("text-body-sm text-content-secondary", e),
		...t
	});
}
function TE({ className: e, ...t }) {
	return /* @__PURE__ */ h("div", {
		"data-slot": "card-content",
		className: G("p-6 pt-0", e),
		...t
	});
}
function EE({ className: e, ...t }) {
	return /* @__PURE__ */ h("div", {
		"data-slot": "card-footer",
		className: G("flex items-center p-6 pt-0", e),
		...t
	});
}
//#endregion
//#region src/components/ui/checkbox.tsx
function DE({ className: e, indeterminate: t, ...n }) {
	return /* @__PURE__ */ h(Po, {
		"data-slot": "checkbox",
		className: G("peer h-4 w-4 shrink-0 rounded-sm border border-border-strong", "bg-surface-raised ring-offset-background shadow-xs", "transition-colors duration-fast outline-none", "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", "disabled:cursor-not-allowed disabled:opacity-50", "aria-invalid:border-destructive aria-invalid:ring-destructive/20", "data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground", "data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:text-primary-foreground", e),
		checked: t ? "indeterminate" : n.checked,
		...n,
		children: /* @__PURE__ */ h(Io, {
			"data-slot": "checkbox-indicator",
			className: "grid place-content-center text-current transition-none",
			children: h(t ? Nt : yt, {
				className: "h-3 w-3",
				strokeWidth: 2.5
			})
		})
	});
}
//#endregion
//#region node_modules/.pnpm/cmdk@1.1.1_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react@19.2.14_react-dom_66be394aff8225a06cf994aefac200c6/node_modules/cmdk/dist/chunk-NZJY6EH4.mjs
var OE = 1, kE = .9, AE = .8, jE = .17, ME = .1, NE = .999, PE = .9999, FE = .99, IE = /[\\\/_+.#"@\[\(\{&]/, LE = /[\\\/_+.#"@\[\(\{&]/g, RE = /[\s-]/, zE = /[\s-]/g;
function BE(e, t, n, r, i, a, o) {
	if (a === t.length) return i === e.length ? OE : FE;
	var s = `${i},${a}`;
	if (o[s] !== void 0) return o[s];
	for (var c = r.charAt(a), l = n.indexOf(c, i), u = 0, d, f, p, m; l >= 0;) d = BE(e, t, n, r, l + 1, a + 1, o), d > u && (l === i ? d *= OE : IE.test(e.charAt(l - 1)) ? (d *= AE, p = e.slice(i, l - 1).match(LE), p && i > 0 && (d *= NE ** +p.length)) : RE.test(e.charAt(l - 1)) ? (d *= kE, m = e.slice(i, l - 1).match(zE), m && i > 0 && (d *= NE ** +m.length)) : (d *= jE, i > 0 && (d *= NE ** +(l - i))), e.charAt(l) !== t.charAt(a) && (d *= PE)), (d < ME && n.charAt(l - 1) === r.charAt(a + 1) || r.charAt(a + 1) === r.charAt(a) && n.charAt(l - 1) !== r.charAt(a)) && (f = BE(e, t, n, r, l + 1, a + 2, o), f * ME > d && (d = f * ME)), d > u && (u = d), l = n.indexOf(c, l + 1);
	return o[s] = u, u;
}
function VE(e) {
	return e.toLowerCase().replace(zE, " ");
}
function HE(e, t, n) {
	return e = n && n.length > 0 ? `${e + " " + n.join(" ")}` : e, BE(e, t, VE(e), VE(t), 0, 0, {});
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-slot@1.2.4_@types+react@19.2.14_react@19.2.6/node_modules/@radix-ui/react-slot/dist/index.mjs
var UE = Symbol.for("react.lazy"), WE = e.use;
function GE(e) {
	return typeof e == "object" && !!e && "then" in e;
}
function KE(e) {
	return typeof e == "object" && !!e && "$$typeof" in e && e.$$typeof === UE && "_payload" in e && GE(e._payload);
}
/* @__NO_SIDE_EFFECTS__ */
function qE(t) {
	let n = /* @__PURE__ */ JE(t), r = e.forwardRef((t, r) => {
		let { children: i, ...a } = t;
		KE(i) && typeof WE == "function" && (i = WE(i._payload));
		let o = e.Children.toArray(i), s = o.find(XE);
		if (s) {
			let t = s.props.children, i = o.map((n) => n === s ? e.Children.count(t) > 1 ? e.Children.only(null) : e.isValidElement(t) ? t.props.children : null : n);
			return /* @__PURE__ */ h(n, {
				...a,
				ref: r,
				children: e.isValidElement(t) ? e.cloneElement(t, void 0, i) : null
			});
		}
		return /* @__PURE__ */ h(n, {
			...a,
			ref: r,
			children: i
		});
	});
	return r.displayName = `${t}.Slot`, r;
}
/* @__NO_SIDE_EFFECTS__ */
function JE(t) {
	let n = e.forwardRef((t, n) => {
		let { children: r, ...i } = t;
		if (KE(r) && typeof WE == "function" && (r = WE(r._payload)), e.isValidElement(r)) {
			let t = QE(r), a = ZE(i, r.props);
			return r.type !== e.Fragment && (a.ref = n ? zt(n, t) : t), e.cloneElement(r, a);
		}
		return e.Children.count(r) > 1 ? e.Children.only(null) : null;
	});
	return n.displayName = `${t}.SlotClone`, n;
}
var YE = Symbol("radix.slottable");
function XE(t) {
	return e.isValidElement(t) && typeof t.type == "function" && "__radixId" in t.type && t.type.__radixId === YE;
}
function ZE(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
function QE(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-primitive@2.1.4_@types+react-dom@19.2.3_@types+react@19.2.14__@types+re_c8c8fd2647f03197dbf56370d7498033/node_modules/@radix-ui/react-primitive/dist/index.mjs
var $E = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((t, n) => {
	let r = /* @__PURE__ */ qE(`Primitive.${n}`), i = e.forwardRef((e, t) => {
		let { asChild: i, ...a } = e, o = i ? r : n;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ h(o, {
			...a,
			ref: t
		});
	});
	return i.displayName = `Primitive.${n}`, {
		...t,
		[n]: i
	};
}, {}), eD = "[cmdk-group=\"\"]", tD = "[cmdk-group-items=\"\"]", nD = "[cmdk-group-heading=\"\"]", rD = "[cmdk-item=\"\"]", iD = `${rD}:not([aria-disabled="true"])`, aD = "cmdk-item-select", oD = "data-value", sD = (e, t, n) => HE(e, t, n), cD = e.createContext(void 0), lD = () => e.useContext(cD), uD = e.createContext(void 0), dD = () => e.useContext(uD), fD = e.createContext(void 0), pD = e.forwardRef((t, n) => {
	let r = DD(() => ({
		search: "",
		value: t.value ?? t.defaultValue ?? "",
		selectedItemId: void 0,
		filtered: {
			count: 0,
			items: /* @__PURE__ */ new Map(),
			groups: /* @__PURE__ */ new Set()
		}
	})), i = DD(() => /* @__PURE__ */ new Set()), a = DD(() => /* @__PURE__ */ new Map()), o = DD(() => /* @__PURE__ */ new Map()), s = DD(() => /* @__PURE__ */ new Set()), c = TD(t), { label: l, children: u, value: d, onValueChange: f, filter: p, shouldFilter: m, loop: h, disablePointerSelection: g = !1, vimBindings: _ = !0, ...v } = t, y = gn(), b = gn(), x = gn(), S = e.useRef(null), C = AD();
	ED(() => {
		if (d !== void 0) {
			let e = d.trim();
			r.current.value = e, w.emit();
		}
	}, [d]), ED(() => {
		C(6, A);
	}, []);
	let w = e.useMemo(() => ({
		subscribe: (e) => (s.current.add(e), () => s.current.delete(e)),
		snapshot: () => r.current,
		setState: (e, t, n) => {
			var i, a, o;
			if (!Object.is(r.current[e], t)) {
				if (r.current[e] = t, e === "search") k(), D(), C(1, O);
				else if (e === "value") {
					if (document.activeElement.hasAttribute("cmdk-input") || document.activeElement.hasAttribute("cmdk-root")) {
						let e = document.getElementById(x);
						e ? e.focus() : (i = document.getElementById(y)) == null || i.focus();
					}
					if (C(7, () => {
						r.current.selectedItemId = j()?.id, w.emit();
					}), n || C(5, A), c.current?.value !== void 0) {
						let e = t ?? "";
						(o = (a = c.current).onValueChange) == null || o.call(a, e);
						return;
					}
				}
				w.emit();
			}
		},
		emit: () => {
			s.current.forEach((e) => e());
		}
	}), []), T = e.useMemo(() => ({
		value: (e, t, n) => {
			t !== o.current.get(e)?.value && (o.current.set(e, {
				value: t,
				keywords: n
			}), r.current.filtered.items.set(e, E(t, n)), C(2, () => {
				D(), w.emit();
			}));
		},
		item: (e, t) => (i.current.add(e), t && (a.current.has(t) ? a.current.get(t).add(e) : a.current.set(t, new Set([e]))), C(3, () => {
			k(), D(), r.current.value || O(), w.emit();
		}), () => {
			o.current.delete(e), i.current.delete(e), r.current.filtered.items.delete(e);
			let t = j();
			C(4, () => {
				k(), t?.getAttribute("id") === e && O(), w.emit();
			});
		}),
		group: (e) => (a.current.has(e) || a.current.set(e, /* @__PURE__ */ new Set()), () => {
			o.current.delete(e), a.current.delete(e);
		}),
		filter: () => c.current.shouldFilter,
		label: l || t["aria-label"],
		getDisablePointerSelection: () => c.current.disablePointerSelection,
		listId: y,
		inputId: x,
		labelId: b,
		listInnerRef: S
	}), []);
	function E(e, t) {
		let n = c.current?.filter ?? sD;
		return e ? n(e, r.current.search, t) : 0;
	}
	function D() {
		if (!r.current.search || c.current.shouldFilter === !1) return;
		let e = r.current.filtered.items, t = [];
		r.current.filtered.groups.forEach((n) => {
			let r = a.current.get(n), i = 0;
			r.forEach((t) => {
				let n = e.get(t);
				i = Math.max(n, i);
			}), t.push([n, i]);
		});
		let n = S.current;
		M().sort((t, n) => {
			let r = t.getAttribute("id"), i = n.getAttribute("id");
			return (e.get(i) ?? 0) - (e.get(r) ?? 0);
		}).forEach((e) => {
			let t = e.closest(tD);
			t ? t.appendChild(e.parentElement === t ? e : e.closest(`${tD} > *`)) : n.appendChild(e.parentElement === n ? e : e.closest(`${tD} > *`));
		}), t.sort((e, t) => t[1] - e[1]).forEach((e) => {
			let t = S.current?.querySelector(`${eD}[${oD}="${encodeURIComponent(e[0])}"]`);
			t?.parentElement.appendChild(t);
		});
	}
	function O() {
		let e = M().find((e) => e.getAttribute("aria-disabled") !== "true")?.getAttribute(oD);
		w.setState("value", e || void 0);
	}
	function k() {
		if (!r.current.search || c.current.shouldFilter === !1) {
			r.current.filtered.count = i.current.size;
			return;
		}
		r.current.filtered.groups = /* @__PURE__ */ new Set();
		let e = 0;
		for (let t of i.current) {
			let n = E(o.current.get(t)?.value ?? "", o.current.get(t)?.keywords ?? []);
			r.current.filtered.items.set(t, n), n > 0 && e++;
		}
		for (let [e, t] of a.current) for (let n of t) if (r.current.filtered.items.get(n) > 0) {
			r.current.filtered.groups.add(e);
			break;
		}
		r.current.filtered.count = e;
	}
	function A() {
		var e;
		let t = j();
		t && (t.parentElement?.firstChild === t && ((e = t.closest(eD)?.querySelector(nD)) == null || e.scrollIntoView({ block: "nearest" })), t.scrollIntoView({ block: "nearest" }));
	}
	function j() {
		return S.current?.querySelector(`${rD}[aria-selected="true"]`);
	}
	function M() {
		return Array.from(S.current?.querySelectorAll(iD) || []);
	}
	function N(e) {
		let t = M()[e];
		t && w.setState("value", t.getAttribute(oD));
	}
	function P(e) {
		var t;
		let n = j(), r = M(), i = r.findIndex((e) => e === n), a = r[i + e];
		(t = c.current) != null && t.loop && (a = i + e < 0 ? r[r.length - 1] : i + e === r.length ? r[0] : r[i + e]), a && w.setState("value", a.getAttribute(oD));
	}
	function F(e) {
		let t = j()?.closest(eD), n;
		for (; t && !n;) t = e > 0 ? CD(t, eD) : wD(t, eD), n = t?.querySelector(iD);
		n ? w.setState("value", n.getAttribute(oD)) : P(e);
	}
	let I = () => N(M().length - 1), ee = (e) => {
		e.preventDefault(), e.metaKey ? I() : e.altKey ? F(1) : P(1);
	}, te = (e) => {
		e.preventDefault(), e.metaKey ? N(0) : e.altKey ? F(-1) : P(-1);
	};
	return e.createElement($E.div, {
		ref: n,
		tabIndex: -1,
		...v,
		"cmdk-root": "",
		onKeyDown: (e) => {
			var t;
			(t = v.onKeyDown) == null || t.call(v, e);
			let n = e.nativeEvent.isComposing || e.keyCode === 229;
			if (!(e.defaultPrevented || n)) switch (e.key) {
				case "n":
				case "j":
					_ && e.ctrlKey && ee(e);
					break;
				case "ArrowDown":
					ee(e);
					break;
				case "p":
				case "k":
					_ && e.ctrlKey && te(e);
					break;
				case "ArrowUp":
					te(e);
					break;
				case "Home":
					e.preventDefault(), N(0);
					break;
				case "End":
					e.preventDefault(), I();
					break;
				case "Enter": {
					e.preventDefault();
					let t = j();
					if (t) {
						let e = new Event(aD);
						t.dispatchEvent(e);
					}
				}
			}
		}
	}, e.createElement("label", {
		"cmdk-label": "",
		htmlFor: T.inputId,
		id: T.labelId,
		style: ND
	}, l), MD(t, (t) => e.createElement(uD.Provider, { value: w }, e.createElement(cD.Provider, { value: T }, t))));
}), mD = e.forwardRef((t, n) => {
	let r = gn(), i = e.useRef(null), a = e.useContext(fD), o = lD(), s = TD(t), c = s.current?.forceMount ?? a?.forceMount;
	ED(() => {
		if (!c) return o.item(r, a?.id);
	}, [c]);
	let l = kD(r, i, [
		t.value,
		t.children,
		i
	], t.keywords), u = dD(), d = OD((e) => e.value && e.value === l.current), f = OD((e) => c || o.filter() === !1 ? !0 : e.search ? e.filtered.items.get(r) > 0 : !0);
	e.useEffect(() => {
		let e = i.current;
		if (!(!e || t.disabled)) return e.addEventListener(aD, p), () => e.removeEventListener(aD, p);
	}, [
		f,
		t.onSelect,
		t.disabled
	]);
	function p() {
		var e, t;
		m(), (t = (e = s.current).onSelect) == null || t.call(e, l.current);
	}
	function m() {
		u.setState("value", l.current, !0);
	}
	if (!f) return null;
	let { disabled: h, value: g, onSelect: _, forceMount: v, keywords: y, ...b } = t;
	return e.createElement($E.div, {
		ref: zt(i, n),
		...b,
		id: r,
		"cmdk-item": "",
		role: "option",
		"aria-disabled": !!h,
		"aria-selected": !!d,
		"data-disabled": !!h,
		"data-selected": !!d,
		onPointerMove: h || o.getDisablePointerSelection() ? void 0 : m,
		onClick: h ? void 0 : p
	}, t.children);
}), hD = e.forwardRef((t, n) => {
	let { heading: r, children: i, forceMount: a, ...o } = t, s = gn(), c = e.useRef(null), l = e.useRef(null), u = gn(), d = lD(), f = OD((e) => a || d.filter() === !1 ? !0 : e.search ? e.filtered.groups.has(s) : !0);
	ED(() => d.group(s), []), kD(s, c, [
		t.value,
		t.heading,
		l
	]);
	let p = e.useMemo(() => ({
		id: s,
		forceMount: a
	}), [a]);
	return e.createElement($E.div, {
		ref: zt(c, n),
		...o,
		"cmdk-group": "",
		role: "presentation",
		hidden: f ? void 0 : !0
	}, r && e.createElement("div", {
		ref: l,
		"cmdk-group-heading": "",
		"aria-hidden": !0,
		id: u
	}, r), MD(t, (t) => e.createElement("div", {
		"cmdk-group-items": "",
		role: "group",
		"aria-labelledby": r ? u : void 0
	}, e.createElement(fD.Provider, { value: p }, t))));
}), gD = e.forwardRef((t, n) => {
	let { alwaysRender: r, ...i } = t, a = e.useRef(null), o = OD((e) => !e.search);
	return !r && !o ? null : e.createElement($E.div, {
		ref: zt(a, n),
		...i,
		"cmdk-separator": "",
		role: "separator"
	});
}), _D = e.forwardRef((t, n) => {
	let { onValueChange: r, ...i } = t, a = t.value != null, o = dD(), s = OD((e) => e.search), c = OD((e) => e.selectedItemId), l = lD();
	return e.useEffect(() => {
		t.value != null && o.setState("search", t.value);
	}, [t.value]), e.createElement($E.input, {
		ref: n,
		...i,
		"cmdk-input": "",
		autoComplete: "off",
		autoCorrect: "off",
		spellCheck: !1,
		"aria-autocomplete": "list",
		role: "combobox",
		"aria-expanded": !0,
		"aria-controls": l.listId,
		"aria-labelledby": l.labelId,
		"aria-activedescendant": c,
		id: l.inputId,
		type: "text",
		value: a ? t.value : s,
		onChange: (e) => {
			a || o.setState("search", e.target.value), r?.(e.target.value);
		}
	});
}), vD = e.forwardRef((t, n) => {
	let { children: r, label: i = "Suggestions", ...a } = t, o = e.useRef(null), s = e.useRef(null), c = OD((e) => e.selectedItemId), l = lD();
	return e.useEffect(() => {
		if (s.current && o.current) {
			let e = s.current, t = o.current, n, r = new ResizeObserver(() => {
				n = requestAnimationFrame(() => {
					let n = e.offsetHeight;
					t.style.setProperty("--cmdk-list-height", n.toFixed(1) + "px");
				});
			});
			return r.observe(e), () => {
				cancelAnimationFrame(n), r.unobserve(e);
			};
		}
	}, []), e.createElement($E.div, {
		ref: zt(o, n),
		...a,
		"cmdk-list": "",
		role: "listbox",
		tabIndex: -1,
		"aria-activedescendant": c,
		"aria-label": i,
		id: l.listId
	}, MD(t, (t) => e.createElement("div", {
		ref: zt(s, l.listInnerRef),
		"cmdk-list-sizer": ""
	}, t)));
}), yD = e.forwardRef((t, n) => {
	let { open: r, onOpenChange: i, overlayClassName: a, contentClassName: o, container: s, ...c } = t;
	return e.createElement(Ya, {
		open: r,
		onOpenChange: i
	}, e.createElement(Za, { container: s }, e.createElement(Qa, {
		"cmdk-overlay": "",
		className: a
	}), e.createElement($a, {
		"aria-label": t.label,
		"cmdk-dialog": "",
		className: o
	}, e.createElement(pD, {
		ref: n,
		...c
	}))));
}), bD = e.forwardRef((t, n) => OD((e) => e.filtered.count === 0) ? e.createElement($E.div, {
	ref: n,
	...t,
	"cmdk-empty": "",
	role: "presentation"
}) : null), xD = e.forwardRef((t, n) => {
	let { progress: r, children: i, label: a = "Loading...", ...o } = t;
	return e.createElement($E.div, {
		ref: n,
		...o,
		"cmdk-loading": "",
		role: "progressbar",
		"aria-valuenow": r,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-label": a
	}, MD(t, (t) => e.createElement("div", { "aria-hidden": !0 }, t)));
}), SD = Object.assign(pD, {
	List: vD,
	Item: mD,
	Input: _D,
	Group: hD,
	Separator: gD,
	Dialog: yD,
	Empty: bD,
	Loading: xD
});
function CD(e, t) {
	let n = e.nextElementSibling;
	for (; n;) {
		if (n.matches(t)) return n;
		n = n.nextElementSibling;
	}
}
function wD(e, t) {
	let n = e.previousElementSibling;
	for (; n;) {
		if (n.matches(t)) return n;
		n = n.previousElementSibling;
	}
}
function TD(t) {
	let n = e.useRef(t);
	return ED(() => {
		n.current = t;
	}), n;
}
var ED = typeof window > "u" ? e.useEffect : e.useLayoutEffect;
function DD(t) {
	let n = e.useRef();
	return n.current === void 0 && (n.current = t()), n;
}
function OD(t) {
	let n = dD(), r = () => t(n.snapshot());
	return e.useSyncExternalStore(n.subscribe, r, r);
}
function kD(t, n, r, i = []) {
	let a = e.useRef(), o = lD();
	return ED(() => {
		var e;
		let s = (() => {
			for (let e of r) {
				if (typeof e == "string") return e.trim();
				if (typeof e == "object" && "current" in e) return e.current ? e.current.textContent?.trim() : a.current;
			}
		})(), c = i.map((e) => e.trim());
		o.value(t, s, c), (e = n.current) == null || e.setAttribute(oD, s), a.current = s;
	}), a;
}
var AD = () => {
	let [t, n] = e.useState(), r = DD(() => /* @__PURE__ */ new Map());
	return ED(() => {
		r.current.forEach((e) => e()), r.current = /* @__PURE__ */ new Map();
	}, [t]), (e, t) => {
		r.current.set(e, t), n({});
	};
};
function jD(e) {
	let t = e.type;
	return typeof t == "function" ? t(e.props) : "render" in t ? t.render(e.props) : e;
}
function MD({ asChild: t, children: n }, r) {
	return t && e.isValidElement(n) ? e.cloneElement(jD(n), { ref: n.ref }, r(n.props.children)) : r(n);
}
var ND = {
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: "0",
	margin: "-1px",
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	borderWidth: "0"
};
//#endregion
//#region src/components/ui/dialog.tsx
function PD({ ...e }) {
	return /* @__PURE__ */ h(Ya, {
		"data-slot": "dialog",
		...e
	});
}
function FD({ ...e }) {
	return /* @__PURE__ */ h(Xa, {
		"data-slot": "dialog-trigger",
		...e
	});
}
function ID({ ...e }) {
	return /* @__PURE__ */ h(Za, {
		"data-slot": "dialog-portal",
		...e
	});
}
function LD({ ...e }) {
	return /* @__PURE__ */ h(no, {
		"data-slot": "dialog-close",
		...e
	});
}
function RD({ className: e, ...t }) {
	return /* @__PURE__ */ h(Qa, {
		"data-slot": "dialog-overlay",
		className: G("fixed inset-0 z-50 bg-surface-overlay/80", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", e),
		...t
	});
}
function zD({ className: e, children: t, showCloseButton: n = !0, ...r }) {
	return /* @__PURE__ */ g(ID, { children: [/* @__PURE__ */ h(RD, {}), /* @__PURE__ */ g($a, {
		"data-slot": "dialog-content",
		className: G("fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border border-border-default bg-background p-6 shadow-elevation-5 duration-200 outline-none sm:max-w-lg", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", e),
		...r,
		children: [t, n && /* @__PURE__ */ g(no, {
			"data-slot": "dialog-close",
			className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4",
			children: [/* @__PURE__ */ h(Lt, {}), /* @__PURE__ */ h("span", {
				className: "sr-only",
				children: "Tutup"
			})]
		})]
	})] });
}
function BD({ className: e, ...t }) {
	return /* @__PURE__ */ h("div", {
		"data-slot": "dialog-header",
		className: G("flex flex-col gap-2 text-center sm:text-left", e),
		...t
	});
}
function VD({ className: e, ...t }) {
	return /* @__PURE__ */ h("div", {
		"data-slot": "dialog-footer",
		className: G("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", e),
		...t
	});
}
function HD({ className: e, ...t }) {
	return /* @__PURE__ */ h(eo, {
		"data-slot": "dialog-title",
		className: G("text-lg leading-none font-semibold text-content-primary", e),
		...t
	});
}
function UD({ className: e, ...t }) {
	return /* @__PURE__ */ h(to, {
		"data-slot": "dialog-description",
		className: G("text-sm text-content-secondary", e),
		...t
	});
}
//#endregion
//#region src/components/ui/command.tsx
function WD({ className: e, ...t }) {
	return /* @__PURE__ */ h(SD, {
		"data-slot": "command",
		className: G("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground", e),
		...t
	});
}
function GD({ title: e = "Command Palette", description: t = "Cari perintah untuk dijalankan...", children: n, className: r, showCloseButton: i = !0, ...a }) {
	return /* @__PURE__ */ g(PD, {
		...a,
		children: [/* @__PURE__ */ g(BD, {
			className: "sr-only",
			children: [/* @__PURE__ */ h(HD, { children: e }), /* @__PURE__ */ h(UD, { children: t })]
		}), /* @__PURE__ */ h(zD, {
			className: G("overflow-hidden p-0", r),
			showCloseButton: i,
			children: /* @__PURE__ */ h(WD, {
				className: "**:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-content-tertiary [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5",
				children: n
			})
		})]
	});
}
function KD({ className: e, ...t }) {
	return /* @__PURE__ */ g("div", {
		"data-slot": "command-input-wrapper",
		className: "flex h-9 items-center gap-2 border-b border-border-subtle px-3",
		children: [/* @__PURE__ */ h(Pt, { className: "size-4 shrink-0 opacity-50" }), /* @__PURE__ */ h(SD.Input, {
			"data-slot": "command-input",
			className: G("flex h-10 w-full rounded-md bg-transparent py-3 text-body-sm", "outline-none focus:outline-hidden focus:ring-0 focus-visible:outline-hidden focus-visible:ring-0", "placeholder:text-content-tertiary", "disabled:cursor-not-allowed disabled:opacity-50", e),
			...t
		})]
	});
}
function qD({ className: e, ...t }) {
	return /* @__PURE__ */ h(SD.List, {
		"data-slot": "command-list",
		className: G("max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto", e),
		...t
	});
}
function JD({ ...e }) {
	return /* @__PURE__ */ h(SD.Empty, {
		"data-slot": "command-empty",
		className: "py-6 text-center text-body-sm text-content-secondary",
		...e
	});
}
function YD({ className: e, ...t }) {
	return /* @__PURE__ */ h(SD.Group, {
		"data-slot": "command-group",
		className: G("overflow-hidden p-1 text-content-primary [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-caption [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-content-tertiary", e),
		...t
	});
}
function XD({ className: e, ...t }) {
	return /* @__PURE__ */ h(SD.Separator, {
		"data-slot": "command-separator",
		className: G("-mx-1 h-px bg-border-subtle", e),
		...t
	});
}
function ZD({ className: e, ...t }) {
	return /* @__PURE__ */ h(SD.Item, {
		"data-slot": "command-item",
		className: G("relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-body-sm outline-hidden select-none", "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50", "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground", "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4 [&_svg:not([class*=text-])]:text-content-tertiary", e),
		...t
	});
}
function QD({ className: e, ...t }) {
	return /* @__PURE__ */ h("span", {
		"data-slot": "command-shortcut",
		className: G("ml-auto text-caption tracking-widest text-content-tertiary", e),
		...t
	});
}
//#endregion
//#region src/components/ui/dropdown-menu.tsx
function $D({ ...e }) {
	return /* @__PURE__ */ h(df, {
		"data-slot": "dropdown-menu",
		...e
	});
}
function eO({ ...e }) {
	return /* @__PURE__ */ h(pf, {
		"data-slot": "dropdown-menu-portal",
		...e
	});
}
function tO({ ...e }) {
	return /* @__PURE__ */ h(ff, {
		"data-slot": "dropdown-menu-trigger",
		...e
	});
}
function nO({ className: e, sideOffset: t = 4, ...n }) {
	return /* @__PURE__ */ h(pf, { children: /* @__PURE__ */ h(mf, {
		"data-slot": "dropdown-menu-content",
		sideOffset: t,
		className: G("z-dropdown max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border border-border-default bg-popover p-1 text-popover-foreground shadow-elevation-4", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", e),
		...n
	}) });
}
function rO({ ...e }) {
	return /* @__PURE__ */ h(hf, {
		"data-slot": "dropdown-menu-group",
		...e
	});
}
function iO({ className: e, inset: t, variant: n = "default", ...r }) {
	return /* @__PURE__ */ h(_f, {
		"data-slot": "dropdown-menu-item",
		"data-inset": t,
		"data-variant": n,
		className: G("relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-body-sm outline-hidden select-none", "focus:bg-accent focus:text-accent-foreground", "data-[disabled]:pointer-events-none data-[disabled]:opacity-50", "data-[inset]:pl-8", "data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive", "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4 [&_svg:not([class*=text-])]:text-content-tertiary", e),
		...r
	});
}
function aO({ className: e, children: t, checked: n, ...r }) {
	return /* @__PURE__ */ g(vf, {
		"data-slot": "dropdown-menu-checkbox-item",
		className: G("relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-body-sm outline-hidden select-none", "focus:bg-accent focus:text-accent-foreground", "data-[disabled]:pointer-events-none data-[disabled]:opacity-50", e),
		checked: n,
		...r,
		children: [/* @__PURE__ */ h("span", {
			className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
			children: /* @__PURE__ */ h(xf, { children: /* @__PURE__ */ h(yt, { className: "size-4" }) })
		}), t]
	});
}
function oO({ ...e }) {
	return /* @__PURE__ */ h(yf, {
		"data-slot": "dropdown-menu-radio-group",
		...e
	});
}
function sO({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ g(bf, {
		"data-slot": "dropdown-menu-radio-item",
		className: G("relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-body-sm outline-hidden select-none", "focus:bg-accent focus:text-accent-foreground", "data-[disabled]:pointer-events-none data-[disabled]:opacity-50", e),
		...n,
		children: [/* @__PURE__ */ h("span", {
			className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center",
			children: /* @__PURE__ */ h(xf, { children: /* @__PURE__ */ h(Dt, { className: "size-2 fill-current" }) })
		}), t]
	});
}
function cO({ className: e, inset: t, ...n }) {
	return /* @__PURE__ */ h(gf, {
		"data-slot": "dropdown-menu-label",
		"data-inset": t,
		className: G("px-2 py-1.5 text-body-sm font-medium data-[inset]:pl-8", e),
		...n
	});
}
function lO({ className: e, ...t }) {
	return /* @__PURE__ */ h(Sf, {
		"data-slot": "dropdown-menu-separator",
		className: G("-mx-1 my-1 h-px bg-border-subtle", e),
		...t
	});
}
function uO({ className: e, ...t }) {
	return /* @__PURE__ */ h("span", {
		"data-slot": "dropdown-menu-shortcut",
		className: G("ml-auto text-caption tracking-widest text-content-tertiary", e),
		...t
	});
}
function dO({ ...e }) {
	return /* @__PURE__ */ h(Cf, {
		"data-slot": "dropdown-menu-sub",
		...e
	});
}
function fO({ className: e, inset: t, children: n, ...r }) {
	return /* @__PURE__ */ g(wf, {
		"data-slot": "dropdown-menu-sub-trigger",
		"data-inset": t,
		className: G("flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-body-sm outline-hidden select-none", "focus:bg-accent focus:text-accent-foreground", "data-[inset]:pl-8", "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground", e),
		...r,
		children: [n, /* @__PURE__ */ h(St, { className: "ml-auto size-4" })]
	});
}
function pO({ className: e, ...t }) {
	return /* @__PURE__ */ h(Tf, {
		"data-slot": "dropdown-menu-sub-content",
		className: G("z-dropdown min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border border-border-default bg-popover p-1 text-popover-foreground shadow-elevation-4", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", e),
		...t
	});
}
//#endregion
//#region node_modules/.pnpm/vaul@1.1.2_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react@19.2.14_react-dom_c2da67149e7b5ac81ad873c4bfa2a8e2/node_modules/vaul/dist/index.mjs
function mO(e) {
	if (!e || typeof document > "u") return;
	let t = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
	n.type = "text/css", t.appendChild(n), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e));
}
var hO = t.createContext({
	drawerRef: { current: null },
	overlayRef: { current: null },
	onPress: () => {},
	onRelease: () => {},
	onDrag: () => {},
	onNestedDrag: () => {},
	onNestedOpenChange: () => {},
	onNestedRelease: () => {},
	openProp: void 0,
	dismissible: !1,
	isOpen: !1,
	isDragging: !1,
	keyboardIsOpen: { current: !1 },
	snapPointsOffset: null,
	snapPoints: null,
	handleOnly: !1,
	modal: !1,
	shouldFade: !1,
	activeSnapPoint: null,
	onOpenChange: () => {},
	setActiveSnapPoint: () => {},
	closeDrawer: () => {},
	direction: "bottom",
	shouldAnimate: { current: !0 },
	shouldScaleBackground: !1,
	setBackgroundColorOnScale: !0,
	noBodyStyles: !1,
	container: null,
	autoFocus: !1
}), gO = () => {
	let e = t.useContext(hO);
	if (!e) throw Error("useDrawerContext must be used within a Drawer.Root");
	return e;
};
mO("[data-vaul-drawer]{touch-action:none;will-change:transform;transition:transform .5s cubic-bezier(.32, .72, 0, 1);animation-duration:.5s;animation-timing-function:cubic-bezier(0.32,0.72,0,1)}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=open]{animation-name:slideFromBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=closed]{animation-name:slideToBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=open]{animation-name:slideFromTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=closed]{animation-name:slideToTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=open]{animation-name:slideFromLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=closed]{animation-name:slideToLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=open]{animation-name:slideFromRight}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=closed]{animation-name:slideToRight}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,var(--initial-transform,100%),0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=top]{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=left]{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(var(--initial-transform,100%),0,0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=top]{transform:translate3d(0,var(--snap-point-height,0),0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,var(--snap-point-height,0),0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=left]{transform:translate3d(var(--snap-point-height,0),0,0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(var(--snap-point-height,0),0,0)}[data-vaul-overlay][data-vaul-snap-points=false]{animation-duration:.5s;animation-timing-function:cubic-bezier(0.32,0.72,0,1)}[data-vaul-overlay][data-vaul-snap-points=false][data-state=open]{animation-name:fadeIn}[data-vaul-overlay][data-state=closed]{animation-name:fadeOut}[data-vaul-animate=false]{animation:none!important}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:0;transition:opacity .5s cubic-bezier(.32, .72, 0, 1)}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:1}[data-vaul-drawer]:not([data-vaul-custom-container=true])::after{content:'';position:absolute;background:inherit;background-color:inherit}[data-vaul-drawer][data-vaul-drawer-direction=top]::after{top:initial;bottom:100%;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=bottom]::after{top:100%;bottom:initial;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=left]::after{left:initial;right:100%;top:0;bottom:0;width:200%}[data-vaul-drawer][data-vaul-drawer-direction=right]::after{left:100%;right:initial;top:0;bottom:0;width:200%}[data-vaul-overlay][data-vaul-snap-points=true]:not([data-vaul-snap-points-overlay=true]):not(\n[data-state=closed]\n){opacity:0}[data-vaul-overlay][data-vaul-snap-points-overlay=true]{opacity:1}[data-vaul-handle]{display:block;position:relative;opacity:.7;background:#e2e2e4;margin-left:auto;margin-right:auto;height:5px;width:32px;border-radius:1rem;touch-action:pan-y}[data-vaul-handle]:active,[data-vaul-handle]:hover{opacity:1}[data-vaul-handle-hitarea]{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:max(100%,2.75rem);height:max(100%,2.75rem);touch-action:inherit}@media (hover:hover) and (pointer:fine){[data-vaul-drawer]{user-select:none}}@media (pointer:fine){[data-vaul-handle-hitarea]:{width:100%;height:100%}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeOut{to{opacity:0}}@keyframes slideFromBottom{from{transform:translate3d(0,var(--initial-transform,100%),0)}to{transform:translate3d(0,0,0)}}@keyframes slideToBottom{to{transform:translate3d(0,var(--initial-transform,100%),0)}}@keyframes slideFromTop{from{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}to{transform:translate3d(0,0,0)}}@keyframes slideToTop{to{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}}@keyframes slideFromLeft{from{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}to{transform:translate3d(0,0,0)}}@keyframes slideToLeft{to{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}}@keyframes slideFromRight{from{transform:translate3d(var(--initial-transform,100%),0,0)}to{transform:translate3d(0,0,0)}}@keyframes slideToRight{to{transform:translate3d(var(--initial-transform,100%),0,0)}}");
function _O() {
	let e = navigator.userAgent;
	return typeof window < "u" && (/Firefox/.test(e) && /Mobile/.test(e) || /FxiOS/.test(e));
}
function vO() {
	return CO(/^Mac/);
}
function yO() {
	return CO(/^iPhone/);
}
function bO() {
	return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
function xO() {
	return CO(/^iPad/) || vO() && navigator.maxTouchPoints > 1;
}
function SO() {
	return yO() || xO();
}
function CO(e) {
	return typeof window < "u" && window.navigator != null ? e.test(window.navigator.platform) : void 0;
}
var wO = 24, TO = typeof window < "u" ? c : s;
function EO(...e) {
	return (...t) => {
		for (let n of e) typeof n == "function" && n(...t);
	};
}
var DO = typeof document < "u" && window.visualViewport;
function OO(e) {
	let t = window.getComputedStyle(e);
	return /(auto|scroll)/.test(t.overflow + t.overflowX + t.overflowY);
}
function kO(e) {
	for (OO(e) && (e = e.parentElement); e && !OO(e);) e = e.parentElement;
	return e || document.scrollingElement || document.documentElement;
}
var AO = new Set([
	"checkbox",
	"radio",
	"range",
	"color",
	"file",
	"image",
	"button",
	"submit",
	"reset"
]), jO = 0, MO;
function NO(e = {}) {
	let { isDisabled: t } = e;
	TO(() => {
		if (!t) return jO++, jO === 1 && SO() && (MO = PO()), () => {
			jO--, jO === 0 && MO?.();
		};
	}, [t]);
}
function PO() {
	let e, t = 0, n = (n) => {
		e = kO(n.target), !(e === document.documentElement && e === document.body) && (t = n.changedTouches[0].pageY);
	}, r = (n) => {
		if (!e || e === document.documentElement || e === document.body) {
			n.preventDefault();
			return;
		}
		let r = n.changedTouches[0].pageY, i = e.scrollTop, a = e.scrollHeight - e.clientHeight;
		a !== 0 && ((i <= 0 && r > t || i >= a && r < t) && n.preventDefault(), t = r);
	}, i = (e) => {
		let t = e.target;
		RO(t) && t !== document.activeElement && (e.preventDefault(), t.style.transform = "translateY(-2000px)", t.focus(), requestAnimationFrame(() => {
			t.style.transform = "";
		}));
	}, a = (e) => {
		let t = e.target;
		RO(t) && (t.style.transform = "translateY(-2000px)", requestAnimationFrame(() => {
			t.style.transform = "", DO && (DO.height < window.innerHeight ? requestAnimationFrame(() => {
				LO(t);
			}) : DO.addEventListener("resize", () => LO(t), { once: !0 }));
		}));
	}, o = () => {
		window.scrollTo(0, 0);
	}, s = window.pageXOffset, c = window.pageYOffset, l = EO(FO(document.documentElement, "paddingRight", `${window.innerWidth - document.documentElement.clientWidth}px`));
	window.scrollTo(0, 0);
	let u = EO(IO(document, "touchstart", n, {
		passive: !1,
		capture: !0
	}), IO(document, "touchmove", r, {
		passive: !1,
		capture: !0
	}), IO(document, "touchend", i, {
		passive: !1,
		capture: !0
	}), IO(document, "focus", a, !0), IO(window, "scroll", o));
	return () => {
		l(), u(), window.scrollTo(s, c);
	};
}
function FO(e, t, n) {
	let r = e.style[t];
	return e.style[t] = n, () => {
		e.style[t] = r;
	};
}
function IO(e, t, n, r) {
	return e.addEventListener(t, n, r), () => {
		e.removeEventListener(t, n, r);
	};
}
function LO(e) {
	let t = document.scrollingElement || document.documentElement;
	for (; e && e !== t;) {
		let t = kO(e);
		if (t !== document.documentElement && t !== document.body && t !== e) {
			let n = t.getBoundingClientRect().top, r = e.getBoundingClientRect().top;
			e.getBoundingClientRect().bottom > t.getBoundingClientRect().bottom + wO && (t.scrollTop += r - n);
		}
		e = t.parentElement;
	}
}
function RO(e) {
	return e instanceof HTMLInputElement && !AO.has(e.type) || e instanceof HTMLTextAreaElement || e instanceof HTMLElement && e.isContentEditable;
}
function zO(e, t) {
	typeof e == "function" ? e(t) : e != null && (e.current = t);
}
function BO(...e) {
	return (t) => e.forEach((e) => zO(e, t));
}
function VO(...t) {
	return e.useCallback(BO(...t), t);
}
var HO = /* @__PURE__ */ new WeakMap();
function UO(e, t, n = !1) {
	if (!e || !(e instanceof HTMLElement)) return;
	let r = {};
	Object.entries(t).forEach(([t, n]) => {
		if (t.startsWith("--")) {
			e.style.setProperty(t, n);
			return;
		}
		r[t] = e.style[t], e.style[t] = n;
	}), !n && HO.set(e, r);
}
function WO(e, t) {
	if (!e || !(e instanceof HTMLElement)) return;
	let n = HO.get(e);
	n && (e.style[t] = n[t]);
}
var GO = (e) => {
	switch (e) {
		case "top":
		case "bottom": return !0;
		case "left":
		case "right": return !1;
		default: return e;
	}
};
function KO(e, t) {
	if (!e) return null;
	let n = window.getComputedStyle(e), r = n.transform || n.webkitTransform || n.mozTransform, i = r.match(/^matrix3d\((.+)\)$/);
	return i ? parseFloat(i[1].split(", ")[GO(t) ? 13 : 12]) : (i = r.match(/^matrix\((.+)\)$/), i ? parseFloat(i[1].split(", ")[GO(t) ? 5 : 4]) : null);
}
function qO(e) {
	return 8 * (Math.log(e + 1) - 2);
}
function JO(e, t) {
	if (!e) return () => {};
	let n = e.style.cssText;
	return Object.assign(e.style, t), () => {
		e.style.cssText = n;
	};
}
var YO = {
	DURATION: .5,
	EASE: [
		.32,
		.72,
		0,
		1
	]
}, XO = .4, ZO = .25, QO = 100, $O = 8, ek = 16, tk = 26, nk = "vaul-dragging";
function rk(e) {
	let n = t.useRef(e);
	return t.useEffect(() => {
		n.current = e;
	}), t.useMemo(() => (...e) => n.current == null ? void 0 : n.current.call(n, ...e), []);
}
function ik({ defaultProp: e, onChange: n }) {
	let r = t.useState(e), [i] = r, a = t.useRef(i), o = rk(n);
	return t.useEffect(() => {
		a.current !== i && (o(i), a.current = i);
	}, [
		i,
		a,
		o
	]), r;
}
function ak({ prop: e, defaultProp: n, onChange: r = () => {} }) {
	let [i, a] = ik({
		defaultProp: n,
		onChange: r
	}), o = e !== void 0, s = o ? e : i, c = rk(r);
	return [s, t.useCallback((t) => {
		if (o) {
			let n = typeof t == "function" ? t(e) : t;
			n !== e && c(n);
		} else a(t);
	}, [
		o,
		e,
		a,
		c
	])];
}
function ok({ activeSnapPointProp: e, setActiveSnapPointProp: n, snapPoints: r, drawerRef: i, overlayRef: a, fadeFromIndex: o, onSnapPointChange: s, direction: c = "bottom", container: l, snapToSequentialPoint: u }) {
	let [d, f] = ak({
		prop: e,
		defaultProp: r?.[0],
		onChange: n
	}), [p, m] = t.useState(typeof window < "u" ? {
		innerWidth: window.innerWidth,
		innerHeight: window.innerHeight
	} : void 0);
	t.useEffect(() => {
		function e() {
			m({
				innerWidth: window.innerWidth,
				innerHeight: window.innerHeight
			});
		}
		return window.addEventListener("resize", e), () => window.removeEventListener("resize", e);
	}, []);
	let h = t.useMemo(() => d === r?.[r.length - 1] || null, [r, d]), g = t.useMemo(() => r?.findIndex((e) => e === d) ?? null, [r, d]), _ = r && r.length > 0 && (o || o === 0) && !Number.isNaN(o) && r[o] === d || !r, v = t.useMemo(() => {
		let e = l ? {
			width: l.getBoundingClientRect().width,
			height: l.getBoundingClientRect().height
		} : typeof window < "u" ? {
			width: window.innerWidth,
			height: window.innerHeight
		} : {
			width: 0,
			height: 0
		};
		return r?.map((t) => {
			let n = typeof t == "string", r = 0;
			if (n && (r = parseInt(t, 10)), GO(c)) {
				let i = n ? r : p ? t * e.height : 0;
				return p ? c === "bottom" ? e.height - i : -e.height + i : i;
			}
			let i = n ? r : p ? t * e.width : 0;
			return p ? c === "right" ? e.width - i : -e.width + i : i;
		}) ?? [];
	}, [
		r,
		p,
		l
	]), y = t.useMemo(() => g === null ? null : v?.[g], [v, g]), b = t.useCallback((e) => {
		let t = v?.findIndex((t) => t === e) ?? null;
		s(t), UO(i.current, {
			transition: `transform ${YO.DURATION}s cubic-bezier(${YO.EASE.join(",")})`,
			transform: GO(c) ? `translate3d(0, ${e}px, 0)` : `translate3d(${e}px, 0, 0)`
		}), v && t !== v.length - 1 && o !== void 0 && t !== o && t < o ? UO(a.current, {
			transition: `opacity ${YO.DURATION}s cubic-bezier(${YO.EASE.join(",")})`,
			opacity: "0"
		}) : UO(a.current, {
			transition: `opacity ${YO.DURATION}s cubic-bezier(${YO.EASE.join(",")})`,
			opacity: "1"
		}), f(r?.[Math.max(t, 0)]);
	}, [
		i.current,
		r,
		v,
		o,
		a,
		f
	]);
	t.useEffect(() => {
		if (d || e) {
			let t = r?.findIndex((t) => t === e || t === d) ?? -1;
			v && t !== -1 && typeof v[t] == "number" && b(v[t]);
		}
	}, [
		d,
		e,
		r,
		v,
		b
	]);
	function x({ draggedDistance: e, closeDrawer: t, velocity: n, dismissible: i }) {
		if (o === void 0) return;
		let s = c === "bottom" || c === "right" ? (y ?? 0) - e : (y ?? 0) + e, l = g === o - 1, d = g === 0, f = e > 0;
		if (l && UO(a.current, { transition: `opacity ${YO.DURATION}s cubic-bezier(${YO.EASE.join(",")})` }), !u && n > 2 && !f) {
			i ? t() : b(v[0]);
			return;
		}
		if (!u && n > 2 && f && v && r) {
			b(v[r.length - 1]);
			return;
		}
		let p = v?.reduce((e, t) => typeof e != "number" || typeof t != "number" ? e : Math.abs(t - s) < Math.abs(e - s) ? t : e), m = GO(c) ? window.innerHeight : window.innerWidth;
		if (n > XO && Math.abs(e) < m * .4) {
			let e = f ? 1 : -1;
			if (e > 0 && h && r) {
				b(v[r.length - 1]);
				return;
			}
			if (d && e < 0 && i && t(), g === null) return;
			b(v[g + e]);
			return;
		}
		b(p);
	}
	function S({ draggedDistance: e }) {
		if (y === null) return;
		let t = c === "bottom" || c === "right" ? y - e : y + e;
		(c === "bottom" || c === "right") && t < v[v.length - 1] || (c === "top" || c === "left") && t > v[v.length - 1] || UO(i.current, { transform: GO(c) ? `translate3d(0, ${t}px, 0)` : `translate3d(${t}px, 0, 0)` });
	}
	function C(e, t) {
		if (!r || typeof g != "number" || !v || o === void 0) return null;
		let n = g === o - 1;
		if (g >= o && t) return 0;
		if (n && !t) return 1;
		if (!_ && !n) return null;
		let i = n ? g + 1 : g - 1, a = n ? v[i] - v[i - 1] : v[i + 1] - v[i], s = e / Math.abs(a);
		return n ? 1 - s : s;
	}
	return {
		isLastSnapPoint: h,
		activeSnapPoint: d,
		shouldFade: _,
		getPercentageDragged: C,
		setActiveSnapPoint: f,
		activeSnapPointIndex: g,
		onRelease: x,
		onDrag: S,
		snapPointsOffset: v
	};
}
function sk() {
	let { direction: e, isOpen: n, shouldScaleBackground: r, setBackgroundColorOnScale: i, noBodyStyles: a } = gO(), o = t.useRef(null), s = l(() => document.body.style.backgroundColor, []);
	function c() {
		return (window.innerWidth - tk) / window.innerWidth;
	}
	t.useEffect(() => {
		if (n && r) {
			o.current && clearTimeout(o.current);
			let t = document.querySelector("[data-vaul-drawer-wrapper]") || document.querySelector("[vaul-drawer-wrapper]");
			if (!t) return;
			i && !a && JO(document.body, { background: "black" }), JO(t, {
				transformOrigin: GO(e) ? "top" : "left",
				transitionProperty: "transform, border-radius",
				transitionDuration: `${YO.DURATION}s`,
				transitionTimingFunction: `cubic-bezier(${YO.EASE.join(",")})`
			});
			let n = JO(t, {
				borderRadius: `${$O}px`,
				overflow: "hidden",
				...GO(e) ? { transform: `scale(${c()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)` } : { transform: `scale(${c()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)` }
			});
			return () => {
				n(), o.current = window.setTimeout(() => {
					s ? document.body.style.background = s : document.body.style.removeProperty("background");
				}, YO.DURATION * 1e3);
			};
		}
	}, [
		n,
		r,
		s
	]);
}
var ck = null;
function lk({ isOpen: e, modal: n, nested: r, hasBeenOpened: i, preventScrollRestoration: a, noBodyStyles: o }) {
	let [s, c] = t.useState(() => typeof window < "u" ? window.location.href : ""), l = t.useRef(0), u = t.useCallback(() => {
		if (bO() && ck === null && e && !o) {
			ck = {
				position: document.body.style.position,
				top: document.body.style.top,
				left: document.body.style.left,
				height: document.body.style.height,
				right: "unset"
			};
			let { scrollX: e, innerHeight: t } = window;
			document.body.style.setProperty("position", "fixed", "important"), Object.assign(document.body.style, {
				top: `${-l.current}px`,
				left: `${-e}px`,
				right: "0px",
				height: "auto"
			}), window.setTimeout(() => window.requestAnimationFrame(() => {
				let e = t - window.innerHeight;
				e && l.current >= t && (document.body.style.top = `${-(l.current + e)}px`);
			}), 300);
		}
	}, [e]), d = t.useCallback(() => {
		if (bO() && ck !== null && !o) {
			let e = -parseInt(document.body.style.top, 10), t = -parseInt(document.body.style.left, 10);
			Object.assign(document.body.style, ck), window.requestAnimationFrame(() => {
				if (a && s !== window.location.href) {
					c(window.location.href);
					return;
				}
				window.scrollTo(t, e);
			}), ck = null;
		}
	}, [s]);
	return t.useEffect(() => {
		function e() {
			l.current = window.scrollY;
		}
		return e(), window.addEventListener("scroll", e), () => {
			window.removeEventListener("scroll", e);
		};
	}, []), t.useEffect(() => {
		if (n) return () => {
			typeof document > "u" || document.querySelector("[data-vaul-drawer]") || d();
		};
	}, [n, d]), t.useEffect(() => {
		r || !i || (e ? (!window.matchMedia("(display-mode: standalone)").matches && u(), n || window.setTimeout(() => {
			d();
		}, 500)) : d());
	}, [
		e,
		i,
		s,
		n,
		r,
		u,
		d
	]), { restorePositionSetting: d };
}
function uk({ open: e, onOpenChange: n, children: r, onDrag: i, onRelease: a, snapPoints: o, shouldScaleBackground: s = !1, setBackgroundColorOnScale: c = !0, closeThreshold: l = ZO, scrollLockTimeout: u = QO, dismissible: d = !0, handleOnly: f = !1, fadeFromIndex: p = o && o.length - 1, activeSnapPoint: m, setActiveSnapPoint: h, fixed: g, modal: _ = !0, onClose: v, nested: y, noBodyStyles: b = !1, direction: x = "bottom", defaultOpen: S = !1, disablePreventScroll: C = !0, snapToSequentialPoint: w = !1, preventScrollRestoration: T = !1, repositionInputs: E = !0, onAnimationEnd: D, container: O, autoFocus: k = !1 }) {
	let [A = !1, j] = ak({
		defaultProp: S,
		prop: e,
		onChange: (e) => {
			n?.(e), !e && !y && ye(), setTimeout(() => {
				D?.(e);
			}, YO.DURATION * 1e3), e && !_ && typeof window < "u" && window.requestAnimationFrame(() => {
				document.body.style.pointerEvents = "auto";
			}), e || (document.body.style.pointerEvents = "auto");
		}
	}), [M, N] = t.useState(!1), [P, F] = t.useState(!1), [I, ee] = t.useState(!1), te = t.useRef(null), ne = t.useRef(null), re = t.useRef(null), L = t.useRef(null), R = t.useRef(null), ie = t.useRef(!1), ae = t.useRef(null), z = t.useRef(0), oe = t.useRef(!1), se = t.useRef(!S), ce = t.useRef(0), B = t.useRef(null), le = t.useRef(B.current?.getBoundingClientRect().height || 0), ue = t.useRef(B.current?.getBoundingClientRect().width || 0), de = t.useRef(0), { activeSnapPoint: fe, activeSnapPointIndex: pe, setActiveSnapPoint: V, onRelease: me, snapPointsOffset: he, onDrag: ge, shouldFade: _e, getPercentageDragged: ve } = ok({
		snapPoints: o,
		activeSnapPointProp: m,
		setActiveSnapPointProp: h,
		drawerRef: B,
		fadeFromIndex: p,
		overlayRef: te,
		onSnapPointChange: t.useCallback((e) => {
			o && e === he.length - 1 && (ne.current = /* @__PURE__ */ new Date());
		}, []),
		direction: x,
		container: O,
		snapToSequentialPoint: w
	});
	NO({ isDisabled: !A || P || !_ || I || !M || !E || !C });
	let { restorePositionSetting: ye } = lk({
		isOpen: A,
		modal: _,
		nested: y ?? !1,
		hasBeenOpened: M,
		preventScrollRestoration: T,
		noBodyStyles: b
	});
	function be() {
		return (window.innerWidth - tk) / window.innerWidth;
	}
	function xe(e) {
		!d && !o || B.current && !B.current.contains(e.target) || (le.current = B.current?.getBoundingClientRect().height || 0, ue.current = B.current?.getBoundingClientRect().width || 0, F(!0), re.current = /* @__PURE__ */ new Date(), SO() && window.addEventListener("touchend", () => ie.current = !1, { once: !0 }), e.target.setPointerCapture(e.pointerId), z.current = GO(x) ? e.pageY : e.pageX);
	}
	function Se(e, t) {
		let n = e, r = window.getSelection()?.toString(), i = B.current ? KO(B.current, x) : null, a = /* @__PURE__ */ new Date();
		if (n.tagName === "SELECT" || n.hasAttribute("data-vaul-no-drag") || n.closest("[data-vaul-no-drag]")) return !1;
		if (x === "right" || x === "left") return !0;
		if (ne.current && a.getTime() - ne.current.getTime() < 500) return !1;
		if (i !== null && (x === "bottom" ? i > 0 : i < 0)) return !0;
		if (r && r.length > 0) return !1;
		if (R.current && a.getTime() - R.current.getTime() < u && i === 0 || t) return R.current = a, !1;
		for (; n;) {
			if (n.scrollHeight > n.clientHeight) {
				if (n.scrollTop !== 0) return R.current = /* @__PURE__ */ new Date(), !1;
				if (n.getAttribute("role") === "dialog") return !0;
			}
			n = n.parentNode;
		}
		return !0;
	}
	function H(e) {
		if (B.current && P) {
			let t = x === "bottom" || x === "right" ? 1 : -1, n = (z.current - (GO(x) ? e.pageY : e.pageX)) * t, r = n > 0, a = o && !d && !r;
			if (a && pe === 0) return;
			let c = Math.abs(n), l = document.querySelector("[data-vaul-drawer-wrapper]"), u = c / (x === "bottom" || x === "top" ? le.current : ue.current), f = ve(c, r);
			if (f !== null && (u = f), a && u >= 1 || !ie.current && !Se(e.target, r)) return;
			if (B.current.classList.add(nk), ie.current = !0, UO(B.current, { transition: "none" }), UO(te.current, { transition: "none" }), o && ge({ draggedDistance: n }), r && !o) {
				let e = qO(n), r = Math.min(e * -1, 0) * t;
				UO(B.current, { transform: GO(x) ? `translate3d(0, ${r}px, 0)` : `translate3d(${r}px, 0, 0)` });
				return;
			}
			let m = 1 - u;
			if ((_e || p && pe === p - 1) && (i?.(e, u), UO(te.current, {
				opacity: `${m}`,
				transition: "none"
			}, !0)), l && te.current && s) {
				let e = Math.min(be() + u * (1 - be()), 1), t = 8 - u * 8, n = Math.max(0, 14 - u * 14);
				UO(l, {
					borderRadius: `${t}px`,
					transform: GO(x) ? `scale(${e}) translate3d(0, ${n}px, 0)` : `scale(${e}) translate3d(${n}px, 0, 0)`,
					transition: "none"
				}, !0);
			}
			if (!o) {
				let e = c * t;
				UO(B.current, { transform: GO(x) ? `translate3d(0, ${e}px, 0)` : `translate3d(${e}px, 0, 0)` });
			}
		}
	}
	t.useEffect(() => {
		window.requestAnimationFrame(() => {
			se.current = !0;
		});
	}, []), t.useEffect(() => {
		var e;
		function t() {
			if (!B.current || !E) return;
			let e = document.activeElement;
			if (RO(e) || oe.current) {
				let e = window.visualViewport?.height || 0, t = window.innerHeight, n = t - e, r = B.current.getBoundingClientRect().height || 0, i = r > t * .8;
				de.current ||= r;
				let a = B.current.getBoundingClientRect().top;
				if (Math.abs(ce.current - n) > 60 && (oe.current = !oe.current), o && o.length > 0 && he && pe) {
					let e = he[pe] || 0;
					n += e;
				}
				if (ce.current = n, r > e || oe.current) {
					let t = B.current.getBoundingClientRect().height, r = t;
					t > e && (r = e - (i ? a : tk)), g ? B.current.style.height = `${t - Math.max(n, 0)}px` : B.current.style.height = `${Math.max(r, e - a)}px`;
				} else _O() || (B.current.style.height = `${de.current}px`);
				o && o.length > 0 && !oe.current ? B.current.style.bottom = "0px" : B.current.style.bottom = `${Math.max(n, 0)}px`;
			}
		}
		return (e = window.visualViewport) == null || e.addEventListener("resize", t), () => window.visualViewport?.removeEventListener("resize", t);
	}, [
		pe,
		o,
		he
	]);
	function Ce(e) {
		Te(), v?.(), e || j(!1), setTimeout(() => {
			o && V(o[0]);
		}, YO.DURATION * 1e3);
	}
	function we() {
		if (!B.current) return;
		let e = document.querySelector("[data-vaul-drawer-wrapper]"), t = KO(B.current, x);
		UO(B.current, {
			transform: "translate3d(0, 0, 0)",
			transition: `transform ${YO.DURATION}s cubic-bezier(${YO.EASE.join(",")})`
		}), UO(te.current, {
			transition: `opacity ${YO.DURATION}s cubic-bezier(${YO.EASE.join(",")})`,
			opacity: "1"
		}), s && t && t > 0 && A && UO(e, {
			borderRadius: `${$O}px`,
			overflow: "hidden",
			...GO(x) ? {
				transform: `scale(${be()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`,
				transformOrigin: "top"
			} : {
				transform: `scale(${be()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`,
				transformOrigin: "left"
			},
			transitionProperty: "transform, border-radius",
			transitionDuration: `${YO.DURATION}s`,
			transitionTimingFunction: `cubic-bezier(${YO.EASE.join(",")})`
		}, !0);
	}
	function Te() {
		!P || !B.current || (B.current.classList.remove(nk), ie.current = !1, F(!1), L.current = /* @__PURE__ */ new Date());
	}
	function Ee(e) {
		if (!P || !B.current) return;
		B.current.classList.remove(nk), ie.current = !1, F(!1), L.current = /* @__PURE__ */ new Date();
		let t = KO(B.current, x);
		if (!e || !Se(e.target, !1) || !t || Number.isNaN(t) || re.current === null) return;
		let n = L.current.getTime() - re.current.getTime(), r = z.current - (GO(x) ? e.pageY : e.pageX), i = Math.abs(r) / n;
		if (i > .05 && (ee(!0), setTimeout(() => {
			ee(!1);
		}, 200)), o) {
			me({
				draggedDistance: r * (x === "bottom" || x === "right" ? 1 : -1),
				closeDrawer: Ce,
				velocity: i,
				dismissible: d
			}), a?.(e, !0);
			return;
		}
		if (x === "bottom" || x === "right" ? r > 0 : r < 0) {
			we(), a?.(e, !0);
			return;
		}
		if (i > XO) {
			Ce(), a?.(e, !1);
			return;
		}
		let s = Math.min(B.current.getBoundingClientRect().height ?? 0, window.innerHeight), c = Math.min(B.current.getBoundingClientRect().width ?? 0, window.innerWidth);
		if (Math.abs(t) >= (x === "left" || x === "right" ? c : s) * l) {
			Ce(), a?.(e, !1);
			return;
		}
		a?.(e, !0), we();
	}
	t.useEffect(() => (A && (UO(document.documentElement, { scrollBehavior: "auto" }), ne.current = /* @__PURE__ */ new Date()), () => {
		WO(document.documentElement, "scrollBehavior");
	}), [A]);
	function De(e) {
		let t = e ? (window.innerWidth - ek) / window.innerWidth : 1, n = e ? -ek : 0;
		ae.current && window.clearTimeout(ae.current), UO(B.current, {
			transition: `transform ${YO.DURATION}s cubic-bezier(${YO.EASE.join(",")})`,
			transform: GO(x) ? `scale(${t}) translate3d(0, ${n}px, 0)` : `scale(${t}) translate3d(${n}px, 0, 0)`
		}), !e && B.current && (ae.current = setTimeout(() => {
			let e = KO(B.current, x);
			UO(B.current, {
				transition: "none",
				transform: GO(x) ? `translate3d(0, ${e}px, 0)` : `translate3d(${e}px, 0, 0)`
			});
		}, 500));
	}
	function Oe(e, t) {
		if (t < 0) return;
		let n = (window.innerWidth - ek) / window.innerWidth, r = n + t * (1 - n), i = -ek + t * ek;
		UO(B.current, {
			transform: GO(x) ? `scale(${r}) translate3d(0, ${i}px, 0)` : `scale(${r}) translate3d(${i}px, 0, 0)`,
			transition: "none"
		});
	}
	function ke(e, t) {
		let n = GO(x) ? window.innerHeight : window.innerWidth, r = t ? (n - ek) / n : 1, i = t ? -ek : 0;
		t && UO(B.current, {
			transition: `transform ${YO.DURATION}s cubic-bezier(${YO.EASE.join(",")})`,
			transform: GO(x) ? `scale(${r}) translate3d(0, ${i}px, 0)` : `scale(${r}) translate3d(${i}px, 0, 0)`
		});
	}
	return t.useEffect(() => {
		_ || window.requestAnimationFrame(() => {
			document.body.style.pointerEvents = "auto";
		});
	}, [_]), /* @__PURE__ */ t.createElement(Ya, {
		defaultOpen: S,
		onOpenChange: (e) => {
			!d && !e || (e ? N(!0) : Ce(!0), j(e));
		},
		open: A
	}, /* @__PURE__ */ t.createElement(hO.Provider, { value: {
		activeSnapPoint: fe,
		snapPoints: o,
		setActiveSnapPoint: V,
		drawerRef: B,
		overlayRef: te,
		onOpenChange: n,
		onPress: xe,
		onRelease: Ee,
		onDrag: H,
		dismissible: d,
		shouldAnimate: se,
		handleOnly: f,
		isOpen: A,
		isDragging: P,
		shouldFade: _e,
		closeDrawer: Ce,
		onNestedDrag: Oe,
		onNestedOpenChange: De,
		onNestedRelease: ke,
		keyboardIsOpen: oe,
		modal: _,
		snapPointsOffset: he,
		activeSnapPointIndex: pe,
		direction: x,
		shouldScaleBackground: s,
		setBackgroundColorOnScale: c,
		noBodyStyles: b,
		container: O,
		autoFocus: k
	} }, r));
}
var dk = /* @__PURE__ */ t.forwardRef(function({ ...e }, n) {
	let { overlayRef: r, snapPoints: i, onRelease: a, shouldFade: o, isOpen: s, modal: c, shouldAnimate: l } = gO(), u = VO(n, r), d = i && i.length > 0;
	if (!c) return null;
	let f = t.useCallback((e) => a(e), [a]);
	return /* @__PURE__ */ t.createElement(Qa, {
		onMouseUp: f,
		ref: u,
		"data-vaul-overlay": "",
		"data-vaul-snap-points": s && d ? "true" : "false",
		"data-vaul-snap-points-overlay": s && o ? "true" : "false",
		"data-vaul-animate": l?.current ? "true" : "false",
		...e
	});
});
dk.displayName = "Drawer.Overlay";
var fk = /* @__PURE__ */ t.forwardRef(function({ onPointerDownOutside: e, style: n, onOpenAutoFocus: r, ...i }, a) {
	let { drawerRef: o, onPress: s, onRelease: c, onDrag: l, keyboardIsOpen: u, snapPointsOffset: d, activeSnapPointIndex: f, modal: p, isOpen: m, direction: h, snapPoints: g, container: _, handleOnly: v, shouldAnimate: y, autoFocus: b } = gO(), [x, S] = t.useState(!1), C = VO(a, o), w = t.useRef(null), T = t.useRef(null), E = t.useRef(!1), D = g && g.length > 0;
	sk();
	let O = (e, t, n = 0) => {
		if (E.current) return !0;
		let r = Math.abs(e.y), i = Math.abs(e.x), a = i > r, o = ["bottom", "right"].includes(t) ? 1 : -1;
		if (t === "left" || t === "right") {
			if (!(e.x * o < 0) && i >= 0 && i <= n) return a;
		} else if (!(e.y * o < 0) && r >= 0 && r <= n) return !a;
		return E.current = !0, !0;
	};
	t.useEffect(() => {
		D && window.requestAnimationFrame(() => {
			S(!0);
		});
	}, []);
	function k(e) {
		w.current = null, E.current = !1, c(e);
	}
	return /* @__PURE__ */ t.createElement($a, {
		"data-vaul-drawer-direction": h,
		"data-vaul-drawer": "",
		"data-vaul-delayed-snap-points": x ? "true" : "false",
		"data-vaul-snap-points": m && D ? "true" : "false",
		"data-vaul-custom-container": _ ? "true" : "false",
		"data-vaul-animate": y?.current ? "true" : "false",
		...i,
		ref: C,
		style: d && d.length > 0 ? {
			"--snap-point-height": `${d[f ?? 0]}px`,
			...n
		} : n,
		onPointerDown: (e) => {
			v || (i.onPointerDown == null || i.onPointerDown.call(i, e), w.current = {
				x: e.pageX,
				y: e.pageY
			}, s(e));
		},
		onOpenAutoFocus: (e) => {
			r?.(e), b || e.preventDefault();
		},
		onPointerDownOutside: (t) => {
			if (e?.(t), !p || t.defaultPrevented) {
				t.preventDefault();
				return;
			}
			u.current &&= !1;
		},
		onFocusOutside: (e) => {
			if (!p) {
				e.preventDefault();
				return;
			}
		},
		onPointerMove: (e) => {
			if (T.current = e, v || (i.onPointerMove == null || i.onPointerMove.call(i, e), !w.current)) return;
			let t = e.pageY - w.current.y, n = e.pageX - w.current.x, r = e.pointerType === "touch" ? 10 : 2;
			O({
				x: n,
				y: t
			}, h, r) ? l(e) : (Math.abs(n) > r || Math.abs(t) > r) && (w.current = null);
		},
		onPointerUp: (e) => {
			i.onPointerUp == null || i.onPointerUp.call(i, e), w.current = null, E.current = !1, c(e);
		},
		onPointerOut: (e) => {
			i.onPointerOut == null || i.onPointerOut.call(i, e), k(T.current);
		},
		onContextMenu: (e) => {
			i.onContextMenu == null || i.onContextMenu.call(i, e), T.current && k(T.current);
		}
	});
});
fk.displayName = "Drawer.Content";
var pk = 250, mk = 120, hk = /* @__PURE__ */ t.forwardRef(function({ preventCycle: e = !1, children: n, ...r }, i) {
	let { closeDrawer: a, isDragging: o, snapPoints: s, activeSnapPoint: c, setActiveSnapPoint: l, dismissible: u, handleOnly: d, isOpen: f, onPress: p, onDrag: m } = gO(), h = t.useRef(null), g = t.useRef(!1);
	function _() {
		if (g.current) {
			b();
			return;
		}
		window.setTimeout(() => {
			v();
		}, mk);
	}
	function v() {
		if (o || e || g.current) {
			b();
			return;
		}
		if (b(), !s || s.length === 0) {
			u || a();
			return;
		}
		if (c === s[s.length - 1] && u) {
			a();
			return;
		}
		let t = s.findIndex((e) => e === c);
		if (t === -1) return;
		let n = s[t + 1];
		l(n);
	}
	function y() {
		h.current = window.setTimeout(() => {
			g.current = !0;
		}, pk);
	}
	function b() {
		h.current && window.clearTimeout(h.current), g.current = !1;
	}
	return /* @__PURE__ */ t.createElement("div", {
		onClick: _,
		onPointerCancel: b,
		onPointerDown: (e) => {
			d && p(e), y();
		},
		onPointerMove: (e) => {
			d && m(e);
		},
		ref: i,
		"data-vaul-drawer-visible": f ? "true" : "false",
		"data-vaul-handle": "",
		"aria-hidden": "true",
		...r
	}, /* @__PURE__ */ t.createElement("span", {
		"data-vaul-handle-hitarea": "",
		"aria-hidden": "true"
	}, n));
});
hk.displayName = "Drawer.Handle";
function gk({ onDrag: e, onOpenChange: n, open: r, ...i }) {
	let { onNestedDrag: a, onNestedOpenChange: o, onNestedRelease: s } = gO();
	if (!a) throw Error("Drawer.NestedRoot must be placed in another drawer");
	return /* @__PURE__ */ t.createElement(uk, {
		nested: !0,
		open: r,
		onClose: () => {
			o(!1);
		},
		onDrag: (t, n) => {
			a(t, n), e?.(t, n);
		},
		onOpenChange: (e) => {
			e && o(e), n?.(e);
		},
		onRelease: s,
		...i
	});
}
function _k(e) {
	let n = gO(), { container: r = n.container, ...i } = e;
	return /* @__PURE__ */ t.createElement(Za, {
		container: r,
		...i
	});
}
var vk = {
	Root: uk,
	NestedRoot: gk,
	Content: fk,
	Overlay: dk,
	Trigger: Xa,
	Portal: _k,
	Handle: hk,
	Close: no,
	Title: eo,
	Description: to
};
//#endregion
//#region src/components/ui/drawer.tsx
function yk({ ...e }) {
	return /* @__PURE__ */ h(vk.Root, {
		"data-slot": "drawer",
		...e
	});
}
function bk({ ...e }) {
	return /* @__PURE__ */ h(vk.Trigger, {
		"data-slot": "drawer-trigger",
		...e
	});
}
function xk({ ...e }) {
	return /* @__PURE__ */ h(vk.Portal, {
		"data-slot": "drawer-portal",
		...e
	});
}
function Sk({ ...e }) {
	return /* @__PURE__ */ h(vk.Close, {
		"data-slot": "drawer-close",
		...e
	});
}
function Ck({ className: e, ...t }) {
	return /* @__PURE__ */ h(vk.Overlay, {
		"data-slot": "drawer-overlay",
		className: G("fixed inset-0 z-overlay bg-surface-overlay/80 backdrop-blur-sm", "data-[state=closed]:animate-out data-[state=closed]:fade-out-0", "data-[state=open]:animate-in data-[state=open]:fade-in-0", e),
		...t
	});
}
function wk({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ g(xk, { children: [/* @__PURE__ */ h(Ck, {}), /* @__PURE__ */ g(vk.Content, {
		"data-slot": "drawer-content",
		className: G("group/drawer-content fixed z-modal flex h-auto flex-col bg-surface-raised text-content-primary", "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b data-[vaul-drawer-direction=top]:border-border-subtle", "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t data-[vaul-drawer-direction=bottom]:border-border-subtle", "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:border-border-subtle data-[vaul-drawer-direction=right]:sm:max-w-sm", "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:border-border-subtle data-[vaul-drawer-direction=left]:sm:max-w-sm", e),
		...n,
		children: [/* @__PURE__ */ h("div", { className: "mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full bg-border-strong group-data-[vaul-drawer-direction=bottom]/drawer-content:block" }), t]
	})] });
}
function Tk({ className: e, ...t }) {
	return /* @__PURE__ */ h("div", {
		"data-slot": "drawer-header",
		className: G("flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left", e),
		...t
	});
}
function Ek({ className: e, ...t }) {
	return /* @__PURE__ */ h("div", {
		"data-slot": "drawer-footer",
		className: G("mt-auto flex flex-col gap-2 p-4", e),
		...t
	});
}
function Dk({ className: e, ...t }) {
	return /* @__PURE__ */ h(vk.Title, {
		"data-slot": "drawer-title",
		className: G("text-lg font-semibold leading-none tracking-tight font-display text-content-primary", e),
		...t
	});
}
function Ok({ className: e, ...t }) {
	return /* @__PURE__ */ h(vk.Description, {
		"data-slot": "drawer-description",
		className: G("text-body-sm text-content-secondary", e),
		...t
	});
}
//#endregion
//#region src/components/ui/description-list.tsx
function kk({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ h("dl", {
		ref: t,
		className: G("grid gap-0 overflow-hidden rounded-lg border border-border-default bg-card text-card-foreground", e),
		...n
	});
}
function Ak({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ h("div", {
		ref: t,
		className: G("grid gap-1 border-b border-border-default px-4 py-3 last:border-b-0 sm:grid-cols-[12rem_1fr] sm:gap-4", e),
		...n
	});
}
function jk({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ h("dt", {
		ref: t,
		className: G("text-body-sm font-medium text-content-secondary", e),
		...n
	});
}
function Mk({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ h("dd", {
		ref: t,
		className: G("min-w-0 text-body-sm font-medium text-content-primary", e),
		...n
	});
}
//#endregion
//#region src/components/ui/file-upload.tsx
function Nk({ className: t, label: n = "Unggah berkas", description: r = "Pilih atau tarik berkas ke area ini.", error: i, multiple: a, disabled: o, onFilesChange: s, ref: c, id: l, ...u }) {
	let d = e.useId(), f = l ?? d, p = e.useRef(null), [m, _] = e.useState([]), [v, y] = e.useState(!1);
	function b(e) {
		let t = Array.from(e ?? []);
		_(t), s?.(t);
	}
	function x(e) {
		p.current = e, typeof c == "function" ? c(e) : c && (c.current = e);
	}
	return /* @__PURE__ */ g("div", {
		className: G("space-y-3", t),
		children: [
			/* @__PURE__ */ g("label", {
				htmlFor: f,
				onDragOver: (e) => {
					e.preventDefault(), o || y(!0);
				},
				onDragLeave: () => y(!1),
				onDrop: (e) => {
					e.preventDefault(), y(!1), o || b(e.dataTransfer.files);
				},
				className: G("flex min-h-36 cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border-strong bg-surface-raised px-4 py-6 text-center transition-colors duration-fast", "hover:bg-surface-sunken focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2", v && "border-primary bg-primary/5", o && "cursor-not-allowed opacity-60", i && "border-feedback-danger bg-feedback-danger-bg"),
				children: [
					/* @__PURE__ */ h("input", {
						ref: x,
						id: f,
						type: "file",
						multiple: a,
						disabled: o,
						className: "sr-only",
						onChange: (e) => b(e.target.files),
						...u
					}),
					/* @__PURE__ */ h("span", {
						className: "flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary",
						children: /* @__PURE__ */ h(Ot, {
							className: "h-5 w-5",
							"aria-hidden": "true"
						})
					}),
					/* @__PURE__ */ g("span", {
						className: "space-y-1",
						children: [/* @__PURE__ */ h("span", {
							className: "block text-body-sm font-semibold text-content-primary",
							children: n
						}), /* @__PURE__ */ h("span", {
							className: "block text-caption text-content-secondary",
							children: r
						})]
					})
				]
			}),
			m.length > 0 && /* @__PURE__ */ h("ul", {
				className: "space-y-2",
				"aria-label": "Berkas terpilih",
				children: m.map((e) => /* @__PURE__ */ g("li", {
					className: "flex items-center justify-between gap-3 rounded-md border border-border-default bg-surface-raised px-3 py-2 text-body-sm",
					children: [/* @__PURE__ */ g("span", {
						className: "flex min-w-0 items-center gap-2",
						children: [/* @__PURE__ */ h(At, {
							className: "h-4 w-4 shrink-0 text-content-secondary",
							"aria-hidden": "true"
						}), /* @__PURE__ */ h("span", {
							className: "truncate font-medium text-content-primary",
							children: e.name
						})]
					}), /* @__PURE__ */ h(qb, {
						type: "button",
						variant: "ghost",
						size: "icon-sm",
						"aria-label": `Hapus ${e.name}`,
						onClick: () => {
							let t = m.filter((t) => t !== e);
							_(t), s?.(t), p.current && (p.current.value = "");
						},
						children: /* @__PURE__ */ h(Lt, {
							className: "h-4 w-4",
							"aria-hidden": "true"
						})
					})]
				}, `${e.name}-${e.lastModified}`))
			}),
			i && /* @__PURE__ */ h("p", {
				className: "text-caption font-medium text-feedback-danger",
				children: i
			})
		]
	});
}
//#endregion
//#region node_modules/.pnpm/react-hook-form@7.75.0_react@19.2.6/node_modules/react-hook-form/dist/index.esm.mjs
var Pk = (e) => e.type === "checkbox", Fk = (e) => e instanceof Date, Ik = (e) => e == null, Lk = (e) => typeof e == "object", Rk = (e) => !Ik(e) && !Array.isArray(e) && Lk(e) && !Fk(e), zk = (e) => Rk(e) && e.target ? Pk(e.target) ? e.target.checked : e.target.value : e, Bk = (e, t) => t.split(".").some((t, n, r) => !isNaN(Number(t)) && e.has(r.slice(0, n).join("."))), Vk = (e) => {
	let t = e.constructor && e.constructor.prototype;
	return Rk(t) && t.hasOwnProperty("isPrototypeOf");
}, Hk = typeof window < "u" && window.HTMLElement !== void 0 && typeof document < "u";
function Uk(e) {
	if (e instanceof Date) return new Date(e);
	let t = typeof FileList < "u" && e instanceof FileList;
	if (Hk && (e instanceof Blob || t)) return e;
	let n = Array.isArray(e);
	if (!n && !(Rk(e) && Vk(e))) return e;
	let r = n ? [] : Object.create(Object.getPrototypeOf(e));
	for (let t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = Uk(e[t]));
	return r;
}
var Wk = (e) => /^\w*$/.test(e), Gk = (e) => e === void 0, Kk = (e) => Array.isArray(e) ? e.filter(Boolean) : [], qk = (e) => Kk(e.replace(/["|']|\]/g, "").split(/\.|\[/)), Jk = (e, t, n) => {
	if (!t || !Rk(e)) return n;
	let r = (Wk(t) ? [t] : qk(t)).reduce((e, t) => Ik(e) ? void 0 : e[t], e);
	return Gk(r) || r === e ? Gk(e[t]) ? n : e[t] : r;
}, Yk = (e) => typeof e == "boolean", Xk = (e) => typeof e == "function", Zk = (e, t, n) => {
	let r = -1, i = Wk(t) ? [t] : qk(t), a = i.length, o = a - 1;
	for (; ++r < a;) {
		let t = i[r], a = n;
		if (r !== o) {
			let n = e[t];
			a = Rk(n) || Array.isArray(n) ? n : isNaN(+i[r + 1]) ? {} : [];
		}
		if (t === "__proto__" || t === "constructor" || t === "prototype") return;
		e[t] = a, e = e[t];
	}
}, Qk = {
	BLUR: "blur",
	FOCUS_OUT: "focusout",
	CHANGE: "change",
	SUBMIT: "submit",
	TRIGGER: "trigger",
	VALID: "valid"
}, $k = {
	onBlur: "onBlur",
	onChange: "onChange",
	onSubmit: "onSubmit",
	onTouched: "onTouched",
	all: "all"
}, eA = t.createContext(null);
eA.displayName = "HookFormControlContext";
var tA = () => t.useContext(eA), nA = (e, t, n, r = !0) => {
	let i = {};
	for (let a in e) Object.defineProperty(i, a, { get: () => {
		let i = a;
		return t._proxyFormState[i] !== $k.all && (t._proxyFormState[i] = !r || $k.all), n && (n[i] = !0), e[i];
	} });
	return i;
}, rA = typeof window < "u" ? t.useLayoutEffect : t.useEffect;
function iA(e) {
	let n = tA(), { control: r = n, disabled: i, name: a, exact: o } = e || {}, [s, c] = t.useState(() => ({
		...r._formState,
		defaultValues: r._defaultValues
	})), l = t.useRef({
		isDirty: !1,
		isLoading: !1,
		dirtyFields: !1,
		touchedFields: !1,
		validatingFields: !1,
		isValidating: !1,
		isValid: !1,
		errors: !1
	});
	return rA(() => r._subscribe({
		name: a,
		formState: l.current,
		exact: o,
		callback: (e) => {
			!i && c({
				...r._formState,
				...e,
				defaultValues: r._defaultValues
			});
		}
	}), [
		a,
		i,
		o
	]), t.useEffect(() => {
		l.current.isValid && r._setValid(!0);
	}, [r]), t.useMemo(() => nA(s, r, l.current, !1), [s, r]);
}
var aA = (e) => typeof e == "string", oA = (e, t, n, r, i) => aA(e) ? (r && t.watch.add(e), Jk(n, e, i)) : Array.isArray(e) ? e.map((e) => (r && t.watch.add(e), Jk(n, e))) : (r && (t.watchAll = !0), n), sA = (e) => Ik(e) || !Lk(e);
function cA(e, t, n = /* @__PURE__ */ new WeakSet()) {
	if (e === t) return !0;
	if (sA(e) || sA(t)) return Object.is(e, t);
	if (Fk(e) && Fk(t)) return Object.is(e.getTime(), t.getTime());
	let r = Object.keys(e), i = Object.keys(t);
	if (r.length !== i.length) return !1;
	if (n.has(e) || n.has(t)) return !0;
	n.add(e), n.add(t);
	for (let i of r) {
		let r = e[i];
		if (!(i in t)) return !1;
		if (i !== "ref") {
			let e = t[i];
			if (Fk(r) && Fk(e) || (Rk(r) || Array.isArray(r)) && (Rk(e) || Array.isArray(e)) ? !cA(r, e, n) : !Object.is(r, e)) return !1;
		}
	}
	return !0;
}
function lA(e) {
	let n = tA(), { control: r = n, name: i, defaultValue: a, disabled: o, exact: s, compute: c } = e || {}, l = t.useRef(a), u = t.useRef(c), d = t.useRef(void 0), f = t.useRef(r), p = t.useRef(i);
	u.current = c;
	let [m, h] = t.useState(() => {
		let e = r._getWatch(i, l.current);
		return u.current ? u.current(e) : e;
	}), g = t.useCallback((e) => {
		let t = oA(i, r._names, e || r._formValues, !1, l.current);
		return u.current ? u.current(t) : t;
	}, [
		r._formValues,
		r._names,
		i
	]), _ = t.useCallback((e) => {
		if (!o) {
			let t = oA(i, r._names, e || r._formValues, !1, l.current);
			if (u.current) {
				let e = u.current(t);
				cA(e, d.current) || (h(e), d.current = e);
			} else h(t);
		}
	}, [
		r._formValues,
		r._names,
		o,
		i
	]);
	rA(() => ((f.current !== r || !cA(p.current, i)) && (f.current = r, p.current = i, _()), r._subscribe({
		name: i,
		formState: { values: !0 },
		exact: s,
		callback: (e) => {
			_(e.values);
		}
	})), [
		r,
		s,
		i,
		_
	]), t.useEffect(() => r._removeUnmounted());
	let v = f.current !== r, y = p.current, b = t.useMemo(() => {
		if (o) return null;
		let e = !v && !cA(y, i);
		return v || e ? g() : null;
	}, [
		o,
		v,
		i,
		y,
		g
	]);
	return b === null ? m : b;
}
function uA(e) {
	let n = tA(), { name: r, disabled: i, control: a = n, shouldUnregister: o, defaultValue: s, exact: c = !0 } = e, l = Bk(a._names.array, r), u = lA({
		control: a,
		name: r,
		defaultValue: t.useMemo(() => Jk(a._formValues, r, Jk(a._defaultValues, r, s)), [
			a,
			r,
			s
		]),
		exact: c
	}), d = iA({
		control: a,
		name: r,
		exact: c
	}), f = t.useRef(e), p = t.useRef(a.register(r, {
		...e.rules,
		value: u,
		...Yk(e.disabled) ? { disabled: e.disabled } : {}
	}));
	f.current = e;
	let m = t.useMemo(() => Object.defineProperties({}, {
		invalid: {
			enumerable: !0,
			get: () => !!Jk(d.errors, r)
		},
		isDirty: {
			enumerable: !0,
			get: () => !!Jk(d.dirtyFields, r)
		},
		isTouched: {
			enumerable: !0,
			get: () => !!Jk(d.touchedFields, r)
		},
		isValidating: {
			enumerable: !0,
			get: () => !!Jk(d.validatingFields, r)
		},
		error: {
			enumerable: !0,
			get: () => Jk(d.errors, r)
		}
	}), [d, r]), h = t.useCallback((e) => p.current.onChange({
		target: {
			value: zk(e),
			name: r
		},
		type: Qk.CHANGE
	}), [r]), g = t.useCallback(() => p.current.onBlur({
		target: {
			value: Jk(a._formValues, r),
			name: r
		},
		type: Qk.BLUR
	}), [r, a._formValues]), _ = t.useCallback((e) => {
		let t = Jk(a._fields, r);
		t && t._f && e && (t._f.ref = {
			focus: () => Xk(e.focus) && e.focus(),
			select: () => Xk(e.select) && e.select(),
			setCustomValidity: (t) => Xk(e.setCustomValidity) && e.setCustomValidity(t),
			reportValidity: () => Xk(e.reportValidity) && e.reportValidity()
		});
	}, [a._fields, r]), v = t.useMemo(() => ({
		name: r,
		value: u,
		...Yk(i) || d.disabled ? { disabled: d.disabled || i } : {},
		onChange: h,
		onBlur: g,
		ref: _
	}), [
		r,
		i,
		d.disabled,
		h,
		g,
		_,
		u
	]);
	return t.useEffect(() => {
		let e = a._options.shouldUnregister || o;
		a.register(r, {
			...f.current.rules,
			...Yk(f.current.disabled) ? { disabled: f.current.disabled } : {}
		});
		let t = (e, t) => {
			let n = Jk(a._fields, e);
			n && n._f && (n._f.mount = t);
		};
		if (t(r, !0), e) {
			let e = Uk(Jk(a._options.defaultValues, r, f.current.defaultValue));
			Zk(a._defaultValues, r, e), Gk(Jk(a._formValues, r)) && Zk(a._formValues, r, e);
		}
		return !l && a.register(r), () => {
			(l ? e && !a._state.action : e) ? a.unregister(r) : t(r, !1);
		};
	}, [
		r,
		a,
		l,
		o
	]), t.useEffect(() => {
		a._setDisabledField({
			disabled: i,
			name: r
		});
	}, [
		i,
		r,
		a
	]), t.useMemo(() => ({
		field: v,
		formState: d,
		fieldState: m
	}), [
		v,
		d,
		m
	]);
}
var dA = (e) => e.render(uA(e)), fA = t.createContext(null);
fA.displayName = "HookFormContext";
var pA = () => t.useContext(fA), mA = (e) => {
	let { children: n, watch: r, getValues: i, getFieldState: a, setError: o, clearErrors: s, setValue: c, setValues: l, trigger: u, formState: d, resetField: f, reset: p, handleSubmit: m, unregister: h, control: g, register: _, setFocus: v, subscribe: y } = e, b = t.useMemo(() => ({
		watch: r,
		getValues: i,
		getFieldState: a,
		setError: o,
		clearErrors: s,
		setValue: c,
		setValues: l,
		trigger: u,
		formState: d,
		resetField: f,
		reset: p,
		handleSubmit: m,
		unregister: h,
		control: g,
		register: _,
		setFocus: v,
		subscribe: y
	}), [
		s,
		g,
		d,
		a,
		i,
		m,
		_,
		p,
		f,
		o,
		v,
		c,
		l,
		y,
		u,
		h,
		r
	]);
	return t.createElement(fA.Provider, { value: b }, t.createElement(eA.Provider, { value: b.control }, n));
};
$k.onSubmit, $k.onChange;
//#endregion
//#region src/components/ui/label.tsx
function hA({ className: e, ...t }) {
	return /* @__PURE__ */ h(Of, {
		"data-slot": "label",
		className: G("flex items-center gap-2 text-body-sm leading-none font-medium text-content-primary select-none", "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-60", "peer-disabled:cursor-not-allowed peer-disabled:opacity-60", e),
		...t
	});
}
//#endregion
//#region src/components/ui/form.tsx
var gA = mA, _A = e.createContext({}), vA = ({ ...e }) => /* @__PURE__ */ h(_A.Provider, {
	value: { name: e.name },
	children: /* @__PURE__ */ h(dA, { ...e })
}), yA = () => {
	let t = e.useContext(_A), n = e.useContext(bA), { getFieldState: r } = pA(), i = iA({ name: t.name }), a = r(t.name, i);
	if (!t) throw Error("useFormField should be used within <FormField>");
	let { id: o } = n;
	return {
		id: o,
		name: t.name,
		formItemId: `${o}-form-item`,
		formDescriptionId: `${o}-form-item-description`,
		formMessageId: `${o}-form-item-message`,
		...a
	};
}, bA = e.createContext({});
function xA({ className: t, ...n }) {
	let r = e.useId();
	return /* @__PURE__ */ h(bA.Provider, {
		value: { id: r },
		children: /* @__PURE__ */ h("div", {
			"data-slot": "form-item",
			className: G("grid gap-2", t),
			...n
		})
	});
}
function SA({ className: e, ...t }) {
	let { error: n, formItemId: r } = yA();
	return /* @__PURE__ */ h(hA, {
		"data-slot": "form-label",
		"data-error": !!n,
		className: G("data-[error=true]:text-destructive", e),
		htmlFor: r,
		...t
	});
}
function CA({ ...e }) {
	let { error: t, formItemId: n, formDescriptionId: r, formMessageId: i } = yA();
	return /* @__PURE__ */ h(Vt, {
		"data-slot": "form-control",
		id: n,
		"aria-describedby": t ? `${r} ${i}` : `${r}`,
		"aria-invalid": !!t,
		...e
	});
}
function wA({ className: e, ...t }) {
	let { formDescriptionId: n } = yA();
	return /* @__PURE__ */ h("p", {
		"data-slot": "form-description",
		id: n,
		className: G("text-caption text-content-secondary", e),
		...t
	});
}
function TA({ className: e, ...t }) {
	let { error: n, formMessageId: r } = yA(), i = n ? String(n?.message ?? "") : t.children;
	return i ? /* @__PURE__ */ g("p", {
		"data-slot": "form-message",
		id: r,
		className: G("text-caption font-medium text-feedback-danger flex items-center gap-1", e),
		...t,
		children: [/* @__PURE__ */ h(Tt, { className: "h-3 w-3 shrink-0" }), i]
	}) : null;
}
//#endregion
//#region src/components/ui/input.tsx
function EA({ className: e, type: t, ...n }) {
	return /* @__PURE__ */ h("input", {
		type: t,
		"data-slot": "input",
		className: G("h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-body-sm shadow-xs transition-colors outline-none", "selection:bg-primary selection:text-primary-foreground", "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-body-sm file:font-medium file:text-foreground", "placeholder:text-content-tertiary", "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50", "aria-invalid:border-destructive aria-invalid:ring-destructive/20", e),
		...n
	});
}
//#endregion
//#region src/components/ui/navigation-menu.tsx
function DA({ className: e, children: t, viewport: n = !0, ...r }) {
	return /* @__PURE__ */ g(Dp, {
		"data-slot": "navigation-menu",
		"data-viewport": n,
		className: G("group/navigation-menu relative flex max-w-max flex-1 items-center justify-center", e),
		...r,
		children: [t, n && /* @__PURE__ */ h(NA, {})]
	});
}
function OA({ className: e, ...t }) {
	return /* @__PURE__ */ h(Op, {
		"data-slot": "navigation-menu-list",
		className: G("group flex flex-1 list-none items-center justify-center gap-1", e),
		...t
	});
}
function kA({ className: e, ...t }) {
	return /* @__PURE__ */ h(kp, {
		"data-slot": "navigation-menu-item",
		className: G("relative", e),
		...t
	});
}
var AA = Eb("group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-body-sm font-medium transition-[color,box-shadow] outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/50 data-[state=open]:text-accent-foreground data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent");
function jA({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ g(Ap, {
		"data-slot": "navigation-menu-trigger",
		className: G(AA(), "group", e),
		...n,
		children: [
			t,
			" ",
			/* @__PURE__ */ h(bt, {
				"aria-hidden": "true",
				className: "relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
			})
		]
	});
}
function MA({ className: e, ...t }) {
	return /* @__PURE__ */ h(Np, {
		"data-slot": "navigation-menu-content",
		className: G("top-0 left-0 w-full p-2 pr-2.5 data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out md:absolute md:w-auto", "group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:shadow-elevation-3 group-data-[viewport=false]/navigation-menu:duration-200", e),
		...t
	});
}
function NA({ className: e, ...t }) {
	return /* @__PURE__ */ h("div", {
		className: "absolute top-full left-0 isolate z-50 flex justify-center",
		children: /* @__PURE__ */ h(Pp, {
			"data-slot": "navigation-menu-viewport",
			className: G("origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border border-border-default bg-popover text-popover-foreground shadow-elevation-3 data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]", e),
			...t
		})
	});
}
function PA({ className: e, ...t }) {
	return /* @__PURE__ */ h(jp, {
		"data-slot": "navigation-menu-link",
		className: G("flex flex-col gap-1 rounded-sm p-2 text-body-sm transition-all outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground", e),
		...t
	});
}
function FA({ className: e, ...t }) {
	return /* @__PURE__ */ h(Mp, {
		"data-slot": "navigation-menu-indicator",
		className: G("top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:animate-in data-[state=visible]:fade-in", e),
		...t,
		children: /* @__PURE__ */ h("div", { className: "relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border-default shadow-elevation-2" })
	});
}
//#endregion
//#region src/components/ui/pagination.tsx
function IA({ className: e, ...t }) {
	return /* @__PURE__ */ h("nav", {
		role: "navigation",
		"aria-label": "pagination",
		"data-slot": "pagination",
		className: G("mx-auto flex w-full justify-center", e),
		...t
	});
}
function LA({ className: e, ...t }) {
	return /* @__PURE__ */ h("ul", {
		"data-slot": "pagination-content",
		className: G("flex flex-row items-center gap-1", e),
		...t
	});
}
function RA({ ...e }) {
	return /* @__PURE__ */ h("li", {
		"data-slot": "pagination-item",
		...e
	});
}
function zA({ className: e, isActive: t, size: n = "icon", ...r }) {
	return /* @__PURE__ */ h("a", {
		"aria-current": t ? "page" : void 0,
		"data-slot": "pagination-link",
		"data-active": t,
		className: G(Kb({
			variant: t ? "outline" : "ghost",
			size: n
		}), e),
		...r
	});
}
function BA({ className: e, ...t }) {
	return /* @__PURE__ */ g(zA, {
		"aria-label": "Halaman sebelumnya",
		size: "default",
		className: G("gap-1 px-2.5 sm:pl-2.5", e),
		...t,
		children: [/* @__PURE__ */ h(xt, { className: "size-4" }), /* @__PURE__ */ h("span", {
			className: "hidden sm:block",
			children: "Sebelumnya"
		})]
	});
}
function VA({ className: e, ...t }) {
	return /* @__PURE__ */ g(zA, {
		"aria-label": "Halaman berikutnya",
		size: "default",
		className: G("gap-1 px-2.5 sm:pr-2.5", e),
		...t,
		children: [/* @__PURE__ */ h("span", {
			className: "hidden sm:block",
			children: "Berikutnya"
		}), /* @__PURE__ */ h(St, { className: "size-4" })]
	});
}
function HA({ className: e, ...t }) {
	return /* @__PURE__ */ g("span", {
		"aria-hidden": !0,
		"data-slot": "pagination-ellipsis",
		className: G("flex size-9 items-center justify-center", e),
		...t,
		children: [/* @__PURE__ */ h(kt, { className: "size-4" }), /* @__PURE__ */ h("span", {
			className: "sr-only",
			children: "Halaman lainnya"
		})]
	});
}
//#endregion
//#region src/components/ui/popover.tsx
function UA({ ...e }) {
	return /* @__PURE__ */ h(cm, {
		"data-slot": "popover",
		...e
	});
}
function WA({ ...e }) {
	return /* @__PURE__ */ h(lm, {
		"data-slot": "popover-trigger",
		...e
	});
}
function GA({ className: e, align: t = "center", sideOffset: n = 4, ...r }) {
	return /* @__PURE__ */ h(um, { children: /* @__PURE__ */ h(dm, {
		"data-slot": "popover-content",
		align: t,
		sideOffset: n,
		className: G("z-popover w-72 origin-(--radix-popover-content-transform-origin) rounded-md border border-border-default bg-popover p-4 text-popover-foreground shadow-elevation-4 outline-hidden", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", e),
		...r
	}) });
}
//#endregion
//#region src/components/ui/progress.tsx
var KA = Eb("relative w-full overflow-hidden rounded-full bg-border-subtle", {
	variants: { size: {
		sm: "h-1",
		default: "h-2",
		lg: "h-3"
	} },
	defaultVariants: { size: "default" }
}), qA = Eb("h-full w-full flex-1 transition-all duration-slow ease-out", {
	variants: { intent: {
		default: "bg-primary",
		success: "bg-feedback-success",
		warning: "bg-feedback-warning",
		danger: "bg-feedback-danger"
	} },
	defaultVariants: { intent: "default" }
});
function JA({ className: e, value: t, size: n, intent: r, ...i }) {
	return /* @__PURE__ */ h(Om, {
		"data-slot": "progress",
		className: G(KA({ size: n }), e),
		...i,
		children: /* @__PURE__ */ h(km, {
			"data-slot": "progress-indicator",
			className: G(qA({ intent: r })),
			style: { transform: `translateX(-${100 - (t ?? 0)}%)` }
		})
	});
}
//#endregion
//#region src/components/ui/radio-group.tsx
function YA({ className: e, ...t }) {
	return /* @__PURE__ */ h(eh, {
		"data-slot": "radio-group",
		className: G("grid gap-2", e),
		...t
	});
}
function XA({ className: e, ...t }) {
	return /* @__PURE__ */ h(th, {
		"data-slot": "radio-group-item",
		className: G("aspect-square h-4 w-4 rounded-full border border-border-strong shadow-xs", "bg-surface-raised ring-offset-background", "transition-colors duration-fast outline-none", "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", "disabled:cursor-not-allowed disabled:opacity-50", "aria-invalid:border-destructive aria-invalid:ring-destructive/20", "data-[state=checked]:border-primary data-[state=checked]:text-primary", e),
		...t,
		children: /* @__PURE__ */ h(nh, {
			"data-slot": "radio-group-indicator",
			className: "flex items-center justify-center",
			children: /* @__PURE__ */ h(Dt, { className: "h-2 w-2 fill-current text-primary" })
		})
	});
}
//#endregion
//#region src/components/ui/scroll-area.tsx
function ZA({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ g(zh, {
		"data-slot": "scroll-area",
		className: G("relative", e),
		...n,
		children: [
			/* @__PURE__ */ h(Bh, {
				"data-slot": "scroll-area-viewport",
				className: "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1",
				children: t
			}),
			/* @__PURE__ */ h(QA, {}),
			/* @__PURE__ */ h(Vh, {})
		]
	});
}
function QA({ className: e, orientation: t = "vertical", ...n }) {
	return /* @__PURE__ */ h(ph, {
		"data-slot": "scroll-area-scrollbar",
		orientation: t,
		className: G("flex touch-none p-px transition-colors select-none", t === "vertical" && "h-full w-2.5 border-l border-l-transparent", t === "horizontal" && "h-2.5 flex-col border-t border-t-transparent", e),
		...n,
		children: /* @__PURE__ */ h(wh, {
			"data-slot": "scroll-area-thumb",
			className: "relative flex-1 rounded-full bg-border-strong"
		})
	});
}
//#endregion
//#region src/components/ui/select.tsx
function $A({ ...e }) {
	return /* @__PURE__ */ h(t_, {
		"data-slot": "select",
		...e
	});
}
function ej({ ...e }) {
	return /* @__PURE__ */ h(c_, {
		"data-slot": "select-group",
		...e
	});
}
function tj({ ...e }) {
	return /* @__PURE__ */ h(r_, {
		"data-slot": "select-value",
		...e
	});
}
function nj({ className: e, size: t = "default", children: n, ...r }) {
	return /* @__PURE__ */ g(n_, {
		"data-slot": "select-trigger",
		"data-size": t,
		className: G("flex w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-body-sm whitespace-nowrap shadow-xs transition-colors outline-none", "placeholder:text-content-tertiary data-[placeholder]:text-content-tertiary", "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", "disabled:cursor-not-allowed disabled:opacity-50", "aria-invalid:border-destructive aria-invalid:ring-destructive/20", "data-[size=default]:h-9 data-[size=sm]:h-8", "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2", "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4 [&_svg:not([class*=text-])]:text-content-tertiary", e),
		...r,
		children: [n, /* @__PURE__ */ h(i_, {
			asChild: !0,
			children: /* @__PURE__ */ h(bt, { className: "size-4 opacity-50" })
		})]
	});
}
function rj({ className: e, children: t, position: n = "popper", align: r = "start", ...i }) {
	return /* @__PURE__ */ h(a_, { children: /* @__PURE__ */ g(o_, {
		"data-slot": "select-content",
		className: G("relative z-popover max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border border-border-default bg-popover text-popover-foreground shadow-elevation-4", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", n === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", e),
		position: n,
		align: r,
		...i,
		children: [
			/* @__PURE__ */ h(sj, {}),
			/* @__PURE__ */ h(s_, {
				className: G("p-1", n === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"),
				children: t
			}),
			/* @__PURE__ */ h(cj, {})
		]
	}) });
}
function ij({ className: e, ...t }) {
	return /* @__PURE__ */ h(l_, {
		"data-slot": "select-label",
		className: G("px-2 py-1.5 text-caption text-content-tertiary", e),
		...t
	});
}
function aj({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ g(u_, {
		"data-slot": "select-item",
		className: G("relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-body-sm outline-hidden select-none", "focus:bg-accent focus:text-accent-foreground", "data-[disabled]:pointer-events-none data-[disabled]:opacity-50", "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4 [&_svg:not([class*=text-])]:text-content-tertiary", e),
		...n,
		children: [/* @__PURE__ */ h("span", {
			"data-slot": "select-item-indicator",
			className: "absolute right-2 flex size-3.5 items-center justify-center",
			children: /* @__PURE__ */ h(f_, { children: /* @__PURE__ */ h(yt, { className: "size-4" }) })
		}), /* @__PURE__ */ h(d_, { children: t })]
	});
}
function oj({ className: e, ...t }) {
	return /* @__PURE__ */ h(h_, {
		"data-slot": "select-separator",
		className: G("pointer-events-none -mx-1 my-1 h-px bg-border-subtle", e),
		...t
	});
}
function sj({ className: e, ...t }) {
	return /* @__PURE__ */ h(p_, {
		"data-slot": "select-scroll-up-button",
		className: G("flex cursor-default items-center justify-center py-1", e),
		...t,
		children: /* @__PURE__ */ h(Ct, { className: "size-4" })
	});
}
function cj({ className: e, ...t }) {
	return /* @__PURE__ */ h(m_, {
		"data-slot": "select-scroll-down-button",
		className: G("flex cursor-default items-center justify-center py-1", e),
		...t,
		children: /* @__PURE__ */ h(bt, { className: "size-4" })
	});
}
//#endregion
//#region src/components/ui/separator.tsx
function lj({ className: e, orientation: t = "horizontal", decorative: n = !0, ...r }) {
	return /* @__PURE__ */ h(x_, {
		"data-slot": "separator",
		decorative: n,
		orientation: t,
		className: G("shrink-0 bg-border-subtle data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px", e),
		...r
	});
}
//#endregion
//#region src/components/ui/sheet.tsx
function uj({ ...e }) {
	return /* @__PURE__ */ h(Ya, {
		"data-slot": "sheet",
		...e
	});
}
function dj({ ...e }) {
	return /* @__PURE__ */ h(Xa, {
		"data-slot": "sheet-trigger",
		...e
	});
}
function fj({ ...e }) {
	return /* @__PURE__ */ h(no, {
		"data-slot": "sheet-close",
		...e
	});
}
function pj({ ...e }) {
	return /* @__PURE__ */ h(Za, {
		"data-slot": "sheet-portal",
		...e
	});
}
function mj({ className: e, ...t }) {
	return /* @__PURE__ */ h(Qa, {
		"data-slot": "sheet-overlay",
		className: G("fixed inset-0 z-50 bg-surface-overlay/80", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", e),
		...t
	});
}
function hj({ className: e, children: t, side: n = "right", showCloseButton: r = !0, ...i }) {
	return /* @__PURE__ */ g(pj, { children: [/* @__PURE__ */ h(mj, {}), /* @__PURE__ */ g($a, {
		"data-slot": "sheet-content",
		className: G("fixed z-50 flex flex-col gap-4 bg-background shadow-elevation-5 transition ease-in-out", "data-[state=closed]:animate-out data-[state=closed]:duration-300", "data-[state=open]:animate-in data-[state=open]:duration-500", n === "right" && "inset-y-0 right-0 h-full w-3/4 border-l border-border-default data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm", n === "left" && "inset-y-0 left-0 h-full w-3/4 border-r border-border-default data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm", n === "top" && "inset-x-0 top-0 h-auto border-b border-border-default data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top", n === "bottom" && "inset-x-0 bottom-0 h-auto border-t border-border-default data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom", e),
		...i,
		children: [t, r && /* @__PURE__ */ g(no, {
			className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-secondary",
			children: [/* @__PURE__ */ h(Lt, { className: "size-4" }), /* @__PURE__ */ h("span", {
				className: "sr-only",
				children: "Tutup"
			})]
		})]
	})] });
}
function gj({ className: e, ...t }) {
	return /* @__PURE__ */ h("div", {
		"data-slot": "sheet-header",
		className: G("flex flex-col gap-1.5 p-4", e),
		...t
	});
}
function _j({ className: e, ...t }) {
	return /* @__PURE__ */ h("div", {
		"data-slot": "sheet-footer",
		className: G("mt-auto flex flex-col gap-2 p-4", e),
		...t
	});
}
function vj({ className: e, ...t }) {
	return /* @__PURE__ */ h(eo, {
		"data-slot": "sheet-title",
		className: G("font-semibold text-foreground", e),
		...t
	});
}
function yj({ className: e, ...t }) {
	return /* @__PURE__ */ h(to, {
		"data-slot": "sheet-description",
		className: G("text-sm text-muted-foreground", e),
		...t
	});
}
//#endregion
//#region src/components/ui/skeleton.tsx
function bj({ className: e, ...t }) {
	return /* @__PURE__ */ h("div", {
		"data-slot": "skeleton",
		"aria-busy": "true",
		"aria-label": "Memuat...",
		className: G("animate-shimmer rounded-md bg-border-subtle", e),
		style: {
			backgroundImage: "linear-gradient(90deg, hsl(var(--warm-200-hsl)) 25%, hsl(var(--warm-100-hsl)) 50%, hsl(var(--warm-200-hsl)) 75%)",
			backgroundSize: "1000px 100%"
		},
		...t
	});
}
//#endregion
//#region src/components/ui/slider.tsx
function xj({ className: t, defaultValue: n, value: r, min: i = 0, max: a = 100, ...o }) {
	let s = e.useMemo(() => Array.isArray(r) ? r : Array.isArray(n) ? n : [i], [
		r,
		n,
		i
	]);
	return /* @__PURE__ */ g(iv, {
		"data-slot": "slider",
		defaultValue: n,
		value: r,
		min: i,
		max: a,
		className: G("relative flex w-full touch-none items-center select-none", "data-[disabled]:opacity-50", "data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col", t),
		...o,
		children: [/* @__PURE__ */ h(av, {
			"data-slot": "slider-track",
			className: "relative grow overflow-hidden rounded-full bg-border-default data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
			children: /* @__PURE__ */ h(ov, {
				"data-slot": "slider-range",
				className: "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
			})
		}), s.map((e, t) => /* @__PURE__ */ h(sv, {
			"data-slot": "slider-thumb",
			className: G("block h-4 w-4 shrink-0 rounded-full border border-primary/50 bg-surface-raised shadow-elevation-2", "ring-offset-background transition-all duration-fast", "hover:shadow-elevation-3 hover:scale-110", "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", "disabled:pointer-events-none disabled:opacity-50")
		}, t))]
	});
}
//#endregion
//#region src/components/ui/spinner.tsx
var Sj = Eb("animate-spin rounded-full border-current", {
	variants: { size: {
		xs: "h-3 w-3 border-[1.5px]",
		sm: "h-4 w-4 border-2",
		default: "h-5 w-5 border-2",
		lg: "h-6 w-6 border-[2.5px]",
		xl: "h-8 w-8 border-[3px]"
	} },
	defaultVariants: { size: "default" }
});
function Cj({ size: e, className: t, label: n = "Loading..." }) {
	return /* @__PURE__ */ h("div", {
		role: "status",
		"aria-label": n,
		className: G(Sj({ size: e }), "border-t-transparent", t)
	});
}
//#endregion
//#region src/components/ui/status-badge.tsx
var wj = Eb("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground",
		secondary: "border-transparent bg-secondary text-secondary-foreground",
		destructive: "border-transparent bg-destructive text-destructive-foreground",
		outline: "text-foreground",
		draft: "border-transparent bg-muted text-muted-foreground",
		pending: "border-transparent bg-warning-bg text-warning",
		revised: "border-transparent bg-info-bg text-info",
		approved: "border-transparent bg-success-bg text-success"
	} },
	defaultVariants: { variant: "default" }
});
function Tj({ className: e, variant: t, ...n }) {
	return /* @__PURE__ */ h("div", {
		className: G(wj({ variant: t }), e),
		...n
	});
}
//#endregion
//#region src/components/ui/switch.tsx
function Ej({ className: e, ...t }) {
	return /* @__PURE__ */ h(yv, {
		"data-slot": "switch",
		className: G("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent", "bg-border-strong transition-colors duration-base ease-out", "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background", "disabled:cursor-not-allowed disabled:opacity-50", "data-[state=checked]:bg-primary", e),
		...t,
		children: /* @__PURE__ */ h(bv, {
			"data-slot": "switch-thumb",
			className: G("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-elevation-1", "ring-0 transition-transform duration-base ease-spring", "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0")
		})
	});
}
//#endregion
//#region src/components/ui/table.tsx
function Dj({ className: e, ...t }) {
	return /* @__PURE__ */ h("div", {
		"data-slot": "table-container",
		className: "relative w-full overflow-x-auto",
		children: /* @__PURE__ */ h("table", {
			"data-slot": "table",
			className: G("w-full caption-bottom text-body-sm", e),
			...t
		})
	});
}
function Oj({ className: e, ...t }) {
	return /* @__PURE__ */ h("thead", {
		"data-slot": "table-header",
		className: G("[&_tr]:border-b [&_tr]:border-border-subtle", e),
		...t
	});
}
function kj({ className: e, ...t }) {
	return /* @__PURE__ */ h("tbody", {
		"data-slot": "table-body",
		className: G("[&_tr:last-child]:border-0", e),
		...t
	});
}
function Aj({ className: e, ...t }) {
	return /* @__PURE__ */ h("tfoot", {
		"data-slot": "table-footer",
		className: G("border-t border-border-subtle bg-muted/50 font-medium [&>tr]:last:border-b-0", e),
		...t
	});
}
function jj({ className: e, ...t }) {
	return /* @__PURE__ */ h("tr", {
		"data-slot": "table-row",
		className: G("border-b border-border-subtle transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted", e),
		...t
	});
}
function Mj({ className: e, ...t }) {
	return /* @__PURE__ */ h("th", {
		"data-slot": "table-head",
		className: G("h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-content-secondary [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", e),
		...t
	});
}
function Nj({ className: e, ...t }) {
	return /* @__PURE__ */ h("td", {
		"data-slot": "table-cell",
		className: G("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", e),
		...t
	});
}
function Pj({ className: e, ...t }) {
	return /* @__PURE__ */ h("caption", {
		"data-slot": "table-caption",
		className: G("mt-4 text-body-sm text-content-secondary", e),
		...t
	});
}
//#endregion
//#region src/components/ui/tabs.tsx
function Fj({ className: e, ...t }) {
	return /* @__PURE__ */ h(Iv, {
		"data-slot": "tabs",
		className: e,
		...t
	});
}
function Ij({ className: e, ...t }) {
	return /* @__PURE__ */ h(Lv, {
		"data-slot": "tabs-list",
		className: G("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", e),
		...t
	});
}
function Lj({ className: e, ...t }) {
	return /* @__PURE__ */ h(Rv, {
		"data-slot": "tabs-trigger",
		className: G("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-body-sm font-medium", "ring-offset-background transition-all outline-none", "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", "disabled:pointer-events-none disabled:opacity-50", "data-[state=active]:bg-background data-[state=active]:text-content-primary data-[state=active]:shadow-sm", e),
		...t
	});
}
function Rj({ className: e, ...t }) {
	return /* @__PURE__ */ h(zv, {
		"data-slot": "tabs-content",
		className: G("mt-2 ring-offset-background outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", e),
		...t
	});
}
//#endregion
//#region src/components/ui/textarea.tsx
function zj({ className: e, ...t }) {
	return /* @__PURE__ */ h("textarea", {
		"data-slot": "textarea",
		className: G("field-sizing-content flex min-h-[80px] w-full rounded-md border border-input bg-transparent", "px-3 py-2 text-body-sm text-content-primary shadow-xs transition-colors outline-none", "placeholder:text-content-tertiary", "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-sunken", "read-only:bg-surface-sunken read-only:text-content-secondary", "aria-invalid:border-destructive aria-invalid:ring-destructive/20", "resize-y", e),
		...t
	});
}
//#endregion
//#region src/components/ui/toggle.tsx
var Bj = Eb([
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium",
	"transition-colors duration-fast ease-out outline-none",
	"focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
	"disabled:pointer-events-none disabled:opacity-50",
	"data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
	"data-[state=off]:text-content-primary data-[state=off]:hover:bg-surface-sunken",
	"[&_svg]:pointer-events-none [&_svg]:shrink-0"
].join(" "), {
	variants: {
		variant: {
			default: "bg-transparent",
			outline: "border border-border-default bg-surface-raised",
			ghost: "bg-transparent"
		},
		size: {
			sm: "h-8 px-2.5 text-body-sm [&_svg]:size-3.5",
			default: "h-9 px-3 text-body-sm [&_svg]:size-4",
			lg: "h-10 px-4 text-body [&_svg]:size-5",
			icon: "h-9 w-9 px-0 [&_svg]:size-4"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Vj({ className: t, variant: n, size: r, pressed: i, defaultPressed: a = !1, onPressedChange: o, onClick: s, disabled: c, ...l }) {
	let [u, d] = e.useState(a), f = i ?? u;
	function p(e) {
		if (!c) {
			let e = !f;
			i === void 0 && d(e), o?.(e);
		}
		s?.(e);
	}
	return /* @__PURE__ */ h("button", {
		type: "button",
		"data-slot": "toggle",
		"data-state": f ? "on" : "off",
		disabled: c,
		"aria-pressed": f,
		className: G(Bj({
			variant: n,
			size: r
		}), t),
		onClick: p,
		...l
	});
}
//#endregion
//#region src/components/ui/toggle-group.tsx
var Hj = e.createContext(null);
function Uj(e) {
	return Array.isArray(e) ? e : e ? [e] : [];
}
function Wj({ className: t, type: n = "single", value: r, defaultValue: i, disabled: a, variant: o = "outline", size: s = "default", onValueChange: c, children: l, ...u }) {
	let [d, f] = e.useState(Uj(i)), p = r === void 0 ? d : Uj(r), m = e.useCallback((e) => {
		let t = n === "single" ? p.includes(e) ? [] : [e] : p.includes(e) ? p.filter((t) => t !== e) : [...p, e];
		r === void 0 && f(t), c?.(n === "single" ? t[0] ?? "" : t);
	}, [
		c,
		p,
		n,
		r
	]), g = e.useMemo(() => ({
		type: n,
		value: p,
		disabled: a,
		variant: o,
		size: s,
		toggleValue: m
	}), [
		a,
		p,
		s,
		m,
		n,
		o
	]);
	return /* @__PURE__ */ h(Hj.Provider, {
		value: g,
		children: /* @__PURE__ */ h("div", {
			"data-slot": "toggle-group",
			role: n === "single" ? "radiogroup" : "group",
			className: G("inline-flex items-center rounded-md border border-border-default bg-surface-raised p-0.5", t),
			...u,
			children: l
		})
	});
}
function Gj({ className: t, value: n, disabled: r, variant: i, size: a, onClick: o, ...s }) {
	let c = e.useContext(Hj), l = c?.value.includes(n) ?? !1, u = r || c?.disabled;
	function d(e) {
		u || c?.toggleValue(n), o?.(e);
	}
	return /* @__PURE__ */ h(Vj, {
		"data-slot": "toggle-group-item",
		role: c?.type === "single" ? "radio" : void 0,
		"aria-checked": c?.type === "single" ? l : void 0,
		pressed: l,
		disabled: u,
		variant: i ?? c?.variant,
		size: a ?? c?.size,
		className: G("border-0 shadow-none", t),
		onClick: d,
		...s
	});
}
//#endregion
//#region src/components/ui/toast.tsx
function Kj({ ...e }) {
	return /* @__PURE__ */ h(Oy, {
		"data-slot": "toast-provider",
		...e
	});
}
function qj({ className: e, ...t }) {
	return /* @__PURE__ */ h(ky, {
		"data-slot": "toast-viewport",
		className: G("fixed top-0 z-toast flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]", e),
		...t
	});
}
var Jj = Eb("group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-elevation-4 transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full", {
	variants: { variant: {
		default: "border-border-default bg-background text-foreground",
		destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Yj({ className: e, variant: t, ...n }) {
	return /* @__PURE__ */ h(Ay, {
		"data-slot": "toast",
		className: G(Jj({ variant: t }), e),
		...n
	});
}
function Xj({ className: e, ...t }) {
	return /* @__PURE__ */ h(Ny, {
		"data-slot": "toast-action",
		className: G("inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-border-default bg-transparent px-3 text-body-sm font-medium transition-colors hover:bg-secondary focus:outline-hidden focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive", e),
		...t
	});
}
function Zj({ className: e, ...t }) {
	return /* @__PURE__ */ h(Py, {
		"data-slot": "toast-close",
		"toast-close": "",
		className: G("absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-hidden focus:ring-1 group-hover:opacity-100", e),
		...t,
		children: /* @__PURE__ */ h(Lt, { className: "h-4 w-4" })
	});
}
function Qj({ className: e, ...t }) {
	return /* @__PURE__ */ h(jy, {
		"data-slot": "toast-title",
		className: G("text-body-sm font-semibold [&+div]:text-caption", e),
		...t
	});
}
function $j({ className: e, ...t }) {
	return /* @__PURE__ */ h(My, {
		"data-slot": "toast-description",
		className: G("text-body-sm opacity-90", e),
		...t
	});
}
//#endregion
//#region src/hooks/use-toast.ts
var eM = 1, tM = 1e6, nM = 0;
function rM() {
	return nM = (nM + 1) % (2 ** 53 - 1), nM.toString();
}
var iM = /* @__PURE__ */ new Map(), aM = (e) => {
	if (iM.has(e)) return;
	let t = setTimeout(() => {
		iM.delete(e), lM({
			type: "REMOVE_TOAST",
			toastId: e
		});
	}, tM);
	iM.set(e, t);
}, oM = (e, t) => {
	switch (t.type) {
		case "ADD_TOAST": return {
			...e,
			toasts: [t.toast, ...e.toasts].slice(0, eM)
		};
		case "UPDATE_TOAST": return {
			...e,
			toasts: e.toasts.map((e) => e.id === t.toast.id ? {
				...e,
				...t.toast
			} : e)
		};
		case "DISMISS_TOAST": {
			let { toastId: n } = t;
			return n ? aM(n) : e.toasts.forEach((e) => {
				aM(e.id);
			}), {
				...e,
				toasts: e.toasts.map((e) => e.id === n || n === void 0 ? {
					...e,
					open: !1
				} : e)
			};
		}
		case "REMOVE_TOAST": return t.toastId === void 0 ? {
			...e,
			toasts: []
		} : {
			...e,
			toasts: e.toasts.filter((e) => e.id !== t.toastId)
		};
	}
}, sM = [], cM = { toasts: [] };
function lM(e) {
	cM = oM(cM, e), sM.forEach((e) => {
		e(cM);
	});
}
function uM({ ...e }) {
	let t = rM(), n = (e) => lM({
		type: "UPDATE_TOAST",
		toast: {
			...e,
			id: t
		}
	}), r = () => lM({
		type: "DISMISS_TOAST",
		toastId: t
	});
	return lM({
		type: "ADD_TOAST",
		toast: {
			...e,
			id: t,
			open: !0,
			onOpenChange: (e) => {
				e || r();
			}
		}
	}), {
		id: t,
		dismiss: r,
		update: n
	};
}
function dM() {
	let [t, n] = e.useState(cM);
	return e.useEffect(() => (sM.push(n), () => {
		let e = sM.indexOf(n);
		e > -1 && sM.splice(e, 1);
	}), [t]), {
		...t,
		toast: uM,
		dismiss: (e) => lM({
			type: "DISMISS_TOAST",
			toastId: e
		})
	};
}
//#endregion
//#region src/components/ui/toaster.tsx
function fM() {
	let { toasts: e } = dM();
	return /* @__PURE__ */ g(Kj, { children: [e.map(function({ id: e, title: t, description: n, action: r, ...i }) {
		return /* @__PURE__ */ g(Yj, {
			...i,
			children: [
				/* @__PURE__ */ g("div", {
					className: "grid gap-1",
					children: [t && /* @__PURE__ */ h(Qj, { children: t }), n && /* @__PURE__ */ h($j, { children: n })]
				}),
				r,
				/* @__PURE__ */ h(Zj, {})
			]
		}, e);
	}), /* @__PURE__ */ h(qj, {})] });
}
//#endregion
//#region src/components/ui/tooltip.tsx
function pM({ delayDuration: e = 0, ...t }) {
	return /* @__PURE__ */ h(hb, {
		"data-slot": "tooltip-provider",
		delayDuration: e,
		...t
	});
}
function mM({ ...e }) {
	return /* @__PURE__ */ h(gb, {
		"data-slot": "tooltip",
		...e
	});
}
function hM({ ...e }) {
	return /* @__PURE__ */ h(_b, {
		"data-slot": "tooltip-trigger",
		...e
	});
}
function gM({ className: e, sideOffset: t = 4, children: n, ...r }) {
	return /* @__PURE__ */ h(vb, { children: /* @__PURE__ */ h(yb, {
		"data-slot": "tooltip-content",
		sideOffset: t,
		className: G("z-toast w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md bg-popover px-3 py-1.5", "text-popover-foreground text-caption shadow-elevation-4 max-w-xs", "animate-in fade-in-0 zoom-in-95", "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95", "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", e),
		...r,
		children: n
	}) });
}
//#endregion
//#region src/components/ui/combobox.tsx
function _M({ options: t, value: n, onChange: r, placeholder: i = "Pilih item...", searchPlaceholder: a = "Cari...", emptyText: o = "Tidak ditemukan.", className: s, disabled: c = !1 }) {
	let [l, u] = e.useState(!1), [d, f] = e.useState(n || ""), p = n === void 0 ? d : n;
	return /* @__PURE__ */ g(UA, {
		open: l,
		onOpenChange: u,
		children: [/* @__PURE__ */ h(WA, {
			asChild: !0,
			children: /* @__PURE__ */ g(qb, {
				variant: "outline",
				role: "combobox",
				"aria-expanded": l,
				disabled: c,
				className: G("w-full justify-between bg-background border-border text-foreground font-medium hover:bg-muted hover:border-border-strong transition-all shadow-sm", !p && "text-muted-foreground font-normal", s),
				children: [/* @__PURE__ */ h("span", {
					className: "truncate",
					children: p ? t.find((e) => e.value === p)?.label : i
				}), /* @__PURE__ */ h(wt, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })]
			})
		}), /* @__PURE__ */ h(GA, {
			className: "w-[var(--radix-popover-trigger-width)] p-0 border-border shadow-lg animate-in fade-in zoom-in-95 duration-200",
			children: /* @__PURE__ */ g(WD, {
				className: "bg-background",
				children: [/* @__PURE__ */ h(KD, {
					placeholder: a,
					className: "h-11"
				}), /* @__PURE__ */ g(qD, {
					className: "max-h-[300px]",
					children: [/* @__PURE__ */ h(JD, {
						className: "py-6 text-center text-sm text-muted-foreground italic",
						children: o
					}), /* @__PURE__ */ h(YD, { children: t.map((e) => /* @__PURE__ */ h(ZD, {
						value: e.label,
						onSelect: () => {
							let t = e.value === p ? "" : e.value;
							n === void 0 && f(t), r?.(t), u(!1);
						},
						className: G("flex items-center justify-between px-3 py-2 cursor-pointer transition-colors", p === e.value ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted"),
						children: /* @__PURE__ */ g("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ h(yt, { className: G("h-4 w-4", p === e.value ? "opacity-100" : "opacity-0") }), e.label]
						})
					}, e.value)) })]
				})]
			})
		})]
	});
}
//#endregion
//#region src/components/ui/app-topbar.tsx
function vM({ appTitle: e }) {
	return /* @__PURE__ */ g("header", {
		className: "flex items-center justify-between gap-4 rounded-lg border bg-card p-3",
		children: [/* @__PURE__ */ h("p", {
			className: "text-sm font-semibold text-foreground",
			children: e
		}), /* @__PURE__ */ g("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ h(EA, {
					placeholder: "Cari menu atau dokumen...",
					className: "w-64"
				}),
				/* @__PURE__ */ h(qb, {
					variant: "ghost",
					size: "icon",
					"aria-label": "Notifikasi",
					children: /* @__PURE__ */ h(_t, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ g(qb, {
					variant: "outline",
					size: "sm",
					className: "gap-2",
					children: [/* @__PURE__ */ h(It, { className: "h-4 w-4" }), "Admin"]
				})
			]
		})]
	});
}
//#endregion
//#region src/components/ui/confirm-action-dialog.tsx
function yM({ triggerLabel: t, title: n, description: r, confirmLabel: i, reasonRequired: a = !1, onConfirm: o }) {
	let [s, c] = e.useState(!1), [l, u] = e.useState(""), [d, f] = e.useState(!1);
	return /* @__PURE__ */ g(PD, {
		open: s,
		onOpenChange: c,
		children: [/* @__PURE__ */ h(FD, {
			asChild: !0,
			children: /* @__PURE__ */ h(qb, {
				variant: "outline",
				children: t
			})
		}), /* @__PURE__ */ g(zD, { children: [
			/* @__PURE__ */ g(BD, { children: [/* @__PURE__ */ h(HD, { children: n }), /* @__PURE__ */ h(UD, { children: r })] }),
			/* @__PURE__ */ g("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ g(hA, {
						htmlFor: "confirm-reason",
						children: ["Alasan tindakan ", a ? /* @__PURE__ */ h("span", {
							className: "text-destructive",
							children: "*"
						}) : null]
					}),
					/* @__PURE__ */ h(zj, {
						id: "confirm-reason",
						value: l,
						onChange: (e) => {
							u(e.target.value), d && f(!1);
						},
						placeholder: "Tuliskan alasan atau catatan tindak lanjut..."
					}),
					d ? /* @__PURE__ */ h("p", {
						className: "text-xs text-destructive",
						children: "Alasan wajib diisi sebelum melanjutkan."
					}) : null
				]
			}),
			/* @__PURE__ */ g(VD, { children: [/* @__PURE__ */ h(qb, {
				variant: "ghost",
				onClick: () => c(!1),
				children: "Batal"
			}), /* @__PURE__ */ h(qb, {
				onClick: () => {
					if (a && l.trim().length === 0) {
						f(!0);
						return;
					}
					o(l.trim()), u(""), f(!1), c(!1);
				},
				children: i
			})] })
		] })]
	});
}
//#endregion
//#region src/components/ui/bulk-action-bar.tsx
function bM({ selectedCount: e, onSetPending: t, onSetApproved: n }) {
	return e === 0 ? null : /* @__PURE__ */ g("div", {
		className: "flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-card p-3",
		children: [/* @__PURE__ */ g("p", {
			className: "text-sm text-foreground",
			children: [e, " dokumen dipilih"]
		}), /* @__PURE__ */ g("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ h(qb, {
				size: "sm",
				variant: "outline",
				onClick: t,
				children: "Set menunggu verifikasi"
			}), /* @__PURE__ */ h(qb, {
				size: "sm",
				onClick: n,
				children: "Set disetujui"
			})]
		})]
	});
}
//#endregion
//#region src/components/ui/data-state-panel.tsx
function xM({ state: e, title: t, description: n, onRetry: r, children: i }) {
	return e === "ready" ? /* @__PURE__ */ h(m, { children: i }) : e === "loading" ? /* @__PURE__ */ h("div", {
		className: "rounded-lg border bg-card p-8",
		children: /* @__PURE__ */ g("div", {
			className: "flex items-center gap-3 text-sm text-muted-foreground",
			children: [/* @__PURE__ */ h(Cj, { className: "h-4 w-4" }), "Memuat data dokumen..."]
		})
	}) : e === "error" ? /* @__PURE__ */ h("div", {
		className: "rounded-lg border border-feedback-danger/30 bg-feedback-danger-bg p-8",
		children: /* @__PURE__ */ g("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ h(Tt, { className: "mt-0.5 h-5 w-5 text-feedback-danger" }), /* @__PURE__ */ g("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ h("p", {
						className: "text-sm font-semibold text-foreground",
						children: t ?? "Data gagal dimuat"
					}),
					/* @__PURE__ */ h("p", {
						className: "text-sm text-muted-foreground",
						children: n ?? "Terjadi gangguan saat mengambil data. Silakan coba kembali."
					}),
					/* @__PURE__ */ h(qb, {
						size: "sm",
						variant: "outline",
						onClick: r,
						children: "Coba lagi"
					})
				]
			})]
		})
	}) : /* @__PURE__ */ g("div", {
		className: "rounded-lg border border-dashed bg-muted/30 p-8",
		children: [/* @__PURE__ */ h("p", {
			className: "text-sm font-medium text-foreground",
			children: t ?? "Belum ada data yang tersedia"
		}), /* @__PURE__ */ h("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: n ?? "Ubah filter atau tambah dokumen baru untuk mulai mengisi tabel."
		})]
	});
}
//#endregion
//#region src/components/ui/data-table.tsx
function SM({ data: e, columns: t, className: n, ...r }) {
	return /* @__PURE__ */ h("div", {
		className: G("w-full overflow-auto rounded-lg border border-border bg-background shadow-sm", n),
		...r,
		children: /* @__PURE__ */ g("table", {
			className: "w-full caption-bottom text-sm border-collapse",
			children: [/* @__PURE__ */ h("thead", {
				className: "bg-muted/50 border-b-2 border-border",
				children: /* @__PURE__ */ g("tr", {
					className: "transition-colors",
					children: [t.map((e) => /* @__PURE__ */ h("th", {
						className: "h-12 px-4 text-left align-middle text-sm font-semibold text-muted-foreground",
						children: e.label
					}, e.key)), /* @__PURE__ */ h("th", {
						className: "h-12 px-4 text-right align-middle text-sm font-semibold text-muted-foreground",
						children: "Aksi"
					})]
				})
			}), /* @__PURE__ */ h("tbody", {
				className: "bg-background [&_tr:last-child]:border-0",
				children: e.map((e, n) => /* @__PURE__ */ g("tr", {
					className: "border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
					children: [t.map((t) => {
						let n = t.getValue ? t.getValue(e) : e[t.key];
						return /* @__PURE__ */ h("td", {
							className: "p-4 align-middle text-foreground font-medium",
							children: t.render ? t.render(n, e) : String(n ?? "-")
						}, t.key);
					}), /* @__PURE__ */ h("td", {
						className: "p-4 align-middle text-right",
						children: /* @__PURE__ */ h(qb, {
							variant: "ghost",
							size: "sm",
							className: "text-primary hover:text-primary/80 font-bold h-7 px-2",
							children: "Edit"
						})
					})]
				}, n))
			})]
		})
	});
}
//#endregion
//#region src/components/ui/date-picker.tsx
function CM({ date: t, onChange: n, placeholder: r = "Pilih tanggal", className: i, disabled: a = !1, clearable: o = !0 }) {
	let [s, c] = e.useState(t), l = t === void 0 ? s : t, u = (e) => {
		t === void 0 && c(e), n?.(e);
	};
	return /* @__PURE__ */ g(UA, { children: [/* @__PURE__ */ h(WA, {
		asChild: !0,
		children: /* @__PURE__ */ g(qb, {
			variant: "outline",
			disabled: a,
			className: G("w-full justify-start text-left font-medium border-border bg-background hover:bg-muted hover:border-border-strong transition-all shadow-sm group", !l && "text-muted-foreground font-normal", i),
			children: [
				/* @__PURE__ */ h(vt, { className: "mr-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" }),
				/* @__PURE__ */ h("span", {
					className: "flex-1 truncate",
					children: l ? ES(l, "dd MMMM yyyy", { locale: KS }) : r
				}),
				o && l && !a && /* @__PURE__ */ h(Lt, {
					className: "h-3 w-3 ml-2 opacity-40 hover:opacity-100 transition-opacity",
					onClick: (e) => {
						e.stopPropagation(), u(void 0);
					}
				})
			]
		})
	}), /* @__PURE__ */ h(GA, {
		className: "w-auto p-0 border-border shadow-xl animate-in fade-in slide-in-from-top-2 duration-200",
		align: "start",
		children: /* @__PURE__ */ h(sT, {
			mode: "single",
			selected: l,
			onSelect: u,
			initialFocus: !0,
			className: "bg-background rounded-md"
		})
	})] });
}
//#endregion
//#region src/components/ui/filter-bar.tsx
function wM({ value: e, onChange: t, onReset: n }) {
	return /* @__PURE__ */ g("div", {
		className: "rounded-lg border bg-card p-4",
		children: [/* @__PURE__ */ g("div", {
			className: "grid gap-4 md:grid-cols-3",
			children: [
				/* @__PURE__ */ g("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ h(hA, {
						htmlFor: "filter-keyword",
						children: "Pencarian"
					}), /* @__PURE__ */ g("div", {
						className: "relative",
						children: [/* @__PURE__ */ h(Pt, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ h(EA, {
							id: "filter-keyword",
							value: e.keyword,
							onChange: (n) => t({
								...e,
								keyword: n.target.value
							}),
							className: "pl-9",
							placeholder: "Cari judul atau nomor dokumen"
						})]
					})]
				}),
				/* @__PURE__ */ g("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ h(hA, { children: "Status" }), /* @__PURE__ */ g($A, {
						value: e.status,
						onValueChange: (n) => t({
							...e,
							status: n
						}),
						children: [/* @__PURE__ */ h(nj, { children: /* @__PURE__ */ h(tj, { placeholder: "Semua status" }) }), /* @__PURE__ */ g(rj, { children: [
							/* @__PURE__ */ h(aj, {
								value: "all",
								children: "Semua status"
							}),
							/* @__PURE__ */ h(aj, {
								value: "draft",
								children: "Draft"
							}),
							/* @__PURE__ */ h(aj, {
								value: "pending",
								children: "Menunggu verifikasi"
							}),
							/* @__PURE__ */ h(aj, {
								value: "revised",
								children: "Perlu revisi"
							}),
							/* @__PURE__ */ h(aj, {
								value: "approved",
								children: "Disetujui"
							})
						] })]
					})]
				}),
				/* @__PURE__ */ g("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ h(hA, { children: "Unit Kerja" }), /* @__PURE__ */ g($A, {
						value: e.unitKerja,
						onValueChange: (n) => t({
							...e,
							unitKerja: n
						}),
						children: [/* @__PURE__ */ h(nj, { children: /* @__PURE__ */ h(tj, { placeholder: "Semua unit kerja" }) }), /* @__PURE__ */ g(rj, { children: [
							/* @__PURE__ */ h(aj, {
								value: "all",
								children: "Semua unit kerja"
							}),
							/* @__PURE__ */ h(aj, {
								value: "ipds",
								children: "IPDS"
							}),
							/* @__PURE__ */ h(aj, {
								value: "sosial",
								children: "Statistik Sosial"
							}),
							/* @__PURE__ */ h(aj, {
								value: "distribusi",
								children: "Statistik Distribusi"
							}),
							/* @__PURE__ */ h(aj, {
								value: "produksi",
								children: "Statistik Produksi"
							})
						] })]
					})]
				})
			]
		}), /* @__PURE__ */ h("div", {
			className: "mt-4 flex justify-end",
			children: /* @__PURE__ */ h(qb, {
				variant: "outline",
				onClick: n,
				children: "Reset filter"
			})
		})]
	});
}
//#endregion
//#region src/components/ui/form-section.tsx
function TM({ title: e, description: t, requiredCount: n, completedCount: r, action: i, className: a, children: o, ...s }) {
	let c = typeof n == "number" && typeof r == "number" ? `${r}/${n} field terisi` : null;
	return /* @__PURE__ */ g("section", {
		className: G("rounded-lg border bg-card p-6 space-y-4", a),
		...s,
		children: [
			/* @__PURE__ */ g("div", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ g("div", {
					className: "space-y-1",
					children: [
						/* @__PURE__ */ h("h3", {
							className: "text-base font-semibold text-foreground",
							children: e
						}),
						t ? /* @__PURE__ */ h("p", {
							className: "text-sm text-muted-foreground",
							children: t
						}) : null,
						c ? /* @__PURE__ */ h("p", {
							className: "text-xs text-muted-foreground",
							children: c
						}) : null
					]
				}), i ? /* @__PURE__ */ h("div", {
					className: "shrink-0",
					children: i
				}) : null]
			}),
			/* @__PURE__ */ h(lj, {}),
			/* @__PURE__ */ h("div", {
				className: "space-y-4",
				children: o
			})
		]
	});
}
//#endregion
//#region src/components/ui/kpi-card.tsx
function EM({ title: e, value: t, helper: n, icon: r, className: i, ...a }) {
	return /* @__PURE__ */ g(xE, {
		className: G("border-l-4 border-l-primary", i),
		...a,
		children: [/* @__PURE__ */ h(SE, {
			className: "pb-2",
			children: /* @__PURE__ */ g(CE, {
				className: "flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground",
				children: [r, e]
			})
		}), /* @__PURE__ */ g(TE, { children: [/* @__PURE__ */ h("div", {
			className: "numeric text-2xl font-bold",
			children: t
		}), n ? /* @__PURE__ */ h("p", {
			className: "mt-1 text-xs text-muted-foreground",
			children: n
		}) : null] })]
	});
}
//#endregion
//#region src/components/ui/page-header.tsx
function DM({ title: e, description: t, action: n, className: r, ...i }) {
	return /* @__PURE__ */ g("div", {
		className: G("flex flex-col gap-3 border-b pb-4 md:flex-row md:items-end md:justify-between", r),
		...i,
		children: [/* @__PURE__ */ g("div", { children: [/* @__PURE__ */ h("h1", {
			className: "h2 text-foreground",
			children: e
		}), t ? /* @__PURE__ */ h("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: t
		}) : null] }), n ? /* @__PURE__ */ h("div", {
			className: "shrink-0",
			children: n
		}) : null]
	});
}
//#endregion
//#region src/components/ui/performance-card.tsx
var OM = new Intl.NumberFormat("id-ID"), kM = Eb("relative overflow-hidden transition-shadow duration-200 hover:shadow-md", {
	variants: { variant: {
		default: "border bg-card",
		glass: "border-background/40 bg-background/60 shadow-sm backdrop-blur-md",
		gradient: "border-l-4 border-l-primary bg-card"
	} },
	defaultVariants: { variant: "default" }
});
function AM(e) {
	return typeof e == "number" ? OM.format(e) : e;
}
function jM({ data: e, className: t }) {
	if (e.length < 2) return null;
	let n = Math.min(...e), r = Math.max(...e) - n || 1, i = 120 / (e.length - 1), a = e.map((e, t) => {
		let a = t * i, o = 36 - (e - n) / r * 36;
		return `${a.toFixed(2)},${o.toFixed(2)}`;
	}).join(" ");
	return /* @__PURE__ */ h("svg", {
		viewBox: "0 0 120 36",
		preserveAspectRatio: "none",
		className: G("h-9 w-full text-primary", t),
		role: "presentation",
		"aria-hidden": "true",
		children: /* @__PURE__ */ h("polyline", {
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			points: a
		})
	});
}
function MM({ title: e, value: t, unit: n, target: r, delta: i, trend: a, icon: o, variant: s, loading: c, className: l, ...u }) {
	if (c) return /* @__PURE__ */ g(xE, {
		className: G(kM({ variant: s }), l),
		...u,
		children: [/* @__PURE__ */ h(SE, {
			className: "pb-2",
			children: /* @__PURE__ */ h(bj, { className: "h-3 w-24" })
		}), /* @__PURE__ */ g(TE, {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ h(bj, { className: "h-8 w-32" }),
				/* @__PURE__ */ h(bj, { className: "h-4 w-20" }),
				/* @__PURE__ */ h(bj, { className: "h-9 w-full" })
			]
		})]
	});
	let d = typeof t == "number" && typeof r == "number" && r > 0 ? Math.min(Math.round(t / r * 100), 999) : null, f = i?.direction === "up", p = f ? gt : pt;
	return /* @__PURE__ */ g(xE, {
		className: G(kM({ variant: s }), l),
		...u,
		children: [
			s === "gradient" ? /* @__PURE__ */ h("div", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-br from-primary/10 to-transparent"
			}) : null,
			/* @__PURE__ */ h(SE, {
				className: "relative flex flex-row items-start justify-between space-y-0 pb-2",
				children: /* @__PURE__ */ g(CE, {
					className: "flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground",
					children: [o ? /* @__PURE__ */ h(o, {
						className: "h-3.5 w-3.5",
						"aria-hidden": "true"
					}) : null, e]
				})
			}),
			/* @__PURE__ */ g(TE, {
				className: "relative space-y-3",
				children: [
					/* @__PURE__ */ g("div", {
						className: "flex items-baseline gap-2",
						children: [/* @__PURE__ */ h("span", {
							className: "text-3xl font-bold tabular-nums text-foreground",
							children: AM(t)
						}), n ? /* @__PURE__ */ h("span", {
							className: "text-sm font-medium text-muted-foreground",
							children: n
						}) : null]
					}),
					i ? /* @__PURE__ */ g("div", {
						className: G("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium", f ? "bg-feedback-success-bg text-feedback-success" : "bg-feedback-danger-bg text-feedback-danger"),
						children: [
							/* @__PURE__ */ h(p, {
								className: "h-3 w-3",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ g("span", {
								className: "tabular-nums",
								children: [OM.format(i.value), "%"]
							}),
							/* @__PURE__ */ h("span", {
								className: "text-muted-foreground",
								children: "·"
							}),
							/* @__PURE__ */ h("span", {
								className: "text-muted-foreground",
								children: i.period
							})
						]
					}) : null,
					d !== null && typeof r == "number" ? /* @__PURE__ */ g("p", {
						className: "text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ g("span", {
								className: "font-medium tabular-nums text-foreground",
								children: [d, "%"]
							}),
							" dari target ",
							OM.format(r)
						]
					}) : null,
					a && a.length > 1 ? /* @__PURE__ */ h(jM, { data: a }) : null
				]
			})
		]
	});
}
//#endregion
//#region src/components/ui/progress-audit.tsx
function NM({ totalChecklist: e, completedChecklist: t }) {
	let n = Math.max(e, 1), r = Math.min(Math.round(t / n * 100), 100);
	return /* @__PURE__ */ g("div", {
		className: "rounded-lg border bg-card p-4 space-y-2",
		children: [
			/* @__PURE__ */ h("p", {
				className: "text-sm font-medium text-foreground",
				children: "Progress Kelengkapan Dokumen"
			}),
			/* @__PURE__ */ h(JA, { value: r }),
			/* @__PURE__ */ g("p", {
				className: "text-xs text-muted-foreground",
				children: [
					t,
					"/",
					n,
					" indikator terpenuhi (",
					r,
					"%)"
				]
			})
		]
	});
}
//#endregion
//#region src/components/ui/review-timeline.tsx
function PM({ items: e, className: t, ...n }) {
	return /* @__PURE__ */ g("div", {
		className: G("rounded-lg border bg-card p-4", t),
		...n,
		children: [/* @__PURE__ */ h("h3", {
			className: "mb-4 text-base font-semibold text-foreground",
			children: "Timeline Review Dokumen"
		}), /* @__PURE__ */ h("ol", {
			className: "space-y-4",
			children: e.map((e) => /* @__PURE__ */ g("li", {
				className: "relative pl-6",
				children: [/* @__PURE__ */ h("span", { className: "absolute left-0 top-2 h-2.5 w-2.5 rounded-full bg-primary" }), /* @__PURE__ */ g("div", {
					className: "space-y-1 rounded-md border bg-background p-3",
					children: [
						/* @__PURE__ */ g("div", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ g("p", {
								className: "text-sm font-medium text-foreground",
								children: [
									e.actor,
									" - ",
									e.role
								]
							}), /* @__PURE__ */ h(Tj, {
								variant: e.status,
								children: e.status
							})]
						}),
						/* @__PURE__ */ h("p", {
							className: "text-sm text-muted-foreground",
							children: e.note
						}),
						/* @__PURE__ */ h("p", {
							className: "text-xs text-muted-foreground",
							children: e.date
						})
					]
				})]
			}, e.id))
		})]
	});
}
//#endregion
//#region src/components/ui/validation-summary.tsx
function FM({ items: e, onNavigate: t, className: n, ...r }) {
	return e.length === 0 ? /* @__PURE__ */ h("div", {
		className: G("rounded-lg border border-feedback-success/30 bg-feedback-success-bg p-4", n),
		...r,
		children: /* @__PURE__ */ h("p", {
			className: "text-sm font-medium text-feedback-success",
			children: "Semua validasi terpenuhi."
		})
	}) : /* @__PURE__ */ h("div", {
		className: G("rounded-lg border border-feedback-danger/30 bg-feedback-danger-bg p-4", n),
		...r,
		children: /* @__PURE__ */ g("div", {
			className: "flex items-start gap-2",
			children: [/* @__PURE__ */ h(Tt, { className: "mt-0.5 h-4 w-4 text-feedback-danger" }), /* @__PURE__ */ g("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ g("p", {
					className: "text-sm font-semibold text-foreground",
					children: [
						"Terdapat ",
						e.length,
						" validasi yang perlu diperbaiki."
					]
				}), /* @__PURE__ */ h("ul", {
					className: "space-y-1",
					children: e.map((e) => /* @__PURE__ */ h("li", { children: /* @__PURE__ */ g("button", {
						type: "button",
						className: "text-left text-sm text-feedback-danger underline-offset-2 hover:underline",
						onClick: () => t?.(e.id),
						children: [
							"[",
							e.section,
							"] ",
							e.message
						]
					}) }, e.id))
				})]
			})]
		})
	});
}
//#endregion
//#region src/components/patterns/empty-state.tsx
function IM({ className: e }) {
	return /* @__PURE__ */ g("svg", {
		viewBox: "0 0 200 160",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		className: e,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ h("line", {
				x1: "0",
				y1: "80",
				x2: "200",
				y2: "80",
				stroke: "hsl(var(--border-subtle))",
				strokeWidth: "1"
			}),
			/* @__PURE__ */ h("line", {
				x1: "100",
				y1: "0",
				x2: "100",
				y2: "160",
				stroke: "hsl(var(--border-subtle))",
				strokeWidth: "1"
			}),
			/* @__PURE__ */ h("rect", {
				x: "60",
				y: "50",
				width: "70",
				height: "85",
				rx: "3",
				fill: "hsl(var(--warm-100-hsl))",
				stroke: "hsl(var(--border-default))",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ h("rect", {
				x: "55",
				y: "44",
				width: "70",
				height: "85",
				rx: "3",
				fill: "hsl(var(--surface-raised))",
				stroke: "hsl(var(--border-default))",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ h("rect", {
				x: "50",
				y: "38",
				width: "70",
				height: "85",
				rx: "3",
				fill: "hsl(var(--surface-raised))",
				stroke: "hsl(var(--border-strong))",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ h("line", {
				x1: "62",
				y1: "58",
				x2: "108",
				y2: "58",
				stroke: "hsl(var(--border-default))",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ h("line", {
				x1: "62",
				y1: "68",
				x2: "100",
				y2: "68",
				stroke: "hsl(var(--border-default))",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ h("line", {
				x1: "62",
				y1: "78",
				x2: "104",
				y2: "78",
				stroke: "hsl(var(--border-default))",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ h("line", {
				x1: "62",
				y1: "88",
				x2: "95",
				y2: "88",
				stroke: "hsl(var(--border-default))",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ h("circle", {
				cx: "152",
				cy: "36",
				r: "12",
				fill: "hsl(var(--amber-100))"
			}),
			/* @__PURE__ */ h("circle", {
				cx: "152",
				cy: "36",
				r: "6",
				fill: "hsl(var(--amber-400))"
			})
		]
	});
}
function LM({ className: e }) {
	return /* @__PURE__ */ g("svg", {
		viewBox: "0 0 200 160",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		className: e,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ h("line", {
				x1: "0",
				y1: "80",
				x2: "200",
				y2: "80",
				stroke: "hsl(var(--border-subtle))",
				strokeWidth: "1"
			}),
			/* @__PURE__ */ h("circle", {
				cx: "90",
				cy: "72",
				r: "38",
				fill: "hsl(var(--surface-raised))",
				stroke: "hsl(var(--border-strong))",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ h("circle", {
				cx: "90",
				cy: "72",
				r: "24",
				fill: "hsl(var(--warm-50-hsl))"
			}),
			/* @__PURE__ */ h("line", {
				x1: "120",
				y1: "101",
				x2: "150",
				y2: "130",
				stroke: "hsl(var(--border-strong))",
				strokeWidth: "3",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ h("line", {
				x1: "80",
				y1: "65",
				x2: "100",
				y2: "65",
				stroke: "hsl(var(--border-default))",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ h("line", {
				x1: "80",
				y1: "73",
				x2: "95",
				y2: "73",
				stroke: "hsl(var(--border-default))",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ h("circle", {
				cx: "148",
				cy: "128",
				r: "8",
				fill: "hsl(var(--amber-400))"
			})
		]
	});
}
function RM({ className: e }) {
	return /* @__PURE__ */ g("svg", {
		viewBox: "0 0 200 160",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		className: e,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ h("line", {
				x1: "0",
				y1: "80",
				x2: "200",
				y2: "80",
				stroke: "hsl(var(--border-subtle))",
				strokeWidth: "1"
			}),
			/* @__PURE__ */ h("rect", {
				x: "60",
				y: "35",
				width: "80",
				height: "90",
				rx: "4",
				fill: "hsl(var(--surface-raised))",
				stroke: "hsl(var(--crimson-300))",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ h("rect", {
				x: "60",
				y: "35",
				width: "80",
				height: "24",
				rx: "4",
				fill: "hsl(var(--crimson-50))"
			}),
			/* @__PURE__ */ h("rect", {
				x: "60",
				y: "47",
				width: "80",
				height: "12",
				fill: "hsl(var(--crimson-50))"
			}),
			/* @__PURE__ */ h("line", {
				x1: "95",
				y1: "80",
				x2: "105",
				y2: "90",
				stroke: "hsl(var(--crimson-600))",
				strokeWidth: "2.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ h("line", {
				x1: "105",
				y1: "80",
				x2: "95",
				y2: "90",
				stroke: "hsl(var(--crimson-600))",
				strokeWidth: "2.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ h("circle", {
				cx: "100",
				cy: "105",
				r: "3",
				fill: "hsl(var(--crimson-400))"
			}),
			/* @__PURE__ */ h("line", {
				x1: "100",
				y1: "96",
				x2: "100",
				y2: "103",
				stroke: "hsl(var(--crimson-400))",
				strokeWidth: "2",
				strokeLinecap: "round"
			})
		]
	});
}
var zM = {
	empty: IM,
	search: LM,
	error: RM
};
function BM({ illustration: e = "empty", title: t, description: n, action: r, secondaryAction: i, className: a, compact: o = !1 }) {
	let s = typeof e == "string" ? zM[e] : null;
	return /* @__PURE__ */ g("div", {
		className: G("flex flex-col items-center justify-center text-center", o ? "gap-3 py-8 px-4" : "gap-4 py-16 px-6", a),
		children: [
			s ? /* @__PURE__ */ h(s, { className: G(o ? "w-28 h-24" : "w-40 h-32") }) : e,
			/* @__PURE__ */ g("div", {
				className: "space-y-1.5 max-w-sm",
				children: [/* @__PURE__ */ h("h3", {
					className: G("font-semibold text-content-primary", o ? "text-body-sm" : "text-h3"),
					children: t
				}), n && /* @__PURE__ */ h("p", {
					className: G("text-content-secondary", o ? "text-caption" : "text-body-sm"),
					children: n
				})]
			}),
			(r || i) && /* @__PURE__ */ g("div", {
				className: "flex items-center gap-2 flex-wrap justify-center",
				children: [r && /* @__PURE__ */ h(qb, {
					variant: r.variant ?? "default",
					size: o ? "sm" : "default",
					onClick: r.onClick,
					children: r.label
				}), i && /* @__PURE__ */ h(qb, {
					variant: "ghost",
					size: o ? "sm" : "default",
					onClick: i.onClick,
					children: i.label
				})]
			})
		]
	});
}
//#endregion
export { bb as Accordion, Cb as AccordionContent, xb as AccordionItem, Sb as AccordionTrigger, kb as Alert, jb as AlertDescription, Ab as AlertTitle, vM as AppTopbar, Nb as Avatar, Fb as AvatarFallback, Ib as AvatarGroup, Pb as AvatarImage, Rb as Badge, zb as Breadcrumb, Gb as BreadcrumbEllipsis, Vb as BreadcrumbItem, Hb as BreadcrumbLink, Bb as BreadcrumbList, Ub as BreadcrumbPage, Wb as BreadcrumbSeparator, bM as BulkActionBar, qb as Button, sT as Calendar, xE as Card, TE as CardContent, wE as CardDescription, EE as CardFooter, SE as CardHeader, CE as CardTitle, gE as Carousel, _E as CarouselContent, vE as CarouselItem, bE as CarouselNext, yE as CarouselPrevious, DE as Checkbox, _M as Combobox, WD as Command, GD as CommandDialog, JD as CommandEmpty, YD as CommandGroup, KD as CommandInput, ZD as CommandItem, qD as CommandList, XD as CommandSeparator, QD as CommandShortcut, yM as ConfirmActionDialog, xM as DataStatePanel, SM as DataTable, CM as DatePicker, Mk as DescriptionDetails, kk as DescriptionList, Ak as DescriptionListItem, jk as DescriptionTerm, PD as Dialog, LD as DialogClose, zD as DialogContent, UD as DialogDescription, VD as DialogFooter, BD as DialogHeader, RD as DialogOverlay, ID as DialogPortal, HD as DialogTitle, FD as DialogTrigger, yk as Drawer, Sk as DrawerClose, wk as DrawerContent, Ok as DrawerDescription, Ek as DrawerFooter, Tk as DrawerHeader, Ck as DrawerOverlay, xk as DrawerPortal, Dk as DrawerTitle, bk as DrawerTrigger, $D as DropdownMenu, aO as DropdownMenuCheckboxItem, nO as DropdownMenuContent, rO as DropdownMenuGroup, iO as DropdownMenuItem, cO as DropdownMenuLabel, eO as DropdownMenuPortal, oO as DropdownMenuRadioGroup, sO as DropdownMenuRadioItem, lO as DropdownMenuSeparator, uO as DropdownMenuShortcut, dO as DropdownMenuSub, pO as DropdownMenuSubContent, fO as DropdownMenuSubTrigger, tO as DropdownMenuTrigger, BM as EmptyState, Nk as FileUpload, wM as FilterBar, gA as Form, CA as FormControl, wA as FormDescription, vA as FormField, xA as FormItem, SA as FormLabel, TA as FormMessage, TM as FormSection, EA as Input, EM as KpiCard, hA as Label, DA as NavigationMenu, MA as NavigationMenuContent, FA as NavigationMenuIndicator, kA as NavigationMenuItem, PA as NavigationMenuLink, OA as NavigationMenuList, jA as NavigationMenuTrigger, NA as NavigationMenuViewport, DM as PageHeader, IA as Pagination, LA as PaginationContent, HA as PaginationEllipsis, RA as PaginationItem, zA as PaginationLink, VA as PaginationNext, BA as PaginationPrevious, MM as PerformanceCard, UA as Popover, GA as PopoverContent, WA as PopoverTrigger, JA as Progress, NM as ProgressAudit, YA as RadioGroup, XA as RadioGroupItem, PM as ReviewTimeline, ZA as ScrollArea, QA as ScrollBar, $A as Select, rj as SelectContent, ej as SelectGroup, aj as SelectItem, ij as SelectLabel, cj as SelectScrollDownButton, sj as SelectScrollUpButton, oj as SelectSeparator, nj as SelectTrigger, tj as SelectValue, lj as Separator, uj as Sheet, fj as SheetClose, hj as SheetContent, yj as SheetDescription, _j as SheetFooter, gj as SheetHeader, mj as SheetOverlay, pj as SheetPortal, vj as SheetTitle, dj as SheetTrigger, bj as Skeleton, xj as Slider, Cj as Spinner, Tj as StatusBadge, Ej as Switch, Dj as Table, kj as TableBody, Pj as TableCaption, Nj as TableCell, Aj as TableFooter, Mj as TableHead, Oj as TableHeader, jj as TableRow, Fj as Tabs, Rj as TabsContent, Ij as TabsList, Lj as TabsTrigger, zj as Textarea, Yj as Toast, Xj as ToastAction, Zj as ToastClose, $j as ToastDescription, Kj as ToastProvider, Qj as ToastTitle, qj as ToastViewport, fM as Toaster, Vj as Toggle, Wj as ToggleGroup, Gj as ToggleGroupItem, mM as Tooltip, gM as TooltipContent, pM as TooltipProvider, hM as TooltipTrigger, FM as ValidationSummary, Kb as buttonVariants, G as cn, AA as navigationMenuTriggerStyle, Bj as toggleVariants, yA as useFormField, dM as useToast };

//# sourceMappingURL=index.js.map