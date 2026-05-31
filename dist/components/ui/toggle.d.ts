import { VariantProps } from 'class-variance-authority';
import { toggleVariants } from './toggle-variants';
import * as React from 'react';
export type ToggleProps = Omit<React.ComponentProps<'button'>, 'value'> & VariantProps<typeof toggleVariants> & {
    pressed?: boolean;
    defaultPressed?: boolean;
    onPressedChange?: (pressed: boolean) => void;
};
declare function Toggle({ className, variant, size, pressed, defaultPressed, onPressedChange, onClick, disabled, ...props }: ToggleProps): import("react/jsx-runtime").JSX.Element;
export { Toggle, toggleVariants };
