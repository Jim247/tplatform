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
      image={{ src: "/.jpeg", alt: "hero" }}
      mobileImage={{ src: "/heromob.png", alt: "Mobile hero" }}
    />
        <WidgetWrapper>
        <Reviews reviews={reviewText}/>
        </WidgetWrapper>
        </>
  );
}
