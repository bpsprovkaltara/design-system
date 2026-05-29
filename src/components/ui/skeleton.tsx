import * as React from 'react'

import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      aria-busy="true"
      aria-label="Memuat..."
      className={cn('animate-shimmer rounded-md bg-border-subtle', className)}
      style={{
        backgroundImage:
          'linear-gradient(90deg, hsl(var(--warm-200-hsl)) 25%, hsl(var(--warm-100-hsl)) 50%, hsl(var(--warm-200-hsl)) 75%)',
        backgroundSize: '1000px 100%',
      }}
      {...props}
    />
  )
}

export { Skeleton }
