import React from 'react'
import { SectionHeader, ShowcaseSection } from '@/components/showcase/SectionHeader'
import { CodeBlock } from '@/components/showcase/CodeBlock'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'

export function FormControlsPage() {
  const [volume, setVolume] = React.useState<number[]>([45])
  const [notif, setNotif] = React.useState(true)

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        title="Form Controls"
        description="Kontrol input terisolasi: checkbox, radio, switch, dan slider."
      />

      <ShowcaseSection title="Checkbox">
        <div className="rounded-lg border bg-card p-8 space-y-3">
          <div className="flex items-center gap-2">
            <Checkbox id="syarat" />
            <Label htmlFor="syarat">Saya menyetujui syarat & ketentuan</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="disabled" disabled />
            <Label htmlFor="disabled">Opsi nonaktif</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="indet" indeterminate />
            <Label htmlFor="indet">Indeterminate (sebagian terpilih)</Label>
          </div>
        </div>
        <CodeBlock>{`<Checkbox id="syarat" />
<Label htmlFor="syarat">Saya menyetujui syarat & ketentuan</Label>

<Checkbox indeterminate />`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Radio Group">
        <div className="rounded-lg border bg-card p-8">
          <RadioGroup defaultValue="bulanan" className="space-y-3">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="harian" id="r-harian" />
              <Label htmlFor="r-harian">Harian</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="bulanan" id="r-bulanan" />
              <Label htmlFor="r-bulanan">Bulanan</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="tahunan" id="r-tahunan" />
              <Label htmlFor="r-tahunan">Tahunan</Label>
            </div>
          </RadioGroup>
        </div>
        <CodeBlock>{`<RadioGroup defaultValue="bulanan">
  <RadioGroupItem value="harian" id="r-harian" />
  <Label htmlFor="r-harian">Harian</Label>
  <RadioGroupItem value="bulanan" id="r-bulanan" />
  <Label htmlFor="r-bulanan">Bulanan</Label>
</RadioGroup>`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Switch">
        <div className="rounded-lg border bg-card p-8 space-y-4">
          <div className="flex items-center gap-3">
            <Switch id="notif" checked={notif} onCheckedChange={setNotif} />
            <Label htmlFor="notif">Aktifkan notifikasi email</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch id="sw-disabled" disabled />
            <Label htmlFor="sw-disabled">Nonaktif</Label>
          </div>
        </div>
        <CodeBlock>{`<Switch checked={notif} onCheckedChange={setNotif} />
<Label htmlFor="notif">Aktifkan notifikasi email</Label>`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Slider">
        <div className="rounded-lg border bg-card p-8 space-y-6">
          <div className="space-y-3">
            <Label>Tingkat kualitas data: {volume[0]}%</Label>
            <Slider value={volume} onValueChange={setVolume} max={100} step={1} />
          </div>
          <div className="space-y-3">
            <Label>Rentang nilai (min–max)</Label>
            <Slider defaultValue={[20, 80]} max={100} step={5} />
          </div>
        </div>
        <CodeBlock>{`<Slider value={volume} onValueChange={setVolume} max={100} step={1} />

<Slider defaultValue={[20, 80]} max={100} step={5} />`}</CodeBlock>
      </ShowcaseSection>
    </div>
  )
}
