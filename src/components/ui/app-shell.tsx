'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { SkipLink } from '@/components/ui/skip-link'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import {
  AppSidebar,
  type AppSidebarNavGroup,
  type AppSidebarNavItem,
  type AppSidebarProps,
} from '@/components/ui/app-sidebar'
import { AppTopbar } from '@/components/ui/app-topbar'

const SIDEBAR_ID = 'app-shell-sidebar'

export interface AppShellProps {
  /** Sidebar nav groups (desktop rail + mobile sheet). */
  groups: AppSidebarNavGroup[]
  activeId?: string
  /** Controlled collapse for the desktop sidebar. */
  collapsed?: boolean
  defaultCollapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  onNavigate?: (item: AppSidebarNavItem) => void
  renderLink?: AppSidebarProps['renderLink']
  logo?: React.ReactNode
  collapsedLogo?: React.ReactNode
  sidebarFooter?: React.ReactNode
  mobileSidebarFooter?: React.ReactNode
  desktopBreakpoint?: 'md' | 'lg'
  /** Desktop topbar leading slot (e.g. breadcrumbs). */
  topbarStart?: React.ReactNode
  /** Topbar trailing slot (actions / user / notifications). */
  topbarEnd?: React.ReactNode
  /** Optional title shown in the mobile topbar when `topbarStart` is empty. */
  appTitle?: string
  /** Main content. */
  children: React.ReactNode
  className?: string
  mainClassName?: string
  /** Hide the topbar (mobile chrome still keeps the menu trigger). */
  hideTopbar?: boolean
}

export function AppShell({
  groups,
  activeId,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  onNavigate,
  renderLink,
  logo,
  collapsedLogo,
  sidebarFooter,
  mobileSidebarFooter,
  desktopBreakpoint = 'lg',
  topbarStart,
  topbarEnd,
  appTitle,
  children,
  className,
  mainClassName,
  hideTopbar = false,
}: AppShellProps) {
  const [uncontrolledCollapsed, setUncontrolledCollapsed] = React.useState(defaultCollapsed)
  const collapsed = collapsedProp ?? uncontrolledCollapsed
  const setCollapsed = onCollapsedChange ?? setUncontrolledCollapsed

  const [mobileOpen, setMobileOpen] = React.useState(false)

  // The collapsed state is restored on the client, so the first paint always shows
  // the expanded rail. Withholding transitions until mount keeps that correction
  // from animating as a 280→64px jump on every page load.
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  const handleNavigate = React.useCallback(
    (item: AppSidebarNavItem) => {
      setMobileOpen(false)
      onNavigate?.(item)
    },
    [onNavigate]
  )

  const sidebarProps: Omit<AppSidebarProps, 'className'> = {
    groups,
    activeId,
    collapsed,
    onNavigate: handleNavigate,
    renderLink,
    logo,
    collapsedLogo,
    footer: sidebarFooter,
  }

  const desktopVisibleClass = desktopBreakpoint === 'md' ? 'md:block' : 'lg:block'
  const mobileVisibleClass = desktopBreakpoint === 'md' ? 'md:hidden' : 'lg:hidden'
  const mobileFooter = mobileSidebarFooter === undefined ? sidebarFooter : mobileSidebarFooter

  const mobileNav = (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Buka menu"
          className={cn('h-9 w-9 shrink-0', mobileVisibleClass)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" showCloseButton={false} className="w-[280px] border-0 p-0">
        <SheetTitle className="sr-only">Navigasi</SheetTitle>
        <AppSidebar
          {...sidebarProps}
          collapsed={false}
          collapsedLogo={undefined}
          footer={mobileFooter}
          className="h-full w-full border-0"
        />
      </SheetContent>
    </Sheet>
  )

  return (
    <div
      data-slot="app-shell"
      className={cn('flex h-dvh overflow-hidden bg-background text-foreground', className)}
    >
      <SkipLink href="#main-content" />

      {/* Desktop rail. `relative` anchors the toggle, which sits outside the
          <aside> so the rail's own overflow clipping can't cut it off. */}
      <div className={cn('relative hidden h-full', desktopVisibleClass)}>
        <AppSidebar {...sidebarProps} id={SIDEBAR_ID} animate={mounted} />
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Buka sidebar' : 'Tutup sidebar'}
          aria-expanded={!collapsed}
          aria-controls={SIDEBAR_ID}
          className={cn(
            'absolute -right-3 top-5 z-30 flex size-6 items-center justify-center rounded-full',
            'bg-sidebar-active text-sidebar shadow-md ring-2 ring-background',
            'hover:scale-110 active:scale-95',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-active focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            mounted && 'transition-transform duration-200'
          )}
        >
          {collapsed ? <ChevronRight className="size-3.5" /> : <ChevronLeft className="size-3.5" />}
        </button>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        {!hideTopbar ? (
          <AppTopbar
            appTitle={appTitle}
            start={
              <>
                {mobileNav}
                {topbarStart}
              </>
            }
            end={topbarEnd}
          />
        ) : (
          <div
            className={cn(
              'flex h-topbar shrink-0 items-center border-b border-border px-4',
              mobileVisibleClass
            )}
          >
            {mobileNav}
            {appTitle ? (
              <p className="ml-2 truncate text-sm font-semibold text-foreground">{appTitle}</p>
            ) : null}
          </div>
        )}

        <main
          id="main-content"
          tabIndex={-1}
          className={cn('flex-1 overflow-y-auto outline-none', mainClassName)}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
