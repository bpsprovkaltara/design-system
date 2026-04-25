interface Option {
    value: string;
    label: string;
}
interface BpsComboboxProps {
    options: Option[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    className?: string;
    disabled?: boolean;
}
export declare function BpsCombobox({ options, value, onChange, placeholder, searchPlaceholder, emptyText, className, disabled }: BpsComboboxProps): import("react/jsx-runtime").JSX.Element;
export {};
