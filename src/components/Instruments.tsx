import Icon from "@mdi/react";
import { 
  mdiGuitarAcoustic, 
  mdiGuitarElectric, 
  mdiMusicClefBass,
  mdiMicrophoneVariant, 
  mdiPiano,
  mdiDotsHorizontalCircleOutline
} from "@mdi/js";

export default function Instruments({ className = "" }: { className?: string }) {
  const iconSize = 4

  return (
    <div className={`container max-w-7xl bg-grey p-5 rounded-lg border border-gray-200 pt-4 ${className}`}>
      <h1 className='text-center text-5xl font-bold pt-8 pb-5 text-white font-[Montserrat] uppercase'>We Teach</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 max-w-xs mx-auto sm:max-w-none uppercase font-[Montserrat]">
        <div className="flex flex-col items-center group cursor-pointer p-2">
          <Icon 
            path={mdiGuitarAcoustic} 
            size={iconSize} 
            color="#fde047"
            className="transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-1"
          />
          <span className="mt-2 text-sm md:text-xl text-white font-semibold text-center">Acoustic Guitar</span>
        </div>
        <div className="flex flex-col items-center group cursor-pointer p-2">
          <Icon 
            path={mdiGuitarElectric} 
            size={iconSize} 
            color="#fde047"
            className="transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-1"
          />
          <span className="mt-2 text-sm md:text-xl text-white font-semibold text-center">Electric Guitar</span>
        </div>
        <div className="flex flex-col items-center group cursor-pointer p-2">
          <Icon 
            path={mdiPiano} 
            size={iconSize} 
            color="#fde047"
            className="transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-1"
          />
          <span className="mt-2 text-sm md:text-xl text-white font-semibold text-center">Piano/Keyboard</span>
        </div>
        <div className="flex flex-col items-center group cursor-pointer p-2">
          <Icon 
            path={mdiMusicClefBass} 
            size={iconSize} 
            color="#fde047"
            className="transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-1"
          />
          <span className="mt-2 text-sm md:text-xl text-white font-semibold text-center">Bass Guitar</span>
        </div>
        <div className="flex flex-col items-center group cursor-pointer p-2">
          <Icon 
            path={mdiMicrophoneVariant} 
            size={iconSize} 
            color="#fde047"
            className="transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-1"
          />
          <span className="mt-2 text-sm md:text-xl text-white font-semibold text-center">Singing</span>
        </div>
        <div className="flex flex-col items-center group cursor-pointer p-2">
          <Icon 
            path={mdiDotsHorizontalCircleOutline} 
            size={iconSize} 
            color="#fde047"
            className="transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-1"
          />
          <span className="mt-2 text-sm md:text-xl text-white font-semibold text-center">...And More</span>
        </div>
      </div>
    </div>
  );
}