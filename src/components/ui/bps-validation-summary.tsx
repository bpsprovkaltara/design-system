import * as React from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface BpsValidationItem {
  id: string
  section: string
  message: string
}

interface BpsValidationSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  items: BpsValidationItem[]
  onNavigate?: (id: string) => void
}

export function BpsValidationSummary({
  items,
  onNavigate,
  className,
  ...props
}: BpsValidationSummaryProps) {
  if (items.length === 0) {
    return (
      <div
        className={cn(
          'rounded-lg border border-feedback-success/30 bg-feedback-success-bg p-4',
          className
        )}
        {...props}
      >
        <p className="text-sm font-medium text-feedback-success">Semua validasi terpenuhi.</p>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'rounded-lg border border-feedback-danger/30 bg-feedback-danger-bg p-4',
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-2">
        <AlertCircle className="mt-0.5 h-4 w-4 text-feedback-danger" />
        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">
            Terdapat {items.length} validasi yang perlu diperbaiki.
          </p>
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="text-left text-sm text-feedback-danger underline-offset-2 hover:underline"
                  onClick={() => onNavigate?.(item.id)}
                >
                  [{item.section}] {item.message}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
