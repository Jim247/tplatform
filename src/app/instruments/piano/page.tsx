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
  mdiPiano,
} from '@mdi/js';
import FAQs from '@/components/FAQs';
import ImageBoxes from '@/components/ImageBoxes';
import VideoHero from '@/components/VideoHero';
import LogoText from '@/components/LogoText';
import InstrumentNarrative from '@/components/InstrumentNarrative';
import { mdiAccountMusic, mdiSchool } from '@mdi/js';
import SectionDivider from '@/components/SectionDivider';
import PricingWidget from '@/components/PricingWidget';
import ButtonBookNow from '@/components/BookNowButton';

export default function Home() {
  return (
    <>
      <VideoHero videoSrc="/piano-comp.mov">
        <div className="bg-black/40 p-6 rounded-lg flex flex-col items-center">
          <LogoText width={200} height={200} text={'PIANO LESSONS'} />
          <ButtonBookNow />
        </div>
      </VideoHero>
      <SectionDivider icon={mdiPiano} />
      <WidgetWrapper>
        <InstrumentNarrative
          headline1="Professional 1:1 Piano Tuition in Bristol"
          text1="Personalised piano lessons with top local musicians, including performers with international experience and advanced qualifications."
          icon1={mdiAccountMusic}
          headline2="Expert Piano Teachers"
          text2="Our tutors are professional pianists, many with music degrees or equivalent experience, Grade 8 certificates, and extensive live and studio backgrounds. Hand-picked for skill, personality, and professionalism."
          icon2={mdiSchool}
          headline3="All Ages, Styles & Exam Prep"
          text3="Ages 7+ to adults welcome. Styles: Classical, Jazz, Pop, Rock, Blues, and more. Areas: Bedminster, Bishopston, Clifton, Montpelier, Henleaze, Westbury-on-Trym, Greater Bristol. We support ABRSM, Trinity, Rockschool, and more."
          icon3={mdiPiano}
          iconSize={3}
          iconClassName="text-yellow-300 mb-2"
        />
      </WidgetWrapper>
      <SectionDivider icon={mdiPiano} />
      <WidgetWrapper>
        <ImageBoxes
          boxes={[
            {
              src: '/piano-lesson-square.jpg',
              title: 'Digital & Electric Piano',
              description:
                'Learn to play modern pop, rock, and jazz on digital and electric pianos. Explore synth sounds, contemporary techniques, and accompaniment styles.',
            },
            {
              src: '/piano-square.jpg',
              title: 'Acoustic Piano',
              description:
                'Master classical and contemporary piano styles. Build skills in sight-reading, technique, and interpretation, performing works from Bach to modern composers.',
            },
            {
              src: '/keyboard.jpg',
              title: 'Keyboard',
              description:
                'Explore keyboard skills for pop, rock, and electronic music. Learn chords, improvisation, and how to play in a band or solo.',
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
              'Develop essential piano-playing skills, including hand positioning, finger independence, and pedalling techniques.',
            icon: <Icon path={mdiHandPointingUp} size={2} className="text-yellow-300" />,
          },
          {
            title: 'Music Theory',
            description:
              'Understand chords, scales, and harmony to deepen your knowledge and enhance your piano playing.',
            icon: <Icon path={mdiMusic} size={2} className="text-yellow-300" />,
          },
          {
            title: 'Repertoire Development',
            description:
              'Learn to play your favourite pieces while exploring classical, jazz, and popular piano styles.',
            icon: <Icon path={mdiPlaylistMusic} size={2} className="text-yellow-300" />,
          },
          {
            title: 'Improvisation',
            description:
              'Express your creativity through improvisation in jazz, blues, or pop, gaining confidence in your musical expression.',
            icon: <Icon path={mdiBrush} size={2} className="text-yellow-300" />,
          },
          {
            title: 'Performance Skills',
            description:
              'Enhance your confidence and stage presence, preparing for recitals, exams, or casual performances.',
            icon: <Icon path={mdiMicrophone} size={2} className="text-yellow-300" />,
          },
          {
            title: 'Composition & Songwriting',
            description:
              'Combine creativity with theory to compose your own piano pieces, improvise your own music or write original songs.',
            icon: <Icon path={mdiPencil} size={2} className="text-yellow-300" />,
          },
        ]}
      />
      <SectionDivider icon={mdiPiano} />
      <WidgetWrapper>
        <Reviews reviews={reviewText} />
      </WidgetWrapper>
      <WidgetWrapper>
        <FAQs
          title="Frequently Asked Questions"
          tagline="Piano Lessons in Bristol"
          classes={{ container: 'max-w-6xl' }}
          icon={mdiPiano}
          items={[
            {
              question: 'I’ve never played piano before. Can I still learn?',
              answer:
                'Absolutely! Our tutors specialise in teaching beginners and will guide you step-by-step. No prior experience is needed—just enthusiasm to learn.',
            },
            {
              question: 'Do I need my own piano or keyboard?',
              answer:
                'Having your own piano or keyboard is ideal for practice, but you can start lessons even if you don’t have one yet. We can advise on affordable options and what to look for when buying or renting.',
            },
            {
              question: 'Do you teach children as well as adults?',
              answer:
                'Yes! We offer piano lessons for both children (typically ages 7+) and adults, adapting our teaching style to suit each student’s needs and goals.',
            },
            {
              question: 'What styles of piano can I learn?',
              answer:
                'We teach a wide range of styles including classical, jazz, pop, rock, blues, and more. Lessons are tailored to your musical interests.',
            },
            {
              question: 'Can you help me prepare for piano exams?',
              answer:
                'Yes, we support exam preparation for ABRSM, Trinity, Rockschool, and other boards. We’ll help you with repertoire, technique, sight-reading, and aural skills.',
            },
            {
              question: 'How long are the piano lessons?',
              answer:
                'Lessons typically range from 30 minutes to an hour, depending on your preference and schedule.',
            },
            {
              question: 'Do I need to learn to read music?',
              answer:
                'Reading music is a valuable skill for pianists, but we’ll introduce it at your pace. We also teach by ear, chord symbols, and improvisation if you prefer.',
            },
            {
              question: 'Can I take piano lessons online?',
              answer:
                'Yes, we offer online piano lessons via video call, providing the same high-quality instruction as in-person sessions.',
            },
            {
              question: 'How often should I attend piano lessons?',
              answer:
                'Weekly lessons are recommended for steady progress, with regular practice between sessions.',
            },
            {
              question: 'Am I too old to start learning piano?',
              answer:
                "Not at all! It's never too late to start learning piano. Many adults find it a rewarding and enjoyable hobby.",
            },
            {
              question: 'Can I book a trial lesson?',
              answer:
                'Absolutely! We offer a free 20-minute trial session for new students to help you decide if our piano lessons are the right fit for you.',
            },
          ]}
        />
      </WidgetWrapper>
      <PricingWidget />
    </>
  );
}
