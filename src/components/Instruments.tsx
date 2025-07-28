import Icon from "@mdi/react";
import { 
  mdiGuitarAcoustic, 
  mdiGuitarElectric, 
  mdiMusicClefBass,
  mdiMicrophoneVariant 
} from "@mdi/js";

export default function Instruments() {
  return (
    <div className='container mx-auto py-8 mt-8'>
      <h1 className='text-center text-5xl mb-8 text-white font-[Montserrat] uppercase'>Learn with us..</h1>
      <div className="flex flex-wrap justify-center gap-12 uppercase font-[Montserrat]">
        <div className="flex flex-col items-center group cursor-pointer">
          <Icon 
            path={mdiGuitarAcoustic} 
            size={2.5} 
            color="var(--highlight)" 
            className="transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-1"
          />
          <span className="mt-2 text-xl text-white font-semibold">Acoustic Guitar</span>
        </div>
        <div className="flex flex-col items-center group cursor-pointer">
          <Icon 
            path={mdiGuitarElectric} 
            size={2.5} 
            color="var(--highlight)" 
            className="transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-1"
          />
          <span className="mt-2 text-xl text-white font-semibold">Electric Guitar</span>
        </div>
        <div className="flex flex-col items-center group cursor-pointer">
          <Icon 
            path={mdiMusicClefBass} 
            size={2.5} 
            color="var(--highlight)" 
            className="transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-1"
          />
          <span className="mt-2 text-xl text-white font-semibold">Bass Guitar</span>
        </div>
        <div className="flex flex-col text-white items-center group cursor-pointer">
          <Icon 
            path={mdiMicrophoneVariant} 
            size={2.5} 
            color="var(--highlight)" 
            className="transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-1"
          />
          <span className="mt-2 text-xl font-semibold">Singing</span>
        </div>
      </div>
    </div>
  );
}