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

<StatusBadge variant="approved" />
```

| Prop | Type | Required | Description |
|---|---|---|---|
| `variant` | `'draft' \| 'pending' \| 'revised' \| 'approved'` | Yes | Visual and semantic status variant |

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

> [!todo] Need input from team: full props table for `Combobox` — review `src/components/ui/combobox.tsx` and document `options`, `value`, `onChange`, `placeholder`, `searchPlaceholder`, `emptyText`, and any async-loading props.

---

## DataTable

Data table with column sorting, pagination, and column visibility toggle. Built on `@tanstack/react-table`.

> [!todo] Need input from team: full props table for `DataTable` — document `columns`, `data`, `pageSize`, `onRowClick`, and any server-side pagination props from `src/components/ui/data-table.tsx`.

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
