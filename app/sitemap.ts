import { MetadataRoute } from "next";
import { tours as staticTours } from "@/data/tours";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://shutterwild.co.uk";

  // Fetch slugs from Postgres
  let dbTours: any[] = [];
  try {
    dbTours = (await prisma.tour.findMany({
      select: {
        slug: true,
      },
    })) as any[];
  } catch (err) {
    console.error("Sitemap query failed, falling back to static:", err);
  }

  const toursList = dbTours && dbTours.length > 0 ? dbTours : staticTours;

  // Static routes
  const routes = [
    "",
    "/about",
    "/contact",
    "/gallery",
    "/tours",
    "/faq",
    "/privacy-policy",
    "/terms-of-service",
    "/cookie-policy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic tour routes
  const tourRoutes = toursList.map((tour) => ({
    url: `${baseUrl}/tours/${tour.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...routes, ...tourRoutes];
}
