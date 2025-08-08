'use client';
import EnquiryForm from '@/components/EnquiryForm';
import { useEffect, useState } from 'react';

export default function Book() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on mount
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    // Full-screen experience on mobile
    return (
      <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <EnquiryForm />
      </div>
    );
  }

  // Normal layout experience on desktop
  return <EnquiryForm />;
}
