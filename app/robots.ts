import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/booking/success/", "/booking/cancel/"],
    },
    sitemap: "https://shutterwild.co.uk/sitemap.xml",
  };
}
