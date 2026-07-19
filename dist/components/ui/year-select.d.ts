export interface YearSelectProps {
    value?: number;
    onChange?: (year: number) => void;
    /** Inclusive start year. Defaults to currentYear - 10. */
    fromYear?: number;
    /** Inclusive end year. Defaults to currentYear. */
    toYear?: number;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    id?: string;
}
export declare function YearSelect({ value, onChange, fromYear, toYear, label, placeholder, disabled, className, id, }: YearSelectProps): import("react/jsx-runtime").JSX.Element;
