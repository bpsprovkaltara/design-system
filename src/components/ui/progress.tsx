'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Progress as ProgressPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'

const progressTrackVariants = cva('relative w-full overflow-hidden rounded-full bg-border-subtle', {
  variants: {
    size: {
      sm: 'h-1',
      default: 'h-2',
      lg: 'h-3',
    },
  },
  defaultVariants: { size: 'default' },
})

const progressIndicatorVariants = cva(
  'h-full w-full flex-1 transition-all duration-slow ease-out',
  {
    variants: {
      intent: {
        default: 'bg-primary',
        success: 'bg-feedback-success',
        warning: 'bg-feedback-warning',
        danger: 'bg-feedback-danger',
      },
    },
    defaultVariants: { intent: 'default' },
  }
)

type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> &
  VariantProps<typeof progressTrackVariants> &
  VariantProps<typeof progressIndicatorVariants>

function Progress({ className, value, size, intent, ...props }: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(progressTrackVariants({ size }), className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(progressIndicatorVariants({ intent }))}
        style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
