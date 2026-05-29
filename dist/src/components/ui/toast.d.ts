import { VariantProps } from 'class-variance-authority';
import { Toast as ToastPrimitives } from 'radix-ui';
import * as React from 'react';
declare function ToastProvider({ ...props }: React.ComponentProps<typeof ToastPrimitives.Provider>): import("react/jsx-runtime").JSX.Element;
declare function ToastViewport({ className, ...props }: React.ComponentProps<typeof ToastPrimitives.Viewport>): import("react/jsx-runtime").JSX.Element;
declare const toastVariants: (props?: ({
    variant?: "default" | "destructive" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
declare function Toast({ className, variant, ...props }: React.ComponentProps<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>): import("react/jsx-runtime").JSX.Element;
declare function ToastAction({ className, ...props }: React.ComponentProps<typeof ToastPrimitives.Action>): import("react/jsx-runtime").JSX.Element;
declare function ToastClose({ className, ...props }: React.ComponentProps<typeof ToastPrimitives.Close>): import("react/jsx-runtime").JSX.Element;
declare function ToastTitle({ className, ...props }: React.ComponentProps<typeof ToastPrimitives.Title>): import("react/jsx-runtime").JSX.Element;
declare function ToastDescription({ className, ...props }: React.ComponentProps<typeof ToastPrimitives.Description>): import("react/jsx-runtime").JSX.Element;
type ToastProps = React.ComponentProps<typeof Toast>;
type ToastActionElement = React.ReactElement<typeof ToastAction>;
export { type ToastProps, type ToastActionElement, ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction, };
