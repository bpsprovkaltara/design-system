# Upgrade notes — v3.x → v4.0.0

## Ringkasan

Versi 4 memerlukan **React 19**, **Tailwind CSS 4**, dan disarankan **Node.js 20+**. Build toolchain konsumen mengikuti dokumentasi resmi Tailwind v4 (misalnya plugin `@tailwindcss/vite` untuk proyek Vite).

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
