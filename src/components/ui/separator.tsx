'use client'

import * as React from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'

import { cn } from '@/lib/utils'

function Separator(props: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  const { className, orientation = 'horizontal', decorative = true, ref, ...rest } = props
  return (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'shrink-0 bg-border-subtle',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className
      )}
      {...rest}
    />
  )
}

Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
