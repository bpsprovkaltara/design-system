'use client'

import * as React from 'react'
import { Eye } from 'lucide-react'

import { Button } from '@/components/ui/button'

type RowDetailSize = 'icon-sm' | 'icon'

export type RowDetailLinkProps = {
  /** Label unik per baris untuk `aria-label` / `title` (wajib). */
  label: string
  size?: RowDetailSize
  variant?: 'ghost' | 'outline'
  className?: string
} & (
  | {
      href: string
      asChild?: false
      children?: never
    }
  | {
      href?: never
      asChild: true
      /** Elemen tautan kerangka (Next `Link`, React Router `Link`, dll.). */
      children: React.ReactElement
    }
)

/**
 * Afordansi kolom aksi "lihat detail" — Button ikon + Eye.
 * Default memakai `<a href>`; konsumen Next/React Router pakai `asChild`.
 */
export function RowDetailLink({
  label,
  size = 'icon-sm',
  variant = 'ghost',
  className,
  ...props
}: RowDetailLinkProps) {
  const icon = <Eye className="h-4 w-4" aria-hidden="true" />

  if (props.asChild) {
    const child = React.Children.only(props.children) as React.ReactElement<{
      children?: React.ReactNode
      'aria-label'?: string
      title?: string
    }>
    return (
      <Button asChild variant={variant} size={size} className={className}>
        {React.cloneElement(child, {
          'aria-label': label,
          title: label,
          children: icon,
        })}
      </Button>
    )
  }

  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a href={props.href} aria-label={label} title={label}>
        {icon}
      </a>
    </Button>
  )
}
