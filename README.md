![version](https://img.shields.io/badge/version-3.0.0-blue) ![license](https://img.shields.io/badge/license-UNLICENSED-lightgrey) ![node](https://img.shields.io/badge/node-%3E%3D18-green)

# BPS Kaltara design system

Internal design system for BPS Provinsi Kalimantan Utara. Built on React 18, TypeScript, Tailwind CSS 3, and shadcn/ui (new-york style). Ships as an npm-installable library (`@bpsprovkaltara/design-system`) and as a live interactive showcase at [design.kaltarastats.id](https://design.kaltarastats.id).

The visual theme is **"Civic Editorial x Data-First Swiss"** — navy-primary (#1e3a5f), amber accent (#f59e0b), Fraunces display type, and IBM Plex Sans/Mono for body and code.

---

## Quick start

**Install**

```bash
pnpm add @bpsprovkaltara/design-system
```

Peer dependencies (install in the consumer app if not already present):

```bash
pnpm add react@^18 react-dom@^18 tailwindcss@^3.4
```

**Import styles** — once, at app root:

```ts
import '@bpsprovkaltara/design-system/styles.css'
```

**Configure Tailwind** (`tailwind.config.ts`):

```ts
import preset from '@bpsprovkaltara/design-system/tailwind-preset'

export default {
  presets: [preset],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@bpsprovkaltara/design-system/dist/**/*.js',
  ],
}
```

**Use components**:

```tsx
import { Button, StatusBadge, BpsKpiCard } from '@bpsprovkaltara/design-system'

export function Example() {
  return (
    <div className="space-y-4">
      <StatusBadge variant="approved" />
      <Button>Simpan</Button>
    </div>
  )
}
```

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Language | TypeScript 5.4 |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Component primitives | shadcn/ui (new-york) + Radix UI |
| Forms | react-hook-form + zod |
| Command palette | cmdk |
| Date | react-day-picker + date-fns |
| Icons | lucide-react |
| Testing | Vitest 4 + @testing-library/react + jsdom |
| Package manager | pnpm@10.30.0 |

---

## Folder structure

```
src/
  components/
    ui/          — all UI components (shadcn primitives + BPS custom)
    patterns/    — higher-level patterns (EmptyState)
    showcase/    — showcase helpers (SectionHeader, CodeBlock, ColorSwatch)
    layout/      — Sidebar.tsx (showcase app navigation)
  hooks/         — use-toast.ts
  layouts/       — ShowcaseLayout.tsx
  lib/           — utils.ts (cn helper)
  pages/
    overview/    — OverviewPage, InstallationPage
    foundations/ — ColorsPage, TypographyPage, SpacingPage
    components/  — per-component showcase pages
    prototypes/  — full-page prototypes (Dashboard, Auth, List, Detail, Settings)
  test/          — setup.ts
  index.ts       — public library API
  main.tsx       — showcase app entry
  tailwind-preset.ts  — exported Tailwind preset
colors_and_type.css   — all design tokens + Tailwind directives
design/
  DESIGN.md          — design reference
  design-tokens.json — token export
```

---

## Showcase app

```bash
pnpm install
pnpm dev        # http://localhost:5173
```

The showcase renders every component with live examples and copy-pasteable code blocks. All routes are documented in `docs/development.md`.

---

## Testing

```bash
pnpm test             # run all tests once
pnpm test:watch       # watch mode
pnpm test:coverage    # coverage report (v8, lcov + text)
```

Test files live next to components with the `.test.tsx` suffix. Coverage targets `src/components/**`.

---

## Build and release

```bash
pnpm build:lib
# outputs:
#   dist/index.js        (ESM)
#   dist/index.cjs       (CJS)
#   dist/index.d.ts      (types)
#   dist/styles.css
#   dist/tailwind-preset.js / .cjs / .d.ts
```

The library is for internal BPS use only (`"license": "UNLICENSED"`). There is no public npm registry publish.

---

## Links

- Showcase: https://design.kaltarastats.id
- Repository: https://github.com/bpsprovkaltara/design-system
- Issues: https://github.com/bpsprovkaltara/design-system/issues
- Architecture: `docs/architecture.md`
- Development guide: `docs/development.md`
- Deployment: `docs/deployment.md`

> [!todo] Need input from team: `CLAUDE.md` references the package as `@bpskaltara/design-system` but `package.json` is authoritative at `@bpsprovkaltara/design-system`. Update `CLAUDE.md` to align.
