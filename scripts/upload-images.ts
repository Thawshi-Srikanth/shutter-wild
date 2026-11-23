import { Prisma, PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { put } from "@vercel/blob";
import { tours as staticTours } from "../data/tours";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import dotenv from "dotenv";

// Load configuration
dotenv.config({ path: ".env.local" });

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

const getMimeType = (filePath: string): string => {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
  };
  return mimeTypes[ext] || "application/octet-stream";
};

async function uploadToBlob(localPath: string): Promise<string | null> {
  // If the path is already a public web URL, return it directly
  if (localPath.startsWith("http://") || localPath.startsWith("https://")) {
    console.log(`- Skipping (already dynamic URL): ${localPath}`);
    return localPath;
  }

  // Resolve absolute path in public directory
  const relativeClean = path.normalize(localPath).replace(/^(\.\.[/\\])+/, "").replace(/^[/\\]+/, "");
  const publicDir = path.resolve(process.cwd(), "public");
  const absolutePath = path.resolve(publicDir, relativeClean);

  // Path traversal check
  if (!absolutePath.startsWith(publicDir + path.sep)) {
    console.warn(`⚠️ Path traversal attempt detected or invalid path: ${localPath}`);
    return null;
  }

  if (!fs.existsSync(absolutePath)) {
    console.warn(`⚠️ File not found locally: ${absolutePath}`);
    return null;
  }

  const fileBuffer = fs.readFileSync(absolutePath);
  const mimeType = getMimeType(absolutePath);
  const fileExtension = path.extname(absolutePath) || ".webp";
  const secureFileName = `${crypto.randomUUID()}${fileExtension}`;

  console.log(`- Uploading ${localPath} -> Key: ${secureFileName} (${mimeType})`);

  try {
    const blob = await put(secureFileName, fileBuffer, {
      access: "public",
      contentType: mimeType,
    });

    console.log(`  └─ Success: ${blob.url}`);
    return blob.url;
  } catch (error) {
    console.error(`❌ Failed to upload ${localPath} to Vercel Blob:`, error);
    return null;
  }
}

async function main() {
  console.log("=========================================");
  console.log("🚀 Shutter-Wild: Vercel Blob Migrator    ");
  console.log("=========================================");

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("❌ BLOB_READ_WRITE_TOKEN missing in .env.local!");
    process.exit(1);
  }

  // 1. Fetch tours currently in database
  let dbTours = await prisma.tour.findMany();

  if (dbTours.length === 0) {
    console.log("⚠️ Database is empty. Seeding local tours first...");
    for (const staticTour of staticTours) {
      await prisma.tour.create({
        data: {
          id: staticTour.id,
          slug: staticTour.slug,
          title: staticTour.title,
          maxPhotographers: staticTour.maxPhotographers,
          availableSlots: staticTour.maxPhotographers,
          date: staticTour.date,
          location: staticTour.location,
          price: staticTour.price,
          duration: staticTour.duration,
          overview: staticTour.overview,
          focusSpecies: staticTour.focusSpecies,
          itinerary: staticTour.itinerary as unknown as Prisma.InputJsonValue,
          included: staticTour.included,
          notIncluded: staticTour.notIncluded,
          equipment: staticTour.equipment,
          image: staticTour.image,
          gallery: staticTour.gallery || [],
          nonRefundableDeposit: staticTour.nonRefundableDeposit,
        },
      });
    }
    dbTours = await prisma.tour.findMany();
    console.log(`✅ Seeded ${dbTours.length} expeditions successfully.`);
  }

  console.log(`\nFound ${dbTours.length} expeditions in database. Beginning media migration...\n`);

  for (const tour of dbTours) {
    console.log(`\nExpedition: "${tour.title}"`);
    console.log(`-----------------------------------------`);

    // A. Migrate Cover Image
    let updatedCover = tour.image;
    if (tour.image && !tour.image.startsWith("http")) {
      const uploadedUrl = await uploadToBlob(tour.image);
      if (uploadedUrl) {
        updatedCover = uploadedUrl;
      }
    }

    // B. Migrate Gallery Images
    const updatedGallery: string[] = [];
    const galleryItems = (tour.gallery as string[]) || [];

    for (const imgPath of galleryItems) {
      if (imgPath && !imgPath.startsWith("http")) {
        const uploadedUrl = await uploadToBlob(imgPath);
        if (uploadedUrl) {
          updatedGallery.push(uploadedUrl);
        } else {
          // Keep local fallback if upload failed
          updatedGallery.push(imgPath);
        }
      } else if (imgPath) {
        updatedGallery.push(imgPath);
      }
    }

    // C. Update Database record
    await prisma.tour.update({
      where: { id: tour.id },
      data: {
        image: updatedCover,
        gallery: updatedGallery,
      },
    });

    console.log(`✅ Expedition "${tour.title}" successfully updated in DB.`);
  }

  console.log("\n=========================================");
  console.log("🎉 Vercel Blob Media Migration Complete! ");
  console.log("=========================================");
}

main()
  .catch((e) => {
    console.error("Fatal Migration Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
