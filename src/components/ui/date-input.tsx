'use client'

import {
  forwardRef,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type InputHTMLAttributes,
} from 'react'

import { cn } from '@/lib/utils'
import { DatePicker } from '@/components/ui/date-picker'

function parseDateString(value: string): Date | undefined {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim())
  if (!match) return undefined
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
  return Number.isNaN(date.getTime()) ? undefined : date
}

function formatDateString(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Date field yang kompatibel dengan `register()` dan POST form.
 * Nilai native selalu string `yyyy-MM-dd`.
 */
export const DateInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function DateInput(
    { className, value, defaultValue, disabled, id, name, onBlur, onChange, ...props },
    ref
  ) {
    const hiddenRef = useRef<HTMLInputElement | null>(null)
    const defaultStr =
      defaultValue === undefined || defaultValue === null ? '' : String(defaultValue)
    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = useState(defaultStr)
    const stringValue = isControlled ? String(value ?? '') : internalValue

    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        hiddenRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      },
      [ref]
    )

    useLayoutEffect(() => {
      if (!isControlled && hiddenRef.current) {
        const next = hiddenRef.current.value
        if (next !== internalValue) setInternalValue(next)
      }
      if (isControlled && hiddenRef.current) {
        hiddenRef.current.value = stringValue
      }
    }, [isControlled, internalValue, stringValue])

    const notifyChange = (nextValue: string) => {
      if (!isControlled) setInternalValue(nextValue)
      if (hiddenRef.current) {
        hiddenRef.current.value = nextValue
        onChange?.({
          target: hiddenRef.current,
          currentTarget: hiddenRef.current,
        } as ChangeEvent<HTMLInputElement>)
      }
    }

    const notifyBlur = () => {
      if (!hiddenRef.current) return
      onBlur?.({
        target: hiddenRef.current,
        currentTarget: hiddenRef.current,
      } as FocusEvent<HTMLInputElement>)
    }

    return (
      <>
        <input
          {...props}
          ref={setRefs}
          type="hidden"
          id={id}
          name={name}
          disabled={disabled}
          defaultValue={isControlled ? undefined : defaultStr}
          value={isControlled ? stringValue : undefined}
          readOnly
          tabIndex={-1}
          aria-hidden="true"
        />
        <div onBlur={notifyBlur}>
          <DatePicker
            date={parseDateString(stringValue)}
            onChange={(date) => notifyChange(date ? formatDateString(date) : '')}
            disabled={disabled}
            className={cn('w-full', className)}
            clearable
          />
        </div>
      </>
    )
  }
)
