import * as React from 'react';
interface BpsKpiCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    value: string;
    helper?: string;
    icon?: React.ReactNode;
}
export declare function BpsKpiCard({ title, value, helper, icon, className, ...props }: BpsKpiCardProps): import("react/jsx-runtime").JSX.Element;
export {};
