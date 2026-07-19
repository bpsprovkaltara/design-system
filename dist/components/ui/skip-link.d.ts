import * as React from 'react';
export interface SkipLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href?: string;
    label?: string;
}
export declare function SkipLink({ href, label, className, ...props }: SkipLinkProps): import("react/jsx-runtime").JSX.Element;
