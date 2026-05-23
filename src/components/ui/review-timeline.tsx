import * as React from 'react'
import { cn } from '@/lib/utils'
import { StatusBadge } from '@/components/ui/status-badge'

export interface ReviewTimelineItem {
  id: string
  actor: string
  role: string
  note: string
  date: string
  status: 'draft' | 'pending' | 'revised' | 'approved'
}

interface ReviewTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ReviewTimelineItem[]
}

export function ReviewTimeline({ items, className, ...props }: ReviewTimelineProps) {
  return (
    <div className={cn('rounded-lg border bg-card p-4', className)} {...props}>
      <h3 className="mb-4 text-base font-semibold text-foreground">Timeline Review Dokumen</h3>
      <ol className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="relative pl-6">
            <span className="absolute left-0 top-2 h-2.5 w-2.5 rounded-full bg-primary" />
            <div className="space-y-1 rounded-md border bg-background p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium text-foreground">
                  {item.actor} - {item.role}
                </p>
                <StatusBadge variant={item.status}>{item.status}</StatusBadge>
              </div>
              <p className="text-sm text-muted-foreground">{item.note}</p>
              <p className="text-xs text-muted-foreground">{item.date}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
