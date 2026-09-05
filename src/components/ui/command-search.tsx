'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { Command, CommandEmpty, CommandInput, CommandList } from '@/components/ui/command'

export interface CommandSearchProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Paksa panel terbuka/tertutup. Default: terbuka bila query non-kosong. */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  placeholder?: string
  /** Label aksesibel Command root. */
  label?: string
  loading?: boolean
  loadingLabel?: string
  emptyLabel?: string
  /** Daftarkan pintasan ⌘K / Ctrl+K untuk fokus input (default true). */
  enableShortcut?: boolean
  children?: React.ReactNode
  className?: string
  panelClassName?: string
  inputClassName?: string
}

/**
 * Pola pencarian topbar: `Command` inline + panel saran absolute.
 * Fetch/hasil tetap di app — isi `children` dengan `CommandGroup`/`CommandItem`.
 */
export function CommandSearch({
  value: valueProp,
  defaultValue = '',
  onValueChange,
  open: openProp,
  onOpenChange,
  placeholder = 'Cari…',
  label = 'Pencarian',
  loading = false,
  loadingLabel = 'Mencari…',
  emptyLabel = 'Tidak ada hasil.',
  enableShortcut = true,
  children,
  className,
  panelClassName,
  inputClassName,
}: CommandSearchProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
  const isValueControlled = valueProp !== undefined
  const value = isValueControlled ? valueProp : uncontrolledValue

  const trimmed = value.trim()
  const autoOpen = trimmed.length > 0
  const isOpenControlled = openProp !== undefined
  const open = isOpenControlled ? openProp : autoOpen

  const setValue = React.useCallback(
    (next: string) => {
      if (!isValueControlled) setUncontrolledValue(next)
      onValueChange?.(next)
      if (!isOpenControlled) {
        onOpenChange?.(next.trim().length > 0)
      }
    },
    [isValueControlled, isOpenControlled, onValueChange, onOpenChange]
  )

  const setOpen = React.useCallback(
    (next: boolean) => {
      onOpenChange?.(next)
    },
    [onOpenChange]
  )

  React.useEffect(() => {
    if (!enableShortcut) return
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
        inputRef.current?.select()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [enableShortcut])

  const hasChildren = React.Children.count(children) > 0

  return (
    <Command
      shouldFilter={false}
      label={label}
      variant="inline"
      className={cn(
        'relative h-auto w-full max-w-sm overflow-visible rounded-lg border border-border-subtle bg-surface-sunken',
        'focus-within:ring-2 focus-within:ring-ring',
        className
      )}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault()
          setOpen(false)
          inputRef.current?.blur()
        }
      }}
    >
      <CommandInput
        ref={inputRef}
        value={value}
        onValueChange={setValue}
        onFocus={() => {
          if (trimmed.length > 0) setOpen(true)
        }}
        onBlur={() => setOpen(false)}
        placeholder={placeholder}
        aria-keyshortcuts="Meta+K Control+K"
        wrapperClassName="border-b-0"
        className={cn('h-9', inputClassName)}
      />

      {open ? (
        <div
          className={cn(
            'absolute top-full left-0 z-50 mt-2 w-[min(28rem,calc(100vw-2rem))] overflow-hidden rounded-lg border border-border-subtle bg-popover shadow-elevation-3',
            panelClassName
          )}
        >
          <CommandList
            // Cegah blur input saat item diklik — tanpa ini panel hilang sebelum onSelect.
            onMouseDown={(event) => event.preventDefault()}
            className="max-h-[min(60vh,320px)]"
          >
            {!hasChildren ? (
              <CommandEmpty>{loading ? loadingLabel : emptyLabel}</CommandEmpty>
            ) : null}
            {children}
          </CommandList>
        </div>
      ) : null}
    </Command>
  )
}
