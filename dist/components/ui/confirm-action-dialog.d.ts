import * as React from 'react';
export interface ConfirmDialogProps {
    title: string;
    description?: React.ReactNode;
    confirmLabel?: string;
    cancelLabel?: string;
    /** When true, confirm uses destructive styling. */
    variant?: 'default' | 'destructive';
    /** Controlled open state. */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** Uncontrolled trigger. Ignored when `open` is controlled without a trigger. */
    trigger?: React.ReactNode;
    /** @deprecated Use `trigger` ReactNode instead. */
    triggerLabel?: string;
    reasonRequired?: boolean;
    reasonLabel?: string;
    reasonPlaceholder?: string;
    /** Hide the reason field entirely. */
    showReason?: boolean;
    busy?: boolean;
    busyLabel?: string;
    onConfirm: (reason: string) => void | Promise<void>;
    onCancel?: () => void;
}
/**
 * Flexible confirm dialog — controlled or trigger-based, optional reason, async-safe.
 * Prefer this over the legacy `ConfirmActionDialog` wrapper.
 */
export declare function ConfirmDialog({ title, description, confirmLabel, cancelLabel, variant, open: openProp, onOpenChange, trigger, triggerLabel, reasonRequired, reasonLabel, reasonPlaceholder, showReason, busy, busyLabel, onConfirm, onCancel, }: ConfirmDialogProps): import("react/jsx-runtime").JSX.Element;
/** @deprecated Use `ConfirmDialog` with `triggerLabel` / `trigger`. */
export interface ConfirmActionDialogProps {
    triggerLabel: string;
    title: string;
    description: string;
    confirmLabel: string;
    reasonRequired?: boolean;
    onConfirm: (reason: string) => void;
}
/** @deprecated Prefer `ConfirmDialog`. */
export declare function ConfirmActionDialog({ triggerLabel, title, description, confirmLabel, reasonRequired, onConfirm, }: ConfirmActionDialogProps): import("react/jsx-runtime").JSX.Element;
