"use client";
import { Geist, Geist_Mono, Montserrat } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isContactPage = pathname === '/contact';
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Tempo Tuition - Music Lessons in Bristol</title>
        <meta name="description" content="Professional music lessons in Bristol for guitar, piano, bass, and more. Expert teachers, flexible scheduling, and lessons for all ages and skill levels." />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
      >
        {isContactPage && isMobile ? (
          // Full-page layout for contact on mobile
          <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
            {children}
          </div>
        ) : (
          // Normal layout for other pages or contact on desktop
          <>
            <Header />
            <div className="p-2">
              <div className="w-full max-w-7xl border-1 border-white rounded-lg p-6 mx-auto">
                {children}
              </div>
            </div>
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}