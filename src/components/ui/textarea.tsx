'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-border-default bg-[hsl(var(--input-bg))]',
        'px-3 py-2 text-body-sm text-content-primary',
        'placeholder:text-content-tertiary',
        'transition-colors duration-fast',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-border-brand',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-sunken',
        'read-only:bg-surface-sunken read-only:text-content-secondary',
        'resize-y',
        className
      )}
      ref={ref}
      {...props}
    />
  )
)
Textarea.displayName = 'Textarea'

export { Textarea }
