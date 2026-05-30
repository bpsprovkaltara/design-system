export interface FilterBarValue {
    keyword: string;
    status: string;
    unitKerja: string;
}
interface FilterBarProps {
    value: FilterBarValue;
    onChange: (value: FilterBarValue) => void;
    onReset: () => void;
}
export declare function FilterBar({ value, onChange, onReset }: FilterBarProps): import("react/jsx-runtime").JSX.Element;
export {};
