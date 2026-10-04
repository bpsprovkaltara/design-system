# Pengembangan BPS Kaltara Design System

## Prasyarat

Node >=20 (CI/Docker memakai Node 20) dan pnpm 12.6.0 sesuai manifest. Cek node --version dan pnpm --version. Lockfile runtime dokumen kedua: React 19.2.6, Vite 8.0.11, TS 6.0.3, Vitest 4.1.5.

## Setup lokal

```bash
git clone https://github.com/bpsprovkaltara/design-system.git
cd design-system
pnpm install
pnpm dev
```

Showcase berjalan di http://localhost:5173. Jangan memakai package manager lain atau mengedit output dist/node_modules.

## Scripts

| Script | Implementasi manifest |
|---|---|
| dev | vite |
| build | tsc && vite build |
| build:lib | vite build --config vite.lib.config.ts && node scripts/copy-css-assets.mjs |
| preview | vite preview |
| prepublishOnly | pnpm run build:lib |
| test | vitest run |
| test:watch | vitest |
| test:ui | vitest --ui |
| test:coverage | vitest run --coverage |
| lint | eslint src |
| lint:fix | eslint src --fix |
| format | prettier --write "src/**/*.{ts,tsx,css}" |
| format:check | prettier --check "src/**/*.{ts,tsx,css}" |
| typecheck | tsc --noEmit |
| prepare | pnpm run prepare:hooks |
| prepare:hooks | husky |

Build showcase/library berbagi dist; build terakhir menentukan isi folder. prepare memasang hook saja, tidak build library. Rilis memicu prepublishOnly.

## Branching dan commit

Repo internal; kontribusi eksternal tidak diterima. Branch dari main dengan feat/, fix/, chore/, docs/; PR ke main, jangan commit langsung ke main. Jalur v3 legacy terpisah. Conventional Commits, scope opsional, subject lowercase imperatif maksimum 72 karakter. Minimal satu approval; author merge dan menghapus branch sesuai proses tim.

## Alur menambah fitur

1. Baca AGENTS dan status Git, identifikasi public API/consumer impact.
2. Implementasi src/components/ui atau patterns dengan named exports dan props types.
3. Ekspor src/index.ts selaras exports package.json.
4. Tambahkan regression test berdampingan .test.tsx.
5. Perbarui showcase page, route src/App.tsx dan navigasi src/components/layout/Sidebar.tsx.
6. Jalankan gate relevan dan dokumentasikan perubahan konsumen/release.

Komponen yang sudah berada pada halaman gabungan cukup memperbarui yang relevan; jangan membuat route duplikat secara mekanis.

## Konvensi kode

Simbol PascalCase, file komponen kebab-case; @/ untuk source internal; cn untuk class kondisional; state/props immutable. Warna semantik/Tailwind, bukan hardcoded hex; dukung light/.dark. UI Bahasa Indonesia formal tanpa emoji; angka Intl.NumberFormat('id-ID'). Keyboard, semantic HTML, focus, label dan ARIA wajib. Komponen navigasi menyediakan asChild/renderLink, tanpa dependency Next.js. Tokens normatif di tokens.css dan [DESIGN](../DESIGN.md), bukan entry colors_and_type.css.

## Testing

```bash
pnpm typecheck
pnpm lint
pnpm test
```

Vitest/Testing Library/jsdom; test source berdampingan. Threshold global saat ini 34% statements, 42% branches, 26% functions, 34% lines; target kode baru/berubah >=80% tanpa mengecualikan file secara palsu. CI main/v3 memeriksa client directives, test, build:lib dan build showcase. Perubahan CSS/API/build perlu build:lib dan integrasi Tailwind/non-Tailwind/RSC; route/showcase perlu build dan navigasi/responsif. Dependency/rilis juga audit. Dokumentasi saja memakai cek path/link/versi dan git diff --check, tanpa build.

## Debugging

- Focus CommandInput: jangan menghilangkan seluruh indikator fokus; gunakan wrapperClassName/focus-visible yang selaras primitive.
- warm token invalid: var(--warm-50) langsung atau hsl(var(--warm-50-hsl)); jangan hsl(var(--warm-50)).
- Styling hilang: pilih CSS entry sesuai tool konsumen, source dist untuk Tailwind; jangan double preflight.
- Font fallback: CSS paket tidak memuat font default; index.html showcase memakai link, konsumen self-host/CDN opt-in.
- require is not defined/RSC: telusuri external deps, preserveModules, exports dan client directives.

## Kontribusi

PR menyertakan kontrak API/tipe/CSS, test, showcase bila relevan, aksesibilitas/light-dark, dokumentasi dan CHANGELOG untuk perubahan rilis. Jangan stage env/secret, output generated atau WIP pihak lain. Rincian deployment/rilis: [operations](operations.md); konsumsi: [api](api.md), [guide](guide.md), [consumer chrome](consumer-chrome.md).
