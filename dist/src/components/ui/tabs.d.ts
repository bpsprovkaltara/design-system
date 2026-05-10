import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
declare const Tabs: React.ForwardRefExoticComponent<TabsPrimitive.TabsProps & React.RefAttributes<HTMLDivElement>>;
declare function TabsList({ className, ref, ...props }: React.ComponentPropsWithRef<typeof TabsPrimitive.List>): import("react/jsx-runtime").JSX.Element;
declare namespace TabsList {
    var displayName: string | undefined;
}
declare function TabsTrigger({ className, ref, ...props }: React.ComponentPropsWithRef<typeof TabsPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
declare namespace TabsTrigger {
    var displayName: string | undefined;
}
declare function TabsContent({ className, ref, ...props }: React.ComponentPropsWithRef<typeof TabsPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
declare namespace TabsContent {
    var displayName: string | undefined;
}
export { Tabs, TabsList, TabsTrigger, TabsContent };
