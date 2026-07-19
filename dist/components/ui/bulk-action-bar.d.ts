import { Button } from './button';
import * as React from 'react';
export interface BulkAction {
    id?: string;
    label: string;
    onClick: () => void;
    variant?: React.ComponentProps<typeof Button>['variant'];
    disabled?: boolean;
}
export interface BulkActionBarProps {
    selectedCount: number;
    actions: BulkAction[];
    selectedLabel?: (count: number) => string;
    className?: string;
}
export declare function BulkActionBar({ selectedCount, actions, selectedLabel, className, }: BulkActionBarProps): import("react/jsx-runtime").JSX.Element | null;
