import * as React from 'react';
export interface CommandSearchProps {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    /** Paksa panel terbuka/tertutup. Default: terbuka bila query non-kosong. */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    placeholder?: string;
    /** Label aksesibel Command root. */
    label?: string;
    loading?: boolean;
    loadingLabel?: string;
    emptyLabel?: string;
    /** Daftarkan pintasan ⌘K / Ctrl+K untuk fokus input (default true). */
    enableShortcut?: boolean;
    children?: React.ReactNode;
    className?: string;
    panelClassName?: string;
    inputClassName?: string;
}
/**
 * Pola pencarian topbar: `Command` inline + panel saran absolute.
 * Fetch/hasil tetap di app — isi `children` dengan `CommandGroup`/`CommandItem`.
 */
export declare function CommandSearch({ value: valueProp, defaultValue, onValueChange, open: openProp, onOpenChange, placeholder, label, loading, loadingLabel, emptyLabel, enableShortcut, children, className, panelClassName, inputClassName, }: CommandSearchProps): import("react/jsx-runtime").JSX.Element;
