"use client"

import { useState } from 'react';
import Image from 'next/image';
import Nav from './Nav';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];
  return (
    <header className="w-full px-4 py-4 bg-highlight text-white font-bold text-2xl font-[Montserrat]">
      {/* Mobile header */}
      <div className="relative grid grid-cols-3 items-center sm:hidden w-full px-2">
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
          <span className="text-center whitespace-nowrap">TEMPO TUITION</span>
        </div>
        {/* Hamburger right */}
        <div className="flex justify-end">
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="p-2 text-highlight"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" /></svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            )}
          </button>
        </div>
        {/* Mobile menu overlay */}
        {menuOpen && (
          <div className="mobile-header absolute left-0 right-0 top-full z-50 sm:hidden">
            <nav className="bg-highlight text-highlight rounded-b-lg shadow-lg p-6 w-full">
              <ul className="flex flex-col gap-4 text-lg">
                {navLinks.map(link => (
                  <li key={link.href}>
                    <a href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
      {/* Desktop header */}
      <div className="hidden sm:flex flex-row items-center justify-center gap-4">
        <span>TEMPO</span>
        <Image
          src="/logo.svg"
          alt="Tempo Tuition Logo"
          width={48}
          height={48}
        />
        <span>TUITION</span>
        <Nav />
      </div>
    </header>
  );
}
