# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

## [4.5.0] - 2026-07-19

### Added

- **`AppShell`**, **`AppSidebar`**, **`AppTopbar` (slot-based)** — layout aplikasi dengan collapse, mobile Sheet, dan slot topbar (`start` / `end`)
- **`ThemeToggle`** / **`useTheme`** — toggle dark mode berbasis class `.dark` (sebelumnya hanya di showcase)
- **`FilterBar` composable** — `filters: FilterField[]` atau `children`; domain preset baru **`DocumentFilterBar`**
- **`DataTable`**: state `loading` / `error` / empty (`EmptyState`), pagination server (`pagination`)
- **`ConfirmDialog`** — controlled/open, `trigger` ReactNode, `busy`, `showReason`, `variant` destructive, `onConfirm` async
- **`Pagination`**: prop `renderLink` untuk render item sebagai `<a>` (navigasi berbasis URL, mis. Next.js `Link`)
- **`TablePagination`** — kontrol pagination siap pakai untuk `DataTable` (halaman, total, page size)
- **`StatusBadge`**: prop `tone` untuk override warna di luar variant status baku
- **`TableEmpty`** — state kosong siap pakai untuk body tabel (ikon, judul, deskripsi)
- **`PageHeader`**: prop `titleClassName` untuk override style judul halaman

### Changed

- **`AppTopbar`**: API stub `appTitle`-only diganti slot; `appTitle` tetap didukung sebagai fallback
- **`FilterBar`**: API `{keyword,status,unitKerja}` ditandai deprecated (masih berfungsi); prefer `filters` / `DocumentFilterBar`
- **`ConfirmActionDialog`**: thin wrapper deprecated di atas `ConfirmDialog`

## [4.4.0] - 2026-07-19

### Added

- **`DataTable`**: sorting kolom (`sortable`) dan pagination client-side (`pageSize`)
- **`BulkActionBar`**: API generik `actions[]` (menggantikan aksi hardcode)
- **`YearSelect`** — pemilih tahun untuk survei/publikasi BPS
- **`NumberField`** — input angka dengan format `id-ID` dan unit opsional
- **`MapLegend`** — legenda choropleth memakai token `map-tier-*`
- **`SkipLink`** — tautan lewati ke konten utama (a11y keyboard)
- Export type props BPS (`ComboboxProps`, `DataTableProps`, `FilterBarProps`, `StatusBadgeProps`, dll.)
- Showcase **Empty State**; demo FilterBar options kustom; ColorsPage untuk `slate-*`, `map-tier-*`, brand/data dark
- CI: cek `'use client'` pada modul UI yang memakai hooks
- Tes: FilterBar, StatusBadge, BulkActionBar, LinkButton, EmptyState, DataTable actions, MapLegend, SkipLink, ValidationSummary, PageHeader, KpiCard

### Changed

- **`prepare`**: hanya menjalankan husky (`prepare:hooks`); build library tetap di `prepublishOnly` / CI
- Peer deps opsional: `react-hook-form`, `zod`, `@hookform/resolvers` (pindah dari `dependencies`)
- **`DataTable`**: kolom Aksi tidak lagi hardcode — gunakan `renderRowActions`
- **`FilterBar`**: `statusOptions` / `unitKerjaOptions` dapat di-override; label Select terasosiasi
- **`StatusBadge`**: tipe `StatusBadgeProps` / `statusBadgeVariants` (bukan `BadgeProps` / `badgeVariants`)
- Package `exports`: subpath UI kanonik `./components/ui/*` (catch-all `./*` dihapus)
- Dark mode: override `--brand-*`, `--data-*`, `--map-tier-*`; `slate` / `map-tier` / fonts di `@theme`
- Hapus Layer C token mati (`--button-primary-*`, `--input-*`, `--table-*` tidak terpakai)

### Fixed

