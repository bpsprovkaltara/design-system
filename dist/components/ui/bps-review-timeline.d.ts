import * as React from 'react';
export interface BpsReviewTimelineItem {
    id: string;
    actor: string;
    role: string;
    note: string;
    date: string;
    status: 'draft' | 'pending' | 'revised' | 'approved';
}
interface BpsReviewTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
    items: BpsReviewTimelineItem[];
}
export declare function BpsReviewTimeline({ items, className, ...props }: BpsReviewTimelineProps): import("react/jsx-runtime").JSX.Element;
export {};
