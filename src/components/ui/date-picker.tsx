import * as React from 'react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { Calendar as CalendarIcon, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface DatePickerProps {
  date?: Date
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
  // Controlled/Uncontrolled pattern
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(date)
  const actualDate = date !== undefined ? date : internalDate

  const handleSelect = (d: Date | undefined) => {
    if (date === undefined) {
      setInternalDate(d)
    }
    onChange?.(d)
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    handleSelect(undefined)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          disabled={disabled}
          className={cn(
            'w-full justify-start text-left font-medium border-border bg-background hover:bg-muted hover:border-border-strong transition-all shadow-sm group',
            !actualDate && 'text-muted-foreground font-normal',
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="flex-1 truncate">
            {actualDate ? format(actualDate, 'dd MMMM yyyy', { locale: id }) : placeholder}
          </span>
          {clearable && actualDate && !disabled && (
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
          mode="single"
          selected={actualDate}
          onSelect={handleSelect}
          initialFocus
          className="bg-background rounded-md"
        />
      </PopoverContent>
    </Popover>
  )
}
