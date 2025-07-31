import Hero from "@components/Hero"
import Reviews from '@/components/Reviews'
import WidgetWrapper from "@/components/WidgetWrapper";
import { reviewText } from '@components/review-text'
import SectionDivider from "@/components/SectionDivider";
import TextBoxWithInstruments from "@/components/TextBoxWithInstruments";

export default function Home() {
  return (
    <>
      <Hero 
        image={{ src: "/Hero.jpeg", alt: "hero" }}
        mobileImage={{ src: "/heromob.png", alt: "Mobile hero" }}
      />
<SectionDivider imgSrc="/logo.svg" size={3} />

<TextBoxWithInstruments
     heading="Bristol Music Tuition"
          imageSrc="/guitar-square.png"
          intro="We proudly offer music lessons across the greater Bristol area."
          bulletPoints={[
        "A hand-picked roster of specialist tutors",
        "Visit us at a tutor's studio, or mobile service (subject to availability) ",
        "Excellent customer service - Read our reviews",
        "Guitar, piano, singing, brass, woodwind, and more",
          ]}
          subheading="All Experience Levels"
          subtext="Beginners are warmly welcomed and supported. Advanced players benefit from tailored mentoring that can be a true game changer for their growth." />

      <WidgetWrapper>
        <SectionDivider imgSrc="/logo.svg" size={3} />
        <Reviews reviews={reviewText}/>
      </WidgetWrapper>
    </>
  );
}
