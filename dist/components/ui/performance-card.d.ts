import { VariantProps } from 'class-variance-authority';
import { LucideIcon } from 'lucide-react';
import * as React from 'react';
declare const cardVariants: (props?: ({
    variant?: "default" | "glass" | "gradient" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export interface PerformanceCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>, VariantProps<typeof cardVariants> {
    title: string;
    value: string | number;
    unit?: string;
    target?: number;
    delta?: {
        value: number;
        direction: 'up' | 'down';
        period: string;
    };
    trend?: number[];
    icon?: LucideIcon;
    loading?: boolean;
}
export declare function PerformanceCard({ title, value, unit, target, delta, trend, icon: Icon, variant, loading, className, ...props }: PerformanceCardProps): import("react/jsx-runtime").JSX.Element;
export {};
