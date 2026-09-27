/** Static hosts may add a trailing slash for prerendered directory indexes. */
export function normalizePathname(pathname: string): string {
 return pathname.replace(/\/+$/, '') || '/';
}
