interface Option {
    value: string;
    label: string;
}
interface ComboboxProps {
    options: Option[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    className?: string;
    disabled?: boolean;
}
export declare function Combobox({ options, value, onChange, placeholder, searchPlaceholder, emptyText, className, disabled, }: ComboboxProps): import("react/jsx-runtime").JSX.Element;
export {};
