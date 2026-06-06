import type { MetadataRoute } from "next";

const BASE = "https://salonix.io";

const BLOG_SLUGS = [
  "how-to-reduce-no-shows",
  "multi-branch-salon-management",
  "payroll-automation-guide",
  "salon-inventory-best-practices",
  "customer-loyalty-programs",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE, changeFrequency: "weekly" as const, priority: 1.0, lastModified: new Date() },
    { url: `${BASE}/pricing`, changeFrequency: "weekly" as const, priority: 0.9, lastModified: new Date() },
    { url: `${BASE}/our-system`, changeFrequency: "monthly" as const, priority: 0.8, lastModified: new Date() },
    { url: `${BASE}/about`, changeFrequency: "monthly" as const, priority: 0.7, lastModified: new Date() },
    { url: `${BASE}/blog`, changeFrequency: "daily" as const, priority: 0.8, lastModified: new Date() },
    { url: `${BASE}/request-demo`, changeFrequency: "monthly" as const, priority: 0.8, lastModified: new Date() },
    { url: `${BASE}/privacy`, changeFrequency: "yearly" as const, priority: 0.3, lastModified: new Date() },
    { url: `${BASE}/terms`, changeFrequency: "yearly" as const, priority: 0.3, lastModified: new Date() },
    { url: `${BASE}/refund`, changeFrequency: "yearly" as const, priority: 0.3, lastModified: new Date() },
  ];

  const blogPages = BLOG_SLUGS.map(slug => ({
    url: `${BASE}/blog/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    lastModified: new Date(),
  }));

  return [...staticPages, ...blogPages];
}
