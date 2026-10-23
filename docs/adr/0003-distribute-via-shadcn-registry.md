# ADR 0003: Distribusi DS lewat shadcn registry, bukan paket npm

**Date:** 2026-10-23
**Status:** Accepted — migrasi berjalan; paket `@bpsprovkaltara/design-system@4.8.1` dibekukan sebagai jalan mundur

## Context

Konsumen DS saat ini hanya dua aplikasi Next.js 16 + Tailwind 4: Suaraku dan Menara. Keduanya tidak punya `components/ui` sendiri dan sepenuhnya bergantung pada paket ini (Menara 128 file, Suaraku 48 file mengimpor paket). Dari 86 file komponen, 38 bernama sama dengan primitif shadcn dan 48 adalah komponen BPS (PageHeader, StatusBadge, DataTableCard, FilterBar, ConfirmDialog, FormSheet, AppShell, dan seterusnya). Jadi DS bukan sekadar wrapper shadcn.

Kedua aplikasi pernah memegang fork lokal pola yang sama, lalu fork itu dibuang saat mengadopsi 4.8.0 (commit Menara 2026-09-05). Membubarkan DS dan hanya memakai `DESIGN.md` per aplikasi akan mengembalikan duplikasi itu.

Biaya yang dipersoalkan ada di jalur distribusi paket:

- Satu perubahan komponen menjadi rilis DS, publish ke GitHub Packages, lalu bump di dua aplikasi. Ada 8 rilis sejak Juni; tiap rilis diikuti commit adopsi di kedua aplikasi.
- Build library (ESM/CJS, `.d.ts`, `exports`, `preserveModules` demi `'use client'`), `dist/` yang di-commit, auth token GitHub Packages di `.npmrc` dan CI aplikasi.
- Kebutuhan khusus satu aplikasi harus menunggu rilis paket.
- Seluruhnya dirawat satu orang yang sekaligus produsen dan konsumen.

## Decision

Repo ini tetap menjadi sumber tunggal token, komponen, test, dan showcase, tetapi didistribusikan sebagai **shadcn registry** publik, bukan paket npm.

- Registry JSON dibangkitkan dengan `shadcn build` saat build showcase dan disajikan di `https://design.kaltarastats.id/r/*.json`. Hasil build tidak di-commit.
- Aplikasi menarik komponen dengan `shadcn add`. Perbaikan ditarik ulang per aplikasi dengan `--overwrite`, lalu diff-nya ditinjau.
- Komponen yang berasal dari registry **tidak diedit di aplikasi**. Perubahan dibuat di repo ini dulu.
- Primitif shadcn (Button, Dialog, Select, dan seterusnya) ikut disajikan dari registry BPS. Diff terhadap upstream diperiksa di awal migrasi.
- `tokens.css` dikirim sebagai item registry berupa file utuh.
- **Aturan dua konsumen:** komponen baru lahir di aplikasi dan baru dipindah ke DS ketika aplikasi kedua membutuhkannya.
- Halaman showcase wajib untuk komponen bersama; varian kecil cukup ditambahkan sebagai demo di halaman yang sudah ada.

Urutan migrasi:

1. Perbaiki bug komponen yang sudah diketahui di repo ini.
2. Bangun registry.
3. Pilot di Suaraku.
4. Migrasi Menara.
5. Pensiunkan jalur paket (`vite.lib.config.ts`, `.github/workflows/release.yml`, `exports`, `dist/`) dan tulis ulang dokumen konsumsi.

Langkah 5 baru dikerjakan setelah kedua aplikasi selesai migrasi.

## Alternatives considered

1. **Tetap paket npm, dirampingkan** (tanpa `dist/` di-commit, rilis satu perintah). Ditolak untuk saat ini: setiap perubahan tetap melewati rilis dan bump di dua aplikasi, dan kerumitan build library tetap ada.
2. **Monorepo** (Suaraku, Menara, dan DS dalam satu repo dengan Bun workspaces). Ditolak: menggabungkan tiga repo aktif dan pipeline deploy Coolify terlalu mahal untuk dua konsumen.
3. **Bubarkan DS, cukup `DESIGN.md` per aplikasi.** Ditolak: mengulang fork yang sudah dibuang, menggandakan perawatan sekitar 5.000 baris komponen, dan tidak bisa menjamin perilaku seragam (dokumen tidak mencegah bug).
4. **Registry dilindungi token.** Ditolak: butuh server yang memeriksa header, dan kode UI tidak memuat rahasia; showcase sudah membundel kode yang sama ke browser publik.

## Consequences

- Positif: rilis, publish, bump versi, `dist/`, build ESM/CJS, dan token GitHub Packages hilang dari alur kerja.
- Positif: perbaikan mendesak bisa dibuat langsung di aplikasi lalu dipindah ke DS.
- Negatif: tidak ada nomor versi di aplikasi; status sinkron hanya terlihat dari diff terhadap registry.
- Negatif: `--overwrite` menimpa semua file item termasuk dependensinya. Perubahan lokal di aplikasi akan hilang, sehingga disiplin "jangan edit komponen registry di aplikasi" wajib.
- Negatif: salinan komponen di aplikasi tidak punya test sendiri; test tetap di repo ini.
- Asumsi yang diuji di awal migrasi: `shadcn add` menyalin `tokens.css` utuh dengan benar di Tailwind 4, dan impor `@/components/ui/*` serta `@/lib/utils` dipetakan ke alias aplikasi.
- Tinjau ulang keputusan ini bila muncul aplikasi ketiga yang dikerjakan pengembang lain. Pada titik itu, paket dengan versi tegas kembali layak.
