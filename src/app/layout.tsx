import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans, Space_Grotesk } from 'next/font/google';
import { faqs, services, site } from '@/config/site.config';
import './globals.css';

/*
 * Three faces, each with a job and none loaded past the weights it uses.
 * `display: 'swap'` everywhere so text is never invisible while a font loads,
 * and 'latin-ext' alongside 'latin' because Portuguese accented capitals
 * (Ê, Ã, Ç, Õ) live in the extended range and this page sets a lot of
 * uppercase.
 */
const display = Space_Grotesk({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '700'],
  variable: '--font-display',
  display: 'swap',
});

const sans = IBM_Plex_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.seo.url),
  title: site.seo.title,
  description: site.seo.description,
  keywords: [
    'assistência técnica de TV',
    'conserto de TV LED',
    'conserto de TV LCD',
    'conserto de Smart TV',
    'conserto de micro-ondas',
    'conserto de forno elétrico',
    'conserto de air fryer',
    'conserto de lava-louças',
    'assistência técnica de eletrodomésticos',
    'reparo de placa eletrônica',
    'TV System',
  ],
  authors: [{ name: site.brandFull }],
  alternates: { canonical: site.seo.url },
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    url: site.seo.url,
    siteName: site.brandFull,
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.seo.title,
    description: site.seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport: Viewport = {
  themeColor: '#001F4F',
  // No maximumScale / userScalable: pinch zoom stays available.
  width: 'device-width',
  initialScale: 1,
};

/**
 * Structured data.
 *
 * Everything here is generated from site.config.ts, and the fields that are
 * still placeholders are omitted rather than published: telephone and
 * postal address only appear once `site.addressConfirmed` is true. Emitting
 * a fabricated address into schema.org markup would put wrong data into
 * Google's index, which is far harder to walk back than an empty field.
 *
 * There is no aggregateRating, no priceRange and no openingHours claim beyond
 * what the client confirms — none of it has been supplied.
 */
function buildJsonLd() {
  const business: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${site.seo.url}#business`,
    name: site.brandFull,
    alternateName: site.brandName,
    url: site.seo.url,
    description: site.seo.description,
    // Explicitly a repair service, never a retailer — the same distinction
    // the visible copy is built around.
    additionalType: 'https://www.wikidata.org/wiki/Q13405600',
    knowsAbout: services.map((service) => service.title),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de assistência técnica',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
        },
      })),
    },
  };

  if (site.addressConfirmed) {
    business.telephone = `+${site.phoneLink}`;
    business.address = {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: 'BR',
    };
    business.areaServed = { '@type': 'City', name: site.address.city };
    business.openingHoursSpecification = site.openingHoursSchema.map((slot) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    }));
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return [business, faqPage];
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-card focus:bg-navy focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-chalk"
        >
          Pular para o conteúdo
        </a>

        {/* Scroll reveals hide themselves until IntersectionObserver fires.
            With JavaScript off that never happens, so this un-hides them. */}
        <noscript>
          {/* eslint-disable-next-line react/no-danger */}
          <style
            dangerouslySetInnerHTML={{
              __html: '[data-reveal]{opacity:1!important;clip-path:none!important}',
            }}
          />
        </noscript>

        {children}

        <script
          type="application/ld+json"
          // Serialised from typed config above, never from user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
        />
      </body>
    </html>
  );
}
