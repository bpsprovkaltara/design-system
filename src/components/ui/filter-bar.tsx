'use client'

import * as React from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface FilterOption {
  value: string
  label: string
}

/** @deprecated Prefer composable `FilterBar` with `filters` / children. */
export interface FilterBarValue {
  keyword: string
  status: string
  unitKerja: string
}

export type FilterField =
  | {
      type: 'search'
      id: string
      label: string
      value: string
      onChange: (value: string) => void
      placeholder?: string
    }
  | {
      type: 'select'
      id: string
      label: string
      value: string
      onChange: (value: string) => void
      options: FilterOption[]
      placeholder?: string
    }
  | {
      type: 'custom'
      id: string
      label?: string
      content: React.ReactNode
    }

export interface FilterBarProps {
  /** Composable filter fields. Preferred API. */
  filters?: FilterField[]
  /** Free-form filter content (alternative to `filters`). */
  children?: React.ReactNode
  onReset?: () => void
  onSubmit?: () => void
  resetLabel?: string
  className?: string
  /** Accessible name for the search landmark. */
  'aria-label'?: string
  columns?: 2 | 3 | 4

  /**
   * @deprecated Domain-locked API. Use `filters` or `DocumentFilterBar`.
   */
  value?: FilterBarValue
  /** @deprecated */
  onChange?: (value: FilterBarValue) => void
  /** @deprecated */
  statusOptions?: FilterOption[]
  /** @deprecated */
  unitKerjaOptions?: FilterOption[]
  /** @deprecated */
  keywordPlaceholder?: string
  /** @deprecated */
  keywordLabel?: string
  /** @deprecated */
  statusLabel?: string
  /** @deprecated */
  unitKerjaLabel?: string
}

const DEFAULT_STATUS_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'Semua status' },
  { value: 'draft', label: 'Draft' },
  { value: 'pending', label: 'Menunggu verifikasi' },
  { value: 'revised', label: 'Perlu revisi' },
  { value: 'approved', label: 'Disetujui' },
]

const DEFAULT_UNIT_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'Semua unit kerja' },
  { value: 'ipds', label: 'IPDS' },
  { value: 'sosial', label: 'Statistik Sosial' },
  { value: 'distribusi', label: 'Statistik Distribusi' },
  { value: 'produksi', label: 'Statistik Produksi' },
]

const columnClass: Record<2 | 3 | 4, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
}

function FilterFieldControl({ field }: { field: FilterField }) {
  if (field.type === 'custom') {
    return (
      <div className="space-y-2.5">
        {field.label ? <Label>{field.label}</Label> : null}
        {field.content}
      </div>
    )
  }

  if (field.type === 'search') {
    return (
      <div className="space-y-2.5">
        <Label htmlFor={field.id}>{field.label}</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id={field.id}
            value={field.value}
            onChange={(event) => field.onChange(event.target.value)}
            className="pl-9"
            placeholder={field.placeholder}
          />
        </div>
      </div>
    )
  }

  const triggerId = field.id
  return (
    <div className="space-y-2.5">
      <Label htmlFor={triggerId}>{field.label}</Label>
      <Select value={field.value} onValueChange={field.onChange}>
        <SelectTrigger id={triggerId}>
          <SelectValue placeholder={field.placeholder ?? field.options[0]?.label} />
        </SelectTrigger>
        <SelectContent>
          {field.options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export function FilterBar({
  filters,
  children,
  onReset,
  onSubmit,
  resetLabel = 'Reset filter',
  className,
  'aria-label': ariaLabel = 'Filter data',
  columns = 3,
  value,
  onChange,
  statusOptions = DEFAULT_STATUS_OPTIONS,
  unitKerjaOptions = DEFAULT_UNIT_OPTIONS,
  keywordPlaceholder = 'Cari judul atau nomor dokumen',
  keywordLabel = 'Pencarian',
  statusLabel = 'Status',
  unitKerjaLabel = 'Unit Kerja',
}: FilterBarProps) {
  const isLegacy = Boolean(value && onChange)
  const hasComposable = Boolean(filters?.length || children)

  const legacyFilters: FilterField[] | undefined =
    isLegacy && value && onChange
      ? [
          {
            type: 'search',
            id: 'filter-keyword',
            label: keywordLabel,
            value: value.keyword,
            onChange: (keyword) => onChange({ ...value, keyword }),
            placeholder: keywordPlaceholder,
          },
          {
            type: 'select',
            id: 'filter-status',
            label: statusLabel,
            value: value.status,
            onChange: (status) => onChange({ ...value, status }),
            options: statusOptions,
          },
          {
            type: 'select',
            id: 'filter-unit',
            label: unitKerjaLabel,
            value: value.unitKerja,
            onChange: (unitKerja) => onChange({ ...value, unitKerja }),
            options: unitKerjaOptions,
          },
        ]
      : undefined

  const resolvedFilters = filters ?? legacyFilters
  const resetHandler = onReset

  return (
    <form
      className={cn('rounded-lg border bg-card p-4', className)}
      role="search"
      aria-label={ariaLabel}
      data-slot="filter-bar"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit?.()
      }}
    >
      {resolvedFilters ? (
        <div className={cn('grid gap-4', columnClass[columns])}>
          {resolvedFilters.map((field) => (
            <FilterFieldControl key={field.id} field={field} />
          ))}
        </div>
      ) : null}
      {children && !resolvedFilters ? <div className="grid gap-4">{children}</div> : null}
      {children && resolvedFilters ? <div className="mt-4">{children}</div> : null}
      {resetHandler ? (
        <div className="mt-4 flex justify-end">
          <Button type="button" variant="outline" onClick={resetHandler}>
            {resetLabel}
          </Button>
        </div>
      ) : null}
      {!hasComposable && !isLegacy ? (
        <p className="text-sm text-muted-foreground">
          Sediakan `filters`, `children`, atau API legacy `value`/`onChange`.
        </p>
      ) : null}
    </form>
  )
}

/** Domain preset: keyword + status + unit kerja (BPS document workflow). */
export interface DocumentFilterBarProps {
  value: FilterBarValue
  onChange: (value: FilterBarValue) => void
  onReset: () => void
  statusOptions?: FilterOption[]
  unitKerjaOptions?: FilterOption[]
  keywordPlaceholder?: string
  keywordLabel?: string
  statusLabel?: string
  unitKerjaLabel?: string
  resetLabel?: string
  className?: string
}

export function DocumentFilterBar({
  value,
  onChange,
  onReset,
  statusOptions,
  unitKerjaOptions,
  keywordPlaceholder,
  keywordLabel,
  statusLabel,
  unitKerjaLabel,
  resetLabel,
  className,
}: DocumentFilterBarProps) {
  return (
    <FilterBar
      className={className}
      value={value}
      onChange={onChange}
      onReset={onReset}
      statusOptions={statusOptions}
      unitKerjaOptions={unitKerjaOptions}
      keywordPlaceholder={keywordPlaceholder}
      keywordLabel={keywordLabel}
      statusLabel={statusLabel}
      unitKerjaLabel={unitKerjaLabel}
      resetLabel={resetLabel}
    />
  )
}
