import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
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

// Configure R2 Client
const r2Client = new S3Client({
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
  region: "auto",
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

async function uploadToR2(localPath: string): Promise<string | null> {
  // If the path is already a public web URL, return it directly
  if (localPath.startsWith("http://") || localPath.startsWith("https://")) {
    console.log(`- Skipping (already dynamic URL): ${localPath}`);
    return localPath;
  }

  // Resolve absolute path in public directory
  const relativeClean = localPath.replace(/^\/+/, "");
  const publicDir = path.join(process.cwd(), "public");
  const absolutePath = path.normalize(path.join(publicDir, relativeClean));

  // Path traversal check
  if (!absolutePath.startsWith(publicDir)) {
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
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME || "",
      Key: secureFileName,
      Body: fileBuffer,
      ContentType: mimeType,
    });

    await r2Client.send(command);

    // Format target public URL
    const publicUrlBase = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || "";
    const sanitizedUrlBase = publicUrlBase.startsWith("http")
      ? publicUrlBase.replace(/\/+$/, "")
      : `https://${publicUrlBase.replace(/\/+$/, "")}`;

    const finalUrl = `${sanitizedUrlBase}/${secureFileName}`;
    console.log(`  └─ Success: ${finalUrl}`);
    return finalUrl;
  } catch (error) {
    console.error(`❌ Failed to upload ${localPath} to R2:`, error);
    return null;
  }
}

async function main() {
  console.log("=========================================");
  console.log("🚀 Shutter-Wild: Cloudflare R2 Migrator  ");
  console.log("=========================================");

  // Check variables first
  if (!process.env.R2_ACCOUNT_ID || !process.env.R2_BUCKET_NAME) {
    console.error("❌ Cloudflare R2 credentials missing in .env.local!");
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
          itinerary: staticTour.itinerary as any,
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
      const uploadedUrl = await uploadToR2(tour.image);
      if (uploadedUrl) {
        updatedCover = uploadedUrl;
      }
    }

    // B. Migrate Gallery Images
    const updatedGallery: string[] = [];
    const galleryItems = (tour.gallery as string[]) || [];

    for (const imgPath of galleryItems) {
      if (imgPath && !imgPath.startsWith("http")) {
        const uploadedUrl = await uploadToR2(imgPath);
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
  console.log("🎉 Cloudflare R2 Media Migration Complete!");
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
