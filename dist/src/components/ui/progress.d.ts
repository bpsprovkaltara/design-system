import { VariantProps } from 'class-variance-authority';
import { Progress as ProgressPrimitive } from 'radix-ui';
import * as React from 'react';
declare const progressTrackVariants: (props?: ({
    size?: "default" | "sm" | "lg" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
declare const progressIndicatorVariants: (props?: ({
    intent?: "default" | "success" | "warning" | "danger" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> & VariantProps<typeof progressTrackVariants> & VariantProps<typeof progressIndicatorVariants>;
declare function Progress({ className, value, size, intent, ...props }: ProgressProps): import("react/jsx-runtime").JSX.Element;
export { Progress };
