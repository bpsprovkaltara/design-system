---
name: BPS Kaltara
description: The visual tokens of @bpsprovkaltara/design-system, so that consumer applications stay on the system.
colors:
  surface-canvas: "hsl(33 20% 97%)"
  surface-raised: "hsl(0 0% 100%)"
  surface-sunken: "hsl(34 29% 94%)"
  surface-inverse: "hsl(215 60% 13%)"
  surface-overlay: "hsl(218 70% 8%)"
  content-primary: "hsl(215 60% 13%)"
  content-secondary: "hsl(215 19% 35%)"
  content-tertiary: "hsl(215 20% 65%)"
  content-disabled: "hsl(213 27% 84%)"
  content-inverse: "hsl(0 0% 100%)"
  content-brand: "hsl(214 52% 20%)"
  content-accent: "hsl(28 87% 37%)"
  border-subtle: "hsl(36 30% 89%)"
  border-default: "hsl(214 32% 91%)"
  border-strong: "hsl(213 27% 84%)"
  border-brand: "hsl(214 52% 20%)"
  border-focus: "hsl(214 52% 20%)"
  brand-primary: "hsl(214 52% 20%)"
  brand-primary-fg: "hsl(0 0% 100%)"
  brand-accent: "hsl(35 93% 54%)"
  brand-accent-fg: "hsl(218 70% 8%)"
  primary-foreground: "hsl(210 40% 98%)"
  card: "hsl(34 29% 94%)"
  feedback-success: "hsl(161 94% 30%)"
  feedback-success-bg: "hsl(152 81% 96%)"
  feedback-warning: "hsl(32 95% 44%)"
  feedback-warning-bg: "hsl(40 100% 97%)"
  feedback-danger: "hsl(0 72% 51%)"
  feedback-danger-bg: "hsl(0 86% 97%)"
  feedback-info: "hsl(214 89% 40%)"
  feedback-info-bg: "hsl(214 100% 96%)"
  data-positive: "hsl(160 84% 39%)"
  data-negative: "hsl(0 72% 51%)"
  data-neutral: "hsl(215 20% 65%)"
  data-warning: "hsl(35 93% 54%)"
  data-highlight: "hsl(38 96% 73%)"
  chart-1: "hsl(196 100% 40%)"
  chart-2: "hsl(35 93% 54%)"
  chart-3: "hsl(160 84% 39%)"
typography:
  display-2xl:
    fontFamily: "Fraunces, Georgia, 'Times New Roman', serif"
    fontSize: "4.5rem"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  display-xl:
    fontFamily: "Fraunces, Georgia, 'Times New Roman', serif"
    fontSize: "3.5rem"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.018em"
  display:
    fontFamily: "Fraunces, Georgia, 'Times New Roman', serif"
    fontSize: "2.5rem"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.008em"
  title-sm:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.005em"
  body-lg:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  button:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.5
  label:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.4
  caption:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
  micro:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.05em"
  mono:
    fontFamily: "IBM Plex Mono, 'JetBrains Mono', 'Cascadia Code', monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "tnum"
rounded:
  none: "0"
  xs: "0.125rem"
  sm: "0.25rem"
  md: "0.375rem"
  lg: "0.5rem"
  xl: "0.625rem"
  full: "9999px"
spacing:
  0: "0px"
  0-5: "0.125rem"
  1: "0.25rem"
  1-5: "0.375rem"
  2: "0.5rem"
  3: "0.75rem"
  4: "1rem"
  5: "1.25rem"
  6: "1.5rem"
  8: "2rem"
  10: "2.5rem"
  12: "3rem"
  16: "4rem"
  20: "5rem"
  24: "6rem"
  inline-xs: "0.5rem"
  inline-sm: "0.75rem"
  inline-md: "1rem"
  inline-lg: "1.5rem"
  stack-xs: "0.5rem"
  stack-sm: "1rem"
  stack-md: "2rem"
  stack-lg: "3rem"
  inset-sm: "0.75rem"
  inset-md: "1rem"
  inset-lg: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.brand-primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "36px"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.content-primary}"
    rounded: "{rounded.xl}"
    padding: "24px"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.content-primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "4px 12px"
    height: "36px"
    width: "100%"
  badge:
    backgroundColor: "{colors.brand-primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: "2px 8px"
---

# Design System: BPS Kaltara

## Identity and character

