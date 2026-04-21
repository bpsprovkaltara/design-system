'use client'

import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const avatarVariants = cva('relative flex shrink-0 overflow-hidden rounded-full', {
  variants: {
    size: {
      xs: 'h-6 w-6 text-[10px]',
      sm: 'h-8 w-8 text-xs',
      default: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base',
      xl: 'h-16 w-16 text-lg',
    },
  },
  defaultVariants: { size: 'default' },
})

interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  children?: React.ReactNode
  className?: string
}

const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ className, size, ...props }, ref) => (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(avatarVariants({ size }), className)}
      {...props}
    />
  )
)
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full object-cover', className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full',
      'bg-navy-800 text-white font-semibold uppercase tracking-wide',
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

/* Avatar Group — stacked avatars */
interface AvatarGroupProps {
  children: React.ReactNode
  max?: number
  size?: VariantProps<typeof avatarVariants>['size']
  className?: string
}

const AvatarGroup = ({ children, max, size = 'default', className }: AvatarGroupProps) => {
  const childArray = React.Children.toArray(children)
  const visible = max ? childArray.slice(0, max) : childArray
  const overflow = max ? childArray.length - max : 0

  return (
    <div className={cn('flex -space-x-2', className)} role="group">
      {visible.map((child, i) =>
        React.cloneElement(child as React.ReactElement<AvatarProps & { key?: React.Key }>, {
          key: i,
          size,
          className: cn(
            'ring-2 ring-surface-raised',
            (child as React.ReactElement<AvatarProps>).props?.className ?? ''
          ),
        })
      )}
      {overflow > 0 && (
        <Avatar size={size} className="ring-2 ring-surface-raised">
          <AvatarFallback>+{overflow}</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
AvatarGroup.displayName = 'AvatarGroup'

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup }
