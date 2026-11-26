import { cn } from '@/lib/utils'

export interface FormErrorProps {
  message?: unknown
  id?: string
  className?: string
}

export function FormError({ message, id, className }: FormErrorProps) {
  const text = message ? String(message) : ''
  if (!text) return null

  return (
    <p
      id={id}
      data-slot="form-error"
      role="alert"
      className={cn('mt-1 text-caption font-medium text-feedback-danger', className)}
    >
      {text}
    </p>
  )
}
