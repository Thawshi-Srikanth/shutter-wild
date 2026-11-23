"use server";

import prisma from "@/lib/prisma";
import { getSession, createSession, deleteSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { redirect } from "next/navigation";

// Zod Schema to validate tour input
const TourInputSchema = z.object({
  id: z.string().min(1, "ID is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric and hyphens only"),
  title: z.string().min(1, "Title is required"),
  maxPhotographers: z.number().int().min(1, "Group size must be at least 1"),
  availableSlots: z.number().int().min(0, "Available slots cannot be negative"),
  date: z.string().min(1, "Date string is required"),
  location: z.string().min(1, "Location is required"),
  price: z.string().min(1, "Price is required"),
  duration: z.string().min(1, "Duration is required"),
  overview: z.string().min(10, "Overview must be at least 10 characters"),
  focusSpecies: z.array(z.string()).min(1, "At least one focus species is required"),
  itinerary: z.array(z.object({
    day: z.string().min(1, "Day is required"),
    title: z.string().min(1, "Itinerary title is required"),
    description: z.string().min(1, "Itinerary description is required")
  })).min(1, "At least one itinerary day is required"),
  included: z.array(z.string()),
  notIncluded: z.array(z.string()),
  equipment: z.array(z.string()),
  image: z.string().min(1, "Cover image path is required"),
  gallery: z.array(z.string()),
  nonRefundableDeposit: z.number().int().min(0, "Deposit cannot be negative"),
});

export type TourInput = z.infer<typeof TourInputSchema>;

// Admin Authentication Action
export async function loginAdmin(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (!adminPassword) {
    console.error("ADMIN_PASSWORD is not set in environment variables");
    return { success: false, error: "Authentication configuration error." };
  }

  if (password === adminPassword) {
    await createSession();
    return { success: true };
  }

  return { success: false, error: "Invalid admin password." };
}

// Admin Logout Action
export async function logoutAdmin() {
  await deleteSession();
  redirect("/admin/login");
}

// Upsert Tour Action
export async function upsertTour(data: TourInput) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Unauthorized access." };
  }

  try {
    // Validate inputs
    const validated = TourInputSchema.parse(data);

    // Save to Postgres via Prisma
    await prisma.tour.upsert({
      where: { id: validated.id },
      update: {
        slug: validated.slug,
        title: validated.title,
        maxPhotographers: validated.maxPhotographers,
        availableSlots: validated.availableSlots,
        date: validated.date,
        location: validated.location,
        price: validated.price,
        duration: validated.duration,
        overview: validated.overview,
        focusSpecies: validated.focusSpecies,
        itinerary: validated.itinerary as any,
        included: validated.included,
        notIncluded: validated.notIncluded,
        equipment: validated.equipment,
        image: validated.image,
        gallery: validated.gallery,
        nonRefundableDeposit: validated.nonRefundableDeposit,
      },
      create: {
        id: validated.id,
        slug: validated.slug,
        title: validated.title,
        maxPhotographers: validated.maxPhotographers,
        availableSlots: validated.availableSlots,
        date: validated.date,
        location: validated.location,
        price: validated.price,
        duration: validated.duration,
        overview: validated.overview,
        focusSpecies: validated.focusSpecies,
        itinerary: validated.itinerary as any,
        included: validated.included,
        notIncluded: validated.notIncluded,
        equipment: validated.equipment,
        image: validated.image,
        gallery: validated.gallery,
        nonRefundableDeposit: validated.nonRefundableDeposit,
      },
    });

    // Revalidate relevant client routes instantly
    revalidatePath("/");
    revalidatePath("/tours");
    revalidatePath(`/tours/${validated.slug}`);
    revalidatePath("/gallery");
    revalidatePath("/sitemap");

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || "Validation failed." };
    }
    console.error("Failed to upsert tour:", error);
    return { success: false, error: "Failed to save tour details in database." };
  }
}

// Delete Tour Action
export async function deleteTour(id: string) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Unauthorized access." };
  }

  try {
    // Prevent deleting a tour if it has bookings (relational integrity)
    const bookingsCount = await prisma.booking.count({
      where: { tourId: id },
    });

    if (bookingsCount > 0) {
      return {
        success: false,
        error: `Cannot delete expedition. There are ${bookingsCount} active bookings recorded for it.`,
      };
    }

    const deleted = await prisma.tour.delete({
      where: { id },
    });

    // Revalidate client cache
    revalidatePath("/");
    revalidatePath("/tours");
    revalidatePath(`/tours/${deleted.slug}`);
    revalidatePath("/gallery");
    revalidatePath("/sitemap");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete tour:", error);
    return { success: false, error: "Failed to remove the tour from the database." };
  }
}
