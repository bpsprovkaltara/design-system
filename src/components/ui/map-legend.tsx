import * as React from 'react'
import { cn } from '@/lib/utils'

export interface MapLegendItem {
  tier: 0 | 1 | 2 | 3 | 4 | 5 | 'active'
  label: string
}

export interface MapLegendProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  items?: MapLegendItem[]
  orientation?: 'horizontal' | 'vertical'
}

const DEFAULT_ITEMS: MapLegendItem[] = [
  { tier: 0, label: 'Tidak ada data' },
  { tier: 1, label: 'Sangat rendah' },
  { tier: 2, label: 'Rendah' },
  { tier: 3, label: 'Sedang' },
  { tier: 4, label: 'Tinggi' },
  { tier: 5, label: 'Sangat tinggi' },
  { tier: 'active', label: 'Wilayah aktif' },
]

const tierClass: Record<MapLegendItem['tier'], string> = {
  0: 'bg-map-tier-0',
  1: 'bg-map-tier-1',
  2: 'bg-map-tier-2',
  3: 'bg-map-tier-3',
  4: 'bg-map-tier-4',
  5: 'bg-map-tier-5',
  active: 'bg-map-tier-active',
}

export function MapLegend({
  title = 'Legenda peta',
  items = DEFAULT_ITEMS,
  orientation = 'vertical',
  className,
  ...props
}: MapLegendProps) {
  return (
    <div
      role="group"
      aria-label={title}
      className={cn(
        'rounded-lg border border-border bg-card p-4',
        className
      )}
      {...props}
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      <ul
        className={cn(
          orientation === 'horizontal'
            ? 'flex flex-wrap items-center gap-3'
            : 'space-y-2'
        )}
      >
        {items.map((item) => (
          <li key={String(item.tier)} className="flex items-center gap-2 text-sm text-foreground">
            <span
              aria-hidden="true"
              className={cn(
                'inline-block size-3.5 shrink-0 rounded-sm border border-border-subtle',
                tierClass[item.tier]
              )}
            />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