The incumbent visual form is **Civic Editorial × Data-First Swiss**:
navy–amber, warm surfaces, editorial display type, and an orderly arrangement of data.

This file records the visual tokens of `@bpsprovkaltara/design-system` so that consumer applications stay on the system. The values in the frontmatter are the light mode (`:root`) after the semantic aliases are resolved into HSL channels. The source of those channels is `tokens.css`. The primitive scales are only used to define the semantic tokens, not to be colored directly in components.

The package is CSS-first (Tailwind 4). Consumers use the semantic tokens `surface`, `content`, `border`, `brand`, and `feedback`. The `.dark` mode overrides the same semantic tokens; the primitive scales do not change. Interface copy is in formal Indonesian, without emoji.

**Key characteristics:**

- Semantic tokens for components; primitives are only definition material.
- Colors are stored as raw HSL channels, used through `hsl(var(--token))`.
- Fraunces for display, IBM Plex Sans for the UI, IBM Plex Mono for numbers.
- Restrained radius and six navy-tinted elevation levels.
- Surface layers (canvas, sunken, raised) come before shadows.

## Visual stack

React, Tailwind CSS 4 CSS-first, shadcn/ui/Radix, and CSS motion. Fraunces for editorial display, IBM Plex Sans for the interface, and IBM Plex Mono for numbers. The normative source is tokens.css; the colors_and_type.css entry adds preflight. The Vite showcase uses a font link in index.html; the library does not load a CDN by default.

## Color tokens

The consumer palette is the light-mode semantic tokens. The frontmatter is already in the form `hsl(H S% L%)`. In CSS, the same value is stored without the `hsl()` wrapper, for example `214 52% 20%`.

### Primary

- **Brand navy** (hsl(214 52% 20%)): `brand-primary`, also `content-brand`, `border-brand`, and `border-focus`. The primary button background and the `brand` KPI accent.
- **Text on primary** (hsl(210 40% 98%)): `primary-foreground` (navy-50). This is the text of the default button and badge variants, not pure white.
- **Brand accent white** (hsl(0 0% 100%)): `brand-primary-fg`. Do not use it as the default button text.

### Secondary

- **Accent amber** (hsl(35 93% 54%)): `brand-accent`. The second accent, warning data, and the economy chart series.
- **Amber text** (hsl(28 87% 37%)): `content-accent`. Amber text that still has enough contrast; do not use amber-500 for small text on a light canvas.
- **Text on amber** (hsl(218 70% 8%)): `brand-accent-fg`.

### Neutrals

- **Canvas** (hsl(33 20% 97%)): `surface-canvas`. The page background.
- **Raised surface** (hsl(0 0% 100%)): `surface-raised`. A white panel. Not the default card background.
- **Card surface** (hsl(34 29% 94%)): `card` and `surface-sunken`. The default card uses `card`; inset areas use `surface-sunken`. Both resolve to warm-100 in light mode.
- **Primary text** (hsl(215 60% 13%)): `content-primary`. Also `surface-inverse`.
- **Secondary text** (hsl(215 19% 35%)): `content-secondary`. Descriptions and captions.
- **Tertiary text** (hsl(215 20% 65%)): `content-tertiary`. Placeholder.
- **Disabled text** (hsl(213 27% 84%)): `content-disabled`.
- **Inverse text** (hsl(0 0% 100%)): `content-inverse`. Text on a dark surface.
- **Subtle line** (hsl(36 30% 89%)): `border-subtle`. Also the input border (`--input` and shadcn `--border`).
- **Default line** (hsl(214 32% 91%)): `border-default`. The default card.
- **Strong line** (hsl(213 27% 84%)): `border-strong`.
- **Dark overlay** (hsl(218 70% 8%)): `surface-overlay`. The modal scrim.

### Tertiary

- **Chart blue** (hsl(196 100% 40%)): `chart-1`. The population series. Not a button color.
- **Data green** (hsl(160 84% 39%)): `data-positive` and `chart-3`. The agriculture series.
- **Chart amber** (hsl(35 93% 54%)): `chart-2`. The same as the accent amber; its role here is specific to the economy series.

### Feedback

