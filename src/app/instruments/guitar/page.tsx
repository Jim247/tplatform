import Hero from "@components/Hero"
import Reviews from '@/components/Reviews'
import WidgetWrapper from "@/components/WidgetWrapper";
import { reviewText } from '@components/review-text'
import Features from "@/components/Features";
import Icon from '@mdi/react';
import { 
  mdiHandPointingUp,
  mdiMusic,
  mdiPlaylistMusic,
  mdiBrush,
  mdiMicrophone,
  mdiPencil
} from '@mdi/js';

export default function Home() {
  return (
    <>
    <Hero 
      image={{ src: "/.jpeg", alt: "hero" }}
      mobileImage={{ src: "/heromob.png", alt: "Mobile hero" }}
    />
        <WidgetWrapper>

       <Features
    columns={3}
    items={[
      {
        title: 'Proper Technique',
        description:
          'Develop essential guitar-playing skills, including hand positioning, using a plectrum/pick, strumming, and fingerpicking techniques.',
        icon: <Icon path={mdiHandPointingUp} size={2} />,
      },
      {
        title: 'Music Theory',
        description: 'Understand chords, scales, and harmony to deepen your knowledge and enhance your guitar playing.',
        icon: <Icon path={mdiMusic} size={2} />,
      },
      {
        title: 'Repertoire Development',
        description: 'Learn to play your favourite songs while exploring contemporary, and popular guitar styles.',
        icon: <Icon path={mdiPlaylistMusic} size={2} />,
      },
      {
        title: 'Improvisation',
        description:
          'Express your creativity through improvisation in rock, jazz, or blues, gaining confidence in your musical expression.',
        icon: <Icon path={mdiBrush} size={2} />,
      },
      {
        title: 'Performance Skills',
        description: 'Enhance your confidence and stage presence, preparing for live performances or jam sessions.',
        icon: <Icon path={mdiMicrophone} size={2} />,
      },
      {
        title: 'Composition & Songwriting',
        description:
          'Combine creativity with theory to compose your own guitar pieces, improvise your own music or write original songs.',
        icon: <Icon path={mdiPencil} size={2} />,
      },
    ]}
  />
          <WidgetWrapper>
        <Reviews reviews={reviewText}/>
        </WidgetWrapper>
        </WidgetWrapper>
        </>
  );
}