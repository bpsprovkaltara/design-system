import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Toggle, toggleVariants, type ToggleProps } from '@/components/ui/toggle'

type ToggleGroupType = 'single' | 'multiple'

type ToggleGroupContextValue = {
  type: ToggleGroupType
  value: string[]
  disabled?: boolean
  variant?: VariantProps<typeof toggleVariants>['variant']
  size?: VariantProps<typeof toggleVariants>['size']
  toggleValue: (value: string) => void
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(null)

type ToggleGroupValue<T extends ToggleGroupType> = T extends 'single' ? string : string[]

export type ToggleGroupProps<T extends ToggleGroupType = ToggleGroupType> = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'onChange'
> &
  VariantProps<typeof toggleVariants> & {
    type?: T
    value?: ToggleGroupValue<T>
    defaultValue?: ToggleGroupValue<T>
    disabled?: boolean
    onValueChange?: (value: ToggleGroupValue<T>) => void
  }

function toArray(value: string | string[] | undefined): string[] {
  if (Array.isArray(value)) return value
  return value ? [value] : []
}

function ToggleGroup<T extends ToggleGroupType = 'single'>({
  className,
  type = 'single' as T,
  value,
  defaultValue,
  disabled,
  variant = 'outline',
  size = 'default',
  onValueChange,
  children,
  ref,
  ...props
}: ToggleGroupProps<T> & { ref?: React.Ref<HTMLDivElement> }) {
  const [internalValue, setInternalValue] = React.useState<string[]>(toArray(defaultValue))
  const selectedValue = value === undefined ? internalValue : toArray(value)

  const toggleValue = React.useCallback(
    (itemValue: string) => {
      const nextValue =
        type === 'single'
          ? selectedValue.includes(itemValue)
            ? []
            : [itemValue]
          : selectedValue.includes(itemValue)
            ? selectedValue.filter((current) => current !== itemValue)
            : [...selectedValue, itemValue]

      if (value === undefined) setInternalValue(nextValue)
      onValueChange?.((type === 'single' ? (nextValue[0] ?? '') : nextValue) as ToggleGroupValue<T>)
    },
    [onValueChange, selectedValue, type, value]
  )

  const contextValue = React.useMemo(
    () => ({ type, value: selectedValue, disabled, variant, size, toggleValue }),
    [disabled, selectedValue, size, toggleValue, type, variant]
  )

  return (
    <ToggleGroupContext.Provider value={contextValue}>
      <div
        ref={ref}
        role={type === 'single' ? 'radiogroup' : 'group'}
        className={cn(
          'inline-flex items-center rounded-md border border-border-default bg-surface-raised p-0.5',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </ToggleGroupContext.Provider>
  )
}

export type ToggleGroupItemProps = Omit<ToggleProps, 'pressed' | 'defaultPressed' | 'value'> & {
  value: string
}

function ToggleGroupItem({
  className,
  value,
  disabled,
  variant,
  size,
  onClick,
  ref,
  ...props
}: ToggleGroupItemProps) {
  const context = React.useContext(ToggleGroupContext)
  const pressed = context?.value.includes(value) ?? false
  const resolvedDisabled = disabled || context?.disabled

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (!resolvedDisabled) context?.toggleValue(value)
    onClick?.(event)
  }

  return (
    <Toggle
      ref={ref}
      role={context?.type === 'single' ? 'radio' : undefined}
      aria-checked={context?.type === 'single' ? pressed : undefined}
      pressed={pressed}
      disabled={resolvedDisabled}
      variant={variant ?? context?.variant}
      size={size ?? context?.size}
      className={cn('border-0 shadow-none', className)}
      onClick={handleClick}
      {...props}
    />
  )
}

export { ToggleGroup, ToggleGroupItem }
