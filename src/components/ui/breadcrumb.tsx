'use client'

import * as React from 'react'
import { ChevronRight, MoreHorizontal } from 'lucide-react'

import { cn } from '@/lib/utils'

type BreadcrumbProps = React.ComponentPropsWithRef<'nav'> & { separator?: React.ReactNode }

function Breadcrumb({ ref, ...props }: BreadcrumbProps) {
  return <nav ref={ref} aria-label="breadcrumb" {...props} />
}
Breadcrumb.displayName = 'Breadcrumb'

function BreadcrumbList({ className, ref, ...props }: React.ComponentPropsWithRef<'ol'>) {
  return (
    <ol
      ref={ref}
      className={cn(
        'flex flex-wrap items-center gap-1.5 break-words text-caption text-content-secondary sm:gap-2.5',
        className
      )}
      {...props}
    />
  )
}
BreadcrumbList.displayName = 'BreadcrumbList'

function BreadcrumbItem({ className, ref, ...props }: React.ComponentPropsWithRef<'li'>) {
  return <li ref={ref} className={cn('inline-flex items-center gap-1.5', className)} {...props} />
}
BreadcrumbItem.displayName = 'BreadcrumbItem'

type BreadcrumbLinkProps = React.ComponentPropsWithRef<'a'> & { asChild?: boolean }

function BreadcrumbLink({ asChild: _asChild, className, ref, ...props }: BreadcrumbLinkProps) {
  return (
    <a
      ref={ref}
      className={cn(
        'hover:text-content-primary transition-colors duration-fast',
        'focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring rounded-xs',
        className
      )}
      {...props}
    />
  )
}
BreadcrumbLink.displayName = 'BreadcrumbLink'

function BreadcrumbPage({ className, ref, ...props }: React.ComponentPropsWithRef<'span'>) {
  return (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn('font-semibold text-content-primary', className)}
      {...props}
    />
  )
}
BreadcrumbPage.displayName = 'BreadcrumbPage'

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<'li'>) => (
  <li role="presentation" aria-hidden="true" className={cn('[&>svg]:size-3', className)} {...props}>
    {children ?? <ChevronRight />}
  </li>
)
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator'

const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
)
BreadcrumbEllipsis.displayName = 'BreadcrumbElipssis'

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
