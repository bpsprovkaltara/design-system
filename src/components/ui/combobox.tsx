import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface Option {
  value: string
  label: string
}

interface ComboboxProps {
  options: Option[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  className?: string
  disabled?: boolean
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = 'Pilih item...',
  searchPlaceholder = 'Cari...',
  emptyText = 'Tidak ditemukan.',
  className,
  disabled = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)

  // Gunakan controlled component pattern jika props 'value' ada
  const [internalValue, setInternalValue] = React.useState(value || '')
  const actualValue = value !== undefined ? value : internalValue

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            'w-full justify-between bg-background border-border text-foreground font-medium hover:bg-muted hover:border-border-strong transition-all shadow-sm',
            !actualValue && 'text-muted-foreground font-normal',
            className
          )}
        >
          <span className="truncate">
            {actualValue
              ? options.find((option) => option.value === actualValue)?.label
              : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 border-border shadow-lg animate-in fade-in zoom-in-95 duration-200">
        <Command className="bg-background">
          <CommandInput placeholder={searchPlaceholder} className="h-11" />
          <CommandList className="max-h-[300px]">
            <CommandEmpty className="py-6 text-center text-sm text-muted-foreground italic">
              {emptyText}
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label} // Penting: gunakan label untuk pencarian cmdk yang lebih natural
                  onSelect={() => {
                    const newValue = option.value === actualValue ? '' : option.value
                    if (value === undefined) {
                      setInternalValue(newValue)
                    }
                    onChange?.(newValue)
                    setOpen(false)
                  }}
                  className={cn(
                    'flex items-center justify-between px-3 py-2 cursor-pointer transition-colors',
                    actualValue === option.value
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'hover:bg-muted'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Check
                      className={cn(
                        'h-4 w-4',
                        actualValue === option.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {option.label}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
