import React from 'react';
import { SectionHeader, ShowcaseSection } from '@/components/showcase/SectionHeader';

export function SpacingPage() {
  const spacings = [
    { name: 'space-0.5', value: '2px', rem: '0.125rem' },
    { name: 'space-1', value: '4px', rem: '0.25rem' },
    { name: 'space-2', value: '8px', rem: '0.5rem' },
    { name: 'space-3', value: '12px', rem: '0.75rem' },
    { name: 'space-4', value: '16px', rem: '1rem' },
    { name: 'space-6', value: '24px', rem: '1.5rem' },
    { name: 'space-8', value: '32px', rem: '2rem' },
    { name: 'space-12', value: '48px', rem: '3rem' },
    { name: 'space-16', value: '64px', rem: '4rem' },
  ];

  const radii = [
    { name: 'sm', value: '4px', class: 'rounded-sm' },
    { name: 'md', value: '6px', class: 'rounded-md' },
    { name: 'lg', value: '8px', class: 'rounded-lg' },
    { name: 'xl', value: '12px', class: 'rounded-xl' },
    { name: 'full', value: '9999px', class: 'rounded-full w-24' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader 
        title="Spacing, Radius, & Layout" 
        description="Sistem jarak, sudut, dan bayangan untuk membangun layout yang konsisten."
      />

      <ShowcaseSection title="Spacing Scale">
        <div className="border rounded-lg p-6 bg-card space-y-4">
          {spacings.map((s) => (
            <div key={s.name} className="flex items-center gap-4">
              <div className="w-24 font-mono text-xs text-muted-foreground shrink-0">{s.name}</div>
              <div className="w-16 font-mono text-xs shrink-0">{s.value}</div>
              <div className="bg-primary/80 rounded-sm h-6" style={{ width: s.value }}></div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Border Radius">
        <div className="flex flex-wrap gap-6 border rounded-lg p-8 bg-card items-end">
          {radii.map((r) => (
            <div key={r.name} className="flex flex-col items-center gap-3">
              <div className={`bg-navy-100 border-2 border-navy-800 h-16 w-16 ${r.class}`}></div>
              <div className="text-center">
                <div className="font-semibold text-sm">{r.name}</div>
                <div className="font-mono text-xs text-muted-foreground">{r.value}</div>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>
    </div>
  );
}
