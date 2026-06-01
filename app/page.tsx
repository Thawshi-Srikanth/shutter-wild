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
import { tours as staticTours } from "@/data/tours";

export const revalidate = 60; // Revalidate every 60 seconds for manual DB updates

export default async function Home() {
  let dbTours: any[] = [];
  try {
    dbTours = await prisma.tour.findMany();
  } catch (err) {
    console.error("Database query failed, falling back to static files:", err);
  }

  // Fallback to static files if Postgres has not seeded yet
  const toursList = dbTours && dbTours.length > 0
    ? dbTours.map((t) => ({
        id: t.id,
        slug: t.slug,
        title: t.title,
        maxPhotographers: t.maxPhotographers,
        availableSlots: t.availableSlots,
        date: t.date,
        location: t.location,
        price: t.price,
        duration: t.duration,
        overview: t.overview,
        focusSpecies: t.focusSpecies,
        itinerary: (t.itinerary as any) || [],
        included: t.included,
        notIncluded: t.notIncluded,
        equipment: t.equipment,
        image: t.image,
        gallery: t.gallery,
        nonRefundableDeposit: t.nonRefundableDeposit,
      }))
    : staticTours;

  // Create a mapping of slug to available slots
  const availability: Record<string, number> = {};
  toursList.forEach((t) => {
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
        <Projects toursList={toursList} availability={availability} />
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
