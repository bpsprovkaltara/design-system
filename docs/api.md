# Library API

`@bpsprovkaltara/design-system` is a React component library, not a REST API service. This document covers the component and hook API exposed from `src/index.ts`.

---

## Installation and import

```bash
pnpm add @bpsprovkaltara/design-system
```

```ts
// Styles — import once at app root
import '@bpsprovkaltara/design-system/styles.css'

// Components and hooks
import { Button, DataTable, useToast } from '@bpsprovkaltara/design-system'
```

---

## Primitive components (shadcn/ui based)

These are standard shadcn/ui components (new-york style) with BPS token theming applied. Their APIs follow the shadcn/ui documentation exactly.

`Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`
`Alert`, `AlertTitle`, `AlertDescription`
`Avatar`, `AvatarImage`, `AvatarFallback`, `AvatarGroup`
`Badge`
`Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`
`Button`, `buttonVariants` — type: `ButtonProps`
`Calendar`
`Card`, `CardHeader`, `CardFooter`, `CardTitle`, `CardDescription`, `CardContent`
`Checkbox`
`Command`, `CommandDialog`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandShortcut`, `CommandSeparator`
`Dialog`, `DialogPortal`, `DialogOverlay`, `DialogTrigger`, `DialogClose`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`
`DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuGroup`, `DropdownMenuPortal`, `DropdownMenuSub`, `DropdownMenuSubContent`, `DropdownMenuSubTrigger`, `DropdownMenuRadioGroup`
`Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`, `useFormField`
`Input`
`Label`
`Pagination`, `PaginationContent`, `PaginationEllipsis`, `PaginationItem`, `PaginationLink`, `PaginationNext`, `PaginationPrevious`
`Popover`, `PopoverTrigger`, `PopoverContent`
`Progress`
`RadioGroup`, `RadioGroupItem`
`ScrollArea`, `ScrollBar`
`Select`, `SelectGroup`, `SelectValue`, `SelectTrigger`, `SelectContent`, `SelectLabel`, `SelectItem`, `SelectSeparator`, `SelectScrollUpButton`, `SelectScrollDownButton`
`Separator`
`Sheet`, `SheetPortal`, `SheetOverlay`, `SheetTrigger`, `SheetClose`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription`
`Skeleton`
`Slider`
`Spinner`
`Switch`
`Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableHead`, `TableRow`, `TableCell`, `TableCaption`
`Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`
`Textarea`
`Toast`, `ToastAction`, `ToastClose`, `ToastDescription`, `ToastProvider`, `ToastTitle`, `ToastViewport`
`Toaster`
`Tooltip`, `TooltipContent`, `TooltipProvider`, `TooltipTrigger`

---

## StatusBadge

Displays a workflow status as a styled badge.

```tsx
import { StatusBadge } from '@bpsprovkaltara/design-system'

<StatusBadge variant="approved">Disetujui</StatusBadge>
```

| Prop | Type | Required | Description |
|---|---|---|---|
| `variant` | `'default' \| 'secondary' \| 'destructive' \| 'outline' \| 'draft' \| 'pending' \| 'revised' \| 'approved'` | No | Visual variant (`default` jika dihilangkan) |
| `children` | `ReactNode` | Yes | Teks status yang ditampilkan |
| `className` | `string` | No | Kelas tambahan |
---

## PerformanceCard

KPI performance card with optional sparkline trend, delta badge, and target percentage.

```tsx
import { PerformanceCard } from '@bpsprovkaltara/design-system'
import { Users } from 'lucide-react'

<PerformanceCard
  title="Jumlah Penduduk"
  value={694000}
  unit="jiwa"
  target={700000}
  delta={{ value: 2.4, direction: 'up', period: 'vs tahun lalu' }}
  trend={[640000, 655000, 670000, 682000, 694000]}
  icon={Users}
  variant="gradient"
/>
```

### PerformanceCardProps

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `title` | `string` | Yes | — | Card label, rendered as uppercase tracking-wider |
| `value` | `string \| number` | Yes | — | Primary metric. Numbers formatted with `id-ID` locale |
| `unit` | `string` | No | — | Unit label shown after the value (e.g. `"jiwa"`, `"%"`) |
| `target` | `number` | No | — | Target value. When provided alongside a numeric `value`, renders a target percentage line |
| `delta` | `{ value: number; direction: 'up' \| 'down'; period: string }` | No | — | Period-over-period change badge |
| `trend` | `number[]` | No | — | Array of 2+ data points rendered as a sparkline SVG |
| `icon` | `LucideIcon` | No | — | Lucide icon component rendered in the card header |
| `variant` | `'default' \| 'glass' \| 'backdrop-blur' \| 'gradient'` | No | `'default'` | Visual style variant |
| `loading` | `boolean` | No | `false` | Renders skeleton placeholders instead of content |
| `className` | `string` | No | — | Additional Tailwind classes passed to the card root |

---

## Combobox

Searchable select built on Popover + Command (cmdk).

```tsx
import { Combobox } from '@bpsprovkaltara/design-system'

<Combobox
  options={[
    { value: 'tarakan', label: 'Kota Tarakan' },
    { value: 'nunukan', label: 'Kab. Nunukan' },
  ]}
  value={value}
  onChange={setValue}
  placeholder="Pilih wilayah..."
  searchPlaceholder="Cari..."
  emptyText="Tidak ditemukan."
