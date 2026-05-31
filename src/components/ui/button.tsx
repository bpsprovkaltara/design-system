'use client'

import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { Slot } from 'radix-ui'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button-variants'

export type ButtonProps = VariantProps<typeof buttonVariants> &
  React.ComponentProps<'button'> & {
    asChild?: boolean
    loading?: boolean
    iconLeft?: React.ReactNode
    iconRight?: React.ReactNode
  }

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  loading = false,
  iconLeft,
  iconRight,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button'
  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="animate-spin" aria-hidden="true" />
      ) : (
        iconLeft && <span aria-hidden="true">{iconLeft}</span>
      )}
      <Slot.Slottable>{children}</Slot.Slottable>
      {!loading && iconRight && <span aria-hidden="true">{iconRight}</span>}
    </Comp>
  )
}

export { Button, buttonVariants }
