import { MetadataRoute } from "next";
import { tours } from "@/data/tours";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://shutterwild.co.uk";

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
  const tourRoutes = tours.map((tour) => ({
    url: `${baseUrl}/tours/${tour.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...routes, ...tourRoutes];
}
