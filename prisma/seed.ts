import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { tours } from "../data/tours";
import "dotenv/config";

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
      },
      create: {
        id: tour.id,
        slug: tour.slug,
        title: tour.title,
        maxPhotographers: tour.maxPhotographers,
        availableSlots: tour.maxPhotographers,
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
