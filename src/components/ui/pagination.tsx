import * as React from 'react'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import type { VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button-variants'

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex flex-row items-center gap-1', className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />
}

/** Props handed to a custom `renderLink` — spread directly onto the consumer's Link. */
export type PaginationLinkRenderProps = React.ComponentProps<'a'> & {
  isActive?: boolean
}

type PaginationLinkProps = {
  isActive?: boolean
  /**
   * Render a framework link (Next.js `Link`, TanStack Router `Link`, dll) instead of
   * a plain `<a>`. Menerima props sudah lengkap (className tombol, href, onClick,
   * aria-current, isActive) — cukup di-spread ke komponen Link milik konsumen.
   */
  renderLink?: (props: PaginationLinkRenderProps) => React.ReactNode
} & Pick<VariantProps<typeof buttonVariants>, 'size'> &
  React.ComponentProps<'a'>

function PaginationLink({
  className,
  isActive,
  size = 'icon',
  renderLink,
  ...props
}: PaginationLinkProps) {
  const linkClassName = cn(
    buttonVariants({
      variant: isActive ? 'outline' : 'ghost',
      size,
    }),
    className
  )

  if (renderLink) {
    return <>{renderLink({ ...props, isActive, className: linkClassName })}</>
  }

  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={linkClassName}
      {...props}
    />
  )
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Halaman sebelumnya"
      size="default"
      className={cn('gap-1 px-2.5 sm:pl-2.5', className)}
      {...props}
    >
      <ChevronLeft className="size-4" />
      <span className="hidden sm:block">Sebelumnya</span>
    </PaginationLink>
  )
}

function PaginationNext({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Halaman berikutnya"
      size="default"
      className={cn('gap-1 px-2.5 sm:pr-2.5', className)}
      {...props}
    >
      <span className="hidden sm:block">Berikutnya</span>
      <ChevronRight className="size-4" />
    </PaginationLink>
  )
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      role="presentation"
      data-slot="pagination-ellipsis"
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontal className="size-4" aria-hidden="true" />
      <span className="sr-only">Halaman lainnya</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
export type { PaginationLinkProps }
