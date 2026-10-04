---
name: bps-kaltara-design
description: Use this skill to generate well-branded interfaces and assets for BPS Kaltara (Badan Pusat Statistik Provinsi Kalimantan Utara), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping government statistical dashboards.
user-invocable: true
---

Baca [README.md](README.md), [PRODUCT.md](PRODUCT.md), dan [DESIGN.md](DESIGN.md)
sebelum membuat antarmuka atau artefak visual BPS Kaltara. DESIGN memegang token
normatif; API aktual ada pada src/index.ts dan package exports.

Untuk mock/prototype, salin asset yang relevan ke artefak yang dapat diperiksa.
Untuk aplikasi produksi, ikuti kontrak konsumsi CSS/font, tipe/ekspor dan
asChild/renderLink pada [guide](docs/guide.md) serta
[consumer-chrome](docs/consumer-chrome.md). Prototype dashboard memakai contoh
data/peta/logo; jangan menjadikannya bukti produksi.

Bila skill dipanggil tanpa target, klarifikasi kebutuhan produk dan scope
sebelum membuat artefak. Superpowers tetap workflow utama implementasi;
impeccable global mencatat konteks produk dan sistem visual incumbent.
