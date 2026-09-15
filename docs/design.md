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
5. Lihat `upgrading.md` di `docs/` untuk checklist lengkap per framework (Vite, HTML, Laravel).

---

## Pitfalls untuk AI agent

- **Jangan** edit file di dalam `node_modules` — perubahan tidak persisten.
- **Jangan** hardcode warna hex; selalu lewat token/class.
- **Jangan** impor `tailwind-preset` di proyek v4 (deprecated, shim kosong).
- **Jangan** memakai Lampiran (referensi historis Kinara) di bawah sebagai panduan aktif — itu dokumen produk lain, dipertahankan hanya sebagai arsip.
- **Copy UI Bahasa Indonesia** (label, placeholder, pesan) — sesuai brand BPS.
- **Tanpa emoji** di teks UI (brand BPS formal).
- **Format angka** Indonesia: `new Intl.NumberFormat('id-ID').format(value)` atau `NumberField`.
- Pastikan `styles.css` diimpor **tepat sekali** di root, bukan per-komponen.
- Subpath UI: `@bpsprovkaltara/design-system/components/ui/<name>`, bukan catch-all lama `/button`.

---

<!-- Lampiran berikut dipindahkan dari design/DESIGN.md (rilis <= 4.8.1). Referensi historis, BUKAN panduan aktif paket ini. -->

# Kinara Design System (REFERENCE ONLY — NOT THIS PACKAGE)

> **Peringatan:** File ini adalah dokumen desain produk **Kinara** (sistem manajemen
> kinerja ASN) yang tersimpan di repo secara historis. **Bukan** sumber kebenaran untuk
> paket `@bpsprovkaltara/design-system`.
>
> Untuk agent/konsumen design system BPS Kaltara, gunakan:
> - Panduan aktif: Bagian 1 dokumen ini (`docs/design.md`)
> - [`CLAUDE.md`](../CLAUDE.md)
> - [`tokens.css`](../tokens.css) / `../src/index.ts`
>
> Jangan menyalin token Geist, path `src/app/globals.css`, atau konvensi Kinara ke aplikasi
> yang memakai `@bpsprovkaltara/design-system`.

# Kinara Design System

## Overview

Kinara is a performance management system (Sistem Manajemen Kinerja ASN) for civil servants. The visual language is professional, calm, and information-dense — suited for a data-heavy government tool that users interact with daily. The palette pairs a deep navy for authority and structure with warm amber for action and attention. A warm off-white background replaces cold white to reduce screen fatigue during long sessions.

The system is built on shadcn/ui (New York style) over Tailwind CSS 3, with a custom token layer expressed as CSS custom properties in `src/app/globals.css`. Components are Radix UI primitives styled with CVA (class-variance-authority) and the `cn` utility. All component source lives in `src/presentation/components/ui/` and is fully owned by the project.

---

## Colors

### Brand Palette

| Token | Value | Usage |
|-------|-------|-------|
| `navy-950` | `#091e33` | Sidebar background |
| `navy-900` | `#0f2b46` | Sidebar active/hover fills |
| `navy-800` | `#1e3a5f` | Primary semantic color |
| `navy-700` | `#334e68` | Strong text on light backgrounds |
| `navy-600` | `#486581` | Sidebar group labels |
| `navy-500` | `#627d98` | Muted body text, labels, icons |
| `navy-400` | `#829ab1` | Caption text, placeholder icons |
| `navy-300` | `#9fb3c8` | Inactive sidebar nav items |
| `navy-200` | `#bcccdc` | Draft/TODO badge borders |
| `navy-100` | `#d9e2ec` | Draft/TODO badge backgrounds |
| `navy-50`  | `#f0f4f8` | Icon container backgrounds |
| `amber-600` | `#d97706` | Logo background, active nav indicator bar |
| `amber-500` | `#f59e0b` | Accent semantic color, notification dot, sidebar focus ring |
| `amber-400` | `#fbbf24` | Warm highlights |
| `warm-200` | `#ebe4da` | Progress bar track, dividers |
| `warm-100` | `#f5f0ea` | Empty state icon container |
| `warm-50`  | `#faf8f5` | Page background (semantic `--background`) |

