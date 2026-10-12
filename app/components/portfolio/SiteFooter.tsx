import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { company } from '~/data/portfolio/catalog';
import { normalizePathname } from '~/lib/portfolio/paths';
import { Icon } from './Icon';
import { useMotion } from './MotionProvider';

export function SiteFooter() {
  const { reduced, systemReduced, toggle } = useMotion();
  const isContact = normalizePathname(useLocation().pathname) === '/contact';
  const [copied, setCopied] = useState(false), [fallback, setFallback] = useState(false);
  const field = useRef<HTMLInputElement>(null);
  useEffect(() => { if (!copied) return; const timeout = setTimeout(() => setCopied(false), 2800); return () => clearTimeout(timeout); }, [copied]);
  useEffect(() => { if (fallback) { field.current?.focus(); field.current?.select(); } }, [fallback]);
  async function copy() { try { await navigator.clipboard.writeText(company.email); setCopied(true); } catch { setFallback(true); } }
  return <footer className={`od-footer ${isContact ? 'od-footer-compact' : ''}`} id="contact" aria-label="Contact KashCrop"><div className="od-wrap">
    {!isContact && <div className="od-footer-invitation"><h2>Your next big thing<br /><span>starts with a hello.</span></h2><Link to="/contact" className="od-contact-orb" aria-label="Start a project with KashCrop"><Icon /></Link></div>}
    <div className="od-footer-directory"><div><Link to="/" className="od-brand od-footer-brand">kashcrop.</Link><p>Independent thinking.<br />Made in Kashmir.</p></div>
      <nav aria-label="Explore the portfolio"><Link to="/projects">The work</Link><Link to="/services">What we do</Link><Link to="/about">The studio</Link><Link to="/contact">Get in touch</Link></nav>
      <div className="od-footer-contact"><div className="od-email-row"><a href={`mailto:${company.email}`}>{company.email}</a><button type="button" className="od-copy-email" onClick={copy} aria-label={copied ? 'Email address copied' : 'Copy email address'}><Icon name={copied ? 'check' : 'link'} /></button></div>{fallback && <input className="od-email-fallback" ref={field} readOnly value={company.email} aria-label="Email address to copy" />}<a href={`tel:${company.phoneLink}`}>{company.phone}</a><a href={company.linkedin} target="_blank" rel="noopener noreferrer">Find Hazik on LinkedIn <Icon /></a><span className="sr-only" role="status">{copied ? 'Email address copied.' : ''}</span></div>
    </div>
    <div className="od-footer-baseline"><p>© 2026 {company.legalName}.</p><nav aria-label="Privacy and display preferences"><Link to="/privacy">Privacy</Link><button aria-pressed={reduced} disabled={systemReduced} onClick={toggle} aria-label={systemReduced ? 'Reduced motion follows your system' : reduced ? 'Enable decorative motion' : 'Reduce decorative motion'}>{systemReduced ? 'Reduced motion' : reduced ? 'Motion off' : 'Motion on'}</button><a href="#top">Back to top <Icon name="up" /></a></nav></div>
  </div></footer>;
}
