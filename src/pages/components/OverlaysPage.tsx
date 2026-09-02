import { useState } from 'react'
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
import { BadgeTooltip } from '@/components/ui/badge-tooltip'
import { Badge } from '@/components/ui/badge'
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
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command'
import { Kbd } from '@/components/ui/kbd'

function CommandPaletteDialogDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Buka Palet
        <Kbd className="ml-2">⌘K</Kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Cari menu atau aksi..." />
        <CommandList>
          <CommandEmpty>Tidak ditemukan.</CommandEmpty>
          <CommandGroup heading="Halaman">
            <CommandItem>
              Dashboard
              <CommandShortcut>↵</CommandShortcut>
            </CommandItem>
            <CommandItem>Daftar Pegawai</CommandItem>
            <CommandItem>Pengaturan</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Aksi">
            <CommandItem>Tambah data baru</CommandItem>
            <CommandItem>Ekspor laporan</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

function InlineCommandDemo() {
  return (
    <div className="relative max-w-md">
      <Command
        variant="inline"
        className="rounded-lg border border-border-default bg-popover shadow-elevation-3"
      >
        <CommandInput
          wrapperClassName="border-b border-border-subtle"
          placeholder="Cari menu atau aksi..."
        />
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
  )
}

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

      <ShowcaseSection title="BadgeTooltip">
        <div className="flex flex-wrap gap-3 rounded-lg border bg-card p-8">
          <BadgeTooltip content="Menunggu verifikasi atasan">
            <Badge variant="secondary">Pending</Badge>
          </BadgeTooltip>
          <BadgeTooltip content="Sudah disetujui dan terkunci">
            <Badge>Disetujui</Badge>
          </BadgeTooltip>
        </div>
        <CodeBlock>{`<BadgeTooltip content="Menunggu verifikasi atasan">
  <Badge variant="secondary">Pending</Badge>
</BadgeTooltip>`}</CodeBlock>
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

      <ShowcaseSection title="Command Palette — varian Dialog">
        <div className="rounded-lg border bg-card p-8">
          <CommandPaletteDialogDemo />
        </div>
        <p className="text-sm text-muted-foreground">
          <code>{'<CommandDialog>'}</code> merender <code>{'<DialogHeader>'}</code> di dalam{' '}
          <code>{'<DialogContent>'}</code> agar Radix menautkan <code>aria-labelledby</code> ke{' '}
          <code>{'<DialogTitle>'}</code>. Prop <code>commandProps</code> diteruskan ke cmdk root,
          mis. untuk pencarian server-side (<code>shouldFilter={'{false}'}</code>).
        </p>
        <CodeBlock>{`<CommandDialog open={open} onOpenChange={setOpen}
  commandProps={{ shouldFilter: false }}
>
  <CommandInput placeholder="Cari NIP atau nama..." />
  <CommandList>
    <CommandEmpty>Tidak ada hasil.</CommandEmpty>
    <CommandGroup heading="Pegawai">
      <CommandItem>
        Budi Santoso
        <CommandShortcut><Kbd>↵</Kbd></CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Command Palette — varian Inline (anchored)">
        <div className="rounded-lg border bg-card p-8">
          <InlineCommandDemo />
        </div>
        <p className="text-sm text-muted-foreground">
          <code>{'<Command variant="inline">'}</code> melepas <code>h-full</code> dan{' '}
          <code>overflow-hidden</code> dari root, sehingga palette bisa dipasang inline di topbar
          dengan panel saran <code>absolute</code> di bawah input tanpa terpotong atau meregang
          setinggi induknya.
        </p>
        <CodeBlock>{`<Command variant="inline" className="rounded-lg border shadow-elevation-3">
  <CommandInput
    wrapperClassName="border-b-0"
    placeholder="Cari..."
  />
  <CommandList>
    <CommandEmpty>Tidak ada hasil.</CommandEmpty>
    <CommandGroup heading="Halaman">
      <CommandItem>Dashboard</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}</CodeBlock>
      </ShowcaseSection>

      <ShowcaseSection title="Kbd (badge tombol keyboard)">
        <div className="rounded-lg border bg-card p-8 flex flex-wrap items-center gap-3">
          <Kbd>⌘K</Kbd>
          <Kbd>⏎</Kbd>
          <Kbd>↑</Kbd>
          <Kbd>↓</Kbd>
          <Kbd>Esc</Kbd>
        </div>
        <CodeBlock>{`<Kbd>⌘K</Kbd>
<Kbd>⏎</Kbd>`}</CodeBlock>
      </ShowcaseSection>
    </div>
  )
}
