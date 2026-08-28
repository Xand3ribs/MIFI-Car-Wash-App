import { useRef } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

import Services from '../components/home/Services';
import HowItWorks from '../components/home/HowItWorks';
import ContactUs from '../components/home/ContactUs';

function Home() {
  const servicesRef = useRef(null);
  const howItWorksRef = useRef(null);
  const contactUsRef = useRef(null);

  const sectionRefs = {
    'services': servicesRef,
    'how-it-works': howItWorksRef,
    'contact-us': contactUsRef,
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#0D1B2A] overflow-x-hidden">
      <Header sectionRefs={sectionRefs} />

      <main>
        <Hero />

        <section id="services" ref={servicesRef}>
          <Services />
        </section>

        <section id="how-it-works" ref={howItWorksRef}>
          <HowItWorks />
        </section>

        <section id="contact-us" ref={contactUsRef}>
          <ContactUs />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
