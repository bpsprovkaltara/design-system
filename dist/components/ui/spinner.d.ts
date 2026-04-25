import { VariantProps } from 'class-variance-authority';
declare const spinnerVariants: (props?: ({
    size?: "default" | "xs" | "sm" | "lg" | "xl" | null | undefined;
} & import('class-variance-authority/dist/types').ClassProp) | undefined) => string;
interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
    className?: string;
    label?: string;
}
declare function Spinner({ size, className, label }: SpinnerProps): import("react/jsx-runtime").JSX.Element;
export { Spinner };
