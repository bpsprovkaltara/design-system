export interface ComboboxOption {
    value: string;
    label: string;
}
export interface ComboboxProps {
    options: ComboboxOption[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    /** Kelas untuk tombol trigger. */
    className?: string;
    /** Kelas untuk root `Command` di dalam popover. */
    commandClassName?: string;
    /** Kelas untuk `<input>` pencarian (`CommandInput`). */
    inputClassName?: string;
    /** Kelas untuk wrapper `CommandInput` (border-b, padding, fokus). */
    inputWrapperClassName?: string;
    disabled?: boolean;
}
export declare function Combobox({ options, value, onChange, placeholder, searchPlaceholder, emptyText, className, commandClassName, inputClassName, inputWrapperClassName, disabled, }: ComboboxProps): import("react/jsx-runtime").JSX.Element;
