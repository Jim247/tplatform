import React from 'react';

// Define the Props interface
interface FeaturesProps {
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  tagline?: string | React.ReactNode;
  image?: string | {
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
  columns,
  defaultIcon,
  className = '',
}) => {
  return (
    <div className={className}>
      {/* Headline Section */}
      <div className="text-center">
        {tagline && <p className="text-sm font-semibold uppercase tracking-wide text-primary">{tagline}</p>}
        {title && <h2 className="text-3xl text-yellow-200 font-bold tracking-tight sm:text-4xl">{title}</h2>}
        {subtitle && <p className="mt-4 text-lg text-white">{subtitle}</p>}
      </div>

      {/* Image Section */}
      {image && (
        <div className="mt-8 w-full h-80 object-cover rounded-xl mx-auto bg-gray-500 shadow-lg">
          {typeof image === 'string' ? (
            <div dangerouslySetInnerHTML={{ __html: image }} />
          ) : (
            <img
              className="w-full h-80 object-cover rounded-xl mx-auto bg-gray-500 shadow-lg"
              src={image.src}
              alt={image.alt || ''}
            />
          )}
        </div>
      )}

      {/* Items Grid */}
      <div
        className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="w-full flex flex-col justify-center rounded-2xl bg-grey border border-white shadow-lg p-6 min-h-[180px] transition-transform duration-200 hover:scale-105"
          >
            <div className="flex items-center gap-4">
              {/* Icon column */}
              <div className="flex items-center justify-center w-14 h-14 bg-grey rounded-xl shadow-sm">
                {(item.icon || defaultIcon) && (
                  <span className="text-yellow-300 w-12 h-12 flex items-center justify-center">
                    {item.icon || defaultIcon}
                  </span>
                )}
              </div>
              {/* Headings/description column */}
              <div className="flex-1">
                {item.title && (
                  <h3 className="font-semibold text-white text-base sm:text-lg leading-tight">{item.title}</h3>
                )}
                {item.description && (
                  <p className="mt-1 text-gray-200 text-sm sm:text-base">{item.description}</p>
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