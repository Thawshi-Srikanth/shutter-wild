import prisma from "@/lib/prisma";
import ToursManager from "./ToursManager";

export const revalidate = 0; // Dynamic server component

export default async function AdminToursListPage() {
  // Query all tours from live database
  const tours = await prisma.tour.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  // Map Decimal or JSON fields safely to serializable properties for Client
  const serializedTours = tours.map((t) => ({
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
  }));

  return <ToursManager initialTours={serializedTours} />;
}
