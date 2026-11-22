# Upgrade notes — v3.x → v4.0.0

## Summary

Version 4 requires **React 19**, **Tailwind CSS 4**, and **Node.js 20+** is recommended. The consumer build toolchain follows the official Tailwind v4 documentation (for example the `@tailwindcss/vite` plugin for a Vite project).

## v4.8.1 — FilterChips.renderLink + the link contract

### FilterChips.renderLink (additive)

Next/TanStack consumers pass `renderLink` so that the chip does not become a raw `<a>`
(a full reload). Without this prop, the 4.8.0 behavior does not change.

```tsx
<FilterChips
  label="Status"
  items={items}
  renderLink={(item, children) => <Link href={item.href}>{children}</Link>}
/>
```

The full table of link holes: [`consumer-chrome.md`](./consumer-chrome.md)
(the section “Framework link contract”). The width of `FormSheet` can simply be overridden through
`className` (`sm:max-w-[480px]`); do not inject CSS into `html`.

## v4.8.0 — Form overlays / SectionTabs / chrome slots + the consumer chrome map

### NotificationPopover, CommandSearch, SidebarAccount, usePersistedCollapsed (additive)

A cross-app chrome shell — **without** fetch, NextAuth, or motion.

```tsx
import {
  NotificationPopover,
  CommandSearch,
  CommandGroup,
  CommandItem,
  SidebarAccount,
  usePersistedCollapsed,
} from '@bpsprovkaltara/design-system'

const [collapsed, setCollapsed] = usePersistedCollapsed('app.sidebarCollapsed')

<NotificationPopover unreadCount={n} onMarkAllRead={markAll}>
  <ul>{/* items from the app API */}</ul>
</NotificationPopover>

<CommandSearch value={q} onValueChange={setQ} placeholder="Cari…">
  <CommandGroup heading="Halaman">
    <CommandItem value="home" onSelect={() => go('/')} >
      Beranda
    </CommandItem>
  </CommandGroup>
</CommandSearch>

<AppShell collapsed={collapsed} onCollapsedChange={setCollapsed} sidebarFooter={
  <SidebarAccount
    name={user.name}
    roleLabel={user.role}
    initials={user.initials}
    collapsed={collapsed}
    actions={<LogoutButton />}
  />
} />
```

Suaraku can replace the `t-notif-*` / `t-tsearch-*` CSS step by step; Menara can replace the `NotificationBell` UI shell and move the `GlobalSearch` pattern to `CommandSearch`.

### SectionTabs (additive)

A sibling route sub-nav. Not a replacement for the Radix `Tabs` (in-page state) — this is real route navigation.

```tsx
import { SectionTabs } from '@bpsprovkaltara/design-system'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const pathname = usePathname()

<SectionTabs
  label="Navigasi modul"
  pathname={pathname}
  tabs={[
    { href: '/pegawai', label: 'Daftar' },
    { href: '/pegawai/status-data', label: 'Status data' },
    {
      href: '/pegawai/peta',
      label: 'Peta jabatan',
      matchPrefixes: ['/pegawai/formasi'],
    },
  ]}
  renderLink={(tab, children) => <Link href={tab.href}>{children}</Link>}
/>
```

The helper `resolveActiveTab(pathname, tabs)` is exported for cases that only need the active id without rendering. The local Menara fork `section-tabs.tsx` can be replaced after the upgrade.

### FormDialog and FormSheet (additive)

A thin composite on top of `Dialog` / `Sheet` for create/edit forms. It replaces the boilerplate repeated in consumers (e.g. Menara `FormDialog`/`FormDrawer`, Suaraku `Modal`/`Drawer`) **without** a motion library.

```tsx
import { FormDialog, FormSheet, Button } from '@bpsprovkaltara/design-system'

<FormDialog
  title="Tambah pengguna"
  description="Lengkapi data akun baru."
  trigger={<Button>Buka</Button>}
>
  {(close) => (
    <>
      {/* fields */}
      <Button type="button" onClick={close}>
        Simpan
      </Button>
    </>
  )}
</FormDialog>

<FormSheet
  title="Edit pegawai"
  trigger={<Button>Buka</Button>}
  footer={(close) => (
    <Button type="button" onClick={close}>
      Simpan
    </Button>
  )}
>
  {/* field panjang */}
</FormSheet>
```

