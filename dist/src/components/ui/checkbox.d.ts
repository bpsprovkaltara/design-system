import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root> & {
    indeterminate?: boolean;
};
declare function Checkbox({ className, indeterminate, ref, ...props }: CheckboxProps): import("react/jsx-runtime").JSX.Element;
declare namespace Checkbox {
    var displayName: string | undefined;
}
export { Checkbox };
