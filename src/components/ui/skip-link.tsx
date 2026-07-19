import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SkipLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string
  label?: string
}

export function SkipLink({
  href = '#main-content',
  label = 'Lewati ke konten utama',
  className,
  ...props
}: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-toast',
        'focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium',
        'focus:text-primary-foreground focus:shadow-md focus:outline-none focus:ring-2 focus:ring-ring',
        className
      )}
      {...props}
    >
      {label}
    </a>
  )
}
