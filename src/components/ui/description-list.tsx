import * as React from 'react'

import { cn } from '@/lib/utils'

function DescriptionList({ className, ref, ...props }: React.ComponentPropsWithRef<'dl'>) {
  return (
    <dl
      ref={ref}
      className={cn(
        'grid gap-0 overflow-hidden rounded-lg border border-border-default bg-card text-card-foreground',
        className
      )}
      {...props}
    />
  )
}

function DescriptionListItem({ className, ref, ...props }: React.ComponentPropsWithRef<'div'>) {
  return (
    <div
      ref={ref}
      className={cn(
        'grid gap-1 border-b border-border-default px-4 py-3 last:border-b-0 sm:grid-cols-[12rem_1fr] sm:gap-4',
        className
      )}
      {...props}
    />
  )
}

function DescriptionTerm({ className, ref, ...props }: React.ComponentPropsWithRef<'dt'>) {
  return (
    <dt
      ref={ref}
      className={cn('text-body-sm font-medium text-content-secondary', className)}
      {...props}
    />
  )
}

function DescriptionDetails({ className, ref, ...props }: React.ComponentPropsWithRef<'dd'>) {
  return (
    <dd
      ref={ref}
      className={cn('min-w-0 text-body-sm font-medium text-content-primary', className)}
      {...props}
    />
  )
}

export { DescriptionList, DescriptionListItem, DescriptionTerm, DescriptionDetails }
