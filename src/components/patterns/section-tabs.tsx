import * as React from 'react'

import { cn } from '@/lib/utils'

export interface SectionTab {
  href: string
  label: string
  /**
   * Prefix rute lain yang ikut menyalakan tab ini — untuk anak yang tidak
   * bersarang di bawah `href` (mis. `/perencanaan/formasi/{id}` → tab Peta).
   */
  matchPrefixes?: string[]
}

export interface SectionTabsProps {
  tabs: SectionTab[]
  /** Label aksesibel untuk `<nav>`. */
  label: string
  /** Pathname aktif (oper hasil `usePathname()` dari framework router). */
  pathname: string
  /**
   * Renderer tautan kerangka (Next.js `Link`, TanStack Router, dll.).
   * Elemen hasil di-clone dengan kelas tab + `aria-current`.
   */
  renderLink?: (tab: SectionTab, children: React.ReactNode) => React.ReactNode
  className?: string
}

/**
 * Tab aktif = kecocokan prefix terpanjang di antara `href` + `matchPrefixes`.
 * Prefix pendek saja tidak cukup: `/pegawai/status-data` cocok dengan
 * `/pegawai` dan `/pegawai/status-data` — tanpa aturan terpanjang, dua tab
 * bisa aktif bersamaan.
 */
export function resolveActiveTab(
  pathname: string,
  tabs: SectionTab[]
): string | undefined {
  return tabs
    .flatMap((tab) =>
      [tab.href, ...(tab.matchPrefixes ?? [])].map((prefix) => ({
        href: tab.href,
        prefix,
      }))
    )
    .filter(
      ({ prefix }) => pathname === prefix || pathname.startsWith(`${prefix}/`)
    )
    .sort((left, right) => right.prefix.length - left.prefix.length)[0]?.href
}

const tabClassName = (active: boolean) =>
  cn(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium leading-none',
    'ring-offset-background transition-all outline-none',
    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    active
      ? 'bg-background text-content-primary shadow-sm'
      : 'hover:text-content-primary'
  )

/**
 * Sub-nav sibling route (bukan Radix Tabs) — tiap klik adalah navigasi rute.
 * Visual selaras `TabsList` / `TabsTrigger` (kotak di atas `bg-muted`).
 */
export function SectionTabs({
  tabs,
  label,
  pathname,
  renderLink,
  className,
}: SectionTabsProps) {
  const activeHref = resolveActiveTab(pathname, tabs)

  return (
    <nav
      aria-label={label}
      data-slot="section-tabs"
      className={cn(
        'inline-flex flex-wrap items-center gap-1 rounded-lg bg-muted p-1 text-muted-foreground',
        className
      )}
    >
      {tabs.map((tab) => {
        const active = tab.href === activeHref
        const classNameForTab = tabClassName(active)
        const ariaCurrent = active ? ('page' as const) : undefined

        if (renderLink) {
          const node = renderLink(tab, tab.label)
          if (!React.isValidElement(node)) {
            return (
              <span key={tab.href} className={classNameForTab}>
                {node}
              </span>
            )
          }
          const element = node as React.ReactElement<{
            className?: string
            'aria-current'?: 'page'
            children?: React.ReactNode
          }>
          return (
            <React.Fragment key={tab.href}>
              {React.cloneElement(element, {
                className: cn(classNameForTab, element.props.className),
                'aria-current': ariaCurrent,
                children: element.props.children ?? tab.label,
              })}
            </React.Fragment>
          )
        }

        return (
          <a
            key={tab.href}
            href={tab.href}
            aria-current={ariaCurrent}
            className={classNameForTab}
          >
            {tab.label}
          </a>
        )
      })}
    </nav>
  )
}