- **Success** (hsl(161 94% 30%)): `feedback-success`, with the background `feedback-success-bg` (hsl(152 81% 96%)).
- **Warning** (hsl(32 95% 44%)): `feedback-warning`, with the background `feedback-warning-bg` (hsl(40 100% 97%)).
- **Danger** (hsl(0 72% 51%)): `feedback-danger` and `data-negative`, with the background `feedback-danger-bg` (hsl(0 86% 97%)).
- **Information** (hsl(214 89% 40%)): `feedback-info`, with the background `feedback-info-bg` (hsl(214 100% 96%)).
- **Neutral data** (hsl(215 20% 65%)): `data-neutral`.
- **Highlight data** (hsl(38 96% 73%)): `data-highlight`.

**The Semantic Token Rule.** Consumer components use `surface-*`, `content-*`, `border-*`, `brand-*`, `feedback-*`, and `data-*`. The primitive scales `navy`, `amber`, `emerald`, `crimson`, `slate`, and `warm` only define those tokens.

**The Bare Channel Rule.** Do not write hex in components. Channels are generally stored raw; they are used as `hsl(var(--token))` or Tailwind utilities, including opacity `hsl(var(--token) / 0.9)`. The wrapped warm-50/100/200 use the var directly or the -hsl channel.

The `.dark` mode replaces the semantic tokens (surfaces become dark navy, the brand becomes navy-300, feedback becomes a lighter step). Do not copy light values onto a dark surface.

### Three-layer token contract

The authority for values and themes is `tokens.css`; `colors_and_type.css` is only an all-in-one entry that imports the tokens together with the Tailwind preflight. The frontmatter records the extracted reuse token values, not a new scale.

| Layer | Tokens |
|---|---|
| A primitive | navy, amber, emerald, crimson, slate; warm-50/100/200 |
| B semantic | surface, content, border, brand, feedback, data; chart-1..10; map-tier-0..5 and active |
| C compatibility | background/foreground, card/card-foreground, popover, primary/primary-foreground, secondary, muted, accent, destructive, success/warning/info, border/input/ring; @theme to utilities |

The shadcn aliases physically live in the semantic block. background → surface-canvas; foreground/card-foreground → content-primary; card/muted → warm-100-hsl; popover → surface-raised; primary → brand-primary; primary-foreground → navy-50; secondary → slate-600; muted-foreground → content-secondary; accent → brand-accent; destructive → crimson-600; feedback aliases to feedback; border/input → border-subtle; ring → border-focus. The shadcn radius follows the actual radius-md, not the historical value of the database document. The old button/input-specific tokens have been removed.

**The warm exception.** warm-50/100/200 are already wrapped in hsl: use var(--warm-*) directly. If you need a channel/opacity, use hsl(var(--warm-*-hsl)). Do not use hsl(var(--warm-50)). The .dark mode replaces the semantics and aliases in the same source.


## Typography

**Display font:** Fraunces (fallback Georgia, 'Times New Roman', serif)

**Body font:** IBM Plex Sans (fallback system-ui, -apple-system, sans-serif)

**Mono font:** IBM Plex Mono (fallback JetBrains Mono, Cascadia Code, monospace)

**Character:** Editorial display uses Fraunces. The UI, headings, and body use IBM Plex Sans. Tabular numbers use IBM Plex Mono through the `.numeric` class. `fonts.css` is only an optional CDN; production self-hosts fonts.

### Hierarchy

- **Display 2xl** (500, 4.5rem, line-height 1.05, letter-spacing -0.02em): The top of the display scale.
- **Display xl** (500, 3.5rem, line-height 1.08, letter-spacing -0.018em): Large display.
- **Display** (500, 2.5rem, line-height 1.15, letter-spacing -0.015em): Display that still fits on an application page.
- **Headline** (600, 2rem, line-height 1.2, letter-spacing -0.01em): Heading 1. IBM Plex Sans, not Fraunces.
- **Title** (600, 1.5rem, line-height 1.3, letter-spacing -0.008em): Heading 2. `PageHeader` renders an `<h1>` with the class `.h2`, so the page title size is title, not headline.
- **Title sm** (600, 1.25rem, line-height 1.35, letter-spacing -0.005em): Heading 3.
- **Body** (400, 1rem, line-height 1.55): Running text. The document base is 16px.
- **Body sm** (400, 0.875rem, line-height 1.5): Control text and card descriptions.
- **Button** (500, 0.875rem, line-height 1.5): Button label. Body sm size with medium weight.
- **Label** (600, 0.8125rem, line-height 1.4): Form label (the class `.label`).
- **Caption** (500, 0.75rem, line-height 1.4): Badges and small notes.
- **Micro** (600, 0.6875rem, line-height 1.3, letter-spacing 0.05em): Table headers, uppercase.
- **Mono** (400, 0.875rem, line-height 1.5): Numbers and code. `.numeric` forces tabular-nums and right alignment.

