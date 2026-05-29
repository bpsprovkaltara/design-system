import React from 'react'

interface SectionHeaderProps {
  title: string
  description: string
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <header className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-700 shrink-0">
          §&nbsp;Komponen
        </span>
        <span className="h-px flex-1 bg-border-default" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-content-tertiary shrink-0">
          BPS&nbsp;·&nbsp;Kaltara
        </span>
      </div>
      <h1 className="display-lg text-content-primary tracking-tight mb-3">{title}</h1>
      <p className="body-lg text-content-secondary max-w-2xl leading-relaxed mb-8">{description}</p>
      <div className="flex items-center gap-2">
        <span className="h-[3px] w-12 bg-content-primary shrink-0" />
        <span className="h-px flex-1 bg-border-subtle" />
      </div>
    </header>
  )
}

interface ShowcaseSectionProps {
  title: string
  children: React.ReactNode
}

export function ShowcaseSection({ title, children }: ShowcaseSectionProps) {
  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-5">
        <h2 className="h3 text-content-primary shrink-0">{title}</h2>
        <span className="h-px flex-1 bg-border-subtle" />
      </div>
      <div>{children}</div>
    </section>
  )
}
