import React from 'react'
import { Save } from 'lucide-react'
import { AppTopbar } from '@/components/ui/app-topbar'
import { PageHeader } from '@/components/ui/page-header'
import { FormSection } from '@/components/ui/form-section'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'

export function SettingsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <AppTopbar appTitle="Portal Statistik Internal" />
      <PageHeader
        title="Pengaturan Aplikasi"
        description="Template halaman pengaturan untuk preferensi notifikasi dan kebijakan dokumen."
      />

      <div className="space-y-4">
        <FormSection
          title="Preferensi Notifikasi"
          description="Atur notifikasi proses verifikasi dokumen."
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-md border p-3">
              <div>
                <p className="text-sm font-medium">Email saat dokumen direvisi</p>
                <p className="text-xs text-muted-foreground">
                  Kirim email otomatis kepada penyusun.
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-md border p-3">
              <div>
                <p className="text-sm font-medium">Ringkasan harian</p>
                <p className="text-xs text-muted-foreground">Rekap status dokumen setiap sore.</p>
              </div>
              <Switch />
            </div>
          </div>
        </FormSection>

        <FormSection
          title="Kebijakan Approval"
          description="Aturan dasar sebelum dokumen disetujui."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <label className="label" htmlFor="min-reviewer">
                Minimum reviewer
              </label>
              <Input id="min-reviewer" defaultValue="2" />
            </div>
            <div className="space-y-3">
              <label className="label" htmlFor="sla">
                SLA verifikasi (hari kerja)
              </label>
              <Input id="sla" defaultValue="3" />
            </div>
          </div>
        </FormSection>
      </div>

      <div className="flex justify-end">
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Simpan Pengaturan
        </Button>
      </div>
    </div>
  )
}
