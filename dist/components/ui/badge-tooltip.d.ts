import { ReactNode } from 'react';
export interface BadgeTooltipProps {
    children: ReactNode;
    /** Teks tooltip. String kosong → render `children` tanpa wrapper. */
    content: string;
    side?: 'top' | 'bottom' | 'left' | 'right';
    /** Kelas lebar maksimal konten (default `max-w-64`). */
    maxContentWidth?: string;
    delayDuration?: number;
}
/**
 * Wrapper tipis Tooltip untuk badge/ikon — menghilangkan boilerplate Provider/Trigger/Content.
 */
export declare function BadgeTooltip({ children, content, side, maxContentWidth, delayDuration, }: BadgeTooltipProps): import("react/jsx-runtime").JSX.Element;
