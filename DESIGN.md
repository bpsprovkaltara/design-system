# DESIGN.md — Panduan AI Agent untuk `@bpsprovkaltara/design-system` (v3 LTS)

Dokumen ini ditujukan untuk **AI coding agent** (Claude Code, Cursor, Copilot, dll.) yang
**membangun aplikasi konsumen** menggunakan design system BPS Kaltara **versi 3 (LTS)**.
Fokusnya cara **memakai** library ini — bukan cara mengembangkannya.

> Anda membaca dokumentasi **branch v3 (Tailwind 3 + React 18)**. Untuk proyek baru dengan
> Tailwind 4 + React 19, gunakan **v4** (branch `main`, dist-tag `latest`).

Sumber kebenaran API selalu `src/index.ts` pada versi yang Anda pakai.

---

## 1. Matriks versi

| | v3 (LTS) — **dokumen ini** | v4 (latest) |
|---|---|---|
| Tailwind CSS | 3.4 | 4 |
| React | 18 | 19 |
| Node | ≥18 | ≥20 |
| Tema / styling | **preset** (`tailwind-preset`) | CSS-first (`import 'styles.css'`) |
| Nama komponen custom | **ber-prefix `BpsX`** | tanpa prefix |
| dist-tag | `legacy` | `latest` |
| Branch sumber | `v3` | `main` |

Migrasi v3 → v4 **bukan drop-in** (Tailwind 4 + rename komponen). Pertahankan v3 selama
aplikasi masih di Tailwind 3 / React 18.

---

## 2. Instalasi (GitHub Packages)

Paket dipublikasikan ke **GitHub Packages** (registry privat). Aplikasi konsumen butuh
`.npmrc` plus token GitHub dengan izin `read:packages`.

`.npmrc` di root aplikasi konsumen:

```
@bpsprovkaltara:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

> Jangan commit token. Set `GITHUB_TOKEN` sebagai environment variable.

Install versi v3:

```bash
pnpm add @bpsprovkaltara/design-system@legacy
# atau pin: @^3
```

Peer dependencies:

```bash
pnpm add react@^18 react-dom@^18 tailwindcss@^3.4
```

---

## 3. Setup styling (preset-based)

1. Impor stylesheet bawaan **sekali** di root aplikasi:
   ```ts
   import '@bpsprovkaltara/design-system/styles.css'
   ```
2. Daftarkan preset di `tailwind.config.ts` aplikasi:
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

---

## 4. API publik (v3)

Impor dari entry point utama: `import { ... } from '@bpsprovkaltara/design-system'`.

**Utilities**: `cn`

**Primitives (shadcn/ui + Radix)** — Accordion, Alert, Avatar (+`AvatarGroup`), Badge,
Breadcrumb, Button (+`buttonVariants`, type `ButtonProps`), Calendar, Card, Checkbox,
Command, Dialog, DropdownMenu, Form, Input, Label, Pagination, Popover, Progress, RadioGroup,
ScrollArea, Select, Separator, Sheet, Skeleton, Slider, Spinner, StatusBadge, Switch, Table,
Tabs, Textarea, Toast (+`Toaster`), Tooltip.

**Komponen custom BPS (prefix `Bps`)**: `BpsCombobox`, `BpsAppTopbar`,
`BpsConfirmActionDialog`, `BpsBulkActionBar`, `BpsDataStatePanel`, `BpsDataTable`,
`BpsDatePicker`, `BpsFilterBar`, `BpsFormSection`, `BpsKpiCard`, `BpsPageHeader`,
`BpsPerformanceCard` (+type `BpsPerformanceCardProps`), `BpsProgressAudit`,
`BpsReviewTimeline`, `BpsValidationSummary`.

**Patterns**: `EmptyState` (+type `EmptyStateProps`)

**Hooks**: `useToast`

> Di **v4** komponen custom kehilangan prefix `Bps` (mis. `BpsDataTable` → `DataTable`).

---

## 5. Pola penggunaan

```tsx
import { Button, BpsKpiCard, StatusBadge } from '@bpsprovkaltara/design-system'

export function Contoh() {
  return (
    <div className="space-y-4">
      <StatusBadge variant="approved">Disetujui</StatusBadge>
      <Button>Simpan</Button>
      <BpsKpiCard title="Responden" value="1.240" helper="+8% bulan ini" />
    </div>
  )
}
```

- **Header halaman**: gunakan `BpsPageHeader`.
- **Tabel data**: `BpsDataTable` (sorting & pagination).
- **Form**: `Form` + `react-hook-form` + `zod`.
- **Status workflow**: `StatusBadge` variant `draft` | `pending` | `revised` | `approved`
  (butuh children teks).

### Token warna

- Selalu pakai `hsl(var(--token))` atau class Tailwind. **Jangan** hardcode hex.
- Opacity via `<alpha-value>` (preset v3) / modifier Tailwind.
- Komponen pakai token **semantic** (`surface-*`, `content-*`, `feedback-*`); primitive
  (`navy-*`, dll.) hanya untuk definisi semantic.

---

## 6. Pitfalls untuk AI agent

- **Jangan** edit file di `node_modules`.
- **Jangan** hardcode warna hex; selalu lewat token/class.
- **Wajib** daftarkan `preset` di `tailwind.config` (beda dengan v4 yang CSS-first).
- Komponen custom v3 **ber-prefix `Bps`** — jangan pakai nama v4 tanpa prefix.
- **Copy UI Bahasa Indonesia**, **tanpa emoji** (brand BPS formal).
- **Format angka** Indonesia: `new Intl.NumberFormat('id-ID').format(value)`.
- Impor `styles.css` **tepat sekali** di root.
