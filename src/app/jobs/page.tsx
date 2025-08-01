import FAQs from '@/components/FAQs';
import SectionDivider from '@/components/SectionDivider';
import TutorBenefits from '@/components/TutorBenefits';
import { mdiChatQuestion } from '@mdi/js';
export default function Jobs() {
  return (
    <>
      <div className="pt-2 items-center text-center uppercase text-5xl font-bold text-white">
        {' '}
        Join Us
      </div>

      <TutorBenefits />

      <SectionDivider imgSrc="/logo.svg" size={3} />
      <FAQs
        title="Frequently Asked Questions"
        tagline="FAQs for Tutors"
        icon={mdiChatQuestion}
        classes={{ container: 'max-w-6xl' }}
        items={[
          {
            question: 'Which instruments can I offer?',
            answer:
              "Any instrument is welcome—vocals, piano, guitar, and more. We're always excited to add new specialties.",
          },
          {
            question: 'Do I need to be qualified?',
            answer:
              'Formal qualifications are helpful but not required. We value your passion, experience, and ability to inspire students.',
          },
          {
            question: 'Can I join if I’m outside Bristol?',
            answer:
              'Our main focus is Bristol, but we do support online teaching. Get in touch if you’d be happy to commute.',
          },
          {
            question: 'How do I get paid?',
            answer:
              'Payments are processed securely and sent monthly, typically within three working days of your invoice.',
          },
          {
            question: 'What happens if a student cancels?',
            answer:
              'We have a fair cancellation policy to protect tutors and students. See our terms for full details.',
          },
          {
            question: 'What are the platform fees?',
            answer:
              'Our fees range from 20-25%, lower than most competitors, and help us support local tutors.',
          },
          {
            question: 'Can I teach online lessons?',
            answer:
              'Absolutely! You can set your profile to offer remote lessons as well as in-person.',
          },
          {
            question: 'What support do you provide?',
            answer:
              'We offer technical support, profile optimisation, and ongoing advice to help you succeed.',
          },
          {
            question: 'How do I build my reputation?',
            answer: 'Ask students for reviews to boost your profile and attract more clients.',
          },
          {
            question: 'Can I teach full-time?',
            answer:
              'Many tutors use the platform to fill their schedule. Top tutors can maximise their hours.',
          },
          {
            question: 'What makes this platform unique?',
            answer:
              'We focus on supporting Bristol’s music tutors with competitive rates, custom tools, and a friendly community.',
          },
        ]}
      />
    </>
  );
}
