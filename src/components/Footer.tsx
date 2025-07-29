'use client';
import Logo from '@components/Logo';
import MilesCloserCredit from '@components/MilesCloserCredit';
import SocialLinks from '@components/SocialLinks';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-12 relative z-10 w-full">
      {/* Mobile: stacked, centered */}
      <div className="md:hidden max-w-7xl mx-auto px-3 md:px-6 py-6 flex flex-col items-center">
        <div className="pb-6">
          <SocialLinks size={50} />
        </div>
        <Link className="flex items-center mb-4" href="/">
          <Logo />
          <span className="pl-4 text-xl font-bold text-white">Tempo Tuition</span>
        </Link>
        <nav>
          <ul className="flex flex-row gap-6 text-base font-medium justify-center">
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
      <div className="hidden md:flex max-w-7xl mx-auto px-3 md:px-6 py-6 items-center justify-between">
        {/* Logo left */}
        <Link className="flex items-center align-middle" href="/">
          <Logo />
          <span className="pl-4 text-xl font-bold text-white uppercase">Tempo Tuition</span>
        </Link>
        {/* Navigation center */}
        <nav>
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
        <div>
          <SocialLinks size={40} />
        </div>
      </div>
      <MilesCloserCredit />
    </footer>
  );
}
