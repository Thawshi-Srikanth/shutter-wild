import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import Gallery from '@/components/Gallery';
import Awards from '@/components/Awards';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F4F4F0] selection:bg-[#2C3E2E] selection:text-white">
      <Navbar />
      <Hero />
      <div id="projects">
        <Projects />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="services">
        <Services />
      </div>
      <Testimonials />
      <Pricing />
      <Gallery />
      <Awards />
      <FAQ />
      <div id="contact">
        <Footer />
      </div>
    </main>
  );
}
