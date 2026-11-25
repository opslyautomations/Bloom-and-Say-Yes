import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Intimate elopement planning on Oahu by Bloom & Say Yes";

export default function Image() {
  return renderOg({ eyebrow: "Intimate elopements", title: "Intimate Elopements on Oahu", photo: "portfolio-04" });
}
