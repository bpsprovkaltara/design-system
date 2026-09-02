'use client'

import * as React from 'react'
import {
  Children,
  forwardRef,
  isValidElement,
  useCallback,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type ReactNode,
  type SelectHTMLAttributes,
} from 'react'

import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type SelectOption = {
  key: React.Key
  value: string
  label: ReactNode
  disabled: boolean
}

function getSelectOptions(children: ReactNode): SelectOption[] {
  return Children.toArray(children).flatMap((child, index) => {
    if (!isValidElement(child) || child.type !== 'option') return []

    const props = child.props as {
      value?: string | number | readonly string[]
      label?: string
      disabled?: boolean
      children?: ReactNode
    }
    const fallbackValue = typeof props.children === 'string' ? props.children : String(index)
    const rawValue = props.value ?? fallbackValue
    const value = Array.isArray(rawValue) ? rawValue.join(',') : String(rawValue)

    return [
      {
        key: child.key ?? value,
        value,
        label: props.label ?? props.children,
        disabled: Boolean(props.disabled),
      },
    ]
  })
}

function toStringValue(value: SelectHTMLAttributes<HTMLSelectElement>['value']): string {
  if (Array.isArray(value)) return value[0] ?? ''
  return value === undefined || value === null ? '' : String(value)
}

/**
 * Select yang kompatibel dengan `register()` react-hook-form dan POST form native.
 * Merender `<select hidden>` + Radix Select visual; sinkron dua arah.
 */
export const SelectInput = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  function SelectInput(
    { className, children, value, defaultValue, disabled, id, name, onBlur, onChange, ...props },
    ref
  ) {
    const emptyValue = `${useId()}-empty`
    const hiddenRef = useRef<HTMLSelectElement | null>(null)
    const options = useMemo(() => getSelectOptions(children), [children])
    const firstValue = options[0]?.value ?? ''
    const defaultSelectValue = defaultValue !== undefined ? toStringValue(defaultValue) : firstValue
    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = useState(defaultSelectValue)
    const selectedValue = isControlled ? toStringValue(value) : internalValue

    const setRefs = useCallback(
      (node: HTMLSelectElement | null) => {
        hiddenRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      },
      [ref]
    )

    useLayoutEffect(() => {
      if (!isControlled && hiddenRef.current) {
        setInternalValue(hiddenRef.current.value)
      }
      if (isControlled && hiddenRef.current) {
        hiddenRef.current.value = selectedValue
      }
    }, [isControlled, selectedValue])

    const toRadixValue = (nextValue: string) => (nextValue === '' ? emptyValue : nextValue)
    const fromRadixValue = (nextValue: string) => (nextValue === emptyValue ? '' : nextValue)

    const notifyChange = (nextValue: string) => {
      if (!isControlled) setInternalValue(nextValue)
      if (hiddenRef.current) {
        hiddenRef.current.value = nextValue
        onChange?.({
          target: hiddenRef.current,
          currentTarget: hiddenRef.current,
        } as ChangeEvent<HTMLSelectElement>)
      }
    }

    const notifyBlur = () => {
      if (!hiddenRef.current) return
      onBlur?.({
        target: hiddenRef.current,
        currentTarget: hiddenRef.current,
      } as FocusEvent<HTMLSelectElement>)
    }

    return (
      <>
        <select
          {...props}
          ref={setRefs}
          name={name}
          disabled={disabled}
          defaultValue={defaultSelectValue}
          tabIndex={-1}
          aria-hidden="true"
          hidden
        >
          {children}
        </select>
        <Select
          value={toRadixValue(selectedValue)}
          onValueChange={(nextValue: string) => notifyChange(fromRadixValue(nextValue))}
          disabled={disabled}
        >
          <SelectTrigger id={id} onBlur={notifyBlur} className={cn('w-full', className)}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem
                key={option.key}
                value={toRadixValue(option.value)}
                disabled={option.disabled}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </>
    )
  }
)
