'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

export type TextareaProps = React.ComponentProps<'textarea'>

function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'field-sizing-content flex min-h-[80px] w-full rounded-md border border-input bg-transparent',
        'px-3 py-2 text-body-sm text-content-primary shadow-xs transition-colors outline-none',
        'placeholder:text-content-tertiary',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-sunken',
        'read-only:bg-surface-sunken read-only:text-content-secondary',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
        'resize-y',
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
