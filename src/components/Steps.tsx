import React from 'react';
import Image from 'next/image';

export interface Item {
  title?: string;
  description?: string;
  icon?: React.ElementType;
}

export interface Props {
  items?: Array<Item>;
  title?: string;
  image?: string; // Updated to accept a string for the image URL
}

const Steps = ({ title, items = [], image }: Props) => {
  if (!items.length) return null;

  return (
    <div className="steps-component container mx-auto px-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-16 items-start">
        {/* Left column: Steps */}
        <div className="relative flex flex-col gap-6 align-middle">
          {title && <h2 className="text-3xl text-white font-bold mb-4">{title}</h2>}
          {items.map(({ title, description, icon: Icon }, index) => (
            <div key={index} className="flex flex-row items-center gap-6 relative z-10">
              <div className="flex-shrink-0 flex flex-col items-center pt-0">
                <div
                  style={{
                    width: 62,
                    height: 62,
                    border: '2px solid var(--highlight)',
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--aw-color-primary)',
                    background: '#2c2c2c',
                  }}
                >
                  {Icon ? <Icon size={36} color="var(--highlight)" /> : index + 1}
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="space-y-1">
                  {title && (
                    <div className='text-white' style={{ fontWeight: 700, fontSize: 22, marginBottom: 6 }}>{title}</div>
                  )}
                  {description && (
                    <div className='text-white' style={{ fontSize: 17, lineHeight: 1.5 }}>
                      {description}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Right column: Image */}
        {image && (
          <div className="flex justify-center items-center">
            <Image
              src={image}
              alt={title || 'Step image'}
              width={900}
              height={400}
              className="rounded-lg w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Steps;