- `CommandInput`: fokus keyboard via inset shadow (bukan tanpa indikator)
- `PaginationEllipsis`: teks `sr-only` tidak lagi tersembunyi oleh `aria-hidden` parent
- Sidebar showcase: collapse a11y (`aria-label` / `aria-current`), versi footer diselaraskan
- Docs/CI: runtime resmi **Node ≥20** (Dockerfile, GitHub Actions, `engines`) — mengoreksi klaim Node 24 yang tidak selaras
- `docs/api.md`: deskripsi `DataTable` / `Combobox` diselaraskan dengan implementasi aktual
- Konflik export tipe `SparklineProps` / `StepperProps`

## [4.3.0] - 2026-06-29

### Added

- **`LinkButton`** — komponen navigasi first-class bergaya tombol yang memakai
  `buttonVariants()` langsung, mendukung `variant`, `size`, `iconLeft`, `iconRight`, dan
  `asChild` untuk integrasi Next.js `<Link>`.
- GitHub Actions CI (`.github/workflows/ci.yml`): typecheck, lint, test, `build:lib`, `build` pada push/PR ke `main`
- `docs/releases/v4.0.0-github.md` — teks siap tempel untuk halaman rilis GitHub
- **`Sparkline`** & **`BarChart`** — primitif visualisasi data berbasis SVG ringan (tanpa dependensi baru), warna lewat token `--chart-*`. `PerformanceCard` kini memakai `Sparkline` yang sama (satu sumber)
- **`Stepper`** — indikator alur langkah horizontal untuk workflow dokumen (status `complete | current | upcoming | error`)
- **`DateRangePicker`** — pemilih rentang tanggal (Calendar mode `range`, format locale `id-ID`)
- Toggle dark mode pada showcase (footer sidebar) + skrip inline anti-FOUC di `index.html` untuk memverifikasi tema gelap yang sudah terdefinisi di token

### Changed

- `Dockerfile`: builder/runtime **Node 24** + **pnpm** + `pnpm-lock.yaml` (menggantikan image Bun)
- `docker-compose.yml`: menghapus kunci `version` yang sudah usang
- Dokumentasi: `docs/deployment.md`, `docs/development.md`, `docs/runbook.md` diselaraskan dengan v4 / Node 24
- GitHub Actions CI: runtime diperbarui ke **Node 24** (commit `1861196`)
- `UPGRADE_NOTES.md`: panduan konsumen diperluas (Vite, `@source`, checklist)

### Fixed

- **`Button asChild` untuk navigasi**: test coverage diperluas untuk pola `<a>`/Next Link
  dengan icon inline, `iconLeft`, `iconRight`, dan `loading`; build library kini memastikan
  output `dist/components/ui/button.js` tetap memakai `Slot.Slottable`.
- **`Alert`**: judul (`<h5>`) tidak lagi menimpa ikon — selector offset diperbaiki dari `[&>svg+div]` ke `[&>svg~*]` sehingga judul ikut ter-offset
- **`AvatarGroup`**: inisial avatar yang bertumpuk kini terbaca penuh (overlap dilonggarkan, ring `ring-background`, z-order diperbaiki)
- `Sidebar`: label versi footer disamakan ke `v4.2.0`

## [4.2.0] - 2026-05-31

Rilis kompatibilitas Next.js App Router (React Server Components). Tidak ada perubahan
pada API props komponen, nama kelas, maupun output visual.

### Added

- **`@bpsprovkaltara/design-system/utils`** — subpath entry **tanpa `"use client"`** berisi
  fungsi murni: `cn`, `buttonVariants`, `toggleVariants`, `navigationMenuTriggerStyle`. Aman
  diimpor langsung di React Server Component. Sebelumnya fungsi-fungsi ini ikut ter-tandai
  client karena berada di file komponen ber-`"use client"`, sehingga tidak bisa dipakai di RSC.
- `typesVersions` untuk resolusi tipe subpath `utils`/`tailwind-preset` pada `moduleResolution: node` lama.

### Fixed

- **`Button asChild` crash `React.Children.only`.** `Button` kini membungkus `children` dengan
  `Slot.Slottable` sehingga `iconLeft`/`iconRight`/spinner tetap menjadi sibling dan Slot dapat
  menggabungkan elemen yang di-slot. `NavigationMenuTrigger` diberi perlakuan sama untuk
  pemakaian `asChild`. Perilaku saat `asChild` tidak dipakai tidak berubah (Slottable ter-render
  sebagai fragment).

