import * as React from 'react';
type DataState = 'loading' | 'error' | 'empty' | 'ready';
interface BpsDataStatePanelProps {
    state: DataState;
    title?: string;
    description?: string;
    onRetry?: () => void;
    children?: React.ReactNode;
}
export declare function BpsDataStatePanel({ state, title, description, onRetry, children, }: BpsDataStatePanelProps): import("react/jsx-runtime").JSX.Element;
export {};
