import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const toggleVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium',
    'transition-colors duration-fast ease-out',
    'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'data-[state=on]:bg-primary data-[state=on]:text-primary-foreground',
    'data-[state=off]:text-content-primary data-[state=off]:hover:bg-surface-sunken',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border border-border-default bg-surface-raised',
        ghost: 'bg-transparent',
      },
      size: {
        sm: 'h-8 px-2.5 text-body-sm [&_svg]:size-3.5',
        default: 'h-9 px-3 text-body-sm [&_svg]:size-4',
        lg: 'h-10 px-4 text-body [&_svg]:size-5',
        icon: 'h-9 w-9 px-0 [&_svg]:size-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export type ToggleProps = Omit<React.ComponentPropsWithRef<'button'>, 'value'> &
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
  ref,
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
      ref={ref}
      type="button"
      disabled={disabled}
      aria-pressed={isPressed}
      data-state={isPressed ? 'on' : 'off'}
      className={cn(toggleVariants({ variant, size }), className)}
      onClick={handleClick}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
