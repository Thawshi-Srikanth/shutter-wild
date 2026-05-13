import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Introduction from "@/components/Introduction";
import Gallery from "@/components/Gallery";
import Awards from "@/components/Awards";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import InstagramGrid from "@/components/InstagramGrid";
import prisma from "@/lib/prisma";

export const revalidate = 60; // Revalidate every 60 seconds for manual DB updates

export default async function Home() {
  // Fetch real-time availability for all tours
  const dbTours = await prisma.tour.findMany({
    select: {
      slug: true,
      availableSlots: true,
    },
  });

  // Create a mapping of slug to available slots
  const availability: Record<string, number> = {};
  dbTours.forEach((t) => {
    availability[t.slug] = t.availableSlots;
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Shutter Wild Expeditions",
    url: "https://shutter-wild.com",
    logo: "https://shutter-wild.com/apple-touch-icon.png",
    sameAs: [
      "https://www.facebook.com/thinesht",
      "https://www.instagram.com/thineshtphotography",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+44-7557-763222",
      contactType: "customer service",
    },
  };

  return (
    <main className="min-h-screen bg-[#F4F4F0] selection:bg-[#2C3E2E] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <Hero />
      <div id="tours">
        <Projects availability={availability} />
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
