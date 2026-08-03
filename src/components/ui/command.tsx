'use client'

import * as React from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import { Search } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type CommandProps = React.ComponentProps<typeof CommandPrimitive>

/**
 * Root cmdk wrapper.
 *
 * `variant="dialog"` (default) mengisi penuh kontainer induk (`h-full
 * overflow-hidden`) — kompatibel mundur dengan pemakaian di dalam Dialog.
 *
 * `variant="inline"` melepas kedua kelas itu supaya root bisa dipakai untuk
 * palette inline/anchored (input di topbar + panel saran absolute) tanpa
 * meregang setinggi induk atau memotong panel yang overflow.
 */
function Command({
  className,
  variant = 'dialog',
  ...props
}: CommandProps & {
  variant?: 'dialog' | 'inline'
}) {
  return (
    <CommandPrimitive
      data-slot="command"
      data-variant={variant}
      className={cn(
        'flex w-full flex-col rounded-md bg-popover text-popover-foreground',
        variant === 'dialog' && 'h-full overflow-hidden',
        className
      )}
      {...props}
    />
  )
}

/**
 * Varian dialog dari Command Palette.
 *
 * Perbaikan a11y: `DialogHeader` (berisi `DialogTitle` + `DialogDescription`)
 * dirender DI DALAM `DialogContent` agar Radix menautkan `aria-labelledby`/
 * `aria-describedby` ke elemen `[role=dialog]`. Versi lama menaruhnya sebagai
 * sibling Content sehingga dialog tidak punya accessible name.
 *
 * `commandProps` diteruskan ke instance `<Command>` internal sehingga props
 * cmdk seperti `shouldFilter`, `filter`, `value`, `onValueChange`, `loop`, dan
 * `disablePointerSelection` bisa disetel — diperlukan untuk pencarian
 * asinkron/server-side.
 */
function CommandDialog({
  title = 'Command Palette',
  description = 'Cari perintah untuk dijalankan...',
  children,
  className,
  commandProps,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  commandProps?: CommandProps
  showCloseButton?: boolean
}) {
  const { className: commandClassName, ...restCommandProps } = commandProps ?? {}

  return (
    <Dialog {...props}>
      <DialogContent
        className={cn('overflow-hidden p-0', className)}
        showCloseButton={showCloseButton}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Command
          className={cn(
            // Wrapper input dinaikkan ke h-12 (48px) untuk varian dialog;
            // input sendiri kini h-full jadi tidak perlu override tinggi input.
            '**:data-[slot=command-input-wrapper]:h-12',
            '[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-content-tertiary',
            '[&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0',
            '[&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5',
            '[&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5',
            commandClassName
          )}
          {...restCommandProps}
        >
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  wrapperClassName,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input> & {
  /**
   * Kelas untuk wrapper (pemegang border-b, padding, ikon Search, dan
   * indikator fokus). `className` tetap diterapkan ke `<input>` itu sendiri
   * agar kompatibel mundur.
   */
  wrapperClassName?: string
}) {
  return (
    <div
      data-slot="command-input-wrapper"
      className={cn(
        'flex h-9 items-center gap-2 border-b border-border-subtle px-3',
        // Indikator fokus dipindah ke wrapper: ring konvensional pada seluruh
        // field, bukan inset shadow 2px di dalam input yang terbaca sebagai
        // palang hitam. Tanpa !important, konsumen bisa mengganti gaya fokus.
        'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-0',
        wrapperClassName
      )}
    >
      <Search className="size-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          // Tinggi input mengikuti wrapper (h-full) → konsisten dengan h-9.
          'flex h-full w-full bg-transparent text-body-sm',
          // outline dimatikan tanpa !important; penanda fokus ada di wrapper.
          'outline-none focus-visible:outline-none',
          'placeholder:text-content-tertiary',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    </div>
  )
}

function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn('max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto', className)}
      {...props}
    />
  )
}

function CommandEmpty({ ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-body-sm text-content-secondary"
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        'overflow-hidden p-1 text-content-primary [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-caption [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-content-tertiary',
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn('-mx-1 h-px bg-border-subtle', className)}
      {...props}
    />
  )
}

function CommandItem({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        'relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-body-sm outline-hidden select-none',
        'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
        'data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground',
        '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4 [&_svg:not([class*=text-])]:text-content-tertiary',
        className
      )}
      {...props}
    />
  )
}

function CommandShortcut({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn('ml-auto text-caption tracking-widest text-content-tertiary', className)}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
