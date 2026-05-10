interface BpsConfirmActionDialogProps {
    triggerLabel: string;
    title: string;
    description: string;
    confirmLabel: string;
    reasonRequired?: boolean;
    onConfirm: (reason: string) => void;
}
export declare function BpsConfirmActionDialog({ triggerLabel, title, description, confirmLabel, reasonRequired, onConfirm, }: BpsConfirmActionDialogProps): import("react/jsx-runtime").JSX.Element;
export {};
