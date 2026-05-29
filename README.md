![version](https://img.shields.io/badge/version-4.0.0-blue) ![license](https://img.shields.io/badge/license-UNLICENSED-lightgrey) ![node](https://img.shields.io/badge/node-%3E%3D20-green)

# BPS Kaltara design system

Internal design system for BPS Provinsi Kalimantan Utara. Built on React 19, TypeScript, Tailwind CSS 4, and shadcn/ui (new-york style). Ships as an npm-installable library (`@bpsprovkaltara/design-system`) and as a live interactive showcase at [design.kaltarastats.id](https://design.kaltarastats.id).

Migrasi dari v3: lihat [UPGRADE_NOTES.md](./UPGRADE_NOTES.md).

The visual theme is **"Civic Editorial x Data-First Swiss"** — navy-primary (#1e3a5f), amber accent (#f59e0b), Fraunces display type, and IBM Plex Sans/Mono for body and code.

---

## Quick start

**Pilih versi** — dua jalur rilis di-maintain paralel (detail di [DESIGN.md](./DESIGN.md)):

| Versi | dist-tag | Untuk app | Branch |
|---|---|---|---|
| v4 (latest) | `latest` / `@^4` | Tailwind 4 + React 19 | `main` |
| v3 (LTS) | `legacy` / `@^3` | Tailwind 3 + React 18 | `v3` |

**Install** — paket dipublikasikan ke **GitHub Packages** (registry privat). Tambahkan
`.npmrc` di app konsumen lalu install:

```
@bpsprovkaltara:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

```bash
pnpm add @bpsprovkaltara/design-system@latest   # v4
# atau: pnpm add @bpsprovkaltara/design-system@legacy   # v3
```

Peer dependencies (install in the consumer app if not already present):

```bash
pnpm add react@^19 react-dom@^19 tailwindcss@^4
# proyek Vite: tambahkan @tailwindcss/vite sesuai dokumentasi Tailwind v4
```

**Import styles** — once, at app root:

```ts
import '@bpsprovkaltara/design-system/styles.css'
```

**Tailwind 4 di aplikasi Anda** — ikuti [dokumentasi Tailwind v4](https://tailwindcss.com/docs/installation) untuk stack Anda (misalnya tambahkan plugin `@tailwindcss/vite` pada `vite.config.ts`). Paket ini sudah CSS-first; ekspor `tailwind-preset` **deprecated** dan hanya shim kosong untuk kompatibilitas v3.

Contoh minimal entry CSS aplikasi (Vite):

```css
@import "tailwindcss";
```

Jika stylesheet design system diimpor dari CSS aplikasi, gunakan `@source` untuk source aplikasi Anda dan path paket bila perlu.

**Use components**:

```tsx
import { Button, KpiCard, StatusBadge } from '@bpsprovkaltara/design-system'

export function Example() {
  return (
    <div className="space-y-4">
      <StatusBadge variant="approved" />
      <Button>Simpan</Button>
      <KpiCard title="Responden" value="1.240" helper="+8% bulan ini" />
    </div>
  )
}
```

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript 6 |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 4 |
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
    components/  — per-component showcase pages, including Essential UI controls
    prototypes/  — full-page prototypes (Dashboard, Auth, List, Detail, Settings)
  test/          — setup.ts
  index.ts       — public library API
  main.tsx       — showcase app entry
  tailwind-preset.ts  — deprecated compatibility shim
colors_and_type.css   — design tokens + Tailwind 4 CSS-first directives
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

The library is for internal BPS use only (`"license": "UNLICENSED"`) and is published to
**GitHub Packages** (`https://npm.pkg.github.com`), not the public npm registry.

Rilis berjalan otomatis lewat `.github/workflows/release.yml` saat push tag `v*`: tag `v4.*`
dari branch `main` dipublikasikan dengan dist-tag `latest`, tag `v3.*` dari branch `v3`
dengan dist-tag `legacy`. Workflow memverifikasi `version` di `package.json` cocok dengan tag
sebelum publish. Bump versi `package.json` dilakukan manual sebelum membuat tag.

---

## Links

- Panduan AI agent konsumen: [DESIGN.md](./DESIGN.md)
- Showcase: https://design.kaltarastats.id
- Repository: https://github.com/bpsprovkaltara/design-system
- Issues: https://github.com/bpsprovkaltara/design-system/issues
- Architecture: `docs/architecture.md`
- Development guide: `docs/development.md`
- Deployment: `docs/deployment.md`
- Catatan rilis GitHub (salin tempel): `docs/releases/v4.0.0-github.md`
