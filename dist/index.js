import { jsx as u, jsxs as R, Fragment as ze } from "react/jsx-runtime";
import * as l from "react";
import P, { forwardRef as sc, createElement as Qo, createContext as Ch, useContext as Nh, useCallback as Ie, useRef as ir, useLayoutEffect as ic, useState as hr, useEffect as Eh, useMemo as cr } from "react";
import * as Tn from "react-dom";
import kh from "react-dom";
function cc(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = cc(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function lc() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = cc(e)) && (r && (r += " "), r += t);
  return r;
}
const Ma = "-", Ph = (e) => {
  const t = Mh(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (s) => {
      const i = s.split(Ma);
      return i[0] === "" && i.length !== 1 && i.shift(), dc(i, t) || Rh(s);
    },
    getConflictingClassGroupIds: (s, i) => {
      const c = n[s] || [];
      return i && r[s] ? [...c, ...r[s]] : c;
    }
  };
}, dc = (e, t) => {
  var s;
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? dc(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const a = e.join(Ma);
  return (s = t.validators.find(({
    validator: i
  }) => i(a))) == null ? void 0 : s.classGroupId;
}, Xs = /^\[(.+)\]$/, Rh = (e) => {
  if (Xs.test(e)) {
    const t = Xs.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, Mh = (e) => {
  const {
    theme: t,
    prefix: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return _h(Object.entries(e.classGroups), n).forEach(([a, s]) => {
    Jo(s, r, a, t);
  }), r;
}, Jo = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const a = o === "" ? t : Zs(t, o);
      a.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (Th(o)) {
        Jo(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([a, s]) => {
      Jo(s, Zs(t, a), n, r);
    });
  });
}, Zs = (e, t) => {
  let n = e;
  return t.split(Ma).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, Th = (e) => e.isThemeGetter, _h = (e, t) => t ? e.map(([n, r]) => {
  const o = r.map((a) => typeof a == "string" ? t + a : typeof a == "object" ? Object.fromEntries(Object.entries(a).map(([s, i]) => [t + s, i])) : a);
  return [n, o];
}) : e, Dh = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  const o = (a, s) => {
    n.set(a, s), t++, t > e && (t = 0, r = n, n = /* @__PURE__ */ new Map());
  };
  return {
    get(a) {
      let s = n.get(a);
      if (s !== void 0)
        return s;
      if ((s = r.get(a)) !== void 0)
        return o(a, s), s;
    },
    set(a, s) {
      n.has(a) ? n.set(a, s) : o(a, s);
    }
  };
}, uc = "!", Oh = (e) => {
  const {
    separator: t,
    experimentalParseClassName: n
  } = e, r = t.length === 1, o = t[0], a = t.length, s = (i) => {
    const c = [];
    let d = 0, m = 0, f;
    for (let v = 0; v < i.length; v++) {
      let w = i[v];
      if (d === 0) {
        if (w === o && (r || i.slice(v, v + a) === t)) {
          c.push(i.slice(m, v)), m = v + a;
          continue;
        }
        if (w === "/") {
          f = v;
          continue;
        }
      }
      w === "[" ? d++ : w === "]" && d--;
    }
    const p = c.length === 0 ? i : i.substring(m), h = p.startsWith(uc), b = h ? p.substring(1) : p, g = f && f > m ? f - m : void 0;
    return {
      modifiers: c,
      hasImportantModifier: h,
      baseClassName: b,
      maybePostfixModifierPosition: g
    };
  };
  return n ? (i) => n({
    className: i,
    parseClassName: s
  }) : s;
}, Ah = (e) => {
  if (e.length <= 1)
    return e;
  const t = [];
  let n = [];
  return e.forEach((r) => {
    r[0] === "[" ? (t.push(...n.sort(), r), n = []) : n.push(r);
  }), t.push(...n.sort()), t;
}, Ih = (e) => ({
  cache: Dh(e.cacheSize),
  parseClassName: Oh(e),
  ...Ph(e)
}), $h = /\s+/, Wh = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o
  } = t, a = [], s = e.trim().split($h);
  let i = "";
  for (let c = s.length - 1; c >= 0; c -= 1) {
    const d = s[c], {
      modifiers: m,
      hasImportantModifier: f,
      baseClassName: p,
      maybePostfixModifierPosition: h
    } = n(d);
    let b = !!h, g = r(b ? p.substring(0, h) : p);
    if (!g) {
      if (!b) {
        i = d + (i.length > 0 ? " " + i : i);
        continue;
      }
      if (g = r(p), !g) {
        i = d + (i.length > 0 ? " " + i : i);
        continue;
      }
      b = !1;
    }
    const v = Ah(m).join(":"), w = f ? v + uc : v, y = w + g;
    if (a.includes(y))
      continue;
    a.push(y);
    const x = o(g, b);
    for (let S = 0; S < x.length; ++S) {
      const N = x[S];
      a.push(w + N);
    }
    i = d + (i.length > 0 ? " " + i : i);
  }
  return i;
};
function Fh() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = fc(t)) && (r && (r += " "), r += n);
  return r;
}
const fc = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = fc(e[r])) && (n && (n += " "), n += t);
  return n;
};
function Lh(e, ...t) {
  let n, r, o, a = s;
  function s(c) {
    const d = t.reduce((m, f) => f(m), e());
    return n = Ih(d), r = n.cache.get, o = n.cache.set, a = i, i(c);
  }
  function i(c) {
    const d = r(c);
    if (d)
      return d;
    const m = Wh(c, n);
    return o(c, m), m;
  }
  return function() {
    return a(Fh.apply(null, arguments));
  };
}
const fe = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, mc = /^\[(?:([a-z-]+):)?(.+)\]$/i, Bh = /^\d+\/\d+$/, Vh = /* @__PURE__ */ new Set(["px", "full", "screen"]), Hh = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Yh = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, zh = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, jh = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Gh = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, at = (e) => Xt(e) || Vh.has(e) || Bh.test(e), ft = (e) => sn(e, "length", eg), Xt = (e) => !!e && !Number.isNaN(Number(e)), ko = (e) => sn(e, "number", Xt), hn = (e) => !!e && Number.isInteger(Number(e)), Uh = (e) => e.endsWith("%") && Xt(e.slice(0, -1)), re = (e) => mc.test(e), mt = (e) => Hh.test(e), Kh = /* @__PURE__ */ new Set(["length", "size", "percentage"]), qh = (e) => sn(e, Kh, pc), Xh = (e) => sn(e, "position", pc), Zh = /* @__PURE__ */ new Set(["image", "url"]), Qh = (e) => sn(e, Zh, ng), Jh = (e) => sn(e, "", tg), gn = () => !0, sn = (e, t, n) => {
  const r = mc.exec(e);
  return r ? r[1] ? typeof t == "string" ? r[1] === t : t.has(r[1]) : n(r[2]) : !1;
}, eg = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Yh.test(e) && !zh.test(e)
), pc = () => !1, tg = (e) => jh.test(e), ng = (e) => Gh.test(e), rg = () => {
  const e = fe("colors"), t = fe("spacing"), n = fe("blur"), r = fe("brightness"), o = fe("borderColor"), a = fe("borderRadius"), s = fe("borderSpacing"), i = fe("borderWidth"), c = fe("contrast"), d = fe("grayscale"), m = fe("hueRotate"), f = fe("invert"), p = fe("gap"), h = fe("gradientColorStops"), b = fe("gradientColorStopPositions"), g = fe("inset"), v = fe("margin"), w = fe("opacity"), y = fe("padding"), x = fe("saturate"), S = fe("scale"), N = fe("sepia"), C = fe("skew"), E = fe("space"), T = fe("translate"), D = () => ["auto", "contain", "none"], A = () => ["auto", "hidden", "clip", "visible", "scroll"], W = () => ["auto", re, t], $ = () => [re, t], z = () => ["", at, ft], O = () => ["auto", Xt, re], j = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], V = () => ["solid", "dashed", "dotted", "double", "none"], G = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], B = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], I = () => ["", "0", re], Z = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], Q = () => [Xt, re];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [gn],
      spacing: [at, ft],
      blur: ["none", "", mt, re],
      brightness: Q(),
      borderColor: [e],
      borderRadius: ["none", "", "full", mt, re],
      borderSpacing: $(),
      borderWidth: z(),
      contrast: Q(),
      grayscale: I(),
      hueRotate: Q(),
      invert: I(),
      gap: $(),
      gradientColorStops: [e],
      gradientColorStopPositions: [Uh, ft],
      inset: W(),
      margin: W(),
      opacity: Q(),
      padding: $(),
      saturate: Q(),
      scale: Q(),
      sepia: I(),
      skew: Q(),
      space: $(),
      translate: $()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", re]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [mt]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": Z()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": Z()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...j(), re]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: A()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": A()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": A()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: D()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": D()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": D()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [g]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [g]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [g]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [g]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [g]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [g]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [g]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [g]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [g]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", hn, re]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: W()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", re]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: I()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: I()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", hn, re]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [gn]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", hn, re]
        }, re]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": O()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": O()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [gn]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [hn, re]
        }, re]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": O()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": O()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", re]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", re]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [p]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [p]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [p]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...B()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...B(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...B(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [y]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [y]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [y]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [y]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [y]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [y]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [y]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [y]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [y]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [v]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [v]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [v]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [v]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [v]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [v]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [v]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [v]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [v]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [E]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [E]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", re, t]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [re, t, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [re, t, "none", "full", "min", "max", "fit", "prose", {
          screen: [mt]
        }, mt]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [re, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [re, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [re, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [re, t, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", mt, ft]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", ko]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [gn]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", re]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", Xt, ko]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", at, re]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", re]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", re]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [e]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [w]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [e]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [w]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...V(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", at, ft]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", at, re]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [e]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: $()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", re]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", re]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [w]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...j(), Xh]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", qh]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Qh]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [e]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [b]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [b]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [b]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [h]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [h]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [h]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [a]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [a]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [a]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [a]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [a]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [a]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [a]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [a]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [a]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [a]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [a]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [a]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [a]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [a]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [a]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [i]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [i]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [i]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [i]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [i]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [i]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [i]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [i]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [i]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [w]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...V(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [i]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [i]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [w]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: V()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [o]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [o]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [o]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [o]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [o]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [o]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [o]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [o]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [o]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [o]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...V()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [at, re]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [at, ft]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [e]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: z()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [e]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [w]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [at, ft]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [e]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", mt, Jh]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [gn]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [w]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...G(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": G()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [n]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [r]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [c]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", mt, re]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [d]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [m]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [f]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [x]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [N]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [n]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [r]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [c]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [d]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [m]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [f]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [w]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [x]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [N]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [s]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [s]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [s]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", re]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: Q()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", re]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: Q()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", re]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [S]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [S]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [S]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [hn, re]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [T]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [T]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [C]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [C]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", re]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", e]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", re]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [e]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": $()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": $()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": $()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": $()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": $()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": $()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": $()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": $()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": $()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": $()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": $()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": $()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": $()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": $()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": $()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": $()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": $()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": $()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", re]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [e, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [at, ft, ko]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [e, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}, og = /* @__PURE__ */ Lh(rg);
function k(...e) {
  return og(lc(e));
}
function ag(e, t) {
  const n = l.createContext(t), r = (a) => {
    const { children: s, ...i } = a, c = l.useMemo(() => i, Object.values(i));
    return /* @__PURE__ */ u(n.Provider, { value: c, children: s });
  };
  r.displayName = e + "Provider";
  function o(a) {
    const s = l.useContext(n);
    if (s) return s;
    if (t !== void 0) return t;
    throw new Error(`\`${a}\` must be used within \`${e}\``);
  }
  return [r, o];
}
function we(e, t = []) {
  let n = [];
  function r(a, s) {
    const i = l.createContext(s), c = n.length;
    n = [...n, s];
    const d = (f) => {
      var w;
      const { scope: p, children: h, ...b } = f, g = ((w = p == null ? void 0 : p[e]) == null ? void 0 : w[c]) || i, v = l.useMemo(() => b, Object.values(b));
      return /* @__PURE__ */ u(g.Provider, { value: v, children: h });
    };
    d.displayName = a + "Provider";
    function m(f, p) {
      var g;
      const h = ((g = p == null ? void 0 : p[e]) == null ? void 0 : g[c]) || i, b = l.useContext(h);
      if (b) return b;
      if (s !== void 0) return s;
      throw new Error(`\`${f}\` must be used within \`${a}\``);
    }
    return [d, m];
  }
  const o = () => {
    const a = n.map((s) => l.createContext(s));
    return function(i) {
      const c = (i == null ? void 0 : i[e]) || a;
      return l.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: c } }),
        [i, c]
      );
    };
  };
  return o.scopeName = e, [r, sg(o, ...t)];
}
function sg(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(a) {
      const s = r.reduce((i, { useScope: c, scopeName: d }) => {
        const f = c(a)[`__scope${d}`];
        return { ...i, ...f };
      }, {});
      return l.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function Qs(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function ke(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const a = Qs(o, t);
      return !n && typeof a == "function" && (n = !0), a;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const a = r[o];
          typeof a == "function" ? a() : Qs(e[o], null);
        }
      };
  };
}
function q(...e) {
  return l.useCallback(ke(...e), e);
}
// @__NO_SIDE_EFFECTS__
function Js(e) {
  const t = /* @__PURE__ */ ig(e), n = l.forwardRef((r, o) => {
    const { children: a, ...s } = r, i = l.Children.toArray(a), c = i.find(lg);
    if (c) {
      const d = c.props.children, m = i.map((f) => f === c ? l.Children.count(d) > 1 ? l.Children.only(null) : l.isValidElement(d) ? d.props.children : null : f);
      return /* @__PURE__ */ u(t, { ...s, ref: o, children: l.isValidElement(d) ? l.cloneElement(d, void 0, m) : null });
    }
    return /* @__PURE__ */ u(t, { ...s, ref: o, children: a });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function ig(e) {
  const t = l.forwardRef((n, r) => {
    const { children: o, ...a } = n;
    if (l.isValidElement(o)) {
      const s = ug(o), i = dg(a, o.props);
      return o.type !== l.Fragment && (i.ref = r ? ke(r, s) : s), l.cloneElement(o, i);
    }
    return l.Children.count(o) > 1 ? l.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var cg = Symbol("radix.slottable");
function lg(e) {
  return l.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === cg;
}
function dg(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], a = t[r];
    /^on[A-Z]/.test(r) ? o && a ? n[r] = (...i) => {
      const c = a(...i);
      return o(...i), c;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...a } : r === "className" && (n[r] = [o, a].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function ug(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function cn(e) {
  const t = e + "CollectionProvider", [n, r] = we(t), [o, a] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), s = (g) => {
    const { scope: v, children: w } = g, y = P.useRef(null), x = P.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ u(o, { scope: v, itemMap: x, collectionRef: y, children: w });
  };
  s.displayName = t;
  const i = e + "CollectionSlot", c = /* @__PURE__ */ Js(i), d = P.forwardRef(
    (g, v) => {
      const { scope: w, children: y } = g, x = a(i, w), S = q(v, x.collectionRef);
      return /* @__PURE__ */ u(c, { ref: S, children: y });
    }
  );
  d.displayName = i;
  const m = e + "CollectionItemSlot", f = "data-radix-collection-item", p = /* @__PURE__ */ Js(m), h = P.forwardRef(
    (g, v) => {
      const { scope: w, children: y, ...x } = g, S = P.useRef(null), N = q(v, S), C = a(m, w);
      return P.useEffect(() => (C.itemMap.set(S, { ref: S, ...x }), () => void C.itemMap.delete(S))), /* @__PURE__ */ u(p, { [f]: "", ref: N, children: y });
    }
  );
  h.displayName = m;
  function b(g) {
    const v = a(e + "CollectionConsumer", g);
    return P.useCallback(() => {
      const y = v.collectionRef.current;
      if (!y) return [];
      const x = Array.from(y.querySelectorAll(`[${f}]`));
      return Array.from(v.itemMap.values()).sort(
        (C, E) => x.indexOf(C.ref.current) - x.indexOf(E.ref.current)
      );
    }, [v.collectionRef, v.itemMap]);
  }
  return [
    { Provider: s, Slot: d, ItemSlot: h },
    b,
    r
  ];
}
function _(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e == null || e(o), n === !1 || !o.defaultPrevented)
      return t == null ? void 0 : t(o);
  };
}
var ge = globalThis != null && globalThis.document ? l.useLayoutEffect : () => {
}, fg = l[" useInsertionEffect ".trim().toString()] || ge;
function xe({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, a, s] = mg({
    defaultProp: t,
    onChange: n
  }), i = e !== void 0, c = i ? e : o;
  {
    const m = l.useRef(e !== void 0);
    l.useEffect(() => {
      const f = m.current;
      f !== i && console.warn(
        `${r} is changing from ${f ? "controlled" : "uncontrolled"} to ${i ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), m.current = i;
    }, [i, r]);
  }
  const d = l.useCallback(
    (m) => {
      var f;
      if (i) {
        const p = pg(m) ? m(e) : m;
        p !== e && ((f = s.current) == null || f.call(s, p));
      } else
        a(m);
    },
    [i, e, a, s]
  );
  return [c, d];
}
function mg({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = l.useState(e), o = l.useRef(n), a = l.useRef(t);
  return fg(() => {
    a.current = t;
  }, [t]), l.useEffect(() => {
    var s;
    o.current !== n && ((s = a.current) == null || s.call(a, n), o.current = n);
  }, [n, o]), [n, r, a];
}
function pg(e) {
  return typeof e == "function";
}
// @__NO_SIDE_EFFECTS__
function hg(e) {
  const t = /* @__PURE__ */ gg(e), n = l.forwardRef((r, o) => {
    const { children: a, ...s } = r, i = l.Children.toArray(a), c = i.find(bg);
    if (c) {
      const d = c.props.children, m = i.map((f) => f === c ? l.Children.count(d) > 1 ? l.Children.only(null) : l.isValidElement(d) ? d.props.children : null : f);
      return /* @__PURE__ */ u(t, { ...s, ref: o, children: l.isValidElement(d) ? l.cloneElement(d, void 0, m) : null });
    }
    return /* @__PURE__ */ u(t, { ...s, ref: o, children: a });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function gg(e) {
  const t = l.forwardRef((n, r) => {
    const { children: o, ...a } = n;
    if (l.isValidElement(o)) {
      const s = wg(o), i = yg(a, o.props);
      return o.type !== l.Fragment && (i.ref = r ? ke(r, s) : s), l.cloneElement(o, i);
    }
    return l.Children.count(o) > 1 ? l.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var vg = Symbol("radix.slottable");
function bg(e) {
  return l.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === vg;
}
function yg(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], a = t[r];
    /^on[A-Z]/.test(r) ? o && a ? n[r] = (...i) => {
      const c = a(...i);
      return o(...i), c;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...a } : r === "className" && (n[r] = [o, a].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function wg(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var xg = [
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
], L = xg.reduce((e, t) => {
  const n = /* @__PURE__ */ hg(`Primitive.${t}`), r = l.forwardRef((o, a) => {
    const { asChild: s, ...i } = o, c = s ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ u(c, { ...i, ref: a });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function Ta(e, t) {
  e && Tn.flushSync(() => e.dispatchEvent(t));
}
function Sg(e, t) {
  return l.useReducer((n, r) => t[n][r] ?? n, e);
}
var ve = (e) => {
  const { present: t, children: n } = e, r = Cg(t), o = typeof n == "function" ? n({ present: r.isPresent }) : l.Children.only(n), a = q(r.ref, Ng(o));
  return typeof n == "function" || r.isPresent ? l.cloneElement(o, { ref: a }) : null;
};
ve.displayName = "Presence";
function Cg(e) {
  const [t, n] = l.useState(), r = l.useRef(null), o = l.useRef(e), a = l.useRef("none"), s = e ? "mounted" : "unmounted", [i, c] = Sg(s, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return l.useEffect(() => {
    const d = Qn(r.current);
    a.current = i === "mounted" ? d : "none";
  }, [i]), ge(() => {
    const d = r.current, m = o.current;
    if (m !== e) {
      const p = a.current, h = Qn(d);
      e ? c("MOUNT") : h === "none" || (d == null ? void 0 : d.display) === "none" ? c("UNMOUNT") : c(m && p !== h ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, c]), ge(() => {
    if (t) {
      let d;
      const m = t.ownerDocument.defaultView ?? window, f = (h) => {
        const g = Qn(r.current).includes(CSS.escape(h.animationName));
        if (h.target === t && g && (c("ANIMATION_END"), !o.current)) {
          const v = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", d = m.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = v);
          });
        }
      }, p = (h) => {
        h.target === t && (a.current = Qn(r.current));
      };
      return t.addEventListener("animationstart", p), t.addEventListener("animationcancel", f), t.addEventListener("animationend", f), () => {
        m.clearTimeout(d), t.removeEventListener("animationstart", p), t.removeEventListener("animationcancel", f), t.removeEventListener("animationend", f);
      };
    } else
      c("ANIMATION_END");
  }, [t, c]), {
    isPresent: ["mounted", "unmountSuspended"].includes(i),
    ref: l.useCallback((d) => {
      r.current = d ? getComputedStyle(d) : null, n(d);
    }, [])
  };
}
function Qn(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function Ng(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Eg = l[" useId ".trim().toString()] || (() => {
}), kg = 0;
function he(e) {
  const [t, n] = l.useState(Eg());
  return ge(() => {
    n((r) => r ?? String(kg++));
  }, [e]), t ? `radix-${t}` : "";
}
var Or = "Collapsible", [Pg, hc] = we(Or), [Rg, _a] = Pg(Or), gc = l.forwardRef(
  (e, t) => {
    const {
      __scopeCollapsible: n,
      open: r,
      defaultOpen: o,
      disabled: a,
      onOpenChange: s,
      ...i
    } = e, [c, d] = xe({
      prop: r,
      defaultProp: o ?? !1,
      onChange: s,
      caller: Or
    });
    return /* @__PURE__ */ u(
      Rg,
      {
        scope: n,
        disabled: a,
        contentId: he(),
        open: c,
        onOpenToggle: l.useCallback(() => d((m) => !m), [d]),
        children: /* @__PURE__ */ u(
          L.div,
          {
            "data-state": Oa(c),
            "data-disabled": a ? "" : void 0,
            ...i,
            ref: t
          }
        )
      }
    );
  }
);
gc.displayName = Or;
var vc = "CollapsibleTrigger", bc = l.forwardRef(
  (e, t) => {
    const { __scopeCollapsible: n, ...r } = e, o = _a(vc, n);
    return /* @__PURE__ */ u(
      L.button,
      {
        type: "button",
        "aria-controls": o.contentId,
        "aria-expanded": o.open || !1,
        "data-state": Oa(o.open),
        "data-disabled": o.disabled ? "" : void 0,
        disabled: o.disabled,
        ...r,
        ref: t,
        onClick: _(e.onClick, o.onOpenToggle)
      }
    );
  }
);
bc.displayName = vc;
var Da = "CollapsibleContent", yc = l.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = _a(Da, e.__scopeCollapsible);
    return /* @__PURE__ */ u(ve, { present: n || o.open, children: ({ present: a }) => /* @__PURE__ */ u(Mg, { ...r, ref: t, present: a }) });
  }
);
yc.displayName = Da;
var Mg = l.forwardRef((e, t) => {
  const { __scopeCollapsible: n, present: r, children: o, ...a } = e, s = _a(Da, n), [i, c] = l.useState(r), d = l.useRef(null), m = q(t, d), f = l.useRef(0), p = f.current, h = l.useRef(0), b = h.current, g = s.open || i, v = l.useRef(g), w = l.useRef(void 0);
  return l.useEffect(() => {
    const y = requestAnimationFrame(() => v.current = !1);
    return () => cancelAnimationFrame(y);
  }, []), ge(() => {
    const y = d.current;
    if (y) {
      w.current = w.current || {
        transitionDuration: y.style.transitionDuration,
        animationName: y.style.animationName
      }, y.style.transitionDuration = "0s", y.style.animationName = "none";
      const x = y.getBoundingClientRect();
      f.current = x.height, h.current = x.width, v.current || (y.style.transitionDuration = w.current.transitionDuration, y.style.animationName = w.current.animationName), c(r);
    }
  }, [s.open, r]), /* @__PURE__ */ u(
    L.div,
    {
      "data-state": Oa(s.open),
      "data-disabled": s.disabled ? "" : void 0,
      id: s.contentId,
      hidden: !g,
      ...a,
      ref: m,
      style: {
        "--radix-collapsible-content-height": p ? `${p}px` : void 0,
        "--radix-collapsible-content-width": b ? `${b}px` : void 0,
        ...e.style
      },
      children: g && o
    }
  );
});
function Oa(e) {
  return e ? "open" : "closed";
}
var Tg = gc, _g = bc, Dg = yc, Og = l.createContext(void 0);
function wt(e) {
  const t = l.useContext(Og);
  return e || t || "ltr";
}
var Ue = "Accordion", Ag = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"], [Aa, Ig, $g] = cn(Ue), [Ar] = we(Ue, [
  $g,
  hc
]), Ia = hc(), wc = P.forwardRef(
  (e, t) => {
    const { type: n, ...r } = e, o = r, a = r;
    return /* @__PURE__ */ u(Aa.Provider, { scope: e.__scopeAccordion, children: n === "multiple" ? /* @__PURE__ */ u(Bg, { ...a, ref: t }) : /* @__PURE__ */ u(Lg, { ...o, ref: t }) });
  }
);
wc.displayName = Ue;
var [xc, Wg] = Ar(Ue), [Sc, Fg] = Ar(
  Ue,
  { collapsible: !1 }
), Lg = P.forwardRef(
  (e, t) => {
    const {
      value: n,
      defaultValue: r,
      onValueChange: o = () => {
      },
      collapsible: a = !1,
      ...s
    } = e, [i, c] = xe({
      prop: n,
      defaultProp: r ?? "",
      onChange: o,
      caller: Ue
    });
    return /* @__PURE__ */ u(
      xc,
      {
        scope: e.__scopeAccordion,
        value: P.useMemo(() => i ? [i] : [], [i]),
        onItemOpen: c,
        onItemClose: P.useCallback(() => a && c(""), [a, c]),
        children: /* @__PURE__ */ u(Sc, { scope: e.__scopeAccordion, collapsible: a, children: /* @__PURE__ */ u(Cc, { ...s, ref: t }) })
      }
    );
  }
), Bg = P.forwardRef((e, t) => {
  const {
    value: n,
    defaultValue: r,
    onValueChange: o = () => {
    },
    ...a
  } = e, [s, i] = xe({
    prop: n,
    defaultProp: r ?? [],
    onChange: o,
    caller: Ue
  }), c = P.useCallback(
    (m) => i((f = []) => [...f, m]),
    [i]
  ), d = P.useCallback(
    (m) => i((f = []) => f.filter((p) => p !== m)),
    [i]
  );
  return /* @__PURE__ */ u(
    xc,
    {
      scope: e.__scopeAccordion,
      value: s,
      onItemOpen: c,
      onItemClose: d,
      children: /* @__PURE__ */ u(Sc, { scope: e.__scopeAccordion, collapsible: !0, children: /* @__PURE__ */ u(Cc, { ...a, ref: t }) })
    }
  );
}), [Vg, Ir] = Ar(Ue), Cc = P.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, disabled: r, dir: o, orientation: a = "vertical", ...s } = e, i = P.useRef(null), c = q(i, t), d = Ig(n), f = wt(o) === "ltr", p = _(e.onKeyDown, (h) => {
      var T;
      if (!Ag.includes(h.key)) return;
      const b = h.target, g = d().filter((D) => {
        var A;
        return !((A = D.ref.current) != null && A.disabled);
      }), v = g.findIndex((D) => D.ref.current === b), w = g.length;
      if (v === -1) return;
      h.preventDefault();
      let y = v;
      const x = 0, S = w - 1, N = () => {
        y = v + 1, y > S && (y = x);
      }, C = () => {
        y = v - 1, y < x && (y = S);
      };
      switch (h.key) {
        case "Home":
          y = x;
          break;
        case "End":
          y = S;
          break;
        case "ArrowRight":
          a === "horizontal" && (f ? N() : C());
          break;
        case "ArrowDown":
          a === "vertical" && N();
          break;
        case "ArrowLeft":
          a === "horizontal" && (f ? C() : N());
          break;
        case "ArrowUp":
          a === "vertical" && C();
          break;
      }
      const E = y % w;
      (T = g[E].ref.current) == null || T.focus();
    });
    return /* @__PURE__ */ u(
      Vg,
      {
        scope: n,
        disabled: r,
        direction: o,
        orientation: a,
        children: /* @__PURE__ */ u(Aa.Slot, { scope: n, children: /* @__PURE__ */ u(
          L.div,
          {
            ...s,
            "data-orientation": a,
            ref: c,
            onKeyDown: r ? void 0 : p
          }
        ) })
      }
    );
  }
), gr = "AccordionItem", [Hg, $a] = Ar(gr), Nc = P.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, value: r, ...o } = e, a = Ir(gr, n), s = Wg(gr, n), i = Ia(n), c = he(), d = r && s.value.includes(r) || !1, m = a.disabled || e.disabled;
    return /* @__PURE__ */ u(
      Hg,
      {
        scope: n,
        open: d,
        disabled: m,
        triggerId: c,
        children: /* @__PURE__ */ u(
          Tg,
          {
            "data-orientation": a.orientation,
            "data-state": Tc(d),
            ...i,
            ...o,
            ref: t,
            disabled: m,
            open: d,
            onOpenChange: (f) => {
              f ? s.onItemOpen(r) : s.onItemClose(r);
            }
          }
        )
      }
    );
  }
);
Nc.displayName = gr;
var Ec = "AccordionHeader", kc = P.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = Ir(Ue, n), a = $a(Ec, n);
    return /* @__PURE__ */ u(
      L.h3,
      {
        "data-orientation": o.orientation,
        "data-state": Tc(a.open),
        "data-disabled": a.disabled ? "" : void 0,
        ...r,
        ref: t
      }
    );
  }
);
kc.displayName = Ec;
var ea = "AccordionTrigger", Pc = P.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = Ir(Ue, n), a = $a(ea, n), s = Fg(ea, n), i = Ia(n);
    return /* @__PURE__ */ u(Aa.ItemSlot, { scope: n, children: /* @__PURE__ */ u(
      _g,
      {
        "aria-disabled": a.open && !s.collapsible || void 0,
        "data-orientation": o.orientation,
        id: a.triggerId,
        ...i,
        ...r,
        ref: t
      }
    ) });
  }
);
Pc.displayName = ea;
var Rc = "AccordionContent", Mc = P.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = Ir(Ue, n), a = $a(Rc, n), s = Ia(n);
    return /* @__PURE__ */ u(
      Dg,
      {
        role: "region",
        "aria-labelledby": a.triggerId,
        "data-orientation": o.orientation,
        ...s,
        ...r,
        ref: t,
        style: {
          "--radix-accordion-content-height": "var(--radix-collapsible-content-height)",
          "--radix-accordion-content-width": "var(--radix-collapsible-content-width)",
          ...e.style
        }
      }
    );
  }
);
Mc.displayName = Rc;
function Tc(e) {
  return e ? "open" : "closed";
}
var Yg = wc, zg = Nc, jg = kc, _c = Pc, Dc = Mc;
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gg = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Oc = (...e) => e.filter((t, n, r) => !!t && r.indexOf(t) === n).join(" ");
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Ug = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kg = sc(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: o = "",
    children: a,
    iconNode: s,
    ...i
  }, c) => Qo(
    "svg",
    {
      ref: c,
      ...Ug,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: Oc("lucide", o),
      ...i
    },
    [
      ...s.map(([d, m]) => Qo(d, m)),
      ...Array.isArray(a) ? a : [a]
    ]
  )
);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const be = (e, t) => {
  const n = sc(
    ({ className: r, ...o }, a) => Qo(Kg, {
      ref: a,
      iconNode: t,
      className: Oc(`lucide-${Gg(e)}`, r),
      ...o
    })
  );
  return n.displayName = `${e}`, n;
};
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qg = be("ArrowDownRight", [
  ["path", { d: "m7 7 10 10", key: "1fmybs" }],
  ["path", { d: "M17 7v10H7", key: "6fjiku" }]
]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xg = be("ArrowUpRight", [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zg = be("Bell", [
  ["path", { d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9", key: "1qo2s2" }],
  ["path", { d: "M10.3 21a1.94 1.94 0 0 0 3.4 0", key: "qgo35s" }]
]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qg = be("Calendar", [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $r = be("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wr = be("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ac = be("ChevronLeft", [
  ["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]
]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fr = be("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jg = be("ChevronUp", [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ev = be("ChevronsUpDown", [
  ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
  ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wa = be("CircleAlert", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tv = be("CircleCheck", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ic = be("Circle", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $c = be("Ellipsis", [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
  ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ei = be("Info", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nv = be("LoaderCircle", [
  ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]
]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rv = be("Minus", [["path", { d: "M5 12h14", key: "1ays0h" }]]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wc = be("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ov = be("TriangleAlert", [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const av = be("User", [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lr = be("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]), PM = Yg, sv = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  zg,
  {
    ref: n,
    className: k("border-b border-border-subtle", e),
    ...t
  }
));
sv.displayName = "AccordionItem";
const iv = l.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ u(jg, { className: "flex", children: /* @__PURE__ */ R(
  _c,
  {
    ref: r,
    className: k(
      "flex flex-1 items-center justify-between py-4 text-body-sm font-semibold text-content-primary",
      "transition-all duration-fast hover:text-content-brand",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm",
      "[&[data-state=open]>svg]:rotate-180",
      e
    ),
    ...n,
    children: [
      t,
      /* @__PURE__ */ u(
        Wr,
        {
          className: "h-4 w-4 shrink-0 text-content-secondary transition-transform duration-base ease-out",
          "aria-hidden": "true"
        }
      )
    ]
  }
) }));
iv.displayName = _c.displayName;
const cv = l.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ u(
  Dc,
  {
    ref: r,
    className: "overflow-hidden text-body-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...n,
    children: /* @__PURE__ */ u("div", { className: k("pb-4 pt-0 text-content-secondary", e), children: t })
  }
));
cv.displayName = Dc.displayName;
const ti = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, ni = lc, Fe = (e, t) => (n) => {
  var r;
  if ((t == null ? void 0 : t.variants) == null) return ni(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: o, defaultVariants: a } = t, s = Object.keys(o).map((d) => {
    const m = n == null ? void 0 : n[d], f = a == null ? void 0 : a[d];
    if (m === null) return null;
    const p = ti(m) || ti(f);
    return o[d][p];
  }), i = n && Object.entries(n).reduce((d, m) => {
    let [f, p] = m;
    return p === void 0 || (d[f] = p), d;
  }, {}), c = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((d, m) => {
    let { class: f, className: p, ...h } = m;
    return Object.entries(h).every((b) => {
      let [g, v] = b;
      return Array.isArray(v) ? v.includes({
        ...a,
        ...i
      }[g]) : {
        ...a,
        ...i
      }[g] === v;
    }) ? [
      ...d,
      f,
      p
    ] : d;
  }, []);
  return ni(e, s, c, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
}, lv = Fe(
  "relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-surface-raised border-border-default text-content-primary [&>svg]:text-content-secondary",
        info: "bg-feedback-info-bg border-feedback-info/30 text-content-primary [&>svg]:text-feedback-info",
        success: "bg-feedback-success-bg border-feedback-success/30 text-content-primary [&>svg]:text-feedback-success",
        warning: "bg-feedback-warning-bg border-feedback-warning/30 text-content-primary [&>svg]:text-feedback-warning",
        danger: "bg-feedback-danger-bg border-feedback-danger/30 text-content-primary [&>svg]:text-feedback-danger"
      }
    },
    defaultVariants: { variant: "default" }
  }
), dv = {
  default: ei,
  info: ei,
  success: tv,
  warning: ov,
  danger: Wa
}, uv = l.forwardRef(
  ({ className: e, variant: t = "default", showIcon: n = !0, children: r, ...o }, a) => {
    const s = dv[t ?? "default"];
    return /* @__PURE__ */ R(
      "div",
      {
        ref: a,
        role: "alert",
        className: k(lv({ variant: t }), e),
        ...o,
        children: [
          n && /* @__PURE__ */ u(s, { className: "h-4 w-4", "aria-hidden": "true" }),
          r
        ]
      }
    );
  }
);
uv.displayName = "Alert";
const fv = l.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ u(
    "h5",
    {
      ref: n,
      className: k("mb-1 font-semibold text-body-sm leading-none tracking-tight", e),
      ...t
    }
  )
);
fv.displayName = "AlertTitle";
const mv = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u("div", { ref: n, className: k("text-body-sm text-content-secondary", e), ...t }));
mv.displayName = "AlertDescription";
function pv(e, t = []) {
  let n = [];
  function r(a, s) {
    const i = l.createContext(s);
    i.displayName = a + "Context";
    const c = n.length;
    n = [...n, s];
    const d = (f) => {
      var w;
      const { scope: p, children: h, ...b } = f, g = ((w = p == null ? void 0 : p[e]) == null ? void 0 : w[c]) || i, v = l.useMemo(() => b, Object.values(b));
      return /* @__PURE__ */ u(g.Provider, { value: v, children: h });
    };
    d.displayName = a + "Provider";
    function m(f, p) {
      var g;
      const h = ((g = p == null ? void 0 : p[e]) == null ? void 0 : g[c]) || i, b = l.useContext(h);
      if (b) return b;
      if (s !== void 0) return s;
      throw new Error(`\`${f}\` must be used within \`${a}\``);
    }
    return [d, m];
  }
  const o = () => {
    const a = n.map((s) => l.createContext(s));
    return function(i) {
      const c = (i == null ? void 0 : i[e]) || a;
      return l.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: c } }),
        [i, c]
      );
    };
  };
  return o.scopeName = e, [r, hv(o, ...t)];
}
function hv(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(a) {
      const s = r.reduce((i, { useScope: c, scopeName: d }) => {
        const f = c(a)[`__scope${d}`];
        return { ...i, ...f };
      }, {});
      return l.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function pe(e) {
  const t = l.useRef(e);
  return l.useEffect(() => {
    t.current = e;
  }), l.useMemo(() => (...n) => {
    var r;
    return (r = t.current) == null ? void 0 : r.call(t, ...n);
  }, []);
}
var gv = Symbol.for("react.lazy"), vr = l[" use ".trim().toString()];
function vv(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
function Fc(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === gv && "_payload" in e && vv(e._payload);
}
// @__NO_SIDE_EFFECTS__
function _n(e) {
  const t = /* @__PURE__ */ yv(e), n = l.forwardRef((r, o) => {
    let { children: a, ...s } = r;
    Fc(a) && typeof vr == "function" && (a = vr(a._payload));
    const i = l.Children.toArray(a), c = i.find(xv);
    if (c) {
      const d = c.props.children, m = i.map((f) => f === c ? l.Children.count(d) > 1 ? l.Children.only(null) : l.isValidElement(d) ? d.props.children : null : f);
      return /* @__PURE__ */ u(t, { ...s, ref: o, children: l.isValidElement(d) ? l.cloneElement(d, void 0, m) : null });
    }
    return /* @__PURE__ */ u(t, { ...s, ref: o, children: a });
  });
  return n.displayName = `${e}.Slot`, n;
}
var bv = /* @__PURE__ */ _n("Slot");
// @__NO_SIDE_EFFECTS__
function yv(e) {
  const t = l.forwardRef((n, r) => {
    let { children: o, ...a } = n;
    if (Fc(o) && typeof vr == "function" && (o = vr(o._payload)), l.isValidElement(o)) {
      const s = Cv(o), i = Sv(a, o.props);
      return o.type !== l.Fragment && (i.ref = r ? ke(r, s) : s), l.cloneElement(o, i);
    }
    return l.Children.count(o) > 1 ? l.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var wv = Symbol("radix.slottable");
function xv(e) {
  return l.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === wv;
}
function Sv(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], a = t[r];
    /^on[A-Z]/.test(r) ? o && a ? n[r] = (...i) => {
      const c = a(...i);
      return o(...i), c;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...a } : r === "className" && (n[r] = [o, a].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Cv(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Nv = [
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
], Fa = Nv.reduce((e, t) => {
  const n = /* @__PURE__ */ _n(`Primitive.${t}`), r = l.forwardRef((o, a) => {
    const { asChild: s, ...i } = o, c = s ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ u(c, { ...i, ref: a });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {}), ta = { exports: {} }, Po = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ri;
function Ev() {
  if (ri) return Po;
  ri = 1;
  var e = P;
  function t(f, p) {
    return f === p && (f !== 0 || 1 / f === 1 / p) || f !== f && p !== p;
  }
  var n = typeof Object.is == "function" ? Object.is : t, r = e.useState, o = e.useEffect, a = e.useLayoutEffect, s = e.useDebugValue;
  function i(f, p) {
    var h = p(), b = r({ inst: { value: h, getSnapshot: p } }), g = b[0].inst, v = b[1];
    return a(
      function() {
        g.value = h, g.getSnapshot = p, c(g) && v({ inst: g });
      },
      [f, h, p]
    ), o(
      function() {
        return c(g) && v({ inst: g }), f(function() {
          c(g) && v({ inst: g });
        });
      },
      [f]
    ), s(h), h;
  }
  function c(f) {
    var p = f.getSnapshot;
    f = f.value;
    try {
      var h = p();
      return !n(f, h);
    } catch {
      return !0;
    }
  }
  function d(f, p) {
    return p();
  }
  var m = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? d : i;
  return Po.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : m, Po;
}
var Ro = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var oi;
function kv() {
  return oi || (oi = 1, process.env.NODE_ENV !== "production" && function() {
    function e(h, b) {
      return h === b && (h !== 0 || 1 / h === 1 / b) || h !== h && b !== b;
    }
    function t(h, b) {
      m || o.startTransition === void 0 || (m = !0, console.error(
        "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
      ));
      var g = b();
      if (!f) {
        var v = b();
        a(g, v) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), f = !0);
      }
      v = s({
        inst: { value: g, getSnapshot: b }
      });
      var w = v[0].inst, y = v[1];
      return c(
        function() {
          w.value = g, w.getSnapshot = b, n(w) && y({ inst: w });
        },
        [h, g, b]
      ), i(
        function() {
          return n(w) && y({ inst: w }), h(function() {
            n(w) && y({ inst: w });
          });
        },
        [h]
      ), d(g), g;
    }
    function n(h) {
      var b = h.getSnapshot;
      h = h.value;
      try {
        var g = b();
        return !a(h, g);
      } catch {
        return !0;
      }
    }
    function r(h, b) {
      return b();
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var o = P, a = typeof Object.is == "function" ? Object.is : e, s = o.useState, i = o.useEffect, c = o.useLayoutEffect, d = o.useDebugValue, m = !1, f = !1, p = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? r : t;
    Ro.useSyncExternalStore = o.useSyncExternalStore !== void 0 ? o.useSyncExternalStore : p, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  }()), Ro;
}
process.env.NODE_ENV === "production" ? ta.exports = Ev() : ta.exports = kv();
var Pv = ta.exports;
function Rv() {
  return Pv.useSyncExternalStore(
    Mv,
    () => !0,
    () => !1
  );
}
function Mv() {
  return () => {
  };
}
var La = "Avatar", [Tv] = pv(La), [_v, Lc] = Tv(La), Bc = l.forwardRef(
  (e, t) => {
    const { __scopeAvatar: n, ...r } = e, [o, a] = l.useState("idle");
    return /* @__PURE__ */ u(
      _v,
      {
        scope: n,
        imageLoadingStatus: o,
        onImageLoadingStatusChange: a,
        children: /* @__PURE__ */ u(Fa.span, { ...r, ref: t })
      }
    );
  }
);
Bc.displayName = La;
var Vc = "AvatarImage", Hc = l.forwardRef(
  (e, t) => {
    const { __scopeAvatar: n, src: r, onLoadingStatusChange: o = () => {
    }, ...a } = e, s = Lc(Vc, n), i = Dv(r, a), c = pe((d) => {
      o(d), s.onImageLoadingStatusChange(d);
    });
    return ge(() => {
      i !== "idle" && c(i);
    }, [i, c]), i === "loaded" ? /* @__PURE__ */ u(Fa.img, { ...a, ref: t, src: r }) : null;
  }
);
Hc.displayName = Vc;
var Yc = "AvatarFallback", zc = l.forwardRef(
  (e, t) => {
    const { __scopeAvatar: n, delayMs: r, ...o } = e, a = Lc(Yc, n), [s, i] = l.useState(r === void 0);
    return l.useEffect(() => {
      if (r !== void 0) {
        const c = window.setTimeout(() => i(!0), r);
        return () => window.clearTimeout(c);
      }
    }, [r]), s && a.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ u(Fa.span, { ...o, ref: t }) : null;
  }
);
zc.displayName = Yc;
function ai(e, t) {
  return e ? t ? (e.src !== t && (e.src = t), e.complete && e.naturalWidth > 0 ? "loaded" : "loading") : "error" : "idle";
}
function Dv(e, { referrerPolicy: t, crossOrigin: n }) {
  const r = Rv(), o = l.useRef(null), a = r ? (o.current || (o.current = new window.Image()), o.current) : null, [s, i] = l.useState(
    () => ai(a, e)
  );
  return ge(() => {
    i(ai(a, e));
  }, [a, e]), ge(() => {
    const c = (f) => () => {
      i(f);
    };
    if (!a) return;
    const d = c("loaded"), m = c("error");
    return a.addEventListener("load", d), a.addEventListener("error", m), t && (a.referrerPolicy = t), typeof n == "string" && (a.crossOrigin = n), () => {
      a.removeEventListener("load", d), a.removeEventListener("error", m);
    };
  }, [a, n, t]), s;
}
var jc = Bc, Gc = Hc, Uc = zc;
const Ov = Fe("relative flex shrink-0 overflow-hidden rounded-full", {
  variants: {
    size: {
      xs: "h-6 w-6 text-[10px]",
      sm: "h-8 w-8 text-xs",
      default: "h-10 w-10 text-sm",
      lg: "h-12 w-12 text-base",
      xl: "h-16 w-16 text-lg"
    }
  },
  defaultVariants: { size: "default" }
}), Kc = l.forwardRef(
  ({ className: e, size: t, ...n }, r) => /* @__PURE__ */ u(
    jc,
    {
      ref: r,
      className: k(Ov({ size: t }), e),
      ...n
    }
  )
);
Kc.displayName = jc.displayName;
const Av = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  Gc,
  {
    ref: n,
    className: k("aspect-square h-full w-full object-cover", e),
    ...t
  }
));
Av.displayName = Gc.displayName;
const qc = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  Uc,
  {
    ref: n,
    className: k(
      "flex h-full w-full items-center justify-center rounded-full",
      "bg-primary text-primary-foreground font-semibold uppercase tracking-wide",
      e
    ),
    ...t
  }
));
qc.displayName = Uc.displayName;
const Iv = ({ children: e, max: t, size: n = "default", className: r }) => {
  const o = l.Children.toArray(e), a = t ? o.slice(0, t) : o, s = t ? o.length - t : 0;
  return /* @__PURE__ */ R("div", { className: k("flex -space-x-2", r), role: "group", children: [
    a.map(
      (i, c) => {
        var d;
        return l.cloneElement(i, {
          key: c,
          size: n,
          className: k(
            "ring-2 ring-surface-raised",
            ((d = i.props) == null ? void 0 : d.className) ?? ""
          )
        });
      }
    ),
    s > 0 && /* @__PURE__ */ u(Kc, { size: n, className: "ring-2 ring-surface-raised", children: /* @__PURE__ */ R(qc, { children: [
      "+",
      s
    ] }) })
  ] });
};
Iv.displayName = "AvatarGroup";
const $v = Fe(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function RM({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ u("div", { className: k($v({ variant: t }), e), ...n });
}
const Wv = l.forwardRef(({ ...e }, t) => /* @__PURE__ */ u("nav", { ref: t, "aria-label": "breadcrumb", ...e }));
Wv.displayName = "Breadcrumb";
const Fv = l.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ u(
    "ol",
    {
      ref: n,
      className: k(
        "flex flex-wrap items-center gap-1.5 break-words text-caption text-content-secondary sm:gap-2.5",
        e
      ),
      ...t
    }
  )
);
Fv.displayName = "BreadcrumbList";
const Lv = l.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ u("li", { ref: n, className: k("inline-flex items-center gap-1.5", e), ...t })
);
Lv.displayName = "BreadcrumbItem";
const Bv = l.forwardRef(({ asChild: e, className: t, ...n }, r) => /* @__PURE__ */ u(
  "a",
  {
    ref: r,
    className: k(
      "hover:text-content-primary transition-colors duration-fast",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-xs",
      t
    ),
    ...n
  }
));
Bv.displayName = "BreadcrumbLink";
const Vv = l.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ u(
    "span",
    {
      ref: n,
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
      className: k("font-semibold text-content-primary", e),
      ...t
    }
  )
);
Vv.displayName = "BreadcrumbPage";
const Hv = ({ children: e, className: t, ...n }) => /* @__PURE__ */ u("li", { role: "presentation", "aria-hidden": "true", className: k("[&>svg]:size-3", t), ...n, children: e ?? /* @__PURE__ */ u(Fr, {}) });
Hv.displayName = "BreadcrumbSeparator";
const Yv = ({ className: e, ...t }) => /* @__PURE__ */ R(
  "span",
  {
    role: "presentation",
    "aria-hidden": "true",
    className: k("flex h-9 w-9 items-center justify-center", e),
    ...t,
    children: [
      /* @__PURE__ */ u($c, { className: "h-4 w-4" }),
      /* @__PURE__ */ u("span", { className: "sr-only", children: "More" })
    ]
  }
);
Yv.displayName = "BreadcrumbElipssis";
const br = Fe(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium",
    "transition-all duration-fast ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "select-none"
  ].join(" "),
  {
    variants: {
      variant: {
        /* Primary — brand navy, authoritative */
        default: "bg-primary text-primary-foreground shadow-elevation-2 hover:bg-primary/90 hover:shadow-elevation-3 hover:-translate-y-px active:translate-y-0 active:shadow-elevation-1",
        /* Destructive */
        destructive: "bg-destructive text-destructive-foreground shadow-elevation-1 hover:bg-destructive/90 hover:shadow-elevation-2 hover:-translate-y-px active:translate-y-0",
        /* Tertiary — ghost with border */
        tertiary: "border border-border-default bg-surface-raised text-content-primary hover:bg-surface-sunken hover:border-border-strong",
        /* Outline — shadcn compat */
        outline: "border border-border-default bg-transparent text-content-primary hover:bg-surface-sunken hover:border-border-strong",
        /* Secondary */
        secondary: "bg-surface-sunken text-content-primary hover:bg-muted border border-border-subtle",
        /* Ghost — no border */
        ghost: "text-content-primary hover:bg-surface-sunken",
        /* Link */
        link: "text-content-brand underline-offset-4 hover:underline p-0 h-auto",
        /* Success — approve workflows */
        success: "bg-success text-success-foreground shadow-elevation-1 hover:bg-success/90 hover:shadow-elevation-2 hover:-translate-y-px active:translate-y-0",
        /* Danger outline */
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
  }
), Ce = l.forwardRef(
  ({
    className: e,
    variant: t,
    size: n,
    asChild: r = !1,
    loading: o = !1,
    iconLeft: a,
    iconRight: s,
    children: i,
    disabled: c,
    ...d
  }, m) => /* @__PURE__ */ R(
    r ? bv : "button",
    {
      className: k(br({ variant: t, size: n, className: e })),
      ref: m,
      disabled: c || o,
      "aria-disabled": c || o,
      ...d,
      children: [
        o ? /* @__PURE__ */ u(nv, { className: "animate-spin", "aria-hidden": "true" }) : a && /* @__PURE__ */ u("span", { "aria-hidden": "true", children: a }),
        i,
        !o && s && /* @__PURE__ */ u("span", { "aria-hidden": "true", children: s })
      ]
    }
  )
);
Ce.displayName = "Button";
function zv(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const Mo = {}, bn = {};
function Tt(e, t) {
  try {
    const r = (Mo[e] || (Mo[e] = new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format))(t).split("GMT")[1];
    return r in bn ? bn[r] : si(r, r.split(":"));
  } catch {
    if (e in bn) return bn[e];
    const n = e == null ? void 0 : e.match(jv);
    return n ? si(e, n.slice(1)) : NaN;
  }
}
const jv = /([+-]\d\d):?(\d\d)?/;
function si(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), o = +(t[2] || 0) / 60;
  return bn[e] = n * 60 + r > 0 ? n * 60 + r + o : n * 60 - r - o;
}
class Je extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(Tt(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), Xc(this), na(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new Je(...n, t) : new Je(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new Je(+this, t);
  }
  getTimezoneOffset() {
    const t = -Tt(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), na(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Je(+new Date(t), this.timeZone);
  }
  //#endregion
}
const ii = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!ii.test(e)) return;
  const t = e.replace(ii, "$1UTC");
  Je.prototype[t] && (e.startsWith("get") ? Je.prototype[e] = function() {
    return this.internal[t]();
  } : (Je.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), Gv(this), +this;
  }, Je.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), na(this), +this;
  }));
});
function na(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-Tt(e.timeZone, e) * 60));
}
function Gv(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), Xc(e);
}
function Xc(e) {
  const t = Tt(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const o = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), a = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), s = o - a, i = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  s && i && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + s);
  const c = o - n;
  c && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + c);
  const d = /* @__PURE__ */ new Date(+e);
  d.setUTCSeconds(0);
  const m = o > 0 ? d.getSeconds() : (d.getSeconds() - 60) % 60, f = Math.round(-(Tt(e.timeZone, e) * 60)) % 60;
  (f || m) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + f), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + f + m));
  const p = Tt(e.timeZone, e), h = p > 0 ? Math.floor(p) : Math.ceil(p), g = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - h, v = h !== n, w = g - c;
  if (v && w) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + w);
    const y = Tt(e.timeZone, e), x = y > 0 ? Math.floor(y) : Math.ceil(y), S = h - x;
    S && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + S), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + S));
  }
}
class Se extends Je {
  //#region static
  static tz(t, ...n) {
    return n.length ? new Se(...n, t) : new Se(Date.now(), t);
  }
  //#endregion
  //#region representation
  toISOString() {
    const [t, n, r] = this.tzComponents(), o = `${t}${n}:${r}`;
    return this.internal.toISOString().slice(0, -1) + o;
  }
  toString() {
    return `${this.toDateString()} ${this.toTimeString()}`;
  }
  toDateString() {
    const [t, n, r, o] = this.internal.toUTCString().split(" ");
    return `${t == null ? void 0 : t.slice(0, -1)} ${r} ${n} ${o}`;
  }
  toTimeString() {
    const t = this.internal.toUTCString().split(" ")[4], [n, r, o] = this.tzComponents();
    return `${t} GMT${n}${r}${o} (${zv(this.timeZone, this)})`;
  }
  toLocaleString(t, n) {
    return Date.prototype.toLocaleString.call(this, t, {
      ...n,
      timeZone: (n == null ? void 0 : n.timeZone) || this.timeZone
    });
  }
  toLocaleDateString(t, n) {
    return Date.prototype.toLocaleDateString.call(this, t, {
      ...n,
      timeZone: (n == null ? void 0 : n.timeZone) || this.timeZone
    });
  }
  toLocaleTimeString(t, n) {
    return Date.prototype.toLocaleTimeString.call(this, t, {
      ...n,
      timeZone: (n == null ? void 0 : n.timeZone) || this.timeZone
    });
  }
  //#endregion
  //#region private
  tzComponents() {
    const t = this.getTimezoneOffset(), n = t > 0 ? "-" : "+", r = String(Math.floor(Math.abs(t) / 60)).padStart(2, "0"), o = String(Math.abs(t) % 60).padStart(2, "0");
    return [n, r, o];
  }
  //#endregion
  withTimeZone(t) {
    return new Se(+this, t);
  }
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Se(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Zc = 6048e5, Uv = 864e5, ci = Symbol.for("constructDateFrom");
function ye(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && ci in e ? e[ci](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function ue(e, t) {
  return ye(t || e, e);
}
function Qc(e, t, n) {
  const r = ue(e, n == null ? void 0 : n.in);
  return isNaN(t) ? ye(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function Jc(e, t, n) {
  const r = ue(e, n == null ? void 0 : n.in);
  if (isNaN(t)) return ye(e, NaN);
  if (!t)
    return r;
  const o = r.getDate(), a = ye(e, r.getTime());
  a.setMonth(r.getMonth() + t + 1, 0);
  const s = a.getDate();
  return o >= s ? a : (r.setFullYear(
    a.getFullYear(),
    a.getMonth(),
    o
  ), r);
}
let Kv = {};
function Dn() {
  return Kv;
}
function tn(e, t) {
  var i, c, d, m;
  const n = Dn(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((c = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : c.weekStartsOn) ?? n.weekStartsOn ?? ((m = (d = n.locale) == null ? void 0 : d.options) == null ? void 0 : m.weekStartsOn) ?? 0, o = ue(e, t == null ? void 0 : t.in), a = o.getDay(), s = (a < r ? 7 : 0) + a - r;
  return o.setDate(o.getDate() - s), o.setHours(0, 0, 0, 0), o;
}
function Cn(e, t) {
  return tn(e, { ...t, weekStartsOn: 1 });
}
function el(e, t) {
  const n = ue(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = ye(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const a = Cn(o), s = ye(n, 0);
  s.setFullYear(r, 0, 4), s.setHours(0, 0, 0, 0);
  const i = Cn(s);
  return n.getTime() >= a.getTime() ? r + 1 : n.getTime() >= i.getTime() ? r : r - 1;
}
function li(e) {
  const t = ue(e), n = new Date(
    Date.UTC(
      t.getFullYear(),
      t.getMonth(),
      t.getDate(),
      t.getHours(),
      t.getMinutes(),
      t.getSeconds(),
      t.getMilliseconds()
    )
  );
  return n.setUTCFullYear(t.getFullYear()), +e - +n;
}
function ln(e, ...t) {
  const n = ye.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function Nn(e, t) {
  const n = ue(e, t == null ? void 0 : t.in);
  return n.setHours(0, 0, 0, 0), n;
}
function Ba(e, t, n) {
  const [r, o] = ln(
    n == null ? void 0 : n.in,
    e,
    t
  ), a = Nn(r), s = Nn(o), i = +a - li(a), c = +s - li(s);
  return Math.round((i - c) / Uv);
}
function qv(e, t) {
  const n = el(e, t), r = ye(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), Cn(r);
}
function Xv(e, t, n) {
  return Qc(e, t * 7, n);
}
function Zv(e, t, n) {
  return Jc(e, t * 12, n);
}
function Qv(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = ye.bind(null, o));
    const a = ue(o, r);
    (!n || n < a || isNaN(+a)) && (n = a);
  }), ye(r, n || NaN);
}
function Jv(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = ye.bind(null, o));
    const a = ue(o, r);
    (!n || n > a || isNaN(+a)) && (n = a);
  }), ye(r, n || NaN);
}
function eb(e, t, n) {
  const [r, o] = ln(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return +Nn(r) == +Nn(o);
}
function tl(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function tb(e) {
  return !(!tl(e) && typeof e != "number" || isNaN(+ue(e)));
}
function nl(e, t, n) {
  const [r, o] = ln(
    n == null ? void 0 : n.in,
    e,
    t
  ), a = r.getFullYear() - o.getFullYear(), s = r.getMonth() - o.getMonth();
  return a * 12 + s;
}
function nb(e, t) {
  const n = ue(e, t == null ? void 0 : t.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function rl(e, t) {
  const [n, r] = ln(e, t.start, t.end);
  return { start: n, end: r };
}
function rb(e, t) {
  const { start: n, end: r } = rl(t == null ? void 0 : t.in, e);
  let o = +n > +r;
  const a = o ? +n : +r, s = o ? r : n;
  s.setHours(0, 0, 0, 0), s.setDate(1);
  let i = 1;
  const c = [];
  for (; +s <= a; )
    c.push(ye(n, s)), s.setMonth(s.getMonth() + i);
  return o ? c.reverse() : c;
}
function ob(e, t) {
  const n = ue(e, t == null ? void 0 : t.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function ab(e, t) {
  const n = ue(e, t == null ? void 0 : t.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function ol(e, t) {
  const n = ue(e, t == null ? void 0 : t.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function sb(e, t) {
  const { start: n, end: r } = rl(t == null ? void 0 : t.in, e);
  let o = +n > +r;
  const a = o ? +n : +r, s = o ? r : n;
  s.setHours(0, 0, 0, 0), s.setMonth(0, 1);
  let i = 1;
  const c = [];
  for (; +s <= a; )
    c.push(ye(n, s)), s.setFullYear(s.getFullYear() + i);
  return o ? c.reverse() : c;
}
function al(e, t) {
  var i, c, d, m;
  const n = Dn(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((c = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : c.weekStartsOn) ?? n.weekStartsOn ?? ((m = (d = n.locale) == null ? void 0 : d.options) == null ? void 0 : m.weekStartsOn) ?? 0, o = ue(e, t == null ? void 0 : t.in), a = o.getDay(), s = (a < r ? -7 : 0) + 6 - (a - r);
  return o.setDate(o.getDate() + s), o.setHours(23, 59, 59, 999), o;
}
function ib(e, t) {
  return al(e, { ...t, weekStartsOn: 1 });
}
const cb = {
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
}, lb = (e, t, n) => {
  let r;
  const o = cb[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function Zt(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const db = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, ub = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, fb = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, mb = {
  date: Zt({
    formats: db,
    defaultWidth: "full"
  }),
  time: Zt({
    formats: ub,
    defaultWidth: "full"
  }),
  dateTime: Zt({
    formats: fb,
    defaultWidth: "full"
  })
}, pb = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, hb = (e, t, n, r) => pb[e];
function Xe(e) {
  return (t, n) => {
    const r = n != null && n.context ? String(n.context) : "standalone";
    let o;
    if (r === "formatting" && e.formattingValues) {
      const s = e.defaultFormattingWidth || e.defaultWidth, i = n != null && n.width ? String(n.width) : s;
      o = e.formattingValues[i] || e.formattingValues[s];
    } else {
      const s = e.defaultWidth, i = n != null && n.width ? String(n.width) : e.defaultWidth;
      o = e.values[i] || e.values[s];
    }
    const a = e.argumentCallback ? e.argumentCallback(t) : t;
    return o[a];
  };
}
const gb = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, vb = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, bb = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
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
}, yb = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
}, wb = {
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
}, xb = {
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
}, Sb = (e, t) => {
  const n = Number(e), r = n % 100;
  if (r > 20 || r < 10)
    switch (r % 10) {
      case 1:
        return n + "st";
      case 2:
        return n + "nd";
      case 3:
        return n + "rd";
    }
  return n + "th";
}, Cb = {
  ordinalNumber: Sb,
  era: Xe({
    values: gb,
    defaultWidth: "wide"
  }),
  quarter: Xe({
    values: vb,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Xe({
    values: bb,
    defaultWidth: "wide"
  }),
  day: Xe({
    values: yb,
    defaultWidth: "wide"
  }),
  dayPeriod: Xe({
    values: wb,
    defaultWidth: "wide",
    formattingValues: xb,
    defaultFormattingWidth: "wide"
  })
};
function Ze(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], a = t.match(o);
    if (!a)
      return null;
    const s = a[0], i = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(i) ? Eb(i, (f) => f.test(s)) : (
      // [TODO] -- I challenge you to fix the type
      Nb(i, (f) => f.test(s))
    );
    let d;
    d = e.valueCallback ? e.valueCallback(c) : c, d = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(d)
    ) : d;
    const m = t.slice(s.length);
    return { value: d, rest: m };
  };
}
function Nb(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function Eb(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function sl(e) {
  return (t, n = {}) => {
    const r = t.match(e.matchPattern);
    if (!r) return null;
    const o = r[0], a = t.match(e.parsePattern);
    if (!a) return null;
    let s = e.valueCallback ? e.valueCallback(a[0]) : a[0];
    s = n.valueCallback ? n.valueCallback(s) : s;
    const i = t.slice(o.length);
    return { value: s, rest: i };
  };
}
const kb = /^(\d+)(th|st|nd|rd)?/i, Pb = /\d+/i, Rb = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Mb = {
  any: [/^b/i, /^(a|c)/i]
}, Tb = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, _b = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Db = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Ob = {
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
}, Ab = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Ib = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, $b = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Wb = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, Fb = {
  ordinalNumber: sl({
    matchPattern: kb,
    parsePattern: Pb,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Ze({
    matchPatterns: Rb,
    defaultMatchWidth: "wide",
    parsePatterns: Mb,
    defaultParseWidth: "any"
  }),
  quarter: Ze({
    matchPatterns: Tb,
    defaultMatchWidth: "wide",
    parsePatterns: _b,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Ze({
    matchPatterns: Db,
    defaultMatchWidth: "wide",
    parsePatterns: Ob,
    defaultParseWidth: "any"
  }),
  day: Ze({
    matchPatterns: Ab,
    defaultMatchWidth: "wide",
    parsePatterns: Ib,
    defaultParseWidth: "any"
  }),
  dayPeriod: Ze({
    matchPatterns: $b,
    defaultMatchWidth: "any",
    parsePatterns: Wb,
    defaultParseWidth: "any"
  })
}, Gt = {
  code: "en-US",
  formatDistance: lb,
  formatLong: mb,
  formatRelative: hb,
  localize: Cb,
  match: Fb,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Lb(e, t) {
  const n = ue(e, t == null ? void 0 : t.in);
  return Ba(n, ol(n)) + 1;
}
function Va(e, t) {
  const n = ue(e, t == null ? void 0 : t.in), r = +Cn(n) - +qv(n);
  return Math.round(r / Zc) + 1;
}
function il(e, t) {
  var m, f, p, h;
  const n = ue(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = Dn(), a = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((f = (m = t == null ? void 0 : t.locale) == null ? void 0 : m.options) == null ? void 0 : f.firstWeekContainsDate) ?? o.firstWeekContainsDate ?? ((h = (p = o.locale) == null ? void 0 : p.options) == null ? void 0 : h.firstWeekContainsDate) ?? 1, s = ye((t == null ? void 0 : t.in) || e, 0);
  s.setFullYear(r + 1, 0, a), s.setHours(0, 0, 0, 0);
  const i = tn(s, t), c = ye((t == null ? void 0 : t.in) || e, 0);
  c.setFullYear(r, 0, a), c.setHours(0, 0, 0, 0);
  const d = tn(c, t);
  return +n >= +i ? r + 1 : +n >= +d ? r : r - 1;
}
function Bb(e, t) {
  var i, c, d, m;
  const n = Dn(), r = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((c = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : c.firstWeekContainsDate) ?? n.firstWeekContainsDate ?? ((m = (d = n.locale) == null ? void 0 : d.options) == null ? void 0 : m.firstWeekContainsDate) ?? 1, o = il(e, t), a = ye((t == null ? void 0 : t.in) || e, 0);
  return a.setFullYear(o, 0, r), a.setHours(0, 0, 0, 0), tn(a, t);
}
function Ha(e, t) {
  const n = ue(e, t == null ? void 0 : t.in), r = +tn(n, t) - +Bb(n, t);
  return Math.round(r / Zc) + 1;
}
function de(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const pt = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return de(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : de(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return de(e.getDate(), t.length);
  },
  // AM or PM
  a(e, t) {
    const n = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return n.toUpperCase();
      case "aaa":
        return n;
      case "aaaaa":
        return n[0];
      case "aaaa":
      default:
        return n === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(e, t) {
    return de(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return de(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return de(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return de(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), o = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return de(o, t.length);
  }
}, Vt = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, di = {
  // Era
  G: function(e, t, n) {
    const r = e.getFullYear() > 0 ? 1 : 0;
    switch (t) {
      case "G":
      case "GG":
      case "GGG":
        return n.era(r, { width: "abbreviated" });
      case "GGGGG":
        return n.era(r, { width: "narrow" });
      case "GGGG":
      default:
        return n.era(r, { width: "wide" });
    }
  },
  // Year
  y: function(e, t, n) {
    if (t === "yo") {
      const r = e.getFullYear(), o = r > 0 ? r : 1 - r;
      return n.ordinalNumber(o, { unit: "year" });
    }
    return pt.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const o = il(e, r), a = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const s = a % 100;
      return de(s, 2);
    }
    return t === "Yo" ? n.ordinalNumber(a, { unit: "year" }) : de(a, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = el(e);
    return de(n, t.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(e, t) {
    const n = e.getFullYear();
    return de(n, t.length);
  },
  // Quarter
  Q: function(e, t, n) {
    const r = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      case "Q":
        return String(r);
      case "QQ":
        return de(r, 2);
      case "Qo":
        return n.ordinalNumber(r, { unit: "quarter" });
      case "QQQ":
        return n.quarter(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return n.quarter(r, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return n.quarter(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(e, t, n) {
    const r = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      case "q":
        return String(r);
      case "qq":
        return de(r, 2);
      case "qo":
        return n.ordinalNumber(r, { unit: "quarter" });
      case "qqq":
        return n.quarter(r, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return n.quarter(r, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return n.quarter(r, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(e, t, n) {
    const r = e.getMonth();
    switch (t) {
      case "M":
      case "MM":
        return pt.M(e, t);
      case "Mo":
        return n.ordinalNumber(r + 1, { unit: "month" });
      case "MMM":
        return n.month(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return n.month(r, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return n.month(r, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(e, t, n) {
    const r = e.getMonth();
    switch (t) {
      case "L":
        return String(r + 1);
      case "LL":
        return de(r + 1, 2);
      case "Lo":
        return n.ordinalNumber(r + 1, { unit: "month" });
      case "LLL":
        return n.month(r, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return n.month(r, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return n.month(r, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(e, t, n, r) {
    const o = Ha(e, r);
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : de(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = Va(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : de(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : pt.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = Lb(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : de(r, t.length);
  },
  // Day of week
  E: function(e, t, n) {
    const r = e.getDay();
    switch (t) {
      case "E":
      case "EE":
      case "EEE":
        return n.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return n.day(r, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return n.day(r, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return n.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(e, t, n, r) {
    const o = e.getDay(), a = (o - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      case "e":
        return String(a);
      case "ee":
        return de(a, 2);
      case "eo":
        return n.ordinalNumber(a, { unit: "day" });
      case "eee":
        return n.day(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return n.day(o, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return n.day(o, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return n.day(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(e, t, n, r) {
    const o = e.getDay(), a = (o - r.weekStartsOn + 8) % 7 || 7;
    switch (t) {
      case "c":
        return String(a);
      case "cc":
        return de(a, t.length);
      case "co":
        return n.ordinalNumber(a, { unit: "day" });
      case "ccc":
        return n.day(o, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return n.day(o, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return n.day(o, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return n.day(o, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(e, t, n) {
    const r = e.getDay(), o = r === 0 ? 7 : r;
    switch (t) {
      case "i":
        return String(o);
      case "ii":
        return de(o, t.length);
      case "io":
        return n.ordinalNumber(o, { unit: "day" });
      case "iii":
        return n.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return n.day(r, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return n.day(r, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return n.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(e, t, n) {
    const o = e.getHours() / 12 >= 1 ? "pm" : "am";
    switch (t) {
      case "a":
      case "aa":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return n.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return n.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(e, t, n) {
    const r = e.getHours();
    let o;
    switch (r === 12 ? o = Vt.noon : r === 0 ? o = Vt.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
      case "b":
      case "bb":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return n.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return n.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(e, t, n) {
    const r = e.getHours();
    let o;
    switch (r >= 17 ? o = Vt.evening : r >= 12 ? o = Vt.afternoon : r >= 4 ? o = Vt.morning : o = Vt.night, t) {
      case "B":
      case "BB":
      case "BBB":
        return n.dayPeriod(o, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return n.dayPeriod(o, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return n.dayPeriod(o, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(e, t, n) {
    if (t === "ho") {
      let r = e.getHours() % 12;
      return r === 0 && (r = 12), n.ordinalNumber(r, { unit: "hour" });
    }
    return pt.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : pt.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : de(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : de(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : pt.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : pt.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return pt.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      case "X":
        return fi(r);
      case "XXXX":
      case "XX":
        return Mt(r);
      case "XXXXX":
      case "XXX":
      default:
        return Mt(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "x":
        return fi(r);
      case "xxxx":
      case "xx":
        return Mt(r);
      case "xxxxx":
      case "xxx":
      default:
        return Mt(r, ":");
    }
  },
  // Timezone (GMT)
  O: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + ui(r, ":");
      case "OOOO":
      default:
        return "GMT" + Mt(r, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + ui(r, ":");
      case "zzzz":
      default:
        return "GMT" + Mt(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return de(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return de(+e, t.length);
  }
};
function ui(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), a = r % 60;
  return a === 0 ? n + String(o) : n + String(o) + t + de(a, 2);
}
function fi(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + de(Math.abs(e) / 60, 2) : Mt(e, t);
}
function Mt(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = de(Math.trunc(r / 60), 2), a = de(r % 60, 2);
  return n + o + t + a;
}
const mi = (e, t) => {
  switch (e) {
    case "P":
      return t.date({ width: "short" });
    case "PP":
      return t.date({ width: "medium" });
    case "PPP":
      return t.date({ width: "long" });
    case "PPPP":
    default:
      return t.date({ width: "full" });
  }
}, cl = (e, t) => {
  switch (e) {
    case "p":
      return t.time({ width: "short" });
    case "pp":
      return t.time({ width: "medium" });
    case "ppp":
      return t.time({ width: "long" });
    case "pppp":
    default:
      return t.time({ width: "full" });
  }
}, Vb = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], o = n[2];
  if (!o)
    return mi(e, t);
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
    case "PPPP":
    default:
      a = t.dateTime({ width: "full" });
      break;
  }
  return a.replace("{{date}}", mi(r, t)).replace("{{time}}", cl(o, t));
}, Hb = {
  p: cl,
  P: Vb
}, Yb = /^D+$/, zb = /^Y+$/, jb = ["D", "DD", "YY", "YYYY"];
function Gb(e) {
  return Yb.test(e);
}
function Ub(e) {
  return zb.test(e);
}
function Kb(e, t, n) {
  const r = qb(e, t, n);
  if (console.warn(r), jb.includes(e)) throw new RangeError(r);
}
function qb(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Xb = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Zb = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Qb = /^'([^]*?)'?$/, Jb = /''/g, ey = /[a-zA-Z]/;
function qt(e, t, n) {
  var m, f, p, h, b, g, v, w;
  const r = Dn(), o = (n == null ? void 0 : n.locale) ?? r.locale ?? Gt, a = (n == null ? void 0 : n.firstWeekContainsDate) ?? ((f = (m = n == null ? void 0 : n.locale) == null ? void 0 : m.options) == null ? void 0 : f.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((h = (p = r.locale) == null ? void 0 : p.options) == null ? void 0 : h.firstWeekContainsDate) ?? 1, s = (n == null ? void 0 : n.weekStartsOn) ?? ((g = (b = n == null ? void 0 : n.locale) == null ? void 0 : b.options) == null ? void 0 : g.weekStartsOn) ?? r.weekStartsOn ?? ((w = (v = r.locale) == null ? void 0 : v.options) == null ? void 0 : w.weekStartsOn) ?? 0, i = ue(e, n == null ? void 0 : n.in);
  if (!tb(i))
    throw new RangeError("Invalid time value");
  let c = t.match(Zb).map((y) => {
    const x = y[0];
    if (x === "p" || x === "P") {
      const S = Hb[x];
      return S(y, o.formatLong);
    }
    return y;
  }).join("").match(Xb).map((y) => {
    if (y === "''")
      return { isToken: !1, value: "'" };
    const x = y[0];
    if (x === "'")
      return { isToken: !1, value: ty(y) };
    if (di[x])
      return { isToken: !0, value: y };
    if (x.match(ey))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + x + "`"
      );
    return { isToken: !1, value: y };
  });
  o.localize.preprocessor && (c = o.localize.preprocessor(i, c));
  const d = {
    firstWeekContainsDate: a,
    weekStartsOn: s,
    locale: o
  };
  return c.map((y) => {
    if (!y.isToken) return y.value;
    const x = y.value;
    (!(n != null && n.useAdditionalWeekYearTokens) && Ub(x) || !(n != null && n.useAdditionalDayOfYearTokens) && Gb(x)) && Kb(x, t, String(e));
    const S = di[x[0]];
    return S(i, x, o.localize, d);
  }).join("");
}
function ty(e) {
  const t = e.match(Qb);
  return t ? t[1].replace(Jb, "'") : e;
}
function ny(e, t) {
  const n = ue(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = n.getMonth(), a = ye(n, 0);
  return a.setFullYear(r, o + 1, 0), a.setHours(0, 0, 0, 0), a.getDate();
}
function ry(e, t) {
  return ue(e, t == null ? void 0 : t.in).getMonth();
}
function oy(e, t) {
  return ue(e, t == null ? void 0 : t.in).getFullYear();
}
function ay(e, t) {
  return +ue(e) > +ue(t);
}
function sy(e, t) {
  return +ue(e) < +ue(t);
}
function iy(e, t, n) {
  const [r, o] = ln(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function cy(e, t, n) {
  const [r, o] = ln(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function ly(e, t, n) {
  const r = ue(e, n == null ? void 0 : n.in), o = r.getFullYear(), a = r.getDate(), s = ye(e, 0);
  s.setFullYear(o, t, 15), s.setHours(0, 0, 0, 0);
  const i = ny(s);
  return r.setMonth(t, Math.min(a, i)), r;
}
function dy(e, t, n) {
  const r = ue(e, n == null ? void 0 : n.in);
  return isNaN(+r) ? ye(e, NaN) : (r.setFullYear(t), r);
}
const pi = 5, uy = 4;
function fy(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), a = t.addDays(o, pi * 7 - 1);
  return t.getMonth(e) === t.getMonth(a) ? pi : uy;
}
function ll(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -1 * 6) : t.addDays(n, -1 * (r - 1));
}
function my(e, t) {
  const n = ll(e, t), r = fy(e, t);
  return t.addDays(n, r * 7 - 1);
}
const py = {
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
}, hy = (e, t, n) => {
  let r;
  const o = py[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "dalam waktu " + r : r + " yang lalu" : r;
}, gy = {
  full: "EEEE, d MMMM yyyy",
  long: "d MMMM yyyy",
  medium: "d MMM yyyy",
  short: "d/M/yyyy"
}, vy = {
  full: "HH.mm.ss",
  long: "HH.mm.ss",
  medium: "HH.mm",
  short: "HH.mm"
}, by = {
  full: "{{date}} 'pukul' {{time}}",
  long: "{{date}} 'pukul' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, yy = {
  date: Zt({
    formats: gy,
    defaultWidth: "full"
  }),
  time: Zt({
    formats: vy,
    defaultWidth: "full"
  }),
  dateTime: Zt({
    formats: by,
    defaultWidth: "full"
  })
}, wy = {
  lastWeek: "eeee 'lalu pukul' p",
  yesterday: "'Kemarin pukul' p",
  today: "'Hari ini pukul' p",
  tomorrow: "'Besok pukul' p",
  nextWeek: "eeee 'pukul' p",
  other: "P"
}, xy = (e, t, n, r) => wy[e], Sy = {
  narrow: ["SM", "M"],
  abbreviated: ["SM", "M"],
  wide: ["Sebelum Masehi", "Masehi"]
}, Cy = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["K1", "K2", "K3", "K4"],
  wide: ["Kuartal ke-1", "Kuartal ke-2", "Kuartal ke-3", "Kuartal ke-4"]
}, Ny = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
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
}, Ey = {
  narrow: ["M", "S", "S", "R", "K", "J", "S"],
  short: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
  abbreviated: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
  wide: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
}, ky = {
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
}, Py = {
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
}, Ry = (e, t) => "ke-" + Number(e), My = {
  ordinalNumber: Ry,
  era: Xe({
    values: Sy,
    defaultWidth: "wide"
  }),
  quarter: Xe({
    values: Cy,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Xe({
    values: Ny,
    defaultWidth: "wide"
  }),
  day: Xe({
    values: Ey,
    defaultWidth: "wide"
  }),
  dayPeriod: Xe({
    values: ky,
    defaultWidth: "wide",
    formattingValues: Py,
    defaultFormattingWidth: "wide"
  })
}, Ty = /^ke-(\d+)?/i, _y = /\d+/i, Dy = {
  narrow: /^(sm|m)/i,
  abbreviated: /^(s\.?\s?m\.?|s\.?\s?e\.?\s?u\.?|m\.?|e\.?\s?u\.?)/i,
  wide: /^(sebelum masehi|sebelum era umum|masehi|era umum)/i
}, Oy = {
  any: [/^s/i, /^(m|e)/i]
}, Ay = {
  narrow: /^[1234]/i,
  abbreviated: /^K-?\s[1234]/i,
  wide: /^Kuartal ke-?\s?[1234]/i
}, Iy = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, $y = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|mei|jun|jul|agt|sep|okt|nov|des)/i,
  wide: /^(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)/i
}, Wy = {
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
}, Fy = {
  narrow: /^[srkjm]/i,
  short: /^(min|sen|sel|rab|kam|jum|sab)/i,
  abbreviated: /^(min|sen|sel|rab|kam|jum|sab)/i,
  wide: /^(minggu|senin|selasa|rabu|kamis|jumat|sabtu)/i
}, Ly = {
  narrow: [/^m/i, /^s/i, /^s/i, /^r/i, /^k/i, /^j/i, /^s/i],
  any: [/^m/i, /^sen/i, /^sel/i, /^r/i, /^k/i, /^j/i, /^sa/i]
}, By = {
  narrow: /^(a|p|tengah m|tengah h|(di(\swaktu)?) (pagi|siang|sore|malam))/i,
  any: /^([ap]\.?\s?m\.?|tengah malam|tengah hari|(di(\swaktu)?) (pagi|siang|sore|malam))/i
}, Vy = {
  any: {
    am: /^a/i,
    pm: /^pm/i,
    midnight: /^tengah m/i,
    noon: /^tengah h/i,
    morning: /pagi/i,
    afternoon: /siang/i,
    evening: /sore/i,
    night: /malam/i
  }
}, Hy = {
  ordinalNumber: sl({
    matchPattern: Ty,
    parsePattern: _y,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Ze({
    matchPatterns: Dy,
    defaultMatchWidth: "wide",
    parsePatterns: Oy,
    defaultParseWidth: "any"
  }),
  quarter: Ze({
    matchPatterns: Ay,
    defaultMatchWidth: "wide",
    parsePatterns: Iy,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Ze({
    matchPatterns: $y,
    defaultMatchWidth: "wide",
    parsePatterns: Wy,
    defaultParseWidth: "any"
  }),
  day: Ze({
    matchPatterns: Fy,
    defaultMatchWidth: "wide",
    parsePatterns: Ly,
    defaultParseWidth: "any"
  }),
  dayPeriod: Ze({
    matchPatterns: By,
    defaultMatchWidth: "any",
    parsePatterns: Vy,
    defaultParseWidth: "any"
  })
}, Yy = {
  code: "id",
  formatDistance: hy,
  formatLong: yy,
  formatRelative: xy,
  localize: My,
  match: Hy,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
}, dl = {
  ...Gt,
  labels: {
    labelDayButton: (e, t, n, r) => {
      let o;
      r && typeof r.format == "function" ? o = r.format.bind(r) : o = (s, i) => qt(s, i, { locale: Gt, ...n });
      let a = o(e, "PPPP");
      return t.today && (a = `Today, ${a}`), t.selected && (a = `${a}, selected`), a;
    },
    labelMonthDropdown: "Choose the Month",
    labelNext: "Go to the Next Month",
    labelPrevious: "Go to the Previous Month",
    labelWeekNumber: (e) => `Week ${e}`,
    labelYearDropdown: "Choose the Year",
    labelGrid: (e, t, n) => {
      let r;
      return n && typeof n.format == "function" ? r = n.format.bind(n) : r = (o, a) => qt(o, a, { locale: Gt, ...t }), r(e, "LLLL yyyy");
    },
    labelGridcell: (e, t, n, r) => {
      let o;
      r && typeof r.format == "function" ? o = r.format.bind(r) : o = (s, i) => qt(s, i, { locale: Gt, ...n });
      let a = o(e, "PPPP");
      return t != null && t.today && (a = `Today, ${a}`), a;
    },
    labelNav: "Navigation bar",
    labelWeekNumberHeader: "Week Number",
    labelWeekday: (e, t, n) => {
      let r;
      return n && typeof n.format == "function" ? r = n.format.bind(n) : r = (o, a) => qt(o, a, { locale: Gt, ...t }), r(e, "cccc");
    }
  }
};
class Oe {
  /**
   * Creates an instance of `DateLib`.
   *
   * @param options Configuration options for the date library.
   * @param overrides Custom overrides for the date library functions.
   */
  constructor(t, n) {
    this.Date = Date, this.today = () => {
      var r;
      return (r = this.overrides) != null && r.today ? this.overrides.today() : this.options.timeZone ? Se.tz(this.options.timeZone) : new this.Date();
    }, this.newDate = (r, o, a) => {
      var s;
      return (s = this.overrides) != null && s.newDate ? this.overrides.newDate(r, o, a) : this.options.timeZone ? new Se(r, o, a, this.options.timeZone) : new Date(r, o, a);
    }, this.addDays = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addDays ? this.overrides.addDays(r, o) : Qc(r, o);
    }, this.addMonths = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addMonths ? this.overrides.addMonths(r, o) : Jc(r, o);
    }, this.addWeeks = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addWeeks ? this.overrides.addWeeks(r, o) : Xv(r, o);
    }, this.addYears = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addYears ? this.overrides.addYears(r, o) : Zv(r, o);
    }, this.differenceInCalendarDays = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : Ba(r, o);
    }, this.differenceInCalendarMonths = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : nl(r, o);
    }, this.eachMonthOfInterval = (r) => {
      var o;
      return (o = this.overrides) != null && o.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : rb(r);
    }, this.eachYearOfInterval = (r) => {
      var i;
      const o = (i = this.overrides) != null && i.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : sb(r), a = new Set(o.map((c) => this.getYear(c)));
      if (a.size === o.length)
        return o;
      const s = [];
      return a.forEach((c) => {
        s.push(new Date(c, 0, 1));
      }), s;
    }, this.endOfBroadcastWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : my(r, this);
    }, this.endOfISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfISOWeek ? this.overrides.endOfISOWeek(r) : ib(r);
    }, this.endOfMonth = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfMonth ? this.overrides.endOfMonth(r) : nb(r);
    }, this.endOfWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.endOfWeek ? this.overrides.endOfWeek(r, o) : al(r, this.options);
    }, this.endOfYear = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfYear ? this.overrides.endOfYear(r) : ab(r);
    }, this.format = (r, o, a) => {
      var i;
      const s = (i = this.overrides) != null && i.format ? this.overrides.format(r, o, this.options) : qt(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(s) : s;
    }, this.getISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.getISOWeek ? this.overrides.getISOWeek(r) : Va(r);
    }, this.getMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getMonth ? this.overrides.getMonth(r, this.options) : ry(r, this.options);
    }, this.getYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getYear ? this.overrides.getYear(r, this.options) : oy(r, this.options);
    }, this.getWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getWeek ? this.overrides.getWeek(r, this.options) : Ha(r, this.options);
    }, this.isAfter = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isAfter ? this.overrides.isAfter(r, o) : ay(r, o);
    }, this.isBefore = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isBefore ? this.overrides.isBefore(r, o) : sy(r, o);
    }, this.isDate = (r) => {
      var o;
      return (o = this.overrides) != null && o.isDate ? this.overrides.isDate(r) : tl(r);
    }, this.isSameDay = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameDay ? this.overrides.isSameDay(r, o) : eb(r, o);
    }, this.isSameMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameMonth ? this.overrides.isSameMonth(r, o) : iy(r, o);
    }, this.isSameYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameYear ? this.overrides.isSameYear(r, o) : cy(r, o);
    }, this.max = (r) => {
      var o;
      return (o = this.overrides) != null && o.max ? this.overrides.max(r) : Qv(r);
    }, this.min = (r) => {
      var o;
      return (o = this.overrides) != null && o.min ? this.overrides.min(r) : Jv(r);
    }, this.setMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.setMonth ? this.overrides.setMonth(r, o) : ly(r, o);
    }, this.setYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.setYear ? this.overrides.setYear(r, o) : dy(r, o);
    }, this.startOfBroadcastWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : ll(r, this);
    }, this.startOfDay = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfDay ? this.overrides.startOfDay(r) : Nn(r);
    }, this.startOfISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfISOWeek ? this.overrides.startOfISOWeek(r) : Cn(r);
    }, this.startOfMonth = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfMonth ? this.overrides.startOfMonth(r) : ob(r);
    }, this.startOfWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.startOfWeek ? this.overrides.startOfWeek(r, this.options) : tn(r, this.options);
    }, this.startOfYear = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfYear ? this.overrides.startOfYear(r) : ol(r);
    }, this.options = { locale: dl, ...t }, this.overrides = n;
  }
  /**
   * Generates a mapping of Arabic digits (0-9) to the target numbering system
   * digits.
   *
   * @since 9.5.0
   * @returns A record mapping Arabic digits to the target numerals.
   */
  getDigitMap() {
    const { numerals: t = "latn" } = this.options, n = new Intl.NumberFormat("en-US", {
      numberingSystem: t
    }), r = {};
    for (let o = 0; o < 10; o++)
      r[o.toString()] = n.format(o);
    return r;
  }
  /**
   * Replaces Arabic digits in a string with the target numbering system digits.
   *
   * @since 9.5.0
   * @param input The string containing Arabic digits.
   * @returns The string with digits replaced.
   */
  replaceDigits(t) {
    const n = this.getDigitMap();
    return t.replace(/\d/g, (r) => n[r] || r);
  }
  /**
   * Formats a number using the configured numbering system.
   *
   * @since 9.5.0
   * @param value The number to format.
   * @returns The formatted number as a string.
   */
  formatNumber(t) {
    return this.replaceDigits(t.toString());
  }
  /**
   * Returns the preferred ordering for month and year labels for the current
   * locale.
   */
  getMonthYearOrder() {
    var n;
    const t = (n = this.options.locale) == null ? void 0 : n.code;
    return t && Oe.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: o } = this.options, a = n == null ? void 0 : n.code;
    if (a && Oe.yearFirstLocales.has(a))
      try {
        return new Intl.DateTimeFormat(a, {
          month: "long",
          year: "numeric",
          timeZone: r,
          numberingSystem: o
        }).format(t);
      } catch {
      }
    const s = this.getMonthYearOrder() === "year-first" ? "y LLLL" : "LLLL y";
    return this.format(t, s);
  }
}
Oe.yearFirstLocales = /* @__PURE__ */ new Set([
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
const nt = new Oe();
class ul {
  constructor(t, n, r = nt) {
    this.date = t, this.displayMonth = n, this.outside = !!(n && !r.isSameMonth(t, n)), this.dateLib = r, this.isoDate = r.format(t, "yyyy-MM-dd"), this.displayMonthId = r.format(n, "yyyy-MM"), this.dateMonthId = r.format(t, "yyyy-MM");
  }
  /**
   * Checks if this day is equal to another `CalendarDay`, considering both the
   * date and the displayed month.
   *
   * @param day The `CalendarDay` to compare with.
   * @returns `true` if the days are equal, otherwise `false`.
   */
  isEqualTo(t) {
    return this.dateLib.isSameDay(t.date, this.date) && this.dateLib.isSameMonth(t.displayMonth, this.displayMonth);
  }
}
class zy {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class jy {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function Gy(e) {
  return P.createElement("button", { ...e });
}
function Uy(e) {
  return P.createElement("span", { ...e });
}
function Ky(e) {
  const { size: t = 24, orientation: n = "left", className: r } = e;
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: handled by the parent component
    P.createElement(
      "svg",
      { className: r, width: t, height: t, viewBox: "0 0 24 24" },
      n === "up" && P.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
      n === "down" && P.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
      n === "left" && P.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
      n === "right" && P.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
    )
  );
}
function qy(e) {
  const { day: t, modifiers: n, ...r } = e;
  return P.createElement("td", { ...r });
}
function Xy(e) {
  const { day: t, modifiers: n, ...r } = e, o = P.useRef(null);
  return P.useEffect(() => {
    var a;
    n.focused && ((a = o.current) == null || a.focus());
  }, [n.focused]), P.createElement("button", { ref: o, ...r });
}
var U;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(U || (U = {}));
var me;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(me || (me = {}));
var Ye;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(Ye || (Ye = {}));
var Te;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(Te || (Te = {}));
function Zy(e) {
  const { options: t, className: n, components: r, classNames: o, ...a } = e, s = [o[U.Dropdown], n].join(" "), i = t == null ? void 0 : t.find(({ value: c }) => c === a.value);
  return P.createElement(
    "span",
    { "data-disabled": a.disabled, className: o[U.DropdownRoot] },
    P.createElement(r.Select, { className: s, ...a }, t == null ? void 0 : t.map(({ value: c, label: d, disabled: m }) => P.createElement(r.Option, { key: c, value: c, disabled: m }, d))),
    P.createElement(
      "span",
      { className: o[U.CaptionLabel], "aria-hidden": !0 },
      i == null ? void 0 : i.label,
      P.createElement(r.Chevron, { orientation: "down", size: 18, className: o[U.Chevron] })
    )
  );
}
function Qy(e) {
  return P.createElement("div", { ...e });
}
function Jy(e) {
  return P.createElement("div", { ...e });
}
function ew(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return P.createElement("div", { ...r }, e.children);
}
function tw(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return P.createElement("div", { ...r });
}
function nw(e) {
  return P.createElement("table", { ...e });
}
function rw(e) {
  return P.createElement("div", { ...e });
}
const fl = Ch(void 0);
function On() {
  const e = Nh(fl);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function ow(e) {
  const { components: t } = On();
  return P.createElement(t.Dropdown, { ...e });
}
function aw(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...a } = e, { components: s, classNames: i, labels: { labelPrevious: c, labelNext: d } } = On(), m = Ie((p) => {
    o && (n == null || n(p));
  }, [o, n]), f = Ie((p) => {
    r && (t == null || t(p));
  }, [r, t]);
  return P.createElement(
    "nav",
    { ...a },
    P.createElement(
      s.PreviousMonthButton,
      { type: "button", className: i[U.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": c(r), onClick: f },
      P.createElement(s.Chevron, { disabled: r ? void 0 : !0, className: i[U.Chevron], orientation: "left" })
    ),
    P.createElement(
      s.NextMonthButton,
      { type: "button", className: i[U.NextMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": d(o), onClick: m },
      P.createElement(s.Chevron, { disabled: o ? void 0 : !0, orientation: "right", className: i[U.Chevron] })
    )
  );
}
function sw(e) {
  const { components: t } = On();
  return P.createElement(t.Button, { ...e });
}
function iw(e) {
  return P.createElement("option", { ...e });
}
function cw(e) {
  const { components: t } = On();
  return P.createElement(t.Button, { ...e });
}
function lw(e) {
  const { rootRef: t, ...n } = e;
  return P.createElement("div", { ...n, ref: t });
}
function dw(e) {
  return P.createElement("select", { ...e });
}
function uw(e) {
  const { week: t, ...n } = e;
  return P.createElement("tr", { ...n });
}
function fw(e) {
  return P.createElement("th", { ...e });
}
function mw(e) {
  return P.createElement(
    "thead",
    { "aria-hidden": !0 },
    P.createElement("tr", { ...e })
  );
}
function pw(e) {
  const { week: t, ...n } = e;
  return P.createElement("th", { ...n });
}
function hw(e) {
  return P.createElement("th", { ...e });
}
function gw(e) {
  return P.createElement("tbody", { ...e });
}
function vw(e) {
  const { components: t } = On();
  return P.createElement(t.Dropdown, { ...e });
}
const bw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: Gy,
  CaptionLabel: Uy,
  Chevron: Ky,
  Day: qy,
  DayButton: Xy,
  Dropdown: Zy,
  DropdownNav: Qy,
  Footer: Jy,
  Month: ew,
  MonthCaption: tw,
  MonthGrid: nw,
  Months: rw,
  MonthsDropdown: ow,
  Nav: aw,
  NextMonthButton: sw,
  Option: iw,
  PreviousMonthButton: cw,
  Root: lw,
  Select: dw,
  Week: uw,
  WeekNumber: pw,
  WeekNumberHeader: hw,
  Weekday: fw,
  Weekdays: mw,
  Weeks: gw,
  YearsDropdown: vw
}, Symbol.toStringTag, { value: "Module" }));
function st(e, t, n = !1, r = nt) {
  let { from: o, to: a } = e;
  const { differenceInCalendarDays: s, isSameDay: i } = r;
  return o && a ? (s(a, o) < 0 && ([o, a] = [a, o]), s(t, o) >= (n ? 1 : 0) && s(a, t) >= (n ? 1 : 0)) : !n && a ? i(a, t) : !n && o ? i(o, t) : !1;
}
function Ya(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function Br(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function za(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function ja(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function ml(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function pl(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function it(e, t, n = nt) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: a, isAfter: s } = n;
  return r.some((i) => {
    if (typeof i == "boolean")
      return i;
    if (n.isDate(i))
      return o(e, i);
    if (pl(i, n))
      return i.some((c) => o(e, c));
    if (Br(i))
      return st(i, e, !1, n);
    if (ml(i))
      return Array.isArray(i.dayOfWeek) ? i.dayOfWeek.includes(e.getDay()) : i.dayOfWeek === e.getDay();
    if (Ya(i)) {
      const c = a(i.before, e), d = a(i.after, e), m = c > 0, f = d < 0;
      return s(i.before, i.after) ? f && m : m || f;
    }
    return za(i) ? a(e, i.after) > 0 : ja(i) ? a(i.before, e) > 0 : typeof i == "function" ? i(e) : !1;
  });
}
function yw(e, t, n, r, o) {
  const { disabled: a, hidden: s, modifiers: i, showOutsideDays: c, broadcastCalendar: d, today: m = o.today() } = t, { isSameDay: f, isSameMonth: p, startOfMonth: h, isBefore: b, endOfMonth: g, isAfter: v } = o, w = n && h(n), y = r && g(r), x = {
    [me.focused]: [],
    [me.outside]: [],
    [me.disabled]: [],
    [me.hidden]: [],
    [me.today]: []
  }, S = {};
  for (const N of e) {
    const { date: C, displayMonth: E } = N, T = !!(E && !p(C, E)), D = !!(w && b(C, w)), A = !!(y && v(C, y)), W = !!(a && it(C, a, o)), $ = !!(s && it(C, s, o)) || D || A || // Broadcast calendar will show outside days as default
    !d && !c && T || d && c === !1 && T, z = f(C, m);
    T && x.outside.push(N), W && x.disabled.push(N), $ && x.hidden.push(N), z && x.today.push(N), i && Object.keys(i).forEach((O) => {
      const j = i == null ? void 0 : i[O];
      j && it(C, j, o) && (S[O] ? S[O].push(N) : S[O] = [N]);
    });
  }
  return (N) => {
    const C = {
      [me.focused]: !1,
      [me.disabled]: !1,
      [me.hidden]: !1,
      [me.outside]: !1,
      [me.today]: !1
    }, E = {};
    for (const T in x) {
      const D = x[T];
      C[T] = D.some((A) => A === N);
    }
    for (const T in S)
      E[T] = S[T].some((D) => D === N);
    return {
      ...C,
      // custom modifiers should override all the previous ones
      ...E
    };
  };
}
function ww(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [a]) => (n[a] ? o.push(n[a]) : t[me[a]] ? o.push(t[me[a]]) : t[Ye[a]] && o.push(t[Ye[a]]), o), [t[U.Day]]);
}
function xw(e) {
  return {
    ...bw,
    ...e
  };
}
function Sw(e) {
  const t = {
    "data-mode": e.mode ?? void 0,
    "data-required": "required" in e ? e.required : void 0,
    "data-multiple-months": e.numberOfMonths && e.numberOfMonths > 1 || void 0,
    "data-week-numbers": e.showWeekNumber || void 0,
    "data-broadcast-calendar": e.broadcastCalendar || void 0,
    "data-nav-layout": e.navLayout || void 0
  };
  return Object.entries(e).forEach(([n, r]) => {
    n.startsWith("data-") && (t[n] = r);
  }), t;
}
function Ga() {
  const e = {};
  for (const t in U)
    e[U[t]] = `rdp-${U[t]}`;
  for (const t in me)
    e[me[t]] = `rdp-${me[t]}`;
  for (const t in Ye)
    e[Ye[t]] = `rdp-${Ye[t]}`;
  for (const t in Te)
    e[Te[t]] = `rdp-${Te[t]}`;
  return e;
}
function hl(e, t, n) {
  return (n ?? new Oe(t)).formatMonthYear(e);
}
const Cw = hl;
function Nw(e, t, n) {
  return (n ?? new Oe(t)).format(e, "d");
}
function Ew(e, t = nt) {
  return t.format(e, "LLLL");
}
function kw(e, t, n) {
  return (n ?? new Oe(t)).format(e, "cccccc");
}
function Pw(e, t = nt) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function Rw() {
  return "";
}
function gl(e, t = nt) {
  return t.format(e, "yyyy");
}
const Mw = gl, Tw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: hl,
  formatDay: Nw,
  formatMonthCaption: Cw,
  formatMonthDropdown: Ew,
  formatWeekNumber: Pw,
  formatWeekNumberHeader: Rw,
  formatWeekdayName: kw,
  formatYearCaption: Mw,
  formatYearDropdown: gl
}, Symbol.toStringTag, { value: "Module" }));
function _w(e) {
  return e != null && e.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e != null && e.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...Tw,
    ...e
  };
}
function Ua(e, t, n, r) {
  let o = (r ?? new Oe(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const Dw = Ua;
function Ka(e, t, n) {
  return (n ?? new Oe(t)).formatMonthYear(e);
}
const Ow = Ka;
function vl(e, t, n, r) {
  let o = (r ?? new Oe(n)).format(e, "PPPP");
  return t != null && t.today && (o = `Today, ${o}`), o;
}
function bl(e) {
  return "Choose the Month";
}
function yl() {
  return "";
}
const Aw = "Go to the Next Month";
function wl(e, t) {
  return Aw;
}
function xl(e) {
  return "Go to the Previous Month";
}
function Sl(e, t, n) {
  return (n ?? new Oe(t)).format(e, "cccc");
}
function Cl(e, t) {
  return `Week ${e}`;
}
function Nl(e) {
  return "Week Number";
}
function El(e) {
  return "Choose the Year";
}
const Iw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: Ow,
  labelDay: Dw,
  labelDayButton: Ua,
  labelGrid: Ka,
  labelGridcell: vl,
  labelMonthDropdown: bl,
  labelNav: yl,
  labelNext: wl,
  labelPrevious: xl,
  labelWeekNumber: Cl,
  labelWeekNumberHeader: Nl,
  labelWeekday: Sl,
  labelYearDropdown: El
}, Symbol.toStringTag, { value: "Module" })), Be = (e, t, n) => t || (n ? typeof n == "function" ? n : (...r) => n : e);
function $w(e, t) {
  var r;
  const n = ((r = t.locale) == null ? void 0 : r.labels) ?? {};
  return {
    ...Iw,
    ...e ?? {},
    labelDayButton: Be(Ua, e == null ? void 0 : e.labelDayButton, n.labelDayButton),
    labelMonthDropdown: Be(bl, e == null ? void 0 : e.labelMonthDropdown, n.labelMonthDropdown),
    labelNext: Be(wl, e == null ? void 0 : e.labelNext, n.labelNext),
    labelPrevious: Be(xl, e == null ? void 0 : e.labelPrevious, n.labelPrevious),
    labelWeekNumber: Be(Cl, e == null ? void 0 : e.labelWeekNumber, n.labelWeekNumber),
    labelYearDropdown: Be(El, e == null ? void 0 : e.labelYearDropdown, n.labelYearDropdown),
    labelGrid: Be(Ka, e == null ? void 0 : e.labelGrid, n.labelGrid),
    labelGridcell: Be(vl, e == null ? void 0 : e.labelGridcell, n.labelGridcell),
    labelNav: Be(yl, e == null ? void 0 : e.labelNav, n.labelNav),
    labelWeekNumberHeader: Be(Nl, e == null ? void 0 : e.labelWeekNumberHeader, n.labelWeekNumberHeader),
    labelWeekday: Be(Sl, e == null ? void 0 : e.labelWeekday, n.labelWeekday)
  };
}
function Ww(e, t, n, r, o) {
  const { startOfMonth: a, startOfYear: s, endOfYear: i, eachMonthOfInterval: c, getMonth: d } = o;
  return c({
    start: s(e),
    end: i(e)
  }).map((p) => {
    const h = r.formatMonthDropdown(p, o), b = d(p), g = t && p < a(t) || n && p > a(n) || !1;
    return { value: b, label: h, disabled: g };
  });
}
function Fw(e, t = {}, n = {}) {
  let r = { ...t == null ? void 0 : t[U.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n == null ? void 0 : n[o]
    };
  }), r;
}
function Lw(e, t, n, r) {
  const o = r ?? e.today(), a = n ? e.startOfBroadcastWeek(o, e) : t ? e.startOfISOWeek(o) : e.startOfWeek(o), s = [];
  for (let i = 0; i < 7; i++) {
    const c = e.addDays(a, i);
    s.push(c);
  }
  return s;
}
function Bw(e, t, n, r, o = !1) {
  if (!e || !t)
    return;
  const { startOfYear: a, endOfYear: s, eachYearOfInterval: i, getYear: c } = r, d = a(e), m = s(t), f = i({ start: d, end: m });
  return o && f.reverse(), f.map((p) => {
    const h = n.formatYearDropdown(p, r);
    return {
      value: c(p),
      label: h,
      disabled: !1
    };
  });
}
function Vw(e, t = {}) {
  var i;
  const { weekStartsOn: n, locale: r } = t, o = n ?? ((i = r == null ? void 0 : r.options) == null ? void 0 : i.weekStartsOn) ?? 0, a = (c) => {
    const d = typeof c == "number" || typeof c == "string" ? new Date(c) : c;
    return new Se(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0, e);
  }, s = (c) => {
    const d = a(c);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
  };
  return {
    today: () => a(Se.tz(e)),
    newDate: (c, d, m) => new Se(c, d, m, 12, 0, 0, e),
    startOfDay: (c) => a(c),
    startOfWeek: (c, d) => {
      const m = a(c), f = (d == null ? void 0 : d.weekStartsOn) ?? o, p = (m.getDay() - f + 7) % 7;
      return m.setDate(m.getDate() - p), m;
    },
    startOfISOWeek: (c) => {
      const d = a(c), m = (d.getDay() - 1 + 7) % 7;
      return d.setDate(d.getDate() - m), d;
    },
    startOfMonth: (c) => {
      const d = a(c);
      return d.setDate(1), d;
    },
    startOfYear: (c) => {
      const d = a(c);
      return d.setMonth(0, 1), d;
    },
    endOfWeek: (c, d) => {
      const m = a(c), h = ((((d == null ? void 0 : d.weekStartsOn) ?? o) + 6) % 7 - m.getDay() + 7) % 7;
      return m.setDate(m.getDate() + h), m;
    },
    endOfISOWeek: (c) => {
      const d = a(c), m = (7 - d.getDay()) % 7;
      return d.setDate(d.getDate() + m), d;
    },
    endOfMonth: (c) => {
      const d = a(c);
      return d.setMonth(d.getMonth() + 1, 0), d;
    },
    endOfYear: (c) => {
      const d = a(c);
      return d.setMonth(11, 31), d;
    },
    eachMonthOfInterval: (c) => {
      const d = a(c.start), m = a(c.end), f = [], p = new Se(d.getFullYear(), d.getMonth(), 1, 12, 0, 0, e), h = m.getFullYear() * 12 + m.getMonth();
      for (; p.getFullYear() * 12 + p.getMonth() <= h; )
        f.push(new Se(p, e)), p.setMonth(p.getMonth() + 1, 1);
      return f;
    },
    // Normalize to noon once before arithmetic (avoid DST/midnight edge cases),
    // mutate the same TZDate, and return it.
    addDays: (c, d) => {
      const m = a(c);
      return m.setDate(m.getDate() + d), m;
    },
    addWeeks: (c, d) => {
      const m = a(c);
      return m.setDate(m.getDate() + d * 7), m;
    },
    addMonths: (c, d) => {
      const m = a(c);
      return m.setMonth(m.getMonth() + d), m;
    },
    addYears: (c, d) => {
      const m = a(c);
      return m.setFullYear(m.getFullYear() + d), m;
    },
    eachYearOfInterval: (c) => {
      const d = a(c.start), m = a(c.end), f = [], p = new Se(d.getFullYear(), 0, 1, 12, 0, 0, e);
      for (; p.getFullYear() <= m.getFullYear(); )
        f.push(new Se(p, e)), p.setFullYear(p.getFullYear() + 1, 0, 1);
      return f;
    },
    getWeek: (c, d) => {
      var f;
      const m = s(c);
      return Ha(m, {
        weekStartsOn: (d == null ? void 0 : d.weekStartsOn) ?? o,
        firstWeekContainsDate: (d == null ? void 0 : d.firstWeekContainsDate) ?? ((f = r == null ? void 0 : r.options) == null ? void 0 : f.firstWeekContainsDate) ?? 1
      });
    },
    getISOWeek: (c) => {
      const d = s(c);
      return Va(d);
    },
    differenceInCalendarDays: (c, d) => {
      const m = s(c), f = s(d);
      return Ba(m, f);
    },
    differenceInCalendarMonths: (c, d) => {
      const m = s(c), f = s(d);
      return nl(m, f);
    }
  };
}
const An = (e) => e instanceof HTMLElement ? e : null, To = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], Hw = (e) => An(e.querySelector("[data-animated-month]")), _o = (e) => An(e.querySelector("[data-animated-caption]")), Do = (e) => An(e.querySelector("[data-animated-weeks]")), Yw = (e) => An(e.querySelector("[data-animated-nav]")), zw = (e) => An(e.querySelector("[data-animated-weekdays]"));
function jw(e, t, { classNames: n, months: r, focused: o, dateLib: a }) {
  const s = ir(null), i = ir(r), c = ir(!1);
  ic(() => {
    const d = i.current;
    if (i.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || d.length === 0 || r.length !== d.length)
      return;
    const m = a.isSameMonth(r[0].date, d[0].date), f = a.isAfter(r[0].date, d[0].date), p = f ? n[Te.caption_after_enter] : n[Te.caption_before_enter], h = f ? n[Te.weeks_after_enter] : n[Te.weeks_before_enter], b = s.current, g = e.current.cloneNode(!0);
    if (g instanceof HTMLElement ? (To(g).forEach((x) => {
      if (!(x instanceof HTMLElement))
        return;
      const S = Hw(x);
      S && x.contains(S) && x.removeChild(S);
      const N = _o(x);
      N && N.classList.remove(p);
      const C = Do(x);
      C && C.classList.remove(h);
    }), s.current = g) : s.current = null, c.current || m || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const v = b instanceof HTMLElement ? To(b) : [], w = To(e.current);
    if (w != null && w.every((y) => y instanceof HTMLElement) && v && v.every((y) => y instanceof HTMLElement)) {
      c.current = !0, e.current.style.isolation = "isolate";
      const y = Yw(e.current);
      y && (y.style.zIndex = "1"), w.forEach((x, S) => {
        const N = v[S];
        if (!N)
          return;
        x.style.position = "relative", x.style.overflow = "hidden";
        const C = _o(x);
        C && C.classList.add(p);
        const E = Do(x);
        E && E.classList.add(h);
        const T = () => {
          c.current = !1, e.current && (e.current.style.isolation = ""), y && (y.style.zIndex = ""), C && C.classList.remove(p), E && E.classList.remove(h), x.style.position = "", x.style.overflow = "", x.contains(N) && x.removeChild(N);
        };
        N.style.pointerEvents = "none", N.style.position = "absolute", N.style.overflow = "hidden", N.setAttribute("aria-hidden", "true");
        const D = zw(N);
        D && (D.style.opacity = "0");
        const A = _o(N);
        A && (A.classList.add(f ? n[Te.caption_before_exit] : n[Te.caption_after_exit]), A.addEventListener("animationend", T));
        const W = Do(N);
        W && W.classList.add(f ? n[Te.weeks_before_exit] : n[Te.weeks_after_exit]), x.insertBefore(N, x.firstChild);
      });
    }
  });
}
function Gw(e, t, n, r) {
  const o = e[0], a = e[e.length - 1], { ISOWeek: s, fixedWeeks: i, broadcastCalendar: c } = n ?? {}, { addDays: d, differenceInCalendarDays: m, differenceInCalendarMonths: f, endOfBroadcastWeek: p, endOfISOWeek: h, endOfMonth: b, endOfWeek: g, isAfter: v, startOfBroadcastWeek: w, startOfISOWeek: y, startOfWeek: x } = r, S = c ? w(o, r) : s ? y(o) : x(o), N = c ? p(a) : s ? h(b(a)) : g(b(a)), C = t && (c ? p(t) : s ? h(t) : g(t)), E = C && v(N, C) ? C : N, T = m(E, S), D = f(a, o) + 1, A = [];
  for (let z = 0; z <= T; z++) {
    const O = d(S, z);
    A.push(O);
  }
  const $ = (c ? 35 : 42) * D;
  if (i && A.length < $) {
    const z = $ - A.length;
    for (let O = 0; O < z; O++) {
      const j = d(A[A.length - 1], 1);
      A.push(j);
    }
  }
  return A;
}
function Uw(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((a, s) => a.concat(s.days.slice()), t.slice());
    return n.concat(o.slice());
  }, t.slice());
}
function Kw(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, a = [];
  for (let s = 0; s < o; s++) {
    const i = r.addMonths(e, s);
    if (t && i > t)
      break;
    a.push(i);
  }
  return a;
}
function hi(e, t, n, r) {
  const { month: o, defaultMonth: a, today: s = r.today(), numberOfMonths: i = 1 } = e;
  let c = o || a || s;
  const { differenceInCalendarMonths: d, addMonths: m, startOfMonth: f } = r;
  if (n && d(n, c) < i - 1) {
    const p = -1 * (i - 1);
    c = m(n, p);
  }
  return t && d(c, t) < 0 && (c = t), f(c);
}
function qw(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: a, endOfISOWeek: s, endOfMonth: i, endOfWeek: c, getISOWeek: d, getWeek: m, startOfBroadcastWeek: f, startOfISOWeek: p, startOfWeek: h } = r, b = e.reduce((g, v) => {
    const w = n.broadcastCalendar ? f(v, r) : n.ISOWeek ? p(v) : h(v), y = n.broadcastCalendar ? a(v) : n.ISOWeek ? s(i(v)) : c(i(v)), x = t.filter((E) => E >= w && E <= y), S = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && x.length < S) {
      const E = t.filter((T) => {
        const D = S - x.length;
        return T > y && T <= o(y, D);
      });
      x.push(...E);
    }
    const N = x.reduce((E, T) => {
      const D = n.ISOWeek ? d(T) : m(T), A = E.find(($) => $.weekNumber === D), W = new ul(T, v, r);
      return A ? A.days.push(W) : E.push(new jy(D, [W])), E;
    }, []), C = new zy(v, N);
    return g.push(C), g;
  }, []);
  return n.reverseMonths ? b.reverse() : b;
}
function Xw(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: a, startOfMonth: s, endOfMonth: i, addYears: c, endOfYear: d, newDate: m, today: f } = t, { fromYear: p, toYear: h, fromMonth: b, toMonth: g } = e;
  !n && b && (n = b), !n && p && (n = t.newDate(p, 0, 1)), !r && g && (r = g), !r && h && (r = m(h, 11, 31));
  const v = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = s(n) : p ? n = m(p, 0, 1) : !n && v && (n = o(c(e.today ?? f(), -100))), r ? r = i(r) : h ? r = m(h, 11, 31) : !r && v && (r = d(e.today ?? f())), [
    n && a(n),
    r && a(r)
  ];
}
function Zw(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a = 1 } = n, { startOfMonth: s, addMonths: i, differenceInCalendarMonths: c } = r, d = o ? a : 1, m = s(e);
  if (!t)
    return i(m, d);
  if (!(c(t, e) < a))
    return i(m, d);
}
function Qw(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a } = n, { startOfMonth: s, addMonths: i, differenceInCalendarMonths: c } = r, d = o ? a ?? 1 : 1, m = s(e);
  if (!t)
    return i(m, -d);
  if (!(c(m, t) <= 0))
    return i(m, -d);
}
function Jw(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function Vr(e, t) {
  const [n, r] = hr(e);
  return [t === void 0 ? n : t, r];
}
function ex(e, t) {
  var S;
  const [n, r] = Xw(e, t), { startOfMonth: o, endOfMonth: a } = t, s = hi(e, n, r, t), [i, c] = Vr(
    s,
    // initialMonth is always computed from props.month if provided
    e.month ? s : void 0
  );
  Eh(() => {
    const N = hi(e, n, r, t);
    c(N);
  }, [e.timeZone]);
  const { months: d, weeks: m, days: f, previousMonth: p, nextMonth: h } = cr(() => {
    const N = Kw(i, r, { numberOfMonths: e.numberOfMonths }, t), C = Gw(N, e.endMonth ? a(e.endMonth) : void 0, {
      ISOWeek: e.ISOWeek,
      fixedWeeks: e.fixedWeeks,
      broadcastCalendar: e.broadcastCalendar
    }, t), E = qw(N, C, {
      broadcastCalendar: e.broadcastCalendar,
      fixedWeeks: e.fixedWeeks,
      ISOWeek: e.ISOWeek,
      reverseMonths: e.reverseMonths
    }, t), T = Jw(E), D = Uw(E), A = Qw(i, n, e, t), W = Zw(i, r, e, t);
    return {
      months: E,
      weeks: T,
      days: D,
      previousMonth: A,
      nextMonth: W
    };
  }, [
    t,
    i.getTime(),
    r == null ? void 0 : r.getTime(),
    n == null ? void 0 : n.getTime(),
    e.disableNavigation,
    e.broadcastCalendar,
    (S = e.endMonth) == null ? void 0 : S.getTime(),
    e.fixedWeeks,
    e.ISOWeek,
    e.numberOfMonths,
    e.pagedNavigation,
    e.reverseMonths
  ]), { disableNavigation: b, onMonthChange: g } = e, v = (N) => m.some((C) => C.days.some((E) => E.isEqualTo(N))), w = (N) => {
    if (b)
      return;
    let C = o(N);
    n && C < o(n) && (C = o(n)), r && C > o(r) && (C = o(r)), c(C), g == null || g(C);
  };
  return {
    months: d,
    weeks: m,
    days: f,
    navStart: n,
    navEnd: r,
    previousMonth: p,
    nextMonth: h,
    goToMonth: w,
    goToDay: (N) => {
      v(N) || w(N.date);
    }
  };
}
var qe;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(qe || (qe = {}));
function gi(e) {
  return !e[me.disabled] && !e[me.hidden] && !e[me.outside];
}
function tx(e, t, n, r) {
  let o, a = -1;
  for (const s of e) {
    const i = t(s);
    gi(i) && (i[me.focused] && a < qe.FocusedModifier ? (o = s, a = qe.FocusedModifier) : r != null && r.isEqualTo(s) && a < qe.LastFocused ? (o = s, a = qe.LastFocused) : n(s.date) && a < qe.Selected ? (o = s, a = qe.Selected) : i[me.today] && a < qe.Today && (o = s, a = qe.Today));
  }
  return o || (o = e.find((s) => gi(t(s)))), o;
}
function nx(e, t, n, r, o, a, s) {
  const { ISOWeek: i, broadcastCalendar: c } = a, { addDays: d, addMonths: m, addWeeks: f, addYears: p, endOfBroadcastWeek: h, endOfISOWeek: b, endOfWeek: g, max: v, min: w, startOfBroadcastWeek: y, startOfISOWeek: x, startOfWeek: S } = s;
  let C = {
    day: d,
    week: f,
    month: m,
    year: p,
    startOfWeek: (E) => c ? y(E, s) : i ? x(E) : S(E),
    endOfWeek: (E) => c ? h(E) : i ? b(E) : g(E)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? C = v([r, C]) : t === "after" && o && (C = w([o, C])), C;
}
function kl(e, t, n, r, o, a, s, i = 0) {
  if (i > 365)
    return;
  const c = nx(e, t, n.date, r, o, a, s), d = !!(a.disabled && it(c, a.disabled, s)), m = !!(a.hidden && it(c, a.hidden, s)), f = c, p = new ul(c, f, s);
  return !d && !m ? p : kl(e, t, p, r, o, a, s, i + 1);
}
function rx(e, t, n, r, o) {
  const { autoFocus: a } = e, [s, i] = hr(), c = tx(t.days, n, r || (() => !1), s), [d, m] = hr(a ? c : void 0);
  return {
    isFocusTarget: (g) => !!(c != null && c.isEqualTo(g)),
    setFocused: m,
    focused: d,
    blur: () => {
      i(d), m(void 0);
    },
    moveFocus: (g, v) => {
      if (!d)
        return;
      const w = kl(g, v, d, t.navStart, t.navEnd, e, o);
      w && (e.disableNavigation && !t.days.some((x) => x.isEqualTo(w)) || (t.goToDay(w), m(w)));
    }
  };
}
function ox(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, s] = Vr(n, o ? n : void 0), i = o ? n : a, { isSameDay: c } = t, d = (h) => (i == null ? void 0 : i.some((b) => c(b, h))) ?? !1, { min: m, max: f } = e;
  return {
    selected: i,
    select: (h, b, g) => {
      let v = [...i ?? []];
      if (d(h)) {
        if ((i == null ? void 0 : i.length) === m || r && (i == null ? void 0 : i.length) === 1)
          return;
        v = i == null ? void 0 : i.filter((w) => !c(w, h));
      } else
        (i == null ? void 0 : i.length) === f ? v = [h] : v = [...v, h];
      return o || s(v), o == null || o(v, h, b, g), v;
    },
    isSelected: d
  };
}
function ax(e, t, n = 0, r = 0, o = !1, a = nt) {
  const { from: s, to: i } = t || {}, { isSameDay: c, isAfter: d, isBefore: m } = a;
  let f;
  if (!s && !i)
    f = { from: e, to: n > 0 ? void 0 : e };
  else if (s && !i)
    c(s, e) ? n === 0 ? f = { from: s, to: e } : o ? f = { from: s, to: void 0 } : f = void 0 : m(e, s) ? f = { from: e, to: s } : f = { from: s, to: e };
  else if (s && i)
    if (c(s, e) && c(i, e))
      o ? f = { from: s, to: i } : f = void 0;
    else if (c(s, e))
      f = { from: s, to: n > 0 ? void 0 : e };
    else if (c(i, e))
      f = { from: e, to: n > 0 ? void 0 : e };
    else if (m(e, s))
      f = { from: e, to: i };
    else if (d(e, s))
      f = { from: s, to: e };
    else if (d(e, i))
      f = { from: s, to: e };
    else
      throw new Error("Invalid range");
  if (f != null && f.from && (f != null && f.to)) {
    const p = a.differenceInCalendarDays(f.to, f.from);
    r > 0 && p > r ? f = { from: e, to: void 0 } : n > 1 && p < n && (f = { from: e, to: void 0 });
  }
  return f;
}
function sx(e, t, n = nt) {
  const r = Array.isArray(t) ? t : [t];
  let o = e.from;
  const a = n.differenceInCalendarDays(e.to, e.from), s = Math.min(a, 6);
  for (let i = 0; i <= s; i++) {
    if (r.includes(o.getDay()))
      return !0;
    o = n.addDays(o, 1);
  }
  return !1;
}
function vi(e, t, n = nt) {
  return st(e, t.from, !1, n) || st(e, t.to, !1, n) || st(t, e.from, !1, n) || st(t, e.to, !1, n);
}
function ix(e, t, n = nt) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((i) => typeof i != "function").some((i) => typeof i == "boolean" ? i : n.isDate(i) ? st(e, i, !1, n) : pl(i, n) ? i.some((c) => st(e, c, !1, n)) : Br(i) ? i.from && i.to ? vi(e, { from: i.from, to: i.to }, n) : !1 : ml(i) ? sx(e, i.dayOfWeek, n) : Ya(i) ? n.isAfter(i.before, i.after) ? vi(e, {
    from: n.addDays(i.after, 1),
    to: n.addDays(i.before, -1)
  }, n) : it(e.from, i, n) || it(e.to, i, n) : za(i) || ja(i) ? it(e.from, i, n) || it(e.to, i, n) : !1))
    return !0;
  const s = r.filter((i) => typeof i == "function");
  if (s.length) {
    let i = e.from;
    const c = n.differenceInCalendarDays(e.to, e.from);
    for (let d = 0; d <= c; d++) {
      if (s.some((m) => m(i)))
        return !0;
      i = n.addDays(i, 1);
    }
  }
  return !1;
}
function cx(e, t) {
  const { disabled: n, excludeDisabled: r, resetOnSelect: o, selected: a, required: s, onSelect: i } = e, [c, d] = Vr(a, i ? a : void 0), m = i ? a : c;
  return {
    selected: m,
    select: (h, b, g) => {
      const { min: v, max: w } = e;
      let y;
      if (h) {
        const x = m == null ? void 0 : m.from, S = m == null ? void 0 : m.to, N = !!x && !!S, C = !!x && !!S && t.isSameDay(x, S) && t.isSameDay(h, x);
        o && (N || !(m != null && m.from)) ? !s && C ? y = void 0 : y = { from: h, to: void 0 } : y = ax(h, m, v, w, s, t);
      }
      return r && n && (y != null && y.from) && y.to && ix({ from: y.from, to: y.to }, n, t) && (y.from = h, y.to = void 0), i || d(y), i == null || i(y, h, b, g), y;
    },
    isSelected: (h) => m && st(m, h, !1, t)
  };
}
function lx(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, s] = Vr(n, o ? n : void 0), i = o ? n : a, { isSameDay: c } = t;
  return {
    selected: i,
    select: (f, p, h) => {
      let b = f;
      return !r && i && i && c(f, i) && (b = void 0), o || s(b), o == null || o(b, f, p, h), b;
    },
    isSelected: (f) => i ? c(i, f) : !1
  };
}
function dx(e, t) {
  const n = lx(e, t), r = ox(e, t), o = cx(e, t);
  switch (e.mode) {
    case "single":
      return n;
    case "multiple":
      return r;
    case "range":
      return o;
    default:
      return;
  }
}
function $e(e, t) {
  return e instanceof Se && e.timeZone === t ? e : new Se(e, t);
}
function Ht(e, t, n) {
  return $e(e, t);
}
function bi(e, t, n) {
  return typeof e == "boolean" || typeof e == "function" ? e : e instanceof Date ? Ht(e, t) : Array.isArray(e) ? e.map((r) => r instanceof Date ? Ht(r, t) : r) : Br(e) ? {
    ...e,
    from: e.from ? $e(e.from, t) : e.from,
    to: e.to ? $e(e.to, t) : e.to
  } : Ya(e) ? {
    before: Ht(e.before, t),
    after: Ht(e.after, t)
  } : za(e) ? {
    after: Ht(e.after, t)
  } : ja(e) ? {
    before: Ht(e.before, t)
  } : e;
}
function Oo(e, t, n) {
  return e && (Array.isArray(e) ? e.map((r) => bi(r, t)) : bi(e, t));
}
function ux(e) {
  var qs;
  let t = e;
  const n = t.timeZone;
  if (n && (t = {
    ...e,
    timeZone: n
  }, t.today && (t.today = $e(t.today, n)), t.month && (t.month = $e(t.month, n)), t.defaultMonth && (t.defaultMonth = $e(t.defaultMonth, n)), t.startMonth && (t.startMonth = $e(t.startMonth, n)), t.endMonth && (t.endMonth = $e(t.endMonth, n)), t.mode === "single" && t.selected ? t.selected = $e(t.selected, n) : t.mode === "multiple" && t.selected ? t.selected = (qs = t.selected) == null ? void 0 : qs.map((ne) => $e(ne, n)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? $e(t.selected.from, n) : t.selected.from,
    to: t.selected.to ? $e(t.selected.to, n) : t.selected.to
  }), t.disabled !== void 0 && (t.disabled = Oo(t.disabled, n)), t.hidden !== void 0 && (t.hidden = Oo(t.hidden, n)), t.modifiers)) {
    const ne = {};
    Object.keys(t.modifiers).forEach((le) => {
      var X;
      ne[le] = Oo((X = t.modifiers) == null ? void 0 : X[le], n);
    }), t.modifiers = ne;
  }
  const { components: r, formatters: o, labels: a, dateLib: s, locale: i, classNames: c } = cr(() => {
    const ne = { ...dl, ...t.locale }, le = t.broadcastCalendar ? 1 : t.weekStartsOn, X = t.noonSafe && t.timeZone ? Vw(t.timeZone, {
      weekStartsOn: le,
      locale: ne
    }) : void 0, se = t.dateLib && X ? { ...X, ...t.dateLib } : t.dateLib ?? X, Me = new Oe({
      locale: ne,
      weekStartsOn: le,
      firstWeekContainsDate: t.firstWeekContainsDate,
      useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
      useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
      timeZone: t.timeZone,
      numerals: t.numerals
    }, se);
    return {
      dateLib: Me,
      components: xw(t.components),
      formatters: _w(t.formatters),
      labels: $w(t.labels, Me.options),
      locale: ne,
      classNames: { ...Ga(), ...t.classNames }
    };
  }, [
    t.locale,
    t.broadcastCalendar,
    t.weekStartsOn,
    t.firstWeekContainsDate,
    t.useAdditionalWeekYearTokens,
    t.useAdditionalDayOfYearTokens,
    t.timeZone,
    t.numerals,
    t.dateLib,
    t.noonSafe,
    t.components,
    t.formatters,
    t.labels,
    t.classNames
  ]);
  t.today || (t = { ...t, today: s.today() });
  const { captionLayout: d, mode: m, navLayout: f, numberOfMonths: p = 1, onDayBlur: h, onDayClick: b, onDayFocus: g, onDayKeyDown: v, onDayMouseEnter: w, onDayMouseLeave: y, onNextClick: x, onPrevClick: S, showWeekNumber: N, styles: C } = t, { formatCaption: E, formatDay: T, formatMonthDropdown: D, formatWeekNumber: A, formatWeekNumberHeader: W, formatWeekdayName: $, formatYearDropdown: z } = o, O = ex(t, s), { days: j, months: V, navStart: G, navEnd: B, previousMonth: I, nextMonth: Z, goToMonth: Q } = O, M = yw(j, t, G, B, s), { isSelected: Y, select: K, selected: H } = dx(t, s) ?? {}, { blur: ee, focused: F, isFocusTarget: te, moveFocus: J, setFocused: oe } = rx(t, O, M, Y ?? (() => !1), s), { labelDayButton: ie, labelGridcell: ce, labelGrid: Ee, labelMonthDropdown: Ae, labelNav: ut, labelPrevious: kt, labelNext: Pt, labelWeekday: xo, labelWeekNumber: Bt, labelWeekNumberHeader: ah, labelYearDropdown: sh } = a, ih = cr(() => Lw(s, t.ISOWeek, t.broadcastCalendar, t.today), [s, t.ISOWeek, t.broadcastCalendar, t.today]), Us = m !== void 0 || b !== void 0, So = Ie(() => {
    I && (Q(I), S == null || S(I));
  }, [I, Q, S]), Co = Ie(() => {
    Z && (Q(Z), x == null || x(Z));
  }, [Q, Z, x]), ch = Ie((ne, le) => (X) => {
    X.preventDefault(), X.stopPropagation(), oe(ne), !le.disabled && (K == null || K(ne.date, le, X), b == null || b(ne.date, le, X));
  }, [K, b, oe]), lh = Ie((ne, le) => (X) => {
    oe(ne), g == null || g(ne.date, le, X);
  }, [g, oe]), dh = Ie((ne, le) => (X) => {
    ee(), h == null || h(ne.date, le, X);
  }, [ee, h]), uh = Ie((ne, le) => (X) => {
    const se = {
      ArrowLeft: [
        X.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        X.shiftKey ? "month" : "day",
        t.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [X.shiftKey ? "year" : "week", "after"],
      ArrowUp: [X.shiftKey ? "year" : "week", "before"],
      PageUp: [X.shiftKey ? "year" : "month", "before"],
      PageDown: [X.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (se[X.key]) {
      X.preventDefault(), X.stopPropagation();
      const [Me, ae] = se[X.key];
      J(Me, ae);
    }
    v == null || v(ne.date, le, X);
  }, [J, v, t.dir]), fh = Ie((ne, le) => (X) => {
    w == null || w(ne.date, le, X);
  }, [w]), mh = Ie((ne, le) => (X) => {
    y == null || y(ne.date, le, X);
  }, [y]), ph = Ie((ne) => (le) => {
    const X = Number(le.target.value), se = s.setMonth(s.startOfMonth(ne), X);
    Q(se);
  }, [s, Q]), hh = Ie((ne) => (le) => {
    const X = Number(le.target.value), se = s.setYear(s.startOfMonth(ne), X);
    Q(se);
  }, [s, Q]), { className: gh, style: vh } = cr(() => ({
    className: [c[U.Root], t.className].filter(Boolean).join(" "),
    style: { ...C == null ? void 0 : C[U.Root], ...t.style }
  }), [c, t.className, t.style, C]), bh = Sw(t), Ks = ir(null);
  jw(Ks, !!t.animate, {
    classNames: c,
    months: V,
    focused: F,
    dateLib: s
  });
  const yh = {
    dayPickerProps: t,
    selected: H,
    select: K,
    isSelected: Y,
    months: V,
    nextMonth: Z,
    previousMonth: I,
    goToMonth: Q,
    getModifiers: M,
    components: r,
    classNames: c,
    styles: C,
    labels: a,
    formatters: o
  };
  return P.createElement(
    fl.Provider,
    { value: yh },
    P.createElement(
      r.Root,
      { rootRef: t.animate ? Ks : void 0, className: gh, style: vh, dir: t.dir, id: t.id, lang: t.lang ?? i.code, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...bh },
      P.createElement(
        r.Months,
        { className: c[U.Months], style: C == null ? void 0 : C[U.Months] },
        !t.hideNavigation && !f && P.createElement(r.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: c[U.Nav], style: C == null ? void 0 : C[U.Nav], "aria-label": ut(), onPreviousClick: So, onNextClick: Co, previousMonth: I, nextMonth: Z }),
        V.map((ne, le) => P.createElement(
          r.Month,
          {
            "data-animated-month": t.animate ? "true" : void 0,
            className: c[U.Month],
            style: C == null ? void 0 : C[U.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: le,
            displayIndex: le,
            calendarMonth: ne
          },
          f === "around" && !t.hideNavigation && le === 0 && P.createElement(
            r.PreviousMonthButton,
            { type: "button", className: c[U.PreviousMonthButton], tabIndex: I ? void 0 : -1, "aria-disabled": I ? void 0 : !0, "aria-label": kt(I), onClick: So, "data-animated-button": t.animate ? "true" : void 0 },
            P.createElement(r.Chevron, { disabled: I ? void 0 : !0, className: c[U.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          P.createElement(r.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: c[U.MonthCaption], style: C == null ? void 0 : C[U.MonthCaption], calendarMonth: ne, displayIndex: le }, d != null && d.startsWith("dropdown") ? P.createElement(
            r.DropdownNav,
            { className: c[U.Dropdowns], style: C == null ? void 0 : C[U.Dropdowns] },
            (() => {
              const X = d === "dropdown" || d === "dropdown-months" ? P.createElement(r.MonthsDropdown, { key: "month", className: c[U.MonthsDropdown], "aria-label": Ae(), classNames: c, components: r, disabled: !!t.disableNavigation, onChange: ph(ne.date), options: Ww(ne.date, G, B, o, s), style: C == null ? void 0 : C[U.Dropdown], value: s.getMonth(ne.date) }) : P.createElement("span", { key: "month" }, D(ne.date, s)), se = d === "dropdown" || d === "dropdown-years" ? P.createElement(r.YearsDropdown, { key: "year", className: c[U.YearsDropdown], "aria-label": sh(s.options), classNames: c, components: r, disabled: !!t.disableNavigation, onChange: hh(ne.date), options: Bw(G, B, o, s, !!t.reverseYears), style: C == null ? void 0 : C[U.Dropdown], value: s.getYear(ne.date) }) : P.createElement("span", { key: "year" }, z(ne.date, s));
              return s.getMonthYearOrder() === "year-first" ? [se, X] : [X, se];
            })(),
            P.createElement("span", { role: "status", "aria-live": "polite", style: {
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
            } }, E(ne.date, s.options, s))
          ) : P.createElement(r.CaptionLabel, { className: c[U.CaptionLabel], role: "status", "aria-live": "polite" }, E(ne.date, s.options, s))),
          f === "around" && !t.hideNavigation && le === p - 1 && P.createElement(
            r.NextMonthButton,
            { type: "button", className: c[U.NextMonthButton], tabIndex: Z ? void 0 : -1, "aria-disabled": Z ? void 0 : !0, "aria-label": Pt(Z), onClick: Co, "data-animated-button": t.animate ? "true" : void 0 },
            P.createElement(r.Chevron, { disabled: Z ? void 0 : !0, className: c[U.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          le === p - 1 && f === "after" && !t.hideNavigation && P.createElement(r.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: c[U.Nav], style: C == null ? void 0 : C[U.Nav], "aria-label": ut(), onPreviousClick: So, onNextClick: Co, previousMonth: I, nextMonth: Z }),
          P.createElement(
            r.MonthGrid,
            { role: "grid", "aria-multiselectable": m === "multiple" || m === "range", "aria-label": Ee(ne.date, s.options, s) || void 0, className: c[U.MonthGrid], style: C == null ? void 0 : C[U.MonthGrid] },
            !t.hideWeekdays && P.createElement(
              r.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: c[U.Weekdays], style: C == null ? void 0 : C[U.Weekdays] },
              N && P.createElement(r.WeekNumberHeader, { "aria-label": ah(s.options), className: c[U.WeekNumberHeader], style: C == null ? void 0 : C[U.WeekNumberHeader], scope: "col" }, W()),
              ih.map((X) => P.createElement(r.Weekday, { "aria-label": xo(X, s.options, s), className: c[U.Weekday], key: String(X), style: C == null ? void 0 : C[U.Weekday], scope: "col" }, $(X, s.options, s)))
            ),
            P.createElement(r.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: c[U.Weeks], style: C == null ? void 0 : C[U.Weeks] }, ne.weeks.map((X) => P.createElement(
              r.Week,
              { className: c[U.Week], key: X.weekNumber, style: C == null ? void 0 : C[U.Week], week: X },
              N && P.createElement(r.WeekNumber, { week: X, style: C == null ? void 0 : C[U.WeekNumber], "aria-label": Bt(X.weekNumber, {
                locale: i
              }), className: c[U.WeekNumber], scope: "row", role: "rowheader" }, A(X.weekNumber, s)),
              X.days.map((se) => {
                const { date: Me } = se, ae = M(se);
                if (ae[me.focused] = !ae.hidden && !!(F != null && F.isEqualTo(se)), ae[Ye.selected] = (Y == null ? void 0 : Y(Me)) || ae.selected, Br(H)) {
                  const { from: No, to: Eo } = H;
                  ae[Ye.range_start] = !!(No && Eo && s.isSameDay(Me, No)), ae[Ye.range_end] = !!(No && Eo && s.isSameDay(Me, Eo)), ae[Ye.range_middle] = st(H, Me, !0, s);
                }
                const wh = Fw(ae, C, t.modifiersStyles), xh = ww(ae, c, t.modifiersClassNames), Sh = !Us && !ae.hidden ? ce(Me, ae, s.options, s) : void 0;
                return P.createElement(r.Day, { key: `${se.isoDate}_${se.displayMonthId}`, day: se, modifiers: ae, className: xh.join(" "), style: wh, role: "gridcell", "aria-selected": ae.selected || void 0, "aria-label": Sh, "data-day": se.isoDate, "data-month": se.outside ? se.dateMonthId : void 0, "data-selected": ae.selected || void 0, "data-disabled": ae.disabled || void 0, "data-hidden": ae.hidden || void 0, "data-outside": se.outside || void 0, "data-focused": ae.focused || void 0, "data-today": ae.today || void 0 }, !ae.hidden && Us ? P.createElement(r.DayButton, { className: c[U.DayButton], style: C == null ? void 0 : C[U.DayButton], type: "button", day: se, modifiers: ae, disabled: !ae.focused && ae.disabled || void 0, "aria-disabled": ae.focused && ae.disabled || void 0, tabIndex: te(se) ? 0 : -1, "aria-label": ie(Me, ae, s.options, s), onClick: ch(se, ae), onBlur: dh(se, ae), onFocus: lh(se, ae), onKeyDown: uh(se, ae), onMouseEnter: fh(se, ae), onMouseLeave: mh(se, ae) }, T(Me, s.options, s)) : !ae.hidden && T(se.date, s.options, s));
              })
            )))
          )
        ))
      ),
      t.footer && P.createElement(r.Footer, { className: c[U.Footer], style: C == null ? void 0 : C[U.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
function fx({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  captionLayout: r = "label",
  buttonVariant: o = "ghost",
  formatters: a,
  components: s,
  ...i
}) {
  const c = Ga();
  return /* @__PURE__ */ u(
    ux,
    {
      showOutsideDays: n,
      className: k(
        "bg-background group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        e
      ),
      captionLayout: r,
      formatters: {
        formatMonthDropdown: (d) => d.toLocaleString("default", { month: "short" }),
        ...a
      },
      classNames: {
        root: k("w-fit", c.root),
        months: k("relative flex flex-col gap-4 md:flex-row", c.months),
        month: k("flex w-full flex-col gap-4", c.month),
        nav: k(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          c.nav
        ),
        button_previous: k(
          br({ variant: o }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50",
          c.button_previous
        ),
        button_next: k(
          br({ variant: o }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50",
          c.button_next
        ),
        month_caption: k(
          "flex h-[--cell-size] w-full items-center justify-center px-[--cell-size]",
          c.month_caption
        ),
        dropdowns: k(
          "flex h-[--cell-size] w-full items-center justify-center gap-1.5 text-sm font-medium",
          c.dropdowns
        ),
        dropdown_root: k(
          "has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border",
          c.dropdown_root
        ),
        dropdown: k("bg-popover absolute inset-0 opacity-0", c.dropdown),
        caption_label: k(
          "select-none font-medium",
          r === "label" ? "text-sm" : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5",
          c.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: k("flex", c.weekdays),
        weekday: k(
          "text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal",
          c.weekday
        ),
        week: k("mt-2 flex w-full", c.week),
        week_number_header: k("w-[--cell-size] select-none", c.week_number_header),
        week_number: k(
          "text-muted-foreground select-none text-[0.8rem]",
          c.week_number
        ),
        day: k(
          "group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md",
          c.day
        ),
        range_start: k("bg-accent rounded-l-md", c.range_start),
        range_middle: k("rounded-none", c.range_middle),
        range_end: k("bg-accent rounded-r-md", c.range_end),
        today: k(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          c.today
        ),
        outside: k(
          "text-muted-foreground aria-selected:text-muted-foreground",
          c.outside
        ),
        disabled: k("text-muted-foreground opacity-50", c.disabled),
        hidden: k("invisible", c.hidden),
        ...t
      },
      components: {
        Root: ({ className: d, rootRef: m, ...f }) => /* @__PURE__ */ u("div", { "data-slot": "calendar", ref: m, className: k(d), ...f }),
        Chevron: ({ className: d, orientation: m, ...f }) => m === "left" ? /* @__PURE__ */ u(Ac, { className: k("size-4", d), ...f }) : m === "right" ? /* @__PURE__ */ u(Fr, { className: k("size-4", d), ...f }) : /* @__PURE__ */ u(Wr, { className: k("size-4", d), ...f }),
        DayButton: mx,
        WeekNumber: ({ children: d, ...m }) => /* @__PURE__ */ u("td", { ...m, children: /* @__PURE__ */ u("div", { className: "flex size-[--cell-size] items-center justify-center text-center", children: d }) }),
        ...s
      },
      ...i
    }
  );
}
function mx({
  className: e,
  day: t,
  modifiers: n,
  ...r
}) {
  const o = Ga(), a = l.useRef(null);
  return l.useEffect(() => {
    var s;
    n.focused && ((s = a.current) == null || s.focus());
  }, [n.focused]), /* @__PURE__ */ u(
    Ce,
    {
      ref: a,
      variant: "ghost",
      size: "icon",
      "data-day": t.date.toLocaleDateString(),
      "data-selected-single": n.selected && !n.range_start && !n.range_end && !n.range_middle,
      "data-range-start": n.range_start,
      "data-range-end": n.range_end,
      "data-range-middle": n.range_middle,
      className: k(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-[--cell-size] flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70",
        o.day,
        e
      ),
      ...r
    }
  );
}
const yr = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  "div",
  {
    ref: n,
    className: k(
      "rounded-xl border bg-card text-card-foreground shadow",
      e
    ),
    ...t
  }
));
yr.displayName = "Card";
const wr = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  "div",
  {
    ref: n,
    className: k("flex flex-col space-y-1.5 p-6", e),
    ...t
  }
));
wr.displayName = "CardHeader";
const qa = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  "div",
  {
    ref: n,
    className: k("font-semibold leading-none tracking-tight", e),
    ...t
  }
));
qa.displayName = "CardTitle";
const px = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  "div",
  {
    ref: n,
    className: k("text-sm text-muted-foreground", e),
    ...t
  }
));
px.displayName = "CardDescription";
const xr = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u("div", { ref: n, className: k("p-6 pt-0", e), ...t }));
xr.displayName = "CardContent";
const hx = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  "div",
  {
    ref: n,
    className: k("flex items-center p-6 pt-0", e),
    ...t
  }
));
hx.displayName = "CardFooter";
function In(e) {
  const t = l.useRef({ value: e, previous: e });
  return l.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
function $n(e) {
  const [t, n] = l.useState(void 0);
  return ge(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const r = new ResizeObserver((o) => {
        if (!Array.isArray(o) || !o.length)
          return;
        const a = o[0];
        let s, i;
        if ("borderBoxSize" in a) {
          const c = a.borderBoxSize, d = Array.isArray(c) ? c[0] : c;
          s = d.inlineSize, i = d.blockSize;
        } else
          s = e.offsetWidth, i = e.offsetHeight;
        n({ width: s, height: i });
      });
      return r.observe(e, { box: "border-box" }), () => r.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var Hr = "Checkbox", [gx] = we(Hr), [vx, Xa] = gx(Hr);
function bx(e) {
  const {
    __scopeCheckbox: t,
    checked: n,
    children: r,
    defaultChecked: o,
    disabled: a,
    form: s,
    name: i,
    onCheckedChange: c,
    required: d,
    value: m = "on",
    // @ts-expect-error
    internal_do_not_use_render: f
  } = e, [p, h] = xe({
    prop: n,
    defaultProp: o ?? !1,
    onChange: c,
    caller: Hr
  }), [b, g] = l.useState(null), [v, w] = l.useState(null), y = l.useRef(!1), x = b ? !!s || !!b.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    !0
  ), S = {
    checked: p,
    disabled: a,
    setChecked: h,
    control: b,
    setControl: g,
    name: i,
    form: s,
    value: m,
    hasConsumerStoppedPropagationRef: y,
    required: d,
    defaultChecked: gt(o) ? !1 : o,
    isFormControl: x,
    bubbleInput: v,
    setBubbleInput: w
  };
  return /* @__PURE__ */ u(
    vx,
    {
      scope: t,
      ...S,
      children: yx(f) ? f(S) : r
    }
  );
}
var Pl = "CheckboxTrigger", Rl = l.forwardRef(
  ({ __scopeCheckbox: e, onKeyDown: t, onClick: n, ...r }, o) => {
    const {
      control: a,
      value: s,
      disabled: i,
      checked: c,
      required: d,
      setControl: m,
      setChecked: f,
      hasConsumerStoppedPropagationRef: p,
      isFormControl: h,
      bubbleInput: b
    } = Xa(Pl, e), g = q(o, m), v = l.useRef(c);
    return l.useEffect(() => {
      const w = a == null ? void 0 : a.form;
      if (w) {
        const y = () => f(v.current);
        return w.addEventListener("reset", y), () => w.removeEventListener("reset", y);
      }
    }, [a, f]), /* @__PURE__ */ u(
      L.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": gt(c) ? "mixed" : c,
        "aria-required": d,
        "data-state": Ol(c),
        "data-disabled": i ? "" : void 0,
        disabled: i,
        value: s,
        ...r,
        ref: g,
        onKeyDown: _(t, (w) => {
          w.key === "Enter" && w.preventDefault();
        }),
        onClick: _(n, (w) => {
          f((y) => gt(y) ? !0 : !y), b && h && (p.current = w.isPropagationStopped(), p.current || w.stopPropagation());
        })
      }
    );
  }
);
Rl.displayName = Pl;
var Za = l.forwardRef(
  (e, t) => {
    const {
      __scopeCheckbox: n,
      name: r,
      checked: o,
      defaultChecked: a,
      required: s,
      disabled: i,
      value: c,
      onCheckedChange: d,
      form: m,
      ...f
    } = e;
    return /* @__PURE__ */ u(
      bx,
      {
        __scopeCheckbox: n,
        checked: o,
        defaultChecked: a,
        disabled: i,
        required: s,
        onCheckedChange: d,
        name: r,
        form: m,
        value: c,
        internal_do_not_use_render: ({ isFormControl: p }) => /* @__PURE__ */ R(ze, { children: [
          /* @__PURE__ */ u(
            Rl,
            {
              ...f,
              ref: t,
              __scopeCheckbox: n
            }
          ),
          p && /* @__PURE__ */ u(
            Dl,
            {
              __scopeCheckbox: n
            }
          )
        ] })
      }
    );
  }
);
Za.displayName = Hr;
var Ml = "CheckboxIndicator", Tl = l.forwardRef(
  (e, t) => {
    const { __scopeCheckbox: n, forceMount: r, ...o } = e, a = Xa(Ml, n);
    return /* @__PURE__ */ u(
      ve,
      {
        present: r || gt(a.checked) || a.checked === !0,
        children: /* @__PURE__ */ u(
          L.span,
          {
            "data-state": Ol(a.checked),
            "data-disabled": a.disabled ? "" : void 0,
            ...o,
            ref: t,
            style: { pointerEvents: "none", ...e.style }
          }
        )
      }
    );
  }
);
Tl.displayName = Ml;
var _l = "CheckboxBubbleInput", Dl = l.forwardRef(
  ({ __scopeCheckbox: e, ...t }, n) => {
    const {
      control: r,
      hasConsumerStoppedPropagationRef: o,
      checked: a,
      defaultChecked: s,
      required: i,
      disabled: c,
      name: d,
      value: m,
      form: f,
      bubbleInput: p,
      setBubbleInput: h
    } = Xa(_l, e), b = q(n, h), g = In(a), v = $n(r);
    l.useEffect(() => {
      const y = p;
      if (!y) return;
      const x = window.HTMLInputElement.prototype, N = Object.getOwnPropertyDescriptor(
        x,
        "checked"
      ).set, C = !o.current;
      if (g !== a && N) {
        const E = new Event("click", { bubbles: C });
        y.indeterminate = gt(a), N.call(y, gt(a) ? !1 : a), y.dispatchEvent(E);
      }
    }, [p, g, a, o]);
    const w = l.useRef(gt(a) ? !1 : a);
    return /* @__PURE__ */ u(
      L.input,
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: s ?? w.current,
        required: i,
        disabled: c,
        name: d,
        value: m,
        form: f,
        ...t,
        tabIndex: -1,
        ref: b,
        style: {
          ...t.style,
          ...v,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }
);
Dl.displayName = _l;
function yx(e) {
  return typeof e == "function";
}
function gt(e) {
  return e === "indeterminate";
}
function Ol(e) {
  return gt(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
const wx = l.forwardRef(({ className: e, indeterminate: t, ...n }, r) => /* @__PURE__ */ u(
  Za,
  {
    ref: r,
    className: k(
      "peer h-4 w-4 shrink-0 rounded-sm border border-border-strong",
      "bg-surface-raised ring-offset-background",
      "transition-colors duration-fast",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground",
      "data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:text-primary-foreground",
      e
    ),
    checked: t ? "indeterminate" : n.checked,
    ...n,
    children: /* @__PURE__ */ u(Tl, { className: "flex items-center justify-center text-current", children: t ? /* @__PURE__ */ u(rv, { className: "h-3 w-3", strokeWidth: 2.5 }) : /* @__PURE__ */ u($r, { className: "h-3 w-3", strokeWidth: 2.5 }) })
  }
));
wx.displayName = Za.displayName;
var yi = 1, xx = 0.9, Sx = 0.8, Cx = 0.17, Ao = 0.1, Io = 0.999, Nx = 0.9999, Ex = 0.99, kx = /[\\\/_+.#"@\[\(\{&]/, Px = /[\\\/_+.#"@\[\(\{&]/g, Rx = /[\s-]/, Al = /[\s-]/g;
function ra(e, t, n, r, o, a, s) {
  if (a === t.length) return o === e.length ? yi : Ex;
  var i = `${o},${a}`;
  if (s[i] !== void 0) return s[i];
  for (var c = r.charAt(a), d = n.indexOf(c, o), m = 0, f, p, h, b; d >= 0; ) f = ra(e, t, n, r, d + 1, a + 1, s), f > m && (d === o ? f *= yi : kx.test(e.charAt(d - 1)) ? (f *= Sx, h = e.slice(o, d - 1).match(Px), h && o > 0 && (f *= Math.pow(Io, h.length))) : Rx.test(e.charAt(d - 1)) ? (f *= xx, b = e.slice(o, d - 1).match(Al), b && o > 0 && (f *= Math.pow(Io, b.length))) : (f *= Cx, o > 0 && (f *= Math.pow(Io, d - o))), e.charAt(d) !== t.charAt(a) && (f *= Nx)), (f < Ao && n.charAt(d - 1) === r.charAt(a + 1) || r.charAt(a + 1) === r.charAt(a) && n.charAt(d - 1) !== r.charAt(a)) && (p = ra(e, t, n, r, d + 1, a + 2, s), p * Ao > f && (f = p * Ao)), f > m && (m = f), d = n.indexOf(c, d + 1);
  return s[i] = m, m;
}
function wi(e) {
  return e.toLowerCase().replace(Al, " ");
}
function Mx(e, t, n) {
  return e = n && n.length > 0 ? `${e + " " + n.join(" ")}` : e, ra(e, t, wi(e), wi(t), 0, 0, {});
}
function Tx(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = pe(e);
  l.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var _x = "DismissableLayer", oa = "dismissableLayer.update", Dx = "dismissableLayer.pointerDownOutside", Ox = "dismissableLayer.focusOutside", xi, Il = l.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Wt = l.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: a,
      onInteractOutside: s,
      onDismiss: i,
      ...c
    } = e, d = l.useContext(Il), [m, f] = l.useState(null), p = (m == null ? void 0 : m.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, h] = l.useState({}), b = q(t, (E) => f(E)), g = Array.from(d.layers), [v] = [...d.layersWithOutsidePointerEventsDisabled].slice(-1), w = g.indexOf(v), y = m ? g.indexOf(m) : -1, x = d.layersWithOutsidePointerEventsDisabled.size > 0, S = y >= w, N = Ix((E) => {
      const T = E.target, D = [...d.branches].some((A) => A.contains(T));
      !S || D || (o == null || o(E), s == null || s(E), E.defaultPrevented || i == null || i());
    }, p), C = $x((E) => {
      const T = E.target;
      [...d.branches].some((A) => A.contains(T)) || (a == null || a(E), s == null || s(E), E.defaultPrevented || i == null || i());
    }, p);
    return Tx((E) => {
      y === d.layers.size - 1 && (r == null || r(E), !E.defaultPrevented && i && (E.preventDefault(), i()));
    }, p), l.useEffect(() => {
      if (m)
        return n && (d.layersWithOutsidePointerEventsDisabled.size === 0 && (xi = p.body.style.pointerEvents, p.body.style.pointerEvents = "none"), d.layersWithOutsidePointerEventsDisabled.add(m)), d.layers.add(m), Si(), () => {
          n && d.layersWithOutsidePointerEventsDisabled.size === 1 && (p.body.style.pointerEvents = xi);
        };
    }, [m, p, n, d]), l.useEffect(() => () => {
      m && (d.layers.delete(m), d.layersWithOutsidePointerEventsDisabled.delete(m), Si());
    }, [m, d]), l.useEffect(() => {
      const E = () => h({});
      return document.addEventListener(oa, E), () => document.removeEventListener(oa, E);
    }, []), /* @__PURE__ */ u(
      L.div,
      {
        ...c,
        ref: b,
        style: {
          pointerEvents: x ? S ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: _(e.onFocusCapture, C.onFocusCapture),
        onBlurCapture: _(e.onBlurCapture, C.onBlurCapture),
        onPointerDownCapture: _(
          e.onPointerDownCapture,
          N.onPointerDownCapture
        )
      }
    );
  }
);
Wt.displayName = _x;
var Ax = "DismissableLayerBranch", $l = l.forwardRef((e, t) => {
  const n = l.useContext(Il), r = l.useRef(null), o = q(t, r);
  return l.useEffect(() => {
    const a = r.current;
    if (a)
      return n.branches.add(a), () => {
        n.branches.delete(a);
      };
  }, [n.branches]), /* @__PURE__ */ u(L.div, { ...e, ref: o });
});
$l.displayName = Ax;
function Ix(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = pe(e), r = l.useRef(!1), o = l.useRef(() => {
  });
  return l.useEffect(() => {
    const a = (i) => {
      if (i.target && !r.current) {
        let c = function() {
          Wl(
            Dx,
            n,
            d,
            { discrete: !0 }
          );
        };
        const d = { originalEvent: i };
        i.pointerType === "touch" ? (t.removeEventListener("click", o.current), o.current = c, t.addEventListener("click", o.current, { once: !0 })) : c();
      } else
        t.removeEventListener("click", o.current);
      r.current = !1;
    }, s = window.setTimeout(() => {
      t.addEventListener("pointerdown", a);
    }, 0);
    return () => {
      window.clearTimeout(s), t.removeEventListener("pointerdown", a), t.removeEventListener("click", o.current);
    };
  }, [t, n]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => r.current = !0
  };
}
function $x(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = pe(e), r = l.useRef(!1);
  return l.useEffect(() => {
    const o = (a) => {
      a.target && !r.current && Wl(Ox, n, { originalEvent: a }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function Si() {
  const e = new CustomEvent(oa);
  document.dispatchEvent(e);
}
function Wl(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? Ta(o, a) : o.dispatchEvent(a);
}
var Wx = Wt, Fx = $l, $o = "focusScope.autoFocusOnMount", Wo = "focusScope.autoFocusOnUnmount", Ci = { bubbles: !1, cancelable: !0 }, Lx = "FocusScope", Wn = l.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: a,
    ...s
  } = e, [i, c] = l.useState(null), d = pe(o), m = pe(a), f = l.useRef(null), p = q(t, (g) => c(g)), h = l.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  l.useEffect(() => {
    if (r) {
      let g = function(x) {
        if (h.paused || !i) return;
        const S = x.target;
        i.contains(S) ? f.current = S : ht(f.current, { select: !0 });
      }, v = function(x) {
        if (h.paused || !i) return;
        const S = x.relatedTarget;
        S !== null && (i.contains(S) || ht(f.current, { select: !0 }));
      }, w = function(x) {
        if (document.activeElement === document.body)
          for (const N of x)
            N.removedNodes.length > 0 && ht(i);
      };
      document.addEventListener("focusin", g), document.addEventListener("focusout", v);
      const y = new MutationObserver(w);
      return i && y.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", g), document.removeEventListener("focusout", v), y.disconnect();
      };
    }
  }, [r, i, h.paused]), l.useEffect(() => {
    if (i) {
      Ei.add(h);
      const g = document.activeElement;
      if (!i.contains(g)) {
        const w = new CustomEvent($o, Ci);
        i.addEventListener($o, d), i.dispatchEvent(w), w.defaultPrevented || (Bx(jx(Fl(i)), { select: !0 }), document.activeElement === g && ht(i));
      }
      return () => {
        i.removeEventListener($o, d), setTimeout(() => {
          const w = new CustomEvent(Wo, Ci);
          i.addEventListener(Wo, m), i.dispatchEvent(w), w.defaultPrevented || ht(g ?? document.body, { select: !0 }), i.removeEventListener(Wo, m), Ei.remove(h);
        }, 0);
      };
    }
  }, [i, d, m, h]);
  const b = l.useCallback(
    (g) => {
      if (!n && !r || h.paused) return;
      const v = g.key === "Tab" && !g.altKey && !g.ctrlKey && !g.metaKey, w = document.activeElement;
      if (v && w) {
        const y = g.currentTarget, [x, S] = Vx(y);
        x && S ? !g.shiftKey && w === S ? (g.preventDefault(), n && ht(x, { select: !0 })) : g.shiftKey && w === x && (g.preventDefault(), n && ht(S, { select: !0 })) : w === y && g.preventDefault();
      }
    },
    [n, r, h.paused]
  );
  return /* @__PURE__ */ u(L.div, { tabIndex: -1, ...s, ref: p, onKeyDown: b });
});
Wn.displayName = Lx;
function Bx(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (ht(r, { select: t }), document.activeElement !== n) return;
}
function Vx(e) {
  const t = Fl(e), n = Ni(t, e), r = Ni(t.reverse(), e);
  return [n, r];
}
function Fl(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Ni(e, t) {
  for (const n of e)
    if (!Hx(n, { upTo: t })) return n;
}
function Hx(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Yx(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function ht(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Yx(e) && t && e.select();
  }
}
var Ei = zx();
function zx() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && (n == null || n.pause()), e = ki(e, t), e.unshift(t);
    },
    remove(t) {
      var n;
      e = ki(e, t), (n = e[0]) == null || n.resume();
    }
  };
}
function ki(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function jx(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Gx = "Portal", Ft = l.forwardRef((e, t) => {
  var i;
  const { container: n, ...r } = e, [o, a] = l.useState(!1);
  ge(() => a(!0), []);
  const s = n || o && ((i = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : i.body);
  return s ? kh.createPortal(/* @__PURE__ */ u(L.div, { ...r, ref: t }), s) : null;
});
Ft.displayName = Gx;
var Fo = 0;
function Yr() {
  l.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Pi()), document.body.insertAdjacentElement("beforeend", e[1] ?? Pi()), Fo++, () => {
      Fo === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Fo--;
    };
  }, []);
}
function Pi() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var Qe = function() {
  return Qe = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, Qe.apply(this, arguments);
};
function Ll(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function Ux(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, a; r < o; r++)
    (a || !(r in t)) && (a || (a = Array.prototype.slice.call(t, 0, r)), a[r] = t[r]);
  return e.concat(a || Array.prototype.slice.call(t));
}
var lr = "right-scroll-bar-position", dr = "width-before-scroll-bar", Kx = "with-scroll-bars-hidden", qx = "--removed-body-scroll-bar-size";
function Lo(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Xx(e, t) {
  var n = hr(function() {
    return {
      // value
      value: e,
      // last callback
      callback: t,
      // "memoized" public interface
      facade: {
        get current() {
          return n.value;
        },
        set current(r) {
          var o = n.value;
          o !== r && (n.value = r, n.callback(r, o));
        }
      }
    };
  })[0];
  return n.callback = t, n.facade;
}
var Zx = typeof window < "u" ? l.useLayoutEffect : l.useEffect, Ri = /* @__PURE__ */ new WeakMap();
function Qx(e, t) {
  var n = Xx(null, function(r) {
    return e.forEach(function(o) {
      return Lo(o, r);
    });
  });
  return Zx(function() {
    var r = Ri.get(n);
    if (r) {
      var o = new Set(r), a = new Set(e), s = n.current;
      o.forEach(function(i) {
        a.has(i) || Lo(i, null);
      }), a.forEach(function(i) {
        o.has(i) || Lo(i, s);
      });
    }
    Ri.set(n, e);
  }, [e]), n;
}
function Jx(e) {
  return e;
}
function eS(e, t) {
  t === void 0 && (t = Jx);
  var n = [], r = !1, o = {
    read: function() {
      if (r)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function(a) {
      var s = t(a, r);
      return n.push(s), function() {
        n = n.filter(function(i) {
          return i !== s;
        });
      };
    },
    assignSyncMedium: function(a) {
      for (r = !0; n.length; ) {
        var s = n;
        n = [], s.forEach(a);
      }
      n = {
        push: function(i) {
          return a(i);
        },
        filter: function() {
          return n;
        }
      };
    },
    assignMedium: function(a) {
      r = !0;
      var s = [];
      if (n.length) {
        var i = n;
        n = [], i.forEach(a), s = n;
      }
      var c = function() {
        var m = s;
        s = [], m.forEach(a);
      }, d = function() {
        return Promise.resolve().then(c);
      };
      d(), n = {
        push: function(m) {
          s.push(m), d();
        },
        filter: function(m) {
          return s = s.filter(m), n;
        }
      };
    }
  };
  return o;
}
function tS(e) {
  e === void 0 && (e = {});
  var t = eS(null);
  return t.options = Qe({ async: !0, ssr: !1 }, e), t;
}
var Bl = function(e) {
  var t = e.sideCar, n = Ll(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return l.createElement(r, Qe({}, n));
};
Bl.isSideCarExport = !0;
function nS(e, t) {
  return e.useMedium(t), Bl;
}
var Vl = tS(), Bo = function() {
}, zr = l.forwardRef(function(e, t) {
  var n = l.useRef(null), r = l.useState({
    onScrollCapture: Bo,
    onWheelCapture: Bo,
    onTouchMoveCapture: Bo
  }), o = r[0], a = r[1], s = e.forwardProps, i = e.children, c = e.className, d = e.removeScrollBar, m = e.enabled, f = e.shards, p = e.sideCar, h = e.noRelative, b = e.noIsolation, g = e.inert, v = e.allowPinchZoom, w = e.as, y = w === void 0 ? "div" : w, x = e.gapMode, S = Ll(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), N = p, C = Qx([n, t]), E = Qe(Qe({}, S), o);
  return l.createElement(
    l.Fragment,
    null,
    m && l.createElement(N, { sideCar: Vl, removeScrollBar: d, shards: f, noRelative: h, noIsolation: b, inert: g, setCallbacks: a, allowPinchZoom: !!v, lockRef: n, gapMode: x }),
    s ? l.cloneElement(l.Children.only(i), Qe(Qe({}, E), { ref: C })) : l.createElement(y, Qe({}, E, { className: c, ref: C }), i)
  );
});
zr.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
zr.classNames = {
  fullWidth: dr,
  zeroRight: lr
};
var rS = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function oS() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = rS();
  return t && e.setAttribute("nonce", t), e;
}
function aS(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function sS(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var iS = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = oS()) && (aS(t, n), sS(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, cS = function() {
  var e = iS();
  return function(t, n) {
    l.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, Hl = function() {
  var e = cS(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, lS = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Vo = function(e) {
  return parseInt(e || "", 10) || 0;
}, dS = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Vo(n), Vo(r), Vo(o)];
}, uS = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return lS;
  var t = dS(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, fS = Hl(), Qt = "data-scroll-locked", mS = function(e, t, n, r) {
  var o = e.left, a = e.top, s = e.right, i = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Kx, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(i, "px ").concat(r, `;
  }
  body[`).concat(Qt, `] {
    overflow: hidden `).concat(r, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(r, ";"),
    n === "margin" && `
    padding-left: `.concat(o, `px;
    padding-top: `).concat(a, `px;
    padding-right: `).concat(s, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(i, "px ").concat(r, `;
    `),
    n === "padding" && "padding-right: ".concat(i, "px ").concat(r, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(lr, ` {
    right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(dr, ` {
    margin-right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(lr, " .").concat(lr, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(dr, " .").concat(dr, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(Qt, `] {
    `).concat(qx, ": ").concat(i, `px;
  }
`);
}, Mi = function() {
  var e = parseInt(document.body.getAttribute(Qt) || "0", 10);
  return isFinite(e) ? e : 0;
}, pS = function() {
  l.useEffect(function() {
    return document.body.setAttribute(Qt, (Mi() + 1).toString()), function() {
      var e = Mi() - 1;
      e <= 0 ? document.body.removeAttribute(Qt) : document.body.setAttribute(Qt, e.toString());
    };
  }, []);
}, hS = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  pS();
  var a = l.useMemo(function() {
    return uS(o);
  }, [o]);
  return l.createElement(fS, { styles: mS(a, !t, o, n ? "" : "!important") });
}, aa = !1;
if (typeof window < "u")
  try {
    var Jn = Object.defineProperty({}, "passive", {
      get: function() {
        return aa = !0, !0;
      }
    });
    window.addEventListener("test", Jn, Jn), window.removeEventListener("test", Jn, Jn);
  } catch {
    aa = !1;
  }
var Yt = aa ? { passive: !1 } : !1, gS = function(e) {
  return e.tagName === "TEXTAREA";
}, Yl = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !gS(e) && n[t] === "visible")
  );
}, vS = function(e) {
  return Yl(e, "overflowY");
}, bS = function(e) {
  return Yl(e, "overflowX");
}, Ti = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = zl(e, r);
    if (o) {
      var a = jl(e, r), s = a[1], i = a[2];
      if (s > i)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, yS = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, wS = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, zl = function(e, t) {
  return e === "v" ? vS(t) : bS(t);
}, jl = function(e, t) {
  return e === "v" ? yS(t) : wS(t);
}, xS = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, SS = function(e, t, n, r, o) {
  var a = xS(e, window.getComputedStyle(t).direction), s = a * r, i = n.target, c = t.contains(i), d = !1, m = s > 0, f = 0, p = 0;
  do {
    if (!i)
      break;
    var h = jl(e, i), b = h[0], g = h[1], v = h[2], w = g - v - a * b;
    (b || w) && zl(e, i) && (f += w, p += b);
    var y = i.parentNode;
    i = y && y.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? y.host : y;
  } while (
    // portaled content
    !c && i !== document.body || // self content
    c && (t.contains(i) || t === i)
  );
  return (m && Math.abs(f) < 1 || !m && Math.abs(p) < 1) && (d = !0), d;
}, er = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, _i = function(e) {
  return [e.deltaX, e.deltaY];
}, Di = function(e) {
  return e && "current" in e ? e.current : e;
}, CS = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, NS = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, ES = 0, zt = [];
function kS(e) {
  var t = l.useRef([]), n = l.useRef([0, 0]), r = l.useRef(), o = l.useState(ES++)[0], a = l.useState(Hl)[0], s = l.useRef(e);
  l.useEffect(function() {
    s.current = e;
  }, [e]), l.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var g = Ux([e.lockRef.current], (e.shards || []).map(Di), !0).filter(Boolean);
      return g.forEach(function(v) {
        return v.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), g.forEach(function(v) {
          return v.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = l.useCallback(function(g, v) {
    if ("touches" in g && g.touches.length === 2 || g.type === "wheel" && g.ctrlKey)
      return !s.current.allowPinchZoom;
    var w = er(g), y = n.current, x = "deltaX" in g ? g.deltaX : y[0] - w[0], S = "deltaY" in g ? g.deltaY : y[1] - w[1], N, C = g.target, E = Math.abs(x) > Math.abs(S) ? "h" : "v";
    if ("touches" in g && E === "h" && C.type === "range")
      return !1;
    var T = window.getSelection(), D = T && T.anchorNode, A = D ? D === C || D.contains(C) : !1;
    if (A)
      return !1;
    var W = Ti(E, C);
    if (!W)
      return !0;
    if (W ? N = E : (N = E === "v" ? "h" : "v", W = Ti(E, C)), !W)
      return !1;
    if (!r.current && "changedTouches" in g && (x || S) && (r.current = N), !N)
      return !0;
    var $ = r.current || N;
    return SS($, v, g, $ === "h" ? x : S);
  }, []), c = l.useCallback(function(g) {
    var v = g;
    if (!(!zt.length || zt[zt.length - 1] !== a)) {
      var w = "deltaY" in v ? _i(v) : er(v), y = t.current.filter(function(N) {
        return N.name === v.type && (N.target === v.target || v.target === N.shadowParent) && CS(N.delta, w);
      })[0];
      if (y && y.should) {
        v.cancelable && v.preventDefault();
        return;
      }
      if (!y) {
        var x = (s.current.shards || []).map(Di).filter(Boolean).filter(function(N) {
          return N.contains(v.target);
        }), S = x.length > 0 ? i(v, x[0]) : !s.current.noIsolation;
        S && v.cancelable && v.preventDefault();
      }
    }
  }, []), d = l.useCallback(function(g, v, w, y) {
    var x = { name: g, delta: v, target: w, should: y, shadowParent: PS(w) };
    t.current.push(x), setTimeout(function() {
      t.current = t.current.filter(function(S) {
        return S !== x;
      });
    }, 1);
  }, []), m = l.useCallback(function(g) {
    n.current = er(g), r.current = void 0;
  }, []), f = l.useCallback(function(g) {
    d(g.type, _i(g), g.target, i(g, e.lockRef.current));
  }, []), p = l.useCallback(function(g) {
    d(g.type, er(g), g.target, i(g, e.lockRef.current));
  }, []);
  l.useEffect(function() {
    return zt.push(a), e.setCallbacks({
      onScrollCapture: f,
      onWheelCapture: f,
      onTouchMoveCapture: p
    }), document.addEventListener("wheel", c, Yt), document.addEventListener("touchmove", c, Yt), document.addEventListener("touchstart", m, Yt), function() {
      zt = zt.filter(function(g) {
        return g !== a;
      }), document.removeEventListener("wheel", c, Yt), document.removeEventListener("touchmove", c, Yt), document.removeEventListener("touchstart", m, Yt);
    };
  }, []);
  var h = e.removeScrollBar, b = e.inert;
  return l.createElement(
    l.Fragment,
    null,
    b ? l.createElement(a, { styles: NS(o) }) : null,
    h ? l.createElement(hS, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function PS(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const RS = nS(Vl, kS);
var Fn = l.forwardRef(function(e, t) {
  return l.createElement(zr, Qe({}, e, { ref: t, sideCar: RS }));
});
Fn.classNames = zr.classNames;
var MS = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, jt = /* @__PURE__ */ new WeakMap(), tr = /* @__PURE__ */ new WeakMap(), nr = {}, Ho = 0, Gl = function(e) {
  return e && (e.host || Gl(e.parentNode));
}, TS = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = Gl(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, _S = function(e, t, n, r) {
  var o = TS(t, Array.isArray(e) ? e : [e]);
  nr[n] || (nr[n] = /* @__PURE__ */ new WeakMap());
  var a = nr[n], s = [], i = /* @__PURE__ */ new Set(), c = new Set(o), d = function(f) {
    !f || i.has(f) || (i.add(f), d(f.parentNode));
  };
  o.forEach(d);
  var m = function(f) {
    !f || c.has(f) || Array.prototype.forEach.call(f.children, function(p) {
      if (i.has(p))
        m(p);
      else
        try {
          var h = p.getAttribute(r), b = h !== null && h !== "false", g = (jt.get(p) || 0) + 1, v = (a.get(p) || 0) + 1;
          jt.set(p, g), a.set(p, v), s.push(p), g === 1 && b && tr.set(p, !0), v === 1 && p.setAttribute(n, "true"), b || p.setAttribute(r, "true");
        } catch (w) {
          console.error("aria-hidden: cannot operate on ", p, w);
        }
    });
  };
  return m(t), i.clear(), Ho++, function() {
    s.forEach(function(f) {
      var p = jt.get(f) - 1, h = a.get(f) - 1;
      jt.set(f, p), a.set(f, h), p || (tr.has(f) || f.removeAttribute(r), tr.delete(f)), h || f.removeAttribute(n);
    }), Ho--, Ho || (jt = /* @__PURE__ */ new WeakMap(), jt = /* @__PURE__ */ new WeakMap(), tr = /* @__PURE__ */ new WeakMap(), nr = {});
  };
}, jr = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = MS(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), _S(r, o, n, "aria-hidden")) : function() {
    return null;
  };
};
// @__NO_SIDE_EFFECTS__
function DS(e) {
  const t = /* @__PURE__ */ OS(e), n = l.forwardRef((r, o) => {
    const { children: a, ...s } = r, i = l.Children.toArray(a), c = i.find(IS);
    if (c) {
      const d = c.props.children, m = i.map((f) => f === c ? l.Children.count(d) > 1 ? l.Children.only(null) : l.isValidElement(d) ? d.props.children : null : f);
      return /* @__PURE__ */ u(t, { ...s, ref: o, children: l.isValidElement(d) ? l.cloneElement(d, void 0, m) : null });
    }
    return /* @__PURE__ */ u(t, { ...s, ref: o, children: a });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function OS(e) {
  const t = l.forwardRef((n, r) => {
    const { children: o, ...a } = n;
    if (l.isValidElement(o)) {
      const s = WS(o), i = $S(a, o.props);
      return o.type !== l.Fragment && (i.ref = r ? ke(r, s) : s), l.cloneElement(o, i);
    }
    return l.Children.count(o) > 1 ? l.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var AS = Symbol("radix.slottable");
function IS(e) {
  return l.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === AS;
}
function $S(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], a = t[r];
    /^on[A-Z]/.test(r) ? o && a ? n[r] = (...i) => {
      const c = a(...i);
      return o(...i), c;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...a } : r === "className" && (n[r] = [o, a].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function WS(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Gr = "Dialog", [Ul] = we(Gr), [FS, Ke] = Ul(Gr), Kl = (e) => {
  const {
    __scopeDialog: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    modal: s = !0
  } = e, i = l.useRef(null), c = l.useRef(null), [d, m] = xe({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: Gr
  });
  return /* @__PURE__ */ u(
    FS,
    {
      scope: t,
      triggerRef: i,
      contentRef: c,
      contentId: he(),
      titleId: he(),
      descriptionId: he(),
      open: d,
      onOpenChange: m,
      onOpenToggle: l.useCallback(() => m((f) => !f), [m]),
      modal: s,
      children: n
    }
  );
};
Kl.displayName = Gr;
var ql = "DialogTrigger", Xl = l.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ke(ql, n), a = q(t, o.triggerRef);
    return /* @__PURE__ */ u(
      L.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": es(o.open),
        ...r,
        ref: a,
        onClick: _(e.onClick, o.onOpenToggle)
      }
    );
  }
);
Xl.displayName = ql;
var Qa = "DialogPortal", [LS, Zl] = Ul(Qa, {
  forceMount: void 0
}), Ql = (e) => {
  const { __scopeDialog: t, forceMount: n, children: r, container: o } = e, a = Ke(Qa, t);
  return /* @__PURE__ */ u(LS, { scope: t, forceMount: n, children: l.Children.map(r, (s) => /* @__PURE__ */ u(ve, { present: n || a.open, children: /* @__PURE__ */ u(Ft, { asChild: !0, container: o, children: s }) })) });
};
Ql.displayName = Qa;
var Sr = "DialogOverlay", Jl = l.forwardRef(
  (e, t) => {
    const n = Zl(Sr, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, a = Ke(Sr, e.__scopeDialog);
    return a.modal ? /* @__PURE__ */ u(ve, { present: r || a.open, children: /* @__PURE__ */ u(VS, { ...o, ref: t }) }) : null;
  }
);
Jl.displayName = Sr;
var BS = /* @__PURE__ */ DS("DialogOverlay.RemoveScroll"), VS = l.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ke(Sr, n);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ u(Fn, { as: BS, allowPinchZoom: !0, shards: [o.contentRef], children: /* @__PURE__ */ u(
        L.div,
        {
          "data-state": es(o.open),
          ...r,
          ref: t,
          style: { pointerEvents: "auto", ...r.style }
        }
      ) })
    );
  }
), _t = "DialogContent", ed = l.forwardRef(
  (e, t) => {
    const n = Zl(_t, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, a = Ke(_t, e.__scopeDialog);
    return /* @__PURE__ */ u(ve, { present: r || a.open, children: a.modal ? /* @__PURE__ */ u(HS, { ...o, ref: t }) : /* @__PURE__ */ u(YS, { ...o, ref: t }) });
  }
);
ed.displayName = _t;
var HS = l.forwardRef(
  (e, t) => {
    const n = Ke(_t, e.__scopeDialog), r = l.useRef(null), o = q(t, n.contentRef, r);
    return l.useEffect(() => {
      const a = r.current;
      if (a) return jr(a);
    }, []), /* @__PURE__ */ u(
      td,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: _(e.onCloseAutoFocus, (a) => {
          var s;
          a.preventDefault(), (s = n.triggerRef.current) == null || s.focus();
        }),
        onPointerDownOutside: _(e.onPointerDownOutside, (a) => {
          const s = a.detail.originalEvent, i = s.button === 0 && s.ctrlKey === !0;
          (s.button === 2 || i) && a.preventDefault();
        }),
        onFocusOutside: _(
          e.onFocusOutside,
          (a) => a.preventDefault()
        )
      }
    );
  }
), YS = l.forwardRef(
  (e, t) => {
    const n = Ke(_t, e.__scopeDialog), r = l.useRef(!1), o = l.useRef(!1);
    return /* @__PURE__ */ u(
      td,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (a) => {
          var s, i;
          (s = e.onCloseAutoFocus) == null || s.call(e, a), a.defaultPrevented || (r.current || (i = n.triggerRef.current) == null || i.focus(), a.preventDefault()), r.current = !1, o.current = !1;
        },
        onInteractOutside: (a) => {
          var c, d;
          (c = e.onInteractOutside) == null || c.call(e, a), a.defaultPrevented || (r.current = !0, a.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const s = a.target;
          ((d = n.triggerRef.current) == null ? void 0 : d.contains(s)) && a.preventDefault(), a.detail.originalEvent.type === "focusin" && o.current && a.preventDefault();
        }
      }
    );
  }
), td = l.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: o, onCloseAutoFocus: a, ...s } = e, i = Ke(_t, n), c = l.useRef(null), d = q(t, c);
    return Yr(), /* @__PURE__ */ R(ze, { children: [
      /* @__PURE__ */ u(
        Wn,
        {
          asChild: !0,
          loop: !0,
          trapped: r,
          onMountAutoFocus: o,
          onUnmountAutoFocus: a,
          children: /* @__PURE__ */ u(
            Wt,
            {
              role: "dialog",
              id: i.contentId,
              "aria-describedby": i.descriptionId,
              "aria-labelledby": i.titleId,
              "data-state": es(i.open),
              ...s,
              ref: d,
              onDismiss: () => i.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ R(ze, { children: [
        /* @__PURE__ */ u(zS, { titleId: i.titleId }),
        /* @__PURE__ */ u(GS, { contentRef: c, descriptionId: i.descriptionId })
      ] })
    ] });
  }
), Ja = "DialogTitle", nd = l.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ke(Ja, n);
    return /* @__PURE__ */ u(L.h2, { id: o.titleId, ...r, ref: t });
  }
);
nd.displayName = Ja;
var rd = "DialogDescription", od = l.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ke(rd, n);
    return /* @__PURE__ */ u(L.p, { id: o.descriptionId, ...r, ref: t });
  }
);
od.displayName = rd;
var ad = "DialogClose", sd = l.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ke(ad, n);
    return /* @__PURE__ */ u(
      L.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: _(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
sd.displayName = ad;
function es(e) {
  return e ? "open" : "closed";
}
var id = "DialogTitleWarning", [MM, cd] = ag(id, {
  contentName: _t,
  titleName: Ja,
  docsSlug: "dialog"
}), zS = ({ titleId: e }) => {
  const t = cd(id), n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return l.useEffect(() => {
    e && (document.getElementById(e) || console.error(n));
  }, [n, e]), null;
}, jS = "DialogDescriptionWarning", GS = ({ contentRef: e, descriptionId: t }) => {
  const r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${cd(jS).contentName}}.`;
  return l.useEffect(() => {
    var a;
    const o = (a = e.current) == null ? void 0 : a.getAttribute("aria-describedby");
    t && o && (document.getElementById(t) || console.warn(r));
  }, [r, e, t]), null;
}, ts = Kl, ld = Xl, ns = Ql, Ln = Jl, Bn = ed, Ur = nd, Kr = od, qr = sd, vn = '[cmdk-group=""]', Yo = '[cmdk-group-items=""]', US = '[cmdk-group-heading=""]', dd = '[cmdk-item=""]', Oi = `${dd}:not([aria-disabled="true"])`, sa = "cmdk-item-select", Ut = "data-value", KS = (e, t, n) => Mx(e, t, n), ud = l.createContext(void 0), Vn = () => l.useContext(ud), fd = l.createContext(void 0), rs = () => l.useContext(fd), md = l.createContext(void 0), pd = l.forwardRef((e, t) => {
  let n = Kt(() => {
    var M, Y;
    return { search: "", value: (Y = (M = e.value) != null ? M : e.defaultValue) != null ? Y : "", selectedItemId: void 0, filtered: { count: 0, items: /* @__PURE__ */ new Map(), groups: /* @__PURE__ */ new Set() } };
  }), r = Kt(() => /* @__PURE__ */ new Set()), o = Kt(() => /* @__PURE__ */ new Map()), a = Kt(() => /* @__PURE__ */ new Map()), s = Kt(() => /* @__PURE__ */ new Set()), i = hd(e), { label: c, children: d, value: m, onValueChange: f, filter: p, shouldFilter: h, loop: b, disablePointerSelection: g = !1, vimBindings: v = !0, ...w } = e, y = he(), x = he(), S = he(), N = l.useRef(null), C = aC();
  Dt(() => {
    if (m !== void 0) {
      let M = m.trim();
      n.current.value = M, E.emit();
    }
  }, [m]), Dt(() => {
    C(6, z);
  }, []);
  let E = l.useMemo(() => ({ subscribe: (M) => (s.current.add(M), () => s.current.delete(M)), snapshot: () => n.current, setState: (M, Y, K) => {
    var H, ee, F, te;
    if (!Object.is(n.current[M], Y)) {
      if (n.current[M] = Y, M === "search") $(), A(), C(1, W);
      else if (M === "value") {
        if (document.activeElement.hasAttribute("cmdk-input") || document.activeElement.hasAttribute("cmdk-root")) {
          let J = document.getElementById(S);
          J ? J.focus() : (H = document.getElementById(y)) == null || H.focus();
        }
        if (C(7, () => {
          var J;
          n.current.selectedItemId = (J = O()) == null ? void 0 : J.id, E.emit();
        }), K || C(5, z), ((ee = i.current) == null ? void 0 : ee.value) !== void 0) {
          let J = Y ?? "";
          (te = (F = i.current).onValueChange) == null || te.call(F, J);
          return;
        }
      }
      E.emit();
    }
  }, emit: () => {
    s.current.forEach((M) => M());
  } }), []), T = l.useMemo(() => ({ value: (M, Y, K) => {
    var H;
    Y !== ((H = a.current.get(M)) == null ? void 0 : H.value) && (a.current.set(M, { value: Y, keywords: K }), n.current.filtered.items.set(M, D(Y, K)), C(2, () => {
      A(), E.emit();
    }));
  }, item: (M, Y) => (r.current.add(M), Y && (o.current.has(Y) ? o.current.get(Y).add(M) : o.current.set(Y, /* @__PURE__ */ new Set([M]))), C(3, () => {
    $(), A(), n.current.value || W(), E.emit();
  }), () => {
    a.current.delete(M), r.current.delete(M), n.current.filtered.items.delete(M);
    let K = O();
    C(4, () => {
      $(), (K == null ? void 0 : K.getAttribute("id")) === M && W(), E.emit();
    });
  }), group: (M) => (o.current.has(M) || o.current.set(M, /* @__PURE__ */ new Set()), () => {
    a.current.delete(M), o.current.delete(M);
  }), filter: () => i.current.shouldFilter, label: c || e["aria-label"], getDisablePointerSelection: () => i.current.disablePointerSelection, listId: y, inputId: S, labelId: x, listInnerRef: N }), []);
  function D(M, Y) {
    var K, H;
    let ee = (H = (K = i.current) == null ? void 0 : K.filter) != null ? H : KS;
    return M ? ee(M, n.current.search, Y) : 0;
  }
  function A() {
    if (!n.current.search || i.current.shouldFilter === !1) return;
    let M = n.current.filtered.items, Y = [];
    n.current.filtered.groups.forEach((H) => {
      let ee = o.current.get(H), F = 0;
      ee.forEach((te) => {
        let J = M.get(te);
        F = Math.max(J, F);
      }), Y.push([H, F]);
    });
    let K = N.current;
    j().sort((H, ee) => {
      var F, te;
      let J = H.getAttribute("id"), oe = ee.getAttribute("id");
      return ((F = M.get(oe)) != null ? F : 0) - ((te = M.get(J)) != null ? te : 0);
    }).forEach((H) => {
      let ee = H.closest(Yo);
      ee ? ee.appendChild(H.parentElement === ee ? H : H.closest(`${Yo} > *`)) : K.appendChild(H.parentElement === K ? H : H.closest(`${Yo} > *`));
    }), Y.sort((H, ee) => ee[1] - H[1]).forEach((H) => {
      var ee;
      let F = (ee = N.current) == null ? void 0 : ee.querySelector(`${vn}[${Ut}="${encodeURIComponent(H[0])}"]`);
      F == null || F.parentElement.appendChild(F);
    });
  }
  function W() {
    let M = j().find((K) => K.getAttribute("aria-disabled") !== "true"), Y = M == null ? void 0 : M.getAttribute(Ut);
    E.setState("value", Y || void 0);
  }
  function $() {
    var M, Y, K, H;
    if (!n.current.search || i.current.shouldFilter === !1) {
      n.current.filtered.count = r.current.size;
      return;
    }
    n.current.filtered.groups = /* @__PURE__ */ new Set();
    let ee = 0;
    for (let F of r.current) {
      let te = (Y = (M = a.current.get(F)) == null ? void 0 : M.value) != null ? Y : "", J = (H = (K = a.current.get(F)) == null ? void 0 : K.keywords) != null ? H : [], oe = D(te, J);
      n.current.filtered.items.set(F, oe), oe > 0 && ee++;
    }
    for (let [F, te] of o.current) for (let J of te) if (n.current.filtered.items.get(J) > 0) {
      n.current.filtered.groups.add(F);
      break;
    }
    n.current.filtered.count = ee;
  }
  function z() {
    var M, Y, K;
    let H = O();
    H && (((M = H.parentElement) == null ? void 0 : M.firstChild) === H && ((K = (Y = H.closest(vn)) == null ? void 0 : Y.querySelector(US)) == null || K.scrollIntoView({ block: "nearest" })), H.scrollIntoView({ block: "nearest" }));
  }
  function O() {
    var M;
    return (M = N.current) == null ? void 0 : M.querySelector(`${dd}[aria-selected="true"]`);
  }
  function j() {
    var M;
    return Array.from(((M = N.current) == null ? void 0 : M.querySelectorAll(Oi)) || []);
  }
  function V(M) {
    let Y = j()[M];
    Y && E.setState("value", Y.getAttribute(Ut));
  }
  function G(M) {
    var Y;
    let K = O(), H = j(), ee = H.findIndex((te) => te === K), F = H[ee + M];
    (Y = i.current) != null && Y.loop && (F = ee + M < 0 ? H[H.length - 1] : ee + M === H.length ? H[0] : H[ee + M]), F && E.setState("value", F.getAttribute(Ut));
  }
  function B(M) {
    let Y = O(), K = Y == null ? void 0 : Y.closest(vn), H;
    for (; K && !H; ) K = M > 0 ? rC(K, vn) : oC(K, vn), H = K == null ? void 0 : K.querySelector(Oi);
    H ? E.setState("value", H.getAttribute(Ut)) : G(M);
  }
  let I = () => V(j().length - 1), Z = (M) => {
    M.preventDefault(), M.metaKey ? I() : M.altKey ? B(1) : G(1);
  }, Q = (M) => {
    M.preventDefault(), M.metaKey ? V(0) : M.altKey ? B(-1) : G(-1);
  };
  return l.createElement(L.div, { ref: t, tabIndex: -1, ...w, "cmdk-root": "", onKeyDown: (M) => {
    var Y;
    (Y = w.onKeyDown) == null || Y.call(w, M);
    let K = M.nativeEvent.isComposing || M.keyCode === 229;
    if (!(M.defaultPrevented || K)) switch (M.key) {
      case "n":
      case "j": {
        v && M.ctrlKey && Z(M);
        break;
      }
      case "ArrowDown": {
        Z(M);
        break;
      }
      case "p":
      case "k": {
        v && M.ctrlKey && Q(M);
        break;
      }
      case "ArrowUp": {
        Q(M);
        break;
      }
      case "Home": {
        M.preventDefault(), V(0);
        break;
      }
      case "End": {
        M.preventDefault(), I();
        break;
      }
      case "Enter": {
        M.preventDefault();
        let H = O();
        if (H) {
          let ee = new Event(sa);
          H.dispatchEvent(ee);
        }
      }
    }
  } }, l.createElement("label", { "cmdk-label": "", htmlFor: T.inputId, id: T.labelId, style: iC }, c), Xr(e, (M) => l.createElement(fd.Provider, { value: E }, l.createElement(ud.Provider, { value: T }, M))));
}), qS = l.forwardRef((e, t) => {
  var n, r;
  let o = he(), a = l.useRef(null), s = l.useContext(md), i = Vn(), c = hd(e), d = (r = (n = c.current) == null ? void 0 : n.forceMount) != null ? r : s == null ? void 0 : s.forceMount;
  Dt(() => {
    if (!d) return i.item(o, s == null ? void 0 : s.id);
  }, [d]);
  let m = gd(o, a, [e.value, e.children, a], e.keywords), f = rs(), p = vt((C) => C.value && C.value === m.current), h = vt((C) => d || i.filter() === !1 ? !0 : C.search ? C.filtered.items.get(o) > 0 : !0);
  l.useEffect(() => {
    let C = a.current;
    if (!(!C || e.disabled)) return C.addEventListener(sa, b), () => C.removeEventListener(sa, b);
  }, [h, e.onSelect, e.disabled]);
  function b() {
    var C, E;
    g(), (E = (C = c.current).onSelect) == null || E.call(C, m.current);
  }
  function g() {
    f.setState("value", m.current, !0);
  }
  if (!h) return null;
  let { disabled: v, value: w, onSelect: y, forceMount: x, keywords: S, ...N } = e;
  return l.createElement(L.div, { ref: ke(a, t), ...N, id: o, "cmdk-item": "", role: "option", "aria-disabled": !!v, "aria-selected": !!p, "data-disabled": !!v, "data-selected": !!p, onPointerMove: v || i.getDisablePointerSelection() ? void 0 : g, onClick: v ? void 0 : b }, e.children);
}), XS = l.forwardRef((e, t) => {
  let { heading: n, children: r, forceMount: o, ...a } = e, s = he(), i = l.useRef(null), c = l.useRef(null), d = he(), m = Vn(), f = vt((h) => o || m.filter() === !1 ? !0 : h.search ? h.filtered.groups.has(s) : !0);
  Dt(() => m.group(s), []), gd(s, i, [e.value, e.heading, c]);
  let p = l.useMemo(() => ({ id: s, forceMount: o }), [o]);
  return l.createElement(L.div, { ref: ke(i, t), ...a, "cmdk-group": "", role: "presentation", hidden: f ? void 0 : !0 }, n && l.createElement("div", { ref: c, "cmdk-group-heading": "", "aria-hidden": !0, id: d }, n), Xr(e, (h) => l.createElement("div", { "cmdk-group-items": "", role: "group", "aria-labelledby": n ? d : void 0 }, l.createElement(md.Provider, { value: p }, h))));
}), ZS = l.forwardRef((e, t) => {
  let { alwaysRender: n, ...r } = e, o = l.useRef(null), a = vt((s) => !s.search);
  return !n && !a ? null : l.createElement(L.div, { ref: ke(o, t), ...r, "cmdk-separator": "", role: "separator" });
}), QS = l.forwardRef((e, t) => {
  let { onValueChange: n, ...r } = e, o = e.value != null, a = rs(), s = vt((d) => d.search), i = vt((d) => d.selectedItemId), c = Vn();
  return l.useEffect(() => {
    e.value != null && a.setState("search", e.value);
  }, [e.value]), l.createElement(L.input, { ref: t, ...r, "cmdk-input": "", autoComplete: "off", autoCorrect: "off", spellCheck: !1, "aria-autocomplete": "list", role: "combobox", "aria-expanded": !0, "aria-controls": c.listId, "aria-labelledby": c.labelId, "aria-activedescendant": i, id: c.inputId, type: "text", value: o ? e.value : s, onChange: (d) => {
    o || a.setState("search", d.target.value), n == null || n(d.target.value);
  } });
}), JS = l.forwardRef((e, t) => {
  let { children: n, label: r = "Suggestions", ...o } = e, a = l.useRef(null), s = l.useRef(null), i = vt((d) => d.selectedItemId), c = Vn();
  return l.useEffect(() => {
    if (s.current && a.current) {
      let d = s.current, m = a.current, f, p = new ResizeObserver(() => {
        f = requestAnimationFrame(() => {
          let h = d.offsetHeight;
          m.style.setProperty("--cmdk-list-height", h.toFixed(1) + "px");
        });
      });
      return p.observe(d), () => {
        cancelAnimationFrame(f), p.unobserve(d);
      };
    }
  }, []), l.createElement(L.div, { ref: ke(a, t), ...o, "cmdk-list": "", role: "listbox", tabIndex: -1, "aria-activedescendant": i, "aria-label": r, id: c.listId }, Xr(e, (d) => l.createElement("div", { ref: ke(s, c.listInnerRef), "cmdk-list-sizer": "" }, d)));
}), eC = l.forwardRef((e, t) => {
  let { open: n, onOpenChange: r, overlayClassName: o, contentClassName: a, container: s, ...i } = e;
  return l.createElement(ts, { open: n, onOpenChange: r }, l.createElement(ns, { container: s }, l.createElement(Ln, { "cmdk-overlay": "", className: o }), l.createElement(Bn, { "aria-label": e.label, "cmdk-dialog": "", className: a }, l.createElement(pd, { ref: t, ...i }))));
}), tC = l.forwardRef((e, t) => vt((n) => n.filtered.count === 0) ? l.createElement(L.div, { ref: t, ...e, "cmdk-empty": "", role: "presentation" }) : null), nC = l.forwardRef((e, t) => {
  let { progress: n, children: r, label: o = "Loading...", ...a } = e;
  return l.createElement(L.div, { ref: t, ...a, "cmdk-loading": "", role: "progressbar", "aria-valuenow": n, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": o }, Xr(e, (s) => l.createElement("div", { "aria-hidden": !0 }, s)));
}), Re = Object.assign(pd, { List: JS, Item: qS, Input: QS, Group: XS, Separator: ZS, Dialog: eC, Empty: tC, Loading: nC });
function rC(e, t) {
  let n = e.nextElementSibling;
  for (; n; ) {
    if (n.matches(t)) return n;
    n = n.nextElementSibling;
  }
}
function oC(e, t) {
  let n = e.previousElementSibling;
  for (; n; ) {
    if (n.matches(t)) return n;
    n = n.previousElementSibling;
  }
}
function hd(e) {
  let t = l.useRef(e);
  return Dt(() => {
    t.current = e;
  }), t;
}
var Dt = typeof window > "u" ? l.useEffect : l.useLayoutEffect;
function Kt(e) {
  let t = l.useRef();
  return t.current === void 0 && (t.current = e()), t;
}
function vt(e) {
  let t = rs(), n = () => e(t.snapshot());
  return l.useSyncExternalStore(t.subscribe, n, n);
}
function gd(e, t, n, r = []) {
  let o = l.useRef(), a = Vn();
  return Dt(() => {
    var s;
    let i = (() => {
      var d;
      for (let m of n) {
        if (typeof m == "string") return m.trim();
        if (typeof m == "object" && "current" in m) return m.current ? (d = m.current.textContent) == null ? void 0 : d.trim() : o.current;
      }
    })(), c = r.map((d) => d.trim());
    a.value(e, i, c), (s = t.current) == null || s.setAttribute(Ut, i), o.current = i;
  }), o;
}
var aC = () => {
  let [e, t] = l.useState(), n = Kt(() => /* @__PURE__ */ new Map());
  return Dt(() => {
    n.current.forEach((r) => r()), n.current = /* @__PURE__ */ new Map();
  }, [e]), (r, o) => {
    n.current.set(r, o), t({});
  };
};
function sC(e) {
  let t = e.type;
  return typeof t == "function" ? t(e.props) : "render" in t ? t.render(e.props) : e;
}
function Xr({ asChild: e, children: t }, n) {
  return e && l.isValidElement(t) ? l.cloneElement(sC(t), { ref: t.ref }, n(t.props.children)) : n(t);
}
var iC = { position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0" };
const vd = ts, cC = ld, lC = ns, TM = qr, bd = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  Ln,
  {
    ref: n,
    className: k(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      e
    ),
    ...t
  }
));
bd.displayName = Ln.displayName;
const os = l.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ R(lC, { children: [
  /* @__PURE__ */ u(bd, {}),
  /* @__PURE__ */ R(
    Bn,
    {
      ref: r,
      className: k(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        e
      ),
      ...n,
      children: [
        t,
        /* @__PURE__ */ R(qr, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ u(Lr, { className: "h-4 w-4" }),
          /* @__PURE__ */ u("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
os.displayName = Bn.displayName;
const yd = ({
  className: e,
  ...t
}) => /* @__PURE__ */ u(
  "div",
  {
    className: k(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      e
    ),
    ...t
  }
);
yd.displayName = "DialogHeader";
const wd = ({
  className: e,
  ...t
}) => /* @__PURE__ */ u(
  "div",
  {
    className: k(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      e
    ),
    ...t
  }
);
wd.displayName = "DialogFooter";
const xd = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  Ur,
  {
    ref: n,
    className: k(
      "text-lg font-semibold leading-none tracking-tight",
      e
    ),
    ...t
  }
));
xd.displayName = Ur.displayName;
const Sd = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  Kr,
  {
    ref: n,
    className: k("text-sm text-muted-foreground", e),
    ...t
  }
));
Sd.displayName = Kr.displayName;
const as = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  Re,
  {
    ref: n,
    className: k(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      e
    ),
    ...t
  }
));
as.displayName = Re.displayName;
const _M = ({ children: e, ...t }) => /* @__PURE__ */ u(vd, { ...t, children: /* @__PURE__ */ u(os, { className: "overflow-hidden p-0", children: /* @__PURE__ */ u(as, { className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5", children: e }) }) }), Cd = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ R("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ u(Wc, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
  /* @__PURE__ */ u(
    Re.Input,
    {
      ref: n,
      className: k(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        e
      ),
      ...t
    }
  )
] }));
Cd.displayName = Re.Input.displayName;
const Nd = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  Re.List,
  {
    ref: n,
    className: k("max-h-[300px] overflow-y-auto overflow-x-hidden", e),
    ...t
  }
));
Nd.displayName = Re.List.displayName;
const Ed = l.forwardRef((e, t) => /* @__PURE__ */ u(
  Re.Empty,
  {
    ref: t,
    className: "py-6 text-center text-sm",
    ...e
  }
));
Ed.displayName = Re.Empty.displayName;
const kd = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  Re.Group,
  {
    ref: n,
    className: k(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      e
    ),
    ...t
  }
));
kd.displayName = Re.Group.displayName;
const dC = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  Re.Separator,
  {
    ref: n,
    className: k("-mx-1 h-px bg-border", e),
    ...t
  }
));
dC.displayName = Re.Separator.displayName;
const Pd = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  Re.Item,
  {
    ref: n,
    className: k(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      e
    ),
    ...t
  }
));
Pd.displayName = Re.Item.displayName;
const uC = ({
  className: e,
  ...t
}) => /* @__PURE__ */ u(
  "span",
  {
    className: k(
      "ml-auto text-xs tracking-widest text-muted-foreground",
      e
    ),
    ...t
  }
);
uC.displayName = "CommandShortcut";
const fC = ["top", "right", "bottom", "left"], bt = Math.min, _e = Math.max, Cr = Math.round, rr = Math.floor, tt = (e) => ({
  x: e,
  y: e
}), mC = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function ia(e, t, n) {
  return _e(e, bt(t, n));
}
function ct(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function lt(e) {
  return e.split("-")[0];
}
function dn(e) {
  return e.split("-")[1];
}
function ss(e) {
  return e === "x" ? "y" : "x";
}
function is(e) {
  return e === "y" ? "height" : "width";
}
function et(e) {
  const t = e[0];
  return t === "t" || t === "b" ? "y" : "x";
}
function cs(e) {
  return ss(et(e));
}
function pC(e, t, n) {
  n === void 0 && (n = !1);
  const r = dn(e), o = cs(e), a = is(o);
  let s = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[a] > t.floating[a] && (s = Nr(s)), [s, Nr(s)];
}
function hC(e) {
  const t = Nr(e);
  return [ca(e), t, ca(t)];
}
function ca(e) {
  return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
const Ai = ["left", "right"], Ii = ["right", "left"], gC = ["top", "bottom"], vC = ["bottom", "top"];
function bC(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? Ii : Ai : t ? Ai : Ii;
    case "left":
    case "right":
      return t ? gC : vC;
    default:
      return [];
  }
}
function yC(e, t, n, r) {
  const o = dn(e);
  let a = bC(lt(e), n === "start", r);
  return o && (a = a.map((s) => s + "-" + o), t && (a = a.concat(a.map(ca)))), a;
}
function Nr(e) {
  const t = lt(e);
  return mC[t] + e.slice(t.length);
}
function wC(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Rd(e) {
  return typeof e != "number" ? wC(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Er(e) {
  const {
    x: t,
    y: n,
    width: r,
    height: o
  } = e;
  return {
    width: r,
    height: o,
    top: n,
    left: t,
    right: t + r,
    bottom: n + o,
    x: t,
    y: n
  };
}
function $i(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const a = et(t), s = cs(t), i = is(s), c = lt(t), d = a === "y", m = r.x + r.width / 2 - o.width / 2, f = r.y + r.height / 2 - o.height / 2, p = r[i] / 2 - o[i] / 2;
  let h;
  switch (c) {
    case "top":
      h = {
        x: m,
        y: r.y - o.height
      };
      break;
    case "bottom":
      h = {
        x: m,
        y: r.y + r.height
      };
      break;
    case "right":
      h = {
        x: r.x + r.width,
        y: f
      };
      break;
    case "left":
      h = {
        x: r.x - o.width,
        y: f
      };
      break;
    default:
      h = {
        x: r.x,
        y: r.y
      };
  }
  switch (dn(t)) {
    case "start":
      h[s] -= p * (n && d ? -1 : 1);
      break;
    case "end":
      h[s] += p * (n && d ? -1 : 1);
      break;
  }
  return h;
}
async function xC(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: o,
    platform: a,
    rects: s,
    elements: i,
    strategy: c
  } = e, {
    boundary: d = "clippingAncestors",
    rootBoundary: m = "viewport",
    elementContext: f = "floating",
    altBoundary: p = !1,
    padding: h = 0
  } = ct(t, e), b = Rd(h), v = i[p ? f === "floating" ? "reference" : "floating" : f], w = Er(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(v))) == null || n ? v : v.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(i.floating)),
    boundary: d,
    rootBoundary: m,
    strategy: c
  })), y = f === "floating" ? {
    x: r,
    y: o,
    width: s.floating.width,
    height: s.floating.height
  } : s.reference, x = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(i.floating)), S = await (a.isElement == null ? void 0 : a.isElement(x)) ? await (a.getScale == null ? void 0 : a.getScale(x)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, N = Er(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: y,
    offsetParent: x,
    strategy: c
  }) : y);
  return {
    top: (w.top - N.top + b.top) / S.y,
    bottom: (N.bottom - w.bottom + b.bottom) / S.y,
    left: (w.left - N.left + b.left) / S.x,
    right: (N.right - w.right + b.right) / S.x
  };
}
const SC = 50, CC = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: a = [],
    platform: s
  } = n, i = s.detectOverflow ? s : {
    ...s,
    detectOverflow: xC
  }, c = await (s.isRTL == null ? void 0 : s.isRTL(t));
  let d = await s.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: m,
    y: f
  } = $i(d, r, c), p = r, h = 0;
  const b = {};
  for (let g = 0; g < a.length; g++) {
    const v = a[g];
    if (!v)
      continue;
    const {
      name: w,
      fn: y
    } = v, {
      x,
      y: S,
      data: N,
      reset: C
    } = await y({
      x: m,
      y: f,
      initialPlacement: r,
      placement: p,
      strategy: o,
      middlewareData: b,
      rects: d,
      platform: i,
      elements: {
        reference: e,
        floating: t
      }
    });
    m = x ?? m, f = S ?? f, b[w] = {
      ...b[w],
      ...N
    }, C && h < SC && (h++, typeof C == "object" && (C.placement && (p = C.placement), C.rects && (d = C.rects === !0 ? await s.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : C.rects), {
      x: m,
      y: f
    } = $i(d, p, c)), g = -1);
  }
  return {
    x: m,
    y: f,
    placement: p,
    strategy: o,
    middlewareData: b
  };
}, NC = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: r,
      placement: o,
      rects: a,
      platform: s,
      elements: i,
      middlewareData: c
    } = t, {
      element: d,
      padding: m = 0
    } = ct(e, t) || {};
    if (d == null)
      return {};
    const f = Rd(m), p = {
      x: n,
      y: r
    }, h = cs(o), b = is(h), g = await s.getDimensions(d), v = h === "y", w = v ? "top" : "left", y = v ? "bottom" : "right", x = v ? "clientHeight" : "clientWidth", S = a.reference[b] + a.reference[h] - p[h] - a.floating[b], N = p[h] - a.reference[h], C = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(d));
    let E = C ? C[x] : 0;
    (!E || !await (s.isElement == null ? void 0 : s.isElement(C))) && (E = i.floating[x] || a.floating[b]);
    const T = S / 2 - N / 2, D = E / 2 - g[b] / 2 - 1, A = bt(f[w], D), W = bt(f[y], D), $ = A, z = E - g[b] - W, O = E / 2 - g[b] / 2 + T, j = ia($, O, z), V = !c.arrow && dn(o) != null && O !== j && a.reference[b] / 2 - (O < $ ? A : W) - g[b] / 2 < 0, G = V ? O < $ ? O - $ : O - z : 0;
    return {
      [h]: p[h] + G,
      data: {
        [h]: j,
        centerOffset: O - j - G,
        ...V && {
          alignmentOffset: G
        }
      },
      reset: V
    };
  }
}), EC = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        middlewareData: a,
        rects: s,
        initialPlacement: i,
        platform: c,
        elements: d
      } = t, {
        mainAxis: m = !0,
        crossAxis: f = !0,
        fallbackPlacements: p,
        fallbackStrategy: h = "bestFit",
        fallbackAxisSideDirection: b = "none",
        flipAlignment: g = !0,
        ...v
      } = ct(e, t);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const w = lt(o), y = et(i), x = lt(i) === i, S = await (c.isRTL == null ? void 0 : c.isRTL(d.floating)), N = p || (x || !g ? [Nr(i)] : hC(i)), C = b !== "none";
      !p && C && N.push(...yC(i, g, b, S));
      const E = [i, ...N], T = await c.detectOverflow(t, v), D = [];
      let A = ((r = a.flip) == null ? void 0 : r.overflows) || [];
      if (m && D.push(T[w]), f) {
        const O = pC(o, s, S);
        D.push(T[O[0]], T[O[1]]);
      }
      if (A = [...A, {
        placement: o,
        overflows: D
      }], !D.every((O) => O <= 0)) {
        var W, $;
        const O = (((W = a.flip) == null ? void 0 : W.index) || 0) + 1, j = E[O];
        if (j && (!(f === "alignment" ? y !== et(j) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        A.every((B) => et(B.placement) === y ? B.overflows[0] > 0 : !0)))
          return {
            data: {
              index: O,
              overflows: A
            },
            reset: {
              placement: j
            }
          };
        let V = ($ = A.filter((G) => G.overflows[0] <= 0).sort((G, B) => G.overflows[1] - B.overflows[1])[0]) == null ? void 0 : $.placement;
        if (!V)
          switch (h) {
            case "bestFit": {
              var z;
              const G = (z = A.filter((B) => {
                if (C) {
                  const I = et(B.placement);
                  return I === y || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  I === "y";
                }
                return !0;
              }).map((B) => [B.placement, B.overflows.filter((I) => I > 0).reduce((I, Z) => I + Z, 0)]).sort((B, I) => B[1] - I[1])[0]) == null ? void 0 : z[0];
              G && (V = G);
              break;
            }
            case "initialPlacement":
              V = i;
              break;
          }
        if (o !== V)
          return {
            reset: {
              placement: V
            }
          };
      }
      return {};
    }
  };
};
function Wi(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Fi(e) {
  return fC.some((t) => e[t] >= 0);
}
const kC = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n,
        platform: r
      } = t, {
        strategy: o = "referenceHidden",
        ...a
      } = ct(e, t);
      switch (o) {
        case "referenceHidden": {
          const s = await r.detectOverflow(t, {
            ...a,
            elementContext: "reference"
          }), i = Wi(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: i,
              referenceHidden: Fi(i)
            }
          };
        }
        case "escaped": {
          const s = await r.detectOverflow(t, {
            ...a,
            altBoundary: !0
          }), i = Wi(s, n.floating);
          return {
            data: {
              escapedOffsets: i,
              escaped: Fi(i)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Md = /* @__PURE__ */ new Set(["left", "top"]);
async function PC(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), s = lt(n), i = dn(n), c = et(n) === "y", d = Md.has(s) ? -1 : 1, m = a && c ? -1 : 1, f = ct(t, e);
  let {
    mainAxis: p,
    crossAxis: h,
    alignmentAxis: b
  } = typeof f == "number" ? {
    mainAxis: f,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: f.mainAxis || 0,
    crossAxis: f.crossAxis || 0,
    alignmentAxis: f.alignmentAxis
  };
  return i && typeof b == "number" && (h = i === "end" ? b * -1 : b), c ? {
    x: h * m,
    y: p * d
  } : {
    x: p * d,
    y: h * m
  };
}
const RC = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, r;
      const {
        x: o,
        y: a,
        placement: s,
        middlewareData: i
      } = t, c = await PC(t, e);
      return s === ((n = i.offset) == null ? void 0 : n.placement) && (r = i.arrow) != null && r.alignmentOffset ? {} : {
        x: o + c.x,
        y: a + c.y,
        data: {
          ...c,
          placement: s
        }
      };
    }
  };
}, MC = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: r,
        placement: o,
        platform: a
      } = t, {
        mainAxis: s = !0,
        crossAxis: i = !1,
        limiter: c = {
          fn: (w) => {
            let {
              x: y,
              y: x
            } = w;
            return {
              x: y,
              y: x
            };
          }
        },
        ...d
      } = ct(e, t), m = {
        x: n,
        y: r
      }, f = await a.detectOverflow(t, d), p = et(lt(o)), h = ss(p);
      let b = m[h], g = m[p];
      if (s) {
        const w = h === "y" ? "top" : "left", y = h === "y" ? "bottom" : "right", x = b + f[w], S = b - f[y];
        b = ia(x, b, S);
      }
      if (i) {
        const w = p === "y" ? "top" : "left", y = p === "y" ? "bottom" : "right", x = g + f[w], S = g - f[y];
        g = ia(x, g, S);
      }
      const v = c.fn({
        ...t,
        [h]: b,
        [p]: g
      });
      return {
        ...v,
        data: {
          x: v.x - n,
          y: v.y - r,
          enabled: {
            [h]: s,
            [p]: i
          }
        }
      };
    }
  };
}, TC = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: r,
        placement: o,
        rects: a,
        middlewareData: s
      } = t, {
        offset: i = 0,
        mainAxis: c = !0,
        crossAxis: d = !0
      } = ct(e, t), m = {
        x: n,
        y: r
      }, f = et(o), p = ss(f);
      let h = m[p], b = m[f];
      const g = ct(i, t), v = typeof g == "number" ? {
        mainAxis: g,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...g
      };
      if (c) {
        const x = p === "y" ? "height" : "width", S = a.reference[p] - a.floating[x] + v.mainAxis, N = a.reference[p] + a.reference[x] - v.mainAxis;
        h < S ? h = S : h > N && (h = N);
      }
      if (d) {
        var w, y;
        const x = p === "y" ? "width" : "height", S = Md.has(lt(o)), N = a.reference[f] - a.floating[x] + (S && ((w = s.offset) == null ? void 0 : w[f]) || 0) + (S ? 0 : v.crossAxis), C = a.reference[f] + a.reference[x] + (S ? 0 : ((y = s.offset) == null ? void 0 : y[f]) || 0) - (S ? v.crossAxis : 0);
        b < N ? b = N : b > C && (b = C);
      }
      return {
        [p]: h,
        [f]: b
      };
    }
  };
}, _C = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        rects: a,
        platform: s,
        elements: i
      } = t, {
        apply: c = () => {
        },
        ...d
      } = ct(e, t), m = await s.detectOverflow(t, d), f = lt(o), p = dn(o), h = et(o) === "y", {
        width: b,
        height: g
      } = a.floating;
      let v, w;
      f === "top" || f === "bottom" ? (v = f, w = p === (await (s.isRTL == null ? void 0 : s.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (w = f, v = p === "end" ? "top" : "bottom");
      const y = g - m.top - m.bottom, x = b - m.left - m.right, S = bt(g - m[v], y), N = bt(b - m[w], x), C = !t.middlewareData.shift;
      let E = S, T = N;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (T = x), (r = t.middlewareData.shift) != null && r.enabled.y && (E = y), C && !p) {
        const A = _e(m.left, 0), W = _e(m.right, 0), $ = _e(m.top, 0), z = _e(m.bottom, 0);
        h ? T = b - 2 * (A !== 0 || W !== 0 ? A + W : _e(m.left, m.right)) : E = g - 2 * ($ !== 0 || z !== 0 ? $ + z : _e(m.top, m.bottom));
      }
      await c({
        ...t,
        availableWidth: T,
        availableHeight: E
      });
      const D = await s.getDimensions(i.floating);
      return b !== D.width || g !== D.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Zr() {
  return typeof window < "u";
}
function un(e) {
  return Td(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function De(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function rt(e) {
  var t;
  return (t = (Td(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Td(e) {
  return Zr() ? e instanceof Node || e instanceof De(e).Node : !1;
}
function je(e) {
  return Zr() ? e instanceof Element || e instanceof De(e).Element : !1;
}
function dt(e) {
  return Zr() ? e instanceof HTMLElement || e instanceof De(e).HTMLElement : !1;
}
function Li(e) {
  return !Zr() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof De(e).ShadowRoot;
}
function Hn(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = Ge(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && o !== "inline" && o !== "contents";
}
function DC(e) {
  return /^(table|td|th)$/.test(un(e));
}
function Qr(e) {
  try {
    if (e.matches(":popover-open"))
      return !0;
  } catch {
  }
  try {
    return e.matches(":modal");
  } catch {
    return !1;
  }
}
const OC = /transform|translate|scale|rotate|perspective|filter/, AC = /paint|layout|strict|content/, Rt = (e) => !!e && e !== "none";
let zo;
function ls(e) {
  const t = je(e) ? Ge(e) : e;
  return Rt(t.transform) || Rt(t.translate) || Rt(t.scale) || Rt(t.rotate) || Rt(t.perspective) || !ds() && (Rt(t.backdropFilter) || Rt(t.filter)) || OC.test(t.willChange || "") || AC.test(t.contain || "");
}
function IC(e) {
  let t = yt(e);
  for (; dt(t) && !nn(t); ) {
    if (ls(t))
      return t;
    if (Qr(t))
      return null;
    t = yt(t);
  }
  return null;
}
function ds() {
  return zo == null && (zo = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), zo;
}
function nn(e) {
  return /^(html|body|#document)$/.test(un(e));
}
function Ge(e) {
  return De(e).getComputedStyle(e);
}
function Jr(e) {
  return je(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function yt(e) {
  if (un(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    Li(e) && e.host || // Fallback.
    rt(e)
  );
  return Li(t) ? t.host : t;
}
function _d(e) {
  const t = yt(e);
  return nn(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : dt(t) && Hn(t) ? t : _d(t);
}
function En(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = _d(e), a = o === ((r = e.ownerDocument) == null ? void 0 : r.body), s = De(o);
  if (a) {
    const i = la(s);
    return t.concat(s, s.visualViewport || [], Hn(o) ? o : [], i && n ? En(i) : []);
  } else
    return t.concat(o, En(o, [], n));
}
function la(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Dd(e) {
  const t = Ge(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = dt(e), a = o ? e.offsetWidth : n, s = o ? e.offsetHeight : r, i = Cr(n) !== a || Cr(r) !== s;
  return i && (n = a, r = s), {
    width: n,
    height: r,
    $: i
  };
}
function us(e) {
  return je(e) ? e : e.contextElement;
}
function Jt(e) {
  const t = us(e);
  if (!dt(t))
    return tt(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: a
  } = Dd(t);
  let s = (a ? Cr(n.width) : n.width) / r, i = (a ? Cr(n.height) : n.height) / o;
  return (!s || !Number.isFinite(s)) && (s = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: s,
    y: i
  };
}
const $C = /* @__PURE__ */ tt(0);
function Od(e) {
  const t = De(e);
  return !ds() || !t.visualViewport ? $C : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function WC(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== De(e) ? !1 : t;
}
function Ot(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), a = us(e);
  let s = tt(1);
  t && (r ? je(r) && (s = Jt(r)) : s = Jt(e));
  const i = WC(a, n, r) ? Od(a) : tt(0);
  let c = (o.left + i.x) / s.x, d = (o.top + i.y) / s.y, m = o.width / s.x, f = o.height / s.y;
  if (a) {
    const p = De(a), h = r && je(r) ? De(r) : r;
    let b = p, g = la(b);
    for (; g && r && h !== b; ) {
      const v = Jt(g), w = g.getBoundingClientRect(), y = Ge(g), x = w.left + (g.clientLeft + parseFloat(y.paddingLeft)) * v.x, S = w.top + (g.clientTop + parseFloat(y.paddingTop)) * v.y;
      c *= v.x, d *= v.y, m *= v.x, f *= v.y, c += x, d += S, b = De(g), g = la(b);
    }
  }
  return Er({
    width: m,
    height: f,
    x: c,
    y: d
  });
}
function eo(e, t) {
  const n = Jr(e).scrollLeft;
  return t ? t.left + n : Ot(rt(e)).left + n;
}
function Ad(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - eo(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function FC(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const a = o === "fixed", s = rt(r), i = t ? Qr(t.floating) : !1;
  if (r === s || i && a)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, d = tt(1);
  const m = tt(0), f = dt(r);
  if ((f || !f && !a) && ((un(r) !== "body" || Hn(s)) && (c = Jr(r)), f)) {
    const h = Ot(r);
    d = Jt(r), m.x = h.x + r.clientLeft, m.y = h.y + r.clientTop;
  }
  const p = s && !f && !a ? Ad(s, c) : tt(0);
  return {
    width: n.width * d.x,
    height: n.height * d.y,
    x: n.x * d.x - c.scrollLeft * d.x + m.x + p.x,
    y: n.y * d.y - c.scrollTop * d.y + m.y + p.y
  };
}
function LC(e) {
  return Array.from(e.getClientRects());
}
function BC(e) {
  const t = rt(e), n = Jr(e), r = e.ownerDocument.body, o = _e(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = _e(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let s = -n.scrollLeft + eo(e);
  const i = -n.scrollTop;
  return Ge(r).direction === "rtl" && (s += _e(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: a,
    x: s,
    y: i
  };
}
const Bi = 25;
function VC(e, t) {
  const n = De(e), r = rt(e), o = n.visualViewport;
  let a = r.clientWidth, s = r.clientHeight, i = 0, c = 0;
  if (o) {
    a = o.width, s = o.height;
    const m = ds();
    (!m || m && t === "fixed") && (i = o.offsetLeft, c = o.offsetTop);
  }
  const d = eo(r);
  if (d <= 0) {
    const m = r.ownerDocument, f = m.body, p = getComputedStyle(f), h = m.compatMode === "CSS1Compat" && parseFloat(p.marginLeft) + parseFloat(p.marginRight) || 0, b = Math.abs(r.clientWidth - f.clientWidth - h);
    b <= Bi && (a -= b);
  } else d <= Bi && (a += d);
  return {
    width: a,
    height: s,
    x: i,
    y: c
  };
}
function HC(e, t) {
  const n = Ot(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, a = dt(e) ? Jt(e) : tt(1), s = e.clientWidth * a.x, i = e.clientHeight * a.y, c = o * a.x, d = r * a.y;
  return {
    width: s,
    height: i,
    x: c,
    y: d
  };
}
function Vi(e, t, n) {
  let r;
  if (t === "viewport")
    r = VC(e, n);
  else if (t === "document")
    r = BC(rt(e));
  else if (je(t))
    r = HC(t, n);
  else {
    const o = Od(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return Er(r);
}
function Id(e, t) {
  const n = yt(e);
  return n === t || !je(n) || nn(n) ? !1 : Ge(n).position === "fixed" || Id(n, t);
}
function YC(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = En(e, [], !1).filter((i) => je(i) && un(i) !== "body"), o = null;
  const a = Ge(e).position === "fixed";
  let s = a ? yt(e) : e;
  for (; je(s) && !nn(s); ) {
    const i = Ge(s), c = ls(s);
    !c && i.position === "fixed" && (o = null), (a ? !c && !o : !c && i.position === "static" && !!o && (o.position === "absolute" || o.position === "fixed") || Hn(s) && !c && Id(e, s)) ? r = r.filter((m) => m !== s) : o = i, s = yt(s);
  }
  return t.set(e, r), r;
}
function zC(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const s = [...n === "clippingAncestors" ? Qr(t) ? [] : YC(t, this._c) : [].concat(n), r], i = Vi(t, s[0], o);
  let c = i.top, d = i.right, m = i.bottom, f = i.left;
  for (let p = 1; p < s.length; p++) {
    const h = Vi(t, s[p], o);
    c = _e(h.top, c), d = bt(h.right, d), m = bt(h.bottom, m), f = _e(h.left, f);
  }
  return {
    width: d - f,
    height: m - c,
    x: f,
    y: c
  };
}
function jC(e) {
  const {
    width: t,
    height: n
  } = Dd(e);
  return {
    width: t,
    height: n
  };
}
function GC(e, t, n) {
  const r = dt(t), o = rt(t), a = n === "fixed", s = Ot(e, !0, a, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = tt(0);
  function d() {
    c.x = eo(o);
  }
  if (r || !r && !a)
    if ((un(t) !== "body" || Hn(o)) && (i = Jr(t)), r) {
      const h = Ot(t, !0, a, t);
      c.x = h.x + t.clientLeft, c.y = h.y + t.clientTop;
    } else o && d();
  a && !r && o && d();
  const m = o && !r && !a ? Ad(o, i) : tt(0), f = s.left + i.scrollLeft - c.x - m.x, p = s.top + i.scrollTop - c.y - m.y;
  return {
    x: f,
    y: p,
    width: s.width,
    height: s.height
  };
}
function jo(e) {
  return Ge(e).position === "static";
}
function Hi(e, t) {
  if (!dt(e) || Ge(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return rt(e) === n && (n = n.ownerDocument.body), n;
}
function $d(e, t) {
  const n = De(e);
  if (Qr(e))
    return n;
  if (!dt(e)) {
    let o = yt(e);
    for (; o && !nn(o); ) {
      if (je(o) && !jo(o))
        return o;
      o = yt(o);
    }
    return n;
  }
  let r = Hi(e, t);
  for (; r && DC(r) && jo(r); )
    r = Hi(r, t);
  return r && nn(r) && jo(r) && !ls(r) ? n : r || IC(e) || n;
}
const UC = async function(e) {
  const t = this.getOffsetParent || $d, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: GC(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function KC(e) {
  return Ge(e).direction === "rtl";
}
const qC = {
  convertOffsetParentRelativeRectToViewportRelativeRect: FC,
  getDocumentElement: rt,
  getClippingRect: zC,
  getOffsetParent: $d,
  getElementRects: UC,
  getClientRects: LC,
  getDimensions: jC,
  getScale: Jt,
  isElement: je,
  isRTL: KC
};
function Wd(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function XC(e, t) {
  let n = null, r;
  const o = rt(e);
  function a() {
    var i;
    clearTimeout(r), (i = n) == null || i.disconnect(), n = null;
  }
  function s(i, c) {
    i === void 0 && (i = !1), c === void 0 && (c = 1), a();
    const d = e.getBoundingClientRect(), {
      left: m,
      top: f,
      width: p,
      height: h
    } = d;
    if (i || t(), !p || !h)
      return;
    const b = rr(f), g = rr(o.clientWidth - (m + p)), v = rr(o.clientHeight - (f + h)), w = rr(m), x = {
      rootMargin: -b + "px " + -g + "px " + -v + "px " + -w + "px",
      threshold: _e(0, bt(1, c)) || 1
    };
    let S = !0;
    function N(C) {
      const E = C[0].intersectionRatio;
      if (E !== c) {
        if (!S)
          return s();
        E ? s(!1, E) : r = setTimeout(() => {
          s(!1, 1e-7);
        }, 1e3);
      }
      E === 1 && !Wd(d, e.getBoundingClientRect()) && s(), S = !1;
    }
    try {
      n = new IntersectionObserver(N, {
        ...x,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(N, x);
    }
    n.observe(e);
  }
  return s(!0), a;
}
function ZC(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: a = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, d = us(e), m = o || a ? [...d ? En(d) : [], ...t ? En(t) : []] : [];
  m.forEach((w) => {
    o && w.addEventListener("scroll", n, {
      passive: !0
    }), a && w.addEventListener("resize", n);
  });
  const f = d && i ? XC(d, n) : null;
  let p = -1, h = null;
  s && (h = new ResizeObserver((w) => {
    let [y] = w;
    y && y.target === d && h && t && (h.unobserve(t), cancelAnimationFrame(p), p = requestAnimationFrame(() => {
      var x;
      (x = h) == null || x.observe(t);
    })), n();
  }), d && !c && h.observe(d), t && h.observe(t));
  let b, g = c ? Ot(e) : null;
  c && v();
  function v() {
    const w = Ot(e);
    g && !Wd(g, w) && n(), g = w, b = requestAnimationFrame(v);
  }
  return n(), () => {
    var w;
    m.forEach((y) => {
      o && y.removeEventListener("scroll", n), a && y.removeEventListener("resize", n);
    }), f == null || f(), (w = h) == null || w.disconnect(), h = null, c && cancelAnimationFrame(b);
  };
}
const QC = RC, JC = MC, e0 = EC, t0 = _C, n0 = kC, Yi = NC, r0 = TC, o0 = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: qC,
    ...n
  }, a = {
    ...o.platform,
    _c: r
  };
  return CC(e, t, {
    ...o,
    platform: a
  });
};
var a0 = typeof document < "u", s0 = function() {
}, ur = a0 ? ic : s0;
function kr(e, t) {
  if (e === t)
    return !0;
  if (typeof e != typeof t)
    return !1;
  if (typeof e == "function" && e.toString() === t.toString())
    return !0;
  let n, r, o;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (n = e.length, n !== t.length) return !1;
      for (r = n; r-- !== 0; )
        if (!kr(e[r], t[r]))
          return !1;
      return !0;
    }
    if (o = Object.keys(e), n = o.length, n !== Object.keys(t).length)
      return !1;
    for (r = n; r-- !== 0; )
      if (!{}.hasOwnProperty.call(t, o[r]))
        return !1;
    for (r = n; r-- !== 0; ) {
      const a = o[r];
      if (!(a === "_owner" && e.$$typeof) && !kr(e[a], t[a]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Fd(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function zi(e, t) {
  const n = Fd(e);
  return Math.round(t * n) / n;
}
function Go(e) {
  const t = l.useRef(e);
  return ur(() => {
    t.current = e;
  }), t;
}
function i0(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: n = "absolute",
    middleware: r = [],
    platform: o,
    elements: {
      reference: a,
      floating: s
    } = {},
    transform: i = !0,
    whileElementsMounted: c,
    open: d
  } = e, [m, f] = l.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [p, h] = l.useState(r);
  kr(p, r) || h(r);
  const [b, g] = l.useState(null), [v, w] = l.useState(null), y = l.useCallback((B) => {
    B !== C.current && (C.current = B, g(B));
  }, []), x = l.useCallback((B) => {
    B !== E.current && (E.current = B, w(B));
  }, []), S = a || b, N = s || v, C = l.useRef(null), E = l.useRef(null), T = l.useRef(m), D = c != null, A = Go(c), W = Go(o), $ = Go(d), z = l.useCallback(() => {
    if (!C.current || !E.current)
      return;
    const B = {
      placement: t,
      strategy: n,
      middleware: p
    };
    W.current && (B.platform = W.current), o0(C.current, E.current, B).then((I) => {
      const Z = {
        ...I,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: $.current !== !1
      };
      O.current && !kr(T.current, Z) && (T.current = Z, Tn.flushSync(() => {
        f(Z);
      }));
    });
  }, [p, t, n, W, $]);
  ur(() => {
    d === !1 && T.current.isPositioned && (T.current.isPositioned = !1, f((B) => ({
      ...B,
      isPositioned: !1
    })));
  }, [d]);
  const O = l.useRef(!1);
  ur(() => (O.current = !0, () => {
    O.current = !1;
  }), []), ur(() => {
    if (S && (C.current = S), N && (E.current = N), S && N) {
      if (A.current)
        return A.current(S, N, z);
      z();
    }
  }, [S, N, z, A, D]);
  const j = l.useMemo(() => ({
    reference: C,
    floating: E,
    setReference: y,
    setFloating: x
  }), [y, x]), V = l.useMemo(() => ({
    reference: S,
    floating: N
  }), [S, N]), G = l.useMemo(() => {
    const B = {
      position: n,
      left: 0,
      top: 0
    };
    if (!V.floating)
      return B;
    const I = zi(V.floating, m.x), Z = zi(V.floating, m.y);
    return i ? {
      ...B,
      transform: "translate(" + I + "px, " + Z + "px)",
      ...Fd(V.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: I,
      top: Z
    };
  }, [n, i, V.floating, m.x, m.y]);
  return l.useMemo(() => ({
    ...m,
    update: z,
    refs: j,
    elements: V,
    floatingStyles: G
  }), [m, z, j, V, G]);
}
const c0 = (e) => {
  function t(n) {
    return {}.hasOwnProperty.call(n, "current");
  }
  return {
    name: "arrow",
    options: e,
    fn(n) {
      const {
        element: r,
        padding: o
      } = typeof e == "function" ? e(n) : e;
      return r && t(r) ? r.current != null ? Yi({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? Yi({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, l0 = (e, t) => {
  const n = QC(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, d0 = (e, t) => {
  const n = JC(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, u0 = (e, t) => ({
  fn: r0(e).fn,
  options: [e, t]
}), f0 = (e, t) => {
  const n = e0(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, m0 = (e, t) => {
  const n = t0(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, p0 = (e, t) => {
  const n = n0(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, h0 = (e, t) => {
  const n = c0(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
};
var g0 = "Arrow", Ld = l.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...a } = e;
  return /* @__PURE__ */ u(
    L.svg,
    {
      ...a,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ u("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
Ld.displayName = g0;
var v0 = Ld, fs = "Popper", [Bd, xt] = we(fs), [b0, Vd] = Bd(fs), Hd = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = l.useState(null);
  return /* @__PURE__ */ u(b0, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
Hd.displayName = fs;
var Yd = "PopperAnchor", zd = l.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, a = Vd(Yd, n), s = l.useRef(null), i = q(t, s), c = l.useRef(null);
    return l.useEffect(() => {
      const d = c.current;
      c.current = (r == null ? void 0 : r.current) || s.current, d !== c.current && a.onAnchorChange(c.current);
    }), r ? null : /* @__PURE__ */ u(L.div, { ...o, ref: i });
  }
);
zd.displayName = Yd;
var ms = "PopperContent", [y0, w0] = Bd(ms), jd = l.forwardRef(
  (e, t) => {
    var F, te, J, oe, ie, ce;
    const {
      __scopePopper: n,
      side: r = "bottom",
      sideOffset: o = 0,
      align: a = "center",
      alignOffset: s = 0,
      arrowPadding: i = 0,
      avoidCollisions: c = !0,
      collisionBoundary: d = [],
      collisionPadding: m = 0,
      sticky: f = "partial",
      hideWhenDetached: p = !1,
      updatePositionStrategy: h = "optimized",
      onPlaced: b,
      ...g
    } = e, v = Vd(ms, n), [w, y] = l.useState(null), x = q(t, (Ee) => y(Ee)), [S, N] = l.useState(null), C = $n(S), E = (C == null ? void 0 : C.width) ?? 0, T = (C == null ? void 0 : C.height) ?? 0, D = r + (a !== "center" ? "-" + a : ""), A = typeof m == "number" ? m : { top: 0, right: 0, bottom: 0, left: 0, ...m }, W = Array.isArray(d) ? d : [d], $ = W.length > 0, z = {
      padding: A,
      boundary: W.filter(S0),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: $
    }, { refs: O, floatingStyles: j, placement: V, isPositioned: G, middlewareData: B } = i0({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: D,
      whileElementsMounted: (...Ee) => ZC(...Ee, {
        animationFrame: h === "always"
      }),
      elements: {
        reference: v.anchor
      },
      middleware: [
        l0({ mainAxis: o + T, alignmentAxis: s }),
        c && d0({
          mainAxis: !0,
          crossAxis: !1,
          limiter: f === "partial" ? u0() : void 0,
          ...z
        }),
        c && f0({ ...z }),
        m0({
          ...z,
          apply: ({ elements: Ee, rects: Ae, availableWidth: ut, availableHeight: kt }) => {
            const { width: Pt, height: xo } = Ae.reference, Bt = Ee.floating.style;
            Bt.setProperty("--radix-popper-available-width", `${ut}px`), Bt.setProperty("--radix-popper-available-height", `${kt}px`), Bt.setProperty("--radix-popper-anchor-width", `${Pt}px`), Bt.setProperty("--radix-popper-anchor-height", `${xo}px`);
          }
        }),
        S && h0({ element: S, padding: i }),
        C0({ arrowWidth: E, arrowHeight: T }),
        p && p0({ strategy: "referenceHidden", ...z })
      ]
    }), [I, Z] = Kd(V), Q = pe(b);
    ge(() => {
      G && (Q == null || Q());
    }, [G, Q]);
    const M = (F = B.arrow) == null ? void 0 : F.x, Y = (te = B.arrow) == null ? void 0 : te.y, K = ((J = B.arrow) == null ? void 0 : J.centerOffset) !== 0, [H, ee] = l.useState();
    return ge(() => {
      w && ee(window.getComputedStyle(w).zIndex);
    }, [w]), /* @__PURE__ */ u(
      "div",
      {
        ref: O.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...j,
          transform: G ? j.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: H,
          "--radix-popper-transform-origin": [
            (oe = B.transformOrigin) == null ? void 0 : oe.x,
            (ie = B.transformOrigin) == null ? void 0 : ie.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((ce = B.hide) == null ? void 0 : ce.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ u(
          y0,
          {
            scope: n,
            placedSide: I,
            onArrowChange: N,
            arrowX: M,
            arrowY: Y,
            shouldHideArrow: K,
            children: /* @__PURE__ */ u(
              L.div,
              {
                "data-side": I,
                "data-align": Z,
                ...g,
                ref: x,
                style: {
                  ...g.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: G ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
jd.displayName = ms;
var Gd = "PopperArrow", x0 = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Ud = l.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, a = w0(Gd, r), s = x0[a.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ u(
      "span",
      {
        ref: a.onArrowChange,
        style: {
          position: "absolute",
          left: a.arrowX,
          top: a.arrowY,
          [s]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[a.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[a.placedSide],
          visibility: a.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ u(
          v0,
          {
            ...o,
            ref: n,
            style: {
              ...o.style,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: "block"
            }
          }
        )
      }
    )
  );
});
Ud.displayName = Gd;
function S0(e) {
  return e !== null;
}
var C0 = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var v, w, y;
    const { placement: n, rects: r, middlewareData: o } = t, s = ((v = o.arrow) == null ? void 0 : v.centerOffset) !== 0, i = s ? 0 : e.arrowWidth, c = s ? 0 : e.arrowHeight, [d, m] = Kd(n), f = { start: "0%", center: "50%", end: "100%" }[m], p = (((w = o.arrow) == null ? void 0 : w.x) ?? 0) + i / 2, h = (((y = o.arrow) == null ? void 0 : y.y) ?? 0) + c / 2;
    let b = "", g = "";
    return d === "bottom" ? (b = s ? f : `${p}px`, g = `${-c}px`) : d === "top" ? (b = s ? f : `${p}px`, g = `${r.floating.height + c}px`) : d === "right" ? (b = `${-c}px`, g = s ? f : `${h}px`) : d === "left" && (b = `${r.floating.width + c}px`, g = s ? f : `${h}px`), { data: { x: b, y: g } };
  }
});
function Kd(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Yn = Hd, zn = zd, to = jd, no = Ud, Uo = "rovingFocusGroup.onEntryFocus", N0 = { bubbles: !1, cancelable: !0 }, jn = "RovingFocusGroup", [da, qd, E0] = cn(jn), [k0, fn] = we(
  jn,
  [E0]
), [P0, R0] = k0(jn), Xd = l.forwardRef(
  (e, t) => /* @__PURE__ */ u(da.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ u(da.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ u(M0, { ...e, ref: t }) }) })
);
Xd.displayName = jn;
var M0 = l.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: n,
    orientation: r,
    loop: o = !1,
    dir: a,
    currentTabStopId: s,
    defaultCurrentTabStopId: i,
    onCurrentTabStopIdChange: c,
    onEntryFocus: d,
    preventScrollOnEntryFocus: m = !1,
    ...f
  } = e, p = l.useRef(null), h = q(t, p), b = wt(a), [g, v] = xe({
    prop: s,
    defaultProp: i ?? null,
    onChange: c,
    caller: jn
  }), [w, y] = l.useState(!1), x = pe(d), S = qd(n), N = l.useRef(!1), [C, E] = l.useState(0);
  return l.useEffect(() => {
    const T = p.current;
    if (T)
      return T.addEventListener(Uo, x), () => T.removeEventListener(Uo, x);
  }, [x]), /* @__PURE__ */ u(
    P0,
    {
      scope: n,
      orientation: r,
      dir: b,
      loop: o,
      currentTabStopId: g,
      onItemFocus: l.useCallback(
        (T) => v(T),
        [v]
      ),
      onItemShiftTab: l.useCallback(() => y(!0), []),
      onFocusableItemAdd: l.useCallback(
        () => E((T) => T + 1),
        []
      ),
      onFocusableItemRemove: l.useCallback(
        () => E((T) => T - 1),
        []
      ),
      children: /* @__PURE__ */ u(
        L.div,
        {
          tabIndex: w || C === 0 ? -1 : 0,
          "data-orientation": r,
          ...f,
          ref: h,
          style: { outline: "none", ...e.style },
          onMouseDown: _(e.onMouseDown, () => {
            N.current = !0;
          }),
          onFocus: _(e.onFocus, (T) => {
            const D = !N.current;
            if (T.target === T.currentTarget && D && !w) {
              const A = new CustomEvent(Uo, N0);
              if (T.currentTarget.dispatchEvent(A), !A.defaultPrevented) {
                const W = S().filter((V) => V.focusable), $ = W.find((V) => V.active), z = W.find((V) => V.id === g), j = [$, z, ...W].filter(
                  Boolean
                ).map((V) => V.ref.current);
                Jd(j, m);
              }
            }
            N.current = !1;
          }),
          onBlur: _(e.onBlur, () => y(!1))
        }
      )
    }
  );
}), Zd = "RovingFocusGroupItem", Qd = l.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: a,
      children: s,
      ...i
    } = e, c = he(), d = a || c, m = R0(Zd, n), f = m.currentTabStopId === d, p = qd(n), { onFocusableItemAdd: h, onFocusableItemRemove: b, currentTabStopId: g } = m;
    return l.useEffect(() => {
      if (r)
        return h(), () => b();
    }, [r, h, b]), /* @__PURE__ */ u(
      da.ItemSlot,
      {
        scope: n,
        id: d,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ u(
          L.span,
          {
            tabIndex: f ? 0 : -1,
            "data-orientation": m.orientation,
            ...i,
            ref: t,
            onMouseDown: _(e.onMouseDown, (v) => {
              r ? m.onItemFocus(d) : v.preventDefault();
            }),
            onFocus: _(e.onFocus, () => m.onItemFocus(d)),
            onKeyDown: _(e.onKeyDown, (v) => {
              if (v.key === "Tab" && v.shiftKey) {
                m.onItemShiftTab();
                return;
              }
              if (v.target !== v.currentTarget) return;
              const w = D0(v, m.orientation, m.dir);
              if (w !== void 0) {
                if (v.metaKey || v.ctrlKey || v.altKey || v.shiftKey) return;
                v.preventDefault();
                let x = p().filter((S) => S.focusable).map((S) => S.ref.current);
                if (w === "last") x.reverse();
                else if (w === "prev" || w === "next") {
                  w === "prev" && x.reverse();
                  const S = x.indexOf(v.currentTarget);
                  x = m.loop ? O0(x, S + 1) : x.slice(S + 1);
                }
                setTimeout(() => Jd(x));
              }
            }),
            children: typeof s == "function" ? s({ isCurrentTabStop: f, hasTabStop: g != null }) : s
          }
        )
      }
    );
  }
);
Qd.displayName = Zd;
var T0 = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function _0(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function D0(e, t, n) {
  const r = _0(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return T0[r];
}
function Jd(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function O0(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var ps = Xd, hs = Qd;
// @__NO_SIDE_EFFECTS__
function A0(e) {
  const t = /* @__PURE__ */ I0(e), n = l.forwardRef((r, o) => {
    const { children: a, ...s } = r, i = l.Children.toArray(a), c = i.find(W0);
    if (c) {
      const d = c.props.children, m = i.map((f) => f === c ? l.Children.count(d) > 1 ? l.Children.only(null) : l.isValidElement(d) ? d.props.children : null : f);
      return /* @__PURE__ */ u(t, { ...s, ref: o, children: l.isValidElement(d) ? l.cloneElement(d, void 0, m) : null });
    }
    return /* @__PURE__ */ u(t, { ...s, ref: o, children: a });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function I0(e) {
  const t = l.forwardRef((n, r) => {
    const { children: o, ...a } = n;
    if (l.isValidElement(o)) {
      const s = L0(o), i = F0(a, o.props);
      return o.type !== l.Fragment && (i.ref = r ? ke(r, s) : s), l.cloneElement(o, i);
    }
    return l.Children.count(o) > 1 ? l.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var $0 = Symbol("radix.slottable");
function W0(e) {
  return l.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === $0;
}
function F0(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], a = t[r];
    /^on[A-Z]/.test(r) ? o && a ? n[r] = (...i) => {
      const c = a(...i);
      return o(...i), c;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...a } : r === "className" && (n[r] = [o, a].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function L0(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var ua = ["Enter", " "], B0 = ["ArrowDown", "PageUp", "Home"], eu = ["ArrowUp", "PageDown", "End"], V0 = [...B0, ...eu], H0 = {
  ltr: [...ua, "ArrowRight"],
  rtl: [...ua, "ArrowLeft"]
}, Y0 = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, Gn = "Menu", [kn, z0, j0] = cn(Gn), [Lt, tu] = we(Gn, [
  j0,
  xt,
  fn
]), Un = xt(), nu = fn(), [ru, St] = Lt(Gn), [G0, Kn] = Lt(Gn), ou = (e) => {
  const { __scopeMenu: t, open: n = !1, children: r, dir: o, onOpenChange: a, modal: s = !0 } = e, i = Un(t), [c, d] = l.useState(null), m = l.useRef(!1), f = pe(a), p = wt(o);
  return l.useEffect(() => {
    const h = () => {
      m.current = !0, document.addEventListener("pointerdown", b, { capture: !0, once: !0 }), document.addEventListener("pointermove", b, { capture: !0, once: !0 });
    }, b = () => m.current = !1;
    return document.addEventListener("keydown", h, { capture: !0 }), () => {
      document.removeEventListener("keydown", h, { capture: !0 }), document.removeEventListener("pointerdown", b, { capture: !0 }), document.removeEventListener("pointermove", b, { capture: !0 });
    };
  }, []), /* @__PURE__ */ u(Yn, { ...i, children: /* @__PURE__ */ u(
    ru,
    {
      scope: t,
      open: n,
      onOpenChange: f,
      content: c,
      onContentChange: d,
      children: /* @__PURE__ */ u(
        G0,
        {
          scope: t,
          onClose: l.useCallback(() => f(!1), [f]),
          isUsingKeyboardRef: m,
          dir: p,
          modal: s,
          children: r
        }
      )
    }
  ) });
};
ou.displayName = Gn;
var U0 = "MenuAnchor", gs = l.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = Un(n);
    return /* @__PURE__ */ u(zn, { ...o, ...r, ref: t });
  }
);
gs.displayName = U0;
var vs = "MenuPortal", [K0, au] = Lt(vs, {
  forceMount: void 0
}), su = (e) => {
  const { __scopeMenu: t, forceMount: n, children: r, container: o } = e, a = St(vs, t);
  return /* @__PURE__ */ u(K0, { scope: t, forceMount: n, children: /* @__PURE__ */ u(ve, { present: n || a.open, children: /* @__PURE__ */ u(Ft, { asChild: !0, container: o, children: r }) }) });
};
su.displayName = vs;
var We = "MenuContent", [q0, bs] = Lt(We), iu = l.forwardRef(
  (e, t) => {
    const n = au(We, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, a = St(We, e.__scopeMenu), s = Kn(We, e.__scopeMenu);
    return /* @__PURE__ */ u(kn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ u(ve, { present: r || a.open, children: /* @__PURE__ */ u(kn.Slot, { scope: e.__scopeMenu, children: s.modal ? /* @__PURE__ */ u(X0, { ...o, ref: t }) : /* @__PURE__ */ u(Z0, { ...o, ref: t }) }) }) });
  }
), X0 = l.forwardRef(
  (e, t) => {
    const n = St(We, e.__scopeMenu), r = l.useRef(null), o = q(t, r);
    return l.useEffect(() => {
      const a = r.current;
      if (a) return jr(a);
    }, []), /* @__PURE__ */ u(
      ys,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: _(
          e.onFocusOutside,
          (a) => a.preventDefault(),
          { checkForDefaultPrevented: !1 }
        ),
        onDismiss: () => n.onOpenChange(!1)
      }
    );
  }
), Z0 = l.forwardRef((e, t) => {
  const n = St(We, e.__scopeMenu);
  return /* @__PURE__ */ u(
    ys,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}), Q0 = /* @__PURE__ */ A0("MenuContent.ScrollLock"), ys = l.forwardRef(
  (e, t) => {
    const {
      __scopeMenu: n,
      loop: r = !1,
      trapFocus: o,
      onOpenAutoFocus: a,
      onCloseAutoFocus: s,
      disableOutsidePointerEvents: i,
      onEntryFocus: c,
      onEscapeKeyDown: d,
      onPointerDownOutside: m,
      onFocusOutside: f,
      onInteractOutside: p,
      onDismiss: h,
      disableOutsideScroll: b,
      ...g
    } = e, v = St(We, n), w = Kn(We, n), y = Un(n), x = nu(n), S = z0(n), [N, C] = l.useState(null), E = l.useRef(null), T = q(t, E, v.onContentChange), D = l.useRef(0), A = l.useRef(""), W = l.useRef(0), $ = l.useRef(null), z = l.useRef("right"), O = l.useRef(0), j = b ? Fn : l.Fragment, V = b ? { as: Q0, allowPinchZoom: !0 } : void 0, G = (I) => {
      var F, te;
      const Z = A.current + I, Q = S().filter((J) => !J.disabled), M = document.activeElement, Y = (F = Q.find((J) => J.ref.current === M)) == null ? void 0 : F.textValue, K = Q.map((J) => J.textValue), H = dN(K, Z, Y), ee = (te = Q.find((J) => J.textValue === H)) == null ? void 0 : te.ref.current;
      (function J(oe) {
        A.current = oe, window.clearTimeout(D.current), oe !== "" && (D.current = window.setTimeout(() => J(""), 1e3));
      })(Z), ee && setTimeout(() => ee.focus());
    };
    l.useEffect(() => () => window.clearTimeout(D.current), []), Yr();
    const B = l.useCallback((I) => {
      var Q, M;
      return z.current === ((Q = $.current) == null ? void 0 : Q.side) && fN(I, (M = $.current) == null ? void 0 : M.area);
    }, []);
    return /* @__PURE__ */ u(
      q0,
      {
        scope: n,
        searchRef: A,
        onItemEnter: l.useCallback(
          (I) => {
            B(I) && I.preventDefault();
          },
          [B]
        ),
        onItemLeave: l.useCallback(
          (I) => {
            var Z;
            B(I) || ((Z = E.current) == null || Z.focus(), C(null));
          },
          [B]
        ),
        onTriggerLeave: l.useCallback(
          (I) => {
            B(I) && I.preventDefault();
          },
          [B]
        ),
        pointerGraceTimerRef: W,
        onPointerGraceIntentChange: l.useCallback((I) => {
          $.current = I;
        }, []),
        children: /* @__PURE__ */ u(j, { ...V, children: /* @__PURE__ */ u(
          Wn,
          {
            asChild: !0,
            trapped: o,
            onMountAutoFocus: _(a, (I) => {
              var Z;
              I.preventDefault(), (Z = E.current) == null || Z.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: s,
            children: /* @__PURE__ */ u(
              Wt,
              {
                asChild: !0,
                disableOutsidePointerEvents: i,
                onEscapeKeyDown: d,
                onPointerDownOutside: m,
                onFocusOutside: f,
                onInteractOutside: p,
                onDismiss: h,
                children: /* @__PURE__ */ u(
                  ps,
                  {
                    asChild: !0,
                    ...x,
                    dir: w.dir,
                    orientation: "vertical",
                    loop: r,
                    currentTabStopId: N,
                    onCurrentTabStopIdChange: C,
                    onEntryFocus: _(c, (I) => {
                      w.isUsingKeyboardRef.current || I.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ u(
                      to,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": Nu(v.open),
                        "data-radix-menu-content": "",
                        dir: w.dir,
                        ...y,
                        ...g,
                        ref: T,
                        style: { outline: "none", ...g.style },
                        onKeyDown: _(g.onKeyDown, (I) => {
                          const Q = I.target.closest("[data-radix-menu-content]") === I.currentTarget, M = I.ctrlKey || I.altKey || I.metaKey, Y = I.key.length === 1;
                          Q && (I.key === "Tab" && I.preventDefault(), !M && Y && G(I.key));
                          const K = E.current;
                          if (I.target !== K || !V0.includes(I.key)) return;
                          I.preventDefault();
                          const ee = S().filter((F) => !F.disabled).map((F) => F.ref.current);
                          eu.includes(I.key) && ee.reverse(), cN(ee);
                        }),
                        onBlur: _(e.onBlur, (I) => {
                          I.currentTarget.contains(I.target) || (window.clearTimeout(D.current), A.current = "");
                        }),
                        onPointerMove: _(
                          e.onPointerMove,
                          Pn((I) => {
                            const Z = I.target, Q = O.current !== I.clientX;
                            if (I.currentTarget.contains(Z) && Q) {
                              const M = I.clientX > O.current ? "right" : "left";
                              z.current = M, O.current = I.clientX;
                            }
                          })
                        )
                      }
                    )
                  }
                )
              }
            )
          }
        ) })
      }
    );
  }
);
iu.displayName = We;
var J0 = "MenuGroup", ws = l.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ u(L.div, { role: "group", ...r, ref: t });
  }
);
ws.displayName = J0;
var eN = "MenuLabel", cu = l.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ u(L.div, { ...r, ref: t });
  }
);
cu.displayName = eN;
var Pr = "MenuItem", ji = "menu.itemSelect", ro = l.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e, a = l.useRef(null), s = Kn(Pr, e.__scopeMenu), i = bs(Pr, e.__scopeMenu), c = q(t, a), d = l.useRef(!1), m = () => {
      const f = a.current;
      if (!n && f) {
        const p = new CustomEvent(ji, { bubbles: !0, cancelable: !0 });
        f.addEventListener(ji, (h) => r == null ? void 0 : r(h), { once: !0 }), Ta(f, p), p.defaultPrevented ? d.current = !1 : s.onClose();
      }
    };
    return /* @__PURE__ */ u(
      lu,
      {
        ...o,
        ref: c,
        disabled: n,
        onClick: _(e.onClick, m),
        onPointerDown: (f) => {
          var p;
          (p = e.onPointerDown) == null || p.call(e, f), d.current = !0;
        },
        onPointerUp: _(e.onPointerUp, (f) => {
          var p;
          d.current || (p = f.currentTarget) == null || p.click();
        }),
        onKeyDown: _(e.onKeyDown, (f) => {
          const p = i.searchRef.current !== "";
          n || p && f.key === " " || ua.includes(f.key) && (f.currentTarget.click(), f.preventDefault());
        })
      }
    );
  }
);
ro.displayName = Pr;
var lu = l.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...a } = e, s = bs(Pr, n), i = nu(n), c = l.useRef(null), d = q(t, c), [m, f] = l.useState(!1), [p, h] = l.useState("");
    return l.useEffect(() => {
      const b = c.current;
      b && h((b.textContent ?? "").trim());
    }, [a.children]), /* @__PURE__ */ u(
      kn.ItemSlot,
      {
        scope: n,
        disabled: r,
        textValue: o ?? p,
        children: /* @__PURE__ */ u(hs, { asChild: !0, ...i, focusable: !r, children: /* @__PURE__ */ u(
          L.div,
          {
            role: "menuitem",
            "data-highlighted": m ? "" : void 0,
            "aria-disabled": r || void 0,
            "data-disabled": r ? "" : void 0,
            ...a,
            ref: d,
            onPointerMove: _(
              e.onPointerMove,
              Pn((b) => {
                r ? s.onItemLeave(b) : (s.onItemEnter(b), b.defaultPrevented || b.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: _(
              e.onPointerLeave,
              Pn((b) => s.onItemLeave(b))
            ),
            onFocus: _(e.onFocus, () => f(!0)),
            onBlur: _(e.onBlur, () => f(!1))
          }
        ) })
      }
    );
  }
), tN = "MenuCheckboxItem", du = l.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e;
    return /* @__PURE__ */ u(hu, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ u(
      ro,
      {
        role: "menuitemcheckbox",
        "aria-checked": Rr(n) ? "mixed" : n,
        ...o,
        ref: t,
        "data-state": Cs(n),
        onSelect: _(
          o.onSelect,
          () => r == null ? void 0 : r(Rr(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
du.displayName = tN;
var uu = "MenuRadioGroup", [nN, rN] = Lt(
  uu,
  { value: void 0, onValueChange: () => {
  } }
), fu = l.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: r, ...o } = e, a = pe(r);
    return /* @__PURE__ */ u(nN, { scope: e.__scopeMenu, value: n, onValueChange: a, children: /* @__PURE__ */ u(ws, { ...o, ref: t }) });
  }
);
fu.displayName = uu;
var mu = "MenuRadioItem", pu = l.forwardRef(
  (e, t) => {
    const { value: n, ...r } = e, o = rN(mu, e.__scopeMenu), a = n === o.value;
    return /* @__PURE__ */ u(hu, { scope: e.__scopeMenu, checked: a, children: /* @__PURE__ */ u(
      ro,
      {
        role: "menuitemradio",
        "aria-checked": a,
        ...r,
        ref: t,
        "data-state": Cs(a),
        onSelect: _(
          r.onSelect,
          () => {
            var s;
            return (s = o.onValueChange) == null ? void 0 : s.call(o, n);
          },
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
pu.displayName = mu;
var xs = "MenuItemIndicator", [hu, oN] = Lt(
  xs,
  { checked: !1 }
), gu = l.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e, a = oN(xs, n);
    return /* @__PURE__ */ u(
      ve,
      {
        present: r || Rr(a.checked) || a.checked === !0,
        children: /* @__PURE__ */ u(
          L.span,
          {
            ...o,
            ref: t,
            "data-state": Cs(a.checked)
          }
        )
      }
    );
  }
);
gu.displayName = xs;
var aN = "MenuSeparator", vu = l.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ u(
      L.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...r,
        ref: t
      }
    );
  }
);
vu.displayName = aN;
var sN = "MenuArrow", bu = l.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = Un(n);
    return /* @__PURE__ */ u(no, { ...o, ...r, ref: t });
  }
);
bu.displayName = sN;
var Ss = "MenuSub", [iN, yu] = Lt(Ss), wu = (e) => {
  const { __scopeMenu: t, children: n, open: r = !1, onOpenChange: o } = e, a = St(Ss, t), s = Un(t), [i, c] = l.useState(null), [d, m] = l.useState(null), f = pe(o);
  return l.useEffect(() => (a.open === !1 && f(!1), () => f(!1)), [a.open, f]), /* @__PURE__ */ u(Yn, { ...s, children: /* @__PURE__ */ u(
    ru,
    {
      scope: t,
      open: r,
      onOpenChange: f,
      content: d,
      onContentChange: m,
      children: /* @__PURE__ */ u(
        iN,
        {
          scope: t,
          contentId: he(),
          triggerId: he(),
          trigger: i,
          onTriggerChange: c,
          children: n
        }
      )
    }
  ) });
};
wu.displayName = Ss;
var yn = "MenuSubTrigger", xu = l.forwardRef(
  (e, t) => {
    const n = St(yn, e.__scopeMenu), r = Kn(yn, e.__scopeMenu), o = yu(yn, e.__scopeMenu), a = bs(yn, e.__scopeMenu), s = l.useRef(null), { pointerGraceTimerRef: i, onPointerGraceIntentChange: c } = a, d = { __scopeMenu: e.__scopeMenu }, m = l.useCallback(() => {
      s.current && window.clearTimeout(s.current), s.current = null;
    }, []);
    return l.useEffect(() => m, [m]), l.useEffect(() => {
      const f = i.current;
      return () => {
        window.clearTimeout(f), c(null);
      };
    }, [i, c]), /* @__PURE__ */ u(gs, { asChild: !0, ...d, children: /* @__PURE__ */ u(
      lu,
      {
        id: o.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": o.contentId,
        "data-state": Nu(n.open),
        ...e,
        ref: ke(t, o.onTriggerChange),
        onClick: (f) => {
          var p;
          (p = e.onClick) == null || p.call(e, f), !(e.disabled || f.defaultPrevented) && (f.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: _(
          e.onPointerMove,
          Pn((f) => {
            a.onItemEnter(f), !f.defaultPrevented && !e.disabled && !n.open && !s.current && (a.onPointerGraceIntentChange(null), s.current = window.setTimeout(() => {
              n.onOpenChange(!0), m();
            }, 100));
          })
        ),
        onPointerLeave: _(
          e.onPointerLeave,
          Pn((f) => {
            var h, b;
            m();
            const p = (h = n.content) == null ? void 0 : h.getBoundingClientRect();
            if (p) {
              const g = (b = n.content) == null ? void 0 : b.dataset.side, v = g === "right", w = v ? -5 : 5, y = p[v ? "left" : "right"], x = p[v ? "right" : "left"];
              a.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: f.clientX + w, y: f.clientY },
                  { x: y, y: p.top },
                  { x, y: p.top },
                  { x, y: p.bottom },
                  { x: y, y: p.bottom }
                ],
                side: g
              }), window.clearTimeout(i.current), i.current = window.setTimeout(
                () => a.onPointerGraceIntentChange(null),
                300
              );
            } else {
              if (a.onTriggerLeave(f), f.defaultPrevented) return;
              a.onPointerGraceIntentChange(null);
            }
          })
        ),
        onKeyDown: _(e.onKeyDown, (f) => {
          var h;
          const p = a.searchRef.current !== "";
          e.disabled || p && f.key === " " || H0[r.dir].includes(f.key) && (n.onOpenChange(!0), (h = n.content) == null || h.focus(), f.preventDefault());
        })
      }
    ) });
  }
);
xu.displayName = yn;
var Su = "MenuSubContent", Cu = l.forwardRef(
  (e, t) => {
    const n = au(We, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, a = St(We, e.__scopeMenu), s = Kn(We, e.__scopeMenu), i = yu(Su, e.__scopeMenu), c = l.useRef(null), d = q(t, c);
    return /* @__PURE__ */ u(kn.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ u(ve, { present: r || a.open, children: /* @__PURE__ */ u(kn.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ u(
      ys,
      {
        id: i.contentId,
        "aria-labelledby": i.triggerId,
        ...o,
        ref: d,
        align: "start",
        side: s.dir === "rtl" ? "left" : "right",
        disableOutsidePointerEvents: !1,
        disableOutsideScroll: !1,
        trapFocus: !1,
        onOpenAutoFocus: (m) => {
          var f;
          s.isUsingKeyboardRef.current && ((f = c.current) == null || f.focus()), m.preventDefault();
        },
        onCloseAutoFocus: (m) => m.preventDefault(),
        onFocusOutside: _(e.onFocusOutside, (m) => {
          m.target !== i.trigger && a.onOpenChange(!1);
        }),
        onEscapeKeyDown: _(e.onEscapeKeyDown, (m) => {
          s.onClose(), m.preventDefault();
        }),
        onKeyDown: _(e.onKeyDown, (m) => {
          var h;
          const f = m.currentTarget.contains(m.target), p = Y0[s.dir].includes(m.key);
          f && p && (a.onOpenChange(!1), (h = i.trigger) == null || h.focus(), m.preventDefault());
        })
      }
    ) }) }) });
  }
);
Cu.displayName = Su;
function Nu(e) {
  return e ? "open" : "closed";
}
function Rr(e) {
  return e === "indeterminate";
}
function Cs(e) {
  return Rr(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function cN(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function lN(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function dN(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((d) => d === t[0]) ? t[0] : t, a = n ? e.indexOf(n) : -1;
  let s = lN(e, Math.max(a, 0));
  o.length === 1 && (s = s.filter((d) => d !== n));
  const c = s.find(
    (d) => d.toLowerCase().startsWith(o.toLowerCase())
  );
  return c !== n ? c : void 0;
}
function uN(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let a = 0, s = t.length - 1; a < t.length; s = a++) {
    const i = t[a], c = t[s], d = i.x, m = i.y, f = c.x, p = c.y;
    m > r != p > r && n < (f - d) * (r - m) / (p - m) + d && (o = !o);
  }
  return o;
}
function fN(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return uN(n, t);
}
function Pn(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var mN = ou, pN = gs, hN = su, gN = iu, vN = ws, bN = cu, yN = ro, wN = du, xN = fu, SN = pu, CN = gu, NN = vu, EN = bu, kN = wu, PN = xu, RN = Cu, oo = "DropdownMenu", [MN] = we(
  oo,
  [tu]
), Ne = tu(), [TN, Eu] = MN(oo), ku = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: r,
    open: o,
    defaultOpen: a,
    onOpenChange: s,
    modal: i = !0
  } = e, c = Ne(t), d = l.useRef(null), [m, f] = xe({
    prop: o,
    defaultProp: a ?? !1,
    onChange: s,
    caller: oo
  });
  return /* @__PURE__ */ u(
    TN,
    {
      scope: t,
      triggerId: he(),
      triggerRef: d,
      contentId: he(),
      open: m,
      onOpenChange: f,
      onOpenToggle: l.useCallback(() => f((p) => !p), [f]),
      modal: i,
      children: /* @__PURE__ */ u(mN, { ...c, open: m, onOpenChange: f, dir: r, modal: i, children: n })
    }
  );
};
ku.displayName = oo;
var Pu = "DropdownMenuTrigger", Ru = l.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e, a = Eu(Pu, n), s = Ne(n);
    return /* @__PURE__ */ u(pN, { asChild: !0, ...s, children: /* @__PURE__ */ u(
      L.button,
      {
        type: "button",
        id: a.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": a.open,
        "aria-controls": a.open ? a.contentId : void 0,
        "data-state": a.open ? "open" : "closed",
        "data-disabled": r ? "" : void 0,
        disabled: r,
        ...o,
        ref: ke(t, a.triggerRef),
        onPointerDown: _(e.onPointerDown, (i) => {
          !r && i.button === 0 && i.ctrlKey === !1 && (a.onOpenToggle(), a.open || i.preventDefault());
        }),
        onKeyDown: _(e.onKeyDown, (i) => {
          r || (["Enter", " "].includes(i.key) && a.onOpenToggle(), i.key === "ArrowDown" && a.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(i.key) && i.preventDefault());
        })
      }
    ) });
  }
);
Ru.displayName = Pu;
var _N = "DropdownMenuPortal", Mu = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, r = Ne(t);
  return /* @__PURE__ */ u(hN, { ...r, ...n });
};
Mu.displayName = _N;
var Tu = "DropdownMenuContent", _u = l.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Eu(Tu, n), a = Ne(n), s = l.useRef(!1);
    return /* @__PURE__ */ u(
      gN,
      {
        id: o.contentId,
        "aria-labelledby": o.triggerId,
        ...a,
        ...r,
        ref: t,
        onCloseAutoFocus: _(e.onCloseAutoFocus, (i) => {
          var c;
          s.current || (c = o.triggerRef.current) == null || c.focus(), s.current = !1, i.preventDefault();
        }),
        onInteractOutside: _(e.onInteractOutside, (i) => {
          const c = i.detail.originalEvent, d = c.button === 0 && c.ctrlKey === !0, m = c.button === 2 || d;
          (!o.modal || m) && (s.current = !0);
        }),
        style: {
          ...e.style,
          "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
          "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
          "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
        }
      }
    );
  }
);
_u.displayName = Tu;
var DN = "DropdownMenuGroup", Du = l.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ne(n);
    return /* @__PURE__ */ u(vN, { ...o, ...r, ref: t });
  }
);
Du.displayName = DN;
var ON = "DropdownMenuLabel", Ou = l.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ne(n);
    return /* @__PURE__ */ u(bN, { ...o, ...r, ref: t });
  }
);
Ou.displayName = ON;
var AN = "DropdownMenuItem", Au = l.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ne(n);
    return /* @__PURE__ */ u(yN, { ...o, ...r, ref: t });
  }
);
Au.displayName = AN;
var IN = "DropdownMenuCheckboxItem", Iu = l.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ne(n);
  return /* @__PURE__ */ u(wN, { ...o, ...r, ref: t });
});
Iu.displayName = IN;
var $N = "DropdownMenuRadioGroup", $u = l.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ne(n);
  return /* @__PURE__ */ u(xN, { ...o, ...r, ref: t });
});
$u.displayName = $N;
var WN = "DropdownMenuRadioItem", Wu = l.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ne(n);
  return /* @__PURE__ */ u(SN, { ...o, ...r, ref: t });
});
Wu.displayName = WN;
var FN = "DropdownMenuItemIndicator", Fu = l.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ne(n);
  return /* @__PURE__ */ u(CN, { ...o, ...r, ref: t });
});
Fu.displayName = FN;
var LN = "DropdownMenuSeparator", Lu = l.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ne(n);
  return /* @__PURE__ */ u(NN, { ...o, ...r, ref: t });
});
Lu.displayName = LN;
var BN = "DropdownMenuArrow", VN = l.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ne(n);
    return /* @__PURE__ */ u(EN, { ...o, ...r, ref: t });
  }
);
VN.displayName = BN;
var HN = (e) => {
  const { __scopeDropdownMenu: t, children: n, open: r, onOpenChange: o, defaultOpen: a } = e, s = Ne(t), [i, c] = xe({
    prop: r,
    defaultProp: a ?? !1,
    onChange: o,
    caller: "DropdownMenuSub"
  });
  return /* @__PURE__ */ u(kN, { ...s, open: i, onOpenChange: c, children: n });
}, YN = "DropdownMenuSubTrigger", Bu = l.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ne(n);
  return /* @__PURE__ */ u(PN, { ...o, ...r, ref: t });
});
Bu.displayName = YN;
var zN = "DropdownMenuSubContent", Vu = l.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ne(n);
  return /* @__PURE__ */ u(
    RN,
    {
      ...o,
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
    }
  );
});
Vu.displayName = zN;
var jN = ku, GN = Ru, Hu = Mu, Yu = _u, UN = Du, zu = Ou, ju = Au, Gu = Iu, KN = $u, Uu = Wu, Ku = Fu, qu = Lu, qN = HN, Xu = Bu, Zu = Vu;
const DM = jN, OM = GN, AM = UN, IM = Hu, $M = qN, WM = KN, XN = l.forwardRef(({ className: e, inset: t, children: n, ...r }, o) => /* @__PURE__ */ R(
  Xu,
  {
    ref: o,
    className: k(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      t && "pl-8",
      e
    ),
    ...r,
    children: [
      n,
      /* @__PURE__ */ u(Fr, { className: "ml-auto" })
    ]
  }
));
XN.displayName = Xu.displayName;
const ZN = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  Zu,
  {
    ref: n,
    className: k(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      e
    ),
    ...t
  }
));
ZN.displayName = Zu.displayName;
const QN = l.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ u(Hu, { children: /* @__PURE__ */ u(
  Yu,
  {
    ref: r,
    sideOffset: t,
    className: k(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      e
    ),
    ...n
  }
) }));
QN.displayName = Yu.displayName;
const JN = l.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ u(
  ju,
  {
    ref: r,
    className: k(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      t && "pl-8",
      e
    ),
    ...n
  }
));
JN.displayName = ju.displayName;
const eE = l.forwardRef(({ className: e, children: t, checked: n, ...r }, o) => /* @__PURE__ */ R(
  Gu,
  {
    ref: o,
    className: k(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ u("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ u(Ku, { children: /* @__PURE__ */ u($r, { className: "h-4 w-4" }) }) }),
      t
    ]
  }
));
eE.displayName = Gu.displayName;
const tE = l.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ R(
  Uu,
  {
    ref: r,
    className: k(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ u("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ u(Ku, { children: /* @__PURE__ */ u(Ic, { className: "h-2 w-2 fill-current" }) }) }),
      t
    ]
  }
));
tE.displayName = Uu.displayName;
const nE = l.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ u(
  zu,
  {
    ref: r,
    className: k(
      "px-2 py-1.5 text-sm font-semibold",
      t && "pl-8",
      e
    ),
    ...n
  }
));
nE.displayName = zu.displayName;
const rE = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  qu,
  {
    ref: n,
    className: k("-mx-1 my-1 h-px bg-muted", e),
    ...t
  }
));
rE.displayName = qu.displayName;
const oE = ({
  className: e,
  ...t
}) => /* @__PURE__ */ u(
  "span",
  {
    className: k("ml-auto text-xs tracking-widest opacity-60", e),
    ...t
  }
);
oE.displayName = "DropdownMenuShortcut";
var aE = (e) => e.type === "checkbox", wn = (e) => e instanceof Date, Ns = (e) => e == null;
const Qu = (e) => typeof e == "object";
var At = (e) => !Ns(e) && !Array.isArray(e) && Qu(e) && !wn(e), sE = (e) => At(e) && e.target ? aE(e.target) ? e.target.checked : e.target.value : e, iE = (e, t) => t.split(".").some((n, r, o) => !isNaN(Number(n)) && e.has(o.slice(0, r).join("."))), cE = (e) => {
  const t = e.constructor && e.constructor.prototype;
  return At(t) && t.hasOwnProperty("isPrototypeOf");
}, lE = typeof window < "u" && typeof window.HTMLElement < "u" && typeof document < "u";
function Ju(e) {
  if (e instanceof Date)
    return new Date(e);
  const t = typeof FileList < "u" && e instanceof FileList;
  if (lE && (e instanceof Blob || t))
    return e;
  const n = Array.isArray(e);
  if (!n && !(At(e) && cE(e)))
    return e;
  const r = n ? [] : Object.create(Object.getPrototypeOf(e));
  for (const o in e)
    Object.prototype.hasOwnProperty.call(e, o) && (r[o] = Ju(e[o]));
  return r;
}
var ef = (e) => /^\w*$/.test(e), fa = (e) => e === void 0, dE = (e) => Array.isArray(e) ? e.filter(Boolean) : [], tf = (e) => dE(e.replace(/["|']|\]/g, "").split(/\.|\[/)), Pe = (e, t, n) => {
  if (!t || !At(e))
    return n;
  const r = (ef(t) ? [t] : tf(t)).reduce((o, a) => Ns(o) ? o : o[a], e);
  return fa(r) || r === e ? fa(e[t]) ? n : e[t] : r;
}, Ko = (e) => typeof e == "boolean", or = (e) => typeof e == "function", Gi = (e, t, n) => {
  let r = -1;
  const o = ef(t) ? [t] : tf(t), a = o.length, s = a - 1;
  for (; ++r < a; ) {
    const i = o[r];
    let c = n;
    if (r !== s) {
      const d = e[i];
      c = At(d) || Array.isArray(d) ? d : isNaN(+o[r + 1]) ? {} : [];
    }
    if (i === "__proto__" || i === "constructor" || i === "prototype")
      return;
    e[i] = c, e = e[i];
  }
};
const Ui = {
  BLUR: "blur",
  CHANGE: "change"
}, Ki = {
  all: "all"
}, Es = P.createContext(null);
Es.displayName = "HookFormControlContext";
const ks = () => P.useContext(Es);
var uE = (e, t, n, r = !0) => {
  const o = {
    defaultValues: t._defaultValues
  };
  for (const a in e)
    Object.defineProperty(o, a, {
      get: () => {
        const s = a;
        return t._proxyFormState[s] !== Ki.all && (t._proxyFormState[s] = !r || Ki.all), n && (n[s] = !0), e[s];
      }
    });
  return o;
};
const nf = typeof window < "u" ? P.useLayoutEffect : P.useEffect;
function fE(e) {
  const t = ks(), { control: n = t, disabled: r, name: o, exact: a } = e || {}, [s, i] = P.useState(n._formState), c = P.useRef({
    isDirty: !1,
    isLoading: !1,
    dirtyFields: !1,
    touchedFields: !1,
    validatingFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1
  });
  return nf(() => n._subscribe({
    name: o,
    formState: c.current,
    exact: a,
    callback: (d) => {
      !r && i({
        ...n._formState,
        ...d
      });
    }
  }), [o, r, a]), P.useEffect(() => {
    c.current.isValid && n._setValid(!0);
  }, [n]), P.useMemo(() => uE(s, n, c.current, !1), [s, n]);
}
var mE = (e) => typeof e == "string", qi = (e, t, n, r, o) => mE(e) ? Pe(n, e, o) : Array.isArray(e) ? e.map((a) => Pe(n, a)) : n, Xi = (e) => Ns(e) || !Qu(e);
function fr(e, t, n = /* @__PURE__ */ new WeakSet()) {
  if (Xi(e) || Xi(t))
    return Object.is(e, t);
  if (wn(e) && wn(t))
    return Object.is(e.getTime(), t.getTime());
  const r = Object.keys(e), o = Object.keys(t);
  if (r.length !== o.length)
    return !1;
  if (n.has(e) || n.has(t))
    return !0;
  n.add(e), n.add(t);
  for (const a of r) {
    const s = e[a];
    if (!o.includes(a))
      return !1;
    if (a !== "ref") {
      const i = t[a];
      if (wn(s) && wn(i) || (At(s) || Array.isArray(s)) && (At(i) || Array.isArray(i)) ? !fr(s, i, n) : !Object.is(s, i))
        return !1;
    }
  }
  return !0;
}
function pE(e) {
  const t = ks(), { control: n = t, name: r, defaultValue: o, disabled: a, exact: s, compute: i } = e || {}, c = P.useRef(o), d = P.useRef(i), m = P.useRef(void 0), f = P.useRef(n), p = P.useRef(r);
  d.current = i;
  const [h, b] = P.useState(() => {
    const S = n._getWatch(r, c.current);
    return d.current ? d.current(S) : S;
  }), g = P.useCallback((S) => {
    const N = qi(r, n._names, S || n._formValues, !1, c.current);
    return d.current ? d.current(N) : N;
  }, [n._formValues, n._names, r]), v = P.useCallback((S) => {
    if (!a) {
      const N = qi(r, n._names, S || n._formValues, !1, c.current);
      if (d.current) {
        const C = d.current(N);
        fr(C, m.current) || (b(C), m.current = C);
      } else
        b(N);
    }
  }, [n._formValues, n._names, a, r]);
  nf(() => ((f.current !== n || !fr(p.current, r)) && (f.current = n, p.current = r, v()), n._subscribe({
    name: r,
    formState: {
      values: !0
    },
    exact: s,
    callback: (S) => {
      v(S.values);
    }
  })), [n, s, r, v]), P.useEffect(() => n._removeUnmounted());
  const w = f.current !== n, y = p.current, x = P.useMemo(() => {
    if (a)
      return null;
    const S = !w && !fr(y, r);
    return w || S ? g() : null;
  }, [a, w, r, y, g]);
  return x !== null ? x : h;
}
function hE(e) {
  const t = ks(), { name: n, disabled: r, control: o = t, shouldUnregister: a, defaultValue: s, exact: i = !0 } = e, c = iE(o._names.array, n), d = P.useMemo(() => Pe(o._formValues, n, Pe(o._defaultValues, n, s)), [o, n, s]), m = pE({
    control: o,
    name: n,
    defaultValue: d,
    exact: i
  }), f = fE({
    control: o,
    name: n,
    exact: i
  }), p = P.useRef(e), h = P.useRef(void 0), b = P.useRef(o.register(n, {
    ...e.rules,
    value: m,
    ...Ko(e.disabled) ? { disabled: e.disabled } : {}
  }));
  p.current = e;
  const g = P.useMemo(() => Object.defineProperties({}, {
    invalid: {
      enumerable: !0,
      get: () => !!Pe(f.errors, n)
    },
    isDirty: {
      enumerable: !0,
      get: () => !!Pe(f.dirtyFields, n)
    },
    isTouched: {
      enumerable: !0,
      get: () => !!Pe(f.touchedFields, n)
    },
    isValidating: {
      enumerable: !0,
      get: () => !!Pe(f.validatingFields, n)
    },
    error: {
      enumerable: !0,
      get: () => Pe(f.errors, n)
    }
  }), [f, n]), v = P.useCallback((S) => b.current.onChange({
    target: {
      value: sE(S),
      name: n
    },
    type: Ui.CHANGE
  }), [n]), w = P.useCallback(() => b.current.onBlur({
    target: {
      value: Pe(o._formValues, n),
      name: n
    },
    type: Ui.BLUR
  }), [n, o._formValues]), y = P.useCallback((S) => {
    const N = Pe(o._fields, n);
    N && N._f && S && (N._f.ref = {
      focus: () => or(S.focus) && S.focus(),
      select: () => or(S.select) && S.select(),
      setCustomValidity: (C) => or(S.setCustomValidity) && S.setCustomValidity(C),
      reportValidity: () => or(S.reportValidity) && S.reportValidity()
    });
  }, [o._fields, n]), x = P.useMemo(() => ({
    name: n,
    value: m,
    ...Ko(r) || f.disabled ? { disabled: f.disabled || r } : {},
    onChange: v,
    onBlur: w,
    ref: y
  }), [n, r, f.disabled, v, w, y, m]);
  return P.useEffect(() => {
    const S = o._options.shouldUnregister || a, N = h.current;
    N && N !== n && !c && o.unregister(N), o.register(n, {
      ...p.current.rules,
      ...Ko(p.current.disabled) ? { disabled: p.current.disabled } : {}
    });
    const C = (E, T) => {
      const D = Pe(o._fields, E);
      D && D._f && (D._f.mount = T);
    };
    if (C(n, !0), S) {
      const E = Ju(Pe(o._options.defaultValues, n, p.current.defaultValue));
      Gi(o._defaultValues, n, E), fa(Pe(o._formValues, n)) && Gi(o._formValues, n, E);
    }
    return !c && o.register(n), h.current = n, () => {
      (c ? S && !o._state.action : S) ? o.unregister(n) : C(n, !1);
    };
  }, [n, o, c, a]), P.useEffect(() => {
    o._setDisabledField({
      disabled: r,
      name: n
    });
  }, [r, n, o]), P.useMemo(() => ({
    field: x,
    formState: f,
    fieldState: g
  }), [x, f, g]);
}
const gE = (e) => e.render(hE(e)), Ps = P.createContext(null);
Ps.displayName = "HookFormContext";
const vE = () => P.useContext(Ps), bE = (e) => {
  const { children: t, watch: n, getValues: r, getFieldState: o, setError: a, clearErrors: s, setValue: i, trigger: c, formState: d, resetField: m, reset: f, handleSubmit: p, unregister: h, control: b, register: g, setFocus: v, subscribe: w } = e, y = P.useMemo(() => ({
    watch: n,
    getValues: r,
    getFieldState: o,
    setError: a,
    clearErrors: s,
    setValue: i,
    trigger: c,
    formState: d,
    resetField: m,
    reset: f,
    handleSubmit: p,
    unregister: h,
    control: b,
    register: g,
    setFocus: v,
    subscribe: w
  }), [
    s,
    b,
    d,
    o,
    r,
    p,
    g,
    f,
    m,
    a,
    v,
    i,
    w,
    c,
    h,
    n
  ]);
  return P.createElement(
    Ps.Provider,
    { value: y },
    P.createElement(Es.Provider, { value: y.control }, t)
  );
};
var yE = [
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
], wE = yE.reduce((e, t) => {
  const n = /* @__PURE__ */ _n(`Primitive.${t}`), r = l.forwardRef((o, a) => {
    const { asChild: s, ...i } = o, c = s ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ u(c, { ...i, ref: a });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {}), xE = "Label", rf = l.forwardRef((e, t) => /* @__PURE__ */ u(
  wE.label,
  {
    ...e,
    ref: t,
    onMouseDown: (n) => {
      var o;
      n.target.closest("button, input, select, textarea") || ((o = e.onMouseDown) == null || o.call(e, n), !n.defaultPrevented && n.detail > 1 && n.preventDefault());
    }
  }
));
rf.displayName = xE;
var of = rf;
const SE = Fe(
  "text-body-sm font-medium text-content-primary leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-60"
), en = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(of, { ref: n, className: k(SE(), e), ...t }));
en.displayName = of.displayName;
const FM = bE, af = l.createContext({}), LM = ({
  ...e
}) => /* @__PURE__ */ u(af.Provider, { value: { name: e.name }, children: /* @__PURE__ */ u(gE, { ...e }) }), ao = () => {
  const e = l.useContext(af), t = l.useContext(sf), { getFieldState: n, formState: r } = vE(), o = n(e.name, r);
  if (!e) throw new Error("useFormField must be used within <FormField>");
  const { id: a } = t;
  return {
    id: a,
    name: e.name,
    formItemId: `${a}-form-item`,
    formDescriptionId: `${a}-form-item-description`,
    formMessageId: `${a}-form-item-message`,
    ...o
  };
}, sf = l.createContext({}), CE = l.forwardRef(
  ({ className: e, ...t }, n) => {
    const r = l.useId();
    return /* @__PURE__ */ u(sf.Provider, { value: { id: r }, children: /* @__PURE__ */ u("div", { ref: n, className: k("space-y-1.5", e), ...t }) });
  }
);
CE.displayName = "FormItem";
const NE = l.forwardRef(({ className: e, ...t }, n) => {
  const { error: r, formItemId: o } = ao();
  return /* @__PURE__ */ u(
    en,
    {
      ref: n,
      className: k(r && "text-feedback-danger", e),
      htmlFor: o,
      ...t
    }
  );
});
NE.displayName = "FormLabel";
const EE = l.forwardRef(({ ...e }, t) => {
  const { error: n, formItemId: r, formDescriptionId: o, formMessageId: a } = ao();
  return /* @__PURE__ */ u(
    "div",
    {
      id: r,
      "aria-describedby": n ? `${o} ${a}` : o,
      "aria-invalid": !!n,
      ...e
    }
  );
});
EE.displayName = "FormControl";
const kE = l.forwardRef(({ className: e, ...t }, n) => {
  const { formDescriptionId: r } = ao();
  return /* @__PURE__ */ u(
    "p",
    {
      ref: n,
      id: r,
      className: k("text-caption text-content-secondary", e),
      ...t
    }
  );
});
kE.displayName = "FormDescription";
const PE = l.forwardRef(({ className: e, children: t, ...n }, r) => {
  const { error: o, formMessageId: a } = ao(), s = o ? String(o == null ? void 0 : o.message) : t;
  return s ? /* @__PURE__ */ u(
    "p",
    {
      ref: r,
      id: a,
      role: "alert",
      className: k("text-caption font-medium text-feedback-danger flex items-center gap-1", e),
      ...n,
      children: s
    }
  ) : null;
});
PE.displayName = "FormMessage";
const Rs = l.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ u(
    "input",
    {
      type: t,
      className: k(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        e
      ),
      ref: r,
      ...n
    }
  )
);
Rs.displayName = "Input";
const RE = ({ className: e, ...t }) => /* @__PURE__ */ u(
  "nav",
  {
    role: "navigation",
    "aria-label": "pagination",
    className: k("mx-auto flex w-full justify-center", e),
    ...t
  }
);
RE.displayName = "Pagination";
const ME = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  "ul",
  {
    ref: n,
    className: k("flex flex-row items-center gap-1", e),
    ...t
  }
));
ME.displayName = "PaginationContent";
const TE = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u("li", { ref: n, className: k("", e), ...t }));
TE.displayName = "PaginationItem";
const Ms = ({
  className: e,
  isActive: t,
  size: n = "icon",
  ...r
}) => /* @__PURE__ */ u(
  "a",
  {
    "aria-current": t ? "page" : void 0,
    className: k(
      br({
        variant: t ? "outline" : "ghost",
        size: n
      }),
      e
    ),
    ...r
  }
);
Ms.displayName = "PaginationLink";
const _E = ({
  className: e,
  ...t
}) => /* @__PURE__ */ R(
  Ms,
  {
    "aria-label": "Go to previous page",
    size: "default",
    className: k("gap-1 pl-2.5", e),
    ...t,
    children: [
      /* @__PURE__ */ u(Ac, { className: "h-4 w-4" }),
      /* @__PURE__ */ u("span", { children: "Previous" })
    ]
  }
);
_E.displayName = "PaginationPrevious";
const DE = ({
  className: e,
  ...t
}) => /* @__PURE__ */ R(
  Ms,
  {
    "aria-label": "Go to next page",
    size: "default",
    className: k("gap-1 pr-2.5", e),
    ...t,
    children: [
      /* @__PURE__ */ u("span", { children: "Next" }),
      /* @__PURE__ */ u(Fr, { className: "h-4 w-4" })
    ]
  }
);
DE.displayName = "PaginationNext";
const OE = ({
  className: e,
  ...t
}) => /* @__PURE__ */ R(
  "span",
  {
    "aria-hidden": !0,
    className: k("flex h-9 w-9 items-center justify-center", e),
    ...t,
    children: [
      /* @__PURE__ */ u($c, { className: "h-4 w-4" }),
      /* @__PURE__ */ u("span", { className: "sr-only", children: "More pages" })
    ]
  }
);
OE.displayName = "PaginationEllipsis";
// @__NO_SIDE_EFFECTS__
function AE(e) {
  const t = /* @__PURE__ */ IE(e), n = l.forwardRef((r, o) => {
    const { children: a, ...s } = r, i = l.Children.toArray(a), c = i.find(WE);
    if (c) {
      const d = c.props.children, m = i.map((f) => f === c ? l.Children.count(d) > 1 ? l.Children.only(null) : l.isValidElement(d) ? d.props.children : null : f);
      return /* @__PURE__ */ u(t, { ...s, ref: o, children: l.isValidElement(d) ? l.cloneElement(d, void 0, m) : null });
    }
    return /* @__PURE__ */ u(t, { ...s, ref: o, children: a });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function IE(e) {
  const t = l.forwardRef((n, r) => {
    const { children: o, ...a } = n;
    if (l.isValidElement(o)) {
      const s = LE(o), i = FE(a, o.props);
      return o.type !== l.Fragment && (i.ref = r ? ke(r, s) : s), l.cloneElement(o, i);
    }
    return l.Children.count(o) > 1 ? l.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var $E = Symbol("radix.slottable");
function WE(e) {
  return l.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === $E;
}
function FE(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], a = t[r];
    /^on[A-Z]/.test(r) ? o && a ? n[r] = (...i) => {
      const c = a(...i);
      return o(...i), c;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...a } : r === "className" && (n[r] = [o, a].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function LE(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var so = "Popover", [cf] = we(so, [
  xt
]), qn = xt(), [BE, Ct] = cf(so), lf = (e) => {
  const {
    __scopePopover: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    modal: s = !1
  } = e, i = qn(t), c = l.useRef(null), [d, m] = l.useState(!1), [f, p] = xe({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: so
  });
  return /* @__PURE__ */ u(Yn, { ...i, children: /* @__PURE__ */ u(
    BE,
    {
      scope: t,
      contentId: he(),
      triggerRef: c,
      open: f,
      onOpenChange: p,
      onOpenToggle: l.useCallback(() => p((h) => !h), [p]),
      hasCustomAnchor: d,
      onCustomAnchorAdd: l.useCallback(() => m(!0), []),
      onCustomAnchorRemove: l.useCallback(() => m(!1), []),
      modal: s,
      children: n
    }
  ) });
};
lf.displayName = so;
var df = "PopoverAnchor", VE = l.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = Ct(df, n), a = qn(n), { onCustomAnchorAdd: s, onCustomAnchorRemove: i } = o;
    return l.useEffect(() => (s(), () => i()), [s, i]), /* @__PURE__ */ u(zn, { ...a, ...r, ref: t });
  }
);
VE.displayName = df;
var uf = "PopoverTrigger", ff = l.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = Ct(uf, n), a = qn(n), s = q(t, o.triggerRef), i = /* @__PURE__ */ u(
      L.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": vf(o.open),
        ...r,
        ref: s,
        onClick: _(e.onClick, o.onOpenToggle)
      }
    );
    return o.hasCustomAnchor ? i : /* @__PURE__ */ u(zn, { asChild: !0, ...a, children: i });
  }
);
ff.displayName = uf;
var Ts = "PopoverPortal", [HE, YE] = cf(Ts, {
  forceMount: void 0
}), mf = (e) => {
  const { __scopePopover: t, forceMount: n, children: r, container: o } = e, a = Ct(Ts, t);
  return /* @__PURE__ */ u(HE, { scope: t, forceMount: n, children: /* @__PURE__ */ u(ve, { present: n || a.open, children: /* @__PURE__ */ u(Ft, { asChild: !0, container: o, children: r }) }) });
};
mf.displayName = Ts;
var rn = "PopoverContent", pf = l.forwardRef(
  (e, t) => {
    const n = YE(rn, e.__scopePopover), { forceMount: r = n.forceMount, ...o } = e, a = Ct(rn, e.__scopePopover);
    return /* @__PURE__ */ u(ve, { present: r || a.open, children: a.modal ? /* @__PURE__ */ u(jE, { ...o, ref: t }) : /* @__PURE__ */ u(GE, { ...o, ref: t }) });
  }
);
pf.displayName = rn;
var zE = /* @__PURE__ */ AE("PopoverContent.RemoveScroll"), jE = l.forwardRef(
  (e, t) => {
    const n = Ct(rn, e.__scopePopover), r = l.useRef(null), o = q(t, r), a = l.useRef(!1);
    return l.useEffect(() => {
      const s = r.current;
      if (s) return jr(s);
    }, []), /* @__PURE__ */ u(Fn, { as: zE, allowPinchZoom: !0, children: /* @__PURE__ */ u(
      hf,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: _(e.onCloseAutoFocus, (s) => {
          var i;
          s.preventDefault(), a.current || (i = n.triggerRef.current) == null || i.focus();
        }),
        onPointerDownOutside: _(
          e.onPointerDownOutside,
          (s) => {
            const i = s.detail.originalEvent, c = i.button === 0 && i.ctrlKey === !0, d = i.button === 2 || c;
            a.current = d;
          },
          { checkForDefaultPrevented: !1 }
        ),
        onFocusOutside: _(
          e.onFocusOutside,
          (s) => s.preventDefault(),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
), GE = l.forwardRef(
  (e, t) => {
    const n = Ct(rn, e.__scopePopover), r = l.useRef(!1), o = l.useRef(!1);
    return /* @__PURE__ */ u(
      hf,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (a) => {
          var s, i;
          (s = e.onCloseAutoFocus) == null || s.call(e, a), a.defaultPrevented || (r.current || (i = n.triggerRef.current) == null || i.focus(), a.preventDefault()), r.current = !1, o.current = !1;
        },
        onInteractOutside: (a) => {
          var c, d;
          (c = e.onInteractOutside) == null || c.call(e, a), a.defaultPrevented || (r.current = !0, a.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const s = a.target;
          ((d = n.triggerRef.current) == null ? void 0 : d.contains(s)) && a.preventDefault(), a.detail.originalEvent.type === "focusin" && o.current && a.preventDefault();
        }
      }
    );
  }
), hf = l.forwardRef(
  (e, t) => {
    const {
      __scopePopover: n,
      trapFocus: r,
      onOpenAutoFocus: o,
      onCloseAutoFocus: a,
      disableOutsidePointerEvents: s,
      onEscapeKeyDown: i,
      onPointerDownOutside: c,
      onFocusOutside: d,
      onInteractOutside: m,
      ...f
    } = e, p = Ct(rn, n), h = qn(n);
    return Yr(), /* @__PURE__ */ u(
      Wn,
      {
        asChild: !0,
        loop: !0,
        trapped: r,
        onMountAutoFocus: o,
        onUnmountAutoFocus: a,
        children: /* @__PURE__ */ u(
          Wt,
          {
            asChild: !0,
            disableOutsidePointerEvents: s,
            onInteractOutside: m,
            onEscapeKeyDown: i,
            onPointerDownOutside: c,
            onFocusOutside: d,
            onDismiss: () => p.onOpenChange(!1),
            children: /* @__PURE__ */ u(
              to,
              {
                "data-state": vf(p.open),
                role: "dialog",
                id: p.contentId,
                ...h,
                ...f,
                ref: t,
                style: {
                  ...f.style,
                  "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
                  "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
                  "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
                  "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
                  "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
                }
              }
            )
          }
        )
      }
    );
  }
), gf = "PopoverClose", UE = l.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = Ct(gf, n);
    return /* @__PURE__ */ u(
      L.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: _(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
UE.displayName = gf;
var KE = "PopoverArrow", qE = l.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = qn(n);
    return /* @__PURE__ */ u(no, { ...o, ...r, ref: t });
  }
);
qE.displayName = KE;
function vf(e) {
  return e ? "open" : "closed";
}
var XE = lf, ZE = ff, QE = mf, bf = pf;
const yf = XE, wf = ZE, _s = l.forwardRef(({ className: e, align: t = "center", sideOffset: n = 4, ...r }, o) => /* @__PURE__ */ u(QE, { children: /* @__PURE__ */ u(
  bf,
  {
    ref: o,
    align: t,
    sideOffset: n,
    className: k(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-popover-content-transform-origin]",
      e
    ),
    ...r
  }
) }));
_s.displayName = bf.displayName;
function JE(e, t = []) {
  let n = [];
  function r(a, s) {
    const i = l.createContext(s);
    i.displayName = a + "Context";
    const c = n.length;
    n = [...n, s];
    const d = (f) => {
      var w;
      const { scope: p, children: h, ...b } = f, g = ((w = p == null ? void 0 : p[e]) == null ? void 0 : w[c]) || i, v = l.useMemo(() => b, Object.values(b));
      return /* @__PURE__ */ u(g.Provider, { value: v, children: h });
    };
    d.displayName = a + "Provider";
    function m(f, p) {
      var g;
      const h = ((g = p == null ? void 0 : p[e]) == null ? void 0 : g[c]) || i, b = l.useContext(h);
      if (b) return b;
      if (s !== void 0) return s;
      throw new Error(`\`${f}\` must be used within \`${a}\``);
    }
    return [d, m];
  }
  const o = () => {
    const a = n.map((s) => l.createContext(s));
    return function(i) {
      const c = (i == null ? void 0 : i[e]) || a;
      return l.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: c } }),
        [i, c]
      );
    };
  };
  return o.scopeName = e, [r, ek(o, ...t)];
}
function ek(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(a) {
      const s = r.reduce((i, { useScope: c, scopeName: d }) => {
        const f = c(a)[`__scope${d}`];
        return { ...i, ...f };
      }, {});
      return l.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
var tk = [
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
], xf = tk.reduce((e, t) => {
  const n = /* @__PURE__ */ _n(`Primitive.${t}`), r = l.forwardRef((o, a) => {
    const { asChild: s, ...i } = o, c = s ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ u(c, { ...i, ref: a });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {}), Ds = "Progress", Os = 100, [nk] = JE(Ds), [rk, ok] = nk(Ds), Sf = l.forwardRef(
  (e, t) => {
    const {
      __scopeProgress: n,
      value: r = null,
      max: o,
      getValueLabel: a = ak,
      ...s
    } = e;
    (o || o === 0) && !Zi(o) && console.error(sk(`${o}`, "Progress"));
    const i = Zi(o) ? o : Os;
    r !== null && !Qi(r, i) && console.error(ik(`${r}`, "Progress"));
    const c = Qi(r, i) ? r : null, d = Mr(c) ? a(c, i) : void 0;
    return /* @__PURE__ */ u(rk, { scope: n, value: c, max: i, children: /* @__PURE__ */ u(
      xf.div,
      {
        "aria-valuemax": i,
        "aria-valuemin": 0,
        "aria-valuenow": Mr(c) ? c : void 0,
        "aria-valuetext": d,
        role: "progressbar",
        "data-state": Ef(c, i),
        "data-value": c ?? void 0,
        "data-max": i,
        ...s,
        ref: t
      }
    ) });
  }
);
Sf.displayName = Ds;
var Cf = "ProgressIndicator", Nf = l.forwardRef(
  (e, t) => {
    const { __scopeProgress: n, ...r } = e, o = ok(Cf, n);
    return /* @__PURE__ */ u(
      xf.div,
      {
        "data-state": Ef(o.value, o.max),
        "data-value": o.value ?? void 0,
        "data-max": o.max,
        ...r,
        ref: t
      }
    );
  }
);
Nf.displayName = Cf;
function ak(e, t) {
  return `${Math.round(e / t * 100)}%`;
}
function Ef(e, t) {
  return e == null ? "indeterminate" : e === t ? "complete" : "loading";
}
function Mr(e) {
  return typeof e == "number";
}
function Zi(e) {
  return Mr(e) && !isNaN(e) && e > 0;
}
function Qi(e, t) {
  return Mr(e) && !isNaN(e) && e <= t && e >= 0;
}
function sk(e, t) {
  return `Invalid prop \`max\` of value \`${e}\` supplied to \`${t}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${Os}\`.`;
}
function ik(e, t) {
  return `Invalid prop \`value\` of value \`${e}\` supplied to \`${t}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${Os} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var kf = Sf, ck = Nf;
const lk = Fe("relative w-full overflow-hidden rounded-full bg-border-subtle", {
  variants: {
    size: {
      sm: "h-1",
      default: "h-2",
      lg: "h-3"
    }
  },
  defaultVariants: { size: "default" }
}), dk = Fe("h-full w-full flex-1 transition-all duration-slow ease-out", {
  variants: {
    intent: {
      default: "bg-primary",
      success: "bg-feedback-success",
      warning: "bg-feedback-warning",
      danger: "bg-feedback-danger"
    }
  },
  defaultVariants: { intent: "default" }
}), Pf = l.forwardRef(
  ({ className: e, value: t, size: n, intent: r, ...o }, a) => /* @__PURE__ */ u(
    kf,
    {
      ref: a,
      className: k(lk({ size: n }), e),
      ...o,
      children: /* @__PURE__ */ u(
        ck,
        {
          className: k(dk({ intent: r })),
          style: { transform: `translateX(-${100 - (t ?? 0)}%)` }
        }
      )
    }
  )
);
Pf.displayName = kf.displayName;
var As = "Radio", [uk, Rf] = we(As), [fk, mk] = uk(As), Mf = l.forwardRef(
  (e, t) => {
    const {
      __scopeRadio: n,
      name: r,
      checked: o = !1,
      required: a,
      disabled: s,
      value: i = "on",
      onCheck: c,
      form: d,
      ...m
    } = e, [f, p] = l.useState(null), h = q(t, (v) => p(v)), b = l.useRef(!1), g = f ? d || !!f.closest("form") : !0;
    return /* @__PURE__ */ R(fk, { scope: n, checked: o, disabled: s, children: [
      /* @__PURE__ */ u(
        L.button,
        {
          type: "button",
          role: "radio",
          "aria-checked": o,
          "data-state": Of(o),
          "data-disabled": s ? "" : void 0,
          disabled: s,
          value: i,
          ...m,
          ref: h,
          onClick: _(e.onClick, (v) => {
            o || c == null || c(), g && (b.current = v.isPropagationStopped(), b.current || v.stopPropagation());
          })
        }
      ),
      g && /* @__PURE__ */ u(
        Df,
        {
          control: f,
          bubbles: !b.current,
          name: r,
          value: i,
          checked: o,
          required: a,
          disabled: s,
          form: d,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Mf.displayName = As;
var Tf = "RadioIndicator", _f = l.forwardRef(
  (e, t) => {
    const { __scopeRadio: n, forceMount: r, ...o } = e, a = mk(Tf, n);
    return /* @__PURE__ */ u(ve, { present: r || a.checked, children: /* @__PURE__ */ u(
      L.span,
      {
        "data-state": Of(a.checked),
        "data-disabled": a.disabled ? "" : void 0,
        ...o,
        ref: t
      }
    ) });
  }
);
_f.displayName = Tf;
var pk = "RadioBubbleInput", Df = l.forwardRef(
  ({
    __scopeRadio: e,
    control: t,
    checked: n,
    bubbles: r = !0,
    ...o
  }, a) => {
    const s = l.useRef(null), i = q(s, a), c = In(n), d = $n(t);
    return l.useEffect(() => {
      const m = s.current;
      if (!m) return;
      const f = window.HTMLInputElement.prototype, h = Object.getOwnPropertyDescriptor(
        f,
        "checked"
      ).set;
      if (c !== n && h) {
        const b = new Event("click", { bubbles: r });
        h.call(m, n), m.dispatchEvent(b);
      }
    }, [c, n, r]), /* @__PURE__ */ u(
      L.input,
      {
        type: "radio",
        "aria-hidden": !0,
        defaultChecked: n,
        ...o,
        tabIndex: -1,
        ref: i,
        style: {
          ...o.style,
          ...d,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
Df.displayName = pk;
function Of(e) {
  return e ? "checked" : "unchecked";
}
var hk = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], io = "RadioGroup", [gk] = we(io, [
  fn,
  Rf
]), Af = fn(), If = Rf(), [vk, bk] = gk(io), $f = l.forwardRef(
  (e, t) => {
    const {
      __scopeRadioGroup: n,
      name: r,
      defaultValue: o,
      value: a,
      required: s = !1,
      disabled: i = !1,
      orientation: c,
      dir: d,
      loop: m = !0,
      onValueChange: f,
      ...p
    } = e, h = Af(n), b = wt(d), [g, v] = xe({
      prop: a,
      defaultProp: o ?? null,
      onChange: f,
      caller: io
    });
    return /* @__PURE__ */ u(
      vk,
      {
        scope: n,
        name: r,
        required: s,
        disabled: i,
        value: g,
        onValueChange: v,
        children: /* @__PURE__ */ u(
          ps,
          {
            asChild: !0,
            ...h,
            orientation: c,
            dir: b,
            loop: m,
            children: /* @__PURE__ */ u(
              L.div,
              {
                role: "radiogroup",
                "aria-required": s,
                "aria-orientation": c,
                "data-disabled": i ? "" : void 0,
                dir: b,
                ...p,
                ref: t
              }
            )
          }
        )
      }
    );
  }
);
$f.displayName = io;
var Wf = "RadioGroupItem", Ff = l.forwardRef(
  (e, t) => {
    const { __scopeRadioGroup: n, disabled: r, ...o } = e, a = bk(Wf, n), s = a.disabled || r, i = Af(n), c = If(n), d = l.useRef(null), m = q(t, d), f = a.value === o.value, p = l.useRef(!1);
    return l.useEffect(() => {
      const h = (g) => {
        hk.includes(g.key) && (p.current = !0);
      }, b = () => p.current = !1;
      return document.addEventListener("keydown", h), document.addEventListener("keyup", b), () => {
        document.removeEventListener("keydown", h), document.removeEventListener("keyup", b);
      };
    }, []), /* @__PURE__ */ u(
      hs,
      {
        asChild: !0,
        ...i,
        focusable: !s,
        active: f,
        children: /* @__PURE__ */ u(
          Mf,
          {
            disabled: s,
            required: a.required,
            checked: f,
            ...c,
            ...o,
            name: a.name,
            ref: m,
            onCheck: () => a.onValueChange(o.value),
            onKeyDown: _((h) => {
              h.key === "Enter" && h.preventDefault();
            }),
            onFocus: _(o.onFocus, () => {
              var h;
              p.current && ((h = d.current) == null || h.click());
            })
          }
        )
      }
    );
  }
);
Ff.displayName = Wf;
var yk = "RadioGroupIndicator", Lf = l.forwardRef(
  (e, t) => {
    const { __scopeRadioGroup: n, ...r } = e, o = If(n);
    return /* @__PURE__ */ u(_f, { ...o, ...r, ref: t });
  }
);
Lf.displayName = yk;
var Bf = $f, Vf = Ff, wk = Lf;
const xk = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(Bf, { className: k("grid gap-2", e), ...t, ref: n }));
xk.displayName = Bf.displayName;
const Sk = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  Vf,
  {
    ref: n,
    className: k(
      "aspect-square h-4 w-4 rounded-full border border-border-strong",
      "bg-surface-raised ring-offset-background",
      "transition-colors duration-fast",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:border-primary data-[state=checked]:text-primary",
      e
    ),
    ...t,
    children: /* @__PURE__ */ u(wk, { className: "flex items-center justify-center", children: /* @__PURE__ */ u(Ic, { className: "h-2 w-2 fill-current text-primary" }) })
  }
));
Sk.displayName = Vf.displayName;
function Rn(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
function Ck(e, t) {
  return l.useReducer((n, r) => t[n][r] ?? n, e);
}
var Is = "ScrollArea", [Hf] = we(Is), [Nk, Le] = Hf(Is), Yf = l.forwardRef(
  (e, t) => {
    const {
      __scopeScrollArea: n,
      type: r = "hover",
      dir: o,
      scrollHideDelay: a = 600,
      ...s
    } = e, [i, c] = l.useState(null), [d, m] = l.useState(null), [f, p] = l.useState(null), [h, b] = l.useState(null), [g, v] = l.useState(null), [w, y] = l.useState(0), [x, S] = l.useState(0), [N, C] = l.useState(!1), [E, T] = l.useState(!1), D = q(t, (W) => c(W)), A = wt(o);
    return /* @__PURE__ */ u(
      Nk,
      {
        scope: n,
        type: r,
        dir: A,
        scrollHideDelay: a,
        scrollArea: i,
        viewport: d,
        onViewportChange: m,
        content: f,
        onContentChange: p,
        scrollbarX: h,
        onScrollbarXChange: b,
        scrollbarXEnabled: N,
        onScrollbarXEnabledChange: C,
        scrollbarY: g,
        onScrollbarYChange: v,
        scrollbarYEnabled: E,
        onScrollbarYEnabledChange: T,
        onCornerWidthChange: y,
        onCornerHeightChange: S,
        children: /* @__PURE__ */ u(
          L.div,
          {
            dir: A,
            ...s,
            ref: D,
            style: {
              position: "relative",
              // Pass corner sizes as CSS vars to reduce re-renders of context consumers
              "--radix-scroll-area-corner-width": w + "px",
              "--radix-scroll-area-corner-height": x + "px",
              ...e.style
            }
          }
        )
      }
    );
  }
);
Yf.displayName = Is;
var zf = "ScrollAreaViewport", jf = l.forwardRef(
  (e, t) => {
    const { __scopeScrollArea: n, children: r, nonce: o, ...a } = e, s = Le(zf, n), i = l.useRef(null), c = q(t, i, s.onViewportChange);
    return /* @__PURE__ */ R(ze, { children: [
      /* @__PURE__ */ u(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: o
        }
      ),
      /* @__PURE__ */ u(
        L.div,
        {
          "data-radix-scroll-area-viewport": "",
          ...a,
          ref: c,
          style: {
            /**
             * We don't support `visible` because the intention is to have at least one scrollbar
             * if this component is used and `visible` will behave like `auto` in that case
             * https://developer.mozilla.org/en-US/docs/Web/CSS/overflow#description
             *
             * We don't handle `auto` because the intention is for the native implementation
             * to be hidden if using this component. We just want to ensure the node is scrollable
             * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
             * the browser from having to work out whether to render native scrollbars or not,
             * we tell it to with the intention of hiding them in CSS.
             */
            overflowX: s.scrollbarXEnabled ? "scroll" : "hidden",
            overflowY: s.scrollbarYEnabled ? "scroll" : "hidden",
            ...e.style
          },
          children: /* @__PURE__ */ u("div", { ref: s.onContentChange, style: { minWidth: "100%", display: "table" }, children: r })
        }
      )
    ] });
  }
);
jf.displayName = zf;
var ot = "ScrollAreaScrollbar", $s = l.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = Le(ot, e.__scopeScrollArea), { onScrollbarXEnabledChange: a, onScrollbarYEnabledChange: s } = o, i = e.orientation === "horizontal";
    return l.useEffect(() => (i ? a(!0) : s(!0), () => {
      i ? a(!1) : s(!1);
    }), [i, a, s]), o.type === "hover" ? /* @__PURE__ */ u(Ek, { ...r, ref: t, forceMount: n }) : o.type === "scroll" ? /* @__PURE__ */ u(kk, { ...r, ref: t, forceMount: n }) : o.type === "auto" ? /* @__PURE__ */ u(Gf, { ...r, ref: t, forceMount: n }) : o.type === "always" ? /* @__PURE__ */ u(Ws, { ...r, ref: t }) : null;
  }
);
$s.displayName = ot;
var Ek = l.forwardRef((e, t) => {
  const { forceMount: n, ...r } = e, o = Le(ot, e.__scopeScrollArea), [a, s] = l.useState(!1);
  return l.useEffect(() => {
    const i = o.scrollArea;
    let c = 0;
    if (i) {
      const d = () => {
        window.clearTimeout(c), s(!0);
      }, m = () => {
        c = window.setTimeout(() => s(!1), o.scrollHideDelay);
      };
      return i.addEventListener("pointerenter", d), i.addEventListener("pointerleave", m), () => {
        window.clearTimeout(c), i.removeEventListener("pointerenter", d), i.removeEventListener("pointerleave", m);
      };
    }
  }, [o.scrollArea, o.scrollHideDelay]), /* @__PURE__ */ u(ve, { present: n || a, children: /* @__PURE__ */ u(
    Gf,
    {
      "data-state": a ? "visible" : "hidden",
      ...r,
      ref: t
    }
  ) });
}), kk = l.forwardRef((e, t) => {
  const { forceMount: n, ...r } = e, o = Le(ot, e.__scopeScrollArea), a = e.orientation === "horizontal", s = lo(() => c("SCROLL_END"), 100), [i, c] = Ck("hidden", {
    hidden: {
      SCROLL: "scrolling"
    },
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
  return l.useEffect(() => {
    if (i === "idle") {
      const d = window.setTimeout(() => c("HIDE"), o.scrollHideDelay);
      return () => window.clearTimeout(d);
    }
  }, [i, o.scrollHideDelay, c]), l.useEffect(() => {
    const d = o.viewport, m = a ? "scrollLeft" : "scrollTop";
    if (d) {
      let f = d[m];
      const p = () => {
        const h = d[m];
        f !== h && (c("SCROLL"), s()), f = h;
      };
      return d.addEventListener("scroll", p), () => d.removeEventListener("scroll", p);
    }
  }, [o.viewport, a, c, s]), /* @__PURE__ */ u(ve, { present: n || i !== "hidden", children: /* @__PURE__ */ u(
    Ws,
    {
      "data-state": i === "hidden" ? "hidden" : "visible",
      ...r,
      ref: t,
      onPointerEnter: _(e.onPointerEnter, () => c("POINTER_ENTER")),
      onPointerLeave: _(e.onPointerLeave, () => c("POINTER_LEAVE"))
    }
  ) });
}), Gf = l.forwardRef((e, t) => {
  const n = Le(ot, e.__scopeScrollArea), { forceMount: r, ...o } = e, [a, s] = l.useState(!1), i = e.orientation === "horizontal", c = lo(() => {
    if (n.viewport) {
      const d = n.viewport.offsetWidth < n.viewport.scrollWidth, m = n.viewport.offsetHeight < n.viewport.scrollHeight;
      s(i ? d : m);
    }
  }, 10);
  return on(n.viewport, c), on(n.content, c), /* @__PURE__ */ u(ve, { present: r || a, children: /* @__PURE__ */ u(
    Ws,
    {
      "data-state": a ? "visible" : "hidden",
      ...o,
      ref: t
    }
  ) });
}), Ws = l.forwardRef((e, t) => {
  const { orientation: n = "vertical", ...r } = e, o = Le(ot, e.__scopeScrollArea), a = l.useRef(null), s = l.useRef(0), [i, c] = l.useState({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  }), d = Zf(i.viewport, i.content), m = {
    ...r,
    sizes: i,
    onSizesChange: c,
    hasThumb: d > 0 && d < 1,
    onThumbChange: (p) => a.current = p,
    onThumbPointerUp: () => s.current = 0,
    onThumbPointerDown: (p) => s.current = p
  };
  function f(p, h) {
    return Dk(p, s.current, i, h);
  }
  return n === "horizontal" ? /* @__PURE__ */ u(
    Pk,
    {
      ...m,
      ref: t,
      onThumbPositionChange: () => {
        if (o.viewport && a.current) {
          const p = o.viewport.scrollLeft, h = Ji(p, i, o.dir);
          a.current.style.transform = `translate3d(${h}px, 0, 0)`;
        }
      },
      onWheelScroll: (p) => {
        o.viewport && (o.viewport.scrollLeft = p);
      },
      onDragScroll: (p) => {
        o.viewport && (o.viewport.scrollLeft = f(p, o.dir));
      }
    }
  ) : n === "vertical" ? /* @__PURE__ */ u(
    Rk,
    {
      ...m,
      ref: t,
      onThumbPositionChange: () => {
        if (o.viewport && a.current) {
          const p = o.viewport.scrollTop, h = Ji(p, i);
          a.current.style.transform = `translate3d(0, ${h}px, 0)`;
        }
      },
      onWheelScroll: (p) => {
        o.viewport && (o.viewport.scrollTop = p);
      },
      onDragScroll: (p) => {
        o.viewport && (o.viewport.scrollTop = f(p));
      }
    }
  ) : null;
}), Pk = l.forwardRef((e, t) => {
  const { sizes: n, onSizesChange: r, ...o } = e, a = Le(ot, e.__scopeScrollArea), [s, i] = l.useState(), c = l.useRef(null), d = q(t, c, a.onScrollbarXChange);
  return l.useEffect(() => {
    c.current && i(getComputedStyle(c.current));
  }, [c]), /* @__PURE__ */ u(
    Kf,
    {
      "data-orientation": "horizontal",
      ...o,
      ref: d,
      sizes: n,
      style: {
        bottom: 0,
        left: a.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: a.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        "--radix-scroll-area-thumb-width": co(n) + "px",
        ...e.style
      },
      onThumbPointerDown: (m) => e.onThumbPointerDown(m.x),
      onDragScroll: (m) => e.onDragScroll(m.x),
      onWheelScroll: (m, f) => {
        if (a.viewport) {
          const p = a.viewport.scrollLeft + m.deltaX;
          e.onWheelScroll(p), Jf(p, f) && m.preventDefault();
        }
      },
      onResize: () => {
        c.current && a.viewport && s && r({
          content: a.viewport.scrollWidth,
          viewport: a.viewport.offsetWidth,
          scrollbar: {
            size: c.current.clientWidth,
            paddingStart: _r(s.paddingLeft),
            paddingEnd: _r(s.paddingRight)
          }
        });
      }
    }
  );
}), Rk = l.forwardRef((e, t) => {
  const { sizes: n, onSizesChange: r, ...o } = e, a = Le(ot, e.__scopeScrollArea), [s, i] = l.useState(), c = l.useRef(null), d = q(t, c, a.onScrollbarYChange);
  return l.useEffect(() => {
    c.current && i(getComputedStyle(c.current));
  }, [c]), /* @__PURE__ */ u(
    Kf,
    {
      "data-orientation": "vertical",
      ...o,
      ref: d,
      sizes: n,
      style: {
        top: 0,
        right: a.dir === "ltr" ? 0 : void 0,
        left: a.dir === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        "--radix-scroll-area-thumb-height": co(n) + "px",
        ...e.style
      },
      onThumbPointerDown: (m) => e.onThumbPointerDown(m.y),
      onDragScroll: (m) => e.onDragScroll(m.y),
      onWheelScroll: (m, f) => {
        if (a.viewport) {
          const p = a.viewport.scrollTop + m.deltaY;
          e.onWheelScroll(p), Jf(p, f) && m.preventDefault();
        }
      },
      onResize: () => {
        c.current && a.viewport && s && r({
          content: a.viewport.scrollHeight,
          viewport: a.viewport.offsetHeight,
          scrollbar: {
            size: c.current.clientHeight,
            paddingStart: _r(s.paddingTop),
            paddingEnd: _r(s.paddingBottom)
          }
        });
      }
    }
  );
}), [Mk, Uf] = Hf(ot), Kf = l.forwardRef((e, t) => {
  const {
    __scopeScrollArea: n,
    sizes: r,
    hasThumb: o,
    onThumbChange: a,
    onThumbPointerUp: s,
    onThumbPointerDown: i,
    onThumbPositionChange: c,
    onDragScroll: d,
    onWheelScroll: m,
    onResize: f,
    ...p
  } = e, h = Le(ot, n), [b, g] = l.useState(null), v = q(t, (D) => g(D)), w = l.useRef(null), y = l.useRef(""), x = h.viewport, S = r.content - r.viewport, N = pe(m), C = pe(c), E = lo(f, 10);
  function T(D) {
    if (w.current) {
      const A = D.clientX - w.current.left, W = D.clientY - w.current.top;
      d({ x: A, y: W });
    }
  }
  return l.useEffect(() => {
    const D = (A) => {
      const W = A.target;
      (b == null ? void 0 : b.contains(W)) && N(A, S);
    };
    return document.addEventListener("wheel", D, { passive: !1 }), () => document.removeEventListener("wheel", D, { passive: !1 });
  }, [x, b, S, N]), l.useEffect(C, [r, C]), on(b, E), on(h.content, E), /* @__PURE__ */ u(
    Mk,
    {
      scope: n,
      scrollbar: b,
      hasThumb: o,
      onThumbChange: pe(a),
      onThumbPointerUp: pe(s),
      onThumbPositionChange: C,
      onThumbPointerDown: pe(i),
      children: /* @__PURE__ */ u(
        L.div,
        {
          ...p,
          ref: v,
          style: { position: "absolute", ...p.style },
          onPointerDown: _(e.onPointerDown, (D) => {
            D.button === 0 && (D.target.setPointerCapture(D.pointerId), w.current = b.getBoundingClientRect(), y.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", h.viewport && (h.viewport.style.scrollBehavior = "auto"), T(D));
          }),
          onPointerMove: _(e.onPointerMove, T),
          onPointerUp: _(e.onPointerUp, (D) => {
            const A = D.target;
            A.hasPointerCapture(D.pointerId) && A.releasePointerCapture(D.pointerId), document.body.style.webkitUserSelect = y.current, h.viewport && (h.viewport.style.scrollBehavior = ""), w.current = null;
          })
        }
      )
    }
  );
}), Tr = "ScrollAreaThumb", qf = l.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = Uf(Tr, e.__scopeScrollArea);
    return /* @__PURE__ */ u(ve, { present: n || o.hasThumb, children: /* @__PURE__ */ u(Tk, { ref: t, ...r }) });
  }
), Tk = l.forwardRef(
  (e, t) => {
    const { __scopeScrollArea: n, style: r, ...o } = e, a = Le(Tr, n), s = Uf(Tr, n), { onThumbPositionChange: i } = s, c = q(
      t,
      (f) => s.onThumbChange(f)
    ), d = l.useRef(void 0), m = lo(() => {
      d.current && (d.current(), d.current = void 0);
    }, 100);
    return l.useEffect(() => {
      const f = a.viewport;
      if (f) {
        const p = () => {
          if (m(), !d.current) {
            const h = Ok(f, i);
            d.current = h, i();
          }
        };
        return i(), f.addEventListener("scroll", p), () => f.removeEventListener("scroll", p);
      }
    }, [a.viewport, m, i]), /* @__PURE__ */ u(
      L.div,
      {
        "data-state": s.hasThumb ? "visible" : "hidden",
        ...o,
        ref: c,
        style: {
          width: "var(--radix-scroll-area-thumb-width)",
          height: "var(--radix-scroll-area-thumb-height)",
          ...r
        },
        onPointerDownCapture: _(e.onPointerDownCapture, (f) => {
          const h = f.target.getBoundingClientRect(), b = f.clientX - h.left, g = f.clientY - h.top;
          s.onThumbPointerDown({ x: b, y: g });
        }),
        onPointerUp: _(e.onPointerUp, s.onThumbPointerUp)
      }
    );
  }
);
qf.displayName = Tr;
var Fs = "ScrollAreaCorner", Xf = l.forwardRef(
  (e, t) => {
    const n = Le(Fs, e.__scopeScrollArea), r = !!(n.scrollbarX && n.scrollbarY);
    return n.type !== "scroll" && r ? /* @__PURE__ */ u(_k, { ...e, ref: t }) : null;
  }
);
Xf.displayName = Fs;
var _k = l.forwardRef((e, t) => {
  const { __scopeScrollArea: n, ...r } = e, o = Le(Fs, n), [a, s] = l.useState(0), [i, c] = l.useState(0), d = !!(a && i);
  return on(o.scrollbarX, () => {
    var f;
    const m = ((f = o.scrollbarX) == null ? void 0 : f.offsetHeight) || 0;
    o.onCornerHeightChange(m), c(m);
  }), on(o.scrollbarY, () => {
    var f;
    const m = ((f = o.scrollbarY) == null ? void 0 : f.offsetWidth) || 0;
    o.onCornerWidthChange(m), s(m);
  }), d ? /* @__PURE__ */ u(
    L.div,
    {
      ...r,
      ref: t,
      style: {
        width: a,
        height: i,
        position: "absolute",
        right: o.dir === "ltr" ? 0 : void 0,
        left: o.dir === "rtl" ? 0 : void 0,
        bottom: 0,
        ...e.style
      }
    }
  ) : null;
});
function _r(e) {
  return e ? parseInt(e, 10) : 0;
}
function Zf(e, t) {
  const n = e / t;
  return isNaN(n) ? 0 : n;
}
function co(e) {
  const t = Zf(e.viewport, e.content), n = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, r = (e.scrollbar.size - n) * t;
  return Math.max(r, 18);
}
function Dk(e, t, n, r = "ltr") {
  const o = co(n), a = o / 2, s = t || a, i = o - s, c = n.scrollbar.paddingStart + s, d = n.scrollbar.size - n.scrollbar.paddingEnd - i, m = n.content - n.viewport, f = r === "ltr" ? [0, m] : [m * -1, 0];
  return Qf([c, d], f)(e);
}
function Ji(e, t, n = "ltr") {
  const r = co(t), o = t.scrollbar.paddingStart + t.scrollbar.paddingEnd, a = t.scrollbar.size - o, s = t.content - t.viewport, i = a - r, c = n === "ltr" ? [0, s] : [s * -1, 0], d = Rn(e, c);
  return Qf([0, s], [0, i])(d);
}
function Qf(e, t) {
  return (n) => {
    if (e[0] === e[1] || t[0] === t[1]) return t[0];
    const r = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + r * (n - e[0]);
  };
}
function Jf(e, t) {
  return e > 0 && e < t;
}
var Ok = (e, t = () => {
}) => {
  let n = { left: e.scrollLeft, top: e.scrollTop }, r = 0;
  return function o() {
    const a = { left: e.scrollLeft, top: e.scrollTop }, s = n.left !== a.left, i = n.top !== a.top;
    (s || i) && t(), n = a, r = window.requestAnimationFrame(o);
  }(), () => window.cancelAnimationFrame(r);
};
function lo(e, t) {
  const n = pe(e), r = l.useRef(0);
  return l.useEffect(() => () => window.clearTimeout(r.current), []), l.useCallback(() => {
    window.clearTimeout(r.current), r.current = window.setTimeout(n, t);
  }, [n, t]);
}
function on(e, t) {
  const n = pe(t);
  ge(() => {
    let r = 0;
    if (e) {
      const o = new ResizeObserver(() => {
        cancelAnimationFrame(r), r = window.requestAnimationFrame(n);
      });
      return o.observe(e), () => {
        window.cancelAnimationFrame(r), o.unobserve(e);
      };
    }
  }, [e, n]);
}
var em = Yf, Ak = jf, Ik = Xf;
const $k = l.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ R(
  em,
  {
    ref: r,
    className: k("relative overflow-hidden", e),
    ...n,
    children: [
      /* @__PURE__ */ u(Ak, { className: "h-full w-full rounded-[inherit]", children: t }),
      /* @__PURE__ */ u(tm, {}),
      /* @__PURE__ */ u(Ik, {})
    ]
  }
));
$k.displayName = em.displayName;
const tm = l.forwardRef(({ className: e, orientation: t = "vertical", ...n }, r) => /* @__PURE__ */ u(
  $s,
  {
    ref: r,
    orientation: t,
    className: k(
      "flex touch-none select-none transition-colors",
      t === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      t === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      e
    ),
    ...n,
    children: /* @__PURE__ */ u(qf, { className: "relative flex-1 rounded-full bg-border-strong" })
  }
));
tm.displayName = $s.displayName;
// @__NO_SIDE_EFFECTS__
function Wk(e) {
  const t = /* @__PURE__ */ Fk(e), n = l.forwardRef((r, o) => {
    const { children: a, ...s } = r, i = l.Children.toArray(a), c = i.find(Bk);
    if (c) {
      const d = c.props.children, m = i.map((f) => f === c ? l.Children.count(d) > 1 ? l.Children.only(null) : l.isValidElement(d) ? d.props.children : null : f);
      return /* @__PURE__ */ u(t, { ...s, ref: o, children: l.isValidElement(d) ? l.cloneElement(d, void 0, m) : null });
    }
    return /* @__PURE__ */ u(t, { ...s, ref: o, children: a });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function Fk(e) {
  const t = l.forwardRef((n, r) => {
    const { children: o, ...a } = n;
    if (l.isValidElement(o)) {
      const s = Hk(o), i = Vk(a, o.props);
      return o.type !== l.Fragment && (i.ref = r ? ke(r, s) : s), l.cloneElement(o, i);
    }
    return l.Children.count(o) > 1 ? l.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Lk = Symbol("radix.slottable");
function Bk(e) {
  return l.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Lk;
}
function Vk(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], a = t[r];
    /^on[A-Z]/.test(r) ? o && a ? n[r] = (...i) => {
      const c = a(...i);
      return o(...i), c;
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...a } : r === "className" && (n[r] = [o, a].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Hk(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var nm = Object.freeze({
  // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
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
}), Yk = "VisuallyHidden", uo = l.forwardRef(
  (e, t) => /* @__PURE__ */ u(
    L.span,
    {
      ...e,
      ref: t,
      style: { ...nm, ...e.style }
    }
  )
);
uo.displayName = Yk;
var zk = uo, jk = [" ", "Enter", "ArrowUp", "ArrowDown"], Gk = [" ", "Enter"], It = "Select", [fo, mo, Uk] = cn(It), [mn] = we(It, [
  Uk,
  xt
]), po = xt(), [Kk, Nt] = mn(It), [qk, Xk] = mn(It), rm = (e) => {
  const {
    __scopeSelect: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    value: s,
    defaultValue: i,
    onValueChange: c,
    dir: d,
    name: m,
    autoComplete: f,
    disabled: p,
    required: h,
    form: b
  } = e, g = po(t), [v, w] = l.useState(null), [y, x] = l.useState(null), [S, N] = l.useState(!1), C = wt(d), [E, T] = xe({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: It
  }), [D, A] = xe({
    prop: s,
    defaultProp: i,
    onChange: c,
    caller: It
  }), W = l.useRef(null), $ = v ? b || !!v.closest("form") : !0, [z, O] = l.useState(/* @__PURE__ */ new Set()), j = Array.from(z).map((V) => V.props.value).join(";");
  return /* @__PURE__ */ u(Yn, { ...g, children: /* @__PURE__ */ R(
    Kk,
    {
      required: h,
      scope: t,
      trigger: v,
      onTriggerChange: w,
      valueNode: y,
      onValueNodeChange: x,
      valueNodeHasChildren: S,
      onValueNodeHasChildrenChange: N,
      contentId: he(),
      value: D,
      onValueChange: A,
      open: E,
      onOpenChange: T,
      dir: C,
      triggerPointerDownPosRef: W,
      disabled: p,
      children: [
        /* @__PURE__ */ u(fo.Provider, { scope: t, children: /* @__PURE__ */ u(
          qk,
          {
            scope: e.__scopeSelect,
            onNativeOptionAdd: l.useCallback((V) => {
              O((G) => new Set(G).add(V));
            }, []),
            onNativeOptionRemove: l.useCallback((V) => {
              O((G) => {
                const B = new Set(G);
                return B.delete(V), B;
              });
            }, []),
            children: n
          }
        ) }),
        $ ? /* @__PURE__ */ R(
          Rm,
          {
            "aria-hidden": !0,
            required: h,
            tabIndex: -1,
            name: m,
            autoComplete: f,
            value: D,
            onChange: (V) => A(V.target.value),
            disabled: p,
            form: b,
            children: [
              D === void 0 ? /* @__PURE__ */ u("option", { value: "" }) : null,
              Array.from(z)
            ]
          },
          j
        ) : null
      ]
    }
  ) });
};
rm.displayName = It;
var om = "SelectTrigger", am = l.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, disabled: r = !1, ...o } = e, a = po(n), s = Nt(om, n), i = s.disabled || r, c = q(t, s.onTriggerChange), d = mo(n), m = l.useRef("touch"), [f, p, h] = Tm((g) => {
      const v = d().filter((x) => !x.disabled), w = v.find((x) => x.value === s.value), y = _m(v, g, w);
      y !== void 0 && s.onValueChange(y.value);
    }), b = (g) => {
      i || (s.onOpenChange(!0), h()), g && (s.triggerPointerDownPosRef.current = {
        x: Math.round(g.pageX),
        y: Math.round(g.pageY)
      });
    };
    return /* @__PURE__ */ u(zn, { asChild: !0, ...a, children: /* @__PURE__ */ u(
      L.button,
      {
        type: "button",
        role: "combobox",
        "aria-controls": s.contentId,
        "aria-expanded": s.open,
        "aria-required": s.required,
        "aria-autocomplete": "none",
        dir: s.dir,
        "data-state": s.open ? "open" : "closed",
        disabled: i,
        "data-disabled": i ? "" : void 0,
        "data-placeholder": Mm(s.value) ? "" : void 0,
        ...o,
        ref: c,
        onClick: _(o.onClick, (g) => {
          g.currentTarget.focus(), m.current !== "mouse" && b(g);
        }),
        onPointerDown: _(o.onPointerDown, (g) => {
          m.current = g.pointerType;
          const v = g.target;
          v.hasPointerCapture(g.pointerId) && v.releasePointerCapture(g.pointerId), g.button === 0 && g.ctrlKey === !1 && g.pointerType === "mouse" && (b(g), g.preventDefault());
        }),
        onKeyDown: _(o.onKeyDown, (g) => {
          const v = f.current !== "";
          !(g.ctrlKey || g.altKey || g.metaKey) && g.key.length === 1 && p(g.key), !(v && g.key === " ") && jk.includes(g.key) && (b(), g.preventDefault());
        })
      }
    ) });
  }
);
am.displayName = om;
var sm = "SelectValue", im = l.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: r, style: o, children: a, placeholder: s = "", ...i } = e, c = Nt(sm, n), { onValueNodeHasChildrenChange: d } = c, m = a !== void 0, f = q(t, c.onValueNodeChange);
    return ge(() => {
      d(m);
    }, [d, m]), /* @__PURE__ */ u(
      L.span,
      {
        ...i,
        ref: f,
        style: { pointerEvents: "none" },
        children: Mm(c.value) ? /* @__PURE__ */ u(ze, { children: s }) : a
      }
    );
  }
);
im.displayName = sm;
var Zk = "SelectIcon", cm = l.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, children: r, ...o } = e;
    return /* @__PURE__ */ u(L.span, { "aria-hidden": !0, ...o, ref: t, children: r || "▼" });
  }
);
cm.displayName = Zk;
var Qk = "SelectPortal", lm = (e) => /* @__PURE__ */ u(Ft, { asChild: !0, ...e });
lm.displayName = Qk;
var $t = "SelectContent", dm = l.forwardRef(
  (e, t) => {
    const n = Nt($t, e.__scopeSelect), [r, o] = l.useState();
    if (ge(() => {
      o(new DocumentFragment());
    }, []), !n.open) {
      const a = r;
      return a ? Tn.createPortal(
        /* @__PURE__ */ u(um, { scope: e.__scopeSelect, children: /* @__PURE__ */ u(fo.Slot, { scope: e.__scopeSelect, children: /* @__PURE__ */ u("div", { children: e.children }) }) }),
        a
      ) : null;
    }
    return /* @__PURE__ */ u(fm, { ...e, ref: t });
  }
);
dm.displayName = $t;
var He = 10, [um, Et] = mn($t), Jk = "SelectContentImpl", eP = /* @__PURE__ */ Wk("SelectContent.RemoveScroll"), fm = l.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: n,
      position: r = "item-aligned",
      onCloseAutoFocus: o,
      onEscapeKeyDown: a,
      onPointerDownOutside: s,
      //
      // PopperContent props
      side: i,
      sideOffset: c,
      align: d,
      alignOffset: m,
      arrowPadding: f,
      collisionBoundary: p,
      collisionPadding: h,
      sticky: b,
      hideWhenDetached: g,
      avoidCollisions: v,
      //
      ...w
    } = e, y = Nt($t, n), [x, S] = l.useState(null), [N, C] = l.useState(null), E = q(t, (F) => S(F)), [T, D] = l.useState(null), [A, W] = l.useState(
      null
    ), $ = mo(n), [z, O] = l.useState(!1), j = l.useRef(!1);
    l.useEffect(() => {
      if (x) return jr(x);
    }, [x]), Yr();
    const V = l.useCallback(
      (F) => {
        const [te, ...J] = $().map((ce) => ce.ref.current), [oe] = J.slice(-1), ie = document.activeElement;
        for (const ce of F)
          if (ce === ie || (ce == null || ce.scrollIntoView({ block: "nearest" }), ce === te && N && (N.scrollTop = 0), ce === oe && N && (N.scrollTop = N.scrollHeight), ce == null || ce.focus(), document.activeElement !== ie)) return;
      },
      [$, N]
    ), G = l.useCallback(
      () => V([T, x]),
      [V, T, x]
    );
    l.useEffect(() => {
      z && G();
    }, [z, G]);
    const { onOpenChange: B, triggerPointerDownPosRef: I } = y;
    l.useEffect(() => {
      if (x) {
        let F = { x: 0, y: 0 };
        const te = (oe) => {
          var ie, ce;
          F = {
            x: Math.abs(Math.round(oe.pageX) - (((ie = I.current) == null ? void 0 : ie.x) ?? 0)),
            y: Math.abs(Math.round(oe.pageY) - (((ce = I.current) == null ? void 0 : ce.y) ?? 0))
          };
        }, J = (oe) => {
          F.x <= 10 && F.y <= 10 ? oe.preventDefault() : x.contains(oe.target) || B(!1), document.removeEventListener("pointermove", te), I.current = null;
        };
        return I.current !== null && (document.addEventListener("pointermove", te), document.addEventListener("pointerup", J, { capture: !0, once: !0 })), () => {
          document.removeEventListener("pointermove", te), document.removeEventListener("pointerup", J, { capture: !0 });
        };
      }
    }, [x, B, I]), l.useEffect(() => {
      const F = () => B(!1);
      return window.addEventListener("blur", F), window.addEventListener("resize", F), () => {
        window.removeEventListener("blur", F), window.removeEventListener("resize", F);
      };
    }, [B]);
    const [Z, Q] = Tm((F) => {
      const te = $().filter((ie) => !ie.disabled), J = te.find((ie) => ie.ref.current === document.activeElement), oe = _m(te, F, J);
      oe && setTimeout(() => oe.ref.current.focus());
    }), M = l.useCallback(
      (F, te, J) => {
        const oe = !j.current && !J;
        (y.value !== void 0 && y.value === te || oe) && (D(F), oe && (j.current = !0));
      },
      [y.value]
    ), Y = l.useCallback(() => x == null ? void 0 : x.focus(), [x]), K = l.useCallback(
      (F, te, J) => {
        const oe = !j.current && !J;
        (y.value !== void 0 && y.value === te || oe) && W(F);
      },
      [y.value]
    ), H = r === "popper" ? ma : mm, ee = H === ma ? {
      side: i,
      sideOffset: c,
      align: d,
      alignOffset: m,
      arrowPadding: f,
      collisionBoundary: p,
      collisionPadding: h,
      sticky: b,
      hideWhenDetached: g,
      avoidCollisions: v
    } : {};
    return /* @__PURE__ */ u(
      um,
      {
        scope: n,
        content: x,
        viewport: N,
        onViewportChange: C,
        itemRefCallback: M,
        selectedItem: T,
        onItemLeave: Y,
        itemTextRefCallback: K,
        focusSelectedItem: G,
        selectedItemText: A,
        position: r,
        isPositioned: z,
        searchRef: Z,
        children: /* @__PURE__ */ u(Fn, { as: eP, allowPinchZoom: !0, children: /* @__PURE__ */ u(
          Wn,
          {
            asChild: !0,
            trapped: y.open,
            onMountAutoFocus: (F) => {
              F.preventDefault();
            },
            onUnmountAutoFocus: _(o, (F) => {
              var te;
              (te = y.trigger) == null || te.focus({ preventScroll: !0 }), F.preventDefault();
            }),
            children: /* @__PURE__ */ u(
              Wt,
              {
                asChild: !0,
                disableOutsidePointerEvents: !0,
                onEscapeKeyDown: a,
                onPointerDownOutside: s,
                onFocusOutside: (F) => F.preventDefault(),
                onDismiss: () => y.onOpenChange(!1),
                children: /* @__PURE__ */ u(
                  H,
                  {
                    role: "listbox",
                    id: y.contentId,
                    "data-state": y.open ? "open" : "closed",
                    dir: y.dir,
                    onContextMenu: (F) => F.preventDefault(),
                    ...w,
                    ...ee,
                    onPlaced: () => O(!0),
                    ref: E,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...w.style
                    },
                    onKeyDown: _(w.onKeyDown, (F) => {
                      const te = F.ctrlKey || F.altKey || F.metaKey;
                      if (F.key === "Tab" && F.preventDefault(), !te && F.key.length === 1 && Q(F.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(F.key)) {
                        let oe = $().filter((ie) => !ie.disabled).map((ie) => ie.ref.current);
                        if (["ArrowUp", "End"].includes(F.key) && (oe = oe.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(F.key)) {
                          const ie = F.target, ce = oe.indexOf(ie);
                          oe = oe.slice(ce + 1);
                        }
                        setTimeout(() => V(oe)), F.preventDefault();
                      }
                    })
                  }
                )
              }
            )
          }
        ) })
      }
    );
  }
);
fm.displayName = Jk;
var tP = "SelectItemAlignedPosition", mm = l.forwardRef((e, t) => {
  const { __scopeSelect: n, onPlaced: r, ...o } = e, a = Nt($t, n), s = Et($t, n), [i, c] = l.useState(null), [d, m] = l.useState(null), f = q(t, (E) => m(E)), p = mo(n), h = l.useRef(!1), b = l.useRef(!0), { viewport: g, selectedItem: v, selectedItemText: w, focusSelectedItem: y } = s, x = l.useCallback(() => {
    if (a.trigger && a.valueNode && i && d && g && v && w) {
      const E = a.trigger.getBoundingClientRect(), T = d.getBoundingClientRect(), D = a.valueNode.getBoundingClientRect(), A = w.getBoundingClientRect();
      if (a.dir !== "rtl") {
        const ie = A.left - T.left, ce = D.left - ie, Ee = E.left - ce, Ae = E.width + Ee, ut = Math.max(Ae, T.width), kt = window.innerWidth - He, Pt = Rn(ce, [
          He,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(He, kt - ut)
        ]);
        i.style.minWidth = Ae + "px", i.style.left = Pt + "px";
      } else {
        const ie = T.right - A.right, ce = window.innerWidth - D.right - ie, Ee = window.innerWidth - E.right - ce, Ae = E.width + Ee, ut = Math.max(Ae, T.width), kt = window.innerWidth - He, Pt = Rn(ce, [
          He,
          Math.max(He, kt - ut)
        ]);
        i.style.minWidth = Ae + "px", i.style.right = Pt + "px";
      }
      const W = p(), $ = window.innerHeight - He * 2, z = g.scrollHeight, O = window.getComputedStyle(d), j = parseInt(O.borderTopWidth, 10), V = parseInt(O.paddingTop, 10), G = parseInt(O.borderBottomWidth, 10), B = parseInt(O.paddingBottom, 10), I = j + V + z + B + G, Z = Math.min(v.offsetHeight * 5, I), Q = window.getComputedStyle(g), M = parseInt(Q.paddingTop, 10), Y = parseInt(Q.paddingBottom, 10), K = E.top + E.height / 2 - He, H = $ - K, ee = v.offsetHeight / 2, F = v.offsetTop + ee, te = j + V + F, J = I - te;
      if (te <= K) {
        const ie = W.length > 0 && v === W[W.length - 1].ref.current;
        i.style.bottom = "0px";
        const ce = d.clientHeight - g.offsetTop - g.offsetHeight, Ee = Math.max(
          H,
          ee + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (ie ? Y : 0) + ce + G
        ), Ae = te + Ee;
        i.style.height = Ae + "px";
      } else {
        const ie = W.length > 0 && v === W[0].ref.current;
        i.style.top = "0px";
        const Ee = Math.max(
          K,
          j + g.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (ie ? M : 0) + ee
        ) + J;
        i.style.height = Ee + "px", g.scrollTop = te - K + g.offsetTop;
      }
      i.style.margin = `${He}px 0`, i.style.minHeight = Z + "px", i.style.maxHeight = $ + "px", r == null || r(), requestAnimationFrame(() => h.current = !0);
    }
  }, [
    p,
    a.trigger,
    a.valueNode,
    i,
    d,
    g,
    v,
    w,
    a.dir,
    r
  ]);
  ge(() => x(), [x]);
  const [S, N] = l.useState();
  ge(() => {
    d && N(window.getComputedStyle(d).zIndex);
  }, [d]);
  const C = l.useCallback(
    (E) => {
      E && b.current === !0 && (x(), y == null || y(), b.current = !1);
    },
    [x, y]
  );
  return /* @__PURE__ */ u(
    rP,
    {
      scope: n,
      contentWrapper: i,
      shouldExpandOnScrollRef: h,
      onScrollButtonChange: C,
      children: /* @__PURE__ */ u(
        "div",
        {
          ref: c,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: S
          },
          children: /* @__PURE__ */ u(
            L.div,
            {
              ...o,
              ref: f,
              style: {
                // When we get the height of the content, it includes borders. If we were to set
                // the height without having `boxSizing: 'border-box'` it would be too big.
                boxSizing: "border-box",
                // We need to ensure the content doesn't get taller than the wrapper
                maxHeight: "100%",
                ...o.style
              }
            }
          )
        }
      )
    }
  );
});
mm.displayName = tP;
var nP = "SelectPopperPosition", ma = l.forwardRef((e, t) => {
  const {
    __scopeSelect: n,
    align: r = "start",
    collisionPadding: o = He,
    ...a
  } = e, s = po(n);
  return /* @__PURE__ */ u(
    to,
    {
      ...s,
      ...a,
      ref: t,
      align: r,
      collisionPadding: o,
      style: {
        // Ensure border-box for floating-ui calculations
        boxSizing: "border-box",
        ...a.style,
        "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-select-content-available-width": "var(--radix-popper-available-width)",
        "--radix-select-content-available-height": "var(--radix-popper-available-height)",
        "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
});
ma.displayName = nP;
var [rP, Ls] = mn($t, {}), pa = "SelectViewport", pm = l.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, nonce: r, ...o } = e, a = Et(pa, n), s = Ls(pa, n), i = q(t, a.onViewportChange), c = l.useRef(0);
    return /* @__PURE__ */ R(ze, { children: [
      /* @__PURE__ */ u(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: r
        }
      ),
      /* @__PURE__ */ u(fo.Slot, { scope: n, children: /* @__PURE__ */ u(
        L.div,
        {
          "data-radix-select-viewport": "",
          role: "presentation",
          ...o,
          ref: i,
          style: {
            // we use position: 'relative' here on the `viewport` so that when we call
            // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
            // (independent of the scrollUpButton).
            position: "relative",
            flex: 1,
            // Viewport should only be scrollable in the vertical direction.
            // This won't work in vertical writing modes, so we'll need to
            // revisit this if/when that is supported
            // https://developer.chrome.com/blog/vertical-form-controls
            overflow: "hidden auto",
            ...o.style
          },
          onScroll: _(o.onScroll, (d) => {
            const m = d.currentTarget, { contentWrapper: f, shouldExpandOnScrollRef: p } = s;
            if (p != null && p.current && f) {
              const h = Math.abs(c.current - m.scrollTop);
              if (h > 0) {
                const b = window.innerHeight - He * 2, g = parseFloat(f.style.minHeight), v = parseFloat(f.style.height), w = Math.max(g, v);
                if (w < b) {
                  const y = w + h, x = Math.min(b, y), S = y - x;
                  f.style.height = x + "px", f.style.bottom === "0px" && (m.scrollTop = S > 0 ? S : 0, f.style.justifyContent = "flex-end");
                }
              }
            }
            c.current = m.scrollTop;
          })
        }
      ) })
    ] });
  }
);
pm.displayName = pa;
var hm = "SelectGroup", [oP, aP] = mn(hm), gm = l.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = he();
    return /* @__PURE__ */ u(oP, { scope: n, id: o, children: /* @__PURE__ */ u(L.div, { role: "group", "aria-labelledby": o, ...r, ref: t }) });
  }
);
gm.displayName = hm;
var vm = "SelectLabel", bm = l.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = aP(vm, n);
    return /* @__PURE__ */ u(L.div, { id: o.id, ...r, ref: t });
  }
);
bm.displayName = vm;
var Dr = "SelectItem", [sP, ym] = mn(Dr), wm = l.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: n,
      value: r,
      disabled: o = !1,
      textValue: a,
      ...s
    } = e, i = Nt(Dr, n), c = Et(Dr, n), d = i.value === r, [m, f] = l.useState(a ?? ""), [p, h] = l.useState(!1), b = q(
      t,
      (y) => {
        var x;
        return (x = c.itemRefCallback) == null ? void 0 : x.call(c, y, r, o);
      }
    ), g = he(), v = l.useRef("touch"), w = () => {
      o || (i.onValueChange(r), i.onOpenChange(!1));
    };
    if (r === "")
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    return /* @__PURE__ */ u(
      sP,
      {
        scope: n,
        value: r,
        disabled: o,
        textId: g,
        isSelected: d,
        onItemTextChange: l.useCallback((y) => {
          f((x) => x || ((y == null ? void 0 : y.textContent) ?? "").trim());
        }, []),
        children: /* @__PURE__ */ u(
          fo.ItemSlot,
          {
            scope: n,
            value: r,
            disabled: o,
            textValue: m,
            children: /* @__PURE__ */ u(
              L.div,
              {
                role: "option",
                "aria-labelledby": g,
                "data-highlighted": p ? "" : void 0,
                "aria-selected": d && p,
                "data-state": d ? "checked" : "unchecked",
                "aria-disabled": o || void 0,
                "data-disabled": o ? "" : void 0,
                tabIndex: o ? void 0 : -1,
                ...s,
                ref: b,
                onFocus: _(s.onFocus, () => h(!0)),
                onBlur: _(s.onBlur, () => h(!1)),
                onClick: _(s.onClick, () => {
                  v.current !== "mouse" && w();
                }),
                onPointerUp: _(s.onPointerUp, () => {
                  v.current === "mouse" && w();
                }),
                onPointerDown: _(s.onPointerDown, (y) => {
                  v.current = y.pointerType;
                }),
                onPointerMove: _(s.onPointerMove, (y) => {
                  var x;
                  v.current = y.pointerType, o ? (x = c.onItemLeave) == null || x.call(c) : v.current === "mouse" && y.currentTarget.focus({ preventScroll: !0 });
                }),
                onPointerLeave: _(s.onPointerLeave, (y) => {
                  var x;
                  y.currentTarget === document.activeElement && ((x = c.onItemLeave) == null || x.call(c));
                }),
                onKeyDown: _(s.onKeyDown, (y) => {
                  var S;
                  ((S = c.searchRef) == null ? void 0 : S.current) !== "" && y.key === " " || (Gk.includes(y.key) && w(), y.key === " " && y.preventDefault());
                })
              }
            )
          }
        )
      }
    );
  }
);
wm.displayName = Dr;
var xn = "SelectItemText", xm = l.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: r, style: o, ...a } = e, s = Nt(xn, n), i = Et(xn, n), c = ym(xn, n), d = Xk(xn, n), [m, f] = l.useState(null), p = q(
      t,
      (w) => f(w),
      c.onItemTextChange,
      (w) => {
        var y;
        return (y = i.itemTextRefCallback) == null ? void 0 : y.call(i, w, c.value, c.disabled);
      }
    ), h = m == null ? void 0 : m.textContent, b = l.useMemo(
      () => /* @__PURE__ */ u("option", { value: c.value, disabled: c.disabled, children: h }, c.value),
      [c.disabled, c.value, h]
    ), { onNativeOptionAdd: g, onNativeOptionRemove: v } = d;
    return ge(() => (g(b), () => v(b)), [g, v, b]), /* @__PURE__ */ R(ze, { children: [
      /* @__PURE__ */ u(L.span, { id: c.textId, ...a, ref: p }),
      c.isSelected && s.valueNode && !s.valueNodeHasChildren ? Tn.createPortal(a.children, s.valueNode) : null
    ] });
  }
);
xm.displayName = xn;
var Sm = "SelectItemIndicator", Cm = l.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e;
    return ym(Sm, n).isSelected ? /* @__PURE__ */ u(L.span, { "aria-hidden": !0, ...r, ref: t }) : null;
  }
);
Cm.displayName = Sm;
var ha = "SelectScrollUpButton", Nm = l.forwardRef((e, t) => {
  const n = Et(ha, e.__scopeSelect), r = Ls(ha, e.__scopeSelect), [o, a] = l.useState(!1), s = q(t, r.onScrollButtonChange);
  return ge(() => {
    if (n.viewport && n.isPositioned) {
      let i = function() {
        const d = c.scrollTop > 0;
        a(d);
      };
      const c = n.viewport;
      return i(), c.addEventListener("scroll", i), () => c.removeEventListener("scroll", i);
    }
  }, [n.viewport, n.isPositioned]), o ? /* @__PURE__ */ u(
    km,
    {
      ...e,
      ref: s,
      onAutoScroll: () => {
        const { viewport: i, selectedItem: c } = n;
        i && c && (i.scrollTop = i.scrollTop - c.offsetHeight);
      }
    }
  ) : null;
});
Nm.displayName = ha;
var ga = "SelectScrollDownButton", Em = l.forwardRef((e, t) => {
  const n = Et(ga, e.__scopeSelect), r = Ls(ga, e.__scopeSelect), [o, a] = l.useState(!1), s = q(t, r.onScrollButtonChange);
  return ge(() => {
    if (n.viewport && n.isPositioned) {
      let i = function() {
        const d = c.scrollHeight - c.clientHeight, m = Math.ceil(c.scrollTop) < d;
        a(m);
      };
      const c = n.viewport;
      return i(), c.addEventListener("scroll", i), () => c.removeEventListener("scroll", i);
    }
  }, [n.viewport, n.isPositioned]), o ? /* @__PURE__ */ u(
    km,
    {
      ...e,
      ref: s,
      onAutoScroll: () => {
        const { viewport: i, selectedItem: c } = n;
        i && c && (i.scrollTop = i.scrollTop + c.offsetHeight);
      }
    }
  ) : null;
});
Em.displayName = ga;
var km = l.forwardRef((e, t) => {
  const { __scopeSelect: n, onAutoScroll: r, ...o } = e, a = Et("SelectScrollButton", n), s = l.useRef(null), i = mo(n), c = l.useCallback(() => {
    s.current !== null && (window.clearInterval(s.current), s.current = null);
  }, []);
  return l.useEffect(() => () => c(), [c]), ge(() => {
    var m;
    const d = i().find((f) => f.ref.current === document.activeElement);
    (m = d == null ? void 0 : d.ref.current) == null || m.scrollIntoView({ block: "nearest" });
  }, [i]), /* @__PURE__ */ u(
    L.div,
    {
      "aria-hidden": !0,
      ...o,
      ref: t,
      style: { flexShrink: 0, ...o.style },
      onPointerDown: _(o.onPointerDown, () => {
        s.current === null && (s.current = window.setInterval(r, 50));
      }),
      onPointerMove: _(o.onPointerMove, () => {
        var d;
        (d = a.onItemLeave) == null || d.call(a), s.current === null && (s.current = window.setInterval(r, 50));
      }),
      onPointerLeave: _(o.onPointerLeave, () => {
        c();
      })
    }
  );
}), iP = "SelectSeparator", Pm = l.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e;
    return /* @__PURE__ */ u(L.div, { "aria-hidden": !0, ...r, ref: t });
  }
);
Pm.displayName = iP;
var va = "SelectArrow", cP = l.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = po(n), a = Nt(va, n), s = Et(va, n);
    return a.open && s.position === "popper" ? /* @__PURE__ */ u(no, { ...o, ...r, ref: t }) : null;
  }
);
cP.displayName = va;
var lP = "SelectBubbleInput", Rm = l.forwardRef(
  ({ __scopeSelect: e, value: t, ...n }, r) => {
    const o = l.useRef(null), a = q(r, o), s = In(t);
    return l.useEffect(() => {
      const i = o.current;
      if (!i) return;
      const c = window.HTMLSelectElement.prototype, m = Object.getOwnPropertyDescriptor(
        c,
        "value"
      ).set;
      if (s !== t && m) {
        const f = new Event("change", { bubbles: !0 });
        m.call(i, t), i.dispatchEvent(f);
      }
    }, [s, t]), /* @__PURE__ */ u(
      L.select,
      {
        ...n,
        style: { ...nm, ...n.style },
        ref: a,
        defaultValue: t
      }
    );
  }
);
Rm.displayName = lP;
function Mm(e) {
  return e === "" || e === void 0;
}
function Tm(e) {
  const t = pe(e), n = l.useRef(""), r = l.useRef(0), o = l.useCallback(
    (s) => {
      const i = n.current + s;
      t(i), function c(d) {
        n.current = d, window.clearTimeout(r.current), d !== "" && (r.current = window.setTimeout(() => c(""), 1e3));
      }(i);
    },
    [t]
  ), a = l.useCallback(() => {
    n.current = "", window.clearTimeout(r.current);
  }, []);
  return l.useEffect(() => () => window.clearTimeout(r.current), []), [n, o, a];
}
function _m(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((d) => d === t[0]) ? t[0] : t, a = n ? e.indexOf(n) : -1;
  let s = dP(e, Math.max(a, 0));
  o.length === 1 && (s = s.filter((d) => d !== n));
  const c = s.find(
    (d) => d.textValue.toLowerCase().startsWith(o.toLowerCase())
  );
  return c !== n ? c : void 0;
}
function dP(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var uP = rm, Dm = am, fP = im, mP = cm, pP = lm, Om = dm, hP = pm, gP = gm, Am = bm, Im = wm, vP = xm, bP = Cm, $m = Nm, Wm = Em, Fm = Pm;
const ec = uP, BM = gP, tc = fP, ba = l.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ R(
  Dm,
  {
    ref: r,
    className: k(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      e
    ),
    ...n,
    children: [
      t,
      /* @__PURE__ */ u(mP, { asChild: !0, children: /* @__PURE__ */ u(Wr, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
ba.displayName = Dm.displayName;
const Lm = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  $m,
  {
    ref: n,
    className: k(
      "flex cursor-default items-center justify-center py-1",
      e
    ),
    ...t,
    children: /* @__PURE__ */ u(Jg, { className: "h-4 w-4" })
  }
));
Lm.displayName = $m.displayName;
const Bm = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  Wm,
  {
    ref: n,
    className: k(
      "flex cursor-default items-center justify-center py-1",
      e
    ),
    ...t,
    children: /* @__PURE__ */ u(Wr, { className: "h-4 w-4" })
  }
));
Bm.displayName = Wm.displayName;
const ya = l.forwardRef(({ className: e, children: t, position: n = "popper", ...r }, o) => /* @__PURE__ */ u(pP, { children: /* @__PURE__ */ R(
  Om,
  {
    ref: o,
    className: k(
      "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",
      n === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      e
    ),
    position: n,
    ...r,
    children: [
      /* @__PURE__ */ u(Lm, {}),
      /* @__PURE__ */ u(
        hP,
        {
          className: k(
            "p-1",
            n === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ u(Bm, {})
    ]
  }
) }));
ya.displayName = Om.displayName;
const yP = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  Am,
  {
    ref: n,
    className: k("px-2 py-1.5 text-sm font-semibold", e),
    ...t
  }
));
yP.displayName = Am.displayName;
const Ve = l.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ R(
  Im,
  {
    ref: r,
    className: k(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ u("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ u(bP, { children: /* @__PURE__ */ u($r, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ u(vP, { children: t })
    ]
  }
));
Ve.displayName = Im.displayName;
const wP = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  Fm,
  {
    ref: n,
    className: k("-mx-1 my-1 h-px bg-muted", e),
    ...t
  }
));
wP.displayName = Fm.displayName;
var xP = [
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
], SP = xP.reduce((e, t) => {
  const n = /* @__PURE__ */ _n(`Primitive.${t}`), r = l.forwardRef((o, a) => {
    const { asChild: s, ...i } = o, c = s ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ u(c, { ...i, ref: a });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {}), CP = "Separator", nc = "horizontal", NP = ["horizontal", "vertical"], Vm = l.forwardRef((e, t) => {
  const { decorative: n, orientation: r = nc, ...o } = e, a = EP(r) ? r : nc, i = n ? { role: "none" } : { "aria-orientation": a === "vertical" ? a : void 0, role: "separator" };
  return /* @__PURE__ */ u(
    SP.div,
    {
      "data-orientation": a,
      ...i,
      ...o,
      ref: t
    }
  );
});
Vm.displayName = CP;
function EP(e) {
  return NP.includes(e);
}
var Hm = Vm;
const Ym = l.forwardRef(({ className: e, orientation: t = "horizontal", decorative: n = !0, ...r }, o) => /* @__PURE__ */ u(
  Hm,
  {
    ref: o,
    decorative: n,
    orientation: t,
    className: k(
      "shrink-0 bg-border-subtle",
      t === "horizontal" ? "h-px w-full" : "h-full w-px",
      e
    ),
    ...r
  }
));
Ym.displayName = Hm.displayName;
const VM = ts, HM = ld, YM = qr, kP = ns, zm = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  Ln,
  {
    className: k(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      e
    ),
    ...t,
    ref: n
  }
));
zm.displayName = Ln.displayName;
const PP = Fe(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
), RP = l.forwardRef(({ side: e = "right", className: t, children: n, ...r }, o) => /* @__PURE__ */ R(kP, { children: [
  /* @__PURE__ */ u(zm, {}),
  /* @__PURE__ */ R(
    Bn,
    {
      ref: o,
      className: k(PP({ side: e }), t),
      ...r,
      children: [
        /* @__PURE__ */ R(qr, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
          /* @__PURE__ */ u(Lr, { className: "h-4 w-4" }),
          /* @__PURE__ */ u("span", { className: "sr-only", children: "Close" })
        ] }),
        n
      ]
    }
  )
] }));
RP.displayName = Bn.displayName;
const MP = ({
  className: e,
  ...t
}) => /* @__PURE__ */ u(
  "div",
  {
    className: k(
      "flex flex-col space-y-2 text-center sm:text-left",
      e
    ),
    ...t
  }
);
MP.displayName = "SheetHeader";
const TP = ({
  className: e,
  ...t
}) => /* @__PURE__ */ u(
  "div",
  {
    className: k(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      e
    ),
    ...t
  }
);
TP.displayName = "SheetFooter";
const _P = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  Ur,
  {
    ref: n,
    className: k("text-lg font-semibold text-foreground", e),
    ...t
  }
));
_P.displayName = Ur.displayName;
const DP = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  Kr,
  {
    ref: n,
    className: k("text-sm text-muted-foreground", e),
    ...t
  }
));
DP.displayName = Kr.displayName;
function ar({ className: e, ...t }) {
  return /* @__PURE__ */ u(
    "div",
    {
      className: k("animate-shimmer rounded-md bg-border-subtle", e),
      style: {
        backgroundImage: "linear-gradient(90deg, hsl(var(--warm-200-hsl)) 25%, hsl(var(--warm-100-hsl)) 50%, hsl(var(--warm-200-hsl)) 75%)",
        backgroundSize: "1000px 100%"
      },
      "aria-busy": "true",
      "aria-label": "Loading...",
      ...t
    }
  );
}
var jm = ["PageUp", "PageDown"], Gm = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], Um = {
  "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
  "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"]
}, pn = "Slider", [wa, OP, AP] = cn(pn), [Km] = we(pn, [
  AP
]), [IP, ho] = Km(pn), qm = l.forwardRef(
  (e, t) => {
    const {
      name: n,
      min: r = 0,
      max: o = 100,
      step: a = 1,
      orientation: s = "horizontal",
      disabled: i = !1,
      minStepsBetweenThumbs: c = 0,
      defaultValue: d = [r],
      value: m,
      onValueChange: f = () => {
      },
      onValueCommit: p = () => {
      },
      inverted: h = !1,
      form: b,
      ...g
    } = e, v = l.useRef(/* @__PURE__ */ new Set()), w = l.useRef(0), x = s === "horizontal" ? $P : WP, [S = [], N] = xe({
      prop: m,
      defaultProp: d,
      onChange: (W) => {
        var z;
        (z = [...v.current][w.current]) == null || z.focus(), f(W);
      }
    }), C = l.useRef(S);
    function E(W) {
      const $ = HP(S, W);
      A(W, $);
    }
    function T(W) {
      A(W, w.current);
    }
    function D() {
      const W = C.current[w.current];
      S[w.current] !== W && p(S);
    }
    function A(W, $, { commit: z } = { commit: !1 }) {
      const O = GP(a), j = UP(Math.round((W - r) / a) * a + r, O), V = Rn(j, [r, o]);
      N((G = []) => {
        const B = BP(G, V, $);
        if (jP(B, c * a)) {
          w.current = B.indexOf(V);
          const I = String(B) !== String(G);
          return I && z && p(B), I ? B : G;
        } else
          return G;
      });
    }
    return /* @__PURE__ */ u(
      IP,
      {
        scope: e.__scopeSlider,
        name: n,
        disabled: i,
        min: r,
        max: o,
        valueIndexToChangeRef: w,
        thumbs: v.current,
        values: S,
        orientation: s,
        form: b,
        children: /* @__PURE__ */ u(wa.Provider, { scope: e.__scopeSlider, children: /* @__PURE__ */ u(wa.Slot, { scope: e.__scopeSlider, children: /* @__PURE__ */ u(
          x,
          {
            "aria-disabled": i,
            "data-disabled": i ? "" : void 0,
            ...g,
            ref: t,
            onPointerDown: _(g.onPointerDown, () => {
              i || (C.current = S);
            }),
            min: r,
            max: o,
            inverted: h,
            onSlideStart: i ? void 0 : E,
            onSlideMove: i ? void 0 : T,
            onSlideEnd: i ? void 0 : D,
            onHomeKeyDown: () => !i && A(r, 0, { commit: !0 }),
            onEndKeyDown: () => !i && A(o, S.length - 1, { commit: !0 }),
            onStepKeyDown: ({ event: W, direction: $ }) => {
              if (!i) {
                const j = jm.includes(W.key) || W.shiftKey && Gm.includes(W.key) ? 10 : 1, V = w.current, G = S[V], B = a * j * $;
                A(G + B, V, { commit: !0 });
              }
            }
          }
        ) }) })
      }
    );
  }
);
qm.displayName = pn;
var [Xm, Zm] = Km(pn, {
  startEdge: "left",
  endEdge: "right",
  size: "width",
  direction: 1
}), $P = l.forwardRef(
  (e, t) => {
    const {
      min: n,
      max: r,
      dir: o,
      inverted: a,
      onSlideStart: s,
      onSlideMove: i,
      onSlideEnd: c,
      onStepKeyDown: d,
      ...m
    } = e, [f, p] = l.useState(null), h = q(t, (x) => p(x)), b = l.useRef(void 0), g = wt(o), v = g === "ltr", w = v && !a || !v && a;
    function y(x) {
      const S = b.current || f.getBoundingClientRect(), N = [0, S.width], E = Bs(N, w ? [n, r] : [r, n]);
      return b.current = S, E(x - S.left);
    }
    return /* @__PURE__ */ u(
      Xm,
      {
        scope: e.__scopeSlider,
        startEdge: w ? "left" : "right",
        endEdge: w ? "right" : "left",
        direction: w ? 1 : -1,
        size: "width",
        children: /* @__PURE__ */ u(
          Qm,
          {
            dir: g,
            "data-orientation": "horizontal",
            ...m,
            ref: h,
            style: {
              ...m.style,
              "--radix-slider-thumb-transform": "translateX(-50%)"
            },
            onSlideStart: (x) => {
              const S = y(x.clientX);
              s == null || s(S);
            },
            onSlideMove: (x) => {
              const S = y(x.clientX);
              i == null || i(S);
            },
            onSlideEnd: () => {
              b.current = void 0, c == null || c();
            },
            onStepKeyDown: (x) => {
              const N = Um[w ? "from-left" : "from-right"].includes(x.key);
              d == null || d({ event: x, direction: N ? -1 : 1 });
            }
          }
        )
      }
    );
  }
), WP = l.forwardRef(
  (e, t) => {
    const {
      min: n,
      max: r,
      inverted: o,
      onSlideStart: a,
      onSlideMove: s,
      onSlideEnd: i,
      onStepKeyDown: c,
      ...d
    } = e, m = l.useRef(null), f = q(t, m), p = l.useRef(void 0), h = !o;
    function b(g) {
      const v = p.current || m.current.getBoundingClientRect(), w = [0, v.height], x = Bs(w, h ? [r, n] : [n, r]);
      return p.current = v, x(g - v.top);
    }
    return /* @__PURE__ */ u(
      Xm,
      {
        scope: e.__scopeSlider,
        startEdge: h ? "bottom" : "top",
        endEdge: h ? "top" : "bottom",
        size: "height",
        direction: h ? 1 : -1,
        children: /* @__PURE__ */ u(
          Qm,
          {
            "data-orientation": "vertical",
            ...d,
            ref: f,
            style: {
              ...d.style,
              "--radix-slider-thumb-transform": "translateY(50%)"
            },
            onSlideStart: (g) => {
              const v = b(g.clientY);
              a == null || a(v);
            },
            onSlideMove: (g) => {
              const v = b(g.clientY);
              s == null || s(v);
            },
            onSlideEnd: () => {
              p.current = void 0, i == null || i();
            },
            onStepKeyDown: (g) => {
              const w = Um[h ? "from-bottom" : "from-top"].includes(g.key);
              c == null || c({ event: g, direction: w ? -1 : 1 });
            }
          }
        )
      }
    );
  }
), Qm = l.forwardRef(
  (e, t) => {
    const {
      __scopeSlider: n,
      onSlideStart: r,
      onSlideMove: o,
      onSlideEnd: a,
      onHomeKeyDown: s,
      onEndKeyDown: i,
      onStepKeyDown: c,
      ...d
    } = e, m = ho(pn, n);
    return /* @__PURE__ */ u(
      L.span,
      {
        ...d,
        ref: t,
        onKeyDown: _(e.onKeyDown, (f) => {
          f.key === "Home" ? (s(f), f.preventDefault()) : f.key === "End" ? (i(f), f.preventDefault()) : jm.concat(Gm).includes(f.key) && (c(f), f.preventDefault());
        }),
        onPointerDown: _(e.onPointerDown, (f) => {
          const p = f.target;
          p.setPointerCapture(f.pointerId), f.preventDefault(), m.thumbs.has(p) ? p.focus() : r(f);
        }),
        onPointerMove: _(e.onPointerMove, (f) => {
          f.target.hasPointerCapture(f.pointerId) && o(f);
        }),
        onPointerUp: _(e.onPointerUp, (f) => {
          const p = f.target;
          p.hasPointerCapture(f.pointerId) && (p.releasePointerCapture(f.pointerId), a(f));
        })
      }
    );
  }
), Jm = "SliderTrack", ep = l.forwardRef(
  (e, t) => {
    const { __scopeSlider: n, ...r } = e, o = ho(Jm, n);
    return /* @__PURE__ */ u(
      L.span,
      {
        "data-disabled": o.disabled ? "" : void 0,
        "data-orientation": o.orientation,
        ...r,
        ref: t
      }
    );
  }
);
ep.displayName = Jm;
var xa = "SliderRange", tp = l.forwardRef(
  (e, t) => {
    const { __scopeSlider: n, ...r } = e, o = ho(xa, n), a = Zm(xa, n), s = l.useRef(null), i = q(t, s), c = o.values.length, d = o.values.map(
      (p) => op(p, o.min, o.max)
    ), m = c > 1 ? Math.min(...d) : 0, f = 100 - Math.max(...d);
    return /* @__PURE__ */ u(
      L.span,
      {
        "data-orientation": o.orientation,
        "data-disabled": o.disabled ? "" : void 0,
        ...r,
        ref: i,
        style: {
          ...e.style,
          [a.startEdge]: m + "%",
          [a.endEdge]: f + "%"
        }
      }
    );
  }
);
tp.displayName = xa;
var Sa = "SliderThumb", np = l.forwardRef(
  (e, t) => {
    const n = OP(e.__scopeSlider), [r, o] = l.useState(null), a = q(t, (i) => o(i)), s = l.useMemo(
      () => r ? n().findIndex((i) => i.ref.current === r) : -1,
      [n, r]
    );
    return /* @__PURE__ */ u(FP, { ...e, ref: a, index: s });
  }
), FP = l.forwardRef(
  (e, t) => {
    const { __scopeSlider: n, index: r, name: o, ...a } = e, s = ho(Sa, n), i = Zm(Sa, n), [c, d] = l.useState(null), m = q(t, (y) => d(y)), f = c ? s.form || !!c.closest("form") : !0, p = $n(c), h = s.values[r], b = h === void 0 ? 0 : op(h, s.min, s.max), g = VP(r, s.values.length), v = p == null ? void 0 : p[i.size], w = v ? YP(v, b, i.direction) : 0;
    return l.useEffect(() => {
      if (c)
        return s.thumbs.add(c), () => {
          s.thumbs.delete(c);
        };
    }, [c, s.thumbs]), /* @__PURE__ */ R(
      "span",
      {
        style: {
          transform: "var(--radix-slider-thumb-transform)",
          position: "absolute",
          [i.startEdge]: `calc(${b}% + ${w}px)`
        },
        children: [
          /* @__PURE__ */ u(wa.ItemSlot, { scope: e.__scopeSlider, children: /* @__PURE__ */ u(
            L.span,
            {
              role: "slider",
              "aria-label": e["aria-label"] || g,
              "aria-valuemin": s.min,
              "aria-valuenow": h,
              "aria-valuemax": s.max,
              "aria-orientation": s.orientation,
              "data-orientation": s.orientation,
              "data-disabled": s.disabled ? "" : void 0,
              tabIndex: s.disabled ? void 0 : 0,
              ...a,
              ref: m,
              style: h === void 0 ? { display: "none" } : e.style,
              onFocus: _(e.onFocus, () => {
                s.valueIndexToChangeRef.current = r;
              })
            }
          ) }),
          f && /* @__PURE__ */ u(
            rp,
            {
              name: o ?? (s.name ? s.name + (s.values.length > 1 ? "[]" : "") : void 0),
              form: s.form,
              value: h
            },
            r
          )
        ]
      }
    );
  }
);
np.displayName = Sa;
var LP = "RadioBubbleInput", rp = l.forwardRef(
  ({ __scopeSlider: e, value: t, ...n }, r) => {
    const o = l.useRef(null), a = q(o, r), s = In(t);
    return l.useEffect(() => {
      const i = o.current;
      if (!i) return;
      const c = window.HTMLInputElement.prototype, m = Object.getOwnPropertyDescriptor(c, "value").set;
      if (s !== t && m) {
        const f = new Event("input", { bubbles: !0 });
        m.call(i, t), i.dispatchEvent(f);
      }
    }, [s, t]), /* @__PURE__ */ u(
      L.input,
      {
        style: { display: "none" },
        ...n,
        ref: a,
        defaultValue: t
      }
    );
  }
);
rp.displayName = LP;
function BP(e = [], t, n) {
  const r = [...e];
  return r[n] = t, r.sort((o, a) => o - a);
}
function op(e, t, n) {
  const a = 100 / (n - t) * (e - t);
  return Rn(a, [0, 100]);
}
function VP(e, t) {
  return t > 2 ? `Value ${e + 1} of ${t}` : t === 2 ? ["Minimum", "Maximum"][e] : void 0;
}
function HP(e, t) {
  if (e.length === 1) return 0;
  const n = e.map((o) => Math.abs(o - t)), r = Math.min(...n);
  return n.indexOf(r);
}
function YP(e, t, n) {
  const r = e / 2, a = Bs([0, 50], [0, r]);
  return (r - a(t) * n) * n;
}
function zP(e) {
  return e.slice(0, -1).map((t, n) => e[n + 1] - t);
}
function jP(e, t) {
  if (t > 0) {
    const n = zP(e);
    return Math.min(...n) >= t;
  }
  return !0;
}
function Bs(e, t) {
  return (n) => {
    if (e[0] === e[1] || t[0] === t[1]) return t[0];
    const r = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + r * (n - e[0]);
  };
}
function GP(e) {
  return (String(e).split(".")[1] || "").length;
}
function UP(e, t) {
  const n = Math.pow(10, t);
  return Math.round(e * n) / n;
}
var ap = qm, KP = ep, qP = tp, XP = np;
const ZP = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ R(
  ap,
  {
    ref: n,
    className: k("relative flex w-full touch-none select-none items-center", e),
    ...t,
    children: [
      /* @__PURE__ */ u(KP, { className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-border-default", children: /* @__PURE__ */ u(qP, { className: "absolute h-full bg-primary" }) }),
      (t.value ?? t.defaultValue ?? [0]).map((r, o) => /* @__PURE__ */ u(
        XP,
        {
          className: k(
            "block h-4 w-4 rounded-full border border-primary/50 bg-surface-raised shadow-elevation-2",
            "ring-offset-background transition-all duration-fast",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:pointer-events-none disabled:opacity-50",
            "hover:shadow-elevation-3 hover:scale-110"
          )
        },
        o
      ))
    ]
  }
));
ZP.displayName = ap.displayName;
const QP = Fe("animate-spin rounded-full border-current", {
  variants: {
    size: {
      xs: "h-3 w-3 border-[1.5px]",
      sm: "h-4 w-4 border-2",
      default: "h-5 w-5 border-2",
      lg: "h-6 w-6 border-[2.5px]",
      xl: "h-8 w-8 border-[3px]"
    }
  },
  defaultVariants: { size: "default" }
});
function JP({ size: e, className: t, label: n = "Loading..." }) {
  return /* @__PURE__ */ u(
    "div",
    {
      role: "status",
      "aria-label": n,
      className: k(QP({ size: e }), "border-t-transparent", t)
    }
  );
}
const eR = Fe(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
        // BPS Specific Workflow Statuses
        draft: "border-transparent bg-muted text-muted-foreground",
        pending: "border-transparent bg-warning-bg text-warning",
        revised: "border-transparent bg-info-bg text-info",
        approved: "border-transparent bg-success-bg text-success"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function tR({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ u("div", { className: k(eR({ variant: t }), e), ...n });
}
var go = "Switch", [nR] = we(go), [rR, oR] = nR(go), sp = l.forwardRef(
  (e, t) => {
    const {
      __scopeSwitch: n,
      name: r,
      checked: o,
      defaultChecked: a,
      required: s,
      disabled: i,
      value: c = "on",
      onCheckedChange: d,
      form: m,
      ...f
    } = e, [p, h] = l.useState(null), b = q(t, (x) => h(x)), g = l.useRef(!1), v = p ? m || !!p.closest("form") : !0, [w, y] = xe({
      prop: o,
      defaultProp: a ?? !1,
      onChange: d,
      caller: go
    });
    return /* @__PURE__ */ R(rR, { scope: n, checked: w, disabled: i, children: [
      /* @__PURE__ */ u(
        L.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": w,
          "aria-required": s,
          "data-state": dp(w),
          "data-disabled": i ? "" : void 0,
          disabled: i,
          value: c,
          ...f,
          ref: b,
          onClick: _(e.onClick, (x) => {
            y((S) => !S), v && (g.current = x.isPropagationStopped(), g.current || x.stopPropagation());
          })
        }
      ),
      v && /* @__PURE__ */ u(
        lp,
        {
          control: p,
          bubbles: !g.current,
          name: r,
          value: c,
          checked: w,
          required: s,
          disabled: i,
          form: m,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
sp.displayName = go;
var ip = "SwitchThumb", cp = l.forwardRef(
  (e, t) => {
    const { __scopeSwitch: n, ...r } = e, o = oR(ip, n);
    return /* @__PURE__ */ u(
      L.span,
      {
        "data-state": dp(o.checked),
        "data-disabled": o.disabled ? "" : void 0,
        ...r,
        ref: t
      }
    );
  }
);
cp.displayName = ip;
var aR = "SwitchBubbleInput", lp = l.forwardRef(
  ({
    __scopeSwitch: e,
    control: t,
    checked: n,
    bubbles: r = !0,
    ...o
  }, a) => {
    const s = l.useRef(null), i = q(s, a), c = In(n), d = $n(t);
    return l.useEffect(() => {
      const m = s.current;
      if (!m) return;
      const f = window.HTMLInputElement.prototype, h = Object.getOwnPropertyDescriptor(
        f,
        "checked"
      ).set;
      if (c !== n && h) {
        const b = new Event("click", { bubbles: r });
        h.call(m, n), m.dispatchEvent(b);
      }
    }, [c, n, r]), /* @__PURE__ */ u(
      "input",
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: n,
        ...o,
        tabIndex: -1,
        ref: i,
        style: {
          ...o.style,
          ...d,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
lp.displayName = aR;
function dp(e) {
  return e ? "checked" : "unchecked";
}
var up = sp, sR = cp;
const iR = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  up,
  {
    ref: n,
    className: k(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
      "bg-border-strong transition-colors duration-base ease-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-primary",
      e
    ),
    ...t,
    children: /* @__PURE__ */ u(
      sR,
      {
        className: k(
          "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-elevation-1",
          "ring-0 transition-transform duration-base ease-spring",
          "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
iR.displayName = up.displayName;
const cR = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ u(
  "table",
  {
    ref: n,
    className: k("w-full caption-bottom text-sm", e),
    ...t
  }
) }));
cR.displayName = "Table";
const lR = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u("thead", { ref: n, className: k("[&_tr]:border-b", e), ...t }));
lR.displayName = "TableHeader";
const dR = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  "tbody",
  {
    ref: n,
    className: k("[&_tr:last-child]:border-0", e),
    ...t
  }
));
dR.displayName = "TableBody";
const uR = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  "tfoot",
  {
    ref: n,
    className: k(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      e
    ),
    ...t
  }
));
uR.displayName = "TableFooter";
const fR = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  "tr",
  {
    ref: n,
    className: k(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      e
    ),
    ...t
  }
));
fR.displayName = "TableRow";
const mR = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  "th",
  {
    ref: n,
    className: k(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      e
    ),
    ...t
  }
));
mR.displayName = "TableHead";
const pR = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  "td",
  {
    ref: n,
    className: k(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      e
    ),
    ...t
  }
));
pR.displayName = "TableCell";
const hR = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  "caption",
  {
    ref: n,
    className: k("mt-4 text-sm text-muted-foreground", e),
    ...t
  }
));
hR.displayName = "TableCaption";
var vo = "Tabs", [gR] = we(vo, [
  fn
]), fp = fn(), [vR, Vs] = gR(vo), mp = l.forwardRef(
  (e, t) => {
    const {
      __scopeTabs: n,
      value: r,
      onValueChange: o,
      defaultValue: a,
      orientation: s = "horizontal",
      dir: i,
      activationMode: c = "automatic",
      ...d
    } = e, m = wt(i), [f, p] = xe({
      prop: r,
      onChange: o,
      defaultProp: a ?? "",
      caller: vo
    });
    return /* @__PURE__ */ u(
      vR,
      {
        scope: n,
        baseId: he(),
        value: f,
        onValueChange: p,
        orientation: s,
        dir: m,
        activationMode: c,
        children: /* @__PURE__ */ u(
          L.div,
          {
            dir: m,
            "data-orientation": s,
            ...d,
            ref: t
          }
        )
      }
    );
  }
);
mp.displayName = vo;
var pp = "TabsList", hp = l.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, loop: r = !0, ...o } = e, a = Vs(pp, n), s = fp(n);
    return /* @__PURE__ */ u(
      ps,
      {
        asChild: !0,
        ...s,
        orientation: a.orientation,
        dir: a.dir,
        loop: r,
        children: /* @__PURE__ */ u(
          L.div,
          {
            role: "tablist",
            "aria-orientation": a.orientation,
            ...o,
            ref: t
          }
        )
      }
    );
  }
);
hp.displayName = pp;
var gp = "TabsTrigger", vp = l.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, value: r, disabled: o = !1, ...a } = e, s = Vs(gp, n), i = fp(n), c = wp(s.baseId, r), d = xp(s.baseId, r), m = r === s.value;
    return /* @__PURE__ */ u(
      hs,
      {
        asChild: !0,
        ...i,
        focusable: !o,
        active: m,
        children: /* @__PURE__ */ u(
          L.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": m,
            "aria-controls": d,
            "data-state": m ? "active" : "inactive",
            "data-disabled": o ? "" : void 0,
            disabled: o,
            id: c,
            ...a,
            ref: t,
            onMouseDown: _(e.onMouseDown, (f) => {
              !o && f.button === 0 && f.ctrlKey === !1 ? s.onValueChange(r) : f.preventDefault();
            }),
            onKeyDown: _(e.onKeyDown, (f) => {
              [" ", "Enter"].includes(f.key) && s.onValueChange(r);
            }),
            onFocus: _(e.onFocus, () => {
              const f = s.activationMode !== "manual";
              !m && !o && f && s.onValueChange(r);
            })
          }
        )
      }
    );
  }
);
vp.displayName = gp;
var bp = "TabsContent", yp = l.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, value: r, forceMount: o, children: a, ...s } = e, i = Vs(bp, n), c = wp(i.baseId, r), d = xp(i.baseId, r), m = r === i.value, f = l.useRef(m);
    return l.useEffect(() => {
      const p = requestAnimationFrame(() => f.current = !1);
      return () => cancelAnimationFrame(p);
    }, []), /* @__PURE__ */ u(ve, { present: o || m, children: ({ present: p }) => /* @__PURE__ */ u(
      L.div,
      {
        "data-state": m ? "active" : "inactive",
        "data-orientation": i.orientation,
        role: "tabpanel",
        "aria-labelledby": c,
        hidden: !p,
        id: d,
        tabIndex: 0,
        ...s,
        ref: t,
        style: {
          ...e.style,
          animationDuration: f.current ? "0s" : void 0
        },
        children: p && a
      }
    ) });
  }
);
yp.displayName = bp;
function wp(e, t) {
  return `${e}-trigger-${t}`;
}
function xp(e, t) {
  return `${e}-content-${t}`;
}
var bR = mp, Sp = hp, Cp = vp, Np = yp;
const zM = bR, yR = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  Sp,
  {
    ref: n,
    className: k(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      e
    ),
    ...t
  }
));
yR.displayName = Sp.displayName;
const wR = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  Cp,
  {
    ref: n,
    className: k(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      e
    ),
    ...t
  }
));
wR.displayName = Cp.displayName;
const xR = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  Np,
  {
    ref: n,
    className: k(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      e
    ),
    ...t
  }
));
xR.displayName = Np.displayName;
const Ep = l.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ u(
    "textarea",
    {
      className: k(
        "flex min-h-[80px] w-full rounded-md border border-border-default bg-[hsl(var(--input-bg))]",
        "px-3 py-2 text-body-sm text-content-primary",
        "placeholder:text-content-tertiary",
        "transition-colors duration-fast",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-border-brand",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-sunken",
        "read-only:bg-surface-sunken read-only:text-content-secondary",
        "resize-y",
        e
      ),
      ref: n,
      ...t
    }
  )
);
Ep.displayName = "Textarea";
var Hs = "ToastProvider", [Ys, SR, CR] = cn("Toast"), [kp] = we("Toast", [CR]), [NR, bo] = kp(Hs), Pp = (e) => {
  const {
    __scopeToast: t,
    label: n = "Notification",
    duration: r = 5e3,
    swipeDirection: o = "right",
    swipeThreshold: a = 50,
    children: s
  } = e, [i, c] = l.useState(null), [d, m] = l.useState(0), f = l.useRef(!1), p = l.useRef(!1);
  return n.trim() || console.error(
    `Invalid prop \`label\` supplied to \`${Hs}\`. Expected non-empty \`string\`.`
  ), /* @__PURE__ */ u(Ys.Provider, { scope: t, children: /* @__PURE__ */ u(
    NR,
    {
      scope: t,
      label: n,
      duration: r,
      swipeDirection: o,
      swipeThreshold: a,
      toastCount: d,
      viewport: i,
      onViewportChange: c,
      onToastAdd: l.useCallback(() => m((h) => h + 1), []),
      onToastRemove: l.useCallback(() => m((h) => h - 1), []),
      isFocusedToastEscapeKeyDownRef: f,
      isClosePausedRef: p,
      children: s
    }
  ) });
};
Pp.displayName = Hs;
var Rp = "ToastViewport", ER = ["F8"], Ca = "toast.viewportPause", Na = "toast.viewportResume", Mp = l.forwardRef(
  (e, t) => {
    const {
      __scopeToast: n,
      hotkey: r = ER,
      label: o = "Notifications ({hotkey})",
      ...a
    } = e, s = bo(Rp, n), i = SR(n), c = l.useRef(null), d = l.useRef(null), m = l.useRef(null), f = l.useRef(null), p = q(t, f, s.onViewportChange), h = r.join("+").replace(/Key/g, "").replace(/Digit/g, ""), b = s.toastCount > 0;
    l.useEffect(() => {
      const v = (w) => {
        var x;
        r.length !== 0 && r.every((S) => w[S] || w.code === S) && ((x = f.current) == null || x.focus());
      };
      return document.addEventListener("keydown", v), () => document.removeEventListener("keydown", v);
    }, [r]), l.useEffect(() => {
      const v = c.current, w = f.current;
      if (b && v && w) {
        const y = () => {
          if (!s.isClosePausedRef.current) {
            const C = new CustomEvent(Ca);
            w.dispatchEvent(C), s.isClosePausedRef.current = !0;
          }
        }, x = () => {
          if (s.isClosePausedRef.current) {
            const C = new CustomEvent(Na);
            w.dispatchEvent(C), s.isClosePausedRef.current = !1;
          }
        }, S = (C) => {
          !v.contains(C.relatedTarget) && x();
        }, N = () => {
          v.contains(document.activeElement) || x();
        };
        return v.addEventListener("focusin", y), v.addEventListener("focusout", S), v.addEventListener("pointermove", y), v.addEventListener("pointerleave", N), window.addEventListener("blur", y), window.addEventListener("focus", x), () => {
          v.removeEventListener("focusin", y), v.removeEventListener("focusout", S), v.removeEventListener("pointermove", y), v.removeEventListener("pointerleave", N), window.removeEventListener("blur", y), window.removeEventListener("focus", x);
        };
      }
    }, [b, s.isClosePausedRef]);
    const g = l.useCallback(
      ({ tabbingDirection: v }) => {
        const y = i().map((x) => {
          const S = x.ref.current, N = [S, ...FR(S)];
          return v === "forwards" ? N : N.reverse();
        });
        return (v === "forwards" ? y.reverse() : y).flat();
      },
      [i]
    );
    return l.useEffect(() => {
      const v = f.current;
      if (v) {
        const w = (y) => {
          var N, C, E;
          const x = y.altKey || y.ctrlKey || y.metaKey;
          if (y.key === "Tab" && !x) {
            const T = document.activeElement, D = y.shiftKey;
            if (y.target === v && D) {
              (N = d.current) == null || N.focus();
              return;
            }
            const $ = g({ tabbingDirection: D ? "backwards" : "forwards" }), z = $.findIndex((O) => O === T);
            qo($.slice(z + 1)) ? y.preventDefault() : D ? (C = d.current) == null || C.focus() : (E = m.current) == null || E.focus();
          }
        };
        return v.addEventListener("keydown", w), () => v.removeEventListener("keydown", w);
      }
    }, [i, g]), /* @__PURE__ */ R(
      Fx,
      {
        ref: c,
        role: "region",
        "aria-label": o.replace("{hotkey}", h),
        tabIndex: -1,
        style: { pointerEvents: b ? void 0 : "none" },
        children: [
          b && /* @__PURE__ */ u(
            Ea,
            {
              ref: d,
              onFocusFromOutsideViewport: () => {
                const v = g({
                  tabbingDirection: "forwards"
                });
                qo(v);
              }
            }
          ),
          /* @__PURE__ */ u(Ys.Slot, { scope: n, children: /* @__PURE__ */ u(L.ol, { tabIndex: -1, ...a, ref: p }) }),
          b && /* @__PURE__ */ u(
            Ea,
            {
              ref: m,
              onFocusFromOutsideViewport: () => {
                const v = g({
                  tabbingDirection: "backwards"
                });
                qo(v);
              }
            }
          )
        ]
      }
    );
  }
);
Mp.displayName = Rp;
var Tp = "ToastFocusProxy", Ea = l.forwardRef(
  (e, t) => {
    const { __scopeToast: n, onFocusFromOutsideViewport: r, ...o } = e, a = bo(Tp, n);
    return /* @__PURE__ */ u(
      uo,
      {
        tabIndex: 0,
        ...o,
        ref: t,
        style: { position: "fixed" },
        onFocus: (s) => {
          var d;
          const i = s.relatedTarget;
          !((d = a.viewport) != null && d.contains(i)) && r();
        }
      }
    );
  }
);
Ea.displayName = Tp;
var Xn = "Toast", kR = "toast.swipeStart", PR = "toast.swipeMove", RR = "toast.swipeCancel", MR = "toast.swipeEnd", _p = l.forwardRef(
  (e, t) => {
    const { forceMount: n, open: r, defaultOpen: o, onOpenChange: a, ...s } = e, [i, c] = xe({
      prop: r,
      defaultProp: o ?? !0,
      onChange: a,
      caller: Xn
    });
    return /* @__PURE__ */ u(ve, { present: n || i, children: /* @__PURE__ */ u(
      DR,
      {
        open: i,
        ...s,
        ref: t,
        onClose: () => c(!1),
        onPause: pe(e.onPause),
        onResume: pe(e.onResume),
        onSwipeStart: _(e.onSwipeStart, (d) => {
          d.currentTarget.setAttribute("data-swipe", "start");
        }),
        onSwipeMove: _(e.onSwipeMove, (d) => {
          const { x: m, y: f } = d.detail.delta;
          d.currentTarget.setAttribute("data-swipe", "move"), d.currentTarget.style.setProperty("--radix-toast-swipe-move-x", `${m}px`), d.currentTarget.style.setProperty("--radix-toast-swipe-move-y", `${f}px`);
        }),
        onSwipeCancel: _(e.onSwipeCancel, (d) => {
          d.currentTarget.setAttribute("data-swipe", "cancel"), d.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"), d.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"), d.currentTarget.style.removeProperty("--radix-toast-swipe-end-x"), d.currentTarget.style.removeProperty("--radix-toast-swipe-end-y");
        }),
        onSwipeEnd: _(e.onSwipeEnd, (d) => {
          const { x: m, y: f } = d.detail.delta;
          d.currentTarget.setAttribute("data-swipe", "end"), d.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"), d.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"), d.currentTarget.style.setProperty("--radix-toast-swipe-end-x", `${m}px`), d.currentTarget.style.setProperty("--radix-toast-swipe-end-y", `${f}px`), c(!1);
        })
      }
    ) });
  }
);
_p.displayName = Xn;
var [TR, _R] = kp(Xn, {
  onClose() {
  }
}), DR = l.forwardRef(
  (e, t) => {
    const {
      __scopeToast: n,
      type: r = "foreground",
      duration: o,
      open: a,
      onClose: s,
      onEscapeKeyDown: i,
      onPause: c,
      onResume: d,
      onSwipeStart: m,
      onSwipeMove: f,
      onSwipeCancel: p,
      onSwipeEnd: h,
      ...b
    } = e, g = bo(Xn, n), [v, w] = l.useState(null), y = q(t, (O) => w(O)), x = l.useRef(null), S = l.useRef(null), N = o || g.duration, C = l.useRef(0), E = l.useRef(N), T = l.useRef(0), { onToastAdd: D, onToastRemove: A } = g, W = pe(() => {
      var j;
      (v == null ? void 0 : v.contains(document.activeElement)) && ((j = g.viewport) == null || j.focus()), s();
    }), $ = l.useCallback(
      (O) => {
        !O || O === 1 / 0 || (window.clearTimeout(T.current), C.current = (/* @__PURE__ */ new Date()).getTime(), T.current = window.setTimeout(W, O));
      },
      [W]
    );
    l.useEffect(() => {
      const O = g.viewport;
      if (O) {
        const j = () => {
          $(E.current), d == null || d();
        }, V = () => {
          const G = (/* @__PURE__ */ new Date()).getTime() - C.current;
          E.current = E.current - G, window.clearTimeout(T.current), c == null || c();
        };
        return O.addEventListener(Ca, V), O.addEventListener(Na, j), () => {
          O.removeEventListener(Ca, V), O.removeEventListener(Na, j);
        };
      }
    }, [g.viewport, N, c, d, $]), l.useEffect(() => {
      a && !g.isClosePausedRef.current && $(N);
    }, [a, N, g.isClosePausedRef, $]), l.useEffect(() => (D(), () => A()), [D, A]);
    const z = l.useMemo(() => v ? Fp(v) : null, [v]);
    return g.viewport ? /* @__PURE__ */ R(ze, { children: [
      z && /* @__PURE__ */ u(
        OR,
        {
          __scopeToast: n,
          role: "status",
          "aria-live": r === "foreground" ? "assertive" : "polite",
          children: z
        }
      ),
      /* @__PURE__ */ u(TR, { scope: n, onClose: W, children: Tn.createPortal(
        /* @__PURE__ */ u(Ys.ItemSlot, { scope: n, children: /* @__PURE__ */ u(
          Wx,
          {
            asChild: !0,
            onEscapeKeyDown: _(i, () => {
              g.isFocusedToastEscapeKeyDownRef.current || W(), g.isFocusedToastEscapeKeyDownRef.current = !1;
            }),
            children: /* @__PURE__ */ u(
              L.li,
              {
                tabIndex: 0,
                "data-state": a ? "open" : "closed",
                "data-swipe-direction": g.swipeDirection,
                ...b,
                ref: y,
                style: { userSelect: "none", touchAction: "none", ...e.style },
                onKeyDown: _(e.onKeyDown, (O) => {
                  O.key === "Escape" && (i == null || i(O.nativeEvent), O.nativeEvent.defaultPrevented || (g.isFocusedToastEscapeKeyDownRef.current = !0, W()));
                }),
                onPointerDown: _(e.onPointerDown, (O) => {
                  O.button === 0 && (x.current = { x: O.clientX, y: O.clientY });
                }),
                onPointerMove: _(e.onPointerMove, (O) => {
                  if (!x.current) return;
                  const j = O.clientX - x.current.x, V = O.clientY - x.current.y, G = !!S.current, B = ["left", "right"].includes(g.swipeDirection), I = ["left", "up"].includes(g.swipeDirection) ? Math.min : Math.max, Z = B ? I(0, j) : 0, Q = B ? 0 : I(0, V), M = O.pointerType === "touch" ? 10 : 2, Y = { x: Z, y: Q }, K = { originalEvent: O, delta: Y };
                  G ? (S.current = Y, sr(PR, f, K, {
                    discrete: !1
                  })) : rc(Y, g.swipeDirection, M) ? (S.current = Y, sr(kR, m, K, {
                    discrete: !1
                  }), O.target.setPointerCapture(O.pointerId)) : (Math.abs(j) > M || Math.abs(V) > M) && (x.current = null);
                }),
                onPointerUp: _(e.onPointerUp, (O) => {
                  const j = S.current, V = O.target;
                  if (V.hasPointerCapture(O.pointerId) && V.releasePointerCapture(O.pointerId), S.current = null, x.current = null, j) {
                    const G = O.currentTarget, B = { originalEvent: O, delta: j };
                    rc(j, g.swipeDirection, g.swipeThreshold) ? sr(MR, h, B, {
                      discrete: !0
                    }) : sr(
                      RR,
                      p,
                      B,
                      {
                        discrete: !0
                      }
                    ), G.addEventListener("click", (I) => I.preventDefault(), {
                      once: !0
                    });
                  }
                })
              }
            )
          }
        ) }),
        g.viewport
      ) })
    ] }) : null;
  }
), OR = (e) => {
  const { __scopeToast: t, children: n, ...r } = e, o = bo(Xn, t), [a, s] = l.useState(!1), [i, c] = l.useState(!1);
  return $R(() => s(!0)), l.useEffect(() => {
    const d = window.setTimeout(() => c(!0), 1e3);
    return () => window.clearTimeout(d);
  }, []), i ? null : /* @__PURE__ */ u(Ft, { asChild: !0, children: /* @__PURE__ */ u(uo, { ...r, children: a && /* @__PURE__ */ R(ze, { children: [
    o.label,
    " ",
    n
  ] }) }) });
}, AR = "ToastTitle", Dp = l.forwardRef(
  (e, t) => {
    const { __scopeToast: n, ...r } = e;
    return /* @__PURE__ */ u(L.div, { ...r, ref: t });
  }
);
Dp.displayName = AR;
var IR = "ToastDescription", Op = l.forwardRef(
  (e, t) => {
    const { __scopeToast: n, ...r } = e;
    return /* @__PURE__ */ u(L.div, { ...r, ref: t });
  }
);
Op.displayName = IR;
var Ap = "ToastAction", Ip = l.forwardRef(
  (e, t) => {
    const { altText: n, ...r } = e;
    return n.trim() ? /* @__PURE__ */ u(Wp, { altText: n, asChild: !0, children: /* @__PURE__ */ u(zs, { ...r, ref: t }) }) : (console.error(
      `Invalid prop \`altText\` supplied to \`${Ap}\`. Expected non-empty \`string\`.`
    ), null);
  }
);
Ip.displayName = Ap;
var $p = "ToastClose", zs = l.forwardRef(
  (e, t) => {
    const { __scopeToast: n, ...r } = e, o = _R($p, n);
    return /* @__PURE__ */ u(Wp, { asChild: !0, children: /* @__PURE__ */ u(
      L.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: _(e.onClick, o.onClose)
      }
    ) });
  }
);
zs.displayName = $p;
var Wp = l.forwardRef((e, t) => {
  const { __scopeToast: n, altText: r, ...o } = e;
  return /* @__PURE__ */ u(
    L.div,
    {
      "data-radix-toast-announce-exclude": "",
      "data-radix-toast-announce-alt": r || void 0,
      ...o,
      ref: t
    }
  );
});
function Fp(e) {
  const t = [];
  return Array.from(e.childNodes).forEach((r) => {
    if (r.nodeType === r.TEXT_NODE && r.textContent && t.push(r.textContent), WR(r)) {
      const o = r.ariaHidden || r.hidden || r.style.display === "none", a = r.dataset.radixToastAnnounceExclude === "";
      if (!o)
        if (a) {
          const s = r.dataset.radixToastAnnounceAlt;
          s && t.push(s);
        } else
          t.push(...Fp(r));
    }
  }), t;
}
function sr(e, t, n, { discrete: r }) {
  const o = n.originalEvent.currentTarget, a = new CustomEvent(e, { bubbles: !0, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? Ta(o, a) : o.dispatchEvent(a);
}
var rc = (e, t, n = 0) => {
  const r = Math.abs(e.x), o = Math.abs(e.y), a = r > o;
  return t === "left" || t === "right" ? a && r > n : !a && o > n;
};
function $R(e = () => {
}) {
  const t = pe(e);
  ge(() => {
    let n = 0, r = 0;
    return n = window.requestAnimationFrame(() => r = window.requestAnimationFrame(t)), () => {
      window.cancelAnimationFrame(n), window.cancelAnimationFrame(r);
    };
  }, [t]);
}
function WR(e) {
  return e.nodeType === e.ELEMENT_NODE;
}
function FR(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function qo(e) {
  const t = document.activeElement;
  return e.some((n) => n === t ? !0 : (n.focus(), document.activeElement !== t));
}
var LR = Pp, Lp = Mp, Bp = _p, Vp = Dp, Hp = Op, Yp = Ip, zp = zs;
const BR = LR, jp = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  Lp,
  {
    ref: n,
    className: k(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      e
    ),
    ...t
  }
));
jp.displayName = Lp.displayName;
const VR = Fe(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
), Gp = l.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ u(
  Bp,
  {
    ref: r,
    className: k(VR({ variant: t }), e),
    ...n
  }
));
Gp.displayName = Bp.displayName;
const HR = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  Yp,
  {
    ref: n,
    className: k(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      e
    ),
    ...t
  }
));
HR.displayName = Yp.displayName;
const Up = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  zp,
  {
    ref: n,
    className: k(
      "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      e
    ),
    "toast-close": "",
    ...t,
    children: /* @__PURE__ */ u(Lr, { className: "h-4 w-4" })
  }
));
Up.displayName = zp.displayName;
const Kp = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  Vp,
  {
    ref: n,
    className: k("text-sm font-semibold [&+div]:text-xs", e),
    ...t
  }
));
Kp.displayName = Vp.displayName;
const qp = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ u(
  Hp,
  {
    ref: n,
    className: k("text-sm opacity-90", e),
    ...t
  }
));
qp.displayName = Hp.displayName;
const YR = 1, zR = 1e6;
let Xo = 0;
function jR() {
  return Xo = (Xo + 1) % Number.MAX_SAFE_INTEGER, Xo.toString();
}
const Zo = /* @__PURE__ */ new Map(), oc = (e) => {
  if (Zo.has(e))
    return;
  const t = setTimeout(() => {
    Zo.delete(e), Sn({
      type: "REMOVE_TOAST",
      toastId: e
    });
  }, zR);
  Zo.set(e, t);
}, GR = (e, t) => {
  switch (t.type) {
    case "ADD_TOAST":
      return {
        ...e,
        toasts: [t.toast, ...e.toasts].slice(0, YR)
      };
    case "UPDATE_TOAST":
      return {
        ...e,
        toasts: e.toasts.map((n) => n.id === t.toast.id ? { ...n, ...t.toast } : n)
      };
    case "DISMISS_TOAST": {
      const { toastId: n } = t;
      return n ? oc(n) : e.toasts.forEach((r) => {
        oc(r.id);
      }), {
        ...e,
        toasts: e.toasts.map(
          (r) => r.id === n || n === void 0 ? {
            ...r,
            open: !1
          } : r
        )
      };
    }
    case "REMOVE_TOAST":
      return t.toastId === void 0 ? {
        ...e,
        toasts: []
      } : {
        ...e,
        toasts: e.toasts.filter((n) => n.id !== t.toastId)
      };
  }
}, mr = [];
let pr = { toasts: [] };
function Sn(e) {
  pr = GR(pr, e), mr.forEach((t) => {
    t(pr);
  });
}
function UR({ ...e }) {
  const t = jR(), n = (o) => Sn({
    type: "UPDATE_TOAST",
    toast: { ...o, id: t }
  }), r = () => Sn({ type: "DISMISS_TOAST", toastId: t });
  return Sn({
    type: "ADD_TOAST",
    toast: {
      ...e,
      id: t,
      open: !0,
      onOpenChange: (o) => {
        o || r();
      }
    }
  }), {
    id: t,
    dismiss: r,
    update: n
  };
}
function KR() {
  const [e, t] = l.useState(pr);
  return l.useEffect(() => (mr.push(t), () => {
    const n = mr.indexOf(t);
    n > -1 && mr.splice(n, 1);
  }), [e]), {
    ...e,
    toast: UR,
    dismiss: (n) => Sn({ type: "DISMISS_TOAST", toastId: n })
  };
}
function jM() {
  const { toasts: e } = KR();
  return /* @__PURE__ */ R(BR, { children: [
    e.map(function({ id: t, title: n, description: r, action: o, ...a }) {
      return /* @__PURE__ */ R(Gp, { ...a, children: [
        /* @__PURE__ */ R("div", { className: "grid gap-1", children: [
          n && /* @__PURE__ */ u(Kp, { children: n }),
          r && /* @__PURE__ */ u(qp, { children: r })
        ] }),
        o,
        /* @__PURE__ */ u(Up, {})
      ] }, t);
    }),
    /* @__PURE__ */ u(jp, {})
  ] });
}
var qR = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function XR(e) {
  const t = ({ children: n }) => /* @__PURE__ */ u(ze, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = qR, t;
}
var [yo] = we("Tooltip", [
  xt
]), wo = xt(), Xp = "TooltipProvider", ZR = 700, ka = "tooltip.open", [QR, js] = yo(Xp), Zp = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = ZR,
    skipDelayDuration: r = 300,
    disableHoverableContent: o = !1,
    children: a
  } = e, s = l.useRef(!0), i = l.useRef(!1), c = l.useRef(0);
  return l.useEffect(() => {
    const d = c.current;
    return () => window.clearTimeout(d);
  }, []), /* @__PURE__ */ u(
    QR,
    {
      scope: t,
      isOpenDelayedRef: s,
      delayDuration: n,
      onOpen: l.useCallback(() => {
        window.clearTimeout(c.current), s.current = !1;
      }, []),
      onClose: l.useCallback(() => {
        window.clearTimeout(c.current), c.current = window.setTimeout(
          () => s.current = !0,
          r
        );
      }, [r]),
      isPointerInTransitRef: i,
      onPointerInTransitChange: l.useCallback((d) => {
        i.current = d;
      }, []),
      disableHoverableContent: o,
      children: a
    }
  );
};
Zp.displayName = Xp;
var Mn = "Tooltip", [JR, Zn] = yo(Mn), Qp = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    disableHoverableContent: s,
    delayDuration: i
  } = e, c = js(Mn, e.__scopeTooltip), d = wo(t), [m, f] = l.useState(null), p = he(), h = l.useRef(0), b = s ?? c.disableHoverableContent, g = i ?? c.delayDuration, v = l.useRef(!1), [w, y] = xe({
    prop: r,
    defaultProp: o ?? !1,
    onChange: (E) => {
      E ? (c.onOpen(), document.dispatchEvent(new CustomEvent(ka))) : c.onClose(), a == null || a(E);
    },
    caller: Mn
  }), x = l.useMemo(() => w ? v.current ? "delayed-open" : "instant-open" : "closed", [w]), S = l.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, v.current = !1, y(!0);
  }, [y]), N = l.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, y(!1);
  }, [y]), C = l.useCallback(() => {
    window.clearTimeout(h.current), h.current = window.setTimeout(() => {
      v.current = !0, y(!0), h.current = 0;
    }, g);
  }, [g, y]);
  return l.useEffect(() => () => {
    h.current && (window.clearTimeout(h.current), h.current = 0);
  }, []), /* @__PURE__ */ u(Yn, { ...d, children: /* @__PURE__ */ u(
    JR,
    {
      scope: t,
      contentId: p,
      open: w,
      stateAttribute: x,
      trigger: m,
      onTriggerChange: f,
      onTriggerEnter: l.useCallback(() => {
        c.isOpenDelayedRef.current ? C() : S();
      }, [c.isOpenDelayedRef, C, S]),
      onTriggerLeave: l.useCallback(() => {
        b ? N() : (window.clearTimeout(h.current), h.current = 0);
      }, [N, b]),
      onOpen: S,
      onClose: N,
      disableHoverableContent: b,
      children: n
    }
  ) });
};
Qp.displayName = Mn;
var Pa = "TooltipTrigger", Jp = l.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = Zn(Pa, n), a = js(Pa, n), s = wo(n), i = l.useRef(null), c = q(t, i, o.onTriggerChange), d = l.useRef(!1), m = l.useRef(!1), f = l.useCallback(() => d.current = !1, []);
    return l.useEffect(() => () => document.removeEventListener("pointerup", f), [f]), /* @__PURE__ */ u(zn, { asChild: !0, ...s, children: /* @__PURE__ */ u(
      L.button,
      {
        "aria-describedby": o.open ? o.contentId : void 0,
        "data-state": o.stateAttribute,
        ...r,
        ref: c,
        onPointerMove: _(e.onPointerMove, (p) => {
          p.pointerType !== "touch" && !m.current && !a.isPointerInTransitRef.current && (o.onTriggerEnter(), m.current = !0);
        }),
        onPointerLeave: _(e.onPointerLeave, () => {
          o.onTriggerLeave(), m.current = !1;
        }),
        onPointerDown: _(e.onPointerDown, () => {
          o.open && o.onClose(), d.current = !0, document.addEventListener("pointerup", f, { once: !0 });
        }),
        onFocus: _(e.onFocus, () => {
          d.current || o.onOpen();
        }),
        onBlur: _(e.onBlur, o.onClose),
        onClick: _(e.onClick, o.onClose)
      }
    ) });
  }
);
Jp.displayName = Pa;
var Gs = "TooltipPortal", [eM, tM] = yo(Gs, {
  forceMount: void 0
}), eh = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: r, container: o } = e, a = Zn(Gs, t);
  return /* @__PURE__ */ u(eM, { scope: t, forceMount: n, children: /* @__PURE__ */ u(ve, { present: n || a.open, children: /* @__PURE__ */ u(Ft, { asChild: !0, container: o, children: r }) }) });
};
eh.displayName = Gs;
var an = "TooltipContent", th = l.forwardRef(
  (e, t) => {
    const n = tM(an, e.__scopeTooltip), { forceMount: r = n.forceMount, side: o = "top", ...a } = e, s = Zn(an, e.__scopeTooltip);
    return /* @__PURE__ */ u(ve, { present: r || s.open, children: s.disableHoverableContent ? /* @__PURE__ */ u(nh, { side: o, ...a, ref: t }) : /* @__PURE__ */ u(nM, { side: o, ...a, ref: t }) });
  }
), nM = l.forwardRef((e, t) => {
  const n = Zn(an, e.__scopeTooltip), r = js(an, e.__scopeTooltip), o = l.useRef(null), a = q(t, o), [s, i] = l.useState(null), { trigger: c, onClose: d } = n, m = o.current, { onPointerInTransitChange: f } = r, p = l.useCallback(() => {
    i(null), f(!1);
  }, [f]), h = l.useCallback(
    (b, g) => {
      const v = b.currentTarget, w = { x: b.clientX, y: b.clientY }, y = iM(w, v.getBoundingClientRect()), x = cM(w, y), S = lM(g.getBoundingClientRect()), N = uM([...x, ...S]);
      i(N), f(!0);
    },
    [f]
  );
  return l.useEffect(() => () => p(), [p]), l.useEffect(() => {
    if (c && m) {
      const b = (v) => h(v, m), g = (v) => h(v, c);
      return c.addEventListener("pointerleave", b), m.addEventListener("pointerleave", g), () => {
        c.removeEventListener("pointerleave", b), m.removeEventListener("pointerleave", g);
      };
    }
  }, [c, m, h, p]), l.useEffect(() => {
    if (s) {
      const b = (g) => {
        const v = g.target, w = { x: g.clientX, y: g.clientY }, y = (c == null ? void 0 : c.contains(v)) || (m == null ? void 0 : m.contains(v)), x = !dM(w, s);
        y ? p() : x && (p(), d());
      };
      return document.addEventListener("pointermove", b), () => document.removeEventListener("pointermove", b);
    }
  }, [c, m, s, d, p]), /* @__PURE__ */ u(nh, { ...e, ref: a });
}), [rM, oM] = yo(Mn, { isInside: !1 }), aM = /* @__PURE__ */ XR("TooltipContent"), nh = l.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: r,
      "aria-label": o,
      onEscapeKeyDown: a,
      onPointerDownOutside: s,
      ...i
    } = e, c = Zn(an, n), d = wo(n), { onClose: m } = c;
    return l.useEffect(() => (document.addEventListener(ka, m), () => document.removeEventListener(ka, m)), [m]), l.useEffect(() => {
      if (c.trigger) {
        const f = (p) => {
          const h = p.target;
          h != null && h.contains(c.trigger) && m();
        };
        return window.addEventListener("scroll", f, { capture: !0 }), () => window.removeEventListener("scroll", f, { capture: !0 });
      }
    }, [c.trigger, m]), /* @__PURE__ */ u(
      Wt,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: a,
        onPointerDownOutside: s,
        onFocusOutside: (f) => f.preventDefault(),
        onDismiss: m,
        children: /* @__PURE__ */ R(
          to,
          {
            "data-state": c.stateAttribute,
            ...d,
            ...i,
            ref: t,
            style: {
              ...i.style,
              "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
              "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
              "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
            },
            children: [
              /* @__PURE__ */ u(aM, { children: r }),
              /* @__PURE__ */ u(rM, { scope: n, isInside: !0, children: /* @__PURE__ */ u(zk, { id: c.contentId, role: "tooltip", children: o || r }) })
            ]
          }
        )
      }
    );
  }
);
th.displayName = an;
var rh = "TooltipArrow", sM = l.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = wo(n);
    return oM(
      rh,
      n
    ).isInside ? null : /* @__PURE__ */ u(no, { ...o, ...r, ref: t });
  }
);
sM.displayName = rh;
function iM(e, t) {
  const n = Math.abs(t.top - e.y), r = Math.abs(t.bottom - e.y), o = Math.abs(t.right - e.x), a = Math.abs(t.left - e.x);
  switch (Math.min(n, r, o, a)) {
    case a:
      return "left";
    case o:
      return "right";
    case n:
      return "top";
    case r:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function cM(e, t, n = 5) {
  const r = [];
  switch (t) {
    case "top":
      r.push(
        { x: e.x - n, y: e.y + n },
        { x: e.x + n, y: e.y + n }
      );
      break;
    case "bottom":
      r.push(
        { x: e.x - n, y: e.y - n },
        { x: e.x + n, y: e.y - n }
      );
      break;
    case "left":
      r.push(
        { x: e.x + n, y: e.y - n },
        { x: e.x + n, y: e.y + n }
      );
      break;
    case "right":
      r.push(
        { x: e.x - n, y: e.y - n },
        { x: e.x - n, y: e.y + n }
      );
      break;
  }
  return r;
}
function lM(e) {
  const { top: t, right: n, bottom: r, left: o } = e;
  return [
    { x: o, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: o, y: r }
  ];
}
function dM(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let a = 0, s = t.length - 1; a < t.length; s = a++) {
    const i = t[a], c = t[s], d = i.x, m = i.y, f = c.x, p = c.y;
    m > r != p > r && n < (f - d) * (r - m) / (p - m) + d && (o = !o);
  }
  return o;
}
function uM(e) {
  const t = e.slice();
  return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), fM(t);
}
function fM(e) {
  if (e.length <= 1) return e.slice();
  const t = [];
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    for (; t.length >= 2; ) {
      const a = t[t.length - 1], s = t[t.length - 2];
      if ((a.x - s.x) * (o.y - s.y) >= (a.y - s.y) * (o.x - s.x)) t.pop();
      else break;
    }
    t.push(o);
  }
  t.pop();
  const n = [];
  for (let r = e.length - 1; r >= 0; r--) {
    const o = e[r];
    for (; n.length >= 2; ) {
      const a = n[n.length - 1], s = n[n.length - 2];
      if ((a.x - s.x) * (o.y - s.y) >= (a.y - s.y) * (o.x - s.x)) n.pop();
      else break;
    }
    n.push(o);
  }
  return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n);
}
var mM = Zp, pM = Qp, hM = Jp, gM = eh, oh = th;
const GM = mM, UM = pM, KM = hM, vM = l.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ u(gM, { children: /* @__PURE__ */ u(
  oh,
  {
    ref: r,
    sideOffset: t,
    className: k(
      "z-toast overflow-hidden rounded-md bg-popover px-3 py-1.5",
      "text-popover-foreground text-caption shadow-elevation-4 max-w-xs",
      "animate-in fade-in-0 zoom-in-95",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
vM.displayName = oh.displayName;
function qM({
  options: e,
  value: t,
  onChange: n,
  placeholder: r = "Pilih item...",
  searchPlaceholder: o = "Cari...",
  emptyText: a = "Tidak ditemukan.",
  className: s,
  disabled: i = !1
}) {
  var h;
  const [c, d] = l.useState(!1), [m, f] = l.useState(t || ""), p = t !== void 0 ? t : m;
  return /* @__PURE__ */ R(yf, { open: c, onOpenChange: d, children: [
    /* @__PURE__ */ u(wf, { asChild: !0, children: /* @__PURE__ */ R(
      Ce,
      {
        variant: "outline",
        role: "combobox",
        "aria-expanded": c,
        disabled: i,
        className: k(
          "w-full justify-between bg-background border-border text-foreground font-medium hover:bg-muted hover:border-border-strong transition-all shadow-sm",
          !p && "text-muted-foreground font-normal",
          s
        ),
        children: [
          /* @__PURE__ */ u("span", { className: "truncate", children: p ? (h = e.find((b) => b.value === p)) == null ? void 0 : h.label : r }),
          /* @__PURE__ */ u(ev, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ u(_s, { className: "w-[var(--radix-popover-trigger-width)] p-0 border-border shadow-lg animate-in fade-in zoom-in-95 duration-200", children: /* @__PURE__ */ R(as, { className: "bg-background", children: [
      /* @__PURE__ */ u(Cd, { placeholder: o, className: "h-11" }),
      /* @__PURE__ */ R(Nd, { className: "max-h-[300px]", children: [
        /* @__PURE__ */ u(Ed, { className: "py-6 text-center text-sm text-muted-foreground italic", children: a }),
        /* @__PURE__ */ u(kd, { children: e.map((b) => /* @__PURE__ */ u(
          Pd,
          {
            value: b.label,
            onSelect: () => {
              const g = b.value === p ? "" : b.value;
              t === void 0 && f(g), n == null || n(g), d(!1);
            },
            className: k(
              "flex items-center justify-between px-3 py-2 cursor-pointer transition-colors",
              p === b.value ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted"
            ),
            children: /* @__PURE__ */ R("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ u(
                $r,
                {
                  className: k(
                    "h-4 w-4",
                    p === b.value ? "opacity-100" : "opacity-0"
                  )
                }
              ),
              b.label
            ] })
          },
          b.value
        )) })
      ] })
    ] }) })
  ] });
}
function XM({ appTitle: e }) {
  return /* @__PURE__ */ R("header", { className: "flex items-center justify-between gap-4 rounded-lg border bg-card p-3", children: [
    /* @__PURE__ */ u("p", { className: "text-sm font-semibold text-foreground", children: e }),
    /* @__PURE__ */ R("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ u(Rs, { placeholder: "Cari menu atau dokumen...", className: "w-64" }),
      /* @__PURE__ */ u(Ce, { variant: "ghost", size: "icon", "aria-label": "Notifikasi", children: /* @__PURE__ */ u(Zg, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ R(Ce, { variant: "outline", size: "sm", className: "gap-2", children: [
        /* @__PURE__ */ u(av, { className: "h-4 w-4" }),
        "Admin"
      ] })
    ] })
  ] });
}
function ZM({
  triggerLabel: e,
  title: t,
  description: n,
  confirmLabel: r,
  reasonRequired: o = !1,
  onConfirm: a
}) {
  const [s, i] = l.useState(!1), [c, d] = l.useState(""), [m, f] = l.useState(!1);
  return /* @__PURE__ */ R(vd, { open: s, onOpenChange: i, children: [
    /* @__PURE__ */ u(cC, { asChild: !0, children: /* @__PURE__ */ u(Ce, { variant: "outline", children: e }) }),
    /* @__PURE__ */ R(os, { children: [
      /* @__PURE__ */ R(yd, { children: [
        /* @__PURE__ */ u(xd, { children: t }),
        /* @__PURE__ */ u(Sd, { children: n })
      ] }),
      /* @__PURE__ */ R("div", { className: "space-y-2", children: [
        /* @__PURE__ */ R(en, { htmlFor: "confirm-reason", children: [
          "Alasan tindakan ",
          o ? /* @__PURE__ */ u("span", { className: "text-destructive", children: "*" }) : null
        ] }),
        /* @__PURE__ */ u(
          Ep,
          {
            id: "confirm-reason",
            value: c,
            onChange: (h) => {
              d(h.target.value), m && f(!1);
            },
            placeholder: "Tuliskan alasan atau catatan tindak lanjut..."
          }
        ),
        m ? /* @__PURE__ */ u("p", { className: "text-xs text-destructive", children: "Alasan wajib diisi sebelum melanjutkan." }) : null
      ] }),
      /* @__PURE__ */ R(wd, { children: [
        /* @__PURE__ */ u(Ce, { variant: "ghost", onClick: () => i(!1), children: "Batal" }),
        /* @__PURE__ */ u(Ce, { onClick: () => {
          if (o && c.trim().length === 0) {
            f(!0);
            return;
          }
          a(c.trim()), d(""), f(!1), i(!1);
        }, children: r })
      ] })
    ] })
  ] });
}
function QM({
  selectedCount: e,
  onSetPending: t,
  onSetApproved: n
}) {
  return e === 0 ? null : /* @__PURE__ */ R("div", { className: "flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-card p-3", children: [
    /* @__PURE__ */ R("p", { className: "text-sm text-foreground", children: [
      e,
      " dokumen dipilih"
    ] }),
    /* @__PURE__ */ R("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ u(Ce, { size: "sm", variant: "outline", onClick: t, children: "Set menunggu verifikasi" }),
      /* @__PURE__ */ u(Ce, { size: "sm", onClick: n, children: "Set disetujui" })
    ] })
  ] });
}
function JM({
  state: e,
  title: t,
  description: n,
  onRetry: r,
  children: o
}) {
  return e === "ready" ? /* @__PURE__ */ u(ze, { children: o }) : e === "loading" ? /* @__PURE__ */ u("div", { className: "rounded-lg border bg-card p-8", children: /* @__PURE__ */ R("div", { className: "flex items-center gap-3 text-sm text-muted-foreground", children: [
    /* @__PURE__ */ u(JP, { className: "h-4 w-4" }),
    "Memuat data dokumen..."
  ] }) }) : e === "error" ? /* @__PURE__ */ u("div", { className: "rounded-lg border border-feedback-danger/30 bg-feedback-danger-bg p-8", children: /* @__PURE__ */ R("div", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ u(Wa, { className: "mt-0.5 h-5 w-5 text-feedback-danger" }),
    /* @__PURE__ */ R("div", { className: "space-y-2", children: [
      /* @__PURE__ */ u("p", { className: "text-sm font-semibold text-foreground", children: t ?? "Data gagal dimuat" }),
      /* @__PURE__ */ u("p", { className: "text-sm text-muted-foreground", children: n ?? "Terjadi gangguan saat mengambil data. Silakan coba kembali." }),
      /* @__PURE__ */ u(Ce, { size: "sm", variant: "outline", onClick: r, children: "Coba lagi" })
    ] })
  ] }) }) : /* @__PURE__ */ R("div", { className: "rounded-lg border border-dashed bg-muted/30 p-8", children: [
    /* @__PURE__ */ u("p", { className: "text-sm font-medium text-foreground", children: t ?? "Belum ada data yang tersedia" }),
    /* @__PURE__ */ u("p", { className: "mt-1 text-sm text-muted-foreground", children: n ?? "Ubah filter atau tambah dokumen baru untuk mulai mengisi tabel." })
  ] });
}
function eT({
  data: e,
  columns: t,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ u(
    "div",
    {
      className: k(
        "w-full overflow-auto rounded-lg border border-border bg-background shadow-sm",
        n
      ),
      ...r,
      children: /* @__PURE__ */ R("table", { className: "w-full caption-bottom text-sm border-collapse", children: [
        /* @__PURE__ */ u("thead", { className: "bg-muted/50 border-b-2 border-border", children: /* @__PURE__ */ R("tr", { className: "transition-colors", children: [
          t.map((o) => /* @__PURE__ */ u(
            "th",
            {
              className: "h-12 px-4 text-left align-middle text-sm font-semibold text-muted-foreground",
              children: o.label
            },
            o.key
          )),
          /* @__PURE__ */ u("th", { className: "h-12 px-4 text-right align-middle text-sm font-semibold text-muted-foreground", children: "Aksi" })
        ] }) }),
        /* @__PURE__ */ u("tbody", { className: "bg-background [&_tr:last-child]:border-0", children: e.map((o, a) => /* @__PURE__ */ R(
          "tr",
          {
            className: "border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
            children: [
              t.map((s) => {
                const i = s.getValue ? s.getValue(o) : o[s.key];
                return /* @__PURE__ */ u("td", { className: "p-4 align-middle text-foreground font-medium", children: s.render ? s.render(i, o) : String(i ?? "-") }, s.key);
              }),
              /* @__PURE__ */ u("td", { className: "p-4 align-middle text-right", children: /* @__PURE__ */ u(
                Ce,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "text-primary hover:text-primary/80 font-bold h-7 px-2",
                  children: "Edit"
                }
              ) })
            ]
          },
          a
        )) })
      ] })
    }
  );
}
function tT({
  date: e,
  onChange: t,
  placeholder: n = "Pilih tanggal",
  className: r,
  disabled: o = !1,
  clearable: a = !0
}) {
  const [s, i] = l.useState(e), c = e !== void 0 ? e : s, d = (f) => {
    e === void 0 && i(f), t == null || t(f);
  }, m = (f) => {
    f.stopPropagation(), d(void 0);
  };
  return /* @__PURE__ */ R(yf, { children: [
    /* @__PURE__ */ u(wf, { asChild: !0, children: /* @__PURE__ */ R(
      Ce,
      {
        variant: "outline",
        disabled: o,
        className: k(
          "w-full justify-start text-left font-medium border-border bg-background hover:bg-muted hover:border-border-strong transition-all shadow-sm group",
          !c && "text-muted-foreground font-normal",
          r
        ),
        children: [
          /* @__PURE__ */ u(Qg, { className: "mr-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" }),
          /* @__PURE__ */ u("span", { className: "flex-1 truncate", children: c ? qt(c, "dd MMMM yyyy", { locale: Yy }) : n }),
          a && c && !o && /* @__PURE__ */ u(
            Lr,
            {
              className: "h-3 w-3 ml-2 opacity-40 hover:opacity-100 transition-opacity",
              onClick: m
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ u(
      _s,
      {
        className: "w-auto p-0 border-border shadow-xl animate-in fade-in slide-in-from-top-2 duration-200",
        align: "start",
        children: /* @__PURE__ */ u(
          fx,
          {
            mode: "single",
            selected: c,
            onSelect: d,
            initialFocus: !0,
            className: "bg-background rounded-md"
          }
        )
      }
    )
  ] });
}
function nT({ value: e, onChange: t, onReset: n }) {
  return /* @__PURE__ */ R("div", { className: "rounded-lg border bg-card p-4", children: [
    /* @__PURE__ */ R("div", { className: "grid gap-4 md:grid-cols-3", children: [
      /* @__PURE__ */ R("div", { className: "space-y-2", children: [
        /* @__PURE__ */ u(en, { htmlFor: "filter-keyword", children: "Pencarian" }),
        /* @__PURE__ */ R("div", { className: "relative", children: [
          /* @__PURE__ */ u(Wc, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ u(
            Rs,
            {
              id: "filter-keyword",
              value: e.keyword,
              onChange: (r) => t({ ...e, keyword: r.target.value }),
              className: "pl-9",
              placeholder: "Cari judul atau nomor dokumen"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ R("div", { className: "space-y-2", children: [
        /* @__PURE__ */ u(en, { children: "Status" }),
        /* @__PURE__ */ R(ec, { value: e.status, onValueChange: (r) => t({ ...e, status: r }), children: [
          /* @__PURE__ */ u(ba, { children: /* @__PURE__ */ u(tc, { placeholder: "Semua status" }) }),
          /* @__PURE__ */ R(ya, { children: [
            /* @__PURE__ */ u(Ve, { value: "all", children: "Semua status" }),
            /* @__PURE__ */ u(Ve, { value: "draft", children: "Draft" }),
            /* @__PURE__ */ u(Ve, { value: "pending", children: "Menunggu verifikasi" }),
            /* @__PURE__ */ u(Ve, { value: "revised", children: "Perlu revisi" }),
            /* @__PURE__ */ u(Ve, { value: "approved", children: "Disetujui" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ R("div", { className: "space-y-2", children: [
        /* @__PURE__ */ u(en, { children: "Unit Kerja" }),
        /* @__PURE__ */ R(
          ec,
          {
            value: e.unitKerja,
            onValueChange: (r) => t({ ...e, unitKerja: r }),
            children: [
              /* @__PURE__ */ u(ba, { children: /* @__PURE__ */ u(tc, { placeholder: "Semua unit kerja" }) }),
              /* @__PURE__ */ R(ya, { children: [
                /* @__PURE__ */ u(Ve, { value: "all", children: "Semua unit kerja" }),
                /* @__PURE__ */ u(Ve, { value: "ipds", children: "IPDS" }),
                /* @__PURE__ */ u(Ve, { value: "sosial", children: "Statistik Sosial" }),
                /* @__PURE__ */ u(Ve, { value: "distribusi", children: "Statistik Distribusi" }),
                /* @__PURE__ */ u(Ve, { value: "produksi", children: "Statistik Produksi" })
              ] })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ u("div", { className: "mt-4 flex justify-end", children: /* @__PURE__ */ u(Ce, { variant: "outline", onClick: n, children: "Reset filter" }) })
  ] });
}
function rT({
  title: e,
  description: t,
  requiredCount: n,
  completedCount: r,
  action: o,
  className: a,
  children: s,
  ...i
}) {
  const d = typeof n == "number" && typeof r == "number" ? `${r}/${n} field terisi` : null;
  return /* @__PURE__ */ R("section", { className: k("rounded-lg border bg-card p-6 space-y-4", a), ...i, children: [
    /* @__PURE__ */ R("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ R("div", { className: "space-y-1", children: [
        /* @__PURE__ */ u("h3", { className: "text-base font-semibold text-foreground", children: e }),
        t ? /* @__PURE__ */ u("p", { className: "text-sm text-muted-foreground", children: t }) : null,
        d ? /* @__PURE__ */ u("p", { className: "text-xs text-muted-foreground", children: d }) : null
      ] }),
      o ? /* @__PURE__ */ u("div", { className: "shrink-0", children: o }) : null
    ] }),
    /* @__PURE__ */ u(Ym, {}),
    /* @__PURE__ */ u("div", { className: "space-y-4", children: s })
  ] });
}
function oT({ title: e, value: t, helper: n, icon: r, className: o, ...a }) {
  return /* @__PURE__ */ R(yr, { className: k("border-l-4 border-l-primary", o), ...a, children: [
    /* @__PURE__ */ u(wr, { className: "pb-2", children: /* @__PURE__ */ R(qa, { className: "flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground", children: [
      r,
      e
    ] }) }),
    /* @__PURE__ */ R(xr, { children: [
      /* @__PURE__ */ u("div", { className: "numeric text-2xl font-bold", children: t }),
      n ? /* @__PURE__ */ u("p", { className: "mt-1 text-xs text-muted-foreground", children: n }) : null
    ] })
  ] });
}
function aT({
  title: e,
  description: t,
  action: n,
  className: r,
  ...o
}) {
  return /* @__PURE__ */ R(
    "div",
    {
      className: k(
        "flex flex-col gap-3 border-b pb-4 md:flex-row md:items-end md:justify-between",
        r
      ),
      ...o,
      children: [
        /* @__PURE__ */ R("div", { children: [
          /* @__PURE__ */ u("h1", { className: "h2 text-foreground", children: e }),
          t ? /* @__PURE__ */ u("p", { className: "mt-1 text-sm text-muted-foreground", children: t }) : null
        ] }),
        n ? /* @__PURE__ */ u("div", { className: "shrink-0", children: n }) : null
      ]
    }
  );
}
const Ra = new Intl.NumberFormat("id-ID"), ac = Fe(
  "relative overflow-hidden transition-shadow duration-200 hover:shadow-md",
  {
    variants: {
      variant: {
        default: "border bg-card",
        glass: "border-white/40 bg-white/60 shadow-sm backdrop-blur-md",
        gradient: "border-l-4 border-l-primary bg-card"
      }
    },
    defaultVariants: { variant: "default" }
  }
);
function bM(e) {
  return typeof e == "number" ? Ra.format(e) : e;
}
function yM({ data: e, className: t }) {
  if (e.length < 2) return null;
  const n = 120, r = 36, o = Math.min(...e), s = Math.max(...e) - o || 1, i = n / (e.length - 1), c = e.map((d, m) => {
    const f = m * i, p = r - (d - o) / s * r;
    return `${f.toFixed(2)},${p.toFixed(2)}`;
  }).join(" ");
  return /* @__PURE__ */ u(
    "svg",
    {
      viewBox: `0 0 ${n} ${r}`,
      preserveAspectRatio: "none",
      className: k("h-9 w-full text-primary", t),
      role: "presentation",
      "aria-hidden": "true",
      children: /* @__PURE__ */ u(
        "polyline",
        {
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "1.5",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          points: c
        }
      )
    }
  );
}
function sT({
  title: e,
  value: t,
  unit: n,
  target: r,
  delta: o,
  trend: a,
  icon: s,
  variant: i,
  loading: c,
  className: d,
  ...m
}) {
  if (c)
    return /* @__PURE__ */ R(yr, { className: k(ac({ variant: i }), d), ...m, children: [
      /* @__PURE__ */ u(wr, { className: "pb-2", children: /* @__PURE__ */ u(ar, { className: "h-3 w-24" }) }),
      /* @__PURE__ */ R(xr, { className: "space-y-3", children: [
        /* @__PURE__ */ u(ar, { className: "h-8 w-32" }),
        /* @__PURE__ */ u(ar, { className: "h-4 w-20" }),
        /* @__PURE__ */ u(ar, { className: "h-9 w-full" })
      ] })
    ] });
  const f = typeof t == "number" && typeof r == "number" && r > 0 ? Math.min(Math.round(t / r * 100), 999) : null, p = (o == null ? void 0 : o.direction) === "up", h = p ? Xg : qg;
  return /* @__PURE__ */ R(yr, { className: k(ac({ variant: i }), d), ...m, children: [
    i === "gradient" ? /* @__PURE__ */ u(
      "div",
      {
        "aria-hidden": "true",
        className: "pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-br from-primary/10 to-transparent"
      }
    ) : null,
    /* @__PURE__ */ u(wr, { className: "relative flex flex-row items-start justify-between space-y-0 pb-2", children: /* @__PURE__ */ R(qa, { className: "flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground", children: [
      s ? /* @__PURE__ */ u(s, { className: "h-3.5 w-3.5", "aria-hidden": "true" }) : null,
      e
    ] }) }),
    /* @__PURE__ */ R(xr, { className: "relative space-y-3", children: [
      /* @__PURE__ */ R("div", { className: "flex items-baseline gap-2", children: [
        /* @__PURE__ */ u("span", { className: "text-3xl font-bold tabular-nums text-foreground", children: bM(t) }),
        n ? /* @__PURE__ */ u("span", { className: "text-sm font-medium text-muted-foreground", children: n }) : null
      ] }),
      o ? /* @__PURE__ */ R(
        "div",
        {
          className: k(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
            p ? "bg-feedback-success-bg text-feedback-success" : "bg-feedback-danger-bg text-feedback-danger"
          ),
          children: [
            /* @__PURE__ */ u(h, { className: "h-3 w-3", "aria-hidden": "true" }),
            /* @__PURE__ */ R("span", { className: "tabular-nums", children: [
              Ra.format(o.value),
              "%"
            ] }),
            /* @__PURE__ */ u("span", { className: "text-muted-foreground", children: "·" }),
            /* @__PURE__ */ u("span", { className: "text-muted-foreground", children: o.period })
          ]
        }
      ) : null,
      f !== null && typeof r == "number" ? /* @__PURE__ */ R("p", { className: "text-xs text-muted-foreground", children: [
        /* @__PURE__ */ R("span", { className: "font-medium tabular-nums text-foreground", children: [
          f,
          "%"
        ] }),
        " dari target ",
        Ra.format(r)
      ] }) : null,
      a && a.length > 1 ? /* @__PURE__ */ u(yM, { data: a }) : null
    ] })
  ] });
}
function iT({ totalChecklist: e, completedChecklist: t }) {
  const n = Math.max(e, 1), r = Math.min(Math.round(t / n * 100), 100);
  return /* @__PURE__ */ R("div", { className: "rounded-lg border bg-card p-4 space-y-2", children: [
    /* @__PURE__ */ u("p", { className: "text-sm font-medium text-foreground", children: "Progress Kelengkapan Dokumen" }),
    /* @__PURE__ */ u(Pf, { value: r }),
    /* @__PURE__ */ R("p", { className: "text-xs text-muted-foreground", children: [
      t,
      "/",
      n,
      " indikator terpenuhi (",
      r,
      "%)"
    ] })
  ] });
}
function cT({ items: e, className: t, ...n }) {
  return /* @__PURE__ */ R("div", { className: k("rounded-lg border bg-card p-4", t), ...n, children: [
    /* @__PURE__ */ u("h3", { className: "mb-4 text-base font-semibold text-foreground", children: "Timeline Review Dokumen" }),
    /* @__PURE__ */ u("ol", { className: "space-y-4", children: e.map((r) => /* @__PURE__ */ R("li", { className: "relative pl-6", children: [
      /* @__PURE__ */ u("span", { className: "absolute left-0 top-2 h-2.5 w-2.5 rounded-full bg-primary" }),
      /* @__PURE__ */ R("div", { className: "space-y-1 rounded-md border bg-background p-3", children: [
        /* @__PURE__ */ R("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
          /* @__PURE__ */ R("p", { className: "text-sm font-medium text-foreground", children: [
            r.actor,
            " - ",
            r.role
          ] }),
          /* @__PURE__ */ u(tR, { variant: r.status, children: r.status })
        ] }),
        /* @__PURE__ */ u("p", { className: "text-sm text-muted-foreground", children: r.note }),
        /* @__PURE__ */ u("p", { className: "text-xs text-muted-foreground", children: r.date })
      ] })
    ] }, r.id)) })
  ] });
}
function lT({
  items: e,
  onNavigate: t,
  className: n,
  ...r
}) {
  return e.length === 0 ? /* @__PURE__ */ u(
    "div",
    {
      className: k(
        "rounded-lg border border-feedback-success/30 bg-feedback-success-bg p-4",
        n
      ),
      ...r,
      children: /* @__PURE__ */ u("p", { className: "text-sm font-medium text-feedback-success", children: "Semua validasi terpenuhi." })
    }
  ) : /* @__PURE__ */ u(
    "div",
    {
      className: k(
        "rounded-lg border border-feedback-danger/30 bg-feedback-danger-bg p-4",
        n
      ),
      ...r,
      children: /* @__PURE__ */ R("div", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ u(Wa, { className: "mt-0.5 h-4 w-4 text-feedback-danger" }),
        /* @__PURE__ */ R("div", { className: "space-y-2", children: [
          /* @__PURE__ */ R("p", { className: "text-sm font-semibold text-foreground", children: [
            "Terdapat ",
            e.length,
            " validasi yang perlu diperbaiki."
          ] }),
          /* @__PURE__ */ u("ul", { className: "space-y-1", children: e.map((o) => /* @__PURE__ */ u("li", { children: /* @__PURE__ */ R(
            "button",
            {
              type: "button",
              className: "text-left text-sm text-feedback-danger underline-offset-2 hover:underline",
              onClick: () => t == null ? void 0 : t(o.id),
              children: [
                "[",
                o.section,
                "] ",
                o.message
              ]
            }
          ) }, o.id)) })
        ] })
      ] })
    }
  );
}
function wM({ className: e }) {
  return /* @__PURE__ */ R(
    "svg",
    {
      viewBox: "0 0 200 160",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: e,
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ u("line", { x1: "0", y1: "80", x2: "200", y2: "80", stroke: "hsl(var(--border-subtle))", strokeWidth: "1" }),
        /* @__PURE__ */ u("line", { x1: "100", y1: "0", x2: "100", y2: "160", stroke: "hsl(var(--border-subtle))", strokeWidth: "1" }),
        /* @__PURE__ */ u("rect", { x: "60", y: "50", width: "70", height: "85", rx: "3", fill: "hsl(var(--warm-100-hsl))", stroke: "hsl(var(--border-default))", strokeWidth: "1.5" }),
        /* @__PURE__ */ u("rect", { x: "55", y: "44", width: "70", height: "85", rx: "3", fill: "hsl(var(--surface-raised))", stroke: "hsl(var(--border-default))", strokeWidth: "1.5" }),
        /* @__PURE__ */ u("rect", { x: "50", y: "38", width: "70", height: "85", rx: "3", fill: "hsl(var(--surface-raised))", stroke: "hsl(var(--border-strong))", strokeWidth: "1.5" }),
        /* @__PURE__ */ u("line", { x1: "62", y1: "58", x2: "108", y2: "58", stroke: "hsl(var(--border-default))", strokeWidth: "1.5", strokeLinecap: "round" }),
        /* @__PURE__ */ u("line", { x1: "62", y1: "68", x2: "100", y2: "68", stroke: "hsl(var(--border-default))", strokeWidth: "1.5", strokeLinecap: "round" }),
        /* @__PURE__ */ u("line", { x1: "62", y1: "78", x2: "104", y2: "78", stroke: "hsl(var(--border-default))", strokeWidth: "1.5", strokeLinecap: "round" }),
        /* @__PURE__ */ u("line", { x1: "62", y1: "88", x2: "95", y2: "88", stroke: "hsl(var(--border-default))", strokeWidth: "1.5", strokeLinecap: "round" }),
        /* @__PURE__ */ u("circle", { cx: "152", cy: "36", r: "12", fill: "hsl(var(--amber-100))" }),
        /* @__PURE__ */ u("circle", { cx: "152", cy: "36", r: "6", fill: "hsl(var(--amber-400))" })
      ]
    }
  );
}
function xM({ className: e }) {
  return /* @__PURE__ */ R("svg", { viewBox: "0 0 200 160", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: e, "aria-hidden": "true", children: [
    /* @__PURE__ */ u("line", { x1: "0", y1: "80", x2: "200", y2: "80", stroke: "hsl(var(--border-subtle))", strokeWidth: "1" }),
    /* @__PURE__ */ u("circle", { cx: "90", cy: "72", r: "38", fill: "hsl(var(--surface-raised))", stroke: "hsl(var(--border-strong))", strokeWidth: "2" }),
    /* @__PURE__ */ u("circle", { cx: "90", cy: "72", r: "24", fill: "hsl(var(--warm-50-hsl))" }),
    /* @__PURE__ */ u("line", { x1: "120", y1: "101", x2: "150", y2: "130", stroke: "hsl(var(--border-strong))", strokeWidth: "3", strokeLinecap: "round" }),
    /* @__PURE__ */ u("line", { x1: "80", y1: "65", x2: "100", y2: "65", stroke: "hsl(var(--border-default))", strokeWidth: "1.5", strokeLinecap: "round" }),
    /* @__PURE__ */ u("line", { x1: "80", y1: "73", x2: "95", y2: "73", stroke: "hsl(var(--border-default))", strokeWidth: "1.5", strokeLinecap: "round" }),
    /* @__PURE__ */ u("circle", { cx: "148", cy: "128", r: "8", fill: "hsl(var(--amber-400))" })
  ] });
}
function SM({ className: e }) {
  return /* @__PURE__ */ R("svg", { viewBox: "0 0 200 160", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: e, "aria-hidden": "true", children: [
    /* @__PURE__ */ u("line", { x1: "0", y1: "80", x2: "200", y2: "80", stroke: "hsl(var(--border-subtle))", strokeWidth: "1" }),
    /* @__PURE__ */ u("rect", { x: "60", y: "35", width: "80", height: "90", rx: "4", fill: "hsl(var(--surface-raised))", stroke: "hsl(var(--crimson-300))", strokeWidth: "2" }),
    /* @__PURE__ */ u("rect", { x: "60", y: "35", width: "80", height: "24", rx: "4", fill: "hsl(var(--crimson-50))" }),
    /* @__PURE__ */ u("rect", { x: "60", y: "47", width: "80", height: "12", fill: "hsl(var(--crimson-50))" }),
    /* @__PURE__ */ u("line", { x1: "95", y1: "80", x2: "105", y2: "90", stroke: "hsl(var(--crimson-600))", strokeWidth: "2.5", strokeLinecap: "round" }),
    /* @__PURE__ */ u("line", { x1: "105", y1: "80", x2: "95", y2: "90", stroke: "hsl(var(--crimson-600))", strokeWidth: "2.5", strokeLinecap: "round" }),
    /* @__PURE__ */ u("circle", { cx: "100", cy: "105", r: "3", fill: "hsl(var(--crimson-400))" }),
    /* @__PURE__ */ u("line", { x1: "100", y1: "96", x2: "100", y2: "103", stroke: "hsl(var(--crimson-400))", strokeWidth: "2", strokeLinecap: "round" })
  ] });
}
const CM = {
  empty: wM,
  search: xM,
  error: SM
};
function dT({
  illustration: e = "empty",
  title: t,
  description: n,
  action: r,
  secondaryAction: o,
  className: a,
  compact: s = !1
}) {
  const i = typeof e == "string" ? CM[e] : null;
  return /* @__PURE__ */ R(
    "div",
    {
      className: k(
        "flex flex-col items-center justify-center text-center",
        s ? "gap-3 py-8 px-4" : "gap-4 py-16 px-6",
        a
      ),
      children: [
        i ? /* @__PURE__ */ u(i, { className: k(s ? "w-28 h-24" : "w-40 h-32") }) : e,
        /* @__PURE__ */ R("div", { className: "space-y-1.5 max-w-sm", children: [
          /* @__PURE__ */ u(
            "h3",
            {
              className: k(
                "font-semibold text-content-primary",
                s ? "text-body-sm" : "text-h3"
              ),
              children: t
            }
          ),
          n && /* @__PURE__ */ u("p", { className: k("text-content-secondary", s ? "text-caption" : "text-body-sm"), children: n })
        ] }),
        (r || o) && /* @__PURE__ */ R("div", { className: "flex items-center gap-2 flex-wrap justify-center", children: [
          r && /* @__PURE__ */ u(
            Ce,
            {
              variant: r.variant ?? "default",
              size: s ? "sm" : "default",
              onClick: r.onClick,
              children: r.label
            }
          ),
          o && /* @__PURE__ */ u(Ce, { variant: "ghost", size: s ? "sm" : "default", onClick: o.onClick, children: o.label })
        ] })
      ]
    }
  );
}
export {
  PM as Accordion,
  cv as AccordionContent,
  sv as AccordionItem,
  iv as AccordionTrigger,
  uv as Alert,
  mv as AlertDescription,
  fv as AlertTitle,
  Kc as Avatar,
  qc as AvatarFallback,
  Iv as AvatarGroup,
  Av as AvatarImage,
  RM as Badge,
  XM as BpsAppTopbar,
  QM as BpsBulkActionBar,
  qM as BpsCombobox,
  ZM as BpsConfirmActionDialog,
  JM as BpsDataStatePanel,
  eT as BpsDataTable,
  tT as BpsDatePicker,
  nT as BpsFilterBar,
  rT as BpsFormSection,
  oT as BpsKpiCard,
  aT as BpsPageHeader,
  sT as BpsPerformanceCard,
  iT as BpsProgressAudit,
  cT as BpsReviewTimeline,
  lT as BpsValidationSummary,
  Wv as Breadcrumb,
  Yv as BreadcrumbEllipsis,
  Lv as BreadcrumbItem,
  Bv as BreadcrumbLink,
  Fv as BreadcrumbList,
  Vv as BreadcrumbPage,
  Hv as BreadcrumbSeparator,
  Ce as Button,
  fx as Calendar,
  yr as Card,
  xr as CardContent,
  px as CardDescription,
  hx as CardFooter,
  wr as CardHeader,
  qa as CardTitle,
  wx as Checkbox,
  as as Command,
  _M as CommandDialog,
  Ed as CommandEmpty,
  kd as CommandGroup,
  Cd as CommandInput,
  Pd as CommandItem,
  Nd as CommandList,
  dC as CommandSeparator,
  uC as CommandShortcut,
  vd as Dialog,
  TM as DialogClose,
  os as DialogContent,
  Sd as DialogDescription,
  wd as DialogFooter,
  yd as DialogHeader,
  bd as DialogOverlay,
  lC as DialogPortal,
  xd as DialogTitle,
  cC as DialogTrigger,
  DM as DropdownMenu,
  eE as DropdownMenuCheckboxItem,
  QN as DropdownMenuContent,
  AM as DropdownMenuGroup,
  JN as DropdownMenuItem,
  nE as DropdownMenuLabel,
  IM as DropdownMenuPortal,
  WM as DropdownMenuRadioGroup,
  tE as DropdownMenuRadioItem,
  rE as DropdownMenuSeparator,
  oE as DropdownMenuShortcut,
  $M as DropdownMenuSub,
  ZN as DropdownMenuSubContent,
  XN as DropdownMenuSubTrigger,
  OM as DropdownMenuTrigger,
  dT as EmptyState,
  FM as Form,
  EE as FormControl,
  kE as FormDescription,
  LM as FormField,
  CE as FormItem,
  NE as FormLabel,
  PE as FormMessage,
  Rs as Input,
  en as Label,
  RE as Pagination,
  ME as PaginationContent,
  OE as PaginationEllipsis,
  TE as PaginationItem,
  Ms as PaginationLink,
  DE as PaginationNext,
  _E as PaginationPrevious,
  yf as Popover,
  _s as PopoverContent,
  wf as PopoverTrigger,
  Pf as Progress,
  xk as RadioGroup,
  Sk as RadioGroupItem,
  $k as ScrollArea,
  tm as ScrollBar,
  ec as Select,
  ya as SelectContent,
  BM as SelectGroup,
  Ve as SelectItem,
  yP as SelectLabel,
  Bm as SelectScrollDownButton,
  Lm as SelectScrollUpButton,
  wP as SelectSeparator,
  ba as SelectTrigger,
  tc as SelectValue,
  Ym as Separator,
  VM as Sheet,
  YM as SheetClose,
  RP as SheetContent,
  DP as SheetDescription,
  TP as SheetFooter,
  MP as SheetHeader,
  zm as SheetOverlay,
  kP as SheetPortal,
  _P as SheetTitle,
  HM as SheetTrigger,
  ar as Skeleton,
  ZP as Slider,
  JP as Spinner,
  tR as StatusBadge,
  iR as Switch,
  cR as Table,
  dR as TableBody,
  hR as TableCaption,
  pR as TableCell,
  uR as TableFooter,
  mR as TableHead,
  lR as TableHeader,
  fR as TableRow,
  zM as Tabs,
  xR as TabsContent,
  yR as TabsList,
  wR as TabsTrigger,
  Ep as Textarea,
  Gp as Toast,
  HR as ToastAction,
  Up as ToastClose,
  qp as ToastDescription,
  BR as ToastProvider,
  Kp as ToastTitle,
  jp as ToastViewport,
  jM as Toaster,
  UM as Tooltip,
  vM as TooltipContent,
  GM as TooltipProvider,
  KM as TooltipTrigger,
  br as buttonVariants,
  k as cn,
  ao as useFormField,
  KR as useToast
};
//# sourceMappingURL=index.js.map
