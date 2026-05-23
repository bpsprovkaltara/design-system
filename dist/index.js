import * as e from "react";
import t, { createContext as n, createElement as r, forwardRef as i, useCallback as a, useContext as o, useEffect as s, useLayoutEffect as c, useMemo as l, useRef as u, useState as d } from "react";
import { Fragment as f, jsx as p, jsxs as m } from "react/jsx-runtime";
import * as h from "react-dom";
import g from "react-dom";
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
		ee(i, t, n, r);
	}
}, ee = (e, t, n, r) => {
	if (typeof e == "string") {
		F(e, t, n);
		return;
	}
	if (typeof e == "function") {
		te(e, t, n, r);
		return;
	}
	ne(e, t, n, r);
}, F = (e, t, n) => {
	let r = e === "" ? t : re(t, e);
	r.classGroupId = n;
}, te = (e, t, n, r) => {
	if (ie(e)) {
		P(e(r), t, n, r);
		return;
	}
	t.validators === null && (t.validators = []), t.validators.push(w(n, e));
}, ne = (e, t, n, r) => {
	let i = Object.entries(e), a = i.length;
	for (let e = 0; e < a; e++) {
		let [a, o] = i[e];
		P(o, re(t, a), n, r);
	}
}, re = (e, t) => {
	let n = e, r = t.split(E), i = r.length;
	for (let e = 0; e < i; e++) {
		let t = r[e], i = n.nextPart.get(t);
		i || (i = T(), n.nextPart.set(t, i)), n = i;
	}
	return n;
}, ie = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, I = (e) => {
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
}, L = "!", ae = ":", oe = [], R = (e, t, n, r, i) => ({
	modifiers: e,
	hasImportantModifier: t,
	baseClassName: n,
	maybePostfixModifierPosition: r,
	isExternal: i
}), se = (e) => {
	let { prefix: t, experimentalParseClassName: n } = e, r = (e) => {
		let t = [], n = 0, r = 0, i = 0, a, o = e.length;
		for (let s = 0; s < o; s++) {
			let o = e[s];
			if (n === 0 && r === 0) {
				if (o === ae) {
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
		s.endsWith(L) ? (c = s.slice(0, -1), l = !0) : s.startsWith(L) && (c = s.slice(1), l = !0);
		let u = a && a > i ? a - i : void 0;
		return R(t, l, c, u);
	};
	if (t) {
		let e = t + ae, n = r;
		r = (t) => t.startsWith(e) ? n(t.slice(e.length)) : R(oe, !1, t, void 0, !0);
	}
	if (n) {
		let e = r;
		r = (t) => n({
			className: t,
			parseClassName: e
		});
	}
	return r;
}, ce = (e) => {
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
}, le = (e) => ({
	cache: I(e.cacheSize),
	parseClassName: se(e),
	sortModifiers: ce(e),
	...k(e)
}), ue = /\s+/, de = (e, t) => {
	let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i, sortModifiers: a } = t, o = [], s = e.trim().split(ue), c = "";
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
		let g = u.length === 0 ? "" : u.length === 1 ? u[0] : a(u).join(":"), _ = d ? g + L : g, v = _ + h;
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
}, fe = (...e) => {
	let t = 0, n, r, i = "";
	for (; t < e.length;) (n = e[t++]) && (r = pe(n)) && (i && (i += " "), i += r);
	return i;
}, pe = (e) => {
	if (typeof e == "string") return e;
	let t, n = "";
	for (let r = 0; r < e.length; r++) e[r] && (t = pe(e[r])) && (n && (n += " "), n += t);
	return n;
}, me = (e, ...t) => {
	let n, r, i, a, o = (o) => (n = le(t.reduce((e, t) => t(e), e())), r = n.cache.get, i = n.cache.set, a = s, s(o)), s = (e) => {
		let t = r(e);
		if (t) return t;
		let a = de(e, n);
		return i(e, a), a;
	};
	return a = o, (...e) => a(fe(...e));
}, he = [], ge = (e) => {
	let t = (t) => t[e] || he;
	return t.isThemeGetter = !0, t;
}, _e = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, ve = /^\((?:(\w[\w-]*):)?(.+)\)$/i, ye = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, be = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, xe = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Se = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Ce = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, we = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Te = (e) => ye.test(e), z = (e) => !!e && !Number.isNaN(Number(e)), Ee = (e) => !!e && Number.isInteger(Number(e)), De = (e) => e.endsWith("%") && z(e.slice(0, -1)), Oe = (e) => be.test(e), ke = () => !0, Ae = (e) => xe.test(e) && !Se.test(e), je = () => !1, Me = (e) => Ce.test(e), Ne = (e) => we.test(e), Pe = (e) => !B(e) && !V(e), Fe = (e) => Xe(e, et, je), B = (e) => _e.test(e), Ie = (e) => Xe(e, tt, Ae), Le = (e) => Xe(e, nt, z), Re = (e) => Xe(e, it, ke), ze = (e) => Xe(e, rt, je), Be = (e) => Xe(e, Qe, je), Ve = (e) => Xe(e, $e, Ne), He = (e) => Xe(e, at, Me), V = (e) => ve.test(e), Ue = (e) => Ze(e, tt), We = (e) => Ze(e, rt), Ge = (e) => Ze(e, Qe), Ke = (e) => Ze(e, et), qe = (e) => Ze(e, $e), Je = (e) => Ze(e, at, !0), Ye = (e) => Ze(e, it, !0), Xe = (e, t, n) => {
	let r = _e.exec(e);
	return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, Ze = (e, t, n = !1) => {
	let r = ve.exec(e);
	return r ? r[1] ? t(r[1]) : n : !1;
}, Qe = (e) => e === "position" || e === "percentage", $e = (e) => e === "image" || e === "url", et = (e) => e === "length" || e === "size" || e === "bg-size", tt = (e) => e === "length", nt = (e) => e === "number", rt = (e) => e === "family-name", it = (e) => e === "number" || e === "weight", at = (e) => e === "shadow", ot = /* @__PURE__ */ me(() => {
	let e = ge("color"), t = ge("font"), n = ge("text"), r = ge("font-weight"), i = ge("tracking"), a = ge("leading"), o = ge("breakpoint"), s = ge("container"), c = ge("spacing"), l = ge("radius"), u = ge("shadow"), d = ge("inset-shadow"), f = ge("text-shadow"), p = ge("drop-shadow"), m = ge("blur"), h = ge("perspective"), g = ge("aspect"), _ = ge("ease"), v = ge("animate"), y = () => [
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
		V,
		B
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
		V,
		B,
		c
	], T = () => [
		Te,
		"full",
		"auto",
		...w()
	], E = () => [
		Ee,
		"none",
		"subgrid",
		V,
		B
	], D = () => [
		"auto",
		{ span: [
			"full",
			Ee,
			V,
			B
		] },
		Ee,
		V,
		B
	], O = () => [
		Ee,
		"auto",
		V,
		B
	], k = () => [
		"auto",
		"min",
		"max",
		"fr",
		V,
		B
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
		Te,
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
		Te,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...w()
	], ee = () => [
		Te,
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
	], F = () => [
		e,
		V,
		B
	], te = () => [
		...b(),
		Ge,
		Be,
		{ position: [V, B] }
	], ne = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }], re = () => [
		"auto",
		"cover",
		"contain",
		Ke,
		Fe,
		{ size: [V, B] }
	], ie = () => [
		De,
		Ue,
		Ie
	], I = () => [
		"",
		"none",
		"full",
		l,
		V,
		B
	], L = () => [
		"",
		z,
		Ue,
		Ie
	], ae = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	], oe = () => [
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
	], R = () => [
		z,
		De,
		Ge,
		Be
	], se = () => [
		"",
		"none",
		m,
		V,
		B
	], ce = () => [
		"none",
		z,
		V,
		B
	], le = () => [
		"none",
		z,
		V,
		B
	], ue = () => [
		z,
		V,
		B
	], de = () => [
		Te,
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
			blur: [Oe],
			breakpoint: [Oe],
			color: [ke],
			container: [Oe],
			"drop-shadow": [Oe],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [Pe],
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
			"inset-shadow": [Oe],
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
			radius: [Oe],
			shadow: [Oe],
			spacing: ["px", z],
			text: [Oe],
			"text-shadow": [Oe],
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
				Te,
				B,
				V,
				g
			] }],
			container: ["container"],
			columns: [{ columns: [
				z,
				B,
				V,
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
				Ee,
				"auto",
				V,
				B
			] }],
			basis: [{ basis: [
				Te,
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
				z,
				Te,
				"auto",
				"initial",
				"none",
				B
			] }],
			grow: [{ grow: [
				"",
				z,
				V,
				B
			] }],
			shrink: [{ shrink: [
				"",
				z,
				V,
				B
			] }],
			order: [{ order: [
				Ee,
				"first",
				"last",
				"none",
				V,
				B
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
			"block-size": [{ block: ["auto", ...ee()] }],
			"min-block-size": [{ "min-block": ["auto", ...ee()] }],
			"max-block-size": [{ "max-block": ["none", ...ee()] }],
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
				Ue,
				Ie
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				r,
				Ye,
				Re
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
				De,
				B
			] }],
			"font-family": [{ font: [
				We,
				ze,
				t
			] }],
			"font-features": [{ "font-features": [B] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				i,
				V,
				B
			] }],
			"line-clamp": [{ "line-clamp": [
				z,
				"none",
				V,
				Le
			] }],
			leading: [{ leading: [a, ...w()] }],
			"list-image": [{ "list-image": [
				"none",
				V,
				B
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				V,
				B
			] }],
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			"placeholder-color": [{ placeholder: F() }],
			"text-color": [{ text: F() }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...ae(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				z,
				"from-font",
				"auto",
				V,
				Ie
			] }],
			"text-decoration-color": [{ decoration: F() }],
			"underline-offset": [{ "underline-offset": [
				z,
				"auto",
				V,
				B
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
				V,
				B
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
				V,
				B
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
			"bg-position": [{ bg: te() }],
			"bg-repeat": [{ bg: ne() }],
			"bg-size": [{ bg: re() }],
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
						Ee,
						V,
						B
					],
					radial: [
						"",
						V,
						B
					],
					conic: [
						Ee,
						V,
						B
					]
				},
				qe,
				Ve
			] }],
			"bg-color": [{ bg: F() }],
			"gradient-from-pos": [{ from: ie() }],
			"gradient-via-pos": [{ via: ie() }],
			"gradient-to-pos": [{ to: ie() }],
			"gradient-from": [{ from: F() }],
			"gradient-via": [{ via: F() }],
			"gradient-to": [{ to: F() }],
			rounded: [{ rounded: I() }],
			"rounded-s": [{ "rounded-s": I() }],
			"rounded-e": [{ "rounded-e": I() }],
			"rounded-t": [{ "rounded-t": I() }],
			"rounded-r": [{ "rounded-r": I() }],
			"rounded-b": [{ "rounded-b": I() }],
			"rounded-l": [{ "rounded-l": I() }],
			"rounded-ss": [{ "rounded-ss": I() }],
			"rounded-se": [{ "rounded-se": I() }],
			"rounded-ee": [{ "rounded-ee": I() }],
			"rounded-es": [{ "rounded-es": I() }],
			"rounded-tl": [{ "rounded-tl": I() }],
			"rounded-tr": [{ "rounded-tr": I() }],
			"rounded-br": [{ "rounded-br": I() }],
			"rounded-bl": [{ "rounded-bl": I() }],
			"border-w": [{ border: L() }],
			"border-w-x": [{ "border-x": L() }],
			"border-w-y": [{ "border-y": L() }],
			"border-w-s": [{ "border-s": L() }],
			"border-w-e": [{ "border-e": L() }],
			"border-w-bs": [{ "border-bs": L() }],
			"border-w-be": [{ "border-be": L() }],
			"border-w-t": [{ "border-t": L() }],
			"border-w-r": [{ "border-r": L() }],
			"border-w-b": [{ "border-b": L() }],
			"border-w-l": [{ "border-l": L() }],
			"divide-x": [{ "divide-x": L() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": L() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...ae(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...ae(),
				"hidden",
				"none"
			] }],
			"border-color": [{ border: F() }],
			"border-color-x": [{ "border-x": F() }],
			"border-color-y": [{ "border-y": F() }],
			"border-color-s": [{ "border-s": F() }],
			"border-color-e": [{ "border-e": F() }],
			"border-color-bs": [{ "border-bs": F() }],
			"border-color-be": [{ "border-be": F() }],
			"border-color-t": [{ "border-t": F() }],
			"border-color-r": [{ "border-r": F() }],
			"border-color-b": [{ "border-b": F() }],
			"border-color-l": [{ "border-l": F() }],
			"divide-color": [{ divide: F() }],
			"outline-style": [{ outline: [
				...ae(),
				"none",
				"hidden"
			] }],
			"outline-offset": [{ "outline-offset": [
				z,
				V,
				B
			] }],
			"outline-w": [{ outline: [
				"",
				z,
				Ue,
				Ie
			] }],
			"outline-color": [{ outline: F() }],
			shadow: [{ shadow: [
				"",
				"none",
				u,
				Je,
				He
			] }],
			"shadow-color": [{ shadow: F() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				d,
				Je,
				He
			] }],
			"inset-shadow-color": [{ "inset-shadow": F() }],
			"ring-w": [{ ring: L() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: F() }],
			"ring-offset-w": [{ "ring-offset": [z, Ie] }],
			"ring-offset-color": [{ "ring-offset": F() }],
			"inset-ring-w": [{ "inset-ring": L() }],
			"inset-ring-color": [{ "inset-ring": F() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				f,
				Je,
				He
			] }],
			"text-shadow-color": [{ "text-shadow": F() }],
			opacity: [{ opacity: [
				z,
				V,
				B
			] }],
			"mix-blend": [{ "mix-blend": [
				...oe(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": oe() }],
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
			"mask-image-linear-pos": [{ "mask-linear": [z] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": R() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": R() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": F() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": F() }],
			"mask-image-t-from-pos": [{ "mask-t-from": R() }],
			"mask-image-t-to-pos": [{ "mask-t-to": R() }],
			"mask-image-t-from-color": [{ "mask-t-from": F() }],
			"mask-image-t-to-color": [{ "mask-t-to": F() }],
			"mask-image-r-from-pos": [{ "mask-r-from": R() }],
			"mask-image-r-to-pos": [{ "mask-r-to": R() }],
			"mask-image-r-from-color": [{ "mask-r-from": F() }],
			"mask-image-r-to-color": [{ "mask-r-to": F() }],
			"mask-image-b-from-pos": [{ "mask-b-from": R() }],
			"mask-image-b-to-pos": [{ "mask-b-to": R() }],
			"mask-image-b-from-color": [{ "mask-b-from": F() }],
			"mask-image-b-to-color": [{ "mask-b-to": F() }],
			"mask-image-l-from-pos": [{ "mask-l-from": R() }],
			"mask-image-l-to-pos": [{ "mask-l-to": R() }],
			"mask-image-l-from-color": [{ "mask-l-from": F() }],
			"mask-image-l-to-color": [{ "mask-l-to": F() }],
			"mask-image-x-from-pos": [{ "mask-x-from": R() }],
			"mask-image-x-to-pos": [{ "mask-x-to": R() }],
			"mask-image-x-from-color": [{ "mask-x-from": F() }],
			"mask-image-x-to-color": [{ "mask-x-to": F() }],
			"mask-image-y-from-pos": [{ "mask-y-from": R() }],
			"mask-image-y-to-pos": [{ "mask-y-to": R() }],
			"mask-image-y-from-color": [{ "mask-y-from": F() }],
			"mask-image-y-to-color": [{ "mask-y-to": F() }],
			"mask-image-radial": [{ "mask-radial": [V, B] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": R() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": R() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": F() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": F() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": b() }],
			"mask-image-conic-pos": [{ "mask-conic": [z] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": R() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": R() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": F() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": F() }],
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
			"mask-position": [{ mask: te() }],
			"mask-repeat": [{ mask: ne() }],
			"mask-size": [{ mask: re() }],
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			"mask-image": [{ mask: [
				"none",
				V,
				B
			] }],
			filter: [{ filter: [
				"",
				"none",
				V,
				B
			] }],
			blur: [{ blur: se() }],
			brightness: [{ brightness: [
				z,
				V,
				B
			] }],
			contrast: [{ contrast: [
				z,
				V,
				B
			] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				p,
				Je,
				He
			] }],
			"drop-shadow-color": [{ "drop-shadow": F() }],
			grayscale: [{ grayscale: [
				"",
				z,
				V,
				B
			] }],
			"hue-rotate": [{ "hue-rotate": [
				z,
				V,
				B
			] }],
			invert: [{ invert: [
				"",
				z,
				V,
				B
			] }],
			saturate: [{ saturate: [
				z,
				V,
				B
			] }],
			sepia: [{ sepia: [
				"",
				z,
				V,
				B
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				V,
				B
			] }],
			"backdrop-blur": [{ "backdrop-blur": se() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				z,
				V,
				B
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				z,
				V,
				B
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				z,
				V,
				B
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				z,
				V,
				B
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				z,
				V,
				B
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				z,
				V,
				B
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				z,
				V,
				B
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				z,
				V,
				B
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
				V,
				B
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				z,
				"initial",
				V,
				B
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				_,
				V,
				B
			] }],
			delay: [{ delay: [
				z,
				V,
				B
			] }],
			animate: [{ animate: [
				"none",
				v,
				V,
				B
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				h,
				V,
				B
			] }],
			"perspective-origin": [{ "perspective-origin": x() }],
			rotate: [{ rotate: ce() }],
			"rotate-x": [{ "rotate-x": ce() }],
			"rotate-y": [{ "rotate-y": ce() }],
			"rotate-z": [{ "rotate-z": ce() }],
			scale: [{ scale: le() }],
			"scale-x": [{ "scale-x": le() }],
			"scale-y": [{ "scale-y": le() }],
			"scale-z": [{ "scale-z": le() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: ue() }],
			"skew-x": [{ "skew-x": ue() }],
			"skew-y": [{ "skew-y": ue() }],
			transform: [{ transform: [
				V,
				B,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: x() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: de() }],
			"translate-x": [{ "translate-x": de() }],
			"translate-y": [{ "translate-y": de() }],
			"translate-z": [{ "translate-z": de() }],
			"translate-none": ["translate-none"],
			accent: [{ accent: F() }],
			appearance: [{ appearance: ["none", "auto"] }],
			"caret-color": [{ caret: F() }],
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
				V,
				B
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
				V,
				B
			] }],
			fill: [{ fill: ["none", ...F()] }],
			"stroke-w": [{ stroke: [
				z,
				Ue,
				Ie,
				Le
			] }],
			stroke: [{ stroke: ["none", ...F()] }],
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
function H(...e) {
	return ot(S(e));
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-context@1.1.2_@types+react@19.2.14_react@19.2.6/node_modules/@radix-ui/react-context/dist/index.mjs
function st(t, n) {
	let r = e.createContext(n), i = (t) => {
		let { children: n, ...i } = t, a = e.useMemo(() => i, Object.values(i));
		return /* @__PURE__ */ p(r.Provider, {
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
function ct(t, n = []) {
	let r = [];
	function i(n, i) {
		let a = e.createContext(i), o = r.length;
		r = [...r, i];
		let s = (n) => {
			let { scope: r, children: i, ...s } = n, c = r?.[t]?.[o] || a, l = e.useMemo(() => s, Object.values(s));
			return /* @__PURE__ */ p(c.Provider, {
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
	return a.scopeName = t, [i, lt(a, ...n)];
}
function lt(...t) {
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
//#region node_modules/.pnpm/@radix-ui+react-compose-refs@1.1.2_@types+react@19.2.14_react@19.2.6/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
function ut(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
function dt(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = ut(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : ut(e[t], null);
			}
		};
	};
}
function U(...t) {
	return e.useCallback(dt(...t), t);
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-slot@1.2.3_@types+react@19.2.14_react@19.2.6/node_modules/@radix-ui/react-slot/dist/index.mjs
/* @__NO_SIDE_EFFECTS__ */
function ft(t) {
	let n = /* @__PURE__ */ pt(t), r = e.forwardRef((t, r) => {
		let { children: i, ...a } = t, o = e.Children.toArray(i), s = o.find(gt);
		if (s) {
			let t = s.props.children, i = o.map((n) => n === s ? e.Children.count(t) > 1 ? e.Children.only(null) : e.isValidElement(t) ? t.props.children : null : n);
			return /* @__PURE__ */ p(n, {
				...a,
				ref: r,
				children: e.isValidElement(t) ? e.cloneElement(t, void 0, i) : null
			});
		}
		return /* @__PURE__ */ p(n, {
			...a,
			ref: r,
			children: i
		});
	});
	return r.displayName = `${t}.Slot`, r;
}
/* @__NO_SIDE_EFFECTS__ */
function pt(t) {
	let n = e.forwardRef((t, n) => {
		let { children: r, ...i } = t;
		if (e.isValidElement(r)) {
			let t = vt(r), a = _t(i, r.props);
			return r.type !== e.Fragment && (a.ref = n ? dt(n, t) : t), e.cloneElement(r, a);
		}
		return e.Children.count(r) > 1 ? e.Children.only(null) : null;
	});
	return n.displayName = `${t}.SlotClone`, n;
}
var mt = Symbol("radix.slottable");
/* @__NO_SIDE_EFFECTS__ */
function ht(e) {
	let t = ({ children: e }) => /* @__PURE__ */ p(f, { children: e });
	return t.displayName = `${e}.Slottable`, t.__radixId = mt, t;
}
function gt(t) {
	return e.isValidElement(t) && typeof t.type == "function" && "__radixId" in t.type && t.type.__radixId === mt;
}
function _t(e, t) {
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
function vt(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-collection@1.1.7_@types+react-dom@19.2.3_@types+react@19.2.14__@types+r_b94f5365b88697a700662930c56ccffc/node_modules/@radix-ui/react-collection/dist/index.mjs
function yt(e) {
	let n = e + "CollectionProvider", [r, i] = ct(n), [a, o] = r(n, {
		collectionRef: { current: null },
		itemMap: /* @__PURE__ */ new Map()
	}), s = (e) => {
		let { scope: n, children: r } = e, i = t.useRef(null), o = t.useRef(/* @__PURE__ */ new Map()).current;
		return /* @__PURE__ */ p(a, {
			scope: n,
			itemMap: o,
			collectionRef: i,
			children: r
		});
	};
	s.displayName = n;
	let c = e + "CollectionSlot", l = /* @__PURE__ */ ft(c), u = t.forwardRef((e, t) => {
		let { scope: n, children: r } = e;
		return /* @__PURE__ */ p(l, {
			ref: U(t, o(c, n).collectionRef),
			children: r
		});
	});
	u.displayName = c;
	let d = e + "CollectionItemSlot", f = "data-radix-collection-item", m = /* @__PURE__ */ ft(d), h = t.forwardRef((e, n) => {
		let { scope: r, children: i, ...a } = e, s = t.useRef(null), c = U(n, s), l = o(d, r);
		return t.useEffect(() => (l.itemMap.set(s, {
			ref: s,
			...a
		}), () => void l.itemMap.delete(s))), /* @__PURE__ */ p(m, {
			[f]: "",
			ref: c,
			children: i
		});
	});
	h.displayName = d;
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
			ItemSlot: h
		},
		g,
		i
	];
}
typeof window < "u" && window.document && window.document.createElement;
function W(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
	return function(r) {
		if (e?.(r), n === !1 || !r.defaultPrevented) return t?.(r);
	};
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-use-layout-effect@1.1.1_@types+react@19.2.14_react@19.2.6/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var G = globalThis?.document ? e.useLayoutEffect : () => {}, bt = e.useInsertionEffect || G;
function xt({ prop: t, defaultProp: n, onChange: r = () => {}, caller: i }) {
	let [a, o, s] = St({
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
			let n = Ct(e) ? e(t) : e;
			n !== t && s.current?.(n);
		} else o(e);
	}, [
		c,
		t,
		o,
		s
	])];
}
function St({ defaultProp: t, onChange: n }) {
	let [r, i] = e.useState(t), a = e.useRef(r), o = e.useRef(n);
	return bt(() => {
		o.current = n;
	}, [n]), e.useEffect(() => {
		a.current !== r && (o.current?.(r), a.current = r);
	}, [r, a]), [
		r,
		i,
		o
	];
}
function Ct(e) {
	return typeof e == "function";
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-primitive@2.1.3_@types+react-dom@19.2.3_@types+react@19.2.14__@types+re_0935c7b95cefcdb4f10a34e92035e5e3/node_modules/@radix-ui/react-primitive/dist/index.mjs
var K = [
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
	let r = /* @__PURE__ */ ft(`Primitive.${n}`), i = e.forwardRef((e, t) => {
		let { asChild: i, ...a } = e, o = i ? r : n;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ p(o, {
			...a,
			ref: t
		});
	});
	return i.displayName = `Primitive.${n}`, {
		...t,
		[n]: i
	};
}, {});
function wt(e, t) {
	e && h.flushSync(() => e.dispatchEvent(t));
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-presence@1.1.5_@types+react-dom@19.2.3_@types+react@19.2.14__@types+rea_abbc8bcf75333b39bfe32b13ef7abc0e/node_modules/@radix-ui/react-presence/dist/index.mjs
function Tt(t, n) {
	return e.useReducer((e, t) => n[e][t] ?? e, t);
}
var q = (t) => {
	let { present: n, children: r } = t, i = Et(n), a = typeof r == "function" ? r({ present: i.isPresent }) : e.Children.only(r), o = U(i.ref, Ot(a));
	return typeof r == "function" || i.isPresent ? e.cloneElement(a, { ref: o }) : null;
};
q.displayName = "Presence";
function Et(t) {
	let [n, r] = e.useState(), i = e.useRef(null), a = e.useRef(t), o = e.useRef("none"), [s, c] = Tt(t ? "mounted" : "unmounted", {
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
		let e = Dt(i.current);
		o.current = s === "mounted" ? e : "none";
	}, [s]), G(() => {
		let e = i.current, n = a.current;
		if (n !== t) {
			let r = o.current, i = Dt(e);
			t ? c("MOUNT") : i === "none" || e?.display === "none" ? c("UNMOUNT") : c(n && r !== i ? "ANIMATION_OUT" : "UNMOUNT"), a.current = t;
		}
	}, [t, c]), G(() => {
		if (n) {
			let e, t = n.ownerDocument.defaultView ?? window, r = (r) => {
				let o = Dt(i.current).includes(CSS.escape(r.animationName));
				if (r.target === n && o && (c("ANIMATION_END"), !a.current)) {
					let r = n.style.animationFillMode;
					n.style.animationFillMode = "forwards", e = t.setTimeout(() => {
						n.style.animationFillMode === "forwards" && (n.style.animationFillMode = r);
					});
				}
			}, s = (e) => {
				e.target === n && (o.current = Dt(i.current));
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
function Dt(e) {
	return e?.animationName || "none";
}
function Ot(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-id@1.1.1_@types+react@19.2.14_react@19.2.6/node_modules/@radix-ui/react-id/dist/index.mjs
var kt = e.useId || (() => void 0), At = 0;
function J(t) {
	let [n, r] = e.useState(kt());
	return G(() => {
		t || r((e) => e ?? String(At++));
	}, [t]), t || (n ? `radix-${n}` : "");
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-collapsible@1.1.12_@types+react-dom@19.2.3_@types+react@19.2.14__@types_e6de6020dad09a1b58742342f76b372e/node_modules/@radix-ui/react-collapsible/dist/index.mjs
var jt = "Collapsible", [Mt, Nt] = ct(jt), [Pt, Ft] = Mt(jt), It = e.forwardRef((t, n) => {
	let { __scopeCollapsible: r, open: i, defaultOpen: a, disabled: o, onOpenChange: s, ...c } = t, [l, u] = xt({
		prop: i,
		defaultProp: a ?? !1,
		onChange: s,
		caller: jt
	});
	return /* @__PURE__ */ p(Pt, {
		scope: r,
		disabled: o,
		contentId: J(),
		open: l,
		onOpenToggle: e.useCallback(() => u((e) => !e), [u]),
		children: /* @__PURE__ */ p(K.div, {
			"data-state": Ht(l),
			"data-disabled": o ? "" : void 0,
			...c,
			ref: n
		})
	});
});
It.displayName = jt;
var Lt = "CollapsibleTrigger", Rt = e.forwardRef((e, t) => {
	let { __scopeCollapsible: n, ...r } = e, i = Ft(Lt, n);
	return /* @__PURE__ */ p(K.button, {
		type: "button",
		"aria-controls": i.contentId,
		"aria-expanded": i.open || !1,
		"data-state": Ht(i.open),
		"data-disabled": i.disabled ? "" : void 0,
		disabled: i.disabled,
		...r,
		ref: t,
		onClick: W(e.onClick, i.onOpenToggle)
	});
});
Rt.displayName = Lt;
var zt = "CollapsibleContent", Bt = e.forwardRef((e, t) => {
	let { forceMount: n, ...r } = e, i = Ft(zt, e.__scopeCollapsible);
	return /* @__PURE__ */ p(q, {
		present: n || i.open,
		children: ({ present: e }) => /* @__PURE__ */ p(Vt, {
			...r,
			ref: t,
			present: e
		})
	});
});
Bt.displayName = zt;
var Vt = e.forwardRef((t, n) => {
	let { __scopeCollapsible: r, present: i, children: a, ...o } = t, s = Ft(zt, r), [c, l] = e.useState(i), u = e.useRef(null), d = U(n, u), f = e.useRef(0), m = f.current, h = e.useRef(0), g = h.current, _ = s.open || c, v = e.useRef(_), y = e.useRef(void 0);
	return e.useEffect(() => {
		let e = requestAnimationFrame(() => v.current = !1);
		return () => cancelAnimationFrame(e);
	}, []), G(() => {
		let e = u.current;
		if (e) {
			y.current = y.current || {
				transitionDuration: e.style.transitionDuration,
				animationName: e.style.animationName
			}, e.style.transitionDuration = "0s", e.style.animationName = "none";
			let t = e.getBoundingClientRect();
			f.current = t.height, h.current = t.width, v.current || (e.style.transitionDuration = y.current.transitionDuration, e.style.animationName = y.current.animationName), l(i);
		}
	}, [s.open, i]), /* @__PURE__ */ p(K.div, {
		"data-state": Ht(s.open),
		"data-disabled": s.disabled ? "" : void 0,
		id: s.contentId,
		hidden: !_,
		...o,
		ref: d,
		style: {
			"--radix-collapsible-content-height": m ? `${m}px` : void 0,
			"--radix-collapsible-content-width": g ? `${g}px` : void 0,
			...t.style
		},
		children: _ && a
	});
});
function Ht(e) {
	return e ? "open" : "closed";
}
var Ut = It, Wt = Rt, Gt = Bt, Kt = e.createContext(void 0);
function qt(t) {
	let n = e.useContext(Kt);
	return t || n || "ltr";
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-accordion@1.2.12_@types+react-dom@19.2.3_@types+react@19.2.14__@types+r_dd042184823cb7783b305fbc0c6ee2dd/node_modules/@radix-ui/react-accordion/dist/index.mjs
var Jt = "Accordion", Yt = [
	"Home",
	"End",
	"ArrowDown",
	"ArrowUp",
	"ArrowLeft",
	"ArrowRight"
], [Xt, Zt, Qt] = yt(Jt), [$t, en] = ct(Jt, [Qt, Nt]), tn = Nt(), nn = t.forwardRef((e, t) => {
	let { type: n, ...r } = e, i = r, a = r;
	return /* @__PURE__ */ p(Xt.Provider, {
		scope: e.__scopeAccordion,
		children: n === "multiple" ? /* @__PURE__ */ p(ln, {
			...a,
			ref: t
		}) : /* @__PURE__ */ p(cn, {
			...i,
			ref: t
		})
	});
});
nn.displayName = Jt;
var [rn, an] = $t(Jt), [on, sn] = $t(Jt, { collapsible: !1 }), cn = t.forwardRef((e, n) => {
	let { value: r, defaultValue: i, onValueChange: a = () => {}, collapsible: o = !1, ...s } = e, [c, l] = xt({
		prop: r,
		defaultProp: i ?? "",
		onChange: a,
		caller: Jt
	});
	return /* @__PURE__ */ p(rn, {
		scope: e.__scopeAccordion,
		value: t.useMemo(() => c ? [c] : [], [c]),
		onItemOpen: l,
		onItemClose: t.useCallback(() => o && l(""), [o, l]),
		children: /* @__PURE__ */ p(on, {
			scope: e.__scopeAccordion,
			collapsible: o,
			children: /* @__PURE__ */ p(fn, {
				...s,
				ref: n
			})
		})
	});
}), ln = t.forwardRef((e, n) => {
	let { value: r, defaultValue: i, onValueChange: a = () => {}, ...o } = e, [s, c] = xt({
		prop: r,
		defaultProp: i ?? [],
		onChange: a,
		caller: Jt
	}), l = t.useCallback((e) => c((t = []) => [...t, e]), [c]), u = t.useCallback((e) => c((t = []) => t.filter((t) => t !== e)), [c]);
	return /* @__PURE__ */ p(rn, {
		scope: e.__scopeAccordion,
		value: s,
		onItemOpen: l,
		onItemClose: u,
		children: /* @__PURE__ */ p(on, {
			scope: e.__scopeAccordion,
			collapsible: !0,
			children: /* @__PURE__ */ p(fn, {
				...o,
				ref: n
			})
		})
	});
}), [un, dn] = $t(Jt), fn = t.forwardRef((e, n) => {
	let { __scopeAccordion: r, disabled: i, dir: a, orientation: o = "vertical", ...s } = e, c = U(t.useRef(null), n), l = Zt(r), u = qt(a) === "ltr", d = W(e.onKeyDown, (e) => {
		if (!Yt.includes(e.key)) return;
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
	return /* @__PURE__ */ p(un, {
		scope: r,
		disabled: i,
		direction: a,
		orientation: o,
		children: /* @__PURE__ */ p(Xt.Slot, {
			scope: r,
			children: /* @__PURE__ */ p(K.div, {
				...s,
				"data-orientation": o,
				ref: c,
				onKeyDown: i ? void 0 : d
			})
		})
	});
}), pn = "AccordionItem", [mn, hn] = $t(pn), gn = t.forwardRef((e, t) => {
	let { __scopeAccordion: n, value: r, ...i } = e, a = dn(pn, n), o = an(pn, n), s = tn(n), c = J(), l = r && o.value.includes(r) || !1, u = a.disabled || e.disabled;
	return /* @__PURE__ */ p(mn, {
		scope: n,
		open: l,
		disabled: u,
		triggerId: c,
		children: /* @__PURE__ */ p(Ut, {
			"data-orientation": a.orientation,
			"data-state": Cn(l),
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
gn.displayName = pn;
var _n = "AccordionHeader", vn = t.forwardRef((e, t) => {
	let { __scopeAccordion: n, ...r } = e, i = dn(Jt, n), a = hn(_n, n);
	return /* @__PURE__ */ p(K.h3, {
		"data-orientation": i.orientation,
		"data-state": Cn(a.open),
		"data-disabled": a.disabled ? "" : void 0,
		...r,
		ref: t
	});
});
vn.displayName = _n;
var yn = "AccordionTrigger", bn = t.forwardRef((e, t) => {
	let { __scopeAccordion: n, ...r } = e, i = dn(Jt, n), a = hn(yn, n), o = sn(yn, n), s = tn(n);
	return /* @__PURE__ */ p(Xt.ItemSlot, {
		scope: n,
		children: /* @__PURE__ */ p(Wt, {
			"aria-disabled": a.open && !o.collapsible || void 0,
			"data-orientation": i.orientation,
			id: a.triggerId,
			...s,
			...r,
			ref: t
		})
	});
});
bn.displayName = yn;
var xn = "AccordionContent", Sn = t.forwardRef((e, t) => {
	let { __scopeAccordion: n, ...r } = e, i = dn(Jt, n), a = hn(xn, n), o = tn(n);
	return /* @__PURE__ */ p(Gt, {
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
Sn.displayName = xn;
function Cn(e) {
	return e ? "open" : "closed";
}
var wn = nn, Tn = gn, En = vn, Dn = bn, On = Sn, kn = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), An = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), jn = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()), Mn = (e) => {
	let t = jn(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, Nn = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
}, Pn = (e) => {
	for (let t in e) if (t.startsWith("aria-") || t === "role" || t === "title") return !0;
	return !1;
}, Fn = n({}), In = () => o(Fn), Ln = i(({ color: e, size: t, strokeWidth: n, absoluteStrokeWidth: i, className: a = "", children: o, iconNode: s, ...c }, l) => {
	let { size: u = 24, strokeWidth: d = 2, absoluteStrokeWidth: f = !1, color: p = "currentColor", className: m = "" } = In() ?? {}, h = i ?? f ? Number(n ?? d) * 24 / Number(t ?? u) : n ?? d;
	return r("svg", {
		ref: l,
		...Nn,
		width: t ?? u ?? Nn.width,
		height: t ?? u ?? Nn.height,
		stroke: e ?? p,
		strokeWidth: h,
		className: kn("lucide", m, a),
		...!o && !Pn(c) && { "aria-hidden": "true" },
		...c
	}, [...s.map(([e, t]) => r(e, t)), ...Array.isArray(o) ? o : [o]]);
}), Rn = (e, t) => {
	let n = i(({ className: n, ...i }, a) => r(Ln, {
		ref: a,
		iconNode: t,
		className: kn(`lucide-${An(Mn(e))}`, `lucide-${e}`, n),
		...i
	}));
	return n.displayName = Mn(e), n;
}, zn = Rn("arrow-down-right", [["path", {
	d: "m7 7 10 10",
	key: "1fmybs"
}], ["path", {
	d: "M17 7v10H7",
	key: "6fjiku"
}]]), Bn = Rn("arrow-up-right", [["path", {
	d: "M7 7h10v10",
	key: "1tivn9"
}], ["path", {
	d: "M7 17 17 7",
	key: "1vkiza"
}]]), Vn = Rn("bell", [["path", {
	d: "M10.268 21a2 2 0 0 0 3.464 0",
	key: "vwvbt9"
}], ["path", {
	d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
	key: "11g9vi"
}]]), Hn = Rn("calendar", [
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
]), Un = Rn("check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]), Wn = Rn("chevron-down", [["path", {
	d: "m6 9 6 6 6-6",
	key: "qrunsl"
}]]), Gn = Rn("chevron-left", [["path", {
	d: "m15 18-6-6 6-6",
	key: "1wnfg3"
}]]), Kn = Rn("chevron-right", [["path", {
	d: "m9 18 6-6-6-6",
	key: "mthhwq"
}]]), qn = Rn("chevron-up", [["path", {
	d: "m18 15-6-6-6 6",
	key: "153udz"
}]]), Jn = Rn("chevrons-up-down", [["path", {
	d: "m7 15 5 5 5-5",
	key: "1hf1tw"
}], ["path", {
	d: "m7 9 5-5 5 5",
	key: "sgt6xg"
}]]), Yn = Rn("circle-alert", [
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
]), Xn = Rn("circle-check", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]), Zn = Rn("circle", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}]]), Qn = Rn("ellipsis", [
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
]), $n = Rn("info", [
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
]), er = Rn("loader-circle", [["path", {
	d: "M21 12a9 9 0 1 1-6.219-8.56",
	key: "13zald"
}]]), tr = Rn("minus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}]]), nr = Rn("search", [["path", {
	d: "m21 21-4.34-4.34",
	key: "14j7rj"
}], ["circle", {
	cx: "11",
	cy: "11",
	r: "8",
	key: "4ej97u"
}]]), rr = Rn("triangle-alert", [
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
]), ir = Rn("user", [["path", {
	d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",
	key: "975kel"
}], ["circle", {
	cx: "12",
	cy: "7",
	r: "4",
	key: "17ys0d"
}]]), ar = Rn("x", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]), or = wn;
function sr({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p(Tn, {
		ref: t,
		className: H("border-b border-border-subtle", e),
		...n
	});
}
sr.displayName = "AccordionItem";
function cr({ className: e, children: t, ref: n, ...r }) {
	return /* @__PURE__ */ p(En, {
		className: "flex",
		children: /* @__PURE__ */ m(Dn, {
			ref: n,
			className: H("flex flex-1 items-center justify-between py-4 text-body-sm font-semibold text-content-primary", "transition-all duration-fast hover:text-content-brand", "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm", "[&[data-state=open]>svg]:rotate-180", e),
			...r,
			children: [t, /* @__PURE__ */ p(Wn, {
				className: "h-4 w-4 shrink-0 text-content-secondary transition-transform duration-base ease-out",
				"aria-hidden": "true"
			})]
		})
	});
}
cr.displayName = Dn.displayName;
function lr({ className: e, children: t, ref: n, ...r }) {
	return /* @__PURE__ */ p(On, {
		ref: n,
		className: "overflow-hidden text-body-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
		...r,
		children: /* @__PURE__ */ p("div", {
			className: H("pb-4 pt-0 text-content-secondary", e),
			children: t
		})
	});
}
lr.displayName = On.displayName;
//#endregion
//#region node_modules/.pnpm/class-variance-authority@0.7.1/node_modules/class-variance-authority/dist/index.mjs
var ur = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, dr = S, fr = (e, t) => (n) => {
	if (t?.variants == null) return dr(e, n?.class, n?.className);
	let { variants: r, defaultVariants: i } = t, a = Object.keys(r).map((e) => {
		let t = n?.[e], a = i?.[e];
		if (t === null) return null;
		let o = ur(t) || ur(a);
		return r[e][o];
	}), o = n && Object.entries(n).reduce((e, t) => {
		let [n, r] = t;
		return r === void 0 || (e[n] = r), e;
	}, {});
	return dr(e, a, t?.compoundVariants?.reduce((e, t) => {
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
}, pr = fr("relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:pl-7", {
	variants: { variant: {
		default: "bg-surface-raised border-border-default text-content-primary [&>svg]:text-content-secondary",
		info: "bg-feedback-info-bg border-feedback-info/30 text-content-primary [&>svg]:text-feedback-info",
		success: "bg-feedback-success-bg border-feedback-success/30 text-content-primary [&>svg]:text-feedback-success",
		warning: "bg-feedback-warning-bg border-feedback-warning/30 text-content-primary [&>svg]:text-feedback-warning",
		danger: "bg-feedback-danger-bg border-feedback-danger/30 text-content-primary [&>svg]:text-feedback-danger"
	} },
	defaultVariants: { variant: "default" }
}), mr = {
	default: $n,
	info: $n,
	success: Xn,
	warning: rr,
	danger: Yn
};
function hr({ className: e, variant: t = "default", showIcon: n = !0, children: r, ref: i, ...a }) {
	let o = mr[t ?? "default"];
	return /* @__PURE__ */ m("div", {
		ref: i,
		role: "alert",
		className: H(pr({ variant: t }), e),
		...a,
		children: [n && /* @__PURE__ */ p(o, {
			className: "h-4 w-4",
			"aria-hidden": "true"
		}), r]
	});
}
hr.displayName = "Alert";
function gr({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p("h5", {
		ref: t,
		className: H("mb-1 font-semibold text-body-sm leading-none tracking-tight", e),
		...n
	});
}
gr.displayName = "AlertTitle";
function _r({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p("div", {
		ref: t,
		className: H("text-body-sm text-content-secondary", e),
		...n
	});
}
_r.displayName = "AlertDescription";
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-context@1.1.3_@types+react@19.2.14_react@19.2.6/node_modules/@radix-ui/react-context/dist/index.mjs
function vr(t, n = []) {
	let r = [];
	function i(n, i) {
		let a = e.createContext(i);
		a.displayName = n + "Context";
		let o = r.length;
		r = [...r, i];
		let s = (n) => {
			let { scope: r, children: i, ...s } = n, c = r?.[t]?.[o] || a, l = e.useMemo(() => s, Object.values(s));
			return /* @__PURE__ */ p(c.Provider, {
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
	return a.scopeName = t, [i, yr(a, ...n)];
}
function yr(...t) {
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
//#region node_modules/.pnpm/@radix-ui+react-use-callback-ref@1.1.1_@types+react@19.2.14_react@19.2.6/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
function Y(t) {
	let n = e.useRef(t);
	return e.useEffect(() => {
		n.current = t;
	}), e.useMemo(() => (...e) => n.current?.(...e), []);
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-slot@1.2.4_@types+react@19.2.14_react@19.2.6/node_modules/@radix-ui/react-slot/dist/index.mjs
var br = Symbol.for("react.lazy"), xr = e.use;
function Sr(e) {
	return typeof e == "object" && !!e && "then" in e;
}
function Cr(e) {
	return typeof e == "object" && !!e && "$$typeof" in e && e.$$typeof === br && "_payload" in e && Sr(e._payload);
}
/* @__NO_SIDE_EFFECTS__ */
function wr(t) {
	let n = /* @__PURE__ */ Er(t), r = e.forwardRef((t, r) => {
		let { children: i, ...a } = t;
		Cr(i) && typeof xr == "function" && (i = xr(i._payload));
		let o = e.Children.toArray(i), s = o.find(Or);
		if (s) {
			let t = s.props.children, i = o.map((n) => n === s ? e.Children.count(t) > 1 ? e.Children.only(null) : e.isValidElement(t) ? t.props.children : null : n);
			return /* @__PURE__ */ p(n, {
				...a,
				ref: r,
				children: e.isValidElement(t) ? e.cloneElement(t, void 0, i) : null
			});
		}
		return /* @__PURE__ */ p(n, {
			...a,
			ref: r,
			children: i
		});
	});
	return r.displayName = `${t}.Slot`, r;
}
var Tr = /* @__PURE__ */ wr("Slot");
/* @__NO_SIDE_EFFECTS__ */
function Er(t) {
	let n = e.forwardRef((t, n) => {
		let { children: r, ...i } = t;
		if (Cr(r) && typeof xr == "function" && (r = xr(r._payload)), e.isValidElement(r)) {
			let t = Ar(r), a = kr(i, r.props);
			return r.type !== e.Fragment && (a.ref = n ? dt(n, t) : t), e.cloneElement(r, a);
		}
		return e.Children.count(r) > 1 ? e.Children.only(null) : null;
	});
	return n.displayName = `${t}.SlotClone`, n;
}
var Dr = Symbol("radix.slottable");
function Or(t) {
	return e.isValidElement(t) && typeof t.type == "function" && "__radixId" in t.type && t.type.__radixId === Dr;
}
function kr(e, t) {
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
function Ar(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-primitive@2.1.4_@types+react-dom@19.2.3_@types+react@19.2.14__@types+re_c8c8fd2647f03197dbf56370d7498033/node_modules/@radix-ui/react-primitive/dist/index.mjs
var jr = [
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
	let r = /* @__PURE__ */ wr(`Primitive.${n}`), i = e.forwardRef((e, t) => {
		let { asChild: i, ...a } = e, o = i ? r : n;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ p(o, {
			...a,
			ref: t
		});
	});
	return i.displayName = `Primitive.${n}`, {
		...t,
		[n]: i
	};
}, {}), Mr = /* @__PURE__ */ v(((e) => {
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
})), Nr = /* @__PURE__ */ v(((e) => {
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
})), Pr = (/* @__PURE__ */ v(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = Mr() : t.exports = Nr();
})))();
function Fr() {
	return (0, Pr.useSyncExternalStore)(Ir, () => !0, () => !1);
}
function Ir() {
	return () => {};
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-avatar@1.1.11_@types+react-dom@19.2.3_@types+react@19.2.14__@types+reac_d3a7eb52a6563c4e3d376047c206aa04/node_modules/@radix-ui/react-avatar/dist/index.mjs
var Lr = "Avatar", [Rr, zr] = vr(Lr), [Br, Vr] = Rr(Lr), Hr = e.forwardRef((t, n) => {
	let { __scopeAvatar: r, ...i } = t, [a, o] = e.useState("idle");
	return /* @__PURE__ */ p(Br, {
		scope: r,
		imageLoadingStatus: a,
		onImageLoadingStatusChange: o,
		children: /* @__PURE__ */ p(jr.span, {
			...i,
			ref: n
		})
	});
});
Hr.displayName = Lr;
var Ur = "AvatarImage", Wr = e.forwardRef((e, t) => {
	let { __scopeAvatar: n, src: r, onLoadingStatusChange: i = () => {}, ...a } = e, o = Vr(Ur, n), s = Jr(r, a), c = Y((e) => {
		i(e), o.onImageLoadingStatusChange(e);
	});
	return G(() => {
		s !== "idle" && c(s);
	}, [s, c]), s === "loaded" ? /* @__PURE__ */ p(jr.img, {
		...a,
		ref: t,
		src: r
	}) : null;
});
Wr.displayName = Ur;
var Gr = "AvatarFallback", Kr = e.forwardRef((t, n) => {
	let { __scopeAvatar: r, delayMs: i, ...a } = t, o = Vr(Gr, r), [s, c] = e.useState(i === void 0);
	return e.useEffect(() => {
		if (i !== void 0) {
			let e = window.setTimeout(() => c(!0), i);
			return () => window.clearTimeout(e);
		}
	}, [i]), s && o.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ p(jr.span, {
		...a,
		ref: n
	}) : null;
});
Kr.displayName = Gr;
function qr(e, t) {
	return e ? t ? (e.src !== t && (e.src = t), e.complete && e.naturalWidth > 0 ? "loaded" : "loading") : "error" : "idle";
}
function Jr(t, { referrerPolicy: n, crossOrigin: r }) {
	let i = Fr(), a = e.useRef(null), o = i ? (a.current ||= new window.Image(), a.current) : null, [s, c] = e.useState(() => qr(o, t));
	return G(() => {
		c(qr(o, t));
	}, [o, t]), G(() => {
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
var Yr = Hr, Xr = Wr, Zr = Kr, Qr = fr("relative flex shrink-0 overflow-hidden rounded-full", {
	variants: { size: {
		xs: "h-6 w-6 text-[10px]",
		sm: "h-8 w-8 text-xs",
		default: "h-10 w-10 text-sm",
		lg: "h-12 w-12 text-base",
		xl: "h-16 w-16 text-lg"
	} },
	defaultVariants: { size: "default" }
});
function $r({ className: e, size: t, ref: n, ...r }) {
	return /* @__PURE__ */ p(Yr, {
		ref: n,
		className: H(Qr({ size: t }), e),
		...r
	});
}
$r.displayName = Yr.displayName;
function ei(e) {
	let { className: t, ref: n, ...r } = e;
	return /* @__PURE__ */ p(Xr, {
		ref: n,
		className: H("aspect-square h-full w-full object-cover", t),
		...r
	});
}
ei.displayName = Xr.displayName;
function ti(e) {
	let { className: t, ref: n, ...r } = e;
	return /* @__PURE__ */ p(Zr, {
		ref: n,
		className: H("flex h-full w-full items-center justify-center rounded-full", "bg-primary text-primary-foreground font-semibold uppercase tracking-wide", t),
		...r
	});
}
ti.displayName = Zr.displayName;
var ni = ({ children: t, max: n, size: r = "default", className: i }) => {
	let a = e.Children.toArray(t), o = n ? a.slice(0, n) : a, s = n ? a.length - n : 0;
	return /* @__PURE__ */ m("div", {
		className: H("flex -space-x-2", i),
		role: "group",
		children: [o.map((t, n) => e.cloneElement(t, {
			key: n,
			size: r,
			className: H("ring-2 ring-surface-raised", t.props?.className ?? "")
		})), s > 0 && /* @__PURE__ */ p($r, {
			size: r,
			className: "ring-2 ring-surface-raised",
			children: /* @__PURE__ */ m(ti, { children: ["+", s] })
		})]
	});
};
ni.displayName = "AvatarGroup";
//#endregion
//#region src/components/ui/badge.tsx
var ri = fr("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function ii({ className: e, variant: t, ...n }) {
	return /* @__PURE__ */ p("div", {
		className: H(ri({ variant: t }), e),
		...n
	});
}
//#endregion
//#region src/components/ui/breadcrumb.tsx
function ai({ ref: e, ...t }) {
	return /* @__PURE__ */ p("nav", {
		ref: e,
		"aria-label": "breadcrumb",
		...t
	});
}
ai.displayName = "Breadcrumb";
function oi({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p("ol", {
		ref: t,
		className: H("flex flex-wrap items-center gap-1.5 break-words text-caption text-content-secondary sm:gap-2.5", e),
		...n
	});
}
oi.displayName = "BreadcrumbList";
function si({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p("li", {
		ref: t,
		className: H("inline-flex items-center gap-1.5", e),
		...n
	});
}
si.displayName = "BreadcrumbItem";
function ci({ asChild: e, className: t, ref: n, ...r }) {
	return /* @__PURE__ */ p("a", {
		ref: n,
		className: H("hover:text-content-primary transition-colors duration-fast", "focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring rounded-xs", t),
		...r
	});
}
ci.displayName = "BreadcrumbLink";
function li({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p("span", {
		ref: t,
		role: "link",
		"aria-disabled": "true",
		"aria-current": "page",
		className: H("font-semibold text-content-primary", e),
		...n
	});
}
li.displayName = "BreadcrumbPage";
var ui = ({ children: e, className: t, ...n }) => /* @__PURE__ */ p("li", {
	role: "presentation",
	"aria-hidden": "true",
	className: H("[&>svg]:size-3", t),
	...n,
	children: e ?? /* @__PURE__ */ p(Kn, {})
});
ui.displayName = "BreadcrumbSeparator";
var di = ({ className: e, ...t }) => /* @__PURE__ */ m("span", {
	role: "presentation",
	"aria-hidden": "true",
	className: H("flex h-9 w-9 items-center justify-center", e),
	...t,
	children: [/* @__PURE__ */ p(Qn, { className: "h-4 w-4" }), /* @__PURE__ */ p("span", {
		className: "sr-only",
		children: "More"
	})]
});
di.displayName = "BreadcrumbElipssis";
//#endregion
//#region src/components/ui/button.tsx
var fi = fr([
	"inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium",
	"transition-all duration-fast ease-out",
	"focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
	"disabled:pointer-events-none disabled:opacity-50",
	"[&_svg]:pointer-events-none [&_svg]:shrink-0",
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
			xs: "h-6 px-2 text-[11px] rounded-sm gap-1 [&_svg]:size-3",
			sm: "h-8 px-3 text-body-sm rounded-md gap-1.5 [&_svg]:size-3.5",
			default: "h-9 px-4 text-body-sm rounded-md [&_svg]:size-4",
			lg: "h-11 px-6 text-body rounded-lg [&_svg]:size-5",
			icon: "h-9 w-9 rounded-md [&_svg]:size-4",
			"icon-sm": "h-7 w-7 rounded-sm [&_svg]:size-3.5"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function pi({ className: e, variant: t, size: n, asChild: r = !1, loading: i = !1, iconLeft: a, iconRight: o, children: s, disabled: c, ref: l, ...u }) {
	return /* @__PURE__ */ m(r ? Tr : "button", {
		className: H(fi({
			variant: t,
			size: n,
			className: e
		})),
		ref: l,
		disabled: c || i,
		"aria-disabled": c || i,
		...u,
		children: [
			i ? /* @__PURE__ */ p(er, {
				className: "animate-spin",
				"aria-hidden": "true"
			}) : a && /* @__PURE__ */ p("span", {
				"aria-hidden": "true",
				children: a
			}),
			s,
			!i && o && /* @__PURE__ */ p("span", {
				"aria-hidden": "true",
				children: o
			})
		]
	});
}
//#endregion
//#region node_modules/.pnpm/@date-fns+tz@1.4.1/node_modules/@date-fns/tz/tzName/index.js
function mi(e, t, n = "long") {
	return new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		timeZone: e,
		timeZoneName: n
	}).format(t).split(/\s/g).slice(2).join(" ");
}
//#endregion
//#region node_modules/.pnpm/@date-fns+tz@1.4.1/node_modules/@date-fns/tz/tzOffset/index.js
var hi = {}, gi = {};
function _i(e, t) {
	try {
		let n = (hi[e] ||= new Intl.DateTimeFormat("en-US", {
			timeZone: e,
			timeZoneName: "longOffset"
		}).format)(t).split("GMT")[1];
		return n in gi ? gi[n] : yi(n, n.split(":"));
	} catch {
		if (e in gi) return gi[e];
		let t = e?.match(vi);
		return t ? yi(e, t.slice(1)) : NaN;
	}
}
var vi = /([+-]\d\d):?(\d\d)?/;
function yi(e, t) {
	let n = +(t[0] || 0), r = +(t[1] || 0), i = (t[2] || 0) / 60;
	return gi[e] = n * 60 + r > 0 ? n * 60 + r + i : n * 60 - r - i;
}
//#endregion
//#region node_modules/.pnpm/@date-fns+tz@1.4.1/node_modules/@date-fns/tz/date/mini.js
var bi = class e extends Date {
	constructor(...e) {
		super(), e.length > 1 && typeof e[e.length - 1] == "string" && (this.timeZone = e.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(_i(this.timeZone, this)) ? this.setTime(NaN) : e.length ? typeof e[0] == "number" && (e.length === 1 || e.length === 2 && typeof e[1] != "number") ? this.setTime(e[0]) : typeof e[0] == "string" ? this.setTime(+new Date(e[0])) : e[0] instanceof Date ? this.setTime(+e[0]) : (this.setTime(+new Date(...e)), wi(this, NaN), Si(this)) : this.setTime(Date.now());
	}
	static tz(t, ...n) {
		return n.length ? new e(...n, t) : new e(Date.now(), t);
	}
	withTimeZone(t) {
		return new e(+this, t);
	}
	getTimezoneOffset() {
		let e = -_i(this.timeZone, this);
		return e > 0 ? Math.floor(e) : Math.ceil(e);
	}
	setTime(e) {
		return Date.prototype.setTime.apply(this, arguments), Si(this), +this;
	}
	[Symbol.for("constructDateFrom")](t) {
		return new e(+new Date(t), this.timeZone);
	}
}, xi = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
	if (!xi.test(e)) return;
	let t = e.replace(xi, "$1UTC");
	bi.prototype[t] && (e.startsWith("get") ? bi.prototype[e] = function() {
		return this.internal[t]();
	} : (bi.prototype[e] = function() {
		return Date.prototype[t].apply(this.internal, arguments), Ci(this), +this;
	}, bi.prototype[t] = function() {
		return Date.prototype[t].apply(this, arguments), Si(this), +this;
	}));
});
function Si(e) {
	e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-_i(e.timeZone, e) * 60));
}
function Ci(e) {
	Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), wi(e);
}
function wi(e) {
	let t = _i(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
	r.setUTCHours(r.getUTCHours() - 1);
	let i = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), a = i - -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), o = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
	a && o && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + a);
	let s = i - n;
	s && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + s);
	let c = /* @__PURE__ */ new Date(+e);
	c.setUTCSeconds(0);
	let l = i > 0 ? c.getSeconds() : (c.getSeconds() - 60) % 60, u = Math.round(-(_i(e.timeZone, e) * 60)) % 60;
	(u || l) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + u), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + u + l));
	let d = _i(e.timeZone, e), f = d > 0 ? Math.floor(d) : Math.ceil(d), p = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - f, m = f !== n, h = p - s;
	if (m && h) {
		Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + h);
		let t = _i(e.timeZone, e), n = f - (t > 0 ? Math.floor(t) : Math.ceil(t));
		n && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + n), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + n));
	}
}
//#endregion
//#region node_modules/.pnpm/@date-fns+tz@1.4.1/node_modules/@date-fns/tz/date/index.js
var Ti = class e extends bi {
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
		return `${e} GMT${t}${n}${r} (${mi(this.timeZone, this)})`;
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
}, Ei = 365.2425, Di = 6048e5, Oi = 864e5, ki = 3600 * 24;
ki * 7, ki * Ei / 12 * 3;
var Ai = Symbol.for("constructDateFrom");
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/constructFrom.js
function ji(e, t) {
	return typeof e == "function" ? e(t) : e && typeof e == "object" && Ai in e ? e[Ai](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/toDate.js
function X(e, t) {
	return ji(t || e, e);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addDays.js
function Mi(e, t, n) {
	let r = X(e, n?.in);
	return isNaN(t) ? ji(n?.in || e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addMonths.js
function Ni(e, t, n) {
	let r = X(e, n?.in);
	if (isNaN(t)) return ji(n?.in || e, NaN);
	if (!t) return r;
	let i = r.getDate(), a = ji(n?.in || e, r.getTime());
	return a.setMonth(r.getMonth() + t + 1, 0), i >= a.getDate() ? a : (r.setFullYear(a.getFullYear(), a.getMonth(), i), r);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/defaultOptions.js
var Pi = {};
function Fi() {
	return Pi;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfWeek.js
function Ii(e, t) {
	let n = Fi(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, i = X(e, t?.in), a = i.getDay(), o = (a < r ? 7 : 0) + a - r;
	return i.setDate(i.getDate() - o), i.setHours(0, 0, 0, 0), i;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfISOWeek.js
function Li(e, t) {
	return Ii(e, {
		...t,
		weekStartsOn: 1
	});
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getISOWeekYear.js
function Ri(e, t) {
	let n = X(e, t?.in), r = n.getFullYear(), i = ji(n, 0);
	i.setFullYear(r + 1, 0, 4), i.setHours(0, 0, 0, 0);
	let a = Li(i), o = ji(n, 0);
	o.setFullYear(r, 0, 4), o.setHours(0, 0, 0, 0);
	let s = Li(o);
	return n.getTime() >= a.getTime() ? r + 1 : n.getTime() >= s.getTime() ? r : r - 1;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js
function zi(e) {
	let t = X(e), n = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()));
	return n.setUTCFullYear(t.getFullYear()), e - +n;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/normalizeDates.js
function Bi(e, ...t) {
	let n = ji.bind(null, e || t.find((e) => typeof e == "object"));
	return t.map(n);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfDay.js
function Vi(e, t) {
	let n = X(e, t?.in);
	return n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/differenceInCalendarDays.js
function Hi(e, t, n) {
	let [r, i] = Bi(n?.in, e, t), a = Vi(r), o = Vi(i), s = +a - zi(a), c = +o - zi(o);
	return Math.round((s - c) / Oi);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfISOWeekYear.js
function Ui(e, t) {
	let n = Ri(e, t), r = ji(t?.in || e, 0);
	return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), Li(r);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addWeeks.js
function Wi(e, t, n) {
	return Mi(e, t * 7, n);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/addYears.js
function Gi(e, t, n) {
	return Ni(e, t * 12, n);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/max.js
function Ki(e, t) {
	let n, r = t?.in;
	return e.forEach((e) => {
		!r && typeof e == "object" && (r = ji.bind(null, e));
		let t = X(e, r);
		(!n || n < t || isNaN(+t)) && (n = t);
	}), ji(r, n || NaN);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/min.js
function qi(e, t) {
	let n, r = t?.in;
	return e.forEach((e) => {
		!r && typeof e == "object" && (r = ji.bind(null, e));
		let t = X(e, r);
		(!n || n > t || isNaN(+t)) && (n = t);
	}), ji(r, n || NaN);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isSameDay.js
function Ji(e, t, n) {
	let [r, i] = Bi(n?.in, e, t);
	return +Vi(r) == +Vi(i);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isDate.js
function Yi(e) {
	return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isValid.js
function Xi(e) {
	return !(!Yi(e) && typeof e != "number" || isNaN(+X(e)));
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/differenceInCalendarMonths.js
function Zi(e, t, n) {
	let [r, i] = Bi(n?.in, e, t), a = r.getFullYear() - i.getFullYear(), o = r.getMonth() - i.getMonth();
	return a * 12 + o;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/endOfMonth.js
function Qi(e, t) {
	let n = X(e, t?.in), r = n.getMonth();
	return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/normalizeInterval.js
function $i(e, t) {
	let [n, r] = Bi(e, t.start, t.end);
	return {
		start: n,
		end: r
	};
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/eachMonthOfInterval.js
function ea(e, t) {
	let { start: n, end: r } = $i(t?.in, e), i = +n > +r, a = i ? +n : +r, o = i ? r : n;
	o.setHours(0, 0, 0, 0), o.setDate(1);
	let s = t?.step ?? 1;
	if (!s) return [];
	s < 0 && (s = -s, i = !i);
	let c = [];
	for (; +o <= a;) c.push(ji(n, o)), o.setMonth(o.getMonth() + s);
	return i ? c.reverse() : c;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfMonth.js
function ta(e, t) {
	let n = X(e, t?.in);
	return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/endOfYear.js
function na(e, t) {
	let n = X(e, t?.in), r = n.getFullYear();
	return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfYear.js
function ra(e, t) {
	let n = X(e, t?.in);
	return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/eachYearOfInterval.js
function ia(e, t) {
	let { start: n, end: r } = $i(t?.in, e), i = +n > +r, a = i ? +n : +r, o = i ? r : n;
	o.setHours(0, 0, 0, 0), o.setMonth(0, 1);
	let s = t?.step ?? 1;
	if (!s) return [];
	s < 0 && (s = -s, i = !i);
	let c = [];
	for (; +o <= a;) c.push(ji(n, o)), o.setFullYear(o.getFullYear() + s);
	return i ? c.reverse() : c;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/endOfWeek.js
function aa(e, t) {
	let n = Fi(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, i = X(e, t?.in), a = i.getDay(), o = (a < r ? -7 : 0) + 6 - (a - r);
	return i.setDate(i.getDate() + o), i.setHours(23, 59, 59, 999), i;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/endOfISOWeek.js
function oa(e, t) {
	return aa(e, {
		...t,
		weekStartsOn: 1
	});
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/en-US/_lib/formatDistance.js
var sa = {
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
}, ca = (e, t, n) => {
	let r, i = sa[e];
	return r = typeof i == "string" ? i : t === 1 ? i.one : i.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildFormatLongFn.js
function la(e) {
	return (t = {}) => {
		let n = t.width ? String(t.width) : e.defaultWidth;
		return e.formats[n] || e.formats[e.defaultWidth];
	};
}
var ua = {
	date: la({
		formats: {
			full: "EEEE, MMMM do, y",
			long: "MMMM do, y",
			medium: "MMM d, y",
			short: "MM/dd/yyyy"
		},
		defaultWidth: "full"
	}),
	time: la({
		formats: {
			full: "h:mm:ss a zzzz",
			long: "h:mm:ss a z",
			medium: "h:mm:ss a",
			short: "h:mm a"
		},
		defaultWidth: "full"
	}),
	dateTime: la({
		formats: {
			full: "{{date}} 'at' {{time}}",
			long: "{{date}} 'at' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, da = {
	lastWeek: "'last' eeee 'at' p",
	yesterday: "'yesterday at' p",
	today: "'today at' p",
	tomorrow: "'tomorrow at' p",
	nextWeek: "eeee 'at' p",
	other: "P"
}, fa = (e, t, n, r) => da[e];
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildLocalizeFn.js
function pa(e) {
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
var ma = {
	ordinalNumber: (e, t) => {
		let n = Number(e), r = n % 100;
		if (r > 20 || r < 10) switch (r % 10) {
			case 1: return n + "st";
			case 2: return n + "nd";
			case 3: return n + "rd";
		}
		return n + "th";
	},
	era: pa({
		values: {
			narrow: ["B", "A"],
			abbreviated: ["BC", "AD"],
			wide: ["Before Christ", "Anno Domini"]
		},
		defaultWidth: "wide"
	}),
	quarter: pa({
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
	month: pa({
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
	day: pa({
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
	dayPeriod: pa({
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
function ha(e) {
	return (t, n = {}) => {
		let r = n.width, i = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], a = t.match(i);
		if (!a) return null;
		let o = a[0], s = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(s) ? _a(s, (e) => e.test(o)) : ga(s, (e) => e.test(o)), l;
		l = e.valueCallback ? e.valueCallback(c) : c, l = n.valueCallback ? n.valueCallback(l) : l;
		let u = t.slice(o.length);
		return {
			value: l,
			rest: u
		};
	};
}
function ga(e, t) {
	for (let n in e) if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n])) return n;
}
function _a(e, t) {
	for (let n = 0; n < e.length; n++) if (t(e[n])) return n;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/_lib/buildMatchPatternFn.js
function va(e) {
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
var ya = {
	code: "en-US",
	formatDistance: ca,
	formatLong: ua,
	formatRelative: fa,
	localize: ma,
	match: {
		ordinalNumber: va({
			matchPattern: /^(\d+)(th|st|nd|rd)?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: ha({
			matchPatterns: {
				narrow: /^(b|a)/i,
				abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
				wide: /^(before christ|before common era|anno domini|common era)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^b/i, /^(a|c)/i] },
			defaultParseWidth: "any"
		}),
		quarter: ha({
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
		month: ha({
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
		day: ha({
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
		dayPeriod: ha({
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
function ba(e, t) {
	let n = X(e, t?.in);
	return Hi(n, ra(n)) + 1;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getISOWeek.js
function xa(e, t) {
	let n = X(e, t?.in), r = Li(n) - +Ui(n);
	return Math.round(r / Di) + 1;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getWeekYear.js
function Sa(e, t) {
	let n = X(e, t?.in), r = n.getFullYear(), i = Fi(), a = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? i.firstWeekContainsDate ?? i.locale?.options?.firstWeekContainsDate ?? 1, o = ji(t?.in || e, 0);
	o.setFullYear(r + 1, 0, a), o.setHours(0, 0, 0, 0);
	let s = Ii(o, t), c = ji(t?.in || e, 0);
	c.setFullYear(r, 0, a), c.setHours(0, 0, 0, 0);
	let l = Ii(c, t);
	return +n >= +s ? r + 1 : +n >= +l ? r : r - 1;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/startOfWeekYear.js
function Ca(e, t) {
	let n = Fi(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, i = Sa(e, t), a = ji(t?.in || e, 0);
	return a.setFullYear(i, 0, r), a.setHours(0, 0, 0, 0), Ii(a, t);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getWeek.js
function wa(e, t) {
	let n = X(e, t?.in), r = Ii(n, t) - +Ca(n, t);
	return Math.round(r / Di) + 1;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/addLeadingZeros.js
function Z(e, t) {
	return (e < 0 ? "-" : "") + Math.abs(e).toString().padStart(t, "0");
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/format/lightFormatters.js
var Ta = {
	y(e, t) {
		let n = e.getFullYear(), r = n > 0 ? n : 1 - n;
		return Z(t === "yy" ? r % 100 : r, t.length);
	},
	M(e, t) {
		let n = e.getMonth();
		return t === "M" ? String(n + 1) : Z(n + 1, 2);
	},
	d(e, t) {
		return Z(e.getDate(), t.length);
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
		return Z(e.getHours() % 12 || 12, t.length);
	},
	H(e, t) {
		return Z(e.getHours(), t.length);
	},
	m(e, t) {
		return Z(e.getMinutes(), t.length);
	},
	s(e, t) {
		return Z(e.getSeconds(), t.length);
	},
	S(e, t) {
		let n = t.length, r = e.getMilliseconds();
		return Z(Math.trunc(r * 10 ** (n - 3)), t.length);
	}
}, Ea = {
	am: "am",
	pm: "pm",
	midnight: "midnight",
	noon: "noon",
	morning: "morning",
	afternoon: "afternoon",
	evening: "evening",
	night: "night"
}, Da = {
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
		return Ta.y(e, t);
	},
	Y: function(e, t, n, r) {
		let i = Sa(e, r), a = i > 0 ? i : 1 - i;
		return t === "YY" ? Z(a % 100, 2) : t === "Yo" ? n.ordinalNumber(a, { unit: "year" }) : Z(a, t.length);
	},
	R: function(e, t) {
		return Z(Ri(e), t.length);
	},
	u: function(e, t) {
		return Z(e.getFullYear(), t.length);
	},
	Q: function(e, t, n) {
		let r = Math.ceil((e.getMonth() + 1) / 3);
		switch (t) {
			case "Q": return String(r);
			case "QQ": return Z(r, 2);
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
			case "qq": return Z(r, 2);
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
			case "MM": return Ta.M(e, t);
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
			case "LL": return Z(r + 1, 2);
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
		let i = wa(e, r);
		return t === "wo" ? n.ordinalNumber(i, { unit: "week" }) : Z(i, t.length);
	},
	I: function(e, t, n) {
		let r = xa(e);
		return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : Z(r, t.length);
	},
	d: function(e, t, n) {
		return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : Ta.d(e, t);
	},
	D: function(e, t, n) {
		let r = ba(e);
		return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : Z(r, t.length);
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
			case "ee": return Z(a, 2);
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
			case "cc": return Z(a, t.length);
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
			case "ii": return Z(i, t.length);
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
		switch (i = r === 12 ? Ea.noon : r === 0 ? Ea.midnight : r / 12 >= 1 ? "pm" : "am", t) {
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
		switch (i = r >= 17 ? Ea.evening : r >= 12 ? Ea.afternoon : r >= 4 ? Ea.morning : Ea.night, t) {
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
		return Ta.h(e, t);
	},
	H: function(e, t, n) {
		return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : Ta.H(e, t);
	},
	K: function(e, t, n) {
		let r = e.getHours() % 12;
		return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : Z(r, t.length);
	},
	k: function(e, t, n) {
		let r = e.getHours();
		return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : Z(r, t.length);
	},
	m: function(e, t, n) {
		return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : Ta.m(e, t);
	},
	s: function(e, t, n) {
		return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : Ta.s(e, t);
	},
	S: function(e, t) {
		return Ta.S(e, t);
	},
	X: function(e, t, n) {
		let r = e.getTimezoneOffset();
		if (r === 0) return "Z";
		switch (t) {
			case "X": return ka(r);
			case "XXXX":
			case "XX": return Aa(r);
			default: return Aa(r, ":");
		}
	},
	x: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "x": return ka(r);
			case "xxxx":
			case "xx": return Aa(r);
			default: return Aa(r, ":");
		}
	},
	O: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "O":
			case "OO":
			case "OOO": return "GMT" + Oa(r, ":");
			default: return "GMT" + Aa(r, ":");
		}
	},
	z: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "z":
			case "zz":
			case "zzz": return "GMT" + Oa(r, ":");
			default: return "GMT" + Aa(r, ":");
		}
	},
	t: function(e, t, n) {
		return Z(Math.trunc(e / 1e3), t.length);
	},
	T: function(e, t, n) {
		return Z(+e, t.length);
	}
};
function Oa(e, t = "") {
	let n = e > 0 ? "-" : "+", r = Math.abs(e), i = Math.trunc(r / 60), a = r % 60;
	return a === 0 ? n + String(i) : n + String(i) + t + Z(a, 2);
}
function ka(e, t) {
	return e % 60 == 0 ? (e > 0 ? "-" : "+") + Z(Math.abs(e) / 60, 2) : Aa(e, t);
}
function Aa(e, t = "") {
	let n = e > 0 ? "-" : "+", r = Math.abs(e), i = Z(Math.trunc(r / 60), 2), a = Z(r % 60, 2);
	return n + i + t + a;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/_lib/format/longFormatters.js
var ja = (e, t) => {
	switch (e) {
		case "P": return t.date({ width: "short" });
		case "PP": return t.date({ width: "medium" });
		case "PPP": return t.date({ width: "long" });
		default: return t.date({ width: "full" });
	}
}, Ma = (e, t) => {
	switch (e) {
		case "p": return t.time({ width: "short" });
		case "pp": return t.time({ width: "medium" });
		case "ppp": return t.time({ width: "long" });
		default: return t.time({ width: "full" });
	}
}, Na = {
	p: Ma,
	P: (e, t) => {
		let n = e.match(/(P+)(p+)?/) || [], r = n[1], i = n[2];
		if (!i) return ja(e, t);
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
		return a.replace("{{date}}", ja(r, t)).replace("{{time}}", Ma(i, t));
	}
}, Pa = /^D+$/, Fa = /^Y+$/, Ia = [
	"D",
	"DD",
	"YY",
	"YYYY"
];
function La(e) {
	return Pa.test(e);
}
function Ra(e) {
	return Fa.test(e);
}
function za(e, t, n) {
	let r = Ba(e, t, n);
	if (console.warn(r), Ia.includes(e)) throw RangeError(r);
}
function Ba(e, t, n) {
	let r = e[0] === "Y" ? "years" : "days of the month";
	return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/format.js
var Va = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Ha = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Ua = /^'([^]*?)'?$/, Wa = /''/g, Ga = /[a-zA-Z]/;
function Ka(e, t, n) {
	let r = Fi(), i = n?.locale ?? r.locale ?? ya, a = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, o = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, s = X(e, n?.in);
	if (!Xi(s)) throw RangeError("Invalid time value");
	let c = t.match(Ha).map((e) => {
		let t = e[0];
		if (t === "p" || t === "P") {
			let n = Na[t];
			return n(e, i.formatLong);
		}
		return e;
	}).join("").match(Va).map((e) => {
		if (e === "''") return {
			isToken: !1,
			value: "'"
		};
		let t = e[0];
		if (t === "'") return {
			isToken: !1,
			value: qa(e)
		};
		if (Da[t]) return {
			isToken: !0,
			value: e
		};
		if (t.match(Ga)) throw RangeError("Format string contains an unescaped latin alphabet character `" + t + "`");
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
		(!n?.useAdditionalWeekYearTokens && Ra(a) || !n?.useAdditionalDayOfYearTokens && La(a)) && za(a, t, String(e));
		let o = Da[a[0]];
		return o(s, a, i.localize, l);
	}).join("");
}
function qa(e) {
	let t = e.match(Ua);
	return t ? t[1].replace(Wa, "'") : e;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getDaysInMonth.js
function Ja(e, t) {
	let n = X(e, t?.in), r = n.getFullYear(), i = n.getMonth(), a = ji(n, 0);
	return a.setFullYear(r, i + 1, 0), a.setHours(0, 0, 0, 0), a.getDate();
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getMonth.js
function Ya(e, t) {
	return X(e, t?.in).getMonth();
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/getYear.js
function Xa(e, t) {
	return X(e, t?.in).getFullYear();
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isAfter.js
function Za(e, t) {
	return +X(e) > +X(t);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isBefore.js
function Qa(e, t) {
	return +X(e) < +X(t);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isSameMonth.js
function $a(e, t, n) {
	let [r, i] = Bi(n?.in, e, t);
	return r.getFullYear() === i.getFullYear() && r.getMonth() === i.getMonth();
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/isSameYear.js
function eo(e, t, n) {
	let [r, i] = Bi(n?.in, e, t);
	return r.getFullYear() === i.getFullYear();
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/setMonth.js
function to(e, t, n) {
	let r = X(e, n?.in), i = r.getFullYear(), a = r.getDate(), o = ji(n?.in || e, 0);
	o.setFullYear(i, t, 15), o.setHours(0, 0, 0, 0);
	let s = Ja(o);
	return r.setMonth(t, Math.min(a, s)), r;
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/setYear.js
function no(e, t, n) {
	let r = X(e, n?.in);
	return isNaN(+r) ? ji(n?.in || e, NaN) : (r.setFullYear(t), r);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getBroadcastWeeksInMonth.js
var ro = 5, io = 4;
function ao(e, t) {
	let n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, i = t.addDays(e, -r + 1), a = t.addDays(i, ro * 7 - 1);
	return t.getMonth(e) === t.getMonth(a) ? ro : io;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/startOfBroadcastWeek.js
function oo(e, t) {
	let n = t.startOfMonth(e), r = n.getDay();
	return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/endOfBroadcastWeek.js
function so(e, t) {
	let n = oo(e, t), r = ao(e, t);
	return t.addDays(n, r * 7 - 1);
}
//#endregion
//#region node_modules/.pnpm/date-fns@4.1.0/node_modules/date-fns/locale/id/_lib/formatDistance.js
var co = {
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
}, lo = (e, t, n) => {
	let r, i = co[e];
	return r = typeof i == "string" ? i : t === 1 ? i.one : i.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "dalam waktu " + r : r + " yang lalu" : r;
}, uo = {
	date: la({
		formats: {
			full: "EEEE, d MMMM yyyy",
			long: "d MMMM yyyy",
			medium: "d MMM yyyy",
			short: "d/M/yyyy"
		},
		defaultWidth: "full"
	}),
	time: la({
		formats: {
			full: "HH.mm.ss",
			long: "HH.mm.ss",
			medium: "HH.mm",
			short: "HH.mm"
		},
		defaultWidth: "full"
	}),
	dateTime: la({
		formats: {
			full: "{{date}} 'pukul' {{time}}",
			long: "{{date}} 'pukul' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, fo = {
	lastWeek: "eeee 'lalu pukul' p",
	yesterday: "'Kemarin pukul' p",
	today: "'Hari ini pukul' p",
	tomorrow: "'Besok pukul' p",
	nextWeek: "eeee 'pukul' p",
	other: "P"
}, po = {
	code: "id",
	formatDistance: lo,
	formatLong: uo,
	formatRelative: (e, t, n, r) => fo[e],
	localize: {
		ordinalNumber: (e, t) => "ke-" + Number(e),
		era: pa({
			values: {
				narrow: ["SM", "M"],
				abbreviated: ["SM", "M"],
				wide: ["Sebelum Masehi", "Masehi"]
			},
			defaultWidth: "wide"
		}),
		quarter: pa({
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
		month: pa({
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
		day: pa({
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
		dayPeriod: pa({
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
		ordinalNumber: va({
			matchPattern: /^ke-(\d+)?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: ha({
			matchPatterns: {
				narrow: /^(sm|m)/i,
				abbreviated: /^(s\.?\s?m\.?|s\.?\s?e\.?\s?u\.?|m\.?|e\.?\s?u\.?)/i,
				wide: /^(sebelum masehi|sebelum era umum|masehi|era umum)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^s/i, /^(m|e)/i] },
			defaultParseWidth: "any"
		}),
		quarter: ha({
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
		month: ha({
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
		day: ha({
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
		dayPeriod: ha({
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
}, mo = {
	...ya,
	labels: {
		labelDayButton: (e, t, n, r) => {
			let i;
			i = r && typeof r.format == "function" ? r.format.bind(r) : (e, t) => Ka(e, t, {
				locale: ya,
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
			return r = n && typeof n.format == "function" ? n.format.bind(n) : (e, n) => Ka(e, n, {
				locale: ya,
				...t
			}), r(e, "LLLL yyyy");
		},
		labelGridcell: (e, t, n, r) => {
			let i;
			i = r && typeof r.format == "function" ? r.format.bind(r) : (e, t) => Ka(e, t, {
				locale: ya,
				...n
			});
			let a = i(e, "PPPP");
			return t?.today && (a = `Today, ${a}`), a;
		},
		labelNav: "Navigation bar",
		labelWeekNumberHeader: "Week Number",
		labelWeekday: (e, t, n) => {
			let r;
			return r = n && typeof n.format == "function" ? n.format.bind(n) : (e, n) => Ka(e, n, {
				locale: ya,
				...t
			}), r(e, "cccc");
		}
	}
}, ho = class e {
	constructor(e, t) {
		this.Date = Date, this.today = () => this.overrides?.today ? this.overrides.today() : this.options.timeZone ? Ti.tz(this.options.timeZone) : new this.Date(), this.newDate = (e, t, n) => this.overrides?.newDate ? this.overrides.newDate(e, t, n) : this.options.timeZone ? new Ti(e, t, n, this.options.timeZone) : new Date(e, t, n), this.addDays = (e, t) => this.overrides?.addDays ? this.overrides.addDays(e, t) : Mi(e, t), this.addMonths = (e, t) => this.overrides?.addMonths ? this.overrides.addMonths(e, t) : Ni(e, t), this.addWeeks = (e, t) => this.overrides?.addWeeks ? this.overrides.addWeeks(e, t) : Wi(e, t), this.addYears = (e, t) => this.overrides?.addYears ? this.overrides.addYears(e, t) : Gi(e, t), this.differenceInCalendarDays = (e, t) => this.overrides?.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(e, t) : Hi(e, t), this.differenceInCalendarMonths = (e, t) => this.overrides?.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(e, t) : Zi(e, t), this.eachMonthOfInterval = (e) => this.overrides?.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(e) : ea(e), this.eachYearOfInterval = (e) => {
			let t = this.overrides?.eachYearOfInterval ? this.overrides.eachYearOfInterval(e) : ia(e), n = new Set(t.map((e) => this.getYear(e)));
			if (n.size === t.length) return t;
			let r = [];
			return n.forEach((e) => {
				r.push(new Date(e, 0, 1));
			}), r;
		}, this.endOfBroadcastWeek = (e) => this.overrides?.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(e) : so(e, this), this.endOfISOWeek = (e) => this.overrides?.endOfISOWeek ? this.overrides.endOfISOWeek(e) : oa(e), this.endOfMonth = (e) => this.overrides?.endOfMonth ? this.overrides.endOfMonth(e) : Qi(e), this.endOfWeek = (e, t) => this.overrides?.endOfWeek ? this.overrides.endOfWeek(e, t) : aa(e, this.options), this.endOfYear = (e) => this.overrides?.endOfYear ? this.overrides.endOfYear(e) : na(e), this.format = (e, t, n) => {
			let r = this.overrides?.format ? this.overrides.format(e, t, this.options) : Ka(e, t, this.options);
			return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(r) : r;
		}, this.getISOWeek = (e) => this.overrides?.getISOWeek ? this.overrides.getISOWeek(e) : xa(e), this.getMonth = (e, t) => this.overrides?.getMonth ? this.overrides.getMonth(e, this.options) : Ya(e, this.options), this.getYear = (e, t) => this.overrides?.getYear ? this.overrides.getYear(e, this.options) : Xa(e, this.options), this.getWeek = (e, t) => this.overrides?.getWeek ? this.overrides.getWeek(e, this.options) : wa(e, this.options), this.isAfter = (e, t) => this.overrides?.isAfter ? this.overrides.isAfter(e, t) : Za(e, t), this.isBefore = (e, t) => this.overrides?.isBefore ? this.overrides.isBefore(e, t) : Qa(e, t), this.isDate = (e) => this.overrides?.isDate ? this.overrides.isDate(e) : Yi(e), this.isSameDay = (e, t) => this.overrides?.isSameDay ? this.overrides.isSameDay(e, t) : Ji(e, t), this.isSameMonth = (e, t) => this.overrides?.isSameMonth ? this.overrides.isSameMonth(e, t) : $a(e, t), this.isSameYear = (e, t) => this.overrides?.isSameYear ? this.overrides.isSameYear(e, t) : eo(e, t), this.max = (e) => this.overrides?.max ? this.overrides.max(e) : Ki(e), this.min = (e) => this.overrides?.min ? this.overrides.min(e) : qi(e), this.setMonth = (e, t) => this.overrides?.setMonth ? this.overrides.setMonth(e, t) : to(e, t), this.setYear = (e, t) => this.overrides?.setYear ? this.overrides.setYear(e, t) : no(e, t), this.startOfBroadcastWeek = (e, t) => this.overrides?.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(e, this) : oo(e, this), this.startOfDay = (e) => this.overrides?.startOfDay ? this.overrides.startOfDay(e) : Vi(e), this.startOfISOWeek = (e) => this.overrides?.startOfISOWeek ? this.overrides.startOfISOWeek(e) : Li(e), this.startOfMonth = (e) => this.overrides?.startOfMonth ? this.overrides.startOfMonth(e) : ta(e), this.startOfWeek = (e, t) => this.overrides?.startOfWeek ? this.overrides.startOfWeek(e, this.options) : Ii(e, this.options), this.startOfYear = (e) => this.overrides?.startOfYear ? this.overrides.startOfYear(e) : ra(e), this.options = {
			locale: mo,
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
ho.yearFirstLocales = new Set([
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
var go = new ho(), _o = class {
	constructor(e, t, n = go) {
		this.date = e, this.displayMonth = t, this.outside = !!(t && !n.isSameMonth(e, t)), this.dateLib = n, this.isoDate = n.format(e, "yyyy-MM-dd"), this.displayMonthId = n.format(t, "yyyy-MM"), this.dateMonthId = n.format(e, "yyyy-MM");
	}
	isEqualTo(e) {
		return this.dateLib.isSameDay(e.date, this.date) && this.dateLib.isSameMonth(e.displayMonth, this.displayMonth);
	}
}, vo = class {
	constructor(e, t) {
		this.date = e, this.weeks = t;
	}
}, yo = class {
	constructor(e, t) {
		this.days = t, this.weekNumber = e;
	}
};
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/Button.js
function bo(e) {
	return t.createElement("button", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/CaptionLabel.js
function xo(e) {
	return t.createElement("span", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/Chevron.js
function So(e) {
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
function Co(e) {
	let { day: n, modifiers: r, ...i } = e;
	return t.createElement("td", { ...i });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/DayButton.js
function wo(e) {
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
var Q;
(function(e) {
	e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(Q ||= {});
var $;
(function(e) {
	e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})($ ||= {});
var To;
(function(e) {
	e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(To ||= {});
var Eo;
(function(e) {
	e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(Eo ||= {});
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/Dropdown.js
function Do(e) {
	let { options: n, className: r, components: i, classNames: a, ...o } = e, s = [a[Q.Dropdown], r].join(" "), c = n?.find(({ value: e }) => e === o.value);
	return t.createElement("span", {
		"data-disabled": o.disabled,
		className: a[Q.DropdownRoot]
	}, t.createElement(i.Select, {
		className: s,
		...o
	}, n?.map(({ value: e, label: n, disabled: r }) => t.createElement(i.Option, {
		key: e,
		value: e,
		disabled: r
	}, n))), t.createElement("span", {
		className: a[Q.CaptionLabel],
		"aria-hidden": !0
	}, c?.label, t.createElement(i.Chevron, {
		orientation: "down",
		size: 18,
		className: a[Q.Chevron]
	})));
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/DropdownNav.js
function Oo(e) {
	return t.createElement("div", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/Footer.js
function ko(e) {
	return t.createElement("div", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/Month.js
function Ao(e) {
	let { calendarMonth: n, displayIndex: r, ...i } = e;
	return t.createElement("div", { ...i }, e.children);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/MonthCaption.js
function jo(e) {
	let { calendarMonth: n, displayIndex: r, ...i } = e;
	return t.createElement("div", { ...i });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/MonthGrid.js
function Mo(e) {
	return t.createElement("table", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/Months.js
function No(e) {
	return t.createElement("div", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/useDayPicker.js
var Po = n(void 0);
function Fo() {
	let e = o(Po);
	if (e === void 0) throw Error("useDayPicker() must be used within a custom component.");
	return e;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/MonthsDropdown.js
function Io(e) {
	let { components: n } = Fo();
	return t.createElement(n.Dropdown, { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/Nav.js
function Lo(e) {
	let { onPreviousClick: n, onNextClick: r, previousMonth: i, nextMonth: o, ...s } = e, { components: c, classNames: l, labels: { labelPrevious: u, labelNext: d } } = Fo(), f = a((e) => {
		o && r?.(e);
	}, [o, r]), p = a((e) => {
		i && n?.(e);
	}, [i, n]);
	return t.createElement("nav", { ...s }, t.createElement(c.PreviousMonthButton, {
		type: "button",
		className: l[Q.PreviousMonthButton],
		tabIndex: i ? void 0 : -1,
		"aria-disabled": i ? void 0 : !0,
		"aria-label": u(i),
		onClick: p
	}, t.createElement(c.Chevron, {
		disabled: i ? void 0 : !0,
		className: l[Q.Chevron],
		orientation: "left"
	})), t.createElement(c.NextMonthButton, {
		type: "button",
		className: l[Q.NextMonthButton],
		tabIndex: o ? void 0 : -1,
		"aria-disabled": o ? void 0 : !0,
		"aria-label": d(o),
		onClick: f
	}, t.createElement(c.Chevron, {
		disabled: o ? void 0 : !0,
		orientation: "right",
		className: l[Q.Chevron]
	})));
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/NextMonthButton.js
function Ro(e) {
	let { components: n } = Fo();
	return t.createElement(n.Button, { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/Option.js
function zo(e) {
	return t.createElement("option", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/PreviousMonthButton.js
function Bo(e) {
	let { components: n } = Fo();
	return t.createElement(n.Button, { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/Root.js
function Vo(e) {
	let { rootRef: n, ...r } = e;
	return t.createElement("div", {
		...r,
		ref: n
	});
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/Select.js
function Ho(e) {
	return t.createElement("select", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/Week.js
function Uo(e) {
	let { week: n, ...r } = e;
	return t.createElement("tr", { ...r });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/Weekday.js
function Wo(e) {
	return t.createElement("th", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/Weekdays.js
function Go(e) {
	return t.createElement("thead", { "aria-hidden": !0 }, t.createElement("tr", { ...e }));
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/WeekNumber.js
function Ko(e) {
	let { week: n, ...r } = e;
	return t.createElement("th", { ...r });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/WeekNumberHeader.js
function qo(e) {
	return t.createElement("th", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/Weeks.js
function Jo(e) {
	return t.createElement("tbody", { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/YearsDropdown.js
function Yo(e) {
	let { components: n } = Fo();
	return t.createElement(n.Dropdown, { ...e });
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/components/custom-components.js
var Xo = /* @__PURE__ */ y({
	Button: () => bo,
	CaptionLabel: () => xo,
	Chevron: () => So,
	Day: () => Co,
	DayButton: () => wo,
	Dropdown: () => Do,
	DropdownNav: () => Oo,
	Footer: () => ko,
	Month: () => Ao,
	MonthCaption: () => jo,
	MonthGrid: () => Mo,
	Months: () => No,
	MonthsDropdown: () => Io,
	Nav: () => Lo,
	NextMonthButton: () => Ro,
	Option: () => zo,
	PreviousMonthButton: () => Bo,
	Root: () => Vo,
	Select: () => Ho,
	Week: () => Uo,
	WeekNumber: () => Ko,
	WeekNumberHeader: () => qo,
	Weekday: () => Wo,
	Weekdays: () => Go,
	Weeks: () => Jo,
	YearsDropdown: () => Yo
});
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/utils/rangeIncludesDate.js
function Zo(e, t, n = !1, r = go) {
	let { from: i, to: a } = e, { differenceInCalendarDays: o, isSameDay: s } = r;
	return i && a ? (o(a, i) < 0 && ([i, a] = [a, i]), o(t, i) >= +!!n && o(a, t) >= +!!n) : !n && a ? s(a, t) : !n && i ? s(i, t) : !1;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/utils/typeguards.js
function Qo(e) {
	return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function $o(e) {
	return !!(e && typeof e == "object" && "from" in e);
}
function es(e) {
	return !!(e && typeof e == "object" && "after" in e);
}
function ts(e) {
	return !!(e && typeof e == "object" && "before" in e);
}
function ns(e) {
	return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function rs(e, t) {
	return Array.isArray(e) && e.every(t.isDate);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/utils/dateMatchModifiers.js
function is(e, t, n = go) {
	let r = Array.isArray(t) ? t : [t], { isSameDay: i, differenceInCalendarDays: a, isAfter: o } = n;
	return r.some((t) => {
		if (typeof t == "boolean") return t;
		if (n.isDate(t)) return i(e, t);
		if (rs(t, n)) return t.some((t) => i(e, t));
		if ($o(t)) return Zo(t, e, !1, n);
		if (ns(t)) return Array.isArray(t.dayOfWeek) ? t.dayOfWeek.includes(e.getDay()) : t.dayOfWeek === e.getDay();
		if (Qo(t)) {
			let n = a(t.before, e), r = a(t.after, e), i = n > 0, s = r < 0;
			return o(t.before, t.after) ? s && i : i || s;
		}
		return es(t) ? a(e, t.after) > 0 : ts(t) ? a(t.before, e) > 0 : typeof t == "function" ? t(e) : !1;
	});
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/createGetModifiers.js
function as(e, t, n, r, i) {
	let { disabled: a, hidden: o, modifiers: s, showOutsideDays: c, broadcastCalendar: l, today: u = i.today() } = t, { isSameDay: d, isSameMonth: f, startOfMonth: p, isBefore: m, endOfMonth: h, isAfter: g } = i, _ = n && p(n), v = r && h(r), y = {
		[$.focused]: [],
		[$.outside]: [],
		[$.disabled]: [],
		[$.hidden]: [],
		[$.today]: []
	}, b = {};
	for (let t of e) {
		let { date: e, displayMonth: n } = t, r = !!(n && !f(e, n)), p = !!(_ && m(e, _)), h = !!(v && g(e, v)), x = !!(a && is(e, a, i)), S = !!(o && is(e, o, i)) || p || h || !l && !c && r || l && c === !1 && r, C = d(e, u);
		r && y.outside.push(t), x && y.disabled.push(t), S && y.hidden.push(t), C && y.today.push(t), s && Object.keys(s).forEach((n) => {
			let r = s?.[n];
			r && is(e, r, i) && (b[n] ? b[n].push(t) : b[n] = [t]);
		});
	}
	return (e) => {
		let t = {
			[$.focused]: !1,
			[$.disabled]: !1,
			[$.hidden]: !1,
			[$.outside]: !1,
			[$.today]: !1
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
function os(e, t, n = {}) {
	return Object.entries(e).filter(([, e]) => e === !0).reduce((e, [r]) => (n[r] ? e.push(n[r]) : t[$[r]] ? e.push(t[$[r]]) : t[To[r]] && e.push(t[To[r]]), e), [t[Q.Day]]);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getComponents.js
function ss(e) {
	return {
		...Xo,
		...e
	};
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getDataAttributes.js
function cs(e) {
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
function ls() {
	let e = {};
	for (let t in Q) e[Q[t]] = `rdp-${Q[t]}`;
	for (let t in $) e[$[t]] = `rdp-${$[t]}`;
	for (let t in To) e[To[t]] = `rdp-${To[t]}`;
	for (let t in Eo) e[Eo[t]] = `rdp-${Eo[t]}`;
	return e;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/formatters/formatCaption.js
function us(e, t, n) {
	return (n ?? new ho(t)).formatMonthYear(e);
}
var ds = us;
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/formatters/formatDay.js
function fs(e, t, n) {
	return (n ?? new ho(t)).format(e, "d");
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/formatters/formatMonthDropdown.js
function ps(e, t = go) {
	return t.format(e, "LLLL");
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/formatters/formatWeekdayName.js
function ms(e, t, n) {
	return (n ?? new ho(t)).format(e, "cccccc");
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/formatters/formatWeekNumber.js
function hs(e, t = go) {
	return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/formatters/formatWeekNumberHeader.js
function gs() {
	return "";
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/formatters/formatYearDropdown.js
function _s(e, t = go) {
	return t.format(e, "yyyy");
}
var vs = _s, ys = /* @__PURE__ */ y({
	formatCaption: () => us,
	formatDay: () => fs,
	formatMonthCaption: () => ds,
	formatMonthDropdown: () => ps,
	formatWeekNumber: () => hs,
	formatWeekNumberHeader: () => gs,
	formatWeekdayName: () => ms,
	formatYearCaption: () => vs,
	formatYearDropdown: () => _s
});
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getFormatters.js
function bs(e) {
	return e?.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e?.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
		...ys,
		...e
	};
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/labels/labelDayButton.js
function xs(e, t, n, r) {
	let i = (r ?? new ho(n)).format(e, "PPPP");
	return t.today && (i = `Today, ${i}`), t.selected && (i = `${i}, selected`), i;
}
var Ss = xs;
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/labels/labelGrid.js
function Cs(e, t, n) {
	return (n ?? new ho(t)).formatMonthYear(e);
}
var ws = Cs;
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/labels/labelGridcell.js
function Ts(e, t, n, r) {
	let i = (r ?? new ho(n)).format(e, "PPPP");
	return t?.today && (i = `Today, ${i}`), i;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/labels/labelMonthDropdown.js
function Es(e) {
	return "Choose the Month";
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/labels/labelNav.js
function Ds() {
	return "";
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/labels/labelNext.js
var Os = "Go to the Next Month";
function ks(e, t) {
	return Os;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/labels/labelPrevious.js
function As(e) {
	return "Go to the Previous Month";
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/labels/labelWeekday.js
function js(e, t, n) {
	return (n ?? new ho(t)).format(e, "cccc");
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/labels/labelWeekNumber.js
function Ms(e, t) {
	return `Week ${e}`;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/labels/labelWeekNumberHeader.js
function Ns(e) {
	return "Week Number";
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/labels/labelYearDropdown.js
function Ps(e) {
	return "Choose the Year";
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/labels/index.js
var Fs = /* @__PURE__ */ y({
	labelCaption: () => ws,
	labelDay: () => Ss,
	labelDayButton: () => xs,
	labelGrid: () => Cs,
	labelGridcell: () => Ts,
	labelMonthDropdown: () => Es,
	labelNav: () => Ds,
	labelNext: () => ks,
	labelPrevious: () => As,
	labelWeekNumber: () => Ms,
	labelWeekNumberHeader: () => Ns,
	labelWeekday: () => js,
	labelYearDropdown: () => Ps
}), Is = (e, t, n) => t || (n ? typeof n == "function" ? n : (...e) => n : e);
function Ls(e, t) {
	let n = t.locale?.labels ?? {};
	return {
		...Fs,
		...e ?? {},
		labelDayButton: Is(xs, e?.labelDayButton, n.labelDayButton),
		labelMonthDropdown: Is(Es, e?.labelMonthDropdown, n.labelMonthDropdown),
		labelNext: Is(ks, e?.labelNext, n.labelNext),
		labelPrevious: Is(As, e?.labelPrevious, n.labelPrevious),
		labelWeekNumber: Is(Ms, e?.labelWeekNumber, n.labelWeekNumber),
		labelYearDropdown: Is(Ps, e?.labelYearDropdown, n.labelYearDropdown),
		labelGrid: Is(Cs, e?.labelGrid, n.labelGrid),
		labelGridcell: Is(Ts, e?.labelGridcell, n.labelGridcell),
		labelNav: Is(Ds, e?.labelNav, n.labelNav),
		labelWeekNumberHeader: Is(Ns, e?.labelWeekNumberHeader, n.labelWeekNumberHeader),
		labelWeekday: Is(js, e?.labelWeekday, n.labelWeekday)
	};
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getMonthOptions.js
function Rs(e, t, n, r, i) {
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
function zs(e, t = {}, n = {}) {
	let r = { ...t?.[Q.Day] };
	return Object.entries(e).filter(([, e]) => e === !0).forEach(([e]) => {
		r = {
			...r,
			...n?.[e]
		};
	}), r;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getWeekdays.js
function Bs(e, t, n, r) {
	let i = r ?? e.today(), a = n ? e.startOfBroadcastWeek(i, e) : t ? e.startOfISOWeek(i) : e.startOfWeek(i), o = [];
	for (let t = 0; t < 7; t++) {
		let n = e.addDays(a, t);
		o.push(n);
	}
	return o;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getYearOptions.js
function Vs(e, t, n, r, i = !1) {
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
function Hs(e, t = {}) {
	let { weekStartsOn: n, locale: r } = t, i = n ?? r?.options?.weekStartsOn ?? 0, a = (t) => {
		let n = typeof t == "number" || typeof t == "string" ? new Date(t) : t;
		return new Ti(n.getFullYear(), n.getMonth(), n.getDate(), 12, 0, 0, e);
	}, o = (e) => {
		let t = a(e);
		return new Date(t.getFullYear(), t.getMonth(), t.getDate(), 0, 0, 0, 0);
	};
	return {
		today: () => a(Ti.tz(e)),
		newDate: (t, n, r) => new Ti(t, n, r, 12, 0, 0, e),
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
			let n = a(t.start), r = a(t.end), i = [], o = new Ti(n.getFullYear(), n.getMonth(), 1, 12, 0, 0, e), s = r.getFullYear() * 12 + r.getMonth();
			for (; o.getFullYear() * 12 + o.getMonth() <= s;) i.push(new Ti(o, e)), o.setMonth(o.getMonth() + 1, 1);
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
			let n = a(t.start), r = a(t.end), i = [], o = new Ti(n.getFullYear(), 0, 1, 12, 0, 0, e);
			for (; o.getFullYear() <= r.getFullYear();) i.push(new Ti(o, e)), o.setFullYear(o.getFullYear() + 1, 0, 1);
			return i;
		},
		getWeek: (e, t) => wa(o(e), {
			weekStartsOn: t?.weekStartsOn ?? i,
			firstWeekContainsDate: t?.firstWeekContainsDate ?? r?.options?.firstWeekContainsDate ?? 1
		}),
		getISOWeek: (e) => xa(o(e)),
		differenceInCalendarDays: (e, t) => Hi(o(e), o(t)),
		differenceInCalendarMonths: (e, t) => Zi(o(e), o(t))
	};
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/useAnimation.js
var Us = (e) => e instanceof HTMLElement ? e : null, Ws = (e) => [...e.querySelectorAll("[data-animated-month]") ?? []], Gs = (e) => Us(e.querySelector("[data-animated-month]")), Ks = (e) => Us(e.querySelector("[data-animated-caption]")), qs = (e) => Us(e.querySelector("[data-animated-weeks]")), Js = (e) => Us(e.querySelector("[data-animated-nav]")), Ys = (e) => Us(e.querySelector("[data-animated-weekdays]"));
function Xs(e, t, { classNames: n, months: r, focused: i, dateLib: a }) {
	let o = u(null), s = u(r), l = u(!1);
	c(() => {
		let c = s.current;
		if (s.current = r, !t || !e.current || !(e.current instanceof HTMLElement) || r.length === 0 || c.length === 0 || r.length !== c.length) return;
		let u = a.isSameMonth(r[0].date, c[0].date), d = a.isAfter(r[0].date, c[0].date), f = d ? n[Eo.caption_after_enter] : n[Eo.caption_before_enter], p = d ? n[Eo.weeks_after_enter] : n[Eo.weeks_before_enter], m = o.current, h = e.current.cloneNode(!0);
		if (h instanceof HTMLElement ? (Ws(h).forEach((e) => {
			if (!(e instanceof HTMLElement)) return;
			let t = Gs(e);
			t && e.contains(t) && e.removeChild(t);
			let n = Ks(e);
			n && n.classList.remove(f);
			let r = qs(e);
			r && r.classList.remove(p);
		}), o.current = h) : o.current = null, l.current || u || i) return;
		let g = m instanceof HTMLElement ? Ws(m) : [], _ = Ws(e.current);
		if (_?.every((e) => e instanceof HTMLElement) && g && g.every((e) => e instanceof HTMLElement)) {
			l.current = !0;
			let t = [];
			e.current.style.isolation = "isolate";
			let r = Js(e.current);
			r && (r.style.zIndex = "1"), _.forEach((i, a) => {
				let o = g[a];
				if (!o) return;
				i.style.position = "relative", i.style.overflow = "hidden";
				let s = Ks(i);
				s && s.classList.add(f);
				let c = qs(i);
				c && c.classList.add(p);
				let u = () => {
					l.current = !1, e.current && (e.current.style.isolation = ""), r && (r.style.zIndex = ""), s && s.classList.remove(f), c && c.classList.remove(p), i.style.position = "", i.style.overflow = "", i.contains(o) && i.removeChild(o);
				};
				t.push(u), o.style.pointerEvents = "none", o.style.position = "absolute", o.style.overflow = "hidden", o.setAttribute("aria-hidden", "true");
				let m = Ys(o);
				m && (m.style.opacity = "0");
				let h = Ks(o);
				h && (h.classList.add(d ? n[Eo.caption_before_exit] : n[Eo.caption_after_exit]), h.addEventListener("animationend", u));
				let _ = qs(o);
				_ && _.classList.add(d ? n[Eo.weeks_before_exit] : n[Eo.weeks_after_exit]), i.insertBefore(o, i.firstChild);
			});
		}
	});
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getDates.js
function Zs(e, t, n, r) {
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
function Qs(e) {
	let t = [];
	return e.reduce((e, n) => {
		let r = n.weeks.reduce((e, t) => e.concat(t.days.slice()), t.slice());
		return e.concat(r.slice());
	}, t.slice());
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getDisplayMonths.js
function $s(e, t, n, r) {
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
function ec(e, t, n, r) {
	let { month: i, defaultMonth: a, today: o = r.today(), numberOfMonths: s = 1 } = e, c = i || a || o, { differenceInCalendarMonths: l, addMonths: u, startOfMonth: d } = r;
	return n && l(n, c) < s - 1 && (c = u(n, -1 * (s - 1))), t && l(c, t) < 0 && (c = t), d(c);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getMonths.js
function tc(e, t, n, r) {
	let { addDays: i, endOfBroadcastWeek: a, endOfISOWeek: o, endOfMonth: s, endOfWeek: c, getISOWeek: l, getWeek: u, startOfBroadcastWeek: d, startOfISOWeek: f, startOfWeek: p } = r, m = e.reduce((e, m) => {
		let h = n.broadcastCalendar ? d(m, r) : n.ISOWeek ? f(m) : p(m), g = n.broadcastCalendar ? a(m) : n.ISOWeek ? o(s(m)) : c(s(m)), _ = t.filter((e) => e >= h && e <= g), v = n.broadcastCalendar ? 35 : 42;
		if (n.fixedWeeks && _.length < v) {
			let e = t.filter((e) => {
				let t = v - _.length;
				return e > g && e <= i(g, t);
			});
			_.push(...e);
		}
		let y = new vo(m, _.reduce((e, t) => {
			let i = n.ISOWeek ? l(t) : u(t), a = e.find((e) => e.weekNumber === i), o = new _o(t, m, r);
			return a ? a.days.push(o) : e.push(new yo(i, [o])), e;
		}, []));
		return e.push(y), e;
	}, []);
	return n.reverseMonths ? m.reverse() : m;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getNavMonth.js
function nc(e, t) {
	let { startMonth: n, endMonth: r } = e, { startOfYear: i, startOfDay: a, startOfMonth: o, endOfMonth: s, addYears: c, endOfYear: l, newDate: u, today: d } = t, { fromYear: f, toYear: p, fromMonth: m, toMonth: h } = e;
	!n && m && (n = m), !n && f && (n = t.newDate(f, 0, 1)), !r && h && (r = h), !r && p && (r = u(p, 11, 31));
	let g = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
	return n ? n = o(n) : f ? n = u(f, 0, 1) : !n && g && (n = i(c(e.today ?? d(), -100))), r ? r = s(r) : p ? r = u(p, 11, 31) : !r && g && (r = l(e.today ?? d())), [n && a(n), r && a(r)];
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getNextMonth.js
function rc(e, t, n, r) {
	if (n.disableNavigation) return;
	let { pagedNavigation: i, numberOfMonths: a = 1 } = n, { startOfMonth: o, addMonths: s, differenceInCalendarMonths: c } = r, l = i ? a : 1, u = o(e);
	if (!t || !(c(t, e) < a)) return s(u, l);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getPreviousMonth.js
function ic(e, t, n, r) {
	if (n.disableNavigation) return;
	let { pagedNavigation: i, numberOfMonths: a } = n, { startOfMonth: o, addMonths: s, differenceInCalendarMonths: c } = r, l = i ? a ?? 1 : 1, u = o(e);
	if (!t || !(c(u, t) <= 0)) return s(u, -l);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getWeeks.js
function ac(e) {
	return e.reduce((e, t) => e.concat(t.weeks.slice()), [].slice());
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/useControlledValue.js
function oc(e, t) {
	let [n, r] = d(e);
	return [t === void 0 ? n : t, r];
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/useCalendar.js
function sc(e, t) {
	let [n, r] = nc(e, t), { startOfMonth: i, endOfMonth: a } = t, o = ec(e, n, r, t), [c, u] = oc(o, e.month ? o : void 0);
	s(() => {
		u(ec(e, n, r, t));
	}, [e.timeZone]);
	let { months: d, weeks: f, days: p, previousMonth: m, nextMonth: h } = l(() => {
		let i = $s(c, r, { numberOfMonths: e.numberOfMonths }, t), o = tc(i, Zs(i, e.endMonth ? a(e.endMonth) : void 0, {
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
			weeks: ac(o),
			days: Qs(o),
			previousMonth: ic(c, n, e, t),
			nextMonth: rc(c, r, e, t)
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
var cc;
(function(e) {
	e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(cc ||= {});
function lc(e) {
	return !e[$.disabled] && !e[$.hidden] && !e[$.outside];
}
function uc(e, t, n, r) {
	let i, a = -1;
	for (let o of e) {
		let e = t(o);
		lc(e) && (e[$.focused] && a < cc.FocusedModifier ? (i = o, a = cc.FocusedModifier) : r?.isEqualTo(o) && a < cc.LastFocused ? (i = o, a = cc.LastFocused) : n(o.date) && a < cc.Selected ? (i = o, a = cc.Selected) : e[$.today] && a < cc.Today && (i = o, a = cc.Today));
	}
	return i ||= e.find((e) => lc(t(e))), i;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/helpers/getFocusableDate.js
function dc(e, t, n, r, i, a, o) {
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
function fc(e, t, n, r, i, a, o, s = 0) {
	if (s > 365) return;
	let c = dc(e, t, n.date, r, i, a, o), l = !!(a.disabled && is(c, a.disabled, o)), u = !!(a.hidden && is(c, a.hidden, o)), d = new _o(c, c, o);
	return !l && !u ? d : fc(e, t, d, r, i, a, o, s + 1);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/useFocus.js
function pc(e, t, n, r, i) {
	let { autoFocus: a } = e, [o, s] = d(), c = uc(t.days, n, r || (() => !1), o), [l, u] = d(a ? c : void 0);
	return {
		isFocusTarget: (e) => !!c?.isEqualTo(e),
		setFocused: u,
		focused: l,
		blur: () => {
			s(l), u(void 0);
		},
		moveFocus: (n, r) => {
			if (!l) return;
			let a = fc(n, r, l, t.navStart, t.navEnd, e, i);
			a && (e.disableNavigation && !t.days.some((e) => e.isEqualTo(a)) || (t.goToDay(a), u(a)));
		}
	};
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/selection/useMulti.js
function mc(e, t) {
	let { selected: n, required: r, onSelect: i } = e, [a, o] = oc(n, i ? n : void 0), s = i ? n : a, { isSameDay: c } = t, l = (e) => s?.some((t) => c(t, e)) ?? !1, { min: u, max: d } = e;
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
function hc(e, t, n = 0, r = 0, i = !1, a = go) {
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
function gc(e, t, n = go) {
	let r = Array.isArray(t) ? t : [t], i = e.from, a = n.differenceInCalendarDays(e.to, e.from), o = Math.min(a, 6);
	for (let e = 0; e <= o; e++) {
		if (r.includes(i.getDay())) return !0;
		i = n.addDays(i, 1);
	}
	return !1;
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/utils/rangeOverlaps.js
function _c(e, t, n = go) {
	return Zo(e, t.from, !1, n) || Zo(e, t.to, !1, n) || Zo(t, e.from, !1, n) || Zo(t, e.to, !1, n);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/utils/rangeContainsModifiers.js
function vc(e, t, n = go) {
	let r = Array.isArray(t) ? t : [t];
	if (r.filter((e) => typeof e != "function").some((t) => typeof t == "boolean" ? t : n.isDate(t) ? Zo(e, t, !1, n) : rs(t, n) ? t.some((t) => Zo(e, t, !1, n)) : $o(t) ? t.from && t.to ? _c(e, {
		from: t.from,
		to: t.to
	}, n) : !1 : ns(t) ? gc(e, t.dayOfWeek, n) : Qo(t) ? n.isAfter(t.before, t.after) ? _c(e, {
		from: n.addDays(t.after, 1),
		to: n.addDays(t.before, -1)
	}, n) : is(e.from, t, n) || is(e.to, t, n) : es(t) || ts(t) ? is(e.from, t, n) || is(e.to, t, n) : !1)) return !0;
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
function yc(e, t) {
	let { disabled: n, excludeDisabled: r, resetOnSelect: i, selected: a, required: o, onSelect: s } = e, [c, l] = oc(a, s ? a : void 0), u = s ? a : c;
	return {
		selected: u,
		select: (a, c, d) => {
			let { min: f, max: p } = e, m;
			if (a) {
				let e = u?.from, n = u?.to, r = !!e && !!n, s = !!e && !!n && t.isSameDay(e, n) && t.isSameDay(a, e);
				m = i && (r || !u?.from) ? !o && s ? void 0 : {
					from: a,
					to: void 0
				} : hc(a, u, f, p, o, t);
			}
			return r && n && m?.from && m.to && vc({
				from: m.from,
				to: m.to
			}, n, t) && (m.from = a, m.to = void 0), s || l(m), s?.(m, a, c, d), m;
		},
		isSelected: (e) => u && Zo(u, e, !1, t)
	};
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/selection/useSingle.js
function bc(e, t) {
	let { selected: n, required: r, onSelect: i } = e, [a, o] = oc(n, i ? n : void 0), s = i ? n : a, { isSameDay: c } = t;
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
function xc(e, t) {
	let n = bc(e, t), r = mc(e, t), i = yc(e, t);
	switch (e.mode) {
		case "single": return n;
		case "multiple": return r;
		case "range": return i;
		default: return;
	}
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/utils/toTimeZone.js
function Sc(e, t) {
	return e instanceof Ti && e.timeZone === t ? e : new Ti(e, t);
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/utils/convertMatchersToTimeZone.js
function Cc(e, t, n) {
	if (!n) return Sc(e, t);
	let r = Sc(e, t), i = new Ti(r.getFullYear(), r.getMonth(), r.getDate(), 12, 0, 0, t);
	return new Date(i.getTime());
}
function wc(e, t, n) {
	return typeof e == "boolean" || typeof e == "function" ? e : e instanceof Date ? Cc(e, t, n) : Array.isArray(e) ? e.map((e) => e instanceof Date ? Cc(e, t, n) : e) : $o(e) ? {
		...e,
		from: e.from ? Sc(e.from, t) : e.from,
		to: e.to ? Sc(e.to, t) : e.to
	} : Qo(e) ? {
		before: Cc(e.before, t, n),
		after: Cc(e.after, t, n)
	} : es(e) ? { after: Cc(e.after, t, n) } : ts(e) ? { before: Cc(e.before, t, n) } : e;
}
function Tc(e, t, n) {
	return e && (Array.isArray(e) ? e.map((e) => wc(e, t, n)) : wc(e, t, n));
}
//#endregion
//#region node_modules/.pnpm/react-day-picker@9.14.0_react@19.2.6/node_modules/react-day-picker/dist/esm/DayPicker.js
function Ec(e) {
	let n = e, r = n.timeZone;
	if (r && (n = {
		...e,
		timeZone: r
	}, n.today &&= Sc(n.today, r), n.month &&= Sc(n.month, r), n.defaultMonth &&= Sc(n.defaultMonth, r), n.startMonth &&= Sc(n.startMonth, r), n.endMonth &&= Sc(n.endMonth, r), n.mode === "single" && n.selected ? n.selected = Sc(n.selected, r) : n.mode === "multiple" && n.selected ? n.selected = n.selected?.map((e) => Sc(e, r)) : n.mode === "range" && n.selected && (n.selected = {
		from: n.selected.from ? Sc(n.selected.from, r) : n.selected.from,
		to: n.selected.to ? Sc(n.selected.to, r) : n.selected.to
	}), n.disabled !== void 0 && (n.disabled = Tc(n.disabled, r)), n.hidden !== void 0 && (n.hidden = Tc(n.hidden, r)), n.modifiers)) {
		let e = {};
		Object.keys(n.modifiers).forEach((t) => {
			e[t] = Tc(n.modifiers?.[t], r);
		}), n.modifiers = e;
	}
	let { components: i, formatters: o, labels: s, dateLib: c, locale: d, classNames: f } = l(() => {
		let e = {
			...mo,
			...n.locale
		}, t = n.broadcastCalendar ? 1 : n.weekStartsOn, r = n.noonSafe && n.timeZone ? Hs(n.timeZone, {
			weekStartsOn: t,
			locale: e
		}) : void 0, i = n.dateLib && r ? {
			...r,
			...n.dateLib
		} : n.dateLib ?? r, a = new ho({
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
			components: ss(n.components),
			formatters: bs(n.formatters),
			labels: Ls(n.labels, a.options),
			locale: e,
			classNames: {
				...ls(),
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
	let { captionLayout: p, mode: m, navLayout: h, numberOfMonths: g = 1, onDayBlur: _, onDayClick: v, onDayFocus: y, onDayKeyDown: b, onDayMouseEnter: x, onDayMouseLeave: S, onNextClick: C, onPrevClick: w, showWeekNumber: T, styles: E } = n, { formatCaption: D, formatDay: O, formatMonthDropdown: k, formatWeekNumber: A, formatWeekNumberHeader: j, formatWeekdayName: M, formatYearDropdown: N } = o, P = sc(n, c), { days: ee, months: F, navStart: te, navEnd: ne, previousMonth: re, nextMonth: ie, goToMonth: I } = P, L = as(ee, n, te, ne, c), { isSelected: ae, select: oe, selected: R } = xc(n, c) ?? {}, { blur: se, focused: ce, isFocusTarget: le, moveFocus: ue, setFocused: de } = pc(n, P, L, ae ?? (() => !1), c), { labelDayButton: fe, labelGridcell: pe, labelGrid: me, labelMonthDropdown: he, labelNav: ge, labelPrevious: _e, labelNext: ve, labelWeekday: ye, labelWeekNumber: be, labelWeekNumberHeader: xe, labelYearDropdown: Se } = s, Ce = l(() => Bs(c, n.ISOWeek, n.broadcastCalendar, n.today), [
		c,
		n.ISOWeek,
		n.broadcastCalendar,
		n.today
	]), we = m !== void 0 || v !== void 0, Te = a(() => {
		re && (I(re), w?.(re));
	}, [
		re,
		I,
		w
	]), z = a(() => {
		ie && (I(ie), C?.(ie));
	}, [
		I,
		ie,
		C
	]), Ee = a((e, t) => (n) => {
		n.preventDefault(), n.stopPropagation(), de(e), !t.disabled && (oe?.(e.date, t, n), v?.(e.date, t, n));
	}, [
		oe,
		v,
		de
	]), De = a((e, t) => (n) => {
		de(e), y?.(e.date, t, n);
	}, [y, de]), Oe = a((e, t) => (n) => {
		se(), _?.(e.date, t, n);
	}, [se, _]), ke = a((e, t) => (r) => {
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
			ue(e, t);
		}
		b?.(e.date, t, r);
	}, [
		ue,
		b,
		n.dir
	]), Ae = a((e, t) => (n) => {
		x?.(e.date, t, n);
	}, [x]), je = a((e, t) => (n) => {
		S?.(e.date, t, n);
	}, [S]), Me = a((e) => (t) => {
		let n = Number(t.target.value);
		I(c.setMonth(c.startOfMonth(e), n));
	}, [c, I]), Ne = a((e) => (t) => {
		let n = Number(t.target.value);
		I(c.setYear(c.startOfMonth(e), n));
	}, [c, I]), { className: Pe, style: Fe } = l(() => ({
		className: [f[Q.Root], n.className].filter(Boolean).join(" "),
		style: {
			...E?.[Q.Root],
			...n.style
		}
	}), [
		f,
		n.className,
		n.style,
		E
	]), B = cs(n), Ie = u(null);
	Xs(Ie, !!n.animate, {
		classNames: f,
		months: F,
		focused: ce,
		dateLib: c
	});
	let Le = {
		dayPickerProps: n,
		selected: R,
		select: oe,
		isSelected: ae,
		months: F,
		nextMonth: ie,
		previousMonth: re,
		goToMonth: I,
		getModifiers: L,
		components: i,
		classNames: f,
		styles: E,
		labels: s,
		formatters: o
	};
	return t.createElement(Po.Provider, { value: Le }, t.createElement(i.Root, {
		rootRef: n.animate ? Ie : void 0,
		className: Pe,
		style: Fe,
		dir: n.dir,
		id: n.id,
		lang: n.lang ?? d.code,
		nonce: n.nonce,
		title: n.title,
		role: n.role,
		"aria-label": n["aria-label"],
		"aria-labelledby": n["aria-labelledby"],
		...B
	}, t.createElement(i.Months, {
		className: f[Q.Months],
		style: E?.[Q.Months]
	}, !n.hideNavigation && !h && t.createElement(i.Nav, {
		"data-animated-nav": n.animate ? "true" : void 0,
		className: f[Q.Nav],
		style: E?.[Q.Nav],
		"aria-label": ge(),
		onPreviousClick: Te,
		onNextClick: z,
		previousMonth: re,
		nextMonth: ie
	}), F.map((e, r) => t.createElement(i.Month, {
		"data-animated-month": n.animate ? "true" : void 0,
		className: f[Q.Month],
		style: E?.[Q.Month],
		key: r,
		displayIndex: r,
		calendarMonth: e
	}, h === "around" && !n.hideNavigation && r === 0 && t.createElement(i.PreviousMonthButton, {
		type: "button",
		className: f[Q.PreviousMonthButton],
		tabIndex: re ? void 0 : -1,
		"aria-disabled": re ? void 0 : !0,
		"aria-label": _e(re),
		onClick: Te,
		"data-animated-button": n.animate ? "true" : void 0
	}, t.createElement(i.Chevron, {
		disabled: re ? void 0 : !0,
		className: f[Q.Chevron],
		orientation: n.dir === "rtl" ? "right" : "left"
	})), t.createElement(i.MonthCaption, {
		"data-animated-caption": n.animate ? "true" : void 0,
		className: f[Q.MonthCaption],
		style: E?.[Q.MonthCaption],
		calendarMonth: e,
		displayIndex: r
	}, p?.startsWith("dropdown") ? t.createElement(i.DropdownNav, {
		className: f[Q.Dropdowns],
		style: E?.[Q.Dropdowns]
	}, (() => {
		let r = p === "dropdown" || p === "dropdown-months" ? t.createElement(i.MonthsDropdown, {
			key: "month",
			className: f[Q.MonthsDropdown],
			"aria-label": he(),
			classNames: f,
			components: i,
			disabled: !!n.disableNavigation,
			onChange: Me(e.date),
			options: Rs(e.date, te, ne, o, c),
			style: E?.[Q.Dropdown],
			value: c.getMonth(e.date)
		}) : t.createElement("span", { key: "month" }, k(e.date, c)), a = p === "dropdown" || p === "dropdown-years" ? t.createElement(i.YearsDropdown, {
			key: "year",
			className: f[Q.YearsDropdown],
			"aria-label": Se(c.options),
			classNames: f,
			components: i,
			disabled: !!n.disableNavigation,
			onChange: Ne(e.date),
			options: Vs(te, ne, o, c, !!n.reverseYears),
			style: E?.[Q.Dropdown],
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
		className: f[Q.CaptionLabel],
		role: "status",
		"aria-live": "polite"
	}, D(e.date, c.options, c))), h === "around" && !n.hideNavigation && r === g - 1 && t.createElement(i.NextMonthButton, {
		type: "button",
		className: f[Q.NextMonthButton],
		tabIndex: ie ? void 0 : -1,
		"aria-disabled": ie ? void 0 : !0,
		"aria-label": ve(ie),
		onClick: z,
		"data-animated-button": n.animate ? "true" : void 0
	}, t.createElement(i.Chevron, {
		disabled: ie ? void 0 : !0,
		className: f[Q.Chevron],
		orientation: n.dir === "rtl" ? "left" : "right"
	})), r === g - 1 && h === "after" && !n.hideNavigation && t.createElement(i.Nav, {
		"data-animated-nav": n.animate ? "true" : void 0,
		className: f[Q.Nav],
		style: E?.[Q.Nav],
		"aria-label": ge(),
		onPreviousClick: Te,
		onNextClick: z,
		previousMonth: re,
		nextMonth: ie
	}), t.createElement(i.MonthGrid, {
		role: "grid",
		"aria-multiselectable": m === "multiple" || m === "range",
		"aria-label": me(e.date, c.options, c) || void 0,
		className: f[Q.MonthGrid],
		style: E?.[Q.MonthGrid]
	}, !n.hideWeekdays && t.createElement(i.Weekdays, {
		"data-animated-weekdays": n.animate ? "true" : void 0,
		className: f[Q.Weekdays],
		style: E?.[Q.Weekdays]
	}, T && t.createElement(i.WeekNumberHeader, {
		"aria-label": xe(c.options),
		className: f[Q.WeekNumberHeader],
		style: E?.[Q.WeekNumberHeader],
		scope: "col"
	}, j()), Ce.map((e) => t.createElement(i.Weekday, {
		"aria-label": ye(e, c.options, c),
		className: f[Q.Weekday],
		key: String(e),
		style: E?.[Q.Weekday],
		scope: "col"
	}, M(e, c.options, c)))), t.createElement(i.Weeks, {
		"data-animated-weeks": n.animate ? "true" : void 0,
		className: f[Q.Weeks],
		style: E?.[Q.Weeks]
	}, e.weeks.map((e) => t.createElement(i.Week, {
		className: f[Q.Week],
		key: e.weekNumber,
		style: E?.[Q.Week],
		week: e
	}, T && t.createElement(i.WeekNumber, {
		week: e,
		style: E?.[Q.WeekNumber],
		"aria-label": be(e.weekNumber, { locale: d }),
		className: f[Q.WeekNumber],
		scope: "row",
		role: "rowheader"
	}, A(e.weekNumber, c)), e.days.map((e) => {
		let { date: r } = e, a = L(e);
		if (a[$.focused] = !a.hidden && !!ce?.isEqualTo(e), a[To.selected] = ae?.(r) || a.selected, $o(R)) {
			let { from: e, to: t } = R;
			a[To.range_start] = !!(e && t && c.isSameDay(r, e)), a[To.range_end] = !!(e && t && c.isSameDay(r, t)), a[To.range_middle] = Zo(R, r, !0, c);
		}
		let o = zs(a, E, n.modifiersStyles), s = os(a, f, n.modifiersClassNames), l = !we && !a.hidden ? pe(r, a, c.options, c) : void 0;
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
		}, !a.hidden && we ? t.createElement(i.DayButton, {
			className: f[Q.DayButton],
			style: E?.[Q.DayButton],
			type: "button",
			day: e,
			modifiers: a,
			disabled: !a.focused && a.disabled || void 0,
			"aria-disabled": a.focused && a.disabled || void 0,
			tabIndex: le(e) ? 0 : -1,
			"aria-label": fe(r, a, c.options, c),
			onClick: Ee(e, a),
			onBlur: Oe(e, a),
			onFocus: De(e, a),
			onKeyDown: ke(e, a),
			onMouseEnter: Ae(e, a),
			onMouseLeave: je(e, a)
		}, O(r, c.options, c)) : !a.hidden && O(e.date, c.options, c));
	})))))))), n.footer && t.createElement(i.Footer, {
		className: f[Q.Footer],
		style: E?.[Q.Footer],
		role: "status",
		"aria-live": "polite"
	}, n.footer)));
}
//#endregion
//#region src/components/ui/calendar.tsx
function Dc({ className: e, classNames: t, showOutsideDays: n = !0, captionLayout: r = "label", buttonVariant: i = "ghost", formatters: a, components: o, ...s }) {
	let c = ls();
	return /* @__PURE__ */ p(Ec, {
		showOutsideDays: n,
		className: H("bg-background group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent", String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`, String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`, e),
		captionLayout: r,
		formatters: {
			formatMonthDropdown: (e) => e.toLocaleString("default", { month: "short" }),
			...a
		},
		classNames: {
			root: H("w-fit", c.root),
			months: H("relative flex flex-col gap-4 md:flex-row", c.months),
			month: H("flex w-full flex-col gap-4", c.month),
			nav: H("absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1", c.nav),
			button_previous: H(fi({ variant: i }), "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50", c.button_previous),
			button_next: H(fi({ variant: i }), "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50", c.button_next),
			month_caption: H("flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)", c.month_caption),
			dropdowns: H("flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium", c.dropdowns),
			dropdown_root: H("has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border", c.dropdown_root),
			dropdown: H("bg-popover absolute inset-0 opacity-0", c.dropdown),
			caption_label: H("select-none font-medium", r === "label" ? "text-sm" : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5", c.caption_label),
			table: "w-full border-collapse",
			weekdays: H("flex", c.weekdays),
			weekday: H("text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal", c.weekday),
			week: H("mt-2 flex w-full", c.week),
			week_number_header: H("w-(--cell-size) select-none", c.week_number_header),
			week_number: H("text-muted-foreground select-none text-[0.8rem]", c.week_number),
			day: H("group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md", c.day),
			range_start: H("bg-accent rounded-l-md", c.range_start),
			range_middle: H("rounded-none", c.range_middle),
			range_end: H("bg-accent rounded-r-md", c.range_end),
			today: H("bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none", c.today),
			outside: H("text-muted-foreground aria-selected:text-muted-foreground", c.outside),
			disabled: H("text-muted-foreground opacity-50", c.disabled),
			hidden: H("invisible", c.hidden),
			...t
		},
		components: {
			Root: ({ className: e, rootRef: t, ...n }) => /* @__PURE__ */ p("div", {
				"data-slot": "calendar",
				ref: t,
				className: H(e),
				...n
			}),
			Chevron: ({ className: e, orientation: t, ...n }) => p(t === "left" ? Gn : t === "right" ? Kn : Wn, {
				className: H("size-4", e),
				...n
			}),
			DayButton: Oc,
			WeekNumber: ({ children: e, ...t }) => /* @__PURE__ */ p("td", {
				...t,
				children: /* @__PURE__ */ p("div", {
					className: "flex size-(--cell-size) items-center justify-center text-center",
					children: e
				})
			}),
			...o
		},
		...s
	});
}
function Oc({ className: t, day: n, modifiers: r, ...i }) {
	let a = ls(), o = e.useRef(null);
	return e.useEffect(() => {
		r.focused && o.current?.focus();
	}, [r.focused]), /* @__PURE__ */ p(pi, {
		ref: o,
		variant: "ghost",
		size: "icon",
		"data-day": n.date.toLocaleDateString(),
		"data-selected-single": r.selected && !r.range_start && !r.range_end && !r.range_middle,
		"data-range-start": r.range_start,
		"data-range-end": r.range_end,
		"data-range-middle": r.range_middle,
		className: H("data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-(--cell-size) flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70", a.day, t),
		...i
	});
}
//#endregion
//#region src/components/ui/card.tsx
function kc({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p("div", {
		ref: t,
		className: H("rounded-xl border bg-card text-card-foreground shadow", e),
		...n
	});
}
kc.displayName = "Card";
function Ac({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p("div", {
		ref: t,
		className: H("flex flex-col space-y-1.5 p-6", e),
		...n
	});
}
Ac.displayName = "CardHeader";
function jc({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p("div", {
		ref: t,
		className: H("font-semibold leading-none tracking-tight", e),
		...n
	});
}
jc.displayName = "CardTitle";
function Mc({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p("div", {
		ref: t,
		className: H("text-sm text-muted-foreground", e),
		...n
	});
}
Mc.displayName = "CardDescription";
function Nc({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p("div", {
		ref: t,
		className: H("p-6 pt-0", e),
		...n
	});
}
Nc.displayName = "CardContent";
function Pc({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p("div", {
		ref: t,
		className: H("flex items-center p-6 pt-0", e),
		...n
	});
}
Pc.displayName = "CardFooter";
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-use-previous@1.1.1_@types+react@19.2.14_react@19.2.6/node_modules/@radix-ui/react-use-previous/dist/index.mjs
function Fc(t) {
	let n = e.useRef({
		value: t,
		previous: t
	});
	return e.useMemo(() => (n.current.value !== t && (n.current.previous = n.current.value, n.current.value = t), n.current.previous), [t]);
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-use-size@1.1.1_@types+react@19.2.14_react@19.2.6/node_modules/@radix-ui/react-use-size/dist/index.mjs
function Ic(t) {
	let [n, r] = e.useState(void 0);
	return G(() => {
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
var Lc = "Checkbox", [Rc, zc] = ct(Lc), [Bc, Vc] = Rc(Lc);
function Hc(t) {
	let { __scopeCheckbox: n, checked: r, children: i, defaultChecked: a, disabled: o, form: s, name: c, onCheckedChange: l, required: u, value: d = "on", internal_do_not_use_render: f } = t, [m, h] = xt({
		prop: r,
		defaultProp: a ?? !1,
		onChange: l,
		caller: Lc
	}), [g, _] = e.useState(null), [v, y] = e.useState(null), b = e.useRef(!1), x = g ? !!s || !!g.closest("form") : !0, S = {
		checked: m,
		disabled: o,
		setChecked: h,
		control: g,
		setControl: _,
		name: c,
		form: s,
		value: d,
		hasConsumerStoppedPropagationRef: b,
		required: u,
		defaultChecked: Zc(a) ? !1 : a,
		isFormControl: x,
		bubbleInput: v,
		setBubbleInput: y
	};
	return /* @__PURE__ */ p(Bc, {
		scope: n,
		...S,
		children: Xc(f) ? f(S) : i
	});
}
var Uc = "CheckboxTrigger", Wc = e.forwardRef(({ __scopeCheckbox: t, onKeyDown: n, onClick: r, ...i }, a) => {
	let { control: o, value: s, disabled: c, checked: l, required: u, setControl: d, setChecked: f, hasConsumerStoppedPropagationRef: m, isFormControl: h, bubbleInput: g } = Vc(Uc, t), _ = U(a, d), v = e.useRef(l);
	return e.useEffect(() => {
		let e = o?.form;
		if (e) {
			let t = () => f(v.current);
			return e.addEventListener("reset", t), () => e.removeEventListener("reset", t);
		}
	}, [o, f]), /* @__PURE__ */ p(K.button, {
		type: "button",
		role: "checkbox",
		"aria-checked": Zc(l) ? "mixed" : l,
		"aria-required": u,
		"data-state": Qc(l),
		"data-disabled": c ? "" : void 0,
		disabled: c,
		value: s,
		...i,
		ref: _,
		onKeyDown: W(n, (e) => {
			e.key === "Enter" && e.preventDefault();
		}),
		onClick: W(r, (e) => {
			f((e) => Zc(e) ? !0 : !e), g && h && (m.current = e.isPropagationStopped(), m.current || e.stopPropagation());
		})
	});
});
Wc.displayName = Uc;
var Gc = e.forwardRef((e, t) => {
	let { __scopeCheckbox: n, name: r, checked: i, defaultChecked: a, required: o, disabled: s, value: c, onCheckedChange: l, form: u, ...d } = e;
	return /* @__PURE__ */ p(Hc, {
		__scopeCheckbox: n,
		checked: i,
		defaultChecked: a,
		disabled: s,
		required: o,
		onCheckedChange: l,
		name: r,
		form: u,
		value: c,
		internal_do_not_use_render: ({ isFormControl: e }) => /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p(Wc, {
			...d,
			ref: t,
			__scopeCheckbox: n
		}), e && /* @__PURE__ */ p(Yc, { __scopeCheckbox: n })] })
	});
});
Gc.displayName = Lc;
var Kc = "CheckboxIndicator", qc = e.forwardRef((e, t) => {
	let { __scopeCheckbox: n, forceMount: r, ...i } = e, a = Vc(Kc, n);
	return /* @__PURE__ */ p(q, {
		present: r || Zc(a.checked) || a.checked === !0,
		children: /* @__PURE__ */ p(K.span, {
			"data-state": Qc(a.checked),
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
qc.displayName = Kc;
var Jc = "CheckboxBubbleInput", Yc = e.forwardRef(({ __scopeCheckbox: t, ...n }, r) => {
	let { control: i, hasConsumerStoppedPropagationRef: a, checked: o, defaultChecked: s, required: c, disabled: l, name: u, value: d, form: f, bubbleInput: m, setBubbleInput: h } = Vc(Jc, t), g = U(r, h), _ = Fc(o), v = Ic(i);
	e.useEffect(() => {
		let e = m;
		if (!e) return;
		let t = window.HTMLInputElement.prototype, n = Object.getOwnPropertyDescriptor(t, "checked").set, r = !a.current;
		if (_ !== o && n) {
			let t = new Event("click", { bubbles: r });
			e.indeterminate = Zc(o), n.call(e, Zc(o) ? !1 : o), e.dispatchEvent(t);
		}
	}, [
		m,
		_,
		o,
		a
	]);
	let y = e.useRef(Zc(o) ? !1 : o);
	return /* @__PURE__ */ p(K.input, {
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
Yc.displayName = Jc;
function Xc(e) {
	return typeof e == "function";
}
function Zc(e) {
	return e === "indeterminate";
}
function Qc(e) {
	return Zc(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
//#endregion
//#region src/components/ui/checkbox.tsx
function $c({ className: e, indeterminate: t, ref: n, ...r }) {
	return /* @__PURE__ */ p(Gc, {
		ref: n,
		className: H("peer h-4 w-4 shrink-0 rounded-sm border border-border-strong", "bg-surface-raised ring-offset-background", "transition-colors duration-fast", "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", "disabled:cursor-not-allowed disabled:opacity-50", "data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground", "data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:text-primary-foreground", e),
		checked: t ? "indeterminate" : r.checked,
		...r,
		children: /* @__PURE__ */ p(qc, {
			className: "flex items-center justify-center text-current",
			children: p(t ? tr : Un, {
				className: "h-3 w-3",
				strokeWidth: 2.5
			})
		})
	});
}
$c.displayName = Gc.displayName;
//#endregion
//#region node_modules/.pnpm/cmdk@1.1.1_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react@19.2.14_react-dom_66be394aff8225a06cf994aefac200c6/node_modules/cmdk/dist/chunk-NZJY6EH4.mjs
var el = 1, tl = .9, nl = .8, rl = .17, il = .1, al = .999, ol = .9999, sl = .99, cl = /[\\\/_+.#"@\[\(\{&]/, ll = /[\\\/_+.#"@\[\(\{&]/g, ul = /[\s-]/, dl = /[\s-]/g;
function fl(e, t, n, r, i, a, o) {
	if (a === t.length) return i === e.length ? el : sl;
	var s = `${i},${a}`;
	if (o[s] !== void 0) return o[s];
	for (var c = r.charAt(a), l = n.indexOf(c, i), u = 0, d, f, p, m; l >= 0;) d = fl(e, t, n, r, l + 1, a + 1, o), d > u && (l === i ? d *= el : cl.test(e.charAt(l - 1)) ? (d *= nl, p = e.slice(i, l - 1).match(ll), p && i > 0 && (d *= al ** +p.length)) : ul.test(e.charAt(l - 1)) ? (d *= tl, m = e.slice(i, l - 1).match(dl), m && i > 0 && (d *= al ** +m.length)) : (d *= rl, i > 0 && (d *= al ** +(l - i))), e.charAt(l) !== t.charAt(a) && (d *= ol)), (d < il && n.charAt(l - 1) === r.charAt(a + 1) || r.charAt(a + 1) === r.charAt(a) && n.charAt(l - 1) !== r.charAt(a)) && (f = fl(e, t, n, r, l + 1, a + 2, o), f * il > d && (d = f * il)), d > u && (u = d), l = n.indexOf(c, l + 1);
	return o[s] = u, u;
}
function pl(e) {
	return e.toLowerCase().replace(dl, " ");
}
function ml(e, t, n) {
	return e = n && n.length > 0 ? `${e + " " + n.join(" ")}` : e, fl(e, t, pl(e), pl(t), 0, 0, {});
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-use-escape-keydown@1.1.1_@types+react@19.2.14_react@19.2.6/node_modules/@radix-ui/react-use-escape-keydown/dist/index.mjs
function hl(t, n = globalThis?.document) {
	let r = Y(t);
	e.useEffect(() => {
		let e = (e) => {
			e.key === "Escape" && r(e);
		};
		return n.addEventListener("keydown", e, { capture: !0 }), () => n.removeEventListener("keydown", e, { capture: !0 });
	}, [r, n]);
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-dismissable-layer@1.1.11_@types+react-dom@19.2.3_@types+react@19.2.14___9e4771d0900293d89694eff7a0933149/node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
var gl = "DismissableLayer", _l = "dismissableLayer.update", vl = "dismissableLayer.pointerDownOutside", yl = "dismissableLayer.focusOutside", bl, xl = e.createContext({
	layers: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	branches: /* @__PURE__ */ new Set()
}), Sl = e.forwardRef((t, n) => {
	let { disableOutsidePointerEvents: r = !1, onEscapeKeyDown: i, onPointerDownOutside: a, onFocusOutside: o, onInteractOutside: s, onDismiss: c, ...l } = t, u = e.useContext(xl), [d, f] = e.useState(null), m = d?.ownerDocument ?? globalThis?.document, [, h] = e.useState({}), g = U(n, (e) => f(e)), _ = Array.from(u.layers), [v] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), y = _.indexOf(v), b = d ? _.indexOf(d) : -1, x = u.layersWithOutsidePointerEventsDisabled.size > 0, S = b >= y, C = Tl((e) => {
		let t = e.target, n = [...u.branches].some((e) => e.contains(t));
		!S || n || (a?.(e), s?.(e), e.defaultPrevented || c?.());
	}, m), w = El((e) => {
		let t = e.target;
		[...u.branches].some((e) => e.contains(t)) || (o?.(e), s?.(e), e.defaultPrevented || c?.());
	}, m);
	return hl((e) => {
		b === u.layers.size - 1 && (i?.(e), !e.defaultPrevented && c && (e.preventDefault(), c()));
	}, m), e.useEffect(() => {
		if (d) return r && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (bl = m.body.style.pointerEvents, m.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(d)), u.layers.add(d), Dl(), () => {
			r && u.layersWithOutsidePointerEventsDisabled.size === 1 && (m.body.style.pointerEvents = bl);
		};
	}, [
		d,
		m,
		r,
		u
	]), e.useEffect(() => () => {
		d && (u.layers.delete(d), u.layersWithOutsidePointerEventsDisabled.delete(d), Dl());
	}, [d, u]), e.useEffect(() => {
		let e = () => h({});
		return document.addEventListener(_l, e), () => document.removeEventListener(_l, e);
	}, []), /* @__PURE__ */ p(K.div, {
		...l,
		ref: g,
		style: {
			pointerEvents: x ? S ? "auto" : "none" : void 0,
			...t.style
		},
		onFocusCapture: W(t.onFocusCapture, w.onFocusCapture),
		onBlurCapture: W(t.onBlurCapture, w.onBlurCapture),
		onPointerDownCapture: W(t.onPointerDownCapture, C.onPointerDownCapture)
	});
});
Sl.displayName = gl;
var Cl = "DismissableLayerBranch", wl = e.forwardRef((t, n) => {
	let r = e.useContext(xl), i = e.useRef(null), a = U(n, i);
	return e.useEffect(() => {
		let e = i.current;
		if (e) return r.branches.add(e), () => {
			r.branches.delete(e);
		};
	}, [r.branches]), /* @__PURE__ */ p(K.div, {
		...t,
		ref: a
	});
});
wl.displayName = Cl;
function Tl(t, n = globalThis?.document) {
	let r = Y(t), i = e.useRef(!1), a = e.useRef(() => {});
	return e.useEffect(() => {
		let e = (e) => {
			if (e.target && !i.current) {
				let t = function() {
					Ol(vl, r, i, { discrete: !0 });
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
function El(t, n = globalThis?.document) {
	let r = Y(t), i = e.useRef(!1);
	return e.useEffect(() => {
		let e = (e) => {
			e.target && !i.current && Ol(yl, r, { originalEvent: e }, { discrete: !1 });
		};
		return n.addEventListener("focusin", e), () => n.removeEventListener("focusin", e);
	}, [n, r]), {
		onFocusCapture: () => i.current = !0,
		onBlurCapture: () => i.current = !1
	};
}
function Dl() {
	let e = new CustomEvent(_l);
	document.dispatchEvent(e);
}
function Ol(e, t, n, { discrete: r }) {
	let i = n.originalEvent.target, a = new CustomEvent(e, {
		bubbles: !1,
		cancelable: !0,
		detail: n
	});
	t && i.addEventListener(e, t, { once: !0 }), r ? wt(i, a) : i.dispatchEvent(a);
}
var kl = Sl, Al = wl, jl = "focusScope.autoFocusOnMount", Ml = "focusScope.autoFocusOnUnmount", Nl = {
	bubbles: !1,
	cancelable: !0
}, Pl = "FocusScope", Fl = e.forwardRef((t, n) => {
	let { loop: r = !1, trapped: i = !1, onMountAutoFocus: a, onUnmountAutoFocus: o, ...s } = t, [c, l] = e.useState(null), u = Y(a), d = Y(o), f = e.useRef(null), m = U(n, (e) => l(e)), h = e.useRef({
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
				if (h.paused || !c) return;
				let t = e.target;
				c.contains(t) ? f.current = t : Hl(f.current, { select: !0 });
			}, t = function(e) {
				if (h.paused || !c) return;
				let t = e.relatedTarget;
				t !== null && (c.contains(t) || Hl(f.current, { select: !0 }));
			}, n = function(e) {
				if (document.activeElement === document.body) for (let t of e) t.removedNodes.length > 0 && Hl(c);
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
		h.paused
	]), e.useEffect(() => {
		if (c) {
			Ul.add(h);
			let e = document.activeElement;
			if (!c.contains(e)) {
				let t = new CustomEvent(jl, Nl);
				c.addEventListener(jl, u), c.dispatchEvent(t), t.defaultPrevented || (Il(Kl(Rl(c)), { select: !0 }), document.activeElement === e && Hl(c));
			}
			return () => {
				c.removeEventListener(jl, u), setTimeout(() => {
					let t = new CustomEvent(Ml, Nl);
					c.addEventListener(Ml, d), c.dispatchEvent(t), t.defaultPrevented || Hl(e ?? document.body, { select: !0 }), c.removeEventListener(Ml, d), Ul.remove(h);
				}, 0);
			};
		}
	}, [
		c,
		u,
		d,
		h
	]);
	let g = e.useCallback((e) => {
		if (!r && !i || h.paused) return;
		let t = e.key === "Tab" && !e.altKey && !e.ctrlKey && !e.metaKey, n = document.activeElement;
		if (t && n) {
			let t = e.currentTarget, [i, a] = Ll(t);
			i && a ? !e.shiftKey && n === a ? (e.preventDefault(), r && Hl(i, { select: !0 })) : e.shiftKey && n === i && (e.preventDefault(), r && Hl(a, { select: !0 })) : n === t && e.preventDefault();
		}
	}, [
		r,
		i,
		h.paused
	]);
	return /* @__PURE__ */ p(K.div, {
		tabIndex: -1,
		...s,
		ref: m,
		onKeyDown: g
	});
});
Fl.displayName = Pl;
function Il(e, { select: t = !1 } = {}) {
	let n = document.activeElement;
	for (let r of e) if (Hl(r, { select: t }), document.activeElement !== n) return;
}
function Ll(e) {
	let t = Rl(e);
	return [zl(t, e), zl(t.reverse(), e)];
}
function Rl(e) {
	let t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: (e) => {
		let t = e.tagName === "INPUT" && e.type === "hidden";
		return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	for (; n.nextNode();) t.push(n.currentNode);
	return t;
}
function zl(e, t) {
	for (let n of e) if (!Bl(n, { upTo: t })) return n;
}
function Bl(e, { upTo: t }) {
	if (getComputedStyle(e).visibility === "hidden") return !0;
	for (; e;) {
		if (t !== void 0 && e === t) return !1;
		if (getComputedStyle(e).display === "none") return !0;
		e = e.parentElement;
	}
	return !1;
}
function Vl(e) {
	return e instanceof HTMLInputElement && "select" in e;
}
function Hl(e, { select: t = !1 } = {}) {
	if (e && e.focus) {
		let n = document.activeElement;
		e.focus({ preventScroll: !0 }), e !== n && Vl(e) && t && e.select();
	}
}
var Ul = Wl();
function Wl() {
	let e = [];
	return {
		add(t) {
			let n = e[0];
			t !== n && n?.pause(), e = Gl(e, t), e.unshift(t);
		},
		remove(t) {
			e = Gl(e, t), e[0]?.resume();
		}
	};
}
function Gl(e, t) {
	let n = [...e], r = n.indexOf(t);
	return r !== -1 && n.splice(r, 1), n;
}
function Kl(e) {
	return e.filter((e) => e.tagName !== "A");
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-portal@1.1.9_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react_266ca67294f168fbf2e025541d323e69/node_modules/@radix-ui/react-portal/dist/index.mjs
var ql = "Portal", Jl = e.forwardRef((t, n) => {
	let { container: r, ...i } = t, [a, o] = e.useState(!1);
	G(() => o(!0), []);
	let s = r || a && globalThis?.document?.body;
	return s ? g.createPortal(/* @__PURE__ */ p(K.div, {
		...i,
		ref: n
	}), s) : null;
});
Jl.displayName = ql;
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-focus-guards@1.1.3_@types+react@19.2.14_react@19.2.6/node_modules/@radix-ui/react-focus-guards/dist/index.mjs
var Yl = 0;
function Xl() {
	e.useEffect(() => {
		let e = document.querySelectorAll("[data-radix-focus-guard]");
		return document.body.insertAdjacentElement("afterbegin", e[0] ?? Zl()), document.body.insertAdjacentElement("beforeend", e[1] ?? Zl()), Yl++, () => {
			Yl === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((e) => e.remove()), Yl--;
		};
	}, []);
}
function Zl() {
	let e = document.createElement("span");
	return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
//#endregion
//#region node_modules/.pnpm/tslib@2.8.1/node_modules/tslib/tslib.es6.mjs
var Ql = function() {
	return Ql = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, Ql.apply(this, arguments);
};
function $l(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function eu(e, t, n) {
	if (n || arguments.length === 2) for (var r = 0, i = t.length, a; r < i; r++) (a || !(r in t)) && (a ||= Array.prototype.slice.call(t, 0, r), a[r] = t[r]);
	return e.concat(a || Array.prototype.slice.call(t));
}
//#endregion
//#region node_modules/.pnpm/react-remove-scroll-bar@2.3.8_@types+react@19.2.14_react@19.2.6/node_modules/react-remove-scroll-bar/dist/es2015/constants.js
var tu = "right-scroll-bar-position", nu = "width-before-scroll-bar", ru = "with-scroll-bars-hidden", iu = "--removed-body-scroll-bar-size";
//#endregion
//#region node_modules/.pnpm/use-callback-ref@1.3.3_@types+react@19.2.14_react@19.2.6/node_modules/use-callback-ref/dist/es2015/assignRef.js
function au(e, t) {
	return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
//#endregion
//#region node_modules/.pnpm/use-callback-ref@1.3.3_@types+react@19.2.14_react@19.2.6/node_modules/use-callback-ref/dist/es2015/useRef.js
function ou(e, t) {
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
var su = typeof window < "u" ? e.useLayoutEffect : e.useEffect, cu = /* @__PURE__ */ new WeakMap();
function lu(e, t) {
	var n = ou(t || null, function(t) {
		return e.forEach(function(e) {
			return au(e, t);
		});
	});
	return su(function() {
		var t = cu.get(n);
		if (t) {
			var r = new Set(t), i = new Set(e), a = n.current;
			r.forEach(function(e) {
				i.has(e) || au(e, null);
			}), i.forEach(function(e) {
				r.has(e) || au(e, a);
			});
		}
		cu.set(n, e);
	}, [e]), n;
}
//#endregion
//#region node_modules/.pnpm/use-sidecar@1.1.3_@types+react@19.2.14_react@19.2.6/node_modules/use-sidecar/dist/es2015/medium.js
function uu(e) {
	return e;
}
function du(e, t) {
	t === void 0 && (t = uu);
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
function fu(e) {
	e === void 0 && (e = {});
	var t = du(null);
	return t.options = Ql({
		async: !0,
		ssr: !1
	}, e), t;
}
//#endregion
//#region node_modules/.pnpm/use-sidecar@1.1.3_@types+react@19.2.14_react@19.2.6/node_modules/use-sidecar/dist/es2015/exports.js
var pu = function(t) {
	var n = t.sideCar, r = $l(t, ["sideCar"]);
	if (!n) throw Error("Sidecar: please provide `sideCar` property to import the right car");
	var i = n.read();
	if (!i) throw Error("Sidecar medium not found");
	return e.createElement(i, Ql({}, r));
};
pu.isSideCarExport = !0;
function mu(e, t) {
	return e.useMedium(t), pu;
}
//#endregion
//#region node_modules/.pnpm/react-remove-scroll@2.7.2_@types+react@19.2.14_react@19.2.6/node_modules/react-remove-scroll/dist/es2015/medium.js
var hu = fu(), gu = function() {}, _u = e.forwardRef(function(t, n) {
	var r = e.useRef(null), i = e.useState({
		onScrollCapture: gu,
		onWheelCapture: gu,
		onTouchMoveCapture: gu
	}), a = i[0], o = i[1], s = t.forwardProps, c = t.children, l = t.className, u = t.removeScrollBar, d = t.enabled, f = t.shards, p = t.sideCar, m = t.noRelative, h = t.noIsolation, g = t.inert, _ = t.allowPinchZoom, v = t.as, y = v === void 0 ? "div" : v, b = t.gapMode, x = $l(t, [
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
	]), S = p, C = lu([r, n]), w = Ql(Ql({}, x), a);
	return e.createElement(e.Fragment, null, d && e.createElement(S, {
		sideCar: hu,
		removeScrollBar: u,
		shards: f,
		noRelative: m,
		noIsolation: h,
		inert: g,
		setCallbacks: o,
		allowPinchZoom: !!_,
		lockRef: r,
		gapMode: b
	}), s ? e.cloneElement(e.Children.only(c), Ql(Ql({}, w), { ref: C })) : e.createElement(y, Ql({}, w, {
		className: l,
		ref: C
	}), c));
});
_u.defaultProps = {
	enabled: !0,
	removeScrollBar: !0,
	inert: !1
}, _u.classNames = {
	fullWidth: nu,
	zeroRight: tu
};
//#endregion
//#region node_modules/.pnpm/get-nonce@1.0.1/node_modules/get-nonce/dist/es2015/index.js
var vu, yu = function() {
	if (vu) return vu;
	if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
//#endregion
//#region node_modules/.pnpm/react-style-singleton@2.2.3_@types+react@19.2.14_react@19.2.6/node_modules/react-style-singleton/dist/es2015/singleton.js
function bu() {
	if (!document) return null;
	var e = document.createElement("style");
	e.type = "text/css";
	var t = yu();
	return t && e.setAttribute("nonce", t), e;
}
function xu(e, t) {
	e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Su(e) {
	(document.head || document.getElementsByTagName("head")[0]).appendChild(e);
}
var Cu = function() {
	var e = 0, t = null;
	return {
		add: function(n) {
			e == 0 && (t = bu()) && (xu(t, n), Su(t)), e++;
		},
		remove: function() {
			e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
		}
	};
}, wu = function() {
	var t = Cu();
	return function(n, r) {
		e.useEffect(function() {
			return t.add(n), function() {
				t.remove();
			};
		}, [n && r]);
	};
}, Tu = function() {
	var e = wu();
	return function(t) {
		var n = t.styles, r = t.dynamic;
		return e(n, r), null;
	};
}, Eu = {
	left: 0,
	top: 0,
	right: 0,
	gap: 0
}, Du = function(e) {
	return parseInt(e || "", 10) || 0;
}, Ou = function(e) {
	var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], i = t[e === "padding" ? "paddingRight" : "marginRight"];
	return [
		Du(n),
		Du(r),
		Du(i)
	];
}, ku = function(e) {
	if (e === void 0 && (e = "margin"), typeof window > "u") return Eu;
	var t = Ou(e), n = document.documentElement.clientWidth, r = window.innerWidth;
	return {
		left: t[0],
		top: t[1],
		right: t[2],
		gap: Math.max(0, r - n + t[2] - t[0])
	};
}, Au = Tu(), ju = "data-scroll-locked", Mu = function(e, t, n, r) {
	var i = e.left, a = e.top, o = e.right, s = e.gap;
	return n === void 0 && (n = "margin"), `
  .${ru} {
   overflow: hidden ${r};
   padding-right: ${s}px ${r};
  }
  body[${ju}] {
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
  
  .${tu} {
    right: ${s}px ${r};
  }
  
  .${nu} {
    margin-right: ${s}px ${r};
  }
  
  .${tu} .${tu} {
    right: 0 ${r};
  }
  
  .${nu} .${nu} {
    margin-right: 0 ${r};
  }
  
  body[${ju}] {
    ${iu}: ${s}px;
  }
`;
}, Nu = function() {
	var e = parseInt(document.body.getAttribute("data-scroll-locked") || "0", 10);
	return isFinite(e) ? e : 0;
}, Pu = function() {
	e.useEffect(function() {
		return document.body.setAttribute(ju, (Nu() + 1).toString()), function() {
			var e = Nu() - 1;
			e <= 0 ? document.body.removeAttribute(ju) : document.body.setAttribute(ju, e.toString());
		};
	}, []);
}, Fu = function(t) {
	var n = t.noRelative, r = t.noImportant, i = t.gapMode, a = i === void 0 ? "margin" : i;
	Pu();
	var o = e.useMemo(function() {
		return ku(a);
	}, [a]);
	return e.createElement(Au, { styles: Mu(o, !n, a, r ? "" : "!important") });
}, Iu = !1;
if (typeof window < "u") try {
	var Lu = Object.defineProperty({}, "passive", { get: function() {
		return Iu = !0, !0;
	} });
	window.addEventListener("test", Lu, Lu), window.removeEventListener("test", Lu, Lu);
} catch {
	Iu = !1;
}
var Ru = Iu ? { passive: !1 } : !1, zu = function(e) {
	return e.tagName === "TEXTAREA";
}, Bu = function(e, t) {
	if (!(e instanceof Element)) return !1;
	var n = window.getComputedStyle(e);
	return n[t] !== "hidden" && !(n.overflowY === n.overflowX && !zu(e) && n[t] === "visible");
}, Vu = function(e) {
	return Bu(e, "overflowY");
}, Hu = function(e) {
	return Bu(e, "overflowX");
}, Uu = function(e, t) {
	var n = t.ownerDocument, r = t;
	do {
		if (typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host), Ku(e, r)) {
			var i = qu(e, r);
			if (i[1] > i[2]) return !0;
		}
		r = r.parentNode;
	} while (r && r !== n.body);
	return !1;
}, Wu = function(e) {
	return [
		e.scrollTop,
		e.scrollHeight,
		e.clientHeight
	];
}, Gu = function(e) {
	return [
		e.scrollLeft,
		e.scrollWidth,
		e.clientWidth
	];
}, Ku = function(e, t) {
	return e === "v" ? Vu(t) : Hu(t);
}, qu = function(e, t) {
	return e === "v" ? Wu(t) : Gu(t);
}, Ju = function(e, t) {
	return e === "h" && t === "rtl" ? -1 : 1;
}, Yu = function(e, t, n, r, i) {
	var a = Ju(e, window.getComputedStyle(t).direction), o = a * r, s = n.target, c = t.contains(s), l = !1, u = o > 0, d = 0, f = 0;
	do {
		if (!s) break;
		var p = qu(e, s), m = p[0], h = p[1] - p[2] - a * m;
		(m || h) && Ku(e, s) && (d += h, f += m);
		var g = s.parentNode;
		s = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g;
	} while (!c && s !== document.body || c && (t.contains(s) || t === s));
	return (u && (i && Math.abs(d) < 1 || !i && o > d) || !u && (i && Math.abs(f) < 1 || !i && -o > f)) && (l = !0), l;
}, Xu = function(e) {
	return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, Zu = function(e) {
	return [e.deltaX, e.deltaY];
}, Qu = function(e) {
	return e && "current" in e ? e.current : e;
}, $u = function(e, t) {
	return e[0] === t[0] && e[1] === t[1];
}, ed = function(e) {
	return `
  .block-interactivity-${e} {pointer-events: none;}
  .allow-interactivity-${e} {pointer-events: all;}
`;
}, td = 0, nd = [];
function rd(t) {
	var n = e.useRef([]), r = e.useRef([0, 0]), i = e.useRef(), a = e.useState(td++)[0], o = e.useState(Tu)[0], s = e.useRef(t);
	e.useEffect(function() {
		s.current = t;
	}, [t]), e.useEffect(function() {
		if (t.inert) {
			document.body.classList.add(`block-interactivity-${a}`);
			var e = eu([t.lockRef.current], (t.shards || []).map(Qu), !0).filter(Boolean);
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
		var n = Xu(e), a = r.current, o = "deltaX" in e ? e.deltaX : a[0] - n[0], c = "deltaY" in e ? e.deltaY : a[1] - n[1], l, u = e.target, d = Math.abs(o) > Math.abs(c) ? "h" : "v";
		if ("touches" in e && d === "h" && u.type === "range") return !1;
		var f = window.getSelection(), p = f && f.anchorNode;
		if (p && (p === u || p.contains(u))) return !1;
		var m = Uu(d, u);
		if (!m) return !0;
		if (m ? l = d : (l = d === "v" ? "h" : "v", m = Uu(d, u)), !m) return !1;
		if (!i.current && "changedTouches" in e && (o || c) && (i.current = l), !l) return !0;
		var h = i.current || l;
		return Yu(h, t, e, h === "h" ? o : c, !0);
	}, []), l = e.useCallback(function(e) {
		var t = e;
		if (!(!nd.length || nd[nd.length - 1] !== o)) {
			var r = "deltaY" in t ? Zu(t) : Xu(t), i = n.current.filter(function(e) {
				return e.name === t.type && (e.target === t.target || t.target === e.shadowParent) && $u(e.delta, r);
			})[0];
			if (i && i.should) {
				t.cancelable && t.preventDefault();
				return;
			}
			if (!i) {
				var a = (s.current.shards || []).map(Qu).filter(Boolean).filter(function(e) {
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
			shadowParent: id(r)
		};
		n.current.push(a), setTimeout(function() {
			n.current = n.current.filter(function(e) {
				return e !== a;
			});
		}, 1);
	}, []), d = e.useCallback(function(e) {
		r.current = Xu(e), i.current = void 0;
	}, []), f = e.useCallback(function(e) {
		u(e.type, Zu(e), e.target, c(e, t.lockRef.current));
	}, []), p = e.useCallback(function(e) {
		u(e.type, Xu(e), e.target, c(e, t.lockRef.current));
	}, []);
	e.useEffect(function() {
		return nd.push(o), t.setCallbacks({
			onScrollCapture: f,
			onWheelCapture: f,
			onTouchMoveCapture: p
		}), document.addEventListener("wheel", l, Ru), document.addEventListener("touchmove", l, Ru), document.addEventListener("touchstart", d, Ru), function() {
			nd = nd.filter(function(e) {
				return e !== o;
			}), document.removeEventListener("wheel", l, Ru), document.removeEventListener("touchmove", l, Ru), document.removeEventListener("touchstart", d, Ru);
		};
	}, []);
	var m = t.removeScrollBar, h = t.inert;
	return e.createElement(e.Fragment, null, h ? e.createElement(o, { styles: ed(a) }) : null, m ? e.createElement(Fu, {
		noRelative: t.noRelative,
		gapMode: t.gapMode
	}) : null);
}
function id(e) {
	for (var t = null; e !== null;) e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
	return t;
}
//#endregion
//#region node_modules/.pnpm/react-remove-scroll@2.7.2_@types+react@19.2.14_react@19.2.6/node_modules/react-remove-scroll/dist/es2015/sidecar.js
var ad = mu(hu, rd), od = e.forwardRef(function(t, n) {
	return e.createElement(_u, Ql({}, t, {
		ref: n,
		sideCar: ad
	}));
});
od.classNames = _u.classNames;
//#endregion
//#region node_modules/.pnpm/aria-hidden@1.2.6/node_modules/aria-hidden/dist/es2015/index.js
var sd = function(e) {
	return typeof document > "u" ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
}, cd = /* @__PURE__ */ new WeakMap(), ld = /* @__PURE__ */ new WeakMap(), ud = {}, dd = 0, fd = function(e) {
	return e && (e.host || fd(e.parentNode));
}, pd = function(e, t) {
	return t.map(function(t) {
		if (e.contains(t)) return t;
		var n = fd(t);
		return n && e.contains(n) ? n : (console.error("aria-hidden", t, "in not contained inside", e, ". Doing nothing"), null);
	}).filter(function(e) {
		return !!e;
	});
}, md = function(e, t, n, r) {
	var i = pd(t, Array.isArray(e) ? e : [e]);
	ud[n] || (ud[n] = /* @__PURE__ */ new WeakMap());
	var a = ud[n], o = [], s = /* @__PURE__ */ new Set(), c = new Set(i), l = function(e) {
		!e || s.has(e) || (s.add(e), l(e.parentNode));
	};
	i.forEach(l);
	var u = function(e) {
		!e || c.has(e) || Array.prototype.forEach.call(e.children, function(e) {
			if (s.has(e)) u(e);
			else try {
				var t = e.getAttribute(r), i = t !== null && t !== "false", c = (cd.get(e) || 0) + 1, l = (a.get(e) || 0) + 1;
				cd.set(e, c), a.set(e, l), o.push(e), c === 1 && i && ld.set(e, !0), l === 1 && e.setAttribute(n, "true"), i || e.setAttribute(r, "true");
			} catch (t) {
				console.error("aria-hidden: cannot operate on ", e, t);
			}
		});
	};
	return u(t), s.clear(), dd++, function() {
		o.forEach(function(e) {
			var t = cd.get(e) - 1, i = a.get(e) - 1;
			cd.set(e, t), a.set(e, i), t || (ld.has(e) || e.removeAttribute(r), ld.delete(e)), i || e.removeAttribute(n);
		}), dd--, dd || (cd = /* @__PURE__ */ new WeakMap(), cd = /* @__PURE__ */ new WeakMap(), ld = /* @__PURE__ */ new WeakMap(), ud = {});
	};
}, hd = function(e, t, n) {
	n === void 0 && (n = "data-aria-hidden");
	var r = Array.from(Array.isArray(e) ? e : [e]), i = t || sd(e);
	return i ? (r.push.apply(r, Array.from(i.querySelectorAll("[aria-live], script"))), md(r, i, n, "aria-hidden")) : function() {
		return null;
	};
}, gd = "Dialog", [_d, vd] = ct(gd), [yd, bd] = _d(gd), xd = (t) => {
	let { __scopeDialog: n, children: r, open: i, defaultOpen: a, onOpenChange: o, modal: s = !0 } = t, c = e.useRef(null), l = e.useRef(null), [u, d] = xt({
		prop: i,
		defaultProp: a ?? !1,
		onChange: o,
		caller: gd
	});
	return /* @__PURE__ */ p(yd, {
		scope: n,
		triggerRef: c,
		contentRef: l,
		contentId: J(),
		titleId: J(),
		descriptionId: J(),
		open: u,
		onOpenChange: d,
		onOpenToggle: e.useCallback(() => d((e) => !e), [d]),
		modal: s,
		children: r
	});
};
xd.displayName = gd;
var Sd = "DialogTrigger", Cd = e.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = bd(Sd, n), a = U(t, i.triggerRef);
	return /* @__PURE__ */ p(K.button, {
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": i.open,
		"aria-controls": i.contentId,
		"data-state": Ud(i.open),
		...r,
		ref: a,
		onClick: W(e.onClick, i.onOpenToggle)
	});
});
Cd.displayName = Sd;
var wd = "DialogPortal", [Td, Ed] = _d(wd, { forceMount: void 0 }), Dd = (t) => {
	let { __scopeDialog: n, forceMount: r, children: i, container: a } = t, o = bd(wd, n);
	return /* @__PURE__ */ p(Td, {
		scope: n,
		forceMount: r,
		children: e.Children.map(i, (e) => /* @__PURE__ */ p(q, {
			present: r || o.open,
			children: /* @__PURE__ */ p(Jl, {
				asChild: !0,
				container: a,
				children: e
			})
		}))
	});
};
Dd.displayName = wd;
var Od = "DialogOverlay", kd = e.forwardRef((e, t) => {
	let n = Ed(Od, e.__scopeDialog), { forceMount: r = n.forceMount, ...i } = e, a = bd(Od, e.__scopeDialog);
	return a.modal ? /* @__PURE__ */ p(q, {
		present: r || a.open,
		children: /* @__PURE__ */ p(jd, {
			...i,
			ref: t
		})
	}) : null;
});
kd.displayName = Od;
var Ad = /* @__PURE__ */ ft("DialogOverlay.RemoveScroll"), jd = e.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = bd(Od, n);
	return /* @__PURE__ */ p(od, {
		as: Ad,
		allowPinchZoom: !0,
		shards: [i.contentRef],
		children: /* @__PURE__ */ p(K.div, {
			"data-state": Ud(i.open),
			...r,
			ref: t,
			style: {
				pointerEvents: "auto",
				...r.style
			}
		})
	});
}), Md = "DialogContent", Nd = e.forwardRef((e, t) => {
	let n = Ed(Md, e.__scopeDialog), { forceMount: r = n.forceMount, ...i } = e, a = bd(Md, e.__scopeDialog);
	return /* @__PURE__ */ p(q, {
		present: r || a.open,
		children: a.modal ? /* @__PURE__ */ p(Pd, {
			...i,
			ref: t
		}) : /* @__PURE__ */ p(Fd, {
			...i,
			ref: t
		})
	});
});
Nd.displayName = Md;
var Pd = e.forwardRef((t, n) => {
	let r = bd(Md, t.__scopeDialog), i = e.useRef(null), a = U(n, r.contentRef, i);
	return e.useEffect(() => {
		let e = i.current;
		if (e) return hd(e);
	}, []), /* @__PURE__ */ p(Id, {
		...t,
		ref: a,
		trapFocus: r.open,
		disableOutsidePointerEvents: !0,
		onCloseAutoFocus: W(t.onCloseAutoFocus, (e) => {
			e.preventDefault(), r.triggerRef.current?.focus();
		}),
		onPointerDownOutside: W(t.onPointerDownOutside, (e) => {
			let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0;
			(t.button === 2 || n) && e.preventDefault();
		}),
		onFocusOutside: W(t.onFocusOutside, (e) => e.preventDefault())
	});
}), Fd = e.forwardRef((t, n) => {
	let r = bd(Md, t.__scopeDialog), i = e.useRef(!1), a = e.useRef(!1);
	return /* @__PURE__ */ p(Id, {
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
}), Id = e.forwardRef((t, n) => {
	let { __scopeDialog: r, trapFocus: i, onOpenAutoFocus: a, onCloseAutoFocus: o, ...s } = t, c = bd(Md, r), l = e.useRef(null), u = U(n, l);
	return Xl(), /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p(Fl, {
		asChild: !0,
		loop: !0,
		trapped: i,
		onMountAutoFocus: a,
		onUnmountAutoFocus: o,
		children: /* @__PURE__ */ p(Sl, {
			role: "dialog",
			id: c.contentId,
			"aria-describedby": c.descriptionId,
			"aria-labelledby": c.titleId,
			"data-state": Ud(c.open),
			...s,
			ref: u,
			onDismiss: () => c.onOpenChange(!1)
		})
	}), /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p(qd, { titleId: c.titleId }), /* @__PURE__ */ p(Yd, {
		contentRef: l,
		descriptionId: c.descriptionId
	})] })] });
}), Ld = "DialogTitle", Rd = e.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = bd(Ld, n);
	return /* @__PURE__ */ p(K.h2, {
		id: i.titleId,
		...r,
		ref: t
	});
});
Rd.displayName = Ld;
var zd = "DialogDescription", Bd = e.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = bd(zd, n);
	return /* @__PURE__ */ p(K.p, {
		id: i.descriptionId,
		...r,
		ref: t
	});
});
Bd.displayName = zd;
var Vd = "DialogClose", Hd = e.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = bd(Vd, n);
	return /* @__PURE__ */ p(K.button, {
		type: "button",
		...r,
		ref: t,
		onClick: W(e.onClick, () => i.onOpenChange(!1))
	});
});
Hd.displayName = Vd;
function Ud(e) {
	return e ? "open" : "closed";
}
var Wd = "DialogTitleWarning", [Gd, Kd] = st(Wd, {
	contentName: Md,
	titleName: Ld,
	docsSlug: "dialog"
}), qd = ({ titleId: t }) => {
	let n = Kd(Wd), r = `\`${n.contentName}\` requires a \`${n.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${n.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${n.docsSlug}`;
	return e.useEffect(() => {
		t && (document.getElementById(t) || console.error(r));
	}, [r, t]), null;
}, Jd = "DialogDescriptionWarning", Yd = ({ contentRef: t, descriptionId: n }) => {
	let r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Kd(Jd).contentName}}.`;
	return e.useEffect(() => {
		let e = t.current?.getAttribute("aria-describedby");
		n && e && (document.getElementById(n) || console.warn(r));
	}, [
		r,
		t,
		n
	]), null;
}, Xd = xd, Zd = Cd, Qd = Dd, $d = kd, ef = Nd, tf = Rd, nf = Bd, rf = Hd, af = "[cmdk-group=\"\"]", of = "[cmdk-group-items=\"\"]", sf = "[cmdk-group-heading=\"\"]", cf = "[cmdk-item=\"\"]", lf = `${cf}:not([aria-disabled="true"])`, uf = "cmdk-item-select", df = "data-value", ff = (e, t, n) => ml(e, t, n), pf = e.createContext(void 0), mf = () => e.useContext(pf), hf = e.createContext(void 0), gf = () => e.useContext(hf), _f = e.createContext(void 0), vf = e.forwardRef((t, n) => {
	let r = Mf(() => ({
		search: "",
		value: t.value ?? t.defaultValue ?? "",
		selectedItemId: void 0,
		filtered: {
			count: 0,
			items: /* @__PURE__ */ new Map(),
			groups: /* @__PURE__ */ new Set()
		}
	})), i = Mf(() => /* @__PURE__ */ new Set()), a = Mf(() => /* @__PURE__ */ new Map()), o = Mf(() => /* @__PURE__ */ new Map()), s = Mf(() => /* @__PURE__ */ new Set()), c = Af(t), { label: l, children: u, value: d, onValueChange: f, filter: p, shouldFilter: m, loop: h, disablePointerSelection: g = !1, vimBindings: _ = !0, ...v } = t, y = J(), b = J(), x = J(), S = e.useRef(null), C = Ff();
	jf(() => {
		if (d !== void 0) {
			let e = d.trim();
			r.current.value = e, w.emit();
		}
	}, [d]), jf(() => {
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
		let n = c.current?.filter ?? ff;
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
			let t = e.closest(of);
			t ? t.appendChild(e.parentElement === t ? e : e.closest(`${of} > *`)) : n.appendChild(e.parentElement === n ? e : e.closest(`${of} > *`));
		}), t.sort((e, t) => t[1] - e[1]).forEach((e) => {
			let t = S.current?.querySelector(`${af}[${df}="${encodeURIComponent(e[0])}"]`);
			t?.parentElement.appendChild(t);
		});
	}
	function O() {
		let e = M().find((e) => e.getAttribute("aria-disabled") !== "true")?.getAttribute(df);
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
		t && (t.parentElement?.firstChild === t && ((e = t.closest(af)?.querySelector(sf)) == null || e.scrollIntoView({ block: "nearest" })), t.scrollIntoView({ block: "nearest" }));
	}
	function j() {
		return S.current?.querySelector(`${cf}[aria-selected="true"]`);
	}
	function M() {
		return Array.from(S.current?.querySelectorAll(lf) || []);
	}
	function N(e) {
		let t = M()[e];
		t && w.setState("value", t.getAttribute(df));
	}
	function P(e) {
		var t;
		let n = j(), r = M(), i = r.findIndex((e) => e === n), a = r[i + e];
		(t = c.current) != null && t.loop && (a = i + e < 0 ? r[r.length - 1] : i + e === r.length ? r[0] : r[i + e]), a && w.setState("value", a.getAttribute(df));
	}
	function ee(e) {
		let t = j()?.closest(af), n;
		for (; t && !n;) t = e > 0 ? Of(t, af) : kf(t, af), n = t?.querySelector(lf);
		n ? w.setState("value", n.getAttribute(df)) : P(e);
	}
	let F = () => N(M().length - 1), te = (e) => {
		e.preventDefault(), e.metaKey ? F() : e.altKey ? ee(1) : P(1);
	}, ne = (e) => {
		e.preventDefault(), e.metaKey ? N(0) : e.altKey ? ee(-1) : P(-1);
	};
	return e.createElement(jr.div, {
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
					_ && e.ctrlKey && te(e);
					break;
				case "ArrowDown":
					te(e);
					break;
				case "p":
				case "k":
					_ && e.ctrlKey && ne(e);
					break;
				case "ArrowUp":
					ne(e);
					break;
				case "Home":
					e.preventDefault(), N(0);
					break;
				case "End":
					e.preventDefault(), F();
					break;
				case "Enter": {
					e.preventDefault();
					let t = j();
					if (t) {
						let e = new Event(uf);
						t.dispatchEvent(e);
					}
				}
			}
		}
	}, e.createElement("label", {
		"cmdk-label": "",
		htmlFor: T.inputId,
		id: T.labelId,
		style: Rf
	}, l), Lf(t, (t) => e.createElement(hf.Provider, { value: w }, e.createElement(pf.Provider, { value: T }, t))));
}), yf = e.forwardRef((t, n) => {
	let r = J(), i = e.useRef(null), a = e.useContext(_f), o = mf(), s = Af(t), c = s.current?.forceMount ?? a?.forceMount;
	jf(() => {
		if (!c) return o.item(r, a?.id);
	}, [c]);
	let l = Pf(r, i, [
		t.value,
		t.children,
		i
	], t.keywords), u = gf(), d = Nf((e) => e.value && e.value === l.current), f = Nf((e) => c || o.filter() === !1 ? !0 : e.search ? e.filtered.items.get(r) > 0 : !0);
	e.useEffect(() => {
		let e = i.current;
		if (!(!e || t.disabled)) return e.addEventListener(uf, p), () => e.removeEventListener(uf, p);
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
	return e.createElement(jr.div, {
		ref: dt(i, n),
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
}), bf = e.forwardRef((t, n) => {
	let { heading: r, children: i, forceMount: a, ...o } = t, s = J(), c = e.useRef(null), l = e.useRef(null), u = J(), d = mf(), f = Nf((e) => a || d.filter() === !1 ? !0 : e.search ? e.filtered.groups.has(s) : !0);
	jf(() => d.group(s), []), Pf(s, c, [
		t.value,
		t.heading,
		l
	]);
	let p = e.useMemo(() => ({
		id: s,
		forceMount: a
	}), [a]);
	return e.createElement(jr.div, {
		ref: dt(c, n),
		...o,
		"cmdk-group": "",
		role: "presentation",
		hidden: f ? void 0 : !0
	}, r && e.createElement("div", {
		ref: l,
		"cmdk-group-heading": "",
		"aria-hidden": !0,
		id: u
	}, r), Lf(t, (t) => e.createElement("div", {
		"cmdk-group-items": "",
		role: "group",
		"aria-labelledby": r ? u : void 0
	}, e.createElement(_f.Provider, { value: p }, t))));
}), xf = e.forwardRef((t, n) => {
	let { alwaysRender: r, ...i } = t, a = e.useRef(null), o = Nf((e) => !e.search);
	return !r && !o ? null : e.createElement(jr.div, {
		ref: dt(a, n),
		...i,
		"cmdk-separator": "",
		role: "separator"
	});
}), Sf = e.forwardRef((t, n) => {
	let { onValueChange: r, ...i } = t, a = t.value != null, o = gf(), s = Nf((e) => e.search), c = Nf((e) => e.selectedItemId), l = mf();
	return e.useEffect(() => {
		t.value != null && o.setState("search", t.value);
	}, [t.value]), e.createElement(jr.input, {
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
}), Cf = e.forwardRef((t, n) => {
	let { children: r, label: i = "Suggestions", ...a } = t, o = e.useRef(null), s = e.useRef(null), c = Nf((e) => e.selectedItemId), l = mf();
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
	}, []), e.createElement(jr.div, {
		ref: dt(o, n),
		...a,
		"cmdk-list": "",
		role: "listbox",
		tabIndex: -1,
		"aria-activedescendant": c,
		"aria-label": i,
		id: l.listId
	}, Lf(t, (t) => e.createElement("div", {
		ref: dt(s, l.listInnerRef),
		"cmdk-list-sizer": ""
	}, t)));
}), wf = e.forwardRef((t, n) => {
	let { open: r, onOpenChange: i, overlayClassName: a, contentClassName: o, container: s, ...c } = t;
	return e.createElement(Xd, {
		open: r,
		onOpenChange: i
	}, e.createElement(Qd, { container: s }, e.createElement($d, {
		"cmdk-overlay": "",
		className: a
	}), e.createElement(ef, {
		"aria-label": t.label,
		"cmdk-dialog": "",
		className: o
	}, e.createElement(vf, {
		ref: n,
		...c
	}))));
}), Tf = e.forwardRef((t, n) => Nf((e) => e.filtered.count === 0) ? e.createElement(jr.div, {
	ref: n,
	...t,
	"cmdk-empty": "",
	role: "presentation"
}) : null), Ef = e.forwardRef((t, n) => {
	let { progress: r, children: i, label: a = "Loading...", ...o } = t;
	return e.createElement(jr.div, {
		ref: n,
		...o,
		"cmdk-loading": "",
		role: "progressbar",
		"aria-valuenow": r,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-label": a
	}, Lf(t, (t) => e.createElement("div", { "aria-hidden": !0 }, t)));
}), Df = Object.assign(vf, {
	List: Cf,
	Item: yf,
	Input: Sf,
	Group: bf,
	Separator: xf,
	Dialog: wf,
	Empty: Tf,
	Loading: Ef
});
function Of(e, t) {
	let n = e.nextElementSibling;
	for (; n;) {
		if (n.matches(t)) return n;
		n = n.nextElementSibling;
	}
}
function kf(e, t) {
	let n = e.previousElementSibling;
	for (; n;) {
		if (n.matches(t)) return n;
		n = n.previousElementSibling;
	}
}
function Af(t) {
	let n = e.useRef(t);
	return jf(() => {
		n.current = t;
	}), n;
}
var jf = typeof window > "u" ? e.useEffect : e.useLayoutEffect;
function Mf(t) {
	let n = e.useRef();
	return n.current === void 0 && (n.current = t()), n;
}
function Nf(t) {
	let n = gf(), r = () => t(n.snapshot());
	return e.useSyncExternalStore(n.subscribe, r, r);
}
function Pf(t, n, r, i = []) {
	let a = e.useRef(), o = mf();
	return jf(() => {
		var e;
		let s = (() => {
			for (let e of r) {
				if (typeof e == "string") return e.trim();
				if (typeof e == "object" && "current" in e) return e.current ? e.current.textContent?.trim() : a.current;
			}
		})(), c = i.map((e) => e.trim());
		o.value(t, s, c), (e = n.current) == null || e.setAttribute(df, s), a.current = s;
	}), a;
}
var Ff = () => {
	let [t, n] = e.useState(), r = Mf(() => /* @__PURE__ */ new Map());
	return jf(() => {
		r.current.forEach((e) => e()), r.current = /* @__PURE__ */ new Map();
	}, [t]), (e, t) => {
		r.current.set(e, t), n({});
	};
};
function If(e) {
	let t = e.type;
	return typeof t == "function" ? t(e.props) : "render" in t ? t.render(e.props) : e;
}
function Lf({ asChild: t, children: n }, r) {
	return t && e.isValidElement(n) ? e.cloneElement(If(n), { ref: n.ref }, r(n.props.children)) : r(n);
}
var Rf = {
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: "0",
	margin: "-1px",
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	borderWidth: "0"
}, zf = Xd, Bf = Zd, Vf = Qd, Hf = rf;
function Uf({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p($d, {
		ref: t,
		className: H("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", e),
		...n
	});
}
Uf.displayName = $d.displayName;
function Wf({ className: e, children: t, ref: n, ...r }) {
	return /* @__PURE__ */ m(Vf, { children: [/* @__PURE__ */ p(Uf, {}), /* @__PURE__ */ m(ef, {
		ref: n,
		className: H("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", e),
		...r,
		children: [t, /* @__PURE__ */ m(rf, {
			className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
			children: [/* @__PURE__ */ p(ar, { className: "h-4 w-4" }), /* @__PURE__ */ p("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
Wf.displayName = ef.displayName;
var Gf = ({ className: e, ...t }) => /* @__PURE__ */ p("div", {
	className: H("flex flex-col space-y-1.5 text-center sm:text-left", e),
	...t
});
Gf.displayName = "DialogHeader";
var Kf = ({ className: e, ...t }) => /* @__PURE__ */ p("div", {
	className: H("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", e),
	...t
});
Kf.displayName = "DialogFooter";
function qf({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p(tf, {
		ref: t,
		className: H("text-lg font-semibold leading-none tracking-tight", e),
		...n
	});
}
qf.displayName = tf.displayName;
function Jf({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p(nf, {
		ref: t,
		className: H("text-sm text-muted-foreground", e),
		...n
	});
}
Jf.displayName = nf.displayName;
//#endregion
//#region src/components/ui/command.tsx
function Yf({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p(Df, {
		ref: t,
		className: H("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground", e),
		...n
	});
}
Yf.displayName = Df.displayName;
var Xf = ({ children: e, ...t }) => /* @__PURE__ */ p(zf, {
	...t,
	children: /* @__PURE__ */ p(Wf, {
		className: "overflow-hidden p-0",
		children: /* @__PURE__ */ p(Yf, {
			className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5",
			children: e
		})
	})
});
function Zf({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ m("div", {
		className: "flex items-center border-b px-3",
		"cmdk-input-wrapper": "",
		children: [/* @__PURE__ */ p(nr, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }), /* @__PURE__ */ p(Df.Input, {
			ref: t,
			className: H("flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden focus:outline-hidden focus:ring-0 focus-visible:outline-hidden focus-visible:ring-0 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", e),
			...n
		})]
	});
}
Zf.displayName = Df.Input.displayName;
function Qf({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p(Df.List, {
		ref: t,
		className: H("max-h-[300px] overflow-y-auto overflow-x-hidden", e),
		...n
	});
}
Qf.displayName = Df.List.displayName;
function $f({ ref: e, ...t }) {
	return /* @__PURE__ */ p(Df.Empty, {
		ref: e,
		className: "py-6 text-center text-sm",
		...t
	});
}
$f.displayName = Df.Empty.displayName;
function ep({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p(Df.Group, {
		ref: t,
		className: H("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground", e),
		...n
	});
}
ep.displayName = Df.Group.displayName;
function tp({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p(Df.Separator, {
		ref: t,
		className: H("-mx-1 h-px bg-border", e),
		...n
	});
}
tp.displayName = Df.Separator.displayName;
function np({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p(Df.Item, {
		ref: t,
		className: H("relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", e),
		...n
	});
}
np.displayName = Df.Item.displayName;
var rp = ({ className: e, ...t }) => /* @__PURE__ */ p("span", {
	className: H("ml-auto text-xs tracking-widest text-muted-foreground", e),
	...t
});
rp.displayName = "CommandShortcut";
//#endregion
//#region node_modules/.pnpm/@floating-ui+utils@0.2.11/node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var ip = [
	"top",
	"right",
	"bottom",
	"left"
], ap = Math.min, op = Math.max, sp = Math.round, cp = Math.floor, lp = (e) => ({
	x: e,
	y: e
}), up = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function dp(e, t, n) {
	return op(e, ap(t, n));
}
function fp(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function pp(e) {
	return e.split("-")[0];
}
function mp(e) {
	return e.split("-")[1];
}
function hp(e) {
	return e === "x" ? "y" : "x";
}
function gp(e) {
	return e === "y" ? "height" : "width";
}
function _p(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function vp(e) {
	return hp(_p(e));
}
function yp(e, t, n) {
	n === void 0 && (n = !1);
	let r = mp(e), i = vp(e), a = gp(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = Op(o)), [o, Op(o)];
}
function bp(e) {
	let t = Op(e);
	return [
		xp(e),
		t,
		xp(t)
	];
}
function xp(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var Sp = ["left", "right"], Cp = ["right", "left"], wp = ["top", "bottom"], Tp = ["bottom", "top"];
function Ep(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? Cp : Sp : t ? Sp : Cp;
		case "left":
		case "right": return t ? wp : Tp;
		default: return [];
	}
}
function Dp(e, t, n, r) {
	let i = mp(e), a = Ep(pp(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(xp)))), a;
}
function Op(e) {
	let t = pp(e);
	return up[t] + e.slice(t.length);
}
function kp(e) {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...e
	};
}
function Ap(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : kp(e);
}
function jp(e) {
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
function Mp(e, t, n) {
	let { reference: r, floating: i } = e, a = _p(t), o = vp(t), s = gp(o), c = pp(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
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
	switch (mp(t)) {
		case "start":
			p[o] -= f * (n && l ? -1 : 1);
			break;
		case "end":
			p[o] += f * (n && l ? -1 : 1);
			break;
	}
	return p;
}
async function Np(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = fp(t, e), p = Ap(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = jp(await i.getClippingRect({
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
	}, y = jp(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
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
var Pp = 50, Fp = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: Np
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = Mp(l, r, c), f = r, p = 0, m = {};
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
		}, x && p < Pp && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = Mp(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, Ip = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = fp(e, t) || {};
		if (l == null) return {};
		let d = Ap(u), f = {
			x: n,
			y: r
		}, p = vp(i), m = gp(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		(!C || !await (o.isElement == null ? void 0 : o.isElement(S))) && (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = ap(d[_], T), D = ap(d[v], T), O = E, k = C - h[m] - D, A = C / 2 - h[m] / 2 + w, j = dp(O, A, k), M = !c.arrow && mp(i) != null && A !== j && a.reference[m] / 2 - (A < O ? E : D) - h[m] / 2 < 0, N = M ? A < O ? A - O : A - k : 0;
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
}), Lp = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = fp(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = pp(r), _ = _p(o), v = pp(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [Op(o)] : bp(o)), x = p !== "none";
			!d && x && b.push(...Dp(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = yp(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (!(u === "alignment" && _ !== _p(t)) || T.every((e) => _p(e.placement) === _ ? e.overflows[0] > 0 : !0))) return {
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
								let t = _p(e.placement);
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
function Rp(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function zp(e) {
	return ip.some((t) => e[t] >= 0);
}
var Bp = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n, platform: r } = t, { strategy: i = "referenceHidden", ...a } = fp(e, t);
			switch (i) {
				case "referenceHidden": {
					let e = Rp(await r.detectOverflow(t, {
						...a,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: zp(e)
					} };
				}
				case "escaped": {
					let e = Rp(await r.detectOverflow(t, {
						...a,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: zp(e)
					} };
				}
				default: return {};
			}
		}
	};
}, Vp = /* @__PURE__ */ new Set(["left", "top"]);
async function Hp(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = pp(n), s = mp(n), c = _p(n) === "y", l = Vp.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = fp(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
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
var Up = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await Hp(t, e);
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
}, Wp = function(e) {
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
			} }, ...l } = fp(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = _p(pp(i)), p = hp(f), m = u[p], h = u[f];
			if (o) {
				let e = p === "y" ? "top" : "left", t = p === "y" ? "bottom" : "right", n = m + d[e], r = m - d[t];
				m = dp(n, m, r);
			}
			if (s) {
				let e = f === "y" ? "top" : "left", t = f === "y" ? "bottom" : "right", n = h + d[e], r = h - d[t];
				h = dp(n, h, r);
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
}, Gp = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = fp(e, t), u = {
				x: n,
				y: r
			}, d = _p(i), f = hp(d), p = u[f], m = u[d], h = fp(s, t), g = typeof h == "number" ? {
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
				let e = f === "y" ? "width" : "height", t = Vp.has(pp(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, Kp = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			var n, r;
			let { placement: i, rects: a, platform: o, elements: s } = t, { apply: c = () => {}, ...l } = fp(e, t), u = await o.detectOverflow(t, l), d = pp(i), f = mp(i), p = _p(i) === "y", { width: m, height: h } = a.floating, g, _;
			d === "top" || d === "bottom" ? (g = d, _ = f === (await (o.isRTL == null ? void 0 : o.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (_ = d, g = f === "end" ? "top" : "bottom");
			let v = h - u.top - u.bottom, y = m - u.left - u.right, b = ap(h - u[g], v), x = ap(m - u[_], y), S = !t.middlewareData.shift, C = b, w = x;
			if ((n = t.middlewareData.shift) != null && n.enabled.x && (w = y), (r = t.middlewareData.shift) != null && r.enabled.y && (C = v), S && !f) {
				let e = op(u.left, 0), t = op(u.right, 0), n = op(u.top, 0), r = op(u.bottom, 0);
				p ? w = m - 2 * (e !== 0 || t !== 0 ? e + t : op(u.left, u.right)) : C = h - 2 * (n !== 0 || r !== 0 ? n + r : op(u.top, u.bottom));
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
function qp() {
	return typeof window < "u";
}
function Jp(e) {
	return Zp(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Yp(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Xp(e) {
	return ((Zp(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function Zp(e) {
	return qp() ? e instanceof Node || e instanceof Yp(e).Node : !1;
}
function Qp(e) {
	return qp() ? e instanceof Element || e instanceof Yp(e).Element : !1;
}
function $p(e) {
	return qp() ? e instanceof HTMLElement || e instanceof Yp(e).HTMLElement : !1;
}
function em(e) {
	return !qp() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Yp(e).ShadowRoot;
}
function tm(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = fm(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function nm(e) {
	return /^(table|td|th)$/.test(Jp(e));
}
function rm(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var im = /transform|translate|scale|rotate|perspective|filter/, am = /paint|layout|strict|content/, om = (e) => !!e && e !== "none", sm;
function cm(e) {
	let t = Qp(e) ? fm(e) : e;
	return om(t.transform) || om(t.translate) || om(t.scale) || om(t.rotate) || om(t.perspective) || !um() && (om(t.backdropFilter) || om(t.filter)) || im.test(t.willChange || "") || am.test(t.contain || "");
}
function lm(e) {
	let t = mm(e);
	for (; $p(t) && !dm(t);) {
		if (cm(t)) return t;
		if (rm(t)) return null;
		t = mm(t);
	}
	return null;
}
function um() {
	return sm ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), sm;
}
function dm(e) {
	return /^(html|body|#document)$/.test(Jp(e));
}
function fm(e) {
	return Yp(e).getComputedStyle(e);
}
function pm(e) {
	return Qp(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function mm(e) {
	if (Jp(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || em(e) && e.host || Xp(e);
	return em(t) ? t.host : t;
}
function hm(e) {
	let t = mm(e);
	return dm(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : $p(t) && tm(t) ? t : hm(t);
}
function gm(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = hm(e), i = r === e.ownerDocument?.body, a = Yp(r);
	if (i) {
		let e = _m(a);
		return t.concat(a, a.visualViewport || [], tm(r) ? r : [], e && n ? gm(e) : []);
	} else return t.concat(r, gm(r, [], n));
}
function _m(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region node_modules/.pnpm/@floating-ui+dom@1.7.6/node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function vm(e) {
	let t = fm(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = $p(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = sp(n) !== a || sp(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function ym(e) {
	return Qp(e) ? e : e.contextElement;
}
function bm(e) {
	let t = ym(e);
	if (!$p(t)) return lp(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = vm(t), o = (a ? sp(n.width) : n.width) / r, s = (a ? sp(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var xm = /* @__PURE__ */ lp(0);
function Sm(e) {
	let t = Yp(e);
	return !um() || !t.visualViewport ? xm : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function Cm(e, t, n) {
	return t === void 0 && (t = !1), !n || t && n !== Yp(e) ? !1 : t;
}
function wm(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = ym(e), o = lp(1);
	t && (r ? Qp(r) && (o = bm(r)) : o = bm(e));
	let s = Cm(a, n, r) ? Sm(a) : lp(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a) {
		let e = Yp(a), t = r && Qp(r) ? Yp(r) : r, n = e, i = _m(n);
		for (; i && r && t !== n;) {
			let e = bm(i), t = i.getBoundingClientRect(), r = fm(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = Yp(i), i = _m(n);
		}
	}
	return jp({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function Tm(e, t) {
	let n = pm(e).scrollLeft;
	return t ? t.left + n : wm(Xp(e)).left + n;
}
function Em(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - Tm(e, n),
		y: n.top + t.scrollTop
	};
}
function Dm(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = Xp(r), s = t ? rm(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = lp(1), u = lp(0), d = $p(r);
	if ((d || !d && !a) && ((Jp(r) !== "body" || tm(o)) && (c = pm(r)), d)) {
		let e = wm(r);
		l = bm(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? Em(o, c) : lp(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function Om(e) {
	return Array.from(e.getClientRects());
}
function km(e) {
	let t = Xp(e), n = pm(e), r = e.ownerDocument.body, i = op(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = op(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight), o = -n.scrollLeft + Tm(e), s = -n.scrollTop;
	return fm(r).direction === "rtl" && (o += op(t.clientWidth, r.clientWidth) - i), {
		width: i,
		height: a,
		x: o,
		y: s
	};
}
var Am = 25;
function jm(e, t) {
	let n = Yp(e), r = Xp(e), i = n.visualViewport, a = r.clientWidth, o = r.clientHeight, s = 0, c = 0;
	if (i) {
		a = i.width, o = i.height;
		let e = um();
		(!e || e && t === "fixed") && (s = i.offsetLeft, c = i.offsetTop);
	}
	let l = Tm(r);
	if (l <= 0) {
		let e = r.ownerDocument, t = e.body, n = getComputedStyle(t), i = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, o = Math.abs(r.clientWidth - t.clientWidth - i);
		o <= Am && (a -= o);
	} else l <= Am && (a += l);
	return {
		width: a,
		height: o,
		x: s,
		y: c
	};
}
function Mm(e, t) {
	let n = wm(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = $p(e) ? bm(e) : lp(1);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function Nm(e, t, n) {
	let r;
	if (t === "viewport") r = jm(e, n);
	else if (t === "document") r = km(Xp(e));
	else if (Qp(t)) r = Mm(t, n);
	else {
		let n = Sm(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return jp(r);
}
function Pm(e, t) {
	let n = mm(e);
	return n === t || !Qp(n) || dm(n) ? !1 : fm(n).position === "fixed" || Pm(n, t);
}
function Fm(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = gm(e, [], !1).filter((e) => Qp(e) && Jp(e) !== "body"), i = null, a = fm(e).position === "fixed", o = a ? mm(e) : e;
	for (; Qp(o) && !dm(o);) {
		let t = fm(o), n = cm(o);
		!n && t.position === "fixed" && (i = null), (a ? !n && !i : !n && t.position === "static" && i && (i.position === "absolute" || i.position === "fixed") || tm(o) && !n && Pm(e, o)) ? r = r.filter((e) => e !== o) : i = t, o = mm(o);
	}
	return t.set(e, r), r;
}
function Im(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? rm(t) ? [] : Fm(t, this._c) : [].concat(n), r], o = Nm(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = Nm(t, a[e], i);
		s = op(n.top, s), c = ap(n.right, c), l = ap(n.bottom, l), u = op(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function Lm(e) {
	let { width: t, height: n } = vm(e);
	return {
		width: t,
		height: n
	};
}
function Rm(e, t, n) {
	let r = $p(t), i = Xp(t), a = n === "fixed", o = wm(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = lp(0);
	function l() {
		c.x = Tm(i);
	}
	if (r || !r && !a) if ((Jp(t) !== "body" || tm(i)) && (s = pm(t)), r) {
		let e = wm(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	} else i && l();
	a && !r && i && l();
	let u = i && !r && !a ? Em(i, s) : lp(0);
	return {
		x: o.left + s.scrollLeft - c.x - u.x,
		y: o.top + s.scrollTop - c.y - u.y,
		width: o.width,
		height: o.height
	};
}
function zm(e) {
	return fm(e).position === "static";
}
function Bm(e, t) {
	if (!$p(e) || fm(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return Xp(e) === n && (n = n.ownerDocument.body), n;
}
function Vm(e, t) {
	let n = Yp(e);
	if (rm(e)) return n;
	if (!$p(e)) {
		let t = mm(e);
		for (; t && !dm(t);) {
			if (Qp(t) && !zm(t)) return t;
			t = mm(t);
		}
		return n;
	}
	let r = Bm(e, t);
	for (; r && nm(r) && zm(r);) r = Bm(r, t);
	return r && dm(r) && zm(r) && !cm(r) ? n : r || lm(e) || n;
}
var Hm = async function(e) {
	let t = this.getOffsetParent || Vm, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: Rm(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function Um(e) {
	return fm(e).direction === "rtl";
}
var Wm = {
	convertOffsetParentRelativeRectToViewportRelativeRect: Dm,
	getDocumentElement: Xp,
	getClippingRect: Im,
	getOffsetParent: Vm,
	getElementRects: Hm,
	getClientRects: Om,
	getDimensions: Lm,
	getScale: bm,
	isElement: Qp,
	isRTL: Um
};
function Gm(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Km(e, t) {
	let n = null, r, i = Xp(e);
	function a() {
		var e;
		clearTimeout(r), (e = n) == null || e.disconnect(), n = null;
	}
	function o(s, c) {
		s === void 0 && (s = !1), c === void 0 && (c = 1), a();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (s || t(), !f || !p) return;
		let m = cp(d), h = cp(i.clientWidth - (u + f)), g = cp(i.clientHeight - (d + p)), _ = cp(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: op(0, ap(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (n !== c) {
				if (!y) return o();
				n ? o(!1, n) : r = setTimeout(() => {
					o(!1, 1e-7);
				}, 1e3);
			}
			n === 1 && !Gm(l, e.getBoundingClientRect()) && o(), y = !1;
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
function qm(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = ym(e), u = i || a ? [...l ? gm(l) : [], ...t ? gm(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n, { passive: !0 }), a && e.addEventListener("resize", n);
	});
	let d = l && s ? Km(l, n) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? wm(e) : null;
	c && g();
	function g() {
		let t = wm(e);
		h && !Gm(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var Jm = Up, Ym = Wp, Xm = Lp, Zm = Kp, Qm = Bp, $m = Ip, eh = Gp, th = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = {
		platform: Wm,
		...n
	}, a = {
		...i.platform,
		_c: r
	};
	return Fp(e, t, {
		...i,
		platform: a
	});
}, nh = typeof document < "u" ? c : function() {};
function rh(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (typeof e == "function" && e.toString() === t.toString()) return !0;
	let n, r, i;
	if (e && t && typeof e == "object") {
		if (Array.isArray(e)) {
			if (n = e.length, n !== t.length) return !1;
			for (r = n; r-- !== 0;) if (!rh(e[r], t[r])) return !1;
			return !0;
		}
		if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
		for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
		for (r = n; r-- !== 0;) {
			let n = i[r];
			if (!(n === "_owner" && e.$$typeof) && !rh(e[n], t[n])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}
function ih(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function ah(e, t) {
	let n = ih(e);
	return Math.round(t * n) / n;
}
function oh(t) {
	let n = e.useRef(t);
	return nh(() => {
		n.current = t;
	}), n;
}
function sh(t) {
	t === void 0 && (t = {});
	let { placement: n = "bottom", strategy: r = "absolute", middleware: i = [], platform: a, elements: { reference: o, floating: s } = {}, transform: c = !0, whileElementsMounted: l, open: u } = t, [d, f] = e.useState({
		x: 0,
		y: 0,
		strategy: r,
		placement: n,
		middlewareData: {},
		isPositioned: !1
	}), [p, m] = e.useState(i);
	rh(p, i) || m(i);
	let [g, _] = e.useState(null), [v, y] = e.useState(null), b = e.useCallback((e) => {
		e !== w.current && (w.current = e, _(e));
	}, []), x = e.useCallback((e) => {
		e !== T.current && (T.current = e, y(e));
	}, []), S = o || g, C = s || v, w = e.useRef(null), T = e.useRef(null), E = e.useRef(d), D = l != null, O = oh(l), k = oh(a), A = oh(u), j = e.useCallback(() => {
		if (!w.current || !T.current) return;
		let e = {
			placement: n,
			strategy: r,
			middleware: p
		};
		k.current && (e.platform = k.current), th(w.current, T.current, e).then((e) => {
			let t = {
				...e,
				isPositioned: A.current !== !1
			};
			M.current && !rh(E.current, t) && (E.current = t, h.flushSync(() => {
				f(t);
			}));
		});
	}, [
		p,
		n,
		r,
		k,
		A
	]);
	nh(() => {
		u === !1 && E.current.isPositioned && (E.current.isPositioned = !1, f((e) => ({
			...e,
			isPositioned: !1
		})));
	}, [u]);
	let M = e.useRef(!1);
	nh(() => (M.current = !0, () => {
		M.current = !1;
	}), []), nh(() => {
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
	}), [S, C]), ee = e.useMemo(() => {
		let e = {
			position: r,
			left: 0,
			top: 0
		};
		if (!P.floating) return e;
		let t = ah(P.floating, d.x), n = ah(P.floating, d.y);
		return c ? {
			...e,
			transform: "translate(" + t + "px, " + n + "px)",
			...ih(P.floating) >= 1.5 && { willChange: "transform" }
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
		floatingStyles: ee
	}), [
		d,
		j,
		N,
		P,
		ee
	]);
}
var ch = (e) => {
	function t(e) {
		return {}.hasOwnProperty.call(e, "current");
	}
	return {
		name: "arrow",
		options: e,
		fn(n) {
			let { element: r, padding: i } = typeof e == "function" ? e(n) : e;
			return r && t(r) ? r.current == null ? {} : $m({
				element: r.current,
				padding: i
			}).fn(n) : r ? $m({
				element: r,
				padding: i
			}).fn(n) : {};
		}
	};
}, lh = (e, t) => {
	let n = Jm(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, uh = (e, t) => {
	let n = Ym(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, dh = (e, t) => ({
	fn: eh(e).fn,
	options: [e, t]
}), fh = (e, t) => {
	let n = Xm(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, ph = (e, t) => {
	let n = Zm(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, mh = (e, t) => {
	let n = Qm(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, hh = (e, t) => {
	let n = ch(e);
	return {
		name: n.name,
		fn: n.fn,
		options: [e, t]
	};
}, gh = "Arrow", _h = e.forwardRef((e, t) => {
	let { children: n, width: r = 10, height: i = 5, ...a } = e;
	return /* @__PURE__ */ p(K.svg, {
		...a,
		ref: t,
		width: r,
		height: i,
		viewBox: "0 0 30 10",
		preserveAspectRatio: "none",
		children: e.asChild ? n : /* @__PURE__ */ p("polygon", { points: "0,0 30,0 15,10" })
	});
});
_h.displayName = gh;
var vh = _h, yh = "Popper", [bh, xh] = ct(yh), [Sh, Ch] = bh(yh), wh = (t) => {
	let { __scopePopper: n, children: r } = t, [i, a] = e.useState(null);
	return /* @__PURE__ */ p(Sh, {
		scope: n,
		anchor: i,
		onAnchorChange: a,
		children: r
	});
};
wh.displayName = yh;
var Th = "PopperAnchor", Eh = e.forwardRef((t, n) => {
	let { __scopePopper: r, virtualRef: i, ...a } = t, o = Ch(Th, r), s = e.useRef(null), c = U(n, s), l = e.useRef(null);
	return e.useEffect(() => {
		let e = l.current;
		l.current = i?.current || s.current, e !== l.current && o.onAnchorChange(l.current);
	}), i ? null : /* @__PURE__ */ p(K.div, {
		...a,
		ref: c
	});
});
Eh.displayName = Th;
var Dh = "PopperContent", [Oh, kh] = bh(Dh), Ah = e.forwardRef((t, n) => {
	let { __scopePopper: r, side: i = "bottom", sideOffset: a = 0, align: o = "center", alignOffset: s = 0, arrowPadding: c = 0, avoidCollisions: l = !0, collisionBoundary: u = [], collisionPadding: d = 0, sticky: f = "partial", hideWhenDetached: m = !1, updatePositionStrategy: h = "optimized", onPlaced: g, ..._ } = t, v = Ch(Dh, r), [y, b] = e.useState(null), x = U(n, (e) => b(e)), [S, C] = e.useState(null), w = Ic(S), T = w?.width ?? 0, E = w?.height ?? 0, D = i + (o === "center" ? "" : "-" + o), O = typeof d == "number" ? d : {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...d
	}, k = Array.isArray(u) ? u : [u], A = k.length > 0, j = {
		padding: O,
		boundary: k.filter(Ph),
		altBoundary: A
	}, { refs: M, floatingStyles: N, placement: P, isPositioned: ee, middlewareData: F } = sh({
		strategy: "fixed",
		placement: D,
		whileElementsMounted: (...e) => qm(...e, { animationFrame: h === "always" }),
		elements: { reference: v.anchor },
		middleware: [
			lh({
				mainAxis: a + E,
				alignmentAxis: s
			}),
			l && uh({
				mainAxis: !0,
				crossAxis: !1,
				limiter: f === "partial" ? dh() : void 0,
				...j
			}),
			l && fh({ ...j }),
			ph({
				...j,
				apply: ({ elements: e, rects: t, availableWidth: n, availableHeight: r }) => {
					let { width: i, height: a } = t.reference, o = e.floating.style;
					o.setProperty("--radix-popper-available-width", `${n}px`), o.setProperty("--radix-popper-available-height", `${r}px`), o.setProperty("--radix-popper-anchor-width", `${i}px`), o.setProperty("--radix-popper-anchor-height", `${a}px`);
				}
			}),
			S && hh({
				element: S,
				padding: c
			}),
			Fh({
				arrowWidth: T,
				arrowHeight: E
			}),
			m && mh({
				strategy: "referenceHidden",
				...j
			})
		]
	}), [te, ne] = Ih(P), re = Y(g);
	G(() => {
		ee && re?.();
	}, [ee, re]);
	let ie = F.arrow?.x, I = F.arrow?.y, L = F.arrow?.centerOffset !== 0, [ae, oe] = e.useState();
	return G(() => {
		y && oe(window.getComputedStyle(y).zIndex);
	}, [y]), /* @__PURE__ */ p("div", {
		ref: M.setFloating,
		"data-radix-popper-content-wrapper": "",
		style: {
			...N,
			transform: ee ? N.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: ae,
			"--radix-popper-transform-origin": [F.transformOrigin?.x, F.transformOrigin?.y].join(" "),
			...F.hide?.referenceHidden && {
				visibility: "hidden",
				pointerEvents: "none"
			}
		},
		dir: t.dir,
		children: /* @__PURE__ */ p(Oh, {
			scope: r,
			placedSide: te,
			onArrowChange: C,
			arrowX: ie,
			arrowY: I,
			shouldHideArrow: L,
			children: /* @__PURE__ */ p(K.div, {
				"data-side": te,
				"data-align": ne,
				..._,
				ref: x,
				style: {
					..._.style,
					animation: ee ? void 0 : "none"
				}
			})
		})
	});
});
Ah.displayName = Dh;
var jh = "PopperArrow", Mh = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
}, Nh = e.forwardRef(function(e, t) {
	let { __scopePopper: n, ...r } = e, i = kh(jh, n), a = Mh[i.placedSide];
	return /* @__PURE__ */ p("span", {
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
		children: /* @__PURE__ */ p(vh, {
			...r,
			ref: t,
			style: {
				...r.style,
				display: "block"
			}
		})
	});
});
Nh.displayName = jh;
function Ph(e) {
	return e !== null;
}
var Fh = (e) => ({
	name: "transformOrigin",
	options: e,
	fn(t) {
		let { placement: n, rects: r, middlewareData: i } = t, a = i.arrow?.centerOffset !== 0, o = a ? 0 : e.arrowWidth, s = a ? 0 : e.arrowHeight, [c, l] = Ih(n), u = {
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
function Ih(e) {
	let [t, n = "center"] = e.split("-");
	return [t, n];
}
var Lh = wh, Rh = Eh, zh = Ah, Bh = Nh, Vh = "rovingFocusGroup.onEntryFocus", Hh = {
	bubbles: !1,
	cancelable: !0
}, Uh = "RovingFocusGroup", [Wh, Gh, Kh] = yt(Uh), [qh, Jh] = ct(Uh, [Kh]), [Yh, Xh] = qh(Uh), Zh = e.forwardRef((e, t) => /* @__PURE__ */ p(Wh.Provider, {
	scope: e.__scopeRovingFocusGroup,
	children: /* @__PURE__ */ p(Wh.Slot, {
		scope: e.__scopeRovingFocusGroup,
		children: /* @__PURE__ */ p(Qh, {
			...e,
			ref: t
		})
	})
}));
Zh.displayName = Uh;
var Qh = e.forwardRef((t, n) => {
	let { __scopeRovingFocusGroup: r, orientation: i, loop: a = !1, dir: o, currentTabStopId: s, defaultCurrentTabStopId: c, onCurrentTabStopIdChange: l, onEntryFocus: u, preventScrollOnEntryFocus: d = !1, ...f } = t, m = e.useRef(null), h = U(n, m), g = qt(o), [_, v] = xt({
		prop: s,
		defaultProp: c ?? null,
		onChange: l,
		caller: Uh
	}), [y, b] = e.useState(!1), x = Y(u), S = Gh(r), C = e.useRef(!1), [w, T] = e.useState(0);
	return e.useEffect(() => {
		let e = m.current;
		if (e) return e.addEventListener(Vh, x), () => e.removeEventListener(Vh, x);
	}, [x]), /* @__PURE__ */ p(Yh, {
		scope: r,
		orientation: i,
		dir: g,
		loop: a,
		currentTabStopId: _,
		onItemFocus: e.useCallback((e) => v(e), [v]),
		onItemShiftTab: e.useCallback(() => b(!0), []),
		onFocusableItemAdd: e.useCallback(() => T((e) => e + 1), []),
		onFocusableItemRemove: e.useCallback(() => T((e) => e - 1), []),
		children: /* @__PURE__ */ p(K.div, {
			tabIndex: y || w === 0 ? -1 : 0,
			"data-orientation": i,
			...f,
			ref: h,
			style: {
				outline: "none",
				...t.style
			},
			onMouseDown: W(t.onMouseDown, () => {
				C.current = !0;
			}),
			onFocus: W(t.onFocus, (e) => {
				let t = !C.current;
				if (e.target === e.currentTarget && t && !y) {
					let t = new CustomEvent(Vh, Hh);
					if (e.currentTarget.dispatchEvent(t), !t.defaultPrevented) {
						let e = S().filter((e) => e.focusable);
						ig([
							e.find((e) => e.active),
							e.find((e) => e.id === _),
							...e
						].filter(Boolean).map((e) => e.ref.current), d);
					}
				}
				C.current = !1;
			}),
			onBlur: W(t.onBlur, () => b(!1))
		})
	});
}), $h = "RovingFocusGroupItem", eg = e.forwardRef((t, n) => {
	let { __scopeRovingFocusGroup: r, focusable: i = !0, active: a = !1, tabStopId: o, children: s, ...c } = t, l = J(), u = o || l, d = Xh($h, r), f = d.currentTabStopId === u, m = Gh(r), { onFocusableItemAdd: h, onFocusableItemRemove: g, currentTabStopId: _ } = d;
	return e.useEffect(() => {
		if (i) return h(), () => g();
	}, [
		i,
		h,
		g
	]), /* @__PURE__ */ p(Wh.ItemSlot, {
		scope: r,
		id: u,
		focusable: i,
		active: a,
		children: /* @__PURE__ */ p(K.span, {
			tabIndex: f ? 0 : -1,
			"data-orientation": d.orientation,
			...c,
			ref: n,
			onMouseDown: W(t.onMouseDown, (e) => {
				i ? d.onItemFocus(u) : e.preventDefault();
			}),
			onFocus: W(t.onFocus, () => d.onItemFocus(u)),
			onKeyDown: W(t.onKeyDown, (e) => {
				if (e.key === "Tab" && e.shiftKey) {
					d.onItemShiftTab();
					return;
				}
				if (e.target !== e.currentTarget) return;
				let t = rg(e, d.orientation, d.dir);
				if (t !== void 0) {
					if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
					e.preventDefault();
					let n = m().filter((e) => e.focusable).map((e) => e.ref.current);
					if (t === "last") n.reverse();
					else if (t === "prev" || t === "next") {
						t === "prev" && n.reverse();
						let r = n.indexOf(e.currentTarget);
						n = d.loop ? ag(n, r + 1) : n.slice(r + 1);
					}
					setTimeout(() => ig(n));
				}
			}),
			children: typeof s == "function" ? s({
				isCurrentTabStop: f,
				hasTabStop: _ != null
			}) : s
		})
	});
});
eg.displayName = $h;
var tg = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last"
};
function ng(e, t) {
	return t === "rtl" ? e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e : e;
}
function rg(e, t, n) {
	let r = ng(e.key, n);
	if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r))) return tg[r];
}
function ig(e, t = !1) {
	let n = document.activeElement;
	for (let r of e) if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function ag(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
var og = Zh, sg = eg, cg = ["Enter", " "], lg = [
	"ArrowDown",
	"PageUp",
	"Home"
], ug = [
	"ArrowUp",
	"PageDown",
	"End"
], dg = [...lg, ...ug], fg = {
	ltr: [...cg, "ArrowRight"],
	rtl: [...cg, "ArrowLeft"]
}, pg = {
	ltr: ["ArrowLeft"],
	rtl: ["ArrowRight"]
}, mg = "Menu", [hg, gg, _g] = yt(mg), [vg, yg] = ct(mg, [
	_g,
	xh,
	Jh
]), bg = xh(), xg = Jh(), [Sg, Cg] = vg(mg), [wg, Tg] = vg(mg), Eg = (t) => {
	let { __scopeMenu: n, open: r = !1, children: i, dir: a, onOpenChange: o, modal: s = !0 } = t, c = bg(n), [l, u] = e.useState(null), d = e.useRef(!1), f = Y(o), m = qt(a);
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
	}, []), /* @__PURE__ */ p(Lh, {
		...c,
		children: /* @__PURE__ */ p(Sg, {
			scope: n,
			open: r,
			onOpenChange: f,
			content: l,
			onContentChange: u,
			children: /* @__PURE__ */ p(wg, {
				scope: n,
				onClose: e.useCallback(() => f(!1), [f]),
				isUsingKeyboardRef: d,
				dir: m,
				modal: s,
				children: i
			})
		})
	});
};
Eg.displayName = mg;
var Dg = "MenuAnchor", Og = e.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ p(Rh, {
		...bg(n),
		...r,
		ref: t
	});
});
Og.displayName = Dg;
var kg = "MenuPortal", [Ag, jg] = vg(kg, { forceMount: void 0 }), Mg = (e) => {
	let { __scopeMenu: t, forceMount: n, children: r, container: i } = e, a = Cg(kg, t);
	return /* @__PURE__ */ p(Ag, {
		scope: t,
		forceMount: n,
		children: /* @__PURE__ */ p(q, {
			present: n || a.open,
			children: /* @__PURE__ */ p(Jl, {
				asChild: !0,
				container: i,
				children: r
			})
		})
	});
};
Mg.displayName = kg;
var Ng = "MenuContent", [Pg, Fg] = vg(Ng), Ig = e.forwardRef((e, t) => {
	let n = jg(Ng, e.__scopeMenu), { forceMount: r = n.forceMount, ...i } = e, a = Cg(Ng, e.__scopeMenu), o = Tg(Ng, e.__scopeMenu);
	return /* @__PURE__ */ p(hg.Provider, {
		scope: e.__scopeMenu,
		children: /* @__PURE__ */ p(q, {
			present: r || a.open,
			children: /* @__PURE__ */ p(hg.Slot, {
				scope: e.__scopeMenu,
				children: o.modal ? /* @__PURE__ */ p(Lg, {
					...i,
					ref: t
				}) : /* @__PURE__ */ p(Rg, {
					...i,
					ref: t
				})
			})
		})
	});
}), Lg = e.forwardRef((t, n) => {
	let r = Cg(Ng, t.__scopeMenu), i = e.useRef(null), a = U(n, i);
	return e.useEffect(() => {
		let e = i.current;
		if (e) return hd(e);
	}, []), /* @__PURE__ */ p(Bg, {
		...t,
		ref: a,
		trapFocus: r.open,
		disableOutsidePointerEvents: r.open,
		disableOutsideScroll: !0,
		onFocusOutside: W(t.onFocusOutside, (e) => e.preventDefault(), { checkForDefaultPrevented: !1 }),
		onDismiss: () => r.onOpenChange(!1)
	});
}), Rg = e.forwardRef((e, t) => {
	let n = Cg(Ng, e.__scopeMenu);
	return /* @__PURE__ */ p(Bg, {
		...e,
		ref: t,
		trapFocus: !1,
		disableOutsidePointerEvents: !1,
		disableOutsideScroll: !1,
		onDismiss: () => n.onOpenChange(!1)
	});
}), zg = /* @__PURE__ */ ft("MenuContent.ScrollLock"), Bg = e.forwardRef((t, n) => {
	let { __scopeMenu: r, loop: i = !1, trapFocus: a, onOpenAutoFocus: o, onCloseAutoFocus: s, disableOutsidePointerEvents: c, onEntryFocus: l, onEscapeKeyDown: u, onPointerDownOutside: d, onFocusOutside: f, onInteractOutside: m, onDismiss: h, disableOutsideScroll: g, ..._ } = t, v = Cg(Ng, r), y = Tg(Ng, r), b = bg(r), x = xg(r), S = gg(r), [C, w] = e.useState(null), T = e.useRef(null), E = U(n, T, v.onContentChange), D = e.useRef(0), O = e.useRef(""), k = e.useRef(0), A = e.useRef(null), j = e.useRef("right"), M = e.useRef(0), N = g ? od : e.Fragment, P = g ? {
		as: zg,
		allowPinchZoom: !0
	} : void 0, ee = (e) => {
		let t = O.current + e, n = S().filter((e) => !e.disabled), r = document.activeElement, i = n.find((e) => e.ref.current === r)?.textValue, a = w_(n.map((e) => e.textValue), t, i), o = n.find((e) => e.textValue === a)?.ref.current;
		(function e(t) {
			O.current = t, window.clearTimeout(D.current), t !== "" && (D.current = window.setTimeout(() => e(""), 1e3));
		})(t), o && setTimeout(() => o.focus());
	};
	e.useEffect(() => () => window.clearTimeout(D.current), []), Xl();
	let F = e.useCallback((e) => j.current === A.current?.side && E_(e, A.current?.area), []);
	return /* @__PURE__ */ p(Pg, {
		scope: r,
		searchRef: O,
		onItemEnter: e.useCallback((e) => {
			F(e) && e.preventDefault();
		}, [F]),
		onItemLeave: e.useCallback((e) => {
			F(e) || (T.current?.focus(), w(null));
		}, [F]),
		onTriggerLeave: e.useCallback((e) => {
			F(e) && e.preventDefault();
		}, [F]),
		pointerGraceTimerRef: k,
		onPointerGraceIntentChange: e.useCallback((e) => {
			A.current = e;
		}, []),
		children: /* @__PURE__ */ p(N, {
			...P,
			children: /* @__PURE__ */ p(Fl, {
				asChild: !0,
				trapped: a,
				onMountAutoFocus: W(o, (e) => {
					e.preventDefault(), T.current?.focus({ preventScroll: !0 });
				}),
				onUnmountAutoFocus: s,
				children: /* @__PURE__ */ p(Sl, {
					asChild: !0,
					disableOutsidePointerEvents: c,
					onEscapeKeyDown: u,
					onPointerDownOutside: d,
					onFocusOutside: f,
					onInteractOutside: m,
					onDismiss: h,
					children: /* @__PURE__ */ p(og, {
						asChild: !0,
						...x,
						dir: y.dir,
						orientation: "vertical",
						loop: i,
						currentTabStopId: C,
						onCurrentTabStopIdChange: w,
						onEntryFocus: W(l, (e) => {
							y.isUsingKeyboardRef.current || e.preventDefault();
						}),
						preventScrollOnEntryFocus: !0,
						children: /* @__PURE__ */ p(zh, {
							role: "menu",
							"aria-orientation": "vertical",
							"data-state": y_(v.open),
							"data-radix-menu-content": "",
							dir: y.dir,
							...b,
							..._,
							ref: E,
							style: {
								outline: "none",
								..._.style
							},
							onKeyDown: W(_.onKeyDown, (e) => {
								let t = e.target.closest("[data-radix-menu-content]") === e.currentTarget, n = e.ctrlKey || e.altKey || e.metaKey, r = e.key.length === 1;
								t && (e.key === "Tab" && e.preventDefault(), !n && r && ee(e.key));
								let i = T.current;
								if (e.target !== i || !dg.includes(e.key)) return;
								e.preventDefault();
								let a = S().filter((e) => !e.disabled).map((e) => e.ref.current);
								ug.includes(e.key) && a.reverse(), S_(a);
							}),
							onBlur: W(t.onBlur, (e) => {
								e.currentTarget.contains(e.target) || (window.clearTimeout(D.current), O.current = "");
							}),
							onPointerMove: W(t.onPointerMove, D_((e) => {
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
Ig.displayName = Ng;
var Vg = "MenuGroup", Hg = e.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ p(K.div, {
		role: "group",
		...r,
		ref: t
	});
});
Hg.displayName = Vg;
var Ug = "MenuLabel", Wg = e.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ p(K.div, {
		...r,
		ref: t
	});
});
Wg.displayName = Ug;
var Gg = "MenuItem", Kg = "menu.itemSelect", qg = e.forwardRef((t, n) => {
	let { disabled: r = !1, onSelect: i, ...a } = t, o = e.useRef(null), s = Tg(Gg, t.__scopeMenu), c = Fg(Gg, t.__scopeMenu), l = U(n, o), u = e.useRef(!1), d = () => {
		let e = o.current;
		if (!r && e) {
			let t = new CustomEvent(Kg, {
				bubbles: !0,
				cancelable: !0
			});
			e.addEventListener(Kg, (e) => i?.(e), { once: !0 }), wt(e, t), t.defaultPrevented ? u.current = !1 : s.onClose();
		}
	};
	return /* @__PURE__ */ p(Jg, {
		...a,
		ref: l,
		disabled: r,
		onClick: W(t.onClick, d),
		onPointerDown: (e) => {
			t.onPointerDown?.(e), u.current = !0;
		},
		onPointerUp: W(t.onPointerUp, (e) => {
			u.current || e.currentTarget?.click();
		}),
		onKeyDown: W(t.onKeyDown, (e) => {
			let t = c.searchRef.current !== "";
			r || t && e.key === " " || cg.includes(e.key) && (e.currentTarget.click(), e.preventDefault());
		})
	});
});
qg.displayName = Gg;
var Jg = e.forwardRef((t, n) => {
	let { __scopeMenu: r, disabled: i = !1, textValue: a, ...o } = t, s = Fg(Gg, r), c = xg(r), l = e.useRef(null), u = U(n, l), [d, f] = e.useState(!1), [m, h] = e.useState("");
	return e.useEffect(() => {
		let e = l.current;
		e && h((e.textContent ?? "").trim());
	}, [o.children]), /* @__PURE__ */ p(hg.ItemSlot, {
		scope: r,
		disabled: i,
		textValue: a ?? m,
		children: /* @__PURE__ */ p(sg, {
			asChild: !0,
			...c,
			focusable: !i,
			children: /* @__PURE__ */ p(K.div, {
				role: "menuitem",
				"data-highlighted": d ? "" : void 0,
				"aria-disabled": i || void 0,
				"data-disabled": i ? "" : void 0,
				...o,
				ref: u,
				onPointerMove: W(t.onPointerMove, D_((e) => {
					i ? s.onItemLeave(e) : (s.onItemEnter(e), e.defaultPrevented || e.currentTarget.focus({ preventScroll: !0 }));
				})),
				onPointerLeave: W(t.onPointerLeave, D_((e) => s.onItemLeave(e))),
				onFocus: W(t.onFocus, () => f(!0)),
				onBlur: W(t.onBlur, () => f(!1))
			})
		})
	});
}), Yg = "MenuCheckboxItem", Xg = e.forwardRef((e, t) => {
	let { checked: n = !1, onCheckedChange: r, ...i } = e;
	return /* @__PURE__ */ p(i_, {
		scope: e.__scopeMenu,
		checked: n,
		children: /* @__PURE__ */ p(qg, {
			role: "menuitemcheckbox",
			"aria-checked": b_(n) ? "mixed" : n,
			...i,
			ref: t,
			"data-state": x_(n),
			onSelect: W(i.onSelect, () => r?.(b_(n) ? !0 : !n), { checkForDefaultPrevented: !1 })
		})
	});
});
Xg.displayName = Yg;
var Zg = "MenuRadioGroup", [Qg, $g] = vg(Zg, {
	value: void 0,
	onValueChange: () => {}
}), e_ = e.forwardRef((e, t) => {
	let { value: n, onValueChange: r, ...i } = e, a = Y(r);
	return /* @__PURE__ */ p(Qg, {
		scope: e.__scopeMenu,
		value: n,
		onValueChange: a,
		children: /* @__PURE__ */ p(Hg, {
			...i,
			ref: t
		})
	});
});
e_.displayName = Zg;
var t_ = "MenuRadioItem", n_ = e.forwardRef((e, t) => {
	let { value: n, ...r } = e, i = $g(t_, e.__scopeMenu), a = n === i.value;
	return /* @__PURE__ */ p(i_, {
		scope: e.__scopeMenu,
		checked: a,
		children: /* @__PURE__ */ p(qg, {
			role: "menuitemradio",
			"aria-checked": a,
			...r,
			ref: t,
			"data-state": x_(a),
			onSelect: W(r.onSelect, () => i.onValueChange?.(n), { checkForDefaultPrevented: !1 })
		})
	});
});
n_.displayName = t_;
var r_ = "MenuItemIndicator", [i_, a_] = vg(r_, { checked: !1 }), o_ = e.forwardRef((e, t) => {
	let { __scopeMenu: n, forceMount: r, ...i } = e, a = a_(r_, n);
	return /* @__PURE__ */ p(q, {
		present: r || b_(a.checked) || a.checked === !0,
		children: /* @__PURE__ */ p(K.span, {
			...i,
			ref: t,
			"data-state": x_(a.checked)
		})
	});
});
o_.displayName = r_;
var s_ = "MenuSeparator", c_ = e.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ p(K.div, {
		role: "separator",
		"aria-orientation": "horizontal",
		...r,
		ref: t
	});
});
c_.displayName = s_;
var l_ = "MenuArrow", u_ = e.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ p(Bh, {
		...bg(n),
		...r,
		ref: t
	});
});
u_.displayName = l_;
var d_ = "MenuSub", [f_, p_] = vg(d_), m_ = (t) => {
	let { __scopeMenu: n, children: r, open: i = !1, onOpenChange: a } = t, o = Cg(d_, n), s = bg(n), [c, l] = e.useState(null), [u, d] = e.useState(null), f = Y(a);
	return e.useEffect(() => (o.open === !1 && f(!1), () => f(!1)), [o.open, f]), /* @__PURE__ */ p(Lh, {
		...s,
		children: /* @__PURE__ */ p(Sg, {
			scope: n,
			open: i,
			onOpenChange: f,
			content: u,
			onContentChange: d,
			children: /* @__PURE__ */ p(f_, {
				scope: n,
				contentId: J(),
				triggerId: J(),
				trigger: c,
				onTriggerChange: l,
				children: r
			})
		})
	});
};
m_.displayName = d_;
var h_ = "MenuSubTrigger", g_ = e.forwardRef((t, n) => {
	let r = Cg(h_, t.__scopeMenu), i = Tg(h_, t.__scopeMenu), a = p_(h_, t.__scopeMenu), o = Fg(h_, t.__scopeMenu), s = e.useRef(null), { pointerGraceTimerRef: c, onPointerGraceIntentChange: l } = o, u = { __scopeMenu: t.__scopeMenu }, d = e.useCallback(() => {
		s.current && window.clearTimeout(s.current), s.current = null;
	}, []);
	return e.useEffect(() => d, [d]), e.useEffect(() => {
		let e = c.current;
		return () => {
			window.clearTimeout(e), l(null);
		};
	}, [c, l]), /* @__PURE__ */ p(Og, {
		asChild: !0,
		...u,
		children: /* @__PURE__ */ p(Jg, {
			id: a.triggerId,
			"aria-haspopup": "menu",
			"aria-expanded": r.open,
			"aria-controls": a.contentId,
			"data-state": y_(r.open),
			...t,
			ref: dt(n, a.onTriggerChange),
			onClick: (e) => {
				t.onClick?.(e), !(t.disabled || e.defaultPrevented) && (e.currentTarget.focus(), r.open || r.onOpenChange(!0));
			},
			onPointerMove: W(t.onPointerMove, D_((e) => {
				o.onItemEnter(e), !e.defaultPrevented && !t.disabled && !r.open && !s.current && (o.onPointerGraceIntentChange(null), s.current = window.setTimeout(() => {
					r.onOpenChange(!0), d();
				}, 100));
			})),
			onPointerLeave: W(t.onPointerLeave, D_((e) => {
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
			onKeyDown: W(t.onKeyDown, (e) => {
				let n = o.searchRef.current !== "";
				t.disabled || n && e.key === " " || fg[i.dir].includes(e.key) && (r.onOpenChange(!0), r.content?.focus(), e.preventDefault());
			})
		})
	});
});
g_.displayName = h_;
var __ = "MenuSubContent", v_ = e.forwardRef((t, n) => {
	let r = jg(Ng, t.__scopeMenu), { forceMount: i = r.forceMount, ...a } = t, o = Cg(Ng, t.__scopeMenu), s = Tg(Ng, t.__scopeMenu), c = p_(__, t.__scopeMenu), l = e.useRef(null), u = U(n, l);
	return /* @__PURE__ */ p(hg.Provider, {
		scope: t.__scopeMenu,
		children: /* @__PURE__ */ p(q, {
			present: i || o.open,
			children: /* @__PURE__ */ p(hg.Slot, {
				scope: t.__scopeMenu,
				children: /* @__PURE__ */ p(Bg, {
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
					onFocusOutside: W(t.onFocusOutside, (e) => {
						e.target !== c.trigger && o.onOpenChange(!1);
					}),
					onEscapeKeyDown: W(t.onEscapeKeyDown, (e) => {
						s.onClose(), e.preventDefault();
					}),
					onKeyDown: W(t.onKeyDown, (e) => {
						let t = e.currentTarget.contains(e.target), n = pg[s.dir].includes(e.key);
						t && n && (o.onOpenChange(!1), c.trigger?.focus(), e.preventDefault());
					})
				})
			})
		})
	});
});
v_.displayName = __;
function y_(e) {
	return e ? "open" : "closed";
}
function b_(e) {
	return e === "indeterminate";
}
function x_(e) {
	return b_(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function S_(e) {
	let t = document.activeElement;
	for (let n of e) if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function C_(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
function w_(e, t, n) {
	let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1, a = C_(e, Math.max(i, 0));
	r.length === 1 && (a = a.filter((e) => e !== n));
	let o = a.find((e) => e.toLowerCase().startsWith(r.toLowerCase()));
	return o === n ? void 0 : o;
}
function T_(e, t) {
	let { x: n, y: r } = e, i = !1;
	for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
		let o = t[e], s = t[a], c = o.x, l = o.y, u = s.x, d = s.y;
		l > r != d > r && n < (u - c) * (r - l) / (d - l) + c && (i = !i);
	}
	return i;
}
function E_(e, t) {
	return t ? T_({
		x: e.clientX,
		y: e.clientY
	}, t) : !1;
}
function D_(e) {
	return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var O_ = Eg, k_ = Og, A_ = Mg, j_ = Ig, M_ = Hg, N_ = Wg, P_ = qg, F_ = Xg, I_ = e_, L_ = n_, R_ = o_, z_ = c_, B_ = u_, V_ = m_, H_ = g_, U_ = v_, W_ = "DropdownMenu", [G_, K_] = ct(W_, [yg]), q_ = yg(), [J_, Y_] = G_(W_), X_ = (t) => {
	let { __scopeDropdownMenu: n, children: r, dir: i, open: a, defaultOpen: o, onOpenChange: s, modal: c = !0 } = t, l = q_(n), u = e.useRef(null), [d, f] = xt({
		prop: a,
		defaultProp: o ?? !1,
		onChange: s,
		caller: W_
	});
	return /* @__PURE__ */ p(J_, {
		scope: n,
		triggerId: J(),
		triggerRef: u,
		contentId: J(),
		open: d,
		onOpenChange: f,
		onOpenToggle: e.useCallback(() => f((e) => !e), [f]),
		modal: c,
		children: /* @__PURE__ */ p(O_, {
			...l,
			open: d,
			onOpenChange: f,
			dir: i,
			modal: c,
			children: r
		})
	});
};
X_.displayName = W_;
var Z_ = "DropdownMenuTrigger", Q_ = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, disabled: r = !1, ...i } = e, a = Y_(Z_, n);
	return /* @__PURE__ */ p(k_, {
		asChild: !0,
		...q_(n),
		children: /* @__PURE__ */ p(K.button, {
			type: "button",
			id: a.triggerId,
			"aria-haspopup": "menu",
			"aria-expanded": a.open,
			"aria-controls": a.open ? a.contentId : void 0,
			"data-state": a.open ? "open" : "closed",
			"data-disabled": r ? "" : void 0,
			disabled: r,
			...i,
			ref: dt(t, a.triggerRef),
			onPointerDown: W(e.onPointerDown, (e) => {
				!r && e.button === 0 && e.ctrlKey === !1 && (a.onOpenToggle(), a.open || e.preventDefault());
			}),
			onKeyDown: W(e.onKeyDown, (e) => {
				r || (["Enter", " "].includes(e.key) && a.onOpenToggle(), e.key === "ArrowDown" && a.onOpenChange(!0), [
					"Enter",
					" ",
					"ArrowDown"
				].includes(e.key) && e.preventDefault());
			})
		})
	});
});
Q_.displayName = Z_;
var $_ = "DropdownMenuPortal", ev = (e) => {
	let { __scopeDropdownMenu: t, ...n } = e;
	return /* @__PURE__ */ p(A_, {
		...q_(t),
		...n
	});
};
ev.displayName = $_;
var tv = "DropdownMenuContent", nv = e.forwardRef((t, n) => {
	let { __scopeDropdownMenu: r, ...i } = t, a = Y_(tv, r), o = q_(r), s = e.useRef(!1);
	return /* @__PURE__ */ p(j_, {
		id: a.contentId,
		"aria-labelledby": a.triggerId,
		...o,
		...i,
		ref: n,
		onCloseAutoFocus: W(t.onCloseAutoFocus, (e) => {
			s.current || a.triggerRef.current?.focus(), s.current = !1, e.preventDefault();
		}),
		onInteractOutside: W(t.onInteractOutside, (e) => {
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
nv.displayName = tv;
var rv = "DropdownMenuGroup", iv = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(M_, {
		...q_(n),
		...r,
		ref: t
	});
});
iv.displayName = rv;
var av = "DropdownMenuLabel", ov = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(N_, {
		...q_(n),
		...r,
		ref: t
	});
});
ov.displayName = av;
var sv = "DropdownMenuItem", cv = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(P_, {
		...q_(n),
		...r,
		ref: t
	});
});
cv.displayName = sv;
var lv = "DropdownMenuCheckboxItem", uv = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(F_, {
		...q_(n),
		...r,
		ref: t
	});
});
uv.displayName = lv;
var dv = "DropdownMenuRadioGroup", fv = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(I_, {
		...q_(n),
		...r,
		ref: t
	});
});
fv.displayName = dv;
var pv = "DropdownMenuRadioItem", mv = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(L_, {
		...q_(n),
		...r,
		ref: t
	});
});
mv.displayName = pv;
var hv = "DropdownMenuItemIndicator", gv = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(R_, {
		...q_(n),
		...r,
		ref: t
	});
});
gv.displayName = hv;
var _v = "DropdownMenuSeparator", vv = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(z_, {
		...q_(n),
		...r,
		ref: t
	});
});
vv.displayName = _v;
var yv = "DropdownMenuArrow", bv = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(B_, {
		...q_(n),
		...r,
		ref: t
	});
});
bv.displayName = yv;
var xv = (e) => {
	let { __scopeDropdownMenu: t, children: n, open: r, onOpenChange: i, defaultOpen: a } = e, o = q_(t), [s, c] = xt({
		prop: r,
		defaultProp: a ?? !1,
		onChange: i,
		caller: "DropdownMenuSub"
	});
	return /* @__PURE__ */ p(V_, {
		...o,
		open: s,
		onOpenChange: c,
		children: n
	});
}, Sv = "DropdownMenuSubTrigger", Cv = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(H_, {
		...q_(n),
		...r,
		ref: t
	});
});
Cv.displayName = Sv;
var wv = "DropdownMenuSubContent", Tv = e.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e;
	return /* @__PURE__ */ p(U_, {
		...q_(n),
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
Tv.displayName = wv;
var Ev = X_, Dv = Q_, Ov = ev, kv = nv, Av = iv, jv = ov, Mv = cv, Nv = uv, Pv = fv, Fv = mv, Iv = gv, Lv = vv, Rv = xv, zv = Cv, Bv = Tv, Vv = Ev, Hv = Dv, Uv = Av, Wv = Ov, Gv = Rv, Kv = Pv;
function qv({ className: e, inset: t, children: n, ref: r, ...i }) {
	return /* @__PURE__ */ m(zv, {
		ref: r,
		className: H("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", t && "pl-8", e),
		...i,
		children: [n, /* @__PURE__ */ p(Kn, { className: "ml-auto" })]
	});
}
qv.displayName = zv.displayName;
function Jv({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p(Bv, {
		ref: t,
		className: H("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", e),
		...n
	});
}
Jv.displayName = Bv.displayName;
function Yv({ className: e, sideOffset: t = 4, ref: n, ...r }) {
	return /* @__PURE__ */ p(Ov, { children: /* @__PURE__ */ p(kv, {
		ref: n,
		sideOffset: t,
		className: H("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", e),
		...r
	}) });
}
Yv.displayName = kv.displayName;
function Xv({ className: e, inset: t, ref: n, ...r }) {
	return /* @__PURE__ */ p(Mv, {
		ref: n,
		className: H("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", t && "pl-8", e),
		...r
	});
}
Xv.displayName = Mv.displayName;
function Zv({ className: e, children: t, checked: n, ref: r, ...i }) {
	return /* @__PURE__ */ m(Nv, {
		ref: r,
		className: H("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", e),
		checked: n,
		...i,
		children: [/* @__PURE__ */ p("span", {
			className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
			children: /* @__PURE__ */ p(Iv, { children: /* @__PURE__ */ p(Un, { className: "h-4 w-4" }) })
		}), t]
	});
}
Zv.displayName = Nv.displayName;
function Qv({ className: e, children: t, ref: n, ...r }) {
	return /* @__PURE__ */ m(Fv, {
		ref: n,
		className: H("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", e),
		...r,
		children: [/* @__PURE__ */ p("span", {
			className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
			children: /* @__PURE__ */ p(Iv, { children: /* @__PURE__ */ p(Zn, { className: "h-2 w-2 fill-current" }) })
		}), t]
	});
}
Qv.displayName = Fv.displayName;
function $v({ className: e, inset: t, ref: n, ...r }) {
	return /* @__PURE__ */ p(jv, {
		ref: n,
		className: H("px-2 py-1.5 text-sm font-semibold", t && "pl-8", e),
		...r
	});
}
$v.displayName = jv.displayName;
function ey({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p(Lv, {
		ref: t,
		className: H("-mx-1 my-1 h-px bg-muted", e),
		...n
	});
}
ey.displayName = Lv.displayName;
var ty = ({ className: e, ...t }) => /* @__PURE__ */ p("span", {
	className: H("ml-auto text-xs tracking-widest opacity-60", e),
	...t
});
ty.displayName = "DropdownMenuShortcut";
//#endregion
//#region node_modules/.pnpm/react-hook-form@7.75.0_react@19.2.6/node_modules/react-hook-form/dist/index.esm.mjs
var ny = (e) => e.type === "checkbox", ry = (e) => e instanceof Date, iy = (e) => e == null, ay = (e) => typeof e == "object", oy = (e) => !iy(e) && !Array.isArray(e) && ay(e) && !ry(e), sy = (e) => oy(e) && e.target ? ny(e.target) ? e.target.checked : e.target.value : e, cy = (e, t) => t.split(".").some((t, n, r) => !isNaN(Number(t)) && e.has(r.slice(0, n).join("."))), ly = (e) => {
	let t = e.constructor && e.constructor.prototype;
	return oy(t) && t.hasOwnProperty("isPrototypeOf");
}, uy = typeof window < "u" && window.HTMLElement !== void 0 && typeof document < "u";
function dy(e) {
	if (e instanceof Date) return new Date(e);
	let t = typeof FileList < "u" && e instanceof FileList;
	if (uy && (e instanceof Blob || t)) return e;
	let n = Array.isArray(e);
	if (!n && !(oy(e) && ly(e))) return e;
	let r = n ? [] : Object.create(Object.getPrototypeOf(e));
	for (let t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = dy(e[t]));
	return r;
}
var fy = (e) => /^\w*$/.test(e), py = (e) => e === void 0, my = (e) => Array.isArray(e) ? e.filter(Boolean) : [], hy = (e) => my(e.replace(/["|']|\]/g, "").split(/\.|\[/)), gy = (e, t, n) => {
	if (!t || !oy(e)) return n;
	let r = (fy(t) ? [t] : hy(t)).reduce((e, t) => iy(e) ? void 0 : e[t], e);
	return py(r) || r === e ? py(e[t]) ? n : e[t] : r;
}, _y = (e) => typeof e == "boolean", vy = (e) => typeof e == "function", yy = (e, t, n) => {
	let r = -1, i = fy(t) ? [t] : hy(t), a = i.length, o = a - 1;
	for (; ++r < a;) {
		let t = i[r], a = n;
		if (r !== o) {
			let n = e[t];
			a = oy(n) || Array.isArray(n) ? n : isNaN(+i[r + 1]) ? {} : [];
		}
		if (t === "__proto__" || t === "constructor" || t === "prototype") return;
		e[t] = a, e = e[t];
	}
}, by = {
	BLUR: "blur",
	FOCUS_OUT: "focusout",
	CHANGE: "change",
	SUBMIT: "submit",
	TRIGGER: "trigger",
	VALID: "valid"
}, xy = {
	onBlur: "onBlur",
	onChange: "onChange",
	onSubmit: "onSubmit",
	onTouched: "onTouched",
	all: "all"
}, Sy = t.createContext(null);
Sy.displayName = "HookFormControlContext";
var Cy = () => t.useContext(Sy), wy = (e, t, n, r = !0) => {
	let i = {};
	for (let a in e) Object.defineProperty(i, a, { get: () => {
		let i = a;
		return t._proxyFormState[i] !== xy.all && (t._proxyFormState[i] = !r || xy.all), n && (n[i] = !0), e[i];
	} });
	return i;
}, Ty = typeof window < "u" ? t.useLayoutEffect : t.useEffect;
function Ey(e) {
	let n = Cy(), { control: r = n, disabled: i, name: a, exact: o } = e || {}, [s, c] = t.useState(() => ({
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
	return Ty(() => r._subscribe({
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
	}, [r]), t.useMemo(() => wy(s, r, l.current, !1), [s, r]);
}
var Dy = (e) => typeof e == "string", Oy = (e, t, n, r, i) => Dy(e) ? (r && t.watch.add(e), gy(n, e, i)) : Array.isArray(e) ? e.map((e) => (r && t.watch.add(e), gy(n, e))) : (r && (t.watchAll = !0), n), ky = (e) => iy(e) || !ay(e);
function Ay(e, t, n = /* @__PURE__ */ new WeakSet()) {
	if (e === t) return !0;
	if (ky(e) || ky(t)) return Object.is(e, t);
	if (ry(e) && ry(t)) return Object.is(e.getTime(), t.getTime());
	let r = Object.keys(e), i = Object.keys(t);
	if (r.length !== i.length) return !1;
	if (n.has(e) || n.has(t)) return !0;
	n.add(e), n.add(t);
	for (let i of r) {
		let r = e[i];
		if (!(i in t)) return !1;
		if (i !== "ref") {
			let e = t[i];
			if (ry(r) && ry(e) || (oy(r) || Array.isArray(r)) && (oy(e) || Array.isArray(e)) ? !Ay(r, e, n) : !Object.is(r, e)) return !1;
		}
	}
	return !0;
}
function jy(e) {
	let n = Cy(), { control: r = n, name: i, defaultValue: a, disabled: o, exact: s, compute: c } = e || {}, l = t.useRef(a), u = t.useRef(c), d = t.useRef(void 0), f = t.useRef(r), p = t.useRef(i);
	u.current = c;
	let [m, h] = t.useState(() => {
		let e = r._getWatch(i, l.current);
		return u.current ? u.current(e) : e;
	}), g = t.useCallback((e) => {
		let t = Oy(i, r._names, e || r._formValues, !1, l.current);
		return u.current ? u.current(t) : t;
	}, [
		r._formValues,
		r._names,
		i
	]), _ = t.useCallback((e) => {
		if (!o) {
			let t = Oy(i, r._names, e || r._formValues, !1, l.current);
			if (u.current) {
				let e = u.current(t);
				Ay(e, d.current) || (h(e), d.current = e);
			} else h(t);
		}
	}, [
		r._formValues,
		r._names,
		o,
		i
	]);
	Ty(() => ((f.current !== r || !Ay(p.current, i)) && (f.current = r, p.current = i, _()), r._subscribe({
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
		let e = !v && !Ay(y, i);
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
function My(e) {
	let n = Cy(), { name: r, disabled: i, control: a = n, shouldUnregister: o, defaultValue: s, exact: c = !0 } = e, l = cy(a._names.array, r), u = jy({
		control: a,
		name: r,
		defaultValue: t.useMemo(() => gy(a._formValues, r, gy(a._defaultValues, r, s)), [
			a,
			r,
			s
		]),
		exact: c
	}), d = Ey({
		control: a,
		name: r,
		exact: c
	}), f = t.useRef(e), p = t.useRef(a.register(r, {
		...e.rules,
		value: u,
		..._y(e.disabled) ? { disabled: e.disabled } : {}
	}));
	f.current = e;
	let m = t.useMemo(() => Object.defineProperties({}, {
		invalid: {
			enumerable: !0,
			get: () => !!gy(d.errors, r)
		},
		isDirty: {
			enumerable: !0,
			get: () => !!gy(d.dirtyFields, r)
		},
		isTouched: {
			enumerable: !0,
			get: () => !!gy(d.touchedFields, r)
		},
		isValidating: {
			enumerable: !0,
			get: () => !!gy(d.validatingFields, r)
		},
		error: {
			enumerable: !0,
			get: () => gy(d.errors, r)
		}
	}), [d, r]), h = t.useCallback((e) => p.current.onChange({
		target: {
			value: sy(e),
			name: r
		},
		type: by.CHANGE
	}), [r]), g = t.useCallback(() => p.current.onBlur({
		target: {
			value: gy(a._formValues, r),
			name: r
		},
		type: by.BLUR
	}), [r, a._formValues]), _ = t.useCallback((e) => {
		let t = gy(a._fields, r);
		t && t._f && e && (t._f.ref = {
			focus: () => vy(e.focus) && e.focus(),
			select: () => vy(e.select) && e.select(),
			setCustomValidity: (t) => vy(e.setCustomValidity) && e.setCustomValidity(t),
			reportValidity: () => vy(e.reportValidity) && e.reportValidity()
		});
	}, [a._fields, r]), v = t.useMemo(() => ({
		name: r,
		value: u,
		..._y(i) || d.disabled ? { disabled: d.disabled || i } : {},
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
			..._y(f.current.disabled) ? { disabled: f.current.disabled } : {}
		});
		let t = (e, t) => {
			let n = gy(a._fields, e);
			n && n._f && (n._f.mount = t);
		};
		if (t(r, !0), e) {
			let e = dy(gy(a._options.defaultValues, r, f.current.defaultValue));
			yy(a._defaultValues, r, e), py(gy(a._formValues, r)) && yy(a._formValues, r, e);
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
var Ny = (e) => e.render(My(e)), Py = t.createContext(null);
Py.displayName = "HookFormContext";
var Fy = () => t.useContext(Py), Iy = (e) => {
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
	return t.createElement(Py.Provider, { value: b }, t.createElement(Sy.Provider, { value: b.control }, n));
};
xy.onSubmit, xy.onChange;
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-label@2.1.8_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react@_8d35ec453e0b59eefe06771bb1432577/node_modules/@radix-ui/react-label/dist/index.mjs
var Ly = "Label", Ry = e.forwardRef((e, t) => /* @__PURE__ */ p(jr.label, {
	...e,
	ref: t,
	onMouseDown: (t) => {
		t.target.closest("button, input, select, textarea") || (e.onMouseDown?.(t), !t.defaultPrevented && t.detail > 1 && t.preventDefault());
	}
}));
Ry.displayName = Ly;
var zy = Ry, By = fr("text-body-sm font-medium text-content-primary leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-60");
function Vy(e) {
	let { className: t, ref: n, ...r } = e;
	return /* @__PURE__ */ p(zy, {
		ref: n,
		className: H(By(), t),
		...r
	});
}
Vy.displayName = zy.displayName;
//#endregion
//#region src/components/ui/form.tsx
var Hy = Iy, Uy = e.createContext({}), Wy = ({ ...e }) => /* @__PURE__ */ p(Uy.Provider, {
	value: { name: e.name },
	children: /* @__PURE__ */ p(Ny, { ...e })
}), Gy = () => {
	let t = e.useContext(Uy), n = e.useContext(Ky), { getFieldState: r, formState: i } = Fy(), a = r(t.name, i);
	if (!t) throw Error("useFormField must be used within <FormField>");
	let { id: o } = n;
	return {
		id: o,
		name: t.name,
		formItemId: `${o}-form-item`,
		formDescriptionId: `${o}-form-item-description`,
		formMessageId: `${o}-form-item-message`,
		...a
	};
}, Ky = e.createContext({});
function qy({ className: t, ref: n, ...r }) {
	let i = e.useId();
	return /* @__PURE__ */ p(Ky.Provider, {
		value: { id: i },
		children: /* @__PURE__ */ p("div", {
			ref: n,
			className: H("space-y-1.5", t),
			...r
		})
	});
}
qy.displayName = "FormItem";
function Jy({ className: e, ref: t, ...n }) {
	let { error: r, formItemId: i } = Gy();
	return /* @__PURE__ */ p(Vy, {
		ref: t,
		className: H(r && "text-feedback-danger", e),
		htmlFor: i,
		...n
	});
}
Jy.displayName = "FormLabel";
function Yy({ ref: e, ...t }) {
	let { error: n, formItemId: r, formDescriptionId: i, formMessageId: a } = Gy();
	return /* @__PURE__ */ p("div", {
		id: r,
		"aria-describedby": n ? `${i} ${a}` : i,
		"aria-invalid": !!n,
		...t
	});
}
Yy.displayName = "FormControl";
function Xy({ className: e, ref: t, ...n }) {
	let { formDescriptionId: r } = Gy();
	return /* @__PURE__ */ p("p", {
		ref: t,
		id: r,
		className: H("text-caption text-content-secondary", e),
		...n
	});
}
Xy.displayName = "FormDescription";
function Zy({ className: e, children: t, ref: n, ...r }) {
	let { error: i, formMessageId: a } = Gy(), o = i ? String(i?.message) : t;
	return o ? /* @__PURE__ */ p("p", {
		ref: n,
		id: a,
		role: "alert",
		className: H("text-caption font-medium text-feedback-danger flex items-center gap-1", e),
		...r,
		children: o
	}) : null;
}
Zy.displayName = "FormMessage";
//#endregion
//#region src/components/ui/input.tsx
function Qy({ className: e, type: t, ref: n, ...r }) {
	return /* @__PURE__ */ p("input", {
		type: t,
		className: H("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", e),
		ref: n,
		...r
	});
}
//#endregion
//#region src/components/ui/pagination.tsx
var $y = ({ className: e, ...t }) => /* @__PURE__ */ p("nav", {
	role: "navigation",
	"aria-label": "pagination",
	className: H("mx-auto flex w-full justify-center", e),
	...t
});
$y.displayName = "Pagination";
function eb({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p("ul", {
		ref: t,
		className: H("flex flex-row items-center gap-1", e),
		...n
	});
}
eb.displayName = "PaginationContent";
function tb({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p("li", {
		ref: t,
		className: H("", e),
		...n
	});
}
tb.displayName = "PaginationItem";
var nb = ({ className: e, isActive: t, size: n = "icon", ...r }) => /* @__PURE__ */ p("a", {
	"aria-current": t ? "page" : void 0,
	className: H(fi({
		variant: t ? "outline" : "ghost",
		size: n
	}), e),
	...r
});
nb.displayName = "PaginationLink";
var rb = ({ className: e, ...t }) => /* @__PURE__ */ m(nb, {
	"aria-label": "Go to previous page",
	size: "default",
	className: H("gap-1 pl-2.5", e),
	...t,
	children: [/* @__PURE__ */ p(Gn, { className: "h-4 w-4" }), /* @__PURE__ */ p("span", { children: "Previous" })]
});
rb.displayName = "PaginationPrevious";
var ib = ({ className: e, ...t }) => /* @__PURE__ */ m(nb, {
	"aria-label": "Go to next page",
	size: "default",
	className: H("gap-1 pr-2.5", e),
	...t,
	children: [/* @__PURE__ */ p("span", { children: "Next" }), /* @__PURE__ */ p(Kn, { className: "h-4 w-4" })]
});
ib.displayName = "PaginationNext";
var ab = ({ className: e, ...t }) => /* @__PURE__ */ m("span", {
	"aria-hidden": !0,
	className: H("flex h-9 w-9 items-center justify-center", e),
	...t,
	children: [/* @__PURE__ */ p(Qn, { className: "h-4 w-4" }), /* @__PURE__ */ p("span", {
		className: "sr-only",
		children: "More pages"
	})]
});
ab.displayName = "PaginationEllipsis";
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-popover@1.1.15_@types+react-dom@19.2.3_@types+react@19.2.14__@types+rea_70579f2082d5a15782122fa6c39e7d95/node_modules/@radix-ui/react-popover/dist/index.mjs
var ob = "Popover", [sb, cb] = ct(ob, [xh]), lb = xh(), [ub, db] = sb(ob), fb = (t) => {
	let { __scopePopover: n, children: r, open: i, defaultOpen: a, onOpenChange: o, modal: s = !1 } = t, c = lb(n), l = e.useRef(null), [u, d] = e.useState(!1), [f, m] = xt({
		prop: i,
		defaultProp: a ?? !1,
		onChange: o,
		caller: ob
	});
	return /* @__PURE__ */ p(Lh, {
		...c,
		children: /* @__PURE__ */ p(ub, {
			scope: n,
			contentId: J(),
			triggerRef: l,
			open: f,
			onOpenChange: m,
			onOpenToggle: e.useCallback(() => m((e) => !e), [m]),
			hasCustomAnchor: u,
			onCustomAnchorAdd: e.useCallback(() => d(!0), []),
			onCustomAnchorRemove: e.useCallback(() => d(!1), []),
			modal: s,
			children: r
		})
	});
};
fb.displayName = ob;
var pb = "PopoverAnchor", mb = e.forwardRef((t, n) => {
	let { __scopePopover: r, ...i } = t, a = db(pb, r), o = lb(r), { onCustomAnchorAdd: s, onCustomAnchorRemove: c } = a;
	return e.useEffect(() => (s(), () => c()), [s, c]), /* @__PURE__ */ p(Rh, {
		...o,
		...i,
		ref: n
	});
});
mb.displayName = pb;
var hb = "PopoverTrigger", gb = e.forwardRef((e, t) => {
	let { __scopePopover: n, ...r } = e, i = db(hb, n), a = lb(n), o = U(t, i.triggerRef), s = /* @__PURE__ */ p(K.button, {
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": i.open,
		"aria-controls": i.contentId,
		"data-state": jb(i.open),
		...r,
		ref: o,
		onClick: W(e.onClick, i.onOpenToggle)
	});
	return i.hasCustomAnchor ? s : /* @__PURE__ */ p(Rh, {
		asChild: !0,
		...a,
		children: s
	});
});
gb.displayName = hb;
var _b = "PopoverPortal", [vb, yb] = sb(_b, { forceMount: void 0 }), bb = (e) => {
	let { __scopePopover: t, forceMount: n, children: r, container: i } = e, a = db(_b, t);
	return /* @__PURE__ */ p(vb, {
		scope: t,
		forceMount: n,
		children: /* @__PURE__ */ p(q, {
			present: n || a.open,
			children: /* @__PURE__ */ p(Jl, {
				asChild: !0,
				container: i,
				children: r
			})
		})
	});
};
bb.displayName = _b;
var xb = "PopoverContent", Sb = e.forwardRef((e, t) => {
	let n = yb(xb, e.__scopePopover), { forceMount: r = n.forceMount, ...i } = e, a = db(xb, e.__scopePopover);
	return /* @__PURE__ */ p(q, {
		present: r || a.open,
		children: a.modal ? /* @__PURE__ */ p(wb, {
			...i,
			ref: t
		}) : /* @__PURE__ */ p(Tb, {
			...i,
			ref: t
		})
	});
});
Sb.displayName = xb;
var Cb = /* @__PURE__ */ ft("PopoverContent.RemoveScroll"), wb = e.forwardRef((t, n) => {
	let r = db(xb, t.__scopePopover), i = e.useRef(null), a = U(n, i), o = e.useRef(!1);
	return e.useEffect(() => {
		let e = i.current;
		if (e) return hd(e);
	}, []), /* @__PURE__ */ p(od, {
		as: Cb,
		allowPinchZoom: !0,
		children: /* @__PURE__ */ p(Eb, {
			...t,
			ref: a,
			trapFocus: r.open,
			disableOutsidePointerEvents: !0,
			onCloseAutoFocus: W(t.onCloseAutoFocus, (e) => {
				e.preventDefault(), o.current || r.triggerRef.current?.focus();
			}),
			onPointerDownOutside: W(t.onPointerDownOutside, (e) => {
				let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0;
				o.current = t.button === 2 || n;
			}, { checkForDefaultPrevented: !1 }),
			onFocusOutside: W(t.onFocusOutside, (e) => e.preventDefault(), { checkForDefaultPrevented: !1 })
		})
	});
}), Tb = e.forwardRef((t, n) => {
	let r = db(xb, t.__scopePopover), i = e.useRef(!1), a = e.useRef(!1);
	return /* @__PURE__ */ p(Eb, {
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
}), Eb = e.forwardRef((e, t) => {
	let { __scopePopover: n, trapFocus: r, onOpenAutoFocus: i, onCloseAutoFocus: a, disableOutsidePointerEvents: o, onEscapeKeyDown: s, onPointerDownOutside: c, onFocusOutside: l, onInteractOutside: u, ...d } = e, f = db(xb, n), m = lb(n);
	return Xl(), /* @__PURE__ */ p(Fl, {
		asChild: !0,
		loop: !0,
		trapped: r,
		onMountAutoFocus: i,
		onUnmountAutoFocus: a,
		children: /* @__PURE__ */ p(Sl, {
			asChild: !0,
			disableOutsidePointerEvents: o,
			onInteractOutside: u,
			onEscapeKeyDown: s,
			onPointerDownOutside: c,
			onFocusOutside: l,
			onDismiss: () => f.onOpenChange(!1),
			children: /* @__PURE__ */ p(zh, {
				"data-state": jb(f.open),
				role: "dialog",
				id: f.contentId,
				...m,
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
}), Db = "PopoverClose", Ob = e.forwardRef((e, t) => {
	let { __scopePopover: n, ...r } = e, i = db(Db, n);
	return /* @__PURE__ */ p(K.button, {
		type: "button",
		...r,
		ref: t,
		onClick: W(e.onClick, () => i.onOpenChange(!1))
	});
});
Ob.displayName = Db;
var kb = "PopoverArrow", Ab = e.forwardRef((e, t) => {
	let { __scopePopover: n, ...r } = e;
	return /* @__PURE__ */ p(Bh, {
		...lb(n),
		...r,
		ref: t
	});
});
Ab.displayName = kb;
function jb(e) {
	return e ? "open" : "closed";
}
var Mb = fb, Nb = gb, Pb = bb, Fb = Sb, Ib = Mb, Lb = Nb;
function Rb(e) {
	let { className: t, align: n = "center", sideOffset: r = 4, ref: i, ...a } = e;
	return /* @__PURE__ */ p(Pb, { children: /* @__PURE__ */ p(Fb, {
		ref: i,
		align: n,
		sideOffset: r,
		className: H("z-popover w-72 rounded-md border border-border-default bg-popover p-4 text-popover-foreground shadow-elevation-4 outline-hidden", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", t),
		...a
	}) });
}
Rb.displayName = Fb.displayName;
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-progress@1.1.8_@types+react-dom@19.2.3_@types+react@19.2.14__@types+rea_c874217f22a2df2315dec5efdad92310/node_modules/@radix-ui/react-progress/dist/index.mjs
var zb = "Progress", Bb = 100, [Vb, Hb] = vr(zb), [Ub, Wb] = Vb(zb), Gb = e.forwardRef((e, t) => {
	let { __scopeProgress: n, value: r = null, max: i, getValueLabel: a = Jb, ...o } = e;
	(i || i === 0) && !Zb(i) && console.error($b(`${i}`, "Progress"));
	let s = Zb(i) ? i : Bb;
	r !== null && !Qb(r, s) && console.error(ex(`${r}`, "Progress"));
	let c = Qb(r, s) ? r : null, l = Xb(c) ? a(c, s) : void 0;
	return /* @__PURE__ */ p(Ub, {
		scope: n,
		value: c,
		max: s,
		children: /* @__PURE__ */ p(jr.div, {
			"aria-valuemax": s,
			"aria-valuemin": 0,
			"aria-valuenow": Xb(c) ? c : void 0,
			"aria-valuetext": l,
			role: "progressbar",
			"data-state": Yb(c, s),
			"data-value": c ?? void 0,
			"data-max": s,
			...o,
			ref: t
		})
	});
});
Gb.displayName = zb;
var Kb = "ProgressIndicator", qb = e.forwardRef((e, t) => {
	let { __scopeProgress: n, ...r } = e, i = Wb(Kb, n);
	return /* @__PURE__ */ p(jr.div, {
		"data-state": Yb(i.value, i.max),
		"data-value": i.value ?? void 0,
		"data-max": i.max,
		...r,
		ref: t
	});
});
qb.displayName = Kb;
function Jb(e, t) {
	return `${Math.round(e / t * 100)}%`;
}
function Yb(e, t) {
	return e == null ? "indeterminate" : e === t ? "complete" : "loading";
}
function Xb(e) {
	return typeof e == "number";
}
function Zb(e) {
	return Xb(e) && !isNaN(e) && e > 0;
}
function Qb(e, t) {
	return Xb(e) && !isNaN(e) && e <= t && e >= 0;
}
function $b(e, t) {
	return `Invalid prop \`max\` of value \`${e}\` supplied to \`${t}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${Bb}\`.`;
}
function ex(e, t) {
	return `Invalid prop \`value\` of value \`${e}\` supplied to \`${t}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${Bb} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var tx = Gb, nx = qb, rx = fr("relative w-full overflow-hidden rounded-full bg-border-subtle", {
	variants: { size: {
		sm: "h-1",
		default: "h-2",
		lg: "h-3"
	} },
	defaultVariants: { size: "default" }
}), ix = fr("h-full w-full flex-1 transition-all duration-slow ease-out", {
	variants: { intent: {
		default: "bg-primary",
		success: "bg-feedback-success",
		warning: "bg-feedback-warning",
		danger: "bg-feedback-danger"
	} },
	defaultVariants: { intent: "default" }
});
function ax({ className: e, value: t, size: n, intent: r, ref: i, ...a }) {
	return /* @__PURE__ */ p(tx, {
		ref: i,
		className: H(rx({ size: n }), e),
		...a,
		children: /* @__PURE__ */ p(nx, {
			className: H(ix({ intent: r })),
			style: { transform: `translateX(-${100 - (t ?? 0)}%)` }
		})
	});
}
ax.displayName = tx.displayName;
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-radio-group@1.3.8_@types+react-dom@19.2.3_@types+react@19.2.14__@types+_c07779e275d27cb5d99f86b5919e57c8/node_modules/@radix-ui/react-radio-group/dist/index.mjs
var ox = "Radio", [sx, cx] = ct(ox), [lx, ux] = sx(ox), dx = e.forwardRef((t, n) => {
	let { __scopeRadio: r, name: i, checked: a = !1, required: o, disabled: s, value: c = "on", onCheck: l, form: u, ...d } = t, [f, h] = e.useState(null), g = U(n, (e) => h(e)), _ = e.useRef(!1), v = f ? u || !!f.closest("form") : !0;
	return /* @__PURE__ */ m(lx, {
		scope: r,
		checked: a,
		disabled: s,
		children: [/* @__PURE__ */ p(K.button, {
			type: "button",
			role: "radio",
			"aria-checked": a,
			"data-state": gx(a),
			"data-disabled": s ? "" : void 0,
			disabled: s,
			value: c,
			...d,
			ref: g,
			onClick: W(t.onClick, (e) => {
				a || l?.(), v && (_.current = e.isPropagationStopped(), _.current || e.stopPropagation());
			})
		}), v && /* @__PURE__ */ p(hx, {
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
dx.displayName = ox;
var fx = "RadioIndicator", px = e.forwardRef((e, t) => {
	let { __scopeRadio: n, forceMount: r, ...i } = e, a = ux(fx, n);
	return /* @__PURE__ */ p(q, {
		present: r || a.checked,
		children: /* @__PURE__ */ p(K.span, {
			"data-state": gx(a.checked),
			"data-disabled": a.disabled ? "" : void 0,
			...i,
			ref: t
		})
	});
});
px.displayName = fx;
var mx = "RadioBubbleInput", hx = e.forwardRef(({ __scopeRadio: t, control: n, checked: r, bubbles: i = !0, ...a }, o) => {
	let s = e.useRef(null), c = U(s, o), l = Fc(r), u = Ic(n);
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
	]), /* @__PURE__ */ p(K.input, {
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
hx.displayName = mx;
function gx(e) {
	return e ? "checked" : "unchecked";
}
var _x = [
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight"
], vx = "RadioGroup", [yx, bx] = ct(vx, [Jh, cx]), xx = Jh(), Sx = cx(), [Cx, wx] = yx(vx), Tx = e.forwardRef((e, t) => {
	let { __scopeRadioGroup: n, name: r, defaultValue: i, value: a, required: o = !1, disabled: s = !1, orientation: c, dir: l, loop: u = !0, onValueChange: d, ...f } = e, m = xx(n), h = qt(l), [g, _] = xt({
		prop: a,
		defaultProp: i ?? null,
		onChange: d,
		caller: vx
	});
	return /* @__PURE__ */ p(Cx, {
		scope: n,
		name: r,
		required: o,
		disabled: s,
		value: g,
		onValueChange: _,
		children: /* @__PURE__ */ p(og, {
			asChild: !0,
			...m,
			orientation: c,
			dir: h,
			loop: u,
			children: /* @__PURE__ */ p(K.div, {
				role: "radiogroup",
				"aria-required": o,
				"aria-orientation": c,
				"data-disabled": s ? "" : void 0,
				dir: h,
				...f,
				ref: t
			})
		})
	});
});
Tx.displayName = vx;
var Ex = "RadioGroupItem", Dx = e.forwardRef((t, n) => {
	let { __scopeRadioGroup: r, disabled: i, ...a } = t, o = wx(Ex, r), s = o.disabled || i, c = xx(r), l = Sx(r), u = e.useRef(null), d = U(n, u), f = o.value === a.value, m = e.useRef(!1);
	return e.useEffect(() => {
		let e = (e) => {
			_x.includes(e.key) && (m.current = !0);
		}, t = () => m.current = !1;
		return document.addEventListener("keydown", e), document.addEventListener("keyup", t), () => {
			document.removeEventListener("keydown", e), document.removeEventListener("keyup", t);
		};
	}, []), /* @__PURE__ */ p(sg, {
		asChild: !0,
		...c,
		focusable: !s,
		active: f,
		children: /* @__PURE__ */ p(dx, {
			disabled: s,
			required: o.required,
			checked: f,
			...l,
			...a,
			name: o.name,
			ref: d,
			onCheck: () => o.onValueChange(a.value),
			onKeyDown: W((e) => {
				e.key === "Enter" && e.preventDefault();
			}),
			onFocus: W(a.onFocus, () => {
				m.current && u.current?.click();
			})
		})
	});
});
Dx.displayName = Ex;
var Ox = "RadioGroupIndicator", kx = e.forwardRef((e, t) => {
	let { __scopeRadioGroup: n, ...r } = e;
	return /* @__PURE__ */ p(px, {
		...Sx(n),
		...r,
		ref: t
	});
});
kx.displayName = Ox;
var Ax = Tx, jx = Dx, Mx = kx;
//#endregion
//#region src/components/ui/radio-group.tsx
function Nx(e) {
	let { className: t, ref: n, ...r } = e;
	return /* @__PURE__ */ p(Ax, {
		className: H("grid gap-2", t),
		...r,
		ref: n
	});
}
Nx.displayName = Ax.displayName;
function Px(e) {
	let { className: t, ref: n, ...r } = e;
	return /* @__PURE__ */ p(jx, {
		ref: n,
		className: H("aspect-square h-4 w-4 rounded-full border border-border-strong", "bg-surface-raised ring-offset-background", "transition-colors duration-fast", "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", "disabled:cursor-not-allowed disabled:opacity-50", "data-[state=checked]:border-primary data-[state=checked]:text-primary", t),
		...r,
		children: /* @__PURE__ */ p(Mx, {
			className: "flex items-center justify-center",
			children: /* @__PURE__ */ p(Zn, { className: "h-2 w-2 fill-current text-primary" })
		})
	});
}
Px.displayName = jx.displayName;
//#endregion
//#region node_modules/.pnpm/@radix-ui+number@1.1.1/node_modules/@radix-ui/number/dist/index.mjs
function Fx(e, [t, n]) {
	return Math.min(n, Math.max(t, e));
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-scroll-area@1.2.10_@types+react-dom@19.2.3_@types+react@19.2.14__@types_3f2ac5445210224aefd6333ca2197426/node_modules/@radix-ui/react-scroll-area/dist/index.mjs
function Ix(t, n) {
	return e.useReducer((e, t) => n[e][t] ?? e, t);
}
var Lx = "ScrollArea", [Rx, zx] = ct(Lx), [Bx, Vx] = Rx(Lx), Hx = e.forwardRef((t, n) => {
	let { __scopeScrollArea: r, type: i = "hover", dir: a, scrollHideDelay: o = 600, ...s } = t, [c, l] = e.useState(null), [u, d] = e.useState(null), [f, m] = e.useState(null), [h, g] = e.useState(null), [_, v] = e.useState(null), [y, b] = e.useState(0), [x, S] = e.useState(0), [C, w] = e.useState(!1), [T, E] = e.useState(!1), D = U(n, (e) => l(e)), O = qt(a);
	return /* @__PURE__ */ p(Bx, {
		scope: r,
		type: i,
		dir: O,
		scrollHideDelay: o,
		scrollArea: c,
		viewport: u,
		onViewportChange: d,
		content: f,
		onContentChange: m,
		scrollbarX: h,
		onScrollbarXChange: g,
		scrollbarXEnabled: C,
		onScrollbarXEnabledChange: w,
		scrollbarY: _,
		onScrollbarYChange: v,
		scrollbarYEnabled: T,
		onScrollbarYEnabledChange: E,
		onCornerWidthChange: b,
		onCornerHeightChange: S,
		children: /* @__PURE__ */ p(K.div, {
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
Hx.displayName = Lx;
var Ux = "ScrollAreaViewport", Wx = e.forwardRef((t, n) => {
	let { __scopeScrollArea: r, children: i, nonce: a, ...o } = t, s = Vx(Ux, r), c = U(n, e.useRef(null), s.onViewportChange);
	return /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p("style", {
		dangerouslySetInnerHTML: { __html: "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}" },
		nonce: a
	}), /* @__PURE__ */ p(K.div, {
		"data-radix-scroll-area-viewport": "",
		...o,
		ref: c,
		style: {
			overflowX: s.scrollbarXEnabled ? "scroll" : "hidden",
			overflowY: s.scrollbarYEnabled ? "scroll" : "hidden",
			...t.style
		},
		children: /* @__PURE__ */ p("div", {
			ref: s.onContentChange,
			style: {
				minWidth: "100%",
				display: "table"
			},
			children: i
		})
	})] });
});
Wx.displayName = Ux;
var Gx = "ScrollAreaScrollbar", Kx = e.forwardRef((t, n) => {
	let { forceMount: r, ...i } = t, a = Vx(Gx, t.__scopeScrollArea), { onScrollbarXEnabledChange: o, onScrollbarYEnabledChange: s } = a, c = t.orientation === "horizontal";
	return e.useEffect(() => (c ? o(!0) : s(!0), () => {
		c ? o(!1) : s(!1);
	}), [
		c,
		o,
		s
	]), a.type === "hover" ? /* @__PURE__ */ p(qx, {
		...i,
		ref: n,
		forceMount: r
	}) : a.type === "scroll" ? /* @__PURE__ */ p(Jx, {
		...i,
		ref: n,
		forceMount: r
	}) : a.type === "auto" ? /* @__PURE__ */ p(Yx, {
		...i,
		ref: n,
		forceMount: r
	}) : a.type === "always" ? /* @__PURE__ */ p(Xx, {
		...i,
		ref: n
	}) : null;
});
Kx.displayName = Gx;
var qx = e.forwardRef((t, n) => {
	let { forceMount: r, ...i } = t, a = Vx(Gx, t.__scopeScrollArea), [o, s] = e.useState(!1);
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
	}, [a.scrollArea, a.scrollHideDelay]), /* @__PURE__ */ p(q, {
		present: r || o,
		children: /* @__PURE__ */ p(Yx, {
			"data-state": o ? "visible" : "hidden",
			...i,
			ref: n
		})
	});
}), Jx = e.forwardRef((t, n) => {
	let { forceMount: r, ...i } = t, a = Vx(Gx, t.__scopeScrollArea), o = t.orientation === "horizontal", s = gS(() => l("SCROLL_END"), 100), [c, l] = Ix("hidden", {
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
	]), /* @__PURE__ */ p(q, {
		present: r || c !== "hidden",
		children: /* @__PURE__ */ p(Xx, {
			"data-state": c === "hidden" ? "hidden" : "visible",
			...i,
			ref: n,
			onPointerEnter: W(t.onPointerEnter, () => l("POINTER_ENTER")),
			onPointerLeave: W(t.onPointerLeave, () => l("POINTER_LEAVE"))
		})
	});
}), Yx = e.forwardRef((t, n) => {
	let r = Vx(Gx, t.__scopeScrollArea), { forceMount: i, ...a } = t, [o, s] = e.useState(!1), c = t.orientation === "horizontal", l = gS(() => {
		if (r.viewport) {
			let e = r.viewport.offsetWidth < r.viewport.scrollWidth, t = r.viewport.offsetHeight < r.viewport.scrollHeight;
			s(c ? e : t);
		}
	}, 10);
	return _S(r.viewport, l), _S(r.content, l), /* @__PURE__ */ p(q, {
		present: i || o,
		children: /* @__PURE__ */ p(Xx, {
			"data-state": o ? "visible" : "hidden",
			...a,
			ref: n
		})
	});
}), Xx = e.forwardRef((t, n) => {
	let { orientation: r = "vertical", ...i } = t, a = Vx(Gx, t.__scopeScrollArea), o = e.useRef(null), s = e.useRef(0), [c, l] = e.useState({
		content: 0,
		viewport: 0,
		scrollbar: {
			size: 0,
			paddingStart: 0,
			paddingEnd: 0
		}
	}), u = lS(c.viewport, c.content), d = {
		...i,
		sizes: c,
		onSizesChange: l,
		hasThumb: u > 0 && u < 1,
		onThumbChange: (e) => o.current = e,
		onThumbPointerUp: () => s.current = 0,
		onThumbPointerDown: (e) => s.current = e
	};
	function f(e, t) {
		return dS(e, s.current, c, t);
	}
	return r === "horizontal" ? /* @__PURE__ */ p(Zx, {
		...d,
		ref: n,
		onThumbPositionChange: () => {
			if (a.viewport && o.current) {
				let e = a.viewport.scrollLeft, t = fS(e, c, a.dir);
				o.current.style.transform = `translate3d(${t}px, 0, 0)`;
			}
		},
		onWheelScroll: (e) => {
			a.viewport && (a.viewport.scrollLeft = e);
		},
		onDragScroll: (e) => {
			a.viewport && (a.viewport.scrollLeft = f(e, a.dir));
		}
	}) : r === "vertical" ? /* @__PURE__ */ p(Qx, {
		...d,
		ref: n,
		onThumbPositionChange: () => {
			if (a.viewport && o.current) {
				let e = a.viewport.scrollTop, t = fS(e, c);
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
}), Zx = e.forwardRef((t, n) => {
	let { sizes: r, onSizesChange: i, ...a } = t, o = Vx(Gx, t.__scopeScrollArea), [s, c] = e.useState(), l = e.useRef(null), u = U(n, l, o.onScrollbarXChange);
	return e.useEffect(() => {
		l.current && c(getComputedStyle(l.current));
	}, [l]), /* @__PURE__ */ p(tS, {
		"data-orientation": "horizontal",
		...a,
		ref: u,
		sizes: r,
		style: {
			bottom: 0,
			left: o.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
			right: o.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
			"--radix-scroll-area-thumb-width": uS(r) + "px",
			...t.style
		},
		onThumbPointerDown: (e) => t.onThumbPointerDown(e.x),
		onDragScroll: (e) => t.onDragScroll(e.x),
		onWheelScroll: (e, n) => {
			if (o.viewport) {
				let r = o.viewport.scrollLeft + e.deltaX;
				t.onWheelScroll(r), mS(r, n) && e.preventDefault();
			}
		},
		onResize: () => {
			l.current && o.viewport && s && i({
				content: o.viewport.scrollWidth,
				viewport: o.viewport.offsetWidth,
				scrollbar: {
					size: l.current.clientWidth,
					paddingStart: cS(s.paddingLeft),
					paddingEnd: cS(s.paddingRight)
				}
			});
		}
	});
}), Qx = e.forwardRef((t, n) => {
	let { sizes: r, onSizesChange: i, ...a } = t, o = Vx(Gx, t.__scopeScrollArea), [s, c] = e.useState(), l = e.useRef(null), u = U(n, l, o.onScrollbarYChange);
	return e.useEffect(() => {
		l.current && c(getComputedStyle(l.current));
	}, [l]), /* @__PURE__ */ p(tS, {
		"data-orientation": "vertical",
		...a,
		ref: u,
		sizes: r,
		style: {
			top: 0,
			right: o.dir === "ltr" ? 0 : void 0,
			left: o.dir === "rtl" ? 0 : void 0,
			bottom: "var(--radix-scroll-area-corner-height)",
			"--radix-scroll-area-thumb-height": uS(r) + "px",
			...t.style
		},
		onThumbPointerDown: (e) => t.onThumbPointerDown(e.y),
		onDragScroll: (e) => t.onDragScroll(e.y),
		onWheelScroll: (e, n) => {
			if (o.viewport) {
				let r = o.viewport.scrollTop + e.deltaY;
				t.onWheelScroll(r), mS(r, n) && e.preventDefault();
			}
		},
		onResize: () => {
			l.current && o.viewport && s && i({
				content: o.viewport.scrollHeight,
				viewport: o.viewport.offsetHeight,
				scrollbar: {
					size: l.current.clientHeight,
					paddingStart: cS(s.paddingTop),
					paddingEnd: cS(s.paddingBottom)
				}
			});
		}
	});
}), [$x, eS] = Rx(Gx), tS = e.forwardRef((t, n) => {
	let { __scopeScrollArea: r, sizes: i, hasThumb: a, onThumbChange: o, onThumbPointerUp: s, onThumbPointerDown: c, onThumbPositionChange: l, onDragScroll: u, onWheelScroll: d, onResize: f, ...m } = t, h = Vx(Gx, r), [g, _] = e.useState(null), v = U(n, (e) => _(e)), y = e.useRef(null), b = e.useRef(""), x = h.viewport, S = i.content - i.viewport, C = Y(d), w = Y(l), T = gS(f, 10);
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
	]), e.useEffect(w, [i, w]), _S(g, T), _S(h.content, T), /* @__PURE__ */ p($x, {
		scope: r,
		scrollbar: g,
		hasThumb: a,
		onThumbChange: Y(o),
		onThumbPointerUp: Y(s),
		onThumbPositionChange: w,
		onThumbPointerDown: Y(c),
		children: /* @__PURE__ */ p(K.div, {
			...m,
			ref: v,
			style: {
				position: "absolute",
				...m.style
			},
			onPointerDown: W(t.onPointerDown, (e) => {
				e.button === 0 && (e.target.setPointerCapture(e.pointerId), y.current = g.getBoundingClientRect(), b.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", h.viewport && (h.viewport.style.scrollBehavior = "auto"), E(e));
			}),
			onPointerMove: W(t.onPointerMove, E),
			onPointerUp: W(t.onPointerUp, (e) => {
				let t = e.target;
				t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId), document.body.style.webkitUserSelect = b.current, h.viewport && (h.viewport.style.scrollBehavior = ""), y.current = null;
			})
		})
	});
}), nS = "ScrollAreaThumb", rS = e.forwardRef((e, t) => {
	let { forceMount: n, ...r } = e, i = eS(nS, e.__scopeScrollArea);
	return /* @__PURE__ */ p(q, {
		present: n || i.hasThumb,
		children: /* @__PURE__ */ p(iS, {
			ref: t,
			...r
		})
	});
}), iS = e.forwardRef((t, n) => {
	let { __scopeScrollArea: r, style: i, ...a } = t, o = Vx(nS, r), s = eS(nS, r), { onThumbPositionChange: c } = s, l = U(n, (e) => s.onThumbChange(e)), u = e.useRef(void 0), d = gS(() => {
		u.current &&= (u.current(), void 0);
	}, 100);
	return e.useEffect(() => {
		let e = o.viewport;
		if (e) {
			let t = () => {
				d(), u.current || (u.current = hS(e, c), c());
			};
			return c(), e.addEventListener("scroll", t), () => e.removeEventListener("scroll", t);
		}
	}, [
		o.viewport,
		d,
		c
	]), /* @__PURE__ */ p(K.div, {
		"data-state": s.hasThumb ? "visible" : "hidden",
		...a,
		ref: l,
		style: {
			width: "var(--radix-scroll-area-thumb-width)",
			height: "var(--radix-scroll-area-thumb-height)",
			...i
		},
		onPointerDownCapture: W(t.onPointerDownCapture, (e) => {
			let t = e.target.getBoundingClientRect(), n = e.clientX - t.left, r = e.clientY - t.top;
			s.onThumbPointerDown({
				x: n,
				y: r
			});
		}),
		onPointerUp: W(t.onPointerUp, s.onThumbPointerUp)
	});
});
rS.displayName = nS;
var aS = "ScrollAreaCorner", oS = e.forwardRef((e, t) => {
	let n = Vx(aS, e.__scopeScrollArea), r = !!(n.scrollbarX && n.scrollbarY);
	return n.type !== "scroll" && r ? /* @__PURE__ */ p(sS, {
		...e,
		ref: t
	}) : null;
});
oS.displayName = aS;
var sS = e.forwardRef((t, n) => {
	let { __scopeScrollArea: r, ...i } = t, a = Vx(aS, r), [o, s] = e.useState(0), [c, l] = e.useState(0), u = !!(o && c);
	return _S(a.scrollbarX, () => {
		let e = a.scrollbarX?.offsetHeight || 0;
		a.onCornerHeightChange(e), l(e);
	}), _S(a.scrollbarY, () => {
		let e = a.scrollbarY?.offsetWidth || 0;
		a.onCornerWidthChange(e), s(e);
	}), u ? /* @__PURE__ */ p(K.div, {
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
function cS(e) {
	return e ? parseInt(e, 10) : 0;
}
function lS(e, t) {
	let n = e / t;
	return isNaN(n) ? 0 : n;
}
function uS(e) {
	let t = lS(e.viewport, e.content), n = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, r = (e.scrollbar.size - n) * t;
	return Math.max(r, 18);
}
function dS(e, t, n, r = "ltr") {
	let i = uS(n), a = i / 2, o = t || a, s = i - o, c = n.scrollbar.paddingStart + o, l = n.scrollbar.size - n.scrollbar.paddingEnd - s, u = n.content - n.viewport, d = r === "ltr" ? [0, u] : [u * -1, 0];
	return pS([c, l], d)(e);
}
function fS(e, t, n = "ltr") {
	let r = uS(t), i = t.scrollbar.paddingStart + t.scrollbar.paddingEnd, a = t.scrollbar.size - i, o = t.content - t.viewport, s = a - r, c = Fx(e, n === "ltr" ? [0, o] : [o * -1, 0]);
	return pS([0, o], [0, s])(c);
}
function pS(e, t) {
	return (n) => {
		if (e[0] === e[1] || t[0] === t[1]) return t[0];
		let r = (t[1] - t[0]) / (e[1] - e[0]);
		return t[0] + r * (n - e[0]);
	};
}
function mS(e, t) {
	return e > 0 && e < t;
}
var hS = (e, t = () => {}) => {
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
function gS(t, n) {
	let r = Y(t), i = e.useRef(0);
	return e.useEffect(() => () => window.clearTimeout(i.current), []), e.useCallback(() => {
		window.clearTimeout(i.current), i.current = window.setTimeout(r, n);
	}, [r, n]);
}
function _S(e, t) {
	let n = Y(t);
	G(() => {
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
var vS = Hx, yS = Wx, bS = oS;
//#endregion
//#region src/components/ui/scroll-area.tsx
function xS(e) {
	let { className: t, children: n, ref: r, ...i } = e;
	return /* @__PURE__ */ m(vS, {
		ref: r,
		className: H("relative overflow-hidden", t),
		...i,
		children: [
			/* @__PURE__ */ p(yS, {
				className: "h-full w-full rounded-[inherit]",
				children: n
			}),
			/* @__PURE__ */ p(SS, {}),
			/* @__PURE__ */ p(bS, {})
		]
	});
}
xS.displayName = vS.displayName;
function SS(e) {
	let { className: t, orientation: n = "vertical", ref: r, ...i } = e;
	return /* @__PURE__ */ p(Kx, {
		ref: r,
		orientation: n,
		className: H("flex touch-none select-none transition-colors", n === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", n === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]", t),
		...i,
		children: /* @__PURE__ */ p(rS, { className: "relative flex-1 rounded-full bg-border-strong" })
	});
}
SS.displayName = Kx.displayName;
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-visually-hidden@1.2.3_@types+react-dom@19.2.3_@types+react@19.2.14__@ty_d1be9c417e0b55d219bafdc186d26ce0/node_modules/@radix-ui/react-visually-hidden/dist/index.mjs
var CS = Object.freeze({
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
}), wS = "VisuallyHidden", TS = e.forwardRef((e, t) => /* @__PURE__ */ p(K.span, {
	...e,
	ref: t,
	style: {
		...CS,
		...e.style
	}
}));
TS.displayName = wS;
var ES = TS, DS = [
	" ",
	"Enter",
	"ArrowUp",
	"ArrowDown"
], OS = [" ", "Enter"], kS = "Select", [AS, jS, MS] = yt(kS), [NS, PS] = ct(kS, [MS, xh]), FS = xh(), [IS, LS] = NS(kS), [RS, zS] = NS(kS), BS = (t) => {
	let { __scopeSelect: n, children: r, open: i, defaultOpen: a, onOpenChange: o, value: s, defaultValue: c, onValueChange: l, dir: u, name: d, autoComplete: f, disabled: h, required: g, form: _ } = t, v = FS(n), [y, b] = e.useState(null), [x, S] = e.useState(null), [C, w] = e.useState(!1), T = qt(u), [E, D] = xt({
		prop: i,
		defaultProp: a ?? !1,
		onChange: o,
		caller: kS
	}), [O, k] = xt({
		prop: s,
		defaultProp: c,
		onChange: l,
		caller: kS
	}), A = e.useRef(null), j = y ? _ || !!y.closest("form") : !0, [M, N] = e.useState(/* @__PURE__ */ new Set()), P = Array.from(M).map((e) => e.props.value).join(";");
	return /* @__PURE__ */ p(Lh, {
		...v,
		children: /* @__PURE__ */ m(IS, {
			required: g,
			scope: n,
			trigger: y,
			onTriggerChange: b,
			valueNode: x,
			onValueNodeChange: S,
			valueNodeHasChildren: C,
			onValueNodeHasChildrenChange: w,
			contentId: J(),
			value: O,
			onValueChange: k,
			open: E,
			onOpenChange: D,
			dir: T,
			triggerPointerDownPosRef: A,
			disabled: h,
			children: [/* @__PURE__ */ p(AS.Provider, {
				scope: n,
				children: /* @__PURE__ */ p(RS, {
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
			}), j ? /* @__PURE__ */ m(FC, {
				"aria-hidden": !0,
				required: g,
				tabIndex: -1,
				name: d,
				autoComplete: f,
				value: O,
				onChange: (e) => k(e.target.value),
				disabled: h,
				form: _,
				children: [O === void 0 ? /* @__PURE__ */ p("option", { value: "" }) : null, Array.from(M)]
			}, P) : null]
		})
	});
};
BS.displayName = kS;
var VS = "SelectTrigger", HS = e.forwardRef((t, n) => {
	let { __scopeSelect: r, disabled: i = !1, ...a } = t, o = FS(r), s = LS(VS, r), c = s.disabled || i, l = U(n, s.onTriggerChange), u = jS(r), d = e.useRef("touch"), [f, m, h] = LC((e) => {
		let t = u().filter((e) => !e.disabled), n = RC(t, e, t.find((e) => e.value === s.value));
		n !== void 0 && s.onValueChange(n.value);
	}), g = (e) => {
		c || (s.onOpenChange(!0), h()), e && (s.triggerPointerDownPosRef.current = {
			x: Math.round(e.pageX),
			y: Math.round(e.pageY)
		});
	};
	return /* @__PURE__ */ p(Rh, {
		asChild: !0,
		...o,
		children: /* @__PURE__ */ p(K.button, {
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
			"data-placeholder": IC(s.value) ? "" : void 0,
			...a,
			ref: l,
			onClick: W(a.onClick, (e) => {
				e.currentTarget.focus(), d.current !== "mouse" && g(e);
			}),
			onPointerDown: W(a.onPointerDown, (e) => {
				d.current = e.pointerType;
				let t = e.target;
				t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId), e.button === 0 && e.ctrlKey === !1 && e.pointerType === "mouse" && (g(e), e.preventDefault());
			}),
			onKeyDown: W(a.onKeyDown, (e) => {
				let t = f.current !== "";
				!(e.ctrlKey || e.altKey || e.metaKey) && e.key.length === 1 && m(e.key), !(t && e.key === " ") && DS.includes(e.key) && (g(), e.preventDefault());
			})
		})
	});
});
HS.displayName = VS;
var US = "SelectValue", WS = e.forwardRef((e, t) => {
	let { __scopeSelect: n, className: r, style: i, children: a, placeholder: o = "", ...s } = e, c = LS(US, n), { onValueNodeHasChildrenChange: l } = c, u = a !== void 0, d = U(t, c.onValueNodeChange);
	return G(() => {
		l(u);
	}, [l, u]), /* @__PURE__ */ p(K.span, {
		...s,
		ref: d,
		style: { pointerEvents: "none" },
		children: IC(c.value) ? /* @__PURE__ */ p(f, { children: o }) : a
	});
});
WS.displayName = US;
var GS = "SelectIcon", KS = e.forwardRef((e, t) => {
	let { __scopeSelect: n, children: r, ...i } = e;
	return /* @__PURE__ */ p(K.span, {
		"aria-hidden": !0,
		...i,
		ref: t,
		children: r || "▼"
	});
});
KS.displayName = GS;
var qS = "SelectPortal", JS = (e) => /* @__PURE__ */ p(Jl, {
	asChild: !0,
	...e
});
JS.displayName = qS;
var YS = "SelectContent", XS = e.forwardRef((t, n) => {
	let r = LS(YS, t.__scopeSelect), [i, a] = e.useState();
	if (G(() => {
		a(new DocumentFragment());
	}, []), !r.open) {
		let e = i;
		return e ? h.createPortal(/* @__PURE__ */ p(QS, {
			scope: t.__scopeSelect,
			children: /* @__PURE__ */ p(AS.Slot, {
				scope: t.__scopeSelect,
				children: /* @__PURE__ */ p("div", { children: t.children })
			})
		}), e) : null;
	}
	return /* @__PURE__ */ p(nC, {
		...t,
		ref: n
	});
});
XS.displayName = YS;
var ZS = 10, [QS, $S] = NS(YS), eC = "SelectContentImpl", tC = /* @__PURE__ */ ft("SelectContent.RemoveScroll"), nC = e.forwardRef((t, n) => {
	let { __scopeSelect: r, position: i = "item-aligned", onCloseAutoFocus: a, onEscapeKeyDown: o, onPointerDownOutside: s, side: c, sideOffset: l, align: u, alignOffset: d, arrowPadding: f, collisionBoundary: m, collisionPadding: h, sticky: g, hideWhenDetached: _, avoidCollisions: v, ...y } = t, b = LS(YS, r), [x, S] = e.useState(null), [C, w] = e.useState(null), T = U(n, (e) => S(e)), [E, D] = e.useState(null), [O, k] = e.useState(null), A = jS(r), [j, M] = e.useState(!1), N = e.useRef(!1);
	e.useEffect(() => {
		if (x) return hd(x);
	}, [x]), Xl();
	let P = e.useCallback((e) => {
		let [t, ...n] = A().map((e) => e.ref.current), [r] = n.slice(-1), i = document.activeElement;
		for (let n of e) if (n === i || (n?.scrollIntoView({ block: "nearest" }), n === t && C && (C.scrollTop = 0), n === r && C && (C.scrollTop = C.scrollHeight), n?.focus(), document.activeElement !== i)) return;
	}, [A, C]), ee = e.useCallback(() => P([E, x]), [
		P,
		E,
		x
	]);
	e.useEffect(() => {
		j && ee();
	}, [j, ee]);
	let { onOpenChange: F, triggerPointerDownPosRef: te } = b;
	e.useEffect(() => {
		if (x) {
			let e = {
				x: 0,
				y: 0
			}, t = (t) => {
				e = {
					x: Math.abs(Math.round(t.pageX) - (te.current?.x ?? 0)),
					y: Math.abs(Math.round(t.pageY) - (te.current?.y ?? 0))
				};
			}, n = (n) => {
				e.x <= 10 && e.y <= 10 ? n.preventDefault() : x.contains(n.target) || F(!1), document.removeEventListener("pointermove", t), te.current = null;
			};
			return te.current !== null && (document.addEventListener("pointermove", t), document.addEventListener("pointerup", n, {
				capture: !0,
				once: !0
			})), () => {
				document.removeEventListener("pointermove", t), document.removeEventListener("pointerup", n, { capture: !0 });
			};
		}
	}, [
		x,
		F,
		te
	]), e.useEffect(() => {
		let e = () => F(!1);
		return window.addEventListener("blur", e), window.addEventListener("resize", e), () => {
			window.removeEventListener("blur", e), window.removeEventListener("resize", e);
		};
	}, [F]);
	let [ne, re] = LC((e) => {
		let t = A().filter((e) => !e.disabled), n = RC(t, e, t.find((e) => e.ref.current === document.activeElement));
		n && setTimeout(() => n.ref.current.focus());
	}), ie = e.useCallback((e, t, n) => {
		let r = !N.current && !n;
		(b.value !== void 0 && b.value === t || r) && (D(e), r && (N.current = !0));
	}, [b.value]), I = e.useCallback(() => x?.focus(), [x]), L = e.useCallback((e, t, n) => {
		let r = !N.current && !n;
		(b.value !== void 0 && b.value === t || r) && k(e);
	}, [b.value]), ae = i === "popper" ? oC : iC, oe = ae === oC ? {
		side: c,
		sideOffset: l,
		align: u,
		alignOffset: d,
		arrowPadding: f,
		collisionBoundary: m,
		collisionPadding: h,
		sticky: g,
		hideWhenDetached: _,
		avoidCollisions: v
	} : {};
	return /* @__PURE__ */ p(QS, {
		scope: r,
		content: x,
		viewport: C,
		onViewportChange: w,
		itemRefCallback: ie,
		selectedItem: E,
		onItemLeave: I,
		itemTextRefCallback: L,
		focusSelectedItem: ee,
		selectedItemText: O,
		position: i,
		isPositioned: j,
		searchRef: ne,
		children: /* @__PURE__ */ p(od, {
			as: tC,
			allowPinchZoom: !0,
			children: /* @__PURE__ */ p(Fl, {
				asChild: !0,
				trapped: b.open,
				onMountAutoFocus: (e) => {
					e.preventDefault();
				},
				onUnmountAutoFocus: W(a, (e) => {
					b.trigger?.focus({ preventScroll: !0 }), e.preventDefault();
				}),
				children: /* @__PURE__ */ p(Sl, {
					asChild: !0,
					disableOutsidePointerEvents: !0,
					onEscapeKeyDown: o,
					onPointerDownOutside: s,
					onFocusOutside: (e) => e.preventDefault(),
					onDismiss: () => b.onOpenChange(!1),
					children: /* @__PURE__ */ p(ae, {
						role: "listbox",
						id: b.contentId,
						"data-state": b.open ? "open" : "closed",
						dir: b.dir,
						onContextMenu: (e) => e.preventDefault(),
						...y,
						...oe,
						onPlaced: () => M(!0),
						ref: T,
						style: {
							display: "flex",
							flexDirection: "column",
							outline: "none",
							...y.style
						},
						onKeyDown: W(y.onKeyDown, (e) => {
							let t = e.ctrlKey || e.altKey || e.metaKey;
							if (e.key === "Tab" && e.preventDefault(), !t && e.key.length === 1 && re(e.key), [
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
nC.displayName = eC;
var rC = "SelectItemAlignedPosition", iC = e.forwardRef((t, n) => {
	let { __scopeSelect: r, onPlaced: i, ...a } = t, o = LS(YS, r), s = $S(YS, r), [c, l] = e.useState(null), [u, d] = e.useState(null), f = U(n, (e) => d(e)), m = jS(r), h = e.useRef(!1), g = e.useRef(!0), { viewport: _, selectedItem: v, selectedItemText: y, focusSelectedItem: b } = s, x = e.useCallback(() => {
		if (o.trigger && o.valueNode && c && u && _ && v && y) {
			let e = o.trigger.getBoundingClientRect(), t = u.getBoundingClientRect(), n = o.valueNode.getBoundingClientRect(), r = y.getBoundingClientRect();
			if (o.dir !== "rtl") {
				let i = r.left - t.left, a = n.left - i, o = e.left - a, s = e.width + o, l = Math.max(s, t.width), u = window.innerWidth - ZS, d = Fx(a, [ZS, Math.max(ZS, u - l)]);
				c.style.minWidth = s + "px", c.style.left = d + "px";
			} else {
				let i = t.right - r.right, a = window.innerWidth - n.right - i, o = window.innerWidth - e.right - a, s = e.width + o, l = Math.max(s, t.width), u = window.innerWidth - ZS, d = Fx(a, [ZS, Math.max(ZS, u - l)]);
				c.style.minWidth = s + "px", c.style.right = d + "px";
			}
			let a = m(), s = window.innerHeight - ZS * 2, l = _.scrollHeight, d = window.getComputedStyle(u), f = parseInt(d.borderTopWidth, 10), p = parseInt(d.paddingTop, 10), g = parseInt(d.borderBottomWidth, 10), b = parseInt(d.paddingBottom, 10), x = f + p + l + b + g, S = Math.min(v.offsetHeight * 5, x), C = window.getComputedStyle(_), w = parseInt(C.paddingTop, 10), T = parseInt(C.paddingBottom, 10), E = e.top + e.height / 2 - ZS, D = s - E, O = v.offsetHeight / 2, k = v.offsetTop + O, A = f + p + k, j = x - A;
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
			c.style.margin = `${ZS}px 0`, c.style.minHeight = S + "px", c.style.maxHeight = s + "px", i?.(), requestAnimationFrame(() => h.current = !0);
		}
	}, [
		m,
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
	G(() => x(), [x]);
	let [S, C] = e.useState();
	return G(() => {
		u && C(window.getComputedStyle(u).zIndex);
	}, [u]), /* @__PURE__ */ p(sC, {
		scope: r,
		contentWrapper: c,
		shouldExpandOnScrollRef: h,
		onScrollButtonChange: e.useCallback((e) => {
			e && g.current === !0 && (x(), b?.(), g.current = !1);
		}, [x, b]),
		children: /* @__PURE__ */ p("div", {
			ref: l,
			style: {
				display: "flex",
				flexDirection: "column",
				position: "fixed",
				zIndex: S
			},
			children: /* @__PURE__ */ p(K.div, {
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
iC.displayName = rC;
var aC = "SelectPopperPosition", oC = e.forwardRef((e, t) => {
	let { __scopeSelect: n, align: r = "start", collisionPadding: i = ZS, ...a } = e;
	return /* @__PURE__ */ p(zh, {
		...FS(n),
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
oC.displayName = aC;
var [sC, cC] = NS(YS, {}), lC = "SelectViewport", uC = e.forwardRef((t, n) => {
	let { __scopeSelect: r, nonce: i, ...a } = t, o = $S(lC, r), s = cC(lC, r), c = U(n, o.onViewportChange), l = e.useRef(0);
	return /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p("style", {
		dangerouslySetInnerHTML: { __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}" },
		nonce: i
	}), /* @__PURE__ */ p(AS.Slot, {
		scope: r,
		children: /* @__PURE__ */ p(K.div, {
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
			onScroll: W(a.onScroll, (e) => {
				let t = e.currentTarget, { contentWrapper: n, shouldExpandOnScrollRef: r } = s;
				if (r?.current && n) {
					let e = Math.abs(l.current - t.scrollTop);
					if (e > 0) {
						let r = window.innerHeight - ZS * 2, i = parseFloat(n.style.minHeight), a = parseFloat(n.style.height), o = Math.max(i, a);
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
uC.displayName = lC;
var dC = "SelectGroup", [fC, pC] = NS(dC), mC = e.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e, i = J();
	return /* @__PURE__ */ p(fC, {
		scope: n,
		id: i,
		children: /* @__PURE__ */ p(K.div, {
			role: "group",
			"aria-labelledby": i,
			...r,
			ref: t
		})
	});
});
mC.displayName = dC;
var hC = "SelectLabel", gC = e.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e, i = pC(hC, n);
	return /* @__PURE__ */ p(K.div, {
		id: i.id,
		...r,
		ref: t
	});
});
gC.displayName = hC;
var _C = "SelectItem", [vC, yC] = NS(_C), bC = e.forwardRef((t, n) => {
	let { __scopeSelect: r, value: i, disabled: a = !1, textValue: o, ...s } = t, c = LS(_C, r), l = $S(_C, r), u = c.value === i, [d, f] = e.useState(o ?? ""), [m, h] = e.useState(!1), g = U(n, (e) => l.itemRefCallback?.(e, i, a)), _ = J(), v = e.useRef("touch"), y = () => {
		a || (c.onValueChange(i), c.onOpenChange(!1));
	};
	if (i === "") throw Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
	return /* @__PURE__ */ p(vC, {
		scope: r,
		value: i,
		disabled: a,
		textId: _,
		isSelected: u,
		onItemTextChange: e.useCallback((e) => {
			f((t) => t || (e?.textContent ?? "").trim());
		}, []),
		children: /* @__PURE__ */ p(AS.ItemSlot, {
			scope: r,
			value: i,
			disabled: a,
			textValue: d,
			children: /* @__PURE__ */ p(K.div, {
				role: "option",
				"aria-labelledby": _,
				"data-highlighted": m ? "" : void 0,
				"aria-selected": u && m,
				"data-state": u ? "checked" : "unchecked",
				"aria-disabled": a || void 0,
				"data-disabled": a ? "" : void 0,
				tabIndex: a ? void 0 : -1,
				...s,
				ref: g,
				onFocus: W(s.onFocus, () => h(!0)),
				onBlur: W(s.onBlur, () => h(!1)),
				onClick: W(s.onClick, () => {
					v.current !== "mouse" && y();
				}),
				onPointerUp: W(s.onPointerUp, () => {
					v.current === "mouse" && y();
				}),
				onPointerDown: W(s.onPointerDown, (e) => {
					v.current = e.pointerType;
				}),
				onPointerMove: W(s.onPointerMove, (e) => {
					v.current = e.pointerType, a ? l.onItemLeave?.() : v.current === "mouse" && e.currentTarget.focus({ preventScroll: !0 });
				}),
				onPointerLeave: W(s.onPointerLeave, (e) => {
					e.currentTarget === document.activeElement && l.onItemLeave?.();
				}),
				onKeyDown: W(s.onKeyDown, (e) => {
					l.searchRef?.current !== "" && e.key === " " || (OS.includes(e.key) && y(), e.key === " " && e.preventDefault());
				})
			})
		})
	});
});
bC.displayName = _C;
var xC = "SelectItemText", SC = e.forwardRef((t, n) => {
	let { __scopeSelect: r, className: i, style: a, ...o } = t, s = LS(xC, r), c = $S(xC, r), l = yC(xC, r), u = zS(xC, r), [d, g] = e.useState(null), _ = U(n, (e) => g(e), l.onItemTextChange, (e) => c.itemTextRefCallback?.(e, l.value, l.disabled)), v = d?.textContent, y = e.useMemo(() => /* @__PURE__ */ p("option", {
		value: l.value,
		disabled: l.disabled,
		children: v
	}, l.value), [
		l.disabled,
		l.value,
		v
	]), { onNativeOptionAdd: b, onNativeOptionRemove: x } = u;
	return G(() => (b(y), () => x(y)), [
		b,
		x,
		y
	]), /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p(K.span, {
		id: l.textId,
		...o,
		ref: _
	}), l.isSelected && s.valueNode && !s.valueNodeHasChildren ? h.createPortal(o.children, s.valueNode) : null] });
});
SC.displayName = xC;
var CC = "SelectItemIndicator", wC = e.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e;
	return yC(CC, n).isSelected ? /* @__PURE__ */ p(K.span, {
		"aria-hidden": !0,
		...r,
		ref: t
	}) : null;
});
wC.displayName = CC;
var TC = "SelectScrollUpButton", EC = e.forwardRef((t, n) => {
	let r = $S(TC, t.__scopeSelect), i = cC(TC, t.__scopeSelect), [a, o] = e.useState(!1), s = U(n, i.onScrollButtonChange);
	return G(() => {
		if (r.viewport && r.isPositioned) {
			let e = function() {
				o(t.scrollTop > 0);
			}, t = r.viewport;
			return e(), t.addEventListener("scroll", e), () => t.removeEventListener("scroll", e);
		}
	}, [r.viewport, r.isPositioned]), a ? /* @__PURE__ */ p(kC, {
		...t,
		ref: s,
		onAutoScroll: () => {
			let { viewport: e, selectedItem: t } = r;
			e && t && (e.scrollTop -= t.offsetHeight);
		}
	}) : null;
});
EC.displayName = TC;
var DC = "SelectScrollDownButton", OC = e.forwardRef((t, n) => {
	let r = $S(DC, t.__scopeSelect), i = cC(DC, t.__scopeSelect), [a, o] = e.useState(!1), s = U(n, i.onScrollButtonChange);
	return G(() => {
		if (r.viewport && r.isPositioned) {
			let e = function() {
				let e = t.scrollHeight - t.clientHeight;
				o(Math.ceil(t.scrollTop) < e);
			}, t = r.viewport;
			return e(), t.addEventListener("scroll", e), () => t.removeEventListener("scroll", e);
		}
	}, [r.viewport, r.isPositioned]), a ? /* @__PURE__ */ p(kC, {
		...t,
		ref: s,
		onAutoScroll: () => {
			let { viewport: e, selectedItem: t } = r;
			e && t && (e.scrollTop += t.offsetHeight);
		}
	}) : null;
});
OC.displayName = DC;
var kC = e.forwardRef((t, n) => {
	let { __scopeSelect: r, onAutoScroll: i, ...a } = t, o = $S("SelectScrollButton", r), s = e.useRef(null), c = jS(r), l = e.useCallback(() => {
		s.current !== null && (window.clearInterval(s.current), s.current = null);
	}, []);
	return e.useEffect(() => () => l(), [l]), G(() => {
		c().find((e) => e.ref.current === document.activeElement)?.ref.current?.scrollIntoView({ block: "nearest" });
	}, [c]), /* @__PURE__ */ p(K.div, {
		"aria-hidden": !0,
		...a,
		ref: n,
		style: {
			flexShrink: 0,
			...a.style
		},
		onPointerDown: W(a.onPointerDown, () => {
			s.current === null && (s.current = window.setInterval(i, 50));
		}),
		onPointerMove: W(a.onPointerMove, () => {
			o.onItemLeave?.(), s.current === null && (s.current = window.setInterval(i, 50));
		}),
		onPointerLeave: W(a.onPointerLeave, () => {
			l();
		})
	});
}), AC = "SelectSeparator", jC = e.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e;
	return /* @__PURE__ */ p(K.div, {
		"aria-hidden": !0,
		...r,
		ref: t
	});
});
jC.displayName = AC;
var MC = "SelectArrow", NC = e.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e, i = FS(n), a = LS(MC, n), o = $S(MC, n);
	return a.open && o.position === "popper" ? /* @__PURE__ */ p(Bh, {
		...i,
		...r,
		ref: t
	}) : null;
});
NC.displayName = MC;
var PC = "SelectBubbleInput", FC = e.forwardRef(({ __scopeSelect: t, value: n, ...r }, i) => {
	let a = e.useRef(null), o = U(i, a), s = Fc(n);
	return e.useEffect(() => {
		let e = a.current;
		if (!e) return;
		let t = window.HTMLSelectElement.prototype, r = Object.getOwnPropertyDescriptor(t, "value").set;
		if (s !== n && r) {
			let t = new Event("change", { bubbles: !0 });
			r.call(e, n), e.dispatchEvent(t);
		}
	}, [s, n]), /* @__PURE__ */ p(K.select, {
		...r,
		style: {
			...CS,
			...r.style
		},
		ref: o,
		defaultValue: n
	});
});
FC.displayName = PC;
function IC(e) {
	return e === "" || e === void 0;
}
function LC(t) {
	let n = Y(t), r = e.useRef(""), i = e.useRef(0), a = e.useCallback((e) => {
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
function RC(e, t, n) {
	let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1, a = zC(e, Math.max(i, 0));
	r.length === 1 && (a = a.filter((e) => e !== n));
	let o = a.find((e) => e.textValue.toLowerCase().startsWith(r.toLowerCase()));
	return o === n ? void 0 : o;
}
function zC(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
var BC = BS, VC = HS, HC = WS, UC = KS, WC = JS, GC = XS, KC = uC, qC = mC, JC = gC, YC = bC, XC = SC, ZC = wC, QC = EC, $C = OC, ew = jC, tw = BC, nw = qC, rw = HC;
function iw({ className: e, children: t, ref: n, ...r }) {
	return /* @__PURE__ */ m(VC, {
		ref: n,
		className: H("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-hidden focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", e),
		...r,
		children: [t, /* @__PURE__ */ p(UC, {
			asChild: !0,
			children: /* @__PURE__ */ p(Wn, { className: "h-4 w-4 opacity-50" })
		})]
	});
}
iw.displayName = VC.displayName;
function aw({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p(QC, {
		ref: t,
		className: H("flex cursor-default items-center justify-center py-1", e),
		...n,
		children: /* @__PURE__ */ p(qn, { className: "h-4 w-4" })
	});
}
aw.displayName = QC.displayName;
function ow({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p($C, {
		ref: t,
		className: H("flex cursor-default items-center justify-center py-1", e),
		...n,
		children: /* @__PURE__ */ p(Wn, { className: "h-4 w-4" })
	});
}
ow.displayName = $C.displayName;
function sw({ className: e, children: t, position: n = "popper", ref: r, ...i }) {
	return /* @__PURE__ */ p(WC, { children: /* @__PURE__ */ m(GC, {
		ref: r,
		className: H("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", n === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", e),
		position: n,
		...i,
		children: [
			/* @__PURE__ */ p(aw, {}),
			/* @__PURE__ */ p(KC, {
				className: H("p-1", n === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
				children: t
			}),
			/* @__PURE__ */ p(ow, {})
		]
	}) });
}
sw.displayName = GC.displayName;
function cw({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p(JC, {
		ref: t,
		className: H("px-2 py-1.5 text-sm font-semibold", e),
		...n
	});
}
cw.displayName = JC.displayName;
function lw({ className: e, children: t, ref: n, ...r }) {
	return /* @__PURE__ */ m(YC, {
		ref: n,
		className: H("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", e),
		...r,
		children: [/* @__PURE__ */ p("span", {
			className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
			children: /* @__PURE__ */ p(ZC, { children: /* @__PURE__ */ p(Un, { className: "h-4 w-4" }) })
		}), /* @__PURE__ */ p(XC, { children: t })]
	});
}
lw.displayName = YC.displayName;
function uw({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p(ew, {
		ref: t,
		className: H("-mx-1 my-1 h-px bg-muted", e),
		...n
	});
}
uw.displayName = ew.displayName;
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-separator@1.1.8_@types+react-dom@19.2.3_@types+react@19.2.14__@types+re_1c2d14dd6f3e6960869b5d7d9355f1a3/node_modules/@radix-ui/react-separator/dist/index.mjs
var dw = "Separator", fw = "horizontal", pw = ["horizontal", "vertical"], mw = e.forwardRef((e, t) => {
	let { decorative: n, orientation: r = fw, ...i } = e, a = hw(r) ? r : fw, o = n ? { role: "none" } : {
		"aria-orientation": a === "vertical" ? a : void 0,
		role: "separator"
	};
	return /* @__PURE__ */ p(jr.div, {
		"data-orientation": a,
		...o,
		...i,
		ref: t
	});
});
mw.displayName = dw;
function hw(e) {
	return pw.includes(e);
}
var gw = mw;
//#endregion
//#region src/components/ui/separator.tsx
function _w(e) {
	let { className: t, orientation: n = "horizontal", decorative: r = !0, ref: i, ...a } = e;
	return /* @__PURE__ */ p(gw, {
		ref: i,
		decorative: r,
		orientation: n,
		className: H("shrink-0 bg-border-subtle", n === "horizontal" ? "h-px w-full" : "h-full w-px", t),
		...a
	});
}
_w.displayName = gw.displayName;
//#endregion
//#region src/components/ui/sheet.tsx
var vw = Xd, yw = Zd, bw = rf, xw = Qd;
function Sw({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p($d, {
		className: H("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", e),
		...n,
		ref: t
	});
}
Sw.displayName = $d.displayName;
var Cw = fr("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
function ww({ side: e = "right", className: t, children: n, ref: r, ...i }) {
	return /* @__PURE__ */ m(xw, { children: [/* @__PURE__ */ p(Sw, {}), /* @__PURE__ */ m(ef, {
		ref: r,
		className: H(Cw({ side: e }), t),
		...i,
		children: [/* @__PURE__ */ m(rf, {
			className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
			children: [/* @__PURE__ */ p(ar, { className: "h-4 w-4" }), /* @__PURE__ */ p("span", {
				className: "sr-only",
				children: "Close"
			})]
		}), n]
	})] });
}
ww.displayName = ef.displayName;
var Tw = ({ className: e, ...t }) => /* @__PURE__ */ p("div", {
	className: H("flex flex-col space-y-2 text-center sm:text-left", e),
	...t
});
Tw.displayName = "SheetHeader";
var Ew = ({ className: e, ...t }) => /* @__PURE__ */ p("div", {
	className: H("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", e),
	...t
});
Ew.displayName = "SheetFooter";
function Dw({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p(tf, {
		ref: t,
		className: H("text-lg font-semibold text-foreground", e),
		...n
	});
}
Dw.displayName = tf.displayName;
function Ow({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p(nf, {
		ref: t,
		className: H("text-sm text-muted-foreground", e),
		...n
	});
}
Ow.displayName = nf.displayName;
//#endregion
//#region src/components/ui/skeleton.tsx
function kw({ className: e, ...t }) {
	return /* @__PURE__ */ p("div", {
		className: H("animate-shimmer rounded-md bg-border-subtle", e),
		style: {
			backgroundImage: "linear-gradient(90deg, hsl(var(--warm-200-hsl)) 25%, hsl(var(--warm-100-hsl)) 50%, hsl(var(--warm-200-hsl)) 75%)",
			backgroundSize: "1000px 100%"
		},
		"aria-busy": "true",
		"aria-label": "Loading...",
		...t
	});
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-slider@1.3.6_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react_4168059ceb0ad18c50e861ed8102d508/node_modules/@radix-ui/react-slider/dist/index.mjs
var Aw = ["PageUp", "PageDown"], jw = [
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight"
], Mw = {
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
}, Nw = "Slider", [Pw, Fw, Iw] = yt(Nw), [Lw, Rw] = ct(Nw, [Iw]), [zw, Bw] = Lw(Nw), Vw = e.forwardRef((t, n) => {
	let { name: r, min: i = 0, max: a = 100, step: o = 1, orientation: s = "horizontal", disabled: c = !1, minStepsBetweenThumbs: l = 0, defaultValue: u = [i], value: d, onValueChange: f = () => {}, onValueCommit: m = () => {}, inverted: h = !1, form: g, ..._ } = t, v = e.useRef(/* @__PURE__ */ new Set()), y = e.useRef(0), b = s === "horizontal" ? Ww : Gw, [x = [], S] = xt({
		prop: d,
		defaultProp: u,
		onChange: (e) => {
			[...v.current][y.current]?.focus(), f(e);
		}
	}), C = e.useRef(x);
	function w(e) {
		D(e, aT(x, e));
	}
	function T(e) {
		D(e, y.current);
	}
	function E() {
		let e = C.current[y.current];
		x[y.current] !== e && m(x);
	}
	function D(e, t, { commit: n } = { commit: !1 }) {
		let r = uT(o), s = Fx(dT(Math.round((e - i) / o) * o + i, r), [i, a]);
		S((e = []) => {
			let r = nT(e, s, t);
			if (cT(r, l * o)) {
				y.current = r.indexOf(s);
				let t = String(r) !== String(e);
				return t && n && m(r), t ? r : e;
			} else return e;
		});
	}
	return /* @__PURE__ */ p(zw, {
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
		children: /* @__PURE__ */ p(Pw.Provider, {
			scope: t.__scopeSlider,
			children: /* @__PURE__ */ p(Pw.Slot, {
				scope: t.__scopeSlider,
				children: /* @__PURE__ */ p(b, {
					"aria-disabled": c,
					"data-disabled": c ? "" : void 0,
					..._,
					ref: n,
					onPointerDown: W(_.onPointerDown, () => {
						c || (C.current = x);
					}),
					min: i,
					max: a,
					inverted: h,
					onSlideStart: c ? void 0 : w,
					onSlideMove: c ? void 0 : T,
					onSlideEnd: c ? void 0 : E,
					onHomeKeyDown: () => !c && D(i, 0, { commit: !0 }),
					onEndKeyDown: () => !c && D(a, x.length - 1, { commit: !0 }),
					onStepKeyDown: ({ event: e, direction: t }) => {
						if (!c) {
							let n = Aw.includes(e.key) || e.shiftKey && jw.includes(e.key) ? 10 : 1, r = y.current, i = x[r];
							D(i + o * n * t, r, { commit: !0 });
						}
					}
				})
			})
		})
	});
});
Vw.displayName = Nw;
var [Hw, Uw] = Lw(Nw, {
	startEdge: "left",
	endEdge: "right",
	size: "width",
	direction: 1
}), Ww = e.forwardRef((t, n) => {
	let { min: r, max: i, dir: a, inverted: o, onSlideStart: s, onSlideMove: c, onSlideEnd: l, onStepKeyDown: u, ...d } = t, [f, m] = e.useState(null), h = U(n, (e) => m(e)), g = e.useRef(void 0), _ = qt(a), v = _ === "ltr", y = v && !o || !v && o;
	function b(e) {
		let t = g.current || f.getBoundingClientRect(), n = lT([0, t.width], y ? [r, i] : [i, r]);
		return g.current = t, n(e - t.left);
	}
	return /* @__PURE__ */ p(Hw, {
		scope: t.__scopeSlider,
		startEdge: y ? "left" : "right",
		endEdge: y ? "right" : "left",
		direction: y ? 1 : -1,
		size: "width",
		children: /* @__PURE__ */ p(Kw, {
			dir: _,
			"data-orientation": "horizontal",
			...d,
			ref: h,
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
				let t = Mw[y ? "from-left" : "from-right"].includes(e.key);
				u?.({
					event: e,
					direction: t ? -1 : 1
				});
			}
		})
	});
}), Gw = e.forwardRef((t, n) => {
	let { min: r, max: i, inverted: a, onSlideStart: o, onSlideMove: s, onSlideEnd: c, onStepKeyDown: l, ...u } = t, d = e.useRef(null), f = U(n, d), m = e.useRef(void 0), h = !a;
	function g(e) {
		let t = m.current || d.current.getBoundingClientRect(), n = lT([0, t.height], h ? [i, r] : [r, i]);
		return m.current = t, n(e - t.top);
	}
	return /* @__PURE__ */ p(Hw, {
		scope: t.__scopeSlider,
		startEdge: h ? "bottom" : "top",
		endEdge: h ? "top" : "bottom",
		size: "height",
		direction: h ? 1 : -1,
		children: /* @__PURE__ */ p(Kw, {
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
				m.current = void 0, c?.();
			},
			onStepKeyDown: (e) => {
				let t = Mw[h ? "from-bottom" : "from-top"].includes(e.key);
				l?.({
					event: e,
					direction: t ? -1 : 1
				});
			}
		})
	});
}), Kw = e.forwardRef((e, t) => {
	let { __scopeSlider: n, onSlideStart: r, onSlideMove: i, onSlideEnd: a, onHomeKeyDown: o, onEndKeyDown: s, onStepKeyDown: c, ...l } = e, u = Bw(Nw, n);
	return /* @__PURE__ */ p(K.span, {
		...l,
		ref: t,
		onKeyDown: W(e.onKeyDown, (e) => {
			e.key === "Home" ? (o(e), e.preventDefault()) : e.key === "End" ? (s(e), e.preventDefault()) : Aw.concat(jw).includes(e.key) && (c(e), e.preventDefault());
		}),
		onPointerDown: W(e.onPointerDown, (e) => {
			let t = e.target;
			t.setPointerCapture(e.pointerId), e.preventDefault(), u.thumbs.has(t) ? t.focus() : r(e);
		}),
		onPointerMove: W(e.onPointerMove, (e) => {
			e.target.hasPointerCapture(e.pointerId) && i(e);
		}),
		onPointerUp: W(e.onPointerUp, (e) => {
			let t = e.target;
			t.hasPointerCapture(e.pointerId) && (t.releasePointerCapture(e.pointerId), a(e));
		})
	});
}), qw = "SliderTrack", Jw = e.forwardRef((e, t) => {
	let { __scopeSlider: n, ...r } = e, i = Bw(qw, n);
	return /* @__PURE__ */ p(K.span, {
		"data-disabled": i.disabled ? "" : void 0,
		"data-orientation": i.orientation,
		...r,
		ref: t
	});
});
Jw.displayName = qw;
var Yw = "SliderRange", Xw = e.forwardRef((t, n) => {
	let { __scopeSlider: r, ...i } = t, a = Bw(Yw, r), o = Uw(Yw, r), s = U(n, e.useRef(null)), c = a.values.length, l = a.values.map((e) => rT(e, a.min, a.max)), u = c > 1 ? Math.min(...l) : 0, d = 100 - Math.max(...l);
	return /* @__PURE__ */ p(K.span, {
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
Xw.displayName = Yw;
var Zw = "SliderThumb", Qw = e.forwardRef((t, n) => {
	let r = Fw(t.__scopeSlider), [i, a] = e.useState(null), o = U(n, (e) => a(e)), s = e.useMemo(() => i ? r().findIndex((e) => e.ref.current === i) : -1, [r, i]);
	return /* @__PURE__ */ p($w, {
		...t,
		ref: o,
		index: s
	});
}), $w = e.forwardRef((t, n) => {
	let { __scopeSlider: r, index: i, name: a, ...o } = t, s = Bw(Zw, r), c = Uw(Zw, r), [l, u] = e.useState(null), d = U(n, (e) => u(e)), f = l ? s.form || !!l.closest("form") : !0, h = Ic(l), g = s.values[i], _ = g === void 0 ? 0 : rT(g, s.min, s.max), v = iT(i, s.values.length), y = h?.[c.size], b = y ? oT(y, _, c.direction) : 0;
	return e.useEffect(() => {
		if (l) return s.thumbs.add(l), () => {
			s.thumbs.delete(l);
		};
	}, [l, s.thumbs]), /* @__PURE__ */ m("span", {
		style: {
			transform: "var(--radix-slider-thumb-transform)",
			position: "absolute",
			[c.startEdge]: `calc(${_}% + ${b}px)`
		},
		children: [/* @__PURE__ */ p(Pw.ItemSlot, {
			scope: t.__scopeSlider,
			children: /* @__PURE__ */ p(K.span, {
				role: "slider",
				"aria-label": t["aria-label"] || v,
				"aria-valuemin": s.min,
				"aria-valuenow": g,
				"aria-valuemax": s.max,
				"aria-orientation": s.orientation,
				"data-orientation": s.orientation,
				"data-disabled": s.disabled ? "" : void 0,
				tabIndex: s.disabled ? void 0 : 0,
				...o,
				ref: d,
				style: g === void 0 ? { display: "none" } : t.style,
				onFocus: W(t.onFocus, () => {
					s.valueIndexToChangeRef.current = i;
				})
			})
		}), f && /* @__PURE__ */ p(tT, {
			name: a ?? (s.name ? s.name + (s.values.length > 1 ? "[]" : "") : void 0),
			form: s.form,
			value: g
		}, i)]
	});
});
Qw.displayName = Zw;
var eT = "RadioBubbleInput", tT = e.forwardRef(({ __scopeSlider: t, value: n, ...r }, i) => {
	let a = e.useRef(null), o = U(a, i), s = Fc(n);
	return e.useEffect(() => {
		let e = a.current;
		if (!e) return;
		let t = window.HTMLInputElement.prototype, r = Object.getOwnPropertyDescriptor(t, "value").set;
		if (s !== n && r) {
			let t = new Event("input", { bubbles: !0 });
			r.call(e, n), e.dispatchEvent(t);
		}
	}, [s, n]), /* @__PURE__ */ p(K.input, {
		style: { display: "none" },
		...r,
		ref: o,
		defaultValue: n
	});
});
tT.displayName = eT;
function nT(e = [], t, n) {
	let r = [...e];
	return r[n] = t, r.sort((e, t) => e - t);
}
function rT(e, t, n) {
	return Fx(100 / (n - t) * (e - t), [0, 100]);
}
function iT(e, t) {
	if (t > 2) return `Value ${e + 1} of ${t}`;
	if (t === 2) return ["Minimum", "Maximum"][e];
}
function aT(e, t) {
	if (e.length === 1) return 0;
	let n = e.map((e) => Math.abs(e - t)), r = Math.min(...n);
	return n.indexOf(r);
}
function oT(e, t, n) {
	let r = e / 2;
	return (r - lT([0, 50], [0, r])(t) * n) * n;
}
function sT(e) {
	return e.slice(0, -1).map((t, n) => e[n + 1] - t);
}
function cT(e, t) {
	if (t > 0) {
		let n = sT(e);
		return Math.min(...n) >= t;
	}
	return !0;
}
function lT(e, t) {
	return (n) => {
		if (e[0] === e[1] || t[0] === t[1]) return t[0];
		let r = (t[1] - t[0]) / (e[1] - e[0]);
		return t[0] + r * (n - e[0]);
	};
}
function uT(e) {
	return (String(e).split(".")[1] || "").length;
}
function dT(e, t) {
	let n = 10 ** t;
	return Math.round(e * n) / n;
}
var fT = Vw, pT = Jw, mT = Xw, hT = Qw;
//#endregion
//#region src/components/ui/slider.tsx
function gT(e) {
	let { className: t, ref: n, ...r } = e;
	return /* @__PURE__ */ m(fT, {
		ref: n,
		className: H("relative flex w-full touch-none select-none items-center", t),
		...r,
		children: [/* @__PURE__ */ p(pT, {
			className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-border-default",
			children: /* @__PURE__ */ p(mT, { className: "absolute h-full bg-primary" })
		}), (r.value ?? r.defaultValue ?? [0]).map((e, t) => /* @__PURE__ */ p(hT, { className: H("block h-4 w-4 rounded-full border border-primary/50 bg-surface-raised shadow-elevation-2", "ring-offset-background transition-all duration-fast", "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", "disabled:pointer-events-none disabled:opacity-50", "hover:shadow-elevation-3 hover:scale-110") }, t))]
	});
}
gT.displayName = fT.displayName;
//#endregion
//#region src/components/ui/spinner.tsx
var _T = fr("animate-spin rounded-full border-current", {
	variants: { size: {
		xs: "h-3 w-3 border-[1.5px]",
		sm: "h-4 w-4 border-2",
		default: "h-5 w-5 border-2",
		lg: "h-6 w-6 border-[2.5px]",
		xl: "h-8 w-8 border-[3px]"
	} },
	defaultVariants: { size: "default" }
});
function vT({ size: e, className: t, label: n = "Loading..." }) {
	return /* @__PURE__ */ p("div", {
		role: "status",
		"aria-label": n,
		className: H(_T({ size: e }), "border-t-transparent", t)
	});
}
//#endregion
//#region src/components/ui/status-badge.tsx
var yT = fr("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2", {
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
function bT({ className: e, variant: t, ...n }) {
	return /* @__PURE__ */ p("div", {
		className: H(yT({ variant: t }), e),
		...n
	});
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-switch@1.2.6_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react_fb4779bfc166cf9d3db05474981c0df1/node_modules/@radix-ui/react-switch/dist/index.mjs
var xT = "Switch", [ST, CT] = ct(xT), [wT, TT] = ST(xT), ET = e.forwardRef((t, n) => {
	let { __scopeSwitch: r, name: i, checked: a, defaultChecked: o, required: s, disabled: c, value: l = "on", onCheckedChange: u, form: d, ...f } = t, [h, g] = e.useState(null), _ = U(n, (e) => g(e)), v = e.useRef(!1), y = h ? d || !!h.closest("form") : !0, [b, x] = xt({
		prop: a,
		defaultProp: o ?? !1,
		onChange: u,
		caller: xT
	});
	return /* @__PURE__ */ m(wT, {
		scope: r,
		checked: b,
		disabled: c,
		children: [/* @__PURE__ */ p(K.button, {
			type: "button",
			role: "switch",
			"aria-checked": b,
			"aria-required": s,
			"data-state": jT(b),
			"data-disabled": c ? "" : void 0,
			disabled: c,
			value: l,
			...f,
			ref: _,
			onClick: W(t.onClick, (e) => {
				x((e) => !e), y && (v.current = e.isPropagationStopped(), v.current || e.stopPropagation());
			})
		}), y && /* @__PURE__ */ p(AT, {
			control: h,
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
ET.displayName = xT;
var DT = "SwitchThumb", OT = e.forwardRef((e, t) => {
	let { __scopeSwitch: n, ...r } = e, i = TT(DT, n);
	return /* @__PURE__ */ p(K.span, {
		"data-state": jT(i.checked),
		"data-disabled": i.disabled ? "" : void 0,
		...r,
		ref: t
	});
});
OT.displayName = DT;
var kT = "SwitchBubbleInput", AT = e.forwardRef(({ __scopeSwitch: t, control: n, checked: r, bubbles: i = !0, ...a }, o) => {
	let s = e.useRef(null), c = U(s, o), l = Fc(r), u = Ic(n);
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
	]), /* @__PURE__ */ p("input", {
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
AT.displayName = kT;
function jT(e) {
	return e ? "checked" : "unchecked";
}
var MT = ET, NT = OT;
//#endregion
//#region src/components/ui/switch.tsx
function PT(e) {
	let { className: t, ref: n, ...r } = e;
	return /* @__PURE__ */ p(MT, {
		ref: n,
		className: H("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent", "bg-border-strong transition-colors duration-base ease-out", "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background", "disabled:cursor-not-allowed disabled:opacity-50", "data-[state=checked]:bg-primary", t),
		...r,
		children: /* @__PURE__ */ p(NT, { className: H("pointer-events-none block h-4 w-4 rounded-full bg-white shadow-elevation-1", "ring-0 transition-transform duration-base ease-spring", "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
	});
}
PT.displayName = MT.displayName;
//#endregion
//#region src/components/ui/table.tsx
function FT({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p("div", {
		className: "relative w-full overflow-auto",
		children: /* @__PURE__ */ p("table", {
			ref: t,
			className: H("w-full caption-bottom text-sm", e),
			...n
		})
	});
}
FT.displayName = "Table";
function IT({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p("thead", {
		ref: t,
		className: H("[&_tr]:border-b", e),
		...n
	});
}
IT.displayName = "TableHeader";
function LT({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p("tbody", {
		ref: t,
		className: H("[&_tr:last-child]:border-0", e),
		...n
	});
}
LT.displayName = "TableBody";
function RT({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p("tfoot", {
		ref: t,
		className: H("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", e),
		...n
	});
}
RT.displayName = "TableFooter";
function zT({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p("tr", {
		ref: t,
		className: H("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", e),
		...n
	});
}
zT.displayName = "TableRow";
function BT({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p("th", {
		ref: t,
		className: H("h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", e),
		...n
	});
}
BT.displayName = "TableHead";
function VT({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p("td", {
		ref: t,
		className: H("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", e),
		...n
	});
}
VT.displayName = "TableCell";
function HT({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p("caption", {
		ref: t,
		className: H("mt-4 text-sm text-muted-foreground", e),
		...n
	});
}
HT.displayName = "TableCaption";
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-tabs@1.1.13_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react@_08684373bbac196273bdefb5472f93a8/node_modules/@radix-ui/react-tabs/dist/index.mjs
var UT = "Tabs", [WT, GT] = ct(UT, [Jh]), KT = Jh(), [qT, JT] = WT(UT), YT = e.forwardRef((e, t) => {
	let { __scopeTabs: n, value: r, onValueChange: i, defaultValue: a, orientation: o = "horizontal", dir: s, activationMode: c = "automatic", ...l } = e, u = qt(s), [d, f] = xt({
		prop: r,
		onChange: i,
		defaultProp: a ?? "",
		caller: UT
	});
	return /* @__PURE__ */ p(qT, {
		scope: n,
		baseId: J(),
		value: d,
		onValueChange: f,
		orientation: o,
		dir: u,
		activationMode: c,
		children: /* @__PURE__ */ p(K.div, {
			dir: u,
			"data-orientation": o,
			...l,
			ref: t
		})
	});
});
YT.displayName = UT;
var XT = "TabsList", ZT = e.forwardRef((e, t) => {
	let { __scopeTabs: n, loop: r = !0, ...i } = e, a = JT(XT, n);
	return /* @__PURE__ */ p(og, {
		asChild: !0,
		...KT(n),
		orientation: a.orientation,
		dir: a.dir,
		loop: r,
		children: /* @__PURE__ */ p(K.div, {
			role: "tablist",
			"aria-orientation": a.orientation,
			...i,
			ref: t
		})
	});
});
ZT.displayName = XT;
var QT = "TabsTrigger", $T = e.forwardRef((e, t) => {
	let { __scopeTabs: n, value: r, disabled: i = !1, ...a } = e, o = JT(QT, n), s = KT(n), c = nE(o.baseId, r), l = rE(o.baseId, r), u = r === o.value;
	return /* @__PURE__ */ p(sg, {
		asChild: !0,
		...s,
		focusable: !i,
		active: u,
		children: /* @__PURE__ */ p(K.button, {
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
			onMouseDown: W(e.onMouseDown, (e) => {
				!i && e.button === 0 && e.ctrlKey === !1 ? o.onValueChange(r) : e.preventDefault();
			}),
			onKeyDown: W(e.onKeyDown, (e) => {
				[" ", "Enter"].includes(e.key) && o.onValueChange(r);
			}),
			onFocus: W(e.onFocus, () => {
				let e = o.activationMode !== "manual";
				!u && !i && e && o.onValueChange(r);
			})
		})
	});
});
$T.displayName = QT;
var eE = "TabsContent", tE = e.forwardRef((t, n) => {
	let { __scopeTabs: r, value: i, forceMount: a, children: o, ...s } = t, c = JT(eE, r), l = nE(c.baseId, i), u = rE(c.baseId, i), d = i === c.value, f = e.useRef(d);
	return e.useEffect(() => {
		let e = requestAnimationFrame(() => f.current = !1);
		return () => cancelAnimationFrame(e);
	}, []), /* @__PURE__ */ p(q, {
		present: a || d,
		children: ({ present: e }) => /* @__PURE__ */ p(K.div, {
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
tE.displayName = eE;
function nE(e, t) {
	return `${e}-trigger-${t}`;
}
function rE(e, t) {
	return `${e}-content-${t}`;
}
var iE = YT, aE = ZT, oE = $T, sE = tE, cE = iE;
function lE({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p(aE, {
		ref: t,
		className: H("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", e),
		...n
	});
}
lE.displayName = aE.displayName;
function uE({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p(oE, {
		ref: t,
		className: H("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", e),
		...n
	});
}
uE.displayName = oE.displayName;
function dE({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p(sE, {
		ref: t,
		className: H("mt-2 ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", e),
		...n
	});
}
dE.displayName = sE.displayName;
//#endregion
//#region src/components/ui/textarea.tsx
function fE({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p("textarea", {
		className: H("flex min-h-[80px] w-full rounded-md border border-border-default bg-[hsl(var(--input-bg))]", "px-3 py-2 text-body-sm text-content-primary", "placeholder:text-content-tertiary", "transition-colors duration-fast", "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-border-brand", "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-sunken", "read-only:bg-surface-sunken read-only:text-content-secondary", "resize-y", e),
		ref: t,
		...n
	});
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-toast@1.2.15_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react_6625e53ff8dc545622ac4ae2f6193cc7/node_modules/@radix-ui/react-toast/dist/index.mjs
var pE = "ToastProvider", [mE, hE, gE] = yt("Toast"), [_E, vE] = ct("Toast", [gE]), [yE, bE] = _E(pE), xE = (t) => {
	let { __scopeToast: n, label: r = "Notification", duration: i = 5e3, swipeDirection: a = "right", swipeThreshold: o = 50, children: s } = t, [c, l] = e.useState(null), [u, d] = e.useState(0), f = e.useRef(!1), m = e.useRef(!1);
	return r.trim() || console.error(`Invalid prop \`label\` supplied to \`${pE}\`. Expected non-empty \`string\`.`), /* @__PURE__ */ p(mE.Provider, {
		scope: n,
		children: /* @__PURE__ */ p(yE, {
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
			isClosePausedRef: m,
			children: s
		})
	});
};
xE.displayName = pE;
var SE = "ToastViewport", CE = ["F8"], wE = "toast.viewportPause", TE = "toast.viewportResume", EE = e.forwardRef((t, n) => {
	let { __scopeToast: r, hotkey: i = CE, label: a = "Notifications ({hotkey})", ...o } = t, s = bE(SE, r), c = hE(r), l = e.useRef(null), u = e.useRef(null), d = e.useRef(null), f = e.useRef(null), h = U(n, f, s.onViewportChange), g = i.join("+").replace(/Key/g, "").replace(/Digit/g, ""), _ = s.toastCount > 0;
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
					let e = new CustomEvent(wE);
					t.dispatchEvent(e), s.isClosePausedRef.current = !0;
				}
			}, r = () => {
				if (s.isClosePausedRef.current) {
					let e = new CustomEvent(TE);
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
			let n = t.ref.current, r = [n, ...$E(n)];
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
					eD(i.slice(a + 1)) ? t.preventDefault() : r ? u.current?.focus() : d.current?.focus();
				}
			};
			return e.addEventListener("keydown", t), () => e.removeEventListener("keydown", t);
		}
	}, [c, v]), /* @__PURE__ */ m(Al, {
		ref: l,
		role: "region",
		"aria-label": a.replace("{hotkey}", g),
		tabIndex: -1,
		style: { pointerEvents: _ ? void 0 : "none" },
		children: [
			_ && /* @__PURE__ */ p(OE, {
				ref: u,
				onFocusFromOutsideViewport: () => {
					eD(v({ tabbingDirection: "forwards" }));
				}
			}),
			/* @__PURE__ */ p(mE.Slot, {
				scope: r,
				children: /* @__PURE__ */ p(K.ol, {
					tabIndex: -1,
					...o,
					ref: h
				})
			}),
			_ && /* @__PURE__ */ p(OE, {
				ref: d,
				onFocusFromOutsideViewport: () => {
					eD(v({ tabbingDirection: "backwards" }));
				}
			})
		]
	});
});
EE.displayName = SE;
var DE = "ToastFocusProxy", OE = e.forwardRef((e, t) => {
	let { __scopeToast: n, onFocusFromOutsideViewport: r, ...i } = e, a = bE(DE, n);
	return /* @__PURE__ */ p(TS, {
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
OE.displayName = DE;
var kE = "Toast", AE = "toast.swipeStart", jE = "toast.swipeMove", ME = "toast.swipeCancel", NE = "toast.swipeEnd", PE = e.forwardRef((e, t) => {
	let { forceMount: n, open: r, defaultOpen: i, onOpenChange: a, ...o } = e, [s, c] = xt({
		prop: r,
		defaultProp: i ?? !0,
		onChange: a,
		caller: kE
	});
	return /* @__PURE__ */ p(q, {
		present: n || s,
		children: /* @__PURE__ */ p(LE, {
			open: s,
			...o,
			ref: t,
			onClose: () => c(!1),
			onPause: Y(e.onPause),
			onResume: Y(e.onResume),
			onSwipeStart: W(e.onSwipeStart, (e) => {
				e.currentTarget.setAttribute("data-swipe", "start");
			}),
			onSwipeMove: W(e.onSwipeMove, (e) => {
				let { x: t, y: n } = e.detail.delta;
				e.currentTarget.setAttribute("data-swipe", "move"), e.currentTarget.style.setProperty("--radix-toast-swipe-move-x", `${t}px`), e.currentTarget.style.setProperty("--radix-toast-swipe-move-y", `${n}px`);
			}),
			onSwipeCancel: W(e.onSwipeCancel, (e) => {
				e.currentTarget.setAttribute("data-swipe", "cancel"), e.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"), e.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"), e.currentTarget.style.removeProperty("--radix-toast-swipe-end-x"), e.currentTarget.style.removeProperty("--radix-toast-swipe-end-y");
			}),
			onSwipeEnd: W(e.onSwipeEnd, (e) => {
				let { x: t, y: n } = e.detail.delta;
				e.currentTarget.setAttribute("data-swipe", "end"), e.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"), e.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"), e.currentTarget.style.setProperty("--radix-toast-swipe-end-x", `${t}px`), e.currentTarget.style.setProperty("--radix-toast-swipe-end-y", `${n}px`), c(!1);
			})
		})
	});
});
PE.displayName = kE;
var [FE, IE] = _E(kE, { onClose() {} }), LE = e.forwardRef((t, n) => {
	let { __scopeToast: r, type: i = "foreground", duration: a, open: o, onClose: s, onEscapeKeyDown: c, onPause: l, onResume: u, onSwipeStart: d, onSwipeMove: g, onSwipeCancel: _, onSwipeEnd: v, ...y } = t, b = bE(kE, r), [x, S] = e.useState(null), C = U(n, (e) => S(e)), w = e.useRef(null), T = e.useRef(null), E = a || b.duration, D = e.useRef(0), O = e.useRef(E), k = e.useRef(0), { onToastAdd: A, onToastRemove: j } = b, M = Y(() => {
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
			return e.addEventListener(wE, n), e.addEventListener(TE, t), () => {
				e.removeEventListener(wE, n), e.removeEventListener(TE, t);
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
	let P = e.useMemo(() => x ? JE(x) : null, [x]);
	return b.viewport ? /* @__PURE__ */ m(f, { children: [P && /* @__PURE__ */ p(RE, {
		__scopeToast: r,
		role: "status",
		"aria-live": i === "foreground" ? "assertive" : "polite",
		children: P
	}), /* @__PURE__ */ p(FE, {
		scope: r,
		onClose: M,
		children: h.createPortal(/* @__PURE__ */ p(mE.ItemSlot, {
			scope: r,
			children: /* @__PURE__ */ p(kl, {
				asChild: !0,
				onEscapeKeyDown: W(c, () => {
					b.isFocusedToastEscapeKeyDownRef.current || M(), b.isFocusedToastEscapeKeyDownRef.current = !1;
				}),
				children: /* @__PURE__ */ p(K.li, {
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
					onKeyDown: W(t.onKeyDown, (e) => {
						e.key === "Escape" && (c?.(e.nativeEvent), e.nativeEvent.defaultPrevented || (b.isFocusedToastEscapeKeyDownRef.current = !0, M()));
					}),
					onPointerDown: W(t.onPointerDown, (e) => {
						e.button === 0 && (w.current = {
							x: e.clientX,
							y: e.clientY
						});
					}),
					onPointerMove: W(t.onPointerMove, (e) => {
						if (!w.current) return;
						let t = e.clientX - w.current.x, n = e.clientY - w.current.y, r = !!T.current, i = ["left", "right"].includes(b.swipeDirection), a = ["left", "up"].includes(b.swipeDirection) ? Math.min : Math.max, o = i ? a(0, t) : 0, s = i ? 0 : a(0, n), c = e.pointerType === "touch" ? 10 : 2, l = {
							x: o,
							y: s
						}, u = {
							originalEvent: e,
							delta: l
						};
						r ? (T.current = l, YE(jE, g, u, { discrete: !1 })) : XE(l, b.swipeDirection, c) ? (T.current = l, YE(AE, d, u, { discrete: !1 }), e.target.setPointerCapture(e.pointerId)) : (Math.abs(t) > c || Math.abs(n) > c) && (w.current = null);
					}),
					onPointerUp: W(t.onPointerUp, (e) => {
						let t = T.current, n = e.target;
						if (n.hasPointerCapture(e.pointerId) && n.releasePointerCapture(e.pointerId), T.current = null, w.current = null, t) {
							let n = e.currentTarget, r = {
								originalEvent: e,
								delta: t
							};
							XE(t, b.swipeDirection, b.swipeThreshold) ? YE(NE, v, r, { discrete: !0 }) : YE(ME, _, r, { discrete: !0 }), n.addEventListener("click", (e) => e.preventDefault(), { once: !0 });
						}
					})
				})
			})
		}), b.viewport)
	})] }) : null;
}), RE = (t) => {
	let { __scopeToast: n, children: r, ...i } = t, a = bE(kE, n), [o, s] = e.useState(!1), [c, l] = e.useState(!1);
	return ZE(() => s(!0)), e.useEffect(() => {
		let e = window.setTimeout(() => l(!0), 1e3);
		return () => window.clearTimeout(e);
	}, []), c ? null : /* @__PURE__ */ p(Jl, {
		asChild: !0,
		children: /* @__PURE__ */ p(TS, {
			...i,
			children: o && /* @__PURE__ */ m(f, { children: [
				a.label,
				" ",
				r
			] })
		})
	});
}, zE = "ToastTitle", BE = e.forwardRef((e, t) => {
	let { __scopeToast: n, ...r } = e;
	return /* @__PURE__ */ p(K.div, {
		...r,
		ref: t
	});
});
BE.displayName = zE;
var VE = "ToastDescription", HE = e.forwardRef((e, t) => {
	let { __scopeToast: n, ...r } = e;
	return /* @__PURE__ */ p(K.div, {
		...r,
		ref: t
	});
});
HE.displayName = VE;
var UE = "ToastAction", WE = e.forwardRef((e, t) => {
	let { altText: n, ...r } = e;
	return n.trim() ? /* @__PURE__ */ p(qE, {
		altText: n,
		asChild: !0,
		children: /* @__PURE__ */ p(KE, {
			...r,
			ref: t
		})
	}) : (console.error(`Invalid prop \`altText\` supplied to \`${UE}\`. Expected non-empty \`string\`.`), null);
});
WE.displayName = UE;
var GE = "ToastClose", KE = e.forwardRef((e, t) => {
	let { __scopeToast: n, ...r } = e, i = IE(GE, n);
	return /* @__PURE__ */ p(qE, {
		asChild: !0,
		children: /* @__PURE__ */ p(K.button, {
			type: "button",
			...r,
			ref: t,
			onClick: W(e.onClick, i.onClose)
		})
	});
});
KE.displayName = GE;
var qE = e.forwardRef((e, t) => {
	let { __scopeToast: n, altText: r, ...i } = e;
	return /* @__PURE__ */ p(K.div, {
		"data-radix-toast-announce-exclude": "",
		"data-radix-toast-announce-alt": r || void 0,
		...i,
		ref: t
	});
});
function JE(e) {
	let t = [];
	return Array.from(e.childNodes).forEach((e) => {
		if (e.nodeType === e.TEXT_NODE && e.textContent && t.push(e.textContent), QE(e)) {
			let n = e.ariaHidden || e.hidden || e.style.display === "none", r = e.dataset.radixToastAnnounceExclude === "";
			if (!n) if (r) {
				let n = e.dataset.radixToastAnnounceAlt;
				n && t.push(n);
			} else t.push(...JE(e));
		}
	}), t;
}
function YE(e, t, n, { discrete: r }) {
	let i = n.originalEvent.currentTarget, a = new CustomEvent(e, {
		bubbles: !0,
		cancelable: !0,
		detail: n
	});
	t && i.addEventListener(e, t, { once: !0 }), r ? wt(i, a) : i.dispatchEvent(a);
}
var XE = (e, t, n = 0) => {
	let r = Math.abs(e.x), i = Math.abs(e.y), a = r > i;
	return t === "left" || t === "right" ? a && r > n : !a && i > n;
};
function ZE(e = () => {}) {
	let t = Y(e);
	G(() => {
		let e = 0, n = 0;
		return e = window.requestAnimationFrame(() => n = window.requestAnimationFrame(t)), () => {
			window.cancelAnimationFrame(e), window.cancelAnimationFrame(n);
		};
	}, [t]);
}
function QE(e) {
	return e.nodeType === e.ELEMENT_NODE;
}
function $E(e) {
	let t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: (e) => {
		let t = e.tagName === "INPUT" && e.type === "hidden";
		return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	for (; n.nextNode();) t.push(n.currentNode);
	return t;
}
function eD(e) {
	let t = document.activeElement;
	return e.some((e) => e === t ? !0 : (e.focus(), document.activeElement !== t));
}
var tD = xE, nD = EE, rD = PE, iD = BE, aD = HE, oD = WE, sD = KE, cD = tD;
function lD({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p(nD, {
		ref: t,
		className: H("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]", e),
		...n
	});
}
lD.displayName = nD.displayName;
var uD = fr("group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full", {
	variants: { variant: {
		default: "border bg-background text-foreground",
		destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function dD({ className: e, variant: t, ref: n, ...r }) {
	return /* @__PURE__ */ p(rD, {
		ref: n,
		className: H(uD({ variant: t }), e),
		...r
	});
}
dD.displayName = rD.displayName;
function fD({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p(oD, {
		ref: t,
		className: H("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-hidden focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive", e),
		...n
	});
}
fD.displayName = oD.displayName;
function pD({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p(sD, {
		ref: t,
		className: H("absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-hidden focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600", e),
		"toast-close": "",
		...n,
		children: /* @__PURE__ */ p(ar, { className: "h-4 w-4" })
	});
}
pD.displayName = sD.displayName;
function mD({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p(iD, {
		ref: t,
		className: H("text-sm font-semibold [&+div]:text-xs", e),
		...n
	});
}
mD.displayName = iD.displayName;
function hD({ className: e, ref: t, ...n }) {
	return /* @__PURE__ */ p(aD, {
		ref: t,
		className: H("text-sm opacity-90", e),
		...n
	});
}
hD.displayName = aD.displayName;
//#endregion
//#region src/hooks/use-toast.ts
var gD = 1, _D = 1e6, vD = 0;
function yD() {
	return vD = (vD + 1) % (2 ** 53 - 1), vD.toString();
}
var bD = /* @__PURE__ */ new Map(), xD = (e) => {
	if (bD.has(e)) return;
	let t = setTimeout(() => {
		bD.delete(e), TD({
			type: "REMOVE_TOAST",
			toastId: e
		});
	}, _D);
	bD.set(e, t);
}, SD = (e, t) => {
	switch (t.type) {
		case "ADD_TOAST": return {
			...e,
			toasts: [t.toast, ...e.toasts].slice(0, gD)
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
			return n ? xD(n) : e.toasts.forEach((e) => {
				xD(e.id);
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
}, CD = [], wD = { toasts: [] };
function TD(e) {
	wD = SD(wD, e), CD.forEach((e) => {
		e(wD);
	});
}
function ED({ ...e }) {
	let t = yD(), n = (e) => TD({
		type: "UPDATE_TOAST",
		toast: {
			...e,
			id: t
		}
	}), r = () => TD({
		type: "DISMISS_TOAST",
		toastId: t
	});
	return TD({
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
function DD() {
	let [t, n] = e.useState(wD);
	return e.useEffect(() => (CD.push(n), () => {
		let e = CD.indexOf(n);
		e > -1 && CD.splice(e, 1);
	}), [t]), {
		...t,
		toast: ED,
		dismiss: (e) => TD({
			type: "DISMISS_TOAST",
			toastId: e
		})
	};
}
//#endregion
//#region src/components/ui/toaster.tsx
function OD() {
	let { toasts: e } = DD();
	return /* @__PURE__ */ m(cD, { children: [e.map(function({ id: e, title: t, description: n, action: r, ...i }) {
		return /* @__PURE__ */ m(dD, {
			...i,
			children: [
				/* @__PURE__ */ m("div", {
					className: "grid gap-1",
					children: [t && /* @__PURE__ */ p(mD, { children: t }), n && /* @__PURE__ */ p(hD, { children: n })]
				}),
				r,
				/* @__PURE__ */ p(pD, {})
			]
		}, e);
	}), /* @__PURE__ */ p(lD, {})] });
}
//#endregion
//#region node_modules/.pnpm/@radix-ui+react-tooltip@1.2.8_@types+react-dom@19.2.3_@types+react@19.2.14__@types+reac_8c33d96ab4033e6041e8b8646beae976/node_modules/@radix-ui/react-tooltip/dist/index.mjs
var [kD, AD] = ct("Tooltip", [xh]), jD = xh(), MD = "TooltipProvider", ND = 700, PD = "tooltip.open", [FD, ID] = kD(MD), LD = (t) => {
	let { __scopeTooltip: n, delayDuration: r = ND, skipDelayDuration: i = 300, disableHoverableContent: a = !1, children: o } = t, s = e.useRef(!0), c = e.useRef(!1), l = e.useRef(0);
	return e.useEffect(() => {
		let e = l.current;
		return () => window.clearTimeout(e);
	}, []), /* @__PURE__ */ p(FD, {
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
LD.displayName = MD;
var RD = "Tooltip", [zD, BD] = kD(RD), VD = (t) => {
	let { __scopeTooltip: n, children: r, open: i, defaultOpen: a, onOpenChange: o, disableHoverableContent: s, delayDuration: c } = t, l = ID(RD, t.__scopeTooltip), u = jD(n), [d, f] = e.useState(null), m = J(), h = e.useRef(0), g = s ?? l.disableHoverableContent, _ = c ?? l.delayDuration, v = e.useRef(!1), [y, b] = xt({
		prop: i,
		defaultProp: a ?? !1,
		onChange: (e) => {
			e ? (l.onOpen(), document.dispatchEvent(new CustomEvent(PD))) : l.onClose(), o?.(e);
		},
		caller: RD
	}), x = e.useMemo(() => y ? v.current ? "delayed-open" : "instant-open" : "closed", [y]), S = e.useCallback(() => {
		window.clearTimeout(h.current), h.current = 0, v.current = !1, b(!0);
	}, [b]), C = e.useCallback(() => {
		window.clearTimeout(h.current), h.current = 0, b(!1);
	}, [b]), w = e.useCallback(() => {
		window.clearTimeout(h.current), h.current = window.setTimeout(() => {
			v.current = !0, b(!0), h.current = 0;
		}, _);
	}, [_, b]);
	return e.useEffect(() => () => {
		h.current &&= (window.clearTimeout(h.current), 0);
	}, []), /* @__PURE__ */ p(Lh, {
		...u,
		children: /* @__PURE__ */ p(zD, {
			scope: n,
			contentId: m,
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
				g ? C() : (window.clearTimeout(h.current), h.current = 0);
			}, [C, g]),
			onOpen: S,
			onClose: C,
			disableHoverableContent: g,
			children: r
		})
	});
};
VD.displayName = RD;
var HD = "TooltipTrigger", UD = e.forwardRef((t, n) => {
	let { __scopeTooltip: r, ...i } = t, a = BD(HD, r), o = ID(HD, r), s = jD(r), c = U(n, e.useRef(null), a.onTriggerChange), l = e.useRef(!1), u = e.useRef(!1), d = e.useCallback(() => l.current = !1, []);
	return e.useEffect(() => () => document.removeEventListener("pointerup", d), [d]), /* @__PURE__ */ p(Rh, {
		asChild: !0,
		...s,
		children: /* @__PURE__ */ p(K.button, {
			"aria-describedby": a.open ? a.contentId : void 0,
			"data-state": a.stateAttribute,
			...i,
			ref: c,
			onPointerMove: W(t.onPointerMove, (e) => {
				e.pointerType !== "touch" && !u.current && !o.isPointerInTransitRef.current && (a.onTriggerEnter(), u.current = !0);
			}),
			onPointerLeave: W(t.onPointerLeave, () => {
				a.onTriggerLeave(), u.current = !1;
			}),
			onPointerDown: W(t.onPointerDown, () => {
				a.open && a.onClose(), l.current = !0, document.addEventListener("pointerup", d, { once: !0 });
			}),
			onFocus: W(t.onFocus, () => {
				l.current || a.onOpen();
			}),
			onBlur: W(t.onBlur, a.onClose),
			onClick: W(t.onClick, a.onClose)
		})
	});
});
UD.displayName = HD;
var WD = "TooltipPortal", [GD, KD] = kD(WD, { forceMount: void 0 }), qD = (e) => {
	let { __scopeTooltip: t, forceMount: n, children: r, container: i } = e, a = BD(WD, t);
	return /* @__PURE__ */ p(GD, {
		scope: t,
		forceMount: n,
		children: /* @__PURE__ */ p(q, {
			present: n || a.open,
			children: /* @__PURE__ */ p(Jl, {
				asChild: !0,
				container: i,
				children: r
			})
		})
	});
};
qD.displayName = WD;
var JD = "TooltipContent", YD = e.forwardRef((e, t) => {
	let n = KD(JD, e.__scopeTooltip), { forceMount: r = n.forceMount, side: i = "top", ...a } = e, o = BD(JD, e.__scopeTooltip);
	return /* @__PURE__ */ p(q, {
		present: r || o.open,
		children: o.disableHoverableContent ? /* @__PURE__ */ p(eO, {
			side: i,
			...a,
			ref: t
		}) : /* @__PURE__ */ p(XD, {
			side: i,
			...a,
			ref: t
		})
	});
}), XD = e.forwardRef((t, n) => {
	let r = BD(JD, t.__scopeTooltip), i = ID(JD, t.__scopeTooltip), a = e.useRef(null), o = U(n, a), [s, c] = e.useState(null), { trigger: l, onClose: u } = r, d = a.current, { onPointerInTransitChange: f } = i, m = e.useCallback(() => {
		c(null), f(!1);
	}, [f]), h = e.useCallback((e, t) => {
		let n = e.currentTarget, r = {
			x: e.clientX,
			y: e.clientY
		}, i = iO(r, rO(r, n.getBoundingClientRect())), a = aO(t.getBoundingClientRect());
		c(sO([...i, ...a])), f(!0);
	}, [f]);
	return e.useEffect(() => () => m(), [m]), e.useEffect(() => {
		if (l && d) {
			let e = (e) => h(e, d), t = (e) => h(e, l);
			return l.addEventListener("pointerleave", e), d.addEventListener("pointerleave", t), () => {
				l.removeEventListener("pointerleave", e), d.removeEventListener("pointerleave", t);
			};
		}
	}, [
		l,
		d,
		h,
		m
	]), e.useEffect(() => {
		if (s) {
			let e = (e) => {
				let t = e.target, n = {
					x: e.clientX,
					y: e.clientY
				}, r = l?.contains(t) || d?.contains(t), i = !oO(n, s);
				r ? m() : i && (m(), u());
			};
			return document.addEventListener("pointermove", e), () => document.removeEventListener("pointermove", e);
		}
	}, [
		l,
		d,
		s,
		u,
		m
	]), /* @__PURE__ */ p(eO, {
		...t,
		ref: o
	});
}), [ZD, QD] = kD(RD, { isInside: !1 }), $D = /* @__PURE__ */ ht("TooltipContent"), eO = e.forwardRef((t, n) => {
	let { __scopeTooltip: r, children: i, "aria-label": a, onEscapeKeyDown: o, onPointerDownOutside: s, ...c } = t, l = BD(JD, r), u = jD(r), { onClose: d } = l;
	return e.useEffect(() => (document.addEventListener(PD, d), () => document.removeEventListener(PD, d)), [d]), e.useEffect(() => {
		if (l.trigger) {
			let e = (e) => {
				e.target?.contains(l.trigger) && d();
			};
			return window.addEventListener("scroll", e, { capture: !0 }), () => window.removeEventListener("scroll", e, { capture: !0 });
		}
	}, [l.trigger, d]), /* @__PURE__ */ p(Sl, {
		asChild: !0,
		disableOutsidePointerEvents: !1,
		onEscapeKeyDown: o,
		onPointerDownOutside: s,
		onFocusOutside: (e) => e.preventDefault(),
		onDismiss: d,
		children: /* @__PURE__ */ m(zh, {
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
			children: [/* @__PURE__ */ p($D, { children: i }), /* @__PURE__ */ p(ZD, {
				scope: r,
				isInside: !0,
				children: /* @__PURE__ */ p(ES, {
					id: l.contentId,
					role: "tooltip",
					children: a || i
				})
			})]
		})
	});
});
YD.displayName = JD;
var tO = "TooltipArrow", nO = e.forwardRef((e, t) => {
	let { __scopeTooltip: n, ...r } = e, i = jD(n);
	return QD(tO, n).isInside ? null : /* @__PURE__ */ p(Bh, {
		...i,
		...r,
		ref: t
	});
});
nO.displayName = tO;
function rO(e, t) {
	let n = Math.abs(t.top - e.y), r = Math.abs(t.bottom - e.y), i = Math.abs(t.right - e.x), a = Math.abs(t.left - e.x);
	switch (Math.min(n, r, i, a)) {
		case a: return "left";
		case i: return "right";
		case n: return "top";
		case r: return "bottom";
		default: throw Error("unreachable");
	}
}
function iO(e, t, n = 5) {
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
function aO(e) {
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
function oO(e, t) {
	let { x: n, y: r } = e, i = !1;
	for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
		let o = t[e], s = t[a], c = o.x, l = o.y, u = s.x, d = s.y;
		l > r != d > r && n < (u - c) * (r - l) / (d - l) + c && (i = !i);
	}
	return i;
}
function sO(e) {
	let t = e.slice();
	return t.sort((e, t) => e.x < t.x ? -1 : e.x > t.x ? 1 : e.y < t.y ? -1 : +(e.y > t.y)), cO(t);
}
function cO(e) {
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
var lO = LD, uO = VD, dO = UD, fO = qD, pO = YD, mO = lO, hO = uO, gO = dO;
function _O(e) {
	let { className: t, sideOffset: n = 4, ref: r, ...i } = e;
	return /* @__PURE__ */ p(fO, { children: /* @__PURE__ */ p(pO, {
		ref: r,
		sideOffset: n,
		className: H("z-toast overflow-hidden rounded-md bg-popover px-3 py-1.5", "text-popover-foreground text-caption shadow-elevation-4 max-w-xs", "animate-in fade-in-0 zoom-in-95", "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95", "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", t),
		...i
	}) });
}
_O.displayName = pO.displayName;
//#endregion
//#region src/components/ui/bps-combobox.tsx
function vO({ options: t, value: n, onChange: r, placeholder: i = "Pilih item...", searchPlaceholder: a = "Cari...", emptyText: o = "Tidak ditemukan.", className: s, disabled: c = !1 }) {
	let [l, u] = e.useState(!1), [d, f] = e.useState(n || ""), h = n === void 0 ? d : n;
	return /* @__PURE__ */ m(Ib, {
		open: l,
		onOpenChange: u,
		children: [/* @__PURE__ */ p(Lb, {
			asChild: !0,
			children: /* @__PURE__ */ m(pi, {
				variant: "outline",
				role: "combobox",
				"aria-expanded": l,
				disabled: c,
				className: H("w-full justify-between bg-background border-border text-foreground font-medium hover:bg-muted hover:border-border-strong transition-all shadow-sm", !h && "text-muted-foreground font-normal", s),
				children: [/* @__PURE__ */ p("span", {
					className: "truncate",
					children: h ? t.find((e) => e.value === h)?.label : i
				}), /* @__PURE__ */ p(Jn, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })]
			})
		}), /* @__PURE__ */ p(Rb, {
			className: "w-[var(--radix-popover-trigger-width)] p-0 border-border shadow-lg animate-in fade-in zoom-in-95 duration-200",
			children: /* @__PURE__ */ m(Yf, {
				className: "bg-background",
				children: [/* @__PURE__ */ p(Zf, {
					placeholder: a,
					className: "h-11"
				}), /* @__PURE__ */ m(Qf, {
					className: "max-h-[300px]",
					children: [/* @__PURE__ */ p($f, {
						className: "py-6 text-center text-sm text-muted-foreground italic",
						children: o
					}), /* @__PURE__ */ p(ep, { children: t.map((e) => /* @__PURE__ */ p(np, {
						value: e.label,
						onSelect: () => {
							let t = e.value === h ? "" : e.value;
							n === void 0 && f(t), r?.(t), u(!1);
						},
						className: H("flex items-center justify-between px-3 py-2 cursor-pointer transition-colors", h === e.value ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted"),
						children: /* @__PURE__ */ m("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ p(Un, { className: H("h-4 w-4", h === e.value ? "opacity-100" : "opacity-0") }), e.label]
						})
					}, e.value)) })]
				})]
			})
		})]
	});
}
//#endregion
//#region src/components/ui/bps-app-topbar.tsx
function yO({ appTitle: e }) {
	return /* @__PURE__ */ m("header", {
		className: "flex items-center justify-between gap-4 rounded-lg border bg-card p-3",
		children: [/* @__PURE__ */ p("p", {
			className: "text-sm font-semibold text-foreground",
			children: e
		}), /* @__PURE__ */ m("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ p(Qy, {
					placeholder: "Cari menu atau dokumen...",
					className: "w-64"
				}),
				/* @__PURE__ */ p(pi, {
					variant: "ghost",
					size: "icon",
					"aria-label": "Notifikasi",
					children: /* @__PURE__ */ p(Vn, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ m(pi, {
					variant: "outline",
					size: "sm",
					className: "gap-2",
					children: [/* @__PURE__ */ p(ir, { className: "h-4 w-4" }), "Admin"]
				})
			]
		})]
	});
}
//#endregion
//#region src/components/ui/bps-confirm-action-dialog.tsx
function bO({ triggerLabel: t, title: n, description: r, confirmLabel: i, reasonRequired: a = !1, onConfirm: o }) {
	let [s, c] = e.useState(!1), [l, u] = e.useState(""), [d, f] = e.useState(!1);
	return /* @__PURE__ */ m(zf, {
		open: s,
		onOpenChange: c,
		children: [/* @__PURE__ */ p(Bf, {
			asChild: !0,
			children: /* @__PURE__ */ p(pi, {
				variant: "outline",
				children: t
			})
		}), /* @__PURE__ */ m(Wf, { children: [
			/* @__PURE__ */ m(Gf, { children: [/* @__PURE__ */ p(qf, { children: n }), /* @__PURE__ */ p(Jf, { children: r })] }),
			/* @__PURE__ */ m("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ m(Vy, {
						htmlFor: "confirm-reason",
						children: ["Alasan tindakan ", a ? /* @__PURE__ */ p("span", {
							className: "text-destructive",
							children: "*"
						}) : null]
					}),
					/* @__PURE__ */ p(fE, {
						id: "confirm-reason",
						value: l,
						onChange: (e) => {
							u(e.target.value), d && f(!1);
						},
						placeholder: "Tuliskan alasan atau catatan tindak lanjut..."
					}),
					d ? /* @__PURE__ */ p("p", {
						className: "text-xs text-destructive",
						children: "Alasan wajib diisi sebelum melanjutkan."
					}) : null
				]
			}),
			/* @__PURE__ */ m(Kf, { children: [/* @__PURE__ */ p(pi, {
				variant: "ghost",
				onClick: () => c(!1),
				children: "Batal"
			}), /* @__PURE__ */ p(pi, {
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
//#region src/components/ui/bps-bulk-action-bar.tsx
function xO({ selectedCount: e, onSetPending: t, onSetApproved: n }) {
	return e === 0 ? null : /* @__PURE__ */ m("div", {
		className: "flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-card p-3",
		children: [/* @__PURE__ */ m("p", {
			className: "text-sm text-foreground",
			children: [e, " dokumen dipilih"]
		}), /* @__PURE__ */ m("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ p(pi, {
				size: "sm",
				variant: "outline",
				onClick: t,
				children: "Set menunggu verifikasi"
			}), /* @__PURE__ */ p(pi, {
				size: "sm",
				onClick: n,
				children: "Set disetujui"
			})]
		})]
	});
}
//#endregion
//#region src/components/ui/bps-data-state-panel.tsx
function SO({ state: e, title: t, description: n, onRetry: r, children: i }) {
	return e === "ready" ? /* @__PURE__ */ p(f, { children: i }) : e === "loading" ? /* @__PURE__ */ p("div", {
		className: "rounded-lg border bg-card p-8",
		children: /* @__PURE__ */ m("div", {
			className: "flex items-center gap-3 text-sm text-muted-foreground",
			children: [/* @__PURE__ */ p(vT, { className: "h-4 w-4" }), "Memuat data dokumen..."]
		})
	}) : e === "error" ? /* @__PURE__ */ p("div", {
		className: "rounded-lg border border-feedback-danger/30 bg-feedback-danger-bg p-8",
		children: /* @__PURE__ */ m("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ p(Yn, { className: "mt-0.5 h-5 w-5 text-feedback-danger" }), /* @__PURE__ */ m("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ p("p", {
						className: "text-sm font-semibold text-foreground",
						children: t ?? "Data gagal dimuat"
					}),
					/* @__PURE__ */ p("p", {
						className: "text-sm text-muted-foreground",
						children: n ?? "Terjadi gangguan saat mengambil data. Silakan coba kembali."
					}),
					/* @__PURE__ */ p(pi, {
						size: "sm",
						variant: "outline",
						onClick: r,
						children: "Coba lagi"
					})
				]
			})]
		})
	}) : /* @__PURE__ */ m("div", {
		className: "rounded-lg border border-dashed bg-muted/30 p-8",
		children: [/* @__PURE__ */ p("p", {
			className: "text-sm font-medium text-foreground",
			children: t ?? "Belum ada data yang tersedia"
		}), /* @__PURE__ */ p("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: n ?? "Ubah filter atau tambah dokumen baru untuk mulai mengisi tabel."
		})]
	});
}
//#endregion
//#region src/components/ui/bps-data-table.tsx
function CO({ data: e, columns: t, className: n, ...r }) {
	return /* @__PURE__ */ p("div", {
		className: H("w-full overflow-auto rounded-lg border border-border bg-background shadow-sm", n),
		...r,
		children: /* @__PURE__ */ m("table", {
			className: "w-full caption-bottom text-sm border-collapse",
			children: [/* @__PURE__ */ p("thead", {
				className: "bg-muted/50 border-b-2 border-border",
				children: /* @__PURE__ */ m("tr", {
					className: "transition-colors",
					children: [t.map((e) => /* @__PURE__ */ p("th", {
						className: "h-12 px-4 text-left align-middle text-sm font-semibold text-muted-foreground",
						children: e.label
					}, e.key)), /* @__PURE__ */ p("th", {
						className: "h-12 px-4 text-right align-middle text-sm font-semibold text-muted-foreground",
						children: "Aksi"
					})]
				})
			}), /* @__PURE__ */ p("tbody", {
				className: "bg-background [&_tr:last-child]:border-0",
				children: e.map((e, n) => /* @__PURE__ */ m("tr", {
					className: "border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
					children: [t.map((t) => {
						let n = t.getValue ? t.getValue(e) : e[t.key];
						return /* @__PURE__ */ p("td", {
							className: "p-4 align-middle text-foreground font-medium",
							children: t.render ? t.render(n, e) : String(n ?? "-")
						}, t.key);
					}), /* @__PURE__ */ p("td", {
						className: "p-4 align-middle text-right",
						children: /* @__PURE__ */ p(pi, {
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
//#region src/components/ui/bps-date-picker.tsx
function wO({ date: t, onChange: n, placeholder: r = "Pilih tanggal", className: i, disabled: a = !1, clearable: o = !0 }) {
	let [s, c] = e.useState(t), l = t === void 0 ? s : t, u = (e) => {
		t === void 0 && c(e), n?.(e);
	};
	return /* @__PURE__ */ m(Ib, { children: [/* @__PURE__ */ p(Lb, {
		asChild: !0,
		children: /* @__PURE__ */ m(pi, {
			variant: "outline",
			disabled: a,
			className: H("w-full justify-start text-left font-medium border-border bg-background hover:bg-muted hover:border-border-strong transition-all shadow-sm group", !l && "text-muted-foreground font-normal", i),
			children: [
				/* @__PURE__ */ p(Hn, { className: "mr-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" }),
				/* @__PURE__ */ p("span", {
					className: "flex-1 truncate",
					children: l ? Ka(l, "dd MMMM yyyy", { locale: po }) : r
				}),
				o && l && !a && /* @__PURE__ */ p(ar, {
					className: "h-3 w-3 ml-2 opacity-40 hover:opacity-100 transition-opacity",
					onClick: (e) => {
						e.stopPropagation(), u(void 0);
					}
				})
			]
		})
	}), /* @__PURE__ */ p(Rb, {
		className: "w-auto p-0 border-border shadow-xl animate-in fade-in slide-in-from-top-2 duration-200",
		align: "start",
		children: /* @__PURE__ */ p(Dc, {
			mode: "single",
			selected: l,
			onSelect: u,
			initialFocus: !0,
			className: "bg-background rounded-md"
		})
	})] });
}
//#endregion
//#region src/components/ui/bps-filter-bar.tsx
function TO({ value: e, onChange: t, onReset: n }) {
	return /* @__PURE__ */ m("div", {
		className: "rounded-lg border bg-card p-4",
		children: [/* @__PURE__ */ m("div", {
			className: "grid gap-4 md:grid-cols-3",
			children: [
				/* @__PURE__ */ m("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ p(Vy, {
						htmlFor: "filter-keyword",
						children: "Pencarian"
					}), /* @__PURE__ */ m("div", {
						className: "relative",
						children: [/* @__PURE__ */ p(nr, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ p(Qy, {
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
				/* @__PURE__ */ m("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ p(Vy, { children: "Status" }), /* @__PURE__ */ m(tw, {
						value: e.status,
						onValueChange: (n) => t({
							...e,
							status: n
						}),
						children: [/* @__PURE__ */ p(iw, { children: /* @__PURE__ */ p(rw, { placeholder: "Semua status" }) }), /* @__PURE__ */ m(sw, { children: [
							/* @__PURE__ */ p(lw, {
								value: "all",
								children: "Semua status"
							}),
							/* @__PURE__ */ p(lw, {
								value: "draft",
								children: "Draft"
							}),
							/* @__PURE__ */ p(lw, {
								value: "pending",
								children: "Menunggu verifikasi"
							}),
							/* @__PURE__ */ p(lw, {
								value: "revised",
								children: "Perlu revisi"
							}),
							/* @__PURE__ */ p(lw, {
								value: "approved",
								children: "Disetujui"
							})
						] })]
					})]
				}),
				/* @__PURE__ */ m("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ p(Vy, { children: "Unit Kerja" }), /* @__PURE__ */ m(tw, {
						value: e.unitKerja,
						onValueChange: (n) => t({
							...e,
							unitKerja: n
						}),
						children: [/* @__PURE__ */ p(iw, { children: /* @__PURE__ */ p(rw, { placeholder: "Semua unit kerja" }) }), /* @__PURE__ */ m(sw, { children: [
							/* @__PURE__ */ p(lw, {
								value: "all",
								children: "Semua unit kerja"
							}),
							/* @__PURE__ */ p(lw, {
								value: "ipds",
								children: "IPDS"
							}),
							/* @__PURE__ */ p(lw, {
								value: "sosial",
								children: "Statistik Sosial"
							}),
							/* @__PURE__ */ p(lw, {
								value: "distribusi",
								children: "Statistik Distribusi"
							}),
							/* @__PURE__ */ p(lw, {
								value: "produksi",
								children: "Statistik Produksi"
							})
						] })]
					})]
				})
			]
		}), /* @__PURE__ */ p("div", {
			className: "mt-4 flex justify-end",
			children: /* @__PURE__ */ p(pi, {
				variant: "outline",
				onClick: n,
				children: "Reset filter"
			})
		})]
	});
}
//#endregion
//#region src/components/ui/bps-form-section.tsx
function EO({ title: e, description: t, requiredCount: n, completedCount: r, action: i, className: a, children: o, ...s }) {
	let c = typeof n == "number" && typeof r == "number" ? `${r}/${n} field terisi` : null;
	return /* @__PURE__ */ m("section", {
		className: H("rounded-lg border bg-card p-6 space-y-4", a),
		...s,
		children: [
			/* @__PURE__ */ m("div", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ m("div", {
					className: "space-y-1",
					children: [
						/* @__PURE__ */ p("h3", {
							className: "text-base font-semibold text-foreground",
							children: e
						}),
						t ? /* @__PURE__ */ p("p", {
							className: "text-sm text-muted-foreground",
							children: t
						}) : null,
						c ? /* @__PURE__ */ p("p", {
							className: "text-xs text-muted-foreground",
							children: c
						}) : null
					]
				}), i ? /* @__PURE__ */ p("div", {
					className: "shrink-0",
					children: i
				}) : null]
			}),
			/* @__PURE__ */ p(_w, {}),
			/* @__PURE__ */ p("div", {
				className: "space-y-4",
				children: o
			})
		]
	});
}
//#endregion
//#region src/components/ui/bps-kpi-card.tsx
function DO({ title: e, value: t, helper: n, icon: r, className: i, ...a }) {
	return /* @__PURE__ */ m(kc, {
		className: H("border-l-4 border-l-primary", i),
		...a,
		children: [/* @__PURE__ */ p(Ac, {
			className: "pb-2",
			children: /* @__PURE__ */ m(jc, {
				className: "flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground",
				children: [r, e]
			})
		}), /* @__PURE__ */ m(Nc, { children: [/* @__PURE__ */ p("div", {
			className: "numeric text-2xl font-bold",
			children: t
		}), n ? /* @__PURE__ */ p("p", {
			className: "mt-1 text-xs text-muted-foreground",
			children: n
		}) : null] })]
	});
}
//#endregion
//#region src/components/ui/bps-page-header.tsx
function OO({ title: e, description: t, action: n, className: r, ...i }) {
	return /* @__PURE__ */ m("div", {
		className: H("flex flex-col gap-3 border-b pb-4 md:flex-row md:items-end md:justify-between", r),
		...i,
		children: [/* @__PURE__ */ m("div", { children: [/* @__PURE__ */ p("h1", {
			className: "h2 text-foreground",
			children: e
		}), t ? /* @__PURE__ */ p("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: t
		}) : null] }), n ? /* @__PURE__ */ p("div", {
			className: "shrink-0",
			children: n
		}) : null]
	});
}
//#endregion
//#region src/components/ui/bps-performance-card.tsx
var kO = new Intl.NumberFormat("id-ID"), AO = fr("relative overflow-hidden transition-shadow duration-200 hover:shadow-md", {
	variants: { variant: {
		default: "border bg-card",
		glass: "border-white/40 bg-white/60 shadow-sm backdrop-blur-md",
		gradient: "border-l-4 border-l-primary bg-card"
	} },
	defaultVariants: { variant: "default" }
});
function jO(e) {
	return typeof e == "number" ? kO.format(e) : e;
}
function MO({ data: e, className: t }) {
	if (e.length < 2) return null;
	let n = Math.min(...e), r = Math.max(...e) - n || 1, i = 120 / (e.length - 1), a = e.map((e, t) => {
		let a = t * i, o = 36 - (e - n) / r * 36;
		return `${a.toFixed(2)},${o.toFixed(2)}`;
	}).join(" ");
	return /* @__PURE__ */ p("svg", {
		viewBox: "0 0 120 36",
		preserveAspectRatio: "none",
		className: H("h-9 w-full text-primary", t),
		role: "presentation",
		"aria-hidden": "true",
		children: /* @__PURE__ */ p("polyline", {
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			points: a
		})
	});
}
function NO({ title: e, value: t, unit: n, target: r, delta: i, trend: a, icon: o, variant: s, loading: c, className: l, ...u }) {
	if (c) return /* @__PURE__ */ m(kc, {
		className: H(AO({ variant: s }), l),
		...u,
		children: [/* @__PURE__ */ p(Ac, {
			className: "pb-2",
			children: /* @__PURE__ */ p(kw, { className: "h-3 w-24" })
		}), /* @__PURE__ */ m(Nc, {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ p(kw, { className: "h-8 w-32" }),
				/* @__PURE__ */ p(kw, { className: "h-4 w-20" }),
				/* @__PURE__ */ p(kw, { className: "h-9 w-full" })
			]
		})]
	});
	let d = typeof t == "number" && typeof r == "number" && r > 0 ? Math.min(Math.round(t / r * 100), 999) : null, f = i?.direction === "up", h = f ? Bn : zn;
	return /* @__PURE__ */ m(kc, {
		className: H(AO({ variant: s }), l),
		...u,
		children: [
			s === "gradient" ? /* @__PURE__ */ p("div", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-br from-primary/10 to-transparent"
			}) : null,
			/* @__PURE__ */ p(Ac, {
				className: "relative flex flex-row items-start justify-between space-y-0 pb-2",
				children: /* @__PURE__ */ m(jc, {
					className: "flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground",
					children: [o ? /* @__PURE__ */ p(o, {
						className: "h-3.5 w-3.5",
						"aria-hidden": "true"
					}) : null, e]
				})
			}),
			/* @__PURE__ */ m(Nc, {
				className: "relative space-y-3",
				children: [
					/* @__PURE__ */ m("div", {
						className: "flex items-baseline gap-2",
						children: [/* @__PURE__ */ p("span", {
							className: "text-3xl font-bold tabular-nums text-foreground",
							children: jO(t)
						}), n ? /* @__PURE__ */ p("span", {
							className: "text-sm font-medium text-muted-foreground",
							children: n
						}) : null]
					}),
					i ? /* @__PURE__ */ m("div", {
						className: H("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium", f ? "bg-feedback-success-bg text-feedback-success" : "bg-feedback-danger-bg text-feedback-danger"),
						children: [
							/* @__PURE__ */ p(h, {
								className: "h-3 w-3",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ m("span", {
								className: "tabular-nums",
								children: [kO.format(i.value), "%"]
							}),
							/* @__PURE__ */ p("span", {
								className: "text-muted-foreground",
								children: "·"
							}),
							/* @__PURE__ */ p("span", {
								className: "text-muted-foreground",
								children: i.period
							})
						]
					}) : null,
					d !== null && typeof r == "number" ? /* @__PURE__ */ m("p", {
						className: "text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ m("span", {
								className: "font-medium tabular-nums text-foreground",
								children: [d, "%"]
							}),
							" dari target ",
							kO.format(r)
						]
					}) : null,
					a && a.length > 1 ? /* @__PURE__ */ p(MO, { data: a }) : null
				]
			})
		]
	});
}
//#endregion
//#region src/components/ui/bps-progress-audit.tsx
function PO({ totalChecklist: e, completedChecklist: t }) {
	let n = Math.max(e, 1), r = Math.min(Math.round(t / n * 100), 100);
	return /* @__PURE__ */ m("div", {
		className: "rounded-lg border bg-card p-4 space-y-2",
		children: [
			/* @__PURE__ */ p("p", {
				className: "text-sm font-medium text-foreground",
				children: "Progress Kelengkapan Dokumen"
			}),
			/* @__PURE__ */ p(ax, { value: r }),
			/* @__PURE__ */ m("p", {
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
//#region src/components/ui/bps-review-timeline.tsx
function FO({ items: e, className: t, ...n }) {
	return /* @__PURE__ */ m("div", {
		className: H("rounded-lg border bg-card p-4", t),
		...n,
		children: [/* @__PURE__ */ p("h3", {
			className: "mb-4 text-base font-semibold text-foreground",
			children: "Timeline Review Dokumen"
		}), /* @__PURE__ */ p("ol", {
			className: "space-y-4",
			children: e.map((e) => /* @__PURE__ */ m("li", {
				className: "relative pl-6",
				children: [/* @__PURE__ */ p("span", { className: "absolute left-0 top-2 h-2.5 w-2.5 rounded-full bg-primary" }), /* @__PURE__ */ m("div", {
					className: "space-y-1 rounded-md border bg-background p-3",
					children: [
						/* @__PURE__ */ m("div", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ m("p", {
								className: "text-sm font-medium text-foreground",
								children: [
									e.actor,
									" - ",
									e.role
								]
							}), /* @__PURE__ */ p(bT, {
								variant: e.status,
								children: e.status
							})]
						}),
						/* @__PURE__ */ p("p", {
							className: "text-sm text-muted-foreground",
							children: e.note
						}),
						/* @__PURE__ */ p("p", {
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
//#region src/components/ui/bps-validation-summary.tsx
function IO({ items: e, onNavigate: t, className: n, ...r }) {
	return e.length === 0 ? /* @__PURE__ */ p("div", {
		className: H("rounded-lg border border-feedback-success/30 bg-feedback-success-bg p-4", n),
		...r,
		children: /* @__PURE__ */ p("p", {
			className: "text-sm font-medium text-feedback-success",
			children: "Semua validasi terpenuhi."
		})
	}) : /* @__PURE__ */ p("div", {
		className: H("rounded-lg border border-feedback-danger/30 bg-feedback-danger-bg p-4", n),
		...r,
		children: /* @__PURE__ */ m("div", {
			className: "flex items-start gap-2",
			children: [/* @__PURE__ */ p(Yn, { className: "mt-0.5 h-4 w-4 text-feedback-danger" }), /* @__PURE__ */ m("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ m("p", {
					className: "text-sm font-semibold text-foreground",
					children: [
						"Terdapat ",
						e.length,
						" validasi yang perlu diperbaiki."
					]
				}), /* @__PURE__ */ p("ul", {
					className: "space-y-1",
					children: e.map((e) => /* @__PURE__ */ p("li", { children: /* @__PURE__ */ m("button", {
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
function LO({ className: e }) {
	return /* @__PURE__ */ m("svg", {
		viewBox: "0 0 200 160",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		className: e,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ p("line", {
				x1: "0",
				y1: "80",
				x2: "200",
				y2: "80",
				stroke: "hsl(var(--border-subtle))",
				strokeWidth: "1"
			}),
			/* @__PURE__ */ p("line", {
				x1: "100",
				y1: "0",
				x2: "100",
				y2: "160",
				stroke: "hsl(var(--border-subtle))",
				strokeWidth: "1"
			}),
			/* @__PURE__ */ p("rect", {
				x: "60",
				y: "50",
				width: "70",
				height: "85",
				rx: "3",
				fill: "hsl(var(--warm-100-hsl))",
				stroke: "hsl(var(--border-default))",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ p("rect", {
				x: "55",
				y: "44",
				width: "70",
				height: "85",
				rx: "3",
				fill: "hsl(var(--surface-raised))",
				stroke: "hsl(var(--border-default))",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ p("rect", {
				x: "50",
				y: "38",
				width: "70",
				height: "85",
				rx: "3",
				fill: "hsl(var(--surface-raised))",
				stroke: "hsl(var(--border-strong))",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ p("line", {
				x1: "62",
				y1: "58",
				x2: "108",
				y2: "58",
				stroke: "hsl(var(--border-default))",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ p("line", {
				x1: "62",
				y1: "68",
				x2: "100",
				y2: "68",
				stroke: "hsl(var(--border-default))",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ p("line", {
				x1: "62",
				y1: "78",
				x2: "104",
				y2: "78",
				stroke: "hsl(var(--border-default))",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ p("line", {
				x1: "62",
				y1: "88",
				x2: "95",
				y2: "88",
				stroke: "hsl(var(--border-default))",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ p("circle", {
				cx: "152",
				cy: "36",
				r: "12",
				fill: "hsl(var(--amber-100))"
			}),
			/* @__PURE__ */ p("circle", {
				cx: "152",
				cy: "36",
				r: "6",
				fill: "hsl(var(--amber-400))"
			})
		]
	});
}
function RO({ className: e }) {
	return /* @__PURE__ */ m("svg", {
		viewBox: "0 0 200 160",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		className: e,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ p("line", {
				x1: "0",
				y1: "80",
				x2: "200",
				y2: "80",
				stroke: "hsl(var(--border-subtle))",
				strokeWidth: "1"
			}),
			/* @__PURE__ */ p("circle", {
				cx: "90",
				cy: "72",
				r: "38",
				fill: "hsl(var(--surface-raised))",
				stroke: "hsl(var(--border-strong))",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ p("circle", {
				cx: "90",
				cy: "72",
				r: "24",
				fill: "hsl(var(--warm-50-hsl))"
			}),
			/* @__PURE__ */ p("line", {
				x1: "120",
				y1: "101",
				x2: "150",
				y2: "130",
				stroke: "hsl(var(--border-strong))",
				strokeWidth: "3",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ p("line", {
				x1: "80",
				y1: "65",
				x2: "100",
				y2: "65",
				stroke: "hsl(var(--border-default))",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ p("line", {
				x1: "80",
				y1: "73",
				x2: "95",
				y2: "73",
				stroke: "hsl(var(--border-default))",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ p("circle", {
				cx: "148",
				cy: "128",
				r: "8",
				fill: "hsl(var(--amber-400))"
			})
		]
	});
}
function zO({ className: e }) {
	return /* @__PURE__ */ m("svg", {
		viewBox: "0 0 200 160",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		className: e,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ p("line", {
				x1: "0",
				y1: "80",
				x2: "200",
				y2: "80",
				stroke: "hsl(var(--border-subtle))",
				strokeWidth: "1"
			}),
			/* @__PURE__ */ p("rect", {
				x: "60",
				y: "35",
				width: "80",
				height: "90",
				rx: "4",
				fill: "hsl(var(--surface-raised))",
				stroke: "hsl(var(--crimson-300))",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ p("rect", {
				x: "60",
				y: "35",
				width: "80",
				height: "24",
				rx: "4",
				fill: "hsl(var(--crimson-50))"
			}),
			/* @__PURE__ */ p("rect", {
				x: "60",
				y: "47",
				width: "80",
				height: "12",
				fill: "hsl(var(--crimson-50))"
			}),
			/* @__PURE__ */ p("line", {
				x1: "95",
				y1: "80",
				x2: "105",
				y2: "90",
				stroke: "hsl(var(--crimson-600))",
				strokeWidth: "2.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ p("line", {
				x1: "105",
				y1: "80",
				x2: "95",
				y2: "90",
				stroke: "hsl(var(--crimson-600))",
				strokeWidth: "2.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ p("circle", {
				cx: "100",
				cy: "105",
				r: "3",
				fill: "hsl(var(--crimson-400))"
			}),
			/* @__PURE__ */ p("line", {
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
var BO = {
	empty: LO,
	search: RO,
	error: zO
};
function VO({ illustration: e = "empty", title: t, description: n, action: r, secondaryAction: i, className: a, compact: o = !1 }) {
	let s = typeof e == "string" ? BO[e] : null;
	return /* @__PURE__ */ m("div", {
		className: H("flex flex-col items-center justify-center text-center", o ? "gap-3 py-8 px-4" : "gap-4 py-16 px-6", a),
		children: [
			s ? /* @__PURE__ */ p(s, { className: H(o ? "w-28 h-24" : "w-40 h-32") }) : e,
			/* @__PURE__ */ m("div", {
				className: "space-y-1.5 max-w-sm",
				children: [/* @__PURE__ */ p("h3", {
					className: H("font-semibold text-content-primary", o ? "text-body-sm" : "text-h3"),
					children: t
				}), n && /* @__PURE__ */ p("p", {
					className: H("text-content-secondary", o ? "text-caption" : "text-body-sm"),
					children: n
				})]
			}),
			(r || i) && /* @__PURE__ */ m("div", {
				className: "flex items-center gap-2 flex-wrap justify-center",
				children: [r && /* @__PURE__ */ p(pi, {
					variant: r.variant ?? "default",
					size: o ? "sm" : "default",
					onClick: r.onClick,
					children: r.label
				}), i && /* @__PURE__ */ p(pi, {
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
export { or as Accordion, lr as AccordionContent, sr as AccordionItem, cr as AccordionTrigger, hr as Alert, _r as AlertDescription, gr as AlertTitle, $r as Avatar, ti as AvatarFallback, ni as AvatarGroup, ei as AvatarImage, ii as Badge, yO as BpsAppTopbar, xO as BpsBulkActionBar, vO as BpsCombobox, bO as BpsConfirmActionDialog, SO as BpsDataStatePanel, CO as BpsDataTable, wO as BpsDatePicker, TO as BpsFilterBar, EO as BpsFormSection, DO as BpsKpiCard, OO as BpsPageHeader, NO as BpsPerformanceCard, PO as BpsProgressAudit, FO as BpsReviewTimeline, IO as BpsValidationSummary, ai as Breadcrumb, di as BreadcrumbEllipsis, si as BreadcrumbItem, ci as BreadcrumbLink, oi as BreadcrumbList, li as BreadcrumbPage, ui as BreadcrumbSeparator, pi as Button, Dc as Calendar, kc as Card, Nc as CardContent, Mc as CardDescription, Pc as CardFooter, Ac as CardHeader, jc as CardTitle, $c as Checkbox, Yf as Command, Xf as CommandDialog, $f as CommandEmpty, ep as CommandGroup, Zf as CommandInput, np as CommandItem, Qf as CommandList, tp as CommandSeparator, rp as CommandShortcut, zf as Dialog, Hf as DialogClose, Wf as DialogContent, Jf as DialogDescription, Kf as DialogFooter, Gf as DialogHeader, Uf as DialogOverlay, Vf as DialogPortal, qf as DialogTitle, Bf as DialogTrigger, Vv as DropdownMenu, Zv as DropdownMenuCheckboxItem, Yv as DropdownMenuContent, Uv as DropdownMenuGroup, Xv as DropdownMenuItem, $v as DropdownMenuLabel, Wv as DropdownMenuPortal, Kv as DropdownMenuRadioGroup, Qv as DropdownMenuRadioItem, ey as DropdownMenuSeparator, ty as DropdownMenuShortcut, Gv as DropdownMenuSub, Jv as DropdownMenuSubContent, qv as DropdownMenuSubTrigger, Hv as DropdownMenuTrigger, VO as EmptyState, Hy as Form, Yy as FormControl, Xy as FormDescription, Wy as FormField, qy as FormItem, Jy as FormLabel, Zy as FormMessage, Qy as Input, Vy as Label, $y as Pagination, eb as PaginationContent, ab as PaginationEllipsis, tb as PaginationItem, nb as PaginationLink, ib as PaginationNext, rb as PaginationPrevious, Ib as Popover, Rb as PopoverContent, Lb as PopoverTrigger, ax as Progress, Nx as RadioGroup, Px as RadioGroupItem, xS as ScrollArea, SS as ScrollBar, tw as Select, sw as SelectContent, nw as SelectGroup, lw as SelectItem, cw as SelectLabel, ow as SelectScrollDownButton, aw as SelectScrollUpButton, uw as SelectSeparator, iw as SelectTrigger, rw as SelectValue, _w as Separator, vw as Sheet, bw as SheetClose, ww as SheetContent, Ow as SheetDescription, Ew as SheetFooter, Tw as SheetHeader, Sw as SheetOverlay, xw as SheetPortal, Dw as SheetTitle, yw as SheetTrigger, kw as Skeleton, gT as Slider, vT as Spinner, bT as StatusBadge, PT as Switch, FT as Table, LT as TableBody, HT as TableCaption, VT as TableCell, RT as TableFooter, BT as TableHead, IT as TableHeader, zT as TableRow, cE as Tabs, dE as TabsContent, lE as TabsList, uE as TabsTrigger, fE as Textarea, dD as Toast, fD as ToastAction, pD as ToastClose, hD as ToastDescription, cD as ToastProvider, mD as ToastTitle, lD as ToastViewport, OD as Toaster, hO as Tooltip, _O as TooltipContent, mO as TooltipProvider, gO as TooltipTrigger, fi as buttonVariants, H as cn, Gy as useFormField, DD as useToast };

//# sourceMappingURL=index.js.map