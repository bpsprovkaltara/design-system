'use client'

import * as React from 'react'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { SkipLink } from '@/components/ui/skip-link'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  AppSidebar,
  type AppSidebarNavGroup,
  type AppSidebarNavItem,
  type AppSidebarProps,
} from '@/components/ui/app-sidebar'
import { AppTopbar } from '@/components/ui/app-topbar'

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
  sidebarFooter?: React.ReactNode
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
  /** Hide the sticky topbar (desktop + mobile chrome still keeps the menu trigger). */
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
  sidebarFooter,
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
    onCollapsedChange: setCollapsed,
    onNavigate: handleNavigate,
    renderLink,
    logo,
    footer: sidebarFooter,
  }

  return (
    <div
      data-slot="app-shell"
      className={cn('flex h-screen overflow-hidden bg-background text-foreground', className)}
    >
      <SkipLink href="#main-content" />

      {/* Desktop sidebar */}
      <div className="hidden h-full lg:block">
        <AppSidebar {...sidebarProps} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        {!hideTopbar ? (
          <>
            {/* Mobile chrome */}
            <AppTopbar
              className="lg:hidden"
              appTitle={appTitle}
              start={
                <>
                  <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                    <SheetTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Buka menu"
                        className="h-9 w-9"
                      >
                        <Menu className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" showCloseButton={false} className="w-[280px] border-0 p-0">
                      <SheetTitle className="sr-only">Navigasi</SheetTitle>
                      <AppSidebar
                        {...sidebarProps}
                        collapsed={false}
                        onCollapsedChange={undefined}
                        className="h-full w-full border-0"
                      />
                    </SheetContent>
                  </Sheet>
                  {topbarStart}
                </>
              }
              end={topbarEnd}
            />

            {/* Desktop topbar */}
            <AppTopbar className="hidden lg:flex" start={topbarStart} end={topbarEnd} />
          </>
        ) : (
          <div className="flex h-14 items-center border-b border-border px-4 lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button type="button" variant="ghost" size="icon" aria-label="Buka menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" showCloseButton={false} className="w-[280px] border-0 p-0">
                <SheetTitle className="sr-only">Navigasi</SheetTitle>
                <AppSidebar
                  {...sidebarProps}
                  collapsed={false}
                  onCollapsedChange={undefined}
                  className="h-full w-full border-0"
                />
              </SheetContent>
            </Sheet>
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
