import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export interface SectionCardProps {
  title?: ReactNode
  description?: ReactNode
  /** Icon di dalam chip kiri (h-9 w-9, tint brand). */
  icon?: ReactNode
  /** Slot aksi di kanan header. */
  action?: ReactNode
  /** Konten di bawah judul/deskripsi tanpa truncate (mis. ringkasan angka). */
  headerExtra?: ReactNode
  children: ReactNode
  className?: string
  contentClassName?: string
  /** Jika true, children tidak dibungkus CardContent. */
  noPadding?: boolean
}

/**
 * Pola kartu ber-header fleksibel di atas `Card variant="surface"`.
 */
export function SectionCard({
  title,
  description,
  icon,
  action,
  headerExtra,
  children,
  className,
  contentClassName,
  noPadding = false,
}: SectionCardProps) {
  const showHeader = Boolean(title || action || headerExtra || description || icon)

  return (
    <Card variant="surface" className={cn('overflow-hidden', className)}>
      {showHeader ? (
        <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0">
          <div className="flex min-w-0 items-center gap-3">
            {icon ? (
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary [&_svg]:size-4">
                {icon}
              </span>
            ) : null}
            <div className="min-w-0">
              {title ? (
                <CardTitle className="truncate text-sm font-semibold">{title}</CardTitle>
              ) : null}
              {description ? (
                <p className="mt-0.5 truncate text-xs text-content-tertiary">{description}</p>
              ) : null}
              {headerExtra ? (
                <div className={title || description ? 'mt-2' : undefined}>{headerExtra}</div>
              ) : null}
            </div>
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </CardHeader>
      ) : null}
      {noPadding ? (
        children
      ) : (
        <CardContent className={cn(contentClassName)}>{children}</CardContent>
      )}
    </Card>
  )
}
