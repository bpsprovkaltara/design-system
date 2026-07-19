'use client'

import * as React from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { EmptyState } from '@/components/patterns/empty-state'

export interface DataTableColumn<T extends Record<string, unknown>> {
  key: string
  label: string
  getValue?: (row: T) => unknown
  render?: {
    bivarianceHack: (val: unknown, row: T) => React.ReactNode
  }['bivarianceHack']
  sortable?: boolean
}

export interface DataTablePagination {
  /** Zero-based page index. */
  page: number
  pageSize: number
  /** Total row count across all pages (server mode). */
  total: number
  onPageChange: (page: number) => void
}

export interface DataTableProps<T extends Record<string, unknown>>
  extends React.HTMLAttributes<HTMLDivElement> {
  data: T[]
  columns: DataTableColumn<T>[]
  /** Optional row actions cell. When omitted, no Aksi column is rendered. */
  renderRowActions?: (row: T, index: number) => React.ReactNode
  actionsLabel?: string
  getRowKey?: (row: T, index: number) => string | number
  /**
   * When set (and `pagination` is omitted), enables client-side pagination.
   * Prefer `pagination` for server-driven lists.
   */
  pageSize?: number
  /** Controlled / server pagination. */
  pagination?: DataTablePagination
  /** Loading overlay / skeleton state. */
  loading?: boolean
  loadingLabel?: string
  /** Error state replaces the table body. */
  error?: boolean
  errorTitle?: string
  errorDescription?: string
  onRetry?: () => void
  /** Empty state when `data` is empty and not loading/error. */
  emptyTitle?: string
  emptyDescription?: string
  emptyAction?: {
    label: string
    onClick: () => void
  }
}

type SortDirection = 'asc' | 'desc'

