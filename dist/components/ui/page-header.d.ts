import * as React from 'react';
export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description?: string;
    action?: React.ReactNode;
    /** Class tambahan untuk elemen judul (h1), mis. font display khusus app. */
    titleClassName?: string;
    /** Class tambahan untuk elemen deskripsi. */
    descriptionClassName?: string;
}
export declare function PageHeader({ title, description, action, className, titleClassName, descriptionClassName, ...props }: PageHeaderProps): import("react/jsx-runtime").JSX.Element;
