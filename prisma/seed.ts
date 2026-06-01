import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { tours } from "../data/tours";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Seeding tours...");
  for (const tour of tours) {
    await prisma.tour.upsert({
      where: { slug: tour.slug },
      update: {
        title: tour.title,
        maxPhotographers: tour.maxPhotographers,
        date: tour.date,
        location: tour.location,
        price: tour.price,
        duration: tour.duration,
        overview: tour.overview,
        focusSpecies: tour.focusSpecies,
        itinerary: tour.itinerary as any,
        included: tour.included,
        notIncluded: tour.notIncluded,
        equipment: tour.equipment,
        image: tour.image,
        gallery: tour.gallery || [],
        nonRefundableDeposit: tour.nonRefundableDeposit,
      },
      create: {
        id: tour.id,
        slug: tour.slug,
        title: tour.title,
        maxPhotographers: tour.maxPhotographers,
        availableSlots: tour.maxPhotographers,
        date: tour.date,
        location: tour.location,
        price: tour.price,
        duration: tour.duration,
        overview: tour.overview,
        focusSpecies: tour.focusSpecies,
        itinerary: tour.itinerary as any,
        included: tour.included,
        notIncluded: tour.notIncluded,
        equipment: tour.equipment,
        image: tour.image,
        gallery: tour.gallery || [],
        nonRefundableDeposit: tour.nonRefundableDeposit,
      },
    });
  }
  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

