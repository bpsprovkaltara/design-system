'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

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
  /**
   * @deprecated The collapse toggle now lives in `AppShell`, rendered beside the
   * rail so it can straddle the sidebar edge without being clipped. Accepted for
   * backward compatibility but ignored — pass it to `AppShell` instead.
   */
  onCollapsedChange?: (collapsed: boolean) => void
  /** Called when a nav item is activated (useful for closing mobile sheet). */
  onNavigate?: (item: AppSidebarNavItem) => void
  /**
   * Optional link renderer for framework routers (Next.js `Link`, TanStack Router, etc.).
   * When omitted, items with `href` render as `<a>`; otherwise as `<button>`.
   *
   * The returned element is cloned with the nav item styling, so the router's own
   * anchor carries the full-row hit area and focus ring — do not style it yourself.
   */
  renderLink?: (item: AppSidebarNavItem, children: React.ReactNode) => React.ReactNode
  logo?: React.ReactNode
  /** Compact brand mark rendered while the desktop rail is collapsed. */
  collapsedLogo?: React.ReactNode
  footer?: React.ReactNode
  className?: string
  /** Suppress the width transition until the client has mounted (avoids a restore flash). */
  animate?: boolean
  /** DOM id, so an external toggle can point `aria-controls` at the rail. */
  id?: string
  /** Accessible label for the aside landmark. */
  'aria-label'?: string
}

/**
 * Forwards ref and unknown props so `TooltipTrigger asChild` can attach its
 * handlers and `data-state` to the real anchor/button.
 */
const DefaultLink = React.forwardRef<
  HTMLAnchorElement & HTMLButtonElement,
  {
    item: AppSidebarNavItem
    className: string
    children: React.ReactNode
    onNavigate?: (item: AppSidebarNavItem) => void
    isActive?: boolean
  } & React.HTMLAttributes<HTMLElement>
>(function DefaultLink({ item, className, children, onNavigate, isActive, ...rest }, ref) {
  if (item.href) {
    return (
      <a
        ref={ref}
        href={item.href}
        className={className}
        aria-current={isActive ? 'page' : undefined}
        aria-disabled={item.disabled || undefined}
        {...rest}
        onClick={(event) => {
          if (item.disabled) {
            event.preventDefault()
            return
          }
          rest.onClick?.(event)
          onNavigate?.(item)
        }}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={ref}
      type="button"
      className={className}
      aria-current={isActive ? 'page' : undefined}
      disabled={item.disabled}
      {...rest}
      onClick={(event) => {
        rest.onClick?.(event)
        onNavigate?.(item)
      }}
    >
      {children}
    </button>
  )
})

export function AppSidebar({
  groups,
  activeId,
  collapsed = false,
  onNavigate,
  renderLink,
  logo,
  collapsedLogo,
  footer,
  className,
  animate = true,
  id,
  'aria-label': ariaLabel = 'Navigasi utama',
}: AppSidebarProps) {
  return (
    <aside
      id={id}
      aria-label={ariaLabel}
      data-slot="app-sidebar"
      data-collapsed={collapsed || undefined}
      className={cn(
        'flex h-full flex-shrink-0 flex-col overflow-hidden border-r border-sidebar-border bg-sidebar text-sidebar-foreground',
        animate && 'transition-[width] duration-300 ease-in-out',
        collapsed ? 'w-sidebar-collapsed' : 'w-sidebar-expanded',
        className
      )}
    >
      {/* Same height and border colour as AppTopbar, so the two rules read as one
          continuous line across the top of the shell. */}
      <div
        className={cn(
          'flex h-topbar flex-shrink-0 items-center border-b border-sidebar-border',
          collapsed ? 'justify-center px-2' : 'justify-start px-4'
        )}
      >
        {collapsed ? (
          <div className="flex min-w-0 items-center justify-center">{collapsedLogo ?? logo}</div>
        ) : logo ? (
          <div className="min-w-0 flex-1">{logo}</div>
        ) : null}
      </div>

      <TooltipProvider delayDuration={0}>
        <nav
          className="flex-1 space-y-5 overflow-y-auto overflow-x-hidden px-2 py-4"
          aria-label="Menu"
        >
          {groups.map((group, groupIndex) => (
            <div key={group.title ?? `group-${groupIndex}`} className="space-y-1">
              {group.title && !collapsed ? (
                <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-sidebar-muted">
                  {group.title}
                </p>
              ) : null}
              {collapsed && groupIndex > 0 ? (
                <Separator className="my-3 bg-sidebar-border" />
              ) : null}
              {/* Reset eksplisit: sebagian konsumen tidak mereset padding UA pada
                  <ul>, dan padding-inline-start warisannya menggencet item nav. */}
              <ul className="m-0 list-none space-y-0.5 p-0">
                {group.items.map((item) => {
                  const isActive = activeId === item.id
                  const itemClass = cn(
                    // Cincin fokus datang dari aturan :focus-visible global yang
                    // di-scope ke [data-slot=app-sidebar] di tokens.css.
                    'relative flex w-full items-center gap-3 rounded-lg py-2.5 text-sm font-medium transition-colors',
                    collapsed ? 'justify-center px-0' : 'justify-start px-3',
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-sidebar-muted hover:bg-white/[0.06] hover:text-sidebar-foreground',
                    item.disabled && 'pointer-events-none opacity-50'
                  )

                  const content = (
                    <>
                      {isActive ? (
                        <span
                          aria-hidden
                          className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r bg-sidebar-active"
                        />
                      ) : null}
                      {item.icon ? (
                        <span className="flex size-[18px] shrink-0 items-center justify-center [&>svg]:size-[18px]">
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

                  const rendered = renderLink ? renderLink(item, content) : null
                  const link =
                    // Style the router's own anchor rather than a wrapper, so the hit
                    // area covers the whole row and the focus ring is visible.
                    React.isValidElement(rendered) ? (
                      React.cloneElement(rendered as React.ReactElement<Record<string, unknown>>, {
                        className: cn(
                          itemClass,
                          (rendered.props as { className?: string }).className
                        ),
                        'data-active': isActive || undefined,
                        'aria-current': isActive ? 'page' : undefined,
                        'aria-disabled': item.disabled || undefined,
                        onClick: (event: React.MouseEvent) => {
                          if (item.disabled) {
                            event.preventDefault()
                            return
                          }
                          ;(
                            rendered.props as { onClick?: (e: React.MouseEvent) => void }
                          ).onClick?.(event)
                          onNavigate?.(item)
                        },
                      })
                    ) : rendered !== null ? (
                      <div className={itemClass} data-active={isActive || undefined}>
                        {rendered}
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
                    )

                  return (
                    <li key={item.id}>
                      {collapsed ? (
                        <Tooltip>
                          <TooltipTrigger asChild>{link}</TooltipTrigger>
                          <TooltipContent side="right">{item.label}</TooltipContent>
                        </Tooltip>
                      ) : (
                        link
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </TooltipProvider>

      {footer ? (
        <div
          className={cn(
            'mt-auto flex-shrink-0 border-t border-sidebar-border',
            collapsed ? 'p-2' : 'p-3'
          )}
        >
          {footer}
        </div>
      ) : null}
    </aside>
  )
}
