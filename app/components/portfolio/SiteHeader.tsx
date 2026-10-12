import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigation } from 'react-router';
import { Icon } from './Icon';

const navigation = [['/projects', 'Work'], ['/services', 'What we do'], ['/about', 'The studio']] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menu = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const navigationState = useNavigation();
  useEffect(() => { setMenuOpen(false); }, [location.pathname, location.search]);
  useEffect(() => {
    const dialog = menu.current;
    if (!dialog) return;
    if (menuOpen && !dialog.open) { dialog.showModal(); document.body.classList.add('has-overlay'); }
    if (!menuOpen && dialog.open) dialog.close();
    if (!menuOpen && !document.querySelector('dialog[open]')) document.body.classList.remove('has-overlay');
    return () => { if (dialog.open) dialog.close(); if (!document.querySelector('dialog[open]')) document.body.classList.remove('has-overlay'); };
  }, [menuOpen]);
  useEffect(() => {
    const query = matchMedia('(min-width: 801px)');
    const change = () => { if (query.matches) setMenuOpen(false); };
    query.addEventListener('change', change);
    return () => query.removeEventListener('change', change);
  }, []);
  function close() { setMenuOpen(false); trigger.current?.focus(); }
  return <>
    <header className="site-header od-header" id="site-header">
      <Link className="brand od-brand" to="/" aria-label="KashCrop Innovations home"><span>kashcrop<span className="od-brand-stop">.</span></span></Link>
      <nav className="od-desktop-nav" aria-label="Main navigation">{navigation.map(([to, label]) => <NavLink key={to} to={to} prefetch="intent">{label}</NavLink>)}</nav>
      <div className="od-header-actions"><Link className="od-button od-button-yellow od-header-contact" to="/contact" prefetch="intent">Let’s talk <Icon /></Link><button ref={trigger} className="od-menu-trigger" type="button" aria-label="Open navigation" aria-controls="mobile-menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><Icon name="menu" /></button></div>
      <div className="navigation-progress" data-pending={navigationState.state !== 'idle'} aria-hidden="true" />
    </header>
    <dialog className="od-mobile-menu" id="mobile-menu" ref={menu} aria-labelledby="menu-title" onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close(); } }}>
      <div className="od-menu-top"><p id="menu-title">kashcrop.</p><button className="od-round-button" onClick={close} aria-label="Close navigation"><Icon name="close" /></button></div>
      <nav aria-label="Mobile navigation">{[...navigation, ['/contact', 'Let’s talk']].map(([to, label]) => <Link key={to} to={to} onClick={() => setMenuOpen(false)}>{label}<Icon /></Link>)}</nav>
      <p className="od-menu-foot">Product design. Engineering. Applied AI.<br />Made in Kashmir.</p>
    </dialog>
  </>;
}
