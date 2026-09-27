import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
const MotionContext = createContext({reduced:true,systemReduced:false,toggle:()=>{}});
export function MotionProvider({children}:{children:ReactNode}) {
 const [manual,setManual]=useState(false),[system,setSystem]=useState(true);
 useEffect(()=>{
  const query=window.matchMedia('(prefers-reduced-motion: reduce)');
  try {setManual(localStorage.getItem('kc-theatre-motion')==='off');} catch {}
  const update=()=>setSystem(query.matches);update();query.addEventListener('change',update);
  return ()=>query.removeEventListener('change',update);
 },[]);
 const reduced=system||manual;
 useEffect(()=>{document.documentElement.dataset.motion=reduced?'off':'on';},[reduced]);
 const toggle=()=>{if(system)return;setManual(value=>{try{localStorage.setItem('kc-theatre-motion',value?'on':'off');}catch{}return !value;});};
 return <MotionContext.Provider value={{reduced,systemReduced:system,toggle}}>{children}</MotionContext.Provider>;
}
export const useMotion=()=>useContext(MotionContext);
