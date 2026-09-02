import { ReactNode } from 'react';
export interface SectionCardProps {
    title?: ReactNode;
    description?: ReactNode;
    /** Icon di dalam chip kiri (h-9 w-9, tint brand). */
    icon?: ReactNode;
    /** Slot aksi di kanan header. */
    action?: ReactNode;
    /** Konten di bawah judul/deskripsi tanpa truncate (mis. ringkasan angka). */
    headerExtra?: ReactNode;
    children: ReactNode;
    className?: string;
    contentClassName?: string;
    /** Jika true, children tidak dibungkus CardContent. */
    noPadding?: boolean;
}
/**
 * Pola kartu ber-header fleksibel di atas `Card variant="surface"`.
 */
export declare function SectionCard({ title, description, icon, action, headerExtra, children, className, contentClassName, noPadding, }: SectionCardProps): import("react/jsx-runtime").JSX.Element;
