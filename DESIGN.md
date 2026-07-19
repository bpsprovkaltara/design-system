# DESIGN.md — Panduan AI Agent untuk `@bpsprovkaltara/design-system`

Dokumen ini ditujukan untuk **AI coding agent** (Claude Code, Cursor, Copilot, dll.) yang
**membangun aplikasi konsumen** menggunakan design system BPS Kaltara. Fokusnya cara
**memakai** library ini di aplikasi lain — bukan cara mengembangkan library-nya.

Sumber kebenaran API selalu `src/index.ts` (di tag versi yang Anda pakai). Jika dokumen ini
dan `src/index.ts` berbeda, ikuti `src/index.ts`.

---

## 1. Pilih versi dulu

Ada dua jalur rilis paralel. **Tentukan versi sebelum menulis kode** — API-nya berbeda.

| | v3 (LTS) | v4 (latest) |
|---|---|---|
| Tailwind CSS | 3.4 | 4 |
| React | 18 | 19 |
| Node | ≥18 | ≥20 (CI/Docker: Node 20) |
| Tema / styling | preset (`tailwind-preset`) | CSS-first (`import 'styles.css'`) |
| Nama komponen custom | ber-prefix `BpsX` | tanpa prefix |
| dist-tag | `legacy` | `latest` |
| Branch sumber | `v3` | `main` |

Aturan praktis: aplikasi **Tailwind 4 + React 19** → pakai **v4**. Aplikasi lama yang masih
**Tailwind 3 / React 18** → pakai **v3**. Migrasi antar versi **bukan drop-in** (lihat §6).

---

## 2. Instalasi (GitHub Packages)

Paket dipublikasikan ke **GitHub Packages** (registry privat), bukan npm publik. Aplikasi
konsumen butuh `.npmrc` yang mengarahkan scope `@bpsprovkaltara` ke registry tersebut plus
token GitHub dengan izin `read:packages`.

`.npmrc` di root aplikasi konsumen:

```
@bpsprovkaltara:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

> Jangan commit token. Set `GITHUB_TOKEN` sebagai environment variable (atau pakai
> `.npmrc` di home dir untuk dev lokal).

Install sesuai versi:

```bash
# v4 (latest)
pnpm add @bpsprovkaltara/design-system@latest
# atau pin: @^4

# v3 (LTS)
pnpm add @bpsprovkaltara/design-system@legacy
# atau pin: @^3
```

Peer dependencies (install bila belum ada):

```bash
# v4
pnpm add react@^19 react-dom@^19 tailwindcss@^4
# Form opsional (jika memakai Form + RHF/Zod):
pnpm add react-hook-form zod @hookform/resolvers
# v3
pnpm add react@^18 react-dom@^18 tailwindcss@^3.4
```

Subpath yang didukung (v4):

| Path | Isi |
|---|---|
| `@bpsprovkaltara/design-system` | Barrel + CSS side-effect |
| `.../components/ui/button` (dll.) | Satu modul UI |
| `.../patterns/empty-state` | Pattern |
| `.../hooks/use-toast` | Hook |
| `.../utils` | `cn` + variants RSC-safe |
| `.../styles.css` / `tokens.css` / `fonts.css` | CSS |

Jangan memakai catch-all lama `@bpsprovkaltara/design-system/button` — gunakan
`.../components/ui/button` atau entry utama.
---

## 3. Setup styling

### v4 (CSS-first)

1. Impor stylesheet bawaan **sekali** di root aplikasi:
   ```ts
   import '@bpsprovkaltara/design-system/styles.css'
   ```
2. Setup Tailwind 4 di aplikasi Anda mengikuti dokumentasi resmi (mis. plugin
   `@tailwindcss/vite` pada `vite.config.ts`). Entry CSS minimal:
   ```css
   @import "tailwindcss";
   ```
3. **JANGAN** impor `@bpsprovkaltara/design-system/tailwind-preset` — di v4 ini hanya shim
   kosong yang deprecated dan akan memunculkan warning.

### v3 (preset-based)

Daftarkan preset di `tailwind.config.ts` aplikasi:

```ts
import preset from '@bpsprovkaltara/design-system/tailwind-preset'

