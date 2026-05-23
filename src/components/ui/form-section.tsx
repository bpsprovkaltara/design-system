import * as React from 'react'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  requiredCount?: number
  completedCount?: number
  action?: React.ReactNode
}

export function FormSection({
  title,
  description,
  requiredCount,
  completedCount,
  action,
  className,
  children,
  ...props
}: FormSectionProps) {
  const hasProgress = typeof requiredCount === 'number' && typeof completedCount === 'number'
  const progressText = hasProgress ? `${completedCount}/${requiredCount} field terisi` : null

  return (
    <section className={cn('rounded-lg border bg-card p-6 space-y-4', className)} {...props}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
          {progressText ? <p className="text-xs text-muted-foreground">{progressText}</p> : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      <Separator />
      <div className="space-y-4">{children}</div>
    </section>
  )
}
