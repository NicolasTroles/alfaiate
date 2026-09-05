import dynamic from 'next/dynamic';
import { MobileContactBar } from '@/components/Actions';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { FAQ, Services } from '@/components/Sections';

// WebGL/three.js — client-only, code-split so its ~150KB never blocks the
// initial page render; it loads in the background while the hero is already
// interactive.
const CircuitSection = dynamic(
  () => import('@/components/CircuitSection').then((mod) => mod.CircuitSection),
  { ssr: false },
);

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CircuitSection />
        <Services />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      {/* Reserved space so the fixed mobile bar never covers the footer. */}
      <div className="h-20 md:hidden" aria-hidden="true" />
      <MobileContactBar />
    </>
  );
}
