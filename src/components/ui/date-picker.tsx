'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { Calendar as CalendarIcon, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export interface DatePickerProps {
  /** Controlled bila diberikan. `null` = kosong (controlled). */
  date?: Date | null
  onChange?: (date?: Date) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  clearable?: boolean
}

export function DatePicker({
  date,
  onChange,
  placeholder = 'Pilih tanggal',
  className,
  disabled = false,
  clearable = true,
}: DatePickerProps) {
  const isControlled = date !== undefined
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(date ?? undefined)
  const actualDate = isControlled ? (date ?? undefined) : internalDate
  const showClear = clearable && actualDate && !disabled

  const handleSelect = (d: Date | undefined) => {
    if (!isControlled) setInternalDate(d)
    onChange?.(d)
  }

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            disabled={disabled}
            className={cn(
              'w-full justify-start text-left font-medium border-border bg-background hover:bg-muted hover:border-border-strong transition-all shadow-sm group',
              !actualDate && 'text-muted-foreground font-normal',
              showClear && 'pr-8',
              className
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="flex-1 truncate">
              {actualDate ? format(actualDate, 'dd MMMM yyyy', { locale: id }) : placeholder}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 border-border shadow-xl animate-in fade-in slide-in-from-top-2 duration-200"
          align="start"
        >
          <Calendar
            mode="single"
            selected={actualDate}
            onSelect={handleSelect}
            initialFocus
            className="bg-background rounded-md"
          />
        </PopoverContent>
      </Popover>
      {showClear && (
        <button
          type="button"
          aria-label="Hapus tanggal"
          onClick={() => handleSelect(undefined)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground opacity-60 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-3 w-3" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
