import { jsx as m, jsxs as G, Fragment as Je } from "react/jsx-runtime";
import * as l from "react";
import R, { forwardRef as zi, createElement as jo, createContext as eh, useContext as th, useCallback as Ae, useRef as or, useLayoutEffect as Gi, useState as fr, useEffect as nh, useMemo as ar } from "react";
import * as kn from "react-dom";
import rh from "react-dom";
function ji(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = ji(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function Ui() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = ji(e)) && (r && (r += " "), r += t);
  return r;
}
const wa = "-", oh = (e) => {
  const t = sh(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (s) => {
      const i = s.split(wa);
      return i[0] === "" && i.length !== 1 && i.shift(), Ki(i, t) || ah(s);
    },
    getConflictingClassGroupIds: (s, i) => {
      const c = n[s] || [];
      return i && r[s] ? [...c, ...r[s]] : c;
    }
  };
}, Ki = (e, t) => {
  var s;
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? Ki(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const a = e.join(wa);
  return (s = t.validators.find(({
    validator: i
  }) => i(a))) == null ? void 0 : s.classGroupId;
}, Ws = /^\[(.+)\]$/, ah = (e) => {
  if (Ws.test(e)) {
    const t = Ws.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, sh = (e) => {
  const {
    theme: t,
    prefix: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return ch(Object.entries(e.classGroups), n).forEach(([a, s]) => {
    Uo(s, r, a, t);
  }), r;
}, Uo = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const a = o === "" ? t : Fs(t, o);
      a.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (ih(o)) {
        Uo(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([a, s]) => {
      Uo(s, Fs(t, a), n, r);
    });
  });
}, Fs = (e, t) => {
  let n = e;
  return t.split(wa).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, ih = (e) => e.isThemeGetter, ch = (e, t) => t ? e.map(([n, r]) => {
  const o = r.map((a) => typeof a == "string" ? t + a : typeof a == "object" ? Object.fromEntries(Object.entries(a).map(([s, i]) => [t + s, i])) : a);
  return [n, o];
}) : e, lh = (e) => {
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
}, qi = "!", uh = (e) => {
  const {
    separator: t,
    experimentalParseClassName: n
  } = e, r = t.length === 1, o = t[0], a = t.length, s = (i) => {
    const c = [];
    let u = 0, d = 0, f;
    for (let v = 0; v < i.length; v++) {
      let w = i[v];
      if (u === 0) {
        if (w === o && (r || i.slice(v, v + a) === t)) {
          c.push(i.slice(d, v)), d = v + a;
          continue;
        }
        if (w === "/") {
          f = v;
          continue;
        }
      }
      w === "[" ? u++ : w === "]" && u--;
    }
    const p = c.length === 0 ? i : i.substring(d), h = p.startsWith(qi), b = h ? p.substring(1) : p, g = f && f > d ? f - d : void 0;
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
}, dh = (e) => {
  if (e.length <= 1)
    return e;
  const t = [];
  let n = [];
  return e.forEach((r) => {
    r[0] === "[" ? (t.push(...n.sort(), r), n = []) : n.push(r);
  }), t.push(...n.sort()), t;
}, fh = (e) => ({
  cache: lh(e.cacheSize),
  parseClassName: uh(e),
  ...oh(e)
}), mh = /\s+/, ph = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o
  } = t, a = [], s = e.trim().split(mh);
  let i = "";
  for (let c = s.length - 1; c >= 0; c -= 1) {
    const u = s[c], {
      modifiers: d,
      hasImportantModifier: f,
      baseClassName: p,
      maybePostfixModifierPosition: h
    } = n(u);
    let b = !!h, g = r(b ? p.substring(0, h) : p);
    if (!g) {
      if (!b) {
        i = u + (i.length > 0 ? " " + i : i);
        continue;
      }
      if (g = r(p), !g) {
        i = u + (i.length > 0 ? " " + i : i);
        continue;
      }
      b = !1;
    }
    const v = dh(d).join(":"), w = f ? v + qi : v, y = w + g;
    if (a.includes(y))
      continue;
    a.push(y);
    const x = o(g, b);
    for (let S = 0; S < x.length; ++S) {
      const E = x[S];
      a.push(w + E);
    }
    i = u + (i.length > 0 ? " " + i : i);
  }
  return i;
};
function hh() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = Xi(t)) && (r && (r += " "), r += n);
  return r;
}
const Xi = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = Xi(e[r])) && (n && (n += " "), n += t);
  return n;
};
function gh(e, ...t) {
  let n, r, o, a = s;
  function s(c) {
    const u = t.reduce((d, f) => f(d), e());
    return n = fh(u), r = n.cache.get, o = n.cache.set, a = i, i(c);
  }
  function i(c) {
    const u = r(c);
    if (u)
      return u;
    const d = ph(c, n);
    return o(c, d), d;
  }
  return function() {
    return a(hh.apply(null, arguments));
  };
}
const fe = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, Zi = /^\[(?:([a-z-]+):)?(.+)\]$/i, vh = /^\d+\/\d+$/, bh = /* @__PURE__ */ new Set(["px", "full", "screen"]), yh = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, wh = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, xh = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Sh = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Ch = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, rt = (e) => qt(e) || bh.has(e) || vh.test(e), ut = (e) => on(e, "length", _h), qt = (e) => !!e && !Number.isNaN(Number(e)), wo = (e) => on(e, "number", qt), mn = (e) => !!e && Number.isInteger(Number(e)), Eh = (e) => e.endsWith("%") && qt(e.slice(0, -1)), re = (e) => Zi.test(e), dt = (e) => yh.test(e), Nh = /* @__PURE__ */ new Set(["length", "size", "percentage"]), Ph = (e) => on(e, Nh, Qi), Rh = (e) => on(e, "position", Qi), kh = /* @__PURE__ */ new Set(["image", "url"]), Mh = (e) => on(e, kh, Oh), Th = (e) => on(e, "", Dh), pn = () => !0, on = (e, t, n) => {
  const r = Zi.exec(e);
  return r ? r[1] ? typeof t == "string" ? r[1] === t : t.has(r[1]) : n(r[2]) : !1;
}, _h = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  wh.test(e) && !xh.test(e)
), Qi = () => !1, Dh = (e) => Sh.test(e), Oh = (e) => Ch.test(e), Ah = () => {
  const e = fe("colors"), t = fe("spacing"), n = fe("blur"), r = fe("brightness"), o = fe("borderColor"), a = fe("borderRadius"), s = fe("borderSpacing"), i = fe("borderWidth"), c = fe("contrast"), u = fe("grayscale"), d = fe("hueRotate"), f = fe("invert"), p = fe("gap"), h = fe("gradientColorStops"), b = fe("gradientColorStopPositions"), g = fe("inset"), v = fe("margin"), w = fe("opacity"), y = fe("padding"), x = fe("saturate"), S = fe("scale"), E = fe("sepia"), C = fe("skew"), N = fe("space"), M = fe("translate"), _ = () => ["auto", "contain", "none"], O = () => ["auto", "hidden", "clip", "visible", "scroll"], $ = () => ["auto", re, t], I = () => [re, t], Y = () => ["", rt, ut], D = () => ["auto", qt, re], z = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], B = () => ["solid", "dashed", "dotted", "double", "none"], j = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], L = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], A = () => ["", "0", re], Z = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], Q = () => [qt, re];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [pn],
      spacing: [rt, ut],
      blur: ["none", "", dt, re],
      brightness: Q(),
      borderColor: [e],
      borderRadius: ["none", "", "full", dt, re],
      borderSpacing: I(),
      borderWidth: Y(),
      contrast: Q(),
      grayscale: A(),
      hueRotate: Q(),
      invert: A(),
      gap: I(),
      gradientColorStops: [e],
      gradientColorStopPositions: [Eh, ut],
      inset: $(),
      margin: $(),
      opacity: Q(),
      padding: I(),
      saturate: Q(),
      scale: Q(),
      sepia: A(),
      skew: Q(),
      space: I(),
      translate: I()
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
        columns: [dt]
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
        object: [...z(), re]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: O()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": O()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": O()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: _()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": _()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": _()
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
        z: ["auto", mn, re]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: $()
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
        grow: A()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: A()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", mn, re]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [pn]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", mn, re]
        }, re]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": D()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": D()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [pn]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [mn, re]
        }, re]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": D()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": D()
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
        justify: ["normal", ...L()]
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
        content: ["normal", ...L(), "baseline"]
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
        "place-content": [...L(), "baseline"]
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
        "space-x": [N]
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
        "space-y": [N]
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
          screen: [dt]
        }, dt]
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
        text: ["base", dt, ut]
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
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", wo]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [pn]
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
        "line-clamp": ["none", qt, wo]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", rt, re]
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
        decoration: [...B(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", rt, ut]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", rt, re]
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
        indent: I()
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
        bg: [...z(), Rh]
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
        bg: ["auto", "cover", "contain", Ph]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Mh]
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
        border: [...B(), "hidden"]
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
        divide: B()
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
        outline: ["", ...B()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [rt, re]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [rt, ut]
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
        ring: Y()
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
        "ring-offset": [rt, ut]
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
        shadow: ["", "inner", "none", dt, Th]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [pn]
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
        "mix-blend": [...j(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": j()
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
        "drop-shadow": ["", "none", dt, re]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [u]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [d]
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
        sepia: [E]
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
        "backdrop-grayscale": [u]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [d]
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
        "backdrop-sepia": [E]
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
        rotate: [mn, re]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [M]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [M]
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
        "scroll-m": I()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": I()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": I()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": I()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": I()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": I()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": I()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": I()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": I()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": I()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": I()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": I()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": I()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": I()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": I()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": I()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": I()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": I()
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
        stroke: [rt, ut, wo]
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
}, Ih = /* @__PURE__ */ gh(Ah);
function P(...e) {
  return Ih(Ui(e));
}
function $h(e, t) {
  const n = l.createContext(t), r = (a) => {
    const { children: s, ...i } = a, c = l.useMemo(() => i, Object.values(i));
    return /* @__PURE__ */ m(n.Provider, { value: c, children: s });
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
function ye(e, t = []) {
  let n = [];
  function r(a, s) {
    const i = l.createContext(s), c = n.length;
    n = [...n, s];
    const u = (f) => {
      var w;
      const { scope: p, children: h, ...b } = f, g = ((w = p == null ? void 0 : p[e]) == null ? void 0 : w[c]) || i, v = l.useMemo(() => b, Object.values(b));
      return /* @__PURE__ */ m(g.Provider, { value: v, children: h });
    };
    u.displayName = a + "Provider";
    function d(f, p) {
      var g;
      const h = ((g = p == null ? void 0 : p[e]) == null ? void 0 : g[c]) || i, b = l.useContext(h);
      if (b) return b;
      if (s !== void 0) return s;
      throw new Error(`\`${f}\` must be used within \`${a}\``);
    }
    return [u, d];
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
  return o.scopeName = e, [r, Wh(o, ...t)];
}
function Wh(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(a) {
      const s = r.reduce((i, { useScope: c, scopeName: u }) => {
        const f = c(a)[`__scope${u}`];
        return { ...i, ...f };
      }, {});
      return l.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function Ls(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Ne(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const a = Ls(o, t);
      return !n && typeof a == "function" && (n = !0), a;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const a = r[o];
          typeof a == "function" ? a() : Ls(e[o], null);
        }
      };
  };
}
function q(...e) {
  return l.useCallback(Ne(...e), e);
}
// @__NO_SIDE_EFFECTS__
function Bs(e) {
  const t = /* @__PURE__ */ Fh(e), n = l.forwardRef((r, o) => {
    const { children: a, ...s } = r, i = l.Children.toArray(a), c = i.find(Bh);
    if (c) {
      const u = c.props.children, d = i.map((f) => f === c ? l.Children.count(u) > 1 ? l.Children.only(null) : l.isValidElement(u) ? u.props.children : null : f);
      return /* @__PURE__ */ m(t, { ...s, ref: o, children: l.isValidElement(u) ? l.cloneElement(u, void 0, d) : null });
    }
    return /* @__PURE__ */ m(t, { ...s, ref: o, children: a });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function Fh(e) {
  const t = l.forwardRef((n, r) => {
    const { children: o, ...a } = n;
    if (l.isValidElement(o)) {
      const s = Hh(o), i = Vh(a, o.props);
      return o.type !== l.Fragment && (i.ref = r ? Ne(r, s) : s), l.cloneElement(o, i);
    }
    return l.Children.count(o) > 1 ? l.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Lh = Symbol("radix.slottable");
function Bh(e) {
  return l.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Lh;
}
function Vh(e, t) {
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
function Hh(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function an(e) {
  const t = e + "CollectionProvider", [n, r] = ye(t), [o, a] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), s = (g) => {
    const { scope: v, children: w } = g, y = R.useRef(null), x = R.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ m(o, { scope: v, itemMap: x, collectionRef: y, children: w });
  };
  s.displayName = t;
  const i = e + "CollectionSlot", c = /* @__PURE__ */ Bs(i), u = R.forwardRef(
    (g, v) => {
      const { scope: w, children: y } = g, x = a(i, w), S = q(v, x.collectionRef);
      return /* @__PURE__ */ m(c, { ref: S, children: y });
    }
  );
  u.displayName = i;
  const d = e + "CollectionItemSlot", f = "data-radix-collection-item", p = /* @__PURE__ */ Bs(d), h = R.forwardRef(
    (g, v) => {
      const { scope: w, children: y, ...x } = g, S = R.useRef(null), E = q(v, S), C = a(d, w);
      return R.useEffect(() => (C.itemMap.set(S, { ref: S, ...x }), () => void C.itemMap.delete(S))), /* @__PURE__ */ m(p, { [f]: "", ref: E, children: y });
    }
  );
  h.displayName = d;
  function b(g) {
    const v = a(e + "CollectionConsumer", g);
    return R.useCallback(() => {
      const y = v.collectionRef.current;
      if (!y) return [];
      const x = Array.from(y.querySelectorAll(`[${f}]`));
      return Array.from(v.itemMap.values()).sort(
        (C, N) => x.indexOf(C.ref.current) - x.indexOf(N.ref.current)
      );
    }, [v.collectionRef, v.itemMap]);
  }
  return [
    { Provider: s, Slot: u, ItemSlot: h },
    b,
    r
  ];
}
function T(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e == null || e(o), n === !1 || !o.defaultPrevented)
      return t == null ? void 0 : t(o);
  };
}
var ge = globalThis != null && globalThis.document ? l.useLayoutEffect : () => {
}, Yh = l[" useInsertionEffect ".trim().toString()] || ge;
function we({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, a, s] = zh({
    defaultProp: t,
    onChange: n
  }), i = e !== void 0, c = i ? e : o;
  {
    const d = l.useRef(e !== void 0);
    l.useEffect(() => {
      const f = d.current;
      f !== i && console.warn(
        `${r} is changing from ${f ? "controlled" : "uncontrolled"} to ${i ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), d.current = i;
    }, [i, r]);
  }
  const u = l.useCallback(
    (d) => {
      var f;
      if (i) {
        const p = Gh(d) ? d(e) : d;
        p !== e && ((f = s.current) == null || f.call(s, p));
      } else
        a(d);
    },
    [i, e, a, s]
  );
  return [c, u];
}
function zh({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = l.useState(e), o = l.useRef(n), a = l.useRef(t);
  return Yh(() => {
    a.current = t;
  }, [t]), l.useEffect(() => {
    var s;
    o.current !== n && ((s = a.current) == null || s.call(a, n), o.current = n);
  }, [n, o]), [n, r, a];
}
function Gh(e) {
  return typeof e == "function";
}
// @__NO_SIDE_EFFECTS__
function jh(e) {
  const t = /* @__PURE__ */ Uh(e), n = l.forwardRef((r, o) => {
    const { children: a, ...s } = r, i = l.Children.toArray(a), c = i.find(qh);
    if (c) {
      const u = c.props.children, d = i.map((f) => f === c ? l.Children.count(u) > 1 ? l.Children.only(null) : l.isValidElement(u) ? u.props.children : null : f);
      return /* @__PURE__ */ m(t, { ...s, ref: o, children: l.isValidElement(u) ? l.cloneElement(u, void 0, d) : null });
    }
    return /* @__PURE__ */ m(t, { ...s, ref: o, children: a });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function Uh(e) {
  const t = l.forwardRef((n, r) => {
    const { children: o, ...a } = n;
    if (l.isValidElement(o)) {
      const s = Zh(o), i = Xh(a, o.props);
      return o.type !== l.Fragment && (i.ref = r ? Ne(r, s) : s), l.cloneElement(o, i);
    }
    return l.Children.count(o) > 1 ? l.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Kh = Symbol("radix.slottable");
function qh(e) {
  return l.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Kh;
}
function Xh(e, t) {
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
function Zh(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Qh = [
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
], F = Qh.reduce((e, t) => {
  const n = /* @__PURE__ */ jh(`Primitive.${t}`), r = l.forwardRef((o, a) => {
    const { asChild: s, ...i } = o, c = s ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ m(c, { ...i, ref: a });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function xa(e, t) {
  e && kn.flushSync(() => e.dispatchEvent(t));
}
function Jh(e, t) {
  return l.useReducer((n, r) => t[n][r] ?? n, e);
}
var ve = (e) => {
  const { present: t, children: n } = e, r = eg(t), o = typeof n == "function" ? n({ present: r.isPresent }) : l.Children.only(n), a = q(r.ref, tg(o));
  return typeof n == "function" || r.isPresent ? l.cloneElement(o, { ref: a }) : null;
};
ve.displayName = "Presence";
function eg(e) {
  const [t, n] = l.useState(), r = l.useRef(null), o = l.useRef(e), a = l.useRef("none"), s = e ? "mounted" : "unmounted", [i, c] = Jh(s, {
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
    const u = Xn(r.current);
    a.current = i === "mounted" ? u : "none";
  }, [i]), ge(() => {
    const u = r.current, d = o.current;
    if (d !== e) {
      const p = a.current, h = Xn(u);
      e ? c("MOUNT") : h === "none" || (u == null ? void 0 : u.display) === "none" ? c("UNMOUNT") : c(d && p !== h ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, c]), ge(() => {
    if (t) {
      let u;
      const d = t.ownerDocument.defaultView ?? window, f = (h) => {
        const g = Xn(r.current).includes(CSS.escape(h.animationName));
        if (h.target === t && g && (c("ANIMATION_END"), !o.current)) {
          const v = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", u = d.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = v);
          });
        }
      }, p = (h) => {
        h.target === t && (a.current = Xn(r.current));
      };
      return t.addEventListener("animationstart", p), t.addEventListener("animationcancel", f), t.addEventListener("animationend", f), () => {
        d.clearTimeout(u), t.removeEventListener("animationstart", p), t.removeEventListener("animationcancel", f), t.removeEventListener("animationend", f);
      };
    } else
      c("ANIMATION_END");
  }, [t, c]), {
    isPresent: ["mounted", "unmountSuspended"].includes(i),
    ref: l.useCallback((u) => {
      r.current = u ? getComputedStyle(u) : null, n(u);
    }, [])
  };
}
function Xn(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function tg(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var ng = l[" useId ".trim().toString()] || (() => {
}), rg = 0;
function he(e) {
  const [t, n] = l.useState(ng());
  return ge(() => {
    n((r) => r ?? String(rg++));
  }, [e]), t ? `radix-${t}` : "";
}
var Rr = "Collapsible", [og, Ji] = ye(Rr), [ag, Sa] = og(Rr), ec = l.forwardRef(
  (e, t) => {
    const {
      __scopeCollapsible: n,
      open: r,
      defaultOpen: o,
      disabled: a,
      onOpenChange: s,
      ...i
    } = e, [c, u] = we({
      prop: r,
      defaultProp: o ?? !1,
      onChange: s,
      caller: Rr
    });
    return /* @__PURE__ */ m(
      ag,
      {
        scope: n,
        disabled: a,
        contentId: he(),
        open: c,
        onOpenToggle: l.useCallback(() => u((d) => !d), [u]),
        children: /* @__PURE__ */ m(
          F.div,
          {
            "data-state": Ea(c),
            "data-disabled": a ? "" : void 0,
            ...i,
            ref: t
          }
        )
      }
    );
  }
);
ec.displayName = Rr;
var tc = "CollapsibleTrigger", nc = l.forwardRef(
  (e, t) => {
    const { __scopeCollapsible: n, ...r } = e, o = Sa(tc, n);
    return /* @__PURE__ */ m(
      F.button,
      {
        type: "button",
        "aria-controls": o.contentId,
        "aria-expanded": o.open || !1,
        "data-state": Ea(o.open),
        "data-disabled": o.disabled ? "" : void 0,
        disabled: o.disabled,
        ...r,
        ref: t,
        onClick: T(e.onClick, o.onOpenToggle)
      }
    );
  }
);
nc.displayName = tc;
var Ca = "CollapsibleContent", rc = l.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = Sa(Ca, e.__scopeCollapsible);
    return /* @__PURE__ */ m(ve, { present: n || o.open, children: ({ present: a }) => /* @__PURE__ */ m(sg, { ...r, ref: t, present: a }) });
  }
);
rc.displayName = Ca;
var sg = l.forwardRef((e, t) => {
  const { __scopeCollapsible: n, present: r, children: o, ...a } = e, s = Sa(Ca, n), [i, c] = l.useState(r), u = l.useRef(null), d = q(t, u), f = l.useRef(0), p = f.current, h = l.useRef(0), b = h.current, g = s.open || i, v = l.useRef(g), w = l.useRef(void 0);
  return l.useEffect(() => {
    const y = requestAnimationFrame(() => v.current = !1);
    return () => cancelAnimationFrame(y);
  }, []), ge(() => {
    const y = u.current;
    if (y) {
      w.current = w.current || {
        transitionDuration: y.style.transitionDuration,
        animationName: y.style.animationName
      }, y.style.transitionDuration = "0s", y.style.animationName = "none";
      const x = y.getBoundingClientRect();
      f.current = x.height, h.current = x.width, v.current || (y.style.transitionDuration = w.current.transitionDuration, y.style.animationName = w.current.animationName), c(r);
    }
  }, [s.open, r]), /* @__PURE__ */ m(
    F.div,
    {
      "data-state": Ea(s.open),
      "data-disabled": s.disabled ? "" : void 0,
      id: s.contentId,
      hidden: !g,
      ...a,
      ref: d,
      style: {
        "--radix-collapsible-content-height": p ? `${p}px` : void 0,
        "--radix-collapsible-content-width": b ? `${b}px` : void 0,
        ...e.style
      },
      children: g && o
    }
  );
});
function Ea(e) {
  return e ? "open" : "closed";
}
var ig = ec, cg = nc, lg = rc, ug = l.createContext(void 0);
function bt(e) {
  const t = l.useContext(ug);
  return e || t || "ltr";
}
var Ye = "Accordion", dg = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"], [Na, fg, mg] = an(Ye), [kr] = ye(Ye, [
  mg,
  Ji
]), Pa = Ji(), oc = R.forwardRef(
  (e, t) => {
    const { type: n, ...r } = e, o = r, a = r;
    return /* @__PURE__ */ m(Na.Provider, { scope: e.__scopeAccordion, children: n === "multiple" ? /* @__PURE__ */ m(vg, { ...a, ref: t }) : /* @__PURE__ */ m(gg, { ...o, ref: t }) });
  }
);
oc.displayName = Ye;
var [ac, pg] = kr(Ye), [sc, hg] = kr(
  Ye,
  { collapsible: !1 }
), gg = R.forwardRef(
  (e, t) => {
    const {
      value: n,
      defaultValue: r,
      onValueChange: o = () => {
      },
      collapsible: a = !1,
      ...s
    } = e, [i, c] = we({
      prop: n,
      defaultProp: r ?? "",
      onChange: o,
      caller: Ye
    });
    return /* @__PURE__ */ m(
      ac,
      {
        scope: e.__scopeAccordion,
        value: R.useMemo(() => i ? [i] : [], [i]),
        onItemOpen: c,
        onItemClose: R.useCallback(() => a && c(""), [a, c]),
        children: /* @__PURE__ */ m(sc, { scope: e.__scopeAccordion, collapsible: a, children: /* @__PURE__ */ m(ic, { ...s, ref: t }) })
      }
    );
  }
), vg = R.forwardRef((e, t) => {
  const {
    value: n,
    defaultValue: r,
    onValueChange: o = () => {
    },
    ...a
  } = e, [s, i] = we({
    prop: n,
    defaultProp: r ?? [],
    onChange: o,
    caller: Ye
  }), c = R.useCallback(
    (d) => i((f = []) => [...f, d]),
    [i]
  ), u = R.useCallback(
    (d) => i((f = []) => f.filter((p) => p !== d)),
    [i]
  );
  return /* @__PURE__ */ m(
    ac,
    {
      scope: e.__scopeAccordion,
      value: s,
      onItemOpen: c,
      onItemClose: u,
      children: /* @__PURE__ */ m(sc, { scope: e.__scopeAccordion, collapsible: !0, children: /* @__PURE__ */ m(ic, { ...a, ref: t }) })
    }
  );
}), [bg, Mr] = kr(Ye), ic = R.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, disabled: r, dir: o, orientation: a = "vertical", ...s } = e, i = R.useRef(null), c = q(i, t), u = fg(n), f = bt(o) === "ltr", p = T(e.onKeyDown, (h) => {
      var M;
      if (!dg.includes(h.key)) return;
      const b = h.target, g = u().filter((_) => {
        var O;
        return !((O = _.ref.current) != null && O.disabled);
      }), v = g.findIndex((_) => _.ref.current === b), w = g.length;
      if (v === -1) return;
      h.preventDefault();
      let y = v;
      const x = 0, S = w - 1, E = () => {
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
          a === "horizontal" && (f ? E() : C());
          break;
        case "ArrowDown":
          a === "vertical" && E();
          break;
        case "ArrowLeft":
          a === "horizontal" && (f ? C() : E());
          break;
        case "ArrowUp":
          a === "vertical" && C();
          break;
      }
      const N = y % w;
      (M = g[N].ref.current) == null || M.focus();
    });
    return /* @__PURE__ */ m(
      bg,
      {
        scope: n,
        disabled: r,
        direction: o,
        orientation: a,
        children: /* @__PURE__ */ m(Na.Slot, { scope: n, children: /* @__PURE__ */ m(
          F.div,
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
), mr = "AccordionItem", [yg, Ra] = kr(mr), cc = R.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, value: r, ...o } = e, a = Mr(mr, n), s = pg(mr, n), i = Pa(n), c = he(), u = r && s.value.includes(r) || !1, d = a.disabled || e.disabled;
    return /* @__PURE__ */ m(
      yg,
      {
        scope: n,
        open: u,
        disabled: d,
        triggerId: c,
        children: /* @__PURE__ */ m(
          ig,
          {
            "data-orientation": a.orientation,
            "data-state": pc(u),
            ...i,
            ...o,
            ref: t,
            disabled: d,
            open: u,
            onOpenChange: (f) => {
              f ? s.onItemOpen(r) : s.onItemClose(r);
            }
          }
        )
      }
    );
  }
);
cc.displayName = mr;
var lc = "AccordionHeader", uc = R.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = Mr(Ye, n), a = Ra(lc, n);
    return /* @__PURE__ */ m(
      F.h3,
      {
        "data-orientation": o.orientation,
        "data-state": pc(a.open),
        "data-disabled": a.disabled ? "" : void 0,
        ...r,
        ref: t
      }
    );
  }
);
uc.displayName = lc;
var Ko = "AccordionTrigger", dc = R.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = Mr(Ye, n), a = Ra(Ko, n), s = hg(Ko, n), i = Pa(n);
    return /* @__PURE__ */ m(Na.ItemSlot, { scope: n, children: /* @__PURE__ */ m(
      cg,
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
dc.displayName = Ko;
var fc = "AccordionContent", mc = R.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = Mr(Ye, n), a = Ra(fc, n), s = Pa(n);
    return /* @__PURE__ */ m(
      lg,
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
mc.displayName = fc;
function pc(e) {
  return e ? "open" : "closed";
}
var wg = oc, xg = cc, Sg = uc, hc = dc, gc = mc;
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cg = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), vc = (...e) => e.filter((t, n, r) => !!t && r.indexOf(t) === n).join(" ");
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Eg = {
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
const Ng = zi(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: o = "",
    children: a,
    iconNode: s,
    ...i
  }, c) => jo(
    "svg",
    {
      ref: c,
      ...Eg,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: vc("lucide", o),
      ...i
    },
    [
      ...s.map(([u, d]) => jo(u, d)),
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
const xe = (e, t) => {
  const n = zi(
    ({ className: r, ...o }, a) => jo(Ng, {
      ref: a,
      iconNode: t,
      className: vc(`lucide-${Cg(e)}`, r),
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
const Pg = xe("Calendar", [
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
const Tr = xe("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _r = xe("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bc = xe("ChevronLeft", [
  ["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]
]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dr = xe("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rg = xe("ChevronUp", [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kg = xe("ChevronsUpDown", [
  ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
  ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mg = xe("CircleAlert", [
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
const Tg = xe("CircleCheck", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yc = xe("Circle", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wc = xe("Ellipsis", [
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
const Vs = xe("Info", [
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
const _g = xe("LoaderCircle", [
  ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]
]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dg = xe("Minus", [["path", { d: "M5 12h14", key: "1ays0h" }]]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Og = xe("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ag = xe("TriangleAlert", [
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
const Or = xe("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]), mM = wg, Ig = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  xg,
  {
    ref: n,
    className: P("border-b border-border-subtle", e),
    ...t
  }
));
Ig.displayName = "AccordionItem";
const $g = l.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ m(Sg, { className: "flex", children: /* @__PURE__ */ G(
  hc,
  {
    ref: r,
    className: P(
      "flex flex-1 items-center justify-between py-4 text-body-sm font-semibold text-content-primary",
      "transition-all duration-fast hover:text-content-brand",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm",
      "[&[data-state=open]>svg]:rotate-180",
      e
    ),
    ...n,
    children: [
      t,
      /* @__PURE__ */ m(
        _r,
        {
          className: "h-4 w-4 shrink-0 text-content-secondary transition-transform duration-base ease-out",
          "aria-hidden": "true"
        }
      )
    ]
  }
) }));
$g.displayName = hc.displayName;
const Wg = l.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ m(
  gc,
  {
    ref: r,
    className: "overflow-hidden text-body-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...n,
    children: /* @__PURE__ */ m("div", { className: P("pb-4 pt-0 text-content-secondary", e), children: t })
  }
));
Wg.displayName = gc.displayName;
const Hs = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Ys = Ui, ze = (e, t) => (n) => {
  var r;
  if ((t == null ? void 0 : t.variants) == null) return Ys(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: o, defaultVariants: a } = t, s = Object.keys(o).map((u) => {
    const d = n == null ? void 0 : n[u], f = a == null ? void 0 : a[u];
    if (d === null) return null;
    const p = Hs(d) || Hs(f);
    return o[u][p];
  }), i = n && Object.entries(n).reduce((u, d) => {
    let [f, p] = d;
    return p === void 0 || (u[f] = p), u;
  }, {}), c = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((u, d) => {
    let { class: f, className: p, ...h } = d;
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
      ...u,
      f,
      p
    ] : u;
  }, []);
  return Ys(e, s, c, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
}, Fg = ze(
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
), Lg = {
  default: Vs,
  info: Vs,
  success: Tg,
  warning: Ag,
  danger: Mg
}, Bg = l.forwardRef(
  ({ className: e, variant: t = "default", showIcon: n = !0, children: r, ...o }, a) => {
    const s = Lg[t ?? "default"];
    return /* @__PURE__ */ G(
      "div",
      {
        ref: a,
        role: "alert",
        className: P(Fg({ variant: t }), e),
        ...o,
        children: [
          n && /* @__PURE__ */ m(s, { className: "h-4 w-4", "aria-hidden": "true" }),
          r
        ]
      }
    );
  }
);
Bg.displayName = "Alert";
const Vg = l.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ m(
    "h5",
    {
      ref: n,
      className: P("mb-1 font-semibold text-body-sm leading-none tracking-tight", e),
      ...t
    }
  )
);
Vg.displayName = "AlertTitle";
const Hg = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m("div", { ref: n, className: P("text-body-sm text-content-secondary", e), ...t }));
Hg.displayName = "AlertDescription";
function Yg(e, t = []) {
  let n = [];
  function r(a, s) {
    const i = l.createContext(s);
    i.displayName = a + "Context";
    const c = n.length;
    n = [...n, s];
    const u = (f) => {
      var w;
      const { scope: p, children: h, ...b } = f, g = ((w = p == null ? void 0 : p[e]) == null ? void 0 : w[c]) || i, v = l.useMemo(() => b, Object.values(b));
      return /* @__PURE__ */ m(g.Provider, { value: v, children: h });
    };
    u.displayName = a + "Provider";
    function d(f, p) {
      var g;
      const h = ((g = p == null ? void 0 : p[e]) == null ? void 0 : g[c]) || i, b = l.useContext(h);
      if (b) return b;
      if (s !== void 0) return s;
      throw new Error(`\`${f}\` must be used within \`${a}\``);
    }
    return [u, d];
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
  return o.scopeName = e, [r, zg(o, ...t)];
}
function zg(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(a) {
      const s = r.reduce((i, { useScope: c, scopeName: u }) => {
        const f = c(a)[`__scope${u}`];
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
var Gg = Symbol.for("react.lazy"), pr = l[" use ".trim().toString()];
function jg(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
function xc(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === Gg && "_payload" in e && jg(e._payload);
}
// @__NO_SIDE_EFFECTS__
function Mn(e) {
  const t = /* @__PURE__ */ Kg(e), n = l.forwardRef((r, o) => {
    let { children: a, ...s } = r;
    xc(a) && typeof pr == "function" && (a = pr(a._payload));
    const i = l.Children.toArray(a), c = i.find(Xg);
    if (c) {
      const u = c.props.children, d = i.map((f) => f === c ? l.Children.count(u) > 1 ? l.Children.only(null) : l.isValidElement(u) ? u.props.children : null : f);
      return /* @__PURE__ */ m(t, { ...s, ref: o, children: l.isValidElement(u) ? l.cloneElement(u, void 0, d) : null });
    }
    return /* @__PURE__ */ m(t, { ...s, ref: o, children: a });
  });
  return n.displayName = `${e}.Slot`, n;
}
var Ug = /* @__PURE__ */ Mn("Slot");
// @__NO_SIDE_EFFECTS__
function Kg(e) {
  const t = l.forwardRef((n, r) => {
    let { children: o, ...a } = n;
    if (xc(o) && typeof pr == "function" && (o = pr(o._payload)), l.isValidElement(o)) {
      const s = Qg(o), i = Zg(a, o.props);
      return o.type !== l.Fragment && (i.ref = r ? Ne(r, s) : s), l.cloneElement(o, i);
    }
    return l.Children.count(o) > 1 ? l.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var qg = Symbol("radix.slottable");
function Xg(e) {
  return l.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === qg;
}
function Zg(e, t) {
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
function Qg(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Jg = [
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
], ka = Jg.reduce((e, t) => {
  const n = /* @__PURE__ */ Mn(`Primitive.${t}`), r = l.forwardRef((o, a) => {
    const { asChild: s, ...i } = o, c = s ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ m(c, { ...i, ref: a });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {}), qo = { exports: {} }, xo = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zs;
function ev() {
  if (zs) return xo;
  zs = 1;
  var e = R;
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
  function u(f, p) {
    return p();
  }
  var d = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? u : i;
  return xo.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : d, xo;
}
var So = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Gs;
function tv() {
  return Gs || (Gs = 1, process.env.NODE_ENV !== "production" && function() {
    function e(h, b) {
      return h === b && (h !== 0 || 1 / h === 1 / b) || h !== h && b !== b;
    }
    function t(h, b) {
      d || o.startTransition === void 0 || (d = !0, console.error(
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
      ), u(g), g;
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
    var o = R, a = typeof Object.is == "function" ? Object.is : e, s = o.useState, i = o.useEffect, c = o.useLayoutEffect, u = o.useDebugValue, d = !1, f = !1, p = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? r : t;
    So.useSyncExternalStore = o.useSyncExternalStore !== void 0 ? o.useSyncExternalStore : p, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  }()), So;
}
process.env.NODE_ENV === "production" ? qo.exports = ev() : qo.exports = tv();
var nv = qo.exports;
function rv() {
  return nv.useSyncExternalStore(
    ov,
    () => !0,
    () => !1
  );
}
function ov() {
  return () => {
  };
}
var Ma = "Avatar", [av] = Yg(Ma), [sv, Sc] = av(Ma), Cc = l.forwardRef(
  (e, t) => {
    const { __scopeAvatar: n, ...r } = e, [o, a] = l.useState("idle");
    return /* @__PURE__ */ m(
      sv,
      {
        scope: n,
        imageLoadingStatus: o,
        onImageLoadingStatusChange: a,
        children: /* @__PURE__ */ m(ka.span, { ...r, ref: t })
      }
    );
  }
);
Cc.displayName = Ma;
var Ec = "AvatarImage", Nc = l.forwardRef(
  (e, t) => {
    const { __scopeAvatar: n, src: r, onLoadingStatusChange: o = () => {
    }, ...a } = e, s = Sc(Ec, n), i = iv(r, a), c = pe((u) => {
      o(u), s.onImageLoadingStatusChange(u);
    });
    return ge(() => {
      i !== "idle" && c(i);
    }, [i, c]), i === "loaded" ? /* @__PURE__ */ m(ka.img, { ...a, ref: t, src: r }) : null;
  }
);
Nc.displayName = Ec;
var Pc = "AvatarFallback", Rc = l.forwardRef(
  (e, t) => {
    const { __scopeAvatar: n, delayMs: r, ...o } = e, a = Sc(Pc, n), [s, i] = l.useState(r === void 0);
    return l.useEffect(() => {
      if (r !== void 0) {
        const c = window.setTimeout(() => i(!0), r);
        return () => window.clearTimeout(c);
      }
    }, [r]), s && a.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ m(ka.span, { ...o, ref: t }) : null;
  }
);
Rc.displayName = Pc;
function js(e, t) {
  return e ? t ? (e.src !== t && (e.src = t), e.complete && e.naturalWidth > 0 ? "loaded" : "loading") : "error" : "idle";
}
function iv(e, { referrerPolicy: t, crossOrigin: n }) {
  const r = rv(), o = l.useRef(null), a = r ? (o.current || (o.current = new window.Image()), o.current) : null, [s, i] = l.useState(
    () => js(a, e)
  );
  return ge(() => {
    i(js(a, e));
  }, [a, e]), ge(() => {
    const c = (f) => () => {
      i(f);
    };
    if (!a) return;
    const u = c("loaded"), d = c("error");
    return a.addEventListener("load", u), a.addEventListener("error", d), t && (a.referrerPolicy = t), typeof n == "string" && (a.crossOrigin = n), () => {
      a.removeEventListener("load", u), a.removeEventListener("error", d);
    };
  }, [a, n, t]), s;
}
var kc = Cc, Mc = Nc, Tc = Rc;
const cv = ze("relative flex shrink-0 overflow-hidden rounded-full", {
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
}), _c = l.forwardRef(
  ({ className: e, size: t, ...n }, r) => /* @__PURE__ */ m(
    kc,
    {
      ref: r,
      className: P(cv({ size: t }), e),
      ...n
    }
  )
);
_c.displayName = kc.displayName;
const lv = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  Mc,
  {
    ref: n,
    className: P("aspect-square h-full w-full object-cover", e),
    ...t
  }
));
lv.displayName = Mc.displayName;
const Dc = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  Tc,
  {
    ref: n,
    className: P(
      "flex h-full w-full items-center justify-center rounded-full",
      "bg-primary text-primary-foreground font-semibold uppercase tracking-wide",
      e
    ),
    ...t
  }
));
Dc.displayName = Tc.displayName;
const uv = ({ children: e, max: t, size: n = "default", className: r }) => {
  const o = l.Children.toArray(e), a = t ? o.slice(0, t) : o, s = t ? o.length - t : 0;
  return /* @__PURE__ */ G("div", { className: P("flex -space-x-2", r), role: "group", children: [
    a.map(
      (i, c) => {
        var u;
        return l.cloneElement(i, {
          key: c,
          size: n,
          className: P(
            "ring-2 ring-surface-raised",
            ((u = i.props) == null ? void 0 : u.className) ?? ""
          )
        });
      }
    ),
    s > 0 && /* @__PURE__ */ m(_c, { size: n, className: "ring-2 ring-surface-raised", children: /* @__PURE__ */ G(Dc, { children: [
      "+",
      s
    ] }) })
  ] });
};
uv.displayName = "AvatarGroup";
const dv = ze(
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
function pM({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ m("div", { className: P(dv({ variant: t }), e), ...n });
}
const fv = l.forwardRef(({ ...e }, t) => /* @__PURE__ */ m("nav", { ref: t, "aria-label": "breadcrumb", ...e }));
fv.displayName = "Breadcrumb";
const mv = l.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ m(
    "ol",
    {
      ref: n,
      className: P(
        "flex flex-wrap items-center gap-1.5 break-words text-caption text-content-secondary sm:gap-2.5",
        e
      ),
      ...t
    }
  )
);
mv.displayName = "BreadcrumbList";
const pv = l.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ m("li", { ref: n, className: P("inline-flex items-center gap-1.5", e), ...t })
);
pv.displayName = "BreadcrumbItem";
const hv = l.forwardRef(({ asChild: e, className: t, ...n }, r) => /* @__PURE__ */ m(
  "a",
  {
    ref: r,
    className: P(
      "hover:text-content-primary transition-colors duration-fast",
      "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-xs",
      t
    ),
    ...n
  }
));
hv.displayName = "BreadcrumbLink";
const gv = l.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ m(
    "span",
    {
      ref: n,
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
      className: P("font-semibold text-content-primary", e),
      ...t
    }
  )
);
gv.displayName = "BreadcrumbPage";
const vv = ({ children: e, className: t, ...n }) => /* @__PURE__ */ m("li", { role: "presentation", "aria-hidden": "true", className: P("[&>svg]:size-3", t), ...n, children: e ?? /* @__PURE__ */ m(Dr, {}) });
vv.displayName = "BreadcrumbSeparator";
const bv = ({ className: e, ...t }) => /* @__PURE__ */ G(
  "span",
  {
    role: "presentation",
    "aria-hidden": "true",
    className: P("flex h-9 w-9 items-center justify-center", e),
    ...t,
    children: [
      /* @__PURE__ */ m(wc, { className: "h-4 w-4" }),
      /* @__PURE__ */ m("span", { className: "sr-only", children: "More" })
    ]
  }
);
bv.displayName = "BreadcrumbElipssis";
const hr = ze(
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
), Mt = l.forwardRef(
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
    ...u
  }, d) => /* @__PURE__ */ G(
    r ? Ug : "button",
    {
      className: P(hr({ variant: t, size: n, className: e })),
      ref: d,
      disabled: c || o,
      "aria-disabled": c || o,
      ...u,
      children: [
        o ? /* @__PURE__ */ m(_g, { className: "animate-spin", "aria-hidden": "true" }) : a && /* @__PURE__ */ m("span", { "aria-hidden": "true", children: a }),
        i,
        !o && s && /* @__PURE__ */ m("span", { "aria-hidden": "true", children: s })
      ]
    }
  )
);
Mt.displayName = "Button";
function yv(e, t, n = "long") {
  return new Intl.DateTimeFormat("en-US", {
    // Enforces engine to render the time. Without the option JavaScriptCore omits it.
    hour: "numeric",
    timeZone: e,
    timeZoneName: n
  }).format(t).split(/\s/g).slice(2).join(" ");
}
const Co = {}, gn = {};
function kt(e, t) {
  try {
    const r = (Co[e] || (Co[e] = new Intl.DateTimeFormat("en-US", {
      timeZone: e,
      timeZoneName: "longOffset"
    }).format))(t).split("GMT")[1];
    return r in gn ? gn[r] : Us(r, r.split(":"));
  } catch {
    if (e in gn) return gn[e];
    const n = e == null ? void 0 : e.match(wv);
    return n ? Us(e, n.slice(1)) : NaN;
  }
}
const wv = /([+-]\d\d):?(\d\d)?/;
function Us(e, t) {
  const n = +(t[0] || 0), r = +(t[1] || 0), o = +(t[2] || 0) / 60;
  return gn[e] = n * 60 + r > 0 ? n * 60 + r + o : n * 60 - r - o;
}
class Xe extends Date {
  //#region static
  constructor(...t) {
    super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(kt(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), Oc(this), Xo(this)) : this.setTime(Date.now());
  }
  static tz(t, ...n) {
    return n.length ? new Xe(...n, t) : new Xe(Date.now(), t);
  }
  //#endregion
  //#region time zone
  withTimeZone(t) {
    return new Xe(+this, t);
  }
  getTimezoneOffset() {
    const t = -kt(this.timeZone, this);
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  //#endregion
  //#region time
  setTime(t) {
    return Date.prototype.setTime.apply(this, arguments), Xo(this), +this;
  }
  //#endregion
  //#region date-fns integration
  [Symbol.for("constructDateFrom")](t) {
    return new Xe(+new Date(t), this.timeZone);
  }
  //#endregion
}
const Ks = /^(get|set)(?!UTC)/;
Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
  if (!Ks.test(e)) return;
  const t = e.replace(Ks, "$1UTC");
  Xe.prototype[t] && (e.startsWith("get") ? Xe.prototype[e] = function() {
    return this.internal[t]();
  } : (Xe.prototype[e] = function() {
    return Date.prototype[t].apply(this.internal, arguments), xv(this), +this;
  }, Xe.prototype[t] = function() {
    return Date.prototype[t].apply(this, arguments), Xo(this), +this;
  }));
});
function Xo(e) {
  e.internal.setTime(+e), e.internal.setUTCSeconds(e.internal.getUTCSeconds() - Math.round(-kt(e.timeZone, e) * 60));
}
function xv(e) {
  Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), Oc(e);
}
function Oc(e) {
  const t = kt(e.timeZone, e), n = t > 0 ? Math.floor(t) : Math.ceil(t), r = /* @__PURE__ */ new Date(+e);
  r.setUTCHours(r.getUTCHours() - 1);
  const o = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), a = -(/* @__PURE__ */ new Date(+r)).getTimezoneOffset(), s = o - a, i = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
  s && i && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + s);
  const c = o - n;
  c && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + c);
  const u = /* @__PURE__ */ new Date(+e);
  u.setUTCSeconds(0);
  const d = o > 0 ? u.getSeconds() : (u.getSeconds() - 60) % 60, f = Math.round(-(kt(e.timeZone, e) * 60)) % 60;
  (f || d) && (e.internal.setUTCSeconds(e.internal.getUTCSeconds() + f), Date.prototype.setUTCSeconds.call(e, Date.prototype.getUTCSeconds.call(e) + f + d));
  const p = kt(e.timeZone, e), h = p > 0 ? Math.floor(p) : Math.ceil(p), g = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - h, v = h !== n, w = g - c;
  if (v && w) {
    Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + w);
    const y = kt(e.timeZone, e), x = y > 0 ? Math.floor(y) : Math.ceil(y), S = h - x;
    S && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + S), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + S));
  }
}
class Se extends Xe {
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
    return `${t} GMT${n}${r}${o} (${yv(this.timeZone, this)})`;
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
const Ac = 6048e5, Sv = 864e5, qs = Symbol.for("constructDateFrom");
function be(e, t) {
  return typeof e == "function" ? e(t) : e && typeof e == "object" && qs in e ? e[qs](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
function de(e, t) {
  return be(t || e, e);
}
function Ic(e, t, n) {
  const r = de(e, n == null ? void 0 : n.in);
  return isNaN(t) ? be(e, NaN) : (t && r.setDate(r.getDate() + t), r);
}
function $c(e, t, n) {
  const r = de(e, n == null ? void 0 : n.in);
  if (isNaN(t)) return be(e, NaN);
  if (!t)
    return r;
  const o = r.getDate(), a = be(e, r.getTime());
  a.setMonth(r.getMonth() + t + 1, 0);
  const s = a.getDate();
  return o >= s ? a : (r.setFullYear(
    a.getFullYear(),
    a.getMonth(),
    o
  ), r);
}
let Cv = {};
function Tn() {
  return Cv;
}
function Jt(e, t) {
  var i, c, u, d;
  const n = Tn(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((c = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : c.weekStartsOn) ?? n.weekStartsOn ?? ((d = (u = n.locale) == null ? void 0 : u.options) == null ? void 0 : d.weekStartsOn) ?? 0, o = de(e, t == null ? void 0 : t.in), a = o.getDay(), s = (a < r ? 7 : 0) + a - r;
  return o.setDate(o.getDate() - s), o.setHours(0, 0, 0, 0), o;
}
function xn(e, t) {
  return Jt(e, { ...t, weekStartsOn: 1 });
}
function Wc(e, t) {
  const n = de(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = be(n, 0);
  o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
  const a = xn(o), s = be(n, 0);
  s.setFullYear(r, 0, 4), s.setHours(0, 0, 0, 0);
  const i = xn(s);
  return n.getTime() >= a.getTime() ? r + 1 : n.getTime() >= i.getTime() ? r : r - 1;
}
function Xs(e) {
  const t = de(e), n = new Date(
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
function sn(e, ...t) {
  const n = be.bind(
    null,
    t.find((r) => typeof r == "object")
  );
  return t.map(n);
}
function Sn(e, t) {
  const n = de(e, t == null ? void 0 : t.in);
  return n.setHours(0, 0, 0, 0), n;
}
function Ta(e, t, n) {
  const [r, o] = sn(
    n == null ? void 0 : n.in,
    e,
    t
  ), a = Sn(r), s = Sn(o), i = +a - Xs(a), c = +s - Xs(s);
  return Math.round((i - c) / Sv);
}
function Ev(e, t) {
  const n = Wc(e, t), r = be(e, 0);
  return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), xn(r);
}
function Nv(e, t, n) {
  return Ic(e, t * 7, n);
}
function Pv(e, t, n) {
  return $c(e, t * 12, n);
}
function Rv(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = be.bind(null, o));
    const a = de(o, r);
    (!n || n < a || isNaN(+a)) && (n = a);
  }), be(r, n || NaN);
}
function kv(e, t) {
  let n, r = t == null ? void 0 : t.in;
  return e.forEach((o) => {
    !r && typeof o == "object" && (r = be.bind(null, o));
    const a = de(o, r);
    (!n || n > a || isNaN(+a)) && (n = a);
  }), be(r, n || NaN);
}
function Mv(e, t, n) {
  const [r, o] = sn(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return +Sn(r) == +Sn(o);
}
function Fc(e) {
  return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
function Tv(e) {
  return !(!Fc(e) && typeof e != "number" || isNaN(+de(e)));
}
function Lc(e, t, n) {
  const [r, o] = sn(
    n == null ? void 0 : n.in,
    e,
    t
  ), a = r.getFullYear() - o.getFullYear(), s = r.getMonth() - o.getMonth();
  return a * 12 + s;
}
function _v(e, t) {
  const n = de(e, t == null ? void 0 : t.in), r = n.getMonth();
  return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
}
function Bc(e, t) {
  const [n, r] = sn(e, t.start, t.end);
  return { start: n, end: r };
}
function Dv(e, t) {
  const { start: n, end: r } = Bc(t == null ? void 0 : t.in, e);
  let o = +n > +r;
  const a = o ? +n : +r, s = o ? r : n;
  s.setHours(0, 0, 0, 0), s.setDate(1);
  let i = 1;
  const c = [];
  for (; +s <= a; )
    c.push(be(n, s)), s.setMonth(s.getMonth() + i);
  return o ? c.reverse() : c;
}
function Ov(e, t) {
  const n = de(e, t == null ? void 0 : t.in);
  return n.setDate(1), n.setHours(0, 0, 0, 0), n;
}
function Av(e, t) {
  const n = de(e, t == null ? void 0 : t.in), r = n.getFullYear();
  return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
}
function Vc(e, t) {
  const n = de(e, t == null ? void 0 : t.in);
  return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
function Iv(e, t) {
  const { start: n, end: r } = Bc(t == null ? void 0 : t.in, e);
  let o = +n > +r;
  const a = o ? +n : +r, s = o ? r : n;
  s.setHours(0, 0, 0, 0), s.setMonth(0, 1);
  let i = 1;
  const c = [];
  for (; +s <= a; )
    c.push(be(n, s)), s.setFullYear(s.getFullYear() + i);
  return o ? c.reverse() : c;
}
function Hc(e, t) {
  var i, c, u, d;
  const n = Tn(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((c = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : c.weekStartsOn) ?? n.weekStartsOn ?? ((d = (u = n.locale) == null ? void 0 : u.options) == null ? void 0 : d.weekStartsOn) ?? 0, o = de(e, t == null ? void 0 : t.in), a = o.getDay(), s = (a < r ? -7 : 0) + 6 - (a - r);
  return o.setDate(o.getDate() + s), o.setHours(23, 59, 59, 999), o;
}
function $v(e, t) {
  return Hc(e, { ...t, weekStartsOn: 1 });
}
const Wv = {
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
}, Fv = (e, t, n) => {
  let r;
  const o = Wv[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function Xt(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
const Lv = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Bv = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Vv = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Hv = {
  date: Xt({
    formats: Lv,
    defaultWidth: "full"
  }),
  time: Xt({
    formats: Bv,
    defaultWidth: "full"
  }),
  dateTime: Xt({
    formats: Vv,
    defaultWidth: "full"
  })
}, Yv = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, zv = (e, t, n, r) => Yv[e];
function Ue(e) {
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
const Gv = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, jv = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, Uv = {
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
}, Kv = {
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
}, qv = {
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
}, Xv = {
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
}, Zv = (e, t) => {
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
}, Qv = {
  ordinalNumber: Zv,
  era: Ue({
    values: Gv,
    defaultWidth: "wide"
  }),
  quarter: Ue({
    values: jv,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Ue({
    values: Uv,
    defaultWidth: "wide"
  }),
  day: Ue({
    values: Kv,
    defaultWidth: "wide"
  }),
  dayPeriod: Ue({
    values: qv,
    defaultWidth: "wide",
    formattingValues: Xv,
    defaultFormattingWidth: "wide"
  })
};
function Ke(e) {
  return (t, n = {}) => {
    const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], a = t.match(o);
    if (!a)
      return null;
    const s = a[0], i = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(i) ? eb(i, (f) => f.test(s)) : (
      // [TODO] -- I challenge you to fix the type
      Jv(i, (f) => f.test(s))
    );
    let u;
    u = e.valueCallback ? e.valueCallback(c) : c, u = n.valueCallback ? (
      // [TODO] -- I challenge you to fix the type
      n.valueCallback(u)
    ) : u;
    const d = t.slice(s.length);
    return { value: u, rest: d };
  };
}
function Jv(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function eb(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function Yc(e) {
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
const tb = /^(\d+)(th|st|nd|rd)?/i, nb = /\d+/i, rb = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, ob = {
  any: [/^b/i, /^(a|c)/i]
}, ab = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, sb = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, ib = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, cb = {
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
}, lb = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, ub = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, db = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, fb = {
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
}, mb = {
  ordinalNumber: Yc({
    matchPattern: tb,
    parsePattern: nb,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Ke({
    matchPatterns: rb,
    defaultMatchWidth: "wide",
    parsePatterns: ob,
    defaultParseWidth: "any"
  }),
  quarter: Ke({
    matchPatterns: ab,
    defaultMatchWidth: "wide",
    parsePatterns: sb,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Ke({
    matchPatterns: ib,
    defaultMatchWidth: "wide",
    parsePatterns: cb,
    defaultParseWidth: "any"
  }),
  day: Ke({
    matchPatterns: lb,
    defaultMatchWidth: "wide",
    parsePatterns: ub,
    defaultParseWidth: "any"
  }),
  dayPeriod: Ke({
    matchPatterns: db,
    defaultMatchWidth: "any",
    parsePatterns: fb,
    defaultParseWidth: "any"
  })
}, Gt = {
  code: "en-US",
  formatDistance: Fv,
  formatLong: Hv,
  formatRelative: zv,
  localize: Qv,
  match: mb,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function pb(e, t) {
  const n = de(e, t == null ? void 0 : t.in);
  return Ta(n, Vc(n)) + 1;
}
function _a(e, t) {
  const n = de(e, t == null ? void 0 : t.in), r = +xn(n) - +Ev(n);
  return Math.round(r / Ac) + 1;
}
function zc(e, t) {
  var d, f, p, h;
  const n = de(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = Tn(), a = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((f = (d = t == null ? void 0 : t.locale) == null ? void 0 : d.options) == null ? void 0 : f.firstWeekContainsDate) ?? o.firstWeekContainsDate ?? ((h = (p = o.locale) == null ? void 0 : p.options) == null ? void 0 : h.firstWeekContainsDate) ?? 1, s = be((t == null ? void 0 : t.in) || e, 0);
  s.setFullYear(r + 1, 0, a), s.setHours(0, 0, 0, 0);
  const i = Jt(s, t), c = be((t == null ? void 0 : t.in) || e, 0);
  c.setFullYear(r, 0, a), c.setHours(0, 0, 0, 0);
  const u = Jt(c, t);
  return +n >= +i ? r + 1 : +n >= +u ? r : r - 1;
}
function hb(e, t) {
  var i, c, u, d;
  const n = Tn(), r = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((c = (i = t == null ? void 0 : t.locale) == null ? void 0 : i.options) == null ? void 0 : c.firstWeekContainsDate) ?? n.firstWeekContainsDate ?? ((d = (u = n.locale) == null ? void 0 : u.options) == null ? void 0 : d.firstWeekContainsDate) ?? 1, o = zc(e, t), a = be((t == null ? void 0 : t.in) || e, 0);
  return a.setFullYear(o, 0, r), a.setHours(0, 0, 0, 0), Jt(a, t);
}
function Da(e, t) {
  const n = de(e, t == null ? void 0 : t.in), r = +Jt(n, t) - +hb(n, t);
  return Math.round(r / Ac) + 1;
}
function ue(e, t) {
  const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
  return n + r;
}
const ft = {
  // Year
  y(e, t) {
    const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
    return ue(t === "yy" ? r % 100 : r, t.length);
  },
  // Month
  M(e, t) {
    const n = e.getMonth();
    return t === "M" ? String(n + 1) : ue(n + 1, 2);
  },
  // Day of the month
  d(e, t) {
    return ue(e.getDate(), t.length);
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
    return ue(e.getHours() % 12 || 12, t.length);
  },
  // Hour [0-23]
  H(e, t) {
    return ue(e.getHours(), t.length);
  },
  // Minute
  m(e, t) {
    return ue(e.getMinutes(), t.length);
  },
  // Second
  s(e, t) {
    return ue(e.getSeconds(), t.length);
  },
  // Fraction of second
  S(e, t) {
    const n = t.length, r = e.getMilliseconds(), o = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return ue(o, t.length);
  }
}, Bt = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, Zs = {
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
    return ft.y(e, t);
  },
  // Local week-numbering year
  Y: function(e, t, n, r) {
    const o = zc(e, r), a = o > 0 ? o : 1 - o;
    if (t === "YY") {
      const s = a % 100;
      return ue(s, 2);
    }
    return t === "Yo" ? n.ordinalNumber(a, { unit: "year" }) : ue(a, t.length);
  },
  // ISO week-numbering year
  R: function(e, t) {
    const n = Wc(e);
    return ue(n, t.length);
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
    return ue(n, t.length);
  },
  // Quarter
  Q: function(e, t, n) {
    const r = Math.ceil((e.getMonth() + 1) / 3);
    switch (t) {
      case "Q":
        return String(r);
      case "QQ":
        return ue(r, 2);
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
        return ue(r, 2);
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
        return ft.M(e, t);
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
        return ue(r + 1, 2);
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
    const o = Da(e, r);
    return t === "wo" ? n.ordinalNumber(o, { unit: "week" }) : ue(o, t.length);
  },
  // ISO week of year
  I: function(e, t, n) {
    const r = _a(e);
    return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : ue(r, t.length);
  },
  // Day of the month
  d: function(e, t, n) {
    return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : ft.d(e, t);
  },
  // Day of year
  D: function(e, t, n) {
    const r = pb(e);
    return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : ue(r, t.length);
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
        return ue(a, 2);
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
        return ue(a, t.length);
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
        return ue(o, t.length);
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
    switch (r === 12 ? o = Bt.noon : r === 0 ? o = Bt.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
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
    switch (r >= 17 ? o = Bt.evening : r >= 12 ? o = Bt.afternoon : r >= 4 ? o = Bt.morning : o = Bt.night, t) {
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
    return ft.h(e, t);
  },
  // Hour [0-23]
  H: function(e, t, n) {
    return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : ft.H(e, t);
  },
  // Hour [0-11]
  K: function(e, t, n) {
    const r = e.getHours() % 12;
    return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : ue(r, t.length);
  },
  // Hour [1-24]
  k: function(e, t, n) {
    let r = e.getHours();
    return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : ue(r, t.length);
  },
  // Minute
  m: function(e, t, n) {
    return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : ft.m(e, t);
  },
  // Second
  s: function(e, t, n) {
    return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : ft.s(e, t);
  },
  // Fraction of second
  S: function(e, t) {
    return ft.S(e, t);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(e, t, n) {
    const r = e.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (t) {
      case "X":
        return Js(r);
      case "XXXX":
      case "XX":
        return Rt(r);
      case "XXXXX":
      case "XXX":
      default:
        return Rt(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "x":
        return Js(r);
      case "xxxx":
      case "xx":
        return Rt(r);
      case "xxxxx":
      case "xxx":
      default:
        return Rt(r, ":");
    }
  },
  // Timezone (GMT)
  O: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + Qs(r, ":");
      case "OOOO":
      default:
        return "GMT" + Rt(r, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(e, t, n) {
    const r = e.getTimezoneOffset();
    switch (t) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + Qs(r, ":");
      case "zzzz":
      default:
        return "GMT" + Rt(r, ":");
    }
  },
  // Seconds timestamp
  t: function(e, t, n) {
    const r = Math.trunc(+e / 1e3);
    return ue(r, t.length);
  },
  // Milliseconds timestamp
  T: function(e, t, n) {
    return ue(+e, t.length);
  }
};
function Qs(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), a = r % 60;
  return a === 0 ? n + String(o) : n + String(o) + t + ue(a, 2);
}
function Js(e, t) {
  return e % 60 === 0 ? (e > 0 ? "-" : "+") + ue(Math.abs(e) / 60, 2) : Rt(e, t);
}
function Rt(e, t = "") {
  const n = e > 0 ? "-" : "+", r = Math.abs(e), o = ue(Math.trunc(r / 60), 2), a = ue(r % 60, 2);
  return n + o + t + a;
}
const ei = (e, t) => {
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
}, Gc = (e, t) => {
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
}, gb = (e, t) => {
  const n = e.match(/(P+)(p+)?/) || [], r = n[1], o = n[2];
  if (!o)
    return ei(e, t);
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
  return a.replace("{{date}}", ei(r, t)).replace("{{time}}", Gc(o, t));
}, vb = {
  p: Gc,
  P: gb
}, bb = /^D+$/, yb = /^Y+$/, wb = ["D", "DD", "YY", "YYYY"];
function xb(e) {
  return bb.test(e);
}
function Sb(e) {
  return yb.test(e);
}
function Cb(e, t, n) {
  const r = Eb(e, t, n);
  if (console.warn(r), wb.includes(e)) throw new RangeError(r);
}
function Eb(e, t, n) {
  const r = e[0] === "Y" ? "years" : "days of the month";
  return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Nb = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Pb = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Rb = /^'([^]*?)'?$/, kb = /''/g, Mb = /[a-zA-Z]/;
function Kt(e, t, n) {
  var d, f, p, h, b, g, v, w;
  const r = Tn(), o = (n == null ? void 0 : n.locale) ?? r.locale ?? Gt, a = (n == null ? void 0 : n.firstWeekContainsDate) ?? ((f = (d = n == null ? void 0 : n.locale) == null ? void 0 : d.options) == null ? void 0 : f.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((h = (p = r.locale) == null ? void 0 : p.options) == null ? void 0 : h.firstWeekContainsDate) ?? 1, s = (n == null ? void 0 : n.weekStartsOn) ?? ((g = (b = n == null ? void 0 : n.locale) == null ? void 0 : b.options) == null ? void 0 : g.weekStartsOn) ?? r.weekStartsOn ?? ((w = (v = r.locale) == null ? void 0 : v.options) == null ? void 0 : w.weekStartsOn) ?? 0, i = de(e, n == null ? void 0 : n.in);
  if (!Tv(i))
    throw new RangeError("Invalid time value");
  let c = t.match(Pb).map((y) => {
    const x = y[0];
    if (x === "p" || x === "P") {
      const S = vb[x];
      return S(y, o.formatLong);
    }
    return y;
  }).join("").match(Nb).map((y) => {
    if (y === "''")
      return { isToken: !1, value: "'" };
    const x = y[0];
    if (x === "'")
      return { isToken: !1, value: Tb(y) };
    if (Zs[x])
      return { isToken: !0, value: y };
    if (x.match(Mb))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + x + "`"
      );
    return { isToken: !1, value: y };
  });
  o.localize.preprocessor && (c = o.localize.preprocessor(i, c));
  const u = {
    firstWeekContainsDate: a,
    weekStartsOn: s,
    locale: o
  };
  return c.map((y) => {
    if (!y.isToken) return y.value;
    const x = y.value;
    (!(n != null && n.useAdditionalWeekYearTokens) && Sb(x) || !(n != null && n.useAdditionalDayOfYearTokens) && xb(x)) && Cb(x, t, String(e));
    const S = Zs[x[0]];
    return S(i, x, o.localize, u);
  }).join("");
}
function Tb(e) {
  const t = e.match(Rb);
  return t ? t[1].replace(kb, "'") : e;
}
function _b(e, t) {
  const n = de(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = n.getMonth(), a = be(n, 0);
  return a.setFullYear(r, o + 1, 0), a.setHours(0, 0, 0, 0), a.getDate();
}
function Db(e, t) {
  return de(e, t == null ? void 0 : t.in).getMonth();
}
function Ob(e, t) {
  return de(e, t == null ? void 0 : t.in).getFullYear();
}
function Ab(e, t) {
  return +de(e) > +de(t);
}
function Ib(e, t) {
  return +de(e) < +de(t);
}
function $b(e, t, n) {
  const [r, o] = sn(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
}
function Wb(e, t, n) {
  const [r, o] = sn(
    n == null ? void 0 : n.in,
    e,
    t
  );
  return r.getFullYear() === o.getFullYear();
}
function Fb(e, t, n) {
  const r = de(e, n == null ? void 0 : n.in), o = r.getFullYear(), a = r.getDate(), s = be(e, 0);
  s.setFullYear(o, t, 15), s.setHours(0, 0, 0, 0);
  const i = _b(s);
  return r.setMonth(t, Math.min(a, i)), r;
}
function Lb(e, t, n) {
  const r = de(e, n == null ? void 0 : n.in);
  return isNaN(+r) ? be(e, NaN) : (r.setFullYear(t), r);
}
const ti = 5, Bb = 4;
function Vb(e, t) {
  const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), a = t.addDays(o, ti * 7 - 1);
  return t.getMonth(e) === t.getMonth(a) ? ti : Bb;
}
function jc(e, t) {
  const n = t.startOfMonth(e), r = n.getDay();
  return r === 1 ? n : r === 0 ? t.addDays(n, -1 * 6) : t.addDays(n, -1 * (r - 1));
}
function Hb(e, t) {
  const n = jc(e, t), r = Vb(e, t);
  return t.addDays(n, r * 7 - 1);
}
const Yb = {
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
}, zb = (e, t, n) => {
  let r;
  const o = Yb[e];
  return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "dalam waktu " + r : r + " yang lalu" : r;
}, Gb = {
  full: "EEEE, d MMMM yyyy",
  long: "d MMMM yyyy",
  medium: "d MMM yyyy",
  short: "d/M/yyyy"
}, jb = {
  full: "HH.mm.ss",
  long: "HH.mm.ss",
  medium: "HH.mm",
  short: "HH.mm"
}, Ub = {
  full: "{{date}} 'pukul' {{time}}",
  long: "{{date}} 'pukul' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Kb = {
  date: Xt({
    formats: Gb,
    defaultWidth: "full"
  }),
  time: Xt({
    formats: jb,
    defaultWidth: "full"
  }),
  dateTime: Xt({
    formats: Ub,
    defaultWidth: "full"
  })
}, qb = {
  lastWeek: "eeee 'lalu pukul' p",
  yesterday: "'Kemarin pukul' p",
  today: "'Hari ini pukul' p",
  tomorrow: "'Besok pukul' p",
  nextWeek: "eeee 'pukul' p",
  other: "P"
}, Xb = (e, t, n, r) => qb[e], Zb = {
  narrow: ["SM", "M"],
  abbreviated: ["SM", "M"],
  wide: ["Sebelum Masehi", "Masehi"]
}, Qb = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["K1", "K2", "K3", "K4"],
  wide: ["Kuartal ke-1", "Kuartal ke-2", "Kuartal ke-3", "Kuartal ke-4"]
}, Jb = {
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
}, ey = {
  narrow: ["M", "S", "S", "R", "K", "J", "S"],
  short: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
  abbreviated: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
  wide: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
}, ty = {
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
}, ny = {
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
}, ry = (e, t) => "ke-" + Number(e), oy = {
  ordinalNumber: ry,
  era: Ue({
    values: Zb,
    defaultWidth: "wide"
  }),
  quarter: Ue({
    values: Qb,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Ue({
    values: Jb,
    defaultWidth: "wide"
  }),
  day: Ue({
    values: ey,
    defaultWidth: "wide"
  }),
  dayPeriod: Ue({
    values: ty,
    defaultWidth: "wide",
    formattingValues: ny,
    defaultFormattingWidth: "wide"
  })
}, ay = /^ke-(\d+)?/i, sy = /\d+/i, iy = {
  narrow: /^(sm|m)/i,
  abbreviated: /^(s\.?\s?m\.?|s\.?\s?e\.?\s?u\.?|m\.?|e\.?\s?u\.?)/i,
  wide: /^(sebelum masehi|sebelum era umum|masehi|era umum)/i
}, cy = {
  any: [/^s/i, /^(m|e)/i]
}, ly = {
  narrow: /^[1234]/i,
  abbreviated: /^K-?\s[1234]/i,
  wide: /^Kuartal ke-?\s?[1234]/i
}, uy = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, dy = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|mei|jun|jul|agt|sep|okt|nov|des)/i,
  wide: /^(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)/i
}, fy = {
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
}, my = {
  narrow: /^[srkjm]/i,
  short: /^(min|sen|sel|rab|kam|jum|sab)/i,
  abbreviated: /^(min|sen|sel|rab|kam|jum|sab)/i,
  wide: /^(minggu|senin|selasa|rabu|kamis|jumat|sabtu)/i
}, py = {
  narrow: [/^m/i, /^s/i, /^s/i, /^r/i, /^k/i, /^j/i, /^s/i],
  any: [/^m/i, /^sen/i, /^sel/i, /^r/i, /^k/i, /^j/i, /^sa/i]
}, hy = {
  narrow: /^(a|p|tengah m|tengah h|(di(\swaktu)?) (pagi|siang|sore|malam))/i,
  any: /^([ap]\.?\s?m\.?|tengah malam|tengah hari|(di(\swaktu)?) (pagi|siang|sore|malam))/i
}, gy = {
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
}, vy = {
  ordinalNumber: Yc({
    matchPattern: ay,
    parsePattern: sy,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Ke({
    matchPatterns: iy,
    defaultMatchWidth: "wide",
    parsePatterns: cy,
    defaultParseWidth: "any"
  }),
  quarter: Ke({
    matchPatterns: ly,
    defaultMatchWidth: "wide",
    parsePatterns: uy,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Ke({
    matchPatterns: dy,
    defaultMatchWidth: "wide",
    parsePatterns: fy,
    defaultParseWidth: "any"
  }),
  day: Ke({
    matchPatterns: my,
    defaultMatchWidth: "wide",
    parsePatterns: py,
    defaultParseWidth: "any"
  }),
  dayPeriod: Ke({
    matchPatterns: hy,
    defaultMatchWidth: "any",
    parsePatterns: gy,
    defaultParseWidth: "any"
  })
}, by = {
  code: "id",
  formatDistance: zb,
  formatLong: Kb,
  formatRelative: Xb,
  localize: oy,
  match: vy,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
}, Uc = {
  ...Gt,
  labels: {
    labelDayButton: (e, t, n, r) => {
      let o;
      r && typeof r.format == "function" ? o = r.format.bind(r) : o = (s, i) => Kt(s, i, { locale: Gt, ...n });
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
      return n && typeof n.format == "function" ? r = n.format.bind(n) : r = (o, a) => Kt(o, a, { locale: Gt, ...t }), r(e, "LLLL yyyy");
    },
    labelGridcell: (e, t, n, r) => {
      let o;
      r && typeof r.format == "function" ? o = r.format.bind(r) : o = (s, i) => Kt(s, i, { locale: Gt, ...n });
      let a = o(e, "PPPP");
      return t != null && t.today && (a = `Today, ${a}`), a;
    },
    labelNav: "Navigation bar",
    labelWeekNumberHeader: "Week Number",
    labelWeekday: (e, t, n) => {
      let r;
      return n && typeof n.format == "function" ? r = n.format.bind(n) : r = (o, a) => Kt(o, a, { locale: Gt, ...t }), r(e, "cccc");
    }
  }
};
class De {
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
      return (a = this.overrides) != null && a.addDays ? this.overrides.addDays(r, o) : Ic(r, o);
    }, this.addMonths = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addMonths ? this.overrides.addMonths(r, o) : $c(r, o);
    }, this.addWeeks = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addWeeks ? this.overrides.addWeeks(r, o) : Nv(r, o);
    }, this.addYears = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.addYears ? this.overrides.addYears(r, o) : Pv(r, o);
    }, this.differenceInCalendarDays = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.differenceInCalendarDays ? this.overrides.differenceInCalendarDays(r, o) : Ta(r, o);
    }, this.differenceInCalendarMonths = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.differenceInCalendarMonths ? this.overrides.differenceInCalendarMonths(r, o) : Lc(r, o);
    }, this.eachMonthOfInterval = (r) => {
      var o;
      return (o = this.overrides) != null && o.eachMonthOfInterval ? this.overrides.eachMonthOfInterval(r) : Dv(r);
    }, this.eachYearOfInterval = (r) => {
      var i;
      const o = (i = this.overrides) != null && i.eachYearOfInterval ? this.overrides.eachYearOfInterval(r) : Iv(r), a = new Set(o.map((c) => this.getYear(c)));
      if (a.size === o.length)
        return o;
      const s = [];
      return a.forEach((c) => {
        s.push(new Date(c, 0, 1));
      }), s;
    }, this.endOfBroadcastWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfBroadcastWeek ? this.overrides.endOfBroadcastWeek(r) : Hb(r, this);
    }, this.endOfISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfISOWeek ? this.overrides.endOfISOWeek(r) : $v(r);
    }, this.endOfMonth = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfMonth ? this.overrides.endOfMonth(r) : _v(r);
    }, this.endOfWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.endOfWeek ? this.overrides.endOfWeek(r, o) : Hc(r, this.options);
    }, this.endOfYear = (r) => {
      var o;
      return (o = this.overrides) != null && o.endOfYear ? this.overrides.endOfYear(r) : Av(r);
    }, this.format = (r, o, a) => {
      var i;
      const s = (i = this.overrides) != null && i.format ? this.overrides.format(r, o, this.options) : Kt(r, o, this.options);
      return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(s) : s;
    }, this.getISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.getISOWeek ? this.overrides.getISOWeek(r) : _a(r);
    }, this.getMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getMonth ? this.overrides.getMonth(r, this.options) : Db(r, this.options);
    }, this.getYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getYear ? this.overrides.getYear(r, this.options) : Ob(r, this.options);
    }, this.getWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.getWeek ? this.overrides.getWeek(r, this.options) : Da(r, this.options);
    }, this.isAfter = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isAfter ? this.overrides.isAfter(r, o) : Ab(r, o);
    }, this.isBefore = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isBefore ? this.overrides.isBefore(r, o) : Ib(r, o);
    }, this.isDate = (r) => {
      var o;
      return (o = this.overrides) != null && o.isDate ? this.overrides.isDate(r) : Fc(r);
    }, this.isSameDay = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameDay ? this.overrides.isSameDay(r, o) : Mv(r, o);
    }, this.isSameMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameMonth ? this.overrides.isSameMonth(r, o) : $b(r, o);
    }, this.isSameYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.isSameYear ? this.overrides.isSameYear(r, o) : Wb(r, o);
    }, this.max = (r) => {
      var o;
      return (o = this.overrides) != null && o.max ? this.overrides.max(r) : Rv(r);
    }, this.min = (r) => {
      var o;
      return (o = this.overrides) != null && o.min ? this.overrides.min(r) : kv(r);
    }, this.setMonth = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.setMonth ? this.overrides.setMonth(r, o) : Fb(r, o);
    }, this.setYear = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.setYear ? this.overrides.setYear(r, o) : Lb(r, o);
    }, this.startOfBroadcastWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.startOfBroadcastWeek ? this.overrides.startOfBroadcastWeek(r, this) : jc(r, this);
    }, this.startOfDay = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfDay ? this.overrides.startOfDay(r) : Sn(r);
    }, this.startOfISOWeek = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfISOWeek ? this.overrides.startOfISOWeek(r) : xn(r);
    }, this.startOfMonth = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfMonth ? this.overrides.startOfMonth(r) : Ov(r);
    }, this.startOfWeek = (r, o) => {
      var a;
      return (a = this.overrides) != null && a.startOfWeek ? this.overrides.startOfWeek(r, this.options) : Jt(r, this.options);
    }, this.startOfYear = (r) => {
      var o;
      return (o = this.overrides) != null && o.startOfYear ? this.overrides.startOfYear(r) : Vc(r);
    }, this.options = { locale: Uc, ...t }, this.overrides = n;
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
    return t && De.yearFirstLocales.has(t) ? "year-first" : "month-first";
  }
  /**
   * Formats the month/year pair respecting locale conventions.
   *
   * @since 9.11.0
   */
  formatMonthYear(t) {
    const { locale: n, timeZone: r, numerals: o } = this.options, a = n == null ? void 0 : n.code;
    if (a && De.yearFirstLocales.has(a))
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
De.yearFirstLocales = /* @__PURE__ */ new Set([
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
const et = new De();
class Kc {
  constructor(t, n, r = et) {
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
class yy {
  constructor(t, n) {
    this.date = t, this.weeks = n;
  }
}
class wy {
  constructor(t, n) {
    this.days = n, this.weekNumber = t;
  }
}
function xy(e) {
  return R.createElement("button", { ...e });
}
function Sy(e) {
  return R.createElement("span", { ...e });
}
function Cy(e) {
  const { size: t = 24, orientation: n = "left", className: r } = e;
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: handled by the parent component
    R.createElement(
      "svg",
      { className: r, width: t, height: t, viewBox: "0 0 24 24" },
      n === "up" && R.createElement("polygon", { points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28" }),
      n === "down" && R.createElement("polygon", { points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72" }),
      n === "left" && R.createElement("polygon", { points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20" }),
      n === "right" && R.createElement("polygon", { points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20" })
    )
  );
}
function Ey(e) {
  const { day: t, modifiers: n, ...r } = e;
  return R.createElement("td", { ...r });
}
function Ny(e) {
  const { day: t, modifiers: n, ...r } = e, o = R.useRef(null);
  return R.useEffect(() => {
    var a;
    n.focused && ((a = o.current) == null || a.focus());
  }, [n.focused]), R.createElement("button", { ref: o, ...r });
}
var U;
(function(e) {
  e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
})(U || (U = {}));
var me;
(function(e) {
  e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
})(me || (me = {}));
var Be;
(function(e) {
  e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
})(Be || (Be = {}));
var Me;
(function(e) {
  e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
})(Me || (Me = {}));
function Py(e) {
  const { options: t, className: n, components: r, classNames: o, ...a } = e, s = [o[U.Dropdown], n].join(" "), i = t == null ? void 0 : t.find(({ value: c }) => c === a.value);
  return R.createElement(
    "span",
    { "data-disabled": a.disabled, className: o[U.DropdownRoot] },
    R.createElement(r.Select, { className: s, ...a }, t == null ? void 0 : t.map(({ value: c, label: u, disabled: d }) => R.createElement(r.Option, { key: c, value: c, disabled: d }, u))),
    R.createElement(
      "span",
      { className: o[U.CaptionLabel], "aria-hidden": !0 },
      i == null ? void 0 : i.label,
      R.createElement(r.Chevron, { orientation: "down", size: 18, className: o[U.Chevron] })
    )
  );
}
function Ry(e) {
  return R.createElement("div", { ...e });
}
function ky(e) {
  return R.createElement("div", { ...e });
}
function My(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return R.createElement("div", { ...r }, e.children);
}
function Ty(e) {
  const { calendarMonth: t, displayIndex: n, ...r } = e;
  return R.createElement("div", { ...r });
}
function _y(e) {
  return R.createElement("table", { ...e });
}
function Dy(e) {
  return R.createElement("div", { ...e });
}
const qc = eh(void 0);
function _n() {
  const e = th(qc);
  if (e === void 0)
    throw new Error("useDayPicker() must be used within a custom component.");
  return e;
}
function Oy(e) {
  const { components: t } = _n();
  return R.createElement(t.Dropdown, { ...e });
}
function Ay(e) {
  const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...a } = e, { components: s, classNames: i, labels: { labelPrevious: c, labelNext: u } } = _n(), d = Ae((p) => {
    o && (n == null || n(p));
  }, [o, n]), f = Ae((p) => {
    r && (t == null || t(p));
  }, [r, t]);
  return R.createElement(
    "nav",
    { ...a },
    R.createElement(
      s.PreviousMonthButton,
      { type: "button", className: i[U.PreviousMonthButton], tabIndex: r ? void 0 : -1, "aria-disabled": r ? void 0 : !0, "aria-label": c(r), onClick: f },
      R.createElement(s.Chevron, { disabled: r ? void 0 : !0, className: i[U.Chevron], orientation: "left" })
    ),
    R.createElement(
      s.NextMonthButton,
      { type: "button", className: i[U.NextMonthButton], tabIndex: o ? void 0 : -1, "aria-disabled": o ? void 0 : !0, "aria-label": u(o), onClick: d },
      R.createElement(s.Chevron, { disabled: o ? void 0 : !0, orientation: "right", className: i[U.Chevron] })
    )
  );
}
function Iy(e) {
  const { components: t } = _n();
  return R.createElement(t.Button, { ...e });
}
function $y(e) {
  return R.createElement("option", { ...e });
}
function Wy(e) {
  const { components: t } = _n();
  return R.createElement(t.Button, { ...e });
}
function Fy(e) {
  const { rootRef: t, ...n } = e;
  return R.createElement("div", { ...n, ref: t });
}
function Ly(e) {
  return R.createElement("select", { ...e });
}
function By(e) {
  const { week: t, ...n } = e;
  return R.createElement("tr", { ...n });
}
function Vy(e) {
  return R.createElement("th", { ...e });
}
function Hy(e) {
  return R.createElement(
    "thead",
    { "aria-hidden": !0 },
    R.createElement("tr", { ...e })
  );
}
function Yy(e) {
  const { week: t, ...n } = e;
  return R.createElement("th", { ...n });
}
function zy(e) {
  return R.createElement("th", { ...e });
}
function Gy(e) {
  return R.createElement("tbody", { ...e });
}
function jy(e) {
  const { components: t } = _n();
  return R.createElement(t.Dropdown, { ...e });
}
const Uy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: xy,
  CaptionLabel: Sy,
  Chevron: Cy,
  Day: Ey,
  DayButton: Ny,
  Dropdown: Py,
  DropdownNav: Ry,
  Footer: ky,
  Month: My,
  MonthCaption: Ty,
  MonthGrid: _y,
  Months: Dy,
  MonthsDropdown: Oy,
  Nav: Ay,
  NextMonthButton: Iy,
  Option: $y,
  PreviousMonthButton: Wy,
  Root: Fy,
  Select: Ly,
  Week: By,
  WeekNumber: Yy,
  WeekNumberHeader: zy,
  Weekday: Vy,
  Weekdays: Hy,
  Weeks: Gy,
  YearsDropdown: jy
}, Symbol.toStringTag, { value: "Module" }));
function ot(e, t, n = !1, r = et) {
  let { from: o, to: a } = e;
  const { differenceInCalendarDays: s, isSameDay: i } = r;
  return o && a ? (s(a, o) < 0 && ([o, a] = [a, o]), s(t, o) >= (n ? 1 : 0) && s(a, t) >= (n ? 1 : 0)) : !n && a ? i(a, t) : !n && o ? i(o, t) : !1;
}
function Oa(e) {
  return !!(e && typeof e == "object" && "before" in e && "after" in e);
}
function Ar(e) {
  return !!(e && typeof e == "object" && "from" in e);
}
function Aa(e) {
  return !!(e && typeof e == "object" && "after" in e);
}
function Ia(e) {
  return !!(e && typeof e == "object" && "before" in e);
}
function Xc(e) {
  return !!(e && typeof e == "object" && "dayOfWeek" in e);
}
function Zc(e, t) {
  return Array.isArray(e) && e.every(t.isDate);
}
function at(e, t, n = et) {
  const r = Array.isArray(t) ? t : [t], { isSameDay: o, differenceInCalendarDays: a, isAfter: s } = n;
  return r.some((i) => {
    if (typeof i == "boolean")
      return i;
    if (n.isDate(i))
      return o(e, i);
    if (Zc(i, n))
      return i.some((c) => o(e, c));
    if (Ar(i))
      return ot(i, e, !1, n);
    if (Xc(i))
      return Array.isArray(i.dayOfWeek) ? i.dayOfWeek.includes(e.getDay()) : i.dayOfWeek === e.getDay();
    if (Oa(i)) {
      const c = a(i.before, e), u = a(i.after, e), d = c > 0, f = u < 0;
      return s(i.before, i.after) ? f && d : d || f;
    }
    return Aa(i) ? a(e, i.after) > 0 : Ia(i) ? a(i.before, e) > 0 : typeof i == "function" ? i(e) : !1;
  });
}
function Ky(e, t, n, r, o) {
  const { disabled: a, hidden: s, modifiers: i, showOutsideDays: c, broadcastCalendar: u, today: d = o.today() } = t, { isSameDay: f, isSameMonth: p, startOfMonth: h, isBefore: b, endOfMonth: g, isAfter: v } = o, w = n && h(n), y = r && g(r), x = {
    [me.focused]: [],
    [me.outside]: [],
    [me.disabled]: [],
    [me.hidden]: [],
    [me.today]: []
  }, S = {};
  for (const E of e) {
    const { date: C, displayMonth: N } = E, M = !!(N && !p(C, N)), _ = !!(w && b(C, w)), O = !!(y && v(C, y)), $ = !!(a && at(C, a, o)), I = !!(s && at(C, s, o)) || _ || O || // Broadcast calendar will show outside days as default
    !u && !c && M || u && c === !1 && M, Y = f(C, d);
    M && x.outside.push(E), $ && x.disabled.push(E), I && x.hidden.push(E), Y && x.today.push(E), i && Object.keys(i).forEach((D) => {
      const z = i == null ? void 0 : i[D];
      z && at(C, z, o) && (S[D] ? S[D].push(E) : S[D] = [E]);
    });
  }
  return (E) => {
    const C = {
      [me.focused]: !1,
      [me.disabled]: !1,
      [me.hidden]: !1,
      [me.outside]: !1,
      [me.today]: !1
    }, N = {};
    for (const M in x) {
      const _ = x[M];
      C[M] = _.some((O) => O === E);
    }
    for (const M in S)
      N[M] = S[M].some((_) => _ === E);
    return {
      ...C,
      // custom modifiers should override all the previous ones
      ...N
    };
  };
}
function qy(e, t, n = {}) {
  return Object.entries(e).filter(([, o]) => o === !0).reduce((o, [a]) => (n[a] ? o.push(n[a]) : t[me[a]] ? o.push(t[me[a]]) : t[Be[a]] && o.push(t[Be[a]]), o), [t[U.Day]]);
}
function Xy(e) {
  return {
    ...Uy,
    ...e
  };
}
function Zy(e) {
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
function $a() {
  const e = {};
  for (const t in U)
    e[U[t]] = `rdp-${U[t]}`;
  for (const t in me)
    e[me[t]] = `rdp-${me[t]}`;
  for (const t in Be)
    e[Be[t]] = `rdp-${Be[t]}`;
  for (const t in Me)
    e[Me[t]] = `rdp-${Me[t]}`;
  return e;
}
function Qc(e, t, n) {
  return (n ?? new De(t)).formatMonthYear(e);
}
const Qy = Qc;
function Jy(e, t, n) {
  return (n ?? new De(t)).format(e, "d");
}
function ew(e, t = et) {
  return t.format(e, "LLLL");
}
function tw(e, t, n) {
  return (n ?? new De(t)).format(e, "cccccc");
}
function nw(e, t = et) {
  return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
}
function rw() {
  return "";
}
function Jc(e, t = et) {
  return t.format(e, "yyyy");
}
const ow = Jc, aw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  formatCaption: Qc,
  formatDay: Jy,
  formatMonthCaption: Qy,
  formatMonthDropdown: ew,
  formatWeekNumber: nw,
  formatWeekNumberHeader: rw,
  formatWeekdayName: tw,
  formatYearCaption: ow,
  formatYearDropdown: Jc
}, Symbol.toStringTag, { value: "Module" }));
function sw(e) {
  return e != null && e.formatMonthCaption && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), e != null && e.formatYearCaption && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
    ...aw,
    ...e
  };
}
function Wa(e, t, n, r) {
  let o = (r ?? new De(n)).format(e, "PPPP");
  return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
}
const iw = Wa;
function Fa(e, t, n) {
  return (n ?? new De(t)).formatMonthYear(e);
}
const cw = Fa;
function el(e, t, n, r) {
  let o = (r ?? new De(n)).format(e, "PPPP");
  return t != null && t.today && (o = `Today, ${o}`), o;
}
function tl(e) {
  return "Choose the Month";
}
function nl() {
  return "";
}
const lw = "Go to the Next Month";
function rl(e, t) {
  return lw;
}
function ol(e) {
  return "Go to the Previous Month";
}
function al(e, t, n) {
  return (n ?? new De(t)).format(e, "cccc");
}
function sl(e, t) {
  return `Week ${e}`;
}
function il(e) {
  return "Week Number";
}
function cl(e) {
  return "Choose the Year";
}
const uw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  labelCaption: cw,
  labelDay: iw,
  labelDayButton: Wa,
  labelGrid: Fa,
  labelGridcell: el,
  labelMonthDropdown: tl,
  labelNav: nl,
  labelNext: rl,
  labelPrevious: ol,
  labelWeekNumber: sl,
  labelWeekNumberHeader: il,
  labelWeekday: al,
  labelYearDropdown: cl
}, Symbol.toStringTag, { value: "Module" })), Fe = (e, t, n) => t || (n ? typeof n == "function" ? n : (...r) => n : e);
function dw(e, t) {
  var r;
  const n = ((r = t.locale) == null ? void 0 : r.labels) ?? {};
  return {
    ...uw,
    ...e ?? {},
    labelDayButton: Fe(Wa, e == null ? void 0 : e.labelDayButton, n.labelDayButton),
    labelMonthDropdown: Fe(tl, e == null ? void 0 : e.labelMonthDropdown, n.labelMonthDropdown),
    labelNext: Fe(rl, e == null ? void 0 : e.labelNext, n.labelNext),
    labelPrevious: Fe(ol, e == null ? void 0 : e.labelPrevious, n.labelPrevious),
    labelWeekNumber: Fe(sl, e == null ? void 0 : e.labelWeekNumber, n.labelWeekNumber),
    labelYearDropdown: Fe(cl, e == null ? void 0 : e.labelYearDropdown, n.labelYearDropdown),
    labelGrid: Fe(Fa, e == null ? void 0 : e.labelGrid, n.labelGrid),
    labelGridcell: Fe(el, e == null ? void 0 : e.labelGridcell, n.labelGridcell),
    labelNav: Fe(nl, e == null ? void 0 : e.labelNav, n.labelNav),
    labelWeekNumberHeader: Fe(il, e == null ? void 0 : e.labelWeekNumberHeader, n.labelWeekNumberHeader),
    labelWeekday: Fe(al, e == null ? void 0 : e.labelWeekday, n.labelWeekday)
  };
}
function fw(e, t, n, r, o) {
  const { startOfMonth: a, startOfYear: s, endOfYear: i, eachMonthOfInterval: c, getMonth: u } = o;
  return c({
    start: s(e),
    end: i(e)
  }).map((p) => {
    const h = r.formatMonthDropdown(p, o), b = u(p), g = t && p < a(t) || n && p > a(n) || !1;
    return { value: b, label: h, disabled: g };
  });
}
function mw(e, t = {}, n = {}) {
  let r = { ...t == null ? void 0 : t[U.Day] };
  return Object.entries(e).filter(([, o]) => o === !0).forEach(([o]) => {
    r = {
      ...r,
      ...n == null ? void 0 : n[o]
    };
  }), r;
}
function pw(e, t, n, r) {
  const o = r ?? e.today(), a = n ? e.startOfBroadcastWeek(o, e) : t ? e.startOfISOWeek(o) : e.startOfWeek(o), s = [];
  for (let i = 0; i < 7; i++) {
    const c = e.addDays(a, i);
    s.push(c);
  }
  return s;
}
function hw(e, t, n, r, o = !1) {
  if (!e || !t)
    return;
  const { startOfYear: a, endOfYear: s, eachYearOfInterval: i, getYear: c } = r, u = a(e), d = s(t), f = i({ start: u, end: d });
  return o && f.reverse(), f.map((p) => {
    const h = n.formatYearDropdown(p, r);
    return {
      value: c(p),
      label: h,
      disabled: !1
    };
  });
}
function gw(e, t = {}) {
  var i;
  const { weekStartsOn: n, locale: r } = t, o = n ?? ((i = r == null ? void 0 : r.options) == null ? void 0 : i.weekStartsOn) ?? 0, a = (c) => {
    const u = typeof c == "number" || typeof c == "string" ? new Date(c) : c;
    return new Se(u.getFullYear(), u.getMonth(), u.getDate(), 12, 0, 0, e);
  }, s = (c) => {
    const u = a(c);
    return new Date(u.getFullYear(), u.getMonth(), u.getDate(), 0, 0, 0, 0);
  };
  return {
    today: () => a(Se.tz(e)),
    newDate: (c, u, d) => new Se(c, u, d, 12, 0, 0, e),
    startOfDay: (c) => a(c),
    startOfWeek: (c, u) => {
      const d = a(c), f = (u == null ? void 0 : u.weekStartsOn) ?? o, p = (d.getDay() - f + 7) % 7;
      return d.setDate(d.getDate() - p), d;
    },
    startOfISOWeek: (c) => {
      const u = a(c), d = (u.getDay() - 1 + 7) % 7;
      return u.setDate(u.getDate() - d), u;
    },
    startOfMonth: (c) => {
      const u = a(c);
      return u.setDate(1), u;
    },
    startOfYear: (c) => {
      const u = a(c);
      return u.setMonth(0, 1), u;
    },
    endOfWeek: (c, u) => {
      const d = a(c), h = ((((u == null ? void 0 : u.weekStartsOn) ?? o) + 6) % 7 - d.getDay() + 7) % 7;
      return d.setDate(d.getDate() + h), d;
    },
    endOfISOWeek: (c) => {
      const u = a(c), d = (7 - u.getDay()) % 7;
      return u.setDate(u.getDate() + d), u;
    },
    endOfMonth: (c) => {
      const u = a(c);
      return u.setMonth(u.getMonth() + 1, 0), u;
    },
    endOfYear: (c) => {
      const u = a(c);
      return u.setMonth(11, 31), u;
    },
    eachMonthOfInterval: (c) => {
      const u = a(c.start), d = a(c.end), f = [], p = new Se(u.getFullYear(), u.getMonth(), 1, 12, 0, 0, e), h = d.getFullYear() * 12 + d.getMonth();
      for (; p.getFullYear() * 12 + p.getMonth() <= h; )
        f.push(new Se(p, e)), p.setMonth(p.getMonth() + 1, 1);
      return f;
    },
    // Normalize to noon once before arithmetic (avoid DST/midnight edge cases),
    // mutate the same TZDate, and return it.
    addDays: (c, u) => {
      const d = a(c);
      return d.setDate(d.getDate() + u), d;
    },
    addWeeks: (c, u) => {
      const d = a(c);
      return d.setDate(d.getDate() + u * 7), d;
    },
    addMonths: (c, u) => {
      const d = a(c);
      return d.setMonth(d.getMonth() + u), d;
    },
    addYears: (c, u) => {
      const d = a(c);
      return d.setFullYear(d.getFullYear() + u), d;
    },
    eachYearOfInterval: (c) => {
      const u = a(c.start), d = a(c.end), f = [], p = new Se(u.getFullYear(), 0, 1, 12, 0, 0, e);
      for (; p.getFullYear() <= d.getFullYear(); )
        f.push(new Se(p, e)), p.setFullYear(p.getFullYear() + 1, 0, 1);
      return f;
    },
    getWeek: (c, u) => {
      var f;
      const d = s(c);
      return Da(d, {
        weekStartsOn: (u == null ? void 0 : u.weekStartsOn) ?? o,
        firstWeekContainsDate: (u == null ? void 0 : u.firstWeekContainsDate) ?? ((f = r == null ? void 0 : r.options) == null ? void 0 : f.firstWeekContainsDate) ?? 1
      });
    },
    getISOWeek: (c) => {
      const u = s(c);
      return _a(u);
    },
    differenceInCalendarDays: (c, u) => {
      const d = s(c), f = s(u);
      return Ta(d, f);
    },
    differenceInCalendarMonths: (c, u) => {
      const d = s(c), f = s(u);
      return Lc(d, f);
    }
  };
}
const Dn = (e) => e instanceof HTMLElement ? e : null, Eo = (e) => [
  ...e.querySelectorAll("[data-animated-month]") ?? []
], vw = (e) => Dn(e.querySelector("[data-animated-month]")), No = (e) => Dn(e.querySelector("[data-animated-caption]")), Po = (e) => Dn(e.querySelector("[data-animated-weeks]")), bw = (e) => Dn(e.querySelector("[data-animated-nav]")), yw = (e) => Dn(e.querySelector("[data-animated-weekdays]"));
function ww(e, t, { classNames: n, months: r, focused: o, dateLib: a }) {
  const s = or(null), i = or(r), c = or(!1);
  Gi(() => {
    const u = i.current;
    if (i.current = r, !t || !e.current || // safety check because the ref can be set to anything by consumers
    !(e.current instanceof HTMLElement) || // validation required for the animation to work as expected
    r.length === 0 || u.length === 0 || r.length !== u.length)
      return;
    const d = a.isSameMonth(r[0].date, u[0].date), f = a.isAfter(r[0].date, u[0].date), p = f ? n[Me.caption_after_enter] : n[Me.caption_before_enter], h = f ? n[Me.weeks_after_enter] : n[Me.weeks_before_enter], b = s.current, g = e.current.cloneNode(!0);
    if (g instanceof HTMLElement ? (Eo(g).forEach((x) => {
      if (!(x instanceof HTMLElement))
        return;
      const S = vw(x);
      S && x.contains(S) && x.removeChild(S);
      const E = No(x);
      E && E.classList.remove(p);
      const C = Po(x);
      C && C.classList.remove(h);
    }), s.current = g) : s.current = null, c.current || d || // skip animation if a day is focused because it can cause issues to the animation and is better for a11y
    o)
      return;
    const v = b instanceof HTMLElement ? Eo(b) : [], w = Eo(e.current);
    if (w != null && w.every((y) => y instanceof HTMLElement) && v && v.every((y) => y instanceof HTMLElement)) {
      c.current = !0, e.current.style.isolation = "isolate";
      const y = bw(e.current);
      y && (y.style.zIndex = "1"), w.forEach((x, S) => {
        const E = v[S];
        if (!E)
          return;
        x.style.position = "relative", x.style.overflow = "hidden";
        const C = No(x);
        C && C.classList.add(p);
        const N = Po(x);
        N && N.classList.add(h);
        const M = () => {
          c.current = !1, e.current && (e.current.style.isolation = ""), y && (y.style.zIndex = ""), C && C.classList.remove(p), N && N.classList.remove(h), x.style.position = "", x.style.overflow = "", x.contains(E) && x.removeChild(E);
        };
        E.style.pointerEvents = "none", E.style.position = "absolute", E.style.overflow = "hidden", E.setAttribute("aria-hidden", "true");
        const _ = yw(E);
        _ && (_.style.opacity = "0");
        const O = No(E);
        O && (O.classList.add(f ? n[Me.caption_before_exit] : n[Me.caption_after_exit]), O.addEventListener("animationend", M));
        const $ = Po(E);
        $ && $.classList.add(f ? n[Me.weeks_before_exit] : n[Me.weeks_after_exit]), x.insertBefore(E, x.firstChild);
      });
    }
  });
}
function xw(e, t, n, r) {
  const o = e[0], a = e[e.length - 1], { ISOWeek: s, fixedWeeks: i, broadcastCalendar: c } = n ?? {}, { addDays: u, differenceInCalendarDays: d, differenceInCalendarMonths: f, endOfBroadcastWeek: p, endOfISOWeek: h, endOfMonth: b, endOfWeek: g, isAfter: v, startOfBroadcastWeek: w, startOfISOWeek: y, startOfWeek: x } = r, S = c ? w(o, r) : s ? y(o) : x(o), E = c ? p(a) : s ? h(b(a)) : g(b(a)), C = t && (c ? p(t) : s ? h(t) : g(t)), N = C && v(E, C) ? C : E, M = d(N, S), _ = f(a, o) + 1, O = [];
  for (let Y = 0; Y <= M; Y++) {
    const D = u(S, Y);
    O.push(D);
  }
  const I = (c ? 35 : 42) * _;
  if (i && O.length < I) {
    const Y = I - O.length;
    for (let D = 0; D < Y; D++) {
      const z = u(O[O.length - 1], 1);
      O.push(z);
    }
  }
  return O;
}
function Sw(e) {
  const t = [];
  return e.reduce((n, r) => {
    const o = r.weeks.reduce((a, s) => a.concat(s.days.slice()), t.slice());
    return n.concat(o.slice());
  }, t.slice());
}
function Cw(e, t, n, r) {
  const { numberOfMonths: o = 1 } = n, a = [];
  for (let s = 0; s < o; s++) {
    const i = r.addMonths(e, s);
    if (t && i > t)
      break;
    a.push(i);
  }
  return a;
}
function ni(e, t, n, r) {
  const { month: o, defaultMonth: a, today: s = r.today(), numberOfMonths: i = 1 } = e;
  let c = o || a || s;
  const { differenceInCalendarMonths: u, addMonths: d, startOfMonth: f } = r;
  if (n && u(n, c) < i - 1) {
    const p = -1 * (i - 1);
    c = d(n, p);
  }
  return t && u(c, t) < 0 && (c = t), f(c);
}
function Ew(e, t, n, r) {
  const { addDays: o, endOfBroadcastWeek: a, endOfISOWeek: s, endOfMonth: i, endOfWeek: c, getISOWeek: u, getWeek: d, startOfBroadcastWeek: f, startOfISOWeek: p, startOfWeek: h } = r, b = e.reduce((g, v) => {
    const w = n.broadcastCalendar ? f(v, r) : n.ISOWeek ? p(v) : h(v), y = n.broadcastCalendar ? a(v) : n.ISOWeek ? s(i(v)) : c(i(v)), x = t.filter((N) => N >= w && N <= y), S = n.broadcastCalendar ? 35 : 42;
    if (n.fixedWeeks && x.length < S) {
      const N = t.filter((M) => {
        const _ = S - x.length;
        return M > y && M <= o(y, _);
      });
      x.push(...N);
    }
    const E = x.reduce((N, M) => {
      const _ = n.ISOWeek ? u(M) : d(M), O = N.find((I) => I.weekNumber === _), $ = new Kc(M, v, r);
      return O ? O.days.push($) : N.push(new wy(_, [$])), N;
    }, []), C = new yy(v, E);
    return g.push(C), g;
  }, []);
  return n.reverseMonths ? b.reverse() : b;
}
function Nw(e, t) {
  let { startMonth: n, endMonth: r } = e;
  const { startOfYear: o, startOfDay: a, startOfMonth: s, endOfMonth: i, addYears: c, endOfYear: u, newDate: d, today: f } = t, { fromYear: p, toYear: h, fromMonth: b, toMonth: g } = e;
  !n && b && (n = b), !n && p && (n = t.newDate(p, 0, 1)), !r && g && (r = g), !r && h && (r = d(h, 11, 31));
  const v = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
  return n ? n = s(n) : p ? n = d(p, 0, 1) : !n && v && (n = o(c(e.today ?? f(), -100))), r ? r = i(r) : h ? r = d(h, 11, 31) : !r && v && (r = u(e.today ?? f())), [
    n && a(n),
    r && a(r)
  ];
}
function Pw(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a = 1 } = n, { startOfMonth: s, addMonths: i, differenceInCalendarMonths: c } = r, u = o ? a : 1, d = s(e);
  if (!t)
    return i(d, u);
  if (!(c(t, e) < a))
    return i(d, u);
}
function Rw(e, t, n, r) {
  if (n.disableNavigation)
    return;
  const { pagedNavigation: o, numberOfMonths: a } = n, { startOfMonth: s, addMonths: i, differenceInCalendarMonths: c } = r, u = o ? a ?? 1 : 1, d = s(e);
  if (!t)
    return i(d, -u);
  if (!(c(d, t) <= 0))
    return i(d, -u);
}
function kw(e) {
  const t = [];
  return e.reduce((n, r) => n.concat(r.weeks.slice()), t.slice());
}
function Ir(e, t) {
  const [n, r] = fr(e);
  return [t === void 0 ? n : t, r];
}
function Mw(e, t) {
  var S;
  const [n, r] = Nw(e, t), { startOfMonth: o, endOfMonth: a } = t, s = ni(e, n, r, t), [i, c] = Ir(
    s,
    // initialMonth is always computed from props.month if provided
    e.month ? s : void 0
  );
  nh(() => {
    const E = ni(e, n, r, t);
    c(E);
  }, [e.timeZone]);
  const { months: u, weeks: d, days: f, previousMonth: p, nextMonth: h } = ar(() => {
    const E = Cw(i, r, { numberOfMonths: e.numberOfMonths }, t), C = xw(E, e.endMonth ? a(e.endMonth) : void 0, {
      ISOWeek: e.ISOWeek,
      fixedWeeks: e.fixedWeeks,
      broadcastCalendar: e.broadcastCalendar
    }, t), N = Ew(E, C, {
      broadcastCalendar: e.broadcastCalendar,
      fixedWeeks: e.fixedWeeks,
      ISOWeek: e.ISOWeek,
      reverseMonths: e.reverseMonths
    }, t), M = kw(N), _ = Sw(N), O = Rw(i, n, e, t), $ = Pw(i, r, e, t);
    return {
      months: N,
      weeks: M,
      days: _,
      previousMonth: O,
      nextMonth: $
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
  ]), { disableNavigation: b, onMonthChange: g } = e, v = (E) => d.some((C) => C.days.some((N) => N.isEqualTo(E))), w = (E) => {
    if (b)
      return;
    let C = o(E);
    n && C < o(n) && (C = o(n)), r && C > o(r) && (C = o(r)), c(C), g == null || g(C);
  };
  return {
    months: u,
    weeks: d,
    days: f,
    navStart: n,
    navEnd: r,
    previousMonth: p,
    nextMonth: h,
    goToMonth: w,
    goToDay: (E) => {
      v(E) || w(E.date);
    }
  };
}
var je;
(function(e) {
  e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
})(je || (je = {}));
function ri(e) {
  return !e[me.disabled] && !e[me.hidden] && !e[me.outside];
}
function Tw(e, t, n, r) {
  let o, a = -1;
  for (const s of e) {
    const i = t(s);
    ri(i) && (i[me.focused] && a < je.FocusedModifier ? (o = s, a = je.FocusedModifier) : r != null && r.isEqualTo(s) && a < je.LastFocused ? (o = s, a = je.LastFocused) : n(s.date) && a < je.Selected ? (o = s, a = je.Selected) : i[me.today] && a < je.Today && (o = s, a = je.Today));
  }
  return o || (o = e.find((s) => ri(t(s)))), o;
}
function _w(e, t, n, r, o, a, s) {
  const { ISOWeek: i, broadcastCalendar: c } = a, { addDays: u, addMonths: d, addWeeks: f, addYears: p, endOfBroadcastWeek: h, endOfISOWeek: b, endOfWeek: g, max: v, min: w, startOfBroadcastWeek: y, startOfISOWeek: x, startOfWeek: S } = s;
  let C = {
    day: u,
    week: f,
    month: d,
    year: p,
    startOfWeek: (N) => c ? y(N, s) : i ? x(N) : S(N),
    endOfWeek: (N) => c ? h(N) : i ? b(N) : g(N)
  }[e](n, t === "after" ? 1 : -1);
  return t === "before" && r ? C = v([r, C]) : t === "after" && o && (C = w([o, C])), C;
}
function ll(e, t, n, r, o, a, s, i = 0) {
  if (i > 365)
    return;
  const c = _w(e, t, n.date, r, o, a, s), u = !!(a.disabled && at(c, a.disabled, s)), d = !!(a.hidden && at(c, a.hidden, s)), f = c, p = new Kc(c, f, s);
  return !u && !d ? p : ll(e, t, p, r, o, a, s, i + 1);
}
function Dw(e, t, n, r, o) {
  const { autoFocus: a } = e, [s, i] = fr(), c = Tw(t.days, n, r || (() => !1), s), [u, d] = fr(a ? c : void 0);
  return {
    isFocusTarget: (g) => !!(c != null && c.isEqualTo(g)),
    setFocused: d,
    focused: u,
    blur: () => {
      i(u), d(void 0);
    },
    moveFocus: (g, v) => {
      if (!u)
        return;
      const w = ll(g, v, u, t.navStart, t.navEnd, e, o);
      w && (e.disableNavigation && !t.days.some((x) => x.isEqualTo(w)) || (t.goToDay(w), d(w)));
    }
  };
}
function Ow(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, s] = Ir(n, o ? n : void 0), i = o ? n : a, { isSameDay: c } = t, u = (h) => (i == null ? void 0 : i.some((b) => c(b, h))) ?? !1, { min: d, max: f } = e;
  return {
    selected: i,
    select: (h, b, g) => {
      let v = [...i ?? []];
      if (u(h)) {
        if ((i == null ? void 0 : i.length) === d || r && (i == null ? void 0 : i.length) === 1)
          return;
        v = i == null ? void 0 : i.filter((w) => !c(w, h));
      } else
        (i == null ? void 0 : i.length) === f ? v = [h] : v = [...v, h];
      return o || s(v), o == null || o(v, h, b, g), v;
    },
    isSelected: u
  };
}
function Aw(e, t, n = 0, r = 0, o = !1, a = et) {
  const { from: s, to: i } = t || {}, { isSameDay: c, isAfter: u, isBefore: d } = a;
  let f;
  if (!s && !i)
    f = { from: e, to: n > 0 ? void 0 : e };
  else if (s && !i)
    c(s, e) ? n === 0 ? f = { from: s, to: e } : o ? f = { from: s, to: void 0 } : f = void 0 : d(e, s) ? f = { from: e, to: s } : f = { from: s, to: e };
  else if (s && i)
    if (c(s, e) && c(i, e))
      o ? f = { from: s, to: i } : f = void 0;
    else if (c(s, e))
      f = { from: s, to: n > 0 ? void 0 : e };
    else if (c(i, e))
      f = { from: e, to: n > 0 ? void 0 : e };
    else if (d(e, s))
      f = { from: e, to: i };
    else if (u(e, s))
      f = { from: s, to: e };
    else if (u(e, i))
      f = { from: s, to: e };
    else
      throw new Error("Invalid range");
  if (f != null && f.from && (f != null && f.to)) {
    const p = a.differenceInCalendarDays(f.to, f.from);
    r > 0 && p > r ? f = { from: e, to: void 0 } : n > 1 && p < n && (f = { from: e, to: void 0 });
  }
  return f;
}
function Iw(e, t, n = et) {
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
function oi(e, t, n = et) {
  return ot(e, t.from, !1, n) || ot(e, t.to, !1, n) || ot(t, e.from, !1, n) || ot(t, e.to, !1, n);
}
function $w(e, t, n = et) {
  const r = Array.isArray(t) ? t : [t];
  if (r.filter((i) => typeof i != "function").some((i) => typeof i == "boolean" ? i : n.isDate(i) ? ot(e, i, !1, n) : Zc(i, n) ? i.some((c) => ot(e, c, !1, n)) : Ar(i) ? i.from && i.to ? oi(e, { from: i.from, to: i.to }, n) : !1 : Xc(i) ? Iw(e, i.dayOfWeek, n) : Oa(i) ? n.isAfter(i.before, i.after) ? oi(e, {
    from: n.addDays(i.after, 1),
    to: n.addDays(i.before, -1)
  }, n) : at(e.from, i, n) || at(e.to, i, n) : Aa(i) || Ia(i) ? at(e.from, i, n) || at(e.to, i, n) : !1))
    return !0;
  const s = r.filter((i) => typeof i == "function");
  if (s.length) {
    let i = e.from;
    const c = n.differenceInCalendarDays(e.to, e.from);
    for (let u = 0; u <= c; u++) {
      if (s.some((d) => d(i)))
        return !0;
      i = n.addDays(i, 1);
    }
  }
  return !1;
}
function Ww(e, t) {
  const { disabled: n, excludeDisabled: r, resetOnSelect: o, selected: a, required: s, onSelect: i } = e, [c, u] = Ir(a, i ? a : void 0), d = i ? a : c;
  return {
    selected: d,
    select: (h, b, g) => {
      const { min: v, max: w } = e;
      let y;
      if (h) {
        const x = d == null ? void 0 : d.from, S = d == null ? void 0 : d.to, E = !!x && !!S, C = !!x && !!S && t.isSameDay(x, S) && t.isSameDay(h, x);
        o && (E || !(d != null && d.from)) ? !s && C ? y = void 0 : y = { from: h, to: void 0 } : y = Aw(h, d, v, w, s, t);
      }
      return r && n && (y != null && y.from) && y.to && $w({ from: y.from, to: y.to }, n, t) && (y.from = h, y.to = void 0), i || u(y), i == null || i(y, h, b, g), y;
    },
    isSelected: (h) => d && ot(d, h, !1, t)
  };
}
function Fw(e, t) {
  const { selected: n, required: r, onSelect: o } = e, [a, s] = Ir(n, o ? n : void 0), i = o ? n : a, { isSameDay: c } = t;
  return {
    selected: i,
    select: (f, p, h) => {
      let b = f;
      return !r && i && i && c(f, i) && (b = void 0), o || s(b), o == null || o(b, f, p, h), b;
    },
    isSelected: (f) => i ? c(i, f) : !1
  };
}
function Lw(e, t) {
  const n = Fw(e, t), r = Ow(e, t), o = Ww(e, t);
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
function Ie(e, t) {
  return e instanceof Se && e.timeZone === t ? e : new Se(e, t);
}
function Vt(e, t, n) {
  return Ie(e, t);
}
function ai(e, t, n) {
  return typeof e == "boolean" || typeof e == "function" ? e : e instanceof Date ? Vt(e, t) : Array.isArray(e) ? e.map((r) => r instanceof Date ? Vt(r, t) : r) : Ar(e) ? {
    ...e,
    from: e.from ? Ie(e.from, t) : e.from,
    to: e.to ? Ie(e.to, t) : e.to
  } : Oa(e) ? {
    before: Vt(e.before, t),
    after: Vt(e.after, t)
  } : Aa(e) ? {
    after: Vt(e.after, t)
  } : Ia(e) ? {
    before: Vt(e.before, t)
  } : e;
}
function Ro(e, t, n) {
  return e && (Array.isArray(e) ? e.map((r) => ai(r, t)) : ai(e, t));
}
function Bw(e) {
  var $s;
  let t = e;
  const n = t.timeZone;
  if (n && (t = {
    ...e,
    timeZone: n
  }, t.today && (t.today = Ie(t.today, n)), t.month && (t.month = Ie(t.month, n)), t.defaultMonth && (t.defaultMonth = Ie(t.defaultMonth, n)), t.startMonth && (t.startMonth = Ie(t.startMonth, n)), t.endMonth && (t.endMonth = Ie(t.endMonth, n)), t.mode === "single" && t.selected ? t.selected = Ie(t.selected, n) : t.mode === "multiple" && t.selected ? t.selected = ($s = t.selected) == null ? void 0 : $s.map((ne) => Ie(ne, n)) : t.mode === "range" && t.selected && (t.selected = {
    from: t.selected.from ? Ie(t.selected.from, n) : t.selected.from,
    to: t.selected.to ? Ie(t.selected.to, n) : t.selected.to
  }), t.disabled !== void 0 && (t.disabled = Ro(t.disabled, n)), t.hidden !== void 0 && (t.hidden = Ro(t.hidden, n)), t.modifiers)) {
    const ne = {};
    Object.keys(t.modifiers).forEach((le) => {
      var X;
      ne[le] = Ro((X = t.modifiers) == null ? void 0 : X[le], n);
    }), t.modifiers = ne;
  }
  const { components: r, formatters: o, labels: a, dateLib: s, locale: i, classNames: c } = ar(() => {
    const ne = { ...Uc, ...t.locale }, le = t.broadcastCalendar ? 1 : t.weekStartsOn, X = t.noonSafe && t.timeZone ? gw(t.timeZone, {
      weekStartsOn: le,
      locale: ne
    }) : void 0, se = t.dateLib && X ? { ...X, ...t.dateLib } : t.dateLib ?? X, ke = new De({
      locale: ne,
      weekStartsOn: le,
      firstWeekContainsDate: t.firstWeekContainsDate,
      useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
      useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
      timeZone: t.timeZone,
      numerals: t.numerals
    }, se);
    return {
      dateLib: ke,
      components: Xy(t.components),
      formatters: sw(t.formatters),
      labels: dw(t.labels, ke.options),
      locale: ne,
      classNames: { ...$a(), ...t.classNames }
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
  const { captionLayout: u, mode: d, navLayout: f, numberOfMonths: p = 1, onDayBlur: h, onDayClick: b, onDayFocus: g, onDayKeyDown: v, onDayMouseEnter: w, onDayMouseLeave: y, onNextClick: x, onPrevClick: S, showWeekNumber: E, styles: C } = t, { formatCaption: N, formatDay: M, formatMonthDropdown: _, formatWeekNumber: O, formatWeekNumberHeader: $, formatWeekdayName: I, formatYearDropdown: Y } = o, D = Mw(t, s), { days: z, months: B, navStart: j, navEnd: L, previousMonth: A, nextMonth: Z, goToMonth: Q } = D, k = Ky(z, t, j, L, s), { isSelected: H, select: K, selected: V } = Lw(t, s) ?? {}, { blur: ee, focused: W, isFocusTarget: te, moveFocus: J, setFocused: oe } = Dw(t, D, k, H ?? (() => !1), s), { labelDayButton: ie, labelGridcell: ce, labelGrid: Ee, labelMonthDropdown: Oe, labelNav: lt, labelPrevious: Et, labelNext: Nt, labelWeekday: ho, labelWeekNumber: Lt, labelWeekNumberHeader: $p, labelYearDropdown: Wp } = a, Fp = ar(() => pw(s, t.ISOWeek, t.broadcastCalendar, t.today), [s, t.ISOWeek, t.broadcastCalendar, t.today]), As = d !== void 0 || b !== void 0, go = Ae(() => {
    A && (Q(A), S == null || S(A));
  }, [A, Q, S]), vo = Ae(() => {
    Z && (Q(Z), x == null || x(Z));
  }, [Q, Z, x]), Lp = Ae((ne, le) => (X) => {
    X.preventDefault(), X.stopPropagation(), oe(ne), !le.disabled && (K == null || K(ne.date, le, X), b == null || b(ne.date, le, X));
  }, [K, b, oe]), Bp = Ae((ne, le) => (X) => {
    oe(ne), g == null || g(ne.date, le, X);
  }, [g, oe]), Vp = Ae((ne, le) => (X) => {
    ee(), h == null || h(ne.date, le, X);
  }, [ee, h]), Hp = Ae((ne, le) => (X) => {
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
      const [ke, ae] = se[X.key];
      J(ke, ae);
    }
    v == null || v(ne.date, le, X);
  }, [J, v, t.dir]), Yp = Ae((ne, le) => (X) => {
    w == null || w(ne.date, le, X);
  }, [w]), zp = Ae((ne, le) => (X) => {
    y == null || y(ne.date, le, X);
  }, [y]), Gp = Ae((ne) => (le) => {
    const X = Number(le.target.value), se = s.setMonth(s.startOfMonth(ne), X);
    Q(se);
  }, [s, Q]), jp = Ae((ne) => (le) => {
    const X = Number(le.target.value), se = s.setYear(s.startOfMonth(ne), X);
    Q(se);
  }, [s, Q]), { className: Up, style: Kp } = ar(() => ({
    className: [c[U.Root], t.className].filter(Boolean).join(" "),
    style: { ...C == null ? void 0 : C[U.Root], ...t.style }
  }), [c, t.className, t.style, C]), qp = Zy(t), Is = or(null);
  ww(Is, !!t.animate, {
    classNames: c,
    months: B,
    focused: W,
    dateLib: s
  });
  const Xp = {
    dayPickerProps: t,
    selected: V,
    select: K,
    isSelected: H,
    months: B,
    nextMonth: Z,
    previousMonth: A,
    goToMonth: Q,
    getModifiers: k,
    components: r,
    classNames: c,
    styles: C,
    labels: a,
    formatters: o
  };
  return R.createElement(
    qc.Provider,
    { value: Xp },
    R.createElement(
      r.Root,
      { rootRef: t.animate ? Is : void 0, className: Up, style: Kp, dir: t.dir, id: t.id, lang: t.lang ?? i.code, nonce: t.nonce, title: t.title, role: t.role, "aria-label": t["aria-label"], "aria-labelledby": t["aria-labelledby"], ...qp },
      R.createElement(
        r.Months,
        { className: c[U.Months], style: C == null ? void 0 : C[U.Months] },
        !t.hideNavigation && !f && R.createElement(r.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: c[U.Nav], style: C == null ? void 0 : C[U.Nav], "aria-label": lt(), onPreviousClick: go, onNextClick: vo, previousMonth: A, nextMonth: Z }),
        B.map((ne, le) => R.createElement(
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
          f === "around" && !t.hideNavigation && le === 0 && R.createElement(
            r.PreviousMonthButton,
            { type: "button", className: c[U.PreviousMonthButton], tabIndex: A ? void 0 : -1, "aria-disabled": A ? void 0 : !0, "aria-label": Et(A), onClick: go, "data-animated-button": t.animate ? "true" : void 0 },
            R.createElement(r.Chevron, { disabled: A ? void 0 : !0, className: c[U.Chevron], orientation: t.dir === "rtl" ? "right" : "left" })
          ),
          R.createElement(r.MonthCaption, { "data-animated-caption": t.animate ? "true" : void 0, className: c[U.MonthCaption], style: C == null ? void 0 : C[U.MonthCaption], calendarMonth: ne, displayIndex: le }, u != null && u.startsWith("dropdown") ? R.createElement(
            r.DropdownNav,
            { className: c[U.Dropdowns], style: C == null ? void 0 : C[U.Dropdowns] },
            (() => {
              const X = u === "dropdown" || u === "dropdown-months" ? R.createElement(r.MonthsDropdown, { key: "month", className: c[U.MonthsDropdown], "aria-label": Oe(), classNames: c, components: r, disabled: !!t.disableNavigation, onChange: Gp(ne.date), options: fw(ne.date, j, L, o, s), style: C == null ? void 0 : C[U.Dropdown], value: s.getMonth(ne.date) }) : R.createElement("span", { key: "month" }, _(ne.date, s)), se = u === "dropdown" || u === "dropdown-years" ? R.createElement(r.YearsDropdown, { key: "year", className: c[U.YearsDropdown], "aria-label": Wp(s.options), classNames: c, components: r, disabled: !!t.disableNavigation, onChange: jp(ne.date), options: hw(j, L, o, s, !!t.reverseYears), style: C == null ? void 0 : C[U.Dropdown], value: s.getYear(ne.date) }) : R.createElement("span", { key: "year" }, Y(ne.date, s));
              return s.getMonthYearOrder() === "year-first" ? [se, X] : [X, se];
            })(),
            R.createElement("span", { role: "status", "aria-live": "polite", style: {
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
            } }, N(ne.date, s.options, s))
          ) : R.createElement(r.CaptionLabel, { className: c[U.CaptionLabel], role: "status", "aria-live": "polite" }, N(ne.date, s.options, s))),
          f === "around" && !t.hideNavigation && le === p - 1 && R.createElement(
            r.NextMonthButton,
            { type: "button", className: c[U.NextMonthButton], tabIndex: Z ? void 0 : -1, "aria-disabled": Z ? void 0 : !0, "aria-label": Nt(Z), onClick: vo, "data-animated-button": t.animate ? "true" : void 0 },
            R.createElement(r.Chevron, { disabled: Z ? void 0 : !0, className: c[U.Chevron], orientation: t.dir === "rtl" ? "left" : "right" })
          ),
          le === p - 1 && f === "after" && !t.hideNavigation && R.createElement(r.Nav, { "data-animated-nav": t.animate ? "true" : void 0, className: c[U.Nav], style: C == null ? void 0 : C[U.Nav], "aria-label": lt(), onPreviousClick: go, onNextClick: vo, previousMonth: A, nextMonth: Z }),
          R.createElement(
            r.MonthGrid,
            { role: "grid", "aria-multiselectable": d === "multiple" || d === "range", "aria-label": Ee(ne.date, s.options, s) || void 0, className: c[U.MonthGrid], style: C == null ? void 0 : C[U.MonthGrid] },
            !t.hideWeekdays && R.createElement(
              r.Weekdays,
              { "data-animated-weekdays": t.animate ? "true" : void 0, className: c[U.Weekdays], style: C == null ? void 0 : C[U.Weekdays] },
              E && R.createElement(r.WeekNumberHeader, { "aria-label": $p(s.options), className: c[U.WeekNumberHeader], style: C == null ? void 0 : C[U.WeekNumberHeader], scope: "col" }, $()),
              Fp.map((X) => R.createElement(r.Weekday, { "aria-label": ho(X, s.options, s), className: c[U.Weekday], key: String(X), style: C == null ? void 0 : C[U.Weekday], scope: "col" }, I(X, s.options, s)))
            ),
            R.createElement(r.Weeks, { "data-animated-weeks": t.animate ? "true" : void 0, className: c[U.Weeks], style: C == null ? void 0 : C[U.Weeks] }, ne.weeks.map((X) => R.createElement(
              r.Week,
              { className: c[U.Week], key: X.weekNumber, style: C == null ? void 0 : C[U.Week], week: X },
              E && R.createElement(r.WeekNumber, { week: X, style: C == null ? void 0 : C[U.WeekNumber], "aria-label": Lt(X.weekNumber, {
                locale: i
              }), className: c[U.WeekNumber], scope: "row", role: "rowheader" }, O(X.weekNumber, s)),
              X.days.map((se) => {
                const { date: ke } = se, ae = k(se);
                if (ae[me.focused] = !ae.hidden && !!(W != null && W.isEqualTo(se)), ae[Be.selected] = (H == null ? void 0 : H(ke)) || ae.selected, Ar(V)) {
                  const { from: bo, to: yo } = V;
                  ae[Be.range_start] = !!(bo && yo && s.isSameDay(ke, bo)), ae[Be.range_end] = !!(bo && yo && s.isSameDay(ke, yo)), ae[Be.range_middle] = ot(V, ke, !0, s);
                }
                const Zp = mw(ae, C, t.modifiersStyles), Qp = qy(ae, c, t.modifiersClassNames), Jp = !As && !ae.hidden ? ce(ke, ae, s.options, s) : void 0;
                return R.createElement(r.Day, { key: `${se.isoDate}_${se.displayMonthId}`, day: se, modifiers: ae, className: Qp.join(" "), style: Zp, role: "gridcell", "aria-selected": ae.selected || void 0, "aria-label": Jp, "data-day": se.isoDate, "data-month": se.outside ? se.dateMonthId : void 0, "data-selected": ae.selected || void 0, "data-disabled": ae.disabled || void 0, "data-hidden": ae.hidden || void 0, "data-outside": se.outside || void 0, "data-focused": ae.focused || void 0, "data-today": ae.today || void 0 }, !ae.hidden && As ? R.createElement(r.DayButton, { className: c[U.DayButton], style: C == null ? void 0 : C[U.DayButton], type: "button", day: se, modifiers: ae, disabled: !ae.focused && ae.disabled || void 0, "aria-disabled": ae.focused && ae.disabled || void 0, tabIndex: te(se) ? 0 : -1, "aria-label": ie(ke, ae, s.options, s), onClick: Lp(se, ae), onBlur: Vp(se, ae), onFocus: Bp(se, ae), onKeyDown: Hp(se, ae), onMouseEnter: Yp(se, ae), onMouseLeave: zp(se, ae) }, M(ke, s.options, s)) : !ae.hidden && M(se.date, s.options, s));
              })
            )))
          )
        ))
      ),
      t.footer && R.createElement(r.Footer, { className: c[U.Footer], style: C == null ? void 0 : C[U.Footer], role: "status", "aria-live": "polite" }, t.footer)
    )
  );
}
function Vw({
  className: e,
  classNames: t,
  showOutsideDays: n = !0,
  captionLayout: r = "label",
  buttonVariant: o = "ghost",
  formatters: a,
  components: s,
  ...i
}) {
  const c = $a();
  return /* @__PURE__ */ m(
    Bw,
    {
      showOutsideDays: n,
      className: P(
        "bg-background group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        e
      ),
      captionLayout: r,
      formatters: {
        formatMonthDropdown: (u) => u.toLocaleString("default", { month: "short" }),
        ...a
      },
      classNames: {
        root: P("w-fit", c.root),
        months: P(
          "relative flex flex-col gap-4 md:flex-row",
          c.months
        ),
        month: P("flex w-full flex-col gap-4", c.month),
        nav: P(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          c.nav
        ),
        button_previous: P(
          hr({ variant: o }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50",
          c.button_previous
        ),
        button_next: P(
          hr({ variant: o }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50",
          c.button_next
        ),
        month_caption: P(
          "flex h-[--cell-size] w-full items-center justify-center px-[--cell-size]",
          c.month_caption
        ),
        dropdowns: P(
          "flex h-[--cell-size] w-full items-center justify-center gap-1.5 text-sm font-medium",
          c.dropdowns
        ),
        dropdown_root: P(
          "has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border",
          c.dropdown_root
        ),
        dropdown: P(
          "bg-popover absolute inset-0 opacity-0",
          c.dropdown
        ),
        caption_label: P(
          "select-none font-medium",
          r === "label" ? "text-sm" : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5",
          c.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: P("flex", c.weekdays),
        weekday: P(
          "text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal",
          c.weekday
        ),
        week: P("mt-2 flex w-full", c.week),
        week_number_header: P(
          "w-[--cell-size] select-none",
          c.week_number_header
        ),
        week_number: P(
          "text-muted-foreground select-none text-[0.8rem]",
          c.week_number
        ),
        day: P(
          "group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md",
          c.day
        ),
        range_start: P(
          "bg-accent rounded-l-md",
          c.range_start
        ),
        range_middle: P("rounded-none", c.range_middle),
        range_end: P("bg-accent rounded-r-md", c.range_end),
        today: P(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          c.today
        ),
        outside: P(
          "text-muted-foreground aria-selected:text-muted-foreground",
          c.outside
        ),
        disabled: P(
          "text-muted-foreground opacity-50",
          c.disabled
        ),
        hidden: P("invisible", c.hidden),
        ...t
      },
      components: {
        Root: ({ className: u, rootRef: d, ...f }) => /* @__PURE__ */ m(
          "div",
          {
            "data-slot": "calendar",
            ref: d,
            className: P(u),
            ...f
          }
        ),
        Chevron: ({ className: u, orientation: d, ...f }) => d === "left" ? /* @__PURE__ */ m(bc, { className: P("size-4", u), ...f }) : d === "right" ? /* @__PURE__ */ m(
          Dr,
          {
            className: P("size-4", u),
            ...f
          }
        ) : /* @__PURE__ */ m(_r, { className: P("size-4", u), ...f }),
        DayButton: Hw,
        WeekNumber: ({ children: u, ...d }) => /* @__PURE__ */ m("td", { ...d, children: /* @__PURE__ */ m("div", { className: "flex size-[--cell-size] items-center justify-center text-center", children: u }) }),
        ...s
      },
      ...i
    }
  );
}
function Hw({
  className: e,
  day: t,
  modifiers: n,
  ...r
}) {
  const o = $a(), a = l.useRef(null);
  return l.useEffect(() => {
    var s;
    n.focused && ((s = a.current) == null || s.focus());
  }, [n.focused]), /* @__PURE__ */ m(
    Mt,
    {
      ref: a,
      variant: "ghost",
      size: "icon",
      "data-day": t.date.toLocaleDateString(),
      "data-selected-single": n.selected && !n.range_start && !n.range_end && !n.range_middle,
      "data-range-start": n.range_start,
      "data-range-end": n.range_end,
      "data-range-middle": n.range_middle,
      className: P(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-[--cell-size] flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70",
        o.day,
        e
      ),
      ...r
    }
  );
}
const Yw = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  "div",
  {
    ref: n,
    className: P(
      "rounded-xl border bg-card text-card-foreground shadow",
      e
    ),
    ...t
  }
));
Yw.displayName = "Card";
const zw = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  "div",
  {
    ref: n,
    className: P("flex flex-col space-y-1.5 p-6", e),
    ...t
  }
));
zw.displayName = "CardHeader";
const Gw = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  "div",
  {
    ref: n,
    className: P("font-semibold leading-none tracking-tight", e),
    ...t
  }
));
Gw.displayName = "CardTitle";
const jw = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  "div",
  {
    ref: n,
    className: P("text-sm text-muted-foreground", e),
    ...t
  }
));
jw.displayName = "CardDescription";
const Uw = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m("div", { ref: n, className: P("p-6 pt-0", e), ...t }));
Uw.displayName = "CardContent";
const Kw = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  "div",
  {
    ref: n,
    className: P("flex items-center p-6 pt-0", e),
    ...t
  }
));
Kw.displayName = "CardFooter";
function On(e) {
  const t = l.useRef({ value: e, previous: e });
  return l.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
function An(e) {
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
          const c = a.borderBoxSize, u = Array.isArray(c) ? c[0] : c;
          s = u.inlineSize, i = u.blockSize;
        } else
          s = e.offsetWidth, i = e.offsetHeight;
        n({ width: s, height: i });
      });
      return r.observe(e, { box: "border-box" }), () => r.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var $r = "Checkbox", [qw] = ye($r), [Xw, La] = qw($r);
function Zw(e) {
  const {
    __scopeCheckbox: t,
    checked: n,
    children: r,
    defaultChecked: o,
    disabled: a,
    form: s,
    name: i,
    onCheckedChange: c,
    required: u,
    value: d = "on",
    // @ts-expect-error
    internal_do_not_use_render: f
  } = e, [p, h] = we({
    prop: n,
    defaultProp: o ?? !1,
    onChange: c,
    caller: $r
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
    value: d,
    hasConsumerStoppedPropagationRef: y,
    required: u,
    defaultChecked: pt(o) ? !1 : o,
    isFormControl: x,
    bubbleInput: v,
    setBubbleInput: w
  };
  return /* @__PURE__ */ m(
    Xw,
    {
      scope: t,
      ...S,
      children: Qw(f) ? f(S) : r
    }
  );
}
var ul = "CheckboxTrigger", dl = l.forwardRef(
  ({ __scopeCheckbox: e, onKeyDown: t, onClick: n, ...r }, o) => {
    const {
      control: a,
      value: s,
      disabled: i,
      checked: c,
      required: u,
      setControl: d,
      setChecked: f,
      hasConsumerStoppedPropagationRef: p,
      isFormControl: h,
      bubbleInput: b
    } = La(ul, e), g = q(o, d), v = l.useRef(c);
    return l.useEffect(() => {
      const w = a == null ? void 0 : a.form;
      if (w) {
        const y = () => f(v.current);
        return w.addEventListener("reset", y), () => w.removeEventListener("reset", y);
      }
    }, [a, f]), /* @__PURE__ */ m(
      F.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": pt(c) ? "mixed" : c,
        "aria-required": u,
        "data-state": gl(c),
        "data-disabled": i ? "" : void 0,
        disabled: i,
        value: s,
        ...r,
        ref: g,
        onKeyDown: T(t, (w) => {
          w.key === "Enter" && w.preventDefault();
        }),
        onClick: T(n, (w) => {
          f((y) => pt(y) ? !0 : !y), b && h && (p.current = w.isPropagationStopped(), p.current || w.stopPropagation());
        })
      }
    );
  }
);
dl.displayName = ul;
var Ba = l.forwardRef(
  (e, t) => {
    const {
      __scopeCheckbox: n,
      name: r,
      checked: o,
      defaultChecked: a,
      required: s,
      disabled: i,
      value: c,
      onCheckedChange: u,
      form: d,
      ...f
    } = e;
    return /* @__PURE__ */ m(
      Zw,
      {
        __scopeCheckbox: n,
        checked: o,
        defaultChecked: a,
        disabled: i,
        required: s,
        onCheckedChange: u,
        name: r,
        form: d,
        value: c,
        internal_do_not_use_render: ({ isFormControl: p }) => /* @__PURE__ */ G(Je, { children: [
          /* @__PURE__ */ m(
            dl,
            {
              ...f,
              ref: t,
              __scopeCheckbox: n
            }
          ),
          p && /* @__PURE__ */ m(
            hl,
            {
              __scopeCheckbox: n
            }
          )
        ] })
      }
    );
  }
);
Ba.displayName = $r;
var fl = "CheckboxIndicator", ml = l.forwardRef(
  (e, t) => {
    const { __scopeCheckbox: n, forceMount: r, ...o } = e, a = La(fl, n);
    return /* @__PURE__ */ m(
      ve,
      {
        present: r || pt(a.checked) || a.checked === !0,
        children: /* @__PURE__ */ m(
          F.span,
          {
            "data-state": gl(a.checked),
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
ml.displayName = fl;
var pl = "CheckboxBubbleInput", hl = l.forwardRef(
  ({ __scopeCheckbox: e, ...t }, n) => {
    const {
      control: r,
      hasConsumerStoppedPropagationRef: o,
      checked: a,
      defaultChecked: s,
      required: i,
      disabled: c,
      name: u,
      value: d,
      form: f,
      bubbleInput: p,
      setBubbleInput: h
    } = La(pl, e), b = q(n, h), g = On(a), v = An(r);
    l.useEffect(() => {
      const y = p;
      if (!y) return;
      const x = window.HTMLInputElement.prototype, E = Object.getOwnPropertyDescriptor(
        x,
        "checked"
      ).set, C = !o.current;
      if (g !== a && E) {
        const N = new Event("click", { bubbles: C });
        y.indeterminate = pt(a), E.call(y, pt(a) ? !1 : a), y.dispatchEvent(N);
      }
    }, [p, g, a, o]);
    const w = l.useRef(pt(a) ? !1 : a);
    return /* @__PURE__ */ m(
      F.input,
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: s ?? w.current,
        required: i,
        disabled: c,
        name: u,
        value: d,
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
hl.displayName = pl;
function Qw(e) {
  return typeof e == "function";
}
function pt(e) {
  return e === "indeterminate";
}
function gl(e) {
  return pt(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
const Jw = l.forwardRef(({ className: e, indeterminate: t, ...n }, r) => /* @__PURE__ */ m(
  Ba,
  {
    ref: r,
    className: P(
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
    children: /* @__PURE__ */ m(ml, { className: "flex items-center justify-center text-current", children: t ? /* @__PURE__ */ m(Dg, { className: "h-3 w-3", strokeWidth: 2.5 }) : /* @__PURE__ */ m(Tr, { className: "h-3 w-3", strokeWidth: 2.5 }) })
  }
));
Jw.displayName = Ba.displayName;
var si = 1, ex = 0.9, tx = 0.8, nx = 0.17, ko = 0.1, Mo = 0.999, rx = 0.9999, ox = 0.99, ax = /[\\\/_+.#"@\[\(\{&]/, sx = /[\\\/_+.#"@\[\(\{&]/g, ix = /[\s-]/, vl = /[\s-]/g;
function Zo(e, t, n, r, o, a, s) {
  if (a === t.length) return o === e.length ? si : ox;
  var i = `${o},${a}`;
  if (s[i] !== void 0) return s[i];
  for (var c = r.charAt(a), u = n.indexOf(c, o), d = 0, f, p, h, b; u >= 0; ) f = Zo(e, t, n, r, u + 1, a + 1, s), f > d && (u === o ? f *= si : ax.test(e.charAt(u - 1)) ? (f *= tx, h = e.slice(o, u - 1).match(sx), h && o > 0 && (f *= Math.pow(Mo, h.length))) : ix.test(e.charAt(u - 1)) ? (f *= ex, b = e.slice(o, u - 1).match(vl), b && o > 0 && (f *= Math.pow(Mo, b.length))) : (f *= nx, o > 0 && (f *= Math.pow(Mo, u - o))), e.charAt(u) !== t.charAt(a) && (f *= rx)), (f < ko && n.charAt(u - 1) === r.charAt(a + 1) || r.charAt(a + 1) === r.charAt(a) && n.charAt(u - 1) !== r.charAt(a)) && (p = Zo(e, t, n, r, u + 1, a + 2, s), p * ko > f && (f = p * ko)), f > d && (d = f), u = n.indexOf(c, u + 1);
  return s[i] = d, d;
}
function ii(e) {
  return e.toLowerCase().replace(vl, " ");
}
function cx(e, t, n) {
  return e = n && n.length > 0 ? `${e + " " + n.join(" ")}` : e, Zo(e, t, ii(e), ii(t), 0, 0, {});
}
function lx(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = pe(e);
  l.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var ux = "DismissableLayer", Qo = "dismissableLayer.update", dx = "dismissableLayer.pointerDownOutside", fx = "dismissableLayer.focusOutside", ci, bl = l.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), $t = l.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: a,
      onInteractOutside: s,
      onDismiss: i,
      ...c
    } = e, u = l.useContext(bl), [d, f] = l.useState(null), p = (d == null ? void 0 : d.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, h] = l.useState({}), b = q(t, (N) => f(N)), g = Array.from(u.layers), [v] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), w = g.indexOf(v), y = d ? g.indexOf(d) : -1, x = u.layersWithOutsidePointerEventsDisabled.size > 0, S = y >= w, E = px((N) => {
      const M = N.target, _ = [...u.branches].some((O) => O.contains(M));
      !S || _ || (o == null || o(N), s == null || s(N), N.defaultPrevented || i == null || i());
    }, p), C = hx((N) => {
      const M = N.target;
      [...u.branches].some((O) => O.contains(M)) || (a == null || a(N), s == null || s(N), N.defaultPrevented || i == null || i());
    }, p);
    return lx((N) => {
      y === u.layers.size - 1 && (r == null || r(N), !N.defaultPrevented && i && (N.preventDefault(), i()));
    }, p), l.useEffect(() => {
      if (d)
        return n && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (ci = p.body.style.pointerEvents, p.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(d)), u.layers.add(d), li(), () => {
          n && u.layersWithOutsidePointerEventsDisabled.size === 1 && (p.body.style.pointerEvents = ci);
        };
    }, [d, p, n, u]), l.useEffect(() => () => {
      d && (u.layers.delete(d), u.layersWithOutsidePointerEventsDisabled.delete(d), li());
    }, [d, u]), l.useEffect(() => {
      const N = () => h({});
      return document.addEventListener(Qo, N), () => document.removeEventListener(Qo, N);
    }, []), /* @__PURE__ */ m(
      F.div,
      {
        ...c,
        ref: b,
        style: {
          pointerEvents: x ? S ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: T(e.onFocusCapture, C.onFocusCapture),
        onBlurCapture: T(e.onBlurCapture, C.onBlurCapture),
        onPointerDownCapture: T(
          e.onPointerDownCapture,
          E.onPointerDownCapture
        )
      }
    );
  }
);
$t.displayName = ux;
var mx = "DismissableLayerBranch", yl = l.forwardRef((e, t) => {
  const n = l.useContext(bl), r = l.useRef(null), o = q(t, r);
  return l.useEffect(() => {
    const a = r.current;
    if (a)
      return n.branches.add(a), () => {
        n.branches.delete(a);
      };
  }, [n.branches]), /* @__PURE__ */ m(F.div, { ...e, ref: o });
});
yl.displayName = mx;
function px(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = pe(e), r = l.useRef(!1), o = l.useRef(() => {
  });
  return l.useEffect(() => {
    const a = (i) => {
      if (i.target && !r.current) {
        let c = function() {
          wl(
            dx,
            n,
            u,
            { discrete: !0 }
          );
        };
        const u = { originalEvent: i };
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
function hx(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = pe(e), r = l.useRef(!1);
  return l.useEffect(() => {
    const o = (a) => {
      a.target && !r.current && wl(fx, n, { originalEvent: a }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function li() {
  const e = new CustomEvent(Qo);
  document.dispatchEvent(e);
}
function wl(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? xa(o, a) : o.dispatchEvent(a);
}
var gx = $t, vx = yl, To = "focusScope.autoFocusOnMount", _o = "focusScope.autoFocusOnUnmount", ui = { bubbles: !1, cancelable: !0 }, bx = "FocusScope", In = l.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: a,
    ...s
  } = e, [i, c] = l.useState(null), u = pe(o), d = pe(a), f = l.useRef(null), p = q(t, (g) => c(g)), h = l.useRef({
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
        i.contains(S) ? f.current = S : mt(f.current, { select: !0 });
      }, v = function(x) {
        if (h.paused || !i) return;
        const S = x.relatedTarget;
        S !== null && (i.contains(S) || mt(f.current, { select: !0 }));
      }, w = function(x) {
        if (document.activeElement === document.body)
          for (const E of x)
            E.removedNodes.length > 0 && mt(i);
      };
      document.addEventListener("focusin", g), document.addEventListener("focusout", v);
      const y = new MutationObserver(w);
      return i && y.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", g), document.removeEventListener("focusout", v), y.disconnect();
      };
    }
  }, [r, i, h.paused]), l.useEffect(() => {
    if (i) {
      fi.add(h);
      const g = document.activeElement;
      if (!i.contains(g)) {
        const w = new CustomEvent(To, ui);
        i.addEventListener(To, u), i.dispatchEvent(w), w.defaultPrevented || (yx(Ex(xl(i)), { select: !0 }), document.activeElement === g && mt(i));
      }
      return () => {
        i.removeEventListener(To, u), setTimeout(() => {
          const w = new CustomEvent(_o, ui);
          i.addEventListener(_o, d), i.dispatchEvent(w), w.defaultPrevented || mt(g ?? document.body, { select: !0 }), i.removeEventListener(_o, d), fi.remove(h);
        }, 0);
      };
    }
  }, [i, u, d, h]);
  const b = l.useCallback(
    (g) => {
      if (!n && !r || h.paused) return;
      const v = g.key === "Tab" && !g.altKey && !g.ctrlKey && !g.metaKey, w = document.activeElement;
      if (v && w) {
        const y = g.currentTarget, [x, S] = wx(y);
        x && S ? !g.shiftKey && w === S ? (g.preventDefault(), n && mt(x, { select: !0 })) : g.shiftKey && w === x && (g.preventDefault(), n && mt(S, { select: !0 })) : w === y && g.preventDefault();
      }
    },
    [n, r, h.paused]
  );
  return /* @__PURE__ */ m(F.div, { tabIndex: -1, ...s, ref: p, onKeyDown: b });
});
In.displayName = bx;
function yx(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (mt(r, { select: t }), document.activeElement !== n) return;
}
function wx(e) {
  const t = xl(e), n = di(t, e), r = di(t.reverse(), e);
  return [n, r];
}
function xl(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function di(e, t) {
  for (const n of e)
    if (!xx(n, { upTo: t })) return n;
}
function xx(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Sx(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function mt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Sx(e) && t && e.select();
  }
}
var fi = Cx();
function Cx() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && (n == null || n.pause()), e = mi(e, t), e.unshift(t);
    },
    remove(t) {
      var n;
      e = mi(e, t), (n = e[0]) == null || n.resume();
    }
  };
}
function mi(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function Ex(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Nx = "Portal", Wt = l.forwardRef((e, t) => {
  var i;
  const { container: n, ...r } = e, [o, a] = l.useState(!1);
  ge(() => a(!0), []);
  const s = n || o && ((i = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : i.body);
  return s ? rh.createPortal(/* @__PURE__ */ m(F.div, { ...r, ref: t }), s) : null;
});
Wt.displayName = Nx;
var Do = 0;
function Wr() {
  l.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? pi()), document.body.insertAdjacentElement("beforeend", e[1] ?? pi()), Do++, () => {
      Do === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Do--;
    };
  }, []);
}
function pi() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var qe = function() {
  return qe = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, qe.apply(this, arguments);
};
function Sl(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function Px(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, a; r < o; r++)
    (a || !(r in t)) && (a || (a = Array.prototype.slice.call(t, 0, r)), a[r] = t[r]);
  return e.concat(a || Array.prototype.slice.call(t));
}
var sr = "right-scroll-bar-position", ir = "width-before-scroll-bar", Rx = "with-scroll-bars-hidden", kx = "--removed-body-scroll-bar-size";
function Oo(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Mx(e, t) {
  var n = fr(function() {
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
var Tx = typeof window < "u" ? l.useLayoutEffect : l.useEffect, hi = /* @__PURE__ */ new WeakMap();
function _x(e, t) {
  var n = Mx(null, function(r) {
    return e.forEach(function(o) {
      return Oo(o, r);
    });
  });
  return Tx(function() {
    var r = hi.get(n);
    if (r) {
      var o = new Set(r), a = new Set(e), s = n.current;
      o.forEach(function(i) {
        a.has(i) || Oo(i, null);
      }), a.forEach(function(i) {
        o.has(i) || Oo(i, s);
      });
    }
    hi.set(n, e);
  }, [e]), n;
}
function Dx(e) {
  return e;
}
function Ox(e, t) {
  t === void 0 && (t = Dx);
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
        var d = s;
        s = [], d.forEach(a);
      }, u = function() {
        return Promise.resolve().then(c);
      };
      u(), n = {
        push: function(d) {
          s.push(d), u();
        },
        filter: function(d) {
          return s = s.filter(d), n;
        }
      };
    }
  };
  return o;
}
function Ax(e) {
  e === void 0 && (e = {});
  var t = Ox(null);
  return t.options = qe({ async: !0, ssr: !1 }, e), t;
}
var Cl = function(e) {
  var t = e.sideCar, n = Sl(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return l.createElement(r, qe({}, n));
};
Cl.isSideCarExport = !0;
function Ix(e, t) {
  return e.useMedium(t), Cl;
}
var El = Ax(), Ao = function() {
}, Fr = l.forwardRef(function(e, t) {
  var n = l.useRef(null), r = l.useState({
    onScrollCapture: Ao,
    onWheelCapture: Ao,
    onTouchMoveCapture: Ao
  }), o = r[0], a = r[1], s = e.forwardProps, i = e.children, c = e.className, u = e.removeScrollBar, d = e.enabled, f = e.shards, p = e.sideCar, h = e.noRelative, b = e.noIsolation, g = e.inert, v = e.allowPinchZoom, w = e.as, y = w === void 0 ? "div" : w, x = e.gapMode, S = Sl(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), E = p, C = _x([n, t]), N = qe(qe({}, S), o);
  return l.createElement(
    l.Fragment,
    null,
    d && l.createElement(E, { sideCar: El, removeScrollBar: u, shards: f, noRelative: h, noIsolation: b, inert: g, setCallbacks: a, allowPinchZoom: !!v, lockRef: n, gapMode: x }),
    s ? l.cloneElement(l.Children.only(i), qe(qe({}, N), { ref: C })) : l.createElement(y, qe({}, N, { className: c, ref: C }), i)
  );
});
Fr.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Fr.classNames = {
  fullWidth: ir,
  zeroRight: sr
};
var $x = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function Wx() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = $x();
  return t && e.setAttribute("nonce", t), e;
}
function Fx(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Lx(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var Bx = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = Wx()) && (Fx(t, n), Lx(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Vx = function() {
  var e = Bx();
  return function(t, n) {
    l.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, Nl = function() {
  var e = Vx(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, Hx = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Io = function(e) {
  return parseInt(e || "", 10) || 0;
}, Yx = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Io(n), Io(r), Io(o)];
}, zx = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return Hx;
  var t = Yx(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, Gx = Nl(), Zt = "data-scroll-locked", jx = function(e, t, n, r) {
  var o = e.left, a = e.top, s = e.right, i = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Rx, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(i, "px ").concat(r, `;
  }
  body[`).concat(Zt, `] {
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
  
  .`).concat(sr, ` {
    right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(ir, ` {
    margin-right: `).concat(i, "px ").concat(r, `;
  }
  
  .`).concat(sr, " .").concat(sr, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(ir, " .").concat(ir, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(Zt, `] {
    `).concat(kx, ": ").concat(i, `px;
  }
`);
}, gi = function() {
  var e = parseInt(document.body.getAttribute(Zt) || "0", 10);
  return isFinite(e) ? e : 0;
}, Ux = function() {
  l.useEffect(function() {
    return document.body.setAttribute(Zt, (gi() + 1).toString()), function() {
      var e = gi() - 1;
      e <= 0 ? document.body.removeAttribute(Zt) : document.body.setAttribute(Zt, e.toString());
    };
  }, []);
}, Kx = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  Ux();
  var a = l.useMemo(function() {
    return zx(o);
  }, [o]);
  return l.createElement(Gx, { styles: jx(a, !t, o, n ? "" : "!important") });
}, Jo = !1;
if (typeof window < "u")
  try {
    var Zn = Object.defineProperty({}, "passive", {
      get: function() {
        return Jo = !0, !0;
      }
    });
    window.addEventListener("test", Zn, Zn), window.removeEventListener("test", Zn, Zn);
  } catch {
    Jo = !1;
  }
var Ht = Jo ? { passive: !1 } : !1, qx = function(e) {
  return e.tagName === "TEXTAREA";
}, Pl = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !qx(e) && n[t] === "visible")
  );
}, Xx = function(e) {
  return Pl(e, "overflowY");
}, Zx = function(e) {
  return Pl(e, "overflowX");
}, vi = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = Rl(e, r);
    if (o) {
      var a = kl(e, r), s = a[1], i = a[2];
      if (s > i)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, Qx = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, Jx = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, Rl = function(e, t) {
  return e === "v" ? Xx(t) : Zx(t);
}, kl = function(e, t) {
  return e === "v" ? Qx(t) : Jx(t);
}, eS = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, tS = function(e, t, n, r, o) {
  var a = eS(e, window.getComputedStyle(t).direction), s = a * r, i = n.target, c = t.contains(i), u = !1, d = s > 0, f = 0, p = 0;
  do {
    if (!i)
      break;
    var h = kl(e, i), b = h[0], g = h[1], v = h[2], w = g - v - a * b;
    (b || w) && Rl(e, i) && (f += w, p += b);
    var y = i.parentNode;
    i = y && y.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? y.host : y;
  } while (
    // portaled content
    !c && i !== document.body || // self content
    c && (t.contains(i) || t === i)
  );
  return (d && Math.abs(f) < 1 || !d && Math.abs(p) < 1) && (u = !0), u;
}, Qn = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, bi = function(e) {
  return [e.deltaX, e.deltaY];
}, yi = function(e) {
  return e && "current" in e ? e.current : e;
}, nS = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, rS = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, oS = 0, Yt = [];
function aS(e) {
  var t = l.useRef([]), n = l.useRef([0, 0]), r = l.useRef(), o = l.useState(oS++)[0], a = l.useState(Nl)[0], s = l.useRef(e);
  l.useEffect(function() {
    s.current = e;
  }, [e]), l.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var g = Px([e.lockRef.current], (e.shards || []).map(yi), !0).filter(Boolean);
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
    var w = Qn(g), y = n.current, x = "deltaX" in g ? g.deltaX : y[0] - w[0], S = "deltaY" in g ? g.deltaY : y[1] - w[1], E, C = g.target, N = Math.abs(x) > Math.abs(S) ? "h" : "v";
    if ("touches" in g && N === "h" && C.type === "range")
      return !1;
    var M = window.getSelection(), _ = M && M.anchorNode, O = _ ? _ === C || _.contains(C) : !1;
    if (O)
      return !1;
    var $ = vi(N, C);
    if (!$)
      return !0;
    if ($ ? E = N : (E = N === "v" ? "h" : "v", $ = vi(N, C)), !$)
      return !1;
    if (!r.current && "changedTouches" in g && (x || S) && (r.current = E), !E)
      return !0;
    var I = r.current || E;
    return tS(I, v, g, I === "h" ? x : S);
  }, []), c = l.useCallback(function(g) {
    var v = g;
    if (!(!Yt.length || Yt[Yt.length - 1] !== a)) {
      var w = "deltaY" in v ? bi(v) : Qn(v), y = t.current.filter(function(E) {
        return E.name === v.type && (E.target === v.target || v.target === E.shadowParent) && nS(E.delta, w);
      })[0];
      if (y && y.should) {
        v.cancelable && v.preventDefault();
        return;
      }
      if (!y) {
        var x = (s.current.shards || []).map(yi).filter(Boolean).filter(function(E) {
          return E.contains(v.target);
        }), S = x.length > 0 ? i(v, x[0]) : !s.current.noIsolation;
        S && v.cancelable && v.preventDefault();
      }
    }
  }, []), u = l.useCallback(function(g, v, w, y) {
    var x = { name: g, delta: v, target: w, should: y, shadowParent: sS(w) };
    t.current.push(x), setTimeout(function() {
      t.current = t.current.filter(function(S) {
        return S !== x;
      });
    }, 1);
  }, []), d = l.useCallback(function(g) {
    n.current = Qn(g), r.current = void 0;
  }, []), f = l.useCallback(function(g) {
    u(g.type, bi(g), g.target, i(g, e.lockRef.current));
  }, []), p = l.useCallback(function(g) {
    u(g.type, Qn(g), g.target, i(g, e.lockRef.current));
  }, []);
  l.useEffect(function() {
    return Yt.push(a), e.setCallbacks({
      onScrollCapture: f,
      onWheelCapture: f,
      onTouchMoveCapture: p
    }), document.addEventListener("wheel", c, Ht), document.addEventListener("touchmove", c, Ht), document.addEventListener("touchstart", d, Ht), function() {
      Yt = Yt.filter(function(g) {
        return g !== a;
      }), document.removeEventListener("wheel", c, Ht), document.removeEventListener("touchmove", c, Ht), document.removeEventListener("touchstart", d, Ht);
    };
  }, []);
  var h = e.removeScrollBar, b = e.inert;
  return l.createElement(
    l.Fragment,
    null,
    b ? l.createElement(a, { styles: rS(o) }) : null,
    h ? l.createElement(Kx, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function sS(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const iS = Ix(El, aS);
var $n = l.forwardRef(function(e, t) {
  return l.createElement(Fr, qe({}, e, { ref: t, sideCar: iS }));
});
$n.classNames = Fr.classNames;
var cS = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, zt = /* @__PURE__ */ new WeakMap(), Jn = /* @__PURE__ */ new WeakMap(), er = {}, $o = 0, Ml = function(e) {
  return e && (e.host || Ml(e.parentNode));
}, lS = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = Ml(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, uS = function(e, t, n, r) {
  var o = lS(t, Array.isArray(e) ? e : [e]);
  er[n] || (er[n] = /* @__PURE__ */ new WeakMap());
  var a = er[n], s = [], i = /* @__PURE__ */ new Set(), c = new Set(o), u = function(f) {
    !f || i.has(f) || (i.add(f), u(f.parentNode));
  };
  o.forEach(u);
  var d = function(f) {
    !f || c.has(f) || Array.prototype.forEach.call(f.children, function(p) {
      if (i.has(p))
        d(p);
      else
        try {
          var h = p.getAttribute(r), b = h !== null && h !== "false", g = (zt.get(p) || 0) + 1, v = (a.get(p) || 0) + 1;
          zt.set(p, g), a.set(p, v), s.push(p), g === 1 && b && Jn.set(p, !0), v === 1 && p.setAttribute(n, "true"), b || p.setAttribute(r, "true");
        } catch (w) {
          console.error("aria-hidden: cannot operate on ", p, w);
        }
    });
  };
  return d(t), i.clear(), $o++, function() {
    s.forEach(function(f) {
      var p = zt.get(f) - 1, h = a.get(f) - 1;
      zt.set(f, p), a.set(f, h), p || (Jn.has(f) || f.removeAttribute(r), Jn.delete(f)), h || f.removeAttribute(n);
    }), $o--, $o || (zt = /* @__PURE__ */ new WeakMap(), zt = /* @__PURE__ */ new WeakMap(), Jn = /* @__PURE__ */ new WeakMap(), er = {});
  };
}, Lr = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = cS(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))), uS(r, o, n, "aria-hidden")) : function() {
    return null;
  };
};
// @__NO_SIDE_EFFECTS__
function dS(e) {
  const t = /* @__PURE__ */ fS(e), n = l.forwardRef((r, o) => {
    const { children: a, ...s } = r, i = l.Children.toArray(a), c = i.find(pS);
    if (c) {
      const u = c.props.children, d = i.map((f) => f === c ? l.Children.count(u) > 1 ? l.Children.only(null) : l.isValidElement(u) ? u.props.children : null : f);
      return /* @__PURE__ */ m(t, { ...s, ref: o, children: l.isValidElement(u) ? l.cloneElement(u, void 0, d) : null });
    }
    return /* @__PURE__ */ m(t, { ...s, ref: o, children: a });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function fS(e) {
  const t = l.forwardRef((n, r) => {
    const { children: o, ...a } = n;
    if (l.isValidElement(o)) {
      const s = gS(o), i = hS(a, o.props);
      return o.type !== l.Fragment && (i.ref = r ? Ne(r, s) : s), l.cloneElement(o, i);
    }
    return l.Children.count(o) > 1 ? l.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var mS = Symbol("radix.slottable");
function pS(e) {
  return l.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === mS;
}
function hS(e, t) {
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
function gS(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Br = "Dialog", [Tl] = ye(Br), [vS, Ge] = Tl(Br), _l = (e) => {
  const {
    __scopeDialog: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    modal: s = !0
  } = e, i = l.useRef(null), c = l.useRef(null), [u, d] = we({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: Br
  });
  return /* @__PURE__ */ m(
    vS,
    {
      scope: t,
      triggerRef: i,
      contentRef: c,
      contentId: he(),
      titleId: he(),
      descriptionId: he(),
      open: u,
      onOpenChange: d,
      onOpenToggle: l.useCallback(() => d((f) => !f), [d]),
      modal: s,
      children: n
    }
  );
};
_l.displayName = Br;
var Dl = "DialogTrigger", Ol = l.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ge(Dl, n), a = q(t, o.triggerRef);
    return /* @__PURE__ */ m(
      F.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": Ya(o.open),
        ...r,
        ref: a,
        onClick: T(e.onClick, o.onOpenToggle)
      }
    );
  }
);
Ol.displayName = Dl;
var Va = "DialogPortal", [bS, Al] = Tl(Va, {
  forceMount: void 0
}), Il = (e) => {
  const { __scopeDialog: t, forceMount: n, children: r, container: o } = e, a = Ge(Va, t);
  return /* @__PURE__ */ m(bS, { scope: t, forceMount: n, children: l.Children.map(r, (s) => /* @__PURE__ */ m(ve, { present: n || a.open, children: /* @__PURE__ */ m(Wt, { asChild: !0, container: o, children: s }) })) });
};
Il.displayName = Va;
var gr = "DialogOverlay", $l = l.forwardRef(
  (e, t) => {
    const n = Al(gr, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, a = Ge(gr, e.__scopeDialog);
    return a.modal ? /* @__PURE__ */ m(ve, { present: r || a.open, children: /* @__PURE__ */ m(wS, { ...o, ref: t }) }) : null;
  }
);
$l.displayName = gr;
var yS = /* @__PURE__ */ dS("DialogOverlay.RemoveScroll"), wS = l.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ge(gr, n);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ m($n, { as: yS, allowPinchZoom: !0, shards: [o.contentRef], children: /* @__PURE__ */ m(
        F.div,
        {
          "data-state": Ya(o.open),
          ...r,
          ref: t,
          style: { pointerEvents: "auto", ...r.style }
        }
      ) })
    );
  }
), Tt = "DialogContent", Wl = l.forwardRef(
  (e, t) => {
    const n = Al(Tt, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, a = Ge(Tt, e.__scopeDialog);
    return /* @__PURE__ */ m(ve, { present: r || a.open, children: a.modal ? /* @__PURE__ */ m(xS, { ...o, ref: t }) : /* @__PURE__ */ m(SS, { ...o, ref: t }) });
  }
);
Wl.displayName = Tt;
var xS = l.forwardRef(
  (e, t) => {
    const n = Ge(Tt, e.__scopeDialog), r = l.useRef(null), o = q(t, n.contentRef, r);
    return l.useEffect(() => {
      const a = r.current;
      if (a) return Lr(a);
    }, []), /* @__PURE__ */ m(
      Fl,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: T(e.onCloseAutoFocus, (a) => {
          var s;
          a.preventDefault(), (s = n.triggerRef.current) == null || s.focus();
        }),
        onPointerDownOutside: T(e.onPointerDownOutside, (a) => {
          const s = a.detail.originalEvent, i = s.button === 0 && s.ctrlKey === !0;
          (s.button === 2 || i) && a.preventDefault();
        }),
        onFocusOutside: T(
          e.onFocusOutside,
          (a) => a.preventDefault()
        )
      }
    );
  }
), SS = l.forwardRef(
  (e, t) => {
    const n = Ge(Tt, e.__scopeDialog), r = l.useRef(!1), o = l.useRef(!1);
    return /* @__PURE__ */ m(
      Fl,
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
          var c, u;
          (c = e.onInteractOutside) == null || c.call(e, a), a.defaultPrevented || (r.current = !0, a.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const s = a.target;
          ((u = n.triggerRef.current) == null ? void 0 : u.contains(s)) && a.preventDefault(), a.detail.originalEvent.type === "focusin" && o.current && a.preventDefault();
        }
      }
    );
  }
), Fl = l.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: o, onCloseAutoFocus: a, ...s } = e, i = Ge(Tt, n), c = l.useRef(null), u = q(t, c);
    return Wr(), /* @__PURE__ */ G(Je, { children: [
      /* @__PURE__ */ m(
        In,
        {
          asChild: !0,
          loop: !0,
          trapped: r,
          onMountAutoFocus: o,
          onUnmountAutoFocus: a,
          children: /* @__PURE__ */ m(
            $t,
            {
              role: "dialog",
              id: i.contentId,
              "aria-describedby": i.descriptionId,
              "aria-labelledby": i.titleId,
              "data-state": Ya(i.open),
              ...s,
              ref: u,
              onDismiss: () => i.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ G(Je, { children: [
        /* @__PURE__ */ m(CS, { titleId: i.titleId }),
        /* @__PURE__ */ m(NS, { contentRef: c, descriptionId: i.descriptionId })
      ] })
    ] });
  }
), Ha = "DialogTitle", Ll = l.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ge(Ha, n);
    return /* @__PURE__ */ m(F.h2, { id: o.titleId, ...r, ref: t });
  }
);
Ll.displayName = Ha;
var Bl = "DialogDescription", Vl = l.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ge(Bl, n);
    return /* @__PURE__ */ m(F.p, { id: o.descriptionId, ...r, ref: t });
  }
);
Vl.displayName = Bl;
var Hl = "DialogClose", Yl = l.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = Ge(Hl, n);
    return /* @__PURE__ */ m(
      F.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: T(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
Yl.displayName = Hl;
function Ya(e) {
  return e ? "open" : "closed";
}
var zl = "DialogTitleWarning", [hM, Gl] = $h(zl, {
  contentName: Tt,
  titleName: Ha,
  docsSlug: "dialog"
}), CS = ({ titleId: e }) => {
  const t = Gl(zl), n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return l.useEffect(() => {
    e && (document.getElementById(e) || console.error(n));
  }, [n, e]), null;
}, ES = "DialogDescriptionWarning", NS = ({ contentRef: e, descriptionId: t }) => {
  const r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Gl(ES).contentName}}.`;
  return l.useEffect(() => {
    var a;
    const o = (a = e.current) == null ? void 0 : a.getAttribute("aria-describedby");
    t && o && (document.getElementById(t) || console.warn(r));
  }, [r, e, t]), null;
}, za = _l, jl = Ol, Ga = Il, Wn = $l, Fn = Wl, Vr = Ll, Hr = Vl, Yr = Yl, hn = '[cmdk-group=""]', Wo = '[cmdk-group-items=""]', PS = '[cmdk-group-heading=""]', Ul = '[cmdk-item=""]', wi = `${Ul}:not([aria-disabled="true"])`, ea = "cmdk-item-select", jt = "data-value", RS = (e, t, n) => cx(e, t, n), Kl = l.createContext(void 0), Ln = () => l.useContext(Kl), ql = l.createContext(void 0), ja = () => l.useContext(ql), Xl = l.createContext(void 0), Zl = l.forwardRef((e, t) => {
  let n = Ut(() => {
    var k, H;
    return { search: "", value: (H = (k = e.value) != null ? k : e.defaultValue) != null ? H : "", selectedItemId: void 0, filtered: { count: 0, items: /* @__PURE__ */ new Map(), groups: /* @__PURE__ */ new Set() } };
  }), r = Ut(() => /* @__PURE__ */ new Set()), o = Ut(() => /* @__PURE__ */ new Map()), a = Ut(() => /* @__PURE__ */ new Map()), s = Ut(() => /* @__PURE__ */ new Set()), i = Ql(e), { label: c, children: u, value: d, onValueChange: f, filter: p, shouldFilter: h, loop: b, disablePointerSelection: g = !1, vimBindings: v = !0, ...w } = e, y = he(), x = he(), S = he(), E = l.useRef(null), C = FS();
  _t(() => {
    if (d !== void 0) {
      let k = d.trim();
      n.current.value = k, N.emit();
    }
  }, [d]), _t(() => {
    C(6, Y);
  }, []);
  let N = l.useMemo(() => ({ subscribe: (k) => (s.current.add(k), () => s.current.delete(k)), snapshot: () => n.current, setState: (k, H, K) => {
    var V, ee, W, te;
    if (!Object.is(n.current[k], H)) {
      if (n.current[k] = H, k === "search") I(), O(), C(1, $);
      else if (k === "value") {
        if (document.activeElement.hasAttribute("cmdk-input") || document.activeElement.hasAttribute("cmdk-root")) {
          let J = document.getElementById(S);
          J ? J.focus() : (V = document.getElementById(y)) == null || V.focus();
        }
        if (C(7, () => {
          var J;
          n.current.selectedItemId = (J = D()) == null ? void 0 : J.id, N.emit();
        }), K || C(5, Y), ((ee = i.current) == null ? void 0 : ee.value) !== void 0) {
          let J = H ?? "";
          (te = (W = i.current).onValueChange) == null || te.call(W, J);
          return;
        }
      }
      N.emit();
    }
  }, emit: () => {
    s.current.forEach((k) => k());
  } }), []), M = l.useMemo(() => ({ value: (k, H, K) => {
    var V;
    H !== ((V = a.current.get(k)) == null ? void 0 : V.value) && (a.current.set(k, { value: H, keywords: K }), n.current.filtered.items.set(k, _(H, K)), C(2, () => {
      O(), N.emit();
    }));
  }, item: (k, H) => (r.current.add(k), H && (o.current.has(H) ? o.current.get(H).add(k) : o.current.set(H, /* @__PURE__ */ new Set([k]))), C(3, () => {
    I(), O(), n.current.value || $(), N.emit();
  }), () => {
    a.current.delete(k), r.current.delete(k), n.current.filtered.items.delete(k);
    let K = D();
    C(4, () => {
      I(), (K == null ? void 0 : K.getAttribute("id")) === k && $(), N.emit();
    });
  }), group: (k) => (o.current.has(k) || o.current.set(k, /* @__PURE__ */ new Set()), () => {
    a.current.delete(k), o.current.delete(k);
  }), filter: () => i.current.shouldFilter, label: c || e["aria-label"], getDisablePointerSelection: () => i.current.disablePointerSelection, listId: y, inputId: S, labelId: x, listInnerRef: E }), []);
  function _(k, H) {
    var K, V;
    let ee = (V = (K = i.current) == null ? void 0 : K.filter) != null ? V : RS;
    return k ? ee(k, n.current.search, H) : 0;
  }
  function O() {
    if (!n.current.search || i.current.shouldFilter === !1) return;
    let k = n.current.filtered.items, H = [];
    n.current.filtered.groups.forEach((V) => {
      let ee = o.current.get(V), W = 0;
      ee.forEach((te) => {
        let J = k.get(te);
        W = Math.max(J, W);
      }), H.push([V, W]);
    });
    let K = E.current;
    z().sort((V, ee) => {
      var W, te;
      let J = V.getAttribute("id"), oe = ee.getAttribute("id");
      return ((W = k.get(oe)) != null ? W : 0) - ((te = k.get(J)) != null ? te : 0);
    }).forEach((V) => {
      let ee = V.closest(Wo);
      ee ? ee.appendChild(V.parentElement === ee ? V : V.closest(`${Wo} > *`)) : K.appendChild(V.parentElement === K ? V : V.closest(`${Wo} > *`));
    }), H.sort((V, ee) => ee[1] - V[1]).forEach((V) => {
      var ee;
      let W = (ee = E.current) == null ? void 0 : ee.querySelector(`${hn}[${jt}="${encodeURIComponent(V[0])}"]`);
      W == null || W.parentElement.appendChild(W);
    });
  }
  function $() {
    let k = z().find((K) => K.getAttribute("aria-disabled") !== "true"), H = k == null ? void 0 : k.getAttribute(jt);
    N.setState("value", H || void 0);
  }
  function I() {
    var k, H, K, V;
    if (!n.current.search || i.current.shouldFilter === !1) {
      n.current.filtered.count = r.current.size;
      return;
    }
    n.current.filtered.groups = /* @__PURE__ */ new Set();
    let ee = 0;
    for (let W of r.current) {
      let te = (H = (k = a.current.get(W)) == null ? void 0 : k.value) != null ? H : "", J = (V = (K = a.current.get(W)) == null ? void 0 : K.keywords) != null ? V : [], oe = _(te, J);
      n.current.filtered.items.set(W, oe), oe > 0 && ee++;
    }
    for (let [W, te] of o.current) for (let J of te) if (n.current.filtered.items.get(J) > 0) {
      n.current.filtered.groups.add(W);
      break;
    }
    n.current.filtered.count = ee;
  }
  function Y() {
    var k, H, K;
    let V = D();
    V && (((k = V.parentElement) == null ? void 0 : k.firstChild) === V && ((K = (H = V.closest(hn)) == null ? void 0 : H.querySelector(PS)) == null || K.scrollIntoView({ block: "nearest" })), V.scrollIntoView({ block: "nearest" }));
  }
  function D() {
    var k;
    return (k = E.current) == null ? void 0 : k.querySelector(`${Ul}[aria-selected="true"]`);
  }
  function z() {
    var k;
    return Array.from(((k = E.current) == null ? void 0 : k.querySelectorAll(wi)) || []);
  }
  function B(k) {
    let H = z()[k];
    H && N.setState("value", H.getAttribute(jt));
  }
  function j(k) {
    var H;
    let K = D(), V = z(), ee = V.findIndex((te) => te === K), W = V[ee + k];
    (H = i.current) != null && H.loop && (W = ee + k < 0 ? V[V.length - 1] : ee + k === V.length ? V[0] : V[ee + k]), W && N.setState("value", W.getAttribute(jt));
  }
  function L(k) {
    let H = D(), K = H == null ? void 0 : H.closest(hn), V;
    for (; K && !V; ) K = k > 0 ? $S(K, hn) : WS(K, hn), V = K == null ? void 0 : K.querySelector(wi);
    V ? N.setState("value", V.getAttribute(jt)) : j(k);
  }
  let A = () => B(z().length - 1), Z = (k) => {
    k.preventDefault(), k.metaKey ? A() : k.altKey ? L(1) : j(1);
  }, Q = (k) => {
    k.preventDefault(), k.metaKey ? B(0) : k.altKey ? L(-1) : j(-1);
  };
  return l.createElement(F.div, { ref: t, tabIndex: -1, ...w, "cmdk-root": "", onKeyDown: (k) => {
    var H;
    (H = w.onKeyDown) == null || H.call(w, k);
    let K = k.nativeEvent.isComposing || k.keyCode === 229;
    if (!(k.defaultPrevented || K)) switch (k.key) {
      case "n":
      case "j": {
        v && k.ctrlKey && Z(k);
        break;
      }
      case "ArrowDown": {
        Z(k);
        break;
      }
      case "p":
      case "k": {
        v && k.ctrlKey && Q(k);
        break;
      }
      case "ArrowUp": {
        Q(k);
        break;
      }
      case "Home": {
        k.preventDefault(), B(0);
        break;
      }
      case "End": {
        k.preventDefault(), A();
        break;
      }
      case "Enter": {
        k.preventDefault();
        let V = D();
        if (V) {
          let ee = new Event(ea);
          V.dispatchEvent(ee);
        }
      }
    }
  } }, l.createElement("label", { "cmdk-label": "", htmlFor: M.inputId, id: M.labelId, style: BS }, c), zr(e, (k) => l.createElement(ql.Provider, { value: N }, l.createElement(Kl.Provider, { value: M }, k))));
}), kS = l.forwardRef((e, t) => {
  var n, r;
  let o = he(), a = l.useRef(null), s = l.useContext(Xl), i = Ln(), c = Ql(e), u = (r = (n = c.current) == null ? void 0 : n.forceMount) != null ? r : s == null ? void 0 : s.forceMount;
  _t(() => {
    if (!u) return i.item(o, s == null ? void 0 : s.id);
  }, [u]);
  let d = Jl(o, a, [e.value, e.children, a], e.keywords), f = ja(), p = ht((C) => C.value && C.value === d.current), h = ht((C) => u || i.filter() === !1 ? !0 : C.search ? C.filtered.items.get(o) > 0 : !0);
  l.useEffect(() => {
    let C = a.current;
    if (!(!C || e.disabled)) return C.addEventListener(ea, b), () => C.removeEventListener(ea, b);
  }, [h, e.onSelect, e.disabled]);
  function b() {
    var C, N;
    g(), (N = (C = c.current).onSelect) == null || N.call(C, d.current);
  }
  function g() {
    f.setState("value", d.current, !0);
  }
  if (!h) return null;
  let { disabled: v, value: w, onSelect: y, forceMount: x, keywords: S, ...E } = e;
  return l.createElement(F.div, { ref: Ne(a, t), ...E, id: o, "cmdk-item": "", role: "option", "aria-disabled": !!v, "aria-selected": !!p, "data-disabled": !!v, "data-selected": !!p, onPointerMove: v || i.getDisablePointerSelection() ? void 0 : g, onClick: v ? void 0 : b }, e.children);
}), MS = l.forwardRef((e, t) => {
  let { heading: n, children: r, forceMount: o, ...a } = e, s = he(), i = l.useRef(null), c = l.useRef(null), u = he(), d = Ln(), f = ht((h) => o || d.filter() === !1 ? !0 : h.search ? h.filtered.groups.has(s) : !0);
  _t(() => d.group(s), []), Jl(s, i, [e.value, e.heading, c]);
  let p = l.useMemo(() => ({ id: s, forceMount: o }), [o]);
  return l.createElement(F.div, { ref: Ne(i, t), ...a, "cmdk-group": "", role: "presentation", hidden: f ? void 0 : !0 }, n && l.createElement("div", { ref: c, "cmdk-group-heading": "", "aria-hidden": !0, id: u }, n), zr(e, (h) => l.createElement("div", { "cmdk-group-items": "", role: "group", "aria-labelledby": n ? u : void 0 }, l.createElement(Xl.Provider, { value: p }, h))));
}), TS = l.forwardRef((e, t) => {
  let { alwaysRender: n, ...r } = e, o = l.useRef(null), a = ht((s) => !s.search);
  return !n && !a ? null : l.createElement(F.div, { ref: Ne(o, t), ...r, "cmdk-separator": "", role: "separator" });
}), _S = l.forwardRef((e, t) => {
  let { onValueChange: n, ...r } = e, o = e.value != null, a = ja(), s = ht((u) => u.search), i = ht((u) => u.selectedItemId), c = Ln();
  return l.useEffect(() => {
    e.value != null && a.setState("search", e.value);
  }, [e.value]), l.createElement(F.input, { ref: t, ...r, "cmdk-input": "", autoComplete: "off", autoCorrect: "off", spellCheck: !1, "aria-autocomplete": "list", role: "combobox", "aria-expanded": !0, "aria-controls": c.listId, "aria-labelledby": c.labelId, "aria-activedescendant": i, id: c.inputId, type: "text", value: o ? e.value : s, onChange: (u) => {
    o || a.setState("search", u.target.value), n == null || n(u.target.value);
  } });
}), DS = l.forwardRef((e, t) => {
  let { children: n, label: r = "Suggestions", ...o } = e, a = l.useRef(null), s = l.useRef(null), i = ht((u) => u.selectedItemId), c = Ln();
  return l.useEffect(() => {
    if (s.current && a.current) {
      let u = s.current, d = a.current, f, p = new ResizeObserver(() => {
        f = requestAnimationFrame(() => {
          let h = u.offsetHeight;
          d.style.setProperty("--cmdk-list-height", h.toFixed(1) + "px");
        });
      });
      return p.observe(u), () => {
        cancelAnimationFrame(f), p.unobserve(u);
      };
    }
  }, []), l.createElement(F.div, { ref: Ne(a, t), ...o, "cmdk-list": "", role: "listbox", tabIndex: -1, "aria-activedescendant": i, "aria-label": r, id: c.listId }, zr(e, (u) => l.createElement("div", { ref: Ne(s, c.listInnerRef), "cmdk-list-sizer": "" }, u)));
}), OS = l.forwardRef((e, t) => {
  let { open: n, onOpenChange: r, overlayClassName: o, contentClassName: a, container: s, ...i } = e;
  return l.createElement(za, { open: n, onOpenChange: r }, l.createElement(Ga, { container: s }, l.createElement(Wn, { "cmdk-overlay": "", className: o }), l.createElement(Fn, { "aria-label": e.label, "cmdk-dialog": "", className: a }, l.createElement(Zl, { ref: t, ...i }))));
}), AS = l.forwardRef((e, t) => ht((n) => n.filtered.count === 0) ? l.createElement(F.div, { ref: t, ...e, "cmdk-empty": "", role: "presentation" }) : null), IS = l.forwardRef((e, t) => {
  let { progress: n, children: r, label: o = "Loading...", ...a } = e;
  return l.createElement(F.div, { ref: t, ...a, "cmdk-loading": "", role: "progressbar", "aria-valuenow": n, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": o }, zr(e, (s) => l.createElement("div", { "aria-hidden": !0 }, s)));
}), Re = Object.assign(Zl, { List: DS, Item: kS, Input: _S, Group: MS, Separator: TS, Dialog: OS, Empty: AS, Loading: IS });
function $S(e, t) {
  let n = e.nextElementSibling;
  for (; n; ) {
    if (n.matches(t)) return n;
    n = n.nextElementSibling;
  }
}
function WS(e, t) {
  let n = e.previousElementSibling;
  for (; n; ) {
    if (n.matches(t)) return n;
    n = n.previousElementSibling;
  }
}
function Ql(e) {
  let t = l.useRef(e);
  return _t(() => {
    t.current = e;
  }), t;
}
var _t = typeof window > "u" ? l.useEffect : l.useLayoutEffect;
function Ut(e) {
  let t = l.useRef();
  return t.current === void 0 && (t.current = e()), t;
}
function ht(e) {
  let t = ja(), n = () => e(t.snapshot());
  return l.useSyncExternalStore(t.subscribe, n, n);
}
function Jl(e, t, n, r = []) {
  let o = l.useRef(), a = Ln();
  return _t(() => {
    var s;
    let i = (() => {
      var u;
      for (let d of n) {
        if (typeof d == "string") return d.trim();
        if (typeof d == "object" && "current" in d) return d.current ? (u = d.current.textContent) == null ? void 0 : u.trim() : o.current;
      }
    })(), c = r.map((u) => u.trim());
    a.value(e, i, c), (s = t.current) == null || s.setAttribute(jt, i), o.current = i;
  }), o;
}
var FS = () => {
  let [e, t] = l.useState(), n = Ut(() => /* @__PURE__ */ new Map());
  return _t(() => {
    n.current.forEach((r) => r()), n.current = /* @__PURE__ */ new Map();
  }, [e]), (r, o) => {
    n.current.set(r, o), t({});
  };
};
function LS(e) {
  let t = e.type;
  return typeof t == "function" ? t(e.props) : "render" in t ? t.render(e.props) : e;
}
function zr({ asChild: e, children: t }, n) {
  return e && l.isValidElement(t) ? l.cloneElement(LS(t), { ref: t.ref }, n(t.props.children)) : n(t);
}
var BS = { position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0" };
const VS = za, gM = jl, HS = Ga, vM = Yr, eu = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  Wn,
  {
    ref: n,
    className: P(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      e
    ),
    ...t
  }
));
eu.displayName = Wn.displayName;
const tu = l.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ G(HS, { children: [
  /* @__PURE__ */ m(eu, {}),
  /* @__PURE__ */ G(
    Fn,
    {
      ref: r,
      className: P(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        e
      ),
      ...n,
      children: [
        t,
        /* @__PURE__ */ G(Yr, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ m(Or, { className: "h-4 w-4" }),
          /* @__PURE__ */ m("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
tu.displayName = Fn.displayName;
const YS = ({
  className: e,
  ...t
}) => /* @__PURE__ */ m(
  "div",
  {
    className: P(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      e
    ),
    ...t
  }
);
YS.displayName = "DialogHeader";
const zS = ({
  className: e,
  ...t
}) => /* @__PURE__ */ m(
  "div",
  {
    className: P(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      e
    ),
    ...t
  }
);
zS.displayName = "DialogFooter";
const GS = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  Vr,
  {
    ref: n,
    className: P(
      "text-lg font-semibold leading-none tracking-tight",
      e
    ),
    ...t
  }
));
GS.displayName = Vr.displayName;
const jS = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  Hr,
  {
    ref: n,
    className: P("text-sm text-muted-foreground", e),
    ...t
  }
));
jS.displayName = Hr.displayName;
const Ua = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  Re,
  {
    ref: n,
    className: P(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      e
    ),
    ...t
  }
));
Ua.displayName = Re.displayName;
const bM = ({ children: e, ...t }) => /* @__PURE__ */ m(VS, { ...t, children: /* @__PURE__ */ m(tu, { className: "overflow-hidden p-0", children: /* @__PURE__ */ m(Ua, { className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5", children: e }) }) }), nu = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ G("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ m(Og, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
  /* @__PURE__ */ m(
    Re.Input,
    {
      ref: n,
      className: P(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        e
      ),
      ...t
    }
  )
] }));
nu.displayName = Re.Input.displayName;
const ru = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  Re.List,
  {
    ref: n,
    className: P("max-h-[300px] overflow-y-auto overflow-x-hidden", e),
    ...t
  }
));
ru.displayName = Re.List.displayName;
const ou = l.forwardRef((e, t) => /* @__PURE__ */ m(
  Re.Empty,
  {
    ref: t,
    className: "py-6 text-center text-sm",
    ...e
  }
));
ou.displayName = Re.Empty.displayName;
const au = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  Re.Group,
  {
    ref: n,
    className: P(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      e
    ),
    ...t
  }
));
au.displayName = Re.Group.displayName;
const US = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  Re.Separator,
  {
    ref: n,
    className: P("-mx-1 h-px bg-border", e),
    ...t
  }
));
US.displayName = Re.Separator.displayName;
const su = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  Re.Item,
  {
    ref: n,
    className: P(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      e
    ),
    ...t
  }
));
su.displayName = Re.Item.displayName;
const KS = ({
  className: e,
  ...t
}) => /* @__PURE__ */ m(
  "span",
  {
    className: P(
      "ml-auto text-xs tracking-widest text-muted-foreground",
      e
    ),
    ...t
  }
);
KS.displayName = "CommandShortcut";
const qS = ["top", "right", "bottom", "left"], gt = Math.min, Te = Math.max, vr = Math.round, tr = Math.floor, Qe = (e) => ({
  x: e,
  y: e
}), XS = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function ta(e, t, n) {
  return Te(e, gt(t, n));
}
function st(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function it(e) {
  return e.split("-")[0];
}
function cn(e) {
  return e.split("-")[1];
}
function Ka(e) {
  return e === "x" ? "y" : "x";
}
function qa(e) {
  return e === "y" ? "height" : "width";
}
function Ze(e) {
  const t = e[0];
  return t === "t" || t === "b" ? "y" : "x";
}
function Xa(e) {
  return Ka(Ze(e));
}
function ZS(e, t, n) {
  n === void 0 && (n = !1);
  const r = cn(e), o = Xa(e), a = qa(o);
  let s = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[a] > t.floating[a] && (s = br(s)), [s, br(s)];
}
function QS(e) {
  const t = br(e);
  return [na(e), t, na(t)];
}
function na(e) {
  return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
const xi = ["left", "right"], Si = ["right", "left"], JS = ["top", "bottom"], eC = ["bottom", "top"];
function tC(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? Si : xi : t ? xi : Si;
    case "left":
    case "right":
      return t ? JS : eC;
    default:
      return [];
  }
}
function nC(e, t, n, r) {
  const o = cn(e);
  let a = tC(it(e), n === "start", r);
  return o && (a = a.map((s) => s + "-" + o), t && (a = a.concat(a.map(na)))), a;
}
function br(e) {
  const t = it(e);
  return XS[t] + e.slice(t.length);
}
function rC(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function iu(e) {
  return typeof e != "number" ? rC(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function yr(e) {
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
function Ci(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const a = Ze(t), s = Xa(t), i = qa(s), c = it(t), u = a === "y", d = r.x + r.width / 2 - o.width / 2, f = r.y + r.height / 2 - o.height / 2, p = r[i] / 2 - o[i] / 2;
  let h;
  switch (c) {
    case "top":
      h = {
        x: d,
        y: r.y - o.height
      };
      break;
    case "bottom":
      h = {
        x: d,
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
  switch (cn(t)) {
    case "start":
      h[s] -= p * (n && u ? -1 : 1);
      break;
    case "end":
      h[s] += p * (n && u ? -1 : 1);
      break;
  }
  return h;
}
async function oC(e, t) {
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
    boundary: u = "clippingAncestors",
    rootBoundary: d = "viewport",
    elementContext: f = "floating",
    altBoundary: p = !1,
    padding: h = 0
  } = st(t, e), b = iu(h), v = i[p ? f === "floating" ? "reference" : "floating" : f], w = yr(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(v))) == null || n ? v : v.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(i.floating)),
    boundary: u,
    rootBoundary: d,
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
  }, E = yr(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: y,
    offsetParent: x,
    strategy: c
  }) : y);
  return {
    top: (w.top - E.top + b.top) / S.y,
    bottom: (E.bottom - w.bottom + b.bottom) / S.y,
    left: (w.left - E.left + b.left) / S.x,
    right: (E.right - w.right + b.right) / S.x
  };
}
const aC = 50, sC = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: a = [],
    platform: s
  } = n, i = s.detectOverflow ? s : {
    ...s,
    detectOverflow: oC
  }, c = await (s.isRTL == null ? void 0 : s.isRTL(t));
  let u = await s.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: d,
    y: f
  } = Ci(u, r, c), p = r, h = 0;
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
      data: E,
      reset: C
    } = await y({
      x: d,
      y: f,
      initialPlacement: r,
      placement: p,
      strategy: o,
      middlewareData: b,
      rects: u,
      platform: i,
      elements: {
        reference: e,
        floating: t
      }
    });
    d = x ?? d, f = S ?? f, b[w] = {
      ...b[w],
      ...E
    }, C && h < aC && (h++, typeof C == "object" && (C.placement && (p = C.placement), C.rects && (u = C.rects === !0 ? await s.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : C.rects), {
      x: d,
      y: f
    } = Ci(u, p, c)), g = -1);
  }
  return {
    x: d,
    y: f,
    placement: p,
    strategy: o,
    middlewareData: b
  };
}, iC = (e) => ({
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
      element: u,
      padding: d = 0
    } = st(e, t) || {};
    if (u == null)
      return {};
    const f = iu(d), p = {
      x: n,
      y: r
    }, h = Xa(o), b = qa(h), g = await s.getDimensions(u), v = h === "y", w = v ? "top" : "left", y = v ? "bottom" : "right", x = v ? "clientHeight" : "clientWidth", S = a.reference[b] + a.reference[h] - p[h] - a.floating[b], E = p[h] - a.reference[h], C = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(u));
    let N = C ? C[x] : 0;
    (!N || !await (s.isElement == null ? void 0 : s.isElement(C))) && (N = i.floating[x] || a.floating[b]);
    const M = S / 2 - E / 2, _ = N / 2 - g[b] / 2 - 1, O = gt(f[w], _), $ = gt(f[y], _), I = O, Y = N - g[b] - $, D = N / 2 - g[b] / 2 + M, z = ta(I, D, Y), B = !c.arrow && cn(o) != null && D !== z && a.reference[b] / 2 - (D < I ? O : $) - g[b] / 2 < 0, j = B ? D < I ? D - I : D - Y : 0;
    return {
      [h]: p[h] + j,
      data: {
        [h]: z,
        centerOffset: D - z - j,
        ...B && {
          alignmentOffset: j
        }
      },
      reset: B
    };
  }
}), cC = function(e) {
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
        elements: u
      } = t, {
        mainAxis: d = !0,
        crossAxis: f = !0,
        fallbackPlacements: p,
        fallbackStrategy: h = "bestFit",
        fallbackAxisSideDirection: b = "none",
        flipAlignment: g = !0,
        ...v
      } = st(e, t);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const w = it(o), y = Ze(i), x = it(i) === i, S = await (c.isRTL == null ? void 0 : c.isRTL(u.floating)), E = p || (x || !g ? [br(i)] : QS(i)), C = b !== "none";
      !p && C && E.push(...nC(i, g, b, S));
      const N = [i, ...E], M = await c.detectOverflow(t, v), _ = [];
      let O = ((r = a.flip) == null ? void 0 : r.overflows) || [];
      if (d && _.push(M[w]), f) {
        const D = ZS(o, s, S);
        _.push(M[D[0]], M[D[1]]);
      }
      if (O = [...O, {
        placement: o,
        overflows: _
      }], !_.every((D) => D <= 0)) {
        var $, I;
        const D = ((($ = a.flip) == null ? void 0 : $.index) || 0) + 1, z = N[D];
        if (z && (!(f === "alignment" ? y !== Ze(z) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        O.every((L) => Ze(L.placement) === y ? L.overflows[0] > 0 : !0)))
          return {
            data: {
              index: D,
              overflows: O
            },
            reset: {
              placement: z
            }
          };
        let B = (I = O.filter((j) => j.overflows[0] <= 0).sort((j, L) => j.overflows[1] - L.overflows[1])[0]) == null ? void 0 : I.placement;
        if (!B)
          switch (h) {
            case "bestFit": {
              var Y;
              const j = (Y = O.filter((L) => {
                if (C) {
                  const A = Ze(L.placement);
                  return A === y || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  A === "y";
                }
                return !0;
              }).map((L) => [L.placement, L.overflows.filter((A) => A > 0).reduce((A, Z) => A + Z, 0)]).sort((L, A) => L[1] - A[1])[0]) == null ? void 0 : Y[0];
              j && (B = j);
              break;
            }
            case "initialPlacement":
              B = i;
              break;
          }
        if (o !== B)
          return {
            reset: {
              placement: B
            }
          };
      }
      return {};
    }
  };
};
function Ei(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Ni(e) {
  return qS.some((t) => e[t] >= 0);
}
const lC = function(e) {
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
      } = st(e, t);
      switch (o) {
        case "referenceHidden": {
          const s = await r.detectOverflow(t, {
            ...a,
            elementContext: "reference"
          }), i = Ei(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: i,
              referenceHidden: Ni(i)
            }
          };
        }
        case "escaped": {
          const s = await r.detectOverflow(t, {
            ...a,
            altBoundary: !0
          }), i = Ei(s, n.floating);
          return {
            data: {
              escapedOffsets: i,
              escaped: Ni(i)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, cu = /* @__PURE__ */ new Set(["left", "top"]);
async function uC(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), s = it(n), i = cn(n), c = Ze(n) === "y", u = cu.has(s) ? -1 : 1, d = a && c ? -1 : 1, f = st(t, e);
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
    x: h * d,
    y: p * u
  } : {
    x: p * u,
    y: h * d
  };
}
const dC = function(e) {
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
      } = t, c = await uC(t, e);
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
}, fC = function(e) {
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
        ...u
      } = st(e, t), d = {
        x: n,
        y: r
      }, f = await a.detectOverflow(t, u), p = Ze(it(o)), h = Ka(p);
      let b = d[h], g = d[p];
      if (s) {
        const w = h === "y" ? "top" : "left", y = h === "y" ? "bottom" : "right", x = b + f[w], S = b - f[y];
        b = ta(x, b, S);
      }
      if (i) {
        const w = p === "y" ? "top" : "left", y = p === "y" ? "bottom" : "right", x = g + f[w], S = g - f[y];
        g = ta(x, g, S);
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
}, mC = function(e) {
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
        crossAxis: u = !0
      } = st(e, t), d = {
        x: n,
        y: r
      }, f = Ze(o), p = Ka(f);
      let h = d[p], b = d[f];
      const g = st(i, t), v = typeof g == "number" ? {
        mainAxis: g,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...g
      };
      if (c) {
        const x = p === "y" ? "height" : "width", S = a.reference[p] - a.floating[x] + v.mainAxis, E = a.reference[p] + a.reference[x] - v.mainAxis;
        h < S ? h = S : h > E && (h = E);
      }
      if (u) {
        var w, y;
        const x = p === "y" ? "width" : "height", S = cu.has(it(o)), E = a.reference[f] - a.floating[x] + (S && ((w = s.offset) == null ? void 0 : w[f]) || 0) + (S ? 0 : v.crossAxis), C = a.reference[f] + a.reference[x] + (S ? 0 : ((y = s.offset) == null ? void 0 : y[f]) || 0) - (S ? v.crossAxis : 0);
        b < E ? b = E : b > C && (b = C);
      }
      return {
        [p]: h,
        [f]: b
      };
    }
  };
}, pC = function(e) {
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
        ...u
      } = st(e, t), d = await s.detectOverflow(t, u), f = it(o), p = cn(o), h = Ze(o) === "y", {
        width: b,
        height: g
      } = a.floating;
      let v, w;
      f === "top" || f === "bottom" ? (v = f, w = p === (await (s.isRTL == null ? void 0 : s.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (w = f, v = p === "end" ? "top" : "bottom");
      const y = g - d.top - d.bottom, x = b - d.left - d.right, S = gt(g - d[v], y), E = gt(b - d[w], x), C = !t.middlewareData.shift;
      let N = S, M = E;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (M = x), (r = t.middlewareData.shift) != null && r.enabled.y && (N = y), C && !p) {
        const O = Te(d.left, 0), $ = Te(d.right, 0), I = Te(d.top, 0), Y = Te(d.bottom, 0);
        h ? M = b - 2 * (O !== 0 || $ !== 0 ? O + $ : Te(d.left, d.right)) : N = g - 2 * (I !== 0 || Y !== 0 ? I + Y : Te(d.top, d.bottom));
      }
      await c({
        ...t,
        availableWidth: M,
        availableHeight: N
      });
      const _ = await s.getDimensions(i.floating);
      return b !== _.width || g !== _.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Gr() {
  return typeof window < "u";
}
function ln(e) {
  return lu(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function _e(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function tt(e) {
  var t;
  return (t = (lu(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function lu(e) {
  return Gr() ? e instanceof Node || e instanceof _e(e).Node : !1;
}
function Ve(e) {
  return Gr() ? e instanceof Element || e instanceof _e(e).Element : !1;
}
function ct(e) {
  return Gr() ? e instanceof HTMLElement || e instanceof _e(e).HTMLElement : !1;
}
function Pi(e) {
  return !Gr() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof _e(e).ShadowRoot;
}
function Bn(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = He(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && o !== "inline" && o !== "contents";
}
function hC(e) {
  return /^(table|td|th)$/.test(ln(e));
}
function jr(e) {
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
const gC = /transform|translate|scale|rotate|perspective|filter/, vC = /paint|layout|strict|content/, Pt = (e) => !!e && e !== "none";
let Fo;
function Za(e) {
  const t = Ve(e) ? He(e) : e;
  return Pt(t.transform) || Pt(t.translate) || Pt(t.scale) || Pt(t.rotate) || Pt(t.perspective) || !Qa() && (Pt(t.backdropFilter) || Pt(t.filter)) || gC.test(t.willChange || "") || vC.test(t.contain || "");
}
function bC(e) {
  let t = vt(e);
  for (; ct(t) && !en(t); ) {
    if (Za(t))
      return t;
    if (jr(t))
      return null;
    t = vt(t);
  }
  return null;
}
function Qa() {
  return Fo == null && (Fo = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), Fo;
}
function en(e) {
  return /^(html|body|#document)$/.test(ln(e));
}
function He(e) {
  return _e(e).getComputedStyle(e);
}
function Ur(e) {
  return Ve(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function vt(e) {
  if (ln(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    Pi(e) && e.host || // Fallback.
    tt(e)
  );
  return Pi(t) ? t.host : t;
}
function uu(e) {
  const t = vt(e);
  return en(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : ct(t) && Bn(t) ? t : uu(t);
}
function Cn(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = uu(e), a = o === ((r = e.ownerDocument) == null ? void 0 : r.body), s = _e(o);
  if (a) {
    const i = ra(s);
    return t.concat(s, s.visualViewport || [], Bn(o) ? o : [], i && n ? Cn(i) : []);
  } else
    return t.concat(o, Cn(o, [], n));
}
function ra(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function du(e) {
  const t = He(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = ct(e), a = o ? e.offsetWidth : n, s = o ? e.offsetHeight : r, i = vr(n) !== a || vr(r) !== s;
  return i && (n = a, r = s), {
    width: n,
    height: r,
    $: i
  };
}
function Ja(e) {
  return Ve(e) ? e : e.contextElement;
}
function Qt(e) {
  const t = Ja(e);
  if (!ct(t))
    return Qe(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: a
  } = du(t);
  let s = (a ? vr(n.width) : n.width) / r, i = (a ? vr(n.height) : n.height) / o;
  return (!s || !Number.isFinite(s)) && (s = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: s,
    y: i
  };
}
const yC = /* @__PURE__ */ Qe(0);
function fu(e) {
  const t = _e(e);
  return !Qa() || !t.visualViewport ? yC : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function wC(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== _e(e) ? !1 : t;
}
function Dt(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), a = Ja(e);
  let s = Qe(1);
  t && (r ? Ve(r) && (s = Qt(r)) : s = Qt(e));
  const i = wC(a, n, r) ? fu(a) : Qe(0);
  let c = (o.left + i.x) / s.x, u = (o.top + i.y) / s.y, d = o.width / s.x, f = o.height / s.y;
  if (a) {
    const p = _e(a), h = r && Ve(r) ? _e(r) : r;
    let b = p, g = ra(b);
    for (; g && r && h !== b; ) {
      const v = Qt(g), w = g.getBoundingClientRect(), y = He(g), x = w.left + (g.clientLeft + parseFloat(y.paddingLeft)) * v.x, S = w.top + (g.clientTop + parseFloat(y.paddingTop)) * v.y;
      c *= v.x, u *= v.y, d *= v.x, f *= v.y, c += x, u += S, b = _e(g), g = ra(b);
    }
  }
  return yr({
    width: d,
    height: f,
    x: c,
    y: u
  });
}
function Kr(e, t) {
  const n = Ur(e).scrollLeft;
  return t ? t.left + n : Dt(tt(e)).left + n;
}
function mu(e, t) {
  const n = e.getBoundingClientRect(), r = n.left + t.scrollLeft - Kr(e, n), o = n.top + t.scrollTop;
  return {
    x: r,
    y: o
  };
}
function xC(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const a = o === "fixed", s = tt(r), i = t ? jr(t.floating) : !1;
  if (r === s || i && a)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = Qe(1);
  const d = Qe(0), f = ct(r);
  if ((f || !f && !a) && ((ln(r) !== "body" || Bn(s)) && (c = Ur(r)), f)) {
    const h = Dt(r);
    u = Qt(r), d.x = h.x + r.clientLeft, d.y = h.y + r.clientTop;
  }
  const p = s && !f && !a ? mu(s, c) : Qe(0);
  return {
    width: n.width * u.x,
    height: n.height * u.y,
    x: n.x * u.x - c.scrollLeft * u.x + d.x + p.x,
    y: n.y * u.y - c.scrollTop * u.y + d.y + p.y
  };
}
function SC(e) {
  return Array.from(e.getClientRects());
}
function CC(e) {
  const t = tt(e), n = Ur(e), r = e.ownerDocument.body, o = Te(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = Te(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let s = -n.scrollLeft + Kr(e);
  const i = -n.scrollTop;
  return He(r).direction === "rtl" && (s += Te(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: a,
    x: s,
    y: i
  };
}
const Ri = 25;
function EC(e, t) {
  const n = _e(e), r = tt(e), o = n.visualViewport;
  let a = r.clientWidth, s = r.clientHeight, i = 0, c = 0;
  if (o) {
    a = o.width, s = o.height;
    const d = Qa();
    (!d || d && t === "fixed") && (i = o.offsetLeft, c = o.offsetTop);
  }
  const u = Kr(r);
  if (u <= 0) {
    const d = r.ownerDocument, f = d.body, p = getComputedStyle(f), h = d.compatMode === "CSS1Compat" && parseFloat(p.marginLeft) + parseFloat(p.marginRight) || 0, b = Math.abs(r.clientWidth - f.clientWidth - h);
    b <= Ri && (a -= b);
  } else u <= Ri && (a += u);
  return {
    width: a,
    height: s,
    x: i,
    y: c
  };
}
function NC(e, t) {
  const n = Dt(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, a = ct(e) ? Qt(e) : Qe(1), s = e.clientWidth * a.x, i = e.clientHeight * a.y, c = o * a.x, u = r * a.y;
  return {
    width: s,
    height: i,
    x: c,
    y: u
  };
}
function ki(e, t, n) {
  let r;
  if (t === "viewport")
    r = EC(e, n);
  else if (t === "document")
    r = CC(tt(e));
  else if (Ve(t))
    r = NC(t, n);
  else {
    const o = fu(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return yr(r);
}
function pu(e, t) {
  const n = vt(e);
  return n === t || !Ve(n) || en(n) ? !1 : He(n).position === "fixed" || pu(n, t);
}
function PC(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Cn(e, [], !1).filter((i) => Ve(i) && ln(i) !== "body"), o = null;
  const a = He(e).position === "fixed";
  let s = a ? vt(e) : e;
  for (; Ve(s) && !en(s); ) {
    const i = He(s), c = Za(s);
    !c && i.position === "fixed" && (o = null), (a ? !c && !o : !c && i.position === "static" && !!o && (o.position === "absolute" || o.position === "fixed") || Bn(s) && !c && pu(e, s)) ? r = r.filter((d) => d !== s) : o = i, s = vt(s);
  }
  return t.set(e, r), r;
}
function RC(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const s = [...n === "clippingAncestors" ? jr(t) ? [] : PC(t, this._c) : [].concat(n), r], i = ki(t, s[0], o);
  let c = i.top, u = i.right, d = i.bottom, f = i.left;
  for (let p = 1; p < s.length; p++) {
    const h = ki(t, s[p], o);
    c = Te(h.top, c), u = gt(h.right, u), d = gt(h.bottom, d), f = Te(h.left, f);
  }
  return {
    width: u - f,
    height: d - c,
    x: f,
    y: c
  };
}
function kC(e) {
  const {
    width: t,
    height: n
  } = du(e);
  return {
    width: t,
    height: n
  };
}
function MC(e, t, n) {
  const r = ct(t), o = tt(t), a = n === "fixed", s = Dt(e, !0, a, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = Qe(0);
  function u() {
    c.x = Kr(o);
  }
  if (r || !r && !a)
    if ((ln(t) !== "body" || Bn(o)) && (i = Ur(t)), r) {
      const h = Dt(t, !0, a, t);
      c.x = h.x + t.clientLeft, c.y = h.y + t.clientTop;
    } else o && u();
  a && !r && o && u();
  const d = o && !r && !a ? mu(o, i) : Qe(0), f = s.left + i.scrollLeft - c.x - d.x, p = s.top + i.scrollTop - c.y - d.y;
  return {
    x: f,
    y: p,
    width: s.width,
    height: s.height
  };
}
function Lo(e) {
  return He(e).position === "static";
}
function Mi(e, t) {
  if (!ct(e) || He(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return tt(e) === n && (n = n.ownerDocument.body), n;
}
function hu(e, t) {
  const n = _e(e);
  if (jr(e))
    return n;
  if (!ct(e)) {
    let o = vt(e);
    for (; o && !en(o); ) {
      if (Ve(o) && !Lo(o))
        return o;
      o = vt(o);
    }
    return n;
  }
  let r = Mi(e, t);
  for (; r && hC(r) && Lo(r); )
    r = Mi(r, t);
  return r && en(r) && Lo(r) && !Za(r) ? n : r || bC(e) || n;
}
const TC = async function(e) {
  const t = this.getOffsetParent || hu, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: MC(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function _C(e) {
  return He(e).direction === "rtl";
}
const DC = {
  convertOffsetParentRelativeRectToViewportRelativeRect: xC,
  getDocumentElement: tt,
  getClippingRect: RC,
  getOffsetParent: hu,
  getElementRects: TC,
  getClientRects: SC,
  getDimensions: kC,
  getScale: Qt,
  isElement: Ve,
  isRTL: _C
};
function gu(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function OC(e, t) {
  let n = null, r;
  const o = tt(e);
  function a() {
    var i;
    clearTimeout(r), (i = n) == null || i.disconnect(), n = null;
  }
  function s(i, c) {
    i === void 0 && (i = !1), c === void 0 && (c = 1), a();
    const u = e.getBoundingClientRect(), {
      left: d,
      top: f,
      width: p,
      height: h
    } = u;
    if (i || t(), !p || !h)
      return;
    const b = tr(f), g = tr(o.clientWidth - (d + p)), v = tr(o.clientHeight - (f + h)), w = tr(d), x = {
      rootMargin: -b + "px " + -g + "px " + -v + "px " + -w + "px",
      threshold: Te(0, gt(1, c)) || 1
    };
    let S = !0;
    function E(C) {
      const N = C[0].intersectionRatio;
      if (N !== c) {
        if (!S)
          return s();
        N ? s(!1, N) : r = setTimeout(() => {
          s(!1, 1e-7);
        }, 1e3);
      }
      N === 1 && !gu(u, e.getBoundingClientRect()) && s(), S = !1;
    }
    try {
      n = new IntersectionObserver(E, {
        ...x,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(E, x);
    }
    n.observe(e);
  }
  return s(!0), a;
}
function AC(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: a = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, u = Ja(e), d = o || a ? [...u ? Cn(u) : [], ...t ? Cn(t) : []] : [];
  d.forEach((w) => {
    o && w.addEventListener("scroll", n, {
      passive: !0
    }), a && w.addEventListener("resize", n);
  });
  const f = u && i ? OC(u, n) : null;
  let p = -1, h = null;
  s && (h = new ResizeObserver((w) => {
    let [y] = w;
    y && y.target === u && h && t && (h.unobserve(t), cancelAnimationFrame(p), p = requestAnimationFrame(() => {
      var x;
      (x = h) == null || x.observe(t);
    })), n();
  }), u && !c && h.observe(u), t && h.observe(t));
  let b, g = c ? Dt(e) : null;
  c && v();
  function v() {
    const w = Dt(e);
    g && !gu(g, w) && n(), g = w, b = requestAnimationFrame(v);
  }
  return n(), () => {
    var w;
    d.forEach((y) => {
      o && y.removeEventListener("scroll", n), a && y.removeEventListener("resize", n);
    }), f == null || f(), (w = h) == null || w.disconnect(), h = null, c && cancelAnimationFrame(b);
  };
}
const IC = dC, $C = fC, WC = cC, FC = pC, LC = lC, Ti = iC, BC = mC, VC = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: DC,
    ...n
  }, a = {
    ...o.platform,
    _c: r
  };
  return sC(e, t, {
    ...o,
    platform: a
  });
};
var HC = typeof document < "u", YC = function() {
}, cr = HC ? Gi : YC;
function wr(e, t) {
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
        if (!wr(e[r], t[r]))
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
      if (!(a === "_owner" && e.$$typeof) && !wr(e[a], t[a]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function vu(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function _i(e, t) {
  const n = vu(e);
  return Math.round(t * n) / n;
}
function Bo(e) {
  const t = l.useRef(e);
  return cr(() => {
    t.current = e;
  }), t;
}
function zC(e) {
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
    open: u
  } = e, [d, f] = l.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [p, h] = l.useState(r);
  wr(p, r) || h(r);
  const [b, g] = l.useState(null), [v, w] = l.useState(null), y = l.useCallback((L) => {
    L !== C.current && (C.current = L, g(L));
  }, []), x = l.useCallback((L) => {
    L !== N.current && (N.current = L, w(L));
  }, []), S = a || b, E = s || v, C = l.useRef(null), N = l.useRef(null), M = l.useRef(d), _ = c != null, O = Bo(c), $ = Bo(o), I = Bo(u), Y = l.useCallback(() => {
    if (!C.current || !N.current)
      return;
    const L = {
      placement: t,
      strategy: n,
      middleware: p
    };
    $.current && (L.platform = $.current), VC(C.current, N.current, L).then((A) => {
      const Z = {
        ...A,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: I.current !== !1
      };
      D.current && !wr(M.current, Z) && (M.current = Z, kn.flushSync(() => {
        f(Z);
      }));
    });
  }, [p, t, n, $, I]);
  cr(() => {
    u === !1 && M.current.isPositioned && (M.current.isPositioned = !1, f((L) => ({
      ...L,
      isPositioned: !1
    })));
  }, [u]);
  const D = l.useRef(!1);
  cr(() => (D.current = !0, () => {
    D.current = !1;
  }), []), cr(() => {
    if (S && (C.current = S), E && (N.current = E), S && E) {
      if (O.current)
        return O.current(S, E, Y);
      Y();
    }
  }, [S, E, Y, O, _]);
  const z = l.useMemo(() => ({
    reference: C,
    floating: N,
    setReference: y,
    setFloating: x
  }), [y, x]), B = l.useMemo(() => ({
    reference: S,
    floating: E
  }), [S, E]), j = l.useMemo(() => {
    const L = {
      position: n,
      left: 0,
      top: 0
    };
    if (!B.floating)
      return L;
    const A = _i(B.floating, d.x), Z = _i(B.floating, d.y);
    return i ? {
      ...L,
      transform: "translate(" + A + "px, " + Z + "px)",
      ...vu(B.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: A,
      top: Z
    };
  }, [n, i, B.floating, d.x, d.y]);
  return l.useMemo(() => ({
    ...d,
    update: Y,
    refs: z,
    elements: B,
    floatingStyles: j
  }), [d, Y, z, B, j]);
}
const GC = (e) => {
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
      return r && t(r) ? r.current != null ? Ti({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? Ti({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, jC = (e, t) => {
  const n = IC(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, UC = (e, t) => {
  const n = $C(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, KC = (e, t) => ({
  fn: BC(e).fn,
  options: [e, t]
}), qC = (e, t) => {
  const n = WC(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, XC = (e, t) => {
  const n = FC(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, ZC = (e, t) => {
  const n = LC(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
}, QC = (e, t) => {
  const n = GC(e);
  return {
    name: n.name,
    fn: n.fn,
    options: [e, t]
  };
};
var JC = "Arrow", bu = l.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...a } = e;
  return /* @__PURE__ */ m(
    F.svg,
    {
      ...a,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ m("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
bu.displayName = JC;
var e0 = bu, es = "Popper", [yu, yt] = ye(es), [t0, wu] = yu(es), xu = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = l.useState(null);
  return /* @__PURE__ */ m(t0, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
xu.displayName = es;
var Su = "PopperAnchor", Cu = l.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, a = wu(Su, n), s = l.useRef(null), i = q(t, s), c = l.useRef(null);
    return l.useEffect(() => {
      const u = c.current;
      c.current = (r == null ? void 0 : r.current) || s.current, u !== c.current && a.onAnchorChange(c.current);
    }), r ? null : /* @__PURE__ */ m(F.div, { ...o, ref: i });
  }
);
Cu.displayName = Su;
var ts = "PopperContent", [n0, r0] = yu(ts), Eu = l.forwardRef(
  (e, t) => {
    var W, te, J, oe, ie, ce;
    const {
      __scopePopper: n,
      side: r = "bottom",
      sideOffset: o = 0,
      align: a = "center",
      alignOffset: s = 0,
      arrowPadding: i = 0,
      avoidCollisions: c = !0,
      collisionBoundary: u = [],
      collisionPadding: d = 0,
      sticky: f = "partial",
      hideWhenDetached: p = !1,
      updatePositionStrategy: h = "optimized",
      onPlaced: b,
      ...g
    } = e, v = wu(ts, n), [w, y] = l.useState(null), x = q(t, (Ee) => y(Ee)), [S, E] = l.useState(null), C = An(S), N = (C == null ? void 0 : C.width) ?? 0, M = (C == null ? void 0 : C.height) ?? 0, _ = r + (a !== "center" ? "-" + a : ""), O = typeof d == "number" ? d : { top: 0, right: 0, bottom: 0, left: 0, ...d }, $ = Array.isArray(u) ? u : [u], I = $.length > 0, Y = {
      padding: O,
      boundary: $.filter(a0),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: I
    }, { refs: D, floatingStyles: z, placement: B, isPositioned: j, middlewareData: L } = zC({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: _,
      whileElementsMounted: (...Ee) => AC(...Ee, {
        animationFrame: h === "always"
      }),
      elements: {
        reference: v.anchor
      },
      middleware: [
        jC({ mainAxis: o + M, alignmentAxis: s }),
        c && UC({
          mainAxis: !0,
          crossAxis: !1,
          limiter: f === "partial" ? KC() : void 0,
          ...Y
        }),
        c && qC({ ...Y }),
        XC({
          ...Y,
          apply: ({ elements: Ee, rects: Oe, availableWidth: lt, availableHeight: Et }) => {
            const { width: Nt, height: ho } = Oe.reference, Lt = Ee.floating.style;
            Lt.setProperty("--radix-popper-available-width", `${lt}px`), Lt.setProperty("--radix-popper-available-height", `${Et}px`), Lt.setProperty("--radix-popper-anchor-width", `${Nt}px`), Lt.setProperty("--radix-popper-anchor-height", `${ho}px`);
          }
        }),
        S && QC({ element: S, padding: i }),
        s0({ arrowWidth: N, arrowHeight: M }),
        p && ZC({ strategy: "referenceHidden", ...Y })
      ]
    }), [A, Z] = Ru(B), Q = pe(b);
    ge(() => {
      j && (Q == null || Q());
    }, [j, Q]);
    const k = (W = L.arrow) == null ? void 0 : W.x, H = (te = L.arrow) == null ? void 0 : te.y, K = ((J = L.arrow) == null ? void 0 : J.centerOffset) !== 0, [V, ee] = l.useState();
    return ge(() => {
      w && ee(window.getComputedStyle(w).zIndex);
    }, [w]), /* @__PURE__ */ m(
      "div",
      {
        ref: D.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...z,
          transform: j ? z.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: V,
          "--radix-popper-transform-origin": [
            (oe = L.transformOrigin) == null ? void 0 : oe.x,
            (ie = L.transformOrigin) == null ? void 0 : ie.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((ce = L.hide) == null ? void 0 : ce.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ m(
          n0,
          {
            scope: n,
            placedSide: A,
            onArrowChange: E,
            arrowX: k,
            arrowY: H,
            shouldHideArrow: K,
            children: /* @__PURE__ */ m(
              F.div,
              {
                "data-side": A,
                "data-align": Z,
                ...g,
                ref: x,
                style: {
                  ...g.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: j ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
Eu.displayName = ts;
var Nu = "PopperArrow", o0 = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Pu = l.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, a = r0(Nu, r), s = o0[a.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ m(
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
        children: /* @__PURE__ */ m(
          e0,
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
Pu.displayName = Nu;
function a0(e) {
  return e !== null;
}
var s0 = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var v, w, y;
    const { placement: n, rects: r, middlewareData: o } = t, s = ((v = o.arrow) == null ? void 0 : v.centerOffset) !== 0, i = s ? 0 : e.arrowWidth, c = s ? 0 : e.arrowHeight, [u, d] = Ru(n), f = { start: "0%", center: "50%", end: "100%" }[d], p = (((w = o.arrow) == null ? void 0 : w.x) ?? 0) + i / 2, h = (((y = o.arrow) == null ? void 0 : y.y) ?? 0) + c / 2;
    let b = "", g = "";
    return u === "bottom" ? (b = s ? f : `${p}px`, g = `${-c}px`) : u === "top" ? (b = s ? f : `${p}px`, g = `${r.floating.height + c}px`) : u === "right" ? (b = `${-c}px`, g = s ? f : `${h}px`) : u === "left" && (b = `${r.floating.width + c}px`, g = s ? f : `${h}px`), { data: { x: b, y: g } };
  }
});
function Ru(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Vn = xu, Hn = Cu, qr = Eu, Xr = Pu, Vo = "rovingFocusGroup.onEntryFocus", i0 = { bubbles: !1, cancelable: !0 }, Yn = "RovingFocusGroup", [oa, ku, c0] = an(Yn), [l0, un] = ye(
  Yn,
  [c0]
), [u0, d0] = l0(Yn), Mu = l.forwardRef(
  (e, t) => /* @__PURE__ */ m(oa.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ m(oa.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ m(f0, { ...e, ref: t }) }) })
);
Mu.displayName = Yn;
var f0 = l.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: n,
    orientation: r,
    loop: o = !1,
    dir: a,
    currentTabStopId: s,
    defaultCurrentTabStopId: i,
    onCurrentTabStopIdChange: c,
    onEntryFocus: u,
    preventScrollOnEntryFocus: d = !1,
    ...f
  } = e, p = l.useRef(null), h = q(t, p), b = bt(a), [g, v] = we({
    prop: s,
    defaultProp: i ?? null,
    onChange: c,
    caller: Yn
  }), [w, y] = l.useState(!1), x = pe(u), S = ku(n), E = l.useRef(!1), [C, N] = l.useState(0);
  return l.useEffect(() => {
    const M = p.current;
    if (M)
      return M.addEventListener(Vo, x), () => M.removeEventListener(Vo, x);
  }, [x]), /* @__PURE__ */ m(
    u0,
    {
      scope: n,
      orientation: r,
      dir: b,
      loop: o,
      currentTabStopId: g,
      onItemFocus: l.useCallback(
        (M) => v(M),
        [v]
      ),
      onItemShiftTab: l.useCallback(() => y(!0), []),
      onFocusableItemAdd: l.useCallback(
        () => N((M) => M + 1),
        []
      ),
      onFocusableItemRemove: l.useCallback(
        () => N((M) => M - 1),
        []
      ),
      children: /* @__PURE__ */ m(
        F.div,
        {
          tabIndex: w || C === 0 ? -1 : 0,
          "data-orientation": r,
          ...f,
          ref: h,
          style: { outline: "none", ...e.style },
          onMouseDown: T(e.onMouseDown, () => {
            E.current = !0;
          }),
          onFocus: T(e.onFocus, (M) => {
            const _ = !E.current;
            if (M.target === M.currentTarget && _ && !w) {
              const O = new CustomEvent(Vo, i0);
              if (M.currentTarget.dispatchEvent(O), !O.defaultPrevented) {
                const $ = S().filter((B) => B.focusable), I = $.find((B) => B.active), Y = $.find((B) => B.id === g), z = [I, Y, ...$].filter(
                  Boolean
                ).map((B) => B.ref.current);
                Du(z, d);
              }
            }
            E.current = !1;
          }),
          onBlur: T(e.onBlur, () => y(!1))
        }
      )
    }
  );
}), Tu = "RovingFocusGroupItem", _u = l.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: a,
      children: s,
      ...i
    } = e, c = he(), u = a || c, d = d0(Tu, n), f = d.currentTabStopId === u, p = ku(n), { onFocusableItemAdd: h, onFocusableItemRemove: b, currentTabStopId: g } = d;
    return l.useEffect(() => {
      if (r)
        return h(), () => b();
    }, [r, h, b]), /* @__PURE__ */ m(
      oa.ItemSlot,
      {
        scope: n,
        id: u,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ m(
          F.span,
          {
            tabIndex: f ? 0 : -1,
            "data-orientation": d.orientation,
            ...i,
            ref: t,
            onMouseDown: T(e.onMouseDown, (v) => {
              r ? d.onItemFocus(u) : v.preventDefault();
            }),
            onFocus: T(e.onFocus, () => d.onItemFocus(u)),
            onKeyDown: T(e.onKeyDown, (v) => {
              if (v.key === "Tab" && v.shiftKey) {
                d.onItemShiftTab();
                return;
              }
              if (v.target !== v.currentTarget) return;
              const w = h0(v, d.orientation, d.dir);
              if (w !== void 0) {
                if (v.metaKey || v.ctrlKey || v.altKey || v.shiftKey) return;
                v.preventDefault();
                let x = p().filter((S) => S.focusable).map((S) => S.ref.current);
                if (w === "last") x.reverse();
                else if (w === "prev" || w === "next") {
                  w === "prev" && x.reverse();
                  const S = x.indexOf(v.currentTarget);
                  x = d.loop ? g0(x, S + 1) : x.slice(S + 1);
                }
                setTimeout(() => Du(x));
              }
            }),
            children: typeof s == "function" ? s({ isCurrentTabStop: f, hasTabStop: g != null }) : s
          }
        )
      }
    );
  }
);
_u.displayName = Tu;
var m0 = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function p0(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function h0(e, t, n) {
  const r = p0(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return m0[r];
}
function Du(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function g0(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var ns = Mu, rs = _u;
// @__NO_SIDE_EFFECTS__
function v0(e) {
  const t = /* @__PURE__ */ b0(e), n = l.forwardRef((r, o) => {
    const { children: a, ...s } = r, i = l.Children.toArray(a), c = i.find(w0);
    if (c) {
      const u = c.props.children, d = i.map((f) => f === c ? l.Children.count(u) > 1 ? l.Children.only(null) : l.isValidElement(u) ? u.props.children : null : f);
      return /* @__PURE__ */ m(t, { ...s, ref: o, children: l.isValidElement(u) ? l.cloneElement(u, void 0, d) : null });
    }
    return /* @__PURE__ */ m(t, { ...s, ref: o, children: a });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function b0(e) {
  const t = l.forwardRef((n, r) => {
    const { children: o, ...a } = n;
    if (l.isValidElement(o)) {
      const s = S0(o), i = x0(a, o.props);
      return o.type !== l.Fragment && (i.ref = r ? Ne(r, s) : s), l.cloneElement(o, i);
    }
    return l.Children.count(o) > 1 ? l.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var y0 = Symbol("radix.slottable");
function w0(e) {
  return l.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === y0;
}
function x0(e, t) {
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
function S0(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var aa = ["Enter", " "], C0 = ["ArrowDown", "PageUp", "Home"], Ou = ["ArrowUp", "PageDown", "End"], E0 = [...C0, ...Ou], N0 = {
  ltr: [...aa, "ArrowRight"],
  rtl: [...aa, "ArrowLeft"]
}, P0 = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, zn = "Menu", [En, R0, k0] = an(zn), [Ft, Au] = ye(zn, [
  k0,
  yt,
  un
]), Gn = yt(), Iu = un(), [$u, wt] = Ft(zn), [M0, jn] = Ft(zn), Wu = (e) => {
  const { __scopeMenu: t, open: n = !1, children: r, dir: o, onOpenChange: a, modal: s = !0 } = e, i = Gn(t), [c, u] = l.useState(null), d = l.useRef(!1), f = pe(a), p = bt(o);
  return l.useEffect(() => {
    const h = () => {
      d.current = !0, document.addEventListener("pointerdown", b, { capture: !0, once: !0 }), document.addEventListener("pointermove", b, { capture: !0, once: !0 });
    }, b = () => d.current = !1;
    return document.addEventListener("keydown", h, { capture: !0 }), () => {
      document.removeEventListener("keydown", h, { capture: !0 }), document.removeEventListener("pointerdown", b, { capture: !0 }), document.removeEventListener("pointermove", b, { capture: !0 });
    };
  }, []), /* @__PURE__ */ m(Vn, { ...i, children: /* @__PURE__ */ m(
    $u,
    {
      scope: t,
      open: n,
      onOpenChange: f,
      content: c,
      onContentChange: u,
      children: /* @__PURE__ */ m(
        M0,
        {
          scope: t,
          onClose: l.useCallback(() => f(!1), [f]),
          isUsingKeyboardRef: d,
          dir: p,
          modal: s,
          children: r
        }
      )
    }
  ) });
};
Wu.displayName = zn;
var T0 = "MenuAnchor", os = l.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = Gn(n);
    return /* @__PURE__ */ m(Hn, { ...o, ...r, ref: t });
  }
);
os.displayName = T0;
var as = "MenuPortal", [_0, Fu] = Ft(as, {
  forceMount: void 0
}), Lu = (e) => {
  const { __scopeMenu: t, forceMount: n, children: r, container: o } = e, a = wt(as, t);
  return /* @__PURE__ */ m(_0, { scope: t, forceMount: n, children: /* @__PURE__ */ m(ve, { present: n || a.open, children: /* @__PURE__ */ m(Wt, { asChild: !0, container: o, children: r }) }) });
};
Lu.displayName = as;
var $e = "MenuContent", [D0, ss] = Ft($e), Bu = l.forwardRef(
  (e, t) => {
    const n = Fu($e, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, a = wt($e, e.__scopeMenu), s = jn($e, e.__scopeMenu);
    return /* @__PURE__ */ m(En.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ m(ve, { present: r || a.open, children: /* @__PURE__ */ m(En.Slot, { scope: e.__scopeMenu, children: s.modal ? /* @__PURE__ */ m(O0, { ...o, ref: t }) : /* @__PURE__ */ m(A0, { ...o, ref: t }) }) }) });
  }
), O0 = l.forwardRef(
  (e, t) => {
    const n = wt($e, e.__scopeMenu), r = l.useRef(null), o = q(t, r);
    return l.useEffect(() => {
      const a = r.current;
      if (a) return Lr(a);
    }, []), /* @__PURE__ */ m(
      is,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: T(
          e.onFocusOutside,
          (a) => a.preventDefault(),
          { checkForDefaultPrevented: !1 }
        ),
        onDismiss: () => n.onOpenChange(!1)
      }
    );
  }
), A0 = l.forwardRef((e, t) => {
  const n = wt($e, e.__scopeMenu);
  return /* @__PURE__ */ m(
    is,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}), I0 = /* @__PURE__ */ v0("MenuContent.ScrollLock"), is = l.forwardRef(
  (e, t) => {
    const {
      __scopeMenu: n,
      loop: r = !1,
      trapFocus: o,
      onOpenAutoFocus: a,
      onCloseAutoFocus: s,
      disableOutsidePointerEvents: i,
      onEntryFocus: c,
      onEscapeKeyDown: u,
      onPointerDownOutside: d,
      onFocusOutside: f,
      onInteractOutside: p,
      onDismiss: h,
      disableOutsideScroll: b,
      ...g
    } = e, v = wt($e, n), w = jn($e, n), y = Gn(n), x = Iu(n), S = R0(n), [E, C] = l.useState(null), N = l.useRef(null), M = q(t, N, v.onContentChange), _ = l.useRef(0), O = l.useRef(""), $ = l.useRef(0), I = l.useRef(null), Y = l.useRef("right"), D = l.useRef(0), z = b ? $n : l.Fragment, B = b ? { as: I0, allowPinchZoom: !0 } : void 0, j = (A) => {
      var W, te;
      const Z = O.current + A, Q = S().filter((J) => !J.disabled), k = document.activeElement, H = (W = Q.find((J) => J.ref.current === k)) == null ? void 0 : W.textValue, K = Q.map((J) => J.textValue), V = U0(K, Z, H), ee = (te = Q.find((J) => J.textValue === V)) == null ? void 0 : te.ref.current;
      (function J(oe) {
        O.current = oe, window.clearTimeout(_.current), oe !== "" && (_.current = window.setTimeout(() => J(""), 1e3));
      })(Z), ee && setTimeout(() => ee.focus());
    };
    l.useEffect(() => () => window.clearTimeout(_.current), []), Wr();
    const L = l.useCallback((A) => {
      var Q, k;
      return Y.current === ((Q = I.current) == null ? void 0 : Q.side) && q0(A, (k = I.current) == null ? void 0 : k.area);
    }, []);
    return /* @__PURE__ */ m(
      D0,
      {
        scope: n,
        searchRef: O,
        onItemEnter: l.useCallback(
          (A) => {
            L(A) && A.preventDefault();
          },
          [L]
        ),
        onItemLeave: l.useCallback(
          (A) => {
            var Z;
            L(A) || ((Z = N.current) == null || Z.focus(), C(null));
          },
          [L]
        ),
        onTriggerLeave: l.useCallback(
          (A) => {
            L(A) && A.preventDefault();
          },
          [L]
        ),
        pointerGraceTimerRef: $,
        onPointerGraceIntentChange: l.useCallback((A) => {
          I.current = A;
        }, []),
        children: /* @__PURE__ */ m(z, { ...B, children: /* @__PURE__ */ m(
          In,
          {
            asChild: !0,
            trapped: o,
            onMountAutoFocus: T(a, (A) => {
              var Z;
              A.preventDefault(), (Z = N.current) == null || Z.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: s,
            children: /* @__PURE__ */ m(
              $t,
              {
                asChild: !0,
                disableOutsidePointerEvents: i,
                onEscapeKeyDown: u,
                onPointerDownOutside: d,
                onFocusOutside: f,
                onInteractOutside: p,
                onDismiss: h,
                children: /* @__PURE__ */ m(
                  ns,
                  {
                    asChild: !0,
                    ...x,
                    dir: w.dir,
                    orientation: "vertical",
                    loop: r,
                    currentTabStopId: E,
                    onCurrentTabStopIdChange: C,
                    onEntryFocus: T(c, (A) => {
                      w.isUsingKeyboardRef.current || A.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ m(
                      qr,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": rd(v.open),
                        "data-radix-menu-content": "",
                        dir: w.dir,
                        ...y,
                        ...g,
                        ref: M,
                        style: { outline: "none", ...g.style },
                        onKeyDown: T(g.onKeyDown, (A) => {
                          const Q = A.target.closest("[data-radix-menu-content]") === A.currentTarget, k = A.ctrlKey || A.altKey || A.metaKey, H = A.key.length === 1;
                          Q && (A.key === "Tab" && A.preventDefault(), !k && H && j(A.key));
                          const K = N.current;
                          if (A.target !== K || !E0.includes(A.key)) return;
                          A.preventDefault();
                          const ee = S().filter((W) => !W.disabled).map((W) => W.ref.current);
                          Ou.includes(A.key) && ee.reverse(), G0(ee);
                        }),
                        onBlur: T(e.onBlur, (A) => {
                          A.currentTarget.contains(A.target) || (window.clearTimeout(_.current), O.current = "");
                        }),
                        onPointerMove: T(
                          e.onPointerMove,
                          Nn((A) => {
                            const Z = A.target, Q = D.current !== A.clientX;
                            if (A.currentTarget.contains(Z) && Q) {
                              const k = A.clientX > D.current ? "right" : "left";
                              Y.current = k, D.current = A.clientX;
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
Bu.displayName = $e;
var $0 = "MenuGroup", cs = l.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ m(F.div, { role: "group", ...r, ref: t });
  }
);
cs.displayName = $0;
var W0 = "MenuLabel", Vu = l.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ m(F.div, { ...r, ref: t });
  }
);
Vu.displayName = W0;
var xr = "MenuItem", Di = "menu.itemSelect", Zr = l.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e, a = l.useRef(null), s = jn(xr, e.__scopeMenu), i = ss(xr, e.__scopeMenu), c = q(t, a), u = l.useRef(!1), d = () => {
      const f = a.current;
      if (!n && f) {
        const p = new CustomEvent(Di, { bubbles: !0, cancelable: !0 });
        f.addEventListener(Di, (h) => r == null ? void 0 : r(h), { once: !0 }), xa(f, p), p.defaultPrevented ? u.current = !1 : s.onClose();
      }
    };
    return /* @__PURE__ */ m(
      Hu,
      {
        ...o,
        ref: c,
        disabled: n,
        onClick: T(e.onClick, d),
        onPointerDown: (f) => {
          var p;
          (p = e.onPointerDown) == null || p.call(e, f), u.current = !0;
        },
        onPointerUp: T(e.onPointerUp, (f) => {
          var p;
          u.current || (p = f.currentTarget) == null || p.click();
        }),
        onKeyDown: T(e.onKeyDown, (f) => {
          const p = i.searchRef.current !== "";
          n || p && f.key === " " || aa.includes(f.key) && (f.currentTarget.click(), f.preventDefault());
        })
      }
    );
  }
);
Zr.displayName = xr;
var Hu = l.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...a } = e, s = ss(xr, n), i = Iu(n), c = l.useRef(null), u = q(t, c), [d, f] = l.useState(!1), [p, h] = l.useState("");
    return l.useEffect(() => {
      const b = c.current;
      b && h((b.textContent ?? "").trim());
    }, [a.children]), /* @__PURE__ */ m(
      En.ItemSlot,
      {
        scope: n,
        disabled: r,
        textValue: o ?? p,
        children: /* @__PURE__ */ m(rs, { asChild: !0, ...i, focusable: !r, children: /* @__PURE__ */ m(
          F.div,
          {
            role: "menuitem",
            "data-highlighted": d ? "" : void 0,
            "aria-disabled": r || void 0,
            "data-disabled": r ? "" : void 0,
            ...a,
            ref: u,
            onPointerMove: T(
              e.onPointerMove,
              Nn((b) => {
                r ? s.onItemLeave(b) : (s.onItemEnter(b), b.defaultPrevented || b.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: T(
              e.onPointerLeave,
              Nn((b) => s.onItemLeave(b))
            ),
            onFocus: T(e.onFocus, () => f(!0)),
            onBlur: T(e.onBlur, () => f(!1))
          }
        ) })
      }
    );
  }
), F0 = "MenuCheckboxItem", Yu = l.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e;
    return /* @__PURE__ */ m(Ku, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ m(
      Zr,
      {
        role: "menuitemcheckbox",
        "aria-checked": Sr(n) ? "mixed" : n,
        ...o,
        ref: t,
        "data-state": ds(n),
        onSelect: T(
          o.onSelect,
          () => r == null ? void 0 : r(Sr(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Yu.displayName = F0;
var zu = "MenuRadioGroup", [L0, B0] = Ft(
  zu,
  { value: void 0, onValueChange: () => {
  } }
), Gu = l.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: r, ...o } = e, a = pe(r);
    return /* @__PURE__ */ m(L0, { scope: e.__scopeMenu, value: n, onValueChange: a, children: /* @__PURE__ */ m(cs, { ...o, ref: t }) });
  }
);
Gu.displayName = zu;
var ju = "MenuRadioItem", Uu = l.forwardRef(
  (e, t) => {
    const { value: n, ...r } = e, o = B0(ju, e.__scopeMenu), a = n === o.value;
    return /* @__PURE__ */ m(Ku, { scope: e.__scopeMenu, checked: a, children: /* @__PURE__ */ m(
      Zr,
      {
        role: "menuitemradio",
        "aria-checked": a,
        ...r,
        ref: t,
        "data-state": ds(a),
        onSelect: T(
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
Uu.displayName = ju;
var ls = "MenuItemIndicator", [Ku, V0] = Ft(
  ls,
  { checked: !1 }
), qu = l.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e, a = V0(ls, n);
    return /* @__PURE__ */ m(
      ve,
      {
        present: r || Sr(a.checked) || a.checked === !0,
        children: /* @__PURE__ */ m(
          F.span,
          {
            ...o,
            ref: t,
            "data-state": ds(a.checked)
          }
        )
      }
    );
  }
);
qu.displayName = ls;
var H0 = "MenuSeparator", Xu = l.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ m(
      F.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...r,
        ref: t
      }
    );
  }
);
Xu.displayName = H0;
var Y0 = "MenuArrow", Zu = l.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = Gn(n);
    return /* @__PURE__ */ m(Xr, { ...o, ...r, ref: t });
  }
);
Zu.displayName = Y0;
var us = "MenuSub", [z0, Qu] = Ft(us), Ju = (e) => {
  const { __scopeMenu: t, children: n, open: r = !1, onOpenChange: o } = e, a = wt(us, t), s = Gn(t), [i, c] = l.useState(null), [u, d] = l.useState(null), f = pe(o);
  return l.useEffect(() => (a.open === !1 && f(!1), () => f(!1)), [a.open, f]), /* @__PURE__ */ m(Vn, { ...s, children: /* @__PURE__ */ m(
    $u,
    {
      scope: t,
      open: r,
      onOpenChange: f,
      content: u,
      onContentChange: d,
      children: /* @__PURE__ */ m(
        z0,
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
Ju.displayName = us;
var vn = "MenuSubTrigger", ed = l.forwardRef(
  (e, t) => {
    const n = wt(vn, e.__scopeMenu), r = jn(vn, e.__scopeMenu), o = Qu(vn, e.__scopeMenu), a = ss(vn, e.__scopeMenu), s = l.useRef(null), { pointerGraceTimerRef: i, onPointerGraceIntentChange: c } = a, u = { __scopeMenu: e.__scopeMenu }, d = l.useCallback(() => {
      s.current && window.clearTimeout(s.current), s.current = null;
    }, []);
    return l.useEffect(() => d, [d]), l.useEffect(() => {
      const f = i.current;
      return () => {
        window.clearTimeout(f), c(null);
      };
    }, [i, c]), /* @__PURE__ */ m(os, { asChild: !0, ...u, children: /* @__PURE__ */ m(
      Hu,
      {
        id: o.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": o.contentId,
        "data-state": rd(n.open),
        ...e,
        ref: Ne(t, o.onTriggerChange),
        onClick: (f) => {
          var p;
          (p = e.onClick) == null || p.call(e, f), !(e.disabled || f.defaultPrevented) && (f.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: T(
          e.onPointerMove,
          Nn((f) => {
            a.onItemEnter(f), !f.defaultPrevented && !e.disabled && !n.open && !s.current && (a.onPointerGraceIntentChange(null), s.current = window.setTimeout(() => {
              n.onOpenChange(!0), d();
            }, 100));
          })
        ),
        onPointerLeave: T(
          e.onPointerLeave,
          Nn((f) => {
            var h, b;
            d();
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
        onKeyDown: T(e.onKeyDown, (f) => {
          var h;
          const p = a.searchRef.current !== "";
          e.disabled || p && f.key === " " || N0[r.dir].includes(f.key) && (n.onOpenChange(!0), (h = n.content) == null || h.focus(), f.preventDefault());
        })
      }
    ) });
  }
);
ed.displayName = vn;
var td = "MenuSubContent", nd = l.forwardRef(
  (e, t) => {
    const n = Fu($e, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, a = wt($e, e.__scopeMenu), s = jn($e, e.__scopeMenu), i = Qu(td, e.__scopeMenu), c = l.useRef(null), u = q(t, c);
    return /* @__PURE__ */ m(En.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ m(ve, { present: r || a.open, children: /* @__PURE__ */ m(En.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ m(
      is,
      {
        id: i.contentId,
        "aria-labelledby": i.triggerId,
        ...o,
        ref: u,
        align: "start",
        side: s.dir === "rtl" ? "left" : "right",
        disableOutsidePointerEvents: !1,
        disableOutsideScroll: !1,
        trapFocus: !1,
        onOpenAutoFocus: (d) => {
          var f;
          s.isUsingKeyboardRef.current && ((f = c.current) == null || f.focus()), d.preventDefault();
        },
        onCloseAutoFocus: (d) => d.preventDefault(),
        onFocusOutside: T(e.onFocusOutside, (d) => {
          d.target !== i.trigger && a.onOpenChange(!1);
        }),
        onEscapeKeyDown: T(e.onEscapeKeyDown, (d) => {
          s.onClose(), d.preventDefault();
        }),
        onKeyDown: T(e.onKeyDown, (d) => {
          var h;
          const f = d.currentTarget.contains(d.target), p = P0[s.dir].includes(d.key);
          f && p && (a.onOpenChange(!1), (h = i.trigger) == null || h.focus(), d.preventDefault());
        })
      }
    ) }) }) });
  }
);
nd.displayName = td;
function rd(e) {
  return e ? "open" : "closed";
}
function Sr(e) {
  return e === "indeterminate";
}
function ds(e) {
  return Sr(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function G0(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function j0(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function U0(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((u) => u === t[0]) ? t[0] : t, a = n ? e.indexOf(n) : -1;
  let s = j0(e, Math.max(a, 0));
  o.length === 1 && (s = s.filter((u) => u !== n));
  const c = s.find(
    (u) => u.toLowerCase().startsWith(o.toLowerCase())
  );
  return c !== n ? c : void 0;
}
function K0(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let a = 0, s = t.length - 1; a < t.length; s = a++) {
    const i = t[a], c = t[s], u = i.x, d = i.y, f = c.x, p = c.y;
    d > r != p > r && n < (f - u) * (r - d) / (p - d) + u && (o = !o);
  }
  return o;
}
function q0(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return K0(n, t);
}
function Nn(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var X0 = Wu, Z0 = os, Q0 = Lu, J0 = Bu, eE = cs, tE = Vu, nE = Zr, rE = Yu, oE = Gu, aE = Uu, sE = qu, iE = Xu, cE = Zu, lE = Ju, uE = ed, dE = nd, Qr = "DropdownMenu", [fE] = ye(
  Qr,
  [Au]
), Ce = Au(), [mE, od] = fE(Qr), ad = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: r,
    open: o,
    defaultOpen: a,
    onOpenChange: s,
    modal: i = !0
  } = e, c = Ce(t), u = l.useRef(null), [d, f] = we({
    prop: o,
    defaultProp: a ?? !1,
    onChange: s,
    caller: Qr
  });
  return /* @__PURE__ */ m(
    mE,
    {
      scope: t,
      triggerId: he(),
      triggerRef: u,
      contentId: he(),
      open: d,
      onOpenChange: f,
      onOpenToggle: l.useCallback(() => f((p) => !p), [f]),
      modal: i,
      children: /* @__PURE__ */ m(X0, { ...c, open: d, onOpenChange: f, dir: r, modal: i, children: n })
    }
  );
};
ad.displayName = Qr;
var sd = "DropdownMenuTrigger", id = l.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e, a = od(sd, n), s = Ce(n);
    return /* @__PURE__ */ m(Z0, { asChild: !0, ...s, children: /* @__PURE__ */ m(
      F.button,
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
        ref: Ne(t, a.triggerRef),
        onPointerDown: T(e.onPointerDown, (i) => {
          !r && i.button === 0 && i.ctrlKey === !1 && (a.onOpenToggle(), a.open || i.preventDefault());
        }),
        onKeyDown: T(e.onKeyDown, (i) => {
          r || (["Enter", " "].includes(i.key) && a.onOpenToggle(), i.key === "ArrowDown" && a.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(i.key) && i.preventDefault());
        })
      }
    ) });
  }
);
id.displayName = sd;
var pE = "DropdownMenuPortal", cd = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, r = Ce(t);
  return /* @__PURE__ */ m(Q0, { ...r, ...n });
};
cd.displayName = pE;
var ld = "DropdownMenuContent", ud = l.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = od(ld, n), a = Ce(n), s = l.useRef(!1);
    return /* @__PURE__ */ m(
      J0,
      {
        id: o.contentId,
        "aria-labelledby": o.triggerId,
        ...a,
        ...r,
        ref: t,
        onCloseAutoFocus: T(e.onCloseAutoFocus, (i) => {
          var c;
          s.current || (c = o.triggerRef.current) == null || c.focus(), s.current = !1, i.preventDefault();
        }),
        onInteractOutside: T(e.onInteractOutside, (i) => {
          const c = i.detail.originalEvent, u = c.button === 0 && c.ctrlKey === !0, d = c.button === 2 || u;
          (!o.modal || d) && (s.current = !0);
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
ud.displayName = ld;
var hE = "DropdownMenuGroup", dd = l.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ce(n);
    return /* @__PURE__ */ m(eE, { ...o, ...r, ref: t });
  }
);
dd.displayName = hE;
var gE = "DropdownMenuLabel", fd = l.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ce(n);
    return /* @__PURE__ */ m(tE, { ...o, ...r, ref: t });
  }
);
fd.displayName = gE;
var vE = "DropdownMenuItem", md = l.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ce(n);
    return /* @__PURE__ */ m(nE, { ...o, ...r, ref: t });
  }
);
md.displayName = vE;
var bE = "DropdownMenuCheckboxItem", pd = l.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ce(n);
  return /* @__PURE__ */ m(rE, { ...o, ...r, ref: t });
});
pd.displayName = bE;
var yE = "DropdownMenuRadioGroup", hd = l.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ce(n);
  return /* @__PURE__ */ m(oE, { ...o, ...r, ref: t });
});
hd.displayName = yE;
var wE = "DropdownMenuRadioItem", gd = l.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ce(n);
  return /* @__PURE__ */ m(aE, { ...o, ...r, ref: t });
});
gd.displayName = wE;
var xE = "DropdownMenuItemIndicator", vd = l.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ce(n);
  return /* @__PURE__ */ m(sE, { ...o, ...r, ref: t });
});
vd.displayName = xE;
var SE = "DropdownMenuSeparator", bd = l.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ce(n);
  return /* @__PURE__ */ m(iE, { ...o, ...r, ref: t });
});
bd.displayName = SE;
var CE = "DropdownMenuArrow", EE = l.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ce(n);
    return /* @__PURE__ */ m(cE, { ...o, ...r, ref: t });
  }
);
EE.displayName = CE;
var NE = (e) => {
  const { __scopeDropdownMenu: t, children: n, open: r, onOpenChange: o, defaultOpen: a } = e, s = Ce(t), [i, c] = we({
    prop: r,
    defaultProp: a ?? !1,
    onChange: o,
    caller: "DropdownMenuSub"
  });
  return /* @__PURE__ */ m(lE, { ...s, open: i, onOpenChange: c, children: n });
}, PE = "DropdownMenuSubTrigger", yd = l.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ce(n);
  return /* @__PURE__ */ m(uE, { ...o, ...r, ref: t });
});
yd.displayName = PE;
var RE = "DropdownMenuSubContent", wd = l.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ce(n);
  return /* @__PURE__ */ m(
    dE,
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
wd.displayName = RE;
var kE = ad, ME = id, xd = cd, Sd = ud, TE = dd, Cd = fd, Ed = md, Nd = pd, _E = hd, Pd = gd, Rd = vd, kd = bd, DE = NE, Md = yd, Td = wd;
const yM = kE, wM = ME, xM = TE, SM = xd, CM = DE, EM = _E, OE = l.forwardRef(({ className: e, inset: t, children: n, ...r }, o) => /* @__PURE__ */ G(
  Md,
  {
    ref: o,
    className: P(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      t && "pl-8",
      e
    ),
    ...r,
    children: [
      n,
      /* @__PURE__ */ m(Dr, { className: "ml-auto" })
    ]
  }
));
OE.displayName = Md.displayName;
const AE = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  Td,
  {
    ref: n,
    className: P(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      e
    ),
    ...t
  }
));
AE.displayName = Td.displayName;
const IE = l.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ m(xd, { children: /* @__PURE__ */ m(
  Sd,
  {
    ref: r,
    sideOffset: t,
    className: P(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      e
    ),
    ...n
  }
) }));
IE.displayName = Sd.displayName;
const $E = l.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ m(
  Ed,
  {
    ref: r,
    className: P(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      t && "pl-8",
      e
    ),
    ...n
  }
));
$E.displayName = Ed.displayName;
const WE = l.forwardRef(({ className: e, children: t, checked: n, ...r }, o) => /* @__PURE__ */ G(
  Nd,
  {
    ref: o,
    className: P(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ m("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ m(Rd, { children: /* @__PURE__ */ m(Tr, { className: "h-4 w-4" }) }) }),
      t
    ]
  }
));
WE.displayName = Nd.displayName;
const FE = l.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ G(
  Pd,
  {
    ref: r,
    className: P(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ m("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ m(Rd, { children: /* @__PURE__ */ m(yc, { className: "h-2 w-2 fill-current" }) }) }),
      t
    ]
  }
));
FE.displayName = Pd.displayName;
const LE = l.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ m(
  Cd,
  {
    ref: r,
    className: P(
      "px-2 py-1.5 text-sm font-semibold",
      t && "pl-8",
      e
    ),
    ...n
  }
));
LE.displayName = Cd.displayName;
const BE = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  kd,
  {
    ref: n,
    className: P("-mx-1 my-1 h-px bg-muted", e),
    ...t
  }
));
BE.displayName = kd.displayName;
const VE = ({
  className: e,
  ...t
}) => /* @__PURE__ */ m(
  "span",
  {
    className: P("ml-auto text-xs tracking-widest opacity-60", e),
    ...t
  }
);
VE.displayName = "DropdownMenuShortcut";
var HE = (e) => e.type === "checkbox", bn = (e) => e instanceof Date, fs = (e) => e == null;
const _d = (e) => typeof e == "object";
var Ot = (e) => !fs(e) && !Array.isArray(e) && _d(e) && !bn(e), YE = (e) => Ot(e) && e.target ? HE(e.target) ? e.target.checked : e.target.value : e, zE = (e, t) => t.split(".").some((n, r, o) => !isNaN(Number(n)) && e.has(o.slice(0, r).join("."))), GE = (e) => {
  const t = e.constructor && e.constructor.prototype;
  return Ot(t) && t.hasOwnProperty("isPrototypeOf");
}, jE = typeof window < "u" && typeof window.HTMLElement < "u" && typeof document < "u";
function Dd(e) {
  if (e instanceof Date)
    return new Date(e);
  const t = typeof FileList < "u" && e instanceof FileList;
  if (jE && (e instanceof Blob || t))
    return e;
  const n = Array.isArray(e);
  if (!n && !(Ot(e) && GE(e)))
    return e;
  const r = n ? [] : Object.create(Object.getPrototypeOf(e));
  for (const o in e)
    Object.prototype.hasOwnProperty.call(e, o) && (r[o] = Dd(e[o]));
  return r;
}
var Od = (e) => /^\w*$/.test(e), sa = (e) => e === void 0, UE = (e) => Array.isArray(e) ? e.filter(Boolean) : [], Ad = (e) => UE(e.replace(/["|']|\]/g, "").split(/\.|\[/)), Pe = (e, t, n) => {
  if (!t || !Ot(e))
    return n;
  const r = (Od(t) ? [t] : Ad(t)).reduce((o, a) => fs(o) ? o : o[a], e);
  return sa(r) || r === e ? sa(e[t]) ? n : e[t] : r;
}, Ho = (e) => typeof e == "boolean", nr = (e) => typeof e == "function", Oi = (e, t, n) => {
  let r = -1;
  const o = Od(t) ? [t] : Ad(t), a = o.length, s = a - 1;
  for (; ++r < a; ) {
    const i = o[r];
    let c = n;
    if (r !== s) {
      const u = e[i];
      c = Ot(u) || Array.isArray(u) ? u : isNaN(+o[r + 1]) ? {} : [];
    }
    if (i === "__proto__" || i === "constructor" || i === "prototype")
      return;
    e[i] = c, e = e[i];
  }
};
const Ai = {
  BLUR: "blur",
  CHANGE: "change"
}, Ii = {
  all: "all"
}, ms = R.createContext(null);
ms.displayName = "HookFormControlContext";
const ps = () => R.useContext(ms);
var KE = (e, t, n, r = !0) => {
  const o = {
    defaultValues: t._defaultValues
  };
  for (const a in e)
    Object.defineProperty(o, a, {
      get: () => {
        const s = a;
        return t._proxyFormState[s] !== Ii.all && (t._proxyFormState[s] = !r || Ii.all), n && (n[s] = !0), e[s];
      }
    });
  return o;
};
const Id = typeof window < "u" ? R.useLayoutEffect : R.useEffect;
function qE(e) {
  const t = ps(), { control: n = t, disabled: r, name: o, exact: a } = e || {}, [s, i] = R.useState(n._formState), c = R.useRef({
    isDirty: !1,
    isLoading: !1,
    dirtyFields: !1,
    touchedFields: !1,
    validatingFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1
  });
  return Id(() => n._subscribe({
    name: o,
    formState: c.current,
    exact: a,
    callback: (u) => {
      !r && i({
        ...n._formState,
        ...u
      });
    }
  }), [o, r, a]), R.useEffect(() => {
    c.current.isValid && n._setValid(!0);
  }, [n]), R.useMemo(() => KE(s, n, c.current, !1), [s, n]);
}
var XE = (e) => typeof e == "string", $i = (e, t, n, r, o) => XE(e) ? Pe(n, e, o) : Array.isArray(e) ? e.map((a) => Pe(n, a)) : n, Wi = (e) => fs(e) || !_d(e);
function lr(e, t, n = /* @__PURE__ */ new WeakSet()) {
  if (Wi(e) || Wi(t))
    return Object.is(e, t);
  if (bn(e) && bn(t))
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
      if (bn(s) && bn(i) || (Ot(s) || Array.isArray(s)) && (Ot(i) || Array.isArray(i)) ? !lr(s, i, n) : !Object.is(s, i))
        return !1;
    }
  }
  return !0;
}
function ZE(e) {
  const t = ps(), { control: n = t, name: r, defaultValue: o, disabled: a, exact: s, compute: i } = e || {}, c = R.useRef(o), u = R.useRef(i), d = R.useRef(void 0), f = R.useRef(n), p = R.useRef(r);
  u.current = i;
  const [h, b] = R.useState(() => {
    const S = n._getWatch(r, c.current);
    return u.current ? u.current(S) : S;
  }), g = R.useCallback((S) => {
    const E = $i(r, n._names, S || n._formValues, !1, c.current);
    return u.current ? u.current(E) : E;
  }, [n._formValues, n._names, r]), v = R.useCallback((S) => {
    if (!a) {
      const E = $i(r, n._names, S || n._formValues, !1, c.current);
      if (u.current) {
        const C = u.current(E);
        lr(C, d.current) || (b(C), d.current = C);
      } else
        b(E);
    }
  }, [n._formValues, n._names, a, r]);
  Id(() => ((f.current !== n || !lr(p.current, r)) && (f.current = n, p.current = r, v()), n._subscribe({
    name: r,
    formState: {
      values: !0
    },
    exact: s,
    callback: (S) => {
      v(S.values);
    }
  })), [n, s, r, v]), R.useEffect(() => n._removeUnmounted());
  const w = f.current !== n, y = p.current, x = R.useMemo(() => {
    if (a)
      return null;
    const S = !w && !lr(y, r);
    return w || S ? g() : null;
  }, [a, w, r, y, g]);
  return x !== null ? x : h;
}
function QE(e) {
  const t = ps(), { name: n, disabled: r, control: o = t, shouldUnregister: a, defaultValue: s, exact: i = !0 } = e, c = zE(o._names.array, n), u = R.useMemo(() => Pe(o._formValues, n, Pe(o._defaultValues, n, s)), [o, n, s]), d = ZE({
    control: o,
    name: n,
    defaultValue: u,
    exact: i
  }), f = qE({
    control: o,
    name: n,
    exact: i
  }), p = R.useRef(e), h = R.useRef(void 0), b = R.useRef(o.register(n, {
    ...e.rules,
    value: d,
    ...Ho(e.disabled) ? { disabled: e.disabled } : {}
  }));
  p.current = e;
  const g = R.useMemo(() => Object.defineProperties({}, {
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
  }), [f, n]), v = R.useCallback((S) => b.current.onChange({
    target: {
      value: YE(S),
      name: n
    },
    type: Ai.CHANGE
  }), [n]), w = R.useCallback(() => b.current.onBlur({
    target: {
      value: Pe(o._formValues, n),
      name: n
    },
    type: Ai.BLUR
  }), [n, o._formValues]), y = R.useCallback((S) => {
    const E = Pe(o._fields, n);
    E && E._f && S && (E._f.ref = {
      focus: () => nr(S.focus) && S.focus(),
      select: () => nr(S.select) && S.select(),
      setCustomValidity: (C) => nr(S.setCustomValidity) && S.setCustomValidity(C),
      reportValidity: () => nr(S.reportValidity) && S.reportValidity()
    });
  }, [o._fields, n]), x = R.useMemo(() => ({
    name: n,
    value: d,
    ...Ho(r) || f.disabled ? { disabled: f.disabled || r } : {},
    onChange: v,
    onBlur: w,
    ref: y
  }), [n, r, f.disabled, v, w, y, d]);
  return R.useEffect(() => {
    const S = o._options.shouldUnregister || a, E = h.current;
    E && E !== n && !c && o.unregister(E), o.register(n, {
      ...p.current.rules,
      ...Ho(p.current.disabled) ? { disabled: p.current.disabled } : {}
    });
    const C = (N, M) => {
      const _ = Pe(o._fields, N);
      _ && _._f && (_._f.mount = M);
    };
    if (C(n, !0), S) {
      const N = Dd(Pe(o._options.defaultValues, n, p.current.defaultValue));
      Oi(o._defaultValues, n, N), sa(Pe(o._formValues, n)) && Oi(o._formValues, n, N);
    }
    return !c && o.register(n), h.current = n, () => {
      (c ? S && !o._state.action : S) ? o.unregister(n) : C(n, !1);
    };
  }, [n, o, c, a]), R.useEffect(() => {
    o._setDisabledField({
      disabled: r,
      name: n
    });
  }, [r, n, o]), R.useMemo(() => ({
    field: x,
    formState: f,
    fieldState: g
  }), [x, f, g]);
}
const JE = (e) => e.render(QE(e)), hs = R.createContext(null);
hs.displayName = "HookFormContext";
const eN = () => R.useContext(hs), tN = (e) => {
  const { children: t, watch: n, getValues: r, getFieldState: o, setError: a, clearErrors: s, setValue: i, trigger: c, formState: u, resetField: d, reset: f, handleSubmit: p, unregister: h, control: b, register: g, setFocus: v, subscribe: w } = e, y = R.useMemo(() => ({
    watch: n,
    getValues: r,
    getFieldState: o,
    setError: a,
    clearErrors: s,
    setValue: i,
    trigger: c,
    formState: u,
    resetField: d,
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
    u,
    o,
    r,
    p,
    g,
    f,
    d,
    a,
    v,
    i,
    w,
    c,
    h,
    n
  ]);
  return R.createElement(
    hs.Provider,
    { value: y },
    R.createElement(ms.Provider, { value: y.control }, t)
  );
};
var nN = [
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
], rN = nN.reduce((e, t) => {
  const n = /* @__PURE__ */ Mn(`Primitive.${t}`), r = l.forwardRef((o, a) => {
    const { asChild: s, ...i } = o, c = s ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ m(c, { ...i, ref: a });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {}), oN = "Label", $d = l.forwardRef((e, t) => /* @__PURE__ */ m(
  rN.label,
  {
    ...e,
    ref: t,
    onMouseDown: (n) => {
      var o;
      n.target.closest("button, input, select, textarea") || ((o = e.onMouseDown) == null || o.call(e, n), !n.defaultPrevented && n.detail > 1 && n.preventDefault());
    }
  }
));
$d.displayName = oN;
var Wd = $d;
const aN = ze(
  "text-body-sm font-medium text-content-primary leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-60"
), Fd = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(Wd, { ref: n, className: P(aN(), e), ...t }));
Fd.displayName = Wd.displayName;
const NM = tN, Ld = l.createContext({}), PM = ({
  ...e
}) => /* @__PURE__ */ m(Ld.Provider, { value: { name: e.name }, children: /* @__PURE__ */ m(JE, { ...e }) }), Jr = () => {
  const e = l.useContext(Ld), t = l.useContext(Bd), { getFieldState: n, formState: r } = eN(), o = n(e.name, r);
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
}, Bd = l.createContext({}), sN = l.forwardRef(
  ({ className: e, ...t }, n) => {
    const r = l.useId();
    return /* @__PURE__ */ m(Bd.Provider, { value: { id: r }, children: /* @__PURE__ */ m("div", { ref: n, className: P("space-y-1.5", e), ...t }) });
  }
);
sN.displayName = "FormItem";
const iN = l.forwardRef(({ className: e, ...t }, n) => {
  const { error: r, formItemId: o } = Jr();
  return /* @__PURE__ */ m(
    Fd,
    {
      ref: n,
      className: P(r && "text-feedback-danger", e),
      htmlFor: o,
      ...t
    }
  );
});
iN.displayName = "FormLabel";
const cN = l.forwardRef(({ ...e }, t) => {
  const { error: n, formItemId: r, formDescriptionId: o, formMessageId: a } = Jr();
  return /* @__PURE__ */ m(
    "div",
    {
      id: r,
      "aria-describedby": n ? `${o} ${a}` : o,
      "aria-invalid": !!n,
      ...e
    }
  );
});
cN.displayName = "FormControl";
const lN = l.forwardRef(({ className: e, ...t }, n) => {
  const { formDescriptionId: r } = Jr();
  return /* @__PURE__ */ m(
    "p",
    {
      ref: n,
      id: r,
      className: P("text-caption text-content-secondary", e),
      ...t
    }
  );
});
lN.displayName = "FormDescription";
const uN = l.forwardRef(({ className: e, children: t, ...n }, r) => {
  const { error: o, formMessageId: a } = Jr(), s = o ? String(o == null ? void 0 : o.message) : t;
  return s ? /* @__PURE__ */ m(
    "p",
    {
      ref: r,
      id: a,
      role: "alert",
      className: P("text-caption font-medium text-feedback-danger flex items-center gap-1", e),
      ...n,
      children: s
    }
  ) : null;
});
uN.displayName = "FormMessage";
const dN = l.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ m(
    "input",
    {
      type: t,
      className: P(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        e
      ),
      ref: r,
      ...n
    }
  )
);
dN.displayName = "Input";
const fN = ({ className: e, ...t }) => /* @__PURE__ */ m(
  "nav",
  {
    role: "navigation",
    "aria-label": "pagination",
    className: P("mx-auto flex w-full justify-center", e),
    ...t
  }
);
fN.displayName = "Pagination";
const mN = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  "ul",
  {
    ref: n,
    className: P("flex flex-row items-center gap-1", e),
    ...t
  }
));
mN.displayName = "PaginationContent";
const pN = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m("li", { ref: n, className: P("", e), ...t }));
pN.displayName = "PaginationItem";
const gs = ({
  className: e,
  isActive: t,
  size: n = "icon",
  ...r
}) => /* @__PURE__ */ m(
  "a",
  {
    "aria-current": t ? "page" : void 0,
    className: P(
      hr({
        variant: t ? "outline" : "ghost",
        size: n
      }),
      e
    ),
    ...r
  }
);
gs.displayName = "PaginationLink";
const hN = ({
  className: e,
  ...t
}) => /* @__PURE__ */ G(
  gs,
  {
    "aria-label": "Go to previous page",
    size: "default",
    className: P("gap-1 pl-2.5", e),
    ...t,
    children: [
      /* @__PURE__ */ m(bc, { className: "h-4 w-4" }),
      /* @__PURE__ */ m("span", { children: "Previous" })
    ]
  }
);
hN.displayName = "PaginationPrevious";
const gN = ({
  className: e,
  ...t
}) => /* @__PURE__ */ G(
  gs,
  {
    "aria-label": "Go to next page",
    size: "default",
    className: P("gap-1 pr-2.5", e),
    ...t,
    children: [
      /* @__PURE__ */ m("span", { children: "Next" }),
      /* @__PURE__ */ m(Dr, { className: "h-4 w-4" })
    ]
  }
);
gN.displayName = "PaginationNext";
const vN = ({
  className: e,
  ...t
}) => /* @__PURE__ */ G(
  "span",
  {
    "aria-hidden": !0,
    className: P("flex h-9 w-9 items-center justify-center", e),
    ...t,
    children: [
      /* @__PURE__ */ m(wc, { className: "h-4 w-4" }),
      /* @__PURE__ */ m("span", { className: "sr-only", children: "More pages" })
    ]
  }
);
vN.displayName = "PaginationEllipsis";
// @__NO_SIDE_EFFECTS__
function bN(e) {
  const t = /* @__PURE__ */ yN(e), n = l.forwardRef((r, o) => {
    const { children: a, ...s } = r, i = l.Children.toArray(a), c = i.find(xN);
    if (c) {
      const u = c.props.children, d = i.map((f) => f === c ? l.Children.count(u) > 1 ? l.Children.only(null) : l.isValidElement(u) ? u.props.children : null : f);
      return /* @__PURE__ */ m(t, { ...s, ref: o, children: l.isValidElement(u) ? l.cloneElement(u, void 0, d) : null });
    }
    return /* @__PURE__ */ m(t, { ...s, ref: o, children: a });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function yN(e) {
  const t = l.forwardRef((n, r) => {
    const { children: o, ...a } = n;
    if (l.isValidElement(o)) {
      const s = CN(o), i = SN(a, o.props);
      return o.type !== l.Fragment && (i.ref = r ? Ne(r, s) : s), l.cloneElement(o, i);
    }
    return l.Children.count(o) > 1 ? l.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var wN = Symbol("radix.slottable");
function xN(e) {
  return l.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === wN;
}
function SN(e, t) {
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
function CN(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var eo = "Popover", [Vd] = ye(eo, [
  yt
]), Un = yt(), [EN, xt] = Vd(eo), Hd = (e) => {
  const {
    __scopePopover: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    modal: s = !1
  } = e, i = Un(t), c = l.useRef(null), [u, d] = l.useState(!1), [f, p] = we({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: eo
  });
  return /* @__PURE__ */ m(Vn, { ...i, children: /* @__PURE__ */ m(
    EN,
    {
      scope: t,
      contentId: he(),
      triggerRef: c,
      open: f,
      onOpenChange: p,
      onOpenToggle: l.useCallback(() => p((h) => !h), [p]),
      hasCustomAnchor: u,
      onCustomAnchorAdd: l.useCallback(() => d(!0), []),
      onCustomAnchorRemove: l.useCallback(() => d(!1), []),
      modal: s,
      children: n
    }
  ) });
};
Hd.displayName = eo;
var Yd = "PopoverAnchor", NN = l.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = xt(Yd, n), a = Un(n), { onCustomAnchorAdd: s, onCustomAnchorRemove: i } = o;
    return l.useEffect(() => (s(), () => i()), [s, i]), /* @__PURE__ */ m(Hn, { ...a, ...r, ref: t });
  }
);
NN.displayName = Yd;
var zd = "PopoverTrigger", Gd = l.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = xt(zd, n), a = Un(n), s = q(t, o.triggerRef), i = /* @__PURE__ */ m(
      F.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": Xd(o.open),
        ...r,
        ref: s,
        onClick: T(e.onClick, o.onOpenToggle)
      }
    );
    return o.hasCustomAnchor ? i : /* @__PURE__ */ m(Hn, { asChild: !0, ...a, children: i });
  }
);
Gd.displayName = zd;
var vs = "PopoverPortal", [PN, RN] = Vd(vs, {
  forceMount: void 0
}), jd = (e) => {
  const { __scopePopover: t, forceMount: n, children: r, container: o } = e, a = xt(vs, t);
  return /* @__PURE__ */ m(PN, { scope: t, forceMount: n, children: /* @__PURE__ */ m(ve, { present: n || a.open, children: /* @__PURE__ */ m(Wt, { asChild: !0, container: o, children: r }) }) });
};
jd.displayName = vs;
var tn = "PopoverContent", Ud = l.forwardRef(
  (e, t) => {
    const n = RN(tn, e.__scopePopover), { forceMount: r = n.forceMount, ...o } = e, a = xt(tn, e.__scopePopover);
    return /* @__PURE__ */ m(ve, { present: r || a.open, children: a.modal ? /* @__PURE__ */ m(MN, { ...o, ref: t }) : /* @__PURE__ */ m(TN, { ...o, ref: t }) });
  }
);
Ud.displayName = tn;
var kN = /* @__PURE__ */ bN("PopoverContent.RemoveScroll"), MN = l.forwardRef(
  (e, t) => {
    const n = xt(tn, e.__scopePopover), r = l.useRef(null), o = q(t, r), a = l.useRef(!1);
    return l.useEffect(() => {
      const s = r.current;
      if (s) return Lr(s);
    }, []), /* @__PURE__ */ m($n, { as: kN, allowPinchZoom: !0, children: /* @__PURE__ */ m(
      Kd,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: T(e.onCloseAutoFocus, (s) => {
          var i;
          s.preventDefault(), a.current || (i = n.triggerRef.current) == null || i.focus();
        }),
        onPointerDownOutside: T(
          e.onPointerDownOutside,
          (s) => {
            const i = s.detail.originalEvent, c = i.button === 0 && i.ctrlKey === !0, u = i.button === 2 || c;
            a.current = u;
          },
          { checkForDefaultPrevented: !1 }
        ),
        onFocusOutside: T(
          e.onFocusOutside,
          (s) => s.preventDefault(),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
), TN = l.forwardRef(
  (e, t) => {
    const n = xt(tn, e.__scopePopover), r = l.useRef(!1), o = l.useRef(!1);
    return /* @__PURE__ */ m(
      Kd,
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
          var c, u;
          (c = e.onInteractOutside) == null || c.call(e, a), a.defaultPrevented || (r.current = !0, a.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const s = a.target;
          ((u = n.triggerRef.current) == null ? void 0 : u.contains(s)) && a.preventDefault(), a.detail.originalEvent.type === "focusin" && o.current && a.preventDefault();
        }
      }
    );
  }
), Kd = l.forwardRef(
  (e, t) => {
    const {
      __scopePopover: n,
      trapFocus: r,
      onOpenAutoFocus: o,
      onCloseAutoFocus: a,
      disableOutsidePointerEvents: s,
      onEscapeKeyDown: i,
      onPointerDownOutside: c,
      onFocusOutside: u,
      onInteractOutside: d,
      ...f
    } = e, p = xt(tn, n), h = Un(n);
    return Wr(), /* @__PURE__ */ m(
      In,
      {
        asChild: !0,
        loop: !0,
        trapped: r,
        onMountAutoFocus: o,
        onUnmountAutoFocus: a,
        children: /* @__PURE__ */ m(
          $t,
          {
            asChild: !0,
            disableOutsidePointerEvents: s,
            onInteractOutside: d,
            onEscapeKeyDown: i,
            onPointerDownOutside: c,
            onFocusOutside: u,
            onDismiss: () => p.onOpenChange(!1),
            children: /* @__PURE__ */ m(
              qr,
              {
                "data-state": Xd(p.open),
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
), qd = "PopoverClose", _N = l.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = xt(qd, n);
    return /* @__PURE__ */ m(
      F.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: T(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
_N.displayName = qd;
var DN = "PopoverArrow", ON = l.forwardRef(
  (e, t) => {
    const { __scopePopover: n, ...r } = e, o = Un(n);
    return /* @__PURE__ */ m(Xr, { ...o, ...r, ref: t });
  }
);
ON.displayName = DN;
function Xd(e) {
  return e ? "open" : "closed";
}
var AN = Hd, IN = Gd, $N = jd, Zd = Ud;
const Qd = AN, Jd = IN, bs = l.forwardRef(({ className: e, align: t = "center", sideOffset: n = 4, ...r }, o) => /* @__PURE__ */ m($N, { children: /* @__PURE__ */ m(
  Zd,
  {
    ref: o,
    align: t,
    sideOffset: n,
    className: P(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-popover-content-transform-origin]",
      e
    ),
    ...r
  }
) }));
bs.displayName = Zd.displayName;
function WN(e, t = []) {
  let n = [];
  function r(a, s) {
    const i = l.createContext(s);
    i.displayName = a + "Context";
    const c = n.length;
    n = [...n, s];
    const u = (f) => {
      var w;
      const { scope: p, children: h, ...b } = f, g = ((w = p == null ? void 0 : p[e]) == null ? void 0 : w[c]) || i, v = l.useMemo(() => b, Object.values(b));
      return /* @__PURE__ */ m(g.Provider, { value: v, children: h });
    };
    u.displayName = a + "Provider";
    function d(f, p) {
      var g;
      const h = ((g = p == null ? void 0 : p[e]) == null ? void 0 : g[c]) || i, b = l.useContext(h);
      if (b) return b;
      if (s !== void 0) return s;
      throw new Error(`\`${f}\` must be used within \`${a}\``);
    }
    return [u, d];
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
  return o.scopeName = e, [r, FN(o, ...t)];
}
function FN(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(a) {
      const s = r.reduce((i, { useScope: c, scopeName: u }) => {
        const f = c(a)[`__scope${u}`];
        return { ...i, ...f };
      }, {});
      return l.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
var LN = [
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
], ef = LN.reduce((e, t) => {
  const n = /* @__PURE__ */ Mn(`Primitive.${t}`), r = l.forwardRef((o, a) => {
    const { asChild: s, ...i } = o, c = s ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ m(c, { ...i, ref: a });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {}), ys = "Progress", ws = 100, [BN] = WN(ys), [VN, HN] = BN(ys), tf = l.forwardRef(
  (e, t) => {
    const {
      __scopeProgress: n,
      value: r = null,
      max: o,
      getValueLabel: a = YN,
      ...s
    } = e;
    (o || o === 0) && !Fi(o) && console.error(zN(`${o}`, "Progress"));
    const i = Fi(o) ? o : ws;
    r !== null && !Li(r, i) && console.error(GN(`${r}`, "Progress"));
    const c = Li(r, i) ? r : null, u = Cr(c) ? a(c, i) : void 0;
    return /* @__PURE__ */ m(VN, { scope: n, value: c, max: i, children: /* @__PURE__ */ m(
      ef.div,
      {
        "aria-valuemax": i,
        "aria-valuemin": 0,
        "aria-valuenow": Cr(c) ? c : void 0,
        "aria-valuetext": u,
        role: "progressbar",
        "data-state": of(c, i),
        "data-value": c ?? void 0,
        "data-max": i,
        ...s,
        ref: t
      }
    ) });
  }
);
tf.displayName = ys;
var nf = "ProgressIndicator", rf = l.forwardRef(
  (e, t) => {
    const { __scopeProgress: n, ...r } = e, o = HN(nf, n);
    return /* @__PURE__ */ m(
      ef.div,
      {
        "data-state": of(o.value, o.max),
        "data-value": o.value ?? void 0,
        "data-max": o.max,
        ...r,
        ref: t
      }
    );
  }
);
rf.displayName = nf;
function YN(e, t) {
  return `${Math.round(e / t * 100)}%`;
}
function of(e, t) {
  return e == null ? "indeterminate" : e === t ? "complete" : "loading";
}
function Cr(e) {
  return typeof e == "number";
}
function Fi(e) {
  return Cr(e) && !isNaN(e) && e > 0;
}
function Li(e, t) {
  return Cr(e) && !isNaN(e) && e <= t && e >= 0;
}
function zN(e, t) {
  return `Invalid prop \`max\` of value \`${e}\` supplied to \`${t}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${ws}\`.`;
}
function GN(e, t) {
  return `Invalid prop \`value\` of value \`${e}\` supplied to \`${t}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${ws} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var af = tf, jN = rf;
const UN = ze("relative w-full overflow-hidden rounded-full bg-border-subtle", {
  variants: {
    size: {
      sm: "h-1",
      default: "h-2",
      lg: "h-3"
    }
  },
  defaultVariants: { size: "default" }
}), KN = ze("h-full w-full flex-1 transition-all duration-slow ease-out", {
  variants: {
    intent: {
      default: "bg-primary",
      success: "bg-feedback-success",
      warning: "bg-feedback-warning",
      danger: "bg-feedback-danger"
    }
  },
  defaultVariants: { intent: "default" }
}), qN = l.forwardRef(
  ({ className: e, value: t, size: n, intent: r, ...o }, a) => /* @__PURE__ */ m(
    af,
    {
      ref: a,
      className: P(UN({ size: n }), e),
      ...o,
      children: /* @__PURE__ */ m(
        jN,
        {
          className: P(KN({ intent: r })),
          style: { transform: `translateX(-${100 - (t ?? 0)}%)` }
        }
      )
    }
  )
);
qN.displayName = af.displayName;
var xs = "Radio", [XN, sf] = ye(xs), [ZN, QN] = XN(xs), cf = l.forwardRef(
  (e, t) => {
    const {
      __scopeRadio: n,
      name: r,
      checked: o = !1,
      required: a,
      disabled: s,
      value: i = "on",
      onCheck: c,
      form: u,
      ...d
    } = e, [f, p] = l.useState(null), h = q(t, (v) => p(v)), b = l.useRef(!1), g = f ? u || !!f.closest("form") : !0;
    return /* @__PURE__ */ G(ZN, { scope: n, checked: o, disabled: s, children: [
      /* @__PURE__ */ m(
        F.button,
        {
          type: "button",
          role: "radio",
          "aria-checked": o,
          "data-state": ff(o),
          "data-disabled": s ? "" : void 0,
          disabled: s,
          value: i,
          ...d,
          ref: h,
          onClick: T(e.onClick, (v) => {
            o || c == null || c(), g && (b.current = v.isPropagationStopped(), b.current || v.stopPropagation());
          })
        }
      ),
      g && /* @__PURE__ */ m(
        df,
        {
          control: f,
          bubbles: !b.current,
          name: r,
          value: i,
          checked: o,
          required: a,
          disabled: s,
          form: u,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
cf.displayName = xs;
var lf = "RadioIndicator", uf = l.forwardRef(
  (e, t) => {
    const { __scopeRadio: n, forceMount: r, ...o } = e, a = QN(lf, n);
    return /* @__PURE__ */ m(ve, { present: r || a.checked, children: /* @__PURE__ */ m(
      F.span,
      {
        "data-state": ff(a.checked),
        "data-disabled": a.disabled ? "" : void 0,
        ...o,
        ref: t
      }
    ) });
  }
);
uf.displayName = lf;
var JN = "RadioBubbleInput", df = l.forwardRef(
  ({
    __scopeRadio: e,
    control: t,
    checked: n,
    bubbles: r = !0,
    ...o
  }, a) => {
    const s = l.useRef(null), i = q(s, a), c = On(n), u = An(t);
    return l.useEffect(() => {
      const d = s.current;
      if (!d) return;
      const f = window.HTMLInputElement.prototype, h = Object.getOwnPropertyDescriptor(
        f,
        "checked"
      ).set;
      if (c !== n && h) {
        const b = new Event("click", { bubbles: r });
        h.call(d, n), d.dispatchEvent(b);
      }
    }, [c, n, r]), /* @__PURE__ */ m(
      F.input,
      {
        type: "radio",
        "aria-hidden": !0,
        defaultChecked: n,
        ...o,
        tabIndex: -1,
        ref: i,
        style: {
          ...o.style,
          ...u,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
df.displayName = JN;
function ff(e) {
  return e ? "checked" : "unchecked";
}
var eP = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], to = "RadioGroup", [tP] = ye(to, [
  un,
  sf
]), mf = un(), pf = sf(), [nP, rP] = tP(to), hf = l.forwardRef(
  (e, t) => {
    const {
      __scopeRadioGroup: n,
      name: r,
      defaultValue: o,
      value: a,
      required: s = !1,
      disabled: i = !1,
      orientation: c,
      dir: u,
      loop: d = !0,
      onValueChange: f,
      ...p
    } = e, h = mf(n), b = bt(u), [g, v] = we({
      prop: a,
      defaultProp: o ?? null,
      onChange: f,
      caller: to
    });
    return /* @__PURE__ */ m(
      nP,
      {
        scope: n,
        name: r,
        required: s,
        disabled: i,
        value: g,
        onValueChange: v,
        children: /* @__PURE__ */ m(
          ns,
          {
            asChild: !0,
            ...h,
            orientation: c,
            dir: b,
            loop: d,
            children: /* @__PURE__ */ m(
              F.div,
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
hf.displayName = to;
var gf = "RadioGroupItem", vf = l.forwardRef(
  (e, t) => {
    const { __scopeRadioGroup: n, disabled: r, ...o } = e, a = rP(gf, n), s = a.disabled || r, i = mf(n), c = pf(n), u = l.useRef(null), d = q(t, u), f = a.value === o.value, p = l.useRef(!1);
    return l.useEffect(() => {
      const h = (g) => {
        eP.includes(g.key) && (p.current = !0);
      }, b = () => p.current = !1;
      return document.addEventListener("keydown", h), document.addEventListener("keyup", b), () => {
        document.removeEventListener("keydown", h), document.removeEventListener("keyup", b);
      };
    }, []), /* @__PURE__ */ m(
      rs,
      {
        asChild: !0,
        ...i,
        focusable: !s,
        active: f,
        children: /* @__PURE__ */ m(
          cf,
          {
            disabled: s,
            required: a.required,
            checked: f,
            ...c,
            ...o,
            name: a.name,
            ref: d,
            onCheck: () => a.onValueChange(o.value),
            onKeyDown: T((h) => {
              h.key === "Enter" && h.preventDefault();
            }),
            onFocus: T(o.onFocus, () => {
              var h;
              p.current && ((h = u.current) == null || h.click());
            })
          }
        )
      }
    );
  }
);
vf.displayName = gf;
var oP = "RadioGroupIndicator", bf = l.forwardRef(
  (e, t) => {
    const { __scopeRadioGroup: n, ...r } = e, o = pf(n);
    return /* @__PURE__ */ m(uf, { ...o, ...r, ref: t });
  }
);
bf.displayName = oP;
var yf = hf, wf = vf, aP = bf;
const sP = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(yf, { className: P("grid gap-2", e), ...t, ref: n }));
sP.displayName = yf.displayName;
const iP = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  wf,
  {
    ref: n,
    className: P(
      "aspect-square h-4 w-4 rounded-full border border-border-strong",
      "bg-surface-raised ring-offset-background",
      "transition-colors duration-fast",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:border-primary data-[state=checked]:text-primary",
      e
    ),
    ...t,
    children: /* @__PURE__ */ m(aP, { className: "flex items-center justify-center", children: /* @__PURE__ */ m(yc, { className: "h-2 w-2 fill-current text-primary" }) })
  }
));
iP.displayName = wf.displayName;
function Pn(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
function cP(e, t) {
  return l.useReducer((n, r) => t[n][r] ?? n, e);
}
var Ss = "ScrollArea", [xf] = ye(Ss), [lP, We] = xf(Ss), Sf = l.forwardRef(
  (e, t) => {
    const {
      __scopeScrollArea: n,
      type: r = "hover",
      dir: o,
      scrollHideDelay: a = 600,
      ...s
    } = e, [i, c] = l.useState(null), [u, d] = l.useState(null), [f, p] = l.useState(null), [h, b] = l.useState(null), [g, v] = l.useState(null), [w, y] = l.useState(0), [x, S] = l.useState(0), [E, C] = l.useState(!1), [N, M] = l.useState(!1), _ = q(t, ($) => c($)), O = bt(o);
    return /* @__PURE__ */ m(
      lP,
      {
        scope: n,
        type: r,
        dir: O,
        scrollHideDelay: a,
        scrollArea: i,
        viewport: u,
        onViewportChange: d,
        content: f,
        onContentChange: p,
        scrollbarX: h,
        onScrollbarXChange: b,
        scrollbarXEnabled: E,
        onScrollbarXEnabledChange: C,
        scrollbarY: g,
        onScrollbarYChange: v,
        scrollbarYEnabled: N,
        onScrollbarYEnabledChange: M,
        onCornerWidthChange: y,
        onCornerHeightChange: S,
        children: /* @__PURE__ */ m(
          F.div,
          {
            dir: O,
            ...s,
            ref: _,
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
Sf.displayName = Ss;
var Cf = "ScrollAreaViewport", Ef = l.forwardRef(
  (e, t) => {
    const { __scopeScrollArea: n, children: r, nonce: o, ...a } = e, s = We(Cf, n), i = l.useRef(null), c = q(t, i, s.onViewportChange);
    return /* @__PURE__ */ G(Je, { children: [
      /* @__PURE__ */ m(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: o
        }
      ),
      /* @__PURE__ */ m(
        F.div,
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
          children: /* @__PURE__ */ m("div", { ref: s.onContentChange, style: { minWidth: "100%", display: "table" }, children: r })
        }
      )
    ] });
  }
);
Ef.displayName = Cf;
var nt = "ScrollAreaScrollbar", Cs = l.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = We(nt, e.__scopeScrollArea), { onScrollbarXEnabledChange: a, onScrollbarYEnabledChange: s } = o, i = e.orientation === "horizontal";
    return l.useEffect(() => (i ? a(!0) : s(!0), () => {
      i ? a(!1) : s(!1);
    }), [i, a, s]), o.type === "hover" ? /* @__PURE__ */ m(uP, { ...r, ref: t, forceMount: n }) : o.type === "scroll" ? /* @__PURE__ */ m(dP, { ...r, ref: t, forceMount: n }) : o.type === "auto" ? /* @__PURE__ */ m(Nf, { ...r, ref: t, forceMount: n }) : o.type === "always" ? /* @__PURE__ */ m(Es, { ...r, ref: t }) : null;
  }
);
Cs.displayName = nt;
var uP = l.forwardRef((e, t) => {
  const { forceMount: n, ...r } = e, o = We(nt, e.__scopeScrollArea), [a, s] = l.useState(!1);
  return l.useEffect(() => {
    const i = o.scrollArea;
    let c = 0;
    if (i) {
      const u = () => {
        window.clearTimeout(c), s(!0);
      }, d = () => {
        c = window.setTimeout(() => s(!1), o.scrollHideDelay);
      };
      return i.addEventListener("pointerenter", u), i.addEventListener("pointerleave", d), () => {
        window.clearTimeout(c), i.removeEventListener("pointerenter", u), i.removeEventListener("pointerleave", d);
      };
    }
  }, [o.scrollArea, o.scrollHideDelay]), /* @__PURE__ */ m(ve, { present: n || a, children: /* @__PURE__ */ m(
    Nf,
    {
      "data-state": a ? "visible" : "hidden",
      ...r,
      ref: t
    }
  ) });
}), dP = l.forwardRef((e, t) => {
  const { forceMount: n, ...r } = e, o = We(nt, e.__scopeScrollArea), a = e.orientation === "horizontal", s = ro(() => c("SCROLL_END"), 100), [i, c] = cP("hidden", {
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
      const u = window.setTimeout(() => c("HIDE"), o.scrollHideDelay);
      return () => window.clearTimeout(u);
    }
  }, [i, o.scrollHideDelay, c]), l.useEffect(() => {
    const u = o.viewport, d = a ? "scrollLeft" : "scrollTop";
    if (u) {
      let f = u[d];
      const p = () => {
        const h = u[d];
        f !== h && (c("SCROLL"), s()), f = h;
      };
      return u.addEventListener("scroll", p), () => u.removeEventListener("scroll", p);
    }
  }, [o.viewport, a, c, s]), /* @__PURE__ */ m(ve, { present: n || i !== "hidden", children: /* @__PURE__ */ m(
    Es,
    {
      "data-state": i === "hidden" ? "hidden" : "visible",
      ...r,
      ref: t,
      onPointerEnter: T(e.onPointerEnter, () => c("POINTER_ENTER")),
      onPointerLeave: T(e.onPointerLeave, () => c("POINTER_LEAVE"))
    }
  ) });
}), Nf = l.forwardRef((e, t) => {
  const n = We(nt, e.__scopeScrollArea), { forceMount: r, ...o } = e, [a, s] = l.useState(!1), i = e.orientation === "horizontal", c = ro(() => {
    if (n.viewport) {
      const u = n.viewport.offsetWidth < n.viewport.scrollWidth, d = n.viewport.offsetHeight < n.viewport.scrollHeight;
      s(i ? u : d);
    }
  }, 10);
  return nn(n.viewport, c), nn(n.content, c), /* @__PURE__ */ m(ve, { present: r || a, children: /* @__PURE__ */ m(
    Es,
    {
      "data-state": a ? "visible" : "hidden",
      ...o,
      ref: t
    }
  ) });
}), Es = l.forwardRef((e, t) => {
  const { orientation: n = "vertical", ...r } = e, o = We(nt, e.__scopeScrollArea), a = l.useRef(null), s = l.useRef(0), [i, c] = l.useState({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  }), u = Tf(i.viewport, i.content), d = {
    ...r,
    sizes: i,
    onSizesChange: c,
    hasThumb: u > 0 && u < 1,
    onThumbChange: (p) => a.current = p,
    onThumbPointerUp: () => s.current = 0,
    onThumbPointerDown: (p) => s.current = p
  };
  function f(p, h) {
    return vP(p, s.current, i, h);
  }
  return n === "horizontal" ? /* @__PURE__ */ m(
    fP,
    {
      ...d,
      ref: t,
      onThumbPositionChange: () => {
        if (o.viewport && a.current) {
          const p = o.viewport.scrollLeft, h = Bi(p, i, o.dir);
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
  ) : n === "vertical" ? /* @__PURE__ */ m(
    mP,
    {
      ...d,
      ref: t,
      onThumbPositionChange: () => {
        if (o.viewport && a.current) {
          const p = o.viewport.scrollTop, h = Bi(p, i);
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
}), fP = l.forwardRef((e, t) => {
  const { sizes: n, onSizesChange: r, ...o } = e, a = We(nt, e.__scopeScrollArea), [s, i] = l.useState(), c = l.useRef(null), u = q(t, c, a.onScrollbarXChange);
  return l.useEffect(() => {
    c.current && i(getComputedStyle(c.current));
  }, [c]), /* @__PURE__ */ m(
    Rf,
    {
      "data-orientation": "horizontal",
      ...o,
      ref: u,
      sizes: n,
      style: {
        bottom: 0,
        left: a.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: a.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        "--radix-scroll-area-thumb-width": no(n) + "px",
        ...e.style
      },
      onThumbPointerDown: (d) => e.onThumbPointerDown(d.x),
      onDragScroll: (d) => e.onDragScroll(d.x),
      onWheelScroll: (d, f) => {
        if (a.viewport) {
          const p = a.viewport.scrollLeft + d.deltaX;
          e.onWheelScroll(p), Df(p, f) && d.preventDefault();
        }
      },
      onResize: () => {
        c.current && a.viewport && s && r({
          content: a.viewport.scrollWidth,
          viewport: a.viewport.offsetWidth,
          scrollbar: {
            size: c.current.clientWidth,
            paddingStart: Nr(s.paddingLeft),
            paddingEnd: Nr(s.paddingRight)
          }
        });
      }
    }
  );
}), mP = l.forwardRef((e, t) => {
  const { sizes: n, onSizesChange: r, ...o } = e, a = We(nt, e.__scopeScrollArea), [s, i] = l.useState(), c = l.useRef(null), u = q(t, c, a.onScrollbarYChange);
  return l.useEffect(() => {
    c.current && i(getComputedStyle(c.current));
  }, [c]), /* @__PURE__ */ m(
    Rf,
    {
      "data-orientation": "vertical",
      ...o,
      ref: u,
      sizes: n,
      style: {
        top: 0,
        right: a.dir === "ltr" ? 0 : void 0,
        left: a.dir === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        "--radix-scroll-area-thumb-height": no(n) + "px",
        ...e.style
      },
      onThumbPointerDown: (d) => e.onThumbPointerDown(d.y),
      onDragScroll: (d) => e.onDragScroll(d.y),
      onWheelScroll: (d, f) => {
        if (a.viewport) {
          const p = a.viewport.scrollTop + d.deltaY;
          e.onWheelScroll(p), Df(p, f) && d.preventDefault();
        }
      },
      onResize: () => {
        c.current && a.viewport && s && r({
          content: a.viewport.scrollHeight,
          viewport: a.viewport.offsetHeight,
          scrollbar: {
            size: c.current.clientHeight,
            paddingStart: Nr(s.paddingTop),
            paddingEnd: Nr(s.paddingBottom)
          }
        });
      }
    }
  );
}), [pP, Pf] = xf(nt), Rf = l.forwardRef((e, t) => {
  const {
    __scopeScrollArea: n,
    sizes: r,
    hasThumb: o,
    onThumbChange: a,
    onThumbPointerUp: s,
    onThumbPointerDown: i,
    onThumbPositionChange: c,
    onDragScroll: u,
    onWheelScroll: d,
    onResize: f,
    ...p
  } = e, h = We(nt, n), [b, g] = l.useState(null), v = q(t, (_) => g(_)), w = l.useRef(null), y = l.useRef(""), x = h.viewport, S = r.content - r.viewport, E = pe(d), C = pe(c), N = ro(f, 10);
  function M(_) {
    if (w.current) {
      const O = _.clientX - w.current.left, $ = _.clientY - w.current.top;
      u({ x: O, y: $ });
    }
  }
  return l.useEffect(() => {
    const _ = (O) => {
      const $ = O.target;
      (b == null ? void 0 : b.contains($)) && E(O, S);
    };
    return document.addEventListener("wheel", _, { passive: !1 }), () => document.removeEventListener("wheel", _, { passive: !1 });
  }, [x, b, S, E]), l.useEffect(C, [r, C]), nn(b, N), nn(h.content, N), /* @__PURE__ */ m(
    pP,
    {
      scope: n,
      scrollbar: b,
      hasThumb: o,
      onThumbChange: pe(a),
      onThumbPointerUp: pe(s),
      onThumbPositionChange: C,
      onThumbPointerDown: pe(i),
      children: /* @__PURE__ */ m(
        F.div,
        {
          ...p,
          ref: v,
          style: { position: "absolute", ...p.style },
          onPointerDown: T(e.onPointerDown, (_) => {
            _.button === 0 && (_.target.setPointerCapture(_.pointerId), w.current = b.getBoundingClientRect(), y.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", h.viewport && (h.viewport.style.scrollBehavior = "auto"), M(_));
          }),
          onPointerMove: T(e.onPointerMove, M),
          onPointerUp: T(e.onPointerUp, (_) => {
            const O = _.target;
            O.hasPointerCapture(_.pointerId) && O.releasePointerCapture(_.pointerId), document.body.style.webkitUserSelect = y.current, h.viewport && (h.viewport.style.scrollBehavior = ""), w.current = null;
          })
        }
      )
    }
  );
}), Er = "ScrollAreaThumb", kf = l.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = Pf(Er, e.__scopeScrollArea);
    return /* @__PURE__ */ m(ve, { present: n || o.hasThumb, children: /* @__PURE__ */ m(hP, { ref: t, ...r }) });
  }
), hP = l.forwardRef(
  (e, t) => {
    const { __scopeScrollArea: n, style: r, ...o } = e, a = We(Er, n), s = Pf(Er, n), { onThumbPositionChange: i } = s, c = q(
      t,
      (f) => s.onThumbChange(f)
    ), u = l.useRef(void 0), d = ro(() => {
      u.current && (u.current(), u.current = void 0);
    }, 100);
    return l.useEffect(() => {
      const f = a.viewport;
      if (f) {
        const p = () => {
          if (d(), !u.current) {
            const h = bP(f, i);
            u.current = h, i();
          }
        };
        return i(), f.addEventListener("scroll", p), () => f.removeEventListener("scroll", p);
      }
    }, [a.viewport, d, i]), /* @__PURE__ */ m(
      F.div,
      {
        "data-state": s.hasThumb ? "visible" : "hidden",
        ...o,
        ref: c,
        style: {
          width: "var(--radix-scroll-area-thumb-width)",
          height: "var(--radix-scroll-area-thumb-height)",
          ...r
        },
        onPointerDownCapture: T(e.onPointerDownCapture, (f) => {
          const h = f.target.getBoundingClientRect(), b = f.clientX - h.left, g = f.clientY - h.top;
          s.onThumbPointerDown({ x: b, y: g });
        }),
        onPointerUp: T(e.onPointerUp, s.onThumbPointerUp)
      }
    );
  }
);
kf.displayName = Er;
var Ns = "ScrollAreaCorner", Mf = l.forwardRef(
  (e, t) => {
    const n = We(Ns, e.__scopeScrollArea), r = !!(n.scrollbarX && n.scrollbarY);
    return n.type !== "scroll" && r ? /* @__PURE__ */ m(gP, { ...e, ref: t }) : null;
  }
);
Mf.displayName = Ns;
var gP = l.forwardRef((e, t) => {
  const { __scopeScrollArea: n, ...r } = e, o = We(Ns, n), [a, s] = l.useState(0), [i, c] = l.useState(0), u = !!(a && i);
  return nn(o.scrollbarX, () => {
    var f;
    const d = ((f = o.scrollbarX) == null ? void 0 : f.offsetHeight) || 0;
    o.onCornerHeightChange(d), c(d);
  }), nn(o.scrollbarY, () => {
    var f;
    const d = ((f = o.scrollbarY) == null ? void 0 : f.offsetWidth) || 0;
    o.onCornerWidthChange(d), s(d);
  }), u ? /* @__PURE__ */ m(
    F.div,
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
function Nr(e) {
  return e ? parseInt(e, 10) : 0;
}
function Tf(e, t) {
  const n = e / t;
  return isNaN(n) ? 0 : n;
}
function no(e) {
  const t = Tf(e.viewport, e.content), n = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, r = (e.scrollbar.size - n) * t;
  return Math.max(r, 18);
}
function vP(e, t, n, r = "ltr") {
  const o = no(n), a = o / 2, s = t || a, i = o - s, c = n.scrollbar.paddingStart + s, u = n.scrollbar.size - n.scrollbar.paddingEnd - i, d = n.content - n.viewport, f = r === "ltr" ? [0, d] : [d * -1, 0];
  return _f([c, u], f)(e);
}
function Bi(e, t, n = "ltr") {
  const r = no(t), o = t.scrollbar.paddingStart + t.scrollbar.paddingEnd, a = t.scrollbar.size - o, s = t.content - t.viewport, i = a - r, c = n === "ltr" ? [0, s] : [s * -1, 0], u = Pn(e, c);
  return _f([0, s], [0, i])(u);
}
function _f(e, t) {
  return (n) => {
    if (e[0] === e[1] || t[0] === t[1]) return t[0];
    const r = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + r * (n - e[0]);
  };
}
function Df(e, t) {
  return e > 0 && e < t;
}
var bP = (e, t = () => {
}) => {
  let n = { left: e.scrollLeft, top: e.scrollTop }, r = 0;
  return function o() {
    const a = { left: e.scrollLeft, top: e.scrollTop }, s = n.left !== a.left, i = n.top !== a.top;
    (s || i) && t(), n = a, r = window.requestAnimationFrame(o);
  }(), () => window.cancelAnimationFrame(r);
};
function ro(e, t) {
  const n = pe(e), r = l.useRef(0);
  return l.useEffect(() => () => window.clearTimeout(r.current), []), l.useCallback(() => {
    window.clearTimeout(r.current), r.current = window.setTimeout(n, t);
  }, [n, t]);
}
function nn(e, t) {
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
var Of = Sf, yP = Ef, wP = Mf;
const xP = l.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ G(
  Of,
  {
    ref: r,
    className: P("relative overflow-hidden", e),
    ...n,
    children: [
      /* @__PURE__ */ m(yP, { className: "h-full w-full rounded-[inherit]", children: t }),
      /* @__PURE__ */ m(Af, {}),
      /* @__PURE__ */ m(wP, {})
    ]
  }
));
xP.displayName = Of.displayName;
const Af = l.forwardRef(({ className: e, orientation: t = "vertical", ...n }, r) => /* @__PURE__ */ m(
  Cs,
  {
    ref: r,
    orientation: t,
    className: P(
      "flex touch-none select-none transition-colors",
      t === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      t === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      e
    ),
    ...n,
    children: /* @__PURE__ */ m(kf, { className: "relative flex-1 rounded-full bg-border-strong" })
  }
));
Af.displayName = Cs.displayName;
// @__NO_SIDE_EFFECTS__
function SP(e) {
  const t = /* @__PURE__ */ CP(e), n = l.forwardRef((r, o) => {
    const { children: a, ...s } = r, i = l.Children.toArray(a), c = i.find(NP);
    if (c) {
      const u = c.props.children, d = i.map((f) => f === c ? l.Children.count(u) > 1 ? l.Children.only(null) : l.isValidElement(u) ? u.props.children : null : f);
      return /* @__PURE__ */ m(t, { ...s, ref: o, children: l.isValidElement(u) ? l.cloneElement(u, void 0, d) : null });
    }
    return /* @__PURE__ */ m(t, { ...s, ref: o, children: a });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function CP(e) {
  const t = l.forwardRef((n, r) => {
    const { children: o, ...a } = n;
    if (l.isValidElement(o)) {
      const s = RP(o), i = PP(a, o.props);
      return o.type !== l.Fragment && (i.ref = r ? Ne(r, s) : s), l.cloneElement(o, i);
    }
    return l.Children.count(o) > 1 ? l.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var EP = Symbol("radix.slottable");
function NP(e) {
  return l.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === EP;
}
function PP(e, t) {
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
function RP(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var If = Object.freeze({
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
}), kP = "VisuallyHidden", oo = l.forwardRef(
  (e, t) => /* @__PURE__ */ m(
    F.span,
    {
      ...e,
      ref: t,
      style: { ...If, ...e.style }
    }
  )
);
oo.displayName = kP;
var MP = oo, TP = [" ", "Enter", "ArrowUp", "ArrowDown"], _P = [" ", "Enter"], At = "Select", [ao, so, DP] = an(At), [dn] = ye(At, [
  DP,
  yt
]), io = yt(), [OP, St] = dn(At), [AP, IP] = dn(At), $f = (e) => {
  const {
    __scopeSelect: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    value: s,
    defaultValue: i,
    onValueChange: c,
    dir: u,
    name: d,
    autoComplete: f,
    disabled: p,
    required: h,
    form: b
  } = e, g = io(t), [v, w] = l.useState(null), [y, x] = l.useState(null), [S, E] = l.useState(!1), C = bt(u), [N, M] = we({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: At
  }), [_, O] = we({
    prop: s,
    defaultProp: i,
    onChange: c,
    caller: At
  }), $ = l.useRef(null), I = v ? b || !!v.closest("form") : !0, [Y, D] = l.useState(/* @__PURE__ */ new Set()), z = Array.from(Y).map((B) => B.props.value).join(";");
  return /* @__PURE__ */ m(Vn, { ...g, children: /* @__PURE__ */ G(
    OP,
    {
      required: h,
      scope: t,
      trigger: v,
      onTriggerChange: w,
      valueNode: y,
      onValueNodeChange: x,
      valueNodeHasChildren: S,
      onValueNodeHasChildrenChange: E,
      contentId: he(),
      value: _,
      onValueChange: O,
      open: N,
      onOpenChange: M,
      dir: C,
      triggerPointerDownPosRef: $,
      disabled: p,
      children: [
        /* @__PURE__ */ m(ao.Provider, { scope: t, children: /* @__PURE__ */ m(
          AP,
          {
            scope: e.__scopeSelect,
            onNativeOptionAdd: l.useCallback((B) => {
              D((j) => new Set(j).add(B));
            }, []),
            onNativeOptionRemove: l.useCallback((B) => {
              D((j) => {
                const L = new Set(j);
                return L.delete(B), L;
              });
            }, []),
            children: n
          }
        ) }),
        I ? /* @__PURE__ */ G(
          im,
          {
            "aria-hidden": !0,
            required: h,
            tabIndex: -1,
            name: d,
            autoComplete: f,
            value: _,
            onChange: (B) => O(B.target.value),
            disabled: p,
            form: b,
            children: [
              _ === void 0 ? /* @__PURE__ */ m("option", { value: "" }) : null,
              Array.from(Y)
            ]
          },
          z
        ) : null
      ]
    }
  ) });
};
$f.displayName = At;
var Wf = "SelectTrigger", Ff = l.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, disabled: r = !1, ...o } = e, a = io(n), s = St(Wf, n), i = s.disabled || r, c = q(t, s.onTriggerChange), u = so(n), d = l.useRef("touch"), [f, p, h] = lm((g) => {
      const v = u().filter((x) => !x.disabled), w = v.find((x) => x.value === s.value), y = um(v, g, w);
      y !== void 0 && s.onValueChange(y.value);
    }), b = (g) => {
      i || (s.onOpenChange(!0), h()), g && (s.triggerPointerDownPosRef.current = {
        x: Math.round(g.pageX),
        y: Math.round(g.pageY)
      });
    };
    return /* @__PURE__ */ m(Hn, { asChild: !0, ...a, children: /* @__PURE__ */ m(
      F.button,
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
        "data-placeholder": cm(s.value) ? "" : void 0,
        ...o,
        ref: c,
        onClick: T(o.onClick, (g) => {
          g.currentTarget.focus(), d.current !== "mouse" && b(g);
        }),
        onPointerDown: T(o.onPointerDown, (g) => {
          d.current = g.pointerType;
          const v = g.target;
          v.hasPointerCapture(g.pointerId) && v.releasePointerCapture(g.pointerId), g.button === 0 && g.ctrlKey === !1 && g.pointerType === "mouse" && (b(g), g.preventDefault());
        }),
        onKeyDown: T(o.onKeyDown, (g) => {
          const v = f.current !== "";
          !(g.ctrlKey || g.altKey || g.metaKey) && g.key.length === 1 && p(g.key), !(v && g.key === " ") && TP.includes(g.key) && (b(), g.preventDefault());
        })
      }
    ) });
  }
);
Ff.displayName = Wf;
var Lf = "SelectValue", Bf = l.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: r, style: o, children: a, placeholder: s = "", ...i } = e, c = St(Lf, n), { onValueNodeHasChildrenChange: u } = c, d = a !== void 0, f = q(t, c.onValueNodeChange);
    return ge(() => {
      u(d);
    }, [u, d]), /* @__PURE__ */ m(
      F.span,
      {
        ...i,
        ref: f,
        style: { pointerEvents: "none" },
        children: cm(c.value) ? /* @__PURE__ */ m(Je, { children: s }) : a
      }
    );
  }
);
Bf.displayName = Lf;
var $P = "SelectIcon", Vf = l.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, children: r, ...o } = e;
    return /* @__PURE__ */ m(F.span, { "aria-hidden": !0, ...o, ref: t, children: r || "▼" });
  }
);
Vf.displayName = $P;
var WP = "SelectPortal", Hf = (e) => /* @__PURE__ */ m(Wt, { asChild: !0, ...e });
Hf.displayName = WP;
var It = "SelectContent", Yf = l.forwardRef(
  (e, t) => {
    const n = St(It, e.__scopeSelect), [r, o] = l.useState();
    if (ge(() => {
      o(new DocumentFragment());
    }, []), !n.open) {
      const a = r;
      return a ? kn.createPortal(
        /* @__PURE__ */ m(zf, { scope: e.__scopeSelect, children: /* @__PURE__ */ m(ao.Slot, { scope: e.__scopeSelect, children: /* @__PURE__ */ m("div", { children: e.children }) }) }),
        a
      ) : null;
    }
    return /* @__PURE__ */ m(Gf, { ...e, ref: t });
  }
);
Yf.displayName = It;
var Le = 10, [zf, Ct] = dn(It), FP = "SelectContentImpl", LP = /* @__PURE__ */ SP("SelectContent.RemoveScroll"), Gf = l.forwardRef(
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
      align: u,
      alignOffset: d,
      arrowPadding: f,
      collisionBoundary: p,
      collisionPadding: h,
      sticky: b,
      hideWhenDetached: g,
      avoidCollisions: v,
      //
      ...w
    } = e, y = St(It, n), [x, S] = l.useState(null), [E, C] = l.useState(null), N = q(t, (W) => S(W)), [M, _] = l.useState(null), [O, $] = l.useState(
      null
    ), I = so(n), [Y, D] = l.useState(!1), z = l.useRef(!1);
    l.useEffect(() => {
      if (x) return Lr(x);
    }, [x]), Wr();
    const B = l.useCallback(
      (W) => {
        const [te, ...J] = I().map((ce) => ce.ref.current), [oe] = J.slice(-1), ie = document.activeElement;
        for (const ce of W)
          if (ce === ie || (ce == null || ce.scrollIntoView({ block: "nearest" }), ce === te && E && (E.scrollTop = 0), ce === oe && E && (E.scrollTop = E.scrollHeight), ce == null || ce.focus(), document.activeElement !== ie)) return;
      },
      [I, E]
    ), j = l.useCallback(
      () => B([M, x]),
      [B, M, x]
    );
    l.useEffect(() => {
      Y && j();
    }, [Y, j]);
    const { onOpenChange: L, triggerPointerDownPosRef: A } = y;
    l.useEffect(() => {
      if (x) {
        let W = { x: 0, y: 0 };
        const te = (oe) => {
          var ie, ce;
          W = {
            x: Math.abs(Math.round(oe.pageX) - (((ie = A.current) == null ? void 0 : ie.x) ?? 0)),
            y: Math.abs(Math.round(oe.pageY) - (((ce = A.current) == null ? void 0 : ce.y) ?? 0))
          };
        }, J = (oe) => {
          W.x <= 10 && W.y <= 10 ? oe.preventDefault() : x.contains(oe.target) || L(!1), document.removeEventListener("pointermove", te), A.current = null;
        };
        return A.current !== null && (document.addEventListener("pointermove", te), document.addEventListener("pointerup", J, { capture: !0, once: !0 })), () => {
          document.removeEventListener("pointermove", te), document.removeEventListener("pointerup", J, { capture: !0 });
        };
      }
    }, [x, L, A]), l.useEffect(() => {
      const W = () => L(!1);
      return window.addEventListener("blur", W), window.addEventListener("resize", W), () => {
        window.removeEventListener("blur", W), window.removeEventListener("resize", W);
      };
    }, [L]);
    const [Z, Q] = lm((W) => {
      const te = I().filter((ie) => !ie.disabled), J = te.find((ie) => ie.ref.current === document.activeElement), oe = um(te, W, J);
      oe && setTimeout(() => oe.ref.current.focus());
    }), k = l.useCallback(
      (W, te, J) => {
        const oe = !z.current && !J;
        (y.value !== void 0 && y.value === te || oe) && (_(W), oe && (z.current = !0));
      },
      [y.value]
    ), H = l.useCallback(() => x == null ? void 0 : x.focus(), [x]), K = l.useCallback(
      (W, te, J) => {
        const oe = !z.current && !J;
        (y.value !== void 0 && y.value === te || oe) && $(W);
      },
      [y.value]
    ), V = r === "popper" ? ia : jf, ee = V === ia ? {
      side: i,
      sideOffset: c,
      align: u,
      alignOffset: d,
      arrowPadding: f,
      collisionBoundary: p,
      collisionPadding: h,
      sticky: b,
      hideWhenDetached: g,
      avoidCollisions: v
    } : {};
    return /* @__PURE__ */ m(
      zf,
      {
        scope: n,
        content: x,
        viewport: E,
        onViewportChange: C,
        itemRefCallback: k,
        selectedItem: M,
        onItemLeave: H,
        itemTextRefCallback: K,
        focusSelectedItem: j,
        selectedItemText: O,
        position: r,
        isPositioned: Y,
        searchRef: Z,
        children: /* @__PURE__ */ m($n, { as: LP, allowPinchZoom: !0, children: /* @__PURE__ */ m(
          In,
          {
            asChild: !0,
            trapped: y.open,
            onMountAutoFocus: (W) => {
              W.preventDefault();
            },
            onUnmountAutoFocus: T(o, (W) => {
              var te;
              (te = y.trigger) == null || te.focus({ preventScroll: !0 }), W.preventDefault();
            }),
            children: /* @__PURE__ */ m(
              $t,
              {
                asChild: !0,
                disableOutsidePointerEvents: !0,
                onEscapeKeyDown: a,
                onPointerDownOutside: s,
                onFocusOutside: (W) => W.preventDefault(),
                onDismiss: () => y.onOpenChange(!1),
                children: /* @__PURE__ */ m(
                  V,
                  {
                    role: "listbox",
                    id: y.contentId,
                    "data-state": y.open ? "open" : "closed",
                    dir: y.dir,
                    onContextMenu: (W) => W.preventDefault(),
                    ...w,
                    ...ee,
                    onPlaced: () => D(!0),
                    ref: N,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...w.style
                    },
                    onKeyDown: T(w.onKeyDown, (W) => {
                      const te = W.ctrlKey || W.altKey || W.metaKey;
                      if (W.key === "Tab" && W.preventDefault(), !te && W.key.length === 1 && Q(W.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(W.key)) {
                        let oe = I().filter((ie) => !ie.disabled).map((ie) => ie.ref.current);
                        if (["ArrowUp", "End"].includes(W.key) && (oe = oe.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(W.key)) {
                          const ie = W.target, ce = oe.indexOf(ie);
                          oe = oe.slice(ce + 1);
                        }
                        setTimeout(() => B(oe)), W.preventDefault();
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
Gf.displayName = FP;
var BP = "SelectItemAlignedPosition", jf = l.forwardRef((e, t) => {
  const { __scopeSelect: n, onPlaced: r, ...o } = e, a = St(It, n), s = Ct(It, n), [i, c] = l.useState(null), [u, d] = l.useState(null), f = q(t, (N) => d(N)), p = so(n), h = l.useRef(!1), b = l.useRef(!0), { viewport: g, selectedItem: v, selectedItemText: w, focusSelectedItem: y } = s, x = l.useCallback(() => {
    if (a.trigger && a.valueNode && i && u && g && v && w) {
      const N = a.trigger.getBoundingClientRect(), M = u.getBoundingClientRect(), _ = a.valueNode.getBoundingClientRect(), O = w.getBoundingClientRect();
      if (a.dir !== "rtl") {
        const ie = O.left - M.left, ce = _.left - ie, Ee = N.left - ce, Oe = N.width + Ee, lt = Math.max(Oe, M.width), Et = window.innerWidth - Le, Nt = Pn(ce, [
          Le,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(Le, Et - lt)
        ]);
        i.style.minWidth = Oe + "px", i.style.left = Nt + "px";
      } else {
        const ie = M.right - O.right, ce = window.innerWidth - _.right - ie, Ee = window.innerWidth - N.right - ce, Oe = N.width + Ee, lt = Math.max(Oe, M.width), Et = window.innerWidth - Le, Nt = Pn(ce, [
          Le,
          Math.max(Le, Et - lt)
        ]);
        i.style.minWidth = Oe + "px", i.style.right = Nt + "px";
      }
      const $ = p(), I = window.innerHeight - Le * 2, Y = g.scrollHeight, D = window.getComputedStyle(u), z = parseInt(D.borderTopWidth, 10), B = parseInt(D.paddingTop, 10), j = parseInt(D.borderBottomWidth, 10), L = parseInt(D.paddingBottom, 10), A = z + B + Y + L + j, Z = Math.min(v.offsetHeight * 5, A), Q = window.getComputedStyle(g), k = parseInt(Q.paddingTop, 10), H = parseInt(Q.paddingBottom, 10), K = N.top + N.height / 2 - Le, V = I - K, ee = v.offsetHeight / 2, W = v.offsetTop + ee, te = z + B + W, J = A - te;
      if (te <= K) {
        const ie = $.length > 0 && v === $[$.length - 1].ref.current;
        i.style.bottom = "0px";
        const ce = u.clientHeight - g.offsetTop - g.offsetHeight, Ee = Math.max(
          V,
          ee + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (ie ? H : 0) + ce + j
        ), Oe = te + Ee;
        i.style.height = Oe + "px";
      } else {
        const ie = $.length > 0 && v === $[0].ref.current;
        i.style.top = "0px";
        const Ee = Math.max(
          K,
          z + g.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (ie ? k : 0) + ee
        ) + J;
        i.style.height = Ee + "px", g.scrollTop = te - K + g.offsetTop;
      }
      i.style.margin = `${Le}px 0`, i.style.minHeight = Z + "px", i.style.maxHeight = I + "px", r == null || r(), requestAnimationFrame(() => h.current = !0);
    }
  }, [
    p,
    a.trigger,
    a.valueNode,
    i,
    u,
    g,
    v,
    w,
    a.dir,
    r
  ]);
  ge(() => x(), [x]);
  const [S, E] = l.useState();
  ge(() => {
    u && E(window.getComputedStyle(u).zIndex);
  }, [u]);
  const C = l.useCallback(
    (N) => {
      N && b.current === !0 && (x(), y == null || y(), b.current = !1);
    },
    [x, y]
  );
  return /* @__PURE__ */ m(
    HP,
    {
      scope: n,
      contentWrapper: i,
      shouldExpandOnScrollRef: h,
      onScrollButtonChange: C,
      children: /* @__PURE__ */ m(
        "div",
        {
          ref: c,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: S
          },
          children: /* @__PURE__ */ m(
            F.div,
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
jf.displayName = BP;
var VP = "SelectPopperPosition", ia = l.forwardRef((e, t) => {
  const {
    __scopeSelect: n,
    align: r = "start",
    collisionPadding: o = Le,
    ...a
  } = e, s = io(n);
  return /* @__PURE__ */ m(
    qr,
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
ia.displayName = VP;
var [HP, Ps] = dn(It, {}), ca = "SelectViewport", Uf = l.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, nonce: r, ...o } = e, a = Ct(ca, n), s = Ps(ca, n), i = q(t, a.onViewportChange), c = l.useRef(0);
    return /* @__PURE__ */ G(Je, { children: [
      /* @__PURE__ */ m(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: r
        }
      ),
      /* @__PURE__ */ m(ao.Slot, { scope: n, children: /* @__PURE__ */ m(
        F.div,
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
          onScroll: T(o.onScroll, (u) => {
            const d = u.currentTarget, { contentWrapper: f, shouldExpandOnScrollRef: p } = s;
            if (p != null && p.current && f) {
              const h = Math.abs(c.current - d.scrollTop);
              if (h > 0) {
                const b = window.innerHeight - Le * 2, g = parseFloat(f.style.minHeight), v = parseFloat(f.style.height), w = Math.max(g, v);
                if (w < b) {
                  const y = w + h, x = Math.min(b, y), S = y - x;
                  f.style.height = x + "px", f.style.bottom === "0px" && (d.scrollTop = S > 0 ? S : 0, f.style.justifyContent = "flex-end");
                }
              }
            }
            c.current = d.scrollTop;
          })
        }
      ) })
    ] });
  }
);
Uf.displayName = ca;
var Kf = "SelectGroup", [YP, zP] = dn(Kf), qf = l.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = he();
    return /* @__PURE__ */ m(YP, { scope: n, id: o, children: /* @__PURE__ */ m(F.div, { role: "group", "aria-labelledby": o, ...r, ref: t }) });
  }
);
qf.displayName = Kf;
var Xf = "SelectLabel", Zf = l.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = zP(Xf, n);
    return /* @__PURE__ */ m(F.div, { id: o.id, ...r, ref: t });
  }
);
Zf.displayName = Xf;
var Pr = "SelectItem", [GP, Qf] = dn(Pr), Jf = l.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: n,
      value: r,
      disabled: o = !1,
      textValue: a,
      ...s
    } = e, i = St(Pr, n), c = Ct(Pr, n), u = i.value === r, [d, f] = l.useState(a ?? ""), [p, h] = l.useState(!1), b = q(
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
    return /* @__PURE__ */ m(
      GP,
      {
        scope: n,
        value: r,
        disabled: o,
        textId: g,
        isSelected: u,
        onItemTextChange: l.useCallback((y) => {
          f((x) => x || ((y == null ? void 0 : y.textContent) ?? "").trim());
        }, []),
        children: /* @__PURE__ */ m(
          ao.ItemSlot,
          {
            scope: n,
            value: r,
            disabled: o,
            textValue: d,
            children: /* @__PURE__ */ m(
              F.div,
              {
                role: "option",
                "aria-labelledby": g,
                "data-highlighted": p ? "" : void 0,
                "aria-selected": u && p,
                "data-state": u ? "checked" : "unchecked",
                "aria-disabled": o || void 0,
                "data-disabled": o ? "" : void 0,
                tabIndex: o ? void 0 : -1,
                ...s,
                ref: b,
                onFocus: T(s.onFocus, () => h(!0)),
                onBlur: T(s.onBlur, () => h(!1)),
                onClick: T(s.onClick, () => {
                  v.current !== "mouse" && w();
                }),
                onPointerUp: T(s.onPointerUp, () => {
                  v.current === "mouse" && w();
                }),
                onPointerDown: T(s.onPointerDown, (y) => {
                  v.current = y.pointerType;
                }),
                onPointerMove: T(s.onPointerMove, (y) => {
                  var x;
                  v.current = y.pointerType, o ? (x = c.onItemLeave) == null || x.call(c) : v.current === "mouse" && y.currentTarget.focus({ preventScroll: !0 });
                }),
                onPointerLeave: T(s.onPointerLeave, (y) => {
                  var x;
                  y.currentTarget === document.activeElement && ((x = c.onItemLeave) == null || x.call(c));
                }),
                onKeyDown: T(s.onKeyDown, (y) => {
                  var S;
                  ((S = c.searchRef) == null ? void 0 : S.current) !== "" && y.key === " " || (_P.includes(y.key) && w(), y.key === " " && y.preventDefault());
                })
              }
            )
          }
        )
      }
    );
  }
);
Jf.displayName = Pr;
var yn = "SelectItemText", em = l.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: r, style: o, ...a } = e, s = St(yn, n), i = Ct(yn, n), c = Qf(yn, n), u = IP(yn, n), [d, f] = l.useState(null), p = q(
      t,
      (w) => f(w),
      c.onItemTextChange,
      (w) => {
        var y;
        return (y = i.itemTextRefCallback) == null ? void 0 : y.call(i, w, c.value, c.disabled);
      }
    ), h = d == null ? void 0 : d.textContent, b = l.useMemo(
      () => /* @__PURE__ */ m("option", { value: c.value, disabled: c.disabled, children: h }, c.value),
      [c.disabled, c.value, h]
    ), { onNativeOptionAdd: g, onNativeOptionRemove: v } = u;
    return ge(() => (g(b), () => v(b)), [g, v, b]), /* @__PURE__ */ G(Je, { children: [
      /* @__PURE__ */ m(F.span, { id: c.textId, ...a, ref: p }),
      c.isSelected && s.valueNode && !s.valueNodeHasChildren ? kn.createPortal(a.children, s.valueNode) : null
    ] });
  }
);
em.displayName = yn;
var tm = "SelectItemIndicator", nm = l.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e;
    return Qf(tm, n).isSelected ? /* @__PURE__ */ m(F.span, { "aria-hidden": !0, ...r, ref: t }) : null;
  }
);
nm.displayName = tm;
var la = "SelectScrollUpButton", rm = l.forwardRef((e, t) => {
  const n = Ct(la, e.__scopeSelect), r = Ps(la, e.__scopeSelect), [o, a] = l.useState(!1), s = q(t, r.onScrollButtonChange);
  return ge(() => {
    if (n.viewport && n.isPositioned) {
      let i = function() {
        const u = c.scrollTop > 0;
        a(u);
      };
      const c = n.viewport;
      return i(), c.addEventListener("scroll", i), () => c.removeEventListener("scroll", i);
    }
  }, [n.viewport, n.isPositioned]), o ? /* @__PURE__ */ m(
    am,
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
rm.displayName = la;
var ua = "SelectScrollDownButton", om = l.forwardRef((e, t) => {
  const n = Ct(ua, e.__scopeSelect), r = Ps(ua, e.__scopeSelect), [o, a] = l.useState(!1), s = q(t, r.onScrollButtonChange);
  return ge(() => {
    if (n.viewport && n.isPositioned) {
      let i = function() {
        const u = c.scrollHeight - c.clientHeight, d = Math.ceil(c.scrollTop) < u;
        a(d);
      };
      const c = n.viewport;
      return i(), c.addEventListener("scroll", i), () => c.removeEventListener("scroll", i);
    }
  }, [n.viewport, n.isPositioned]), o ? /* @__PURE__ */ m(
    am,
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
om.displayName = ua;
var am = l.forwardRef((e, t) => {
  const { __scopeSelect: n, onAutoScroll: r, ...o } = e, a = Ct("SelectScrollButton", n), s = l.useRef(null), i = so(n), c = l.useCallback(() => {
    s.current !== null && (window.clearInterval(s.current), s.current = null);
  }, []);
  return l.useEffect(() => () => c(), [c]), ge(() => {
    var d;
    const u = i().find((f) => f.ref.current === document.activeElement);
    (d = u == null ? void 0 : u.ref.current) == null || d.scrollIntoView({ block: "nearest" });
  }, [i]), /* @__PURE__ */ m(
    F.div,
    {
      "aria-hidden": !0,
      ...o,
      ref: t,
      style: { flexShrink: 0, ...o.style },
      onPointerDown: T(o.onPointerDown, () => {
        s.current === null && (s.current = window.setInterval(r, 50));
      }),
      onPointerMove: T(o.onPointerMove, () => {
        var u;
        (u = a.onItemLeave) == null || u.call(a), s.current === null && (s.current = window.setInterval(r, 50));
      }),
      onPointerLeave: T(o.onPointerLeave, () => {
        c();
      })
    }
  );
}), jP = "SelectSeparator", sm = l.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e;
    return /* @__PURE__ */ m(F.div, { "aria-hidden": !0, ...r, ref: t });
  }
);
sm.displayName = jP;
var da = "SelectArrow", UP = l.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = io(n), a = St(da, n), s = Ct(da, n);
    return a.open && s.position === "popper" ? /* @__PURE__ */ m(Xr, { ...o, ...r, ref: t }) : null;
  }
);
UP.displayName = da;
var KP = "SelectBubbleInput", im = l.forwardRef(
  ({ __scopeSelect: e, value: t, ...n }, r) => {
    const o = l.useRef(null), a = q(r, o), s = On(t);
    return l.useEffect(() => {
      const i = o.current;
      if (!i) return;
      const c = window.HTMLSelectElement.prototype, d = Object.getOwnPropertyDescriptor(
        c,
        "value"
      ).set;
      if (s !== t && d) {
        const f = new Event("change", { bubbles: !0 });
        d.call(i, t), i.dispatchEvent(f);
      }
    }, [s, t]), /* @__PURE__ */ m(
      F.select,
      {
        ...n,
        style: { ...If, ...n.style },
        ref: a,
        defaultValue: t
      }
    );
  }
);
im.displayName = KP;
function cm(e) {
  return e === "" || e === void 0;
}
function lm(e) {
  const t = pe(e), n = l.useRef(""), r = l.useRef(0), o = l.useCallback(
    (s) => {
      const i = n.current + s;
      t(i), function c(u) {
        n.current = u, window.clearTimeout(r.current), u !== "" && (r.current = window.setTimeout(() => c(""), 1e3));
      }(i);
    },
    [t]
  ), a = l.useCallback(() => {
    n.current = "", window.clearTimeout(r.current);
  }, []);
  return l.useEffect(() => () => window.clearTimeout(r.current), []), [n, o, a];
}
function um(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((u) => u === t[0]) ? t[0] : t, a = n ? e.indexOf(n) : -1;
  let s = qP(e, Math.max(a, 0));
  o.length === 1 && (s = s.filter((u) => u !== n));
  const c = s.find(
    (u) => u.textValue.toLowerCase().startsWith(o.toLowerCase())
  );
  return c !== n ? c : void 0;
}
function qP(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var XP = $f, dm = Ff, ZP = Bf, QP = Vf, JP = Hf, fm = Yf, eR = Uf, tR = qf, mm = Zf, pm = Jf, nR = em, rR = nm, hm = rm, gm = om, vm = sm;
const RM = XP, kM = tR, MM = ZP, oR = l.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ G(
  dm,
  {
    ref: r,
    className: P(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      e
    ),
    ...n,
    children: [
      t,
      /* @__PURE__ */ m(QP, { asChild: !0, children: /* @__PURE__ */ m(_r, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
oR.displayName = dm.displayName;
const bm = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  hm,
  {
    ref: n,
    className: P(
      "flex cursor-default items-center justify-center py-1",
      e
    ),
    ...t,
    children: /* @__PURE__ */ m(Rg, { className: "h-4 w-4" })
  }
));
bm.displayName = hm.displayName;
const ym = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  gm,
  {
    ref: n,
    className: P(
      "flex cursor-default items-center justify-center py-1",
      e
    ),
    ...t,
    children: /* @__PURE__ */ m(_r, { className: "h-4 w-4" })
  }
));
ym.displayName = gm.displayName;
const aR = l.forwardRef(({ className: e, children: t, position: n = "popper", ...r }, o) => /* @__PURE__ */ m(JP, { children: /* @__PURE__ */ G(
  fm,
  {
    ref: o,
    className: P(
      "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",
      n === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      e
    ),
    position: n,
    ...r,
    children: [
      /* @__PURE__ */ m(bm, {}),
      /* @__PURE__ */ m(
        eR,
        {
          className: P(
            "p-1",
            n === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ m(ym, {})
    ]
  }
) }));
aR.displayName = fm.displayName;
const sR = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  mm,
  {
    ref: n,
    className: P("px-2 py-1.5 text-sm font-semibold", e),
    ...t
  }
));
sR.displayName = mm.displayName;
const iR = l.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ G(
  pm,
  {
    ref: r,
    className: P(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ m("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ m(rR, { children: /* @__PURE__ */ m(Tr, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ m(nR, { children: t })
    ]
  }
));
iR.displayName = pm.displayName;
const cR = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  vm,
  {
    ref: n,
    className: P("-mx-1 my-1 h-px bg-muted", e),
    ...t
  }
));
cR.displayName = vm.displayName;
var lR = [
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
], uR = lR.reduce((e, t) => {
  const n = /* @__PURE__ */ Mn(`Primitive.${t}`), r = l.forwardRef((o, a) => {
    const { asChild: s, ...i } = o, c = s ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ m(c, { ...i, ref: a });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {}), dR = "Separator", Vi = "horizontal", fR = ["horizontal", "vertical"], wm = l.forwardRef((e, t) => {
  const { decorative: n, orientation: r = Vi, ...o } = e, a = mR(r) ? r : Vi, i = n ? { role: "none" } : { "aria-orientation": a === "vertical" ? a : void 0, role: "separator" };
  return /* @__PURE__ */ m(
    uR.div,
    {
      "data-orientation": a,
      ...i,
      ...o,
      ref: t
    }
  );
});
wm.displayName = dR;
function mR(e) {
  return fR.includes(e);
}
var xm = wm;
const pR = l.forwardRef(({ className: e, orientation: t = "horizontal", decorative: n = !0, ...r }, o) => /* @__PURE__ */ m(
  xm,
  {
    ref: o,
    decorative: n,
    orientation: t,
    className: P(
      "shrink-0 bg-border-subtle",
      t === "horizontal" ? "h-px w-full" : "h-full w-px",
      e
    ),
    ...r
  }
));
pR.displayName = xm.displayName;
const TM = za, _M = jl, DM = Yr, hR = Ga, Sm = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  Wn,
  {
    className: P(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      e
    ),
    ...t,
    ref: n
  }
));
Sm.displayName = Wn.displayName;
const gR = ze(
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
), vR = l.forwardRef(({ side: e = "right", className: t, children: n, ...r }, o) => /* @__PURE__ */ G(hR, { children: [
  /* @__PURE__ */ m(Sm, {}),
  /* @__PURE__ */ G(
    Fn,
    {
      ref: o,
      className: P(gR({ side: e }), t),
      ...r,
      children: [
        /* @__PURE__ */ G(Yr, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
          /* @__PURE__ */ m(Or, { className: "h-4 w-4" }),
          /* @__PURE__ */ m("span", { className: "sr-only", children: "Close" })
        ] }),
        n
      ]
    }
  )
] }));
vR.displayName = Fn.displayName;
const bR = ({
  className: e,
  ...t
}) => /* @__PURE__ */ m(
  "div",
  {
    className: P(
      "flex flex-col space-y-2 text-center sm:text-left",
      e
    ),
    ...t
  }
);
bR.displayName = "SheetHeader";
const yR = ({
  className: e,
  ...t
}) => /* @__PURE__ */ m(
  "div",
  {
    className: P(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      e
    ),
    ...t
  }
);
yR.displayName = "SheetFooter";
const wR = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  Vr,
  {
    ref: n,
    className: P("text-lg font-semibold text-foreground", e),
    ...t
  }
));
wR.displayName = Vr.displayName;
const xR = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  Hr,
  {
    ref: n,
    className: P("text-sm text-muted-foreground", e),
    ...t
  }
));
xR.displayName = Hr.displayName;
function OM({ className: e, ...t }) {
  return /* @__PURE__ */ m(
    "div",
    {
      className: P("animate-shimmer rounded-md bg-border-subtle", e),
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
var Cm = ["PageUp", "PageDown"], Em = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], Nm = {
  "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
  "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"]
}, fn = "Slider", [fa, SR, CR] = an(fn), [Pm] = ye(fn, [
  CR
]), [ER, co] = Pm(fn), Rm = l.forwardRef(
  (e, t) => {
    const {
      name: n,
      min: r = 0,
      max: o = 100,
      step: a = 1,
      orientation: s = "horizontal",
      disabled: i = !1,
      minStepsBetweenThumbs: c = 0,
      defaultValue: u = [r],
      value: d,
      onValueChange: f = () => {
      },
      onValueCommit: p = () => {
      },
      inverted: h = !1,
      form: b,
      ...g
    } = e, v = l.useRef(/* @__PURE__ */ new Set()), w = l.useRef(0), x = s === "horizontal" ? NR : PR, [S = [], E] = we({
      prop: d,
      defaultProp: u,
      onChange: ($) => {
        var Y;
        (Y = [...v.current][w.current]) == null || Y.focus(), f($);
      }
    }), C = l.useRef(S);
    function N($) {
      const I = _R(S, $);
      O($, I);
    }
    function M($) {
      O($, w.current);
    }
    function _() {
      const $ = C.current[w.current];
      S[w.current] !== $ && p(S);
    }
    function O($, I, { commit: Y } = { commit: !1 }) {
      const D = IR(a), z = $R(Math.round(($ - r) / a) * a + r, D), B = Pn(z, [r, o]);
      E((j = []) => {
        const L = MR(j, B, I);
        if (AR(L, c * a)) {
          w.current = L.indexOf(B);
          const A = String(L) !== String(j);
          return A && Y && p(L), A ? L : j;
        } else
          return j;
      });
    }
    return /* @__PURE__ */ m(
      ER,
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
        children: /* @__PURE__ */ m(fa.Provider, { scope: e.__scopeSlider, children: /* @__PURE__ */ m(fa.Slot, { scope: e.__scopeSlider, children: /* @__PURE__ */ m(
          x,
          {
            "aria-disabled": i,
            "data-disabled": i ? "" : void 0,
            ...g,
            ref: t,
            onPointerDown: T(g.onPointerDown, () => {
              i || (C.current = S);
            }),
            min: r,
            max: o,
            inverted: h,
            onSlideStart: i ? void 0 : N,
            onSlideMove: i ? void 0 : M,
            onSlideEnd: i ? void 0 : _,
            onHomeKeyDown: () => !i && O(r, 0, { commit: !0 }),
            onEndKeyDown: () => !i && O(o, S.length - 1, { commit: !0 }),
            onStepKeyDown: ({ event: $, direction: I }) => {
              if (!i) {
                const z = Cm.includes($.key) || $.shiftKey && Em.includes($.key) ? 10 : 1, B = w.current, j = S[B], L = a * z * I;
                O(j + L, B, { commit: !0 });
              }
            }
          }
        ) }) })
      }
    );
  }
);
Rm.displayName = fn;
var [km, Mm] = Pm(fn, {
  startEdge: "left",
  endEdge: "right",
  size: "width",
  direction: 1
}), NR = l.forwardRef(
  (e, t) => {
    const {
      min: n,
      max: r,
      dir: o,
      inverted: a,
      onSlideStart: s,
      onSlideMove: i,
      onSlideEnd: c,
      onStepKeyDown: u,
      ...d
    } = e, [f, p] = l.useState(null), h = q(t, (x) => p(x)), b = l.useRef(void 0), g = bt(o), v = g === "ltr", w = v && !a || !v && a;
    function y(x) {
      const S = b.current || f.getBoundingClientRect(), E = [0, S.width], N = Rs(E, w ? [n, r] : [r, n]);
      return b.current = S, N(x - S.left);
    }
    return /* @__PURE__ */ m(
      km,
      {
        scope: e.__scopeSlider,
        startEdge: w ? "left" : "right",
        endEdge: w ? "right" : "left",
        direction: w ? 1 : -1,
        size: "width",
        children: /* @__PURE__ */ m(
          Tm,
          {
            dir: g,
            "data-orientation": "horizontal",
            ...d,
            ref: h,
            style: {
              ...d.style,
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
              const E = Nm[w ? "from-left" : "from-right"].includes(x.key);
              u == null || u({ event: x, direction: E ? -1 : 1 });
            }
          }
        )
      }
    );
  }
), PR = l.forwardRef(
  (e, t) => {
    const {
      min: n,
      max: r,
      inverted: o,
      onSlideStart: a,
      onSlideMove: s,
      onSlideEnd: i,
      onStepKeyDown: c,
      ...u
    } = e, d = l.useRef(null), f = q(t, d), p = l.useRef(void 0), h = !o;
    function b(g) {
      const v = p.current || d.current.getBoundingClientRect(), w = [0, v.height], x = Rs(w, h ? [r, n] : [n, r]);
      return p.current = v, x(g - v.top);
    }
    return /* @__PURE__ */ m(
      km,
      {
        scope: e.__scopeSlider,
        startEdge: h ? "bottom" : "top",
        endEdge: h ? "top" : "bottom",
        size: "height",
        direction: h ? 1 : -1,
        children: /* @__PURE__ */ m(
          Tm,
          {
            "data-orientation": "vertical",
            ...u,
            ref: f,
            style: {
              ...u.style,
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
              const w = Nm[h ? "from-bottom" : "from-top"].includes(g.key);
              c == null || c({ event: g, direction: w ? -1 : 1 });
            }
          }
        )
      }
    );
  }
), Tm = l.forwardRef(
  (e, t) => {
    const {
      __scopeSlider: n,
      onSlideStart: r,
      onSlideMove: o,
      onSlideEnd: a,
      onHomeKeyDown: s,
      onEndKeyDown: i,
      onStepKeyDown: c,
      ...u
    } = e, d = co(fn, n);
    return /* @__PURE__ */ m(
      F.span,
      {
        ...u,
        ref: t,
        onKeyDown: T(e.onKeyDown, (f) => {
          f.key === "Home" ? (s(f), f.preventDefault()) : f.key === "End" ? (i(f), f.preventDefault()) : Cm.concat(Em).includes(f.key) && (c(f), f.preventDefault());
        }),
        onPointerDown: T(e.onPointerDown, (f) => {
          const p = f.target;
          p.setPointerCapture(f.pointerId), f.preventDefault(), d.thumbs.has(p) ? p.focus() : r(f);
        }),
        onPointerMove: T(e.onPointerMove, (f) => {
          f.target.hasPointerCapture(f.pointerId) && o(f);
        }),
        onPointerUp: T(e.onPointerUp, (f) => {
          const p = f.target;
          p.hasPointerCapture(f.pointerId) && (p.releasePointerCapture(f.pointerId), a(f));
        })
      }
    );
  }
), _m = "SliderTrack", Dm = l.forwardRef(
  (e, t) => {
    const { __scopeSlider: n, ...r } = e, o = co(_m, n);
    return /* @__PURE__ */ m(
      F.span,
      {
        "data-disabled": o.disabled ? "" : void 0,
        "data-orientation": o.orientation,
        ...r,
        ref: t
      }
    );
  }
);
Dm.displayName = _m;
var ma = "SliderRange", Om = l.forwardRef(
  (e, t) => {
    const { __scopeSlider: n, ...r } = e, o = co(ma, n), a = Mm(ma, n), s = l.useRef(null), i = q(t, s), c = o.values.length, u = o.values.map(
      (p) => $m(p, o.min, o.max)
    ), d = c > 1 ? Math.min(...u) : 0, f = 100 - Math.max(...u);
    return /* @__PURE__ */ m(
      F.span,
      {
        "data-orientation": o.orientation,
        "data-disabled": o.disabled ? "" : void 0,
        ...r,
        ref: i,
        style: {
          ...e.style,
          [a.startEdge]: d + "%",
          [a.endEdge]: f + "%"
        }
      }
    );
  }
);
Om.displayName = ma;
var pa = "SliderThumb", Am = l.forwardRef(
  (e, t) => {
    const n = SR(e.__scopeSlider), [r, o] = l.useState(null), a = q(t, (i) => o(i)), s = l.useMemo(
      () => r ? n().findIndex((i) => i.ref.current === r) : -1,
      [n, r]
    );
    return /* @__PURE__ */ m(RR, { ...e, ref: a, index: s });
  }
), RR = l.forwardRef(
  (e, t) => {
    const { __scopeSlider: n, index: r, name: o, ...a } = e, s = co(pa, n), i = Mm(pa, n), [c, u] = l.useState(null), d = q(t, (y) => u(y)), f = c ? s.form || !!c.closest("form") : !0, p = An(c), h = s.values[r], b = h === void 0 ? 0 : $m(h, s.min, s.max), g = TR(r, s.values.length), v = p == null ? void 0 : p[i.size], w = v ? DR(v, b, i.direction) : 0;
    return l.useEffect(() => {
      if (c)
        return s.thumbs.add(c), () => {
          s.thumbs.delete(c);
        };
    }, [c, s.thumbs]), /* @__PURE__ */ G(
      "span",
      {
        style: {
          transform: "var(--radix-slider-thumb-transform)",
          position: "absolute",
          [i.startEdge]: `calc(${b}% + ${w}px)`
        },
        children: [
          /* @__PURE__ */ m(fa.ItemSlot, { scope: e.__scopeSlider, children: /* @__PURE__ */ m(
            F.span,
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
              ref: d,
              style: h === void 0 ? { display: "none" } : e.style,
              onFocus: T(e.onFocus, () => {
                s.valueIndexToChangeRef.current = r;
              })
            }
          ) }),
          f && /* @__PURE__ */ m(
            Im,
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
Am.displayName = pa;
var kR = "RadioBubbleInput", Im = l.forwardRef(
  ({ __scopeSlider: e, value: t, ...n }, r) => {
    const o = l.useRef(null), a = q(o, r), s = On(t);
    return l.useEffect(() => {
      const i = o.current;
      if (!i) return;
      const c = window.HTMLInputElement.prototype, d = Object.getOwnPropertyDescriptor(c, "value").set;
      if (s !== t && d) {
        const f = new Event("input", { bubbles: !0 });
        d.call(i, t), i.dispatchEvent(f);
      }
    }, [s, t]), /* @__PURE__ */ m(
      F.input,
      {
        style: { display: "none" },
        ...n,
        ref: a,
        defaultValue: t
      }
    );
  }
);
Im.displayName = kR;
function MR(e = [], t, n) {
  const r = [...e];
  return r[n] = t, r.sort((o, a) => o - a);
}
function $m(e, t, n) {
  const a = 100 / (n - t) * (e - t);
  return Pn(a, [0, 100]);
}
function TR(e, t) {
  return t > 2 ? `Value ${e + 1} of ${t}` : t === 2 ? ["Minimum", "Maximum"][e] : void 0;
}
function _R(e, t) {
  if (e.length === 1) return 0;
  const n = e.map((o) => Math.abs(o - t)), r = Math.min(...n);
  return n.indexOf(r);
}
function DR(e, t, n) {
  const r = e / 2, a = Rs([0, 50], [0, r]);
  return (r - a(t) * n) * n;
}
function OR(e) {
  return e.slice(0, -1).map((t, n) => e[n + 1] - t);
}
function AR(e, t) {
  if (t > 0) {
    const n = OR(e);
    return Math.min(...n) >= t;
  }
  return !0;
}
function Rs(e, t) {
  return (n) => {
    if (e[0] === e[1] || t[0] === t[1]) return t[0];
    const r = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + r * (n - e[0]);
  };
}
function IR(e) {
  return (String(e).split(".")[1] || "").length;
}
function $R(e, t) {
  const n = Math.pow(10, t);
  return Math.round(e * n) / n;
}
var Wm = Rm, WR = Dm, FR = Om, LR = Am;
const BR = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ G(
  Wm,
  {
    ref: n,
    className: P("relative flex w-full touch-none select-none items-center", e),
    ...t,
    children: [
      /* @__PURE__ */ m(WR, { className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-border-default", children: /* @__PURE__ */ m(FR, { className: "absolute h-full bg-primary" }) }),
      (t.value ?? t.defaultValue ?? [0]).map((r, o) => /* @__PURE__ */ m(
        LR,
        {
          className: P(
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
BR.displayName = Wm.displayName;
const VR = ze("animate-spin rounded-full border-current", {
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
function AM({ size: e, className: t, label: n = "Loading..." }) {
  return /* @__PURE__ */ m(
    "div",
    {
      role: "status",
      "aria-label": n,
      className: P(VR({ size: e }), "border-t-transparent", t)
    }
  );
}
const HR = ze(
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
function IM({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ m("div", { className: P(HR({ variant: t }), e), ...n });
}
var lo = "Switch", [YR] = ye(lo), [zR, GR] = YR(lo), Fm = l.forwardRef(
  (e, t) => {
    const {
      __scopeSwitch: n,
      name: r,
      checked: o,
      defaultChecked: a,
      required: s,
      disabled: i,
      value: c = "on",
      onCheckedChange: u,
      form: d,
      ...f
    } = e, [p, h] = l.useState(null), b = q(t, (x) => h(x)), g = l.useRef(!1), v = p ? d || !!p.closest("form") : !0, [w, y] = we({
      prop: o,
      defaultProp: a ?? !1,
      onChange: u,
      caller: lo
    });
    return /* @__PURE__ */ G(zR, { scope: n, checked: w, disabled: i, children: [
      /* @__PURE__ */ m(
        F.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": w,
          "aria-required": s,
          "data-state": Hm(w),
          "data-disabled": i ? "" : void 0,
          disabled: i,
          value: c,
          ...f,
          ref: b,
          onClick: T(e.onClick, (x) => {
            y((S) => !S), v && (g.current = x.isPropagationStopped(), g.current || x.stopPropagation());
          })
        }
      ),
      v && /* @__PURE__ */ m(
        Vm,
        {
          control: p,
          bubbles: !g.current,
          name: r,
          value: c,
          checked: w,
          required: s,
          disabled: i,
          form: d,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Fm.displayName = lo;
var Lm = "SwitchThumb", Bm = l.forwardRef(
  (e, t) => {
    const { __scopeSwitch: n, ...r } = e, o = GR(Lm, n);
    return /* @__PURE__ */ m(
      F.span,
      {
        "data-state": Hm(o.checked),
        "data-disabled": o.disabled ? "" : void 0,
        ...r,
        ref: t
      }
    );
  }
);
Bm.displayName = Lm;
var jR = "SwitchBubbleInput", Vm = l.forwardRef(
  ({
    __scopeSwitch: e,
    control: t,
    checked: n,
    bubbles: r = !0,
    ...o
  }, a) => {
    const s = l.useRef(null), i = q(s, a), c = On(n), u = An(t);
    return l.useEffect(() => {
      const d = s.current;
      if (!d) return;
      const f = window.HTMLInputElement.prototype, h = Object.getOwnPropertyDescriptor(
        f,
        "checked"
      ).set;
      if (c !== n && h) {
        const b = new Event("click", { bubbles: r });
        h.call(d, n), d.dispatchEvent(b);
      }
    }, [c, n, r]), /* @__PURE__ */ m(
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
          ...u,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
Vm.displayName = jR;
function Hm(e) {
  return e ? "checked" : "unchecked";
}
var Ym = Fm, UR = Bm;
const KR = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  Ym,
  {
    ref: n,
    className: P(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
      "bg-border-strong transition-colors duration-base ease-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-primary",
      e
    ),
    ...t,
    children: /* @__PURE__ */ m(
      UR,
      {
        className: P(
          "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-elevation-1",
          "ring-0 transition-transform duration-base ease-spring",
          "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
KR.displayName = Ym.displayName;
const qR = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ m(
  "table",
  {
    ref: n,
    className: P("w-full caption-bottom text-sm", e),
    ...t
  }
) }));
qR.displayName = "Table";
const XR = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m("thead", { ref: n, className: P("[&_tr]:border-b", e), ...t }));
XR.displayName = "TableHeader";
const ZR = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  "tbody",
  {
    ref: n,
    className: P("[&_tr:last-child]:border-0", e),
    ...t
  }
));
ZR.displayName = "TableBody";
const QR = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  "tfoot",
  {
    ref: n,
    className: P(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      e
    ),
    ...t
  }
));
QR.displayName = "TableFooter";
const JR = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  "tr",
  {
    ref: n,
    className: P(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      e
    ),
    ...t
  }
));
JR.displayName = "TableRow";
const ek = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  "th",
  {
    ref: n,
    className: P(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      e
    ),
    ...t
  }
));
ek.displayName = "TableHead";
const tk = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  "td",
  {
    ref: n,
    className: P(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      e
    ),
    ...t
  }
));
tk.displayName = "TableCell";
const nk = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  "caption",
  {
    ref: n,
    className: P("mt-4 text-sm text-muted-foreground", e),
    ...t
  }
));
nk.displayName = "TableCaption";
var uo = "Tabs", [rk] = ye(uo, [
  un
]), zm = un(), [ok, ks] = rk(uo), Gm = l.forwardRef(
  (e, t) => {
    const {
      __scopeTabs: n,
      value: r,
      onValueChange: o,
      defaultValue: a,
      orientation: s = "horizontal",
      dir: i,
      activationMode: c = "automatic",
      ...u
    } = e, d = bt(i), [f, p] = we({
      prop: r,
      onChange: o,
      defaultProp: a ?? "",
      caller: uo
    });
    return /* @__PURE__ */ m(
      ok,
      {
        scope: n,
        baseId: he(),
        value: f,
        onValueChange: p,
        orientation: s,
        dir: d,
        activationMode: c,
        children: /* @__PURE__ */ m(
          F.div,
          {
            dir: d,
            "data-orientation": s,
            ...u,
            ref: t
          }
        )
      }
    );
  }
);
Gm.displayName = uo;
var jm = "TabsList", Um = l.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, loop: r = !0, ...o } = e, a = ks(jm, n), s = zm(n);
    return /* @__PURE__ */ m(
      ns,
      {
        asChild: !0,
        ...s,
        orientation: a.orientation,
        dir: a.dir,
        loop: r,
        children: /* @__PURE__ */ m(
          F.div,
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
Um.displayName = jm;
var Km = "TabsTrigger", qm = l.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, value: r, disabled: o = !1, ...a } = e, s = ks(Km, n), i = zm(n), c = Qm(s.baseId, r), u = Jm(s.baseId, r), d = r === s.value;
    return /* @__PURE__ */ m(
      rs,
      {
        asChild: !0,
        ...i,
        focusable: !o,
        active: d,
        children: /* @__PURE__ */ m(
          F.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": d,
            "aria-controls": u,
            "data-state": d ? "active" : "inactive",
            "data-disabled": o ? "" : void 0,
            disabled: o,
            id: c,
            ...a,
            ref: t,
            onMouseDown: T(e.onMouseDown, (f) => {
              !o && f.button === 0 && f.ctrlKey === !1 ? s.onValueChange(r) : f.preventDefault();
            }),
            onKeyDown: T(e.onKeyDown, (f) => {
              [" ", "Enter"].includes(f.key) && s.onValueChange(r);
            }),
            onFocus: T(e.onFocus, () => {
              const f = s.activationMode !== "manual";
              !d && !o && f && s.onValueChange(r);
            })
          }
        )
      }
    );
  }
);
qm.displayName = Km;
var Xm = "TabsContent", Zm = l.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, value: r, forceMount: o, children: a, ...s } = e, i = ks(Xm, n), c = Qm(i.baseId, r), u = Jm(i.baseId, r), d = r === i.value, f = l.useRef(d);
    return l.useEffect(() => {
      const p = requestAnimationFrame(() => f.current = !1);
      return () => cancelAnimationFrame(p);
    }, []), /* @__PURE__ */ m(ve, { present: o || d, children: ({ present: p }) => /* @__PURE__ */ m(
      F.div,
      {
        "data-state": d ? "active" : "inactive",
        "data-orientation": i.orientation,
        role: "tabpanel",
        "aria-labelledby": c,
        hidden: !p,
        id: u,
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
Zm.displayName = Xm;
function Qm(e, t) {
  return `${e}-trigger-${t}`;
}
function Jm(e, t) {
  return `${e}-content-${t}`;
}
var ak = Gm, ep = Um, tp = qm, np = Zm;
const $M = ak, sk = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  ep,
  {
    ref: n,
    className: P(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      e
    ),
    ...t
  }
));
sk.displayName = ep.displayName;
const ik = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  tp,
  {
    ref: n,
    className: P(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      e
    ),
    ...t
  }
));
ik.displayName = tp.displayName;
const ck = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  np,
  {
    ref: n,
    className: P(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      e
    ),
    ...t
  }
));
ck.displayName = np.displayName;
const lk = l.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ m(
    "textarea",
    {
      className: P(
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
lk.displayName = "Textarea";
var Ms = "ToastProvider", [Ts, uk, dk] = an("Toast"), [rp] = ye("Toast", [dk]), [fk, fo] = rp(Ms), op = (e) => {
  const {
    __scopeToast: t,
    label: n = "Notification",
    duration: r = 5e3,
    swipeDirection: o = "right",
    swipeThreshold: a = 50,
    children: s
  } = e, [i, c] = l.useState(null), [u, d] = l.useState(0), f = l.useRef(!1), p = l.useRef(!1);
  return n.trim() || console.error(
    `Invalid prop \`label\` supplied to \`${Ms}\`. Expected non-empty \`string\`.`
  ), /* @__PURE__ */ m(Ts.Provider, { scope: t, children: /* @__PURE__ */ m(
    fk,
    {
      scope: t,
      label: n,
      duration: r,
      swipeDirection: o,
      swipeThreshold: a,
      toastCount: u,
      viewport: i,
      onViewportChange: c,
      onToastAdd: l.useCallback(() => d((h) => h + 1), []),
      onToastRemove: l.useCallback(() => d((h) => h - 1), []),
      isFocusedToastEscapeKeyDownRef: f,
      isClosePausedRef: p,
      children: s
    }
  ) });
};
op.displayName = Ms;
var ap = "ToastViewport", mk = ["F8"], ha = "toast.viewportPause", ga = "toast.viewportResume", sp = l.forwardRef(
  (e, t) => {
    const {
      __scopeToast: n,
      hotkey: r = mk,
      label: o = "Notifications ({hotkey})",
      ...a
    } = e, s = fo(ap, n), i = uk(n), c = l.useRef(null), u = l.useRef(null), d = l.useRef(null), f = l.useRef(null), p = q(t, f, s.onViewportChange), h = r.join("+").replace(/Key/g, "").replace(/Digit/g, ""), b = s.toastCount > 0;
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
            const C = new CustomEvent(ha);
            w.dispatchEvent(C), s.isClosePausedRef.current = !0;
          }
        }, x = () => {
          if (s.isClosePausedRef.current) {
            const C = new CustomEvent(ga);
            w.dispatchEvent(C), s.isClosePausedRef.current = !1;
          }
        }, S = (C) => {
          !v.contains(C.relatedTarget) && x();
        }, E = () => {
          v.contains(document.activeElement) || x();
        };
        return v.addEventListener("focusin", y), v.addEventListener("focusout", S), v.addEventListener("pointermove", y), v.addEventListener("pointerleave", E), window.addEventListener("blur", y), window.addEventListener("focus", x), () => {
          v.removeEventListener("focusin", y), v.removeEventListener("focusout", S), v.removeEventListener("pointermove", y), v.removeEventListener("pointerleave", E), window.removeEventListener("blur", y), window.removeEventListener("focus", x);
        };
      }
    }, [b, s.isClosePausedRef]);
    const g = l.useCallback(
      ({ tabbingDirection: v }) => {
        const y = i().map((x) => {
          const S = x.ref.current, E = [S, ...Pk(S)];
          return v === "forwards" ? E : E.reverse();
        });
        return (v === "forwards" ? y.reverse() : y).flat();
      },
      [i]
    );
    return l.useEffect(() => {
      const v = f.current;
      if (v) {
        const w = (y) => {
          var E, C, N;
          const x = y.altKey || y.ctrlKey || y.metaKey;
          if (y.key === "Tab" && !x) {
            const M = document.activeElement, _ = y.shiftKey;
            if (y.target === v && _) {
              (E = u.current) == null || E.focus();
              return;
            }
            const I = g({ tabbingDirection: _ ? "backwards" : "forwards" }), Y = I.findIndex((D) => D === M);
            Yo(I.slice(Y + 1)) ? y.preventDefault() : _ ? (C = u.current) == null || C.focus() : (N = d.current) == null || N.focus();
          }
        };
        return v.addEventListener("keydown", w), () => v.removeEventListener("keydown", w);
      }
    }, [i, g]), /* @__PURE__ */ G(
      vx,
      {
        ref: c,
        role: "region",
        "aria-label": o.replace("{hotkey}", h),
        tabIndex: -1,
        style: { pointerEvents: b ? void 0 : "none" },
        children: [
          b && /* @__PURE__ */ m(
            va,
            {
              ref: u,
              onFocusFromOutsideViewport: () => {
                const v = g({
                  tabbingDirection: "forwards"
                });
                Yo(v);
              }
            }
          ),
          /* @__PURE__ */ m(Ts.Slot, { scope: n, children: /* @__PURE__ */ m(F.ol, { tabIndex: -1, ...a, ref: p }) }),
          b && /* @__PURE__ */ m(
            va,
            {
              ref: d,
              onFocusFromOutsideViewport: () => {
                const v = g({
                  tabbingDirection: "backwards"
                });
                Yo(v);
              }
            }
          )
        ]
      }
    );
  }
);
sp.displayName = ap;
var ip = "ToastFocusProxy", va = l.forwardRef(
  (e, t) => {
    const { __scopeToast: n, onFocusFromOutsideViewport: r, ...o } = e, a = fo(ip, n);
    return /* @__PURE__ */ m(
      oo,
      {
        tabIndex: 0,
        ...o,
        ref: t,
        style: { position: "fixed" },
        onFocus: (s) => {
          var u;
          const i = s.relatedTarget;
          !((u = a.viewport) != null && u.contains(i)) && r();
        }
      }
    );
  }
);
va.displayName = ip;
var Kn = "Toast", pk = "toast.swipeStart", hk = "toast.swipeMove", gk = "toast.swipeCancel", vk = "toast.swipeEnd", cp = l.forwardRef(
  (e, t) => {
    const { forceMount: n, open: r, defaultOpen: o, onOpenChange: a, ...s } = e, [i, c] = we({
      prop: r,
      defaultProp: o ?? !0,
      onChange: a,
      caller: Kn
    });
    return /* @__PURE__ */ m(ve, { present: n || i, children: /* @__PURE__ */ m(
      wk,
      {
        open: i,
        ...s,
        ref: t,
        onClose: () => c(!1),
        onPause: pe(e.onPause),
        onResume: pe(e.onResume),
        onSwipeStart: T(e.onSwipeStart, (u) => {
          u.currentTarget.setAttribute("data-swipe", "start");
        }),
        onSwipeMove: T(e.onSwipeMove, (u) => {
          const { x: d, y: f } = u.detail.delta;
          u.currentTarget.setAttribute("data-swipe", "move"), u.currentTarget.style.setProperty("--radix-toast-swipe-move-x", `${d}px`), u.currentTarget.style.setProperty("--radix-toast-swipe-move-y", `${f}px`);
        }),
        onSwipeCancel: T(e.onSwipeCancel, (u) => {
          u.currentTarget.setAttribute("data-swipe", "cancel"), u.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"), u.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"), u.currentTarget.style.removeProperty("--radix-toast-swipe-end-x"), u.currentTarget.style.removeProperty("--radix-toast-swipe-end-y");
        }),
        onSwipeEnd: T(e.onSwipeEnd, (u) => {
          const { x: d, y: f } = u.detail.delta;
          u.currentTarget.setAttribute("data-swipe", "end"), u.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"), u.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"), u.currentTarget.style.setProperty("--radix-toast-swipe-end-x", `${d}px`), u.currentTarget.style.setProperty("--radix-toast-swipe-end-y", `${f}px`), c(!1);
        })
      }
    ) });
  }
);
cp.displayName = Kn;
var [bk, yk] = rp(Kn, {
  onClose() {
  }
}), wk = l.forwardRef(
  (e, t) => {
    const {
      __scopeToast: n,
      type: r = "foreground",
      duration: o,
      open: a,
      onClose: s,
      onEscapeKeyDown: i,
      onPause: c,
      onResume: u,
      onSwipeStart: d,
      onSwipeMove: f,
      onSwipeCancel: p,
      onSwipeEnd: h,
      ...b
    } = e, g = fo(Kn, n), [v, w] = l.useState(null), y = q(t, (D) => w(D)), x = l.useRef(null), S = l.useRef(null), E = o || g.duration, C = l.useRef(0), N = l.useRef(E), M = l.useRef(0), { onToastAdd: _, onToastRemove: O } = g, $ = pe(() => {
      var z;
      (v == null ? void 0 : v.contains(document.activeElement)) && ((z = g.viewport) == null || z.focus()), s();
    }), I = l.useCallback(
      (D) => {
        !D || D === 1 / 0 || (window.clearTimeout(M.current), C.current = (/* @__PURE__ */ new Date()).getTime(), M.current = window.setTimeout($, D));
      },
      [$]
    );
    l.useEffect(() => {
      const D = g.viewport;
      if (D) {
        const z = () => {
          I(N.current), u == null || u();
        }, B = () => {
          const j = (/* @__PURE__ */ new Date()).getTime() - C.current;
          N.current = N.current - j, window.clearTimeout(M.current), c == null || c();
        };
        return D.addEventListener(ha, B), D.addEventListener(ga, z), () => {
          D.removeEventListener(ha, B), D.removeEventListener(ga, z);
        };
      }
    }, [g.viewport, E, c, u, I]), l.useEffect(() => {
      a && !g.isClosePausedRef.current && I(E);
    }, [a, E, g.isClosePausedRef, I]), l.useEffect(() => (_(), () => O()), [_, O]);
    const Y = l.useMemo(() => v ? hp(v) : null, [v]);
    return g.viewport ? /* @__PURE__ */ G(Je, { children: [
      Y && /* @__PURE__ */ m(
        xk,
        {
          __scopeToast: n,
          role: "status",
          "aria-live": r === "foreground" ? "assertive" : "polite",
          children: Y
        }
      ),
      /* @__PURE__ */ m(bk, { scope: n, onClose: $, children: kn.createPortal(
        /* @__PURE__ */ m(Ts.ItemSlot, { scope: n, children: /* @__PURE__ */ m(
          gx,
          {
            asChild: !0,
            onEscapeKeyDown: T(i, () => {
              g.isFocusedToastEscapeKeyDownRef.current || $(), g.isFocusedToastEscapeKeyDownRef.current = !1;
            }),
            children: /* @__PURE__ */ m(
              F.li,
              {
                tabIndex: 0,
                "data-state": a ? "open" : "closed",
                "data-swipe-direction": g.swipeDirection,
                ...b,
                ref: y,
                style: { userSelect: "none", touchAction: "none", ...e.style },
                onKeyDown: T(e.onKeyDown, (D) => {
                  D.key === "Escape" && (i == null || i(D.nativeEvent), D.nativeEvent.defaultPrevented || (g.isFocusedToastEscapeKeyDownRef.current = !0, $()));
                }),
                onPointerDown: T(e.onPointerDown, (D) => {
                  D.button === 0 && (x.current = { x: D.clientX, y: D.clientY });
                }),
                onPointerMove: T(e.onPointerMove, (D) => {
                  if (!x.current) return;
                  const z = D.clientX - x.current.x, B = D.clientY - x.current.y, j = !!S.current, L = ["left", "right"].includes(g.swipeDirection), A = ["left", "up"].includes(g.swipeDirection) ? Math.min : Math.max, Z = L ? A(0, z) : 0, Q = L ? 0 : A(0, B), k = D.pointerType === "touch" ? 10 : 2, H = { x: Z, y: Q }, K = { originalEvent: D, delta: H };
                  j ? (S.current = H, rr(hk, f, K, {
                    discrete: !1
                  })) : Hi(H, g.swipeDirection, k) ? (S.current = H, rr(pk, d, K, {
                    discrete: !1
                  }), D.target.setPointerCapture(D.pointerId)) : (Math.abs(z) > k || Math.abs(B) > k) && (x.current = null);
                }),
                onPointerUp: T(e.onPointerUp, (D) => {
                  const z = S.current, B = D.target;
                  if (B.hasPointerCapture(D.pointerId) && B.releasePointerCapture(D.pointerId), S.current = null, x.current = null, z) {
                    const j = D.currentTarget, L = { originalEvent: D, delta: z };
                    Hi(z, g.swipeDirection, g.swipeThreshold) ? rr(vk, h, L, {
                      discrete: !0
                    }) : rr(
                      gk,
                      p,
                      L,
                      {
                        discrete: !0
                      }
                    ), j.addEventListener("click", (A) => A.preventDefault(), {
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
), xk = (e) => {
  const { __scopeToast: t, children: n, ...r } = e, o = fo(Kn, t), [a, s] = l.useState(!1), [i, c] = l.useState(!1);
  return Ek(() => s(!0)), l.useEffect(() => {
    const u = window.setTimeout(() => c(!0), 1e3);
    return () => window.clearTimeout(u);
  }, []), i ? null : /* @__PURE__ */ m(Wt, { asChild: !0, children: /* @__PURE__ */ m(oo, { ...r, children: a && /* @__PURE__ */ G(Je, { children: [
    o.label,
    " ",
    n
  ] }) }) });
}, Sk = "ToastTitle", lp = l.forwardRef(
  (e, t) => {
    const { __scopeToast: n, ...r } = e;
    return /* @__PURE__ */ m(F.div, { ...r, ref: t });
  }
);
lp.displayName = Sk;
var Ck = "ToastDescription", up = l.forwardRef(
  (e, t) => {
    const { __scopeToast: n, ...r } = e;
    return /* @__PURE__ */ m(F.div, { ...r, ref: t });
  }
);
up.displayName = Ck;
var dp = "ToastAction", fp = l.forwardRef(
  (e, t) => {
    const { altText: n, ...r } = e;
    return n.trim() ? /* @__PURE__ */ m(pp, { altText: n, asChild: !0, children: /* @__PURE__ */ m(_s, { ...r, ref: t }) }) : (console.error(
      `Invalid prop \`altText\` supplied to \`${dp}\`. Expected non-empty \`string\`.`
    ), null);
  }
);
fp.displayName = dp;
var mp = "ToastClose", _s = l.forwardRef(
  (e, t) => {
    const { __scopeToast: n, ...r } = e, o = yk(mp, n);
    return /* @__PURE__ */ m(pp, { asChild: !0, children: /* @__PURE__ */ m(
      F.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: T(e.onClick, o.onClose)
      }
    ) });
  }
);
_s.displayName = mp;
var pp = l.forwardRef((e, t) => {
  const { __scopeToast: n, altText: r, ...o } = e;
  return /* @__PURE__ */ m(
    F.div,
    {
      "data-radix-toast-announce-exclude": "",
      "data-radix-toast-announce-alt": r || void 0,
      ...o,
      ref: t
    }
  );
});
function hp(e) {
  const t = [];
  return Array.from(e.childNodes).forEach((r) => {
    if (r.nodeType === r.TEXT_NODE && r.textContent && t.push(r.textContent), Nk(r)) {
      const o = r.ariaHidden || r.hidden || r.style.display === "none", a = r.dataset.radixToastAnnounceExclude === "";
      if (!o)
        if (a) {
          const s = r.dataset.radixToastAnnounceAlt;
          s && t.push(s);
        } else
          t.push(...hp(r));
    }
  }), t;
}
function rr(e, t, n, { discrete: r }) {
  const o = n.originalEvent.currentTarget, a = new CustomEvent(e, { bubbles: !0, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? xa(o, a) : o.dispatchEvent(a);
}
var Hi = (e, t, n = 0) => {
  const r = Math.abs(e.x), o = Math.abs(e.y), a = r > o;
  return t === "left" || t === "right" ? a && r > n : !a && o > n;
};
function Ek(e = () => {
}) {
  const t = pe(e);
  ge(() => {
    let n = 0, r = 0;
    return n = window.requestAnimationFrame(() => r = window.requestAnimationFrame(t)), () => {
      window.cancelAnimationFrame(n), window.cancelAnimationFrame(r);
    };
  }, [t]);
}
function Nk(e) {
  return e.nodeType === e.ELEMENT_NODE;
}
function Pk(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Yo(e) {
  const t = document.activeElement;
  return e.some((n) => n === t ? !0 : (n.focus(), document.activeElement !== t));
}
var Rk = op, gp = sp, vp = cp, bp = lp, yp = up, wp = fp, xp = _s;
const kk = Rk, Sp = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  gp,
  {
    ref: n,
    className: P(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      e
    ),
    ...t
  }
));
Sp.displayName = gp.displayName;
const Mk = ze(
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
), Cp = l.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ m(
  vp,
  {
    ref: r,
    className: P(Mk({ variant: t }), e),
    ...n
  }
));
Cp.displayName = vp.displayName;
const Tk = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  wp,
  {
    ref: n,
    className: P(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      e
    ),
    ...t
  }
));
Tk.displayName = wp.displayName;
const Ep = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  xp,
  {
    ref: n,
    className: P(
      "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      e
    ),
    "toast-close": "",
    ...t,
    children: /* @__PURE__ */ m(Or, { className: "h-4 w-4" })
  }
));
Ep.displayName = xp.displayName;
const Np = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  bp,
  {
    ref: n,
    className: P("text-sm font-semibold [&+div]:text-xs", e),
    ...t
  }
));
Np.displayName = bp.displayName;
const Pp = l.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  yp,
  {
    ref: n,
    className: P("text-sm opacity-90", e),
    ...t
  }
));
Pp.displayName = yp.displayName;
const _k = 1, Dk = 1e6;
let zo = 0;
function Ok() {
  return zo = (zo + 1) % Number.MAX_SAFE_INTEGER, zo.toString();
}
const Go = /* @__PURE__ */ new Map(), Yi = (e) => {
  if (Go.has(e))
    return;
  const t = setTimeout(() => {
    Go.delete(e), wn({
      type: "REMOVE_TOAST",
      toastId: e
    });
  }, Dk);
  Go.set(e, t);
}, Ak = (e, t) => {
  switch (t.type) {
    case "ADD_TOAST":
      return {
        ...e,
        toasts: [t.toast, ...e.toasts].slice(0, _k)
      };
    case "UPDATE_TOAST":
      return {
        ...e,
        toasts: e.toasts.map(
          (n) => n.id === t.toast.id ? { ...n, ...t.toast } : n
        )
      };
    case "DISMISS_TOAST": {
      const { toastId: n } = t;
      return n ? Yi(n) : e.toasts.forEach((r) => {
        Yi(r.id);
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
}, ur = [];
let dr = { toasts: [] };
function wn(e) {
  dr = Ak(dr, e), ur.forEach((t) => {
    t(dr);
  });
}
function Ik({ ...e }) {
  const t = Ok(), n = (o) => wn({
    type: "UPDATE_TOAST",
    toast: { ...o, id: t }
  }), r = () => wn({ type: "DISMISS_TOAST", toastId: t });
  return wn({
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
function $k() {
  const [e, t] = l.useState(dr);
  return l.useEffect(() => (ur.push(t), () => {
    const n = ur.indexOf(t);
    n > -1 && ur.splice(n, 1);
  }), [e]), {
    ...e,
    toast: Ik,
    dismiss: (n) => wn({ type: "DISMISS_TOAST", toastId: n })
  };
}
function WM() {
  const { toasts: e } = $k();
  return /* @__PURE__ */ G(kk, { children: [
    e.map(function({ id: t, title: n, description: r, action: o, ...a }) {
      return /* @__PURE__ */ G(Cp, { ...a, children: [
        /* @__PURE__ */ G("div", { className: "grid gap-1", children: [
          n && /* @__PURE__ */ m(Np, { children: n }),
          r && /* @__PURE__ */ m(Pp, { children: r })
        ] }),
        o,
        /* @__PURE__ */ m(Ep, {})
      ] }, t);
    }),
    /* @__PURE__ */ m(Sp, {})
  ] });
}
var Wk = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function Fk(e) {
  const t = ({ children: n }) => /* @__PURE__ */ m(Je, { children: n });
  return t.displayName = `${e}.Slottable`, t.__radixId = Wk, t;
}
var [mo] = ye("Tooltip", [
  yt
]), po = yt(), Rp = "TooltipProvider", Lk = 700, ba = "tooltip.open", [Bk, Ds] = mo(Rp), kp = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = Lk,
    skipDelayDuration: r = 300,
    disableHoverableContent: o = !1,
    children: a
  } = e, s = l.useRef(!0), i = l.useRef(!1), c = l.useRef(0);
  return l.useEffect(() => {
    const u = c.current;
    return () => window.clearTimeout(u);
  }, []), /* @__PURE__ */ m(
    Bk,
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
      onPointerInTransitChange: l.useCallback((u) => {
        i.current = u;
      }, []),
      disableHoverableContent: o,
      children: a
    }
  );
};
kp.displayName = Rp;
var Rn = "Tooltip", [Vk, qn] = mo(Rn), Mp = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    disableHoverableContent: s,
    delayDuration: i
  } = e, c = Ds(Rn, e.__scopeTooltip), u = po(t), [d, f] = l.useState(null), p = he(), h = l.useRef(0), b = s ?? c.disableHoverableContent, g = i ?? c.delayDuration, v = l.useRef(!1), [w, y] = we({
    prop: r,
    defaultProp: o ?? !1,
    onChange: (N) => {
      N ? (c.onOpen(), document.dispatchEvent(new CustomEvent(ba))) : c.onClose(), a == null || a(N);
    },
    caller: Rn
  }), x = l.useMemo(() => w ? v.current ? "delayed-open" : "instant-open" : "closed", [w]), S = l.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, v.current = !1, y(!0);
  }, [y]), E = l.useCallback(() => {
    window.clearTimeout(h.current), h.current = 0, y(!1);
  }, [y]), C = l.useCallback(() => {
    window.clearTimeout(h.current), h.current = window.setTimeout(() => {
      v.current = !0, y(!0), h.current = 0;
    }, g);
  }, [g, y]);
  return l.useEffect(() => () => {
    h.current && (window.clearTimeout(h.current), h.current = 0);
  }, []), /* @__PURE__ */ m(Vn, { ...u, children: /* @__PURE__ */ m(
    Vk,
    {
      scope: t,
      contentId: p,
      open: w,
      stateAttribute: x,
      trigger: d,
      onTriggerChange: f,
      onTriggerEnter: l.useCallback(() => {
        c.isOpenDelayedRef.current ? C() : S();
      }, [c.isOpenDelayedRef, C, S]),
      onTriggerLeave: l.useCallback(() => {
        b ? E() : (window.clearTimeout(h.current), h.current = 0);
      }, [E, b]),
      onOpen: S,
      onClose: E,
      disableHoverableContent: b,
      children: n
    }
  ) });
};
Mp.displayName = Rn;
var ya = "TooltipTrigger", Tp = l.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = qn(ya, n), a = Ds(ya, n), s = po(n), i = l.useRef(null), c = q(t, i, o.onTriggerChange), u = l.useRef(!1), d = l.useRef(!1), f = l.useCallback(() => u.current = !1, []);
    return l.useEffect(() => () => document.removeEventListener("pointerup", f), [f]), /* @__PURE__ */ m(Hn, { asChild: !0, ...s, children: /* @__PURE__ */ m(
      F.button,
      {
        "aria-describedby": o.open ? o.contentId : void 0,
        "data-state": o.stateAttribute,
        ...r,
        ref: c,
        onPointerMove: T(e.onPointerMove, (p) => {
          p.pointerType !== "touch" && !d.current && !a.isPointerInTransitRef.current && (o.onTriggerEnter(), d.current = !0);
        }),
        onPointerLeave: T(e.onPointerLeave, () => {
          o.onTriggerLeave(), d.current = !1;
        }),
        onPointerDown: T(e.onPointerDown, () => {
          o.open && o.onClose(), u.current = !0, document.addEventListener("pointerup", f, { once: !0 });
        }),
        onFocus: T(e.onFocus, () => {
          u.current || o.onOpen();
        }),
        onBlur: T(e.onBlur, o.onClose),
        onClick: T(e.onClick, o.onClose)
      }
    ) });
  }
);
Tp.displayName = ya;
var Os = "TooltipPortal", [Hk, Yk] = mo(Os, {
  forceMount: void 0
}), _p = (e) => {
  const { __scopeTooltip: t, forceMount: n, children: r, container: o } = e, a = qn(Os, t);
  return /* @__PURE__ */ m(Hk, { scope: t, forceMount: n, children: /* @__PURE__ */ m(ve, { present: n || a.open, children: /* @__PURE__ */ m(Wt, { asChild: !0, container: o, children: r }) }) });
};
_p.displayName = Os;
var rn = "TooltipContent", Dp = l.forwardRef(
  (e, t) => {
    const n = Yk(rn, e.__scopeTooltip), { forceMount: r = n.forceMount, side: o = "top", ...a } = e, s = qn(rn, e.__scopeTooltip);
    return /* @__PURE__ */ m(ve, { present: r || s.open, children: s.disableHoverableContent ? /* @__PURE__ */ m(Op, { side: o, ...a, ref: t }) : /* @__PURE__ */ m(zk, { side: o, ...a, ref: t }) });
  }
), zk = l.forwardRef((e, t) => {
  const n = qn(rn, e.__scopeTooltip), r = Ds(rn, e.__scopeTooltip), o = l.useRef(null), a = q(t, o), [s, i] = l.useState(null), { trigger: c, onClose: u } = n, d = o.current, { onPointerInTransitChange: f } = r, p = l.useCallback(() => {
    i(null), f(!1);
  }, [f]), h = l.useCallback(
    (b, g) => {
      const v = b.currentTarget, w = { x: b.clientX, y: b.clientY }, y = qk(w, v.getBoundingClientRect()), x = Xk(w, y), S = Zk(g.getBoundingClientRect()), E = Jk([...x, ...S]);
      i(E), f(!0);
    },
    [f]
  );
  return l.useEffect(() => () => p(), [p]), l.useEffect(() => {
    if (c && d) {
      const b = (v) => h(v, d), g = (v) => h(v, c);
      return c.addEventListener("pointerleave", b), d.addEventListener("pointerleave", g), () => {
        c.removeEventListener("pointerleave", b), d.removeEventListener("pointerleave", g);
      };
    }
  }, [c, d, h, p]), l.useEffect(() => {
    if (s) {
      const b = (g) => {
        const v = g.target, w = { x: g.clientX, y: g.clientY }, y = (c == null ? void 0 : c.contains(v)) || (d == null ? void 0 : d.contains(v)), x = !Qk(w, s);
        y ? p() : x && (p(), u());
      };
      return document.addEventListener("pointermove", b), () => document.removeEventListener("pointermove", b);
    }
  }, [c, d, s, u, p]), /* @__PURE__ */ m(Op, { ...e, ref: a });
}), [Gk, jk] = mo(Rn, { isInside: !1 }), Uk = /* @__PURE__ */ Fk("TooltipContent"), Op = l.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: r,
      "aria-label": o,
      onEscapeKeyDown: a,
      onPointerDownOutside: s,
      ...i
    } = e, c = qn(rn, n), u = po(n), { onClose: d } = c;
    return l.useEffect(() => (document.addEventListener(ba, d), () => document.removeEventListener(ba, d)), [d]), l.useEffect(() => {
      if (c.trigger) {
        const f = (p) => {
          const h = p.target;
          h != null && h.contains(c.trigger) && d();
        };
        return window.addEventListener("scroll", f, { capture: !0 }), () => window.removeEventListener("scroll", f, { capture: !0 });
      }
    }, [c.trigger, d]), /* @__PURE__ */ m(
      $t,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: a,
        onPointerDownOutside: s,
        onFocusOutside: (f) => f.preventDefault(),
        onDismiss: d,
        children: /* @__PURE__ */ G(
          qr,
          {
            "data-state": c.stateAttribute,
            ...u,
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
              /* @__PURE__ */ m(Uk, { children: r }),
              /* @__PURE__ */ m(Gk, { scope: n, isInside: !0, children: /* @__PURE__ */ m(MP, { id: c.contentId, role: "tooltip", children: o || r }) })
            ]
          }
        )
      }
    );
  }
);
Dp.displayName = rn;
var Ap = "TooltipArrow", Kk = l.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = po(n);
    return jk(
      Ap,
      n
    ).isInside ? null : /* @__PURE__ */ m(Xr, { ...o, ...r, ref: t });
  }
);
Kk.displayName = Ap;
function qk(e, t) {
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
function Xk(e, t, n = 5) {
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
function Zk(e) {
  const { top: t, right: n, bottom: r, left: o } = e;
  return [
    { x: o, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: o, y: r }
  ];
}
function Qk(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let a = 0, s = t.length - 1; a < t.length; s = a++) {
    const i = t[a], c = t[s], u = i.x, d = i.y, f = c.x, p = c.y;
    d > r != p > r && n < (f - u) * (r - d) / (p - d) + u && (o = !o);
  }
  return o;
}
function Jk(e) {
  const t = e.slice();
  return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), eM(t);
}
function eM(e) {
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
var tM = kp, nM = Mp, rM = Tp, oM = _p, Ip = Dp;
const FM = tM, LM = nM, BM = rM, aM = l.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ m(oM, { children: /* @__PURE__ */ m(
  Ip,
  {
    ref: r,
    sideOffset: t,
    className: P(
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
aM.displayName = Ip.displayName;
function VM({
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
  const [c, u] = l.useState(!1), [d, f] = l.useState(t || ""), p = t !== void 0 ? t : d;
  return /* @__PURE__ */ G(Qd, { open: c, onOpenChange: u, children: [
    /* @__PURE__ */ m(Jd, { asChild: !0, children: /* @__PURE__ */ G(
      Mt,
      {
        variant: "outline",
        role: "combobox",
        "aria-expanded": c,
        disabled: i,
        className: P(
          "w-full justify-between bg-background border-border text-foreground font-medium hover:bg-muted hover:border-border-strong transition-all shadow-sm",
          !p && "text-muted-foreground font-normal",
          s
        ),
        children: [
          /* @__PURE__ */ m("span", { className: "truncate", children: p ? (h = e.find((b) => b.value === p)) == null ? void 0 : h.label : r }),
          /* @__PURE__ */ m(kg, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ m(bs, { className: "w-[var(--radix-popover-trigger-width)] p-0 border-border shadow-lg animate-in fade-in zoom-in-95 duration-200", children: /* @__PURE__ */ G(Ua, { className: "bg-background", children: [
      /* @__PURE__ */ m(nu, { placeholder: o, className: "h-11" }),
      /* @__PURE__ */ G(ru, { className: "max-h-[300px]", children: [
        /* @__PURE__ */ m(ou, { className: "py-6 text-center text-sm text-muted-foreground italic", children: a }),
        /* @__PURE__ */ m(au, { children: e.map((b) => /* @__PURE__ */ m(
          su,
          {
            value: b.label,
            onSelect: () => {
              const g = b.value === p ? "" : b.value;
              t === void 0 && f(g), n == null || n(g), u(!1);
            },
            className: P(
              "flex items-center justify-between px-3 py-2 cursor-pointer transition-colors",
              p === b.value ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted"
            ),
            children: /* @__PURE__ */ G("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ m(
                Tr,
                {
                  className: P(
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
function HM({ data: e, columns: t, className: n, ...r }) {
  return /* @__PURE__ */ m("div", { className: P("w-full overflow-auto rounded-lg border border-border bg-background shadow-sm", n), ...r, children: /* @__PURE__ */ G("table", { className: "w-full caption-bottom text-sm border-collapse", children: [
    /* @__PURE__ */ m("thead", { className: "bg-muted/50 border-b-2 border-border", children: /* @__PURE__ */ G("tr", { className: "transition-colors", children: [
      t.map((o) => /* @__PURE__ */ m(
        "th",
        {
          className: "h-12 px-4 text-left align-middle font-extrabold text-foreground uppercase tracking-widest text-[9.5px]",
          children: o.label
        },
        o.key
      )),
      /* @__PURE__ */ m("th", { className: "h-12 px-4 text-right align-middle font-extrabold text-foreground uppercase tracking-widest text-[9.5px]", children: "Aksi" })
    ] }) }),
    /* @__PURE__ */ m("tbody", { className: "bg-background [&_tr:last-child]:border-0", children: e.map((o, a) => /* @__PURE__ */ G(
      "tr",
      {
        className: "border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        children: [
          t.map((s) => /* @__PURE__ */ m("td", { className: "p-4 align-middle text-foreground font-medium", children: s.render ? s.render(o[s.key], o) : o[s.key] }, s.key)),
          /* @__PURE__ */ m("td", { className: "p-4 align-middle text-right", children: /* @__PURE__ */ m(Mt, { variant: "ghost", size: "sm", className: "text-primary hover:text-primary/80 font-bold h-7 px-2", children: "Edit" }) })
        ]
      },
      a
    )) })
  ] }) });
}
function YM({
  date: e,
  onChange: t,
  placeholder: n = "Pilih tanggal",
  className: r,
  disabled: o = !1,
  clearable: a = !0
}) {
  const [s, i] = l.useState(e), c = e !== void 0 ? e : s, u = (f) => {
    e === void 0 && i(f), t == null || t(f);
  }, d = (f) => {
    f.stopPropagation(), u(void 0);
  };
  return /* @__PURE__ */ G(Qd, { children: [
    /* @__PURE__ */ m(Jd, { asChild: !0, children: /* @__PURE__ */ G(
      Mt,
      {
        variant: "outline",
        disabled: o,
        className: P(
          "w-full justify-start text-left font-medium border-border bg-background hover:bg-muted hover:border-border-strong transition-all shadow-sm group",
          !c && "text-muted-foreground font-normal",
          r
        ),
        children: [
          /* @__PURE__ */ m(Pg, { className: "mr-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" }),
          /* @__PURE__ */ m("span", { className: "flex-1 truncate", children: c ? Kt(c, "dd MMMM yyyy", { locale: by }) : n }),
          a && c && !o && /* @__PURE__ */ m(
            Or,
            {
              className: "h-3 w-3 ml-2 opacity-40 hover:opacity-100 transition-opacity",
              onClick: d
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ m(bs, { className: "w-auto p-0 border-border shadow-xl animate-in fade-in slide-in-from-top-2 duration-200", align: "start", children: /* @__PURE__ */ m(
      Vw,
      {
        mode: "single",
        selected: c,
        onSelect: u,
        initialFocus: !0,
        className: "bg-background rounded-md"
      }
    ) })
  ] });
}
function sM({ className: e }) {
  return /* @__PURE__ */ G(
    "svg",
    {
      viewBox: "0 0 200 160",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: e,
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ m("line", { x1: "0", y1: "80", x2: "200", y2: "80", stroke: "hsl(var(--border-subtle))", strokeWidth: "1" }),
        /* @__PURE__ */ m("line", { x1: "100", y1: "0", x2: "100", y2: "160", stroke: "hsl(var(--border-subtle))", strokeWidth: "1" }),
        /* @__PURE__ */ m("rect", { x: "60", y: "50", width: "70", height: "85", rx: "3", fill: "hsl(var(--warm-100-hsl))", stroke: "hsl(var(--border-default))", strokeWidth: "1.5" }),
        /* @__PURE__ */ m("rect", { x: "55", y: "44", width: "70", height: "85", rx: "3", fill: "hsl(var(--surface-raised))", stroke: "hsl(var(--border-default))", strokeWidth: "1.5" }),
        /* @__PURE__ */ m("rect", { x: "50", y: "38", width: "70", height: "85", rx: "3", fill: "hsl(var(--surface-raised))", stroke: "hsl(var(--border-strong))", strokeWidth: "1.5" }),
        /* @__PURE__ */ m("line", { x1: "62", y1: "58", x2: "108", y2: "58", stroke: "hsl(var(--border-default))", strokeWidth: "1.5", strokeLinecap: "round" }),
        /* @__PURE__ */ m("line", { x1: "62", y1: "68", x2: "100", y2: "68", stroke: "hsl(var(--border-default))", strokeWidth: "1.5", strokeLinecap: "round" }),
        /* @__PURE__ */ m("line", { x1: "62", y1: "78", x2: "104", y2: "78", stroke: "hsl(var(--border-default))", strokeWidth: "1.5", strokeLinecap: "round" }),
        /* @__PURE__ */ m("line", { x1: "62", y1: "88", x2: "95", y2: "88", stroke: "hsl(var(--border-default))", strokeWidth: "1.5", strokeLinecap: "round" }),
        /* @__PURE__ */ m("circle", { cx: "152", cy: "36", r: "12", fill: "hsl(var(--amber-100))" }),
        /* @__PURE__ */ m("circle", { cx: "152", cy: "36", r: "6", fill: "hsl(var(--amber-400))" })
      ]
    }
  );
}
function iM({ className: e }) {
  return /* @__PURE__ */ G("svg", { viewBox: "0 0 200 160", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: e, "aria-hidden": "true", children: [
    /* @__PURE__ */ m("line", { x1: "0", y1: "80", x2: "200", y2: "80", stroke: "hsl(var(--border-subtle))", strokeWidth: "1" }),
    /* @__PURE__ */ m("circle", { cx: "90", cy: "72", r: "38", fill: "hsl(var(--surface-raised))", stroke: "hsl(var(--border-strong))", strokeWidth: "2" }),
    /* @__PURE__ */ m("circle", { cx: "90", cy: "72", r: "24", fill: "hsl(var(--warm-50-hsl))" }),
    /* @__PURE__ */ m("line", { x1: "120", y1: "101", x2: "150", y2: "130", stroke: "hsl(var(--border-strong))", strokeWidth: "3", strokeLinecap: "round" }),
    /* @__PURE__ */ m("line", { x1: "80", y1: "65", x2: "100", y2: "65", stroke: "hsl(var(--border-default))", strokeWidth: "1.5", strokeLinecap: "round" }),
    /* @__PURE__ */ m("line", { x1: "80", y1: "73", x2: "95", y2: "73", stroke: "hsl(var(--border-default))", strokeWidth: "1.5", strokeLinecap: "round" }),
    /* @__PURE__ */ m("circle", { cx: "148", cy: "128", r: "8", fill: "hsl(var(--amber-400))" })
  ] });
}
function cM({ className: e }) {
  return /* @__PURE__ */ G("svg", { viewBox: "0 0 200 160", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: e, "aria-hidden": "true", children: [
    /* @__PURE__ */ m("line", { x1: "0", y1: "80", x2: "200", y2: "80", stroke: "hsl(var(--border-subtle))", strokeWidth: "1" }),
    /* @__PURE__ */ m("rect", { x: "60", y: "35", width: "80", height: "90", rx: "4", fill: "hsl(var(--surface-raised))", stroke: "hsl(var(--crimson-300))", strokeWidth: "2" }),
    /* @__PURE__ */ m("rect", { x: "60", y: "35", width: "80", height: "24", rx: "4", fill: "hsl(var(--crimson-50))" }),
    /* @__PURE__ */ m("rect", { x: "60", y: "47", width: "80", height: "12", fill: "hsl(var(--crimson-50))" }),
    /* @__PURE__ */ m("line", { x1: "95", y1: "80", x2: "105", y2: "90", stroke: "hsl(var(--crimson-600))", strokeWidth: "2.5", strokeLinecap: "round" }),
    /* @__PURE__ */ m("line", { x1: "105", y1: "80", x2: "95", y2: "90", stroke: "hsl(var(--crimson-600))", strokeWidth: "2.5", strokeLinecap: "round" }),
    /* @__PURE__ */ m("circle", { cx: "100", cy: "105", r: "3", fill: "hsl(var(--crimson-400))" }),
    /* @__PURE__ */ m("line", { x1: "100", y1: "96", x2: "100", y2: "103", stroke: "hsl(var(--crimson-400))", strokeWidth: "2", strokeLinecap: "round" })
  ] });
}
const lM = {
  empty: sM,
  search: iM,
  error: cM
};
function zM({
  illustration: e = "empty",
  title: t,
  description: n,
  action: r,
  secondaryAction: o,
  className: a,
  compact: s = !1
}) {
  const i = typeof e == "string" ? lM[e] : null;
  return /* @__PURE__ */ G(
    "div",
    {
      className: P(
        "flex flex-col items-center justify-center text-center",
        s ? "gap-3 py-8 px-4" : "gap-4 py-16 px-6",
        a
      ),
      children: [
        i ? /* @__PURE__ */ m(i, { className: P(s ? "w-28 h-24" : "w-40 h-32") }) : e,
        /* @__PURE__ */ G("div", { className: "space-y-1.5 max-w-sm", children: [
          /* @__PURE__ */ m(
            "h3",
            {
              className: P(
                "font-semibold text-content-primary",
                s ? "text-body-sm" : "text-h3"
              ),
              children: t
            }
          ),
          n && /* @__PURE__ */ m("p", { className: P("text-content-secondary", s ? "text-caption" : "text-body-sm"), children: n })
        ] }),
        (r || o) && /* @__PURE__ */ G("div", { className: "flex items-center gap-2 flex-wrap justify-center", children: [
          r && /* @__PURE__ */ m(
            Mt,
            {
              variant: r.variant ?? "default",
              size: s ? "sm" : "default",
              onClick: r.onClick,
              children: r.label
            }
          ),
          o && /* @__PURE__ */ m(Mt, { variant: "ghost", size: s ? "sm" : "default", onClick: o.onClick, children: o.label })
        ] })
      ]
    }
  );
}
export {
  mM as Accordion,
  Wg as AccordionContent,
  Ig as AccordionItem,
  $g as AccordionTrigger,
  Bg as Alert,
  Hg as AlertDescription,
  Vg as AlertTitle,
  _c as Avatar,
  Dc as AvatarFallback,
  uv as AvatarGroup,
  lv as AvatarImage,
  pM as Badge,
  VM as BpsCombobox,
  HM as BpsDataTable,
  YM as BpsDatePicker,
  fv as Breadcrumb,
  bv as BreadcrumbEllipsis,
  pv as BreadcrumbItem,
  hv as BreadcrumbLink,
  mv as BreadcrumbList,
  gv as BreadcrumbPage,
  vv as BreadcrumbSeparator,
  Mt as Button,
  Vw as Calendar,
  Yw as Card,
  Uw as CardContent,
  jw as CardDescription,
  Kw as CardFooter,
  zw as CardHeader,
  Gw as CardTitle,
  Jw as Checkbox,
  Ua as Command,
  bM as CommandDialog,
  ou as CommandEmpty,
  au as CommandGroup,
  nu as CommandInput,
  su as CommandItem,
  ru as CommandList,
  US as CommandSeparator,
  KS as CommandShortcut,
  VS as Dialog,
  vM as DialogClose,
  tu as DialogContent,
  jS as DialogDescription,
  zS as DialogFooter,
  YS as DialogHeader,
  eu as DialogOverlay,
  HS as DialogPortal,
  GS as DialogTitle,
  gM as DialogTrigger,
  yM as DropdownMenu,
  WE as DropdownMenuCheckboxItem,
  IE as DropdownMenuContent,
  xM as DropdownMenuGroup,
  $E as DropdownMenuItem,
  LE as DropdownMenuLabel,
  SM as DropdownMenuPortal,
  EM as DropdownMenuRadioGroup,
  FE as DropdownMenuRadioItem,
  BE as DropdownMenuSeparator,
  VE as DropdownMenuShortcut,
  CM as DropdownMenuSub,
  AE as DropdownMenuSubContent,
  OE as DropdownMenuSubTrigger,
  wM as DropdownMenuTrigger,
  zM as EmptyState,
  NM as Form,
  cN as FormControl,
  lN as FormDescription,
  PM as FormField,
  sN as FormItem,
  iN as FormLabel,
  uN as FormMessage,
  dN as Input,
  Fd as Label,
  fN as Pagination,
  mN as PaginationContent,
  vN as PaginationEllipsis,
  pN as PaginationItem,
  gs as PaginationLink,
  gN as PaginationNext,
  hN as PaginationPrevious,
  Qd as Popover,
  bs as PopoverContent,
  Jd as PopoverTrigger,
  qN as Progress,
  sP as RadioGroup,
  iP as RadioGroupItem,
  xP as ScrollArea,
  Af as ScrollBar,
  RM as Select,
  aR as SelectContent,
  kM as SelectGroup,
  iR as SelectItem,
  sR as SelectLabel,
  ym as SelectScrollDownButton,
  bm as SelectScrollUpButton,
  cR as SelectSeparator,
  oR as SelectTrigger,
  MM as SelectValue,
  pR as Separator,
  TM as Sheet,
  DM as SheetClose,
  vR as SheetContent,
  xR as SheetDescription,
  yR as SheetFooter,
  bR as SheetHeader,
  Sm as SheetOverlay,
  hR as SheetPortal,
  wR as SheetTitle,
  _M as SheetTrigger,
  OM as Skeleton,
  BR as Slider,
  AM as Spinner,
  IM as StatusBadge,
  KR as Switch,
  qR as Table,
  ZR as TableBody,
  nk as TableCaption,
  tk as TableCell,
  QR as TableFooter,
  ek as TableHead,
  XR as TableHeader,
  JR as TableRow,
  $M as Tabs,
  ck as TabsContent,
  sk as TabsList,
  ik as TabsTrigger,
  lk as Textarea,
  Cp as Toast,
  Tk as ToastAction,
  Ep as ToastClose,
  Pp as ToastDescription,
  kk as ToastProvider,
  Np as ToastTitle,
  Sp as ToastViewport,
  WM as Toaster,
  LM as Tooltip,
  aM as TooltipContent,
  FM as TooltipProvider,
  BM as TooltipTrigger,
  hr as buttonVariants,
  P as cn,
  Jr as useFormField,
  $k as useToast
};
//# sourceMappingURL=index.js.map
