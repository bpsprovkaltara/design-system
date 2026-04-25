import * as React from "react";
interface BpsDataTableProps extends React.HTMLAttributes<HTMLDivElement> {
    data: Record<string, any>[];
    columns: {
        key: string;
        label: string;
        render?: (val: any, row: any) => React.ReactNode;
    }[];
}
export declare function BpsDataTable({ data, columns, className, ...props }: BpsDataTableProps): import("react/jsx-runtime").JSX.Element;
export {};
