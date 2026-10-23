# API Library BPS Kaltara

## Kontrak paket

Library React privat, versi manifest 4.8.1. API publik ditentukan `src/index.ts` dan `package.json#exports`; props aktual berasal dari declarations/source pada versi yang dipasang. Dokumen ini memakai struktur API library; autentikasi HTTP/health endpoint tidak menjadi kontrak paket.

| Entry/subpath | Isi |
|---|---|
| root | `dist/index.js` ESM, `index.cjs` CJS, `index.d.ts` types; barrel memuat CSS all-in-one |
| `components/ui/*` | Module UI ESM/CJS/types |
| `patterns/*` | Module patterns ESM/CJS/types |
| `hooks/*` | Hooks ESM/CJS/types |
| `utils` | cn dan utility murni RSC-safe |
| `styles.css` | CSS compiled dengan preflight |
| `tokens.css` | CSS source tokens/utilities tanpa preflight |
| `fonts.css` | Google Fonts CDN opt-in |
| `tailwind-preset` | Shim kosong deprecated |
| `package.json` | Metadata paket |

Subpath tidak menjamin CSS ikut. Impor CSS sekali; non-Tailwind pilih styles.css; Tailwind 4 pilih tokens.css sesudah @import tailwindcss dan @source dist paket. Jangan memasang kedua entry CSS sekaligus. Font produksi disediakan konsumen.

