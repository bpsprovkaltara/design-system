'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const labelVariants = cva(
  'text-body-sm font-medium text-content-primary leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-60'
)

function Label(
  props: React.ComponentProps<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
) {
  const { className, ref, ...rest } = props
  return (
    <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...rest} />
  )
}

Label.displayName = LabelPrimitive.Root.displayName

export { Label }
