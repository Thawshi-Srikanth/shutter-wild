import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import TourForm from "../../TourForm";

export const revalidate = 0; // Dynamic server component

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditTourPage({ params }: Props) {
  const { id } = await params;

  // Query database for the active tour
  const tour = await prisma.tour.findUnique({
    where: { id },
  });

  if (!tour) {
    notFound();
  }

  // Safely cast database parameters to form model structure
  const serializedTour = {
    id: tour.id,
    slug: tour.slug,
    title: tour.title,
    maxPhotographers: tour.maxPhotographers,
    availableSlots: tour.availableSlots,
    date: tour.date,
    location: tour.location,
    price: tour.price,
    duration: tour.duration,
    overview: tour.overview,
    focusSpecies: tour.focusSpecies,
    itinerary: (tour.itinerary as any) || [],
    included: tour.included,
    notIncluded: tour.notIncluded,
    equipment: tour.equipment,
    image: tour.image,
    gallery: tour.gallery,
    nonRefundableDeposit: tour.nonRefundableDeposit,
  };

  return <TourForm initialData={serializedTour} />;
}
