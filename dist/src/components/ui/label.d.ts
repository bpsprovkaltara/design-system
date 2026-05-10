import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
declare const labelVariants: (props?: import('class-variance-authority/types').ClassProp | undefined) => string;
declare function Label(props: React.ComponentProps<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>): import("react/jsx-runtime").JSX.Element;
declare namespace Label {
    var displayName: string | undefined;
}
export { Label };
