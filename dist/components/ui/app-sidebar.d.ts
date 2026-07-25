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
    /**
     * @deprecated The collapse toggle now lives in `AppShell`, rendered beside the
     * rail so it can straddle the sidebar edge without being clipped. Accepted for
     * backward compatibility but ignored — pass it to `AppShell` instead.
     */
    onCollapsedChange?: (collapsed: boolean) => void;
    /** Called when a nav item is activated (useful for closing mobile sheet). */
    onNavigate?: (item: AppSidebarNavItem) => void;
    /**
     * Optional link renderer for framework routers (Next.js `Link`, TanStack Router, etc.).
     * When omitted, items with `href` render as `<a>`; otherwise as `<button>`.
     *
     * The returned element is cloned with the nav item styling, so the router's own
     * anchor carries the full-row hit area and focus ring — do not style it yourself.
     */
    renderLink?: (item: AppSidebarNavItem, children: React.ReactNode) => React.ReactNode;
    logo?: React.ReactNode;
    /** Compact brand mark rendered while the desktop rail is collapsed. */
    collapsedLogo?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    /** Suppress the width transition until the client has mounted (avoids a restore flash). */
    animate?: boolean;
    /** DOM id, so an external toggle can point `aria-controls` at the rail. */
    id?: string;
    /** Accessible label for the aside landmark. */
    'aria-label'?: string;
}
export declare function AppSidebar({ groups, activeId, collapsed, onNavigate, renderLink, logo, collapsedLogo, footer, className, animate, id, 'aria-label': ariaLabel, }: AppSidebarProps): import("react/jsx-runtime").JSX.Element;
