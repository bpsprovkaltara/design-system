'use client'

import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const numberFormatter = new Intl.NumberFormat('id-ID')
const editFormatter = new Intl.NumberFormat('id-ID', {
  useGrouping: false,
  maximumFractionDigits: 20,
})

export interface NumberFieldProps extends Omit<
  React.ComponentProps<'input'>,
  'type' | 'value' | 'onChange' | 'defaultValue'
> {
  value?: number | null
  defaultValue?: number | null
  onChange?: (value: number | null) => void
  label?: string
  unit?: string
  allowDecimal?: boolean
}

const ID_NUMBER = /^(-)?(\d+|\d{1,3}(?:\.\d{3})+)(?:,(\d+))?$/

/** `undefined` = tidak valid (jangan simpan); `null` = kosong. */
function parseIdNumber(raw: string, allowDecimal: boolean): number | null | undefined {
  const trimmed = raw.trim()
  if (!trimmed) return null
  const match = ID_NUMBER.exec(trimmed)
  if (!match) return undefined
  const [, sign = '', intPart, fraction] = match
  if (fraction !== undefined && !allowDecimal) return undefined
  const parsed = Number(`${sign}${intPart.replace(/\./g, '')}${fraction ? `.${fraction}` : ''}`)
  return Number.isFinite(parsed) ? parsed : undefined
}

function formatDisplay(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return ''
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
  const [text, setText] = React.useState(() => formatDisplay(isControlled ? value : defaultValue))
  const [focused, setFocused] = React.useState(false)

  const actualValue = isControlled ? (value ?? null) : internalValue

  React.useEffect(() => {
    if (!focused) {
      setText(formatDisplay(actualValue))
    }
  }, [actualValue, focused])

  const commit = (raw: string) => {
    const parsed = parseIdNumber(raw, allowDecimal)
    if (parsed === undefined) {
      setText(formatDisplay(actualValue))
      return
    }
    if (!isControlled) setInternalValue(parsed)
    onChange?.(parsed)
    setText(formatDisplay(parsed))
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
          value={focused ? text : formatDisplay(actualValue)}
          onFocus={(event) => {
            setFocused(true)
            setText(actualValue == null ? '' : editFormatter.format(actualValue))
            props.onFocus?.(event)
          }}
          onBlur={(event) => {
            setFocused(false)
            commit(text)
            props.onBlur?.(event)
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') commit(text)
            props.onKeyDown?.(event)
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
