---
name: BPS Kaltara
description: Token visual @bpsprovkaltara/design-system agar aplikasi konsumen tetap pada sistem.
colors:
  surface-canvas: "hsl(33 20% 97%)"
  surface-raised: "hsl(0 0% 100%)"
  surface-sunken: "hsl(34 29% 94%)"
  surface-inverse: "hsl(215 60% 13%)"
  surface-overlay: "hsl(218 70% 8%)"
  content-primary: "hsl(215 60% 13%)"
  content-secondary: "hsl(215 19% 35%)"
  content-tertiary: "hsl(215 20% 65%)"
  content-disabled: "hsl(213 27% 84%)"
  content-inverse: "hsl(0 0% 100%)"
  content-brand: "hsl(214 52% 20%)"
  content-accent: "hsl(28 87% 37%)"
  border-subtle: "hsl(36 30% 89%)"
  border-default: "hsl(214 32% 91%)"
  border-strong: "hsl(213 27% 84%)"
  border-brand: "hsl(214 52% 20%)"
  border-focus: "hsl(214 52% 20%)"
  brand-primary: "hsl(214 52% 20%)"
  brand-primary-fg: "hsl(0 0% 100%)"
  brand-accent: "hsl(35 93% 54%)"
  brand-accent-fg: "hsl(218 70% 8%)"
  primary-foreground: "hsl(210 40% 98%)"
  card: "hsl(34 29% 94%)"
  feedback-success: "hsl(161 94% 30%)"
  feedback-success-bg: "hsl(152 81% 96%)"
  feedback-warning: "hsl(32 95% 44%)"
  feedback-warning-bg: "hsl(40 100% 97%)"
  feedback-danger: "hsl(0 72% 51%)"
  feedback-danger-bg: "hsl(0 86% 97%)"
  feedback-info: "hsl(214 89% 40%)"
  feedback-info-bg: "hsl(214 100% 96%)"
  data-positive: "hsl(160 84% 39%)"
  data-negative: "hsl(0 72% 51%)"
  data-neutral: "hsl(215 20% 65%)"
  data-warning: "hsl(35 93% 54%)"
  data-highlight: "hsl(38 96% 73%)"
  chart-1: "hsl(196 100% 40%)"
  chart-2: "hsl(35 93% 54%)"
  chart-3: "hsl(160 84% 39%)"
typography:
  display-2xl:
    fontFamily: "Fraunces, Georgia, 'Times New Roman', serif"
    fontSize: "4.5rem"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  display-xl:
    fontFamily: "Fraunces, Georgia, 'Times New Roman', serif"
    fontSize: "3.5rem"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.018em"
  display:
    fontFamily: "Fraunces, Georgia, 'Times New Roman', serif"
    fontSize: "2.5rem"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.008em"
  title-sm:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.005em"
  body-lg:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  button:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.5
  label:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.4
  caption:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
  micro:
    fontFamily: "IBM Plex Sans, system-ui, -apple-system, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.05em"
  mono:
    fontFamily: "IBM Plex Mono, 'JetBrains Mono', 'Cascadia Code', monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "tnum"
rounded:
  none: "0"
  xs: "0.125rem"
  sm: "0.25rem"
  md: "0.375rem"
  lg: "0.5rem"
  xl: "0.625rem"
  full: "9999px"
spacing:
  0: "0px"
  0-5: "0.125rem"
  1: "0.25rem"
  1-5: "0.375rem"
  2: "0.5rem"
  3: "0.75rem"
  4: "1rem"
  5: "1.25rem"
  6: "1.5rem"
  8: "2rem"
  10: "2.5rem"
  12: "3rem"
  16: "4rem"
  20: "5rem"
  24: "6rem"
  inline-xs: "0.5rem"
  inline-sm: "0.75rem"
  inline-md: "1rem"
  inline-lg: "1.5rem"
  stack-xs: "0.5rem"
  stack-sm: "1rem"
  stack-md: "2rem"
  stack-lg: "3rem"
  inset-sm: "0.75rem"
  inset-md: "1rem"
  inset-lg: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.brand-primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "36px"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.content-primary}"
    rounded: "{rounded.xl}"
    padding: "24px"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.content-primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "4px 12px"
    height: "36px"
    width: "100%"
  badge:
    backgroundColor: "{colors.brand-primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: "2px 8px"
---

# Design System: BPS Kaltara

## Overview

