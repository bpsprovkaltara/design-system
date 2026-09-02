export type PageSkeletonVariant = 'table' | 'cards' | 'detail';
export interface PageSkeletonProps {
    variant: PageSkeletonVariant;
    /** Jumlah baris skeleton tabel (default 5). */
    rows?: number;
    /** Jumlah kolom skeleton tabel (default 4). */
    cols?: number;
    className?: string;
}
/**
 * Pola skeleton halaman lengkap di atas primitif `Skeleton`.
 */
export declare function PageSkeleton({ variant, rows, cols, className, }: PageSkeletonProps): import("react/jsx-runtime").JSX.Element;
