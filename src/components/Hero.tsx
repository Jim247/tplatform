'use client';

import React from 'react';

interface HeroProps {
  image?: {
    src: string;
    alt?: string;
  };
  mobileImage?: {
    src: string;
    alt?: string;
  };
}

export default function Hero({ image, mobileImage }: HeroProps) {
  const handleClick = () => {
    alert('Book Now clicked!');
  };

  // Choose image based on screen size
  const getBackgroundImage = () => {
    const desktopImage = image?.src
      ? `url(${image.src})`
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    const mobileImageSrc = mobileImage?.src ? `url(${mobileImage.src})` : desktopImage;
    return { desktop: desktopImage, mobile: mobileImageSrc };
  };

  const backgroundImages = getBackgroundImage();

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-7xl p-8 flex items-center justify-center">
        {/* Desktop Hero */}
        <div
          className="relative w-full h-[800px] bg-center bg-no-repeat items-center justify-center hidden md:flex"
          style={{
            backgroundImage: backgroundImages.desktop,
            backgroundSize: 'contain',
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 z-10" />
          <div className="relative z-20 p-6 rounded-3xl text-white uppercase">
            <button
              onClick={handleClick}
              className="btn-primary bg-var--(background) hover:bg-yellow-500 text-black font-bold text-xl px-8 py-4 rounded-lg"
            >
              Book Now
            </button>
            <div className="w-full opacity-5"></div>
          </div>
        </div>

        {/* Mobile Hero */}
        <div
          className="relative w-full h-[600px] bg-center bg-no-repeat items-center justify-center flex md:hidden"
          style={{
            backgroundImage: backgroundImages.mobile,
            backgroundSize: 'contain',
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 z-10" />
          <div className="relative z-20 p-6 rounded-3xl text-white uppercase">
            <button
              onClick={handleClick}
              className="btn-primary bg-var--(background) hover:bg-yellow-500 text-black font-bold text-xl px-8 py-4 rounded-lg"
            >
              Book Now
            </button>
            <div className="w-full opacity-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
