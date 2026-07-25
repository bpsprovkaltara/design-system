# Upgrade notes — v3.x → v4.0.0

## Ringkasan

Versi 4 memerlukan **React 19**, **Tailwind CSS 4**, dan disarankan **Node.js 20+**. Build toolchain konsumen mengikuti dokumentasi resmi Tailwind v4 (misalnya plugin `@tailwindcss/vite` untuk proyek Vite).

## v4.6.0 — Chrome alignment & sidebar a11y

Rilis ini mengubah tampilan shell secara visual. Tidak ada perubahan API pada `AppShell`, tapi ada dua hal yang perlu disadari konsumen.

### 1. Tombol collapse pindah dari `AppSidebar` ke `AppShell`

Tombol sekarang dirender sebagai lingkaran mengambang di tepi kanan rail, di luar `<aside>` supaya tidak terpotong oleh overflow sidebar.

Pemakai `AppShell` **tidak perlu berbuat apa-apa** — `onCollapsedChange` tetap diteruskan seperti biasa.

Pemakai `<AppSidebar>` langsung: prop `onCollapsedChange` masih diterima tapi kini diabaikan. Sediakan tombolnya sendiri dan arahkan `aria-controls` ke prop `id` yang baru:

```tsx
<div className="relative">
  <AppSidebar id="rail" groups={groups} collapsed={collapsed} />
  <button aria-controls="rail" aria-expanded={!collapsed} onClick={() => setCollapsed(!collapsed)}>
    …
  </button>
</div>
```

### 2. Tinggi topbar 56px → 64px

`AppTopbar` memakai `h-topbar` (token `--topbar-height`, default `4rem`). Header `AppSidebar` memakai tinggi yang sama, sehingga kedua garis bawahnya membentuk satu garis lurus.

Ganti offset yang di-hardcode:

```diff
- <div className="top-14">
+ <div className="top-[var(--topbar-height)]">
```

Konsumen bisa menimpanya di `:root`:

```css
:root { --topbar-height: 3.5rem; }
```

### 3. Warna border sidebar

Sidebar tidak lagi memakai `--border` (token light theme yang merender terang di atas permukaan navy). Token barunya `--sidebar-border`, default `var(--navy-800)`. Timpa di `:root` bila perlu.

### 4. `renderLink` — jangan lagi menata sendiri

`AppSidebar` kini menyalin styling item ke elemen yang dikembalikan `renderLink`, bukan ke `<div>` pembungkus. Kalau sebelumnya link Anda diberi kelas sendiri untuk mengakali hal ini, hapus — kelasnya akan digabungkan dan bisa saling menimpa.

```tsx
// Cukup begini:
renderLink={(item, content) => <Link href={item.href ?? '#'}>{content}</Link>}
```

## v4.5.0 — App shell & list-page foundations

### AppShell / AppSidebar / AppTopbar

Layout aplikasi kini diekspor (bukan hanya showcase):

```tsx
import { AppShell } from '@bpsprovkaltara/design-system'

<AppShell
  groups={[{ title: 'Menu', items: [{ id: 'home', label: 'Beranda', href: '/' }] }]}
  activeId="home"
  logo={<span>BPS</span>}
  topbarStart={<Breadcrumb>...</Breadcrumb>}
  topbarEnd={<UserMenu />}
>
  {children}
</AppShell>
```

`AppTopbar` menerima slot `start` / `end` (prop `appTitle` tetap didukung sebagai fallback).

### FilterBar composable

Prefer `filters: FilterField[]` atau `children`. API lama `{ keyword, status, unitKerja }` tetap berfungsi; domain preset: `DocumentFilterBar`.

### DataTable states & server pagination

- `loading` / `error` / empty (`EmptyState`)
- `pagination={{ page, pageSize, total, onPageChange }}` untuk server-driven lists

### ConfirmDialog

Ganti `ConfirmActionDialog` (deprecated wrapper) dengan `ConfirmDialog` — controlled `open`, `trigger` ReactNode, `busy`, `showReason`, `variant="destructive"`, `onConfirm` async.

