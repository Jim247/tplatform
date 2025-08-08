import React from 'react';

interface WidgetWrapperProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * WidgetWrapper provides a consistent, attractive container for widgets like Hero, Steps, etc.
 */
const WidgetWrapper: React.FC<WidgetWrapperProps> = ({ children = '', style }) => {
  return (
    <section className={`w-full mx-auto px-3`} style={style}>
      {children}
    </section>
  );
};

export default WidgetWrapper;
