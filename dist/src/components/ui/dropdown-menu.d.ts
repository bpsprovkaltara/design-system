import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
declare const DropdownMenu: React.FC<DropdownMenuPrimitive.DropdownMenuProps>;
declare const DropdownMenuTrigger: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DropdownMenuGroup: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuPortal: React.FC<DropdownMenuPrimitive.DropdownMenuPortalProps>;
declare const DropdownMenuSub: React.FC<DropdownMenuPrimitive.DropdownMenuSubProps>;
declare const DropdownMenuRadioGroup: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuRadioGroupProps & React.RefAttributes<HTMLDivElement>>;
type DropdownMenuSubTriggerProps = React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
};
declare function DropdownMenuSubTrigger({ className, inset, children, ref, ...props }: DropdownMenuSubTriggerProps): import("react/jsx-runtime").JSX.Element;
declare namespace DropdownMenuSubTrigger {
    var displayName: string | undefined;
}
declare function DropdownMenuSubContent({ className, ref, ...props }: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.SubContent>): import("react/jsx-runtime").JSX.Element;
declare namespace DropdownMenuSubContent {
    var displayName: string | undefined;
}
declare function DropdownMenuContent({ className, sideOffset, ref, ...props }: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
declare namespace DropdownMenuContent {
    var displayName: string | undefined;
}
type DropdownMenuItemProps = React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
};
declare function DropdownMenuItem({ className, inset, ref, ...props }: DropdownMenuItemProps): import("react/jsx-runtime").JSX.Element;
declare namespace DropdownMenuItem {
    var displayName: string | undefined;
}
declare function DropdownMenuCheckboxItem({ className, children, checked, ref, ...props }: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.CheckboxItem>): import("react/jsx-runtime").JSX.Element;
declare namespace DropdownMenuCheckboxItem {
    var displayName: string | undefined;
}
declare function DropdownMenuRadioItem({ className, children, ref, ...props }: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.RadioItem>): import("react/jsx-runtime").JSX.Element;
declare namespace DropdownMenuRadioItem {
    var displayName: string | undefined;
}
type DropdownMenuLabelProps = React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
};
declare function DropdownMenuLabel({ className, inset, ref, ...props }: DropdownMenuLabelProps): import("react/jsx-runtime").JSX.Element;
declare namespace DropdownMenuLabel {
    var displayName: string | undefined;
}
declare function DropdownMenuSeparator({ className, ref, ...props }: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Separator>): import("react/jsx-runtime").JSX.Element;
declare namespace DropdownMenuSeparator {
    var displayName: string | undefined;
}
declare const DropdownMenuShortcut: {
    ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuGroup, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuRadioGroup, };
