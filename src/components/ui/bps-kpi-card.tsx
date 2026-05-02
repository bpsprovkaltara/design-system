import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface BpsKpiCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string
  helper?: string
  icon?: React.ReactNode
}

export function BpsKpiCard({ title, value, helper, icon, className, ...props }: BpsKpiCardProps) {
  return (
    <Card className={cn('border-l-4 border-l-primary', className)} {...props}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="numeric text-2xl font-bold">{value}</div>
        {helper ? <p className="mt-1 text-xs text-muted-foreground">{helper}</p> : null}
      </CardContent>
    </Card>
  )
}
