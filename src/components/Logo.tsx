import Image from 'next/image';

// Just the logo without text

export type LogoProps = {
  width: number;
  height: number;
};

export default function Logo({ width, height }: LogoProps) {
  return <Image src="/logo.svg" alt="MusoSpot Logo" width={width} height={height} priority />;
}
