export interface BpsFilterBarValue {
    keyword: string;
    status: string;
    unitKerja: string;
}
interface BpsFilterBarProps {
    value: BpsFilterBarValue;
    onChange: (value: BpsFilterBarValue) => void;
    onReset: () => void;
}
export declare function BpsFilterBar({ value, onChange, onReset }: BpsFilterBarProps): import("react/jsx-runtime").JSX.Element;
export {};
