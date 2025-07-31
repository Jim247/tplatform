import React from "react";

interface VideoHeroProps {
  videoSrc: string;
  poster?: string;
  children?: React.ReactNode;
  className?: string;
}

const VideoHero: React.FC<VideoHeroProps> = ({
  videoSrc,
  poster,
  children,
  className = "",
}) => (
  <section className={`relative w-full h-[400px] md:h-[600px] border rounded-lg border-yellow-300 overflow-hidden ${className}`}>
    <video
      className="absolute inset-0 w-full h-full object-cover"
      src={videoSrc}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
    />
    <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
      {children}
    </div>
    {/* Optional: overlay for darkening video */}
    <div className="absolute inset-0 bg-black/30 pointer-events-none" />
  </section>
);

export default VideoHero;