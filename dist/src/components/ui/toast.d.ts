import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
declare const ToastProvider: React.FC<ToastPrimitives.ToastProviderProps>;
declare function ToastViewport({ className, ref, ...props }: React.ComponentPropsWithRef<typeof ToastPrimitives.Viewport>): import("react/jsx-runtime").JSX.Element;
declare namespace ToastViewport {
    var displayName: string | undefined;
}
declare const toastVariants: (props?: ({
    variant?: "default" | "destructive" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
declare function Toast({ className, variant, ref, ...props }: React.ComponentPropsWithRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>): import("react/jsx-runtime").JSX.Element;
declare namespace Toast {
    var displayName: string | undefined;
}
declare function ToastAction({ className, ref, ...props }: React.ComponentPropsWithRef<typeof ToastPrimitives.Action>): import("react/jsx-runtime").JSX.Element;
declare namespace ToastAction {
    var displayName: string | undefined;
}
declare function ToastClose({ className, ref, ...props }: React.ComponentPropsWithRef<typeof ToastPrimitives.Close>): import("react/jsx-runtime").JSX.Element;
declare namespace ToastClose {
    var displayName: string | undefined;
}
declare function ToastTitle({ className, ref, ...props }: React.ComponentPropsWithRef<typeof ToastPrimitives.Title>): import("react/jsx-runtime").JSX.Element;
declare namespace ToastTitle {
    var displayName: string | undefined;
}
declare function ToastDescription({ className, ref, ...props }: React.ComponentPropsWithRef<typeof ToastPrimitives.Description>): import("react/jsx-runtime").JSX.Element;
declare namespace ToastDescription {
    var displayName: string | undefined;
}
type ToastProps = React.ComponentPropsWithRef<typeof Toast>;
type ToastActionElement = React.ReactElement<typeof ToastAction>;
export { type ToastProps, type ToastActionElement, ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction, };