### Semantic Color Map (Light Mode)

| Semantic Token | HSL | Resolved | Usage |
|----------------|-----|----------|-------|
| `--background` | `hsl(30 33% 97%)` | `#faf8f5` | App background |
| `--foreground` | `hsl(210 50% 10%)` | `#0d1f33` | Body text |
| `--card` | `hsl(0 0% 100%)` | `#ffffff` | Card surfaces |
| `--primary` | `hsl(211 58% 24%)` | `#1e3a5f` | Primary buttons, links, focus rings |
| `--primary-foreground` | `hsl(210 40% 98%)` | `#f5f8fd` | Text on primary fills |
| `--secondary` | `hsl(30 20% 93%)` | `#ede9e3` | Secondary button fills |
| `--muted` | `hsl(30 20% 93%)` | `#ede9e3` | Subtle fills (tabs list) |
| `--muted-foreground` | `hsl(210 15% 45%)` | `#627d98` | Subdued text |
| `--accent` | `hsl(38 92% 50%)` | `#f59e0b` | Ghost button hover, accent elements |
| `--destructive` | `hsl(0 84% 60%)` | `#ef4444` | Danger actions |
| `--border` | `hsl(30 20% 88%)` | `#ddd6cc` | Component borders |
| `--input` | `hsl(30 20% 88%)` | `#ddd6cc` | Input borders |
| `--ring` | `hsl(211 58% 24%)` | `#1e3a5f` | Focus rings |
| `--radius` | `0.5rem` | — | Base border radius |

### Status Badge Colors

Status badges use Tailwind semantic utility classes rather than custom tokens, maintaining clear distinction from the brand palette.

| Status | Tailwind Classes | Meaning |
|--------|-----------------|---------|
| DRAFT / TODO | `bg-navy-100 text-navy-700 border-navy-200` | Inactive/not started |
| AKTIF / DISETUJUI / DONE | `bg-emerald-50 text-emerald-700 border-emerald-200` | Active/approved/complete |
| PENILAIAN | `bg-amber-50 text-amber-700 border-amber-200` | Under evaluation |
| SELESAI / FINAL / IN_PROGRESS | `bg-blue-50 text-blue-700 border-blue-200` | In-progress/finished |
| LOCKED | `bg-gray-100 text-gray-700 border-gray-200` | Frozen/immutable |
| DIAJUKAN | `bg-purple-50 text-purple-700 border-purple-200` | Submitted for review |
| REVISI | `bg-orange-50 text-orange-700 border-orange-200` | Needs revision |
| BERJALAN | `bg-sky-50 text-sky-700 border-sky-200` | Actively running |
| DIBATALKAN / BLOCKED | `bg-red-50 text-red-700 border-red-200` | Cancelled/blocked |

### Chart Colors

| Token | HSL | Resolved |
|-------|-----|----------|
| `--chart-1` | `hsl(211 58% 24%)` | Deep navy (primary series) |
| `--chart-2` | `hsl(38 92% 50%)` | Amber (secondary series) |
| `--chart-3` | `hsl(173 58% 39%)` | Teal |
| `--chart-4` | `hsl(12 76% 61%)` | Coral |
| `--chart-5` | `hsl(197 37% 24%)` | Dark teal |

---

## Typography

**Font family**: Geist Sans — loaded via `geist/font/sans` as a CSS variable `--font-geist-sans`, applied globally with `font-sans antialiased` on `<body>`.

### Scale in Use

| Role | Size | Weight | Color | Usage |
|------|------|--------|-------|-------|
| Page Title | `text-xl` / 1.25rem | 600 semibold | navy-900 | Header `<h1>` (page name) |
| Section Title | `text-lg` / 1.125rem | 600 semibold | navy-900 | PageHeader component title |
| Card Value | `text-2xl` / 1.5rem | 700 bold | navy-900 | StatCard primary value |
| Label | `text-sm` / 0.875rem | 500 medium | navy-500 | StatCard title, column headers |
| Body | `text-sm` / 0.875rem | 400 normal | foreground | Table cells, form values, descriptions |
| Caption | `text-xs` / 0.75rem | 400 normal | navy-400 | Subtitles, timestamps |
| Overline | `text-[11px]` / 0.6875rem | 600 semibold | navy-600 | Sidebar group labels — `uppercase tracking-wider` |
| Badge | `text-[11px]` / 0.6875rem | 500 medium | status-specific | StatusBadge labels |
| KBD hint | `text-[11px]` / 0.6875rem | 400 normal | navy-400 | Keyboard shortcut `/` hint in header search |

