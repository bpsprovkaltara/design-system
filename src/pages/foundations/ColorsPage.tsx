import React from 'react';
import { SectionHeader, ShowcaseSection } from '@/components/showcase/SectionHeader';
import { ColorSwatch, HexColorSwatch } from '@/components/showcase/ColorSwatch';
import { CodeBlock } from '@/components/showcase/CodeBlock';

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
          <ColorSwatch name="Background" variable="background" value="0 0% 100%" darkText className="border" />
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
          Warna ini disediakan via konfigurasi Tailwind kustom untuk panel administratif yang padat data.
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
          <HexColorSwatch name="50" variable="warm-50" hexValue="#faf8f5" darkText className="w-24" />
          <HexColorSwatch name="100" variable="warm-100" hexValue="#f5f0ea" darkText className="w-24" />
          <HexColorSwatch name="200" variable="warm-200" hexValue="#ebe4da" darkText className="w-24" />
        </div>
      </ShowcaseSection>
    </div>
  );
}
