interface SparklineProps {
    data: number[];
    className?: string;
    width?: number;
    height?: number;
}
declare function Sparkline({ data, className, width, height }: SparklineProps): import("react/jsx-runtime").JSX.Element | null;
interface BarChartItem {
    label: string;
    value: number;
}
interface BarChartProps {
    data: BarChartItem[];
    className?: string;
    showValues?: boolean;
}
declare function BarChart({ data, className, showValues }: BarChartProps): import("react/jsx-runtime").JSX.Element | null;
export { Sparkline, BarChart };
export type { SparklineProps, BarChartProps, BarChartItem };
