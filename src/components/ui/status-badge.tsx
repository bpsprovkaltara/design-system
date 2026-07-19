import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const statusBadgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        destructive: 'border-transparent bg-destructive text-destructive-foreground',
        outline: 'text-foreground',
        draft: 'border-transparent bg-muted text-muted-foreground',
        pending: 'border-transparent bg-warning-bg text-warning',
        revised: 'border-transparent bg-info-bg text-info',
        approved: 'border-transparent bg-success-bg text-success',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof statusBadgeVariants> {
  /**
   * Warna kustom di luar variant bawaan, format token HSL bar (mis. "217 91% 60%").
   * Untuk status/prioritas yang dikonfigurasi di level app (STATUS_CONFIG domain) —
   * DS hanya menyediakan slot styling, mapping tetap di app. Mengoverride warna variant.
   */
  tone?: string
}

function StatusBadge({ className, variant, tone, style, ...props }: StatusBadgeProps) {
  return (
    <div
      className={cn(statusBadgeVariants({ variant }), className)}
      style={
        tone ? { backgroundColor: `hsl(${tone} / 0.12)`, color: `hsl(${tone})`, ...style } : style
      }
      {...props}
    />
  )
}

export { StatusBadge, statusBadgeVariants }
