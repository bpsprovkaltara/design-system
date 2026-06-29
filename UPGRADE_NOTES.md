# Upgrade notes — v3.x → v4.0.0

## Ringkasan

Versi 4 memerlukan **React 19**, **Tailwind CSS 4**, dan disarankan **Node.js 20+**. Build toolchain konsumen mengikuti dokumentasi resmi Tailwind v4 (misalnya plugin `@tailwindcss/vite` untuk proyek Vite).

## v4.3.0 — Button sebagai link / navigasi

Untuk navigasi bergaya tombol, gunakan **`LinkButton`**. Komponen ini memakai
`buttonVariants()` dari design system sehingga konsumen tidak perlu menyalin class
manual dari `Button`.

```tsx
import { LinkButton } from '@bpsprovkaltara/design-system'
import { Pencil } from 'lucide-react'

export function EditPegawaiLink() {
  return (
    <LinkButton href="/pegawai/1/edit" variant="outline" size="sm" iconLeft={<Pencil />}>
      Edit
    </LinkButton>
  )
}
```

Jika aplikasi Next.js App Router membutuhkan perilaku `<Link>` seperti prefetch dan
client-side navigation, gunakan `LinkButton asChild`:

```tsx
import Link from 'next/link'
import { LinkButton } from '@bpsprovkaltara/design-system'
import { Pencil } from 'lucide-react'

export function EditPegawaiLink() {
  return (
    <LinkButton asChild variant="outline" size="sm" iconLeft={<Pencil />}>
      <Link href="/pegawai/1/edit">Edit</Link>
    </LinkButton>
  )
}
```

`Button asChild` tetap didukung untuk komposisi advanced seperti `DialogTrigger`,
`SheetTrigger`, atau trigger Radix lain. Untuk navigasi biasa, prefer `LinkButton`.

Migrasi dari pola lama:

```tsx
// Sebelum
<Button asChild>
  <Link href="/pegawai/1/edit">
    <Pencil />
    Edit
  </Link>
</Button>

// Sesudah
<LinkButton href="/pegawai/1/edit" variant="outline" size="sm" iconLeft={<Pencil />}>
  Edit
</LinkButton>
```

## Peer dependencies

| Paket           | v3.x    | v4.0.0   |
|----------------|---------|----------|
| `react`        | ≥ 18    | **≥ 19** |
| `react-dom`    | ≥ 18    | **≥ 19** |
| `tailwindcss`  | ≥ 3.4   | **≥ 4**  |

## 1) Naikkan React dan TypeScript

```bash
pnpm add react@^19 react-dom@^19
pnpm add -D @types/react@^19 @types/react-dom@^19 typescript@latest
```

Sesuaikan `tsconfig` konsumen bila compiler mengeluh (target/lib modern, JSX `react-jsx`).

## 2) Stylesheet design system (wajib)

Di entry aplikasi (mis. `main.tsx`):

```ts
import '@bpsprovkaltara/design-system/styles.css'
```

Ini memuat token + utilitas yang dipakai komponen library. Di v4, token Tailwind paket ini dikonfigurasi langsung di CSS (`@theme`, `@utility`, `@source`, `@plugin`), bukan melalui `tailwind.config.ts`.

## 2b) Font (wajib mulai 4.0.1)

Mulai **4.0.1**, `styles.css` paket **tidak lagi** me-`@import` Google Fonts (CDN dalam
CSS library bersifat render-blocking dan memaksa request pihak ketiga tanpa kontrol
konsumen). Anda **wajib** menyediakan tiga font sendiri agar tipografi sesuai desain:
**Fraunces**, **IBM Plex Sans**, **IBM Plex Mono**.

### Next.js (disarankan — `next/font`, self-host otomatis)

```ts
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
// daftarkan, lalu pasang CSS variable / className di <html> atau <body>
```

