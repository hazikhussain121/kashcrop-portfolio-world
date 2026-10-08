import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { isRouteErrorResponse, Link, Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation, useRouteError, useSearchParams, type LinksFunction, type MetaFunction } from 'react-router';
import { MotionProvider } from './components/portfolio/MotionProvider';
import { ScrollDirector } from './components/portfolio/signature/ScrollDirector';
import { SiteHeader } from './components/portfolio/SiteHeader';
import { SiteFooter } from './components/portfolio/SiteFooter';
import { getProject } from './data/portfolio/catalog';
import { organizationSchema, pageMeta } from './lib/portfolio/seo';
import './app.css';
const ScreenViewer=lazy(()=>import('./components/portfolio/ScreenViewer'));
export const links:LinksFunction=()=>[{rel:'icon',href:'/favicon.svg',type:'image/svg+xml'}];
export const meta:MetaFunction=()=>pageMeta('KashCrop Innovations','Product design, engineering and applied AI. Useful digital systems, designed and built in Kashmir.');
export function Layout({children}:{children:ReactNode}) {return <html lang="en" id="top" data-motion="off" suppressHydrationWarning><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"/><meta name="theme-color" content="#ffffff"/><Meta/><Links/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organizationSchema).replace(/</g,'\\u003c')}}/></head><body>{children}<ScrollRestoration/><Scripts/></body></html>;}
function RouteFeedback(){const location=useLocation(),previous=useRef(location.pathname);const [announcement,setAnnouncement]=useState('');useEffect(()=>{if(previous.current===location.pathname)return;previous.current=location.pathname;const frame=requestAnimationFrame(()=>{setAnnouncement(document.title);const heading=document.querySelector<HTMLElement>('main h1');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}});return ()=>cancelAnimationFrame(frame);},[location.pathname]);return <span className="sr-only" role="status" aria-live="polite">{announcement}</span>;}
function ViewerOutlet(){const [params]=useSearchParams();const project=getProject(params.get('project')??undefined);return project?.screens.length?<Suspense fallback={null}><ScreenViewer project={project}/></Suspense>:null;}
export default function App(){return <MotionProvider><ScrollDirector/><a className="skip-link" href="#main">Skip to the work</a><SiteHeader/><Outlet/><SiteFooter/><ViewerOutlet/><RouteFeedback/></MotionProvider>;}
export function ErrorBoundary(){const error=useRouteError();const missing=isRouteErrorResponse(error)&&error.status===404;return <MotionProvider><SiteHeader/><main className="error-page section-wrap" id="main"><p className="section-note">{missing?'404 / Page not found':'Something interrupted this page'}</p><h1>{missing?<>A little off<br/>the beaten path.</>:<>Let’s get you<br/>back to the work.</>}</h1><p>{missing?'The page may have moved. The work is still here.':'This page could not load correctly. Try again, or head back to the portfolio.'}</p><div className="inline-actions"><Link to="/projects" className="button button-dark">Explore the work ↗</Link><Link to="/" className="underlined">Back to home</Link></div></main><SiteFooter/></MotionProvider>;}
