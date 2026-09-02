import { ReactNode } from 'react';
export interface DataTableCardSummaryItem {
    label: string;
    value: ReactNode;
}
export interface DataTableCardProps {
    title?: ReactNode;
    description?: ReactNode;
    summary?: DataTableCardSummaryItem[];
    action?: ReactNode;
    /** Slot bawah (biasanya pagination). */
    footer?: ReactNode;
    children: ReactNode;
    className?: string;
}
/**
 * Pola kartu daftar tabel: header SectionCard + ringkasan + body scroll + footer.
 */
export declare function DataTableCard({ title, description, summary, action, footer, children, className, }: DataTableCardProps): import("react/jsx-runtime").JSX.Element;
