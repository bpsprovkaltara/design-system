# ADR 0004: Aplikasi ketiga (Kinara) — tetap distribusi via registry

**Date:** 2026-11-16
**Status:** Accepted

## Context

ADR 0003 menutup dengan pemicu tinjau ulang eksplisit:

> Tinjau ulang keputusan ini bila muncul aplikasi ketiga yang dikerjakan
> pengembang lain. Pada titik itu, paket dengan versi tegas kembali layak.

Kinara (`bpsprovkaltara/kinara-app`, Next.js 16 + Tailwind 4, dikerjakan tim
lain dari Suaraku/Menara) sedang mengadopsi registry DS lewat tiketnya
sendiri (`#62` di kinara-app, bagian dari rencana migrasi UI Kinara ke
Tailwind 4 + registry BPS). Ini memicu tinjau ulang yang disebut ADR 0003.

Kondisi saat tinjau ulang:

- Registry sudah dipakai produksi oleh dua konsumen (Suaraku, Menara) sejak
  ADR 0003, tanpa insiden distribusi yang tercatat.
- `shadcn add --overwrite` per komponen terbukti cukup untuk menarik
  perbaikan tanpa jalur rilis/publish/bump versi.
- Kinara dikerjakan pengembang/agent lain, bukan pemelihara DS — ini
  persis skenario yang disebut ADR 0003 sebagai alasan paket versi
  "kembali layak".
- Biaya kembali ke paket npm (build ESM/CJS, `dist/` ter-commit, token
  GitHub Packages di tiga `.npmrc`, rilis+bump tiga aplikasi per perubahan)
  tetap sama seperti yang ditolak ADR 0003 — bertambah satu aplikasi berarti
  bertambah satu titik bump per rilis, bukan berkurang.
- Tidak ada laporan drift komponen tak-tertangkap dari dua konsumen yang
  sudah ada yang akan dicegah oleh nomor versi.

## Decision

Registry tetap menjadi jalur distribusi untuk Kinara sebagai aplikasi
ketiga. Paket npm versi tegas **tidak** dihidupkan kembali.

- Kinara mengikuti pola yang sama seperti Suaraku/Menara: `shadcn add` untuk
  menarik komponen, pagar lint yang mencegah suntingan lokal pada salinan
  registry, dan laporan kekurangan registry balik ke repo ini — bukan
  ditambal di Kinara.
- Pemicu tinjau ulang berikutnya tetap sama seperti ADR 0003: insiden drift
  nyata yang nomor versi akan mencegah, bukan sekadar bertambahnya jumlah
  konsumen.

## Alternatives considered

Sama seperti ADR 0003 (paket npm dirampingkan, monorepo, bubarkan DS,
registry berpagar token) — tidak ada kondisi baru dari Kinara yang mengubah
kalkulasi biaya/manfaat salah satu opsi itu, jadi tidak diulang di sini.

## Consequences

- Positif: tidak ada jalur rilis/publish/bump baru yang perlu dirawat untuk
  konsumen ketiga.
- Negatif tetap sama seperti ADR 0003: status sinkron Kinara terhadap
  registry hanya terlihat dari diff, bukan nomor versi; disiplin "jangan
  edit salinan registry di aplikasi" berlaku sama untuk Kinara.
- Pemicu tinjau ulang berikutnya digeser dari "jumlah konsumen" ke "insiden
  drift nyata", supaya keputusan ini tidak otomatis tinjau ulang lagi pada
  konsumen keempat tanpa alasan konkret.
