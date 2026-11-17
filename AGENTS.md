# Panduan Agent — design-system

Berlaku untuk seluruh repositori, agent mana pun. Perubahan sekecil mungkin,
jaga perilaku yang tidak diminta, buktikan dengan pemeriksaan yang benar-benar
dijalankan.

## Identitas proyek

Library privat `@bpsprovkaltara/design-system` versi 4.8.1 dan SPA showcase Vite dari source tree yang sama.

## Stack

Stack dan versi resolved: [arsitektur](docs/architecture.md).

## Perintah

Dari root repo. Semua terverifikasi ada di `package.json`.

```bash
bun install
bun run dev            # showcase
bun run build          # tsc && vite build (showcase)
bun run build:lib      # build library + salin tokens.css & fonts.css ke dist/
bun run preview
bun run typecheck
bun run lint           # eslint; lint:fix, format, format:check tersedia
bun run test           # test:watch, test:ui, test:coverage tersedia
```

Pilih pemeriksaan sesuai matriks di bawah; jangan menjalankan perintah berat
yang tidak relevan dengan perubahan.

## Sumber kebenaran

Saat dokumen dan implementasi berbeda: (1) `package.json` + `bun.lock`
untuk versi, dependency, script, entry, `exports`; (2) `vite.config.ts`,
`vite.lib.config.ts`, `vitest.config.ts`, `tsconfig*.json`, `eslint.config.js`
untuk perilaku tool; (3) `src/index.ts`, `src/utils.ts`, `src/components/**`,
`src/hooks/**`, `src/App.tsx`, `src/components/layout/Sidebar.tsx` untuk API dan
alur aktif; (4) `tokens.css`, `colors_and_type.css`, `fonts.css`,
`scripts/copy-css-assets.mjs` untuk kontrak CSS; (5) test yang berdampingan
dengan source; (6) `DESIGN.md`, `docs/guide.md`, `README.md`.

`DESIGN.md` memuat token normatif plus panduan konsumsi paket untuk AI
agent. `dist/` adalah output build, bukan tempat
mengedit source. Jangan mengarang script, path, export, atau token.

## Struktur / Lapisan

Lapisan, kontrak ekspor, dan token: [arsitektur](docs/architecture.md); konsumsi CSS/chrome: [guide](docs/guide.md) dan [consumer-chrome](docs/consumer-chrome.md). Repo ini **bukan Next.js** — `'use client'` hanya kompatibilitas RSC konsumen. Jaga sinkron `package.json#exports`, `src/index.ts`, dan `build:lib`.

## Invariant dan alur

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

## Keamanan

Validasi data eksternal di boundary komponen (URL, file, nilai form, data
tabel). Jangan merender HTML mentah; bila `dangerouslySetInnerHTML` memang
terbukti perlu, sanitasi lebih dulu. Jangan hardcode token, credential, URL
privat, atau data pribadi, dan jangan mencatat payload yang bisa memuat data
pribadi BPS. Dependency runtime tetap sebagai dependency/peer eksplisit —
jangan membundel salinan React. Jalankan `bun audit` sebelum rilis yang
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

### Workflow lintas-agent

Jika `../../WORKFLOW.md` ada, repo ini berada di workspace pemilik: baca dan ikuti aturan workspace yang relevan sebagai tambahan. Jika tidak ada, instruksi dalam repo ini sudah cukup; ketiadaan dokumen atau tool workspace bukan penghalang untuk mengembangkan proyek.

Invariant, keamanan, dan verifikasi di file ini tetap berlaku di kedua
lingkungan. Jika aturan tambahan bertentangan dengan aturan repo, jelaskan
konfliknya. Jangan melemahkan invariant, keamanan, atau verifikasi.

## Verifikasi

| Jenis perubahan | Pemeriksaan minimum |
|---|---|
| Dokumentasi saja | cek path/identifier, tinjau diff, `git diff --check` |
| Type atau utilitas murni | `bun run typecheck`, `bun run lint`, test terkait |
| Komponen atau hook | `bun run typecheck`, `bun run lint`, `bun run test`, cek interaksi + aksesibilitas |
| Token atau CSS | `bun run build:lib`, cek light/dark dan konsumen Tailwind/non-Tailwind |
| Public export atau build config | `bun run build:lib`, cek ESM/CJS/type/subpath dan CSS output |
| Route atau showcase | `bun run build`, cek route langsung, navigasi, tampilan responsif |
| Dependency atau rilis | pemeriksaan relevan di atas + `bun audit` |

CI (`.github/workflows/ci.yml`) pada `main`/`v3` juga memeriksa directive client; menjalankan `bun install --frozen-lockfile`
lalu `typecheck` → `lint` → `test:coverage` → `build:lib` → `build`, plus job
`security` (`bun audit`, gitleaks, zizmor). `bun run check` = lint + typecheck + test.

Threshold coverage di `vitest.config.ts` saat ini **67% statements, 74%
branches, 62% functions, 68% lines** (ratchet, baseline di `docs/testing.md`) —
itu bukan gate 80% repo-wide. Target
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

## Rujukan

Peta dokumentasi mendalam ada di `README.md` (bagian Dokumentasi). Fakta
produk di `PRODUCT.md`; bahasa visual, token, dan aturan brand di `DESIGN.md`;
struktur di `docs/architecture.md`; API komponen di `docs/api.md`; build dan
deploy di `docs/operations.md`; setup lokal di `docs/development.md`;
tangga verifikasi di `docs/testing.md`; chrome
aplikasi konsumen di `docs/consumer-chrome.md`; panduan pemakaian untuk project
konsumen di `docs/guide.md`; catatan upgrade antarversi di `docs/upgrading.md`;
keputusan arsitektur di `docs/adr/`.


<!-- SKILL-ROUTING:START -->
## Skills

Routing ini dirawat **manual**; semua skill di tabel ada di `.claude/skills/` (tidak ikut clone). Impeccable tersedia global, bukan skill lokal repo.

| Skill | Kondisi Pemicu (Trigger) |
|---|---|
| `release-tag` | Buka saat menyiapkan annotated git tag rilis versi library dari `package.json` + `CHANGELOG.md` |
| `shadcn` | Buka sebelum menambah atau memodifikasi komponen primitif dari registry shadcn (`components.json`) |
| `vercel-composition-patterns` | Buka sebelum mendesain API komponen tingkat tinggi yang reusable (compound components, render props, context) |
| `vercel-react-best-practices` | Buka saat mengoptimalkan performa modul React/Vite, tree-shaking, dan bundle size library |
<!-- SKILL-ROUTING:END -->
