import React from 'react';
import { Layers, Component, Palette } from 'lucide-react';

export function OverviewPage() {
  return (
    <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h1 className="display-lg text-primary tracking-tight">BPS Kaltara<br/>Design System</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Sistem desain berstandar enterprise yang didesain khusus untuk efisiensi, aksesibilitas, 
          dan kepadatan data tinggi pada aplikasi internal Badan Pusat Statistik.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 pt-8">
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
            <Palette className="w-6 h-6" />
          </div>
          <h3 className="font-semibold mb-2">Modern Foundations</h3>
          <p className="text-sm text-muted-foreground">Palet warna Navy & Amber yang dioptimalkan untuk mengurangi kelelahan mata (eye-strain) pada data padat.</p>
        </div>
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
            <Component className="w-6 h-6" />
          </div>
          <h3 className="font-semibold mb-2">Enterprise Components</h3>
          <p className="text-sm text-muted-foreground">Komponen siap pakai yang kompatibel dengan arsitektur shadcn/ui dan Tailwind CSS.</p>
        </div>
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="font-semibold mb-2">Data-Dense Layouts</h3>
          <p className="text-sm text-muted-foreground">Tipografi tabular (IBM Plex Mono) dan layout kompak khusus untuk aplikasi statistik.</p>
        </div>
      </div>

      <div className="pt-8 border-t mt-12">
        <p className="text-sm text-muted-foreground">
          Versi 2.1.0 • Dikembangkan untuk BPS Provinsi Kalimantan Utara.
        </p>
      </div>
    </div>
  );
}
