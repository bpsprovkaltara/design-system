import * as React from 'react';
export interface ValidationItem {
    id: string;
    section: string;
    message: string;
}
interface ValidationSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
    items: ValidationItem[];
    onNavigate?: (id: string) => void;
}
export declare function ValidationSummary({ items, onNavigate, className, ...props }: ValidationSummaryProps): import("react/jsx-runtime").JSX.Element;
export {};
