import Actions from '@/components/Actions';
import DiagnosticSection from '@/components/DiagnosticSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import { Contact, CtaBand, Faq } from '@/components/Contact';
import { Bench, Positioning, Services } from '@/components/Sections';

/**
 * Page order follows the one thing the brand brief is most insistent about:
 * a visitor must understand within seconds that this is a repair bench and
 * not a television shop. So positioning comes before the service list, and
 * the service list comes before the process.
 *
 *   hero          the screen — what we are, what we fix
 *   positioning   we do / we don't — settles the "are you a store?" question
 *   services      what enters the bench, as a bento grid
 *   diagnostic    the process, scrubbed through a signal being repaired
 *   bench         how the work is done, and by whom
 *   faq           the objections that come up before contact
 *   contact       the three channels and the location
 *   cta           one button, nothing competing with it
 */
export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Positioning />
        <Services />
        <DiagnosticSection />
        <Bench />
        <Faq />
        <Contact />
        <CtaBand />
      </main>
      <Footer />
      <Actions />
    </>
  );
}