Berkas ini mencatat token visual `@bpsprovkaltara/design-system` supaya aplikasi konsumen tetap pada sistem. Nilai di frontmatter adalah mode terang (`:root`) setelah alias semantik di-resolve ke kanal HSL. Sumber kanal itu `tokens.css`. Skala primitif hanya dipakai untuk mendefinisikan token semantik, bukan untuk diwarnai langsung di komponen.

Paket ini CSS-first (Tailwind 4). Konsumen memakai token semantik `surface`, `content`, `border`, `brand`, dan `feedback`. Mode `.dark` menimpa token semantik yang sama; skala primitif tidak berubah. Salinan antarmuka Bahasa Indonesia formal, tanpa emoji.

**Key Characteristics:**

- Token semantik untuk komponen; primitif hanya bahan definisi.
- Warna disimpan sebagai kanal HSL mentah, dipakai lewat `hsl(var(--token))`.
- Fraunces untuk display, IBM Plex Sans untuk UI, IBM Plex Mono untuk angka.
- Radius tertahan dan enam tingkat elevasi bernuansa navy.
- Lapisan permukaan (kanvas, sunken, raised) lebih dulu daripada bayangan.

## Colors

Palet konsumen adalah token semantik mode terang. Frontmatter sudah dalam bentuk `hsl(H S% L%)`. Di CSS, nilai yang sama disimpan tanpa pembungkus `hsl()`, misalnya `214 52% 20%`.

### Primary

- **Navy merek** (hsl(214 52% 20%)): `brand-primary`, juga `content-brand`, `border-brand`, dan `border-focus`. Latar tombol primer dan aksen KPI `brand`.
- **Teks pada primer** (hsl(210 40% 98%)): `primary-foreground` (navy-50). Ini teks varian tombol dan badge default, bukan putih penuh.
- **Putih aksen merek** (hsl(0 0% 100%)): `brand-primary-fg`. Jangan dipakai sebagai teks tombol default.

### Secondary

- **Amber aksen** (hsl(35 93% 54%)): `brand-accent`. Aksen kedua, data peringatan, dan seri grafik perekonomian.
- **Teks amber** (hsl(28 87% 37%)): `content-accent`. Teks amber yang masih cukup kontras; jangan memakai amber-500 untuk teks kecil di atas kanvas terang.
- **Teks pada amber** (hsl(218 70% 8%)): `brand-accent-fg`.

### Neutral

- **Kanvas** (hsl(33 20% 97%)): `surface-canvas`. Latar halaman.
- **Permukaan naik** (hsl(0 0% 100%)): `surface-raised`. Panel putih. Bukan latar kartu default.
- **Permukaan kartu** (hsl(34 29% 94%)): `card` dan `surface-sunken`. Kartu default memakai `card`; area inset memakai `surface-sunken`. Keduanya resolve ke warm-100 di mode terang.
- **Teks utama** (hsl(215 60% 13%)): `content-primary`. Juga `surface-inverse`.
- **Teks sekunder** (hsl(215 19% 35%)): `content-secondary`. Keterangan dan caption.
- **Teks tersier** (hsl(215 20% 65%)): `content-tertiary`. Placeholder.
- **Teks nonaktif** (hsl(213 27% 84%)): `content-disabled`.
- **Teks invers** (hsl(0 0% 100%)): `content-inverse`. Teks di atas permukaan gelap.
- **Garis halus** (hsl(36 30% 89%)): `border-subtle`. Juga batas input (`--input` dan `--border` shadcn).
- **Garis default** (hsl(214 32% 91%)): `border-default`. Kartu default.
- **Garis kuat** (hsl(213 27% 84%)): `border-strong`.
- **Lapisan gelap** (hsl(218 70% 8%)): `surface-overlay`. Tirai modal.

### Tertiary

- **Biru grafik** (hsl(196 100% 40%)): `chart-1`. Seri kependudukan. Bukan warna tombol.
- **Hijau data** (hsl(160 84% 39%)): `data-positive` dan `chart-3`. Seri pertanian.
- **Amber grafik** (hsl(35 93% 54%)): `chart-2`. Sama dengan amber aksen; peran di sini khusus seri perekonomian.

### Umpan balik

