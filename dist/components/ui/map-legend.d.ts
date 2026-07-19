import * as React from 'react';
export interface MapLegendItem {
    tier: 0 | 1 | 2 | 3 | 4 | 5 | 'active';
    label: string;
}
export interface MapLegendProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    items?: MapLegendItem[];
    orientation?: 'horizontal' | 'vertical';
}
export declare function MapLegend({ title, items, orientation, className, ...props }: MapLegendProps): import("react/jsx-runtime").JSX.Element;
