import * as React from 'react';
export interface SectionTab {
    href: string;
    label: string;
    /**
     * Prefix rute lain yang ikut menyalakan tab ini — untuk anak yang tidak
     * bersarang di bawah `href` (mis. `/perencanaan/formasi/{id}` → tab Peta).
     */
    matchPrefixes?: string[];
}
export interface SectionTabsProps {
    tabs: SectionTab[];
    /** Label aksesibel untuk `<nav>`. */
    label: string;
    /** Pathname aktif (oper hasil `usePathname()` dari framework router). */
    pathname: string;
    /**
     * Renderer tautan kerangka (Next.js `Link`, TanStack Router, dll.).
     * Elemen hasil di-clone dengan kelas tab + `aria-current`.
     */
    renderLink?: (tab: SectionTab, children: React.ReactNode) => React.ReactNode;
    className?: string;
}
/**
 * Tab aktif = kecocokan prefix terpanjang di antara `href` + `matchPrefixes`.
 * Prefix pendek saja tidak cukup: `/pegawai/status-data` cocok dengan
 * `/pegawai` dan `/pegawai/status-data` — tanpa aturan terpanjang, dua tab
 * bisa aktif bersamaan.
 */
export declare function resolveActiveTab(pathname: string, tabs: SectionTab[]): string | undefined;
/**
 * Sub-nav sibling route (bukan Radix Tabs) — tiap klik adalah navigasi rute.
 * Visual selaras `TabsList` / `TabsTrigger` (kotak di atas `bg-muted`).
 */
export declare function SectionTabs({ tabs, label, pathname, renderLink, className, }: SectionTabsProps): import("react/jsx-runtime").JSX.Element;
