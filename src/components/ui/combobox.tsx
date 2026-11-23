'use client'

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

export interface ComboboxOption {
  value: string
  label: string
  /** Teks pendukung (mis. jabatan) di bawah label; ikut dicari. */
  description?: string
}

/**
 * Cocokkan pencarian terhadap label + deskripsi saja (bukan `value`, yang bisa
 * berupa UUID). Substring lebih diutamakan daripada subsequence.
 */
function matchKeywords(_value: string, search: string, keywords?: string[]) {
  const query = search.trim().toLowerCase()
  if (!query) return 1
  const haystack = (keywords ?? []).join(' ').toLowerCase()
  if (haystack.includes(query)) return 1
  let i = 0
  for (const ch of haystack) if (ch === query[i]) i++
  return i === query.length ? 0.5 : 0
}

export interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  /** Kelas untuk tombol trigger. */
  className?: string
  /** Kelas untuk root `Command` di dalam popover. */
  commandClassName?: string
  /** Kelas untuk `<input>` pencarian (`CommandInput`). */
  inputClassName?: string
  /** Kelas untuk wrapper `CommandInput` (border-b, padding, fokus). */
  inputWrapperClassName?: string
  disabled?: boolean
  /**
   * Memilih ulang opsi yang sedang terpilih mengosongkan nilai (`onChange('')`).
   * Setel `false` agar memilih ulang tetap memilih opsi yang sama.
   * @default true
   */
  allowDeselect?: boolean
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = 'Pilih item...',
  searchPlaceholder = 'Cari...',
  emptyText = 'Tidak ditemukan.',
  className,
  commandClassName,
  inputClassName,
  inputWrapperClassName,
  disabled = false,
  allowDeselect = true,
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
        <Command filter={matchKeywords} className={cn('bg-background', commandClassName)}>
          <CommandInput
            placeholder={searchPlaceholder}
            className={inputClassName}
            wrapperClassName={inputWrapperClassName}
          />
          <CommandList className="max-h-[300px]">
            <CommandEmpty className="py-6 text-center text-sm text-muted-foreground italic">
              {emptyText}
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  // `value` unik per opsi (label boleh kembar); pencarian lewat `keywords`.
                  value={option.value}
                  keywords={[option.label, option.description ?? '']}
                  onSelect={() => {
                    const newValue =
                      allowDeselect && option.value === actualValue ? '' : option.value
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
                    <span className="flex flex-col">
                      <span>{option.label}</span>
                      {option.description && (
                        <span className="text-xs font-normal text-muted-foreground">
                          {option.description}
                        </span>
                      )}
                    </span>
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
