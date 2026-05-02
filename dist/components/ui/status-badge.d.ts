import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
declare const badgeVariants: (props?: ({
    variant?: "default" | "secondary" | "destructive" | "outline" | "draft" | "pending" | "revised" | "approved" | null | undefined;
} & import('class-variance-authority/dist/types').ClassProp) | undefined) => string;
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
}
declare function StatusBadge({ className, variant, ...props }: BadgeProps): import("react/jsx-runtime").JSX.Element;
export { StatusBadge, badgeVariants };