function compareValues(a: unknown, b: unknown): number {
  if (a == null && b == null) return 0
  if (a == null) return -1
  if (b == null) return 1
  if (typeof a === 'number' && typeof b === 'number') return a - b
  return String(a).localeCompare(String(b), 'id', { numeric: true, sensitivity: 'base' })
}

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  className,
  renderRowActions,
  actionsLabel = 'Aksi',
  getRowKey,
  pageSize,
  pagination,
  loading = false,
  loadingLabel = 'Memuat data...',
  error = false,
  errorTitle = 'Data gagal dimuat',
  errorDescription = 'Terjadi gangguan saat mengambil data. Silakan coba kembali.',
  onRetry,
  emptyTitle = 'Belum ada data',
  emptyDescription = 'Ubah filter atau tambah data baru untuk mulai mengisi tabel.',
  emptyAction,
  ...props
}: DataTableProps<T>) {
  const showActions = Boolean(renderRowActions)
  const [sortKey, setSortKey] = React.useState<string | null>(null)
  const [sortDirection, setSortDirection] = React.useState<SortDirection>('asc')
  const [clientPage, setClientPage] = React.useState(0)

  const isServerPaginated = Boolean(pagination)
  const effectivePageSize = pagination?.pageSize ?? pageSize

  React.useEffect(() => {
    setClientPage(0)
  }, [data, sortKey, sortDirection, pageSize])

  const sortedData = React.useMemo(() => {
    if (isServerPaginated || !sortKey) return data
    const column = columns.find((col) => col.key === sortKey)
    if (!column) return data
    const next = [...data]
    next.sort((rowA, rowB) => {
      const valueA = column.getValue ? column.getValue(rowA) : rowA[column.key as keyof T]
      const valueB = column.getValue ? column.getValue(rowB) : rowB[column.key as keyof T]
      const result = compareValues(valueA, valueB)
      return sortDirection === 'asc' ? result : -result
    })
    return next
  }, [columns, data, isServerPaginated, sortDirection, sortKey])

  const totalCount = pagination?.total ?? sortedData.length
  const currentPage = pagination?.page ?? clientPage
  const pageCount =
    effectivePageSize && effectivePageSize > 0
      ? Math.max(1, Math.ceil(totalCount / effectivePageSize))
      : 1
  const safePage = Math.min(currentPage, pageCount - 1)

  const visibleData =
    !isServerPaginated && effectivePageSize && effectivePageSize > 0
      ? sortedData.slice(safePage * effectivePageSize, safePage * effectivePageSize + effectivePageSize)
      : sortedData

  const handleSort = (key: string) => {
    if (isServerPaginated) return
    if (sortKey === key) {
      setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'))
      return
    }
    setSortKey(key)
    setSortDirection('asc')
  }

  const setPage = (page: number) => {
    if (pagination) {
      pagination.onPageChange(page)
    } else {
      setClientPage(page)
    }
  }

  const rangeStart =
    totalCount === 0 ? 0 : safePage * (effectivePageSize ?? totalCount) + 1
  const rangeEnd = effectivePageSize
    ? Math.min(totalCount, (safePage + 1) * effectivePageSize)
    : totalCount

  const showPager = Boolean(effectivePageSize && effectivePageSize > 0)

  if (error) {
    return (
      <div
        className={cn(
          'w-full rounded-lg border border-feedback-danger/30 bg-feedback-danger-bg',
          className
        )}
        {...props}
      >
        <EmptyState
          illustration="error"
          title={errorTitle}
          description={errorDescription}
          compact
          action={
            onRetry
              ? { label: 'Coba lagi', onClick: onRetry, variant: 'outline' }
              : undefined
          }
        />
      </div>
    )
  }

  if (!loading && data.length === 0) {
    return (
      <div className={cn('w-full rounded-lg border border-dashed bg-muted/30', className)} {...props}>
        <EmptyState
          illustration="empty"
          title={emptyTitle}
          description={emptyDescription}
          compact
          action={emptyAction}
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative w-full overflow-auto rounded-lg border border-border bg-background shadow-sm',
        className
      )}
      data-slot="data-table"
      {...props}
    >
      {loading ? (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center gap-2 bg-background/70 text-sm text-muted-foreground"
          role="status"
          aria-live="polite"
        >
          <Spinner className="h-4 w-4" />
          {loadingLabel}
        </div>
      ) : null}

      <table className="w-full caption-bottom border-collapse text-sm">
        <thead className="border-b-2 border-border bg-muted/50">
          <tr className="transition-colors">
            {columns.map((col) => {
              const isSorted = sortKey === col.key
              const canSort = Boolean(col.sortable) && !isServerPaginated
              return (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={
                    canSort
                      ? isSorted
                        ? sortDirection === 'asc'
                          ? 'ascending'
                          : 'descending'
                        : 'none'
                      : undefined
                  }
                  className="h-12 px-4 text-left align-middle text-sm font-semibold text-muted-foreground"
                >
                  {canSort ? (
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 hover:text-foreground"
                      onClick={() => handleSort(col.key)}
                    >
                      {col.label}
                      {isSorted ? (
                        sortDirection === 'asc' ? (
                          <ArrowUp className="size-3.5" aria-hidden="true" />
                        ) : (
                          <ArrowDown className="size-3.5" aria-hidden="true" />
                        )
                      ) : (
                        <ArrowUpDown className="size-3.5 opacity-50" aria-hidden="true" />
                      )}
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              )
            })}
            {showActions && (
              <th
                scope="col"
                className="h-12 px-4 text-right align-middle text-sm font-semibold text-muted-foreground"
              >
                {actionsLabel}
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-background [&_tr:last-child]:border-0">
          {visibleData.map((row, i) => {
            const absoluteIndex = effectivePageSize ? safePage * effectivePageSize + i : i
            return (
              <tr
                key={getRowKey ? getRowKey(row, absoluteIndex) : absoluteIndex}
                className="border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              >
                {columns.map((col) => {
                  const value = col.getValue ? col.getValue(row) : row[col.key as keyof T]

                  return (
                    <td key={col.key} className="p-4 align-middle font-medium text-foreground">
                      {col.render ? col.render(value, row) : String(value ?? '-')}
                    </td>
                  )
                })}
                {showActions && (
                  <td className="p-4 align-middle text-right">
                    {renderRowActions!(row, absoluteIndex)}
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>

      {showPager ? (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            Menampilkan {rangeStart}–{rangeEnd} dari {totalCount}
          </p>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={safePage <= 0 || loading}
              onClick={() => setPage(Math.max(0, safePage - 1))}
            >
              Sebelumnya
            </Button>
            <span className="text-sm text-muted-foreground">
              Halaman {safePage + 1} / {pageCount}
            </span>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={safePage >= pageCount - 1 || loading}
              onClick={() => setPage(Math.min(pageCount - 1, safePage + 1))}
            >
              Berikutnya
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
