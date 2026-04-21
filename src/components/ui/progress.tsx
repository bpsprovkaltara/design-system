'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cva, type VariantProps } from 'class-variance-authority'

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

const progressIndicatorVariants = cva('h-full w-full flex-1 transition-all duration-slow ease-out', {
  variants: {
    intent: {
      default: 'bg-primary',
      success: 'bg-feedback-success',
      warning: 'bg-feedback-warning',
      danger:  'bg-feedback-danger',
    },
  },
  defaultVariants: { intent: 'default' },
})

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressTrackVariants>,
    VariantProps<typeof progressIndicatorVariants> {}

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, value, size, intent, ...props }, ref) => (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(progressTrackVariants({ size }), className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(progressIndicatorVariants({ intent }))}
        style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
)
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
