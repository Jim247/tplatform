'use client';
import Icon from '@mdi/react';
import React, { useState } from 'react';

export interface FAQItem {
  question: string;
  answer: string;
  icon?: React.ElementType;
}

export interface FAQsProps {
  title?: string;
  subtitle?: string;
  tagline?: string;
  items?: FAQItem[];
  columns?: number;
  icon?: string;
  id?: string;
  classes?: {
    container?: string;
    panel?: string;
    icon?: string;
  };
  bg?: React.ReactNode;
}

const FAQs: React.FC<FAQsProps> = ({
  title = '',
  subtitle = '',
  tagline = '',
  items = [],
  columns = 2,
  icon = '',
  id,
  classes = {},
  bg,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id={id}
      className={`w-full max-w-6xl mx-auto my-16 px-6 py-12 ${classes.container || ''}`}
      style={{ position: 'relative' }}
    >
      {bg && <div className="absolute inset-0 z-0">{bg}</div>}
      <div className="relative z-10">
        {/* Header Section */}
        {(title || subtitle || tagline) && (
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-yellow-300/10 p-4 rounded-xl">
                <Icon path={icon} size={3} className="text-yellow-300" />
              </div>
            </div>
            {tagline && (
              <p className="text-yellow-300 font-semibold tracking-wide uppercase mb-3">
                {tagline}
              </p>
            )}
            {title && <h2 className="font-bold text-white text-3xl md:text-4xl mb-4">{title}</h2>}
            {subtitle && <p className="text-gray-300 text-lg max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}

        {/* FAQ Items Grid */}
        <div className={`grid gap-6 ${columns === 1 ? 'max-w-4xl mx-auto' : 'md:grid-cols-2'}`}>
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 hover:border-yellow-300/50 transition-all duration-300 ${classes.panel || ''}`}
              >
                <button
                  className="flex items-center w-full text-left focus:outline-none group"
                  aria-expanded={isOpen}
                  aria-controls={`faq-content-${idx}`}
                  onClick={() => handleToggle(idx)}
                >
                  {item.icon && (
                    <span
                      className={`flex justify-center mr-3 flex-shrink-0 w-6 h-6 text-yellow-300 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${classes.icon || ''}`}
                    >
                      <item.icon size={24} />
                    </span>
                  )}
                  <span className="text-lg font-semibold text-white flex-1 group-hover:text-amber-100 transition-colors">
                    {item.question}
                  </span>
                  <span
                    className={`ml-3 transition-transform duration-200 text-yellow-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  id={`faq-content-${idx}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pt-4' : 'max-h-0 opacity-0 pt-0'}`}
                >
                  <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
