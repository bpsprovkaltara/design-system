import * as React from 'react';
export interface BpsValidationItem {
    id: string;
    section: string;
    message: string;
}
interface BpsValidationSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
    items: BpsValidationItem[];
    onNavigate?: (id: string) => void;
}
export declare function BpsValidationSummary({ items, onNavigate, className, ...props }: BpsValidationSummaryProps): import("react/jsx-runtime").JSX.Element;
export {};
