import Steps from "@/components/Steps";
import Hero from "@components/Hero"
import { IconUserPlus, IconId, IconSearch, IconCheck } from "@tabler/icons-react"; // Adjust the import path as needed

export default function Home() {
  return (
    <>
    <Hero 
      image={{ src: "/Hero.jpeg", alt: "hero" }}
      mobileImage={{ src: "/heromob.png", alt: "Mobile hero" }}
    />
    <Steps
          title="Find your perfect music tutor"
          items={[
            {
              title: 'Step 1: Sign Up',
              description:
                "Create your account by providing your basic details. It's quick and easy, and you'll be ready to explore the platform in no time.",
              icon: IconUserPlus,
            },
            {
              title: 'Step 2: Create Profile',
              description:
                'Fill out your profile with your skills, experience, and a promo video. This helps potential clients understand your expertise and book you for gigs.',
              icon: IconId,
            },
            {
              title: 'Step 3: Find Gigs',
              description:
                'When relevant gigs are posted, apply for them. If the poster likes your profile, they will reach out to you directly.',
              icon: IconSearch,
            },
            {
              title: 'Step 4: Perform & Gain Reviews',
              description:
                'Deliver a great performance and build your reputation. Get booked again as your profile grows!',
              icon: IconCheck,
            },
          ]}
          image="/assets/images/steps-image.jpg"
        />
        </>
  );
}