**Notable patterns:**
- `tracking-tight` on the brand logotype ("Kinara") in the sidebar
- `tabular-nums` on ProgressBar percentage values for stable alignment
- `line-clamp-1` on sidebar unit kerja name and select trigger values to prevent overflow

---

## Spacing

Base unit: **4px** (Tailwind default). No custom spacing tokens are defined — the standard scale is used consistently throughout.

| Scale | px | Common usage |
|-------|----|-------------|
| `1.5` | 6px | Badge padding-y, nav indicator vertical inset |
| `2` | 8px | Small gaps between icon and text |
| `2.5` | 10px | Button padding-y |
| `3` | 12px | Sidebar item left padding, small component gaps |
| `4` | 16px | Sidebar item right padding, general component gap |
| `5` | 20px | Card content padding (`p-5`) |
| `6` | 24px | Page main padding mobile (`px-6 py-6`) |
| `8` | 32px | Page main padding desktop (`px-8 py-8`) |
| `9` | 36px | Default button height, input height |
| `10` | 40px | StatCard icon container size |

### Layout Dimensions

| Dimension | Value |
|-----------|-------|
| Sidebar width | 260px |
| Header height | 64px (`h-16`) |
| Main padding-x mobile | 24px (`px-6`) |
| Main padding-x desktop | 32px (`px-8`) |
| Main padding-y mobile | 24px (`py-6`) |
| Main padding-y desktop | 32px (`py-8`) |

---

## Border Radius

`--radius` is `0.5rem`. Tailwind extensions derive sm and md values from this variable.

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | 0.25rem | Subtle rounding (select items) |
| `rounded-md` | 0.375rem | Buttons, inputs, select triggers, popovers |
| `rounded-lg` | 0.5rem | Icon containers, sidebar items, tabs list |
| `rounded-xl` | 0.75rem | Cards |
| `rounded-full` | 9999px | Badges/pills, avatars, progress bar track and fill |

---

## Shadows

Shadows are minimal — used only to establish visual layer separation.

| Token | Usage |
|-------|-------|
| `shadow-sm` | Card default state, inputs, secondary/outline buttons |
| `shadow` | Default button variant |
| `shadow-md` | Card hover state (`hover:shadow-md`), popovers, dropdowns |

---

## Breakpoints

| Name | Min-width | Behavior change |
|------|-----------|----------------|
| `sm` | 640px | Header search bar appears; PageHeader switches to row layout |
| `md` | 768px | Standard tablet |
| `lg` | 1024px | Sidebar becomes visible; padding increases |
| `xl` | 1280px | Wide desktop |
| `2xl` | 1536px | Extra-wide desktop |

---

## Components

### Layout

| Component | Description |
|-----------|-------------|
| `AppShell` | Root layout: sidebar + header + `<main>`. Background `bg-warm-50`. |
| `Sidebar` | Dark nav (`bg-navy-950`), 260px wide, sticky, hidden below lg. |
| `Header` | Sticky top bar, `h-16`, glassmorphism (`backdrop-blur-md bg-warm-50/80`). |
| `MobileSidebar` | Sheet overlay for mobile nav, same content as Sidebar. |

### UI Primitives (shadcn/ui — New York style)

| Component | Variants | Border Radius |
|-----------|---------|---------------|
| Button | `default`, `destructive`, `outline`, `secondary`, `ghost`, `link` | `rounded-md` |
| Badge | `default`, `secondary`, `destructive`, `outline` | `rounded-md` |
| Card | — | `rounded-xl` |
| Input | — | `rounded-md` |
| Select | — | `rounded-md` (trigger) |
| Tabs | — | `rounded-lg` (list), `rounded-md` (trigger active) |
| Dialog | — | `rounded-lg` |
| Sheet | — | `rounded-lg` |
| Skeleton | — | `rounded-md` |
| Progress | — | `rounded-full` |
| Tooltip | — | `rounded-md` |
| Checkbox | — | `rounded-sm` |
| Avatar | — | `rounded-full` |
| Calendar | — | `rounded-md` |
| DatePicker | — | wraps Calendar in Popover |

