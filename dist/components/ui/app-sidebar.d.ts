import * as React from 'react';
export interface AppSidebarNavItem {
    /** Unique id used for active matching when `href` is absent. */
    id: string;
    label: string;
    href?: string;
    icon?: React.ReactNode;
    badge?: React.ReactNode;
    /** Soft-disable the item without removing it from the list. */
    disabled?: boolean;
}
export interface AppSidebarNavGroup {
    title?: string;
    items: AppSidebarNavItem[];
}
export interface AppSidebarProps {
    groups: AppSidebarNavGroup[];
    /** Id of the active nav item. */
    activeId?: string;
    collapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
    /** Called when a nav item is activated (useful for closing mobile sheet). */
    onNavigate?: (item: AppSidebarNavItem) => void;
    /**
     * Optional link renderer for framework routers (Next.js `Link`, TanStack Router, etc.).
     * When omitted, items with `href` render as `<a>`; otherwise as `<button>`.
     */
    renderLink?: (item: AppSidebarNavItem, children: React.ReactNode) => React.ReactNode;
    logo?: React.ReactNode;
    /** Compact brand mark rendered while the desktop rail is collapsed. */
    collapsedLogo?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    /** Accessible label for the aside landmark. */
    'aria-label'?: string;
}
export declare function AppSidebar({ groups, activeId, collapsed, onCollapsedChange, onNavigate, renderLink, logo, collapsedLogo, footer, className, 'aria-label': ariaLabel, }: AppSidebarProps): import("react/jsx-runtime").JSX.Element;
