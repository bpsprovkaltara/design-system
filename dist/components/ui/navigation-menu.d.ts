import { NavigationMenu as NavigationMenuPrimitive } from 'radix-ui';
import { navigationMenuTriggerStyle } from './navigation-menu-variants';
import * as React from 'react';
declare function NavigationMenu({ className, children, viewport, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
    viewport?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare function NavigationMenuList({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.List>): import("react/jsx-runtime").JSX.Element;
declare function NavigationMenuItem({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Item>): import("react/jsx-runtime").JSX.Element;
declare function NavigationMenuTrigger({ className, children, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
declare function NavigationMenuContent({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
declare function NavigationMenuViewport({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>): import("react/jsx-runtime").JSX.Element;
declare function NavigationMenuLink({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Link>): import("react/jsx-runtime").JSX.Element;
declare function NavigationMenuIndicator({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>): import("react/jsx-runtime").JSX.Element;
export { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent, NavigationMenuTrigger, NavigationMenuLink, NavigationMenuIndicator, NavigationMenuViewport, navigationMenuTriggerStyle, };
