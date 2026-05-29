import * as React from 'react';
interface DataTableColumn<T extends Record<string, unknown>> {
    key: string;
    label: string;
    getValue?: (row: T) => unknown;
    render?: {
        bivarianceHack: (val: unknown, row: T) => React.ReactNode;
    }['bivarianceHack'];
}
interface DataTableProps<T extends Record<string, unknown>> extends React.HTMLAttributes<HTMLDivElement> {
    data: T[];
    columns: DataTableColumn<T>[];
}
export declare function DataTable<T extends Record<string, unknown>>({ data, columns, className, ...props }: DataTableProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
