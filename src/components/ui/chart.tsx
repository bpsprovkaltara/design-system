'use client'

import { cn } from '@/lib/utils'

const numberFormatter = new Intl.NumberFormat('id-ID')

interface SparklineProps {
  data: number[]
  className?: string
  width?: number
  height?: number
}

function Sparkline({ data, className, width = 120, height = 36 }: SparklineProps) {
  if (data.length < 2) return null

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

interface BarChartItem {
  label: string
  value: number
}

interface BarChartProps {
  data: BarChartItem[]
  className?: string
  showValues?: boolean
}

function BarChart({ data, className, showValues = true }: BarChartProps) {
  if (data.length === 0) return null

  const max = Math.max(...data.map((d) => d.value))

  const chartColors = [
    'bg-chart-1',
    'bg-chart-2',
    'bg-chart-3',
    'bg-chart-4',
    'bg-chart-5',
  ] as const

  return (
    <div className={cn('flex items-end gap-2', className)} role="img" aria-label="Bar chart">
      {data.map((item, i) => {
        const pct = max > 0 ? (item.value / max) * 100 : 0
        const colorClass = chartColors[i % chartColors.length]
        return (
          <div key={item.label} className="flex flex-1 flex-col items-center gap-1">
            {showValues && (
              <span className="font-mono text-[10px] tabular-nums text-content-secondary">
                {numberFormatter.format(item.value)}
              </span>
            )}
            <div
              className="flex w-full items-end overflow-hidden rounded-sm bg-warm-200"
              style={{ height: 80 }}
            >
              <div
                className={cn('w-full rounded-sm transition-all duration-300', colorClass)}
                style={{ height: `${pct}%` }}
              />
            </div>
            <span className="text-[10px] text-content-tertiary text-center leading-tight line-clamp-2">
              {item.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export { Sparkline, BarChart }
export type { SparklineProps, BarChartProps, BarChartItem }
