import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Scarlett, founder of Bloom & Say Yes";

export default function Image() {
  return renderOg({ eyebrow: "Meet the founder", title: "Meet Scarlett, Oahu proposal planner", photo: "about-scarlett" });
}
