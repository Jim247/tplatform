"use client"

import React from 'react';

interface HeroProps {
  image?: {
    src: string;
    alt?: string;
  };
  title?: string;
}

export default function Hero({ image, title }: HeroProps) {
  const handleClick = () => {
    alert('Book Now clicked!');
  };

return (
  <div 
    className="relative w-full h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
    style={{
      backgroundImage: image?.src ? `url(${image.src})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}
  >
    {/* Overlay */}
    <div className="absolute inset-0 bg-gray-900 opacity-20  z-10" />
    <div className="relative z-20 text-center bg-grey p-6 rounded-3xl text-white uppercase">
      {title && (
        <h1 className="text-6xl font-bold mb-8">
          {title}
        </h1>
      )}
      <button
        onClick={handleClick}
        className="btn-primary bg-var--(background) hover:bg-yellow-500 text-black font-bold text-xl px-8 py-4 rounded-lg"
      >
        Book Now
      </button>
      <div className="w-full opacity-5"></div>
    </div>
  </div>
);
}
