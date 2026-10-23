# Panduan konsumsi BPS Kaltara Design System

Panduan integrasi v4, berdasarkan exports dan CSS source saat ini. [DESIGN](../DESIGN.md) memegang token normatif; [API](api.md) memegang kontrak library. Integrasi chrome dan link framework: [consumer-chrome](consumer-chrome.md); perubahan versi: [upgrading](upgrading.md) dan [CHANGELOG](../CHANGELOG.md).

## Prasyarat dan pemasangan

Pilih jalur yang sesuai aplikasi: v4 React >=19/Tailwind >=4, Node >=20; v3 legacy React18/Tailwind3.4. Registry scope @bpsprovkaltara memakai GitHub Packages, credential read:packages dari environment/home npmrc, tanpa token committed. Setup npmrc di [README](../README.md#mulai-cepat).

```bash
pnpm add @bpsprovkaltara/design-system@latest
# Peer opsional bila memakai Form:
pnpm add react-hook-form zod @hookform/resolvers
```

Gunakan paket yang sudah diekspor alih-alih menyalin primitive lokal tanpa alasan. Tidak perlu menjalankan CLI shadcn untuk memakai komponen paket; components.json hanya konfigurasi generator bila aplikasi memang merawat source sendiri.

## Memilih stylesheet

| Konsumen | Entry |
|---|---|
| Tanpa pipeline Tailwind | styles.css compiled, dengan preflight |
| Tailwind4 yang sudah memiliki preflight | tokens.css source, tanpa preflight |
| Font CDN opt-in | fonts.css; bukan default |

Konsumen Tailwind memerlukan source dist untuk menghasilkan kelas komponen. Path @source relatif terhadap file CSS aplikasi; sesuaikan kedalaman yang nyata.

```css
@import "tailwindcss";
@import "@bpsprovkaltara/design-system/tokens.css";
@source "../node_modules/@bpsprovkaltara/design-system/dist";
@source "../src";
```

Jangan import styles.css dan tokens.css sekaligus. Subpath komponen tidak menjamin CSS ikut. Barrel memuat CSS all-in-one; gunakan import modul terarah dan pilihan CSS yang sesuai bila aplikasi sudah mengelola preflight. tailwind-preset v4 adalah shim deprecated, bukan setup baru.

## Next.js dan React

Repo library/showcase bukan Next.js. Aplikasi konsumen tetap mengelola layout, global CSS, auth dan router. Gunakan versi framework yang kompatibel peer React19/Tailwind4; scaffolding framework tidak menjadi script repository ini.

```tsx
import { Button } from '@bpsprovkaltara/design-system/components/ui/button'
import { FormSheet } from '@bpsprovkaltara/design-system/components/ui/form-sheet'

<FormSheet title="Edit aktivitas" trigger={<Button>Edit</Button>}>
  {(close) => <button onClick={close}>Tutup</button>}
</FormSheet>
```

Boundary client diperlukan untuk hooks/interaksi; preserveModules menjaga directive use client. Utilitas murni dapat diambil dari subpath utils. Komponen navigasi memakai asChild/renderLink dengan link router; jangan menambah Next dependency ke library. Tabel adapter lengkap ada di consumer-chrome.

## HTML/CSS statis

Browser tidak memproses directive @theme/@utility pada raw tokens.css. Gunakan styles.css compiled dari paket atau pipeline Tailwind bila mengolah tokens.css. CSS saja tidak membuat komponen React hidup pada halaman HTML.

```html
<link rel="stylesheet" href="./assets/css/bps-styles.css">
<section class="bg-background text-foreground">Ringkasan</section>
```

bps-styles.css adalah salinan compiled styles.css dari versi library yang dipilih. Font dimuat terpisah; tidak otomatis di-import dari token.

## Laravel Blade dan Vite

Blade dapat memakai token/utilitas CSS tanpa primitive React. Bila memakai Tailwind4, import tailwindcss dan paket tokens.css, lalu @source views/js serta dist paket dengan path relatif sesuai resources/css. Integrasi React tambahan dikelola aplikasi sendiri.

```css
@import "tailwindcss";
@import "@bpsprovkaltara/design-system/tokens.css";
@source "../views";
@source "../js";
@source "../../node_modules/@bpsprovkaltara/design-system/dist";
```

Layout Blade memuat CSS lewat mekanisme Vite aplikasi; font self-host atau link/CDN opt-in dikelola aplikasi, tidak otomatis dalam token.

## Warna dan token semantik

Tiga lapis: primitive skala → semantic role → alias shadcn/@theme. Komponen memakai surface/content/border/brand/feedback/data/chart/map-tier, bukan skala navy/amber langsung.

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

Umumnya nilai bare HSL, dibungkus hsl saat memakai var. Pengecualian warm-50/100/200 telah terbungkus: var langsung, atau hsl(var(--warm-50-hsl)) untuk kanal. Jangan double-wrap. Semantik primary memakai navy incumbent, card warm-100; jangan menganggap keduanya identitas biru/putih lama. Chart mempunyai sepuluh token seri; map-tier 0–5 dan active. Nilai aktual light/.dark ada di tokens.css dan DESIGN; jangan memelihara salinan tabel nilai yang menyimpang.

## Font dan tipografi

Fraunces untuk display editorial; IBM Plex Sans untuk heading UI, body, kontrol; IBM Plex Mono untuk angka/kode. Font stack CSS tidak mengunduh font. Showcase memakai link index.html, font produksi disediakan konsumen (self-host atau mekanisme font framework); fonts.css hanya jalur CDN opt-in.

Utilitas tipografi/numeric mengikuti tokens.css. PageHeader merender h1 dengan kelas h2. Format angka gunakan Intl.NumberFormat('id-ID'); gunakan tabular numeric untuk data. Fallback tetap terbaca bila CDN diblokir. Jangan memberi Fraunces pada input atau tombol.

## Layout, bentuk dan motion

Skala dasar empat poin, spacing dan radius normatif di DESIGN/tokens.css. Default radius md tombol/input, xl kartu; jangan menganggap radius-xl sama dengan default Tailwind. Shell sidebar expanded 280px, collapsed64px, topbar64px. Background dan border semantik memisahkan permukaan sebelum menambah bayangan.

Token transisi source memakai fast/base/slow dan motion-duration; reduced-motion menurunkan animation/transition. Jangan menambah library motion JS, sesuai ADR 0002.

## Light dan dark

Class .dark mengganti token semantic dan compatibility. Konsumen mengelola preferensi/persistence; ThemeToggle/useTheme tersedia untuk pola yang sesuai aplikasi. Periksa warna, label/focus dan kontras di kedua mode. Framework hydration adalah tanggung jawab aplikasi; jangan memakai suppressHydrationWarning sebagai solusi untuk mismatch lain.

## Pola aplikasi

- PageHeader untuk judul/aksi; KpiCard/PerformanceCard untuk metrik.
- AppShell sudah menyediakan toggle desktop dan menu mobile; slots logo/footer/topbar milik konsumen.
- DataTable mendukung loading/error/empty, sorting client-side, pageSize client dan pagination server terkontrol; data fetch tetap di app.
- FilterBar composable memakai FilterField search/select/custom atau children; preset DocumentFilterBar menjaga API domain lama.
- FormDialog/FormSheet menyediakan overlay; validasi form memakai optional peers bila dibutuhkan.
- CommandSearch menyediakan panel dan shortcut; app memasok hasil/fetch. CommandDialog commandProps dapat menonaktifkan filter cmdk untuk hasil server.
- Tabs untuk panel satu halaman, SectionTabs untuk sibling route dengan pathname/renderLink.
- StatusBadge memakai children sebagai teks; status tidak disampaikan oleh warna saja.
- EmptyState/DataStatePanel/PageSkeleton merender state dengan aksi yang dapat ditindaklanjuti.

Kontrak props dan daftar ekspor lengkap: API, source declarations dan index.

## Checklist integrasi

- Versi paket/peer cocok; registry credential tidak masuk Git.
- CSS entry dipilih satu, source dist benar dan tidak double-preflight.
- Font Fraunces/IBM Plex termuat atau fallback dapat dibaca.
- Komponen link memakai adapter router; server/client boundary benar.
- Keyboard/focus-visible, icon aria-label, form label dan skip link diuji.
- Kontras teks target WCAG AA dan state light/.dark diuji; angka id-ID dan null dash yang jelas.
- Loading/error/empty/ready dan reduced motion diuji.
- Data auth/notifikasi/pencarian tetap berasal aplikasi, tanpa PII/credential log.

Contoh dashboard: [prototype](../ui_kits/dashboard/README.md); prototype bukan data resmi produksi.
