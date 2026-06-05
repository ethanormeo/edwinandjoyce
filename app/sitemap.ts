import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://edwinandjoyce.com";
  return [
    { url: base, lastModified: new Date("2026-06-04"), changeFrequency: "monthly", priority: 1 },
  ];
}
