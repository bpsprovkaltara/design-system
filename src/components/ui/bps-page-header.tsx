import * as React from 'react'
import { cn } from '@/lib/utils'

interface BpsPageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  action?: React.ReactNode
}

export function BpsPageHeader({
  title,
  description,
  action,
  className,
  ...props
}: BpsPageHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 border-b pb-4 md:flex-row md:items-end md:justify-between',
        className
      )}
      {...props}
    >
      <div>
        <h1 className="h2 text-foreground">{title}</h1>
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
