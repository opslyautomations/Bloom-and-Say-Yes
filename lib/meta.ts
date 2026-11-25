import type { Metadata } from "next";
import { site } from "@/content/site";

/**
 * Per-page metadata: unique title (≤60) & description (≤155), canonical,
 * Open Graph and Twitter. The og:image comes from each route's
 * opengraph-image.tsx (file convention), which Next merges in automatically.
 */
export function pageMeta({
  title, description, path, type = "website",
}: { title: string; description: string; path: string; type?: "website" | "article" }): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type,
      siteName: site.name,
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
