import React from 'react';
import { cn } from '@/lib/utils';

interface ColorSwatchProps {
  name: string;
  variable: string;
  value: string;
  className?: string;
  darkText?: boolean;
}

export function ColorSwatch({ name, variable, value, className, darkText }: ColorSwatchProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div 
        className={cn("h-24 w-full rounded-md border shadow-sm flex items-end p-3", darkText ? "text-slate-900" : "text-white")}
        style={{ backgroundColor: `hsl(var(--${variable}))` }}
      >
        <div className="font-mono text-xs opacity-90">{value}</div>
      </div>
      <div>
        <div className="font-semibold text-sm">{name}</div>
        <div className="font-mono text-xs text-muted-foreground">var(--{variable})</div>
      </div>
    </div>
  );
}

// Untuk warna hex murni tanpa HSL wrapper (seperti skala navy, amber, warm)
export function HexColorSwatch({ name, variable, hexValue, className, darkText }: Omit<ColorSwatchProps, 'value'> & { hexValue: string }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div 
        className={cn("h-16 w-full rounded-md border shadow-sm", darkText ? "text-slate-900" : "text-white")}
        style={{ backgroundColor: `var(--${variable})` }}
      />
      <div>
        <div className="font-semibold text-xs">{name}</div>
        <div className="font-mono text-[10px] text-muted-foreground uppercase">{hexValue}</div>
      </div>
    </div>
  );
}
