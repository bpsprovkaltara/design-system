# AGENTS.md

Panduan ini berlaku untuk seluruh repo `bpskaltara-design-system`. Gunakan panduan ini untuk memahami sumber kebenaran, menjaga kontrak paket, dan memverifikasi perubahan tanpa menganggap repo ini sebagai aplikasi framework lain.

## Ringkasan proyek

Repo ini memuat sistem desain internal BPS Provinsi Kalimantan Utara versi paket `4.6.0`. Satu source tree beroperasi dalam dua mode:

- **Library**: paket privat `@bpsprovkaltara/design-system` untuk aplikasi internal BPS
- **Showcase**: single-page application React berbasis Vite untuk dokumentasi interaktif

Repo ini **bukan aplikasi Next.js**. Directive `'use client'` pada modul tertentu dipertahankan sebagai kompatibilitas bagi konsumen React Server Components, termasuk konsumen Next.js. Directive itu bukan penanda arsitektur repo. `vite.lib.config.ts` memakai `preserveModules` agar directive tersebut tetap ada pada output subpath.

Stack utama yang terverifikasi dari `package.json`:

| Area | Versi atau teknologi |
|---|---|
| Paket | `@bpsprovkaltara/design-system@4.6.0` |
| Runtime UI | React 19 |
| Bahasa | TypeScript 6 |
| Build | Vite 8 |
| Styling | Tailwind CSS 4, CSS-first |
| Routing showcase | React Router 7 |
| Komponen dasar | shadcn/ui gaya `new-york` dan Radix UI |
| Pengujian | Vitest 4, Testing Library, `jsdom` |
| Package manager | `pnpm@10.30.0` |
| Node.js | `>=20` |

## Sumber kebenaran

Jika dokumen dan implementasi berbeda, gunakan urutan berikut:

1. `package.json` dan `pnpm-lock.yaml` untuk versi, dependency, script, entry, dan `exports`
2. `vite.config.ts`, `vite.lib.config.ts`, `vitest.config.ts`, `tsconfig*.json`, dan `eslint.config.js` untuk perilaku tool
3. `src/index.ts`, `src/utils.ts`, `src/components/**`, `src/hooks/**`, `src/App.tsx`, dan `src/components/layout/Sidebar.tsx` untuk API dan alur aktif
4. `tokens.css`, `colors_and_type.css`, `fonts.css`, dan `scripts/copy-css-assets.mjs` untuk kontrak CSS
5. Test yang berdampingan dengan source untuk perilaku yang telah dikunci
6. `DESIGN.md`, `GUIDE.md`, `README.md`, `CONTRIBUTING.md`, `UPGRADE_NOTES.md`, dan `docs/**` untuk konteks

`design/DESIGN.md` adalah referensi historis Kinara, bukan panduan aktif BPS Kaltara. `dist/` adalah output terbangun, bukan tempat mengedit source. Dokumen dapat tertinggal dari source; verifikasi identifier dan versi sebelum mengulang klaimnya.

## Perintah yang tersedia

Jalankan dari root repo:

```bash
pnpm install
pnpm dev
pnpm build
pnpm build:lib
pnpm preview
pnpm typecheck
pnpm lint
pnpm lint:fix
pnpm format
pnpm format:check
pnpm test
pnpm test:watch
pnpm test:ui
pnpm test:coverage
```

`pnpm build` membangun showcase melalui `tsc && vite build`. `pnpm build:lib` menjalankan konfigurasi library lalu menyalin `tokens.css` dan `fonts.css` ke `dist/`. Pilih pemeriksaan sesuai matriks pengujian; jangan menjalankan perintah berat yang tidak relevan.

## Arsitektur dan alur

Alur showcase:

1. `src/main.tsx` memuat `colors_and_type.css`
2. `src/App.tsx` memasang `BrowserRouter` dan route
3. `src/layouts/ShowcaseLayout.tsx` membungkus halaman
4. `src/pages/**` merender foundations, katalog komponen, dan prototipe
5. `src/components/layout/Sidebar.tsx` menyediakan navigasi yang harus selaras dengan route

Alur library:

1. `src/index.ts` adalah barrel API publik dan memuat `colors_and_type.css` sebagai side effect
2. `src/utils.ts` adalah entry `cn` tanpa `'use client'`
3. `vite.lib.config.ts` membangun ESM, CommonJS, deklarasi tipe, dan modul subpath
4. Runtime dependency dan peer dependency tetap eksternal
5. `scripts/copy-css-assets.mjs` menyalin CSS sumber yang memang diekspor terpisah
6. `package.json#exports` menentukan satu-satunya kontrak subpath yang didukung

Folder utama:

