import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
declare const TooltipProvider: React.FC<TooltipPrimitive.TooltipProviderProps>;
declare const Tooltip: React.FC<TooltipPrimitive.TooltipProps>;
declare const TooltipTrigger: React.ForwardRefExoticComponent<TooltipPrimitive.TooltipTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare function TooltipContent(props: React.ComponentProps<typeof TooltipPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
declare namespace TooltipContent {
    var displayName: string | undefined;
}
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
