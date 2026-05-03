# Architecture

The BPS Kaltara design system operates in two modes from a single codebase: as a **component library** consumed by BPS internal apps, and as a **showcase app** deployed to `design.kaltarastats.id` for browsing and referencing components.

---

## System context

```mermaid
C4Context
  title BPS Kaltara design system — system context

  Person(dev, "BPS Developer", "Builds internal BPS apps")
  Person(designer, "BPS Designer", "Reviews tokens and components")

  System(ds, "@bpsprovkaltara/design-system", "React component library + Tailwind preset. Exports components, tokens, and types.")
  System(showcase, "Showcase app", "Deployed at design.kaltarastats.id. Interactive component reference.")
  System_Ext(consumer, "BPS internal app", "Any internal BPS application that installs the library")

  Rel(dev, showcase, "Browses components, copies code")
  Rel(designer, showcase, "Reviews visual output")
  Rel(dev, consumer, "Builds")
  Rel(consumer, ds, "Imports components and styles")
  Rel(showcase, ds, "Renders all components")
```

---

## Design token layer diagram

Tokens flow from raw primitive values to semantic roles to component-specific overrides. Consumers should reference Layer B (semantic) tokens in their own code and never Layer A (primitive) directly.

```mermaid
flowchart TD
    A["Layer A — Primitives\n--navy-50 … --navy-950\n--amber-50 … --amber-950\n--emerald-50 … --emerald-950\n--crimson-50 … --crimson-950\n--warm-50 / --warm-100 / --warm-200\n--slate-50 … --slate-950"]
    B["Layer B — Semantic\n--surface-canvas / raised / sunken / inverse\n--content-primary / secondary / tertiary\n--brand-primary / accent\n--feedback-success / warning / danger / info\n--data-positive / negative / neutral\n--chart-1 … --chart-10\n--border-subtle / default / strong / brand"]
    C["Layer C — Component (shadcn compat)\n--background / --foreground\n--primary / --primary-foreground\n--secondary / --muted / --accent\n--destructive / --border / --ring\n--card / --popover / --input"]

    A -->|referenced by| B
    B -->|referenced by| C
    C -->|consumed by| D["Radix UI + shadcn/ui components\nBPS custom components\nConsumer app Tailwind classes"]
```

All token values are bare HSL components — no `hsl()` wrapper. Usage: `hsl(var(--token))`. Exception: `--warm-50`, `--warm-100`, `--warm-200` are pre-wrapped `hsl()` values and must be used as `var(--warm-*)` directly (see `docs/development.md` for details).

---

## Component dependency diagram

```mermaid
flowchart LR
    radix["Radix UI primitives"]
    shadcn["shadcn/ui components\n(owned source in src/components/ui/)"]
    custom["BPS custom components\n(BpsCombobox, BpsDataTable, etc.)"]
    patterns["Patterns\n(EmptyState)"]
    pages["Showcase pages\n(src/pages/)"]
    consumer["Consumer app"]

    radix --> shadcn
    shadcn --> custom
    shadcn --> patterns
    custom --> pages
    patterns --> pages
    shadcn --> consumer
    custom --> consumer
    patterns --> consumer
```

BPS custom components build on top of shadcn/ui primitives. They are not built on Radix UI directly. Patterns (`EmptyState`) use shadcn/ui `Button` and are self-contained.

---

## Key design decisions

### Why shadcn/ui (owned source)

shadcn/ui components are copied into `src/components/ui/` at install time — they are not a runtime dependency. This means the team owns and can freely modify every component without forking a library or waiting for upstream changes. The trade-off is that upstream shadcn/ui improvements must be manually pulled in.

See `docs/decisions/0001-record-architecture-decisions.md` for how future decisions should be recorded.

### Why a three-layer token system

Separating primitive scales (Layer A) from semantic roles (Layer B) from component aliases (Layer C) allows:
- Theming: swap Layer B values for a different visual theme without touching components.
- shadcn/ui compatibility: Layer C maps semantic tokens onto the `--primary`, `--background` names that shadcn components expect, so all components work without modification.
- Consistency: developers reference semantic tokens (`--content-primary`) rather than raw palette values (`--navy-900`), making intent explicit.

### Why Vite lib build

`vite.lib.config.ts` produces dual ESM (`dist/index.js`) and CJS (`dist/index.cjs`) outputs from a single build. `vite-plugin-dts` generates `dist/index.d.ts`. This covers both modern bundlers (ESM) and older toolchains (CJS require) without a separate Rollup configuration.

### Tailwind preset export pattern

The library exports a Tailwind preset at `@bpsprovkaltara/design-system/tailwind-preset`. Consumer apps add this as a `presets` entry in their `tailwind.config.ts`. This ensures all design tokens, custom scales, keyframes (`animate-shimmer`), and font families are available in the consumer without copy-pasting configuration.

---

## Build modes

| Mode | Command | Entry | Output |
|---|---|---|---|
| Showcase app | `pnpm dev` / `pnpm build` | `src/main.tsx` | `dist/` (SPA) |
| Library | `pnpm build:lib` | `src/index.ts` + `src/tailwind-preset.ts` | `dist/index.js`, `dist/index.cjs`, `dist/styles.css`, etc. |

Both modes use the same source. The library build excludes React from the bundle (external peer dependency). The showcase build bundles everything.
