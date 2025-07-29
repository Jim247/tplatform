import Icon from "@mdi/react";
import { 
  mdiGuitarAcoustic, 
  mdiGuitarElectric, 
  mdiMusicClefBass,
  mdiMicrophoneVariant, 
  mdiPiano,
  mdiHeadDotsHorizontal,
  mdiMore,
  mdiDotsHorizontal,
  mdiDotsHorizontalCircleOutline
} from "@mdi/js";

export default function Instruments() {
  const iconSize = 4

  return (
    <div className='container mx-auto'>
      <div className="text-white text-xl text-center">
        Welcome to Tempo Tuition, Bristol's leading provider of musical instrument tuition
      </div>
      <h1 className='text-center text-5xl mb-8 pt-10 pb-5 text-white font-[Montserrat] uppercase'>We Teach</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-xs mx-auto sm:max-w-none uppercase font-[Montserrat]">
        {/* Top row icons */}
        <div className="flex flex-col items-center group cursor-pointer p-2">
          <Icon 
            path={mdiGuitarAcoustic} 
            size={iconSize} 
            color="var(--highlight)"
            className="transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-1"
          />
          <span className="mt-2 text-sm md:text-xl text-white font-semibold text-center">Acoustic Guitar</span>
        </div>
        <div className="flex flex-col items-center group cursor-pointer p-2">
          <Icon 
            path={mdiGuitarElectric} 
            size={iconSize} 
            color="var(--highlight)"
            className="transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-1"
          />
          <span className="mt-2 text-sm md:text-xl text-white font-semibold text-center">Electric Guitar</span>
        </div>
        <div className="flex flex-col items-center group cursor-pointer p-2">
          <Icon 
            path={mdiPiano} 
            size={iconSize} 
            color="var(--highlight)"
            className="transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-1"
          />
          <span className="mt-2 text-sm md:text-xl text-white font-semibold text-center">Piano/Keyboard</span>
        </div>
        <div className="flex flex-col items-center group cursor-pointer p-2">
          <Icon 
            path={mdiMusicClefBass} 
            size={iconSize} 
            color="var(--highlight)"
            className="transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-1"
          />
          <span className="mt-2 text-sm md:text-xl text-white font-semibold text-center">Bass Guitar</span>
        </div>
        {/* Bottom row, centered on lg+ */}
        <div className="col-span-2 md:col-span-4 flex justify-center gap-6">
          <div className="flex flex-col items-center group cursor-pointer p-2">
            <Icon 
              path={mdiMicrophoneVariant} 
              size={iconSize} 
              color="var(--highlight)"
              className="transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-1"
            />
            <span className="mt-2 text-sm md:text-xl text-white font-semibold text-center">Singing</span>
          </div>
          <div className="flex flex-col items-center group cursor-pointer p-2">
            <Icon 
              path={mdiDotsHorizontalCircleOutline} 
              size={iconSize} 
              color="var(--highlight)"
              className="transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-1"
            />
            <span className="mt-2 text-sm md:text-xl text-white font-semibold text-center">...And More</span>
          </div>
        </div>
      </div>
    </div>
  );
}