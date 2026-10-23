import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  type PaginationLinkRenderProps,
} from '@/components/ui/pagination'

export interface TablePaginationProps {
  /** 1-based halaman aktif. */
  page: number
  pageSize: number
  total: number
  /** Client-side: dipanggil saat halaman berganti. */
  onPageChange?: (page: number) => void
  /** SSR/link mode: hasilkan href per halaman (Next.js, TanStack Router, dll). */
  hrefForPage?: (page: number) => string
  /** Render framework link kustom, diteruskan ke PaginationLink. */
  renderLink?: (props: PaginationLinkRenderProps) => React.ReactNode
  hideWhenSinglePage?: boolean
  className?: string
}

function buildPageWindow(page: number, totalPages: number) {
  const start = Math.max(1, page - 2)
  const end = Math.min(totalPages, page + 2)
  const pages: number[] = []
  for (let i = start; i <= end; i += 1) pages.push(i)
  return pages
}

/**
 * Footer tabel: info jumlah baris di kiri, kontrol halaman rata kanan.
 * Mendukung mode client-side (`onPageChange`) maupun SSR/link (`hrefForPage` /
 * `renderLink`). Pagination internal sudah di-override `w-auto justify-end` —
 * konsumen tidak perlu override style sendiri.
 */
export function TablePagination({
  page,
  pageSize,
  total,
  onPageChange,
  hrefForPage,
  renderLink,
  hideWhenSinglePage = false,
  className,
}: TablePaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)
  const pages = buildPageWindow(page, totalPages)

  if (hideWhenSinglePage && totalPages <= 1) return null

  const linkProps = (target: number) => ({
    href: hrefForPage ? hrefForPage(target) : '#',
    onClick: onPageChange
      ? (event: React.MouseEvent) => {
          event.preventDefault()
          onPageChange(target)
        }
      : undefined,
  })
  const prevDisabled = page <= 1
  const nextDisabled = page >= totalPages
  // <a> tanpa href tidak bisa difokus atau diaktifkan; renderLink tidak dipakai untuk kontrol mati.
  const inertProps = { 'aria-disabled': true, tabIndex: -1 } as const

  return (
    <div className={cn('flex flex-wrap items-center justify-between gap-3 pt-3', className)}>
      <p className="text-sm text-muted-foreground" aria-live="polite">
        Menampilkan {from}–{to} dari {total}
      </p>
      {totalPages > 1 ? (
        <Pagination className="mx-0 w-auto justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                {...(prevDisabled ? inertProps : { ...linkProps(page - 1), renderLink })}
                className={cn(prevDisabled && 'pointer-events-none opacity-50')}
              />
            </PaginationItem>
            {pages.map((n) => (
              <PaginationItem key={n}>
                <PaginationLink {...linkProps(n)} renderLink={renderLink} isActive={n === page}>
                  {n}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                {...(nextDisabled ? inertProps : { ...linkProps(page + 1), renderLink })}
                className={cn(nextDisabled && 'pointer-events-none opacity-50')}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) : null}
    </div>
  )
}
