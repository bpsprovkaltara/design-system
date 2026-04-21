import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-shimmer rounded-md bg-border-subtle', className)}
      style={{
        backgroundImage:
          'linear-gradient(90deg, hsl(var(--warm-200-hsl)) 25%, hsl(var(--warm-100-hsl)) 50%, hsl(var(--warm-200-hsl)) 75%)',
        backgroundSize: '1000px 100%',
      }}
      aria-busy="true"
      aria-label="Loading..."
      {...props}
    />
  )
}

export { Skeleton }
