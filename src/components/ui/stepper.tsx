'use client'

import { Check, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export type StepStatus = 'complete' | 'current' | 'upcoming' | 'error'

export interface Step {
  label: string
  description?: string
}

export interface StepperProps {
  steps: Step[]
  current: number
  statuses?: StepStatus[]
  className?: string
}

function Stepper({ steps, current, statuses, className }: StepperProps) {
  const getStatus = (index: number): StepStatus => {
    if (statuses && statuses[index]) return statuses[index]
    if (index < current) return 'complete'
    if (index === current) return 'current'
    return 'upcoming'
  }

  return (
    <nav aria-label="Langkah pengisian" className={cn('w-full', className)}>
      <ol className="flex items-start gap-0">
        {steps.map((step, i) => {
          const status = getStatus(i)
          const isLast = i === steps.length - 1

          return (
            <li key={i} className={cn('flex items-start', !isLast && 'flex-1')}>
              <div className="flex flex-col items-center">
                <div
                  aria-current={status === 'current' ? 'step' : undefined}
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 font-mono text-xs font-semibold transition-colors',
                    status === 'complete' &&
                      'border-amber-500 bg-amber-500 text-white',
                    status === 'current' &&
                      'border-amber-500 bg-background text-amber-700',
                    status === 'upcoming' &&
                      'border-border-default bg-background text-content-tertiary',
                    status === 'error' &&
                      'border-feedback-danger bg-feedback-danger-bg text-feedback-danger'
                  )}
                >
                  {status === 'complete' ? (
                    <Check className="h-4 w-4" aria-hidden="true" />
                  ) : status === 'error' ? (
                    <AlertCircle className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <span>{String(i + 1).padStart(2, '0')}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <div
                    className={cn(
                      'text-xs font-semibold leading-tight',
                      status === 'current' && 'text-amber-700',
                      status === 'complete' && 'text-content-primary',
                      status === 'upcoming' && 'text-content-tertiary',
                      status === 'error' && 'text-feedback-danger'
                    )}
                  >
                    {step.label}
                  </div>
                  {step.description && (
                    <div className="mt-0.5 text-[10px] text-content-tertiary leading-tight">
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
              {!isLast && (
                <div
                  aria-hidden="true"
                  className={cn(
                    'mx-2 mt-4 h-0.5 flex-1 transition-colors',
                    status === 'complete' ? 'bg-amber-500' : 'bg-border-subtle'
                  )}
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export { Stepper }
