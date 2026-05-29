interface BulkActionBarProps {
    selectedCount: number;
    onSetPending: () => void;
    onSetApproved: () => void;
}
export declare function BulkActionBar({ selectedCount, onSetPending, onSetApproved }: BulkActionBarProps): import("react/jsx-runtime").JSX.Element | null;
export {};
