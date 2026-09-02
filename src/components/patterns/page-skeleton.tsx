import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

export type PageSkeletonVariant = 'table' | 'cards' | 'detail'

export interface PageSkeletonProps {
  variant: PageSkeletonVariant
  /** Jumlah baris skeleton tabel (default 5). */
  rows?: number
  /** Jumlah kolom skeleton tabel (default 4). */
  cols?: number
  className?: string
}

function HeaderSkeleton() {
  return (
    <div className="space-y-2" data-slot="page-skeleton-header">
      <Skeleton className="h-7 w-48" />
      <Skeleton className="h-4 w-72 max-w-full" />
    </div>
  )
}

function ToolbarSkeleton() {
  return (
    <div className="flex flex-wrap gap-3" data-slot="page-skeleton-toolbar">
      <Skeleton className="h-9 w-56 max-w-full" />
      <Skeleton className="h-9 w-36" />
      <Skeleton className="h-9 w-28" />
    </div>
  )
}

function TableSkeleton({ rows, cols }: { rows: number; cols: number }) {
  return (
    <div
      className="space-y-2 rounded-xl border border-border-subtle p-4"
      data-slot="page-skeleton-table"
    >
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={`h-${i}`} className="h-4 w-full" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div
          key={`r-${r}`}
          className="grid gap-3"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={`c-${r}-${c}`} className="h-8 w-full" />
          ))}
        </div>
      ))}
    </div>
  )
}

function PaginationSkeleton() {
  return (
    <div className="flex justify-between gap-3" data-slot="page-skeleton-pagination">
      <Skeleton className="h-9 w-40" />
      <Skeleton className="h-9 w-56 max-w-full" />
    </div>
  )
}

function HeroSkeleton() {
  return (
    <div
      className="space-y-3 rounded-2xl border border-border-subtle p-6"
      data-slot="page-skeleton-hero"
    >
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-4 w-64 max-w-full" />
    </div>
  )
}

/**
 * Pola skeleton halaman lengkap di atas primitif `Skeleton`.
 */
export function PageSkeleton({ variant, rows = 5, cols = 4, className }: PageSkeletonProps) {
  return (
    <div
      className={cn('space-y-6', className)}
      data-slot="page-skeleton"
      data-variant={variant}
      aria-busy="true"
      aria-label="Memuat halaman..."
    >
      {variant === 'table' ? (
        <>
          <HeaderSkeleton />
          <ToolbarSkeleton />
          <TableSkeleton rows={rows} cols={cols} />
          <PaginationSkeleton />
        </>
      ) : null}
      {variant === 'cards' ? (
        <>
          <HeaderSkeleton />
          <HeroSkeleton />
          <div className="grid gap-4 md:grid-cols-2" data-slot="page-skeleton-grid">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-36 w-full rounded-2xl" />
            ))}
          </div>
          <TableSkeleton rows={3} cols={3} />
        </>
      ) : null}
      {variant === 'detail' ? (
        <>
          <HeroSkeleton />
          <div className="grid gap-4 md:grid-cols-3" data-slot="page-skeleton-summary">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))}
          </div>
          <div className="space-y-3" data-slot="page-skeleton-list">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}
