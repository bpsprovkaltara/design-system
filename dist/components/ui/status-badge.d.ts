import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
declare const statusBadgeVariants: (props?: ({
    variant?: "default" | "secondary" | "destructive" | "outline" | "draft" | "pending" | "revised" | "approved" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof statusBadgeVariants> {
    /**
     * Warna kustom di luar variant bawaan, format token HSL bar (mis. "217 91% 60%").
     * Untuk status/prioritas yang dikonfigurasi di level app (STATUS_CONFIG domain) —
     * DS hanya menyediakan slot styling, mapping tetap di app. Mengoverride warna variant.
     */
    tone?: string;
}
declare function StatusBadge({ className, variant, tone, style, ...props }: StatusBadgeProps): import("react/jsx-runtime").JSX.Element;
export { StatusBadge, statusBadgeVariants };
