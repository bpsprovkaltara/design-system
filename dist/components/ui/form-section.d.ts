import * as React from 'react';
export interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description?: string;
    requiredCount?: number;
    completedCount?: number;
    action?: React.ReactNode;
}
export declare function FormSection({ title, description, requiredCount, completedCount, action, className, children, ...props }: FormSectionProps): import("react/jsx-runtime").JSX.Element;
