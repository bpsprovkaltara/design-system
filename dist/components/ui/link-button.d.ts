import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from './button-variants';
import * as React from 'react';
type LinkButtonBaseProps = VariantProps<typeof buttonVariants> & {
    className?: string;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
};
type AnchorLinkButtonProps = LinkButtonBaseProps & Omit<React.ComponentProps<'a'>, keyof LinkButtonBaseProps | 'asChild'> & {
    asChild?: false;
};
type SlottedLinkButtonProps = LinkButtonBaseProps & Omit<React.HTMLAttributes<HTMLElement>, keyof LinkButtonBaseProps | 'href'> & React.RefAttributes<HTMLElement> & {
    asChild: true;
    children: React.ReactNode;
};
export type LinkButtonProps = AnchorLinkButtonProps | SlottedLinkButtonProps;
declare function LinkButton({ className, variant, size, asChild, iconLeft, iconRight, children, ...props }: LinkButtonProps): import("react/jsx-runtime").JSX.Element;
export { LinkButton };
