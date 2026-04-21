import React from 'react';

interface SectionHeaderProps {
  title: string;
  description: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="mb-8 border-b pb-6">
      <h1 className="display-sm text-primary mb-2">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

interface ShowcaseSectionProps {
  title: string;
  children: React.ReactNode;
}

export function ShowcaseSection({ title, children }: ShowcaseSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="h3 mb-6 text-foreground">{title}</h2>
      <div>{children}</div>
    </section>
  );
}
