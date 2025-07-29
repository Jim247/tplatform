import Image from 'next/image';

export default function MilesCloserCredit() {
  // Get the current year
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex items-center justify-center gap-3 text-sm text-white pb-10">
      <a
        href="https://www.miles-closer.co.uk"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center group"
        aria-label="Miles Closer Digital"
      >
        <Image
          src="/MC-pidgeon.svg"
          alt="Miles Closer Logo"
          className="w-12 h-12 mr-2"
          width="20"
          height="20"
        />
        <div className="flex flex-col">
          <span className="text-white">Built by</span>
          <span className="text-white underline group-hover:bg-lime-500 group-hover:text-black transition-colors duration-200">
            Miles Closer Digital
          </span>
          <span className="text-white opacity-70 mt-1">{currentYear}</span>
        </div>
      </a>
    </div>
  );
}
