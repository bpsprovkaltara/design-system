'use client'

import * as React from 'react'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

export interface YearSelectProps {
  value?: number
  onChange?: (year: number) => void
  /** Inclusive start year. Defaults to currentYear - 10. */
  fromYear?: number
  /** Inclusive end year. Defaults to currentYear. */
  toYear?: number
  label?: string
  placeholder?: string
  disabled?: boolean
  className?: string
  id?: string
}

function buildYears(fromYear: number, toYear: number): number[] {
  const start = Math.min(fromYear, toYear)
  const end = Math.max(fromYear, toYear)
  const years: number[] = []
  for (let year = end; year >= start; year -= 1) {
    years.push(year)
  }
  return years
}

export function YearSelect({
  value,
  onChange,
  fromYear,
  toYear,
  label = 'Tahun',
  placeholder = 'Pilih tahun',
  disabled = false,
  className,
  id,
}: YearSelectProps) {
  const currentYear = new Date().getFullYear()
  const resolvedFrom = fromYear ?? currentYear - 10
  const resolvedTo = toYear ?? currentYear
  const years = React.useMemo(
    () => buildYears(resolvedFrom, resolvedTo),
    [resolvedFrom, resolvedTo]
  )
  const triggerId = React.useId()
  const selectId = id ?? triggerId

  return (
    <div className={cn('space-y-2.5', className)}>
      <Label htmlFor={selectId}>{label}</Label>
      <Select
        value={value != null ? String(value) : undefined}
        onValueChange={(next) => onChange?.(Number(next))}
        disabled={disabled}
      >
        <SelectTrigger id={selectId} className="w-full min-w-[10rem]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={String(year)}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
