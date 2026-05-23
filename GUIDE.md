# BPS Kaltara Design System — Panduan Penerapan

**Version 2.0.0** | Bahasa: Indonesia

> Panduan lengkap cara menerapkan BPS Kaltara Design System ke aplikasi baru maupun existing.

---

## Daftar Isi

1. [Prasyarat](#1-prasyarat)
2. [Scaffolding Aplikasi Baru (Next.js)](#2-scaffolding-aplikasi-baru-nextjs)
3. [Setup Plain HTML / CSS](#3-setup-plain-html--css)
4. [Setup Laravel Blade + Vite](#4-setup-laravel-blade--vite)
5. [Menggunakan Token Warna](#5-menggunakan-token-warna)
6. [Menggunakan Token Tipografi](#6-menggunakan-token-tipografi)
7. [Menggunakan Token Spacing & Layout](#7-menggunakan-token-spacing--layout)
8. [Dark Mode](#8-dark-mode)
9. [Extended Palettes (Navy & Amber)](#9-extended-palettes-navy--amber)
10. [Komponen Esensial & shadcn/ui](#10-komponen-esensial--shadcnui)
11. [Referensi Token Lengkap](#11-referensi-token-lengkap)
12. [Checklist Integrasi](#12-checklist-integrasi)

---

## 1. Prasyarat

File utama yang dibutuhkan dari repo ini:

| File | Wajib | Kegunaan |
|---|---|---|
| `colors_and_type.css` | ✅ | Semua token CSS + konfigurasi Tailwind 4 CSS-first |
| `components.json` | Jika pakai shadcn/ui | Konfigurasi shadcn/ui |

**Font yang digunakan:**
- [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans) — display, heading, body
- [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) — angka tabel, kode

---

## 2. Scaffolding Aplikasi Baru (Next.js)

Cara tercepat untuk memulai project baru dengan BPS Kaltara Design System adalah menggunakan Next.js App Router dan shadcn/ui.

### Langkah 1 — Bootstrap Next.js

Jalankan perintah berikut di terminal:

```bash
npx create-next-app@latest my-bps-app --typescript --tailwind --eslint --app --use-npm
cd my-bps-app
```

### Langkah 2 — Inisialisasi shadcn/ui

```bash
npx shadcn-ui@latest init
```
*Gunakan opsi default (Style: New York, Base color: Slate, CSS variables: yes).*

### Langkah 3 — Inject Design System BPS Kaltara

Setelah inisialisasi selesai, tambahkan stylesheet design system ke aplikasi:

1. **Token + Tailwind v4:** Copy `colors_and_type.css` ke folder `src/app/` dan import di `globals.css`.
2. **shadcn/ui:** Copy `components.json` hanya bila Anda ingin menyamakan konfigurasi generator shadcn/ui.

**Contoh Perintah Terminal:**
```bash
cp /path/to/bpskaltara-design-system/components.json ./components.json
cp /path/to/bpskaltara-design-system/colors_and_type.css ./src/app/bps-tokens.css
```

Lalu di `src/app/globals.css`, tambahkan di bagian paling atas:
```css
@import "tailwindcss";
@import './bps-tokens.css';
@source "../app";
@source "../components";
@custom-variant dark (&:where(.dark, .dark *));
```

### Langkah 3 — Setup font di `layout.tsx`

```tsx
// src/app/layout.tsx
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  )
}
```

> `suppressHydrationWarning` diperlukan jika menggunakan dark mode class toggle.

### Langkah 4 — Hapus `@import` Google Fonts dari CSS

Karena font sudah di-load via `next/font`, hapus baris berikut dari `globals.css`:

```css
/* Hapus baris ini jika pakai next/font */
@import url('https://fonts.googleapis.com/css2?...');
```

### Langkah 5 — Verifikasi Tailwind

Pastikan CSS aplikasi memuat `@import "tailwindcss";`, import token BPS, dan `@source` untuk folder aplikasi. Di Tailwind 4, konfigurasi token paket ini ada di CSS, bukan di `tailwind.config.ts`.

### Langkah 6 — Test

```tsx
// Komponen test sederhana
export default function TestPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-primary text-2xl font-bold">BPS Kaltara DS ✓</h1>
      <p className="text-muted-foreground mt-2">Design system berhasil diterapkan.</p>
      <button className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded-md">
        Tombol Primary
      </button>
    </div>
  )
}
```

---

## 3. Setup Plain HTML / CSS

Untuk aplikasi HTML statis atau tanpa framework:

### Langkah 1 — Copy file token

```bash
cp /path/to/bpskaltara-design-system/colors_and_type.css ./assets/css/bps-tokens.css
```

### Langkah 2 — Link di HTML

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="./assets/css/bps-tokens.css" />
  <link rel="stylesheet" href="./assets/css/main.css" />
  <title>Aplikasi BPS</title>
</head>
<body>
  <!-- Konten -->
</body>
</html>
```

> Font IBM Plex sudah di-import otomatis via Google Fonts di dalam `bps-tokens.css`.

### Langkah 3 — Gunakan token di CSS kamu

```css
/* main.css */
.btn-primary {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  font-size: var(--body-sm-size);
  font-weight: var(--weight-medium);
  border: none;
  cursor: pointer;
  transition: filter var(--transition-base);
}

.btn-primary:hover {
  filter: brightness(1.1);
}

.card {
  background: hsl(var(--card));
  color: hsl(var(--card-foreground));
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: var(--space-6);
}
```

---

## 4. Setup Laravel Blade + Vite

### Langkah 1 — Copy token ke resources

```bash
cp /path/to/bpskaltara-design-system/colors_and_type.css ./resources/css/bps-tokens.css
```

### Langkah 2 — Import di `app.css`

```css
/* resources/css/app.css */
@import 'tailwindcss';
@import './bps-tokens.css';
@source "../views";
@source "../js";
@custom-variant dark (&:where(.dark, .dark *));
```

### Langkah 3 — Konfigurasi Vite/Tailwind

Gunakan plugin resmi Tailwind v4 untuk Vite sesuai stack Laravel Anda. Tidak perlu merge `theme.extend`; token BPS sudah ada di `bps-tokens.css`.

### Langkah 4 — Load font di Blade layout

```html
{{-- resources/views/layouts/app.blade.php --}}
<head>
  {{-- Jika tidak pakai Google Fonts dari CSS, load manual: --}}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  {{-- Font sudah di-include di bps-tokens.css, tidak perlu load manual --}}

  @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
```

---

## 5. Menggunakan Token Warna

### Format penggunaan

```css
/* ✅ Benar */
color: hsl(var(--primary));
background: hsl(var(--background));
border-color: hsl(var(--border));

/* ✅ Dengan alpha (transparansi) */
background: hsl(var(--primary) / 0.1);
color: hsl(var(--foreground) / 0.6);

/* ❌ Salah — jangan pakai langsung tanpa hsl() */
color: var(--primary);
```

### Token warna utama

```css
/* Backgrounds */
hsl(var(--background))          /* Halaman utama */
hsl(var(--card))                /* Card surface */
hsl(var(--muted))               /* Header tabel, input fill */
hsl(var(--background-subtle))   /* Tint bps-50, area sekunder */

/* Text */
hsl(var(--foreground))          /* Teks utama */
hsl(var(--foreground-muted))    /* Teks sekunder */
hsl(var(--foreground-subtle))   /* Placeholder, disabled */
hsl(var(--card-foreground))     /* Teks di atas card */

/* Brand */
hsl(var(--primary))             /* BPS Blue #0099CC */
hsl(var(--accent))              /* BPS Orange #F7941D */

/* UI */
hsl(var(--border))              /* Border umum */
hsl(var(--ring))                /* Focus ring */
hsl(var(--destructive))         /* Error/danger */

/* Data */
hsl(var(--data-positive))       /* Tren positif (hijau) */
hsl(var(--data-negative))       /* Tren negatif (merah) */
hsl(var(--data-warning))        /* Data sementara (amber) */
hsl(var(--data-neutral))        /* Tidak ada perubahan (slate) */

/* Status */
hsl(var(--success))  hsl(var(--success-bg))
hsl(var(--warning))  hsl(var(--warning-bg))
hsl(var(--error))    hsl(var(--error-bg))
hsl(var(--info))     hsl(var(--info-bg))
```

### Kelas Tailwind yang tersedia

```html
<!-- Background -->
<div class="bg-background">
<div class="bg-card">
<div class="bg-muted">
<div class="bg-primary">
<div class="bg-primary/10">     <!-- alpha 10% -->

<!-- Text -->
<p class="text-foreground">
<p class="text-muted-foreground">
<p class="text-primary">

<!-- Border -->
<div class="border border-border">
<div class="ring-2 ring-ring">

<!-- Brand palette -->
<div class="bg-bps-50">        <!-- #EEF4FF tint -->
<div class="bg-bps-900">       <!-- #003D82 dark -->
```

---

## 6. Menggunakan Token Tipografi

### Font families

```css
font-family: var(--font-sans);   /* IBM Plex Sans — semua teks */
font-family: var(--font-mono);   /* IBM Plex Mono — angka, kode */
```

### Kelas tipografi siap pakai

```html
<!-- Display (hero, landing) -->
<h1 class="display-2xl">Judul Sangat Besar</h1>
<h1 class="display-xl">Judul XL</h1>
<h1 class="display-lg">Judul Besar</h1>
<h1 class="display-md">Judul Medium</h1>
<h1 class="display-sm">Judul Kecil</h1>

<!-- Heading (section) -->
<h1 class="h1">Heading 1</h1>
<h2 class="h2">Heading 2</h2>
<h3 class="h3">Heading 3</h3>
<h4 class="h4">Heading 4</h4>

<!-- Body -->
<p class="body-base">Teks isi paragraf utama</p>
<p class="body-sm">Teks isi paragraf kecil</p>
<span class="caption">Keterangan gambar atau footer tabel</span>
<span class="label">Label form (semibold)</span>
<code class="code">kode atau ID</code>

<!-- Tabel data -->
<td class="numeric">1.234.567,89</td>         <!-- angka rata kanan, tabular-nums -->
<th class="table-header">Produksi (ton)</th>  <!-- uppercase, semibold -->
```

### Skeleton loading

```html
<!-- Placeholder saat loading -->
<div class="skeleton" style="height: 1rem; width: 60%;"></div>
<div class="skeleton" style="height: 2rem; width: 100%; margin-top: 0.5rem;"></div>
```

---

## 7. Menggunakan Token Spacing & Layout

### Spacing

```css
/* Gunakan sebagai nilai langsung */
padding: var(--space-4);          /* 16px */
margin-bottom: var(--space-6);    /* 24px */
gap: var(--space-3);              /* 12px */

/* Skala lengkap */
--space-0    → 0px
--space-0-5  → 2px
--space-1    → 4px
--space-1-5  → 6px
--space-2    → 8px
--space-3    → 12px
--space-4    → 16px
--space-5    → 20px
--space-6    → 24px
--space-8    → 32px
--space-10   → 40px
--space-12   → 48px
--space-16   → 64px
--space-20   → 80px
--space-24   → 96px
```

### Border radius

```css
border-radius: var(--radius-sm);   /* 4px — chip, tag kecil */
border-radius: var(--radius-md);   /* 6px — button, input */
border-radius: var(--radius-lg);   /* 8px — card, panel */
border-radius: var(--radius-xl);   /* 12px — modal, large card */
border-radius: var(--radius-2xl);  /* 16px — drawer */
border-radius: var(--radius-full); /* pill, avatar */
```

### Shadow

```css
box-shadow: var(--shadow-xs);    /* sangat halus */
box-shadow: var(--shadow-sm);    /* card default */
box-shadow: var(--shadow-md);    /* card hover / elevated */
box-shadow: var(--shadow-lg);    /* modal, dropdown */
box-shadow: var(--shadow-xl);    /* large overlay */
box-shadow: var(--shadow-inner); /* inset (input focus) */
```

### Z-index

```css
z-index: var(--z-base);      /* 0   — konten biasa */
z-index: var(--z-raised);    /* 10  — sticky element */
z-index: var(--z-dropdown);  /* 100 — dropdown menu */
z-index: var(--z-sticky);    /* 200 — sticky header */
z-index: var(--z-overlay);   /* 300 — backdrop */
z-index: var(--z-modal);     /* 400 — dialog/modal */
z-index: var(--z-toast);     /* 500 — notifikasi */
```

### Transisi

```css
transition: background var(--transition-fast);    /* 100ms — hover warna */
transition: all var(--transition-base);           /* 200ms — state umum */
transition: opacity var(--transition-slow);       /* 350ms — fade in/out */
transition: var(--transition-sidebar);            /* sidebar collapse */
```

### Sidebar layout

```css
width: var(--sidebar-width-expanded);   /* 280px */
width: var(--sidebar-width-collapsed);  /* 64px */
```

---

## 8. Dark Mode

### Mengaktifkan dark mode

Tambahkan class `dark` ke elemen `<html>`:

```html
<!-- Light (default) -->
<html lang="id">

<!-- Dark -->
<html lang="id" class="dark">
```

Semua token warna otomatis ter-override oleh selector `.dark { ... }` di `colors_and_type.css`.

### Implementasi toggle di Next.js

```bash
npm install next-themes
```

```tsx
// src/providers/theme-provider.tsx
'use client'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
    </NextThemesProvider>
  )
}
```

```tsx
// src/app/layout.tsx
import { ThemeProvider } from '@/providers/theme-provider'

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
```

```tsx
// Komponen toggle
'use client'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  )
}
```

### Implementasi toggle di HTML vanilla

```html
<button id="theme-toggle">🌙 Dark Mode</button>

<script>
  const btn = document.getElementById('theme-toggle')
  const html = document.documentElement

  // Restore dari localStorage
  if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark')
    btn.textContent = '☀️ Light Mode'
  }

  btn.addEventListener('click', () => {
    const isDark = html.classList.toggle('dark')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    btn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode'
  })
</script>
```

---

## 9. Extended Palettes (Navy & Amber)

Navy dan Amber tersedia sebagai CSS variable dan kelas Tailwind:

```css
/* CSS Variables */
background: var(--navy-800);    /* #1e3a5f */
color: var(--navy-200);         /* #bcccdc */
background: var(--amber-100);   /* #fef3c7 */
color: var(--amber-800);        /* #92400e */
```

```html
<!-- Tailwind classes -->
<div class="bg-navy-800 text-navy-200">Sidebar alternatif</div>
<span class="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
  ⚠ Sementara
</span>
```

### Panduan kapan menggunakannya

| Palette | Gunakan untuk | Jangan gunakan untuk |
|---|---|---|
| `navy-800/900/950` | Sidebar dark, hero card bg | Menggantikan `--primary` (BPS Blue) |
| `navy-50/100` | Table header alternatif | Background halaman utama |
| `amber-100/200` | Badge "Sementara", warning bg | Menggantikan `--accent` (BPS Orange) |
| `amber-500/600` | Accent button, highlight | Teks body |

---

## 10. Komponen Esensial & shadcn/ui

Karena token sudah kompatibel shadcn/ui `new-york`, kamu bisa menginstall komponen secara individual melalui CLI.

### Menginstall Komponen Dasar

Jalankan perintah ini untuk mengambil komponen-komponen UI yang sering digunakan:

```bash
npx shadcn-ui@latest add button card input badge table dialog toast
```

### Menginstall Komponen Esensial BPS Kaltara (Penting!)

Untuk aplikasi internal BPS yang kompleks (seperti e-Kinerja, HRIS), Anda **wajib** menginstall set komponen interaktif ini untuk menjaga konsistensi:

```bash
npx shadcn-ui@latest add select dropdown-menu pagination tabs sheet
```

**Penjelasan Komponen Esensial:**
1. **`select`** — Dropdown pilihan modern, sangat penting untuk filter tabel data.
2. **`dropdown-menu`** — Menu kontekstual, biasanya digunakan untuk aksi "titik tiga" di setiap baris tabel.
3. **`pagination`** — Navigasi halaman untuk tabel data yang padat.
4. **`tabs`** — Tabulasi konten untuk memisahkan view (contoh: Laporan Tahunan vs Bulanan).
5. **`sheet`** / **`dialog`** (Modal) — Untuk form input kompleks, detail data, atau konfirmasi aksi.
6. **`Empty State`** — Komponen visual khusus (Navy/Amber) yang muncul saat data tabel kosong atau hasil pencarian nihil. (Implementasi manual tersedia di repo Design System).

### Contoh Pemakaian Komponen Interaktif

```tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'

export function StatCard({ judul, nilai, satuan, status }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {judul}
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Buka menu</span>
              {/* Icon titik tiga */}
              ...
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
            <DropdownMenuItem>Unduh Data</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="numeric text-2xl font-bold">{nilai}</div>
        <p className="text-xs text-muted-foreground mt-1">{satuan}</p>
        {status === 'sementara' && (
          <Badge variant="outline" className="mt-2 bg-amber-100 text-amber-800 border-amber-200">
            ⚠ Sementara
          </Badge>
        )}
      </CardContent>
    </Card>
  )
}
```

---

## 11. Referensi Token Lengkap

### Warna Semantik Core

| Token | Light | Dark | Kegunaan |
|---|---|---|---|
| `--background` | `0 0% 100%` | `214 54% 6%` | Background halaman |
| `--foreground` | `220 26% 14%` | `214 20% 95%` | Teks utama |
| `--card` | `0 0% 100%` | `214 54% 8%` | Card surface |
| `--primary` | `196 100% 40%` | `196 100% 50%` | BPS Blue |
| `--accent` | `35 93% 54%` | `35 93% 54%` | BPS Orange |
| `--muted` | `214 30% 96%` | `214 30% 15%` | Subdued surface |
| `--border` | `214 30% 91%` | `214 30% 18%` | Border default |
| `--ring` | `196 100% 40%` | `196 100% 50%` | Focus ring |
| `--destructive` | `0 72% 51%` | `0 62% 30%` | Error/danger |

### BPS Brand

| Token | Nilai | Hex |
|---|---|---|
| `--bps-blue` | `196 100% 40%` | `#0099CC` |
| `--bps-orange` | `35 93% 54%` | `#F7941D` |
| `--bps-green` | `120 35% 54%` | `#5CB85C` |
| `--bps-blue-dark` | `196 100% 28%` | deep |
| `--bps-950` | `222 83% 14%` | `#1E3A5F` sidebar |

### Data & Status

| Token | Warna | Kegunaan |
|---|---|---|
| `--data-positive` | Hijau | Tren naik, nilai baik |
| `--data-negative` | Merah | Tren turun, nilai buruk |
| `--data-warning` | Amber | Data sementara/provisional |
| `--data-neutral` | Slate | Tidak berubah / N/A |
| `--success` + `--success-bg` | Hijau | Toast sukses |
| `--warning` + `--warning-bg` | Amber | Peringatan |
| `--error` + `--error-bg` | Merah | Error form |
| `--info` + `--info-bg` | Biru | Informasi |

### Chart (8 Seri Colorblind-Safe)

| Token | Warna | Representasi |
|---|---|---|
| `--chart-1` | BPS Blue | Kependudukan |
| `--chart-2` | BPS Orange | Perekonomian |
| `--chart-3` | BPS Green | Pertanian |
| `--chart-4` | Violet | Seri 4 |
| `--chart-5` | Teal | Seri 5 |
| `--chart-6` | Red | Seri 6 |
| `--chart-7` | Mid Blue | Seri 7 |
| `--chart-8` | Amber | Seri 8 |

---

## 12. Checklist Integrasi

Gunakan checklist ini setiap kali mengintegrasikan design system ke project baru:

### Setup Awal
- [ ] Copy `colors_and_type.css` ke project
- [ ] Import `@import "tailwindcss";` dan `@source` aplikasi di CSS entry
- [ ] Hapus `@import` Google Fonts dari CSS jika menggunakan `next/font`
- [ ] Setup font IBM Plex Sans + Mono
- [ ] Copy `components.json` (jika pakai shadcn/ui)

### Verifikasi Token
- [ ] `hsl(var(--background))` merender warna benar
- [ ] `hsl(var(--primary))` menampilkan BPS Blue #0099CC
- [ ] Font IBM Plex Sans ter-load (cek DevTools Network tab)
- [ ] Kelas `.numeric` menghasilkan tabular-nums (cek angka di tabel)

### Dark Mode (jika dibutuhkan)
- [ ] Install `next-themes` atau setup toggle manual
- [ ] `suppressHydrationWarning` di `<html>` (Next.js)
- [ ] Test toggle light ↔ dark — semua token berganti otomatis
- [ ] Cek kontras teks di dark mode (minimal 4.5:1 WCAG AA)

### Aksesibilitas
- [ ] `:focus-visible` outline terlihat (2px BPS Blue)
- [ ] Semua icon-only button punya `aria-label`
- [ ] Sel tabel null diisi dash `–` bukan dibiarkan kosong
- [ ] Label form selalu ada (tidak hanya placeholder)

### Konvensi Kode
- [ ] Semua angka statistik menggunakan kelas `.numeric`
- [ ] Header kolom tabel menggunakan kelas `.table-header`
- [ ] Status data provisional menggunakan `--data-warning` (amber)
- [ ] Nilai `color: var(--token)` sudah diganti ke `hsl(var(--token))`

---

## Butuh Bantuan?

- Lihat contoh komponen di `/ui_kits/dashboard/index.html`
- Lihat preview warna di `/preview/colors_*.html`
- Dark mode preview: `/preview/colors_dark.html`
- Extended palettes: `/preview/colors_extended.html`
- Dokumentasi lengkap design system: `README.md`
