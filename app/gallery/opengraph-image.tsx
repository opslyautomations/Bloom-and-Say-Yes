import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Bloom & Say Yes proposal portfolio";

export default function Image() {
  return renderOg({ eyebrow: "Portfolio", title: "Moments we've designed", photo: "portfolio-05" });
}
