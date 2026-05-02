interface BpsDatePickerProps {
    date?: Date;
    onChange?: (date?: Date) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    clearable?: boolean;
}
export declare function BpsDatePicker({ date, onChange, placeholder, className, disabled, clearable, }: BpsDatePickerProps): import("react/jsx-runtime").JSX.Element;
export {};
