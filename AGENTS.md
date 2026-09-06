# Panduan Agent — bpskaltara-design-system

Berlaku untuk seluruh repositori, agent mana pun. Perubahan sekecil mungkin,
jaga perilaku yang tidak diminta, buktikan dengan pemeriksaan yang benar-benar
dijalankan.

## Arsitektur

Sistem desain internal BPS Provinsi Kalimantan Utara. Satu source tree, dua mode:

- **Library** — paket privat `@bpsprovkaltara/design-system` (versi `4.8.1`)
  untuk aplikasi internal BPS.
- **Showcase** — SPA React + Vite untuk dokumentasi interaktif.

Repo ini **bukan aplikasi Next.js**. Directive `'use client'` pada modul
tertentu ada demi kompatibilitas konsumen React Server Components (termasuk
Next.js), bukan penanda arsitektur repo. `vite.lib.config.ts` memakai
`preserveModules` supaya directive itu tetap ada pada output subpath. Jangan
menambahkan API Next.js ke showcase Vite, dan jangan mengubah showcase jadi
framework lain ketika diminta memperbaiki kompatibilitas konsumen.

Stack: React 19, TypeScript 6, Vite 8, Tailwind CSS 4 (CSS-first), React Router 7,
shadcn/ui gaya `new-york` + Radix UI, Vitest 4 + Testing Library + `jsdom`,
pnpm 10.30.0, Node `>=20`.

Pembagian `src/`: `components/ui` primitif dan komposit BPS · `components/patterns`
pola tingkat tinggi · `components/showcase` helper dokumentasi · `components/layout`
navigasi showcase · `hooks` hook publik · `pages` halaman showcase ·
`index.ts` API publik · `main.tsx` entry showcase.

## Sumber kebenaran

Saat dokumen dan implementasi berbeda: (1) `package.json` + `pnpm-lock.yaml`
untuk versi, dependency, script, entry, `exports`; (2) `vite.config.ts`,
`vite.lib.config.ts`, `vitest.config.ts`, `tsconfig*.json`, `eslint.config.js`
untuk perilaku tool; (3) `src/index.ts`, `src/utils.ts`, `src/components/**`,
`src/hooks/**`, `src/App.tsx`, `src/components/layout/Sidebar.tsx` untuk API dan
alur aktif; (4) `tokens.css`, `colors_and_type.css`, `fonts.css`,
`scripts/copy-css-assets.mjs` untuk kontrak CSS; (5) test yang berdampingan
dengan source; (6) `DESIGN.md`, `GUIDE.md`, `README.md`, `docs/README.md`.

`design/DESIGN.md` adalah referensi historis Kinara, bukan panduan aktif BPS
Kaltara — pakai `DESIGN.md` root. `dist/` adalah output build, bukan tempat
mengedit source. Jangan mengarang script, path, export, atau token.

## Perintah

Dari root repo. Semua terverifikasi ada di `package.json`.

```bash
pnpm install
pnpm dev            # showcase
pnpm build          # tsc && vite build (showcase)
pnpm build:lib      # build library + salin tokens.css & fonts.css ke dist/
pnpm preview
pnpm typecheck
pnpm lint           # eslint; lint:fix, format, format:check tersedia
pnpm test           # test:watch, test:ui, test:coverage tersedia
```

Pilih pemeriksaan sesuai matriks di bawah; jangan menjalankan perintah berat
yang tidak relevan dengan perubahan.

## Kontrak ekspor

Jaga tetap sinkron antara `package.json#exports`, `src/index.ts`, dan hasil
`build:lib`. `exports` adalah satu-satunya kontrak subpath yang didukung.

| Import konsumen | Kontrak |
|---|---|
| `@bpsprovkaltara/design-system` | barrel API + side effect CSS all-in-one |
| `.../components/ui/*` · `.../patterns/*` · `.../hooks/*` | modul terarah; **CSS tidak dijamin ikut** lewat subpath |
| `.../utils` | `cn`, tanpa kebutuhan client component |
| `.../styles.css` | CSS terkompilasi, termasuk preflight |
| `.../tokens.css` | CSS sumber Tailwind 4, token + utilitas, tanpa preflight |
| `.../fonts.css` | Google Fonts CDN opsional, tidak dimuat default |
| `.../tailwind-preset` | shim kosong, deprecated — jangan pakai untuk integrasi baru |

