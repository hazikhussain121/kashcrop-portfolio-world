import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { company, media } from '~/data/portfolio/catalog';
import { normalizePathname } from '~/lib/portfolio/paths';
import { Icon } from './Icon';
import { useMotion } from './MotionProvider';

export function SiteFooter() {
  const {reduced, systemReduced, toggle} = useMotion();
  const location = useLocation();
  const isContact = normalizePathname(location.pathname) === '/contact';
  const [copied, setCopied] = useState(false), [fallback, setFallback] = useState(false);
  const field = useRef<HTMLInputElement>(null);
  useEffect(() => {if (!copied) return; const timeout = setTimeout(() => setCopied(false), 2800); return () => clearTimeout(timeout);}, [copied]);
  useEffect(() => {if (fallback) {field.current?.focus(); field.current?.select();}}, [fallback]);
  async function copy() {try {await navigator.clipboard.writeText(company.email); setCopied(true);} catch {setFallback(true);}}
  return <footer className={`apple-footer ${isContact ? 'apple-footer-compact' : ''}`} id="contact" aria-label="KashCrop contact and navigation"><div className="apple-footer-inner">
    {!isContact && <div className="apple-footer-invitation"><h2>What shall we build next?</h2><p>Bring the idea. We’ll help you make it work.</p><Link to="/contact" className="button button-dark">Start a project <Icon name="right" /></Link></div>}
    <div className="apple-footer-directory"><div><Link className="apple-footer-brand" to="/" aria-label="KashCrop Innovations home"><img src={media('kashcrop-logo.png')} alt="" width="32" height="38" /><span>kashcrop</span></Link><p>Thoughtful digital products.<br />Designed and built in Kashmir.</p></div>
      <nav aria-label="Explore the portfolio"><Link to="/projects">Work</Link><Link to="/services">Services</Link><Link to="/about">About KashCrop</Link><Link to="/contact">Start a project</Link></nav>
      <div className="apple-footer-contact"><div className="email-row"><a href={`mailto:${company.email}`}>{company.email}</a><button type="button" className="copy-email" onClick={copy} aria-label={copied ? 'Email address copied' : 'Copy email address'}><Icon name={copied ? 'check' : 'link'} /></button></div>{fallback && <input className="email-copy-fallback" ref={field} readOnly value={company.email} aria-label="Email address to copy" />}<a href={`tel:${company.phoneLink}`}>{company.phone}</a><p>Kashmir, India<br />Incubated at SKIIE, SKUAST-Kashmir</p><span className="sr-only" role="status">{copied ? 'Email address copied.' : ''}</span></div>
    </div>
    <div className="apple-footer-baseline"><p>© 2026 {company.legalName}. All rights reserved.</p><nav aria-label="Social, privacy and display preferences"><a href={company.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a><Link to="/privacy">Privacy</Link><button className="motion-toggle" aria-pressed={reduced} disabled={systemReduced} onClick={toggle} aria-label={systemReduced ? 'Reduced motion follows your system' : reduced ? 'Enable decorative motion' : 'Reduce decorative motion'}><span className="motion-dot" aria-hidden="true" /><span>{systemReduced ? 'Reduced motion' : reduced ? 'Motion off' : 'Motion on'}</span></button><a href="#top">Back to top</a></nav></div>
  </div></footer>;
}
