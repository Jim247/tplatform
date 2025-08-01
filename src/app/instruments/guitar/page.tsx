import Reviews from '@/components/Reviews';
import WidgetWrapper from '@/components/WidgetWrapper';
import { reviewText } from '@components/review-text';
import Features from '@/components/Features';
import Icon from '@mdi/react';
import {
  mdiHandPointingUp,
  mdiMusic,
  mdiPlaylistMusic,
  mdiBrush,
  mdiMicrophone,
  mdiPencil,
  mdiGuitarPickOutline,
} from '@mdi/js';
import FAQs from '@/components/FAQs';
import ImageBoxes from '@/components/ImageBoxes';
import VideoHero from '@/components/VideoHero';
import LogoText from '@/components/LogoText';
import InstrumentNarrative from '@/components/InstrumentNarrative';
import { mdiGuitarPick, mdiAccountMusic, mdiSchool, mdiGuitarAcoustic } from '@mdi/js';
import SectionDivider from '@/components/SectionDivider';
import PricingWidget from '@/components/PricingWidget';

export default function Home() {
  return (
    <>
      <VideoHero videoSrc="/child-guitar-trimmed.mp4">
        <div className="bg-black/40 p-6 rounded-lg flex flex-col items-center">
          <LogoText width={200} height={200} text={'GUITAR LESSONS'} />
          <button className="mt-4 px-8 py-3 bg-yellow-300 text-black font-bold rounded-lg shadow-lg hover:bg-yellow-400 transition">
            Book Now
          </button>
        </div>
      </VideoHero>
      <SectionDivider icon={mdiGuitarPick} />
      <WidgetWrapper>
        <InstrumentNarrative
          headline1="Professional 1:1 Guitar Tuition in Bristol"
          text1="Personalised guitar lessons with top local musicians, have lessons with musicians who have performed abroad, at Glastonbury and Leeds Festival, and more."
          icon1={mdiAccountMusic}
          headline2="Expert Guitar Teachers"
          text2="Our tutors are professional musicians, many with music degrees or equivalent experience, Grade 8 certificates, and extensive live experience. Hand-picked for skill, personality, and professionalism."
          icon2={mdiSchool}
          headline3="All Ages, Styles & Exam Prep"
          text3="Ages 7+ to adults welcome. Styles: Rock/Pop, Acoustic/Folk, Jazz, Metal, Classical. Areas: Bedminster, Bishopston, Clifton, Montpelier, Henleaze, Westbury-on-Trym, Greater Bristol. We support Rockschool, ABRSM, Trinity, and more."
          icon3={mdiGuitarAcoustic}
          iconSize={3}
          iconClassName="text-yellow-300 mb-2"
        />
      </WidgetWrapper>
      <SectionDivider icon={mdiGuitarPick} />
      <WidgetWrapper>
        <ImageBoxes
          boxes={[
            {
              src: '/electric-guitar.jpg',
              title: 'Electric Guitar',
              description:
                'Learn to play classic and modern rock, pop, and blues on electric guitar—from Chuck Berry’s “Johnny B. Goode” to Oasis and beyond. Explore riffs, solos, and effects that define the electric sound.',
            },
            {
              src: '/acoustic-guitar.jpg',
              title: 'Acoustic Guitar',
              description:
                'Master acoustic guitar styles including folk, singer-songwriter, and unplugged pop. Build skills in chord strumming, fingerpicking, and perform songs from artists like Ed Sheeran, Taylor Swift, and more.',
            },
            {
              src: '/bass-guitar.jpg',
              title: 'Bass Guitar',
              description:
                'Discover the groove and rhythm of bass guitar. Learn essential techniques for rock, pop, funk, and jazz, and develop your skills in playing basslines, locking in with the drums, and supporting the band’s sound.',
            },
          ]}
        />
      </WidgetWrapper>

      <Features
        columns={3}
        items={[
          {
            title: 'Proper Technique',
            description:
              'Develop essential guitar-playing skills, including hand positioning, using a plectrum/pick, strumming, and fingerpicking techniques.',
            icon: <Icon path={mdiHandPointingUp} size={2} className="text-yellow-300" />,
          },
          {
            title: 'Music Theory',
            description:
              'Understand chords, scales, and harmony to deepen your knowledge and enhance your guitar playing.',
            icon: <Icon path={mdiMusic} size={2} className="text-yellow-300" />,
          },
          {
            title: 'Repertoire Development',
            description:
              'Learn to play your favourite songs while exploring contemporary, and popular guitar styles.',
            icon: <Icon path={mdiPlaylistMusic} size={2} className="text-yellow-300" />,
          },
          {
            title: 'Improvisation',
            description:
              'Express your creativity through improvisation in rock, jazz, or blues, gaining confidence in your musical expression.',
            icon: <Icon path={mdiBrush} size={2} className="text-yellow-300" />,
          },
          {
            title: 'Performance Skills',
            description:
              'Enhance your confidence and stage presence, preparing for live performances or jam sessions.',
            icon: <Icon path={mdiMicrophone} size={2} className="text-yellow-300" />,
          },
          {
            title: 'Composition & Songwriting',
            description:
              'Combine creativity with theory to compose your own guitar pieces, improvise your own music or write original songs.',
            icon: <Icon path={mdiPencil} size={2} className="text-yellow-300" />,
          },
        ]}
      />
      <SectionDivider icon={mdiGuitarPick} />
      <WidgetWrapper>
        <Reviews reviews={reviewText} />
      </WidgetWrapper>
      <WidgetWrapper>
        <FAQs
          title="Frequently Asked Questions"
          tagline="Guitar Lessons in Bristol"
          classes={{ container: 'max-w-6xl' }}
          icon={mdiGuitarPickOutline}
          items={[
            {
              question: 'I’ve never played guitar before. Can I still learn?',
              answer:
                'The tutors we partner with specialize in guiding beginners step-by-step. Choose your tutor based on your goals and start learning guitar today!',
            },
            {
              question: 'Do I need an acoustic guitar or an electric guitar?',
              answer:
                'Both acoustic and electric guitars are suitable for beginners. We can help you choose the right guitar based on your interests and goals.',
            },
            {
              question: 'Do you teach children?',
              answer:
                'Yes! We offer guitar lessons for both children and adults, adapting our teaching style to suit the needs and abilities of each age group.',
            },
            {
              question: 'How often should I attend guitar lessons?',
              answer:
                'For steady progress, we recommend attending lessons once a week. Regular practice between sessions is also essential to improve your skills.',
            },
            {
              question: 'What types of music can I learn on guitar?',
              answer:
                'You can learn a wide range of genres, including rock, pop, blues, jazz, classical, and more. Lessons are customised to match your musical interests and goals.',
            },
            {
              question: 'How long will it take me to learn to play guitar?',
              answer:
                'The time it takes varies depending on your goals, practice habits, and prior experience. Most beginners can play simple chords and songs within a few weeks, while becoming proficient may take months to years.',
            },
            {
              question: 'Am I too old to start learning guitar?',
              answer:
                "Not at all! It's never too late to start learning guitar. Many adults find it a rewarding hobby, and we'll ensure lessons are suited to your pace and interests.",
            },
            {
              question: 'What if I don’t know how to read music?',
              answer:
                "No worries! Reading sheet music isn't necessary to start learning guitar. We'll teach you everything you need, including chord charts, tabs, and basic music theory.",
            },
            {
              question: 'How long are the guitar lessons?',
              answer:
                'Lessons typically range from 30 minutes to an hour, depending on your preference and availability.',
            },
            {
              question: 'Can I take guitar lessons online?',
              answer:
                'Yes, we offer online guitar lessons via video calls, providing the same high-quality instruction as in-person sessions.',
            },
            {
              question: 'Can I book a trial lesson?',
              answer:
                'Absolutely! We offer a free 20-minute trial session for new students to help you decide if our guitar lessons are the right fit for you.',
            },
          ]}
        />
      </WidgetWrapper>
      <PricingWidget />
    </>
  );
}
