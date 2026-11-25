import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Surprise proposal planning in Honolulu and Oahu by Bloom & Say Yes";

export default function Image() {
  return renderOg({ eyebrow: "Surprise proposals · Oahu", title: "Surprise Proposal Planning in Honolulu & Oahu", photo: "portfolio-01" });
}
