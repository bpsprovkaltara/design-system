# Testing

Standar workspace ada di `TESTING.md`. Dokumen ini mencatat penerapannya di design system.

## Tangga verifikasi

| Lingkup | Perintah |
|---|---|
| quick | `bun run typecheck` · `bun run lint` · `bunx vitest run <file>` |
| standard | `bun run test` (seluruh Vitest/Testing Library/jsdom) |
| complex | + `bun run build:lib` bila CSS, API publik, atau build berubah; `bun run build` bila showcase/route berubah |
| high-risk | + `bun run test:coverage` dan uji paket hasil `build:lib` di aplikasi konsumen (Tailwind, non-Tailwind, RSC) sebelum rilis |

CI menjalankan typecheck, lint, cek directive `"use client"`, test, `build:lib`, dan build showcase. Rincian threshold coverage dan pemetaan per jenis perubahan ada di [pengembangan](development.md#testing).

## Tanpa DB dan tanpa login

Paket ini pustaka komponen: tidak punya database, akun, atau login. Tidak ada DB uji per worktree, akun uji, maupun smoke matriks peran. Komponen auth (form login, chrome) diuji sebagai komponen di Vitest; alur login sungguhan diuji di repo aplikasi konsumen.

Tidak ada Playwright atau suite E2E browser. Pemeriksaan visual showcase (navigasi, responsif, light/dark) dilakukan manual lewat `bun run dev`, atau dengan Playwright Chromium headless dari luar repo bila diperlukan.
