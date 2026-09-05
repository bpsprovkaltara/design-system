import * as React from 'react';
export interface SidebarAccountProps {
    name: string;
    roleLabel?: string;
    /** Inisial di `AvatarFallback` (default: huruf pertama `name`). */
    initials?: string;
    avatarSrc?: string | null;
    collapsed?: boolean;
    /** Slot di atas kartu akun (mis. role switcher). */
    leading?: React.ReactNode;
    /** Aksi di mode expanded (mis. tombol Keluar). */
    actions?: React.ReactNode;
    /** Aksi di mode collapsed (ikon saja). */
    collapsedActions?: React.ReactNode;
    className?: string;
}
/**
 * Chrome footer akun di sidebar gelap — presentational saja.
 * Auth, form logout, dan ganti peran tetap di aplikasi.
 */
export declare function SidebarAccount({ name, roleLabel, initials, avatarSrc, collapsed, leading, actions, collapsedActions, className, }: SidebarAccountProps): import("react/jsx-runtime").JSX.Element;