### Changed

- Definisi cva murni dipindah ke file tanpa directive: `button-variants.ts`, `toggle-variants.ts`,
  `navigation-menu-variants.ts`. File komponen mengimpor + me-re-export-nya (kompatibel mundur).
  Build (`vite.lib.config.ts`) menambah entry `utils` -> `dist/utils.{js,cjs,d.ts}`.

## [4.1.0] - 2026-05-30

Rilis kualitas CSS terdistribusi. Tidak ada perubahan perilaku JS/komponen; tampilan
`styles.css` tetap sama (backward-compatible).

### Added

- **`@bpsprovkaltara/design-system/tokens.css`** — entry CSS berisi token (`:root`/`.dark`) +
  `@theme` + utilitas DS **tanpa preflight/base Tailwind**. Untuk konsumen yang sudah
  menjalankan Tailwind v4 agar tidak menggandakan preflight (double-reset). Dipakai bersama
  `@import "tailwindcss"` + `@source` ke `dist` paket.
- **`@bpsprovkaltara/design-system/fonts.css`** — jalur **opt-in** memuat Google Fonts (IBM Plex
  Sans/Mono, Fraunces) via CDN. Bukan default; tidak diimpor oleh `styles.css`.

### Changed

- Token DS dipindah ke sumber tunggal `tokens.css`; `colors_and_type.css` kini meng-`@import`-nya
  (output `dist/styles.css` byte-identik dengan hasil build sebelumnya — diverifikasi).
- README/GUIDE/UPGRADE_NOTES: dokumentasi cara memuat font sendiri + cara menghindari
  double-preflight (pakai `tokens.css`) + entry CSS baru.

### Notes

- Konsumen **non-Tailwind**: tetap pakai `styles.css` (all-in-one, termasuk preflight).
- `styles.css` tidak memuat Google Fonts sejak v4.0.1 — konsumen memuat font sendiri
  (`next/font`, `<link>`, atau `fonts.css` opt-in). Token punya fallback system.

## [4.0.1] - 2026-05-30

Rilis perbaikan packaging. **4.0.0 tidak dapat dikonsumsi di Next.js App Router (RSC)
maupun bundler ESM browser** — segera upgrade ke 4.0.1.

### Fixed

- **Bundle ESM crash `require is not defined` di browser.** Dependensi CJS
  (`react-day-picker`, `vaul`, `cmdk`, `embla-carousel-react`, `date-fns`) tidak lagi
  di-inline di balik shim runtime `typeof require`. Semua runtime + peer dependency kini
  di-`external`-kan sehingga bundle memakai `import` murni; dep tetap di `dependencies`
  agar otomatis terpasang di konsumen.
- **Directive `"use client"` hilang dari output.** Build memakai `output.preserveModules`
  sehingga tiap file komponen mempertahankan directive-nya sendiri. Impor komponen di
  Server Component tidak lagi memicu `(0,createContext) is not a function`.
- **`types`/`exports` menunjuk file yang tidak ada.** Deklarasi kini di-emit ke
  `dist/index.d.ts` (root) lewat `entryRoot: 'src'`, cocok dengan `package.json`.

### Added

- **Subpath exports per-komponen** untuk tree-shaking & isolasi RSC:
  `@bpsprovkaltara/design-system/button`, `/data-table`, `/patterns/empty-state`,
  `/hooks/use-toast`, dst. Impor barrel (`from '@bpsprovkaltara/design-system'`) tetap didukung.

### Changed

- **`@import` Google Fonts dikeluarkan dari `dist/styles.css`** (render-blocking + privasi).
  Konsumen menyediakan font sendiri (Next.js: `next/font`; lainnya: `<link>`/self-host).
  Showcase dev memuat font lewat `<link>` di `index.html`.
