export type ThemeMode = 'dark' | 'light';
export declare function useTheme(defaultTheme?: ThemeMode): {
    theme: ThemeMode;
    setTheme: (next: ThemeMode) => void;
    toggleTheme: () => void;
};
export interface ThemeToggleProps {
    className?: string;
    /** Controlled theme. When omitted, the toggle manages its own state. */
    theme?: ThemeMode;
    onThemeChange?: (theme: ThemeMode) => void;
}
export declare function ThemeToggle({ className, theme: themeProp, onThemeChange }: ThemeToggleProps): import("react/jsx-runtime").JSX.Element;
