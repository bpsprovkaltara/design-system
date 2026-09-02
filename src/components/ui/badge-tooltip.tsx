'use client'

import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export interface BadgeTooltipProps {
  children: ReactNode
  /** Teks tooltip. String kosong → render `children` tanpa wrapper. */
  content: string
  side?: 'top' | 'bottom' | 'left' | 'right'
  /** Kelas lebar maksimal konten (default `max-w-64`). */
  maxContentWidth?: string
  delayDuration?: number
}

/**
 * Wrapper tipis Tooltip untuk badge/ikon — menghilangkan boilerplate Provider/Trigger/Content.
 */
export function BadgeTooltip({
  children,
  content,
  side = 'top',
  maxContentWidth = 'max-w-64',
  delayDuration = 200,
}: BadgeTooltipProps) {
  if (!content) {
    return <>{children}</>
  }

  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex cursor-help">{children}</span>
        </TooltipTrigger>
        <TooltipContent side={side} className={cn(maxContentWidth)}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
