![versi](https://img.shields.io/badge/versi-4.8.1-blue) ![lisensi](https://img.shields.io/badge/lisensi-UNLICENSED-lightgrey) ![node](https://img.shields.io/badge/node-%3E%3D20-green)

# BPS Kaltara Design System

Sistem desain internal BPS Provinsi Kalimantan Utara. Dibangun di atas React 19,
TypeScript, Tailwind CSS 4, dan shadcn/ui (gaya `new-york`). Satu source tree
melayani dua mode:

- **Library** — paket privat `@bpsprovkaltara/design-system` untuk aplikasi
  internal BPS.
- **Showcase** — SPA React berbasis Vite sebagai dokumentasi interaktif, tayang
  di [design.kaltarastats.id](https://design.kaltarastats.id).

Tema visualnya **"Civic Editorial × Data-First Swiss"** — navy sebagai warna
primer (`#1e3a5f`), amber sebagai aksen (`#f59e0b`), Fraunces untuk display,
serta IBM Plex Sans dan Mono untuk teks dan kode.

Repo ini **bukan aplikasi Next.js**. Directive `'use client'` pada modul tertentu
hanya menjaga kompatibilitas konsumen React Server Components; `vite.lib.config.ts`
memakai `preserveModules` agar directive itu tetap ada pada output subpath.

Migrasi dari v3: lihat [UPGRADE_NOTES.md](./UPGRADE_NOTES.md).

---

## Fitur

- Katalog komponen UI berbasis shadcn/ui dan Radix, plus komposit khas BPS
  (`KpiCard`, `StatusBadge`, dan lainnya).
- Sistem token tiga lapis: primitive → semantic → alias kompatibilitas shadcn.
- Dukungan mode terang dan gelap di seluruh komponen.
- Ekspor subpath per komponen, pattern, dan hook, sehingga konsumen dapat
  mengambil seperlunya.
- Dua kontrak CSS terpisah: `styles.css` all-in-one untuk konsumen non-Tailwind,
  `tokens.css` tanpa preflight untuk konsumen Tailwind 4.
- Showcase interaktif dengan contoh langsung dan blok kode siap salin.

## Untuk konsumen

### Pilih versi

Dua jalur rilis dipelihara paralel (detail di [DESIGN.md](./DESIGN.md)):

| Versi | dist-tag | Untuk aplikasi | Branch |
|---|---|---|---|
| v4 (terbaru) | `latest` / `@^4` | Tailwind 4 + React 19 | `main` |
| v3 (LTS) | `legacy` / `@^3` | Tailwind 3 + React 18 | `v3` |

### Pasang

Paket dipublikasikan ke **GitHub Packages** (registry privat), bukan npm publik.
Tambahkan `.npmrc` di aplikasi konsumen:

```
@bpsprovkaltara:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

```bash
pnpm add @bpsprovkaltara/design-system@latest   # v4
# atau: pnpm add @bpsprovkaltara/design-system@legacy   # v3
```

Konsumen Next.js **wajib** mengisi `asChild` / `renderLink` pada komponen
navigasi (`RowDetailLink`, `LinkButton`, `FilterChips`, `SectionTabs`,
`TablePagination`, `AppShell`) — lihat [docs/consumer-chrome.md](./docs/consumer-chrome.md).

Peer dependency — pasang di aplikasi konsumen bila belum ada:

```bash
pnpm add react@^19 react-dom@^19 tailwindcss@^4

# Opsional, hanya bila memakai komponen Form:
pnpm add react-hook-form zod @hookform/resolvers
```

`react-hook-form`, `zod`, dan `@hookform/resolvers` bersifat **peer opsional**.
Konsumen yang tidak memakai `Form` tidak perlu memasangnya.

### Matriks impor

| Impor | Kegunaan |
|---|---|
| `@bpsprovkaltara/design-system` | Barrel API publik + side effect CSS all-in-one |
| `@bpsprovkaltara/design-system/components/ui/*` | Modul UI terarah. CSS **tidak** dijamin ikut lewat subpath |
| `@bpsprovkaltara/design-system/patterns/*` | Pattern terarah |
| `@bpsprovkaltara/design-system/hooks/*` | Hook terarah |
| `@bpsprovkaltara/design-system/utils` | `cn`, aman untuk RSC (tanpa `'use client'`) |
| `@bpsprovkaltara/design-system/styles.css` | CSS all-in-one terkompilasi, **termasuk** preflight |
| `@bpsprovkaltara/design-system/tokens.css` | Token + `@theme` + utilitas DS, **tanpa** preflight |
| `@bpsprovkaltara/design-system/fonts.css` | Google Fonts CDN, opt-in |
| `@bpsprovkaltara/design-system/tailwind-preset` | Shim kosong, **deprecated** — jangan dipakai untuk integrasi baru |

### Impor CSS

Impor CSS **tepat sekali** di root aplikasi. Jangan mengimpor `styles.css` dan
`tokens.css` sekaligus.

**Konsumen non-Tailwind** — pakai yang all-in-one:

```ts
import '@bpsprovkaltara/design-system/styles.css'
```

**Konsumen Tailwind 4** — aplikasi Anda sudah punya preflight sendiri, jadi
`styles.css` akan menggandakan base/reset. Pakai `tokens.css`:

```css
@import "tailwindcss";                                  /* preflight aplikasi, sekali saja */
@import "@bpsprovkaltara/design-system/tokens.css";     /* token + tema DS, tanpa preflight */
@source "../node_modules/@bpsprovkaltara/design-system/dist";  /* generate kelas komponen DS */
```

Konsumen Tailwind 4 yang memakai subpath komponen juga harus mengimpor
`tokens.css`, dan sebaiknya menghindari barrel root agar tidak terkena side
effect `styles.css`.

Ikuti [dokumentasi Tailwind v4](https://tailwindcss.com/docs/installation) untuk
stack Anda — misalnya menambahkan plugin `@tailwindcss/vite` pada
`vite.config.ts`. Paket ini sudah CSS-first.

### Font

Sejak v4.0.1, `styles.css` **tidak lagi** memuat Google Fonts, demi menghindari
render-blocking dan masalah privasi. Konsumen menyediakan font sendiri.

| Token | Family | Weight |
|---|---|---|
| `--font-sans` | IBM Plex Sans | 400, 500, 600, 700 |
| `--font-mono` | IBM Plex Mono | 400, 500 |
| `--font-display` | Fraunces | 300–900 (opsz 9–144) |

```ts
// Next.js — disarankan; self-host otomatis, tanpa render-block
import { IBM_Plex_Sans, IBM_Plex_Mono, Fraunces } from 'next/font/google'
```

```css
/* Atau jalur CDN opt-in — paling mudah, bukan default */
@import "@bpsprovkaltara/design-system/fonts.css";
```

Token sudah punya fallback sistem (`system-ui`, `serif`, `monospace`), jadi teks
tetap tampil sebelum font kustom termuat.

### Contoh pemakaian

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

## Teknologi

| Area | Pilihan |
|---|---|
| Runtime UI | React 19 |
| Bahasa | TypeScript 6 |
| Build | Vite 8 |
| Styling | Tailwind CSS 4, CSS-first |
| Komponen dasar | shadcn/ui gaya `new-york` + Radix UI |
| Routing showcase | React Router 7 |
| Form | react-hook-form + zod (peer opsional) |
| Command palette | cmdk |
| Tanggal | react-day-picker + date-fns |
| Ikon | lucide-react |
| Uji | Vitest 4 + Testing Library + jsdom |
| Paket | pnpm 10.30 |
| Node.js | ≥20 |

## Sistem token

Token tersusun tiga lapis:

1. **Primitive** — `--navy-*`, `--amber-*`, `--emerald-*`, `--crimson-*`,
   `--slate-*`, `--warm-*`.
2. **Semantic** — `--surface-*`, `--content-*`, `--border-*`, `--brand-*`,
   `--feedback-*`, `--data-*`, `--chart-*`, `--map-tier-*`.
3. **Kompatibilitas** — alias shadcn (`--background`, `--primary`, `--card`,
   `--input`) dan pemetaan `@theme` ke utility Tailwind.

Nilai warna umumnya berupa bare HSL dan dipakai sebagai `hsl(var(--token))`.
Pengecualian: `--warm-50`, `--warm-100`, dan `--warm-200` sudah dibungkus
`hsl()` — gunakan `var(--warm-*)` langsung, atau varian `--warm-*-hsl` bila
butuh komponen HSL mentah.

Token khusus komponen lama (`--button-*`, `--input-*`) **sudah dihapus**. Jangan
menghidupkannya kembali tanpa kebutuhan nyata dan wiring lengkap; komponen
memakai token semantik atau alias kompatibilitas.

## Pengembangan

```bash
pnpm install
pnpm dev        # showcase di http://localhost:5173
```

| Perintah | Kegunaan |
|---|---|
| `pnpm dev` | Dev server showcase |
| `pnpm build` | Build showcase (`tsc && vite build`) |
| `pnpm build:lib` | Build library + salin aset CSS |
| `pnpm preview` | Pratinjau hasil build showcase |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` / `pnpm lint:fix` | ESLint |
| `pnpm format` / `pnpm format:check` | Prettier |
| `pnpm test` / `pnpm test:watch` / `pnpm test:ui` | Vitest |
| `pnpm test:coverage` | Laporan coverage (v8, lcov + teks) |

## Struktur direktori

```text
src/
├── components/
│   ├── ui/          # Primitif shadcn + komposit BPS
│   ├── patterns/    # Pola tingkat tinggi (EmptyState)
│   ├── showcase/    # Helper dokumentasi (SectionHeader, CodeBlock, ColorSwatch)
│   └── layout/      # Sidebar.tsx — navigasi showcase
├── hooks/           # Hook publik
├── layouts/         # ShowcaseLayout.tsx
├── lib/             # utils.ts (helper cn)
├── pages/
│   ├── overview/    # OverviewPage, InstallationPage
│   ├── foundations/ # ColorsPage, TypographyPage, SpacingPage
│   ├── components/  # Halaman showcase per komponen
│   └── prototypes/  # Prototipe halaman penuh
├── test/            # setup.ts
├── index.ts         # API publik library
├── main.tsx         # Entry showcase
└── tailwind-preset.ts   # Shim kompatibilitas, deprecated
colors_and_type.css      # Token + directive CSS-first Tailwind 4
tokens.css, fonts.css    # Kontrak CSS konsumen
design/
├── DESIGN.md            # Referensi historis Kinara — bukan panduan aktif
└── design-tokens.json   # Ekspor token
```

## Menambah atau mengubah komponen

Sebuah komponen belum selesai sampai enam bagian ini terpenuhi:

1. **Implementasi** — source di `src/components/ui/` atau `src/components/patterns/`.
2. **Ekspor** — perbarui `src/index.ts` dan pastikan subpath cocok dengan
   `package.json#exports`.
3. **Uji** — `.test.tsx` berdampingan dengan source.
4. **Showcase** — halaman di `src/pages/components/`.
5. **Route** — sinkronkan di `src/App.tsx`.
6. **Navigasi** — sinkronkan di `src/components/layout/Sidebar.tsx`.

Untuk perubahan kecil pada komponen yang sudah ada di halaman gabungan, cukup
perbarui demo, route, dan navigasi yang relevan — jangan membuat route duplikat
demi memenuhi checklist secara mekanis.

## Pengujian

```bash
pnpm test
pnpm test:coverage
```

Berkas uji berdampingan dengan komponen, berakhiran `.test.tsx`. Coverage
menyasar `src/components/**`.

| Jenis perubahan | Pemeriksaan minimum |
|---|---|
| Dokumentasi saja | Cek path dan identifier, tinjau diff, `git diff --check` |
| Tipe atau utilitas murni | `pnpm typecheck`, `pnpm lint`, uji terkait |
| Komponen atau hook | `pnpm typecheck`, `pnpm lint`, `pnpm test`, cek interaksi dan aksesibilitas |
| Token atau CSS | `pnpm build:lib`, cek terang/gelap dan konsumen Tailwind/non-Tailwind |
| Ekspor publik atau konfigurasi build | `pnpm build:lib`, cek ESM/CJS/tipe/subpath dan output CSS |
| Route atau showcase | `pnpm build`, cek route langsung, navigasi, tampilan responsif |
| Dependency atau rilis | Pemeriksaan relevan di atas + `pnpm audit` |

`vitest.config.ts` saat ini menetapkan threshold 34% statements, 42% branches,
26% functions, dan 34% lines. Itu **bukan** gate 80% repo-wide. Target ≥80%
berlaku untuk kode baru atau berubah, termasuk jalur error dan interaksi penting.

## Build dan rilis

```bash
pnpm build:lib
```

Keluaran di `dist/`:

| Berkas | Isi |
|---|---|
| `index.js` | ESM, per-modul (`preserveModules`) |
| `index.cjs` | CommonJS |
| `index.d.ts` | Deklarasi tipe |
| `styles.css` | All-in-one: preflight + utilitas + token, untuk non-Tailwind |
| `tokens.css` | Token + `@theme` + utilitas DS, **tanpa** preflight |
| `fonts.css` | `@import` Google Fonts CDN, opt-in |
| `tailwind-preset.js` / `.cjs` / `.d.ts` | Shim deprecated |

Rilis berjalan otomatis lewat `.github/workflows/release.yml` saat push tag `v*`:

- Tag `v4.*` dari branch `main` → dist-tag `latest`.
- Tag `v3.*` dari branch `v3` → dist-tag `legacy`.

Workflow memverifikasi `version` di `package.json` cocok dengan tag sebelum
publish. Bump versi dilakukan manual sebelum membuat tag.

## Keamanan dan privasi

- Validasi data eksternal di boundary komponen — terutama URL, berkas, nilai
  form, dan data tabel.
- Jangan merender HTML mentah. Bila `dangerouslySetInnerHTML` benar-benar
  diperlukan, sanitasi lebih dulu.
- Jangan hardcode token, kredensial, URL privat, atau data pribadi, dan jangan
  mencatat payload yang mungkin memuat data pribadi BPS.
- Pertahankan dependency runtime sebagai dependency atau peer eksplisit — jangan
  membundel salinan React.
- Font CDN tidak boleh dijadikan default karena implikasi privasi dan
  ketersediaan.
- Jangan menurunkan aksesibilitas saat mengganti primitive Radix dengan markup
  kustom.

Pelaporan kerentanan: [SECURITY.md](./SECURITY.md).

## Dokumentasi

| Berkas | Isi |
|---|---|
| [DESIGN.md](./DESIGN.md) | Aturan desain aktif dan panduan agen konsumen |
| [GUIDE.md](./GUIDE.md) | Panduan penggunaan |
| [CLAUDE.md](./CLAUDE.md) / [AGENTS.md](./AGENTS.md) | Invariant, matriks pengujian, Definition of Done |
| [UPGRADE_NOTES.md](./UPGRADE_NOTES.md) | Migrasi v3 → v4 |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Proses kontribusi |
| [CHANGELOG.md](./CHANGELOG.md) | Riwayat perubahan |
| [docs/architecture.md](./docs/architecture.md) | Arsitektur |
| [docs/development.md](./docs/development.md) | Panduan pengembangan dan daftar route showcase |
| [docs/api.md](./docs/api.md) | Kontrak API |
| [docs/deployment.md](./docs/deployment.md), [docs/runbook.md](./docs/runbook.md) | Deployment dan operasional |
| [docs/decisions/](./docs/decisions/) | ADR |
| [docs/releases/](./docs/releases/) | Catatan rilis siap salin |

Knowledge graph kode ada di `graphify-out/GRAPH_REPORT.md`.

## Tautan

- Showcase: <https://design.kaltarastats.id>
- Repository: <https://github.com/bpsprovkaltara/design-system>
- Issues: <https://github.com/bpsprovkaltara/design-system/issues>

## Kontribusi

Baca [CONTRIBUTING.md](./CONTRIBUTING.md). Ringkasnya:

- Simbol React memakai PascalCase; nama berkas komponen memakai kebab-case.
- Gunakan named export dan ekspor tipe props yang menjadi bagian API publik.
- Alias `@/` menunjuk `src/`. Gabungkan class kondisional dengan `cn()`.
- Pakai token semantik atau utility Tailwind — jangan hardcode warna di komponen.
  Pertahankan dukungan terang dan `.dark`.
- Copy UI memakai Bahasa Indonesia formal tanpa emoji; format angka dengan
  `Intl.NumberFormat('id-ID')`.
- Jaga navigasi keyboard, focus state, label, semantic HTML, dan atribut ARIA.
- Tambahkan `'use client'` hanya pada modul yang memang butuh boundary client
  atau harus kompatibel dengan konsumen client component.
- Jangan mengedit `dist/` — itu output build, bukan source.
- Perbarui dokumen konsumen dan `CHANGELOG.md` bila perilaku konsumen berubah.

## Lisensi

`UNLICENSED` — penggunaan internal BPS Provinsi Kalimantan Utara. Paket
dipublikasikan ke GitHub Packages privat, bukan registry npm publik.
