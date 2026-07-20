import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from './button-variants';
import * as React from 'react';
declare function Pagination({ className, ...props }: React.ComponentProps<'nav'>): import("react/jsx-runtime").JSX.Element;
declare function PaginationContent({ className, ...props }: React.ComponentProps<'ul'>): import("react/jsx-runtime").JSX.Element;
declare function PaginationItem({ ...props }: React.ComponentProps<'li'>): import("react/jsx-runtime").JSX.Element;
/** Props handed to a custom `renderLink` — spread directly onto the consumer's Link. */
export type PaginationLinkRenderProps = React.ComponentProps<'a'> & {
    isActive?: boolean;
};
type PaginationLinkProps = {
    isActive?: boolean;
    /**
     * Render a framework link (Next.js `Link`, TanStack Router `Link`, dll) instead of
     * a plain `<a>`. Menerima props sudah lengkap (className tombol, href, onClick,
     * aria-current, isActive) — cukup di-spread ke komponen Link milik konsumen.
     */
    renderLink?: (props: PaginationLinkRenderProps) => React.ReactNode;
} & Pick<VariantProps<typeof buttonVariants>, 'size'> & React.ComponentProps<'a'>;
declare function PaginationLink({ className, isActive, size, renderLink, ...props }: PaginationLinkProps): import("react/jsx-runtime").JSX.Element;
declare function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>): import("react/jsx-runtime").JSX.Element;
declare function PaginationNext({ className, ...props }: React.ComponentProps<typeof PaginationLink>): import("react/jsx-runtime").JSX.Element;
declare function PaginationEllipsis({ className, ...props }: React.ComponentProps<'span'>): import("react/jsx-runtime").JSX.Element;
export { Pagination, PaginationContent, PaginationLink, PaginationItem, PaginationPrevious, PaginationNext, PaginationEllipsis, };
export type { PaginationLinkProps };
