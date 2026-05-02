import * as React from 'react';
interface BpsFormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description?: string;
    requiredCount?: number;
    completedCount?: number;
    action?: React.ReactNode;
}
export declare function BpsFormSection({ title, description, requiredCount, completedCount, action, className, children, ...props }: BpsFormSectionProps): import("react/jsx-runtime").JSX.Element;
export {};