Aturan konsumsi CSS: impor tepat sekali di root aplikasi konsumen · konsumen
non-Tailwind pakai `styles.css` · konsumen Tailwind 4 yang sudah punya preflight
pakai `tokens.css` setelah `@import "tailwindcss"` plus `@source` ke `dist`
paket · konsumen yang memakai subpath komponen **wajib** mengimpor `tokens.css`
· jangan mengimpor `styles.css` dan `tokens.css` sekaligus · font produksi
disediakan sendiri, `fonts.css` hanya jalur CDN opt-in.

Integrasi `Form` butuh peer opsional `react-hook-form`, `zod`,
`@hookform/resolvers`. Jangan memaksa konsumen non-form memasangnya.

## Sistem token tiga lapis

**Layer A primitive** `--navy-*`, `--amber-*`, `--emerald-*`, `--crimson-*`,
`--slate-*`, `--warm-*` → **Layer B semantic** `--surface-*`, `--content-*`,
`--border-*`, `--brand-*`, `--feedback-*`, `--data-*`, `--chart-*`,
`--map-tier-*` → **Layer C kompatibilitas** alias shadcn (`--background`,
`--primary`, `--card`, `--input`) dan pemetaan `@theme` ke utility Tailwind.

Secara fisik `tokens.css` menaruh alias shadcn di blok Layer B, dan token khusus
komponen lama sudah dihapus. Jangan menghidupkan kembali `--button-*`,
`--input-*`, atau token per-komponen tanpa kebutuhan nyata dan wiring lengkap.

Nilai warna umumnya bare HSL, dipakai sebagai `hsl(var(--token))`. Pengecualian:
`--warm-50`, `--warm-100`, `--warm-200` sudah terbungkus `hsl()` — pakai
`var(--warm-*)` langsung, atau varian `--warm-*-hsl` bila butuh komponen mentah.

## Invariant implementasi

- Simbol React PascalCase; nama file komponen kebab-case.
- Named export, dan ekspor tipe props yang jadi bagian API publik.
- `@/` untuk source internal (mengarah ke `src/`). `cn()` untuk class kondisional.
- Buat object/array baru; jangan mutasi props atau state.
- Pakai token semantik atau utility Tailwind; jangan hardcode warna di komponen.
- Pertahankan dukungan light dan `.dark`.
- Copy UI Bahasa Indonesia formal, tanpa emoji. Angka lewat `Intl.NumberFormat('id-ID')`.
- Jaga keyboard navigation, focus state, label, semantic HTML, atribut ARIA.
- `'use client'` hanya pada modul yang butuh boundary client atau harus kompatibel dengan consumer client component.
- Komponen yang menavigasi **wajib** punya `asChild` atau `renderLink`. Jangan
  mengimpor Next.js ke paket. Kontrak konsumen: `docs/consumer-chrome.md`.

**Checklist komponen** — komponen baru/berubah belum selesai sampai enam
bagian ini beres: implementasi di `src/components/{ui,patterns}/` → ekspor di
`src/index.ts` selaras `package.json#exports` → test `.test.tsx` berdampingan →
halaman di `src/pages/components/` → route di `src/App.tsx` → item navigasi di
`src/components/layout/Sidebar.tsx`. Untuk perubahan kecil pada komponen yang
sudah ada di halaman gabungan, perbarui yang relevan saja — jangan membuat route
duplikat demi memenuhi checklist secara mekanis.

## Keamanan dan privasi

Validasi data eksternal di boundary komponen (URL, file, nilai form, data
tabel). Jangan merender HTML mentah; bila `dangerouslySetInnerHTML` memang
terbukti perlu, sanitasi lebih dulu. Jangan hardcode token, credential, URL
privat, atau data pribadi, dan jangan mencatat payload yang bisa memuat data
pribadi BPS. Dependency runtime tetap sebagai dependency/peer eksplisit —
jangan membundel salinan React. Jalankan `pnpm audit` sebelum rilis yang
mengubah dependency. Font CDN jangan dijadikan default (privasi + availability).
Jangan menurunkan aksesibilitas saat mengganti primitive Radix dengan markup
kustom.

## Cara kerja

- Cari sempit dulu; jangan membaca file besar utuh kalau pencarian sudah cukup.
- Untuk tugas kompleks, nyatakan rencana dan kriteria verifikasi sebelum menulis kode.
- Edit terarah, pertahankan perubahan orang lain, jangan refactor di luar permintaan.
- **Jangan mengandalkan ingatan model untuk API framework.** Cocokkan ke
  `package.json`/lockfile, lalu rujuk dokumentasi resmi versi aktif untuk React,
  TypeScript, Vite, Tailwind, Vitest, dan Radix UI.
