import type { SVGProps } from 'react';
const paths = {
 arrow:'M5 19 19 5M5 5h14v14', right:'M4 12h16m-6-6 6 6-6 6', left:'M20 12H4m6-6-6 6 6 6',
 close:'m6 6 12 12M6 18 18 6', menu:'M4 8h16M4 16h16', search:'M16 16l5 5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
 expand:'M4 9V4h5m6 0h5v5m0 6v5h-5M9 20H4v-5',
 layers:'m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5',
 check:'m5 12 4 4L19 6', link:'m9 15 6-6m-8 8-1 1a4.25 4.25 0 0 1-6-6l4-4a4.25 4.25 0 0 1 6 0m2 8a4.25 4.25 0 0 0 6 0l4-4a4.25 4.25 0 0 0-6-6l-1 1',
 down:'M12 4v16m-6-6 6 6 6-6', mail:'M3 5h18v14H3V5Zm0 1 9 7 9-7',
 phone:'M8 3H6a3 3 0 0 0-3 3c0 8 7 15 15 15a3 3 0 0 0 3-3v-2l-5-2-2 2-6-6 2-2-2-5Z',
} as const;
export type IconName = keyof typeof paths | 'mobile' | 'desktop';
export function Icon({name='arrow',className='',...props}: SVGProps<SVGSVGElement>&{name?:IconName}) {
 return <svg className={`icon ${className}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
 {name==='mobile'?<><rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M10 18.5h4"/></>:name==='desktop'?<><rect x="2.5" y="3.5" width="19" height="13" rx="2"/><path d="M8 21h8m-4-4.5V21"/></>:<path d={paths[name]}/>}
 </svg>;
}
