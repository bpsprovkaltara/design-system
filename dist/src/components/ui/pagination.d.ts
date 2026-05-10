import { ButtonProps } from './button';
import * as React from "react";
declare const Pagination: {
    ({ className, ...props }: React.ComponentProps<"nav">): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare function PaginationContent({ className, ref, ...props }: React.ComponentPropsWithRef<"ul">): import("react/jsx-runtime").JSX.Element;
declare namespace PaginationContent {
    var displayName: string;
}
declare function PaginationItem({ className, ref, ...props }: React.ComponentPropsWithRef<"li">): import("react/jsx-runtime").JSX.Element;
declare namespace PaginationItem {
    var displayName: string;
}
type PaginationLinkProps = {
    isActive?: boolean;
} & Pick<ButtonProps, "size"> & React.ComponentProps<"a">;
declare const PaginationLink: {
    ({ className, isActive, size, ...props }: PaginationLinkProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const PaginationPrevious: {
    ({ className, ...props }: React.ComponentProps<typeof PaginationLink>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const PaginationNext: {
    ({ className, ...props }: React.ComponentProps<typeof PaginationLink>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const PaginationEllipsis: {
    ({ className, ...props }: React.ComponentProps<"span">): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export { Pagination, PaginationContent, PaginationLink, PaginationItem, PaginationPrevious, PaginationNext, PaginationEllipsis, };
