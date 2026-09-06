import Actions from '@/components/Actions';
import DiagnosticSection from '@/components/DiagnosticSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import { Contact, CtaBand, Faq } from '@/components/Contact';
import { Positioning, Services, Store } from '@/components/Sections';

/**
 * Page order carries two arguments at once. Credibility: an established
 * shop, close to 15 years on the same trade in Curitiba. Clarity: it repairs
 * appliances, it does not sell them — the requirement the brand brief is most
 * insistent about. Positioning states both before the service list, and the
 * service list comes before the process.
 *
 *   hero          the screen — who we are, how long, what we fix
 *   positioning   the years, the rating, the address, and we do / we don't
 *   services      what we repair, as a bento grid
 *   diagnostic    the process, scrubbed through a signal being repaired
 *   store         how the work is done, by whom, and any press coverage
 *   faq           the objections that come up before contact
 *   contact       the channels and the location
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
        <Store />
        <Faq />
        <Contact />
        <CtaBand />
      </main>
      <Footer />
      <Actions />
    </>
  );
}
