# BPS Kaltara Design System
> **Version 2.1.0** — Expanded for Internal Ecosystem (e-Kinerja, HRIS, Task Management)

Sistem desain ini adalah fondasi visual dan interaksi bagi seluruh ekosistem aplikasi internal BPS Provinsi Kalimantan Utara. Berfokus pada akurasi data, efisiensi administratif, dan kenyamanan visual bagi pengguna profesional.

## 🚀 V2.1.0: Transformasi Action-Oriented
Versi ini menandai transisi dari sistem visualisasi data murni menjadi fondasi aplikasi internal yang kompleks.

### Pilar Utama
1. **Low Cognitive Load:** Memecah alur kerja birokrasi yang kompleks menjadi langkah-langkah intuitif.
2. **High Information Density:** Mengoptimalkan ruang layar untuk input data tanpa mengorbankan keterbacaan.
3. **Seamless Integration:** Navigasi global yang konsisten untuk transisi antar modul (Kepegawaian ↔ Kinerja).

---

## Overview

This is the official design system for **Badan Pusat Statistik (BPS) Provinsi Kalimantan Utara** — the regional statistics bureau for Indonesia's northernmost province. BPS is a government institution responsible for collecting, processing, and disseminating official statistical data on population, economy, agriculture, poverty, and employment.

### Sources Provided
- **Design specification document** (pasted PRD): Full component, color, typography, UX pattern, and accessibility specification — the primary source for this design system.
- No Figma links or codebase repository was attached. All design decisions are derived from the specification document above.

### Products / Surfaces
1. **BPS Kaltara Data Dashboard** — The primary internal + public-facing web application for viewing statistical indicators, maps, publications, and tables. Sidebar-nav layout, data-dense UI, Next.js frontend.

---

## Design Principles

1. **Clarity First** — Data readability above aesthetics. Indonesian locale formatting (`.` thousands, `,` decimal). Units in every column header.
2. **Trustworthy** — Government-grade credibility. Consistent BPS Blue brand. Source + reference period on every data output.
3. **Accessible (WCAG 2.1 AA)** — Keyboard-operable, screen-reader-friendly, color never the sole conveyor of meaning.
4. **Consistent** — CSS variables for all colors, component library for all patterns. Kebab-case CSS vars, PascalCase React components.

---

## CONTENT FUNDAMENTALS

### Language & Locale
- Primary language: **Bahasa Indonesia**
- All statistical values use **Indonesian number formatting**: titik (`.`) for thousands separator, koma (`,`) for decimal → `1.234.567,89`
- Implemented via: `new Intl.NumberFormat('id-ID').format(value)`
- Dates: `dd/MM/yyyy` or `Mmm YYYY` (e.g. `Jan 2024`)

### Tone & Voice
- **Formal and institutional** — BPS is a government body; copy must inspire trust and authority
- **Third-person data framing** — data is presented objectively, no first-person "I/kami"
- **No emoji** — zero emoji in any user-facing text or UI component
- **No playful language** — avoid colloquialisms, abbreviations, or casual phrasing
- **Actionable error messages** — errors are specific: "Masukkan tahun antara 2000–2024", not "Input tidak valid"
- **Neutral on interpretation** — do not editorialize statistical trends; let the numbers speak

### Key UI Copy Patterns
- Table record count: `"Menampilkan 1–25 dari 1.234 data"`
- Loading state: `"Memuat..."`
- Empty table (no filter): `"Tidak ada data"`
- Empty table (filtered): `"Tidak ada data yang sesuai dengan filter"` + reset button
- Required field asterisk: `[Label] *`
- Form progress: `"Langkah 2 dari 5"`
- Auto-save: `"Tersimpan otomatis"`
- Provisional data: `"Sementara"` label with amber color + warning icon
- Null cell: dash `–` (never blank)
- Skip nav: `"Lompat ke konten utama"`

### Casing
- UI labels: **Sentence case** (e.g. "Unduh data", "Tambah filter")
- Column headers: **Sentence case** with unit in parentheses (e.g. `Produksi (ton)`, `Populasi (jiwa)`)
- Navigation items: **Title case** in Indonesian (e.g. "Beranda", "Kependudukan")
- Status badges: **Sentence case**

---

## VISUAL FOUNDATIONS

