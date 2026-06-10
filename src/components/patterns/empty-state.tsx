import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

/* Geometric illustration SVGs — inline for zero-dependency self-containment */
function IllustrationEmpty({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Background grid — Swiss editorial grid feel */}
      <line x1="0" y1="80" x2="200" y2="80" stroke="hsl(var(--border-subtle))" strokeWidth="1" />
      <line x1="100" y1="0" x2="100" y2="160" stroke="hsl(var(--border-subtle))" strokeWidth="1" />
      {/* Document stack */}
      <rect
        x="60"
        y="50"
        width="70"
        height="85"
        rx="3"
        fill="hsl(var(--warm-100-hsl))"
        stroke="hsl(var(--border-default))"
        strokeWidth="1.5"
      />
      <rect
        x="55"
        y="44"
        width="70"
        height="85"
        rx="3"
        fill="hsl(var(--surface-raised))"
        stroke="hsl(var(--border-default))"
        strokeWidth="1.5"
      />
      <rect
        x="50"
        y="38"
        width="70"
        height="85"
        rx="3"
        fill="hsl(var(--surface-raised))"
        stroke="hsl(var(--border-strong))"
        strokeWidth="1.5"
      />
      {/* Lines on top document */}
      <line
        x1="62"
        y1="58"
        x2="108"
        y2="58"
        stroke="hsl(var(--border-default))"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="62"
        y1="68"
        x2="100"
        y2="68"
        stroke="hsl(var(--border-default))"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="62"
        y1="78"
        x2="104"
        y2="78"
        stroke="hsl(var(--border-default))"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="62"
        y1="88"
        x2="95"
        y2="88"
        stroke="hsl(var(--border-default))"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Amber accent dot — warm human touch */}
      <circle cx="152" cy="36" r="12" fill="hsl(var(--amber-100))" />
      <circle cx="152" cy="36" r="6" fill="hsl(var(--amber-400))" />
    </svg>
  )
}

function IllustrationSearch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <line x1="0" y1="80" x2="200" y2="80" stroke="hsl(var(--border-subtle))" strokeWidth="1" />
      <circle
        cx="90"
        cy="72"
        r="38"
        fill="hsl(var(--surface-raised))"
        stroke="hsl(var(--border-strong))"
        strokeWidth="2"
      />
      <circle cx="90" cy="72" r="24" fill="hsl(var(--warm-50-hsl))" />
      <line
        x1="120"
        y1="101"
        x2="150"
        y2="130"
        stroke="hsl(var(--border-strong))"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="80"
        y1="65"
        x2="100"
        y2="65"
        stroke="hsl(var(--border-default))"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="80"
        y1="73"
        x2="95"
        y2="73"
        stroke="hsl(var(--border-default))"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="148" cy="128" r="8" fill="hsl(var(--amber-400))" />
    </svg>
  )
}

function IllustrationError({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <line x1="0" y1="80" x2="200" y2="80" stroke="hsl(var(--border-subtle))" strokeWidth="1" />
      <rect
        x="60"
        y="35"
        width="80"
        height="90"
        rx="4"
        fill="hsl(var(--surface-raised))"
        stroke="hsl(var(--crimson-300))"
        strokeWidth="2"
      />
      <rect x="60" y="35" width="80" height="24" rx="4" fill="hsl(var(--crimson-50))" />
      <rect x="60" y="47" width="80" height="12" fill="hsl(var(--crimson-50))" />
      <line
        x1="95"
        y1="80"
        x2="105"
        y2="90"
        stroke="hsl(var(--crimson-600))"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="105"
        y1="80"
        x2="95"
        y2="90"
        stroke="hsl(var(--crimson-600))"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="100" cy="105" r="3" fill="hsl(var(--crimson-400))" />
      <line
        x1="100"
        y1="96"
        x2="100"
        y2="103"
        stroke="hsl(var(--crimson-400))"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

const illustrations = {
  empty: IllustrationEmpty,
  search: IllustrationSearch,
  error: IllustrationError,
}

export interface EmptyStateProps {
  illustration?: keyof typeof illustrations | React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
    variant?: 'default' | 'outline' | 'ghost'
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  className?: string
  compact?: boolean
}

function EmptyState({
  illustration = 'empty',
  title,
  description,
  action,
  secondaryAction,
  className,
  compact = false,
}: EmptyStateProps) {
  const IllustrationComp =
    typeof illustration === 'string'
      ? illustrations[illustration as keyof typeof illustrations]
      : null

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        compact ? 'gap-3 py-8 px-4' : 'gap-4 py-16 px-6',
        className
      )}
    >
      {IllustrationComp ? (
        <IllustrationComp className={cn(compact ? 'w-28 h-24' : 'w-40 h-32')} />
      ) : (
        illustration
      )}

      <div className="space-y-1.5 max-w-sm">
        <h3
          className={cn('font-semibold text-content-primary', compact ? 'text-body-sm' : 'text-h3')}
        >
          {title}
        </h3>
        {description && (
          <p className={cn('text-content-secondary', compact ? 'text-caption' : 'text-body-sm')}>
            {description}
          </p>
        )}
      </div>

      {(action || secondaryAction) && (
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {action && (
            <Button
              variant={action.variant ?? 'default'}
              size={compact ? 'sm' : 'default'}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant="ghost"
              size={compact ? 'sm' : 'default'}
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export { EmptyState }
