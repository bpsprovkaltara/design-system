export type StepStatus = 'complete' | 'current' | 'upcoming' | 'error';
export interface Step {
    label: string;
    description?: string;
}
export interface StepperProps {
    steps: Step[];
    current: number;
    statuses?: StepStatus[];
    /** Dipanggil saat langkah yang sudah selesai atau sedang aktif diklik. */
    onStepClick?: (index: number) => void;
    /** Indeks langkah yang punya error validasi (mengalahkan status turunan dari `current`). */
    stepErrors?: boolean[];
    className?: string;
}
declare function Stepper({ steps, current, statuses, onStepClick, stepErrors, className }: StepperProps): import("react/jsx-runtime").JSX.Element;
export { Stepper };
