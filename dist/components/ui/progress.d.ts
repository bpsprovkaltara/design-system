import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
declare const progressTrackVariants: (props?: ({
    size?: "default" | "sm" | "lg" | null | undefined;
} & import('class-variance-authority/dist/types').ClassProp) | undefined) => string;
declare const progressIndicatorVariants: (props?: ({
    intent?: "default" | "success" | "warning" | "danger" | null | undefined;
} & import('class-variance-authority/dist/types').ClassProp) | undefined) => string;
interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>, VariantProps<typeof progressTrackVariants>, VariantProps<typeof progressIndicatorVariants> {
}
declare const Progress: React.ForwardRefExoticComponent<ProgressProps & React.RefAttributes<HTMLDivElement>>;
export { Progress };
