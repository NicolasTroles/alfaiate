import { MobileContactBar } from '@/components/Actions';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About, Gallery, Process, Services } from '@/components/Sections';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Process />
        <Contact />
      </main>
      <Footer />
      {/* Reserved space so the fixed mobile bar never covers the footer. */}
      <div className="h-20 md:hidden" aria-hidden="true" />
      <MobileContactBar />
    </>
  );
}
