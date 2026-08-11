import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/centers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const slugs = await getAllSlugs();
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "hourly", priority: 1 },
    { url: `${base}/metodologia`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    { url: `${base}/registrar`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    ...slugs.map((slug) => ({
      url: `${base}/centros/${slug}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
  ];
}
