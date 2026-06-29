import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from './button-variants';
import * as React from 'react';
type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
    className?: string;
    loading?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
};
type NativeButtonProps = ButtonBaseProps & Omit<React.ComponentProps<'button'>, keyof ButtonBaseProps | 'asChild'> & {
    asChild?: false;
};
type SlottedButtonProps = ButtonBaseProps & Omit<React.HTMLAttributes<HTMLElement>, keyof ButtonBaseProps | 'disabled'> & React.RefAttributes<HTMLElement> & {
    asChild: true;
    children: React.ReactNode;
    disabled?: boolean;
};
export type ButtonProps = NativeButtonProps | SlottedButtonProps;
declare function Button({ className, variant, size, asChild, loading, iconLeft, iconRight, children, disabled, onClick, onClickCapture, ...props }: ButtonProps): import("react/jsx-runtime").JSX.Element;
export { Button, buttonVariants };
