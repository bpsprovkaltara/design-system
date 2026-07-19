export type StepStatus = 'complete' | 'current' | 'upcoming' | 'error';
export interface Step {
    label: string;
    description?: string;
}
export interface StepperProps {
    steps: Step[];
    current: number;
    statuses?: StepStatus[];
    className?: string;
}
declare function Stepper({ steps, current, statuses, className }: StepperProps): import("react/jsx-runtime").JSX.Element;
export { Stepper };
