import { cn } from '@/lib/utils'
import { LinkButton } from '@/components/ui/link-button'

export interface FilterChipItem {
  href: string
  label: string
  active: boolean
}

export interface FilterChipsProps {
  /** Label aksesibel untuk grup chip (dan teks kasat mata jika `showLabel`). */
  label: string
  items: FilterChipItem[]
  showLabel?: boolean
  className?: string
}

/**
 * Deret chip filter berbasis tautan (`LinkButton` variant `nav`).
 * Untuk filter route-level sederhana.
 */
export function FilterChips({ label, items, showLabel = false, className }: FilterChipsProps) {
  return (
    <div
      className={cn('flex flex-wrap items-center gap-2', className)}
      role="group"
      aria-label={label}
      data-slot="filter-chips"
    >
      {showLabel ? (
        <span className="text-xs font-medium text-content-secondary">{label}</span>
      ) : null}
      {items.map((item) => (
        <LinkButton
          key={item.href + item.label}
          href={item.href}
          variant={item.active ? 'nav' : 'outline'}
          size="sm"
          aria-current={item.active ? 'page' : undefined}
        >
          {item.label}
        </LinkButton>
      ))}
    </div>
  )
}
