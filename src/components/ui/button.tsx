'use client'

import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { Slot } from 'radix-ui'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button-variants'

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string
  loading?: boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}

type NativeButtonProps = ButtonBaseProps &
  Omit<React.ComponentProps<'button'>, keyof ButtonBaseProps | 'asChild'> & {
    asChild?: false
  }

type SlottedButtonProps = ButtonBaseProps &
  Omit<React.HTMLAttributes<HTMLElement>, keyof ButtonBaseProps | 'disabled'> &
  React.RefAttributes<HTMLElement> & {
    asChild: true
    children: React.ReactNode
    disabled?: boolean
  }

export type ButtonProps = NativeButtonProps | SlottedButtonProps

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
  onClick,
  onClickCapture,
  ...props
}: ButtonProps) {
  const isDisabled = Boolean(disabled || loading)

  function handleClickCapture(event: React.MouseEvent<HTMLElement>) {
    if (asChild && isDisabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    ;(onClickCapture as React.MouseEventHandler<HTMLElement> | undefined)?.(event)
  }

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    if (asChild && isDisabled) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    ;(onClick as React.MouseEventHandler<HTMLElement> | undefined)?.(event)
  }

  if (asChild) {
    return (
      <Slot.Root
        {...(props as Omit<React.HTMLAttributes<HTMLElement>, keyof ButtonBaseProps>)}
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(buttonVariants({ variant, size, className }))}
        aria-disabled={isDisabled || undefined}
        data-disabled={isDisabled ? true : undefined}
        onClickCapture={handleClickCapture}
        onClick={handleClick}
      >
        {loading ? (
          <Loader2 className="animate-spin" aria-hidden="true" />
        ) : (
          iconLeft && <span aria-hidden="true">{iconLeft}</span>
        )}
        <Slot.Slottable>{children}</Slot.Slottable>
        {!loading && iconRight && <span aria-hidden="true">{iconRight}</span>}
      </Slot.Root>
    )
  }

  return (
    <button
      {...(props as React.ComponentProps<'button'>)}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isDisabled}
      aria-disabled={isDisabled || undefined}
      onClickCapture={onClickCapture as React.MouseEventHandler<HTMLButtonElement> | undefined}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement> | undefined}
    >
      {loading ? (
        <Loader2 className="animate-spin" aria-hidden="true" />
      ) : (
        iconLeft && <span aria-hidden="true">{iconLeft}</span>
      )}
      <Slot.Slottable>{children}</Slot.Slottable>
      {!loading && iconRight && <span aria-hidden="true">{iconRight}</span>}
    </button>
  )
}

export { Button, buttonVariants }
