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
              <div className="aspect-square flex flex-col p-6 rounded-xl bg-white text-gray-800 transition-transform duration-300 hover:scale-105 hover:shadow-lg w-full relative">
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
                    <span className="text-sm text-gray-500">via Google My Business</span>
                  </div>
                  {IconComponent && reviewLink && (
                    <a
                      href={reviewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-4 flex items-center justify-center"
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
    </div>
  );
}