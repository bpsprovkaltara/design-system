interface ConfirmActionDialogProps {
    triggerLabel: string;
    title: string;
    description: string;
    confirmLabel: string;
    reasonRequired?: boolean;
    onConfirm: (reason: string) => void;
}
export declare function ConfirmActionDialog({ triggerLabel, title, description, confirmLabel, reasonRequired, onConfirm, }: ConfirmActionDialogProps): import("react/jsx-runtime").JSX.Element;
export {};
