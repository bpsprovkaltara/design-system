import * as React from 'react';
type RowDetailSize = 'icon-sm' | 'icon';
export type RowDetailLinkProps = {
    /** Label unik per baris untuk `aria-label` / `title` (wajib). */
    label: string;
    size?: RowDetailSize;
    variant?: 'ghost' | 'outline';
    className?: string;
} & ({
    href: string;
    asChild?: false;
    children?: never;
} | {
    href?: never;
    asChild: true;
    /** Elemen tautan kerangka (Next `Link`, React Router `Link`, dll.). */
    children: React.ReactElement;
});
/**
 * Afordansi kolom aksi "lihat detail" — Button ikon + Eye.
 * Default memakai `<a href>`; konsumen Next/React Router pakai `asChild`.
 */
export declare function RowDetailLink({ label, size, variant, className, ...props }: RowDetailLinkProps): import("react/jsx-runtime").JSX.Element;
export {};
