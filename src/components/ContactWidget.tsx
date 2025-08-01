import { mdiPhone, mdiEmail } from '@mdi/js';
import Icon from '@mdi/react';

export default function ContactWidget() {
  return (
    <section className="max-w-lg mx-auto px-4 py-10 bg-grey rounded-2xl shadow-xl border border-gray-600/30 flex flex-col items-center text-center">
      <h2 className="text-3xl font-bold text-white mb-4 font-[Montserrat]">Contact Us</h2>
      <p className="text-gray-200 mb-8 text-lg">
        We&apos;re here to help! Reach out by phone or email and we&apos;ll get back to you as soon
        as possible.
      </p>
      <div className="flex flex-col gap-6 w-full">
        <a
          href="tel:07827335222"
          className="flex items-center justify-center gap-3 bg-yellow-300 text-black font-bold px-6 py-3 rounded-lg shadow hover:bg-yellow-400 transition text-lg"
          aria-label="Call Us"
        >
          <Icon path={mdiPhone} size={1.5} className="text-black" />
          Call Us
        </a>
        <a
          href="mailto:jim@tempomobile.co.uk"
          className="flex items-center justify-center gap-3 bg-gray-800 text-white font-bold px-6 py-3 rounded-lg shadow hover:bg-yellow-300 hover:text-black transition text-lg border border-gray-700 group"
        >
          <Icon
            path={mdiEmail}
            size={1.5}
            className="text-yellow-300 group-hover:text-black transition-colors duration-200"
          />
          Email Us
        </a>
      </div>
    </section>
  );
}
