import { locationBySlug, locations } from "@/content/locations";
import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Oahu proposal location guide by Bloom & Say Yes";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

const PHOTO: Record<string, string> = {
  p05: "portfolio-05", p07: "portfolio-07", scarlettFounder: "portfolio-03",
};

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = locationBySlug(slug)!;
  return renderOg({ eyebrow: `${l.region} · Location guide`, title: l.question, photo: (l.image && PHOTO[l.image]) || "portfolio-01" });
}
