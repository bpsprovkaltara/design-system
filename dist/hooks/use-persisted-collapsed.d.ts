/**
 * State collapse sidebar yang disimpan di `localStorage`.
 * Render pertama selalu `defaultCollapsed` (hindari mismatch SSR); nilai
 * tersimpan dihidupkan setelah mount.
 */
export declare function usePersistedCollapsed(storageKey: string, defaultCollapsed?: boolean): readonly [boolean, (next: boolean) => void];
