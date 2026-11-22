# BPS Kaltara Design System consumption guide

The v4 integration guide, based on the current exports and CSS source. [DESIGN](../DESIGN.md) holds the normative tokens; the [API](api.md) holds the library contract. Chrome and framework link integration: [consumer-chrome](consumer-chrome.md); version changes: [upgrading](upgrading.md) and the [CHANGELOG](../CHANGELOG.md).

## Prerequisites and installation

Choose the track that fits the application: v4 React >=19/Tailwind >=4, Node >=20; v3 legacy React18/Tailwind3.4. The registry scope @bpsprovkaltara uses GitHub Packages, with read:packages credentials from the environment/home npmrc, and no committed token. The npmrc setup is in the [README](../README.md#mulai-cepat).

```bash
pnpm add @bpsprovkaltara/design-system@latest
# Optional peers if using Form:
pnpm add react-hook-form zod @hookform/resolvers
```

Use the exported package instead of copying a local primitive without a reason. You do not need to run the shadcn CLI to use the package components; components.json is only a generator configuration if the application maintains its own source.

## Choosing a stylesheet

| Consumer | Entry |
|---|---|
| Without a Tailwind pipeline | the compiled styles.css, with preflight |
| Tailwind4 that already has preflight | the source tokens.css, without preflight |
| Opt-in font CDN | fonts.css; not the default |

A Tailwind consumer needs the dist source to produce the component classes. The @source path is relative to the application's CSS file; adjust the real depth.

```css
@import "tailwindcss";
@import "@bpsprovkaltara/design-system/tokens.css";
@source "../node_modules/@bpsprovkaltara/design-system/dist";
@source "../src";
```

Do not import styles.css and tokens.css together. A component subpath does not guarantee that CSS comes along. The barrel loads the all-in-one CSS; use targeted module imports and the matching CSS choice if the application already manages the preflight. The v4 tailwind-preset is a deprecated shim, not a new setup.

## Next.js and React

The library/showcase repo is not Next.js. The consumer application still manages the layout, global CSS, auth, and router. Use a framework version compatible with the React19/Tailwind4 peers; framework scaffolding is not a script of this repository.

```tsx
import { Button } from '@bpsprovkaltara/design-system/components/ui/button'
import { FormSheet } from '@bpsprovkaltara/design-system/components/ui/form-sheet'

<FormSheet title="Edit aktivitas" trigger={<Button>Edit</Button>}>
  {(close) => <button onClick={close}>Tutup</button>}
</FormSheet>
```

A client boundary is needed for hooks/interaction; preserveModules keeps the use client directive. Pure utilities can be taken from the utils subpath. Navigation components use asChild/renderLink with the router link; do not add a Next dependency to the library. The full adapter table is in consumer-chrome.

## Static HTML/CSS

A browser does not process the @theme/@utility directives in the raw tokens.css. Use the compiled styles.css from the package or a Tailwind pipeline if processing tokens.css. CSS alone does not bring React components to life on an HTML page.

```html
<link rel="stylesheet" href="./assets/css/bps-styles.css">
<section class="bg-background text-foreground">Ringkasan</section>
```

bps-styles.css is a copy of the compiled styles.css of the chosen library version. Fonts are loaded separately; they are not automatically imported from the tokens.

## Laravel Blade and Vite

Blade can use the CSS tokens/utilities without the React primitives. If using Tailwind4, import tailwindcss and the package tokens.css, then @source views/js and the package dist with relative paths matching resources/css. Additional React integration is managed by the application itself.

```css
@import "tailwindcss";
@import "@bpsprovkaltara/design-system/tokens.css";
@source "../views";
@source "../js";
@source "../../node_modules/@bpsprovkaltara/design-system/dist";
```

The Blade layout loads the CSS through the application's Vite mechanism; a self-hosted font or an opt-in link/CDN is managed by the application, not automatic in the tokens.

## Colors and semantic tokens

Three layers: scale primitive → semantic role → shadcn/@theme aliases. Components use surface/content/border/brand/feedback/data/chart/map-tier, not the navy/amber scale directly.

```css
.panel {
  background: hsl(var(--surface-raised));
  color: hsl(var(--content-primary));
  border: 1px solid hsl(var(--border-default));
}
.notice { background: hsl(var(--feedback-warning-bg)); }
.tint { background: hsl(var(--brand-primary) / .1); }
.paper { background: var(--warm-50); }
```

Generally the values are bare HSL, wrapped in hsl when using var. The exception warm-50/100/200 are already wrapped: use var directly, or hsl(var(--warm-50-hsl)) for a channel. Do not double-wrap. The semantic primary uses the incumbent navy, card is warm-100; do not assume either is the old blue/white identity. Charts have ten series tokens; map-tier 0–5 and active. The actual light/.dark values are in tokens.css and DESIGN; do not maintain a copy of a value table that drifts.

## Fonts and typography

Fraunces for editorial display; IBM Plex Sans for UI headings, body, controls; IBM Plex Mono for numbers/code. The CSS font stack does not download fonts. The showcase uses the index.html link, production fonts are provided by the consumer (self-hosting or the framework's font mechanism); fonts.css is only the opt-in CDN path.

The typography/numeric utilities follow tokens.css. PageHeader renders an h1 with the class h2. Format numbers with Intl.NumberFormat('id-ID'); use tabular numerics for data. The fallback stays readable if the CDN is blocked. Do not give Fraunces to inputs or buttons.

## Layout, shapes, and motion

A four-point base scale, with normative spacing and radius in DESIGN/tokens.css. The default radius md for buttons/inputs, xl for cards; do not assume radius-xl equals the Tailwind default. Shell sidebar expanded 280px, collapsed 64px, topbar 64px. Semantic background and border separate surfaces before adding shadows.

The source transition tokens use fast/base/slow and motion-duration; reduced-motion lowers animation/transition. Do not add a JS motion library, according to ADR 0002.

## Light and dark

The .dark class replaces the semantic and compatibility tokens. The consumer manages the preference/persistence; ThemeToggle/useTheme are available for a pattern that fits the application. Check colors, labels/focus, and contrast in both modes. Framework hydration is the application's responsibility; do not use suppressHydrationWarning as a solution for other mismatches.

## Application patterns

- PageHeader for the title/actions; KpiCard/PerformanceCard for metrics.
- AppShell already provides the desktop toggle and the mobile menu; the logo/footer/topbar slots belong to the consumer.
- DataTable supports loading/error/empty, client-side sorting, client pageSize, and controlled server pagination; the data fetch stays in the app.
- A composable FilterBar uses FilterField search/select/custom or children; the DocumentFilterBar preset keeps the old domain API.
- FormDialog/FormSheet provide overlays; form validation uses the optional peers if needed.
- CommandSearch provides a panel and a shortcut; the app supplies results/fetch. CommandDialog commandProps can turn off the cmdk filter for server results.
- Tabs for in-page panels, SectionTabs for sibling routes with pathname/renderLink.
- StatusBadge uses children as text; status is not conveyed by color alone.
- EmptyState/DataStatePanel/PageSkeleton render states with actions that can be followed up.

The props contract and the full export list: the API, source declarations, and index.

## Integration checklist

- The package/peer versions match; registry credentials do not go into Git.
- One CSS entry is chosen, the dist source is right, and there is no double preflight.
- Fraunces/IBM Plex fonts are loaded or the fallback is readable.
- Link components use a router adapter; the server/client boundary is right.
- Keyboard/focus-visible, icon aria-label, form labels, and skip link are tested.
- Text contrast targets WCAG AA and the light/.dark states are tested; id-ID numbers and a clear null dash.
- Loading/error/empty/ready and reduced motion are tested.
- Auth/notification/search data still comes from the application, with no PII/credentials in logs.

A dashboard example: the [prototype](../ui_kits/dashboard/README.md); the prototype is not official production data.
