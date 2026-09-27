import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigation } from 'react-router';
import { media } from '~/data/portfolio/catalog';
import { Icon } from './Icon';
const navigation=[['/projects','Selected work'],['/services','What we do'],['/about','The studio']] as const;
export function SiteHeader() {
 const [menuOpen,setMenuOpen]=useState(false),[scrolled,setScrolled]=useState(false);
 const menu=useRef<HTMLDialogElement>(null),trigger=useRef<HTMLButtonElement>(null);
 const location=useLocation(),navigationState=useNavigation();
 useEffect(()=>{let frame=0;const onScroll=()=>{if(frame)return;frame=requestAnimationFrame(()=>{setScrolled(window.scrollY>18);frame=0;});};onScroll();window.addEventListener('scroll',onScroll,{passive:true});return ()=>{window.removeEventListener('scroll',onScroll);cancelAnimationFrame(frame);};},[]);
 useEffect(()=>{setMenuOpen(false);},[location.pathname]);
 useEffect(()=>{
  const dialog=menu.current;if(!dialog)return;
  if(menuOpen){dialog.showModal();document.body.classList.add('has-overlay');}else if(dialog.open){dialog.close();if(!document.querySelector('dialog[open]'))document.body.classList.remove('has-overlay');}
  return ()=>{if(dialog.open)dialog.close();if(!document.querySelector('dialog[open]'))document.body.classList.remove('has-overlay');};
 },[menuOpen]);
 useEffect(()=>{const query=matchMedia('(min-width:751px)');const change=()=>{if(query.matches)setMenuOpen(false);};query.addEventListener('change',change);return ()=>query.removeEventListener('change',change);},[]);
 function close(){setMenuOpen(false);trigger.current?.focus();}
 return <>
 <header className={`site-header ${scrolled?'is-scrolled':''}`} id="site-header">
  <Link className="brand" to="/" aria-label="KashCrop Innovations home"><img src={media('kashcrop-logo.png')} alt="" width="40" height="40"/><span>kashcrop<small>Innovations</small></span></Link>
  <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(([to,label])=><NavLink key={to} to={to} prefetch="intent">{label}</NavLink>)}</nav>
  <div className="header-actions"><Link className="button button-outline header-contact" to="/contact" prefetch="intent">Let’s talk <Icon/></Link><button ref={trigger} className="menu-trigger icon-button" type="button" aria-label="Open navigation" aria-controls="mobile-menu" aria-expanded={menuOpen} onClick={()=>setMenuOpen(true)}><Icon name="menu"/></button></div>
  <div className="navigation-progress" data-pending={navigationState.state!=='idle'} aria-hidden="true"/>
 </header>
 <dialog className="mobile-menu" id="mobile-menu" ref={menu} aria-labelledby="menu-title" onCancel={e=>{e.preventDefault();close();}} onClick={e=>{if(e.target===e.currentTarget){const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}}}>
  <div className="menu-top"><p id="menu-title">KashCrop Innovations</p><button className="icon-button" onClick={close} aria-label="Close navigation"><Icon name="close"/></button></div>
  <nav aria-label="Mobile navigation">{[...navigation,['/contact','Let’s talk']].map(([to,label])=><Link key={to} to={to} onClick={()=>setMenuOpen(false)}>{label}<Icon/></Link>)}</nav>
  <p className="menu-bottom">Product design. Engineering. Applied AI.<br/>Built in Kashmir.</p>
 </dialog>
 </>;
}