Controlled: pass `open` + `onOpenChange`. The `Dialog` / `Sheet` primitives are still available for non-form cases.

The full map of “already in the DS vs stays in the app” (including the `AppShell` toggle since 4.6 and the 4.7 patterns): see [`consumer-chrome.md`](./consumer-chrome.md).

## v4.7.0 — Command/CommandDialog: a11y, inline variant, cmdk props

Fixes to `Command` and `CommandDialog`. **No breaking API change**: all old props are still accepted, the existing `CommandDialog` look does not change, and the default `Command` keeps `h-full overflow-hidden`. The sections below explain the fixes and the new opt-ins.

### 1. CommandDialog is now accessible (a11y, must know)

Previously `DialogHeader`/`DialogTitle`/`DialogDescription` were rendered as siblings of `DialogContent`, so Radix did not link `aria-labelledby` to `[role=dialog]` and the dialog had no accessible name. The header is now inside `DialogContent`. **No consumer action**; to verify: the dialog no longer shows the Radix dev warning "DialogContent requires a DialogTitle".

### 2. The `inline` variant for a palette anchored in the topbar

`Command` now accepts `variant?: "dialog" | "inline"` (default `"dialog"`, backward compatible). To install an inline palette (the input in the topbar, an `absolute` suggestion panel below):

```tsx
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from '@bpsprovkaltara/design-system'
;<Command variant="inline" className="rounded-lg border bg-popover shadow-elevation-3">
  <CommandInput wrapperClassName="border-b-0" placeholder="Cari..." />
  <CommandList>
    <CommandEmpty>Tidak ada hasil.</CommandEmpty>
    <CommandGroup heading="Halaman">
      <CommandItem>Dashboard</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

### 3. `commandProps` for server-side search / `shouldFilter={false}`

`CommandDialog` now forwards cmdk props to the internal `<Command>` instance via `commandProps`:

```tsx
<CommandDialog commandProps={{ shouldFilter: false }}>
  {/* items are shown as they are; suitable for results from an API */}
</CommandDialog>
```

Without this, the cmdk client fuzzy filter drops rows that actually match (e.g. the server matches NIP/email, while the displayed label is the name).

### 4. `CommandInput.wrapperClassName` + a focus indicator that is not locked

The `CommandInput` wrapper (the holder of `border-b`, padding, the Search icon) can now be styled through `wrapperClassName`; `className` still goes to the `<input>`. The focus indicator no longer uses `!important` and a 2px inset shadow; it is replaced by a conventional ring on the wrapper. Consumers that rely on the arbitrary selector `[&_[data-slot=command-input-wrapper]]` can switch to `wrapperClassName`.

### 5. New component: `Kbd`

A keyboard key badge (`⌘K`, `↵`) is available through the root barrel and the subpath `@bpsprovkaltara/design-system/components/ui/kbd`.

### 6. Card / FilterBar: the `surface` skin (opt-in)

To remove the repeated reskin `rounded-2xl border-border-subtle shadow-elevation-1`:

```tsx
<Card variant="surface">…</Card>
<FilterBar variant="surface" filters={…} />
```

The default look does not change. Consumers that already write the same className can replace it with `variant="surface"`.

### 7. Interactive Stepper (`onStepClick`, `stepErrors`)

Additive, non-breaking. Without the new props, the Stepper stays display-only.

```tsx
<Stepper
  steps={steps}
  current={current}
  onStepClick={(index) => setCurrent(index)}
  stepErrors={errorsByStep}
/>
```

Only steps with `index <= current` can be clicked. `stepErrors[i] === true` shows an error status (a warning icon).

### 8. Native form / RHF adapters (`SelectInput`, `DateInput`, `CheckboxInput`)

New components (additive). The old primitives remain.

```tsx
import { SelectInput, DateInput, CheckboxInput } from '@bpsprovkaltara/design-system'