```text
src/components/ui/       Primitif dan komposit BPS
src/components/patterns/ Pola tingkat tinggi
src/components/showcase/ Helper dokumentasi interaktif
src/components/layout/   Navigasi showcase
src/hooks/               Hook publik
src/pages/               Halaman showcase
src/index.ts             API publik
src/main.tsx             Entry showcase
```

## Kontrak ekspor dan CSS konsumen

Jaga ekspor ini tetap sinkron dengan `package.json`, `src/index.ts`, dan hasil library build:

| Import konsumen | Kontrak |
|---|---|
| `@bpsprovkaltara/design-system` | API barrel dan side effect CSS all-in-one |
| `@bpsprovkaltara/design-system/components/ui/*` | Modul UI terarah; CSS tidak dijamin masuk melalui subpath |
| `@bpsprovkaltara/design-system/patterns/*` | Pattern terarah |
| `@bpsprovkaltara/design-system/hooks/*` | Hook terarah |
| `@bpsprovkaltara/design-system/utils` | `cn`, tanpa kebutuhan client component |
| `@bpsprovkaltara/design-system/styles.css` | CSS all-in-one terkompilasi, termasuk preflight |
| `@bpsprovkaltara/design-system/tokens.css` | CSS sumber Tailwind 4, token dan utilitas tanpa preflight |
| `@bpsprovkaltara/design-system/fonts.css` | Google Fonts CDN opsional, tidak dimuat default |
| `@bpsprovkaltara/design-system/tailwind-preset` | Shim kosong yang deprecated; jangan pakai untuk integrasi baru |

Integrasi `Form` membutuhkan peer opsional `react-hook-form`, `zod`, dan `@hookform/resolvers`. Jangan memaksa konsumen yang tidak memakai form untuk memasangnya.

Aturan konsumsi CSS:

- Impor CSS tepat sekali pada root aplikasi konsumen
- Konsumen non-Tailwind dapat memakai `styles.css`
- Konsumen Tailwind 4 yang sudah memiliki preflight memakai `tokens.css` setelah `@import "tailwindcss"` dan menambahkan `@source` menuju `dist` paket
- Konsumen Tailwind 4 yang memilih subpath komponen harus mengimpor `tokens.css`; jangan memakai root barrel bila ingin menghindari side effect `styles.css`
- Jangan mengimpor `styles.css` dan `tokens.css` sekaligus
- Sediakan font sendiri untuk produksi; `fonts.css` hanya jalur CDN opt-in

## Sistem token tiga lapis

Gunakan alur konseptual berikut:

1. **Layer A, primitive**: `--navy-*`, `--amber-*`, `--emerald-*`, `--crimson-*`, `--slate-*`, dan `--warm-*`
2. **Layer B, semantic**: `--surface-*`, `--content-*`, `--border-*`, `--brand-*`, `--feedback-*`, `--data-*`, `--chart-*`, dan `--map-tier-*`
3. **Layer C, compatibility/consumption**: alias shadcn seperti `--background`, `--primary`, `--card`, `--input`, dan pemetaan `@theme` ke utility Tailwind

Secara fisik, `tokens.css` menempatkan alias shadcn pada blok Layer B dan menyatakan token khusus komponen lama sudah dihapus. Jangan menambahkan `--button-*`, `--input-*`, atau token komponen baru tanpa kebutuhan nyata dan wiring lengkap. Komponen memakai token semantik atau alias kompatibilitas.

Nilai warna umumnya berbentuk bare HSL dan dipakai sebagai `hsl(var(--token))`. `--warm-50`, `--warm-100`, dan `--warm-200` sudah dibungkus `hsl()`; gunakan `var(--warm-*)` atau varian `--warm-*-hsl` saat membutuhkan komponen HSL mentah.

## Invariant implementasi

- Simbol React memakai PascalCase; nama file komponen memakai kebab-case sesuai source saat ini
- Pakai named export dan ekspor tipe props yang menjadi bagian API publik
- Pakai `@/` untuk source internal; alias tersebut mengarah ke `src/`
- Gunakan `cn()` untuk penggabungan class yang kondisional
- Buat object atau array baru; jangan mutasi input props atau state
- Pakai token semantik atau utility Tailwind; jangan hardcode warna di komponen
- Pertahankan dukungan light dan `.dark`
- Pakai Bahasa Indonesia formal untuk copy UI dan hindari emoji
- Format angka lokal dengan `Intl.NumberFormat('id-ID')`
- Jaga keyboard navigation, focus state, label, semantic HTML, dan atribut ARIA
- Tambahkan `'use client'` hanya pada modul yang membutuhkan boundary client atau harus kompatibel dengan consumer client component
- Jangan menambahkan API Next.js ke showcase Vite

## Checklist komponen

Komponen baru atau perubahan komponen belum selesai sampai enam bagian ini terpenuhi:

