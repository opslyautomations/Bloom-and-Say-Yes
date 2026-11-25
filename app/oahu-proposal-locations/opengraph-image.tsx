import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Oahu proposal location guide by Bloom & Say Yes";

export default function Image() {
  return renderOg({ eyebrow: "Oahu location guide", title: "Where to say yes on Oahu", photo: "portfolio-07" });
}
