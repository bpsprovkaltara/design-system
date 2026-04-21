import React from 'react';
import { SectionHeader, ShowcaseSection } from '@/components/showcase/SectionHeader';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

export function ToastPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader 
        title="Toast Notifications" 
        description="Pesan ringkas yang muncul untuk memberikan feedback aksi."
      />

      <ShowcaseSection title="Examples">
        <div className="flex flex-wrap gap-4 border rounded-lg p-8 bg-card">
          <Button 
            variant="outline" 
            onClick={() => {
              toast({
                title: "Data Disimpan",
                description: "Perubahan pada laporan berhasil disimpan.",
              })
            }}
          >
            Default Toast
          </Button>

          <Button 
            variant="destructive" 
            onClick={() => {
              toast({
                variant: "destructive",
                title: "Gagal Mengunduh",
                description: "Terjadi kesalahan pada server saat mengekspor data.",
              })
            }}
          >
            Error Toast
          </Button>
        </div>
      </ShowcaseSection>
      <Toaster />
    </div>
  );
}
