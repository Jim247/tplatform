import React from 'react';
import Image from 'next/image';

// Define the Props interface
interface FeaturesProps {
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  tagline?: string | React.ReactNode;
  image?:
    | string
    | {
        src: string;
        alt?: string;
      };
  items?: Array<{
    title?: string;
    description?: string;
    icon?: React.ReactNode;
  }>;
  columns?: number;
  defaultIcon?: React.ReactNode;
  className?: string;
}

const Features: React.FC<FeaturesProps> = ({
  title,
  subtitle,
  tagline,
  image,
  items = [],
  defaultIcon,
  className = '',
}) => {
  return (
    <div className={`max-w-6xl mx-auto px-6 py-16 ${className}`}>
      {/* Headline Section */}
      <div className="text-center mb-12">
        {tagline && (
          <p className="text-sm font-semibold uppercase tracking-wide text-yellow-300 mb-3">
            {tagline}
          </p>
        )}
        {title && <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>}
        {subtitle && <p className="text-lg text-gray-300 max-w-2xl mx-auto">{subtitle}</p>}
      </div>

      {/* Image Section */}
      {image && (
        <div className="mb-12 w-full h-80 object-cover rounded-xl mx-auto bg-gray-500 shadow-lg">
          {typeof image === 'string' ? (
            <div dangerouslySetInnerHTML={{ __html: image }} />
          ) : (
            <Image
              className="w-full h-80 object-cover rounded-xl mx-auto bg-gray-500 shadow-lg"
              src={image.src}
              alt={image.alt || ''}
            />
          )}
        </div>
      )}

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 hover:border-yellow-300-70 hover:bg-gray-800/50 transition-all duration-300 group"
          >
            <div className="flex items-start gap-4">
              {/* Icon column */}
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-yellow-300/10 flex-shrink-0 group-hover:bg-yellow-300/20 transition-colors duration-300">
                {(item.icon || defaultIcon) && (
                  <span className="text-yellow-300 w-8 h-8 flex items-center justify-center">
                    {item.icon || defaultIcon}
                  </span>
                )}
              </div>
              {/* Content column */}
              <div className="flex-1">
                {item.title && (
                  <h3 className="font-semibold text-white text-lg leading-tight mb-2">
                    {item.title}
                  </h3>
                )}
                {item.description && (
                  <p className="text-gray-300 leading-relaxed">{item.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