### Colors
- **Primary brand**: BPS Blue `#0099CC` (HSL `196 100% 40%`) — buttons, links, brand identity
- **Primary dark**: BPS Navy `#1E3A5F` (HSL `222 83% 24%`) — sidebar background, deep fills
- **Accent**: BPS Orange `#F7941D` (HSL `35 93% 54%`) — highlights, provisional badges
- **Brand trio**: BPS Blue + BPS Orange + BPS Green — representing Kependudukan, Perekonomian, Pertanian
- **Full blue scale**: `--bps-50` through `--bps-950` (see `colors_and_type.css`)
- **Extended palettes** (v2.0): Navy 50–950, Amber 50–900 — for UI variation
- Semantic: green (positive), red (negative), amber (warning/provisional), slate (neutral)
- Chart palette: 8 colorblind-safe series — brand trio first, then violet, teal, red, mid-blue, amber
- **⚠ CSS var format**: All color tokens use **bare HSL values** (no `hsl()` wrapper). Usage: `hsl(var(--token))` or in Tailwind: `hsl(var(--token) / <alpha>)`

### Typography
- **Display/Heading font**: IBM Plex Sans (700/600/500 weight)
- **Body font**: IBM Plex Sans (400 weight)
- **Mono font**: IBM Plex Mono (numeric cells, code, IDs)
- IBM Plex dirancang khusus untuk enterprise & data applications — wibawa institusional cocok untuk BPS
- Font sizes in `rem` always — never `px` (respects user browser font preferences)
- Tabular nums (`font-variant-numeric: tabular-nums`) on all numeric table cells
- Google Fonts sourced: `IBM+Plex+Sans` + `IBM+Plex+Mono`

### Spacing & Layout
- Max content width: 1280px
- Sidebar expanded: 280px; collapsed: 64px
- Column gap: 1rem standard, 1.5rem for charts
- Row density: compact 32px, default 44px, comfortable 56px
- Border radius: consistent with shadcn/ui defaults (~6px for cards, ~4px for inputs)

### Backgrounds & Surfaces
- Page background: white or `bps-50` (`#EEF4FF`) tint
- Card background: white with subtle shadow
- Table header: muted background (`bps-50` or `hsl(215 16% 96%)`)
- Sidebar: `bps-950` (`#1E3A5F`) dark background with white text
- No full-bleed imagery or background illustrations — clean, data-focused surfaces

### Cards & Borders
- Cards: white background, subtle border (`1px solid hsl(214 30% 91%)`), `0 1px 3px rgba(0,61,130,0.08)` shadow
- Corner radius: `0.5rem` (8px) for cards; `0.375rem` (6px) for inputs/buttons
- No decorative colored left-border accents (per anti-pattern guidelines)

### Animation & Interaction
- Sidebar collapse: `transition: width 250ms ease-in-out`
- Hover: slightly darker background or border-color shift — no opacity tricks
- Button active: slight scale-down (`scale: 0.98`) + deeper color
- Skeleton shimmer: linear-gradient shimmer animation for loading states
- No bounce or playful easing — all easing is `ease-in-out` or `ease`
- Focus rings: visible `2px solid` outline in BPS Blue with `2px offset`

### Imagery & Illustrations
- No hand-drawn illustrations or decorative imagery
- Map tiles: CartoDB Positron (light gray basemap) — neutral, doesn't compete with data
- Charts: clean, minimal — no chart junk (decorative gridlines, 3D, shadows)
- No background textures or patterns

### Transparency & Blur
- Map overlay at 80% opacity for layers
- No backdrop blur effects
- No frosted glass patterns

### Icon Style
- Lucide React icons — consistent stroke width, outline style
- No filled icons, no emoji as icons
- Icon-only buttons always have `aria-label`

---

## ICONOGRAPHY

