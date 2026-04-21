import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, Palette, Type, Layout, MousePointerClick, Tag, Layers, CheckSquare, Table, Bell, Loader, LayoutDashboard, Lock } from 'lucide-react';

const navGroups = [
  {
    title: 'Overview',
    items: [
      { id: '/', label: 'Get Started', icon: Home },
    ]
  },
  {
    title: 'Foundations',
    items: [
      { id: '/foundations/colors', label: 'Colors', icon: Palette },
      { id: '/foundations/typography', label: 'Typography', icon: Type },
      { id: '/foundations/spacing', label: 'Spacing & Layout', icon: Layout },
    ]
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
    ]
  },
  {
    title: 'Prototypes',
    items: [
      { id: '/prototypes/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: '/prototypes/auth', label: 'Auth Flow', icon: Lock },
    ]
  }
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 flex-shrink-0 border-r bg-muted/30 flex flex-col h-screen overflow-y-auto">
      <div className="p-6 border-b">
        <h2 className="font-bold text-lg text-primary">BPS Kaltara</h2>
        <p className="text-xs text-muted-foreground">Design System v2.1.0</p>
      </div>
      
      <nav className="p-4 space-y-8 flex-1">
        {navGroups.map((group, i) => (
          <div key={i}>
            <h3 className="mb-3 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {group.title}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = location.pathname === item.id;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.id}
                    to={item.id}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                      isActive 
                        ? "bg-primary text-primary-foreground font-medium" 
                        : "text-foreground hover:bg-muted hover:text-primary"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="p-4 text-xs text-center text-muted-foreground border-t">
        Developed for internal applications.
      </div>
    </aside>
  );
}
