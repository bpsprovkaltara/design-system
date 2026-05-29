import React from 'react'
import { SectionHeader, ShowcaseSection } from '@/components/showcase/SectionHeader'
import { CodeBlock } from '@/components/showcase/CodeBlock'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

export function OverlaysPage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader
        title="Overlays"
        description="Komponen yang muncul di atas konten utama: dialog, sheet, popover, tooltip, menu, dan command palette."
      />

      <ShowcaseSection title="Dialog">
        <div className="rounded-lg border bg-card p-8">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Buka Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Konfirmasi Penyimpanan</DialogTitle>
                <DialogDescription>
                  Data yang Anda masukkan akan disimpan permanen. Lanjutkan?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Batal</Button>
                <Button>Simpan</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <CodeBlock>{`<Dialog>
  <DialogTrigger asChild>
    <Button>Buka Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Konfirmasi Penyimpanan</DialogTitle>
      <DialogDescription>...</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Batal</Button>
      <Button>Simpan</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Sheet (Side Panel)">
        <div className="rounded-lg border bg-card p-8 flex gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Kanan</Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Filter Lanjutan</SheetTitle>
                <SheetDescription>Atur kriteria pencarian.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Kiri</Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Menu Navigasi</SheetTitle>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <CodeBlock>{`<Sheet>
  <SheetTrigger asChild><Button>Buka</Button></SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Filter Lanjutan</SheetTitle>
    </SheetHeader>
  </SheetContent>
</Sheet>`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Popover">
        <div className="rounded-lg border bg-card p-8">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Tampilkan Info</Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Periode Pelaporan</h4>
                <p className="text-sm text-muted-foreground">
                  Data ditampilkan untuk periode triwulan terakhir.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <CodeBlock>{`<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Tampilkan Info</Button>
  </PopoverTrigger>
  <PopoverContent>...</PopoverContent>
</Popover>`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Tooltip">
        <div className="rounded-lg border bg-card p-8">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Arahkan kursor</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Aksi cepat: Ctrl + K</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CodeBlock>{`<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button>Arahkan kursor</Button>
    </TooltipTrigger>
    <TooltipContent><p>Aksi cepat: Ctrl + K</p></TooltipContent>
  </Tooltip>
</TooltipProvider>`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Dropdown Menu">
        <div className="rounded-lg border bg-card p-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Opsi</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Aksi Cepat</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Lihat detail</DropdownMenuItem>
              <DropdownMenuItem>Ubah</DropdownMenuItem>
              <DropdownMenuItem>Duplikasi</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Hapus</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CodeBlock>{`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Opsi</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Aksi Cepat</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Lihat detail</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Command Palette">
        <div className="rounded-lg border bg-card p-8">
          <Command className="rounded-lg border max-w-md">
            <CommandInput placeholder="Cari menu atau aksi..." />
            <CommandList>
              <CommandEmpty>Tidak ditemukan.</CommandEmpty>
              <CommandGroup heading="Halaman">
                <CommandItem>Dashboard</CommandItem>
                <CommandItem>Daftar Pegawai</CommandItem>
                <CommandItem>Pengaturan</CommandItem>
              </CommandGroup>
              <CommandGroup heading="Aksi">
                <CommandItem>Tambah data baru</CommandItem>
                <CommandItem>Ekspor laporan</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
        <CodeBlock>{`<Command>
  <CommandInput placeholder="Cari menu atau aksi..." />
  <CommandList>
    <CommandEmpty>Tidak ditemukan.</CommandEmpty>
    <CommandGroup heading="Halaman">
      <CommandItem>Dashboard</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}</CodeBlock>
      </ShowcaseSection>
    </div>
  )
}