1. **Implementation**: buat atau ubah source di `src/components/ui/` atau `src/components/patterns/`
2. **Export**: perbarui `src/index.ts` dan pastikan subpath cocok dengan `package.json#exports`
3. **Test**: tambah atau perbarui `.test.tsx` berdampingan dengan source
4. **Showcase**: tambah atau perbarui halaman di `src/pages/components/`
5. **Route**: sinkronkan route di `src/App.tsx`
6. **Navigation**: sinkronkan item di `src/components/layout/Sidebar.tsx`

Untuk perubahan kecil pada komponen yang sudah berada pada halaman gabungan, perbarui demo, route, dan navigasi yang relevan. Jangan membuat route duplikat hanya untuk memenuhi checklist secara mekanis.

## Keamanan dan privasi

- Validasi data eksternal pada boundary komponen, terutama URL, file, nilai form, dan data tabel
- Jangan merender HTML mentah; bila kebutuhan terverifikasi memakai `dangerouslySetInnerHTML`, sanitasi lebih dahulu
- Jangan hardcode token, credential, URL privat, atau data pribadi
- Jangan mencatat payload yang dapat memuat data pribadi BPS
- Pertahankan dependency runtime sebagai dependency atau peer yang eksplisit; jangan membundel salinan React
- Tinjau dependency baru dan jalankan `pnpm audit` sebelum commit atau rilis yang mengubah dependency
- Jangan menjadikan font CDN sebagai default karena implikasi privasi dan availability
- Jangan menurunkan aksesibilitas ketika mengganti primitive Radix dengan markup kustom

## Matriks pengujian

| Jenis perubahan | Pemeriksaan minimum |
|---|---|
| Dokumentasi saja | Cek path/identifier, tinjau diff, `git diff --check` |
| Type atau utilitas murni | `pnpm typecheck`, `pnpm lint`, test terkait |
| Komponen atau hook | `pnpm typecheck`, `pnpm lint`, `pnpm test`, cek interaksi dan aksesibilitas |
| Token atau CSS | `pnpm build:lib`, pemeriksaan light/dark dan konsumen Tailwind/non-Tailwind |
| Public export atau build config | `pnpm build:lib`, cek ESM/CJS/type/subpath dan CSS output |
| Route atau showcase | `pnpm build`, cek route langsung, navigasi, dan tampilan responsif |
| Dependency atau rilis | Pemeriksaan di atas yang relevan dan `pnpm audit` |

`vitest.config.ts` mempunyai threshold repo saat ini sebesar 34% statements, 42% branches, 26% functions, dan 34% lines. Itu bukan gate 80% repo-wide. Targetkan cakupan **minimal 80% untuk kode baru atau berubah**, termasuk jalur error dan interaksi penting, tanpa mengklaim repo sudah memiliki gate global 80%.

## Definition of Done

Perubahan dianggap selesai jika:

- Permintaan pengguna terpenuhi tanpa perubahan di luar scope
- Kontrak API, tipe, dan CSS tetap kompatibel atau breaking change didokumentasikan
- Checklist enam bagian komponen dipenuhi sesuai relevansi
- Pemeriksaan pada matriks lulus dan hasilnya dilaporkan apa adanya
- Cakupan kode baru atau berubah mencapai minimal 80%
- Aksesibilitas, dark mode, Bahasa Indonesia, keamanan, dan privasi ditinjau
- Dokumen publik dan `CHANGELOG.md` diperbarui bila perilaku konsumen berubah
- Diff bebas secret, debug code, output build, dan perubahan tidak terkait

## Aturan kerja Codex

- Awali pencarian dengan `rtk rg` atau `rtk rg --files`; gunakan `rtk` untuk semua perintah shell
- Gunakan `apply_patch` untuk edit manual dan hindari script ad hoc untuk menulis file
- Baca status dan diff sebelum serta sesudah perubahan; pertahankan edit pengguna lain
- Jangan mengedit `node_modules/`, `dist/`, atau artifact generated sebagai source
- Jangan menjalankan perintah destruktif, menghapus file, atau memulihkan working tree tanpa permintaan eksplisit
- Jangan commit, push, membuat tag/rilis, atau mengubah resource eksternal tanpa permintaan eksplisit
- Jangan memperbaiki temuan di luar scope; laporkan sebagai catatan

## Graphify

Repo memiliki knowledge graph di `graphify-out/`. Sebelum menjawab pertanyaan arsitektur, baca `graphify-out/GRAPH_REPORT.md` untuk god nodes dan struktur komunitas. Jika `graphify-out/wiki/index.md` tersedia, gunakan wiki untuk navigasi lalu verifikasi klaim pada source. Setelah mengubah file kode, jalankan `rtk python3 -c "from graphify.watch import _rebuild_code; from pathlib import Path; _rebuild_code(Path('.'))"`. Perubahan dokumentasi saja tidak memerlukan rebuild graph. Jangan menganggap graph sebagai sumber kebenaran bila berbeda dari working copy.

