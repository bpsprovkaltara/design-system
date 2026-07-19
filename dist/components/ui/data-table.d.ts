import * as React from 'react';
export interface DataTableColumn<T extends Record<string, unknown>> {
    key: string;
    label: string;
    getValue?: (row: T) => unknown;
    render?: {
        bivarianceHack: (val: unknown, row: T) => React.ReactNode;
    }['bivarianceHack'];
    sortable?: boolean;
}
export interface DataTablePagination {
    /** Zero-based page index. */
    page: number;
    pageSize: number;
    /** Total row count across all pages (server mode). */
    total: number;
    onPageChange: (page: number) => void;
}
export interface DataTableProps<T extends Record<string, unknown>> extends React.HTMLAttributes<HTMLDivElement> {
    data: T[];
    columns: DataTableColumn<T>[];
    /** Optional row actions cell. When omitted, no Aksi column is rendered. */
    renderRowActions?: (row: T, index: number) => React.ReactNode;
    actionsLabel?: string;
    getRowKey?: (row: T, index: number) => string | number;
    /**
     * When set (and `pagination` is omitted), enables client-side pagination.
     * Prefer `pagination` for server-driven lists.
     */
    pageSize?: number;
    /** Controlled / server pagination. */
    pagination?: DataTablePagination;
    /** Loading overlay / skeleton state. */
    loading?: boolean;
    loadingLabel?: string;
    /** Error state replaces the table body. */
    error?: boolean;
    errorTitle?: string;
    errorDescription?: string;
    onRetry?: () => void;
    /** Empty state when `data` is empty and not loading/error. */
    emptyTitle?: string;
    emptyDescription?: string;
    emptyAction?: {
        label: string;
        onClick: () => void;
    };
}
export declare function DataTable<T extends Record<string, unknown>>({ data, columns, className, renderRowActions, actionsLabel, getRowKey, pageSize, pagination, loading, loadingLabel, error, errorTitle, errorDescription, onRetry, emptyTitle, emptyDescription, emptyAction, ...props }: DataTableProps<T>): import("react/jsx-runtime").JSX.Element;
