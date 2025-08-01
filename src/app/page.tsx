import Reviews from '@/components/Reviews';
import WidgetWrapper from '@/components/WidgetWrapper';
import { reviewText } from '@components/review-text';
import SectionDivider from '@/components/SectionDivider';
import VideoHero from '@/components/VideoHero';
import LogoText from '@/components/LogoText';
import Instruments from '@/components/Instruments';
import ImageBoxes from '@/components/ImageBoxes';
import PricingWidget from '@/components/PricingWidget';

export default function Home() {
  return (
    <>
      <VideoHero videoSrc="/child-guitar-trimmed.mp4">
        <div className="bg-black/40 p-6 rounded-lg flex flex-col items-center">
          <LogoText width={200} height={200} text={'TEMPO TUITION'} />
          <button className="mt-4 px-8 py-3 bg-yellow-300 text-black font-bold rounded-lg shadow-lg hover:bg-yellow-400 transition">
            Book Now
          </button>
        </div>
      </VideoHero>
      <SectionDivider imgSrc="/logo.svg" size={3} />
      <Instruments/>
      <div className='py-8'></div>
<ImageBoxes
  boxes={[
    {
      src: '/piano-square.jpg',
      title: 'Hand-Picked Tutors',
      description:
        'We proudly offer music lessons across the greater Bristol area with a hand-picked roster of specialist tutors. Guitar, piano, singing, brass, woodwind, and more instruments available.',
    },
    {
      src: '/guitar-lesson-square.jpg',
      title: 'All Experience Levels Welcome',
      description:
        'Beginners are warmly welcomed and supported with patient, encouraging instruction. Advanced players benefit from tailored mentoring that can be a true game changer for their musical growth.',
    },
    {
      src: '/singing-lesson-square.jpg',
      title: 'Flexible Lesson Locations',
      description:
        'Visit us at a tutor\'s studio, or choose our mobile service (subject to availability). Excellent customer service with outstanding reviews from satisfied students across Bristol.',
    },
  ]}
/>
        <SectionDivider imgSrc="/logo.svg" size={3} />
      <WidgetWrapper>

        <Reviews reviews={reviewText} />
        <PricingWidget/>
      </WidgetWrapper>
    </>
  );
}
