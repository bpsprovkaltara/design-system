# Instalasi konsumen

## Sub-features
Konsumen dapat memasang komponen dari registry ke aplikasi Vite.

## How to get to it (user POV)
Siapkan aplikasi Vite sementara dan gunakan registry showcase lokal sesuai `docs/operations.md`.

## Driving it with Playwright
Jalankan `scripts/verify-registry-consumer.sh`. Helper membangun registry untuk server loopback miliknya, memasang `@bps/button` ke aplikasi sementara, membangun lalu mengklik tombol dengan Chromium headless. Bukti tersimpan di `test-results/verify/konsumen/`.

## Gotchas
Butuh akses registry paket npm. Hanya komponen `button` yang dibuktikan; ulangi untuk komponen lain yang berubah.
