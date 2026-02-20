import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Introduction from "@/components/Introduction";
import Gallery from "@/components/Gallery";
import Awards from "@/components/Awards";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import InstagramGrid from "@/components/InstagramGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F4F4F0] selection:bg-[#2C3E2E] selection:text-white">
      <Navbar />
      <Hero />
      <div id="tours">
        <Projects />
      </div>
      <Introduction />
      <Gallery />
      <InstagramGrid />
      <Awards />
      <FAQ />
      <div id="contact">
        <Footer />
      </div>
    </main>
  );
}
