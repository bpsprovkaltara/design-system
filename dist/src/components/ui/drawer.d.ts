import { Drawer as DrawerPrimitive } from 'vaul';
import * as React from 'react';
declare const Drawer: {
    ({ shouldScaleBackground, ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const DrawerTrigger: React.ForwardRefExoticComponent<import('@radix-ui/react-dialog').DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DrawerPortal: typeof import('vaul').Portal;
declare const DrawerClose: React.ForwardRefExoticComponent<import('@radix-ui/react-dialog').DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare function DrawerOverlay({ className, ref, ...props }: React.ComponentPropsWithRef<typeof DrawerPrimitive.Overlay>): import("react/jsx-runtime").JSX.Element;
declare namespace DrawerOverlay {
    var displayName: string | undefined;
}
declare function DrawerContent({ className, children, ref, ...props }: React.ComponentPropsWithRef<typeof DrawerPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
declare namespace DrawerContent {
    var displayName: string;
}
declare const DrawerHeader: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const DrawerFooter: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare function DrawerTitle({ className, ref, ...props }: React.ComponentPropsWithRef<typeof DrawerPrimitive.Title>): import("react/jsx-runtime").JSX.Element;
declare namespace DrawerTitle {
    var displayName: string | undefined;
}
declare function DrawerDescription({ className, ref, ...props }: React.ComponentPropsWithRef<typeof DrawerPrimitive.Description>): import("react/jsx-runtime").JSX.Element;
declare namespace DrawerDescription {
    var displayName: string | undefined;
}
export { Drawer, DrawerPortal, DrawerOverlay, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription, };
