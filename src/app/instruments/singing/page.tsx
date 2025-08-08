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
  mdiHelp,
} from '@mdi/js';
import FAQs from '@/components/FAQs';
import ImageBoxes from '@/components/ImageBoxes';
import VideoHero from '@/components/VideoHero';
import LogoText from '@/components/LogoText';
import InstrumentNarrative from '@/components/InstrumentNarrative';
import { mdiSchool } from '@mdi/js';
import SectionDivider from '@/components/SectionDivider';
import PricingWidget from '@/components/PricingWidget';
import ButtonBookNow from '@/components/BookNowButton';
import { createInstrumentMetadata } from '@/utils/metadata';
import { Metadata } from 'next';
import CTA from '@/components/CTA';

export const metadata: Metadata = createInstrumentMetadata('singing');

export default function Home() {
  return (
    <>
      <VideoHero videoSrc="/singing-comp.mov">
        <div className="bg-black/40 p-6 rounded-lg flex flex-col items-center">
          <LogoText width={200} height={200} text={'SINGING LESSONS'} />
          <ButtonBookNow />
        </div>
      </VideoHero>
      <SectionDivider icon={mdiMicrophone} />
      <WidgetWrapper>
        <InstrumentNarrative
          headline1="Professional 1:1 Singing Tuition in Bristol"
          text1="Personalised singing lessons with top local vocal coaches, including performers with international experience and advanced qualifications."
          icon1={mdiMicrophone}
          headline2="Expert Vocal Coaches"
          text2="Our tutors are professional singers and vocal coaches, many with music degrees or equivalent experience, Grade 8 certificates, and extensive live and studio backgrounds. Hand-picked for skill, personality, and professionalism."
          icon2={mdiSchool}
          headline3="All Ages, Styles & Exam Prep"
          text3="Ages 7+ to adults welcome. Styles: Pop, Rock, Jazz, Classical, Musical Theatre, and more. Areas: Bedminster, Bishopston, Clifton, Montpelier, Henleaze, Westbury-on-Trym, Greater Bristol. We support ABRSM, Trinity, Rockschool, and more."
          icon3={mdiMicrophone}
          iconSize={3}
          iconClassName="text-yellow-300 mb-2"
        />
      </WidgetWrapper>
      <SectionDivider icon={mdiMicrophone} />
      <WidgetWrapper>
        <CTA icon={mdiHelp} ctaQuestion="Heard Enough Already?" />
        <ImageBoxes
          boxes={[
            {
              src: '/singing-lesson-square.jpg',
              title: 'Pop & Contemporary Singing',
              description:
                'Learn to sing your favourite pop, rock, and contemporary songs. Develop vocal technique, style, and performance skills for modern music.',
            },
            {
              src: '/singer-square.jpg',
              title: 'Classical & Choral Singing',
              description:
                'Master classical and choral repertoire, focusing on breath control, tone, and musical expression. Suitable for all levels.',
            },
            {
              src: '/theatre-singer-square.jpg',
              title: 'Musical Theatre',
              description:
                'Explore the world of musical theatre. Learn to sing, act, and perform songs from Broadway and West End shows.',
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
              'Develop essential singing skills, including breath control, posture, diction, and vocal health.',
            icon: <Icon path={mdiHandPointingUp} size={2} className="text-yellow-300" />,
          },
          {
            title: 'Music Theory',
            description:
              'Understand melody, harmony, and rhythm to deepen your knowledge and enhance your singing.',
            icon: <Icon path={mdiMusic} size={2} className="text-yellow-300" />,
          },
          {
            title: 'Repertoire Development',
            description:
              'Learn to sing your favourite songs while exploring classical, pop, jazz, and musical theatre styles.',
            icon: <Icon path={mdiPlaylistMusic} size={2} className="text-yellow-300" />,
          },
          {
            title: 'Improvisation',
            description:
              'Express your creativity through vocal improvisation and interpretation, gaining confidence in your musical expression.',
            icon: <Icon path={mdiBrush} size={2} className="text-yellow-300" />,
          },
          {
            title: 'Performance Skills',
            description:
              'Enhance your confidence and stage presence, preparing for auditions, gigs, or recitals.',
            icon: <Icon path={mdiMicrophone} size={2} className="text-yellow-300" />,
          },
          {
            title: 'Songwriting & Creativity',
            description:
              'Combine creativity with technique to write your own songs, improvise melodies, or arrange vocal harmonies.',
            icon: <Icon path={mdiPencil} size={2} className="text-yellow-300" />,
          },
        ]}
      />
      <SectionDivider icon={mdiMicrophone} />
      <WidgetWrapper>
        <Reviews reviews={reviewText} />
      </WidgetWrapper>
      <WidgetWrapper>
        <FAQs
          title="Frequently Asked Questions"
          tagline="Singing Lessons in Bristol"
          classes={{ container: 'max-w-6xl' }}
          icon={mdiMicrophone}
          items={[
            {
              question: 'I’ve never had singing lessons before. Can I still learn?',
              answer:
                'Absolutely! Our tutors specialise in teaching beginners and will guide you step-by-step. No prior experience is needed—just enthusiasm to sing.',
            },
            {
              question: 'Do I need my own microphone or equipment?',
              answer:
                'No special equipment is needed to start. We can advise on microphones and practice tools if you wish to use them at home.',
            },
            {
              question: 'Do you teach children as well as adults?',
              answer:
                'Yes! We offer singing lessons for both children (typically ages 7+) and adults, adapting our teaching style to suit each student’s needs and goals.',
            },
            {
              question: 'What styles of singing can I learn?',
              answer:
                'We teach a wide range of styles including pop, rock, jazz, classical, musical theatre, and more. Lessons are tailored to your musical interests.',
            },
            {
              question: 'Can you help me prepare for singing exams or auditions?',
              answer:
                'Yes, we support exam and audition preparation for ABRSM, Trinity, Rockschool, and other boards. We’ll help you with repertoire, technique, and performance skills.',
            },
            {
              question: 'How long are the singing lessons?',
              answer:
                'Lessons typically range from 30 minutes to an hour, depending on your preference and schedule.',
            },
            {
              question: 'Do I need to learn to read music?',
              answer:
                'Reading music is helpful but not required. We’ll introduce it at your pace and also teach by ear, chord symbols, and improvisation if you prefer.',
            },
            {
              question: 'Can I take singing lessons online?',
              answer:
                'Yes, we offer online singing lessons via video call, providing the same high-quality instruction as in-person sessions.',
            },
            {
              question: 'How often should I attend singing lessons?',
              answer:
                'Weekly lessons are recommended for steady progress, with regular practice between sessions.',
            },
            {
              question: 'Am I too old to start learning to sing?',
              answer:
                "Not at all! It's never too late to start singing. Many adults find it a rewarding and enjoyable hobby.",
            },
            {
              question: 'Can I book a trial lesson?',
              answer:
                'Absolutely! We offer a free 20-minute trial session for new students to help you decide if our singing lessons are the right fit for you.',
            },
          ]}
        />
      </WidgetWrapper>
      <PricingWidget />
      <CTA icon={mdiHelp} ctaQuestion="Time to book?" />
    </>
  );
}
