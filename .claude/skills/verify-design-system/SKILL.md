---
name: verify-design-system
description: Verifikasi showcase Vite dan registry design-system dengan Chromium headless; gunakan saat perubahan membutuhkan bukti perilaku yang dilihat pengguna atau konsumen.
---

# Verifikasi design-system

Baca `docs/testing.md` untuk prasyarat dan perintah repo, lalu pilih fitur di `features/README.md`. Jalankan hanya di worktree milik sesi ini. Node 24, Bun sesuai `packageManager`, dependensi repo, dan Chromium Playwright (`bunx playwright install chromium --only-shell`) diperlukan. Tidak ada DB atau akun.

## Launch dan doctor

Dari root repo jalankan `scripts/verify-design-system.sh`. Helper memeriksa bahwa `registry.json` dan `public/r/` belum ada agar tidak menimpa output sesi lain; bila ada, gunakan worktree bersih. Helper membangun registry dan showcase ke direktori sementara, lalu meluncurkan Vite preview miliknya di port loopback bebas. Ia memeriksa respons registry serta isi button terhadap source sebelum mengemudikan browser. Kegagalan mana pun menghasilkan exit bukan nol.

## Drive

Helper menggunakan `scripts/browser-slot.sh` dan Playwright Chromium headless. Bukti otomatis saat ini mencakup navigasi ke `/components/buttons`, contoh tombol, perubahan ke tema gelap, dan respons `/r/button.json`. Untuk pemasangan konsumen jalankan `scripts/verify-registry-consumer.sh`: helper membuat aplikasi Vite sementara, memasang `@bps/button` dari registry lokal, membangun lalu mengklik tombolnya. Instalasi memerlukan akses registry paket npm. Rute lain di peta memerlukan drive tambahan; jangan klaim sudah diverifikasi hanya karena helper lulus. Jangan pakai Chrome milik pengguna atau server dari sesi lain.

## Evidence

`test-results/verify/buttons/screenshot.png`, `aria.yml`, dan `registry.json` menyimpan hasil. Bukti konsumen ada di `test-results/verify/konsumen/`: screenshot, snapshot ARIA, serta log instalasi, shadcn, dan build. Periksa bukti setelah helper selesai. Artefak ini tidak di-commit. Untuk fitur lain, simpan bukti tindakan dan hasil dalam `test-results/verify/<fitur>/`.

## Cleanup dan helpers

Kedua helper menjalankan launch, doctor, drive, dan cleanup. Mereka menutup browser dan server yang dibuatnya serta menghapus build sementara dan registry yang dibuat pada run itu; bukti dipertahankan. Jika proses dihentikan secara paksa, periksa proses dan path yang tercatat sebelum membersihkan, jangan membunuh berdasarkan nama. `scripts/browser-slot.sh` adalah pembungkus slot mesin; jangan jalankan browser di luar slot.

Gunakan `/maintain-verification-skill` untuk memeriksa peta ini ketika fitur berubah.