**The Type Role Rule.** Fraunces is not used for buttons, inputs, or tables. IBM Plex Mono is not used for paragraphs. Application headings stay IBM Plex Sans.

## Layout

The base unit is 4px. Spacing steps: 0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, and 96px, matching the `--space-*` tokens in the frontmatter. Semantic spacing: inline xs–lg (8–24px), stack xs–lg (8–48px), inset sm–lg (12–24px).

Container widths: 640, 768, 1024, 1280, and 1536px. Shell: open sidebar 17.5rem (280px), collapsed sidebar 4rem (64px), topbar 4rem (64px). `PageHeader` stacks on narrow screens and becomes a row (title on the left, actions on the right) from 768px, with a 12px gap and 16px bottom padding.

**The Four Point Rule.** Do not invent spacing outside the `--space-*` scale. The padding of existing components (button 16px horizontal, card 24px) follows those steps.

### Depth and elevation

The main depth comes from color layers, not from heavy shadows. The warm canvas, sunken areas, and white surfaces already separate the planes. Shadows only lift controls and cards. The `--elevation-*` tokens do not change in `.dark`. The aliases `--shadow-xs` to `--shadow-xl` are replaced in `.dark` by deeper black shadows.

### Shadow vocabulary

- **Elevation 0** (`box-shadow: none`): A resting surface that relies only on the plane color.
- **Elevation 1** (`box-shadow: 0 1px 2px 0 rgba(8, 28, 52, 0.06)`): The smallest lift. The `surface` card variant uses this.
- **Elevation 2** (`box-shadow: 0 2px 4px 0 rgba(8, 28, 52, 0.06), 0 1px 2px 0 rgba(8, 28, 52, 0.04)`): The primary button at rest.
- **Elevation 3** (`box-shadow: 0 8px 16px -2px rgba(8, 28, 52, 0.08), 0 2px 4px 0 rgba(8, 28, 52, 0.04)`): The primary button on hover.
- **Elevation 4** (`box-shadow: 0 16px 32px -4px rgba(8, 28, 52, 0.12), 0 4px 8px -2px rgba(8, 28, 52, 0.06)`): Higher overlays.
- **Elevation 5** (`box-shadow: 0 24px 48px -6px rgba(8, 28, 52, 0.16), 0 8px 16px -4px rgba(8, 28, 52, 0.08)`): The top layer.
- **Shadow sm** (`box-shadow: 0 1px 3px 0 rgba(8, 28, 52, 0.06), 0 1px 2px -1px rgba(8, 28, 52, 0.04)`): The default card. Not a direct alias of elevation 1.

**The Surface Layer Rule.** Do not add new shadows to tell a card from the page. Use `surface-canvas`, `surface-sunken`, and `surface-raised` first. The shadows components use are elevation 0–5 and `shadow-sm` above.

### Shapes

Corners are institutional and small. There are no large corners as the default language.

- `none` (0) for planes that must be flat.
- `xs` (2px) rarely.
- `sm` (4px) for old badges and chips; the default badge is now a pill (`full`).
- `md` (6px) for buttons and inputs. Equal to the shadcn `--radius`.
- `lg` (8px) for lg-size buttons and dialogs.
- `xl` (10px) for the default card. The `rounded-xl` utility follows this token, not Tailwind's default 12px.
- `full` (9999px) for pill badges and avatars.

The `surface` card variant uses `rounded-2xl` (1rem on the Tailwind scale). That is not a `--radius-*` token of the package.

**The Restrained Radius Rule.** Buttons and inputs stay 6px. Do not swap the default card to a pill or to zero corners.

## Components

### Buttons

The primary button is solid, fixed height, medium label. The other variants (outline, tertiary, secondary, ghost, link, destructive, success, danger-outline, nav) are in `buttonVariants`; what is normative in the frontmatter is the primary.

- **Shape:** md corners (6px). The lg size goes up to lg (8px).
- **Primary:** `brand-primary` background, `primary-foreground` text, 36px height, 16px horizontal padding, elevation 2 shadow.
- **Hover / Focus:** Hover uses `primary` at 0.9 opacity, elevation 3, and moves up 1px. Active returns to elevation 1 without moving. Focus: a 2px `border-focus` line with a 2px offset. Disabled: 0.5 opacity.
- **Secondary / Ghost / Tertiary:** Secondary fills with `surface-sunken` with a subtle line. Outline and tertiary are bordered with `border-default` and fill sunken on hover. Ghost is text only, without a border.

