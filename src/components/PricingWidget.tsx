import Icon from '@mdi/react';
import { mdiAccountMultiple, mdiCalendarCheck, mdiStar, mdiCheckCircle } from '@mdi/js';

export default function PricingWidget() {
  return (
    <section className="max-w-6xl mx-auto px-2 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Lesson Pricing</h2>
        <p className="text-lg text-gray-300">
          Choose the option that works best for your learning journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Block Booking - Most Popular */}
        <div className="relative bg-white rounded-xl border-2 border-yellow-300 shadow-2xl p-8 flex flex-col text-center group hover:shadow-yellow-300/20 transition-all duration-300">
          {/* Popular Badge */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-300 text-black px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </div>

          <div className="mb-6 mt-4 flex justify-center">
            <Icon path={mdiAccountMultiple} size={2.5} className="text-gray-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Block Booked Lessons</h3>
          <div className="mb-6">
            <div className="text-5xl font-bold text-gray-900 mb-1">
              £35<span className="text-lg font-normal text-gray-600">/hr</span>
            </div>
            <div className="text-grey-600 font-semibold">£17.50 per 30 mins</div>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Best value for regular students. Book a series of lessons and save.
          </p>
          <ul className="text-left space-y-3 mb-8 flex-grow">
            <li className="flex items-center gap-3 text-gray-700">
              <Icon path={mdiCheckCircle} size={1} className="text-grey-600 flex-shrink-0" />
              Priority scheduling
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <Icon path={mdiCheckCircle} size={1} className="text-grey-600 flex-shrink-0" />
              Dedicated tutor
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <Icon path={mdiCheckCircle} size={1} className="text-grey-600 flex-shrink-0" />
              Flexible rescheduling
            </li>
          </ul>
          <button className="bg-yellow-300 hover:bg-yellow-300 text-black font-semibold px-8 py-3 rounded-lg transition-colors duration-200 w-full">
            Book Block Lessons
          </button>
        </div>

        {/* Single Lesson */}
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 flex flex-col text-center group hover:border-yellow-300-70 hover:bg-gray-800/50 transition-all duration-300">
          <div className="mb-6 flex justify-center">
            <Icon path={mdiCalendarCheck} size={2.5} className="text-yellow-300" />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Single Lesson</h3>
          <div className="mb-6">
            <div className="text-5xl font-bold text-white mb-1">
              £38<span className="text-lg font-normal text-gray-300">/hr</span>
            </div>
            <div className="text-yellow-300 font-semibold">£19 per 30 mins</div>
          </div>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Perfect for ad hoc or trial lessons. No commitment required.
          </p>
          <ul className="text-left space-y-3 mb-8 flex-grow">
            <li className="flex items-center gap-3 text-gray-200">
              <Icon path={mdiCheckCircle} size={1} className="text-yellow-300 flex-shrink-0" />
              Book anytime
            </li>
            <li className="flex items-center gap-3 text-gray-200">
              <Icon path={mdiCheckCircle} size={1} className="text-yellow-300 flex-shrink-0" />
              No contract
            </li>
            <li className="flex items-center gap-3 text-gray-200">
              <Icon path={mdiCheckCircle} size={1} className="text-yellow-300 flex-shrink-0" />
              Try before you commit
            </li>
          </ul>
          <button className="bg-gray-600 hover:bg-gray-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 w-full">
            Book Single Lesson
          </button>
        </div>

        {/* Custom Packages */}
        <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-8 flex flex-col text-center group hover:border-yellow-300-70 hover:bg-gray-800/50 transition-all duration-300">
          <div className="mb-6 flex justify-center">
            <Icon path={mdiStar} size={2.5} className="text-yellow-300" />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Custom Packages</h3>
          <div className="mb-6">
            <div className="text-2xl font-bold text-white mb-1">Custom Pricing</div>
            <div className="text-yellow-300 font-semibold">Contact for rates</div>
          </div>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Tailored lesson plans for families, groups, or advanced students. Get in touch for a
            quote.
          </p>
          <ul className="text-left space-y-3 mb-8 flex-grow">
            <li className="flex items-center gap-3 text-gray-200">
              <Icon path={mdiCheckCircle} size={1} className="text-yellow-300 flex-shrink-0" />
              Family & group rates
            </li>
            <li className="flex items-center gap-3 text-gray-200">
              <Icon path={mdiCheckCircle} size={1} className="text-yellow-300 flex-shrink-0" />
              Advanced coaching
            </li>
            <li className="flex items-center gap-3 text-gray-200">
              <Icon path={mdiCheckCircle} size={1} className="text-yellow-300 flex-shrink-0" />
              Personalised plans
            </li>
          </ul>
          <button className="bg-gray-600 hover:bg-gray-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 w-full">
            Enquire Now
          </button>
        </div>
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-400 text-sm">
          All lessons include professional tuition and personalized learning plans
        </p>
      </div>
    </section>
  );
}
