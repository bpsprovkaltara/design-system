import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/showcase/ThemeToggle'
import {
  Home,
  Palette,
  Type,
  Layout,
  MousePointerClick,
  Tag,
  Layers,
  CheckSquare,
  Table,
  Bell,
  Loader,
  LayoutDashboard,
  Lock,
  Menu,
  GalleryHorizontal,
  PanelBottomClose,
  ClipboardCheck,
  DatabaseZap,
  Gauge,
  MessageSquareWarning,
  List,
  FileText,
  Settings,
  PackagePlus,
  SlidersHorizontal,
  ToggleLeft,
  Square,
  PanelsTopLeft,
  BarChart3,
  Compass,
  Inbox,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react'

const navGroups = [
  {
    title: 'Overview',
    items: [
      { id: '/', label: 'Get Started', icon: Home },
      { id: '/installation', label: 'Instalasi', icon: PackagePlus },
    ],
  },
  {
    title: 'Foundations',
    items: [
      { id: '/foundations/colors', label: 'Colors', icon: Palette },
      { id: '/foundations/typography', label: 'Typography', icon: Type },
      { id: '/foundations/spacing', label: 'Spacing & Layout', icon: Layout },
    ],
  },
  {
    title: 'Components',
    items: [
      { id: '/components/buttons', label: 'Buttons', icon: MousePointerClick },
      { id: '/components/badges', label: 'Badges & Tags', icon: Tag },
      { id: '/components/cards', label: 'Cards', icon: Layers },
      { id: '/components/inputs', label: 'Form Inputs', icon: CheckSquare },
      { id: '/components/table', label: 'Data Table', icon: Table },
      { id: '/components/toast', label: 'Toast', icon: Bell },
      { id: '/components/loading', label: 'Loading', icon: Loader },
      { id: '/components/essentials', label: 'Essential UI', icon: SlidersHorizontal },
      { id: '/components/navigation-menu', label: 'Navigation Menu', icon: Menu },
      { id: '/components/carousel', label: 'Carousel', icon: GalleryHorizontal },
      { id: '/components/drawer', label: 'Drawer', icon: PanelBottomClose },
      { id: '/components/form-workflow', label: 'Form Workflow', icon: ClipboardCheck },
      { id: '/components/data-management', label: 'Data Management', icon: DatabaseZap },
      { id: '/components/feedback-status', label: 'Feedback & Status', icon: MessageSquareWarning },
      { id: '/components/performance-card', label: 'Performance Card', icon: Gauge },
      { id: '/components/form-controls', label: 'Form Controls', icon: ToggleLeft },
      { id: '/components/overlays', label: 'Overlays', icon: Square },
      { id: '/components/disclosure', label: 'Disclosure & Layout', icon: PanelsTopLeft },
      { id: '/components/data-display', label: 'Data Display', icon: BarChart3 },
      { id: '/components/navigation', label: 'Navigation', icon: Compass },
      { id: '/components/empty-state', label: 'Empty State', icon: Inbox },
    ],
  },
  {
    title: 'Prototypes',
    items: [
      { id: '/prototypes/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: '/prototypes/auth', label: 'Auth Flow', icon: Lock },
      { id: '/prototypes/list', label: 'List Page', icon: List },
      { id: '/prototypes/detail', label: 'Detail Page', icon: FileText },
      { id: '/prototypes/settings', label: 'Settings Page', icon: Settings },
    ],
  },
]

interface SidebarProps {
  collapsed?: boolean
  onToggle?: () => void
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const location = useLocation()

  return (
    <aside
      aria-label="Navigasi showcase"
      className={cn(
        'flex-shrink-0 border-r border-border-subtle bg-card flex flex-col h-screen overflow-y-auto overflow-x-hidden transition-[width] duration-300 ease-in-out',
        collapsed ? 'w-14' : 'w-72'
      )}
    >
      {/* Masthead */}
      <div
        className={cn(
          'border-b border-border-default flex-shrink-0',
          collapsed ? 'px-0 pt-4 pb-4 flex flex-col items-center gap-2' : 'px-6 pt-7 pb-5'
        )}
      >
        {collapsed ? (
          <button
            onClick={onToggle}
            aria-label="Buka sidebar"
            aria-expanded={false}
            className="w-9 h-9 flex items-center justify-center rounded-md text-content-tertiary hover:text-content-primary hover:bg-muted transition-colors"
          >
            <PanelLeftOpen className="w-4 h-4" />
          </button>
        ) : (
          <>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-content-tertiary">
                Edisi&nbsp;04
              </span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-content-tertiary">
                  MMXXVI
                </span>
                <button
                  onClick={onToggle}
                  aria-label="Tutup sidebar"
                  aria-expanded={true}
                  className="w-6 h-6 flex items-center justify-center rounded text-content-tertiary hover:text-content-primary hover:bg-muted transition-colors"
                >
                  <PanelLeftClose className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <h1 className="font-display text-[28px] leading-[0.95] font-semibold text-content-primary tracking-tight">
              BPS
              <span className="text-amber-600 italic">·</span>
              Kaltara
            </h1>
            <div className="mt-3 flex items-center gap-2">
              <span className="h-px flex-1 bg-content-primary" />
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-content-secondary shrink-0">
                Design&nbsp;System
              </span>
              <span className="h-px w-6 bg-amber-500 shrink-0" />
            </div>
          </>
        )}
      </div>

      <nav className={cn('py-6 space-y-7 flex-1', collapsed ? 'px-0' : 'px-4')}>
        {navGroups.map((group, gi) => (
          <div key={gi}>
            {!collapsed && (
              <div className="mb-3 px-2 flex items-center gap-2">
                <span className="font-mono text-[10px] font-medium text-amber-700 shrink-0">
                  {String(gi + 1).padStart(2, '0')}
                </span>
                <h3 className="text-[10px] font-semibold text-content-secondary uppercase tracking-[0.16em] shrink-0">
                  {group.title}
                </h3>
                <span className="flex-1 h-px bg-border-subtle" />
              </div>
            )}
            {collapsed && gi > 0 && <div className="mx-auto w-6 h-px bg-border-subtle mb-3" />}
            <div className="space-y-px">
              {group.items.map((item) => {
                const isActive = location.pathname === item.id
                const Icon = item.icon

                if (collapsed) {
                  return (
                    <Link
                      key={item.id}
                      to={item.id}
                      title={item.label}
                      aria-label={item.label}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'relative flex items-center justify-center w-full h-9 transition-colors duration-fast',
                        isActive
                          ? 'text-amber-700'
                          : 'text-content-tertiary hover:text-content-primary'
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-sm transition-all duration-base ease-spring',
                          isActive ? 'h-5 bg-amber-500' : 'h-0 bg-amber-500'
                        )}
                      />
                      <Icon className="w-[15px] h-[15px] shrink-0" aria-hidden="true" />
                    </Link>
                  )
                }

                return (
                  <Link
                    key={item.id}
                    to={item.id}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'group relative flex items-center gap-3 px-3 py-2 text-[13px] transition-colors duration-fast',
                      isActive
                        ? 'text-content-primary font-semibold'
                        : 'text-content-secondary hover:text-content-primary'
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-sm transition-all duration-base ease-spring',
                        isActive ? 'h-5 bg-amber-500' : 'h-0 bg-amber-500 group-hover:h-3'
                      )}
                    />
                    <Icon
                      className={cn(
                        'w-[15px] h-[15px] shrink-0 transition-colors',
                        isActive
                          ? 'text-amber-700'
                          : 'text-content-tertiary group-hover:text-content-secondary'
                      )}
                    />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div
        className={cn(
          'border-t border-border-subtle flex-shrink-0',
          collapsed ? 'px-0 py-4 flex flex-col items-center gap-2' : 'px-6 py-4'
        )}
      >
        {collapsed ? (
          <ThemeToggle />
        ) : (
          <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-content-tertiary">
            <span>v4.4.0</span>
            <div className="flex items-center gap-2">
              <span>Internal</span>
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
