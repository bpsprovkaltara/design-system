import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "success" | "secondary" | "destructive" | "outline" | "tertiary" | "ghost" | "danger-outline" | null | undefined;
    size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-sm" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export type ButtonProps = VariantProps<typeof buttonVariants> & React.ComponentPropsWithRef<'button'> & {
    asChild?: boolean;
    loading?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
};
declare function Button({ className, variant, size, asChild, loading, iconLeft, iconRight, children, disabled, ref, ...props }: ButtonProps): import("react/jsx-runtime").JSX.Element;
export { Button, buttonVariants };