- **Berhasil** (hsl(161 94% 30%)): `feedback-success`, dengan latar `feedback-success-bg` (hsl(152 81% 96%)).
- **Peringatan** (hsl(32 95% 44%)): `feedback-warning`, dengan latar `feedback-warning-bg` (hsl(40 100% 97%)).
- **Bahaya** (hsl(0 72% 51%)): `feedback-danger` dan `data-negative`, dengan latar `feedback-danger-bg` (hsl(0 86% 97%)).
- **Informasi** (hsl(214 89% 40%)): `feedback-info`, dengan latar `feedback-info-bg` (hsl(214 100% 96%)).
- **Data netral** (hsl(215 20% 65%)): `data-neutral`.
- **Data sorot** (hsl(38 96% 73%)): `data-highlight`.

**The Semantic Token Rule.** Komponen konsumen memakai `surface-*`, `content-*`, `border-*`, `brand-*`, `feedback-*`, dan `data-*`. Skala primitif `navy`, `amber`, `emerald`, `crimson`, `slate`, dan `warm` hanya mendefinisikan token itu.

**The Bare Channel Rule.** Jangan menulis hex di komponen. Kanal disimpan mentah; pemakaiannya `hsl(var(--token))` atau utilitas Tailwind, termasuk opasitas `hsl(var(--token) / 0.9)`.

Mode `.dark` mengganti token semantik (permukaan menjadi navy gelap, merek menjadi navy-300, umpan balik menjadi langkah yang lebih terang). Jangan menyalin nilai terang ke permukaan gelap.

## Typography

**Display Font:** Fraunces (with Georgia, 'Times New Roman', serif)

**Body Font:** IBM Plex Sans (with system-ui, -apple-system, sans-serif)

**Mono Font:** IBM Plex Mono (with JetBrains Mono, Cascadia Code, monospace)

**Character:** Display editorial memakai Fraunces. UI, heading, dan badan memakai IBM Plex Sans. Angka tabular memakai IBM Plex Mono lewat kelas `.numeric`. `fonts.css` hanya CDN opsional; produksi meng-host font sendiri.

### Hierarchy

- **Display 2xl** (500, 4.5rem, line-height 1.05, letter-spacing -0.02em): Puncak skala display.
- **Display xl** (500, 3.5rem, line-height 1.08, letter-spacing -0.018em): Display besar.
- **Display** (500, 2.5rem, line-height 1.15, letter-spacing -0.015em): Display yang masih muat di halaman aplikasi.
- **Headline** (600, 2rem, line-height 1.2, letter-spacing -0.01em): Heading 1. IBM Plex Sans, bukan Fraunces.
- **Title** (600, 1.5rem, line-height 1.3, letter-spacing -0.008em): Heading 2. `PageHeader` merender `<h1>` dengan kelas `.h2`, jadi ukuran judul halaman adalah title, bukan headline.
- **Title sm** (600, 1.25rem, line-height 1.35, letter-spacing -0.005em): Heading 3.
- **Body** (400, 1rem, line-height 1.55): Teks berjalan. Dasar dokumen 16px.
- **Body sm** (400, 0.875rem, line-height 1.5): Teks kontrol dan deskripsi kartu.
- **Button** (500, 0.875rem, line-height 1.5): Label tombol. Ukuran body sm dengan berat medium.
- **Label** (600, 0.8125rem, line-height 1.4): Label formulir (kelas `.label`).
- **Caption** (500, 0.75rem, line-height 1.4): Badge dan keterangan kecil.
- **Micro** (600, 0.6875rem, line-height 1.3, letter-spacing 0.05em): Header tabel, huruf kapital.
- **Mono** (400, 0.875rem, line-height 1.5): Angka dan kode. `.numeric` memaksa tabular-nums dan rata kanan.

**The Type Role Rule.** Fraunces tidak dipakai untuk tombol, input, atau tabel. IBM Plex Mono tidak dipakai untuk paragraf. Heading aplikasi tetap IBM Plex Sans.

## Layout

Satuan dasar 4px. Langkah jarak: 0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, dan 96px, sesuai token `--space-*` di frontmatter. Jarak semantik: inline xs–lg (8–24px), stack xs–lg (8–48px), inset sm–lg (12–24px).

Lebar wadah: 640, 768, 1024, 1280, dan 1536px. Shell: sidebar terbuka 17.5rem (280px), sidebar rapat 4rem (64px), topbar 4rem (64px). `PageHeader` menumpuk di layar sempit dan menjadi baris (judul di kiri, aksi di kanan) mulai 768px, dengan jarak 12px dan padding bawah 16px.

