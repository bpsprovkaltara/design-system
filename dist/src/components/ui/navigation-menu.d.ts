import * as React from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
declare function NavigationMenu({ className, children, ref, ...props }: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare namespace NavigationMenu {
    var displayName: string | undefined;
}
declare function NavigationMenuList({ className, ref, ...props }: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.List>): import("react/jsx-runtime").JSX.Element;
declare namespace NavigationMenuList {
    var displayName: string | undefined;
}
declare const NavigationMenuItem: React.ForwardRefExoticComponent<NavigationMenuPrimitive.NavigationMenuItemProps & React.RefAttributes<HTMLLIElement>>;
declare const navigationMenuTriggerStyle: (props?: import('class-variance-authority/types').ClassProp | undefined) => string;
declare function NavigationMenuTrigger({ className, children, ref, ...props }: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
declare namespace NavigationMenuTrigger {
    var displayName: string | undefined;
}
declare function NavigationMenuContent({ className, ref, ...props }: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
declare namespace NavigationMenuContent {
    var displayName: string | undefined;
}
declare const NavigationMenuLink: React.ForwardRefExoticComponent<NavigationMenuPrimitive.NavigationMenuLinkProps & React.RefAttributes<HTMLAnchorElement>>;
declare function NavigationMenuViewport({ className, ref, ...props }: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Viewport>): import("react/jsx-runtime").JSX.Element;
declare namespace NavigationMenuViewport {
    var displayName: string | undefined;
}
declare function NavigationMenuIndicator({ className, ref, ...props }: React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Indicator>): import("react/jsx-runtime").JSX.Element;
declare namespace NavigationMenuIndicator {
    var displayName: string | undefined;
}
export { navigationMenuTriggerStyle, NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent, NavigationMenuTrigger, NavigationMenuLink, NavigationMenuIndicator, NavigationMenuViewport, };
