import Icon from '@mdi/react';
import {
  mdiGuitarAcoustic,
  mdiGuitarElectric,
  mdiMusicClefBass,
  mdiMicrophoneVariant,
  mdiPiano,
  mdiDotsHorizontalCircleOutline,
} from '@mdi/js';
import Link from 'next/link';

export default function Instruments({ className = '' }: { className?: string }) {
  const instruments = [
    { icon: mdiGuitarAcoustic, name: 'Acoustic Guitar', link: '/instruments/guitar' },
    { icon: mdiGuitarElectric, name: 'Electric Guitar', link: '/instruments/guitar' },
    { icon: mdiPiano, name: 'Piano/Keyboard', link: '/instruments/piano' },
    { icon: mdiMusicClefBass, name: 'Bass Guitar', link: '/instruments/guitar' },
    { icon: mdiMicrophoneVariant, name: 'Singing', link: '/instruments/singing' },
    { icon: mdiDotsHorizontalCircleOutline, name: 'More Instruments', link: '#' },
  ];

  return (
    <div className={`container max-w-7xl mx-auto px-6 py-16 ${className}`}>
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Professional Music Tuition
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Expert instruction across a range of instruments with qualified, experienced teachers
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {instruments.map((instrument, index) => (
          <Link key={index} href={instrument.link} className="group">
            <div className="flex flex-col items-center text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-yellow-300/50 transition-all duration-300 hover:bg-gray-800/50 min-h-[160px] justify-center">
              <Icon
                path={instrument.icon}
                size={2.5}
                className="text-yellow-300 group-hover:text-yellow-300 transition-colors duration-300 mb-4"
              />
              <span className="text-white font-medium text-sm leading-tight">
                {instrument.name}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-200 text-sm">
          All lessons available for beginners through to advanced students of all ages
        </p>
      </div>
    </div>
  );
}
