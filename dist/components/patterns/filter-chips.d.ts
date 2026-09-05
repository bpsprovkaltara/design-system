export interface FilterChipItem {
    href: string;
    label: string;
    active: boolean;
}
export interface FilterChipsProps {
    /** Label aksesibel untuk grup chip (dan teks kasat mata jika `showLabel`). */
    label: string;
    items: FilterChipItem[];
    showLabel?: boolean;
    className?: string;
}
/**
 * Deret chip filter berbasis tautan (`LinkButton` variant `nav`).
 * Untuk filter route-level sederhana.
 */
export declare function FilterChips({ label, items, showLabel, className }: FilterChipsProps): import("react/jsx-runtime").JSX.Element;
