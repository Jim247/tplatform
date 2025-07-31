import { IconBrandFacebook, IconBrandInstagram } from '@tabler/icons-react';

export default function SocialLinks({
  size = 50,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div className={`flex gap-10 ${className}`}>
      <a
        href="https://www.facebook.com/TempoMT/"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <IconBrandFacebook
          size={size}
          stroke={1}
          color="#ffffff"
          className="transition-transform duration-200 hover:scale-110 hover:text-highlight"
        />
      </a>
      <a
        href="https://www.instagram.com/tempomobiletuition"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <IconBrandInstagram
          size={size}
          stroke={1}
          color="#ffffff"
          className="transition-transform duration-200 hover:scale-110 hover:text-highlight"
        />
      </a>
    </div>
  );
}