- Build library (`vite.lib.config.ts`) keluar dari Vite "lib mode" ke konfigurasi
  `rollupOptions` eksplisit (`preserveModules` + `preserveEntrySignatures: 'strict'`),
  menghasilkan output per-modul `dist/**`.

## [4.0.0] - 2026-05-10

### Added

- `UPGRADE_NOTES.md` untuk panduan migrasi v3 → v4

### Changed

- **Breaking:** Peer dependencies — `react` dan `react-dom` **≥ 19**, `tailwindcss` **≥ 4**
- **Breaking:** `engines.node` **≥ 20**
- Stack showcase dan library: React 19, Tailwind CSS 4, Vite 8, TypeScript 6
- Komponen UI: migrasi dari `forwardRef` ke pola `ref` sebagai prop (React 19)
- Ekspor `tailwind-preset`: shim deprecation dengan peringatan runtime; migrasi konsumen ke impor `styles.css` + konfigurasi Tailwind 4 mandiri

## [3.0.0] - 2025-04-15

### Added

- BPS app shell components: `AppTopbar`, `PageHeader`, `FilterBar`, `BulkActionBar`
- Data-management components: `DataTable` (with sorting, pagination, column visibility), `DataStatePanel`, `ConfirmActionDialog`
- Form workflow components: `FormSection`, `DatePicker`, `Combobox`
- Feedback and status components: `ProgressAudit`, `ReviewTimeline`, `ValidationSummary`
- `PerformanceCard` with sparkline, delta badge, and target percentage display
- `KpiCard` for KPI metric display
- `EmptyState` pattern component with three built-in inline SVG illustrations (`empty`, `search`, `error`)
- `StatusBadge` with four workflow variants: `draft`, `pending`, `revised`, `approved`
- `Spinner` component
- `AvatarGroup` for stacked avatar display
- Three-layer design token system in `colors_and_type.css`: primitive scales, semantic aliases, shadcn/ui compat
- 10-color chart series (`--chart-1` through `--chart-10`), colorblind-safe, BPS brand trio first
- Map choropleth tier tokens (`--map-tier-0` through `--map-tier-5`)
- Tailwind preset export at `@bpsprovkaltara/design-system/tailwind-preset`
- Dual ESM/CJS library build via `vite.lib.config.ts`
- Vitest 4 test suite with jsdom and `@testing-library/react`
- Husky pre-commit hook running lint-staged (ESLint + Prettier)
- Docker multi-stage build (Bun) serving on port 8081 via `bun x serve`
- Docker Compose configuration with Traefik reverse proxy on `design.kaltarastats.id`

### Fixed

- Dockerfile `CMD` updated to include explicit listen port (`-l 8081`), no-clipboard (`-n`), and SPA fallback (`-s`) flags for `bun x serve`
- Resolved ESLint lint errors across all component files

### Changed

- Design theme established as "Civic Editorial x Data-First Swiss"
- shadcn/ui style set to `new-york`
- Package name set to `@bpsprovkaltara/design-system`

## [2.x] - legacy

Version 2.x is no longer maintained. No migration guide is available. Upgrade directly to 4.0.0 (lihat `UPGRADE_NOTES.md` jika dari v3).

[Unreleased]: https://github.com/bpsprovkaltara/design-system/compare/v4.4.0...HEAD
[4.4.0]: https://github.com/bpsprovkaltara/design-system/compare/v4.3.0...v4.4.0
[4.3.0]: https://github.com/bpsprovkaltara/design-system/compare/v4.2.0...v4.3.0
[4.2.0]: https://github.com/bpsprovkaltara/design-system/compare/v4.1.0...v4.2.0
[4.1.0]: https://github.com/bpsprovkaltara/design-system/compare/v4.0.1...v4.1.0
[4.0.1]: https://github.com/bpsprovkaltara/design-system/compare/v4.0.0...v4.0.1
[4.0.0]: https://github.com/bpsprovkaltara/design-system/releases/tag/v4.0.0
[3.0.0]: https://github.com/bpsprovkaltara/design-system/releases/tag/v3.0.0
