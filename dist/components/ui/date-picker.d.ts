export interface DatePickerProps {
    date?: Date;
    onChange?: (date?: Date) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    clearable?: boolean;
}
export declare function DatePicker({ date, onChange, placeholder, className, disabled, clearable, }: DatePickerProps): import("react/jsx-runtime").JSX.Element;
