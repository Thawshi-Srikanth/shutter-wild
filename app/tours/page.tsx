import prisma from "@/lib/prisma";
import ToursListing from "./ToursListing";

export default async function ToursPage() {
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

  return <ToursListing availability={availability} />;
}
