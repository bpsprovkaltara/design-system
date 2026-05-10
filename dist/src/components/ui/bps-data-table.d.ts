import * as React from 'react';
interface BpsDataTableColumn<T extends Record<string, unknown>> {
    key: string;
    label: string;
    getValue?: (row: T) => unknown;
    render?: {
        bivarianceHack: (val: unknown, row: T) => React.ReactNode;
    }['bivarianceHack'];
}
interface BpsDataTableProps<T extends Record<string, unknown>> extends React.HTMLAttributes<HTMLDivElement> {
    data: T[];
    columns: BpsDataTableColumn<T>[];
}
export declare function BpsDataTable<T extends Record<string, unknown>>({ data, columns, className, ...props }: BpsDataTableProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
