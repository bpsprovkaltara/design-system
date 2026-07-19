import { AppSidebarNavGroup, AppSidebarNavItem, AppSidebarProps } from './app-sidebar';
import * as React from 'react';
export interface AppShellProps {
    /** Sidebar nav groups (desktop rail + mobile sheet). */
    groups: AppSidebarNavGroup[];
    activeId?: string;
    /** Controlled collapse for the desktop sidebar. */
    collapsed?: boolean;
    defaultCollapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
    onNavigate?: (item: AppSidebarNavItem) => void;
    renderLink?: AppSidebarProps['renderLink'];
    logo?: React.ReactNode;
    sidebarFooter?: React.ReactNode;
    /** Desktop topbar leading slot (e.g. breadcrumbs). */
    topbarStart?: React.ReactNode;
    /** Topbar trailing slot (actions / user / notifications). */
    topbarEnd?: React.ReactNode;
    /** Optional title shown in the mobile topbar when `topbarStart` is empty. */
    appTitle?: string;
    /** Main content. */
    children: React.ReactNode;
    className?: string;
    mainClassName?: string;
    /** Hide the sticky topbar (desktop + mobile chrome still keeps the menu trigger). */
    hideTopbar?: boolean;
}
export declare function AppShell({ groups, activeId, collapsed: collapsedProp, defaultCollapsed, onCollapsedChange, onNavigate, renderLink, logo, sidebarFooter, topbarStart, topbarEnd, appTitle, children, className, mainClassName, hideTopbar, }: AppShellProps): import("react/jsx-runtime").JSX.Element;
