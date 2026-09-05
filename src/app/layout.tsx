import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, Inter, Space_Grotesk } from 'next/font/google';
import { areaServedStates, services, site } from '@/config/site.config';
import './globals.css';

// display: 'swap' avoids invisible text while the font loads.
const sans = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

// Used for depth/technical readouts (the SPT chart, data labels) — a
// monospace face reads as instrumentation, reinforcing the field-data angle.
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.seo.url),
  title: site.seo.title,
  description: site.seo.description,
  keywords: [
    'sondagem spt curitiba',
    'sondagem geotecnica curitiba',
    'sondagem rotativa',
    'laudo geologico geotecnico',
    'ensaio de percolacao do solo',
  ],
  alternates: { canonical: '/' },
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
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0A0F1C',
  width: 'device-width',
  initialScale: 1,
  // No maximumScale: blocking zoom breaks accessibility.
};

/**
 * Schema.org business markup. This is what lets Google surface phone number
 * and service area directly in search results.
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: site.brandFull,
  description: site.seo.description,
  telephone: site.phone,
  url: site.seo.url,
  image: `${site.seo.url}/logo.png`,
  // Crew travels the whole South region plus São Paulo, not just the home
  // city — mirror site.areaServed here, not the office address below.
  areaServed: areaServedStates.map((name) => ({ '@type': 'State', name })),
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.city,
    addressRegion: site.state,
    addressCountry: 'BR',
  },
  ...(site.socialLinks.instagram ? { sameAs: [site.socialLinks.instagram] } : {}),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Serviços de sondagem e investigação geotécnica',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-bone focus:px-5 focus:py-3 focus:text-sm focus:text-ink"
        >
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
