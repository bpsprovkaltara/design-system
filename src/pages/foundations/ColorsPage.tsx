import React from 'react'
import { SectionHeader, ShowcaseSection } from '@/components/showcase/SectionHeader'
import { ColorSwatch, HexColorSwatch } from '@/components/showcase/ColorSwatch'
import { CodeBlock } from '@/components/showcase/CodeBlock'

export function ColorsPage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        title="Colors"
        description="Palet warna utama dan pendukung untuk BPS Kaltara Design System."
      />

      <ShowcaseSection title="Brand Colors">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <ColorSwatch name="Primary (BPS Blue)" variable="primary" value="196 100% 40%" />
          <ColorSwatch name="Accent (BPS Orange)" variable="accent" value="35 93% 54%" darkText />
          <ColorSwatch
            name="Background"
            variable="background"
            value="0 0% 100%"
            darkText
            className="border"
          />
          <ColorSwatch name="Foreground" variable="foreground" value="220 26% 14%" />
        </div>
        <CodeBlock>
          {`<div className="bg-primary text-primary-foreground">BPS Blue</div>
<div className="bg-accent text-accent-foreground">BPS Orange</div>`}
        </CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Semantic / Status Colors">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <ColorSwatch name="Success" variable="success" value="142 71% 45%" />
          <ColorSwatch name="Warning" variable="warning" value="38 92% 50%" darkText />
          <ColorSwatch name="Error / Destructive" variable="destructive" value="0 72% 51%" />
          <ColorSwatch name="Info" variable="info" value="221 83% 53%" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Extended Palettes (Enterprise)">
        <p className="text-muted-foreground mb-4 text-sm">
          Warna ini disediakan via konfigurasi Tailwind kustom untuk panel administratif yang padat
          data.
        </p>

        <h4 className="text-sm font-semibold mb-3 mt-6">Navy Scale</h4>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
          <HexColorSwatch name="50" variable="navy-50" hexValue="#f0f4f8" darkText />
          <HexColorSwatch name="100" variable="navy-100" hexValue="#d9e2ec" darkText />
          <HexColorSwatch name="200" variable="navy-200" hexValue="#bcccdc" darkText />
          <HexColorSwatch name="300" variable="navy-300" hexValue="#9fb3c8" darkText />
          <HexColorSwatch name="400" variable="navy-400" hexValue="#829ab1" />
          <HexColorSwatch name="500" variable="navy-500" hexValue="#627d98" />
          <HexColorSwatch name="600" variable="navy-600" hexValue="#486581" />
          <HexColorSwatch name="700" variable="navy-700" hexValue="#334e68" />
          <HexColorSwatch name="800" variable="navy-800" hexValue="#1e3a5f" />
          <HexColorSwatch name="900" variable="navy-900" hexValue="#0f2b46" />
        </div>

        <h4 className="text-sm font-semibold mb-3 mt-8">Warm (Neutral) Scale</h4>
        <div className="flex gap-4">
          <HexColorSwatch
            name="50"
            variable="warm-50"
            hexValue="#faf8f5"
            darkText
            className="w-24"
          />
          <HexColorSwatch
            name="100"
            variable="warm-100"
            hexValue="#f5f0ea"
            darkText
            className="w-24"
          />
          <HexColorSwatch
            name="200"
            variable="warm-200"
            hexValue="#ebe4da"
            darkText
            className="w-24"
          />
        </div>
        <h4 className="text-sm font-semibold mb-3 mt-8">Slate Scale</h4>
        <div className="grid grid-cols-5 md:grid-cols-11 gap-2">
          <ColorSwatch name="50" variable="slate-50" value="210 40% 98%" darkText />
          <ColorSwatch name="100" variable="slate-100" value="210 40% 96%" darkText />
          <ColorSwatch name="200" variable="slate-200" value="214 32% 91%" darkText />
          <ColorSwatch name="300" variable="slate-300" value="213 27% 84%" darkText />
          <ColorSwatch name="400" variable="slate-400" value="215 20% 65%" />
          <ColorSwatch name="500" variable="slate-500" value="215 16% 47%" />
          <ColorSwatch name="600" variable="slate-600" value="215 19% 35%" />
          <ColorSwatch name="700" variable="slate-700" value="215 25% 27%" />
          <ColorSwatch name="800" variable="slate-800" value="217 33% 17%" />
          <ColorSwatch name="900" variable="slate-900" value="222 47% 11%" />
          <ColorSwatch name="950" variable="slate-950" value="229 84% 5%" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Map tiers (choropleth)">
        <p className="text-muted-foreground mb-4 text-sm">
          Token <code className="text-xs">map-tier-*</code> untuk peta tematik. Di dark mode nilai
          di-override agar kontras tetap terbaca.
        </p>
        <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
          <ColorSwatch name="Tier 0" variable="map-tier-0" value="tier-0" darkText />
          <ColorSwatch name="Tier 1" variable="map-tier-1" value="tier-1" darkText />
          <ColorSwatch name="Tier 2" variable="map-tier-2" value="tier-2" />
          <ColorSwatch name="Tier 3" variable="map-tier-3" value="tier-3" />
          <ColorSwatch name="Tier 4" variable="map-tier-4" value="tier-4" />
          <ColorSwatch name="Tier 5" variable="map-tier-5" value="tier-5" />
          <ColorSwatch
            name="Active"
            variable="map-tier-active"
            value="active"
            darkText
          />
        </div>
        <CodeBlock>{`<div className="bg-map-tier-3 text-content-inverse">Wilayah padat</div>
<div className="bg-map-tier-active">Wilayah aktif</div>`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Brand & data (semantic)">
        <p className="text-muted-foreground mb-4 text-sm">
          Token <code className="text-xs">brand-*</code> dan <code className="text-xs">data-*</code>{' '}
          mengikuti tema terang/gelap. Aktifkan dark mode di footer sidebar untuk memverifikasi.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ColorSwatch name="Brand primary" variable="brand-primary" value="brand" />
          <ColorSwatch name="Brand accent" variable="brand-accent" value="accent" darkText />
          <ColorSwatch name="Data positive" variable="data-positive" value="positive" />
          <ColorSwatch name="Data negative" variable="data-negative" value="negative" />
        </div>
      </ShowcaseSection>
    </div>
  )
}
