# BPS Kaltara Design System
> **Version 3.0.0** — Production-ready component library untuk ekosistem aplikasi internal BPS Provinsi Kalimantan Utara

Sistem desain ini adalah fondasi visual dan interaksi bagi seluruh ekosistem aplikasi internal BPS Provinsi Kalimantan Utara. Berfokus pada akurasi data, efisiensi administratif, dan kenyamanan visual bagi pengguna profesional.

---

## Installation

Install via Git repository:

```bash
npm install "git+ssh://git@github.com/<org>/<repo>.git"
# atau
npm install "git+https://github.com/<org>/<repo>.git"
```

Atau jika package sudah tersedia di registry private internal:

```bash
npm install @bpsprovkaltara/design-system
```

Peer dependencies minimum (install jika belum ada di consumer):

```bash
npm install react@^18 react-dom@^18 tailwindcss@^3.4 tailwindcss-animate
```

---

## Usage

### 1. Register the Tailwind preset

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'
import bpsPreset from '@bpsprovkaltara/design-system/tailwind-preset'

export default {
  presets: [bpsPreset],
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@bpsprovkaltara/design-system/dist/**/*.{js,cjs}',
  ],
} satisfies Config
```

The second `content` glob lets Tailwind discover utility classes used inside the shipped components.

### 2. Import the global CSS once

```ts
// src/main.tsx (or app entry)
import '@bpsprovkaltara/design-system/styles.css'
```

This loads design tokens (`--primary`, `--navy-*`, typography, motion). Without it, components render unstyled.

### 3. Use components

```tsx
import { Button, BpsDatePicker, StatusBadge } from '@bpsprovkaltara/design-system'

export function Example() {
  return (
    <div className="space-y-4">
      <Button variant="default">Simpan</Button>
      <StatusBadge status="approved" />
    </div>
  )
}
```

### Dark mode

Add the `dark` class to `<html>`. All tokens are overridden in the `.dark { ... }` selector included in the global CSS.

---

## Stack & Tooling

| Tool | Versi | Keterangan |
|---|---|---|
| React | 18+ | UI framework |
| TypeScript | 5.4+ | Type safety |
| Vite | 5 | Dev server & bundler |
| Tailwind CSS | 3.4+ | Utility-first styling |
| shadcn/ui | new-york | Component primitives |
| Radix UI | latest | Accessible primitives |
| cmdk | 1.x | Command/combobox |
| react-hook-form + zod | latest | Form validation |
| Vitest | 4.x | Unit testing |
| Husky + lint-staged | latest | Pre-commit hooks |

---

## Menjalankan Proyek

```bash
npm install
npm run dev        # Dev server di http://localhost:5173
npm run build      # Build showcase app
npm run build:lib  # Build library (dist/)
npm run test       # Run unit tests
npm run typecheck  # TypeScript check
```

---

## Struktur Proyek

```
src/
├── components/
│   ├── ui/            ← Semua komponen UI (shadcn + custom BPS)
│   ├── layout/        ← Sidebar showcase
│   ├── patterns/      ← Pattern tingkat tinggi (EmptyState, dll)
│   └── showcase/      ← Helper komponen untuk halaman showcase
├── pages/
│   ├── overview/      ← Halaman Get Started
│   ├── foundations/   ← Colors, Typography, Spacing
│   ├── components/    ← Showcase setiap komponen
│   └── prototypes/    ← Dashboard & Auth prototype
├── layouts/           ← ShowcaseLayout (sidebar + outlet)
├── hooks/             ← use-toast
├── lib/               ← utils (cn)
└── index.ts           ← Public API ekspor library
```

---

## Komponen

### Primitives (shadcn/ui base)
`Accordion` · `Alert` · `Avatar` · `Badge` · `Breadcrumb` · `Button` · `Calendar` · `Card` · `Checkbox` · `Command` · `Dialog` · `DropdownMenu` · `Form` · `Input` · `Label` · `Pagination` · `Popover` · `Progress` · `RadioGroup` · `ScrollArea` · `Select` · `Separator` · `Sheet` · `Skeleton` · `Slider` · `Spinner` · `Switch` · `Table` · `Tabs` · `Textarea` · `Toast` · `Tooltip`

### BPS Custom Components
| Komponen | File | Keterangan |
|---|---|---|
| `BpsCombobox` | `bps-combobox.tsx` | Searchable select dengan Popover + Command |
| `BpsDataTable` | `bps-data-table.tsx` | Tabel data dengan sorting, pagination, filter |
| `BpsDatePicker` | `bps-date-picker.tsx` | Date picker dengan Calendar popover |
| `StatusBadge` | `status-badge.tsx` | Badge status workflow (draft/pending/revised/approved) |
| `EmptyState` | `patterns/empty-state.tsx` | Empty state dengan ikon, judul, deskripsi, dan aksi |

---

## Design Principles

1. **Clarity First** — Keterbacaan data di atas estetika. Format angka Indonesian locale (`1.234.567,89`).
2. **Trustworthy** — Konsistensi BPS Blue brand. Sumber & periode referensi pada setiap output data.
3. **Accessible (WCAG 2.1 AA)** — Keyboard-operable, screen-reader-friendly, warna bukan satu-satunya konveyor makna.
4. **Consistent** — CSS variables untuk semua warna, component library untuk semua pola.

---

## Visual Foundations

### Warna
- **Primary brand**: BPS Blue `#0099CC` (`196 100% 40%`) — tombol, tautan, identitas brand
- **Primary dark**: BPS Navy `#1E3A5F` (`222 83% 24%`) — sidebar background
- **Accent**: BPS Orange `#F7941D` (`35 93% 54%`) — highlight, badge provisional
- Format token: bare HSL values — `--primary: 196 100% 40%`. Usage: `hsl(var(--primary))`

