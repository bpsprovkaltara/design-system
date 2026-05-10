'use client'

import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Circle } from 'lucide-react'

import { cn } from '@/lib/utils'

function RadioGroup(props: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  const { className, ref, ...rest } = props
  return (
    <RadioGroupPrimitive.Root className={cn('grid gap-2', className)} {...rest} ref={ref} />
  )
}

RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

function RadioGroupItem(props: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  const { className, ref, ...rest } = props
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'aspect-square h-4 w-4 rounded-full border border-border-strong',
        'bg-surface-raised ring-offset-background',
        'transition-colors duration-fast',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:border-primary data-[state=checked]:text-primary',
        className
      )}
      {...rest}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2 w-2 fill-current text-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
