/* ============================================================
   @bpsprovkaltara/design-system/utils — Pure, server-safe utilities
   ------------------------------------------------------------
   Entri terpisah TANPA directive "use client". Hanya berisi fungsi
   manipulasi string/kelas murni (cn + varian cva) sehingga aman
   dipakai di React Server Component (Next.js App Router). Tidak boleh
   mengimpor kode komponen React.
   ============================================================ */
export { cn } from '@/lib/utils'
export { buttonVariants } from '@/components/ui/button-variants'
export { toggleVariants } from '@/components/ui/toggle-variants'
export { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu-variants'
