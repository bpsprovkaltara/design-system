import * as React from 'react';
type DataState = 'loading' | 'error' | 'empty' | 'ready';
export interface DataStatePanelProps {
    state: DataState;
    title?: string;
    description?: string;
    onRetry?: () => void;
    children?: React.ReactNode;
}
export declare function DataStatePanel({ state, title, description, onRetry, children, }: DataStatePanelProps): import("react/jsx-runtime").JSX.Element;
export {};
