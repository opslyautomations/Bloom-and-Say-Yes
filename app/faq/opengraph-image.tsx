import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Bloom & Say Yes proposal planning FAQ";

export default function Image() {
  return renderOg({ eyebrow: "Questions", title: "Oahu proposal planning, answered", photo: "portfolio-08" });
}