Peer wajib: React/ReactDOM >=19 dan Tailwind >=4. Form memakai optional peers react-hook-form ^7, zod ^4 dan @hookform/resolvers ^5; konsumen yang tidak memakai Form tidak wajib memasangnya. Setup registry di [README](../README.md#mulai-cepat).

## Primitive dan ekspor

Primitive beserta subkomponen tersedia melalui barrel: Accordion, Alert, Avatar/AvatarGroup, Badge/BadgeTooltip, Breadcrumb, Button/buttonVariants/LinkButton, Calendar, Carousel, Card/cardVariants, Checkbox/CheckboxInput, Command/CommandDialog/Kbd, Dialog, DropdownMenu, Drawer, DescriptionList, FileUpload, Form/useFormField, Input, Label, NavigationMenu, Pagination, Popover, Progress, RadioGroup, ScrollArea, Select/SelectInput, Separator, Sheet, Skeleton, Slider, Spinner, StatusBadge, Switch, Table, Tabs, Textarea, Toggle/ToggleGroup, Toast/Toaster, Tooltip.

Source dimiliki repo; ada extension lokal sehingga jangan menganggap API sama persis dokumentasi upstream shadcn. Props/types yang diekspor eksplisit tercatat pada `src/index.ts`; declarations diproduksi build:lib.

## Komponen dan props utama

| Komponen | Kontrak utama |
|---|---|
| AppShell | groups wajib dan children; activeId; collapsed/defaultCollapsed/onCollapsedChange; onNavigate/renderLink; logo/collapsedLogo; sidebarFooter/mobileSidebarFooter; desktopBreakpoint md/lg; topbarStart/topbarEnd/appTitle; className/mainClassName |
| AppSidebar/AppTopbar | Primitive chrome untuk komposisi shell; consumer adapter mengendalikan route |
| FormSheet | title dan children wajib; description, trigger, open/onOpenChange, footer, className, side right/left (default right). children/footer boleh fungsi yang menerima close; lebar via className, tidak ada prop style khusus |
| FormDialog | Overlay form berbasis dialog; lihat FormDialogProps. Controlled/uncontrolled; children boleh fungsi yang menerima `close()`; tanpa slot footer — footer hanya di FormSheet |
| CommandSearch | value/defaultValue/onValueChange; open/onOpenChange; placeholder/label; loading/loadingLabel/emptyLabel; enableShortcut default true (Ctrl/⌘K); children hasil pencarian; className/panelClassName/inputClassName |
| DataStatePanel | state loading/error/empty/ready; title/description/onRetry/children. ready merender children; fetching tetap di app |
| FilterBar | filters: FilterField[] atau children; onReset/onSubmit/resetLabel, columns 2/3/4, aria-label, variant default/surface. FilterField search/select/custom; API keyword/status/unitKerja lama deprecated |
| DocumentFilterBar | Preset domain kompatibilitas: value/onChange/onReset dan opsi status/unit |
| SectionTabs | tabs, label, pathname wajib; renderLink/className. SectionTab href/label/matchPrefixes; resolveActiveTab memilih prefix terpanjang. Ini navigasi sibling route; Tabs untuk panel dalam halaman |
| NotificationPopover/SidebarAccount | Presentasi notifikasi/account dan slots; data, auth, unread persistence tetap di app |
| ThemeToggle/useTheme | Preferensi tema konsumen; tipe ThemeMode/ThemeToggleProps |
| ConfirmDialog/ConfirmActionDialog | Konfirmasi generik/kompatibilitas; lihat tipe masing-masing |
| BulkActionBar | Selection dan actions generik dari BulkActionBarProps/BulkAction |
| FormSection/ValidationSummary | Komposisi section/summary form |
| PageHeader/KpiCard/PerformanceCard | Heading/metric; KpiAccent dan PerformanceCardProps tersedia |
| ProgressAudit/ReviewTimeline | Presentasi audit/timeline dari input konsumen |
| DatePicker/DateInput/DateRangePicker | Tanggal dan adapter input |
| YearSelect/NumberField | Tahun descending dan angka format id-ID; NumberField dapat menampilkan unit |
| MapLegend/SkipLink | Skala map-tier; skip link ke main-content default |
| TableEmpty/TablePagination | State tabel dan kontrol pagination terpisah |
| RowDetailLink | Tautan detail row; adapter asChild untuk link framework |
| Sparkline/BarChart | Chart ringan dari data props, tipe item diekspor |
| Stepper | Step/StepStatus, onStepClick dan stepErrors untuk workflow |

`StatusBadge` menerima children sebagai teks dan variant default/secondary/destructive/outline/draft/pending/revised/approved; default bila tidak diisi. `Combobox` memakai options value/label, value/onChange, placeholder/searchPlaceholder/emptyText, className/disabled; menekan ulang opsi aktif dapat mengosongkan nilai.

`PerformanceCard`: title/value wajib; unit, target, delta (value/direction/period), trend, icon, variant default/glass/backdrop-blur/gradient, loading dan className. Angka numeric memakai id-ID. `FileUpload` membungkus input file native; validasi dan upload server tetap di aplikasi.

## DataTable

`DataTable<T extends Record<string, unknown>>` menerima data dan columns wajib. Kolom: key/label/getValue/render/sortable. Row actions opsional melalui renderRowActions(row,index), actionsLabel; getRowKey menjaga key stabil. Sorting client-side menggunakan nilai kolom, locale Indonesia/numeric untuk teks.

`pageSize` tanpa `pagination` mengaktifkan pagination client-side. `pagination: { page, pageSize, total, onPageChange }` mengendalikan/server pagination; page zero-based, fetch dan total berasal dari aplikasi. loading/loadingLabel; error/errorTitle/errorDescription/onRetry; emptyTitle/emptyDescription/emptyAction mengatur state. Tidak ada column visibility toggle; primitive Table memberi kontrol markup penuh.

```tsx
import { DataTable } from '@bpsprovkaltara/design-system'

<DataTable
  data={rows}
  columns={[{ key: 'nama', label: 'Nama', sortable: true }]}
  getRowKey={(row) => String(row.id)}
  pagination={{ page, pageSize: 20, total, onPageChange: setPage }}
  loading={loading}
  error={error}
  onRetry={refetch}
/>
```

## Patterns dan hooks

Patterns: EmptyState, SectionCard, DataTableCard, FilterChips, SectionTabs/resolveActiveTab, PageSkeleton beserta props/types. EmptyState title wajib; illustration empty/search/error atau ReactNode, description, action/secondaryAction, compact, className. FilterChips dapat renderLink; aplikasi tetap menentukan href dan navigasi.

Hooks: useToast (pasang Toaster pada tree), usePersistedCollapsed; useTheme diekspor dari komponen theme-toggle. `cn` menggabungkan clsx dan tailwind-merge.

## Boundary client dan navigasi

Directive use client dipertahankan per modul melalui preserveModules. Hooks/interaksi memerlukan boundary client konsumen RSC; import utils/subpath murni sesuai kebutuhan. Jangan memperlakukan seluruh barrel sebagai bukti bahwa semua ekspor server-safe.

Navigasi framework lewat asChild/renderLink (AppShell/AppSidebar, SectionTabs, FilterChips, TablePagination dan primitive terkait); tidak ada dependency Next.js dalam library. `CommandDialog` menyediakan title/description aksesibel dan commandProps (misalnya shouldFilter false untuk pencarian server). Fokus/label/semantic HTML harus dipertahankan.

## Referensi

- [Arsitektur](architecture.md), [DESIGN](../DESIGN.md), [consumer chrome](consumer-chrome.md), [guide](guide.md), [upgrading](upgrading.md).
- [Public barrel](../src/index.ts), [manifest exports](../package.json), [library build](../vite.lib.config.ts).
