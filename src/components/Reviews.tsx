'use client';
import { mdiStar } from '@mdi/js';
import Icon from '@mdi/react';
import { useRef, useState, useEffect } from 'react';
import { FaGoogle } from 'react-icons/fa';

export interface ReviewProps {
  title?: string;
  review: string;
  reviewerName: string;
  image?: string;
  googleUrl?: string;
  icon: string;
  reviewLink?: string;
}

const iconMap = {
  google: FaGoogle,
} as const;

interface Props {
  title?: string;
  subtitle?: string;
  reviews: ReviewProps[];
  id?: string;
}

export default function Reviews({
  title = 'Reviews',
  subtitle = '',
  reviews = [],
  id = 'reviews',
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  // const CHAR_LIMIT = 180; // Removed duplicate declaration

  // Update activeIdx on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const children = Array.from(scrollRef.current.children) as HTMLElement[];
      const scrollLeft = scrollRef.current.scrollLeft;
      let closestIdx = 0;
      let minDiff = Infinity;
      children.forEach((child, idx) => {
        const diff = Math.abs(child.offsetLeft - scrollLeft);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });
      setActiveIdx(closestIdx);
    };
    const node = scrollRef.current;
    if (node) node.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (node) node.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const CHAR_LIMIT = 130;

  return (
    <div className="max-w-6xl mx-auto pb-10" id={id}>
      {/* Header */}
      {title && (
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-300">{subtitle}</p>}
        </div>
      )}

      {/* Reviews Grid */}
      <div
        ref={scrollRef}
        className="
          flex gap-6 overflow-x-auto pb-4 hide-scrollbar
          sm:grid sm:grid-cols-2 sm:overflow-x-visible sm:pb-0
          lg:grid-cols-4
        "
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {reviews.map((review, idx) => {
          const { title: reviewTitle, review: reviewText, reviewerName, icon, reviewLink } = review;
          const IconComponent = iconMap[icon as keyof typeof iconMap];
          const isExpanded = expandedIdx === idx;
          const isLong = reviewText.length > CHAR_LIMIT;
          const displayText =
            isExpanded || !isLong ? reviewText : reviewText.slice(0, CHAR_LIMIT) + '...';
          return (
            <div
              key={idx}
              className={`
                flex-shrink-0 w-full sm:w-auto sm:flex-1
              `}
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="flex flex-col p-6 rounded-xl bg-white border border-gray-200 hover:border-yellow-300 transition-all duration-300 hover:shadow-xl w-full min-h-[320px] relative overflow-hidden group">
                {/* Review Title */}
                {reviewTitle && (
                  <h3 className="text-lg font-semibold text-gray-900 leading-6 pb-4">
                    {reviewTitle}
                  </h3>
                )}

                {/* 5-Star Rating */}
                <div
                  className="flex mb-4 transition-transform duration-200"
                  aria-label="5 star rating"
                >
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      style={{
                        filter: 'drop-shadow(0 0.5px 1px rgba(0,0,0,0.12))',
                        display: 'inline-block',
                      }}
                    >
                      <Icon path={mdiStar} size={'30px'} color="#FFD700" />
                    </span>
                  ))}
                </div>

                {/* Review Quote */}
                {reviewText && (
                  <blockquote className="flex-auto mb-4">
                    <p className="text-gray-700 italic leading-relaxed">
                      &quot;{displayText}&quot;
                    </p>
                    {isLong && !isExpanded && (
                      <button
                        className="text-sm text-yellow-600 hover:text-amber-700 underline mt-2 focus:outline-none transition-colors"
                        onClick={() => setExpandedIdx(idx)}
                      >
                        Read more
                      </button>
                    )}
                    {isExpanded && (
                      <button
                        className="text-sm text-yellow-600 hover:text-amber-700 underline mt-2 focus:outline-none transition-colors"
                        onClick={() => setExpandedIdx(null)}
                      >
                        Show less
                      </button>
                    )}
                  </blockquote>
                )}

                {/* Name and Icon */}
                <div className="flex justify-between items-center mt-auto">
                  <div>
                    {reviewerName && <p className="font-semibold text-gray-900">{reviewerName}</p>}
                    <span className="text-sm text-gray-600">via Google My Business</span>
                  </div>
                  {IconComponent && reviewLink && (
                    <a
                      href={reviewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-amber-600 transition-colors"
                    >
                      <IconComponent size={24} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Dots below reviews (show only if more than 1 review) */}
      {reviews.length > 1 && (
        <div className="md:hidden flex justify-center mt-6 gap-2">
          {reviews.map((_, idx) => (
            <span
              key={idx}
              className={`inline-block w-3 h-3 rounded-full transition-all duration-200
                ${activeIdx === idx ? 'bg-yellow-300 scale-125' : 'bg-gray-400 opacity-50'}
              `}
            />
          ))}
        </div>
      )}
    </div>
  );
}
