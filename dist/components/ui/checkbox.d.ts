import { Checkbox as CheckboxPrimitive } from 'radix-ui';
import * as React from 'react';
type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root> & {
    indeterminate?: boolean;
};
declare function Checkbox({ className, indeterminate, ...props }: CheckboxProps): import("react/jsx-runtime").JSX.Element;
export { Checkbox };
