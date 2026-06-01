import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategorizedGallery from "@/components/CategorizedGallery";
import { tours as staticTours } from "@/data/tours";
import { Metadata } from "next";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Gallery | Shutter Wild",
  description:
    "A collection of wildlife photography from our global expeditions.",
};

export default async function GalleryPage() {
  let dbTours: any[] = [];
  try {
    dbTours = (await prisma.tour.findMany()) as any[];
  } catch (err) {
    console.error("Gallery query failed, falling back to static:", err);
  }

  const toursList = dbTours && dbTours.length > 0 ? dbTours : staticTours;

  // Extract images and group them by tour
  const categorizedData = toursList
    .filter((t) => (t.gallery && t.gallery.length > 0) || t.image)
    .map((t) => {
      const tourImages = [];
      if (t.image) tourImages.push(t.image);
      if (t.gallery) tourImages.push(...t.gallery);

      // Remove duplicates within a single tour just in case
      return {
        id: t.slug,
        title: t.title,
        images: Array.from(new Set(tourImages)),
      };
    })
    .filter((category) => category.images.length > 0);

  return (
    <div className="min-h-screen bg-[#F4F4F0] text-[#1A1A1A]">
      <Navbar />

      <main className="pt-40 pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full">
        <div className="mb-16">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium mb-6">
            The Gallery
          </h1>
          <p className="text-gray-600 max-w-2xl text-lg leading-relaxed">
            Moments captured from the field. Our expeditions are designed to
            position photographers in the right place, at the right time, with
            the right light.
          </p>
        </div>

        {categorizedData.length > 0 ? (
          <CategorizedGallery toursData={categorizedData} />
        ) : (
          <p className="text-gray-500 italic">No images currently available.</p>
        )}
      </main>

      <Footer />
    </div>
  );
}
