import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
declare const avatarVariants: (props?: ({
    size?: "default" | "xs" | "sm" | "lg" | "xl" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
type AvatarProps = React.ComponentProps<typeof AvatarPrimitive.Root> & VariantProps<typeof avatarVariants> & {
    children?: React.ReactNode;
    className?: string;
};
declare function Avatar({ className, size, ref, ...props }: AvatarProps): import("react/jsx-runtime").JSX.Element;
declare namespace Avatar {
    var displayName: string | undefined;
}
declare function AvatarImage(props: React.ComponentProps<typeof AvatarPrimitive.Image>): import("react/jsx-runtime").JSX.Element;
declare namespace AvatarImage {
    var displayName: string | undefined;
}
declare function AvatarFallback(props: React.ComponentProps<typeof AvatarPrimitive.Fallback>): import("react/jsx-runtime").JSX.Element;
declare namespace AvatarFallback {
    var displayName: string | undefined;
}
interface AvatarGroupProps {
    children: React.ReactNode;
    max?: number;
    size?: VariantProps<typeof avatarVariants>['size'];
    className?: string;
}
declare const AvatarGroup: {
    ({ children, max, size, className }: AvatarGroupProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export { Avatar, AvatarImage, AvatarFallback, AvatarGroup };
