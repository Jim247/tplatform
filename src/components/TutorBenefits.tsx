import Icon from '@mdi/react';
import {
  mdiTrendingUp,
  mdiCurrencyGbp,
  mdiAccountEdit,
  mdiToolbox,
  mdiStar,
  mdiLifebuoy,
} from '@mdi/js';

interface Benefit {
  title: string;
  description: string;
  icon: string;
}

interface TutorBenefitsProps {
  className?: string;
}

export default function TutorBenefits({ className = '' }: TutorBenefitsProps) {
  const benefits: Benefit[] = [
    {
      title: 'Boost Your Profile',
      description:
        'Stand out locally with our SEO-focused platform, tailored to help you attract more students in Bristol.',
      icon: mdiTrendingUp,
    },
    {
      title: 'Great Pay',
      description:
        'Competitive hourly rates with bonuses. No hidden costs. All revenue supports platform growth for local tutors.',
      icon: mdiCurrencyGbp,
    },
    {
      title: 'Teach Your Way',
      description:
        'Customise your schedule, lessons, and style. Piano, guitar, vocals—your expertise, your way.',
      icon: mdiAccountEdit,
    },
    {
      title: 'All-in-One Platform',
      description:
        'Handle scheduling, payments, and communication with ease using integrated tools.',
      icon: mdiToolbox,
    },
    {
      title: 'Build Your Reputation',
      description:
        'Leverage reviews to showcase your expertise and attract new clients effortlessly.',
      icon: mdiStar,
    },
    {
      title: 'Ongoing Support',
      description: 'Access expert help, from profile optimisation to resolving technical issues.',
      icon: mdiLifebuoy,
    },
  ];

  return (
    <div className={`max-w-7xl mx-auto px-4 py-12 ${className}`}>
      {/* Grid: 3 columns on desktop, 2 rows */}
      <div className="hidden md:grid md:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-grey p-6 rounded-2xl border border-gray-600/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-yellow-300/10 rounded-full">
                <Icon path={benefit.icon} size={2.5} className="text-yellow-300" />
              </div>
              <h3 className="text-xl font-bold text-white font-[Montserrat] uppercase tracking-wide">
                {benefit.title}
              </h3>
              <p className="text-gray-200 text-base leading-relaxed">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: Stacked list */}
      <div className="md:hidden space-y-4">
        {benefits.map((benefit, index) => (
          <div key={index} className="bg-grey p-6 rounded-2xl border border-gray-600/30 shadow-xl">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-yellow-300/10 rounded-full flex-shrink-0">
                <Icon path={benefit.icon} size={1.5} className="text-yellow-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white font-[Montserrat] uppercase tracking-wide mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-200 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
