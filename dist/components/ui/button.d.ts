import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from './button-variants';
import * as React from 'react';
export type ButtonProps = VariantProps<typeof buttonVariants> & React.ComponentProps<'button'> & {
    asChild?: boolean;
    loading?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
};
declare function Button({ className, variant, size, asChild, loading, iconLeft, iconRight, children, disabled, ...props }: ButtonProps): import("react/jsx-runtime").JSX.Element;
export { Button, buttonVariants };