- Contoh Next.js/Laravel/framework lain adalah panduan konsumen, bukan arsitektur repo.
- Jangan mengedit `node_modules/`, `dist/`, atau artifact generated sebagai source.
- Temuan di luar scope dilaporkan sebagai catatan, bukan diperbaiki diam-diam.
- Tinjau diff sebelum menyatakan selesai.

## Verifikasi

| Jenis perubahan | Pemeriksaan minimum |
|---|---|
| Dokumentasi saja | cek path/identifier, tinjau diff, `git diff --check` |
| Type atau utilitas murni | `pnpm typecheck`, `pnpm lint`, test terkait |
| Komponen atau hook | `pnpm typecheck`, `pnpm lint`, `pnpm test`, cek interaksi + aksesibilitas |
| Token atau CSS | `pnpm build:lib`, cek light/dark dan konsumen Tailwind/non-Tailwind |
| Public export atau build config | `pnpm build:lib`, cek ESM/CJS/type/subpath dan CSS output |
| Route atau showcase | `pnpm build`, cek route langsung, navigasi, tampilan responsif |
| Dependency atau rilis | pemeriksaan relevan di atas + `pnpm audit` |

CI (`.github/workflows/ci.yml`) menjalankan `pnpm install --frozen-lockfile`
lalu `typecheck` → `lint` → `test` → `build:lib` → `build`.

Threshold coverage di `vitest.config.ts` saat ini **34% statements, 42%
branches, 26% functions, 34% lines** — itu bukan gate 80% repo-wide. Target
>=80% berlaku untuk kode baru/berubah termasuk jalur error; jangan mengklaim
repo punya gate global 80%, dan jangan menyatakan test/coverage/lint/build/audit
lulus tanpa benar-benar menjalankannya.

## Definition of Done

Permintaan terpenuhi tanpa perubahan di luar scope · kontrak API/tipe/CSS tetap
kompatibel atau breaking change didokumentasikan · checklist enam bagian
dipenuhi sesuai relevansi · pemeriksaan pada matriks lulus dan dilaporkan apa
adanya · coverage kode baru/berubah >=80% · aksesibilitas, dark mode, Bahasa
Indonesia, keamanan, dan privasi ditinjau · dokumen publik dan `CHANGELOG.md`
diperbarui bila perilaku konsumen berubah · diff bebas secret, debug code,
output build, dan perubahan tidak terkait.

## Workflow lintas-agent

- Baca `../../WORKFLOW.md` sebelum memulai perubahan.
- Untuk detail mode/scope dan quality gate, buka `../../PLAYBOOKS.md` bila relevan.
- Berlaku sama di Claude Code dan OpenCode — keduanya membaca file ini dan
  skill di `.claude/skills/`. Jangan menganggap capability tool tersedia tanpa
  memeriksa runtime aktif.
- OpenCode tidak memuat `../../WORKFLOW.md` otomatis; baca sendiri saat memulai.

## Rujukan

`docs/README.md` adalah indeks seluruh dokumentasi mendalam. Bahasa visual dan
aturan brand di `DESIGN.md`; panduan pemakaian untuk project konsumen di
`GUIDE.md`; catatan upgrade antarversi di `UPGRADE_NOTES.md`.

<!-- SKILL-ROUTING:START -->
## Skills

Skill khusus repo ini ada di `.claude/skills/` dan otomatis terbaca Claude Code
maupun OpenCode saat sesi dibuka dari root repo ini. Skill metodologi (Superpowers,
`documentation-lookup`, dll.) global — tidak diulang di sini.

| Skill | Kondisi Pemicu (Trigger) |
|---|---|
| `impeccable` | Buka sebelum merancang, mengubah, atau mereview hierarki visual komponen UI, state kosong, dan aksesibilitas showcase |
| `release-tag` | Buka saat menyiapkan annotated git tag rilis versi library dari `package.json` + `CHANGELOG.md` |
| `shadcn` | Buka sebelum menambah atau memodifikasi komponen primitif dari registry shadcn (`components.json`) |
| `vercel-composition-patterns` | Buka sebelum mendesain API komponen tingkat tinggi yang reusable (compound components, render props, context) |
| `vercel-react-best-practices` | Buka saat mengoptimalkan performa modul React/Vite, tree-shaking, dan bundle size library |
<!-- SKILL-ROUTING:END -->
