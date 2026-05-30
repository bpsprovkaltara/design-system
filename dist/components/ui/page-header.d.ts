import * as React from 'react';
interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description?: string;
    action?: React.ReactNode;
}
export declare function PageHeader({ title, description, action, className, ...props }: PageHeaderProps): import("react/jsx-runtime").JSX.Element;
export {};
