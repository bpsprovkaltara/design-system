import * as React from 'react';
export interface AppTopbarProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * @deprecated Prefer `start` / children slots. Kept for backward compatibility
     * with the v4 stub that only accepted a title string.
     */
    appTitle?: string;
    /** Leading content (breadcrumbs, page context, mobile menu trigger). */
    start?: React.ReactNode;
    /** Trailing content (actions, notifications, user menu). */
    end?: React.ReactNode;
}
export declare function AppTopbar({ appTitle, start, end, className, children, ...props }: AppTopbarProps): import("react/jsx-runtime").JSX.Element;
