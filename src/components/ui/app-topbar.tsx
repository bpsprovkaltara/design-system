import * as React from 'react'
import { Bell, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface AppTopbarProps {
  appTitle: string
}

export function AppTopbar({ appTitle }: AppTopbarProps) {
  return (
    <header className="flex items-center justify-between gap-4 rounded-lg border bg-card p-3">
      <p className="text-sm font-semibold text-foreground">{appTitle}</p>
      <div className="flex items-center gap-2">
        <Input placeholder="Cari menu atau dokumen..." className="w-64" />
        <Button variant="ghost" size="icon" aria-label="Notifikasi">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <User className="h-4 w-4" />
          Admin
        </Button>
      </div>
    </header>
  )
}
