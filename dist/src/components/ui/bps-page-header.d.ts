import * as React from 'react';
interface BpsPageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description?: string;
    action?: React.ReactNode;
}
export declare function BpsPageHeader({ title, description, action, className, ...props }: BpsPageHeaderProps): import("react/jsx-runtime").JSX.Element;
export {};
