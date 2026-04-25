'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium',
    'transition-all duration-fast ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    'select-none',
  ].join(' '),
  {
    variants: {
      variant: {
        /* Primary — brand navy, authoritative */
        default:
          'bg-primary text-primary-foreground shadow-elevation-2 hover:bg-primary/90 hover:shadow-elevation-3 hover:-translate-y-px active:translate-y-0 active:shadow-elevation-1',
        /* Destructive */
        destructive:
          'bg-destructive text-destructive-foreground shadow-elevation-1 hover:bg-destructive/90 hover:shadow-elevation-2 hover:-translate-y-px active:translate-y-0',
        /* Tertiary — ghost with border */
        tertiary:
          'border border-border-default bg-surface-raised text-content-primary hover:bg-surface-sunken hover:border-border-strong',
        /* Outline — shadcn compat */
        outline:
          'border border-border-default bg-transparent text-content-primary hover:bg-surface-sunken hover:border-border-strong',
        /* Secondary */
        secondary:
          'bg-surface-sunken text-content-primary hover:bg-muted border border-border-subtle',
        /* Ghost — no border */
        ghost: 'text-content-primary hover:bg-surface-sunken',
        /* Link */
        link: 'text-content-brand underline-offset-4 hover:underline p-0 h-auto',
        /* Success — approve workflows */
        success:
          'bg-success text-success-foreground shadow-elevation-1 hover:bg-success/90 hover:shadow-elevation-2 hover:-translate-y-px active:translate-y-0',
        /* Danger outline */
        'danger-outline':
          'border border-feedback-danger text-feedback-danger bg-transparent hover:bg-feedback-danger-bg',
      },
      size: {
        xs: 'h-6 px-2 text-[11px] rounded-sm gap-1 [&_svg]:size-3',
        sm: 'h-8 px-3 text-body-sm rounded-md gap-1.5 [&_svg]:size-3.5',
        default: 'h-9 px-4 text-body-sm rounded-md [&_svg]:size-4',
        lg: 'h-11 px-6 text-body rounded-lg [&_svg]:size-5',
        icon: 'h-9 w-9 rounded-md [&_svg]:size-4',
        'icon-sm': 'h-7 w-7 rounded-sm [&_svg]:size-3.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      iconLeft,
      iconRight,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="animate-spin" aria-hidden="true" />
        ) : (
          iconLeft && <span aria-hidden="true">{iconLeft}</span>
        )}
        {children}
        {!loading && iconRight && <span aria-hidden="true">{iconRight}</span>}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
