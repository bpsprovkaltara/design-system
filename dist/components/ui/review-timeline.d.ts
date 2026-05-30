import * as React from 'react';
export interface ReviewTimelineItem {
    id: string;
    actor: string;
    role: string;
    note: string;
    date: string;
    status: 'draft' | 'pending' | 'revised' | 'approved';
}
interface ReviewTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
    items: ReviewTimelineItem[];
}
export declare function ReviewTimeline({ items, className, ...props }: ReviewTimelineProps): import("react/jsx-runtime").JSX.Element;
export {};
