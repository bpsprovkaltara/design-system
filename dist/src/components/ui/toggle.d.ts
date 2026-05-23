import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
declare const toggleVariants: (props?: ({
    variant?: "default" | "outline" | "ghost" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export type ToggleProps = Omit<React.ComponentPropsWithRef<'button'>, 'value'> & VariantProps<typeof toggleVariants> & {
    pressed?: boolean;
    defaultPressed?: boolean;
    onPressedChange?: (pressed: boolean) => void;
};
declare function Toggle({ className, variant, size, pressed, defaultPressed, onPressedChange, onClick, disabled, ref, ...props }: ToggleProps): import("react/jsx-runtime").JSX.Element;
export { Toggle, toggleVariants };
