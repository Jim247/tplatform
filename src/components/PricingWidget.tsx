import Icon from '@mdi/react';
import { mdiAccountMultiple, mdiCalendarCheck, mdiStar, mdiCheckCircle } from '@mdi/js';

export default function PricingWidget() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white font-[Montserrat]">
        Lesson Pricing
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Block Booking - Most Popular */}
        <div className="bg-grey rounded-2xl border-4 border-yellow-300 -2xl p-8 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105">
          <div className="mb-4">
            <Icon path={mdiAccountMultiple} size={2.5} className="text-yellow-300" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">
            Block Booked Lessons
          </h3>
          <div className="text-4xl font-extrabold text-yellow-300 mb-2">
            £33<span className="text-lg font-normal text-gray-200">/hr</span>
          </div>
          <div className="text-base font-semibold text-yellow-200 mb-2">£17.50 per 30 mins</div>
          <p className="text-gray-200 mb-4">
            Best value for regular students. Book a series of lessons and save.
          </p>
          <ul className="text-left space-y-2 mb-6">
            <li className="flex items-center gap-2 text-gray-100">
              <Icon path={mdiCheckCircle} size={1} className="text-yellow-300" /> Priority
              scheduling
            </li>
            <li className="flex items-center gap-2 text-gray-100">
              <Icon path={mdiCheckCircle} size={1} className="text-yellow-300" /> Dedicated tutor
            </li>
            <li className="flex items-center gap-2 text-gray-100">
              <Icon path={mdiCheckCircle} size={1} className="text-yellow-300" /> Flexible
              rescheduling
            </li>
          </ul>
          <button className="bg-yellow-300 text-black font-bold px-6 py-2 rounded-lg  hover:bg-yellow-400 transition">
            Book Block Lessons
          </button>
        </div>
        {/* Single Lesson */}
        <div className="bg-grey rounded-2xl border border-gray-600/30  p-8 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105">
          <div className="mb-4">
            <Icon path={mdiCalendarCheck} size={2.5} className="text-yellow-300" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">
            Single Lesson
          </h3>
          <div className="text-4xl font-extrabold text-yellow-300 mb-2">
            £35<span className="text-lg font-normal text-gray-200">/hr</span>
          </div>
          <div className="text-base font-semibold text-yellow-200 mb-2">£19 per 30 mins</div>
          <p className="text-gray-200 mb-4">
            Perfect for ad hoc or trial lessons. No commitment required.
          </p>
          <ul className="text-left space-y-2 mb-6">
            <li className="flex items-center gap-2 text-gray-100">
              <Icon path={mdiCheckCircle} size={1} className="text-yellow-300" /> Book anytime
            </li>
            <li className="flex items-center gap-2 text-gray-100">
              <Icon path={mdiCheckCircle} size={1} className="text-yellow-300" /> No contract
            </li>
            <li className="flex items-center gap-2 text-gray-100">
              <Icon path={mdiCheckCircle} size={1} className="text-yellow-300" /> Try before you
              commit
            </li>
          </ul>
          <button className="bg-yellow-300 text-black font-bold px-6 py-2 rounded-lg  hover:bg-yellow-400 transition">
            Book Single Lesson
          </button>
        </div>
        {/* Custom Packages - Less Emphasis */}
        <div className="bg-grey rounded-2xl border border-gray-600/30  p-8 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105">
          <div className="mb-4">
            <Icon path={mdiStar} size={2.5} className="text-yellow-300" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">
            Custom Packages
          </h3>
          <div className="text-4xl font-extrabold text-yellow-300 mb-2"></div>
          <div className="text-base font-semibold text-yellow-200 mb-2">
            Contact for 30 min rates
          </div>
          <p className="text-gray-200 mb-4">
            Tailored lesson plans for families, groups, or advanced students. Get in touch for a
            quote.
          </p>
          <ul className="text-left space-y-2 mb-6">
            <li className="flex items-center gap-2 text-gray-100">
              <Icon path={mdiCheckCircle} size={1} className="text-yellow-300" /> Family & group
              rates
            </li>
            <li className="flex items-center gap-2 text-gray-100">
              <Icon path={mdiCheckCircle} size={1} className="text-yellow-300" /> Advanced coaching
            </li>
            <li className="flex items-center gap-2 text-gray-100">
              <Icon path={mdiCheckCircle} size={1} className="text-yellow-300" /> Personalised plans
            </li>
          </ul>
          <button className="bg-yellow-300 text-black font-bold px-6 py-2 rounded-lg  hover:bg-yellow-400 transition">
            Enquire Now
          </button>
        </div>
      </div>
    </section>
  );
}
