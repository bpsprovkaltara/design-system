import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import { SkipLink } from '@/components/ui/skip-link'

const paperGrainSvg = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.92" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0.16  0 0 0 0 0.13  0 0 0 0 0.09  0 0 0 0.55 0"/></filter><rect width="100%" height="100%" filter="url(#n)" opacity="0.07"/></svg>`
)}`

export function ShowcaseLayout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden">
      <SkipLink href="#main-content" />
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 overflow-y-auto relative outline-none"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 mix-blend-multiply opacity-50"
          style={{ backgroundImage: `url("${paperGrainSvg}")`, backgroundSize: '240px 240px' }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-8 py-10 lg:px-14 lg:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-4 right-6 font-mono text-[9px] uppercase tracking-[0.22em] text-content-tertiary/70"
          >
            ⊕&nbsp;BPS·KU·DS
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