**The Four Point Rule.** Jangan mengarang jarak di luar skala `--space-*`. Padding komponen yang sudah ada (tombol 16px horizontal, kartu 24px) mengikuti langkah itu.

## Elevation & Depth

Kedalaman utama datang dari lapisan warna, bukan dari bayangan tebal. Kanvas hangat, area sunken, dan permukaan putih sudah memisahkan bidang. Bayangan hanya mengangkat kontrol dan kartu. Token `--elevation-*` tidak berubah di `.dark`. Alias `--shadow-xs` sampai `--shadow-xl` di `.dark` diganti bayangan hitam yang lebih dalam.

### Shadow Vocabulary

- **Elevation 0** (`box-shadow: none`): Permukaan diam yang hanya mengandalkan warna bidang.
- **Elevation 1** (`box-shadow: 0 1px 2px 0 rgba(8, 28, 52, 0.06)`): Angkat paling kecil. Kartu varian `surface` memakai ini.
- **Elevation 2** (`box-shadow: 0 2px 4px 0 rgba(8, 28, 52, 0.06), 0 1px 2px 0 rgba(8, 28, 52, 0.04)`): Tombol primer saat diam.
- **Elevation 3** (`box-shadow: 0 8px 16px -2px rgba(8, 28, 52, 0.08), 0 2px 4px 0 rgba(8, 28, 52, 0.04)`): Tombol primer saat hover.
- **Elevation 4** (`box-shadow: 0 16px 32px -4px rgba(8, 28, 52, 0.12), 0 4px 8px -2px rgba(8, 28, 52, 0.06)`): Overlay yang lebih tinggi.
- **Elevation 5** (`box-shadow: 0 24px 48px -6px rgba(8, 28, 52, 0.16), 0 8px 16px -4px rgba(8, 28, 52, 0.08)`): Lapisan paling atas.
- **Shadow sm** (`box-shadow: 0 1px 3px 0 rgba(8, 28, 52, 0.06), 0 1px 2px -1px rgba(8, 28, 52, 0.04)`): Kartu default. Bukan alias langsung dari elevation 1.

**The Surface Layer Rule.** Jangan menambah bayangan baru untuk membedakan kartu dari halaman. Gunakan `surface-canvas`, `surface-sunken`, dan `surface-raised` lebih dulu. Bayangan yang dipakai komponen adalah elevation 0–5 dan `shadow-sm` di atas.

## Shapes

Sudut institusional dan kecil. Tidak ada sudut besar sebagai bahasa default.

- `none` (0) untuk bidang yang harus rata.
- `xs` (2px) jarang.
- `sm` (4px) untuk badge lama dan chip; badge default sekarang pill (`full`).
- `md` (6px) untuk tombol dan input. Sama dengan `--radius` shadcn.
- `lg` (8px) untuk tombol ukuran lg dan dialog.
- `xl` (10px) untuk kartu default. Utilitas `rounded-xl` mengikuti token ini, bukan 12px bawaan Tailwind.
- `full` (9999px) untuk badge pill dan avatar.

Varian kartu `surface` memakai `rounded-2xl` (1rem pada skala Tailwind). Itu bukan token `--radius-*` paket.

**The Restrained Radius Rule.** Tombol dan input tetap 6px. Jangan menukar kartu default ke pill atau ke sudut nol.

## Components

### Buttons

Tombol primer padat, tinggi tetap, label medium. Varian lain (outline, tertiary, secondary, ghost, link, destructive, success, danger-outline, nav) ada di `buttonVariants`; yang normatif di frontmatter adalah primer.

- **Shape:** Sudut md (6px). Ukuran lg naik ke lg (8px).
- **Primary:** Latar `brand-primary`, teks `primary-foreground`, tinggi 36px, padding horizontal 16px, bayangan elevation 2.
- **Hover / Focus:** Hover memakai `primary` pada opasitas 0.9, elevation 3, dan geser 1px ke atas. Active kembali ke elevation 1 tanpa geser. Fokus: garis 2px `border-focus` dengan offset 2px. Nonaktif: opasitas 0.5.
- **Secondary / Ghost / Tertiary:** Secondary mengisi `surface-sunken` dengan garis halus. Outline dan tertiary berbatas `border-default` dan mengisi sunken saat hover. Ghost hanya teks, tanpa batas.

### Cards

