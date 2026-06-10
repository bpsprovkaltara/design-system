import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-body-sm shadow-xs transition-colors outline-none',
        'selection:bg-primary selection:text-primary-foreground',
        'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-body-sm file:font-medium file:text-foreground',
        'placeholder:text-content-tertiary',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
        className
      )}
      {...props}
    />
  )
}

export { Input }
