import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep transactional / account pages out of search results.
      disallow: [
        "/login",
        "/checkout",
        "/onboarding",
        "/change-password",
        "/forgot-password",
      ],
    },
    sitemap: "https://salonix.io/sitemap.xml",
  };
}