### Tipografi
- **Display/Heading**: Fraunces (serif editorial)
- **Body**: IBM Plex Sans (400/500/600/700)
- **Mono**: IBM Plex Mono — untuk angka tabel, kode, ID
- Tabular nums (`font-variant-numeric: tabular-nums`) pada semua sel numerik tabel

### Token Sistem (3 Layer)
- **Layer A** — Primitive scales: `navy-*`, `amber-*`, `emerald-*`, `crimson-*`, `warm-*`
- **Layer B** — Semantic aliases: `surface-*`, `content-*`, `brand-*`, `feedback-*`, `data-*`
- **Layer C** — Component tokens: `--primary`, `--background`, `--border`, dll (shadcn/ui compat)

### Palette Extended
| Palette | Steps | Kegunaan |
|---|---|---|
| `navy` | 50–950 | Sidebar, table headers, secondary backgrounds |
| `amber` | 50–950 | Badge "Sementara", warning highlights |
| `warm` | 50–200 | Page canvas, card surfaces, dividers |

---

## Public API (Library)

Entry point: `src/index.ts`

Build library:
```bash
npm run build:lib
# Output: dist/index.js (ESM), dist/index.cjs (CJS), dist/styles.css
```

Semua komponen diekspor dari `src/index.ts`. Tambahkan komponen baru ke file ini setelah dibuat.

---

## Language & Locale

- Bahasa: **Bahasa Indonesia**
- Format angka: `new Intl.NumberFormat('id-ID').format(value)` → `1.234.567,89`
- Format tanggal: `dd/MM/yyyy` atau `Mmm YYYY`
- Tone: formal & institusional, tidak ada emoji di teks UI
- Loading state copy: `"Memuat..."`, empty state: `"Tidak ada data"`

---

## Dark Mode

Aktifkan dengan menambahkan class `dark` ke elemen `<html>`. Semua token warna di-override di selector `.dark { ... }` dalam `colors_and_type.css`.

---

## File Penting

| File | Keterangan |
|---|---|
| `colors_and_type.css` | Semua CSS custom properties (warna + tipografi) |
| `tailwind.config.ts` | Tailwind config dengan semua token terhubung |
| `components.json` | shadcn/ui config (new-york, CSS vars) |
| `src/index.ts` | Public API library |
| `vite.lib.config.ts` | Build config untuk mode library |
| `src/tailwind-preset.ts` | Preset Tailwind untuk dikonsumsi proyek lain |
