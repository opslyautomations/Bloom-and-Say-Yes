import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Gender reveal planning in Honolulu by Bloom & Say Yes";

export default function Image() {
  return renderOg({ eyebrow: "Private gender reveals", title: "Gender Reveal Planning in Honolulu", photo: "portfolio-03" });
}
