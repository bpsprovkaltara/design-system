# BPS Kaltara Dashboard UI Kit

Prototype interaktif dashboard statistik, terpisah dari library React19. index.html memuat React/ReactDOM18.3.1 dan Babel CDN serta component JSX lokal; data, logo dan peta bersifat contoh.

## Fitur

Beranda memuat empat KPI, bar chart PDRB bulanan, SVG peta contoh dan tabel. Kependudukan memuat KPI/bar chart/tabel kabupaten; Publikasi memuat daftar dengan aksi unduh. Halaman lain menampilkan state pengembangan.

## Mulai cepat

Sajikan folder ini melalui server HTTP statis pilihan pengembang lalu buka index.html. JSX Babel eksternal membutuhkan HTTP dan akses CDN; membuka file langsung dapat memicu batas akses browser. Tidak ada script/package manifest tersendiri atau dependency install di folder ini.

## Perintah

Server prototype: diisi operator — belum ditetapkan. Build/typecheck/test library dijalankan dari root mengikuti [pengembangan](../../docs/development.md); hasilnya bukan test otomatis prototype ini.

## Komponen

| File | Isi |
|---|---|
| [components/Sidebar.jsx](components/Sidebar.jsx) | Sidebar collapse, kelompok nav dan persistence |
| [components/Topbar.jsx](components/Topbar.jsx) | Breadcrumb, pencarian, notifikasi dan avatar |
| [components/StatCard.jsx](components/StatCard.jsx) | Metrik, tren, provisional dan periode |
| [components/DataTable.jsx](components/DataTable.jsx) | Sort dan pagination, angka id-ID |
| [index.html](index.html) | App interaktif dan data contoh |

State lokal memakai bps-sidebar-collapsed dan bps-active-page di localStorage. Toast pada aksi navigasi; chart sederhana CSS tanpa library chart eksternal.

## Batas dan rujukan

SVG choropleth disederhanakan; logo teks BPS dan chart merupakan contoh yang perlu data/asset resmi untuk produksi. Integrasi peta/chart produksi belum ditetapkan; jangan menyatakan prototype ini implementasi resmi.

[README root](../../README.md) memetakan [produk](../../PRODUCT.md), [desain](../../DESIGN.md), [API](../../docs/api.md) dan [guide](../../docs/guide.md).
