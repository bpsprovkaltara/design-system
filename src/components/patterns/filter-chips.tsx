import type { ReactNode } from 'react'

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
  /**
   * Renderer tautan kerangka (Next.js `Link`, dll.).
   * Default: `LinkButton` dengan `href` HTML.
   */
  renderLink?: (item: FilterChipItem, children: ReactNode) => ReactNode
}

/**
 * Deret chip filter berbasis tautan (`LinkButton` variant `nav`).
 * Untuk filter route-level sederhana.
 */
export function FilterChips({
  label,
  items,
  showLabel = false,
  className,
  renderLink,
}: FilterChipsProps) {
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
      {items.map((item) => {
        const variant = item.active ? 'nav' : 'outline'
        const ariaCurrent = item.active ? ('page' as const) : undefined

        if (renderLink) {
          return (
            <LinkButton
              key={item.href + item.label}
              asChild
              variant={variant}
              size="sm"
              aria-current={ariaCurrent}
            >
              {renderLink(item, item.label)}
            </LinkButton>
          )
        }

        return (
          <LinkButton
            key={item.href + item.label}
            href={item.href}
            variant={variant}
            size="sm"
            aria-current={ariaCurrent}
          >
            {item.label}
          </LinkButton>
        )
      })}
    </div>
  )
}
