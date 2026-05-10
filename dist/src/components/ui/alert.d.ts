import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
declare const alertVariants: (props?: ({
    variant?: "default" | "info" | "success" | "warning" | "danger" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
type AlertProps = React.ComponentPropsWithRef<'div'> & VariantProps<typeof alertVariants> & {
    showIcon?: boolean;
};
declare function Alert({ className, variant, showIcon, children, ref, ...props }: AlertProps): import("react/jsx-runtime").JSX.Element;
declare namespace Alert {
    var displayName: string;
}
declare function AlertTitle({ className, ref, ...props }: React.ComponentPropsWithRef<'h5'>): import("react/jsx-runtime").JSX.Element;
declare namespace AlertTitle {
    var displayName: string;
}
declare function AlertDescription({ className, ref, ...props }: React.ComponentPropsWithRef<'div'>): import("react/jsx-runtime").JSX.Element;
declare namespace AlertDescription {
    var displayName: string;
}
export { Alert, AlertTitle, AlertDescription };
