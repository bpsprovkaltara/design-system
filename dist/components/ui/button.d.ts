import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "success" | "secondary" | "destructive" | "outline" | "tertiary" | "ghost" | "danger-outline" | null | undefined;
    size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-sm" | null | undefined;
} & import('class-variance-authority/dist/types').ClassProp) | undefined) => string;
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    loading?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { Button, buttonVariants };
