import * as React from 'react';
export interface NotificationPopoverProps {
    /** Jumlah belum dibaca — 0/undefined menyembunyikan badge; ≥100 tampil `99+`. */
    unreadCount?: number;
    title?: string;
    triggerLabel?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** Slot daftar item (app yang merender tautan/baris). */
    children?: React.ReactNode;
    /** Ditampilkan bila tidak loading dan children kosong/absen. */
    empty?: React.ReactNode;
    loading?: boolean;
    loadingLabel?: string;
    markAllLabel?: string;
    onMarkAllRead?: () => void;
    markAllDisabled?: boolean;
    className?: string;
    contentClassName?: string;
}
/**
 * Kulit UI lonceng notifikasi — tanpa fetch. App mengisi `children` / `empty`
 * dan menangani mark-read lewat callback.
 */
export declare function NotificationPopover({ unreadCount, title, triggerLabel, open, onOpenChange, children, empty, loading, loadingLabel, markAllLabel, onMarkAllRead, markAllDisabled, className, contentClassName, }: NotificationPopoverProps): import("react/jsx-runtime").JSX.Element;
