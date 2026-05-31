'use client'

import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { toggleVariants } from '@/components/ui/toggle-variants'

export type ToggleProps = Omit<React.ComponentProps<'button'>, 'value'> &
  VariantProps<typeof toggleVariants> & {
    pressed?: boolean
    defaultPressed?: boolean
    onPressedChange?: (pressed: boolean) => void
  }

function Toggle({
  className,
  variant,
  size,
  pressed,
  defaultPressed = false,
  onPressedChange,
  onClick,
  disabled,
  ...props
}: ToggleProps) {
  const [internalPressed, setInternalPressed] = React.useState(defaultPressed)
  const isPressed = pressed ?? internalPressed

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (!disabled) {
      const nextPressed = !isPressed
      if (pressed === undefined) setInternalPressed(nextPressed)
      onPressedChange?.(nextPressed)
    }
    onClick?.(event)
  }

  return (
    <button
      type="button"
      data-slot="toggle"
      data-state={isPressed ? 'on' : 'off'}
      disabled={disabled}
      aria-pressed={isPressed}
      className={cn(toggleVariants({ variant, size }), className)}
      onClick={handleClick}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
