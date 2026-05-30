import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
declare const alertVariants: (props?: ({
    variant?: "default" | "info" | "success" | "warning" | "danger" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
type AlertProps = React.ComponentProps<'div'> & VariantProps<typeof alertVariants> & {
    showIcon?: boolean;
};
declare function Alert({ className, variant, showIcon, children, ...props }: AlertProps): import("react/jsx-runtime").JSX.Element;
declare function AlertTitle({ className, ...props }: React.ComponentProps<'h5'>): import("react/jsx-runtime").JSX.Element;
declare function AlertDescription({ className, ...props }: React.ComponentProps<'div'>): import("react/jsx-runtime").JSX.Element;
export { Alert, AlertTitle, AlertDescription };
