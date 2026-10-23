# Produk BPS Kaltara Design System

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Developer aplikasi internal BPS Provinsi Kalimantan Utara memakai library; developer dan designer menelusuri showcase untuk memilih komponen, meninjau token, dan mengambil contoh integrasi.

## Product Purpose

Menyediakan komponen React, token CSS, pola aplikasi dan contoh yang konsisten untuk aplikasi internal. Showcase SPA menyajikan referensi interaktif dari source yang sama dengan paket library.

## Operating Context

Paket privat `@bpsprovkaltara/design-system` dipublikasikan ke GitHub Packages. Jalur v4/main memakai React 19 dan Tailwind 4 dengan dist-tag latest; v3/branch v3 memakai React 18 dan Tailwind 3.4 dengan legacy. Showcase Vite dipasang melalui Docker/Traefik; URL dalam konfigurasi `design.kaltarastats.id`.

## Capabilities and Constraints

Primitive shadcn/Radix, komposit BPS, chart ringan, form, tabel, shell, overlay, pencarian, dan hooks diekspor dengan tipe serta ESM/CJS/subpath. Data bisnis, auth, fetch pencarian/notifikasi, routing framework dan backend tetap milik aplikasi konsumen. Repo tidak menyediakan service HTTP atau database. Optional peer form dipasang hanya bila dipakai. Directive client mendukung konsumen RSC; showcase tetap Vite.

## Brand Commitments

Arah incumbent Civic Editorial × Data-First Swiss: identitas BPS Kaltara dan copy Bahasa Indonesia formal tanpa emoji. Identitas visual terperinci ada di DESIGN, bukan keputusan arah baru.

## Evidence on Hand

`src/index.ts`, komponen, hooks, showcase pages, token CSS, prototype `ui_kits/dashboard/`, tests, tag git dan CHANGELOG. Prototype memakai data/visual contoh; bukan bukti data statistik produksi atau peta resmi.

## Product Principles

- Library dan showcase memakai source yang sama.
- Konsumen mengendalikan data, routing, autentikasi dan font produksi.
- Ekspor dan tipe mendefinisikan kontrak penggunaan.
- Komponen mempertahankan keyboard, semantic HTML, focus dan light/dark.

## Accessibility & Inclusion

Bahasa Indonesia dan format angka id-ID mengikuti pemakaian internal. Pertahankan label, ARIA, keyboard, skip link dan reduced motion; audit aplikasi konsumen tetap diperlukan.
