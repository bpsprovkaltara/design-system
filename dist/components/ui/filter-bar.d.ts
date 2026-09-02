import * as React from 'react';
export interface FilterOption {
    value: string;
    label: string;
}
/** @deprecated Prefer composable `FilterBar` with `filters` / children. */
export interface FilterBarValue {
    keyword: string;
    status: string;
    unitKerja: string;
}
export type FilterField = {
    type: 'search';
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
} | {
    type: 'select';
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: FilterOption[];
    placeholder?: string;
} | {
    type: 'custom';
    id: string;
    label?: string;
    content: React.ReactNode;
};
export interface FilterBarProps {
    /** Composable filter fields. Preferred API. */
    filters?: FilterField[];
    /** Free-form filter content (alternative to `filters`). */
    children?: React.ReactNode;
    onReset?: () => void;
    onSubmit?: () => void;
    resetLabel?: string;
    className?: string;
    /**
     * Skin visual. `surface` = `rounded-2xl border-border-subtle shadow-elevation-1`
     * (selaras `Card variant="surface"`). Default mempertahankan tampilan lama.
     */
    variant?: 'default' | 'surface';
    /** Accessible name for the search landmark. */
    'aria-label'?: string;
    columns?: 2 | 3 | 4;
    /**
     * @deprecated Domain-locked API. Use `filters` or `DocumentFilterBar`.
     */
    value?: FilterBarValue;
    /** @deprecated */
    onChange?: (value: FilterBarValue) => void;
    /** @deprecated */
    statusOptions?: FilterOption[];
    /** @deprecated */
    unitKerjaOptions?: FilterOption[];
    /** @deprecated */
    keywordPlaceholder?: string;
    /** @deprecated */
    keywordLabel?: string;
    /** @deprecated */
    statusLabel?: string;
    /** @deprecated */
    unitKerjaLabel?: string;
}
export declare function FilterBar({ filters, children, onReset, onSubmit, resetLabel, className, variant, 'aria-label': ariaLabel, columns, value, onChange, statusOptions, unitKerjaOptions, keywordPlaceholder, keywordLabel, statusLabel, unitKerjaLabel, }: FilterBarProps): import("react/jsx-runtime").JSX.Element;
/** Domain preset: keyword + status + unit kerja (BPS document workflow). */
export interface DocumentFilterBarProps {
    value: FilterBarValue;
    onChange: (value: FilterBarValue) => void;
    onReset: () => void;
    statusOptions?: FilterOption[];
    unitKerjaOptions?: FilterOption[];
    keywordPlaceholder?: string;
    keywordLabel?: string;
    statusLabel?: string;
    unitKerjaLabel?: string;
    resetLabel?: string;
    className?: string;
}
export declare function DocumentFilterBar({ value, onChange, onReset, statusOptions, unitKerjaOptions, keywordPlaceholder, keywordLabel, statusLabel, unitKerjaLabel, resetLabel, className, }: DocumentFilterBarProps): import("react/jsx-runtime").JSX.Element;
