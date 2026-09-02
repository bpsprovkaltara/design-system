'use client'

import {
  forwardRef,
  useCallback,
  useRef,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
} from 'react'

import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'

export type CheckboxInputProps = InputHTMLAttributes<HTMLInputElement> & {
  /** Teks opsional di samping checkbox (tombol untuk memperluas target klik). */
  label?: string
}

/**
 * Checkbox Radix + input native tersembunyi untuk `register()` / POST form.
 * Nama `CheckboxInput` agar tidak bentrok dengan primitif `Checkbox`.
 */
export const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>(
  function CheckboxInput(
    { label, className, onChange, onBlur, checked, defaultChecked, disabled, ...props },
    ref
  ) {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const isControlled = checked !== undefined
    const [uncontrolled, setUncontrolled] = useState(Boolean(defaultChecked))
    const isChecked = isControlled ? Boolean(checked) : uncontrolled

    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
        if (!isControlled && node) {
          setUncontrolled(node.checked)
          queueMicrotask(() => {
            if (inputRef.current) setUncontrolled(inputRef.current.checked)
          })
        }
      },
      [isControlled, ref]
    )

    const setChecked = (next: boolean) => {
      const el = inputRef.current
      if (!el) return
      el.checked = next
      if (!isControlled) setUncontrolled(next)
      onChange?.({
        target: el,
        currentTarget: el,
      } as ChangeEvent<HTMLInputElement>)
    }

    return (
      <div className="inline-flex items-center gap-2 text-body-sm text-content-primary">
        <input
          type="checkbox"
          {...props}
          ref={setRefs}
          {...(isControlled
            ? {
                checked: Boolean(checked),
                readOnly: true,
                onChange: () => {
                  /* driven by visual Checkbox */
                },
              }
            : {
                defaultChecked,
                onChange: (event: ChangeEvent<HTMLInputElement>) => {
                  setUncontrolled(event.target.checked)
                  onChange?.(event)
                },
              })}
          disabled={disabled}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
          onBlur={onBlur}
        />
        <Checkbox
          checked={isChecked}
          disabled={disabled}
          className={cn(className)}
          onCheckedChange={(next: boolean | 'indeterminate') => setChecked(next === true)}
        />
        {label ? (
          <button
            type="button"
            disabled={disabled}
            className="cursor-pointer text-left disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => setChecked(!isChecked)}
          >
            {label}
          </button>
        ) : null}
      </div>
    )
  }
)
