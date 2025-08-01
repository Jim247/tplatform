'use client';
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
    <div className="max-w-6xl mx-auto" id={id}>
      {/* Header */}
      {title && (
        <div className="text-center mb-12 text-white uppercase">
          <h2 className="text-5xl font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-lg">{subtitle}</p>}
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
              <div className="flex flex-col p-6 rounded-xl review-cards text-black transition-transform duration-300 sm:hover:scale-105 hover:shadow-lg w-full min-h-[340px] sm:min-h-[340px] md:min-h-[340px] relative overflow-hidden mb-8 lg:aspect-square">
                {/* Review Title */}
                {reviewTitle && (
                  <h3 className="text-lg font-medium leading-6 pb-4">{reviewTitle}</h3>
                )}

                {/* 5-Star Rating */}
                <div className="flex mb-4" aria-label="5 star rating">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="#000"
                      className="w-5 h-5 mr-1"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                    </svg>
                  ))}
                </div>

                {/* Review Quote */}
                {reviewText && (
                  <blockquote className="flex-auto mb-4">
                    <p className="text italic">&quot;{displayText}&quot;</p>
                    {isLong && !isExpanded && (
                      <button
                        className="text-xs text-red-800 underline mt-2 focus:outline-none"
                        onClick={() => setExpandedIdx(idx)}
                      >
                        Read more
                      </button>
                    )}
                    {isExpanded && (
                      <button
                        className="text-xs text-yellow-700 underline mt-2 focus:outline-none"
                        onClick={() => setExpandedIdx(null)}
                      >
                        Show less
                      </button>
                    )}
                  </blockquote>
                )}

                {/* Name and Icon */}
                <div className="flex justify-between items-center">
                  <div>
                    {reviewerName && <p className="font-semibold">{reviewerName}</p>}
                    <span className="text-sm text-black">via Google My Business</span>
                  </div>
                  {IconComponent && reviewLink && (
                    <a
                      href={reviewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lg-absolute right-2 :bottom-3 "
                    >
                      <IconComponent size={28} />
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
        <div className="md:hidden flex justify-center mt-4 gap-2">
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
