import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from './button'

interface BpsDataTableColumn<T extends Record<string, unknown>> {
  key: string
  label: string
  getValue?: (row: T) => unknown
  render?: {
    bivarianceHack: (val: unknown, row: T) => React.ReactNode
  }['bivarianceHack']
}

interface BpsDataTableProps<
  T extends Record<string, unknown>,
> extends React.HTMLAttributes<HTMLDivElement> {
  data: T[]
  columns: BpsDataTableColumn<T>[]
}

export function BpsDataTable<T extends Record<string, unknown>>({
  data,
  columns,
  className,
  ...props
}: BpsDataTableProps<T>) {
  return (
    <div
      className={cn(
        'w-full overflow-auto rounded-lg border border-border bg-background shadow-sm',
        className
      )}
      {...props}
    >
      <table className="w-full caption-bottom text-sm border-collapse">
        <thead className="bg-muted/50 border-b-2 border-border">
          <tr className="transition-colors">
            {columns.map((col) => (
              <th
                key={col.key}
                className="h-12 px-4 text-left align-middle text-sm font-semibold text-muted-foreground"
              >
                {col.label}
              </th>
            ))}
            <th className="h-12 px-4 text-right align-middle text-sm font-semibold text-muted-foreground">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="bg-background [&_tr:last-child]:border-0">
          {data.map((row, i) => (
            <tr
              key={i}
              className="border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
            >
              {columns.map((col) => {
                const value = col.getValue ? col.getValue(row) : row[col.key as keyof T]

                return (
                  <td key={col.key} className="p-4 align-middle text-foreground font-medium">
                    {col.render ? col.render(value, row) : String(value ?? '-')}
                  </td>
                )
              })}
              <td className="p-4 align-middle text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary/80 font-bold h-7 px-2"
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
