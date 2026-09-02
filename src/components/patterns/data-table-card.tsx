import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { SectionCard } from '@/components/patterns/section-card'

export interface DataTableCardSummaryItem {
  label: string
  value: ReactNode
}

export interface DataTableCardProps {
  title?: ReactNode
  description?: ReactNode
  summary?: DataTableCardSummaryItem[]
  action?: ReactNode
  /** Slot bawah (biasanya pagination). */
  footer?: ReactNode
  children: ReactNode
  className?: string
}

/**
 * Pola kartu daftar tabel: header SectionCard + ringkasan + body scroll + footer.
 */
export function DataTableCard({
  title,
  description,
  summary,
  action,
  footer,
  children,
  className,
}: DataTableCardProps) {
  const headerExtra =
    summary && summary.length > 0 ? (
      <dl className="flex flex-wrap gap-x-6 gap-y-1">
        {summary.map((item) => (
          <div key={item.label} className="min-w-0">
            <dt className="text-xs text-content-tertiary">{item.label}</dt>
            <dd className="text-sm font-semibold tabular-nums text-content-primary">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    ) : undefined

  return (
    <SectionCard
      title={title}
      description={description}
      action={action}
      headerExtra={headerExtra}
      noPadding
      className={className}
    >
      <div className="overflow-x-auto">{children}</div>
      {footer ? (
        <div
          className={cn(
            'flex items-center justify-between gap-3 border-t border-border-subtle px-6 py-4'
          )}
        >
          {footer}
        </div>
      ) : null}
    </SectionCard>
  )
}
