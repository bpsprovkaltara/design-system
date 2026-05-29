# Data storage

This project has no database. It is a frontend UI component library and a static single-page application. No data is persisted, queried, or migrated.

The closest analogue to a "schema" in this codebase is the **design token system** defined in `colors_and_type.css`. This document describes that token architecture.

---

## Design token architecture

Tokens are CSS custom properties (`--token-name: value`) declared in `colors_and_type.css`. They are the authoritative source for all colors and are consumed by Tailwind utility classes and component styles.

All token values use **bare HSL components** (no `hsl()` wrapper). Usage pattern:

```css
/* definition */
--navy-800: 214 52% 20%;

/* usage in CSS */
color: hsl(var(--navy-800));

/* usage in Tailwind (via theme extension) */
class="text-navy-800"

/* with opacity modifier */
class="bg-primary/50"
/* equivalent to: background-color: hsl(var(--primary) / 0.5) */
```

---

## Layer A — primitive scales

Raw palette values. Do not reference these directly in component code — use Layer B semantic tokens instead.

| CSS variable pattern | Steps | Description |
|---|---|---|
| `--navy-{n}` | 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950 | Brand navy. `--navy-800` is the primary brand color. |
| `--amber-{n}` | 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950 | Amber accent. `--amber-500` is the BPS Orange brand. |
| `--emerald-{n}` | 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950 | Positive / green data. `--emerald-500` is BPS Green brand. |
| `--crimson-{n}` | 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950 | Destructive / error. `--crimson-600` is the destructive base. |
| `--slate-{n}` | 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950 | Neutral gray for text and borders. |
| `--warm-50-hsl`, `--warm-100-hsl`, `--warm-200-hsl` | — | Paper-toned off-whites. **See exception note below.** |

### Exception: warm-* tokens

The `--warm-*` tokens have a special dual-variable pattern:

```css
--warm-50-hsl:  33 20% 97%;          /* bare HSL — for opacity modifiers */
--warm-50:      hsl(var(--warm-50-hsl));  /* pre-wrapped — use as var(--warm-50) */
```

When you need a direct CSS value (e.g. `background: var(--warm-50)`), use the pre-wrapped form.
When you need opacity modifier support (e.g. `hsl(var(--warm-50-hsl) / 0.5)`), use the `-hsl` form.
**Never** write `hsl(var(--warm-50))` — that wraps an already-wrapped value and produces invalid CSS.

---

## Layer B — semantic tokens

Role-based aliases. Reference these in all component and application code.

| Group | Tokens |
|---|---|
| Surface | `--surface-canvas`, `--surface-raised`, `--surface-sunken`, `--surface-inverse`, `--surface-overlay` |
| Content (text) | `--content-primary`, `--content-secondary`, `--content-tertiary`, `--content-disabled`, `--content-inverse`, `--content-brand`, `--content-accent` |
| Border | `--border-subtle`, `--border-default`, `--border-strong`, `--border-brand`, `--border-focus` |
| Brand | `--brand-primary`, `--brand-primary-fg`, `--brand-accent`, `--brand-accent-fg` |
| Feedback | `--feedback-success`, `--feedback-success-bg`, `--feedback-warning`, `--feedback-warning-bg`, `--feedback-danger`, `--feedback-danger-bg`, `--feedback-info`, `--feedback-info-bg` |
| Data visualization | `--data-positive`, `--data-negative`, `--data-neutral`, `--data-warning`, `--data-highlight` |
| Chart series | `--chart-1` through `--chart-10` (colorblind-safe, BPS brand trio first) |
| Map choropleth | `--map-tier-0` through `--map-tier-5`, `--map-tier-active` |

---

## Layer C — component tokens (shadcn/ui compat)

These alias Layer B tokens onto the names that shadcn/ui components expect internally. Do not override these per-component — change Layer B instead.

| Token | Maps to |
|---|---|
| `--background` | `--surface-canvas` |
| `--foreground` | `--content-primary` |
| `--card` | `--warm-100-hsl` |
| `--card-foreground` | `--content-primary` |
| `--popover` | `--surface-raised` |
| `--primary` | `--brand-primary` |
| `--primary-foreground` | `--navy-50` |
| `--secondary` | `--slate-600` |
| `--muted` | `--warm-100-hsl` |
| `--muted-foreground` | `--content-secondary` |
| `--accent` | `--brand-accent` |
| `--destructive` | `--crimson-600` |
| `--success` | `--feedback-success` |
| `--warning` | `--feedback-warning` |
| `--info` | `--feedback-info` |
| `--border` | `--border-subtle` |
| `--input` | `--border-subtle` |
| `--ring` | `--border-focus` |
| `--radius` | `0.5rem` |

Dark mode overrides all Layer B and Layer C tokens under a `.dark { }` selector in the same file.

---

## Authoritative source

`colors_and_type.css` at the repository root is the single source of truth for all token values and Tailwind 4 CSS-first configuration. Define design tokens there with CSS variables, then expose Tailwind utilities through `@theme` or `@utility`. The `tailwind-preset.ts` export is only a deprecated compatibility shim.
