import Image from 'next/image';

// Just the logo without text 

export type LogoProps = {
  width: number;
  height: number;
  text: string;
};

export default function Logo({ width, height, text }: LogoProps) {
  return (<div className='items-center'>
    <Image
      src="/logo.svg"
      alt="MusoSpot Logo"
      width={width}
      height={height}
      priority
    />
      <div className='text-white text-center font-semibold text-2xl py-2'>{text}</div>
    </div>
  );
}