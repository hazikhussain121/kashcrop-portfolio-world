import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigation } from 'react-router';
import { media } from '~/data/portfolio/catalog';
import { Icon } from './Icon';

const navigation = [['/projects', 'Work'], ['/services', 'Services'], ['/services#compare', 'Why KashCrop'], ['/about', 'About']] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sentinel = useRef<HTMLSpanElement>(null);
  const menu = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const navigationState = useNavigation();
  useEffect(() => {
    const target = sentinel.current;
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    observer.observe(target);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {setMenuOpen(false);}, [location.pathname]);
  useEffect(() => {
    const dialog = menu.current;
    if (!dialog) return;
    if (menuOpen) {dialog.showModal(); document.body.classList.add('has-overlay');}
    else if (dialog.open) {dialog.close(); if (!document.querySelector('dialog[open]')) document.body.classList.remove('has-overlay');}
    return () => {if (dialog.open) dialog.close(); if (!document.querySelector('dialog[open]')) document.body.classList.remove('has-overlay');};
  }, [menuOpen]);
  useEffect(() => {
    const query = matchMedia('(min-width:751px)');
    const change = () => {if (query.matches) setMenuOpen(false);};
    query.addEventListener('change', change);
    return () => query.removeEventListener('change', change);
  }, []);
  function close() {setMenuOpen(false); trigger.current?.focus();}
  return <>
    <span ref={sentinel} aria-hidden="true" style={{position: 'absolute', top: 0, left: 0, width: 1, height: 1, pointerEvents: 'none'}} />
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`} id="site-header">
      <Link className="brand" to="/" aria-label="KashCrop Innovations home"><img src={media('kashcrop-logo.png')} alt="" width="27" height="32" /><span>kashcrop</span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(([to, label]) => to.includes('#') ? <Link key={to} to={to} prefetch="intent">{label}</Link> : <NavLink key={to} to={to} prefetch="intent">{label}</NavLink>)}</nav>
      <div className="header-actions"><Link className="button header-contact" to="/contact" prefetch="intent">Start a project</Link><button ref={trigger} className="menu-trigger icon-button" type="button" aria-label="Open navigation" aria-controls="mobile-menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><Icon name="menu" /></button></div>
      <div className="navigation-progress" data-pending={navigationState.state !== 'idle'} aria-hidden="true" />
    </header>
    <dialog className="mobile-menu" id="mobile-menu" ref={menu} aria-labelledby="menu-title" onCancel={event => {event.preventDefault(); close();}} onClick={event => {if (event.target === event.currentTarget) {const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();}}}>
      <div className="menu-top"><p id="menu-title">KashCrop Innovations</p><button className="icon-button" onClick={close} aria-label="Close navigation"><Icon name="close" /></button></div>
      <nav aria-label="Mobile navigation">{[...navigation, ['/contact', 'Start a project']].map(([to, label]) => <Link key={to} to={to} onClick={() => setMenuOpen(false)}>{label}<Icon name="right" /></Link>)}</nav>
      <p className="menu-bottom">Product design. Engineering. Applied AI.<br />Built in Kashmir.</p>
    </dialog>
  </>;
}
