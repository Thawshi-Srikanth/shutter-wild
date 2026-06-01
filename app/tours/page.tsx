import prisma from "@/lib/prisma";
import ToursListing from "./ToursListing";
import { tours as staticTours } from "@/data/tours";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wildlife Photography Expeditions",
  description:
    "Browse our upcoming wildlife photography expeditions. From Arctic raptors to tropical leopards, join us for professional field-based guidance.",
};

export const revalidate = 60; // Revalidate every 60 seconds for manual DB updates

export default async function ToursPage() {
  let dbTours: any[] = [];
  try {
    dbTours = await prisma.tour.findMany();
  } catch (err) {
    console.error("Database query failed, falling back to static files:", err);
  }

  // Serialize DB records, falling back to static file data if database is empty/not seeded yet
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

  return <ToursListing initialTours={toursList} availability={availability} />;
}
