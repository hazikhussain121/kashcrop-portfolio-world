export const securityHeaders: Readonly<Record<string,string>> = Object.freeze({
 'X-Content-Type-Options':'nosniff',
 'Referrer-Policy':'strict-origin-when-cross-origin',
 'X-Frame-Options':'DENY',
 'Permissions-Policy':'camera=(), microphone=(), geolocation=()',
 'Content-Security-Policy':"base-uri 'self'; object-src 'none'; frame-ancestors 'none'",
});
export function applySecurityHeaders(headers: Headers): void {for(const [key,value] of Object.entries(securityHeaders))headers.set(key,value);}
