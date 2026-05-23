'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '@/lib/utils'

function Slider(props: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const { className, ref, ...rest } = props
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn('relative flex w-full touch-none select-none items-center', className)}
      {...rest}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-border-default">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      {(rest.value ?? rest.defaultValue ?? [0]).map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          className={cn(
            'block h-4 w-4 rounded-full border border-primary/50 bg-surface-raised shadow-elevation-2',
            'ring-offset-background transition-all duration-fast',
            'focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:pointer-events-none disabled:opacity-50',
            'hover:shadow-elevation-3 hover:scale-110'
          )}
        />
      ))}
    </SliderPrimitive.Root>
  )
}

Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
