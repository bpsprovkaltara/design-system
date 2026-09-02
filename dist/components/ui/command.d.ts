import { Command as CommandPrimitive } from 'cmdk';
import { Dialog } from './dialog';
import * as React from 'react';
type CommandProps = React.ComponentProps<typeof CommandPrimitive>;
/**
 * Root cmdk wrapper.
 *
 * `variant="dialog"` (default) mengisi penuh kontainer induk (`h-full
 * overflow-hidden`) — kompatibel mundur dengan pemakaian di dalam Dialog.
 *
 * `variant="inline"` melepas kedua kelas itu supaya root bisa dipakai untuk
 * palette inline/anchored (input di topbar + panel saran absolute) tanpa
 * meregang setinggi induk atau memotong panel yang overflow.
 */
declare function Command({ className, variant, ...props }: CommandProps & {
    variant?: 'dialog' | 'inline';
}): import("react/jsx-runtime").JSX.Element;
/**
 * Varian dialog dari Command Palette.
 *
 * Perbaikan a11y: `DialogHeader` (berisi `DialogTitle` + `DialogDescription`)
 * dirender DI DALAM `DialogContent` agar Radix menautkan `aria-labelledby`/
 * `aria-describedby` ke elemen `[role=dialog]`. Versi lama menaruhnya sebagai
 * sibling Content sehingga dialog tidak punya accessible name.
 *
 * `commandProps` diteruskan ke instance `<Command>` internal sehingga props
 * cmdk seperti `shouldFilter`, `filter`, `value`, `onValueChange`, `loop`, dan
 * `disablePointerSelection` bisa disetel — diperlukan untuk pencarian
 * asinkron/server-side.
 */
declare function CommandDialog({ title, description, children, className, commandProps, showCloseButton, ...props }: React.ComponentProps<typeof Dialog> & {
    title?: string;
    description?: string;
    className?: string;
    commandProps?: CommandProps;
    showCloseButton?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare function CommandInput({ className, wrapperClassName, ...props }: React.ComponentProps<typeof CommandPrimitive.Input> & {
    /**
     * Kelas untuk wrapper (pemegang border-b, padding, ikon Search, dan
     * indikator fokus). `className` tetap diterapkan ke `<input>` itu sendiri
     * agar kompatibel mundur.
     */
    wrapperClassName?: string;
}): import("react/jsx-runtime").JSX.Element;
declare function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>): import("react/jsx-runtime").JSX.Element;
declare function CommandEmpty({ ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>): import("react/jsx-runtime").JSX.Element;
declare function CommandGroup({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>): import("react/jsx-runtime").JSX.Element;
declare function CommandSeparator({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Separator>): import("react/jsx-runtime").JSX.Element;
declare function CommandItem({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>): import("react/jsx-runtime").JSX.Element;
declare function CommandShortcut({ className, ...props }: React.ComponentProps<'span'>): import("react/jsx-runtime").JSX.Element;
export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator, };
