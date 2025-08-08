import { Metadata } from 'next';

export const homePageMetadata: Metadata = {
  title: 'Music Lessons Bristol | Expert Guitar, Piano & Singing Tuition | Tempo Tuition',
  description:
    'Professional music lessons in Bristol for all ages and abilities. Expert guitar, piano, singing, and instrument tuition with qualified teachers. Book your lesson today!',
  keywords:
    'music lessons bristol, guitar lessons bristol, piano lessons bristol, singing lessons bristol, music tuition bristol, instrument lessons bristol',
  openGraph: {
    title: 'Music Lessons Bristol | Tempo Tuition',
    description:
      'Professional music lessons in Bristol for all ages and abilities. Expert guitar, piano, singing, and instrument tuition with qualified teachers.',
    url: 'https://tempotuition.co.uk',
    siteName: 'Tempo Tuition',
    images: [
      {
        url: '/child-guitar-trimmed.mp4',
        width: 1200,
        height: 630,
        alt: 'Music lessons Bristol - Guitar, Piano, Singing',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Music Lessons Bristol | Tempo Tuition',
    description:
      'Professional music lessons in Bristol for all ages and abilities. Expert guitar, piano, singing, and instrument tuition.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://tempotuition.co.uk',
  },
};

// Template function for instrument pages
export const createInstrumentMetadata = (instrument: string): Metadata => {
  const instrumentCapitalized = instrument.charAt(0).toUpperCase() + instrument.slice(1);

  return {
    title: `${instrumentCapitalized} Lessons Bristol | Expert ${instrumentCapitalized} Tuition | Tempo Tuition`,
    description: `Professional ${instrument} lessons in Bristol for all ages and abilities. Expert ${instrument} tuition with qualified teachers. Book your ${instrument} lesson today!`,
    keywords: `${instrument} lessons bristol, ${instrument} tuition bristol, ${instrument} teacher bristol, learn ${instrument} bristol, ${instrument} classes bristol`,
    openGraph: {
      title: `${instrumentCapitalized} Lessons Bristol | Tempo Tuition`,
      description: `Professional ${instrument} lessons in Bristol for all ages and abilities. Expert ${instrument} tuition with qualified teachers.`,
      url: `https://tempotuition.co.uk/instruments/${instrument}`,
      siteName: 'Tempo Tuition',
      images: [
        {
          url: '/child-guitar-trimmed.mp4',
          width: 1200,
          height: 630,
          alt: `${instrumentCapitalized} lessons Bristol - Professional tuition`,
        },
      ],
      locale: 'en_GB',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${instrumentCapitalized} Lessons Bristol | Tempo Tuition`,
      description: `Professional ${instrument} lessons in Bristol for all ages and abilities. Expert ${instrument} tuition with qualified teachers.`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `https://tempotuition.co.uk/instruments/${instrument}`,
    },
  };
};

export const bookMetadata: Metadata = {
  title: 'Book Music Lessons Bristol | Online Booking | Tempo Tuition',
  description:
    'Book your music lessons in Bristol online. Easy booking for guitar, piano, singing, and instrument lessons with expert teachers at Tempo Tuition.',
  keywords:
    'book music lessons bristol, online booking music tuition, schedule music lessons bristol, book guitar lessons, book piano lessons',
  openGraph: {
    title: 'Book Music Lessons Bristol | Tempo Tuition',
    description:
      'Book your music lessons in Bristol online. Easy booking for guitar, piano, singing, and instrument lessons with expert teachers.',
    url: 'https://tempotuition.co.uk/book',
    siteName: 'Tempo Tuition',
    locale: 'en_GB',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://tempotuition.co.uk/book',
  },
};

export const blogMetadata: Metadata = {
  title: 'Music Blog | Tips, Guides & News | Tempo Tuition Bristol',
  description:
    'Read our music blog for guitar, piano, and singing tips, practice guides, and news about music education in Bristol. Expert advice from professional teachers.',
  keywords:
    'music blog bristol, guitar tips, piano practice, singing techniques, music education blog, music lessons advice',
  openGraph: {
    title: 'Music Blog | Tempo Tuition Bristol',
    description:
      'Read our music blog for guitar, piano, and singing tips, practice guides, and news about music education in Bristol.',
    url: 'https://tempotuition.co.uk/blog',
    siteName: 'Tempo Tuition',
    locale: 'en_GB',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://tempotuition.co.uk/blog',
  },
};

export const jobsMetadata: Metadata = {
  title: 'Music Teaching Jobs Bristol | Join Our Team | Tempo Tuition',
  description:
    'Join our team of professional music teachers in Bristol. Teaching opportunities for guitar, piano, singing, and other instrument instructors. Apply today!',
  keywords:
    'music teacher jobs bristol, guitar teacher jobs, piano teacher jobs, singing teacher jobs, music tuition careers bristol',
  openGraph: {
    title: 'Music Teaching Jobs Bristol | Tempo Tuition',
    description:
      'Join our team of professional music teachers in Bristol. Teaching opportunities for guitar, piano, singing, and other instrument instructors.',
    url: 'https://tempotuition.co.uk/jobs',
    siteName: 'Tempo Tuition',
    locale: 'en_GB',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://tempotuition.co.uk/jobs',
  },
};

export const privacyMetadata: Metadata = {
  title: 'Privacy Policy & Terms of Service | Tempo Tuition Bristol',
  description:
    'Our privacy policy and terms of service. Learn how we protect your data and comply with GDPR for music lessons in Bristol.',
  keywords: 'privacy policy, terms of service, gdpr, data protection, tempo tuition bristol',
  openGraph: {
    title: 'Privacy Policy & Terms | Tempo Tuition',
    description:
      'Our privacy policy and terms of service. Learn how we protect your data and comply with GDPR.',
    url: 'https://tempotuition.co.uk/privacy',
    siteName: 'Tempo Tuition',
    locale: 'en_GB',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://tempotuition.co.uk/privacy',
  },
};
