import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { normalizePathname } from '~/lib/portfolio/paths';
import { company } from '~/data/portfolio/catalog';
import { Icon } from './Icon';
import { useMotion } from './MotionProvider';
export function SiteFooter() {
 const {reduced,systemReduced,toggle}=useMotion();const location=useLocation();const isContact=normalizePathname(location.pathname)==='/contact';
 const [copied,setCopied]=useState(false),[fallback,setFallback]=useState(false);const field=useRef<HTMLInputElement>(null);
 useEffect(()=>{if(!copied)return;const t=setTimeout(()=>setCopied(false),2800);return ()=>clearTimeout(t);},[copied]);
 useEffect(()=>{if(fallback){field.current?.focus();field.current?.select();}},[fallback]);
 async function copy(){try{await navigator.clipboard.writeText(company.email);setCopied(true);}catch{setFallback(true);}}
 return <footer className={`contact-section ${isContact?'footer-compact':''}`} id="contact" aria-label="KashCrop contact and navigation">
 <div className="contact-light" aria-hidden="true"/>
 {!isContact&&<div className="contact-top"><div><p className="contact-intro">Something in mind?</p><h2 id="contact-title">Let’s make<br/>something <em>useful.</em></h2></div><div className="contact-actions"><p>A first idea. A real problem.<br/>A product ready for its next chapter.</p><Link className="button button-white contact-primary" to="/contact">Tell us what you’re building <Icon/></Link><div className="email-row"><a href={`mailto:${company.email}`}>{company.email}</a><button className="copy-email" onClick={copy} aria-label={copied?'Email address copied':'Copy email address'}><Icon name={copied?'check':'link'}/></button></div>{fallback&&<input className="email-copy-fallback" ref={field} readOnly value={company.email} aria-label="Email address to copy"/>}<p className="sr-only" role="status">{copied?'Email address copied.':''}</p></div></div>}
 <div className="footer-wordmark" aria-hidden="true">kashcrop</div>
 <div className="footer-directory"><nav aria-label="Explore the portfolio"><Link to="/projects">Selected work</Link><Link to="/services">What we do</Link><Link to="/about">The studio</Link><Link to="/contact">Start a project</Link></nav><p>Design, engineering and applied AI.<br/>One considered experience.</p></div>
 <div className="footer-baseline"><span>© 2026 {company.legalName}<br/>Built in Kashmir.</span><nav aria-label="Social and privacy"><a href={company.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><Link to="/privacy">Privacy</Link><a href={`tel:${company.phoneLink}`}>{company.phone}</a></nav><button className="motion-toggle" aria-pressed={reduced} disabled={systemReduced} onClick={toggle} aria-label={systemReduced?'Reduced motion follows your system':reduced?'Enable decorative motion':'Reduce decorative motion'}><span className="motion-dot" aria-hidden="true"/><span>{systemReduced?'System: reduced motion':reduced?'Motion off':'Motion on'}</span></button><a href="#top" className="back-to-top">Back to top ↑</a></div>
 </footer>;
}
