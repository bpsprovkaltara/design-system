import * as React from 'react'
import { cn } from '@/lib/utils'

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  action?: React.ReactNode
  /** Class tambahan untuk elemen judul (h1), mis. font display khusus app. */
  titleClassName?: string
  /** Class tambahan untuk elemen deskripsi. */
  descriptionClassName?: string
}

export function PageHeader({
  title,
  description,
  action,
  className,
  titleClassName,
  descriptionClassName,
  ...props
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 border-b pb-4 md:flex-row md:items-end md:justify-between',
        className
      )}
      {...props}
    >
      <div>
        <h1 className={cn('h2 text-foreground', titleClassName)}>{title}</h1>
        {description ? (
          <p className={cn('mt-1 text-sm text-muted-foreground', descriptionClassName)}>
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
