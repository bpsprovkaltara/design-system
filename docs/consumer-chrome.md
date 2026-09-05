# Chrome aplikasi konsumen — apa yang DS sediakan vs apa yang lokal

Ringkasan dari audit Suaraku & Menara (2026-09-05). Tujuan: memakai design
system secara maksimal tanpa memaksa domain aplikasi masuk ke paket.

## Sudah disediakan design system

| Kebutuhan | Komponen / pola | Sejak |
|---|---|---|
| Layout app + **toggle collapse sidebar** + menu mobile | `AppShell` (+ `AppSidebar`, `AppTopbar`) | 4.5 / toggle di `AppShell` sejak **4.6.0** |
| Kartu ber-header (ikon, aksi, ringkasan) | `SectionCard` | 4.7.0 |
| Kartu daftar tabel + footer pagination | `DataTableCard` | 4.7.0 |
| Chip filter berbasis tautan | `FilterChips` (+ `LinkButton` variant `nav`) | 4.7.0 |
| Skeleton halaman `table` / `cards` / `detail` | `PageSkeleton` | 4.7.0 |
| KPI dengan aksen | `KpiCard` + `accent` | 4.7.0 |
| Tooltip pada badge | `BadgeTooltip` | 4.7.0 |
| Aksi "lihat detail" di baris tabel | `RowDetailLink` | 4.7.0 |
| Skin kartu lembut | `Card variant="surface"` | 4.7.0 |
| Overlay konfirmasi | `ConfirmDialog` | 4.5+ |
| Overlay formulir (dialog / sheet) | `FormDialog`, `FormSheet` | Unreleased (pasca-4.7) |
| Tab sibling route (bukan Radix Tabs) | `SectionTabs`, `resolveActiveTab` | Unreleased (pasca-4.7) |
| Lonceng notifikasi (UI only) | `NotificationPopover` | Unreleased (pasca-4.7) |
| Pencarian topbar (panel + ⌘K) | `CommandSearch` (+ `CommandGroup`/`CommandItem`) | Unreleased (pasca-4.7) |
| Footer akun sidebar | `SidebarAccount` | Unreleased (pasca-4.7) |
| Persist collapse sidebar | `usePersistedCollapsed` | Unreleased (pasca-4.7) |
| Palette perintah / search building blocks | `Command` (`inline` \| `dialog`), `CommandDialog`, `Kbd` | 4.7.0 |

**Penting:** tombol collapse sidebar **tidak** ada di `AppSidebar` lagi (breaking
4.6.0). Pakai `AppShell`; jangan mengimplementasikan ulang toggle di aplikasi
kecuali Anda merakit rail sendiri tanpa `AppShell`.

## Tetap di aplikasi (kustomisasi wajar)

- Logo, `nav` groups, RBAC, `renderLink` ke router kerangka (Next.js `Link`).
- Persistensi `collapsed` di `localStorage` (pola sederhana; boleh disalin).
- Footer akun / ganti peran / keluar — data auth dan aksi milik app.
- Loncing notifikasi & pencarian global — **fetch, DTO, otorisasi** milik app;
  DS menyediakan kulit (`NotificationPopover`, `CommandSearch`) + primitif
  (`CommandGroup`, `Badge`, …).
- Hero domain (`DetailHero` bertema jabatan), insight modul dengan count-up,
  chart ECharts, animasi `motion` — sengaja tidak diangkat (lihat ADR 0002).

## Migrasi cepat dari fork lokal Menara (4.7+)

Jika app masih mengimpor salinan lokal yang namanya sama dengan pola DS:

| Lokal (contoh Menara) | Ganti dengan |
|---|---|
| `presentation/components/ui/section-card` | `SectionCard` |
| `…/data-table-card` | `DataTableCard` |
| `…/filter-chips` | `FilterChips` |
| `…/page-skeleton` | `PageSkeleton` |
| `…/badge-tooltip` | `BadgeTooltip` |
| `…/row-detail-link` | `RowDetailLink` (`asChild` + Next `Link`) |
| `…/stat-card` | `KpiCard` + `accent` |
| `…/form-dialog` / `form-drawer` | `FormDialog` / `FormSheet` |
| `…/section-tabs` | `SectionTabs` (+ `pathname` + `renderLink`) |

Upgrade dependensi ke `^4.7.0` (atau versi yang memuat `FormDialog`/`FormSheet`)
dulu; baru ganti impor. Wrapper app di atas `AppShell` (logo + footer + search)
tetap sah — itu komposisi, bukan duplikasi chrome.
