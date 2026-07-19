import { LucideIcon } from 'lucide-react';
import * as React from 'react';
export interface TableEmptyProps {
    /** Jumlah kolom tabel — dipakai sebagai colSpan agar row melebar penuh. */
    colSpan: number;
    icon?: LucideIcon;
    title: string;
    description?: React.ReactNode;
    action?: React.ReactNode;
}
/**
 * Row empty-state untuk dipakai di dalam TableBody, agar header kolom tetap terlihat
 * saat data kosong (mis. hasil filter kosong atau belum ada data).
 */
export declare function TableEmpty({ colSpan, icon: Icon, title, description, action, }: TableEmptyProps): import("react/jsx-runtime").JSX.Element;
