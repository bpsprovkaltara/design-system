import React from 'react'
import { SectionHeader, ShowcaseSection } from '@/components/showcase/SectionHeader'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'

export function DrawerPage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader title="Drawer" description="Panel laci yang muncul dari bawah layar." />

      <ShowcaseSection title="Basic Drawer">
        <div className="flex flex-wrap gap-4 border rounded-lg p-8 bg-card items-center justify-center">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Open Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Pengaturan Akun</DrawerTitle>
                  <DrawerDescription>Kelola preferensi akun Anda di sini.</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0 flex flex-col gap-4">
                  <div className="h-32 bg-muted rounded flex items-center justify-center">
                    Konten Laci
                  </div>
                </div>
                <DrawerFooter>
                  <Button>Simpan Pengaturan</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Batal</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </ShowcaseSection>
    </div>
  )
}
