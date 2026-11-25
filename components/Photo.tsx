import Image from "next/image";
import { altFor, type SiteImage } from "@/lib/images";

type Props = {
  img: SiteImage;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Fill the parent (parent must be positioned with a set aspect ratio). */
  fill?: boolean;
  quality?: number;
};

/** next/image wrapper that reads alt, dimensions, and focal point from the manifest. */
export function Photo({ img, sizes, priority, className, fill = true, quality = 72 }: Props) {
  const alt = altFor(img);
  const common = {
    src: img.src,
    sizes,
    priority,
    quality,
    className,
    style: { objectPosition: img.focalPoint, objectFit: "cover" as const },
  };
  if (fill) return <Image {...common} alt={alt} fill />;
  return <Image {...common} alt={alt} width={img.width} height={img.height} style={{ ...common.style, width: "100%", height: "auto" }} />;
}
