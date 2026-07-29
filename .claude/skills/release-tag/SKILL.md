---
name: release-tag
description: Buat annotated git tag rilis (vX.Y.Z) dari versi package.json + blurb CHANGELOG, lalu push ke origin. Trigger — "/release-tag", "buat tag rilis", "tag versi terbaru".
---

# Release Tag

Bikin annotated tag `vX.Y.Z` buat commit HEAD saat ini di proyek BPS Kaltara Design System, pakai versi dari `package.json` dan ringkasan dari `CHANGELOG.md`, lalu push ke origin.

## Langkah

1. **Ambil versi target**
   ```bash
   node -p "require('./package.json').version"
   ```
   Tag = `v` + versi ini.

2. **Cek tag sudah ada**
   ```bash
   git tag -l "vX.Y.Z"
   ```
   Kalau sudah ada → stop, kabari user, jangan overwrite.

3. **Cek HEAD sinkron sama origin/main**
   ```bash
   git fetch origin && git status
   ```
   Kalau HEAD bukan di `main` atau behind/ahead origin/main → kabari user, tanya mau lanjut atau sync dulu.

4. **Ambil blurb rilis dari CHANGELOG.md**
   Baca section `## [X.Y.Z] - tanggal` di `CHANGELOG.md` (paragraf blurb tepat di bawah heading, sebelum `### Added`/`### Changed`/dst). Ini jadi body pesan tag. Kalau section gak ada, pakai daftar judul `### Added/Changed/Fixed/Breaking` sebagai ringkasan singkat.

5. **Konfirmasi ke user sebelum push** (tag push itu shared/hard-to-reverse)
   Tampilkan: nama tag, commit target, isi pesan tag. Tanya konfirmasi push ke origin.

6. **Buat annotated tag + push**
   ```bash
   git tag -a vX.Y.Z -m "$(cat <<'EOF'
   release: vX.Y.Z — <judul singkat dari blurb CHANGELOG>

   <blurb atau ringkasan Added/Changed/Fixed/Breaking>
   EOF
   )"
   git push origin vX.Y.Z
   ```

7. Laporkan link rilis: `https://github.com/<owner>/<repo>/releases/tag/vX.Y.Z` (ambil owner/repo dari `git remote get-url origin`).

## Catatan

- Tidak membuat GitHub Release (cuma git tag). Kalau user minta release notes di GitHub juga, pakai `gh release create vX.Y.Z --notes-from-tag` setelah tag ke-push.
- Tidak menjalankan `pnpm run build:lib`/publish — itu di luar scope skill ini.
