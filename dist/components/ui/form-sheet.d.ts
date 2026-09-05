import * as React from 'react';
export interface FormSheetProps {
    title: string;
    description?: string;
    /** Uncontrolled trigger. Ignored when opening is fully controlled without a trigger. */
    trigger?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** Body; function form receives `close()` to dismiss after submit. */
    children: React.ReactNode | ((close: () => void) => React.ReactNode);
    /** Optional sticky footer; function form receives the same `close()`. */
    footer?: React.ReactNode | ((close: () => void) => React.ReactNode);
    className?: string;
    side?: 'right' | 'left';
}
/**
 * Sheet sisi untuk formulir panjang — daftar di belakang tetap terlihat.
 * Controlled (`open`/`onOpenChange`) atau uncontrolled lewat `trigger`.
 */
export declare function FormSheet({ title, description, trigger, open: openProp, onOpenChange, children, footer, className, side, }: FormSheetProps): import("react/jsx-runtime").JSX.Element;
