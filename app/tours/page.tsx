import prisma from "@/lib/prisma";
import ToursListing from "./ToursListing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wildlife Photography Expeditions",
  description:
    "Browse our upcoming wildlife photography expeditions. From Arctic raptors to tropical leopards, join us for professional field-based guidance.",
};

export const revalidate = 60; // Revalidate every 60 seconds for manual DB updates

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
