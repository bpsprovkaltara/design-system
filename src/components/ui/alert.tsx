'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from 'lucide-react'

import { cn } from '@/lib/utils'

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:pl-7',
  {
    variants: {
      variant: {
        default:
          'bg-surface-raised border-border-default text-content-primary [&>svg]:text-content-secondary',
        info: 'bg-feedback-info-bg border-feedback-info/30 text-content-primary [&>svg]:text-feedback-info',
        success:
          'bg-feedback-success-bg border-feedback-success/30 text-content-primary [&>svg]:text-feedback-success',
        warning:
          'bg-feedback-warning-bg border-feedback-warning/30 text-content-primary [&>svg]:text-feedback-warning',
        danger:
          'bg-feedback-danger-bg border-feedback-danger/30 text-content-primary [&>svg]:text-feedback-danger',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

const alertIcons = {
  default: Info,
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  danger: AlertCircle,
}

type AlertProps = React.ComponentPropsWithRef<'div'> &
  VariantProps<typeof alertVariants> & {
    showIcon?: boolean
  }

function Alert({
  className,
  variant = 'default',
  showIcon = true,
  children,
  ref,
  ...props
}: AlertProps) {
  const Icon = alertIcons[variant ?? 'default']
  return (
    <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
      {showIcon && <Icon className="h-4 w-4" aria-hidden="true" />}
      {children}
    </div>
  )
}

Alert.displayName = 'Alert'

function AlertTitle({ className, ref, ...props }: React.ComponentPropsWithRef<'h5'>) {
  return (
    <h5
      ref={ref}
      className={cn('mb-1 font-semibold text-body-sm leading-none tracking-tight', className)}
      {...props}
    />
  )
}

AlertTitle.displayName = 'AlertTitle'

function AlertDescription({ className, ref, ...props }: React.ComponentPropsWithRef<'div'>) {
  return (
    <div ref={ref} className={cn('text-body-sm text-content-secondary', className)} {...props} />
  )
}

AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertTitle, AlertDescription }
