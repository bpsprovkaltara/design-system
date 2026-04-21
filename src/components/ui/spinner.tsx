import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const spinnerVariants = cva('animate-spin rounded-full border-current', {
  variants: {
    size: {
      xs: 'h-3 w-3 border-[1.5px]',
      sm: 'h-4 w-4 border-2',
      default: 'h-5 w-5 border-2',
      lg: 'h-6 w-6 border-[2.5px]',
      xl: 'h-8 w-8 border-[3px]',
    },
  },
  defaultVariants: { size: 'default' },
})

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string
  label?: string
}

function Spinner({ size, className, label = 'Loading...' }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn(spinnerVariants({ size }), 'border-t-transparent', className)}
    />
  )
}

export { Spinner }
