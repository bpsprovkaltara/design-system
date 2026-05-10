import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
declare const Form: <TFieldValues extends FieldValues, TContext = any, TTransformedValues = TFieldValues>(props: import('react-hook-form').FormProviderProps<TFieldValues, TContext, TTransformedValues>) => React.JSX.Element;
declare const FormField: <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({ ...props }: ControllerProps<TFieldValues, TName>) => import("react/jsx-runtime").JSX.Element;
declare const useFormField: () => {
    invalid: boolean;
    isDirty: boolean;
    isTouched: boolean;
    isValidating: boolean;
    error?: import('react-hook-form').FieldError;
    id: string;
    name: string;
    formItemId: string;
    formDescriptionId: string;
    formMessageId: string;
};
declare function FormItem({ className, ref, ...props }: React.ComponentPropsWithRef<'div'>): import("react/jsx-runtime").JSX.Element;
declare namespace FormItem {
    var displayName: string;
}
declare function FormLabel({ className, ref, ...props }: React.ComponentPropsWithRef<typeof LabelPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare namespace FormLabel {
    var displayName: string;
}
declare function FormControl({ ref: _ref, ...props }: React.ComponentPropsWithRef<'div'>): import("react/jsx-runtime").JSX.Element;
declare namespace FormControl {
    var displayName: string;
}
declare function FormDescription({ className, ref, ...props }: React.ComponentPropsWithRef<'p'>): import("react/jsx-runtime").JSX.Element;
declare namespace FormDescription {
    var displayName: string;
}
declare function FormMessage({ className, children, ref, ...props }: React.ComponentPropsWithRef<'p'>): import("react/jsx-runtime").JSX.Element | null;
declare namespace FormMessage {
    var displayName: string;
}
export { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, useFormField };