### Cards

The default card is bordered with `border-default`, has a `card` background (warm-100, not white), `content-primary` text, xl corners (10px), and a `shadow-sm` shadow. The header and content have 24px padding; the content removes the top padding. The `surface` variant uses Tailwind 2xl corners, a `border-subtle` border, and elevation 1.

- **Corner Style:** xl on the default (10px).
- **Background:** the `card` token.
- **Shadow Strategy:** `shadow-sm` at rest. Not elevation 2.
- **Border:** `border-default`.
- **Internal Padding:** 24px.

### Inputs

36px height, full width, md corners, 4px 12px padding, transparent background, `border-subtle` border, elevation 1 shadow, body sm text. The placeholder uses `content-tertiary`. Focus is the same as the button: a 2px ring-token line, 2px offset. Disabled 0.5 opacity. `aria-invalid` moves the border to `feedback-danger`.

- **Style:** A subtle line, transparent background, 6px corners.
- **Focus:** A 2px `border-focus` ring, 2px offset.
- **Error / Disabled:** A danger border when invalid; 0.5 opacity when disabled.

### Badges

A pill (`rounded-full`), 2px 8px padding, caption with medium weight. Default: a primary background and `primary-foreground` text. Hover (`primary` at 0.9) only applies if the badge is rendered as a link. Focus follows the same 2px ring.

- **Style:** Pill, primary background, `primary-foreground` text.
- **State:** The secondary, destructive, outline, ghost, and link variants exist. The default recorded in the frontmatter is the primary.

### Page header

Not a manual heading. A flex container, 12px gap, a bottom line in the `--border` token (subtle), 16px bottom padding. From 768px up, the title and actions align at the bottom edge. The title is an `<h1>` with title typography (`.h2`), `content-primary` color. The description is `text-sm` (0.875rem), `content-secondary` color, 4px top gap. This component has no hover of its own.

- **Style:** A title row plus a description, with an actions slot.
- **Typography:** Title for the page title, not the headline scale.

### KPI card

A card with a numeric value. Without `accent`, the 4px left edge uses `brand-primary`. With `accent` (`brand`, `accent`, `success`, `info`, `warning`), the 4px bar on top uses the matching feedback or brand color, and the icon sits in a 28px chip with lg corners. Title: 12px, uppercase, 0.05em tracking, `content-secondary` color. Value: IBM Plex Mono, 1.5rem, weight 700, tabular, right-aligned. Note: 12px, `content-secondary`.

- **Corner Style:** Follows the default card (10px).
- **Background:** the `card` token.
- **Internal Padding:** The header and content 24px; the KPI header tightens the bottom padding to 8px.

## Motion

The source duration tokens: instant 50ms, fast 120ms, base 200ms, slow 320ms, slower 480ms, with the source CSS easing. prefers-reduced-motion in tokens.css lowers animation/transition; verify that interactive implementations still respect the preference. Do not add a JavaScript motion library; [ADR 0002](docs/adr/0002-no-motion-js-dependency.md) is immutable.

## Accessibility

Keep keyboard navigation, semantic HTML, labels, focus-visible/ARIA, SkipLink, and reduced motion. A dialog/sheet/command keeps an accessible title/description. Status and charts must not rely on color alone. The integration checklist in the guide checks contrast; there is no maintained evidence of a comprehensive formal WCAG audit. Component sizes and tokens are not automatic proof of compliance.

## Anti-references

### Do

- **Do** use the semantic tokens in consumer components: `surface`, `content`, `border`, `brand`, `feedback`, and `data`.
- **Do** store colors as raw HSL channels and use `hsl(var(--token))` or Tailwind utilities.
- **Do** import the package CSS exactly once at the root. Tailwind 4 uses `tokens.css` after `@import "tailwindcss"`. Non-Tailwind uses `styles.css`.
- **Do** write UI copy in formal Indonesian, without emoji, and format numbers with `Intl.NumberFormat('id-ID')`.
- **Do** rely on the same semantic tokens for light mode and `.dark`.

### Avoid