### Stack lain (`<link>` atau self-host)

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" />
```

### Jalur CDN opt-in (`fonts.css`, 4.1.0+)

Bila ingin cepat tanpa setup, impor file font opsional (bukan default — tidak ditarik
`styles.css`):

```css
@import "@bpsprovkaltara/design-system/fonts.css";
```

Weight yang dibutuhkan: IBM Plex Sans `400/500/600/700`, IBM Plex Mono `400/500`,
Fraunces `300–900`. Token punya fallback system (`system-ui`/`serif`/`monospace`).

## 2bb) Hindari double-preflight: `tokens.css` (4.1.0+)

`styles.css` berisi **preflight Tailwind penuh**. Jika app Anda **sudah** menjalankan
Tailwind v4, mengimpornya akan menggandakan base/reset. Sejak **4.1.0** tersedia
`tokens.css` (token + `@theme` + utilitas DS, **tanpa** preflight):

```css
@import "tailwindcss";                                  /* preflight app Anda (satu kali) */
@import "@bpsprovkaltara/design-system/tokens.css";     /* token + tema DS, tanpa preflight */
@source "../node_modules/@bpsprovkaltara/design-system/dist";  /* generate kelas komponen DS */
```

`tokens.css` diproses oleh Tailwind milik Anda (mengandung directive `@theme`/`@utility`),
jadi integrasi tema penuh aktif tanpa `tailwind-preset` (deprecated). Konsumen
**non-Tailwind** tetap memakai `styles.css` (all-in-one).

## 2c) Impor per-komponen (opsional, 4.0.1+)

Untuk tree-shaking lebih ketat dan isolasi RSC, komponen bisa diimpor lewat subpath:

```ts
import { Button } from '@bpsprovkaltara/design-system/button'
import { DataTable } from '@bpsprovkaltara/design-system/data-table'
import { EmptyState } from '@bpsprovkaltara/design-system/patterns/empty-state'
import { useToast } from '@bpsprovkaltara/design-system/hooks/use-toast'
```

Impor barrel (`from '@bpsprovkaltara/design-system'`) tetap didukung penuh.

## 3) Tailwind 4 di aplikasi Anda

**Hapus** dependensi pada preset paket ini. Ekspor `@bpsprovkaltara/design-system/tailwind-preset` **deprecated** (shim + `console.warn`); akan dihapus di v5.

### Vite (contoh)

`vite.config.ts`:

```ts
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

Entry CSS aplikasi (mis. `src/index.css`):

```css
@import "tailwindcss";
```

Pastikan file CSS itu diimpor dari `main.tsx`. Ikuti [instalasi Tailwind v4 + Vite](https://tailwindcss.com/docs/installation/using-vite).

### Memindahkan `content` / `@source`

Agar kelas Tailwind di **kode Anda** ikut discan:

- Tailwind v4: gunakan `@source` di CSS aplikasi, misalnya:

```css
@import "tailwindcss";
@source "../src";
@source "../node_modules/@bpsprovkaltara/design-system/dist";
```

Baris `node_modules` hanya diperlukan bila Anda mengimpor stylesheet paket dari CSS aplikasi dan ingin Tailwind memproses source paket saat build aplikasi. Jika Anda mengimpor `@bpsprovkaltara/design-system/styles.css` langsung dari entry TypeScript, CSS library sudah prebuilt.

### Sebelum / sesudah (preset lama)

**Sebelum (v3):**

```ts
// tailwind.config.ts — pola lama, jangan dipakai lagi untuk v4
import preset from '@bpsprovkaltara/design-system/tailwind-preset'
export default { presets: [preset], content: [...] }
```

**Sesudah (v4):** tidak perlu `presets` dari paket ini; konfigurasi Tailwind mengikuti dokumentasi v4 + impor `styles.css` di atas.

## 4) Utility Tailwind yang berubah

Jika aplikasi Anda masih memakai pola v3, sesuaikan dengan Tailwind v4:

- `outline-none` untuk focus ring lama menjadi `outline-hidden`.
- Shorthand variable arbitrary seperti `h-[--cell-size]` menjadi `h-(--cell-size)`.
- Konfigurasi `darkMode: 'class'` diganti dengan CSS: `@custom-variant dark (&:where(.dark, .dark *));`.

## 5) Komponen React (`ref`)

Komponen library tidak lagi memakai `React.forwardRef`; `ref` diteruskan sebagai prop biasa (pola React 19). Pemakaian JSX `<Button ref={r} />` tetap sama.

## 6) TypeScript

Repositori design system memakai TypeScript 6.x; konsumen disarankan memakai TypeScript yang kompatibel dengan React 19.

## Checklist konsumen

1. Naikkan `react` dan `react-dom` ke 19 (+ tipe dev bila perlu).
2. Naikkan `tailwindcss` ke 4; pasang tooling resmi (`@tailwindcss/vite` atau PostCSS sesuai stack).
3. Impor `@bpsprovkaltara/design-system/styles.css` sekali di root aplikasi.
4. Hapus impor `tailwind-preset` dari paket ini; atur `@source` / `content` agar mencakup `src` dan `node_modules/.../design-system/dist` bila perlu.
5. Jalankan test, lint, dan tinjau UI (terutama dialog, sheet, form, tabel).

## Bantuan rilis

- Catatan siap tempel untuk GitHub Releases: `docs/releases/v4.0.0-github.md`
- Riwayat perubahan: `CHANGELOG.md`
