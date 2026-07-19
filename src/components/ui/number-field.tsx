'use client'

import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const numberFormatter = new Intl.NumberFormat('id-ID')

export interface NumberFieldProps
  extends Omit<React.ComponentProps<'input'>, 'type' | 'value' | 'onChange' | 'defaultValue'> {
  value?: number | null
  defaultValue?: number | null
  onChange?: (value: number | null) => void
  label?: string
  unit?: string
  allowDecimal?: boolean
}

function parseIdNumber(raw: string, allowDecimal: boolean): number | null {
  const trimmed = raw.trim()
  if (!trimmed) return null
  const normalized = trimmed.replace(/\./g, '').replace(',', '.')
  if (allowDecimal) {
    if (!/^-?\d+(\.\d+)?$/.test(normalized)) return null
  } else if (!/^-?\d+$/.test(normalized)) {
    return null
  }
  const parsed = Number(normalized)
  return Number.isFinite(parsed) ? parsed : null
}

function formatDisplay(value: number | null | undefined, allowDecimal: boolean): string {
  if (value == null || Number.isNaN(value)) return ''
  if (!allowDecimal) return numberFormatter.format(value)
  return numberFormatter.format(value)
}

export function NumberField({
  value,
  defaultValue = null,
  onChange,
  label,
  unit,
  allowDecimal = false,
  className,
  id,
  disabled,
  placeholder,
  ...props
}: NumberFieldProps) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = React.useState<number | null>(defaultValue ?? null)
  const [text, setText] = React.useState(() =>
    formatDisplay(isControlled ? value : defaultValue, allowDecimal)
  )
  const [focused, setFocused] = React.useState(false)

  const actualValue = isControlled ? (value ?? null) : internalValue

  React.useEffect(() => {
    if (!focused) {
      setText(formatDisplay(actualValue, allowDecimal))
    }
  }, [actualValue, allowDecimal, focused])

  const commit = (raw: string) => {
    const parsed = parseIdNumber(raw, allowDecimal)
    if (!isControlled) setInternalValue(parsed)
    onChange?.(parsed)
    setText(formatDisplay(parsed, allowDecimal))
  }

  return (
    <div className={cn('space-y-2.5', className)}>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <div className="relative">
        <Input
          {...props}
          id={inputId}
          inputMode={allowDecimal ? 'decimal' : 'numeric'}
          disabled={disabled}
          placeholder={placeholder}
          value={focused ? text : formatDisplay(actualValue, allowDecimal)}
          onFocus={(event) => {
            setFocused(true)
            setText(
              actualValue == null
                ? ''
                : allowDecimal
                  ? String(actualValue).replace('.', ',')
                  : String(actualValue)
            )
            props.onFocus?.(event)
          }}
          onBlur={(event) => {
            setFocused(false)
            commit(text)
            props.onBlur?.(event)
          }}
          onChange={(event) => {
            setText(event.target.value)
          }}
          className={cn(unit && 'pr-12')}
        />
        {unit && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            {unit}
          </span>
        )}
      </div>
    </div>
  )
}