### ThemeToggle / useTheme

Toggle dark mode berbasis class `.dark` kini publik (sebelumnya showcase-only).

## v4.4.0 — eval-fixes & kapabilitas BPS

### Peer dependencies Form (opsional)

`react-hook-form`, `zod`, dan `@hookform/resolvers` kini **peer optional**. Jika aplikasi memakai `Form` + RHF/Zod, install eksplisit:

```bash
pnpm add react-hook-form zod @hookform/resolvers
```

Aplikasi yang tidak memakai Form tidak perlu menginstal ketiganya.

### `prepare` tidak lagi membangun library

`pnpm install` pada paket/repo ini tidak menjalankan `build:lib`. Build tetap di `prepublishOnly` dan CI. Pastikan `dist/` ada saat consume dari git/path, atau install dari registry yang sudah di-publish.

### DataTable — row actions

Kolom **Aksi** / tombol Edit tidak lagi otomatis. Tanpa `renderRowActions`, hanya kolom data yang dirender:

```tsx
<DataTable
  data={rows}
  columns={columns}
  getRowKey={(row) => row.id}
  renderRowActions={(row) => (
    <Button size="sm" variant="ghost" onClick={() => edit(row)}>
      Edit
    </Button>
  )}
/>
```

Opsional: `sortable` per kolom + `pageSize` untuk pagination client-side.

### BulkActionBar — actions generik

```tsx
// Sebelum
<BulkActionBar
  selectedCount={n}
  onSetPending={...}
  onSetApproved={...}
/>

// Sesudah
<BulkActionBar
  selectedCount={n}
  actions={[
    { label: 'Set menunggu verifikasi', onClick: ..., variant: 'outline' },
    { label: 'Set disetujui', onClick: ... },
  ]}
/>
```

### StatusBadge — rename tipe

```tsx
// Sebelum
import { StatusBadge, badgeVariants, type BadgeProps } from '...'

// Sesudah
import { StatusBadge, statusBadgeVariants, type StatusBadgeProps } from '...'
```

### FilterBar — options kustom

```tsx
<FilterBar
  value={filters}
  onChange={setFilters}
  onReset={reset}
  statusOptions={[
    { value: 'all', label: 'Semua' },
    { value: 'pending', label: 'Menunggu' },
  ]}
/>
```

### Subpath import UI

Catch-all `./*` dihapus. Gunakan path kanonik:

```tsx
// Sebelum
import { Button } from '@bpsprovkaltara/design-system/button'

// Sesudah
import { Button } from '@bpsprovkaltara/design-system/components/ui/button'
// atau tetap dari entry utama:
import { Button } from '@bpsprovkaltara/design-system'
```

Tetap tersedia: `./utils`, `./patterns/*`, `./hooks/*`, `./styles.css`, `./tokens.css`, `./fonts.css`.

### Token

- Layer C (`--button-primary-*`, `--input-*`, `--table-*`) dihapus — pakai Layer B / shadcn semantic.
- Dark mode kini meng-override `--brand-*`, `--data-*`, `--map-tier-*`.
- Util Tailwind baru: `bg-slate-*`, `bg-map-tier-*`, `font-sans` / `font-mono` dari `@theme`.

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

## 2c) Impor per-komponen (opsional, 4.0.1+; path kanonik sejak 4.4.0)

Untuk tree-shaking lebih ketat dan isolasi RSC, komponen bisa diimpor lewat subpath:

```ts
import { Button } from '@bpsprovkaltara/design-system/components/ui/button'
import { DataTable } from '@bpsprovkaltara/design-system/components/ui/data-table'
import { EmptyState } from '@bpsprovkaltara/design-system/patterns/empty-state'
import { useToast } from '@bpsprovkaltara/design-system/hooks/use-toast'
```

Impor barrel (`from '@bpsprovkaltara/design-system'`) tetap didukung penuh. Catch-all
`@bpsprovkaltara/design-system/button` dihapus di **4.4.0** — lihat § v4.4.0.

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