<select name="wilayah" /> // diganti:
<SelectInput name="wilayah" defaultValue="tarakan">
  <option value="tarakan">Tarakan</option>
  <option value="nunukan">Nunukan</option>
</SelectInput>

<DateInput name="tanggal" defaultValue="2024-08-17" /> // nilai POST: yyyy-MM-dd
<CheckboxInput name="setuju" label="Saya setuju" />
```

They can be used with `register('field')` because the ref points to a native element. Consumers that have a local adapter (e.g. Menara `inputs.tsx`) can migrate step by step.

### 9. Patterns Wave 2 (`SectionCard`, `DataTableCard`, `FilterChips`, `PageSkeleton`, `KpiCard.accent`, `nav`)

Additive. Import from the barrel or the subpath `patterns/*` / `components/ui/*`.

```tsx
import {
  SectionCard,
  DataTableCard,
  FilterChips,
  PageSkeleton,
  KpiCard,
  LinkButton,
} from '@bpsprovkaltara/design-system'

<SectionCard title="…" icon={…} action={…} headerExtra={…}>…</SectionCard>
<DataTableCard summary={[{ label: 'Total', value: '12' }]} footer={…}>…</DataTableCard>
<FilterChips label="Status" items={[{ href: '/a', label: 'A', active: true }]} />
<PageSkeleton variant="table" />
<KpiCard title="…" value="…" accent="success" icon={…} />
<LinkButton variant="nav" size="sm" href="/modul">Modul</LinkButton>
```

`KpiCard` without `accent` still uses `border-l-4 border-l-primary`.

### 10. BadgeTooltip, RowDetailLink, and the motion decision (#22)

```tsx
<BadgeTooltip content="Menunggu verifikasi">
  <Badge>Pending</Badge>
</BadgeTooltip>

<RowDetailLink href="/pegawai/1" label="Detail pegawai Andi Pratama" />

// Next.js / React Router
<RowDetailLink label="Detail pegawai Andi Pratama" asChild>
  <Link href="/pegawai/1" />
</RowDetailLink>
```

**Motion JS:** the DS does **not** adopt the `motion` library. The standard stays the CSS tokens (`--motion-duration-*`, `--motion-ease-*`). See `docs/adr/0002-no-motion-js-dependency.md`.

### 11. Combobox: search height + a styling escape hatch

`Combobox` no longer forces `h-11` on `CommandInput`. The default is already aligned with the `h-9` wrapper and the standard focus ring. If the Menara consumer (or another application) has already patched it with an arbitrary selector / `focus-visible:shadow-none` / a height override, that patch can usually be removed.

New props (optional, non-breaking):

```tsx
<Combobox
  options={options}
  inputClassName="…"
  inputWrapperClassName="border-b-0"
  commandClassName="…"
/>
```

`className` still only affects the trigger button.

## v4.6.0 — Chrome alignment & sidebar a11y

This release changes the shell visually. There is no API change to `AppShell`, but there are two things consumers need to be aware of.

### 1. The collapse button moves from `AppSidebar` to `AppShell`

The button is now rendered as a floating circle on the right edge of the rail, outside the `<aside>` so it is not clipped by the sidebar overflow.

Users of `AppShell` **do not need to do anything** — `onCollapsedChange` is still forwarded as usual.

Users of `<AppSidebar>` directly: the `onCollapsedChange` prop is still accepted but is now ignored. Provide your own button and point `aria-controls` at the new `id` prop:

```tsx
<div className="relative">
  <AppSidebar id="rail" groups={groups} collapsed={collapsed} />
  <button aria-controls="rail" aria-expanded={!collapsed} onClick={() => setCollapsed(!collapsed)}>
    …
  </button>
</div>
```

### 2. Topbar height 56px → 64px

`AppTopbar` uses `h-topbar` (the token `--topbar-height`, default `4rem`). The `AppSidebar` header uses the same height, so their bottom lines form one straight line.

Replace the hardcoded offset:

```diff
- <div className="top-14">
+ <div className="top-[var(--topbar-height)]">
```

Consumers can override it in `:root`:

```css
:root {
  --topbar-height: 3.5rem;
}
```

### 3. Sidebar border color

The sidebar no longer uses `--border` (a light theme token that renders bright on the navy surface). Its new token is `--sidebar-border`, default `var(--navy-800)`. Override it in `:root` if needed.

### 4. `renderLink` — do not style it yourself any more

`AppSidebar` now copies the item styling onto the element returned by `renderLink`, not onto the wrapping `<div>`. If your link previously got its own class to work around this, remove it — the classes will be merged and can override each other.

```tsx
// Cukup begini:
renderLink={(item, content) => <Link href={item.href ?? '#'}>{content}</Link>}
```

## v4.5.0 — App shell & list-page foundations

### AppShell / AppSidebar / AppTopbar

The application layout is now exported (not only the showcase):

```tsx
import { AppShell } from '@bpsprovkaltara/design-system'
;<AppShell
  groups={[{ title: 'Menu', items: [{ id: 'home', label: 'Beranda', href: '/' }] }]}
  activeId="home"
  logo={<span>BPS</span>}
  topbarStart={<Breadcrumb>...</Breadcrumb>}
  topbarEnd={<UserMenu />}
>
  {children}
</AppShell>
```

`AppTopbar` accepts the slots `start` / `end` (the `appTitle` prop is still supported as a fallback).

### FilterBar composable

Prefer `filters: FilterField[]` or `children`. The old API `{ keyword, status, unitKerja }` still works; the domain preset: `DocumentFilterBar`.

### DataTable states & server pagination

- `loading` / `error` / empty (`EmptyState`)
- `pagination={{ page, pageSize, total, onPageChange }}` for server-driven lists

### ConfirmDialog

Replace `ConfirmActionDialog` (a deprecated wrapper) with `ConfirmDialog` — controlled `open`, `trigger` ReactNode, `busy`, `showReason`, `variant="destructive"`, async `onConfirm`.

### ThemeToggle / useTheme

The `.dark` class-based dark mode toggle is now public (previously showcase-only).

## v4.4.0 — eval-fixes & BPS capabilities

### Form peer dependencies (optional)

`react-hook-form`, `zod`, and `@hookform/resolvers` are now **optional peers**. If the application uses `Form` + RHF/Zod, install them explicitly:

```bash
pnpm add react-hook-form zod @hookform/resolvers
```

An application that does not use Form does not need to install the three.

### `prepare` no longer builds the library

`bun install` in this repo does not run `build:lib`. The build stays in `prepublishOnly` and CI. Make sure `dist/` exists when consuming from git/path, or install from the published registry.

### DataTable — row actions

The **Actions** column / Edit button is no longer automatic. Without `renderRowActions`, only the data columns are rendered:

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

Optional: `sortable` per column + `pageSize` for client-side pagination.

### BulkActionBar — generic actions

```tsx
// Before
<BulkActionBar
  selectedCount={n}
  onSetPending={...}
  onSetApproved={...}
/>

// After
<BulkActionBar
  selectedCount={n}
  actions={[
    { label: 'Set menunggu verifikasi', onClick: ..., variant: 'outline' },
    { label: 'Set disetujui', onClick: ... },
  ]}
/>
```

### StatusBadge — type rename

```tsx
// Before
import { StatusBadge, badgeVariants, type BadgeProps } from '...'

// After
import { StatusBadge, statusBadgeVariants, type StatusBadgeProps } from '...'
```

### FilterBar — custom options

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

### UI subpath imports

The catch-all `./*` was removed. Use the canonical paths:

```tsx
// Before
import { Button } from '@bpsprovkaltara/design-system/button'

// After
import { Button } from '@bpsprovkaltara/design-system/components/ui/button'
// or still from the main entry:
import { Button } from '@bpsprovkaltara/design-system'
```

Still available: `./utils`, `./patterns/*`, `./hooks/*`, `./styles.css`, `./tokens.css`, `./fonts.css`.

### Tokens

- Layer C (`--button-primary-*`, `--input-*`, `--table-*`) was removed — use Layer B / shadcn semantic.
- Dark mode now overrides `--brand-*`, `--data-*`, `--map-tier-*`.
- New Tailwind utilities: `bg-slate-*`, `bg-map-tier-*`, `font-sans` / `font-mono` from `@theme`.

## v4.3.0 — Button as a link / navigation

For button-styled navigation, use **`LinkButton`**. This component uses
`buttonVariants()` from the design system so consumers do not need to copy the classes
by hand from `Button`.

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

If a Next.js App Router application needs `<Link>` behavior such as prefetch and
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

`Button asChild` is still supported for advanced composition such as `DialogTrigger`,
`SheetTrigger`, or another Radix trigger. For normal navigation, prefer `LinkButton`.

Migrating from the old pattern:

```tsx
// Before
<Button asChild>
  <Link href="/pegawai/1/edit">
    <Pencil />
    Edit
  </Link>
</Button>

// After
<LinkButton href="/pegawai/1/edit" variant="outline" size="sm" iconLeft={<Pencil />}>
  Edit
</LinkButton>
```

## Peer dependencies

| Package       | v3.x  | v4.0.0   |
| ------------- | ----- | -------- |
| `react`       | ≥ 18  | **≥ 19** |
| `react-dom`   | ≥ 18  | **≥ 19** |
| `tailwindcss` | ≥ 3.4 | **≥ 4**  |

## 1) Raise React and TypeScript

```bash
pnpm add react@^19 react-dom@^19
pnpm add -D @types/react@^19 @types/react-dom@^19 typescript@latest
```

Adjust the consumer `tsconfig` if the compiler complains (modern target/lib, JSX `react-jsx`).

## 2) The design system stylesheet (required)

For a non-Tailwind application, in the application entry (e.g. `main.tsx`):

```ts
import '@bpsprovkaltara/design-system/styles.css'
```

This loads the tokens + utilities and the preflight. A Tailwind4 application that already has
the preflight uses tokens.css and @source dist, as in section 2bb below;
do not import both CSS entries. Tokens are configured in CSS, not a preset.

## 2b) Fonts (required from 4.0.1)

From **4.0.1**, the package `styles.css` **no longer** `@import`s Google Fonts (a CDN inside
library CSS is render-blocking and forces third-party requests without consumer
control). You **must** provide the three fonts yourself so the typography matches the design:
**Fraunces**, **IBM Plex Sans**, **IBM Plex Mono**.

### Next.js (recommended — `next/font`, automatic self-hosting)

```ts
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
// register them, then attach the CSS variable / className on <html> or <body>
```

### Other stacks (`<link>` or self-hosting)

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"
/>
```

### Opt-in CDN path (`fonts.css`, 4.1.0+)

If you want it quick without setup, import the optional font file (not the default — not pulled
by `styles.css`):

```css
@import '@bpsprovkaltara/design-system/fonts.css';
```

Required weights: IBM Plex Sans `400/500/600/700`, IBM Plex Mono `400/500`,
Fraunces `300–900`. The tokens have a system fallback (`system-ui`/`serif`/`monospace`).

## 2bb) Avoid double-preflight: `tokens.css` (4.1.0+)

`styles.css` contains the **full Tailwind preflight**. If your app **already** runs
Tailwind v4, importing it will double the base/reset. Since **4.1.0**,
`tokens.css` is available (tokens + `@theme` + DS utilities, **without** preflight):

```css
@import 'tailwindcss'; /* your app's preflight (once) */
@import '@bpsprovkaltara/design-system/tokens.css'; /* DS tokens + theme, without preflight */
@source "../node_modules/@bpsprovkaltara/design-system/dist"; /* generate kelas komponen DS */
```

`tokens.css` is processed by your own Tailwind (it contains the `@theme`/`@utility` directives),
so the full theme integration is active without `tailwind-preset` (deprecated).
**Non-Tailwind** consumers still use `styles.css` (all-in-one).

## 2c) Per-component imports (optional, 4.0.1+; canonical paths since 4.4.0)

For stricter tree-shaking and RSC isolation, components can be imported through a subpath:

```ts
import { Button } from '@bpsprovkaltara/design-system/components/ui/button'
import { DataTable } from '@bpsprovkaltara/design-system/components/ui/data-table'
import { EmptyState } from '@bpsprovkaltara/design-system/patterns/empty-state'
import { useToast } from '@bpsprovkaltara/design-system/hooks/use-toast'
```

Barrel imports (`from '@bpsprovkaltara/design-system'`) are still fully supported. The catch-all
`@bpsprovkaltara/design-system/button` was removed in **4.4.0** — see § v4.4.0.

## 3) Tailwind 4 in your application

**Remove** the dependency on this package's preset. The export `@bpsprovkaltara/design-system/tailwind-preset` is **deprecated** (a shim + `console.warn`); it will be removed in v5.

### Vite (example)

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
@import 'tailwindcss';
@import '@bpsprovkaltara/design-system/tokens.css';
```

