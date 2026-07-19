'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { type DateRange } from 'react-day-picker'
import { Calendar as CalendarIcon, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export interface DateRangePickerProps {
  range?: DateRange
  onChange?: (range?: DateRange) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  clearable?: boolean
}

function formatRange(range: DateRange | undefined): string {
  if (!range?.from) return ''
  if (!range.to) return format(range.from, 'dd MMM yyyy', { locale: id })
  return `${format(range.from, 'dd MMM', { locale: id })} – ${format(range.to, 'dd MMM yyyy', { locale: id })}`
}

export function DateRangePicker({
  range,
  onChange,
  placeholder = 'Pilih rentang tanggal',
  className,
  disabled = false,
  clearable = true,
}: DateRangePickerProps) {
  const [internalRange, setInternalRange] = React.useState<DateRange | undefined>(range)
  const actualRange = range !== undefined ? range : internalRange

  const handleSelect = (r: DateRange | undefined) => {
    if (range === undefined) {
      setInternalRange(r)
    }
    onChange?.(r)
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    handleSelect(undefined)
  }

  const displayText = formatRange(actualRange)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            'w-full justify-start text-left font-medium border-border bg-background hover:bg-muted hover:border-border-strong transition-all shadow-sm group',
            !actualRange?.from && 'text-muted-foreground font-normal',
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="flex-1 truncate">{displayText || placeholder}</span>
          {clearable && actualRange?.from && !disabled && (
            <X
              className="h-3 w-3 ml-2 opacity-40 hover:opacity-100 transition-opacity"
              onClick={handleClear}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 border-border shadow-xl animate-in fade-in slide-in-from-top-2 duration-200"
        align="start"
      >
        <Calendar
          mode="range"
          selected={actualRange}
          onSelect={handleSelect}
          initialFocus
          numberOfMonths={2}
          className="bg-background rounded-md"
        />
      </PopoverContent>
    </Popover>
  )
}