<!-- SKILL-ROUTING:START -->
## Skill Routing

Katalog lengkap ada di level user dan tidak dipangkas. Blok ini cuma menunjuk
yang relevan untuk repo ini. Regenerasi: `/skill-routing`.
Terakhir diperbarui: 2026-07-28

### NOW
| Skill | Untuk apa di repo ini | Frasa pemicu |
|---|---|---|
| `impeccable` | audit visual + UX komponen sebelum bump versi paket | "polish komponen", "audit UI showcase", "spacing label kurang rapi" |
| `ui-ux-pro-max` | rujukan palet, font pairing, dan state interaksi untuk token tiga lapis | "cari padanan warna", "atur tipografi", "state hover/disabled" |
| `shadcn` | repo punya `components.json` + Radix; cari/patch primitive upstream | "tambah komponen shadcn", "cek registry", "contoh Radix" |
| `dataviz` | DS sudah punya primitive Sparkline/BarChart SVG | "tambah chart", "warna seri grafik", "bikin sparkline" |
| `everything-claude-code:accessibility` | `eslint-plugin-jsx-a11y` aktif, DS dipakai 4 aplikasi konsumen | "cek aksesibilitas", "kontras warna", "aria label" |
| agent `everything-claude-code:a11y-architect` | audit WCAG saat menambah komponen interaktif baru | "audit a11y komponen", "keyboard navigation" |
| `everything-claude-code:design-system` | audit konsistensi token pada PR yang menyentuh styling | "konsistensi token", "review PR styling" |
| `vercel-composition-patterns` | desain API komponen: compound pattern, hindari ledakan boolean prop | "API komponen ini gimana", "prop-nya kebanyakan", "bikin compound component" |
| agent `everything-claude-code:typescript-reviewer` | kontrak ekspor `.d.ts` lewat `vite-plugin-dts` gampang bocor | "review tipe", "ekspor type salah" |
| `everything-claude-code:test-coverage` | coverage gate vitest sudah aktif di repo | "cek coverage", "test kurang" |
| `everything-claude-code:build-fix` | dua target build (lib `preserveModules` + showcase) sering pecah tipe | "build gagal", "typecheck merah" |
| `graphify` | `graphify-out/` sudah ada, jaga peta ekspor tetap segar | "rebuild graph", "peta kode" |
| `superpowers:verification-before-completion` | Definition of Done panjang di `CLAUDE.md` | "sudah selesai?", "cek DoD" |
| `commit-commands:commit` | riwayat commit Conventional Commits konsisten | "commit", "buat commit" |

### LATER
- `everything-claude-code:e2e-testing` — aktifkan kalau `@playwright/test` masuk `devDependencies` untuk menguji showcase.
- `vercel-react-best-practices` — aktifkan kalau repo menambah target Next.js/RSC nyata, bukan sekadar directive kompatibilitas konsumen.
- `mattpocock-skills:codebase-design` — aktifkan kalau ada file di `src/` melewati ~400 baris atau barrel export jadi ambigu.
- `everything-claude-code:opensource-pipeline` — aktifkan kalau paket privat `@bpsprovkaltara/design-system` mau dibuka publik.
- `everything-claude-code:seo` — aktifkan kalau showcase dipublikasikan ke domain publik.
- `everything-claude-code:documentation-lookup` — aktifkan kalau butuh dokumen Radix/Tailwind 4 yang tidak ada di `node_modules`.
- `everything-claude-code:gan-design` — alternatif loop desain berskor; kalah dari `impeccable` karena butuh app hidup, showcase belum punya harness evaluator.

### NEVER
Bahasa lain (Go, Rust, Java/Spring, Kotlin/Android, C++, C#, Python, Perl, Dart/Flutter, Swift), backend/database (Prisma, PostgreSQL, Docker, queue — repo ini tanpa server dan tanpa DB), domain bisnis (healthcare, logistik, finance, energy, customs, investor/market research, web3/DeFi) — tetap terpasang untuk proyek lain.

### BROKEN
- `everything-claude-code:docs-lookup` (agent) — frontmatter `tools:` menyebut `mcp__context7__*`, nama nyata di harness `mcp__plugin_everything-claude-code_context7__*`; agent tidak bisa memanggil MCP-nya.
- `~/.claude/skills/learned/` — direktori kosong tanpa `SKILL.md`, tidak pernah termuat.
- Sebagian besar command `everything-claude-code:*` (mis. `jira`, `instinct-*`, `pm2`) tidak punya `description`, jadi tidak pernah tersaring otomatis — panggil eksplisit atau abaikan.
<!-- SKILL-ROUTING:END -->
