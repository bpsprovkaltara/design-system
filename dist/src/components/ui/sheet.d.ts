import { VariantProps } from 'class-variance-authority';
import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
declare const Sheet: React.FC<SheetPrimitive.DialogProps>;
declare const SheetTrigger: React.ForwardRefExoticComponent<SheetPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const SheetClose: React.ForwardRefExoticComponent<SheetPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const SheetPortal: React.FC<SheetPrimitive.DialogPortalProps>;
declare function SheetOverlay({ className, ref, ...props }: React.ComponentPropsWithRef<typeof SheetPrimitive.Overlay>): import("react/jsx-runtime").JSX.Element;
declare namespace SheetOverlay {
    var displayName: string | undefined;
}
declare const sheetVariants: (props?: ({
    side?: "left" | "right" | "top" | "bottom" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
interface SheetContentProps extends React.ComponentPropsWithRef<typeof SheetPrimitive.Content>, VariantProps<typeof sheetVariants> {
}
declare function SheetContent({ side, className, children, ref, ...props }: SheetContentProps): import("react/jsx-runtime").JSX.Element;
declare namespace SheetContent {
    var displayName: string | undefined;
}
declare const SheetHeader: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const SheetFooter: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare function SheetTitle({ className, ref, ...props }: React.ComponentPropsWithRef<typeof SheetPrimitive.Title>): import("react/jsx-runtime").JSX.Element;
declare namespace SheetTitle {
    var displayName: string | undefined;
}
declare function SheetDescription({ className, ref, ...props }: React.ComponentPropsWithRef<typeof SheetPrimitive.Description>): import("react/jsx-runtime").JSX.Element;
declare namespace SheetDescription {
    var displayName: string | undefined;
}
export { Sheet, SheetPortal, SheetOverlay, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, };
