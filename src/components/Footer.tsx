'use client';
import Logo from '@components/Logo';
import MilesCloserCredit from '@components/MilesCloserCredit';
import SocialLinks from '@components/SocialLinks';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-12 relative z-10 w-full">
      {/* Mobile: stacked, centered */}
      <div className="md:hidden max-w-7xl mx-auto px-3 md:px-6 py-6 flex flex-col items-center relative">
        <div className="pb-6">
          <SocialLinks size={50} />
        </div>
        <Link className="flex items-center mb-4" href="/">
          <Logo width={50} height={50} />
          <span className="pl-4 text-xl font-bold text-white">Tempo Tuition</span>
        </Link>
        {/* Absolutely centered nav */}
        <nav className="w-full relative h-12">
          <ul className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row gap-6 text-base font-medium justify-center">
            <li>
              <Link
                href="/terms"
                className="hover:text-link text-white px-4 py-3 flex items-center whitespace-nowrap"
              >
                TERMS
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* Desktop: logo left, terms centered */}
      <div
        className="hidden md:flex max-w-7xl mx-auto px-3 md:px-6 py-6 items-center relative"
        style={{ minHeight: '72px' }}
      >
        {/* Logo left */}
        <Link className="flex items-center align-middle" href="/">
          <Logo height={30} width={30} />
          <span className="pl-4 text-xl font-bold text-white uppercase">Tempo Tuition</span>
        </Link>
        {/* Navigation center - absolutely centered */}
        <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <ul className="flex flex-row gap-8 text-white font-medium">
            <li>
              <Link
                href="/terms"
                className="hover:text-link px-4 py-3 flex items-center whitespace-nowrap"
              >
                TERMS
              </Link>
            </li>
            {/* Add more links as needed */}
          </ul>
        </nav>
        {/* Social right */}
        <div className="ml-auto">
          <SocialLinks size={40} />
        </div>
      </div>
      <MilesCloserCredit />
    </footer>
  );
}
