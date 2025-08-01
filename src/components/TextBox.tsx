import Image from 'next/image';

export interface TextBoxProps {
  heading: string;
  intro: string;
  bulletPoints: string[];
  subheading: string;
  subtext: string;
  imageSrc: string;
  imageAlt?: string;
  className?: string;
}

export default function TextBox({
  heading,
  intro,
  bulletPoints,
  subheading,
  subtext,
  imageSrc,
  imageAlt = 'Music lessons',
  className = '',
}: TextBoxProps) {
  return (
    <div
      className={`max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-center bg-grey p-7 rounded-lg border border-gray-200 gap-8 ${className}`}
    >
      {/* Text content */}
      <div className="flex-1 text-white text-left px-3 space-y-6">
        <h2 className="text-4xl font-bold mb-2 uppercase pb-4 tracking-tight text-white drop-shadow-sm font-[Montserrat]">
          {heading}
        </h2>
        <p className="text-lg leading-relaxed text-gray-100">{intro}</p>
        <ul className="list-disc list-outside pl-6 text-lg font-medium space-y-1">
          {bulletPoints.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
        <div>
          <h3 className="text-3xl uppercase font-bold mt-4 mb-2 text-white tracking-wide font-[Montserrat]">
            {subheading}
          </h3>
          <p className=" text-gray-200 text-lg leading-relaxed">{subtext}</p>
        </div>
      </div>
      {/* Image on the right */}
      <div className="flex-shrink-0 w-full md:w-80 align-middle self-center max-w-xs max-h-80 transition-transform duration-200 hover:scale-105 px-3">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={320}
          height={320}
          className="rounded-xl object-cover shadow-lg"
          priority={false}
        />
      </div>
    </div>
  );
}
