'use client';

import { useState, useEffect, useRef } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { instrumentLinks } from '@/components/Nav';

export default function Header() {
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileInstrumentsOpen, setMobileInstrumentsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full px-4 py-4 text-white font-bold text-2xl font-[Montserrat] transition-colors duration-300
        ${scrolled ? 'bg-[#444444]/80 backdrop-blur' : 'bg-[#444444]'}
      `}
    >
      {/* Mobile header */}
      <div className="relative grid grid-cols-3 items-center lg:hidden w-full px-2">
        {/* Icon left */}
        <Link href='/'>
        <div className="flex justify-start">
          <Image src="/logo.svg" alt="Tempo Tuition Logo" width={30} height={30} />
        </div>
        </Link>
        {/* Text center */}
        <div className="flex flex-row justify-center items-center">
          <span className="text-center whitespace-nowrap uppercase">TEMPO TUITION</span>
        </div>
        {/* Hamburger right */}
        <div className="flex justify-end">
          <button
            ref={buttonRef}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="p-2 text-highlight"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFE600"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </svg>
            ) : (
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFE600"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
        {/* Mobile menu overlay */}
        {menuOpen && (
          <div
            ref={menuRef}
            className=" absolute left-0 right-0 top-full w-screenfull z-50 lg:hidden mt-3 animate-dropdown"
          >
            <nav className={`${scrolled ? 'bg-[#444444]/90 backdrop-blur' : 'bg-[#444444]'} text-white rounded-lg border border-gray-600 shadow-xl p-6 w-full`}>
              <ul className="flex flex-col gap-1">
                <li>
                  <Link
                    href="/"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 uppercase font-medium text-white hover:text-yellow-300 hover:bg-gray-700 rounded transition-all duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li className="flex flex-col">
                  <button
                    type="button"
                    className="flex items-center justify-between w-full px-4 py-2 uppercase font-medium text-white hover:text-yellow-300 hover:bg-gray-700 rounded transition-all duration-200 focus:outline-none text-left"
                    onClick={() => setMobileInstrumentsOpen((open) => !open)}
                    aria-expanded={mobileInstrumentsOpen}
                    aria-controls="mobile-instruments-submenu"
                  >
                    <div className="flex flex-row items-center gap-2 w-full justify-start">
                      <span>Instruments</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transition-transform ${mobileInstrumentsOpen ? 'rotate-90' : ''}`}
                      >
                        <polyline points="9 6 15 12 9 18"></polyline>
                      </svg>
                    </div>
                  </button>
                  {/* Mobile instruments dropdown opens inline within the menu */}
                  {mobileInstrumentsOpen && (
                    <div className="ml-4 mt-2 flex flex-col gap-1">
                      {instrumentLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => {
                            setMenuOpen(false);
                            setMobileInstrumentsOpen(false);
                          }}
                          className="block px-4 py-2 uppercase font-medium text-white hover:text-yellow-300 hover:bg-gray-700 rounded transition-all duration-200"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
                <li>
                  <Link
                    href="/about"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 uppercase font-medium text-white hover:text-yellow-300 hover:bg-gray-700 rounded transition-all duration-200"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 uppercase font-medium text-white hover:text-yellow-300 hover:bg-gray-700 rounded transition-all duration-200"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>

      {/* Desktop header with logo absolutely centered */}
      <div className="hidden lg:grid grid-cols-3 items-center w-full max-w-6xl py-4 mx-auto px-4">
        {/* Left navigation */}
        <nav className="flex justify-evenly">
          <ul className="flex items-center gap-12">
            <li>
              <Link href="/" className="uppercase font-medium nav-link">
                Home
              </Link>
            </li>
            <li
              className="relative"
              onMouseEnter={() => setDesktopDropdownOpen(true)}
              onMouseLeave={() => setDesktopDropdownOpen(false)}
            >
              <span className="uppercase font-medium nav-link focus:text-yellow-300 cursor-pointer">
                Instruments
              </span>
              {/* Invisible bridge to maintain hover state */}
              {desktopDropdownOpen && (
                <div className="absolute left-0 top-full w-full h-4 bg-transparent pointer-events-auto z-40" />
              )}
              {/* Dropdown appears as header expansion */}
              <div
                className={`absolute left-1/2 transform -translate-x-1/2 top-full mt-4 transition-opacity z-50
${desktopDropdownOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
              >
                <div className={`${scrolled ? 'bg-[#444444]/90 backdrop-blur' : 'bg-[#444444]'} rounded-lg border border-gray-600 shadow-xl py-3 px-6 min-w-[200px]`}>
                  <ul className="flex flex-col gap-1">
                    {instrumentLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="block px-4 py-2 uppercase font-medium text-white hover:text-yellow-300 hover:bg-gray-700 rounded transition-all duration-200"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </nav>

        {/* Center logo - absolutely centered with text */}
        <div className="flex justify-center items-center gap-x-2 select-none">
          <span className="uppercase font-bold tracking-wide text-lg md:text-xl">TEMPO</span>
          <Image src="/logo.svg" alt="Tempo Tuition Logo" width={48} height={48} />
          <span className="uppercase font-bold tracking-wide text-lg md:text-xl">TUITION</span>
        </div>

        {/* Right navigation */}
        <nav className="flex justify-evenly">
          <ul className="flex items-center gap-12">
            <li>
              <Link href="/jobs" className="uppercase font-medium nav-link">
                Jobs
              </Link>
            </li>
            <li>
              <Link href="/contact" className="uppercase font-medium nav-link">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
