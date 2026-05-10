import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
declare const Accordion: React.ForwardRefExoticComponent<(AccordionPrimitive.AccordionSingleProps | AccordionPrimitive.AccordionMultipleProps) & React.RefAttributes<HTMLDivElement>>;
declare function AccordionItem({ className, ref, ...props }: React.ComponentPropsWithRef<typeof AccordionPrimitive.Item>): import("react/jsx-runtime").JSX.Element;
declare namespace AccordionItem {
    var displayName: string;
}
declare function AccordionTrigger({ className, children, ref, ...props }: React.ComponentPropsWithRef<typeof AccordionPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
declare namespace AccordionTrigger {
    var displayName: string | undefined;
}
declare function AccordionContent({ className, children, ref, ...props }: React.ComponentPropsWithRef<typeof AccordionPrimitive.Content>): import("react/jsx-runtime").JSX.Element;
declare namespace AccordionContent {
    var displayName: string | undefined;
}
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
