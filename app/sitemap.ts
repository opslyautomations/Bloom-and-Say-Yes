import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { routes } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${site.lastUpdated}T00:00:00Z`);
  return routes.map((r) => ({
    url: `${site.url}${r.path === "/" ? "" : r.path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
