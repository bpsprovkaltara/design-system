import * as React from 'react';
declare function IllustrationEmpty({ className }: {
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
declare function IllustrationSearch({ className }: {
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
declare function IllustrationError({ className }: {
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
declare const illustrations: {
    empty: typeof IllustrationEmpty;
    search: typeof IllustrationSearch;
    error: typeof IllustrationError;
};
export interface EmptyStateProps {
    illustration?: keyof typeof illustrations | React.ReactNode;
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
        variant?: 'default' | 'outline' | 'ghost';
    };
    secondaryAction?: {
        label: string;
        onClick: () => void;
    };
    className?: string;
    compact?: boolean;
}
declare function EmptyState({ illustration, title, description, action, secondaryAction, className, compact, }: EmptyStateProps): import("react/jsx-runtime").JSX.Element;
export { EmptyState };
