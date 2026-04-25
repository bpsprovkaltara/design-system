import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
declare const avatarVariants: (props?: ({
    size?: "default" | "xs" | "sm" | "lg" | "xl" | null | undefined;
} & import('class-variance-authority/dist/types').ClassProp) | undefined) => string;
interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>, VariantProps<typeof avatarVariants> {
    children?: React.ReactNode;
    className?: string;
}
declare const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLSpanElement>>;
declare const AvatarImage: React.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarImageProps & React.RefAttributes<HTMLImageElement>, "ref"> & React.RefAttributes<HTMLImageElement>>;
declare const AvatarFallback: React.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarFallbackProps & React.RefAttributes<HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>;
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
