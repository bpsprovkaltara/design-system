'use client'

import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button-variants'

type LinkButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}

type AnchorLinkButtonProps = LinkButtonBaseProps &
  Omit<React.ComponentProps<'a'>, keyof LinkButtonBaseProps | 'asChild'> & {
    asChild?: false
  }

type SlottedLinkButtonProps = LinkButtonBaseProps &
  Omit<React.HTMLAttributes<HTMLElement>, keyof LinkButtonBaseProps | 'href'> &
  React.RefAttributes<HTMLElement> & {
    asChild: true
    children: React.ReactNode
  }

export type LinkButtonProps = AnchorLinkButtonProps | SlottedLinkButtonProps

function LinkButton({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  iconLeft,
  iconRight,
  children,
  ...props
}: LinkButtonProps) {
  if (asChild) {
    return (
      <Slot.Root
        {...(props as Omit<React.HTMLAttributes<HTMLElement>, keyof LinkButtonBaseProps>)}
        data-slot="link-button"
        data-variant={variant}
        data-size={size}
        className={cn(buttonVariants({ variant, size, className }))}
      >
        {iconLeft && <span aria-hidden="true">{iconLeft}</span>}
        <Slot.Slottable>{children}</Slot.Slottable>
        {iconRight && <span aria-hidden="true">{iconRight}</span>}
      </Slot.Root>
    )
  }

  return (
    <a
      {...(props as React.ComponentProps<'a'>)}
      data-slot="link-button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
    >
      {iconLeft && <span aria-hidden="true">{iconLeft}</span>}
      <Slot.Slottable>{children}</Slot.Slottable>
      {iconRight && <span aria-hidden="true">{iconRight}</span>}
    </a>
  )
}

export { LinkButton }
