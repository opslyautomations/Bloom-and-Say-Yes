import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Contact Bloom & Say Yes";

export default function Image() {
  return renderOg({ eyebrow: "Begin planning", title: "Let's make it beautiful.", photo: "about-florals" });
}
