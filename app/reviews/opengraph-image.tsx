import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Reviews of Bloom & Say Yes";

export default function Image() {
  return renderOg({ eyebrow: "Love notes", title: "Every word, verbatim", photo: "portfolio-06" });
}
