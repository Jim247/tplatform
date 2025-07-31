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
  image?: string;
  width?: number;
  height?: number;
}

const Steps = ({ title, items = [], image, width = 900, height = 400 }: Props) => {
  if (!items.length) return null;

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-16 items-center">
        {/* Left column: Steps */}
        <div className="relative flex flex-col gap-6 align-middle">
          {title && <h2 className="text-3xl text-white font-bold mb-4 uppercase">{title}</h2>}
          {items.map(({ title, description, icon: Icon }, index) => (
            <div key={index} className="flex flex-row items-center gap-6 relative z-10">
              <div className="flex-shrink-0 flex flex-col items-center pt-0 group cursor-pointer">
                <div
                  className="transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-1"
                  style={{
                    width: 62,
                    height: 62,
                    border: '2px solid var(--highlight)',
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--aw-color-primary)',
                    background: '#444444',
                  }}
                >
                  {Icon ? <Icon size={36} color="var(--highlight)" /> : index + 1}
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="space-y-1">
                  {title && <div className="text-white">{title}</div>}
                  {description && <div className="text-white">{description}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Right column: Image */}
        {image && (
          <div
            className="
              flex justify-center items-center
              w-full
              md:w-auto md:h-full
            "
            style={
              width && height
                ? { width: '100%', height: 'auto', minWidth: 0, minHeight: 0 }
                : undefined
            }
          >
            <Image
              src={image}
              alt={title || 'Step image'}
              width={width}
              height={height}
              className="rounded-lg object-contain lg:w-2/3 h-auto border-image"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Steps;
