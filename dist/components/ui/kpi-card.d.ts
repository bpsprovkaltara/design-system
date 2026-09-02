import * as React from 'react';
export type KpiAccent = 'brand' | 'accent' | 'success' | 'info' | 'warning';
export interface KpiCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    value: string;
    helper?: string;
    icon?: React.ReactNode;
    /**
     * Tema aksen opsional (bar atas + chip ikon).
     * Tanpa `accent`, tampilan default `border-l-4 border-l-primary` dipertahankan.
     */
    accent?: KpiAccent;
}
export declare function KpiCard({ title, value, helper, icon, accent, className, ...props }: KpiCardProps): import("react/jsx-runtime").JSX.Element;