BPS Kaltara uses **Lucide React** as its icon system (consistent with shadcn/ui's default). Icons are:
- **Stroke-based** (outline), not filled
- **Consistent 2px stroke weight** at 24×24px default
- **Never used alone** without an `aria-label` on interactive elements
- **Never used as the sole conveyor of meaning** — always paired with text or accessible label

### Substitution Note
⚠️ No icon font, sprite sheet, or SVG set was provided in the source materials. Lucide React (CDN: `https://unpkg.com/lucide@latest`) is used as the closest match to the shadcn/ui ecosystem this codebase targets.

### Logo
⚠️ No official BPS logo asset was provided. A text-based logo placeholder is used in the UI kit (`BPS` wordmark in Plus Jakarta Sans 800). **Please provide the official BPS vector logo (SVG or PNG) for accurate reproduction.**

Common icon usages:
- `BarChart2` — Statistics section
- `Map` — Peta & GIS
- `FileText` — Publikasi
- `Home` — Beranda
- `Settings` — Pengaturan
- `Users` — Kependudukan
- `TrendingUp` / `TrendingDown` — Data positive/negative indicators
- `AlertTriangle` — Data warning (provisional/sementara)
- `Download` — Unduh data
- `Search` — Search input
- `ChevronLeft` / `ChevronRight` — Pagination, sidebar collapse
- `X` — Close/dismiss
- `Check` — Valid input confirmation
- `Info` — Tooltip trigger

---

## File Index

```
/
├── README.md                    ← This file — system overview and guidelines
├── SKILL.md                     ← Agent skill manifest
├── colors_and_type.css          ← All CSS custom properties (colors + typography)
├── components.json              ← shadcn/ui configuration (new-york, CSS vars) [v2.0]
├── tailwind.config.ts           ← Tailwind config with all tokens wired [v2.0]
├── assets/                      ← Logos, brand assets
├── preview/                     ← Design System tab cards (HTML)
│   ├── colors_brand.html        ← BPS Blue brand palette
│   ├── colors_scale.html        ← Full bps-50–950 scale
│   ├── colors_semantic.html     ← Data semantic colors
│   ├── colors_chart.html        ← Chart series palette
│   ├── colors_dark.html         ← Dark mode color tokens + live toggle [v2.0]
│   ├── colors_extended.html     ← Navy & Amber extended palettes [v2.0]
│   ├── type_display.html        ← Display + heading type scale
│   ├── type_body.html           ← Body + caption + label + mono
│   ├── type_data.html           ← Table/data typography rules
│   ├── spacing_tokens.html      ← Spacing scale + border radius + shadows
│   ├── comp_buttons.html        ← Button variants + states
│   ├── comp_badges.html         ← Badge + status indicators
│   ├── comp_inputs.html         ← Form inputs + validation states
│   ├── comp_table.html          ← Data table patterns
│   ├── comp_cards.html          ← Stat cards + data cards
│   ├── comp_toast.html          ← Toast notification variants
│   └── comp_loading.html        ← Skeleton + spinner + progress
└── ui_kits/
    ├── auth/
    │   └── index.html           ← Auth / login UI kit
    └── dashboard/
        ├── README.md            ← Dashboard UI kit notes
        ├── index.html           ← Interactive dashboard prototype
        └── components/          ← JSX component files
```

---

## Dark Mode (v2.0)

Dark mode diaktifkan dengan menambahkan class `dark` ke elemen `<html>`:

```html
<html class="dark">
```

Semua token warna di-override di selector `.dark { ... }` dalam `colors_and_type.css`. BPS brand hues (blue, orange) dipertahankan, hanya lightness yang disesuaikan untuk kontras di atas background gelap.

**Implementasi di React/Next.js:**
```tsx
// Contoh toggle dengan next-themes
import { useTheme } from 'next-themes'
const { setTheme } = useTheme()
setTheme('dark')   // atau 'light'
```

Preview dark mode: [colors_dark.html](preview/colors_dark.html)

---

## Extended Palettes (v2.0)

Dua skala tambahan diadopsi dari CaKEP e-Kinerja:

| Palette | Steps | Kegunaan |
|---|---|---|
| `navy` | 50–950 | Sidebar depth, table headers, secondary backgrounds |
| `amber` | 50–900 | Badge "Sementara", warning highlights, accent variations |
| `warm` | 50–200 | Page canvas, card surfaces, dividers — menghindari putih murni pada workspace padat data |

Ketiganya tersedia sebagai CSS variables (`--navy-*`, `--amber-*`, `--warm-*`) dan sebagai kelas Tailwind (`bg-warm-50`, `border-warm-200`, dll).

Preview: [colors_extended.html](preview/colors_extended.html)

---

## shadcn/ui Compatibility (v2.0)

Design system ini sekarang sepenuhnya kompatibel dengan shadcn/ui:

- **Format token**: Bare HSL values — `--primary: 196 100% 40%`
- **Usage di CSS**: `hsl(var(--primary))`
- **Usage di Tailwind**: `hsl(var(--primary) / <alpha-value>)`
- **Style**: `new-york`
- **Config**: lihat `components.json` dan `tailwind.config.ts`

---

## Migration Guide: v1.0 → v2.0

### Breaking Change: CSS Variable Format

Semua token warna berubah dari format `hsl()` wrapped ke bare HSL:

```css
/* v1.0 — lama */
--primary: hsl(196, 100%, 40%);
color: var(--primary);

/* v2.0 — baru */
--primary: 196 100% 40%;
color: hsl(var(--primary));
/* Dengan alpha: */
color: hsl(var(--primary) / 0.8);
```

**Langkah migrasi:**
1. Di CSS files kamu, ganti semua `var(--color-token)` → `hsl(var(--color-token))`
2. Jika menggunakan Tailwind, gunakan config dari `tailwind.config.ts` ini — semua sudah di-handle
3. Jika menggunakan shadcn/ui components, tidak perlu perubahan manual

### New Tokens (additive, tidak breaking)
- `--card`, `--card-foreground`
- `--popover`, `--popover-foreground`
- `--input` (alias dari `--border`)
- `--sidebar-ring`
- `--radius` (alias dari `--radius-lg`, untuk shadcn/ui)
- `--navy-*`, `--amber-*` (extended palettes)