Kartu default berbatas `border-default`, latar `card` (warm-100, bukan putih), teks `content-primary`, sudut xl (10px), bayangan `shadow-sm`. Header dan konten ber-padding 24px; konten menghapus padding atas. Varian `surface` memakai sudut 2xl Tailwind, batas `border-subtle`, dan elevation 1.

- **Corner Style:** xl pada default (10px).
- **Background:** token `card`.
- **Shadow Strategy:** `shadow-sm` saat diam. Bukan elevation 2.
- **Border:** `border-default`.
- **Internal Padding:** 24px.

### Inputs

Tinggi 36px, lebar penuh, sudut md, padding 4px 12px, latar transparan, batas `border-subtle`, bayangan elevation 1, teks body sm. Placeholder memakai `content-tertiary`. Fokus sama dengan tombol: garis 2px token ring, offset 2px. Nonaktif opasitas 0.5. `aria-invalid` menggeser batas ke `feedback-danger`.

- **Style:** Garis halus, latar transparan, sudut 6px.
- **Focus:** Ring 2px `border-focus`, offset 2px.
- **Error / Disabled:** Batas bahaya saat tidak valid; opasitas 0.5 saat nonaktif.

### Badge

Pill (`rounded-full`), padding 2px 8px, caption berat medium. Default: latar primer dan teks `primary-foreground`. Hover (`primary` pada 0.9) hanya berlaku bila badge dirender sebagai tautan. Fokus mengikuti ring 2px yang sama.

- **Style:** Pill, latar primer, teks `primary-foreground`.
- **State:** Varian secondary, destructive, outline, ghost, dan link ada. Default yang dicatat di frontmatter adalah primer.

### Page header

Bukan heading manual. Wadah flex, jarak 12px, garis bawah token `--border` (halus), padding bawah 16px. Di 768px ke atas, judul dan aksi sejajar ujung bawah. Judul adalah `<h1>` bertipografi title (`.h2`), warna `content-primary`. Deskripsi `text-sm` (0.875rem), warna `content-secondary`, jarak atas 4px. Komponen ini tidak punya hover sendiri.

- **Style:** Baris judul plus deskripsi, dengan slot aksi.
- **Typography:** Title untuk judul halaman, bukan skala headline.

### KPI card

Kartu dengan nilai angka. Tanpa `accent`, tepi kiri 4px memakai `brand-primary`. Dengan `accent` (`brand`, `accent`, `success`, `info`, `warning`), bar 4px di atas memakai warna umpan balik atau merek yang sesuai, dan ikon duduk di chip 28px sudut lg. Judul: 12px, huruf kapital, tracking 0.05em, warna `content-secondary`. Nilai: IBM Plex Mono, 1.5rem, berat 700, tabular, rata kanan. Keterangan: 12px, `content-secondary`.

- **Corner Style:** Mengikuti kartu default (10px).
- **Background:** token `card`.
- **Internal Padding:** Header dan konten 24px; header KPI merapatkan padding bawah menjadi 8px.

## Do's and Don'ts

### Do

- **Do** pakai token semantik di komponen konsumen: `surface`, `content`, `border`, `brand`, `feedback`, dan `data`.
- **Do** simpan warna sebagai kanal HSL mentah dan pakai `hsl(var(--token))` atau utilitas Tailwind.
- **Do** impor CSS paket tepat sekali di root. Tailwind 4 memakai `tokens.css` sesudah `@import "tailwindcss"`. Non-Tailwind memakai `styles.css`.
- **Do** tulis salinan UI dalam Bahasa Indonesia formal, tanpa emoji, dan format angka dengan `Intl.NumberFormat('id-ID')`.
- **Do** andalkan token semantik yang sama untuk mode terang dan `.dark`.

### Don't

- **Don't** hardcode hex di komponen konsumen.
- **Don't** pakai skala primitif (`navy`, `amber`, `emerald`, `crimson`, `slate`, `warm`) langsung di komponen.
- **Don't** mengimpor `styles.css` dan `tokens.css` sekaligus, dan jangan memakai `tailwind-preset` untuk integrasi baru.
- **Don't** menganggap latar kartu putih. Token `card` adalah warm-100; yang putih adalah `surface-raised`.
- **Don't** menganggap teks tombol primer `brand-primary-fg`. Varian default memakai `primary-foreground`.
- **Don't** memuat `fonts.css` sebagai default. Berkas itu CDN opsional.
