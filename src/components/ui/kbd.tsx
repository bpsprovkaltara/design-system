import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Badge tombol keyboard untuk hint (mis. "⌘K", "↑↓"). `CommandShortcut` hanya
 * slot kanan teks item; `Kbd` adalah badge visual untuk ditampilkan di kolom
 * pencarian, tooltip, atau dokumentasi.
 */
function Kbd({ className, ...props }: React.ComponentProps<'kbd'>) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        'inline-flex h-5 select-none items-center justify-center gap-0.5 rounded border border-border-default bg-surface-raised px-1.5 font-mono text-caption font-medium text-content-secondary',
        className
      )}
      {...props}
    />
  )
}

export { Kbd }
