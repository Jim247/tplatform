"use client"

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);
  return (
    <header className="w-full px-4 py-4 bg-highlight text-white font-bold text-2xl font-[Montserrat]">
      {/* Mobile header */}
      <div className="relative grid grid-cols-3 items-center lg:hidden w-full px-2">
        {/* Icon left */}
        <div className="flex justify-start">
          <Image
            src="/logo.svg"
            alt="Tempo Tuition Logo"
            width={30}
            height={30}
          />
        </div>
        {/* Text center */}
        <div className="flex flex-row justify-center items-center">
          <span className="text-center whitespace-nowrap uppercase">TEMPO TUITION</span>
        </div>
        {/* Hamburger right */}
        <div className="flex justify-end">
          <button
            ref={buttonRef}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="p-2 text-highlight"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFE600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" /></svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFE600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            )}
          </button>
        </div>
        {/* Mobile menu overlay */}
        {menuOpen && (
          <div
            ref={menuRef}
            className="mobile-header absolute left-0 right-0 top-full z-50 lg:hidden mt-3 animate-dropdown"
          >
            <nav className="bg-highlight text-[#2c2c2c] rounded-b-lg shadow-lg p-6 w-full">
              <ul className="flex flex-col gap-4 text-lg">
                <li><Link href="/" onClick={() => setMenuOpen(false)} className="uppercase mobile-nav-link">Home</Link></li>
                <li><Link href="/about" onClick={() => setMenuOpen(false)} className="uppercase mobile-nav-link">Instruments</Link></li>
                <li><Link href="/about" onClick={() => setMenuOpen(false)} className="uppercase mobile-nav-link">Jobs</Link></li>
                <li><Link href="/contact" onClick={() => setMenuOpen(false)} className="uppercase mobile-nav-link">Contact</Link></li>
              </ul>
            </nav>
          </div>
        )}
      </div>
      {/* Desktop header: 2 links left, logo/text center, 2 links right */}
      <div className="hidden lg:flex flex-row items-center justify-between w-full max-w-7xl mx-auto px-8 flex-nowrap min-w-0">
        {/* Left links */}
        <nav className="min-w-0 flex-shrink">
          <ul className="flex flex-row gap-20 whitespace-nowrap">
            <li><Link href="/" className="uppercase font-light nav-link">Home</Link></li>
            <li><Link href="/about" className="uppercase font-light nav-link">Instruments</Link></li>
          </ul>
        </nav>
        
        {/* Logo and text center */}
        <div className="flex flex-row items-center gap-2 flex-shrink-0">
          <span className="uppercase">TEMPO</span>
          <Image
            src="/logo.svg"
            alt="Tempo Tuition Logo"
            width={48}
            height={48}
          />
          <span className="uppercase">TUITION</span>
        </div>
        
        {/* Right links */}
        <nav className="min-w-0 flex-shrink">
          <ul className="flex flex-row gap-20 whitespace-nowrap">
            <li><Link href="/about" className="uppercase font-light nav-link">Jobs</Link></li>
            <li><Link href="/contact" className="uppercase font-light nav-link">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
