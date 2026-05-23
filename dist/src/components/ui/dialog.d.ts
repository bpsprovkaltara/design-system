import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
declare const Dialog: React.FC<DialogPrimitive.DialogProps>;
declare const DialogTrigger: React.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DialogPortal: React.FC<DialogPrimitive.DialogPortalProps>;
declare const DialogClose: React.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare function DialogOverlay({ className, ref, ...props }: React.ComponentPropsWithRef<typeof DialogPrimitive.Overlay>): import("react/jsx-runtime").JSX.Element;
declare namespace DialogOverlay {
    var displayName: string | undefined;
}
declare function DialogContent({ className, children, ref, ...props }: React.ComponentPropsWithRef<typeof DialogPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
declare namespace DialogContent {
    var displayName: string | undefined;
}
declare const DialogHeader: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const DialogFooter: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare function DialogTitle({ className, ref, ...props }: React.ComponentPropsWithRef<typeof DialogPrimitive.Title>): import("react/jsx-runtime").JSX.Element;
declare namespace DialogTitle {
    var displayName: string | undefined;
}
declare function DialogDescription({ className, ref, ...props }: React.ComponentPropsWithRef<typeof DialogPrimitive.Description>): import("react/jsx-runtime").JSX.Element;
declare namespace DialogDescription {
    var displayName: string | undefined;
}
export { Dialog, DialogPortal, DialogOverlay, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, };