Make sure that CSS file is imported from `main.tsx`. Follow the [Tailwind v4 + Vite installation](https://tailwindcss.com/docs/installation/using-vite).

### Moving `content` / `@source`

So that the Tailwind classes in **your code** are scanned:

- Tailwind v4: use `@source` in the application CSS, for example:

```css
@import 'tailwindcss';
@source "../src";
@source "../node_modules/@bpsprovkaltara/design-system/dist";
```

The `node_modules` line is only needed if you import the package stylesheet from the application CSS and want Tailwind to process the package source during the application build. If you import `@bpsprovkaltara/design-system/styles.css` directly from the TypeScript entry, the library CSS is already prebuilt.

### Before / after (the old preset)

**Before (v3):**

```ts
// tailwind.config.ts — the old pattern, do not use it for v4 any more
import preset from '@bpsprovkaltara/design-system/tailwind-preset'
export default { presets: [preset], content: [...] }
```

**After (v4):** no `presets` from this package are needed; the Tailwind configuration follows the v4 documentation + `tokens.css` after `@import 'tailwindcss'` (see the example above). `styles.css` is only for non-Tailwind consumers — do not import it together with `tokens.css`.

## 4) Tailwind utilities that changed

If your application still uses v3 patterns, adjust them to Tailwind v4:

- `outline-none` for the old focus ring becomes `outline-hidden`.
- Arbitrary variable shorthand such as `h-[--cell-size]` becomes `h-(--cell-size)`.
- The `darkMode: 'class'` configuration is replaced with CSS: `@custom-variant dark (&:where(.dark, .dark *));`.

## 5) React components (`ref`)

Library components no longer use `React.forwardRef`; `ref` is passed as a normal prop (the React 19 pattern). JSX usage `<Button ref={r} />` stays the same.

## 6) TypeScript

The design system repository uses TypeScript 6.x; consumers are advised to use a TypeScript compatible with React 19.

## Consumer checklist

1. Raise `react` and `react-dom` to 19 (+ the dev types if needed).
2. Raise `tailwindcss` to 4; install the official tooling (`@tailwindcss/vite` or PostCSS according to the stack).
3. Import the package stylesheet once at the root: `@bpsprovkaltara/design-system/tokens.css` after `@import 'tailwindcss'` for a Tailwind 4 application; `styles.css` only if the application does not use Tailwind.
4. Remove the `tailwind-preset` import from this package; set `@source` / `content` to cover `src` and `node_modules/.../design-system/dist` if needed.
5. Run the tests and lint, and review the UI (especially dialogs, sheets, forms, tables).

## Release help

- Ready-to-paste notes for GitHub Releases: `docs/releases/v4.0.0-github.md`
- Riwayat perubahan: `CHANGELOG.md`
