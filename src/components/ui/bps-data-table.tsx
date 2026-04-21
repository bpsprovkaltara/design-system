import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

interface BpsDataTableProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Record<string, any>[]
  columns: { 
    key: string; 
    label: string; 
    render?: (val: any, row: any) => React.ReactNode 
  }[]
}

export function BpsDataTable({ data, columns, className, ...props }: BpsDataTableProps) {
  return (
    <div className={cn("w-full overflow-auto rounded-lg border border-border bg-background shadow-sm", className)} {...props}>
      <table className="w-full caption-bottom text-sm border-collapse">
        <thead className="bg-muted/50 border-b-2 border-border">
          <tr className="transition-colors">
            {columns.map((col) => (
              <th
                key={col.key}
                className="h-12 px-4 text-left align-middle font-extrabold text-foreground uppercase tracking-widest text-[9.5px]"
              >
                {col.label}
              </th>
            ))}
            <th className="h-12 px-4 text-right align-middle font-extrabold text-foreground uppercase tracking-widest text-[9.5px]">
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
              {columns.map((col) => (
                <td key={col.key} className="p-4 align-middle text-foreground font-medium">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
              <td className="p-4 align-middle text-right">
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 font-bold h-7 px-2">Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
