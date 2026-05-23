import { VariantProps } from 'class-variance-authority';
import { toggleVariants, ToggleProps } from './toggle';
import * as React from 'react';
type ToggleGroupType = 'single' | 'multiple';
type ToggleGroupValue<T extends ToggleGroupType> = T extends 'single' ? string : string[];
export type ToggleGroupProps<T extends ToggleGroupType = ToggleGroupType> = Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> & VariantProps<typeof toggleVariants> & {
    type?: T;
    value?: ToggleGroupValue<T>;
    defaultValue?: ToggleGroupValue<T>;
    disabled?: boolean;
    onValueChange?: (value: ToggleGroupValue<T>) => void;
};
declare function ToggleGroup<T extends ToggleGroupType = 'single'>({ className, type, value, defaultValue, disabled, variant, size, onValueChange, children, ref, ...props }: ToggleGroupProps<T> & {
    ref?: React.Ref<HTMLDivElement>;
}): import("react/jsx-runtime").JSX.Element;
export type ToggleGroupItemProps = Omit<ToggleProps, 'pressed' | 'defaultPressed' | 'value'> & {
    value: string;
};
declare function ToggleGroupItem({ className, value, disabled, variant, size, onClick, ref, ...props }: ToggleGroupItemProps): import("react/jsx-runtime").JSX.Element;
export { ToggleGroup, ToggleGroupItem };
