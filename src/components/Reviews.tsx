"use client"
import { useRef, useState, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";

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
  title = "Reviews",
  subtitle = "",
  reviews = [],
  id = "reviews",
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

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
    if (node) node.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (node) node.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-5" id={id}>
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
        style={{ scrollSnapType: "x mandatory" }}
      >
        {reviews.map((review, idx) => {
          const { title: reviewTitle, review: reviewText, reviewerName, icon, reviewLink } = review;
          const IconComponent = iconMap[icon as keyof typeof iconMap];
          return (
            <div
              key={idx}
              className={`
                flex-shrink-0 w-80
                sm:w-auto sm:flex-1
              `}
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="aspect-square flex flex-col p-6 rounded-xl review-cards text-black transition-transform duration-300 hover:scale-105 hover:shadow-lg w-full relative">
                {/* Review Title */}
                {reviewTitle && (
                  <h3 className="text-lg font-medium leading-6 pb-4">{reviewTitle}</h3>
                )}

                {/* Review Quote */}
                {reviewText && (
                  <blockquote className="flex-auto mb-4">
                    <p className="text italic">"{reviewText}"</p>
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
                ${activeIdx === idx ? "bg-yellow-300 scale-125" : "bg-gray-400 opacity-50"}
              `}
            />
          ))}
        </div>
      )}
    </div>
  );
}