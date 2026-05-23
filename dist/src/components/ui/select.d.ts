import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
declare const Select: React.FC<SelectPrimitive.SelectProps>;
declare const SelectGroup: React.ForwardRefExoticComponent<SelectPrimitive.SelectGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const SelectValue: React.ForwardRefExoticComponent<SelectPrimitive.SelectValueProps & React.RefAttributes<HTMLSpanElement>>;
declare function SelectTrigger({ className, children, ref, ...props }: React.ComponentPropsWithRef<typeof SelectPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
declare namespace SelectTrigger {
    var displayName: string | undefined;
}
declare function SelectScrollUpButton({ className, ref, ...props }: React.ComponentPropsWithRef<typeof SelectPrimitive.ScrollUpButton>): import("react/jsx-runtime").JSX.Element;
declare namespace SelectScrollUpButton {
    var displayName: string | undefined;
}
declare function SelectScrollDownButton({ className, ref, ...props }: React.ComponentPropsWithRef<typeof SelectPrimitive.ScrollDownButton>): import("react/jsx-runtime").JSX.Element;
declare namespace SelectScrollDownButton {
    var displayName: string | undefined;
}
declare function SelectContent({ className, children, position, ref, ...props }: React.ComponentPropsWithRef<typeof SelectPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
declare namespace SelectContent {
    var displayName: string | undefined;
}
declare function SelectLabel({ className, ref, ...props }: React.ComponentPropsWithRef<typeof SelectPrimitive.Label>): import("react/jsx-runtime").JSX.Element;
declare namespace SelectLabel {
    var displayName: string | undefined;
}
declare function SelectItem({ className, children, ref, ...props }: React.ComponentPropsWithRef<typeof SelectPrimitive.Item>): import("react/jsx-runtime").JSX.Element;
declare namespace SelectItem {
    var displayName: string | undefined;
}
declare function SelectSeparator({ className, ref, ...props }: React.ComponentPropsWithRef<typeof SelectPrimitive.Separator>): import("react/jsx-runtime").JSX.Element;
declare namespace SelectSeparator {
    var displayName: string | undefined;
}
export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton, };
