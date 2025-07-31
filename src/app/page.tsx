import Reviews from '@/components/Reviews';
import WidgetWrapper from '@/components/WidgetWrapper';
import { reviewText } from '@components/review-text';
import SectionDivider from '@/components/SectionDivider';
import TextBoxWithInstruments from '@/components/TextBoxWithInstruments';
import VideoHero from '@/components/VideoHero';
import LogoText from '@/components/LogoText';

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

      <TextBoxWithInstruments
        heading="Bristol Music Tuition"
        imageSrc="/guitar-square.png"
        intro="We proudly offer music lessons across the greater Bristol area."
        bulletPoints={[
          'A hand-picked roster of specialist tutors',
          "Visit us at a tutor's studio, or mobile service (subject to availability) ",
          'Excellent customer service - Read our reviews',
          'Guitar, piano, singing, brass, woodwind, and more',
        ]}
        subheading="All Experience Levels"
        subtext="Beginners are warmly welcomed and supported. Advanced players benefit from tailored mentoring that can be a true game changer for their growth."
      />

      <WidgetWrapper>
        <SectionDivider imgSrc="/logo.svg" size={3} />
        <Reviews reviews={reviewText} />
      </WidgetWrapper>
    </>
  );
}
