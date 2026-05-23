import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

const numberFormatter = new Intl.NumberFormat('id-ID')

const cardVariants = cva(
  'relative overflow-hidden transition-shadow duration-200 hover:shadow-md',
  {
    variants: {
      variant: {
        default: 'border bg-card',
        glass: 'border-white/40 bg-white/60 shadow-sm backdrop-blur-md',
        gradient: 'border-l-4 border-l-primary bg-card',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface PerformanceCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>, VariantProps<typeof cardVariants> {
  title: string
  value: string | number
  unit?: string
  target?: number
  delta?: {
    value: number
    direction: 'up' | 'down'
    period: string
  }
  trend?: number[]
  icon?: LucideIcon
  loading?: boolean
}

function formatValue(value: string | number): string {
  return typeof value === 'number' ? numberFormatter.format(value) : value
}

function Sparkline({ data, className }: { data: number[]; className?: string }) {
  if (data.length < 2) return null

  const width = 120
  const height = 36
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const stepX = width / (data.length - 1)

  const points = data
    .map((v, i) => {
      const x = i * stepX
      const y = height - ((v - min) / range) * height
      return `${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={cn('h-9 w-full text-primary', className)}
      role="presentation"
      aria-hidden="true"
    >
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  )
}

export function PerformanceCard({
  title,
  value,
  unit,
  target,
  delta,
  trend,
  icon: Icon,
  variant,
  loading,
  className,
  ...props
}: PerformanceCardProps) {
  if (loading) {
    return (
      <Card className={cn(cardVariants({ variant }), className)} {...props}>
        <CardHeader className="pb-2">
          <Skeleton className="h-3 w-24" />
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-9 w-full" />
        </CardContent>
      </Card>
    )
  }

  const targetPct =
    typeof value === 'number' && typeof target === 'number' && target > 0
      ? Math.min(Math.round((value / target) * 100), 999)
      : null

  const deltaUp = delta?.direction === 'up'
  const DeltaIcon = deltaUp ? ArrowUpRight : ArrowDownRight

  return (
    <Card className={cn(cardVariants({ variant }), className)} {...props}>
      {variant === 'gradient' ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-br from-primary/10 to-transparent"
        />
      ) : null}

      <CardHeader className="relative flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {Icon ? <Icon className="h-3.5 w-3.5" aria-hidden="true" /> : null}
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="relative space-y-3">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tabular-nums text-foreground">
            {formatValue(value)}
          </span>
          {unit ? <span className="text-sm font-medium text-muted-foreground">{unit}</span> : null}
        </div>

        {delta ? (
          <div
            className={cn(
              'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
              deltaUp
                ? 'bg-feedback-success-bg text-feedback-success'
                : 'bg-feedback-danger-bg text-feedback-danger'
            )}
          >
            <DeltaIcon className="h-3 w-3" aria-hidden="true" />
            <span className="tabular-nums">{numberFormatter.format(delta.value)}%</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">{delta.period}</span>
          </div>
        ) : null}

        {targetPct !== null && typeof target === 'number' ? (
          <p className="text-xs text-muted-foreground">
            <span className="font-medium tabular-nums text-foreground">{targetPct}%</span> dari
            target {numberFormatter.format(target)}
          </p>
        ) : null}

        {trend && trend.length > 1 ? <Sparkline data={trend} /> : null}
      </CardContent>
    </Card>
  )
}
