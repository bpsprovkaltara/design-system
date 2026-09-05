# Dokumentasi Design System BPS Kaltara

Indeks seluruh dokumentasi mendalam. `AGENTS.md` di root merujuk ke sini, bukan
ke masing-masing file. Dokumen baru wajib terdaftar di halaman ini.

## Kontrak library

- [api.md](api.md) — ekspor publik: komponen, token, dan utilitas yang dipakai project konsumen.
- [architecture.md](architecture.md) — struktur paket dan batas antarmodul.
- [database.md](database.md) — penyimpanan data yang relevan bagi library.
- [consumer-chrome.md](consumer-chrome.md) — apa yang DS sediakan untuk chrome app vs apa yang tetap lokal di konsumen (Suaraku/Menara).

## Operasional

- [development.md](development.md) — menyiapkan lingkungan dan alur kerja harian.
- [deployment.md](deployment.md) — prosedur publikasi paket.
- [runbook.md](runbook.md) — penanganan insiden dan tugas operasional rutin.
- [releases/](releases/) — catatan rilis siap salin untuk GitHub Release.

## Keputusan arsitektur

- [decisions/](decisions/) — ADR bernomor. Keputusan yang mengubah kontrak
  ekspor, sistem token, atau batas paket ditulis di sini, bukan di dokumen lain.

Bahasa visual dan aturan brand ada di `../DESIGN.md`; panduan pemakaian
mendalam untuk project konsumen ada di `../GUIDE.md`.
