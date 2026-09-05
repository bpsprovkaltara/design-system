import * as React from 'react'

import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export interface SidebarAccountProps {
  name: string
  roleLabel?: string
  /** Inisial di `AvatarFallback` (default: huruf pertama `name`). */
  initials?: string
  avatarSrc?: string | null
  collapsed?: boolean
  /** Slot di atas kartu akun (mis. role switcher). */
  leading?: React.ReactNode
  /** Aksi di mode expanded (mis. tombol Keluar). */
  actions?: React.ReactNode
  /** Aksi di mode collapsed (ikon saja). */
  collapsedActions?: React.ReactNode
  className?: string
}

/**
 * Chrome footer akun di sidebar gelap — presentational saja.
 * Auth, form logout, dan ganti peran tetap di aplikasi.
 */
export function SidebarAccount({
  name,
  roleLabel,
  initials,
  avatarSrc,
  collapsed = false,
  leading,
  actions,
  collapsedActions,
  className,
}: SidebarAccountProps) {
  const fallback = (initials ?? name.charAt(0)).toUpperCase()

  const avatar = (
    <Avatar className="size-8 shrink-0 ring-1 ring-sidebar-active/40">
      {avatarSrc ? <AvatarImage src={avatarSrc} alt="" /> : null}
      <AvatarFallback className="bg-brand-primary text-[10px] font-semibold text-white">
        {fallback}
      </AvatarFallback>
    </Avatar>
  )

  return (
    <div
      data-slot="sidebar-account"
      className={cn('flex flex-col gap-2', collapsed && 'items-center', className)}
    >
      {leading}
      {collapsed ? (
        <div className="flex flex-col items-center gap-2">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="inline-flex">{avatar}</span>
              </TooltipTrigger>
              <TooltipContent side="right">{name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {collapsedActions}
        </div>
      ) : (
        <div className="flex items-center justify-between gap-2 rounded-xl bg-white/5 p-2 ring-1 ring-white/10">
          <div className="flex min-w-0 items-center gap-2">
            {avatar}
            <div className="min-w-0 leading-tight">
              <p className="truncate text-xs font-semibold text-sidebar-foreground">{name}</p>
              {roleLabel ? (
                <p className="truncate text-[10px] text-sidebar-muted">{roleLabel}</p>
              ) : null}
            </div>
          </div>
          {actions ? <div className="shrink-0">{actions}</div> : null}
        </div>
      )}
    </div>
  )
}
