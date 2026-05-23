import { DialogProps } from '@radix-ui/react-dialog';
import { Command as CommandPrimitive } from 'cmdk';
import * as React from 'react';
declare function Command({ className, ref, ...props }: React.ComponentPropsWithRef<typeof CommandPrimitive>): import("react/jsx-runtime").JSX.Element;
declare namespace Command {
    var displayName: string | undefined;
}
declare const CommandDialog: ({ children, ...props }: DialogProps) => import("react/jsx-runtime").JSX.Element;
declare function CommandInput({ className, ref, ...props }: React.ComponentPropsWithRef<typeof CommandPrimitive.Input>): import("react/jsx-runtime").JSX.Element;
declare namespace CommandInput {
    var displayName: string | undefined;
}
declare function CommandList({ className, ref, ...props }: React.ComponentPropsWithRef<typeof CommandPrimitive.List>): import("react/jsx-runtime").JSX.Element;
declare namespace CommandList {
    var displayName: string | undefined;
}
declare function CommandEmpty({ ref, ...props }: React.ComponentPropsWithRef<typeof CommandPrimitive.Empty>): import("react/jsx-runtime").JSX.Element;
declare namespace CommandEmpty {
    var displayName: string | undefined;
}
declare function CommandGroup({ className, ref, ...props }: React.ComponentPropsWithRef<typeof CommandPrimitive.Group>): import("react/jsx-runtime").JSX.Element;
declare namespace CommandGroup {
    var displayName: string | undefined;
}
declare function CommandSeparator({ className, ref, ...props }: React.ComponentPropsWithRef<typeof CommandPrimitive.Separator>): import("react/jsx-runtime").JSX.Element;
declare namespace CommandSeparator {
    var displayName: string | undefined;
}
declare function CommandItem({ className, ref, ...props }: React.ComponentPropsWithRef<typeof CommandPrimitive.Item>): import("react/jsx-runtime").JSX.Element;
declare namespace CommandItem {
    var displayName: string | undefined;
}
declare const CommandShortcut: {
    ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator, };