/>
```

### ComboboxProps

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `options` | `{ value: string; label: string }[]` | Yes | — | Daftar opsi yang dapat dicari |
| `value` | `string` | No | — | Nilai terkontrol |
| `onChange` | `(value: string) => void` | No | — | Dipanggil saat opsi dipilih (klik ulang opsi yang sama mengosongkan) |
| `placeholder` | `string` | No | `'Pilih item...'` | Teks trigger saat kosong |
| `searchPlaceholder` | `string` | No | `'Cari...'` | Placeholder di `CommandInput` |
| `emptyText` | `string` | No | `'Tidak ditemukan.'` | Teks saat hasil pencarian kosong |
| `className` | `string` | No | — | Kelas tambahan pada trigger |
| `disabled` | `boolean` | No | `false` | Nonaktifkan kontrol |

---

## DataTable

Tabel data ringan (bukan `@tanstack/react-table`). Mendukung render sel kustom, aksi baris opsional, sorting kolom client-side, dan pagination client-side.

```tsx
import { DataTable, Button } from '@bpsprovkaltara/design-system'

<DataTable
  data={rows}
  columns={[
    { key: 'nama', label: 'Nama', sortable: true },
    { key: 'nilai', label: 'Nilai', sortable: true },
  ]}
  pageSize={10}
  getRowKey={(row) => row.id}
  renderRowActions={(row) => (
    <Button size="sm" variant="ghost" onClick={() => edit(row)}>
      Edit
    </Button>
  )}
/>
```

### DataTableProps

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `data` | `T[]` | Yes | — | Baris data (`T extends Record<string, unknown>`) |
| `columns` | `DataTableColumn<T>[]` | Yes | — | Definisi kolom (`key`, `label`, `getValue?`, `render?`, `sortable?`) |
| `renderRowActions` | `(row: T, index: number) => ReactNode` | No | — | Jika diisi, menampilkan kolom aksi |
| `actionsLabel` | `string` | No | `'Aksi'` | Label header kolom aksi |
| `getRowKey` | `(row: T, index: number) => string \| number` | No | index | Kunci React per baris |
| `pageSize` | `number` | No | — | Jika diisi, mengaktifkan pagination client-side |

Tidak ada column visibility toggle dan tidak ada server-side pagination bawaan. Untuk kontrol penuh, gunakan primitif `Table`.

---

## Essential UI

Additional primitives for common application screens:

```tsx
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionListItem,
  DescriptionTerm,
  FileUpload,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
} from '@bpsprovkaltara/design-system'
```

- `Toggle` renders a controlled or uncontrolled pressed button.
- `ToggleGroup` and `ToggleGroupItem` support single or multiple selection for compact toolbars.
- `DescriptionList` renders key/value metadata in detail pages.
- `FileUpload` wraps a native file input with drag-and-drop styling and selected-file preview.

---

## EmptyState

Pattern component for empty, no-results, and error states.

```tsx
import { EmptyState } from '@bpsprovkaltara/design-system'

<EmptyState
  illustration="search"
  title="Tidak ada hasil"
  description="Coba ubah kata kunci pencarian."
  action={{ label: 'Reset filter', onClick: handleReset }}
/>
```

### EmptyStateProps

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `illustration` | `'empty' \| 'search' \| 'error' \| ReactNode` | No | `'empty'` | Built-in illustration key or a custom React node |
| `title` | `string` | Yes | — | Main heading text |
| `description` | `string` | No | — | Supporting description below the title |
| `action` | `{ label: string; onClick: () => void; variant?: 'default' \| 'outline' \| 'ghost' }` | No | — | Primary action button |
| `secondaryAction` | `{ label: string; onClick: () => void }` | No | — | Secondary ghost button |
| `compact` | `boolean` | No | `false` | Reduces padding and illustration size for use inside panels |
| `className` | `string` | No | — | Additional classes on the wrapper |

---

## YearSelect / NumberField / MapLegend / SkipLink (4.4.0)

```tsx
import {
  YearSelect,
  NumberField,
  MapLegend,
  SkipLink,
} from '@bpsprovkaltara/design-system'

<YearSelect value={2025} onChange={setYear} fromYear={2018} toYear={2026} />
<NumberField label="PDRB" value={pdrb} onChange={setPdrb} unit="Miliar" />
<MapLegend />
<SkipLink href="#main-content" />
```

- **`YearSelect`**: daftar tahun descending; props `fromYear` / `toYear` / `label`.
- **`NumberField`**: format tampilan `id-ID`; parse titik ribuan saat blur; `unit` opsional.
- **`MapLegend`**: legenda `map-tier-0`…`5` + `active`; `orientation` `vertical` | `horizontal`.
- **`SkipLink`**: tautan fokus keyboard ke `#main-content` (default).

---

## useToast

Hook for triggering toast notifications. Requires `<Toaster />` in the component tree.

```tsx
import { useToast, Toaster } from '@bpsprovkaltara/design-system'

// In app root:
<Toaster />

// In any component:
const { toast } = useToast()

toast({
  title: 'Data berhasil disimpan',
  description: 'Perubahan telah tersimpan.',
})
```

---

## Stylesheet

```ts
import '@bpsprovkaltara/design-system/styles.css'
```

The stylesheet registers design token CSS variables, Tailwind 4 `@theme` values, custom utilities, `tailwindcss-animate`, and keyframes such as `animate-shimmer`. The `tailwind-preset` export is deprecated and only kept as a compatibility shim.

---

## Utility

```ts
import { cn } from '@bpsprovkaltara/design-system'

// Merges Tailwind classes with conflict resolution (tailwind-merge + clsx)
cn('px-4 py-2', isActive && 'bg-primary text-primary-foreground')
```
