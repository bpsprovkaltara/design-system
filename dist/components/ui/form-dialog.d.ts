import * as React from 'react';
export interface FormDialogProps {
    title: string;
    description?: string;
    /** Uncontrolled trigger. Ignored when opening is fully controlled without a trigger. */
    trigger?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** Body; function form receives `close()` to dismiss after submit. */
    children: React.ReactNode | ((close: () => void) => React.ReactNode);
    className?: string;
}
/**
 * Dialog terpusat untuk formulir create/edit.
 * Controlled (`open`/`onOpenChange`) atau uncontrolled lewat `trigger`.
 */
export declare function FormDialog({ title, description, trigger, open: openProp, onOpenChange, children, className, }: FormDialogProps): import("react/jsx-runtime").JSX.Element;