- **Avoid** hardcoding hex in consumer components.
- **Avoid** using the primitive scales (`navy`, `amber`, `emerald`, `crimson`, `slate`, `warm`) directly in components.
- **Avoid** importing `styles.css` and `tokens.css` together, and do not use `tailwind-preset` for a new integration.
- **Avoid** assuming the card background is white. The `card` token is warm-100; the white one is `surface-raised`.
- **Avoid** assuming the primary button text is `brand-primary-fg`. The default variant uses `primary-foreground`.
- **Avoid** loading `fonts.css` as a default. That file is an optional CDN.

## Usage notes

This section is a guide to **building a consumer application** with the package
`@bpsprovkaltara/design-system` — not how to develop the library itself.
The source of truth of the API is always `src/index.ts` at the tag in use; if
this document differs, follow `src/index.ts`.

### Choose the version first

There are two parallel release tracks. **Decide the version before writing code** — the APIs differ.

| | v3 (LTS) | v4 (latest) |
|---|---|---|
| Tailwind CSS | 3.4 | 4 |
| React | 18 | 19 |
| Node | ≥18 | ≥20 in the consumer application (repo tooling: Node 24, `.node-version`) |
| Theme / styling | preset (`tailwind-preset`) | CSS-first (`import 'styles.css'`) |
| Custom component names | prefixed `BpsX` | no prefix |
| dist-tag | `legacy` | `latest` |
| Source branch | `v3` | `main` |

A practical rule: a **Tailwind 4 + React 19** application → use **v4**. An old application still on
**Tailwind 3 / React 18** → use **v3**. Migrating between versions is **not drop-in** (see Migrating v3 to v4 below).

### Installation (GitHub Packages)

The package is published to **GitHub Packages** (a private registry), not public npm. The consumer
application needs an `.npmrc` that points the `@bpsprovkaltara` scope at that registry plus a
GitHub token with the `read:packages` permission.

`.npmrc` at the root of the consumer application:

```
@bpsprovkaltara:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

> Do not commit the token. Set `GITHUB_TOKEN` as an environment variable (or use
> an `.npmrc` in the home dir for local development).

Install according to the version:

```bash
# v4 (latest)
pnpm add @bpsprovkaltara/design-system@latest
# or pin: @^4

