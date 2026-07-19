import { PaginationLinkRenderProps } from './pagination';
import * as React from 'react';
export interface TablePaginationProps {
    /** 1-based halaman aktif. */
    page: number;
    pageSize: number;
    total: number;
    /** Client-side: dipanggil saat halaman berganti. */
    onPageChange?: (page: number) => void;
    /** SSR/link mode: hasilkan href per halaman (Next.js, TanStack Router, dll). */
    hrefForPage?: (page: number) => string;
    /** Render framework link kustom, diteruskan ke PaginationLink. */
    renderLink?: (props: PaginationLinkRenderProps) => React.ReactNode;
    className?: string;
}
/**
 * Footer tabel: info jumlah baris di kiri, kontrol halaman rata kanan.
 * Mendukung mode client-side (`onPageChange`) maupun SSR/link (`hrefForPage` /
 * `renderLink`). Pagination internal sudah di-override `w-auto justify-end` —
 * konsumen tidak perlu override style sendiri.
 */
export declare function TablePagination({ page, pageSize, total, onPageChange, hrefForPage, renderLink, className, }: TablePaginationProps): import("react/jsx-runtime").JSX.Element;
