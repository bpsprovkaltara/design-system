import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export type KpiAccent = 'brand' | 'accent' | 'success' | 'info' | 'warning'

const ACCENT_BAR: Record<KpiAccent, string> = {
  brand: 'bg-brand-primary',
  accent: 'bg-brand-accent',
  success: 'bg-feedback-success',
  info: 'bg-feedback-info',
  warning: 'bg-feedback-warning',
}

const ACCENT_CHIP: Record<KpiAccent, string> = {
  brand: 'bg-brand-primary/10 text-brand-primary',
  accent: 'bg-brand-accent/15 text-brand-accent',
  success: 'bg-feedback-success-bg text-feedback-success',
  info: 'bg-feedback-info-bg text-feedback-info',
  warning: 'bg-feedback-warning-bg text-feedback-warning',
}

export interface KpiCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string
  helper?: string
  icon?: React.ReactNode
  /**
   * Tema aksen opsional (bar atas + chip ikon).
   * Tanpa `accent`, tampilan default `border-l-4 border-l-primary` dipertahankan.
   */
  accent?: KpiAccent
}

export function KpiCard({ title, value, helper, icon, accent, className, ...props }: KpiCardProps) {
  return (
    <Card
      className={cn(
        'relative overflow-hidden',
        accent ? undefined : 'border-l-4 border-l-primary',
        className
      )}
      {...props}
    >
      {accent ? (
        <div
          aria-hidden="true"
          className={cn('pointer-events-none absolute inset-x-0 top-0 h-1', ACCENT_BAR[accent])}
        />
      ) : null}
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
          {icon ? (
            accent ? (
              <span
                className={cn(
                  'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg [&_svg]:size-3.5',
                  ACCENT_CHIP[accent]
                )}
              >
                {icon}
              </span>
            ) : (
              icon
            )
          ) : null}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="numeric text-2xl font-bold">{value}</div>
        {helper ? <p className="mt-1 text-xs text-muted-foreground">{helper}</p> : null}
      </CardContent>
    </Card>
  )
}
