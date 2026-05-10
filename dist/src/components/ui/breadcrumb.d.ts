import * as React from 'react';
type BreadcrumbProps = React.ComponentPropsWithRef<'nav'> & {
    separator?: React.ReactNode;
};
declare function Breadcrumb({ ref, ...props }: BreadcrumbProps): import("react/jsx-runtime").JSX.Element;
declare namespace Breadcrumb {
    var displayName: string;
}
declare function BreadcrumbList({ className, ref, ...props }: React.ComponentPropsWithRef<'ol'>): import("react/jsx-runtime").JSX.Element;
declare namespace BreadcrumbList {
    var displayName: string;
}
declare function BreadcrumbItem({ className, ref, ...props }: React.ComponentPropsWithRef<'li'>): import("react/jsx-runtime").JSX.Element;
declare namespace BreadcrumbItem {
    var displayName: string;
}
type BreadcrumbLinkProps = React.ComponentPropsWithRef<'a'> & {
    asChild?: boolean;
};
declare function BreadcrumbLink({ asChild: _asChild, className, ref, ...props }: BreadcrumbLinkProps): import("react/jsx-runtime").JSX.Element;
declare namespace BreadcrumbLink {
    var displayName: string;
}
declare function BreadcrumbPage({ className, ref, ...props }: React.ComponentPropsWithRef<'span'>): import("react/jsx-runtime").JSX.Element;
declare namespace BreadcrumbPage {
    var displayName: string;
}
declare const BreadcrumbSeparator: {
    ({ children, className, ...props }: React.ComponentProps<"li">): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const BreadcrumbEllipsis: {
    ({ className, ...props }: React.ComponentProps<"span">): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis, };