### Shared / Custom Components

| Component | Key Props | Notes |
|-----------|-----------|-------|
| `StatCard` | `title`, `value`, `icon`, `iconColor`, `iconBgColor`, `trend` | `text-2xl font-bold` value; trend uses emerald/red |
| `StatusBadge` | `status` (domain enum string) | `rounded-full text-[11px]`; maps all domain status values |
| `ProgressBar` | `value`, `max`, `size` (`sm`/`md`/`lg`), `color` | Auto-colors: ≥80% emerald, ≥50% amber, <50% red |
| `PageHeader` | `title`, `description`, `children` | Responsive row/column layout |
| `EmptyState` | `icon`, `title`, `description`, `action` | Icon in `w-12 h-12 rounded-full bg-warm-100` |
| `AvatarInitials` | `name`, `size` (`sm`/`md`/`lg`) | Hash-deterministic color from 8-color pool |
| `AvatarGroup` | wraps multiple AvatarInitials | Overlapping avatar stack |
| `DataTable` | TanStack Table wrapper | Used across all list pages |

### Task Views

| Component | Layout |
|-----------|--------|
| `TaskTableView` | Standard table |
| `TaskKanbanView` | Columns by `StatusTaskItem` |
| `TaskGanttView` | Timeline bars by `dueDate` |
| `TaskCalendarView` | Calendar grid |

---

## Design Decisions

### Navy + Amber palette
Navy conveys institutional authority. At navy-950, the sidebar creates strong spatial separation from the content area. Amber is the complementary accent: warm, high-contrast against navy, and reserved exclusively for interactive focal points (active nav indicator, notification dot, logo background, focus ring). Two brand colors prevents visual noise in a complex, information-dense UI.

### Warm off-white background (`warm-50: #faf8f5`)
Cold white at high brightness causes eye strain in long sessions. The warm-50 background reads as neutral while being perceptibly softer. It also creates natural card lift: white cards (`#fff`) float above the background without heavy shadows.

### Dark sidebar, light content
Strong contrast between the dark sidebar and light main content provides immediate spatial orientation — "navigation is dark, content is light." This pattern is universal in productivity SaaS and works naturally with role-based nav rendering.

### CSS custom properties via raw HSL channels
Semantic colors are stored as raw HSL channel values (e.g. `--primary: 211 58% 24%`) rather than full `hsl()` declarations. This enables Tailwind opacity modifiers like `bg-primary/90` to work correctly — Tailwind wraps the variable with `hsl(... / <alpha>)` at compile time.

### `--radius: 0.5rem` base
0.5rem produces a professional, moderately rounded look — less "bubbly" than common UI kits that use 0.75rem. Appropriate for a government tool. Pills and avatars use `rounded-full` for semantic distinction from rectangular form controls.

### Minimal shadow usage
Only two effective elevation levels: `shadow-sm` (resting) and `shadow-md` (hover/elevated). No decorative colored shadows. The interface stays visually quiet so data takes center stage.

### Geist Sans
Geist Sans ships as a Next.js-compatible font package (`geist/font/sans`), is self-hosted with no network dependency, and has excellent tabular numerics — critical for performance indicators, progress percentages, and data tables throughout the app.

### shadcn/ui New York style
"New York" style uses smaller radii, denser padding, and a more refined look versus the "Default" style. Components are copied into the project (`src/presentation/components/ui/`) and fully owned — no CDN dependency, full customizability.

### Animation philosophy
Animations are functional, not decorative. `transition-colors` on interactive elements provides feedback without distraction. The progress bar uses `duration-500` because its value change represents meaningful task completion state. Overlays use `animate-in`/`animate-out` from `tailwindcss-animate` for the polished entrance/exit users expect from modals and dropdowns.
