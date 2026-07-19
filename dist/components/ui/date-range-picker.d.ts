import { DateRange } from 'react-day-picker';
export interface DateRangePickerProps {
    range?: DateRange;
    onChange?: (range?: DateRange) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    clearable?: boolean;
}
export declare function DateRangePicker({ range, onChange, placeholder, className, disabled, clearable, }: DateRangePickerProps): import("react/jsx-runtime").JSX.Element;
