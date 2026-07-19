import * as React from 'react';
export interface NumberFieldProps extends Omit<React.ComponentProps<'input'>, 'type' | 'value' | 'onChange' | 'defaultValue'> {
    value?: number | null;
    defaultValue?: number | null;
    onChange?: (value: number | null) => void;
    label?: string;
    unit?: string;
    allowDecimal?: boolean;
}
export declare function NumberField({ value, defaultValue, onChange, label, unit, allowDecimal, className, id, disabled, placeholder, ...props }: NumberFieldProps): import("react/jsx-runtime").JSX.Element;
