import { InputHTMLAttributes } from 'react';
export type CheckboxInputProps = InputHTMLAttributes<HTMLInputElement> & {
    /** Teks opsional di samping checkbox (tombol untuk memperluas target klik). */
    label?: string;
};
/**
 * Checkbox Radix + input native tersembunyi untuk `register()` / POST form.
 * Nama `CheckboxInput` agar tidak bentrok dengan primitif `Checkbox`.
 */
export declare const CheckboxInput: import('react').ForwardRefExoticComponent<InputHTMLAttributes<HTMLInputElement> & {
    /** Teks opsional di samping checkbox (tombol untuk memperluas target klik). */
    label?: string;
} & import('react').RefAttributes<HTMLInputElement>>;
