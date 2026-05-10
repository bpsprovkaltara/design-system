import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
declare const progressTrackVariants: (props?: ({
    size?: "default" | "sm" | "lg" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
declare const progressIndicatorVariants: (props?: ({
    intent?: "default" | "success" | "warning" | "danger" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> & VariantProps<typeof progressTrackVariants> & VariantProps<typeof progressIndicatorVariants>;
declare function Progress({ className, value, size, intent, ref, ...props }: ProgressProps): import("react/jsx-runtime").JSX.Element;
declare namespace Progress {
    var displayName: string | undefined;
}
export { Progress };