# v3 (LTS)
pnpm add @bpsprovkaltara/design-system@legacy
# or pin: @^3
```

Peer dependencies (install if not present):

```bash
# v4
pnpm add react@^19 react-dom@^19 tailwindcss@^4
# Optional form (if using Form + RHF/Zod):
pnpm add react-hook-form zod @hookform/resolvers
# v3
pnpm add react@^18 react-dom@^18 tailwindcss@^3.4
```

Supported subpaths (v4):

| Path | Contents |
|---|---|
| `@bpsprovkaltara/design-system` | Barrel + CSS side-effect |
| `.../components/ui/button` (etc.) | One UI module |
| `.../patterns/empty-state` | Pattern |
| `.../hooks/use-toast` | Hook |
| `.../utils` | `cn` and pure RSC-safe utilities |
| `.../styles.css` / `tokens.css` / `fonts.css` | CSS |

Do not use the old catch-all `@bpsprovkaltara/design-system/button` — use
`.../components/ui/button` or the main entry.

### Styling setup

Non-Tailwind uses the compiled `styles.css` once. Tailwind 4 that already has preflight uses `tokens.css` after `@import "tailwindcss"` plus `@source` to the package dist. A component subpath does not guarantee a CSS side effect; the consumer root must set up the import. Do not import both CSS entries together. Do not use the tailwind-preset shim for a new v4 integration.

Production fonts are provided by the consumer; `fonts.css` Google CDN is opt-in. The v3 examples use a compatibility preset of the legacy track, not a rule for v4.

### Public API (v4)

Import everything from the main entry point: `import { ... } from '@bpsprovkaltara/design-system'`.

**Utilities**: `cn`

**Primitives (shadcn/ui + Radix)** — Accordion, Alert, Avatar (+`AvatarGroup`), Badge,
Breadcrumb, Button (+`buttonVariants`, type `ButtonProps`), LinkButton (+type `LinkButtonProps`),
Calendar, Carousel (+type `CarouselApi`), Card (+`CardHeader`/`CardContent`/`CardFooter`/`CardTitle`/`CardDescription`),
Checkbox, Command, Dialog, DropdownMenu, Drawer, DescriptionList, FileUpload (+type `FileUploadProps`), Form
(+`FormField`/`FormItem`/`FormLabel`/`FormControl`/`FormDescription`/`FormMessage`/`useFormField`),
Input, Label, NavigationMenu, Pagination, Popover, Progress, RadioGroup, ScrollArea, Select,
Separator, Sheet, Skeleton, Slider, Spinner (+type `SpinnerProps`), StatusBadge (+`statusBadgeVariants`, type `StatusBadgeProps`), Switch, Table, Tabs, Textarea,
Toggle (+type `ToggleProps`), ToggleGroup (+types), Toast (+`Toaster`), Tooltip.

**Shell and interaction components**: `AppShell`, `AppSidebar`, `FormDialog`, `FormSheet`, `CommandSearch`, `NotificationPopover`, `SidebarAccount`, `ThemeToggle`, `ConfirmDialog`, `DocumentFilterBar`, `TableEmpty`, `TablePagination`. **Patterns**: `SectionCard`, `DataTableCard`, `FilterChips`, `SectionTabs`, `resolveActiveTab`, `PageSkeleton`. **Additional hooks**: `useTheme`, `usePersistedCollapsed`. The actual props and API: [docs/api.md](docs/api.md); the client boundary, asChild/renderLink: [docs/consumer-chrome.md](docs/consumer-chrome.md).

**BPS custom components**: `Combobox` (+`ComboboxProps`/`ComboboxOption`), `AppTopbar`,
`ConfirmActionDialog`, `BulkActionBar` (+`actions[]`), `DataStatePanel`, `DataTable`
(+`renderRowActions`, `sortable`, `pageSize`), `DatePicker`, `DateRangePicker`, `FilterBar`
(+`statusOptions`/`unitKerjaOptions`), `FormSection`, `KpiCard`, `PageHeader`,
`PerformanceCard` (+type `PerformanceCardProps`), `ProgressAudit`, `ReviewTimeline`,
`ValidationSummary`, `YearSelect`, `NumberField`, `MapLegend`, `SkipLink`.

**Charts**: `Sparkline`, `BarChart` (+types)

**Stepper**: `Stepper` (+`StepperProps`/`Step`/`StepStatus`)

**Patterns**: `EmptyState` (+type `EmptyStateProps`)

**Hooks**: `useToast`

> In **v3** the custom components use the `Bps` prefix (e.g. `BpsDataTable`, `BpsKpiCard`,
> `BpsStatusBadge` if applicable). Check `src/index.ts` at the v3 tag.

### Usage patterns

```tsx
import { Button, KpiCard, StatusBadge } from '@bpsprovkaltara/design-system'

export function Contoh() {
  return (
    <div className="space-y-4">
      <StatusBadge variant="approved">Disetujui</StatusBadge>
      <Button>Simpan</Button>
      <KpiCard title="Responden" value="1.240" helper="+8% bulan ini" />
    </div>
  )
}
```

- **Page header**: use `PageHeader`, do not assemble a heading by hand.
- **Data table**: `DataTable` supports `renderRowActions`, column sorting (`sortable`), and
  client-side pagination (`pageSize`). For full control, use the `Table` primitives.
- **Forms**: `Form` + `react-hook-form` + `zod` (optional peers; resolver via `@hookform/resolvers`).
- **Workflow status**: `StatusBadge` variant `draft` | `pending` | `revised` | `approved`
  (besides the general variants `default`/`secondary`/`destructive`/`outline`). The component needs
  children as text — `<StatusBadge variant="approved">Disetujui</StatusBadge>`.
- **Empty/loading/error state**: `EmptyState`, `DataStatePanel`, `Skeleton`, `Spinner`.
- **Local year / numbers**: `YearSelect`, `NumberField` (`id-ID` format).

### Migrating v3 to v4

1. Raise the peer deps: React 19, Tailwind 4, Node 20.
2. Replace the theme integration: remove `presets: [preset]` from `tailwind.config`, replace it with
   `@import '@bpsprovkaltara/design-system/tokens.css'` after `@import 'tailwindcss'`.
   `styles.css` is only for non-Tailwind consumers — do not import it together with `tokens.css`.
3. **Rename custom component imports**: remove the `Bps` prefix (`BpsDataTable` → `DataTable`,
   `BpsKpiCard` → `KpiCard`, etc.).
4. Adjust the Tailwind 4 utilities that changed (e.g. `outline-none` → `outline-hidden`).
5. The full checklist per framework (Vite, HTML, Laravel): `docs/upgrading.md`.
