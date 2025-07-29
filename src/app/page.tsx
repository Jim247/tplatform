import Instruments from "@/components/Instruments";
import Hero from "@components/Hero"
import Reviews from '@/components/Reviews'
import TextBox from "@/components/TextBox";
import WidgetWrapper from "@/components/WidgetWrapper";
import { reviewText } from '@components/review-text'

export default function Home() {
  return (
    <>
      <Hero 
        image={{ src: "/Hero.jpeg", alt: "hero" }}
        mobileImage={{ src: "/heromob.png", alt: "Mobile hero" }}
      />
      <WidgetWrapper>
        <Instruments />
      </WidgetWrapper>
      <WidgetWrapper>
        <TextBox
          heading="Music Lessons Bristol"
          intro="We proudly offer music lessons across the greater Bristol area and nationwide through our online platform."
          bulletPoints={[
            "A hand-picked roster of specialist tutors",
            "Guitar, piano, singing, brass, woodwind, and more",
            "Online and in-person lessons available",
          ]}
          subheading="For All Levels"
          subtext="Beginners are warmly welcomed and supported. Advanced players benefit from tailored mentoring that can be a true game changer for their growth."
        />
      </WidgetWrapper>
      <WidgetWrapper>
        <Reviews reviews={reviewText}/>
      </WidgetWrapper>
    </>
  );
}
