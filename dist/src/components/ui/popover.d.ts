import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
declare const Popover: React.FC<PopoverPrimitive.PopoverProps>;
declare const PopoverTrigger: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const PopoverAnchor: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverAnchorProps & React.RefAttributes<HTMLDivElement>>;
declare function PopoverContent(props: React.ComponentProps<typeof PopoverPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
declare namespace PopoverContent {
    var displayName: string | undefined;
}
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
