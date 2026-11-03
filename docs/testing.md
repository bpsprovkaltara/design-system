# Testing

Standar workspace ada di `TESTING.md`. Dokumen ini mencatat penerapannya di design system.

## Lane dan perintah

Lane: browser, docker (`TESTING.md` §2a). Kode komponen berjalan di browser,
jadi Vitest berjalan di Node 24 (`.node-version`), bukan di Bun. Pin Node ini
hanya untuk tooling repo; aplikasi konsumen paket atau registry tidak terikat
padanya. Test masih memakai jsdom + Testing Library; migrasi ke Vitest Browser
Mode belum termasuk kontrak ini.

| Script | Isi |
|---|---|
| `bun run check` | lint + typecheck + test; lane ini tidak punya project `unit` terpisah, jadi `test` dipakai sebagai tier cepat |
| `bun run lint` | ESLint atas `src`, termasuk aturan test; CI menambah `--max-warnings 0` |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run test` | seluruh Vitest (jsdom) |
| `bun run test:coverage` | `test` dengan threshold coverage; inilah yang dijalankan CI |

## Tangga verifikasi

| Lingkup | Perintah |
|---|---|
| quick | `bun run check`, atau `bunx vitest run <file>` untuk satu file |
| standard | `bun run test` (seluruh Vitest/Testing Library/jsdom) |
| complex | + `bun run build:lib` bila CSS, API publik, atau build berubah; `bun run build` bila showcase/route berubah |
| high-risk | + `bun run test:coverage` dan uji paket hasil `build:lib` di aplikasi konsumen (Tailwind, non-Tailwind, RSC) sebelum rilis |

`build:lib` dan `build` menulis ulang `dist/` yang di-commit. Kembalikan
`dist/` bila perubahan tidak dimaksudkan untuk rilis.

## CI

- Job `quality`: typecheck, lint, cek directive `"use client"`,
  `test:coverage`, `build:lib`, build showcase.
- Job `security`: `bun audit --audit-level=critical`, gitleaks CLI (rentang
  PR, atau `HEAD` saat push), dan zizmor atas workflow.
- Ambang audit `critical`. Per 2026-11-03 ada 37 temuan high; di cakupan
  produksi hanya peer `zod` (<4.6.6), sisanya dependency dev (vite,
  react-router, undici, postcss, dan lainnya). Dilacak di issue tindak lanjut
  audit.
- `release.yml` (publish GitHub Packages) hanya mendapat hygiene: pin SHA,
  `permissions`, timeout, tanpa cache. Pensiunnya mengikuti ADR 0003.

## Coverage

Provider V8 (lane browser di Node). `include` mencakup semua akar sumber yang
dikirim ke konsumen: `src/components/ui`, `src/components/patterns`,
`src/hooks`, `src/lib`, `src/index.ts`, `src/utils.ts`, `src/tailwind-preset.ts`.
Showcase (`src/pages`, `src/layouts`, `src/components/{layout,showcase}`,
`src/App.tsx`, `src/main.tsx`) tidak dikirim, jadi tidak dihitung; ia
dibuktikan lewat `bun run build`. Exclude ada di `vitest.config.ts` dengan
alasan per baris.

| Metrik | Baseline | Threshold | Diukur | Tindak lanjut |
|---|---|---|---|---|
| lines | 68,48% | 68 | 2026-11-03 | menuju 80%, issue tindak lanjut coverage |
| functions | 62,47% | 62 | 2026-11-03 | menuju 80%, issue tindak lanjut coverage |
| branches | 74,56% | 74 | 2026-11-03 | menuju 80%, issue tindak lanjut coverage |
| statements | 67,89% | 67 | 2026-11-03 | menuju 80%, issue tindak lanjut coverage |

- Diukur tiga kali dengan `bun run test:coverage` (232 test hijau, Node 22
  lokal); ketiga run identik. Threshold = floor baseline dan hanya boleh naik.
- Threshold sebelumnya (34/42/26/34) hanya menghitung `src/components/**`
  termasuk showcase, dan CI tidak menjalankannya.

## Aturan lint test

`eslint.config.js` (blok `src/**/*.{test,spec}.{ts,tsx}`) menegakkan
`TESTING.md` §5b sebagai error: `vitest/expect-expect`,
`vitest/no-focused-tests`, `vitest/no-disabled-tests`,
`vitest/no-conditional-expect`, `vitest/valid-expect` (`maxArgs: 2`),
`vitest/no-identical-title`, dan
`@eslint-community/eslint-comments/require-description`. Skip sementara butuh
`eslint-disable` dengan alasan yang menautkan issue. Tidak ada Playwright di
repo ini, jadi aturan `eslint-plugin-playwright` tidak berlaku.

## Tanpa DB dan tanpa login

Paket ini pustaka komponen: tidak punya database, akun, atau login. Tidak ada DB uji per worktree, akun uji, maupun smoke matriks peran. Komponen auth (form login, chrome) diuji sebagai komponen di Vitest; alur login sungguhan diuji di repo aplikasi konsumen.

Tidak ada Playwright atau suite E2E browser. Pemeriksaan visual showcase (navigasi, responsif, light/dark) dilakukan manual lewat `bun run dev`, atau dengan Playwright Chromium headless dari luar repo bila diperlukan.

## Skill verifikasi

`.claude/skills/verify-design-system/` dan peta fiturnya di `features/`
dibuat di fachriizzudin/project-rules#85.
