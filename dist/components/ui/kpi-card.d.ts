import * as React from 'react';
interface KpiCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    value: string;
    helper?: string;
    icon?: React.ReactNode;
}
export declare function KpiCard({ title, value, helper, icon, className, ...props }: KpiCardProps): import("react/jsx-runtime").JSX.Element;
export {};
