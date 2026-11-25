import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Bloom & Say Yes — Oahu proposal planner and floral design";

export default function Image() {
  return renderOg({ eyebrow: "Oahu Proposal Planner", title: "Forever starts with a single moment.", photo: "hero-beach-proposal" });
}
