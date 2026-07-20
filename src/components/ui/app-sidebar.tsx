'use client'

import * as React from 'react'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export interface AppSidebarNavItem {
  /** Unique id used for active matching when `href` is absent. */
  id: string
  label: string
  href?: string
  icon?: React.ReactNode
  badge?: React.ReactNode
  /** Soft-disable the item without removing it from the list. */
  disabled?: boolean
}

export interface AppSidebarNavGroup {
  title?: string
  items: AppSidebarNavItem[]
}

export interface AppSidebarProps {
  groups: AppSidebarNavGroup[]
  /** Id of the active nav item. */
  activeId?: string
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  /** Called when a nav item is activated (useful for closing mobile sheet). */
  onNavigate?: (item: AppSidebarNavItem) => void
  /**
   * Optional link renderer for framework routers (Next.js `Link`, TanStack Router, etc.).
   * When omitted, items with `href` render as `<a>`; otherwise as `<button>`.
   */
  renderLink?: (item: AppSidebarNavItem, children: React.ReactNode) => React.ReactNode
  logo?: React.ReactNode
  /** Compact brand mark rendered while the desktop rail is collapsed. */
  collapsedLogo?: React.ReactNode
  footer?: React.ReactNode
  className?: string
  /** Accessible label for the aside landmark. */
  'aria-label'?: string
}

function DefaultLink({
  item,
  className,
  children,
  onNavigate,
  isActive,
}: {
  item: AppSidebarNavItem
  className: string
  children: React.ReactNode
  onNavigate?: (item: AppSidebarNavItem) => void
  isActive?: boolean
}) {
  if (item.href) {
    return (
      <a
        href={item.href}
        className={className}
        aria-current={isActive ? 'page' : undefined}
        aria-disabled={item.disabled || undefined}
        onClick={(event) => {
          if (item.disabled) {
            event.preventDefault()
            return
          }
          onNavigate?.(item)
        }}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={className}
      aria-current={isActive ? 'page' : undefined}
      disabled={item.disabled}
      onClick={() => onNavigate?.(item)}
    >
      {children}
    </button>
  )
}

export function AppSidebar({
  groups,
  activeId,
  collapsed = false,
  onCollapsedChange,
  onNavigate,
  renderLink,
  logo,
  collapsedLogo,
  footer,
  className,
  'aria-label': ariaLabel = 'Navigasi utama',
}: AppSidebarProps) {
  const toggle = () => onCollapsedChange?.(!collapsed)

  return (
    <aside
      aria-label={ariaLabel}
      data-slot="app-sidebar"
      data-collapsed={collapsed || undefined}
      className={cn(
        'flex h-full flex-shrink-0 flex-col overflow-x-hidden overflow-y-auto border-r border-border bg-sidebar text-sidebar-foreground transition-[width] duration-300 ease-in-out',
        collapsed ? 'w-sidebar-collapsed' : 'w-sidebar-expanded',
        className
      )}
    >
      <div
        className={cn(
          'flex flex-shrink-0 items-center border-b border-border/40',
          collapsed ? 'justify-center gap-1 px-2 py-3' : 'justify-between gap-2 px-4 py-3'
        )}
      >
        {!collapsed && logo ? <div className="min-w-0 flex-1">{logo}</div> : null}
        {collapsed && collapsedLogo ? (
          <div className="flex min-w-0 items-center justify-center">{collapsedLogo}</div>
        ) : null}
        {onCollapsedChange ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 text-sidebar-muted hover:bg-sidebar-hover hover:text-sidebar-foreground"
            aria-label={collapsed ? 'Buka sidebar' : 'Tutup sidebar'}
            aria-expanded={!collapsed}
            onClick={toggle}
          >
            {collapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </Button>
        ) : logo && collapsed && !collapsedLogo ? (
          <div className="flex items-center justify-center">{logo}</div>
        ) : null}
      </div>

      <nav className="flex-1 space-y-4 px-2 py-3" aria-label="Menu">
        {groups.map((group, groupIndex) => (
          <div key={group.title ?? `group-${groupIndex}`} className="space-y-1">
            {group.title && !collapsed ? (
              <p className="px-2 pb-1 text-[10px] font-medium uppercase tracking-[0.14em] text-sidebar-muted">
                {group.title}
              </p>
            ) : null}
            {collapsed && groupIndex > 0 ? <Separator className="my-2 bg-border/40" /> : null}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = activeId === item.id
                const itemClass = cn(
                  'flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors',
                  collapsed ? 'justify-center' : 'justify-start',
                  isActive
                    ? 'bg-sidebar-active text-sidebar-foreground'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-hover hover:text-sidebar-foreground',
                  item.disabled && 'opacity-50'
                )

                const content = (
                  <>
                    {item.icon ? (
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center [&>svg]:h-4 [&>svg]:w-4">
                        {item.icon}
                      </span>
                    ) : null}
                    {!collapsed ? (
                      <span className="min-w-0 flex-1 truncate text-left">{item.label}</span>
                    ) : null}
                    {!collapsed && item.badge ? (
                      <span className="shrink-0">{item.badge}</span>
                    ) : null}
                    {collapsed ? <span className="sr-only">{item.label}</span> : null}
                  </>
                )

                return (
                  <li key={item.id}>
                    {renderLink ? (
                      <div
                        className={itemClass}
                        data-active={isActive || undefined}
                        aria-disabled={item.disabled || undefined}
                        onClickCapture={(event) => {
                          if (item.disabled) {
                            event.preventDefault()
                            event.stopPropagation()
                            return
                          }
                          onNavigate?.(item)
                        }}
                      >
                        {renderLink(item, content)}
                      </div>
                    ) : (
                      <DefaultLink
                        item={item}
                        className={itemClass}
                        onNavigate={onNavigate}
                        isActive={isActive}
                      >
                        {content}
                      </DefaultLink>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {footer ? (
        <div
          className={cn(
            'mt-auto flex-shrink-0 border-t border-border/40',
            collapsed ? 'p-2' : 'p-3'
          )}
        >
          {footer}
        </div>
      ) : null}
    </aside>
  )
}
