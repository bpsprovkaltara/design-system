'use client'

import * as React from 'react'
import { Check, Minus } from 'lucide-react'
import { Checkbox as CheckboxPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  indeterminate?: boolean
}

function Checkbox({ className, indeterminate, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'peer h-4 w-4 shrink-0 rounded-sm border border-border-strong cursor-pointer',
        'bg-surface-raised ring-offset-background shadow-xs',
        'transition-colors duration-fast outline-none',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
        'data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground',
        'data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:text-primary-foreground',
        className
      )}
      checked={indeterminate ? 'indeterminate' : props.checked}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        {indeterminate ? (
          <Minus className="h-3 w-3" strokeWidth={2.5} />
        ) : (
          <Check className="h-3 w-3" strokeWidth={2.5} />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
