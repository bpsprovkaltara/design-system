'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface AppTopbarProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * @deprecated Prefer `start` / children slots. Kept for backward compatibility
   * with the v4 stub that only accepted a title string.
   */
  appTitle?: string
  /** Leading content (breadcrumbs, page context, mobile menu trigger). */
  start?: React.ReactNode
  /** Trailing content (actions, notifications, user menu). */
  end?: React.ReactNode
}

export function AppTopbar({
  appTitle,
  start,
  end,
  className,
  children,
  ...props
}: AppTopbarProps) {
  return (
    <header
      data-slot="app-topbar"
      className={cn(
        'sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-card px-4',
        className
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {start}
        {appTitle && !start && !children ? (
          <p className="truncate text-sm font-semibold text-foreground">{appTitle}</p>
        ) : null}
        {children}
      </div>
      {end ? <div className="ml-auto flex shrink-0 items-center gap-2">{end}</div> : null}
    </header>
  )
}
