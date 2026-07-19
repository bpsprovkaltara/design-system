'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface BulkAction {
  id?: string
  label: string
  onClick: () => void
  variant?: React.ComponentProps<typeof Button>['variant']
  disabled?: boolean
}

export interface BulkActionBarProps {
  selectedCount: number
  actions: BulkAction[]
  selectedLabel?: (count: number) => string
  className?: string
}

export function BulkActionBar({
  selectedCount,
  actions,
  selectedLabel = (count) => `${count} dokumen dipilih`,
  className,
}: BulkActionBarProps) {
  if (selectedCount === 0) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-card p-3',
        className
      )}
    >
      <p className="text-sm text-foreground">{selectedLabel(selectedCount)}</p>
      <div className="flex gap-2">
        {actions.map((action, index) => (
          <Button
            key={action.id ?? `${action.label}-${index}`}
            size="sm"
            variant={action.variant ?? (index === actions.length - 1 ? 'default' : 'outline')}
            onClick={action.onClick}
            disabled={action.disabled}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