export default {
  presets: [preset],
  content: ['./src/**/*.{ts,tsx}'],
}
```

---

## 4. API publik (v4)

Impor semua dari entry point utama: `import { ... } from '@bpsprovkaltara/design-system'`.

**Utilities**: `cn`

**Primitives (shadcn/ui + Radix)** — Accordion, Alert, Avatar (+`AvatarGroup`), Badge,
Breadcrumb, Button (+`buttonVariants`, type `ButtonProps`), LinkButton (+type `LinkButtonProps`),
Calendar, Carousel (+type `CarouselApi`), Card (+`CardHeader`/`CardContent`/`CardFooter`/`CardTitle`/`CardDescription`),
Checkbox, Command, Dialog, DropdownMenu, Drawer, DescriptionList, FileUpload (+type `FileUploadProps`), Form
(+`FormField`/`FormItem`/`FormLabel`/`FormControl`/`FormDescription`/`FormMessage`/`useFormField`),
Input, Label, NavigationMenu, Pagination, Popover, Progress, RadioGroup, ScrollArea, Select,
Separator, Sheet, Skeleton, Slider, Spinner (+type `SpinnerProps`), StatusBadge (+`statusBadgeVariants`, type `StatusBadgeProps`), Switch, Table, Tabs, Textarea,
Toggle (+type `ToggleProps`), ToggleGroup (+types), Toast (+`Toaster`), Tooltip.

**Komponen custom BPS**: `Combobox` (+`ComboboxProps`/`ComboboxOption`), `AppTopbar`,
`ConfirmActionDialog`, `BulkActionBar` (+`actions[]`), `DataStatePanel`, `DataTable`
(+`renderRowActions`, `sortable`, `pageSize`), `DatePicker`, `DateRangePicker`, `FilterBar`
(+`statusOptions`/`unitKerjaOptions`), `FormSection`, `KpiCard`, `PageHeader`,
`PerformanceCard` (+type `PerformanceCardProps`), `ProgressAudit`, `ReviewTimeline`,
`ValidationSummary`, `YearSelect`, `NumberField`, `MapLegend`, `SkipLink`.

**Charts**: `Sparkline`, `BarChart` (+types)

**Stepper**: `Stepper` (+`StepperProps`/`Step`/`StepStatus`)

**Patterns**: `EmptyState` (+type `EmptyStateProps`)

**Hooks**: `useToast`

> Di **v3** komponen custom memakai prefix `Bps` (mis. `BpsDataTable`, `BpsKpiCard`,
> `BpsStatusBadge` jika berlaku). Periksa `src/index.ts` pada tag v3.

---

## 5. Pola penggunaan

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

- **Header halaman**: gunakan `PageHeader`, bukan merangkai heading manual.
- **Tabel data**: `DataTable` mendukung `renderRowActions`, sorting kolom (`sortable`), dan
  pagination client-side (`pageSize`). Untuk kontrol penuh, gunakan primitif `Table`.
- **Form**: `Form` + `react-hook-form` + `zod` (peer opsional; resolver via `@hookform/resolvers`).
- **Status workflow**: `StatusBadge` variant `draft` | `pending` | `revised` | `approved`
  (selain variant umum `default`/`secondary`/`destructive`/`outline`). Komponen butuh
  children sebagai teks — `<StatusBadge variant="approved">Disetujui</StatusBadge>`.
- **Empty/loading/error state**: `EmptyState`, `DataStatePanel`, `Skeleton`, `Spinner`.
- **Tahun / angka lokal**: `YearSelect`, `NumberField` (format `id-ID`).
### Token warna

- Selalu pakai `hsl(var(--token))` atau class Tailwind (`bg-primary`, `text-muted-foreground`).
  **Jangan pernah** hardcode hex.
- Pakai opacity via modifier: `bg-primary/50` → `hsl(var(--primary) / 0.5)`.
- Di komponen pakai token **semantic** (`surface-*`, `content-*`, `border-*`, `brand-*`,
  `feedback-*`, `data-*`). Token **primitive** (`navy-*`, `amber-*`, dll.) hanya untuk
  mendefinisikan semantic, bukan dipakai langsung.
- CSS variable warna disimpan sebagai **bare HSL** (`196 100% 40%`), tanpa wrapper `hsl()`.

---

## 6. Migrasi v3 → v4 (untuk agent yang meng-upgrade app konsumen)

1. Naikkan peer deps: React 19, Tailwind 4, Node 20.
2. Ganti integrasi tema: hapus `presets: [preset]` dari `tailwind.config`, ganti dengan
   `import '@bpsprovkaltara/design-system/styles.css'` + setup Tailwind 4 CSS-first.
3. **Rename impor komponen custom**: hapus prefix `Bps` (`BpsDataTable` → `DataTable`,
   `BpsKpiCard` → `KpiCard`, dst.).
4. Sesuaikan utility Tailwind 4 yang berubah (mis. `outline-none` → `outline-hidden`).
5. Lihat `UPGRADE_NOTES.md` di repo untuk checklist lengkap per framework (Vite, HTML, Laravel).

---

## Pitfalls untuk AI agent

- **Jangan** edit file di dalam `node_modules` — perubahan tidak persisten.
- **Jangan** hardcode warna hex; selalu lewat token/class.
- **Jangan** impor `tailwind-preset` di proyek v4 (deprecated, shim kosong).
- **Jangan** memakai `design/DESIGN.md` (dokumen Kinara historis) — gunakan `DESIGN.md` root.
- **Copy UI Bahasa Indonesia** (label, placeholder, pesan) — sesuai brand BPS.
- **Tanpa emoji** di teks UI (brand BPS formal).
- **Format angka** Indonesia: `new Intl.NumberFormat('id-ID').format(value)` atau `NumberField`.
- Pastikan `styles.css` diimpor **tepat sekali** di root, bukan per-komponen.
- Subpath UI: `@bpsprovkaltara/design-system/components/ui/<name>`, bukan catch-all lama `/button`.
