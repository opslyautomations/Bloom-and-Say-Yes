import type { CSSProperties } from "react";
import type { SiteImage } from "@/lib/images";
import { Photo } from "./Photo";

type Props = {
  img: SiteImage;
  sizes: string;
  priority?: boolean;
  /** CSS aspect-ratio, width / height. */
  ratio?: string;
  className?: string;
  /** Offset hairline echo of the arch behind the photo. */
  echo?: "left" | "right" | false;
  /** Open from a slit when scrolled into view. */
  reveal?: boolean;
  kenburns?: boolean;
  parallax?: boolean;
  style?: CSSProperties;
};

/**
 * The Arch — the brand's signature frame: a rectangle with a full semicircular
 * top (the shape of a ceremony arch). Opens from a narrow slit on scroll-in.
 */
export function Arch({
  img, sizes, priority, ratio = "3 / 4", className = "", echo = false,
  reveal = true, kenburns = false, parallax = false, style,
}: Props) {
  const inner = (
    <div
      className={`arch ${kenburns ? "kenburns" : ""}`}
      data-reveal={reveal ? "arch" : undefined}
      style={{ aspectRatio: ratio }}
    >
      {parallax ? (
        <div data-parallax className="absolute inset-x-0 -inset-y-6">
          <Photo img={img} sizes={sizes} priority={priority} />
        </div>
      ) : (
        <Photo img={img} sizes={sizes} priority={priority} />
      )}
    </div>
  );
  if (!echo) return <div className={className} style={style}>{inner}</div>;
  return (
    <div className={`arch-frame ${echo === "right" ? "echo-right" : ""} ${className}`} style={style}>
      {inner}
    </div>
  );
}
